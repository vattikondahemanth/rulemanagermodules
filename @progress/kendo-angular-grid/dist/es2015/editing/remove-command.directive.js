/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding, Inject, ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
/**
 * Represents the `remove` command of the Grid. You can apply this directive to any `button` element
 * inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_grid_gridcomponent %}#toc-remove)
 * is triggered ([see example]({% slug editing_reactive_forms_grid %})).
 *
 * > When the row is in the edit mode, the button with the `kendoGridRemoveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
export class RemoveCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    click(e) {
        e.preventDefault();
        this.editService.remove(this.rowIndex);
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
RemoveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridRemoveCommand]'
            },] },
];
/** @nocollapse */
RemoveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
    { type: ElementRef },
    { type: Renderer },
    { type: LocalizationService },
    { type: NgZone }
];
RemoveCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-remove-command',] }],
    click: [{ type: HostListener, args: ['click', ['$event'],] }]
};
