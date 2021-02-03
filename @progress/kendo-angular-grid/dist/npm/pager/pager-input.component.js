/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var pager_element_component_1 = require("./pager-element.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var pager_context_service_1 = require("./pager-context.service");
/**
 * Displays an input element which allows the typing and rendering of page numbers.
 */
var PagerInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerInputComponent, _super);
    function PagerInputComponent(localization, pagerContext, cd) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        return _this;
    }
    /**
     * @hidden
     *
     * @param {string} value
     *
     * @memberOf PagerInputComponent
     */
    PagerInputComponent.prototype.onInputChange = function (value) {
        var page = parseInt(value, 10);
        if (isNaN(page) || page < 1 || page > this.totalPages) {
            page = this.currentPage;
        }
        this.changePage(page - 1);
    };
    Object.defineProperty(PagerInputComponent.prototype, "current", {
        /**
         * @hidden
         */
        get: function () {
            return this.hasPages ? this.currentPage : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInputComponent.prototype, "hasPages", {
        get: function () {
            return this.totalPages !== 0;
        },
        enumerable: true,
        configurable: true
    });
    PagerInputComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-pager-input',
                    template: "\n     <span [ngClass]=\"{'k-pager-input': true, 'k-label': true}\">\n        {{textFor('pagerPage')}}\n        <input [class.k-textbox]=\"true\"\n            [disabled]=\"!hasPages\"\n            [value]=\"current\"\n            #inputPager\n            (change)=\"onInputChange(inputPager.value)\" />\n        {{textFor('pagerOf')}} {{totalPages}}\n     </span>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerInputComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: pager_context_service_1.PagerContextService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    return PagerInputComponent;
}(pager_element_component_1.PagerElementComponent));
exports.PagerInputComponent = PagerInputComponent;
