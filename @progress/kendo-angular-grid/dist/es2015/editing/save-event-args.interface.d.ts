/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditEvent } from "./edit-event-args.interface";
import { FormGroup } from "@angular/forms/forms";
/**
 * Arguments for the `save` event.
 */
export interface SaveEvent extends EditEvent {
    /**
     * The edited `formGroup` instance.
     */
    formGroup: FormGroup;
}
