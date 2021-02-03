/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FocusGroup } from './focus-group';
import { GroupItem } from '../data/group-item.interface';
/**
 * @hidden
 */
export interface LogicalCell {
    uid: number;
    logicalColIndex: number;
    logicalRowIndex: number;
    rowSpan?: number;
    colSpan?: number;
    groupItem?: GroupItem;
    focusGroup: FocusGroup;
    detailExpandCell?: boolean;
}
