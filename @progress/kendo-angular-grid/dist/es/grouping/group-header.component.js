/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input } from '@angular/core';
import { GroupInfoService } from './group-info.service';
import { GroupsService } from './groups.service';
import { columnsSpan, columnsToRender } from '../columns/column-common';
/**
 * @hidden
 */
var GroupHeaderComponent = /** @class */ (function () {
    function GroupHeaderComponent(groupsService, groupInfoService) {
        this.groupsService = groupsService;
        this.groupInfoService = groupInfoService;
        this.skipGroupDecoration = false;
        this.hasDetails = false;
        this.totalColumnsCount = 0;
        this.columns = [];
        this.groups = [];
        this.isExpanded = false;
    }
    Object.defineProperty(GroupHeaderComponent.prototype, "groupItemClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    GroupHeaderComponent.prototype.ngDoCheck = function () {
        this.isExpanded = this.groupsService.isExpanded(this.item.index);
    };
    GroupHeaderComponent.prototype.ngOnChanges = function (changes) {
        if (changes.columns || changes.skipGroupDecoration) {
            this.remainingColumns = columnsToRender(this.skipGroupDecoration ? this.columns : this.columns.toArray().slice(1));
        }
    };
    GroupHeaderComponent.prototype.prefixGroupCell = function (item) {
        return new Array(item.level);
    };
    GroupHeaderComponent.prototype.toggleGroup = function (item) {
        this.groupsService.toggleRow(item.index, item.data);
        return false;
    };
    GroupHeaderComponent.prototype.groupSpan = function (item) {
        var groupCount = (this.groups || []).length;
        if (this.hasGroupHeaderColumn) {
            return groupCount + (this.skipGroupDecoration ? 0 : 1) - item.level;
        }
        var columnCount = columnsSpan(this.columns);
        if (this.skipGroupDecoration) {
            return columnCount;
        }
        if (this.hasDetails) {
            columnCount++;
        }
        return groupCount + columnCount - item.level;
    };
    GroupHeaderComponent.prototype.logicalColSpan = function () {
        return this.skipGroupDecoration ? 1 : this.totalColumnsCount;
    };
    GroupHeaderComponent.prototype.ariaRole = function () {
        if (this.skipGroupDecoration) {
            return 'presentation';
        }
        return 'gridcell';
    };
    GroupHeaderComponent.prototype.formatForGroup = function (item) {
        return this.groupInfoService.formatForGroup(item);
    };
    GroupHeaderComponent.prototype.groupTitle = function (item) {
        return this.groupInfoService.groupTitle(item);
    };
    GroupHeaderComponent.prototype.groupHeaderTemplate = function (item) {
        return this.groupInfoService.groupHeaderTemplate(item);
    };
    GroupHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridGroupHeader]',
                    template: "\n        <ng-template [ngIf]=\"!skipGroupDecoration\">\n            <td class=\"k-group-cell\"\n                role=\"presentation\"\n                *ngFor=\"let g of prefixGroupCell(item)\"></td>\n        </ng-template>\n        <td [attr.colspan]=\"groupSpan(item)\" *ngIf=\"!(skipGroupDecoration && hasGroupHeaderColumn)\"\n            [attr.role]=\"ariaRole()\"\n            aria-selected=\"false\"\n            [attr.aria-expanded]=\"isExpanded\"\n            kendoGridLogicalCell\n            [logicalRowIndex]=\"logicalRowIndex\"\n            [logicalColIndex]=\"0\"\n            [logicalSlaveCell]=\"skipGroupDecoration\"\n            [groupItem]=\"item\"\n            [colSpan]=\"logicalColSpan()\">\n            <p class=\"k-reset\">\n                <ng-template [ngIf]=\"!skipGroupDecoration\">\n                    <a href=\"#\" tabindex=\"-1\" (click)=\"toggleGroup(item)\"\n                        class=\"k-icon\"\n                        [ngClass]=\"{ 'k-i-collapse': isExpanded, 'k-i-expand': !isExpanded }\" role=\"presentation\">\n                    </a>\n                    <ng-template [ngIf]=\"!groupHeaderTemplate(item)\">\n                    {{groupTitle(item)}}: {{item.data | valueOf:\"value\": formatForGroup(item)}}\n                    </ng-template>\n                    <ng-template\n                        [templateContext]=\"{\n                            templateRef: groupHeaderTemplate(item),\n                            group: item.data,\n                            aggregates: item.data?.aggregates,\n                            value: item.data?.value,\n                            field: item.data?.field,\n                            index: item.index,\n                            expanded: isExpanded,\n                            $implicit: item.data\n                            }\">\n                    </ng-template>\n                </ng-template>\n            </p>\n        </td>\n        <ng-container *ngIf=\"hasGroupHeaderColumn\">\n            <td *ngFor=\"let column of remainingColumns; let index = index\"\n                role=\"gridcell\"\n                aria-selected=\"false\"\n                kendoGridLogicalCell\n                [logicalRowIndex]=\"logicalRowIndex\"\n                [logicalColIndex]=\"index + 1\"\n                [logicalSlaveCell]=\"false\"\n                [groupItem]=\"item\"\n                [colSpan]=\"1\"\n            >\n                <ng-container *ngIf=\"column.groupHeaderColumnTemplateRef\" [ngTemplateOutlet]=\"column.groupHeaderColumnTemplateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        group: item.data,\n                        aggregates: item.data?.aggregates,\n                        value: item.data?.value,\n                        field: item.data?.field,\n                        index: item.index,\n                        $implicit: item.data\n                        }\">\n                </ng-container>\n            </td>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    GroupHeaderComponent.ctorParameters = function () { return [
        { type: GroupsService },
        { type: GroupInfoService }
    ]; };
    GroupHeaderComponent.propDecorators = {
        rowIndex: [{ type: Input }],
        logicalRowIndex: [{ type: Input }],
        item: [{ type: Input }],
        skipGroupDecoration: [{ type: Input }],
        hasDetails: [{ type: Input }],
        totalColumnsCount: [{ type: Input }],
        hasGroupHeaderColumn: [{ type: Input }],
        columns: [{ type: Input }],
        groups: [{ type: Input }],
        groupItemClass: [{ type: HostBinding, args: ['class.k-grouping-row',] }]
    };
    return GroupHeaderComponent;
}());
export { GroupHeaderComponent };