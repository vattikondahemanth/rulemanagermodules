import { OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { ConfigurationService } from './configuration.service';
/**
 * @hidden
 */
export declare abstract class SettingsComponent implements OnChanges, OnDestroy {
    protected configKey: string;
    configurationService: ConfigurationService;
    protected store: any;
    constructor(configKey: string, configurationService: ConfigurationService);
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
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
    notifyChanges(changes: any): void;
    protected markAsVisible(): void;
    private notify;
}
