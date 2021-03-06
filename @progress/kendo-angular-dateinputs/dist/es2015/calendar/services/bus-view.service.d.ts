import { EventEmitter, Injector } from '@angular/core';
import { ViewService } from '../models/view-service.interface';
import { CalendarViewEnum } from '../models/view.enum';
/**
 * @hidden
 */
export declare class BusViewService {
    private injector;
    viewChanged: EventEmitter<any>;
    private bottom;
    private top;
    constructor(injector: Injector);
    configure(bottom: CalendarViewEnum, top: CalendarViewEnum): void;
    service(view: CalendarViewEnum): ViewService;
    moveDown(view: CalendarViewEnum): void;
    moveUp(view: CalendarViewEnum): void;
    moveToBottom(activeView: CalendarViewEnum): void;
    canMoveDown(view: CalendarViewEnum): boolean;
    canMoveUp(view: CalendarViewEnum): boolean;
    private clamp;
    private move;
}
