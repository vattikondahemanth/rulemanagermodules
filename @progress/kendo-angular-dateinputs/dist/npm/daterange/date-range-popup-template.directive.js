"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * A directive which renders the content of the DateRange Popup. To define the cell template, nest an
 * `<ng-template>` tag with the `kendoRangePopupTemplate` directive inside the component tag.
 */
var DateRangePopupTemplateDirective = /** @class */ (function () {
    function DateRangePopupTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DateRangePopupTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoDateRangePopupTemplate]'
                },] },
    ];
    /** @nocollapse */
    DateRangePopupTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef }
    ]; };
    return DateRangePopupTemplateDirective;
}());
exports.DateRangePopupTemplateDirective = DateRangePopupTemplateDirective;
