import { ExcelExporter, Workbook } from '@progress/kendo-ooxml';
import { toExporterColumns, destroyColumns } from './exporter-columns';
/**
 * @hidden
 */
export const workbookOptions = (options) => {
    const columns = toExporterColumns(options.columns);
    const exporter = new ExcelExporter({
        columns: columns,
        data: options.data,
        filterable: options.filterable,
        groups: options.group,
        paddingCellOptions: options.paddingCellOptions,
        headerPaddingCellOptions: options.headerPaddingCellOptions,
        collapsible: options.collapsible
    });
    const result = exporter.workbook();
    result.creator = options.creator;
    result.date = options.date;
    result.rtl = options.rtl;
    destroyColumns(columns);
    return result;
};
/**
 * @hidden
 */
export const toDataURL = (options) => {
    const workbook = new Workbook(options);
    return workbook.toDataURL();
};
/**
 * @hidden
 */
export const isWorkbookOptions = (value) => {
    return value && value.sheets;
};
