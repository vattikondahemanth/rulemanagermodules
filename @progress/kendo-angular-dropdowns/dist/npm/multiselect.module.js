/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var multiselect_component_1 = require("./multiselect.component");
var taglist_component_1 = require("./taglist.component");
var tag_template_directive_1 = require("./templates/tag-template.directive");
var custom_item_template_directive_1 = require("./templates/custom-item-template.directive");
var group_tag_template_directive_1 = require("./templates/group-tag-template.directive");
var summary_tag_directive_1 = require("./summary-tag.directive");
var shared_module_1 = require("./shared.module");
var shared_directives_module_1 = require("./shared-directives.module");
var touch_enabled_1 = require("./touch-enabled");
var support_1 = require("./support");
var MULTISELECT_DIRECTIVES = [
    multiselect_component_1.MultiSelectComponent,
    taglist_component_1.TagListComponent,
    tag_template_directive_1.TagTemplateDirective,
    group_tag_template_directive_1.GroupTagTemplateDirective,
    summary_tag_directive_1.SummaryTagDirective,
    custom_item_template_directive_1.CustomItemTemplateDirective
];
var ɵ0 = support_1.touchEnabled;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `MultiSelectComponent`&mdash;The MultiSelect component class.
 * - `SummaryTagDirective`&mdash;The MultiSelect summary tag directive.
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `CustomItemTemplateDirective`&mdash;The custom item template directive.
 * - `TagTemplateDirective`&mdash;The tag template directive.
 * - `SummaryTagTemplateDirective`&mdash;The summary tag template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 * - `NoDataTemplateDirective`&mdash;The no-data template directive.
 */
var MultiSelectModule = /** @class */ (function () {
    function MultiSelectModule() {
    }
    MultiSelectModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [MULTISELECT_DIRECTIVES],
                    exports: [MULTISELECT_DIRECTIVES, shared_directives_module_1.SharedDirectivesModule],
                    imports: [shared_module_1.SharedModule],
                    providers: [{ provide: touch_enabled_1.TOUCH_ENABLED, useValue: ɵ0 }]
                },] },
    ];
    return MultiSelectModule;
}());
exports.MultiSelectModule = MultiSelectModule;
