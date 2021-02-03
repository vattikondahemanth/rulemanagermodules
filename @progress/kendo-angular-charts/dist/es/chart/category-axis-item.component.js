import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { CategoryAxisItemComponentGenerated } from './category-axis-item.component.generated';
/**
 * The configuration component for a category axis ([see example]({% slug axes_chart_charts %})).
 */
var CategoryAxisItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisItemComponent, _super);
    function CategoryAxisItemComponent(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService, intl, localeId) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    CategoryAxisItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ConfigurationService],
                    selector: 'kendo-chart-category-axis-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: IntlService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return CategoryAxisItemComponent;
}(CategoryAxisItemComponentGenerated));
export { CategoryAxisItemComponent };
