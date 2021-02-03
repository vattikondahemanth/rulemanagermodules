import { Directive, TemplateRef } from '@angular/core';
/**
 * Used for rendering the year cell content of the Calendar. To define the year cell template, nest an
 * `<ng-template>` tag with the `kendoCalendarYearCellTemplate` directive inside the component tag.
 * The template context is set to the current component. To get a reference to the current date, use
 * the `let-date` directive. To provide more details about the current year cell, get a reference to the
 * current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar [activeView]="activeView">
 *    <ng-template kendoCalendarYearCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * class AppComponent {
 *  public activeView: CalendarView = 'year';
 * }
 * ```
 */
var YearCellTemplateDirective = /** @class */ (function () {
    function YearCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    YearCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarYearCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    YearCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return YearCellTemplateDirective;
}());
export { YearCellTemplateDirective };