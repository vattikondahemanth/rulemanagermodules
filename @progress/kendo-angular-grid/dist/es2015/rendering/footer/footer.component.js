/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, HostBinding } from '@angular/core';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { columnsToRender } from '../../columns/column-common';
/**
 * @hidden
 */
export class FooterComponent {
    constructor() {
        this.columns = [];
        this.groups = [];
        this.lockedColumnsCount = 0;
    }
    get footerClass() {
        return !this.scrollable;
    }
    get columnsToRender() {
        return columnsToRender(this.columns || []);
    }
}
FooterComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridFooter]',
                template: `
    <ng-template [ngIf]="true">
        <tr [class.k-footer-template]="true">
            <td
                [class.k-group-cell]="true"
                *ngFor="let g of groups">
            </td>
            <td
                [class.k-hierarchy-cell]="true"
                *ngIf="detailTemplate?.templateRef">
            </td>
            <td
                [ngClass]="column.footerClass"
                [ngStyle]="column.footerStyle"
                *ngFor="let column of columnsToRender; let columnIndex = index">
                <ng-template
                    [templateContext]="{
                        templateRef: column.footerTemplateRef,
                        columnIndex: lockedColumnsCount + columnIndex,
                        column: column,
                        $implicit: column
                    }">
                </ng-template>
            </td>
        </tr>
    </ng-template>
    `
            },] },
];
FooterComponent.propDecorators = {
    columns: [{ type: Input }],
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }],
    scrollable: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    footerClass: [{ type: HostBinding, args: ['class.k-grid-footer',] }]
};
