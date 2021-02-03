/* tslint:disable:object-literal-sort-keys */
import { Injectable } from '@angular/core';
import { addDecades, addYears, cloneDate, durationInDecades, firstYearOfDecade, lastYearOfDecade, createDate } from '@progress/kendo-date-math';
import { Action } from '../models/navigation-action.enum';
import { EMPTY_SELECTIONRANGE } from '../models/selection-range.interface';
import { getToday, isInRange, isInSelectionRange, range } from '../../util';
const EMPTY_DATA = [[]];
const CELLS_LENGTH = 5;
const ROWS_LENGTH = 2;
const ACTIONS = {
    [Action.Left]: (date) => addYears(date, -1),
    [Action.Up]: (date) => addYears(date, -5),
    [Action.Right]: (date) => addYears(date, 1),
    [Action.Down]: (date) => addYears(date, 5),
    [Action.PrevView]: (date) => addDecades(date, -1),
    [Action.NextView]: (date) => addDecades(date, 1),
    [Action.FirstInView]: (date) => firstYearOfDecade(date),
    [Action.LastInView]: (date) => lastYearOfDecade(date)
};
/**
 * @hidden
 */
export class DecadeViewService {
    addToDate(min, skip) {
        return addDecades(min, skip);
    }
    datesList(start, count) {
        return range(0, count).map(i => addDecades(start, i));
    }
    data(options) {
        const { cellUID, focusedDate, isActiveView, max, min, selectedDate, selectionRange = EMPTY_SELECTIONRANGE, viewDate } = options;
        if (!viewDate) {
            return EMPTY_DATA;
        }
        const cells = range(0, CELLS_LENGTH);
        const firstDate = firstYearOfDecade(viewDate);
        const lastDate = lastYearOfDecade(viewDate);
        const isSelectedDateInRange = isInRange(selectedDate, min, max);
        const today = getToday();
        return range(0, ROWS_LENGTH).map(rowOffset => {
            const baseDate = addYears(firstDate, rowOffset * CELLS_LENGTH);
            return cells.map(cellOffset => {
                const cellDate = this.normalize(addYears(baseDate, cellOffset), min, max);
                if (!this.isInRange(cellDate, min, max)) {
                    return null;
                }
                const isRangeStart = this.isEqual(cellDate, selectionRange.start);
                const isRangeEnd = this.isEqual(cellDate, selectionRange.end);
                const isInMiddle = !isRangeStart && !isRangeEnd;
                const isRangeMid = isInMiddle && isInSelectionRange(cellDate, selectionRange);
                return {
                    formattedValue: this.value(cellDate),
                    id: `${cellUID}${cellDate.getTime()}`,
                    isFocused: this.isEqual(cellDate, focusedDate),
                    isSelected: isActiveView && isSelectedDateInRange && this.isEqual(cellDate, selectedDate),
                    isWeekend: false,
                    isRangeStart: isRangeStart,
                    isRangeMid: isRangeMid,
                    isRangeEnd: isRangeEnd,
                    isRangeSplitEnd: isRangeMid && this.isEqual(cellDate, lastDate),
                    isRangeSplitStart: isRangeMid && this.isEqual(cellDate, firstDate),
                    isToday: this.isEqual(cellDate, today),
                    title: this.cellTitle(cellDate),
                    value: cellDate
                };
            });
        });
    }
    isEqual(candidate, expected) {
        if (!candidate || !expected) {
            return false;
        }
        return candidate.getFullYear() === expected.getFullYear();
    }
    isInArray(date, dates) {
        if (!dates.length) {
            return false;
        }
        const year = date.getFullYear();
        return dates[0].getFullYear() <= year && year <= (dates[dates.length - 1].getFullYear() + 9);
    }
    isInRange(candidate, min, max) {
        const year = candidate.getFullYear();
        const aboveMin = !min || min.getFullYear() <= year;
        const belowMax = !max || year <= max.getFullYear();
        return aboveMin && belowMax;
    }
    beginningOfPeriod(date) {
        if (!date) {
            return date;
        }
        const firstYear = firstYearOfDecade(date);
        return createDate(firstYear.getFullYear(), 0, 1);
    }
    isRangeStart(value) {
        return value.getFullYear() % 100 === 0;
    }
    move(value, action) {
        const modifier = ACTIONS[action];
        if (!modifier) {
            return value;
        }
        return modifier(value);
    }
    cellTitle(value) {
        return value.getFullYear().toString();
    }
    navigationTitle(value) {
        return value ? firstYearOfDecade(value).getFullYear().toString() : '';
    }
    title(value) {
        if (!value) {
            return '';
        }
        return `${firstYearOfDecade(value).getFullYear()} - ${lastYearOfDecade(value).getFullYear()}`;
    }
    rowLength(_) {
        return CELLS_LENGTH;
    }
    skip(value, min) {
        return durationInDecades(min, value);
    }
    total(min, max) {
        return durationInDecades(min, max) + 1;
    }
    value(current) {
        return current ? current.getFullYear().toString() : '';
    }
    viewDate(date, max, viewsCount = 1) {
        const viewsInRange = this.total(date, max);
        if (viewsInRange < viewsCount) {
            const decadesToSubtract = viewsCount - viewsInRange;
            return addDecades(date, -1 * decadesToSubtract);
        }
        return date;
    }
    normalize(cellDate, min, max) {
        if (cellDate < min && this.isEqual(cellDate, min)) {
            return cloneDate(min);
        }
        if (cellDate > max && this.isEqual(cellDate, max)) {
            return cloneDate(max);
        }
        return cellDate;
    }
}
DecadeViewService.decorators = [
    { type: Injectable },
];
