import { ItemChange } from './collection.service';
import { copyChanges } from './copy-changes';
import { toSimpleChanges } from './to-simple-changes';
/**
 * @hidden
 */
export class CollectionItemComponent {
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
