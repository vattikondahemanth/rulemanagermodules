/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, OnChanges, OnDestroy } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SinglePopupService } from '../common/single-popup.service';
import { ColumnMenuService } from './column-menu.service';
/**
 * @hidden
 */
export declare class ColumnMenuComponent implements OnChanges, OnDestroy {
    protected popupService: SinglePopupService;
    localization: LocalizationService;
    service: ColumnMenuService;
    column: any;
    settings: any;
    sort: any;
    filter: any;
    sortable: any;
    columnMenuTemplate: TemplateRef<any>;
    expandedFilter: boolean;
    expandedColumns: boolean;
    private popupRef;
    private closeSubscription;
    constructor(popupService: SinglePopupService, localization: LocalizationService, service: ColumnMenuService);
    readonly isActive: boolean;
    readonly hasFilter: boolean;
    readonly hasSort: boolean;
    readonly hasColumnChooser: boolean;
    readonly hasLock: boolean;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    toggle(e: any, anchor: any, template: any): void;
    close(): void;
    onColumnsExpand(): void;
    onFilterExpand(): void;
}
