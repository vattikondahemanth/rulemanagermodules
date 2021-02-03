/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export declare class StringFilterCellComponent extends StringFilterComponent {
    /**
     * Determines the delay time (in milliseconds) before the filter value is submitted.
     * A value of `0` indicates no delay. The default value is `500`.
     * @type {boolean}
     */
    filterDelay: number;
    /**
     * Determines if the drop-down filter operators will be displayed.
     * The default value is `true`.
     * @type {boolean}
     */
    showOperators: boolean;
    constructor(filterService: FilterService, localization: LocalizationService);
}
