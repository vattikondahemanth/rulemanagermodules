/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy } from '@angular/core';
import { SelectableSettings } from './selectable-settings';
import { RowArgs, RowSelectedFn } from "../rendering/common/row-class";
import { DomEventsService } from '../common/dom-events.service';
import { LocalDataChangesService } from '../editing/local-data-changes.service';
/**
 * The returned type of the `selection` event
 * ([see example]({% slug selection_grid %}#toc-in-combination-with-the-select-all-feature)).
 */
export interface SelectionEvent {
    /**
     * The items that were added to the selection.
     */
    selectedRows: RowArgs[];
    /**
     * The items that were removed from the selection.
     */
    deselectedRows: RowArgs[];
    /**
     * Shows the state of the `Ctrl` key (or the `Command` key on a Mac) during the selection.
     */
    ctrlKey: boolean;
    /**
     * Shows the state of the `Shift` key during the selection.
     */
    shiftKey?: boolean;
}
/**
 * @hidden
 */
export declare type SelectionServiceSettings = {
    rowSelected: RowSelectedFn;
    selectable: boolean | SelectableSettings;
    view: {
        accessor: Function;
        at: Function;
        length: Number;
    };
};
/**
 * @hidden
 */
export declare class SelectionService implements OnDestroy {
    changes: EventEmitter<SelectionEvent>;
    lastSelectionStartIndex: number;
    currentSelection: RowArgs[];
    selectAllChecked: boolean;
    settings: SelectionServiceSettings;
    private cellClickSubscription;
    private mousedownSubscription;
    private dataChangedSubscription;
    private _selectAllState;
    constructor(domEvents: DomEventsService, localDataChangesService?: LocalDataChangesService);
    init(settings: any): void;
    isSelected(index: number): boolean;
    handleClick(item: any, event: any): void;
    toggle(item: any): any;
    toggleByIndex(index: number): any;
    select(item: any): any;
    deselect(removedItem: any): void;
    addAllTo(item: any, ctrlKey: boolean): any;
    updateAll(selectAllChecked: boolean): void;
    readonly selectAllState: any;
    readonly selected: number[];
    readonly options: SelectableSettings;
    ngOnDestroy(): void;
    private getIterator;
}
