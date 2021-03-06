/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { zip } from 'rxjs';
import { leafColumns } from '../columns/column-common';
import { take } from 'rxjs/operators';
/**
 * @hidden
 */
const isLocked = column => column.parent ? isLocked(column.parent) : !!column.locked;
const ɵ0 = isLocked;
/**
 * @hidden
 */
const resizeArgs = (column, extra) => Object.assign({
    columns: leafColumns([column]),
    locked: isLocked(column)
}, extra); // tslint:disable-line:align
const ɵ1 = resizeArgs;
/**
 * @hidden
 */
export class ColumnResizingService {
    constructor() {
        this.changes = new EventEmitter();
        this.tables = new Array();
        this.muteEndNotification = false;
    }
    start(column) {
        this.trackColumns(column);
        const columns = (this.column.isColumnGroup ? [column] : [])
            .concat(leafColumns([column]));
        this.changes.emit({
            columns: columns,
            locked: isLocked(this.column),
            type: 'start'
        });
    }
    resizeColumns(deltaPercent) {
        const action = resizeArgs(this.column, {
            deltaPercent,
            type: 'resizeColumn'
        });
        this.changes.emit(action);
    }
    resizeTable(delta) {
        const action = resizeArgs(this.column, {
            delta,
            type: 'resizeTable'
        });
        this.changes.emit(action);
    }
    resizedColumn(state) {
        this.resizedColumns.push(state);
    }
    end() {
        this.changes.emit({
            columns: [],
            resizedColumns: this.resizedColumns,
            type: 'end'
        });
    }
    registerTable(fn) {
        this.tables.push(fn);
        return () => {
            this.tables.splice(this.tables.indexOf(fn), 1);
        };
    }
    measureColumns(info) {
        const observables = this.tables.map(fn => fn(info));
        zip(...observables)
            .pipe(take(1))
            .subscribe(widths => {
            this.changes.emit({
                columns: info.map(i => i.column),
                type: 'autoFitComplete',
                widths
            });
            if (!this.muteEndNotification) {
                this.end();
            }
            this.muteEndNotification = false;
        });
    }
    autoFit(column) {
        this.muteEndNotification = true;
        this.start(column);
        this.changes.emit({
            columns: [column],
            type: 'triggerAutoFit'
        });
    }
    trackColumns(column) {
        this.resizedColumns = [];
        this.column = column;
    }
}
ColumnResizingService.decorators = [
    { type: Injectable },
];
export { ɵ0, ɵ1 };
