/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var slider_component_1 = require("./slider/slider.component");
var slider_ticks_component_1 = require("./slider/slider-ticks.component");
var label_template_directive_1 = require("./slider/label-template.directive");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var localized_messages_directive_1 = require("./slider/localization/localized-messages.directive");
var custom_messages_component_1 = require("./slider/localization/custom-messages.component");
var COMPONENT_DIRECTIVES = [
    slider_component_1.SliderComponent,
    slider_ticks_component_1.SliderTicksComponent,
    custom_messages_component_1.SliderCustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective,
    label_template_directive_1.LabelTemplateDirective
];
var COMPONENT_EXPORTS = [
    slider_component_1.SliderComponent,
    custom_messages_component_1.SliderCustomMessagesComponent,
    localized_messages_directive_1.LocalizedMessagesDirective,
    label_template_directive_1.LabelTemplateDirective
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
        { type: core_1.NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES,
                    exports: COMPONENT_EXPORTS,
                    imports: [common_1.CommonModule, kendo_angular_common_1.DraggableModule, kendo_angular_common_1.EventsModule, kendo_angular_common_1.ResizeSensorModule]
                },] },
    ];
    return SliderModule;
}());
exports.SliderModule = SliderModule;
