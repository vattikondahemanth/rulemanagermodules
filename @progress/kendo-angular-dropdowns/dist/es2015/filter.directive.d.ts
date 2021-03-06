/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FilterableDropDownComponentBase } from './filterable-base.component';
import { DropDownFilterSettings } from './filter-settings';
/**
 * Implements an event handler for the `filterChange` event of a DropDowns component
 * which performs simple data filtering.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-autocomplete
 *      [data]="data"
 *      kendoDropDownFilter
 *      placeholder="e.g. Andorra">
 *  </kendo-autocomplete>
 * `
 * })
 * class AppComponent {
 *     public data: Array<string> = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan"];
 * }
 * ```
 */
export declare class FilterDirective implements OnInit, OnChanges, OnDestroy {
    private component;
    /**
     * The initial data that will be used as a source array for the filtering operations.
     */
    data: any[];
    /**
     * The configuration object which sets the behavior of the `kendoDropDownFilter` directive.
     */
    filterSettings?: DropDownFilterSettings;
    private filterChangeSubscription;
    constructor(component: FilterableDropDownComponentBase);
    ngOnChanges(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getFilteredData;
    private checkItem;
    private normalizeValue;
}
