"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../common/settings.component");
/**
 * @hidden
 */
var LegendComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(LegendComponentGenerated, _super);
    function LegendComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendComponentGenerated.propDecorators = {
        align: [{ type: core_1.Input }],
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        labels: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        offsetX: [{ type: core_1.Input }],
        offsetY: [{ type: core_1.Input }],
        orientation: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        reverse: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        markers: [{ type: core_1.Input }],
        spacing: [{ type: core_1.Input }],
        inactiveItems: [{ type: core_1.Input }],
        item: [{ type: core_1.Input }]
    };
    return LegendComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.LegendComponentGenerated = LegendComponentGenerated;
