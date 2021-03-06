/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
const getDocument = () => typeof document !== 'undefined' ? document : {};
const ɵ0 = getDocument;
/**
 * @hidden
 */
export class BrowserSupportService {
    get scrollbarWidth() {
        const document = getDocument();
        if (!this.scrollbar && document && document.createElement) {
            const div = document.createElement("div");
            div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
            div.innerHTML = "&nbsp;";
            document.body.appendChild(div);
            this.scrollbar = div.offsetWidth - div.scrollWidth;
            document.body.removeChild(div);
        }
        return this.scrollbar;
    }
}
export { ɵ0 };
