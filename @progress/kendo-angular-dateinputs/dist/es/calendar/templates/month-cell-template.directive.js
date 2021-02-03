import { Directive, TemplateRef } from '@angular/core';
/**
 * Used for rendering the month cell content of the Calendar. To define the month cell template, nest an `<ng-template>` tag
 * with the `kendoCalendarMonthCellTemplate` directive inside the component tag. The template context is set to the current
 * component. To get a reference to the current date, use the `let-date` directive. To provide more details about the current
 * month cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
 *
 * For more examples, refer to the article on [templates]({% slug templates_calendar %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * styles: ['.custom { color: red; }'],
 * template: `
 *  <kendo-calendar>
 *    <ng-template kendoCalendarMonthCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * class AppComponent { }
 * ```
 */
var MonthCellTemplateDirective = /** @class */ (function () {
    function MonthCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    MonthCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarMonthCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    MonthCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return MonthCellTemplateDirective;
}());
export { MonthCellTemplateDirective };
