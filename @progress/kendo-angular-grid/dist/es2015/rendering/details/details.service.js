/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { ExpandStateService } from '../../common/expand-state.service';
import { DetailExpandEvent } from './detail-expand-event';
import { DetailCollapseEvent } from './detail-collapse-event';
/**
 * @hidden
 */
export class DetailsService extends ExpandStateService {
    constructor() {
        super(true);
    }
    emitEvent(args) {
        const eventArg = new (args.expand ? DetailExpandEvent : DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    }
}
DetailsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DetailsService.ctorParameters = () => [];
