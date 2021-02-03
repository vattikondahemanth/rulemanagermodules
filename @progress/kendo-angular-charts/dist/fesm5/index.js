import { __extends } from 'tslib';
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
var ChartComponentGenerated = /** @class */ (function () {
    function ChartComponentGenerated(configurationService) {
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
    return ChartComponentGenerated;
}());

/**
 * @hidden
 */
var THROTTLE_MS = 1000 / 60;
/**
 * @hidden
 */
var Change = /** @class */ (function () {
    function Change(key, value) {
        this.key = key;
        this.value = value;
    }
    return Change;
}());
/**
 * @hidden
 */
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(ngZone) {
        this.ngZone = ngZone;
        this.store = {};
        this.source = new BehaviorSubject({});
        this.initSource();
    }
    ConfigurationService.prototype.initSource = function () {
        this.onFastChange$ = this.source.asObservable();
        this.onChange$ = this.onFastChange$.pipe(auditTime(THROTTLE_MS));
    };
    ConfigurationService.prototype.push = function (store) {
        this.store = store;
        this.next();
    };
    ConfigurationService.prototype.notify = function (change) {
        this.set(change.key, change.value);
        this.next();
    };
    ConfigurationService.prototype.set = function (field, value) {
        var store = this.store;
        var parts = field.split('.');
        var key = parts.shift();
        while (parts.length > 0) {
            store = store[key] = store[key] || {};
            key = parts.shift();
        }
        store[key] = value;
    };
    ConfigurationService.prototype.next = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.source.next(_this.store);
        });
    };
    ConfigurationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConfigurationService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ConfigurationService;
}());

/**
 * @hidden
 */
var BaseEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function BaseEvent(sender) {
        this.sender = sender;
    }
    return BaseEvent;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function (_super) {
    __extends(PreventableEvent, _super);
    function PreventableEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prevented = false;
        return _this;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}(BaseEvent));

/**
 * @hidden
 */
var LegendEvent = /** @class */ (function (_super) {
    __extends(LegendEvent, _super);
    /**
     * @hidden
     */
    function LegendEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.series = e.series;
        _this.seriesIndex = e.seriesIndex;
        _this.pointIndex = e.pointIndex;
        _this.text = e.text;
        return _this;
    }
    return LegendEvent;
}(PreventableEvent));

/**
 * Arguments for the `legendItemClick` event.
 */
var LegendItemClickEvent = /** @class */ (function (_super) {
    __extends(LegendItemClickEvent, _super);
    function LegendItemClickEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * If called, the series visibility is not toggled as a result of clicking the legend item.
     */
    LegendItemClickEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
    };
    return LegendItemClickEvent;
}(LegendEvent));

/**
 * Arguments for the `axisLabelClick` event.
 */
var AxisLabelClickEvent = /** @class */ (function (_super) {
    __extends(AxisLabelClickEvent, _super);
    /**
     * @hidden
     */
    function AxisLabelClickEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.dataItem = e.dataItem;
        _this.index = e.index;
        _this.text = e.text;
        _this.value = e.value;
        return _this;
    }
    return AxisLabelClickEvent;
}(BaseEvent));

/**
 * Arguments for the `drag` event.
 */
var DragEvent = /** @class */ (function (_super) {
    __extends(DragEvent, _super);
    /**
     * @hidden
     */
    function DragEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return DragEvent;
}(PreventableEvent));

/**
 * Arguments for the `dragEnd` event.
 */
var DragEndEvent = /** @class */ (function (_super) {
    __extends(DragEndEvent, _super);
    /**
     * @hidden
     */
    function DragEndEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return DragEndEvent;
}(BaseEvent));

/**
 * Arguments for the `dragStart` event.
 */
var DragStartEvent = /** @class */ (function (_super) {
    __extends(DragStartEvent, _super);
    /**
     * @hidden
     */
    function DragStartEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return DragStartEvent;
}(PreventableEvent));

/**
 * Arguments for the `legendItemHover` event.
 */
var LegendItemHoverEvent = /** @class */ (function (_super) {
    __extends(LegendItemHoverEvent, _super);
    function LegendItemHoverEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * If called, the series highlight is not shown as a result of hovering over the legend item.
     */
    LegendItemHoverEvent.prototype.preventDefault = function () {
        _super.prototype.preventDefault.call(this);
    };
    return LegendItemHoverEvent;
}(LegendEvent));

/* tslint:disable:no-empty */
/**
 * Arguments for the `legendItemLeave` event.
 */
var LegendItemLeaveEvent = /** @class */ (function (_super) {
    __extends(LegendItemLeaveEvent, _super);
    function LegendItemLeaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @hidden
     */
    LegendItemLeaveEvent.prototype.preventDefault = function () {
    };
    /**
     * @hidden
     */
    LegendItemLeaveEvent.prototype.isDefaultPrevented = function () {
        return false;
    };
    return LegendItemLeaveEvent;
}(LegendEvent));

/**
 * @hidden
 */
var NoteEvent = /** @class */ (function (_super) {
    __extends(NoteEvent, _super);
    /**
     * @hidden
     */
    function NoteEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.dataItem = e.dataItem;
        _this.series = e.series;
        _this.value = e.value;
        _this.visual = e.visual;
        return _this;
    }
    return NoteEvent;
}(BaseEvent));

/**
 * Arguments for the `noteClick` event.
 */
var NoteClickEvent = /** @class */ (function (_super) {
    __extends(NoteClickEvent, _super);
    function NoteClickEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoteClickEvent;
}(NoteEvent));

/**
 * Arguments for the `noteHover` event.
 */
var NoteHoverEvent = /** @class */ (function (_super) {
    __extends(NoteHoverEvent, _super);
    function NoteHoverEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoteHoverEvent;
}(NoteEvent));

/**
 * Arguments for the `noteLeave` event.
 */
var NoteLeaveEvent = /** @class */ (function (_super) {
    __extends(NoteLeaveEvent, _super);
    function NoteLeaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoteLeaveEvent;
}(NoteEvent));

/**
 * Arguments for the `paneRender` event.
 */
var PaneRenderEvent = /** @class */ (function (_super) {
    __extends(PaneRenderEvent, _super);
    /**
     * @hidden
     */
    function PaneRenderEvent(args, sender) {
        var _this = _super.call(this, sender) || this;
        Object.assign(_this, args);
        return _this;
    }
    return PaneRenderEvent;
}(BaseEvent));

/**
 * Arguments for the `plotAreaClick` event.
 */
var PlotAreaClickEvent = /** @class */ (function (_super) {
    __extends(PlotAreaClickEvent, _super);
    /**
     * @hidden
     */
    function PlotAreaClickEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.originalEvent = e.originalEvent;
        _this.value = e.value;
        _this.x = e.x;
        _this.y = e.y;
        return _this;
    }
    return PlotAreaClickEvent;
}(BaseEvent));

/**
 * Arguments for the `plotAreaHover` event.
 */
var PlotAreaHoverEvent = /** @class */ (function (_super) {
    __extends(PlotAreaHoverEvent, _super);
    /**
     * @hidden
     */
    function PlotAreaHoverEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.originalEvent = e.originalEvent;
        _this.value = e.value;
        _this.x = e.x;
        _this.y = e.y;
        return _this;
    }
    return PlotAreaHoverEvent;
}(BaseEvent));

var PlotAreaLeaveEvent = /** @class */ (function (_super) {
    __extends(PlotAreaLeaveEvent, _super);
    function PlotAreaLeaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlotAreaLeaveEvent;
}(BaseEvent));

/**
 * Arguments for the `render` event.
 */
var RenderEvent = /** @class */ (function (_super) {
    __extends(RenderEvent, _super);
    /**
     * @hidden
     */
    function RenderEvent(_e, sender) {
        return _super.call(this, sender) || this;
    }
    return RenderEvent;
}(BaseEvent));

/**
 * Arguments for the `select` event.
 */
var SelectEvent = /** @class */ (function (_super) {
    __extends(SelectEvent, _super);
    /**
     * @hidden
     */
    function SelectEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.from = e.from;
        _this.to = e.to;
        return _this;
    }
    return SelectEvent;
}(PreventableEvent));

/**
 * Arguments for the `selectEnd` event.
 */
var SelectEndEvent = /** @class */ (function (_super) {
    __extends(SelectEndEvent, _super);
    /**
     * @hidden
     */
    function SelectEndEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.from = e.from;
        _this.to = e.to;
        return _this;
    }
    return SelectEndEvent;
}(BaseEvent));

/**
 * Arguments for the `selectStart` event.
 */
var SelectStartEvent = /** @class */ (function (_super) {
    __extends(SelectStartEvent, _super);
    /**
     * @hidden
     */
    function SelectStartEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axis = e.axis;
        _this.from = e.from;
        _this.to = e.to;
        return _this;
    }
    return SelectStartEvent;
}(PreventableEvent));

/**
 * Arguments for the `seriesClick` event.
 */
var SeriesClickEvent = /** @class */ (function (_super) {
    __extends(SeriesClickEvent, _super);
    /**
     * @hidden
     */
    function SeriesClickEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.dataItem = e.dataItem;
        _this.originalEvent = e.originalEvent;
        _this.percentage = e.percentage;
        _this.point = e.point;
        _this.series = e.series;
        _this.stackValue = e.stackValue;
        _this.value = e.value;
        return _this;
    }
    return SeriesClickEvent;
}(BaseEvent));

/**
 * @hidden
 */
var SeriesEvent = /** @class */ (function (_super) {
    __extends(SeriesEvent, _super);
    /**
     * @hidden
     */
    function SeriesEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.category = e.category;
        _this.dataItem = e.dataItem;
        _this.originalEvent = e.originalEvent;
        _this.percentage = e.percentage;
        _this.point = e.point;
        _this.series = e.series;
        _this.stackValue = e.stackValue;
        _this.value = e.value;
        return _this;
    }
    return SeriesEvent;
}(PreventableEvent));

/**
 * Arguments for the `seriesHover` event.
 */
var SeriesHoverEvent = /** @class */ (function (_super) {
    __extends(SeriesHoverEvent, _super);
    function SeriesHoverEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SeriesHoverEvent;
}(SeriesEvent));

/**
 * Arguments for the `seriesOver` event.
 */
var SeriesOverEvent = /** @class */ (function (_super) {
    __extends(SeriesOverEvent, _super);
    function SeriesOverEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SeriesOverEvent;
}(SeriesEvent));

/**
 * Arguments for the `seriesLeave` event.
 */
var SeriesLeaveEvent = /** @class */ (function (_super) {
    __extends(SeriesLeaveEvent, _super);
    function SeriesLeaveEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SeriesLeaveEvent;
}(SeriesEvent));

/**
 * Arguments for the `zoom` event.
 */
var ZoomEvent = /** @class */ (function (_super) {
    __extends(ZoomEvent, _super);
    /**
     * @hidden
     */
    function ZoomEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.delta = e.delta;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return ZoomEvent;
}(PreventableEvent));

/**
 * Arguments for the `zoomEnd` event.
 */
var ZoomEndEvent = /** @class */ (function (_super) {
    __extends(ZoomEndEvent, _super);
    /**
     * @hidden
     */
    function ZoomEndEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return ZoomEndEvent;
}(BaseEvent));

/**
 * Arguments for the `zoomStart` event.
 */
var ZoomStartEvent = /** @class */ (function (_super) {
    __extends(ZoomStartEvent, _super);
    /**
     * @hidden
     */
    function ZoomStartEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.axisRanges = e.axisRanges;
        _this.originalEvent = e.originalEvent;
        return _this;
    }
    return ZoomStartEvent;
}(PreventableEvent));

var EVENT_MAP = {
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
var InstanceEventService = /** @class */ (function () {
    function InstanceEventService() {
    }
    InstanceEventService.prototype.create = function (name, args, sender) {
        if (EVENT_MAP[name]) {
            return new EVENT_MAP[name](args, sender);
        }
    };
    return InstanceEventService;
}());

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
var DonutCenterTemplateDirective = /** @class */ (function () {
    function DonutCenterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    DonutCenterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChartDonutCenterTemplate]'
                },] },
    ];
    /** @nocollapse */
    DonutCenterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return DonutCenterTemplateDirective;
}());

/**
 * @hidden
 */
var ItemChange = /** @class */ (function () {
    function ItemChange(sender, options) {
        this.sender = sender;
        this.options = options;
    }
    return ItemChange;
}());
/**
 * @hidden
 */
var CollectionService = /** @class */ (function () {
    function CollectionService() {
        this.source = new Subject();
        this.onItemChange$ = this.source.asObservable();
    }
    CollectionService.prototype.notify = function (change) {
        this.source.next(change);
    };
    CollectionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CollectionService.ctorParameters = function () { return []; };
    return CollectionService;
}());

/**
 * @hidden
 */
function copyChanges(changes, options) {
    for (var propertyName in changes) {
        if (!changes.hasOwnProperty(propertyName)) {
            continue;
        }
        var value = changes[propertyName].currentValue;
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
    var result = {};
    for (var propertyName in changes) {
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
var CollectionItemComponent = /** @class */ (function () {
    function CollectionItemComponent(configurationService, collectionService) {
        var _this = this;
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.options = {};
        this.subscription = configurationService.onFastChange$.subscribe(function (store) {
            _this.options = store;
            _this.notify();
        });
    }
    CollectionItemComponent.prototype.ngOnChanges = function (changes) {
        var store = this.configurationService.store;
        copyChanges(changes, store);
        this.configurationService.push(store);
    };
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
    CollectionItemComponent.prototype.notifyChanges = function (changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    };
    CollectionItemComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CollectionItemComponent.prototype.notify = function () {
        if (!this.collectionService) {
            return;
        }
        this.collectionService.notify(new ItemChange(this, this.options));
    };
    return CollectionItemComponent;
}());

/**
 * @hidden
 */
var SeriesItemComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesItemComponentGenerated, _super);
    function SeriesItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    return SeriesItemComponentGenerated;
}(CollectionItemComponent));

/**
 * @hidden
 */
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(configKey, configurationService) {
        this.configKey = configKey;
        this.configurationService = configurationService;
        this.store = {};
        if (configKey === undefined) {
            throw new Error('Configuration key not set');
        }
    }
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.store = undefined;
        this.notify();
    };
    SettingsComponent.prototype.ngOnChanges = function (changes) {
        copyChanges(changes, this.store);
        this.notify();
    };
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
    SettingsComponent.prototype.notifyChanges = function (changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    };
    SettingsComponent.prototype.markAsVisible = function () {
        this.store.visible = true;
        this.notify();
    };
    SettingsComponent.prototype.notify = function () {
        this.configurationService.notify(new Change(this.configKey, this.store));
    };
    return SettingsComponent;
}());

/**
 * @hidden
 */
var SeriesTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesTooltipComponentGenerated, _super);
    function SeriesTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
