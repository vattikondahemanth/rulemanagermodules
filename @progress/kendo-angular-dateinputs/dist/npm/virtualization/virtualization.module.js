"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var virtualization_component_1 = require("../virtualization/virtualization.component");
var COMPONENT_DIRECTIVES = [
    virtualization_component_1.VirtualizationComponent
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
        { type: core_1.NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    imports: [common_1.CommonModule]
                },] },
    ];
    return VirtualizationModule;
}());
exports.VirtualizationModule = VirtualizationModule;
