import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { ConfigurationService } from '../../common/configuration.service';
import { PrefixConfigurationService, PREFIX } from '../../common/prefix-configuration.service';
import { CategoryAxisItemComponent } from '../../chart/category-axis-item.component';
/**
 * The configuration component of the navigator category axis.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-stockchart>
 *   <kendo-chart-navigator>
 *     <kendo-chart-navigator-category-axis
 *       color="maroon"
 *       [labels]="{color: 'green'}">
 *     </kendo-chart-navigator-category-axis>
 *   </kendo-chart-navigator>
 * </kendo-stockchart>
 * ```
 */
var NavigatorCategoryAxisComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NavigatorCategoryAxisComponent, _super);
    function NavigatorCategoryAxisComponent(configurationService, intl, localeId) {
        var _this = _super.call(this, configurationService, null, intl, localeId) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [{
                            provide: PREFIX,
                            useValue: 'navigator.categoryAxis'
                        }, {
                            provide: ConfigurationService,
                            useClass: PrefixConfigurationService
                        }],
                    selector: 'kendo-chart-navigator-category-axis',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: IntlService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return NavigatorCategoryAxisComponent;
}(CategoryAxisItemComponent));
export { NavigatorCategoryAxisComponent };
