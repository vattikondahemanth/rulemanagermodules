import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { FocusableDirective } from './../focusable/focusable.directive';
import { ButtonItemTemplateDirective } from './button-item-template.directive';
import { TemplateContextDirective } from './template-context.directive';
var EXPORTED_DIRECTIVES = [
    ListComponent,
    FocusableDirective,
    ButtonItemTemplateDirective,
    TemplateContextDirective
];
/**
 * @hidden
 */
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [EXPORTED_DIRECTIVES],
                    exports: [EXPORTED_DIRECTIVES],
                    imports: [CommonModule]
                },] },
    ];
    return ListModule;
}());
export { ListModule };
