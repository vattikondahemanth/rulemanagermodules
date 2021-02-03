/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, QueryList, ViewChild, isDevMode, NgZone, ViewChildren, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ZoneAwareEventEmitter } from './common/event-emitter';
import { FormControl, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';
import { map, tap, take, filter, switchMap } from 'rxjs/operators';
import { ColumnComponent, isColumnComponent } from './columns/column.component';
import { isSpanColumnComponent } from './columns/span-column.component';
import { isColumnGroupComponent } from './columns/column-group.component';
import { DetailTemplateDirective } from './rendering/details/detail-template.directive';
import { isArray, anyChanged, isChanged, isPresent, isUniversal, observe, isTruthy, createPromise, hasObservers } from './utils';
import { BrowserSupportService } from './layout/browser-support.service';
import { DataResultIterator, DataCollection } from './data/data.collection';
import { SelectionService } from './selection/selection.service';
import { Selection } from "./selection/selection-default";
import { EditService } from './editing/edit.service';
import { DetailsService } from './rendering/details/details.service';
import { GroupsService } from './grouping/groups.service';
import { ColumnsContainer } from './columns/columns-container';
import { GroupInfoService } from './grouping/group-info.service';
import { ChangeNotificationService } from './data/change-notification.service';
import { NoRecordsTemplateDirective } from './rendering/no-records-template.directive';
import { ColumnBase } from './columns/column-base';
import { syncRowsHeight } from './layout/row-sync';
import { CELL_CONTEXT, EMPTY_CELL_CONTEXT } from './rendering/common/cell-context';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { FilterService } from './filtering/filter.service';
import { PagerTemplateDirective } from './pager/pager-template.directive';
import { PagerContextService } from "./pager/pager-context.service";
import { PDFService } from './pdf/pdf.service';
import { PDFExportEvent } from './pdf/pdf-export-event';
import { SuspendService } from './scrolling/suspend.service';
import { ResponsiveService } from "./layout/responsive.service";
import { ExcelService } from './excel/excel.service';
import { ColumnList } from './columns/column-list';
import { ToolbarTemplateDirective } from "./rendering/toolbar/toolbar-template.directive";
import { expandColumns, expandColumnsWithSpan, isValidFieldName, sumColumnWidths } from "./columns/column-common";
import { ScrollSyncService } from "./scrolling/scroll-sync.service";
import { ResizeService } from "./layout/resize.service";
import { closest, matchesClasses, matchesNodeName } from './rendering/common/dom-queries';
import { LocalDataChangesService } from './editing/local-data-changes.service';
import { DomEventsService } from './common/dom-events.service';
import { ColumnResizingService } from "./column-resizing/column-resizing.service";
import { hasFilterRow } from './filtering/filterable';
import { SinglePopupService } from './common/single-popup.service';
import { DragAndDropService } from './dragdrop/drag-and-drop.service';
import { DragHintService } from './dragdrop/drag-hint.service';
import { DropCueService } from './dragdrop/drop-cue.service';
import { ColumnReorderService } from './dragdrop/column-reorder.service';
import { ColumnReorderEvent } from './dragdrop/column-reorder-event';
import { FocusRoot } from './navigation/focus-root';
import { NavigationService } from './navigation/navigation.service';
import { NavigationMetadata } from './navigation/navigation-metadata';
import { IdService } from './common/id.service';
import { ColumnInfoService } from "./common/column-info.service";
import { ScrollRequestService } from './scrolling/scroll-request.service';
import { SortService } from './common/sort.service';
import { ColumnMenuTemplateDirective } from './column-menu/column-menu-template.directive';
import { ColumnVisibilityChangeEvent } from './column-menu/column-visibility-change-event';
import { ColumnLockedChangeEvent } from './column-menu/column-locked-change-event';
import { GROUP_CELL_WIDTH } from './constants';
import { sortColumns } from './columns/column-common';
import { defaultTrackBy } from './common/default-track-by';
const createControl = (source) => (acc, key) => {
    acc[key] = new FormControl(source[key]);
    return acc;
};
const ɵ0 = createControl;
const validateColumnsField = (columns) => expandColumns(columns.toArray())
    .filter(isColumnComponent)
    .filter(({ field }) => !isValidFieldName(field))
    .forEach(({ field }) => console.warn(`
                Grid column field name '${field}' does not look like a valid JavaScript identifier.
                Identifiers can contain only alphanumeric characters (including "$" or "_"), and may not start with a digit.
                Please use only valid identifier names to ensure error-free operation.
            `));
const ɵ1 = validateColumnsField;
const handleExpandCollapseService = (service, expandEmitter, collapseEmitter, map) => (service.changes.pipe(filter(({ dataItem }) => isPresent(dataItem)))
    .subscribe((x) => x.expand ? expandEmitter.emit(map(x)) : collapseEmitter.emit(map(x))));
const ɵ2 = handleExpandCollapseService;
const isInEditedCell = (element, gridElement) => closest(element, matchesClasses('k-grid-edit-cell')) &&
    closest(element, matchesNodeName('kendo-grid')) === gridElement;
const ɵ3 = isInEditedCell;
const ɵ4 = EMPTY_CELL_CONTEXT;
/**
 * Represents the Kendo UI Grid component for Angular.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *        </kendo-grid>
 *    `
 * })
 * class AppComponent {
 *    public gridData: any[] = products;
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
 * ```
 */
export class GridComponent {
    constructor(supportService, selectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, localization) {
        this.selectionService = selectionService;
        this.wrapper = wrapper;
        this.groupInfoService = groupInfoService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.detailsService = detailsService;
        this.editService = editService;
        this.filterService = filterService;
        this.pdfService = pdfService;
        this.responsiveService = responsiveService;
        this.renderer = renderer;
        this.excelService = excelService;
        this.ngZone = ngZone;
        this.scrollSyncService = scrollSyncService;
        this.domEvents = domEvents;
        this.columnResizingService = columnResizingService;
        this.changeDetectorRef = changeDetectorRef;
        this.columnReorderService = columnReorderService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.sortService = sortService;
        /**
         * Sets the data of the Grid. If an array is provided, the Grid automatically gets the total count
         * ([more information and example]({% slug databinding_grid %})).
         */
        this.data = [];
        /**
         * Defines the scroll mode used by the Grid.
         *
         * The available options are:
         *  - `none`&mdash;Renders no scrollbar.
         *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
         *  - `virtual`&mdash;Displays no pager and renders a portion of the data (optimized rendering) while the user is scrolling the content.
         */
        this.scrollable = 'scrollable';
        /**
         * Enables the single-row [selection]({% slug selection_grid %}) of the Grid.
         */
        this.selectable = false;
        /**
         * A function that defines how to track changes for the data rows.
         *
         * By default, the Grid tracks changes by the index of the data item.
         * Edited rows are tracked by reference.
         * In some cases, you might need to override the default behavior,
         * for example, when you implement editing with immutable data items.
         *
         * The following example demonstrates how to track items only by index.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { GridItem } from '@progress/kendo-angular-grid';
         *
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-grid [data]="gridData" [trackBy]="trackBy">
         *        </kendo-grid>
         *    `
         * })
         * class AppComponent {
         *    public gridData: any[] = products;
         *
         *    public trackBy(index: number, item: GridItem): any {
         *        console.log(item);
         *        return index;
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
         * ```
         */
        this.trackBy = defaultTrackBy;
        /**
         * Enables the [filtering]({% slug filtering_grid %}) of the Grid columns that have their `field` option set.
         */
        this.filterable = false;
        /**
         * Enables the [sorting]({% slug sorting_grid %}) of the Grid columns that have their `field` option set.
         */
        this.sortable = false;
        /**
         * Configures the pager of the Grid ([see example]({% slug paging_grid %})).
         *
         * The available options are:
         * - `buttonCount: Number`&mdash;Sets the maximum numeric buttons count before the buttons are collapsed.
         * - `info: Boolean`&mdash;Toggles the information about the current page and the total number of records.
         * - `type: PagerType`&mdash;Accepts the `numeric` (buttons with numbers) and `input` (input for typing the page number) values.
         * - `pageSizes: Boolean` or `Array<number>`&mdash;Shows a menu for selecting the page size.
         * - `previousNext: Boolean`&mdash;Toggles the **Previous** and **Next** buttons.
         */
        this.pageable = false;
        /**
         * If set to `true`, the user can group the Grid by dragging the column header cells.
         * By default, grouping is disabled ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupable = false;
        /**
         * If set to `true`, the user can use dedicated shortcuts to interact with the Grid.
         * By default, navigation is disabled and the Grid content is accessible in the normal tab sequence.
         */
        this.navigable = false;
        /**
         * Indicates whether the Grid columns will be resized during initialization so that
         * they fit their headers and row content. Defaults to `false`.
         * Columns with `autoSize` set to `false` are excluded.
         * To dynamically update the column width to match the new content,
         * refer to [this example]({% slug resizing_columns_grid %}).
         */
        this.autoSize = false;
        /**
         * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
         * ([see example]({% slug resizing_columns_grid %})).
         *
         * @default false
         */
        this.resizable = false;
        /**
         * If set to `true`, the user can reorder columns by dragging their header cells
         * ([see example]({% slug reordering_columns_grid %})).
         *
         * @default false
         */
        this.reorderable = false;
        /**
         * Specifies if the loading indicator of the Grid will be displayed ([see example]({% slug databinding_grid %})).
         *
         * @default false
         */
        this.loading = false;
        /**
         * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_grid %})).
         *
         * @default false
         */
        this.columnMenu = false;
        /**
         * Specifies if the header of the grid will be hidden. The header is visible by default.
         *
         * > The header includes column headers and the [filter row]({% slug filtering_grid %}#toc-filter-row).
         */
        this.hideHeader = false;
        /**
         * Fires when the Grid filter is modified through the UI.
         * You have to handle the event yourself and filter the data.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires when the page of the Grid is changed ([see example]({% slug paging_grid %})).
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new EventEmitter();
        /**
         * Fires when the grouping of the Grid is changed.
         * You have to handle the event yourself and group the data ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupChange = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the sorting of the Grid is changed ([see example]({% slug sorting_grid %})).
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new EventEmitter();
        /**
         * Fires when the user selects a Grid row.
         * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent %}#toc-selectionchange).
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires when the data state of the Grid is changed.
         */
        this.dataStateChange = new EventEmitter();
        /**
         * Fires when the user expands a group header.
         */
        this.groupExpand = new EventEmitter();
        /**
         * Fires when the user collapses a group header.
         */
        this.groupCollapse = new EventEmitter();
        /**
         * Fires when the user expands a master row.
         */
        this.detailExpand = new EventEmitter();
        /**
         * Fires when the user collapses a master row.
         */
        this.detailCollapse = new EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
         */
        this.edit = new EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-saving-records)).
         */
        this.save = new EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-removing-records)).
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row
         * ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
         */
        this.add = new EventEmitter();
        /**
         * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClose = new EventEmitter();
        /**
         * Fires when the user clicks a cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClick = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user clicks the **Export to PDF** command button.
         */
        this.pdfExport = new EventEmitter();
        /**
         * Fires when the user clicks the **Export to Excel** command button.
         */
        this.excelExport = new EventEmitter();
        /**
         * Fires when the user completes the resizing of the column.
         */
        this.columnResize = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user completes the reordering of the column.
         */
        this.columnReorder = new EventEmitter();
        /**
         * Fires when the user changes the visibility of the columns from the column menu or column chooser.
         */
        this.columnVisibilityChange = new EventEmitter();
        /**
         * Fires when the user changes the locked state of the columns from the column menu or by reordering the columns.
         */
        this.columnLockedChange = new EventEmitter();
        /**
         * Fires when the user scrolls to the last record on the page and enables endless scrolling
         * ([see example]({% slug scrollmmodes_grid %}#toc-endless-scrolling)).
         * You have to handle the event yourself and page the data.
         */
        this.scrollBottom = new EventEmitter();
        /**
         * A query list of all declared columns.
         */
        this.columns = new QueryList();
        this.footer = new QueryList();
        this.selectionDirective = false;
        this.columnsContainer = new ColumnsContainer(() => this.columnList.filterHierarchy(column => {
            column.matchesMedia = this.matchesMedia(column);
            return column.isVisible;
        }));
        this.view = new DataCollection(() => new DataResultIterator(this.data, this.skip, this.hasGroupFooters));
        this.shouldGenerateColumns = true;
        this._sort = new Array();
        this._group = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this.columnResizingInProgress = false;
        this.rtl = false;
        this._rowClass = () => null;
        this.localizationSubscription = localization.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
        this.scrollbarWidth = supportService.scrollbarWidth;
        this.groupInfoService.registerColumnsContainer(() => this.columnList);
        this.columnInfoService.init(this.columnsContainer, () => this.columnList);
        this.columnVisibilityChangeSubscription = this.columnInfoService.visibilityChange.subscribe((changed) => {
            this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
        });
        this.columnLockedChangeSubscription = this.columnInfoService.lockedChange.subscribe((changed) => {
            this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
        });
        if (selectionService) {
            this.selectionSubscription = selectionService.changes.subscribe((event) => {
                this.ngZone.run(() => this.selectionChange.emit(event));
            });
        }
        this.groupExpandCollapseSubscription = handleExpandCollapseService(groupsService, this.groupExpand, this.groupCollapse, ({ dataItem: group, index }) => ({ group, groupIndex: index }));
        this.detailsServiceSubscription = handleExpandCollapseService(detailsService, this.detailExpand, this.detailCollapse, args => args);
        this.filterSubscription = this.filterService.changes.subscribe(x => {
            this.filterChange.emit(x);
        });
        this.sortSubscription = this.sortService.changes.subscribe(x => {
            this.sortChange.emit(x);
        });
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.pdfSubscription = this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this));
        this.excelSubscription = this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this));
        this.columnsContainerChange();
        this.columnResizingSubscription = this.columnResizingService
            .changes
            .pipe(tap(e => this.columnResizingInProgress = e.type !== 'end'), filter(e => e.type === 'end'))
            .subscribe(this.notifyResize.bind(this));
        this.columnList = new ColumnList(this.columns);
        this.columnReorderSubscription = this.columnReorderService
            .changes.subscribe(this.reorder.bind(this));
    }
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_grid %}) functionality.
     */
    get skip() {
        return this._skip;
    }
    set skip(value) {
        if (value >= 0) {
            this._skip = value;
        }
    }
    /**
     * The descriptors by which the data will be sorted ([see example]({% slug sorting_grid %})).
     */
    set sort(value) {
        if (isArray(value)) {
            this._sort = value;
        }
    }
    get sort() {
        return this._sort;
    }
    /**
     * The descriptors by which the data will be grouped ([see example]({% slug groupingbasics_grid %})).
     */
    set group(value) {
        if (isArray(value)) {
            this._group = value;
        }
    }
    /**
     */
    get group() {
        return this._group;
    }
    /**
     * @hidden
     */
    get showTopToolbar() {
        return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    }
    /**
     * @hidden
     */
    get showBottomToolbar() {
        return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    }
    /**
     * @hidden
     */
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    /**
     * @hidden
     */
    get showPager() {
        return !this.isVirtual && this.pageable !== false;
    }
    /**
     * @hidden
     */
    get showGroupPanel() {
        return this.groupable && this.groupable.enabled !== false;
    }
    /**
     * @hidden
     */
    get groupableEmptyText() {
        return this.groupable.emptyText;
    }
    /**
     * @hidden
     *
     * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
     */
    set navigatable(value) {
        this.navigable = value;
    }
    /**
     * @hidden
     */
    get navigatable() {
        return this.navigable;
    }
    /**
     * Defines a function that is executed for every data row in the component.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     * import { RowClassArgs } from '@progress/kendo-angular-grid';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        .k-grid tr.even { background-color: #f45c42; }
     *        .k-grid tr.odd { background-color: #41f4df; }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" [rowClass]="rowCallback">
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     *
     *    public rowCallback(context: RowClassArgs) {
     *        const isEven = context.index % 2 == 0;
     *        return {
     *            even: isEven,
     *            odd: !isEven
     *        };
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
     * ```
     */
    set rowClass(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`rowClass must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._rowClass = fn;
    }
    get rowClass() {
        return this._rowClass;
    }
    /**
     * Defines a Boolean function that is executed for each data row in the component
     * ([see example]({% slug selection_grid %}#toc-setting-the-selected-rows)).
     * Determines whether the row will be selected.
     */
    set rowSelected(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`rowSelected must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._rowSelected = fn;
    }
    get rowSelected() {
        return this._rowSelected;
    }
    /**
     * Returns the currently focused cell (if any).
     */
    get activeCell() {
        return this.navigationService.activeCell;
    }
    /**
     * Returns the currently focused row (if any).
     */
    get activeRow() {
        return this.navigationService.activeRow;
    }
    get dir() {
        return this.direction;
    }
    get hostClasses() {
        return true;
    }
    get lockedClasses() {
        return this.lockedLeafColumns.length > 0;
    }
    get virtualClasses() {
        return this.isVirtual;
    }
    get columnResizing() {
        return this.columnResizingInProgress;
    }
    get noScrollbarClass() {
        return this.scrollbarWidth === 0;
    }
    get detailTemplate() {
        if (this._customDetailTemplate) {
            return this._customDetailTemplate;
        }
        return this.detailTemplateChildren ? this.detailTemplateChildren.first : undefined;
    }
    set detailTemplate(detailTemplate) {
        this._customDetailTemplate = detailTemplate;
    }
    get noRecordsTemplate() {
        if (this._customNoRecordsTemplate) {
            return this._customNoRecordsTemplate;
        }
        return this.noRecordsTemplateChildren ? this.noRecordsTemplateChildren.first : undefined;
    }
    set noRecordsTemplate(customNoRecordsTemplate) {
        this._customNoRecordsTemplate = customNoRecordsTemplate;
    }
    get pagerTemplate() {
        if (this._customPagerTemplate) {
            return this._customPagerTemplate;
        }
        return this.pagerTemplateChildren ? this.pagerTemplateChildren.first : undefined;
    }
    set pagerTemplate(customPagerTemplate) {
        this._customPagerTemplate = customPagerTemplate;
    }
    get toolbarTemplate() {
        if (this._customToolbarTemplate) {
            return this._customToolbarTemplate;
        }
        return this.toolbarTemplateChildren ? this.toolbarTemplateChildren.first : undefined;
    }
    set toolbarTemplate(customToolbarTemplate) {
        this._customToolbarTemplate = customToolbarTemplate;
    }
    get headerPadding() {
        if (isUniversal()) {
            return "";
        }
        const padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
        const right = this.rtl ? 0 : padding;
        const left = this.rtl ? padding : 0;
        return `0 ${right} 0 ${left}`;
    }
    get hasGroupFooters() {
        return this.columnsContainer.hasGroupFooter;
    }
    get showFooter() {
        return this.columnsContainer.hasFooter;
    }
    get showGroupFooters() {
        return this.groupable && this.groupable.showFooter;
    }
    get ariaRowCount() {
        return this.totalColumnLevels + 1 + this.view.total;
    }
    get ariaColCount() {
        return this.columnsContainer.leafColumnsToRender.length;
    }
    get isVirtual() {
        return this.scrollable === 'virtual';
    }
    get isScrollable() {
        return this.scrollable !== 'none';
    }
    get visibleColumns() {
        return this.columnsContainer.allColumns;
    }
    get lockedColumns() {
        return this.columnsContainer.lockedColumns;
    }
    get nonLockedColumns() {
        return this.columnsContainer.nonLockedColumns;
    }
    get lockedLeafColumns() {
        return this.columnsContainer.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columnsContainer.nonLockedLeafColumns;
    }
    get leafColumns() {
        return this.columnsContainer.leafColumns;
    }
    get totalColumnLevels() {
        return this.columnsContainer.totalLevels;
    }
    get lockedWidth() {
        const groupCellsWidth = this.group.length * GROUP_CELL_WIDTH;
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), groupCellsWidth);
    }
    get nonLockedWidth() {
        if (!this.rtl && this.lockedLeafColumns.length) {
            return sumColumnWidths(expandColumns(this.nonLockedLeafColumns.toArray()));
        }
        return undefined;
    }
    get selectableSettings() {
        if (this.selectionService) {
            return this.selectionService.options;
        }
        return undefined;
    }
    get columnMenuTemplate() {
        const template = this.columnMenuTemplates.first;
        return template ? template.templateRef : null;
    }
    get totalCount() {
        if (this.isVirtual || !isPresent(this.pageSize)) {
            return this.view.total;
        }
        return this.pageSize;
    }
    /**
     * Expands the specified master row ([see example]({% slug hierarchy_grid %})).
     *
     * @param {number} index - The absolute index of the master row.
     */
    expandRow(index) {
        if (!this.detailsService.isExpanded(index)) {
            this.detailsService.toggleRow(index, null);
        }
    }
    /**
     * Collapses the specified master row.
     *
     * @param {number} index - The absolute index of the master row.
     */
    collapseRow(index) {
        if (this.detailsService.isExpanded(index)) {
            this.detailsService.toggleRow(index, null);
        }
    }
    /**
     * Expands a group header item for the given index. For example,
     * `0_1` expands the second inner group of the first master group.
     *
     * > When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `expandGroup` method is not supported.
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    expandGroup(index) {
        if (!this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    }
    /**
     * Collapses a group header item for the given index. For example,
     * `0_1` collapses the second inner group of the first master group.
     *
     * > When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `collapseGroup` method is not supported.
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    collapseGroup(index) {
        if (this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    }
    /**
     * @hidden
     */
    resetGroupsState() {
        this.groupsService.reset();
    }
    /**
     * @hidden
     */
    expandGroupChildren(groupIndex) {
        this.groupsService.expandChildren(groupIndex);
    }
    /**
     * @hidden
     */
    onDataChange() {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        if (isPresent(this.defaultSelection)) {
            this.defaultSelection.reset();
        }
        this.initSelectionService();
        this.updateNavigationMetadata();
    }
    ngOnChanges(changes) {
        if (isChanged("data", changes)) {
            this.onDataChange();
        }
        if (this.lockedLeafColumns.length && anyChanged(["pageSize", "skip", "sort", "group"], changes)) {
            this.changeNotification.notify();
        }
        if (anyChanged(["pageSize", "scrollable"], changes)) {
            this.updateNavigationMetadata();
        }
        if (isChanged("height", changes, false)) {
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', `${this.height}px`);
        }
        if (isChanged("filterable", changes) && this.lockedColumns.length) {
            this.syncHeaderHeight(this.ngZone.onStable.asObservable().pipe(take(1)));
        }
        if (anyChanged(["columnMenu", "sortable", "filterable"], changes, false)) {
            this.columnMenuOptions = this.columnMenu && Object.assign({
                filter: Boolean(this.filterable),
                sort: Boolean(this.sortable)
            }, this.columnMenu); // tslint:disable-line:align
        }
        if (isChanged("scrollable", changes) && this.isScrollable) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => this.attachScrollSync());
        }
    }
    ngAfterViewInit() {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    }
    ngAfterContentChecked() {
        this.columnsContainer.refresh();
        this.verifySettings();
        this.initSelectionService();
    }
    ngAfterContentInit() {
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        this.columnsChangeSubscription = this.columns.changes.subscribe(() => this.verifySettings());
    }
    ngOnInit() {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    }
    ngOnDestroy() {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.groupExpandCollapseSubscription) {
            this.groupExpandCollapseSubscription.unsubscribe();
        }
        if (this.detailsServiceSubscription) {
            this.detailsServiceSubscription.unsubscribe();
        }
        if (this.editServiceSubscription) {
            this.editServiceSubscription.unsubscribe();
        }
        if (this.pdfSubscription) {
            this.pdfSubscription.unsubscribe();
        }
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        if (this.sortSubscription) {
            this.sortSubscription.unsubscribe();
        }
        if (this.columnsChangeSubscription) {
            this.columnsChangeSubscription.unsubscribe();
        }
        if (this.excelSubscription) {
            this.excelSubscription.unsubscribe();
        }
        if (this.columnsContainerChangeSubscription) {
            this.columnsContainerChangeSubscription.unsubscribe();
        }
        if (this.scrollSyncService) {
            this.scrollSyncService.destroy();
        }
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
        if (this.defaultSelection) {
            this.defaultSelection.destroy();
        }
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
        }
        if (this.footerChangeSubscription) {
            this.footerChangeSubscription.unsubscribe();
        }
        this.ngZone = null;
        if (this.columnResizingSubscription) {
            this.columnResizingSubscription.unsubscribe();
        }
        if (this.columnReorderSubscription) {
            this.columnReorderSubscription.unsubscribe();
        }
        if (this.localizationSubscription) {
            this.localizationSubscription.unsubscribe();
        }
        if (this.columnVisibilityChangeSubscription) {
            this.columnVisibilityChangeSubscription.unsubscribe();
        }
        if (this.columnLockedChangeSubscription) {
            this.columnLockedChangeSubscription.unsubscribe();
        }
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    attachScrollSync() {
        if (isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.footerChangeSubscription = observe(this.footer)
                .subscribe(footers => footers
                .map(footer => footer.nativeElement)
                .filter(isPresent)
                .forEach(element => this.scrollSyncService.registerEmitter(element, "footer")));
        }
    }
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     *
     * @param index - The row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options. Use skipFocus to determine if the row's edit element should be focused. Defaults to `false`.
     */
    editRow(index, group, options) {
        this.editService.editRow(index, group);
        if (options && options.skipFocus) {
            return;
        }
        this.focusEditElement(`tr[data-kendo-grid-item-index="${index}"]`);
    }
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    closeRow(index) {
        this.editService.close(index);
    }
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    addRow(group) {
        const isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            const fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(group);
        this.focusEditElement('.k-grid-add-row');
    }
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    editCell(rowIndex, column, group) {
        const instance = this.columnInstance(column);
        this.editService.editCell(rowIndex, instance, group);
        this.focusEditElement('.k-grid-edit-cell');
    }
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event was prevented.
     */
    closeCell() {
        return !this.editService.closeCell();
    }
    /**
     * Closes the current cell in edit mode.
     */
    cancelCell() {
        this.editService.cancelCell();
    }
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    isEditing() {
        return this.editService.isEditing();
    }
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    isEditingCell() {
        return this.editService.isEditingCell();
    }
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_grid %})).
     */
    saveAsPDF() {
        this.pdfService.save(this);
    }
    /**
     * Exports the Grid element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-grid-pdf` component options.
     * ([see example]({% slug pdfexport_grid %}#toc-exporting-multiple-grids-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    drawPDF() {
        const promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    }
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_grid %})).
     */
    saveAsExcel() {
        this.excelService.save(this);
    }
    /**
     * Applies the minimum possible width for the specified column,
     * so that the whole text fits without wrapping. This method expects the Grid
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the Grid is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid
     *            #grid
     *            [data]="gridData"
     *            [resizable]="true"
     *            style="height: 300px">
     *            <ng-template kendoGridToolbarTemplate>
     *                 <button class="k-button" (click)="grid.autoFitColumn(groupColumn)">
     *                     Auto-fit the group column
     *                 </button>
     *            </ng-template>
     *            <kendo-grid-column-group #groupColumn title="Product Info">
     *                <kendo-grid-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    [minResizableWidth]="30"
     *                    title="ID">
     *                </kendo-grid-column>
     *
     *                <kendo-grid-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-grid-column>
     *            </kendo-grid-column-group>
     *
     *            <kendo-grid-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                filter="numeric"
     *                format="{0:c}">
     *            </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
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
     * ```
     */
    autoFitColumn(column) {
        this.columnResizingService.autoFit(column);
    }
    /**
     * Applies the minimum possible width for the specified columns,
     * so that the whole text fits without wrapping.
     * If no argument is supplied, `autoFitColumns` auto-fits
     * the content of current Grid columns. This method expects the Grid
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the Grid is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *      <kendo-grid
     *          #grid
     *          [data]="gridData"
     *          [resizable]="true"
     *          style="height: 300px">
     *          <ng-template kendoGridToolbarTemplate>
     *              <button class="k-button" (click)="grid.autoFitColumns([firstColumn, lastColumn])">
     *                  Auto-fit the first and last column
     *              </button>
     *              <button class="k-button" (click)="grid.autoFitColumns()">
     *                  Auto-fit all columns
     *              </button>
     *          </ng-template>
     *          <kendo-grid-column-group title="Product Info">
     *              <kendo-grid-column
     *                  #firstColumn
     *                  field="ProductID"
     *                  [width]="50"
     *                  [minResizableWidth]="30"
     *                  title="ID">
     *              </kendo-grid-column>
     *
     *              <kendo-grid-column
     *                  field="ProductName"
     *                  title="Product Name"
     *                  >
     *              </kendo-grid-column>
     *          </kendo-grid-column-group>
     *
     *          <kendo-grid-column
     *              #lastColumn
     *              field="UnitPrice"
     *              title="Unit Price"
     *              [width]="180"
     *              filter="numeric"
     *              format="{0:c}">
     *          </kendo-grid-column>
     *      </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
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
     * ```
     */
    autoFitColumns(columns = this.columns) {
        columns.forEach(this.autoFitColumn.bind(this));
    }
    /**
     * @hidden
     */
    notifyPageChange(source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.pageChange.emit(event);
    }
    /**
     * @hidden
     */
    notifyScrollBottom() {
        if (this.scrollable === 'none') {
            return;
        }
        if (hasObservers(this.scrollBottom)) {
            this.ngZone.run(() => this.scrollBottom.emit({ sender: this }));
        }
    }
    /**
     * @hidden
     */
    focusEditElement(containerSelector) {
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(() => {
            this.focusElementSubscription = this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
                const wrapper = this.wrapper.nativeElement;
                if (!this.setEditFocus(wrapper.querySelector(containerSelector)) && this.isLocked) {
                    this.setEditFocus(wrapper.querySelector(`.k-grid-content ${containerSelector}`));
                }
                this.focusElementSubscription = null;
            });
        });
    }
    /**
     * Focuses the last active or the first cell of the Grid.
     *
     * @returns {NavigationCell} The focused cell.
     */
    focus() {
        this.assertNavigable();
        return this.navigationService.focusCell();
    }
    /**
     * Focuses the cell with the specified row and column index.
     *
     * The row index is based on the logical structure of the Grid and does not correspond to the data item index:
     * * Header rows are indexed and start at row `#0`.
     * * Group headers and footers are indexed.
     *
     * If the Grid is configured for scrolling, including virtual scrolling, the scroll position will be updated.
     * If the row is not present on the current page, the method will have no effect.
     *
     * @param rowIndex - The row index to focus.
     * @param colIndex - The column index to focus.
     * @returns {NavigationCell} The focused cell.
     *
     */
    focusCell(rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    }
    /**
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    focusNextCell(wrap = true) {
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    }
    /**
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    focusPrevCell(wrap = true) {
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    }
    /**
     * Changes the position of the specified column.
     * The reordering of columns operates only on the level
     * which is inferred by the source column.
     * For the `reorderColumn` method to work properly,
     * the `source` column has to be visible.
     *
     * @param {ColumnBase} source - The column whose position will be changed.
     * @param {number} destIndex - The new position of the column.
     * @param {ColumnReorderConfig} options - Additional options.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid
     *            #grid
     *            [data]="gridData"
     *            [reorderable]="true"
     *            style="height: 300px">
     *            <ng-template kendoGridToolbarTemplate>
     *                 <button class="k-button"
     *                     (click)="grid.reorderColumn(groupColumn, 2, { before: true })">
     *                     Move the group column before the last one.
     *                 </button>
     *            </ng-template>
     *            <kendo-grid-column-group #groupColumn title="Product Info">
     *                <kendo-grid-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    title="ID">
     *                </kendo-grid-column>
     *
     *                <kendo-grid-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-grid-column>
     *            </kendo-grid-column-group>
     *
     *            <kendo-grid-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                format="{0:c}">
     *            </kendo-grid-column>
     *
     *            <kendo-grid-column
     *                field="Discontinued"
     *                title="Discontinued"
     *                [width]="100">
     *            </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
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
     * ```
     */
    reorderColumn(source, destIndex, options = { before: false }) {
        const columnsForLevel = this.columnsForLevel(source.level);
        let target = columnsForLevel[destIndex];
        if (!target) {
            return;
        }
        const lastNonLocked = target.isLocked &&
            !source.isLocked &&
            this.columnsContainer.nonLockedColumns.length === 1;
        if (lastNonLocked) {
            return;
        }
        if (isSpanColumnComponent(target) && !options.before) {
            target = target.childColumns.last;
        }
        this.reorder({
            before: options.before,
            source: source,
            target: target
        });
    }
    /**
     * @hidden
     */
    reorder({ target, source, before, changeContainer }) {
        this.ngZone.run(() => {
            const columnsForLevel = this.columnsForLevel(source.level);
            let newIndex = columnsForLevel.indexOf(target);
            if (target.parent && target.parent.isSpanColumn) {
                newIndex = columnsForLevel.indexOf(target.parent);
                if (before) {
                    target = target.parent;
                }
            }
            let oldIndex = columnsForLevel.indexOf(source);
            if (changeContainer) {
                if (before && 0 < newIndex && oldIndex < newIndex) { // dropped before the first not locked column
                    newIndex--;
                }
                else if (!before && oldIndex > newIndex) { // dropped after the last locked column
                    newIndex++;
                }
            }
            const args = new ColumnReorderEvent({
                column: source,
                oldIndex: oldIndex,
                newIndex: newIndex
            });
            this.columnReorder.emit(args);
            if (args.isDefaultPrevented()) {
                return;
            }
            if (changeContainer) {
                this.columnLockedChange.emit(new ColumnLockedChangeEvent([source]));
            }
            this.updateColumnIndices({ source, target, before });
            if (source.locked !== target.locked) {
                source.locked = target.locked;
            }
            this.columnsContainer.refresh();
            this.changeDetectorRef.markForCheck();
        });
    }
    updateColumnIndices({ source, target, before }) {
        const expandedColumns = expandColumnsWithSpan(this.columnsForLevel(source.level));
        const sourceColumnIndex = expandedColumns.indexOf(source);
        let nextSourceIndex = 0;
        let nextIndex = 0;
        let toSkip = 1;
        // Possible only when called from the API.
        if (source.isSpanColumn) {
            toSkip += source.childColumns.length;
        }
        let i = 0;
        while (i < expandedColumns.length) {
            let column = expandedColumns[i];
            if (column === target) {
                nextSourceIndex = before ? nextIndex : nextIndex + 1;
                nextIndex = before ? nextIndex + toSkip : nextIndex;
                column.orderIndex = nextIndex;
                if (nextSourceIndex === nextIndex + 1) {
                    nextIndex += toSkip;
                }
            }
            else if (column === source) {
                i += toSkip;
                continue;
            }
            else {
                column.orderIndex = nextIndex;
            }
            nextIndex++;
            i++;
        }
        for (i = sourceColumnIndex; i < sourceColumnIndex + toSkip; i++) {
            expandedColumns[i].orderIndex = nextSourceIndex++;
        }
        this.updateIndicesForLevel(source.level + 1);
    }
    updateIndicesForLevel(level) {
        const colsForParentLevel = this.columnsForLevel(level - 1);
        const colsForLevel = [];
        sortColumns(colsForParentLevel).forEach((c) => {
            if (c.children) {
                colsForLevel.push(...c.children.toArray().splice(1, c.children.length - 1).sort((a, b) => a.orderIndex - b.orderIndex));
            }
        });
        expandColumnsWithSpan(colsForLevel).map((c, i) => c.orderIndex = i);
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    }
    columnsForLevel(level) {
        return this.columnsContainer
            .allColumns.filter(column => column.level === level);
    }
    initSelectionService() {
        if (!this.selectionDirective && !isPresent(this.defaultSelection)) {
            this.defaultSelection = new Selection(this, this.changeDetectorRef);
        }
        this.selectionService.init({
            rowSelected: this.rowSelected,
            selectable: this.selectable,
            view: this.view
        });
        if (!this.selectionDirective && !this.selectableSettings.enabled) {
            this.defaultSelection.reset();
        }
    }
    setEditFocus(element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    }
    columnInstance(column) {
        let instance;
        if (typeof column === 'number') {
            instance = this.columnsContainer.lockedLeafColumns.toArray()
                .concat(this.columnsContainer.nonLockedLeafColumns.toArray())[column];
        }
        else if (typeof column === 'string') {
            instance = this.columnList.filter((item) => item.field === column)[0];
        }
        else {
            instance = column;
        }
        if (!instance && isDevMode()) {
            throw new Error(`Invalid column ${column}`);
        }
        return instance;
    }
    verifySettings() {
        if (isDevMode()) {
            const locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (locked && this.detailTemplate) {
                throw new Error('Having both detail template and locked columns is not supported.');
            }
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if (locked && expandColumns(this.columnList.toArray()).filter(x => !x.width).length) {
                throw new Error('Locked columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter((x) => x.children.length < 2).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(x => x.locked && x.parent && !x.parent.isLocked).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
                throw new Error('Row height and detail row height settings require virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    }
    autoGenerateColumns() {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            this.columns.reset(Object.keys(this.view.at(0)).map(field => {
                let column = new ColumnComponent();
                column.field = field;
                return column;
            }));
        }
    }
    attachStateChangesEmitter() {
        this.stateChangeSubscription =
            merge(this.pageChange.pipe(map(x => ({
                filter: this.filter, group: this.group, skip: x.skip, sort: this.sort, take: x.take
            }))), this.sortChange.pipe(map(sort => ({ filter: this.filter, group: this.group, skip: this.skip, sort: sort, take: this.pageSize }))), this.groupChange.pipe(map(group => ({
                filter: this.filter, group: group, skip: this.skip, sort: this.sort, take: this.pageSize
            }))), this.filterChange.pipe(map(filter => ({
                filter: filter, group: this.group, skip: 0, sort: this.sort, take: this.pageSize
            }))))
                .subscribe(x => {
                this.closeCell();
                this.cancelCell();
                this.dataStateChange.emit(x);
            });
    }
    attachEditHandlers() {
        if (!this.editService) {
            return;
        }
        this.editServiceSubscription = this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this));
    }
    emitCRUDEvent(args) {
        const { action, rowIndex, formGroup } = args;
        let dataItem = this.view.at(rowIndex - this.skip);
        if (action !== 'add' && !dataItem) {
            dataItem = formGroup.value;
        }
        this.closeCell();
        Object.assign(args, {
            dataItem: dataItem,
            sender: this
        });
        switch (action) {
            case 'add':
                this.add.emit(args);
                break;
            case 'cancel':
                this.cancel.emit(args);
                break;
            case 'edit':
                this.edit.emit(args);
                break;
            case 'remove':
                this.remove.emit(args);
                break;
            case 'save':
                this.save.emit(args);
                break;
            case 'cellClose':
                this.cellClose.emit(args);
                break;
            default: break;
        }
    }
    attachDomEventHandlers() {
        this.cellClickSubscription = this.domEvents.cellClick.subscribe((args) => {
            this.cellClick.emit(Object.assign({ sender: this }, args));
        });
    }
    attachElementEventHandlers() {
        if (isUniversal()) {
            return;
        }
        const wrapper = this.wrapper.nativeElement;
        const ariaRoot = this.ariaRoot.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            const resizeCheck = this.resizeCheck.bind(this);
            const resizeSubscription = this.renderer.listen('window', 'resize', resizeCheck);
            const orientationSubscription = this.renderer.listen('window', 'orientationchange', resizeCheck);
            const documentClickSubscription = this.renderer.listen('document', 'click', (args) => {
                const activeElement = document.activeElement;
                if (this.editService.shouldCloseCell() &&
                    !closest(args.target, matchesClasses('k-animation-container k-grid-ignore-click')) &&
                    !(activeElement &&
                        (closest(activeElement, matchesClasses('k-animation-container')) ||
                            isInEditedCell(activeElement, this.wrapper.nativeElement)))) {
                    this.editService.closeCell(args);
                }
            });
            const windowBlurSubscription = this.renderer.listen('window', 'blur', (args) => {
                const activeElement = document.activeElement;
                if (activeElement && !(matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
                    isInEditedCell(activeElement, this.wrapper.nativeElement))) {
                    this.editService.closeCell(args);
                }
                this.domEvents.windowBlur.emit(args);
            });
            const clickSubscription = this.renderer.listen(wrapper, 'click', (args) => {
                this.domEvents.click.emit(args);
            });
            const keydownSubscription = this.renderer.listen(wrapper, 'keydown', (args) => {
                this.domEvents.keydown.emit(args);
            });
            // focusIn and focusOut are relative to the element with ARIA role "grid"
            let focused = false;
            const focusInSubscription = this.renderer.listen(ariaRoot, 'focusin', (args) => {
                this.domEvents.focus.emit(args);
                if (!focused) {
                    this.domEvents.focusIn.emit(args);
                    focused = true;
                }
            });
            const focusOutSubscription = this.renderer.listen(ariaRoot, 'focusout', (args) => {
                const next = args.relatedTarget || document.activeElement;
                const outside = !closest(next, (node) => node === ariaRoot);
                if (outside) {
                    this.domEvents.focusOut.emit(args);
                    focused = false;
                }
            });
            this.detachElementEventHandlers = () => {
                resizeSubscription();
                orientationSubscription();
                documentClickSubscription();
                windowBlurSubscription();
                clickSubscription();
                keydownSubscription();
                focusInSubscription();
                focusOutSubscription();
            };
        });
    }
    matchesMedia(c) {
        return this.responsiveService.matchesMedia(c.media);
    }
    resizeCheck() {
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            let hasChanges = false;
            this.columnList.filterHierarchy(column => {
                const matchesMedia = this.matchesMedia(column);
                if (column.matchesMedia !== matchesMedia) {
                    hasChanges = true;
                    column.matchesMedia = matchesMedia;
                }
                return column.isVisible;
            });
            if (hasChanges) {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                });
            }
        }
    }
    emitPDFExportEvent() {
        const args = new PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    }
    syncHeaderHeight(observable) {
        return observable
            .pipe(filter(() => isPresent(this.lockedHeader)))
            .subscribe(() => syncRowsHeight(this.lockedHeader.nativeElement.children[0], this.header.nativeElement.children[0]));
    }
    columnsContainerChange() {
        this.columnsContainerChangeSubscription =
            this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(() => this.lockedColumns.length > 0), switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1)))));
    }
    notifyResize(e) {
        const args = e.resizedColumns
            .filter(item => isTruthy(item.column.resizable) && !item.column.isColumnGroup)
            .map(item => ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }));
        this.columnResize.emit(args);
    }
    assertNavigable() {
        if (isDevMode() && !this.navigable) {
            throw new Error('The Grid should be configured as [navigable]="true" to control focus');
        }
    }
    navigationMetadata() {
        const isVirtual = this.isVirtual;
        const pageSize = this.pageSize;
        const dataRows = isVirtual ? this.view.total : pageSize;
        const addRowOffset = this.editService.hasNewItem ? 1 : 0;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRows = this.totalColumnLevels + 1 + filterRowOffset + addRowOffset;
        return new NavigationMetadata(dataRows, headerRows, isVirtual, this.showPager, isPresent(this.detailTemplate), this.wrapper);
    }
    updateNavigationMetadata() {
        this.navigationService.metadata = this.navigationMetadata();
    }
    applyAutoSize() {
        const cols = this.columns.filter((c) => this.autoSize ? c.autoSize !== false : c.autoSize);
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(take(1)).subscribe(_ => this.autoFitColumns(cols));
        }
    }
}
GridComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                exportAs: 'kendoGrid',
                providers: [
                    LocalizationService,
                    BrowserSupportService,
                    ColumnInfoService,
                    SelectionService,
                    DetailsService,
                    GroupsService,
                    GroupInfoService,
                    ChangeNotificationService,
                    EditService,
                    PDFService,
                    SuspendService,
                    {
                        provide: CELL_CONTEXT,
                        useValue: ɵ4
                    },
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.grid'
                    },
                    FilterService,
                    ResponsiveService,
                    PagerContextService,
                    ExcelService,
                    ScrollSyncService,
                    ResizeService,
                    LocalDataChangesService,
                    DomEventsService,
                    ColumnResizingService,
                    SinglePopupService,
                    DragAndDropService,
                    DragHintService,
                    DropCueService,
                    ColumnReorderService,
                    NavigationService,
                    FocusRoot,
                    IdService,
                    ScrollRequestService,
                    SortService
                ],
                selector: 'kendo-grid',
                styles: [
                    // Styles for backwards compatibility with kendo-theme-default@v2.46.0 and earlier.
                    `   .k-grid .k-grid-aria-root {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            overflow: hidden;
        }

        .k-grid .k-filter-row td {
            white-space: nowrap;
        }
    `
                ],
                template: `
        <ng-container kendoGridLocalizedMessages
            i18n-groupPanelEmpty="kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty"
            groupPanelEmpty="Drag a column header and drop it here to group by that column"

            i18n-noRecords="kendo.grid.noRecords|The label visible in the Grid when there are no records"
            noRecords="No records available."

            i18n-pagerFirstPage="kendo.grid.pagerFirstPage|The label for the first page button in Grid pager"
            pagerFirstPage="Go to the first page"

            i18n-pagerPreviousPage="kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager"
            pagerPreviousPage="Go to the previous page"

            i18n-pagerNextPage="kendo.grid.pagerNextPage|The label for the next page button in Grid pager"
            pagerNextPage="Go to the next page"

            i18n-pagerLastPage="kendo.grid.pagerLastPage|The label for the last page button in Grid pager"
            pagerLastPage="Go to the last page"

            i18n-pagerPage="kendo.grid.pagerPage|The label before the current page number in the Grid pager"
            pagerPage="Page"

            i18n-pagerOf="kendo.grid.pagerOf|The label before the total pages number in the Grid pager"
            pagerOf="of"

            i18n-pagerItems="kendo.grid.pagerItems|The label after the total pages number in the Grid pager"
            pagerItems="items"

            i18n-pagerItemsPerPage="kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager"
            pagerItemsPerPage="items per page"

            i18n-filter="kendo.grid.filter|The label of the filter cell or icon"
            filter="Filter"

            i18n-filterEqOperator="kendo.grid.filterEqOperator|The text of the equal filter operator"
            filterEqOperator="Is equal to"

            i18n-filterNotEqOperator="kendo.grid.filterNotEqOperator|The text of the not equal filter operator"
            filterNotEqOperator="Is not equal to"

            i18n-filterIsNullOperator="kendo.grid.filterIsNullOperator|The text of the is null filter operator"
            filterIsNullOperator="Is null"

            i18n-filterIsNotNullOperator="kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator"
            filterIsNotNullOperator="Is not null"

            i18n-filterIsEmptyOperator="kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator"
            filterIsEmptyOperator="Is empty"

            i18n-filterIsNotEmptyOperator="kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator"
            filterIsNotEmptyOperator="Is not empty"

            i18n-filterStartsWithOperator="kendo.grid.filterStartsWithOperator|The text of the starts with filter operator"
            filterStartsWithOperator="Starts with"

            i18n-filterContainsOperator="kendo.grid.filterContainsOperator|The text of the contains filter operator"
            filterContainsOperator="Contains"

            i18n-filterNotContainsOperator="kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator"
            filterNotContainsOperator="Does not contain"

            i18n-filterEndsWithOperator="kendo.grid.filterEndsWithOperator|The text of the ends with filter operator"
            filterEndsWithOperator="Ends with"

            i18n-filterGteOperator="kendo.grid.filterGteOperator|The text of the greater than or equal filter operator"
            filterGteOperator="Is greater than or equal to"

            i18n-filterGtOperator="kendo.grid.filterGtOperator|The text of the greater than filter operator"
            filterGtOperator="Is greater than"

            i18n-filterLteOperator="kendo.grid.filterLteOperator|The text of the less than or equal filter operator"
            filterLteOperator="Is less than or equal to"

            i18n-filterLtOperator="kendo.grid.filterLtOperator|The text of the less than filter operator"
            filterLtOperator="Is less than"

            i18n-filterIsTrue="kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option"
            filterIsTrue="Is True"

            i18n-filterIsFalse="kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option"
            filterIsFalse="Is False"

            i18n-filterBooleanAll="kendo.grid.filterBooleanAll|The text of the (All) boolean filter option"
            filterBooleanAll="(All)"

            i18n-filterAfterOrEqualOperator="kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator"
            filterAfterOrEqualOperator="Is after or equal to"

            i18n-filterAfterOperator="kendo.grid.filterAfterOperator|The text of the after date filter operator"
            filterAfterOperator="Is after"

            i18n-filterBeforeOperator="kendo.grid.filterBeforeOperator|The text of the before date filter operator"
            filterBeforeOperator="Is before"

            i18n-filterBeforeOrEqualOperator="kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator"
            filterBeforeOrEqualOperator="Is before or equal to"

            i18n-filterFilterButton="kendo.grid.filterFilterButton|The text of the filter button"
            filterFilterButton="Filter"

            i18n-filterClearButton="kendo.grid.filterClearButton|The text of the clear filter button"
            filterClearButton="Clear"

            i18n-filterAndLogic="kendo.grid.filterAndLogic|The text of the And filter logic"
            filterAndLogic="And"

            i18n-filterOrLogic="kendo.grid.filterOrLogic|The text of the Or filter logic"
            filterOrLogic="Or"

            i18n-loading="kendo.grid.loading|The loading text"
            loading="Loading"

            i18n-columnMenu="kendo.grid.columnMenu|The title of the column menu icon"
            columnMenu="Column Menu"

            i18n-columns="kendo.grid.columns|The text shown in the column menu for the columns item"
            columns="Columns"

            i18n-lock="kendo.grid.lock|The text shown in the column menu for the lock item"
            lock="Lock"

            i18n-unlock="kendo.grid.unlock|The text shown in the column menu for the unlock item"
            unlock="Unlock"

            i18n-sortable="kendo.grid.sortable|The label of the sort icon"
            sortable="Sortable"

            i18n-sortAscending="kendo.grid.sortAscending|The text shown in the column menu for the sort ascending item"
            sortAscending="Sort Ascending"

            i18n-sortDescending="kendo.grid.sortDescending|The text shown in the column menu for the sort descending item"
            sortDescending="Sort Descending"

            i18n-sortedAscending="kendo.grid.sortedAscending|The status announcement when a column is sorted ascending"
            sortedAscending="Sorted Ascending"

            i18n-sortedDescending="kendo.grid.sortedDescending|The status announcement when a column is sorted descending"
            sortedDescending="Sorted Descending"

            i18n-sortedDefault="kendo.grid.sortedDefault|The status announcement when a column is no longer sorted"
            sortedDefault="Not Sorted"

            i18n-columnsApply="kendo.grid.columnsApply|The text shown in the column menu or column chooser for the columns apply button"
            columnsApply="Apply"

            i18n-columnsReset="kendo.grid.columnsReset|The text shown in the column menu or column chooser for the columns reset button"
            columnsReset="Reset"

            i18n-detailExpand="kendo.grid.detailExpand|The title of the expand icon of detail rows."
            detailExpand="Expand Details"

            i18n-detailCollapse="kendo.grid.detailCollapse|The title of the collapse icon of detail rows."
            detailCollapse="Collapse Details"
         >
        </ng-container>
        <kendo-grid-toolbar *ngIf="showTopToolbar" position="top"></kendo-grid-toolbar>
        <kendo-grid-group-panel
            *ngIf="showGroupPanel"
            [text]="groupableEmptyText"
            [groups]="group"
            (change)="groupChange.emit($event)">
        </kendo-grid-group-panel>
        <div #ariaRoot
            class="k-grid-aria-root"
            role="grid"
            [attr.aria-rowcount]="ariaRowCount"
            [attr.aria-colcount]="ariaColCount">
        <ng-template [ngIf]="isScrollable">
            <div *ngIf="!hideHeader"
                class="k-grid-header"
                role="presentation"
                [style.padding]="headerPadding">
                <div *ngIf="isLocked"
                     #lockedHeader
                     role="presentation"
                     class="k-grid-header-locked"
                     [style.width.px]="lockedWidth">
                    <table [locked]="true" role="presentation" [style.width.px]="lockedWidth">
                        <colgroup kendoGridColGroup
                            role="presentation"
                            [columns]="lockedLeafColumns"
                            [groups]="group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <thead kendoGridHeader
                            [resizable]="resizable"
                            [scrollable]="true"
                            [columns]="lockedColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [groups]="group"
                            [filter]="filter"
                            [filterable]="filterable"
                            [groupable]="showGroupPanel"
                            [reorderable]="reorderable"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [totalColumnsCount]="leafColumns.length"
                            [detailTemplate]="detailTemplate">
                        </thead>
                    </table>
                </div><div #header class="k-grid-header-wrap" role="presentation" data-scrollable
                    [kendoGridResizableContainer]="lockedLeafColumns.length"
                    [lockedWidth]="lockedWidth + scrollbarWidth + 2">
                    <table role="presentation" [style.width.px]="nonLockedWidth">
                        <colgroup kendoGridColGroup
                            role="presentation"
                            [columns]="nonLockedLeafColumns"
                            [groups]="isLocked ? [] : group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <thead kendoGridHeader
                            [resizable]="resizable"
                            role="presentation"
                            [scrollable]="true"
                            [columns]="nonLockedColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [filter]="filter"
                            [filterable]="filterable"
                            [groupable]="showGroupPanel"
                            [reorderable]="reorderable"
                            [groups]="isLocked ? [] : group"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [lockedColumnsCount]="lockedLeafColumns.length"
                            [totalColumnsCount]="leafColumns.length"
                            [detailTemplate]="detailTemplate">
                        </thead>
                    </table>
                </div>
            </div>
            <kendo-grid-list
                [data]="view"
                [rowHeight]="rowHeight"
                [detailRowHeight]="detailRowHeight"
                [total]="totalCount"
                [take]="pageSize"
                [groups]="group"
                [groupable]="groupable"
                [skip]="skip"
                [trackBy]="trackBy"
                [columns]="columnsContainer"
                [selectable]="selectable"
                [filterable]="filterable"
                [detailTemplate]="detailTemplate"
                [noRecordsTemplate]="noRecordsTemplate"
                (pageChange)="notifyPageChange('list', $event)"
                [rowClass]="rowClass"
                [loading]="loading"
                (scrollBottom)="notifyScrollBottom()"
                >
            </kendo-grid-list>
            <div
                *ngIf="showFooter"
                class="k-grid-footer"
                [style.padding]="headerPadding">
                <div
                    *ngIf="lockedLeafColumns.length"
                    class="k-grid-footer-locked"
                    [style.width.px]="lockedWidth">
                    <table [locked]="true" [style.width.px]="lockedWidth">
                        <colgroup kendoGridColGroup
                            [columns]="lockedLeafColumns"
                            [groups]="group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <tfoot kendoGridFooter
                            [scrollable]="true"
                            [groups]="group"
                            [columns]="lockedLeafColumns"
                            [detailTemplate]="detailTemplate">
                        </tfoot>
                    </table>
                </div><div #footer
                    class="k-grid-footer-wrap" data-scrollable
                    [kendoGridResizableContainer]="lockedLeafColumns.length"
                    [lockedWidth]="lockedWidth + scrollbarWidth + 3">
                    <table [style.width.px]="nonLockedWidth">
                        <colgroup kendoGridColGroup
                            [columns]="nonLockedLeafColumns"
                            [groups]="isLocked ? [] : group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <tfoot kendoGridFooter
                            [scrollable]="true"
                            [groups]="isLocked ? [] : group"
                            [columns]="nonLockedLeafColumns"
                            [lockedColumnsCount]="lockedLeafColumns.length"
                            [detailTemplate]="detailTemplate">
                        </tfoot>
                    </table>
                </div>
            </div>
        </ng-template>
        <ng-template [ngIf]="!isScrollable">
            <table [style.table-layout]="resizable ? 'fixed' : null">
                <colgroup kendoGridColGroup
                    [columns]="leafColumns"
                    [groups]="group"
                    [detailTemplate]="detailTemplate">
                </colgroup>
                <thead kendoGridHeader
                    *ngIf="!hideHeader"
                    [resizable]="resizable"
                    [scrollable]="false"
                    [columns]="visibleColumns"
                    [totalColumnLevels]="totalColumnLevels"
                    [groups]="group"
                    [groupable]="showGroupPanel"
                    [reorderable]="reorderable"
                    [sort]="sort"
                    [sortable]="sortable"
                    [filter]="filter"
                    [filterable]="filterable"
                    [columnMenu]="columnMenuOptions"
                    [columnMenuTemplate]="columnMenuTemplate"
                    [detailTemplate]="detailTemplate">
                </thead>
                <tbody kendoGridTableBody
                    [groups]="group"
                    [data]="view"
                    [skip]="skip"
                    [columns]="leafColumns"
                    [selectable]="selectable"
                    [filterable]="filterable"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [detailTemplate]="detailTemplate"
                    [showGroupFooters]="showGroupFooters"
                    [trackBy]="trackBy"
                    [rowClass]="rowClass">
                </tbody>
                <tfoot kendoGridFooter
                    *ngIf="showFooter"
                    [scrollable]="false"
                    [groups]="group"
                    [columns]="leafColumns"
                    [detailTemplate]="detailTemplate">
                </tfoot>
            </table>
            <div *ngIf="loading" kendoGridLoading>
            </div>
        </ng-template>
        </div>
        <kendo-pager
            *ngIf="showPager"
            [template]="pagerTemplate"
            [pageSize]="pageSize"
            [total]="view.total"
            [skip]="skip"
            [options]="pageable"
            (pageChange)="notifyPageChange('pager', $event)">
        </kendo-pager>
        <kendo-grid-toolbar *ngIf="showBottomToolbar" position="bottom"></kendo-grid-toolbar>
    `
            },] },
];
/** @nocollapse */
GridComponent.ctorParameters = () => [
    { type: BrowserSupportService },
    { type: SelectionService },
    { type: ElementRef },
    { type: GroupInfoService },
    { type: GroupsService },
    { type: ChangeNotificationService },
    { type: DetailsService },
    { type: EditService },
    { type: FilterService },
    { type: PDFService },
    { type: ResponsiveService },
    { type: Renderer2 },
    { type: ExcelService },
    { type: NgZone },
    { type: ScrollSyncService },
    { type: DomEventsService },
    { type: ColumnResizingService },
    { type: ChangeDetectorRef },
    { type: ColumnReorderService },
    { type: ColumnInfoService },
    { type: NavigationService },
    { type: SortService },
    { type: LocalizationService }
];
GridComponent.propDecorators = {
    data: [{ type: Input }],
    pageSize: [{ type: Input }],
    height: [{ type: Input }],
    rowHeight: [{ type: Input }],
    detailRowHeight: [{ type: Input }],
    skip: [{ type: Input }],
    scrollable: [{ type: Input }],
    selectable: [{ type: Input }],
    sort: [{ type: Input }],
    trackBy: [{ type: Input }],
    filter: [{ type: Input }],
    group: [{ type: Input }],
    filterable: [{ type: Input }],
    sortable: [{ type: Input }],
    pageable: [{ type: Input }],
    groupable: [{ type: Input }],
    navigable: [{ type: Input }],
    navigatable: [{ type: Input }],
    autoSize: [{ type: Input }],
    rowClass: [{ type: Input }],
    rowSelected: [{ type: Input }],
    resizable: [{ type: Input }],
    reorderable: [{ type: Input }],
    loading: [{ type: Input }],
    columnMenu: [{ type: Input }],
    hideHeader: [{ type: Input }],
    filterChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    groupChange: [{ type: Output }],
    sortChange: [{ type: Output }],
    selectionChange: [{ type: Output }],
    dataStateChange: [{ type: Output }],
    groupExpand: [{ type: Output }],
    groupCollapse: [{ type: Output }],
    detailExpand: [{ type: Output }],
    detailCollapse: [{ type: Output }],
    edit: [{ type: Output }],
    cancel: [{ type: Output }],
    save: [{ type: Output }],
    remove: [{ type: Output }],
    add: [{ type: Output }],
    cellClose: [{ type: Output }],
    cellClick: [{ type: Output }],
    pdfExport: [{ type: Output }],
    excelExport: [{ type: Output }],
    columnResize: [{ type: Output }],
    columnReorder: [{ type: Output }],
    columnVisibilityChange: [{ type: Output }],
    columnLockedChange: [{ type: Output }],
    scrollBottom: [{ type: Output }],
    columns: [{ type: ContentChildren, args: [ColumnBase,] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-grid',] }],
    lockedClasses: [{ type: HostBinding, args: ['class.k-grid-lockedcolumns',] }],
    virtualClasses: [{ type: HostBinding, args: ['class.k-grid-virtual',] }],
    columnResizing: [{ type: HostBinding, args: ['class.k-grid-column-resizing',] }],
    noScrollbarClass: [{ type: HostBinding, args: ['class.k-grid-no-scrollbar',] }],
    detailTemplateChildren: [{ type: ContentChildren, args: [DetailTemplateDirective,] }],
    noRecordsTemplateChildren: [{ type: ContentChildren, args: [NoRecordsTemplateDirective,] }],
    pagerTemplateChildren: [{ type: ContentChildren, args: [PagerTemplateDirective,] }],
    toolbarTemplateChildren: [{ type: ContentChildren, args: [ToolbarTemplateDirective,] }],
    columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }],
    lockedHeader: [{ type: ViewChild, args: ["lockedHeader",] }],
    header: [{ type: ViewChild, args: ["header",] }],
    footer: [{ type: ViewChildren, args: ["footer",] }],
    ariaRoot: [{ type: ViewChild, args: ['ariaRoot',] }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
