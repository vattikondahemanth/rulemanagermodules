import { Directive, Optional, TemplateRef } from '@angular/core';
var PDFTemplateDirective = /** @class */ (function () {
    function PDFTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PDFTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPDFTemplate]'
                },] },
    ];
    /** @nocollapse */
    PDFTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PDFTemplateDirective;
}());
export { PDFTemplateDirective };
