/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isPresent } from "../utils";
import { isCompositeFilterDescriptor } from "@progress/kendo-data-query";
var areDifferent = function (a, b) {
    return a.field !== b.field || a.operator !== b.operator || a.value !== b.value;
};
var ɵ0 = areDifferent;
var isChanged = function (a, b) {
    if (a.length !== b.length) {
        return true;
    }
    for (var idx = 0, len = a.length; idx < len; idx++) {
        var prev = a[idx];
        var curr = b[idx];
        if (isCompositeFilterDescriptor(prev)) {
            // tslint:disable-next-line:no-use-before-declare
            if (diffFilters(prev, curr[idx])) {
                return true;
            }
        }
        else if (areDifferent(prev, curr)) {
            return true;
        }
    }
    return false;
};
var ɵ1 = isChanged;
var cloneFilter = function (_a) {
    var field = _a.field, ignoreCase = _a.ignoreCase, operator = _a.operator, value = _a.value;
    return ({
        field: field,
        ignoreCase: ignoreCase,
        operator: operator,
        value: value
    });
};
var ɵ2 = cloneFilter;
/**
 * @hidden
 */
export var cloneFilters = function (filter) {
    if (!filter) {
        return;
    }
    if (isCompositeFilterDescriptor(filter)) {
        return {
            filters: cloneFilters(filter.filters),
            logic: filter.logic
        };
    }
    else if (Array.isArray(filter)) {
        return filter.map(cloneFilters);
    }
    return cloneFilter(filter);
};
/**
 * @hidden
 */
export var diffFilters = function (a, b) {
    if (isPresent(a) && !isPresent(b)) {
        return true;
    }
    if (!isPresent(a) && isPresent(b)) {
        return true;
    }
    return isPresent(a) && isPresent(b) && isChanged(a.filters, b.filters);
};
export { ɵ0, ɵ1, ɵ2 };
