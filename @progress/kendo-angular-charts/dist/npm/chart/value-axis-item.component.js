"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_service_1 = require("../common/collection.service");
var configuration_service_1 = require("../common/configuration.service");
var value_axis_item_component_generated_1 = require("./value-axis-item.component.generated");
/**
 * The configuration component for a value axis.
 */
var ValueAxisItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisItemComponent, _super);
    // Place custom properties here
    function ValueAxisItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    ValueAxisItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [configuration_service_1.ConfigurationService],
                    selector: 'kendo-chart-value-axis-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisItemComponent.ctorParameters = function () { return [
        { type: configuration_service_1.ConfigurationService },
        { type: collection_service_1.CollectionService }
    ]; };
    return ValueAxisItemComponent;
}(value_axis_item_component_generated_1.ValueAxisItemComponentGenerated));
exports.ValueAxisItemComponent = ValueAxisItemComponent;
