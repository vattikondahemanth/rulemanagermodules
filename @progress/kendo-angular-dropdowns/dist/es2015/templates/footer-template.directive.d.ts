/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
/**
 * Renders the footer content of the list. To define the footer template, nest an `<ng-template>` tag
 * with the `kendo<ComponentName>FooterTemplate` directive inside the component tag.
 *
 * - [Using `FooterTemplate` with the AutoComplete]({% slug templates_autocomplete %}#toc-footer-template)
 * - [Using `FooterTemplate` with the ComboBox]({% slug templates_combobox %}#toc-footer-template)
 * - [Using `FooterTemplate` with the DropDownList]({% slug templates_ddl %}#toc-footer-template)
 * - [Using `FooterTemplate` with the MultiSelect]({% slug templates_multiselect %}#toc-footer-template)
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <ng-template kendoComboBoxFooterTemplate>
 *      <h4>Footer template</h4>
 *    </ng-template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export declare class FooterTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
