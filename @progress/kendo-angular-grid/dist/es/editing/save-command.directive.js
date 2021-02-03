/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, HostListener, HostBinding, Inject, ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
/**
 * Represents the `save` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`save`]({% slug api_grid_gridcomponent %}#toc-save) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with `kendoGridSaveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridSaveCommand>Save changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridSaveCommand>{{isNew ? 'Add' : 'Update'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
var SaveCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SaveCommandDirective, _super);
    function SaveCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(SaveCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SaveCommandDirective.prototype.click = function (e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.save(this.rowIndex);
        }
    };
    SaveCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    SaveCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSaveCommand]'
                },] },
    ];
    /** @nocollapse */
    SaveCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    SaveCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-save-command',] }],
        click: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return SaveCommandDirective;
}(Button));
export { SaveCommandDirective };
