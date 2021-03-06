"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var messages_1 = require("./messages");
/**
 * @hidden
 */
var TimeSelectorLocalizedMessagesDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TimeSelectorLocalizedMessagesDirective, _super);
    function TimeSelectorLocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    TimeSelectorLocalizedMessagesDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [
                        {
                            provide: messages_1.Messages,
                            useExisting: core_1.forwardRef(function () { return TimeSelectorLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoTimeSelectorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    TimeSelectorLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return TimeSelectorLocalizedMessagesDirective;
}(messages_1.Messages));
exports.TimeSelectorLocalizedMessagesDirective = TimeSelectorLocalizedMessagesDirective;
