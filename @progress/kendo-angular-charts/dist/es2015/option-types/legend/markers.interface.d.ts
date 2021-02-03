import { drawing } from '@progress/kendo-drawing';
import { MarkersVisualArgs, MarkerType } from '../../common/property-types';
/**
 * The configuration options of the legend markers.
 */
export interface LegendMarkers {
    /**
     * The width (in pixels) of the markers. Defaults to `15`.
     */
    width?: number;
    /**
     * The height (in pixels) of the markers. Defaults to `3`.
     */
    height?: number;
    /**
     * The shape of the legend item markers.
     *
     * The supported values are:
     * * (Default) `"circle"`&mdash;The marker shape is a circle.
     * * `"square"`&mdash;The marker shape is a square.
     * * `"triangle"`&mdash;The marker shape is a triangle.
     * * `"cross"`&mdash;The marker shape is a cross.
     */
    type?: MarkerType;
    /**
     * If set to `true`, the Chart displays the markers.
     * By default, the legend item markers are displayed.
     */
    visible?: boolean;
    /**
     * A function for creating a custom visual for the markers.
     *
     * The available argument fields are:
     * - `rect`&mdash;The [geometry Rect]({% slug api_kendo-drawing_geometry_rect %}) that defines where the visual will be rendered.
     * - `options`&mdash;The marker options.
     * - `createVisual`&mdash;A function for getting the default visual.
     * - `category`&mdash;The category of the marker point.
     * - `dataItem`&mdash;The `dataItem` of the marker point.
     * - `value`&mdash;The value of the marker point.
     * - `sender`&mdash;The Chart instance.
     * - `series`&mdash;The series of the marker point.
     */
    visual?: (e: MarkersVisualArgs) => drawing.Element;
}
