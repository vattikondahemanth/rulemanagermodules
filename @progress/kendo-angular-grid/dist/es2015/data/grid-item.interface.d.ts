/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DataItem } from './data-item.interface';
import { GroupItem } from './group-item.interface';
import { GroupFooterItem } from './group-footer-item.interface';
/**
 * Represents an item that will be rendered by the Grid.
 * Can be a data item, a group item, or a group footer.
 */
export declare type GridItem = DataItem | GroupItem | GroupFooterItem;