var SeriesTooltipComponent = /** @class */ (function (_super) {
    __extends(SeriesTooltipComponent, _super);
    function SeriesTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    Object.defineProperty(SeriesTooltipComponent.prototype, "seriesTooltipTemplateRef", {
        get: function () {
            return this.seriesTooltipTemplate;
        },
        enumerable: true,
        configurable: true
    });
    SeriesTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    SeriesTooltipComponent.propDecorators = {
        seriesTooltipTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
    };
    return SeriesTooltipComponent;
}(SeriesTooltipComponentGenerated));

var toggle = function (flag) { return flag === undefined ? false : !flag; };
/**
 * The configuration component for a series item.
 */
var SeriesItemComponent = /** @class */ (function (_super) {
    __extends(SeriesItemComponent, _super);
    function SeriesItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    /**
     * Toggles the series visibility and updates the parent Chart
     * without animated transitions.
     */
    SeriesItemComponent.prototype.toggleVisibility = function () {
        this.options.visible = toggle(this.options.visible);
        this.notify();
    };
    /**
     * Toggles the visibility of a point with the given index.
     * Applicable for the Pie, Donut, and Funnel series.
     *
     * @param pointIndex - The zero-based index of the point to toggle.
     */
    SeriesItemComponent.prototype.togglePointVisibility = function (pointIndex) {
        var pv = this.options.pointVisibility = this.options.pointVisibility || {};
        pv[pointIndex] = toggle(pv[pointIndex]);
        this.notify();
    };
    Object.defineProperty(SeriesItemComponent.prototype, "seriesTooltipTemplateRef", {
        get: function () {
            if (this.seriesTooltip) {
                return this.seriesTooltip.seriesTooltipTemplateRef;
            }
        },
        enumerable: true,
        configurable: true
    });
    SeriesItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [ConfigurationService],
                    selector: 'kendo-chart-series-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    SeriesItemComponent.propDecorators = {
        seriesTooltip: [{ type: ContentChild, args: [SeriesTooltipComponent,] }]
    };
    return SeriesItemComponent;
}(SeriesItemComponentGenerated));

/** @hidden */
var chartDefaultTheme = function () {
    return Object.assign({}, chartBaseTheme(), {
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
};

var font = function (style) { return style.fontSize + " " + style.fontFamily; };
var letterPos = function (letter) { return letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0); };
var seriesPos = function (name) { return letterPos(name.match(/series-([a-z])$/)[1]); };
var template = "\n    <div class=\"k-var--accent\"></div>\n    <div class=\"k-var--accent-contrast\"></div>\n    <div class=\"k-var--base\"></div>\n    <div class=\"k-var--background\"></div>\n\n    <div class=\"k-var--normal-background\"></div>\n    <div class=\"k-var--normal-text-color\"></div>\n    <div class=\"k-var--hover-background\"></div>\n    <div class=\"k-var--hover-text-color\"></div>\n    <div class=\"k-var--selected-background\"></div>\n    <div class=\"k-var--selected-text-color\"></div>\n    <div class=\"k-var--chart-error-bars-background\"></div>\n    <div class=\"k-var--chart-notes-background\"></div>\n    <div class=\"k-var--chart-notes-border\"></div>\n    <div class=\"k-var--chart-notes-lines\"></div>\n    <div class=\"k-var--chart-crosshair-background\"></div>\n\n    <div class=\"k-var--chart-inactive\"></div>\n    <div class=\"k-var--chart-major-lines\"></div>\n    <div class=\"k-var--chart-minor-lines\"></div>\n    <div class=\"k-var--chart-area-opacity\"></div>\n\n    <div class=\"k-widget\">\n        <div class=\"k-var--chart-font\"></div>\n        <div class=\"k-var--chart-title-font\"></div>\n        <div class=\"k-var--chart-label-font\"></div>\n    </div>\n\n    <div class=\"k-var--series\">\n      <div class=\"k-var--series-a\"></div>\n      <div class=\"k-var--series-b\"></div>\n      <div class=\"k-var--series-c\"></div>\n      <div class=\"k-var--series-d\"></div>\n      <div class=\"k-var--series-e\"></div>\n      <div class=\"k-var--series-f\"></div>\n    </div>\n";
/**
 * @hidden
 */
var ThemeService = /** @class */ (function (_super) {
    __extends(ThemeService, _super);
    function ThemeService(ngZone) {
        var _this = _super.call(this, ngZone) || this;
        _this.loaded = false;
        return _this;
    }
    ThemeService.prototype.loadTheme = function () {
        if (this.loaded || !isDocumentAvailable()) {
            return;
        }
        if (!this.readTheme()) {
            this.readDefaultTheme();
        }
        this.loaded = true;
        this.next();
    };
    ThemeService.prototype.readTheme = function () {
        this.createElement();
        var available = this.queryColor('accent') !==
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
    };
    ThemeService.prototype.readDefaultTheme = function () {
        this.push(chartDefaultTheme());
    };
    ThemeService.prototype.createElement = function () {
        var container = this.element = document.createElement('div');
        container.style.display = 'none';
        container.innerHTML = template;
        document.body.appendChild(container);
    };
    ThemeService.prototype.destroyElement = function () {
        if (this.element) {
            document.body.removeChild(this.element);
            this.element = undefined;
        }
    };
    ThemeService.prototype.setStyle = function (key, value) {
        this.set(key, value);
    };
    ThemeService.prototype.setColors = function () {
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
        var opacity = parseFloat(this.queryStyle('chart-area-opacity').opacity);
        if (!isNaN(opacity)) {
            this.setStyle('seriesDefaults.area.opacity', opacity);
            this.setStyle('seriesDefaults.labels.opacity', opacity);
        }
    };
    ThemeService.prototype.setFonts = function () {
        var defaultFont = font(this.queryStyle('chart-font'));
        var titleFont = font(this.queryStyle('chart-title-font'));
        var labelFont = font(this.queryStyle('chart-label-font'));
        this.setStyle('axisDefaults.labels.font', labelFont);
        this.setStyle('axisDefaults.notes.label.font', defaultFont);
        this.setStyle('axisDefaults.title.font', defaultFont);
        this.setStyle('legend.labels.font', defaultFont);
        this.setStyle('seriesDefaults.labels.font', labelFont);
        this.setStyle('seriesDefaults.notes.label.font', defaultFont);
        this.setStyle('title.font', titleFont);
    };
    ThemeService.prototype.setSeriesColors = function () {
        var element = this.element;
        var series = [].slice.call(element.querySelectorAll('.k-var--series div'));
        var seriesColors = series.reduce(function (arr, el) {
            var pos = seriesPos(el.className);
            arr[pos] = window.getComputedStyle(el).backgroundColor;
            return arr;
        }, [] // Will populate the series colors in this array
        );
        this.setStyle('seriesColors', seriesColors);
    };
    ThemeService.prototype.mapColor = function (key, varName) {
        this.setStyle(key, this.queryColor(varName));
    };
    ThemeService.prototype.queryColor = function (varName) {
        return this.queryStyle(varName).backgroundColor;
    };
    ThemeService.prototype.queryStyle = function (varName) {
        var element = this.element;
        return window.getComputedStyle(element.querySelector(".k-var--" + varName));
    };
    ThemeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ThemeService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ThemeService;
}(ConfigurationService));

/**
 * @hidden
 */
var ChartInstanceObserver = /** @class */ (function (_super) {
    __extends(ChartInstanceObserver, _super);
    function ChartInstanceObserver(instance) {
        var _this = _super.call(this, instance) || this;
        _this.handlerMap = {
            hideTooltip: 'onHideTooltip',
            legendItemClick: 'onLegendItemClick',
            render: 'onRender',
            showTooltip: 'onShowTooltip',
            init: 'onInit'
        };
        return _this;
    }
    return ChartInstanceObserver;
}(InstanceObserver));

/**
 * @hidden
 */
var TooltipTemplateService = /** @class */ (function () {
    function TooltipTemplateService() {
    }
    TooltipTemplateService.prototype.setTemplate = function (template) {
        this.template = template;
    };
    TooltipTemplateService.prototype.getTemplate = function (seriesIndex) {
        if (this.seriesTemplates && this.seriesTemplates[seriesIndex]) {
            return this.seriesTemplates[seriesIndex];
        }
        return this.template;
    };
    TooltipTemplateService.prototype.setSeriesTemplates = function (seriesTemplates) {
        this.seriesTemplates = seriesTemplates;
    };
    TooltipTemplateService.prototype.setSharedTemplate = function (sharedTemplate) {
        this.sharedTemplate = sharedTemplate;
    };
    TooltipTemplateService.prototype.getSharedTemplate = function () {
        return this.sharedTemplate;
    };
    TooltipTemplateService.decorators = [
        { type: Injectable },
    ];
    return TooltipTemplateService;
}());

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
var SeriesTooltipTemplateDirective = /** @class */ (function () {
    function SeriesTooltipTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    SeriesTooltipTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChartSeriesTooltipTemplate]'
                },] },
    ];
    /** @nocollapse */
    SeriesTooltipTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return SeriesTooltipTemplateDirective;
}());

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
var SharedTooltipTemplateDirective = /** @class */ (function () {
    function SharedTooltipTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    SharedTooltipTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoChartSharedTooltipTemplate]'
                },] },
    ];
    /** @nocollapse */
    SharedTooltipTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return SharedTooltipTemplateDirective;
}());

/**
 * The point that is passed to the tooltip template.
 */
var TooltipTemplatePoint = /** @class */ (function () {
    /**
     * @hidden
     */
    function TooltipTemplatePoint(point, format, template) {
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
    Object.defineProperty(TooltipTemplatePoint.prototype, "formattedValue", {
        /**
         * @hidden
         */
        get: function () {
            return this.format ? this.point.formatValue(this.format) : String(this.value);
        },
        enumerable: true,
        configurable: true
    });
    return TooltipTemplatePoint;
}());

/* tslint:disable:align no-empty */
var POSITION_MODE = 'absolute';
var COLLISION = { horizontal: "fit", vertical: "fit" };
/**
 * @hidden
 */
var BaseTooltip = /** @class */ (function () {
    function BaseTooltip(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.style = {};
        this.popupRef = null;
    }
    Object.defineProperty(BaseTooltip.prototype, "active", {
        get: function () {
            return this.popupRef !== null;
        },
        enumerable: true,
        configurable: true
    });
    BaseTooltip.prototype.show = function (e) {
        var align = e.anchor.align;
        var offset = e.anchor.point;
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
            var popup = this.popupRef.popup.instance;
            popup.offset = offset;
            popup.popupAlign = align;
        }
    };
    BaseTooltip.prototype.hide = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    BaseTooltip.prototype.onInit = function () {
    };
    BaseTooltip.prototype.ngOnDestroy = function () {
        this.hide();
    };
    return BaseTooltip;
}());

/**
 * @hidden
 */
function hasParent(element, parent) {
    var current = element;
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

var SHARED_TOOLTIP_CLASS = 'k-chart-shared-tooltip';
var TOOLTIP_CLASS = "k-chart-tooltip";
var ɵ0$2 = bodyFactory;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
var TooltipPopupComponent = /** @class */ (function (_super) {
    __extends(TooltipPopupComponent, _super);
    function TooltipPopupComponent(popupService, templateService, localizationService, ngZone) {
        var _this = _super.call(this, popupService, localizationService) || this;
        _this.popupService = popupService;
        _this.templateService = templateService;
        _this.localizationService = localizationService;
        _this.ngZone = ngZone;
        _this.seriesTooltipContext = {};
        _this.seriesSharedTooltipContext = {};
        _this.animate = true;
        _this.wrapperClass = 'k-chart-tooltip-wrapper';
        _this.leave = new EventEmitter();
        _this.popupClasses = {};
        return _this;
    }
    TooltipPopupComponent.prototype.show = function (e) {
        var _a;
        this.shared = e.shared;
        this.popupClasses = Object.assign((_a = {}, _a[SHARED_TOOLTIP_CLASS] = e.shared, _a[TOOLTIP_CLASS] = true, _a[e.className] = !!e.className, _a), this.classNames);
        if (!e.shared) {
            this.seriesTooltipContext = new TooltipTemplatePoint(e.point, e.format);
            this.seriesTooltipTemplateRef = this.pointTemplateRef(e.point);
        }
        else {
            this.seriesSharedTooltipTemplateRef = this.templateService.getSharedTemplate()
                || this.defaultSharedTooltipTemplate.templateRef;
            this.seriesSharedTooltipContext = this.sharedTemplateContext(e);
        }
        _super.prototype.show.call(this, e);
    };
    TooltipPopupComponent.prototype.containsElement = function (element) {
        if (this.popupRef) {
            return hasParent(element, this.popupRef.popupElement);
        }
    };
    TooltipPopupComponent.prototype.sharedTemplateContext = function (e) {
        var points = e.points;
        var nameColumn = points.filter(function (point) { return typeof point.series.name !== 'undefined'; }).length > 0;
        var colorMarker = e.series.length > 1;
        var colspan = 1;
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
    };
    TooltipPopupComponent.prototype.pointTemplateRef = function (point) {
        return this.templateService.getTemplate(point.series.index) || this.defaultSeriesTooltipTemplate.templateRef;
    };
    TooltipPopupComponent.prototype.wrapPoints = function (points, format) {
        var result = [];
        for (var idx = 0; idx < points.length; idx++) {
            var point = points[idx];
            var template = this.pointTemplateRef(point);
            var pointFormat = ((point.options || {}).tooltip || {}).format || format;
            result.push(new TooltipTemplatePoint(point, pointFormat, template));
        }
        return result;
    };
    TooltipPopupComponent.prototype.onInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.mouseleaveSubscription = _this.popupRef.popupElement.addEventListener('mouseleave', function (args) {
                _this.leave.emit(args);
            });
        });
        this.popupRef.popupElement.className += " " + this.wrapperClass;
    };
    TooltipPopupComponent.prototype.hide = function () {
        if (this.mouseleaveSubscription) {
            this.mouseleaveSubscription();
            this.mouseleaveSubscription = null;
        }
        _super.prototype.hide.call(this);
    };
    TooltipPopupComponent.decorators = [
        { type: Component, args: [{
                    providers: [PopupService, {
                            provide: POPUP_CONTAINER,
                            useFactory: ɵ0$2
                        }],
                    selector: 'kendo-chart-tooltip-popup',
                    template: "\n    <ng-template #content>\n        <div [ngClass]=\"popupClasses\" [ngStyle]=\"style\">\n          <ng-template [ngTemplateOutlet]=\"seriesTooltipTemplateRef\" *ngIf=\"!shared\"\n                    [ngTemplateOutletContext]=\"seriesTooltipContext\">\n          </ng-template>\n          <ng-template [ngTemplateOutlet]=\"seriesSharedTooltipTemplateRef\" *ngIf=\"shared\"\n                    [ngTemplateOutletContext]=\"seriesSharedTooltipContext\">\n          </ng-template>\n        </div>\n    </ng-template>\n\n    <ng-template kendoChartSeriesTooltipTemplate let-formattedValue=\"formattedValue\">\n        <span [innerHTML]=\"formattedValue\"></span>\n    </ng-template>\n    <ng-template kendoChartSharedTooltipTemplate let-points=\"points\" let-categoryText=\"categoryText\" let-colspan=\"colspan\" let-colorMarker=\"colorMarker\" let-nameColumn=\"nameColumn\" >\n        <table>\n            <tr><th [attr.colspan]='colspan'> {{ categoryText }} </th></tr>\n            <tr *ngFor=\"let point of points\">\n                <td *ngIf=\"colorMarker\"><span class='k-chart-shared-tooltip-marker' [style.background-color]='point.series.color'></span></td>\n                <td *ngIf=\"nameColumn\">\n                    <ng-container *ngIf=\"point.series.name !== undefined\">{{ point.series.name }}</ng-container>\n                    <ng-container *ngIf=\"point.series.name === undefined\">&nbsp;</ng-container>\n                </td>\n                <td>\n                  <ng-template [ngTemplateOutlet]=\"point.template\"\n                            [ngTemplateOutletContext]=\"point\">\n                  </ng-template>\n                </td>\n            </tr>\n        </table>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TooltipPopupComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: TooltipTemplateService },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
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
    return TooltipPopupComponent;
}(BaseTooltip));

var ɵ0$3 = bodyFactory;
// Codelyzer 2.0.0-beta2 doesn't handle inherited members
/* tslint:disable:no-access-missing-member */
/**
 * @hidden
 */
var CrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(CrosshairTooltipComponent, _super);
    function CrosshairTooltipComponent(popupService, localizationService) {
        var _this = _super.call(this, popupService, localizationService) || this;
        _this.animate = false;
        return _this;
    }
    CrosshairTooltipComponent.prototype.show = function (e) {
        _super.prototype.show.call(this, e);
        this.value = e.value;
        this.popupRef.popup.changeDetectorRef.detectChanges();
    };
    CrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    providers: [PopupService, {
                            provide: POPUP_CONTAINER,
                            useFactory: ɵ0$3
                        }],
                    selector: 'kendo-chart-crosshair-tooltip',
                    template: "\n        <ng-template #content>\n            <div class=\"k-chart-tooltip k-chart-crosshair-tooltip\" [ngStyle]=\"style\">\n                {{ value }}\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    CrosshairTooltipComponent.ctorParameters = function () { return [
        { type: PopupService },
        { type: LocalizationService }
    ]; };
    CrosshairTooltipComponent.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['content',] }],
        key: [{ type: Input }],
        popupSettings: [{ type: Input }]
    };
    return CrosshairTooltipComponent;
}(BaseTooltip));

