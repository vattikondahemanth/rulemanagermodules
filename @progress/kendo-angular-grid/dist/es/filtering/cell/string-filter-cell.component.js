/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilterService } from '../filter.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { StringFilterComponent } from "../string-filter.component";
/**
 * Represents a string-filter cell component
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-configuration-components-for-filter-templates)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-string-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
var StringFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StringFilterCellComponent, _super);
    function StringFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        _this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    StringFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-string-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\">\n            <input\n                class=\"k-textbox\"\n                kendoGridFocusable\n                kendoFilterInput\n                [filterDelay]=\"filterDelay\"\n                [ngModel]=\"currentFilter?.value\" />\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    StringFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService }
    ]; };
    StringFilterCellComponent.propDecorators = {
        filterDelay: [{ type: Input }],
        showOperators: [{ type: Input }]
    };
    return StringFilterCellComponent;
}(StringFilterComponent));
export { StringFilterCellComponent };
