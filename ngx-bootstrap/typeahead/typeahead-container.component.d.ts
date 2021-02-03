import { ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { TypeaheadMatch } from './typeahead-match.class';
import { TypeaheadDirective } from './typeahead.directive';
export declare class TypeaheadContainerComponent {
    private positionService;
    private renderer;
    element: ElementRef;
    parent: TypeaheadDirective;
    query: string[] | string;
    isFocused: boolean;
    top: string;
    left: string;
    display: string;
    placement: string;
    dropup: boolean;
    guiHeight: string;
    needScrollbar: boolean;
    animationState: string;
    visibility: string;
    height: number;
    readonly isBs4: boolean;
    protected _active: TypeaheadMatch;
    protected _matches: TypeaheadMatch[];
    private ulElement;
    private liElements;
    constructor(positionService: PositioningService, renderer: Renderer2, element: ElementRef);
    readonly active: TypeaheadMatch;
    matches: TypeaheadMatch[];
    readonly isTopPosition: boolean;
    readonly optionsListTemplate: TemplateRef<any>;
    readonly isAnimated: boolean;
    readonly adaptivePosition: boolean;
    readonly typeaheadScrollable: boolean;
    readonly typeaheadOptionsInScrollableView: number;
    readonly typeaheadIsFirstItemActive: boolean;
    readonly itemTemplate: TemplateRef<any>;
    selectActiveMatch(isActiveItemChanged?: boolean): void;
    positionServiceEnable(): void;
    prevActiveMatch(): void;
    nextActiveMatch(): void;
    selectActive(value: TypeaheadMatch): void;
    highlight(match: TypeaheadMatch, query: string[] | string): string;
    focusLost(): void;
    isActive(value: TypeaheadMatch): boolean;
    selectMatch(value: TypeaheadMatch, e?: Event): boolean;
    setScrollableMode(): void;
    scrollPrevious(index: number): void;
    scrollNext(index: number): void;
    private isScrolledIntoView;
    private scrollToBottom;
    private scrollToTop;
}
