System.register("@progress/kendo-angular-popup",["tslib","@angular/core","@angular/common","rxjs","@progress/kendo-angular-common","@progress/kendo-popup-common","rxjs/operators","@angular/animations"],function(a){var r,s,p,c,l,u,f,d;function e(t){return t.__useDefault?t.default:t}return{setters:[function(t){r=e(t)},function(t){s=e(t)},function(t){p=e(t)},function(t){c=e(t)},function(t){l=e(t)},function(t){u=e(t)},function(t){f=e(t)},function(t){d=e(t)}],execute:function(){function o(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var n,i;i={},o.m=n=[function(t,e){t.exports=s},function(t,e){t.exports=r},function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(9),p=e(3);a.eitherRect=function(t,e){return t||{height:0,left:e.left,top:e.top,width:0}},a.replaceOffset=function(t,e){return e?{height:t.height,left:e.left,top:e.top,width:t.width}:t},a.removeStackingOffset=function(t,e){return e?{height:t.height,left:t.left-e.left,top:t.top-e.top,width:t.width}:t},a.isDifferentOffset=function(t,e){var n=t.left,o=t.top,i=e.left,r=e.top;return 1<=Math.abs(n-i)||1<=Math.abs(o-r)},a.isWindowAvailable=function(){return"undefined"!=typeof window},a.hasBoundingRect=function(t){return!!t.getBoundingClientRect},a.OVERFLOW_REGEXP=/auto|scroll/;var n,o;a.scrollableParents=function(t){var e,n,o,i,r=[];if(!p.isDocumentAvailable()||!a.isWindowAvailable())return r;for(var s=t.parentElement;s;)(a.OVERFLOW_REGEXP.test((i=o=n=void 0,""+(i=e=s).style.overflow+i.style.overflowX+i.style.overflowY||(n=e,""+(o=window.getComputedStyle(n)).overflow+o.overflowX+o.overflowY)))||s.hasAttribute("data-scrollable"))&&r.push(s),s=s.parentElement;return r.push(window),r},a.FRAME_DURATION=1e3/60,a.hasRelativeStackingContext=(o=!1,function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return o||(n=function(){if(!p.isDocumentAvailable()&&null!==document.body)return!1;var t=document.createElement("div");t.style.transform="matrix(10, 0, 0, 10, 0, 0)",t.innerHTML='<div style="position: fixed; top: 10px;">child</div>',document.body.appendChild(t);var e=10!==t.children[0].getBoundingClientRect().top;return document.body.removeChild(t),e}.apply(void 0,t),o=!0),n}),a.zIndex=function(t,e){if(!t||!p.isDocumentAvailable()||!a.isWindowAvailable())return null;var n=i.siblingContainer(t,e);if(!n)return null;var o=[t].concat(i.parents(t,n)).reduce(function(t,e){var n=e.style.zIndex||window.getComputedStyle(e).zIndex,o=parseInt(n,10);return t<o?o:t},0);return o?o+1:null},a.scaleRect=function(t,e){return t&&1!==e?{height:t.height/e,left:t.left/e,top:t.top/e,width:t.width/e}:t}},function(t,e){t.exports=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),p=n(9),r=n(2),s=n(3),a=["font-size","font-family","font-stretch","font-style","font-weight","line-height"],c=(l.prototype.addOffset=function(t,e){return{left:t.left+e.left,top:t.top+e.top}},l.prototype.addScroll=function(t,e){return p.addScroll(t,e)},l.prototype.align=function(t){return p.align(t)},l.prototype.boundingOffset=function(t){return p.boundingOffset(this.nativeElement(t))},l.prototype.getFontStyles=function(t){var e=this.getWindow();if(!e||!t)return[];var n=e.getComputedStyle(this.nativeElement(t));return a.map(function(t){return{key:t,value:n[t]}})},l.prototype.getWindow=function(){return r.isWindowAvailable()?window:null},l.prototype.hasOffsetParent=function(t){return!!t&&!!this.nativeElement(t).offsetParent},l.prototype.offset=function(t){return t?p.offset(this.nativeElement(t)):null},l.prototype.offsetAtPoint=function(t,e){if(!t)return null;var n=this.nativeElement(t),o=n.style,i=o.left,r=o.top,s=o.transition;n.style.transition="none",n.style.left=e.left+"px",n.style.top=e.top+"px";var a=p.offset(n);return n.style.left=i,n.style.top=r,n.offsetHeight,n.style.transition=s,a},l.prototype.nativeElement=function(t){return t?t.nativeElement||t:null},l.prototype.position=function(t,e,n){return void 0===n&&(n=1),t&&e?p.positionWithScroll(this.nativeElement(t),this.nativeElement(e),n):null},l.prototype.removeScroll=function(t,e){return p.removeScroll(t,e)},l.prototype.restrictToView=function(t){return p.restrictToView(t)},l.prototype.scrollPosition=function(t){return p.scrollPosition(this.nativeElement(t))},l.prototype.scrollableParents=function(t){return r.scrollableParents(this.nativeElement(t))},l.prototype.stackingElementOffset=function(t){var e=this.getRelativeContextElement(t);return e?p.offset(e):null},l.prototype.stackingElementScroll=function(t){var e=this.getRelativeContextElement(t);return e?{x:e.scrollLeft,y:e.scrollTop}:{x:0,y:0}},l.prototype.getRelativeContextElement=function(t){if(!t||!r.hasRelativeStackingContext())return null;for(var e=this.nativeElement(t).parentElement;e;){if("none"!==window.getComputedStyle(e).transform)return e;e=e.parentElement}return null},l.prototype.useRelativePosition=function(t){return!!this.getRelativeContextElement(t)},l.prototype.windowViewPort=function(t){return p.getWindowViewPort(this.nativeElement(t))},l.prototype.zIndex=function(t,e){return r.zIndex(this.nativeElement(t),this.nativeElement(e))},l.prototype.zoomLevel=function(){return s.isDocumentAvailable()&&r.isWindowAvailable()&&parseFloat((document.documentElement.clientWidth/window.innerWidth).toFixed(2))||1},l.prototype.isZoomed=function(){return 1<this.zoomLevel()},o.__decorate([i.Injectable()],l));function l(){}e.DOMService=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0);e.SCALE=new o.InjectionToken("Popup Document Scale")},function(t,e){t.exports=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),c=n(0),i=n(6),r=n(18),s=n(4),a=n(17),p=n(16),l=n(15),u=n(14),f=n(2),d=n(3),h={left:-1e4,top:0},m=(v.prototype.ngOnInit=function(){this.repositionCallback=this.reposition.bind(this),this._resizeService.subscribe(this.repositionCallback),this.animationSubscriptions=this.animationService.start.subscribe(this.onAnimationStart.bind(this)),this.animationSubscriptions.add(this.animationService.end.subscribe(this.onAnimationEnd.bind(this))),this._scrollableService.forElement(this.anchor||this.container).subscribe(this.onScroll.bind(this)),this.currentOffset=h,this.setZIndex(),this.copyFontStyles(),this.updateFixedClass()},v.prototype.ngOnChanges=function(t){t.copyAnchorStyles&&this.copyFontStyles(),t.positionMode&&this.updateFixedClass()},v.prototype.ngAfterViewInit=function(){var t=this;this.reposition(),this.animate||this.resolvedPromise.then(function(){t.onAnimationEnd()})},v.prototype.ngAfterViewChecked=function(){var t=this;this._zone.runOutsideAngular(function(){t.repositionSubscription&&t.repositionSubscription.unsubscribe(),t.repositionSubscription=i.from(t.resolvedPromise).subscribe(t.repositionCallback)})},v.prototype.ngOnDestroy=function(){this.anchorViewportLeave.complete(),this.positionChange.complete(),this.close.emit(),this.close.complete(),this._resizeService.unsubscribe(),this._scrollableService.unsubscribe(),this.repositionSubscription&&this.repositionSubscription.unsubscribe(),this.animationSubscriptions.unsubscribe()},v.prototype.onAnimationStart=function(){this._renderer.removeClass(this.container.nativeElement,"k-animation-container-shown")},v.prototype.onAnimationEnd=function(){this._renderer.addClass(this.container.nativeElement,"k-animation-container-shown"),this.open.emit(),this.open.complete()},Object.defineProperty(v.prototype,"currentOffset",{get:function(){return this._currentOffset},set:function(t){this.setContainerStyle("left",t.left+"px"),this.setContainerStyle("top",t.top+"px"),this._currentOffset=t},enumerable:!0,configurable:!0}),v.prototype.setZIndex=function(){this.anchor&&this.setContainerStyle("z-index",String(this.domService.zIndex(this.anchor,this.container)))},v.prototype.reposition=function(){var t=this;if(d.isDocumentAvailable()){var e=this.position(),n=e.flip,o=e.offset;this.currentOffset&&!f.isDifferentOffset(this.currentOffset,o)||(this.currentOffset=o,d.hasObservers(this.positionChange)&&this._zone.run(function(){return t.positionChange.emit({offset:o,flip:n})})),this.animate&&this.animationService.play(this.contentContainer.nativeElement,this.animate,n)}},v.prototype.position=function(){var t=this._alignService.alignElement({anchor:this.anchor,anchorAlign:this.anchorAlign,element:this.container,elementAlign:this.popupAlign,margin:this.margin,offset:this.offset,positionMode:this.positionMode});return this._positionService.positionElement({anchor:this.anchor,anchorAlign:this.anchorAlign,collisions:this.collision,currentLocation:t,element:this.container,elementAlign:this.popupAlign,margin:this.margin})},v.prototype.onScroll=function(t){var e=this,n=d.hasObservers(this.anchorViewportLeave);t||!n?this.reposition():n&&this._zone.run(function(){e.anchorViewportLeave.emit()})},v.prototype.copyFontStyles=function(){var e=this;this.anchor&&this.copyAnchorStyles&&this.domService.getFontStyles(this.anchor).forEach(function(t){return e.setContainerStyle(t.key,t.value)})},v.prototype.updateFixedClass=function(){var t="fixed"===this.positionMode?"addClass":"removeClass";this._renderer[t](this.container.nativeElement,"k-animation-container-fixed")},v.prototype.setContainerStyle=function(t,e){this._renderer.setStyle(this.container.nativeElement,t,e)},o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"animate",void 0),o.__decorate([c.Input(),o.__metadata("design:type",c.ElementRef)],v.prototype,"anchor",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"anchorAlign",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"collision",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"popupAlign",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Boolean)],v.prototype,"copyAnchorStyles",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"popupClass",void 0),o.__decorate([c.Input(),o.__metadata("design:type",String)],v.prototype,"positionMode",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"offset",void 0),o.__decorate([c.Input(),o.__metadata("design:type",Object)],v.prototype,"margin",void 0),o.__decorate([c.Output(),o.__metadata("design:type",c.EventEmitter)],v.prototype,"anchorViewportLeave",void 0),o.__decorate([c.Output(),o.__metadata("design:type",c.EventEmitter)],v.prototype,"close",void 0),o.__decorate([c.Output(),o.__metadata("design:type",c.EventEmitter)],v.prototype,"open",void 0),o.__decorate([c.Output(),o.__metadata("design:type",c.EventEmitter)],v.prototype,"positionChange",void 0),o.__decorate([c.ViewChild("container"),o.__metadata("design:type",c.ElementRef)],v.prototype,"contentContainer",void 0),o.__decorate([c.Component({exportAs:"kendo-popup",providers:[r.AlignService,u.AnimationService,s.DOMService,a.PositionService,p.ResizeService,l.ScrollableService],selector:"kendo-popup",template:'\n        <div class="k-popup" [ngClass]="popupClass" #container>\n            <ng-content></ng-content>\n            <ng-template [ngTemplateOutlet]="content" [ngIf]="content"></ng-template>\n        </div>\n     '}),o.__metadata("design:paramtypes",[c.ElementRef,r.AlignService,s.DOMService,a.PositionService,p.ResizeService,l.ScrollableService,u.AnimationService,c.Renderer2,c.NgZone])],v));function v(t,e,n,o,i,r,s,a,p){this.container=t,this._alignService=e,this.domService=n,this._positionService=o,this._resizeService=i,this._scrollableService=r,this.animationService=s,this._renderer=a,this._zone=p,this.animate=!0,this.anchorAlign={horizontal:"left",vertical:"bottom"},this.collision={horizontal:"fit",vertical:"flip"},this.popupAlign={horizontal:"left",vertical:"top"},this.copyAnchorStyles=!1,this.positionMode="fixed",this.offset=h,this.anchorViewportLeave=new c.EventEmitter,this.close=new c.EventEmitter,this.open=new c.EventEmitter,this.positionChange=new c.EventEmitter,this.resolvedPromise=Promise.resolve(null),this._renderer.addClass(t.nativeElement,"k-animation-container"),this.updateFixedClass()}e.PopupComponent=m},function(t,e){t.exports=f},function(t,e){t.exports=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(7);e.POPUP_CONTAINER=new i.InjectionToken("Popup Container");var s=(Object.defineProperty(a.prototype,"rootViewContainer",{get:function(){var t=this.applicationRef.components||[];if(t[0])return t[0];throw new Error("\n            View Container not found! Inject the POPUP_CONTAINER or define a specific ViewContainerRef via the appendTo option.\n            See http://www.telerik.com/kendo-angular-ui/components/popup/api/POPUP_CONTAINER/ for more details.\n        ")},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"rootViewContainerNode",{get:function(){return this.container?this.container.nativeElement:this.getComponentRootNode(this.rootViewContainer)},enumerable:!0,configurable:!0}),a.prototype.open=function(t){void 0===t&&(t={});var e=this.contentFrom(t.content),n=e.component,o=e.nodes,i=this.appendPopup(o,t.appendTo),r=i.instance;this.projectComponentInputs(i,t),i.changeDetectorRef.detectChanges(),n&&n.changeDetectorRef.detectChanges();var s=this.getComponentRootNode(i);return{close:function(){var t;n?n.destroy():i.hostView.destroyed||(i.instance.content=null,i.changeDetectorRef.detectChanges()),i.destroy(),(t=s)&&t.parentNode&&t.parentNode.removeChild(t)},content:n,popup:i,popupAnchorViewportLeave:r.anchorViewportLeave,popupClose:r.close,popupElement:s,popupOpen:r.open,popupPositionChange:r.positionChange}},a.prototype.appendPopup=function(t,e){var n=this.createComponent(r.PopupComponent,t,e);return e||this.rootViewContainerNode.appendChild(this.getComponentRootNode(n)),n},a.prototype.getComponentRootNode=function(t){return t.hostView.rootNodes[0]},a.prototype.getComponentFactory=function(t){return this.componentFactoryResolver.resolveComponentFactory(t)},a.prototype.createComponent=function(t,e,n){var o=this.getComponentFactory(t);if(n)return n.createComponent(o,void 0,this.injector,e);var i=o.create(this.injector,e);return this.applicationRef.attachView(i.hostView),i},a.prototype.projectComponentInputs=function(e,n){return Object.getOwnPropertyNames(n).filter(function(t){return"content"!==t||n.content instanceof i.TemplateRef}).map(function(t){e.instance[t]=n[t]}),e},a.prototype.contentFrom=function(t){if(!t||t instanceof i.TemplateRef)return{component:null,nodes:[[]]};var e=this.createComponent(t);return{component:e,nodes:[e?[e.location.nativeElement]:[]]}},o.__decorate([i.Injectable(),o.__param(3,i.Inject(e.POPUP_CONTAINER)),o.__param(3,i.Optional()),o.__metadata("design:paramtypes",[i.ApplicationRef,i.ComponentFactoryResolver,i.Injector,i.ElementRef])],a));function a(t,e,n,o){this.applicationRef=t,this.componentFactoryResolver=e,this.injector=n,this.container=o}e.PopupService=s},function(t,e){t.exports=p},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(11),s=n(7),a=n(10),p=[s.PopupComponent],c=o.__decorate([i.NgModule({declarations:[p],entryComponents:[p],exports:[p],imports:[r.CommonModule],providers:[a.PopupService]})],l);function l(){}e.PopupModule=c},function(t,e){t.exports=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),s=n(0),a=n(13),p={expand:function(t){var e="up"===t||"down"===t?"scaleY":"scaleX";return{start:{transform:e+"(0)",transformOrigin:"down"===t?"top":"left"===t?"right":"right"===t?"left":"bottom"},end:{transform:e+"(1)"}}},slide:function(t){var e="left"===t||"right"===t?"translateX":"translateY";return{start:{transform:e+"("+("right"===t||"down"===t?-100:100)+"%)"},end:{transform:e+"(0%)"}}},fade:function(){return{start:{opacity:0},end:{opacity:1}}},zoom:function(){return{start:{transform:"scale(0)"},end:{transform:"scale(1)"}}}},i=(r.prototype.play=function(t,e,n){if(!this.flip||this.flip.horizontal!==n.horizontal||this.flip.vertical!==n.vertical){this.flip=n;var o=e.type||"slide",i=p[o];if(i){var r=i(this.getDirection(n,e));this.playStates(t,r,e)}else if(s.isDevMode())throw new Error('Unsupported animation type: "'+o+'". The supported types are slide, expand, fade and zoom.')}},r.prototype.ngOnDestroy=function(){this.stopPlayer()},r.prototype.playStates=function(t,e,n){var o=this;this.stopPlayer();var i=n.duration||100,r=this.animationBuilder.build([a.style(e.start),a.animate(i+"ms ease-in",a.style(e.end))]),s=this.player=r.create(t);s.onDone(function(){o.end.emit(),o.stopPlayer()}),this.start.emit(),s.play()},r.prototype.getDirection=function(t,e){var n=e.direction||"down";return t.horizontal&&("left"===n?n="right":"right"===n&&(n="left")),t.vertical&&("down"===n?n="up":"up"===n&&(n="down")),n},r.prototype.stopPlayer=function(){this.player&&(this.player.destroy(),this.player=null)},o.__decorate([s.Injectable(),o.__metadata("design:paramtypes",[a.AnimationBuilder])],r));function r(t){this.animationBuilder=t,this.start=new s.EventEmitter,this.end=new s.EventEmitter}e.AnimationService=i},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e(1),o=e(0),c=e(6),l=e(8),u=e(3),r=e(4),f=e(2);i.THRESHOLD_DIFF=1;var s=(a.prototype.forElement=function(t){return this.unsubscribe(),this.element=t,this},a.prototype.subscribe=function(r){var s=this;if(r&&u.isDocumentAvailable()&&this.element){var a=this._dom.nativeElement(this.element),p=this._dom.scrollableParents(this.element);this._zone.runOutsideAngular(function(){var t=p.map(function(t){return c.fromEvent(t,"scroll").pipe(l.auditTime(f.FRAME_DURATION))});s.subscription=c.merge.apply(void 0,t).subscribe(function(t){var e=t.target,n=0<p.filter(function(t){return t===e}).length,o=e===document,i=e===window;(n||o||i)&&r(s.isVisible(a,e))})})}},a.prototype.unsubscribe=function(){this.subscription&&this.subscription.unsubscribe()},a.prototype.isVisible=function(t,e){var n=this._dom.boundingOffset(t),o=this._dom.boundingOffset(e);return!(i.THRESHOLD_DIFF<o.top-n.bottom||i.THRESHOLD_DIFF<n.top-o.bottom||i.THRESHOLD_DIFF<n.left-o.right||i.THRESHOLD_DIFF<o.left-n.right)},n.__decorate([o.Injectable(),n.__metadata("design:paramtypes",[r.DOMService,o.NgZone])],a));function a(t,e){this._dom=t,this._zone=e}i.ScrollableService=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(6),s=n(8),a=n(3),p=n(2),c=n(4),l=(u.prototype.subscribe=function(t){var e=this;a.isDocumentAvailable()&&this._zone.runOutsideAngular(function(){e.subscription=r.fromEvent(e._dom.getWindow(),"resize").pipe(s.auditTime(p.FRAME_DURATION)).subscribe(function(){return t()})})},u.prototype.unsubscribe=function(){this.subscription&&this.subscription.unsubscribe()},u.prototype.isUnsubscribed=function(){return this.subscription&&this.subscription.closed},o.__decorate([i.Injectable(),o.__metadata("design:paramtypes",[c.DOMService,i.NgZone])],u));function u(t,e){this._dom=t,this._zone=e}e.ResizeService=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(4),y=n(2),s=n(5),a=(p.prototype.positionElement=function(t){var e=t.anchor,n=t.currentLocation,o=t.element,i=t.anchorAlign,r=t.elementAlign,s=t.collisions,a=t.margin,p=this._dom,c=this.scale||1,l=p.offsetAtPoint(o,n),u=y.scaleRect(l,c),f=y.scaleRect(p.offset(e),c),d=y.eitherRect(f,n),h=t.viewPort||p.windowViewPort(o);h.width=h.width/c,h.height=h.height/c;var m=p.restrictToView({anchorAlign:i,anchorRect:d,collisions:s,elementAlign:r,elementRect:u,margin:a,viewPort:h}),v=p.addOffset(n,m.offset);return{flip:m.flip,flipped:m.flipped,offset:v}},o.__decorate([i.Injectable(),o.__param(1,i.Inject(s.SCALE)),o.__param(1,i.Optional()),o.__metadata("design:paramtypes",[r.DOMService,Number])],p));function p(t,e){void 0===e&&(e=1),this._dom=t,this.scale=e}e.PositionService=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(0),r=n(4),u=n(2),s=n(5),a=(p.prototype.alignElement=function(t){var e=t.anchor,n=t.element,o=t.anchorAlign,i=t.elementAlign,r=t.margin,s=t.offset,a=t.positionMode,p=this.scale||1,c="fixed"!==a&&this._dom.hasOffsetParent(n)?this.relativeRect(e,n,s,p):this.absoluteRect(e,n,s,p),l=u.scaleRect(this._dom.offset(n),p);return this._dom.align({anchorAlign:o,anchorRect:c,elementAlign:i,elementRect:l,margin:r})},p.prototype.absoluteRect=function(t,e,n,o){var i=this.elementScrollPosition(t,e),r=u.eitherRect(this._dom.offset(t),n),s=2*o,a=this._dom.stackingElementScroll(e);1!==o&&a&&(a.x/=s,a.y/=s);var p=this._dom.stackingElementOffset(e);return 1!==o&&p&&(p.left/=s,p.top/=s),this._dom.removeScroll(this._dom.addScroll(u.removeStackingOffset(u.scaleRect(r,o),p),a),i)},p.prototype.elementScrollPosition=function(t,e){return t?{x:0,y:0}:this._dom.scrollPosition(e)},p.prototype.relativeRect=function(t,e,n,o){var i=u.eitherRect(this._dom.position(t,e,o),n);return u.scaleRect(i,o)},o.__decorate([i.Injectable(),o.__param(1,i.Inject(s.SCALE)),o.__param(1,i.Optional()),o.__metadata("design:paramtypes",[r.DOMService,Number])],p));function p(t,e){void 0===e&&(e=1),this._dom=t,this.scale=e}e.AlignService=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(10);e.PopupService=o.PopupService,e.POPUP_CONTAINER=o.POPUP_CONTAINER;var i=n(7);e.PopupComponent=i.PopupComponent;var r=n(12);e.PopupModule=r.PopupModule;var s=n(5);e.SCALE=s.SCALE,function(t){for(var e in t)a(e,t[e])}(e)}],o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=19)}}});