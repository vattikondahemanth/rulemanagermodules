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
var FocusOnDomReadyDirective = /** @class */ (function () {
    function FocusOnDomReadyDirective(host, ngZone) {
        this.host = host;
        this.ngZone = ngZone;
    }
    FocusOnDomReadyDirective.prototype.ngAfterContentInit = function () {
        this.focusOnNextTick();
    };
    FocusOnDomReadyDirective.prototype.focusOnNextTick = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () { return setTimeout(function () { return _this.host.nativeElement.focus(); }); });
    };
    FocusOnDomReadyDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoFocusOnDomReady]'
                },] },
    ];
    /** @nocollapse */
    FocusOnDomReadyDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.NgZone }
    ]; };
    return FocusOnDomReadyDirective;
}());
exports.FocusOnDomReadyDirective = FocusOnDomReadyDirective;
