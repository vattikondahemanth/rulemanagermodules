import { Component, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { CollectionService } from '../common/collection.service';
import { ConfigurationService } from '../common/configuration.service';
import { XAxisItemComponentGenerated } from './x-axis-item.component.generated';
/**
 * The configuration component for an X axis
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
export class XAxisItemComponent extends XAxisItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService, intl, localeId);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.intl = intl;
    }
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
XAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: IntlService },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
