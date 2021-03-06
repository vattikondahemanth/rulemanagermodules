/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input, ContentChild } from "@angular/core";
import { ColumnComponent } from "../columns/column.component";
import { FilterInputDirective } from "./filter-input.directive";
import { isPresent, isNullOrEmptyString, isBlank, isChanged } from "../utils";
import { BaseFilterCellComponent } from "./base-filter-cell.component";
/**
 * @hidden
 */
export class FilterInputWrapperComponent extends BaseFilterCellComponent {
    constructor(filterService) {
        super(filterService);
        this.operators = [];
    }
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    get currentOperator() {
        const filter = this.currentFilter;
        if (!this._operator) {
            this._operator = filter ? filter.operator : this.defaultOperator;
        }
        return this._operator;
    }
    set currentOperator(value) {
        this._operator = value;
        if (value === "isnull" || value === "isnotnull" || value === "isempty" || value === "isnotempty") {
            this.applyNoValueFilter(value);
        }
        else if (!isBlank(value) && isPresent(this.currentFilter)) {
            this.onChange(this.currentFilter.value);
        }
    }
    get defaultOperator() {
        if (!isNullOrEmptyString(this._defaultOperator)) {
            return this._defaultOperator;
        }
        else if (this.operators && this.operators.length) {
            return this.operators[0].value;
        }
        return "eq";
    }
    set defaultOperator(value) {
        this._defaultOperator = value;
    }
    ngAfterContentInit() {
        if (isPresent(this.input)) {
            this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    }
    onChange(value) {
        if (!isNullOrEmptyString(value) || this.filterByField(this.column.field)) {
            this.filterChange(isNullOrEmptyString(value) ?
                this.removeFilter(this.column.field) :
                this.updateFilter({
                    field: this.column.field,
                    operator: this.currentOperator,
                    value: value
                }));
        }
    }
    onClear() {
        this.onChange(null);
    }
    applyNoValueFilter(operator) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: operator,
            value: null
        }));
    }
    ngOnChanges(changes) {
        if (isChanged("filter", changes, false)) {
            this._operator = null;
        }
    }
}
FilterInputWrapperComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    input: [{ type: ContentChild, args: [FilterInputDirective,] }],
    defaultOperator: [{ type: Input }]
};
