/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PreventableEvent } from '../common/preventable-event';
import { closest, matchesNodeName } from '../rendering/common/dom-queries';
/**
 * @hidden
 */
var CellKeydownEvent = /** @class */ (function (_super) {
    tslib_1.__extends(CellKeydownEvent, _super);
    function CellKeydownEvent(originalEvent) {
        var _this = _super.call(this) || this;
        _this.originalEvent = originalEvent;
        var args = originalEvent;
        _this.cellElement = closest(args.target, matchesNodeName('td'));
        _this.rowElement = closest(_this.cellElement, matchesNodeName('tr'));
        _this.keyCode = args.keyCode;
        _this.ctrlKey = args.ctrlKey;
        return _this;
    }
    return CellKeydownEvent;
}(PreventableEvent));
export { CellKeydownEvent };
