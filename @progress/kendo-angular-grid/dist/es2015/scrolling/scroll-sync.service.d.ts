/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare type ScrollSyncEvent = {
    scrollLeft: number;
    sourceType: string;
};
/**
 * @hidden
 */
export declare class ScrollSyncService {
    private ngZone;
    private localization;
    changes: Subject<ScrollSyncEvent>;
    private elements;
    private source;
    private subscriptions;
    private headerSubscription;
    private bodySubscription;
    constructor(ngZone: NgZone, localization: LocalizationService);
    registerEmitter(el: any, sourceType: "body" | "header" | "footer"): void;
    /**
     * destroy
     */
    destroy(): void;
    private scrollLeft;
    private unregister;
    private readonly contentWidth;
}
