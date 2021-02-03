/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnInfoService } from '../common/column-info.service';
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to lock or unlock the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-lock` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-lock [service]="service">
 *              </kendo-grid-columnmenu-lock>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
var ColumnMenuLockComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuLockComponent, _super);
    function ColumnMenuLockComponent(localization, columnInfoService, changeDetector) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.columnInfoService = columnInfoService;
        _this.changeDetector = changeDetector;
        return _this;
    }
    Object.defineProperty(ColumnMenuLockComponent.prototype, "text", {
        get: function () {
            return this.localization.get(this.locked ? 'unlock' : 'lock');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuLockComponent.prototype, "icon", {
        get: function () {
            return this.locked ? 'unlock' : 'lock';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuLockComponent.prototype, "disabled", {
        get: function () {
            return !this.locked && this.columnInfoService.unlockedRootCount < 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuLockComponent.prototype.toggleColumn = function () {
        this.toggleHierarchy(!this.locked);
        this.close();
        this.changeDetector.markForCheck();
    };
    ColumnMenuLockComponent.prototype.toggleHierarchy = function (locked) {
        var root = this.service.column;
        while (root.parent) {
            root = root.parent;
        }
        var columns = [root];
        var allChanged = [];
        while (columns.length) {
            var column = columns.shift();
            column.locked = locked;
            allChanged.push(column);
            if (column.children) {
                columns.push.apply(columns, column.children.toArray().slice(1));
            }
            if (column.childColumns) {
                columns.push.apply(columns, column.childColumns.toArray());
            }
        }
        this.columnInfoService.changeLocked(allChanged);
    };
    Object.defineProperty(ColumnMenuLockComponent.prototype, "locked", {
        get: function () {
            return this.service.column.locked;
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuLockComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-lock',
                    template: "\n       <kendo-grid-columnmenu-item [text]=\"text\" [icon]=\"icon\" (itemClick)=\"toggleColumn()\" [disabled]=\"disabled\">\n       </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuLockComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: ChangeDetectorRef }
    ]; };
    return ColumnMenuLockComponent;
}(ColumnMenuItemBase));
export { ColumnMenuLockComponent };
