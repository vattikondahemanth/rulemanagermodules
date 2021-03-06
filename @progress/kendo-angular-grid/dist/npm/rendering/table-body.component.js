/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var detail_template_directive_1 = require("./details/detail-template.directive");
var details_service_1 = require("./details/details.service");
var groups_service_1 = require("../grouping/groups.service");
var change_notification_service_1 = require("../data/change-notification.service");
var utils_1 = require("../utils");
var no_records_template_directive_1 = require("./no-records-template.directive");
var edit_service_1 = require("../editing/edit.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_common_1 = require("../columns/column-common");
var dom_queries_1 = require("./common/dom-queries");
var dom_events_service_1 = require("../common/dom-events.service");
var selection_service_1 = require("../selection/selection.service");
var column_info_service_1 = require("../common/column-info.service");
var filterable_1 = require("../filtering/filterable");
var navigation_service_1 = require("../navigation/navigation.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var default_track_by_1 = require("../common/default-track-by");
var NON_DATA_CELL_CLASSES = 'k-hierarchy-cell k-detail-cell k-group-cell';
var NON_DATA_ROW_CLASSES = 'k-grouping-row k-group-footer k-detail-row k-grid-norecords';
var IGNORE_TARGET_CLASSSES = 'k-icon';
var IGNORE_CONTAINER_CLASSES = 'k-widget k-grid-ignore-click';
var columnCellIndex = function (cell, cells) {
    var cellIndex = 0;
    for (var idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return cellIndex;
        }
        if (!dom_queries_1.hasClasses(cells[idx], 'k-hierarchy-cell k-group-cell')) {
            cellIndex++;
        }
    }
};
var ɵ0 = columnCellIndex;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var TableBodyComponent = /** @class */ (function () {
    function TableBodyComponent(detailsService, groupsService, changeNotification, editService, localization, ngZone, renderer, element, domEvents, selectionService, columnInfoService, navigationService) {
        var _this = this;
        this.detailsService = detailsService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.editService = editService;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.element = element;
        this.domEvents = domEvents;
        this.selectionService = selectionService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.columns = [];
        this.groups = [];
        this.skip = 0;
        this.noRecordsText = this.localization.get('noRecords');
        this.isLocked = false;
        this.skipGroupDecoration = false;
        this.showGroupFooters = false;
        this.lockedColumnsCount = 0;
        this.totalColumnsCount = 0;
        this.trackBy = default_track_by_1.defaultTrackBy;
        this.rowClass = function () { return null; };
        this.cellKeydownSubscription = this.navigationService.cellKeydown.subscribe(function (args) { return _this.cellKeydownHandler(args); });
        this.trackByWrapper = this.trackByWrapper.bind(this);
    }
    Object.defineProperty(TableBodyComponent.prototype, "newDataItem", {
        get: function () {
            return this.editService.newDataItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "unlockedColumnsCount", {
        // Number of unlocked columns in the next table, if any
        get: function () {
            return this.totalColumnsCount - this.lockedColumnsCount - this.columns.length;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.toggleRow = function (index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    };
    TableBodyComponent.prototype.isExpanded = function (index) {
        return this.detailsService.isExpanded(index);
    };
    TableBodyComponent.prototype.detailButtonStyles = function (index) {
        return this.isExpanded(index) ? 'k-minus' : 'k-plus';
    };
    TableBodyComponent.prototype.detailButtonTitle = function (index) {
        var messageKey = this.isExpanded(index) ? 'detailCollapse' : 'detailExpand';
        return this.localization.get(messageKey);
    };
    TableBodyComponent.prototype.isGroup = function (item) {
        return item.type === 'group';
    };
    TableBodyComponent.prototype.isDataItem = function (item) {
        return !this.isGroup(item) && !this.isFooter(item);
    };
    TableBodyComponent.prototype.isFooter = function (item) {
        return item.type === 'footer';
    };
    TableBodyComponent.prototype.isInExpandedGroup = function (item) {
        return this.groupsService.isInExpandedGroup(item.groupIndex, false);
    };
    TableBodyComponent.prototype.isParentGroupExpanded = function (item) {
        return this.groupsService.isInExpandedGroup(item.index || item.groupIndex);
    };
    TableBodyComponent.prototype.isOdd = function (item) {
        return item.index % 2 !== 0;
    };
    TableBodyComponent.prototype.isSelectable = function () {
        return this.selectable && this.selectable.enabled !== false;
    };
    TableBodyComponent.prototype.isRowSelected = function (item) {
        return this.selectionService.isSelected(item.index);
    };
    TableBodyComponent.prototype.trackByWrapper = function (index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.hasEdited(item.index);
        }
        return this.trackBy(index, item);
    };
    TableBodyComponent.prototype.ngDoCheck = function () {
        if (this.isLocked) {
            this.groupHeaderSlaveCellsCount =
                this.hasGroupHeaderColumn ? this.columnsContainer.nonLockedColumnsToRender.length : 1;
        }
        else {
            this.groupHeaderSlaveCellsCount = 0;
        }
    };
    TableBodyComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    };
    TableBodyComponent.prototype.logicalRowIndex = function (rowIndex) {
        var pos = this.skip + rowIndex;
        if (this.hasDetailTemplate) {
            pos *= 2;
        }
        var absoluteRowIndex = 1 + pos;
        var addRowOffset = this.editService.hasNewItem ? 1 : 0;
        var filterRowOffset = filterable_1.hasFilterRow(this.filterable) ? 1 : 0;
        var headerRowCount = this.columnInfoService.totalLevels + filterRowOffset + addRowOffset;
        return absoluteRowIndex + headerRowCount;
    };
    TableBodyComponent.prototype.addRowLogicalIndex = function () {
        return this.columnInfoService.totalLevels + 1;
    };
    TableBodyComponent.prototype.logicalColIndex = function (colIndex) {
        return this.lockedColumnsCount + colIndex + (this.hasDetailTemplate ? 1 : 0);
    };
    TableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var clickHandler = _this.clickHandler.bind(_this);
            var mousedownSubscription = _this.renderer.listen(_this.element.nativeElement, 'mousedown', clickHandler);
            var clickSubscription = _this.renderer.listen(_this.element.nativeElement, 'click', clickHandler);
            var contextmenuSubscription = _this.renderer.listen(_this.element.nativeElement, 'contextmenu', clickHandler);
            _this.clickSubscription = function () {
                mousedownSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
        });
        var originalNoRecordText = this.localization.get('noRecords');
        this.localization.changes.subscribe(function () {
            if (_this.noRecordsText === originalNoRecordText) {
                _this.noRecordsText = _this.localization.get('noRecords');
                originalNoRecordText = _this.noRecordsText;
            }
        });
    };
    TableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    };
    Object.defineProperty(TableBodyComponent.prototype, "hasGroupHeaderColumn", {
        get: function () {
            return this.columnsContainer.hasGroupHeaderColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsContainer", {
        get: function () {
            return this.columnInfoService.columnsContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsSpan", {
        get: function () {
            return column_common_1.columnsSpan(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "colSpan", {
        get: function () {
            return this.columnsSpan + this.groups.length + (this.hasDetailTemplate ? 1 : 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "footerColumns", {
        get: function () {
            return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.showGroupHeader = function (item) {
        return !item.data.skipHeader;
    };
    Object.defineProperty(TableBodyComponent.prototype, "hasDetailTemplate", {
        get: function () {
            return utils_1.isPresent(this.detailTemplate);
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.clickHandler = function (eventArg) {
        var _this = this;
        var element = this.element.nativeElement;
        var target = eventArg.target;
        var cell, row, body, gridElement;
        var currentTarget = target;
        do {
            cell = dom_queries_1.closest(currentTarget, dom_queries_1.matchesNodeName('td'));
            row = dom_queries_1.closest(cell, dom_queries_1.matchesNodeName('tr'));
            body = dom_queries_1.closest(row, dom_queries_1.matchesNodeName('tbody'));
            currentTarget = body;
            gridElement = dom_queries_1.closestInScope(currentTarget, dom_queries_1.matchesClasses('k-grid'), element);
        } while (body && body !== element && !gridElement);
        if (cell && !dom_queries_1.hasClasses(cell, NON_DATA_CELL_CLASSES) &&
            !dom_queries_1.hasClasses(row, NON_DATA_ROW_CLASSES) &&
            body === element && !gridElement) {
            this.editService.preventCellClose();
            var focusable = target !== cell && dom_queries_1.isFocusable(target, false);
            if (!focusable && !dom_queries_1.matchesNodeName('label')(target) && !dom_queries_1.hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !dom_queries_1.closestInScope(target, dom_queries_1.matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                var args_1 = this.cellClickArgs(cell, row, eventArg);
                if (eventArg.type === 'mousedown') {
                    this.domEvents.cellMousedown.emit(args_1);
                }
                else {
                    if (args_1.isEditedColumn || !this.editService.closeCell(eventArg)) {
                        if (eventArg.type === 'click') {
                            this.clickTimeout = setTimeout(function () {
                                _this.emitCellClick(args_1);
                            }, 0);
                        }
                        else {
                            this.emitCellClick(args_1);
                        }
                    }
                }
            }
        }
    };
    TableBodyComponent.prototype.emitCellClick = function (args) {
        this.domEvents.cellClick.emit(Object.assign(args, {
            isEdited: args.isEditedRow || args.isEditedColumn
        }));
    };
    TableBodyComponent.prototype.cellKeydownHandler = function (args) {
        var body = dom_queries_1.closest(args.rowElement, dom_queries_1.matchesNodeName('tbody'));
        if (body !== this.element.nativeElement) {
            return;
        }
        if (args.keyCode === kendo_angular_common_1.Keys.Enter) {
            var clickArgs = this.cellClickArgs(args.cellElement, args.rowElement, args.originalEvent);
            this.domEvents.cellClick.emit(clickArgs);
        }
    };
    TableBodyComponent.prototype.cellClickArgs = function (cell, row, eventArg) {
        var index = columnCellIndex(cell, row.cells);
        var column = this.columns.toArray()[index];
        var columnIndex = this.lockedColumnsCount + index;
        var rowIndex = row.getAttribute('data-kendo-grid-item-index');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) : -1;
        var dataItem = rowIndex === -1 ? this.editService.newDataItem : this.data.at(rowIndex - this.skip);
        var isEditedColumn = this.editService.isEditedColumn(rowIndex, column);
        var isEditedRow = this.editService.isEdited(rowIndex);
        return {
            column: column,
            columnIndex: columnIndex,
            dataItem: dataItem,
            isEditedColumn: isEditedColumn,
            isEditedRow: isEditedRow,
            originalEvent: eventArg,
            rowIndex: rowIndex,
            type: eventArg.type
        };
    };
    TableBodyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoGridTableBody]',
                    template: "\n    <ng-template [ngIf]=\"editService.hasNewItem\">\n        <tr class=\"k-grid-add-row k-grid-edit-row\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"addRowLogicalIndex()\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\" role=\"presentation\"></td>\n            </ng-template>\n            <td [class.k-hierarchy-cell]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"addRowLogicalIndex()\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n                >\n            </td>\n            <td *ngFor=\"let column of columns; let columnIndex = index\"\n                kendoGridCell\n                    [rowIndex]=\"-1\"\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [isNew]=\"true\"\n                    [column]=\"column\"\n                    [dataItem]=\"newDataItem\"\n                [ngClass]=\"column.cssClass\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"addRowLogicalIndex()\"\n                    [logicalColIndex]=\"logicalColIndex(columnIndex)\"\n                    [colSpan]=\"column.colspan\"\n                role=\"gridcell\">\n            </td>\n        </tr>\n    </ng-template>\n    <tr *ngIf=\"data?.length === 0 || data == null\" class=\"k-grid-norecords\">\n        <td [attr.colspan]=\"colSpan\">\n            <ng-template\n                [ngIf]=\"noRecordsTemplate?.templateRef\"\n                [templateContext]=\"{\n                    templateRef: noRecordsTemplate?.templateRef\n                 }\">\n            </ng-template>\n            <ng-container *ngIf=\"!noRecordsTemplate?.templateRef\">\n                {{noRecordsText}}\n            </ng-container>\n        </td>\n    </tr>\n    <ng-template ngFor\n        [ngForOf]=\"data\"\n        [ngForTrackBy]=\"trackByWrapper\"\n        let-item\n        let-rowIndex=\"index\">\n        <tr *ngIf=\"isGroup(item) && isParentGroupExpanded(item) && showGroupHeader(item)\"\n            kendoGridGroupHeader\n                [columns]=\"columns\"\n                [groups]=\"groups\"\n                [item]=\"item\"\n                [hasDetails]=\"detailTemplate?.templateRef\"\n                [skipGroupDecoration]=\"skipGroupDecoration\"\n                [hasGroupHeaderColumn]=\"hasGroupHeaderColumn\"\n                [rowIndex]=\"rowIndex + 1\"\n                [totalColumnsCount]=\"totalColumnsCount\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"groupHeaderSlaveCellsCount\">\n        </tr>\n        <tr\n            *ngIf=\"isDataItem(item) && isInExpandedGroup(item)\"\n            kendoGridLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n            [ngClass]=\"rowClass({ dataItem: item.data, index: item.index })\"\n            [class.k-alt]=\"isOdd(item)\"\n            [class.k-master-row]=\"detailTemplate?.templateRef\"\n            [class.k-grid-edit-row]=\"editService.hasEdited(item.index)\"\n            [attr.data-kendo-grid-item-index]=\"item.index\"\n            [class.k-state-selected]=\"isSelectable() && isRowSelected(item)\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\" role=\"presentation\"></td>\n            </ng-template>\n            <td [class.k-hierarchy-cell]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"0\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [detailExpandCell]=\"true\"\n                    aria-selected=\"false\"\n                >\n                <a class=\"k-icon\"\n                    *ngIf=\"detailTemplate.showIf(item.data, item.index)\"\n                    [ngClass]=\"detailButtonStyles(item.index)\"\n                    [attr.title]=\"detailButtonTitle(item.index)\"\n                    href=\"#\" tabindex=\"-1\" (click)=\"toggleRow(item.index, item.data)\"></a>\n            </td>\n            <td\n                kendoGridCell\n                    [rowIndex]=\"item.index\"\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [column]=\"column\"\n                    [dataItem]=\"item.data\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(columnIndex)\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [colIndex]=\"columnIndex\"\n                    [colSpan]=\"column.colspan\"\n                    role=\"gridcell\" aria-selected=\"false\"\n                [ngClass]=\"column.cssClass\"\n                [class.k-grid-edit-cell]=\"editService.isEditedColumn(item.index, column)\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                *ngFor=\"let column of columns; let columnIndex = index\">\n            </td>\n        </tr>\n        <tr *ngIf=\"isDataItem(item) && isInExpandedGroup(item) && detailTemplate?.templateRef &&\n            detailTemplate.showIf(item.data, item.index) && isExpanded(item.index)\"\n            [class.k-detail-row]=\"true\"\n            [class.k-alt]=\"isOdd(item)\"\n            kendoGridLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex) + 1\"\n                [logicalSlaveRow]=\"false\"\n                [logicalCellsCount]=\"1\"\n            >\n            <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\"></td>\n            <td [class.k-hierarchy-cell]=\"true\"></td>\n            <td [class.k-detail-cell]=\"true\"\n                [attr.colspan]=\"columnsSpan\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex) + 1\"\n                    [logicalColIndex]=\"0\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [colIndex]=\"0\"\n                    [colSpan]=\"columnsSpan + 1\"\n                    role=\"gridcell\" aria-selected=\"false\"\n                >\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: detailTemplate?.templateRef,\n                        dataItem: item.data,\n                        rowIndex: item.index,\n                        $implicit: item.data\n                        }\">\n                </ng-template>\n            </td>\n        </tr>\n        <tr *ngIf=\"isFooter(item) && (isInExpandedGroup(item) || (showGroupFooters && isParentGroupExpanded(item)))\n            && !item.data.hideFooter\"\n            class=\"k-group-footer\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td [class.k-group-cell]=\"true\" *ngFor=\"let g of groups\"></td>\n            </ng-template>\n            <td [class.k-hierarchy-cell]=\"true\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n                >\n            </td>\n            <td kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(columnIndex)\"\n                [attr.data-skip]=\"skipGroupDecoration\"\n                *ngFor=\"let column of footerColumns; let columnIndex = index\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.groupFooterTemplateRef,\n                        group: item.data,\n                        field: column.field,\n                        column: column,\n                        aggregates: item.data?.aggregates,\n                        $implicit: item.data?.aggregates\n                    }\">\n                </ng-template>\n           </td>\n        </tr>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TableBodyComponent.ctorParameters = function () { return [
        { type: details_service_1.DetailsService },
        { type: groups_service_1.GroupsService },
        { type: change_notification_service_1.ChangeNotificationService },
        { type: edit_service_1.EditService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: dom_events_service_1.DomEventsService },
        { type: selection_service_1.SelectionService },
        { type: column_info_service_1.ColumnInfoService },
        { type: navigation_service_1.NavigationService }
    ]; };
    TableBodyComponent.propDecorators = {
        columns: [{ type: core_1.Input }],
        groups: [{ type: core_1.Input }],
        detailTemplate: [{ type: core_1.Input }],
        noRecordsTemplate: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        selectable: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        noRecordsText: [{ type: core_1.Input }],
        isLocked: [{ type: core_1.Input }],
        skipGroupDecoration: [{ type: core_1.Input }],
        showGroupFooters: [{ type: core_1.Input }],
        lockedColumnsCount: [{ type: core_1.Input }],
        totalColumnsCount: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        rowClass: [{ type: core_1.Input }]
    };
    return TableBodyComponent;
}());
exports.TableBodyComponent = TableBodyComponent;
