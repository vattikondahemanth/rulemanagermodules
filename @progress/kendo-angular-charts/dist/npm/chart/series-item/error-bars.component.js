"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../common/configuration.service");
var error_bars_component_generated_1 = require("../series-item/error-bars.component.generated");
/**
 * The error bars of the Chart series
 * ([see example]({% slug errorbars_chart_charts %})).
 */
var SeriesErrorBarsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesErrorBarsComponent, _super);
    // Place custom properties here
    function SeriesErrorBarsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesErrorBarsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-error-bars',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesErrorBarsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return SeriesErrorBarsComponent;
}(error_bars_component_generated_1.SeriesErrorBarsComponentGenerated));
exports.SeriesErrorBarsComponent = SeriesErrorBarsComponent;
