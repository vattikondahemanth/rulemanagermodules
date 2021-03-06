/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional } from '@angular/core';
/**
 * Represents the group-header column template of the Grid which helps to customize the content of the group headers.
 * To define the group header template, nest an `<ng-template>` tag with the `kendoGridGroupHeaderColumnTemplate`
 * directive inside `<kendo-grid-column>`.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `group`&mdash;The current group item.
 * - `field`&mdash;The name of the field by which data is grouped.
 * - `value`&mdash;The current group value.
 * - `aggregates`&mdash;All aggregate values for the current group.
 *
 * @example
 * {% meta height:600 %}
 * {% embed_file grouping/app.component.ts preview %}
 * {% embed_file grouping/app.module.ts %}
 * {% embed_file grouping/main.ts %}
 * {% endmeta %}
 *
 * ```
 */
export class GroupHeaderColumnTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderColumnTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridGroupHeaderColumnTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderColumnTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
