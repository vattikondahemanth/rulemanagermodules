/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, NgZone, AfterViewChecked, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { ResizeBatchService } from './resize-batch.service';
/**
 * Resize Sensor Component
 *
 * Triggers a "resize" event whenever the parent DOM element size changes.
 */
export declare class ResizeSensorComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
    private resizeBatchService;
    private element;
    private zone;
    private renderer;
    /**
     * The maximum number of resize events to emit per second.
     *
     * Defaults to 10.
     */
    rateLimit: number;
    /**
     * Fires when the parent DOM element has been resized.
     */
    resize: EventEmitter<any>;
    dir: string;
    /**
     * @hidden
     */
    expand: ElementRef;
    /**
     * @hidden
     */
    expandChild: ElementRef;
    /**
     * @hidden
     */
    shrink: ElementRef;
    private subscription;
    private source;
    private parentElement;
    private lastWidth;
    private lastHeight;
    private state;
    private detachScrollHandlers;
    private acceptedSize;
    constructor(resizeBatchService: ResizeBatchService, element: ElementRef, zone: NgZone, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * Sets the passed size or the element size as current.
     */
    acceptSize(size?: any): void;
    /**
     * @hidden
     */
    scroll(_event?: any): void;
    private init;
    private reset;
    private measure;
}
