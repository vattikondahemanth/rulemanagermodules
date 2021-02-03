import { Injectable, Inject, EventEmitter } from '@angular/core';
import { isPresent } from './../util';
import { KeyEvents } from './key-events';
import { Keys } from '@progress/kendo-angular-common';
import { NavigationAction } from './navigation-action';
import { NAVIGATION_CONFIG } from './navigation-config';
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(config) {
        this.navigate = new EventEmitter();
        this.open = new EventEmitter();
        this.close = new EventEmitter();
        this.enter = new EventEmitter();
        this.enterpress = new EventEmitter();
        this.enterup = new EventEmitter();
        this.tab = new EventEmitter();
        this.esc = new EventEmitter();
        this.useLeftRightArrows = config.useLeftRightArrows;
    }
    NavigationService.prototype.process = function (args) {
        var keyCode = args.keyCode;
        var keyEvent = args.keyEvent;
        var index;
        var action = NavigationAction.Undefined;
        if (keyEvent === KeyEvents.keypress) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterPress;
            }
        }
        else if (keyEvent === KeyEvents.keyup) {
            if (this.isEnter(keyCode)) {
                action = NavigationAction.EnterUp;
            }
        }
        else {
            if (args.altKey && keyCode === Keys.ArrowDown) {
                action = NavigationAction.Open;
            }
            else if (args.altKey && keyCode === Keys.ArrowUp) {
                action = NavigationAction.Close;
            }
            else if (this.isEnter(keyCode)) {
                action = NavigationAction.Enter;
            }
            else if (keyCode === Keys.Escape) {
                action = NavigationAction.Esc;
            }
            else if (keyCode === Keys.Tab) {
                action = NavigationAction.Tab;
            }
            else if (keyCode === Keys.ArrowUp || (this.useLeftRightArrows && keyCode === Keys.ArrowLeft)) {
                index = this.next({
                    current: args.current,
                    start: args.max,
                    end: args.min,
                    step: -1
                });
                action = NavigationAction.Navigate;
            }
            else if (keyCode === Keys.ArrowDown || (this.useLeftRightArrows && keyCode === Keys.ArrowRight)) {
                index = this.next({
                    current: args.current,
                    start: args.min,
                    end: args.max,
                    step: 1
                });
                action = NavigationAction.Navigate;
            }
        }
        if (action !== NavigationAction.Undefined) {
            this[NavigationAction[action].toLowerCase()].emit(index);
        }
        return action;
    };
    NavigationService.prototype.isEnter = function (keyCode) {
        return keyCode === Keys.Enter || keyCode === Keys.Space;
    };
    NavigationService.prototype.next = function (args) {
        if (!isPresent(args.current)) {
            return args.start;
        }
        else {
            return args.current !== args.end ? args.current + args.step : args.end;
        }
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NAVIGATION_CONFIG,] }] }
    ]; };
    return NavigationService;
}());
export { NavigationService };
