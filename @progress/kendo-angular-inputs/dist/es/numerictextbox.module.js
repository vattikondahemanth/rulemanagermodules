/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { NumericTextBoxComponent } from './numerictextbox/numerictextbox.component';
import { CommonModule } from '@angular/common';
import { LocalizedMessagesDirective } from './numerictextbox/localization/localized-messages.directive';
import { NumericTextBoxCustomMessagesComponent } from './numerictextbox/localization/custom-messages.component';
import { EventsModule } from '@progress/kendo-angular-common';
var COMPONENT_EXPORTS = [
    NumericTextBoxComponent,
    NumericTextBoxCustomMessagesComponent
];
var COMPONENT_DIRECTIVES = [
    LocalizedMessagesDirective
].concat(COMPONENT_EXPORTS);
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the NumericTextBox component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the NumericTextBox module
 * import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
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
 *     imports:      [BrowserModule, NumericTextBoxModule], // import NumericTextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var NumericTextBoxModule = /** @class */ (function () {
    function NumericTextBoxModule() {
    }
    NumericTextBoxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_EXPORTS],
                    imports: [CommonModule, EventsModule]
                },] },
    ];
    return NumericTextBoxModule;
}());
export { NumericTextBoxModule };
