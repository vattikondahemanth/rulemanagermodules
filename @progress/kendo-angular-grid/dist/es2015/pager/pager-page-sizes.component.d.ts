/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService, PagerContextChanges } from "./pager-context.service";
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
export declare class PagerPageSizesComponent extends PagerElementComponent {
    protected pagerContext: PagerContextService;
    /**
     * The page sizes that will be displayed.
     *
     * @type {Array<number>}
     * @memberOf PagerPageSizesComponent
     */
    pageSizes: Array<number>;
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPageSizesComponent
     */
    readonly classes: boolean;
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPageSizesComponent
     */
    readonly showInitialPageSize: boolean;
    constructor(localization: LocalizationService, cd: ChangeDetectorRef, pagerContext: PagerContextService);
    /**
     * @hidden
     *
     * @param {*} value
     *
     * @memberOf PagerPageSizesComponent
     */
    pageSizeChange(value: any): void;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
