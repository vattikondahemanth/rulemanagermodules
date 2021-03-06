"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoExcelExportFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    FooterTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return FooterTemplateDirective;
}());
exports.FooterTemplateDirective = FooterTemplateDirective;
