/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Greater` (**Is greater than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
export class GreaterFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("gt", localization); }
}
GreaterFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => GreaterFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-gt-operator',
                template: ``
            },] },
];
/** @nocollapse */
GreaterFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];
