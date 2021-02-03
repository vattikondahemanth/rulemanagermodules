/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var models_1 = require("./models");
var color_parser_1 = require("./utils/color-parser");
var utils_1 = require("../common/utils");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var DEFAULT_PRESET = 'office';
var DEFAULT_ACCESSIBLE_PRESET = 'accessible';
var palette_presets_1 = require("./utils/palette-presets");
/**
 * Represents the [Kendo UI ColorPicker component for Angular]({% slug overview_colorpicker %}).
 * Designed to replace the `<input type="color">` HTML5 tag which is not widely supported in browsers.
 */
var ColorPickerComponent = /** @class */ (function () {
    function ColorPickerComponent(popupService, localizationService) {
        var _this = this;
        this.popupService = popupService;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * Sets what view the ColorPicker will render in the popup.
         */
        this.view = 'gradient';
        /**
         * Sets the read-only state of the ColorPicker.
         */
        this.readonly = false;
        /**
         * Sets the disabled state of the ColorPicker.
         */
        this.disabled = false;
        /**
         * Specifies the output format of the ColorPicker.
         * The input value may be in a different format. However, it will be parsed into the output `format`
         * after the component processes it.
         *
         * If the `gradient` view is used with the `opacity` option set to true, this setting will be ignored and `rgba` will be used instead.
         *
         * The supported values are:
         * * `rgba` (default)
         * * `hex`
         * * [`name`](https://www.w3.org/wiki/CSS/Properties/color/keywords)
         */
        this.format = 'rgba';
        /**
         * Fires each time the value is changed.
         */
        this.valueChange = new core_1.EventEmitter();
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
         * Fires each time ColorPicker is focused.
         */
        this.onFocus = new core_1.EventEmitter();
        /**
         * Fires each time the ColorPicker is blurred.
         */
        this.onBlur = new core_1.EventEmitter();
        /**
         * Fires each time the left side of the ColorPicker wrapper is clicked.
         * The event is triggered regardless of whether a ColorPicker icon is set or not.
         *
         * The [`ActiveColorClickEvent`]({% slug api_inputs_activecolorclickevent %}) event provides the option to prevent the popup opening.
         */
        this.activeColorClick = new core_1.EventEmitter();
        this._tabindex = 0;
        this._popupSettings = { animate: true };
        this._paletteSettings = {};
        this._gradientSettings = { opacity: true, clearButton: false };
        this.notifyNgTouched = function () { };
        this.notifyNgChanged = function () { };
        this.dynamicRTLSubscription = localizationService.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    Object.defineProperty(ColorPickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Specifies the value of the initially selected color.
         */
        set: function (value) {
            this._value = color_parser_1.parseColor(value, this.format);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the ColorPicker.
         */
        set: function (value) {
            this._popupSettings = Object.assign(this._popupSettings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "paletteSettings", {
        get: function () {
            return this._paletteSettings;
        },
        /**
         * Configures the palette that is displayed in the ColorPicker popup.
         */
        set: function (value) {
            this._paletteSettings = Object.assign(this._paletteSettings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "gradientSettings", {
        get: function () {
            return this._gradientSettings;
        },
        /**
         * Configures the gradient that is displayed in the ColorPicker popup.
         */
        set: function (value) {
            this._gradientSettings = Object.assign(this._gradientSettings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "tabindex", {
        get: function () {
            return !this.disabled ? this._tabindex : undefined;
        },
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        set: function (value) {
            var tabindex = Number(value);
            var defaultValue = 0;
            this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "isOpen", {
        /**
         * Indicates whether the ColorPicker popup is open.
         */
        get: function () {
            return utils_1.isPresent(this.popupRef);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPickerComponent.prototype, "iconStyles", {
        /**
         * @hidden
         */
        get: function () {
            if (this.iconClass) {
                return this.iconClass;
            }
            if (this.icon) {
                return "k-icon k-i-" + this.icon;
            }
        },
        enumerable: true,
        configurable: true
    });
    ColorPickerComponent.prototype.ngOnInit = function () {
        var defaultPreset = (this.format !== 'name') ? DEFAULT_PRESET : DEFAULT_ACCESSIBLE_PRESET;
        var settingsPalette = this._paletteSettings.palette;
        var presetColumns = typeof settingsPalette === 'string' && palette_presets_1.PALETTEPRESETS[settingsPalette] ?
            palette_presets_1.PALETTEPRESETS[settingsPalette].columns :
            undefined;
        this._paletteSettings = {
            palette: settingsPalette || defaultPreset,
            tileSize: this._paletteSettings.tileSize || 24,
            columns: this._paletteSettings.columns || presetColumns || 10
        };
    };
    ColorPickerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.format && changes.format.currentValue === 'name') {
            this.view = 'palette';
        }
        if (this.view === 'gradient' && this.gradientSettings.opacity) {
            this.format = 'rgba';
            this.value = color_parser_1.parseColor(this.value, this.format);
        }
    };
    ColorPickerComponent.prototype.ngOnDestroy = function () {
        this.closePopup();
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperClick = function () {
        this.toggleWithEvents(!this.isOpen);
        this.focus();
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleActiveColorClick = function () {
        this.focus();
        var event = new models_1.ActiveColorClickEvent(this.value);
        this.activeColorClick.emit(event);
        if (!event.isOpenPrevented() || this.isOpen) {
            this.handleWrapperClick();
        }
    };
    /**
     * Focuses the wrapper of the ColorPicker.
     */
    ColorPickerComponent.prototype.focus = function () {
        if (this.disabled) {
            return;
        }
        this.wrapper.nativeElement.focus();
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperFocus = function () {
        if (utils_1.isPresent(this.palette)) {
            this.palette.nativeElement.focus();
        }
        if (this.isFocused) {
            return;
        }
        this.isFocused = true;
        this.onFocus.emit();
    };
    /**
     * Blurs the ColorPicker.
     */
    ColorPickerComponent.prototype.blur = function () {
        this.wrapper.nativeElement.blur();
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperBlur = function () {
        if (this.isOpen) {
            return;
        }
        this.isFocused = false;
        this.onBlur.emit();
        this.notifyNgTouched();
    };
    /**
     * Clears the color value of the ColorPicker.
     */
    ColorPickerComponent.prototype.reset = function () {
        if (!utils_1.isPresent(this.value)) {
            return;
        }
        this._value = undefined;
        this.notifyNgChanged(undefined);
    };
    /**
     * Toggles the popup of the ColorPicker.
     * Does not trigger the `open` and `close` events of the component.
     *
     * @param open An optional parameter. Specifies whether the popup will be opened or closed.
     */
    ColorPickerComponent.prototype.toggle = function (open) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.closePopup();
        open = utils_1.isPresent(open) ? open : !this.isOpen;
        if (open) {
            this.openPopup();
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleValueChange = function (color, closePopup) {
        var parsedColor = color_parser_1.parseColor(color, this.format);
        var valueChange = parsedColor !== this.value;
        if (closePopup) {
            this.toggleWithEvents(false);
            this.focus();
        }
        if (valueChange) {
            this.value = parsedColor;
            this.valueChange.emit(parsedColor);
            this.notifyNgChanged(parsedColor);
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handlePopupBlur = function (event) {
        var focusInPopupElement = this.popupRef.popupElement.contains(event.relatedTarget);
        var wrapperClicked = event.relatedTarget === this.wrapper.nativeElement;
        if (!this.isFocused || wrapperClicked || focusInPopupElement) {
            return;
        }
        this.isFocused = false;
        this.onBlur.emit();
        this.notifyNgTouched();
        this.toggleWithEvents(false);
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.registerOnChange = function (fn) {
        this.notifyNgChanged = fn;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.registerOnTouched = function (fn) {
        this.notifyNgTouched = fn;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handleWrapperKeyDown = function (event) {
        if (event.keyCode === kendo_angular_common_1.Keys.ArrowDown || event.keyCode === kendo_angular_common_1.Keys.Enter) {
            event.preventDefault();
            this.toggleWithEvents(true);
        }
    };
    /**
     * @hidden
     */
    ColorPickerComponent.prototype.handlePopupKeyDown = function (keyCode) {
        if (keyCode === kendo_angular_common_1.Keys.Tab || keyCode === kendo_angular_common_1.Keys.Escape) {
            this.toggleWithEvents(false);
            this.wrapper.nativeElement.focus();
        }
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    ColorPickerComponent.prototype.isEmpty = function () {
        return false;
    };
    ColorPickerComponent.prototype.toggleWithEvents = function (open) {
        var sameState = this.isOpen === open;
        if (this.disabled || this.readonly || sameState) {
            return;
        }
        var eventArgs = new models_1.PreventableEvent();
        open ? this.open.emit(eventArgs) : this.close.emit(eventArgs);
        if (!eventArgs.isDefaultPrevented()) {
            this.toggle(open);
        }
    };
    ColorPickerComponent.prototype.openPopup = function () {
        var _this = this;
        var horizontalAlign = this.direction === "rtl" ? "right" : "left";
        var anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        var popupPosition = { horizontal: horizontalAlign, vertical: "top" };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            animate: this.popupSettings.animate,
            appendTo: this.popupSettings.appendTo,
            popupAlign: popupPosition,
            anchorAlign: anchorPosition,
            popupClass: 'k-colorpicker-popup',
            content: this.popupTemplate,
            positionMode: 'absolute'
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () {
            _this.toggleWithEvents(false);
            if (!_this.isOpen) {
                _this.wrapper.nativeElement.focus({
                    preventScroll: true
                });
            }
        });
    };
    ColorPickerComponent.prototype.closePopup = function () {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.close();
        this.popupRef = null;
        this.palette = null;
    };
    ColorPickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-colorpicker',
                    providers: [{
                            multi: true,
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return ColorPickerComponent; })
                        }, {
                            provide: kendo_angular_common_1.KendoInput,
                            useExisting: core_1.forwardRef(function () { return ColorPickerComponent; })
                        },
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.colorpicker'
                        }
                    ],
                    template: "\n        <span\n            #wrapper\n            [ngClass]=\"{\n                'k-picker-wrap': true,\n                'k-state-default': !this.disabled,\n                'k-state-disabled': this.disabled,\n                'k-state-focused': this.isFocused\n            }\"\n            [attr.tabindex]=\"tabindex\"\n            (focus)=\"handleWrapperFocus()\"\n            (blur)=\"handleWrapperBlur()\"\n            (mousedown)=\"$event.preventDefault()\"\n            (keydown)=\"handleWrapperKeyDown($event)\"\n        >\n            <span *ngIf=\"!iconStyles\" class=\"k-selected-color\" [style.background-color]=\"value\" (click)=\"handleActiveColorClick()\">\n                <span class=\"k-icon k-i-line\" *ngIf=\"!value\"></span>\n            </span>\n            <span *ngIf=\"iconStyles\" class=\"k-tool-icon\" [ngClass]=\"iconStyles\" (click)=\"handleActiveColorClick()\">\n                <span class=\"k-selected-color\" [style.background-color]=\"value\"></span>\n            </span>\n            <span class=\"k-select\" (click)=\"handleWrapperClick()\">\n                <span class=\"k-icon k-i-arrow-s\"></span>\n            </span>\n        </span>\n        <ng-template #popupTemplate>\n            <kendo-colorgradient\n                *ngIf=\"view === 'gradient' || view === 'combo'\"\n                kendoFocusOnDomReady\n                [value]=\"value\"\n                [format]=\"format\"\n                [opacity]=\"gradientSettings.opacity\"\n                [clearButton]=\"gradientSettings.clearButton\"\n                (focusout)=\"handlePopupBlur($event)\"\n                (valueChange)=\"handleValueChange($event, false)\"\n                (keydown)=\"handlePopupKeyDown($event.keyCode)\"\n            >\n            </kendo-colorgradient>\n            <kendo-colorpalette\n                #palette\n                *ngIf=\"view === 'palette' || view === 'combo'\"\n                kendoFocusOnDomReady\n                [palette]=\"paletteSettings.palette\"\n                [columns]=\"paletteSettings.columns\"\n                [tileSize]=\"paletteSettings.tileSize\"\n                [format]=\"format\"\n                [value]=\"value\"\n                (blur)=\"handlePopupBlur($event)\"\n                (cellSelection)=\"handleValueChange($event, true)\"\n                (mousedown)=\"$event.preventDefault()\"\n                (keydown)=\"handlePopupKeyDown($event.keyCode)\"\n            >\n            </kendo-colorpalette>\n        </ng-template>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    ColorPickerComponent.ctorParameters = function () { return [
        { type: kendo_angular_popup_1.PopupService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    ColorPickerComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-colorpicker',] }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        view: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        paletteSettings: [{ type: core_1.Input }],
        gradientSettings: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        activeColorClick: [{ type: core_1.Output }],
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        wrapper: [{ type: core_1.ViewChild, args: ['wrapper',] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        palette: [{ type: core_1.ViewChild, args: ['palette', { read: core_1.ElementRef },] }]
    };
    return ColorPickerComponent;
}());
exports.ColorPickerComponent = ColorPickerComponent;
