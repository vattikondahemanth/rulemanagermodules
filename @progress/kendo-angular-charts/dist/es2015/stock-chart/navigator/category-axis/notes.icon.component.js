import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisNotesIconComponent } from '../../../chart/category-axis-item/notes.icon.component';
/**
 * The icon of the notes.
 */
export class NavigatorCategoryAxisNotesIconComponent extends CategoryAxisNotesIconComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
