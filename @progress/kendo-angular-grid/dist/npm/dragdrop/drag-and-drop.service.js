/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("./common");
/**
 * @hidden
 */
var DragAndDropService = /** @class */ (function () {
    function DragAndDropService() {
        this.changes = new core_1.EventEmitter();
        this.register = [];
        this.lastTarget = null;
    }
    DragAndDropService.prototype.add = function (target) {
        this.register.push(target);
    };
    DragAndDropService.prototype.remove = function (target) {
        this.register = this.register.filter(function (current) { return current !== target; });
    };
    DragAndDropService.prototype.notifyDrag = function (draggable, element, mouseEvent) {
        var target = this.targetFor(element);
        if (this.lastTarget === target) {
            return;
        }
        this.changes.next({
            draggable: draggable,
            mouseEvent: mouseEvent,
            target: this.lastTarget,
            type: 'leave'
        });
        if (target) {
            this.changes.next({
                draggable: draggable,
                mouseEvent: mouseEvent,
                target: target,
                type: 'enter'
            });
        }
        this.lastTarget = target;
    };
    DragAndDropService.prototype.notifyDrop = function (draggable, mouseEvent) {
        this.changes.next({
            draggable: draggable,
            mouseEvent: mouseEvent,
            target: this.lastTarget,
            type: 'drop'
        });
        this.lastTarget = null;
    };
    DragAndDropService.prototype.targetFor = function (element) {
        var comparer = common_1.contains.bind(null, element);
        return this.register.find(function (_a) {
            var nativeElement = _a.element.nativeElement;
            return comparer(nativeElement);
        });
    };
    DragAndDropService.decorators = [
        { type: core_1.Injectable },
    ];
    return DragAndDropService;
}());
exports.DragAndDropService = DragAndDropService;
