/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-input-rename */
import { Input, EventEmitter, Output } from '@angular/core';
import { isPresent } from "../utils";
/**
 * @hidden
 */
export class Selection {
    constructor(grid, cd) {
        this.grid = grid;
        this.cd = cd;
        /**
         * Defines the collection that will store the selected item keys.
         */
        this.selectedKeys = [];
        /**
         * Fires when the `selectedKeys` collection has been updated.
         */
        this.selectedKeysChange = new EventEmitter();
        this.init();
    }
    init() {
        if (!isPresent(this.grid.rowSelected)) {
            this.grid.rowSelected = (row) => {
                return this.selectedKeys.indexOf(this.getItemKey(row)) >= 0;
            };
        }
        this.selectionChangeSubscription = this.grid
            .selectionChange
            .subscribe(this.onSelectionChange.bind(this));
    }
    /**
     * @hidden
     */
    destroy() {
        this.selectionChangeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    reset() {
        this.selectedKeys.splice(0, this.selectedKeys.length);
    }
    getItemKey(row) {
        if (this.selectionKey) {
            if (typeof this.selectionKey === "string") {
                return row.dataItem[this.selectionKey];
            }
            if (typeof this.selectionKey === "function") {
                return this.selectionKey(row);
            }
        }
        return row.index;
    }
    onSelectionChange(selection) {
        selection.deselectedRows.forEach((item) => {
            const itemKey = this.getItemKey(item);
            const itemIndex = this.selectedKeys.indexOf(itemKey);
            if (itemIndex >= 0) {
                this.selectedKeys.splice(itemIndex, 1);
            }
        });
        if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
            this.reset();
        }
        selection.selectedRows.forEach((item) => {
            const itemKey = this.getItemKey(item);
            if (this.selectedKeys.indexOf(itemKey) < 0) {
                this.selectedKeys.push(itemKey);
            }
        });
        this.cd.markForCheck();
        this.selectedKeysChange.emit(this.selectedKeys);
    }
}
Selection.propDecorators = {
    selectedKeys: [{ type: Input }],
    selectionKey: [{ type: Input, args: ["kendoGridSelectBy",] }],
    selectedKeysChange: [{ type: Output }]
};
