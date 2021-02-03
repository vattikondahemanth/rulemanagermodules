import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { XAxisItemComponentGenerated } from './x-axis-item.component.generated';
/**
 * The configuration component for an X axis
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
var XAxisItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisItemComponent, _super);
    // Place custom properties here
    function XAxisItemComponent(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService, intl, localeId) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.intl = intl;
        return _this;
    }
    XAxisItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ConfigurationService],
                    selector: 'kendo-chart-x-axis-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: IntlService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return XAxisItemComponent;
}(XAxisItemComponentGenerated));
export { XAxisItemComponent };
