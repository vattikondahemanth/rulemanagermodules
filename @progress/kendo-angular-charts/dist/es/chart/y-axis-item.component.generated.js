import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { CollectionItemComponent } from '../common/collection-item.component';
/**
 * @hidden
 */
var YAxisItemComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisItemComponentGenerated, _super);
    function YAxisItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    YAxisItemComponentGenerated.propDecorators = {
        axisCrossingValue: [{ type: Input }],
        background: [{ type: Input }],
        baseUnit: [{ type: Input }],
        color: [{ type: Input }],
        line: [{ type: Input }],
        majorGridLines: [{ type: Input }],
        majorTicks: [{ type: Input }],
        majorUnit: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        minorGridLines: [{ type: Input }],
        minorTicks: [{ type: Input }],
        minorUnit: [{ type: Input }],
        name: [{ type: Input }],
        narrowRange: [{ type: Input }],
        pane: [{ type: Input }],
        plotBands: [{ type: Input }],
        reverse: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }],
        crosshair: [{ type: Input }],
        labels: [{ type: Input }],
        notes: [{ type: Input }],
        title: [{ type: Input }]
    };
    return YAxisItemComponentGenerated;
}(CollectionItemComponent));
export { YAxisItemComponentGenerated };
