/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { ColumnBase } from '../columns/column-base';
import { ColumnResizeAction, ColumnResizeArgs, AutoFitFn } from './column-resize.interface';
/**
 * @hidden
 */
export declare class ColumnResizingService {
    changes: EventEmitter<ColumnResizeAction>;
    private column;
    private resizedColumns;
    private tables;
    private muteEndNotification;
    start(column: ColumnBase): void;
    resizeColumns(deltaPercent: number): void;
    resizeTable(delta: number): void;
    resizedColumn(state: ColumnResizeArgs): void;
    end(): void;
    registerTable(fn: AutoFitFn): Function;
    measureColumns(info: Array<any>): void;
    autoFit(column: ColumnBase): void;
    private trackColumns;
}
