/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var ScrollSyncService = /** @class */ (function () {
    function ScrollSyncService(ngZone, localization) {
        var _this = this;
        this.ngZone = ngZone;
        this.localization = localization;
        this.changes = new rxjs_1.Subject();
        this.elements = [];
        this.subscriptions = new rxjs_1.Subscription();
        this.headerSubscription = new rxjs_1.Subscription();
        this.bodySubscription = new rxjs_1.Subscription();
        this.subscriptions.add(this.changes.subscribe(function (args) { return _this.scrollLeft(args); }));
        this.subscriptions.add(this.localization.changes.pipe(operators_1.skip(1), operators_1.tap(function () {
            _this.elements.forEach(function (item) { return item.element.scrollLeft = -1; });
        }), operators_1.switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(operators_1.take(1)); })).subscribe(function () {
            var elements = _this.elements;
            for (var idx = 0; idx < elements.length; idx++) {
                var element = elements[idx].element;
                elements[idx].initial = element.scrollLeft;
            }
        }));
    }
    ScrollSyncService.prototype.registerEmitter = function (el, sourceType) {
        var _this = this;
        this.unregister(sourceType);
        this.elements.push({ element: el, sourceType: sourceType, initial: el.scrollLeft });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(function () {
                var obs = rxjs_1.fromEvent(el, "scroll").pipe(operators_1.map(function (_a) {
                    var scrollLeft = _a.target.scrollLeft;
                    return ({
                        scrollLeft: scrollLeft,
                        sourceType: sourceType
                    });
                }));
                var subscription = obs.pipe(operators_1.distinctUntilChanged(function (x, y) { return (x.scrollLeft === y.scrollLeft); }), operators_1.filter(function (x) { return !_this.source || _this.source === x.sourceType; }), operators_1.tap(function (x) { return _this.source = x.sourceType; }))
                    .subscribe(function (x) { return _this.changes.next(x); });
                subscription.add(obs.pipe(operators_1.filter(function (x) { return _this.source && _this.source !== x.sourceType; }))
                    .subscribe(function () { return _this.source = undefined; }));
                if (sourceType === "body") {
                    _this.bodySubscription.add(subscription);
                }
                else {
                    _this.headerSubscription.add(subscription);
                }
            });
        }
    };
    /**
     * destroy
     */
    ScrollSyncService.prototype.destroy = function () {
        this.subscriptions.unsubscribe();
        this.headerSubscription.unsubscribe();
        this.bodySubscription.unsubscribe();
    };
    ScrollSyncService.prototype.scrollLeft = function (_a) {
        var _this = this;
        var scrollLeft = _a.scrollLeft, sourceType = _a.sourceType;
        this.ngZone.runOutsideAngular(function () {
            _this.elements
                .filter(function (x) { return sourceType !== x.sourceType; })
                .forEach(function (_a) {
                var element = _a.element, type = _a.sourceType, initial = _a.initial;
                if (_this.localization.rtl && type !== 'body' && initial > 0) {
                    // the calculation of the scrollLeft position in Chrome with rtl direction is scrollWidth - scrollPosition - offsetWidth
                    // Thus, because of the header and footer padding the offsetWidth and the scrollLeft position is different in Chrome
                    element.scrollLeft = scrollLeft + _this.contentWidth - element.clientWidth;
                }
                else {
                    element.scrollLeft = scrollLeft;
                }
            });
        });
    };
    ScrollSyncService.prototype.unregister = function (sourceType) {
        var index = this.elements.findIndex(function (x) { return x.sourceType === sourceType; });
        if (index > -1) {
            if (sourceType === "header") {
                this.headerSubscription.unsubscribe();
                this.headerSubscription = new rxjs_1.Subscription();
            }
            else if (sourceType === "body") {
                this.bodySubscription.unsubscribe();
                this.bodySubscription = new rxjs_1.Subscription();
            }
            this.elements.splice(index, 1);
        }
    };
    Object.defineProperty(ScrollSyncService.prototype, "contentWidth", {
        get: function () {
            var body = this.elements.find(function (item) { return item.sourceType === 'body'; });
            if (body) {
                return body.element.offsetWidth;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    ScrollSyncService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ScrollSyncService.ctorParameters = function () { return [
        { type: core_1.NgZone },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return ScrollSyncService;
}());
exports.ScrollSyncService = ScrollSyncService;
