import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Injectable, InjectionToken, Input, LOCALE_ID, NgModule, NgZone, Optional, Output, Renderer2, SimpleChange, TemplateRef, ViewChild, ViewChildren, isDevMode } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { auditTime, tap } from 'rxjs/operators';
import { Chart, DateCategoryAxis, DateValueAxis, DomEventsBuilder, InstanceObserver, Sparkline, StockChart, chartBaseTheme } from '@progress/kendo-charts';
import { ResizeSensorModule, isDocumentAvailable } from '@progress/kendo-angular-common';
import { POPUP_CONTAINER, PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { IntlService } from '@progress/kendo-angular-intl';
import { exportImage, exportSVG } from '@progress/kendo-drawing';
import { CommonModule } from '@angular/common';

/**
 * @hidden
 */
class ChartComponentGenerated {
    constructor(configurationService) {
        this.configurationService = configurationService;
        /**
         * Fires when the user clicks an axis label ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.axisLabelClick = new EventEmitter();
        /**
         * Fires as long as the user is dragging the Chart with the mouse or through swipe gestures.
         */
        this.drag = new EventEmitter();
        /**
         * Fires when the user stops dragging the Chart.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires when the user starts dragging the Chart.
         */
        this.dragStart = new EventEmitter();
        /**
         * Fires when the user hovers over a legend item ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.legendItemHover = new EventEmitter();
        /**
         * Fires when the cursor leaves a legend item.
         */
        this.legendItemLeave = new EventEmitter();
        /**
         * Fires when the user clicks a note.
         */
        this.noteClick = new EventEmitter();
        /**
         * Fires when the user hovers over a note.
         */
        this.noteHover = new EventEmitter();
        /**
         * Fires when the cursor leaves a note.
         */
        this.noteLeave = new EventEmitter();
        /**
         * Fires when a pane is rendered because the Chart:
         * * Is rendered.
         * * Performs panning or zooming.
         * * Is exported with different options.
         * The event is used to render custom visuals in the panes.
         */
        this.paneRender = new EventEmitter();
        /**
         * Fires when the user clicks the plot area ([see example]({% slug overview_chart_charts %}#toc-events)).
         * The `click` event is triggered by the `tap` and `contextmenu` events.
         * To distinguish between the original events, inspect the `e.originalEvent.type` field.
         */
        this.plotAreaClick = new EventEmitter();
        /**
         * Fires when the user hovers the plot area ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.plotAreaHover = new EventEmitter();
        /**
         * Fires when the cursor leaves the plot area.
         */
        this.plotAreaLeave = new EventEmitter();
        /**
         * Fires when the Chart is ready to render on screen ([see example]({% slug overview_chart_charts %}#toc-events)).
         * For example, you can use it to remove loading indicators.
         * Any changes made to the options are ignored.
         */
        this.render = new EventEmitter();
        /**
         * Fires when the user modifies the selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.select = new EventEmitter();
        /**
         * Fires when the user completes the modification of the selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.selectEnd = new EventEmitter();
        /**
         * Fires when the user starts modifying the axis selection.
         *
         * The range units are:
         * - Generic axis&mdash;Category index (0-based).
         * - Date axis&mdash;Date instance.
         */
        this.selectStart = new EventEmitter();
        /**
         * Fires when the user clicks the Chart series.
         *
         * The `click` event will be triggered by the `tap` and `contextmenu` events ([see example]({% slug overview_chart_charts %}#toc-events)).
         * To distinguish between the original events, inspect the `e.originalEvent.type` field.
         */
        this.seriesClick = new EventEmitter();
        /**
         * Fires when the user hovers the Chart series ([see example]({% slug overview_chart_charts %}#toc-events)).
         */
        this.seriesHover = new EventEmitter();
        /**
         * Fires when the cursor enters a series.
         */
        this.seriesOver = new EventEmitter();
        /**
         * Fires when the cursor leaves a series.
         */
        this.seriesLeave = new EventEmitter();
        /**
         * Fires as long as the user is zooming the Chart by using the mousewheel operation.
         */
        this.zoom = new EventEmitter();
        /**
         * Fires when the user stops zooming the Chart.
         */
        this.zoomEnd = new EventEmitter();
        /**
         * Fires when the user uses the mousewheel to zoom the Chart.
         */
        this.zoomStart = new EventEmitter();
    }
}
ChartComponentGenerated.propDecorators = {
    pannable: [{ type: Input }],
    renderAs: [{ type: Input }],
    seriesColors: [{ type: Input }],
    title: [{ type: Input }],
    transitions: [{ type: Input }],
    zoomable: [{ type: Input }],
    axisDefaults: [{ type: Input }],
    categoryAxis: [{ type: Input }],
    chartArea: [{ type: Input }],
    legend: [{ type: Input }],
    panes: [{ type: Input }],
    plotArea: [{ type: Input }],
    series: [{ type: Input }],
    seriesDefaults: [{ type: Input }],
    tooltip: [{ type: Input }],
    valueAxis: [{ type: Input }],
    xAxis: [{ type: Input }],
    yAxis: [{ type: Input }],
    axisLabelClick: [{ type: Output }],
    drag: [{ type: Output }],
    dragEnd: [{ type: Output }],
    dragStart: [{ type: Output }],
    legendItemHover: [{ type: Output }],
    legendItemLeave: [{ type: Output }],
    noteClick: [{ type: Output }],
    noteHover: [{ type: Output }],
    noteLeave: [{ type: Output }],
    paneRender: [{ type: Output }],
    plotAreaClick: [{ type: Output }],
    plotAreaHover: [{ type: Output }],
    plotAreaLeave: [{ type: Output }],
    render: [{ type: Output }],
    select: [{ type: Output }],
    selectEnd: [{ type: Output }],
    selectStart: [{ type: Output }],
    seriesClick: [{ type: Output }],
    seriesHover: [{ type: Output }],
    seriesOver: [{ type: Output }],
    seriesLeave: [{ type: Output }],
    zoom: [{ type: Output }],
    zoomEnd: [{ type: Output }],
    zoomStart: [{ type: Output }]
};

/**
 * @hidden
 */
const THROTTLE_MS = 1000 / 60;
/**
 * @hidden
 */
class Change {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
/**
 * @hidden
 */
class ConfigurationService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.store = {};
        this.source = new BehaviorSubject({});
        this.initSource();
    }
    initSource() {
        this.onFastChange$ = this.source.asObservable();
        this.onChange$ = this.onFastChange$.pipe(auditTime(THROTTLE_MS));
    }
    push(store) {
        this.store = store;
        this.next();
    }
    notify(change) {
        this.set(change.key, change.value);
        this.next();
    }
    set(field, value) {
        let store = this.store;
        const parts = field.split('.');
        let key = parts.shift();
        while (parts.length > 0) {
            store = store[key] = store[key] || {};
            key = parts.shift();
        }
        store[key] = value;
    }
    next() {
        this.ngZone.runOutsideAngular(() => {
            this.source.next(this.store);
        });
    }
}
ConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConfigurationService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @hidden
 */
class BaseEvent {
    /**
     * @hidden
     */
    constructor(sender) {
        this.sender = sender;
    }
}

/**
 * @hidden
 */
class PreventableEvent extends BaseEvent {
    constructor() {
        super(...arguments);
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * @hidden
 */
class LegendEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.series = e.series;
        this.seriesIndex = e.seriesIndex;
        this.pointIndex = e.pointIndex;
        this.text = e.text;
    }
}

/**
 * Arguments for the `legendItemClick` event.
 */
class LegendItemClickEvent extends LegendEvent {
    /**
     * If called, the series visibility is not toggled as a result of clicking the legend item.
     */
    preventDefault() {
        super.preventDefault();
    }
}

/**
 * Arguments for the `axisLabelClick` event.
 */
class AxisLabelClickEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axis = e.axis;
        this.dataItem = e.dataItem;
        this.index = e.index;
        this.text = e.text;
        this.value = e.value;
    }
}

/**
 * Arguments for the `drag` event.
 */
class DragEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axisRanges = e.axisRanges;
        this.originalEvent = e.originalEvent;
    }
}

/**
 * Arguments for the `dragEnd` event.
 */
class DragEndEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axisRanges = e.axisRanges;
        this.originalEvent = e.originalEvent;
    }
}

/**
 * Arguments for the `dragStart` event.
 */
class DragStartEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axisRanges = e.axisRanges;
        this.originalEvent = e.originalEvent;
    }
}

/**
 * Arguments for the `legendItemHover` event.
 */
class LegendItemHoverEvent extends LegendEvent {
    /**
     * If called, the series highlight is not shown as a result of hovering over the legend item.
     */
    preventDefault() {
        super.preventDefault();
    }
}

/* tslint:disable:no-empty */
/**
 * Arguments for the `legendItemLeave` event.
 */
class LegendItemLeaveEvent extends LegendEvent {
    /**
     * @hidden
     */
    preventDefault() {
    }
    /**
     * @hidden
     */
    isDefaultPrevented() {
        return false;
    }
}

/**
 * @hidden
 */
class NoteEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.category = e.category;
        this.dataItem = e.dataItem;
        this.series = e.series;
        this.value = e.value;
        this.visual = e.visual;
    }
}

/**
 * Arguments for the `noteClick` event.
 */
class NoteClickEvent extends NoteEvent {
}

/**
 * Arguments for the `noteHover` event.
 */
class NoteHoverEvent extends NoteEvent {
}

/**
 * Arguments for the `noteLeave` event.
 */
class NoteLeaveEvent extends NoteEvent {
}

/**
 * Arguments for the `paneRender` event.
 */
class PaneRenderEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(args, sender) {
        super(sender);
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `plotAreaClick` event.
 */
class PlotAreaClickEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.category = e.category;
        this.originalEvent = e.originalEvent;
        this.value = e.value;
        this.x = e.x;
        this.y = e.y;
    }
}

/**
 * Arguments for the `plotAreaHover` event.
 */
class PlotAreaHoverEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.category = e.category;
        this.originalEvent = e.originalEvent;
        this.value = e.value;
        this.x = e.x;
        this.y = e.y;
    }
}

class PlotAreaLeaveEvent extends BaseEvent {
}

/**
 * Arguments for the `render` event.
 */
class RenderEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(_e, sender) {
        super(sender);
    }
}

/**
 * Arguments for the `select` event.
 */
class SelectEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axis = e.axis;
        this.from = e.from;
        this.to = e.to;
    }
}

/**
 * Arguments for the `selectEnd` event.
 */
class SelectEndEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axis = e.axis;
        this.from = e.from;
        this.to = e.to;
    }
}

/**
 * Arguments for the `selectStart` event.
 */
class SelectStartEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axis = e.axis;
        this.from = e.from;
        this.to = e.to;
    }
}

/**
 * Arguments for the `seriesClick` event.
 */
class SeriesClickEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.category = e.category;
        this.dataItem = e.dataItem;
        this.originalEvent = e.originalEvent;
        this.percentage = e.percentage;
        this.point = e.point;
        this.series = e.series;
        this.stackValue = e.stackValue;
        this.value = e.value;
    }
}

/**
 * @hidden
 */
class SeriesEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.category = e.category;
        this.dataItem = e.dataItem;
        this.originalEvent = e.originalEvent;
        this.percentage = e.percentage;
        this.point = e.point;
        this.series = e.series;
        this.stackValue = e.stackValue;
        this.value = e.value;
    }
}

/**
 * Arguments for the `seriesHover` event.
 */
class SeriesHoverEvent extends SeriesEvent {
}

/**
 * Arguments for the `seriesOver` event.
 */
class SeriesOverEvent extends SeriesEvent {
}

/**
 * Arguments for the `seriesLeave` event.
 */
class SeriesLeaveEvent extends SeriesEvent {
}

/**
 * Arguments for the `zoom` event.
 */
class ZoomEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axisRanges = e.axisRanges;
        this.delta = e.delta;
        this.originalEvent = e.originalEvent;
    }
}

/**
 * Arguments for the `zoomEnd` event.
 */
class ZoomEndEvent extends BaseEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axisRanges = e.axisRanges;
        this.originalEvent = e.originalEvent;
    }
}

/**
 * Arguments for the `zoomStart` event.
 */
class ZoomStartEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(e, sender) {
        super(sender);
        this.axisRanges = e.axisRanges;
        this.originalEvent = e.originalEvent;
    }
}

const EVENT_MAP = {
    axisLabelClick: AxisLabelClickEvent,
    drag: DragEvent,
    dragEnd: DragEndEvent,
    dragStart: DragStartEvent,
    legendItemHover: LegendItemHoverEvent,
    legendItemLeave: LegendItemLeaveEvent,
    noteClick: NoteClickEvent,
    noteHover: NoteHoverEvent,
    noteLeave: NoteLeaveEvent,
    paneRender: PaneRenderEvent,
    plotAreaClick: PlotAreaClickEvent,
    plotAreaHover: PlotAreaHoverEvent,
    plotAreaLeave: PlotAreaLeaveEvent,
    render: RenderEvent,
    select: SelectEvent,
    selectEnd: SelectEndEvent,
    selectStart: SelectStartEvent,
    seriesClick: SeriesClickEvent,
    seriesHover: SeriesHoverEvent,
    seriesOver: SeriesOverEvent,
    seriesLeave: SeriesLeaveEvent,
    zoom: ZoomEvent,
    zoomEnd: ZoomEndEvent,
    zoomStart: ZoomStartEvent
};
/**
 * @hidden
 */
class InstanceEventService {
    create(name, args, sender) {
        if (EVENT_MAP[name]) {
            return new EVENT_MAP[name](args, sender);
        }
    }
}

/**
 * A directive which selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-chart>` component for the
 * [Donut center template]({% slug donut_seriestypes_charts %}).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart style="height: 450px;">
 *       <ng-template kendoChartDonutCenterTemplate>
 *         <h3>22.5%</h3>
 *         of which renewables
 *       </ng-template>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item
 *             type="donut" [data]="data"
 *             categoryField="kind" field="share">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *       <kendo-chart-legend [visible]="false"></kendo-chart-legend>
 *     </kendo-chart>
 *   `
 * })
 * export class AppComponent {
 *   public data: any[] = [{
 *     kind: 'Hydroelectric', share: 0.175
 *   }, {
 *     kind: 'Nuclear', share: 0.238
 *   }, {
 *     kind: 'Coal', share: 0.118
 *   }, {
 *     kind: 'Solar', share: 0.052
 *   }, {
 *     kind: 'Wind', share: 0.225
 *   }, {
 *     kind: 'Other', share: 0.192
 *   }];
 * }
 *
 * ```
 */
class DonutCenterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
DonutCenterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChartDonutCenterTemplate]'
            },] },
];
/** @nocollapse */
DonutCenterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class ItemChange {
    constructor(sender, options) {
        this.sender = sender;
        this.options = options;
    }
}
/**
 * @hidden
 */
