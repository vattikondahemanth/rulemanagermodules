/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ItemDisabledFn } from './common/item-disabled';
import { DataService } from './data.service';
/**
 * @hidden
 */
export declare class DisabledItemsService {
    private dataService;
    defaultItem: any;
    itemDisabled: ItemDisabledFn;
    constructor(dataService: DataService);
    isIndexDisabled(index: number): boolean;
    isItemDisabled(item: any): boolean;
}
