/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { TextAreaDirective } from './textarea.directive';
import { NgControl } from '@angular/forms';
/**
 * Represents the [Kendo UI TextBoxContainer component for Angular]({% slug overview_textbox %}).
 * Provides floating labels to `input` elements.
 *
 * The TextBoxContainer supports both Template and Reactive Forms and
 * [can contain either of the following components]({% slug overview_textbox %}#toc-implementing-floating-labels):
 * * Kendo input components and directives such as `kendoTextBox`, `kendo-combobox`, `kendo-datepicker`, etc., or
 * * Form-bound Input components.
 *
 * @example
 * ```ts
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-textbox-container floatingLabel="First name">
 *       <input kendoTextBox />
 *     </kendo-textbox-container>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
export declare class TextBoxContainerComponent implements AfterContentInit, OnDestroy {
    private elementRef;
    private renderer;
    private changeDetectorRef;
    readonly hostClasses: boolean;
    readonly textareaElementClass: boolean;
    readonly focusedClass: boolean;
    readonly emptyClass: boolean;
    readonly invalidClass: boolean;
    /**
     * @hidden
     */
    direction: string;
    /**
     * Sets the `id` attribute of the input inside the container.
     */
    id: string;
    /**
     * Adds a floating label which describes the input.
     */
    floatingLabel: string;
    kendoInput: any;
    textarea: TextAreaDirective;
    formControl: NgControl;
    /**
     * @hidden
     */
    focused: boolean;
    /**
     * @hidden
     */
    empty: boolean;
    /**
     * @hidden
     */
    invalid: boolean;
    private _subscriptions;
    constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, rtl: boolean);
    /**
     * @hidden
     */
    ngAfterContentInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    private subscribe;
    private updateState;
}
