import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-footer-template)).
 * Enables you to customize the group footer cell of the column.
 */
export class GroupFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupFooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoExcelExportGroupFooterTemplate]'
            },] },
];
/** @nocollapse */
GroupFooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
