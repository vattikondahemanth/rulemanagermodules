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
var FilterDirective = /** @class */ (function () {
    function FilterDirective(component) {
        this.component = component;
    }
    FilterDirective.prototype.ngOnChanges = function () {
        this.data = this.data || [];
        this.filterSettings = this.filterSettings || {
            caseSensitive: false,
            operator: 'startsWith'
        };
    };
    FilterDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.component.filterable = true;
        this.filterChangeSubscription = this.component.filterChange
            .subscribe(function (query) { return _this.component.data = _this.getFilteredData(query); });
    };
    FilterDirective.prototype.ngOnDestroy = function () {
        this.filterChangeSubscription.unsubscribe();
    };
    FilterDirective.prototype.getFilteredData = function (query) {
        var _this = this;
        var field = this.component.textField || this.component.valueField;
        return this.data.filter(function (item) { return _this.checkItem(getter(item, field), query); });
    };
    FilterDirective.prototype.checkItem = function (target, query) {
        target = this.normalizeValue(target);
        query = this.normalizeValue(query);
        return this.filterSettings.operator === 'contains' ? target.indexOf(query) !== -1 : target.indexOf(query) === 0;
    };
    FilterDirective.prototype.normalizeValue = function (value) {
        var normalizedValue = isPresent(value) ? value.toString() : '';
        return this.filterSettings.caseSensitive ? normalizedValue : normalizedValue.toLowerCase();
    };
    FilterDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownFilter]'
                },] },
    ];
    /** @nocollapse */
    FilterDirective.ctorParameters = function () { return [
        { type: FilterableDropDownComponentBase }
    ]; };
    FilterDirective.propDecorators = {
        data: [{ type: Input }],
        filterSettings: [{ type: Input, args: ['kendoDropDownFilter',] }]
    };
    return FilterDirective;
}());
export { FilterDirective };
