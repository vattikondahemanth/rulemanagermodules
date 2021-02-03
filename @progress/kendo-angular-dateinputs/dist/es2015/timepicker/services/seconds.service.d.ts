import { IntlService } from '@progress/kendo-angular-intl';
import { ListServiceSettings } from '../models/list-service-settings';
import { ListService } from '../models/list-service.interface';
import { ListItem } from '../models/list-item.interface';
/**
 * @hidden
 */
export declare class SecondsService implements ListService {
    private intl;
    private toListItem;
    private min;
    private max;
    private step;
    private insertUndividedMax;
    constructor(intl: IntlService);
    apply(value: Date, candidate: Date): Date;
    configure(settings: ListServiceSettings): void;
    data(selectedValue?: Date): ListItem[];
    isRangeChanged(min: Date, max: Date): boolean;
    limitRange(min: Date, max: Date, value?: Date): Date[];
    total(value?: Date): number;
    selectedIndex(value: Date): number;
    valueInList(value: Date): boolean;
    private divideByStep;
    private addLast;
    private addMissing;
    private countFromMin;
    private isMissing;
    private isLastMissing;
    private lastSecond;
    private range;
}
