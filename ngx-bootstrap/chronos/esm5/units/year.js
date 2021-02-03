/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { addFormatToken } from '../format/format';
import { getFullYear } from '../utils/date-getters';
import { addRegexToken, match1to2, match1to4, match1to6, match2, match4, match6, matchSigned } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { YEAR } from './constants';
import { toInt } from '../utils/type-checks';
import { addUnitPriority } from './priorities';
import { addUnitAlias } from './aliases';
// FORMATTING
/**
 * @param {?} date
 * @param {?} opts
 * @return {?}
 */
function getYear(date, opts) {
    return getFullYear(date, opts.isUTC).toString();
}
/**
 * @return {?}
 */
export function initYear() {
    addFormatToken('Y', null, null, (/**
     * @param {?} date
     * @param {?} opts
     * @return {?}
     */
    function (date, opts) {
        /** @type {?} */
        var y = getFullYear(date, opts.isUTC);
        return y <= 9999 ? y.toString(10) : "+" + y;
    }));
    addFormatToken(null, ['YY', 2, false], null, (/**
     * @param {?} date
     * @param {?} opts
     * @return {?}
     */
    function (date, opts) {
        return (getFullYear(date, opts.isUTC) % 100).toString(10);
    }));
    addFormatToken(null, ['YYYY', 4, false], null, getYear);
    addFormatToken(null, ['YYYYY', 5, false], null, getYear);
    addFormatToken(null, ['YYYYYY', 6, true], null, getYear);
    // ALIASES
    addUnitAlias('year', 'y');
    // PRIORITIES
    addUnitPriority('year', 1);
    // PARSING
    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);
    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', (/**
     * @param {?} input
     * @param {?} array
     * @param {?} config
     * @return {?}
     */
    function (input, array, config) {
        array[YEAR] = input.length === 2 ? parseTwoDigitYear(input) : toInt(input);
        return config;
    }));
    addParseToken('YY', (/**
     * @param {?} input
     * @param {?} array
     * @param {?} config
     * @return {?}
     */
    function (input, array, config) {
        array[YEAR] = parseTwoDigitYear(input);
        return config;
    }));
    addParseToken('Y', (/**
     * @param {?} input
     * @param {?} array
     * @param {?} config
     * @return {?}
     */
    function (input, array, config) {
        array[YEAR] = parseInt(input, 10);
        return config;
    }));
}
/**
 * @param {?} input
 * @return {?}
 */
export function parseTwoDigitYear(input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
}
/**
 * @param {?} year
 * @return {?}
 */
export function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}
/**
 * @param {?} year
 * @return {?}
 */
