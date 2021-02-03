/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { PagerSettings } from './pager-settings';
import { PageChangeEvent } from '../data/change-event-args.interface';
import { PagerTemplateDirective } from "./pager-template.directive";
import { PagerContextService } from "./pager-context.service";
/**
 * @hidden
 */
export declare class PagerComponent implements OnChanges, OnInit, OnDestroy {
    private pagerContext;
    total: number;
    skip: number;
    pageSize: number;
    options: PagerSettings | boolean;
    template: PagerTemplateDirective;
    pageChange: EventEmitter<PageChangeEvent>;
    readonly pagerWrapClass: boolean;
    readonly gridPagerClass: boolean;
    readonly widgetClass: boolean;
    settings: PagerSettings;
    readonly totalPages: number;
    readonly currentPage: number;
    readonly templateContext: any;
    private pageChangeSubscription;
    private _templateContext;
    constructor(pagerContext: PagerContextService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    changePage(event: PageChangeEvent): void;
}
