/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Less then` (**Is before**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
export class BeforeFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("before", localization); }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: "lt"
        };
    }
}
BeforeFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => BeforeFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-before-operator',
                template: ``
            },] },
];
/** @nocollapse */
BeforeFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];