export function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvY2hyb25vcy8iLCJzb3VyY2VzIjpbInVuaXRzL3llYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNySCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7Ozs7O0FBS3pDLFNBQVMsT0FBTyxDQUFDLElBQVUsRUFBRSxJQUEwQjtJQUNyRCxPQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xELENBQUM7Ozs7QUFFRCxNQUFNLFVBQVUsUUFBUTtJQUN0QixjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJOzs7OztJQUM1QixVQUFVLElBQVUsRUFBRSxJQUEwQjs7WUFDMUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV2QyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1B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QUN0QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBWTtJQUNyQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNsRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRkRm9ybWF0VG9rZW4gfSBmcm9tICcuLi9mb3JtYXQvZm9ybWF0JztcbmltcG9ydCB7IGdldEZ1bGxZZWFyIH0gZnJvbSAnLi4vdXRpbHMvZGF0ZS1nZXR0ZXJzJztcbmltcG9ydCB7IGFkZFJlZ2V4VG9rZW4sIG1hdGNoMXRvMiwgbWF0Y2gxdG80LCBtYXRjaDF0bzYsIG1hdGNoMiwgbWF0Y2g0LCBtYXRjaDYsIG1hdGNoU2lnbmVkIH0gZnJvbSAnLi4vcGFyc2UvcmVnZXgnO1xuaW1wb3J0IHsgYWRkUGFyc2VUb2tlbiB9IGZyb20gJy4uL3BhcnNlL3Rva2VuJztcbmltcG9ydCB7IFlFQVIgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB0b0ludCB9IGZyb20gJy4uL3V0aWxzL3R5cGUtY2hlY2tzJztcbmltcG9ydCB7IGFkZFVuaXRQcmlvcml0eSB9IGZyb20gJy4vcHJpb3JpdGllcyc7XG5pbXBvcnQgeyBhZGRVbml0QWxpYXMgfSBmcm9tICcuL2FsaWFzZXMnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdHRlck9wdGlvbnMgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8vIEZPUk1BVFRJTkdcblxuZnVuY3Rpb24gZ2V0WWVhcihkYXRlOiBEYXRlLCBvcHRzOiBEYXRlRm9ybWF0dGVyT3B0aW9ucyk6IHN0cmluZyB7XG4gIHJldHVybiBnZXRGdWxsWWVhcihkYXRlLCBvcHRzLmlzVVRDKS50b1N0cmluZygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFllYXIoKSB7XG4gIGFkZEZvcm1hdFRva2VuKCdZJywgbnVsbCwgbnVsbCxcbiAgICBmdW5jdGlvbiAoZGF0ZTogRGF0ZSwgb3B0czogRGF0ZUZvcm1hdHRlck9wdGlvbnMpOiBzdHJpbmcge1xuICAgIGNvbnN0IHkgPSBnZXRGdWxsWWVhcihkYXRlLCBvcHRzLmlzVVRDKTtcblxuICAgIHJldHVybiB5IDw9IDk5OTkgPyB5LnRvU3RyaW5nKDEwKSA6IGArJHt5fWA7XG4gIH0pO1xuXG4gIGFkZEZvcm1hdFRva2VuKG51bGwsIFsnWVknLCAyLCBmYWxzZV0sIG51bGwsXG4gICAgZnVuY3Rpb24gKGRhdGU6IERhdGUsIG9wdHM6IERhdGVGb3JtYXR0ZXJPcHRpb25zKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKGdldEZ1bGxZZWFyKGRhdGUsIG9wdHMuaXNVVEMpICUgMTAwKS50b1N0cmluZygxMCk7XG4gIH0pO1xuXG4gIGFkZEZvcm1hdFRva2VuKG51bGwsIFsnWVlZWScsIDQsIGZhbHNlXSwgbnVsbCwgZ2V0WWVhcik7XG4gIGFkZEZvcm1hdFRva2VuKG51bGwsIFsnWVlZWVknLCA1LCBmYWxzZV0sIG51bGwsIGdldFllYXIpO1xuICBhZGRGb3JtYXRUb2tlbihudWxsLCBbJ1lZWVlZWScsIDYsIHRydWVdLCBudWxsLCBnZXRZZWFyKTtcblxuICAvLyBBTElBU0VTXG5cbiAgYWRkVW5pdEFsaWFzKCd5ZWFyJywgJ3knKTtcblxuICAvLyBQUklPUklUSUVTXG5cbiAgYWRkVW5pdFByaW9yaXR5KCd5ZWFyJywgMSk7XG5cbiAgLy8gUEFSU0lOR1xuXG4gIGFkZFJlZ2V4VG9rZW4oJ1knLCBtYXRjaFNpZ25lZCk7XG4gIGFkZFJlZ2V4VG9rZW4oJ1lZJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xuICBhZGRSZWdleFRva2VuKCdZWVlZJywgbWF0Y2gxdG80LCBtYXRjaDQpO1xuICBhZGRSZWdleFRva2VuKCdZWVlZWScsIG1hdGNoMXRvNiwgbWF0Y2g2KTtcbiAgYWRkUmVnZXhUb2tlbignWVlZWVlZJywgbWF0Y2gxdG82LCBtYXRjaDYpO1xuXG4gIGFkZFBhcnNlVG9rZW4oWydZWVlZWScsICdZWVlZWVknXSwgWUVBUik7XG4gIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBhcnJheVtZRUFSXSA9IGlucHV0Lmxlbmd0aCA9PT0gMiA/IHBhcnNlVHdvRGlnaXRZZWFyKGlucHV0KSA6IHRvSW50KGlucHV0KTtcblxuICAgIHJldHVybiBjb25maWc7XG4gIH0pO1xuICBhZGRQYXJzZVRva2VuKCdZWScsIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xuICAgIGFycmF5W1lFQVJdID0gcGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuXG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSk7XG4gIGFkZFBhcnNlVG9rZW4oJ1knLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcbiAgICBhcnJheVtZRUFSXSA9IHBhcnNlSW50KGlucHV0LCAxMCk7XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHdvRGlnaXRZZWFyKGlucHV0OiBzdHJpbmcpOiBudW1iZXIge1xuICByZXR1cm4gdG9JbnQoaW5wdXQpICsgKHRvSW50KGlucHV0KSA+IDY4ID8gMTkwMCA6IDIwMDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF5c0luWWVhcih5ZWFyOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGVhcFllYXIoeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcbn1cbiJdfQ==