class CollectionService {
    constructor() {
        this.source = new Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    notify(change) {
        this.source.next(change);
    }
}
CollectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CollectionService.ctorParameters = () => [];

/**
 * @hidden
 */
function copyChanges(changes, options) {
    for (const propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        const value = changes[propertyName].currentValue;
        if (value === undefined) {
            delete options[propertyName];
        }
        else {
            options[propertyName] = value;
        }
    }
}

/**
 * @hidden
 */
function toSimpleChanges(changes) {
    const result = {};
    for (const propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        result[propertyName] = new SimpleChange(null, changes[propertyName], false);
    }
    return result;
}

/**
 * @hidden
 */
class CollectionItemComponent {
    constructor(configurationService, collectionService) {
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.options = {};
        this.subscription = configurationService.onFastChange$.subscribe(store => {
            this.options = store;
            this.notify();
        });
    }
    ngOnChanges(changes) {
        const store = this.configurationService.store;
        copyChanges(changes, store);
        this.configurationService.push(store);
    }
    /**
     * Updates the component fields with the specified values and refreshes the Chart.
     *
     * Use this method when the configuration values cannot be set through the template.
     *
     * @example
     * ```ts-no-run
     * item.notifyChanges({ visible: true });
     * ```
     *
     * @param changes An object containing the updated input fields.
     */
    notifyChanges(changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    notify() {
        if (!this.collectionService) {
            return;
        }
        this.collectionService.notify(new ItemChange(this, this.options));
    }
}

/**
 * @hidden
 */
class SeriesItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
SeriesItemComponentGenerated.propDecorators = {
    aggregate: [{ type: Input }],
    autoFit: [{ type: Input }],
    axis: [{ type: Input }],
    border: [{ type: Input }],
    categoryAxis: [{ type: Input }],
    categoryField: [{ type: Input }],
    closeField: [{ type: Input }],
    color: [{ type: Input }],
    colorField: [{ type: Input }],
    connectors: [{ type: Input }],
    currentField: [{ type: Input }],
    dashType: [{ type: Input }],
    data: [{ type: Input }],
    downColor: [{ type: Input }],
    downColorField: [{ type: Input }],
    dynamicHeight: [{ type: Input }],
    dynamicSlope: [{ type: Input }],
    errorHighField: [{ type: Input }],
    errorLowField: [{ type: Input }],
    explodeField: [{ type: Input }],
    field: [{ type: Input }],
    fromField: [{ type: Input }],
    gap: [{ type: Input }],
    highField: [{ type: Input }],
    holeSize: [{ type: Input }],
    line: [{ type: Input }],
    lowField: [{ type: Input }],
    lowerField: [{ type: Input }],
    margin: [{ type: Input }],
    maxSize: [{ type: Input }],
    meanField: [{ type: Input }],
    medianField: [{ type: Input }],
    minSize: [{ type: Input }],
    missingValues: [{ type: Input }],
    name: [{ type: Input }],
    neckRatio: [{ type: Input }],
    negativeColor: [{ type: Input }],
    negativeValues: [{ type: Input }],
    noteTextField: [{ type: Input }],
    opacity: [{ type: Input }],
    openField: [{ type: Input }],
    outliersField: [{ type: Input }],
    overlay: [{ type: Input }],
    padding: [{ type: Input }],
    q1Field: [{ type: Input }],
    q3Field: [{ type: Input }],
    segmentSpacing: [{ type: Input }],
    size: [{ type: Input }],
    sizeField: [{ type: Input }],
    spacing: [{ type: Input }],
    stack: [{ type: Input }],
    startAngle: [{ type: Input }],
    style: [{ type: Input }],
    summaryField: [{ type: Input }],
    target: [{ type: Input }],
    toField: [{ type: Input }],
    type: [{ type: Input }],
    upperField: [{ type: Input }],
    visible: [{ type: Input }],
    visibleInLegend: [{ type: Input }],
    visibleInLegendField: [{ type: Input }],
    visual: [{ type: Input }],
    width: [{ type: Input }],
    whiskers: [{ type: Input }],
    xAxis: [{ type: Input }],
    xErrorHighField: [{ type: Input }],
    xErrorLowField: [{ type: Input }],
    xField: [{ type: Input }],
    yAxis: [{ type: Input }],
    yErrorHighField: [{ type: Input }],
    yErrorLowField: [{ type: Input }],
    yField: [{ type: Input }],
    zIndex: [{ type: Input }],
    errorBars: [{ type: Input }],
    extremes: [{ type: Input }],
    highlight: [{ type: Input }],
    labels: [{ type: Input }],
    markers: [{ type: Input }],
    notes: [{ type: Input }],
    outliers: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * @hidden
 */
class SettingsComponent {
    constructor(configKey, configurationService) {
        this.configKey = configKey;
        this.configurationService = configurationService;
        this.store = {};
        if (configKey === undefined) {
            throw new Error('Configuration key not set');
        }
    }
    ngOnDestroy() {
        this.store = undefined;
        this.notify();
    }
    ngOnChanges(changes) {
        copyChanges(changes, this.store);
        this.notify();
    }
    /**
     * Updates the component fields with the specified values and refreshes the Chart.
     *
     * Use this method when the configuration values cannot be set through the template.
     *
     * @example
     * ```ts-no-run
     * item.notifyChanges({ visible: true });
     * ```
     *
     * @param changes An object containing the updated input fields.
     */
    notifyChanges(changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    }
    markAsVisible() {
        this.store.visible = true;
        this.notify();
    }
    notify() {
        this.configurationService.notify(new Change(this.configKey, this.store));
    }
}

/**
 * @hidden
 */
class SeriesTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
class SeriesTooltipComponent extends SeriesTooltipComponentGenerated {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
    get seriesTooltipTemplateRef() {
        return this.seriesTooltipTemplate;
    }
}
SeriesTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
SeriesTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
SeriesTooltipComponent.propDecorators = {
    seriesTooltipTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};

const toggle = (flag) => flag === undefined ? false : !flag;
/**
 * The configuration component for a series item.
 */
class SeriesItemComponent extends SeriesItemComponentGenerated {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
    /**
     * Toggles the series visibility and updates the parent Chart
     * without animated transitions.
     */
    toggleVisibility() {
        this.options.visible = toggle(this.options.visible);
        this.notify();
    }
    /**
     * Toggles the visibility of a point with the given index.
     * Applicable for the Pie, Donut, and Funnel series.
     *
     * @param pointIndex - The zero-based index of the point to toggle.
     */
    togglePointVisibility(pointIndex) {
        const pv = this.options.pointVisibility = this.options.pointVisibility || {};
        pv[pointIndex] = toggle(pv[pointIndex]);
        this.notify();
    }
    get seriesTooltipTemplateRef() {
        if (this.seriesTooltip) {
            return this.seriesTooltip.seriesTooltipTemplateRef;
        }
    }
}
SeriesItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-series-item',
                template: ''
            },] },
];
/** @nocollapse */
SeriesItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];
SeriesItemComponent.propDecorators = {
    seriesTooltip: [{ type: ContentChild, args: [SeriesTooltipComponent,] }]
};

/** @hidden */
const chartDefaultTheme = () => Object.assign({}, chartBaseTheme(), {
    axisDefaults: {
        crosshair: {
            color: 'rgba(0, 0, 0, 0.5)'
        },
        labels: {
            color: 'rgb(101, 101, 101)',
            font: '12px serif'
        },
        line: {
            color: 'rgba(0, 0, 0, 0.08)'
        },
        majorGridLines: {
            color: 'rgba(0, 0, 0, 0.08)'
        },
        minorGridLines: {
            color: 'rgba(0, 0, 0, 0.04)'
        },
        notes: {
            icon: {
                background: 'rgba(0, 0, 0, 0.5)',
                border: {
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            },
            line: {
                color: 'rgba(0, 0, 0, 0.5)'
            },
            label: {
                font: '14px serif'
            }
        },
        title: {
            color: 'rgb(101, 101, 101)',
            font: '14px serif'
        }
    },
    chartArea: {
        background: 'rgb(255, 255, 255)'
    },
    legend: {
        inactiveItems: {
            labels: {
                color: 'rgba(102, 102, 102, 0.5)'
            },
            markers: {
                color: 'rgba(102, 102, 102, 0.5)'
            }
        },
        labels: {
            color: 'rgb(101, 101, 101)',
            font: '14px serif'
        }
    },
    seriesDefaults: {
        boxPlot: {
            downColor: 'rgba(0, 0, 0, 0.08)',
            mean: {
                color: 'rgb(246, 246, 246)'
            },
            median: {
                color: 'rgb(246, 246, 246)'
            },
            whiskers: {
                color: 'rgb(255, 99, 88)'
            }
        },
        bullet: {
            target: {
                color: 'rgb(101, 101, 101)'
            }
        },
        candlestick: {
            downColor: 'rgb(101, 101, 101)',
            line: {
                color: 'rgb(101, 101, 101)'
            }
        },
        errorBars: {
            color: 'rgba(0, 0, 0, 0.5)'
        },
        horizontalWaterfall: {
            line: {
                color: 'rgba(0, 0, 0, 0.08)'
            }
        },
        icon: {
            border: {
                color: 'rgba(0, 0, 0, 0.08)'
            }
        },
        labels: {
            background: 'rgb(255, 255, 255)',
            color: 'rgb(101, 101, 101)',
            opacity: 0.8,
            font: '12px serif'
        },
        notes: {
            icon: {
                background: 'rgba(0, 0, 0, 0.5)',
                border: {
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            },
            line: {
                color: 'rgba(0, 0, 0, 0.5)'
            },
            label: {
                font: '14px serif'
            }
        },
        verticalBoxPlot: {
            downColor: 'rgba(0, 0, 0, 0.08)',
            mean: {
                color: 'rgb(246, 246, 246)'
            },
            median: {
                color: 'rgb(246, 246, 246)'
            },
            whiskers: {
                color: 'rgb(255, 99, 88)'
            }
        },
        verticalBullet: {
            target: {
                color: 'rgb(101, 101, 101)'
            }
        },
        waterfall: {
            line: {
                color: 'rgba(0, 0, 0, 0.08)'
            }
        },
        area: {
            opacity: 0.8
        }
    },
    title: {
        color: 'rgb(101, 101, 101)',
        font: '16px serif'
    },
    seriesColors: [
        'rgb(255, 99, 88)',
        'rgb(255, 210, 70)',
        'rgb(120, 210, 55)',
        'rgb(40, 180, 200)',
        'rgb(45, 115, 245)',
        'rgb(170, 70, 190)'
    ]
});

const font = (style) => `${style.fontSize} ${style.fontFamily}`;
const letterPos = (letter) => letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
const seriesPos = (name) => letterPos(name.match(/series-([a-z])$/)[1]);
const template = `
    <div class="k-var--accent"></div>
    <div class="k-var--accent-contrast"></div>
    <div class="k-var--base"></div>
    <div class="k-var--background"></div>

    <div class="k-var--normal-background"></div>
    <div class="k-var--normal-text-color"></div>
    <div class="k-var--hover-background"></div>
    <div class="k-var--hover-text-color"></div>
    <div class="k-var--selected-background"></div>
    <div class="k-var--selected-text-color"></div>
    <div class="k-var--chart-error-bars-background"></div>
    <div class="k-var--chart-notes-background"></div>
    <div class="k-var--chart-notes-border"></div>
    <div class="k-var--chart-notes-lines"></div>
    <div class="k-var--chart-crosshair-background"></div>

    <div class="k-var--chart-inactive"></div>
    <div class="k-var--chart-major-lines"></div>
    <div class="k-var--chart-minor-lines"></div>
    <div class="k-var--chart-area-opacity"></div>

    <div class="k-widget">
        <div class="k-var--chart-font"></div>
        <div class="k-var--chart-title-font"></div>
        <div class="k-var--chart-label-font"></div>
    </div>

    <div class="k-var--series">
      <div class="k-var--series-a"></div>
      <div class="k-var--series-b"></div>
      <div class="k-var--series-c"></div>
      <div class="k-var--series-d"></div>
      <div class="k-var--series-e"></div>
      <div class="k-var--series-f"></div>
    </div>
`;
/**
 * @hidden
 */
class ThemeService extends ConfigurationService {
    constructor(ngZone) {
        super(ngZone);
        this.loaded = false;
    }
    loadTheme() {
        if (this.loaded || !isDocumentAvailable()) {
            return;
        }
        if (!this.readTheme()) {
            this.readDefaultTheme();
        }
        this.loaded = true;
        this.next();
    }
    readTheme() {
        this.createElement();
        const available = this.queryColor('accent') !==
            this.queryColor('accent-contrast');
        try {
            if (available) {
                this.push(chartBaseTheme());
                this.setColors();
                this.setFonts();
                this.setSeriesColors();
            }
        }
        finally {
            this.destroyElement();
        }
        return available;
    }
    readDefaultTheme() {
        this.push(chartDefaultTheme());
    }
    createElement() {
        const container = this.element = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = template;
        document.body.appendChild(container);
    }
    destroyElement() {
        if (this.element) {
            document.body.removeChild(this.element);
            this.element = undefined;
        }
    }
    setStyle(key, value) {
        this.set(key, value);
    }
    setColors() {
        this.mapColor('axisDefaults.crosshair.color', 'chart-crosshair-background');
        this.mapColor('axisDefaults.labels.color', 'normal-text-color');
        this.mapColor('axisDefaults.line.color', 'chart-major-lines');
        this.mapColor('axisDefaults.majorGridLines.color', 'chart-major-lines');
        this.mapColor('axisDefaults.minorGridLines.color', 'chart-minor-lines');
        this.mapColor('axisDefaults.notes.icon.background', 'chart-notes-background');
        this.mapColor('axisDefaults.notes.icon.border.color', 'chart-notes-border');
        this.mapColor('axisDefaults.notes.line.color', 'chart-notes-lines');
        this.mapColor('axisDefaults.title.color', 'normal-text-color');
        this.mapColor('chartArea.background', 'background');
        this.mapColor('legend.inactiveItems.labels.color', 'chart-inactive');
        this.mapColor('legend.inactiveItems.markers.color', 'chart-inactive');
        this.mapColor('legend.labels.color', 'normal-text-color');
        this.mapColor('seriesDefaults.boxPlot.downColor', 'chart-major-lines');
        this.mapColor('seriesDefaults.boxPlot.mean.color', 'base');
        this.mapColor('seriesDefaults.boxPlot.median.color', 'base');
        this.mapColor('seriesDefaults.boxPlot.whiskers.color', 'accent');
        this.mapColor('seriesDefaults.bullet.target.color', 'normal-text-color');
        this.mapColor('seriesDefaults.candlestick.downColor', 'normal-text-color');
        this.mapColor('seriesDefaults.candlestick.line.color', 'normal-text-color');
        this.mapColor('seriesDefaults.errorBars.color', 'chart-error-bars-background');
        this.mapColor('seriesDefaults.horizontalWaterfall.line.color', 'chart-major-lines');
        this.mapColor('seriesDefaults.icon.border.color', 'chart-major-lines');
        this.mapColor('seriesDefaults.labels.background', 'background');
        this.mapColor('seriesDefaults.labels.color', 'normal-text-color');
        this.mapColor('seriesDefaults.notes.icon.background', 'chart-notes-background');
        this.mapColor('seriesDefaults.notes.icon.border.color', 'chart-notes-border');
        this.mapColor('seriesDefaults.notes.line.color', 'chart-notes-lines');
        this.mapColor('seriesDefaults.verticalBoxPlot.downColor', 'chart-major-lines');
        this.mapColor('seriesDefaults.verticalBoxPlot.mean.color', 'base');
        this.mapColor('seriesDefaults.verticalBoxPlot.median.color', 'base');
        this.mapColor('seriesDefaults.verticalBoxPlot.whiskers.color', 'accent');
        this.mapColor('seriesDefaults.verticalBullet.target.color', 'normal-text-color');
        this.mapColor('seriesDefaults.waterfall.line.color', 'chart-major-lines');
        this.mapColor('title.color', 'normal-text-color');
        const opacity = parseFloat(this.queryStyle('chart-area-opacity').opacity);
        if (!isNaN(opacity)) {
            this.setStyle('seriesDefaults.area.opacity', opacity);
            this.setStyle('seriesDefaults.labels.opacity', opacity);
        }
    }
    setFonts() {
        const defaultFont = font(this.queryStyle('chart-font'));
        const titleFont = font(this.queryStyle('chart-title-font'));
        const labelFont = font(this.queryStyle('chart-label-font'));
        this.setStyle('axisDefaults.labels.font', labelFont);
        this.setStyle('axisDefaults.notes.label.font', defaultFont);
        this.setStyle('axisDefaults.title.font', defaultFont);
        this.setStyle('legend.labels.font', defaultFont);
        this.setStyle('seriesDefaults.labels.font', labelFont);
        this.setStyle('seriesDefaults.notes.label.font', defaultFont);
        this.setStyle('title.font', titleFont);
    }
    setSeriesColors() {
        const element = this.element;
        const series = [].slice.call(element.querySelectorAll('.k-var--series div'));
        const seriesColors = series.reduce((arr, el) => {
            const pos = seriesPos(el.className);
            arr[pos] = window.getComputedStyle(el).backgroundColor;
            return arr;
        }, [] // Will populate the series colors in this array
        );
        this.setStyle('seriesColors', seriesColors);
    }
    mapColor(key, varName) {
        this.setStyle(key, this.queryColor(varName));
    }
    queryColor(varName) {
        return this.queryStyle(varName).backgroundColor;
    }
    queryStyle(varName) {
        const element = this.element;
        return window.getComputedStyle(element.querySelector(`.k-var--${varName}`));
    }
}
ThemeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ThemeService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @hidden
 */
class ChartInstanceObserver extends InstanceObserver {
    constructor(instance) {
        super(instance);
        this.handlerMap = {
            hideTooltip: 'onHideTooltip',
            legendItemClick: 'onLegendItemClick',
            render: 'onRender',
            showTooltip: 'onShowTooltip',
            init: 'onInit'
        };
    }
}

/**
 * @hidden
 */
class TooltipTemplateService {
    setTemplate(template) {
        this.template = template;
    }
    getTemplate(seriesIndex) {
        if (this.seriesTemplates && this.seriesTemplates[seriesIndex]) {
            return this.seriesTemplates[seriesIndex];
        }
        return this.template;
    }
    setSeriesTemplates(seriesTemplates) {
        this.seriesTemplates = seriesTemplates;
    }
    setSharedTemplate(sharedTemplate) {
        this.sharedTemplate = sharedTemplate;
    }
    getSharedTemplate() {
        return this.sharedTemplate;
    }
}
TooltipTemplateService.decorators = [
    { type: Injectable },
];

/**
 * A directive that selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-chart-tooltip>` component for the
 * [series tooltip]({% slug tooltips_chart_charts %}#toc-series-tooltip).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-tooltip>
 *          <ng-template kendoChartSeriesTooltipTemplate let-value="value">
 *             Value is {{value}}
 *           </ng-template>
 *       </kendo-chart-tooltip>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
class SeriesTooltipTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
SeriesTooltipTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChartSeriesTooltipTemplate]'
            },] },
];
/** @nocollapse */
SeriesTooltipTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * A directive that selects a [template]({{ site.data.urls.angular['templatesyntax'] }})
 * within the `<kendo-chart-tooltip>` component for the
 * [shared series tooltip]({% slug tooltips_chart_charts %}#toc-shared-tooltip).
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-tooltip [shared]="true">
 *         <ng-template kendoChartSharedTooltipTemplate let-category="category" let-points="points">
 *             <div> {{ category }} </div>
 *             <div *ngFor="let point of points">
 *                 {{ point.series.name }} : {{ point.value }}
 *             </div>
 *         </ng-template>
 *       </kendo-chart-tooltip>
 *       <kendo-chart-category-axis>
 *         <kendo-chart-category-axis-item [categories]="['A', 'B', 'C']">
 *         </kendo-chart-category-axis-item>
 *       </kendo-chart-category-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item name="A" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *         <kendo-chart-series-item name="B" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
class SharedTooltipTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
SharedTooltipTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoChartSharedTooltipTemplate]'
            },] },
];
/** @nocollapse */
SharedTooltipTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * The point that is passed to the tooltip template.
 */
