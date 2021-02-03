/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
export class ExpandStateService {
    constructor(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = [];
    }
    toggleRow(index, dataItem) {
        const rowIndex = this.rowState.indexOf(index);
        const found = rowIndex === -1;
        if (!this.emitEvent({ dataItem: dataItem, expand: this.isInitiallyCollapsed ? found : !found, index: index })) {
            this.rowState = found ?
                [...this.rowState, index] :
                [...this.rowState.slice(0, rowIndex), ...this.rowState.slice(rowIndex + 1)];
        }
    }
    isExpanded(index) {
        const found = this.rowState.indexOf(index) >= 0;
        return this.isInitiallyCollapsed ? found : !found;
    }
    reset() {
        this.rowState = [];
    }
    emitEvent(args) {
        this.changes.next(args);
        return false;
    }
}
