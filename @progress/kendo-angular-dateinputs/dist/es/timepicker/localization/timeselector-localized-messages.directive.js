import * as tslib_1 from "tslib";
import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
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
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return TimeSelectorLocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: '[kendoTimeSelectorLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    TimeSelectorLocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimeSelectorLocalizedMessagesDirective;
}(Messages));
export { TimeSelectorLocalizedMessagesDirective };
