import { NgModule } from '@angular/core';
import { PDFExportComponent } from './pdf-export.component';
import { PDFMarginComponent } from './pdf-margin.component';
import { PDFTemplateDirective } from './pdf-template.directive';
var COMPONENT_DIRECTIVES = [
    PDFExportComponent,
    PDFMarginComponent,
    PDFTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the PDF Export directive.
 */
var PDFExportModule = /** @class */ (function () {
    function PDFExportModule() {
    }
    PDFExportModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES]
                },] },
    ];
    return PDFExportModule;
}());
export { PDFExportModule };
