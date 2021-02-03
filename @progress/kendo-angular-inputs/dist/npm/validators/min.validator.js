/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.createMinValidator = function (minValue) {
    return function (c) {
        var err = {
            minError: {
                minValue: minValue,
                value: c.value
            }
        };
        return (c.value !== null && c.value < minValue) ? err : null;
    };
};
