/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var dom_events_service_1 = require("../common/dom-events.service");
var local_data_changes_service_1 = require("../editing/local-data-changes.service");
/**
 * @hidden
 */
var SelectionService = /** @class */ (function () {
    function SelectionService(domEvents, localDataChangesService) {
        var _this = this;
        this.changes = new core_1.EventEmitter();
        this.lastSelectionStartIndex = 0;
        this.currentSelection = [];
        this.selectAllChecked = false;
        this.cellClickSubscription = domEvents.cellClick.subscribe(function (args) {
            if (_this.options.enabled && !_this.options.checkboxOnly && args.type !== 'contextmenu') {
                _this.handleClick({ index: args.rowIndex, data: args.dataItem }, args.originalEvent);
            }
        });
        this.mousedownSubscription = domEvents.cellMousedown.subscribe(function (args) {
            if (_this.options.enabled && (!_this.options.mode || _this.options.mode === "multiple") &&
                !_this.options.checkboxOnly && args.originalEvent.shiftKey) {
                args.originalEvent.preventDefault();
            }
        });
        if (localDataChangesService) {
            this.dataChangedSubscription = localDataChangesService.changes.subscribe(function (args) {
                if (utils_2.isPresent(args.action) && args.action === 'remove') {
                    _this.deselect(args.item);
                }
            });
        }
    }
    SelectionService.prototype.init = function (settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            var iterator_1 = this.getIterator();
            this._selectAllState = true;
            while (true) {
                var item = iterator_1.next();
                if (item.done) {
                    break;
                }
                if (item.value && item.value.type === "data") {
                    var rowArgs = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    if (settings.rowSelected(rowArgs)) {
                        this.currentSelection[item.value.index] = rowArgs;
                    }
                    else {
                        this._selectAllState = undefined;
                    }
                }
            }
            if (this.currentSelection.length === 0) {
                this._selectAllState = false;
            }
        }
    };
    SelectionService.prototype.isSelected = function (index) {
        return this.options.enabled && utils_2.isPresent(this.currentSelection[index]);
    };
    SelectionService.prototype.handleClick = function (item, event) {
        var ev;
        var ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isSelected(item.index)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                ev = this.addAllTo(item, ctrlKey);
            }
        }
        if (!utils_2.isPresent(ev)) {
            ev = this.select(item);
            this.currentSelection[item.index] = {
                dataItem: item.data,
                index: item.index
            };
        }
        if (!ev.selectedRows.length && !ev.deselectedRows.length) {
            return;
        }
        ev.ctrlKey = event.ctrlKey || event.metaKey;
        ev.shiftKey = event.shiftKey;
        this.changes.emit(ev);
    };
    SelectionService.prototype.toggle = function (item) {
        var selectedRows = [];
        var deselectedRows = [];
        this.lastSelectionStartIndex = item.index;
        if (this.isSelected(item.index)) {
            deselectedRows.push({ dataItem: item.data, index: item.index });
        }
        else {
            selectedRows.push({ dataItem: item.data, index: item.index });
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    };
    SelectionService.prototype.toggleByIndex = function (index) {
        var iterator = this.getIterator();
        if (this.selectAllChecked && this.isSelected(index)) {
            this.selectAllChecked = false;
        }
        while (true) {
            var item = iterator.next();
            if (item.done) {
                break;
            }
            if (item.value && item.value.type === "data" && item.value.index === index) {
                var itemToToggle = {
                    data: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(index) || this.options.mode === "multiple") {
                    return this.toggle(itemToToggle);
                }
                else {
                    return this.select(itemToToggle);
                }
            }
        }
    };
    SelectionService.prototype.select = function (item) {
        var deselectedRows = [];
        var selectedRows = [];
        this.lastSelectionStartIndex = item.index;
        if (!this.isSelected(item.index)) {
            selectedRows.push({ dataItem: item.data, index: item.index });
        }
        this.currentSelection.forEach(function (row) {
            if (row.index !== item.index) {
                deselectedRows.push(row);
            }
        });
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    };
    //Used to manually deselect removed items
    SelectionService.prototype.deselect = function (removedItem) {
        var iterator = this.getIterator();
        while (true) {
            var item = iterator.next();
            if (item.done) {
                break;
            }
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                var rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(rowArgs.index)) {
                    var ev = {
                        ctrlKey: false,
                        deselectedRows: [rowArgs],
                        selectedRows: []
                    };
                    this.changes.emit(ev);
                }
            }
        }
    };
    SelectionService.prototype.addAllTo = function (item, ctrlKey) {
        var selectedRows = [];
        var deselectedRows = [];
        var start = Math.min(this.lastSelectionStartIndex, item.index);
        var end = Math.max(this.lastSelectionStartIndex, item.index);
        var iterator = this.getIterator();
        while (true) {
            var next = iterator.next();
            if (next.done) {
                break;
            }
            if (next.value && next.value.type === "data") {
                var idx = next.value.index;
                if ((idx < start || idx > end) && this.isSelected(idx) && !ctrlKey) {
                    deselectedRows.push({ dataItem: next.value.data, index: idx });
                }
                if ((idx >= start && idx <= end) && !this.isSelected(idx)) {
                    selectedRows.push({ dataItem: next.value.data, index: idx });
                }
            }
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    };
    SelectionService.prototype.updateAll = function (selectAllChecked) {
        this.selectAllChecked = selectAllChecked;
        var selectedRows = [];
        var deselectedRows = [];
        var iterator = this.getIterator();
        while (true) {
            var next = iterator.next();
            if (next.done) {
                break;
            }
            if (next.value && next.value.type === "data") {
                var idx = next.value.index;
                if (this.isSelected(idx) && !selectAllChecked) {
                    deselectedRows.push({ dataItem: next.value.data, index: idx });
                }
                if (!this.isSelected(idx) && selectAllChecked) {
                    selectedRows.push({ dataItem: next.value.data, index: idx });
                }
            }
        }
        if (!selectedRows.length && !deselectedRows.length) {
            return;
        }
        var ev = {
            ctrlKey: true,
            deselectedRows: deselectedRows,
            selectedRows: selectedRows,
            shiftKey: true
        };
        this.changes.emit(ev);
    };
    Object.defineProperty(SelectionService.prototype, "selectAllState", {
        get: function () {
            return this._selectAllState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionService.prototype, "selected", {
        get: function () {
            return this.currentSelection.map(function (item) {
                return item.index;
            }).filter(function (n) { return typeof n === "number"; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionService.prototype, "options", {
        get: function () {
            var defaultOptions = {
                checkboxOnly: false,
                enabled: true,
                mode: "multiple"
            };
            if (!utils_2.isPresent(this.settings)) {
                return defaultOptions;
            }
            if (typeof this.settings.selectable === 'boolean') {
                return {
                    checkboxOnly: false,
                    enabled: this.settings.selectable,
                    mode: "multiple"
                };
            }
            else {
                return Object.assign(defaultOptions, this.settings.selectable);
            }
        },
        enumerable: true,
        configurable: true
    });
    SelectionService.prototype.ngOnDestroy = function () {
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
            this.cellClickSubscription = null;
        }
        if (this.mousedownSubscription) {
            this.mousedownSubscription.unsubscribe();
            this.mousedownSubscription = null;
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
            this.dataChangedSubscription = null;
        }
    };
    SelectionService.prototype.getIterator = function () {
        var accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[utils_1.iterator]();
    };
    SelectionService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SelectionService.ctorParameters = function () { return [
        { type: dom_events_service_1.DomEventsService },
        { type: local_data_changes_service_1.LocalDataChangesService }
    ]; };
    return SelectionService;
}());
exports.SelectionService = SelectionService;
