import { Change } from './configuration.service';
import { copyChanges } from './copy-changes';
import { toSimpleChanges } from './to-simple-changes';
/**
 * @hidden
 */
export class SettingsComponent {
    constructor(configKey, configurationService) {
        this.configKey = configKey;
        this.configurationService = configurationService;
        this.store = {};
        if (configKey === undefined) {
            throw new Error('Configuration key not set');
        }
    }
    ngOnDestroy() {
        this.store = undefined;
        this.notify();
    }
    ngOnChanges(changes) {
        copyChanges(changes, this.store);
        this.notify();
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
    markAsVisible() {
        this.store.visible = true;
        this.notify();
    }
    notify() {
        this.configurationService.notify(new Change(this.configKey, this.store));
    }
}
