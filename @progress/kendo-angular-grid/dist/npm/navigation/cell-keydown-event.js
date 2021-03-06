/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preventable_event_1 = require("../common/preventable-event");
var dom_queries_1 = require("../rendering/common/dom-queries");
/**
 * @hidden
 */
var CellKeydownEvent = /** @class */ (function (_super) {
    tslib_1.__extends(CellKeydownEvent, _super);
    function CellKeydownEvent(originalEvent) {
        var _this = _super.call(this) || this;
        _this.originalEvent = originalEvent;
        var args = originalEvent;
        _this.cellElement = dom_queries_1.closest(args.target, dom_queries_1.matchesNodeName('td'));
        _this.rowElement = dom_queries_1.closest(_this.cellElement, dom_queries_1.matchesNodeName('tr'));
        _this.keyCode = args.keyCode;
        _this.ctrlKey = args.ctrlKey;
        return _this;
    }
    return CellKeydownEvent;
}(preventable_event_1.PreventableEvent));
exports.CellKeydownEvent = CellKeydownEvent;
