/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Renderer2, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, forwardRef, ContentChild, NgZone, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subscription, fromEvent, interval, merge } from 'rxjs';
import { filter, concatMap, startWith, takeUntil } from 'rxjs/operators';
import { SliderUtil as Util } from '@telerik/kendo-inputs-common';
import { SliderModel } from './slider-model';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { LabelTemplateDirective } from './label-template.directive';
import { areSame, requiresZoneOnBlur } from '../common/utils';
import { isButton, eventValue, decreaseValueToStep, increaseValueToStep, increment, decrement, incrementLarge, decrementLarge } from './utils';
import { invokeElementMethod } from '../common/dom-utils';
import { guid, isDocumentAvailable, isChanged, hasObservers, Keys, KendoInput } from '@progress/kendo-angular-common';
var FOCUSED = 'k-state-focused';
var PRESSED = 'k-pressed';
/**
 * Represents the [Kendo UI Slider component for Angular]({% slug overview_slider %}).
 */
var SliderComponent = /** @class */ (function () {
    function SliderComponent(localizationService, injector, renderer, ngZone, hostElement) {
        var _this = this;
        this.localizationService = localizationService;
        this.injector = injector;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.hostElement = hostElement;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Renders the arrow side buttons of the Slider ([see example]({% slug sidebuttons_slider %}#toc-hidden-state)).
         * When `showButtons` is set to `false`, the buttons are not displayed.
         */
        this.showButtons = true;
        /**
         * Denotes the location of the tick marks in the Slider ([see example]({% slug ticks_slider %}#toc-placement)).
         *
         * The available options are:
         * * `before`&mdash;The tick marks are located to the top side of the horizontal track or to the left side of a vertical track.
         * * `after`&mdash;The tick marks are located to the bottom side of the horizontal track or to the right side of the vertical track.
         * * `both`&mdash;The tick marks are located on both sides of the track.
         * * `none`&mdash;The tick marks are not visible. The actual elements are not added to the DOM tree.
         */
        this.tickPlacement = 'both';
        /**
         * Defines the title of the ticks ([see example]({% slug ticks_slider %}#toc-titles)). The default title
         * for each tick is its Slider value. If you use a callback function, the function accepts an argument
         * that holds the value of the component and returns a string with the new title.
         */
        this.title = Util.identity;
        /**
         * If `vertical` is set to `true`, the orientation of the Slider changes from horizontal to vertical
         * ([see example]({% slug orientation_slider %})).
         */
        this.vertical = false;
        /**
         * The minimum value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
         * The attribute accepts both integers and floating-point numbers.
         */
        this.min = 0;
        /**
         * The maximum value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
         * The attribute accepts both integers and floating-point numbers.
         */
        this.max = 10;
        /**
         * The step value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
         * Accepts positive values only. Can be an integer or a floating-point number.
         */
        this.smallStep = 1;
        /**
         * Specifies that every n<sup>th</sup> tick will be large and will have a label
         * ([see example]({% slug predefinedsteps_slider %}#toc-large-steps)).
         * Accepts positive integer values only.
         */
        this.largeStep = null;
        /**
         * Determines whether the Slider is disabled ([see example]({% slug disabledstate_slider %})).
         */
        this.disabled = false;
        /**
         * Determines whether the Slider is in its read-only state ([see example]({% slug readonly_slider %})).
         */
        this.readonly = false;
        /**
         * The current value of the Slider when it is initially displayed.
         * The component can use either NgModel or the `value` binding but not both of them at the same time.
         */
        this.value = 0;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the Slider.
         */
        this.tabindex = 0;
        /**
         * Fires each time the user focuses the `input` element.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the `input` element gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new EventEmitter();
        this.subscriptions = new Subscription();
        /**
         * @hidden
         */
        this.handleFocus = function () {
            _this.focused = true;
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.focused = false;
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.onBlur.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.onWrapClick = function (args) {
            var target = args.target;
            if (!_this.isDisabled && !(isButton(target) || isButton(target.parentNode))) {
                var value = eventValue(args, _this.track.nativeElement, _this.getProps());
                _this.changeValue(value);
            }
        };
        /**
         * @hidden
         */
        this.ifEnabled = function (callback, event) {
            if (!_this.isDisabled) {
                callback.call(_this, event);
            }
        };
        /**
         * @hidden
         */
        this.onKeyDown = function (e) {
            var options = _this.getProps();
            var max = options.max, min = options.min;
            var handler = _this.keyBinding[e.keyCode];
            if (_this.isDisabled || !handler) {
                return;
            }
            var value = handler(options);
            _this.changeValue(Util.trimValue(max, min, value));
            e.preventDefault();
        };
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        this.decreaseValue = function () {
            _this.changeValue(decreaseValueToStep(_this.value, _this.getProps()));
        };
        this.increaseValue = function () {
            _this.changeValue(increaseValueToStep(_this.value, _this.getProps()));
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(SliderComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "horizontalClass", {
        get: function () {
            return !this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "verticalClass", {
        get: function () {
            return this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "sliderClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "transitionsClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "widgetClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "stateDefaultClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaReadonly", {
        get: function () {
            return this.readonly ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaMin", {
        get: function () {
            return this.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaMax", {
        get: function () {
            return this.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "ariaValue", {
        get: function () {
            return this.value ? this.value : this.min;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    SliderComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.localizationService
            .changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.sizeComponent(false);
        }));
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    };
    /**
     * Focuses the Slider.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="slider.focus()">Focus</button>
     *  <kendo-slider #slider></kendo-slider>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    SliderComponent.prototype.focus = function () {
        invokeElementMethod(this.wrapper, 'focus');
    };
    /**
     * Blurs the Slider.
     */
    SliderComponent.prototype.blur = function () {
        invokeElementMethod(this.wrapper, 'blur');
    };
    SliderComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('value', changes)) {
            this.sizeComponent(false);
        }
    };
    SliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.showButtons) {
            this.setValueChangeInterval(this.increaseButton.nativeElement, function () { return _this.increaseValue(); });
            this.setValueChangeInterval(this.decreaseButton.nativeElement, function () { return _this.decreaseValue(); });
        }
        this.sizeComponent(false);
        if (this.ticks) {
            this.ticks.tickElements
                .changes
                .subscribe(function () { return _this.sizeComponent(false); });
        }
    };
    SliderComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(SliderComponent.prototype, "incrementMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.incrementTitle || this.localizationService.get('increment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "decrementMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.decrementTitle || this.localizationService.get('decrement');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "dragHandleMessage", {
        /**
         * @hidden
         */
        get: function () {
            return this.dragHandleTitle || this.localizationService.get('dragHandle');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SliderComponent.prototype.handleDragPress = function (args) {
        if (args.originalEvent) {
            args.originalEvent.preventDefault();
        }
        this.focus();
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onHandleDrag = function (args) {
        this.dragging = true;
        this.changeValue(eventValue(args, this.track.nativeElement, this.getProps()));
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.onHandleRelease = function () {
        this.dragging = false; //needed for animation
    };
    //ngModel binding
    /**
     * @hidden
     */
    SliderComponent.prototype.writeValue = function (value) {
        this.value = value;
        this.sizeComponent(true);
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.changeValue = function (value) {
        var _this = this;
        if (!areSame(this.value, value)) {
            this.ngZone.run(function () {
                _this.value = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.sizeComponent(true);
            });
        }
    };
    /**
     * @hidden
     */
    SliderComponent.prototype.sizeComponent = function (animate) {
        if (!isDocumentAvailable()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        var props = this.getProps();
        var model = new SliderModel(props, wrapper, this.track.nativeElement);
        model.resizeTrack();
        if (this.ticks) { //for case when tickPlacement: none
            model.resizeTicks(this.ticksContainer.nativeElement, this.ticks.tickElements.map(function (element) { return element.nativeElement; }));
        }
        this.handleAnimation(animate); //first time the widget is initialized the selection should not be animated
        model.positionHandle(this.draghandle.nativeElement);
        model.positionSelection(this.draghandle.nativeElement, this.sliderSelection.nativeElement);
        if (this.fixedTickWidth) {
            model.resizeWrapper();
        }
    };
    Object.defineProperty(SliderComponent.prototype, "isDisabled", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled || this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    SliderComponent.prototype.isEmpty = function () {
        return false;
    };
    Object.defineProperty(SliderComponent.prototype, "reverse", {
        get: function () {
            return this.localizationService.rtl && !this.vertical;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "keyBinding", {
        get: function () {
            var _a;
            var reverse = this.reverse;
            return _a = {},
                _a[Keys.ArrowLeft] = reverse ? increment : decrement,
                _a[Keys.ArrowRight] = reverse ? decrement : increment,
                _a[Keys.ArrowDown] = decrement,
                _a[Keys.ArrowUp] = increment,
                _a[Keys.PageUp] = incrementLarge,
                _a[Keys.PageDown] = decrementLarge,
                _a[Keys.Home] = function (_a) {
                    var min = _a.min;
                    return min;
                },
                _a[Keys.End] = function (_a) {
                    var max = _a.max;
                    return max;
                },
                _a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "focused", {
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                var element = this.hostElement.nativeElement;
                if (value) {
                    this.renderer.addClass(element, FOCUSED);
                }
                else {
                    this.renderer.removeClass(element, FOCUSED);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderComponent.prototype, "dragging", {
        set: function (value) {
            if (this.isDragged !== value && this.sliderSelection && this.draghandle) {
                var sliderSelection = this.sliderSelection.nativeElement;
                var draghandle = this.draghandle.nativeElement;
                if (value) {
                    this.renderer.addClass(sliderSelection, PRESSED);
                    this.renderer.addClass(draghandle, PRESSED);
                }
                else {
                    this.renderer.removeClass(sliderSelection, PRESSED);
                    this.renderer.removeClass(draghandle, PRESSED);
                }
                this.isDragged = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    SliderComponent.prototype.setValueChangeInterval = function (element, callback) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var mousedown = fromEvent(element, 'mousedown');
            var mouseup = fromEvent(element, 'mouseup');
            var mouseout = fromEvent(element, 'mouseout');
            var subscription = mousedown.pipe(filter(function (e) { return e.button === 0 && !_this.isDisabled; }), concatMap(function () {
                return interval(150).pipe(startWith(-1), takeUntil(merge(mouseup, mouseout)));
            })).subscribe(function () {
                _this.focus();
                callback();
            });
            _this.subscriptions.add(subscription);
        });
    };
    SliderComponent.prototype.handleAnimation = function (animate) {
        var transition = '';
        if (!animate) {
            transition = 'none';
        }
        this.draghandle.nativeElement.style.transition = transition;
        this.sliderSelection.nativeElement.style.transition = transition;
    };
    SliderComponent.prototype.getProps = function () {
        return {
            buttons: this.showButtons,
            disabled: this.disabled,
            fixedTickWidth: this.fixedTickWidth,
            largeStep: this.largeStep,
            max: this.max,
            min: this.min,
            readonly: this.readonly,
            reverse: this.reverse,
            rtl: this.localizationService.rtl,
            smallStep: this.smallStep,
            value: Util.trimValue(this.max, this.min, this.value),
            vertical: this.vertical
        };
    };
    SliderComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoSlider',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.slider' },
                        { multi: true, provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return SliderComponent; }) },
                        { provide: KendoInput, useExisting: forwardRef(function () { return SliderComponent; }) }
                    ],
                    selector: 'kendo-slider',
                    template: "\n        <ng-container kendoSliderLocalizedMessages\n            i18n-increment=\"kendo.slider.increment|The title of the **Increase** button of the Slider.\"\n            increment=\"increment\"\n            i18n-decrement=\"kendo.slider.decrement|The title of the **Decrease** button of the Slider.\"\n            decrement=\"decrement\"\n            i18n-dragHandle=\"kendo.slider.dragHandle|The title of the drag handle of the Slider.\"\n            dragHandle=\"Drag\"\n        >\n\n        <div class=\"k-slider-wrap\" #wrap\n            [id]=\"focusableId\"\n            [class.k-slider-buttons]=\"showButtons\"\n            [class.k-slider-topleft]=\"tickPlacement === 'before'\"\n            [class.k-slider-bottomright]=\"tickPlacement === 'after'\"\n            [attr.tabindex]=\"(this.disabled ? undefined : tabIndex)\"\n            [kendoEventsOutsideAngular]=\"{ focus: handleFocus, blur: handleBlur, click: onWrapClick, keydown: onKeyDown }\"\n            >\n            <a\n                #decreaseButton\n                *ngIf=\"showButtons\"\n                class=\"k-button k-button-decrease\"\n                [title]=\"decrementMessage\"\n                [attr.aria-label]=\"decrementMessage\"\n            >\n                <span class=\"k-icon\"\n                    [class.k-i-arrow-w]=\"!vertical\"\n                    [class.k-i-arrow-s]=\"vertical\"\n                >\n                </span>\n            </a>\n            <a\n                *ngIf=\"showButtons\"\n                #increaseButton\n                class=\"k-button k-button-increase\"\n                [title]=\"incrementMessage\"\n                [attr.aria-label]=\"incrementMessage\"\n            >\n                <span class=\"k-icon\"\n                    [class.k-i-arrow-e]=\"!vertical\"\n                    [class.k-i-arrow-n]=\"vertical\"\n                >\n                </span>\n            </a>\n            <ul kendoSliderTicks\n                #ticks\n                *ngIf=\"tickPlacement !== 'none'\"\n                [tickTitle]=\"title\"\n                [vertical]=\"vertical\"\n                [step]=\"smallStep\"\n                [largeStep]=\"largeStep\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [labelTemplate]=\"labelTemplate?.templateRef\"\n            >\n            </ul>\n        <div #track class=\"k-slider-track\">\n            <div #sliderSelection class=\"k-slider-selection\">\n            </div>\n                <a #draghandle\n                    [style.touch-action]=\"isDisabled ? '' : 'none'\"\n                    class=\"k-draghandle\"\n                    [title]=\"dragHandleMessage\"\n                    kendoDraggable\n                    (kendoPress)=\"ifEnabled(handleDragPress ,$event)\"\n                    (kendoDrag)=\"ifEnabled(onHandleDrag ,$event)\"\n                    (kendoRelease)=\"ifEnabled(onHandleRelease, $event)\"\n                ></a>\n            </div>\n\n            <kendo-resize-sensor (resize)=\"sizeComponent(false)\"></kendo-resize-sensor>\n        </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SliderComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: Injector },
        { type: Renderer2 },
        { type: NgZone },
        { type: ElementRef }
    ]; };
    SliderComponent.propDecorators = {
        focusableId: [{ type: Input }],
        incrementTitle: [{ type: Input }],
        decrementTitle: [{ type: Input }],
        showButtons: [{ type: Input }],
        tickPlacement: [{ type: Input }],
        title: [{ type: Input }],
        dragHandleTitle: [{ type: Input }],
        vertical: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        smallStep: [{ type: Input }],
        largeStep: [{ type: Input }],
        fixedTickWidth: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        value: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        valueChange: [{ type: Output }],
        wrapper: [{ type: ViewChild, args: ['wrap',] }],
        track: [{ type: ViewChild, args: ['track',] }],
        draghandle: [{ type: ViewChild, args: ['draghandle',] }],
        sliderSelection: [{ type: ViewChild, args: ['sliderSelection',] }],
        ticksContainer: [{ type: ViewChild, args: ['ticks', { read: ElementRef },] }],
        ticks: [{ type: ViewChild, args: ['ticks',] }],
        decreaseButton: [{ type: ViewChild, args: ['decreaseButton',] }],
        increaseButton: [{ type: ViewChild, args: ['increaseButton',] }],
        labelTemplate: [{ type: ContentChild, args: [LabelTemplateDirective,] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        horizontalClass: [{ type: HostBinding, args: ['class.k-slider-horizontal',] }],
        verticalClass: [{ type: HostBinding, args: ['class.k-slider-vertical',] }],
        sliderClass: [{ type: HostBinding, args: ['class.k-slider',] }],
        transitionsClass: [{ type: HostBinding, args: ['class.k-slider-transitions',] }],
        widgetClass: [{ type: HostBinding, args: ['class.k-widget',] }],
        stateDefaultClass: [{ type: HostBinding, args: ['class.k-state-default',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
        ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
        ariaReadonly: [{ type: HostBinding, args: ['attr.aria-readonly',] }],
        ariaMin: [{ type: HostBinding, args: ['attr.aria-valuemin',] }],
        ariaMax: [{ type: HostBinding, args: ['attr.aria-valuemax',] }],
        ariaValue: [{ type: HostBinding, args: ['attr.aria-valuenow',] }]
    };
    return SliderComponent;
}());
export { SliderComponent };
