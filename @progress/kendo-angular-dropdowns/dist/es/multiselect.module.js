/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { MultiSelectComponent } from './multiselect.component';
import { TagListComponent } from './taglist.component';
import { TagTemplateDirective } from './templates/tag-template.directive';
import { CustomItemTemplateDirective } from './templates/custom-item-template.directive';
import { GroupTagTemplateDirective } from './templates/group-tag-template.directive';
import { SummaryTagDirective } from './summary-tag.directive';
import { SharedModule } from './shared.module';
import { SharedDirectivesModule } from './shared-directives.module';
import { TOUCH_ENABLED } from './touch-enabled';
import { touchEnabled } from './support';
var MULTISELECT_DIRECTIVES = [
    MultiSelectComponent,
    TagListComponent,
    TagTemplateDirective,
    GroupTagTemplateDirective,
    SummaryTagDirective,
    CustomItemTemplateDirective
];
var ɵ0 = touchEnabled;
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
        { type: NgModule, args: [{
                    declarations: [MULTISELECT_DIRECTIVES],
                    exports: [MULTISELECT_DIRECTIVES, SharedDirectivesModule],
                    imports: [SharedModule],
                    providers: [{ provide: TOUCH_ENABLED, useValue: ɵ0 }]
                },] },
    ];
    return MultiSelectModule;
}());
export { MultiSelectModule };
export { ɵ0 };
