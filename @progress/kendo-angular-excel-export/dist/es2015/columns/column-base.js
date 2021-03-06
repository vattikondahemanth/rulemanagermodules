import { Input, ContentChildren, QueryList } from '@angular/core';
/**
 * @hidden
 */
export class ColumnBase {
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
