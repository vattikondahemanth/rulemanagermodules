import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var XAxisNotesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisNotesComponentGenerated, _super);
    function XAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return XAxisNotesComponentGenerated;
}(SettingsComponent));
export { XAxisNotesComponentGenerated };
