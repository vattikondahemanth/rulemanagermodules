import { ChangeDetectorRef, ElementRef, TemplateRef, EventEmitter, Renderer2, ViewContainerRef, NgZone, OnInit, OnChanges, OnDestroy, Injector } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { PopupSettings } from '../popup-settings.model';
import { PreventableEvent } from '../preventable-event';
import { CalendarView } from '../calendar/models/view.type';
import { CellTemplateDirective } from '../calendar/templates/cell-template.directive';
import { MonthCellTemplateDirective } from '../calendar/templates/month-cell-template.directive';
import { YearCellTemplateDirective } from '../calendar/templates/year-cell-template.directive';
import { DecadeCellTemplateDirective } from '../calendar/templates/decade-cell-template.directive';
import { CenturyCellTemplateDirective } from '../calendar/templates/century-cell-template.directive';
import { WeekNumberCellTemplateDirective } from '../calendar/templates/weeknumber-cell-template.directive';
import { HeaderTitleTemplateDirective } from '../calendar/templates/header-title-template.directive';
import { NavigationItemTemplateDirective } from '../calendar/templates/navigation-item-template.directive';
import { PickerService } from '../common/picker.service';
import { DateInputFormatPlaceholder } from '../dateinput/models/format-placeholder.model';
/**
 * Represents the [Kendo UI DatePicker component for Angular]({% slug overview_datepicker %}#toc-basic-usage).
 */
