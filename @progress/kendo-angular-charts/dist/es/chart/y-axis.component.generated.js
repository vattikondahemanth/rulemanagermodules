import * as tslib_1 from "tslib";
import { ContentChildren, QueryList } from '@angular/core';
import { CollectionComponent } from '../common/collection.component';
import { YAxisItemComponent } from './y-axis-item.component';
/**
 * @hidden
 */
var YAxisComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisComponentGenerated, _super);
    function YAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'yAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    YAxisComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [YAxisItemComponent,] }]
    };
    return YAxisComponentGenerated;
}(CollectionComponent));
export { YAxisComponentGenerated };
