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
export const SCROLLER_FACTORY_TOKEN = new InjectionToken('grid-scroll-service-factory');
/**
 * @hidden
 */
export function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
const wheelDeltaY = (e) => {
    const deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
const ɵ0 = wheelDeltaY;
const preventLockedScroll = el => event => {
    const delta = wheelDeltaY(event);
    const scrollTop = el.scrollTop;
    const allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
};
const ɵ1 = preventLockedScroll;
const translateY = (renderer, value) => el => renderer.setStyle(el, "transform", `translateY(${value}px)`);
const ɵ2 = translateY;
const maybeNativeElement = el => el ? el.nativeElement : null;
const ɵ3 = maybeNativeElement;
const hasScrollbar = (el, parent) => el.nativeElement.offsetWidth > parent.nativeElement.clientWidth;
const ɵ4 = hasScrollbar;
const setHeight = renderer => ({ el, height }) => renderer.setStyle(el, "height", `${height}px`);
const ɵ5 = setHeight;
/**
 * @hidden
 */
export class ListComponent {
    constructor(scrollerFactory, detailsService, changeNotification, suspendService, groupsService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService) {
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
        this.columns = new ColumnsContainer(() => []);
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
            detailsService.changes.subscribe(x => this.detailExpand(x)).add(scrollRequestService.requests.subscribe(x => this.scrollTo(x)));
        this.scrollbarWidth = supportService.scrollbarWidth;
    }
    get hostClass() {
        return true;
    }
    get hostRole() {
        return 'presentation';
    }
    get showFooter() {
        return this.groupable && this.groupable.showFooter;
    }
    get lockedLeafColumns() {
        return this.columns.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columns.nonLockedLeafColumns;
    }
    get leafColumns() {
        return this.columns.leafColumns;
    }
    get lockedWidth() {
        const groupCellsWidth = this.groups.length * GROUP_CELL_WIDTH;
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), groupCellsWidth);
    }
    get nonLockedWidth() {
        if (!this.rtl && this.lockedLeafColumns.length) {
            return sumColumnWidths(expandColumns(this.nonLockedLeafColumns.toArray()));
        }
        return undefined;
    }
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    ngOnInit() {
        this.init();
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowSync.bind(this)));
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowNavigationLocked.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(({ rtl }) => this.rtl = rtl));
    }
    ngOnChanges(changes) {
        if (isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        if (anyChanged(["total", "take"], changes)) {
            this.init();
        }
        this.rebind = false;
    }
    ngAfterViewInit() {
        this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        this.resetNavigationViewport();
        this.attachContainerScroll();
        this.initResizeService();
    }
    syncRowsHeight() {
        if (this.lockedContainer) {
            syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeService) {
            this.resizeService.destroy();
        }
        this.cleanupScroller();
    }
    init() {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    }
    detailExpand({ index, expand }) {
        if (expand) {
            this.rowHeightService.expandDetail(index);
        }
        else {
            this.rowHeightService.collapseDetail(index);
        }
        this.totalHeight = this.rowHeightService.totalHeight();
        this.resetNavigationViewport();
    }
    attachContainerScroll() {
        if (isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(() => this.subscriptions.add(fromEvent(this.container.nativeElement, 'scroll').pipe(map((event) => event.target), filter(() => !this.suspendService.scroll), tap(this.onContainerScroll.bind(this)), tap(() => this.resetNavigationViewport())).subscribe(this.dispatcher)));
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
        if (this.lockedContainer) {
            this.ngZone.runOutsideAngular(() => {
                this.subscriptions.add(merge(fromEvent(this.lockedContainer.nativeElement, 'mousewheel'), fromEvent(this.lockedContainer.nativeElement, 'DOMMouseScroll')).pipe(filter((event) => !event.ctrlKey), tap(preventLockedScroll(this.container.nativeElement)), map(wheelDeltaY))
                    .subscribe(x => this.container.nativeElement.scrollTop -= x));
                this.subscriptions.add(fromEvent(this.lockedContainer.nativeElement, 'scroll').pipe(filter(() => !this.suspendService.scroll))
                    .subscribe(() => {
                    const lockedScrollTop = this.lockedContainer.nativeElement.scrollTop;
                    if (lockedScrollTop !== this.containerScrollTop) {
                        this.container.nativeElement.scrollTop = this.containerScrollTop = lockedScrollTop;
                    }
                }));
                this.subscriptions.add(fromEvent(this.lockedContainer.nativeElement, 'keydown').pipe(filter((event) => event.keyCode === Keys.PageDown || event.keyCode === Keys.PageUp)).subscribe((event) => {
                    const dir = event.keyCode === Keys.PageDown ? 1 : -1;
                    const element = this.container.nativeElement;
                    element.scrollTop += element.offsetHeight * dir * 0.8;
                    event.preventDefault();
                }));
            });
            this.syncRowsHeight();
        }
    }
    createScroller() {
        this.cleanupScroller();
        const observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.skipScroll = false;
        this.scrollerSubscription = observable.pipe(filter((x) => x instanceof PageAction), filter(() => {
            const temp = this.skipScroll;
            this.skipScroll = false;
            return !temp;
        }), tap(() => this.rebind = true))
            .subscribe((x) => this.ngZone.run(() => this.pageChange.emit(x)));
        this.scrollerSubscription.add(observable.pipe(filter((x) => x instanceof ScrollAction))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(filter((x) => x instanceof ScrollBottomAction))
            .subscribe(() => this.scrollBottom.emit()));
    }
    scroll({ offset = 0 }) {
        [
            maybeNativeElement(this.table),
            maybeNativeElement(this.lockedTable)
        ].filter(isPresent).forEach(translateY(this.renderer, offset));
        this.resetNavigationViewport();
    }
    onContainerScroll({ scrollTop }) {
        this.containerScrollTop = scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    }
    handleRowSync() {
        const isLocked = () => isPresent(this.lockedContainer);
        return merge(this.changeNotification.changes, this.groupsService.changes
            .pipe(filter(isLocked), switchMapTo(this.ngZone.onStable.asObservable().pipe(take(1)))), this.editService.changed, this.resizeService.changes, this.columnResizingService.changes).pipe(tap(() => this.resetNavigationViewport()), filter(isLocked))
            .subscribe(() => {
            const scrollTop = this.container.nativeElement.scrollTop;
            const scrollLeft = this.container.nativeElement.scrollLeft;
            this.syncRowsHeight();
            this.syncContainerHeight();
            this.lockedContainer.nativeElement.scrollTop = this.container.nativeElement.scrollTop = scrollTop;
            // fixes scroll left position in IE when editing
            this.container.nativeElement.scrollLeft = scrollLeft;
            this.resizeSensors.forEach(sensor => sensor.acceptSize());
        });
    }
    handleRowNavigationLocked() {
        return this.navigationService.changes.pipe(filter(() => isPresent(this.lockedContainer)), delay(10))
            .subscribe((args) => {
            if (args.colIndex + 1 <= this.lockedLeafColumns.length) {
                this.container.nativeElement.scrollTop = this.lockedContainer.nativeElement.scrollTop;
                if (args.prevColIndex + 1 > this.lockedLeafColumns.length) {
                    // Scroll the first non-locked column into view after navigating back in the locked columns
                    this.container.nativeElement.scrollLeft = 0;
                }
            }
            else {
                this.lockedContainer.nativeElement.scrollTop = this.container.nativeElement.scrollTop;
            }
        });
    }
    scrollTo({ itemIndex }) {
        if (isPresent(this.detailTemplate)) {
            itemIndex = Math.floor(itemIndex / 2);
        }
        const offset = this.rowHeightService.offset(itemIndex);
        this.container.nativeElement.scrollTop = offset;
        this.resetNavigationViewport();
    }
    resetNavigationViewport() {
        if (!this.container || !this.navigationService.needsViewport() || this.data.length === 0) {
            return;
        }
        const { scrollTop, offsetHeight } = this.container.nativeElement;
        const scrollBottom = scrollTop + offsetHeight;
        const firstItemIndex = this.rowHeightService.index(scrollTop);
        let lastItemIndex = this.rowHeightService.index(scrollBottom);
        const lastItemOffset = this.rowHeightService.offset(lastItemIndex);
        const lastItemOverflows = lastItemOffset + this.rowHeight > scrollBottom;
        if (lastItemIndex > 0 && lastItemOverflows) {
            lastItemIndex--;
        }
        let viewportStart = firstItemIndex;
        let viewportEnd = lastItemIndex;
        if (isPresent(this.detailTemplate)) {
            viewportStart *= 2;
            viewportEnd *= 2;
            const firstItemHeight = this.rowHeightService.offset(firstItemIndex);
            if (firstItemHeight + this.rowHeight < scrollTop) {
                viewportStart++;
            }
            const lastItemHeight = this.rowHeightService.height(lastItemIndex);
            const lastItemExpanded = this.rowHeightService.isExpanded(lastItemIndex);
            const lastItemDetailOverflows = lastItemOffset + lastItemHeight > scrollBottom;
            if (lastItemExpanded && !lastItemDetailOverflows) {
                viewportEnd++;
            }
        }
        this.navigationService.setViewport(viewportStart, viewportEnd);
    }
    cleanupScroller() {
        if (this.scrollerSubscription) {
            this.scrollerSubscription.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    }
    initResizeService() {
        this.resizeService.connect(merge(...this.resizeSensors.map(sensor => sensor.resize)));
    }
    syncContainerHeight() {
        [maybeNativeElement(this.lockedContainer)]
            .filter(isPresent)
            .map(el => {
            el.style.height = '';
            let height = this.container.nativeElement.offsetHeight;
            if (hasScrollbar(this.table, this.container)) {
                height -= this.scrollbarWidth;
            }
            return { el, height };
        })
            .forEach(setHeight(this.renderer));
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: SCROLLER_FACTORY_TOKEN,
                        useValue: DEFAULT_SCROLLER_FACTORY
                    }
                ],
                selector: 'kendo-grid-list',
                template: `
    <div #lockedContainer class="k-grid-content-locked" role="presentation"
        *ngIf="isLocked" [style.width.px]="lockedWidth">
        <div role="presentation" class="k-grid-table-wrap">
            <table [locked]="true" #lockedTable class="k-grid-table" role="presentation" [style.width.px]="lockedWidth">
                <colgroup kendoGridColGroup
                    role="presentation"
                    [groups]="groups"
                    [columns]="lockedLeafColumns"
                    [detailTemplate]="detailTemplate">
                </colgroup>
                <tbody kendoGridTableBody
                    role="presentation"
                    [groups]="groups"
                    [isLocked]="true"
                    [data]="data"
                    [noRecordsText]="''"
                    [columns]="lockedLeafColumns"
                    [totalColumnsCount]="leafColumns.length"
                    [detailTemplate]="detailTemplate"
                    [showGroupFooters]="showFooter"
                    [skip]="skip"
                    [selectable]="selectable"
                    [trackBy]="trackBy"
                    [filterable]="filterable"
                    [rowClass]="rowClass">
                </tbody>
            </table>
            <kendo-resize-sensor></kendo-resize-sensor>
        </div>
        <div class="k-height-container" role="presentation">
            <div [style.height.px]="totalHeight"></div>
        </div>
    </div><div #container
               class="k-grid-content k-virtual-content"
               role="presentation" tabindex="-1"
               [kendoGridResizableContainer]="lockedLeafColumns.length"
               [lockedWidth]="lockedWidth + 1">
        <div role="presentation" class="k-grid-table-wrap">
            <table [style.width.px]="nonLockedWidth" #table
              class="k-grid-table" role="presentation">
                <colgroup kendoGridColGroup
                    role="presentation"
                    [groups]="isLocked ? [] : groups"
                    [columns]="nonLockedLeafColumns"
                    [detailTemplate]="detailTemplate">
                </colgroup>
                <tbody kendoGridTableBody
                    role="presentation"
                    [skipGroupDecoration]="isLocked"
                    [data]="data"
                    [groups]="groups"
                    [showGroupFooters]="showFooter"
                    [columns]="nonLockedLeafColumns"
                    [detailTemplate]="detailTemplate"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [lockedColumnsCount]="lockedLeafColumns.length"
                    [totalColumnsCount]="leafColumns.length"
                    [skip]="skip"
                    [selectable]="selectable"
                    [trackBy]="trackBy"
                    [filterable]="filterable"
                    [rowClass]="rowClass">
                </tbody>
            </table>
            <kendo-resize-sensor *ngIf="isLocked"></kendo-resize-sensor>
        </div>
        <kendo-resize-sensor *ngIf="isLocked"></kendo-resize-sensor>
        <div class="k-height-container" role="presentation">
            <div [style.height.px]="totalHeight"></div>
        </div>
    </div>
    <div *ngIf="loading" kendoGridLoading>
    </div>
    `
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
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
];
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
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
