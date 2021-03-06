/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
const findByIndex = (arr, index) => arr.find(item => item.index === index);
const ɵ0 = findByIndex;
const findLastByIndex = (arr, index) => {
    const matches = arr.filter(item => item.index === index);
    return matches.length > 0 ? matches[matches.length - 1] : undefined;
};
const ɵ1 = findLastByIndex;
const indexComparer = (a, b) => a.index - b.index;
const ɵ2 = indexComparer;
const expandColSpan = (cell, row) => {
    if (cell.colSpan > 1) {
        cell.parent = cell;
        for (let i = cell.colIndex + 1; i < cell.colIndex + cell.colSpan; i++) {
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
const ɵ3 = expandColSpan;
const expandRowSpan = (row, prevRow) => prevRow.cells
    .filter(cell => cell.rowSpan && cell.rowSpan + prevRow.index > row.index)
    .forEach(cell => {
    const colIndex = cell.colIndex;
    row.cells[colIndex] = {
        uid: cell.uid,
        colIndex: colIndex,
        parent: cell,
        rowIndex: row.index,
        dataItem: cell.dataItem,
        dataRowIndex: cell.dataRowIndex
    };
});
const ɵ4 = expandRowSpan;
const expandAllRowSpans = (row, allRows) => allRows
    .filter(r => r.index < row.index)
    .forEach(prevRow => expandRowSpan(row, prevRow));
const ɵ5 = expandAllRowSpans;
/**
 * @hidden
 *
 * Contains information for the currently rendered rows and cells.
 */
export class NavigationModel {
    constructor() {
        this.rows = [];
    }
    get firstRow() {
        return this.rows[0];
    }
    get lastRow() {
        return this.rows[this.rows.length - 1];
    }
    registerCell(cell) {
        const row = findLastByIndex(this.rows, cell.logicalRowIndex);
        if (!row) {
            return;
        }
        const colIndex = cell.logicalColIndex;
        const modelCell = {
            uid: cell.uid,
            colIndex,
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
    }
    unregisterCell(cell) {
        const { uid, logicalRowIndex } = cell;
        const row = findByIndex(this.rows, logicalRowIndex);
        if (row) {
            const cellIndex = row.cells.findIndex(cell => cell && cell.uid === uid);
            if (cellIndex !== -1) {
                row.cells.splice(cellIndex, 1);
            }
        }
    }
    registerRow(row) {
        const modelRow = {
            uid: row.uid,
            index: row.logicalRowIndex,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            cells: []
        };
        expandAllRowSpans(modelRow, this.rows);
        this.rows.push(modelRow);
        this.rows.sort(indexComparer);
    }
    updateRow(row) {
        const current = findByIndex(this.rows, row.logicalRowIndex);
        if (current) {
            Object.assign(current, {
                dataItem: row.dataItem,
                dataRowIndex: row.dataRowIndex
            });
        }
    }
    unregisterRow(uid) {
        const entryIndex = this.rows.findIndex(row => row.uid === uid);
        if (entryIndex !== -1) {
            this.rows.splice(entryIndex, 1);
        }
    }
    findRowByIndex(index) {
        return findLastByIndex(this.rows, index);
    }
    findRowByPosition(pos) {
        const maxPos = this.rows.length - 1;
        const normalizedPos = Math.max(0, Math.min(pos, maxPos));
        return this.rows[normalizedPos];
    }
    rowPosition(row) {
        return this.rows.indexOf(row);
    }
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
