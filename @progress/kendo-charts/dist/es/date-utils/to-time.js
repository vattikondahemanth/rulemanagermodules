import { isArray } from '../common';
import toDate from './to-date';

export default function toTime(value) {
    if (isArray(value)) {
        var result = [];
        for (var idx = 0; idx < value.length; idx++) {
            result.push(toTime(value[idx]));
        }

        return result;
    } else if (value) {
        return toDate(value).getTime();
    }
}