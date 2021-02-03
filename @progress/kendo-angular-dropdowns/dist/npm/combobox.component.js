/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:no-null-keyword */
/* tslint:disable:max-line-length */
/* tslint:disable:member-ordering */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var searchbar_component_1 = require("./searchbar.component");
var item_template_directive_1 = require("./templates/item-template.directive");
var header_template_directive_1 = require("./templates/header-template.directive");
var footer_template_directive_1 = require("./templates/footer-template.directive");
var group_template_directive_1 = require("./templates/group-template.directive");
var fixed_group_template_directive_1 = require("./templates/fixed-group-template.directive");
var no_data_template_directive_1 = require("./templates/no-data-template.directive");
var selection_service_1 = require("./selection.service");
var navigation_service_1 = require("./navigation.service");
var disabled_items_service_1 = require("./disabled-items.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var util_1 = require("./util");
var navigation_action_1 = require("./navigation-action");
var keys_1 = require("./common/keys");
var preventable_event_1 = require("./common/preventable-event");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var touch_enabled_1 = require("./touch-enabled");
var error_messages_1 = require("./error-messages");
var filterable_base_component_1 = require("./filterable-base.component");
var data_service_1 = require("./data.service");
var list_component_1 = require("./list.component");
var virtualization_settings_1 = require("./virtualization-settings");
/**
 * @hidden
 */
exports.COMBOBOX_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: core_1.forwardRef(function () { return ComboBoxComponent; })
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
var ComboBoxComponent = /** @class */ (function () {
    function ComboBoxComponent(localization, popupService, selectionService, navigationService, disabledItemsService, dataService, _zone, cdr, renderer, wrapper, touchEnabled) {
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
        this.focusableId = "k-" + util_1.guid();
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
        this.valueNormalizer = function (text) {
            return text.pipe(operators_1.map(function (userInput) { return userInput; }));
        };
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
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time an item selection is changed
         * ([see example]({% slug overview_combobox %}#toc-events)).
         */
        this.selectionChange = new core_1.EventEmitter();
        /**
         * Fires each time the user types in the input field.
         * You can filter the source based on the passed filtration value
         * ([see example]({% slug overview_combobox %}#toc-events)).
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new core_1.EventEmitter();
        /**
         * Fires each time the user focuses the ComboBox.
         */
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the ComboBox gets blurred.
         */
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        this.widgetClasses = true;
        this.isFocused = false;
        this.listBoxId = util_1.guid();
        this.optionPrefix = util_1.guid();
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function (_) { };
        this._filtering = false;
        this._text = "";
        this._open = false;
        this._popupSettings = { animate: true };
        this.popupMouseDownHandler = function (event) { return event.preventDefault(); };
        this.customValueSubject = new rxjs_1.Subject();
        this.valueSubject = new rxjs_1.Subject();
        this.clearValueSubject = new rxjs_1.Subject();
        this.selectionSubject = new rxjs_1.Subject();
        this.subs = new rxjs_1.Subscription();
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.wrapper = wrapper.nativeElement;
        this.data = [];
    }
    Object.defineProperty(ComboBoxComponent.prototype, "width", {
        get: function () {
            var wrapperOffsetWidth = 0;
            if (kendo_angular_common_1.isDocumentAvailable()) {
                wrapperOffsetWidth = this.wrapper.offsetWidth;
            }
            var width = this.popupSettings.width || wrapperOffsetWidth;
            var minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : wrapperOffsetWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "height", {
        get: function () {
            var popupHeight = this.popupSettings.height;
            return util_1.isPresent(popupHeight) ? popupHeight + "px" : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = util_1.isPresent(text) ? text.toString() : "";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.togglePopup = function (open) {
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
    Object.defineProperty(ComboBoxComponent.prototype, "activeDescendant", {
        get: function () {
            var dataItem = this.dataService.itemAt(this.selectionService.focused);
            return this.optionPrefix + "-" + (dataItem ? util_1.getter(dataItem, this.valueField) : "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "noDataLabel", {
        get: function () {
            if (this.data.length === 0) {
                return this.noDataText;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "clearTitle", {
        get: function () {
            return this.localization.get('clearTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "appendTo", {
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
    Object.defineProperty(ComboBoxComponent.prototype, "data", {
        get: function () {
            var virtual = this.virtual;
            if (virtual) {
                var start = virtual.skip || 0;
                var end = start + virtual.pageSize;
                // Use length instead of itemsCount because of the grouping.
                virtual.total = this.dataService.data.length;
                return this.dataService.data.slice(start, end);
            }
            return this.dataService.data;
        },
        /**
         * Sets the data of the ComboBox.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
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
                this.suggestedText = util_1.getter(this.dataService.itemAt(0), this.textField);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the ComboBox.
         * It can either be of the primitive (string, numbers) or of the complex (objects) type.
         * To define the type, use the `valuePrimitive` option.
         *
         * > All selected values which are not present in the dataset are considered custom values.
         * > When the `Enter` key is pressed or the component loses focus, custom values get dismissed unless `allowCustom` is set to `true`.
         */
        set: function (newValue) {
            this.verifySettings(newValue);
            this._value = newValue;
            this.cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
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
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "itemDisabled", {
        /**
         * Defines a Boolean function that is executed for each data item in the component
         * ([see examples]({% slug disableditems_combobox %})). Determines whether the item will be disabled.
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
    Object.defineProperty(ComboBoxComponent.prototype, "tabIndex", {
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
    Object.defineProperty(ComboBoxComponent.prototype, "virtual", {
        get: function () {
            return this._virtualSettings;
        },
        /**
         * Enables the [virtualization]({% slug virtualization_combobox %}) functionality.
         */
        set: function (settings) {
            this._virtualSettings = virtualization_settings_1.normalizeVirtualizationSettings(settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "clearable", {
        get: function () {
            return this.clearButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    ComboBoxComponent.prototype.ngOnInit = function () {
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        this.attachStreams();
        this.createSelectionStream();
        this.createValueStream();
        this.setMessages();
    };
    ComboBoxComponent.prototype.createValueStream = function () {
        var _this = this;
        var valueFrom = this.prop(this.valueField, this.valuePrimitive);
        var textFrom = this.prop(this.textField, this.valuePrimitive);
        var valueStream = this.valueSubject.pipe(operators_1.filter(function (candidate) {
            var current = valueFrom(_this.value);
            var newValue = valueFrom(candidate);
            var newText = textFrom(candidate);
            if (!util_1.isPresent(_this.value) && !util_1.isPresent(newValue)) {
                return false;
            }
            if (util_1.isPresent(newText)) {
                newText = newText.toString();
            }
            if (current === newValue && _this.text === newText) {
                return false;
            }
            else {
                return true;
            }
        }), operators_1.map(function (candidate) {
            var newValue = valueFrom(candidate);
            var newText = textFrom(candidate);
            return {
                dataItem: candidate,
                text: newText,
                value: _this.valuePrimitive ? newValue : candidate
            };
        }));
        var customValueStreams = operators_1.partition(function () { return _this.allowCustom; })(this.customValueSubject.pipe(operators_1.throttleTime(300)));
        var allowCustomValueStream = customValueStreams[0].pipe(operators_1.tap(function () {
            _this.loading = true;
            _this.disabled = true;
            _this.cdr.detectChanges();
        }), operators_1.filter(function () {
            var hasChange = _this.text !== valueFrom(_this.value);
            _this.loading = hasChange;
            _this.disabled = hasChange;
            return hasChange;
        }), this.valueNormalizer, operators_1.map(function (normalizedValue) {
            return {
                custom: true,
                dataItem: normalizedValue,
                text: _this.text,
                value: normalizedValue
            };
        }));
        var disableCustomValueStream = customValueStreams[1].pipe(operators_1.map(function () {
            return {
                custom: true,
                dataItem: undefined,
                text: undefined,
                value: undefined
            };
        }));
        var clearValueStream = this.clearValueSubject.pipe(operators_1.map(function () { return ({
            dataItem: undefined,
            text: undefined,
            value: undefined
        }); }));
        if (this.valueSubscription) {
            this.valueSubscription.unsubscribe();
        }
        var merged = rxjs_1.merge(valueStream, allowCustomValueStream, disableCustomValueStream, clearValueStream);
        this.valueSubscription = merged.pipe(operators_1.catchError(function () {
            _this.dataItem = undefined;
            _this.value = undefined;
            _this.text = undefined;
            _this.loading = false;
            _this.disabled = false;
            _this.emitSelectionChange(undefined);
            _this.emitValueChange();
            _this.createValueStream();
            return rxjs_1.of(null);
        }))
            .subscribe(function (state) {
            _this.dataItem = state.dataItem;
            _this.value = state.value;
            var textCleared = (util_1.isPresent(_this.text) && _this.text.length) && !util_1.isPresent(state.text);
            _this.text = state.text;
            _this.loading = false;
            _this.disabled = false;
            if (_this.filterable && !util_1.isPresent(state.value) && textCleared) {
                _this.filterChange.emit("");
            }
            if (state.custom) {
                _this.selectionService.focused = -1;
            }
            _this.emitSelectionChange(state.custom ? undefined : _this.dataItem);
            _this.emitValueChange();
        });
    };
    ComboBoxComponent.prototype.attachStreams = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.subs.add(this.localization
            .changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.setMessages();
        }));
        this.subs.add(rxjs_1.merge(this.navigationService.up, this.navigationService.down, this.navigationService.home, this.navigationService.end)
            .pipe(operators_1.filter(function (event) { return util_1.isPresent(event.index); }))
            .subscribe(function (event) { return _this.navigate(event.index); }));
        this.subs.add(this.navigationService.open.subscribe(function () { return _this.togglePopup(true); }));
        this.subs.add(this.navigationService.close.subscribe(function () { return _this.togglePopup(false); }));
        this.subs.add(this.navigationService.esc.subscribe(this.handleBlur.bind(this)));
        this.subs.add(this.navigationService.enter.pipe(operators_1.tap(function (event) {
            if (_this.isOpen) {
                event.originalEvent.preventDefault();
            }
        }))
            .subscribe(this.handleEnter.bind(this)));
        this.subs.add(rxjs_1.merge(this.selectionService.onChange, this.selectionService.onSelect.pipe(operators_1.filter(function (_) { return !_this.isOpen; })))
            .pipe(operators_1.tap(function (_) {
            _this._filtering = false;
            _this.togglePopup(false);
        }), operators_1.map(function (event) { return _this.dataService.itemAt(event.indices[0]); }))
            .subscribe(function (dataItem) {
            _this.change(dataItem);
        }));
        this.subs.add(this.selectionService.onSelect.pipe(operators_1.filter(function (_) { return _this.isOpen; }), operators_1.tap(function (_) { return _this._filtering = false; }), operators_1.map(function (event) { return _this.dataService.itemAt(event.indices[0]); }))
            .subscribe(function (dataItem) {
            _this.updateState({ dataItem: dataItem });
            _this.emitSelectionChange(dataItem);
        }));
    };
    ComboBoxComponent.prototype.ngOnDestroy = function () {
        this.destroyPopup();
        clearTimeout(this.messagesTimeout);
        this.subs.unsubscribe();
        [this.valueSubscription, this.selectionSubscription].forEach(function (sub) { return util_1.isPresent(sub) && sub.unsubscribe(); });
    };
    ComboBoxComponent.prototype.ngOnChanges = function (changes) {
        var virtual = this.virtual;
        var requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        this.verifySettings(this.value);
        if (kendo_angular_common_1.isChanged("valueNormalizer", changes)) {
            this.createValueStream();
        }
        if (kendo_angular_common_1.isChanged("value", changes)) {
            this.createSelectionStream();
        }
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        var STATE_PROPS = /(value|textField|valueField|valuePrimitive)/g;
        if (STATE_PROPS.test(Object.keys(changes).join())) {
            this.setState();
        }
    };
    /**
     * Focuses the ComboBox.
     */
    ComboBoxComponent.prototype.focus = function () {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    };
    /**
     * Blurs the ComboBox.
     */
    ComboBoxComponent.prototype.blur = function () {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup,
     * the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    ComboBoxComponent.prototype.toggle = function (open) {
        var _this = this;
        Promise.resolve(null).then(function () {
            _this._toggle(open);
            _this.cdr.markForCheck();
        });
    };
    Object.defineProperty(ComboBoxComponent.prototype, "isOpen", {
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
     * Resets the value of the ComboBox.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    ComboBoxComponent.prototype.reset = function () {
        this.value = undefined;
        this.clearState();
        this.resetSelection();
        this.createSelectionStream();
    };
    /**
     * @hidden
     *
     * Used by the TextBoxContainer to determine if the floating label
     * should be rendered in the input when the component is not focused.
     */
    ComboBoxComponent.prototype.isEmpty = function () {
        return !(util_1.isPresent(this.text) && this.text.length);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.clearValue = function (event) {
        event.stopImmediatePropagation();
        this.focus();
        this._filtering = true;
        this._previousDataItem = undefined;
        this.selectionService.resetSelection([]);
        this.clearValueSubject.next();
        this._filtering = false;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.writeValue = function (value) {
        this.text = "";
        this.value = value === null ? undefined : value;
        this.setState();
        this.createSelectionStream();
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(ComboBoxComponent.prototype, "buttonClasses", {
        /**
         * @hidden
         */
        get: function () {
            return this.loading ? 'k-i-loading' : this.iconClass || 'k-i-arrow-s';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.onResize = function () {
        if (this.isOpen) {
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    };
    ComboBoxComponent.prototype.verifySettings = function (newValue) {
        var valueOrText = !util_1.isPresent(this.valueField) !== !util_1.isPresent(this.textField);
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.valuePrimitive === true && util_1.isPresent(newValue) && typeof newValue === "object") {
            throw new Error(error_messages_1.ComboBoxMessages.primitive);
        }
        if (this.valuePrimitive === false && util_1.isPresent(newValue) && typeof newValue !== "object") {
            throw new Error(error_messages_1.ComboBoxMessages.object);
        }
        if (valueOrText) {
            throw new Error(error_messages_1.ComboBoxMessages.textAndValue);
        }
        if (this.virtual && isNaN(this.virtual.itemHeight)) {
            throw new Error(error_messages_1.ComboBoxMessages.noItemHeight);
        }
    };
    ComboBoxComponent.prototype.setState = function () {
        // Filtering in process, do nothing.
        if (this._filtering) {
            return;
        }
        var value = this.value;
        var valueField = this.valueField;
        var primitive = this.valuePrimitive;
        var resolved = this.findDataItem({ primitive: primitive, valueField: valueField, value: value });
        if (util_1.isPresent(resolved.dataItem)) {
            this.updateState({ dataItem: resolved.dataItem, confirm: true });
            this.resetSelection(resolved.index);
        }
        else if (util_1.isPresent(value) && this.allowCustom) {
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
    };
    ComboBoxComponent.prototype.updateState = function (_a) {
        var dataItem = _a.dataItem, _b = _a.confirm, confirm = _b === void 0 ? false : _b;
        this.dataItem = dataItem;
        this.text = this.prop(this.textField, this.valuePrimitive)(dataItem);
        if (confirm) {
            this._previousDataItem = dataItem;
        }
    };
    ComboBoxComponent.prototype.clearState = function () {
        this.text = undefined;
        this.dataItem = undefined;
    };
    ComboBoxComponent.prototype.resetSelection = function (index) {
        var clear = !util_1.isPresent(index) || index < 0;
        this.selectionService.resetSelection(clear ? [] : [index]);
        this.selectionService.focused = index;
    };
    ComboBoxComponent.prototype.firstFocusableIndex = function (index) {
        var maxIndex = this.data.length - 1;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index < maxIndex) ? this.firstFocusableIndex(index + 1) : undefined;
        }
        else {
            return index;
        }
    };
    ComboBoxComponent.prototype.findIndexPredicate = function (text) {
        var _this = this;
        if (this.dataService.grouped) {
            return function (item) {
                var itemText = _this.prop(_this.textField, _this.valuePrimitive)(item.value);
                itemText = !util_1.isPresent(itemText) ? "" : itemText.toString().toLowerCase();
                return itemText.startsWith(text.toLowerCase());
            };
        }
        else {
            return function (item) {
                var itemText = _this.prop(_this.textField, _this.valuePrimitive)(item);
                itemText = !util_1.isPresent(itemText) ? "" : itemText.toString().toLowerCase();
                return itemText.startsWith(text.toLowerCase());
            };
        }
    };
    ComboBoxComponent.prototype.prop = function (field, usePrimitive) {
        return function (dataItem) {
            if (util_1.isPresent(dataItem)) {
                if (usePrimitive) {
                    return field && util_1.isObject(dataItem) ? dataItem[field] : dataItem;
                }
                else {
                    return dataItem[field];
                }
            }
            return null;
        };
    };
    ComboBoxComponent.prototype.findDataItem = function (_a) {
        var primitive = _a.primitive, valueField = _a.valueField, value = _a.value;
        var result = {
            dataItem: null,
            index: -1
        };
        var prop = this.prop(valueField, primitive);
        var comparer;
        if (this.dataService.grouped) {
            comparer = function (element) {
                return prop(element.value) === prop(value);
            };
        }
        else {
            comparer = function (element) {
                return prop(element) === prop(value);
            };
        }
        var index = this.dataService.findIndex(comparer);
        result.dataItem = this.dataService.itemAt(index);
        result.index = index;
        return result;
    };
    ComboBoxComponent.prototype.search = function (text, startFrom) {
        if (startFrom === void 0) { startFrom = 0; }
        var index;
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
                this.suggestedText = util_1.getter(this.dataService.itemAt(index), this.textField);
            }
        }
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.getSuggestion = function () {
        var hasSelected = !!this.selectionService.selected.length;
        var shouldSuggest = this.suggest && !this.backspacePressed && this.suggestedText && this.text;
        if (!hasSelected && shouldSuggest && this.suggestedText.toLowerCase().startsWith(this.text.toLowerCase())) {
            return this.suggestedText;
        }
        else {
            this.suggestedText = undefined;
        }
    };
    ComboBoxComponent.prototype.navigate = function (index) {
        if (this.dataService.itemsCount === 0) {
            return;
        }
        this.text = this.prop(this.textField, this.valuePrimitive)(this.dataService.itemAt(index));
        this.selectionService.select(index);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.handleNavigate = function (event) {
        var hasSelected = util_1.isPresent(this.selectionService.selected[0]);
        var focused = isNaN(this.selectionService.focused) ? this.firstFocusableIndex(0) : this.selectionService.focused;
        var offset = 0;
        if (this.disabled || this.readonly) {
            return;
        }
        if (event.keyCode === keys_1.Keys.home || event.keyCode === keys_1.Keys.end) {
            return;
        }
        if (!hasSelected) {
            if (event.keyCode === keys_1.Keys.down) {
                offset = -1;
            }
            else if (event.keyCode === keys_1.Keys.up) {
                offset = 1;
            }
        }
        var action = this.navigationService.process({
            current: offset + focused,
            max: this.dataService.itemsCount - 1,
            min: 0,
            originalEvent: event
        });
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Left &&
            action !== navigation_action_1.NavigationAction.Right &&
            action !== navigation_action_1.NavigationAction.Backspace &&
            action !== navigation_action_1.NavigationAction.Delete &&
            ((action === navigation_action_1.NavigationAction.Enter && this.isOpen) || action !== navigation_action_1.NavigationAction.Enter)) {
            event.preventDefault();
        }
    };
    ComboBoxComponent.prototype.handleEnter = function () {
        var text = this.text;
        var focused = this.selectionService.focused;
        var hasFocused = util_1.isPresent(focused) && focused !== -1;
        var previousText = util_1.getter(this._previousDataItem, this.textField) || "";
        var focusedItemText = util_1.getter(this.dataService.itemAt(focused), this.textField);
        var textHasChanged = text !== previousText;
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
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.handleBlur = function () {
        this._filtering = false;
        var currentText = this.searchbar.value; // The value is updated, but the Angular `change` event is not emitted yet and `this.text` is not updated. Fails on suggested text.
        if (!currentText && !util_1.isPresent(this._previousDataItem) && !util_1.isPresent(this.dataItem)) {
            this.togglePopup(false);
            this.isFocused = false;
            this.onBlur.emit();
            this.onTouchedCallback();
            return;
        }
        var focused = this.selectionService.focused;
        var itemText;
        var isItemFocused = focused !== -1 && focused !== undefined;
        if (isItemFocused) {
            itemText = util_1.getter(this.dataService.itemAt(focused), this.textField);
            itemText = !util_1.isPresent(itemText) ? "" : itemText.toString().toLowerCase();
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
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.searchBarChange = function (text) {
        var currentTextLength = this.text ? this.text.length : 0;
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
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.handleFocus = function () {
        this.isFocused = true;
        this.onFocus.emit();
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.pageChange = function (event) {
        var virtual = this.virtual;
        virtual.skip = event.skip;
    };
    ComboBoxComponent.prototype.change = function (candidate, isCustom) {
        if (isCustom === void 0) { isCustom = false; }
        if (isCustom) {
            this.customValueSubject.next(candidate);
        }
        else {
            this.valueSubject.next(candidate);
        }
    };
    ComboBoxComponent.prototype.emitSelectionChange = function (dataItem) {
        this.selectionSubject.next(dataItem);
    };
    ComboBoxComponent.prototype.emitValueChange = function () {
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
        this._previousDataItem = this.dataItem;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.selectClick = function () {
        if (!this.touchEnabled) {
            this.searchbar.focus();
        }
        this.togglePopup(!this.isOpen);
    };
    Object.defineProperty(ComboBoxComponent.prototype, "listContainerClasses", {
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
    ComboBoxComponent.prototype.useSuggestion = function () {
        if (!(this.suggest && util_1.isPresent(this.searchbar.value))) {
            return false;
        }
        var focusedDataItem = this.dataService.itemAt(this.selectionService.focused);
        var focusedItemText = this.prop(this.textField, this.valuePrimitive)(focusedDataItem);
        if (!util_1.isPresent(focusedItemText)) {
            return false;
        }
        return this.searchbar.value.toLowerCase() === focusedItemText.toLowerCase();
    };
    ComboBoxComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    ComboBoxComponent.prototype.createPopup = function () {
        var _this = this;
        var horizontalAlign = this.direction === "rtl" ? "right" : "left";
        var anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        var popupPosition = { horizontal: horizontalAlign, vertical: "top" };
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
        this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.togglePopup(false); });
    };
    ComboBoxComponent.prototype._toggle = function (open) {
        this._open = (open === undefined) ? !this._open : open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    ComboBoxComponent.prototype.triggerPopupEvents = function (open) {
        var eventArgs = new preventable_event_1.PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    ComboBoxComponent.prototype.setMessages = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            clearTimeout(_this.messagesTimeout);
            _this.messagesTimeout = setTimeout(function () {
                _this.noDataText = _this.localization.get('noDataText');
                _this.cdr.detectChanges();
            });
        });
    };
    ComboBoxComponent.prototype.createSelectionStream = function () {
        var _this = this;
        if (util_1.isPresent(this.selectionSubscription)) {
            this.selectionSubscription.unsubscribe();
        }
        this.selectionSubscription = this.selectionSubject
            .pipe(operators_1.distinctUntilChanged())
            .subscribe(function (dataItem) { return _this.selectionChange.emit(dataItem); });
    };
    ComboBoxComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoComboBox',
                    providers: [
                        exports.COMBOBOX_VALUE_ACCESSOR,
                        data_service_1.DataService,
                        selection_service_1.SelectionService,
                        navigation_service_1.NavigationService,
                        disabled_items_service_1.DisabledItemsService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.combobox'
                        },
                        {
                            provide: filterable_base_component_1.FilterableDropDownComponentBase, useExisting: core_1.forwardRef(function () { return ComboBoxComponent; })
                        },
                        {
                            provide: kendo_angular_common_1.KendoInput, useExisting: core_1.forwardRef(function () { return ComboBoxComponent; })
                        }
                    ],
                    selector: 'kendo-combobox',
                    template: "\n        <ng-container kendoComboBoxLocalizedMessages\n            i18n-noDataText=\"kendo.combobox.noDataText|The text displayed in the popup when there are no items\"\n            noDataText=\"NO DATA FOUND\"\n\n            i18n-clearTitle=\"kendo.combobox.clearTitle|The title of the clear button\"\n            clearTitle=\"clear\"\n        >\n        </ng-container>\n        <span #wrapper unselectable=\"on\"\n            class=\"k-dropdown-wrap\"\n            [ngClass]=\"{ 'k-state-default': !disabled, 'k-state-disabled': disabled, 'k-state-focused': isFocused }\"\n        >\n          <kendo-searchbar #searchbar\n              [role]=\"'combobox'\"\n              [id]=\"focusableId\"\n              [listId]=\"listBoxId\"\n              [activeDescendant]=\"activeDescendant\"\n              [noDataLabel]=\"noDataLabel\"\n              [userInput]=\"text\"\n              [suggestedText]=\"getSuggestion()\"\n              [disabled]=\"disabled\"\n              [readonly]=\"readonly\"\n              [tabIndex]=\"tabIndex\"\n              [popupOpen]=\"isOpen\"\n              [placeholder]=\"placeholder\"\n              (onNavigate)=\"handleNavigate($event)\"\n              (valueChange)=\"searchBarChange($event)\"\n              (onBlur)=\"handleBlur()\"\n              (onFocus)=\"handleFocus()\"\n          ></kendo-searchbar>\n          <span *ngIf=\"!loading && !readonly && (clearButton && text?.length)\" class=\"k-icon k-clear-value k-i-close\" [attr.title]=\"clearTitle\" role=\"button\" tabindex=\"-1\" (click)=\"clearValue($event)\" (mousedown)=\"$event.preventDefault()\"></span>\n          <span unselectable=\"on\"\n              class=\"k-select\"\n              (click)=\"selectClick()\"\n              (mousedown)=\"$event.preventDefault()\" >\n              <span class=\"k-icon\" [ngClass]=\"buttonClasses\">\n               </span>\n          </span>\n          <ng-template #popupTemplate>\n              <!--header template-->\n              <ng-template *ngIf=\"headerTemplate\"\n                  [templateContext]=\"{\n                      templateRef: headerTemplate.templateRef\n                  }\">\n              </ng-template>\n              <!--list-->\n              <kendo-list\n                  #optionsList\n                  [id]=\"listBoxId\"\n                  [optionPrefix]=\"optionPrefix\"\n                  [data]=\"data\"\n                  [textField]=\"textField\"\n                  [valueField]=\"valueField\"\n                  [template]=\"template\"\n                  [groupTemplate]=\"groupTemplate\"\n                  [fixedGroupTemplate]=\"fixedGroupTemplate\"\n                  [height]=\"listHeight\"\n                  [show]=\"isOpen\"\n                  [virtual]=\"virtual\"\n                  (pageChange)=\"pageChange($event)\"\n              >\n              </kendo-list>\n              <!--no-data template-->\n              <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                  <ng-template [ngIf]=\"noDataTemplate\"\n                      [templateContext]=\"{\n                          templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                      }\">\n                  </ng-template>\n                  <ng-template [ngIf]=\"!noDataTemplate\">\n                      <div>{{ noDataText }}</div>\n                  </ng-template>\n              </div>\n              <!--footer template-->\n              <ng-template *ngIf=\"footerTemplate\"\n                  [templateContext]=\"{\n                      templateRef: footerTemplate.templateRef\n                  }\">\n              </ng-template>\n          </ng-template>\n        </span>\n        <ng-template [ngIf]=\"isOpen\">\n            <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n        </ng-template>\n        <ng-container #container></ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    ComboBoxComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: kendo_angular_popup_1.PopupService },
        { type: selection_service_1.SelectionService },
        { type: navigation_service_1.NavigationService },
        { type: disabled_items_service_1.DisabledItemsService },
        { type: data_service_1.DataService },
        { type: core_1.NgZone },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [touch_enabled_1.TOUCH_ENABLED,] }] }
    ]; };
    ComboBoxComponent.propDecorators = {
        focusableId: [{ type: core_1.Input }],
        allowCustom: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        valueField: [{ type: core_1.Input }],
        valuePrimitive: [{ type: core_1.Input }],
        valueNormalizer: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        listHeight: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        suggest: [{ type: core_1.Input }],
        clearButton: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        itemDisabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input, args: ["tabIndex",] }],
        filterable: [{ type: core_1.Input }],
        virtual: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        selectionChange: [{ type: core_1.Output }],
        filterChange: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        template: [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] }],
        headerTemplate: [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] }],
        footerTemplate: [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] }],
        noDataTemplate: [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] }],
        groupTemplate: [{ type: core_1.ContentChild, args: [group_template_directive_1.GroupTemplateDirective,] }],
        fixedGroupTemplate: [{ type: core_1.ContentChild, args: [fixed_group_template_directive_1.FixedGroupTemplateDirective,] }],
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        searchbar: [{ type: core_1.ViewChild, args: [searchbar_component_1.SearchBarComponent,] }],
        optionsList: [{ type: core_1.ViewChild, args: ['optionsList',] }],
        widgetClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-combobox',] }, { type: core_1.HostBinding, args: ['class.k-header',] }],
        clearable: [{ type: core_1.HostBinding, args: ['class.k-combobox-clearable',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }]
    };
    return ComboBoxComponent;
}());
exports.ComboBoxComponent = ComboBoxComponent;
