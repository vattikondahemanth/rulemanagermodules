/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:object-literal-sort-keys */
import { isWindowAvailable } from './util';
const agentRxs = {
    wp: /(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,
    fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
    android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/,
    iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
    ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
    meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
    webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
    blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,
    playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,
    windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/,
    tizen: /(tizen).*?Version\/(\d+)\.(\d+(\.\d+)?)/i,
    sailfish: /(sailfish).*rv:(\d+)\.(\d+(\.\d+)?).*firefox/i,
    ffos: /(Mobile).*rv:(\d+)\.(\d+(\.\d+)?).*Firefox/
};
const osRxs = {
    ios: /^i(phone|pad|pod)$/i,
    android: /^android|fire$/i,
    blackberry: /^blackberry|playbook/i,
    windows: /windows/,
    wp: /wp/,
    flat: /sailfish|ffos|tizen/i,
    meego: /meego/
};
const desktopBrowserRxs = {
    edge: /(edge)[ \/]([\w.]+)/i,
    webkit: /(chrome)[ \/]([\w.]+)/i,
    safari: /(webkit)[ \/]([\w.]+)/i,
    opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i,
    msie: /(msie\s|trident.*? rv:)([\w.]+)/i,
    mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
};
const mobileBrowserRxs = {
    omini: /Opera\sMini/i,
    omobile: /Opera\sMobi/i,
    firefox: /Firefox|Fennec/i,
    mobilesafari: /version\/.*safari/i,
    ie: /MSIE|Windows\sPhone/i,
    chrome: /chrome|crios/i,
    webkit: /webkit/i
};
const testRx = (agent, rxs, dflt) => {
    for (let rx in rxs) {
        if (rxs.hasOwnProperty(rx) && rxs[rx].test(agent)) {
            return rx;
        }
    }
    return dflt !== undefined ? dflt : agent;
};
const ɵ0 = testRx;
/**
 * @hidden
 */
export const detectMobileOS = (ua) => {
    let minorVersion;
    let match = [];
    for (let agent in agentRxs) {
        if (agentRxs.hasOwnProperty(agent)) {
            match = ua.match(agentRxs[agent]);
            if (!match) {
                continue;
            }
            if (agent === 'windows' && 'plugins' in window.navigator) {
                return null;
            } // Break if not Metro/Mobile Windows
            const os = {};
            os.device = agent;
            os.browser = testRx(ua, mobileBrowserRxs, 'default');
            os.name = testRx(agent, osRxs);
            os[os.name] = true;
            os.majorVersion = match[2];
            os.minorVersion = match[3].replace('_', '.');
            minorVersion = os.minorVersion.replace('.', '').substr(0, 2);
            os.flatVersion = os.majorVersion + minorVersion +
                (new Array(3 - (minorVersion.length < 3 ? minorVersion.length : 2)).join('0'));
            os.cordova = typeof window.PhoneGap !== undefined
                || typeof window.cordova !== undefined; // Use file protocol to detect appModes.
            os.appMode = window.navigator.standalone
                || (/file|local|wmapp/).test(window.location.protocol)
                || os.cordova; // Use file protocol to detect appModes.
            return os;
        }
    }
    return null;
};
/**
 * @hidden
 */
export const detectDesktopBrowser = (ua) => {
    let browserInfo = null;
    let match = [];
    for (let agent in desktopBrowserRxs) {
        if (desktopBrowserRxs.hasOwnProperty(agent)) {
            match = ua.match(desktopBrowserRxs[agent]);
            if (match) {
                browserInfo = {};
                browserInfo[agent] = true;
                browserInfo[match[1].toLowerCase().split(' ')[0].split('/')[0]] = true;
                browserInfo.version = parseInt(document.documentMode || match[2], 10);
                break;
            }
        }
    }
    return browserInfo;
};
const userAgent = isWindowAvailable() && window.navigator ? window.navigator.userAgent : null;
/**
 * @hidden
 */
export const browser = userAgent ? detectDesktopBrowser(userAgent) : null;
/**
 * @hidden
 */
export const mobileOS = userAgent ? detectMobileOS(userAgent) : null;
/**
 * @hidden
 */
export const touch = isWindowAvailable() && 'ontouchstart' in window;
/**
 * @hidden
 */
export const msPointers = browser && !browser.chrome && window.MSPointerEvent;
/**
 * @hidden
 */
export const pointers = browser && !browser.chrome && window.PointerEvent;
/**
 * @hidden
 */
export const touchEnabled = mobileOS && (touch || msPointers || pointers);
export { ɵ0 };
