/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Attention:
// This file duplicates types and values from @angular/core
// so that we are able to make @angular/compiler independent of @angular/core.
// This is important to prevent a build cycle, as @angular/core needs to
// be compiled with the compiler.
import { CssSelector } from './selector';
export const createInject = makeMetadataFactory('Inject', (token) => ({ token }));
export const createInjectionToken = makeMetadataFactory('InjectionToken', (desc) => ({ _desc: desc, ngInjectableDef: undefined }));
export const createAttribute = makeMetadataFactory('Attribute', (attributeName) => ({ attributeName }));
export const createContentChildren = makeMetadataFactory('ContentChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false }, data)));
export const createContentChild = makeMetadataFactory('ContentChild', (selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data)));
export const createViewChildren = makeMetadataFactory('ViewChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true }, data)));
export const createViewChild = makeMetadataFactory('ViewChild', (selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data)));
export const createDirective = makeMetadataFactory('Directive', (dir = {}) => dir);
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
export var ChangeDetectionStrategy;
(function (ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
export const createComponent = makeMetadataFactory('Component', (c = {}) => (Object.assign({ changeDetection: ChangeDetectionStrategy.Default }, c)));
export const createPipe = makeMetadataFactory('Pipe', (p) => (Object.assign({ pure: true }, p)));
export const createInput = makeMetadataFactory('Input', (bindingPropertyName) => ({ bindingPropertyName }));
export const createOutput = makeMetadataFactory('Output', (bindingPropertyName) => ({ bindingPropertyName }));
export const createHostBinding = makeMetadataFactory('HostBinding', (hostPropertyName) => ({ hostPropertyName }));
export const createHostListener = makeMetadataFactory('HostListener', (eventName, args) => ({ eventName, args }));
export const createNgModule = makeMetadataFactory('NgModule', (ngModule) => ngModule);
export const createInjectable = makeMetadataFactory('Injectable', (injectable = {}) => injectable);
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
export const NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
export const createOptional = makeMetadataFactory('Optional');
export const createSelf = makeMetadataFactory('Self');
export const createSkipSelf = makeMetadataFactory('SkipSelf');
export const createHost = makeMetadataFactory('Host');
export const Type = Function;
export var SecurityContext;
(function (SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(SecurityContext || (SecurityContext = {}));
export var MissingTranslationStrategy;
(function (MissingTranslationStrategy) {
    MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
    MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
    MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
})(MissingTranslationStrategy || (MissingTranslationStrategy = {}));
function makeMetadataFactory(name, props) {
    // This must be declared as a function, not a fat arrow, so that ES2015 devmode produces code
    // that works with the static_reflector.ts in the ViewEngine compiler.
    // In particular, `_registerDecoratorOrConstructor` assumes that the value returned here can be
    // new'ed.
    function factory(...args) {
        const values = props ? props(...args) : {};
        return Object.assign({ ngMetadataName: name }, values);
    }
    factory.isTypeOf = (obj) => obj && obj.ngMetadataName === name;
    factory.ngMetadataName = name;
    return factory;
}
function parserSelectorToSimpleSelector(selector) {
    const classes = selector.classNames && selector.classNames.length ?
        [8 /* CLASS */, ...selector.classNames] :
        [];
    const elementName = selector.element && selector.element !== '*' ? selector.element : '';
    return [elementName, ...selector.attrs, ...classes];
}
function parserSelectorToNegativeSelector(selector) {
    const classes = selector.classNames && selector.classNames.length ?
        [8 /* CLASS */, ...selector.classNames] :
        [];
    if (selector.element) {
        return [
            1 /* NOT */ | 4 /* ELEMENT */, selector.element, ...selector.attrs, ...classes
        ];
    }
    else if (selector.attrs.length) {
        return [1 /* NOT */ | 2 /* ATTRIBUTE */, ...selector.attrs, ...classes];
    }
    else {
        return selector.classNames && selector.classNames.length ?
            [1 /* NOT */ | 8 /* CLASS */, ...selector.classNames] :
            [];
    }
}
function parserSelectorToR3Selector(selector) {
    const positive = parserSelectorToSimpleSelector(selector);
    const negative = selector.notSelectors && selector.notSelectors.length ?
        selector.notSelectors.map(notSelector => parserSelectorToNegativeSelector(notSelector)) :
        [];
    return positive.concat(...negative);
}
export function parseSelectorToR3Selector(selector) {
    return selector ? CssSelector.parse(selector).map(parserSelectorToR3Selector) : [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILGFBQWE7QUFDYiwyREFBMkQ7QUFDM0QsOEVBQThFO0FBQzlFLHdFQUF3RTtBQUN4RSxpQ0FBaUM7QUFFakMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUd2QyxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsbUJBQW1CLENBQVMsUUFBUSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLG1CQUFtQixDQUNuRCxnQkFBZ0IsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUdyRixNQUFNLENBQUMsTUFBTSxlQUFlLEdBQ3hCLG1CQUFtQixDQUFZLFdBQVcsRUFBRSxDQUFDLGFBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFXL0YsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsbUJBQW1CLENBQ3BELGlCQUFpQixFQUNqQixDQUFDLFFBQWMsRUFBRSxPQUFZLEVBQUUsRUFBRSxFQUFFLENBQy9CLGlCQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssSUFBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUNqRCxjQUFjLEVBQUUsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFF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QUFPO1NBQzNGLENBQUM7S0FDSDtTQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDaEMsT0FBTyxDQUFDLCtCQUEyQyxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQ3JGO1NBQU07UUFDTCxPQUFPLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxDQUFDLDJCQUF1QyxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkUsRUFBRSxDQUFDO0tBQ1I7QUFDSCxDQUFDO0FBRUQsU0FBUywwQkFBMEIsQ0FBQyxRQUFxQjtJQUN2RCxNQUFNLFFBQVEsR0FBRyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUxRCxNQUFNLFFBQVEsR0FBc0IsUUFBUSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZGLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLEVBQUUsQ0FBQztJQUVQLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsUUFBdUI7SUFDL0QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNyRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBBdHRlbnRpb246XG4vLyBUaGlzIGZpbGUgZHVwbGljYXRlcyB0eXBlcyBhbmQgdmFsdWVzIGZyb20gQGFuZ3VsYXIvY29yZVxuLy8gc28gdGhhdCB3ZSBhcmUgYWJsZSB0byBtYWtlIEBhbmd1bGFyL2NvbXBpbGVyIGluZGVwZW5kZW50IG9mIEBhbmd1bGFyL2NvcmUuXG4vLyBUaGlzIGlzIGltcG9ydGFudCB0byBwcmV2ZW50IGEgYnVpbGQgY3ljbGUsIGFzIEBhbmd1bGFyL2NvcmUgbmVlZHMgdG9cbi8vIGJlIGNvbXBpbGVkIHdpdGggdGhlIGNvbXBpbGVyLlxuXG5pbXBvcnQge0Nzc1NlbGVjdG9yfSBmcm9tICcuL3NlbGVjdG9yJztcblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3QgeyB0b2tlbjogYW55OyB9XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxJbmplY3Q+KCdJbmplY3QnLCAodG9rZW46IGFueSkgPT4gKHt0b2tlbn0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVJbmplY3Rpb25Ub2tlbiA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8b2JqZWN0PihcbiAgICAnSW5qZWN0aW9uVG9rZW4nLCAoZGVzYzogc3RyaW5nKSA9PiAoe19kZXNjOiBkZXNjLCBuZ0luamVjdGFibGVEZWY6IHVuZGVmaW5lZH0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGUgeyBhdHRyaWJ1dGVOYW1lPzogc3RyaW5nOyB9XG5leHBvcnQgY29uc3QgY3JlYXRlQXR0cmlidXRlID1cbiAgICBtYWtlTWV0YWRhdGFGYWN0b3J5PEF0dHJpYnV0ZT4oJ0F0dHJpYnV0ZScsIChhdHRyaWJ1dGVOYW1lPzogc3RyaW5nKSA9PiAoe2F0dHJpYnV0ZU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZmlyc3Q6IGJvb2xlYW47XG4gIHJlYWQ6IGFueTtcbiAgaXNWaWV3UXVlcnk6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBhbnk7XG4gIHN0YXRpYzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRlbnRDaGlsZHJlbiA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdDb250ZW50Q2hpbGRyZW4nLFxuICAgIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiBmYWxzZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogZmFsc2UsIC4uLmRhdGF9KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlQ29udGVudENoaWxkID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxRdWVyeT4oXG4gICAgJ0NvbnRlbnRDaGlsZCcsIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3Q2hpbGRyZW4gPSBtYWtlTWV0YWRhdGFGYWN0b3J5PFF1ZXJ5PihcbiAgICAnVmlld0NoaWxkcmVuJywgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiBmYWxzZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpZXdDaGlsZCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8UXVlcnk+KFxuICAgICdWaWV3Q2hpbGQnLCAoc2VsZWN0b3I6IGFueSwgZGF0YTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmUge1xuICBzZWxlY3Rvcj86IHN0cmluZztcbiAgaW5wdXRzPzogc3RyaW5nW107XG4gIG91dHB1dHM/OiBzdHJpbmdbXTtcbiAgaG9zdD86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBleHBvcnRBcz86IHN0cmluZztcbiAgcXVlcmllcz86IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBndWFyZHM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVEaXJlY3RpdmUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8RGlyZWN0aXZlPignRGlyZWN0aXZlJywgKGRpcjogRGlyZWN0aXZlID0ge30pID0+IGRpcik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IGV4dGVuZHMgRGlyZWN0aXZlIHtcbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIHZpZXdQcm92aWRlcnM/OiBQcm92aWRlcltdO1xuICBtb2R1bGVJZD86IHN0cmluZztcbiAgdGVtcGxhdGVVcmw/OiBzdHJpbmc7XG4gIHRlbXBsYXRlPzogc3RyaW5nO1xuICBzdHlsZVVybHM/OiBzdHJpbmdbXTtcbiAgc3R5bGVzPzogc3RyaW5nW107XG4gIGFuaW1hdGlvbnM/OiBhbnlbXTtcbiAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uO1xuICBpbnRlcnBvbGF0aW9uPzogW3N0cmluZywgc3RyaW5nXTtcbiAgZW50cnlDb21wb25lbnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xufVxuZXhwb3J0IGVudW0gVmlld0VuY2Fwc3VsYXRpb24ge1xuICBFbXVsYXRlZCA9IDAsXG4gIE5hdGl2ZSA9IDEsXG4gIE5vbmUgPSAyLFxuICBTaGFkb3dEb20gPSAzXG59XG5cbmV4cG9ydCBlbnVtIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHtcbiAgT25QdXNoID0gMCxcbiAgRGVmYXVsdCA9IDFcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbXBvbmVudCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8Q29tcG9uZW50PihcbiAgICAnQ29tcG9uZW50JywgKGM6IENvbXBvbmVudCA9IHt9KSA9PiAoe2NoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCwgLi4uY30pKTtcblxuZXhwb3J0IGludGVyZmFjZSBQaXBlIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwdXJlPzogYm9vbGVhbjtcbn1cbmV4cG9ydCBjb25zdCBjcmVhdGVQaXBlID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxQaXBlPignUGlwZScsIChwOiBQaXBlKSA9PiAoe3B1cmU6IHRydWUsIC4uLnB9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXQgeyBiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nOyB9XG5leHBvcnQgY29uc3QgY3JlYXRlSW5wdXQgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8SW5wdXQ+KCdJbnB1dCcsIChiaW5kaW5nUHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2JpbmRpbmdQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3V0cHV0IHsgYmluZGluZ1Byb3BlcnR5TmFtZT86IHN0cmluZzsgfVxuZXhwb3J0IGNvbnN0IGNyZWF0ZU91dHB1dCA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8T3V0cHV0PihcbiAgICAnT3V0cHV0JywgKGJpbmRpbmdQcm9wZXJ0eU5hbWU/OiBzdHJpbmcpID0+ICh7YmluZGluZ1Byb3BlcnR5TmFtZX0pKTtcblxuZXhwb3J0IGludGVyZmFjZSBIb3N0QmluZGluZyB7IGhvc3RQcm9wZXJ0eU5hbWU/OiBzdHJpbmc7IH1cbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0QmluZGluZyA9IG1ha2VNZXRhZGF0YUZhY3Rvcnk8SG9zdEJpbmRpbmc+KFxuICAgICdIb3N0QmluZGluZycsIChob3N0UHJvcGVydHlOYW1lPzogc3RyaW5nKSA9PiAoe2hvc3RQcm9wZXJ0eU5hbWV9KSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdExpc3RlbmVyIHtcbiAgZXZlbnROYW1lPzogc3RyaW5nO1xuICBhcmdzPzogc3RyaW5nW107XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSG9zdExpc3RlbmVyID0gbWFrZU1ldGFkYXRhRmFjdG9yeTxIb3N0TGlzdGVuZXI+KFxuICAgICdIb3N0TGlzdGVuZXInLCAoZXZlbnROYW1lPzogc3RyaW5nLCBhcmdzPzogc3RyaW5nW10pID0+ICh7ZXZlbnROYW1lLCBhcmdzfSkpO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nTW9kdWxlIHtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbiAgZGVjbGFyYXRpb25zPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGltcG9ydHM/OiBBcnJheTxUeXBlfE1vZHVsZVdpdGhQcm92aWRlcnN8YW55W10+O1xuICBleHBvcnRzPzogQXJyYXk8VHlwZXxhbnlbXT47XG4gIGVudHJ5Q29tcG9uZW50cz86IEFycmF5PFR5cGV8YW55W10+O1xuICBib290c3RyYXA/OiBBcnJheTxUeXBlfGFueVtdPjtcbiAgc2NoZW1hcz86IEFycmF5PFNjaGVtYU1ldGFkYXRhfGFueVtdPjtcbiAgaWQ/OiBzdHJpbmc7XG59XG5leHBvcnQgY29uc3QgY3JlYXRlTmdNb2R1bGUgPVxuICAgIG1ha2VNZXRhZGF0YUZhY3Rvcnk8TmdNb2R1bGU+KCdOZ01vZHVsZScsIChuZ01vZHVsZTogTmdNb2R1bGUpID0+IG5nTW9kdWxlKTtcblxuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgbmdNb2R1bGU6IFR5cGU7XG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG59XG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGUge1xuICBwcm92aWRlZEluPzogVHlwZXwncm9vdCd8YW55O1xuICB1c2VDbGFzcz86IFR5cGV8YW55O1xuICB1c2VFeGlzdGluZz86IFR5cGV8YW55O1xuICB1c2VWYWx1ZT86IGFueTtcbiAgdXNlRmFjdG9yeT86IFR5cGV8YW55O1xuICBkZXBzPzogQXJyYXk8VHlwZXxhbnlbXT47XG59XG5leHBvcnQgY29uc3QgY3JlYXRlSW5qZWN0YWJsZSA9XG4gICAgbWFrZU1ldGFkYXRhRmFjdG9yeSgnSW5qZWN0YWJsZScsIChpbmplY3RhYmxlOiBJbmplY3RhYmxlID0ge30pID0+IGluamVjdGFibGUpO1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFNZXRhZGF0YSB7IG5hbWU6IHN0cmluZzsgfVxuXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICdjdXN0b20tZWxlbWVudHMnXG59O1xuXG5leHBvcnQgY29uc3QgTk9fRVJST1JTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICduby1lcnJvcnMtc2NoZW1hJ1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU9wdGlvbmFsID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnT3B0aW9uYWwnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2VsZicpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNraXBTZWxmID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnU2tpcFNlbGYnKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVIb3N0ID0gbWFrZU1ldGFkYXRhRmFjdG9yeSgnSG9zdCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGUgZXh0ZW5kcyBGdW5jdGlvbiB7IG5ldyAoLi4uYXJnczogYW55W10pOiBhbnk7IH1cbmV4cG9ydCBjb25zdCBUeXBlID0gRnVuY3Rpb247XG5cbmV4cG9ydCBlbnVtIFNlY3VyaXR5Q29udGV4dCB7XG4gIE5PTkUgPSAwLFxuICBIVE1MID0gMSxcbiAgU1RZTEUgPSAyLFxuICBTQ1JJUFQgPSAzLFxuICBVUkwgPSA0LFxuICBSRVNPVVJDRV9VUkwgPSA1LFxufVxuXG5leHBvcnQgdHlwZSBQcm92aWRlciA9IGFueTtcblxuZXhwb3J0IGNvbnN0IGVudW0gTm9kZUZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFR5cGVFbGVtZW50ID0gMSA8PCAwLFxuICBUeXBlVGV4dCA9IDEgPDwgMSxcbiAgUHJvamVjdGVkVGVtcGxhdGUgPSAxIDw8IDIsXG4gIENhdFJlbmRlck5vZGUgPSBUeXBlRWxlbWVudCB8IFR5cGVUZXh0LFxuICBUeXBlTmdDb250ZW50ID0gMSA8PCAzLFxuICBUeXBlUGlwZSA9IDEgPDwgNCxcbiAgVHlwZVB1cmVBcnJheSA9IDEgPDwgNSxcbiAgVHlwZVB1cmVPYmplY3QgPSAxIDw8IDYsXG4gIFR5cGVQdXJlUGlwZSA9IDEgPDwgNyxcbiAgQ2F0UHVyZUV4cHJlc3Npb24gPSBUeXBlUHVyZUFycmF5IHwgVHlwZVB1cmVPYmplY3QgfCBUeXBlUHVyZVBpcGUsXG4gIFR5cGVWYWx1ZVByb3ZpZGVyID0gMSA8PCA4LFxuICBUeXBlQ2xhc3NQcm92aWRlciA9IDEgPDwgOSxcbiAgVHlwZUZhY3RvcnlQcm92aWRlciA9IDEgPDwgMTAsXG4gIFR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyID0gMSA8PCAxMSxcbiAgTGF6eVByb3ZpZGVyID0gMSA8PCAxMixcbiAgUHJpdmF0ZVByb3ZpZGVyID0gMSA8PCAxMyxcbiAgVHlwZURpcmVjdGl2ZSA9IDEgPDwgMTQsXG4gIENvbXBvbmVudCA9IDEgPDwgMTUsXG4gIENhdFByb3ZpZGVyTm9EaXJlY3RpdmUgPVxuICAgICAgVHlwZVZhbHVlUHJvdmlkZXIgfCBUeXBlQ2xhc3NQcm92aWRlciB8IFR5cGVGYWN0b3J5UHJvdmlkZXIgfCBUeXBlVXNlRXhpc3RpbmdQcm92aWRlcixcbiAgQ2F0UHJvdmlkZXIgPSBDYXRQcm92aWRlck5vRGlyZWN0aXZlIHwgVHlwZURpcmVjdGl2ZSxcbiAgT25Jbml0ID0gMSA8PCAxNixcbiAgT25EZXN0cm95ID0gMSA8PCAxNyxcbiAgRG9DaGVjayA9IDEgPDwgMTgsXG4gIE9uQ2hhbmdlcyA9IDEgPDwgMTksXG4gIEFmdGVyQ29udGVudEluaXQgPSAxIDw8IDIwLFxuICBBZnRlckNvbnRlbnRDaGVja2VkID0gMSA8PCAyMSxcbiAgQWZ0ZXJWaWV3SW5pdCA9IDEgPDwgMjIsXG4gIEFmdGVyVmlld0NoZWNrZWQgPSAxIDw8IDIzLFxuICBFbWJlZGRlZFZpZXdzID0gMSA8PCAyNCxcbiAgQ29tcG9uZW50VmlldyA9IDEgPDwgMjUsXG4gIFR5cGVDb250ZW50UXVlcnkgPSAxIDw8IDI2LFxuICBUeXBlVmlld1F1ZXJ5ID0gMSA8PCAyNyxcbiAgU3RhdGljUXVlcnkgPSAxIDw8IDI4LFxuICBEeW5hbWljUXVlcnkgPSAxIDw8IDI5LFxuICBUeXBlTW9kdWxlUHJvdmlkZXIgPSAxIDw8IDMwLFxuICBDYXRRdWVyeSA9IFR5cGVDb250ZW50UXVlcnkgfCBUeXBlVmlld1F1ZXJ5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBDYXRSZW5kZXJOb2RlIHwgVHlwZU5nQ29udGVudCB8IFR5cGVQaXBlIHwgQ2F0UHVyZUV4cHJlc3Npb24gfCBDYXRQcm92aWRlciB8IENhdFF1ZXJ5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIERlcEZsYWdzIHtcbiAgTm9uZSA9IDAsXG4gIFNraXBTZWxmID0gMSA8PCAwLFxuICBPcHRpb25hbCA9IDEgPDwgMSxcbiAgU2VsZiA9IDEgPDwgMixcbiAgVmFsdWUgPSAxIDw8IDMsXG59XG5cbi8qKlxuICogSW5qZWN0aW9uIGZsYWdzIGZvciBESS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSW5qZWN0RmxhZ3Mge1xuICBEZWZhdWx0ID0gMCxcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW4gaW5qZWN0b3Igc2hvdWxkIHJldHJpZXZlIGEgZGVwZW5kZW5jeSBmcm9tIGFueSBpbmplY3RvciB1bnRpbCByZWFjaGluZyB0aGVcbiAgICogaG9zdCBlbGVtZW50IG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudC4gKE9ubHkgdXNlZCB3aXRoIEVsZW1lbnQgSW5qZWN0b3IpXG4gICAqL1xuICBIb3N0ID0gMSA8PCAwLFxuICAvKiogRG9uJ3QgZGVzY2VuZCBpbnRvIGFuY2VzdG9ycyBvZiB0aGUgbm9kZSByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2VsZiA9IDEgPDwgMSxcbiAgLyoqIFNraXAgdGhlIG5vZGUgdGhhdCBpcyByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2tpcFNlbGYgPSAxIDw8IDIsXG4gIC8qKiBJbmplY3QgYGRlZmF1bHRWYWx1ZWAgaW5zdGVhZCBpZiB0b2tlbiBub3QgZm91bmQuICovXG4gIE9wdGlvbmFsID0gMSA8PCAzLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBBcmd1bWVudFR5cGUge0lubGluZSA9IDAsIER5bmFtaWMgPSAxfVxuXG5leHBvcnQgY29uc3QgZW51bSBCaW5kaW5nRmxhZ3Mge1xuICBUeXBlRWxlbWVudEF0dHJpYnV0ZSA9IDEgPDwgMCxcbiAgVHlwZUVsZW1lbnRDbGFzcyA9IDEgPDwgMSxcbiAgVHlwZUVsZW1lbnRTdHlsZSA9IDEgPDwgMixcbiAgVHlwZVByb3BlcnR5ID0gMSA8PCAzLFxuICBTeW50aGV0aWNQcm9wZXJ0eSA9IDEgPDwgNCxcbiAgU3ludGhldGljSG9zdFByb3BlcnR5ID0gMSA8PCA1LFxuICBDYXRTeW50aGV0aWNQcm9wZXJ0eSA9IFN5bnRoZXRpY1Byb3BlcnR5IHwgU3ludGhldGljSG9zdFByb3BlcnR5LFxuXG4gIC8vIG11dHVhbGx5IGV4Y2x1c2l2ZSB2YWx1ZXMuLi5cbiAgVHlwZXMgPSBUeXBlRWxlbWVudEF0dHJpYnV0ZSB8IFR5cGVFbGVtZW50Q2xhc3MgfCBUeXBlRWxlbWVudFN0eWxlIHwgVHlwZVByb3BlcnR5XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFF1ZXJ5QmluZGluZ1R5cGUge0ZpcnN0ID0gMCwgQWxsID0gMX1cblxuZXhwb3J0IGNvbnN0IGVudW0gUXVlcnlWYWx1ZVR5cGUge1xuICBFbGVtZW50UmVmID0gMCxcbiAgUmVuZGVyRWxlbWVudCA9IDEsXG4gIFRlbXBsYXRlUmVmID0gMixcbiAgVmlld0NvbnRhaW5lclJlZiA9IDMsXG4gIFByb3ZpZGVyID0gNFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBWaWV3RmxhZ3Mge1xuICBOb25lID0gMCxcbiAgT25QdXNoID0gMSA8PCAxLFxufVxuXG5leHBvcnQgZW51bSBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneSB7XG4gIEVycm9yID0gMCxcbiAgV2FybmluZyA9IDEsXG4gIElnbm9yZSA9IDIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgKC4uLmFyZ3M6IGFueVtdKTogVDtcbiAgaXNUeXBlT2Yob2JqOiBhbnkpOiBvYmogaXMgVDtcbiAgbmdNZXRhZGF0YU5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gbWFrZU1ldGFkYXRhRmFjdG9yeTxUPihuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBUKTogTWV0YWRhdGFGYWN0b3J5PFQ+IHtcbiAgLy8gVGhpcyBtdXN0IGJlIGRlY2xhcmVkIGFzIGEgZnVuY3Rpb24sIG5vdCBhIGZhdCBhcnJvdywgc28gdGhhdCBFUzIwMTUgZGV2bW9kZSBwcm9kdWNlcyBjb2RlXG4gIC8vIHRoYXQgd29ya3Mgd2l0aCB0aGUgc3RhdGljX3JlZmxlY3Rvci50cyBpbiB0aGUgVmlld0VuZ2luZSBjb21waWxlci5cbiAgLy8gSW4gcGFydGljdWxhciwgYF9yZWdpc3RlckRlY29yYXRvck9yQ29uc3RydWN0b3JgIGFzc3VtZXMgdGhhdCB0aGUgdmFsdWUgcmV0dXJuZWQgaGVyZSBjYW4gYmVcbiAgLy8gbmV3J2VkLlxuICBmdW5jdGlvbiBmYWN0b3J5KC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgY29uc3QgdmFsdWVzID0gcHJvcHMgPyBwcm9wcyguLi5hcmdzKSA6IHt9O1xuICAgIHJldHVybiB7XG4gICAgICBuZ01ldGFkYXRhTmFtZTogbmFtZSxcbiAgICAgIC4uLnZhbHVlcyxcbiAgICB9O1xuICB9XG4gIChmYWN0b3J5IGFzIGFueSkuaXNUeXBlT2YgPSAob2JqOiBhbnkpID0+IG9iaiAmJiBvYmoubmdNZXRhZGF0YU5hbWUgPT09IG5hbWU7XG4gIChmYWN0b3J5IGFzIGFueSkubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICByZXR1cm4gZmFjdG9yeSBhcyBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGUge1xuICBjaGlsZHJlbj86IFJvdXRlW107XG4gIGxvYWRDaGlsZHJlbj86IHN0cmluZ3xUeXBlfGFueTtcbn1cblxuLyoqXG4gKiBGbGFncyB1c2VkIHRvIGdlbmVyYXRlIFIzLXN0eWxlIENTUyBTZWxlY3RvcnMuIFRoZXkgYXJlIHBhc3RlZCBmcm9tXG4gKiBjb3JlL3NyYy9yZW5kZXIzL3Byb2plY3Rpb24udHMgYmVjYXVzZSB0aGV5IGNhbm5vdCBiZSByZWZlcmVuY2VkIGRpcmVjdGx5LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZWxlY3RvckZsYWdzIHtcbiAgLyoqIEluZGljYXRlcyB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXcgbmVnYXRpdmUgc2VsZWN0b3IgKi9cbiAgTk9UID0gMGIwMDAxLFxuXG4gIC8qKiBNb2RlIGZvciBtYXRjaGluZyBhdHRyaWJ1dGVzICovXG4gIEFUVFJJQlVURSA9IDBiMDAxMCxcblxuICAvKiogTW9kZSBmb3IgbWF0Y2hpbmcgdGFnIG5hbWVzICovXG4gIEVMRU1FTlQgPSAwYjAxMDAsXG5cbiAgLyoqIE1vZGUgZm9yIG1hdGNoaW5nIGNsYXNzIG5hbWVzICovXG4gIENMQVNTID0gMGIxMDAwLFxufVxuXG4vLyBUaGVzZSBhcmUgYSBjb3B5IHRoZSBDU1MgdHlwZXMgZnJvbSBjb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcHJvamVjdGlvbi50c1xuLy8gVGhleSBhcmUgZHVwbGljYXRlZCBoZXJlIGFzIHRoZXkgY2Fubm90IGJlIGRpcmVjdGx5IHJlZmVyZW5jZWQgZnJvbSBjb3JlLlxuZXhwb3J0IHR5cGUgUjNDc3NTZWxlY3RvciA9IChzdHJpbmcgfCBTZWxlY3RvckZsYWdzKVtdO1xuZXhwb3J0IHR5cGUgUjNDc3NTZWxlY3Rvckxpc3QgPSBSM0Nzc1NlbGVjdG9yW107XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9TaW1wbGVTZWxlY3RvcihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBSM0Nzc1NlbGVjdG9yIHtcbiAgY29uc3QgY2xhc3NlcyA9IHNlbGVjdG9yLmNsYXNzTmFtZXMgJiYgc2VsZWN0b3IuY2xhc3NOYW1lcy5sZW5ndGggP1xuICAgICAgW1NlbGVjdG9yRmxhZ3MuQ0xBU1MsIC4uLnNlbGVjdG9yLmNsYXNzTmFtZXNdIDpcbiAgICAgIFtdO1xuICBjb25zdCBlbGVtZW50TmFtZSA9IHNlbGVjdG9yLmVsZW1lbnQgJiYgc2VsZWN0b3IuZWxlbWVudCAhPT0gJyonID8gc2VsZWN0b3IuZWxlbWVudCA6ICcnO1xuICByZXR1cm4gW2VsZW1lbnROYW1lLCAuLi5zZWxlY3Rvci5hdHRycywgLi4uY2xhc3Nlc107XG59XG5cbmZ1bmN0aW9uIHBhcnNlclNlbGVjdG9yVG9OZWdhdGl2ZVNlbGVjdG9yKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IFIzQ3NzU2VsZWN0b3Ige1xuICBjb25zdCBjbGFzc2VzID0gc2VsZWN0b3IuY2xhc3NOYW1lcyAmJiBzZWxlY3Rvci5jbGFzc05hbWVzLmxlbmd0aCA/XG4gICAgICBbU2VsZWN0b3JGbGFncy5DTEFTUywgLi4uc2VsZWN0b3IuY2xhc3NOYW1lc10gOlxuICAgICAgW107XG5cbiAgaWYgKHNlbGVjdG9yLmVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgU2VsZWN0b3JGbGFncy5OT1QgfCBTZWxlY3RvckZsYWdzLkVMRU1FTlQsIHNlbGVjdG9yLmVsZW1lbnQsIC4uLnNlbGVjdG9yLmF0dHJzLCAuLi5jbGFzc2VzXG4gICAgXTtcbiAgfSBlbHNlIGlmIChzZWxlY3Rvci5hdHRycy5sZW5ndGgpIHtcbiAgICByZXR1cm4gW1NlbGVjdG9yRmxhZ3MuTk9UIHwgU2VsZWN0b3JGbGFncy5BVFRSSUJVVEUsIC4uLnNlbGVjdG9yLmF0dHJzLCAuLi5jbGFzc2VzXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2VsZWN0b3IuY2xhc3NOYW1lcyAmJiBzZWxlY3Rvci5jbGFzc05hbWVzLmxlbmd0aCA/XG4gICAgICAgIFtTZWxlY3RvckZsYWdzLk5PVCB8IFNlbGVjdG9yRmxhZ3MuQ0xBU1MsIC4uLnNlbGVjdG9yLmNsYXNzTmFtZXNdIDpcbiAgICAgICAgW107XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VyU2VsZWN0b3JUb1IzU2VsZWN0b3Ioc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogUjNDc3NTZWxlY3RvciB7XG4gIGNvbnN0IHBvc2l0aXZlID0gcGFyc2VyU2VsZWN0b3JUb1NpbXBsZVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICBjb25zdCBuZWdhdGl2ZTogUjNDc3NTZWxlY3Rvckxpc3QgPSBzZWxlY3Rvci5ub3RTZWxlY3RvcnMgJiYgc2VsZWN0b3Iubm90U2VsZWN0b3JzLmxlbmd0aCA/XG4gICAgICBzZWxlY3Rvci5ub3RTZWxlY3RvcnMubWFwKG5vdFNlbGVjdG9yID0+IHBhcnNlclNlbGVjdG9yVG9OZWdhdGl2ZVNlbGVjdG9yKG5vdFNlbGVjdG9yKSkgOlxuICAgICAgW107XG5cbiAgcmV0dXJuIHBvc2l0aXZlLmNvbmNhdCguLi5uZWdhdGl2ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNlbGVjdG9yVG9SM1NlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcgfCBudWxsKTogUjNDc3NTZWxlY3Rvckxpc3Qge1xuICByZXR1cm4gc2VsZWN0b3IgPyBDc3NTZWxlY3Rvci5wYXJzZShzZWxlY3RvcikubWFwKHBhcnNlclNlbGVjdG9yVG9SM1NlbGVjdG9yKSA6IFtdO1xufVxuXG4vLyBQYXN0ZWQgZnJvbSByZW5kZXIzL2ludGVyZmFjZXMvZGVmaW5pdGlvbiBzaW5jZSBpdCBjYW5ub3QgYmUgcmVmZXJlbmNlZCBkaXJlY3RseVxuLyoqXG4gKiBGbGFncyBwYXNzZWQgaW50byB0ZW1wbGF0ZSBmdW5jdGlvbnMgdG8gZGV0ZXJtaW5lIHdoaWNoIGJsb2NrcyAoaS5lLiBjcmVhdGlvbiwgdXBkYXRlKVxuICogc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICpcbiAqIFR5cGljYWxseSwgYSB0ZW1wbGF0ZSBydW5zIGJvdGggdGhlIGNyZWF0aW9uIGJsb2NrIGFuZCB0aGUgdXBkYXRlIGJsb2NrIG9uIGluaXRpYWxpemF0aW9uIGFuZFxuICogc3Vic2VxdWVudCBydW5zIG9ubHkgZXhlY3V0ZSB0aGUgdXBkYXRlIGJsb2NrLiBIb3dldmVyLCBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzIHJlcXVpcmUgdGhhdFxuICogdGhlIGNyZWF0aW9uIGJsb2NrIGJlIGV4ZWN1dGVkIHNlcGFyYXRlbHkgZnJvbSB0aGUgdXBkYXRlIGJsb2NrIChmb3IgYmFja3dhcmRzIGNvbXBhdCkuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFJlbmRlckZsYWdzIHtcbiAgLyogV2hldGhlciB0byBydW4gdGhlIGNyZWF0aW9uIGJsb2NrIChlLmcuIGNyZWF0ZSBlbGVtZW50cyBhbmQgZGlyZWN0aXZlcykgKi9cbiAgQ3JlYXRlID0gMGIwMSxcblxuICAvKiBXaGV0aGVyIHRvIHJ1biB0aGUgdXBkYXRlIGJsb2NrIChlLmcuIHJlZnJlc2ggYmluZGluZ3MpICovXG4gIFVwZGF0ZSA9IDBiMTBcbn1cblxuLy8gUGFzdGVkIGZyb20gcmVuZGVyMy9pbnRlcmZhY2VzL25vZGUudHNcbi8qKlxuICogQSBzZXQgb2YgbWFya2VyIHZhbHVlcyB0byBiZSB1c2VkIGluIHRoZSBhdHRyaWJ1dGVzIGFycmF5cy4gVGhlc2UgbWFya2VycyBpbmRpY2F0ZSB0aGF0IHNvbWVcbiAqIGl0ZW1zIGFyZSBub3QgcmVndWxhciBhdHRyaWJ1dGVzIGFuZCB0aGUgcHJvY2Vzc2luZyBzaG91bGQgYmUgYWRhcHRlZCBhY2NvcmRpbmdseS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gQXR0cmlidXRlTWFya2VyIHtcbiAgLyoqXG4gICAqIE1hcmtlciBpbmRpY2F0ZXMgdGhhdCB0aGUgZm9sbG93aW5nIDMgdmFsdWVzIGluIHRoZSBhdHRyaWJ1dGVzIGFycmF5IGFyZTpcbiAgICogbmFtZXNwYWNlVXJpLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZVxuICAgKiBpbiB0aGF0IG9yZGVyLlxuICAgKi9cbiAgTmFtZXNwYWNlVVJJID0gMCxcblxuICAvKipcbiAgICogU2lnbmFscyBjbGFzcyBkZWNsYXJhdGlvbi5cbiAgICpcbiAgICogRWFjaCB2YWx1ZSBmb2xsb3dpbmcgYENsYXNzZXNgIGRlc2lnbmF0ZXMgYSBjbGFzcyBuYW1lIHRvIGluY2x1ZGUgb24gdGhlIGVsZW1lbnQuXG4gICAqICMjIEV4YW1wbGU6XG4gICAqXG4gICAqIEdpdmVuOlxuICAgKiBgYGBcbiAgICogPGRpdiBjbGFzcz1cImZvbyBiYXIgYmF6XCI+Li4uPGQvdmk+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgaXM6XG4gICAqIGBgYFxuICAgKiB2YXIgX2MxID0gW0F0dHJpYnV0ZU1hcmtlci5DbGFzc2VzLCAnZm9vJywgJ2JhcicsICdiYXonXTtcbiAgICogYGBgXG4gICAqL1xuICBDbGFzc2VzID0gMSxcblxuICAvKipcbiAgICogU2lnbmFscyBzdHlsZSBkZWNsYXJhdGlvbi5cbiAgICpcbiAgICogRWFjaCBwYWlyIG9mIHZhbHVlcyBmb2xsb3dpbmcgYFN0eWxlc2AgZGVzaWduYXRlcyBhIHN0eWxlIG5hbWUgYW5kIHZhbHVlIHRvIGluY2x1ZGUgb24gdGhlXG4gICAqIGVsZW1lbnQuXG4gICAqICMjIEV4YW1wbGU6XG4gICAqXG4gICAqIEdpdmVuOlxuICAgKiBgYGBcbiAgICogPGRpdiBzdHlsZT1cIndpZHRoOjEwMHB4OyBoZWlnaHQ6MjAwcHg7IGNvbG9yOnJlZFwiPi4uLjwvZGl2PlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGlzOlxuICAgKiBgYGBcbiAgICogdmFyIF9jMSA9IFtBdHRyaWJ1dGVNYXJrZXIuU3R5bGVzLCAnd2lkdGgnLCAnMTAwcHgnLCAnaGVpZ2h0Jy4gJzIwMHB4JywgJ2NvbG9yJywgJ3JlZCddO1xuICAgKiBgYGBcbiAgICovXG4gIFN0eWxlcyA9IDIsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSBuYW1lcyB3ZXJlIGV4dHJhY3RlZCBmcm9tIGlucHV0IG9yIG91dHB1dCBiaW5kaW5ncy5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGdpdmVuIHRoZSBmb2xsb3dpbmcgSFRNTDpcbiAgICpcbiAgICogYGBgXG4gICAqIDxkaXYgbW9vPVwiY2FyXCIgW2Zvb109XCJleHBcIiAoYmFyKT1cImRvU3RoKClcIj5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBpczpcbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBfYzEgPSBbJ21vbycsICdjYXInLCBBdHRyaWJ1dGVNYXJrZXIuQmluZGluZ3MsICdmb28nLCAnYmFyJ107XG4gICAqIGBgYFxuICAgKi9cbiAgQmluZGluZ3MgPSAzLFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIHRoYXQgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGUgbmFtZXMgd2VyZSBob2lzdGVkIGZyb20gYW4gaW5saW5lLXRlbXBsYXRlIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdGhlIGZvbGxvd2luZyBIVE1MOlxuICAgKlxuICAgKiBgYGBcbiAgICogPGRpdiAqbmdGb3I9XCJsZXQgdmFsdWUgb2YgdmFsdWVzOyB0cmFja0J5OnRyYWNrQnlcIiBkaXJBIFtkaXJCXT1cInZhbHVlXCI+XG4gICAqIGBgYFxuICAgKlxuICAgKiB0aGUgZ2VuZXJhdGVkIGNvZGUgZm9yIHRoZSBgdGVtcGxhdGUoKWAgaW5zdHJ1Y3Rpb24gd291bGQgaW5jbHVkZTpcbiAgICpcbiAgICogYGBgXG4gICAqIFsnZGlyQScsICcnLCBBdHRyaWJ1dGVNYXJrZXIuQmluZGluZ3MsICdkaXJCJywgQXR0cmlidXRlTWFya2VyLlRlbXBsYXRlLCAnbmdGb3InLCAnbmdGb3JPZicsXG4gICAqICduZ0ZvclRyYWNrQnknLCAnbGV0LXZhbHVlJ11cbiAgICogYGBgXG4gICAqXG4gICAqIHdoaWxlIHRoZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGBlbGVtZW50KClgIGluc3RydWN0aW9uIGluc2lkZSB0aGUgdGVtcGxhdGUgZnVuY3Rpb24gd291bGRcbiAgICogaW5jbHVkZTpcbiAgICpcbiAgICogYGBgXG4gICAqIFsnZGlyQScsICcnLCBBdHRyaWJ1dGVNYXJrZXIuQmluZGluZ3MsICdkaXJCJ11cbiAgICogYGBgXG4gICAqL1xuICBUZW1wbGF0ZSA9IDQsXG5cbiAgLyoqXG4gICAqIFNpZ25hbHMgdGhhdCB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZSBpcyBgbmdQcm9qZWN0QXNgIGFuZCBpdHMgdmFsdWUgaXMgYSBwYXJzZWQgYENzc1NlbGVjdG9yYC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGdpdmVuIHRoZSBmb2xsb3dpbmcgSFRNTDpcbiAgICpcbiAgICogYGBgXG4gICAqIDxoMSBhdHRyPVwidmFsdWVcIiBuZ1Byb2plY3RBcz1cIlt0aXRsZV1cIj5cbiAgICogYGBgXG4gICAqXG4gICAqIHRoZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGBlbGVtZW50KClgIGluc3RydWN0aW9uIHdvdWxkIGluY2x1ZGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBbJ2F0dHInLCAndmFsdWUnLCBBdHRyaWJ1dGVNYXJrZXIuUHJvamVjdEFzLCBbJycsICd0aXRsZScsICcnXV1cbiAgICogYGBgXG4gICAqL1xuICBQcm9qZWN0QXMgPSA1LFxuXG4gIC8qKlxuICAgKiBTaWduYWxzIHRoYXQgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGUgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IHJ1bnRpbWUgaTE4blxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgZ2l2ZW4gdGhlIGZvbGxvd2luZyBIVE1MOlxuICAgKlxuICAgKiBgYGBcbiAgICogPGRpdiBtb289XCJjYXJcIiBmb289XCJ2YWx1ZVwiIGkxOG4tZm9vIFtiYXJdPVwiYmluZGluZ1wiIGkxOG4tYmFyPlxuICAgKiBgYGBcbiAgICpcbiAgICogdGhlIGdlbmVyYXRlZCBjb2RlIGlzOlxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIF9jMSA9IFsnbW9vJywgJ2NhcicsIEF0dHJpYnV0ZU1hcmtlci5JMThuLCAnZm9vJywgJ2JhciddO1xuICAgKi9cbiAgSTE4biA9IDYsXG59XG4iXX0=