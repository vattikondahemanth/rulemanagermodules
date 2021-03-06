/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, EventEmitter, ElementRef, OnDestroy, AfterViewInit, SimpleChange, OnChanges, InjectionToken, QueryList, NgZone, Renderer2, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ScrollerService, Action } from '../scrolling/scroller.service';
import { ScrollRequestService } from '../scrolling/scroll-request.service';
import { ColumnBase } from '../columns/column-base';
import { DetailTemplateDirective } from './details/detail-template.directive';
import { DetailsService } from './details/details.service';
import { ColumnsContainer } from '../columns/columns-container';
import { GroupDescriptor } from '@progress/kendo-data-query';
import { GroupableSettings } from '../grouping/group-settings';
import { ChangeNotificationService } from '../data/change-notification.service';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { SuspendService } from '../scrolling/suspend.service';
import { GroupsService } from "../grouping/groups.service";
import { RowClassFn } from './common/row-class';
import { ScrollSyncService } from "../scrolling/scroll-sync.service";
import { ResizeService } from "../layout/resize.service";
import { ResizeSensorComponent } from "@progress/kendo-angular-common";
import { BrowserSupportService } from "../layout/browser-support.service";
import { SelectableSettings } from '../selection/selectable-settings';
import { EditService } from '../editing/edit.service';
import { NavigationService } from '../navigation/navigation.service';
import { FilterableSettings } from '../filtering/filterable';
import { ColumnResizingService } from "../column-resizing/column-resizing.service";
import { GridItem } from '../data/grid-item.interface';
/**
 * @hidden
 */
export declare const SCROLLER_FACTORY_TOKEN: InjectionToken<string>;
/**
 * @hidden
 */
export declare function DEFAULT_SCROLLER_FACTORY(observable: Observable<any>): ScrollerService;
/**
 * @hidden
 */
export declare class ListComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    private changeNotification;
    private suspendService;
    private groupsService;
    private ngZone;
    private renderer;
    private scrollSyncService;
    private resizeService;
    private editService;
    private navigationService;
    private localization;
    private columnResizingService;
    readonly hostClass: boolean;
    readonly hostRole: string;
    data: Array<any>;
    groups: Array<GroupDescriptor>;
    total: number;
    rowHeight: number;
    detailRowHeight: number;
    take: number;
    skip: number;
    columns: ColumnsContainer;
    detailTemplate: DetailTemplateDirective;
    noRecordsTemplate: NoRecordsTemplateDirective;
    selectable: SelectableSettings | boolean;
    groupable: GroupableSettings | boolean;
    filterable: FilterableSettings;
    rowClass: RowClassFn;
    loading: boolean;
    trackBy: TrackByFunction<GridItem>;
    pageChange: EventEmitter<Action>;
    scrollBottom: EventEmitter<void>;
    totalHeight: number;
    readonly showFooter: boolean;
    container: ElementRef;
    lockedContainer: ElementRef;
    lockedTable: ElementRef;
    table: ElementRef;
    resizeSensors: QueryList<ResizeSensorComponent>;
    private scroller;
    private subscriptions;
    private scrollerSubscription;
    private dispatcher;
    private rowHeightService;
    private skipScroll;
    private rebind;
    private scrollbarWidth;
    private containerScrollTop;
    readonly lockedLeafColumns: QueryList<ColumnBase>;
    readonly nonLockedLeafColumns: QueryList<ColumnBase>;
    readonly leafColumns: QueryList<ColumnBase>;
    readonly lockedWidth: number;
    readonly nonLockedWidth: number;
    readonly isLocked: boolean;
    private rtl;
    constructor(scrollerFactory: any, detailsService: DetailsService, changeNotification: ChangeNotificationService, suspendService: SuspendService, groupsService: GroupsService, ngZone: NgZone, renderer: Renderer2, scrollSyncService: ScrollSyncService, resizeService: ResizeService, editService: EditService, supportService: BrowserSupportService, navigationService: NavigationService, scrollRequestService: ScrollRequestService, localization: LocalizationService, columnResizingService: ColumnResizingService);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngAfterViewInit(): void;
    syncRowsHeight(): void;
    ngOnDestroy(): void;
    init(): void;
    protected detailExpand({ index, expand }: {
        index: number;
        dataItem: any;
        expand: boolean;
    }): void;
    private attachContainerScroll;
    private createScroller;
    private scroll;
    private onContainerScroll;
    private handleRowSync;
    private handleRowNavigationLocked;
    private scrollTo;
    private resetNavigationViewport;
    private cleanupScroller;
    private initResizeService;
    private syncContainerHeight;
}
