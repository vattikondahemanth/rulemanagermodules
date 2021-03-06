import { Component, ChangeDetectorRef, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { getDate } from '@progress/kendo-date-math';
import { CalendarViewEnum } from './models/view.enum';
import { BusViewService } from './services/bus-view.service';
import { MIN_DATE, MAX_DATE } from '../defaults';
import { dateInRange, getToday, isInRange } from '../util';
/**
 * @hidden
 */
export class HeaderComponent {
    constructor(bus, cdr, localization, intl) {
        this.bus = bus;
        this.cdr = cdr;
        this.localization = localization;
        this.intl = intl;
        this.navigate = true;
        this.todayIsInRange = true;
        this.min = new Date(MIN_DATE);
        this.max = new Date(MAX_DATE);
        this.rangeLength = 1;
        this.today = new EventEmitter();
    }
    get getComponentClass() {
        return true;
    }
    ngOnInit() {
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.l10nSubscription = this.localization.changes.subscribe(this.l10nChange.bind(this));
    }
    ngOnChanges(_) {
        const service = this.bus.service(this.activeView);
        if (!service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        this.todayIsInRange = isInRange(getToday(), getDate(this.min), getDate(this.max));
        this.todayMessage = this.localization.get('today');
        this.navigate = this.bus.canMoveUp(this.activeView);
        this.title = this.getTitle();
    }
    ngOnDestroy() {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
        if (this.l10nSubscription) {
            this.l10nSubscription.unsubscribe();
        }
    }
    handleTodayClick() {
        if (!this.todayIsInRange) {
            return;
        }
        this.bus.moveToBottom(this.activeView);
        this.today.emit(dateInRange(getToday(), this.min, this.max));
    }
    handleNavigation() {
        if (!this.navigate) {
            return;
        }
        this.bus.moveUp(this.activeView);
    }
    intlChange() {
        if (this.currentDate && this.bus.service(this.activeView)) {
            this.title = this.getTitle();
            this.cdr.markForCheck();
        }
    }
    l10nChange() {
        this.todayMessage = this.localization.get('today');
        this.cdr.markForCheck();
    }
    getTitle() {
        if (!this.currentDate) {
            return '';
        }
        const service = this.bus.service(this.activeView);
        const take = this.rangeLength - 1;
        const title = service.title(this.currentDate);
        const nextDate = service.addToDate(this.currentDate, take);
        if (take < 1 || !service.isInRange(nextDate, this.min, this.max)) {
            return title;
        }
        return `${title} - ${service.title(nextDate)}`;
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-calendar-header',
                template: `
    <span class="k-button k-bare k-title" [class.k-state-disabled]="!navigate"
        [kendoEventsOutsideAngular]="{
            click: handleNavigation
        }"
        [scope]="this">
        <ng-template [ngIf]="!templateRef">{{title}}</ng-template>
        <ng-template
            [ngIf]="templateRef"
            [ngTemplateOutlet]="templateRef"
            [ngTemplateOutletContext]="{ $implicit: title, activeView: activeViewValue, date: currentDate }"
        ></ng-template>
    </span>
    <span class="k-today" [class.k-state-disabled]="!todayIsInRange"
        [kendoEventsOutsideAngular]="{
            click: handleTodayClick
        }"
        [scope]="this">
        {{todayMessage}}
    </span>
  `
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: BusViewService },
    { type: ChangeDetectorRef },
    { type: LocalizationService },
    { type: IntlService }
];
HeaderComponent.propDecorators = {
    activeView: [{ type: Input }],
    currentDate: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    rangeLength: [{ type: Input }],
    templateRef: [{ type: Input }],
    today: [{ type: Output }],
    getComponentClass: [{ type: HostBinding, args: ["class.k-calendar-header",] }]
};
