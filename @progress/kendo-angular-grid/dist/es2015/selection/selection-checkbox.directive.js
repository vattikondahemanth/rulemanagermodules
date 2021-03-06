/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-input-rename */
import { Directive, HostBinding, ElementRef, Input, Renderer2 } from '@angular/core';
import { SelectionService } from './selection.service';
/**
 * Represents the row-selection checkbox of the Grid. The directive expects the
 * index of the current row as an input parameter. Inside the
 * [`CheckboxColumnComponent`]({% slug api_grid_checkboxcolumncomponent %}), apply the
 * directive to an `input` element. When the user clicks the checkbox that is associated
 * with the directive, a [`selectionChange`]({% slug api_grid_gridcomponent %}#toc-selectionChange)
 * event is triggered.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-checkbox-column title="Custom checkbox">
 *     <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *       <input [kendoGridSelectionCheckbox]="idx" />
 *     </ng-template>
 *   </kendo-grid-checkbox-column>
 * </kendo-grid>
 * ```
 */
export class SelectionCheckboxDirective {
    constructor(selectionService, el, renderer) {
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.type = "checkbox";
        this.destroyClick = this.renderer.listen(this.el.nativeElement, "click", this.onClick.bind(this));
    }
    ngAfterContentChecked() {
        this.setCheckedState();
    }
    ngOnDestroy() {
        if (this.destroyClick) {
            this.destroyClick();
        }
    }
    /**
     * @hidden
     */
    onClick() {
        if (this.selectionService.options.enabled) {
            let ev = this.selectionService.toggleByIndex(this.itemIndex);
            ev.ctrlKey = true;
            ev.shiftKey = false;
            this.selectionService.changes.emit(ev);
        }
    }
    /*
     * @hidden
     */
    setCheckedState() {
        this.renderer.setProperty(this.el.nativeElement, "checked", this.selectionService.isSelected(this.itemIndex));
    }
}
SelectionCheckboxDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectionCheckbox]'
            },] },
];
/** @nocollapse */
SelectionCheckboxDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef },
    { type: Renderer2 }
];
SelectionCheckboxDirective.propDecorators = {
    itemIndex: [{ type: Input, args: ["kendoGridSelectionCheckbox",] }],
    type: [{ type: HostBinding, args: ['attr.type',] }]
};
