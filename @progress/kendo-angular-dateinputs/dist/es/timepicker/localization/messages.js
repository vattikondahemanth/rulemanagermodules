import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { ComponentMessages } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Messages;
}(ComponentMessages));
export { Messages };
