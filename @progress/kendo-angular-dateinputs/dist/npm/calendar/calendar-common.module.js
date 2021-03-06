"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var for_directive_1 = require("./for.directive");
var header_component_1 = require("./header.component");
var view_component_1 = require("./view.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var COMPONENT_DIRECTIVES = [
    for_directive_1.KForOf,
    header_component_1.HeaderComponent,
    view_component_1.ViewComponent
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `HeaderComponent`&mdash;The component that renders the UI for vertical navigation.
 * - `ViewComponent`&mdash;The component that renders the active Calendar view.
 */
var CalendarCommonModule = /** @class */ (function () {
    function CalendarCommonModule() {
    }
    CalendarCommonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [common_1.CommonModule, kendo_angular_common_1.EventsModule]
                },] },
    ];
    return CalendarCommonModule;
}());
exports.CalendarCommonModule = CalendarCommonModule;
