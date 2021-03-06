import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { CalendarView } from './models/view.type';
import { CalendarViewEnum } from './models/view.enum';
import { BusViewService } from './services/bus-view.service';
/**
 * @hidden
 */
export declare class HeaderComponent implements OnChanges, OnInit, OnDestroy {
    private bus;
    private cdr;
    localization: LocalizationService;
    private intl;
    navigate: boolean;
    todayIsInRange: boolean;
    activeViewValue: CalendarView;
    todayMessage: string;
    title: string;
    activeView: CalendarViewEnum;
    currentDate: Date;
    min: Date;
    max: Date;
    rangeLength: number;
    templateRef: TemplateRef<any>;
    today: EventEmitter<Date>;
    readonly getComponentClass: boolean;
    private intlSubscription;
    private l10nSubscription;
    constructor(bus: BusViewService, cdr: ChangeDetectorRef, localization: LocalizationService, intl: IntlService);
    ngOnInit(): void;
    ngOnChanges(_: any): void;
    ngOnDestroy(): void;
    handleTodayClick(): void;
    handleNavigation(): void;
    private intlChange;
    private l10nChange;
    private getTitle;
}
