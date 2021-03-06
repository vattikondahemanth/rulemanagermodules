/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var textbox_directive_1 = require("./textbox/textbox.directive");
var textarea_directive_1 = require("./textbox/textarea.directive");
var textbox_container_component_1 = require("./textbox/textbox-container.component");
var common_1 = require("@angular/common");
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TextBox directive.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TextBox module
 * import { TextBoxModule } from '@progress/kendo-angular-inputs';
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
 *     imports:      [BrowserModule, TextBoxModule], // import TextBox module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var TextBoxModule = /** @class */ (function () {
    function TextBoxModule() {
    }
    TextBoxModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [textbox_directive_1.TextBoxDirective, textarea_directive_1.TextAreaDirective, textbox_container_component_1.TextBoxContainerComponent],
                    exports: [textbox_directive_1.TextBoxDirective, textarea_directive_1.TextAreaDirective, textbox_container_component_1.TextBoxContainerComponent],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return TextBoxModule;
}());
exports.TextBoxModule = TextBoxModule;
