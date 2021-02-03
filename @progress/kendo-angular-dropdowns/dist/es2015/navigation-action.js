/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var NavigationAction;
(function (NavigationAction) {
    NavigationAction[NavigationAction["Undefined"] = 0] = "Undefined";
    NavigationAction[NavigationAction["Open"] = 1] = "Open";
    NavigationAction[NavigationAction["Close"] = 2] = "Close";
    NavigationAction[NavigationAction["Enter"] = 3] = "Enter";
    NavigationAction[NavigationAction["Tab"] = 4] = "Tab";
    NavigationAction[NavigationAction["Esc"] = 5] = "Esc";
    NavigationAction[NavigationAction["Delete"] = 6] = "Delete";
    NavigationAction[NavigationAction["Backspace"] = 7] = "Backspace";
    NavigationAction[NavigationAction["Home"] = 8] = "Home";
    NavigationAction[NavigationAction["End"] = 9] = "End";
    NavigationAction[NavigationAction["Up"] = 10] = "Up";
    NavigationAction[NavigationAction["Down"] = 11] = "Down";
    NavigationAction[NavigationAction["Left"] = 12] = "Left";
    NavigationAction[NavigationAction["Right"] = 13] = "Right";
})(NavigationAction || (NavigationAction = {}));
