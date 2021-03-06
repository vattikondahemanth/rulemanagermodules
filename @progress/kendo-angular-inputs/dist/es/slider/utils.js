/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { add, subtract, multiply, divide, remainder, fractionLength, toFixedPrecision } from '../common/math';
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
export function decreaseValueToStep(value, _a, large) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, largeStep = _a.largeStep;
    if (large === void 0) { large = false; }
    var step = large && largeStep ? multiply(smallStep, largeStep) : smallStep;
    var stepValue = subtract(value, min);
    var result;
    var stepRemainder = remainder(stepValue, step);
    if (stepRemainder === 0) {
        result = subtract(stepValue, step);
    }
    else {
        result = subtract(stepValue, stepRemainder);
    }
    return limitValue(add(result, min), min, max);
}
/**
 * @hidden
 */
export function increaseValueToStep(value, _a, large) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, largeStep = _a.largeStep;
    if (large === void 0) { large = false; }
    var step = large && largeStep ? multiply(smallStep, largeStep) : smallStep;
    var stepValue = subtract(value, min);
    var stepRemainder = remainder(stepValue, step);
    var result = add(subtract(stepValue, stepRemainder), step);
    return limitValue(add(result, min), min, max);
}
/**
 * @hidden
 */
export function snapValue(value, options) {
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
/**
 * @hidden
 */
export function eventValue(eventArgs, scaleElement, options) {
    var min = options.min, max = options.max, vertical = options.vertical, rtl = options.rtl;
    var trackOffset = elementOffset(scaleElement);
    var offset = vertical ? eventArgs.pageY - trackOffset.top : eventArgs.pageX - trackOffset.left;
    var scale = (max - min) / (vertical ? scaleElement.clientHeight : scaleElement.clientWidth);
    var offsetValue = offset * scale;
    var value = rtl || vertical ? max - offsetValue : min + offsetValue;
    var stepFractionLength = fractionLength(options.smallStep);
    value = toFixedPrecision(value, stepFractionLength + 1);
    return snapValue(value, options);
}
/**
 * @hidden
 */
export function isButton(element) {
    return element.className.indexOf('k-button-increase') >= 0 || element.className.indexOf('k-button-decrease') >= 0;
}
/**
 * @hidden
 */
export function increment(options) {
    return increaseValueToStep(options.value, options);
}
/**
 * @hidden
 */
export function decrement(options) {
    return decreaseValueToStep(options.value, options);
}
/**
 * @hidden
 */
export function incrementLarge(options) {
    return increaseValueToStep(options.value, options, true);
}
/**
 * @hidden
 */
export function decrementLarge(options) {
    return decreaseValueToStep(options.value, options, true);
}
/**
 * @hidden
 */
export function calculateValueFromTick(index, _a) {
    var max = _a.max, min = _a.min, smallStep = _a.smallStep, reverse = _a.reverse, vertical = _a.vertical;
    var value = add(min, multiply(index, smallStep));
    return vertical || reverse ? Math.abs(subtract(value, max)) : value;
}
/**
 * @hidden
 */
export function calculateTicksCount(min, max, smallStep) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 0; }
    if (smallStep === void 0) { smallStep = 1; }
    if (smallStep <= 0) {
        throw new Error("Invalid argument: smallStep must be a positive number");
    }
    return add(divide(Math.abs(subtract(max, min)), smallStep), 1);
}
