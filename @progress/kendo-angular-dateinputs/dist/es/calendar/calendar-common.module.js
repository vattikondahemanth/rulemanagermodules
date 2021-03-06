import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KForOf } from './for.directive';
import { HeaderComponent } from './header.component';
import { ViewComponent } from './view.component';
import { EventsModule } from '@progress/kendo-angular-common';
var COMPONENT_DIRECTIVES = [
    KForOf,
    HeaderComponent,
    ViewComponent
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
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [CommonModule, EventsModule]
                },] },
    ];
    return CalendarCommonModule;
}());
export { CalendarCommonModule };
