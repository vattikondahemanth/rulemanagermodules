import { Directive, forwardRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Messages } from './messages';
/**
 * @hidden
 */
export class TimeSelectorLocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
TimeSelectorLocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => TimeSelectorLocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: '[kendoTimeSelectorLocalizedMessages]'
            },] },
];
/** @nocollapse */
TimeSelectorLocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];
