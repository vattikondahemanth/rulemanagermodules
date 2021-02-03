/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
/**
 * @hidden
 */
export declare class CellKeydownEvent extends PreventableEvent {
    originalEvent: KeyboardEvent;
    cellElement: HTMLElement;
    rowElement: HTMLElement;
    keyCode: number;
    ctrlKey: boolean;
    constructor(originalEvent: KeyboardEvent);
}
