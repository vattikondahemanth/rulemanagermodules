/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * Custom component messages override default component messages.
 */
var SliderCustomMessagesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SliderCustomMessagesComponent, _super);
    function SliderCustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(SliderCustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SliderCustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return SliderCustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-slider-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SliderCustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return SliderCustomMessagesComponent;
}(Messages));
export { SliderCustomMessagesComponent };
