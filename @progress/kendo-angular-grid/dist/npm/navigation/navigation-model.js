/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findByIndex = function (arr, index) {
    return arr.find(function (item) { return item.index === index; });
};
var ɵ0 = findByIndex;
exports.ɵ0 = ɵ0;
var findLastByIndex = function (arr, index) {
    var matches = arr.filter(function (item) { return item.index === index; });
    return matches.length > 0 ? matches[matches.length - 1] : undefined;
};
var ɵ1 = findLastByIndex;
exports.ɵ1 = ɵ1;
var indexComparer = function (a, b) { return a.index - b.index; };
var ɵ2 = indexComparer;
exports.ɵ2 = ɵ2;
var expandColSpan = function (cell, row) {
    if (cell.colSpan > 1) {
        cell.parent = cell;
        for (var i = cell.colIndex + 1; i < cell.colIndex + cell.colSpan; i++) {
            row.cells[i] = {
                uid: cell.uid,
                colIndex: i,
                parent: cell,
                rowIndex: cell.rowIndex,
                dataItem: cell.dataItem,
                dataRowIndex: cell.dataRowIndex
            };
        }
    }
};
var ɵ3 = expandColSpan;
exports.ɵ3 = ɵ3;
var expandRowSpan = function (row, prevRow) {
    return prevRow.cells
        .filter(function (cell) { return cell.rowSpan && cell.rowSpan + prevRow.index > row.index; })
        .forEach(function (cell) {
        var colIndex = cell.colIndex;
        row.cells[colIndex] = {
            uid: cell.uid,
            colIndex: colIndex,
            parent: cell,
            rowIndex: row.index,
            dataItem: cell.dataItem,
            dataRowIndex: cell.dataRowIndex
        };
    });
};
var ɵ4 = expandRowSpan;
exports.ɵ4 = ɵ4;
var expandAllRowSpans = function (row, allRows) {
    return allRows
        .filter(function (r) { return r.index < row.index; })
        .forEach(function (prevRow) { return expandRowSpan(row, prevRow); });
};
var ɵ5 = expandAllRowSpans;
exports.ɵ5 = ɵ5;
/**
 * @hidden
 *
 * Contains information for the currently rendered rows and cells.
 */
var NavigationModel = /** @class */ (function () {
    function NavigationModel() {
        this.rows = [];
    }
    Object.defineProperty(NavigationModel.prototype, "firstRow", {
        get: function () {
            return this.rows[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationModel.prototype, "lastRow", {
        get: function () {
            return this.rows[this.rows.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    NavigationModel.prototype.registerCell = function (cell) {
        var row = findLastByIndex(this.rows, cell.logicalRowIndex);
        if (!row) {
            return;
        }
        var colIndex = cell.logicalColIndex;
        var modelCell = {
            uid: cell.uid,
            colIndex: colIndex,
            rowIndex: row.index,
            colSpan: cell.colSpan,
            rowSpan: cell.rowSpan,
            detailExpandCell: cell.detailExpandCell,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            focusGroup: cell.focusGroup
        };
        row.cells[colIndex] = modelCell;
        if (cell.groupItem) {
            row.groupItem = cell.groupItem;
        }
        expandColSpan(modelCell, row);
        expandAllRowSpans(row, this.rows);
    };
    NavigationModel.prototype.unregisterCell = function (cell) {
        var uid = cell.uid, logicalRowIndex = cell.logicalRowIndex;
        var row = findByIndex(this.rows, logicalRowIndex);
        if (row) {
            var cellIndex = row.cells.findIndex(function (cell) { return cell && cell.uid === uid; });
            if (cellIndex !== -1) {
                row.cells.splice(cellIndex, 1);
            }
        }
    };
    NavigationModel.prototype.registerRow = function (row) {
        var modelRow = {
            uid: row.uid,
            index: row.logicalRowIndex,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            cells: []
        };
        expandAllRowSpans(modelRow, this.rows);
        this.rows.push(modelRow);
        this.rows.sort(indexComparer);
    };
    NavigationModel.prototype.updateRow = function (row) {
        var current = findByIndex(this.rows, row.logicalRowIndex);
        if (current) {
            Object.assign(current, {
                dataItem: row.dataItem,
                dataRowIndex: row.dataRowIndex
            });
        }
    };
    NavigationModel.prototype.unregisterRow = function (uid) {
        var entryIndex = this.rows.findIndex(function (row) { return row.uid === uid; });
        if (entryIndex !== -1) {
            this.rows.splice(entryIndex, 1);
        }
    };
    NavigationModel.prototype.findRowByIndex = function (index) {
        return findLastByIndex(this.rows, index);
    };
    NavigationModel.prototype.findRowByPosition = function (pos) {
        var maxPos = this.rows.length - 1;
        var normalizedPos = Math.max(0, Math.min(pos, maxPos));
        return this.rows[normalizedPos];
    };
    NavigationModel.prototype.rowPosition = function (row) {
        return this.rows.indexOf(row);
    };
    return NavigationModel;
}());
exports.NavigationModel = NavigationModel;
