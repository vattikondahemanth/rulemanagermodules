import { NgModule } from '@angular/core';
import { DateInputComponent } from './dateinput.component';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { DateInputCustomMessagesComponent } from './localization/dateinput-custom-messages.component';
import { EventsModule } from '@progress/kendo-angular-common';
const COMPONENT_DIRECTIVES = [
    DateInputComponent,
    DateInputCustomMessagesComponent,
    LocalizedMessagesDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DateInput component.
 */
export class DateInputModule {
}
DateInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES],
                imports: [CommonModule, IntlModule, EventsModule]
            },] },
];
