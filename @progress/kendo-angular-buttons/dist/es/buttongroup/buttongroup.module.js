import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { ButtonGroupComponent } from './buttongroup.component';
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ButtonGroupComponent`&mdash;The ButtonGroupComponent component class.
 */
var ButtonGroupModule = /** @class */ (function () {
    function ButtonGroupModule() {
    }
    ButtonGroupModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ButtonGroupComponent],
                    exports: [ButtonGroupComponent],
                    imports: [CommonModule, ButtonModule]
                },] },
    ];
    return ButtonGroupModule;
}());
export { ButtonGroupModule };
