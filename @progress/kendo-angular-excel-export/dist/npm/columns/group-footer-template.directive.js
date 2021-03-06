"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Represents the group footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-footer-template)).
 * Enables you to customize the group footer cell of the column.
 */
var GroupFooterTemplateDirective = /** @class */ (function () {
    function GroupFooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupFooterTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoExcelExportGroupFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupFooterTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return GroupFooterTemplateDirective;
}());
exports.GroupFooterTemplateDirective = GroupFooterTemplateDirective;
