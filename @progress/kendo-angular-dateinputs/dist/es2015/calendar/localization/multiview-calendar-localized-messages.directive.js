import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './multiview-calendar-messages';
/**
 * @hidden
 */
export class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoMultiViewCalendarLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
