import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group header cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-template)).
 * Enables you to customize the content of the group header item.
 */
var GroupHeaderTemplateDirective = /** @class */ (function () {
    function GroupHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoExcelExportGroupHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupHeaderTemplateDirective;
}());
export { GroupHeaderTemplateDirective };