class TooltipTemplatePoint {
    /**
     * @hidden
     */
    constructor(point, format, template) {
        this.value = point.value;
        this.category = point.category;
        this.categoryIndex = point.categoryIx;
        this.series = point.series;
        this.dataItem = point.dataItem;
        this.percentage = point.percentage;
        this.runningTotal = point.runningTotal;
        this.total = point.total;
        this.low = point.low;
        this.high = point.high;
        this.xLow = point.xLow;
        this.xHigh = point.xHigh;
        this.yLow = point.yLow;
        this.yHigh = point.yHigh;
        this.template = template;
        this.point = point;
        this.format = format;
    }
    /**
     * @hidden
     */
    get formattedValue() {
        return this.format ? this.point.formatValue(this.format) : String(this.value);
    }
}

/* tslint:disable:align no-empty */
const POSITION_MODE = 'absolute';
const COLLISION = { horizontal: "fit", vertical: "fit" };
/**
 * @hidden
 */
class BaseTooltip {
    constructor(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.style = {};
        this.popupRef = null;
    }
    get active() {
        return this.popupRef !== null;
    }
    show(e) {
        const align = e.anchor.align;
        const offset = e.anchor.point;
        this.style = e.style;
        if (!this.popupRef) {
            this.popupRef = this.popupService.open(Object.assign({
                offset: offset,
                popupAlign: align,
                animate: this.animate,
                content: this.templateRef,
                collision: COLLISION,
                positionMode: POSITION_MODE
            }, this.popupSettings));
            if (this.localizationService.rtl) {
                this.popupRef.popupElement.setAttribute('dir', 'rtl');
            }
            this.onInit();
        }
        else {
            const popup = this.popupRef.popup.instance;
            popup.offset = offset;
            popup.popupAlign = align;
        }
    }
    hide() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    onInit() {
    }
    ngOnDestroy() {
        this.hide();
    }
}

/**
 * @hidden
 */
function hasParent(element, parent) {
    let current = element;
    while (current && current !== parent) {
        current = current.parentNode;
    }
    return current ? true : false;
}

/**
 * @hidden
 */
function bodyFactory() {
    if (isDocumentAvailable()) {
        return new ElementRef(document.body);
    }
}

const SHARED_TOOLTIP_CLASS = 'k-chart-shared-tooltip';
const TOOLTIP_CLASS = "k-chart-tooltip";
const ɵ0$2 = bodyFactory;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
class TooltipPopupComponent extends BaseTooltip {
    constructor(popupService, templateService, localizationService, ngZone) {
        super(popupService, localizationService);
        this.popupService = popupService;
        this.templateService = templateService;
        this.localizationService = localizationService;
        this.ngZone = ngZone;
        this.seriesTooltipContext = {};
        this.seriesSharedTooltipContext = {};
        this.animate = true;
        this.wrapperClass = 'k-chart-tooltip-wrapper';
        this.leave = new EventEmitter();
        this.popupClasses = {};
    }
    show(e) {
        this.shared = e.shared;
        this.popupClasses = Object.assign({
            [SHARED_TOOLTIP_CLASS]: e.shared,
            [TOOLTIP_CLASS]: true,
            [e.className]: !!e.className
        }, this.classNames);
        if (!e.shared) {
            this.seriesTooltipContext = new TooltipTemplatePoint(e.point, e.format);
            this.seriesTooltipTemplateRef = this.pointTemplateRef(e.point);
        }
        else {
            this.seriesSharedTooltipTemplateRef = this.templateService.getSharedTemplate()
                || this.defaultSharedTooltipTemplate.templateRef;
            this.seriesSharedTooltipContext = this.sharedTemplateContext(e);
        }
        super.show(e);
    }
    containsElement(element) {
        if (this.popupRef) {
            return hasParent(element, this.popupRef.popupElement);
        }
    }
    sharedTemplateContext(e) {
        const points = e.points;
        const nameColumn = points.filter((point) => typeof point.series.name !== 'undefined').length > 0;
        const colorMarker = e.series.length > 1;
        let colspan = 1;
        if (nameColumn) {
            colspan++;
        }
        if (colorMarker) {
            colspan++;
        }
        return {
            category: e.category,
            categoryText: e.categoryText,
            colorMarker: colorMarker,
            colspan: colspan,
            nameColumn: nameColumn,
            points: this.wrapPoints(e.points, e.format)
        };
    }
    pointTemplateRef(point) {
        return this.templateService.getTemplate(point.series.index) || this.defaultSeriesTooltipTemplate.templateRef;
    }
    wrapPoints(points, format) {
        const result = [];
        for (let idx = 0; idx < points.length; idx++) {
            const point = points[idx];
            const template = this.pointTemplateRef(point);
            const pointFormat = ((point.options || {}).tooltip || {}).format || format;
            result.push(new TooltipTemplatePoint(point, pointFormat, template));
        }
        return result;
    }
    onInit() {
        this.ngZone.runOutsideAngular(() => {
            this.mouseleaveSubscription = this.popupRef.popupElement.addEventListener('mouseleave', (args) => {
                this.leave.emit(args);
            });
        });
        this.popupRef.popupElement.className += ` ${this.wrapperClass}`;
    }
    hide() {
        if (this.mouseleaveSubscription) {
            this.mouseleaveSubscription();
            this.mouseleaveSubscription = null;
        }
        super.hide();
    }
}
TooltipPopupComponent.decorators = [
    { type: Component, args: [{
                providers: [PopupService, {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ0$2
                    }],
                selector: 'kendo-chart-tooltip-popup',
                template: `
    <ng-template #content>
        <div [ngClass]="popupClasses" [ngStyle]="style">
          <ng-template [ngTemplateOutlet]="seriesTooltipTemplateRef" *ngIf="!shared"
                    [ngTemplateOutletContext]="seriesTooltipContext">
          </ng-template>
          <ng-template [ngTemplateOutlet]="seriesSharedTooltipTemplateRef" *ngIf="shared"
                    [ngTemplateOutletContext]="seriesSharedTooltipContext">
          </ng-template>
        </div>
    </ng-template>

    <ng-template kendoChartSeriesTooltipTemplate let-formattedValue="formattedValue">
        <span [innerHTML]="formattedValue"></span>
    </ng-template>
    <ng-template kendoChartSharedTooltipTemplate let-points="points" let-categoryText="categoryText" let-colspan="colspan" let-colorMarker="colorMarker" let-nameColumn="nameColumn" >
        <table>
            <tr><th [attr.colspan]='colspan'> {{ categoryText }} </th></tr>
            <tr *ngFor="let point of points">
                <td *ngIf="colorMarker"><span class='k-chart-shared-tooltip-marker' [style.background-color]='point.series.color'></span></td>
                <td *ngIf="nameColumn">
                    <ng-container *ngIf="point.series.name !== undefined">{{ point.series.name }}</ng-container>
                    <ng-container *ngIf="point.series.name === undefined">&nbsp;</ng-container>
                </td>
                <td>
                  <ng-template [ngTemplateOutlet]="point.template"
                            [ngTemplateOutletContext]="point">
                  </ng-template>
                </td>
            </tr>
        </table>
    </ng-template>
    `
            },] },
];
/** @nocollapse */
TooltipPopupComponent.ctorParameters = () => [
    { type: PopupService },
    { type: TooltipTemplateService },
    { type: LocalizationService },
    { type: NgZone }
];
TooltipPopupComponent.propDecorators = {
    defaultSeriesTooltipTemplate: [{ type: ViewChild, args: [SeriesTooltipTemplateDirective,] }],
    defaultSharedTooltipTemplate: [{ type: ViewChild, args: [SharedTooltipTemplateDirective,] }],
    templateRef: [{ type: ViewChild, args: ['content',] }],
    animate: [{ type: Input }],
    classNames: [{ type: Input }],
    popupSettings: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    leave: [{ type: Output }]
};

const ɵ0$3 = bodyFactory;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
class CrosshairTooltipComponent extends BaseTooltip {
    constructor(popupService, localizationService) {
        super(popupService, localizationService);
        this.animate = false;
    }
    show(e) {
        super.show(e);
        this.value = e.value;
        this.popupRef.popup.changeDetectorRef.detectChanges();
    }
}
CrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                providers: [PopupService, {
                        provide: POPUP_CONTAINER,
                        useFactory: ɵ0$3
                    }],
                selector: 'kendo-chart-crosshair-tooltip',
                template: `
        <ng-template #content>
            <div class="k-chart-tooltip k-chart-crosshair-tooltip" [ngStyle]="style">
                {{ value }}
            </div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
CrosshairTooltipComponent.ctorParameters = () => [
    { type: PopupService },
    { type: LocalizationService }
];
CrosshairTooltipComponent.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['content',] }],
    key: [{ type: Input }],
    popupSettings: [{ type: Input }]
};

const AXES = ["categoryAxis", "valueAxis", "xAxis", "yAxis"];
/**
 * @hidden
 */
class CrosshairTooltipsContainerComponent {
    constructor() {
        this.tooltipKeys = [];
        this.tooltipsMap = {};
    }
    show(e) {
        const tooltipComponents = this.crossahirTooltipComponents.toArray();
        const axisName = e.axisName;
        const axisIndex = e.axisIndex;
        for (let idx = 0; idx < tooltipComponents.length; idx++) {
            if (tooltipComponents[idx].key === axisName + axisIndex) {
                tooltipComponents[idx].show(e);
                break;
            }
        }
    }
    hide() {
        const tooltipComponents = this.crossahirTooltipComponents.toArray();
        for (let idx = 0; idx < tooltipComponents.length; idx++) {
            tooltipComponents[idx].hide();
        }
    }
    get active() {
        return this.tooltipKeys.length > 0;
    }
    createCrosshairTooltips(options) {
        const newMap = this.mapTooltips(options);
        const map = this.tooltipsMap;
        for (let key in map) {
            if (!newMap[key]) {
                this.removeTooltip(key);
                delete map[key];
            }
        }
        for (let key in newMap) {
            if (!map[key]) {
                map[key] = newMap[key];
                this.tooltipKeys.push(key);
            }
        }
    }
    removeTooltip(key) {
        const keys = this.tooltipKeys;
        for (let idx = 0; idx < keys.length; idx++) {
            if (keys[idx] === key) {
                keys.splice(idx, 1);
                break;
            }
        }
    }
    mapTooltips(options) {
        const map = {};
        for (let idx = 0; idx < AXES.length; idx++) {
            const tooltips = this.axesCrosshairTooltipOptions(options, AXES[idx]);
            for (let tooltipIdx = 0; tooltipIdx < tooltips.length; tooltipIdx++) {
                const tooltip = tooltips[tooltipIdx];
                map[tooltip.name + tooltip.index] = tooltip;
            }
        }
        return map;
    }
    axesCrosshairTooltipOptions(options, name) {
        const result = [];
        if (options[name]) {
            const axes = [].concat(options[name]);
            for (let idx = 0; idx < axes.length; idx++) {
                const tooltip = (axes[idx].crosshair || {}).tooltip;
                if (tooltip && tooltip.visible) {
                    result.push({
                        index: idx,
                        name: name
                    });
                }
            }
        }
        return result;
    }
}
CrosshairTooltipsContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chart-crosshair-tooltips-container',
                template: `
        <kendo-chart-crosshair-tooltip *ngFor="let key of tooltipKeys" [key]="key" [popupSettings]="popupSettings">
        </kendo-chart-crosshair-tooltip>
    `
            },] },
];
CrosshairTooltipsContainerComponent.propDecorators = {
    popupSettings: [{ type: Input }],
    crossahirTooltipComponents: [{ type: ViewChildren, args: [CrosshairTooltipComponent,] }]
};

const getTouch = (domEvent) => {
    return {
        x: {
            location: domEvent.pageX
        },
        y: {
            location: domEvent.pageY
        }
    };
};
const eventArgs = (e, previousArgs) => {
    const pointers = e.pointers;
    const pointer = pointers[0];
    const xLocation = pointer.pageX;
    const yLocation = pointer.pageY;
    let distance = 0;
    if (pointers.length > 1) {
        const pointer1 = pointers[0];
        const pointer2 = pointers[1];
        distance = Math.sqrt(Math.pow(pointer1.pageX - pointer2.pageX, 2) + Math.pow(pointer1.pageY - pointer2.pageY, 2));
    }
    return {
        distance: distance,
        event: e.srcEvent,
        preventDefault: function () {
            e.preventDefault();
        },
        target: e.target,
        touches: pointers.map(getTouch),
        type: e.type,
        x: {
            delta: previousArgs ? xLocation - previousArgs.x.location : 0,
            initialDelta: e.deltaX,
            location: xLocation,
            startLocation: xLocation - e.deltaX
        },
        y: {
            delta: previousArgs ? yLocation - previousArgs.y.location : 0,
            initialDelta: e.deltaY,
            location: yLocation,
            startLocation: yLocation - e.deltaY
        }
    };
};
function shouldBindGroup(groupNames, events) {
    for (let idx = 0; idx < groupNames.length; idx++) {
        if (events[groupNames[idx]]) {
            return true;
        }
    }
    return false;
}
const eventGroups = [{
        end: 'panend',
        move: 'panmove',
        start: 'panstart'
    }, {
        gesturechange: 'pinchmove',
        gestureend: 'pinchend',
        gesturestart: 'pinchstart'
    }, {
        press: 'press'
    }, {
        tap: 'tap'
    }];
/**
 * @hidden
 */
class DomEvents {
    constructor(hammerInstance, events) {
        this.hammerInstance = hammerInstance;
        this.eventHandlers = {};
        this.tap = this.tap.bind(this);
        this.press = this.press.bind(this);
        this.panstart = this.panstart.bind(this);
        this.panmove = this.panmove.bind(this);
        this.panend = this.panend.bind(this);
        this.pinchstart = this.pinchstart.bind(this);
        this.pinchmove = this.pinchmove.bind(this);
        this.pinchend = this.pinchend.bind(this);
        if (events) {
            this.bind(events);
        }
    }
    tap(e) {
        this.trigger('tap', e);
    }
    press(e) {
        this.trigger('press', e);
    }
    panstart(e) {
        delete this.previous;
        this.previous = this.trigger('start', e);
    }
    panmove(e) {
        this.previous = this.trigger('move', e);
    }
    panend(e) {
        this.trigger('end', e);
        delete this.previous;
    }
    pinchstart(e) {
        this.trigger('gesturestart', e);
    }
    pinchmove(e) {
        this.trigger('gesturechange', e);
    }
    pinchend(e) {
        this.trigger('gestureend', e);
    }
    trigger(name, e) {
        const args = eventArgs(e, this.previous);
        if (this.eventHandlers[name]) {
            this.eventHandlers[name](args);
        }
        return args;
    }
    bind(events = {}) {
        this.unbind();
        this.eventHandlers = events;
        for (let idx = 0; idx < eventGroups.length; idx++) {
            const eventGroup = eventGroups[idx];
            const groupNames = Object.keys(eventGroup);
            if (shouldBindGroup(groupNames, events)) {
                for (let nameIdx = 0; nameIdx < groupNames.length; nameIdx++) {
                    const name = eventGroup[groupNames[nameIdx]];
                    this.hammerInstance.on(name, this[name]);
                }
            }
        }
    }
    unbind() {
        if (this.hammerInstance) {
            this.hammerInstance.off();
        }
        this.eventHandlers = {};
    }
    destroy() {
        if (this.hammerInstance) {
            this.hammerInstance.destroy();
            delete this.hammerInstance;
        }
        delete this.eventHandlers;
    }
    toggleDrag(enable) {
        this.toggle('pan', enable);
    }
    toggleZoom(enable) {
        this.toggle('pinch', enable);
    }
    toggle(recognizer, enable) {
        if (this.hammerInstance) {
            const instanceRecognizer = this.hammerInstance.get(recognizer);
            instanceRecognizer.set({
                enable: enable
            });
        }
    }
}

const MISSING_HAMMER_MESSAGE = 'Hammerjs is not loaded.' +
    'Solution: http://www.telerik.com/kendo-angular-ui/components/charts/troubleshooting/#toc-hammerjs-is-not-loaded';
/**
 * @hidden
 */
class DomEventsBuilder$1 {
    static create(element, events) {
        if (typeof window !== 'undefined') {
            const HAMMER = window.Hammer;
            if (!HAMMER) {
                if (isDevMode()) {
                    throw new Error(MISSING_HAMMER_MESSAGE);
                }
                return;
            }
            const hammerInstance = new HAMMER(element, {
                recognizers: [
                    [HAMMER.Tap],
                    [HAMMER.Pan],
                    [HAMMER.Pinch],
                    [HAMMER.Press, { time: 0 }]
                ]
            });
            return new DomEvents(hammerInstance, events);
        }
    }
}

const dateCategoryAxisFormats = DateCategoryAxis.prototype.options.labels.dateFormats;
const dateValueAxisFormats = DateValueAxis.prototype.options.labels.dateFormats;
const dateFormats = {
    milliseconds: "HH:mm:ss.SSS",
    seconds: { time: 'medium' },
    minutes: { time: 'short' },
    hours: { time: 'short' },
    days: { skeleton: 'Md' },
    weeks: { skeleton: 'Md' },
    months: { skeleton: 'yyMMM' },
    years: { skeleton: 'y' }
};
Object.assign(dateCategoryAxisFormats, dateFormats);
Object.assign(dateValueAxisFormats, dateFormats);
DomEventsBuilder.register(DomEventsBuilder$1);

function hasObservers(emitter) {
    return emitter.observers.length > 0;
}
/**
 * The root Chart component.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <button (click)="toggleLegend()">Toggle Legend</button>
 *     <button (click)="toggleSeries()">Toggle Series</button>
 *     <kendo-chart>
 *       <kendo-chart-legend [visible]="legendVisible">
 *       </kendo-chart-legend>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item *ngIf="seriesVisible" name="Series #1"
 *                                   type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 *   public legendVisible: boolean = true;
 *   public seriesVisible: boolean = true;
 *
 *   public toggleSeries(): void {
 *     this.seriesVisible = !this.seriesVisible;
 *   }
 *
 *   public toggleLegend(): void {
 *     this.legendVisible = !this.legendVisible;
 *   }
 * }
 *
 * ```
 */
