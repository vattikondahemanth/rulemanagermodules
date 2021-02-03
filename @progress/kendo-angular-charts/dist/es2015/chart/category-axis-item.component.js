import { Component, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { CategoryAxisItemComponentGenerated } from './category-axis-item.component.generated';
/**
 * The configuration component for a category axis ([see example]({% slug axes_chart_charts %})).
 */
export class CategoryAxisItemComponent extends CategoryAxisItemComponentGenerated {
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService, intl, localeId);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
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
CategoryAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: IntlService },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
