/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, EventEmitter, Injectable, NgZone, Optional } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { from, interval, Subscription } from 'rxjs';
import { filter, switchMap, switchMapTo, take, takeUntil, map } from 'rxjs/operators';
import { CellKeydownEvent } from './cell-keydown-event';
import { FocusRoot } from './focus-root';
import { FocusableDirective } from './focusable.directive';
import { GridFocusableElement } from './grid-focusable-element';
import { NavigationCursor } from './navigation-cursor';
import { NavigationModel } from './navigation-model';
import { DomEventsService } from '../common/dom-events.service';
import { Keys } from '@progress/kendo-angular-common';
import { EditService } from '../editing/edit.service';
import { GroupsService } from '../grouping/groups.service';
import { PagerContextService } from '../pager/pager-context.service';
import { closest, contains, findFocusableChild, isVisible, matchesNodeName } from '../rendering/common/dom-queries';
import { DetailsService } from '../rendering/details/details.service';
import { ScrollRequestService } from '../scrolling/scroll-request.service';
const isInSameGrid = (element, gridElement) => closest(element, matchesNodeName('kendo-grid')) === gridElement;
const ɵ0 = isInSameGrid;
const matchHeaderCell = matchesNodeName('th');
const matchDataCell = matchesNodeName('td');
const matchCell = (element) => matchDataCell(element) || matchHeaderCell(element);
const ɵ1 = matchCell;
const gridCell = (element, gridElement) => {
    let target = closest(element, matchCell);
    while (target && !isInSameGrid(target, gridElement)) {
        target = closest(target.parentElement, matchCell);
    }
    return target;
};
const ɵ2 = gridCell;
const targetCell = (target, gridElement) => {
    const cell = gridCell(target, gridElement);
    const row = closest(cell, matchesNodeName('tr'));
    if (cell && row) {
        let rowIndex = row.getAttribute('aria-rowindex');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) - 1 : null;
        let colIndex = cell.getAttribute('aria-colindex');
        colIndex = colIndex ? parseInt(colIndex, 10) - 1 : null;
        if (rowIndex !== null && colIndex !== null) {
            return { colIndex, rowIndex, element: cell };
        }
    }
};
const ɵ3 = targetCell;
const lastCell = (row) => {
    const cells = row.cells;
    return cells[cells.length - 1];
};
const ɵ4 = lastCell;
const isArrowKey = keyCode => keyCode === Keys.ArrowLeft || keyCode === Keys.ArrowRight ||
    keyCode === Keys.ArrowUp || keyCode === Keys.ArrowDown;
const ɵ5 = isArrowKey;
const isNavigationKey = keyCode => isArrowKey(keyCode) ||
    keyCode === Keys.PageUp || keyCode === Keys.PageDown ||
    keyCode === Keys.Home || keyCode === Keys.End;
const ɵ6 = isNavigationKey;
const isInput = matchesNodeName('input');
const isTextInput = element => element && isInput(element) && element.type.toLowerCase() === 'text';
const ɵ7 = isTextInput;
const isPrintableCharacter = (str) => str.length === 1 && str.match(/\S/);
const ɵ8 = isPrintableCharacter;
/**
 * @hidden
 */
export class NavigationViewport {
    constructor(firstItemIndex, lastItemIndex) {
        this.firstItemIndex = firstItemIndex;
        this.lastItemIndex = lastItemIndex;
    }
    containsRow(dataRowIndex) {
        const headerRow = dataRowIndex < 0;
        return headerRow || (dataRowIndex >= this.firstItemIndex && dataRowIndex <= this.lastItemIndex);
    }
}
/**
 * @hidden
 */
