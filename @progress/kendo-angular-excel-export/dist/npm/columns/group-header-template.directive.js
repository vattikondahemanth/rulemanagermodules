"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoExcelExportGroupHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return GroupHeaderTemplateDirective;
}());
exports.GroupHeaderTemplateDirective = GroupHeaderTemplateDirective;
