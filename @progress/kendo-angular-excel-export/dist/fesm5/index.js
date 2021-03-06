import { Component, ContentChild, ContentChildren, Directive, Host, Input, NgModule, Optional, QueryList, SkipSelf, TemplateRef, forwardRef } from '@angular/core';
import { saveAs } from '@progress/kendo-file-saver';
import { ExcelExporter, Workbook } from '@progress/kendo-ooxml';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { __extends } from 'tslib';

/* tslint:disable align */
/* tslint:disable:no-use-before-declare */
var compileTemplate = function (templateRef, context, updateContext) {
    var embeddedView = templateRef.createEmbeddedView(context);
    var result = function (data) {
        updateContext(context, data);
        embeddedView.detectChanges();
        return embeddedView.rootNodes.reduce(function (content, rootNode) {
            return content + rootNode.textContent;
        }, '').trim();
    };
    result.destroy = function () {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
var updateGroupHeaderContext = function (context, data) {
    context.$implicit = context.group = data;
    context.field = data.field;
    context.value = data.value;
    context.aggregates = data.aggregates;
};
var updateGroupFooterContext = function (context, data) {
    context.group = data.group;
    context.$implicit = context.aggregates = data;
};
var updateFooterContext = function (_context, _data) { }; /* tslint:disable-line no-empty */
/**
 * @hidden
 */
var toExporterColumns = function (sourceColumns) {
    var exporterColumns = [];
    var columnIndex = 0;
    var addColumns = function (columns, result, level) {
        columns.forEach(function (column) {
            if (column.level === level) {
                var exporterColumn = new ExporterColumn(column, columnIndex);
                result.push(exporterColumn);
                if (column.children && column.children.length > 1) {
                    var children = exporterColumn.columns = [];
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
var destroyColumns = function (columns) {
    if (columns) {
        columns.forEach(function (column) {
            column.destroy();
        });
    }
};
/**
 * @hidden
 */
var ExporterColumn = /** @class */ (function () {
    function ExporterColumn(column, columnIndex) {
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
    ExporterColumn.prototype.destroy = function () {
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
    };
    return ExporterColumn;
}());

/**
 * @hidden
 */
var workbookOptions = function (options) {
    var columns = toExporterColumns(options.columns);
    var exporter = new ExcelExporter({
        columns: columns,
        data: options.data,
        filterable: options.filterable,
        groups: options.group,
        paddingCellOptions: options.paddingCellOptions,
        headerPaddingCellOptions: options.headerPaddingCellOptions,
        collapsible: options.collapsible
    });
    var result = exporter.workbook();
    result.creator = options.creator;
    result.date = options.date;
    result.rtl = options.rtl;
    destroyColumns(columns);
    return result;
};
/**
 * @hidden
 */
var toDataURL = function (options) {
    var workbook = new Workbook(options);
    return workbook.toDataURL();
};
/**
 * @hidden
 */
var isWorkbookOptions = function (value) {
    return value && value.sheets;
};

/**
 * @hidden
 */
var ColumnBase = /** @class */ (function () {
    function ColumnBase(parent) {
        this.parent = parent;
    }
    Object.defineProperty(ColumnBase.prototype, "level", {
        /**
         * @hidden
         */
        get: function () {
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    ColumnBase.propDecorators = {
        title: [{ type: Input }],
        width: [{ type: Input }],
        locked: [{ type: Input }],
        hidden: [{ type: Input }],
        headerCellOptions: [{ type: Input }],
        children: [{ type: ContentChildren, args: [ColumnBase,] }]
    };
    return ColumnBase;
}());

// tslint:disable:max-line-length
/**
 * Represents the [Kendo UI Excel Export component for Angular]({% slug overview_excelexport %}).
 * Configures the settings for the Excel export of the Kendo UI Grid.
 */
var ExcelExportComponent = /** @class */ (function () {
    function ExcelExportComponent(localization) {
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
    ExcelExportComponent.prototype.save = function (exportData) {
        this.toDataURL(exportData).then(this.saveFile);
    };
    /**
     * Based on the specified columns and data, returns
     * [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %})
     * ([see example]({% slug customrowsandcells_excelexport %})).
     *
     * @param exportData - The optional data to be exported.
     * @returns {WorkbookOptions} - The workbook options.
     */
    ExcelExportComponent.prototype.workbookOptions = function (exportData) {
        var currentData = this.getExportData(exportData);
        var options = workbookOptions({
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
    };
    /**
     * Returns a promise which will be resolved with the file data URI
     * ([see example]({% slug filesaving_excelexport %})).
     *
     * @param exportData - The optional data or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}) that will be used to generate the data URI.
     * @returns {Promise<string>} - The promise that will be resolved by the file data URI.
     */
    ExcelExportComponent.prototype.toDataURL = function (exportData) {
        var options = isWorkbookOptions(exportData) ?
            exportData :
            this.workbookOptions(exportData);
        return toDataURL(options);
    };
    ExcelExportComponent.prototype.getExportData = function (exportData) {
        var result;
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
    };
    ExcelExportComponent.prototype.saveFile = function (dataURL) {
        saveAs(dataURL, this.fileName, {
            forceProxy: this.forceProxy,
            proxyURL: this.proxyURL
        });
    };
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
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ExcelExportComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
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
    return ExcelExportComponent;
}());

/**
 * Represents the group header cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-template)).
 * Enables you to customize the content of the group header item.
 */
var GroupHeaderTemplateDirective = /** @class */ (function () {
    function GroupHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoExcelExportGroupHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupHeaderTemplateDirective;
}());

/**
 * Represents the group footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-footer-template)).
 * Enables you to customize the group footer cell of the column.
 */
var GroupFooterTemplateDirective = /** @class */ (function () {
    function GroupFooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupFooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoExcelExportGroupFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupFooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupFooterTemplateDirective;
}());

/**
 * Represents the footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-footer-template)).
 * Enables you to customize the footer cell of the column.
 */
var FooterTemplateDirective = /** @class */ (function () {
    function FooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoExcelExportFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    FooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FooterTemplateDirective;
}());

/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
var ColumnComponent = /** @class */ (function (_super) {
    __extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        return _super.call(this, parent) || this;
    }
    ColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-excelexport-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
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
    return ColumnComponent;
}(ColumnBase));

/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
var ColumnGroupComponent = /** @class */ (function (_super) {
    __extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        return _this;
    }
    ColumnGroupComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnGroupComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-excelexport-column-group',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnGroupComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    return ColumnGroupComponent;
}(ColumnBase));

var declarations = [
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
var ExcelExportModule = /** @class */ (function () {
    function ExcelExportModule() {
    }
    ExcelExportModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations],
                    exports: [declarations]
                },] },
    ];
    return ExcelExportModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ExcelExportComponent, ExcelExportModule, ColumnBase, ColumnComponent, ColumnGroupComponent, FooterTemplateDirective, GroupFooterTemplateDirective, GroupHeaderTemplateDirective, workbookOptions, toDataURL, isWorkbookOptions };
export * from '@progress/kendo-ooxml';