class ChartComponent extends ChartComponentGenerated {
    constructor(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        super(configurationService);
        this.configurationService = configurationService;
        this.themeService = themeService;
        this.element = element;
        this.intl = intl;
        this.localizationService = localizationService;
        this.ngZone = ngZone;
        this.instanceEventService = instanceEventService;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        /**
         * Fires when a legend item is clicked before the selected series visibility is toggled.
         * Can be prevented.
         */
        this.legendItemClick = new EventEmitter();
        /**
         * Limits the automatic resizing of the Chart. Sets the maximum number of times per second
         * that the component redraws its content when the size of its container changes.
         * Defaults to `10`. To disable the automatic resizing, set it to `0`.
         *
         * @example
         * ```ts
         * _@Component({
         *     selector: 'my-app',
         *     template: `
         *         <kendo-chart [resizeRateLimit]="2">
         * <!--                 ^^^^^^^^^^^^^^^^^^^^^^
         *       Will update the size of the Chart up to two times a second.
         *       Resize the Plunkr pane or window to try it out.
         * -->
         *          <kendo-chart-series>
         *            <kendo-chart-series-item [data]="seriesData">
         *           </kendo-chart-series-item>
         *         </kendo-chart-series>
         *       </kendo-chart>
         *   `
         * })
         * export class AppComponent {
         *    seriesData: number[] = [1, 2, 3, 5];
         * }
         * ```
         */
        this.resizeRateLimit = 10;
        this.className = true;
        this.theme = null;
        this.suppressTransitions = false;
        this.rtl = false;
        this.themeService.loadTheme();
        this.refreshWait();
    }
    ngAfterViewInit() {
        if (this.canRender) {
            this.ngZone.runOutsideAngular(() => {
                const chartMouseleave = this.renderer.listen(this.surfaceElement.nativeElement, 'mouseleave', this.chartMouseleave.bind(this));
                this.domSubscriptions = () => {
                    chartMouseleave();
                };
            });
        }
        this.setDirection();
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.subscriptions.add(this.localizationService.changes.subscribe(this.rtlChange.bind(this)));
    }
    ngAfterViewChecked() {
        if (this.instance && this.autoResize) {
            this.ngZone.runOutsideAngular(() => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.resize();
                }, 0);
            });
        }
    }
    ngOnChanges(changes) {
        const store = this.configurationService.store;
        copyChanges(changes, store);
        store.popupSettings = null;
        this.configurationService.push(store);
    }
    /**
     * Updates the component fields with the specified values and refreshes the Chart.
     *
     * Use this method when the configuration values cannot be set through the template.
     *
     * @example
     * ```ts-no-run
     * chart.notifyChanges({ title: { text: 'New Title' } });
     * ```
     *
     * @param changes An object containing the updated input fields.
     */
    notifyChanges(changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    }
    ngOnDestroy() {
        this.destroyed = true;
        this.subscription.unsubscribe();
        if (this.domSubscriptions) {
            this.domSubscriptions();
            this.domSubscriptions = null;
        }
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        clearTimeout(this.resizeTimeout);
        clearTimeout(this.redrawTimeout);
    }
    createInstance(element, observer) {
        this.instance = new Chart(element, this.options, this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    }
    /**
     * Exports the Chart as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image encoded as a Data URI.
     */
    exportImage(options = {}) {
        return exportImage(this.exportVisual(options), options);
    }
    /**
     * Exports the Chart as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param options - The parameters for the exported file.
     * @returns - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    exportSVG(options = {}) {
        return exportSVG(this.exportVisual(options), options);
    }
    /**
     * Exports the Chart as a Drawing `Scene`.
     *
     * @param options - The parameters for the export operation.
     * @returns - The root Group of the scene.
     */
    exportVisual(options = {}) {
        return this.instance.exportVisual(options);
    }
    /**
     * Returns the axis with the specified name.
     *
     * @param {string} name - The axis name.
     * @returns {ChartAxis} - The axis with a corresponding name.
     */
    findAxisByName(name) {
        if (this.instance) {
            return this.instance.findAxisByName(name);
        }
    }
    /**
     * Returns the pane at the specified index.
     *
     * @param {number} index - The pane index.
     * @returns {ChartPane} - The pane at the specified index.
     */
    findPaneByIndex(index) {
        if (this.instance) {
            return this.instance.findPaneByIndex(index);
        }
    }
    /**
     * Returns the pane with the specified name.
     *
     * @param {string} name - The name of the pane.
     * @returns {ChartPane} - The pane with the provided name.
     */
    findPaneByName(name) {
        if (this.instance) {
            return this.instance.findPaneByName(name);
        }
    }
    /**
     * Returns the plot area of the Chart.
     * @returns {ChartPlotArea} - The plot area of the Chart.
     */
    getPlotArea() {
        if (this.instance) {
            return this.instance.plotArea();
        }
    }
    /**
     * Highlights the series points or the segments of a Pie, Donut, or Funnel charts.
     *
     * In the following example, the callback is evaluated for each data point.
     * If the function returns `true`, the point is highlighted.
     *
     * @example
     * ```ts
     * import { Component, ViewChild } from '@angular/core';
     * import { PlotBand, ChartComponent } from '@progress/kendo-angular-charts';
     *
     * _@Component({
     *  selector: 'my-app',
     *  template: `
     *    <button (click)="toggleHighlight()">Toggle highlight for Google</button>
     *    <kendo-chart #chart>
     *      <kendo-chart-series>
     *        <kendo-chart-title text="Job Growth"></kendo-chart-title>
     *      <kendo-chart-series-item type="bubble" [data]="data"
     *                                 xField="x" yField="y" sizeField="size" categoryField="category">
     *        </kendo-chart-series-item>
     *        <kendo-chart-x-axis>
     *          <kendo-chart-x-axis-item [axisCrossingValue]="-5000" [majorUnit]="2000" [plotBands]="xPlotBands">
     *              <kendo-chart-x-axis-item-labels format="{0:N0}" [skip]="1" rotation="auto">
     *              </kendo-chart-x-axis-item-labels>
     *          </kendo-chart-x-axis-item>
     *        </kendo-chart-x-axis>
     *        <kendo-chart-y-axis>
     *          <kendo-chart-y-axis-item [labels]="{ format: '{0:N0}' }">
     *          </kendo-chart-y-axis-item>
     *        </kendo-chart-y-axis>
     *        <kendo-chart-tooltip format="{3}: {2:N0} applications" [opacity]="1">
     *        </kendo-chart-tooltip>
     *        <kendo-chart-legend [visible]="false">
     *        </kendo-chart-legend>
     *      </kendo-chart-series>
     *    </kendo-chart>
     *  `
     * })
     * export class AppComponent {
     *  xPlotBands: PlotBand[] = [{
     *      from: -5000,
     *      to: 0,
     *      color: "#00f",
     *      opacity: 0.05
     *  }];
     *
     *    public data: any = [{
     *       x: -2500,
     *       y: 50000,
     *       size: 500000,
     *       category: "Microsoft"
     *    }, {
     *       x: 500,
     *       y: 110000,
     *       size: 7600000,
     *       category: "Starbucks"
     *    }, {
     *       x: 7000,
     *       y: 19000,
     *       size: 700000,
     *       category: "Google"
     *    }, {
     *       x: 1400,
     *       y: 150000,
     *       size: 700000,
     *       category: "Publix Super Markets"
     *    }, {
     *       x: 2400,
     *     y: 30000,
     *       size: 300000,
     *       category: "PricewaterhouseCoopers"
     *    }, {
     *       x: 2450,
     *       y: 34000,
     *       size: 90000,
     *       category: "Cisco"
     *    }, {
     *       x: 2700,
     *       y: 34000,
     *       size: 400000,
     *       category: "Accenture"
     *    }, {
     *       x: 2900,
     *       y: 40000,
     *       size: 450000,
     *       category: "Deloitte"
     *    }, {
     *       x: 3000,
     *       y: 55000,
     *       size: 900000,
     *       category: "Whole Foods Market"
     *    }];
     *
     * _@ViewChild('chart')
     *  chart: ChartComponent;
     *
     * private active: boolean = false;
     *
     *  toggleHighlight(): void {
     *    this.active = !this.active;
     *    this.chart.toggleHighlight(this.active, (p) => p.category === 'Google');
     *  }
     * }
     * ```
     *
     * @param show - A Boolean value that indicates whether the highlight is shown or hidden.
     * @param filter - A string that represents the series or category name, an object with the series and category name, or a function which will be called for each point. The function should return `true` for the points for which the highlight is toggled.
     */
    toggleHighlight(show, filter) {
        if (this.instance) {
            this.instance.toggleHighlight(show, filter);
        }
    }
    /**
     * Hides the tooltip of the Chart.
     */
    hideTooltip() {
        if (this.instance) {
            this.instance.hideTooltip();
        }
    }
    /**
     * Shows the Chart tooltip of a specific point or the shared tooltip of a specific category.
     *
     * @param filter - The category for a shared tooltip or a function which will be called for each point until the function returns `true`.
     */
    showTooltip(filter) {
        if (this.instance) {
            this.instance.showTooltip(filter);
        }
    }
    init() {
        if (!this.canRender) {
            return;
        }
        const element = this.surfaceElement.nativeElement;
        const instanceObserver = new ChartInstanceObserver(this);
        this.createInstance(element, instanceObserver);
    }
    /**
     * Detects the size of the container and redraws the Chart.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    resize() {
        if (this.instance) {
            this.instance.resize();
        }
    }
    /**
     * @hidden
     */
    onResize(_event) {
        if (this.autoResize) {
            this.resize();
        }
    }
    onLegendItemClick(e) {
        this.run(() => {
            const args = new LegendItemClickEvent(e, this);
            this.legendItemClick.emit(args);
            if (!args.isDefaultPrevented()) {
                const series = this.seriesComponents.toArray()[e.series.index];
                if (!series) {
                    return;
                }
                if (e.pointIndex === undefined) {
                    series.toggleVisibility();
                }
                else {
                    series.togglePointVisibility(e.pointIndex);
                }
                this.suppressTransitions = true;
            }
        }, hasObservers(this.legendItemClick), this.seriesComponents.length > 0);
    }
    onInit(e) {
        this.instance = e.sender;
    }
    onRender(e) {
        const donutCenterStyle = this.getDonutCenterStyle();
        this.run(() => {
            const args = new RenderEvent(e, this);
            this.surface = e.sender.surface;
            this.render.emit(args);
            this.donutCenterStyle = donutCenterStyle;
        }, hasObservers(this.render), this.donutCenterStyle !== donutCenterStyle);
    }
    onShowTooltip(e) {
        this.run(() => {
            if (!e.crosshair) {
                this.tooltipInstance.show(e);
            }
            else {
                this.crossahirTooltips.show(e);
            }
        }, !e.crosshair, true);
    }
    onHideTooltip(e) {
        if (!e.crosshair) {
            if (this.tooltipInstance.active) {
                this.tooltipInstance.hide();
                this.detectChanges();
            }
        }
        else if (this.crossahirTooltips.active) {
            this.crossahirTooltips.hide();
            this.detectChanges();
        }
    }
    trigger(name, e) {
        if (name === 'resize') {
            return;
        }
        const emitter = this.activeEmitter(name);
        if (emitter) {
            const args = this.instanceEventService.create(name, e, this);
            this.run(() => {
                emitter.emit(args);
            });
            return args.isDefaultPrevented && args.isDefaultPrevented();
        }
    }
    requiresHandlers(names) {
        for (let idx = 0; idx < names.length; idx++) {
            if (this.activeEmitter(names[idx])) {
                return true;
            }
        }
        return false;
    }
    refresh() {
        clearTimeout(this.redrawTimeout);
        this.updateDirection();
        this.crossahirTooltips.createCrosshairTooltips(this.options);
        this.setChartAreaSize();
        if (!this.instance) {
            this.init();
            return;
        }
        const transitions = this.options.transitions;
        if (this.suppressTransitions) {
            this.options.transitions = false;
        }
        this.updateOptions();
        if (this.suppressTransitions) {
            this.options.transitions = transitions;
            this.suppressTransitions = false;
        }
    }
    setChartAreaSize() {
        if (!this.element) {
            return;
        }
        const element = this.element.nativeElement;
        const chartArea = this.options.chartArea || {};
        if (chartArea.width) {
            element.style.width = `${chartArea.width}px`;
        }
        if (chartArea.height) {
            element.style.height = `${chartArea.height}px`;
        }
    }
    updateOptions() {
        this.instance.setOptions(this.options);
    }
    /**
     * @hidden
     */
    tooltipMouseleave(e) {
        const relatedTarget = e.relatedTarget;
        const chartElement = this.element.nativeElement;
        if (this.instance && (!relatedTarget || !hasParent(relatedTarget, chartElement))) {
            this.instance.hideElements();
        }
    }
    /**
     * @hidden
     */
    chartMouseleave(e) {
        const relatedTarget = e.relatedTarget;
        const chartElement = this.element.nativeElement;
        if (this.instance && (!relatedTarget || !(this.tooltipInstance.containsElement(relatedTarget) || hasParent(relatedTarget, chartElement))) &&
            !this.instance.handlingTap) {
            this.instance.hideElements();
        }
    }
    get canRender() {
        return isDocumentAvailable() && Boolean(this.surfaceElement);
    }
    get autoResize() {
        return this.resizeRateLimit > 0;
    }
    activeEmitter(name) {
        const emitter = this[name];
        if (emitter && emitter.emit && hasObservers(emitter)) {
            return emitter;
        }
    }
    getDonutCenterStyle() {
        if (!this.instance || !this.options || !this.options.series) {
            return;
        }
        const firstSeries = this.options.series[0];
        const charts = this.instance._plotArea.charts;
        if (!firstSeries || firstSeries.type !== 'donut' || charts[0].points.length === 0) {
            return;
        }
        const firstPoint = charts[0].points[0];
        const center = firstPoint.box.center();
        const radius = firstPoint.sector.innerRadius;
        const top = center.y - radius;
        const left = center.x - radius;
        const size = radius * 2;
        return {
            height: size + 'px',
            left: left + 'px',
            top: top + 'px',
            width: size + 'px'
        };
    }
    refreshWait() {
        this.ngZone.runOutsideAngular(() => {
            this.subscription = combineLatest(this.configurationService.onChange$, this.themeService.onChange$).pipe(tap((result) => {
                this.options = result[0];
                this.theme = result[1];
            }), auditTime(THROTTLE_MS))
                .subscribe(() => {
                this.refresh();
            });
        });
    }
    run(callback, inZone = true, detectChanges) {
        if (inZone) {
            if (detectChanges) {
                this.changeDetector.markForCheck();
            }
            this.ngZone.run(callback);
        }
        else {
            callback();
            if (detectChanges) {
                this.detectChanges();
            }
        }
    }
    detectChanges() {
        if (!this.destroyed) {
            this.changeDetector.detectChanges();
        }
    }
    intlChange() {
        if (this.instance) {
            this.deferredRedraw();
        }
    }
    rtlChange() {
        if (this.instance && this.rtl !== this.isRTL) {
            this.deferredRedraw();
        }
    }
    deferredRedraw() {
        this.ngZone.runOutsideAngular(() => {
            clearTimeout(this.redrawTimeout);
            this.redrawTimeout = setTimeout(() => {
                this.updateDirection();
                this.instance.noTransitionsRedraw();
            }, 0);
        });
    }
    updateDirection() {
        const current = this.isRTL;
        if (this.rtl !== current) {
            this.setDirection();
            if (this.instance) {
                this.instance.setDirection(current);
            }
        }
    }
    setDirection() {
        this.rtl = this.isRTL;
        if (this.element) {
            this.renderer.setAttribute(this.element.nativeElement, 'dir', this.rtl ? 'rtl' : 'ltr');
        }
    }
    get isRTL() {
        return Boolean(this.localizationService.rtl);
    }
}
ChartComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendoChart',
                // required because the class should not be inheritted
                // tslint:disable-next-line
                host: {
                    '[class.k-chart]': 'className',
                    '[class.k-widget]': 'className'
                },
                providers: [
                    ConfigurationService,
                    TooltipTemplateService,
                    InstanceEventService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.chart'
                    }
                ],
                selector: 'kendo-chart',
                template: `
    <div #surface class="k-chart-surface"></div>
    <kendo-chart-crosshair-tooltips-container [popupSettings]="popupSettings">
    </kendo-chart-crosshair-tooltips-container>
    <kendo-chart-tooltip-popup (leave)="tooltipMouseleave($event)" [popupSettings]="popupSettings">
    </kendo-chart-tooltip-popup>
    <kendo-resize-sensor (resize)="onResize($event)" [rateLimit]="resizeRateLimit"></kendo-resize-sensor>
    <div class="k-chart-donut-center" [ngStyle]="donutCenterStyle" *ngIf="donutCenterStyle && donutCenterTemplate">
      <ng-template [ngTemplateOutlet]="donutCenterTemplate.templateRef"></ng-template>
    </div>
  `
            },] },
];
/** @nocollapse */
ChartComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: ElementRef },
    { type: IntlService },
    { type: LocalizationService },
    { type: NgZone },
    { type: InstanceEventService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
ChartComponent.propDecorators = {
    legendItemClick: [{ type: Output }],
    resizeRateLimit: [{ type: Input }],
    popupSettings: [{ type: Input }],
    seriesComponents: [{ type: ContentChildren, args: [SeriesItemComponent, { descendants: true },] }],
    donutCenterTemplate: [{ type: ContentChild, args: [DonutCenterTemplateDirective,] }],
    tooltipInstance: [{ type: ViewChild, args: [TooltipPopupComponent,] }],
    crossahirTooltips: [{ type: ViewChild, args: [CrosshairTooltipsContainerComponent,] }],
    surfaceElement: [{ type: ViewChild, args: ['surface',] }]
};

/**
 * @hidden
 */
class AxisDefaultsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    majorGridLines: [{ type: Input }],
    majorTicks: [{ type: Input }],
    minorGridLines: [{ type: Input }],
    minorTicks: [{ type: Input }],
    narrowRange: [{ type: Input }],
    pane: [{ type: Input }],
    plotBands: [{ type: Input }],
    reverse: [{ type: Input }],
    startAngle: [{ type: Input }],
    visible: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * The default options for all Chart axes.
 * Accepts the options which are supported by [`categoryAxis`]({% slug api_charts_categoryaxisitemcomponent %}),
 * [`valueAxis`]({% slug api_charts_valueaxisitemcomponent %}),
 * [`xAxis`]({% slug api_charts_xaxisitemcomponent %}),
 * and [`yAxis`]({% slug api_charts_yaxisitemcomponent %}).
 *
 * @example
 * ```ts-preview
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *  <div style="height: 600px;">
 *  <kendo-chart [categoryAxis]="{ categories: categories }" [chartArea]="{height: 600}" >
 *    <kendo-chart-axis-defaults
 *      [background]="background"
 *      [color]="color"
 *      [crosshair]="crosshair"
 *      [labels]="labels"
 *      [line]="line"
 *      [majorGridLines]="majorGridLines"
 *      [minorGridLines]="minorGridLines"
 *      [majorTicks]="majorTicks"
 *      [minorTicks]="minorTicks"
 *      [title]="title"
 *      ></kendo-chart-axis-defaults>
 *    <kendo-chart-title text="Gross domestic product growth /GDP annual %/"></kendo-chart-title>
 *    <kendo-chart-legend position="bottom" orientation="horizontal"></kendo-chart-legend>
 *    <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
 *    <kendo-chart-series>
 *        <kendo-chart-series-item *ngFor="let item of series"
 *            type="line" style="smooth" [data]="item.data" [name]="item.name">
 *        </kendo-chart-series-item>
 *    </kendo-chart-series>
 *  </kendo-chart>
 *  </div>
 * `
 * })
 * export class AppComponent {
 * public series: any[] = [{
 * name: "India",
 * data: [4, 8, 8, 9, 9, 9, 3, 8, 9, 6]
 * }, {
 * name: "Russian Federation",
 * data: [4, 7, 7, 6, 8, 8, 5, 8, 4, 4]
 * }, {
 * name: "Germany",
 * data: [0, 0, 1, 1, 4, 3, 1, 5, 4, 3]
 * },{
 * name: "World",
 * data: [2, 3, 4, 4, 4, 4, 1, 2, 4, 3]
 * }];
 *
 * public  categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
 *
 * public background = 'white';
 * // public color = 'cyan'; // will override the line.color option
 * public crosshair = {
 * visible: true
 * };
 * public labels = {
 * font: 'bold 12px/30px Helvetica, Arial, sans-serif',
 * color: '#4CAF50',
 * padding: 5,
 * rotation: 45,
 * background: 'white',
 * border: {
 * color: '#4CAF50',
 * width: 2
 * },
 * };
 * public line = {
 * color: 'black',
 * width: 3
 * };
 *
 * public majorGridLines = {
 * color: 'black',
 * visible: true
 * }
 *
 * public minorGridLines = {
 * color: 'lightgray',
 * visible: true
 * }
 *
 * public majorTicks = {
 * color: 'black',
 * size: 15
 * }
 *
 * public minorTicks = {
 * color: 'lightgray',
 * size: 10
 * }
 *
 * public title = {
 * text: 'Default Axis Title',
 * color: 'black',
 * background: 'white',
 * border: {
 * color: 'black',
 * width: 2
 * },
 * padding: 10
 * }
 * }
 * ```
 */
class AxisDefaultsComponent extends AxisDefaultsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class AxisDefaultsCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    dashType: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * The crosshair configuration options ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
class AxisDefaultsCrosshairComponent extends AxisDefaultsCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
AxisDefaultsCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class AxisDefaultsCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the [`axisDefaults.crosshair.tooltip.visible`]({% slug api_charts_axisdefaultscrosshairtooltipcomponent %}#toc-visible)
 * option is set to `true`.
 */
class AxisDefaultsCrosshairTooltipComponent extends AxisDefaultsCrosshairTooltipComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
AxisDefaultsCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class AxisDefaultsLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.labels', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsLabelsComponentGenerated.propDecorators = {
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The configuration of the axis labels ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
class AxisDefaultsLabelsComponent extends AxisDefaultsLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-labels',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class AxisDefaultsTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('axisDefaults.title', configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The configuration of the axis title ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
class AxisDefaultsTitleComponent extends AxisDefaultsTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-title',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CollectionComponent {
    constructor(configKey, configurationService, collectionService) {
        this.configKey = configKey;
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.items = [];
        this.subscription = collectionService.onItemChange$.subscribe(changes => this.processChanges(changes));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngAfterContentInit() {
        this.readItems();
        this.children.changes.subscribe(() => this.readItems());
    }
    processChanges(changes) {
        if (!this.children) {
            return;
        }
        const index = this.children.toArray().indexOf(changes.sender);
        if (index < 0) {
            return;
        }
        this.items[index] = changes.options;
        this.change();
    }
    readItems() {
        this.items = this.children.map(s => s.options);
        this.change();
    }
    change() {
        this.configurationService.notify(new Change(this.configKey, this.items));
    }
}

/**
 * Specifies the `weekStartDay` of a [CategoryAxisItemComponent]({% slug api_charts_categoryaxisitemcomponent %}).
 */
var WeekStartDay;
(function (WeekStartDay) {
    /**
     * Specifies Sunday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Sunday"] = 0] = "Sunday";
    /**
     * Specifies Monday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Monday"] = 1] = "Monday";
    /**
     * Specifies Tuesday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Tuesday"] = 2] = "Tuesday";
    /**
     * Specifies Wednesday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Wednesday"] = 3] = "Wednesday";
    /**
     * Specifies Thursday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Thursday"] = 4] = "Thursday";
    /**
     * Specifies Friday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Friday"] = 5] = "Friday";
    /**
     * Specifies Saturday as the first day of the week.
     */
    WeekStartDay[WeekStartDay["Saturday"] = 6] = "Saturday";
})(WeekStartDay || (WeekStartDay = {}));

/**
 * @hidden
 */
class CategoryAxisItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
    }
}
CategoryAxisItemComponentGenerated.propDecorators = {
    autoBaseUnitSteps: [{ type: Input }],
    axisCrossingValue: [{ type: Input }],
    background: [{ type: Input }],
    baseUnit: [{ type: Input }],
    baseUnitStep: [{ type: Input }],
    categories: [{ type: Input }],
    color: [{ type: Input }],
    justified: [{ type: Input }],
    line: [{ type: Input }],
    majorGridLines: [{ type: Input }],
    majorTicks: [{ type: Input }],
    max: [{ type: Input }],
    maxDateGroups: [{ type: Input }],
    maxDivisions: [{ type: Input }],
    min: [{ type: Input }],
    minorGridLines: [{ type: Input }],
    minorTicks: [{ type: Input }],
    name: [{ type: Input }],
    pane: [{ type: Input }],
    plotBands: [{ type: Input }],
    reverse: [{ type: Input }],
    roundToBaseUnit: [{ type: Input }],
    startAngle: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }],
    weekStartDay: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    select: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * The configuration component for a category axis ([see example]({% slug axes_chart_charts %})).
 */
class CategoryAxisItemComponent extends CategoryAxisItemComponentGenerated {
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService, intl, localeId);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
CategoryAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-category-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: IntlService },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @hidden
 */
class CategoryAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('categoryAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
CategoryAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [CategoryAxisItemComponent,] }]
};

/**
 * A collection of one or more category axis items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-category-axis>
 *         <kendo-chart-category-axis-item [categories]="[2015, 2016]" color="#f00">
 *         </kendo-chart-category-axis-item>
 *       </kendo-chart-category-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 * ```
 */
