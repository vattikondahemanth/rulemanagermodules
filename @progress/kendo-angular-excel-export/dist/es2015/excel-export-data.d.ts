/**
 * The expected type for the ExcelExportComponent data.
 */
export interface ExcelExportData {
    /**
     * The exported data.
     * If grouped, the data must be structured as described in the
     * [`GroupResult`]({% slug api_kendo-data-query_groupresult %}) of the Kendo UI Data Query component.
     */
    data?: any[];
    /**
     * The exported data groups.
     * The groups must be compatible with the
     * [`GroupDescriptor`]({% slug api_kendo-data-query_groupdescriptor %}) of the Kendo UI Data Query component.
     */
    group?: any[];
}
