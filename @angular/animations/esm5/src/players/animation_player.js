/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { scheduleMicroTask } from '../util';
/**
 * An empty programmatic controller for reusable animations.
 * Used internally when animations are disabled, to avoid
 * checking for the null case when an animation player is expected.
 *
 * @see `animate()`
 * @see `AnimationPlayer`
 * @see `GroupPlayer`
 *
 * @publicApi
 */
var NoopAnimationPlayer = /** @class */ (function () {
    function NoopAnimationPlayer(duration, delay) {
        if (duration === void 0) { duration = 0; }
        if (delay === void 0) { delay = 0; }
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this._destroyed = false;
        this._finished = false;
        this.parentPlayer = null;
        this.totalTime = duration + delay;
    }
    NoopAnimationPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(function (fn) { return fn(); });
            this._onDoneFns = [];
        }
    };
    NoopAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    NoopAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    NoopAnimationPlayer.prototype.onDestroy = function (fn) { this._onDestroyFns.push(fn); };
    NoopAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    NoopAnimationPlayer.prototype.init = function () { };
    NoopAnimationPlayer.prototype.play = function () {
        if (!this.hasStarted()) {
            this._onStart();
            this.triggerMicrotask();
        }
        this._started = true;
    };
    /** @internal */
    NoopAnimationPlayer.prototype.triggerMicrotask = function () {
        var _this = this;
        scheduleMicroTask(function () { return _this._onFinish(); });
    };
    NoopAnimationPlayer.prototype._onStart = function () {
        this._onStartFns.forEach(function (fn) { return fn(); });
        this._onStartFns = [];
    };
    NoopAnimationPlayer.prototype.pause = function () { };
    NoopAnimationPlayer.prototype.restart = function () { };
    NoopAnimationPlayer.prototype.finish = function () { this._onFinish(); };
    NoopAnimationPlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._destroyed = true;
            if (!this.hasStarted()) {
                this._onStart();
            }
            this.finish();
            this._onDestroyFns.forEach(function (fn) { return fn(); });
            this._onDestroyFns = [];
        }
    };
    NoopAnimationPlayer.prototype.reset = function () { };
    NoopAnimationPlayer.prototype.setPosition = function (position) { };
    NoopAnimationPlayer.prototype.getPosition = function () { return 0; };
    /** @internal */
    NoopAnimationPlayer.prototype.triggerCallback = function (phaseName) {
        var methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
        methods.forEach(function (fn) { return fn(); });
        methods.length = 0;
    };
    return NoopAnimationPlayer;
}());
export { NoopAnimationPlayer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3BsYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvc3JjL3BsYXllcnMvYW5pbWF0aW9uX3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFtRzFDOzs7Ozs7Ozs7O0dBVUc7QUFDSDtJQVNFLDZCQUFZLFFBQW9CLEVBQUUsS0FBaUI7UUFBdkMseUJBQUEsRUFBQSxZQUFvQjtRQUFFLHNCQUFBLEVBQUEsU0FBaUI7UUFSM0MsZUFBVSxHQUFlLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNuQixpQkFBWSxHQUF5QixJQUFJLENBQUM7UUFFTSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFBQyxDQUFDO0lBQ25GLHVDQUFTLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFDRCxxQ0FBTyxHQUFQLFVBQVEsRUFBYyxJQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxvQ0FBTSxHQUFOLFVBQU8sRUFBYyxJQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCx1Q0FBUyxHQUFULFVBQVUsRUFBYyxJQUFVLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSx3Q0FBVSxHQUFWLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0Msa0NBQUksR0FBSixjQUFjLENBQUM7SUFDZixrQ0FBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLDhDQUFnQixHQUFoQjtRQUFBLGlCQUFpRTtRQUE1QyxpQkFBaUIsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFBQyxDQUFDO0lBRXpELHNDQUFRLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsbUNBQUssR0FBTCxjQUFlLENBQUM7SUFDaEIscUNBQU8sR0FBUCxjQUFpQixDQUFDO0lBQ2xCLG9DQUFNLEdBQU4sY0FBaUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQyxxQ0FBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFDRCxtQ0FBSyxHQUFMLGNBQWUsQ0FBQztJQUNoQix5Q0FBVyxHQUFYLFVBQVksUUFBZ0IsSUFBUyxDQUFDO0lBQ3RDLHlDQUFXLEdBQVgsY0FBd0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5DLGdCQUFnQjtJQUNoQiw2Q0FBZSxHQUFmLFVBQWdCLFNBQWlCO1FBQy9CLElBQU0sT0FBTyxHQUFHLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDMUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsRUFBRSxFQUFKLENBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUE5REQsSUE4REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge3NjaGVkdWxlTWljcm9UYXNrfSBmcm9tICcuLi91dGlsJztcblxuLyoqXG4gKiBQcm92aWRlcyBwcm9ncmFtbWF0aWMgY29udHJvbCBvZiBhIHJldXNhYmxlIGFuaW1hdGlvbiBzZXF1ZW5jZSxcbiAqIGJ1aWx0IHVzaW5nIHRoZSBgYnVpbGQoKWAgbWV0aG9kIG9mIGBBbmltYXRpb25CdWlsZGVyYC4gVGhlIGBidWlsZCgpYCBtZXRob2RcbiAqIHJldHVybnMgYSBmYWN0b3J5LCB3aG9zZSBgY3JlYXRlKClgIG1ldGhvZCBpbnN0YW50aWF0ZXMgYW5kIGluaXRpYWxpemVzIHRoaXMgaW50ZXJmYWNlLlxuICpcbiAqIEBzZWUgYEFuaW1hdGlvbkJ1aWxkZXJgXG4gKiBAc2VlIGBBbmltYXRpb25GYWN0b3J5YFxuICogQHNlZSBgYW5pbWF0ZSgpYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25QbGF5ZXIge1xuICAvKipcbiAgICogUHJvdmlkZXMgYSBjYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgYW5pbWF0aW9uIGZpbmlzaGVzLlxuICAgKiBAcGFyYW0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKiBAc2VlIGBmaW5pc2goKWBcbiAgICovXG4gIG9uRG9uZShmbjogKCkgPT4gdm9pZCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIGNhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBhbmltYXRpb24gc3RhcnRzLlxuICAgKiBAcGFyYW0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKiBAc2VlIGBydW4oKWBcbiAgICovXG4gIG9uU3RhcnQoZm46ICgpID0+IHZvaWQpOiB2b2lkO1xuICAvKipcbiAgICogUHJvdmlkZXMgYSBjYWxsYmFjayB0byBpbnZva2UgYWZ0ZXIgdGhlIGFuaW1hdGlvbiBpcyBkZXN0cm95ZWQuXG4gICAqIEBwYXJhbSBmbiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqIEBzZWUgYGRlc3Ryb3koKWBcbiAgICogQHNlZSBgYmVmb3JlRGVzdHJveSgpYFxuICAgKi9cbiAgb25EZXN0cm95KGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBhbmltYXRpb24uXG4gICAqL1xuICBpbml0KCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBSZXBvcnRzIHdoZXRoZXIgdGhlIGFuaW1hdGlvbiBoYXMgc3RhcnRlZC5cbiAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgYW5pbWF0aW9uIGhhcyBzdGFydGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBoYXNTdGFydGVkKCk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBSdW5zIHRoZSBhbmltYXRpb24sIGludm9raW5nIHRoZSBgb25TdGFydCgpYCBjYWxsYmFjay5cbiAgICovXG4gIHBsYXkoKTogdm9pZDtcbiAgLyoqXG4gICAqIFBhdXNlcyB0aGUgYW5pbWF0aW9uLlxuICAgKi9cbiAgcGF1c2UoKTogdm9pZDtcbiAgLyoqXG4gICAqIFJlc3RhcnRzIHRoZSBwYXVzZWQgYW5pbWF0aW9uLlxuICAgKi9cbiAgcmVzdGFydCgpOiB2b2lkO1xuICAvKipcbiAgICogRW5kcyB0aGUgYW5pbWF0aW9uLCBpbnZva2luZyB0aGUgYG9uRG9uZSgpYCBjYWxsYmFjay5cbiAgICovXG4gIGZpbmlzaCgpOiB2b2lkO1xuICAvKipcbiAgICogRGVzdHJveXMgdGhlIGFuaW1hdGlvbiwgYWZ0ZXIgaW52b2tpbmcgdGhlIGBiZWZvcmVEZXN0cm95KClgIGNhbGxiYWNrLlxuICAgKiBDYWxscyB0aGUgYG9uRGVzdHJveSgpYCBjYWxsYmFjayB3aGVuIGRlc3RydWN0aW9uIGlzIGNvbXBsZXRlZC5cbiAgICovXG4gIGRlc3Ryb3koKTogdm9pZDtcbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgYW5pbWF0aW9uIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuICAgKi9cbiAgcmVzZXQoKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBhbmltYXRpb24uXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBBIDAtYmFzZWQgb2Zmc2V0IGludG8gdGhlIGR1cmF0aW9uLCBpbiBtaWxsaXNlY29uZHMuXG4gICAqL1xuICBzZXRQb3NpdGlvbihwb3NpdGlvbjogYW55IC8qKiBUT0RPICM5MTAwICovKTogdm9pZDtcbiAgLyoqXG4gICAqIFJlcG9ydHMgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGFuaW1hdGlvbi5cbiAgICogQHJldHVybnMgQSAwLWJhc2VkIG9mZnNldCBpbnRvIHRoZSBkdXJhdGlvbiwgaW4gbWlsbGlzZWNvbmRzLlxuICAgKi9cbiAgZ2V0UG9zaXRpb24oKTogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHBhcmVudCBvZiB0aGlzIHBsYXllciwgaWYgYW55LlxuICAgKi9cbiAgcGFyZW50UGxheWVyOiBBbmltYXRpb25QbGF5ZXJ8bnVsbDtcbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBydW4gdGltZSBvZiB0aGUgYW5pbWF0aW9uLCBpbiBtaWxsaXNlY29uZHMuXG4gICAqL1xuICByZWFkb25seSB0b3RhbFRpbWU6IG51bWJlcjtcbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgY2FsbGJhY2sgdG8gaW52b2tlIGJlZm9yZSB0aGUgYW5pbWF0aW9uIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIGJlZm9yZURlc3Ryb3k/OiAoKSA9PiBhbnk7XG4gIC8qKiBAaW50ZXJuYWxcbiAgICogSW50ZXJuYWxcbiAgICovXG4gIHRyaWdnZXJDYWxsYmFjaz86IChwaGFzZU5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgLyoqIEBpbnRlcm5hbFxuICAgKiBJbnRlcm5hbFxuICAgKi9cbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEFuIGVtcHR5IHByb2dyYW1tYXRpYyBjb250cm9sbGVyIGZvciByZXVzYWJsZSBhbmltYXRpb25zLlxuICogVXNlZCBpbnRlcm5hbGx5IHdoZW4gYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsIHRvIGF2b2lkXG4gKiBjaGVja2luZyBmb3IgdGhlIG51bGwgY2FzZSB3aGVuIGFuIGFuaW1hdGlvbiBwbGF5ZXIgaXMgZXhwZWN0ZWQuXG4gKlxuICogQHNlZSBgYW5pbWF0ZSgpYFxuICogQHNlZSBgQW5pbWF0aW9uUGxheWVyYFxuICogQHNlZSBgR3JvdXBQbGF5ZXJgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgTm9vcEFuaW1hdGlvblBsYXllciBpbXBsZW1lbnRzIEFuaW1hdGlvblBsYXllciB7XG4gIHByaXZhdGUgX29uRG9uZUZuczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIF9vblN0YXJ0Rm5zOiBGdW5jdGlvbltdID0gW107XG4gIHByaXZhdGUgX29uRGVzdHJveUZuczogRnVuY3Rpb25bXSA9IFtdO1xuICBwcml2YXRlIF9zdGFydGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICBwcml2YXRlIF9maW5pc2hlZCA9IGZhbHNlO1xuICBwdWJsaWMgcGFyZW50UGxheWVyOiBBbmltYXRpb25QbGF5ZXJ8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyByZWFkb25seSB0b3RhbFRpbWU6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoZHVyYXRpb246IG51bWJlciA9IDAsIGRlbGF5OiBudW1iZXIgPSAwKSB7IHRoaXMudG90YWxUaW1lID0gZHVyYXRpb24gKyBkZWxheTsgfVxuICBwcml2YXRlIF9vbkZpbmlzaCgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpbmlzaGVkKSB7XG4gICAgICB0aGlzLl9maW5pc2hlZCA9IHRydWU7XG4gICAgICB0aGlzLl9vbkRvbmVGbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgIHRoaXMuX29uRG9uZUZucyA9IFtdO1xuICAgIH1cbiAgfVxuICBvblN0YXJ0KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uU3RhcnRGbnMucHVzaChmbik7IH1cbiAgb25Eb25lKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uRG9uZUZucy5wdXNoKGZuKTsgfVxuICBvbkRlc3Ryb3koZm46ICgpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fb25EZXN0cm95Rm5zLnB1c2goZm4pOyB9XG4gIGhhc1N0YXJ0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zdGFydGVkOyB9XG4gIGluaXQoKTogdm9pZCB7fVxuICBwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNTdGFydGVkKCkpIHtcbiAgICAgIHRoaXMuX29uU3RhcnQoKTtcbiAgICAgIHRoaXMudHJpZ2dlck1pY3JvdGFzaygpO1xuICAgIH1cbiAgICB0aGlzLl9zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgdHJpZ2dlck1pY3JvdGFzaygpIHsgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4gdGhpcy5fb25GaW5pc2goKSk7IH1cblxuICBwcml2YXRlIF9vblN0YXJ0KCkge1xuICAgIHRoaXMuX29uU3RhcnRGbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICB0aGlzLl9vblN0YXJ0Rm5zID0gW107XG4gIH1cblxuICBwYXVzZSgpOiB2b2lkIHt9XG4gIHJlc3RhcnQoKTogdm9pZCB7fVxuICBmaW5pc2goKTogdm9pZCB7IHRoaXMuX29uRmluaXNoKCk7IH1cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5oYXNTdGFydGVkKCkpIHtcbiAgICAgICAgdGhpcy5fb25TdGFydCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgIHRoaXMuX29uRGVzdHJveUZucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgICAgdGhpcy5fb25EZXN0cm95Rm5zID0gW107XG4gICAgfVxuICB9XG4gIHJlc2V0KCk6IHZvaWQge31cbiAgc2V0UG9zaXRpb24ocG9zaXRpb246IG51bWJlcik6IHZvaWQge31cbiAgZ2V0UG9zaXRpb24oKTogbnVtYmVyIHsgcmV0dXJuIDA7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHRyaWdnZXJDYWxsYmFjayhwaGFzZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IG1ldGhvZHMgPSBwaGFzZU5hbWUgPT0gJ3N0YXJ0JyA/IHRoaXMuX29uU3RhcnRGbnMgOiB0aGlzLl9vbkRvbmVGbnM7XG4gICAgbWV0aG9kcy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIG1ldGhvZHMubGVuZ3RoID0gMDtcbiAgfVxufVxuIl19