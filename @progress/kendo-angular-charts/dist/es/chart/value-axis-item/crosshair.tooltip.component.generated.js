import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var ValueAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisCrosshairTooltipComponentGenerated, _super);
    function ValueAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisCrosshairTooltipComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return ValueAxisCrosshairTooltipComponentGenerated;
}(SettingsComponent));
export { ValueAxisCrosshairTooltipComponentGenerated };
