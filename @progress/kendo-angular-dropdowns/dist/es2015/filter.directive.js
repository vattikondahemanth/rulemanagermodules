/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-input-rename
// tslint:disable:member-ordering
import { Directive, Input } from '@angular/core';
import { FilterableDropDownComponentBase } from './filterable-base.component';
import { getter, isPresent } from './util';
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
export class FilterDirective {
    constructor(component) {
        this.component = component;
    }
    ngOnChanges() {
        this.data = this.data || [];
        this.filterSettings = this.filterSettings || {
            caseSensitive: false,
            operator: 'startsWith'
        };
    }
    ngOnInit() {
        this.component.filterable = true;
        this.filterChangeSubscription = this.component.filterChange
            .subscribe(query => this.component.data = this.getFilteredData(query));
    }
    ngOnDestroy() {
        this.filterChangeSubscription.unsubscribe();
    }
    getFilteredData(query) {
        const field = this.component.textField || this.component.valueField;
        return this.data.filter(item => this.checkItem(getter(item, field), query));
    }
    checkItem(target, query) {
        target = this.normalizeValue(target);
        query = this.normalizeValue(query);
        return this.filterSettings.operator === 'contains' ? target.indexOf(query) !== -1 : target.indexOf(query) === 0;
    }
    normalizeValue(value) {
        const normalizedValue = isPresent(value) ? value.toString() : '';
        return this.filterSettings.caseSensitive ? normalizedValue : normalizedValue.toLowerCase();
    }
}
FilterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropDownFilter]'
            },] },
];
/** @nocollapse */
FilterDirective.ctorParameters = () => [
    { type: FilterableDropDownComponentBase }
];
FilterDirective.propDecorators = {
    data: [{ type: Input }],
    filterSettings: [{ type: Input, args: ['kendoDropDownFilter',] }]
};
