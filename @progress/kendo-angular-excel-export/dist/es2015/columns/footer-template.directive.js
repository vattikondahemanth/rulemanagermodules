import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-footer-template)).
 * Enables you to customize the footer cell of the column.
 */
export class FooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoExcelExportFooterTemplate]'
            },] },
];
/** @nocollapse */
FooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