var AXES = ["categoryAxis", "valueAxis", "xAxis", "yAxis"];
/**
 * @hidden
 */
var CrosshairTooltipsContainerComponent = /** @class */ (function () {
    function CrosshairTooltipsContainerComponent() {
        this.tooltipKeys = [];
        this.tooltipsMap = {};
    }
    CrosshairTooltipsContainerComponent.prototype.show = function (e) {
        var tooltipComponents = this.crossahirTooltipComponents.toArray();
        var axisName = e.axisName;
        var axisIndex = e.axisIndex;
        for (var idx = 0; idx < tooltipComponents.length; idx++) {
            if (tooltipComponents[idx].key === axisName + axisIndex) {
                tooltipComponents[idx].show(e);
                break;
            }
        }
    };
    CrosshairTooltipsContainerComponent.prototype.hide = function () {
        var tooltipComponents = this.crossahirTooltipComponents.toArray();
        for (var idx = 0; idx < tooltipComponents.length; idx++) {
            tooltipComponents[idx].hide();
        }
    };
    Object.defineProperty(CrosshairTooltipsContainerComponent.prototype, "active", {
        get: function () {
            return this.tooltipKeys.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    CrosshairTooltipsContainerComponent.prototype.createCrosshairTooltips = function (options) {
        var newMap = this.mapTooltips(options);
        var map = this.tooltipsMap;
        for (var key in map) {
            if (!newMap[key]) {
                this.removeTooltip(key);
                delete map[key];
            }
        }
        for (var key in newMap) {
            if (!map[key]) {
                map[key] = newMap[key];
                this.tooltipKeys.push(key);
            }
        }
    };
    CrosshairTooltipsContainerComponent.prototype.removeTooltip = function (key) {
        var keys = this.tooltipKeys;
        for (var idx = 0; idx < keys.length; idx++) {
            if (keys[idx] === key) {
                keys.splice(idx, 1);
                break;
            }
        }
    };
    CrosshairTooltipsContainerComponent.prototype.mapTooltips = function (options) {
        var map = {};
        for (var idx = 0; idx < AXES.length; idx++) {
            var tooltips = this.axesCrosshairTooltipOptions(options, AXES[idx]);
            for (var tooltipIdx = 0; tooltipIdx < tooltips.length; tooltipIdx++) {
                var tooltip = tooltips[tooltipIdx];
                map[tooltip.name + tooltip.index] = tooltip;
            }
        }
        return map;
    };
    CrosshairTooltipsContainerComponent.prototype.axesCrosshairTooltipOptions = function (options, name) {
        var result = [];
        if (options[name]) {
            var axes = [].concat(options[name]);
            for (var idx = 0; idx < axes.length; idx++) {
                var tooltip = (axes[idx].crosshair || {}).tooltip;
                if (tooltip && tooltip.visible) {
                    result.push({
                        index: idx,
                        name: name
                    });
                }
            }
        }
        return result;
    };
    CrosshairTooltipsContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chart-crosshair-tooltips-container',
                    template: "\n        <kendo-chart-crosshair-tooltip *ngFor=\"let key of tooltipKeys\" [key]=\"key\" [popupSettings]=\"popupSettings\">\n        </kendo-chart-crosshair-tooltip>\n    "
                },] },
    ];
    CrosshairTooltipsContainerComponent.propDecorators = {
        popupSettings: [{ type: Input }],
        crossahirTooltipComponents: [{ type: ViewChildren, args: [CrosshairTooltipComponent,] }]
    };
    return CrosshairTooltipsContainerComponent;
}());

