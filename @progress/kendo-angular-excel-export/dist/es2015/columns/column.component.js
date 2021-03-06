import { forwardRef, Component, Input, ContentChild, SkipSelf, Host, Optional } from '@angular/core';
import { GroupHeaderTemplateDirective } from './group-header-template.directive';
import { GroupFooterTemplateDirective } from './group-footer-template.directive';
import { FooterTemplateDirective } from './footer-template.directive';
import { ColumnBase } from './column-base';
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
export class ColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
    }
}
ColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column',
                template: ``
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
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
