import { ChangeDetectorRef, EventEmitter, ElementRef, OnInit, OnDestroy, OnChanges, Renderer2, NgZone, Injector } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { Arrow } from './arrow.enum';
import { DateInputFormatPlaceholder } from './models/format-placeholder.model';
import { DateInputIncrementalSteps } from './models/incremental-steps.model';
import { PickerService } from '../common/picker.service';
/**
 * Represents the [Kendo UI DateInput component for Angular]({% slug overview_dateinput %}#toc-basic-usage).
 */
export declare class DateInputComponent implements OnInit, ControlValueAccessor, OnChanges, OnDestroy {
    private cdr;
    private intl;
    private renderer;
    private element;
    private ngZone;
    private injector;
    localization: LocalizationService;
    private pickerService?;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Sets or gets the `disabled` property of the DateInput and
     * determines whether the component is active
     * ([see example]({% slug disabled_dateinput %})).
     */
    disabled: boolean;
    /**
     * Sets or gets the read-only state of the DateInput
     * ([see example]({% slug readonly_dateinput %})).
     */
    readonly: boolean;
    /**
     * Sets the title of the input element of the DateInput.
     */
    title: string;
    /**
     * Sets or gets the `tabIndex` property of the DateInput.
     * .
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Specifies the date format that is used to display the input value
     * ([see example]({% slug formats_dateinput %})).
     */
    format: string;
    /**
     * Defines the descriptions of the format sections in the input field.
     * For more information, refer to the article on
     * [placeholders]({% slug placeholders_dateinput %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     * <div class="row example-wrapper" style="min-height: 450px;">
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Full-length format description:</p>
     *    <kendo-dateinput formatPlaceholder="wide"></kendo-dateinput>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Narrow-length format description:</p>
     *    <kendo-dateinput formatPlaceholder="narrow"></kendo-dateinput>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Short-length format description:</p>
     *    <kendo-dateinput formatPlaceholder="short"></kendo-dateinput>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Display defined format:</p>
     *    <kendo-dateinput format="MM/dd/yyyy" formatPlaceholder="formatPattern"></kendo-dateinput>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Custom defined format descriptions</p>
     *    <kendo-dateinput format="G"
     *      [formatPlaceholder]="{
     *        year: 'y', month: 'M', day: 'd',
     *        hour: 'h', minute: 'm', second: 's'
     *      }"
     *    ></kendo-dateinput>
     *  </div>
     * </div>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    formatPlaceholder: DateInputFormatPlaceholder;
    /**
     * Specifies the hint the DateInput displays when its value is `null`.
     * For more information, refer to the article on
     * [placeholders]({% slug placeholders_dateinput %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-dateinput placeholder="Enter birth date..."></kendo-dateinput>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    placeholder: string;
    /**
     * Configures the incremental steps of the DateInput.
     * For more information, refer to the article on
     * [incremental steps]({% slug incrementalsteps_dateinput %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-dateinput [steps]="steps"></kendo-dateinput>
     * `
     * })
     * class AppComponent {
     *   public steps = { year: 10, month: 1, day: 5 };
     * }
     * ```
     */
    steps: DateInputIncrementalSteps;
    /**
     * Specifies the biggest date that is valid
     * ([see example]({% slug dateranges_dateinput %})).
     */
    max: Date;
    /**
     * Specifies the smallest date that is valid
     * ([see example]({% slug dateranges_dateinput %})).
     */
    min: Date;
    /**
     * Determines whether the built-in min or max validators are to be enforced when a form is being validated.
     */
    rangeValidation: boolean;
    /**
     * @hidden
     * Based on the min and max values, specifies whether the value will be auto-corrected while typing.
     */
    autoCorrect: boolean;
    /**
     * Specifies the value of the DateInput component.
     *
     * > The `value` has to be a valid [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    value: Date;
    /**
     * Specifies whether the **Up** and **Down** spin buttons will be rendered.
     * For more information, refer to the article on
     * [spinner buttons]({% slug spinbuttons_dateinput %}).
     */
    spinners: boolean;
    /**
     * @hidden
     */
    isPopupOpen: boolean;
    /**
     * @hidden
     */
    hasPopup: boolean;
    /**
     * Fires each time the user selects a new value.
     * For more information, refer to the section on
     * [events]({% slug overview_dateinput %}#toc-events).
     */
    valueChange: EventEmitter<Date>;
    /**
     * Fires each time the user selects a new value.
     * For more information, refer to the section on
     * [events]({% slug overview_dateinput %}#toc-events).
     */
    valueUpdate: EventEmitter<Date>;
    /**
     * Fires each time the user focuses the input element.
     * For more information, refer to the section on
     * [events]({% slug overview_dateinput %}#toc-events).
     *
     * > To wire the event programmatically, use the `onFocus` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-dateinput (focus)="handleFocus()"></kendo-dateinput>
     * `
     * })
     * class AppComponent {
     *   public handleFocus(): void {
     *      console.log("Component is focused");
     *   }
     * }
     * ```
     *
     */
    onFocus: EventEmitter<null>;
    /**
     * Fires each time the input element gets blurred.
     * For more information, refer to the section on
     * [events]({% slug overview_dateinput %}#toc-events).
     *
     * > To wire the event programmatically, use the `onBlur` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-dateinput (blur)="handleBlur()"></kendo-dateinput>
     * `
     * })
     * class AppComponent {
     *   public handleBlur(): void {
     *      console.log("Component is blurred");
     *   }
     * }
     * ```
     *
     */
    onBlur: EventEmitter<null>;
    /**
     * @hidden
     */
    dateInput: ElementRef;
    /**
     * @hidden
     */
    wrap: ElementRef;
    readonly wrapperClass: boolean;
    readonly disabledClass: boolean;
    readonly inputElement: any;
    readonly inputValue: string;
    isActive: boolean;
    arrow: any;
    ariaValueMin: number;
    ariaValueMax: number;
    ariaValueNow: number;
    ariaValueText: string;
    arrowDirection: Arrow;
    formatSections: {
        [x: string]: boolean;
    };
    hasMousedown: boolean;
    protected currentValue: string;
    protected currentFormat: string;
    private backspace;
    private resetSegmentValue;
    private resolvedPromise;
    private symbolsMap;
    private minValidateFn;
    private maxValidateFn;
    private _min;
    private _max;
    private _value;
    private _active;
    private kendoDate;
    private intlSubscription;
    private paste;
    private domEvents;
    private control;
    constructor(cdr: ChangeDetectorRef, intl: IntlService, renderer: Renderer2, element: ElementRef, ngZone: NgZone, injector: Injector, localization: LocalizationService, pickerService?: PickerService);
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty
     */
    isEmpty(): boolean;
    /**
     * @hidden
     */
    containsElement(element: any): boolean;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    writeValue(value: Date): void;
    /**
     * @hidden
     */
    triggerChange(): void;
    /**
     * @hidden
     */
    notify(): void;
    /**
     * @hidden
     */
    registerOnChange(fn: () => any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: () => any): void;
    /**
     * Focuses the DateInput component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="dateinput.focus()">Focus date input</button>
     *  <kendo-dateinput #dateinput></kendo-dateinput>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    focus(): void;
    /**
     * Blurs the DateInput component.
     */
    blur(): void;
    /**
     * @hidden
     */
    handleButtonClick(offset: number): void;
    /**
     * @hidden
     */
    modifyDateSegmentValue(offset: number): void;
    /**
     * @hidden
     */
    protected switchDateSegment(offset: number): boolean;
    /**
     * @hidden
     */
    protected selectDateSegment(symbol: string): void;
    /**
     * @hidden
     */
    handleClick(): void;
    /**
     * @hidden
     */
    handleDragAndDrop(args: any): void;
    /**
     * @hidden
     */
    handleMousedown(): void;
    /**
     * @hidden
     */
    handleFocus(args: any): void;
    /**
     * @hidden
     */
    handleBlur(args: any): void;
    private getKendoDate;
    private dateSymbolMap;
    private updateElementValue;
    private ngChange;
    private ngTouched;
    private hasChanged;
    private caret;
    private selectNearestSegment;
    private verifyRange;
    private verifyValue;
    private putDateInRange;
    private updateFormatSections;
    private intlChange;
    private updateOnPaste;
    private bindEvents;
    private handleMouseWheel;
    private handlePaste;
    private handleKeydown;
    private handleInput;
    private emitFocus;
    private emitBlur;
}
