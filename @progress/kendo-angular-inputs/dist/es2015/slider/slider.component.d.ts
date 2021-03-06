/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterViewInit, Renderer2, ElementRef, EventEmitter, OnChanges, OnDestroy, NgZone, Injector } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { LabelTemplateDirective } from './label-template.directive';
/**
 * Represents the [Kendo UI Slider component for Angular]({% slug overview_slider %}).
 */
export declare class SliderComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {
    private localizationService;
    private injector;
    private renderer;
    private ngZone;
    private hostElement;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Sets the title of the **Increase** button of the Slider ([see example]({% slug sidebuttons_slider %}#toc-titles)).
     */
    incrementTitle: string;
    /**
     * Sets the title of the **Decrease** button of the Slider ([see example]({% slug sidebuttons_slider %}#toc-titles)).
     */
    decrementTitle: string;
    /**
     * Renders the arrow side buttons of the Slider ([see example]({% slug sidebuttons_slider %}#toc-hidden-state)).
     * When `showButtons` is set to `false`, the buttons are not displayed.
     */
    showButtons: boolean;
    /**
     * Denotes the location of the tick marks in the Slider ([see example]({% slug ticks_slider %}#toc-placement)).
     *
     * The available options are:
     * * `before`&mdash;The tick marks are located to the top side of the horizontal track or to the left side of a vertical track.
     * * `after`&mdash;The tick marks are located to the bottom side of the horizontal track or to the right side of the vertical track.
     * * `both`&mdash;The tick marks are located on both sides of the track.
     * * `none`&mdash;The tick marks are not visible. The actual elements are not added to the DOM tree.
     */
    tickPlacement: string;
    /**
     * Defines the title of the ticks ([see example]({% slug ticks_slider %}#toc-titles)). The default title
     * for each tick is its Slider value. If you use a callback function, the function accepts an argument
     * that holds the value of the component and returns a string with the new title.
     */
    title: (value: number) => string;
    /**
     * Changes the `title` attribute of the drag handle so that it can be localized.
     */
    dragHandleTitle: string;
    /**
     * If `vertical` is set to `true`, the orientation of the Slider changes from horizontal to vertical
     * ([see example]({% slug orientation_slider %})).
     */
    vertical: boolean;
    /**
     * The minimum value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
     * The attribute accepts both integers and floating-point numbers.
     */
    min: number;
    /**
     * The maximum value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
     * The attribute accepts both integers and floating-point numbers.
     */
    max: number;
    /**
     * The step value of the Slider ([see example]({% slug predefinedsteps_slider %}#toc-small-steps)).
     * Accepts positive values only. Can be an integer or a floating-point number.
     */
    smallStep: number;
    /**
     * Specifies that every n<sup>th</sup> tick will be large and will have a label
     * ([see example]({% slug predefinedsteps_slider %}#toc-large-steps)).
     * Accepts positive integer values only.
     */
    largeStep: number;
    /**
     * Sets the width between each two ticks along the track ([see example]({% slug ticks_slider %}#toc-width)). The value
     * has to be set in pixels. If no `fixedTickWidth` is provided, the Slider automatically adjusts the tick width to
     * accommodate the elements within the size of the component.
     */
    fixedTickWidth: number;
    /**
     * Determines whether the Slider is disabled ([see example]({% slug disabledstate_slider %})).
     */
    disabled: boolean;
    /**
     * Determines whether the Slider is in its read-only state ([see example]({% slug readonly_slider %})).
     */
    readonly: boolean;
    /**
     * The current value of the Slider when it is initially displayed.
     * The component can use either NgModel or the `value` binding but not both of them at the same time.
     */
    value: number;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the Slider.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Fires each time the user focuses the `input` element.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the `input` element gets blurred.
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the user selects a new value.
     */
    valueChange: EventEmitter<any>;
    wrapper: ElementRef;
    track: ElementRef;
    draghandle: ElementRef;
    sliderSelection: ElementRef;
    ticksContainer: ElementRef;
    ticks: any;
    decreaseButton: ElementRef;
    increaseButton: ElementRef;
    labelTemplate: LabelTemplateDirective;
    direction: string;
    readonly horizontalClass: boolean;
    readonly verticalClass: boolean;
    readonly sliderClass: boolean;
    readonly transitionsClass: boolean;
    readonly widgetClass: boolean;
    readonly stateDefaultClass: boolean;
    readonly disabledClass: boolean;
    readonly ariaDisabled: boolean;
    readonly ariaReadonly: boolean;
    readonly ariaMin: number;
    readonly ariaMax: number;
    readonly ariaValue: number;
    protected subscriptions: Subscription;
    protected isFocused: boolean;
    protected isDragged: boolean;
    protected control: NgControl;
    constructor(localizationService: LocalizationService, injector: Injector, renderer: Renderer2, ngZone: NgZone, hostElement: ElementRef);
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    handleFocus: () => void;
    /**
     * @hidden
     */
    handleBlur: () => void;
    ngOnInit(): void;
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
    focus(): void;
    /**
     * Blurs the Slider.
     */
    blur(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    readonly incrementMessage: string;
    /**
     * @hidden
     */
    readonly decrementMessage: string;
    /**
     * @hidden
     */
    readonly dragHandleMessage: string;
    /**
     * @hidden
     */
    onWrapClick: (args: any) => void;
    /**
     * @hidden
     */
    ifEnabled: Function;
    /**
     * @hidden
     */
    handleDragPress(args: any): void;
    /**
     * @hidden
     */
    onHandleDrag(args: any): void;
    /**
     * @hidden
     */
    onKeyDown: (e: any) => void;
    /**
     * @hidden
     */
    onHandleRelease(): void;
    /**
     * @hidden
     */
    writeValue(value: number): void;
    /**
     * @hidden
     */
    registerOnChange(fn: () => any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: () => any): void;
    /**
     * @hidden
     */
    changeValue(value: number): void;
    /**
     * @hidden
     */
    sizeComponent(animate: boolean): void;
    /**
     * @hidden
     */
    readonly isDisabled: boolean;
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    private readonly reverse;
    private readonly keyBinding;
    private focused;
    private dragging;
    private setValueChangeInterval;
    private ngChange;
    private ngTouched;
    private decreaseValue;
    private increaseValue;
    private handleAnimation;
    private getProps;
}
