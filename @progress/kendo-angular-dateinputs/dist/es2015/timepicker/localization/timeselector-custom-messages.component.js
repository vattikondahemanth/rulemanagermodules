import { Component, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 *
 * Custom component messages override default component messages.
 */
export class TimeSelectorCustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
TimeSelectorCustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => TimeSelectorCustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-timeselector-messages',
                template: ``
            },] },
];
/** @nocollapse */
TimeSelectorCustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];
