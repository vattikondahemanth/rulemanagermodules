/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var areDifferent = function (a, b) {
    return a.field !== b.field || a.operator !== b.operator || a.value !== b.value;
};
var ɵ0 = areDifferent;
exports.ɵ0 = ɵ0;
var isChanged = function (a, b) {
    if (a.length !== b.length) {
        return true;
    }
    for (var idx = 0, len = a.length; idx < len; idx++) {
        var prev = a[idx];
        var curr = b[idx];
        if (kendo_data_query_1.isCompositeFilterDescriptor(prev)) {
            // tslint:disable-next-line:no-use-before-declare
            if (exports.diffFilters(prev, curr[idx])) {
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
exports.ɵ1 = ɵ1;
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
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
exports.cloneFilters = function (filter) {
    if (!filter) {
        return;
    }
    if (kendo_data_query_1.isCompositeFilterDescriptor(filter)) {
        return {
            filters: exports.cloneFilters(filter.filters),
            logic: filter.logic
        };
    }
    else if (Array.isArray(filter)) {
        return filter.map(exports.cloneFilters);
    }
    return cloneFilter(filter);
};
/**
 * @hidden
 */
exports.diffFilters = function (a, b) {
    if (utils_1.isPresent(a) && !utils_1.isPresent(b)) {
        return true;
    }
    if (!utils_1.isPresent(a) && utils_1.isPresent(b)) {
        return true;
    }
    return utils_1.isPresent(a) && utils_1.isPresent(b) && isChanged(a.filters, b.filters);
};
