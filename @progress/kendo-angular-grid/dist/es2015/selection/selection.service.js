/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter } from '@angular/core';
import { iterator } from '../utils';
import { isPresent } from '../utils';
import { DomEventsService } from '../common/dom-events.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
/**
 * @hidden
 */
export class SelectionService {
    constructor(domEvents, localDataChangesService) {
        this.changes = new EventEmitter();
        this.lastSelectionStartIndex = 0;
        this.currentSelection = [];
        this.selectAllChecked = false;
        this.cellClickSubscription = domEvents.cellClick.subscribe((args) => {
            if (this.options.enabled && !this.options.checkboxOnly && args.type !== 'contextmenu') {
                this.handleClick({ index: args.rowIndex, data: args.dataItem }, args.originalEvent);
            }
        });
        this.mousedownSubscription = domEvents.cellMousedown.subscribe((args) => {
            if (this.options.enabled && (!this.options.mode || this.options.mode === "multiple") &&
                !this.options.checkboxOnly && args.originalEvent.shiftKey) {
                args.originalEvent.preventDefault();
            }
        });
        if (localDataChangesService) {
            this.dataChangedSubscription = localDataChangesService.changes.subscribe((args) => {
                if (isPresent(args.action) && args.action === 'remove') {
                    this.deselect(args.item);
                }
            });
        }
    }
    init(settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            const iterator = this.getIterator();
            this._selectAllState = true;
            while (true) {
                const item = iterator.next();
                if (item.done) {
                    break;
                }
                if (item.value && item.value.type === "data") {
                    const rowArgs = {
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
    }
    isSelected(index) {
        return this.options.enabled && isPresent(this.currentSelection[index]);
    }
    handleClick(item, event) {
        let ev;
        const ctrlKey = event.ctrlKey || event.metaKey;
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
        if (!isPresent(ev)) {
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
    }
    toggle(item) {
        let selectedRows = [];
        let deselectedRows = [];
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
    }
    toggleByIndex(index) {
        const iterator = this.getIterator();
        if (this.selectAllChecked && this.isSelected(index)) {
            this.selectAllChecked = false;
        }
        while (true) {
            const item = iterator.next();
            if (item.done) {
                break;
            }
            if (item.value && item.value.type === "data" && item.value.index === index) {
                const itemToToggle = {
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
    }
    select(item) {
        let deselectedRows = [];
        let selectedRows = [];
        this.lastSelectionStartIndex = item.index;
        if (!this.isSelected(item.index)) {
            selectedRows.push({ dataItem: item.data, index: item.index });
        }
        this.currentSelection.forEach((row) => {
            if (row.index !== item.index) {
                deselectedRows.push(row);
            }
        });
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    //Used to manually deselect removed items
    deselect(removedItem) {
        const iterator = this.getIterator();
        while (true) {
            const item = iterator.next();
            if (item.done) {
                break;
            }
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                const rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(rowArgs.index)) {
                    let ev = {
                        ctrlKey: false,
                        deselectedRows: [rowArgs],
                        selectedRows: []
                    };
                    this.changes.emit(ev);
                }
            }
        }
    }
    addAllTo(item, ctrlKey) {
        let selectedRows = [];
        let deselectedRows = [];
        const start = Math.min(this.lastSelectionStartIndex, item.index);
        const end = Math.max(this.lastSelectionStartIndex, item.index);
        const iterator = this.getIterator();
        while (true) {
            const next = iterator.next();
            if (next.done) {
                break;
            }
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
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
    }
    updateAll(selectAllChecked) {
        this.selectAllChecked = selectAllChecked;
        let selectedRows = [];
        let deselectedRows = [];
        const iterator = this.getIterator();
        while (true) {
            const next = iterator.next();
            if (next.done) {
                break;
            }
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
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
        let ev = {
            ctrlKey: true,
            deselectedRows: deselectedRows,
            selectedRows: selectedRows,
            shiftKey: true
        };
        this.changes.emit(ev);
    }
    get selectAllState() {
        return this._selectAllState;
    }
    get selected() {
        return this.currentSelection.map((item) => {
            return item.index;
        }).filter((n) => typeof n === "number");
    }
    get options() {
        const defaultOptions = {
            checkboxOnly: false,
            enabled: true,
            mode: "multiple"
        };
        if (!isPresent(this.settings)) {
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
    }
    ngOnDestroy() {
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
    }
    getIterator() {
        const accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[iterator]();
    }
}
SelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectionService.ctorParameters = () => [
    { type: DomEventsService },
    { type: LocalDataChangesService }
];
