import { Component, ContentChild, ContentChildren, Directive, Host, Input, NgModule, Optional, QueryList, SkipSelf, TemplateRef, forwardRef } from '@angular/core';
import { saveAs } from '@progress/kendo-file-saver';
import { ExcelExporter, Workbook } from '@progress/kendo-ooxml';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';

/* tslint:disable align */
/* tslint:disable:no-use-before-declare */
const compileTemplate = (templateRef, context, updateContext) => {
    let embeddedView = templateRef.createEmbeddedView(context);
    const result = (data) => {
        updateContext(context, data);
        embeddedView.detectChanges();
        return embeddedView.rootNodes.reduce((content, rootNode) => {
            return content + rootNode.textContent;
        }, '').trim();
    };
    result.destroy = () => {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
const updateGroupHeaderContext = (context, data) => {
    context.$implicit = context.group = data;
    context.field = data.field;
    context.value = data.value;
    context.aggregates = data.aggregates;
};
const updateGroupFooterContext = (context, data) => {
    context.group = data.group;
    context.$implicit = context.aggregates = data;
};
const updateFooterContext = (_context, _data) => { }; /* tslint:disable-line no-empty */
/**
 * @hidden
 */
const toExporterColumns = (sourceColumns) => {
    const exporterColumns = [];
    let columnIndex = 0;
    const addColumns = (columns, result, level) => {
        columns.forEach((column) => {
            if (column.level === level) {
                const exporterColumn = new ExporterColumn(column, columnIndex);
                result.push(exporterColumn);
                if (column.children && column.children.length > 1) {
                    const children = exporterColumn.columns = [];
                    addColumns(column.children, children, level + 1);
                }
                else {
                    columnIndex++;
                }
            }
        });
    };
    addColumns(sourceColumns, exporterColumns, 0);
    return exporterColumns;
};
/**
 * @hidden
 */
const destroyColumns = (columns) => {
    if (columns) {
        columns.forEach(column => {
            column.destroy();
        });
    }
};
/**
 * @hidden
 */
class ExporterColumn {
    constructor(column, columnIndex) {
        this.title = column.title;
        this.field = column.field;
        this.hidden = column.hidden;
        this.locked = column.locked;
        this.width = column.width;
        this.headerCellOptions = column.headerCellOptions;
        this.cellOptions = column.cellOptions;
        this.groupHeaderCellOptions = column.groupHeaderCellOptions;
        this.groupFooterCellOptions = column.groupFooterCellOptions;
        this.footerCellOptions = column.footerCellOptions;
        if (column.footerTemplate) {
            this.footerTemplate = compileTemplate(column.footerTemplate.templateRef, {
                $implicit: column,
                column: column,
                columnIndex: columnIndex
            }, updateFooterContext);
        }
        if (column.groupFooterTemplate) {
            this.groupFooterTemplate = compileTemplate(column.groupFooterTemplate.templateRef, {
                column: column,
                field: column.field
            }, updateGroupFooterContext);
        }
        if (column.groupHeaderTemplate) {
            this.groupHeaderTemplate = compileTemplate(column.groupHeaderTemplate.templateRef, {}, updateGroupHeaderContext);
        }
    }
    destroy() {
        if (this.footerTemplate) {
            this.footerTemplate.destroy();
        }
        if (this.groupFooterTemplate) {
            this.groupFooterTemplate.destroy();
        }
        if (this.groupHeaderTemplate) {
            this.groupHeaderTemplate.destroy();
        }
        destroyColumns(this.columns);
    }
}

/**
 * @hidden
 */
const workbookOptions = (options) => {
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
const toDataURL = (options) => {
    const workbook = new Workbook(options);
    return workbook.toDataURL();
};
/**
 * @hidden
 */
const isWorkbookOptions = (value) => {
    return value && value.sheets;
};

/**
 * @hidden
 */
class ColumnBase {
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * @hidden
     */
    get level() {
        return this.parent ? this.parent.level + 1 : 0;
    }
}
ColumnBase.propDecorators = {
    title: [{ type: Input }],
    width: [{ type: Input }],
    locked: [{ type: Input }],
    hidden: [{ type: Input }],
    headerCellOptions: [{ type: Input }],
    children: [{ type: ContentChildren, args: [ColumnBase,] }]
};

// tslint:disable:max-line-length
/**
 * Represents the [Kendo UI Excel Export component for Angular]({% slug overview_excelexport %}).
 * Configures the settings for the Excel export of the Kendo UI Grid.
 */
class ExcelExportComponent {
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

/**
 * Represents the group header cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-template)).
 * Enables you to customize the content of the group header item.
 */
class GroupHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoExcelExportGroupHeaderTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the group footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-footer-template)).
 * Enables you to customize the group footer cell of the column.
 */
class GroupFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupFooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoExcelExportGroupFooterTemplate]'
            },] },
];
/** @nocollapse */
GroupFooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-footer-template)).
 * Enables you to customize the footer cell of the column.
 */
class FooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoExcelExportFooterTemplate]'
            },] },
];
/** @nocollapse */
FooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
class ColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
    }
}
ColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column',
                template: ``
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
ColumnComponent.propDecorators = {
    field: [{ type: Input }],
    cellOptions: [{ type: Input }],
    groupHeaderCellOptions: [{ type: Input }],
    groupFooterCellOptions: [{ type: Input }],
    footerCellOptions: [{ type: Input }],
    groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }],
    groupFooterTemplate: [{ type: ContentChild, args: [GroupFooterTemplateDirective,] }],
    footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }]
};

/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
class ColumnGroupComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
}
ColumnGroupComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnGroupComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-excelexport-column-group',
                template: ``
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];

const declarations = [
    ExcelExportComponent,
    ColumnComponent,
    ColumnGroupComponent,
    FooterTemplateDirective,
    GroupFooterTemplateDirective,
    GroupHeaderTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Excel Export component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ExcelExportModule module
 * import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ExcelExportModule], // import ExcelExportModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class ExcelExportModule {
}
ExcelExportModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [declarations]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { ExcelExportComponent, ExcelExportModule, ColumnBase, ColumnComponent, ColumnGroupComponent, FooterTemplateDirective, GroupFooterTemplateDirective, GroupHeaderTemplateDirective, workbookOptions, toDataURL, isWorkbookOptions };
export * from '@progress/kendo-ooxml';
