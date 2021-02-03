"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var settings_component_1 = require("../../common/settings.component");
/**
 * @hidden
 */
var CategoryAxisTitleComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisTitleComponentGenerated, _super);
    function CategoryAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisTitleComponentGenerated.propDecorators = {
        background: [{ type: core_1.Input }],
        border: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        font: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        padding: [{ type: core_1.Input }],
        position: [{ type: core_1.Input }],
        rotation: [{ type: core_1.Input }],
        text: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        visual: [{ type: core_1.Input }]
    };
    return CategoryAxisTitleComponentGenerated;
}(settings_component_1.SettingsComponent));
exports.CategoryAxisTitleComponentGenerated = CategoryAxisTitleComponentGenerated;