class CategoryAxisComponent extends CategoryAxisComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
CategoryAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-category-axis',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class CategoryAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    dashType: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
class CategoryAxisCrosshairComponent extends CategoryAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
CategoryAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
class CategoryAxisCrosshairTooltipComponent extends CategoryAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
CategoryAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    culture: [{ type: Input }],
    dateFormats: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The configuration of the axis labels ([see example]({% slug labels_chart_charts %})).
 */
class CategoryAxisLabelsComponent extends CategoryAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesComponentGenerated.propDecorators = {
    data: [{ type: Input }],
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};

/**
 * The configuration of the category axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
class CategoryAxisNotesComponent extends CategoryAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The icon of the notes.
 */
class CategoryAxisNotesIconComponent extends CategoryAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The label of the notes.
 */
class CategoryAxisNotesLabelComponent extends CategoryAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisSelectComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('select', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisSelectComponentGenerated.propDecorators = {
    from: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    mousewheel: [{ type: Input }],
    to: [{ type: Input }]
};

/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from zero.
 * Categories with indexes in the
 * ([`select.from`]({% slug api_charts_categoryaxisselectcomponent %}#toc-from)
 * &mdash;[`select.to`]({% slug api_charts_categoryaxisselectcomponent %}#toc-to)) range will be selected.
 * This means that the last category in the range will not be included in the selection.
 * If the categories are dates, the range has to be also specified with date values.
 */
class CategoryAxisSelectComponent extends CategoryAxisSelectComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-select',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisSelectComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class CategoryAxisTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The configuration of the category axis title.
 */
class CategoryAxisTitleComponent extends CategoryAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ChartAreaComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('chartArea', configurationService);
        this.configurationService = configurationService;
    }
}
ChartAreaComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    height: [{ type: Input }],
    margin: [{ type: Input }],
    opacity: [{ type: Input }],
    width: [{ type: Input }]
};

/**
 * The configuration options of the Chart area.
 * Represents the entire visible area of the Chart
 * ([see example]({% slug chartarea_chart_charts %})).
 */
class ChartAreaComponent extends ChartAreaComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ChartAreaComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-area',
                template: ''
            },] },
];
/** @nocollapse */
ChartAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class LegendComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('legend', configurationService);
        this.configurationService = configurationService;
    }
}
LegendComponentGenerated.propDecorators = {
    align: [{ type: Input }],
    background: [{ type: Input }],
    border: [{ type: Input }],
    height: [{ type: Input }],
    labels: [{ type: Input }],
    margin: [{ type: Input }],
    offsetX: [{ type: Input }],
    offsetY: [{ type: Input }],
    orientation: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    reverse: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    markers: [{ type: Input }],
    spacing: [{ type: Input }],
    inactiveItems: [{ type: Input }],
    item: [{ type: Input }]
};

/**
 * The configuration options of the Chart legend
 * ([see example]({% slug legend_chart_charts %})).
 */
class LegendComponent extends LegendComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
LegendComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-legend',
                template: ''
            },] },
];
/** @nocollapse */
LegendComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class LegendInactiveItemsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('legend.inactiveItems', configurationService);
        this.configurationService = configurationService;
    }
}
LegendInactiveItemsComponentGenerated.propDecorators = {
    labels: [{ type: Input }]
};

/**
 * The configuration of the inactive Chart legend items.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-chart>
 *   <kendo-chart-legend>
 *      <kendo-chart-legend-inactive-items [labels]="{color: 'pink'}"></kendo-chart-legend-inactive-items>
 *   </kendo-chart-legend>
 * </kendo-chart>
 * ```
 */
class LegendInactiveItemsComponent extends LegendInactiveItemsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
LegendInactiveItemsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-legend-inactive-items',
                template: ''
            },] },
];
/** @nocollapse */
LegendInactiveItemsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class LegendItemComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('legend.item', configurationService);
        this.configurationService = configurationService;
    }
}
LegendItemComponentGenerated.propDecorators = {
    cursor: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The configuration of the Chart legend item.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-chart>
 *   <kendo-chart-legend>
 *      <kendo-chart-legend-item cursor="crosshair"></kendo-chart-legend-item>
 *   </kendo-chart-legend>
 * </kendo-chart>
 * ```
 */
class LegendItemComponent extends LegendItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
LegendItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-legend-item',
                template: ''
            },] },
];
/** @nocollapse */
LegendItemComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class PaneComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
PaneComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    clip: [{ type: Input }],
    height: [{ type: Input }],
    margin: [{ type: Input }],
    name: [{ type: Input }],
    padding: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * The configuration component for a Chart pane.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-chart>
 *         <kendo-chart-panes>
 *             <kendo-chart-pane name="top" background="pink" [border]="{ color: 'black', dashtype: 'dash', width: 2 }">
 *               <!--            ^^^^^^^^^^
 *                   Unique ID for the pane.
 *               -->
 *             </kendo-chart-pane>
 *             <kendo-chart-pane name="bottom" [height]="150" title="Bottom pane">
 *               <!--                          ^^^^^^^^^^^^^^
 *                   Note that the binding is required,
 *                   otherwise the property will be
 *                   bound to a '100' string.
 *               -->
 *             </kendo-chart-pane>
 *         </kendo-chart-panes>
 *
 *         <kendo-chart-value-axis>
 *             <kendo-chart-value-axis-item name="top">
 *               <!--                       ^^^^^^^^^^
 *                   Unique ID for the axis.
 *                   No need to set a pane as it will use the first,
 *                   'top' pane by default.
 *               -->
 *             </kendo-chart-value-axis-item>
 *             <kendo-chart-value-axis-item name="bottom"
 *                                          pane="bottom">
 *               <!--                       ^^^^^^^^^^^^^
 *                   Move the axis to the bottom pane.
 *               -->
 *             </kendo-chart-value-axis-item>
 *         </kendo-chart-value-axis>
 *         <kendo-chart-series>
 *           <kendo-chart-series-item [data]="seriesData[0]">
 *               <!-- Will use the first, 'top' value axis by default. -->
 *           </kendo-chart-series-item>
 *           <kendo-chart-series-item type="line" [data]="seriesData[1]" axis="bottom">
 *               <!-- Plot this series to the 'bottom' axis.              ^^^^^^^^^^^^^ -->
 *           </kendo-chart-series-item>
 *         </kendo-chart-series>
 *       </kendo-chart>
 *   `
 * })
 * export class AppComponent {
 *   public seriesData: number[][] = [[1, 2, 3, 5], [0, 1, 0, 1]];
 * }
 * ```
 */
class PaneComponent extends PaneComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
PaneComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-pane',
                template: ''
            },] },
];
/** @nocollapse */
PaneComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class PanesComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('panes', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
PanesComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [PaneComponent,] }]
};

/**
 * A collection of one or more pane configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-panes>
 *         <kendo-chart-pane name="topPane">
 *         </kendo-chart-pane>
 *         <kendo-chart-pane name="bottomPane">
 *         </kendo-chart-pane>
 *       </kendo-chart-panes>
 *       <kendo-chart-value-axis>
 *         <kendo-chart-value-axis-item pane="topPane">
 *         </kendo-chart-value-axis-item>
 *         <kendo-chart-value-axis-item name="bottomAxis" pane="bottomPane">
 *         </kendo-chart-value-axis-item>
 *       </kendo-chart-value-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3, 4]"
 *                                  axis="bottomAxis">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
class PanesComponent extends PanesComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
PanesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-panes',
                template: ''
            },] },
];
/** @nocollapse */
PanesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class PanesTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
PanesTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    position: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The configuration of the Chart pane title.
 */
class PanesTitleComponent extends PanesTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
PanesTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-pane-title',
                template: ''
            },] },
];
/** @nocollapse */
PanesTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class PlotAreaComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('plotArea', configurationService);
        this.configurationService = configurationService;
    }
}
PlotAreaComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    margin: [{ type: Input }],
    opacity: [{ type: Input }],
    padding: [{ type: Input }]
};

/**
 * The configuration options of the plot area
 * ([see example]({% slug plotarea_chart_charts %})).
 * The plot area is the area which displays the series.
 */
class PlotAreaComponent extends PlotAreaComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
PlotAreaComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-plot-area',
                template: ''
            },] },
];
/** @nocollapse */
PlotAreaComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('series', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
SeriesComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [SeriesItemComponent,] }]
};

/**
 * A collection of one or more series items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
class SeriesComponent extends SeriesComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService, tooltipTemplateService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.tooltipTemplateService = tooltipTemplateService;
    }
    ngAfterContentChecked() {
        this.readTooltipTemplates();
    }
    readTooltipTemplates() {
        const templates = this.children.map((item) => item.seriesTooltipTemplateRef);
        this.tooltipTemplateService.setSeriesTemplates(templates);
    }
}
SeriesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-series',
                template: ''
            },] },
];
/** @nocollapse */
SeriesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: TooltipTemplateService }
];

/**
 * @hidden
 */
class SeriesDefaultsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsComponentGenerated.propDecorators = {
    border: [{ type: Input }],
    gap: [{ type: Input }],
    overlay: [{ type: Input }],
    spacing: [{ type: Input }],
    stack: [{ type: Input }],
    type: [{ type: Input }],
    visual: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * The default options for all series
 * ([see example]({% slug series_chart_charts %}#toc-default-series-configuration)).
 */
class SeriesDefaultsComponent extends SeriesDefaultsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.labels', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};

/**
 * The configuration of the Chart series label.
 */
class SeriesDefaultsLabelsComponent extends SeriesDefaultsLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-labels',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsLabelsFromComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.labels.from', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsLabelsFromComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The `from` label configuration of the Chart series.
 */
class SeriesDefaultsLabelsFromComponent extends SeriesDefaultsLabelsFromComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsLabelsFromComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-labels-from',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsLabelsFromComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsLabelsToComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.labels.to', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsLabelsToComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The `to` label configuration of the Chart series.
 */
class SeriesDefaultsLabelsToComponent extends SeriesDefaultsLabelsToComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsLabelsToComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-labels-to',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsLabelsToComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.notes', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesComponentGenerated.propDecorators = {
    line: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};

/**
 * The configuration of the [`seriesDefaults`]({% slug api_charts_seriesdefaultscomponent %}) notes.
 */
class SeriesDefaultsNotesComponent extends SeriesDefaultsNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-notes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The icon of the notes.
 */
class SeriesDefaultsNotesIconComponent extends SeriesDefaultsNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The label of the notes.
 */
class SeriesDefaultsNotesLabelComponent extends SeriesDefaultsNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesDefaultsTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('seriesDefaults.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the Chart series tooltip.
 */
class SeriesDefaultsTooltipComponent extends SeriesDefaultsTooltipComponentGenerated {
    // Place custom properties here.
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesErrorBarsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('errorBars', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesErrorBarsComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    endCaps: [{ type: Input }],
    line: [{ type: Input }],
    value: [{ type: Input }],
    visual: [{ type: Input }],
    xValue: [{ type: Input }],
    yValue: [{ type: Input }]
};

/**
 * The error bars of the Chart series
 * ([see example]({% slug errorbars_chart_charts %})).
 */
class SeriesErrorBarsComponent extends SeriesErrorBarsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesErrorBarsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-error-bars',
                template: ''
            },] },
];
/** @nocollapse */
SeriesErrorBarsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesExtremesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('extremes', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesExtremesComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    rotation: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }]
};

/**
 * The configuration of the Chart series extremes.
 * Applies to extreme outliers.
 * For more information, refer to [`series.outliers`]({% slug api_charts_seriesitemcomponent %}#toc-outliers).
 */
class SeriesExtremesComponent extends SeriesExtremesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesExtremesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-extremes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesExtremesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesHighlightComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('highlight', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesHighlightComponentGenerated.propDecorators = {
    border: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    markers: [{ type: Input }],
    opacity: [{ type: Input }],
    toggle: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The Chart series highlighting configuration options.
 */
class SeriesHighlightComponent extends SeriesHighlightComponentGenerated {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesHighlightComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-highlight',
                template: ''
            },] },
];
/** @nocollapse */
SeriesHighlightComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesLabelsComponentGenerated.propDecorators = {
    align: [{ type: Input }],
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    distance: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};

/**
 * The configuration of the Chart series label
 * ([see example]({% slug labels_chart_charts %})).
 */
class SeriesLabelsComponent extends SeriesLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
SeriesLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesLabelsFromComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels.from', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesLabelsFromComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The `from` label configuration of the Chart series.
 */
class SeriesLabelsFromComponent extends SeriesLabelsFromComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesLabelsFromComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-labels-from',
                template: ''
            },] },
];
/** @nocollapse */
SeriesLabelsFromComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesLabelsToComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels.to', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesLabelsToComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The `to` label configuration of the Chart series.
 */
class SeriesLabelsToComponent extends SeriesLabelsToComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesLabelsToComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-labels-to',
                template: ''
            },] },
];
/** @nocollapse */
SeriesLabelsToComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesMarkersComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('markers', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesMarkersComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    rotation: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }],
    from: [{ type: Input }],
    to: [{ type: Input }]
};

/**
 * The configuration of the Chart series marker.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *       selector: 'my-app',
 *   template: `
 *       <kendo-chart [categoryAxis]="{ categories: categories }">
 *           <kendo-chart-title text="Gross domestic product growth /GDP annual %/"></kendo-chart-title>
 *           <kendo-chart-legend position="bottom" orientation="horizontal"></kendo-chart-legend>
 *           <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
 *           <kendo-chart-series>
 *               <kendo-chart-series-item *ngFor="let item of series"
 *                   type="line"
 *                   style="smooth"
 *                   [data]="item.data"
 *                   [name]="item.name"
 *                   [markers]="item.markers">
 *               </kendo-chart-series-item>
 *           </kendo-chart-series>
 *       </kendo-chart>
 *   `
 * })
 * export class AppComponent {
 * public series: any[] = [{
 *   name: "India",
 *   data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855],
 *   markers: {
 *     background: 'red',
 *     size: 20,
 *     type: 'circle'
 *   }
 * }, {
 *   name: "Russian Federation",
 *   data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3],
 *   markers: {
 *     background: 'yellow',
 *     size: 10,
 *     type: 'square',
 *     rotation: 45
 *   }
 * }, {
 *   name: "Germany",
 *   data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995],
 *   markers: {
 *     background: 'green',
 *     size: 20,
 *     type: 'triangle'
 *   }
 * },{
 *   name: "World",
 *   data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727],
 *   markers: {
 *     background: 'blue',
 *     size: 10,
 *     type: 'cross'
 *   }
 * }];
 * public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
 * }
 * ```
 */
