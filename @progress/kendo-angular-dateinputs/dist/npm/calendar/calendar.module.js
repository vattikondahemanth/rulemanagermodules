"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var calendar_common_module_1 = require("./calendar-common.module");
var templates_module_1 = require("./templates.module");
var calendar_component_1 = require("./calendar.component");
var navigation_component_1 = require("./navigation.component");
var view_list_component_1 = require("./view-list.component");
var dom_service_1 = require("./services/dom.service");
var century_view_service_1 = require("./services/century-view.service");
var decade_view_service_1 = require("./services/decade-view.service");
var month_view_service_1 = require("./services/month-view.service");
var year_view_service_1 = require("./services/year-view.service");
var weeknames_service_1 = require("./services/weeknames.service");
var localized_messages_directive_1 = require("./localization/localized-messages.directive");
var calendar_custom_messages_component_1 = require("./localization/calendar-custom-messages.component");
var virtualization_module_1 = require("../virtualization/virtualization.module");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var COMPONENT_DIRECTIVES = [
    calendar_component_1.CalendarComponent,
    navigation_component_1.NavigationComponent,
    calendar_custom_messages_component_1.CalendarCustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective,
    view_list_component_1.ViewListComponent
];
var CALENDAR_PROVIDERS = [
    dom_service_1.DOMService,
    century_view_service_1.CenturyViewService,
    decade_view_service_1.DecadeViewService,
    month_view_service_1.MonthViewService,
    year_view_service_1.YearViewService,
    weeknames_service_1.WeekNamesService
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `CellTemplateDirective`&mdash;The month cell template directive.
 * - `MonthCellTemplateDirective`&mdash;The month cell template directive.
 * - `YearCellTemplateDirective`&mdash;The year cell template directive.
 * - `DecadeCellTemplateDirective`&mdash;The decade cell template directive.
 * - `CenturyCellTemplateDirective`&mdash;The century cell template directive.
 * - `WeekNumberCellTemplateDirective`&mdash;The month week number cell template directive.
 * - `HeaderTitleTemplateDirective`&mdash;The header title template directive.
 * - `NavigationItemTemplateDirective`&mdash;The navigation item template directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Calendar module
 * import { CalendarModule } from '@progress/kendo-angular-dateinputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, CalendarModule], // import Calendar module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES, calendar_common_module_1.CalendarCommonModule, templates_module_1.TemplatesModule],
                    imports: [common_1.CommonModule, calendar_common_module_1.CalendarCommonModule, kendo_angular_intl_1.IntlModule, templates_module_1.TemplatesModule, virtualization_module_1.VirtualizationModule, kendo_angular_common_1.EventsModule],
                    providers: CALENDAR_PROVIDERS
                },] },
    ];
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