var getTouch = function (domEvent) {
    return {
        x: {
            location: domEvent.pageX
        },
        y: {
            location: domEvent.pageY
        }
    };
};
var eventArgs = function (e, previousArgs) {
    var pointers = e.pointers;
    var pointer = pointers[0];
    var xLocation = pointer.pageX;
    var yLocation = pointer.pageY;
    var distance = 0;
    if (pointers.length > 1) {
        var pointer1 = pointers[0];
        var pointer2 = pointers[1];
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
    for (var idx = 0; idx < groupNames.length; idx++) {
        if (events[groupNames[idx]]) {
            return true;
        }
    }
    return false;
}
var eventGroups = [{
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
var DomEvents = /** @class */ (function () {
    function DomEvents(hammerInstance, events) {
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
    DomEvents.prototype.tap = function (e) {
        this.trigger('tap', e);
    };
    DomEvents.prototype.press = function (e) {
        this.trigger('press', e);
    };
    DomEvents.prototype.panstart = function (e) {
        delete this.previous;
        this.previous = this.trigger('start', e);
    };
    DomEvents.prototype.panmove = function (e) {
        this.previous = this.trigger('move', e);
    };
    DomEvents.prototype.panend = function (e) {
        this.trigger('end', e);
        delete this.previous;
    };
    DomEvents.prototype.pinchstart = function (e) {
        this.trigger('gesturestart', e);
    };
    DomEvents.prototype.pinchmove = function (e) {
        this.trigger('gesturechange', e);
    };
    DomEvents.prototype.pinchend = function (e) {
        this.trigger('gestureend', e);
    };
    DomEvents.prototype.trigger = function (name, e) {
        var args = eventArgs(e, this.previous);
        if (this.eventHandlers[name]) {
            this.eventHandlers[name](args);
        }
        return args;
    };
    DomEvents.prototype.bind = function (events) {
        if (events === void 0) { events = {}; }
        this.unbind();
        this.eventHandlers = events;
        for (var idx = 0; idx < eventGroups.length; idx++) {
            var eventGroup = eventGroups[idx];
            var groupNames = Object.keys(eventGroup);
            if (shouldBindGroup(groupNames, events)) {
                for (var nameIdx = 0; nameIdx < groupNames.length; nameIdx++) {
                    var name_1 = eventGroup[groupNames[nameIdx]];
                    this.hammerInstance.on(name_1, this[name_1]);
                }
            }
        }
    };
    DomEvents.prototype.unbind = function () {
        if (this.hammerInstance) {
            this.hammerInstance.off();
        }
        this.eventHandlers = {};
    };
    DomEvents.prototype.destroy = function () {
        if (this.hammerInstance) {
            this.hammerInstance.destroy();
            delete this.hammerInstance;
        }
        delete this.eventHandlers;
    };
    DomEvents.prototype.toggleDrag = function (enable) {
        this.toggle('pan', enable);
    };
    DomEvents.prototype.toggleZoom = function (enable) {
        this.toggle('pinch', enable);
    };
    DomEvents.prototype.toggle = function (recognizer, enable) {
        if (this.hammerInstance) {
            var instanceRecognizer = this.hammerInstance.get(recognizer);
            instanceRecognizer.set({
                enable: enable
            });
        }
    };
    return DomEvents;
}());

var MISSING_HAMMER_MESSAGE = 'Hammerjs is not loaded.' +
    'Solution: http://www.telerik.com/kendo-angular-ui/components/charts/troubleshooting/#toc-hammerjs-is-not-loaded';
/**
 * @hidden
 */
var DomEventsBuilder$1 = /** @class */ (function () {
    function DomEventsBuilder$$1() {
    }
    DomEventsBuilder$$1.create = function (element, events) {
        if (typeof window !== 'undefined') {
            var HAMMER = window.Hammer;
            if (!HAMMER) {
                if (isDevMode()) {
                    throw new Error(MISSING_HAMMER_MESSAGE);
                }
                return;
            }
            var hammerInstance = new HAMMER(element, {
                recognizers: [
                    [HAMMER.Tap],
                    [HAMMER.Pan],
                    [HAMMER.Pinch],
                    [HAMMER.Press, { time: 0 }]
                ]
            });
            return new DomEvents(hammerInstance, events);
        }
    };
    return DomEventsBuilder$$1;
}());

var dateCategoryAxisFormats = DateCategoryAxis.prototype.options.labels.dateFormats;
var dateValueAxisFormats = DateValueAxis.prototype.options.labels.dateFormats;
var dateFormats = {
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
var ChartComponent = /** @class */ (function (_super) {
    __extends(ChartComponent, _super);
    function ChartComponent(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.themeService = themeService;
        _this.element = element;
        _this.intl = intl;
        _this.localizationService = localizationService;
        _this.ngZone = ngZone;
        _this.instanceEventService = instanceEventService;
        _this.changeDetector = changeDetector;
        _this.renderer = renderer;
        /**
         * Fires when a legend item is clicked before the selected series visibility is toggled.
         * Can be prevented.
         */
        _this.legendItemClick = new EventEmitter();
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
        _this.resizeRateLimit = 10;
        _this.className = true;
        _this.theme = null;
        _this.suppressTransitions = false;
        _this.rtl = false;
        _this.themeService.loadTheme();
        _this.refreshWait();
        return _this;
    }
    ChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.canRender) {
            this.ngZone.runOutsideAngular(function () {
                var chartMouseleave = _this.renderer.listen(_this.surfaceElement.nativeElement, 'mouseleave', _this.chartMouseleave.bind(_this));
                _this.domSubscriptions = function () {
                    chartMouseleave();
                };
            });
        }
        this.setDirection();
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        this.subscriptions.add(this.localizationService.changes.subscribe(this.rtlChange.bind(this)));
    };
    ChartComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.instance && this.autoResize) {
            this.ngZone.runOutsideAngular(function () {
                clearTimeout(_this.resizeTimeout);
                _this.resizeTimeout = setTimeout(function () {
                    _this.resize();
                }, 0);
            });
        }
    };
    ChartComponent.prototype.ngOnChanges = function (changes) {
        var store = this.configurationService.store;
        copyChanges(changes, store);
        store.popupSettings = null;
        this.configurationService.push(store);
    };
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
    ChartComponent.prototype.notifyChanges = function (changes) {
        this.ngOnChanges(toSimpleChanges(changes));
    };
    ChartComponent.prototype.ngOnDestroy = function () {
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
    };
    ChartComponent.prototype.createInstance = function (element, observer) {
        this.instance = new Chart(element, this.options, this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    };
    /**
     * Exports the Chart as an image. The export operation is asynchronous and returns a promise.
     *
     * @param {ImageExportOptions} options - The parameters for the exported image.
     * @returns {Promise<string>} - A promise that will be resolved with a PNG image encoded as a Data URI.
     */
    ChartComponent.prototype.exportImage = function (options) {
        if (options === void 0) { options = {}; }
        return exportImage(this.exportVisual(options), options);
    };
    /**
     * Exports the Chart as an SVG document. The export operation is asynchronous and returns a promise.
     *
     * @param options - The parameters for the exported file.
     * @returns - A promise that will be resolved with an SVG document that is encoded as a Data URI.
     */
    ChartComponent.prototype.exportSVG = function (options) {
        if (options === void 0) { options = {}; }
        return exportSVG(this.exportVisual(options), options);
    };
    /**
     * Exports the Chart as a Drawing `Scene`.
     *
     * @param options - The parameters for the export operation.
     * @returns - The root Group of the scene.
     */
    ChartComponent.prototype.exportVisual = function (options) {
        if (options === void 0) { options = {}; }
        return this.instance.exportVisual(options);
    };
    /**
     * Returns the axis with the specified name.
     *
     * @param {string} name - The axis name.
     * @returns {ChartAxis} - The axis with a corresponding name.
     */
    ChartComponent.prototype.findAxisByName = function (name) {
        if (this.instance) {
            return this.instance.findAxisByName(name);
        }
    };
    /**
     * Returns the pane at the specified index.
     *
     * @param {number} index - The pane index.
     * @returns {ChartPane} - The pane at the specified index.
     */
    ChartComponent.prototype.findPaneByIndex = function (index) {
        if (this.instance) {
            return this.instance.findPaneByIndex(index);
        }
    };
    /**
     * Returns the pane with the specified name.
     *
     * @param {string} name - The name of the pane.
     * @returns {ChartPane} - The pane with the provided name.
     */
    ChartComponent.prototype.findPaneByName = function (name) {
        if (this.instance) {
            return this.instance.findPaneByName(name);
        }
    };
    /**
     * Returns the plot area of the Chart.
     * @returns {ChartPlotArea} - The plot area of the Chart.
     */
    ChartComponent.prototype.getPlotArea = function () {
        if (this.instance) {
            return this.instance.plotArea();
        }
    };
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
    ChartComponent.prototype.toggleHighlight = function (show, filter) {
        if (this.instance) {
            this.instance.toggleHighlight(show, filter);
        }
    };
    /**
     * Hides the tooltip of the Chart.
     */
    ChartComponent.prototype.hideTooltip = function () {
        if (this.instance) {
            this.instance.hideTooltip();
        }
    };
    /**
     * Shows the Chart tooltip of a specific point or the shared tooltip of a specific category.
     *
     * @param filter - The category for a shared tooltip or a function which will be called for each point until the function returns `true`.
     */
    ChartComponent.prototype.showTooltip = function (filter) {
        if (this.instance) {
            this.instance.showTooltip(filter);
        }
    };
    ChartComponent.prototype.init = function () {
        if (!this.canRender) {
            return;
        }
        var element = this.surfaceElement.nativeElement;
        var instanceObserver = new ChartInstanceObserver(this);
        this.createInstance(element, instanceObserver);
    };
    /**
     * Detects the size of the container and redraws the Chart.
     * Resizing is automatic unless you set the `resizeRateLimit` option to `0`.
     */
    ChartComponent.prototype.resize = function () {
        if (this.instance) {
            this.instance.resize();
        }
    };
    /**
     * @hidden
     */
    ChartComponent.prototype.onResize = function (_event) {
        if (this.autoResize) {
            this.resize();
        }
    };
    ChartComponent.prototype.onLegendItemClick = function (e) {
        var _this = this;
        this.run(function () {
            var args = new LegendItemClickEvent(e, _this);
            _this.legendItemClick.emit(args);
            if (!args.isDefaultPrevented()) {
                var series = _this.seriesComponents.toArray()[e.series.index];
                if (!series) {
                    return;
                }
                if (e.pointIndex === undefined) {
                    series.toggleVisibility();
                }
                else {
                    series.togglePointVisibility(e.pointIndex);
                }
                _this.suppressTransitions = true;
            }
        }, hasObservers(this.legendItemClick), this.seriesComponents.length > 0);
    };
    ChartComponent.prototype.onInit = function (e) {
        this.instance = e.sender;
    };
    ChartComponent.prototype.onRender = function (e) {
        var _this = this;
        var donutCenterStyle = this.getDonutCenterStyle();
        this.run(function () {
            var args = new RenderEvent(e, _this);
            _this.surface = e.sender.surface;
            _this.render.emit(args);
            _this.donutCenterStyle = donutCenterStyle;
        }, hasObservers(this.render), this.donutCenterStyle !== donutCenterStyle);
    };
    ChartComponent.prototype.onShowTooltip = function (e) {
        var _this = this;
        this.run(function () {
            if (!e.crosshair) {
                _this.tooltipInstance.show(e);
            }
            else {
                _this.crossahirTooltips.show(e);
            }
        }, !e.crosshair, true);
    };
    ChartComponent.prototype.onHideTooltip = function (e) {
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
    };
    ChartComponent.prototype.trigger = function (name, e) {
        if (name === 'resize') {
            return;
        }
        var emitter = this.activeEmitter(name);
        if (emitter) {
            var args_1 = this.instanceEventService.create(name, e, this);
            this.run(function () {
                emitter.emit(args_1);
            });
            return args_1.isDefaultPrevented && args_1.isDefaultPrevented();
        }
    };
    ChartComponent.prototype.requiresHandlers = function (names) {
        for (var idx = 0; idx < names.length; idx++) {
            if (this.activeEmitter(names[idx])) {
                return true;
            }
        }
        return false;
    };
    ChartComponent.prototype.refresh = function () {
        clearTimeout(this.redrawTimeout);
        this.updateDirection();
        this.crossahirTooltips.createCrosshairTooltips(this.options);
        this.setChartAreaSize();
        if (!this.instance) {
            this.init();
            return;
        }
        var transitions = this.options.transitions;
        if (this.suppressTransitions) {
            this.options.transitions = false;
        }
        this.updateOptions();
        if (this.suppressTransitions) {
            this.options.transitions = transitions;
            this.suppressTransitions = false;
        }
    };
    ChartComponent.prototype.setChartAreaSize = function () {
        if (!this.element) {
            return;
        }
        var element = this.element.nativeElement;
        var chartArea = this.options.chartArea || {};
        if (chartArea.width) {
            element.style.width = chartArea.width + "px";
        }
        if (chartArea.height) {
            element.style.height = chartArea.height + "px";
        }
    };
    ChartComponent.prototype.updateOptions = function () {
        this.instance.setOptions(this.options);
    };
    /**
     * @hidden
     */
    ChartComponent.prototype.tooltipMouseleave = function (e) {
        var relatedTarget = e.relatedTarget;
        var chartElement = this.element.nativeElement;
        if (this.instance && (!relatedTarget || !hasParent(relatedTarget, chartElement))) {
            this.instance.hideElements();
        }
    };
    /**
     * @hidden
     */
    ChartComponent.prototype.chartMouseleave = function (e) {
        var relatedTarget = e.relatedTarget;
        var chartElement = this.element.nativeElement;
        if (this.instance && (!relatedTarget || !(this.tooltipInstance.containsElement(relatedTarget) || hasParent(relatedTarget, chartElement))) &&
            !this.instance.handlingTap) {
            this.instance.hideElements();
        }
    };
    Object.defineProperty(ChartComponent.prototype, "canRender", {
        get: function () {
            return isDocumentAvailable() && Boolean(this.surfaceElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartComponent.prototype, "autoResize", {
        get: function () {
            return this.resizeRateLimit > 0;
        },
        enumerable: true,
        configurable: true
    });
    ChartComponent.prototype.activeEmitter = function (name) {
        var emitter = this[name];
        if (emitter && emitter.emit && hasObservers(emitter)) {
            return emitter;
        }
    };
    ChartComponent.prototype.getDonutCenterStyle = function () {
        if (!this.instance || !this.options || !this.options.series) {
            return;
        }
        var firstSeries = this.options.series[0];
        var charts = this.instance._plotArea.charts;
        if (!firstSeries || firstSeries.type !== 'donut' || charts[0].points.length === 0) {
            return;
        }
        var firstPoint = charts[0].points[0];
        var center = firstPoint.box.center();
        var radius = firstPoint.sector.innerRadius;
        var top = center.y - radius;
        var left = center.x - radius;
        var size = radius * 2;
        return {
            height: size + 'px',
            left: left + 'px',
            top: top + 'px',
            width: size + 'px'
        };
    };
    ChartComponent.prototype.refreshWait = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.subscription = combineLatest(_this.configurationService.onChange$, _this.themeService.onChange$).pipe(tap(function (result) {
                _this.options = result[0];
                _this.theme = result[1];
            }), auditTime(THROTTLE_MS))
                .subscribe(function () {
                _this.refresh();
            });
        });
    };
    ChartComponent.prototype.run = function (callback, inZone, detectChanges) {
        if (inZone === void 0) { inZone = true; }
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
    };
    ChartComponent.prototype.detectChanges = function () {
        if (!this.destroyed) {
            this.changeDetector.detectChanges();
        }
    };
    ChartComponent.prototype.intlChange = function () {
        if (this.instance) {
            this.deferredRedraw();
        }
    };
    ChartComponent.prototype.rtlChange = function () {
        if (this.instance && this.rtl !== this.isRTL) {
            this.deferredRedraw();
        }
    };
    ChartComponent.prototype.deferredRedraw = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            clearTimeout(_this.redrawTimeout);
            _this.redrawTimeout = setTimeout(function () {
                _this.updateDirection();
                _this.instance.noTransitionsRedraw();
            }, 0);
        });
    };
    ChartComponent.prototype.updateDirection = function () {
        var current = this.isRTL;
        if (this.rtl !== current) {
            this.setDirection();
            if (this.instance) {
                this.instance.setDirection(current);
            }
        }
    };
    ChartComponent.prototype.setDirection = function () {
        this.rtl = this.isRTL;
        if (this.element) {
            this.renderer.setAttribute(this.element.nativeElement, 'dir', this.rtl ? 'rtl' : 'ltr');
        }
    };
    Object.defineProperty(ChartComponent.prototype, "isRTL", {
        get: function () {
            return Boolean(this.localizationService.rtl);
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n    <div #surface class=\"k-chart-surface\"></div>\n    <kendo-chart-crosshair-tooltips-container [popupSettings]=\"popupSettings\">\n    </kendo-chart-crosshair-tooltips-container>\n    <kendo-chart-tooltip-popup (leave)=\"tooltipMouseleave($event)\" [popupSettings]=\"popupSettings\">\n    </kendo-chart-tooltip-popup>\n    <kendo-resize-sensor (resize)=\"onResize($event)\" [rateLimit]=\"resizeRateLimit\"></kendo-resize-sensor>\n    <div class=\"k-chart-donut-center\" [ngStyle]=\"donutCenterStyle\" *ngIf=\"donutCenterStyle && donutCenterTemplate\">\n      <ng-template [ngTemplateOutlet]=\"donutCenterTemplate.templateRef\"></ng-template>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    ChartComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: ThemeService },
        { type: ElementRef },
        { type: IntlService },
        { type: LocalizationService },
        { type: NgZone },
        { type: InstanceEventService },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
    return ChartComponent;
}(ChartComponentGenerated));

/**
 * @hidden
 */
var AxisDefaultsComponentGenerated = /** @class */ (function (_super) {
    __extends(AxisDefaultsComponentGenerated, _super);
    function AxisDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return AxisDefaultsComponentGenerated;
}(SettingsComponent));

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
var AxisDefaultsComponent = /** @class */ (function (_super) {
    __extends(AxisDefaultsComponent, _super);
    // Place custom properties here
    function AxisDefaultsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsComponent;
}(AxisDefaultsComponentGenerated));

/**
 * @hidden
 */
var AxisDefaultsCrosshairComponentGenerated = /** @class */ (function (_super) {
    __extends(AxisDefaultsCrosshairComponentGenerated, _super);
    function AxisDefaultsCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        dashType: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return AxisDefaultsCrosshairComponentGenerated;
}(SettingsComponent));

/**
 * The crosshair configuration options ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsCrosshairComponent = /** @class */ (function (_super) {
    __extends(AxisDefaultsCrosshairComponent, _super);
    // Place custom properties here
    function AxisDefaultsCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    AxisDefaultsCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsCrosshairComponent;
}(AxisDefaultsCrosshairComponentGenerated));

/**
 * @hidden
 */
var AxisDefaultsCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(AxisDefaultsCrosshairTooltipComponentGenerated, _super);
    function AxisDefaultsCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return AxisDefaultsCrosshairTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the [`axisDefaults.crosshair.tooltip.visible`]({% slug api_charts_axisdefaultscrosshairtooltipcomponent %}#toc-visible)
 * option is set to `true`.
 */
var AxisDefaultsCrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(AxisDefaultsCrosshairTooltipComponent, _super);
    // Place custom properties here
    function AxisDefaultsCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    AxisDefaultsCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsCrosshairTooltipComponent;
}(AxisDefaultsCrosshairTooltipComponentGenerated));

/**
 * @hidden
 */
var AxisDefaultsLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(AxisDefaultsLabelsComponentGenerated, _super);
    function AxisDefaultsLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return AxisDefaultsLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the axis labels ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsLabelsComponent = /** @class */ (function (_super) {
    __extends(AxisDefaultsLabelsComponent, _super);
    // Place custom properties here
    function AxisDefaultsLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsLabelsComponent;
}(AxisDefaultsLabelsComponentGenerated));

/**
 * @hidden
 */
var AxisDefaultsTitleComponentGenerated = /** @class */ (function (_super) {
    __extends(AxisDefaultsTitleComponentGenerated, _super);
    function AxisDefaultsTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return AxisDefaultsTitleComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the axis title ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsTitleComponent = /** @class */ (function (_super) {
    __extends(AxisDefaultsTitleComponent, _super);
    // Place custom properties here
    function AxisDefaultsTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsTitleComponent;
}(AxisDefaultsTitleComponentGenerated));

/**
 * @hidden
 */
var CollectionComponent = /** @class */ (function () {
    function CollectionComponent(configKey, configurationService, collectionService) {
        var _this = this;
        this.configKey = configKey;
        this.configurationService = configurationService;
        this.collectionService = collectionService;
        this.items = [];
        this.subscription = collectionService.onItemChange$.subscribe(function (changes) { return _this.processChanges(changes); });
    }
    CollectionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CollectionComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.readItems();
        this.children.changes.subscribe(function () { return _this.readItems(); });
    };
    CollectionComponent.prototype.processChanges = function (changes) {
        if (!this.children) {
            return;
        }
        var index = this.children.toArray().indexOf(changes.sender);
        if (index < 0) {
            return;
        }
        this.items[index] = changes.options;
        this.change();
    };
    CollectionComponent.prototype.readItems = function () {
        this.items = this.children.map(function (s) { return s.options; });
        this.change();
    };
    CollectionComponent.prototype.change = function () {
        this.configurationService.notify(new Change(this.configKey, this.items));
    };
    return CollectionComponent;
}());

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
var CategoryAxisItemComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisItemComponentGenerated, _super);
    function CategoryAxisItemComponentGenerated(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
        return _this;
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
    return CategoryAxisItemComponentGenerated;
}(CollectionItemComponent));

/**
 * The configuration component for a category axis ([see example]({% slug axes_chart_charts %})).
 */
var CategoryAxisItemComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisItemComponent, _super);
    function CategoryAxisItemComponent(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService, intl, localeId) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    CategoryAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: IntlService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return CategoryAxisItemComponent;
}(CategoryAxisItemComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisComponentGenerated, _super);
    function CategoryAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'categoryAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    CategoryAxisComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [CategoryAxisItemComponent,] }]
    };
    return CategoryAxisComponentGenerated;
}(CollectionComponent));

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
var CategoryAxisComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisComponent, _super);
    // Place custom properties here
    function CategoryAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    CategoryAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return CategoryAxisComponent;
}(CategoryAxisComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisCrosshairComponentGenerated, _super);
    function CategoryAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        dashType: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return CategoryAxisCrosshairComponentGenerated;
}(SettingsComponent));

/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
var CategoryAxisCrosshairComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisCrosshairComponent, _super);
    // Place custom properties here
    function CategoryAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    CategoryAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisCrosshairComponent;
}(CategoryAxisCrosshairComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisCrosshairTooltipComponentGenerated, _super);
    function CategoryAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return CategoryAxisCrosshairTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var CategoryAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisCrosshairTooltipComponent, _super);
    // Place custom properties here
    function CategoryAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    CategoryAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisCrosshairTooltipComponent;
}(CategoryAxisCrosshairTooltipComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisLabelsComponentGenerated, _super);
    function CategoryAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return CategoryAxisLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the axis labels ([see example]({% slug labels_chart_charts %})).
 */
var CategoryAxisLabelsComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisLabelsComponent, _super);
    // Place custom properties here
    function CategoryAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisLabelsComponent;
}(CategoryAxisLabelsComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisNotesComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisNotesComponentGenerated, _super);
    function CategoryAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return CategoryAxisNotesComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the category axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
var CategoryAxisNotesComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisNotesComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisNotesComponent;
}(CategoryAxisNotesComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisNotesIconComponentGenerated, _super);
    function CategoryAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return CategoryAxisNotesIconComponentGenerated;
}(SettingsComponent));

/**
 * The icon of the notes.
 */
var CategoryAxisNotesIconComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisNotesIconComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisNotesIconComponent;
}(CategoryAxisNotesIconComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisNotesLabelComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisNotesLabelComponentGenerated, _super);
    function CategoryAxisNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return CategoryAxisNotesLabelComponentGenerated;
}(SettingsComponent));

/**
 * The label of the notes.
 */
var CategoryAxisNotesLabelComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisNotesLabelComponent, _super);
    // Place custom properties here
    function CategoryAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisNotesLabelComponent;
}(CategoryAxisNotesLabelComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisSelectComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisSelectComponentGenerated, _super);
    function CategoryAxisSelectComponentGenerated(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisSelectComponentGenerated.propDecorators = {
        from: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        mousewheel: [{ type: Input }],
        to: [{ type: Input }]
    };
    return CategoryAxisSelectComponentGenerated;
}(SettingsComponent));

/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from zero.
 * Categories with indexes in the
 * ([`select.from`]({% slug api_charts_categoryaxisselectcomponent %}#toc-from)
 * &mdash;[`select.to`]({% slug api_charts_categoryaxisselectcomponent %}#toc-to)) range will be selected.
 * This means that the last category in the range will not be included in the selection.
 * If the categories are dates, the range has to be also specified with date values.
 */
var CategoryAxisSelectComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisSelectComponent, _super);
    // Place custom properties here
    function CategoryAxisSelectComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisSelectComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-select',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisSelectComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisSelectComponent;
}(CategoryAxisSelectComponentGenerated));

/**
 * @hidden
 */
var CategoryAxisTitleComponentGenerated = /** @class */ (function (_super) {
    __extends(CategoryAxisTitleComponentGenerated, _super);
    function CategoryAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return CategoryAxisTitleComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the category axis title.
 */
var CategoryAxisTitleComponent = /** @class */ (function (_super) {
    __extends(CategoryAxisTitleComponent, _super);
    // Place custom properties here
    function CategoryAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisTitleComponent;
}(CategoryAxisTitleComponentGenerated));

/**
 * @hidden
 */
var ChartAreaComponentGenerated = /** @class */ (function (_super) {
    __extends(ChartAreaComponentGenerated, _super);
    function ChartAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'chartArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ChartAreaComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        height: [{ type: Input }],
        margin: [{ type: Input }],
        opacity: [{ type: Input }],
        width: [{ type: Input }]
    };
    return ChartAreaComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the Chart area.
 * Represents the entire visible area of the Chart
 * ([see example]({% slug chartarea_chart_charts %})).
 */
var ChartAreaComponent = /** @class */ (function (_super) {
    __extends(ChartAreaComponent, _super);
    // Place custom properties here
    function ChartAreaComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ChartAreaComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ChartAreaComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ChartAreaComponent;
}(ChartAreaComponentGenerated));

/**
 * @hidden
 */
var LegendComponentGenerated = /** @class */ (function (_super) {
    __extends(LegendComponentGenerated, _super);
    function LegendComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return LegendComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the Chart legend
 * ([see example]({% slug legend_chart_charts %})).
 */
var LegendComponent = /** @class */ (function (_super) {
    __extends(LegendComponent, _super);
    // Place custom properties here
    function LegendComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    LegendComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LegendComponent;
}(LegendComponentGenerated));

/**
 * @hidden
 */
var LegendInactiveItemsComponentGenerated = /** @class */ (function (_super) {
    __extends(LegendInactiveItemsComponentGenerated, _super);
    function LegendInactiveItemsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend.inactiveItems', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendInactiveItemsComponentGenerated.propDecorators = {
        labels: [{ type: Input }]
    };
    return LegendInactiveItemsComponentGenerated;
}(SettingsComponent));

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
var LegendInactiveItemsComponent = /** @class */ (function (_super) {
    __extends(LegendInactiveItemsComponent, _super);
    // Place custom properties here
    function LegendInactiveItemsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendInactiveItemsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend-inactive-items',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendInactiveItemsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LegendInactiveItemsComponent;
}(LegendInactiveItemsComponentGenerated));

/**
 * @hidden
 */
var LegendItemComponentGenerated = /** @class */ (function (_super) {
    __extends(LegendItemComponentGenerated, _super);
    function LegendItemComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend.item', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendItemComponentGenerated.propDecorators = {
        cursor: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return LegendItemComponentGenerated;
}(SettingsComponent));

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
var LegendItemComponent = /** @class */ (function (_super) {
    __extends(LegendItemComponent, _super);
    // Place custom properties here
    function LegendItemComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendItemComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-legend-item',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    LegendItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return LegendItemComponent;
}(LegendItemComponentGenerated));

/**
 * @hidden
 */
var PaneComponentGenerated = /** @class */ (function (_super) {
    __extends(PaneComponentGenerated, _super);
    function PaneComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    return PaneComponentGenerated;
}(CollectionItemComponent));

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
var PaneComponent = /** @class */ (function (_super) {
    __extends(PaneComponent, _super);
    // Place custom properties here
    function PaneComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    PaneComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return PaneComponent;
}(PaneComponentGenerated));

/**
 * @hidden
 */
var PanesComponentGenerated = /** @class */ (function (_super) {
    __extends(PanesComponentGenerated, _super);
    function PanesComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'panes', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    PanesComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [PaneComponent,] }]
    };
    return PanesComponentGenerated;
}(CollectionComponent));

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
var PanesComponent = /** @class */ (function (_super) {
    __extends(PanesComponent, _super);
    // Place custom properties here
    function PanesComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    PanesComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return PanesComponent;
}(PanesComponentGenerated));

/**
 * @hidden
 */
var PanesTitleComponentGenerated = /** @class */ (function (_super) {
    __extends(PanesTitleComponentGenerated, _super);
    function PanesTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return PanesTitleComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the Chart pane title.
 */
var PanesTitleComponent = /** @class */ (function (_super) {
    __extends(PanesTitleComponent, _super);
    // Place custom properties here
    function PanesTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PanesTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-pane-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PanesTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return PanesTitleComponent;
}(PanesTitleComponentGenerated));

/**
 * @hidden
 */
var PlotAreaComponentGenerated = /** @class */ (function (_super) {
    __extends(PlotAreaComponentGenerated, _super);
    function PlotAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'plotArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PlotAreaComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        margin: [{ type: Input }],
        opacity: [{ type: Input }],
        padding: [{ type: Input }]
    };
    return PlotAreaComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the plot area
 * ([see example]({% slug plotarea_chart_charts %})).
 * The plot area is the area which displays the series.
 */
var PlotAreaComponent = /** @class */ (function (_super) {
    __extends(PlotAreaComponent, _super);
    // Place custom properties here
    function PlotAreaComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PlotAreaComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-plot-area',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PlotAreaComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return PlotAreaComponent;
}(PlotAreaComponentGenerated));

/**
 * @hidden
 */
var SeriesComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesComponentGenerated, _super);
    function SeriesComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'series', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    SeriesComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [SeriesItemComponent,] }]
    };
    return SeriesComponentGenerated;
}(CollectionComponent));

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
var SeriesComponent = /** @class */ (function (_super) {
    __extends(SeriesComponent, _super);
    // Place custom properties here
    function SeriesComponent(configurationService, collectionService, tooltipTemplateService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.tooltipTemplateService = tooltipTemplateService;
        return _this;
    }
    SeriesComponent.prototype.ngAfterContentChecked = function () {
        this.readTooltipTemplates();
    };
    SeriesComponent.prototype.readTooltipTemplates = function () {
        var templates = this.children.map(function (item) { return item.seriesTooltipTemplateRef; });
        this.tooltipTemplateService.setSeriesTemplates(templates);
    };
    SeriesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CollectionService],
                    selector: 'kendo-chart-series',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: TooltipTemplateService }
    ]; };
    return SeriesComponent;
}(SeriesComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsComponentGenerated, _super);
    function SeriesDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesDefaultsComponentGenerated;
}(SettingsComponent));

/**
 * The default options for all series
 * ([see example]({% slug series_chart_charts %}#toc-default-series-configuration)).
 */
var SeriesDefaultsComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsComponent, _super);
    // Place custom properties here
    function SeriesDefaultsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsComponent;
}(SeriesDefaultsComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsLabelsComponentGenerated, _super);
    function SeriesDefaultsLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesDefaultsLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the Chart series label.
 */
var SeriesDefaultsLabelsComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsLabelsComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsComponent;
}(SeriesDefaultsLabelsComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsLabelsFromComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsLabelsFromComponentGenerated, _super);
    function SeriesDefaultsLabelsFromComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.labels.from', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesDefaultsLabelsFromComponentGenerated;
}(SettingsComponent));

/**
 * The `from` label configuration of the Chart series.
 */
var SeriesDefaultsLabelsFromComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsLabelsFromComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsFromComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsFromComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsFromComponent;
}(SeriesDefaultsLabelsFromComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsLabelsToComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsLabelsToComponentGenerated, _super);
    function SeriesDefaultsLabelsToComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.labels.to', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesDefaultsLabelsToComponentGenerated;
}(SettingsComponent));

/**
 * The `to` label configuration of the Chart series.
 */
var SeriesDefaultsLabelsToComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsLabelsToComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsToComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsToComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsToComponent;
}(SeriesDefaultsLabelsToComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsNotesComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsNotesComponentGenerated, _super);
    function SeriesDefaultsNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesComponentGenerated.propDecorators = {
        line: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return SeriesDefaultsNotesComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the [`seriesDefaults`]({% slug api_charts_seriesdefaultscomponent %}) notes.
 */
var SeriesDefaultsNotesComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsNotesComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsNotesComponent;
}(SeriesDefaultsNotesComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsNotesIconComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsNotesIconComponentGenerated, _super);
    function SeriesDefaultsNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesDefaultsNotesIconComponentGenerated;
}(SettingsComponent));

/**
 * The icon of the notes.
 */
var SeriesDefaultsNotesIconComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsNotesIconComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsNotesIconComponent;
}(SeriesDefaultsNotesIconComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsNotesLabelComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsNotesLabelComponentGenerated, _super);
    function SeriesDefaultsNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesDefaultsNotesLabelComponentGenerated;
}(SettingsComponent));

/**
 * The label of the notes.
 */
var SeriesDefaultsNotesLabelComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsNotesLabelComponent, _super);
    // Place custom properties here
    function SeriesDefaultsNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsNotesLabelComponent;
}(SeriesDefaultsNotesLabelComponentGenerated));

/**
 * @hidden
 */
var SeriesDefaultsTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesDefaultsTooltipComponentGenerated, _super);
    function SeriesDefaultsTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesDefaultsTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the Chart series tooltip.
 */
var SeriesDefaultsTooltipComponent = /** @class */ (function (_super) {
    __extends(SeriesDefaultsTooltipComponent, _super);
    // Place custom properties here.
    function SeriesDefaultsTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsTooltipComponent;
}(SeriesDefaultsTooltipComponentGenerated));

/**
 * @hidden
 */
var SeriesErrorBarsComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesErrorBarsComponentGenerated, _super);
    function SeriesErrorBarsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'errorBars', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesErrorBarsComponentGenerated;
}(SettingsComponent));

/**
 * The error bars of the Chart series
 * ([see example]({% slug errorbars_chart_charts %})).
 */
var SeriesErrorBarsComponent = /** @class */ (function (_super) {
    __extends(SeriesErrorBarsComponent, _super);
    // Place custom properties here
    function SeriesErrorBarsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesErrorBarsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-error-bars',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesErrorBarsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesErrorBarsComponent;
}(SeriesErrorBarsComponentGenerated));

/**
 * @hidden
 */
var SeriesExtremesComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesExtremesComponentGenerated, _super);
    function SeriesExtremesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'extremes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesExtremesComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        rotation: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }]
    };
    return SeriesExtremesComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the Chart series extremes.
 * Applies to extreme outliers.
 * For more information, refer to [`series.outliers`]({% slug api_charts_seriesitemcomponent %}#toc-outliers).
 */
var SeriesExtremesComponent = /** @class */ (function (_super) {
    __extends(SeriesExtremesComponent, _super);
    // Place custom properties here
    function SeriesExtremesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesExtremesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-extremes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesExtremesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesExtremesComponent;
}(SeriesExtremesComponentGenerated));

/**
 * @hidden
 */
var SeriesHighlightComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesHighlightComponentGenerated, _super);
    function SeriesHighlightComponentGenerated(configurationService) {
        var _this = _super.call(this, 'highlight', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesHighlightComponentGenerated;
}(SettingsComponent));

/**
 * The Chart series highlighting configuration options.
 */
var SeriesHighlightComponent = /** @class */ (function (_super) {
    __extends(SeriesHighlightComponent, _super);
    function SeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesHighlightComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-highlight',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesHighlightComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesHighlightComponent;
}(SeriesHighlightComponentGenerated));

/**
 * @hidden
 */
var SeriesLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesLabelsComponentGenerated, _super);
    function SeriesLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the Chart series label
 * ([see example]({% slug labels_chart_charts %})).
 */
var SeriesLabelsComponent = /** @class */ (function (_super) {
    __extends(SeriesLabelsComponent, _super);
    // Place custom properties here
    function SeriesLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesLabelsComponent;
}(SeriesLabelsComponentGenerated));

/**
 * @hidden
 */
var SeriesLabelsFromComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesLabelsFromComponentGenerated, _super);
    function SeriesLabelsFromComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels.from', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesLabelsFromComponentGenerated;
}(SettingsComponent));

/**
 * The `from` label configuration of the Chart series.
 */
var SeriesLabelsFromComponent = /** @class */ (function (_super) {
    __extends(SeriesLabelsFromComponent, _super);
    // Place custom properties here
    function SeriesLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsFromComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsFromComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesLabelsFromComponent;
}(SeriesLabelsFromComponentGenerated));

/**
 * @hidden
 */
var SeriesLabelsToComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesLabelsToComponentGenerated, _super);
    function SeriesLabelsToComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels.to', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesLabelsToComponentGenerated;
}(SettingsComponent));

/**
 * The `to` label configuration of the Chart series.
 */
var SeriesLabelsToComponent = /** @class */ (function (_super) {
    __extends(SeriesLabelsToComponent, _super);
    // Place custom properties here
    function SeriesLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsToComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsToComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesLabelsToComponent;
}(SeriesLabelsToComponentGenerated));

