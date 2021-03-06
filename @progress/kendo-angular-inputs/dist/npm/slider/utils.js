/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../common/math");
function elementOffset(element) {
    var box = element.getBoundingClientRect();
    var documentElement = document.documentElement;
    return {
        left: box.left + (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0),
        top: box.top + (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0)
    };
}
function limitValue(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
/**
 * @hidden
 */
function decreaseValueToStep(value, _a, large) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, largeStep = _a.largeStep;
    if (large === void 0) { large = false; }
    var step = large && largeStep ? math_1.multiply(smallStep, largeStep) : smallStep;
    var stepValue = math_1.subtract(value, min);
    var result;
    var stepRemainder = math_1.remainder(stepValue, step);
    if (stepRemainder === 0) {
        result = math_1.subtract(stepValue, step);
    }
    else {
        result = math_1.subtract(stepValue, stepRemainder);
    }
    return limitValue(math_1.add(result, min), min, max);
}
exports.decreaseValueToStep = decreaseValueToStep;
/**
 * @hidden
 */
function increaseValueToStep(value, _a, large) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, largeStep = _a.largeStep;
    if (large === void 0) { large = false; }
    var step = large && largeStep ? math_1.multiply(smallStep, largeStep) : smallStep;
    var stepValue = math_1.subtract(value, min);
    var stepRemainder = math_1.remainder(stepValue, step);
    var result = math_1.add(math_1.subtract(stepValue, stepRemainder), step);
    return limitValue(math_1.add(result, min), min, max);
}
exports.increaseValueToStep = increaseValueToStep;
/**
 * @hidden
 */
function snapValue(value, options) {
    var smallStep = options.smallStep, min = options.min, max = options.max;
    var limitted = limitValue(value, min, max);
    if (value !== limitted) {
        return limitted;
    }
    var left = decreaseValueToStep(value, options);
    var right = increaseValueToStep(value, options);
    if ((value - min) % smallStep === 0) {
        return value;
    }
    if (right - value <= (right - left) / 2) {
        return right;
    }
    return left;
}
exports.snapValue = snapValue;
/**
 * @hidden
 */
function eventValue(eventArgs, scaleElement, options) {
    var min = options.min, max = options.max, vertical = options.vertical, rtl = options.rtl;
    var trackOffset = elementOffset(scaleElement);
    var offset = vertical ? eventArgs.pageY - trackOffset.top : eventArgs.pageX - trackOffset.left;
    var scale = (max - min) / (vertical ? scaleElement.clientHeight : scaleElement.clientWidth);
    var offsetValue = offset * scale;
    var value = rtl || vertical ? max - offsetValue : min + offsetValue;
    var stepFractionLength = math_1.fractionLength(options.smallStep);
    value = math_1.toFixedPrecision(value, stepFractionLength + 1);
    return snapValue(value, options);
}
exports.eventValue = eventValue;
/**
 * @hidden
 */
function isButton(element) {
    return element.className.indexOf('k-button-increase') >= 0 || element.className.indexOf('k-button-decrease') >= 0;
}
exports.isButton = isButton;
/**
 * @hidden
 */
function increment(options) {
    return increaseValueToStep(options.value, options);
}
exports.increment = increment;
/**
 * @hidden
 */
function decrement(options) {
    return decreaseValueToStep(options.value, options);
}
exports.decrement = decrement;
/**
 * @hidden
 */
function incrementLarge(options) {
    return increaseValueToStep(options.value, options, true);
}
exports.incrementLarge = incrementLarge;
/**
 * @hidden
 */
function decrementLarge(options) {
    return decreaseValueToStep(options.value, options, true);
}
exports.decrementLarge = decrementLarge;
/**
 * @hidden
 */
function calculateValueFromTick(index, _a) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, reverse = _a.reverse, vertical = _a.vertical;
    var value = math_1.add(min, math_1.multiply(index, smallStep));
    return vertical || reverse ? Math.abs(math_1.subtract(value, max)) : value;
}
exports.calculateValueFromTick = calculateValueFromTick;
/**
 * @hidden
 */
function calculateTicksCount(min, max, smallStep) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 0; }
    if (smallStep === void 0) { smallStep = 1; }
    if (smallStep <= 0) {
        throw new Error("Invalid argument: smallStep must be a positive number");
    }
    return math_1.add(math_1.divide(Math.abs(math_1.subtract(max, min)), smallStep), 1);
}
exports.calculateTicksCount = calculateTicksCount;
