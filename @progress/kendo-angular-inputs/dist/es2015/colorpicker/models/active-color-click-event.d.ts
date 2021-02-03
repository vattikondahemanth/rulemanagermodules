/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Fires each time the left side of the ColorPicker wrapper is clicked.
 * The event is triggered regardless of whether a ColorPicker icon is set or not.
 *
 * Provides information about the current active color and gives the option to prevent the opening of the popup.
 *
 * @example
 *
 * ```ts
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-colorpicker
 *           [icon]="'edit-tools'"
 *           [value]="'#900'"
 *           (activeColorClick)="handleActiveColorClick($event)"
 *       >
 *       </kendo-colorpicker>
 *   `
 * })
 * class AppComponent {
 *     public handleActiveColorClick(event: ActiveColorClickEvent): void {
 *         event.preventOpen();
 *
 *         console.log('Open prevented:', event.isOpenPrevented());
 *         console.log('Current color:', event.color);
 *     }
 *  }
 * ```
 */
export declare class ActiveColorClickEvent {
    color?: string;
    private openPrevented;
    /**
     * @hidden
     * @param color Represents the current value of the ColorPicker.
     */
    constructor(color?: string);
    /**
     * Prevents the opening of the popup.
     */
    preventOpen(): void;
    /**
     * Returns `true` if the popup opening is prevented by any of its subscribers.
     *
     * @returns - Returns `true` if the open action was prevented. Otherwise, returns `false`.
     */
    isOpenPrevented(): boolean;
}