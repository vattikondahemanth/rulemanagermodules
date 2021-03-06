import { NgZone } from '@angular/core';
import { DOMService } from './dom.service';
import { Scrollable } from '../models/scrollable.interface';
import { CalendarViewEnum } from '../models/view.enum';
/**
 * @hidden
 */
export declare class ScrollSyncService {
    dom: DOMService;
    zone: NgZone;
    private divideByMagnitude;
    private powerByMagnitude;
    private navSubscription;
    private viewSubscription;
    private navigator;
    private view;
    constructor(dom: DOMService, zone: NgZone);
    configure(activeView: CalendarViewEnum): void;
    sync(navigator: Scrollable, view: Scrollable): void;
    scrollSiblingOf(scrolledElement: HTMLElement): void;
    siblingComponent(scrollableElement: HTMLElement): Scrollable;
    calculateScroll(component: Scrollable, scrollTop: number): number;
    destroy(): void;
    private unsubscribe;
}
