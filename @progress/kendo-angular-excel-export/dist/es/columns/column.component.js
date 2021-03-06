import * as tslib_1 from "tslib";
import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { GroupHeaderTemplateDirective } from './group-header-template.directive';
import { GroupFooterTemplateDirective } from './group-footer-template.directive';
import { FooterTemplateDirective } from './footer-template.directive';
import { ColumnBase } from './column-base';
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
var ColumnComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        return _super.call(this, parent) || this;
    }
    ColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-excelexport-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    ColumnComponent.propDecorators = {
        field: [{ type: Input }],
        cellOptions: [{ type: Input }],
        groupHeaderCellOptions: [{ type: Input }],
        groupFooterCellOptions: [{ type: Input }],
        footerCellOptions: [{ type: Input }],
        groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }],
        groupFooterTemplate: [{ type: ContentChild, args: [GroupFooterTemplateDirective,] }],
        footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }]
    };
    return ColumnComponent;
}(ColumnBase));
export { ColumnComponent };
