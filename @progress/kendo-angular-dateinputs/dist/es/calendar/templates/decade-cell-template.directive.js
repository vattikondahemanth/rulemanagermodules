import { Directive, TemplateRef } from '@angular/core';
/**
 * Used for rendering the decade cell content of the Calendar. To define the decade cell template, nest an `<ng-template>`
 * tag with the `kendoCalendarDecadeCellTemplate` directive inside the component tag. The template context is set to the
 * current component. To get a reference to the current date, use the `let-date` directive. To provide more details about
 * the current decade cell, get a reference to the current `cellContext` by using the `let-cellContext` directive.
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
 *    <ng-template kendoCalendarDecadeCellTemplate let-context="cellContext">
 *      <span class="custom">{{context.formattedValue}}</span>
 *    </ng-template>
 *  </kendo-calendar>
 * `
 * })
 * class AppComponent {
 *  public activeView: CalendarView = 'decade';
 * }
 * ```
 */
var DecadeCellTemplateDirective = /** @class */ (function () {
    function DecadeCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DecadeCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoCalendarDecadeCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    DecadeCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return DecadeCellTemplateDirective;
}());
export { DecadeCellTemplateDirective };
