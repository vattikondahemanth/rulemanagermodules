/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var kendo_inputs_common_1 = require("@telerik/kendo-inputs-common");
var utils_1 = require("./utils");
var math_1 = require("../common/math");
/**
 * @hidden
 */
var SliderModel = /** @class */ (function (_super) {
    tslib_1.__extends(SliderModel, _super);
    function SliderModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderModel.prototype.getTickSizes = function () {
        var _a = this.props, min = _a.min, max = _a.max, smallStep = _a.smallStep;
        var count = utils_1.calculateTicksCount(min, max, smallStep);
        var trackSize = this.trackWidth();
        var distStep = trackSize / math_1.subtract(max, min);
        var result = [];
        var usedSpace = 0;
        var endPoint = 0;
        for (var i = 0; i < count; i++) {
            if (i === 0 || i === count - 1) {
                endPoint += (smallStep / 2) * distStep;
            }
            else {
                endPoint += smallStep * distStep;
            }
            var size = Math.round(endPoint - usedSpace);
            result.push(size);
            usedSpace += size;
        }
        return result;
    };
    return SliderModel;
}(kendo_inputs_common_1.SliderModel));
exports.SliderModel = SliderModel;
