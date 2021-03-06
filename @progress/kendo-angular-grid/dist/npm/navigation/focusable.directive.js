/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var default_focusable_element_1 = require("./default-focusable-element");
var cell_context_1 = require("../rendering/common/cell-context");
/**
 * A directive that controls the way focusable elements receive
 * [focus in a navigable Grid]({% slug keyboard_navigation_grid %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *      <input type="text" placeholder="Tab stop #0" />
 *      <kendo-grid [data]="data" [navigable]="true">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="40">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name" width="100">
 *          </kendo-grid-column>
 *          <kendo-grid-column>
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <!-- The first focusable element will be focused when pressing Enter on the cell -->
 *                  <input type="text" kendoGridFocusable [value]="dataItem.ProductName" />
 *                  <input type="button" kendoGridFocusable value="Update" />
 *              </ng-template>
 *          </kendo-grid-column>
 *          <kendo-grid-column width="80">
 *              <ng-template kendoGridCellTemplate>
 *                  <!-- A single focusable element will be focused during navigation -->
 *                  <input type="button" kendoGridFocusable value="Delete" />
 *              </ng-template>
 *          </kendo-grid-column>
 *      </kendo-grid>
 *      <input type="text" placeholder="Tab stop #2" />
 *    `
 * })
 *
 * class AppComponent {
 *     public readonly data: any = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": true
 *     }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": false
 *     }];
 * }
 * ```
 */
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(cellContext, hostElement, renderer) {
        this.cellContext = cellContext;
        this.hostElement = hostElement;
        this.renderer = renderer;
        this.active = true;
        if (this.cellContext) {
            this.group = this.cellContext.focusGroup;
        }
        if (this.group) {
            this.group.registerElement(this);
        }
    }
    FocusableDirective.prototype.ngAfterViewInit = function () {
        if (!this.element) {
            this.element = new default_focusable_element_1.DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group) {
            var isActive = this.group.isActive;
            this.toggle(isActive);
        }
    };
    FocusableDirective.prototype.ngOnDestroy = function () {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.toggle = function (active) {
        if (this.element && active !== this.active) {
            this.active = active;
            this.element.toggle(active);
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.canFocus = function () {
        return this.element && this.element.canFocus();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.isNavigable = function () {
        return this.element && this.element.isNavigable();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.focus = function () {
        if (this.element) {
            this.element.focus();
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.hasFocus = function () {
        return this.element && this.element.hasFocus();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.registerElement = function (element) {
        this.element = element;
    };
    FocusableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridFocusable]' + ",\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    "
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] }, { type: core_1.SkipSelf }] },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 }
    ]; };
    return FocusableDirective;
}());
exports.FocusableDirective = FocusableDirective;
