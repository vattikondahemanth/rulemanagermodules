/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { PagerContextService, PagerContextChanges } from "./pager-context.service";
/**
 * Displays an input element which allows the typing and rendering of page numbers.
 */
export declare class PagerInputComponent extends PagerElementComponent {
    protected pagerContext: PagerContextService;
    constructor(localization: LocalizationService, pagerContext: PagerContextService, cd: ChangeDetectorRef);
    /**
     * @hidden
     *
     * @param {string} value
     *
     * @memberOf PagerInputComponent
     */
    onInputChange(value: string): void;
    /**
     * @hidden
     */
    readonly current: number;
    readonly hasPages: boolean;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
