/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from "./pager-context.service";
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
export class PagerPageSizesComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPageSizesComponent
     */
    get classes() {
        return true;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPageSizesComponent
     */
    get showInitialPageSize() {
        return this.pageSizes
            .filter(num => num === Number(this.pageSize))
            .length === 0;
    }
    /**
     * @hidden
     *
     * @param {*} value
     *
     * @memberOf PagerPageSizesComponent
     */
    pageSizeChange(value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerPageSizesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-page-sizes',
                template: `
        <select #select
            (change)="pageSizeChange(select.value)"
            [attr.aria-label]="textFor('pagerItemsPerPage')">
            <option *ngIf="showInitialPageSize" [value]="pageSize">{{pageSize}}</option>
            <option *ngFor="let page of pageSizes" [value]="page" [selected]="page === pageSize ? true : undefined">
                {{page}}
            </option>
        </select>
        {{ textFor('pagerItemsPerPage') }}
    `
            },] },
];
/** @nocollapse */
PagerPageSizesComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerPageSizesComponent.propDecorators = {
    pageSizes: [{ type: Input }],
    classes: [{ type: HostBinding, args: ["class.k-pager-sizes",] }, { type: HostBinding, args: ["class.k-label",] }]
};
