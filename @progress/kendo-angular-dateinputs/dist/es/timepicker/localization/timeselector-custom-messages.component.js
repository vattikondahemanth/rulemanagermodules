import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 *
 * Custom component messages override default component messages.
 */
var TimeSelectorCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TimeSelectorCustomMessagesComponent, _super);
    function TimeSelectorCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(TimeSelectorCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TimeSelectorCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return TimeSelectorCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-timeselector-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    TimeSelectorCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimeSelectorCustomMessagesComponent;
}(Messages));
export { TimeSelectorCustomMessagesComponent };