/**
 * @hidden
 */
var SeriesMarkersComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesMarkersComponentGenerated, _super);
    function SeriesMarkersComponentGenerated(configurationService) {
        var _this = _super.call(this, 'markers', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesMarkersComponentGenerated;
}(SettingsComponent));

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
var SeriesMarkersComponent = /** @class */ (function (_super) {
    __extends(SeriesMarkersComponent, _super);
    // Place custom properties here
    function SeriesMarkersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesMarkersComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-markers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesMarkersComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesMarkersComponent;
}(SeriesMarkersComponentGenerated));

/**
 * @hidden
 */
var SeriesNotesComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesNotesComponentGenerated, _super);
    function SeriesNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesComponentGenerated.propDecorators = {
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return SeriesNotesComponentGenerated;
}(SettingsComponent));

/**
 * The series notes configuration
 * ([see example]({% slug notes_chart_charts %})).
 */
var SeriesNotesComponent = /** @class */ (function (_super) {
    __extends(SeriesNotesComponent, _super);
    // Place custom properties here
    function SeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesNotesComponent;
}(SeriesNotesComponentGenerated));

/**
 * @hidden
 */
var SeriesNotesIconComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesNotesIconComponentGenerated, _super);
    function SeriesNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesNotesIconComponentGenerated;
}(SettingsComponent));

/**
 * The icon of the notes.
 */
var SeriesNotesIconComponent = /** @class */ (function (_super) {
    __extends(SeriesNotesIconComponent, _super);
    // Place custom properties here
    function SeriesNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesNotesIconComponent;
}(SeriesNotesIconComponentGenerated));

/**
 * @hidden
 */
var SeriesNotesLabelComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesNotesLabelComponentGenerated, _super);
    function SeriesNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return SeriesNotesLabelComponentGenerated;
}(SettingsComponent));

/**
 * The label of the notes.
 */
var SeriesNotesLabelComponent = /** @class */ (function (_super) {
    __extends(SeriesNotesLabelComponent, _super);
    // Place custom properties here
    function SeriesNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesNotesLabelComponent;
}(SeriesNotesLabelComponentGenerated));

/**
 * @hidden
 */
var SeriesOutliersComponentGenerated = /** @class */ (function (_super) {
    __extends(SeriesOutliersComponentGenerated, _super);
    function SeriesOutliersComponentGenerated(configurationService) {
        var _this = _super.call(this, 'outliers', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesOutliersComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        rotation: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }]
    };
    return SeriesOutliersComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the Chart series outliers.
 * Applies to mild outliers.
 * For more information, refer to the [`series.extremes`]({% slug api_charts_seriesitemcomponent %}#toc-extremes) option.
 */
var SeriesOutliersComponent = /** @class */ (function (_super) {
    __extends(SeriesOutliersComponent, _super);
    // Place custom properties here
    function SeriesOutliersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesOutliersComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-outliers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesOutliersComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesOutliersComponent;
}(SeriesOutliersComponentGenerated));

/**
 * @hidden
 */
var TitleComponentGenerated = /** @class */ (function (_super) {
    __extends(TitleComponentGenerated, _super);
    function TitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return TitleComponentGenerated;
}(SettingsComponent));

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
var TitleComponent = /** @class */ (function (_super) {
    __extends(TitleComponent, _super);
    // Place custom properties here
    function TitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    TitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    TitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return TitleComponent;
}(TitleComponentGenerated));

/**
 * @hidden
 */
var TooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(TooltipComponentGenerated, _super);
    function TooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return TooltipComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
var TooltipComponent = /** @class */ (function (_super) {
    __extends(TooltipComponent, _super);
    function TooltipComponent(configurationService, templateService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.templateService = templateService;
        _this.markAsVisible();
        return _this;
    }
    TooltipComponent.prototype.ngAfterContentChecked = function () {
        this.templateService.setTemplate(this.seriesTooltipTemplate ? this.seriesTooltipTemplate.templateRef : null);
        this.templateService.setSharedTemplate(this.sharedTooltipTemplate ? this.sharedTooltipTemplate.templateRef : null);
    };
    TooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-chart-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    TooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: TooltipTemplateService }
    ]; };
    TooltipComponent.propDecorators = {
        seriesTooltipTemplate: [{ type: ContentChild, args: [SeriesTooltipTemplateDirective,] }],
        sharedTooltipTemplate: [{ type: ContentChild, args: [SharedTooltipTemplateDirective,] }]
    };
    return TooltipComponent;
}(TooltipComponentGenerated));

/**
 * @hidden
 */
var ValueAxisItemComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisItemComponentGenerated, _super);
    function ValueAxisItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    return ValueAxisItemComponentGenerated;
}(CollectionItemComponent));

/**
 * The configuration component for a value axis.
 */
var ValueAxisItemComponent = /** @class */ (function (_super) {
    __extends(ValueAxisItemComponent, _super);
    // Place custom properties here
    function ValueAxisItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    ValueAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return ValueAxisItemComponent;
}(ValueAxisItemComponentGenerated));

/**
 * @hidden
 */
var ValueAxisComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisComponentGenerated, _super);
    function ValueAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'valueAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    ValueAxisComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [ValueAxisItemComponent,] }]
    };
    return ValueAxisComponentGenerated;
}(CollectionComponent));

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
var ValueAxisComponent = /** @class */ (function (_super) {
    __extends(ValueAxisComponent, _super);
    // Place custom properties here
    function ValueAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    ValueAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return ValueAxisComponent;
}(ValueAxisComponentGenerated));

/**
 * @hidden
 */
var ValueAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisCrosshairComponentGenerated, _super);
    function ValueAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return ValueAxisCrosshairComponentGenerated;
}(SettingsComponent));

/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
var ValueAxisCrosshairComponent = /** @class */ (function (_super) {
    __extends(ValueAxisCrosshairComponent, _super);
    // Place custom properties here
    function ValueAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    ValueAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisCrosshairComponent;
}(ValueAxisCrosshairComponentGenerated));

/**
 * @hidden
 */
var ValueAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisCrosshairTooltipComponentGenerated, _super);
    function ValueAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return ValueAxisCrosshairTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var ValueAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(ValueAxisCrosshairTooltipComponent, _super);
    // Place custom properties here.
    function ValueAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    ValueAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisCrosshairTooltipComponent;
}(ValueAxisCrosshairTooltipComponentGenerated));

/**
 * @hidden
 */
var ValueAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisLabelsComponentGenerated, _super);
    function ValueAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return ValueAxisLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The axis labels configuration.
 */
var ValueAxisLabelsComponent = /** @class */ (function (_super) {
    __extends(ValueAxisLabelsComponent, _super);
    // Place custom properties here
    function ValueAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisLabelsComponent;
}(ValueAxisLabelsComponentGenerated));

/**
 * @hidden
 */
var ValueAxisNotesComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisNotesComponentGenerated, _super);
    function ValueAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return ValueAxisNotesComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the value axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
var ValueAxisNotesComponent = /** @class */ (function (_super) {
    __extends(ValueAxisNotesComponent, _super);
    // Place custom properties here
    function ValueAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisNotesComponent;
}(ValueAxisNotesComponentGenerated));

/**
 * @hidden
 */
var ValueAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisNotesIconComponentGenerated, _super);
    function ValueAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return ValueAxisNotesIconComponentGenerated;
}(SettingsComponent));

/**
 * The icon of the notes.
 */
var ValueAxisNotesIconComponent = /** @class */ (function (_super) {
    __extends(ValueAxisNotesIconComponent, _super);
    // Place custom properties here
    function ValueAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisNotesIconComponent;
}(ValueAxisNotesIconComponentGenerated));

/**
 * @hidden
 */
var ValueAxisNotesLabelComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisNotesLabelComponentGenerated, _super);
    function ValueAxisNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return ValueAxisNotesLabelComponentGenerated;
}(SettingsComponent));

/**
 * The label of the notes.
 */
var ValueAxisNotesLabelComponent = /** @class */ (function (_super) {
    __extends(ValueAxisNotesLabelComponent, _super);
    // Place custom properties here
    function ValueAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisNotesLabelComponent;
}(ValueAxisNotesLabelComponentGenerated));

/**
 * @hidden
 */
var ValueAxisTitleComponentGenerated = /** @class */ (function (_super) {
    __extends(ValueAxisTitleComponentGenerated, _super);
    function ValueAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return ValueAxisTitleComponentGenerated;
}(SettingsComponent));

/**
 * The title configuration of the value axis.
 */
var ValueAxisTitleComponent = /** @class */ (function (_super) {
    __extends(ValueAxisTitleComponent, _super);
    // Place custom properties here
    function ValueAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-value-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ValueAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ValueAxisTitleComponent;
}(ValueAxisTitleComponentGenerated));

/**
 * @hidden
 */
var XAxisItemComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisItemComponentGenerated, _super);
    function XAxisItemComponentGenerated(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.notifyChanges({ weekStartDay: intl.firstDay(localeId) });
        return _this;
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
    return XAxisItemComponentGenerated;
}(CollectionItemComponent));

/**
 * The configuration component for an X axis
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
var XAxisItemComponent = /** @class */ (function (_super) {
    __extends(XAxisItemComponent, _super);
    // Place custom properties here
    function XAxisItemComponent(configurationService, collectionService, intl, localeId) {
        var _this = _super.call(this, configurationService, collectionService, intl, localeId) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.intl = intl;
        return _this;
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
    XAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: IntlService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return XAxisItemComponent;
}(XAxisItemComponentGenerated));

/**
 * @hidden
 */
var XAxisComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisComponentGenerated, _super);
    function XAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'xAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    XAxisComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [XAxisItemComponent,] }]
    };
    return XAxisComponentGenerated;
}(CollectionComponent));

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
var XAxisComponent = /** @class */ (function (_super) {
    __extends(XAxisComponent, _super);
    // Place custom properties here
    function XAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    XAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return XAxisComponent;
}(XAxisComponentGenerated));

/**
 * @hidden
 */
var XAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisCrosshairComponentGenerated, _super);
    function XAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return XAxisCrosshairComponentGenerated;
}(SettingsComponent));

/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
var XAxisCrosshairComponent = /** @class */ (function (_super) {
    __extends(XAxisCrosshairComponent, _super);
    // Place custom properties here
    function XAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    XAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisCrosshairComponent;
}(XAxisCrosshairComponentGenerated));

/**
 * @hidden
 */
var XAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisCrosshairTooltipComponentGenerated, _super);
    function XAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return XAxisCrosshairTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var XAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(XAxisCrosshairTooltipComponent, _super);
    // Place custom properties here.
    function XAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    XAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisCrosshairTooltipComponent;
}(XAxisCrosshairTooltipComponentGenerated));

/**
 * @hidden
 */
var XAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisLabelsComponentGenerated, _super);
    function XAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return XAxisLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The axis labels configuration.
 */
var XAxisLabelsComponent = /** @class */ (function (_super) {
    __extends(XAxisLabelsComponent, _super);
    // Place custom properties here
    function XAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisLabelsComponent;
}(XAxisLabelsComponentGenerated));

/**
 * @hidden
 */
var XAxisNotesComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisNotesComponentGenerated, _super);
    function XAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return XAxisNotesComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the X-axis notes.
 * For an example on the basic usage of the XAxisNotesComponent,
 * refer to the [demo on the XAxisComponent]({% slug api_charts_xaxiscomponent %})
 * or to the documentation about the
 * [axis notes]({% slug notes_chart_charts %}#toc-axis-notes).
 */
var XAxisNotesComponent = /** @class */ (function (_super) {
    __extends(XAxisNotesComponent, _super);
    // Place custom properties here
    function XAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisNotesComponent;
}(XAxisNotesComponentGenerated));

/**
 * @hidden
 */
var XAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisNotesIconComponentGenerated, _super);
    function XAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return XAxisNotesIconComponentGenerated;
}(SettingsComponent));

/**
 * The icon of the notes.
 */
var XAxisNotesIconComponent = /** @class */ (function (_super) {
    __extends(XAxisNotesIconComponent, _super);
    // Place custom properties here
    function XAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisNotesIconComponent;
}(XAxisNotesIconComponentGenerated));

/**
 * @hidden
 */
var XAxisNotesLabelComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisNotesLabelComponentGenerated, _super);
    function XAxisNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return XAxisNotesLabelComponentGenerated;
}(SettingsComponent));

/**
 * The label of the notes.
 */
var XAxisNotesLabelComponent = /** @class */ (function (_super) {
    __extends(XAxisNotesLabelComponent, _super);
    // Place custom properties here
    function XAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisNotesLabelComponent;
}(XAxisNotesLabelComponentGenerated));

/**
 * @hidden
 */
var XAxisTitleComponentGenerated = /** @class */ (function (_super) {
    __extends(XAxisTitleComponentGenerated, _super);
    function XAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return XAxisTitleComponentGenerated;
}(SettingsComponent));

/**
 * The title configuration of the Scatter Chart X axis.
 */
var XAxisTitleComponent = /** @class */ (function (_super) {
    __extends(XAxisTitleComponent, _super);
    // Place custom properties here
    function XAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisTitleComponent;
}(XAxisTitleComponentGenerated));

/**
 * @hidden
 */
var YAxisItemComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisItemComponentGenerated, _super);
    function YAxisItemComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    return YAxisItemComponentGenerated;
}(CollectionItemComponent));

/**
 * The configuration component for the Y axis
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
var YAxisItemComponent = /** @class */ (function (_super) {
    __extends(YAxisItemComponent, _super);
    // Place custom properties here
    function YAxisItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    YAxisItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return YAxisItemComponent;
}(YAxisItemComponentGenerated));

/**
 * @hidden
 */
var YAxisComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisComponentGenerated, _super);
    function YAxisComponentGenerated(configurationService, collectionService) {
        var _this = _super.call(this, 'yAxis', configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
    }
    YAxisComponentGenerated.propDecorators = {
        children: [{ type: ContentChildren, args: [YAxisItemComponent,] }]
    };
    return YAxisComponentGenerated;
}(CollectionComponent));

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
var YAxisComponent = /** @class */ (function (_super) {
    __extends(YAxisComponent, _super);
    // Place custom properties here
    function YAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    YAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return YAxisComponent;
}(YAxisComponentGenerated));

/**
 * @hidden
 */
var YAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisCrosshairComponentGenerated, _super);
    function YAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return YAxisCrosshairComponentGenerated;
}(SettingsComponent));

/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
var YAxisCrosshairComponent = /** @class */ (function (_super) {
    __extends(YAxisCrosshairComponent, _super);
    // Place custom properties here
    function YAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    YAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisCrosshairComponent;
}(YAxisCrosshairComponentGenerated));

/**
 * @hidden
 */
var YAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisCrosshairTooltipComponentGenerated, _super);
    function YAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return YAxisCrosshairTooltipComponentGenerated;
}(SettingsComponent));

