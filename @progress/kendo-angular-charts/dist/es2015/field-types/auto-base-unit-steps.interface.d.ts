/**
 * The allowed time-interval steps when `baseUnit` is set to either `"fit"` or `"auto"`.
 *
 * The axis will divide the active period into the smallest possible intervals
 * that do not exceed the set `maxDateGroups` value.
 *
 * {% meta height:450 %}
 * {% embed_file stock/zoom-steps/app.component.ts preview %}
 * {% embed_file stock/basic/app.module.ts %}
 * {% embed_file stock/basic/stock-data.service.ts %}
 * {% embed_file stock/basic/main.ts hidden %}
 * {% endmeta %}
 *
 */
export interface AutoBaseUnitSteps {
    /**
     * The preferred interval steps when displaying milliseconds.
     */
    milliseconds?: number[];
    /**
     * The preferred interval steps when displaying seconds.
     */
    seconds?: number[];
    /**
     * The preferred interval steps when displaying minutes.
     */
    minutes?: number[];
    /**
     * The preferred interval steps when displaying hours.
     */
    hours?: number[];
    /**
     * The preferred interval steps when displaying days.
     */
    days?: number[];
    /**
     * The preferred interval steps when displaying weeks.
     */
    weeks?: number[];
    /**
     * The preferred interval steps when displaying months.
     */
    months?: number[];
    /**
     * The preferred interval steps when displaying years.
     */
    years?: number[];
}
