/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { GridComponent } from "../grid.component";
import { Subscription } from "rxjs";
import { RowArgs } from "../rendering/common/row-class";
import { SelectionEvent } from "./selection.service";
/**
 * @hidden
 */
export declare class Selection {
    protected grid: GridComponent;
    protected cd: ChangeDetectorRef;
    /**
     * Defines the collection that will store the selected item keys.
     */
    selectedKeys: any[];
    /**
     * Defines the item key that will be stored in the `selectedKeys` collection.
     */
    selectionKey: string | ((context: RowArgs) => any);
    /**
     * Fires when the `selectedKeys` collection has been updated.
     */
    selectedKeysChange: EventEmitter<any[]>;
    protected selectionChangeSubscription: Subscription;
    constructor(grid: GridComponent, cd: ChangeDetectorRef);
    protected init(): void;
    /**
     * @hidden
     */
    destroy(): void;
    /**
     * @hidden
     */
    reset(): void;
    protected getItemKey(row: RowArgs): any;
    protected onSelectionChange(selection: SelectionEvent): void;
}
