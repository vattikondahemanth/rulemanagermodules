"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var group_header_template_directive_1 = require("./group-header-template.directive");
var group_footer_template_directive_1 = require("./group-footer-template.directive");
var footer_template_directive_1 = require("./footer-template.directive");
var column_base_1 = require("./column-base");
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
var ColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        return _super.call(this, parent) || this;
    }
    ColumnComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: column_base_1.ColumnBase,
                            useExisting: core_1.forwardRef(function () { return ColumnComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-excelexport-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional }] }
    ]; };
    ColumnComponent.propDecorators = {
        field: [{ type: core_1.Input }],
        cellOptions: [{ type: core_1.Input }],
        groupHeaderCellOptions: [{ type: core_1.Input }],
        groupFooterCellOptions: [{ type: core_1.Input }],
        footerCellOptions: [{ type: core_1.Input }],
        groupHeaderTemplate: [{ type: core_1.ContentChild, args: [group_header_template_directive_1.GroupHeaderTemplateDirective,] }],
        groupFooterTemplate: [{ type: core_1.ContentChild, args: [group_footer_template_directive_1.GroupFooterTemplateDirective,] }],
        footerTemplate: [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] }]
    };
    return ColumnComponent;
}(column_base_1.ColumnBase));
exports.ColumnComponent = ColumnComponent;
