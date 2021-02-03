"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var labels_component_generated_1 = require("../value-axis-item/labels.component.generated");
/**
 * The axis labels configuration.
 */
var ValueAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisLabelsComponent, _super);
    // Place custom properties here
    function ValueAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return ValueAxisLabelsComponent;
}(labels_component_generated_1.ValueAxisLabelsComponentGenerated));
exports.ValueAxisLabelsComponent = ValueAxisLabelsComponent;
