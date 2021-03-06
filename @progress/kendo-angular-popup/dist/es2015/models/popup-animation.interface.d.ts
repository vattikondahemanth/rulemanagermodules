/**
 * The animation settings for the Popup component.
 */
export interface PopupAnimation {
    /**
     * The type of the animation.
     * @default 'slide'
     */
    type?: 'slide' | 'expand' | 'zoom' | 'fade';
    /**
     * The animation duration in milliseconds.
     * @default 100
     */
    duration: number;
    /**
     * The animation direction. Applicable if the type is set to `slide` or `expand`.
     * @default 'down'
     */
    direction: 'down' | 'up' | 'left' | 'right';
}
