/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("./common");
var updateClass = function (element, valid) {
    var icon = element.querySelector('.k-icon');
    icon.className = icon.className
        .replace(/(plus|cancel)/, valid ? 'plus' : 'cancel');
};
var ɵ0 = updateClass;
exports.ɵ0 = ɵ0;
var updateLock = function (element, locked) {
    if (locked === void 0) { locked = null; }
    var icon = element.querySelectorAll('.k-icon')[1];
    var value = locked == null ? '' : (locked ? 'k-i-lock' : 'k-i-unlock');
    icon.className = icon.className
        .replace(/(k-i-unlock|k-i-lock)/, '') + (" " + value);
};
var ɵ1 = updateLock;
exports.ɵ1 = ɵ1;
var decorate = function (element, target) {
    var targetStyles = getComputedStyle(target);
    element.className = 'k-header k-drag-clue';
    element.style.position = 'absolute';
    element.style.zIndex = '20000';
    element.style.paddingLeft = targetStyles.paddingLeft;
    element.style.paddingTop = targetStyles.paddingTop;
    element.style.paddingBottom = targetStyles.paddingBottom;
    element.style.paddingRight = targetStyles.paddingRight;
    element.style.width = targetStyles.width;
    element.style.height = targetStyles.height;
};
var ɵ2 = decorate;
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
var DragHintService = /** @class */ (function () {
    function DragHintService(santizer) {
        this.santizer = santizer;
    }
    DragHintService.prototype.create = function (down, target, title) {
        this.initCoords(down);
        this.dom = document.createElement("div");
        decorate(this.dom, target);
        var safeTitle = this.santizer.sanitize(core_1.SecurityContext.HTML, title);
        this.dom.innerHTML = "\n            <span class=\"k-icon k-drag-status k-i-cancel k-icon-with-modifier\">\n                <span class=\"k-icon k-icon-modifier\"></span>\n            </span>\n            " + safeTitle + "\n        ";
    };
    DragHintService.prototype.attach = function () {
        return common_1.append(this.dom);
    };
    DragHintService.prototype.remove = function () {
        if (this.dom && this.dom.parentNode) {
            (function (el) {
                setTimeout(function () { return document.body.removeChild(el); });
            })(this.dom); // hack for IE + pointer events!
            this.dom = null;
        }
    };
    DragHintService.prototype.show = function () {
        this.dom.style.display = "";
    };
    DragHintService.prototype.hide = function () {
        this.dom.style.display = "none";
    };
    DragHintService.prototype.enable = function () {
        updateClass(this.dom, true);
    };
    DragHintService.prototype.disable = function () {
        updateClass(this.dom, false);
    };
    DragHintService.prototype.removeLock = function () {
        updateLock(this.dom);
    };
    DragHintService.prototype.toggleLock = function (locked) {
        updateLock(this.dom, locked);
    };
    DragHintService.prototype.move = function (move) {
        this.dom.style.top = this.initialTop + move.pageY + 'px';
        this.dom.style.left = this.initialLeft + move.pageX + 'px';
    };
    DragHintService.prototype.initCoords = function (down) {
        var _a = common_1.offset(down.originalEvent.target), top = _a.top, left = _a.left;
        this.initialTop = top - down.pageY;
        this.initialLeft = left - down.pageX;
    };
    DragHintService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DragHintService.ctorParameters = function () { return [
        { type: core_1.Sanitizer }
    ]; };
    return DragHintService;
}());
exports.DragHintService = DragHintService;
