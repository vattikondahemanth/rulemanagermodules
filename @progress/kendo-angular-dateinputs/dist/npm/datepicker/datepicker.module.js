"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var datepicker_component_1 = require("./datepicker.component");
var common_1 = require("@angular/common");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var calendar_module_1 = require("../calendar/calendar.module");
var templates_module_1 = require("../calendar/templates.module");
var dateinput_module_1 = require("../dateinput/dateinput.module");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var datepicker_custom_messages_component_1 = require("./localization/datepicker-custom-messages.component");
var touch_enabled_1 = require("../touch-enabled");
var support_1 = require("../support");
var COMPONENT_DIRECTIVES = [
    datepicker_component_1.DatePickerComponent,
    datepicker_custom_messages_component_1.DatePickerCustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective
];
var COMPONENT_MODULES = [
    dateinput_module_1.DateInputModule,
    calendar_module_1.CalendarModule,
    kendo_angular_intl_1.IntlModule,
    kendo_angular_popup_1.PopupModule,
    templates_module_1.TemplatesModule,
    kendo_angular_common_1.EventsModule
];
var ɵ0 = support_1.touchEnabled;
exports.ɵ0 = ɵ0;
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the DatePicker component.
 */
var DatePickerModule = /** @class */ (function () {
    function DatePickerModule() {
    }
    DatePickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES, templates_module_1.TemplatesModule],
                    imports: [common_1.CommonModule].concat(COMPONENT_MODULES),
                    providers: [{ provide: touch_enabled_1.TOUCH_ENABLED, useValue: ɵ0 }]
                },] },
    ];
    return DatePickerModule;
}());
exports.DatePickerModule = DatePickerModule;
