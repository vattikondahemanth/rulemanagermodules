import { EventEmitter, ElementRef, Renderer2, NgZone, Injector, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { DateFormatPart } from '@progress/kendo-angular-intl';
import { VirtualizationComponent } from '../virtualization/virtualization.component';
import { ListItem } from './models/list-item.interface';
import { ListService } from './models/list-service.interface';
import { DOMService } from './services/dom.service';
/**
 * @hidden
 */
export declare class TimeListComponent implements OnChanges, OnInit, OnDestroy {
    private element;
    private injector;
    private dom;
    private renderer;
    private zone;
    min: Date;
    max: Date;
    part: DateFormatPart;
    step: number;
    disabled: boolean;
    value: Date;
    valueChange: EventEmitter<Date>;
    virtualization: VirtualizationComponent;
    readonly tabIndex: number;
    componentClass: boolean;
    animateToIndex: boolean;
    isActive: boolean;
    skip: number;
    total: number;
    service: ListService;
    itemHeight: number;
    listHeight: number;
    topOffset: number;
    bottomOffset: number;
    bottomThreshold: number;
    topThreshold: number;
    style: any;
    data: ListItem[];
    private indexToScroll;
    private scrollSubscription;
    private domEvents;
    constructor(element: ElementRef, injector: Injector, dom: DOMService, renderer: Renderer2, zone: NgZone);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    handleChange(dataItem: ListItem): void;
    handleItemClick(args: any): void;
    /**
     * Focuses the host element of the TimeList.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timelist.focus()">Focus TimeList</button>
     *  <kendo-timelist #timelist></kendo-timelist>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    focus(): void;
    /**
     * Blurs the TimeList component.
     */
    blur(): void;
    private itemOffset;
    private hasMissingValue;
    private scrollOnce;
    private serviceSettings;
    private selectedIndex;
    private textHasChanged;
    private handleKeyDown;
    private bindEvents;
}
