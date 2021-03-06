/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PreventableEvent } from '../common/preventable-event';
import { closest, matchesNodeName } from '../rendering/common/dom-queries';
/**
 * @hidden
 */
export class CellKeydownEvent extends PreventableEvent {
    constructor(originalEvent) {
        super();
        this.originalEvent = originalEvent;
        const args = originalEvent;
        this.cellElement = closest(args.target, matchesNodeName('td'));
        this.rowElement = closest(this.cellElement, matchesNodeName('tr'));
        this.keyCode = args.keyCode;
        this.ctrlKey = args.ctrlKey;
    }
}
