import { Component, forwardRef, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
export class ColumnGroupComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
}
ColumnGroupComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnGroupComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column-group',
                template: ``
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
