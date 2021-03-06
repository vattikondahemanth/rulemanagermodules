/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { SliderModel as Model } from '@telerik/kendo-inputs-common';
import { calculateTicksCount } from './utils';
import { subtract } from '../common/math';
/**
 * @hidden
 */
export class SliderModel extends Model {
    getTickSizes() {
        const { min, max, smallStep } = this.props;
        const count = calculateTicksCount(min, max, smallStep);
        const trackSize = this.trackWidth();
        const distStep = trackSize / subtract(max, min);
        const result = [];
        let usedSpace = 0;
        let endPoint = 0;
        for (let i = 0; i < count; i++) {
            if (i === 0 || i === count - 1) {
                endPoint += (smallStep / 2) * distStep;
            }
            else {
                endPoint += smallStep * distStep;
            }
            const size = Math.round(endPoint - usedSpace);
            result.push(size);
            usedSpace += size;
        }
        return result;
    }
}
