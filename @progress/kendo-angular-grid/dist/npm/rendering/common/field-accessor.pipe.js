/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_data_query_1 = require("@progress/kendo-data-query");
var utils_1 = require("../../utils");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var FORMAT_REGEX = /\{\d+:?/;
/**
 * @hidden
 */
var FieldAccessorPipe = /** @class */ (function () {
    function FieldAccessorPipe(intlService) {
        this.intlService = intlService;
    }
    FieldAccessorPipe.prototype.transform = function (dataItem, fieldName, format, safe) {
        if (format === void 0) { format = ""; }
        if (safe === void 0) { safe = true; }
        if (!utils_1.isNullOrEmptyString(fieldName)) {
            var value = kendo_data_query_1.getter(fieldName, safe)(dataItem);
            if (utils_1.isPresent(value) && !utils_1.isNullOrEmptyString(format)) {
                return this.formatValue(format, value);
            }
            return value;
        }
        return dataItem;
    };
    FieldAccessorPipe.prototype.formatValue = function (format, value) {
        var intl = this.intlService;
        if (utils_1.isString(format) && format.match(FORMAT_REGEX)) {
            return intl.format(format, value);
        }
        return intl.toString(value, format);
    };
    FieldAccessorPipe.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'valueOf',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    FieldAccessorPipe.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    return FieldAccessorPipe;
}());
exports.FieldAccessorPipe = FieldAccessorPipe;
