/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * @hidden
 */
export class NavigationCursor {
    constructor(model) {
        this.model = model;
        this.changes = new Subject();
        this.activeRow = 0;
        this.activeCol = 0;
        this.virtualCol = 0;
        this.virtualRow = 0;
    }
    get row() {
        return this.model.findRowByIndex(this.activeRow);
    }
    get cell() {
        const row = this.row;
        if (row) {
            return row.cells.find(c => c.colIndex === this.activeCol);
        }
    }
    get dataRowIndex() {
        const row = this.row;
        if (row) {
            return row.dataRowIndex;
        }
        return -1;
    }
    /**
     * Assumes and announces a new cursor position.
     */
    reset(rowIndex = this.activeRow, colIndex = this.activeCol) {
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activate(rowIndex, colIndex, { force: true });
    }
    /**
     * Assumes a new cursor position without announcing it.
     */
    assume(rowIndex = this.activeRow, colIndex = this.activeCol) {
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
    }
    /**
     * Announces a current cursor position to subscribers.
     */
    announce() {
        this.changes.next({
            colIndex: this.activeCol,
            prevColIndex: this.activeCol,
            prevRowIndex: this.activeRow,
            rowIndex: this.activeRow
        });
    }
    isActive(rowIndex, colIndex) {
        return this.activeCol === colIndex && this.activeRow === rowIndex;
    }
    moveUp(offset = 1) {
        return this.offsetRow(-offset);
    }
    moveDown(offset = 1) {
        return this.offsetRow(offset);
    }
    moveLeft(offset = 1) {
        return this.offsetCol(-offset);
    }
    moveRight(offset = 1) {
        return this.offsetCol(offset);
    }
    offsetCol(offset) {
        const prevRow = this.model.findRowByIndex(this.virtualRow);
        this.virtualCol = Math.max(0, Math.min(this.virtualCol + offset, prevRow.cells.length - 1));
        let nextColIndex = this.virtualCol;
        let nextRowIndex = this.virtualRow;
        let cell = prevRow.cells.find(c => c.colIndex === this.virtualCol);
        const parentCell = cell.parent;
        if (parentCell === this.cell) {
            if (offset < 0) {
                nextColIndex = parentCell.colIndex - 1;
            }
            else {
                nextColIndex = parentCell.colIndex + parentCell.colSpan;
            }
            this.virtualCol = Math.max(0, Math.min(nextColIndex, prevRow.cells.length - 1));
        }
        cell = prevRow.cells.find(c => c.colIndex === this.virtualCol);
        if (cell.parent) {
            nextColIndex = cell.parent.colIndex;
            nextRowIndex = cell.parent.rowIndex;
        }
        const nextRow = this.model.findRowByIndex(nextRowIndex);
        nextColIndex = Math.max(0, Math.min(nextColIndex, nextRow.cells.length - 1));
        return this.activate(nextRowIndex, nextColIndex);
    }
    offsetRow(offset) {
        let nextColIndex = this.virtualCol;
        if (this.metadata && this.metadata.isVirtual) {
            const maxIndex = this.metadata.maxLogicalRowIndex;
            let nextIndex = Math.max(0, Math.min(this.activeRow + offset, maxIndex));
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
            const nextRow = this.model.findRowByIndex(this.virtualRow);
            if (nextRow) {
                const cell = nextRow.cells.find(c => c.colIndex === this.virtualCol) || nextRow.cells[0];
                if (cell.parent && cell.parent !== this.cell) {
                    nextColIndex = cell.parent.colIndex;
                }
            }
            return this.activate(nextIndex, nextColIndex);
        }
        const prevRow = this.model.findRowByIndex(this.virtualRow);
        const prevPos = this.model.rowPosition(prevRow);
        let nextPos = prevPos + offset;
        let nextRow = this.model.findRowByPosition(nextPos);
        if (nextRow === prevRow) {
            return false;
        }
        const cell = nextRow.cells.find(c => c.colIndex === this.virtualCol) || nextRow.cells[0];
        this.virtualRow = nextRow.index;
        if (cell.parent) {
            if (cell.parent === this.cell) {
                const parentRow = this.model.findRowByIndex(cell.parent.rowIndex);
                const parentPos = this.model.rowPosition(parentRow);
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
    }
    // tslint:disable-next-line typedef
    activate(rowIndex, colIndex, { force } = { force: false }) {
        if (!force && this.isActive(rowIndex, colIndex)) {
            return false;
        }
        const prevColIndex = this.activeCol;
        const prevRowIndex = this.activeRow;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
        this.changes.next({
            colIndex,
            prevColIndex,
            prevRowIndex,
            rowIndex
        });
        return true;
    }
}
