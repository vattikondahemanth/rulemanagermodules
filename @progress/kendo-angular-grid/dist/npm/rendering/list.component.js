/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var row_height_service_1 = require("../scrolling/row-height.service");
var scroller_service_1 = require("../scrolling/scroller.service");
var scroll_request_service_1 = require("../scrolling/scroll-request.service");
var detail_template_directive_1 = require("./details/detail-template.directive");
var utils_1 = require("../utils");
var details_service_1 = require("./details/details.service");
var columns_container_1 = require("../columns/columns-container");
var change_notification_service_1 = require("../data/change-notification.service");
var row_sync_1 = require("../layout/row-sync");
var no_records_template_directive_1 = require("./no-records-template.directive");
var suspend_service_1 = require("../scrolling/suspend.service");
var groups_service_1 = require("../grouping/groups.service");
var column_common_1 = require("../columns/column-common");
var scroll_sync_service_1 = require("../scrolling/scroll-sync.service");
var resize_service_1 = require("../layout/resize.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var browser_support_service_1 = require("../layout/browser-support.service");
var edit_service_1 = require("../editing/edit.service");
var navigation_service_1 = require("../navigation/navigation.service");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var column_resizing_service_1 = require("../column-resizing/column-resizing.service");
var constants_1 = require("../constants");
var default_track_by_1 = require("../common/default-track-by");
/**
 * @hidden
 */
exports.SCROLLER_FACTORY_TOKEN = new core_1.InjectionToken('grid-scroll-service-factory');
/**
 * @hidden
 */
function DEFAULT_SCROLLER_FACTORY(observable) {
    return new scroller_service_1.ScrollerService(observable);
}
exports.DEFAULT_SCROLLER_FACTORY = DEFAULT_SCROLLER_FACTORY;
var wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
var ɵ0 = wheelDeltaY;
exports.ɵ0 = ɵ0;
var preventLockedScroll = function (el) { return function (event) {
    var delta = wheelDeltaY(event);
    var scrollTop = el.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
}; };
var ɵ1 = preventLockedScroll;
exports.ɵ1 = ɵ1;
var translateY = function (renderer, value) { return function (el) { return renderer.setStyle(el, "transform", "translateY(" + value + "px)"); }; };
var ɵ2 = translateY;
exports.ɵ2 = ɵ2;
var maybeNativeElement = function (el) { return el ? el.nativeElement : null; };
var ɵ3 = maybeNativeElement;
exports.ɵ3 = ɵ3;
var hasScrollbar = function (el, parent) { return el.nativeElement.offsetWidth > parent.nativeElement.clientWidth; };
var ɵ4 = hasScrollbar;
exports.ɵ4 = ɵ4;
var setHeight = function (renderer) { return function (_a) {
    var el = _a.el, height = _a.height;
    return renderer.setStyle(el, "height", height + "px");
}; };
var ɵ5 = setHeight;
exports.ɵ5 = ɵ5;
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(scrollerFactory, detailsService, changeNotification, suspendService, groupsService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService) {
        var _this = this;
        this.changeNotification = changeNotification;
        this.suspendService = suspendService;
        this.groupsService = groupsService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollSyncService = scrollSyncService;
        this.resizeService = resizeService;
        this.editService = editService;
        this.navigationService = navigationService;
        this.localization = localization;
        this.columnResizingService = columnResizingService;
        this.groups = [];
        this.skip = 0;
        this.columns = new columns_container_1.ColumnsContainer(function () { return []; });
        this.selectable = false;
        this.groupable = false;
        this.trackBy = default_track_by_1.defaultTrackBy;
        this.pageChange = new core_1.EventEmitter();
        this.scrollBottom = new core_1.EventEmitter();
        this.resizeSensors = new core_1.QueryList();
        this.dispatcher = new rxjs_1.Subject();
        this.containerScrollTop = 0;
        this.rtl = false;
        this.scroller = scrollerFactory(this.dispatcher);
        this.subscriptions =
            detailsService.changes.subscribe(function (x) { return _this.detailExpand(x); }).add(scrollRequestService.requests.subscribe(function (x) { return _this.scrollTo(x); }));
        this.scrollbarWidth = supportService.scrollbarWidth;
    }
    Object.defineProperty(ListComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "hostRole", {
        get: function () {
            return 'presentation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "showFooter", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columns.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columns.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "leafColumns", {
        get: function () {
            return this.columns.leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.groups.length * constants_1.GROUP_CELL_WIDTH;
            return column_common_1.expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedWidth", {
        get: function () {
            if (!this.rtl && this.lockedLeafColumns.length) {
                return column_common_1.sumColumnWidths(column_common_1.expandColumns(this.nonLockedLeafColumns.toArray()));
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowSync.bind(this)));
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowNavigationLocked.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.rtl = rtl;
        }));
    };
    ListComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        if (utils_1.anyChanged(["total", "take"], changes)) {
            this.init();
        }
        this.rebind = false;
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        this.resetNavigationViewport();
        this.attachContainerScroll();
        this.initResizeService();
    };
    ListComponent.prototype.syncRowsHeight = function () {
        if (this.lockedContainer) {
            row_sync_1.syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeService) {
            this.resizeService.destroy();
        }
        this.cleanupScroller();
    };
    ListComponent.prototype.init = function () {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new row_height_service_1.RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!utils_1.isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    };
    ListComponent.prototype.detailExpand = function (_a) {
        var index = _a.index, expand = _a.expand;
        if (expand) {
            this.rowHeightService.expandDetail(index);
        }
        else {
            this.rowHeightService.collapseDetail(index);
        }
        this.totalHeight = this.rowHeightService.totalHeight();
        this.resetNavigationViewport();
    };
    ListComponent.prototype.attachContainerScroll = function () {
        var _this = this;
        if (utils_1.isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            return _this.subscriptions.add(rxjs_1.fromEvent(_this.container.nativeElement, 'scroll').pipe(operators_1.map(function (event) { return event.target; }), operators_1.filter(function () { return !_this.suspendService.scroll; }), operators_1.tap(_this.onContainerScroll.bind(_this)), operators_1.tap(function () { return _this.resetNavigationViewport(); })).subscribe(_this.dispatcher));
        });
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
        if (this.lockedContainer) {
            this.ngZone.runOutsideAngular(function () {
                _this.subscriptions.add(rxjs_1.merge(rxjs_1.fromEvent(_this.lockedContainer.nativeElement, 'mousewheel'), rxjs_1.fromEvent(_this.lockedContainer.nativeElement, 'DOMMouseScroll')).pipe(operators_1.filter(function (event) { return !event.ctrlKey; }), operators_1.tap(preventLockedScroll(_this.container.nativeElement)), operators_1.map(wheelDeltaY))
                    .subscribe(function (x) { return _this.container.nativeElement.scrollTop -= x; }));
                _this.subscriptions.add(rxjs_1.fromEvent(_this.lockedContainer.nativeElement, 'scroll').pipe(operators_1.filter(function () { return !_this.suspendService.scroll; }))
                    .subscribe(function () {
                    var lockedScrollTop = _this.lockedContainer.nativeElement.scrollTop;
                    if (lockedScrollTop !== _this.containerScrollTop) {
                        _this.container.nativeElement.scrollTop = _this.containerScrollTop = lockedScrollTop;
                    }
                }));
                _this.subscriptions.add(rxjs_1.fromEvent(_this.lockedContainer.nativeElement, 'keydown').pipe(operators_1.filter(function (event) { return event.keyCode === kendo_angular_common_2.Keys.PageDown || event.keyCode === kendo_angular_common_2.Keys.PageUp; })).subscribe(function (event) {
                    var dir = event.keyCode === kendo_angular_common_2.Keys.PageDown ? 1 : -1;
                    var element = _this.container.nativeElement;
                    element.scrollTop += element.offsetHeight * dir * 0.8;
                    event.preventDefault();
                }));
            });
            this.syncRowsHeight();
        }
    };
    ListComponent.prototype.createScroller = function () {
        var _this = this;
        this.cleanupScroller();
        var observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.skipScroll = false;
        this.scrollerSubscription = observable.pipe(operators_1.filter(function (x) { return x instanceof scroller_service_1.PageAction; }), operators_1.filter(function () {
            var temp = _this.skipScroll;
            _this.skipScroll = false;
            return !temp;
        }), operators_1.tap(function () { return _this.rebind = true; }))
            .subscribe(function (x) { return _this.ngZone.run(function () { return _this.pageChange.emit(x); }); });
        this.scrollerSubscription.add(observable.pipe(operators_1.filter(function (x) { return x instanceof scroller_service_1.ScrollAction; }))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(operators_1.filter(function (x) { return x instanceof scroller_service_1.ScrollBottomAction; }))
            .subscribe(function () { return _this.scrollBottom.emit(); }));
    };
    ListComponent.prototype.scroll = function (_a) {
        var _b = _a.offset, offset = _b === void 0 ? 0 : _b;
        [
            maybeNativeElement(this.table),
            maybeNativeElement(this.lockedTable)
        ].filter(utils_1.isPresent).forEach(translateY(this.renderer, offset));
        this.resetNavigationViewport();
    };
    ListComponent.prototype.onContainerScroll = function (_a) {
        var scrollTop = _a.scrollTop;
        this.containerScrollTop = scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    };
    ListComponent.prototype.handleRowSync = function () {
        var _this = this;
        var isLocked = function () { return utils_1.isPresent(_this.lockedContainer); };
        return rxjs_1.merge(this.changeNotification.changes, this.groupsService.changes
            .pipe(operators_1.filter(isLocked), operators_1.switchMapTo(this.ngZone.onStable.asObservable().pipe(operators_1.take(1)))), this.editService.changed, this.resizeService.changes, this.columnResizingService.changes).pipe(operators_1.tap(function () { return _this.resetNavigationViewport(); }), operators_1.filter(isLocked))
            .subscribe(function () {
            var scrollTop = _this.container.nativeElement.scrollTop;
            var scrollLeft = _this.container.nativeElement.scrollLeft;
            _this.syncRowsHeight();
            _this.syncContainerHeight();
            _this.lockedContainer.nativeElement.scrollTop = _this.container.nativeElement.scrollTop = scrollTop;
            // fixes scroll left position in IE when editing
            _this.container.nativeElement.scrollLeft = scrollLeft;
            _this.resizeSensors.forEach(function (sensor) { return sensor.acceptSize(); });
        });
    };
    ListComponent.prototype.handleRowNavigationLocked = function () {
        var _this = this;
        return this.navigationService.changes.pipe(operators_1.filter(function () { return utils_1.isPresent(_this.lockedContainer); }), operators_1.delay(10))
            .subscribe(function (args) {
            if (args.colIndex + 1 <= _this.lockedLeafColumns.length) {
                _this.container.nativeElement.scrollTop = _this.lockedContainer.nativeElement.scrollTop;
                if (args.prevColIndex + 1 > _this.lockedLeafColumns.length) {
                    // Scroll the first non-locked column into view after navigating back in the locked columns
                    _this.container.nativeElement.scrollLeft = 0;
                }
            }
            else {
                _this.lockedContainer.nativeElement.scrollTop = _this.container.nativeElement.scrollTop;
            }
        });
    };
    ListComponent.prototype.scrollTo = function (_a) {
        var itemIndex = _a.itemIndex;
        if (utils_1.isPresent(this.detailTemplate)) {
            itemIndex = Math.floor(itemIndex / 2);
        }
        var offset = this.rowHeightService.offset(itemIndex);
        this.container.nativeElement.scrollTop = offset;
        this.resetNavigationViewport();
    };
    ListComponent.prototype.resetNavigationViewport = function () {
        if (!this.container || !this.navigationService.needsViewport() || this.data.length === 0) {
            return;
        }
        var _a = this.container.nativeElement, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight;
        var scrollBottom = scrollTop + offsetHeight;
        var firstItemIndex = this.rowHeightService.index(scrollTop);
        var lastItemIndex = this.rowHeightService.index(scrollBottom);
        var lastItemOffset = this.rowHeightService.offset(lastItemIndex);
        var lastItemOverflows = lastItemOffset + this.rowHeight > scrollBottom;
        if (lastItemIndex > 0 && lastItemOverflows) {
            lastItemIndex--;
        }
        var viewportStart = firstItemIndex;
        var viewportEnd = lastItemIndex;
        if (utils_1.isPresent(this.detailTemplate)) {
            viewportStart *= 2;
            viewportEnd *= 2;
            var firstItemHeight = this.rowHeightService.offset(firstItemIndex);
            if (firstItemHeight + this.rowHeight < scrollTop) {
                viewportStart++;
            }
            var lastItemHeight = this.rowHeightService.height(lastItemIndex);
            var lastItemExpanded = this.rowHeightService.isExpanded(lastItemIndex);
            var lastItemDetailOverflows = lastItemOffset + lastItemHeight > scrollBottom;
            if (lastItemExpanded && !lastItemDetailOverflows) {
                viewportEnd++;
            }
        }
        this.navigationService.setViewport(viewportStart, viewportEnd);
    };
    ListComponent.prototype.cleanupScroller = function () {
        if (this.scrollerSubscription) {
            this.scrollerSubscription.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    };
    ListComponent.prototype.initResizeService = function () {
        this.resizeService.connect(rxjs_1.merge.apply(void 0, this.resizeSensors.map(function (sensor) { return sensor.resize; })));
    };
    ListComponent.prototype.syncContainerHeight = function () {
        var _this = this;
        [maybeNativeElement(this.lockedContainer)]
            .filter(utils_1.isPresent)
            .map(function (el) {
            el.style.height = '';
            var height = _this.container.nativeElement.offsetHeight;
            if (hasScrollbar(_this.table, _this.container)) {
                height -= _this.scrollbarWidth;
            }
            return { el: el, height: height };
        })
            .forEach(setHeight(this.renderer));
    };
    ListComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: exports.SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }
                    ],
                    selector: 'kendo-grid-list',
                    template: "\n    <div #lockedContainer class=\"k-grid-content-locked\" role=\"presentation\"\n        *ngIf=\"isLocked\" [style.width.px]=\"lockedWidth\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [locked]=\"true\" #lockedTable class=\"k-grid-table\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [columns]=\"lockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [isLocked]=\"true\"\n                    [data]=\"data\"\n                    [noRecordsText]=\"''\"\n                    [columns]=\"lockedLeafColumns\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showFooter\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor></kendo-resize-sensor>\n        </div>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div><div #container\n               class=\"k-grid-content k-virtual-content\"\n               role=\"presentation\" tabindex=\"-1\"\n               [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n               [lockedWidth]=\"lockedWidth + 1\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [style.width.px]=\"nonLockedWidth\" #table\n              class=\"k-grid-table\" role=\"presentation\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"isLocked ? [] : groups\"\n                    [columns]=\"nonLockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [skipGroupDecoration]=\"isLocked\"\n                    [data]=\"data\"\n                    [groups]=\"groups\"\n                    [showGroupFooters]=\"showFooter\"\n                    [columns]=\"nonLockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        </div>\n        <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"loading\" kendoGridLoading>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.SCROLLER_FACTORY_TOKEN,] }] },
        { type: details_service_1.DetailsService },
        { type: change_notification_service_1.ChangeNotificationService },
        { type: suspend_service_1.SuspendService },
        { type: groups_service_1.GroupsService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: scroll_sync_service_1.ScrollSyncService },
        { type: resize_service_1.ResizeService },
        { type: edit_service_1.EditService },
        { type: browser_support_service_1.BrowserSupportService },
        { type: navigation_service_1.NavigationService },
        { type: scroll_request_service_1.ScrollRequestService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: column_resizing_service_1.ColumnResizingService }
    ]; };
    ListComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ["class.k-grid-container",] }],
        hostRole: [{ type: core_1.HostBinding, args: ["attr.role",] }],
        data: [{ type: core_1.Input }],
        groups: [{ type: core_1.Input }],
        total: [{ type: core_1.Input }],
        rowHeight: [{ type: core_1.Input }],
        detailRowHeight: [{ type: core_1.Input }],
        take: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        columns: [{ type: core_1.Input }],
        detailTemplate: [{ type: core_1.Input }],
        noRecordsTemplate: [{ type: core_1.Input }],
        selectable: [{ type: core_1.Input }],
        groupable: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        rowClass: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        pageChange: [{ type: core_1.Output }],
        scrollBottom: [{ type: core_1.Output }],
        container: [{ type: core_1.ViewChild, args: ["container",] }],
        lockedContainer: [{ type: core_1.ViewChild, args: ["lockedContainer",] }],
        lockedTable: [{ type: core_1.ViewChild, args: ["lockedTable",] }],
        table: [{ type: core_1.ViewChild, args: ["table",] }],
        resizeSensors: [{ type: core_1.ViewChildren, args: [kendo_angular_common_1.ResizeSensorComponent,] }]
    };
    return ListComponent;
}());
exports.ListComponent = ListComponent;