/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var YAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(YAxisCrosshairTooltipComponent, _super);
    // Place custom properties here.
    function YAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    YAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisCrosshairTooltipComponent;
}(YAxisCrosshairTooltipComponentGenerated));

/**
 * @hidden
 */
var YAxisLabelsComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisLabelsComponentGenerated, _super);
    function YAxisLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return YAxisLabelsComponentGenerated;
}(SettingsComponent));

/**
 * The axis labels configuration.
 */
var YAxisLabelsComponent = /** @class */ (function (_super) {
    __extends(YAxisLabelsComponent, _super);
    // Place custom properties here
    function YAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisLabelsComponent;
}(YAxisLabelsComponentGenerated));

/**
 * @hidden
 */
var YAxisNotesComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisNotesComponentGenerated, _super);
    function YAxisNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesComponentGenerated.propDecorators = {
        data: [{ type: Input }],
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return YAxisNotesComponentGenerated;
}(SettingsComponent));

/**
 * The configuration of the Y axis notes
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
var YAxisNotesComponent = /** @class */ (function (_super) {
    __extends(YAxisNotesComponent, _super);
    // Place custom properties here
    function YAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisNotesComponent;
}(YAxisNotesComponentGenerated));

/**
 * @hidden
 */
var YAxisNotesIconComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisNotesIconComponentGenerated, _super);
    function YAxisNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return YAxisNotesIconComponentGenerated;
}(SettingsComponent));

/**
 * The icon of the notes.
 */
var YAxisNotesIconComponent = /** @class */ (function (_super) {
    __extends(YAxisNotesIconComponent, _super);
    // Place custom properties here
    function YAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisNotesIconComponent;
}(YAxisNotesIconComponentGenerated));

/**
 * @hidden
 */
var YAxisNotesLabelComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisNotesLabelComponentGenerated, _super);
    function YAxisNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return YAxisNotesLabelComponentGenerated;
}(SettingsComponent));

/**
 * The label of the notes.
 */
var YAxisNotesLabelComponent = /** @class */ (function (_super) {
    __extends(YAxisNotesLabelComponent, _super);
    // Place custom properties here
    function YAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisNotesLabelComponent;
}(YAxisNotesLabelComponentGenerated));

/**
 * @hidden
 */
var YAxisTitleComponentGenerated = /** @class */ (function (_super) {
    __extends(YAxisTitleComponentGenerated, _super);
    function YAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    return YAxisTitleComponentGenerated;
}(SettingsComponent));

/**
 * The title configuration of the Scatter Chart Y axis.
 */
var YAxisTitleComponent = /** @class */ (function (_super) {
    __extends(YAxisTitleComponent, _super);
    // Place custom properties here
    function YAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisTitleComponent;
}(YAxisTitleComponentGenerated));

/**
 * @hidden
 */
var ZoomableComponentGenerated = /** @class */ (function (_super) {
    __extends(ZoomableComponentGenerated, _super);
    function ZoomableComponentGenerated(configurationService) {
        var _this = _super.call(this, 'zoomable', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ZoomableComponentGenerated.propDecorators = {
        mousewheel: [{ type: Input }],
        selection: [{ type: Input }]
    };
    return ZoomableComponentGenerated;
}(SettingsComponent));

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
var ZoomableComponent = /** @class */ (function (_super) {
    __extends(ZoomableComponent, _super);
    // Place custom properties here
    function ZoomableComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ZoomableComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-zoomable',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    ZoomableComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return ZoomableComponent;
}(ZoomableComponentGenerated));

/**
 * @hidden
 */
var CHART_DIRECTIVES = [
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
var NavigatorFilterEvent = /** @class */ (function (_super) {
    __extends(NavigatorFilterEvent, _super);
    /**
     * Constructs the event arguments from a raw object.
     */
    function NavigatorFilterEvent(e, sender) {
        var _this = _super.call(this, sender) || this;
        _this.from = e.from;
        _this.to = e.to;
        return _this;
    }
    return NavigatorFilterEvent;
}(BaseEvent));

// Re-export event types

/**
 * @hidden
 */
var RootConfigurationService = /** @class */ (function (_super) {
    __extends(RootConfigurationService, _super);
    function RootConfigurationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RootConfigurationService.decorators = [
        { type: Injectable },
    ];
    return RootConfigurationService;
}(ConfigurationService));

var EVENT_MAP$1 = {
    navigatorFilter: NavigatorFilterEvent
};
/**
 * @hidden
 */
var StockInstanceEventService = /** @class */ (function (_super) {
    __extends(StockInstanceEventService, _super);
    function StockInstanceEventService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockInstanceEventService.prototype.create = function (name, args, sender) {
        if (EVENT_MAP$1[name]) {
            return new EVENT_MAP$1[name](args, sender);
        }
        return _super.prototype.create.call(this, name, args, sender);
    };
    return StockInstanceEventService;
}(InstanceEventService));

var NAVIGATOR_DEFAULTS = {
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
var StockChartComponent = /** @class */ (function (_super) {
    __extends(StockChartComponent, _super);
    function StockChartComponent(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        var _this = _super.call(this, configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) || this;
        _this.configurationService = configurationService;
        _this.themeService = themeService;
        _this.element = element;
        _this.intl = intl;
        _this.localizationService = localizationService;
        _this.ngZone = ngZone;
        _this.instanceEventService = instanceEventService;
        _this.changeDetector = changeDetector;
        _this.renderer = renderer;
        /**
         * Fires when the navigator range is changed.
         */
        _this.navigatorFilter = new EventEmitter();
        _this.redrawSlaves = false;
        return _this;
    }
    /**
     * If called, the navigator pane is not redrawn the next time the StockChart options are updated.
     * The method is useful if you need to update only the main series data for the selected period.
     */
    StockChartComponent.prototype.skipNavigatorRedraw = function () {
        this.redrawSlaves = true;
    };
    StockChartComponent.prototype.createInstance = function (element, observer) {
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
    };
    StockChartComponent.prototype.updateOptions = function () {
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
    };
    StockChartComponent.prototype.applyNavigatorDefaults = function () {
        this.options.navigator = Object.assign({}, this.options.navigator, NAVIGATOR_DEFAULTS);
    };
    StockChartComponent.prototype.isDevMode = function () {
        return isDevMode();
    };
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
                    template: "\n        <div #surface class=\"k-chart-surface\"></div>\n        <kendo-chart-crosshair-tooltips-container [popupSettings]=\"popupSettings\">\n        </kendo-chart-crosshair-tooltips-container>\n        <kendo-chart-tooltip-popup (leave)=\"tooltipMouseleave($event)\" [popupSettings]=\"popupSettings\">\n        </kendo-chart-tooltip-popup>\n        <kendo-resize-sensor (resize)=\"onResize($event)\"></kendo-resize-sensor>\n    "
                },] },
    ];
    /** @nocollapse */
    StockChartComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: ThemeService },
        { type: ElementRef },
        { type: IntlService },
        { type: LocalizationService },
        { type: NgZone },
        { type: StockInstanceEventService },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    StockChartComponent.propDecorators = {
        navigator: [{ type: Input }],
        pannable: [{ type: Input }],
        zoomable: [{ type: Input }],
        navigatorFilter: [{ type: Output }]
    };
    return StockChartComponent;
}(ChartComponent));

/**
 * @hidden
 */
var PREFIX = new InjectionToken('configuration prefix');
/**
 * @hidden
 */
var PrefixConfigurationService = /** @class */ (function (_super) {
    __extends(PrefixConfigurationService, _super);
    function PrefixConfigurationService(rootService, prefix, ngZone) {
        var _this = _super.call(this, ngZone) || this;
        _this.rootService = rootService;
        _this.prefix = prefix;
        return _this;
    }
    PrefixConfigurationService.prototype.push = function (store) {
        this.rootService.notify(new Change(this.prefix, store));
    };
    PrefixConfigurationService.prototype.notify = function (change) {
        change.key = this.prefix + (change.key ? "." + change.key : '');
        this.rootService.notify(change);
    };
    PrefixConfigurationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PrefixConfigurationService.ctorParameters = function () { return [
        { type: RootConfigurationService, decorators: [{ type: Inject, args: [RootConfigurationService,] }] },
        { type: String, decorators: [{ type: Inject, args: [PREFIX,] }] },
        { type: NgZone }
    ]; };
    return PrefixConfigurationService;
}(ConfigurationService));

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
var NavigatorComponent = /** @class */ (function (_super) {
    __extends(NavigatorComponent, _super);
    function NavigatorComponent(configurationService) {
        var _this = _super.call(this, '', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
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
    NavigatorComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    NavigatorComponent.propDecorators = {
        visible: [{ type: Input }],
        categoryAxis: [{ type: Input }],
        hint: [{ type: Input }],
        pane: [{ type: Input }],
        select: [{ type: Input }],
        series: [{ type: Input }]
    };
    return NavigatorComponent;
}(SettingsComponent));

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
var NavigatorCategoryAxisComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisComponent, _super);
    function NavigatorCategoryAxisComponent(configurationService, intl, localeId) {
        var _this = _super.call(this, configurationService, null, intl, localeId) || this;
        _this.configurationService = configurationService;
        return _this;
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
    NavigatorCategoryAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: IntlService },
        { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
    ]; };
    return NavigatorCategoryAxisComponent;
}(CategoryAxisItemComponent));

/**
 * The configuration options of the crosshair.
 */
var NavigatorCategoryAxisCrosshairComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisCrosshairComponent, _super);
    function NavigatorCategoryAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisCrosshairComponent;
}(CategoryAxisCrosshairComponent));

/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
var NavigatorCategoryAxisCrosshairTooltipComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisCrosshairTooltipComponent, _super);
    function NavigatorCategoryAxisCrosshairTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisCrosshairTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-crosshair-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisCrosshairTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisCrosshairTooltipComponent;
}(CategoryAxisCrosshairTooltipComponent));

/**
 * The configuration of the axis labels.
 */
var NavigatorCategoryAxisLabelsComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisLabelsComponent, _super);
    function NavigatorCategoryAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisLabelsComponent;
}(CategoryAxisLabelsComponent));

/**
 * The configuration of the category axis notes.
 */
var NavigatorCategoryAxisNotesComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisNotesComponent, _super);
    function NavigatorCategoryAxisNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesComponent;
}(CategoryAxisNotesComponent));

/**
 * The icon of the notes.
 */
var NavigatorCategoryAxisNotesIconComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisNotesIconComponent, _super);
    function NavigatorCategoryAxisNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesIconComponent;
}(CategoryAxisNotesIconComponent));

/**
 * The label of the notes.
 */
var NavigatorCategoryAxisNotesLabelComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisNotesLabelComponent, _super);
    function NavigatorCategoryAxisNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisNotesLabelComponent;
}(CategoryAxisNotesLabelComponent));

/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from zero.
 * Categories with indexes in the range (`select.from`, `select.to`) will be selected.
 * This means that the last category in the range will not be included in the selection.
 * If the categories are dates, the range has also to be specified with date values.
 */
var NavigatorCategoryAxisSelectComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisSelectComponent, _super);
    function NavigatorCategoryAxisSelectComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisSelectComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-select',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisSelectComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisSelectComponent;
}(CategoryAxisSelectComponent));

/**
 * The title configuration of the navigator category axis.
 */
var NavigatorCategoryAxisTitleComponent = /** @class */ (function (_super) {
    __extends(NavigatorCategoryAxisTitleComponent, _super);
    function NavigatorCategoryAxisTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorCategoryAxisTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-category-axis-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorCategoryAxisTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorCategoryAxisTitleComponent;
}(CategoryAxisTitleComponent));

/**
 * The default options of the navigator hint
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
var NavigatorHintComponent = /** @class */ (function (_super) {
    __extends(NavigatorHintComponent, _super);
    function NavigatorHintComponent(configurationService) {
        var _this = _super.call(this, 'hint', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorHintComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-hint',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorHintComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    NavigatorHintComponent.propDecorators = {
        content: [{ type: Input }],
        format: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return NavigatorHintComponent;
}(SettingsComponent));

/**
 * The configuration component of the navigator pane
 * ([see example]({% slug overview_stockchart_charts %}#toc-navigator)).
 */
var NavigatorPaneComponent = /** @class */ (function (_super) {
    __extends(NavigatorPaneComponent, _super);
    function NavigatorPaneComponent(configurationService) {
        var _this = _super.call(this, configurationService, null) || this;
        _this.configurationService = configurationService;
        return _this;
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
    NavigatorPaneComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorPaneComponent;
}(PaneComponentGenerated));

/**
 * The title configuration of the StockChart navigator pane.
 */
var NavigatorPaneTitleComponent = /** @class */ (function (_super) {
    __extends(NavigatorPaneTitleComponent, _super);
    function NavigatorPaneTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorPaneTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-pane-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorPaneTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorPaneTitleComponent;
}(PanesTitleComponent));

/**
 * Specifies the initially selected range.
 * If no range is specified, the full range of values is rendered.
 */
var NavigatorSelectComponent = /** @class */ (function (_super) {
    __extends(NavigatorSelectComponent, _super);
    function NavigatorSelectComponent(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSelectComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-select',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSelectComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    NavigatorSelectComponent.propDecorators = {
        from: [{ type: Input }],
        to: [{ type: Input }],
        mousewheel: [{ type: Input }]
    };
    return NavigatorSelectComponent;
}(SettingsComponent));

/**
 * The configuration component of a navigator series item
 * ([see example]({% slug navigator_stockchart_charts %})).
 */
var NavigatorSeriesItemComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesItemComponent, _super);
    function NavigatorSeriesItemComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    NavigatorSeriesItemComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return NavigatorSeriesItemComponent;
}(SeriesItemComponent));

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
var NavigatorSeriesComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesComponent, _super);
    function NavigatorSeriesComponent(configurationService, collectionService, tooltipTemplateService) {
        var _this = _super.call(this, configurationService, collectionService, tooltipTemplateService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        _this.tooltipTemplateService = tooltipTemplateService;
        return _this;
    }
    NavigatorSeriesComponent.prototype.readTooltipTemplates = function () {
    };
    NavigatorSeriesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [CollectionService],
                    selector: 'kendo-chart-navigator-series',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService },
        { type: TooltipTemplateService }
    ]; };
    NavigatorSeriesComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [NavigatorSeriesItemComponent,] }]
    };
    return NavigatorSeriesComponent;
}(SeriesComponent));

/**
 * The error bars of the StockChart navigator series.
 */
var NavigatorSeriesErrorBarsComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesErrorBarsComponent, _super);
    function NavigatorSeriesErrorBarsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesErrorBarsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-error-bars',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesErrorBarsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesErrorBarsComponent;
}(SeriesErrorBarsComponent));

/**
 * The extremes configuration of the StockChart navigator series. Applies to extreme outliers.
 */
var NavigatorSeriesExtremesComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesExtremesComponent, _super);
    function NavigatorSeriesExtremesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesExtremesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-extremes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesExtremesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesExtremesComponent;
}(SeriesExtremesComponent));

/**
 * The configuration options of the StockChart series highlight.
 */
var NavigatorSeriesHighlightComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesHighlightComponent, _super);
    function NavigatorSeriesHighlightComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesHighlightComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-highlight',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesHighlightComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesHighlightComponent;
}(SeriesHighlightComponent));

/**
 * The label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesLabelsComponent, _super);
    function NavigatorSeriesLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsComponent;
}(SeriesLabelsComponent));

/**
 * The `from` label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsFromComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesLabelsFromComponent, _super);
    function NavigatorSeriesLabelsFromComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsFromComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels-from',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsFromComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsFromComponent;
}(SeriesLabelsFromComponent));

/**
 * The `to` label configuration of the StockChart navigator series.
 */
var NavigatorSeriesLabelsToComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesLabelsToComponent, _super);
    function NavigatorSeriesLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    NavigatorSeriesLabelsToComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesLabelsToComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesLabelsToComponent;
}(SeriesLabelsToComponent));

/**
 * The marker configuration of the StockChart navigator series.
 */
var NavigatorSeriesMarkersComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesMarkersComponent, _super);
    function NavigatorSeriesMarkersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesMarkersComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-markers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesMarkersComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesMarkersComponent;
}(SeriesMarkersComponent));

/**
 * The notes configuration of the StockChart navigator series.
 */
var NavigatorSeriesNotesComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesNotesComponent, _super);
    function NavigatorSeriesNotesComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesNotesComponent;
}(SeriesNotesComponent));

/**
 * The icon of the notes.
 */
var NavigatorSeriesNotesIconComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesNotesIconComponent, _super);
    function NavigatorSeriesNotesIconComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesIconComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes-icon',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesIconComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesNotesIconComponent;
}(SeriesNotesIconComponent));

/**
 * The label of the notes.
 */
var NavigatorSeriesNotesLabelComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesNotesLabelComponent, _super);
    function NavigatorSeriesNotesLabelComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesNotesLabelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-notes-label',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesNotesLabelComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesNotesLabelComponent;
}(SeriesNotesLabelComponent));

/**
 * The outliers configuration of the StockChart navigator series. Applies to mild outliers.
 */
var NavigatorSeriesOutliersComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesOutliersComponent, _super);
    function NavigatorSeriesOutliersComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesOutliersComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-outliers',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesOutliersComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesOutliersComponent;
}(SeriesOutliersComponent));

/**
 * The tooltip configuration of the StockChart navigator series.
 * The StockChart navigator series tooltip is displayed when the `navigator.series.tooltip.visible` option is set to `true`.
 */
var NavigatorSeriesTooltipComponent = /** @class */ (function (_super) {
    __extends(NavigatorSeriesTooltipComponent, _super);
    function NavigatorSeriesTooltipComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    NavigatorSeriesTooltipComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-navigator-series-item-tooltip',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    NavigatorSeriesTooltipComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return NavigatorSeriesTooltipComponent;
}(SeriesTooltipComponent));

/**
 * @hidden
 */
var STOCK_CHART_DIRECTIVES = [
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
var SparklineComponent = /** @class */ (function (_super) {
    __extends(SparklineComponent, _super);
    function SparklineComponent(configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) {
        var _this = _super.call(this, configurationService, themeService, element, intl, localizationService, ngZone, instanceEventService, changeDetector, renderer) || this;
        _this.configurationService = configurationService;
        _this.themeService = themeService;
        _this.element = element;
        _this.intl = intl;
        _this.localizationService = localizationService;
        _this.ngZone = ngZone;
        _this.instanceEventService = instanceEventService;
        _this.changeDetector = changeDetector;
        _this.renderer = renderer;
        /**
         * @hidden
         */
        _this.tooltipWrapperClass = 'k-sparkline-tooltip-wrapper';
        /**
         * @hidden
         */
        _this.tooltipContentClasses = {
            'k-sparkline-tooltip': true
        };
        return _this;
    }
    SparklineComponent.prototype.createInstance = function (element, observer) {
        this.instance = new Sparkline(element, Sparkline.normalizeOptions(this.options), this.theme, {
            intlService: this.intl,
            observer: observer,
            rtl: this.rtl,
            sender: this
        });
    };
    SparklineComponent.prototype.updateOptions = function () {
        this.instance.setOptions(Sparkline.normalizeOptions(this.options));
    };
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
                    template: "\n        <span #surface class=\"k-chart-surface\"></span>\n        <kendo-chart-crosshair-tooltips-container [popupSettings]=\"popupSettings\">\n        </kendo-chart-crosshair-tooltips-container>\n        <kendo-chart-tooltip-popup [animate]=\"false\" [wrapperClass]=\"tooltipWrapperClass\"\n            [classNames]=\"tooltipContentClasses\" (leave)=\"tooltipMouseleave($event)\" [popupSettings]=\"popupSettings\">\n        </kendo-chart-tooltip-popup>\n        <kendo-resize-sensor (resize)=\"onResize($event)\"></kendo-resize-sensor>\n    "
                },] },
    ];
    /** @nocollapse */
    SparklineComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: ThemeService },
        { type: ElementRef },
        { type: IntlService },
        { type: LocalizationService },
        { type: NgZone },
        { type: InstanceEventService },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    SparklineComponent.propDecorators = {
        type: [{ type: Input }],
        data: [{ type: Input }]
    };
    return SparklineComponent;
}(ChartComponent));

/**
 * @hidden
 */
var SPARKLINE_DIRECTIVES = [
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
var ChartModule = /** @class */ (function () {
    function ChartModule() {
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
    return ChartModule;
}());

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
var StockChartModule = /** @class */ (function () {
    function StockChartModule() {
    }
    StockChartModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [STOCK_CHART_DIRECTIVES],
                    exports: [STOCK_CHART_DIRECTIVES, ChartModule],
                    imports: [ChartModule, CommonModule, PopupModule, ResizeSensorModule]
                },] },
    ];
    return StockChartModule;
}());

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
var SparklineModule = /** @class */ (function () {
    function SparklineModule() {
    }
    SparklineModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SPARKLINE_DIRECTIVES],
                    exports: [SPARKLINE_DIRECTIVES, ChartModule],
                    imports: [ChartModule, CommonModule, PopupModule, ResizeSensorModule]
                },] },
    ];
    return SparklineModule;
}());

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
var ChartsModule = /** @class */ (function () {
    function ChartsModule() {
    }
    ChartsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [ChartModule, SparklineModule, StockChartModule]
                },] },
    ];
    return ChartsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ChartComponentGenerated, AxisDefaultsComponentGenerated, AxisDefaultsCrosshairComponentGenerated, AxisDefaultsCrosshairTooltipComponentGenerated, AxisDefaultsLabelsComponentGenerated, AxisDefaultsTitleComponentGenerated, CategoryAxisItemComponentGenerated, CategoryAxisCrosshairComponentGenerated, CategoryAxisCrosshairTooltipComponentGenerated, CategoryAxisLabelsComponentGenerated, CategoryAxisNotesComponentGenerated, CategoryAxisNotesIconComponentGenerated, CategoryAxisNotesLabelComponentGenerated, CategoryAxisSelectComponentGenerated, CategoryAxisTitleComponentGenerated, CategoryAxisComponentGenerated, ChartAreaComponentGenerated, DonutCenterTemplateDirective, LegendComponentGenerated, LegendInactiveItemsComponentGenerated, LegendItemComponentGenerated, PaneComponentGenerated, PanesTitleComponentGenerated, PanesComponentGenerated, PlotAreaComponentGenerated, SeriesDefaultsComponentGenerated, SeriesDefaultsLabelsComponentGenerated, SeriesDefaultsLabelsFromComponentGenerated, SeriesDefaultsLabelsToComponentGenerated, SeriesDefaultsNotesComponentGenerated, SeriesDefaultsNotesIconComponentGenerated, SeriesDefaultsNotesLabelComponentGenerated, SeriesDefaultsTooltipComponentGenerated, SeriesItemComponentGenerated, SeriesErrorBarsComponentGenerated, SeriesExtremesComponentGenerated, SeriesHighlightComponentGenerated, SeriesLabelsComponentGenerated, SeriesLabelsFromComponentGenerated, SeriesLabelsToComponentGenerated, SeriesMarkersComponentGenerated, SeriesNotesComponentGenerated, SeriesNotesIconComponentGenerated, SeriesNotesLabelComponentGenerated, SeriesOutliersComponentGenerated, SeriesTooltipComponentGenerated, SeriesComponentGenerated, TitleComponentGenerated, TooltipComponentGenerated, BaseTooltip, bodyFactory, CrosshairTooltipComponent, SeriesTooltipTemplateDirective, SharedTooltipTemplateDirective, ValueAxisItemComponentGenerated, ValueAxisCrosshairComponentGenerated, ValueAxisCrosshairTooltipComponentGenerated, ValueAxisLabelsComponentGenerated, ValueAxisNotesComponentGenerated, ValueAxisNotesIconComponentGenerated, ValueAxisNotesLabelComponentGenerated, ValueAxisTitleComponentGenerated, ValueAxisComponentGenerated, XAxisItemComponentGenerated, XAxisCrosshairComponentGenerated, XAxisCrosshairTooltipComponentGenerated, XAxisLabelsComponentGenerated, XAxisNotesComponentGenerated, XAxisNotesIconComponentGenerated, XAxisNotesLabelComponentGenerated, XAxisTitleComponentGenerated, XAxisComponentGenerated, YAxisItemComponentGenerated, YAxisCrosshairComponentGenerated, YAxisCrosshairTooltipComponentGenerated, YAxisLabelsComponentGenerated, YAxisNotesComponentGenerated, YAxisNotesIconComponentGenerated, YAxisNotesLabelComponentGenerated, YAxisTitleComponentGenerated, YAxisComponentGenerated, ZoomableComponentGenerated, CollectionItemComponent, CollectionComponent, CollectionService, ConfigurationService, PREFIX, PrefixConfigurationService, RootConfigurationService, SettingsComponent, ThemeService, TooltipTemplateService, BaseEvent, InstanceEventService, LegendEvent, NoteEvent, PreventableEvent, SeriesEvent, StockInstanceEventService, NavigatorComponent, NavigatorCategoryAxisComponent, NavigatorCategoryAxisCrosshairComponent, NavigatorCategoryAxisCrosshairTooltipComponent, NavigatorCategoryAxisLabelsComponent, NavigatorCategoryAxisNotesComponent, NavigatorCategoryAxisNotesIconComponent, NavigatorCategoryAxisNotesLabelComponent, NavigatorCategoryAxisSelectComponent, NavigatorCategoryAxisTitleComponent, NavigatorHintComponent, NavigatorPaneComponent, NavigatorPaneTitleComponent, NavigatorSelectComponent, NavigatorSeriesItemComponent, NavigatorSeriesErrorBarsComponent, NavigatorSeriesExtremesComponent, NavigatorSeriesHighlightComponent, NavigatorSeriesLabelsComponent, NavigatorSeriesLabelsFromComponent, NavigatorSeriesLabelsToComponent, NavigatorSeriesMarkersComponent, NavigatorSeriesNotesComponent, NavigatorSeriesNotesIconComponent, NavigatorSeriesNotesLabelComponent, NavigatorSeriesOutliersComponent, NavigatorSeriesTooltipComponent, NavigatorSeriesComponent, ChartModule, StockChartModule, SparklineModule, ChartsModule, TooltipPopupComponent, CrosshairTooltipsContainerComponent, ChartComponent, AxisDefaultsComponent, AxisDefaultsCrosshairComponent, AxisDefaultsCrosshairTooltipComponent, AxisDefaultsLabelsComponent, AxisDefaultsTitleComponent, CategoryAxisComponent, CategoryAxisCrosshairComponent, CategoryAxisCrosshairTooltipComponent, CategoryAxisItemComponent, CategoryAxisLabelsComponent, CategoryAxisNotesComponent, CategoryAxisNotesIconComponent, CategoryAxisNotesLabelComponent, CategoryAxisSelectComponent, CategoryAxisTitleComponent, ChartAreaComponent, LegendComponent, LegendInactiveItemsComponent, LegendItemComponent, PaneComponent, PanesComponent, PanesTitleComponent, PlotAreaComponent, SeriesComponent, SeriesDefaultsComponent, SeriesDefaultsLabelsComponent, SeriesDefaultsLabelsFromComponent, SeriesDefaultsLabelsToComponent, SeriesDefaultsNotesComponent, SeriesDefaultsNotesIconComponent, SeriesDefaultsNotesLabelComponent, SeriesDefaultsTooltipComponent, SeriesErrorBarsComponent, SeriesExtremesComponent, SeriesHighlightComponent, SeriesItemComponent, SeriesLabelsComponent, SeriesLabelsFromComponent, SeriesLabelsToComponent, SeriesMarkersComponent, SeriesNotesComponent, SeriesNotesIconComponent, SeriesNotesLabelComponent, SeriesOutliersComponent, SeriesTooltipComponent, TitleComponent, TooltipComponent, ValueAxisComponent, ValueAxisCrosshairComponent, ValueAxisCrosshairTooltipComponent, ValueAxisItemComponent, ValueAxisLabelsComponent, ValueAxisNotesComponent, ValueAxisNotesIconComponent, ValueAxisNotesLabelComponent, ValueAxisTitleComponent, XAxisComponent, XAxisCrosshairComponent, XAxisCrosshairTooltipComponent, XAxisItemComponent, XAxisLabelsComponent, XAxisNotesComponent, XAxisNotesIconComponent, XAxisNotesLabelComponent, XAxisTitleComponent, YAxisComponent, YAxisCrosshairComponent, YAxisCrosshairTooltipComponent, YAxisItemComponent, YAxisLabelsComponent, YAxisNotesComponent, YAxisNotesIconComponent, YAxisNotesLabelComponent, YAxisTitleComponent, ZoomableComponent, CHART_DIRECTIVES, AxisLabelClickEvent, DragEndEvent, DragEvent, DragStartEvent, LegendItemClickEvent, LegendItemHoverEvent, NoteClickEvent, NoteHoverEvent, PaneRenderEvent, PlotAreaClickEvent, PlotAreaHoverEvent, RenderEvent, SelectEndEvent, SelectEvent, SelectStartEvent, SeriesClickEvent, SeriesHoverEvent, ZoomEndEvent, ZoomEvent, ZoomStartEvent, WeekStartDay, NavigatorFilterEvent, StockChartComponent, STOCK_CHART_DIRECTIVES, SparklineComponent, SPARKLINE_DIRECTIVES };
export { PopupComponent } from '@progress/kendo-angular-popup';
export { ResizeSensorComponent } from '@progress/kendo-angular-common';
