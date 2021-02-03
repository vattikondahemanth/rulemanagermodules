/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FocusGroup } from './focus-group';
/**
 * @hidden
 */
export declare class FocusRoot {
    private groups;
    registerGroup(group: FocusGroup): void;
    unregisterGroup(group: FocusGroup): void;
    activate(): any;
    deactivate(): any;
}
