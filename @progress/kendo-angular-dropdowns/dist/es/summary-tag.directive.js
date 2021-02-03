/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { isPresent } from './util';
import { MultiSelectComponent } from './multiselect.component';
/**
 * A directive which configures the MultiSelect to show one single summary tag for all selected data items.
 * When a number is provided, the summary tag is displayed after the given amount of data items are selected
 * ([more information and examples]({% slug summarytagmode_multiselect %})).
 *
 * @example
 * ```ts-no-run
 * <kendo-multiselect kendoMultiSelectSummaryTag [data]="data"></kendo-multiselect>
 * ```
 *
 * @example
 * ```ts-no-run
 * <kendo-multiselect [kendoMultiSelectSummaryTag]="2" [data]="data"></kendo-multiselect>
 * ```
 */
var SummaryTagDirective = /** @class */ (function () {
    function SummaryTagDirective(multiSelectComponent) {
        this.multiSelectComponent = multiSelectComponent;
        /**
         * A numeric value that indicates the number of selected data items after which the summary tag will appear.
         */
        this.showAfter = 0; // tslint:disable-line:no-input-rename
        this.createTagMapper();
    }
    SummaryTagDirective.prototype.ngOnChanges = function (changes) {
        if (isPresent(changes.showAfter)) {
            this.createTagMapper();
            this.multiSelectComponent.onTagMapperChange();
        }
    };
    SummaryTagDirective.prototype.createTagMapper = function () {
        var _this = this;
        this.multiSelectComponent.tagMapper = function (tags) {
            if (tags.length > _this.showAfter) {
                var result = void 0;
                result = tags.slice(0, _this.showAfter);
                result.push(tags.slice(_this.showAfter, tags.length));
                return result;
            }
            else {
                return tags;
            }
        };
    };
    SummaryTagDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoMultiSelectSummaryTag]'
                },] },
    ];
    /** @nocollapse */
    SummaryTagDirective.ctorParameters = function () { return [
        { type: MultiSelectComponent }
    ]; };
    SummaryTagDirective.propDecorators = {
        showAfter: [{ type: Input, args: ['kendoMultiSelectSummaryTag',] }]
    };
    return SummaryTagDirective;
}());
export { SummaryTagDirective };
