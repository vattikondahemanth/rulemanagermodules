"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../common/settings.component");
/**
 * @hidden
 */
var PlotAreaComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(PlotAreaComponentGenerated, _super);
    function PlotAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'plotArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PlotAreaComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        opacity: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }]
    };
    return PlotAreaComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.PlotAreaComponentGenerated = PlotAreaComponentGenerated;
