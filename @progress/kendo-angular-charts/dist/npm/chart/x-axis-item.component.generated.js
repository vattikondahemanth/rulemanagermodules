"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var collection_item_component_1 = require("../common/collection-item.component");
var property_types_1 = require("../common/property-types");
/**
 * @hidden
 */
var XAxisItemComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisItemComponentGenerated, _super);
    function XAxisItemComponentGenerated(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
        return _this;
    }
    XAxisItemComponentGenerated.propDecorators = {
        axisCrossingValue: [{ type: core_1.Input }],
        background: [{ type: core_1.Input }],
        baseUnit: [{ type: core_1.Input }],
        color: [{ type: core_1.Input }],
        line: [{ type: core_1.Input }],
        majorGridLines: [{ type: core_1.Input }],
        majorTicks: [{ type: core_1.Input }],
        majorUnit: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        minorGridLines: [{ type: core_1.Input }],
        minorTicks: [{ type: core_1.Input }],
        minorUnit: [{ type: core_1.Input }],
        name: [{ type: core_1.Input }],
        narrowRange: [{ type: core_1.Input }],
        pane: [{ type: core_1.Input }],
        plotBands: [{ type: core_1.Input }],
        reverse: [{ type: core_1.Input }],
        startAngle: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        visible: [{ type: core_1.Input }],
        weekStartDay: [{ type: core_1.Input }],
        crosshair: [{ type: core_1.Input }],
        labels: [{ type: core_1.Input }],
        notes: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }]
    };
    return XAxisItemComponentGenerated;
}(collection_item_component_1.CollectionItemComponent));
exports.XAxisItemComponentGenerated = XAxisItemComponentGenerated;
