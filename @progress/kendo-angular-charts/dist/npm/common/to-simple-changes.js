"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @hidden
 */
function toSimpleChanges(changes) {
    var result = {};
    for (var propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        result[propertyName] = new core_1.SimpleChange(null, changes[propertyName], false);
    }
    return result;
}
exports.toSimpleChanges = toSimpleChanges;
