import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class YAxisCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};
