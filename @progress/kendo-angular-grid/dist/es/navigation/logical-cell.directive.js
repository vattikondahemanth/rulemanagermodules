/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, Inject, Input, NgZone, Optional, Renderer2 } from '@angular/core';
import { FocusGroup } from './focus-group';
import { FocusRoot } from './focus-root';
import { NavigationService } from './navigation.service';
import { ColumnInfoService } from '../common/column-info.service';
import { IdService } from '../common/id.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
var id = 0;
function nextId() {
    return id++;
}
/**
 * @hidden
 */
var LogicalCellDirective = /** @class */ (function () {
    function LogicalCellDirective(focusGroup, element, columnInfoService, idService, navigationService, renderer, zone, cellContext) {
        this.focusGroup = focusGroup;
        this.element = element;
        this.columnInfoService = columnInfoService;
        this.idService = idService;
        this.navigationService = navigationService;
        this.renderer = renderer;
        this.zone = zone;
        this.cellContext = cellContext;
        this.logicalSlaveCell = false;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.dataRowIndex = -1;
        this.detailExpandCell = false;
        this.uid = nextId();
    }
    Object.defineProperty(LogicalCellDirective.prototype, "id", {
        get: function () {
            if (!this.logicalSlaveCell && this.columnInfoService.isLocked) {
                return this.idService.cellId(this.logicalRowIndex, this.logicalColIndex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogicalCellDirective.prototype, "ariaColIndex", {
        get: function () {
            if (this.logicalSlaveCell) {
                return undefined;
            }
            return this.logicalColIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    LogicalCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.navigationService.enabled) {
            return;
        }
        this.navigationChange = this.navigationService.changes.subscribe(function (e) { return _this.onNavigationChange(e); });
    };
    LogicalCellDirective.prototype.ngDoCheck = function () {
        if (!this.navigationService.enabled) {
            return;
        }
        if (this.cellContext) {
            this.cellContext.focusGroup = this.focusGroup;
        }
        this.registerNoChanges();
    };
    LogicalCellDirective.prototype.ngOnChanges = function (changes) {
        if (!this.navigationService.enabled) {
            return;
        }
        var keys = Object.keys(changes);
        if (keys.length === 1 && keys[0] === 'groupItem') {
            // Ignore groupItem changes as the reference is not stable
            return;
        }
        this.navigationService.unregisterCell(this);
        this.registerChanges();
        this.updateElement();
    };
    LogicalCellDirective.prototype.ngOnDestroy = function () {
        if (this.navigationChange) {
            this.navigationChange.unsubscribe();
        }
        this.navigationService.unregisterCell(this);
    };
    LogicalCellDirective.prototype.onNavigationChange = function (e) {
        var active = this.logicalColIndex === e.colIndex && this.logicalRowIndex === e.rowIndex;
        var wasActive = this.logicalColIndex === e.prevColIndex && this.logicalRowIndex === e.prevRowIndex;
        if (active || wasActive) {
            this.updateElement();
        }
    };
    LogicalCellDirective.prototype.updateElement = function () {
        var _this = this;
        var el = this.element.nativeElement;
        this.renderer.setAttribute(el, 'tabIndex', this.isFocusable() ? '0' : '-1');
        if (this.isFocused()) {
            if (this.focusGroup.isNavigable()) {
                this.focusGroup.focus();
            }
            else {
                this.microtask(function () {
                    return _this.isFocused() && el.focus();
                });
                this.renderer.addClass(el, 'k-state-focused');
            }
        }
        else {
            this.renderer.removeClass(el, 'k-state-focused');
        }
    };
    LogicalCellDirective.prototype.microtask = function (callback) {
        this.zone.runOutsideAngular(function () {
            return Promise.resolve(null).then(callback);
        });
    };
    LogicalCellDirective.prototype.registerChanges = function () {
        if (!this.logicalSlaveCell) {
            this.navigationService.registerCell(this);
        }
    };
    LogicalCellDirective.prototype.registerNoChanges = function () {
        if (!this.logicalSlaveCell) {
            this.navigationService.registerCellOnCurrentRow(this);
        }
    };
    LogicalCellDirective.prototype.isFocusable = function () {
        return this.navigationService.isCellFocusable(this);
    };
    LogicalCellDirective.prototype.isFocused = function () {
        return this.navigationService.isCellFocused(this);
    };
    LogicalCellDirective.decorators = [
        { type: Directive, args: [{
                    providers: [{
                            provide: FocusGroup,
                            deps: [FocusRoot],
                            useClass: FocusGroup
                        }],
                    selector: '[kendoGridLogicalCell]'
                },] },
    ];
    /** @nocollapse */
    LogicalCellDirective.ctorParameters = function () { return [
        { type: FocusGroup },
        { type: ElementRef },
        { type: ColumnInfoService },
        { type: IdService },
        { type: NavigationService },
        { type: Renderer2 },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }] }
    ]; };
    LogicalCellDirective.propDecorators = {
        logicalColIndex: [{ type: Input }],
        logicalRowIndex: [{ type: Input }],
        logicalSlaveCell: [{ type: Input }],
        colIndex: [{ type: Input }],
        colSpan: [{ type: Input }],
        rowSpan: [{ type: Input }],
        groupItem: [{ type: Input }],
        dataRowIndex: [{ type: Input }],
        dataItem: [{ type: Input }],
        detailExpandCell: [{ type: Input }],
        id: [{ type: HostBinding, args: ['attr.id',] }],
        ariaColIndex: [{ type: HostBinding, args: ['attr.aria-colindex',] }]
    };
    return LogicalCellDirective;
}());
export { LogicalCellDirective };
