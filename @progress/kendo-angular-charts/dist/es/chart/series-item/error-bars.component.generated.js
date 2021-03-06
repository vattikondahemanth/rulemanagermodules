import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesErrorBarsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesErrorBarsComponentGenerated, _super);
    function SeriesErrorBarsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'errorBars', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesErrorBarsComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        endCaps: [{ type: Input }],
        line: [{ type: Input }],
        value: [{ type: Input }],
        visual: [{ type: Input }],
        xValue: [{ type: Input }],
        yValue: [{ type: Input }]
    };
    return SeriesErrorBarsComponentGenerated;
}(SettingsComponent));
export { SeriesErrorBarsComponentGenerated };
