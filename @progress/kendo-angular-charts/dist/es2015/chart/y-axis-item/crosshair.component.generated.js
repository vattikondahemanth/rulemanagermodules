import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class YAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};
