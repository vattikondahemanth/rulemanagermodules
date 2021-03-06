import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group header cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-template)).
 * Enables you to customize the content of the group header item.
 */
export class GroupHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoExcelExportGroupHeaderTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
