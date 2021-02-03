import { ItemChange } from './collection.service';
import { copyChanges } from './copy-changes';
import { toSimpleChanges } from './to-simple-changes';
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
export { CollectionItemComponent };
