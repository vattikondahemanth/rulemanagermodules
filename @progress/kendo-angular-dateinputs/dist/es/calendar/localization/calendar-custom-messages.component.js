import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './calendar-messages';
/**
 * Custom component messages override default component messages ([see example]({% slug globalization_dateinputs %}#toc-custom-messages)).
 */
var CalendarCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CalendarCustomMessagesComponent, _super);
    function CalendarCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CalendarCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CalendarCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CalendarCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-calendar-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CalendarCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CalendarCustomMessagesComponent;
}(Messages));
export { CalendarCustomMessagesComponent };
