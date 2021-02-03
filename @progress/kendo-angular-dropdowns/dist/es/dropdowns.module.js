/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { AutoCompleteModule } from './autocomplete.module';
import { ComboBoxModule } from './combobox.module';
import { DropDownListModule } from './dropdownlist.module';
import { MultiSelectModule } from './multiselect.module';
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Dropdowns components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Dropdowns module
 * import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
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
 *     declarations: [AppComponent], // declare the app component
 *     imports:      [BrowserModule, DropDownsModule], // import the Dropdowns module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var DropDownsModule = /** @class */ (function () {
    function DropDownsModule() {
    }
    DropDownsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [AutoCompleteModule, ComboBoxModule, DropDownListModule, MultiSelectModule]
                },] },
    ];
    return DropDownsModule;
}());
export { DropDownsModule };
