/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Less` (**Is less than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var LessFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LessFilterOperatorComponent, _super);
    function LessFilterOperatorComponent(localization) {
        return _super.call(this, "lt", localization) || this;
    }
    LessFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return LessFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-lt-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    LessFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LessFilterOperatorComponent;
}(FilterOperatorBase));
export { LessFilterOperatorComponent };
