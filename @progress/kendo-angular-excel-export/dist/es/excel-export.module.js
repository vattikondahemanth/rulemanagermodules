import { NgModule } from '@angular/core';
import { ExcelExportComponent } from './excel-export.component';
import { ColumnComponent } from './columns/column.component';
import { ColumnGroupComponent } from './columns/column-group.component';
import { FooterTemplateDirective } from './columns/footer-template.directive';
import { GroupFooterTemplateDirective } from './columns/group-footer-template.directive';
import { GroupHeaderTemplateDirective } from './columns/group-header-template.directive';
var declarations = [
    ExcelExportComponent,
    ColumnComponent,
    ColumnGroupComponent,
    FooterTemplateDirective,
    GroupFooterTemplateDirective,
    GroupHeaderTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Excel Export component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ExcelExportModule module
 * import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
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
 *     imports:      [BrowserModule, ExcelExportModule], // import ExcelExportModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ExcelExportModule = /** @class */ (function () {
    function ExcelExportModule() {
    }
    ExcelExportModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations],
                    exports: [declarations]
                },] },
    ];
    return ExcelExportModule;
}());
export { ExcelExportModule };
