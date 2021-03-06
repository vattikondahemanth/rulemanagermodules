/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Directive, ElementRef, EventEmitter, HostBinding, Injectable, Input, NgModule, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import Draggable from '@telerik/kendo-draggable';
import { CommonModule } from '@angular/common';
import { Subject, from } from 'rxjs';
import { auditTime } from 'rxjs/operators';

var isDocumentAvailable = function () { return typeof document !== 'undefined'; };

var isChanged = function (propertyName, changes, skipFirstChange) {
    if (skipFirstChange === void 0) { skipFirstChange = true; }
    return (typeof changes[propertyName] !== 'undefined' &&
        (!changes[propertyName].isFirstChange() || !skipFirstChange) &&
        changes[propertyName].previousValue !== changes[propertyName].currentValue);
};

var anyChanged = function (propertyNames, changes, skipFirstChange) {
    if (skipFirstChange === void 0) { skipFirstChange = true; }
    return propertyNames.some(function (name) { return isChanged(name, changes, skipFirstChange); });
};

var hasObservers = function (emitter) { return emitter && emitter.observers.length > 0; };

var guid = function () {
    var id = "";
    for (var i = 0; i < 32; i++) {
        var random = Math.random() * 16 | 0; // tslint:disable-line:no-bitwise
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += "-";
        }
        // tslint:disable-next-line:no-bitwise
        id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return id;
};

var DraggableDirective = /** @class */ (function () {
    function DraggableDirective(element, ngZone) {
        this.element = element;
        this.ngZone = ngZone;
        this.enableDrag = true;
        this.kendoPress = new EventEmitter();
        this.kendoDrag = new EventEmitter();
        this.kendoRelease = new EventEmitter();
    }
    DraggableDirective.prototype.ngOnInit = function () {
        this.toggleDraggable();
    };
    DraggableDirective.prototype.ngOnChanges = function (changes) {
        if (isChanged('enableDrag', changes)) {
            this.toggleDraggable();
        }
    };
    DraggableDirective.prototype.ngOnDestroy = function () {
        this.destroyDraggable();
    };
    DraggableDirective.prototype.toggleDraggable = function () {
        var _this = this;
        if (isDocumentAvailable()) {
            this.destroyDraggable();
            if (this.enableDrag) {
                this.draggable = new Draggable({
                    drag: function (e) { return _this.kendoDrag.next(e); },
                    press: function (e) { return _this.kendoPress.next(e); },
                    release: function (e) { return _this.kendoRelease.next(e); }
                });
                this.ngZone.runOutsideAngular(function () { return _this.draggable.bindTo(_this.element.nativeElement); });
            }
        }
    };
    DraggableDirective.prototype.destroyDraggable = function () {
        if (this.draggable) {
            this.draggable.destroy();
            this.draggable = null;
        }
    };
    DraggableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDraggable]'
                },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    DraggableDirective.propDecorators = {
        enableDrag: [{ type: Input }],
        kendoPress: [{ type: Output }],
        kendoDrag: [{ type: Output }],
        kendoRelease: [{ type: Output }]
    };
    return DraggableDirective;
}());

/**
 * @hidden
 */
var DraggableModule = /** @class */ (function () {
    function DraggableModule() {
    }
    DraggableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DraggableDirective],
                    exports: [DraggableDirective],
                    imports: [CommonModule]
                },] },
    ];
    return DraggableModule;
}());

/* tslint:disable:no-input-rename */
/**
 * @hidden
 */
var EventsOutsideAngularDirective = /** @class */ (function () {
    function EventsOutsideAngularDirective(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.events = {};
    }
    EventsOutsideAngularDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.element || !this.element.nativeElement) {
            return;
        }
        var events = this.events;
        this.subscriptions = [];
        this.ngZone.runOutsideAngular(function () {
            for (var name_1 in events) {
                if (events.hasOwnProperty(name_1)) {
                    _this.subscriptions.push(_this.renderer.listen(_this.element.nativeElement, name_1, _this.scope ? events[name_1].bind(_this.scope) : events[name_1]));
                }
            }
        });
    };
    EventsOutsideAngularDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            for (var idx = 0; idx < this.subscriptions.length; idx++) {
                this.subscriptions[idx]();
            }
            this.subscriptions = null;
        }
    };
    EventsOutsideAngularDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoEventsOutsideAngular]'
                },] },
    ];
    /** @nocollapse */
    EventsOutsideAngularDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    EventsOutsideAngularDirective.propDecorators = {
        events: [{ type: Input, args: ['kendoEventsOutsideAngular',] }],
        scope: [{ type: Input }]
    };
    return EventsOutsideAngularDirective;
}());

