/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
const focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
const NODE_NAME_PREDICATES = {};
const toClassList = (classNames) => String(classNames).trim().split(' ');
const ɵ0 = toClassList;
/**
 * @hidden
 */
export const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
/**
 * @hidden
 */
export const matchesClasses = (classNames) => (element) => hasClasses(element, classNames);
/**
 * @hidden
 */
export const matchesNodeName = (nodeName) => {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = (element) => String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
    }
    return NODE_NAME_PREDICATES[nodeName];
};
/**
 * @hidden
 */
export const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
export const closestInScope = (node, predicate, scope) => {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
export const contains = (parent, node, matchSelf = false) => {
    const outside = !closest(node, (child) => child === parent);
    if (outside) {
        return false;
    }
    const el = closest(node, (child) => child === node);
    return el && (matchSelf || el !== parent);
};
/**
 * @hidden
 */
export const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;
    const hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they will still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
export const isFocusable = (element, checkVisibility = true) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const skipTab = tabIndex === '-1';
        let focusable = tabIndex !== null && !skipTab;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled && !skipTab;
        }
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
export const findElement = (node, predicate, matchSelf = true) => {
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            const element = findElement(node, predicate);
            if (element) {
                return element;
            }
        }
        node = node.nextSibling;
    }
};
/**
 * @hidden
 */
export const findFocusable = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusable(node, checkVisibility));
};
/**
 * @hidden
 */
export const findFocusableChild = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusable(node, checkVisibility), false);
};
export { ɵ0 };
