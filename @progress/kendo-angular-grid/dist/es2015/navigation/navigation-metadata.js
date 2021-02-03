/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export class NavigationMetadata {
    constructor(dataRows, headerRows, isVirtual, hasPager, hasDetailTemplate, gridElement) {
        this.dataRows = dataRows;
        this.headerRows = headerRows;
        this.isVirtual = isVirtual;
        this.hasPager = hasPager;
        this.hasDetailTemplate = hasDetailTemplate;
        this.gridElement = gridElement;
    }
    get maxLogicalRowIndex() {
        const dataRows = this.hasDetailTemplate ? this.dataRows * 2 : this.dataRows;
        return this.headerRows + dataRows - 1;
    }
}
