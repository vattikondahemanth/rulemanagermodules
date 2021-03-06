import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntlModule } from '@progress/kendo-angular-intl';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TimeListComponent } from './timelist.component';
import { TimePickerComponent } from './timepicker.component';
import { TimeSelectorComponent } from './timeselector.component';
import { VirtualizationModule } from '../virtualization/virtualization.module';
import { DOMService } from './services/dom.service';
import { HoursService } from './services/hours.service';
import { MinutesService } from './services/minutes.service';
import { SecondsService } from './services/seconds.service';
import { DayPeriodService } from './services/dayperiod.service';
import { DateInputModule } from '../dateinput/dateinput.module';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { TimePickerCustomMessagesComponent } from './localization/timepicker-custom-messages.component';
import { TimeSelectorLocalizedMessagesDirective } from './localization/timeselector-localized-messages.directive';
import { TimeSelectorCustomMessagesComponent } from './localization/timeselector-custom-messages.component';
import { TOUCH_ENABLED } from '../touch-enabled';
import { touchEnabled } from '../support';
import { EventsModule } from '@progress/kendo-angular-common';
var COMPONENT_DIRECTIVES = [
    LocalizedMessagesDirective,
    TimeListComponent,
    TimePickerCustomMessagesComponent,
    TimePickerComponent,
    TimeSelectorLocalizedMessagesDirective,
    TimeSelectorCustomMessagesComponent,
    TimeSelectorComponent
];
var COMPONENT_MODULES = [
    DateInputModule,
    IntlModule,
    PopupModule,
    VirtualizationModule,
    EventsModule
];
var ɵ0 = touchEnabled;
var providers = [
    DOMService,
    HoursService,
    MinutesService,
    SecondsService,
    DayPeriodService,
    {
        provide: TOUCH_ENABLED,
        useValue: ɵ0
    }
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TimePicker component.
 */
var TimePickerModule = /** @class */ (function () {
    function TimePickerModule() {
    }
    TimePickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [CommonModule].concat(COMPONENT_MODULES),
                    providers: providers
                },] },
    ];
    return TimePickerModule;
}());
export { TimePickerModule };
export { ɵ0 };
