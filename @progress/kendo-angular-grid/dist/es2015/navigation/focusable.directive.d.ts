/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterViewInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FocusableElement } from './focusable-element.interface';
import { CellContext } from '../rendering/common/cell-context';
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
export declare class FocusableDirective implements FocusableElement, AfterViewInit, OnDestroy {
    private cellContext;
    private hostElement;
    private renderer;
    private active;
    private group;
    private element;
    constructor(cellContext: CellContext, hostElement: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    toggle(active: boolean): void;
    /**
     * @hidden
     */
    canFocus(): boolean;
    /**
     * @hidden
     */
    isNavigable(): boolean;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    hasFocus(): boolean;
    /**
     * @hidden
     */
    registerElement(element: FocusableElement): void;
}
