import { Component, ContentChild } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { TooltipComponentGenerated } from './tooltip.component.generated';
import { SeriesTooltipTemplateDirective } from './tooltip/series-tooltip-template.directive';
import { SharedTooltipTemplateDirective } from './tooltip/shared-tooltip-template.directive';
import { TooltipTemplateService } from '../common/tooltip-template.service';
/**
 * The configuration options of the Chart series tooltip
 * ([see example]({% slug tooltips_chart_charts %})).
 */
export class TooltipComponent extends TooltipComponentGenerated {
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
