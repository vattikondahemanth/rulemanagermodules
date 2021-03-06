import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-footer-template)).
 * Enables you to customize the footer cell of the column.
 */
var FooterTemplateDirective = /** @class */ (function () {
    function FooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoExcelExportFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    FooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FooterTemplateDirective;
}());
export { FooterTemplateDirective };
