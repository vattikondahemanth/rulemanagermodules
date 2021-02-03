/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_emitter_1 = require("./common/event-emitter");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var column_component_1 = require("./columns/column.component");
var span_column_component_1 = require("./columns/span-column.component");
var column_group_component_1 = require("./columns/column-group.component");
var detail_template_directive_1 = require("./rendering/details/detail-template.directive");
var utils_1 = require("./utils");
var browser_support_service_1 = require("./layout/browser-support.service");
var data_collection_1 = require("./data/data.collection");
var selection_service_1 = require("./selection/selection.service");
var selection_default_1 = require("./selection/selection-default");
var edit_service_1 = require("./editing/edit.service");
var details_service_1 = require("./rendering/details/details.service");
var groups_service_1 = require("./grouping/groups.service");
var columns_container_1 = require("./columns/columns-container");
var group_info_service_1 = require("./grouping/group-info.service");
var change_notification_service_1 = require("./data/change-notification.service");
var no_records_template_directive_1 = require("./rendering/no-records-template.directive");
var column_base_1 = require("./columns/column-base");
var row_sync_1 = require("./layout/row-sync");
var cell_context_1 = require("./rendering/common/cell-context");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var filter_service_1 = require("./filtering/filter.service");
var pager_template_directive_1 = require("./pager/pager-template.directive");
var pager_context_service_1 = require("./pager/pager-context.service");
var pdf_service_1 = require("./pdf/pdf.service");
var pdf_export_event_1 = require("./pdf/pdf-export-event");
var suspend_service_1 = require("./scrolling/suspend.service");
var responsive_service_1 = require("./layout/responsive.service");
var excel_service_1 = require("./excel/excel.service");
var column_list_1 = require("./columns/column-list");
var toolbar_template_directive_1 = require("./rendering/toolbar/toolbar-template.directive");
var column_common_1 = require("./columns/column-common");
var scroll_sync_service_1 = require("./scrolling/scroll-sync.service");
var resize_service_1 = require("./layout/resize.service");
var dom_queries_1 = require("./rendering/common/dom-queries");
var local_data_changes_service_1 = require("./editing/local-data-changes.service");
var dom_events_service_1 = require("./common/dom-events.service");
var column_resizing_service_1 = require("./column-resizing/column-resizing.service");
var filterable_1 = require("./filtering/filterable");
var single_popup_service_1 = require("./common/single-popup.service");
var drag_and_drop_service_1 = require("./dragdrop/drag-and-drop.service");
var drag_hint_service_1 = require("./dragdrop/drag-hint.service");
var drop_cue_service_1 = require("./dragdrop/drop-cue.service");
var column_reorder_service_1 = require("./dragdrop/column-reorder.service");
var column_reorder_event_1 = require("./dragdrop/column-reorder-event");
var focus_root_1 = require("./navigation/focus-root");
var navigation_service_1 = require("./navigation/navigation.service");
var navigation_metadata_1 = require("./navigation/navigation-metadata");
var id_service_1 = require("./common/id.service");
var column_info_service_1 = require("./common/column-info.service");
var scroll_request_service_1 = require("./scrolling/scroll-request.service");
var sort_service_1 = require("./common/sort.service");
var column_menu_template_directive_1 = require("./column-menu/column-menu-template.directive");
var column_visibility_change_event_1 = require("./column-menu/column-visibility-change-event");
var column_locked_change_event_1 = require("./column-menu/column-locked-change-event");
var constants_1 = require("./constants");
var column_common_2 = require("./columns/column-common");
var default_track_by_1 = require("./common/default-track-by");
var createControl = function (source) { return function (acc, key) {
    acc[key] = new forms_1.FormControl(source[key]);
    return acc;
}; };
var ɵ0 = createControl;
exports.ɵ0 = ɵ0;
var validateColumnsField = function (columns) {
    return column_common_1.expandColumns(columns.toArray())
        .filter(column_component_1.isColumnComponent)
        .filter(function (_a) {
        var field = _a.field;
        return !column_common_1.isValidFieldName(field);
    })
        .forEach(function (_a) {
        var field = _a.field;
        return console.warn("\n                Grid column field name '" + field + "' does not look like a valid JavaScript identifier.\n                Identifiers can contain only alphanumeric characters (including \"$\" or \"_\"), and may not start with a digit.\n                Please use only valid identifier names to ensure error-free operation.\n            ");
    });
};
var ɵ1 = validateColumnsField;
exports.ɵ1 = ɵ1;
var handleExpandCollapseService = function (service, expandEmitter, collapseEmitter, map) { return (service.changes.pipe(operators_1.filter(function (_a) {
    var dataItem = _a.dataItem;
    return utils_1.isPresent(dataItem);
}))
    .subscribe(function (x) { return x.expand ? expandEmitter.emit(map(x)) : collapseEmitter.emit(map(x)); })); };
