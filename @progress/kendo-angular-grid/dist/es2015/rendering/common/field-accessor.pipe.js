/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:pipe-naming */
import { Pipe } from '@angular/core';
import { getter } from '@progress/kendo-data-query';
import { isNullOrEmptyString, isPresent, isString } from '../../utils';
import { IntlService } from '@progress/kendo-angular-intl';
const FORMAT_REGEX = /\{\d+:?/;
/**
 * @hidden
 */
export class FieldAccessorPipe {
    constructor(intlService) {
        this.intlService = intlService;
    }
    transform(dataItem, fieldName, format = "", safe = true) {
        if (!isNullOrEmptyString(fieldName)) {
            const value = getter(fieldName, safe)(dataItem);
            if (isPresent(value) && !isNullOrEmptyString(format)) {
                return this.formatValue(format, value);
            }
            return value;
        }
        return dataItem;
    }
    formatValue(format, value) {
        const intl = this.intlService;
        if (isString(format) && format.match(FORMAT_REGEX)) {
            return intl.format(format, value);
        }
        return intl.toString(value, format);
    }
}
FieldAccessorPipe.decorators = [
    { type: Pipe, args: [{
                name: 'valueOf',
                pure: false
            },] },
];
/** @nocollapse */
FieldAccessorPipe.ctorParameters = () => [
    { type: IntlService }
];
