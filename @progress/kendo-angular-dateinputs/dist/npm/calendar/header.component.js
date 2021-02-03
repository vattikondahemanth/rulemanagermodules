"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var view_enum_1 = require("./models/view.enum");
var bus_view_service_1 = require("./services/bus-view.service");
var defaults_1 = require("../defaults");
var util_1 = require("../util");
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
        this.min = new Date(defaults_1.MIN_DATE);
        this.max = new Date(defaults_1.MAX_DATE);
        this.rangeLength = 1;
        this.today = new core_1.EventEmitter();
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
        this.activeViewValue = view_enum_1.CalendarViewEnum[this.activeView];
        this.todayIsInRange = util_1.isInRange(util_1.getToday(), kendo_date_math_1.getDate(this.min), kendo_date_math_1.getDate(this.max));
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
        this.today.emit(util_1.dateInRange(util_1.getToday(), this.min, this.max));
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-calendar-header',
                    template: "\n    <span class=\"k-button k-bare k-title\" [class.k-state-disabled]=\"!navigate\"\n        [kendoEventsOutsideAngular]=\"{\n            click: handleNavigation\n        }\"\n        [scope]=\"this\">\n        <ng-template [ngIf]=\"!templateRef\">{{title}}</ng-template>\n        <ng-template\n            [ngIf]=\"templateRef\"\n            [ngTemplateOutlet]=\"templateRef\"\n            [ngTemplateOutletContext]=\"{ $implicit: title, activeView: activeViewValue, date: currentDate }\"\n        ></ng-template>\n    </span>\n    <span class=\"k-today\" [class.k-state-disabled]=\"!todayIsInRange\"\n        [kendoEventsOutsideAngular]=\"{\n            click: handleTodayClick\n        }\"\n        [scope]=\"this\">\n        {{todayMessage}}\n    </span>\n  "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService },
        { type: core_1.ChangeDetectorRef },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: kendo_angular_intl_1.IntlService }
    ]; };
    HeaderComponent.propDecorators = {
        activeView: [{ type: core_1.Input }],
        currentDate: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        rangeLength: [{ type: core_1.Input }],
        templateRef: [{ type: core_1.Input }],
        today: [{ type: core_1.Output }],
        getComponentClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-header",] }]
    };
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