export declare class DatePickerComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    zone: NgZone;
    localization: LocalizationService;
    private cdr;
    private popupService;
    private element;
    private renderer;
    private injector;
    private pickerService;
    private touchEnabled;
    container: ViewContainerRef;
    popupTemplate: TemplateRef<any>;
    wrapper: ElementRef;
    /**
     * @hidden
     */
    cellTemplate: CellTemplateDirective;
    /**
     * @hidden
     */
    cellTemplateRef: CellTemplateDirective;
    /**
     * @hidden
     */
    monthCellTemplate: MonthCellTemplateDirective;
    /**
     * @hidden
     */
    monthCellTemplateRef: MonthCellTemplateDirective;
    /**
     * @hidden
     */
    yearCellTemplate: YearCellTemplateDirective;
    /**
     * @hidden
     */
    yearCellTemplateRef: YearCellTemplateDirective;
    /**
     * @hidden
     */
    decadeCellTemplate: DecadeCellTemplateDirective;
    /**
     * @hidden
     */
    decadeCellTemplateRef: DecadeCellTemplateDirective;
    /**
     * @hidden
     */
    centuryCellTemplate: CenturyCellTemplateDirective;
    /**
     * @hidden
     */
    centuryCellTemplateRef: CenturyCellTemplateDirective;
    /**
     * @hidden
     */
    weekNumberTemplate: WeekNumberCellTemplateDirective;
    /**
     * @hidden
     */
    weekNumberTemplateRef: WeekNumberCellTemplateDirective;
    /**
     * @hidden
     */
    headerTitleTemplate: HeaderTitleTemplateDirective;
    /**
     * @hidden
     */
    headerTitleTemplateRef: HeaderTitleTemplateDirective;
    /**
     * @hidden
     */
    navigationItemTemplate: NavigationItemTemplateDirective;
    /**
     * @hidden
     */
    navigationItemTemplateRef: NavigationItemTemplateDirective;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Defines the active view that the Calendar initially renders
     * ([see example]({% slug activeview_datepicker %})).
     * By default, the active view is `month`.
     *
     * > You have to set `activeView` within the `topView`-`bottomView` range.
     */
    activeView: CalendarView;
    /**
     * Defines the bottommost Calendar view, to which the user can navigate
     * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
     */
    bottomView: CalendarView;
    /**
     * Defines the topmost Calendar view, to which the user can navigate
     * ([see example]({% slug dates_datepicker %}#toc-partial-dates)).
     */
    topView: CalendarView;
    /**
     * Sets or gets the `disabled` property of the DatePicker and determines whether the component is active
     * ([see example]({% slug disabled_datepicker %})).
     */
    disabled: boolean;
    /**
     * Sets the read-only state of the DatePicker
     * ([see example]({% slug readonly_datepicker %})).
     */
    readonly: boolean;
    /**
     * Configures the popup options of the DatePicker.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets or gets the `navigation` property of the Calendar
     * and determines whether the navigation side-bar is displayed.
     * ([see example]({% slug sidebar_datepicker %})).
     */
    navigation: boolean;
    /**
     * Specifies the smallest valid date
     * ([see example]({% slug dateranges_datepicker %})).
     */
    min: Date;
    /**
     * Specifies the biggest valid date
     * ([see example]({% slug dateranges_datepicker %})).
     */
    max: Date;
    /**
     * Specifies the focused date of the Calendar component
     * ([see example]({% slug dates_datepicker %})).
     */
    focusedDate: Date;
    /**
     * Specifies the value of the DatePicker component.
     *
     * > The `value` has to be a valid
     * [JavaScript `Date`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) instance.
     */
    value: Date;
    /**
     * Specifies the date format that is used to display the input value
     * ([see example]({% slug formats_datepicker %})).
     */
    format: string;
    /**
     * Defines the descriptions of the format sections in the input field.
     * For more information, refer to the article on
     * [placeholders]({% slug placeholders_datepicker %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     * <div class="row example-wrapper" style="min-height: 450px;">
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Full-length format description:</p>
     *    <kendo-datepicker formatPlaceholder="wide"></kendo-datepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Narrow-length format description:</p>
     *    <kendo-datepicker formatPlaceholder="narrow"></kendo-datepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Short-length format description:</p>
     *    <kendo-datepicker formatPlaceholder="short"></kendo-datepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Display defined format:</p>
     *    <kendo-datepicker format="MM/dd/yyyy" formatPlaceholder="formatPattern"></kendo-datepicker>
     *  </div>
     *
     *  <div class="col-xs-12 col-md-6 example-col">
     *    <p>Custom defined format descriptions</p>
     *    <kendo-datepicker format="MM/dd/yyyy"
     *      [formatPlaceholder]="{ year: 'y', month: 'M', day: 'd' }"
     *    ></kendo-datepicker>
     *  </div>
     * </div>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    formatPlaceholder: DateInputFormatPlaceholder;
    /**
     * Specifies the hint the DatePicker displays when its value is `null`.
     * For more information, refer to the article on
     * [placeholders]({% slug placeholders_datepicker %}).
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-datepicker placeholder="Enter birth date..."></kendo-datepicker>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    placeholder: string;
    /**
     * Sets or gets the `tabindex` property of the DatePicker.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Sets the title of the input element of the DatePicker.
     */
    title: string;
    /**
     * Determines whether the built-in min or max validators are enforced when validating a form.
     */
    rangeValidation: boolean;
    /**
     * Determines whether to display a week number column in the `month` view of the Calendar
     * ([see example]({% slug weeknumcolumn_datepicker %})).
     */
    weekNumber: boolean;
    /**
     * Fires each time the user selects a new value.
     * For more information, refer to the section on
     * [events]({% slug overview_datepicker %}#toc-events).
     */
    valueChange: EventEmitter<Date>;
    /**
     * Fires each time the user focuses the input element.
     * For more information, refer to the section on
     * [events]({% slug overview_datepicker %}#toc-events).
     *
     * > To wire the event programmatically, use the `onFocus` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-datepicker (focus)="handleFocus()"></kendo-datepicker>
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
     * Fires each time the input element gets blurred.
     * For more information, refer to the section on
     * [events]({% slug overview_datepicker %}#toc-events).
     *
     * > To wire the event programmatically, use the `onBlur` property.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <kendo-datepicker (blur)="handleBlur()"></kendo-datepicker>
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
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel the event, the popup will remain closed.
     * For more information, refer to the section on
     * [events]({% slug overview_datepicker %}#toc-events).
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel the event, the popup will remain open.
     * For more information, refer to the section on
     * [events]({% slug overview_datepicker %}#toc-events).
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * @hidden
     */
    readonly wrapperClasses: boolean;
    /**
     * @hidden
     */
    readonly disabledClass: boolean;
    popupUID: string;
    popupRef: PopupRef;
    isActive: boolean;
    show: boolean;
    private _popupSettings;
    private _show;
    private _value;
    private _active;
    private onChange;
    private onTouched;
    private minValidateFn;
    private maxValidateFn;
    private resolvedPromise;
    private popupKeyDownHandler;
    private subscription;
    private pickerSubscriptions;
    private localizationChangeSubscription;
    private control;
    private domEvents;
    constructor(zone: NgZone, localization: LocalizationService, cdr: ChangeDetectorRef, popupService: PopupService, element: ElementRef, renderer: Renderer2, injector: Injector, pickerService: PickerService, touchEnabled: boolean);
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    /**
     * @hidden
     */
    writeValue(value: Date): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /**
     * Focuses the DatePicker component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="datepicker.focus()">Focus date picker</button>
     *  <kendo-datepicker #datepicker></kendo-datepicker>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    focus(): void;
    /**
     * Blurs the DatePicker component.
     */
    blur(): void;
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to show or hide the popup,
     * the `open` and `close` events do not fire.
     *
     * @param show - The state of the popup.
     */
    toggle(show?: boolean): void;
    /**
     * @hidden
     */
    handleIconClick(event: MouseEvent): void;
    /**
     * @hidden
     */
    handleMousedown(args: any): void;
    /**
     * @hidden
     */
    handleChange(value: Date): void;
    /**
     * @hidden
     */
    handleInputChange(value: Date): void;
    /**
     * @hidden
     */
    readonly popupClasses: string[];
    /**
     * @hidden
     */
    readonly appendTo: ViewContainerRef;
    readonly input: any;
    readonly calendar: any;
    /**
     * @hidden
     */
    mergeTime(value: Date): Date;
    private togglePopup;
    private _toggle;
    private focusInput;
    private toggleFocus;
    private verifySettings;
    private verifyValue;
    private bindEvents;
    private handleFocus;
    private handleBlur;
    private blurComponent;
    private handleKeydown;
    private handleSameSelection;
}
