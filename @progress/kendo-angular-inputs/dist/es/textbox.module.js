/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { TextBoxDirective } from './textbox/textbox.directive';
import { TextAreaDirective } from './textbox/textarea.directive';
import { TextBoxContainerComponent } from './textbox/textbox-container.component';
import { CommonModule } from '@angular/common';
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
        { type: NgModule, args: [{
                    declarations: [TextBoxDirective, TextAreaDirective, TextBoxContainerComponent],
                    exports: [TextBoxDirective, TextAreaDirective, TextBoxContainerComponent],
                    imports: [CommonModule]
                },] },
    ];
    return TextBoxModule;
}());
export { TextBoxModule };
