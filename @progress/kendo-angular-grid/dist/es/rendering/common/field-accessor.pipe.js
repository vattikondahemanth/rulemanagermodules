/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:pipe-naming */
import { Pipe } from '@angular/core';
import { getter } from '@progress/kendo-data-query';
import { isNullOrEmptyString, isPresent, isString } from '../../utils';
import { IntlService } from '@progress/kendo-angular-intl';
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
        if (!isNullOrEmptyString(fieldName)) {
            var value = getter(fieldName, safe)(dataItem);
            if (isPresent(value) && !isNullOrEmptyString(format)) {
                return this.formatValue(format, value);
            }
            return value;
        }
        return dataItem;
    };
    FieldAccessorPipe.prototype.formatValue = function (format, value) {
        var intl = this.intlService;
        if (isString(format) && format.match(FORMAT_REGEX)) {
            return intl.format(format, value);
        }
        return intl.toString(value, format);
    };
    FieldAccessorPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'valueOf',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    FieldAccessorPipe.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return FieldAccessorPipe;
}());
export { FieldAccessorPipe };
