"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var date_range_popup_component_1 = require("./date-range-popup.component");
var date_range_service_1 = require("./date-range.service");
/**
 * Represents the Kendo UI DateRange component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-daterange>
 *      <kendo-dateinput kendoDateRangeStartInput [(value)]="dateRange.start"></kendo-dateinput>
 *      <kendo-dateinput kendoDateRangeEndInput [(value)]="dateRange.end"></kendo-dateinput>
 *  </kendo-daterange>
 * `
 * })
 * class AppComponent {
 *   public dateRange: any = { start: null, end: null };
 * }
 * ```
 */
var DateRangeComponent = /** @class */ (function () {
    function DateRangeComponent() {
        /**
         * @hidden
         */
        this.showDefault = false;
    }
    Object.defineProperty(DateRangeComponent.prototype, "hasContentPopup", {
        get: function () {
            return this.contentPopup.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    DateRangeComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.showDefault = !this.hasContentPopup;
        this.subscription = this.contentPopup.changes.subscribe(function () {
            _this.showDefault = !_this.hasContentPopup;
        });
    };
    DateRangeComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DateRangeComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [date_range_service_1.DateRangeService],
                    selector: 'kendo-daterange',
                    template: "\n        <ng-content></ng-content>\n        <kendo-daterange-popup *ngIf=\"showDefault\"></kendo-daterange-popup>\n    "
                },] },
    ];
    DateRangeComponent.propDecorators = {
        contentPopup: [{ type: core_1.ContentChildren, args: [date_range_popup_component_1.DateRangePopupComponent,] }]
    };
    return DateRangeComponent;
}());
exports.DateRangeComponent = DateRangeComponent;
