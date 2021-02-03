import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    decrement: [{ type: Input }],
    increment: [{ type: Input }]
};
