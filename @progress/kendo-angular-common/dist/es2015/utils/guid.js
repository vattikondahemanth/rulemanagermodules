/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
export const guid = () => {
    let id = "";
    for (let i = 0; i < 32; i++) {
        const random = Math.random() * 16 | 0; // tslint:disable-line:no-bitwise
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += "-";
        }
        // tslint:disable-next-line:no-bitwise
        id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return id;
};
