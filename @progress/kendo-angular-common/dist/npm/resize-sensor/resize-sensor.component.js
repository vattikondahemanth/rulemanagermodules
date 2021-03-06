/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var resize_batch_service_1 = require("./resize-batch.service");
/**
 * Emit up to 10 resize events per second by default.
 * Chosen as a compromise between responsiveness and performance.
 */
var DEFAULT_RATE_LIMIT = 10;
var computedProp = function (elem, prop) {
    return getComputedStyle(elem, null).getPropertyValue(prop);
};
var ɵ0 = computedProp;
exports.ɵ0 = ɵ0;
var WRAP_STYLE = 'position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;' +
    'overflow: hidden; visibility: hidden;';
var EXPAND_CHILD_STYLE = 'position: absolute; left: 0; top: 0; transition: 0s;';
var SHRINK_CHILD_STYLE = EXPAND_CHILD_STYLE + 'width: 200%; height: 200%;';
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
var ResizeSensorComponent = /** @class */ (function () {
    function ResizeSensorComponent(resizeBatchService, element, zone, renderer) {
        this.resizeBatchService = resizeBatchService;
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        /**
         * The maximum number of resize events to emit per second.
         *
         * Defaults to 10.
         */
        this.rateLimit = DEFAULT_RATE_LIMIT;
        /**
         * Fires when the parent DOM element has been resized.
         */
        this.resize = new core_1.EventEmitter();
        this.dir = 'ltr';
        this.source = new rxjs_1.Subject();
        this.state = 0 /* Initial */;
        this.acceptedSize = false;
    }
    ResizeSensorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var scrollHandler = _this.scroll.bind(_this);
            var detachExpand = _this.renderer.listen(_this.expand.nativeElement, 'scroll', scrollHandler);
            var detachShrink = _this.renderer.listen(_this.shrink.nativeElement, 'scroll', scrollHandler);
            _this.detachScrollHandlers = function () {
                detachExpand();
                detachShrink();
            };
        });
    };
    ResizeSensorComponent.prototype.ngAfterViewChecked = function () {
        if (typeof document === 'undefined') {
            return;
        }
        if (this.state === 2 /* Initialized */) {
            if (!this.resizeBatchService.isScheduled(this)) {
                this.resizeBatchService.schedule(this, this.scroll);
            }
            return;
        }
        if (this.state === 0 /* Initial */) {
            this.state = 1 /* Initializing */;
            this.resizeBatchService.schedule(this, this.init);
        }
    };
    ResizeSensorComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.detachScrollHandlers) {
            this.detachScrollHandlers();
        }
        this.resizeBatchService.cancel(this);
    };
    /**
     * Sets the passed size or the element size as current.
     */
    ResizeSensorComponent.prototype.acceptSize = function (size) {
        if (size === void 0) { size = this.measure(); }
        this.lastWidth = size.width;
        this.lastHeight = size.height;
        this.acceptedSize = true;
    };
    /**
     * @hidden
     */
    ResizeSensorComponent.prototype.scroll = function (_event) {
        var _this = this;
        if (!this.parentElement) {
            return;
        }
        var _a = this.measure(), width = _a.width, height = _a.height;
        var sameSize = width === this.lastWidth && height === this.lastHeight;
        if (sameSize) {
            return;
        }
        this.lastWidth = width;
        this.lastHeight = height;
        this.acceptedSize = false;
        this.zone.runOutsideAngular(function () {
            _this.source.next();
        });
        this.reset();
    };
    ResizeSensorComponent.prototype.init = function () {
        var _this = this;
        var throttleTime = 1000 / (this.rateLimit || DEFAULT_RATE_LIMIT);
        this.subscription = this.source.asObservable()
            .pipe(operators_1.auditTime(throttleTime))
            .subscribe(function () {
            if (!_this.acceptedSize) {
                _this.resize.emit();
            }
        });
        this.parentElement = this.element.nativeElement.parentElement;
        if (computedProp(this.parentElement, 'position') === 'static') {
            this.parentElement.style.position = 'relative';
        }
        this.reset();
        this.lastWidth = this.parentElement.offsetWidth;
        this.lastHeight = this.parentElement.offsetHeight;
        this.state = 2 /* Initialized */;
    };
    ResizeSensorComponent.prototype.reset = function () {
        var expandChild = this.expandChild.nativeElement;
        expandChild.style.width = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';
        var expand = this.expand.nativeElement;
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        var shrink = this.shrink.nativeElement;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    };
    ResizeSensorComponent.prototype.measure = function () {
        var width = 0;
        var height = 0;
        if (this.parentElement) {
            height = this.parentElement.offsetHeight;
            width = this.parentElement.offsetWidth;
        }
        return { height: height, width: width };
    };
    ResizeSensorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-resize-sensor',
                    styles: [':host { ' + WRAP_STYLE + ' }'],
                    template: '<div #expand style="' + WRAP_STYLE + '">' +
                        '  <div #expandChild style="' + EXPAND_CHILD_STYLE + '"></div>' +
                        '</div>' +
                        '<div #shrink style="' + WRAP_STYLE + '">' +
                        '  <div style="' + SHRINK_CHILD_STYLE + '"></div>' +
                        '</div>'
                },] },
    ];
    /** @nocollapse */
    ResizeSensorComponent.ctorParameters = function () { return [
        { type: resize_batch_service_1.ResizeBatchService },
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 }
    ]; };
    ResizeSensorComponent.propDecorators = {
        rateLimit: [{ type: core_1.Input }],
        resize: [{ type: core_1.Output }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        expand: [{ type: core_1.ViewChild, args: ['expand',] }],
        expandChild: [{ type: core_1.ViewChild, args: ['expandChild',] }],
        shrink: [{ type: core_1.ViewChild, args: ['shrink',] }]
    };
    return ResizeSensorComponent;
}());
exports.ResizeSensorComponent = ResizeSensorComponent;
