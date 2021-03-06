/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, NgZone, Renderer2, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { ResizeBatchService } from './resize-batch.service';
/**
 * Emit up to 10 resize events per second by default.
 * Chosen as a compromise between responsiveness and performance.
 */
const DEFAULT_RATE_LIMIT = 10;
const computedProp = (elem, prop) => getComputedStyle(elem, null).getPropertyValue(prop);
const ɵ0 = computedProp;
const WRAP_STYLE = 'position: absolute; display: block; left: 0; top: 0; right: 0; bottom: 0; z-index: -1;' +
    'overflow: hidden; visibility: hidden;';
const EXPAND_CHILD_STYLE = 'position: absolute; left: 0; top: 0; transition: 0s;';
const SHRINK_CHILD_STYLE = EXPAND_CHILD_STYLE + 'width: 200%; height: 200%;';
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
export class ResizeSensorComponent {
    constructor(resizeBatchService, element, zone, renderer) {
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
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            const scrollHandler = this.scroll.bind(this);
            const detachExpand = this.renderer.listen(this.expand.nativeElement, 'scroll', scrollHandler);
            const detachShrink = this.renderer.listen(this.shrink.nativeElement, 'scroll', scrollHandler);
            this.detachScrollHandlers = () => {
                detachExpand();
                detachShrink();
            };
        });
    }
    ngAfterViewChecked() {
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
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.detachScrollHandlers) {
            this.detachScrollHandlers();
        }
        this.resizeBatchService.cancel(this);
    }
    /**
     * Sets the passed size or the element size as current.
     */
    acceptSize(size = this.measure()) {
        this.lastWidth = size.width;
        this.lastHeight = size.height;
        this.acceptedSize = true;
    }
    /**
     * @hidden
     */
    scroll(_event) {
        if (!this.parentElement) {
            return;
        }
        const { width, height } = this.measure();
        const sameSize = width === this.lastWidth && height === this.lastHeight;
        if (sameSize) {
            return;
        }
        this.lastWidth = width;
        this.lastHeight = height;
        this.acceptedSize = false;
        this.zone.runOutsideAngular(() => {
            this.source.next();
        });
        this.reset();
    }
    init() {
        const throttleTime = 1000 / (this.rateLimit || DEFAULT_RATE_LIMIT);
        this.subscription = this.source.asObservable()
            .pipe(auditTime(throttleTime))
            .subscribe(() => {
            if (!this.acceptedSize) {
                this.resize.emit();
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
    }
    reset() {
        const expandChild = this.expandChild.nativeElement;
        expandChild.style.width = 100000 + 'px';
        expandChild.style.height = 100000 + 'px';
        const expand = this.expand.nativeElement;
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        const shrink = this.shrink.nativeElement;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    }
    measure() {
        let width = 0;
        let height = 0;
        if (this.parentElement) {
            height = this.parentElement.offsetHeight;
            width = this.parentElement.offsetWidth;
        }
        return { height, width };
    }
}
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
ResizeSensorComponent.ctorParameters = () => [
    { type: ResizeBatchService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
ResizeSensorComponent.propDecorators = {
    rateLimit: [{ type: Input }],
    resize: [{ type: Output }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    expand: [{ type: ViewChild, args: ['expand',] }],
    expandChild: [{ type: ViewChild, args: ['expandChild',] }],
    shrink: [{ type: ViewChild, args: ['shrink',] }]
};
export { ɵ0 };
