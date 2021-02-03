/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
var getDocument = function () { return typeof document !== 'undefined' ? document : {}; };
var ɵ0 = getDocument;
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
export { BrowserSupportService };
export { ɵ0 };
