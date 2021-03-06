import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var TimePickerCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TimePickerCustomMessagesComponent, _super);
    function TimePickerCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(TimePickerCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TimePickerCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return TimePickerCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-timepicker-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    TimePickerCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return TimePickerCustomMessagesComponent;
}(Messages));
export { TimePickerCustomMessagesComponent };
