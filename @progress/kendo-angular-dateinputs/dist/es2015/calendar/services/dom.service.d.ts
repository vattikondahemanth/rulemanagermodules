import { CalendarViewEnum } from '../models/view.enum';
/**
 * @hidden
 */
export declare class DOMService {
    calendarHeight: number;
    headerHeight: number;
    monthViewHeight: number;
    yearViewHeight: number;
    decadeViewHeight: number;
    centuryViewHeight: number;
    navigationItemHeight: number;
    scrollableContentHeight: number;
    scrollableYearContentHeight: number;
    calendarWidth: number;
    monthViewWidth: number;
    yearViewWidth: number;
    decadeViewWidth: number;
    centuryViewWidth: number;
    scrollableContentWidth: number;
    private hostContainer;
    ensureHeights(): void;
    calculateHeights(container?: HTMLElement): void;
    viewHeight(viewType: CalendarViewEnum): number;
    viewWidth(viewType: CalendarViewEnum): number;
    private viewDimension;
    private batch;
}
