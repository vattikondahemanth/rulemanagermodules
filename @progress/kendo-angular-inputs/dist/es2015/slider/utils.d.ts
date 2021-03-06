/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export declare function decreaseValueToStep(value: number, { max, min, smallStep, largeStep }: any, large?: boolean): number;
/**
 * @hidden
 */
export declare function increaseValueToStep(value: number, { max, min, smallStep, largeStep }: any, large?: boolean): number;
/**
 * @hidden
 */
export declare function snapValue(value: number, options: any): number;
/**
 * @hidden
 */
export declare function eventValue(eventArgs: any, scaleElement: any, options: any): number;
/**
 * @hidden
 */
export declare function isButton(element: any): boolean;
/**
 * @hidden
 */
export declare function increment(options: any): number;
/**
 * @hidden
 */
export declare function decrement(options: any): number;
/**
 * @hidden
 */
export declare function incrementLarge(options: any): number;
/**
 * @hidden
 */
export declare function decrementLarge(options: any): number;
/**
 * @hidden
 */
export declare function calculateValueFromTick(index: number, { max, min, smallStep, reverse, vertical }: any): number;
/**
 * @hidden
 */
export declare function calculateTicksCount(min?: number, max?: number, smallStep?: number): number;
