/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExpandStateService } from '../../common/expand-state.service';
import { DetailExpandEvent } from './detail-expand-event';
import { DetailCollapseEvent } from './detail-collapse-event';
/**
 * @hidden
 */
var DetailsService = /** @class */ (function (_super) {
    tslib_1.__extends(DetailsService, _super);
    function DetailsService() {
        return _super.call(this, true) || this;
    }
    DetailsService.prototype.emitEvent = function (args) {
        var eventArg = new (args.expand ? DetailExpandEvent : DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    };
    DetailsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DetailsService.ctorParameters = function () { return []; };
    return DetailsService;
}(ExpandStateService));
export { DetailsService };
