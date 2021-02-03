/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
/**
 * Represents the service that is passed to the
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <span class="k-icon k-i-close" (click)="service.close()"
 *                  style="position: absolute; right: 5px; top: 5px;cursor: pointer;"></span>
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
var ColumnMenuService = /** @class */ (function () {
    function ColumnMenuService() {
        /**
         * @hidden
         */
        this.closeMenu = new EventEmitter();
    }
    /**
     * Closes the column menu.
     */
    ColumnMenuService.prototype.close = function () {
        this.closeMenu.emit();
    };
    ColumnMenuService.decorators = [
        { type: Injectable },
    ];
    return ColumnMenuService;
}());
export { ColumnMenuService };
