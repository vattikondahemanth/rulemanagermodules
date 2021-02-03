import { Directive, TemplateRef } from '@angular/core';
/**
 * Used for rendering the cell content of the Calendar. To define the cell template, nest an `<ng-template>` tag
 * with the `kendoCalendarCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details
 * about the current cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * > `kendoCalendarCellTemplate` is equivalent to
 * > [`kendoCalendarMonthCellTemplate`]({% slug api_dateinputs_monthcelltemplatedirective %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarCellTemplate let-date>
 *      <span class="custom">{{date.getDate()}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * class AppComponent { }
 * ```
 */
var CellTemplateDirective = /** @class */ (function () {
    function CellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    CellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return CellTemplateDirective;
}());
export { CellTemplateDirective };