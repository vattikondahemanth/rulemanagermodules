import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    accept: [{ type: Input }],
    acceptLabel: [{ type: Input }],
    cancel: [{ type: Input }],
    cancelLabel: [{ type: Input }],
    now: [{ type: Input }],
    nowLabel: [{ type: Input }],
    toggle: [{ type: Input }]
};
