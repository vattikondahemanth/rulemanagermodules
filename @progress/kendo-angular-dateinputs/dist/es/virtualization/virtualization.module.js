import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualizationComponent } from '../virtualization/virtualization.component';
var COMPONENT_DIRECTIVES = [
    VirtualizationComponent
];
/**
 * @hidden
 *
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Virtualization component.
 */
var VirtualizationModule = /** @class */ (function () {
    function VirtualizationModule() {
    }
    VirtualizationModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [CommonModule]
                },] },
    ];
    return VirtualizationModule;
}());
export { VirtualizationModule };