var ɵ2 = handleExpandCollapseService;
exports.ɵ2 = ɵ2;
var isInEditedCell = function (element, gridElement) {
    return dom_queries_1.closest(element, dom_queries_1.matchesClasses('k-grid-edit-cell')) &&
        dom_queries_1.closest(element, dom_queries_1.matchesNodeName('kendo-grid')) === gridElement;
};
var ɵ3 = isInEditedCell;
exports.ɵ3 = ɵ3;
var ɵ4 = cell_context_1.EMPTY_CELL_CONTEXT;
exports.ɵ4 = ɵ4;
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
var GridComponent = /** @class */ (function () {
    function GridComponent(supportService, selectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, localization) {
        var _this = this;
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
        this.trackBy = default_track_by_1.defaultTrackBy;
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
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires when the page of the Grid is changed ([see example]({% slug paging_grid %})).
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new core_1.EventEmitter();
        /**
         * Fires when the grouping of the Grid is changed.
         * You have to handle the event yourself and group the data ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupChange = new event_emitter_1.ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the sorting of the Grid is changed ([see example]({% slug sorting_grid %})).
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new core_1.EventEmitter();
        /**
         * Fires when the user selects a Grid row.
         * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent %}#toc-selectionchange).
         */
        this.selectionChange = new core_1.EventEmitter();
        /**
         * Fires when the data state of the Grid is changed.
         */
        this.dataStateChange = new core_1.EventEmitter();
        /**
         * Fires when the user expands a group header.
         */
        this.groupExpand = new core_1.EventEmitter();
        /**
         * Fires when the user collapses a group header.
         */
        this.groupCollapse = new core_1.EventEmitter();
        /**
         * Fires when the user expands a master row.
         */
        this.detailExpand = new core_1.EventEmitter();
        /**
         * Fires when the user collapses a master row.
         */
        this.detailCollapse = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
         */
        this.edit = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
         */
        this.cancel = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-saving-records)).
         */
        this.save = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-removing-records)).
         */
        this.remove = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row
         * ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
         */
        this.add = new core_1.EventEmitter();
        /**
         * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClose = new core_1.EventEmitter();
        /**
         * Fires when the user clicks a cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClick = new event_emitter_1.ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user clicks the **Export to PDF** command button.
         */
        this.pdfExport = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Export to Excel** command button.
         */
        this.excelExport = new core_1.EventEmitter();
        /**
         * Fires when the user completes the resizing of the column.
         */
        this.columnResize = new event_emitter_1.ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user completes the reordering of the column.
         */
        this.columnReorder = new core_1.EventEmitter();
        /**
         * Fires when the user changes the visibility of the columns from the column menu or column chooser.
         */
        this.columnVisibilityChange = new core_1.EventEmitter();
        /**
         * Fires when the user changes the locked state of the columns from the column menu or by reordering the columns.
         */
        this.columnLockedChange = new core_1.EventEmitter();
        /**
         * Fires when the user scrolls to the last record on the page and enables endless scrolling
         * ([see example]({% slug scrollmmodes_grid %}#toc-endless-scrolling)).
         * You have to handle the event yourself and page the data.
         */
        this.scrollBottom = new core_1.EventEmitter();
        /**
         * A query list of all declared columns.
         */
        this.columns = new core_1.QueryList();
        this.footer = new core_1.QueryList();
        this.selectionDirective = false;
        this.columnsContainer = new columns_container_1.ColumnsContainer(function () { return _this.columnList.filterHierarchy(function (column) {
            column.matchesMedia = _this.matchesMedia(column);
            return column.isVisible;
        }); });
        this.view = new data_collection_1.DataCollection(function () { return new data_collection_1.DataResultIterator(_this.data, _this.skip, _this.hasGroupFooters); });
        this.shouldGenerateColumns = true;
        this._sort = new Array();
        this._group = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this.columnResizingInProgress = false;
        this.rtl = false;
        this._rowClass = function () { return null; };
        this.localizationSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
        this.scrollbarWidth = supportService.scrollbarWidth;
        this.groupInfoService.registerColumnsContainer(function () { return _this.columnList; });
        this.columnInfoService.init(this.columnsContainer, function () { return _this.columnList; });
        this.columnVisibilityChangeSubscription = this.columnInfoService.visibilityChange.subscribe(function (changed) {
            _this.columnVisibilityChange.emit(new column_visibility_change_event_1.ColumnVisibilityChangeEvent(changed));
        });
        this.columnLockedChangeSubscription = this.columnInfoService.lockedChange.subscribe(function (changed) {
            _this.columnLockedChange.emit(new column_locked_change_event_1.ColumnLockedChangeEvent(changed));
        });
        if (selectionService) {
            this.selectionSubscription = selectionService.changes.subscribe(function (event) {
                _this.ngZone.run(function () { return _this.selectionChange.emit(event); });
            });
        }
        this.groupExpandCollapseSubscription = handleExpandCollapseService(groupsService, this.groupExpand, this.groupCollapse, function (_a) {
            var group = _a.dataItem, index = _a.index;
            return ({ group: group, groupIndex: index });
        });
        this.detailsServiceSubscription = handleExpandCollapseService(detailsService, this.detailExpand, this.detailCollapse, function (args) { return args; });
        this.filterSubscription = this.filterService.changes.subscribe(function (x) {
            _this.filterChange.emit(x);
        });
        this.sortSubscription = this.sortService.changes.subscribe(function (x) {
            _this.sortChange.emit(x);
        });
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.pdfSubscription = this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this));
        this.excelSubscription = this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this));
        this.columnsContainerChange();
        this.columnResizingSubscription = this.columnResizingService
            .changes
            .pipe(operators_1.tap(function (e) { return _this.columnResizingInProgress = e.type !== 'end'; }), operators_1.filter(function (e) { return e.type === 'end'; }))
            .subscribe(this.notifyResize.bind(this));
        this.columnList = new column_list_1.ColumnList(this.columns);
        this.columnReorderSubscription = this.columnReorderService
            .changes.subscribe(this.reorder.bind(this));
    }
    Object.defineProperty(GridComponent.prototype, "skip", {
        /**
         * Defines the number of records to be skipped by the pager.
         * Required by the [paging]({% slug paging_grid %}) functionality.
         */
        get: function () {
            return this._skip;
        },
        set: function (value) {
            if (value >= 0) {
                this._skip = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        /**
         * The descriptors by which the data will be sorted ([see example]({% slug sorting_grid %})).
         */
        set: function (value) {
            if (utils_1.isArray(value)) {
                this._sort = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "group", {
        /**
         */
        get: function () {
            return this._group;
        },
        /**
         * The descriptors by which the data will be grouped ([see example]({% slug groupingbasics_grid %})).
         */
        set: function (value) {
            if (utils_1.isArray(value)) {
                this._group = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showTopToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showBottomToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showPager", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isVirtual && this.pageable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupPanel", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable && this.groupable.enabled !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "groupableEmptyText", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable.emptyText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "navigatable", {
        /**
         * @hidden
         */
        get: function () {
            return this.navigable;
        },
        /**
         * @hidden
         *
         * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
         */
        set: function (value) {
            this.navigable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowClass", {
        get: function () {
            return this._rowClass;
        },
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
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("rowClass must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowClass = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowSelected", {
        get: function () {
            return this._rowSelected;
        },
        /**
         * Defines a Boolean function that is executed for each data row in the component
         * ([see example]({% slug selection_grid %}#toc-setting-the-selected-rows)).
         * Determines whether the row will be selected.
         */
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("rowSelected must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowSelected = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "activeCell", {
        /**
         * Returns the currently focused cell (if any).
         */
        get: function () {
            return this.navigationService.activeCell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "activeRow", {
        /**
         * Returns the currently focused row (if any).
         */
        get: function () {
            return this.navigationService.activeRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedClasses", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "virtualClasses", {
        get: function () {
            return this.isVirtual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "columnResizing", {
        get: function () {
            return this.columnResizingInProgress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "noScrollbarClass", {
        get: function () {
            return this.scrollbarWidth === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "detailTemplate", {
        get: function () {
            if (this._customDetailTemplate) {
                return this._customDetailTemplate;
            }
            return this.detailTemplateChildren ? this.detailTemplateChildren.first : undefined;
        },
        set: function (detailTemplate) {
            this._customDetailTemplate = detailTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "noRecordsTemplate", {
        get: function () {
            if (this._customNoRecordsTemplate) {
                return this._customNoRecordsTemplate;
            }
            return this.noRecordsTemplateChildren ? this.noRecordsTemplateChildren.first : undefined;
        },
        set: function (customNoRecordsTemplate) {
            this._customNoRecordsTemplate = customNoRecordsTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "pagerTemplate", {
        get: function () {
            if (this._customPagerTemplate) {
                return this._customPagerTemplate;
            }
            return this.pagerTemplateChildren ? this.pagerTemplateChildren.first : undefined;
        },
        set: function (customPagerTemplate) {
            this._customPagerTemplate = customPagerTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "toolbarTemplate", {
        get: function () {
            if (this._customToolbarTemplate) {
                return this._customToolbarTemplate;
            }
            return this.toolbarTemplateChildren ? this.toolbarTemplateChildren.first : undefined;
        },
        set: function (customToolbarTemplate) {
            this._customToolbarTemplate = customToolbarTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerPadding", {
        get: function () {
            if (utils_1.isUniversal()) {
                return "";
            }
            var padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
            var right = this.rtl ? 0 : padding;
            var left = this.rtl ? padding : 0;
            return "0 " + right + " 0 " + left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hasGroupFooters", {
        get: function () {
            return this.columnsContainer.hasGroupFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showFooter", {
        get: function () {
            return this.columnsContainer.hasFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupFooters", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "ariaRowCount", {
        get: function () {
            return this.totalColumnLevels + 1 + this.view.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "ariaColCount", {
        get: function () {
            return this.columnsContainer.leafColumnsToRender.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isVirtual", {
        get: function () {
            return this.scrollable === 'virtual';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isScrollable", {
        get: function () {
            return this.scrollable !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "visibleColumns", {
        get: function () {
            return this.columnsContainer.allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedColumns", {
        get: function () {
            return this.columnsContainer.lockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedColumns", {
        get: function () {
            return this.columnsContainer.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columnsContainer.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "leafColumns", {
        get: function () {
            return this.columnsContainer.leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalColumnLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.group.length * constants_1.GROUP_CELL_WIDTH;
            return column_common_1.expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedWidth", {
        get: function () {
            if (!this.rtl && this.lockedLeafColumns.length) {
                return column_common_1.sumColumnWidths(column_common_1.expandColumns(this.nonLockedLeafColumns.toArray()));
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "selectableSettings", {
        get: function () {
            if (this.selectionService) {
                return this.selectionService.options;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "columnMenuTemplate", {
        get: function () {
            var template = this.columnMenuTemplates.first;
            return template ? template.templateRef : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalCount", {
        get: function () {
            if (this.isVirtual || !utils_1.isPresent(this.pageSize)) {
                return this.view.total;
            }
            return this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Expands the specified master row ([see example]({% slug hierarchy_grid %})).
     *
     * @param {number} index - The absolute index of the master row.
     */
    GridComponent.prototype.expandRow = function (index) {
        if (!this.detailsService.isExpanded(index)) {
            this.detailsService.toggleRow(index, null);
        }
    };
    /**
     * Collapses the specified master row.
     *
     * @param {number} index - The absolute index of the master row.
     */
    GridComponent.prototype.collapseRow = function (index) {
        if (this.detailsService.isExpanded(index)) {
            this.detailsService.toggleRow(index, null);
        }
    };
    /**
     * Expands a group header item for the given index. For example,
     * `0_1` expands the second inner group of the first master group.
     *
     * > When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `expandGroup` method is not supported.
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    GridComponent.prototype.expandGroup = function (index) {
        if (!this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * Collapses a group header item for the given index. For example,
     * `0_1` collapses the second inner group of the first master group.
     *
     * > When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `collapseGroup` method is not supported.
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    GridComponent.prototype.collapseGroup = function (index) {
        if (this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.resetGroupsState = function () {
        this.groupsService.reset();
    };
    /**
     * @hidden
     */
    GridComponent.prototype.expandGroupChildren = function (groupIndex) {
        this.groupsService.expandChildren(groupIndex);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.onDataChange = function () {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        if (utils_1.isPresent(this.defaultSelection)) {
            this.defaultSelection.reset();
        }
        this.initSelectionService();
        this.updateNavigationMetadata();
    };
    GridComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (utils_1.isChanged("data", changes)) {
            this.onDataChange();
        }
        if (this.lockedLeafColumns.length && utils_1.anyChanged(["pageSize", "skip", "sort", "group"], changes)) {
            this.changeNotification.notify();
        }
        if (utils_1.anyChanged(["pageSize", "scrollable"], changes)) {
            this.updateNavigationMetadata();
        }
        if (utils_1.isChanged("height", changes, false)) {
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', this.height + "px");
        }
        if (utils_1.isChanged("filterable", changes) && this.lockedColumns.length) {
            this.syncHeaderHeight(this.ngZone.onStable.asObservable().pipe(operators_1.take(1)));
        }
        if (utils_1.anyChanged(["columnMenu", "sortable", "filterable"], changes, false)) {
            this.columnMenuOptions = this.columnMenu && Object.assign({
                filter: Boolean(this.filterable),
                sort: Boolean(this.sortable)
            }, this.columnMenu); // tslint:disable-line:align
        }
        if (utils_1.isChanged("scrollable", changes) && this.isScrollable) {
            this.ngZone.onStable.pipe(operators_1.take(1)).subscribe(function () { return _this.attachScrollSync(); });
        }
    };
    GridComponent.prototype.ngAfterViewInit = function () {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    };
    GridComponent.prototype.ngAfterContentChecked = function () {
        this.columnsContainer.refresh();
        this.verifySettings();
        this.initSelectionService();
    };
    GridComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new column_list_1.ColumnList(this.columns);
        this.columnsChangeSubscription = this.columns.changes.subscribe(function () { return _this.verifySettings(); });
    };
    GridComponent.prototype.ngOnInit = function () {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    };
    GridComponent.prototype.ngOnDestroy = function () {
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
    };
    /**
     * @hidden
     */
    GridComponent.prototype.attachScrollSync = function () {
        var _this = this;
        if (utils_1.isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.footerChangeSubscription = utils_1.observe(this.footer)
                .subscribe(function (footers) {
                return footers
                    .map(function (footer) { return footer.nativeElement; })
                    .filter(utils_1.isPresent)
                    .forEach(function (element) {
                    return _this.scrollSyncService.registerEmitter(element, "footer");
                });
            });
        }
    };
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     *
     * @param index - The row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options. Use skipFocus to determine if the row's edit element should be focused. Defaults to `false`.
     */
    GridComponent.prototype.editRow = function (index, group, options) {
        this.editService.editRow(index, group);
        if (options && options.skipFocus) {
            return;
        }
        this.focusEditElement("tr[data-kendo-grid-item-index=\"" + index + "\"]");
    };
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    GridComponent.prototype.closeRow = function (index) {
        this.editService.close(index);
    };
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    GridComponent.prototype.addRow = function (group) {
        var isFormGroup = group instanceof forms_1.FormGroup;
        if (!isFormGroup) {
            var fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new forms_1.FormGroup(fields);
        }
        this.editService.addRow(group);
        this.focusEditElement('.k-grid-add-row');
    };
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    GridComponent.prototype.editCell = function (rowIndex, column, group) {
        var instance = this.columnInstance(column);
        this.editService.editCell(rowIndex, instance, group);
        this.focusEditElement('.k-grid-edit-cell');
    };
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event was prevented.
     */
    GridComponent.prototype.closeCell = function () {
        return !this.editService.closeCell();
    };
    /**
     * Closes the current cell in edit mode.
     */
    GridComponent.prototype.cancelCell = function () {
        this.editService.cancelCell();
    };
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    GridComponent.prototype.isEditing = function () {
        return this.editService.isEditing();
    };
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    GridComponent.prototype.isEditingCell = function () {
        return this.editService.isEditingCell();
    };
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_grid %})).
     */
    GridComponent.prototype.saveAsPDF = function () {
        this.pdfService.save(this);
    };
    /**
     * Exports the Grid element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-grid-pdf` component options.
     * ([see example]({% slug pdfexport_grid %}#toc-exporting-multiple-grids-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    GridComponent.prototype.drawPDF = function () {
        var promise = utils_1.createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    };
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_grid %})).
     */
    GridComponent.prototype.saveAsExcel = function () {
        this.excelService.save(this);
    };
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
    GridComponent.prototype.autoFitColumn = function (column) {
        this.columnResizingService.autoFit(column);
    };
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
    GridComponent.prototype.autoFitColumns = function (columns) {
        if (columns === void 0) { columns = this.columns; }
        columns.forEach(this.autoFitColumn.bind(this));
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyPageChange = function (source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.pageChange.emit(event);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyScrollBottom = function () {
        var _this = this;
        if (this.scrollable === 'none') {
            return;
        }
        if (utils_1.hasObservers(this.scrollBottom)) {
            this.ngZone.run(function () { return _this.scrollBottom.emit({ sender: _this }); });
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.focusEditElement = function (containerSelector) {
        var _this = this;
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(function () {
            _this.focusElementSubscription = _this.ngZone.onStable.asObservable().pipe(operators_1.take(1)).subscribe(function () {
                var wrapper = _this.wrapper.nativeElement;
                if (!_this.setEditFocus(wrapper.querySelector(containerSelector)) && _this.isLocked) {
                    _this.setEditFocus(wrapper.querySelector(".k-grid-content " + containerSelector));
                }
                _this.focusElementSubscription = null;
            });
        });
    };
    /**
     * Focuses the last active or the first cell of the Grid.
     *
     * @returns {NavigationCell} The focused cell.
     */
    GridComponent.prototype.focus = function () {
        this.assertNavigable();
        return this.navigationService.focusCell();
    };
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
    GridComponent.prototype.focusCell = function (rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    };
    /**
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    GridComponent.prototype.focusNextCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    };
    /**
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    GridComponent.prototype.focusPrevCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    };
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
    GridComponent.prototype.reorderColumn = function (source, destIndex, options) {
        if (options === void 0) { options = { before: false }; }
        var columnsForLevel = this.columnsForLevel(source.level);
        var target = columnsForLevel[destIndex];
        if (!target) {
            return;
        }
        var lastNonLocked = target.isLocked &&
            !source.isLocked &&
            this.columnsContainer.nonLockedColumns.length === 1;
        if (lastNonLocked) {
            return;
        }
        if (span_column_component_1.isSpanColumnComponent(target) && !options.before) {
            target = target.childColumns.last;
        }
        this.reorder({
            before: options.before,
            source: source,
            target: target
        });
    };
    /**
     * @hidden
     */
    GridComponent.prototype.reorder = function (_a) {
        var _this = this;
        var target = _a.target, source = _a.source, before = _a.before, changeContainer = _a.changeContainer;
        this.ngZone.run(function () {
            var columnsForLevel = _this.columnsForLevel(source.level);
            var newIndex = columnsForLevel.indexOf(target);
            if (target.parent && target.parent.isSpanColumn) {
                newIndex = columnsForLevel.indexOf(target.parent);
                if (before) {
                    target = target.parent;
                }
            }
            var oldIndex = columnsForLevel.indexOf(source);
            if (changeContainer) {
                if (before && 0 < newIndex && oldIndex < newIndex) { // dropped before the first not locked column
                    newIndex--;
                }
                else if (!before && oldIndex > newIndex) { // dropped after the last locked column
                    newIndex++;
                }
            }
            var args = new column_reorder_event_1.ColumnReorderEvent({
                column: source,
                oldIndex: oldIndex,
                newIndex: newIndex
            });
            _this.columnReorder.emit(args);
            if (args.isDefaultPrevented()) {
                return;
            }
            if (changeContainer) {
                _this.columnLockedChange.emit(new column_locked_change_event_1.ColumnLockedChangeEvent([source]));
            }
            _this.updateColumnIndices({ source: source, target: target, before: before });
            if (source.locked !== target.locked) {
                source.locked = target.locked;
            }
            _this.columnsContainer.refresh();
            _this.changeDetectorRef.markForCheck();
        });
    };
    GridComponent.prototype.updateColumnIndices = function (_a) {
        var source = _a.source, target = _a.target, before = _a.before;
        var expandedColumns = column_common_1.expandColumnsWithSpan(this.columnsForLevel(source.level));
        var sourceColumnIndex = expandedColumns.indexOf(source);
        var nextSourceIndex = 0;
        var nextIndex = 0;
        var toSkip = 1;
        // Possible only when called from the API.
        if (source.isSpanColumn) {
            toSkip += source.childColumns.length;
        }
        var i = 0;
        while (i < expandedColumns.length) {
            var column = expandedColumns[i];
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
    };
    GridComponent.prototype.updateIndicesForLevel = function (level) {
        var colsForParentLevel = this.columnsForLevel(level - 1);
        var colsForLevel = [];
        column_common_2.sortColumns(colsForParentLevel).forEach(function (c) {
            if (c.children) {
                colsForLevel.push.apply(colsForLevel, c.children.toArray().splice(1, c.children.length - 1).sort(function (a, b) { return a.orderIndex - b.orderIndex; }));
            }
        });
        column_common_1.expandColumnsWithSpan(colsForLevel).map(function (c, i) { return c.orderIndex = i; });
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    };
    GridComponent.prototype.columnsForLevel = function (level) {
        return this.columnsContainer
            .allColumns.filter(function (column) { return column.level === level; });
    };
    GridComponent.prototype.initSelectionService = function () {
        if (!this.selectionDirective && !utils_1.isPresent(this.defaultSelection)) {
            this.defaultSelection = new selection_default_1.Selection(this, this.changeDetectorRef);
        }
        this.selectionService.init({
            rowSelected: this.rowSelected,
            selectable: this.selectable,
            view: this.view
        });
        if (!this.selectionDirective && !this.selectableSettings.enabled) {
            this.defaultSelection.reset();
        }
    };
    GridComponent.prototype.setEditFocus = function (element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    };
    GridComponent.prototype.columnInstance = function (column) {
        var instance;
        if (typeof column === 'number') {
            instance = this.columnsContainer.lockedLeafColumns.toArray()
                .concat(this.columnsContainer.nonLockedLeafColumns.toArray())[column];
        }
        else if (typeof column === 'string') {
            instance = this.columnList.filter(function (item) { return item.field === column; })[0];
        }
        else {
            instance = column;
        }
        if (!instance && core_1.isDevMode()) {
            throw new Error("Invalid column " + column);
        }
        return instance;
    };
    GridComponent.prototype.verifySettings = function () {
        if (core_1.isDevMode()) {
            var locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (locked && this.detailTemplate) {
                throw new Error('Having both detail template and locked columns is not supported.');
            }
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if (locked && column_common_1.expandColumns(this.columnList.toArray()).filter(function (x) { return !x.width; }).length) {
                throw new Error('Locked columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(column_group_component_1.isColumnGroupComponent).filter(function (x) { return x.children.length < 2; }).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(function (x) { return x.locked && x.parent && !x.parent.isLocked; }).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
                throw new Error('Row height and detail row height settings require virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    };
    GridComponent.prototype.autoGenerateColumns = function () {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            this.columns.reset(Object.keys(this.view.at(0)).map(function (field) {
                var column = new column_component_1.ColumnComponent();
                column.field = field;
                return column;
            }));
        }
    };
    GridComponent.prototype.attachStateChangesEmitter = function () {
        var _this = this;
        this.stateChangeSubscription =
            rxjs_1.merge(this.pageChange.pipe(operators_1.map(function (x) { return ({
                filter: _this.filter, group: _this.group, skip: x.skip, sort: _this.sort, take: x.take
            }); })), this.sortChange.pipe(operators_1.map(function (sort) { return ({ filter: _this.filter, group: _this.group, skip: _this.skip, sort: sort, take: _this.pageSize }); })), this.groupChange.pipe(operators_1.map(function (group) { return ({
                filter: _this.filter, group: group, skip: _this.skip, sort: _this.sort, take: _this.pageSize
            }); })), this.filterChange.pipe(operators_1.map(function (filter) { return ({
                filter: filter, group: _this.group, skip: 0, sort: _this.sort, take: _this.pageSize
            }); })))
                .subscribe(function (x) {
                _this.closeCell();
                _this.cancelCell();
                _this.dataStateChange.emit(x);
            });
    };
    GridComponent.prototype.attachEditHandlers = function () {
        if (!this.editService) {
            return;
        }
        this.editServiceSubscription = this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this));
    };
    GridComponent.prototype.emitCRUDEvent = function (args) {
        var action = args.action, rowIndex = args.rowIndex, formGroup = args.formGroup;
        var dataItem = this.view.at(rowIndex - this.skip);
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
    };
    GridComponent.prototype.attachDomEventHandlers = function () {
        var _this = this;
        this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
            _this.cellClick.emit(Object.assign({ sender: _this }, args));
        });
    };
    GridComponent.prototype.attachElementEventHandlers = function () {
        var _this = this;
        if (utils_1.isUniversal()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        var ariaRoot = this.ariaRoot.nativeElement;
        this.ngZone.runOutsideAngular(function () {
            var resizeCheck = _this.resizeCheck.bind(_this);
            var resizeSubscription = _this.renderer.listen('window', 'resize', resizeCheck);
            var orientationSubscription = _this.renderer.listen('window', 'orientationchange', resizeCheck);
            var documentClickSubscription = _this.renderer.listen('document', 'click', function (args) {
                var activeElement = document.activeElement;
                if (_this.editService.shouldCloseCell() &&
                    !dom_queries_1.closest(args.target, dom_queries_1.matchesClasses('k-animation-container k-grid-ignore-click')) &&
                    !(activeElement &&
                        (dom_queries_1.closest(activeElement, dom_queries_1.matchesClasses('k-animation-container')) ||
                            isInEditedCell(activeElement, _this.wrapper.nativeElement)))) {
                    _this.editService.closeCell(args);
                }
            });
            var windowBlurSubscription = _this.renderer.listen('window', 'blur', function (args) {
                var activeElement = document.activeElement;
                if (activeElement && !(dom_queries_1.matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
                    isInEditedCell(activeElement, _this.wrapper.nativeElement))) {
                    _this.editService.closeCell(args);
                }
                _this.domEvents.windowBlur.emit(args);
            });
            var clickSubscription = _this.renderer.listen(wrapper, 'click', function (args) {
                _this.domEvents.click.emit(args);
            });
            var keydownSubscription = _this.renderer.listen(wrapper, 'keydown', function (args) {
                _this.domEvents.keydown.emit(args);
            });
            // focusIn and focusOut are relative to the element with ARIA role "grid"
            var focused = false;
            var focusInSubscription = _this.renderer.listen(ariaRoot, 'focusin', function (args) {
                _this.domEvents.focus.emit(args);
                if (!focused) {
                    _this.domEvents.focusIn.emit(args);
                    focused = true;
                }
            });
            var focusOutSubscription = _this.renderer.listen(ariaRoot, 'focusout', function (args) {
                var next = args.relatedTarget || document.activeElement;
                var outside = !dom_queries_1.closest(next, function (node) { return node === ariaRoot; });
                if (outside) {
                    _this.domEvents.focusOut.emit(args);
                    focused = false;
                }
            });
            _this.detachElementEventHandlers = function () {
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
    };
    GridComponent.prototype.matchesMedia = function (c) {
        return this.responsiveService.matchesMedia(c.media);
    };
    GridComponent.prototype.resizeCheck = function () {
        var _this = this;
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            var hasChanges_1 = false;
            this.columnList.filterHierarchy(function (column) {
                var matchesMedia = _this.matchesMedia(column);
                if (column.matchesMedia !== matchesMedia) {
                    hasChanges_1 = true;
                    column.matchesMedia = matchesMedia;
                }
                return column.isVisible;
            });
            if (hasChanges_1) {
                this.ngZone.run(function () {
                    _this.changeDetectorRef.markForCheck();
                });
            }
        }
    };
    GridComponent.prototype.emitPDFExportEvent = function () {
        var args = new pdf_export_event_1.PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    };
    GridComponent.prototype.syncHeaderHeight = function (observable) {
        var _this = this;
        return observable
            .pipe(operators_1.filter(function () { return utils_1.isPresent(_this.lockedHeader); }))
            .subscribe(function () {
            return row_sync_1.syncRowsHeight(_this.lockedHeader.nativeElement.children[0], _this.header.nativeElement.children[0]);
        });
    };
    GridComponent.prototype.columnsContainerChange = function () {
        var _this = this;
        this.columnsContainerChangeSubscription =
            this.syncHeaderHeight(this.columnsContainer.changes.pipe(operators_1.filter(function () { return _this.lockedColumns.length > 0; }), operators_1.switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(operators_1.take(1)); })));
    };
    GridComponent.prototype.notifyResize = function (e) {
        var args = e.resizedColumns
            .filter(function (item) { return utils_1.isTruthy(item.column.resizable) && !item.column.isColumnGroup; })
            .map(function (item) { return ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }); });
        this.columnResize.emit(args);
    };
    GridComponent.prototype.assertNavigable = function () {
        if (core_1.isDevMode() && !this.navigable) {
            throw new Error('The Grid should be configured as [navigable]="true" to control focus');
        }
    };
    GridComponent.prototype.navigationMetadata = function () {
        var isVirtual = this.isVirtual;
        var pageSize = this.pageSize;
        var dataRows = isVirtual ? this.view.total : pageSize;
        var addRowOffset = this.editService.hasNewItem ? 1 : 0;
        var filterRowOffset = filterable_1.hasFilterRow(this.filterable) ? 1 : 0;
        var headerRows = this.totalColumnLevels + 1 + filterRowOffset + addRowOffset;
        return new navigation_metadata_1.NavigationMetadata(dataRows, headerRows, isVirtual, this.showPager, utils_1.isPresent(this.detailTemplate), this.wrapper);
    };
    GridComponent.prototype.updateNavigationMetadata = function () {
        this.navigationService.metadata = this.navigationMetadata();
    };
    GridComponent.prototype.applyAutoSize = function () {
        var _this = this;
        var cols = this.columns.filter(function (c) { return _this.autoSize ? c.autoSize !== false : c.autoSize; });
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(operators_1.take(1)).subscribe(function (_) { return _this.autoFitColumns(cols); });
        }
    };
    GridComponent.decorators = [
        { type: core_1.Component, args: [{
                    encapsulation: core_1.ViewEncapsulation.None,
                    exportAs: 'kendoGrid',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        browser_support_service_1.BrowserSupportService,
                        column_info_service_1.ColumnInfoService,
                        selection_service_1.SelectionService,
                        details_service_1.DetailsService,
                        groups_service_1.GroupsService,
                        group_info_service_1.GroupInfoService,
                        change_notification_service_1.ChangeNotificationService,
                        edit_service_1.EditService,
                        pdf_service_1.PDFService,
                        suspend_service_1.SuspendService,
                        {
                            provide: cell_context_1.CELL_CONTEXT,
                            useValue: ɵ4
                        },
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.grid'
                        },
                        filter_service_1.FilterService,
                        responsive_service_1.ResponsiveService,
                        pager_context_service_1.PagerContextService,
                        excel_service_1.ExcelService,
                        scroll_sync_service_1.ScrollSyncService,
                        resize_service_1.ResizeService,
                        local_data_changes_service_1.LocalDataChangesService,
                        dom_events_service_1.DomEventsService,
                        column_resizing_service_1.ColumnResizingService,
                        single_popup_service_1.SinglePopupService,
                        drag_and_drop_service_1.DragAndDropService,
                        drag_hint_service_1.DragHintService,
                        drop_cue_service_1.DropCueService,
                        column_reorder_service_1.ColumnReorderService,
                        navigation_service_1.NavigationService,
                        focus_root_1.FocusRoot,
                        id_service_1.IdService,
                        scroll_request_service_1.ScrollRequestService,
                        sort_service_1.SortService
                    ],
                    selector: 'kendo-grid',
                    styles: [
                        // Styles for backwards compatibility with kendo-theme-default@v2.46.0 and earlier.
                        "   .k-grid .k-grid-aria-root {\n            display: flex;\n            flex-direction: column;\n            flex: 1 1 auto;\n            overflow: hidden;\n        }\n\n        .k-grid .k-filter-row td {\n            white-space: nowrap;\n        }\n    "
                    ],
                    template: "\n        <ng-container kendoGridLocalizedMessages\n            i18n-groupPanelEmpty=\"kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty\"\n            groupPanelEmpty=\"Drag a column header and drop it here to group by that column\"\n\n            i18n-noRecords=\"kendo.grid.noRecords|The label visible in the Grid when there are no records\"\n            noRecords=\"No records available.\"\n\n            i18n-pagerFirstPage=\"kendo.grid.pagerFirstPage|The label for the first page button in Grid pager\"\n            pagerFirstPage=\"Go to the first page\"\n\n            i18n-pagerPreviousPage=\"kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager\"\n            pagerPreviousPage=\"Go to the previous page\"\n\n            i18n-pagerNextPage=\"kendo.grid.pagerNextPage|The label for the next page button in Grid pager\"\n            pagerNextPage=\"Go to the next page\"\n\n            i18n-pagerLastPage=\"kendo.grid.pagerLastPage|The label for the last page button in Grid pager\"\n            pagerLastPage=\"Go to the last page\"\n\n            i18n-pagerPage=\"kendo.grid.pagerPage|The label before the current page number in the Grid pager\"\n            pagerPage=\"Page\"\n\n            i18n-pagerOf=\"kendo.grid.pagerOf|The label before the total pages number in the Grid pager\"\n            pagerOf=\"of\"\n\n            i18n-pagerItems=\"kendo.grid.pagerItems|The label after the total pages number in the Grid pager\"\n            pagerItems=\"items\"\n\n            i18n-pagerItemsPerPage=\"kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager\"\n            pagerItemsPerPage=\"items per page\"\n\n            i18n-filter=\"kendo.grid.filter|The label of the filter cell or icon\"\n            filter=\"Filter\"\n\n            i18n-filterEqOperator=\"kendo.grid.filterEqOperator|The text of the equal filter operator\"\n            filterEqOperator=\"Is equal to\"\n\n            i18n-filterNotEqOperator=\"kendo.grid.filterNotEqOperator|The text of the not equal filter operator\"\n            filterNotEqOperator=\"Is not equal to\"\n\n            i18n-filterIsNullOperator=\"kendo.grid.filterIsNullOperator|The text of the is null filter operator\"\n            filterIsNullOperator=\"Is null\"\n\n            i18n-filterIsNotNullOperator=\"kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator\"\n            filterIsNotNullOperator=\"Is not null\"\n\n            i18n-filterIsEmptyOperator=\"kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator\"\n            filterIsEmptyOperator=\"Is empty\"\n\n            i18n-filterIsNotEmptyOperator=\"kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator\"\n            filterIsNotEmptyOperator=\"Is not empty\"\n\n            i18n-filterStartsWithOperator=\"kendo.grid.filterStartsWithOperator|The text of the starts with filter operator\"\n            filterStartsWithOperator=\"Starts with\"\n\n            i18n-filterContainsOperator=\"kendo.grid.filterContainsOperator|The text of the contains filter operator\"\n            filterContainsOperator=\"Contains\"\n\n            i18n-filterNotContainsOperator=\"kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator\"\n            filterNotContainsOperator=\"Does not contain\"\n\n            i18n-filterEndsWithOperator=\"kendo.grid.filterEndsWithOperator|The text of the ends with filter operator\"\n            filterEndsWithOperator=\"Ends with\"\n\n            i18n-filterGteOperator=\"kendo.grid.filterGteOperator|The text of the greater than or equal filter operator\"\n            filterGteOperator=\"Is greater than or equal to\"\n\n            i18n-filterGtOperator=\"kendo.grid.filterGtOperator|The text of the greater than filter operator\"\n            filterGtOperator=\"Is greater than\"\n\n            i18n-filterLteOperator=\"kendo.grid.filterLteOperator|The text of the less than or equal filter operator\"\n            filterLteOperator=\"Is less than or equal to\"\n\n            i18n-filterLtOperator=\"kendo.grid.filterLtOperator|The text of the less than filter operator\"\n            filterLtOperator=\"Is less than\"\n\n            i18n-filterIsTrue=\"kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option\"\n            filterIsTrue=\"Is True\"\n\n            i18n-filterIsFalse=\"kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option\"\n            filterIsFalse=\"Is False\"\n\n            i18n-filterBooleanAll=\"kendo.grid.filterBooleanAll|The text of the (All) boolean filter option\"\n            filterBooleanAll=\"(All)\"\n\n            i18n-filterAfterOrEqualOperator=\"kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator\"\n            filterAfterOrEqualOperator=\"Is after or equal to\"\n\n            i18n-filterAfterOperator=\"kendo.grid.filterAfterOperator|The text of the after date filter operator\"\n            filterAfterOperator=\"Is after\"\n\n            i18n-filterBeforeOperator=\"kendo.grid.filterBeforeOperator|The text of the before date filter operator\"\n            filterBeforeOperator=\"Is before\"\n\n            i18n-filterBeforeOrEqualOperator=\"kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator\"\n            filterBeforeOrEqualOperator=\"Is before or equal to\"\n\n            i18n-filterFilterButton=\"kendo.grid.filterFilterButton|The text of the filter button\"\n            filterFilterButton=\"Filter\"\n\n            i18n-filterClearButton=\"kendo.grid.filterClearButton|The text of the clear filter button\"\n            filterClearButton=\"Clear\"\n\n            i18n-filterAndLogic=\"kendo.grid.filterAndLogic|The text of the And filter logic\"\n            filterAndLogic=\"And\"\n\n            i18n-filterOrLogic=\"kendo.grid.filterOrLogic|The text of the Or filter logic\"\n            filterOrLogic=\"Or\"\n\n            i18n-loading=\"kendo.grid.loading|The loading text\"\n            loading=\"Loading\"\n\n            i18n-columnMenu=\"kendo.grid.columnMenu|The title of the column menu icon\"\n            columnMenu=\"Column Menu\"\n\n            i18n-columns=\"kendo.grid.columns|The text shown in the column menu for the columns item\"\n            columns=\"Columns\"\n\n            i18n-lock=\"kendo.grid.lock|The text shown in the column menu for the lock item\"\n            lock=\"Lock\"\n\n            i18n-unlock=\"kendo.grid.unlock|The text shown in the column menu for the unlock item\"\n            unlock=\"Unlock\"\n\n            i18n-sortable=\"kendo.grid.sortable|The label of the sort icon\"\n            sortable=\"Sortable\"\n\n            i18n-sortAscending=\"kendo.grid.sortAscending|The text shown in the column menu for the sort ascending item\"\n            sortAscending=\"Sort Ascending\"\n\n            i18n-sortDescending=\"kendo.grid.sortDescending|The text shown in the column menu for the sort descending item\"\n            sortDescending=\"Sort Descending\"\n\n            i18n-sortedAscending=\"kendo.grid.sortedAscending|The status announcement when a column is sorted ascending\"\n            sortedAscending=\"Sorted Ascending\"\n\n            i18n-sortedDescending=\"kendo.grid.sortedDescending|The status announcement when a column is sorted descending\"\n            sortedDescending=\"Sorted Descending\"\n\n            i18n-sortedDefault=\"kendo.grid.sortedDefault|The status announcement when a column is no longer sorted\"\n            sortedDefault=\"Not Sorted\"\n\n            i18n-columnsApply=\"kendo.grid.columnsApply|The text shown in the column menu or column chooser for the columns apply button\"\n            columnsApply=\"Apply\"\n\n            i18n-columnsReset=\"kendo.grid.columnsReset|The text shown in the column menu or column chooser for the columns reset button\"\n            columnsReset=\"Reset\"\n\n            i18n-detailExpand=\"kendo.grid.detailExpand|The title of the expand icon of detail rows.\"\n            detailExpand=\"Expand Details\"\n\n            i18n-detailCollapse=\"kendo.grid.detailCollapse|The title of the collapse icon of detail rows.\"\n            detailCollapse=\"Collapse Details\"\n         >\n        </ng-container>\n        <kendo-grid-toolbar *ngIf=\"showTopToolbar\" position=\"top\"></kendo-grid-toolbar>\n        <kendo-grid-group-panel\n            *ngIf=\"showGroupPanel\"\n            [text]=\"groupableEmptyText\"\n            [groups]=\"group\"\n            (change)=\"groupChange.emit($event)\">\n        </kendo-grid-group-panel>\n        <div #ariaRoot\n            class=\"k-grid-aria-root\"\n            role=\"grid\"\n            [attr.aria-rowcount]=\"ariaRowCount\"\n            [attr.aria-colcount]=\"ariaColCount\">\n        <ng-template [ngIf]=\"isScrollable\">\n            <div *ngIf=\"!hideHeader\"\n                class=\"k-grid-header\"\n                role=\"presentation\"\n                [style.padding]=\"headerPadding\">\n                <div *ngIf=\"isLocked\"\n                     #lockedHeader\n                     role=\"presentation\"\n                     class=\"k-grid-header-locked\"\n                     [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoGridColGroup\n                            role=\"presentation\"\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            [scrollable]=\"true\"\n                            [columns]=\"lockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [groups]=\"group\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [reorderable]=\"reorderable\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [totalColumnsCount]=\"leafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div><div #header class=\"k-grid-header-wrap\" role=\"presentation\" data-scrollable\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 2\">\n                    <table role=\"presentation\" [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            role=\"presentation\"\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            role=\"presentation\"\n                            [scrollable]=\"true\"\n                            [columns]=\"nonLockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [reorderable]=\"reorderable\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [totalColumnsCount]=\"leafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div>\n            </div>\n            <kendo-grid-list\n                [data]=\"view\"\n                [rowHeight]=\"rowHeight\"\n                [detailRowHeight]=\"detailRowHeight\"\n                [total]=\"totalCount\"\n                [take]=\"pageSize\"\n                [groups]=\"group\"\n                [groupable]=\"groupable\"\n                [skip]=\"skip\"\n                [trackBy]=\"trackBy\"\n                [columns]=\"columnsContainer\"\n                [selectable]=\"selectable\"\n                [filterable]=\"filterable\"\n                [detailTemplate]=\"detailTemplate\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                (pageChange)=\"notifyPageChange('list', $event)\"\n                [rowClass]=\"rowClass\"\n                [loading]=\"loading\"\n                (scrollBottom)=\"notifyScrollBottom()\"\n                >\n            </kendo-grid-list>\n            <div\n                *ngIf=\"showFooter\"\n                class=\"k-grid-footer\"\n                [style.padding]=\"headerPadding\">\n                <div\n                    *ngIf=\"lockedLeafColumns.length\"\n                    class=\"k-grid-footer-locked\"\n                    [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"group\"\n                            [columns]=\"lockedLeafColumns\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div><div #footer\n                    class=\"k-grid-footer-wrap\" data-scrollable\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 3\">\n                    <table [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [columns]=\"nonLockedLeafColumns\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template [ngIf]=\"!isScrollable\">\n            <table [style.table-layout]=\"resizable ? 'fixed' : null\">\n                <colgroup kendoGridColGroup\n                    [columns]=\"leafColumns\"\n                    [groups]=\"group\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <thead kendoGridHeader\n                    *ngIf=\"!hideHeader\"\n                    [resizable]=\"resizable\"\n                    [scrollable]=\"false\"\n                    [columns]=\"visibleColumns\"\n                    [totalColumnLevels]=\"totalColumnLevels\"\n                    [groups]=\"group\"\n                    [groupable]=\"showGroupPanel\"\n                    [reorderable]=\"reorderable\"\n                    [sort]=\"sort\"\n                    [sortable]=\"sortable\"\n                    [filter]=\"filter\"\n                    [filterable]=\"filterable\"\n                    [columnMenu]=\"columnMenuOptions\"\n                    [columnMenuTemplate]=\"columnMenuTemplate\"\n                    [detailTemplate]=\"detailTemplate\">\n                </thead>\n                <tbody kendoGridTableBody\n                    [groups]=\"group\"\n                    [data]=\"view\"\n                    [skip]=\"skip\"\n                    [columns]=\"leafColumns\"\n                    [selectable]=\"selectable\"\n                    [filterable]=\"filterable\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showGroupFooters\"\n                    [trackBy]=\"trackBy\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n                <tfoot kendoGridFooter\n                    *ngIf=\"showFooter\"\n                    [scrollable]=\"false\"\n                    [groups]=\"group\"\n                    [columns]=\"leafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </tfoot>\n            </table>\n            <div *ngIf=\"loading\" kendoGridLoading>\n            </div>\n        </ng-template>\n        </div>\n        <kendo-pager\n            *ngIf=\"showPager\"\n            [template]=\"pagerTemplate\"\n            [pageSize]=\"pageSize\"\n            [total]=\"view.total\"\n            [skip]=\"skip\"\n            [options]=\"pageable\"\n            (pageChange)=\"notifyPageChange('pager', $event)\">\n        </kendo-pager>\n        <kendo-grid-toolbar *ngIf=\"showBottomToolbar\" position=\"bottom\"></kendo-grid-toolbar>\n    "
                },] },
    ];
    /** @nocollapse */
    GridComponent.ctorParameters = function () { return [
        { type: browser_support_service_1.BrowserSupportService },
        { type: selection_service_1.SelectionService },
        { type: core_1.ElementRef },
        { type: group_info_service_1.GroupInfoService },
        { type: groups_service_1.GroupsService },
        { type: change_notification_service_1.ChangeNotificationService },
        { type: details_service_1.DetailsService },
        { type: edit_service_1.EditService },
        { type: filter_service_1.FilterService },
        { type: pdf_service_1.PDFService },
        { type: responsive_service_1.ResponsiveService },
        { type: core_1.Renderer2 },
        { type: excel_service_1.ExcelService },
        { type: core_1.NgZone },
        { type: scroll_sync_service_1.ScrollSyncService },
        { type: dom_events_service_1.DomEventsService },
        { type: column_resizing_service_1.ColumnResizingService },
        { type: core_1.ChangeDetectorRef },
        { type: column_reorder_service_1.ColumnReorderService },
        { type: column_info_service_1.ColumnInfoService },
        { type: navigation_service_1.NavigationService },
        { type: sort_service_1.SortService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    GridComponent.propDecorators = {
        data: [{ type: core_1.Input }],
        pageSize: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        rowHeight: [{ type: core_1.Input }],
        detailRowHeight: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        scrollable: [{ type: core_1.Input }],
        selectable: [{ type: core_1.Input }],
        sort: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        group: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        sortable: [{ type: core_1.Input }],
        pageable: [{ type: core_1.Input }],
        groupable: [{ type: core_1.Input }],
        navigable: [{ type: core_1.Input }],
        navigatable: [{ type: core_1.Input }],
        autoSize: [{ type: core_1.Input }],
        rowClass: [{ type: core_1.Input }],
        rowSelected: [{ type: core_1.Input }],
        resizable: [{ type: core_1.Input }],
        reorderable: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        columnMenu: [{ type: core_1.Input }],
        hideHeader: [{ type: core_1.Input }],
        filterChange: [{ type: core_1.Output }],
        pageChange: [{ type: core_1.Output }],
        groupChange: [{ type: core_1.Output }],
        sortChange: [{ type: core_1.Output }],
        selectionChange: [{ type: core_1.Output }],
        dataStateChange: [{ type: core_1.Output }],
        groupExpand: [{ type: core_1.Output }],
        groupCollapse: [{ type: core_1.Output }],
        detailExpand: [{ type: core_1.Output }],
        detailCollapse: [{ type: core_1.Output }],
        edit: [{ type: core_1.Output }],
        cancel: [{ type: core_1.Output }],
        save: [{ type: core_1.Output }],
        remove: [{ type: core_1.Output }],
        add: [{ type: core_1.Output }],
        cellClose: [{ type: core_1.Output }],
        cellClick: [{ type: core_1.Output }],
        pdfExport: [{ type: core_1.Output }],
        excelExport: [{ type: core_1.Output }],
        columnResize: [{ type: core_1.Output }],
        columnReorder: [{ type: core_1.Output }],
        columnVisibilityChange: [{ type: core_1.Output }],
        columnLockedChange: [{ type: core_1.Output }],
        scrollBottom: [{ type: core_1.Output }],
        columns: [{ type: core_1.ContentChildren, args: [column_base_1.ColumnBase,] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-grid',] }],
        lockedClasses: [{ type: core_1.HostBinding, args: ['class.k-grid-lockedcolumns',] }],
        virtualClasses: [{ type: core_1.HostBinding, args: ['class.k-grid-virtual',] }],
        columnResizing: [{ type: core_1.HostBinding, args: ['class.k-grid-column-resizing',] }],
        noScrollbarClass: [{ type: core_1.HostBinding, args: ['class.k-grid-no-scrollbar',] }],
        detailTemplateChildren: [{ type: core_1.ContentChildren, args: [detail_template_directive_1.DetailTemplateDirective,] }],
        noRecordsTemplateChildren: [{ type: core_1.ContentChildren, args: [no_records_template_directive_1.NoRecordsTemplateDirective,] }],
        pagerTemplateChildren: [{ type: core_1.ContentChildren, args: [pager_template_directive_1.PagerTemplateDirective,] }],
        toolbarTemplateChildren: [{ type: core_1.ContentChildren, args: [toolbar_template_directive_1.ToolbarTemplateDirective,] }],
        columnMenuTemplates: [{ type: core_1.ContentChildren, args: [column_menu_template_directive_1.ColumnMenuTemplateDirective,] }],
        lockedHeader: [{ type: core_1.ViewChild, args: ["lockedHeader",] }],
        header: [{ type: core_1.ViewChild, args: ["header",] }],
        footer: [{ type: core_1.ViewChildren, args: ["footer",] }],
        ariaRoot: [{ type: core_1.ViewChild, args: ['ariaRoot',] }]
    };
    return GridComponent;
}());
exports.GridComponent = GridComponent;
