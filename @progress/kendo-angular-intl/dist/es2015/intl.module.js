import { NgModule } from '@angular/core';
import { DatePipe } from './date.pipe';
import { NumberPipe } from './number.pipe';
const pipes = [
    DatePipe,
    NumberPipe
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}docs/ts/latest/guide/ngmodule.html)
 * definition for the Intl services.
 */
export class IntlModule {
}
IntlModule.decorators = [
    { type: NgModule, args: [{
                declarations: [pipes],
                exports: [pipes]
            },] },
];
