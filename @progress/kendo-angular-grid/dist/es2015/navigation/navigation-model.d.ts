/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NavigationRow } from './navigation-row.interface';
import { LogicalCell } from './logical-cell.interface';
import { LogicalRow } from './logical-row.interface';
/**
 * @hidden
 *
 * Contains information for the currently rendered rows and cells.
 */
export declare class NavigationModel {
    private rows;
    readonly firstRow: NavigationRow;
    readonly lastRow: NavigationRow;
    registerCell(cell: LogicalCell): void;
    unregisterCell(cell: LogicalCell): void;
    registerRow(row: LogicalRow): void;
    updateRow(row: LogicalRow): void;
    unregisterRow(uid: number): void;
    findRowByIndex(index: number): NavigationRow;
    findRowByPosition(pos: number): NavigationRow;
    rowPosition(row: NavigationRow): number;
}