class SeriesMarkersComponent extends SeriesMarkersComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesMarkersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-markers',
                template: ''
            },] },
];
/** @nocollapse */
SeriesMarkersComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesComponentGenerated.propDecorators = {
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};

/**
 * The series notes configuration
 * ([see example]({% slug notes_chart_charts %})).
 */
class SeriesNotesComponent extends SeriesNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The icon of the notes.
 */
class SeriesNotesIconComponent extends SeriesNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
SeriesNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The label of the notes.
 */
class SeriesNotesLabelComponent extends SeriesNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
SeriesNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class SeriesOutliersComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('outliers', configurationService);
        this.configurationService = configurationService;
    }
}
SeriesOutliersComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    rotation: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }]
};

/**
 * The configuration of the Chart series outliers.
 * Applies to mild outliers.
 * For more information, refer to the [`series.extremes`]({% slug api_charts_seriesitemcomponent %}#toc-extremes) option.
 */
class SeriesOutliersComponent extends SeriesOutliersComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesOutliersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-outliers',
                template: ''
            },] },
];
/** @nocollapse */
SeriesOutliersComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class TitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
TitleComponentGenerated.propDecorators = {
    align: [{ type: Input }],
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the Chart title or text
 * ([see example]({% slug title_chart_charts %})).
 *
 * @example
 * ```ts-preview
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-chart [categoryAxis]="{ categories: categories }">
 *            <kendo-chart-title text="Gross domestic product growth /GDP annual %/"></kendo-chart-title>
 *            <kendo-chart-legend
 *              position="bottom"
 *              orientation="horizontal"
 *              align="end"
 *              background="rgba(255, 0, 0, 0.1)"
 *              [border]="borderOptions"
 *              [margin]="10"
 *              [padding]="10"
 *              [width]="150"
 *              [offsetX]="11"
 *              [offsetY]="-103"
 *              [reverse]="true"
 *              [visible]="isVisible"
 *              ></kendo-chart-legend>
 *            <kendo-chart-tooltip format="{0}%"></kendo-chart-tooltip>
 *            <kendo-chart-series>
 *                <kendo-chart-series-item *ngFor="let item of series"
 *                    type="line" style="smooth" [data]="item.data" [name]="item.name">
 *                </kendo-chart-series-item>
 *            </kendo-chart-series>
 *        </kendo-chart>
 *        <br /><br />
 *        <button class="k-button" (click)="isVisible=!isVisible">Toggle Legend</button>
 *    `
 * })
 * export class AppComponent {
 *  public isVisible = true;
 *  public borderOptions = {
 *    color: "rgba(255, 0, 0, 0.8)",
 *    dashType: 'dash',
 *    width: 2
 *  };
 *
 * public series: any[] = [{
 *   name: "India",
 *   data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
 * }, {
 *   name: "Russian Federation",
 *   data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
 * }, {
 *   name: "Germany",
 *   data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
 * },{
 *   name: "World",
 *   data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
 * }];
 *  public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
 * }
 * ```
 */
class TitleComponent extends TitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
TitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-title',
                template: ''
            },] },
];
/** @nocollapse */
TitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class TooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
TooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    opacity: [{ type: Input }],
    padding: [{ type: Input }],
    shared: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
class TooltipComponent extends TooltipComponentGenerated {
    constructor(configurationService, templateService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.templateService = templateService;
        this.markAsVisible();
    }
    ngAfterContentChecked() {
        this.templateService.setTemplate(this.seriesTooltipTemplate ? this.seriesTooltipTemplate.templateRef : null);
        this.templateService.setSharedTemplate(this.sharedTooltipTemplate ? this.sharedTooltipTemplate.templateRef : null);
    }
}
TooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-chart-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
TooltipComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: TooltipTemplateService }
];
TooltipComponent.propDecorators = {
    seriesTooltipTemplate: [{ type: ContentChild, args: [SeriesTooltipTemplateDirective,] }],
    sharedTooltipTemplate: [{ type: ContentChild, args: [SharedTooltipTemplateDirective,] }]
};

/**
 * @hidden
 */
class ValueAxisItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisItemComponentGenerated.propDecorators = {
    axisCrossingValue: [{ type: Input }],
    background: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    majorGridLines: [{ type: Input }],
    majorTicks: [{ type: Input }],
    majorUnit: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    minorGridLines: [{ type: Input }],
    minorTicks: [{ type: Input }],
    minorUnit: [{ type: Input }],
    name: [{ type: Input }],
    narrowRange: [{ type: Input }],
    pane: [{ type: Input }],
    plotBands: [{ type: Input }],
    reverse: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * The configuration component for a value axis.
 */
class ValueAxisItemComponent extends ValueAxisItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-value-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class ValueAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('valueAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [ValueAxisItemComponent,] }]
};

/**
 * A collection of one or more value axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-value-axis>
 *         <kendo-chart-value-axis-item>
 *         </kendo-chart-value-axis-item>
 *         <kendo-chart-value-axis-item name="secondAxis">
 *         </kendo-chart-value-axis-item>
 *       </kendo-chart-value-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *         <kendo-chart-series-item type="line" [data]="[0.1, 0.2, 0.3]"
 *                                  axis="secondAxis">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 *
 * ```
 */
class ValueAxisComponent extends ValueAxisComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
ValueAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-value-axis',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class ValueAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
class ValueAxisCrosshairComponent extends ValueAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
ValueAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ValueAxisCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
class ValueAxisCrosshairTooltipComponent extends ValueAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here.
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
ValueAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ValueAxisLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The axis labels configuration.
 */
class ValueAxisLabelsComponent extends ValueAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ValueAxisNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesComponentGenerated.propDecorators = {
    data: [{ type: Input }],
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};

/**
 * The configuration of the value axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
class ValueAxisNotesComponent extends ValueAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ValueAxisNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The icon of the notes.
 */
class ValueAxisNotesIconComponent extends ValueAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ValueAxisNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The label of the notes.
 */
class ValueAxisNotesLabelComponent extends ValueAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ValueAxisTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The title configuration of the value axis.
 */
class ValueAxisTitleComponent extends ValueAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
    }
}
XAxisItemComponentGenerated.propDecorators = {
    axisCrossingValue: [{ type: Input }],
    background: [{ type: Input }],
    baseUnit: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    majorGridLines: [{ type: Input }],
    majorTicks: [{ type: Input }],
    majorUnit: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    minorGridLines: [{ type: Input }],
    minorTicks: [{ type: Input }],
    minorUnit: [{ type: Input }],
    name: [{ type: Input }],
    narrowRange: [{ type: Input }],
    pane: [{ type: Input }],
    plotBands: [{ type: Input }],
    reverse: [{ type: Input }],
    startAngle: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }],
    weekStartDay: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * The configuration component for an X axis
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
class XAxisItemComponent extends XAxisItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService, intl, localeId) {
        super(configurationService, collectionService, intl, localeId);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.intl = intl;
    }
}
XAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-x-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
XAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: IntlService },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * @hidden
 */
class XAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('xAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
XAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [XAxisItemComponent,] }]
};

/**
 * A collection of one or more X-axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *  selector: 'my-app',
 * template: `
 *   <kendo-chart>
 *     <kendo-chart-x-axis>
 *       <kendo-chart-x-axis-item
 *         [background]="'rgba(100, 100, 100, 0.2)'"
 *         [color]="'red'"
 *         [notes]="notesConfig"
 *         [crosshair]="crosshairConfig">
 *       </kendo-chart-x-axis-item>
 *       <kendo-chart-x-axis-item name="secondAxis">
 *       </kendo-chart-x-axis-item>
 *     </kendo-chart-x-axis>
 *     <kendo-chart-series>
 *       <kendo-chart-series-item type="scatter" [data]="[[1, 2]]">
 *       </kendo-chart-series-item>
 *       <kendo-chart-series-item type="scatter" [data]="[[0.1, 0.2]]"
 *                                xAxis="secondAxis">
 *       </kendo-chart-series-item>
 *     </kendo-chart-series>
 *   </kendo-chart>
 * `
 * })
 * export class AppComponent {
 * public notesConfig = {
 *   data: [{
 *       value: 0.2,
 *       text: "foo"
 *     }, {
 *       value: 0.8,
 *       text: "bar"
 *     }],
 *   label: {
 *     content: (args: any) => args.dataItem.text,
 *     background: 'red',
 *     color: 'white'
 *   },
 *   line: {
 *     color: 'blue',
 *     dashType: 'dash',
 *     length: 150,
 *     width: 2
 *   },
 *   position: 'top'
 * };
 *
 * public crosshairConfig = {
 *   color: 'green',
 *   opacity: 0.8,
 *   visible: true,
 *   width: 3
 * };
 * }
 *
 * ```
 */
class XAxisComponent extends XAxisComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
XAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-x-axis',
                template: ''
            },] },
];
/** @nocollapse */
XAxisComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class XAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
class XAxisCrosshairComponent extends XAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
XAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
XAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
class XAxisCrosshairTooltipComponent extends XAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here.
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
XAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
XAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    culture: [{ type: Input }],
    dateFormats: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The axis labels configuration.
 */
class XAxisLabelsComponent extends XAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
XAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesComponentGenerated.propDecorators = {
    data: [{ type: Input }],
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};

/**
 * The configuration of the X-axis notes.
 * For an example on the basic usage of the XAxisNotesComponent,
 * refer to the [demo on the XAxisComponent]({% slug api_charts_xaxiscomponent %})
 * or to the documentation about the
 * [axis notes]({% slug notes_chart_charts %}#toc-axis-notes).
 */
class XAxisNotesComponent extends XAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
XAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The icon of the notes.
 */
class XAxisNotesIconComponent extends XAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
XAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The label of the notes.
 */
class XAxisNotesLabelComponent extends XAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
XAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class XAxisTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
XAxisTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The title configuration of the Scatter Chart X axis.
 */
class XAxisTitleComponent extends XAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
XAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-x-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
XAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisItemComponentGenerated extends CollectionItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
YAxisItemComponentGenerated.propDecorators = {
    axisCrossingValue: [{ type: Input }],
    background: [{ type: Input }],
    baseUnit: [{ type: Input }],
    color: [{ type: Input }],
    line: [{ type: Input }],
    majorGridLines: [{ type: Input }],
    majorTicks: [{ type: Input }],
    majorUnit: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    minorGridLines: [{ type: Input }],
    minorTicks: [{ type: Input }],
    minorUnit: [{ type: Input }],
    name: [{ type: Input }],
    narrowRange: [{ type: Input }],
    pane: [{ type: Input }],
    plotBands: [{ type: Input }],
    reverse: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }],
    crosshair: [{ type: Input }],
    labels: [{ type: Input }],
    notes: [{ type: Input }],
    title: [{ type: Input }]
};

/**
 * The configuration component for the Y axis
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
class YAxisItemComponent extends YAxisItemComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
YAxisItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-y-axis-item',
                template: ''
            },] },
];
/** @nocollapse */
YAxisItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class YAxisComponentGenerated extends CollectionComponent {
    constructor(configurationService, collectionService) {
        super('yAxis', configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
YAxisComponentGenerated.propDecorators = {
    children: [{ type: ContentChildren, args: [YAxisItemComponent,] }]
};

/**
 * A collection of one or more Y-axis configuration components.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *  selector: 'my-app',
 *  template: `
 *    <kendo-chart>
 *     <kendo-chart-y-axis>
 *       <kendo-chart-y-axis-item
 *         [background]="'rgba(100, 100, 100, 0.2)'"
 *         [color]="'red'"
 *         [notes]="notesConfig"
 *         [crosshair]="crosshairConfig">
 *       </kendo-chart-y-axis-item>
 *       <kendo-chart-y-axis-item name="secondAxis">
 *       </kendo-chart-y-axis-item>
 *     </kendo-chart-y-axis>
 *     <kendo-chart-series>
 *       <kendo-chart-series-item type="scatter" [data]="[[1, 2]]">
 *       </kendo-chart-series-item>
 *       <kendo-chart-series-item type="scatter" [data]="[[0.1, 0.2]]"
 *                                yAxis="secondAxis">
 *       </kendo-chart-series-item>
 *     </kendo-chart-series>
 *   </kendo-chart>
 * `
 * })
 * export class AppComponent {
 * public notesConfig = {
 *   data: [{
 *       value: 0.2,
 *       text: "foo"
 *     }, {
 *       value: 0.8,
 *       text: "bar"
 *     }],
 *    label: {
 *     content: (args: any) => args.dataItem.text,
 *     background: 'red',
 *     color: 'white'
 *   },
 *   line: {
 *     color: 'blue',
 *     dashType: 'dash',
 *     length: 150,
 *     width: 2
 *   },
 *   position: 'top'
 * };
 *
 * public crosshairConfig = {
 *   color: 'green',
 *   opacity: 0.8,
 *   visible: true,
 *   width: 3
 * };
 * }
 *
 * ```
 */
class YAxisComponent extends YAxisComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
YAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-y-axis',
                template: ''
            },] },
];
/** @nocollapse */
YAxisComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * @hidden
 */
class YAxisCrosshairComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisCrosshairComponentGenerated.propDecorators = {
    color: [{ type: Input }],
    opacity: [{ type: Input }],
    visible: [{ type: Input }],
    width: [{ type: Input }],
    tooltip: [{ type: Input }]
};

/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
class YAxisCrosshairComponent extends YAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
YAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
YAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisCrosshairTooltipComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('crosshair.tooltip', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisCrosshairTooltipComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    padding: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
class YAxisCrosshairTooltipComponent extends YAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here.
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
YAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
YAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisLabelsComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('labels', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisLabelsComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    culture: [{ type: Input }],
    dateFormats: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    margin: [{ type: Input }],
    mirror: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    skip: [{ type: Input }],
    step: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The axis labels configuration.
 */
class YAxisLabelsComponent extends YAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
YAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisNotesComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesComponentGenerated.propDecorators = {
    data: [{ type: Input }],
    line: [{ type: Input }],
    position: [{ type: Input }],
    visual: [{ type: Input }],
    icon: [{ type: Input }],
    label: [{ type: Input }]
};

/**
 * The configuration of the Y axis notes
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
class YAxisNotesComponent extends YAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
YAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisNotesIconComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.icon', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesIconComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    size: [{ type: Input }],
    type: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The icon of the notes.
 */
class YAxisNotesIconComponent extends YAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
YAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisNotesLabelComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('notes.label', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesLabelComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    content: [{ type: Input }],
    font: [{ type: Input }],
    format: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The label of the notes.
 */
class YAxisNotesLabelComponent extends YAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
YAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class YAxisTitleComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('title', configurationService);
        this.configurationService = configurationService;
    }
}
YAxisTitleComponentGenerated.propDecorators = {
    background: [{ type: Input }],
    border: [{ type: Input }],
    color: [{ type: Input }],
    font: [{ type: Input }],
    margin: [{ type: Input }],
    padding: [{ type: Input }],
    position: [{ type: Input }],
    rotation: [{ type: Input }],
    text: [{ type: Input }],
    visible: [{ type: Input }],
    visual: [{ type: Input }]
};

/**
 * The title configuration of the Scatter Chart Y axis.
 */
class YAxisTitleComponent extends YAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
YAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
class ZoomableComponentGenerated extends SettingsComponent {
    constructor(configurationService) {
        super('zoomable', configurationService);
        this.configurationService = configurationService;
    }
}
ZoomableComponentGenerated.propDecorators = {
    mousewheel: [{ type: Input }],
    selection: [{ type: Input }]
};

/**
 * Specifies if the Chart can be zoomed.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-chart>
 *   <kendo-chart-zoomable [mousewheel]="false"></kendo-chart-zoomable>
 * </kendo-chart>
 * ```
 */
class ZoomableComponent extends ZoomableComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ZoomableComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-zoomable',
                template: ''
            },] },
];
/** @nocollapse */
ZoomableComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
const CHART_DIRECTIVES = [
    ChartComponent,
    TooltipPopupComponent,
    SeriesTooltipTemplateDirective,
    SharedTooltipTemplateDirective,
    CrosshairTooltipsContainerComponent,
    CrosshairTooltipComponent,
    DonutCenterTemplateDirective,
    AxisDefaultsComponent,
    AxisDefaultsCrosshairComponent,
    AxisDefaultsCrosshairTooltipComponent,
    AxisDefaultsLabelsComponent,
    AxisDefaultsTitleComponent,
    CategoryAxisComponent,
    CategoryAxisCrosshairComponent,
    CategoryAxisCrosshairTooltipComponent,
    CategoryAxisItemComponent,
    CategoryAxisLabelsComponent,
    CategoryAxisNotesComponent,
    CategoryAxisNotesIconComponent,
    CategoryAxisNotesLabelComponent,
    CategoryAxisSelectComponent,
    CategoryAxisTitleComponent,
    ChartAreaComponent,
    LegendComponent,
    LegendInactiveItemsComponent,
    LegendItemComponent,
    PaneComponent,
    PanesComponent,
    PanesTitleComponent,
    PlotAreaComponent,
    SeriesComponent,
    SeriesDefaultsComponent,
    SeriesDefaultsLabelsComponent,
    SeriesDefaultsLabelsFromComponent,
    SeriesDefaultsLabelsToComponent,
    SeriesDefaultsNotesComponent,
    SeriesDefaultsNotesIconComponent,
    SeriesDefaultsNotesLabelComponent,
    SeriesDefaultsTooltipComponent,
    SeriesErrorBarsComponent,
    SeriesExtremesComponent,
    SeriesHighlightComponent,
    SeriesItemComponent,
    SeriesLabelsComponent,
    SeriesLabelsFromComponent,
    SeriesLabelsToComponent,
    SeriesMarkersComponent,
    SeriesNotesComponent,
    SeriesNotesIconComponent,
    SeriesNotesLabelComponent,
    SeriesOutliersComponent,
    SeriesTooltipComponent,
    TitleComponent,
    TooltipComponent,
    ValueAxisComponent,
    ValueAxisCrosshairComponent,
    ValueAxisCrosshairTooltipComponent,
    ValueAxisItemComponent,
    ValueAxisLabelsComponent,
    ValueAxisNotesComponent,
    ValueAxisNotesIconComponent,
    ValueAxisNotesLabelComponent,
    ValueAxisTitleComponent,
    XAxisComponent,
    XAxisCrosshairComponent,
    XAxisCrosshairTooltipComponent,
    XAxisItemComponent,
    XAxisLabelsComponent,
    XAxisNotesComponent,
    XAxisNotesIconComponent,
    XAxisNotesLabelComponent,
    XAxisTitleComponent,
    YAxisComponent,
    YAxisCrosshairComponent,
    YAxisCrosshairTooltipComponent,
    YAxisItemComponent,
    YAxisLabelsComponent,
    YAxisNotesComponent,
    YAxisNotesIconComponent,
    YAxisNotesLabelComponent,
    YAxisTitleComponent,
    ZoomableComponent
];

// Re-export event types

/**
 * The arguments for the `navigatorFilter` event.
 */
class NavigatorFilterEvent extends BaseEvent {
    /**
     * Constructs the event arguments from a raw object.
     */
    constructor(e, sender) {
        super(sender);
        this.from = e.from;
        this.to = e.to;
    }
}

// Re-export event types

/**
 * @hidden
 */
class RootConfigurationService extends ConfigurationService {
}
RootConfigurationService.decorators = [
    { type: Injectable },
];

const EVENT_MAP$1 = {
    navigatorFilter: NavigatorFilterEvent
};
/**
 * @hidden
 */
class StockInstanceEventService extends InstanceEventService {
    create(name, args, sender) {
        if (EVENT_MAP$1[name]) {
            return new EVENT_MAP$1[name](args, sender);
        }
        return super.create(name, args, sender);
    }
}

const NAVIGATOR_DEFAULTS = {
    autoBindElements: true,
    liveDrag: false,
    partialRedraw: true
};
/* tslint:disable:no-access-missing-member */
/**
 * The root StockChart component.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-stockchart>
 *         <kendo-chart-series>
 *             <kendo-chart-series-item type="line" [data]="data" field="value" categoryField="date">
 *             </kendo-chart-series-item>
 *         </kendo-chart-series>
 *         <kendo-chart-navigator>
 *             <kendo-chart-navigator-select to="2017/02/01">
 *             </kendo-chart-navigator-select>
 *             <kendo-chart-navigator-series>
 *                 <kendo-chart-navigator-series-item type="area" [data]="data" field="value" categoryField="date">
 *                 </kendo-chart-navigator-series-item>
 *             </kendo-chart-navigator-series>
 *         </kendo-chart-navigator>
 *     </kendo-stockchart>
 *   `
 * })
 * class AppComponent {
 *   public data: any[] = [];
 *
 *   constructor() {
 *      for (let idx = 0; idx < 100; idx++) {
 *          this.data.push({
 *              date: new Date(2017, 0, idx),
 *              value: Math.random() * 100
 *          });
 *      }
 *   }
 * }
 *
 * ```
 */
class StockChartComponent extends ChartComponent {
    constructor(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        super(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer);
        this.configurationService = configurationService;
        this.themeService = themeService;
        this.element = element;
        this.intl = intl;
        this.localizationService = localizationService;
        this.ngZone = ngZone;
        this.instanceEventService = instanceEventService;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        /**
         * Fires when the navigator range is changed.
         */
        this.navigatorFilter = new EventEmitter();
        this.redrawSlaves = false;
    }
    /**
     * If called, the navigator pane is not redrawn the next time the StockChart options are updated.
     * The method is useful if you need to update only the main series data for the selected period.
     */
    skipNavigatorRedraw() {
        this.redrawSlaves = true;
    }
    createInstance(element, observer) {
        this.applyNavigatorDefaults();
        if (this.isDevMode() && (this.options.zoomable || this.options.pannable)) {
            throw new Error('The pannable and zoomable options are not supported by the StockChart component.');
        }
        this.instance = new StockChart(element, this.options, this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    }
    updateOptions() {
        this.applyNavigatorDefaults();
        if (this.redrawSlaves) {
            this.instance.applyOptions(this.options);
            this.instance.bindCategories();
            this.instance.navigator.redrawSlaves();
        }
        else {
            this.instance.setOptions(this.options);
        }
        this.redrawSlaves = false;
    }
    applyNavigatorDefaults() {
        this.options.navigator = Object.assign({}, this.options.navigator, NAVIGATOR_DEFAULTS);
    }
    isDevMode() {
        return isDevMode();
    }
}
StockChartComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendoStockChart',
                // required because the class should not be inheritted
                // tslint:disable-next-line
                host: {
                    '[class.k-chart]': 'className',
                    '[class.k-stockchart]': 'className'
                },
                providers: [
                    ConfigurationService,
                    TooltipTemplateService,
                    { provide: RootConfigurationService, useExisting: ConfigurationService },
                    StockInstanceEventService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.chart'
                    }
                ],
                selector: 'kendo-stockchart',
                template: `
        <div #surface class="k-chart-surface"></div>
        <kendo-chart-crosshair-tooltips-container [popupSettings]="popupSettings">
        </kendo-chart-crosshair-tooltips-container>
        <kendo-chart-tooltip-popup (leave)="tooltipMouseleave($event)" [popupSettings]="popupSettings">
        </kendo-chart-tooltip-popup>
        <kendo-resize-sensor (resize)="onResize($event)"></kendo-resize-sensor>
    `
            },] },
];
/** @nocollapse */
StockChartComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: ElementRef },
    { type: IntlService },
    { type: LocalizationService },
    { type: NgZone },
    { type: StockInstanceEventService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
StockChartComponent.propDecorators = {
    navigator: [{ type: Input }],
    pannable: [{ type: Input }],
    zoomable: [{ type: Input }],
    navigatorFilter: [{ type: Output }]
};

/**
 * @hidden
 */
const PREFIX = new InjectionToken('configuration prefix');
/**
 * @hidden
 */
class PrefixConfigurationService extends ConfigurationService {
    constructor(rootService, prefix, ngZone) {
        super(ngZone);
        this.rootService = rootService;
        this.prefix = prefix;
    }
    push(store) {
        this.rootService.notify(new Change(this.prefix, store));
    }
    notify(change) {
        change.key = this.prefix + (change.key ? `.${change.key}` : '');
        this.rootService.notify(change);
    }
}
PrefixConfigurationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PrefixConfigurationService.ctorParameters = () => [
    { type: RootConfigurationService, decorators: [{ type: Inject, args: [RootConfigurationService,] }] },
    { type: String, decorators: [{ type: Inject, args: [PREFIX,] }] },
    { type: NgZone }
];

/**
 * The configuration options of the navigator
 * ([see runnable example]]({% slug overview_stockchart_charts %}#toc-navigator)).
 *
 * @example
 * ```ts-no-run
 * _@Component({
 *     selector: 'my-app',
 *       template: `
 *         <kendo-stockchart (navigatorFilter)="onNavigatorFilter($event)">
 *             <kendo-chart-series>
 *                <kendo-chart-series-item
 *                type="candlestick"
 *                 [data]="seriesData"
 *                 openField="Open"
 *                 closeField="Close"
 *                 lowField="Low"
 *                 highField="High"
 *                 categoryField="Date">
 *             </kendo-chart-series-item>
 *          </kendo-chart-series>
 *          <kendo-chart-navigator
 *            [categoryAxis]="categoryAxisOptions"
 *            [hint]="hintOptions"
 *            [pane]="paneOptions"
 *            [visible]="isVisible">
 *            <kendo-chart-navigator-select [from]="from" [to]="to">
 *            </kendo-chart-navigator-select>
 *            <kendo-chart-navigator-series>
 *              <kendo-chart-navigator-series-item type="area" [data]="navigatorData" field="Close" categoryField="Date">
 *              </kendo-chart-navigator-series-item>
 *           </kendo-chart-navigator-series>
 *          </kendo-chart-navigator>
 *        </kendo-stockchart>
 *        <br /><br />
 *        <button class="k-button" (click)="isVisible = !isVisible">Toggle Navigator</button>
 *    `
 * })
 * ```
 */
class NavigatorComponent extends SettingsComponent {
    constructor(configurationService) {
        super('', configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: PREFIX, useValue: 'navigator' }, { provide: ConfigurationService, useClass: PrefixConfigurationService }],
                selector: 'kendo-chart-navigator',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
NavigatorComponent.propDecorators = {
    visible: [{ type: Input }],
    categoryAxis: [{ type: Input }],
    hint: [{ type: Input }],
    pane: [{ type: Input }],
    select: [{ type: Input }],
    series: [{ type: Input }]
};

/**
 * The configuration component of the navigator category axis.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-stockchart>
 *   <kendo-chart-navigator>
 *     <kendo-chart-navigator-category-axis
 *       color="maroon"
 *       [labels]="{color: 'green'}">
 *     </kendo-chart-navigator-category-axis>
 *   </kendo-chart-navigator>
 * </kendo-stockchart>
 * ```
 */
class NavigatorCategoryAxisComponent extends CategoryAxisItemComponent {
    constructor(configurationService, intl, localeId) {
        super(configurationService, null, intl, localeId);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{
                        provide: PREFIX,
                        useValue: 'navigator.categoryAxis'
                    }, {
                        provide: ConfigurationService,
                        useClass: PrefixConfigurationService
                    }],
                selector: 'kendo-chart-navigator-category-axis',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: IntlService },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];

/**
 * The configuration options of the crosshair.
 */
class NavigatorCategoryAxisCrosshairComponent extends CategoryAxisCrosshairComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
class NavigatorCategoryAxisCrosshairTooltipComponent extends CategoryAxisCrosshairTooltipComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration of the axis labels.
 */
class NavigatorCategoryAxisLabelsComponent extends CategoryAxisLabelsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-labels',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration of the category axis notes.
 */
class NavigatorCategoryAxisNotesComponent extends CategoryAxisNotesComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The icon of the notes.
 */
class NavigatorCategoryAxisNotesIconComponent extends CategoryAxisNotesIconComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The label of the notes.
 */
class NavigatorCategoryAxisNotesLabelComponent extends CategoryAxisNotesLabelComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from zero.
 * Categories with indexes in the range (`select.from`, `select.to`) will be selected.
 * This means that the last category in the range will not be included in the selection.
 * If the categories are dates, the range has also to be specified with date values.
 */
class NavigatorCategoryAxisSelectComponent extends CategoryAxisSelectComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisSelectComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The title configuration of the navigator category axis.
 */
class NavigatorCategoryAxisTitleComponent extends CategoryAxisTitleComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-title',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The default options of the navigator hint
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
class NavigatorHintComponent extends SettingsComponent {
    constructor(configurationService) {
        super('hint', configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorHintComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-hint',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorHintComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
NavigatorHintComponent.propDecorators = {
    content: [{ type: Input }],
    format: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * The configuration component of the navigator pane
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
class NavigatorPaneComponent extends PaneComponentGenerated {
    constructor(configurationService) {
        super(configurationService, null);
        this.configurationService = configurationService;
    }
}
NavigatorPaneComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: PREFIX, useValue: 'navigator.pane' }, { provide: ConfigurationService, useClass: PrefixConfigurationService }],
                selector: 'kendo-chart-navigator-pane',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorPaneComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The title configuration of the StockChart navigator pane.
 */
class NavigatorPaneTitleComponent extends PanesTitleComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorPaneTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-pane-title',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorPaneTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * Specifies the initially selected range.
 * If no range is specified, the full range of values is rendered.
 */
class NavigatorSelectComponent extends SettingsComponent {
    constructor(configurationService) {
        super('select', configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSelectComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
NavigatorSelectComponent.propDecorators = {
    from: [{ type: Input }],
    to: [{ type: Input }],
    mousewheel: [{ type: Input }]
};

/**
 * The configuration component of a navigator series item
 * ([see example]({% slug navigator_stockchart_charts %})).
 */
class NavigatorSeriesItemComponent extends SeriesItemComponent {
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
NavigatorSeriesItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ConfigurationService],
                selector: 'kendo-chart-navigator-series-item',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesItemComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];

/**
 * A collection of one or more navigator series items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-stockchart>
 *         <kendo-chart-navigator>
 *             <kendo-chart-navigator-series>
 *                 <kendo-chart-navigator-series-item type="area" [data]="data" field="value" categoryField="date">
 *                 </kendo-chart-navigator-series-item>
 *             </kendo-chart-navigator-series>
 *         </kendo-chart-navigator>
 *     </kendo-stockchart>
 *   `
 * })
 * class AppComponent {
 *   public data: any[] = [];
 *
 *   constructor() {
 *      for (let idx = 0; idx < 100; idx++) {
 *          this.data.push({
 *              date: new Date(2017, 0, idx),
 *              value: Math.random() * 100
 *          });
 *      }
 *   }
 * }
 *
 * ```
 */
class NavigatorSeriesComponent extends SeriesComponent {
    constructor(configurationService, collectionService, tooltipTemplateService) {
        super(configurationService, collectionService, tooltipTemplateService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.tooltipTemplateService = tooltipTemplateService;
    }
    readTooltipTemplates() {
    }
}
NavigatorSeriesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-navigator-series',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService },
    { type: TooltipTemplateService }
];
NavigatorSeriesComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [NavigatorSeriesItemComponent,] }]
};

/**
 * The error bars of the StockChart navigator series.
 */
class NavigatorSeriesErrorBarsComponent extends SeriesErrorBarsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesErrorBarsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-error-bars',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesErrorBarsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The extremes configuration of the StockChart navigator series. Applies to extreme outliers.
 */
class NavigatorSeriesExtremesComponent extends SeriesExtremesComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesExtremesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-extremes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesExtremesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The configuration options of the StockChart series highlight.
 */
class NavigatorSeriesHighlightComponent extends SeriesHighlightComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesHighlightComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-highlight',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesHighlightComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The label configuration of the StockChart navigator series.
 */
class NavigatorSeriesLabelsComponent extends SeriesLabelsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
NavigatorSeriesLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The `from` label configuration of the StockChart navigator series.
 */
class NavigatorSeriesLabelsFromComponent extends SeriesLabelsFromComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
NavigatorSeriesLabelsFromComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-labels-from',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesLabelsFromComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The `to` label configuration of the StockChart navigator series.
 */
class NavigatorSeriesLabelsToComponent extends SeriesLabelsToComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
NavigatorSeriesLabelsToComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-labels-to',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesLabelsToComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The marker configuration of the StockChart navigator series.
 */
class NavigatorSeriesMarkersComponent extends SeriesMarkersComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesMarkersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-markers',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesMarkersComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The notes configuration of the StockChart navigator series.
 */
class NavigatorSeriesNotesComponent extends SeriesNotesComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The icon of the notes.
 */
class NavigatorSeriesNotesIconComponent extends SeriesNotesIconComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The label of the notes.
 */
class NavigatorSeriesNotesLabelComponent extends SeriesNotesLabelComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The outliers configuration of the StockChart navigator series. Applies to mild outliers.
 */
class NavigatorSeriesOutliersComponent extends SeriesOutliersComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesOutliersComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-outliers',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesOutliersComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * The tooltip configuration of the StockChart navigator series.
 * The StockChart navigator series tooltip is displayed when the `navigator.series.tooltip.visible` option is set to `true`.
 */
class NavigatorSeriesTooltipComponent extends SeriesTooltipComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];

/**
 * @hidden
 */
const STOCK_CHART_DIRECTIVES = [
    StockChartComponent,
    NavigatorComponent,
    NavigatorCategoryAxisComponent,
    NavigatorCategoryAxisCrosshairComponent,
    NavigatorCategoryAxisCrosshairTooltipComponent,
    NavigatorCategoryAxisLabelsComponent,
    NavigatorCategoryAxisNotesComponent,
    NavigatorCategoryAxisNotesIconComponent,
    NavigatorCategoryAxisNotesLabelComponent,
    NavigatorCategoryAxisSelectComponent,
    NavigatorCategoryAxisTitleComponent,
    NavigatorHintComponent,
    NavigatorPaneComponent,
    NavigatorPaneTitleComponent,
    NavigatorSelectComponent,
    NavigatorSeriesComponent,
    NavigatorSeriesItemComponent,
    NavigatorSeriesErrorBarsComponent,
    NavigatorSeriesExtremesComponent,
    NavigatorSeriesHighlightComponent,
    NavigatorSeriesLabelsComponent,
    NavigatorSeriesLabelsFromComponent,
    NavigatorSeriesLabelsToComponent,
    NavigatorSeriesMarkersComponent,
    NavigatorSeriesNotesComponent,
    NavigatorSeriesNotesIconComponent,
    NavigatorSeriesNotesLabelComponent,
    NavigatorSeriesOutliersComponent,
    NavigatorSeriesTooltipComponent
];

/* tslint:disable:no-access-missing-member */
/**
 * The root Chart component.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-sparkline [data]="data" type="column">
 *     </kendo-sparkline>
 *   `
 * })
 * class AppComponent {
 *   public data: any[] = [
 *     936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007,
 *     1004, 988, 990, 988, 987, 995, 946, 954, 991, 984,
 *     974, 956, 986, 936, 955, 1021, 1013, 1005, 958, 953,
 *     952, 940, 937, 980, 966, 965, 928, 916, 910, 980
 *   ];
 * }
 *
 * ```
 */
class SparklineComponent extends ChartComponent {
    constructor(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        super(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer);
        this.configurationService = configurationService;
        this.themeService = themeService;
        this.element = element;
        this.intl = intl;
        this.localizationService = localizationService;
        this.ngZone = ngZone;
        this.instanceEventService = instanceEventService;
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        /**
         * @hidden
         */
        this.tooltipWrapperClass = 'k-sparkline-tooltip-wrapper';
        /**
         * @hidden
         */
        this.tooltipContentClasses = {
            'k-sparkline-tooltip': true
        };
    }
    createInstance(element, observer) {
        this.instance = new Sparkline(element, Sparkline.normalizeOptions(this.options), this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    }
    updateOptions() {
        this.instance.setOptions(Sparkline.normalizeOptions(this.options));
    }
}
SparklineComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                exportAs: 'kendoSparkline',
                // required because the class should not be inheritted
                // tslint:disable-next-line
                host: {
                    '[class.k-sparkline]': 'className',
                    '[class.k-widget]': 'className'
                },
                providers: [
                    ConfigurationService,
                    TooltipTemplateService,
                    InstanceEventService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.chart'
                    }
                ],
                selector: 'kendo-sparkline',
                template: `
        <span #surface class="k-chart-surface"></span>
        <kendo-chart-crosshair-tooltips-container [popupSettings]="popupSettings">
        </kendo-chart-crosshair-tooltips-container>
        <kendo-chart-tooltip-popup [animate]="false" [wrapperClass]="tooltipWrapperClass"
            [classNames]="tooltipContentClasses" (leave)="tooltipMouseleave($event)" [popupSettings]="popupSettings">
        </kendo-chart-tooltip-popup>
        <kendo-resize-sensor (resize)="onResize($event)"></kendo-resize-sensor>
    `
            },] },
];
/** @nocollapse */
SparklineComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: ThemeService },
    { type: ElementRef },
    { type: IntlService },
    { type: LocalizationService },
    { type: NgZone },
    { type: InstanceEventService },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
