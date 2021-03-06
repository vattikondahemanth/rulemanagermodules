/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { add, subtract, multiply, divide, remainder, fractionLength, toFixedPrecision } from '../common/math';
function elementOffset(element) {
    const box = element.getBoundingClientRect();
    const documentElement = document.documentElement;
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
export function decreaseValueToStep(value, { max, min, smallStep, largeStep }, large = false) {
    const step = large && largeStep ? multiply(smallStep, largeStep) : smallStep;
    const stepValue = subtract(value, min);
    let result;
    const stepRemainder = remainder(stepValue, step);
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
export function increaseValueToStep(value, { max, min, smallStep, largeStep }, large = false) {
    const step = large && largeStep ? multiply(smallStep, largeStep) : smallStep;
    const stepValue = subtract(value, min);
    const stepRemainder = remainder(stepValue, step);
    const result = add(subtract(stepValue, stepRemainder), step);
    return limitValue(add(result, min), min, max);
}
/**
 * @hidden
 */
export function snapValue(value, options) {
    const { smallStep, min, max } = options;
    const limitted = limitValue(value, min, max);
    if (value !== limitted) {
        return limitted;
    }
    const left = decreaseValueToStep(value, options);
    const right = increaseValueToStep(value, options);
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
    const { min, max, vertical, rtl } = options;
    const trackOffset = elementOffset(scaleElement);
    const offset = vertical ? eventArgs.pageY - trackOffset.top : eventArgs.pageX - trackOffset.left;
    const scale = (max - min) / (vertical ? scaleElement.clientHeight : scaleElement.clientWidth);
    const offsetValue = offset * scale;
    let value = rtl || vertical ? max - offsetValue : min + offsetValue;
    const stepFractionLength = fractionLength(options.smallStep);
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
export function calculateValueFromTick(index, { max, min, smallStep, reverse, vertical }) {
    const value = add(min, multiply(index, smallStep));
    return vertical || reverse ? Math.abs(subtract(value, max)) : value;
}
/**
 * @hidden
 */
export function calculateTicksCount(min = 0, max = 0, smallStep = 1) {
    if (smallStep <= 0) {
        throw new Error("Invalid argument: smallStep must be a positive number");
    }
    return add(divide(Math.abs(subtract(max, min)), smallStep), 1);
}
