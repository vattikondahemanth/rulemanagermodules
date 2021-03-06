import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisNotesComponentGenerated } from '../y-axis-item/notes.component.generated';
/**
 * The configuration of the Y axis notes
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
export class YAxisNotesComponent extends YAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
YAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
