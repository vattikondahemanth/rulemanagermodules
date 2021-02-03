"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var configuration_service_1 = require("../../../common/configuration.service");
var labels_component_1 = require("../../../chart/category-axis-item/labels.component");
/**
 * The configuration of the axis labels.
 */
var NavigatorCategoryAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisLabelsComponent, _super);
    function NavigatorCategoryAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisLabelsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisLabelsComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService }
    ]; };
    return NavigatorCategoryAxisLabelsComponent;
}(labels_component_1.CategoryAxisLabelsComponent));
exports.NavigatorCategoryAxisLabelsComponent = NavigatorCategoryAxisLabelsComponent;
