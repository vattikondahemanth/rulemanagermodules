/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
/**
 * Represents the component for selecting columns in the Grid that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-chooser` component.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-chooser [service]="service">
 *              </kendo-grid-columnmenu-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 * {% endmeta %}
 */
export declare class ColumnMenuChooserComponent extends ColumnMenuItemBase {
    localization: LocalizationService;
    private columnInfoService;
    private changeDetector;
    /**
     * Fires when the content is expanded.
     */
    expand: EventEmitter<any>;
    /**
     * Fires when the content is collapsed.
     */
    collapse: EventEmitter<any>;
    /**
     * Specifies if the content is expanded.
     */
    expanded: boolean;
    /**
     * @hidden
     */
    actionsClass: string;
    readonly columns: any;
    constructor(localization: LocalizationService, columnInfoService: ColumnInfoService, changeDetector: ChangeDetectorRef);
    /**
     * @hidden
     */
    onApply(changed: any[]): void;
}
