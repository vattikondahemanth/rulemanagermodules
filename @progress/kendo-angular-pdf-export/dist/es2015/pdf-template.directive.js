import { Directive, Optional, TemplateRef } from '@angular/core';
export class PDFTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PDFTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoPDFTemplate]'
            },] },
];
/** @nocollapse */
PDFTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
