/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
var FocusRoot = /** @class */ (function () {
    function FocusRoot() {
        this.groups = [];
    }
    FocusRoot.prototype.registerGroup = function (group) {
        this.unregisterGroup(group);
        this.groups.push(group);
    };
    FocusRoot.prototype.unregisterGroup = function (group) {
        this.groups = this.groups.filter(function (f) { return f !== group; });
    };
    FocusRoot.prototype.activate = function () {
        this.groups.forEach(function (f) { return f.activate(); });
    };
    FocusRoot.prototype.deactivate = function () {
        this.groups.forEach(function (f) { return f.deactivate(); });
    };
    FocusRoot.decorators = [
        { type: core_1.Injectable },
    ];
    return FocusRoot;
}());
exports.FocusRoot = FocusRoot;
