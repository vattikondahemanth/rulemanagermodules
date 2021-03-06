import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var LegendInactiveItemsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(LegendInactiveItemsComponentGenerated, _super);
    function LegendInactiveItemsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend.inactiveItems', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendInactiveItemsComponentGenerated.propDecorators = {
        labels: [{ type: Input }]
    };
    return LegendInactiveItemsComponentGenerated;
}(SettingsComponent));
export { LegendInactiveItemsComponentGenerated };
