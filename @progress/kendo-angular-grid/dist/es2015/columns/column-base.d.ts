/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, QueryList } from '@angular/core';
import { HeaderTemplateDirective } from '../rendering/header/header-template.directive';
import { FooterTemplateDirective } from '../rendering/footer/footer-template.directive';
import { ColumnMenuTemplateDirective } from '../column-menu/column-menu-template.directive';
/**
 * @hidden
 */
export declare const isSpanColumn: (column: any) => any;
/**
 * @hidden
 */
export declare const isCheckboxColumn: (column: any) => any;
/**
 * The base class for the column components of the Grid.
 */
export declare class ColumnBase {
    parent?: ColumnBase;
    /**
     * @hidden
     */
    matchesMedia: boolean;
    /**
     * The column index after reordering.
     *
     * > `orderIndex` is a read-only property. Setting this field does not affect column order.
     */
    orderIndex: number;
    /**
     * @hidden
     */
    isColumnGroup: boolean;
    /**
     * @hidden
     */
    isSpanColumn: boolean;
    /**
     * Indicates whether the column is resizable.
     * @default true
     */
    resizable: boolean;
    /**
     * Indicates whether the column is reorderable.
     * @default true
     */
    reorderable: boolean;
    /**
     * The width (in pixels) below which the user is not able to resize the column by using the UI.
     */
    minResizableWidth: number;
    /**
     * The title of the column.
     */
    title: string;
    /**
     * The width of the column (in pixels).
     */
    width: number;
    /**
     * Indicates whether the column will be resized during initialization so that it fits its header and row content.
     */
    autoSize: boolean;
    /**
     * Toggles the locked (frozen) state of the columns ([more information and example]({% slug locked_columns_grid %})).
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-grid-column field="ProductID" title="Product ID" width="120" [locked]="true">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = products;
     *    }
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     *
     * ```
     */
    locked: boolean;
    /**
     * Sets the visibility of the column ([see example]({% slug hidden_columns_grid %}#toc-using-built-in-options)).
     *
     * @default false
     */
    hidden: boolean;
    /**
     * Sets the condition that needs to be satisfied for a column to remain visible ([see example]({% slug responsive_grid %}#toc-columns)).
     * If you set the `hidden` property, the behavior of `media` is overridden.
     *
     * @example
     * ```ng-template-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [media]="'(min-width: 320px)'">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     *
     * Accepts the device identifiers that are [available in Bootstrap 4](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options)
     * ([see example]({% slug responsive_grid %}#toc-bootstrap-4-compatibility)):
     * * `"xs"`&mdash;Equivalent to `"(max-width: 576px)"`.
     * * `"sm"`&mdash;Equivalent to `"(min-width: 576px)"`.
     * * `"md"`&mdash;Equivalent to `"(min-width: 768px)"`.
     * * `"lg"`&mdash;Equivalent to `"(min-width: 992px)"`.
     * * `"xl"`&mdash;Equivalent to `"(min-width: 1200px)"`.
     *
     * @example
     * ```ng-template-no-run
     * <kendo-grid>
     *    <kendo-grid-column field="UnitPrice" [media]="'md'">
     *    </kendo-grid-column>
     * </kendo-grid>
     * ```
     */
    media: string;
    /**
     * Specifies if the column can be locked or unlocked from the column menu or by reordering the columns.
     */
    lockable: boolean;
    /**
     * Specifies if the column menu will be shown for the column.
     */
    columnMenu: boolean;
    /**
     * Specifies if the column will be included in the column-chooser list.
     */
    includeInChooser: boolean;
    /**
     * Sets the custom styles for the table cells (excluding the footer and header ones) of the column. Under the hood,
     * to apply the property, the `style` option uses the
     * [NgStyle]({{ site.data.urls.angular['ngstyleapi'] }}) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [style]="{'text-align': 'right'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    style: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles for the header cell of the column. Under the hood, to apply the property,
     * the `headerStyle` option uses the
     * [NgStyle]({{ site.data.urls.angular['ngstyleapi'] }}) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [headerStyle]="{'text-align': 'right'}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    headerStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom styles for the footer cell of the column. Under the hood, to apply the property,
     * the `footerStyle` option uses the
     * [NgStyle]({{ site.data.urls.angular['ngstyleapi'] }}) directive.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [footerStyle]="{'text-align': 'right'}">
     *              <ng-template kendoGridFooterTemplate>
     *                  footer text
     *              </ng-template>
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    footerStyle: {
        [key: string]: string;
    };
    /**
     * Sets the custom CSS classes to the column cells. Under the hood, to apply the property, the `class` option uses the
     * [NgClass]({{ site.data.urls.angular['ngclassapi'] }}) directive.
     * To customize header and footer column cells, use the [`headerClass`]({% slug api_grid_columncomponent %}#toc-headerclass)
     * and [`footerClass`]({% slug api_grid_columncomponent %}#toc-footerclass) inputs.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [class]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    cssClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the column header cell. Under the hood, to apply the property,
     * the `headerClass` option uses the
     * [NgClass]({{ site.data.urls.angular['ngclassapi'] }}) directive.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [headerClass]="{'myClass': true}">
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    headerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the custom CSS classes to the column footer cell. Under the hood, to apply the property,
     * the `footerClass` option uses the
     * [NgClass]({{ site.data.urls.angular['ngclassapi'] }}) directive.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        tr .myClass {
     *            text-align: right
     *       }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" style="height: 200px">
     *          <kendo-grid-column field="ProductName" title="Product Name" width="200" [footerClass]="{'myClass': true}">
     *              <ng-template kendoGridFooterTemplate>
     *                  footer text
     *              </ng-template>
     *          </kendo-grid-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = [{
     *            "ProductID": 1,
     *            "ProductName": "Chai",
     *            "UnitPrice": 18.0000,
     *            "Discontinued": true
     *          }, {
     *            "ProductID": 2,
     *            "ProductName": "Chang",
     *            "UnitPrice": 19.0000,
     *            "Discontinued": false
     *          }];
     *    }
     * }
     *
     * ```
     */
    footerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    headerTemplates: QueryList<HeaderTemplateDirective>;
    /**
     * @hidden
     */
    footerTemplate: FooterTemplateDirective;
    /**
     * @hidden
     */
    columnMenuTemplates: QueryList<ColumnMenuTemplateDirective>;
    /**
     * @hidden
     */
    readonly level: number;
    /**
     * @hidden
     */
    readonly isLocked: boolean;
    private _width;
    /**
     * @hidden
     */
    readonly colspan: number;
    /**
     * @hidden
     */
    rowspan(totalColumnLevels: number): number;
    /**
     * @hidden
     */
    readonly headerTemplateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly footerTemplateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly columnMenuTemplateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly displayTitle: string;
    /**
     * @hidden
     */
    readonly isVisible: boolean;
    constructor(parent?: ColumnBase);
}
