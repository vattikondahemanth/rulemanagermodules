/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from './pager-context.service';
import { PagerElementComponent } from './pager-element.component';
/**
 * Displays numeric buttons to enable navigation between the pages.
 */
var PagerNumericButtonsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerNumericButtonsComponent, _super);
    function PagerNumericButtonsComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        return _this;
    }
    Object.defineProperty(PagerNumericButtonsComponent.prototype, "buttons", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number[]}
         * @memberOf PagerNumericButtonsComponent
         */
        get: function () {
            var result = [];
            for (var idx = this.start; idx <= this.end; idx++) {
                result.push(idx);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerNumericButtonsComponent.prototype, "end", {
        /**
         * @hidden
         */
        get: function () {
            return Math.min((this.start + this.buttonCount) - 1, this.totalPages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerNumericButtonsComponent.prototype, "start", {
        /**
         * @hidden
         */
        get: function () {
            var page = this.currentPage;
            var buttonCount = this.buttonCount;
            if (page > buttonCount) {
                var reminder = (page % buttonCount);
                return (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PagerNumericButtonsComponent.prototype.pageLabel = function (num) {
        var pageText = this.textFor('pagerPage');
        if (pageText) {
            return pageText + ' ' + num;
        }
        return num.toString();
    };
    PagerNumericButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerNumericButtonsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-numeric-buttons',
                    template: "\n       <ul [ngClass]=\"{'k-pager-numbers': true, 'k-reset': true}\">\n            <li *ngIf=\"start > 1\">\n                <a  class=\"k-link\"\n                    [attr.aria-label]=\"pageLabel(start - 1)\"\n                    href=\"#\"\n                    tabindex=\"-1\"\n                    (click)=\"changePage(start - 2)\">...</a>\n            </li>\n            <li *ngFor=\"let num of buttons\">\n                <a  href=\"#\"\n                    [attr.aria-label]=\"pageLabel(num)\"\n                    tabindex=\"-1\"\n                    [ngClass]=\"{'k-link': true, 'k-state-selected':currentPage == num}\"\n                    (click)=\"changePage(num - 1)\">\n                    {{num}}\n                </a>\n            </li>\n            <li *ngIf=\"end < totalPages\">\n                <a  class=\"k-link\"\n                    [attr.aria-label]=\"pageLabel(end + 1)\"\n                    href=\"#\"\n                    tabindex=\"-1\"\n                    (click)=\"changePage(end)\">...</a>\n            </li>\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerNumericButtonsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: PagerContextService }
    ]; };
    PagerNumericButtonsComponent.propDecorators = {
        buttonCount: [{ type: Input }]
    };
    return PagerNumericButtonsComponent;
}(PagerElementComponent));
export { PagerNumericButtonsComponent };