export class NavigationService {
    constructor(zone, domEvents, pagerContextService, scrollRequestService, groupsService, detailsService, focusRoot, editService, cd, localization, focusableParent) {
        this.zone = zone;
        this.domEvents = domEvents;
        this.pagerContextService = pagerContextService;
        this.scrollRequestService = scrollRequestService;
        this.groupsService = groupsService;
        this.detailsService = detailsService;
        this.focusRoot = focusRoot;
        this.editService = editService;
        this.cd = cd;
        this.localization = localization;
        this.focusableParent = focusableParent;
        this.cellKeydown = new EventEmitter();
        this.activeRowIndex = 0;
        this.alive = false;
        this.active = true;
        this.mode = 0 /* Standby */;
        this.model = new NavigationModel();
        this.cursor = new NavigationCursor(this.model);
        this.changes = this.cursor.changes;
    }
    set metadata(value) {
        this.meta = value;
        this.cursor.metadata = value;
    }
    get metadata() {
        return this.meta;
    }
    get enabled() {
        return this.alive;
    }
    get activeCell() {
        if (this.mode !== 0 /* Standby */) {
            return this.cursor.cell;
        }
    }
    get activeRow() {
        if (this.mode !== 0 /* Standby */) {
            return this.cursor.row;
        }
    }
    get activeDataRow() {
        return Math.max(0, this.activeRowIndex - this.meta.headerRows);
    }
    init(meta) {
        this.alive = true;
        this.metadata = meta;
        const onStableSubscriber = (...operators) => (args) => this.zone.isStable ?
            from([true]).pipe(map(() => args)) :
            this.zone.onStable.pipe(take(1), map(() => args), ...operators);
        const onStable = onStableSubscriber();
        this.subs = new Subscription();
        this.subs.add(this.cursor.changes
            .subscribe(args => this.onCursorChanges(args)));
        this.subs.add(this.domEvents.focus.pipe(switchMap(onStable))
            .subscribe((args) => this.navigateTo(args.target)));
        this.subs.add(this.domEvents.focusOut.pipe(filter(() => this.mode !== 0 /* Standby */), switchMap(onStableSubscriber(takeUntil(this.domEvents.focus))))
            .subscribe(args => this.onFocusOut(args)));
        this.subs.add(this.domEvents.windowBlur.pipe(filter(() => this.mode !== 0 /* Standby */))
            .subscribe(() => this.onWindowBlur()));
        this.subs.add(
        // Closing the editor will not always trigger focusout in Firefox.
        // To get around this, we ensure that the cell is closed after editing.
        this.editService.changes.pipe(filter(e => e.action !== 'edit' && this.mode === 2 /* Content */), filter((e) => e.action === 'cellClose' && !e.prevented), switchMap(onStable))
            .subscribe(() => this.leaveCell()));
        this.subs.add(this.pagerContextService.pageChange
            .subscribe(() => this.cursor.reset(0, 0)));
        this.subs.add(this.domEvents.keydown
            .subscribe(args => this.onKeydown(args)));
        this.subs.add(this.domEvents.keydown.pipe(filter(args => args.keyCode === Keys.Tab && this.mode === 2 /* Content */), switchMapTo(this.domEvents.focusOut.pipe(takeUntil(
        // Timeout if focusOut doesn't fire very soon
        interval(0).pipe(take(1))))))
            .subscribe(() => this.onTabout()));
        if (this.focusableParent) {
            const element = new GridFocusableElement(this);
            this.focusableParent.registerElement(element);
        }
        this.deactivateElements();
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        this.alive = false;
    }
    registerCell(cell) {
        if (cell.logicalRowIndex !== this.pendingRowIndex) {
            this.model.registerCell(cell);
        }
    }
    registerCellOnCurrentRow(cell) {
        if (cell.logicalRowIndex === this.pendingRowIndex) {
            this.model.registerCell(cell);
        }
    }
    unregisterCell(cell) {
        this.model.unregisterCell(cell);
    }
    registerRow(row) {
        this.model.registerRow(row);
        this.pendingRowIndex = row.logicalRowIndex;
    }
    updateRow(row) {
        this.model.updateRow(row);
    }
    unregisterRow(uid) {
        this.model.unregisterRow(uid);
    }
    isCellFocusable(cell) {
        return this.alive &&
            this.active &&
            this.mode !== 2 /* Content */ &&
            this.cursor.isActive(cell.logicalRowIndex, cell.logicalColIndex);
    }
    isCellFocused(cell) {
        return this.mode === 1 /* Cursor */ && this.isCellFocusable(cell);
    }
    navigateTo(el) {
        if (!this.alive) {
            return;
        }
        const cell = targetCell(el, this.meta.gridElement.nativeElement);
        if (!cell) {
            return;
        }
        const oldMode = this.mode;
        const focusInCell = contains(cell.element, document.activeElement);
        const focusInActiveRowContent = this.mode === 2 /* Content */ &&
            this.activeRowIndex === cell.rowIndex &&
            el !== cell.element;
        if (focusInCell) {
            this.mode = 2 /* Content */;
            this.cursor.reset(cell.rowIndex, cell.colIndex);
            this.activateRow();
        }
        else if (!focusInActiveRowContent) {
            this.mode = 1 /* Cursor */;
            this.deactivateElements();
            const alreadyActive = this.cursor.isActive(cell.rowIndex, cell.colIndex);
            const isCursor = oldMode === 1 /* Cursor */ && alreadyActive;
            if (!isCursor) {
                this.cursor.reset(cell.rowIndex, cell.colIndex);
            }
        }
    }
    tryFocus(el) {
        this.activateElements();
        const focusable = findFocusableChild(el);
        if (focusable) {
            const cell = targetCell(focusable, this.meta.gridElement.nativeElement);
            if (cell) {
                this.cursor.reset(cell.rowIndex, cell.colIndex);
                this.deactivateElements();
                this.enterCell();
            }
            focusable.focus();
        }
        else {
            this.deactivateElements();
        }
        return !!focusable;
    }
    needsViewport() {
        return this.meta && this.meta.isVirtual;
    }
    setViewport(firstItemIndex, lastItemIndex) {
        this.viewport = new NavigationViewport(firstItemIndex, lastItemIndex);
        if (this.meta && this.meta.isVirtual && this.activeDataRow > -1) {
            const dataRowIndex = this.activeDataRow;
            const ahead = firstItemIndex - dataRowIndex;
            const behind = dataRowIndex - lastItemIndex;
            if (ahead > 0) {
                this.cursor.reset(firstItemIndex + this.meta.headerRows);
            }
            else if (behind > 0) {
                this.cursor.reset(lastItemIndex - this.meta.headerRows);
            }
        }
    }
    focusCell(rowIndex = undefined, colIndex = undefined) {
        this.mode = 1 /* Cursor */;
        this.cursor.reset(rowIndex, colIndex);
        return this.activeCell;
    }
    focusNextCell(wrap = true) {
        return this.focusAdjacentCell(true, wrap);
    }
    focusPrevCell(wrap = true) {
        return this.focusAdjacentCell(false, wrap);
    }
    toggle(active) {
        this.active = active;
        this.cursor.announce();
    }
    hasFocus() {
        return this.mode === 1 /* Cursor */ || this.mode === 2 /* Content */;
    }
    focusAdjacentCell(fwd, wrap) {
        this.focusCell();
        let success = fwd ? this.moveCursorFwd() : this.moveCursorBwd();
        if (wrap && !success) {
            success = fwd ? this.cursor.moveDown(1) : this.cursor.moveUp(1);
            if (success) {
                const row = this.cursor.row;
                const cells = row.cells;
                const nextCell = cells[fwd ? 0 : cells.length - 1];
                this.cursor.reset(row.index, nextCell.colIndex);
            }
        }
        if (success) {
            return this.activeCell;
        }
        else {
            this.mode = 0 /* Standby */;
            this.cursor.announce();
        }
        return null;
    }
    enterCell() {
        const cell = this.cursor.cell;
        if (!cell) {
            return;
        }
        const group = cell.focusGroup;
        const focusable = group && group.canFocus();
        this.mode = focusable ? 2 /* Content */ : 1 /* Cursor */;
        this.cursor.announce();
        if (focusable) {
            this.activateRow();
            group.focus();
        }
    }
    leaveCell() {
        const cell = this.cursor.cell;
        if (!cell) {
            return;
        }
        const group = cell.focusGroup;
        const focusable = group && group.canFocus();
        if (!focusable) {
            this.deactivateElements();
        }
        this.mode = 1 /* Cursor */;
        this.cursor.announce();
    }
    activateElements() {
        this.focusRoot.activate();
    }
    deactivateElements() {
        this.focusRoot.deactivate();
    }
    activateRow() {
        this.cursor.row.cells
            .forEach(cell => cell.focusGroup && cell.focusGroup.activate());
    }
    moveCursorFwd() {
        return this.localization.rtl ? this.cursor.moveLeft() : this.cursor.moveRight();
    }
    moveCursorBwd() {
        return this.localization.rtl ? this.cursor.moveRight() : this.cursor.moveLeft();
    }
    onCursorKeydown(args) {
        let preventDefault = false;
        const modifier = args.ctrlKey || args.metaKey;
        const step = modifier ? 5 : 1;
        if (!this.onCellKeydown(args)) {
            return;
        }
        const row = this.cursor.row;
        switch (args.keyCode) {
            case Keys.ArrowDown:
                preventDefault = this.cursor.moveDown(step);
                break;
            case Keys.ArrowUp:
                preventDefault = this.cursor.moveUp(step);
                break;
            case Keys.ArrowRight:
                preventDefault = this.moveCursorFwd();
                break;
            case Keys.ArrowLeft:
                preventDefault = this.moveCursorBwd();
                break;
            case Keys.PageDown:
                if (this.metadata.isVirtual && this.viewport) {
                    let nextItemIndex = this.meta.headerRows + this.viewport.lastItemIndex + 1;
                    if (this.metadata.hasDetailTemplate) {
                        nextItemIndex++;
                    }
                    nextItemIndex = Math.min(this.meta.maxLogicalRowIndex, nextItemIndex);
                    this.cursor.reset(nextItemIndex);
                    preventDefault = true;
                }
                else if (this.metadata.hasPager) {
                    this.zone.run(() => this.pagerContextService.nextPage());
                    preventDefault = true;
                }
                break;
            case Keys.PageUp:
                if (this.metadata.isVirtual && this.viewport) {
                    let viewportSize = this.viewport.lastItemIndex - this.viewport.firstItemIndex;
                    let firstItemIndex = this.viewport.firstItemIndex;
                    let nextItemIndex = Math.max(this.meta.headerRows, firstItemIndex - viewportSize - 1);
                    this.cursor.reset(nextItemIndex);
                    preventDefault = true;
                }
                else if (this.metadata.hasPager) {
                    this.zone.run(() => this.pagerContextService.prevPage());
                    preventDefault = true;
                }
                break;
            case Keys.Home:
                if (modifier) {
                    if (this.meta.isVirtual) {
                        this.cursor.reset(this.meta.headerRows, 0);
                    }
                    else {
                        this.cursor.reset(this.model.firstRow.index, 0);
                    }
                }
                else {
                    const cells = row.cells;
                    const firstCell = cells[0];
                    this.cursor.reset(row.index, firstCell.colIndex);
                }
                preventDefault = true;
                break;
            case Keys.End:
                if (modifier) {
                    const colIndex = lastCell(this.model.lastRow).colIndex;
                    if (this.meta.isVirtual) {
                        let lastRowIndex = this.meta.maxLogicalRowIndex;
                        if (this.meta.hasDetailTemplate) {
                            lastRowIndex--;
                        }
                        this.cursor.reset(lastRowIndex, colIndex);
                    }
                    else {
                        this.cursor.reset(this.model.lastRow.index, colIndex);
                    }
                }
                else {
                    const colIndex = lastCell(row).colIndex;
                    this.cursor.reset(row.index, colIndex);
                }
                preventDefault = true;
                break;
            case Keys.Enter:
            case Keys.F2:
                const groupItem = row.groupItem;
                if (groupItem) {
                    this.zone.run(() => this.groupsService.toggleRow(groupItem.index, groupItem.data));
                }
                else if (this.cursor.cell.detailExpandCell) {
                    this.zone.run(() => this.detailsService.toggleRow(row.dataRowIndex, row.dataItem));
                }
                else {
                    this.enterCell();
                    if (!this.cursor.cell.focusGroup.isNavigable()) {
                        preventDefault = true;
                    }
                }
                break;
            default:
                if (!args.ctrlKey && !args.altKey && isPrintableCharacter(args.key)) {
                    this.enterCell();
                }
        }
        if (preventDefault) {
            args.preventDefault();
        }
    }
    onContentKeydown(args) {
        if (!this.onCellKeydown(args)) {
            return;
        }
        const confirm = !args.defaultPrevented && args.keyCode === Keys.Enter && isTextInput(args.srcElement);
        if (args.keyCode === Keys.Escape || args.keyCode === Keys.F2 || confirm) {
            this.leaveCell();
            this.cursor.reset();
            args.stopPropagation();
        }
        else if (isNavigationKey(args.keyCode) && this.cursor.cell.focusGroup.isNavigable()) {
            this.onCursorKeydown(args);
            if (args.defaultPrevented) {
                this.leaveCell();
            }
        }
    }
    onCellKeydown(args) {
        if (this.editService.isEditingCell()) {
            const confirm = args.keyCode === Keys.Enter;
            const cancel = args.keyCode === Keys.Escape;
            const navigate = isNavigationKey(args.keyCode);
            if (confirm) {
                this.editService.closeCell(args);
            }
            else if (cancel) {
                this.editService.cancelCell();
                this.cd.detectChanges();
            }
            else if (navigate) {
                return false;
            }
        }
        this.cellKeydown.emit(new CellKeydownEvent(args));
        return true;
    }
    onCursorChanges(args) {
        this.activeRowIndex = args.rowIndex;
        const dataRowIndex = this.activeDataRow;
        if (this.meta && this.meta.isVirtual && this.viewport &&
            !this.viewport.containsRow(dataRowIndex) && dataRowIndex > -1) {
            this.scrollRequestService.scrollTo(dataRowIndex);
        }
    }
    onFocusOut(args) {
        if (isVisible(args.target)) {
            this.mode = 0 /* Standby */;
        }
        else {
            // Focused target is no longer visible,
            // reset to cursor mode and recapture focus.
            this.mode = 1 /* Cursor */;
        }
        this.deactivateElements();
        this.cursor.announce();
    }
    onWindowBlur() {
        this.mode = 0 /* Standby */;
        this.deactivateElements();
        this.cursor.announce();
    }
    onKeydown(args) {
        if (this.mode === 1 /* Cursor */) {
            this.onCursorKeydown(args);
        }
        else if (this.mode === 2 /* Content */) {
            this.onContentKeydown(args);
        }
    }
    onTabout() {
        // Tabbed out of the last focusable content element
        // reset to cursor mode and recapture focus.
        if (this.cursor.cell.focusGroup.isNavigable()) {
            // Unless the cell has a single focusable element,
            // otherwise we'd return to Content mode and enter an endless loop
            return;
        }
        this.leaveCell();
        this.cursor.reset();
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: NgZone },
    { type: DomEventsService },
    { type: PagerContextService },
    { type: ScrollRequestService },
    { type: GroupsService },
    { type: DetailsService },
    { type: FocusRoot },
    { type: EditService },
    { type: ChangeDetectorRef },
    { type: LocalizationService },
    { type: FocusableDirective, decorators: [{ type: Optional }] }
];
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
