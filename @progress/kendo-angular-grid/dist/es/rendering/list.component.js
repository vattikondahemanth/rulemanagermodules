/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef, Inject, InjectionToken, QueryList, NgZone, Renderer2, ViewChildren } from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import { delay, map, filter, tap, take, switchMapTo } from 'rxjs/operators';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RowHeightService } from '../scrolling/row-height.service';
import { ScrollerService, PageAction, ScrollAction, ScrollBottomAction } from '../scrolling/scroller.service';
import { ScrollRequestService } from '../scrolling/scroll-request.service';
import { DetailTemplateDirective } from './details/detail-template.directive';
import { isChanged, isPresent, isUniversal, anyChanged } from '../utils';
import { DetailsService } from './details/details.service';
import { ColumnsContainer } from '../columns/columns-container';
import { ChangeNotificationService } from '../data/change-notification.service';
import { syncRowsHeight } from '../layout/row-sync';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { SuspendService } from '../scrolling/suspend.service';
import { GroupsService } from "../grouping/groups.service";
import { expandColumns, sumColumnWidths } from "../columns/column-common";
import { ScrollSyncService } from "../scrolling/scroll-sync.service";
import { ResizeService } from "../layout/resize.service";
import { ResizeSensorComponent } from "@progress/kendo-angular-common";
import { BrowserSupportService } from "../layout/browser-support.service";
import { EditService } from '../editing/edit.service';
import { NavigationService } from '../navigation/navigation.service';
import { Keys } from '@progress/kendo-angular-common';
import { ColumnResizingService } from "../column-resizing/column-resizing.service";
import { GROUP_CELL_WIDTH } from '../constants';
import { defaultTrackBy } from '../common/default-track-by';
/**
 * @hidden
 */
export var SCROLLER_FACTORY_TOKEN = new InjectionToken('grid-scroll-service-factory');
/**
 * @hidden
 */
