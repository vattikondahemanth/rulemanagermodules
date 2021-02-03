import { Injectable } from '@angular/core';
import { getDate, isEqual } from '@progress/kendo-date-math';
import { IntlService } from '@progress/kendo-angular-intl';
import { MIDNIGHT_DATE } from '../../defaults';
import { range, setHours } from '../../util';
const HOURS_IN_DAY = 24;
const clampToRange = (rangeValue) => (value) => value % rangeValue;
const ɵ0 = clampToRange;
const clamp = clampToRange(HOURS_IN_DAY);
const stepper = (start, step) => (idx) => clamp(start + (idx * step));
const ɵ1 = stepper;
const distanceFromMin = (value, min) => clamp(HOURS_IN_DAY + value - min);
const ɵ2 = distanceFromMin;
const limit = (borderValue) => (barrier, value) => {
    const useBarrier = !value || getDate(barrier).getTime() === getDate(value).getTime();
    return useBarrier ? barrier : setHours(barrier, borderValue);
};
const ɵ3 = limit;
const limitDown = limit(0);
const limitUp = limit(HOURS_IN_DAY - 1);
/**
 * @hidden
 */
export class HoursService {
    constructor(intl) {
        this.intl = intl;
        this.boundRange = false;
        this.insertUndividedMax = false;
    }
    apply(value, candidate) {
        return setHours(value, candidate.getHours());
    }
    configure(settings) {
        const { boundRange = this.boundRange, insertUndividedMax = this.insertUndividedMax, min = this.min, max = this.max, part, step = this.step } = settings;
        this.boundRange = boundRange;
        this.insertUndividedMax = insertUndividedMax;
        this.toListItem = (hour) => {
            const date = setHours(MIDNIGHT_DATE, hour);
            return {
                text: this.intl.formatDate(date, part.pattern),
                value: date
            };
        };
        this.min = min;
        this.max = max;
        this.step = step;
    }
    data(selectedValue) {
        const [min] = this.range(selectedValue);
        const getHour = stepper(min, this.step);
        const convertToItem = (idx) => (this.toListItem(getHour(idx)));
        const data = range(0, this.countFromMin(selectedValue)).map(convertToItem);
        this.addLast(data);
        this.addMissing(data, selectedValue);
        return data;
    }
    isRangeChanged(min, max) {
        return !isEqual(this.min, min) || !isEqual(this.max, max);
    }
    limitRange(min, max, value) {
        return this.boundRange ? [limitDown(min, value), limitUp(max, value)] : [min, max];
    }
    total(value) {
        const last = this.insertUndividedMax && this.isLastMissing(value) ? 1 : 0;
        const missing = this.isMissing(value) ? 1 : 0;
        return this.countFromMin(value) + missing + last;
    }
    selectedIndex(value) {
        return Math.ceil(this.divideByStep(value));
    }
    valueInList(value) {
        if (!value) {
            return true;
        }
        const matchMax = this.insertUndividedMax && this.lastHour(value) === value.getHours();
        return matchMax || !this.isMissing(value);
    }
    addLast(data, value) {
        if (this.insertUndividedMax && this.isLastMissing(value)) {
            data.push(this.toListItem(this.lastHour(value)));
        }
        return data;
    }
    addMissing(data, value) {
        if (this.valueInList(value)) {
            return data;
        }
        const missingItem = this.toListItem(value.getHours());
        data.splice(this.selectedIndex(value), 0, missingItem);
        return data;
    }
    countFromMin(value) {
        const [min, max] = this.range(value);
        return Math.floor(distanceFromMin(max, min) / this.step) + 1; /* include min */
    }
    isMissing(value) {
        if (!value) {
            return false;
        }
        return this.selectedIndex(value) !== this.divideByStep(value);
    }
    isLastMissing(value) {
        return this.isMissing(setHours(this.max, this.lastHour(value)));
    }
    divideByStep(value) {
        return distanceFromMin(value.getHours(), this.min.getHours()) / this.step;
    }
    lastHour(value) {
        return this.range(value)[1];
    }
    range(value) {
        const [min, max] = this.limitRange(this.min, this.max, value);
        return [min.getHours(), max.getHours()];
    }
}
HoursService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HoursService.ctorParameters = () => [
    { type: IntlService }
];
export { ɵ0, ɵ1, ɵ2, ɵ3 };
