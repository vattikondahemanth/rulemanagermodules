/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-null-keyword */
/* tslint:disable:max-line-length */
/* tslint:disable:member-ordering */
import { Component, Renderer2, forwardRef, ElementRef, TemplateRef, Input, Output, EventEmitter, ContentChild, ViewChild, ViewContainerRef, HostBinding, isDevMode, Optional, Inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { GroupTemplateDirective } from './templates/group-template.directive';
import { FixedGroupTemplateDirective } from './templates/fixed-group-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { SelectionService } from './selection.service';
import { NavigationService } from './navigation.service';
import { DisabledItemsService } from './disabled-items.service';
import { merge, of, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, partition, tap, throttleTime } from 'rxjs/operators';
import { isChanged, isDocumentAvailable, KendoInput } from '@progress/kendo-angular-common';
import { isPresent, guid, getter, isObject } from './util';
import { NavigationAction } from './navigation-action';
import { Keys } from './common/keys';
import { PreventableEvent } from './common/preventable-event';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { TOUCH_ENABLED } from './touch-enabled';
import { ComboBoxMessages } from './error-messages';
import { FilterableDropDownComponentBase } from './filterable-base.component';
import { DataService } from './data.service';
import { ListComponent } from './list.component';
import { normalizeVirtualizationSettings } from './virtualization-settings';
/**
 * @hidden
 */
export const COMBOBOX_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: forwardRef(() => ComboBoxComponent)
};
/**
 * Represents the [Kendo UI ComboBox component for Angular]({% slug overview_combobox %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export class ComboBoxComponent {
    constructor(localization, popupService, selectionService, navigationService, disabledItemsService, dataService, _zone, cdr, renderer, wrapper, touchEnabled) {
        this.localization = localization;
        this.popupService = popupService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.disabledItemsService = disabledItemsService;
        this.dataService = dataService;
        this._zone = _zone;
        this.cdr = cdr;
        this.renderer = renderer;
        this.touchEnabled = touchEnabled;
        this.selected = [];
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Specifies whether the ComboBox allows user-defined values that are not present in the dataset
         * ([more information and examples]({% slug custom_values_combobox %})).
         * Defaults to `false`.
         */
        this.allowCustom = false;
        /**
         * A user-defined callback which returns normalized custom values.
         * Typically used when the data items are different from type `string`.
         * @param { Any } value - The custom value defined by the user.
         * @returns { Any }
         *
         * @example
         * ```ts
         * import { map } from 'rxjs/operators';
         *
         * _@Component({
         * selector: 'my-app',
         * template: `
         *   <kendo-combobox
         *       [allowCustom]="true"
         *       [data]="listItems"
         *       [textField]="'text'"
         *       [valueField]="'value'"
         *       [valueNormalizer]="valueNormalizer"
         *       (valueChange)="onValueChange($event)"
         *   >
         *   </kendo-combobox>
         * `
         * })
         *
         * class AppComponent {
         *   public listItems: Array<{ text: string, value: number }> = [
         *       { text: "Small", value: 1 },
         *       { text: "Medium", value: 2 },
         *       { text: "Large", value: 3 }
         *   ];
         *
         *   public onValueChange(value) {
         *       console.log("valueChange : ", value);
         *   }
         *
         *   public valueNormalizer = (text$: Observable<string>) => text$.pipe(map((text: string) => {
         *      return { ProductID: null, ProductName: text };
         *   }));
         *
         * }
         * ```
         */
        this.valueNormalizer = (text) => text.pipe(map((userInput) => userInput));
        /**
         * The hint that is displayed when the component is empty.
         *
         */
        this.placeholder = "";
        /**
         * Sets the height of the suggestions list. By default, `listHeight` is 200px.
         *
         * > The `listHeight` property affects only the list of suggestions and not the whole popup container.
         * > To set the height of the popup container, use `popupSettings.height`.
         */
        this.listHeight = 200;
        /**
         * Enables the auto-completion of the text based on the first data item.
         */
        this.suggest = false;
        /**
         * If set to `true`, renders a button on hovering over the component.
         * Clicking this button resets the value of the component to `undefined` and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         */
        this.readonly = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Enables the [filtering]({% slug filtering_combobox %}) functionality.
         * If set to `true`, the component emits the `filterChange` event.
         */
        this.filterable = false;
        /**
         * Fires each time the value is changed&mdash;
         * when the component is blurred or the value is cleared through the **Clear** button
         * ([see example]({% slug overview_combobox %}#toc-events)).
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time an item selection is changed
         * ([see example]({% slug overview_combobox %}#toc-events)).
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires each time the user types in the input field.
         * You can filter the source based on the passed filtration value
         * ([see example]({% slug overview_combobox %}#toc-events)).
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the user focuses the ComboBox.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the ComboBox gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        this.widgetClasses = true;
        this.isFocused = false;
        this.listBoxId = guid();
        this.optionPrefix = guid();
        this.onChangeCallback = (_) => { };
        this.onTouchedCallback = (_) => { };
        this._filtering = false;
        this._text = "";
        this._open = false;
        this._popupSettings = { animate: true };
        this.popupMouseDownHandler = (event) => event.preventDefault();
        this.customValueSubject = new Subject();
        this.valueSubject = new Subject();
        this.clearValueSubject = new Subject();
        this.selectionSubject = new Subject();
        this.subs = new Subscription();
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.wrapper = wrapper.nativeElement;
        this.data = [];
    }
    get width() {
        let wrapperOffsetWidth = 0;
        if (isDocumentAvailable()) {
            wrapperOffsetWidth = this.wrapper.offsetWidth;
        }
        const width = this.popupSettings.width || wrapperOffsetWidth;
        const minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : `${wrapperOffsetWidth}px`;
        const maxWidth = isNaN(width) ? width : `${width}px`;
        return { min: minWidth, max: maxWidth };
    }
    get height() {
        const popupHeight = this.popupSettings.height;
        return isPresent(popupHeight) ? `${popupHeight}px` : 'auto';
    }
    set text(text) {
        this._text = isPresent(text) ? text.toString() : "";
    }
    get text() {
        return this._text;
    }
    /**
     * @hidden
     */
    togglePopup(open) {
        const isDisabled = this.disabled || this.readonly;
        const sameState = this.isOpen === open;
        if (isDisabled || sameState) {
            return;
        }
        const isDefaultPrevented = this.triggerPopupEvents(open);
        if (!isDefaultPrevented) {
            this._toggle(open);
        }
    }
    get activeDescendant() {
        const dataItem = this.dataService.itemAt(this.selectionService.focused);
        return this.optionPrefix + "-" + (dataItem ? getter(dataItem, this.valueField) : "");
    }
    get noDataLabel() {
        if (this.data.length === 0) {
            return this.noDataText;
        }
    }
    get clearTitle() {
        return this.localization.get('clearTitle');
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    /**
     * Sets the data of the ComboBox.
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
        this.dataService.data = this._data;
        this.setState();
        if (this._filtering) {
            if (this.text.length > 0) {
                this.search(this.text);
                if (this.selectionService.focused === -1 && this._data.length) {
                    this.selectionService.focused = this.firstFocusableIndex(0);
                }
            }
            else {
                this.selectionService.focused = -1;
            }
        }
        if (this.suggest && this.dataService.itemsCount && this.text) {
            this.suggestedText = getter(this.dataService.itemAt(0), this.textField);
        }
    }
    get data() {
        const virtual = this.virtual;
        if (virtual) {
            const start = virtual.skip || 0;
            const end = start + virtual.pageSize;
            // Use length instead of itemsCount because of the grouping.
            virtual.total = this.dataService.data.length;
            return this.dataService.data.slice(start, end);
        }
        return this.dataService.data;
    }
    /**
     * Sets the value of the ComboBox.
     * It can either be of the primitive (string, numbers) or of the complex (objects) type.
     * To define the type, use the `valuePrimitive` option.
     *
     * > All selected values which are not present in the dataset are considered custom values.
     * > When the `Enter` key is pressed or the component loses focus, custom values get dismissed unless `allowCustom` is set to `true`.
     */
    set value(newValue) {
        this.verifySettings(newValue);
        this._value = newValue;
        this.cdr.markForCheck();
    }
    get value() {
        return this._value;
    }
    /**
     * Configures the popup of the ComboBox.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used. If set to `auto`, the component automatically adjusts the width of the popup and no item labels are wrapped. The `auto` mode is not supported when virtual scrolling is enabled.
     * - `height: Number`&mdash;Sets the height of the popup container.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Defines a Boolean function that is executed for each data item in the component
     * ([see examples]({% slug disableditems_combobox %})). Determines whether the item will be disabled.
     */
    set itemDisabled(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`itemDisabled must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this.disabledItemsService.itemDisabled = fn;
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
    /**
     * Enables the [virtualization]({% slug virtualization_combobox %}) functionality.
     */
    set virtual(settings) {
        this._virtualSettings = normalizeVirtualizationSettings(settings);
    }
    get virtual() {
        return this._virtualSettings;
    }
    get clearable() {
        return this.clearButton;
    }
    get dir() {
        return this.direction;
    }
    ngOnInit() {
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        this.attachStreams();
        this.createSelectionStream();
        this.createValueStream();
        this.setMessages();
    }
    createValueStream() {
        const valueFrom = this.prop(this.valueField, this.valuePrimitive);
        const textFrom = this.prop(this.textField, this.valuePrimitive);
        const valueStream = this.valueSubject.pipe(filter((candidate) => {
            const current = valueFrom(this.value);
            const newValue = valueFrom(candidate);
            let newText = textFrom(candidate);
            if (!isPresent(this.value) && !isPresent(newValue)) {
                return false;
            }
            if (isPresent(newText)) {
                newText = newText.toString();
            }
            if (current === newValue && this.text === newText) {
                return false;
            }
            else {
                return true;
            }
        }), map((candidate) => {
            const newValue = valueFrom(candidate);
            const newText = textFrom(candidate);
            return {
                dataItem: candidate,
                text: newText,
                value: this.valuePrimitive ? newValue : candidate
            };
        }));
        const customValueStreams = partition(() => this.allowCustom)(this.customValueSubject.pipe(throttleTime(300)));
        const allowCustomValueStream = customValueStreams[0].pipe(tap(() => {
            this.loading = true;
            this.disabled = true;
            this.cdr.detectChanges();
        }), filter(() => {
            const hasChange = this.text !== valueFrom(this.value);
            this.loading = hasChange;
            this.disabled = hasChange;
            return hasChange;
        }), this.valueNormalizer, map((normalizedValue) => {
            return {
                custom: true,
                dataItem: normalizedValue,
                text: this.text,
                value: normalizedValue
            };
        }));
        const disableCustomValueStream = customValueStreams[1].pipe(map(() => {
            return {
                custom: true,
                dataItem: undefined,
                text: undefined,
                value: undefined
            };
        }));
        const clearValueStream = this.clearValueSubject.pipe(map(() => ({
            dataItem: undefined,
            text: undefined,
            value: undefined
        })));
        if (this.valueSubscription) {
            this.valueSubscription.unsubscribe();
        }
        const merged = merge(valueStream, allowCustomValueStream, disableCustomValueStream, clearValueStream);
        this.valueSubscription = merged.pipe(catchError(() => {
            this.dataItem = undefined;
            this.value = undefined;
            this.text = undefined;
            this.loading = false;
            this.disabled = false;
            this.emitSelectionChange(undefined);
            this.emitValueChange();
            this.createValueStream();
            return of(null);
        }))
            .subscribe((state) => {
            this.dataItem = state.dataItem;
            this.value = state.value;
            const textCleared = (isPresent(this.text) && this.text.length) && !isPresent(state.text);
            this.text = state.text;
            this.loading = false;
            this.disabled = false;
            if (this.filterable && !isPresent(state.value) && textCleared) {
                this.filterChange.emit("");
            }
            if (state.custom) {
                this.selectionService.focused = -1;
            }
            this.emitSelectionChange(state.custom ? undefined : this.dataItem);
            this.emitValueChange();
        });
    }
    attachStreams() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.subs.add(this.localization
            .changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.setMessages();
        }));
        this.subs.add(merge(this.navigationService.up, this.navigationService.down, this.navigationService.home, this.navigationService.end)
            .pipe(filter((event) => isPresent(event.index)))
            .subscribe((event) => this.navigate(event.index)));
        this.subs.add(this.navigationService.open.subscribe(() => this.togglePopup(true)));
        this.subs.add(this.navigationService.close.subscribe(() => this.togglePopup(false)));
        this.subs.add(this.navigationService.esc.subscribe(this.handleBlur.bind(this)));
        this.subs.add(this.navigationService.enter.pipe(tap((event) => {
            if (this.isOpen) {
                event.originalEvent.preventDefault();
            }
        }))
            .subscribe(this.handleEnter.bind(this)));
        this.subs.add(merge(this.selectionService.onChange, this.selectionService.onSelect.pipe(filter(_ => !this.isOpen)))
            .pipe(tap(_ => {
            this._filtering = false;
            this.togglePopup(false);
        }), map((event) => this.dataService.itemAt(event.indices[0])))
            .subscribe(dataItem => {
            this.change(dataItem);
        }));
        this.subs.add(this.selectionService.onSelect.pipe(filter(_ => this.isOpen), tap(_ => this._filtering = false), map((event) => this.dataService.itemAt(event.indices[0])))
            .subscribe(dataItem => {
            this.updateState({ dataItem });
            this.emitSelectionChange(dataItem);
        }));
    }
    ngOnDestroy() {
        this.destroyPopup();
        clearTimeout(this.messagesTimeout);
        this.subs.unsubscribe();
        [this.valueSubscription, this.selectionSubscription].forEach(sub => isPresent(sub) && sub.unsubscribe());
    }
    ngOnChanges(changes) {
        const virtual = this.virtual;
        const requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        this.verifySettings(this.value);
        if (isChanged("valueNormalizer", changes)) {
            this.createValueStream();
        }
        if (isChanged("value", changes)) {
            this.createSelectionStream();
        }
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        const STATE_PROPS = /(value|textField|valueField|valuePrimitive)/g;
        if (STATE_PROPS.test(Object.keys(changes).join())) {
            this.setState();
        }
    }
    /**
     * Focuses the ComboBox.
     */
    focus() {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    }
    /**
     * Blurs the ComboBox.
     */
    blur() {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    }
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup,
     * the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        Promise.resolve(null).then(() => {
            this._toggle(open);
            this.cdr.markForCheck();
        });
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this._open;
    }
    /**
     * Resets the value of the ComboBox.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    reset() {
        this.value = undefined;
        this.clearState();
        this.resetSelection();
        this.createSelectionStream();
    }
    /**
     * @hidden
     *
     * Used by the TextBoxContainer to determine if the floating label
     * should be rendered in the input when the component is not focused.
     */
    isEmpty() {
        return !(isPresent(this.text) && this.text.length);
    }
    /**
     * @hidden
     */
    clearValue(event) {
        event.stopImmediatePropagation();
        this.focus();
        this._filtering = true;
        this._previousDataItem = undefined;
        this.selectionService.resetSelection([]);
        this.clearValueSubject.next();
        this._filtering = false;
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.text = "";
        this.value = value === null ? undefined : value;
        this.setState();
        this.createSelectionStream();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     */
    get buttonClasses() {
        return this.loading ? 'k-i-loading' : this.iconClass || 'k-i-arrow-s';
    }
    /**
     * @hidden
     */
    onResize() {
        if (this.isOpen) {
            const popupWrapper = this.popupRef.popupElement;
            const { min, max } = this.width;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    }
    verifySettings(newValue) {
        const valueOrText = !isPresent(this.valueField) !== !isPresent(this.textField);
        if (!isDevMode()) {
            return;
        }
        if (this.valuePrimitive === true && isPresent(newValue) && typeof newValue === "object") {
            throw new Error(ComboBoxMessages.primitive);
        }
        if (this.valuePrimitive === false && isPresent(newValue) && typeof newValue !== "object") {
            throw new Error(ComboBoxMessages.object);
        }
        if (valueOrText) {
            throw new Error(ComboBoxMessages.textAndValue);
        }
        if (this.virtual && isNaN(this.virtual.itemHeight)) {
            throw new Error(ComboBoxMessages.noItemHeight);
        }
    }
    setState() {
        // Filtering in process, do nothing.
        if (this._filtering) {
            return;
        }
        const value = this.value;
        const valueField = this.valueField;
        const primitive = this.valuePrimitive;
        const resolved = this.findDataItem({ primitive, valueField, value });
        if (isPresent(resolved.dataItem)) {
            this.updateState({ dataItem: resolved.dataItem, confirm: true });
            this.resetSelection(resolved.index);
        }
        else if (isPresent(value) && this.allowCustom) {
            this.updateState({ dataItem: value });
            this.resetSelection(-1);
        }
        else if (this._previousDataItem && this.value) {
            this.updateState({ dataItem: this._previousDataItem });
            this.resetSelection();
        }
        else {
            this.clearState();
            this.resetSelection(-1);
        }
    }
    updateState({ dataItem, confirm = false }) {
        this.dataItem = dataItem;
        this.text = this.prop(this.textField, this.valuePrimitive)(dataItem);
        if (confirm) {
            this._previousDataItem = dataItem;
        }
    }
    clearState() {
        this.text = undefined;
        this.dataItem = undefined;
    }
    resetSelection(index) {
        const clear = !isPresent(index) || index < 0;
        this.selectionService.resetSelection(clear ? [] : [index]);
        this.selectionService.focused = index;
    }
    firstFocusableIndex(index) {
        const maxIndex = this.data.length - 1;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index < maxIndex) ? this.firstFocusableIndex(index + 1) : undefined;
        }
        else {
            return index;
        }
    }
    findIndexPredicate(text) {
        if (this.dataService.grouped) {
            return (item) => {
                let itemText = this.prop(this.textField, this.valuePrimitive)(item.value);
                itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
                return itemText.startsWith(text.toLowerCase());
            };
        }
        else {
            return (item) => {
                let itemText = this.prop(this.textField, this.valuePrimitive)(item);
                itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
                return itemText.startsWith(text.toLowerCase());
            };
        }
    }
    prop(field, usePrimitive) {
        return (dataItem) => {
            if (isPresent(dataItem)) {
                if (usePrimitive) {
                    return field && isObject(dataItem) ? dataItem[field] : dataItem;
                }
                else {
                    return dataItem[field];
                }
            }
            return null;
        };
    }
    findDataItem({ primitive, valueField, value }) {
        const result = {
            dataItem: null,
            index: -1
        };
        const prop = this.prop(valueField, primitive);
        let comparer;
        if (this.dataService.grouped) {
            comparer = (element) => {
                return prop(element.value) === prop(value);
            };
        }
        else {
            comparer = (element) => {
                return prop(element) === prop(value);
            };
        }
        const index = this.dataService.findIndex(comparer);
        result.dataItem = this.dataService.itemAt(index);
        result.index = index;
        return result;
    }
    search(text, startFrom = 0) {
        let index;
        if (text.length && this.dataService.itemsCount) {
            index = this.dataService.findIndex(this.findIndexPredicate(text), startFrom);
        }
        else {
            index = -1;
        }
        if (this.disabledItemsService.isIndexDisabled(index)) {
            if (index + 1 < this.dataService.itemsCount) {
                this.search(text, index + 1);
            }
            else {
                this.selectionService.focus(-1);
            }
        }
        else {
            this.selectionService.focus(index);
            if (this.suggest) {
                this.suggestedText = getter(this.dataService.itemAt(index), this.textField);
            }
        }
    }
    /**
     * @hidden
     */
    getSuggestion() {
        const hasSelected = !!this.selectionService.selected.length;
        const shouldSuggest = this.suggest && !this.backspacePressed && this.suggestedText && this.text;
        if (!hasSelected && shouldSuggest && this.suggestedText.toLowerCase().startsWith(this.text.toLowerCase())) {
            return this.suggestedText;
        }
        else {
            this.suggestedText = undefined;
        }
    }
    navigate(index) {
        if (this.dataService.itemsCount === 0) {
            return;
        }
        this.text = this.prop(this.textField, this.valuePrimitive)(this.dataService.itemAt(index));
        this.selectionService.select(index);
    }
    /**
     * @hidden
     */
    handleNavigate(event) {
        const hasSelected = isPresent(this.selectionService.selected[0]);
        const focused = isNaN(this.selectionService.focused) ? this.firstFocusableIndex(0) : this.selectionService.focused;
        let offset = 0;
        if (this.disabled || this.readonly) {
            return;
        }
        if (event.keyCode === Keys.home || event.keyCode === Keys.end) {
            return;
        }
        if (!hasSelected) {
            if (event.keyCode === Keys.down) {
                offset = -1;
            }
            else if (event.keyCode === Keys.up) {
                offset = 1;
            }
        }
        const action = this.navigationService.process({
            current: offset + focused,
            max: this.dataService.itemsCount - 1,
            min: 0,
            originalEvent: event
        });
        if (action !== NavigationAction.Undefined &&
            action !== NavigationAction.Left &&
            action !== NavigationAction.Right &&
            action !== NavigationAction.Backspace &&
            action !== NavigationAction.Delete &&
            ((action === NavigationAction.Enter && this.isOpen) || action !== NavigationAction.Enter)) {
            event.preventDefault();
        }
    }
    handleEnter() {
        const text = this.text;
        const focused = this.selectionService.focused;
        const hasFocused = isPresent(focused) && focused !== -1;
        const previousText = getter(this._previousDataItem, this.textField) || "";
        const focusedItemText = getter(this.dataService.itemAt(focused), this.textField);
        const textHasChanged = text !== previousText;
        this.togglePopup(false);
        this._filtering = false;
        if (this.allowCustom && textHasChanged) {
            if (text === focusedItemText || this.useSuggestion()) {
                this.selectionService.change(focused);
            }
            else {
                this.change(text, true);
            }
        }
        if (!this.allowCustom) {
            if (hasFocused) {
                this.selectionService.change(focused);
            }
            else if (textHasChanged) {
                this.change(text, true);
            }
        }
    }
    /**
     * @hidden
     */
    handleBlur() {
        this._filtering = false;
        const currentText = this.searchbar.value; // The value is updated, but the Angular `change` event is not emitted yet and `this.text` is not updated. Fails on suggested text.
        if (!currentText && !isPresent(this._previousDataItem) && !isPresent(this.dataItem)) {
            this.togglePopup(false);
            this.isFocused = false;
            this.onBlur.emit();
            this.onTouchedCallback();
            return;
        }
        const focused = this.selectionService.focused;
        let itemText;
        const isItemFocused = focused !== -1 && focused !== undefined;
        if (isItemFocused) {
            itemText = getter(this.dataService.itemAt(focused), this.textField);
            itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
        }
        if (itemText === currentText.toLowerCase()) {
            this.selectionService.change(focused);
        }
        else {
            this.change(currentText, true);
        }
        this.togglePopup(false);
        this.isFocused = false;
        this.onBlur.emit();
        this.onTouchedCallback();
    }
    /**
     * @hidden
     */
    searchBarChange(text) {
        const currentTextLength = this.text ? this.text.length : 0;
        this.backspacePressed = (text.length < currentTextLength) ? true : false;
        this.text = text;
        // Reset the selection prior to filter. If a match is present, it will be resolved. If a match is not present, it is not needed.
        this.selectionService.resetSelection([]);
        this.togglePopup(true);
        this._filtering = true;
        if (this.filterable) {
            this.filterChange.emit(text);
        }
        else {
            this.search(text);
        }
    }
    /**
     * @hidden
     */
    handleFocus() {
        this.isFocused = true;
        this.onFocus.emit();
    }
    /**
     * @hidden
     */
    pageChange(event) {
        const virtual = this.virtual;
        virtual.skip = event.skip;
    }
    change(candidate, isCustom = false) {
        if (isCustom) {
            this.customValueSubject.next(candidate);
        }
        else {
            this.valueSubject.next(candidate);
        }
    }
    emitSelectionChange(dataItem) {
        this.selectionSubject.next(dataItem);
    }
    emitValueChange() {
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
        this._previousDataItem = this.dataItem;
    }
    /**
     * @hidden
     */
    selectClick() {
        if (!this.touchEnabled) {
            this.searchbar.focus();
        }
        this.togglePopup(!this.isOpen);
    }
    get listContainerClasses() {
        const containerClasses = ['k-list-container', 'k-reset'];
        if (this.popupSettings.popupClass) {
            containerClasses.push(this.popupSettings.popupClass);
        }
        return containerClasses;
    }
    useSuggestion() {
        if (!(this.suggest && isPresent(this.searchbar.value))) {
            return false;
        }
        const focusedDataItem = this.dataService.itemAt(this.selectionService.focused);
        const focusedItemText = this.prop(this.textField, this.valuePrimitive)(focusedDataItem);
        if (!isPresent(focusedItemText)) {
            return false;
        }
        return this.searchbar.value.toLowerCase() === focusedItemText.toLowerCase();
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    createPopup() {
        const horizontalAlign = this.direction === "rtl" ? "right" : "left";
        const anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        const popupPosition = { horizontal: horizontalAlign, vertical: "top" };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupClass: this.listContainerClasses,
            positionMode: 'absolute',
            anchorAlign: anchorPosition,
            popupAlign: popupPosition
        });
        const popupWrapper = this.popupRef.popupElement;
        const { min, max } = this.width;
        popupWrapper.addEventListener('mousedown', this.popupMouseDownHandler);
        popupWrapper.style.minWidth = min;
        popupWrapper.style.width = max;
        popupWrapper.style.height = this.height;
        popupWrapper.setAttribute("dir", this.direction);
        this.popupRef.popupOpen.subscribe(() => {
            this.cdr.detectChanges();
            this.optionsList.scrollToItem(this.selectionService.focused);
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => this.togglePopup(false));
    }
    _toggle(open) {
        this._open = (open === undefined) ? !this._open : open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    }
    triggerPopupEvents(open) {
        const eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    setMessages() {
        this._zone.runOutsideAngular(() => {
            clearTimeout(this.messagesTimeout);
            this.messagesTimeout = setTimeout(() => {
                this.noDataText = this.localization.get('noDataText');
                this.cdr.detectChanges();
            });
        });
    }
    createSelectionStream() {
        if (isPresent(this.selectionSubscription)) {
            this.selectionSubscription.unsubscribe();
        }
        this.selectionSubscription = this.selectionSubject
            .pipe(distinctUntilChanged())
            .subscribe(dataItem => this.selectionChange.emit(dataItem));
    }
}
ComboBoxComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoComboBox',
                providers: [
                    COMBOBOX_VALUE_ACCESSOR,
                    DataService,
                    SelectionService,
                    NavigationService,
                    DisabledItemsService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.combobox'
                    },
                    {
                        provide: FilterableDropDownComponentBase, useExisting: forwardRef(() => ComboBoxComponent)
                    },
                    {
                        provide: KendoInput, useExisting: forwardRef(() => ComboBoxComponent)
                    }
                ],
                selector: 'kendo-combobox',
                template: `
        <ng-container kendoComboBoxLocalizedMessages
            i18n-noDataText="kendo.combobox.noDataText|The text displayed in the popup when there are no items"
            noDataText="NO DATA FOUND"

            i18n-clearTitle="kendo.combobox.clearTitle|The title of the clear button"
            clearTitle="clear"
        >
        </ng-container>
        <span #wrapper unselectable="on"
            class="k-dropdown-wrap"
            [ngClass]="{ 'k-state-default': !disabled, 'k-state-disabled': disabled, 'k-state-focused': isFocused }"
        >
          <kendo-searchbar #searchbar
              [role]="'combobox'"
              [id]="focusableId"
              [listId]="listBoxId"
              [activeDescendant]="activeDescendant"
              [noDataLabel]="noDataLabel"
              [userInput]="text"
              [suggestedText]="getSuggestion()"
              [disabled]="disabled"
              [readonly]="readonly"
              [tabIndex]="tabIndex"
              [popupOpen]="isOpen"
              [placeholder]="placeholder"
              (onNavigate)="handleNavigate($event)"
              (valueChange)="searchBarChange($event)"
              (onBlur)="handleBlur()"
              (onFocus)="handleFocus()"
          ></kendo-searchbar>
          <span *ngIf="!loading && !readonly && (clearButton && text?.length)" class="k-icon k-clear-value k-i-close" [attr.title]="clearTitle" role="button" tabindex="-1" (click)="clearValue($event)" (mousedown)="$event.preventDefault()"></span>
          <span unselectable="on"
              class="k-select"
              (click)="selectClick()"
              (mousedown)="$event.preventDefault()" >
              <span class="k-icon" [ngClass]="buttonClasses">
               </span>
          </span>
          <ng-template #popupTemplate>
              <!--header template-->
              <ng-template *ngIf="headerTemplate"
                  [templateContext]="{
                      templateRef: headerTemplate.templateRef
                  }">
              </ng-template>
              <!--list-->
              <kendo-list
                  #optionsList
                  [id]="listBoxId"
                  [optionPrefix]="optionPrefix"
                  [data]="data"
                  [textField]="textField"
                  [valueField]="valueField"
                  [template]="template"
                  [groupTemplate]="groupTemplate"
                  [fixedGroupTemplate]="fixedGroupTemplate"
                  [height]="listHeight"
                  [show]="isOpen"
                  [virtual]="virtual"
                  (pageChange)="pageChange($event)"
              >
              </kendo-list>
              <!--no-data template-->
              <div class="k-nodata" *ngIf="data.length === 0">
                  <ng-template [ngIf]="noDataTemplate"
                      [templateContext]="{
                          templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined
                      }">
                  </ng-template>
                  <ng-template [ngIf]="!noDataTemplate">
                      <div>{{ noDataText }}</div>
                  </ng-template>
              </div>
              <!--footer template-->
              <ng-template *ngIf="footerTemplate"
                  [templateContext]="{
                      templateRef: footerTemplate.templateRef
                  }">
              </ng-template>
          </ng-template>
        </span>
        <ng-template [ngIf]="isOpen">
            <kendo-resize-sensor (resize)="onResize()"></kendo-resize-sensor>
        </ng-template>
        <ng-container #container></ng-container>
  `
            },] },
];
/** @nocollapse */
ComboBoxComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PopupService },
    { type: SelectionService },
    { type: NavigationService },
    { type: DisabledItemsService },
    { type: DataService },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
];
ComboBoxComponent.propDecorators = {
    focusableId: [{ type: Input }],
    allowCustom: [{ type: Input }],
    data: [{ type: Input }],
    value: [{ type: Input }],
    textField: [{ type: Input }],
    valueField: [{ type: Input }],
    valuePrimitive: [{ type: Input }],
    valueNormalizer: [{ type: Input }],
    placeholder: [{ type: Input }],
    popupSettings: [{ type: Input }],
    listHeight: [{ type: Input }],
    iconClass: [{ type: Input }],
    loading: [{ type: Input }],
    suggest: [{ type: Input }],
    clearButton: [{ type: Input }],
    disabled: [{ type: Input }],
    itemDisabled: [{ type: Input }],
    readonly: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input, args: ["tabIndex",] }],
    filterable: [{ type: Input }],
    virtual: [{ type: Input }],
    valueChange: [{ type: Output }],
    selectionChange: [{ type: Output }],
    filterChange: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    template: [{ type: ContentChild, args: [ItemTemplateDirective,] }],
    headerTemplate: [{ type: ContentChild, args: [HeaderTemplateDirective,] }],
    footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }],
    noDataTemplate: [{ type: ContentChild, args: [NoDataTemplateDirective,] }],
    groupTemplate: [{ type: ContentChild, args: [GroupTemplateDirective,] }],
    fixedGroupTemplate: [{ type: ContentChild, args: [FixedGroupTemplateDirective,] }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    searchbar: [{ type: ViewChild, args: [SearchBarComponent,] }],
    optionsList: [{ type: ViewChild, args: ['optionsList',] }],
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-combobox',] }, { type: HostBinding, args: ['class.k-header',] }],
    clearable: [{ type: HostBinding, args: ['class.k-combobox-clearable',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }]
};