/**
 * @hidden
 */
var EventsModule = /** @class */ (function () {
    function EventsModule() {
    }
    EventsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [EventsOutsideAngularDirective],
                    exports: [EventsOutsideAngularDirective]
                },] },
    ];
    return EventsModule;
}());

/* tslint:disable:align */
/**
 * @hidden
 */
var ResizeBatchService = /** @class */ (function () {
    function ResizeBatchService(ngZone) {
        this.ngZone = ngZone;
        this.scheduled = [];
        this.resolvedPromise = Promise.resolve(null);
        this.flush = this.flush.bind(this);
    }
    ResizeBatchService.prototype.schedule = function (instance, method) {
        var _this = this;
        this.scheduled.push({ instance: instance, method: method });
        if (!this.subscription) {
            this.ngZone.runOutsideAngular(function () {
                _this.subscription = from(_this.resolvedPromise)
                    .subscribe(_this.flush);
            });
        }
    };
    ResizeBatchService.prototype.isScheduled = function (instance) {
        return Boolean(this.scheduled.find(function (item) { return item.instance === instance; }));
    };
    ResizeBatchService.prototype.cancel = function (instance) {
        var scheduled = this.scheduled;
        var count = scheduled.length;
        for (var idx = 0; idx < count; idx++) {
            if (scheduled[idx].instance === instance) {
                scheduled.splice(idx, 1);
                if (!scheduled.length) {
                    this.unsubscribe();
                }
                return;
            }
        }
    };
    ResizeBatchService.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    ResizeBatchService.prototype.unsubscribe = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    ResizeBatchService.prototype.flush = function () {
        this.scheduled.forEach(function (item) {
            item.method.call(item.instance);
        });
        this.scheduled = [];
        this.unsubscribe();
    };
    ResizeBatchService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResizeBatchService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ResizeBatchService;
}());

/**
 * Emit up to 10 resize events per second by default.
 * Chosen as a compromise between responsiveness and performance.
 */
var DEFAULT_RATE_LIMIT = 10;
var computedProp = function (elem, prop) {
    return getComputedStyle(elem, null).getPropertyValue(prop);
};
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
        this.resize = new EventEmitter();
        this.dir = 'ltr';
        this.source = new Subject();
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
            .pipe(auditTime(throttleTime))
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
        { type: Component, args: [{
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
        { type: ResizeBatchService },
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ResizeSensorComponent.propDecorators = {
        rateLimit: [{ type: Input }],
        resize: [{ type: Output }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        expand: [{ type: ViewChild, args: ['expand',] }],
        expandChild: [{ type: ViewChild, args: ['expandChild',] }],
        shrink: [{ type: ViewChild, args: ['shrink',] }]
    };
    return ResizeSensorComponent;
}());

var COMPONENT_DIRECTIVES = [ResizeSensorComponent];
/**
 * Resize Sensor module
 */
var ResizeSensorModule = /** @class */ (function () {
    function ResizeSensorModule() {
    }
    ResizeSensorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES],
                    providers: [ResizeBatchService]
                },] },
    ];
    return ResizeSensorModule;
}());

var KendoInput = /** @class */ (function () {
    function KendoInput() {
    }
    return KendoInput;
}());

/**
 * Enum with key codes.
 */
