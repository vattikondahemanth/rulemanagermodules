import { SimpleChange } from '@angular/core';
/**
 * @hidden
 */
export function toSimpleChanges(changes) {
    const result = {};
    for (const propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        result[propertyName] = new SimpleChange(null, changes[propertyName], false);
    }
    return result;
}
