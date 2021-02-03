/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * @hidden
 */
export declare class FilterInputDirective implements OnInit, OnDestroy, OnChanges {
    change: EventEmitter<string>;
    composing: boolean;
    filterDelay: number;
    value: string;
    private accessor;
    private changeRequests;
    private changeRequestsSubscription;
    private unsubscribeEvents;
    constructor(valueAccessors: ControlValueAccessor[], ngZone: NgZone, element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    private subscribeChanges;
    private unsubscribeChanges;
}
