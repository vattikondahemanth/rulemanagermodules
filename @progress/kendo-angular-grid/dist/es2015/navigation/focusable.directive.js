/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Inject, Optional, Renderer2, SkipSelf } from '@angular/core';
import { DefaultFocusableElement } from './default-focusable-element';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
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
export class FocusableDirective {
    constructor(cellContext, hostElement, renderer) {
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
    ngAfterViewInit() {
        if (!this.element) {
            this.element = new DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group) {
            const isActive = this.group.isActive;
            this.toggle(isActive);
        }
    }
    ngOnDestroy() {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    }
    /**
     * @hidden
     */
    toggle(active) {
        if (this.element && active !== this.active) {
            this.active = active;
            this.element.toggle(active);
        }
    }
    /**
     * @hidden
     */
    canFocus() {
        return this.element && this.element.canFocus();
    }
    /**
     * @hidden
     */
    isNavigable() {
        return this.element && this.element.isNavigable();
    }
    /**
     * @hidden
     */
    focus() {
        if (this.element) {
            this.element.focus();
        }
    }
    /**
     * @hidden
     */
    hasFocus() {
        return this.element && this.element.hasFocus();
    }
    /**
     * @hidden
     */
    registerElement(element) {
        this.element = element;
    }
}
FocusableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFocusable]' + `,
        [kendoGridEditCommand],
        [kendoGridRemoveCommand],
        [kendoGridSaveCommand],
        [kendoGridCancelCommand],
        [kendoGridSelectionCheckbox]
    `
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }, { type: SkipSelf }] },
    { type: ElementRef },
    { type: Renderer2 }
];
