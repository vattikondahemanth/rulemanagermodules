/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
var ExpandStateService = /** @class */ (function () {
    function ExpandStateService(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = [];
    }
    ExpandStateService.prototype.toggleRow = function (index, dataItem) {
        var rowIndex = this.rowState.indexOf(index);
        var found = rowIndex === -1;
        if (!this.emitEvent({ dataItem: dataItem, expand: this.isInitiallyCollapsed ? found : !found, index: index })) {
            this.rowState = found ? this.rowState.concat([index]) : this.rowState.slice(0, rowIndex).concat(this.rowState.slice(rowIndex + 1));
        }
    };
    ExpandStateService.prototype.isExpanded = function (index) {
        var found = this.rowState.indexOf(index) >= 0;
        return this.isInitiallyCollapsed ? found : !found;
    };
    ExpandStateService.prototype.reset = function () {
        this.rowState = [];
    };
    ExpandStateService.prototype.emitEvent = function (args) {
        this.changes.next(args);
        return false;
    };
    return ExpandStateService;
}());
export { ExpandStateService };
