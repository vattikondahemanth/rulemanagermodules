import * as tslib_1 from "tslib";
import { Component, forwardRef, SkipSelf, Host, Optional } from '@angular/core';
import { ColumnBase } from './column-base';
/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
var ColumnGroupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        return _this;
    }
    ColumnGroupComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnGroupComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-excelexport-column-group',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnGroupComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    return ColumnGroupComponent;
}(ColumnBase));
export { ColumnGroupComponent };
