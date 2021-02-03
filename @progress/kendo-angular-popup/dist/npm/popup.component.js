"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var align_service_1 = require("./services/align.service");
var dom_service_1 = require("./services/dom.service");
var position_service_1 = require("./services/position.service");
var resize_service_1 = require("./services/resize.service");
var scrollable_service_1 = require("./services/scrollable.service");
var animation_service_1 = require("./services/animation.service");
var util_1 = require("./util");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var DEFAULT_OFFSET = { left: -10000, top: 0 };
var ANIMATION_CONTAINER = 'k-animation-container';
var ANIMATION_CONTAINER_FIXED = 'k-animation-container-fixed';
/**
 * Represents the [Kendo UI Popup component for Angular]({% slug overview_popup %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="show=!show">Toggle</button>
 *  <kendo-popup *ngIf="show" [anchor]="anchor">
 *      <strong>Popup content!</strong>
 *  </kendo-popup>
 * `
 * })
 * class AppComponent {
 *   public show: boolean = false;
 * }
 * ```
 */
var PopupComponent = /** @class */ (function () {
    function PopupComponent(container, _alignService, domService, _positionService, _resizeService, _scrollableService, animationService, _renderer, _zone) {
        this.container = container;
        this._alignService = _alignService;
        this.domService = domService;
        this._positionService = _positionService;
        this._resizeService = _resizeService;
        this._scrollableService = _scrollableService;
        this.animationService = animationService;
        this._renderer = _renderer;
        this._zone = _zone;
        /**
         * Controls the Popup animation. By default, the opening and closing animations
         * are enabled ([see example]({% slug animations_popup %})).
         */
        this.animate = true;
        /**
         * Specifies the anchor pivot point
         * ([see example]({% slug alignmentpositioning_popup %}#toc-positioning)).
         */
        this.anchorAlign = { horizontal: 'left', vertical: 'bottom' };
        /**
         * Configures the collision behavior of the Popup
         * ([see example]({% slug viewportboundarydetection_popup %})).
         */
        this.collision = { horizontal: 'fit', vertical: 'flip' };
        /**
         * Specifies the pivot point of the Popup
         * ([see example]({% slug alignmentpositioning_popup %}#toc-positioning)).
         */
        this.popupAlign = { horizontal: 'left', vertical: 'top' };
        /**
         * Controls whether the component will copy the `anchor` font styles.
         */
        this.copyAnchorStyles = false;
        /**
         * Specifies the position mode of the component. By default, the Popup uses fixed positioning.
         * To make the Popup acquire absolute positioning, set this option to `absolute`.
         *
         * > If you need to support mobile browsers with the zoom option,
         * use the `absolute` positioning of the Popup.
         *
         * @example
         * ```html
         * <style>
         *  .parent-content {
         *     position: relative;
         *     width: 200px;
         *     height: 200px;
         *     overflow: auto;
         *     margin: 200px auto;
         *     border: 1px solid red;
         *  }
         *  .content {
         *     position: relative;
         *     width: 100px;
         *     height: 100px;
         *     overflow: auto;
         *     margin: 300px;
         *     border: 1px solid blue;
         *  }
         *  .anchor {
         *     position: absolute;
         *     top: 200px;
         *     left: 200px;
         *  }
         * </style>
         * ```
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *   <div class="example-config">
         *      Position mode:
         *      <label><input type="radio" value="fixed" [(ngModel)]="mode" /> Fixed</label>
         *      <label><input type="radio" value="absolute" [(ngModel)]="mode" /> Absolute</label>
         *   </div>
         *   <div class="example-config">
         *       Append to
         *       <label>
         *           <input type="radio" name="place" [value]="1" [(ngModel)]="checked" />
         *           Root component
         *       </label>
         *       <label>
         *           <input type="radio" name="place" [value]="2" [(ngModel)]="checked" />
         *           <span style="color: red">Red Container</span>
         *       </label>
         *       <label>
         *           <input type="radio" name="place" [value]="3" [(ngModel)]="checked" />
         *           <span style="color: blue">Blue Container</span>
         *       </label>
         *   </div>
         *   <div class="example">
         *     <div class="parent-content" [scrollLeft]="250" [scrollTop]="230">
         *         <div class="content" [scrollLeft]="170" [scrollTop]="165">
         *           <button #anchor class="anchor" (click)="show = !show">Toggle</button>
         *           <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 3">
         *             <ul>
         *                 <li>Item1</li>
         *                 <li>Item2</li>
         *                 <li>Item3</li>
         *             </ul>
         *           </kendo-popup>
         *           <span style="position: absolute; top: 400px; left: 400px">Bottom/Right</span>
         *         </div>
         *         <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 2">
         *           <ul>
         *               <li>Item1</li>
         *               <li>Item2</li>
         *               <li>Item3</li>
         *           </ul>
         *         </kendo-popup>
         *         <span style="position: absolute; top: 600px; left: 600px">Bottom/Right</span>
         *     </div>
         *     <kendo-popup [positionMode]="mode" [anchor]="anchor" (anchorViewportLeave)="show=false" *ngIf="show && checked === 1">
         *       <ul>
         *           <li>Item1</li>
         *           <li>Item2</li>
         *           <li>Item3</li>
         *       </ul>
         *     </kendo-popup>
         *   </div>
         * `
         * })
         * class AppComponent {
         *   public checked: number = 3;
         *   public mode: string = 'absolute';
         *   public show: boolean = true;
         * }
         * ```
         */
        this.positionMode = 'fixed';
        /**
         * Specifies the absolute position of the element
         * ([see example]({% slug alignmentpositioning_popup %}#toc-aligning-to-absolute-points)).
         * The Popup opens next to that point. The Popup pivot point is defined by the `popupAlign` configuration option.
         * The boundary detection is applied by using the window viewport.
         */
        this.offset = DEFAULT_OFFSET;
        /**
         * Fires when the anchor is scrolled outside the screen boundaries.
         * ([see example]({% slug closing_popup %}#toc-after-leaving-the-viewport)).
         */
        this.anchorViewportLeave = new core_1.EventEmitter();
        /**
         * Fires after the component is closed.
         */
        this.close = new core_1.EventEmitter();
        /**
         * Fires after the component is opened and the opening animation ends.
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires after the component is opened and the Popup is positioned.
         */
        this.positionChange = new core_1.EventEmitter();
        this.resolvedPromise = Promise.resolve(null);
        this._renderer.addClass(container.nativeElement, ANIMATION_CONTAINER);
        this.updateFixedClass();
    }
    PopupComponent.prototype.ngOnInit = function () {
        this.repositionCallback = this.reposition.bind(this);
        this._resizeService.subscribe(this.repositionCallback);
        this.animationSubscriptions = this.animationService.start.subscribe(this.onAnimationStart.bind(this));
        this.animationSubscriptions.add(this.animationService.end.subscribe(this.onAnimationEnd.bind(this)));
        this._scrollableService.forElement(this.anchor || this.container).subscribe(this.onScroll.bind(this));
        this.currentOffset = DEFAULT_OFFSET;
        this.setZIndex();
        this.copyFontStyles();
        this.updateFixedClass();
    };
    PopupComponent.prototype.ngOnChanges = function (changes) {
        if (changes.copyAnchorStyles) {
            this.copyFontStyles();
        }
        if (changes.positionMode) {
            this.updateFixedClass();
        }
    };
    PopupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.reposition();
        if (!this.animate) {
            this.resolvedPromise.then(function () {
                _this.onAnimationEnd();
            });
        }
    };
    PopupComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            // workarounds https://github.com/angular/angular/issues/19094
            // uses promise because it is executed synchronously after the content is updated
            // does not use onStable in case the current zone is not the angular one.
            if (_this.repositionSubscription) {
                _this.repositionSubscription.unsubscribe();
            }
            _this.repositionSubscription = rxjs_1.from(_this.resolvedPromise)
                .subscribe(_this.repositionCallback);
        });
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        this.anchorViewportLeave.complete();
        this.positionChange.complete();
        this.close.emit();
        this.close.complete();
        this._resizeService.unsubscribe();
        this._scrollableService.unsubscribe();
        if (this.repositionSubscription) {
            this.repositionSubscription.unsubscribe();
        }
        this.animationSubscriptions.unsubscribe();
    };
    PopupComponent.prototype.onAnimationStart = function () {
        this._renderer.removeClass(this.container.nativeElement, 'k-animation-container-shown');
    };
    PopupComponent.prototype.onAnimationEnd = function () {
        this._renderer.addClass(this.container.nativeElement, 'k-animation-container-shown');
        this.open.emit();
        this.open.complete();
    };
    Object.defineProperty(PopupComponent.prototype, "currentOffset", {
        get: function () {
            return this._currentOffset;
        },
        set: function (offset) {
            this.setContainerStyle('left', offset.left + "px");
            this.setContainerStyle('top', offset.top + "px");
            this._currentOffset = offset;
        },
        enumerable: true,
        configurable: true
    });
    PopupComponent.prototype.setZIndex = function () {
        if (this.anchor) {
            this.setContainerStyle('z-index', String(this.domService.zIndex(this.anchor, this.container)));
        }
    };
    PopupComponent.prototype.reposition = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flip = _a.flip, offset = _a.offset;
        if (!this.currentOffset || util_1.isDifferentOffset(this.currentOffset, offset)) {
            this.currentOffset = offset;
            if (kendo_angular_common_1.hasObservers(this.positionChange)) {
                this._zone.run(function () { return _this.positionChange.emit({ offset: offset, flip: flip }); });
            }
        }
        if (this.animate) {
            this.animationService.play(this.contentContainer.nativeElement, this.animate, flip);
        }
    };
    PopupComponent.prototype.position = function () {
        var alignedOffset = this._alignService.alignElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            element: this.container,
            elementAlign: this.popupAlign,
            margin: this.margin,
            offset: this.offset,
            positionMode: this.positionMode
        });
        return this._positionService.positionElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            collisions: this.collision,
            currentLocation: alignedOffset,
            element: this.container,
            elementAlign: this.popupAlign,
            margin: this.margin
        });
    };
    PopupComponent.prototype.onScroll = function (isInViewPort) {
        var _this = this;
        var hasLeaveObservers = kendo_angular_common_1.hasObservers(this.anchorViewportLeave);
        if (isInViewPort || !hasLeaveObservers) {
            this.reposition();
        }
        else if (hasLeaveObservers) {
            this._zone.run(function () {
                _this.anchorViewportLeave.emit();
            });
        }
    };
    PopupComponent.prototype.copyFontStyles = function () {
        var _this = this;
        if (!this.anchor || !this.copyAnchorStyles) {
            return;
        }
        this.domService.getFontStyles(this.anchor)
            .forEach(function (s) { return _this.setContainerStyle(s.key, s.value); });
    };
    PopupComponent.prototype.updateFixedClass = function () {
        var action = this.positionMode === 'fixed' ? 'addClass' : 'removeClass';
        this._renderer[action](this.container.nativeElement, ANIMATION_CONTAINER_FIXED);
    };
    PopupComponent.prototype.setContainerStyle = function (name, value) {
        this._renderer.setStyle(this.container.nativeElement, name, value);
    };
    PopupComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendo-popup',
                    providers: [align_service_1.AlignService, animation_service_1.AnimationService, dom_service_1.DOMService, position_service_1.PositionService, resize_service_1.ResizeService, scrollable_service_1.ScrollableService],
                    selector: 'kendo-popup',
                    template: "\n        <div class=\"k-popup\" [ngClass]=\"popupClass\" #container>\n            <ng-content></ng-content>\n            <ng-template [ngTemplateOutlet]=\"content\" [ngIf]=\"content\"></ng-template>\n        </div>\n     "
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: align_service_1.AlignService },
        { type: dom_service_1.DOMService },
        { type: position_service_1.PositionService },
        { type: resize_service_1.ResizeService },
        { type: scrollable_service_1.ScrollableService },
        { type: animation_service_1.AnimationService },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone }
    ]; };
    PopupComponent.propDecorators = {
        animate: [{ type: core_1.Input }],
        anchor: [{ type: core_1.Input }],
        anchorAlign: [{ type: core_1.Input }],
        collision: [{ type: core_1.Input }],
        popupAlign: [{ type: core_1.Input }],
        copyAnchorStyles: [{ type: core_1.Input }],
        popupClass: [{ type: core_1.Input }],
        positionMode: [{ type: core_1.Input }],
        offset: [{ type: core_1.Input }],
        margin: [{ type: core_1.Input }],
        anchorViewportLeave: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        positionChange: [{ type: core_1.Output }],
        contentContainer: [{ type: core_1.ViewChild, args: ['container',] }]
    };
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;