SparklineComponent.propDecorators = {
    type: [{ type: Input }],
    data: [{ type: Input }]
};

/**
 * @hidden
 */
const SPARKLINE_DIRECTIVES = [
    SparklineComponent
];

/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes the Chart component and directives.
 *
 * Imports the ChartModule into your application
 * [root module]({{ site.data.url.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Chart component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ChartModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ChartModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class ChartModule {
}
ChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CHART_DIRECTIVES],
                exports: [CHART_DIRECTIVES],
                imports: [CommonModule, PopupModule, ResizeSensorModule],
                providers: [
                    ThemeService
                ]
            },] },
];

/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes the StockChart component and directives.
 *
 * Imports the StockChartModule into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the StockChart component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { StockChartModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, StockChartModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class StockChartModule {
}
StockChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [STOCK_CHART_DIRECTIVES],
                exports: [STOCK_CHART_DIRECTIVES, ChartModule],
                imports: [ChartModule, CommonModule, PopupModule, ResizeSensorModule]
            },] },
];

/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes the Sparkline component and directives.
 *
 * Imports the SparklineModule into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Sparkline component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { SparklineModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, SparklineModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class SparklineModule {
}
SparklineModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SPARKLINE_DIRECTIVES],
                exports: [SPARKLINE_DIRECTIVES, ChartModule],
                imports: [ChartModule, CommonModule, PopupModule, ResizeSensorModule]
            },] },
];

/**
 * A [module]({{ site.data.urls.angular['ngmoduleapi'] }}) that includes all Chart components and directives.
 *
 * Imports the ChartsModule into your application
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity) or any other sub-module
 * that will use the Charts components.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { ChartsModule } from '@progress/kendo-angular-charts';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, ChartsModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
class ChartsModule {
}
ChartsModule.decorators = [
    { type: NgModule, args: [{
                exports: [ChartModule, SparklineModule, StockChartModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { ChartComponentGenerated, AxisDefaultsComponentGenerated, AxisDefaultsCrosshairComponentGenerated, AxisDefaultsCrosshairTooltipComponentGenerated, AxisDefaultsLabelsComponentGenerated, AxisDefaultsTitleComponentGenerated, CategoryAxisItemComponentGenerated, CategoryAxisCrosshairComponentGenerated, CategoryAxisCrosshairTooltipComponentGenerated, CategoryAxisLabelsComponentGenerated, CategoryAxisNotesComponentGenerated, CategoryAxisNotesIconComponentGenerated, CategoryAxisNotesLabelComponentGenerated, CategoryAxisSelectComponentGenerated, CategoryAxisTitleComponentGenerated, CategoryAxisComponentGenerated, ChartAreaComponentGenerated, DonutCenterTemplateDirective, LegendComponentGenerated, LegendInactiveItemsComponentGenerated, LegendItemComponentGenerated, PaneComponentGenerated, PanesTitleComponentGenerated, PanesComponentGenerated, PlotAreaComponentGenerated, SeriesDefaultsComponentGenerated, SeriesDefaultsLabelsComponentGenerated, SeriesDefaultsLabelsFromComponentGenerated, SeriesDefaultsLabelsToComponentGenerated, SeriesDefaultsNotesComponentGenerated, SeriesDefaultsNotesIconComponentGenerated, SeriesDefaultsNotesLabelComponentGenerated, SeriesDefaultsTooltipComponentGenerated, SeriesItemComponentGenerated, SeriesErrorBarsComponentGenerated, SeriesExtremesComponentGenerated, SeriesHighlightComponentGenerated, SeriesLabelsComponentGenerated, SeriesLabelsFromComponentGenerated, SeriesLabelsToComponentGenerated, SeriesMarkersComponentGenerated, SeriesNotesComponentGenerated, SeriesNotesIconComponentGenerated, SeriesNotesLabelComponentGenerated, SeriesOutliersComponentGenerated, SeriesTooltipComponentGenerated, SeriesComponentGenerated, TitleComponentGenerated, TooltipComponentGenerated, BaseTooltip, bodyFactory, CrosshairTooltipComponent, SeriesTooltipTemplateDirective, SharedTooltipTemplateDirective, ValueAxisItemComponentGenerated, ValueAxisCrosshairComponentGenerated, ValueAxisCrosshairTooltipComponentGenerated, ValueAxisLabelsComponentGenerated, ValueAxisNotesComponentGenerated, ValueAxisNotesIconComponentGenerated, ValueAxisNotesLabelComponentGenerated, ValueAxisTitleComponentGenerated, ValueAxisComponentGenerated, XAxisItemComponentGenerated, XAxisCrosshairComponentGenerated, XAxisCrosshairTooltipComponentGenerated, XAxisLabelsComponentGenerated, XAxisNotesComponentGenerated, XAxisNotesIconComponentGenerated, XAxisNotesLabelComponentGenerated, XAxisTitleComponentGenerated, XAxisComponentGenerated, YAxisItemComponentGenerated, YAxisCrosshairComponentGenerated, YAxisCrosshairTooltipComponentGenerated, YAxisLabelsComponentGenerated, YAxisNotesComponentGenerated, YAxisNotesIconComponentGenerated, YAxisNotesLabelComponentGenerated, YAxisTitleComponentGenerated, YAxisComponentGenerated, ZoomableComponentGenerated, CollectionItemComponent, CollectionComponent, CollectionService, ConfigurationService, PREFIX, PrefixConfigurationService, RootConfigurationService, SettingsComponent, ThemeService, TooltipTemplateService, BaseEvent, InstanceEventService, LegendEvent, NoteEvent, PreventableEvent, SeriesEvent, StockInstanceEventService, NavigatorComponent, NavigatorCategoryAxisComponent, NavigatorCategoryAxisCrosshairComponent, NavigatorCategoryAxisCrosshairTooltipComponent, NavigatorCategoryAxisLabelsComponent, NavigatorCategoryAxisNotesComponent, NavigatorCategoryAxisNotesIconComponent, NavigatorCategoryAxisNotesLabelComponent, NavigatorCategoryAxisSelectComponent, NavigatorCategoryAxisTitleComponent, NavigatorHintComponent, NavigatorPaneComponent, NavigatorPaneTitleComponent, NavigatorSelectComponent, NavigatorSeriesItemComponent, NavigatorSeriesErrorBarsComponent, NavigatorSeriesExtremesComponent, NavigatorSeriesHighlightComponent, NavigatorSeriesLabelsComponent, NavigatorSeriesLabelsFromComponent, NavigatorSeriesLabelsToComponent, NavigatorSeriesMarkersComponent, NavigatorSeriesNotesComponent, NavigatorSeriesNotesIconComponent, NavigatorSeriesNotesLabelComponent, NavigatorSeriesOutliersComponent, NavigatorSeriesTooltipComponent, NavigatorSeriesComponent, ChartModule, StockChartModule, SparklineModule, ChartsModule, TooltipPopupComponent, CrosshairTooltipsContainerComponent, ChartComponent, AxisDefaultsComponent, AxisDefaultsCrosshairComponent, AxisDefaultsCrosshairTooltipComponent, AxisDefaultsLabelsComponent, AxisDefaultsTitleComponent, CategoryAxisComponent, CategoryAxisCrosshairComponent, CategoryAxisCrosshairTooltipComponent, CategoryAxisItemComponent, CategoryAxisLabelsComponent, CategoryAxisNotesComponent, CategoryAxisNotesIconComponent, CategoryAxisNotesLabelComponent, CategoryAxisSelectComponent, CategoryAxisTitleComponent, ChartAreaComponent, LegendComponent, LegendInactiveItemsComponent, LegendItemComponent, PaneComponent, PanesComponent, PanesTitleComponent, PlotAreaComponent, SeriesComponent, SeriesDefaultsComponent, SeriesDefaultsLabelsComponent, SeriesDefaultsLabelsFromComponent, SeriesDefaultsLabelsToComponent, SeriesDefaultsNotesComponent, SeriesDefaultsNotesIconComponent, SeriesDefaultsNotesLabelComponent, SeriesDefaultsTooltipComponent, SeriesErrorBarsComponent, SeriesExtremesComponent, SeriesHighlightComponent, SeriesItemComponent, SeriesLabelsComponent, SeriesLabelsFromComponent, SeriesLabelsToComponent, SeriesMarkersComponent, SeriesNotesComponent, SeriesNotesIconComponent, SeriesNotesLabelComponent, SeriesOutliersComponent, SeriesTooltipComponent, TitleComponent, TooltipComponent, ValueAxisComponent, ValueAxisCrosshairComponent, ValueAxisCrosshairTooltipComponent, ValueAxisItemComponent, ValueAxisLabelsComponent, ValueAxisNotesComponent, ValueAxisNotesIconComponent, ValueAxisNotesLabelComponent, ValueAxisTitleComponent, XAxisComponent, XAxisCrosshairComponent, XAxisCrosshairTooltipComponent, XAxisItemComponent, XAxisLabelsComponent, XAxisNotesComponent, XAxisNotesIconComponent, XAxisNotesLabelComponent, XAxisTitleComponent, YAxisComponent, YAxisCrosshairComponent, YAxisCrosshairTooltipComponent, YAxisItemComponent, YAxisLabelsComponent, YAxisNotesComponent, YAxisNotesIconComponent, YAxisNotesLabelComponent, YAxisTitleComponent, ZoomableComponent, CHART_DIRECTIVES, AxisLabelClickEvent, DragEndEvent, DragEvent, DragStartEvent, LegendItemClickEvent, LegendItemHoverEvent, NoteClickEvent, NoteHoverEvent, PaneRenderEvent, PlotAreaClickEvent, PlotAreaHoverEvent, RenderEvent, SelectEndEvent, SelectEvent, SelectStartEvent, SeriesClickEvent, SeriesHoverEvent, ZoomEndEvent, ZoomEvent, ZoomStartEvent, WeekStartDay, NavigatorFilterEvent, StockChartComponent, STOCK_CHART_DIRECTIVES, SparklineComponent, SPARKLINE_DIRECTIVES };
export { PopupComponent } from '@progress/kendo-angular-popup';
export { ResizeSensorComponent } from '@progress/kendo-angular-common';