export function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
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
var preventLockedScroll = function (el) { return function (event) {
    var delta = wheelDeltaY(event);
    var scrollTop = el.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
}; };
var ɵ1 = preventLockedScroll;
var translateY = function (renderer, value) { return function (el) { return renderer.setStyle(el, "transform", "translateY(" + value + "px)"); }; };
var ɵ2 = translateY;
var maybeNativeElement = function (el) { return el ? el.nativeElement : null; };
var ɵ3 = maybeNativeElement;
var hasScrollbar = function (el, parent) { return el.nativeElement.offsetWidth > parent.nativeElement.clientWidth; };
var ɵ4 = hasScrollbar;
var setHeight = function (renderer) { return function (_a) {
    var el = _a.el, height = _a.height;
    return renderer.setStyle(el, "height", height + "px");
}; };
var ɵ5 = setHeight;
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
        this.columns = new ColumnsContainer(function () { return []; });
        this.selectable = false;
        this.groupable = false;
        this.trackBy = defaultTrackBy;
        this.pageChange = new EventEmitter();
        this.scrollBottom = new EventEmitter();
        this.resizeSensors = new QueryList();
        this.dispatcher = new Subject();
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
            var groupCellsWidth = this.groups.length * GROUP_CELL_WIDTH;
            return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedWidth", {
        get: function () {
            if (!this.rtl && this.lockedLeafColumns.length) {
                return sumColumnWidths(expandColumns(this.nonLockedLeafColumns.toArray()));
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
        if (isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        if (anyChanged(["total", "take"], changes)) {
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
            syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
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
        this.rowHeightService = new RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!isUniversal()) {
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
        if (isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            return _this.subscriptions.add(fromEvent(_this.container.nativeElement, 'scroll').pipe(map(function (event) { return event.target; }), filter(function () { return !_this.suspendService.scroll; }), tap(_this.onContainerScroll.bind(_this)), tap(function () { return _this.resetNavigationViewport(); })).subscribe(_this.dispatcher));
        });
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
        if (this.lockedContainer) {
            this.ngZone.runOutsideAngular(function () {
                _this.subscriptions.add(merge(fromEvent(_this.lockedContainer.nativeElement, 'mousewheel'), fromEvent(_this.lockedContainer.nativeElement, 'DOMMouseScroll')).pipe(filter(function (event) { return !event.ctrlKey; }), tap(preventLockedScroll(_this.container.nativeElement)), map(wheelDeltaY))
                    .subscribe(function (x) { return _this.container.nativeElement.scrollTop -= x; }));
                _this.subscriptions.add(fromEvent(_this.lockedContainer.nativeElement, 'scroll').pipe(filter(function () { return !_this.suspendService.scroll; }))
                    .subscribe(function () {
                    var lockedScrollTop = _this.lockedContainer.nativeElement.scrollTop;
                    if (lockedScrollTop !== _this.containerScrollTop) {
                        _this.container.nativeElement.scrollTop = _this.containerScrollTop = lockedScrollTop;
                    }
                }));
                _this.subscriptions.add(fromEvent(_this.lockedContainer.nativeElement, 'keydown').pipe(filter(function (event) { return event.keyCode === Keys.PageDown || event.keyCode === Keys.PageUp; })).subscribe(function (event) {
                    var dir = event.keyCode === Keys.PageDown ? 1 : -1;
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
        this.scrollerSubscription = observable.pipe(filter(function (x) { return x instanceof PageAction; }), filter(function () {
            var temp = _this.skipScroll;
            _this.skipScroll = false;
            return !temp;
        }), tap(function () { return _this.rebind = true; }))
            .subscribe(function (x) { return _this.ngZone.run(function () { return _this.pageChange.emit(x); }); });
        this.scrollerSubscription.add(observable.pipe(filter(function (x) { return x instanceof ScrollAction; }))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(filter(function (x) { return x instanceof ScrollBottomAction; }))
            .subscribe(function () { return _this.scrollBottom.emit(); }));
    };
    ListComponent.prototype.scroll = function (_a) {
        var _b = _a.offset, offset = _b === void 0 ? 0 : _b;
        [
            maybeNativeElement(this.table),
            maybeNativeElement(this.lockedTable)
        ].filter(isPresent).forEach(translateY(this.renderer, offset));
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
        var isLocked = function () { return isPresent(_this.lockedContainer); };
        return merge(this.changeNotification.changes, this.groupsService.changes
            .pipe(filter(isLocked), switchMapTo(this.ngZone.onStable.asObservable().pipe(take(1)))), this.editService.changed, this.resizeService.changes, this.columnResizingService.changes).pipe(tap(function () { return _this.resetNavigationViewport(); }), filter(isLocked))
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
        return this.navigationService.changes.pipe(filter(function () { return isPresent(_this.lockedContainer); }), delay(10))
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
        if (isPresent(this.detailTemplate)) {
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
        if (isPresent(this.detailTemplate)) {
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
        this.resizeService.connect(merge.apply(void 0, this.resizeSensors.map(function (sensor) { return sensor.resize; })));
    };
    ListComponent.prototype.syncContainerHeight = function () {
        var _this = this;
        [maybeNativeElement(this.lockedContainer)]
            .filter(isPresent)
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
        { type: Component, args: [{
                    providers: [
                        {
                            provide: SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }
                    ],
                    selector: 'kendo-grid-list',
                    template: "\n    <div #lockedContainer class=\"k-grid-content-locked\" role=\"presentation\"\n        *ngIf=\"isLocked\" [style.width.px]=\"lockedWidth\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [locked]=\"true\" #lockedTable class=\"k-grid-table\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [columns]=\"lockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [isLocked]=\"true\"\n                    [data]=\"data\"\n                    [noRecordsText]=\"''\"\n                    [columns]=\"lockedLeafColumns\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showFooter\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor></kendo-resize-sensor>\n        </div>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div><div #container\n               class=\"k-grid-content k-virtual-content\"\n               role=\"presentation\" tabindex=\"-1\"\n               [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n               [lockedWidth]=\"lockedWidth + 1\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [style.width.px]=\"nonLockedWidth\" #table\n              class=\"k-grid-table\" role=\"presentation\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"isLocked ? [] : groups\"\n                    [columns]=\"nonLockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [skipGroupDecoration]=\"isLocked\"\n                    [data]=\"data\"\n                    [groups]=\"groups\"\n                    [showGroupFooters]=\"showFooter\"\n                    [columns]=\"nonLockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        </div>\n        <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"loading\" kendoGridLoading>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
        { type: DetailsService },
        { type: ChangeNotificationService },
        { type: SuspendService },
        { type: GroupsService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ScrollSyncService },
        { type: ResizeService },
        { type: EditService },
        { type: BrowserSupportService },
        { type: NavigationService },
        { type: ScrollRequestService },
        { type: LocalizationService },
        { type: ColumnResizingService }
    ]; };
    ListComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ["class.k-grid-container",] }],
        hostRole: [{ type: HostBinding, args: ["attr.role",] }],
        data: [{ type: Input }],
        groups: [{ type: Input }],
        total: [{ type: Input }],
        rowHeight: [{ type: Input }],
        detailRowHeight: [{ type: Input }],
        take: [{ type: Input }],
        skip: [{ type: Input }],
        columns: [{ type: Input }],
        detailTemplate: [{ type: Input }],
        noRecordsTemplate: [{ type: Input }],
        selectable: [{ type: Input }],
        groupable: [{ type: Input }],
        filterable: [{ type: Input }],
        rowClass: [{ type: Input }],
        loading: [{ type: Input }],
        trackBy: [{ type: Input }],
        pageChange: [{ type: Output }],
        scrollBottom: [{ type: Output }],
        container: [{ type: ViewChild, args: ["container",] }],
        lockedContainer: [{ type: ViewChild, args: ["lockedContainer",] }],
        lockedTable: [{ type: ViewChild, args: ["lockedTable",] }],
        table: [{ type: ViewChild, args: ["table",] }],
        resizeSensors: [{ type: ViewChildren, args: [ResizeSensorComponent,] }]
    };
    return ListComponent;
}());
export { ListComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
