!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("@angular/core"),require("tslib"),require("@progress/kendo-angular-common"),require("rxjs"),require("@progress/kendo-popup-common"),require("rxjs/operators"),require("@angular/animations"),require("@angular/common")):"function"==typeof define&&define.amd?define(["@angular/core","tslib","@progress/kendo-angular-common","rxjs","@progress/kendo-popup-common","rxjs/operators","@angular/animations","@angular/common"],e):"object"==typeof exports?exports.KendoAngularPopup=e(require("@angular/core"),require("tslib"),require("@progress/kendo-angular-common"),require("rxjs"),require("@progress/kendo-popup-common"),require("rxjs/operators"),require("@angular/animations"),require("@angular/common")):t.KendoAngularPopup=e(t["@angular/core"],t.tslib,t["@progress/kendo-angular-common"],t.rxjs,t["@progress/kendo-popup-common"],t["rxjs/operators"],t["@angular/animations"],t["@angular/common"])}(window,function(t,e,n,o,i,r,s,a){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=11)}([function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(9),i=n(4);e.eitherRect=function(t,e){return t||{height:0,left:e.left,top:e.top,width:0}},e.replaceOffset=function(t,e){return e?{height:t.height,left:e.left,top:e.top,width:t.width}:t},e.removeStackingOffset=function(t,e){return e?{height:t.height,left:t.left-e.left,top:t.top-e.top,width:t.width}:t},e.isDifferentOffset=function(t,e){var n=t.left,o=t.top,i=e.left,r=e.top;return Math.abs(n-i)>=1||Math.abs(o-r)>=1},e.isWindowAvailable=function(){return"undefined"!=typeof window},e.hasBoundingRect=function(t){return!!t.getBoundingClientRect},e.OVERFLOW_REGEXP=/auto|scroll/;var r,s,a,p=function(t){return function(t){return""+t.style.overflow+t.style.overflowX+t.style.overflowY}(t)||function(t){var e=window.getComputedStyle(t);return""+e.overflow+e.overflowX+e.overflowY}(t)};e.scrollableParents=function(t){var n=[];if(!i.isDocumentAvailable()||!e.isWindowAvailable())return n;for(var o=t.parentElement;o;)(e.OVERFLOW_REGEXP.test(p(o))||o.hasAttribute("data-scrollable"))&&n.push(o),o=o.parentElement;return n.push(window),n},e.FRAME_DURATION=1e3/60,e.hasRelativeStackingContext=(r=function(){if(!i.isDocumentAvailable()&&null!==document.body)return!1;var t=document.createElement("div");t.style.transform="matrix(10, 0, 0, 10, 0, 0)",t.innerHTML='<div style="position: fixed; top: 10px;">child</div>',document.body.appendChild(t);var e=10!==t.children[0].getBoundingClientRect().top;return document.body.removeChild(t),e},a=!1,function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return a?s:(s=r.apply(void 0,t),a=!0,s)}),e.zIndex=function(t,n){if(!t||!i.isDocumentAvailable()||!e.isWindowAvailable())return null;var r=o.siblingContainer(t,n);if(!r)return null;var s=[t].concat(o.parents(t,r)).reduce(function(t,e){var n=e.style.zIndex||window.getComputedStyle(e).zIndex,o=parseInt(n,10);return o>t?o:t},0);return s?s+1:null},e.scaleRect=function(t,e){return t&&1!==e?{height:t.height/e,left:t.left/e,top:t.top/e,width:t.width/e}:t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(9),s=n(2),a=n(4),p=["font-size","font-family","font-stretch","font-style","font-weight","line-height"],c=function(){function t(){}return t.prototype.addOffset=function(t,e){return{left:t.left+e.left,top:t.top+e.top}},t.prototype.addScroll=function(t,e){return r.addScroll(t,e)},t.prototype.align=function(t){return r.align(t)},t.prototype.boundingOffset=function(t){return r.boundingOffset(this.nativeElement(t))},t.prototype.getFontStyles=function(t){var e=this.getWindow();if(!e||!t)return[];var n=e.getComputedStyle(this.nativeElement(t));return p.map(function(t){return{key:t,value:n[t]}})},t.prototype.getWindow=function(){return s.isWindowAvailable()?window:null},t.prototype.hasOffsetParent=function(t){return!!t&&!!this.nativeElement(t).offsetParent},t.prototype.offset=function(t){return t?r.offset(this.nativeElement(t)):null},t.prototype.offsetAtPoint=function(t,e){if(!t)return null;var n=this.nativeElement(t),o=n.style,i=o.left,s=o.top,a=o.transition;n.style.transition="none",n.style.left=e.left+"px",n.style.top=e.top+"px";var p=r.offset(n);return n.style.left=i,n.style.top=s,n.offsetHeight,n.style.transition=a,p},t.prototype.nativeElement=function(t){return t?t.nativeElement||t:null},t.prototype.position=function(t,e,n){return void 0===n&&(n=1),t&&e?r.positionWithScroll(this.nativeElement(t),this.nativeElement(e),n):null},t.prototype.removeScroll=function(t,e){return r.removeScroll(t,e)},t.prototype.restrictToView=function(t){return r.restrictToView(t)},t.prototype.scrollPosition=function(t){return r.scrollPosition(this.nativeElement(t))},t.prototype.scrollableParents=function(t){return s.scrollableParents(this.nativeElement(t))},t.prototype.stackingElementOffset=function(t){var e=this.getRelativeContextElement(t);return e?r.offset(e):null},t.prototype.stackingElementScroll=function(t){var e=this.getRelativeContextElement(t);return e?{x:e.scrollLeft,y:e.scrollTop}:{x:0,y:0}},t.prototype.getRelativeContextElement=function(t){if(!t||!s.hasRelativeStackingContext())return null;for(var e=this.nativeElement(t).parentElement;e;){if("none"!==window.getComputedStyle(e).transform)return e;e=e.parentElement}return null},t.prototype.useRelativePosition=function(t){return!!this.getRelativeContextElement(t)},t.prototype.windowViewPort=function(t){return r.getWindowViewPort(this.nativeElement(t))},t.prototype.zIndex=function(t,e){return s.zIndex(this.nativeElement(t),this.nativeElement(e))},t.prototype.zoomLevel=function(){return a.isDocumentAvailable()&&s.isWindowAvailable()&&parseFloat((document.documentElement.clientWidth/window.innerWidth).toFixed(2))||1},t.prototype.isZoomed=function(){return this.zoomLevel()>1},t=o.__decorate([i.Injectable()],t)}();e.DOMService=c},function(t,e){t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(6),s=n(12),a=n(3),p=n(13),c=n(14),l=n(15),u=n(16),f=n(2),d=n(4),h={left:-1e4,top:0},m="k-animation-container",v=function(){function t(t,e,n,o,r,s,a,p,c){this.container=t,this._alignService=e,this.domService=n,this._positionService=o,this._resizeService=r,this._scrollableService=s,this.animationService=a,this._renderer=p,this._zone=c,this.animate=!0,this.anchorAlign={horizontal:"left",vertical:"bottom"},this.collision={horizontal:"fit",vertical:"flip"},this.popupAlign={horizontal:"left",vertical:"top"},this.copyAnchorStyles=!1,this.positionMode="fixed",this.offset=h,this.anchorViewportLeave=new i.EventEmitter,this.close=new i.EventEmitter,this.open=new i.EventEmitter,this.positionChange=new i.EventEmitter,this.resolvedPromise=Promise.resolve(null),this._renderer.addClass(t.nativeElement,m),this.updateFixedClass()}return t.prototype.ngOnInit=function(){this.repositionCallback=this.reposition.bind(this),this._resizeService.subscribe(this.repositionCallback),this.animationSubscriptions=this.animationService.start.subscribe(this.onAnimationStart.bind(this)),this.animationSubscriptions.add(this.animationService.end.subscribe(this.onAnimationEnd.bind(this))),this._scrollableService.forElement(this.anchor||this.container).subscribe(this.onScroll.bind(this)),this.currentOffset=h,this.setZIndex(),this.copyFontStyles(),this.updateFixedClass()},t.prototype.ngOnChanges=function(t){t.copyAnchorStyles&&this.copyFontStyles(),t.positionMode&&this.updateFixedClass()},t.prototype.ngAfterViewInit=function(){var t=this;this.reposition(),this.animate||this.resolvedPromise.then(function(){t.onAnimationEnd()})},t.prototype.ngAfterViewChecked=function(){var t=this;this._zone.runOutsideAngular(function(){t.repositionSubscription&&t.repositionSubscription.unsubscribe(),t.repositionSubscription=r.from(t.resolvedPromise).subscribe(t.repositionCallback)})},t.prototype.ngOnDestroy=function(){this.anchorViewportLeave.complete(),this.positionChange.complete(),this.close.emit(),this.close.complete(),this._resizeService.unsubscribe(),this._scrollableService.unsubscribe(),this.repositionSubscription&&this.repositionSubscription.unsubscribe(),this.animationSubscriptions.unsubscribe()},t.prototype.onAnimationStart=function(){this._renderer.removeClass(this.container.nativeElement,"k-animation-container-shown")},t.prototype.onAnimationEnd=function(){this._renderer.addClass(this.container.nativeElement,"k-animation-container-shown"),this.open.emit(),this.open.complete()},Object.defineProperty(t.prototype,"currentOffset",{get:function(){return this._currentOffset},set:function(t){this.setContainerStyle("left",t.left+"px"),this.setContainerStyle("top",t.top+"px"),this._currentOffset=t},enumerable:!0,configurable:!0}),t.prototype.setZIndex=function(){this.anchor&&this.setContainerStyle("z-index",String(this.domService.zIndex(this.anchor,this.container)))},t.prototype.reposition=function(){var t=this;if(d.isDocumentAvailable()){var e=this.position(),n=e.flip,o=e.offset;this.currentOffset&&!f.isDifferentOffset(this.currentOffset,o)||(this.currentOffset=o,d.hasObservers(this.positionChange)&&this._zone.run(function(){return t.positionChange.emit({offset:o,flip:n})})),this.animate&&this.animationService.play(this.contentContainer.nativeElement,this.animate,n)}},t.prototype.position=function(){var t=this._alignService.alignElement({anchor:this.anchor,anchorAlign:this.anchorAlign,element:this.container,elementAlign:this.popupAlign,margin:this.margin,offset:this.offset,positionMode:this.positionMode});return this._positionService.positionElement({anchor:this.anchor,anchorAlign:this.anchorAlign,collisions:this.collision,currentLocation:t,element:this.container,elementAlign:this.popupAlign,margin:this.margin})},t.prototype.onScroll=function(t){var e=this,n=d.hasObservers(this.anchorViewportLeave);t||!n?this.reposition():n&&this._zone.run(function(){e.anchorViewportLeave.emit()})},t.prototype.copyFontStyles=function(){var t=this;this.anchor&&this.copyAnchorStyles&&this.domService.getFontStyles(this.anchor).forEach(function(e){return t.setContainerStyle(e.key,e.value)})},t.prototype.updateFixedClass=function(){var t="fixed"===this.positionMode?"addClass":"removeClass";this._renderer[t](this.container.nativeElement,"k-animation-container-fixed")},t.prototype.setContainerStyle=function(t,e){this._renderer.setStyle(this.container.nativeElement,t,e)},o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"animate",void 0),o.__decorate([i.Input(),o.__metadata("design:type",i.ElementRef)],t.prototype,"anchor",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"anchorAlign",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"collision",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"popupAlign",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Boolean)],t.prototype,"copyAnchorStyles",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"popupClass",void 0),o.__decorate([i.Input(),o.__metadata("design:type",String)],t.prototype,"positionMode",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"offset",void 0),o.__decorate([i.Input(),o.__metadata("design:type",Object)],t.prototype,"margin",void 0),o.__decorate([i.Output(),o.__metadata("design:type",i.EventEmitter)],t.prototype,"anchorViewportLeave",void 0),o.__decorate([i.Output(),o.__metadata("design:type",i.EventEmitter)],t.prototype,"close",void 0),o.__decorate([i.Output(),o.__metadata("design:type",i.EventEmitter)],t.prototype,"open",void 0),o.__decorate([i.Output(),o.__metadata("design:type",i.EventEmitter)],t.prototype,"positionChange",void 0),o.__decorate([i.ViewChild("container"),o.__metadata("design:type",i.ElementRef)],t.prototype,"contentContainer",void 0),t=o.__decorate([i.Component({exportAs:"kendo-popup",providers:[s.AlignService,u.AnimationService,a.DOMService,p.PositionService,c.ResizeService,l.ScrollableService],selector:"kendo-popup",template:'\n        <div class="k-popup" [ngClass]="popupClass" #container>\n            <ng-content></ng-content>\n            <ng-template [ngTemplateOutlet]="content" [ngIf]="content"></ng-template>\n        </div>\n     '}),o.__metadata("design:paramtypes",[i.ElementRef,s.AlignService,a.DOMService,p.PositionService,c.ResizeService,l.ScrollableService,u.AnimationService,i.Renderer2,i.NgZone])],t)}();e.PopupComponent=v},function(t,e){t.exports=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0);e.SCALE=new o.InjectionToken("Popup Document Scale")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(5);e.POPUP_CONTAINER=new i.InjectionToken("Popup Container");var s=function(){function t(t,e,n,o){this.applicationRef=t,this.componentFactoryResolver=e,this.injector=n,this.container=o}return Object.defineProperty(t.prototype,"rootViewContainer",{get:function(){var t=this.applicationRef.components||[];if(t[0])return t[0];throw new Error("\n            View Container not found! Inject the POPUP_CONTAINER or define a specific ViewContainerRef via the appendTo option.\n            See http://www.telerik.com/kendo-angular-ui/components/popup/api/POPUP_CONTAINER/ for more details.\n        ")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rootViewContainerNode",{get:function(){return this.container?this.container.nativeElement:this.getComponentRootNode(this.rootViewContainer)},enumerable:!0,configurable:!0}),t.prototype.open=function(t){void 0===t&&(t={});var e=this.contentFrom(t.content),n=e.component,o=e.nodes,i=this.appendPopup(o,t.appendTo),r=i.instance;this.projectComponentInputs(i,t),i.changeDetectorRef.detectChanges(),n&&n.changeDetectorRef.detectChanges();var s=this.getComponentRootNode(i);return{close:function(){var t;n?n.destroy():i.hostView.destroyed||(i.instance.content=null,i.changeDetectorRef.detectChanges()),i.destroy(),(t=s)&&t.parentNode&&t.parentNode.removeChild(t)},content:n,popup:i,popupAnchorViewportLeave:r.anchorViewportLeave,popupClose:r.close,popupElement:s,popupOpen:r.open,popupPositionChange:r.positionChange}},t.prototype.appendPopup=function(t,e){var n=this.createComponent(r.PopupComponent,t,e);return e||this.rootViewContainerNode.appendChild(this.getComponentRootNode(n)),n},t.prototype.getComponentRootNode=function(t){return t.hostView.rootNodes[0]},t.prototype.getComponentFactory=function(t){return this.componentFactoryResolver.resolveComponentFactory(t)},t.prototype.createComponent=function(t,e,n){var o=this.getComponentFactory(t);if(n)return n.createComponent(o,void 0,this.injector,e);var i=o.create(this.injector,e);return this.applicationRef.attachView(i.hostView),i},t.prototype.projectComponentInputs=function(t,e){return Object.getOwnPropertyNames(e).filter(function(t){return"content"!==t||e.content instanceof i.TemplateRef}).map(function(n){t.instance[n]=e[n]}),t},t.prototype.contentFrom=function(t){if(!t||t instanceof i.TemplateRef)return{component:null,nodes:[[]]};var e=this.createComponent(t);return{component:e,nodes:[e?[e.location.nativeElement]:[]]}},t=o.__decorate([i.Injectable(),o.__param(3,i.Inject(e.POPUP_CONTAINER)),o.__param(3,i.Optional()),o.__metadata("design:paramtypes",[i.ApplicationRef,i.ComponentFactoryResolver,i.Injector,i.ElementRef])],t)}();e.PopupService=s},function(t,e){t.exports=i},function(t,e){t.exports=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(8);e.PopupService=o.PopupService,e.POPUP_CONTAINER=o.POPUP_CONTAINER;var i=n(5);e.PopupComponent=i.PopupComponent;var r=n(18);e.PopupModule=r.PopupModule;var s=n(7);e.SCALE=s.SCALE},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(3),s=n(2),a=n(7),p=function(){function t(t,e){void 0===e&&(e=1),this._dom=t,this.scale=e}return t.prototype.alignElement=function(t){var e=t.anchor,n=t.element,o=t.anchorAlign,i=t.elementAlign,r=t.margin,a=t.offset,p=t.positionMode,c=this.scale||1,l="fixed"===p||!this._dom.hasOffsetParent(n)?this.absoluteRect(e,n,a,c):this.relativeRect(e,n,a,c),u=s.scaleRect(this._dom.offset(n),c);return this._dom.align({anchorAlign:o,anchorRect:l,elementAlign:i,elementRect:u,margin:r})},t.prototype.absoluteRect=function(t,e,n,o){var i=this.elementScrollPosition(t,e),r=s.eitherRect(this._dom.offset(t),n),a=2*o,p=this._dom.stackingElementScroll(e);1!==o&&p&&(p.x/=a,p.y/=a);var c=this._dom.stackingElementOffset(e);return 1!==o&&c&&(c.left/=a,c.top/=a),this._dom.removeScroll(this._dom.addScroll(s.removeStackingOffset(s.scaleRect(r,o),c),p),i)},t.prototype.elementScrollPosition=function(t,e){return t?{x:0,y:0}:this._dom.scrollPosition(e)},t.prototype.relativeRect=function(t,e,n,o){var i=s.eitherRect(this._dom.position(t,e,o),n);return s.scaleRect(i,o)},t=o.__decorate([i.Injectable(),o.__param(1,i.Inject(a.SCALE)),o.__param(1,i.Optional()),o.__metadata("design:paramtypes",[r.DOMService,Number])],t)}();e.AlignService=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(3),s=n(2),a=n(7),p=function(){function t(t,e){void 0===e&&(e=1),this._dom=t,this.scale=e}return t.prototype.positionElement=function(t){var e=t.anchor,n=t.currentLocation,o=t.element,i=t.anchorAlign,r=t.elementAlign,a=t.collisions,p=t.margin,c=this._dom,l=this.scale||1,u=c.offsetAtPoint(o,n),f=s.scaleRect(u,l),d=s.scaleRect(c.offset(e),l),h=s.eitherRect(d,n),m=t.viewPort||c.windowViewPort(o);m.width=m.width/l,m.height=m.height/l;var v=c.restrictToView({anchorAlign:i,anchorRect:h,collisions:a,elementAlign:r,elementRect:f,margin:p,viewPort:m}),y=c.addOffset(n,v.offset);return{flip:v.flip,flipped:v.flipped,offset:y}},t=o.__decorate([i.Injectable(),o.__param(1,i.Inject(a.SCALE)),o.__param(1,i.Optional()),o.__metadata("design:paramtypes",[r.DOMService,Number])],t)}();e.PositionService=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(6),s=n(10),a=n(4),p=n(2),c=n(3),l=function(){function t(t,e){this._dom=t,this._zone=e}return t.prototype.subscribe=function(t){var e=this;a.isDocumentAvailable()&&this._zone.runOutsideAngular(function(){e.subscription=r.fromEvent(e._dom.getWindow(),"resize").pipe(s.auditTime(p.FRAME_DURATION)).subscribe(function(){return t()})})},t.prototype.unsubscribe=function(){this.subscription&&this.subscription.unsubscribe()},t.prototype.isUnsubscribed=function(){return this.subscription&&this.subscription.closed},t=o.__decorate([i.Injectable(),o.__metadata("design:paramtypes",[c.DOMService,i.NgZone])],t)}();e.ResizeService=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(6),s=n(10),a=n(4),p=n(3),c=n(2);e.THRESHOLD_DIFF=1;var l=function(){function t(t,e){this._dom=t,this._zone=e}return t.prototype.forElement=function(t){return this.unsubscribe(),this.element=t,this},t.prototype.subscribe=function(t){var e=this;if(t&&a.isDocumentAvailable()&&this.element){var n=this._dom.nativeElement(this.element),o=this._dom.scrollableParents(this.element);this._zone.runOutsideAngular(function(){var i=o.map(function(t){return r.fromEvent(t,"scroll").pipe(s.auditTime(c.FRAME_DURATION))});e.subscription=r.merge.apply(void 0,i).subscribe(function(i){var r=i.target,s=o.filter(function(t){return t===r}).length>0,a=r===document,p=r===window;(s||a||p)&&t(e.isVisible(n,r))})})}},t.prototype.unsubscribe=function(){this.subscription&&this.subscription.unsubscribe()},t.prototype.isVisible=function(t,n){var o=this._dom.boundingOffset(t),i=this._dom.boundingOffset(n);return!(e.THRESHOLD_DIFF<i.top-o.bottom)&&(!(e.THRESHOLD_DIFF<o.top-i.bottom)&&(!(e.THRESHOLD_DIFF<o.left-i.right)&&!(e.THRESHOLD_DIFF<i.left-o.right)))},t=o.__decorate([i.Injectable(),o.__metadata("design:paramtypes",[p.DOMService,i.NgZone])],t)}();e.ScrollableService=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(17),s={expand:function(t){var e="up"===t||"down"===t?"scaleY":"scaleX";return{start:{transform:e+"(0)",transformOrigin:"down"===t?"top":"left"===t?"right":"right"===t?"left":"bottom"},end:{transform:e+"(1)"}}},slide:function(t){var e="left"===t||"right"===t?"translateX":"translateY";return{start:{transform:e+"("+("right"===t||"down"===t?-100:100)+"%)"},end:{transform:e+"(0%)"}}},fade:function(){return{start:{opacity:0},end:{opacity:1}}},zoom:function(){return{start:{transform:"scale(0)"},end:{transform:"scale(1)"}}}},a=function(){function t(t){this.animationBuilder=t,this.start=new i.EventEmitter,this.end=new i.EventEmitter}return t.prototype.play=function(t,e,n){if(!this.flip||this.flip.horizontal!==n.horizontal||this.flip.vertical!==n.vertical){this.flip=n;var o=e.type||"slide",r=s[o];if(r){var a=r(this.getDirection(n,e));this.playStates(t,a,e)}else if(i.isDevMode())throw new Error('Unsupported animation type: "'+o+'". The supported types are slide, expand, fade and zoom.')}},t.prototype.ngOnDestroy=function(){this.stopPlayer()},t.prototype.playStates=function(t,e,n){var o=this;this.stopPlayer();var i=n.duration||100,s=this.animationBuilder.build([r.style(e.start),r.animate(i+"ms ease-in",r.style(e.end))]),a=this.player=s.create(t);a.onDone(function(){o.end.emit(),o.stopPlayer()}),this.start.emit(),a.play()},t.prototype.getDirection=function(t,e){var n=e.direction||"down";return t.horizontal&&("left"===n?n="right":"right"===n&&(n="left")),t.vertical&&("down"===n?n="up":"up"===n&&(n="down")),n},t.prototype.stopPlayer=function(){this.player&&(this.player.destroy(),this.player=null)},t=o.__decorate([i.Injectable(),o.__metadata("design:paramtypes",[r.AnimationBuilder])],t)}();e.AnimationService=a},function(t,e){t.exports=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(19),s=n(5),a=n(8),p=[s.PopupComponent],c=function(){function t(){}return t=o.__decorate([i.NgModule({declarations:[p],entryComponents:[p],exports:[p],imports:[r.CommonModule],providers:[a.PopupService]})],t)}();e.PopupModule=c},function(t,e){t.exports=a}])});