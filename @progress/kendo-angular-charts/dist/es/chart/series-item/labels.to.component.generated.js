import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesLabelsToComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsToComponentGenerated, _super);
    function SeriesLabelsToComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels.to', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesLabelsToComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        margin: [{ type: Input }],
        padding: [{ type: Input }],
        position: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesLabelsToComponentGenerated;
}(SettingsComponent));
export { SeriesLabelsToComponentGenerated };
