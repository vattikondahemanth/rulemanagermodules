/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
export declare class BeforeEqFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization: LocalizationService);
    /**
     * @hidden
     */
    toJSON(): {
        text: string;
        value: string;
    };
}
