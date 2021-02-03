/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ViewContainerRef, Input } from '@angular/core';
/**
 * @hidden
 */
export class TemplateContextDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    set templateContext(context) {
        this.removeView();
        if (context.templateRef) {
            this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
        }
    }
    ngOnDestroy() {
        this.removeView();
    }
    removeView() {
        if (this.insertedViewRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
            this.insertedViewRef = undefined;
        }
    }
}
TemplateContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[templateContext]' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TemplateContextDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
TemplateContextDirective.propDecorators = {
    templateContext: [{ type: Input }]
};
