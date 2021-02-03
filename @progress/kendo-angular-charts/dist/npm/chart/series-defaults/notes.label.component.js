"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var notes_label_component_generated_1 = require("../series-defaults/notes.label.component.generated");
/**
 * The label of the notes.
 */
var SeriesDefaultsNotesLabelComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesLabelComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesLabelComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesLabelComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesDefaultsNotesLabelComponent;
}(notes_label_component_generated_1.SeriesDefaultsNotesLabelComponentGenerated));
exports.SeriesDefaultsNotesLabelComponent = SeriesDefaultsNotesLabelComponent;
