/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { InjectionToken } from '@angular/core';
import { merge, of } from 'rxjs';
export { isChanged, anyChanged, hasObservers } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
export var isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 */
export var isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
export var isTruthy = function (value) { return !!value; };
/**
 * @hidden
 */
export var isNullOrEmptyString = function (value) { return isBlank(value) || (value.trim && value.trim().length === 0); };
/**
 * @hidden
 */
export var observe = function (list) {
    return merge(of(list), list.changes);
};
/**
 * @hidden
 */
export var isUniversal = function () { return typeof document === 'undefined'; };
/**
 * @hidden
 */
export var isString = function (value) {
    return typeof value === 'string';
};
/**
 * @hidden
 */
export var extractFormat = function (format) {
    if (isString(format) && !isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
/**
 * @hidden
 */
export var not = function (fn) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return !fn.apply(null, args);
}; };
/**
 * @hidden
 */
export var or = function () {
    var conditions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        conditions[_i] = arguments[_i];
    }
    return function (value) { return conditions.reduce(function (acc, x) { return acc || x(value); }, false); };
};
/**
 * @hidden
 */
export var and = function () {
    var conditions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        conditions[_i] = arguments[_i];
    }
    return function (value) { return conditions.reduce(function (acc, x) { return acc && x(value); }, true); };
};
/**
 * @hidden
 */
export var Skip = new InjectionToken("Skip"); // tslint:disable-line:variable-name
/**
 * @hidden
 */
export var createPromise = function () {
    var resolveFn, rejectFn;
    var promise = new Promise(function (resolve, reject) {
        resolveFn = function (data) {
            resolve(data);
            return promise;
        };
        rejectFn = function (data) {
            reject(data);
            return promise;
        };
    });
    promise.resolve = resolveFn;
    promise.reject = rejectFn;
    return promise;
};
/** @hidden */
export var iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
