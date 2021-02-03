/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
import { Directive, TemplateRef } from '@angular/core';
/**
 * Renders content when no data is available. To define the no-data template, nest a `<ng-template>` tag
 * with the `kendo<ComponentName>NoDataTemplate` directive inside the component tag.
 *
 * - [Using `NoDataTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-no-data-template)
 * - [Using `NoDataTemplate` with the ComboBox]({% slug templates_combobox %}#toc-no-data-template)
 * - [Using `NoDataTemplate` with the DropDownList]({% slug templates_ddl %}#toc-no-data-template)
 * - [Using `NoDataTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-no-data-template)
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <ng-template kendoComboBoxNoDataTemplate>
 *      <h4>No data!</h4>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = [];
 * }
 * ```
 */
export class NoDataTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NoDataTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropDownListNoDataTemplate],[kendoComboBoxNoDataTemplate],[kendoAutoCompleteNoDataTemplate],[kendoMultiSelectNoDataTemplate]'
            },] },
];
/** @nocollapse */
NoDataTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];
