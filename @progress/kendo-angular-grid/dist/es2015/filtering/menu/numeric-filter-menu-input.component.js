/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
/**
 * @hidden
 */
export class NumericFilterMenuInputComponent {
    constructor() {
        this.operators = [];
        /**
         * Specifies the value which is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
    }
}
NumericFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-numeric-filter-menu-input',
                template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
            >
            <kendo-numerictextbox
                kendoFilterInput
                [filterDelay]="0"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step">
            </kendo-numerictextbox>
        </kendo-grid-filter-menu-input-wrapper>
    `
            },] },
];
NumericFilterMenuInputComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    currentFilter: [{ type: Input }],
    filterService: [{ type: Input }],
    step: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    spinners: [{ type: Input }],
    decimals: [{ type: Input }],
    format: [{ type: Input }]
};
