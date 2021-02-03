/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * @hidden
 */
var NavigationCursor = /** @class */ (function () {
    function NavigationCursor(model) {
        this.model = model;
        this.changes = new rxjs_1.Subject();
        this.activeRow = 0;
        this.activeCol = 0;
        this.virtualCol = 0;
        this.virtualRow = 0;
    }
    Object.defineProperty(NavigationCursor.prototype, "row", {
        get: function () {
            return this.model.findRowByIndex(this.activeRow);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationCursor.prototype, "cell", {
        get: function () {
            var _this = this;
            var row = this.row;
            if (row) {
                return row.cells.find(function (c) { return c.colIndex === _this.activeCol; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationCursor.prototype, "dataRowIndex", {
        get: function () {
            var row = this.row;
            if (row) {
                return row.dataRowIndex;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Assumes and announces a new cursor position.
     */
    NavigationCursor.prototype.reset = function (rowIndex, colIndex) {
        if (rowIndex === void 0) { rowIndex = this.activeRow; }
        if (colIndex === void 0) { colIndex = this.activeCol; }
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activate(rowIndex, colIndex, { force: true });
    };
    /**
     * Assumes a new cursor position without announcing it.
     */
    NavigationCursor.prototype.assume = function (rowIndex, colIndex) {
        if (rowIndex === void 0) { rowIndex = this.activeRow; }
        if (colIndex === void 0) { colIndex = this.activeCol; }
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
    };
    /**
     * Announces a current cursor position to subscribers.
     */
    NavigationCursor.prototype.announce = function () {
        this.changes.next({
            colIndex: this.activeCol,
            prevColIndex: this.activeCol,
            prevRowIndex: this.activeRow,
            rowIndex: this.activeRow
        });
    };
    NavigationCursor.prototype.isActive = function (rowIndex, colIndex) {
        return this.activeCol === colIndex && this.activeRow === rowIndex;
    };
    NavigationCursor.prototype.moveUp = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetRow(-offset);
    };
    NavigationCursor.prototype.moveDown = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetRow(offset);
    };
    NavigationCursor.prototype.moveLeft = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetCol(-offset);
    };
    NavigationCursor.prototype.moveRight = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetCol(offset);
    };
    NavigationCursor.prototype.offsetCol = function (offset) {
        var _this = this;
        var prevRow = this.model.findRowByIndex(this.virtualRow);
        this.virtualCol = Math.max(0, Math.min(this.virtualCol + offset, prevRow.cells.length - 1));
        var nextColIndex = this.virtualCol;
        var nextRowIndex = this.virtualRow;
        var cell = prevRow.cells.find(function (c) { return c.colIndex === _this.virtualCol; });
        var parentCell = cell.parent;
        if (parentCell === this.cell) {
            if (offset < 0) {
                nextColIndex = parentCell.colIndex - 1;
            }
            else {
                nextColIndex = parentCell.colIndex + parentCell.colSpan;
            }
            this.virtualCol = Math.max(0, Math.min(nextColIndex, prevRow.cells.length - 1));
        }
        cell = prevRow.cells.find(function (c) { return c.colIndex === _this.virtualCol; });
        if (cell.parent) {
            nextColIndex = cell.parent.colIndex;
            nextRowIndex = cell.parent.rowIndex;
        }
        var nextRow = this.model.findRowByIndex(nextRowIndex);
        nextColIndex = Math.max(0, Math.min(nextColIndex, nextRow.cells.length - 1));
        return this.activate(nextRowIndex, nextColIndex);
    };
    NavigationCursor.prototype.offsetRow = function (offset) {
        var _this = this;
        var nextColIndex = this.virtualCol;
        if (this.metadata && this.metadata.isVirtual) {
            var maxIndex = this.metadata.maxLogicalRowIndex;
            var nextIndex = Math.max(0, Math.min(this.activeRow + offset, maxIndex));
            if (this.metadata.hasDetailTemplate && !this.model.findRowByIndex(nextIndex)) {
                nextIndex = offset > 0 ? nextIndex + 1 : nextIndex - 1;
                nextIndex = Math.max(0, Math.min(nextIndex, maxIndex));
            }
            if (this.metadata.hasDetailTemplate && nextIndex === maxIndex) {
                if (this.model.lastRow.index !== maxIndex) {
                    // Don't attempt to navigate past the last collapsed row.
                    nextIndex--;
                }
            }
            this.virtualRow = nextIndex;
            var nextRow_1 = this.model.findRowByIndex(this.virtualRow);
            if (nextRow_1) {
                var cell_1 = nextRow_1.cells.find(function (c) { return c.colIndex === _this.virtualCol; }) || nextRow_1.cells[0];
                if (cell_1.parent && cell_1.parent !== this.cell) {
                    nextColIndex = cell_1.parent.colIndex;
                }
            }
            return this.activate(nextIndex, nextColIndex);
        }
        var prevRow = this.model.findRowByIndex(this.virtualRow);
        var prevPos = this.model.rowPosition(prevRow);
        var nextPos = prevPos + offset;
        var nextRow = this.model.findRowByPosition(nextPos);
        if (nextRow === prevRow) {
            return false;
        }
        var cell = nextRow.cells.find(function (c) { return c.colIndex === _this.virtualCol; }) || nextRow.cells[0];
        this.virtualRow = nextRow.index;
        if (cell.parent) {
            if (cell.parent === this.cell) {
                var parentRow = this.model.findRowByIndex(cell.parent.rowIndex);
                var parentPos = this.model.rowPosition(parentRow);
                if (offset < 0) {
                    nextPos = parentPos - 1;
                }
                else {
                    nextPos = prevPos + cell.parent.rowSpan;
                }
                nextRow = this.model.findRowByPosition(nextPos);
            }
            else {
                nextColIndex = cell.parent.colIndex;
                nextRow = this.model.findRowByIndex(cell.parent.rowIndex);
            }
            this.virtualRow = nextRow.index;
        }
        return this.activate(this.virtualRow, nextColIndex);
    };
    // tslint:disable-next-line typedef
    NavigationCursor.prototype.activate = function (rowIndex, colIndex, _a) {
        var force = (_a === void 0 ? { force: false } : _a).force;
        if (!force && this.isActive(rowIndex, colIndex)) {
            return false;
        }
        var prevColIndex = this.activeCol;
        var prevRowIndex = this.activeRow;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
        this.changes.next({
            colIndex: colIndex,
            prevColIndex: prevColIndex,
            prevRowIndex: prevRowIndex,
            rowIndex: rowIndex
        });
        return true;
    };
    return NavigationCursor;
}());
exports.NavigationCursor = NavigationCursor;
