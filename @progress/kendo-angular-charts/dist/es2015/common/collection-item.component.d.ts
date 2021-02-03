import { OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionService, Item } from './collection.service';
import { ConfigurationService } from './configuration.service';
/**
 * @hidden
 */
export declare abstract class CollectionItemComponent implements Item, OnChanges, OnDestroy {
    protected configurationService: ConfigurationService;
    protected collectionService: CollectionService;
    protected subscription: Subscription;
    options: any;
    constructor(configurationService: ConfigurationService, collectionService: CollectionService);
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
    ngOnDestroy(): void;
    protected notify(): void;
}
