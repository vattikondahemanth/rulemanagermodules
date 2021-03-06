"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var calendar_module_1 = require("./calendar.module");
var multiview_calendar_module_1 = require("./multiview-calendar.module");
var COMPONENT_MODULES = [
    calendar_module_1.CalendarModule,
    multiview_calendar_module_1.MultiViewCalendarModule
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `CalendarModule`&mdash;The calendar module.
 * - `MultiViewCalendarModule`&mdash;The multi-view calendar module.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Calendars module
 * import { CalendarsModule } from '@progress/kendo-angular-dateinputs';
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
 *     imports:      [BrowserModule, CalendarsModule], // import the Calendars module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var CalendarsModule = /** @class */ (function () {
    function CalendarsModule() {
    }
    CalendarsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: COMPONENT_MODULES,
                    imports: COMPONENT_MODULES
                },] },
    ];
    return CalendarsModule;
}());
exports.CalendarsModule = CalendarsModule;
