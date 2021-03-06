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
const FOCUSED = 'k-state-focused';
const PRESSED = 'k-pressed';
/**
 * Represents the [Kendo UI Slider component for Angular]({% slug overview_slider %}).
 */
export class SliderComponent {
    constructor(localizationService, injector, renderer, ngZone, hostElement) {
        this.localizationService = localizationService;
        this.injector = injector;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.hostElement = hostElement;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
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
        this.handleFocus = () => {
            this.focused = true;
            if (hasObservers(this.onFocus)) {
                this.ngZone.run(() => {
                    this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = () => {
            this.focused = false;
            if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
                this.ngZone.run(() => {
                    this.ngTouched();
                    this.onBlur.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.onWrapClick = (args) => {
            const target = args.target;
            if (!this.isDisabled && !(isButton(target) || isButton(target.parentNode))) {
                const value = eventValue(args, this.track.nativeElement, this.getProps());
                this.changeValue(value);
            }
        };
        /**
         * @hidden
         */
        this.ifEnabled = (callback, event) => {
            if (!this.isDisabled) {
                callback.call(this, event);
            }
        };
        /**
         * @hidden
         */
        this.onKeyDown = (e) => {
            const options = this.getProps();
            const { max, min } = options;
            const handler = this.keyBinding[e.keyCode];
            if (this.isDisabled || !handler) {
                return;
            }
            const value = handler(options);
            this.changeValue(Util.trimValue(max, min, value));
            e.preventDefault();
        };
        this.ngChange = (_) => { };
        this.ngTouched = () => { };
        this.decreaseValue = () => {
            this.changeValue(decreaseValueToStep(this.value, this.getProps()));
        };
        this.increaseValue = () => {
            this.changeValue(increaseValueToStep(this.value, this.getProps()));
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    get horizontalClass() {
        return !this.vertical;
    }
    get verticalClass() {
        return this.vertical;
    }
    get sliderClass() {
        return true;
    }
    get transitionsClass() {
        return true;
    }
    get widgetClass() {
        return true;
    }
    get stateDefaultClass() {
        return true;
    }
    get disabledClass() {
        return this.disabled;
    }
    get ariaDisabled() {
        return this.disabled ? true : undefined;
    }
    get ariaReadonly() {
        return this.readonly ? true : undefined;
    }
    get ariaMin() {
        return this.min;
    }
    get ariaMax() {
        return this.max;
    }
    get ariaValue() {
        return this.value ? this.value : this.min;
    }
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    ngOnInit() {
        this.subscriptions.add(this.localizationService
            .changes
            .subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.sizeComponent(false);
        }));
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    }
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
    focus() {
        invokeElementMethod(this.wrapper, 'focus');
    }
    /**
     * Blurs the Slider.
     */
    blur() {
        invokeElementMethod(this.wrapper, 'blur');
    }
    ngOnChanges(changes) {
        if (isChanged('value', changes)) {
            this.sizeComponent(false);
        }
    }
    ngAfterViewInit() {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.showButtons) {
            this.setValueChangeInterval(this.increaseButton.nativeElement, () => this.increaseValue());
            this.setValueChangeInterval(this.decreaseButton.nativeElement, () => this.decreaseValue());
        }
        this.sizeComponent(false);
        if (this.ticks) {
            this.ticks.tickElements
                .changes
                .subscribe(() => this.sizeComponent(false));
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    /**
     * @hidden
     */
    get incrementMessage() {
        return this.incrementTitle || this.localizationService.get('increment');
    }
    /**
     * @hidden
     */
    get decrementMessage() {
        return this.decrementTitle || this.localizationService.get('decrement');
    }
    /**
     * @hidden
     */
    get dragHandleMessage() {
        return this.dragHandleTitle || this.localizationService.get('dragHandle');
    }
    /**
     * @hidden
     */
    handleDragPress(args) {
        if (args.originalEvent) {
            args.originalEvent.preventDefault();
        }
        this.focus();
    }
    /**
     * @hidden
     */
    onHandleDrag(args) {
        this.dragging = true;
        this.changeValue(eventValue(args, this.track.nativeElement, this.getProps()));
    }
    /**
     * @hidden
     */
    onHandleRelease() {
        this.dragging = false; //needed for animation
    }
    //ngModel binding
    /**
     * @hidden
     */
    writeValue(value) {
        this.value = value;
        this.sizeComponent(true);
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.ngChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.ngTouched = fn;
    }
    /**
     * @hidden
     */
    changeValue(value) {
        if (!areSame(this.value, value)) {
            this.ngZone.run(() => {
                this.value = value;
                this.ngChange(value);
                this.valueChange.emit(value);
                this.sizeComponent(true);
            });
        }
    }
    /**
     * @hidden
     */
    sizeComponent(animate) {
        if (!isDocumentAvailable()) {
            return;
        }
        const wrapper = this.wrapper.nativeElement;
        const props = this.getProps();
        const model = new SliderModel(props, wrapper, this.track.nativeElement);
        model.resizeTrack();
        if (this.ticks) { //for case when tickPlacement: none
            model.resizeTicks(this.ticksContainer.nativeElement, this.ticks.tickElements.map(element => element.nativeElement));
        }
        this.handleAnimation(animate); //first time the widget is initialized the selection should not be animated
        model.positionHandle(this.draghandle.nativeElement);
        model.positionSelection(this.draghandle.nativeElement, this.sliderSelection.nativeElement);
        if (this.fixedTickWidth) {
            model.resizeWrapper();
        }
    }
    /**
     * @hidden
     */
    get isDisabled() {
        return this.disabled || this.readonly;
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    get reverse() {
        return this.localizationService.rtl && !this.vertical;
    }
    get keyBinding() {
        const reverse = this.reverse;
        return {
            [Keys.ArrowLeft]: reverse ? increment : decrement,
            [Keys.ArrowRight]: reverse ? decrement : increment,
            [Keys.ArrowDown]: decrement,
            [Keys.ArrowUp]: increment,
            [Keys.PageUp]: incrementLarge,
            [Keys.PageDown]: decrementLarge,
            [Keys.Home]: ({ min }) => min,
            [Keys.End]: ({ max }) => max
        };
    }
    set focused(value) {
        if (this.isFocused !== value && this.hostElement) {
            const element = this.hostElement.nativeElement;
            if (value) {
                this.renderer.addClass(element, FOCUSED);
            }
            else {
                this.renderer.removeClass(element, FOCUSED);
            }
            this.isFocused = value;
        }
    }
    set dragging(value) {
        if (this.isDragged !== value && this.sliderSelection && this.draghandle) {
            const sliderSelection = this.sliderSelection.nativeElement;
            const draghandle = this.draghandle.nativeElement;
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
    }
    setValueChangeInterval(element, callback) {
        this.ngZone.runOutsideAngular(() => {
            const mousedown = fromEvent(element, 'mousedown');
            const mouseup = fromEvent(element, 'mouseup');
            const mouseout = fromEvent(element, 'mouseout');
            const subscription = mousedown.pipe(filter((e) => e.button === 0 && !this.isDisabled), concatMap(() => interval(150).pipe(startWith(-1), takeUntil(merge(mouseup, mouseout))))).subscribe(() => {
                this.focus();
                callback();
            });
            this.subscriptions.add(subscription);
        });
    }
    handleAnimation(animate) {
        let transition = '';
        if (!animate) {
            transition = 'none';
        }
        this.draghandle.nativeElement.style.transition = transition;
        this.sliderSelection.nativeElement.style.transition = transition;
    }
    getProps() {
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
    }
}
SliderComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSlider',
                providers: [
                    LocalizationService,
                    { provide: L10N_PREFIX, useValue: 'kendo.slider' },
                    { multi: true, provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SliderComponent) },
                    { provide: KendoInput, useExisting: forwardRef(() => SliderComponent) }
                ],
                selector: 'kendo-slider',
                template: `
        <ng-container kendoSliderLocalizedMessages
            i18n-increment="kendo.slider.increment|The title of the **Increase** button of the Slider."
            increment="increment"
            i18n-decrement="kendo.slider.decrement|The title of the **Decrease** button of the Slider."
            decrement="decrement"
            i18n-dragHandle="kendo.slider.dragHandle|The title of the drag handle of the Slider."
            dragHandle="Drag"
        >

        <div class="k-slider-wrap" #wrap
            [id]="focusableId"
            [class.k-slider-buttons]="showButtons"
            [class.k-slider-topleft]="tickPlacement === 'before'"
            [class.k-slider-bottomright]="tickPlacement === 'after'"
            [attr.tabindex]="(this.disabled ? undefined : tabIndex)"
            [kendoEventsOutsideAngular]="{ focus: handleFocus, blur: handleBlur, click: onWrapClick, keydown: onKeyDown }"
            >
            <a
                #decreaseButton
                *ngIf="showButtons"
                class="k-button k-button-decrease"
                [title]="decrementMessage"
                [attr.aria-label]="decrementMessage"
            >
                <span class="k-icon"
                    [class.k-i-arrow-w]="!vertical"
                    [class.k-i-arrow-s]="vertical"
                >
                </span>
            </a>
            <a
                *ngIf="showButtons"
                #increaseButton
                class="k-button k-button-increase"
                [title]="incrementMessage"
                [attr.aria-label]="incrementMessage"
            >
                <span class="k-icon"
                    [class.k-i-arrow-e]="!vertical"
                    [class.k-i-arrow-n]="vertical"
                >
                </span>
            </a>
            <ul kendoSliderTicks
                #ticks
                *ngIf="tickPlacement !== 'none'"
                [tickTitle]="title"
                [vertical]="vertical"
                [step]="smallStep"
                [largeStep]="largeStep"
                [min]="min"
                [max]="max"
                [labelTemplate]="labelTemplate?.templateRef"
            >
            </ul>
        <div #track class="k-slider-track">
            <div #sliderSelection class="k-slider-selection">
            </div>
                <a #draghandle
                    [style.touch-action]="isDisabled ? '' : 'none'"
                    class="k-draghandle"
                    [title]="dragHandleMessage"
                    kendoDraggable
                    (kendoPress)="ifEnabled(handleDragPress ,$event)"
                    (kendoDrag)="ifEnabled(onHandleDrag ,$event)"
                    (kendoRelease)="ifEnabled(onHandleRelease, $event)"
                ></a>
            </div>

            <kendo-resize-sensor (resize)="sizeComponent(false)"></kendo-resize-sensor>
        </div>
  `
            },] },
];
/** @nocollapse */
SliderComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: Injector },
    { type: Renderer2 },
    { type: NgZone },
    { type: ElementRef }
];
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
