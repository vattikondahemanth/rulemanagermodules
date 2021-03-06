// tslint:disable:max-line-length
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { saveAs } from '@progress/kendo-file-saver';
import { workbookOptions, toDataURL, isWorkbookOptions } from './ooxml/workbook';
import { ColumnBase } from './columns/column-base';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
/**
 * Represents the [Kendo UI Excel Export component for Angular]({% slug overview_excelexport %}).
 * Configures the settings for the Excel export of the Kendo UI Grid.
 */
export class ExcelExportComponent {
    constructor(localization) {
        this.localization = localization;
        /**
         * Specifies the name of the file that is exported to Excel.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * @hidden
         */
        this.columns = new QueryList();
        this.saveFile = this.saveFile.bind(this);
    }
    /**
     * Saves the data to Excel.
     *
     * @param exportData - An optional parameter. Can be the data that will be exported or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}).
     */
    save(exportData) {
        this.toDataURL(exportData).then(this.saveFile);
    }
    /**
     * Based on the specified columns and data, returns
     * [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %})
     * ([see example]({% slug customrowsandcells_excelexport %})).
     *
     * @param exportData - The optional data to be exported.
     * @returns {WorkbookOptions} - The workbook options.
     */
    workbookOptions(exportData) {
        const currentData = this.getExportData(exportData);
        const options = workbookOptions({
            columns: this.columns,
            data: currentData.data,
            group: currentData.group,
            filterable: this.filterable,
            creator: this.creator,
            date: this.date,
            rtl: this.localization.rtl,
            paddingCellOptions: this.paddingCellOptions,
            headerPaddingCellOptions: this.headerPaddingCellOptions,
            collapsible: this.collapsible
        });
        return options;
    }
    /**
     * Returns a promise which will be resolved with the file data URI
     * ([see example]({% slug filesaving_excelexport %})).
     *
     * @param exportData - The optional data or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}) that will be used to generate the data URI.
     * @returns {Promise<string>} - The promise that will be resolved by the file data URI.
     */
    toDataURL(exportData) {
        const options = isWorkbookOptions(exportData) ?
            exportData :
            this.workbookOptions(exportData);
        return toDataURL(options);
    }
    getExportData(exportData) {
        let result;
        if (exportData) {
            if (Array.isArray(exportData)) {
                result = {
                    data: exportData
                };
            }
            else {
                result = exportData;
            }
        }
        else {
            result = {
                data: this.data,
                group: this.group
            };
        }
        return result;
    }
    saveFile(dataURL) {
        saveAs(dataURL, this.fileName, {
            forceProxy: this.forceProxy,
            proxyURL: this.proxyURL
        });
    }
}
ExcelExportComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoExcelExport',
                selector: 'kendo-excelexport',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.excelexport'
                    }
                ],
                template: ``
            },] },
];
/** @nocollapse */
ExcelExportComponent.ctorParameters = () => [
    { type: LocalizationService }
];
ExcelExportComponent.propDecorators = {
    fileName: [{ type: Input }],
    filterable: [{ type: Input }],
    collapsible: [{ type: Input }],
    creator: [{ type: Input }],
    date: [{ type: Input }],
    forceProxy: [{ type: Input }],
    proxyURL: [{ type: Input }],
    data: [{ type: Input }],
    group: [{ type: Input }],
    paddingCellOptions: [{ type: Input }],
    headerPaddingCellOptions: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnBase, { descendants: true },] }]
};
