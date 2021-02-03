/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:max-line-length */
/* tslint:disable:member-ordering */
import { guid, isPresent, isArray, isObjectArray, resolveAllValues, selectedIndices, getter, isNumber, isObject } from './util';
import { SearchBarComponent } from './searchbar.component';
import { ViewChild, Renderer2, ViewContainerRef, Component, HostBinding, Input, ElementRef, TemplateRef, Output, EventEmitter, isDevMode, forwardRef, ContentChild, ChangeDetectorRef, KeyValueDiffers, NgZone, Optional, Inject } from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { isChanged, isDocumentAvailable, KendoInput } from '@progress/kendo-angular-common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionService } from './selection.service';
import { NavigationService } from './navigation.service';
import { NavigationAction } from './navigation-action';
import { DisabledItemsService } from './disabled-items.service';
import { Keys } from './common/keys';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { CustomItemTemplateDirective } from './templates/custom-item-template.directive';
import { GroupTemplateDirective } from './templates/group-template.directive';
import { FixedGroupTemplateDirective } from './templates/fixed-group-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { TagTemplateDirective } from './templates/tag-template.directive';
import { GroupTagTemplateDirective } from './templates/group-tag-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { MultiselectMessages } from './error-messages';
import { PreventableEvent } from './common/preventable-event';
import { RemoveTagEvent } from './common/remove-tag-event';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { FilterableDropDownComponentBase } from './filterable-base.component';
import { TOUCH_ENABLED } from './touch-enabled';
import { DataService } from './data.service';
import { ListComponent } from './list.component';
import { normalizeVirtualizationSettings } from './virtualization-settings';
var MULTISELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: forwardRef(function () { return MultiSelectComponent; })
};
/**
 * Represents the [Kendo UI MultiSelect component for Angular]({% slug overview_multiselect %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiselect [data]="listItems">
 *  </kendo-multiselect>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(localization, popupService, dataService, selectionService, navigationService, disabledItemsService, cdr, differs, renderer, hostElement, _zone, touchEnabled) {
        var _this = this;
        this.localization = localization;
        this.popupService = popupService;
        this.dataService = dataService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.disabledItemsService = disabledItemsService;
        this.cdr = cdr;
        this.differs = differs;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this._zone = _zone;
        this.touchEnabled = touchEnabled;
        this.listBoxId = guid();
        this.tagListId = guid();
        this.tagPrefix = "tag-" + guid();
        this.optionPrefix = "option-" + guid();
        this.focusedTagIndex = undefined;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Determines whether to close the options list of the MultiSelect after the item selection is finished
         * ([see example]({% slug openstate_multiselect %}#toc-keeping-the-options-list-open-while-on-focus)).
         * @default true
         */
        this.autoClose = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         */
        this.readonly = false;
        /**
         * Enables the [filtering]({% slug filtering_multiselect %}) functionality of the MultiSelect.
         */
        this.filterable = false;
        /**
         * Sets the height of the suggestions list. By default, `listHeight` is 200px.
         *
         * > The `listHeight` property affects only the list of suggestions and not the whole popup container.
         * > To set the height of the popup container, use `popupSettings.height`.
         */
        this.listHeight = 200;
        /**
         * If set to `true`, renders a button on hovering over the component.
         * Clicking this button resets the value of the component to an empty array and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * A user-defined callback function which receives an array of selected data items and maps them to an array of tags.
         *
         * @param { Any[] } dataItems - The selected data items from the list.
         * @returns { Any[] } - The tags that will be rendered by the component.
         */
        this.tagMapper = function (tags) { return tags || []; };
        /**
         * Specifies whether the MultiSelect allows user-defined values that are not present in the dataset
         * ([more information and examples]({% slug custom_values_multiselect %})).
         * Defaults to `false`.
         */
        this.allowCustom = false;
        /**
         * A user-defined callback function which returns normalized custom values.
         * Typically used when the data items are different from type `string`.
         *
         * @param { Any } value - The custom value that is defined by the user.
         * @returns { Any }
         *
         * @example
         * ```ts
         * import { map } from 'rxjs/operators';
         *
         * _@Component({
         * selector: 'my-app',
         * template: `
         *   <kendo-multiselect
         *       [allowCustom]="true"
         *       [data]="listItems"
         *       [textField]="'text'"
         *       [valueField]="'value'"
         *       [valueNormalizer]="valueNormalizer"
         *       (valueChange)="onValueChange($event)"
         *   >
         *   </kendo-multiselect>
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
         *      return {
         *         value: Math.floor(Math.random() * (1000 - 100) + 1000), //generate unique valueField
         *         text: text };
         *   }));
         *
         * }
         * ```
         */
        this.valueNormalizer = function (text) { return text.pipe(map(function (userInput) {
            var comparer = function (item) { return typeof item === 'string' && userInput.toLowerCase() === item.toLowerCase(); };
            var matchingValue = _this.value.find(comparer);
            if (matchingValue) {
                return matchingValue;
            }
            var matchingItem = _this.dataService.find(comparer);
            return matchingItem ? matchingItem : userInput;
        })); };
        /**
         * Fires each time the user types in the input field.
         * You can filter the source based on the passed filtration value.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires each time the value is changed&mdash;
         * when the component is blurred or the value is cleared through the **Clear** button
         * ([see example]({% slug overview_multiselect %}#toc-events)).
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open
         * ([see example]({% slug openstate_multiselect %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close
         * ([see example]({% slug openstate_multiselect %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the user focuses the MultiSelect.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the MultiSelect gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time a tag is about to be removed.
         * This event is preventable. If you cancel it, the tag will not be removed.
         */
        this.removeTag = new EventEmitter();
        this.widgetClasses = true;
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function (_) { };
        this._data = [];
        this._placeholder = '';
        this._open = false;
        this._value = [];
        this._popupSettings = { animate: true };
        this.isFocused = false;
        this.selectedDataItems = [];
        this.customValueSubject = new Subject();
        this.observableSubscriptions = new Subscription();
        this.hostElement = hostElement.nativeElement;
        this.popupMouseDownHandler = this.onMouseDown.bind(this);
        this.data = [];
        this.direction = this.localization.rtl ? 'rtl' : 'ltr';
        this.subscribeEvents();
    }
    /**
     * Focuses the MultiSelect.
     */
    MultiSelectComponent.prototype.focus = function () {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onSearchBarFocus = function () {
        if (!this.isFocused) {
            this.isFocused = true;
            this.onFocus.emit();
        }
    };
    /**
     * Blurs the MultiSelect.
     */
    MultiSelectComponent.prototype.blur = function () {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onSearchBarBlur = function () {
        if (this.isFocused) {
            this.closePopup();
            this.isFocused = false;
            if (!this.allowCustom) {
                this.clearFilter();
            }
            this.onBlur.emit();
            this.onTouchedCallback();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.wrapperMousedown = function (event) {
        var inputElement = this.searchbar.input.nativeElement;
        if (event.button === 0) {
            if (this.isFocused && this.isOpen && event.target === inputElement) {
                return;
            }
            if (!this.touchEnabled || (this.touchEnabled && event.target.tagName !== 'SPAN')) {
                this.searchbar.focus();
            }
            this.togglePopup(!this.isOpen);
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onMouseDown = function (event) {
        event.preventDefault();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onResize = function () {
        if (this._open) {
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    };
    Object.defineProperty(MultiSelectComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        get: function () {
            var virtual = this.virtual;
            if (virtual) {
                var start = virtual.skip || 0;
                var end = start + virtual.pageSize;
                //Use length instead of itemsCount because of grouping
                virtual.total = this.dataService.data.length;
                return this.dataService.data.slice(start, end);
            }
            return this.dataService.data;
        },
        /**
         * Sets the data of the MultiSelect.
         *
         * > The data has to be provided in an array-like list of items.
         */
        set: function (data) {
            this._data = data || [];
            this.dataService.data = this._data;
            this.setState(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the MultiSelect. It can be either of the primitive (string, numbers) or of the complex (objects) type.
         * To define the type, use the `valuePrimitive` option.
         *
         * > All selected values which are not present in the source are ignored.
         */
        set: function (values) {
            this._value = values ? values : [];
            if (!this.differ && this.value) {
                this.differ = this.differs.find(this.value).create();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "tabIndex", {
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
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        get: function () {
            return this.selectedDataItems.length ? '' : this._placeholder;
        },
        /**
         * The hint which is displayed when the component is empty.
         * When the values are selected, it disappears.
         */
        set: function (text) {
            this._placeholder = text || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "itemDisabled", {
        /**
         * Defines a Boolean function that is executed for each data item in the component
         * ([see examples]({% slug disableditems_multiselect %})). Determines whether the item will be disabled.
         */
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("itemDisabled must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this.disabledItemsService.itemDisabled = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "virtual", {
        get: function () {
            return this._virtualSettings;
        },
        /**
         * Enables the [virtualization]({% slug virtualization_multiselect %}) functionality.
         */
        set: function (settings) {
            this._virtualSettings = normalizeVirtualizationSettings(settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the MultiSelect.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used. If set to `auto`, the component automatically adjusts the width of the popup and no item labels are wrapped. The `auto` mode is not supported when virtual scrolling is enabled.
         * - `height: Number`&mdash;Sets the height of the popup container.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "focusedClass", {
        get: function () {
            return this.isFocused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "listContainerClasses", {
        get: function () {
            var containerClasses = ['k-list-container', 'k-reset'];
            if (this.popupSettings.popupClass) {
                containerClasses.push(this.popupSettings.popupClass);
            }
            return containerClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "width", {
        get: function () {
            var wrapperOffsetWidth = 0;
            if (isDocumentAvailable()) {
                wrapperOffsetWidth = this.wrapper.nativeElement.offsetWidth;
            }
            var width = this.popupSettings.width || wrapperOffsetWidth;
            var minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : wrapperOffsetWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "height", {
        get: function () {
            var popupHeight = this.popupSettings.height;
            return isPresent(popupHeight) ? popupHeight + "px" : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "activeDescendant", {
        get: function () {
            var focusedTagIndex = this.focusedTagIndex;
            var focusedListIndex = this.selectionService.focused;
            var prefix;
            var item;
            if (isPresent(focusedTagIndex) && !this.isOpen) {
                item = this.tags[focusedTagIndex];
                prefix = this.tagPrefix;
            }
            else if (isPresent(focusedListIndex) && this.isOpen) {
                item = this.dataService.itemAt(focusedListIndex);
                prefix = this.optionPrefix;
            }
            else {
                return '';
            }
            return prefix + "-" + this.prop(this.valueField, this.valuePrimitive)(item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "noDataLabel", {
        get: function () {
            if (this.dataService.itemsCount === 0) {
                return this.noDataText;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "clearTitle", {
        get: function () {
            return this.localization.get('clearTitle');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.verifySettings = function () {
        var valueOrText = !isPresent(this.valueField) !== !isPresent(this.textField);
        if (!isDevMode() || this.value.length === 0) {
            return;
        }
        if (!isArray(this.value)) {
            throw new Error(MultiselectMessages.array);
        }
        if (this.valuePrimitive === true && isObjectArray(this.value)) {
            throw new Error(MultiselectMessages.primitive);
        }
        if (this.valuePrimitive === false && !isObjectArray(this.value)) {
            throw new Error(MultiselectMessages.object);
        }
        if (valueOrText) {
            throw new Error(MultiselectMessages.textAndValue);
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.change = function (event) {
        var isCustomItem = (isPresent(event.added) || isPresent(event.removed)) && (event.added === -1 || event.removed === -1);
        if (isCustomItem) {
            this.addCustomValue(this.text);
            return; // The change is emited asynchronosly.
        }
        // Existing items.
        if (isPresent(event.added)) {
            var dataItem = this.dataService.itemAt(event.added);
            var newItem = (this.valuePrimitive && isPresent(dataItem) && isPresent(dataItem[this.valueField])) ? dataItem[this.valueField] : dataItem;
            this.value = this.value.concat([newItem]);
            this.cdr.markForCheck();
        }
        if (isPresent(event.removed)) {
            var dataItem_1 = this.dataService.itemAt(event.removed);
            var prop_1 = this.prop(this.valueField, this.valuePrimitive);
            var filter_1 = function (item) { return prop_1(item) !== prop_1(dataItem_1); };
            this.value = this.value.filter(filter_1);
            this.selectedDataItems = this.selectedDataItems.filter(filter_1);
            this.tags = this.tagMapper(this.selectedDataItems.slice());
            this.cdr.detectChanges();
        }
        this.emitValueChange();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.setState = function (value) {
        var _this = this;
        var objectArray = isObjectArray(value);
        var data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(function (item) { return !item.header; }).map(function (item) { return item.value; });
        }
        var selection = selectedIndices(this.value, data, this.valueField);
        this.selectionService.resetSelection(selection);
        if (this.isOpen && this.selectionService.focused === undefined) {
            this.selectionService.focused = this.dataService.itemsCount ? this.firstFocusableIndex(0) : this.allowCustom ? -1 : undefined;
        }
        if (!this.text) {
            if (!(isPresent(value) && value.length)) {
                this.selectedDataItems = [];
            }
            if (this.valuePrimitive && !this.valueField) {
                this.selectedDataItems = value.slice();
            }
            if (objectArray || this.valuePrimitive && this.valueField) {
                this.selectedDataItems = resolveAllValues(value, data, this.valueField);
            }
            if (this.selectedDataItems.length < value.length) {
                var prop_2 = this.prop(this.valueField, this.valuePrimitive);
                var dataItems = value
                    .map(function (current) {
                    var dataItem = _this.selectedDataItems.find(function (item) { return prop_2(item) === prop_2(current); });
                    return isPresent(dataItem) ? dataItem : _this.resolveDataItemFromTags(current);
                })
                    .filter(function (dataItem) { return isPresent(dataItem); });
                this.selectedDataItems = dataItems;
            }
        }
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleFilter = function (text) {
        this.text = text;
        if (text && !this.isOpen) {
            this.openPopup();
        }
        if (this.filterable) {
            this.filterChange.emit(text);
        }
        else {
            this.searchTextAndFocus(text);
        }
        this.searchbar.setInputSize();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.pageChange = function (event) {
        var virtual = this.virtual;
        virtual.skip = event.skip;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.clearFilter = function () {
        if (this.filterable && this.text) {
            this.filterChange.emit("");
        }
        this.text = "";
        this.searchbar.setInputSize();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleNavigate = function (event) {
        var navigateInput = this.text && event.keyCode !== Keys.down && event.keyCode !== Keys.up;
        var selectValue = this.text && event.keyCode === Keys.enter || event.keyCode === Keys.esc;
        var deleteTag = !this.text && event.keyCode === Keys.backspace && this.tags.length > 0;
        if (deleteTag) {
            this.handleBackspace();
            return;
        }
        if (this.disabled || navigateInput && !selectValue) {
            return;
        }
        var eventData = event;
        var focused = isNaN(this.selectionService.focused) ? -1 : this.selectionService.focused;
        var action = this.navigationService.process({
            current: focused,
            max: this.dataService.itemsCount - 1,
            min: this.allowCustom && this.text ? -1 : 0,
            open: this.isOpen,
            originalEvent: eventData
        });
        if (action !== NavigationAction.Undefined &&
            ((action === NavigationAction.Enter && this.isOpen) || action !== NavigationAction.Enter)) {
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleRemoveTag = function (tagData) {
        var eventArgs = new RemoveTagEvent(tagData);
        if (this.disabled || this.readonly) {
            return;
        }
        this.focus();
        this.removeTag.emit(eventArgs);
        if (eventArgs.isDefaultPrevented()) {
            return;
        }
        if (tagData instanceof Array) {
            this.removeGroupTag(tagData);
        }
        else {
            this.removeSingleTag(tagData);
        }
        this.cdr.detectChanges();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.clearAll = function (event) {
        event.stopImmediatePropagation();
        this.clearFilter();
        this.reset();
        this.emitValueChange();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.addCustomValue = function (text) {
        this.customValueSubject.next(text);
    };
    MultiSelectComponent.prototype.ngAfterContentChecked = function () {
        this.verifySettings();
    };
    MultiSelectComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.differ) {
            var valueChanges = this.differ.diff(this.value);
            if (valueChanges && !this.valueChangeDetected) {
                this.selectedDataItems = this.getSelectedDataItems(valueChanges);
                this.tags = this.tagMapper(this.selectedDataItems.slice(0));
                if (!(this.tags && this.dataService.data)) {
                    return;
                }
                var isValueCustom_1 = function (value) { return _this.dataService.indexOf(value) === -1; };
                var isValueSelected_1 = function (value) { return _this.selectionService.isSelected(_this.dataService.indexOf(value)); };
                var reselectionRequired = this.selectedDataItems.some(function (value) { return !(isValueCustom_1(value) || isValueSelected_1(value)); });
                if (reselectionRequired) {
                    this.setState(this.value);
                }
            }
        }
        this.valueChangeDetected = false;
    };
    MultiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.removeAttribute(this.hostElement, "tabindex");
        this.createCustomValueStream();
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.setMessages();
        });
        this.setMessages();
    };
    MultiSelectComponent.prototype.ngOnChanges = function (changes) {
        var virtual = this.virtual;
        var requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = !this.valueField;
        }
        if (isChanged("valueNormalizer", changes)) {
            this.createCustomValueStream();
        }
        var STATE_PROPS = /(data|textField|valueField|valuePrimitive|value)/g;
        if (changes.hasOwnProperty("value")) {
            this.valueChangeDetected = true;
        }
        if (STATE_PROPS.test(Object.keys(changes).join())) {
            this.setState(this.value);
        }
    };
    MultiSelectComponent.prototype.ngAfterViewInit = function () {
        this.searchbar.setInputSize();
    };
    MultiSelectComponent.prototype.ngOnDestroy = function () {
        this._toggle(false);
        this.unsubscribeEvents();
        clearTimeout(this.messagesTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    /**
     * Toggles the visibility of the popup
     * ([see example]({% slug openstate_multiselect %}#toc-setting-the-initially-opened-component)).
     * If you use the `toggle` method to open or close the popup, the respective `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    MultiSelectComponent.prototype.toggle = function (open) {
        var _this = this;
        // The Promise is required for opening the popup on load.
        // Otherwise, the "Expression has changed..." type error will be thrown.
        Promise.resolve(null).then(function () {
            _this._toggle((open === undefined) ? !_this._open : open);
            _this.cdr.markForCheck();
        });
    };
    Object.defineProperty(MultiSelectComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the value of the MultiSelect.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    MultiSelectComponent.prototype.reset = function () {
        this.text = "";
        this.value = [];
        this.selectedDataItems = [];
        this.setState([]);
        this.cdr.markForCheck();
    };
    // NG MODEL BINDINGS
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.writeValue = function (value) {
        this.value = value || [];
        this.setState(this.value);
        this.verifySettings();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onTagMapperChange = function () {
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
    };
    MultiSelectComponent.prototype.prop = function (field, usePrimitive) {
        return function (dataItem) {
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
    };
    MultiSelectComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        var isOpen = function () { return _this.isOpen; };
        var isClosed = function () { return !_this.isOpen; };
        var isTagFocused = function () { return !_this.isOpen && _this.focusedTagIndex !== undefined; };
        [
            this.selectionService.onChange.subscribe(this.handleItemChange.bind(this)),
            this.navigationService.esc.subscribe(this.closePopup.bind(this)),
            this.navigationService.enter.pipe(filter(isOpen)).subscribe(this.handleEnter.bind(this)),
            this.navigationService.open.subscribe(this.openPopup.bind(this)),
            this.navigationService.close.subscribe(this.handleClose.bind(this)),
            this.navigationService.up.pipe(filter(isOpen)).subscribe(function (event) { return _this.handleUp(event.index); }),
            this.navigationService.home.pipe(filter(function () { return isClosed; })).subscribe(this.handleHome.bind(this)),
            this.navigationService.end.pipe(filter(function () { return isClosed; })).subscribe(this.handleEnd.bind(this)),
            this.navigationService.backspace.pipe(filter(isTagFocused)).subscribe(this.handleBackspace.bind(this)),
            this.navigationService.delete.pipe(filter(isTagFocused)).subscribe(this.handleDelete.bind(this)),
            this.navigationService.left.subscribe(this.handleLeftKey.bind(this)),
            this.navigationService.right.subscribe(this.handleRightKey.bind(this)),
            this.navigationService.down.subscribe(function (event) { return _this.handleDownKey(event.index); })
        ].forEach(function (s) { return _this.observableSubscriptions.add(s); });
    };
    MultiSelectComponent.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.observableSubscriptions.unsubscribe();
        if (this.customValueSubscription) {
            this.customValueSubscription.unsubscribe();
        }
    };
    MultiSelectComponent.prototype.removeGroupTag = function (dataItems) {
        var _this = this;
        var prop = this.prop(this.valueField, this.valuePrimitive);
        var data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(function (item) { return !item.header; }).map(function (item) { return item.value; });
        }
        selectedIndices(dataItems, data, this.valueField)
            .forEach(function (currentValue) { return _this.selectionService.unselect(currentValue); });
        dataItems
            .filter(function (dataItem) { return !isPresent(data.find(function (value) { return prop(value) === prop(dataItem); })); })
            .forEach(function (dataItem) {
            var filter = function (item) { return prop(item) !== prop(dataItem); };
            _this.value = _this.value.filter(filter);
            _this.selectedDataItems = _this.selectedDataItems.filter(filter);
        });
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
        this.emitValueChange();
    };
    MultiSelectComponent.prototype.removeSingleTag = function (dataItem) {
        var prop = this.prop(this.valueField, this.valuePrimitive);
        var data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(function (item) { return !item.header; }).map(function (item) { return item.value; });
        }
        var index = selectedIndices([dataItem], data, this.valueField)[0];
        if (isNumber(index)) {
            this.selectionService.unselect(index);
            this.togglePopup(false);
        }
        else { // the deleted item is not present in the source
            var filter_2 = function (item) { return prop(item) !== prop(dataItem); };
            this.value = this.value.filter(filter_2);
            this.selectedDataItems = this.selectedDataItems.filter(filter_2);
            this.tags = this.tagMapper(this.selectedDataItems.slice(0));
            this.cdr.markForCheck();
            this.emitValueChange();
        }
    };
    MultiSelectComponent.prototype.createCustomValueStream = function () {
        var _this = this;
        if (this.customValueSubscription) {
            this.customValueSubscription.unsubscribe();
        }
        this.customValueSubscription = this.customValueSubject.pipe(tap(function () {
            _this.loading = true;
            _this.disabled = true;
            _this.cdr.detectChanges();
        }), this.valueNormalizer, catchError(function () {
            _this.loading = false;
            _this.disabled = false;
            _this.clearFilter();
            if (_this.autoClose) {
                _this.togglePopup(false);
                _this.nextTick(function () {
                    _this.searchbar.focus();
                });
            }
            _this.createCustomValueStream();
            return of(null);
        }))
            .subscribe(function (normalizedValue) {
            _this.loading = false;
            _this.disabled = false;
            _this.clearFilter();
            if (isPresent(normalizedValue)) { //if valueNormalizer returns `null` or `undefined` custom value is discarded
                var newValue_1 = _this.valuePrimitive ? getter(normalizedValue, _this.valueField) : normalizedValue;
                var itemIndex = _this.dataService.indexOf(newValue_1);
                var customItem = itemIndex === -1;
                if (_this.value.indexOf(newValue_1) === -1) {
                    if (!customItem) {
                        _this.selectionService.add(itemIndex);
                    }
                    else {
                        _this.value = _this.value.concat([newValue_1]);
                    }
                    _this.selectedDataItems = _this.selectedDataItems.concat([normalizedValue]);
                }
                else {
                    if (!customItem && _this.selectionService.isSelected(itemIndex)) {
                        _this.selectionService.unselect(itemIndex);
                    }
                    else {
                        _this.value.splice(_this.value.indexOf(newValue_1), 1);
                        _this.selectedDataItems = _this.selectedDataItems.filter(function (item) { return getter(item, _this.valueField) !== newValue_1; });
                    }
                }
                _this.tags = _this.tagMapper(_this.selectedDataItems.slice(0));
                _this.emitValueChange();
            }
            if (_this.autoClose) {
                _this.togglePopup(false);
                _this.nextTick(function () {
                    _this.searchbar.focus();
                });
            }
        });
    };
    MultiSelectComponent.prototype.handleItemChange = function (event) {
        this.change(event);
        if (this.autoClose) {
            this.togglePopup(false);
        }
        if (isPresent(event.added) && event.added !== -1) {
            this.clearFilter();
        }
    };
    MultiSelectComponent.prototype.handleEnter = function (event) {
        var service = this.selectionService;
        var focusedIndex = this.selectionService.focused;
        if (this.isOpen) {
            event.originalEvent.preventDefault();
        }
        if (focusedIndex === -1) {
            if (this.allowCustom && this.text) {
                this.addCustomValue(this.text);
            }
            return; // Clear filter & close are done at customValueSubscription due to race conditions.
        }
        if (service.isSelected(focusedIndex)) {
            service.unselect(focusedIndex);
        }
        else {
            service.add(focusedIndex);
        }
        this.clearFilter();
        if (this.autoClose) {
            this.togglePopup(false);
        }
    };
    MultiSelectComponent.prototype.handleClose = function () {
        this.closePopup();
        this.searchbar.focus();
    };
    MultiSelectComponent.prototype.handleEnd = function () {
        this.focusedTagIndex = this.tags.length - 1;
    };
    MultiSelectComponent.prototype.handleHome = function () {
        this.focusedTagIndex = 0;
    };
    MultiSelectComponent.prototype.handleUp = function (index) {
        this.selectionService.focused = index;
    };
    MultiSelectComponent.prototype.handleBackspace = function () {
        if (this.focusedTagIndex !== undefined) {
            this.handleDelete();
        }
        else {
            this.handleRemoveTag(this.tags[this.tags.length - 1]);
            this.searchbar.focus();
        }
    };
    MultiSelectComponent.prototype.handleDelete = function () {
        this.handleRemoveTag(this.tags[this.focusedTagIndex]);
        if (this.focusedTagIndex === this.tags.length) {
            this.focusedTagIndex = undefined;
        }
    };
    MultiSelectComponent.prototype.handleLeftKey = function () {
        if (this.direction === 'rtl') {
            if (this.focusedTagIndex === 0) {
                this.focusedTagIndex = undefined;
            }
            if (this.focusedTagIndex === undefined) {
                return;
            }
        }
        if (this.focusedTagIndex === undefined || this.focusedTagIndex < 0) {
            this.focusedTagIndex = this.tags.length - 1;
        }
        else if (this.focusedTagIndex !== 0) {
            this.focusedTagIndex--;
        }
    };
    MultiSelectComponent.prototype.handleDownKey = function (index) {
        if (this.isOpen) {
            this.selectionService.focused = index || this.firstFocusableIndex(0);
        }
        else {
            this.openPopup();
        }
    };
    MultiSelectComponent.prototype.handleRightKey = function () {
        var last = this.tags.length - 1;
        if (this.direction === 'rtl') {
            if (this.focusedTagIndex === undefined) {
                this.focusedTagIndex = 0;
                return;
            }
            if (this.focusedTagIndex === last) {
                return;
            }
        }
        if (this.focusedTagIndex === last) {
            this.focusedTagIndex = undefined;
        }
        else if (this.focusedTagIndex < last) {
            this.focusedTagIndex++;
        }
    };
    MultiSelectComponent.prototype.findIndex = function (text, startsFrom) {
        var _this = this;
        if (startsFrom === void 0) { startsFrom = 0; }
        var itemText;
        text = text.toLowerCase();
        var index = this.dataService.findIndex(function (item) {
            if (_this.dataService.grouped) {
                itemText = _this.prop(_this.textField, _this.valuePrimitive)(item.value);
            }
            else {
                itemText = _this.prop(_this.textField, _this.valuePrimitive)(item);
            }
            itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
            return text && itemText.startsWith(text);
        }, startsFrom);
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index + 1 > this.dataService.itemsCount) ? -1 : this.findIndex(text, index + 1);
        }
        else {
            return index;
        }
    };
    MultiSelectComponent.prototype.searchTextAndFocus = function (text) {
        var index = this.findIndex(text);
        this.selectionService.focused = index;
    };
    MultiSelectComponent.prototype.closePopup = function () {
        this.togglePopup(false);
        this.focusedTagIndex = undefined;
    };
    MultiSelectComponent.prototype.openPopup = function () {
        this.togglePopup(true);
        this.focusedTagIndex = undefined;
    };
    MultiSelectComponent.prototype.togglePopup = function (open) {
        var isDisabled = this.disabled || this.readonly;
        var sameState = this.isOpen === open;
        if (isDisabled || sameState) {
            return;
        }
        var isDefaultPrevented = this.triggerPopupEvents(open);
        if (!isDefaultPrevented) {
            this._toggle(open);
        }
    };
    MultiSelectComponent.prototype.triggerPopupEvents = function (open) {
        var eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    MultiSelectComponent.prototype._toggle = function (open) {
        this._open = (open === undefined) ? !this._open : open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    MultiSelectComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    MultiSelectComponent.prototype.createPopup = function () {
        var _this = this;
        var horizontalAlign = this.direction === "rtl" ? "right" : "left";
        var anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        var popupPosition = { horizontal: horizontalAlign, vertical: "top" };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            anchorAlign: anchorPosition,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: popupPosition,
            popupClass: this.listContainerClasses,
            positionMode: 'absolute'
        });
        var popupWrapper = this.popupRef.popupElement;
        var _a = this.width, min = _a.min, max = _a.max;
        popupWrapper.addEventListener('mousedown', this.popupMouseDownHandler);
        popupWrapper.style.minWidth = min;
        popupWrapper.style.width = max;
        popupWrapper.style.height = this.height;
        popupWrapper.setAttribute("dir", this.direction);
        this.popupRef.popupOpen.subscribe(function () {
            _this.cdr.detectChanges();
            _this.optionsList.scrollToItem(_this.selectionService.focused);
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () {
            _this.togglePopup(false);
        });
    };
    MultiSelectComponent.prototype.emitValueChange = function () {
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
    };
    MultiSelectComponent.prototype.getSelectedDataItems = function (valueChanges) {
        var _this = this;
        if (!this.dataService.itemsCount && this.valuePrimitive && this.valueField) {
            return [];
        }
        var isBoundToComplexData = isObjectArray(this.data);
        var prop = this.prop(this.valueField, this.valuePrimitive);
        var currentValue;
        var index;
        var selectedDataItems = [];
        valueChanges.forEachItem(function (value) {
            currentValue = value.currentValue;
            if (_this.dataService.grouped) {
                index = _this.dataService.findIndex(function (item) {
                    return prop(item.value) === prop(currentValue);
                });
            }
            else {
                index = _this.dataService.findIndex(function (item) {
                    return prop(item) === prop(currentValue);
                });
            }
            if (index !== -1) {
                selectedDataItems.push(_this.dataService.itemAt(index));
            }
            else if (isPresent(value) && !(isBoundToComplexData && _this.valuePrimitive)) { //value is not present in the data
                selectedDataItems.push(currentValue);
            }
            else { // value is primitive, dataItem is an object, dataItem is not present in the current data set
                var item = _this.resolveDataItemFromTags(currentValue);
                if (isPresent(item)) {
                    selectedDataItems.push(item);
                }
            }
        });
        return selectedDataItems;
    };
    MultiSelectComponent.prototype.resolveDataItemFromTags = function (value) {
        if (!(this.tags && this.tags.length && isPresent(value))) {
            return undefined;
        }
        // Flattening the tags array in case of a summary tag occurrence.
        var tags = this.tags.reduce(function (acc, tag) {
            var items = isArray(tag) ? tag : [tag];
            acc.push.apply(acc, items);
            return acc;
        }, []);
        var prop = this.prop(this.valueField, this.valuePrimitive);
        return tags.find(function (tag) { return prop(tag) === prop(value); });
    };
    MultiSelectComponent.prototype.firstFocusableIndex = function (index) {
        var maxIndex = this.dataService.itemsCount;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            var nextIndex = index + 1;
            return (nextIndex < maxIndex) ? this.firstFocusableIndex(nextIndex) : undefined;
        }
        else {
            return index;
        }
    };
    MultiSelectComponent.prototype.nextTick = function (f) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            // Use `setTimeout` instead of a resolved promise
            // because the latter does not wait long enough.
            setTimeout(function () { return _this._zone.run(f); });
        });
    };
    MultiSelectComponent.prototype.setMessages = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            clearTimeout(_this.messagesTimeout);
            _this.messagesTimeout = setTimeout(function () {
                _this.noDataText = _this.localization.get('noDataText');
                _this.cdr.detectChanges();
            });
        });
    };
    MultiSelectComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoMultiSelect',
                    providers: [
                        MULTISELECT_VALUE_ACCESSOR,
                        DataService,
                        SelectionService,
                        NavigationService,
                        DisabledItemsService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.multiselect'
                        },
                        {
                            provide: FilterableDropDownComponentBase, useExisting: forwardRef(function () { return MultiSelectComponent; })
                        },
                        {
                            provide: KendoInput, useExisting: forwardRef(function () { return MultiSelectComponent; })
                        }
                    ],
                    selector: 'kendo-multiselect',
                    template: "\n        <ng-container kendoMultiSelectLocalizedMessages\n            i18n-noDataText=\"kendo.multiselect.noDataText|The text displayed in the popup when there are no items\"\n            noDataText=\"NO DATA FOUND\"\n\n            i18n-clearTitle=\"kendo.combobox.clearTitle|The title of the clear button\"\n            clearTitle=\"clear\"\n        >\n        </ng-container>\n        <div class=\"k-multiselect-wrap k-floatwrap\"\n            #wrapper\n            (mousedown)=\"wrapperMousedown($event)\"\n        >\n            <kendo-taglist\n                role=\"listbox\"\n                [id]=\"tagListId\"\n                [tags]=\"tags\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [focused]=\"focusedTagIndex\"\n                [disabled]=\"disabled\"\n                [template]=\"tagTemplate\"\n                [groupTemplate]=\"groupTagTemplate\"\n                [tagPrefix]=\"tagPrefix\"\n                (removeTag)=\"handleRemoveTag($event)\"\n            >\n            </kendo-taglist>\n            <kendo-searchbar\n                #searchbar\n                [id]=\"focusableId\"\n                [role]=\"'listbox'\"\n                [tagListId]=\"tagListId\"\n                [activeDescendant]=\"activeDescendant\"\n                [noDataLabel]=\"noDataLabel\"\n                [userInput]=\"text\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [tabIndex]=\"tabIndex\"\n                [popupOpen]=\"isOpen\"\n                [placeholder]=\"placeholder\"\n                (onNavigate)=\"handleNavigate($event)\"\n                (valueChange)=\"handleFilter($event)\"\n                (onBlur)=\"onSearchBarBlur()\"\n                (onFocus)=\"onSearchBarFocus()\"\n            >\n            </kendo-searchbar>\n            <span *ngIf=\"!loading && !readonly && clearButton && (tags?.length || text?.length)\" class=\"k-icon k-clear-value k-i-close\" [attr.title]=\"clearTitle\" role=\"button\" tabindex=\"-1\" (mousedown)=\"clearAll($event)\"></span>\n            <span *ngIf=\"loading\" class=\"k-icon k-i-loading\"></span>\n        </div>\n        <ng-template #popupTemplate>\n            <!--header template-->\n            <ng-template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </ng-template>\n            <!--custom item template-->\n            <div class=\"k-list\" *ngIf=\"allowCustom && text\">\n                <div class=\"k-item k-custom-item\" kendoDropDownsSelectable [multipleSelection]=\"true\" [index]=\"-1\">\n                    <ng-template *ngIf=\"customItemTemplate;else default_custom_item_template\"\n                        [templateContext]=\"{\n                            templateRef: customItemTemplate.templateRef,\n                            $implicit: text\n                        }\">\n                    </ng-template>\n                    <ng-template #default_custom_item_template>{{ text }}</ng-template>\n                    <span class=\"k-icon k-i-plus\" style=\"float: right\"></span>\n                </div>\n            </div>\n            <!--list-->\n            <kendo-list\n                #optionsList\n                [id]=\"listBoxId\"\n                [optionPrefix]=\"optionPrefix\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [height]=\"listHeight\"\n                [template]=\"template\"\n                [groupTemplate]=\"groupTemplate\"\n                [fixedGroupTemplate]=\"fixedGroupTemplate\"\n                [show]=\"isOpen\"\n                [multipleSelection]=\"true\"\n                [virtual]=\"virtual\"\n                (pageChange)=\"pageChange($event)\"\n                >\n            </kendo-list>\n            <!--no data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <ng-template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!noDataTemplate\">\n                    <div>{{ noDataText }}</div>\n                </ng-template>\n            </div>\n            <!--footer template-->\n            <ng-template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </ng-template>\n        </ng-template>\n        <ng-template [ngIf]=\"isOpen\">\n            <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n        </ng-template>\n        <ng-container #container></ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PopupService },
        { type: DataService },
        { type: SelectionService },
        { type: NavigationService },
        { type: DisabledItemsService },
        { type: ChangeDetectorRef },
        { type: KeyValueDiffers },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
    ]; };
    MultiSelectComponent.propDecorators = {
        focusableId: [{ type: Input }],
        autoClose: [{ type: Input }],
        loading: [{ type: Input }],
        data: [{ type: Input }],
        value: [{ type: Input }],
        valueField: [{ type: Input }],
        textField: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input, args: ["tabIndex",] }],
        placeholder: [{ type: Input }],
        disabled: [{ type: Input }],
        itemDisabled: [{ type: Input }],
        readonly: [{ type: Input }],
        filterable: [{ type: Input }],
        virtual: [{ type: Input }],
        popupSettings: [{ type: Input }],
        listHeight: [{ type: Input }],
        valuePrimitive: [{ type: Input }],
        clearButton: [{ type: Input }],
        tagMapper: [{ type: Input }],
        allowCustom: [{ type: Input }],
        valueNormalizer: [{ type: Input }],
        filterChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        removeTag: [{ type: Output }],
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        searchbar: [{ type: ViewChild, args: [SearchBarComponent,] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
        wrapper: [{ type: ViewChild, args: ['wrapper',] }],
        optionsList: [{ type: ViewChild, args: ['optionsList',] }],
        template: [{ type: ContentChild, args: [ItemTemplateDirective,] }],
        customItemTemplate: [{ type: ContentChild, args: [CustomItemTemplateDirective,] }],
        groupTemplate: [{ type: ContentChild, args: [GroupTemplateDirective,] }],
        fixedGroupTemplate: [{ type: ContentChild, args: [FixedGroupTemplateDirective,] }],
        headerTemplate: [{ type: ContentChild, args: [HeaderTemplateDirective,] }],
        footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }],
        tagTemplate: [{ type: ContentChild, args: [TagTemplateDirective,] }],
        groupTagTemplate: [{ type: ContentChild, args: [GroupTagTemplateDirective,] }],
        noDataTemplate: [{ type: ContentChild, args: [NoDataTemplateDirective,] }],
        widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-multiselect',] }, { type: HostBinding, args: ['class.k-header',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        focusedClass: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
    };
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
