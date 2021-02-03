/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("./util");
var keys_1 = require("./common/keys");
var navigation_action_1 = require("./navigation-action");
var disabled_items_service_1 = require("./disabled-items.service");
var selection_service_1 = require("./selection.service");
var MIN_INDEX = 0;
/**
 * @hidden
 */
var NavigationEvent = /** @class */ (function () {
    /**
     * The index of the item to which the user navigated.
     */
    function NavigationEvent(index, originalEvent) {
        this.index = index;
        this.originalEvent = originalEvent;
    }
    return NavigationEvent;
}());
exports.NavigationEvent = NavigationEvent;
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(disabledItemsService, selectionService) {
        this.disabledItemsService = disabledItemsService;
        this.selectionService = selectionService;
        this.open = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.enter = new core_1.EventEmitter();
        this.tab = new core_1.EventEmitter();
        this.esc = new core_1.EventEmitter();
        this.up = new core_1.EventEmitter();
        this.right = new core_1.EventEmitter();
        this.down = new core_1.EventEmitter();
        this.left = new core_1.EventEmitter();
        this.delete = new core_1.EventEmitter();
        this.backspace = new core_1.EventEmitter();
        this.home = new core_1.EventEmitter();
        this.end = new core_1.EventEmitter();
    }
    NavigationService.prototype.process = function (args) {
        var keyCode = args.originalEvent.keyCode;
        var altKey = args.originalEvent.altKey;
        var index;
        var action = navigation_action_1.NavigationAction.Undefined;
        if (altKey && keyCode === keys_1.Keys.down) {
            action = navigation_action_1.NavigationAction.Open;
        }
        else if (altKey && keyCode === keys_1.Keys.up) {
            action = navigation_action_1.NavigationAction.Close;
        }
        else if (keyCode === keys_1.Keys.enter) {
            action = navigation_action_1.NavigationAction.Enter;
        }
        else if (keyCode === keys_1.Keys.esc) {
            action = navigation_action_1.NavigationAction.Esc;
        }
        else if (keyCode === keys_1.Keys.tab) {
            action = navigation_action_1.NavigationAction.Tab;
        }
        else if (keyCode === keys_1.Keys.up) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: -1 });
            action = navigation_action_1.NavigationAction.Up;
        }
        else if (keyCode === keys_1.Keys.left) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: -1 });
            action = navigation_action_1.NavigationAction.Left;
        }
        else if (keyCode === keys_1.Keys.down) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: 1 });
            action = navigation_action_1.NavigationAction.Down;
        }
        else if (keyCode === keys_1.Keys.right) {
            index = this.next({ current: args.current, start: args.min, end: args.max, step: 1 });
            action = navigation_action_1.NavigationAction.Right;
        }
        else if (keyCode === keys_1.Keys.home) {
            index = this.isDisabled(MIN_INDEX) ? args.current : MIN_INDEX;
            action = navigation_action_1.NavigationAction.Home;
        }
        else if (keyCode === keys_1.Keys.end) {
            index = this.isDisabled(args.max) ? args.current : args.max;
            action = navigation_action_1.NavigationAction.End;
        }
        else if (keyCode === keys_1.Keys.delete) {
            action = navigation_action_1.NavigationAction.Delete;
        }
        else if (keyCode === keys_1.Keys.backspace) {
            action = navigation_action_1.NavigationAction.Backspace;
        }
        var eventData = new NavigationEvent(index, args.originalEvent);
        if (action !== navigation_action_1.NavigationAction.Undefined) {
            this[navigation_action_1.NavigationAction[action].toLowerCase()].emit(eventData);
        }
        return action;
    };
    NavigationService.prototype.next = function (args) {
        var current = args.current, start = args.start, end = args.end, step = args.step;
        var nextIndex = !util_1.isPresent(current) ? start : this.clampIndex(current + step, start, end);
        var firstFocusableIndex = this.firstFocusableIndex(nextIndex, start, end, step);
        if (util_1.isPresent(firstFocusableIndex)) {
            return firstFocusableIndex;
        }
        if (this.selectionService.isSelected(current) && current >= start) {
            return current;
        }
        var inversedStep = -1 * step;
        return this.firstFocusableIndex(nextIndex, start, end, inversedStep);
    };
    NavigationService.prototype.clampIndex = function (index, min, max) {
        if (!util_1.isPresent(index) || index < min) {
            return min;
        }
        if (index > max) {
            return max;
        }
        return index;
    };
    NavigationService.prototype.firstFocusableIndex = function (startIndex, min, max, step) {
        while (min <= startIndex && startIndex <= max) {
            if (!this.isDisabled(startIndex)) {
                return startIndex;
            }
            startIndex += step;
        }
        return undefined;
    };
    NavigationService.prototype.isDisabled = function (index) {
        if (this.disabledItemsService) {
            return this.disabledItemsService.isIndexDisabled(index);
        }
    };
    NavigationService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: disabled_items_service_1.DisabledItemsService },
        { type: selection_service_1.SelectionService }
    ]; };
    return NavigationService;
}());
exports.NavigationService = NavigationService;
