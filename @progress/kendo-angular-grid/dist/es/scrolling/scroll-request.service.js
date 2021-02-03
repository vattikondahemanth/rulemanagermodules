/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * @hidden
 */
var ScrollRequestService = /** @class */ (function () {
    function ScrollRequestService() {
        this.requests = new Subject();
    }
    ScrollRequestService.prototype.scrollTo = function (itemIndex) {
        this.requests.next({ itemIndex: itemIndex });
    };
    ScrollRequestService.decorators = [
        { type: Injectable },
    ];
    return ScrollRequestService;
}());
export { ScrollRequestService };
