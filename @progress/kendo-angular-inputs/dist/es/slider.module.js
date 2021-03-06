/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { SliderTicksComponent } from './slider/slider-ticks.component';
import { LabelTemplateDirective } from './slider/label-template.directive';
import { DraggableModule, EventsModule, ResizeSensorModule } from '@progress/kendo-angular-common';
import { LocalizedMessagesDirective } from './slider/localization/localized-messages.directive';
import { SliderCustomMessagesComponent } from './slider/localization/custom-messages.component';
var COMPONENT_DIRECTIVES = [
    SliderComponent,
    SliderTicksComponent,
    SliderCustomMessagesComponent,
    LocalizedMessagesDirective,
    LabelTemplateDirective
];
var COMPONENT_EXPORTS = [
    SliderComponent,
    SliderCustomMessagesComponent,
    LocalizedMessagesDirective,
    LabelTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Slider component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Inputs module
 * import { SliderModule } from '@progress/kendo-angular-inputs';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, BrowserAnimationsModule, SliderModule], // import Slider module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var SliderModule = /** @class */ (function () {
    function SliderModule() {
    }
    SliderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES,
                    exports: COMPONENT_EXPORTS,
                    imports: [CommonModule, DraggableModule, EventsModule, ResizeSensorModule]
                },] },
    ];
    return SliderModule;
}());
export { SliderModule };
