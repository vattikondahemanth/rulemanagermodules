import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
export class CategoryAxisNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};
