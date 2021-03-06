import { NgModule } from '@angular/core';
import { DatePickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PopupModule } from '@progress/kendo-angular-popup';
import { CalendarModule } from '../calendar/calendar.module';
import { TemplatesModule } from '../calendar/templates.module';
import { DateInputModule } from '../dateinput/dateinput.module';
import { EventsModule } from '@progress/kendo-angular-common';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { DatePickerCustomMessagesComponent } from './localization/datepicker-custom-messages.component';
import { TOUCH_ENABLED } from '../touch-enabled';
import { touchEnabled } from '../support';
const COMPONENT_DIRECTIVES = [
    DatePickerComponent,
    DatePickerCustomMessagesComponent,
    LocalizedMessagesDirective
];
const COMPONENT_MODULES = [
    DateInputModule,
    CalendarModule,
    IntlModule,
    PopupModule,
    TemplatesModule,
    EventsModule
];
const ɵ0 = touchEnabled;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DatePicker component.
 */
export class DatePickerModule {
}
DatePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES, TemplatesModule],
                imports: [CommonModule, ...COMPONENT_MODULES],
                providers: [{ provide: TOUCH_ENABLED, useValue: ɵ0 }]
            },] },
];
export { ɵ0 };
