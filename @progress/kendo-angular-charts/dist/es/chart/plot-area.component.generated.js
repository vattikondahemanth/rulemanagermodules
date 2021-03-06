import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
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
        background: [{ type: Input }],
        border: [{ type: Input }],
        margin: [{ type: Input }],
        opacity: [{ type: Input }],
        padding: [{ type: Input }]
    };
    return PlotAreaComponentGenerated;
}(SettingsComponent));
export { PlotAreaComponentGenerated };