var Keys;
(function (Keys) {
    Keys[Keys["Alt"] = 18] = "Alt";
    Keys[Keys["ArrowDown"] = 40] = "ArrowDown";
    Keys[Keys["ArrowLeft"] = 37] = "ArrowLeft";
    Keys[Keys["ArrowRight"] = 39] = "ArrowRight";
    Keys[Keys["ArrowUp"] = 38] = "ArrowUp";
    Keys[Keys["Backspace"] = 8] = "Backspace";
    Keys[Keys["Control"] = 17] = "Control";
    Keys[Keys["Delete"] = 46] = "Delete";
    Keys[Keys["Digit0"] = 48] = "Digit0";
    Keys[Keys["Digit1"] = 49] = "Digit1";
    Keys[Keys["Digit2"] = 50] = "Digit2";
    Keys[Keys["Digit3"] = 51] = "Digit3";
    Keys[Keys["Digit4"] = 52] = "Digit4";
    Keys[Keys["Digit5"] = 53] = "Digit5";
    Keys[Keys["Digit6"] = 54] = "Digit6";
    Keys[Keys["Digit7"] = 55] = "Digit7";
    Keys[Keys["Digit8"] = 56] = "Digit8";
    Keys[Keys["Digit9"] = 57] = "Digit9";
    Keys[Keys["End"] = 35] = "End";
    Keys[Keys["Enter"] = 13] = "Enter";
    Keys[Keys["Escape"] = 27] = "Escape";
    Keys[Keys["F1"] = 112] = "F1";
    Keys[Keys["F2"] = 113] = "F2";
    Keys[Keys["F10"] = 121] = "F10";
    Keys[Keys["Home"] = 36] = "Home";
    Keys[Keys["Insert"] = 45] = "Insert";
    Keys[Keys["KeyA"] = 65] = "KeyA";
    Keys[Keys["KeyB"] = 66] = "KeyB";
    Keys[Keys["KeyC"] = 67] = "KeyC";
    Keys[Keys["KeyD"] = 68] = "KeyD";
    Keys[Keys["KeyE"] = 69] = "KeyE";
    Keys[Keys["KeyF"] = 70] = "KeyF";
    Keys[Keys["KeyG"] = 71] = "KeyG";
    Keys[Keys["KeyH"] = 72] = "KeyH";
    Keys[Keys["KeyI"] = 73] = "KeyI";
    Keys[Keys["KeyJ"] = 74] = "KeyJ";
    Keys[Keys["KeyK"] = 75] = "KeyK";
    Keys[Keys["KeyL"] = 76] = "KeyL";
    Keys[Keys["KeyM"] = 77] = "KeyM";
    Keys[Keys["KeyN"] = 78] = "KeyN";
    Keys[Keys["KeyO"] = 79] = "KeyO";
    Keys[Keys["KeyP"] = 80] = "KeyP";
    Keys[Keys["KeyQ"] = 81] = "KeyQ";
    Keys[Keys["KeyR"] = 82] = "KeyR";
    Keys[Keys["KeyS"] = 83] = "KeyS";
    Keys[Keys["KeyT"] = 84] = "KeyT";
    Keys[Keys["KeyU"] = 85] = "KeyU";
    Keys[Keys["KeyV"] = 86] = "KeyV";
    Keys[Keys["KeyW"] = 87] = "KeyW";
    Keys[Keys["KeyX"] = 88] = "KeyX";
    Keys[Keys["KeyY"] = 89] = "KeyY";
    Keys[Keys["KeyZ"] = 90] = "KeyZ";
    Keys[Keys["NumpadDecimal"] = 110] = "NumpadDecimal";
    Keys[Keys["PageDown"] = 34] = "PageDown";
    Keys[Keys["PageUp"] = 33] = "PageUp";
    Keys[Keys["Shift"] = 16] = "Shift";
    Keys[Keys["Space"] = 32] = "Space";
    Keys[Keys["Tab"] = 9] = "Tab";
})(Keys || (Keys = {}));

/**
 * Generated bundle index. Do not edit.
 */

export { DraggableDirective, DraggableModule, EventsOutsideAngularDirective, EventsModule, ResizeSensorComponent, ResizeBatchService, ResizeSensorModule, KendoInput, isDocumentAvailable, isChanged, anyChanged, hasObservers, guid, Keys };
