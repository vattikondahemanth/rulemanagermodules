/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDocument = function () { return typeof document !== 'undefined' ? document : {}; };
var ɵ0 = getDocument;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var BrowserSupportService = /** @class */ (function () {
    function BrowserSupportService() {
    }
    Object.defineProperty(BrowserSupportService.prototype, "scrollbarWidth", {
        get: function () {
            var document = getDocument();
            if (!this.scrollbar && document && document.createElement) {
                var div = document.createElement("div");
                div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
                div.innerHTML = "&nbsp;";
                document.body.appendChild(div);
                this.scrollbar = div.offsetWidth - div.scrollWidth;
                document.body.removeChild(div);
            }
            return this.scrollbar;
        },
        enumerable: true,
        configurable: true
    });
    return BrowserSupportService;
}());
exports.BrowserSupportService = BrowserSupportService;
