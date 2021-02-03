/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
/**
 * @hidden
 */
export class FocusRoot {
    constructor() {
        this.groups = [];
    }
    registerGroup(group) {
        this.unregisterGroup(group);
        this.groups.push(group);
    }
    unregisterGroup(group) {
        this.groups = this.groups.filter(f => f !== group);
    }
    activate() {
        this.groups.forEach(f => f.activate());
    }
    deactivate() {
        this.groups.forEach(f => f.deactivate());
    }
}
FocusRoot.decorators = [
    { type: Injectable },
];
