/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, OnChanges, Renderer2, SimpleChanges, NgZone, Injector } from '@angular/core';
import { AbstractControl, ControlValueAccessor, Validator } from '@angular/forms';
import { MaskingService } from './masking.service';
/**
 * Represents the [Kendo UI MaskedTextBox component for Angular]({% slug overview_maskedtextbox %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *      <kendo-maskedtextbox
 *          [mask]="mask"
 *          [value]="value">
 *      </kendo-maskedtextbox>
 *     `
 * })
 *
 * class AppComponent {
 *  public value: string = "9580128055807792";
 *  public mask: string = "0000-0000-0000-0000";
 * }
 * ```
 */
export declare class MaskedTextBoxComponent implements ControlValueAccessor, OnChanges, Validator {
    private service;
    private renderer;
    private hostElement;
    private ngZone;
    private injector;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Determines whether the MaskedTextBox is disabled ([see example]({% slug disabled_maskedtextbox %})).
     */
    disabled: boolean;
    /**
     * Determines whether the MaskedTextBox is in its read-only state ([see example]({% slug readonly_maskedtextbox %})).
     */
    readonly: boolean;
    /**
     * Sets the title of the `input` element.
     */
    title: string;
    direction: string;
    hostClasses: boolean;
    readonly hostDisabledClass: boolean;
    /**
     * Represents the current mask ([see example]({% slug value_maskedtextbox %})).
     * If no mask is set, the component behaves as a standard `type="text"` input.
     *
     * > If the mask allows for spaces, set the [`promptPlaceholder`]({% slug api_inputs_maskedtextboxcomponent %}#toc-promptplaceholder)
     * to a character that is not accepted by the mask.
     */
    mask: string;
    /**
     * Provides a value for the MaskedTextBox.
     */
    value: string;
    /**
     * Exposes the RegExp-based mask validation array ([see example]({% slug masks_maskedtextbox %})).
     */
    rules: {
        [key: string]: RegExp;
    };
    /**
     * Represents a prompt character for the masked value.
     * @default `_`
     */
    prompt: string;
    /**
     * Indicates a character which represents an empty position in the raw value.
     * @default ' '
     */
    promptPlaceholder: string;
    /**
     * Indicates whether to include literals in the raw value  ([see example]({% slug value_maskedtextbox %})).
     * @default false
     */
    includeLiterals: boolean;
    /**
     * Specifies if the mask should be shown on focus for empty value.
     */
    maskOnFocus: boolean;
    /**
     * Determines whether the built-in mask validator is enforced when a form is validated
     * ([see example]({% slug validation_maskedtextbox %})).
     * @default true
     */
    maskValidation: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Fires each time the user focuses the `input` element.
     *
     * > To wire the event programmatically, use the `onFocus` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-maskedtextbox (focus)="handleFocus()"></kendo-maskedtextbox>
     * `
     * })
     * class AppComponent {
     *   public handleFocus(): void {
     *      console.log("Component is focused");
     *   }
     * }
     * ```
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the `input` element gets blurred.
     *
     * > To wire the event programmatically, use the `onBlur` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-maskedtextbox (blur)="handleBlur()"></kendo-maskedtextbox>
     * `
     * })
     * class AppComponent {
     *   public handleBlur(): void {
     *      console.log("Component is blurred");
     *   }
     * }
     * ```
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the value changes.
     */
    valueChange: EventEmitter<string>;
    /**
     * Represents the `ElementRef` of the visible `input` element.
     */
    input: ElementRef;
    protected isFocused: boolean;
    private maskedValue;
    private focusClick;
    private defaultRules;
    private _rules;
    private isPasted;
    private selection;
    private control;
    constructor(service: MaskingService, renderer: Renderer2, hostElement: ElementRef, ngZone: NgZone, injector: Injector, rtl: boolean);
    ngOnInit(): void;
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the MaskedTextBox is empty.
     */
    isEmpty(): boolean;
    /**
     * @hidden
     */
    handleFocus: () => void;
    /**
     * @hidden
     */
    handleClick: () => void;
    /**
     * @hidden
     */
    handleBlur: () => void;
    /**
     * @hidden
     */
    handleDragDrop(): boolean;
    /**
     * Focuses the MaskedTextBox.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="maskedinput.focus()">Focus the input</button>
     *  <kendo-maskedtextbox #maskedinput></kendo-maskedtextbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    focus(): void;
    /**
     * Blurs the MaskedTextBox.
     */
    blur(): void;
    /**
     * @hidden
     */
    pasteHandler(e: any): void;
    /**
     * @hidden
     */
    inputHandler(e: any): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @hidden
     * Writes a new value to the element.
     */
    writeValue(value: string): void;
    /**
     * @hidden
     * Sets the function that will be called when a `change` event is triggered.
     */
    registerOnChange(fn: (_: any) => void): void;
    /**
     * @hidden
     * Sets the function that will be called when a `touch` event is triggered.
     */
    registerOnTouched(fn: () => void): void;
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
    validate(_: AbstractControl): any;
    /**
     * @hidden
     */
    updateValue(maskedValue: string): void;
    protected onChange: (_: any) => void;
    protected onTouched: () => void;
    private updateInput;
    private extractChanges;
    private updateService;
    private setSelection;
    private readonly emptyMask;
    private setFocusSelection;
    private focused;
    private normalizeValue;
}
