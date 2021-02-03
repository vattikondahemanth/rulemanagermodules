/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone } from '@angular/core';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, tap, switchMap, take, skip } from 'rxjs/operators';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class ScrollSyncService {
    constructor(ngZone, localization) {
        this.ngZone = ngZone;
        this.localization = localization;
        this.changes = new Subject();
        this.elements = [];
        this.subscriptions = new Subscription();
        this.headerSubscription = new Subscription();
        this.bodySubscription = new Subscription();
        this.subscriptions.add(this.changes.subscribe(args => this.scrollLeft(args)));
        this.subscriptions.add(this.localization.changes.pipe(skip(1), tap(() => {
            this.elements.forEach(item => item.element.scrollLeft = -1);
        }), switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1)))).subscribe(() => {
            const elements = this.elements;
            for (let idx = 0; idx < elements.length; idx++) {
                const element = elements[idx].element;
                elements[idx].initial = element.scrollLeft;
            }
        }));
    }
    registerEmitter(el, sourceType) {
        this.unregister(sourceType);
        this.elements.push({ element: el, sourceType, initial: el.scrollLeft });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(() => {
                const obs = fromEvent(el, "scroll").pipe(map(({ target: { scrollLeft } }) => ({
                    scrollLeft,
                    sourceType
                })));
                const subscription = obs.pipe(distinctUntilChanged((x, y) => (x.scrollLeft === y.scrollLeft)), filter(x => !this.source || this.source === x.sourceType), tap(x => this.source = x.sourceType))
                    .subscribe((x) => this.changes.next(x));
                subscription.add(obs.pipe(filter(x => this.source && this.source !== x.sourceType))
                    .subscribe(() => this.source = undefined));
                if (sourceType === "body") {
                    this.bodySubscription.add(subscription);
                }
                else {
                    this.headerSubscription.add(subscription);
                }
            });
        }
    }
    /**
     * destroy
     */
    destroy() {
        this.subscriptions.unsubscribe();
        this.headerSubscription.unsubscribe();
        this.bodySubscription.unsubscribe();
    }
    scrollLeft({ scrollLeft, sourceType }) {
        this.ngZone.runOutsideAngular(() => {
            this.elements
                .filter(x => sourceType !== x.sourceType)
                .forEach(({ element, sourceType: type, initial }) => {
                if (this.localization.rtl && type !== 'body' && initial > 0) {
                    // the calculation of the scrollLeft position in Chrome with rtl direction is scrollWidth - scrollPosition - offsetWidth
                    // Thus, because of the header and footer padding the offsetWidth and the scrollLeft position is different in Chrome
                    element.scrollLeft = scrollLeft + this.contentWidth - element.clientWidth;
                }
                else {
                    element.scrollLeft = scrollLeft;
                }
            });
        });
    }
    unregister(sourceType) {
        const index = this.elements.findIndex(x => x.sourceType === sourceType);
        if (index > -1) {
            if (sourceType === "header") {
                this.headerSubscription.unsubscribe();
                this.headerSubscription = new Subscription();
            }
            else if (sourceType === "body") {
                this.bodySubscription.unsubscribe();
                this.bodySubscription = new Subscription();
            }
            this.elements.splice(index, 1);
        }
    }
    get contentWidth() {
        const body = this.elements.find(item => item.sourceType === 'body');
        if (body) {
            return body.element.offsetWidth;
        }
        return 0;
    }
}
ScrollSyncService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScrollSyncService.ctorParameters = () => [
    { type: NgZone },
    { type: LocalizationService }
];
