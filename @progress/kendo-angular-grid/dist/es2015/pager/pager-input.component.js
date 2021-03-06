/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { PagerContextService } from "./pager-context.service";
/**
 * Displays an input element which allows the typing and rendering of page numbers.
 */
export class PagerInputComponent extends PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
    }
    /**
     * @hidden
     *
     * @param {string} value
     *
     * @memberOf PagerInputComponent
     */
    onInputChange(value) {
        let page = parseInt(value, 10);
        if (isNaN(page) || page < 1 || page > this.totalPages) {
            page = this.currentPage;
        }
        this.changePage(page - 1);
    }
    /**
     * @hidden
     */
    get current() {
        return this.hasPages ? this.currentPage : 0;
    }
    get hasPages() {
        return this.totalPages !== 0;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pager-input',
                template: `
     <span [ngClass]="{'k-pager-input': true, 'k-label': true}">
        {{textFor('pagerPage')}}
        <input [class.k-textbox]="true"
            [disabled]="!hasPages"
            [value]="current"
            #inputPager
            (change)="onInputChange(inputPager.value)" />
        {{textFor('pagerOf')}} {{totalPages}}
     </span>
    `
            },] },
];
/** @nocollapse */
PagerInputComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: ChangeDetectorRef }
];
