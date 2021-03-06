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
var isLocked = function (column) { return column.parent ? isLocked(column.parent) : !!column.locked; };
var ɵ0 = isLocked;
/**
 * @hidden
 */
var resizeArgs = function (column, extra) { return Object.assign({
    columns: leafColumns([column]),
    locked: isLocked(column)
}, extra); }; // tslint:disable-line:align
var ɵ1 = resizeArgs;
/**
 * @hidden
 */
var ColumnResizingService = /** @class */ (function () {
    function ColumnResizingService() {
        this.changes = new EventEmitter();
        this.tables = new Array();
        this.muteEndNotification = false;
    }
    ColumnResizingService.prototype.start = function (column) {
        this.trackColumns(column);
        var columns = (this.column.isColumnGroup ? [column] : [])
            .concat(leafColumns([column]));
        this.changes.emit({
            columns: columns,
            locked: isLocked(this.column),
            type: 'start'
        });
    };
    ColumnResizingService.prototype.resizeColumns = function (deltaPercent) {
        var action = resizeArgs(this.column, {
            deltaPercent: deltaPercent,
            type: 'resizeColumn'
        });
        this.changes.emit(action);
    };
    ColumnResizingService.prototype.resizeTable = function (delta) {
        var action = resizeArgs(this.column, {
            delta: delta,
            type: 'resizeTable'
        });
        this.changes.emit(action);
    };
    ColumnResizingService.prototype.resizedColumn = function (state) {
        this.resizedColumns.push(state);
    };
    ColumnResizingService.prototype.end = function () {
        this.changes.emit({
            columns: [],
            resizedColumns: this.resizedColumns,
            type: 'end'
        });
    };
    ColumnResizingService.prototype.registerTable = function (fn) {
        var _this = this;
        this.tables.push(fn);
        return function () {
            _this.tables.splice(_this.tables.indexOf(fn), 1);
        };
    };
    ColumnResizingService.prototype.measureColumns = function (info) {
        var _this = this;
        var observables = this.tables.map(function (fn) { return fn(info); });
        zip.apply(void 0, observables).pipe(take(1))
            .subscribe(function (widths) {
            _this.changes.emit({
                columns: info.map(function (i) { return i.column; }),
                type: 'autoFitComplete',
                widths: widths
            });
            if (!_this.muteEndNotification) {
                _this.end();
            }
            _this.muteEndNotification = false;
        });
    };
    ColumnResizingService.prototype.autoFit = function (column) {
        this.muteEndNotification = true;
        this.start(column);
        this.changes.emit({
            columns: [column],
            type: 'triggerAutoFit'
        });
    };
    ColumnResizingService.prototype.trackColumns = function (column) {
        this.resizedColumns = [];
        this.column = column;
    };
    ColumnResizingService.decorators = [
        { type: Injectable },
    ];
    return ColumnResizingService;
}());
export { ColumnResizingService };
export { ɵ0, ɵ1 };
