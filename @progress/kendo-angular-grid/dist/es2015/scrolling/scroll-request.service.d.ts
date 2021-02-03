/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from 'rxjs';
/**
 * @hidden
 */
export interface ScrollRequest {
    itemIndex: number;
}
/**
 * @hidden
 */
export declare class ScrollRequestService {
    requests: Subject<ScrollRequest>;
    scrollTo(itemIndex: number): void;
}
