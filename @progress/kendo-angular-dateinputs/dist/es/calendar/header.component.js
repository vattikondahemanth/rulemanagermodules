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
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(bus, cdr, localization, intl) {
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
    Object.defineProperty(HeaderComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.ngOnInit = function () {
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.l10nSubscription = this.localization.changes.subscribe(this.l10nChange.bind(this));
    };
    HeaderComponent.prototype.ngOnChanges = function (_) {
        var service = this.bus.service(this.activeView);
        if (!service) {
            return;
        }
        this.activeViewValue = CalendarViewEnum[this.activeView];
        this.todayIsInRange = isInRange(getToday(), getDate(this.min), getDate(this.max));
        this.todayMessage = this.localization.get('today');
        this.navigate = this.bus.canMoveUp(this.activeView);
        this.title = this.getTitle();
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
        if (this.l10nSubscription) {
            this.l10nSubscription.unsubscribe();
        }
    };
    HeaderComponent.prototype.handleTodayClick = function () {
        if (!this.todayIsInRange) {
            return;
        }
        this.bus.moveToBottom(this.activeView);
        this.today.emit(dateInRange(getToday(), this.min, this.max));
    };
    HeaderComponent.prototype.handleNavigation = function () {
        if (!this.navigate) {
            return;
        }
        this.bus.moveUp(this.activeView);
    };
    HeaderComponent.prototype.intlChange = function () {
        if (this.currentDate && this.bus.service(this.activeView)) {
            this.title = this.getTitle();
            this.cdr.markForCheck();
        }
    };
    HeaderComponent.prototype.l10nChange = function () {
        this.todayMessage = this.localization.get('today');
        this.cdr.markForCheck();
    };
    HeaderComponent.prototype.getTitle = function () {
        if (!this.currentDate) {
            return '';
        }
        var service = this.bus.service(this.activeView);
        var take = this.rangeLength - 1;
        var title = service.title(this.currentDate);
        var nextDate = service.addToDate(this.currentDate, take);
        if (take < 1 || !service.isInRange(nextDate, this.min, this.max)) {
            return title;
        }
        return title + " - " + service.title(nextDate);
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-calendar-header',
                    template: "\n    <span class=\"k-button k-bare k-title\" [class.k-state-disabled]=\"!navigate\"\n        [kendoEventsOutsideAngular]=\"{\n            click: handleNavigation\n        }\"\n        [scope]=\"this\">\n        <ng-template [ngIf]=\"!templateRef\">{{title}}</ng-template>\n        <ng-template\n            [ngIf]=\"templateRef\"\n            [ngTemplateOutlet]=\"templateRef\"\n            [ngTemplateOutletContext]=\"{ $implicit: title, activeView: activeViewValue, date: currentDate }\"\n        ></ng-template>\n    </span>\n    <span class=\"k-today\" [class.k-state-disabled]=\"!todayIsInRange\"\n        [kendoEventsOutsideAngular]=\"{\n            click: handleTodayClick\n        }\"\n        [scope]=\"this\">\n        {{todayMessage}}\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: BusViewService },
        { type: ChangeDetectorRef },
        { type: LocalizationService },
        { type: IntlService }
    ]; };
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
    return HeaderComponent;
}());
export { HeaderComponent };
