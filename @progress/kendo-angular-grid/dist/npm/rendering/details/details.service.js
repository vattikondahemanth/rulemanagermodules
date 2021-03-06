/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var expand_state_service_1 = require("../../common/expand-state.service");
var detail_expand_event_1 = require("./detail-expand-event");
var detail_collapse_event_1 = require("./detail-collapse-event");
/**
 * @hidden
 */
var DetailsService = /** @class */ (function (_super) {
    tslib_1.__extends(DetailsService, _super);
    function DetailsService() {
        return _super.call(this, true) || this;
    }
    DetailsService.prototype.emitEvent = function (args) {
        var eventArg = new (args.expand ? detail_expand_event_1.DetailExpandEvent : detail_collapse_event_1.DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    };
    DetailsService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DetailsService.ctorParameters = function () { return []; };
    return DetailsService;
}(expand_state_service_1.ExpandStateService));
exports.DetailsService = DetailsService;
