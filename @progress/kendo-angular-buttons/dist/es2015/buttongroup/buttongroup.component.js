import { ButtonDirective } from '../button/button.directive';
import { Component, Input, ContentChildren, QueryList, HostBinding, HostListener, isDevMode, ElementRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { isChanged, Keys } from '@progress/kendo-angular-common';
import { KendoButtonService } from '../button/button.service';
import { isPresent } from '../util';
/**
 * @hidden
 */
const ariaChecked = 'aria-checked';
/**
 * @hidden
 */
const role = 'role';
/**
 * @hidden
 */
const tabindex = 'tabindex';
/**
 * Represents the Kendo UI ButtonGroup component for Angular.
 */
export class ButtonGroupComponent {
    constructor(service, localization, element) {
        this.service = service;
        this.element = element;
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options
         * ([more information and examples]({% slug styling_buttongroup %})).
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
    }
    get wrapperClass() {
        return true;
    }
    get disabledClass() {
        return this.disabled;
    }
    get stretchedClass() {
        return !!this.width;
    }
    get isFlat() {
        return this.look === 'flat';
    }
    get isBare() {
        return this.look === 'bare';
    }
    get isOutline() {
        return this.look === 'outline';
    }
    get getRole() {
        return this.isSelectionSingle() ? 'radiogroup' : 'group';
    }
    get dir() {
        return this.direction;
    }
    get ariaDisabled() {
        return this.disabled;
    }
    get wrapperWidth() {
        return this.width;
    }
    get wrapperTabIndex() {
        return this.tabIndex;
    }
    /**
     * @hidden
     */
    keydown(event) {
        if (this.isSelectionSingle()) {
            this.navigateSelection(event);
        }
        else {
            this.navigateFocus(event);
        }
    }
    /**
     * @hidden
     */
    focusout(event) {
        if (event.relatedTarget && event.relatedTarget.parentNode !== this.element.nativeElement) {
            this.defocus(this.buttons.toArray());
        }
    }
    ngOnInit() {
        this.service.setButtonLook(this.look);
        this.subscription = this.service.buttonClicked$.subscribe((button) => {
            let newSelectionValue;
            if (this.isSelectionSingle()) {
                newSelectionValue = true;
                this.deactivate(this.buttons.filter(current => current !== button));
            }
            else {
                this.defocus(this.buttons.toArray());
                newSelectionValue = !button.selected;
            }
            if (button.togglable) {
                button.setSelected(newSelectionValue);
                button.setAttribute(ariaChecked, newSelectionValue.toString());
            }
            button.setAttribute(tabindex, "0");
        });
    }
    ngOnChanges(change) {
        if (isChanged('disabled', change)) {
            this.buttons.forEach((button) => {
                if (isPresent(this.disabled)) {
                    button.disabled = this.disabled;
                }
            });
        }
    }
    ngAfterContentInit() {
        const isRadioGroup = this.isSelectionSingle();
        const buttonsRole = isRadioGroup ? 'radio' : 'checkbox';
        let anyChecked = false;
        this.buttons.forEach((button) => {
            if (button.togglable) {
                button.setAttribute(ariaChecked, button.selected.toString());
                button.setAttribute(role, buttonsRole);
            }
            // if (!isRadioGroup || button.selected) {
            //     button.setAttribute(tabindex, button.tabIndex.toString());
            // } else if (isRadioGroup && !button.selected) {
            //     button.setAttribute(tabindex, "-1");
            // }
            if (!button.selected) {
                button.setAttribute(tabindex, "-1");
            }
            else {
                button.setAttribute(tabindex, "0");
            }
            anyChecked = anyChecked || button.selected;
        });
        if (isRadioGroup && !anyChecked && this.buttons.length) {
            this.buttons.first.setAttribute(tabindex, "0");
            this.buttons.last.setAttribute(tabindex, "0");
        }
    }
    ngAfterViewChecked() {
        if (this.buttons.length) {
            this.buttons.first.renderer.addClass(this.buttons.first.element, 'k-group-start');
            this.buttons.last.renderer.addClass(this.buttons.last.element, 'k-group-end');
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.localizationChangeSubscription.unsubscribe();
    }
    ngAfterContentChecked() {
        this.verifySettings();
    }
    navigateSelection(event) {
        const selectedIndex = this.buttons.toArray().findIndex(current => current.selected);
        const firstIndex = 0;
        const lastIndex = this.buttons.length - 1;
        if (selectedIndex !== undefined) {
            if (event.keyCode === Keys.ArrowRight && selectedIndex < lastIndex) {
                this.deactivate(this.buttons.filter(current => current.selected));
                this.activate(this.buttons.filter((_current, index) => {
                    return index === selectedIndex + 1;
                }));
            }
            if (event.keyCode === Keys.ArrowLeft && selectedIndex > firstIndex) {
                this.deactivate(this.buttons.filter(current => current.selected));
                this.activate(this.buttons.filter((_current, index) => {
                    return index === selectedIndex - 1;
                }));
            }
        }
    }
    navigateFocus(event) {
        let focusedIndex = this.buttons.toArray().findIndex(current => current.element.tabIndex !== -1);
        const firstIndex = 0;
        const lastIndex = this.buttons.length - 1;
        if (event.keyCode === Keys.ArrowRight && focusedIndex < lastIndex) {
            this.defocus(this.buttons.toArray());
            this.focus(this.buttons.filter((_current, index) => {
                return index === focusedIndex + 1;
            }));
        }
        if (event.keyCode === Keys.ArrowLeft && focusedIndex > firstIndex) {
            this.defocus(this.buttons.toArray());
            this.focus(this.buttons.filter((_current, index) => {
                return index === focusedIndex - 1;
            }));
        }
    }
    deactivate(buttons) {
        buttons.forEach((button) => {
            button.setSelected(false);
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "-1");
        });
    }
    activate(buttons) {
        buttons.forEach((button) => {
            button.setSelected(true);
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "0");
            button.focus();
        });
    }
    defocus(buttons) {
        buttons.forEach((button) => {
            button.setAttribute(tabindex, "-1");
        });
    }
    focus(buttons) {
        buttons.forEach((button) => {
            button.setAttribute(tabindex, "0");
            button.focus();
        });
    }
    verifySettings() {
        if (isDevMode()) {
            if (this.isSelectionSingle() && this.buttons.filter(button => button.selected).length > 1) {
                throw new Error('Having multiple selected buttons with single selection mode is not supported');
            }
        }
    }
    isSelectionSingle() {
        return this.selection === 'single';
    }
}
ButtonGroupComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoButtonGroup',
                providers: [
                    KendoButtonService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.buttongroup'
                    }
                ],
                selector: 'kendo-buttongroup',
                template: `
        <ng-content select="[kendoButton]"></ng-content>
    `
            },] },
];
/** @nocollapse */
ButtonGroupComponent.ctorParameters = () => [
    { type: KendoButtonService },
    { type: LocalizationService },
    { type: ElementRef }
];
ButtonGroupComponent.propDecorators = {
    disabled: [{ type: Input, args: ['disabled',] }],
    selection: [{ type: Input, args: ['selection',] }],
    width: [{ type: Input, args: ['width',] }],
    look: [{ type: Input }],
    tabIndex: [{ type: Input }],
    buttons: [{ type: ContentChildren, args: [ButtonDirective,] }],
    wrapperClass: [{ type: HostBinding, args: ['class.k-button-group',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    stretchedClass: [{ type: HostBinding, args: ['class.k-button-group-stretched',] }],
    isFlat: [{ type: HostBinding, args: ['class.k-button-group-flat',] }],
    isBare: [{ type: HostBinding, args: ['class.k-button-group-bare',] }],
    isOutline: [{ type: HostBinding, args: ['class.k-button-group-outline',] }],
    getRole: [{ type: HostBinding, args: ['attr.role',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disalbed',] }],
    wrapperWidth: [{ type: HostBinding, args: ['style.width',] }],
    wrapperTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    focusout: [{ type: HostListener, args: ['focusout', ['$event'],] }]
};
