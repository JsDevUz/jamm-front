function t1(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const s=Object.getOwnPropertyDescriptor(r,o);s&&Object.defineProperty(e,o,s.get?s:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function n1(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var gg={exports:{}},wl={},xg={exports:{}},ve={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $i=Symbol.for("react.element"),r1=Symbol.for("react.portal"),o1=Symbol.for("react.fragment"),i1=Symbol.for("react.strict_mode"),s1=Symbol.for("react.profiler"),l1=Symbol.for("react.provider"),a1=Symbol.for("react.context"),c1=Symbol.for("react.forward_ref"),u1=Symbol.for("react.suspense"),d1=Symbol.for("react.memo"),f1=Symbol.for("react.lazy"),Ud=Symbol.iterator;function p1(e){return e===null||typeof e!="object"?null:(e=Ud&&e[Ud]||e["@@iterator"],typeof e=="function"?e:null)}var mg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yg=Object.assign,vg={};function mo(e,t,n){this.props=e,this.context=t,this.refs=vg,this.updater=n||mg}mo.prototype.isReactComponent={};mo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};mo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function kg(){}kg.prototype=mo.prototype;function pu(e,t,n){this.props=e,this.context=t,this.refs=vg,this.updater=n||mg}var hu=pu.prototype=new kg;hu.constructor=pu;yg(hu,mo.prototype);hu.isPureReactComponent=!0;var Vd=Array.isArray,wg=Object.prototype.hasOwnProperty,gu={current:null},bg={key:!0,ref:!0,__self:!0,__source:!0};function jg(e,t,n){var r,o={},s=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(s=""+t.key),t)wg.call(t,r)&&!bg.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var c=Array(a),d=0;d<a;d++)c[d]=arguments[d+2];o.children=c}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:$i,type:e,key:s,ref:l,props:o,_owner:gu.current}}function h1(e,t){return{$$typeof:$i,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function xu(e){return typeof e=="object"&&e!==null&&e.$$typeof===$i}function g1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var qd=/\/+/g;function Gl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?g1(""+e.key):t.toString(36)}function Cs(e,t,n,r,o){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case $i:case r1:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Gl(l,0):r,Vd(o)?(n="",e!=null&&(n=e.replace(qd,"$&/")+"/"),Cs(o,t,n,"",function(d){return d})):o!=null&&(xu(o)&&(o=h1(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(qd,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Vd(e))for(var a=0;a<e.length;a++){s=e[a];var c=r+Gl(s,a);l+=Cs(s,t,n,c,o)}else if(c=p1(e),typeof c=="function")for(e=c.call(e),a=0;!(s=e.next()).done;)s=s.value,c=r+Gl(s,a++),l+=Cs(s,t,n,c,o);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function qi(e,t,n){if(e==null)return e;var r=[],o=0;return Cs(e,r,"","",function(s){return t.call(n,s,o++)}),r}function x1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ht={current:null},zs={transition:null},m1={ReactCurrentDispatcher:ht,ReactCurrentBatchConfig:zs,ReactCurrentOwner:gu};function Sg(){throw Error("act(...) is not supported in production builds of React.")}ve.Children={map:qi,forEach:function(e,t,n){qi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return qi(e,function(){t++}),t},toArray:function(e){return qi(e,function(t){return t})||[]},only:function(e){if(!xu(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ve.Component=mo;ve.Fragment=o1;ve.Profiler=s1;ve.PureComponent=pu;ve.StrictMode=i1;ve.Suspense=u1;ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=m1;ve.act=Sg;ve.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=yg({},e.props),o=e.key,s=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,l=gu.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(c in t)wg.call(t,c)&&!bg.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&a!==void 0?a[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){a=Array(c);for(var d=0;d<c;d++)a[d]=arguments[d+2];r.children=a}return{$$typeof:$i,type:e.type,key:o,ref:s,props:r,_owner:l}};ve.createContext=function(e){return e={$$typeof:a1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:l1,_context:e},e.Consumer=e};ve.createElement=jg;ve.createFactory=function(e){var t=jg.bind(null,e);return t.type=e,t};ve.createRef=function(){return{current:null}};ve.forwardRef=function(e){return{$$typeof:c1,render:e}};ve.isValidElement=xu;ve.lazy=function(e){return{$$typeof:f1,_payload:{_status:-1,_result:e},_init:x1}};ve.memo=function(e,t){return{$$typeof:d1,type:e,compare:t===void 0?null:t}};ve.startTransition=function(e){var t=zs.transition;zs.transition={};try{e()}finally{zs.transition=t}};ve.unstable_act=Sg;ve.useCallback=function(e,t){return ht.current.useCallback(e,t)};ve.useContext=function(e){return ht.current.useContext(e)};ve.useDebugValue=function(){};ve.useDeferredValue=function(e){return ht.current.useDeferredValue(e)};ve.useEffect=function(e,t){return ht.current.useEffect(e,t)};ve.useId=function(){return ht.current.useId()};ve.useImperativeHandle=function(e,t,n){return ht.current.useImperativeHandle(e,t,n)};ve.useInsertionEffect=function(e,t){return ht.current.useInsertionEffect(e,t)};ve.useLayoutEffect=function(e,t){return ht.current.useLayoutEffect(e,t)};ve.useMemo=function(e,t){return ht.current.useMemo(e,t)};ve.useReducer=function(e,t,n){return ht.current.useReducer(e,t,n)};ve.useRef=function(e){return ht.current.useRef(e)};ve.useState=function(e){return ht.current.useState(e)};ve.useSyncExternalStore=function(e,t,n){return ht.current.useSyncExternalStore(e,t,n)};ve.useTransition=function(){return ht.current.useTransition()};ve.version="18.3.1";xg.exports=ve;var f=xg.exports;const Ct=n1(f),y1=t1({__proto__:null,default:Ct},[f]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v1=f,k1=Symbol.for("react.element"),w1=Symbol.for("react.fragment"),b1=Object.prototype.hasOwnProperty,j1=v1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,S1={key:!0,ref:!0,__self:!0,__source:!0};function Cg(e,t,n){var r,o={},s=null,l=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)b1.call(t,r)&&!S1.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:k1,type:e,key:s,ref:l,props:o,_owner:j1.current}}wl.Fragment=w1;wl.jsx=Cg;wl.jsxs=Cg;gg.exports=wl;var i=gg.exports,ec={},zg={exports:{}},_t={},Eg={exports:{}},_g={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,Y){var I=P.length;P.push(Y);e:for(;0<I;){var W=I-1>>>1,ie=P[W];if(0<o(ie,Y))P[W]=Y,P[I]=ie,I=W;else break e}}function n(P){return P.length===0?null:P[0]}function r(P){if(P.length===0)return null;var Y=P[0],I=P.pop();if(I!==Y){P[0]=I;e:for(var W=0,ie=P.length,T=ie>>>1;W<T;){var Q=2*(W+1)-1,ue=P[Q],ge=Q+1,ae=P[ge];if(0>o(ue,I))ge<ie&&0>o(ae,ue)?(P[W]=ae,P[ge]=I,W=ge):(P[W]=ue,P[Q]=I,W=Q);else if(ge<ie&&0>o(ae,I))P[W]=ae,P[ge]=I,W=ge;else break e}}return Y}function o(P,Y){var I=P.sortIndex-Y.sortIndex;return I!==0?I:P.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var l=Date,a=l.now();e.unstable_now=function(){return l.now()-a}}var c=[],d=[],x=1,p=null,g=3,w=!1,v=!1,b=!1,C=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(P){for(var Y=n(d);Y!==null;){if(Y.callback===null)r(d);else if(Y.startTime<=P)r(d),Y.sortIndex=Y.expirationTime,t(c,Y);else break;Y=n(d)}}function j(P){if(b=!1,y(P),!v)if(n(c)!==null)v=!0,Z(E);else{var Y=n(d);Y!==null&&H(j,Y.startTime-P)}}function E(P,Y){v=!1,b&&(b=!1,m(R),R=-1),w=!0;var I=g;try{for(y(Y),p=n(c);p!==null&&(!(p.expirationTime>Y)||P&&!S());){var W=p.callback;if(typeof W=="function"){p.callback=null,g=p.priorityLevel;var ie=W(p.expirationTime<=Y);Y=e.unstable_now(),typeof ie=="function"?p.callback=ie:p===n(c)&&r(c),y(Y)}else r(c);p=n(c)}if(p!==null)var T=!0;else{var Q=n(d);Q!==null&&H(j,Q.startTime-Y),T=!1}return T}finally{p=null,g=I,w=!1}}var k=!1,_=null,R=-1,D=5,O=-1;function S(){return!(e.unstable_now()-O<D)}function A(){if(_!==null){var P=e.unstable_now();O=P;var Y=!0;try{Y=_(!0,P)}finally{Y?ne():(k=!1,_=null)}}else k=!1}var ne;if(typeof h=="function")ne=function(){h(A)};else if(typeof MessageChannel<"u"){var N=new MessageChannel,X=N.port2;N.port1.onmessage=A,ne=function(){X.postMessage(null)}}else ne=function(){C(A,0)};function Z(P){_=P,k||(k=!0,ne())}function H(P,Y){R=C(function(){P(e.unstable_now())},Y)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){v||w||(v=!0,Z(E))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(P){switch(g){case 1:case 2:case 3:var Y=3;break;default:Y=g}var I=g;g=Y;try{return P()}finally{g=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,Y){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var I=g;g=P;try{return Y()}finally{g=I}},e.unstable_scheduleCallback=function(P,Y,I){var W=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?W+I:W):I=W,P){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=I+ie,P={id:x++,callback:Y,priorityLevel:P,startTime:I,expirationTime:ie,sortIndex:-1},I>W?(P.sortIndex=I,t(d,P),n(c)===null&&P===n(d)&&(b?(m(R),R=-1):b=!0,H(j,I-W))):(P.sortIndex=ie,t(c,P),v||w||(v=!0,Z(E))),P},e.unstable_shouldYield=S,e.unstable_wrapCallback=function(P){var Y=g;return function(){var I=g;g=Y;try{return P.apply(this,arguments)}finally{g=I}}}})(_g);Eg.exports=_g;var C1=Eg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var z1=f,Et=C1;function L(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Tg=new Set,ci={};function Sr(e,t){to(e,t),to(e+"Capture",t)}function to(e,t){for(ci[e]=t,e=0;e<t.length;e++)Tg.add(t[e])}var kn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tc=Object.prototype.hasOwnProperty,E1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Hd={},Wd={};function _1(e){return tc.call(Wd,e)?!0:tc.call(Hd,e)?!1:E1.test(e)?Wd[e]=!0:(Hd[e]=!0,!1)}function T1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function R1(e,t,n,r){if(t===null||typeof t>"u"||T1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function gt(e,t,n,r,o,s,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=l}var rt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){rt[e]=new gt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];rt[t]=new gt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){rt[e]=new gt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){rt[e]=new gt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){rt[e]=new gt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){rt[e]=new gt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){rt[e]=new gt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){rt[e]=new gt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){rt[e]=new gt(e,5,!1,e.toLowerCase(),null,!1,!1)});var mu=/[\-:]([a-z])/g;function yu(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(mu,yu);rt[t]=new gt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(mu,yu);rt[t]=new gt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(mu,yu);rt[t]=new gt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){rt[e]=new gt(e,1,!1,e.toLowerCase(),null,!1,!1)});rt.xlinkHref=new gt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){rt[e]=new gt(e,1,!1,e.toLowerCase(),null,!0,!0)});function vu(e,t,n,r){var o=rt.hasOwnProperty(t)?rt[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(R1(t,n,o,r)&&(n=null),r||o===null?_1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Sn=z1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Hi=Symbol.for("react.element"),Mr=Symbol.for("react.portal"),$r=Symbol.for("react.fragment"),ku=Symbol.for("react.strict_mode"),nc=Symbol.for("react.profiler"),Rg=Symbol.for("react.provider"),Ig=Symbol.for("react.context"),wu=Symbol.for("react.forward_ref"),rc=Symbol.for("react.suspense"),oc=Symbol.for("react.suspense_list"),bu=Symbol.for("react.memo"),Tn=Symbol.for("react.lazy"),Pg=Symbol.for("react.offscreen"),Yd=Symbol.iterator;function Co(e){return e===null||typeof e!="object"?null:(e=Yd&&e[Yd]||e["@@iterator"],typeof e=="function"?e:null)}var Ae=Object.assign,Kl;function Yo(e){if(Kl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Kl=t&&t[1]||""}return`
`+Kl+e}var Ql=!1;function Jl(e,t){if(!e||Ql)return"";Ql=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),s=r.stack.split(`
`),l=o.length-1,a=s.length-1;1<=l&&0<=a&&o[l]!==s[a];)a--;for(;1<=l&&0<=a;l--,a--)if(o[l]!==s[a]){if(l!==1||a!==1)do if(l--,a--,0>a||o[l]!==s[a]){var c=`
`+o[l].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=l&&0<=a);break}}}finally{Ql=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Yo(e):""}function I1(e){switch(e.tag){case 5:return Yo(e.type);case 16:return Yo("Lazy");case 13:return Yo("Suspense");case 19:return Yo("SuspenseList");case 0:case 2:case 15:return e=Jl(e.type,!1),e;case 11:return e=Jl(e.type.render,!1),e;case 1:return e=Jl(e.type,!0),e;default:return""}}function ic(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case $r:return"Fragment";case Mr:return"Portal";case nc:return"Profiler";case ku:return"StrictMode";case rc:return"Suspense";case oc:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ig:return(e.displayName||"Context")+".Consumer";case Rg:return(e._context.displayName||"Context")+".Provider";case wu:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case bu:return t=e.displayName||null,t!==null?t:ic(e.type)||"Memo";case Tn:t=e._payload,e=e._init;try{return ic(e(t))}catch{}}return null}function P1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ic(t);case 8:return t===ku?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Wn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Mg(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function M1(e){var t=Mg(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,s.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wi(e){e._valueTracker||(e._valueTracker=M1(e))}function $g(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Mg(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Hs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function sc(e,t){var n=t.checked;return Ae({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Gd(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Wn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ag(e,t){t=t.checked,t!=null&&vu(e,"checked",t,!1)}function lc(e,t){Ag(e,t);var n=Wn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ac(e,t.type,n):t.hasOwnProperty("defaultValue")&&ac(e,t.type,Wn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Kd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ac(e,t,n){(t!=="number"||Hs(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Go=Array.isArray;function Yr(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Wn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function cc(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(L(91));return Ae({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Qd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(L(92));if(Go(n)){if(1<n.length)throw Error(L(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Wn(n)}}function Og(e,t){var n=Wn(t.value),r=Wn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Jd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ng(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function uc(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ng(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Yi,Lg=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Yi=Yi||document.createElement("div"),Yi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Yi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ui(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Zo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$1=["Webkit","ms","Moz","O"];Object.keys(Zo).forEach(function(e){$1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Zo[t]=Zo[e]})});function Dg(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Zo.hasOwnProperty(e)&&Zo[e]?(""+t).trim():t+"px"}function Bg(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Dg(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var A1=Ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function dc(e,t){if(t){if(A1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(L(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(L(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(L(61))}if(t.style!=null&&typeof t.style!="object")throw Error(L(62))}}function fc(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pc=null;function ju(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var hc=null,Gr=null,Kr=null;function Xd(e){if(e=Ni(e)){if(typeof hc!="function")throw Error(L(280));var t=e.stateNode;t&&(t=zl(t),hc(e.stateNode,e.type,t))}}function Fg(e){Gr?Kr?Kr.push(e):Kr=[e]:Gr=e}function Ug(){if(Gr){var e=Gr,t=Kr;if(Kr=Gr=null,Xd(e),t)for(e=0;e<t.length;e++)Xd(t[e])}}function Vg(e,t){return e(t)}function qg(){}var Xl=!1;function Hg(e,t,n){if(Xl)return e(t,n);Xl=!0;try{return Vg(e,t,n)}finally{Xl=!1,(Gr!==null||Kr!==null)&&(qg(),Ug())}}function di(e,t){var n=e.stateNode;if(n===null)return null;var r=zl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(L(231,t,typeof n));return n}var gc=!1;if(kn)try{var zo={};Object.defineProperty(zo,"passive",{get:function(){gc=!0}}),window.addEventListener("test",zo,zo),window.removeEventListener("test",zo,zo)}catch{gc=!1}function O1(e,t,n,r,o,s,l,a,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(x){this.onError(x)}}var ei=!1,Ws=null,Ys=!1,xc=null,N1={onError:function(e){ei=!0,Ws=e}};function L1(e,t,n,r,o,s,l,a,c){ei=!1,Ws=null,O1.apply(N1,arguments)}function D1(e,t,n,r,o,s,l,a,c){if(L1.apply(this,arguments),ei){if(ei){var d=Ws;ei=!1,Ws=null}else throw Error(L(198));Ys||(Ys=!0,xc=d)}}function Cr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Wg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Zd(e){if(Cr(e)!==e)throw Error(L(188))}function B1(e){var t=e.alternate;if(!t){if(t=Cr(e),t===null)throw Error(L(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var s=o.alternate;if(s===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===s.child){for(s=o.child;s;){if(s===n)return Zd(o),e;if(s===r)return Zd(o),t;s=s.sibling}throw Error(L(188))}if(n.return!==r.return)n=o,r=s;else{for(var l=!1,a=o.child;a;){if(a===n){l=!0,n=o,r=s;break}if(a===r){l=!0,r=o,n=s;break}a=a.sibling}if(!l){for(a=s.child;a;){if(a===n){l=!0,n=s,r=o;break}if(a===r){l=!0,r=s,n=o;break}a=a.sibling}if(!l)throw Error(L(189))}}if(n.alternate!==r)throw Error(L(190))}if(n.tag!==3)throw Error(L(188));return n.stateNode.current===n?e:t}function Yg(e){return e=B1(e),e!==null?Gg(e):null}function Gg(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Gg(e);if(t!==null)return t;e=e.sibling}return null}var Kg=Et.unstable_scheduleCallback,ef=Et.unstable_cancelCallback,F1=Et.unstable_shouldYield,U1=Et.unstable_requestPaint,De=Et.unstable_now,V1=Et.unstable_getCurrentPriorityLevel,Su=Et.unstable_ImmediatePriority,Qg=Et.unstable_UserBlockingPriority,Gs=Et.unstable_NormalPriority,q1=Et.unstable_LowPriority,Jg=Et.unstable_IdlePriority,bl=null,sn=null;function H1(e){if(sn&&typeof sn.onCommitFiberRoot=="function")try{sn.onCommitFiberRoot(bl,e,void 0,(e.current.flags&128)===128)}catch{}}var Qt=Math.clz32?Math.clz32:G1,W1=Math.log,Y1=Math.LN2;function G1(e){return e>>>=0,e===0?32:31-(W1(e)/Y1|0)|0}var Gi=64,Ki=4194304;function Ko(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ks(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,s=e.pingedLanes,l=n&268435455;if(l!==0){var a=l&~o;a!==0?r=Ko(a):(s&=l,s!==0&&(r=Ko(s)))}else l=n&~o,l!==0?r=Ko(l):s!==0&&(r=Ko(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,s=t&-t,o>=s||o===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qt(t),o=1<<n,r|=e[n],t&=~o;return r}function K1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Q1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Qt(s),a=1<<l,c=o[l];c===-1?(!(a&n)||a&r)&&(o[l]=K1(a,t)):c<=t&&(e.expiredLanes|=a),s&=~a}}function mc(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Xg(){var e=Gi;return Gi<<=1,!(Gi&4194240)&&(Gi=64),e}function Zl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ai(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qt(t),e[t]=n}function J1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Qt(n),s=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~s}}function Cu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Ce=0;function Zg(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ex,zu,tx,nx,rx,yc=!1,Qi=[],On=null,Nn=null,Ln=null,fi=new Map,pi=new Map,In=[],X1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function tf(e,t){switch(e){case"focusin":case"focusout":On=null;break;case"dragenter":case"dragleave":Nn=null;break;case"mouseover":case"mouseout":Ln=null;break;case"pointerover":case"pointerout":fi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":pi.delete(t.pointerId)}}function Eo(e,t,n,r,o,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[o]},t!==null&&(t=Ni(t),t!==null&&zu(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Z1(e,t,n,r,o){switch(t){case"focusin":return On=Eo(On,e,t,n,r,o),!0;case"dragenter":return Nn=Eo(Nn,e,t,n,r,o),!0;case"mouseover":return Ln=Eo(Ln,e,t,n,r,o),!0;case"pointerover":var s=o.pointerId;return fi.set(s,Eo(fi.get(s)||null,e,t,n,r,o)),!0;case"gotpointercapture":return s=o.pointerId,pi.set(s,Eo(pi.get(s)||null,e,t,n,r,o)),!0}return!1}function ox(e){var t=sr(e.target);if(t!==null){var n=Cr(t);if(n!==null){if(t=n.tag,t===13){if(t=Wg(n),t!==null){e.blockedOn=t,rx(e.priority,function(){tx(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Es(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=vc(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);pc=r,n.target.dispatchEvent(r),pc=null}else return t=Ni(n),t!==null&&zu(t),e.blockedOn=n,!1;t.shift()}return!0}function nf(e,t,n){Es(e)&&n.delete(t)}function ey(){yc=!1,On!==null&&Es(On)&&(On=null),Nn!==null&&Es(Nn)&&(Nn=null),Ln!==null&&Es(Ln)&&(Ln=null),fi.forEach(nf),pi.forEach(nf)}function _o(e,t){e.blockedOn===t&&(e.blockedOn=null,yc||(yc=!0,Et.unstable_scheduleCallback(Et.unstable_NormalPriority,ey)))}function hi(e){function t(o){return _o(o,e)}if(0<Qi.length){_o(Qi[0],e);for(var n=1;n<Qi.length;n++){var r=Qi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(On!==null&&_o(On,e),Nn!==null&&_o(Nn,e),Ln!==null&&_o(Ln,e),fi.forEach(t),pi.forEach(t),n=0;n<In.length;n++)r=In[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<In.length&&(n=In[0],n.blockedOn===null);)ox(n),n.blockedOn===null&&In.shift()}var Qr=Sn.ReactCurrentBatchConfig,Qs=!0;function ty(e,t,n,r){var o=Ce,s=Qr.transition;Qr.transition=null;try{Ce=1,Eu(e,t,n,r)}finally{Ce=o,Qr.transition=s}}function ny(e,t,n,r){var o=Ce,s=Qr.transition;Qr.transition=null;try{Ce=4,Eu(e,t,n,r)}finally{Ce=o,Qr.transition=s}}function Eu(e,t,n,r){if(Qs){var o=vc(e,t,n,r);if(o===null)ca(e,t,r,Js,n),tf(e,r);else if(Z1(o,e,t,n,r))r.stopPropagation();else if(tf(e,r),t&4&&-1<X1.indexOf(e)){for(;o!==null;){var s=Ni(o);if(s!==null&&ex(s),s=vc(e,t,n,r),s===null&&ca(e,t,r,Js,n),s===o)break;o=s}o!==null&&r.stopPropagation()}else ca(e,t,r,null,n)}}var Js=null;function vc(e,t,n,r){if(Js=null,e=ju(r),e=sr(e),e!==null)if(t=Cr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Wg(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Js=e,null}function ix(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(V1()){case Su:return 1;case Qg:return 4;case Gs:case q1:return 16;case Jg:return 536870912;default:return 16}default:return 16}}var Mn=null,_u=null,_s=null;function sx(){if(_s)return _s;var e,t=_u,n=t.length,r,o="value"in Mn?Mn.value:Mn.textContent,s=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[s-r];r++);return _s=o.slice(e,1<r?1-r:void 0)}function Ts(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ji(){return!0}function rf(){return!1}function Tt(e){function t(n,r,o,s,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=s,this.target=l,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ji:rf,this.isPropagationStopped=rf,this}return Ae(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ji)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ji)},persist:function(){},isPersistent:Ji}),t}var yo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tu=Tt(yo),Oi=Ae({},yo,{view:0,detail:0}),ry=Tt(Oi),ea,ta,To,jl=Ae({},Oi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ru,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==To&&(To&&e.type==="mousemove"?(ea=e.screenX-To.screenX,ta=e.screenY-To.screenY):ta=ea=0,To=e),ea)},movementY:function(e){return"movementY"in e?e.movementY:ta}}),of=Tt(jl),oy=Ae({},jl,{dataTransfer:0}),iy=Tt(oy),sy=Ae({},Oi,{relatedTarget:0}),na=Tt(sy),ly=Ae({},yo,{animationName:0,elapsedTime:0,pseudoElement:0}),ay=Tt(ly),cy=Ae({},yo,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),uy=Tt(cy),dy=Ae({},yo,{data:0}),sf=Tt(dy),fy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},py={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=hy[e])?!!t[e]:!1}function Ru(){return gy}var xy=Ae({},Oi,{key:function(e){if(e.key){var t=fy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ts(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?py[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ru,charCode:function(e){return e.type==="keypress"?Ts(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ts(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),my=Tt(xy),yy=Ae({},jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lf=Tt(yy),vy=Ae({},Oi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ru}),ky=Tt(vy),wy=Ae({},yo,{propertyName:0,elapsedTime:0,pseudoElement:0}),by=Tt(wy),jy=Ae({},jl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Sy=Tt(jy),Cy=[9,13,27,32],Iu=kn&&"CompositionEvent"in window,ti=null;kn&&"documentMode"in document&&(ti=document.documentMode);var zy=kn&&"TextEvent"in window&&!ti,lx=kn&&(!Iu||ti&&8<ti&&11>=ti),af=" ",cf=!1;function ax(e,t){switch(e){case"keyup":return Cy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ar=!1;function Ey(e,t){switch(e){case"compositionend":return cx(t);case"keypress":return t.which!==32?null:(cf=!0,af);case"textInput":return e=t.data,e===af&&cf?null:e;default:return null}}function _y(e,t){if(Ar)return e==="compositionend"||!Iu&&ax(e,t)?(e=sx(),_s=_u=Mn=null,Ar=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return lx&&t.locale!=="ko"?null:t.data;default:return null}}var Ty={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function uf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ty[e.type]:t==="textarea"}function ux(e,t,n,r){Fg(r),t=Xs(t,"onChange"),0<t.length&&(n=new Tu("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ni=null,gi=null;function Ry(e){wx(e,0)}function Sl(e){var t=Lr(e);if($g(t))return e}function Iy(e,t){if(e==="change")return t}var dx=!1;if(kn){var ra;if(kn){var oa="oninput"in document;if(!oa){var df=document.createElement("div");df.setAttribute("oninput","return;"),oa=typeof df.oninput=="function"}ra=oa}else ra=!1;dx=ra&&(!document.documentMode||9<document.documentMode)}function ff(){ni&&(ni.detachEvent("onpropertychange",fx),gi=ni=null)}function fx(e){if(e.propertyName==="value"&&Sl(gi)){var t=[];ux(t,gi,e,ju(e)),Hg(Ry,t)}}function Py(e,t,n){e==="focusin"?(ff(),ni=t,gi=n,ni.attachEvent("onpropertychange",fx)):e==="focusout"&&ff()}function My(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Sl(gi)}function $y(e,t){if(e==="click")return Sl(t)}function Ay(e,t){if(e==="input"||e==="change")return Sl(t)}function Oy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Zt=typeof Object.is=="function"?Object.is:Oy;function xi(e,t){if(Zt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!tc.call(t,o)||!Zt(e[o],t[o]))return!1}return!0}function pf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hf(e,t){var n=pf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=pf(n)}}function px(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?px(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function hx(){for(var e=window,t=Hs();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Hs(e.document)}return t}function Pu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ny(e){var t=hx(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&px(n.ownerDocument.documentElement,n)){if(r!==null&&Pu(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,s=Math.min(r.start,o);r=r.end===void 0?s:Math.min(r.end,o),!e.extend&&s>r&&(o=r,r=s,s=o),o=hf(n,s);var l=hf(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ly=kn&&"documentMode"in document&&11>=document.documentMode,Or=null,kc=null,ri=null,wc=!1;function gf(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wc||Or==null||Or!==Hs(r)||(r=Or,"selectionStart"in r&&Pu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ri&&xi(ri,r)||(ri=r,r=Xs(kc,"onSelect"),0<r.length&&(t=new Tu("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Or)))}function Xi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Nr={animationend:Xi("Animation","AnimationEnd"),animationiteration:Xi("Animation","AnimationIteration"),animationstart:Xi("Animation","AnimationStart"),transitionend:Xi("Transition","TransitionEnd")},ia={},gx={};kn&&(gx=document.createElement("div").style,"AnimationEvent"in window||(delete Nr.animationend.animation,delete Nr.animationiteration.animation,delete Nr.animationstart.animation),"TransitionEvent"in window||delete Nr.transitionend.transition);function Cl(e){if(ia[e])return ia[e];if(!Nr[e])return e;var t=Nr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in gx)return ia[e]=t[n];return e}var xx=Cl("animationend"),mx=Cl("animationiteration"),yx=Cl("animationstart"),vx=Cl("transitionend"),kx=new Map,xf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Gn(e,t){kx.set(e,t),Sr(t,[e])}for(var sa=0;sa<xf.length;sa++){var la=xf[sa],Dy=la.toLowerCase(),By=la[0].toUpperCase()+la.slice(1);Gn(Dy,"on"+By)}Gn(xx,"onAnimationEnd");Gn(mx,"onAnimationIteration");Gn(yx,"onAnimationStart");Gn("dblclick","onDoubleClick");Gn("focusin","onFocus");Gn("focusout","onBlur");Gn(vx,"onTransitionEnd");to("onMouseEnter",["mouseout","mouseover"]);to("onMouseLeave",["mouseout","mouseover"]);to("onPointerEnter",["pointerout","pointerover"]);to("onPointerLeave",["pointerout","pointerover"]);Sr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Sr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Sr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Sr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Sr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Sr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qo));function mf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,D1(r,t,void 0,e),e.currentTarget=null}function wx(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var l=r.length-1;0<=l;l--){var a=r[l],c=a.instance,d=a.currentTarget;if(a=a.listener,c!==s&&o.isPropagationStopped())break e;mf(o,a,d),s=c}else for(l=0;l<r.length;l++){if(a=r[l],c=a.instance,d=a.currentTarget,a=a.listener,c!==s&&o.isPropagationStopped())break e;mf(o,a,d),s=c}}}if(Ys)throw e=xc,Ys=!1,xc=null,e}function Te(e,t){var n=t[zc];n===void 0&&(n=t[zc]=new Set);var r=e+"__bubble";n.has(r)||(bx(t,e,2,!1),n.add(r))}function aa(e,t,n){var r=0;t&&(r|=4),bx(n,e,r,t)}var Zi="_reactListening"+Math.random().toString(36).slice(2);function mi(e){if(!e[Zi]){e[Zi]=!0,Tg.forEach(function(n){n!=="selectionchange"&&(Fy.has(n)||aa(n,!1,e),aa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Zi]||(t[Zi]=!0,aa("selectionchange",!1,t))}}function bx(e,t,n,r){switch(ix(t)){case 1:var o=ty;break;case 4:o=ny;break;default:o=Eu}n=o.bind(null,t,n,e),o=void 0,!gc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function ca(e,t,n,r,o){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var c=l.tag;if((c===3||c===4)&&(c=l.stateNode.containerInfo,c===o||c.nodeType===8&&c.parentNode===o))return;l=l.return}for(;a!==null;){if(l=sr(a),l===null)return;if(c=l.tag,c===5||c===6){r=s=l;continue e}a=a.parentNode}}r=r.return}Hg(function(){var d=s,x=ju(n),p=[];e:{var g=kx.get(e);if(g!==void 0){var w=Tu,v=e;switch(e){case"keypress":if(Ts(n)===0)break e;case"keydown":case"keyup":w=my;break;case"focusin":v="focus",w=na;break;case"focusout":v="blur",w=na;break;case"beforeblur":case"afterblur":w=na;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=of;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=iy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=ky;break;case xx:case mx:case yx:w=ay;break;case vx:w=by;break;case"scroll":w=ry;break;case"wheel":w=Sy;break;case"copy":case"cut":case"paste":w=uy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=lf}var b=(t&4)!==0,C=!b&&e==="scroll",m=b?g!==null?g+"Capture":null:g;b=[];for(var h=d,y;h!==null;){y=h;var j=y.stateNode;if(y.tag===5&&j!==null&&(y=j,m!==null&&(j=di(h,m),j!=null&&b.push(yi(h,j,y)))),C)break;h=h.return}0<b.length&&(g=new w(g,v,null,n,x),p.push({event:g,listeners:b}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",g&&n!==pc&&(v=n.relatedTarget||n.fromElement)&&(sr(v)||v[wn]))break e;if((w||g)&&(g=x.window===x?x:(g=x.ownerDocument)?g.defaultView||g.parentWindow:window,w?(v=n.relatedTarget||n.toElement,w=d,v=v?sr(v):null,v!==null&&(C=Cr(v),v!==C||v.tag!==5&&v.tag!==6)&&(v=null)):(w=null,v=d),w!==v)){if(b=of,j="onMouseLeave",m="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(b=lf,j="onPointerLeave",m="onPointerEnter",h="pointer"),C=w==null?g:Lr(w),y=v==null?g:Lr(v),g=new b(j,h+"leave",w,n,x),g.target=C,g.relatedTarget=y,j=null,sr(x)===d&&(b=new b(m,h+"enter",v,n,x),b.target=y,b.relatedTarget=C,j=b),C=j,w&&v)t:{for(b=w,m=v,h=0,y=b;y;y=_r(y))h++;for(y=0,j=m;j;j=_r(j))y++;for(;0<h-y;)b=_r(b),h--;for(;0<y-h;)m=_r(m),y--;for(;h--;){if(b===m||m!==null&&b===m.alternate)break t;b=_r(b),m=_r(m)}b=null}else b=null;w!==null&&yf(p,g,w,b,!1),v!==null&&C!==null&&yf(p,C,v,b,!0)}}e:{if(g=d?Lr(d):window,w=g.nodeName&&g.nodeName.toLowerCase(),w==="select"||w==="input"&&g.type==="file")var E=Iy;else if(uf(g))if(dx)E=Ay;else{E=My;var k=Py}else(w=g.nodeName)&&w.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(E=$y);if(E&&(E=E(e,d))){ux(p,E,n,x);break e}k&&k(e,g,d),e==="focusout"&&(k=g._wrapperState)&&k.controlled&&g.type==="number"&&ac(g,"number",g.value)}switch(k=d?Lr(d):window,e){case"focusin":(uf(k)||k.contentEditable==="true")&&(Or=k,kc=d,ri=null);break;case"focusout":ri=kc=Or=null;break;case"mousedown":wc=!0;break;case"contextmenu":case"mouseup":case"dragend":wc=!1,gf(p,n,x);break;case"selectionchange":if(Ly)break;case"keydown":case"keyup":gf(p,n,x)}var _;if(Iu)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Ar?ax(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(lx&&n.locale!=="ko"&&(Ar||R!=="onCompositionStart"?R==="onCompositionEnd"&&Ar&&(_=sx()):(Mn=x,_u="value"in Mn?Mn.value:Mn.textContent,Ar=!0)),k=Xs(d,R),0<k.length&&(R=new sf(R,e,null,n,x),p.push({event:R,listeners:k}),_?R.data=_:(_=cx(n),_!==null&&(R.data=_)))),(_=zy?Ey(e,n):_y(e,n))&&(d=Xs(d,"onBeforeInput"),0<d.length&&(x=new sf("onBeforeInput","beforeinput",null,n,x),p.push({event:x,listeners:d}),x.data=_))}wx(p,t)})}function yi(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Xs(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,s=o.stateNode;o.tag===5&&s!==null&&(o=s,s=di(e,n),s!=null&&r.unshift(yi(e,s,o)),s=di(e,t),s!=null&&r.push(yi(e,s,o))),e=e.return}return r}function _r(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function yf(e,t,n,r,o){for(var s=t._reactName,l=[];n!==null&&n!==r;){var a=n,c=a.alternate,d=a.stateNode;if(c!==null&&c===r)break;a.tag===5&&d!==null&&(a=d,o?(c=di(n,s),c!=null&&l.unshift(yi(n,c,a))):o||(c=di(n,s),c!=null&&l.push(yi(n,c,a)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Uy=/\r\n?/g,Vy=/\u0000|\uFFFD/g;function vf(e){return(typeof e=="string"?e:""+e).replace(Uy,`
`).replace(Vy,"")}function es(e,t,n){if(t=vf(t),vf(e)!==t&&n)throw Error(L(425))}function Zs(){}var bc=null,jc=null;function Sc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cc=typeof setTimeout=="function"?setTimeout:void 0,qy=typeof clearTimeout=="function"?clearTimeout:void 0,kf=typeof Promise=="function"?Promise:void 0,Hy=typeof queueMicrotask=="function"?queueMicrotask:typeof kf<"u"?function(e){return kf.resolve(null).then(e).catch(Wy)}:Cc;function Wy(e){setTimeout(function(){throw e})}function ua(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),hi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);hi(t)}function Dn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function wf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var vo=Math.random().toString(36).slice(2),on="__reactFiber$"+vo,vi="__reactProps$"+vo,wn="__reactContainer$"+vo,zc="__reactEvents$"+vo,Yy="__reactListeners$"+vo,Gy="__reactHandles$"+vo;function sr(e){var t=e[on];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wn]||n[on]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=wf(e);e!==null;){if(n=e[on])return n;e=wf(e)}return t}e=n,n=e.parentNode}return null}function Ni(e){return e=e[on]||e[wn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Lr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(L(33))}function zl(e){return e[vi]||null}var Ec=[],Dr=-1;function Kn(e){return{current:e}}function Ie(e){0>Dr||(e.current=Ec[Dr],Ec[Dr]=null,Dr--)}function Ee(e,t){Dr++,Ec[Dr]=e.current,e.current=t}var Yn={},ut=Kn(Yn),vt=Kn(!1),yr=Yn;function no(e,t){var n=e.type.contextTypes;if(!n)return Yn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},s;for(s in n)o[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function kt(e){return e=e.childContextTypes,e!=null}function el(){Ie(vt),Ie(ut)}function bf(e,t,n){if(ut.current!==Yn)throw Error(L(168));Ee(ut,t),Ee(vt,n)}function jx(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(L(108,P1(e)||"Unknown",o));return Ae({},n,r)}function tl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Yn,yr=ut.current,Ee(ut,e),Ee(vt,vt.current),!0}function jf(e,t,n){var r=e.stateNode;if(!r)throw Error(L(169));n?(e=jx(e,t,yr),r.__reactInternalMemoizedMergedChildContext=e,Ie(vt),Ie(ut),Ee(ut,e)):Ie(vt),Ee(vt,n)}var gn=null,El=!1,da=!1;function Sx(e){gn===null?gn=[e]:gn.push(e)}function Ky(e){El=!0,Sx(e)}function Qn(){if(!da&&gn!==null){da=!0;var e=0,t=Ce;try{var n=gn;for(Ce=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}gn=null,El=!1}catch(o){throw gn!==null&&(gn=gn.slice(e+1)),Kg(Su,Qn),o}finally{Ce=t,da=!1}}return null}var Br=[],Fr=0,nl=null,rl=0,Pt=[],Mt=0,vr=null,xn=1,mn="";function rr(e,t){Br[Fr++]=rl,Br[Fr++]=nl,nl=e,rl=t}function Cx(e,t,n){Pt[Mt++]=xn,Pt[Mt++]=mn,Pt[Mt++]=vr,vr=e;var r=xn;e=mn;var o=32-Qt(r)-1;r&=~(1<<o),n+=1;var s=32-Qt(t)+o;if(30<s){var l=o-o%5;s=(r&(1<<l)-1).toString(32),r>>=l,o-=l,xn=1<<32-Qt(t)+o|n<<o|r,mn=s+e}else xn=1<<s|n<<o|r,mn=e}function Mu(e){e.return!==null&&(rr(e,1),Cx(e,1,0))}function $u(e){for(;e===nl;)nl=Br[--Fr],Br[Fr]=null,rl=Br[--Fr],Br[Fr]=null;for(;e===vr;)vr=Pt[--Mt],Pt[Mt]=null,mn=Pt[--Mt],Pt[Mt]=null,xn=Pt[--Mt],Pt[Mt]=null}var zt=null,St=null,Pe=!1,Kt=null;function zx(e,t){var n=At(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Sf(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,zt=e,St=Dn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,zt=e,St=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=vr!==null?{id:xn,overflow:mn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=At(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,zt=e,St=null,!0):!1;default:return!1}}function _c(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Tc(e){if(Pe){var t=St;if(t){var n=t;if(!Sf(e,t)){if(_c(e))throw Error(L(418));t=Dn(n.nextSibling);var r=zt;t&&Sf(e,t)?zx(r,n):(e.flags=e.flags&-4097|2,Pe=!1,zt=e)}}else{if(_c(e))throw Error(L(418));e.flags=e.flags&-4097|2,Pe=!1,zt=e}}}function Cf(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;zt=e}function ts(e){if(e!==zt)return!1;if(!Pe)return Cf(e),Pe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Sc(e.type,e.memoizedProps)),t&&(t=St)){if(_c(e))throw Ex(),Error(L(418));for(;t;)zx(e,t),t=Dn(t.nextSibling)}if(Cf(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){St=Dn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}St=null}}else St=zt?Dn(e.stateNode.nextSibling):null;return!0}function Ex(){for(var e=St;e;)e=Dn(e.nextSibling)}function ro(){St=zt=null,Pe=!1}function Au(e){Kt===null?Kt=[e]:Kt.push(e)}var Qy=Sn.ReactCurrentBatchConfig;function Ro(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(L(309));var r=n.stateNode}if(!r)throw Error(L(147,e));var o=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(l){var a=o.refs;l===null?delete a[s]:a[s]=l},t._stringRef=s,t)}if(typeof e!="string")throw Error(L(284));if(!n._owner)throw Error(L(290,e))}return e}function ns(e,t){throw e=Object.prototype.toString.call(t),Error(L(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function zf(e){var t=e._init;return t(e._payload)}function _x(e){function t(m,h){if(e){var y=m.deletions;y===null?(m.deletions=[h],m.flags|=16):y.push(h)}}function n(m,h){if(!e)return null;for(;h!==null;)t(m,h),h=h.sibling;return null}function r(m,h){for(m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function o(m,h){return m=Vn(m,h),m.index=0,m.sibling=null,m}function s(m,h,y){return m.index=y,e?(y=m.alternate,y!==null?(y=y.index,y<h?(m.flags|=2,h):y):(m.flags|=2,h)):(m.flags|=1048576,h)}function l(m){return e&&m.alternate===null&&(m.flags|=2),m}function a(m,h,y,j){return h===null||h.tag!==6?(h=ya(y,m.mode,j),h.return=m,h):(h=o(h,y),h.return=m,h)}function c(m,h,y,j){var E=y.type;return E===$r?x(m,h,y.props.children,j,y.key):h!==null&&(h.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Tn&&zf(E)===h.type)?(j=o(h,y.props),j.ref=Ro(m,h,y),j.return=m,j):(j=Os(y.type,y.key,y.props,null,m.mode,j),j.ref=Ro(m,h,y),j.return=m,j)}function d(m,h,y,j){return h===null||h.tag!==4||h.stateNode.containerInfo!==y.containerInfo||h.stateNode.implementation!==y.implementation?(h=va(y,m.mode,j),h.return=m,h):(h=o(h,y.children||[]),h.return=m,h)}function x(m,h,y,j,E){return h===null||h.tag!==7?(h=fr(y,m.mode,j,E),h.return=m,h):(h=o(h,y),h.return=m,h)}function p(m,h,y){if(typeof h=="string"&&h!==""||typeof h=="number")return h=ya(""+h,m.mode,y),h.return=m,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Hi:return y=Os(h.type,h.key,h.props,null,m.mode,y),y.ref=Ro(m,null,h),y.return=m,y;case Mr:return h=va(h,m.mode,y),h.return=m,h;case Tn:var j=h._init;return p(m,j(h._payload),y)}if(Go(h)||Co(h))return h=fr(h,m.mode,y,null),h.return=m,h;ns(m,h)}return null}function g(m,h,y,j){var E=h!==null?h.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return E!==null?null:a(m,h,""+y,j);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Hi:return y.key===E?c(m,h,y,j):null;case Mr:return y.key===E?d(m,h,y,j):null;case Tn:return E=y._init,g(m,h,E(y._payload),j)}if(Go(y)||Co(y))return E!==null?null:x(m,h,y,j,null);ns(m,y)}return null}function w(m,h,y,j,E){if(typeof j=="string"&&j!==""||typeof j=="number")return m=m.get(y)||null,a(h,m,""+j,E);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case Hi:return m=m.get(j.key===null?y:j.key)||null,c(h,m,j,E);case Mr:return m=m.get(j.key===null?y:j.key)||null,d(h,m,j,E);case Tn:var k=j._init;return w(m,h,y,k(j._payload),E)}if(Go(j)||Co(j))return m=m.get(y)||null,x(h,m,j,E,null);ns(h,j)}return null}function v(m,h,y,j){for(var E=null,k=null,_=h,R=h=0,D=null;_!==null&&R<y.length;R++){_.index>R?(D=_,_=null):D=_.sibling;var O=g(m,_,y[R],j);if(O===null){_===null&&(_=D);break}e&&_&&O.alternate===null&&t(m,_),h=s(O,h,R),k===null?E=O:k.sibling=O,k=O,_=D}if(R===y.length)return n(m,_),Pe&&rr(m,R),E;if(_===null){for(;R<y.length;R++)_=p(m,y[R],j),_!==null&&(h=s(_,h,R),k===null?E=_:k.sibling=_,k=_);return Pe&&rr(m,R),E}for(_=r(m,_);R<y.length;R++)D=w(_,m,R,y[R],j),D!==null&&(e&&D.alternate!==null&&_.delete(D.key===null?R:D.key),h=s(D,h,R),k===null?E=D:k.sibling=D,k=D);return e&&_.forEach(function(S){return t(m,S)}),Pe&&rr(m,R),E}function b(m,h,y,j){var E=Co(y);if(typeof E!="function")throw Error(L(150));if(y=E.call(y),y==null)throw Error(L(151));for(var k=E=null,_=h,R=h=0,D=null,O=y.next();_!==null&&!O.done;R++,O=y.next()){_.index>R?(D=_,_=null):D=_.sibling;var S=g(m,_,O.value,j);if(S===null){_===null&&(_=D);break}e&&_&&S.alternate===null&&t(m,_),h=s(S,h,R),k===null?E=S:k.sibling=S,k=S,_=D}if(O.done)return n(m,_),Pe&&rr(m,R),E;if(_===null){for(;!O.done;R++,O=y.next())O=p(m,O.value,j),O!==null&&(h=s(O,h,R),k===null?E=O:k.sibling=O,k=O);return Pe&&rr(m,R),E}for(_=r(m,_);!O.done;R++,O=y.next())O=w(_,m,R,O.value,j),O!==null&&(e&&O.alternate!==null&&_.delete(O.key===null?R:O.key),h=s(O,h,R),k===null?E=O:k.sibling=O,k=O);return e&&_.forEach(function(A){return t(m,A)}),Pe&&rr(m,R),E}function C(m,h,y,j){if(typeof y=="object"&&y!==null&&y.type===$r&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Hi:e:{for(var E=y.key,k=h;k!==null;){if(k.key===E){if(E=y.type,E===$r){if(k.tag===7){n(m,k.sibling),h=o(k,y.props.children),h.return=m,m=h;break e}}else if(k.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Tn&&zf(E)===k.type){n(m,k.sibling),h=o(k,y.props),h.ref=Ro(m,k,y),h.return=m,m=h;break e}n(m,k);break}else t(m,k);k=k.sibling}y.type===$r?(h=fr(y.props.children,m.mode,j,y.key),h.return=m,m=h):(j=Os(y.type,y.key,y.props,null,m.mode,j),j.ref=Ro(m,h,y),j.return=m,m=j)}return l(m);case Mr:e:{for(k=y.key;h!==null;){if(h.key===k)if(h.tag===4&&h.stateNode.containerInfo===y.containerInfo&&h.stateNode.implementation===y.implementation){n(m,h.sibling),h=o(h,y.children||[]),h.return=m,m=h;break e}else{n(m,h);break}else t(m,h);h=h.sibling}h=va(y,m.mode,j),h.return=m,m=h}return l(m);case Tn:return k=y._init,C(m,h,k(y._payload),j)}if(Go(y))return v(m,h,y,j);if(Co(y))return b(m,h,y,j);ns(m,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,h!==null&&h.tag===6?(n(m,h.sibling),h=o(h,y),h.return=m,m=h):(n(m,h),h=ya(y,m.mode,j),h.return=m,m=h),l(m)):n(m,h)}return C}var oo=_x(!0),Tx=_x(!1),ol=Kn(null),il=null,Ur=null,Ou=null;function Nu(){Ou=Ur=il=null}function Lu(e){var t=ol.current;Ie(ol),e._currentValue=t}function Rc(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Jr(e,t){il=e,Ou=Ur=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(mt=!0),e.firstContext=null)}function Nt(e){var t=e._currentValue;if(Ou!==e)if(e={context:e,memoizedValue:t,next:null},Ur===null){if(il===null)throw Error(L(308));Ur=e,il.dependencies={lanes:0,firstContext:e}}else Ur=Ur.next=e;return t}var lr=null;function Du(e){lr===null?lr=[e]:lr.push(e)}function Rx(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Du(t)):(n.next=o.next,o.next=n),t.interleaved=n,bn(e,r)}function bn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Rn=!1;function Bu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ix(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function vn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Bn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,be&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,bn(e,n)}return o=r.interleaved,o===null?(t.next=t,Du(r)):(t.next=o.next,o.next=t),r.interleaved=t,bn(e,n)}function Rs(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Cu(e,n)}}function Ef(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?o=s=l:s=s.next=l,n=n.next}while(n!==null);s===null?o=s=t:s=s.next=t}else o=s=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function sl(e,t,n,r){var o=e.updateQueue;Rn=!1;var s=o.firstBaseUpdate,l=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var c=a,d=c.next;c.next=null,l===null?s=d:l.next=d,l=c;var x=e.alternate;x!==null&&(x=x.updateQueue,a=x.lastBaseUpdate,a!==l&&(a===null?x.firstBaseUpdate=d:a.next=d,x.lastBaseUpdate=c))}if(s!==null){var p=o.baseState;l=0,x=d=c=null,a=s;do{var g=a.lane,w=a.eventTime;if((r&g)===g){x!==null&&(x=x.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=e,b=a;switch(g=t,w=n,b.tag){case 1:if(v=b.payload,typeof v=="function"){p=v.call(w,p,g);break e}p=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=b.payload,g=typeof v=="function"?v.call(w,p,g):v,g==null)break e;p=Ae({},p,g);break e;case 2:Rn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[a]:g.push(a))}else w={eventTime:w,lane:g,tag:a.tag,payload:a.payload,callback:a.callback,next:null},x===null?(d=x=w,c=p):x=x.next=w,l|=g;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;g=a,a=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(x===null&&(c=p),o.baseState=c,o.firstBaseUpdate=d,o.lastBaseUpdate=x,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else s===null&&(o.shared.lanes=0);wr|=l,e.lanes=l,e.memoizedState=p}}function _f(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(L(191,o));o.call(r)}}}var Li={},ln=Kn(Li),ki=Kn(Li),wi=Kn(Li);function ar(e){if(e===Li)throw Error(L(174));return e}function Fu(e,t){switch(Ee(wi,t),Ee(ki,e),Ee(ln,Li),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:uc(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=uc(t,e)}Ie(ln),Ee(ln,t)}function io(){Ie(ln),Ie(ki),Ie(wi)}function Px(e){ar(wi.current);var t=ar(ln.current),n=uc(t,e.type);t!==n&&(Ee(ki,e),Ee(ln,n))}function Uu(e){ki.current===e&&(Ie(ln),Ie(ki))}var Me=Kn(0);function ll(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var fa=[];function Vu(){for(var e=0;e<fa.length;e++)fa[e]._workInProgressVersionPrimary=null;fa.length=0}var Is=Sn.ReactCurrentDispatcher,pa=Sn.ReactCurrentBatchConfig,kr=0,$e=null,He=null,Ge=null,al=!1,oi=!1,bi=0,Jy=0;function ot(){throw Error(L(321))}function qu(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Zt(e[n],t[n]))return!1;return!0}function Hu(e,t,n,r,o,s){if(kr=s,$e=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Is.current=e===null||e.memoizedState===null?tv:nv,e=n(r,o),oi){s=0;do{if(oi=!1,bi=0,25<=s)throw Error(L(301));s+=1,Ge=He=null,t.updateQueue=null,Is.current=rv,e=n(r,o)}while(oi)}if(Is.current=cl,t=He!==null&&He.next!==null,kr=0,Ge=He=$e=null,al=!1,t)throw Error(L(300));return e}function Wu(){var e=bi!==0;return bi=0,e}function nn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ge===null?$e.memoizedState=Ge=e:Ge=Ge.next=e,Ge}function Lt(){if(He===null){var e=$e.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var t=Ge===null?$e.memoizedState:Ge.next;if(t!==null)Ge=t,He=e;else{if(e===null)throw Error(L(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},Ge===null?$e.memoizedState=Ge=e:Ge=Ge.next=e}return Ge}function ji(e,t){return typeof t=="function"?t(e):t}function ha(e){var t=Lt(),n=t.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=e;var r=He,o=r.baseQueue,s=n.pending;if(s!==null){if(o!==null){var l=o.next;o.next=s.next,s.next=l}r.baseQueue=o=s,n.pending=null}if(o!==null){s=o.next,r=r.baseState;var a=l=null,c=null,d=s;do{var x=d.lane;if((kr&x)===x)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var p={lane:x,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(a=c=p,l=r):c=c.next=p,$e.lanes|=x,wr|=x}d=d.next}while(d!==null&&d!==s);c===null?l=r:c.next=a,Zt(r,t.memoizedState)||(mt=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do s=o.lane,$e.lanes|=s,wr|=s,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ga(e){var t=Lt(),n=t.queue;if(n===null)throw Error(L(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,s=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do s=e(s,l.action),l=l.next;while(l!==o);Zt(s,t.memoizedState)||(mt=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Mx(){}function $x(e,t){var n=$e,r=Lt(),o=t(),s=!Zt(r.memoizedState,o);if(s&&(r.memoizedState=o,mt=!0),r=r.queue,Yu(Nx.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||Ge!==null&&Ge.memoizedState.tag&1){if(n.flags|=2048,Si(9,Ox.bind(null,n,r,o,t),void 0,null),Qe===null)throw Error(L(349));kr&30||Ax(n,t,o)}return o}function Ax(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$e.updateQueue,t===null?(t={lastEffect:null,stores:null},$e.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ox(e,t,n,r){t.value=n,t.getSnapshot=r,Lx(t)&&Dx(e)}function Nx(e,t,n){return n(function(){Lx(t)&&Dx(e)})}function Lx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Zt(e,n)}catch{return!0}}function Dx(e){var t=bn(e,1);t!==null&&Jt(t,e,1,-1)}function Tf(e){var t=nn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ji,lastRenderedState:e},t.queue=e,e=e.dispatch=ev.bind(null,$e,e),[t.memoizedState,e]}function Si(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=$e.updateQueue,t===null?(t={lastEffect:null,stores:null},$e.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Bx(){return Lt().memoizedState}function Ps(e,t,n,r){var o=nn();$e.flags|=e,o.memoizedState=Si(1|t,n,void 0,r===void 0?null:r)}function _l(e,t,n,r){var o=Lt();r=r===void 0?null:r;var s=void 0;if(He!==null){var l=He.memoizedState;if(s=l.destroy,r!==null&&qu(r,l.deps)){o.memoizedState=Si(t,n,s,r);return}}$e.flags|=e,o.memoizedState=Si(1|t,n,s,r)}function Rf(e,t){return Ps(8390656,8,e,t)}function Yu(e,t){return _l(2048,8,e,t)}function Fx(e,t){return _l(4,2,e,t)}function Ux(e,t){return _l(4,4,e,t)}function Vx(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function qx(e,t,n){return n=n!=null?n.concat([e]):null,_l(4,4,Vx.bind(null,t,e),n)}function Gu(){}function Hx(e,t){var n=Lt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qu(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Wx(e,t){var n=Lt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qu(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Yx(e,t,n){return kr&21?(Zt(n,t)||(n=Xg(),$e.lanes|=n,wr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,mt=!0),e.memoizedState=n)}function Xy(e,t){var n=Ce;Ce=n!==0&&4>n?n:4,e(!0);var r=pa.transition;pa.transition={};try{e(!1),t()}finally{Ce=n,pa.transition=r}}function Gx(){return Lt().memoizedState}function Zy(e,t,n){var r=Un(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Kx(e))Qx(t,n);else if(n=Rx(e,t,n,r),n!==null){var o=pt();Jt(n,e,r,o),Jx(n,t,r)}}function ev(e,t,n){var r=Un(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Kx(e))Qx(t,o);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var l=t.lastRenderedState,a=s(l,n);if(o.hasEagerState=!0,o.eagerState=a,Zt(a,l)){var c=t.interleaved;c===null?(o.next=o,Du(t)):(o.next=c.next,c.next=o),t.interleaved=o;return}}catch{}finally{}n=Rx(e,t,o,r),n!==null&&(o=pt(),Jt(n,e,r,o),Jx(n,t,r))}}function Kx(e){var t=e.alternate;return e===$e||t!==null&&t===$e}function Qx(e,t){oi=al=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Jx(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Cu(e,n)}}var cl={readContext:Nt,useCallback:ot,useContext:ot,useEffect:ot,useImperativeHandle:ot,useInsertionEffect:ot,useLayoutEffect:ot,useMemo:ot,useReducer:ot,useRef:ot,useState:ot,useDebugValue:ot,useDeferredValue:ot,useTransition:ot,useMutableSource:ot,useSyncExternalStore:ot,useId:ot,unstable_isNewReconciler:!1},tv={readContext:Nt,useCallback:function(e,t){return nn().memoizedState=[e,t===void 0?null:t],e},useContext:Nt,useEffect:Rf,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ps(4194308,4,Vx.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ps(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ps(4,2,e,t)},useMemo:function(e,t){var n=nn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=nn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Zy.bind(null,$e,e),[r.memoizedState,e]},useRef:function(e){var t=nn();return e={current:e},t.memoizedState=e},useState:Tf,useDebugValue:Gu,useDeferredValue:function(e){return nn().memoizedState=e},useTransition:function(){var e=Tf(!1),t=e[0];return e=Xy.bind(null,e[1]),nn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=$e,o=nn();if(Pe){if(n===void 0)throw Error(L(407));n=n()}else{if(n=t(),Qe===null)throw Error(L(349));kr&30||Ax(r,t,n)}o.memoizedState=n;var s={value:n,getSnapshot:t};return o.queue=s,Rf(Nx.bind(null,r,s,e),[e]),r.flags|=2048,Si(9,Ox.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=nn(),t=Qe.identifierPrefix;if(Pe){var n=mn,r=xn;n=(r&~(1<<32-Qt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=bi++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Jy++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},nv={readContext:Nt,useCallback:Hx,useContext:Nt,useEffect:Yu,useImperativeHandle:qx,useInsertionEffect:Fx,useLayoutEffect:Ux,useMemo:Wx,useReducer:ha,useRef:Bx,useState:function(){return ha(ji)},useDebugValue:Gu,useDeferredValue:function(e){var t=Lt();return Yx(t,He.memoizedState,e)},useTransition:function(){var e=ha(ji)[0],t=Lt().memoizedState;return[e,t]},useMutableSource:Mx,useSyncExternalStore:$x,useId:Gx,unstable_isNewReconciler:!1},rv={readContext:Nt,useCallback:Hx,useContext:Nt,useEffect:Yu,useImperativeHandle:qx,useInsertionEffect:Fx,useLayoutEffect:Ux,useMemo:Wx,useReducer:ga,useRef:Bx,useState:function(){return ga(ji)},useDebugValue:Gu,useDeferredValue:function(e){var t=Lt();return He===null?t.memoizedState=e:Yx(t,He.memoizedState,e)},useTransition:function(){var e=ga(ji)[0],t=Lt().memoizedState;return[e,t]},useMutableSource:Mx,useSyncExternalStore:$x,useId:Gx,unstable_isNewReconciler:!1};function Wt(e,t){if(e&&e.defaultProps){t=Ae({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ic(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ae({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Tl={isMounted:function(e){return(e=e._reactInternals)?Cr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pt(),o=Un(e),s=vn(r,o);s.payload=t,n!=null&&(s.callback=n),t=Bn(e,s,o),t!==null&&(Jt(t,e,o,r),Rs(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pt(),o=Un(e),s=vn(r,o);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Bn(e,s,o),t!==null&&(Jt(t,e,o,r),Rs(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pt(),r=Un(e),o=vn(n,r);o.tag=2,t!=null&&(o.callback=t),t=Bn(e,o,r),t!==null&&(Jt(t,e,r,n),Rs(t,e,r))}};function If(e,t,n,r,o,s,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,l):t.prototype&&t.prototype.isPureReactComponent?!xi(n,r)||!xi(o,s):!0}function Xx(e,t,n){var r=!1,o=Yn,s=t.contextType;return typeof s=="object"&&s!==null?s=Nt(s):(o=kt(t)?yr:ut.current,r=t.contextTypes,s=(r=r!=null)?no(e,o):Yn),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Tl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=s),t}function Pf(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Tl.enqueueReplaceState(t,t.state,null)}function Pc(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Bu(e);var s=t.contextType;typeof s=="object"&&s!==null?o.context=Nt(s):(s=kt(t)?yr:ut.current,o.context=no(e,s)),o.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Ic(e,t,s,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Tl.enqueueReplaceState(o,o.state,null),sl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function so(e,t){try{var n="",r=t;do n+=I1(r),r=r.return;while(r);var o=n}catch(s){o=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:o,digest:null}}function xa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Mc(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ov=typeof WeakMap=="function"?WeakMap:Map;function Zx(e,t,n){n=vn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){dl||(dl=!0,Vc=r),Mc(e,t)},n}function em(e,t,n){n=vn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Mc(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Mc(e,t),typeof r!="function"&&(Fn===null?Fn=new Set([this]):Fn.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ov;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=yv.bind(null,e,t,n),t.then(e,e))}function $f(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Af(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=vn(-1,1),t.tag=2,Bn(n,t,1))),n.lanes|=1),e)}var iv=Sn.ReactCurrentOwner,mt=!1;function ft(e,t,n,r){t.child=e===null?Tx(t,null,n,r):oo(t,e.child,n,r)}function Of(e,t,n,r,o){n=n.render;var s=t.ref;return Jr(t,o),r=Hu(e,t,n,r,s,o),n=Wu(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,jn(e,t,o)):(Pe&&n&&Mu(t),t.flags|=1,ft(e,t,r,o),t.child)}function Nf(e,t,n,r,o){if(e===null){var s=n.type;return typeof s=="function"&&!nd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,tm(e,t,s,r,o)):(e=Os(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&o)){var l=s.memoizedProps;if(n=n.compare,n=n!==null?n:xi,n(l,r)&&e.ref===t.ref)return jn(e,t,o)}return t.flags|=1,e=Vn(s,r),e.ref=t.ref,e.return=t,t.child=e}function tm(e,t,n,r,o){if(e!==null){var s=e.memoizedProps;if(xi(s,r)&&e.ref===t.ref)if(mt=!1,t.pendingProps=r=s,(e.lanes&o)!==0)e.flags&131072&&(mt=!0);else return t.lanes=e.lanes,jn(e,t,o)}return $c(e,t,n,r,o)}function nm(e,t,n){var r=t.pendingProps,o=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ee(qr,jt),jt|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ee(qr,jt),jt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,Ee(qr,jt),jt|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,Ee(qr,jt),jt|=r;return ft(e,t,o,n),t.child}function rm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function $c(e,t,n,r,o){var s=kt(n)?yr:ut.current;return s=no(t,s),Jr(t,o),n=Hu(e,t,n,r,s,o),r=Wu(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,jn(e,t,o)):(Pe&&r&&Mu(t),t.flags|=1,ft(e,t,n,o),t.child)}function Lf(e,t,n,r,o){if(kt(n)){var s=!0;tl(t)}else s=!1;if(Jr(t,o),t.stateNode===null)Ms(e,t),Xx(t,n,r),Pc(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,a=t.memoizedProps;l.props=a;var c=l.context,d=n.contextType;typeof d=="object"&&d!==null?d=Nt(d):(d=kt(n)?yr:ut.current,d=no(t,d));var x=n.getDerivedStateFromProps,p=typeof x=="function"||typeof l.getSnapshotBeforeUpdate=="function";p||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==r||c!==d)&&Pf(t,l,r,d),Rn=!1;var g=t.memoizedState;l.state=g,sl(t,r,l,o),c=t.memoizedState,a!==r||g!==c||vt.current||Rn?(typeof x=="function"&&(Ic(t,n,x,r),c=t.memoizedState),(a=Rn||If(t,n,a,r,g,c,d))?(p||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),l.props=r,l.state=c,l.context=d,r=a):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Ix(e,t),a=t.memoizedProps,d=t.type===t.elementType?a:Wt(t.type,a),l.props=d,p=t.pendingProps,g=l.context,c=n.contextType,typeof c=="object"&&c!==null?c=Nt(c):(c=kt(n)?yr:ut.current,c=no(t,c));var w=n.getDerivedStateFromProps;(x=typeof w=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(a!==p||g!==c)&&Pf(t,l,r,c),Rn=!1,g=t.memoizedState,l.state=g,sl(t,r,l,o);var v=t.memoizedState;a!==p||g!==v||vt.current||Rn?(typeof w=="function"&&(Ic(t,n,w,r),v=t.memoizedState),(d=Rn||If(t,n,d,r,g,v,c)||!1)?(x||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,v,c),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,v,c)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),l.props=r,l.state=v,l.context=c,r=d):(typeof l.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Ac(e,t,n,r,s,o)}function Ac(e,t,n,r,o,s){rm(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&jf(t,n,!1),jn(e,t,s);r=t.stateNode,iv.current=t;var a=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=oo(t,e.child,null,s),t.child=oo(t,null,a,s)):ft(e,t,a,s),t.memoizedState=r.state,o&&jf(t,n,!0),t.child}function om(e){var t=e.stateNode;t.pendingContext?bf(e,t.pendingContext,t.pendingContext!==t.context):t.context&&bf(e,t.context,!1),Fu(e,t.containerInfo)}function Df(e,t,n,r,o){return ro(),Au(o),t.flags|=256,ft(e,t,n,r),t.child}var Oc={dehydrated:null,treeContext:null,retryLane:0};function Nc(e){return{baseLanes:e,cachePool:null,transitions:null}}function im(e,t,n){var r=t.pendingProps,o=Me.current,s=!1,l=(t.flags&128)!==0,a;if((a=l)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Ee(Me,o&1),e===null)return Tc(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,s?(r=t.mode,s=t.child,l={mode:"hidden",children:l},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=l):s=Pl(l,r,0,null),e=fr(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Nc(n),t.memoizedState=Oc,e):Ku(t,l));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return sv(e,t,l,r,a,o,n);if(s){s=r.fallback,l=t.mode,o=e.child,a=o.sibling;var c={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Vn(o,c),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?s=Vn(a,s):(s=fr(s,l,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,l=e.child.memoizedState,l=l===null?Nc(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~n,t.memoizedState=Oc,r}return s=e.child,e=s.sibling,r=Vn(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ku(e,t){return t=Pl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function rs(e,t,n,r){return r!==null&&Au(r),oo(t,e.child,null,n),e=Ku(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function sv(e,t,n,r,o,s,l){if(n)return t.flags&256?(t.flags&=-257,r=xa(Error(L(422))),rs(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,o=t.mode,r=Pl({mode:"visible",children:r.children},o,0,null),s=fr(s,o,l,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&oo(t,e.child,null,l),t.child.memoizedState=Nc(l),t.memoizedState=Oc,s);if(!(t.mode&1))return rs(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(L(419)),r=xa(s,r,void 0),rs(e,t,l,r)}if(a=(l&e.childLanes)!==0,mt||a){if(r=Qe,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==s.retryLane&&(s.retryLane=o,bn(e,o),Jt(r,e,o,-1))}return td(),r=xa(Error(L(421))),rs(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=vv.bind(null,e),o._reactRetry=t,null):(e=s.treeContext,St=Dn(o.nextSibling),zt=t,Pe=!0,Kt=null,e!==null&&(Pt[Mt++]=xn,Pt[Mt++]=mn,Pt[Mt++]=vr,xn=e.id,mn=e.overflow,vr=t),t=Ku(t,r.children),t.flags|=4096,t)}function Bf(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Rc(e.return,t,n)}function ma(e,t,n,r,o){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=o)}function sm(e,t,n){var r=t.pendingProps,o=r.revealOrder,s=r.tail;if(ft(e,t,r.children,n),r=Me.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Bf(e,n,t);else if(e.tag===19)Bf(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ee(Me,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&ll(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),ma(t,!1,o,n,s);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ll(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}ma(t,!0,n,null,s);break;case"together":ma(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ms(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function jn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),wr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(L(153));if(t.child!==null){for(e=t.child,n=Vn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Vn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function lv(e,t,n){switch(t.tag){case 3:om(t),ro();break;case 5:Px(t);break;case 1:kt(t.type)&&tl(t);break;case 4:Fu(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Ee(ol,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ee(Me,Me.current&1),t.flags|=128,null):n&t.child.childLanes?im(e,t,n):(Ee(Me,Me.current&1),e=jn(e,t,n),e!==null?e.sibling:null);Ee(Me,Me.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return sm(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Ee(Me,Me.current),r)break;return null;case 22:case 23:return t.lanes=0,nm(e,t,n)}return jn(e,t,n)}var lm,Lc,am,cm;lm=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lc=function(){};am=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,ar(ln.current);var s=null;switch(n){case"input":o=sc(e,o),r=sc(e,r),s=[];break;case"select":o=Ae({},o,{value:void 0}),r=Ae({},r,{value:void 0}),s=[];break;case"textarea":o=cc(e,o),r=cc(e,r),s=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Zs)}dc(n,r);var l;n=null;for(d in o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var a=o[d];for(l in a)a.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(ci.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var c=r[d];if(a=o!=null?o[d]:void 0,r.hasOwnProperty(d)&&c!==a&&(c!=null||a!=null))if(d==="style")if(a){for(l in a)!a.hasOwnProperty(l)||c&&c.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in c)c.hasOwnProperty(l)&&a[l]!==c[l]&&(n||(n={}),n[l]=c[l])}else n||(s||(s=[]),s.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(s=s||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(ci.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Te("scroll",e),s||a===c||(s=[])):(s=s||[]).push(d,c))}n&&(s=s||[]).push("style",n);var d=s;(t.updateQueue=d)&&(t.flags|=4)}};cm=function(e,t,n,r){n!==r&&(t.flags|=4)};function Io(e,t){if(!Pe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function it(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function av(e,t,n){var r=t.pendingProps;switch($u(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(t),null;case 1:return kt(t.type)&&el(),it(t),null;case 3:return r=t.stateNode,io(),Ie(vt),Ie(ut),Vu(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ts(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Kt!==null&&(Wc(Kt),Kt=null))),Lc(e,t),it(t),null;case 5:Uu(t);var o=ar(wi.current);if(n=t.type,e!==null&&t.stateNode!=null)am(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(L(166));return it(t),null}if(e=ar(ln.current),ts(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[on]=t,r[vi]=s,e=(t.mode&1)!==0,n){case"dialog":Te("cancel",r),Te("close",r);break;case"iframe":case"object":case"embed":Te("load",r);break;case"video":case"audio":for(o=0;o<Qo.length;o++)Te(Qo[o],r);break;case"source":Te("error",r);break;case"img":case"image":case"link":Te("error",r),Te("load",r);break;case"details":Te("toggle",r);break;case"input":Gd(r,s),Te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Te("invalid",r);break;case"textarea":Qd(r,s),Te("invalid",r)}dc(n,s),o=null;for(var l in s)if(s.hasOwnProperty(l)){var a=s[l];l==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&es(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&es(r.textContent,a,e),o=["children",""+a]):ci.hasOwnProperty(l)&&a!=null&&l==="onScroll"&&Te("scroll",r)}switch(n){case"input":Wi(r),Kd(r,s,!0);break;case"textarea":Wi(r),Jd(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Zs)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ng(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[on]=t,e[vi]=r,lm(e,t,!1,!1),t.stateNode=e;e:{switch(l=fc(n,r),n){case"dialog":Te("cancel",e),Te("close",e),o=r;break;case"iframe":case"object":case"embed":Te("load",e),o=r;break;case"video":case"audio":for(o=0;o<Qo.length;o++)Te(Qo[o],e);o=r;break;case"source":Te("error",e),o=r;break;case"img":case"image":case"link":Te("error",e),Te("load",e),o=r;break;case"details":Te("toggle",e),o=r;break;case"input":Gd(e,r),o=sc(e,r),Te("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Ae({},r,{value:void 0}),Te("invalid",e);break;case"textarea":Qd(e,r),o=cc(e,r),Te("invalid",e);break;default:o=r}dc(n,o),a=o;for(s in a)if(a.hasOwnProperty(s)){var c=a[s];s==="style"?Bg(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Lg(e,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&ui(e,c):typeof c=="number"&&ui(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ci.hasOwnProperty(s)?c!=null&&s==="onScroll"&&Te("scroll",e):c!=null&&vu(e,s,c,l))}switch(n){case"input":Wi(e),Kd(e,r,!1);break;case"textarea":Wi(e),Jd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Wn(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Yr(e,!!r.multiple,s,!1):r.defaultValue!=null&&Yr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Zs)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return it(t),null;case 6:if(e&&t.stateNode!=null)cm(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(L(166));if(n=ar(wi.current),ar(ln.current),ts(t)){if(r=t.stateNode,n=t.memoizedProps,r[on]=t,(s=r.nodeValue!==n)&&(e=zt,e!==null))switch(e.tag){case 3:es(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&es(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[on]=t,t.stateNode=r}return it(t),null;case 13:if(Ie(Me),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Pe&&St!==null&&t.mode&1&&!(t.flags&128))Ex(),ro(),t.flags|=98560,s=!1;else if(s=ts(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(L(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(L(317));s[on]=t}else ro(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;it(t),s=!1}else Kt!==null&&(Wc(Kt),Kt=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Me.current&1?We===0&&(We=3):td())),t.updateQueue!==null&&(t.flags|=4),it(t),null);case 4:return io(),Lc(e,t),e===null&&mi(t.stateNode.containerInfo),it(t),null;case 10:return Lu(t.type._context),it(t),null;case 17:return kt(t.type)&&el(),it(t),null;case 19:if(Ie(Me),s=t.memoizedState,s===null)return it(t),null;if(r=(t.flags&128)!==0,l=s.rendering,l===null)if(r)Io(s,!1);else{if(We!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=ll(e),l!==null){for(t.flags|=128,Io(s,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,l=s.alternate,l===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=l.childLanes,s.lanes=l.lanes,s.child=l.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=l.memoizedProps,s.memoizedState=l.memoizedState,s.updateQueue=l.updateQueue,s.type=l.type,e=l.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ee(Me,Me.current&1|2),t.child}e=e.sibling}s.tail!==null&&De()>lo&&(t.flags|=128,r=!0,Io(s,!1),t.lanes=4194304)}else{if(!r)if(e=ll(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Io(s,!0),s.tail===null&&s.tailMode==="hidden"&&!l.alternate&&!Pe)return it(t),null}else 2*De()-s.renderingStartTime>lo&&n!==1073741824&&(t.flags|=128,r=!0,Io(s,!1),t.lanes=4194304);s.isBackwards?(l.sibling=t.child,t.child=l):(n=s.last,n!==null?n.sibling=l:t.child=l,s.last=l)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=De(),t.sibling=null,n=Me.current,Ee(Me,r?n&1|2:n&1),t):(it(t),null);case 22:case 23:return ed(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?jt&1073741824&&(it(t),t.subtreeFlags&6&&(t.flags|=8192)):it(t),null;case 24:return null;case 25:return null}throw Error(L(156,t.tag))}function cv(e,t){switch($u(t),t.tag){case 1:return kt(t.type)&&el(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return io(),Ie(vt),Ie(ut),Vu(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Uu(t),null;case 13:if(Ie(Me),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(L(340));ro()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ie(Me),null;case 4:return io(),null;case 10:return Lu(t.type._context),null;case 22:case 23:return ed(),null;case 24:return null;default:return null}}var os=!1,ct=!1,uv=typeof WeakSet=="function"?WeakSet:Set,ee=null;function Vr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Oe(e,t,r)}else n.current=null}function Dc(e,t,n){try{n()}catch(r){Oe(e,t,r)}}var Ff=!1;function dv(e,t){if(bc=Qs,e=hx(),Pu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var l=0,a=-1,c=-1,d=0,x=0,p=e,g=null;t:for(;;){for(var w;p!==n||o!==0&&p.nodeType!==3||(a=l+o),p!==s||r!==0&&p.nodeType!==3||(c=l+r),p.nodeType===3&&(l+=p.nodeValue.length),(w=p.firstChild)!==null;)g=p,p=w;for(;;){if(p===e)break t;if(g===n&&++d===o&&(a=l),g===s&&++x===r&&(c=l),(w=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=w}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(jc={focusedElem:e,selectionRange:n},Qs=!1,ee=t;ee!==null;)if(t=ee,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ee=e;else for(;ee!==null;){t=ee;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var b=v.memoizedProps,C=v.memoizedState,m=t.stateNode,h=m.getSnapshotBeforeUpdate(t.elementType===t.type?b:Wt(t.type,b),C);m.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(L(163))}}catch(j){Oe(t,t.return,j)}if(e=t.sibling,e!==null){e.return=t.return,ee=e;break}ee=t.return}return v=Ff,Ff=!1,v}function ii(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var s=o.destroy;o.destroy=void 0,s!==void 0&&Dc(t,n,s)}o=o.next}while(o!==r)}}function Rl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Bc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function um(e){var t=e.alternate;t!==null&&(e.alternate=null,um(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[on],delete t[vi],delete t[zc],delete t[Yy],delete t[Gy])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function dm(e){return e.tag===5||e.tag===3||e.tag===4}function Uf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||dm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Fc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Zs));else if(r!==4&&(e=e.child,e!==null))for(Fc(e,t,n),e=e.sibling;e!==null;)Fc(e,t,n),e=e.sibling}function Uc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Uc(e,t,n),e=e.sibling;e!==null;)Uc(e,t,n),e=e.sibling}var tt=null,Yt=!1;function zn(e,t,n){for(n=n.child;n!==null;)fm(e,t,n),n=n.sibling}function fm(e,t,n){if(sn&&typeof sn.onCommitFiberUnmount=="function")try{sn.onCommitFiberUnmount(bl,n)}catch{}switch(n.tag){case 5:ct||Vr(n,t);case 6:var r=tt,o=Yt;tt=null,zn(e,t,n),tt=r,Yt=o,tt!==null&&(Yt?(e=tt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):tt.removeChild(n.stateNode));break;case 18:tt!==null&&(Yt?(e=tt,n=n.stateNode,e.nodeType===8?ua(e.parentNode,n):e.nodeType===1&&ua(e,n),hi(e)):ua(tt,n.stateNode));break;case 4:r=tt,o=Yt,tt=n.stateNode.containerInfo,Yt=!0,zn(e,t,n),tt=r,Yt=o;break;case 0:case 11:case 14:case 15:if(!ct&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var s=o,l=s.destroy;s=s.tag,l!==void 0&&(s&2||s&4)&&Dc(n,t,l),o=o.next}while(o!==r)}zn(e,t,n);break;case 1:if(!ct&&(Vr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Oe(n,t,a)}zn(e,t,n);break;case 21:zn(e,t,n);break;case 22:n.mode&1?(ct=(r=ct)||n.memoizedState!==null,zn(e,t,n),ct=r):zn(e,t,n);break;default:zn(e,t,n)}}function Vf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new uv),t.forEach(function(r){var o=kv.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Ht(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var s=e,l=t,a=l;e:for(;a!==null;){switch(a.tag){case 5:tt=a.stateNode,Yt=!1;break e;case 3:tt=a.stateNode.containerInfo,Yt=!0;break e;case 4:tt=a.stateNode.containerInfo,Yt=!0;break e}a=a.return}if(tt===null)throw Error(L(160));fm(s,l,o),tt=null,Yt=!1;var c=o.alternate;c!==null&&(c.return=null),o.return=null}catch(d){Oe(o,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)pm(t,e),t=t.sibling}function pm(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ht(t,e),tn(e),r&4){try{ii(3,e,e.return),Rl(3,e)}catch(b){Oe(e,e.return,b)}try{ii(5,e,e.return)}catch(b){Oe(e,e.return,b)}}break;case 1:Ht(t,e),tn(e),r&512&&n!==null&&Vr(n,n.return);break;case 5:if(Ht(t,e),tn(e),r&512&&n!==null&&Vr(n,n.return),e.flags&32){var o=e.stateNode;try{ui(o,"")}catch(b){Oe(e,e.return,b)}}if(r&4&&(o=e.stateNode,o!=null)){var s=e.memoizedProps,l=n!==null?n.memoizedProps:s,a=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Ag(o,s),fc(a,l);var d=fc(a,s);for(l=0;l<c.length;l+=2){var x=c[l],p=c[l+1];x==="style"?Bg(o,p):x==="dangerouslySetInnerHTML"?Lg(o,p):x==="children"?ui(o,p):vu(o,x,p,d)}switch(a){case"input":lc(o,s);break;case"textarea":Og(o,s);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!s.multiple;var w=s.value;w!=null?Yr(o,!!s.multiple,w,!1):g!==!!s.multiple&&(s.defaultValue!=null?Yr(o,!!s.multiple,s.defaultValue,!0):Yr(o,!!s.multiple,s.multiple?[]:"",!1))}o[vi]=s}catch(b){Oe(e,e.return,b)}}break;case 6:if(Ht(t,e),tn(e),r&4){if(e.stateNode===null)throw Error(L(162));o=e.stateNode,s=e.memoizedProps;try{o.nodeValue=s}catch(b){Oe(e,e.return,b)}}break;case 3:if(Ht(t,e),tn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{hi(t.containerInfo)}catch(b){Oe(e,e.return,b)}break;case 4:Ht(t,e),tn(e);break;case 13:Ht(t,e),tn(e),o=e.child,o.flags&8192&&(s=o.memoizedState!==null,o.stateNode.isHidden=s,!s||o.alternate!==null&&o.alternate.memoizedState!==null||(Xu=De())),r&4&&Vf(e);break;case 22:if(x=n!==null&&n.memoizedState!==null,e.mode&1?(ct=(d=ct)||x,Ht(t,e),ct=d):Ht(t,e),tn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!x&&e.mode&1)for(ee=e,x=e.child;x!==null;){for(p=ee=x;ee!==null;){switch(g=ee,w=g.child,g.tag){case 0:case 11:case 14:case 15:ii(4,g,g.return);break;case 1:Vr(g,g.return);var v=g.stateNode;if(typeof v.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(b){Oe(r,n,b)}}break;case 5:Vr(g,g.return);break;case 22:if(g.memoizedState!==null){Hf(p);continue}}w!==null?(w.return=g,ee=w):Hf(p)}x=x.sibling}e:for(x=null,p=e;;){if(p.tag===5){if(x===null){x=p;try{o=p.stateNode,d?(s=o.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=p.stateNode,c=p.memoizedProps.style,l=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Dg("display",l))}catch(b){Oe(e,e.return,b)}}}else if(p.tag===6){if(x===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(b){Oe(e,e.return,b)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;x===p&&(x=null),p=p.return}x===p&&(x=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Ht(t,e),tn(e),r&4&&Vf(e);break;case 21:break;default:Ht(t,e),tn(e)}}function tn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(dm(n)){var r=n;break e}n=n.return}throw Error(L(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(ui(o,""),r.flags&=-33);var s=Uf(e);Uc(e,s,o);break;case 3:case 4:var l=r.stateNode.containerInfo,a=Uf(e);Fc(e,a,l);break;default:throw Error(L(161))}}catch(c){Oe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function fv(e,t,n){ee=e,hm(e)}function hm(e,t,n){for(var r=(e.mode&1)!==0;ee!==null;){var o=ee,s=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||os;if(!l){var a=o.alternate,c=a!==null&&a.memoizedState!==null||ct;a=os;var d=ct;if(os=l,(ct=c)&&!d)for(ee=o;ee!==null;)l=ee,c=l.child,l.tag===22&&l.memoizedState!==null?Wf(o):c!==null?(c.return=l,ee=c):Wf(o);for(;s!==null;)ee=s,hm(s),s=s.sibling;ee=o,os=a,ct=d}qf(e)}else o.subtreeFlags&8772&&s!==null?(s.return=o,ee=s):qf(e)}}function qf(e){for(;ee!==null;){var t=ee;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ct||Rl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ct)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Wt(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&_f(t,s,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}_f(t,l,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var x=d.memoizedState;if(x!==null){var p=x.dehydrated;p!==null&&hi(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(L(163))}ct||t.flags&512&&Bc(t)}catch(g){Oe(t,t.return,g)}}if(t===e){ee=null;break}if(n=t.sibling,n!==null){n.return=t.return,ee=n;break}ee=t.return}}function Hf(e){for(;ee!==null;){var t=ee;if(t===e){ee=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ee=n;break}ee=t.return}}function Wf(e){for(;ee!==null;){var t=ee;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Rl(4,t)}catch(c){Oe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(c){Oe(t,o,c)}}var s=t.return;try{Bc(t)}catch(c){Oe(t,s,c)}break;case 5:var l=t.return;try{Bc(t)}catch(c){Oe(t,l,c)}}}catch(c){Oe(t,t.return,c)}if(t===e){ee=null;break}var a=t.sibling;if(a!==null){a.return=t.return,ee=a;break}ee=t.return}}var pv=Math.ceil,ul=Sn.ReactCurrentDispatcher,Qu=Sn.ReactCurrentOwner,Ot=Sn.ReactCurrentBatchConfig,be=0,Qe=null,Ue=null,nt=0,jt=0,qr=Kn(0),We=0,Ci=null,wr=0,Il=0,Ju=0,si=null,xt=null,Xu=0,lo=1/0,pn=null,dl=!1,Vc=null,Fn=null,is=!1,$n=null,fl=0,li=0,qc=null,$s=-1,As=0;function pt(){return be&6?De():$s!==-1?$s:$s=De()}function Un(e){return e.mode&1?be&2&&nt!==0?nt&-nt:Qy.transition!==null?(As===0&&(As=Xg()),As):(e=Ce,e!==0||(e=window.event,e=e===void 0?16:ix(e.type)),e):1}function Jt(e,t,n,r){if(50<li)throw li=0,qc=null,Error(L(185));Ai(e,n,r),(!(be&2)||e!==Qe)&&(e===Qe&&(!(be&2)&&(Il|=n),We===4&&Pn(e,nt)),wt(e,r),n===1&&be===0&&!(t.mode&1)&&(lo=De()+500,El&&Qn()))}function wt(e,t){var n=e.callbackNode;Q1(e,t);var r=Ks(e,e===Qe?nt:0);if(r===0)n!==null&&ef(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ef(n),t===1)e.tag===0?Ky(Yf.bind(null,e)):Sx(Yf.bind(null,e)),Hy(function(){!(be&6)&&Qn()}),n=null;else{switch(Zg(r)){case 1:n=Su;break;case 4:n=Qg;break;case 16:n=Gs;break;case 536870912:n=Jg;break;default:n=Gs}n=bm(n,gm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function gm(e,t){if($s=-1,As=0,be&6)throw Error(L(327));var n=e.callbackNode;if(Xr()&&e.callbackNode!==n)return null;var r=Ks(e,e===Qe?nt:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=pl(e,r);else{t=r;var o=be;be|=2;var s=mm();(Qe!==e||nt!==t)&&(pn=null,lo=De()+500,dr(e,t));do try{xv();break}catch(a){xm(e,a)}while(!0);Nu(),ul.current=s,be=o,Ue!==null?t=0:(Qe=null,nt=0,t=We)}if(t!==0){if(t===2&&(o=mc(e),o!==0&&(r=o,t=Hc(e,o))),t===1)throw n=Ci,dr(e,0),Pn(e,r),wt(e,De()),n;if(t===6)Pn(e,r);else{if(o=e.current.alternate,!(r&30)&&!hv(o)&&(t=pl(e,r),t===2&&(s=mc(e),s!==0&&(r=s,t=Hc(e,s))),t===1))throw n=Ci,dr(e,0),Pn(e,r),wt(e,De()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(L(345));case 2:or(e,xt,pn);break;case 3:if(Pn(e,r),(r&130023424)===r&&(t=Xu+500-De(),10<t)){if(Ks(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){pt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Cc(or.bind(null,e,xt,pn),t);break}or(e,xt,pn);break;case 4:if(Pn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-Qt(r);s=1<<l,l=t[l],l>o&&(o=l),r&=~s}if(r=o,r=De()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*pv(r/1960))-r,10<r){e.timeoutHandle=Cc(or.bind(null,e,xt,pn),r);break}or(e,xt,pn);break;case 5:or(e,xt,pn);break;default:throw Error(L(329))}}}return wt(e,De()),e.callbackNode===n?gm.bind(null,e):null}function Hc(e,t){var n=si;return e.current.memoizedState.isDehydrated&&(dr(e,t).flags|=256),e=pl(e,t),e!==2&&(t=xt,xt=n,t!==null&&Wc(t)),e}function Wc(e){xt===null?xt=e:xt.push.apply(xt,e)}function hv(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],s=o.getSnapshot;o=o.value;try{if(!Zt(s(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Pn(e,t){for(t&=~Ju,t&=~Il,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qt(t),r=1<<n;e[n]=-1,t&=~r}}function Yf(e){if(be&6)throw Error(L(327));Xr();var t=Ks(e,0);if(!(t&1))return wt(e,De()),null;var n=pl(e,t);if(e.tag!==0&&n===2){var r=mc(e);r!==0&&(t=r,n=Hc(e,r))}if(n===1)throw n=Ci,dr(e,0),Pn(e,t),wt(e,De()),n;if(n===6)throw Error(L(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,or(e,xt,pn),wt(e,De()),null}function Zu(e,t){var n=be;be|=1;try{return e(t)}finally{be=n,be===0&&(lo=De()+500,El&&Qn())}}function br(e){$n!==null&&$n.tag===0&&!(be&6)&&Xr();var t=be;be|=1;var n=Ot.transition,r=Ce;try{if(Ot.transition=null,Ce=1,e)return e()}finally{Ce=r,Ot.transition=n,be=t,!(be&6)&&Qn()}}function ed(){jt=qr.current,Ie(qr)}function dr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qy(n)),Ue!==null)for(n=Ue.return;n!==null;){var r=n;switch($u(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&el();break;case 3:io(),Ie(vt),Ie(ut),Vu();break;case 5:Uu(r);break;case 4:io();break;case 13:Ie(Me);break;case 19:Ie(Me);break;case 10:Lu(r.type._context);break;case 22:case 23:ed()}n=n.return}if(Qe=e,Ue=e=Vn(e.current,null),nt=jt=t,We=0,Ci=null,Ju=Il=wr=0,xt=si=null,lr!==null){for(t=0;t<lr.length;t++)if(n=lr[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,s=n.pending;if(s!==null){var l=s.next;s.next=o,r.next=l}n.pending=r}lr=null}return e}function xm(e,t){do{var n=Ue;try{if(Nu(),Is.current=cl,al){for(var r=$e.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}al=!1}if(kr=0,Ge=He=$e=null,oi=!1,bi=0,Qu.current=null,n===null||n.return===null){We=1,Ci=t,Ue=null;break}e:{var s=e,l=n.return,a=n,c=t;if(t=nt,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,x=a,p=x.tag;if(!(x.mode&1)&&(p===0||p===11||p===15)){var g=x.alternate;g?(x.updateQueue=g.updateQueue,x.memoizedState=g.memoizedState,x.lanes=g.lanes):(x.updateQueue=null,x.memoizedState=null)}var w=$f(l);if(w!==null){w.flags&=-257,Af(w,l,a,s,t),w.mode&1&&Mf(s,d,t),t=w,c=d;var v=t.updateQueue;if(v===null){var b=new Set;b.add(c),t.updateQueue=b}else v.add(c);break e}else{if(!(t&1)){Mf(s,d,t),td();break e}c=Error(L(426))}}else if(Pe&&a.mode&1){var C=$f(l);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Af(C,l,a,s,t),Au(so(c,a));break e}}s=c=so(c,a),We!==4&&(We=2),si===null?si=[s]:si.push(s),s=l;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var m=Zx(s,c,t);Ef(s,m);break e;case 1:a=c;var h=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof h.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Fn===null||!Fn.has(y)))){s.flags|=65536,t&=-t,s.lanes|=t;var j=em(s,a,t);Ef(s,j);break e}}s=s.return}while(s!==null)}vm(n)}catch(E){t=E,Ue===n&&n!==null&&(Ue=n=n.return);continue}break}while(!0)}function mm(){var e=ul.current;return ul.current=cl,e===null?cl:e}function td(){(We===0||We===3||We===2)&&(We=4),Qe===null||!(wr&268435455)&&!(Il&268435455)||Pn(Qe,nt)}function pl(e,t){var n=be;be|=2;var r=mm();(Qe!==e||nt!==t)&&(pn=null,dr(e,t));do try{gv();break}catch(o){xm(e,o)}while(!0);if(Nu(),be=n,ul.current=r,Ue!==null)throw Error(L(261));return Qe=null,nt=0,We}function gv(){for(;Ue!==null;)ym(Ue)}function xv(){for(;Ue!==null&&!F1();)ym(Ue)}function ym(e){var t=wm(e.alternate,e,jt);e.memoizedProps=e.pendingProps,t===null?vm(e):Ue=t,Qu.current=null}function vm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=cv(n,t),n!==null){n.flags&=32767,Ue=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{We=6,Ue=null;return}}else if(n=av(n,t,jt),n!==null){Ue=n;return}if(t=t.sibling,t!==null){Ue=t;return}Ue=t=e}while(t!==null);We===0&&(We=5)}function or(e,t,n){var r=Ce,o=Ot.transition;try{Ot.transition=null,Ce=1,mv(e,t,n,r)}finally{Ot.transition=o,Ce=r}return null}function mv(e,t,n,r){do Xr();while($n!==null);if(be&6)throw Error(L(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(L(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(J1(e,s),e===Qe&&(Ue=Qe=null,nt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||is||(is=!0,bm(Gs,function(){return Xr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Ot.transition,Ot.transition=null;var l=Ce;Ce=1;var a=be;be|=4,Qu.current=null,dv(e,n),pm(n,e),Ny(jc),Qs=!!bc,jc=bc=null,e.current=n,fv(n),U1(),be=a,Ce=l,Ot.transition=s}else e.current=n;if(is&&(is=!1,$n=e,fl=o),s=e.pendingLanes,s===0&&(Fn=null),H1(n.stateNode),wt(e,De()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(dl)throw dl=!1,e=Vc,Vc=null,e;return fl&1&&e.tag!==0&&Xr(),s=e.pendingLanes,s&1?e===qc?li++:(li=0,qc=e):li=0,Qn(),null}function Xr(){if($n!==null){var e=Zg(fl),t=Ot.transition,n=Ce;try{if(Ot.transition=null,Ce=16>e?16:e,$n===null)var r=!1;else{if(e=$n,$n=null,fl=0,be&6)throw Error(L(331));var o=be;for(be|=4,ee=e.current;ee!==null;){var s=ee,l=s.child;if(ee.flags&16){var a=s.deletions;if(a!==null){for(var c=0;c<a.length;c++){var d=a[c];for(ee=d;ee!==null;){var x=ee;switch(x.tag){case 0:case 11:case 15:ii(8,x,s)}var p=x.child;if(p!==null)p.return=x,ee=p;else for(;ee!==null;){x=ee;var g=x.sibling,w=x.return;if(um(x),x===d){ee=null;break}if(g!==null){g.return=w,ee=g;break}ee=w}}}var v=s.alternate;if(v!==null){var b=v.child;if(b!==null){v.child=null;do{var C=b.sibling;b.sibling=null,b=C}while(b!==null)}}ee=s}}if(s.subtreeFlags&2064&&l!==null)l.return=s,ee=l;else e:for(;ee!==null;){if(s=ee,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ii(9,s,s.return)}var m=s.sibling;if(m!==null){m.return=s.return,ee=m;break e}ee=s.return}}var h=e.current;for(ee=h;ee!==null;){l=ee;var y=l.child;if(l.subtreeFlags&2064&&y!==null)y.return=l,ee=y;else e:for(l=h;ee!==null;){if(a=ee,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Rl(9,a)}}catch(E){Oe(a,a.return,E)}if(a===l){ee=null;break e}var j=a.sibling;if(j!==null){j.return=a.return,ee=j;break e}ee=a.return}}if(be=o,Qn(),sn&&typeof sn.onPostCommitFiberRoot=="function")try{sn.onPostCommitFiberRoot(bl,e)}catch{}r=!0}return r}finally{Ce=n,Ot.transition=t}}return!1}function Gf(e,t,n){t=so(n,t),t=Zx(e,t,1),e=Bn(e,t,1),t=pt(),e!==null&&(Ai(e,1,t),wt(e,t))}function Oe(e,t,n){if(e.tag===3)Gf(e,e,n);else for(;t!==null;){if(t.tag===3){Gf(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Fn===null||!Fn.has(r))){e=so(n,e),e=em(t,e,1),t=Bn(t,e,1),e=pt(),t!==null&&(Ai(t,1,e),wt(t,e));break}}t=t.return}}function yv(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=pt(),e.pingedLanes|=e.suspendedLanes&n,Qe===e&&(nt&n)===n&&(We===4||We===3&&(nt&130023424)===nt&&500>De()-Xu?dr(e,0):Ju|=n),wt(e,t)}function km(e,t){t===0&&(e.mode&1?(t=Ki,Ki<<=1,!(Ki&130023424)&&(Ki=4194304)):t=1);var n=pt();e=bn(e,t),e!==null&&(Ai(e,t,n),wt(e,n))}function vv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),km(e,n)}function kv(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(L(314))}r!==null&&r.delete(t),km(e,n)}var wm;wm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||vt.current)mt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return mt=!1,lv(e,t,n);mt=!!(e.flags&131072)}else mt=!1,Pe&&t.flags&1048576&&Cx(t,rl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ms(e,t),e=t.pendingProps;var o=no(t,ut.current);Jr(t,n),o=Hu(null,t,r,e,o,n);var s=Wu();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,kt(r)?(s=!0,tl(t)):s=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Bu(t),o.updater=Tl,t.stateNode=o,o._reactInternals=t,Pc(t,r,e,n),t=Ac(null,t,r,!0,s,n)):(t.tag=0,Pe&&s&&Mu(t),ft(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ms(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=bv(r),e=Wt(r,e),o){case 0:t=$c(null,t,r,e,n);break e;case 1:t=Lf(null,t,r,e,n);break e;case 11:t=Of(null,t,r,e,n);break e;case 14:t=Nf(null,t,r,Wt(r.type,e),n);break e}throw Error(L(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Wt(r,o),$c(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Wt(r,o),Lf(e,t,r,o,n);case 3:e:{if(om(t),e===null)throw Error(L(387));r=t.pendingProps,s=t.memoizedState,o=s.element,Ix(e,t),sl(t,r,null,n);var l=t.memoizedState;if(r=l.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){o=so(Error(L(423)),t),t=Df(e,t,r,n,o);break e}else if(r!==o){o=so(Error(L(424)),t),t=Df(e,t,r,n,o);break e}else for(St=Dn(t.stateNode.containerInfo.firstChild),zt=t,Pe=!0,Kt=null,n=Tx(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ro(),r===o){t=jn(e,t,n);break e}ft(e,t,r,n)}t=t.child}return t;case 5:return Px(t),e===null&&Tc(t),r=t.type,o=t.pendingProps,s=e!==null?e.memoizedProps:null,l=o.children,Sc(r,o)?l=null:s!==null&&Sc(r,s)&&(t.flags|=32),rm(e,t),ft(e,t,l,n),t.child;case 6:return e===null&&Tc(t),null;case 13:return im(e,t,n);case 4:return Fu(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=oo(t,null,r,n):ft(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Wt(r,o),Of(e,t,r,o,n);case 7:return ft(e,t,t.pendingProps,n),t.child;case 8:return ft(e,t,t.pendingProps.children,n),t.child;case 12:return ft(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,s=t.memoizedProps,l=o.value,Ee(ol,r._currentValue),r._currentValue=l,s!==null)if(Zt(s.value,l)){if(s.children===o.children&&!vt.current){t=jn(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var a=s.dependencies;if(a!==null){l=s.child;for(var c=a.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=vn(-1,n&-n),c.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var x=d.pending;x===null?c.next=c:(c.next=x.next,x.next=c),d.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Rc(s.return,n,t),a.lanes|=n;break}c=c.next}}else if(s.tag===10)l=s.type===t.type?null:s.child;else if(s.tag===18){if(l=s.return,l===null)throw Error(L(341));l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),Rc(l,n,t),l=s.sibling}else l=s.child;if(l!==null)l.return=s;else for(l=s;l!==null;){if(l===t){l=null;break}if(s=l.sibling,s!==null){s.return=l.return,l=s;break}l=l.return}s=l}ft(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Jr(t,n),o=Nt(o),r=r(o),t.flags|=1,ft(e,t,r,n),t.child;case 14:return r=t.type,o=Wt(r,t.pendingProps),o=Wt(r.type,o),Nf(e,t,r,o,n);case 15:return tm(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Wt(r,o),Ms(e,t),t.tag=1,kt(r)?(e=!0,tl(t)):e=!1,Jr(t,n),Xx(t,r,o),Pc(t,r,o,n),Ac(null,t,r,!0,e,n);case 19:return sm(e,t,n);case 22:return nm(e,t,n)}throw Error(L(156,t.tag))};function bm(e,t){return Kg(e,t)}function wv(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function At(e,t,n,r){return new wv(e,t,n,r)}function nd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function bv(e){if(typeof e=="function")return nd(e)?1:0;if(e!=null){if(e=e.$$typeof,e===wu)return 11;if(e===bu)return 14}return 2}function Vn(e,t){var n=e.alternate;return n===null?(n=At(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Os(e,t,n,r,o,s){var l=2;if(r=e,typeof e=="function")nd(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case $r:return fr(n.children,o,s,t);case ku:l=8,o|=8;break;case nc:return e=At(12,n,t,o|2),e.elementType=nc,e.lanes=s,e;case rc:return e=At(13,n,t,o),e.elementType=rc,e.lanes=s,e;case oc:return e=At(19,n,t,o),e.elementType=oc,e.lanes=s,e;case Pg:return Pl(n,o,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Rg:l=10;break e;case Ig:l=9;break e;case wu:l=11;break e;case bu:l=14;break e;case Tn:l=16,r=null;break e}throw Error(L(130,e==null?e:typeof e,""))}return t=At(l,n,t,o),t.elementType=e,t.type=r,t.lanes=s,t}function fr(e,t,n,r){return e=At(7,e,r,t),e.lanes=n,e}function Pl(e,t,n,r){return e=At(22,e,r,t),e.elementType=Pg,e.lanes=n,e.stateNode={isHidden:!1},e}function ya(e,t,n){return e=At(6,e,null,t),e.lanes=n,e}function va(e,t,n){return t=At(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function jv(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Zl(0),this.expirationTimes=Zl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zl(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function rd(e,t,n,r,o,s,l,a,c){return e=new jv(e,t,n,a,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=At(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bu(s),e}function Sv(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Mr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function jm(e){if(!e)return Yn;e=e._reactInternals;e:{if(Cr(e)!==e||e.tag!==1)throw Error(L(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(kt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(L(171))}if(e.tag===1){var n=e.type;if(kt(n))return jx(e,n,t)}return t}function Sm(e,t,n,r,o,s,l,a,c){return e=rd(n,r,!0,e,o,s,l,a,c),e.context=jm(null),n=e.current,r=pt(),o=Un(n),s=vn(r,o),s.callback=t??null,Bn(n,s,o),e.current.lanes=o,Ai(e,o,r),wt(e,r),e}function Ml(e,t,n,r){var o=t.current,s=pt(),l=Un(o);return n=jm(n),t.context===null?t.context=n:t.pendingContext=n,t=vn(s,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Bn(o,t,l),e!==null&&(Jt(e,o,l,s),Rs(e,o,l)),l}function hl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Kf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function od(e,t){Kf(e,t),(e=e.alternate)&&Kf(e,t)}function Cv(){return null}var Cm=typeof reportError=="function"?reportError:function(e){console.error(e)};function id(e){this._internalRoot=e}$l.prototype.render=id.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(L(409));Ml(e,t,null,null)};$l.prototype.unmount=id.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;br(function(){Ml(null,e,null,null)}),t[wn]=null}};function $l(e){this._internalRoot=e}$l.prototype.unstable_scheduleHydration=function(e){if(e){var t=nx();e={blockedOn:null,target:e,priority:t};for(var n=0;n<In.length&&t!==0&&t<In[n].priority;n++);In.splice(n,0,e),n===0&&ox(e)}};function sd(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Qf(){}function zv(e,t,n,r,o){if(o){if(typeof r=="function"){var s=r;r=function(){var d=hl(l);s.call(d)}}var l=Sm(t,r,e,0,null,!1,!1,"",Qf);return e._reactRootContainer=l,e[wn]=l.current,mi(e.nodeType===8?e.parentNode:e),br(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var d=hl(c);a.call(d)}}var c=rd(e,0,!1,null,null,!1,!1,"",Qf);return e._reactRootContainer=c,e[wn]=c.current,mi(e.nodeType===8?e.parentNode:e),br(function(){Ml(t,c,n,r)}),c}function Ol(e,t,n,r,o){var s=n._reactRootContainer;if(s){var l=s;if(typeof o=="function"){var a=o;o=function(){var c=hl(l);a.call(c)}}Ml(t,l,e,o)}else l=zv(n,t,e,o,r);return hl(l)}ex=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ko(t.pendingLanes);n!==0&&(Cu(t,n|1),wt(t,De()),!(be&6)&&(lo=De()+500,Qn()))}break;case 13:br(function(){var r=bn(e,1);if(r!==null){var o=pt();Jt(r,e,1,o)}}),od(e,1)}};zu=function(e){if(e.tag===13){var t=bn(e,134217728);if(t!==null){var n=pt();Jt(t,e,134217728,n)}od(e,134217728)}};tx=function(e){if(e.tag===13){var t=Un(e),n=bn(e,t);if(n!==null){var r=pt();Jt(n,e,t,r)}od(e,t)}};nx=function(){return Ce};rx=function(e,t){var n=Ce;try{return Ce=e,t()}finally{Ce=n}};hc=function(e,t,n){switch(t){case"input":if(lc(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=zl(r);if(!o)throw Error(L(90));$g(r),lc(r,o)}}}break;case"textarea":Og(e,n);break;case"select":t=n.value,t!=null&&Yr(e,!!n.multiple,t,!1)}};Vg=Zu;qg=br;var Ev={usingClientEntryPoint:!1,Events:[Ni,Lr,zl,Fg,Ug,Zu]},Po={findFiberByHostInstance:sr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_v={bundleType:Po.bundleType,version:Po.version,rendererPackageName:Po.rendererPackageName,rendererConfig:Po.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Yg(e),e===null?null:e.stateNode},findFiberByHostInstance:Po.findFiberByHostInstance||Cv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ss=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ss.isDisabled&&ss.supportsFiber)try{bl=ss.inject(_v),sn=ss}catch{}}_t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ev;_t.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!sd(t))throw Error(L(200));return Sv(e,t,null,n)};_t.createRoot=function(e,t){if(!sd(e))throw Error(L(299));var n=!1,r="",o=Cm;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=rd(e,1,!1,null,null,n,!1,r,o),e[wn]=t.current,mi(e.nodeType===8?e.parentNode:e),new id(t)};_t.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(L(188)):(e=Object.keys(e).join(","),Error(L(268,e)));return e=Yg(t),e=e===null?null:e.stateNode,e};_t.flushSync=function(e){return br(e)};_t.hydrate=function(e,t,n){if(!Al(t))throw Error(L(200));return Ol(null,e,t,!0,n)};_t.hydrateRoot=function(e,t,n){if(!sd(e))throw Error(L(405));var r=n!=null&&n.hydratedSources||null,o=!1,s="",l=Cm;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=Sm(t,null,e,1,n??null,o,!1,s,l),e[wn]=t.current,mi(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new $l(t)};_t.render=function(e,t,n){if(!Al(t))throw Error(L(200));return Ol(null,e,t,!1,n)};_t.unmountComponentAtNode=function(e){if(!Al(e))throw Error(L(40));return e._reactRootContainer?(br(function(){Ol(null,null,e,!1,function(){e._reactRootContainer=null,e[wn]=null})}),!0):!1};_t.unstable_batchedUpdates=Zu;_t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(L(200));if(e==null||e._reactInternals===void 0)throw Error(L(38));return Ol(e,t,n,!1,r)};_t.version="18.3.1-next-f1338f8080-20240426";function zm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zm)}catch(e){console.error(e)}}zm(),zg.exports=_t;var Tv=zg.exports,Jf=Tv;ec.createRoot=Jf.createRoot,ec.hydrateRoot=Jf.hydrateRoot;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function zi(){return zi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},zi.apply(this,arguments)}var An;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(An||(An={}));const Xf="popstate";function Rv(e){e===void 0&&(e={});function t(r,o){let{pathname:s,search:l,hash:a}=r.location;return Yc("",{pathname:s,search:l,hash:a},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:gl(o)}return Pv(t,n,null,e)}function Be(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ld(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Iv(){return Math.random().toString(36).substr(2,8)}function Zf(e,t){return{usr:e.state,key:e.key,idx:t}}function Yc(e,t,n,r){return n===void 0&&(n=null),zi({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?ko(t):t,{state:n,key:t&&t.key||r||Iv()})}function gl(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function ko(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Pv(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:s=!1}=r,l=o.history,a=An.Pop,c=null,d=x();d==null&&(d=0,l.replaceState(zi({},l.state,{idx:d}),""));function x(){return(l.state||{idx:null}).idx}function p(){a=An.Pop;let C=x(),m=C==null?null:C-d;d=C,c&&c({action:a,location:b.location,delta:m})}function g(C,m){a=An.Push;let h=Yc(b.location,C,m);d=x()+1;let y=Zf(h,d),j=b.createHref(h);try{l.pushState(y,"",j)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;o.location.assign(j)}s&&c&&c({action:a,location:b.location,delta:1})}function w(C,m){a=An.Replace;let h=Yc(b.location,C,m);d=x();let y=Zf(h,d),j=b.createHref(h);l.replaceState(y,"",j),s&&c&&c({action:a,location:b.location,delta:0})}function v(C){let m=o.location.origin!=="null"?o.location.origin:o.location.href,h=typeof C=="string"?C:gl(C);return h=h.replace(/ $/,"%20"),Be(m,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,m)}let b={get action(){return a},get location(){return e(o,l)},listen(C){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(Xf,p),c=C,()=>{o.removeEventListener(Xf,p),c=null}},createHref(C){return t(o,C)},createURL:v,encodeLocation(C){let m=v(C);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:g,replace:w,go(C){return l.go(C)}};return b}var ep;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ep||(ep={}));function Mv(e,t,n){return n===void 0&&(n="/"),$v(e,t,n)}function $v(e,t,n,r){let o=typeof t=="string"?ko(t):t,s=ad(o.pathname||"/",n);if(s==null)return null;let l=Em(e);Av(l);let a=null;for(let c=0;a==null&&c<l.length;++c){let d=Yv(s);a=qv(l[c],d)}return a}function Em(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let o=(s,l,a)=>{let c={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:l,route:s};c.relativePath.startsWith("/")&&(Be(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let d=qn([r,c.relativePath]),x=n.concat(c);s.children&&s.children.length>0&&(Be(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Em(s.children,t,x,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Uv(d,s.index),routesMeta:x})};return e.forEach((s,l)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))o(s,l);else for(let c of _m(s.path))o(s,l,c)}),t}function _m(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return o?[s,""]:[s];let l=_m(r.join("/")),a=[];return a.push(...l.map(c=>c===""?s:[s,c].join("/"))),o&&a.push(...l),a.map(c=>e.startsWith("/")&&c===""?"/":c)}function Av(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Vv(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Ov=/^:[\w-]+$/,Nv=3,Lv=2,Dv=1,Bv=10,Fv=-2,tp=e=>e==="*";function Uv(e,t){let n=e.split("/"),r=n.length;return n.some(tp)&&(r+=Fv),t&&(r+=Lv),n.filter(o=>!tp(o)).reduce((o,s)=>o+(Ov.test(s)?Nv:s===""?Dv:Bv),r)}function Vv(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function qv(e,t,n){let{routesMeta:r}=e,o={},s="/",l=[];for(let a=0;a<r.length;++a){let c=r[a],d=a===r.length-1,x=s==="/"?t:t.slice(s.length)||"/",p=Hv({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},x),g=c.route;if(!p)return null;Object.assign(o,p.params),l.push({params:o,pathname:qn([s,p.pathname]),pathnameBase:Xv(qn([s,p.pathnameBase])),route:g}),p.pathnameBase!=="/"&&(s=qn([s,p.pathnameBase]))}return l}function Hv(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Wv(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let s=o[0],l=s.replace(/(.)\/+$/,"$1"),a=o.slice(1);return{params:r.reduce((d,x,p)=>{let{paramName:g,isOptional:w}=x;if(g==="*"){let b=a[p]||"";l=s.slice(0,s.length-b.length).replace(/(.)\/+$/,"$1")}const v=a[p];return w&&!v?d[g]=void 0:d[g]=(v||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:l,pattern:e}}function Wv(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ld(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,a,c)=>(r.push({paramName:a,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function Yv(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ld(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ad(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Gv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kv=e=>Gv.test(e);function Qv(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?ko(e):e,s;if(n)if(Kv(n))s=n;else{if(n.includes("//")){let l=n;n=n.replace(/\/\/+/g,"/"),ld(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+n))}n.startsWith("/")?s=np(n.substring(1),"/"):s=np(n,t)}else s=t;return{pathname:s,search:Zv(r),hash:e2(o)}}function np(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function ka(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Jv(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function cd(e,t){let n=Jv(e);return t?n.map((r,o)=>o===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function ud(e,t,n,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=ko(e):(o=zi({},e),Be(!o.pathname||!o.pathname.includes("?"),ka("?","pathname","search",o)),Be(!o.pathname||!o.pathname.includes("#"),ka("#","pathname","hash",o)),Be(!o.search||!o.search.includes("#"),ka("#","search","hash",o)));let s=e===""||o.pathname==="",l=s?"/":o.pathname,a;if(l==null)a=n;else{let p=t.length-1;if(!r&&l.startsWith("..")){let g=l.split("/");for(;g[0]==="..";)g.shift(),p-=1;o.pathname=g.join("/")}a=p>=0?t[p]:"/"}let c=Qv(o,a),d=l&&l!=="/"&&l.endsWith("/"),x=(s||l===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||x)&&(c.pathname+="/"),c}const qn=e=>e.join("/").replace(/\/\/+/g,"/"),Xv=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Zv=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,e2=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function t2(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Tm=["post","put","patch","delete"];new Set(Tm);const n2=["get",...Tm];new Set(n2);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ei(){return Ei=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ei.apply(this,arguments)}const dd=f.createContext(null),r2=f.createContext(null),Jn=f.createContext(null),Nl=f.createContext(null),Cn=f.createContext({outlet:null,matches:[],isDataRoute:!1}),Rm=f.createContext(null);function o2(e,t){let{relative:n}=t===void 0?{}:t;wo()||Be(!1);let{basename:r,navigator:o}=f.useContext(Jn),{hash:s,pathname:l,search:a}=Pm(e,{relative:n}),c=l;return r!=="/"&&(c=l==="/"?r:qn([r,l])),o.createHref({pathname:c,search:a,hash:s})}function wo(){return f.useContext(Nl)!=null}function Di(){return wo()||Be(!1),f.useContext(Nl).location}function Im(e){f.useContext(Jn).static||f.useLayoutEffect(e)}function zr(){let{isDataRoute:e}=f.useContext(Cn);return e?m2():i2()}function i2(){wo()||Be(!1);let e=f.useContext(dd),{basename:t,future:n,navigator:r}=f.useContext(Jn),{matches:o}=f.useContext(Cn),{pathname:s}=Di(),l=JSON.stringify(cd(o,n.v7_relativeSplatPath)),a=f.useRef(!1);return Im(()=>{a.current=!0}),f.useCallback(function(d,x){if(x===void 0&&(x={}),!a.current)return;if(typeof d=="number"){r.go(d);return}let p=ud(d,JSON.parse(l),s,x.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:qn([t,p.pathname])),(x.replace?r.replace:r.push)(p,x.state,x)},[t,r,l,s,e])}function fd(){let{matches:e}=f.useContext(Cn),t=e[e.length-1];return t?t.params:{}}function Pm(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=f.useContext(Jn),{matches:o}=f.useContext(Cn),{pathname:s}=Di(),l=JSON.stringify(cd(o,r.v7_relativeSplatPath));return f.useMemo(()=>ud(e,JSON.parse(l),s,n==="path"),[e,l,s,n])}function s2(e,t){return l2(e,t)}function l2(e,t,n,r){wo()||Be(!1);let{navigator:o}=f.useContext(Jn),{matches:s}=f.useContext(Cn),l=s[s.length-1],a=l?l.params:{};l&&l.pathname;let c=l?l.pathnameBase:"/";l&&l.route;let d=Di(),x;if(t){var p;let C=typeof t=="string"?ko(t):t;c==="/"||(p=C.pathname)!=null&&p.startsWith(c)||Be(!1),x=C}else x=d;let g=x.pathname||"/",w=g;if(c!=="/"){let C=c.replace(/^\//,"").split("/");w="/"+g.replace(/^\//,"").split("/").slice(C.length).join("/")}let v=Mv(e,{pathname:w}),b=f2(v&&v.map(C=>Object.assign({},C,{params:Object.assign({},a,C.params),pathname:qn([c,o.encodeLocation?o.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?c:qn([c,o.encodeLocation?o.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),s,n,r);return t&&b?f.createElement(Nl.Provider,{value:{location:Ei({pathname:"/",search:"",hash:"",state:null,key:"default"},x),navigationType:An.Pop}},b):b}function a2(){let e=x2(),t=t2(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),n?f.createElement("pre",{style:o},n):null,null)}const c2=f.createElement(a2,null);class u2 extends f.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?f.createElement(Cn.Provider,{value:this.props.routeContext},f.createElement(Rm.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function d2(e){let{routeContext:t,match:n,children:r}=e,o=f.useContext(dd);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),f.createElement(Cn.Provider,{value:t},r)}function f2(e,t,n,r){var o;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var s;if(!n)return null;if(n.errors)e=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let l=e,a=(o=n)==null?void 0:o.errors;if(a!=null){let x=l.findIndex(p=>p.route.id&&(a==null?void 0:a[p.route.id])!==void 0);x>=0||Be(!1),l=l.slice(0,Math.min(l.length,x+1))}let c=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let x=0;x<l.length;x++){let p=l[x];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(d=x),p.route.id){let{loaderData:g,errors:w}=n,v=p.route.loader&&g[p.route.id]===void 0&&(!w||w[p.route.id]===void 0);if(p.route.lazy||v){c=!0,d>=0?l=l.slice(0,d+1):l=[l[0]];break}}}return l.reduceRight((x,p,g)=>{let w,v=!1,b=null,C=null;n&&(w=a&&p.route.id?a[p.route.id]:void 0,b=p.route.errorElement||c2,c&&(d<0&&g===0?(y2("route-fallback"),v=!0,C=null):d===g&&(v=!0,C=p.route.hydrateFallbackElement||null)));let m=t.concat(l.slice(0,g+1)),h=()=>{let y;return w?y=b:v?y=C:p.route.Component?y=f.createElement(p.route.Component,null):p.route.element?y=p.route.element:y=x,f.createElement(d2,{match:p,routeContext:{outlet:x,matches:m,isDataRoute:n!=null},children:y})};return n&&(p.route.ErrorBoundary||p.route.errorElement||g===0)?f.createElement(u2,{location:n.location,revalidation:n.revalidation,component:b,error:w,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0}}):h()},null)}var Mm=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Mm||{}),$m=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}($m||{});function p2(e){let t=f.useContext(dd);return t||Be(!1),t}function h2(e){let t=f.useContext(r2);return t||Be(!1),t}function g2(e){let t=f.useContext(Cn);return t||Be(!1),t}function Am(e){let t=g2(),n=t.matches[t.matches.length-1];return n.route.id||Be(!1),n.route.id}function x2(){var e;let t=f.useContext(Rm),n=h2(),r=Am();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function m2(){let{router:e}=p2(Mm.UseNavigateStable),t=Am($m.UseNavigateStable),n=f.useRef(!1);return Im(()=>{n.current=!0}),f.useCallback(function(o,s){s===void 0&&(s={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,Ei({fromRouteId:t},s)))},[e,t])}const rp={};function y2(e,t,n){rp[e]||(rp[e]=!0)}function v2(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function k2(e){let{to:t,replace:n,state:r,relative:o}=e;wo()||Be(!1);let{future:s,static:l}=f.useContext(Jn),{matches:a}=f.useContext(Cn),{pathname:c}=Di(),d=zr(),x=ud(t,cd(a,s.v7_relativeSplatPath),c,o==="path"),p=JSON.stringify(x);return f.useEffect(()=>d(JSON.parse(p),{replace:n,state:r,relative:o}),[d,p,o,n,r]),null}function Pr(e){Be(!1)}function w2(e){let{basename:t="/",children:n=null,location:r,navigationType:o=An.Pop,navigator:s,static:l=!1,future:a}=e;wo()&&Be(!1);let c=t.replace(/^\/*/,"/"),d=f.useMemo(()=>({basename:c,navigator:s,static:l,future:Ei({v7_relativeSplatPath:!1},a)}),[c,a,s,l]);typeof r=="string"&&(r=ko(r));let{pathname:x="/",search:p="",hash:g="",state:w=null,key:v="default"}=r,b=f.useMemo(()=>{let C=ad(x,c);return C==null?null:{location:{pathname:C,search:p,hash:g,state:w,key:v},navigationType:o}},[c,x,p,g,w,v,o]);return b==null?null:f.createElement(Jn.Provider,{value:d},f.createElement(Nl.Provider,{children:n,value:b}))}function b2(e){let{children:t,location:n}=e;return s2(Gc(t),n)}new Promise(()=>{});function Gc(e,t){t===void 0&&(t=[]);let n=[];return f.Children.forEach(e,(r,o)=>{if(!f.isValidElement(r))return;let s=[...t,o];if(r.type===f.Fragment){n.push.apply(n,Gc(r.props.children,s));return}r.type!==Pr&&Be(!1),!r.props.index||!r.props.children||Be(!1);let l={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(l.children=Gc(r.props.children,s)),n.push(l)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Kc(){return Kc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Kc.apply(this,arguments)}function j2(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function S2(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function C2(e,t){return e.button===0&&(!t||t==="_self")&&!S2(e)}const z2=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],E2="6";try{window.__reactRouterVersion=E2}catch{}const _2="startTransition",op=y1[_2];function T2(e){let{basename:t,children:n,future:r,window:o}=e,s=f.useRef();s.current==null&&(s.current=Rv({window:o,v5Compat:!0}));let l=s.current,[a,c]=f.useState({action:l.action,location:l.location}),{v7_startTransition:d}=r||{},x=f.useCallback(p=>{d&&op?op(()=>c(p)):c(p)},[c,d]);return f.useLayoutEffect(()=>l.listen(x),[l,x]),f.useEffect(()=>v2(r),[r]),f.createElement(w2,{basename:t,children:n,location:a.location,navigationType:a.action,navigator:l,future:r})}const R2=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",I2=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Om=f.forwardRef(function(t,n){let{onClick:r,relative:o,reloadDocument:s,replace:l,state:a,target:c,to:d,preventScrollReset:x,viewTransition:p}=t,g=j2(t,z2),{basename:w}=f.useContext(Jn),v,b=!1;if(typeof d=="string"&&I2.test(d)&&(v=d,R2))try{let y=new URL(window.location.href),j=d.startsWith("//")?new URL(y.protocol+d):new URL(d),E=ad(j.pathname,w);j.origin===y.origin&&E!=null?d=E+j.search+j.hash:b=!0}catch{}let C=o2(d,{relative:o}),m=P2(d,{replace:l,state:a,target:c,preventScrollReset:x,relative:o,viewTransition:p});function h(y){r&&r(y),y.defaultPrevented||m(y)}return f.createElement("a",Kc({},g,{href:v||C,onClick:b||s?r:h,ref:n,target:c}))});var ip;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(ip||(ip={}));var sp;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(sp||(sp={}));function P2(e,t){let{target:n,replace:r,state:o,preventScrollReset:s,relative:l,viewTransition:a}=t===void 0?{}:t,c=zr(),d=Di(),x=Pm(e,{relative:l});return f.useCallback(p=>{if(C2(p,n)){p.preventDefault();let g=r!==void 0?r:gl(d)===gl(x);c(e,{replace:g,state:o,preventScrollReset:s,relative:l,viewTransition:a})}},[d,c,x,r,o,n,e,s,l,a])}var yt=function(){return yt=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},yt.apply(this,arguments)};function _i(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,s;r<o;r++)(s||!(r in t))&&(s||(s=Array.prototype.slice.call(t,0,r)),s[r]=t[r]);return e.concat(s||Array.prototype.slice.call(t))}var Re="-ms-",ai="-moz-",Se="-webkit-",Nm="comm",Ll="rule",pd="decl",M2="@import",Lm="@keyframes",$2="@layer",Dm=Math.abs,hd=String.fromCharCode,Qc=Object.assign;function A2(e,t){return Ke(e,0)^45?(((t<<2^Ke(e,0))<<2^Ke(e,1))<<2^Ke(e,2))<<2^Ke(e,3):0}function Bm(e){return e.trim()}function hn(e,t){return(e=t.exec(e))?e[0]:e}function pe(e,t,n){return e.replace(t,n)}function Ns(e,t,n){return e.indexOf(t,n)}function Ke(e,t){return e.charCodeAt(t)|0}function ao(e,t,n){return e.slice(t,n)}function rn(e){return e.length}function Fm(e){return e.length}function Jo(e,t){return t.push(e),e}function O2(e,t){return e.map(t).join("")}function lp(e,t){return e.filter(function(n){return!hn(n,t)})}var Dl=1,co=1,Um=0,Dt=0,Fe=0,bo="";function Bl(e,t,n,r,o,s,l,a){return{value:e,root:t,parent:n,type:r,props:o,children:s,line:Dl,column:co,length:l,return:"",siblings:a}}function _n(e,t){return Qc(Bl("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Tr(e){for(;e.root;)e=_n(e.root,{children:[e]});Jo(e,e.siblings)}function N2(){return Fe}function L2(){return Fe=Dt>0?Ke(bo,--Dt):0,co--,Fe===10&&(co=1,Dl--),Fe}function Xt(){return Fe=Dt<Um?Ke(bo,Dt++):0,co++,Fe===10&&(co=1,Dl++),Fe}function pr(){return Ke(bo,Dt)}function Ls(){return Dt}function Fl(e,t){return ao(bo,e,t)}function Jc(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function D2(e){return Dl=co=1,Um=rn(bo=e),Dt=0,[]}function B2(e){return bo="",e}function wa(e){return Bm(Fl(Dt-1,Xc(e===91?e+2:e===40?e+1:e)))}function F2(e){for(;(Fe=pr())&&Fe<33;)Xt();return Jc(e)>2||Jc(Fe)>3?"":" "}function U2(e,t){for(;--t&&Xt()&&!(Fe<48||Fe>102||Fe>57&&Fe<65||Fe>70&&Fe<97););return Fl(e,Ls()+(t<6&&pr()==32&&Xt()==32))}function Xc(e){for(;Xt();)switch(Fe){case e:return Dt;case 34:case 39:e!==34&&e!==39&&Xc(Fe);break;case 40:e===41&&Xc(e);break;case 92:Xt();break}return Dt}function V2(e,t){for(;Xt()&&e+Fe!==57;)if(e+Fe===84&&pr()===47)break;return"/*"+Fl(t,Dt-1)+"*"+hd(e===47?e:Xt())}function q2(e){for(;!Jc(pr());)Xt();return Fl(e,Dt)}function H2(e){return B2(Ds("",null,null,null,[""],e=D2(e),0,[0],e))}function Ds(e,t,n,r,o,s,l,a,c){for(var d=0,x=0,p=l,g=0,w=0,v=0,b=1,C=1,m=1,h=0,y="",j=o,E=s,k=r,_=y;C;)switch(v=h,h=Xt()){case 40:if(v!=108&&Ke(_,p-1)==58){Ns(_+=pe(wa(h),"&","&\f"),"&\f",Dm(d?a[d-1]:0))!=-1&&(m=-1);break}case 34:case 39:case 91:_+=wa(h);break;case 9:case 10:case 13:case 32:_+=F2(v);break;case 92:_+=U2(Ls()-1,7);continue;case 47:switch(pr()){case 42:case 47:Jo(W2(V2(Xt(),Ls()),t,n,c),c);break;default:_+="/"}break;case 123*b:a[d++]=rn(_)*m;case 125*b:case 59:case 0:switch(h){case 0:case 125:C=0;case 59+x:m==-1&&(_=pe(_,/\f/g,"")),w>0&&rn(_)-p&&Jo(w>32?cp(_+";",r,n,p-1,c):cp(pe(_," ","")+";",r,n,p-2,c),c);break;case 59:_+=";";default:if(Jo(k=ap(_,t,n,d,x,o,a,y,j=[],E=[],p,s),s),h===123)if(x===0)Ds(_,t,k,k,j,s,p,a,E);else switch(g===99&&Ke(_,3)===110?100:g){case 100:case 108:case 109:case 115:Ds(e,k,k,r&&Jo(ap(e,k,k,0,0,o,a,y,o,j=[],p,E),E),o,E,p,a,r?j:E);break;default:Ds(_,k,k,k,[""],E,0,a,E)}}d=x=w=0,b=m=1,y=_="",p=l;break;case 58:p=1+rn(_),w=v;default:if(b<1){if(h==123)--b;else if(h==125&&b++==0&&L2()==125)continue}switch(_+=hd(h),h*b){case 38:m=x>0?1:(_+="\f",-1);break;case 44:a[d++]=(rn(_)-1)*m,m=1;break;case 64:pr()===45&&(_+=wa(Xt())),g=pr(),x=p=rn(y=_+=q2(Ls())),h++;break;case 45:v===45&&rn(_)==2&&(b=0)}}return s}function ap(e,t,n,r,o,s,l,a,c,d,x,p){for(var g=o-1,w=o===0?s:[""],v=Fm(w),b=0,C=0,m=0;b<r;++b)for(var h=0,y=ao(e,g+1,g=Dm(C=l[b])),j=e;h<v;++h)(j=Bm(C>0?w[h]+" "+y:pe(y,/&\f/g,w[h])))&&(c[m++]=j);return Bl(e,t,n,o===0?Ll:a,c,d,x,p)}function W2(e,t,n,r){return Bl(e,t,n,Nm,hd(N2()),ao(e,2,-2),0,r)}function cp(e,t,n,r,o){return Bl(e,t,n,pd,ao(e,0,r),ao(e,r+1,-1),r,o)}function Vm(e,t,n){switch(A2(e,t)){case 5103:return Se+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Se+e+e;case 4789:return ai+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Se+e+ai+e+Re+e+e;case 5936:switch(Ke(e,t+11)){case 114:return Se+e+Re+pe(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Se+e+Re+pe(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Se+e+Re+pe(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Se+e+Re+e+e;case 6165:return Se+e+Re+"flex-"+e+e;case 5187:return Se+e+pe(e,/(\w+).+(:[^]+)/,Se+"box-$1$2"+Re+"flex-$1$2")+e;case 5443:return Se+e+Re+"flex-item-"+pe(e,/flex-|-self/g,"")+(hn(e,/flex-|baseline/)?"":Re+"grid-row-"+pe(e,/flex-|-self/g,""))+e;case 4675:return Se+e+Re+"flex-line-pack"+pe(e,/align-content|flex-|-self/g,"")+e;case 5548:return Se+e+Re+pe(e,"shrink","negative")+e;case 5292:return Se+e+Re+pe(e,"basis","preferred-size")+e;case 6060:return Se+"box-"+pe(e,"-grow","")+Se+e+Re+pe(e,"grow","positive")+e;case 4554:return Se+pe(e,/([^-])(transform)/g,"$1"+Se+"$2")+e;case 6187:return pe(pe(pe(e,/(zoom-|grab)/,Se+"$1"),/(image-set)/,Se+"$1"),e,"")+e;case 5495:case 3959:return pe(e,/(image-set\([^]*)/,Se+"$1$`$1");case 4968:return pe(pe(e,/(.+:)(flex-)?(.*)/,Se+"box-pack:$3"+Re+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Se+e+e;case 4200:if(!hn(e,/flex-|baseline/))return Re+"grid-column-align"+ao(e,t)+e;break;case 2592:case 3360:return Re+pe(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,hn(r.props,/grid-\w+-end/)})?~Ns(e+(n=n[t].value),"span",0)?e:Re+pe(e,"-start","")+e+Re+"grid-row-span:"+(~Ns(n,"span",0)?hn(n,/\d+/):+hn(n,/\d+/)-+hn(e,/\d+/))+";":Re+pe(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return hn(r.props,/grid-\w+-start/)})?e:Re+pe(pe(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return pe(e,/(.+)-inline(.+)/,Se+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(rn(e)-1-t>6)switch(Ke(e,t+1)){case 109:if(Ke(e,t+4)!==45)break;case 102:return pe(e,/(.+:)(.+)-([^]+)/,"$1"+Se+"$2-$3$1"+ai+(Ke(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ns(e,"stretch",0)?Vm(pe(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return pe(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,s,l,a,c,d){return Re+o+":"+s+d+(l?Re+o+"-span:"+(a?c:+c-+s)+d:"")+e});case 4949:if(Ke(e,t+6)===121)return pe(e,":",":"+Se)+e;break;case 6444:switch(Ke(e,Ke(e,14)===45?18:11)){case 120:return pe(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Se+(Ke(e,14)===45?"inline-":"")+"box$3$1"+Se+"$2$3$1"+Re+"$2box$3")+e;case 100:return pe(e,":",":"+Re)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return pe(e,"scroll-","scroll-snap-")+e}return e}function xl(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Y2(e,t,n,r){switch(e.type){case $2:if(e.children.length)break;case M2:case pd:return e.return=e.return||e.value;case Nm:return"";case Lm:return e.return=e.value+"{"+xl(e.children,r)+"}";case Ll:if(!rn(e.value=e.props.join(",")))return""}return rn(n=xl(e.children,r))?e.return=e.value+"{"+n+"}":""}function G2(e){var t=Fm(e);return function(n,r,o,s){for(var l="",a=0;a<t;a++)l+=e[a](n,r,o,s)||"";return l}}function K2(e){return function(t){t.root||(t=t.return)&&e(t)}}function Q2(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case pd:e.return=Vm(e.value,e.length,n);return;case Lm:return xl([_n(e,{value:pe(e.value,"@","@"+Se)})],r);case Ll:if(e.length)return O2(n=e.props,function(o){switch(hn(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Tr(_n(e,{props:[pe(o,/:(read-\w+)/,":"+ai+"$1")]})),Tr(_n(e,{props:[o]})),Qc(e,{props:lp(n,r)});break;case"::placeholder":Tr(_n(e,{props:[pe(o,/:(plac\w+)/,":"+Se+"input-$1")]})),Tr(_n(e,{props:[pe(o,/:(plac\w+)/,":"+ai+"$1")]})),Tr(_n(e,{props:[pe(o,/:(plac\w+)/,Re+"input-$1")]})),Tr(_n(e,{props:[o]})),Qc(e,{props:lp(n,r)});break}return""})}}var J2={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},bt={},uo=typeof process<"u"&&bt!==void 0&&(bt.REACT_APP_SC_ATTR||bt.SC_ATTR)||"data-styled",qm="active",Hm="data-styled-version",Ul="6.1.19",gd=`/*!sc*/
`,ml=typeof window<"u"&&typeof document<"u",X2=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&bt!==void 0&&bt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&bt.REACT_APP_SC_DISABLE_SPEEDY!==""?bt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&bt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&bt!==void 0&&bt.SC_DISABLE_SPEEDY!==void 0&&bt.SC_DISABLE_SPEEDY!==""&&bt.SC_DISABLE_SPEEDY!=="false"&&bt.SC_DISABLE_SPEEDY),Vl=Object.freeze([]),fo=Object.freeze({});function Z2(e,t,n){return n===void 0&&(n=fo),e.theme!==n.theme&&e.theme||t||n.theme}var Wm=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),ek=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,tk=/(^-|-$)/g;function up(e){return e.replace(ek,"-").replace(tk,"")}var nk=/(a)(d)/gi,ls=52,dp=function(e){return String.fromCharCode(e+(e>25?39:97))};function Zc(e){var t,n="";for(t=Math.abs(e);t>ls;t=t/ls|0)n=dp(t%ls)+n;return(dp(t%ls)+n).replace(nk,"$1-$2")}var ba,Ym=5381,Hr=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Gm=function(e){return Hr(Ym,e)};function Km(e){return Zc(Gm(e)>>>0)}function rk(e){return e.displayName||e.name||"Component"}function ja(e){return typeof e=="string"&&!0}var Qm=typeof Symbol=="function"&&Symbol.for,Jm=Qm?Symbol.for("react.memo"):60115,ok=Qm?Symbol.for("react.forward_ref"):60112,ik={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},sk={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Xm={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},lk=((ba={})[ok]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ba[Jm]=Xm,ba);function fp(e){return("type"in(t=e)&&t.type.$$typeof)===Jm?Xm:"$$typeof"in e?lk[e.$$typeof]:ik;var t}var ak=Object.defineProperty,ck=Object.getOwnPropertyNames,pp=Object.getOwnPropertySymbols,uk=Object.getOwnPropertyDescriptor,dk=Object.getPrototypeOf,hp=Object.prototype;function Zm(e,t,n){if(typeof t!="string"){if(hp){var r=dk(t);r&&r!==hp&&Zm(e,r,n)}var o=ck(t);pp&&(o=o.concat(pp(t)));for(var s=fp(e),l=fp(t),a=0;a<o.length;++a){var c=o[a];if(!(c in sk||n&&n[c]||l&&c in l||s&&c in s)){var d=uk(t,c);try{ak(e,c,d)}catch{}}}}return e}function po(e){return typeof e=="function"}function xd(e){return typeof e=="object"&&"styledComponentId"in e}function cr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function eu(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Ti(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function tu(e,t,n){if(n===void 0&&(n=!1),!n&&!Ti(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=tu(e[r],t[r]);else if(Ti(t))for(var r in t)e[r]=tu(e[r],t[r]);return e}function md(e,t){Object.defineProperty(e,"toString",{value:t})}function Bi(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var fk=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,s=o;t>=s;)if((s<<=1)<0)throw Bi(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(r),this.length=s;for(var l=o;l<s;l++)this.groupSizes[l]=0}for(var a=this.indexOfGroup(t+1),c=(l=0,n.length);l<c;l++)this.tag.insertRule(a,n[l])&&(this.groupSizes[t]++,a++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var s=r;s<o;s++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),s=o+r,l=o;l<s;l++)n+="".concat(this.tag.getRule(l)).concat(gd);return n},e}(),Bs=new Map,yl=new Map,Fs=1,as=function(e){if(Bs.has(e))return Bs.get(e);for(;yl.has(Fs);)Fs++;var t=Fs++;return Bs.set(e,t),yl.set(t,e),t},pk=function(e,t){Fs=t+1,Bs.set(e,t),yl.set(t,e)},hk="style[".concat(uo,"][").concat(Hm,'="').concat(Ul,'"]'),gk=new RegExp("^".concat(uo,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),xk=function(e,t,n){for(var r,o=n.split(","),s=0,l=o.length;s<l;s++)(r=o[s])&&e.registerName(t,r)},mk=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(gd),o=[],s=0,l=r.length;s<l;s++){var a=r[s].trim();if(a){var c=a.match(gk);if(c){var d=0|parseInt(c[1],10),x=c[2];d!==0&&(pk(x,d),xk(e,x,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(a)}}},gp=function(e){for(var t=document.querySelectorAll(hk),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(uo)!==qm&&(mk(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function yk(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var e0=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(a){var c=Array.from(a.querySelectorAll("style[".concat(uo,"]")));return c[c.length-1]}(n),s=o!==void 0?o.nextSibling:null;r.setAttribute(uo,qm),r.setAttribute(Hm,Ul);var l=yk();return l&&r.setAttribute("nonce",l),n.insertBefore(r,s),r},vk=function(){function e(t){this.element=e0(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,s=r.length;o<s;o++){var l=r[o];if(l.ownerNode===n)return l}throw Bi(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),kk=function(){function e(t){this.element=e0(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),wk=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),xp=ml,bk={isServer:!ml,useCSSOMInjection:!X2},t0=function(){function e(t,n,r){t===void 0&&(t=fo),n===void 0&&(n={});var o=this;this.options=yt(yt({},bk),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&ml&&xp&&(xp=!1,gp(this)),md(this,function(){return function(s){for(var l=s.getTag(),a=l.length,c="",d=function(p){var g=function(m){return yl.get(m)}(p);if(g===void 0)return"continue";var w=s.names.get(g),v=l.getGroup(p);if(w===void 0||!w.size||v.length===0)return"continue";var b="".concat(uo,".g").concat(p,'[id="').concat(g,'"]'),C="";w!==void 0&&w.forEach(function(m){m.length>0&&(C+="".concat(m,","))}),c+="".concat(v).concat(b,'{content:"').concat(C,'"}').concat(gd)},x=0;x<a;x++)d(x);return c}(o)})}return e.registerId=function(t){return as(t)},e.prototype.rehydrate=function(){!this.server&&ml&&gp(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(yt(yt({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new wk(o):r?new vk(o):new kk(o)}(this.options),new fk(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(as(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(as(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(as(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),jk=/&/g,Sk=/^\s*\/\/.*$/gm;function n0(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=n0(n.children,t)),n})}function Ck(e){var t,n,r,o=fo,s=o.options,l=s===void 0?fo:s,a=o.plugins,c=a===void 0?Vl:a,d=function(g,w,v){return v.startsWith(n)&&v.endsWith(n)&&v.replaceAll(n,"").length>0?".".concat(t):g},x=c.slice();x.push(function(g){g.type===Ll&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(jk,n).replace(r,d))}),l.prefix&&x.push(Q2),x.push(Y2);var p=function(g,w,v,b){w===void 0&&(w=""),v===void 0&&(v=""),b===void 0&&(b="&"),t=b,n=w,r=new RegExp("\\".concat(n,"\\b"),"g");var C=g.replace(Sk,""),m=H2(v||w?"".concat(v," ").concat(w," { ").concat(C," }"):C);l.namespace&&(m=n0(m,l.namespace));var h=[];return xl(m,G2(x.concat(K2(function(y){return h.push(y)})))),h};return p.hash=c.length?c.reduce(function(g,w){return w.name||Bi(15),Hr(g,w.name)},Ym).toString():"",p}var zk=new t0,nu=Ck(),r0=Ct.createContext({shouldForwardProp:void 0,styleSheet:zk,stylis:nu});r0.Consumer;Ct.createContext(void 0);function mp(){return f.useContext(r0)}var o0=function(){function e(t,n){var r=this;this.inject=function(o,s){s===void 0&&(s=nu);var l=r.name+s.hash;o.hasNameForId(r.id,l)||o.insertRules(r.id,l,s(r.rules,l,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,md(this,function(){throw Bi(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=nu),this.name+t.hash},e}(),Ek=function(e){return e>="A"&&e<="Z"};function yp(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Ek(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var i0=function(e){return e==null||e===!1||e===""},s0=function(e){var t,n,r=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!i0(s)&&(Array.isArray(s)&&s.isCss||po(s)?r.push("".concat(yp(o),":"),s,";"):Ti(s)?r.push.apply(r,_i(_i(["".concat(o," {")],s0(s),!1),["}"],!1)):r.push("".concat(yp(o),": ").concat((t=o,(n=s)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in J2||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function hr(e,t,n,r){if(i0(e))return[];if(xd(e))return[".".concat(e.styledComponentId)];if(po(e)){if(!po(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return hr(o,t,n,r)}var s;return e instanceof o0?n?(e.inject(n,r),[e.getName(r)]):[e]:Ti(e)?s0(e):Array.isArray(e)?Array.prototype.concat.apply(Vl,e.map(function(l){return hr(l,t,n,r)})):[e.toString()]}function _k(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(po(n)&&!xd(n))return!1}return!0}var Tk=Gm(Ul),Rk=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&_k(t),this.componentId=n,this.baseHash=Hr(Tk,n),this.baseStyle=r,t0.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=cr(o,this.staticRulesId);else{var s=eu(hr(this.rules,t,n,r)),l=Zc(Hr(this.baseHash,s)>>>0);if(!n.hasNameForId(this.componentId,l)){var a=r(s,".".concat(l),void 0,this.componentId);n.insertRules(this.componentId,l,a)}o=cr(o,l),this.staticRulesId=l}else{for(var c=Hr(this.baseHash,r.hash),d="",x=0;x<this.rules.length;x++){var p=this.rules[x];if(typeof p=="string")d+=p;else if(p){var g=eu(hr(p,t,n,r));c=Hr(c,g+x),d+=g}}if(d){var w=Zc(c>>>0);n.hasNameForId(this.componentId,w)||n.insertRules(this.componentId,w,r(d,".".concat(w),void 0,this.componentId)),o=cr(o,w)}}return o},e}(),l0=Ct.createContext(void 0);l0.Consumer;var Sa={};function Ik(e,t,n){var r=xd(e),o=e,s=!ja(e),l=t.attrs,a=l===void 0?Vl:l,c=t.componentId,d=c===void 0?function(j,E){var k=typeof j!="string"?"sc":up(j);Sa[k]=(Sa[k]||0)+1;var _="".concat(k,"-").concat(Km(Ul+k+Sa[k]));return E?"".concat(E,"-").concat(_):_}(t.displayName,t.parentComponentId):c,x=t.displayName,p=x===void 0?function(j){return ja(j)?"styled.".concat(j):"Styled(".concat(rk(j),")")}(e):x,g=t.displayName&&t.componentId?"".concat(up(t.displayName),"-").concat(t.componentId):t.componentId||d,w=r&&o.attrs?o.attrs.concat(a).filter(Boolean):a,v=t.shouldForwardProp;if(r&&o.shouldForwardProp){var b=o.shouldForwardProp;if(t.shouldForwardProp){var C=t.shouldForwardProp;v=function(j,E){return b(j,E)&&C(j,E)}}else v=b}var m=new Rk(n,g,r?o.componentStyle:void 0);function h(j,E){return function(k,_,R){var D=k.attrs,O=k.componentStyle,S=k.defaultProps,A=k.foldedComponentIds,ne=k.styledComponentId,N=k.target,X=Ct.useContext(l0),Z=mp(),H=k.shouldForwardProp||Z.shouldForwardProp,P=Z2(_,X,S)||fo,Y=function(ue,ge,ae){for(var re,J=yt(yt({},ge),{className:void 0,theme:ae}),je=0;je<ue.length;je+=1){var Ne=po(re=ue[je])?re(J):re;for(var _e in Ne)J[_e]=_e==="className"?cr(J[_e],Ne[_e]):_e==="style"?yt(yt({},J[_e]),Ne[_e]):Ne[_e]}return ge.className&&(J.className=cr(J.className,ge.className)),J}(D,_,P),I=Y.as||N,W={};for(var ie in Y)Y[ie]===void 0||ie[0]==="$"||ie==="as"||ie==="theme"&&Y.theme===P||(ie==="forwardedAs"?W.as=Y.forwardedAs:H&&!H(ie,I)||(W[ie]=Y[ie]));var T=function(ue,ge){var ae=mp(),re=ue.generateAndInjectStyles(ge,ae.styleSheet,ae.stylis);return re}(O,Y),Q=cr(A,ne);return T&&(Q+=" "+T),Y.className&&(Q+=" "+Y.className),W[ja(I)&&!Wm.has(I)?"class":"className"]=Q,R&&(W.ref=R),f.createElement(I,W)}(y,j,E)}h.displayName=p;var y=Ct.forwardRef(h);return y.attrs=w,y.componentStyle=m,y.displayName=p,y.shouldForwardProp=v,y.foldedComponentIds=r?cr(o.foldedComponentIds,o.styledComponentId):"",y.styledComponentId=g,y.target=r?o.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(j){this._foldedDefaultProps=r?function(E){for(var k=[],_=1;_<arguments.length;_++)k[_-1]=arguments[_];for(var R=0,D=k;R<D.length;R++)tu(E,D[R],!0);return E}({},o.defaultProps,j):j}}),md(y,function(){return".".concat(y.styledComponentId)}),s&&Zm(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function vp(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var kp=function(e){return Object.assign(e,{isCss:!0})};function Wr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(po(e)||Ti(e))return kp(hr(vp(Vl,_i([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?hr(r):kp(hr(vp(r,t)))}function ru(e,t,n){if(n===void 0&&(n=fo),!t)throw Bi(1,t);var r=function(o){for(var s=[],l=1;l<arguments.length;l++)s[l-1]=arguments[l];return e(t,n,Wr.apply(void 0,_i([o],s,!1)))};return r.attrs=function(o){return ru(e,t,yt(yt({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return ru(e,t,yt(yt({},n),o))},r}var a0=function(e){return ru(Ik,e)},u=a0;Wm.forEach(function(e){u[e]=a0(e)});function Xn(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=eu(Wr.apply(void 0,_i([e],t,!1))),o=Km(r);return new o0(o,r)}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pk={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mk=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),G=(e,t)=>{const n=f.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:a="",children:c,...d},x)=>f.createElement("svg",{ref:x,...Pk,width:o,height:o,stroke:r,strokeWidth:l?Number(s)*24/Number(o):s,className:["lucide",`lucide-${Mk(e)}`,a].join(" "),...d},[...t.map(([p,g])=>f.createElement(p,g)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=G("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $k=G("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ak=G("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ok=G("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nk=G("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wp=G("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vl=G("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lk=G("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dk=G("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=G("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=G("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ca=G("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const za=G("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=G("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=G("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bk=G("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fk=G("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uk=G("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ou=G("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vk=G("FileVideo",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qk=G("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd=G("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hk=G("Hand",[["path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0",key:"aigmz7"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2",key:"1n6bmn"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8",key:"a9iiix"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=G("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wk=G("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yk=G("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gk=G("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bp=G("ListVideo",[["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}],["path",{d:"m16 12 5 3-5 3v-6Z",key:"zpskkp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=G("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const go=G("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kk=G("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qk=G("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jk=G("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=G("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xk=G("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=G("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=G("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=G("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zk=G("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=G("MonitorOff",[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",key:"k0q8oc"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9",key:"cp1ac0"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=G("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ew=G("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tw=G("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nw=G("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jp=G("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ql=G("PhoneOff",[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",key:"z86iuo"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22",key:"11kh81"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=G("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=G("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ri=G("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rw=G("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=G("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ow=G("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iw=G("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ii=G("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sw=G("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lw=G("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aw=G("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=G("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=G("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=G("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cw=G("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=G("UserMinus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=G("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=G("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=G("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0=G("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=G("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zr=G("VideoOff",[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8",key:"ubwiq0"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z",key:"1l10zd"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=G("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=G("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uw=G("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=G("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=G("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dw=G("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),x0=f.createContext(),fw=()=>{const e=f.useContext(x0);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},pw=({children:e})=>{const[t,n]=f.useState(()=>localStorage.getItem("theme")||"dark");f.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},[t]);const r=l=>{n(l)},o={dark:{name:"Dark",colors:{primary:"#5865f2",background:"#36393f",secondary:"#2f3136",tertiary:"#202225",text:"#dcddde",textSecondary:"#b9bbbe",textMuted:"#72767d",border:"#40444b",hover:"rgba(255, 255, 255, 0.1)",active:"rgba(88, 101, 242, 0.1)",success:"#43b581",warning:"#faa61a",danger:"#f04747",input:"#40444b",placeholder:"#72767d"}},light:{name:"Light",colors:{primary:"#5865f2",background:"#ffffff",secondary:"#f2f3f5",tertiary:"#e3e5e8",text:"#2e3338",textSecondary:"#4f5660",textMuted:"#747f8d",border:"#e3e5e8",hover:"rgba(0, 0, 0, 0.05)",active:"rgba(88, 101, 242, 0.1)",success:"#3ba55c",warning:"#faa61a",danger:"#ed4245",input:"#ebedef",placeholder:"#747f8d"}}},s=o[t]||o.dark;return i.jsx(x0.Provider,{value:{theme:t,currentTheme:s,themes:o,toggleTheme:r},children:e})},hw=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10003;
  display: flex;
  align-items: center;
  justify-content: center;
`,gw=u.div`
  background-color: var(--secondary-color);
  border-radius: 8px;
  width: 740px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,xw=u.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,mw=u.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
`,yw=u.button`
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }
`,vw=u.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,kw=u.div`
  width: 240px;
  background-color: #202225;
  padding: 8px 0;
`,ww=u.div`
  padding: 8px 16px;
  color: ${e=>e.active?"#fff":"#b9bbbe"};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  ${e=>e.active&&`
    background-color: #5865f2;
    color: #fff;
    border-radius: 4px;
  `}
`,bw=u.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`,er=u.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`,Rr=u.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.4;
`,tr=u.div`
  margin-bottom: 32px;
`,st=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #40444b;
`,lt=u.div`
  color: #dcddde;
  font-size: 16px;
  font-weight: 500;
`,at=u.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-top: 4px;
`,Mo=u.label`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${e=>e.checked?"#5865f2":"#72767d"};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`,$o=u.div`
  position: absolute;
  top: 2px;
  left: ${e=>e.checked?"22px":"2px"};
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.2s ease;
`,En=u.select`
  background-color: #40444b;
  color: #dcddde;
  border: 1px solid #202225;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #5865f2;
  }
`,Ia=u.input`
  background-color: #40444b;
  color: #dcddde;
  border: 1px solid #202225;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #5865f2;
  }
`;u.button`
  background-color: #5865f2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4752c4;
  }
`;const jw=u.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`,Sw=u.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`,Cw=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,zw=u.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff;
`,Pa=u.div`
  margin-bottom: 20px;
`,Ma=u.div`
  color: #b9bbbe;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`,$a=u.input`
  width: 100%;
  box-sizing: border-box;
  background: #40444b;
  color: #dcddde;
  border: 1px solid #202225;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #5865f2;
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`,Ew=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`,_w=u.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: #5865f2;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  &:hover {
    background: #4752c4;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,zp=u.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${e=>e.$error?"#f04747":"#43b581"};
`,Tw=({isOpen:e,onClose:t})=>{const{theme:n,toggleTheme:r}=fw(),[o,s]=f.useState("my-account"),[l,a]=f.useState({inputDevice:"default",outputDevice:"default",autoInputSensitivity:!0,noiseSuppression:!0,desktopNotifications:!0,soundNotifications:!0,theme:n,messageDisplay:"compact",twoFactorAuth:!1,privacyMode:"friends",language:"en-US",region:"US"}),c="http://localhost:3000",[d,x]=f.useState({nickname:"",username:"",phone:"",avatar:""}),[p,g]=f.useState(!1),[w,v]=f.useState(!1),[b,C]=f.useState(null),[m,h]=f.useState(!1),y=f.useRef(null);f.useEffect(()=>{e&&o==="my-account"&&E()},[e,o]);const j=()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}),E=async()=>{g(!0);try{const I=await fetch(`${c}/users/me`,{headers:j()});if(I.ok){const W=await I.json();x({nickname:W.nickname||"",username:W.username||"",phone:W.phone||"",avatar:W.avatar||""})}}catch{}g(!1)},k=async()=>{v(!0),C(null);try{const I=await fetch(`${c}/users/me`,{method:"PATCH",headers:j(),body:JSON.stringify(d)});if(I.ok){const W=await I.json(),ie=JSON.parse(localStorage.getItem("user")||"{}");localStorage.setItem("user",JSON.stringify({...ie,...W})),C("ok")}else{const W=await I.json().catch(()=>null);C((W==null?void 0:W.message)||"Xatolik yuz berdi")}}catch{C("Tarmoq xatosi yuz berdi")}v(!1),setTimeout(()=>C(null),3e3)},_=()=>{y.current&&y.current.click()},R=async I=>{var T;const W=(T=I.target.files)==null?void 0:T[0];if(!W)return;if(W.size>2*1024*1024){alert("Fayl hajmi juda katta (maksimum 2MB)");return}h(!0),C(null);const ie=new FormData;ie.append("file",W);try{const Q=await fetch(`${c}/users/avatar`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:ie});if(Q.ok){const ue=await Q.json();x(ae=>({...ae,avatar:ue.avatar}));const ge=JSON.parse(localStorage.getItem("user")||"{}");localStorage.setItem("user",JSON.stringify({...ge,...ue})),C("Avatar yuklandi!"),setTimeout(()=>C(null),3e3)}else{const ue=await Q.json().catch(()=>({}));alert(ue.message||"Avatar yuklashda xatolik")}}catch(Q){console.error("Upload error:",Q),alert("Tarmoq xatosi yuz berdi")}finally{h(!1)}},D=[{id:"my-account",label:"My Account",icon:Pi},{id:"voice-video",label:"Voice & Video",icon:ur},{id:"notifications",label:"Notifications",icon:Nk},{id:"appearance",label:"Appearance",icon:tw},{id:"privacy",label:"Privacy & Security",icon:Ii},{id:"language",label:"Language & Region",icon:qk},{id:"keybinds",label:"Keybinds",icon:Wk}],O=I=>{a(W=>({...W,[I]:!W[I]}))},S=(I,W)=>{a(ie=>({...ie,[I]:W})),I==="theme"&&r(W)},A=()=>p?i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,color:"#b9bbbe",paddingTop:40},children:[i.jsx(xr,{size:18,style:{animation:"spin 1s linear infinite"}}),i.jsx("span",{children:"Yuklanmoqda…"})]}):i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"My Account"}),i.jsx("input",{type:"file",ref:y,style:{display:"none"},accept:"image/*",onChange:R}),i.jsxs(Sw,{onClick:_,title:"Rasm yuklash",children:[i.jsx(Cw,{children:m?i.jsx(xr,{size:32,style:{animation:"spin 1s linear infinite"}}):d.avatar?i.jsx("img",{src:d.avatar,alt:"avatar"}):(d.nickname||d.username||"?").charAt(0).toUpperCase()}),i.jsx(zw,{children:i.jsx(Lk,{size:22})})]}),i.jsxs(Pa,{children:[i.jsx(Ma,{children:"Nickname"}),i.jsx($a,{value:d.nickname,onChange:I=>x(W=>({...W,nickname:I.target.value})),placeholder:"Nickname"})]}),i.jsxs(Pa,{children:[i.jsx(Ma,{children:"Username"}),i.jsx($a,{value:d.username,onChange:I=>x(W=>({...W,username:I.target.value})),placeholder:"username"})]}),i.jsxs(Pa,{children:[i.jsx(Ma,{children:"Telefon raqam"}),i.jsx($a,{value:d.phone,onChange:I=>x(W=>({...W,phone:I.target.value})),placeholder:"+998 90 000 00 00"})]}),i.jsxs(Ew,{children:[i.jsxs(_w,{onClick:k,disabled:w,children:[w?i.jsx(xr,{size:14}):i.jsx(ho,{size:14}),w?"Saqlanmoqda…":"Saqlash"]}),b==="ok"&&i.jsxs(zp,{children:[i.jsx(ho,{size:13}),"Muvaffaqiyatli saqlandi!"]}),b&&b!=="ok"&&i.jsxs(zp,{$error:!0,children:[i.jsx(c0,{size:13}),b]})]})]}),ne=()=>i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"Voice & Video"}),i.jsx(Rr,{children:"Configure your input and output devices for voice and video."}),i.jsxs(tr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"INPUT DEVICE"}),i.jsx(at,{children:"Choose your microphone"})]}),i.jsxs(En,{value:l.inputDevice,onChange:I=>S("inputDevice",I.target.value),children:[i.jsx("option",{value:"default",children:"Default Microphone"}),i.jsx("option",{value:"mic1",children:"Built-in Microphone"}),i.jsx("option",{value:"mic2",children:"USB Microphone"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"OUTPUT DEVICE"}),i.jsx(at,{children:"Choose your speakers"})]}),i.jsxs(En,{value:l.outputDevice,onChange:I=>S("outputDevice",I.target.value),children:[i.jsx("option",{value:"default",children:"Default Speakers"}),i.jsx("option",{value:"speakers1",children:"Built-in Speakers"}),i.jsx("option",{value:"speakers2",children:"USB Headphones"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"VIDEO DEVICE"}),i.jsx(at,{children:"Choose your camera"})]}),i.jsxs(En,{value:l.videoDevice,onChange:I=>S("videoDevice",I.target.value),children:[i.jsx("option",{value:"default",children:"Default Camera"}),i.jsx("option",{value:"camera1",children:"Built-in Camera"}),i.jsx("option",{value:"camera2",children:"USB Camera"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"AUTOMATIC INPUT SENSITIVITY"}),i.jsx(at,{children:"Automatically adjust input volume"})]}),i.jsxs(Mo,{checked:l.autoInputSensitivity,children:[i.jsx("input",{type:"checkbox",checked:l.autoInputSensitivity,onChange:()=>O("autoInputSensitivity")}),i.jsx($o,{checked:l.autoInputSensitivity})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"NOISE SUPPRESSION"}),i.jsx(at,{children:"Remove background noise from your voice"})]}),i.jsxs(Mo,{checked:l.noiseSuppression,children:[i.jsx("input",{type:"checkbox",checked:l.noiseSuppression,onChange:()=>O("noiseSuppression")}),i.jsx($o,{checked:l.noiseSuppression})]})]})]})]}),N=()=>i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"Notifications"}),i.jsx(Rr,{children:"Manage how you receive notifications."}),i.jsxs(tr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"DESKTOP NOTIFICATIONS"}),i.jsx(at,{children:"Show notifications on your desktop"})]}),i.jsxs(Mo,{checked:l.desktopNotifications,children:[i.jsx("input",{type:"checkbox",checked:l.desktopNotifications,onChange:()=>O("desktopNotifications")}),i.jsx($o,{checked:l.desktopNotifications})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"SOUND NOTIFICATIONS"}),i.jsx(at,{children:"Play sound when you receive a message"})]}),i.jsxs(Mo,{checked:l.soundNotifications,children:[i.jsx("input",{type:"checkbox",checked:l.soundNotifications,onChange:()=>O("soundNotifications")}),i.jsx($o,{checked:l.soundNotifications})]})]})]})]}),X=()=>i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"Appearance"}),i.jsx(Rr,{children:"Customize how Jamm looks on your device."}),i.jsxs(tr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"THEME"}),i.jsx(at,{children:"Choose your preferred color theme"})]}),i.jsxs(En,{value:l.theme,onChange:I=>S("theme",I.target.value),children:[i.jsx("option",{value:"dark",children:"Dark"}),i.jsx("option",{value:"light",children:"Light"}),i.jsx("option",{value:"auto",children:"Auto"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"MESSAGE DISPLAY"}),i.jsx(at,{children:"Choose how messages are displayed"})]}),i.jsxs(En,{value:l.messageDisplay,onChange:I=>S("messageDisplay",I.target.value),children:[i.jsx("option",{value:"compact",children:"Compact"}),i.jsx("option",{value:"cozy",children:"Cozy"}),i.jsx("option",{value:"roomy",children:"Roomy"})]})]})]})]}),Z=()=>i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"Privacy & Security"}),i.jsx(Rr,{children:"Manage your privacy and security settings."}),i.jsxs(tr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"TWO-FACTOR AUTHENTICATION"}),i.jsx(at,{children:"Add an extra layer of security to your account"})]}),i.jsxs(Mo,{checked:l.twoFactorAuth,children:[i.jsx("input",{type:"checkbox",checked:l.twoFactorAuth,onChange:()=>O("twoFactorAuth")}),i.jsx($o,{checked:l.twoFactorAuth})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"PRIVACY MODE"}),i.jsx(at,{children:"Control who can contact you"})]}),i.jsxs(En,{value:l.privacyMode,onChange:I=>S("privacyMode",I.target.value),children:[i.jsx("option",{value:"everyone",children:"Everyone"}),i.jsx("option",{value:"friends",children:"Friends of Friends"}),i.jsx("option",{value:"friends",children:"Friends Only"})]})]})]}),i.jsx(tr,{children:i.jsxs(jw,{onClick:()=>alert("Log out functionality"),children:[i.jsx(Qk,{size:16,style:{marginRight:"8px"}}),"Log Out"]})})]}),H=()=>i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"Language & Region"}),i.jsx(Rr,{children:"Set your language and region preferences."}),i.jsxs(tr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"LANGUAGE"}),i.jsx(at,{children:"Choose your preferred language"})]}),i.jsxs(En,{value:l.language,onChange:I=>S("language",I.target.value),children:[i.jsx("option",{value:"en-US",children:"English (US)"}),i.jsx("option",{value:"es-ES",children:"Español"}),i.jsx("option",{value:"fr-FR",children:"Français"}),i.jsx("option",{value:"de-DE",children:"Deutsch"}),i.jsx("option",{value:"ja-JP",children:"日本語"}),i.jsx("option",{value:"zh-CN",children:"中文"}),i.jsx("option",{value:"ru-RU",children:"Русский"}),i.jsx("option",{value:"uz-UZ",children:"O'zbekcha"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"REGION"}),i.jsx(at,{children:"Choose your server region"})]}),i.jsxs(En,{value:l.region,onChange:I=>S("region",I.target.value),children:[i.jsx("option",{value:"US",children:"United States"}),i.jsx("option",{value:"EU",children:"Europe"}),i.jsx("option",{value:"Asia",children:"Asia"}),i.jsx("option",{value:"RU",children:"Russia"})]})]})]})]}),P=()=>i.jsxs(i.Fragment,{children:[i.jsx(er,{children:"Keybinds"}),i.jsx(Rr,{children:"Customize your keyboard shortcuts."}),i.jsxs(tr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"PUSH TO MUTE"}),i.jsx(at,{children:"Hold to temporarily mute your microphone"})]}),i.jsx(Ia,{type:"text",value:"Ctrl + M",readOnly:!0})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"PUSH TO TALK"}),i.jsx(at,{children:"Hold to speak"})]}),i.jsx(Ia,{type:"text",value:"Ctrl + T",readOnly:!0})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(lt,{children:"TOGGLE MUTE"}),i.jsx(at,{children:"Toggle microphone on/off"})]}),i.jsx(Ia,{type:"text",value:"Ctrl + Shift + M",readOnly:!0})]})]})]}),Y=()=>{switch(o){case"my-account":return A();case"voice-video":return ne();case"notifications":return N();case"appearance":return X();case"privacy":return Z();case"language":return H();case"keybinds":return P();default:return A()}};return e?i.jsx(hw,{onClick:t,children:i.jsxs(gw,{onClick:I=>I.stopPropagation(),children:[i.jsxs(xw,{children:[i.jsx(mw,{children:"User Settings"}),i.jsx(yw,{onClick:t,children:i.jsx(jr,{size:20})})]}),i.jsxs(vw,{children:[i.jsx(kw,{children:D.map(I=>{const W=I.icon;return i.jsxs(ww,{active:o===I.id,onClick:()=>s(I.id),children:[i.jsx(W,{size:18}),I.label]},I.id)})}),i.jsx(bw,{children:Y()})]})]})}):null},cn=Object.create(null);cn.open="0";cn.close="1";cn.ping="2";cn.pong="3";cn.message="4";cn.upgrade="5";cn.noop="6";const Us=Object.create(null);Object.keys(cn).forEach(e=>{Us[cn[e]]=e});const lu={type:"error",data:"parser error"},m0=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",y0=typeof ArrayBuffer=="function",v0=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,Sd=({type:e,data:t},n,r)=>m0&&t instanceof Blob?n?r(t):Ep(t,r):y0&&(t instanceof ArrayBuffer||v0(t))?n?r(t):Ep(new Blob([t]),r):r(cn[e]+(t||"")),Ep=(e,t)=>{const n=new FileReader;return n.onload=function(){const r=n.result.split(",")[1];t("b"+(r||""))},n.readAsDataURL(e)};function _p(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}let Aa;function Rw(e,t){if(m0&&e.data instanceof Blob)return e.data.arrayBuffer().then(_p).then(t);if(y0&&(e.data instanceof ArrayBuffer||v0(e.data)))return t(_p(e.data));Sd(e,!1,n=>{Aa||(Aa=new TextEncoder),t(Aa.encode(n))})}const Tp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Xo=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let e=0;e<Tp.length;e++)Xo[Tp.charCodeAt(e)]=e;const Iw=e=>{let t=e.length*.75,n=e.length,r,o=0,s,l,a,c;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);const d=new ArrayBuffer(t),x=new Uint8Array(d);for(r=0;r<n;r+=4)s=Xo[e.charCodeAt(r)],l=Xo[e.charCodeAt(r+1)],a=Xo[e.charCodeAt(r+2)],c=Xo[e.charCodeAt(r+3)],x[o++]=s<<2|l>>4,x[o++]=(l&15)<<4|a>>2,x[o++]=(a&3)<<6|c&63;return d},Pw=typeof ArrayBuffer=="function",Cd=(e,t)=>{if(typeof e!="string")return{type:"message",data:k0(e,t)};const n=e.charAt(0);return n==="b"?{type:"message",data:Mw(e.substring(1),t)}:Us[n]?e.length>1?{type:Us[n],data:e.substring(1)}:{type:Us[n]}:lu},Mw=(e,t)=>{if(Pw){const n=Iw(e);return k0(n,t)}else return{base64:!0,data:e}},k0=(e,t)=>{switch(t){case"blob":return e instanceof Blob?e:new Blob([e]);case"arraybuffer":default:return e instanceof ArrayBuffer?e:e.buffer}},w0="",$w=(e,t)=>{const n=e.length,r=new Array(n);let o=0;e.forEach((s,l)=>{Sd(s,!1,a=>{r[l]=a,++o===n&&t(r.join(w0))})})},Aw=(e,t)=>{const n=e.split(w0),r=[];for(let o=0;o<n.length;o++){const s=Cd(n[o],t);if(r.push(s),s.type==="error")break}return r};function Ow(){return new TransformStream({transform(e,t){Rw(e,n=>{const r=n.length;let o;if(r<126)o=new Uint8Array(1),new DataView(o.buffer).setUint8(0,r);else if(r<65536){o=new Uint8Array(3);const s=new DataView(o.buffer);s.setUint8(0,126),s.setUint16(1,r)}else{o=new Uint8Array(9);const s=new DataView(o.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(r))}e.data&&typeof e.data!="string"&&(o[0]|=128),t.enqueue(o),t.enqueue(n)})}})}let Oa;function cs(e){return e.reduce((t,n)=>t+n.length,0)}function us(e,t){if(e[0].length===t)return e.shift();const n=new Uint8Array(t);let r=0;for(let o=0;o<t;o++)n[o]=e[0][r++],r===e[0].length&&(e.shift(),r=0);return e.length&&r<e[0].length&&(e[0]=e[0].slice(r)),n}function Nw(e,t){Oa||(Oa=new TextDecoder);const n=[];let r=0,o=-1,s=!1;return new TransformStream({transform(l,a){for(n.push(l);;){if(r===0){if(cs(n)<1)break;const c=us(n,1);s=(c[0]&128)===128,o=c[0]&127,o<126?r=3:o===126?r=1:r=2}else if(r===1){if(cs(n)<2)break;const c=us(n,2);o=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),r=3}else if(r===2){if(cs(n)<8)break;const c=us(n,8),d=new DataView(c.buffer,c.byteOffset,c.length),x=d.getUint32(0);if(x>Math.pow(2,21)-1){a.enqueue(lu);break}o=x*Math.pow(2,32)+d.getUint32(4),r=3}else{if(cs(n)<o)break;const c=us(n,o);a.enqueue(Cd(s?c:Oa.decode(c),t)),r=0}if(o===0||o>e){a.enqueue(lu);break}}}})}const b0=4;function Ve(e){if(e)return Lw(e)}function Lw(e){for(var t in Ve.prototype)e[t]=Ve.prototype[t];return e}Ve.prototype.on=Ve.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this};Ve.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this};Ve.prototype.off=Ve.prototype.removeListener=Ve.prototype.removeAllListeners=Ve.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+e];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+e],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===t||r.fn===t){n.splice(o,1);break}return n.length===0&&delete this._callbacks["$"+e],this};Ve.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),n=this._callbacks["$"+e],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,t)}return this};Ve.prototype.emitReserved=Ve.prototype.emit;Ve.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]};Ve.prototype.hasListeners=function(e){return!!this.listeners(e).length};const Hl=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,n)=>n(t,0),$t=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),Dw="arraybuffer";function j0(e,...t){return t.reduce((n,r)=>(e.hasOwnProperty(r)&&(n[r]=e[r]),n),{})}const Bw=$t.setTimeout,Fw=$t.clearTimeout;function Wl(e,t){t.useNativeTimers?(e.setTimeoutFn=Bw.bind($t),e.clearTimeoutFn=Fw.bind($t)):(e.setTimeoutFn=$t.setTimeout.bind($t),e.clearTimeoutFn=$t.clearTimeout.bind($t))}const Uw=1.33;function Vw(e){return typeof e=="string"?qw(e):Math.ceil((e.byteLength||e.size)*Uw)}function qw(e){let t=0,n=0;for(let r=0,o=e.length;r<o;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}function S0(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function Hw(e){let t="";for(let n in e)e.hasOwnProperty(n)&&(t.length&&(t+="&"),t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t}function Ww(e){let t={},n=e.split("&");for(let r=0,o=n.length;r<o;r++){let s=n[r].split("=");t[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return t}class Yw extends Error{constructor(t,n,r){super(t),this.description=n,this.context=r,this.type="TransportError"}}class zd extends Ve{constructor(t){super(),this.writable=!1,Wl(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,n,r){return super.emitReserved("error",new Yw(t,n,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const n=Cd(t,this.socket.binaryType);this.onPacket(n)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,n={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const n=Hw(t);return n.length?"?"+n:""}}class Gw extends zd{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const n=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let r=0;this._polling&&(r++,this.once("pollComplete",function(){--r||n()})),this.writable||(r++,this.once("drain",function(){--r||n()}))}else n()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const n=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};Aw(t,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,$w(t,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=S0()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(t,n)}}let C0=!1;try{C0=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const Kw=C0;function Qw(){}class Jw extends Gw{constructor(t){if(super(t),typeof location<"u"){const n=location.protocol==="https:";let r=location.port;r||(r=n?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||r!==t.port}}doWrite(t,n){const r=this.request({method:"POST",data:t});r.on("success",n),r.on("error",(o,s)=>{this.onError("xhr post error",o,s)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(n,r)=>{this.onError("xhr poll error",n,r)}),this.pollXhr=t}}class an extends Ve{constructor(t,n,r){super(),this.createRequest=t,Wl(this,r),this._opts=r,this._method=r.method||"GET",this._uri=n,this._data=r.data!==void 0?r.data:null,this._create()}_create(){var t;const n=j0(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this._opts.xd;const r=this._xhr=this.createRequest(n);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let o in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this._opts.extraHeaders[o])}}catch{}if(this._method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(r),"withCredentials"in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var o;r.readyState===3&&((o=this._opts.cookieJar)===null||o===void 0||o.parseCookies(r.getResponseHeader("set-cookie"))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status=="number"?r.status:0)},0))},r.send(this._data)}catch(o){this.setTimeoutFn(()=>{this._onError(o)},0);return}typeof document<"u"&&(this._index=an.requestsCount++,an.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=Qw,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete an.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}an.requestsCount=0;an.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Rp);else if(typeof addEventListener=="function"){const e="onpagehide"in $t?"pagehide":"unload";addEventListener(e,Rp,!1)}}function Rp(){for(let e in an.requests)an.requests.hasOwnProperty(e)&&an.requests[e].abort()}const Xw=function(){const e=z0({xdomain:!1});return e&&e.responseType!==null}();class Zw extends Jw{constructor(t){super(t);const n=t&&t.forceBase64;this.supportsBinary=Xw&&!n}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new an(z0,this.uri(),t)}}function z0(e){const t=e.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||Kw))return new XMLHttpRequest}catch{}if(!t)try{return new $t[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const E0=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class eb extends zd{get name(){return"websocket"}doOpen(){const t=this.uri(),n=this.opts.protocols,r=E0?{}:j0(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,n,r)}catch(o){return this.emitReserved("error",o)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let n=0;n<t.length;n++){const r=t[n],o=n===t.length-1;Sd(r,this.supportsBinary,s=>{try{this.doWrite(r,s)}catch{}o&&Hl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=S0()),this.supportsBinary||(n.b64=1),this.createUri(t,n)}}const Na=$t.WebSocket||$t.MozWebSocket;class tb extends eb{createSocket(t,n,r){return E0?new Na(t,n,r):n?new Na(t,n):new Na(t)}doWrite(t,n){this.ws.send(n)}}class nb extends zd{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const n=Nw(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=t.readable.pipeThrough(n).getReader(),o=Ow();o.readable.pipeTo(t.writable),this._writer=o.writable.getWriter();const s=()=>{r.read().then(({done:a,value:c})=>{a||(this.onPacket(c),s())}).catch(a=>{})};s();const l={type:"open"};this.query.sid&&(l.data=`{"sid":"${this.query.sid}"}`),this._writer.write(l).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let n=0;n<t.length;n++){const r=t[n],o=n===t.length-1;this._writer.write(r).then(()=>{o&&Hl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const rb={websocket:tb,webtransport:nb,polling:Zw},ob=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ib=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function au(e){if(e.length>8e3)throw"URI too long";const t=e,n=e.indexOf("["),r=e.indexOf("]");n!=-1&&r!=-1&&(e=e.substring(0,n)+e.substring(n,r).replace(/:/g,";")+e.substring(r,e.length));let o=ob.exec(e||""),s={},l=14;for(;l--;)s[ib[l]]=o[l]||"";return n!=-1&&r!=-1&&(s.source=t,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=sb(s,s.path),s.queryKey=lb(s,s.query),s}function sb(e,t){const n=/\/{2,9}/g,r=t.replace(n,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&r.splice(0,1),t.slice(-1)=="/"&&r.splice(r.length-1,1),r}function lb(e,t){const n={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,o,s){o&&(n[o]=s)}),n}const cu=typeof addEventListener=="function"&&typeof removeEventListener=="function",Vs=[];cu&&addEventListener("offline",()=>{Vs.forEach(e=>e())},!1);class Hn extends Ve{constructor(t,n){if(super(),this.binaryType=Dw,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(n=t,t=null),t){const r=au(t);n.hostname=r.host,n.secure=r.protocol==="https"||r.protocol==="wss",n.port=r.port,r.query&&(n.query=r.query)}else n.host&&(n.hostname=au(n.host).host);Wl(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},n.transports.forEach(r=>{const o=r.prototype.name;this.transports.push(o),this._transportsByName[o]=r}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=Ww(this.opts.query)),cu&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Vs.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const n=Object.assign({},this.opts.query);n.EIO=b0,n.transport=t,this.id&&(n.sid=this.id);const r=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](r)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&Hn.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const n=this.createTransport(t);n.open(),this.setTransport(n)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",n=>this._onClose("transport close",n))}onOpen(){this.readyState="open",Hn.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const n=new Error("server error");n.code=t.data,this._onError(n);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let r=0;r<this.writeBuffer.length;r++){const o=this.writeBuffer[r].data;if(o&&(n+=Vw(o)),r>0&&n>this._maxPayload)return this.writeBuffer.slice(0,r);n+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,Hl(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,n,r){return this._sendPacket("message",t,n,r),this}send(t,n,r){return this._sendPacket("message",t,n,r),this}_sendPacket(t,n,r,o){if(typeof n=="function"&&(o=n,n=void 0),typeof r=="function"&&(o=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;const s={type:t,data:n,options:r};this.emitReserved("packetCreate",s),this.writeBuffer.push(s),o&&this.once("flush",o),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),t()},r=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():t()}):this.upgrading?r():t()),this}_onError(t){if(Hn.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,n){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),cu&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const r=Vs.indexOf(this._offlineEventListener);r!==-1&&Vs.splice(r,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,n),this.writeBuffer=[],this._prevBufferLen=0}}}Hn.protocol=b0;class ab extends Hn{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_probe(t){let n=this.createTransport(t),r=!1;Hn.priorWebsocketSuccess=!1;const o=()=>{r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",p=>{if(!r)if(p.type==="pong"&&p.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;Hn.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(x(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const g=new Error("probe error");g.transport=n.name,this.emitReserved("upgradeError",g)}}))};function s(){r||(r=!0,x(),n.close(),n=null)}const l=p=>{const g=new Error("probe error: "+p);g.transport=n.name,s(),this.emitReserved("upgradeError",g)};function a(){l("transport closed")}function c(){l("socket closed")}function d(p){n&&p.name!==n.name&&s()}const x=()=>{n.removeListener("open",o),n.removeListener("error",l),n.removeListener("close",a),this.off("close",c),this.off("upgrading",d)};n.once("open",o),n.once("error",l),n.once("close",a),this.once("close",c),this.once("upgrading",d),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{r||n.open()},200):n.open()}onHandshake(t){this._upgrades=this._filterUpgrades(t.upgrades),super.onHandshake(t)}_filterUpgrades(t){const n=[];for(let r=0;r<t.length;r++)~this.transports.indexOf(t[r])&&n.push(t[r]);return n}}let cb=class extends ab{constructor(t,n={}){const r=typeof t=="object"?t:n;(!r.transports||r.transports&&typeof r.transports[0]=="string")&&(r.transports=(r.transports||["polling","websocket","webtransport"]).map(o=>rb[o]).filter(o=>!!o)),super(t,r)}};function ub(e,t="",n){let r=e;n=n||typeof location<"u"&&location,e==null&&(e=n.protocol+"//"+n.host),typeof e=="string"&&(e.charAt(0)==="/"&&(e.charAt(1)==="/"?e=n.protocol+e:e=n.host+e),/^(https?|wss?):\/\//.test(e)||(typeof n<"u"?e=n.protocol+"//"+e:e="https://"+e),r=au(e)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";const s=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+s+":"+r.port+t,r.href=r.protocol+"://"+s+(n&&n.port===r.port?"":":"+r.port),r}const db=typeof ArrayBuffer=="function",fb=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer,_0=Object.prototype.toString,pb=typeof Blob=="function"||typeof Blob<"u"&&_0.call(Blob)==="[object BlobConstructor]",hb=typeof File=="function"||typeof File<"u"&&_0.call(File)==="[object FileConstructor]";function Ed(e){return db&&(e instanceof ArrayBuffer||fb(e))||pb&&e instanceof Blob||hb&&e instanceof File}function qs(e,t){if(!e||typeof e!="object")return!1;if(Array.isArray(e)){for(let n=0,r=e.length;n<r;n++)if(qs(e[n]))return!0;return!1}if(Ed(e))return!0;if(e.toJSON&&typeof e.toJSON=="function"&&arguments.length===1)return qs(e.toJSON(),!0);for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&qs(e[n]))return!0;return!1}function gb(e){const t=[],n=e.data,r=e;return r.data=uu(n,t),r.attachments=t.length,{packet:r,buffers:t}}function uu(e,t){if(!e)return e;if(Ed(e)){const n={_placeholder:!0,num:t.length};return t.push(e),n}else if(Array.isArray(e)){const n=new Array(e.length);for(let r=0;r<e.length;r++)n[r]=uu(e[r],t);return n}else if(typeof e=="object"&&!(e instanceof Date)){const n={};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=uu(e[r],t));return n}return e}function xb(e,t){return e.data=du(e.data,t),delete e.attachments,e}function du(e,t){if(!e)return e;if(e&&e._placeholder===!0){if(typeof e.num=="number"&&e.num>=0&&e.num<t.length)return t[e.num];throw new Error("illegal attachments")}else if(Array.isArray(e))for(let n=0;n<e.length;n++)e[n]=du(e[n],t);else if(typeof e=="object")for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&(e[n]=du(e[n],t));return e}const T0=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],mb=5;var he;(function(e){e[e.CONNECT=0]="CONNECT",e[e.DISCONNECT=1]="DISCONNECT",e[e.EVENT=2]="EVENT",e[e.ACK=3]="ACK",e[e.CONNECT_ERROR=4]="CONNECT_ERROR",e[e.BINARY_EVENT=5]="BINARY_EVENT",e[e.BINARY_ACK=6]="BINARY_ACK"})(he||(he={}));class yb{constructor(t){this.replacer=t}encode(t){return(t.type===he.EVENT||t.type===he.ACK)&&qs(t)?this.encodeAsBinary({type:t.type===he.EVENT?he.BINARY_EVENT:he.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let n=""+t.type;return(t.type===he.BINARY_EVENT||t.type===he.BINARY_ACK)&&(n+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(n+=t.nsp+","),t.id!=null&&(n+=t.id),t.data!=null&&(n+=JSON.stringify(t.data,this.replacer)),n}encodeAsBinary(t){const n=gb(t),r=this.encodeAsString(n.packet),o=n.buffers;return o.unshift(r),o}}class _d extends Ve{constructor(t){super(),this.reviver=t}add(t){let n;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(t);const r=n.type===he.BINARY_EVENT;r||n.type===he.BINARY_ACK?(n.type=r?he.EVENT:he.ACK,this.reconstructor=new vb(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Ed(t)||t.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let n=0;const r={type:Number(t.charAt(0))};if(he[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===he.BINARY_EVENT||r.type===he.BINARY_ACK){const s=n+1;for(;t.charAt(++n)!=="-"&&n!=t.length;);const l=t.substring(s,n);if(l!=Number(l)||t.charAt(n)!=="-")throw new Error("Illegal attachments");r.attachments=Number(l)}if(t.charAt(n+1)==="/"){const s=n+1;for(;++n&&!(t.charAt(n)===","||n===t.length););r.nsp=t.substring(s,n)}else r.nsp="/";const o=t.charAt(n+1);if(o!==""&&Number(o)==o){const s=n+1;for(;++n;){const l=t.charAt(n);if(l==null||Number(l)!=l){--n;break}if(n===t.length)break}r.id=Number(t.substring(s,n+1))}if(t.charAt(++n)){const s=this.tryParse(t.substr(n));if(_d.isPayloadValid(r.type,s))r.data=s;else throw new Error("invalid payload")}return r}tryParse(t){try{return JSON.parse(t,this.reviver)}catch{return!1}}static isPayloadValid(t,n){switch(t){case he.CONNECT:return kl(n);case he.DISCONNECT:return n===void 0;case he.CONNECT_ERROR:return typeof n=="string"||kl(n);case he.EVENT:case he.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&T0.indexOf(n[0])===-1);case he.ACK:case he.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class vb{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const n=xb(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function kb(e){return typeof e=="string"}const wb=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};function bb(e){return e===void 0||wb(e)}function kl(e){return Object.prototype.toString.call(e)==="[object Object]"}function jb(e,t){switch(e){case he.CONNECT:return t===void 0||kl(t);case he.DISCONNECT:return t===void 0;case he.EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&T0.indexOf(t[0])===-1);case he.ACK:return Array.isArray(t);case he.CONNECT_ERROR:return typeof t=="string"||kl(t);default:return!1}}function Sb(e){return kb(e.nsp)&&bb(e.id)&&jb(e.type,e.data)}const Cb=Object.freeze(Object.defineProperty({__proto__:null,Decoder:_d,Encoder:yb,get PacketType(){return he},isPacketValid:Sb,protocol:mb},Symbol.toStringTag,{value:"Module"}));function Gt(e,t,n){return e.on(t,n),function(){e.off(t,n)}}const zb=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class R0 extends Ve{constructor(t,n,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=n,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[Gt(t,"open",this.onopen.bind(this)),Gt(t,"packet",this.onpacket.bind(this)),Gt(t,"error",this.onerror.bind(this)),Gt(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...n){var r,o,s;if(zb.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(n.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const l={type:he.EVENT,data:n};if(l.options={},l.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const x=this.ids++,p=n.pop();this._registerAckCallback(x,p),l.id=x}const a=(o=(r=this.io.engine)===null||r===void 0?void 0:r.transport)===null||o===void 0?void 0:o.writable,c=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!a||(c?(this.notifyOutgoingListeners(l),this.packet(l)):this.sendBuffer.push(l)),this.flags={},this}_registerAckCallback(t,n){var r;const o=(r=this.flags.timeout)!==null&&r!==void 0?r:this._opts.ackTimeout;if(o===void 0){this.acks[t]=n;return}const s=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===t&&this.sendBuffer.splice(a,1);n.call(this,new Error("operation has timed out"))},o),l=(...a)=>{this.io.clearTimeoutFn(s),n.apply(this,a)};l.withError=!0,this.acks[t]=l}emitWithAck(t,...n){return new Promise((r,o)=>{const s=(l,a)=>l?o(l):r(a);s.withError=!0,n.push(s),this.emit(t,...n)})}_addToQueue(t){let n;typeof t[t.length-1]=="function"&&(n=t.pop());const r={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((o,...s)=>(this._queue[0],o!==null?r.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(o)):(this._queue.shift(),n&&n(null,...s)),r.pending=!1,this._drainQueue())),this._queue.push(r),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!t||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:he.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,n),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(r=>String(r.id)===t)){const r=this.acks[t];delete this.acks[t],r.withError&&r.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case he.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case he.EVENT:case he.BINARY_EVENT:this.onevent(t);break;case he.ACK:case he.BINARY_ACK:this.onack(t);break;case he.DISCONNECT:this.ondisconnect();break;case he.CONNECT_ERROR:this.destroy();const r=new Error(t.data.message);r.data=t.data.data,this.emitReserved("connect_error",r);break}}onevent(t){const n=t.data||[];t.id!=null&&n.push(this.ack(t.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const r of n)r.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const n=this;let r=!1;return function(...o){r||(r=!0,n.packet({type:he.ACK,id:t,data:o}))}}onack(t){const n=this.acks[t.id];typeof n=="function"&&(delete this.acks[t.id],n.withError&&t.data.unshift(null),n.apply(this,t.data))}onconnect(t,n){this.id=t,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:he.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const n=this._anyListeners;for(let r=0;r<n.length;r++)if(t===n[r])return n.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const n=this._anyOutgoingListeners;for(let r=0;r<n.length;r++)if(t===n[r])return n.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const r of n)r.apply(this,t.data)}}}function jo(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}jo.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=Math.floor(t*10)&1?e+n:e-n}return Math.min(e,this.max)|0};jo.prototype.reset=function(){this.attempts=0};jo.prototype.setMin=function(e){this.ms=e};jo.prototype.setMax=function(e){this.max=e};jo.prototype.setJitter=function(e){this.jitter=e};class fu extends Ve{constructor(t,n){var r;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(n=t,t=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,Wl(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((r=n.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new jo({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=t;const o=n.parser||Cb;this.encoder=new o.Encoder,this.decoder=new o.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var n;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(n=this.backoff)===null||n===void 0||n.setMin(t),this)}randomizationFactor(t){var n;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(n=this.backoff)===null||n===void 0||n.setJitter(t),this)}reconnectionDelayMax(t){var n;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(n=this.backoff)===null||n===void 0||n.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new cb(this.uri,this.opts);const n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const o=Gt(n,"open",function(){r.onopen(),t&&t()}),s=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),t?t(a):this.maybeReconnectOnOpen()},l=Gt(n,"error",s);if(this._timeout!==!1){const a=this._timeout,c=this.setTimeoutFn(()=>{o(),s(new Error("timeout")),n.close()},a);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(o),this.subs.push(l),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(Gt(t,"ping",this.onping.bind(this)),Gt(t,"data",this.ondata.bind(this)),Gt(t,"error",this.onerror.bind(this)),Gt(t,"close",this.onclose.bind(this)),Gt(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(n){this.onclose("parse error",n)}}ondecoded(t){Hl(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,n){let r=this.nsps[t];return r?this._autoConnect&&!r.active&&r.connect():(r=new R0(this,t,n),this.nsps[t]=r),r}_destroy(t){const n=Object.keys(this.nsps);for(const r of n)if(this.nsps[r].active)return;this._close()}_packet(t){const n=this.encoder.encode(t);for(let r=0;r<n.length;r++)this.engine.write(n[r],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,n){var r;this.cleanup(),(r=this.engine)===null||r===void 0||r.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(o=>{o?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",o)):t.onreconnect()}))},n);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const Ao={};function eo(e,t){typeof e=="object"&&(t=e,e=void 0),t=t||{};const n=ub(e,t.path||"/socket.io"),r=n.source,o=n.id,s=n.path,l=Ao[o]&&s in Ao[o].nsps,a=t.forceNew||t["force new connection"]||t.multiplex===!1||l;let c;return a?c=new fu(r,t):(Ao[o]||(Ao[o]=new fu(r,t)),c=Ao[o]),n.query&&!t.query&&(t.query=n.queryKey),c.socket(n.path,t)}Object.assign(eo,{Manager:fu,Socket:R0,io:eo,connect:eo});const I0=f.createContext(),fn="http://localhost:3000",Fi=()=>f.useContext(I0),Eb=({children:e})=>{const[t,n]=f.useState([]),[r,o]=f.useState(!0),[s,l]=f.useState("home"),[a,c]=f.useState(0),[d,x]=f.useState(null),[p,g]=f.useState({});f.useEffect(()=>{const R=localStorage.getItem("token");if(!R)return;const D=fn.replace(/\/$/,""),O=eo(`${D}/chats`,{auth:{token:R},transports:["websocket"],reconnectionAttempts:5});return O.on("connect",()=>{console.log("Connected to /chats namespace")}),x(O),()=>{O.disconnect()}},[]),f.useEffect(()=>{if(!d)return;const R=A=>{n(ne=>{var W;const N=ne.findIndex(ie=>ie.id===A.chatId);if(N===-1)return v(),ne;const X=[...ne],Z={...X[N]},H=String(Z.urlSlug)===String(a)||String(Z.id)===String(a);Z.lastMessage=A.content,Z.hasMessages=!0,Z.time=new Date(A.createdAt).toLocaleDateString("uz-UZ",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});const P=JSON.parse(localStorage.getItem("user")||"{}"),Y=P._id||P.id,I=(((W=A.senderId)==null?void 0:W._id)||A.senderId)===Y;return!H&&!I&&(Z.unread=(Z.unread||0)+1),X.splice(N,1),X.unshift(Z),X})},D=({chatId:A,readByUserId:ne,messageIds:N})=>{const X=JSON.parse(localStorage.getItem("user")||"{}"),Z=X._id||X.id;String(ne)===String(Z)&&n(H=>H.map(P=>String(P.id)===String(A)?{...P,unread:Math.max(0,(P.unread||0)-N.length)}:P))},O=A=>{const ne=JSON.parse(localStorage.getItem("user")||"{}"),N=(ne==null?void 0:ne._id)||(ne==null?void 0:ne.id);if(A.members&&N&&!A.members.some(Z=>{const H=Z._id||Z.id||Z;return String(H)===String(N)})){n(Z=>Z.filter(H=>H.id!==A.chatId));return}n(X=>{const Z=X.findIndex(H=>H.id===A.chatId);if(Z!==-1){const H=[...X];return H[Z]={...H[Z],...A},H}return X})},S=({chatId:A,userId:ne,isTyping:N})=>{g(X=>{const Z={...X[A]||{}};return N?Z[ne]=Date.now():delete Z[ne],{...X,[A]:Z}})};return d.on("message_new",R),d.on("messages_read",D),d.on("chat_updated",O),d.on("user_typing",S),()=>{d.off("message_new"),d.off("messages_read"),d.off("chat_updated"),d.off("user_typing")}},[d,a]),f.useEffect(()=>{const R=setInterval(()=>{const D=Date.now();g(O=>{let S=!1;const A={...O};return Object.keys(A).forEach(ne=>{const N={...A[ne]};Object.keys(N).forEach(X=>{D-N[X]>5e3&&(delete N[X],S=!0)}),Object.keys(N).length===0?delete A[ne]:A[ne]=N}),S?A:O})},2e3);return()=>clearInterval(R)},[]);const w=f.useCallback((R,D)=>{!d||!R||d.emit(D?"typing_start":"typing_stop",{chatId:R})},[d]),v=f.useCallback(async()=>{try{const R=localStorage.getItem("token");if(!R)return;const O=await(await fetch(`${fn}/chats`,{headers:{Authorization:`Bearer ${R}`}})).json(),S=JSON.parse(localStorage.getItem("user")||"{}"),A=S._id||S.id,ne=O.map(N=>{var Z;let X={name:"Noma'lum",avatar:""};if(N.isGroup)X={name:N.name,avatar:N.avatar||((Z=N.name)==null?void 0:Z.charAt(0)),urlSlug:N.privateurl||N._id};else{const H=N.members.find(P=>String(P._id||P.id)!==String(A));H?X={name:H.nickname||H.username,avatar:H.avatar||(H.nickname||H.username).charAt(0),urlSlug:H.username}:X={name:"Saqlangan xabarlar",avatar:"",urlSlug:N._id,isSavedMessages:!0}}return{id:N._id,jammId:N.jammId,type:N.isGroup?"group":"user",name:X.name,avatar:X.avatar,isSavedMessages:X.isSavedMessages,urlSlug:N.jammId?String(N.jammId):X.urlSlug||N._id,unread:N.unreadCount||0,lastMessage:N.lastMessage||(N.isGroup?"Guruh yaratildi":"Suhbat boshlandi"),time:N.lastMessageAt?new Date(N.lastMessageAt).toLocaleDateString("uz-UZ",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Oldin",members:N.members,createdBy:N.createdBy,admins:N.admins||[]}});n(ne)}catch(R){console.error(R)}finally{o(!1)}},[]),b=async R=>{const O=await(await fetch(`${fn}/chats`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(R)})).json();return v(),String(O.jammId||O._id)},C=async(R,D)=>{await fetch(`${fn}/chats/${R}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(D)}),v()},m=f.useCallback(async R=>R?(await(await fetch(`${fn}/chats/${R}/messages`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()).map(S=>{var A,ne,N,X,Z,H,P;return{id:S._id,user:((A=S.senderId)==null?void 0:A.nickname)||((ne=S.senderId)==null?void 0:ne.username),senderId:((N=S.senderId)==null?void 0:N._id)||S.senderId,avatar:((X=S.senderId)==null?void 0:X.avatar)||((P=((Z=S.senderId)==null?void 0:Z.nickname)||((H=S.senderId)==null?void 0:H.username))==null?void 0:P.charAt(0))||"U",content:S.content,timestamp:new Date(S.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),readBy:S.readBy||[]}}):[],[]),h=f.useCallback(async(R,D,O)=>{const S=await fetch(`${fn}/chats/${R}/messages`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({content:D,replayToId:O})});return v(),S.json()},[v]),y=f.useCallback((R,D)=>{!d||!R||!(D!=null&&D.length)||d.emit("read_messages",{chatId:R,messageIds:D})},[d]),j=f.useCallback(async R=>(await fetch(`${fn}/chats/resolve/${R}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json(),[]),E=async R=>R?(await(await fetch(`${fn}/users/search?q=${R}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()).map(S=>({id:S._id,name:S.nickname||S.username,username:S.username,avatar:S.avatar||(S.nickname||S.username).charAt(0)})):[],k=async R=>{const D=await fetch(`${fn}/users/by-username/${R}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});return D.ok?D.json():null};f.useEffect(()=>{v()},[v]),f.useEffect(()=>{!a||a==="0"||n(R=>R.map(D=>String(D.urlSlug)===String(a)||String(D.id)===String(a)?{...D,unread:0}:D))},[a]);const _={chats:t,loading:r,fetchChats:v,createChat:b,editChat:C,fetchMessages:m,sendMessage:h,markMessagesAsRead:y,resolveChatSlug:j,searchUsers:E,getUserByUsername:k,selectedNav:s,setSelectedNav:l,selectedChannel:a,setSelectedChannel:c,chatSocket:d,typingUsers:p,sendTypingStatus:w};return i.jsx(I0.Provider,{value:_,children:e})},_b=u.div`
  width: 72px;
  height: 100vh;
  background-color: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
  @media (min-width: 769px) {
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media (max-width: 768px) {
    width: 72px;
    justify-content: flex-start;
    overflow-y: auto;
  }
  @media (max-width: 480px) {
    width: 60px;
    padding: 8px 0;
  }
`,Ip=u.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: var(--text-secondary-color);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
    transform: scale(1.1);
  }
  ${e=>e.active&&"background-color: var(--primary-color); color: white; border-radius: 50%;"}
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    margin-right: 0;
    flex-shrink: 0;
  }
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 6px;
  }
`,Tb=u.div`
  height: 2px;
  width: 20px;
  background-color: var(--border-color);
  margin: 8px 16px;
  border-radius: 1px;
  @media (max-width: 768px) {
    width: 32px;
    height: 1px;
    margin: 8px 0;
  }
`,Rb=[{id:"home",icon:Gk,label:"Dashboard"},{id:"users",icon:Pi,label:"Foydalanuvchilar"},{id:"groups",icon:h0,label:"Guruhlar"},{id:"meets",icon:yn,label:"Video Meetlar"},{id:"courses",icon:vd,label:"Kurslar"}],Ib=({onSelectNav:e})=>{const{selectedNav:t,setSelectedNav:n}=Fi(),[r,o]=f.useState(!1),s=l=>{e?e(l):n(l)};return i.jsxs(i.Fragment,{children:[i.jsxs(_b,{children:[Rb.map(l=>i.jsx(Ip,{active:t===l.id,onClick:()=>s(l.id),title:l.label,children:i.jsx(l.icon,{size:20})},l.id)),i.jsx(Tb,{}),i.jsx(Ip,{title:"Sozlamalar",onClick:()=>o(!0),children:i.jsx(iw,{size:20})})]}),i.jsx(Tw,{isOpen:r,onClose:()=>o(!1)})]})},P0=f.createContext(),Pp="http://localhost:3000",Pb=2e4,M0=()=>f.useContext(P0),Mb=({children:e})=>{const[t,n]=f.useState(new Map),[r,o]=f.useState(!1),s=f.useRef(null),l=f.useRef(null);f.useEffect(()=>{const p=localStorage.getItem("token");if(!p)return;const g=eo(`${Pp}/presence`,{auth:{token:p},transports:["websocket","polling"],reconnection:!0,reconnectionDelay:2e3,reconnectionAttempts:10});return s.current=g,g.on("connect",()=>{o(!0),l.current=setInterval(()=>{g.emit("presence:ping")},Pb)}),g.on("disconnect",()=>{o(!1),l.current&&(clearInterval(l.current),l.current=null)}),g.on("user_online",({userId:w})=>{n(v=>{const b=new Map(v);return b.set(w,!0),b})}),g.on("user_offline",({userId:w})=>{n(v=>{const b=new Map(v);return b.delete(w),b})}),g.on("connect_error",w=>{console.error("Presence connection error:",w.message)}),()=>{l.current&&clearInterval(l.current),g.disconnect(),s.current=null}},[]);const a=f.useCallback(p=>t.has(p),[t]),c=f.useCallback(async p=>{try{const g=localStorage.getItem("token"),w=await fetch(`${Pp}/presence/status/bulk`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({userIds:p})});if(!w.ok)return{};const v=await w.json();return n(b=>{const C=new Map(b);for(const[m,h]of Object.entries(v.statuses||{}))h?C.set(m,!0):C.delete(m);return C}),v.statuses}catch(g){return console.error("Failed to fetch bulk statuses:",g),{}}},[]),d=f.useCallback((p=[])=>!p||p.length===0?0:p.filter(g=>{const w=typeof g=="object"?g._id:g;return t.has(w)}).length,[t]),x={onlineUsers:t,connected:r,isUserOnline:a,getOnlineCount:d,fetchBulkStatuses:c};return i.jsx(P0.Provider,{value:x,children:e})},Td="jamm_meets";function Mi(){try{return JSON.parse(localStorage.getItem(Td)||"[]")}catch{return[]}}function $b({roomId:e,title:t,isPrivate:n,isCreator:r}){const o=Mi().filter(s=>s.roomId!==e);o.unshift({roomId:e,title:t,isPrivate:n,isCreator:r,joinedAt:Date.now()}),localStorage.setItem(Td,JSON.stringify(o.slice(0,20)))}function Ab(e){const t=Mi().filter(n=>n.roomId!==e);localStorage.setItem(Td,JSON.stringify(t))}function Ob(e){return Mi().find(t=>t.roomId===e)||null}const Nb=u.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  border-right: 1px solid var(--border-color);
  flex-direction: column;
  flex-shrink: 0;

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh);
    // height: calc(100vh - 60px);
  }
`,Lb=u.div`
  padding: 16px;
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`,Mp=u.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background-color: var(--hover-color);
  }
`;u.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
`;u.div`
  padding: 12px 16px;
  height: 56px;
`;const Db=u.input`
  width: 100%;
  padding: 8px 12px;
  background-color: var(--input-color);
  border: none;
  border-radius: 4px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    background-color: #4a4d52;
  }
`,Bb=u.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,La=u.button`
  padding: 4px 12px;
  background-color: ${e=>e.active?"var(--primary-color)":"var(--input-color)"};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${e=>e.active?"var(--primary-color)":"var(--hover-color)"};
  }
`,Fb=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`,ds=u.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--text-secondary-color);

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }

  ${e=>e.active&&`
    background-color: var(--active-color);
    color: var(--text-color);
    font-weight: 600;
  `}
`,$p=u(Om)`
  text-decoration: none;
  color: inherit;
  display: block;
`,Ap=u.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`,fs=u.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.$isGroup?"linear-gradient(135deg, #667eea 0%, #764ba2 100%)":"#7289da"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`,Ub=u.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${e=>e.$online?"#43b581":"#72767d"};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`,Vb=u.span`
  font-size: 12px;
  color: #43b581;
`,ps=u.div`
  flex: 1;
  min-width: 0;
`,hs=u.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,gs=u.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Op=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`,Np=u.div`
  font-size: 12px;
  color: #72767d;
  margin-bottom: 2px;
`,qb=u.div`
  background-color: #7289da;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;u.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #35373c;
  }
`;u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #7289da;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-right: 12px;
`;u.div`
  flex: 1;
`;u.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
`;u.div`
  font-size: 12px;
  color: var(--primary-color);
`;const Hb=({onOpenCreateGroup:e,onOpenCreateMeet:t})=>{const{chats:n,searchUsers:r,createChat:o,selectedNav:s,setSelectedNav:l,selectedChannel:a,setSelectedChannel:c}=Fi(),{isUserOnline:d,getOnlineCount:x,fetchBulkStatuses:p}=M0(),g=zr(),[w,v]=f.useState(""),[b,C]=f.useState("all"),[m,h]=f.useState([]),[y,j]=f.useState(!1);f.useEffect(()=>{if(!n||n.length===0)return;const S=new Set;n.forEach(ne=>{ne.members&&ne.members.forEach(N=>{N._id?S.add(N._id):N.id&&S.add(N.id)})});const A=Array.from(S);A.length>0&&p(A)},[n,p]),f.useEffect(()=>{if(s==="users"&&w.trim().length>0){const S=setTimeout(async()=>{j(!0);const A=await r(w);h(A),j(!1)},500);return()=>clearTimeout(S)}else h([])},[w,s,r]);const E=async S=>{const A=localStorage.getItem("user"),ne=A?JSON.parse(A):{},N=ne._id||ne.id,X=S.id||S._id,Z=n.find(H=>H.isGroup||!H.members?!1:X===N?H.isSavedMessages:!H.isSavedMessages&&H.members.some(P=>(P._id||P.id)===X));if(Z)g(`/a/${Z.urlSlug}`);else try{const H=await o({isGroup:!1,memberIds:[S.id]});H&&(g(`/a/${H}`),v(""))}catch(H){console.error("Failed to start private chat",H)}},k=Ct.useMemo(()=>{let S=n;return s==="users"?S=S.filter(A=>A.type==="user"&&(A.hasMessages||A.id===a)):s==="groups"?S=S.filter(A=>A.type==="group"):s==="home"&&(S=S.filter(A=>A.type==="group"||A.type==="user"&&(A.hasMessages||A.id===a))),w&&(S=S.filter(A=>A.name.toLowerCase().includes(w.toLowerCase()))),b==="today"?(new Date().toDateString(),S=S.filter(A=>A.time.includes(":")||A.time==="Kecha")):b==="week"&&(S=S.filter(A=>A.time.includes("Dushanba")||A.time.includes("Kecha"))),S},[s,w,b,n,a]),[_,R]=f.useState([]);f.useEffect(()=>{s==="meets"&&R(Mi())},[s]);function D(S){const A=(Date.now()-S)/1e3;return A<60?"hozir":A<3600?`${Math.floor(A/60)} daq oldin`:A<86400?`${Math.floor(A/3600)} soat oldin`:`${Math.floor(A/86400)} kun oldin`}const O=(S,A)=>{S.preventDefault(),S.stopPropagation(),Ab(A),R(Mi())};return i.jsxs(Nb,{children:[i.jsxs(Lb,{children:[i.jsx(Db,{type:"text",placeholder:"Qidirish...",value:w,onChange:S=>v(S.target.value),style:{flex:1,marginRight:s==="groups"||s==="meets"?"12px":"0"}}),s==="groups"&&i.jsx(Mp,{onClick:e,title:"Guruh yaratish",children:i.jsx(Ri,{size:18})}),s==="meets"&&i.jsx(Mp,{onClick:t,title:"Yangi meet",children:i.jsx(Ri,{size:18})})]}),s==="home"&&i.jsxs(Bb,{children:[i.jsx(La,{active:b==="all",onClick:()=>C("all"),children:"Barchasi"}),i.jsx(La,{active:b==="today",onClick:()=>C("today"),children:"Bugun"}),i.jsx(La,{active:b==="week",onClick:()=>C("week"),children:"Hafta"})]}),i.jsx(Fb,{children:s==="meets"?_.length===0?i.jsxs("div",{style:{padding:32,textAlign:"center",color:"var(--text-muted-color)"},children:[i.jsx(yn,{size:32,style:{marginBottom:10,opacity:.4}}),i.jsx("div",{children:"Hali hech qanday meet yo'q"})]}):_.map(S=>i.jsx($p,{to:`/join/${S.roomId}`,children:i.jsxs(ds,{children:[i.jsx(fs,{isGroup:!0,children:i.jsx(yn,{size:18})}),i.jsxs(ps,{children:[i.jsx(hs,{children:S.title||"Nomsiz meet"}),i.jsxs(gs,{children:[S.isPrivate?"🔒 Private":"🌐 Open"," · ",S.isCreator?"Yaratuvchi":"Ishtirokchi"]})]}),i.jsxs(Op,{children:[i.jsx(Np,{children:D(S.joinedAt)}),i.jsx("button",{onClick:A=>O(A,S.roomId),title:"O'chirish",style:{background:"none",border:"none",color:"#4f545c",cursor:"pointer",padding:2},children:i.jsx(bd,{size:12})})]})]})},S.roomId)):s==="users"&&w.trim()?i.jsx(i.Fragment,{children:y?i.jsx("div",{style:{padding:"20px",textAlign:"center",color:"var(--text-muted-color)"},children:"Qidirilmoqda..."}):m.length>0?m.map(S=>{var A;return i.jsxs(ds,{onClick:()=>E(S),style:{cursor:"pointer"},children:[i.jsx(fs,{isGroup:!1,children:((A=S==null?void 0:S.avatar)==null?void 0:A.length)>1?i.jsx("img",{src:S.avatar,alt:S.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):S.name.charAt(0)}),i.jsxs(ps,{children:[i.jsx(hs,{children:S.name}),i.jsxs(gs,{children:["@",S.username]})]})]},S.id)}):i.jsx("div",{style:{padding:"20px",textAlign:"center",color:"var(--text-muted-color)"},children:"Foydalanuvchi topilmadi"})}):i.jsxs(i.Fragment,{children:[(s==="users"||s==="home")&&!w.trim()&&!n.some(S=>S.isSavedMessages)&&i.jsxs(ds,{onClick:()=>{const S=localStorage.getItem("user");if(S){const A=JSON.parse(S),ne=A._id||A.id;ne&&E({id:ne})}},style:{cursor:"pointer"},children:[i.jsx(Ap,{children:i.jsx(fs,{style:{backgroundColor:"#0288D1"},children:i.jsx(vl,{size:18,color:"white",fill:"white"})})}),i.jsxs(ps,{children:[i.jsx(hs,{children:"Saqlangan xabarlar"}),i.jsx(gs,{children:"O'zingizga xabar yozish"})]})]}),k.map(S=>{var P;const A=JSON.parse(localStorage.getItem("user")||"{}"),ne=A._id||A.id,N=S.type!=="group"&&S.members?S.members.find(Y=>Y._id!==ne):null,X=N==null?void 0:N._id,Z=X?d(X):!1,H=S.type==="group"?x(S.members):0;return i.jsx($p,{to:`/a/${S.urlSlug}`,children:i.jsxs(ds,{active:a===S.urlSlug,children:[i.jsxs(Ap,{children:[i.jsx(fs,{$isGroup:S.type==="group"||S.isSavedMessages,style:S.isSavedMessages?{backgroundColor:"#0288D1"}:{},children:S.isSavedMessages?i.jsx(vl,{size:18,color:"white",fill:"white"}):((P=S.avatar)==null?void 0:P.length)>1?i.jsx("img",{src:S.avatar,alt:S.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):S.type==="group"?S.name.charAt(0):S.name.split(" ").map(Y=>Y[0]).join("")}),S.type!=="group"&&!S.isSavedMessages&&i.jsx(Ub,{$online:Z})]}),i.jsxs(ps,{children:[i.jsx(hs,{children:S.name}),i.jsx(gs,{children:S.type==="group"&&H>0?i.jsxs(i.Fragment,{children:[S.lastMessage," · ",i.jsxs(Vb,{children:[H," online"]})]}):S.lastMessage})]}),i.jsxs(Op,{children:[i.jsx(Np,{children:S.time}),S.unread>0&&i.jsx(qb,{children:S.unread})]})]})},S.id)})]})})]})},Wb=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  z-index: 10000;
  display: flex;
  flex-direction: column;
`,Yb=u.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`,Gb=u.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`,Kb=u.div`
  position: absolute;
  width: 200px;
  height: 150px;
  background-color: #2f3136;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;
  
  ${e=>{const t={"top-left":{top:"20px",left:"20px"},"top-right":{top:"20px",right:"20px"},"bottom-left":{bottom:"80px",left:"20px"},"bottom-right":{bottom:"80px",right:"20px"}};return t[e.position]||t["bottom-right"]}}
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  }
`,Lp=u.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #2f3136;
`,Dp=u.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2f3136;
  color: #dcddde;
`,Bp=u.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
`,Fp=u.div`
  font-size: 18px;
  font-weight: 600;
  color: #dcddde;
  margin-bottom: 8px;
`,Up=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b9bbbe;
`,Vp=u.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,qp=u.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${e=>e.active?"#43b581":"#72767d"};
  transition: background-color 0.3s ease;
`,Qb=u.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(32, 34, 37, 0.9) 20%, rgba(32, 34, 37, 0.95) 100%);
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  backdrop-filter: blur(10px);
`,xs=u.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 24px;
  
  ${e=>e.variant==="primary"?`
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.1);
    }
  `:`
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  `}
`,Jb=({isOpen:e,onClose:t,user:n})=>{const[r,o]=f.useState(!1),[s,l]=f.useState(!1),[a,c]=f.useState(!1),[d,x]=f.useState(!1),[p,g]=f.useState(0),[w,v]=f.useState(!1),[b,C]=f.useState("bottom-right"),m=f.useRef(null),h=f.useRef(null);f.useEffect(()=>{if(e){const E=setInterval(()=>{g(k=>k+1)},1e3);return()=>clearInterval(E)}},[e]),f.useEffect(()=>{const E=setInterval(()=>{v(Math.random()>.6)},2e3);return()=>clearInterval(E)},[]);const y=()=>{x(!d)},j=E=>{E.preventDefault();const k=E.clientX,_=E.clientY,R=E.target.getBoundingClientRect(),D=k-R.left,O=_-R.top,S=ne=>{const N=ne.clientX-D,X=ne.clientY-O,Z=window.innerWidth,H=window.innerHeight;let P="bottom-right";N<Z/2?P=X<H/2?"top-left":"bottom-left":P=X<H/2?"top-right":"bottom-right",C(P)},A=()=>{document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",A)};return e?i.jsx(Wb,{children:i.jsxs(Yb,{children:[i.jsx(Gb,{children:d?i.jsx(Lp,{ref:m,autoPlay:!0,muted:!0,playsInline:!0}):i.jsx(Lp,{ref:h,autoPlay:!0,playsInline:!0})}),i.jsx(Kb,{position:b,onClick:y,onMouseDown:j,children:d?i.jsxs(Dp,{children:[i.jsx(Bp,{children:(n||"User")[0]}),i.jsx(Fp,{children:n||"User"}),i.jsxs(Up,{children:[i.jsxs(Vp,{children:[i.jsx(qp,{active:w}),i.jsx("span",{children:w?"Speaking...":"Silent"})]}),r&&i.jsx(mr,{size:16})]})]}):i.jsxs(Dp,{children:[i.jsx(Bp,{children:"You"}),i.jsx(Fp,{children:"You"}),i.jsxs(Up,{children:[i.jsxs(Vp,{children:[i.jsx(qp,{active:!1}),i.jsx("span",{children:"Silent"})]}),r&&i.jsx(mr,{size:16})]})]})}),i.jsxs(Qb,{children:[i.jsx(xs,{onClick:()=>o(!r),active:!r,children:r?i.jsx(mr,{size:24}):i.jsx(ur,{size:24})}),i.jsx(xs,{onClick:()=>l(!s),active:!s,children:s?i.jsx(Zr,{size:24}):i.jsx(yn,{size:24})}),i.jsx(xs,{onClick:()=>c(!a),active:a,children:a?i.jsx(f0,{size:24}):i.jsx(su,{size:24})}),i.jsx(xs,{variant:"primary",onClick:t,children:i.jsx(ql,{size:24})})]})]})}):null},Hp=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.value=800,t.type="sine",n.gain.value=.3,t.start(),t.stop(e.currentTime+.2),setTimeout(()=>{const r=e.createOscillator(),o=e.createGain();r.connect(o),o.connect(e.destination),r.frequency.value=800,r.type="sine",o.gain.value=.3,r.start(),r.stop(e.currentTime+.2)},400)},Wp=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.value=600,t.type="sine",n.gain.value=.4,setTimeout(()=>{const r=e.createOscillator(),o=e.createGain();r.connect(o),o.connect(e.destination),r.frequency.value=600,r.type="sine",o.gain.value=.4},800)},Xb=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
`,Zb=u.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,ej=u.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 600;
  position: relative;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(102, 126, 234, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
    }
  }
`,tj=u.div`
  text-align: center;
`,nj=u.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,rj=u.div`
  color: #43b581;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,oj=u.div`
  display: flex;
  gap: 16px;
`,Yp=u.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 24px;
  
  ${e=>e.variant==="accept"?`
    background-color: #43b581;
    color: white;
    
    &:hover {
      background-color: #3ca374;
      transform: scale(1.1);
    }
  `:`
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.1);
    }
  `}
`,ij=({isOpen:e,onAccept:t,onReject:n,caller:r})=>{var c;const[o,s]=f.useState(0),l=f.useRef(null);f.useEffect(()=>{if(e){Wp(),l.current=setInterval(()=>{Wp()},2e3);const d=setInterval(()=>{s(x=>x+1)},1e3);return()=>{d&&clearInterval(d),l.current&&(clearInterval(l.current),l.current=null)}}},[e]);const a=d=>{const x=Math.floor(d/60),p=d%60;return`${x.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`};return e?i.jsx(Xb,{children:i.jsxs(Zb,{children:[i.jsx(ej,{children:((c=r==null?void 0:r.name)==null?void 0:c[0])||"U"}),i.jsxs(tj,{children:[i.jsx(nj,{children:(r==null?void 0:r.name)||"Unknown"}),i.jsxs(rj,{children:[i.jsx(gr,{size:16}),a(o)]})]}),i.jsxs(oj,{children:[i.jsx(Yp,{variant:"accept",onClick:t,children:i.jsx(kd,{size:24})}),i.jsx(Yp,{onClick:n,children:i.jsx(ql,{size:24})})]})]})}):null},sj=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
`,lj=u.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,aj=u.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 8px;
`,cj=u.div`
  text-align: center;
`,uj=u.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,Gp=u.div`
  color: #b9bbbe;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,dj=u.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`,fj=u.button`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  font-weight: 600;
  
  ${e=>e.variant==="cancel"?`
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
      transform: scale(1.05);
    }
  `:`
    background-color: #72767d;
    color: white;
    
    &:hover {
      background-color: #5a5e63;
      transform: scale(1.05);
    }
  `}
`,pj=u.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`,Da=u.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #43b581;
  animation: ringing 1.4s infinite ease-in-out;
  
  ${e=>e.delay&&`
    animation-delay: ${e.delay}s;
  `}
  
  @keyframes ringing {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`,Kp=({isOpen:e,onCancel:t,target:n})=>{var a;const[r,o]=f.useState(0),s=f.useRef(null);f.useEffect(()=>{if(e){Hp(),s.current=setInterval(()=>{Hp()},1500);const c=setInterval(()=>{o(d=>d+1)},1e3);return()=>{c&&clearInterval(c),s.current&&(clearInterval(s.current),s.current=null)}}},[e]);const l=c=>{const d=Math.floor(c/60),x=c%60;return`${d.toString().padStart(2,"0")}:${x.toString().padStart(2,"0")}`};return e?i.jsx(sj,{children:i.jsxs(lj,{children:[i.jsx(aj,{children:((a=n==null?void 0:n.name)==null?void 0:a[0])||"U"}),i.jsxs(cj,{children:[i.jsx(uj,{children:(n==null?void 0:n.name)||"Unknown"}),i.jsxs(Gp,{children:[i.jsx(g0,{size:16}),"Calling..."]}),i.jsxs(Gp,{children:[i.jsx(gr,{size:16}),l(r)]})]}),i.jsxs(pj,{children:[i.jsx(Da,{}),i.jsx(Da,{delay:.2}),i.jsx(Da,{delay:.4})]}),i.jsx(dj,{children:i.jsxs(fj,{variant:"cancel",onClick:t,children:[i.jsx(ql,{size:20}),"Cancel"]})})]})}):null},hj="http://localhost:3000",gj=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,xj=u.div`
  background-color: var(--secondary-color, #2f3136);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,mj=u.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,yj=u.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  margin-bottom: 8px;
`,vj=u.p`
  color: var(--text-muted-color, #b9bbbe);
  font-size: 14px;
`,kj=u.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted-color, #b9bbbe);
  cursor: pointer;

  &:hover {
    color: var(--text-color, #ffffff);
  }
`,wj=u.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Qp=u.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ms=u.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,Ba=u.input`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: var(--input-color, #202225);
  color: var(--text-color, #ffffff);
  font-size: 14px;
  outline: none;

  &:focus {
    background-color: #40444b;
  }
`,bj=u.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,jj=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed var(--text-muted-color, #b9bbbe);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted-color, #b9bbbe);
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--text-color, #ffffff);
    color: var(--text-color, #ffffff);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Jp=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Sj=u.div`
  position: relative;
  margin-bottom: 8px;
`,Xp=u.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 4px;
  background-color: var(--tertiary-color, #36393f);
`,Zp=u.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: var(--secondary-color, #2f3136);
  }

  ${e=>e.selected&&`
    background-color: rgba(88, 101, 242, 0.1);
    &:hover { background-color: rgba(88, 101, 242, 0.2); }
  `}
`,eh=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,th=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,nh=u.span`
  font-size: 14px;
  color: var(--text-color, #ffffff);
  font-weight: 500;
`,Cj=u.div`
  background-color: var(--tertiary-color, #36393f);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,rh=u.button`
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${e=>e.primary?`
    background-color: var(--primary-color, #5865F2);
    color: white;
    &:hover { background-color: var(--hover-color, #4752C4); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `:`
    background-color: transparent;
    color: var(--text-color, #ffffff);
    &:hover { text-decoration: underline; }
  `}
`,zj=({isOpen:e,onClose:t,onSave:n,group:r={},users:o=[]})=>{var ie;const[s,l]=f.useState(""),[a,c]=f.useState(""),[d,x]=f.useState(""),[p,g]=f.useState([]),[w,v]=f.useState(""),[b,C]=f.useState(!1),m=f.useRef(null),[h,y]=f.useState([]),[j,E]=f.useState(null),k=JSON.parse(localStorage.getItem("user")||"{}"),_=(k==null?void 0:k.id)||(k==null?void 0:k._id),R=String(r.createdBy)===String(_),D=h.find(T=>String(T.userId||T.id||T._id)===String(_)),O=T=>R||D&&D.permissions.includes(T),S=O("edit_group_info"),A=O("add_members"),ne=O("remove_members"),N=O("add_admins");if(f.useEffect(()=>{e&&r&&(l(r.name||""),c(r.description||""),x(r.avatar||""),g(r.members?r.members.map(T=>String(T.id||T._id||T)):[]),y(r.admins?r.admins.map(T=>({...T,userId:String(T.userId||T.id||T._id)})):[]),v(""),E(null))},[e,r]),!e)return null;const X=T=>{p.includes(T)?(g(p.filter(Q=>Q!==T)),y(Q=>Q.filter(ue=>(ue.userId||ue.id)!==T))):g([...p,T])},Z=o.filter(T=>T.name.toLowerCase().includes(w.toLowerCase())&&T.type==="user"&&!T.isSavedMessages&&w.trim()!==""),H=new Map;(ie=r.members)==null||ie.forEach(T=>H.set(T.id||T._id||T,T)),o.forEach(T=>H.set(T.id||T.jammId||T._id,T));const P=p.map(T=>H.get(T)).filter(Boolean),Y=(T,Q)=>{const ue=String(T);y(ge=>{const ae=ge.find(re=>String(re.userId||re.id)===ue);if(ae){const J=ae.permissions.includes(Q)?ae.permissions.filter(je=>je!==Q):[...ae.permissions,Q];return J.length===0?ge.filter(je=>String(je.userId||je.id)!==ue):ge.map(je=>String(je.userId||je.id)===ue?{...je,permissions:J}:je)}else return g(re=>re.includes(ue)?re:[...re,ue]),[...ge,{userId:ue,permissions:[Q]}]})},I=()=>{const T={name:s,description:a,avatar:d,members:p};N&&(T.admins=h),n(T),t()},W=async T=>{var ge;const Q=(ge=T.target.files)==null?void 0:ge[0];if(!Q)return;if(Q.size>2*1024*1024){alert("Fayl hajmi juda katta (maksimum 2MB)");return}C(!0);const ue=new FormData;ue.append("file",Q);try{const ae=await fetch(`${hj}/chats/${r.id||r._id}/avatar`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:ue});if(ae.ok){const re=await ae.text();x(re)}else alert("Rasm yuklashda xatolik yuz berdi")}catch{alert("Tarmoq xatosi")}finally{C(!1)}};return i.jsx(gj,{onClick:t,children:i.jsxs(xj,{onClick:T=>T.stopPropagation(),children:[i.jsxs(mj,{children:[i.jsx(yj,{children:"Guruhni tahrirlash"}),i.jsx(vj,{children:"Guruh ma'lumotlarini o'zgartirish"}),i.jsx(kj,{onClick:t,children:i.jsx(jr,{size:24})})]}),i.jsxs(wj,{children:[i.jsxs(bj,{children:[i.jsx("input",{type:"file",ref:m,style:{display:"none"},accept:"image/*",onChange:W,disabled:!S}),i.jsx(jj,{onClick:()=>{S&&m.current&&m.current.click()},style:{cursor:S?"pointer":"not-allowed"},children:b?i.jsx(xr,{size:24,style:{animation:"spin 1s linear infinite"}}):(d==null?void 0:d.length)>1?i.jsx("img",{src:d,alt:"Group"}):i.jsxs(i.Fragment,{children:[i.jsx(jd,{size:24}),i.jsx("span",{children:"UPLOAD"})]})})]}),i.jsxs(Qp,{children:[i.jsx(ms,{children:"Guruh nomi"}),i.jsx(Ba,{placeholder:"Guruh nomi",value:s,onChange:T=>l(T.target.value),disabled:!S})]}),i.jsxs(Qp,{children:[i.jsx(ms,{children:"Guruh haqida (ixtiyoriy)"}),i.jsx(Ba,{placeholder:"Guruh maqsadini yozing...",value:a,onChange:T=>c(T.target.value),disabled:!S})]}),i.jsxs(Jp,{children:[i.jsxs(ms,{children:["Mavjud a'zolar (",P.length,")"]}),i.jsx(Xp,{children:P.map(T=>{var ge;const Q=String(T.id||T._id),ue=h.find(ae=>String(ae.userId||ae.id)===Q);return i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsxs(Zp,{children:[i.jsxs(eh,{children:[i.jsx(th,{children:((ge=T.avatar)==null?void 0:ge.length)>1?i.jsx("img",{src:T.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(T.name||T.username||"").charAt(0)}),i.jsx(nh,{children:T.name||T.nickname||T.username}),Q===r.createdBy&&i.jsx(Ii,{size:14,color:"#f1c40f"}),Q!==r.createdBy&&ue&&i.jsx(Ii,{size:14,color:"#5865F2"})]}),i.jsxs("div",{style:{display:"flex",gap:8},children:[N&&Q!==r.createdBy&&i.jsx("button",{onClick:()=>E(String(j)===Q?null:Q),style:{background:"transparent",border:"none",color:"#b9bbbe",cursor:"pointer",fontSize:12},children:"Admin"}),ne&&Q!==r.createdBy&&i.jsx("button",{onClick:()=>X(Q),style:{background:"transparent",border:"none",color:"#ed4245",cursor:"pointer"},children:i.jsx(p0,{size:16})})]})]}),j===Q&&i.jsx("div",{style:{padding:"8px 16px",backgroundColor:"var(--input-color, #202225)",fontSize:13,display:"flex",flexDirection:"column",gap:6},children:[{id:"edit_group_info",label:"Ma'lumotlarni tahrirlash"},{id:"add_members",label:"A'zo qo'shish"},{id:"remove_members",label:"A'zo o'chirish"},{id:"delete_others_messages",label:"Xabarlarni o'chirish"},{id:"add_admins",label:"Admin qo'shish"}].map(ae=>{var J;const re=((J=ue==null?void 0:ue.permissions)==null?void 0:J.includes(ae.id))||!1;return i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#b9bbbe"},children:[i.jsx("input",{type:"checkbox",checked:re,onChange:()=>Y(Q,ae.id)}),ae.label]},ae.id)})})]},Q)})})]}),A&&i.jsxs(Jp,{children:[i.jsx(ms,{children:"Yangi a'zo qo'shish"}),i.jsxs(Sj,{children:[i.jsx(Ba,{placeholder:"User qidirish...",value:w,onChange:T=>v(T.target.value),style:{paddingLeft:30,width:"100%"}}),i.jsx(wd,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),w.trim()!==""&&i.jsx(Xp,{children:Z.length===0?i.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):Z.map(T=>{var Q;return i.jsxs(Zp,{selected:p.includes(T.id),onClick:()=>X(T.id),children:[i.jsxs(eh,{children:[i.jsx(th,{children:((Q=T.avatar)==null?void 0:Q.length)>1?i.jsx("img",{src:T.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):T.name.charAt(0)}),i.jsx(nh,{children:T.name})]}),p.includes(T.id)&&i.jsx(ho,{size:16,color:"var(--primary-color, #5865F2)"})]},T.id)})})]})]}),i.jsxs(Cj,{children:[i.jsx(rh,{onClick:t,children:"Bekor qilish"}),i.jsx(rh,{primary:!0,onClick:I,disabled:!s.trim(),children:"Saqlash"})]})]})})},Ej=u.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--background-color);
  height: 100vh;
  overflow: hidden;

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`,_j=u.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`,Tj=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--secondary-color);
  min-height: 56px;

  /* Mobile responsive */
  @media (max-width: 768px) {
    padding: 12px 16px;
    background-color: var(--secondary-color);
    border-bottom: 1px solid var(--border-color);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    min-height: 48px;
  }
`,Rj=u.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`,Ij=u.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.$isSavedMessages?"#0288D1":"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    margin-right: 10px;
  }
`,Pj=u.div`
  flex: 1;
  min-width: 0;
`,Mj=u.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  display: block;
  margin-bottom: 2px;

  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`,$j=u.span`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,Aj=u.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${e=>e.online?"#43b581":"#72767d"};
  animation: ${e=>e.online?"pulse 2s infinite":"none"};

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.7);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(67, 181, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(67, 181, 129, 0);
    }
  }
`,Oj=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;u.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-right: 12px;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    display: flex;
  }
`;u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${e=>e.isGroup?"linear-gradient(135deg, #667eea 0%, #764ba2 100%)":"#7289da"};
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;u.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);

  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;const Fa=u.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }
`;u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;u.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }
`;const Nj=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-muted-color);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-secondary-color);
  }
`,Lj=u.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`,Dj=u.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${e=>e.isOwn?"flex-end":"flex-start"};
  cursor: pointer;
  transition: background-color 0.2s ease;

  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.05);
  //   border-radius: 8px;
  // }
`,oh=u.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  gap: 8px;

  ${e=>e.isOwn?`
    color: #b9bbbe;
    justify-content: flex-end;
  `:`
    color: #72767d;
    justify-content: flex-start;
  `}
`,ih=u.div`
  width: fit-content;
  min-width: 60px;
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;

  ${e=>e.isOwn?`
    background-color: #4a4d52;
    color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 4px;
    text-align: right;
  `:`
    background-color: #40444b;
    color: #dcddde;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 12px;
    text-align: left;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;`}

  ${e=>e.isOwn?`
    color: #ffffff;
    text-align: right;
    justify-content: flex-end;
    flex-direction: row-reverse;
  `:`
    color: #ffffff;
    text-align: left;
    justify-content: flex-start;
    flex-direction: row;
  `}
`,sh=u.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  // user-select: none;

  ${e=>e.isOwn?`
    text-align: right;
  `:`
    text-align: left;
  `}
`;u.div`
  font-size: 11px;
  opacity: 0.7;

  ${e=>e.isOwn?`
    text-align: right;
  `:`
    text-align: left;
  `}
`;const Bj=u.div`
  position: fixed;
  /* Ultra-low opacity for maximum transparent iOS look */
  background-color: rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(5px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 8px;
  min-width: 180px;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;

  transform-origin: top left;
  animation: contextMenuFadeIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;

  @keyframes contextMenuFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`,Ua=u.div`
  padding: 10px 14px;
  color: #dcddde;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  transition: all 0.15s ease;
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--primary-color);
    color: #ffffff;
    transform: translateX(4px);
  }

  ${e=>e.$danger&&`
    color: #f04747;
    &:hover {
      background-color: #f04747;
      color: #ffffff;
    }
  `}
`,lh=u.input`
  background: none;
  border: none;
  color: #dcddde;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);

  &::placeholder {
    color: #72767d;
  }

  &.edit-input {
    /* This class is used for click outside detection */
  }
`,ah=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`,ch=u.span`
  font-size: 11px;
  color: #72767d;
  font-style: italic;
  margin-left: 4px;
`,Va=u.div`
  background-color: #4a4d52;
  border-left: 2px solid #7289da;
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
  font-size: 13px;
  color: #b9bbbe;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #54585e;
  }

  .replay-close {
    position: absolute;
    top: 4px;
    right: 8px;
    color: #72767d;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 2px;

    &:hover {
      color: #dcddde;
    }
  }
`,Fj=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  position: relative;

  span {
    background-color: #36393f;
    color: #72767d;
    font-size: 12px;
    font-weight: 600;
    padding: 0 16px;
    position: relative;
    z-index: 2;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`,Uj=u.span`
  color: #dcddde;
  font-weight: 500;
  cursor: default;
`,Vj=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`,qj=u.div`
  position: fixed;
  bottom: 100px;
  right: 40px;
  background-color: #36393f;
  border: 3px solid #7289da;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
  max-width: 360px;
  max-height: 240px;
  overflow-y: auto;
`,Hj=u.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4a4d52;
    transform: scale(1.1);
  }
`,Wj=u.div`
  padding: 12px 16px 16px;
  background-color: #2f3136;
  border-top: 1px solid #40444b;
  position: relative;
`,Yj=u.div`
  display: flex;
  align-items: flex-end;
  background-color: #40444b;
  border-radius: 20px;
  padding: 8px 12px;
  min-height: 44px;
  transition: background-color 0.2s ease;

  &:focus-within {
    background-color: #4a4d52;
  }
`,Gj=u.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`,uh=u.button`
  color: #b9bbbe;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #dcddde;
  }
`,Kj=u.textarea`
  flex: 1;
  background: none;
  border: none;
  color: #dcddde;
  font-size: 15px;
  line-height: 20px;
  outline: none;
  resize: none;
  min-height: 25px;
  max-height: 400px;
  padding: 0;
  font-family: inherit;

  &::placeholder {
    color: #72767d;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a4d52;
    border-radius: 2px;
  }

  &:hover {
    color: #dcddde;
  }
`,Qj=u.div`
  width: 300px;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    z-index: 10;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`,Jj=u.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
`,dh=u.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: var(--text-color);
  }
`,Xj=u.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`,Zj=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,eS=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,tS=u.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
`,nS=u.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`,qa=u.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ha=u.h4`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
  margin-bottom: 8px;
`,fh=u.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-all;
`,rS=u.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5b6eae;
  }
`,oS=u.div`
  display: flex;
  flex-direction: column;
`,iS=u.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 0 -8px;
  gap: 12px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color, rgba(255, 255, 255, 0.05));
  }
`,sS=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,lS=({onBack:e,selectedChannel:t,selectedNav:n,navigate:r,chats:o=[]})=>{var Pd,Md,$d,Ad,Od;const[s,l]=f.useState(!1),{fetchMessages:a,sendMessage:c,editMessage:d,deleteMessage:x,getUserByUsername:p,createChat:g,editChat:w,previewGroupChat:v,joinGroupChat:b,chatSocket:C,markMessagesAsRead:m,typingUsers:h,sendTypingStatus:y}=Fi(),{isUserOnline:j,getOnlineCount:E}=M0(),k=o.find(z=>z.urlSlug===t||z.id===t),[_,R]=f.useState(""),D=f.useRef(null),[O,S]=f.useState([]),[A,ne]=f.useState(!1),N=async z=>{const $=localStorage.getItem("user"),B=$?JSON.parse($):{},q=B._id||B.id,M=z._id||z.id;if(M===q)return;const K=o.find(le=>le.isGroup||!le.members||le.isSavedMessages?!1:le.members.some(xe=>(xe._id||xe.id)===M));if(K)r(`/a/${K.urlSlug}`),l(!1);else try{const le=await g({isGroup:!1,memberIds:[M]});le&&(r(`/a/${le}`),l(!1))}catch(le){console.error("Failed to start private chat",le)}},[X,Z]=f.useState(null),[H,P]=f.useState(null),[Y,I]=f.useState(""),[W,ie]=f.useState(null),T=k||W,[Q,ue]=f.useState(null),ge=f.useRef({}),ae=f.useRef(null);f.useRef(null);const re=f.useRef(null),J=Ct.useMemo(()=>{const z=localStorage.getItem("user");return z?JSON.parse(z):null},[]),je=(T==null?void 0:T.type)!=="group"&&(T!=null&&T.members)?T.members.find(z=>z._id!==((J==null?void 0:J._id)||(J==null?void 0:J.id))):null,Ne=je?j(je._id):!1,_e=(T==null?void 0:T.type)==="group"?E(T.members):0,en=Ct.useMemo(()=>{if(!je||Ne)return"Online";if(!je.lastSeen)return"Offline";const z=new Date(je.lastSeen),B=new Date-z,q=Math.floor(B/6e4),M=Math.floor(q/60);return q<60?`Last seen ${q}m ago`:M<24?`Last seen ${M}h ago`:`Last seen ${z.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`},[je,Ne]);f.useEffect(()=>{(n==="groups"||n==="a")&&t&&!k?v(t).then(z=>ie(z)).catch(z=>{console.error("Preview failed:",z),ie(null)}):ie(null)},[n,t,k,v]),f.useEffect(()=>{if(!k)return;(async()=>{const $=await a(k.id);S($);const B=(J==null?void 0:J._id)||(J==null?void 0:J.id),q=$.find(M=>{var K;return M.senderId!==B&&!((K=M.readBy)!=null&&K.includes(B))});setTimeout(()=>{const M=q?q.id||q._id:null;M&&ge.current[M]?ge.current[M].scrollIntoView({behavior:"auto",block:"center"}):Vt("auto")},100)})()},[k==null?void 0:k.id,a]),f.useEffect(()=>{if(!(!C||!k))return C.emit("join_chat",{chatId:k.id}),()=>{C.emit("leave_chat",{chatId:k.id})}},[C,k==null?void 0:k.id]),f.useEffect(()=>{if(!C)return;const z=M=>{var xe,me,qt,So,Nd,Ld,Dd,Bd,Fd;if(M.chatId!==(k==null?void 0:k.id))return;const K={id:M._id,user:((xe=M.senderId)==null?void 0:xe.nickname)||((me=M.senderId)==null?void 0:me.username),avatar:((qt=M.senderId)==null?void 0:qt.avatar)||((Ld=((So=M.senderId)==null?void 0:So.nickname)||((Nd=M.senderId)==null?void 0:Nd.username))==null?void 0:Ld.charAt(0))||"U",senderId:((Dd=M.senderId)==null?void 0:Dd._id)||M.senderId,content:M.content,timestamp:new Date(M.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),date:new Date(M.createdAt).toDateString(),edited:M.isEdited,isDeleted:M.isDeleted,readBy:M.readBy||[],replayTo:M.replayTo?{id:M.replayTo._id,user:((Bd=M.replayTo.senderId)==null?void 0:Bd.nickname)||((Fd=M.replayTo.senderId)==null?void 0:Fd.username),content:M.replayTo.content}:null};S(Yl=>Yl.some(e1=>e1.id===K.id)?Yl:[...Yl,K]);const le=(J==null?void 0:J._id)||(J==null?void 0:J.id);K.senderId===le&&setTimeout(()=>Vt("smooth"),100)},$=M=>{M.chatId===(k==null?void 0:k.id)&&S(K=>K.map(le=>le.id===M._id?{...le,content:M.content,edited:!0}:le))},B=M=>{M.chatId===(k==null?void 0:k.id)&&S(K=>K.filter(le=>le.id!==M._id))},q=({chatId:M,readByUserId:K,messageIds:le})=>{(k==null?void 0:k.id)===M&&S(xe=>xe.map(me=>{var So;return(me.senderId&&typeof me.senderId=="object"?me.senderId._id||me.senderId.id:me.senderId)!==K&&(le!=null&&le.includes(me.id||me._id))&&!((So=me.readBy)!=null&&So.includes(K))?{...me,readBy:[...me.readBy||[],K]}:me}))};return C.on("message_new",z),C.on("message_updated",$),C.on("message_deleted",B),C.on("messages_read",q),()=>{C.off("message_new",z),C.off("message_updated",$),C.off("message_deleted",B),C.off("messages_read",q)}},[C,k==null?void 0:k.id]),f.useEffect(()=>{if(!k)return;const z=(J==null?void 0:J._id)||(J==null?void 0:J.id),$=O.filter(q=>{var K;return(q.senderId&&typeof q.senderId=="object"?q.senderId._id||q.senderId.id:q.senderId)!==z&&!((K=q.readBy)!=null&&K.includes(z))});if($.length===0)return;const B=new IntersectionObserver(q=>{const M=[];q.forEach(K=>{var le;if(K.isIntersecting){const xe=K.target.dataset.messageId,me=O.find(qt=>String(qt.id)===String(xe)||String(qt._id)===String(xe));if(me){const qt=me.senderId&&typeof me.senderId=="object"?me.senderId._id||me.senderId.id:me.senderId;String(qt)!==String(z)&&!((le=me.readBy)!=null&&le.includes(z))&&M.push(me.id||me._id)}}}),M.length>0&&m(k.id,M)},{threshold:.1});return $.forEach(q=>{const M=ge.current[q.id];M&&B.observe(M)}),()=>B.disconnect()},[O,k,J,m]),f.useEffect(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},[t,n,X]),f.useEffect(()=>{re.current&&(re.current.style.height="25px",re.current.style.height=`${re.current.scrollHeight}px`)},[_]);const[Rt,ke]=f.useState(0),[Je,Ye]=f.useState(null),[Xe,qe]=f.useState(null),[un,Bt]=f.useState(null),[It,ye]=f.useState(!1),[ze,Le]=f.useState(!1),[Ft,F]=f.useState(""),[V,oe]=f.useState(null),[se,de]=f.useState(null),[te,ce]=f.useState(!1),we=z=>{const $=`${window.location.origin}/${z}`;navigator.clipboard.writeText($).then(()=>{ce(!0),setTimeout(()=>ce(!1),2e3)})};f.useEffect(()=>()=>{Xe&&clearTimeout(Xe),un&&clearTimeout(un)},[Xe,un]);const Ze=Ct.useMemo(()=>O,[O]),Ut=(T==null?void 0:T.name)||"Chat",Vt=(z="auto")=>{var $;($=ae.current)==null||$.scrollIntoView({behavior:z})},dn=z=>{const $=ge.current[z];$&&($.scrollIntoView({behavior:"smooth",block:"center"}),$.style.backgroundColor="rgba(114, 137, 218, 0.3)",setTimeout(()=>{$.style.backgroundColor=""},2e3))},Er=(z,$)=>{Je!==z.id?(ke(1),Ye(z.id)):ke(q=>q+1),Xe&&clearTimeout(Xe);const B=setTimeout(()=>{Rt===1&&Je===z.id&&(Z(z),console.log("Replay triggered for message:",z),setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0)),ke(0),Ye(null)},300);qe(B)},Zn=(z,$)=>{const B=$.clientX,q=$.clientY,M=180,K=z.user==="You"?120:40;let le=B,xe=q;B+M>window.innerWidth&&(le=window.innerWidth-M-10),q+K>window.innerHeight&&(xe=window.innerHeight-K-10),le<10&&(le=10),xe<10&&(xe=10),ue({x:le,y:xe,message:z})},U=async(z,$)=>{switch(z){case"delete":try{S(B=>B.map(q=>q.id===$.id?{...q,isDeleted:!0,content:"Bu xabar o'chirildi"}:q)),await x($.id),console.log("Message deleted:",$)}catch(B){console.error("Failed to delete message",B)}break;case"edit":if($.isDeleted)return;P($),I($.content),console.log("Edit mode started for message:",$);break;case"replay":Z($),R(""),console.log("Replay message:",$),setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0);break}ue(null)},fe=async z=>{if(z.key==="Enter"&&Y.trim())try{const $=Y.trim();S(q=>q.map(M=>M.id===H.id?{...M,content:$,edited:!0}:M));const B=H.id;P(null),I(""),await d(B,$),console.log("Message edited on backend:",B,"->",$)}catch($){console.error("Failed to edit message",$)}else z.key==="Escape"&&(P(null),I(""))},dt=z=>{const $=z.target.value;R($);const B=(k==null?void 0:k.id)||(k==null?void 0:k._id);B&&$.trim()?(D.current||y(B,!0),D.current&&clearTimeout(D.current),D.current=setTimeout(()=>{y(B,!1),D.current=null},3e3)):B&&!$.trim()&&D.current&&(clearTimeout(D.current),y(B,!1),D.current=null)},et=()=>{const z=(k==null?void 0:k.id)||(k==null?void 0:k._id);if(!z||!h[z])return null;const $=h[z],B=Object.keys($);if(B.length===0)return null;const q=(J==null?void 0:J._id)||(J==null?void 0:J.id),M=B.filter(K=>String(K)!==String(q));if(M.length===0)return null;if(k.type==="user")return"yozmoqda...";{const K=M.map(le=>{var me;const xe=(me=k.members)==null?void 0:me.find(qt=>String(qt._id||qt.id)===String(le));return(xe==null?void 0:xe.nickname)||(xe==null?void 0:xe.username)||"Kimdir"});return K.length===1?`${K[0]} yozmoqda...`:K.length===2?`${K[0]} va ${K[1]} yozmoqdalar...`:"Bir necha kishi yozmoqda..."}},Vi=(z,$)=>{$.stopPropagation();const q=[{id:200,name:"Ota"},{id:201,name:"Bob Smith"},{id:202,name:"Charlie Wilson"},{id:203,name:"Diana Brown"}].find(M=>M.name===z);q&&r&&r(`/a/${q.id}`)},D0=z=>{const $=z.split(" ");return $.length>=2?$[0][0]+$[$.length-1][0]:$[0].substring(0,2).toUpperCase()},B0=z=>{const $=/@(\w+)/g,B=/(https?:\/\/[^\s]+)/g,q=[];let M=0;const K=[];let le;for(;(le=$.exec(z))!==null;)K.push({type:"mention",index:le.index,length:le[0].length,username:le[1],content:le[0]});for(;(le=B.exec(z))!==null;)K.push({type:"url",index:le.index,length:le[0].length,url:le[0],content:le[0]});return K.sort((xe,me)=>xe.index-me.index),K.forEach(xe=>{xe.index>M&&q.push({type:"text",content:z.substring(M,xe.index)}),q.push(xe),M=xe.index+xe.length}),M<z.length&&q.push({type:"text",content:z.substring(M)}),q.length>0?q:[{type:"text",content:z}]},F0=async(z,$)=>{$.stopPropagation();try{const B=await p(z);if(B&&r){if(J&&B.id===J.id){alert("Siz o'zingiz bilan suhbat qura olmaysiz");return}const q=o.find(M=>!M.isGroup&&M.members&&M.members.some(K=>K._id===B.id));if(q)r(`/a/${q.urlSlug}`);else{const M=await g({isGroup:!1,memberIds:[B.id]});M&&r(`/a/${M}`)}}else alert("Bunday foydalanuvchi topilmadi")}catch(B){console.error("Error handling mention click:",B),alert("Foydalanuvchini qidirishda xatolik yuz berdi")}},Id=z=>B0(z).map((B,q)=>B.type==="mention"?i.jsx("span",{onClick:M=>F0(B.username,M),style:{pointerEvents:"auto",color:"var(--primary-color)",backgroundColor:"var(--hover-color)",padding:"2px 4px",borderRadius:"4px",cursor:"pointer",fontWeight:"500",transition:"background-color 0.2s ease"},onMouseEnter:M=>{M.target.style.backgroundColor="var(--active-color)"},onMouseLeave:M=>{M.target.style.backgroundColor="var(--hover-color)"},children:B.content},q):B.type==="url"?i.jsx("a",{href:B.url,target:"_blank",rel:"noopener noreferrer",style:{color:"var(--primary-color)",textDecoration:"none",borderBottom:"1px solid transparent",transition:"border-color 0.2s ease",cursor:"pointer"},onMouseEnter:M=>{M.target.style.borderBottomColor="var(--primary-color)"},onMouseLeave:M=>{M.target.style.borderBottomColor="transparent"},children:B.content}):i.jsx("span",{children:B.content},q)),U0=["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😱","😭","😤","😠","😡","🤬","🤯","😳","🤪","😵","🥴","😵‍💫","🤯","🥶","🥵","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],V0=z=>{R($=>$+z),ye(!1),setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0)},q0=z=>{z.stopPropagation(),ye(!It),It&&setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0)},H0=()=>{ue(null)},W0=z=>{de({name:z}),setTimeout(()=>{de(null),F(z),Le(!0)},3e3)},Y0=()=>{F(V.name),Le(!0),oe(null)},G0=()=>{oe(null)},K0=()=>{de(null)},Q0=()=>{Le(!1),F("")};f.useEffect(()=>{const z=B=>{Q&&H0()},$=B=>{It&&!B.target.closest(".emoji-picker-container")&&!B.target.closest(".emoji-button")&&ye(!1)};return document.addEventListener("click",z),document.addEventListener("click",$),()=>{document.removeEventListener("click",z),document.removeEventListener("click",$)}},[Q,It]),f.useEffect(()=>{const z=$=>{H&&!$.target.closest(".edit-input")&&(P(null),I(""))};if(H)return document.addEventListener("click",z),()=>{document.removeEventListener("click",z)}},[H]);const J0=(z=>{const $=[];let B=null;return z.forEach(q=>{let M;if(q.date)M=q.date;else if(q.timestamp){const K=new Date(q.timestamp);isNaN(K.getTime())?M=new Date().toDateString():M=K.toDateString()}else M=new Date().toDateString();M!==B&&(B=M,$.push({type:"date",date:M,messages:[]})),$.push({type:"message",...q,date:M})}),$})(Ze),X0=z=>{const $=new Date(z),B=new Date,q=new Date(B);return q.setDate(q.getDate()-1),$.toDateString()===B.toDateString()?"Today":$.toDateString()===q.toDateString()?"Yesterday":$.toLocaleDateString("en-US",{month:"long",day:"numeric",year:$.getFullYear()!==B.getFullYear()?"numeric":void 0})},Z0=async z=>{if(z.key==="Enter"&&_.trim()){const $=_.trim(),B=X?X.id:null;R(""),Z(null),setTimeout(()=>{re.current&&re.current.focus()},0);try{const q=await c(k.id,$,B),M=await a(k.id);S(M),setTimeout(()=>Vt("smooth"),100),console.log("Message sent to backend:",q)}catch(q){console.error("Failed to send message:",q)}}};return i.jsxs(_j,{children:[i.jsxs(Ej,{children:[i.jsxs(Tj,{children:[i.jsxs(Rj,{onClick:()=>(n==="groups"||n==="users"||n==="a")&&l(z=>!z),style:{cursor:n==="groups"||n==="users"||n==="a"?"pointer":"default"},children:[i.jsx(Fa,{onClick:z=>{z.stopPropagation(),e()},children:i.jsx($k,{size:20})}),i.jsx(Ij,{$isSavedMessages:k==null?void 0:k.isSavedMessages,children:k!=null&&k.isSavedMessages?i.jsx(vl,{size:20,color:"white",fill:"white"}):((Pd=k==null?void 0:k.avatar)==null?void 0:Pd.length)>1?i.jsx("img",{src:k.avatar,alt:Ut,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):Ut.charAt(0).toUpperCase()}),i.jsxs(Pj,{children:[i.jsx(Mj,{children:n==="channels"?i.jsx(i.Fragment,{children:Ut}):i.jsx(i.Fragment,{children:Ut})}),i.jsx($j,{children:(T==null?void 0:T.type)==="group"?i.jsxs(i.Fragment,{children:[i.jsx(xo,{size:14,style:{marginRight:4}}),((Md=T==null?void 0:T.members)==null?void 0:Md.length)||0," members",_e>0&&`, ${_e} online`]}):i.jsxs(i.Fragment,{children:[i.jsx(Aj,{online:Ne}),en]})})]})]}),i.jsx(Oj,{children:n=="users"&&i.jsxs(i.Fragment,{children:[i.jsx(Fa,{onClick:()=>W0(k==null?void 0:k.name),children:i.jsx(kd,{size:20})}),i.jsx(Fa,{children:i.jsx(ew,{size:20})})]})})]}),i.jsx("div",{style:{display:"flex",flex:1,overflow:"hidden",position:"relative"},children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0},children:[i.jsxs(Nj,{onContextMenu:z=>z.preventDefault(),children:[i.jsx(Lj,{children:J0.map((z,$)=>{if(z.type==="date")return i.jsx(Fj,{children:i.jsx("span",{children:X0(z.date)})},`date-${$}`);const B=J?J._id||J.id:null,q=z.senderId&&typeof z.senderId=="object"?z.senderId._id||z.senderId.id:z.senderId,M=B&&q===B;return i.jsx(Dj,{"data-message-id":z.id,isOwn:M,onClick:()=>Er(z),ref:K=>{ge.current[z.id]=K},children:M?i.jsxs(i.Fragment,{children:[z.replayTo&&i.jsxs(Va,{onClick:K=>{K.stopPropagation();const xe=O.find(me=>me.user===z.replayTo.user&&me.content===z.replayTo.content);xe&&dn(xe.id)},children:[z.replayTo.user,' - "',z.replayTo.content,'"']}),i.jsx(ih,{isOwn:!0,onContextMenu:K=>{K.preventDefault(),K.stopPropagation(),Zn(z,K)},children:(H==null?void 0:H.id)===z.id?i.jsx(ah,{children:i.jsx(lh,{className:"edit-input",type:"text",value:Y,onChange:K=>I(K.target.value),onKeyDown:fe,placeholder:"Xabarni tahrirlang...",autoFocus:!0})}):i.jsxs(i.Fragment,{children:[i.jsx(sh,{isOwn:!0,children:Id(z.content)}),z.edited&&i.jsx(ch,{children:"(tahrirlandi)"})]})}),i.jsxs(oh,{isOwn:!0,children:[i.jsx("span",{children:z.timestamp}),!z.isDeleted&&i.jsx("span",{style:{marginLeft:"4px",display:"flex",alignItems:"center"},children:z.readBy&&z.readBy.length>0?i.jsx(Dk,{size:14,color:"#4ade80"}):i.jsx(ho,{size:14,color:"#72767d"})})]})]}):i.jsxs(i.Fragment,{children:[i.jsxs(oh,{isOwn:!1,children:[n==="groups"&&i.jsx(Vj,{onClick:K=>Vi(z.user,K),children:D0(z.user)}),i.jsx("div",{style:{flex:1},children:i.jsx(Uj,{children:z.user})})]}),z.replayTo&&i.jsxs(Va,{onClick:K=>{K.stopPropagation();const xe=O.find(me=>me.user===z.replayTo.user&&me.content===z.replayTo.content);xe&&dn(xe.id)},children:[z.replayTo.user,' - "',z.replayTo.content,'"']}),i.jsx(ih,{isOwn:!1,onContextMenu:K=>{K.preventDefault(),K.stopPropagation(),Zn(z,K)},children:(H==null?void 0:H.id)===z.id?i.jsx(ah,{children:i.jsx(lh,{className:"edit-input",type:"text",value:Y,onChange:K=>I(K.target.value),onKeyDown:fe,placeholder:"Xabarni tahrirlang...",autoFocus:!0})}):i.jsxs(i.Fragment,{children:[i.jsx(sh,{isOwn:!1,children:Id(z.content)}),z.edited&&i.jsx(ch,{children:"(tahrirlandi)"})]})})]})},z.id)})}),i.jsx("div",{ref:ae})]}),i.jsx(Wj,{children:W&&!k?i.jsxs("div",{style:{padding:"20px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[i.jsx("div",{style:{color:"var(--text-muted-color)"},children:"Siz ushbu guruh a'zosi emassiz"}),i.jsx("button",{onClick:async()=>{try{await b(W.privateurl||W.jammId),r(`/a/${W.jammId||W.privateurl}`,{replace:!0})}catch(z){alert(z.message||"Guruhga qo'shilishda xatolik yuz berdi")}},style:{background:"#5865F2",color:"white",padding:"10px 20px",border:"none",borderRadius:"4px",cursor:"pointer",fontWeight:"bold"},children:"Guruhga qo'shilish"})]}):i.jsxs(i.Fragment,{children:[X&&i.jsx(Va,{onClick:()=>{dn(X.id)},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[i.jsxs("div",{children:[i.jsx("strong",{style:{color:"#7289da"},children:X.user}),i.jsx("div",{style:{fontSize:"12px",opacity:.8,marginTop:"2px"},children:X.content})]}),i.jsx("span",{className:"replay-close",onClick:z=>{z.stopPropagation(),Z(null)},children:"✕"})]})}),et()&&i.jsx(TypingIndicator,{children:et()}),i.jsxs(Yj,{children:[i.jsxs(Gj,{children:[i.jsx(uh,{children:i.jsx(Ri,{size:20})}),i.jsx(uh,{onClick:q0,className:"emoji-button",children:i.jsx(aw,{size:20})})]}),i.jsx(Kj,{id:"message-input",ref:re,value:_,onChange:dt,onKeyDown:Z0,placeholder:"Message...",rows:1})]}),It&&i.jsx(qj,{className:"emoji-picker-container",style:{position:"fixed",bottom:"100px",right:"40px",backgroundColor:"#36393f",border:"3px solid #7289da",borderRadius:"12px",padding:"16px",boxShadow:"0 12px 24px rgba(0, 0, 0, 0.6)",zIndex:9999,display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"6px",maxWidth:"360px",maxHeight:"240px",overflowY:"auto"},children:U0.map((z,$)=>i.jsx(Hj,{onClick:()=>V0(z),style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"8px",borderRadius:"6px",minWidth:"32px",minHeight:"32px",display:"flex",alignItems:"center",justifyContent:"center"},children:z},$))})]})})]})}),Q&&i.jsxs(Bj,{style:{left:`${Q.x}px`,top:`${Q.y}px`},onClick:z=>z.stopPropagation(),onContextMenu:z=>{z.preventDefault(),z.stopPropagation()},children:[i.jsxs(Ua,{onClick:()=>U("replay",Q.message),children:[i.jsx(rw,{size:16})," Javob yozish"]}),(()=>{var M,K;if(!J||!Q.message)return null;const z=J._id||J.id,B=(Q.message.senderId&&typeof Q.message.senderId=="object"?Q.message.senderId._id||Q.message.senderId.id:Q.message.senderId)===z;let q=!1;if(!B&&(k==null?void 0:k.type)==="group"){const le=k.createdBy===z,xe=(M=k.admins)==null?void 0:M.find(me=>(me.userId||me.id||me._id)===z);q=le||xe&&((K=xe.permissions)==null?void 0:K.includes("delete_others_messages"))}return!B&&!q?null:i.jsxs(i.Fragment,{children:[B&&i.jsxs(Ua,{onClick:()=>U("edit",Q.message),children:[i.jsx(jp,{size:16})," Tahrirlash"]}),i.jsxs(Ua,{onClick:()=>U("delete",Q.message),$danger:!0,children:[i.jsx(bd,{size:16})," O'chirish"]})]})})()]}),i.jsx(ij,{isOpen:!!V,onAccept:Y0,onReject:G0,caller:V}),i.jsx(Kp,{isOpen:!!se,onCancel:K0,target:se}),i.jsx(Jb,{isOpen:ze,onClose:Q0,user:Ft})]}),s&&k&&i.jsxs(Qj,{children:[i.jsxs(Jj,{children:[i.jsx(dh,{onClick:()=>l(!1),children:i.jsx(jr,{size:20})}),i.jsx("span",{style:{flex:1,textAlign:"center"},children:k.type==="user"?"Foydalanuvchi ma'lumotlari":"Guruh ma'lumotlari"}),k.type==="group"?(()=>{var M,K;const z=(J==null?void 0:J._id)||(J==null?void 0:J.id),$=k.createdBy===z,B=(M=k.admins)==null?void 0:M.find(le=>(le.userId||le.id||le._id)===z);return $||B&&((K=B.permissions)==null?void 0:K.length)>0?i.jsx(dh,{onClick:()=>ne(!0),children:i.jsx(jp,{size:18})}):i.jsx("div",{style:{width:28}})})():i.jsx("div",{style:{width:28}})]}),i.jsxs(Xj,{children:[i.jsxs(Zj,{children:[i.jsx(eS,{style:k!=null&&k.isSavedMessages?{background:"#0288D1"}:{},children:k!=null&&k.isSavedMessages?i.jsx(vl,{size:40,color:"white",fill:"white"}):(($d=k==null?void 0:k.avatar)==null?void 0:$d.length)>1?i.jsx("img",{src:k.avatar,alt:k.name}):k.name.charAt(0)}),i.jsx(tS,{children:k.name}),i.jsx(nS,{children:k.type==="user"?(()=>{var M;const z=localStorage.getItem("user"),$=z?JSON.parse(z):null,B=(M=k.members)==null?void 0:M.find(K=>(K._id||K.id)!==($==null?void 0:$.id)),q=(B==null?void 0:B._id)||(B==null?void 0:B.id);return q?i.jsx("span",{style:{color:j(q)?"var(--primary-color)":"var(--text-muted-color)"},children:j(q)?"Online":B.lastSeen||B.lastActive?`Oxirgi marta: ${new Date(B.lastSeen||B.lastActive).toLocaleTimeString("uz-UZ",{hour:"2-digit",minute:"2-digit"})}`:"Offline"}):null})():i.jsxs(i.Fragment,{children:[((Ad=k.members)==null?void 0:Ad.length)||0," a'zo",_e>0&&` · ${_e} online`]})})]}),k.description&&i.jsxs(qa,{children:[i.jsx(Ha,{children:"Haqida"}),i.jsx(fh,{children:k.description})]}),(T==null?void 0:T.type)==="group"&&i.jsxs(qa,{children:[i.jsx(Ha,{children:"Taklif havolasi"}),i.jsxs(fh,{style:{fontSize:"12px",color:"var(--text-muted-color)"},children:[window.location.origin,"/",T.privateurl||T.urlSlug]}),i.jsx(rS,{onClick:()=>we(T.privateurl||T.urlSlug),children:te?"Nusxa olindi!":"Nusxa olish"})]}),(T==null?void 0:T.type)==="group"&&i.jsxs(qa,{children:[i.jsxs(Ha,{children:["A'zolar —"," ",(T==null?void 0:T.memberCount)||((Od=T==null?void 0:T.members)==null?void 0:Od.length)||0]}),i.jsxs(oS,{children:[(T==null?void 0:T.members)&&T.members.map(z=>{var M;const $=typeof z=="object"?z:null;if(!$)return null;const B=$._id||$.id,q=$.name||$.nickname||$.username||"Foydalanuvchi";return i.jsxs(iS,{onClick:()=>N($),children:[i.jsx(sS,{children:((M=$.avatar)==null?void 0:M.length)>1?i.jsx("img",{src:$.avatar,alt:q,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):q.charAt(0)}),i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsx("span",{style:{fontSize:"14px",fontWeight:"500"},children:q}),i.jsx("span",{style:{fontSize:"12px",color:j(B)?"var(--primary-color)":"var(--text-muted-color)"},children:j(B)?"Online":$.lastSeen||$.lastActive?`Oxirgi marta: ${new Date($.lastSeen||$.lastActive).toLocaleTimeString("uz-UZ",{hour:"2-digit",minute:"2-digit"})}`:"Offline"})]})]},B)}),(!(T!=null&&T.members)||T.members.length===0)&&i.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)"},children:"A'zolar ro'yxati mavjud emas"})]})]})]})]}),i.jsx(Kp,{}),i.jsx(zj,{isOpen:A,onClose:()=>ne(!1),group:k,users:o.filter(z=>z.type==="user"),onSave:async z=>{try{await w(k.id||k._id,z)}catch($){console.error("Guruhni tahrirlashda xatolik",$)}}})]})},aS="http://localhost:3000",cS=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,uS=u.div`
  background-color: var(--secondary-color);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,dS=u.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,fS=u.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,pS=u.p`
  color: var(--text-muted-color);
  font-size: 14px;
`,hS=u.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`,gS=u.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,ph=u.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Wa=u.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
`,Ya=u.input`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &:focus {
    background-color: #40444b;
  }
`,xS=u.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,mS=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px dashed var(--text-muted-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-muted-color);
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: var(--text-color);
    color: var(--text-color);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,yS=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,vS=u.div`
  position: relative;
  margin-bottom: 8px;
`,kS=u.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--tertiary-color);
`,wS=u.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: var(--secondary-color);
  }

  ${e=>e.selected&&`
    background-color: rgba(88, 101, 242, 0.1);
    &:hover { background-color: rgba(88, 101, 242, 0.2); }
  `}
`,bS=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,jS=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,SS=u.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
`,CS=u.div`
  background-color: var(--tertiary-color);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,hh=u.button`
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${e=>e.primary?`
    background-color: var(--primary-color);
    color: white;
    &:hover { background-color: var(--hover-color); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `:`
    background-color: transparent;
    color: var(--text-color);
    &:hover { text-decoration: underline; }
  `}
`,zS=({isOpen:e,onClose:t,onCreate:n,users:r=[]})=>{const[o,s]=f.useState(""),[l,a]=f.useState(""),[c,d]=f.useState(""),[x,p]=f.useState([]),[g,w]=f.useState(""),[v,b]=f.useState(!1),C=f.useRef(null);if(!e)return null;const m=()=>{o.trim()&&(n({name:o,description:l,image:c,members:x}),s(""),a(""),d(""),p([]),t())},h=E=>{x.includes(E)?p(x.filter(k=>k!==E)):p([...x,E])},y=r.filter(E=>E.name.toLowerCase().includes(g.toLowerCase())&&E.type==="user"&&!E.isSavedMessages&&g.trim()!==""),j=async E=>{var R;const k=(R=E.target.files)==null?void 0:R[0];if(!k)return;if(k.size>2*1024*1024){alert("Fayl hajmi juda katta (maksimum 2MB)");return}b(!0);const _=new FormData;_.append("file",k);try{const D=await fetch(`${aS}/chats/upload-avatar`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:_});if(D.ok){const O=await D.text();d(O)}else alert("Rasm yuklashda xatolik yuz berdi")}catch{alert("Tarmoq xatosi")}finally{b(!1)}};return i.jsx(cS,{onClick:t,children:i.jsxs(uS,{onClick:E=>E.stopPropagation(),children:[i.jsxs(dS,{children:[i.jsx(fS,{children:"Guruh yaratish"}),i.jsx(pS,{children:"Do'stlaringiz bilan muloqot qiling"}),i.jsx(hS,{onClick:t,children:i.jsx(jr,{size:24})})]}),i.jsxs(gS,{children:[i.jsxs(xS,{children:[i.jsx("input",{type:"file",ref:C,style:{display:"none"},accept:"image/*",onChange:j}),i.jsx(mS,{onClick:()=>{C.current&&C.current.click()},children:v?i.jsx(xr,{size:24,style:{animation:"spin 1s linear infinite"}}):c?i.jsx("img",{src:c,alt:"Group"}):i.jsxs(i.Fragment,{children:[i.jsx(jd,{size:24}),i.jsx("span",{children:"UPLOAD"})]})})]}),i.jsxs(ph,{children:[i.jsx(Wa,{children:"Guruh nomi"}),i.jsx(Ya,{placeholder:"Yangi guruh",value:o,onChange:E=>s(E.target.value),autoFocus:!0})]}),i.jsxs(ph,{children:[i.jsx(Wa,{children:"Guruh haqida (ixtiyoriy)"}),i.jsx(Ya,{placeholder:"Guruh maqsadini yozing...",value:l,onChange:E=>a(E.target.value)})]}),i.jsxs(yS,{children:[i.jsxs(Wa,{children:["Ishtirokchilar (",x.length,")"]}),i.jsxs(vS,{children:[i.jsx(Ya,{placeholder:"User qidirish...",value:g,onChange:E=>w(E.target.value),style:{paddingLeft:30}}),i.jsx(wd,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),g.trim()!==""&&i.jsx(kS,{children:y.length===0?i.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):y.map(E=>i.jsxs(wS,{selected:x.includes(E.id),onClick:()=>h(E.id),children:[i.jsxs(bS,{children:[i.jsx(jS,{children:E.avatar||E.name.charAt(0)}),i.jsx(SS,{children:E.name})]}),x.includes(E.id)&&i.jsx(ho,{size:16,color:"var(--primary-color)"})]},E.id))})]})]}),i.jsxs(CS,{children:[i.jsx(hh,{onClick:t,children:"Bekor qilish"}),i.jsx(hh,{primary:!0,onClick:m,disabled:!o.trim(),children:"Guruh yaratish"})]})]})})},ES=f.createContext(null),Ui=()=>{const e=f.useContext(ES);if(!e)throw new Error("useCourses must be used within CoursesProvider");return e},_S=u.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,TS=u.div`
  width: 480px;
  max-width: 95vw;
  max-height: 90vh;
  background-color: var(--secondary-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,RS=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,IS=u.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,PS=u.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`,MS=u.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,$0=u.div`
  width: 100%;
  height: 140px;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  ${e=>e.hasImage?`
    border: none;
  `:`
    &:hover {
      border-color: var(--primary-color);
      background-color: rgba(88, 101, 242, 0.05);
    }
  `}
`,$S=u.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
  font-size: 14px;
  font-weight: 500;

  ${$0}:hover & {
    opacity: 1;
  }
`,AS=u.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`,OS=u.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,Ga=u.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ka=u.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,gh=u.input`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,NS=u.textarea`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,LS=u.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,xh=u.button`
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${e=>e.primary?`
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);

    &:hover {
      box-shadow: 0 4px 14px rgba(88, 101, 242, 0.5);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `:`
    background: var(--input-color);
    color: var(--text-color);

    &:hover {
      background: var(--hover-color);
    }
  `}
`,DS=({isOpen:e,onClose:t,onCreated:n})=>{const{createCourse:r}=Ui(),[o,s]=f.useState(""),[l,a]=f.useState(""),[c,d]=f.useState("");if(f.useRef(null),!e)return null;const x=()=>{if(!o.trim())return;const w=r(o.trim(),l.trim(),c);s(""),a(""),d(""),n(w)},p=w=>{d(w.target.value)},g=w=>{w.key==="Escape"&&t()};return i.jsx(_S,{onClick:t,onKeyDown:g,children:i.jsxs(TS,{onClick:w=>w.stopPropagation(),children:[i.jsxs(RS,{children:[i.jsx(IS,{children:"Yangi kurs yaratish"}),i.jsx(PS,{onClick:t,children:i.jsx(jr,{size:18})})]}),i.jsxs(MS,{children:[i.jsx($0,{hasImage:!!c,children:c?i.jsxs(i.Fragment,{children:[i.jsx(AS,{src:c,alt:"Course",onError:()=>d("")}),i.jsx($S,{children:"Rasmni o'zgartirish"})]}):i.jsxs(i.Fragment,{children:[i.jsx(Yk,{size:32,color:"var(--text-muted-color)"}),i.jsx(OS,{children:"Kurs uchun rasm URL kiriting"})]})}),i.jsxs(Ga,{children:[i.jsx(Ka,{children:"Rasm URL (ixtiyoriy)"}),i.jsx(gh,{type:"url",placeholder:"https://example.com/image.jpg",value:c,onChange:p})]}),i.jsxs(Ga,{children:[i.jsx(Ka,{children:"Kurs nomi *"}),i.jsx(gh,{type:"text",placeholder:"Masalan: React Asoslari",value:o,onChange:w=>s(w.target.value),autoFocus:!0})]}),i.jsxs(Ga,{children:[i.jsx(Ka,{children:"Tavsif"}),i.jsx(NS,{placeholder:"Kurs haqida qisqacha ma'lumot...",value:l,onChange:w=>a(w.target.value)})]})]}),i.jsxs(LS,{children:[i.jsx(xh,{onClick:t,children:"Bekor qilish"}),i.jsx(xh,{primary:!0,disabled:!o.trim(),onClick:x,children:"Yaratish"})]})]})})},BS=u.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh);
  }
`,FS=u.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  height: 56ppx;
  align-items: center;
  justify-content: space-between;
`;u.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;const US=u.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background-color: var(--hover-color);
  }
`;u.div`
  padding: 12px 16px;
`;const VS=u.input`
  width: 100%;
  padding: 8px 12px;
  background-color: var(--input-color);
  border: none;
  border-radius: 6px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.3);
  }
`,qS=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`,HS=u.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--text-secondary-color);
  gap: 12px;
  position: relative;

  &:hover {
    background-color: var(--hover-color);
  }

  ${e=>e.active&&`
    background-color: var(--active-color);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 3px;
      background: var(--primary-color);
      border-radius: 0 3px 3px 0;
    }
  `}
`,WS=u.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${e=>e.gradient||"linear-gradient(135deg, #667eea, #764ba2)"};
  background-image: ${e=>e.src?`url(${e.src})`:"none"};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`,YS=u.div`
  flex: 1;
  min-width: 0;
`,GS=u.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,KS=u.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,QS=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`,JS=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted-color);
`;u.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;const XS=u.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;

  ${e=>{switch(e.status){case"admin":return"background: rgba(88, 101, 242, 0.15); color: var(--primary-color);";case"approved":return"background: rgba(67, 181, 129, 0.15); color: var(--success-color);";case"pending":return"background: rgba(250, 166, 26, 0.15); color: var(--warning-color);";default:return"background: var(--input-color); color: var(--text-muted-color);"}}}
`,ZS=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  gap: 12px;
`,e4=u.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`,t4=({selectedCourse:e,onSelectCourse:t})=>{const{courses:n,isAdmin:r,isEnrolled:o}=Ui(),[s,l]=f.useState(""),[a,c]=f.useState(!1),d=Ct.useMemo(()=>s?n.filter(p=>p.name.toLowerCase().includes(s.toLowerCase())||p.description.toLowerCase().includes(s.toLowerCase())):n.filter(p=>{const g=o(p.id);return g==="admin"||g==="approved"||g==="pending"}),[n,s,o]),x=p=>{switch(o(p)){case"admin":return{text:"Admin",icon:null};case"approved":return{text:"A'zo",icon:i.jsx(yd,{size:10})};case"pending":return{text:"Kutilmoqda",icon:i.jsx(gr,{size:10})};default:return null}};return i.jsxs(i.Fragment,{children:[i.jsxs(BS,{children:[i.jsxs(FS,{children:[i.jsx(VS,{type:"text",placeholder:"Kurslarni qidirish...",value:s,onChange:p=>l(p.target.value),style:{flex:1,marginRight:"12px"}}),i.jsx(US,{onClick:()=>c(!0),title:"Yangi kurs yaratish",children:i.jsx(Ri,{size:18})})]}),i.jsx(qS,{children:d.length===0?i.jsxs(ZS,{children:[i.jsx(e4,{children:i.jsx(go,{size:24})}),i.jsx("span",{children:"Hozircha kurslar yo'q"}),i.jsx("span",{style:{fontSize:12},children:"Yangi kurs yaratish uchun + tugmasini bosing"})]}):d.map(p=>{const g=x(p.id),w=p.members.filter(v=>v.status==="approved").length;return i.jsxs(HS,{active:e===p.id,onClick:()=>t(p.id),children:[i.jsx(WS,{src:p.image,gradient:p.gradient,children:!p.image&&p.name.charAt(0)}),i.jsxs(YS,{children:[i.jsx(GS,{children:p.name}),i.jsxs(KS,{children:[p.lessons.length>0?`${p.lessons.length} ta dars`:"Hali dars yo'q",g&&i.jsxs(XS,{status:o(p.id),children:[g.icon,g.text]})]})]}),i.jsx(QS,{children:i.jsxs(JS,{children:[i.jsx(xo,{size:12}),w]})})]},p.id)})})]}),i.jsx(DS,{isOpen:a,onClose:()=>c(!1),onCreated:p=>{c(!1),t(p)}})]})},n4=u.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`,r4=u.div`
  width: 480px;
  max-width: 95vw;
  max-height: 90vh;
  background-color: var(--secondary-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,o4=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,i4=u.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,s4=u.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`,l4=u.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Oo=u.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,No=u.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,mh=u.input`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,a4=u.textarea`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,c4=u.div`
  display: flex;
  background-color: var(--input-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
  padding: 4px;
  gap: 4px;
`,yh=u.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: ${e=>e.active?"var(--primary-color)":"transparent"};
  color: ${e=>e.active?"white":"var(--text-secondary-color)"};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${e=>e.active?"var(--primary-color)":"var(--hover-color)"};
    color: ${e=>e.active?"white":"var(--text-color)"};
  }
`,u4=u.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,d4=u.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: var(--input-color);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
    background-color: rgba(88, 101, 242, 0.05);
  }

  svg {
    margin-bottom: 10px;
  }
`,f4=u.input`
  display: none;
`,p4=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--input-color);
  border-radius: 8px;
  border: 1px solid var(--primary-color);
`,h4=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
`,g4=u.span`
  color: var(--text-muted-color);
  font-size: 12px;
`,x4=u.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #ed4245;
    background: rgba(237, 66, 69, 0.1);
  }
`,m4=u.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,vh=u.button`
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${e=>e.primary?`
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);

    &:hover {
      box-shadow: 0 4px 14px rgba(88, 101, 242, 0.5);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `:`
    background: var(--input-color);
    color: var(--text-color);

    &:hover {
      background: var(--hover-color);
    }
  `}
`,y4=({isOpen:e,onClose:t,courseId:n})=>{const{addLesson:r}=Ui(),[o,s]=f.useState(""),[l,a]=f.useState("upload"),[c,d]=f.useState(""),[x,p]=f.useState(null),[g,w]=f.useState(""),v=f.useRef(null);if(!e)return null;const b=j=>{j.target.files&&j.target.files[0]&&p(j.target.files[0])},C=()=>{p(null),v.current&&(v.current.value="")},m=j=>{if(j===0)return"0 Bytes";const E=1024,k=["Bytes","KB","MB","GB"],_=Math.floor(Math.log(j)/Math.log(E));return parseFloat((j/Math.pow(E,_)).toFixed(2))+" "+k[_]},h=()=>!(!o.trim()||l==="url"&&!c.trim()||l==="upload"&&!x),y=()=>{if(!h())return;const j=l==="url"?c.trim():`upload://${x.name}`;r(n,o.trim(),j,g.trim()),s(""),d(""),p(null),w(""),a("upload"),t()};return i.jsx(n4,{onClick:t,children:i.jsxs(r4,{onClick:j=>j.stopPropagation(),children:[i.jsxs(o4,{children:[i.jsx(i4,{children:"Yangi dars qo'shish"}),i.jsx(s4,{onClick:t,children:i.jsx(jr,{size:18})})]}),i.jsxs(l4,{children:[i.jsxs(Oo,{children:[i.jsx(No,{children:"Dars nomi *"}),i.jsx(mh,{type:"text",placeholder:"Masalan: React Hooks asoslari",value:o,onChange:j=>s(j.target.value),autoFocus:!0})]}),i.jsxs(Oo,{children:[i.jsx(No,{children:"Video manbasi *"}),i.jsxs(c4,{children:[i.jsx(yh,{active:l==="upload",onClick:()=>a("upload"),children:"Video yuklash"}),i.jsx(yh,{active:l==="url",onClick:()=>a("url"),children:"YouTube URL"})]})]}),l==="upload"?i.jsxs(Oo,{children:[i.jsx(No,{children:"Video fayl *"}),i.jsx(u4,{children:x?i.jsxs(p4,{children:[i.jsxs(h4,{children:[i.jsx(Vk,{size:20,color:"var(--primary-color)"}),i.jsxs("div",{children:[x.name,i.jsx(g4,{style:{display:"block",marginTop:"2px"},children:m(x.size)})]})]}),i.jsx(x4,{onClick:C,children:i.jsx(jr,{size:16})})]}):i.jsxs(d4,{children:[i.jsx(jd,{size:24}),i.jsx("span",{style:{marginBottom:"4px",fontWeight:600},children:"Videoni yuklang yoki shu yerga tashlang"}),i.jsx("span",{style:{fontSize:"12px"},children:"MP4, WebM (Max: 2GB)"}),i.jsx(f4,{type:"file",accept:"video/*",onChange:b,ref:v})]})})]}):i.jsxs(Oo,{children:[i.jsx(No,{children:"YouTube Video URL *"}),i.jsx(mh,{type:"url",placeholder:"https://youtu.be/...",value:c,onChange:j=>d(j.target.value)})]}),i.jsxs(Oo,{children:[i.jsx(No,{children:"Tavsif (ixtiyoriy)"}),i.jsx(a4,{placeholder:"Dars haqida qisqacha...",value:g,onChange:j=>w(j.target.value)})]})]}),i.jsxs(m4,{children:[i.jsx(vh,{onClick:t,children:"Bekor qilish"}),i.jsx(vh,{primary:!0,disabled:!h(),onClick:y,children:"Qo'shish"})]})]})})},v4=u.div`
  flex: 1;
  display: flex;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 1300px) {
    flex-direction: column;
    overflow-y: auto;
  }
`,k4=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
  }
`,kh=u.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;

  &:fullscreen {
    aspect-ratio: auto;
  }
`,w4=u.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;u.div`
  width: 100%;
  height: 100%;
  position: relative;

  /* Transparent overlay to block right-click on iframe */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px; /* Leave bottom area for YouTube controls */
    z-index: 1;
    pointer-events: none;
  }

  /* Prevent text/element selection */
  user-select: none;
  -webkit-user-select: none;
`;const b4=u.iframe`
  width: 100%;
  height: 100%;
  border: none;
`,j4=u.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.4) 100%
  );
  opacity: ${e=>e.visible?1:0};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: ${e=>e.isYoutube?"none":"auto"};
`,S4=u.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,C4=u.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  pointer-events: ${e=>e.isYoutube?"none":"auto"};
`,z4=u.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(88, 101, 242, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${e=>e.visible&&!e.isYoutube?1:0};
  pointer-events: ${e=>e.visible&&!e.isYoutube?"auto":"none"};
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(88, 101, 242, 0.5);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: rgba(88, 101, 242, 1);
  }
`,E4=u.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,A0=u.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: height 0.15s ease;

  &:hover {
    height: 6px;
  }
`,_4=u.div`
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  position: relative;
  transition: width 0.1s linear;

  &::after {
    content: "";
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 4px rgba(88, 101, 242, 0.5);
    opacity: 0;
    transition: opacity 0.15s;
  }

  ${A0}:hover &::after {
    opacity: 1;
  }
`,T4=u.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
`,R4=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,I4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,P4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Lo=u.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }
`,M4=u.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;
`,O0=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,$4=u.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${O0}:hover & {
    width: 70px;
    opacity: 1;
  }
`,A4=u.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,O4=u.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,N4=u.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`,L4=u.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`,D4=u.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`,wh=u.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`,bh=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,B4=u.div`
  display: flex;
  align-items: center;
`,jh=u.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${e=>e.bg||"var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid var(--background-color);
  margin-left: ${e=>e.index>0?"-8px":"0"};
  position: relative;
  z-index: ${e=>10-(e.index||0)};
`,F4=u.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`,nr=u.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;

  ${e=>{switch(e.variant){case"enroll":return`
          background: var(--primary-color);
          color: white;
          box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
          &:hover { box-shadow: 0 4px 14px rgba(88, 101, 242, 0.5); transform: translateY(-1px); }
        `;case"pending":return`
          background: rgba(250, 166, 26, 0.15);
          color: var(--warning-color);
          cursor: default;
        `;case"enrolled":return`
          background: rgba(67, 181, 129, 0.15);
          color: var(--success-color);
          cursor: default;
        `;case"admin":return`
          background: rgba(88, 101, 242, 0.15);
          color: var(--primary-color);
          cursor: pointer;
          &:hover { background: rgba(88, 101, 242, 0.25); }
        `;default:return"background: var(--input-color); color: var(--text-color);"}}}
`,U4=u.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${e=>e.open?"400px":"0"};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`,V4=u.div`
  padding: 16px 24px;
`,Sh=u.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-bottom: 12px;
`,Ch=u.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`,zh=u.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
`,Eh=u.div`
  flex: 1;
`,_h=u.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`,Th=u.div`
  font-size: 12px;
  color: ${e=>e.pending?"var(--warning-color)":"var(--success-color)"};
`,Rh=u.div`
  display: flex;
  gap: 6px;
`,Qa=u.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  ${e=>e.approve?`
    background: rgba(67, 181, 129, 0.15);
    color: var(--success-color);
    &:hover { background: rgba(67, 181, 129, 0.3); }
  `:`
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
    &:hover { background: rgba(240, 71, 71, 0.3); }
  `}
`,Ih=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`,Ph=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`,q4=u.div`
  width: 380px;
  height: 100vh;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 1300px) {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid var(--border-color);
    flex: none;
  }
`,H4=u.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`,W4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,Y4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,G4=u.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`,K4=u.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`,Q4=u.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;

  @media (max-width: 1300px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,J4=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${e=>e.collapsed?"0":"500px"};
    overflow: ${e=>e.collapsed?"hidden":"auto"};
    transition: max-height 0.3s ease;
  }
`,N0=u.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background-color: var(--hover-color);
  }

  ${e=>e.active&&`
    background-color: var(--active-color);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--primary-color);
      border-radius: 0 2px 2px 0;
    }
  `}
`,X4=u.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;

  ${e=>e.active?`
    background: var(--primary-color);
    color: white;
    box-shadow: 0 2px 8px rgba(88, 101, 242, 0.4);
  `:`
    background: var(--input-color);
    color: var(--text-secondary-color);
  `}
`,Z4=u.div`
  flex: 1;
  min-width: 0;
`,e5=u.div`
  font-size: 14px;
  font-weight: ${e=>e.active?"600":"500"};
  color: ${e=>e.active?"var(--text-color)":"var(--text-secondary-color)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`,t5=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`,n5=u.span`
  display: flex;
  align-items: center;
  gap: 3px;
`,r5=u.button`
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  background: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.15s;

  ${N0}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
  }
`,o5=u.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`,i5=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`,s5=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #7c8cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.3);
`,l5=u.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`,a5=u.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`,c5=u.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
`,u5=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`,d5=u.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,f5=u.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted-color);
`,p5=u.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
`,ys=u.div`
  width: ${e=>e.small?"28px":"36px"};
  height: ${e=>e.small?"28px":"36px"};
  border-radius: 50%;
  background: ${e=>e.isAdmin?"var(--primary-color)":"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${e=>e.small?"10px":"13px"};
  font-weight: 700;
  flex-shrink: 0;
`,h5=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g5=u.input`
  width: 100%;
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 20px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
    background-color: var(--secondary-color);
  }
`,x5=u.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`,Mh=u.button`
  padding: 6px 16px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${e=>e.primary?`
    background: var(--primary-color);
    color: white;
    &:hover { opacity: 0.9; }
    &:disabled { opacity: 0.4; cursor: not-allowed; }
  `:`
    background: transparent;
    color: var(--text-secondary-color);
    &:hover { color: var(--text-color); }
  `}
`,m5=u.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,$h=u.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,Ah=u.div`
  flex: 1;
  min-width: 0;
`,Oh=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Nh=u.span`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.isAdmin?"var(--primary-color)":"var(--text-color)"};
`,Lh=u.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(88, 101, 242, 0.15);
  color: var(--primary-color);
`,Dh=u.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Bh=u.p`
  font-size: 14px;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
`,y5=u.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 12px;
  transition: all 0.15s;

  &:hover {
    color: var(--primary-color);
    background: rgba(88, 101, 242, 0.08);
  }
`,v5=u.div`
  margin-left: 48px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,k5=u.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
`,w5=u.input`
  flex: 1;
  padding: 8px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 18px;
  color: var(--text-color);
  font-size: 13px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,b5=u.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`,j5=u.div`
  text-align: center;
  padding: 20px;
  color: var(--text-muted-color);
  font-size: 14px;
`,S5=u.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  margin-top: 4px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }
`,C5=u.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`;function Fh(e){if(isNaN(e))return"0:00";const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}:${n.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`:`${n}:${r.toString().padStart(2,"0")}`}function Uh(e){return e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"K":e.toString()}function Vh(e){const t=new Date(e),r=new Date-t;if(isNaN(r))return"Noma'lum vaqt";const o=Math.floor(r/6e4),s=Math.floor(r/36e5),l=Math.floor(r/864e5);return o<1?"Hozirgina":o<60?`${o} daqiqa oldin`:s<24?`${s} soat oldin`:l<30?`${l} kun oldin`:t.toLocaleDateString("uz-UZ")}const z5=({selectedCourseId:e})=>{var dn,Er,Zn;const{courses:t,currentUser:n,isAdmin:r,isEnrolled:o,enrollInCourse:s,approveUser:l,removeUser:a,incrementViews:c,removeLesson:d,addComment:x,addReply:p}=Ui(),[g,w]=f.useState(0),[v,b]=f.useState(!1),[C,m]=f.useState(!1),[h,y]=f.useState(!1),[j,E]=f.useState(""),[k,_]=f.useState(!1),[R,D]=f.useState(null),[O,S]=f.useState(""),[A,ne]=f.useState(!1),N=f.useRef(null),X=f.useRef(null),[Z,H]=f.useState(!1),[P,Y]=f.useState(0),[I,W]=f.useState(0),[ie,T]=f.useState(1),[Q,ue]=f.useState(!1),[ge,ae]=f.useState(!1),[re,J]=f.useState(!0),[je,Ne]=f.useState(0),[_e,en]=f.useState(!1),Rt=f.useRef(null),ke=t.find(U=>U.id===e),Je=ke?o(e):"none",Ye=ke?r(e):!1;f.useEffect(()=>{w(0),b(!1),y(!1),H(!1),Y(0),W(0),en(!1)},[e]);const Xe=Ye||Je==="approved",qe=f.useCallback(U=>Xe||U===0,[Xe]),un=!Xe&&g===0;f.useEffect(()=>{en(!1),H(!1),Y(0);const U=setTimeout(()=>{if(ke&&!_e){const fe=ke.lessons[g];fe&&qe(g)&&(c(e,fe.id),en(!0))}},3e3);return()=>clearTimeout(U)},[g,ke,e,qe,_e,c]);const Bt=f.useCallback(()=>{N.current&&(Z?N.current.pause():N.current.play())},[Z]),It=f.useCallback(()=>{if(!N.current)return;Y(N.current.currentTime);const U=N.current;U.buffered.length>0&&Ne(U.buffered.end(U.buffered.length-1)/U.duration*100)},[]);f.useCallback(U=>{W(U)},[]);const ye=f.useCallback(U=>{if(!N.current)return;const fe=U.currentTarget.getBoundingClientRect(),dt=(U.clientX-fe.left)/fe.width;N.current.currentTime=dt*I},[I]),ze=f.useCallback(U=>{const fe=parseFloat(U.target.value);T(fe),N.current&&(N.current.volume=fe),ue(fe===0)},[]),Le=f.useCallback(()=>{N.current&&(Q?(N.current.volume=ie||1,ue(!1)):(N.current.volume=0,ue(!0)))},[Q,ie]),Ft=f.useCallback(()=>{X.current&&(document.fullscreenElement?(document.exitFullscreen(),ae(!1)):(X.current.requestFullscreen(),ae(!0)))},[]),F=f.useCallback(()=>{N.current&&(N.current.currentTime+=10)},[]),V=f.useCallback(()=>{N.current&&(N.current.currentTime-=10)},[]),oe=f.useCallback(()=>{J(!0),Rt.current&&clearTimeout(Rt.current),Rt.current=setTimeout(()=>{Z&&J(!1)},3e3)},[Z]),se=U=>{w(U)},de=f.useCallback(()=>{ke&&g<ke.lessons.length-1&&w(U=>U+1)},[ke,g]);if(!ke)return i.jsxs(i5,{children:[i.jsx(s5,{children:i.jsx(wp,{size:36,color:"white"})}),i.jsx(l5,{children:"Kursni tanlang"}),i.jsx(a5,{children:"Chap tarafdagi ro'yxatdan kursni tanlang yoki yangi kurs yarating."})]});const te=ke.lessons[g],ce=ke.members.filter(U=>U.status==="approved"),we=ke.members.filter(U=>U.status==="pending"),Ze=(dn=te==null?void 0:te.videoUrl)==null?void 0:dn.includes("youtu"),Vt=Ze?(U=>{if(!U)return null;const fe=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,dt=U.match(fe);return dt&&dt[2].length===11?dt[2]:null})(te.videoUrl):null;return i.jsxs(i.Fragment,{children:[i.jsxs(v4,{children:[i.jsxs(k4,{children:[qe(g)&&te?i.jsxs(i.Fragment,{children:[Ze&&Vt?i.jsx(kh,{ref:X,children:i.jsx(b4,{src:`https://www.youtube.com/embed/${Vt}?rel=0&modestbranding=1`,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:te.title})}):i.jsxs(kh,{ref:X,onMouseMove:oe,onMouseLeave:()=>{Z&&J(!1)},onClick:Bt,children:[i.jsx(w4,{ref:N,src:te.videoUrl,onPlay:()=>H(!0),onPause:()=>H(!1),onTimeUpdate:It,onLoadedMetadata:()=>{N.current&&W(N.current.duration)},onEnded:de}),i.jsx(z4,{visible:!Z,onClick:U=>{U.stopPropagation(),Bt()},children:i.jsx(_a,{size:32,fill:"white",color:"white"})}),i.jsxs(j4,{visible:re||!Z,onClick:U=>U.stopPropagation(),children:[i.jsx(S4,{children:i.jsx(C4,{children:te.title})}),i.jsxs(E4,{children:[i.jsxs(A0,{onClick:ye,children:[i.jsx(T4,{style:{width:`${je}%`}}),i.jsx(_4,{style:{width:`${I?P/I*100:0}%`}})]}),i.jsxs(R4,{children:[i.jsxs(I4,{children:[i.jsx(Lo,{onClick:Bt,children:Z?i.jsx(nw,{size:20}):i.jsx(_a,{size:20,fill:"white"})}),i.jsx(Lo,{onClick:V,title:"-10s",children:i.jsx(sw,{size:18})}),i.jsx(Lo,{onClick:F,title:"+10s",children:i.jsx(lw,{size:18})}),i.jsxs(O0,{children:[i.jsx(Lo,{onClick:Le,children:Q?i.jsx(uw,{size:18}):i.jsx(g0,{size:18})}),i.jsx($4,{type:"range",min:"0",max:"1",step:"0.05",value:Q?0:ie,onChange:ze})]}),i.jsxs(M4,{children:[Fh(P)," / ",Fh(I)]})]}),i.jsx(P4,{children:i.jsx(Lo,{onClick:Ft,children:ge?i.jsx(Zk,{size:18}):i.jsx(u0,{size:18})})})]})]})]})]}),i.jsxs(A4,{children:[i.jsxs(O4,{children:[g+1,"-dars: ",te.title]}),i.jsxs(N4,{children:[i.jsxs(D4,{children:[i.jsx(ou,{size:14}),Uh(te.views)," ko'rish"]}),i.jsxs(L4,{children:[i.jsx(wp,{size:14}),ke.name]})]})]}),un&&i.jsxs(wh,{style:{background:"var(--secondary-color)"},children:[i.jsxs(bh,{style:{flex:1},children:[i.jsx("div",{style:{fontSize:14,color:"var(--text-color)",fontWeight:600},children:"Bu bepul tanishuv darsi ✨"}),i.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)",marginTop:2},children:"Qolgan darslarni ko'rish uchun kursga yoziling"})]}),Je==="none"?i.jsxs(nr,{variant:"enroll",onClick:()=>s(e),children:[i.jsx(Ta,{size:16}),"Kursga yozilish"]}):Je==="pending"?i.jsxs(nr,{variant:"pending",children:[i.jsx(gr,{size:16}),"Kutilmoqda"]}):null]}),i.jsxs(c5,{children:[i.jsxs(u5,{children:[i.jsxs(d5,{children:[i.jsx(Xk,{size:18}),"Izohlar"]}),i.jsxs(f5,{children:[((Er=te.comments)==null?void 0:Er.length)||0," ta izoh"]})]}),i.jsxs(p5,{children:[i.jsx(ys,{isAdmin:Ye,children:((Zn=n.avatar)==null?void 0:Zn.length)>1?i.jsx("img",{src:n.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(n.name||"?").charAt(0)}),i.jsxs(h5,{children:[i.jsx(g5,{placeholder:"Izoh qoldiring...",value:j,onChange:U=>{E(U.target.value),!k&&U.target.value&&_(!0)},onFocus:()=>_(!0),onKeyDown:U=>{U.key==="Enter"&&j.trim()&&(x(e,te.id,j.trim()),E(""),_(!1))}}),k&&i.jsxs(x5,{children:[i.jsx(Mh,{onClick:()=>{_(!1),E("")},children:"Bekor qilish"}),i.jsx(Mh,{primary:!0,disabled:!j.trim(),onClick:()=>{j.trim()&&(x(e,te.id,j.trim()),E(""),_(!1))},children:"Izoh qoldirish"})]})]})]}),!te.comments||te.comments.length===0?i.jsx(j5,{children:"Hali izohlar yo'q. Birinchi bo'lib izoh qoldiring!"}):i.jsxs(i.Fragment,{children:[(A?te.comments:te.comments.slice(0,1)).map(U=>{var fe,dt;return i.jsxs(m5,{children:[i.jsxs($h,{children:[i.jsx(ys,{isAdmin:U.userId===ke.createdBy,children:((fe=U.userAvatar)==null?void 0:fe.length)>1?i.jsx("img",{src:U.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.userName.charAt(0)}),i.jsxs(Ah,{children:[i.jsxs(Oh,{children:[i.jsx(Nh,{isAdmin:U.userId===ke.createdBy,children:U.userName}),U.userId===ke.createdBy&&i.jsx(Lh,{children:"Admin"}),i.jsx(Dh,{children:Vh(U.createdAt)})]}),i.jsx(Bh,{children:U.text}),i.jsxs(y5,{onClick:()=>{D(R===U.id?null:U.id),S("")},children:[i.jsx(Fk,{size:12}),"Javob berish"]})]})]}),U.replies&&U.replies.length>0&&i.jsx(v5,{children:U.replies.map(et=>{var Vi;return i.jsxs($h,{children:[i.jsx(ys,{small:!0,isAdmin:et.userId===ke.createdBy,children:((Vi=et.userAvatar)==null?void 0:Vi.length)>1?i.jsx("img",{src:et.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):et.userName.charAt(0)}),i.jsxs(Ah,{children:[i.jsxs(Oh,{children:[i.jsx(Nh,{isAdmin:et.userId===ke.createdBy,children:et.userName}),et.userId===ke.createdBy&&i.jsx(Lh,{children:"Admin"}),i.jsx(Dh,{children:Vh(et.createdAt)})]}),i.jsx(Bh,{children:et.text})]})]},et.id)})}),R===U.id&&i.jsxs(k5,{children:[i.jsx(ys,{small:!0,isAdmin:Ye,children:((dt=n.avatar)==null?void 0:dt.length)>1?i.jsx("img",{src:n.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(n.name||"?").charAt(0)}),i.jsx(w5,{placeholder:"Javob yozing...",value:O,onChange:et=>S(et.target.value),onKeyDown:et=>{et.key==="Enter"&&O.trim()&&(p(e,te.id,U.id,O.trim()),S(""),D(null))},autoFocus:!0}),i.jsx(b5,{disabled:!O.trim(),onClick:()=>{O.trim()&&(p(e,te.id,U.id,O.trim()),S(""),D(null))},children:i.jsx(ow,{size:14})})]})]},U.id)}),te.comments.length>1&&i.jsx(S5,{onClick:()=>ne(!A),children:A?i.jsxs(i.Fragment,{children:[i.jsx(za,{size:14}),"Izohlarni yashirish"]}):i.jsxs(i.Fragment,{children:[i.jsx(Ca,{size:14}),"Barcha izohlarni ko'rish (",te.comments.length,")"]})})]})]})]}):qe(g)&&ke.lessons.length===0?i.jsxs(Ih,{children:[i.jsx(Ph,{children:i.jsx(bp,{size:32,color:"var(--text-muted-color)"})}),i.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:"Hali darslar qo'shilmagan"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14},children:Ye?"O'ng tarafdagi + tugmasini bosib dars qo'shing.":"Tez orada darslar qo'shiladi."})]}):i.jsxs(Ih,{children:[i.jsx(Ph,{children:Je==="pending"?i.jsx(gr,{size:32,color:"var(--warning-color)"}):i.jsx(Kk,{size:32,color:"var(--text-muted-color)"})}),i.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:Je==="pending"?"So'rov yuborildi":"Kursga yoziling"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14,maxWidth:350},children:Je==="pending"?"Sizning so'rovingiz admin tomonidan ko'rib chiqilmoqda. Iltimos kuting.":"Darslarni ko'rish uchun avval kursga yozilish kerak. Admin tasdiqlangandan keyin darslarni ko'rishingiz mumkin."}),Je==="none"&&i.jsxs(nr,{variant:"enroll",onClick:()=>s(e),children:[i.jsx(Ta,{size:16}),"Kursga yozilish"]})]}),i.jsxs(wh,{children:[i.jsxs(bh,{children:[ce.length>0&&i.jsxs(B4,{children:[ce.slice(0,4).map((U,fe)=>{var dt;return i.jsx(jh,{index:fe,children:((dt=U.avatar)==null?void 0:dt.length)>1?i.jsx("img",{src:U.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.name.charAt(0)},U.id)}),ce.length>4&&i.jsxs(jh,{index:4,bg:"var(--input-color)",children:["+",ce.length-4]})]}),i.jsxs(F4,{children:[i.jsx(xo,{size:14}),ce.length," ta a'zo",we.length>0&&Ye&&i.jsxs("span",{style:{color:"var(--warning-color)"},children:["· ",we.length," kutmoqda"]})]})]}),Ye?i.jsxs(nr,{variant:"admin",onClick:()=>y(!h),children:[i.jsx(Ii,{size:16}),"A'zolarni boshqarish",h?i.jsx(za,{size:14}):i.jsx(Ca,{size:14})]}):Je==="none"?i.jsxs(nr,{variant:"enroll",onClick:()=>s(e),children:[i.jsx(Ta,{size:16}),"Yozilish"]}):Je==="pending"?i.jsxs(nr,{variant:"pending",children:[i.jsx(gr,{size:16}),"Kutilmoqda"]}):i.jsxs(nr,{variant:"enrolled",children:[i.jsx(yd,{size:16}),"A'zo"]})]}),Ye&&i.jsx(U4,{open:h,children:i.jsxs(V4,{children:[we.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(Sh,{children:["Kutayotganlar (",we.length,")"]}),we.map(U=>{var fe;return i.jsxs(Ch,{children:[i.jsx(zh,{children:((fe=U.avatar)==null?void 0:fe.length)>1?i.jsx("img",{src:U.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.name.charAt(0)}),i.jsxs(Eh,{children:[i.jsx(_h,{children:U.name}),i.jsx(Th,{pending:!0,children:"Kutmoqda"})]}),i.jsxs(Rh,{children:[i.jsx(Qa,{approve:!0,onClick:()=>l(e,U.id),title:"Tasdiqlash",children:i.jsx(cw,{size:16})}),i.jsx(Qa,{onClick:()=>a(e,U.id),title:"Rad etish",children:i.jsx(Cp,{size:16})})]})]},U.id)})]}),i.jsxs(Sh,{style:{marginTop:we.length>0?16:0},children:["A'zolar (",ce.length,")"]}),ce.length===0?i.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:13,padding:"8px 0"},children:"Hali a'zolar yo'q"}):ce.map(U=>{var fe;return i.jsxs(Ch,{children:[i.jsx(zh,{children:((fe=U.avatar)==null?void 0:fe.length)>1?i.jsx("img",{src:U.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.name.charAt(0)}),i.jsxs(Eh,{children:[i.jsx(_h,{children:U.name}),i.jsx(Th,{children:"Tasdiqlangan"})]}),i.jsx(Rh,{children:i.jsx(Qa,{onClick:()=>a(e,U.id),title:"Chiqarish",children:i.jsx(Cp,{size:16})})})]},U.id)})]})})]}),i.jsxs(q4,{children:[i.jsxs(H4,{children:[i.jsxs(W4,{children:[i.jsx(bp,{size:18}),"Darslar"]}),i.jsxs(Y4,{children:[i.jsxs(G4,{children:[ke.lessons.length," ta dars"]}),Ye&&i.jsx(K4,{onClick:()=>m(!0),title:"Dars qo'shish",children:i.jsx(Ri,{size:16})}),i.jsx(Q4,{onClick:()=>b(!v),children:v?i.jsx(Ca,{size:20}):i.jsx(za,{size:20})})]})]}),i.jsx(J4,{collapsed:v,children:ke.lessons.length===0?i.jsx(o5,{children:Ye?i.jsxs(i.Fragment,{children:["Hali darslar yo'q.",i.jsx("br",{}),i.jsx("span",{style:{fontSize:12},children:"+ tugmasini bosib dars qo'shing"})]}):"Hali darslar qo'shilmagan"}):ke.lessons.map((U,fe)=>i.jsxs(N0,{active:qe(fe)&&g===fe,onClick:()=>qe(fe)&&se(fe),style:{cursor:qe(fe)?"pointer":"default"},children:[i.jsx(X4,{active:qe(fe)&&g===fe,children:qe(fe)&&g===fe?i.jsx(_a,{size:12,fill:"white"}):qe(fe)?fe+1:i.jsx(go,{size:12})}),i.jsx(Z4,{children:qe(fe)?i.jsxs(i.Fragment,{children:[i.jsxs(e5,{active:g===fe,children:[U.title,fe===0&&!Xe&&i.jsx("span",{style:{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:4,background:"rgba(67, 181, 129, 0.15)",color:"var(--success-color)",marginLeft:6,verticalAlign:"middle"},children:"Bepul"})]}),i.jsx(t5,{children:i.jsxs(n5,{children:[i.jsx(ou,{size:11}),Uh(U.views)]})})]}):i.jsxs(C5,{children:[i.jsx(go,{size:12}),fe+1,"-dars"]})}),Ye&&i.jsx(r5,{onClick:dt=>{dt.stopPropagation(),d(e,U.id),g>=ke.lessons.length-1&&g>0&&w(g-1)},title:"O'chirish",children:i.jsx(bd,{size:14})})]},U.id))})]})]}),i.jsx(y4,{isOpen:C,onClose:()=>m(!1),courseId:e})]})},E5=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  height: 100vh;
  overflow-y: auto;
`,_5=u.div`
  padding: 32px;
  background-color: var(--tertiary-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,T5=u.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
`,R5=u.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`,I5=u.input`
  width: 100%;
  padding: 14px 20px 14px 48px;
  border-radius: 8px;
  border: none;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
  transition: box-shadow 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }

  &::placeholder {
    color: var(--text-muted-color);
  }
`,P5=u(wd)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
`,M5=u.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
`,$5=u.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid
    ${e=>e.active?"var(--primary-color)":"var(--border-color)"};
  background-color: ${e=>e.active?"var(--primary-color)":"transparent"};
  color: ${e=>e.active?"white":"var(--text-color)"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.active?"var(--primary-color)":"var(--hover-color)"};
  }
`;u.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  cursor: pointer;
`;const A5=u.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`,qh=u.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`,Hh=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,Wh=u.div`
  background-color: var(--tertiary-color);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-color: var(--primary-color);
  }
`,Yh=u.div`
  height: 160px;
  background: ${e=>e.gradient||"var(--primary-color)"};
  position: relative;
`,Gh=u.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
`,Kh=u.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`,Qh=u.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 8px 0;
  line-height: 1.4;
`,Jh=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
`,Xh=u.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
`,Zh=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fbbf24;
  font-weight: 600;
  font-size: 13px;
`,eg=u.div`
  font-weight: 700;
  color: ${e=>e.free?"var(--success-color)":"var(--text-color)"};
  font-size: 14px;
`,O5=({onNavigateToCourse:e})=>{var w;const{courses:t}=Ui(),[n,r]=f.useState(""),[o,s]=f.useState("all"),[l,a]=f.useState("popular"),c=[{id:"all",label:"Barchasi"},{id:"IT",label:"IT & Dasturlash"},{id:"SMM",label:"SMM & Marketing"},{id:"Til o'rganish",label:"Til o'rganish"},{id:"Mobile",label:"Mobil dasturlash"},{id:"Dizayn",label:"Dizayn"}],d=f.useMemo(()=>{let v=[...t];if(o!=="all"&&(v=v.filter(b=>b.category===o)),n){const b=n.toLowerCase();v=v.filter(C=>C.name.toLowerCase().includes(b)||C.description.toLowerCase().includes(b))}return l==="popular"?v.sort((b,C)=>C.rating-b.rating):l==="newest"?v.sort((b,C)=>new Date(C.createdAt)-new Date(b.createdAt)):l==="price_asc"?v.sort((b,C)=>b.price-C.price):l==="price_desc"&&v.sort((b,C)=>C.price-b.price),v},[t,n,o,l]),x=v=>v===0?"Bepul":new Intl.NumberFormat("uz-UZ").format(v)+" UZS",p=!n&&o==="all"&&l==="popular",g=({title:v,courses:b})=>!b||b.length===0?null:i.jsxs("div",{style:{marginBottom:40},children:[i.jsx(qh,{children:v}),i.jsx(Hh,{children:b.map(C=>i.jsxs(Wh,{onClick:()=>e(C.id),children:[i.jsx(Yh,{gradient:C.gradient,children:i.jsx(Gh,{children:C.category||"General"})}),i.jsxs(Kh,{children:[i.jsx(Qh,{children:C.name}),i.jsxs(Jh,{children:[i.jsx(Pi,{size:14}),C.createdBy==="user-1"?"Sardor Alimov":C.createdBy==="user-2"?"Jasur Karimov":"Malika Rahimova"]}),i.jsx("p",{style:{fontSize:13,color:"var(--text-muted-color)",margin:0,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:C.description}),i.jsxs(Xh,{children:[i.jsxs(Zh,{children:[i.jsx(Sp,{size:14,fill:"#fbbf24",stroke:"#fbbf24"}),C.rating||4.5]}),i.jsx(eg,{free:C.price===0,children:x(C.price||0)})]})]})]},C.id))})]});return i.jsxs(E5,{children:[i.jsxs(_5,{children:[i.jsx(T5,{children:"Kurslar Dashboardi"}),i.jsxs(R5,{children:[i.jsx(P5,{size:20}),i.jsx(I5,{placeholder:"Kurslarni qidiring...",value:n,onChange:v=>r(v.target.value)})]}),i.jsx(M5,{children:c.map(v=>i.jsx($5,{active:o===v.id,onClick:()=>s(v.id),children:v.label},v.id))})]}),i.jsx(A5,{children:p?i.jsxs(i.Fragment,{children:[i.jsx(g,{title:"Top Kurslar 🔥",courses:[...t].sort((v,b)=>b.rating-v.rating).slice(0,3)}),i.jsx(g,{title:"Yangi qo'shilganlar 🆕",courses:[...t].sort((v,b)=>new Date(b.createdAt)-new Date(v.createdAt)).slice(0,3)}),i.jsx(g,{title:"Arzon kurslar 🏷️",courses:[...t].sort((v,b)=>v.price-b.price).slice(0,3)}),i.jsx(g,{title:"IT & Dasturlash 💻",courses:t.filter(v=>v.category==="IT")}),i.jsx(g,{title:"SMM & Marketing 📱",courses:t.filter(v=>v.category==="SMM")}),i.jsx(g,{title:"Til o'rganish 🌍",courses:t.filter(v=>v.category==="Til o'rganish")}),i.jsx(g,{title:"Mobil Dasturlash 📱",courses:t.filter(v=>v.category==="Mobile")})]}):i.jsxs(i.Fragment,{children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[i.jsx(qh,{children:o==="all"?"Qidiruv natijalari":(w=c.find(v=>v.id===o))==null?void 0:w.label}),i.jsxs("select",{style:{background:"var(--tertiary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)",padding:"6px 12px",borderRadius:"6px",outline:"none"},value:l,onChange:v=>a(v.target.value),children:[i.jsx("option",{value:"popular",children:"Ommabop"}),i.jsx("option",{value:"newest",children:"Yangi qo'shilgan"}),i.jsx("option",{value:"price_asc",children:"Arzonroq"}),i.jsx("option",{value:"price_desc",children:"Qimmatroq"})]})]}),d.length>0?i.jsx(Hh,{children:d.map(v=>i.jsxs(Wh,{onClick:()=>e(v.id),children:[i.jsx(Yh,{gradient:v.gradient,children:i.jsx(Gh,{children:v.category||"General"})}),i.jsxs(Kh,{children:[i.jsx(Qh,{children:v.name}),i.jsxs(Jh,{children:[i.jsx(Pi,{size:14}),v.createdBy==="user-1"?"Sardor Alimov":v.createdBy==="user-2"?"Jasur Karimov":"Malika Rahimova"]}),i.jsx("p",{style:{fontSize:13,color:"var(--text-muted-color)",margin:0,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:v.description}),i.jsxs(Xh,{children:[i.jsxs(Zh,{children:[i.jsx(Sp,{size:14,fill:"#fbbf24",stroke:"#fbbf24"}),v.rating||4.5]}),i.jsx(eg,{free:v.price===0,children:x(v.price||0)})]})]})]},v.id))}):i.jsx("div",{style:{textAlign:"center",padding:"40px",color:"var(--text-muted-color)"},children:"Hech qanday kurs topilmadi"})]})})]})},N5=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`,L5=u.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: relative;
  }
`,D5=u.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,B5=({initialNav:e="home",initialChannel:t=0})=>{const{chats:n,createChat:r,selectedNav:o,setSelectedNav:s,selectedChannel:l,setSelectedChannel:a}=Fi(),c=zr(),[d,x]=f.useState(window.innerWidth<=768),[p,g]=f.useState(!1),[w,v]=f.useState(null);f.useEffect(()=>{const m=()=>x(window.innerWidth<=768);return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]),f.useEffect(()=>{e&&e!==o&&s(e),t!==void 0&&t!==l&&a(t)},[e,t]);const b=m=>{s(m),a(0),c(`/${m}`)},C=async m=>{try{const h=await r({isGroup:!0,name:m.name,description:m.description,avatar:m.image,memberIds:m.members});g(!1),h&&c(`/a/${h}`)}catch(h){console.error("Failed to create group",h)}};return i.jsxs(N5,{children:[i.jsx(Ib,{selectedNav:o,onSelectNav:b}),i.jsx(L5,{children:o==="courses"?i.jsxs(i.Fragment,{children:[i.jsx(t4,{onSelectCourse:v}),i.jsx(z5,{courseId:w})]}):o==="home"?i.jsx(O5,{onNavigateToCourse:m=>{v(m),b("courses")}}):i.jsxs(i.Fragment,{children:[!d||!l||l==="0"?i.jsx(Hb,{selectedChannel:l,selectedNav:o,chats:n,onOpenCreateGroup:()=>g(!0)}):null,i.jsx(D5,{children:l&&l!=="0"?i.jsx(lS,{selectedChannel:l,selectedNav:o,chats:n,onBack:()=>{a(0),c(`/${o}`)}}):i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#8e9297"},children:"Suhbatni tanlang"})})]})}),i.jsx(zS,{isOpen:p,onClose:()=>g(!1),onCreate:C,users:n.filter(m=>m.type==="user"&&!m.isSavedMessages).map(m=>{var j;const h=JSON.parse(localStorage.getItem("user")||"{}"),y=(j=m.members)==null?void 0:j.find(E=>(E._id||E.id)!==((h==null?void 0:h._id)||(h==null?void 0:h.id)));return{...y,id:(y==null?void 0:y._id)||(y==null?void 0:y.id),name:(y==null?void 0:y.nickname)||(y==null?void 0:y.username)||"Noma'lum"}}).filter(m=>m.id)})]})},F5=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dcddde;
  text-align: center;
  padding: 40px;
`,U5=u.div`
  width: 120px;
  height: 120px;
  background-color: #7289da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`,V5=u.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
`,q5=u.p`
  font-size: 16px;
  color: #b9bbbe;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`,H5=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 800px;
  width: 100%;
  margin-top: 40px;
`,Do=u.div`
  background-color: #2f3136;
  padding: 24px;
  border-radius: 8px;
  text-align: left;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #36393f;
    transform: translateY(-2px);
  }
`,vs=u(Om)`
  text-decoration: none;
  color: inherit;
`,Bo=u.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Fo=u.p`
  color: #b9bbbe;
  line-height: 1.5;
`,W5=()=>i.jsxs(F5,{children:[i.jsx(U5,{children:i.jsx(iu,{size:60,color:"white"})}),i.jsx(V5,{children:"Welcome to Jamm"}),i.jsx(q5,{children:"This is a modern communication platform built with React, Vite, and styled-components. Experience real-time chat, voice channels, and a beautiful interface."}),i.jsxs(H5,{children:[i.jsx(vs,{to:"/home",children:i.jsxs(Do,{children:[i.jsxs(Bo,{children:[i.jsx(d0,{size:20}),"All Chats"]}),i.jsx(Fo,{children:"View and manage all your conversations in one place. Switch between different chats and stay connected."})]})}),i.jsx(vs,{to:"/users",children:i.jsxs(Do,{children:[i.jsxs(Bo,{children:[i.jsx(xo,{size:20}),"Direct Messages"]}),i.jsx(Fo,{children:"Start one-on-one conversations with friends and colleagues. Private and secure messaging."})]})}),i.jsx(vs,{to:"/groups",children:i.jsxs(Do,{children:[i.jsxs(Bo,{children:[i.jsx(h0,{size:20}),"Group Chats"]}),i.jsx(Fo,{children:"Create and join group conversations with multiple participants. Perfect for teams and communities."})]})}),i.jsxs(Do,{children:[i.jsxs(Bo,{children:[i.jsx(iu,{size:20}),"Modern UI"]}),i.jsx(Fo,{children:"Beautiful, responsive interface that works on all devices. Smooth animations and intuitive user experience."})]}),i.jsx(vs,{to:"/courses",children:i.jsxs(Do,{children:[i.jsxs(Bo,{children:[i.jsx(vd,{size:20}),"Courses"]}),i.jsx(Fo,{children:"Watch video lessons, track your progress, and learn new skills. YouTube-like player with organized playlists."})]})})]})]}),Y5=Xn`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,Ja=Xn`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;Xn`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;const G5=u.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1b2e 0%, #16171d 50%, #0d0e14 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`,Xa=u.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;

  &:nth-child(1) {
    width: 400px;
    height: 400px;
    background: #5865f2;
    top: -100px;
    right: -100px;
    animation: ${Ja} 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: #eb459e;
    bottom: -50px;
    left: -50px;
    animation: ${Ja} 10s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: #57f287;
    top: 50%;
    left: 50%;
    animation: ${Ja} 12s ease-in-out infinite;
  }
`,K5=u.div`
  width: 900px;
  max-width: 100%;
  display: flex;
  background: rgba(47, 49, 54, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(88, 101, 242, 0.15);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(88, 101, 242, 0.08);
  animation: ${Y5} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 420px;
    flex-direction: column;
  }
`,Q5=u.div`
  width: 340px;
  background: linear-gradient(160deg, #5865f2 0%, #4752c4 60%, #3c45a5 100%);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -40px;
    left: -40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`,J5=u.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
`,X5=u.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`,Z5=u.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`,ks=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`,ws=u.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,bs=u.span`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`,eC=u.div`
  flex: 1;
  padding: 40px;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`,tC=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`,nC=u.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5865f2, #7b6cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.35);
`,rC=u.h1`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #b9bbbe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`,oC=u.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
`,iC=u.p`
  font-size: 14px;
  color: #b9bbbe;
  text-align: center;
  margin-bottom: 24px;
`,sC=u.div`
  display: flex;
  background: rgba(32, 34, 37, 0.7);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
`,tg=u.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${e=>e.$active?"linear-gradient(135deg, #5865f2, #4752c4)":"transparent"};
  color: ${e=>e.$active?"#fff":"#b9bbbe"};
  box-shadow: ${e=>e.$active?"0 2px 10px rgba(88, 101, 242, 0.3)":"none"};

  &:hover {
    color: #fff;
    background: ${e=>e.$active?"linear-gradient(135deg, #5865f2, #4752c4)":"rgba(255,255,255,0.05)"};
  }
`,lC=u.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Uo=u.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Vo=u.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b9bbbe;
`,qo=u.div`
  position: relative;
  display: flex;
  align-items: center;
`,ir=u.div`
  position: absolute;
  left: 14px;
  color: #72767d;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
`,Ho=u.input`
  width: 100%;
  padding: 12px 14px 12px 42px;
  background: rgba(32, 34, 37, 0.8);
  border: 1.5px solid rgba(64, 68, 75, 0.6);
  border-radius: 10px;
  color: #dcddde;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #4f545c;
  }

  &:focus {
    border-color: #5865f2;
    box-shadow: 0 0 0 3px rgba(88, 101, 242, 0.15);
  }

  &:focus ~ ${ir}, &:focus + ${ir} {
    color: #5865f2;
  }
`,aC=u.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;

  &:hover {
    color: #dcddde;
  }
`,cC=u.button`
  width: 100%;
  padding: 13px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #5865f2, #4752c4);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(88, 101, 242, 0.45);
    background: linear-gradient(135deg, #6974f7, #5865f2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,uC=u.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 4px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(64, 68, 75, 0.6);
  }

  span {
    font-size: 12px;
    color: #72767d;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`,dC=u.button`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #dcddde;
  background: rgba(32, 34, 37, 0.8);
  border: 1.5px solid rgba(64, 68, 75, 0.6);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(64, 68, 75, 0.5);
    border-color: rgba(88, 101, 242, 0.4);
  }
`,fC=()=>i.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[i.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",fill:"#4285F4"}),i.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),i.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),i.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),pC=u.p`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #72767d;
`,ng=u.button`
  color: #5865f2;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #7b8cf9;
    text-decoration: underline;
  }
`,hC=u.div`
  background: rgba(240, 71, 71, 0.12);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #f04747;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`,gC=u.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,xC=()=>{const e=zr(),[t,n]=f.useState("login"),[r,o]=f.useState(!1),[s,l]=f.useState(""),[a,c]=f.useState(""),[d,x]=f.useState(""),[p,g]=f.useState(""),[w,v]=f.useState(""),[b,C]=f.useState(!1),[m,h]=f.useState(""),y="http://localhost:3000",j=async k=>{k.preventDefault(),h(""),C(!0);try{const _=t==="login"?"/auth/login":"/auth/signup",R=t==="login"?{email:s,password:a}:{email:s,password:a,username:d,nickname:p,phone:w},D=await fetch(`${y}${_}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)}),O=await D.json();if(!D.ok)throw new Error(O.message||"Xatolik yuz berdi");localStorage.setItem("token",O.access_token),localStorage.setItem("user",JSON.stringify(O.user)),e("/")}catch(_){h(_.message)}finally{C(!1)}},E=()=>{alert("Google Auth hali ulanmagan. Email/parol bilan kiring.")};return i.jsxs(G5,{children:[i.jsx(Xa,{}),i.jsx(Xa,{}),i.jsx(Xa,{}),i.jsxs(K5,{children:[i.jsxs(Q5,{children:[i.jsx(J5,{children:"Jamm platformasiga xush kelibsiz!"}),i.jsx(X5,{children:"Zamonaviy muloqot va ta'lim platformasi. Do'stlaringiz bilan bog'laning va yangi bilimlar oling."}),i.jsxs(Z5,{children:[i.jsxs(ks,{children:[i.jsx(ws,{children:i.jsx(d0,{size:18,color:"white"})}),i.jsx(bs,{children:"Real-time chat va guruhlar"})]}),i.jsxs(ks,{children:[i.jsx(ws,{children:i.jsx(vd,{size:18,color:"white"})}),i.jsx(bs,{children:"Video kurslar va darsliklar"})]}),i.jsxs(ks,{children:[i.jsx(ws,{children:i.jsx(dw,{size:18,color:"white"})}),i.jsx(bs,{children:"Tez va qulay interfeys"})]}),i.jsxs(ks,{children:[i.jsx(ws,{children:i.jsx(Ii,{size:18,color:"white"})}),i.jsx(bs,{children:"Xavfsiz va himoyalangan"})]})]})]}),i.jsxs(eC,{children:[i.jsxs(tC,{children:[i.jsx(nC,{children:i.jsx(iu,{size:26,color:"white"})}),i.jsx(rC,{children:"Jamm"})]}),i.jsx(oC,{children:t==="login"?"Qaytib kelganingizdan xursandmiz!":"Akkaunt yarating"}),i.jsx(iC,{children:t==="login"?"Hisobingizga kirish uchun ma'lumotlaringizni kiriting":"Ro'yxatdan o'tib, platformaga qo'shiling"}),i.jsxs(sC,{children:[i.jsx(tg,{$active:t==="login",onClick:()=>n("login"),children:"Kirish"}),i.jsx(tg,{$active:t==="signup",onClick:()=>n("signup"),children:"Ro'yxatdan o'tish"})]}),i.jsxs(lC,{onSubmit:j,children:[t==="signup"&&i.jsxs(gC,{children:[i.jsxs(Uo,{children:[i.jsx(Vo,{children:"Username"}),i.jsxs(qo,{children:[i.jsx(Ho,{type:"text",placeholder:"username",value:d,onChange:k=>x(k.target.value),required:!0}),i.jsx(ir,{children:i.jsx(Ok,{size:16})})]})]}),i.jsxs(Uo,{children:[i.jsx(Vo,{children:"Nik (Laqab)"}),i.jsxs(qo,{children:[i.jsx(Ho,{type:"text",placeholder:"Nikingiz",value:p,onChange:k=>g(k.target.value),required:!0}),i.jsx(ir,{children:i.jsx(Pi,{size:16})})]})]})]}),i.jsxs(Uo,{children:[i.jsx(Vo,{children:"Email"}),i.jsxs(qo,{children:[i.jsx(Ho,{type:"email",placeholder:"email@example.com",value:s,onChange:k=>l(k.target.value),required:!0}),i.jsx(ir,{children:i.jsx(Jk,{size:16})})]})]}),t==="signup"&&i.jsxs(Uo,{children:[i.jsx(Vo,{children:"Telefon raqam"}),i.jsxs(qo,{children:[i.jsx(Ho,{type:"tel",placeholder:"+998 90 123 45 67",value:w,onChange:k=>v(k.target.value),required:!0}),i.jsx(ir,{children:i.jsx(kd,{size:16})})]})]}),i.jsxs(Uo,{children:[i.jsx(Vo,{children:"Parol"}),i.jsxs(qo,{children:[i.jsx(Ho,{type:r?"text":"password",placeholder:"••••••••",value:a,onChange:k=>c(k.target.value),required:!0}),i.jsx(ir,{children:i.jsx(go,{size:16})}),i.jsx(aC,{type:"button",onClick:()=>o(!r),children:r?i.jsx(Uk,{size:16}):i.jsx(ou,{size:16})})]})]}),m&&i.jsx(hC,{children:m}),i.jsxs(cC,{type:"submit",disabled:b,children:[b?"Yuklanmoqda...":t==="login"?"Kirish":"Ro'yxatdan o'tish",!b&&i.jsx(Ak,{size:18})]})]}),i.jsx(uC,{children:i.jsx("span",{children:"yoki"})}),i.jsxs(dC,{onClick:E,children:[i.jsx(fC,{}),"Google orqali ",t==="login"?"kirish":"ro'yxatdan o'tish"]}),i.jsx(pC,{children:t==="login"?i.jsxs(i.Fragment,{children:["Hisobingiz yo'qmi?"," ",i.jsx(ng,{type:"button",onClick:()=>n("signup"),children:"Ro'yxatdan o'ting"})]}):i.jsxs(i.Fragment,{children:["Hisobingiz bormi?"," ",i.jsx(ng,{type:"button",onClick:()=>n("login"),children:"Kirish"})]})})]})]})]})},mC="http://localhost:3000",yC={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]};function vC({roomId:e,displayName:t,enabled:n,isCreator:r=!1,isPrivate:o=!1,chatTitle:s="",initialMicOn:l=!0,initialCamOn:a=!0}){const c=f.useRef(null),d=f.useRef(null),x=f.useRef({}),[p,g]=f.useState(null),[w,v]=f.useState([]),[b,C]=f.useState(null),[m,h]=f.useState([]),[y,j]=f.useState(!1),[E,k]=f.useState([]),[_,R]=f.useState(l),[D,O]=f.useState(a),[S,A]=f.useState(!1),[ne,N]=f.useState(!1),[X,Z]=f.useState(!1),[H,P]=f.useState(new Set),[Y,I]=f.useState("idle"),[W,ie]=f.useState(null),[T,Q]=f.useState(s||""),[ue,ge]=f.useState(!1),ae=f.useRef(null),re=f.useRef({}),J=f.useRef({}),je=f.useCallback((F,V,oe)=>{v(se=>se.find(de=>de.peerId===F)?se.map(de=>de.peerId===F?{...de,stream:V}:de):[...se,{peerId:F,stream:V,displayName:oe||F}])},[]),Ne=f.useCallback(F=>{v(V=>V.filter(oe=>oe.peerId!==F)),h(V=>V.filter(oe=>oe.peerId!==F)),delete J.current[F],x.current[F]&&(x.current[F].close(),delete x.current[F])},[]),_e=f.useCallback((F,V)=>{const oe=new RTCPeerConnection(yC);return d.current&&d.current.getTracks().forEach(se=>oe.addTrack(se,d.current)),ae.current&&ae.current.getTracks().forEach(se=>oe.addTrack(se,ae.current)),oe.ontrack=se=>{const[de]=se.streams;if(!de)return;const te=J.current[F];te?te===de.id?je(F,de,V):h(ce=>ce.find(we=>we.peerId===F)?ce.map(we=>we.peerId===F?{...we,stream:de}:we):[...ce,{peerId:F,stream:de,displayName:V}]):(J.current[F]=de.id,je(F,de,V))},oe.onicecandidate=se=>{se.candidate&&c.current&&c.current.emit("ice-candidate",{targetId:F,candidate:se.candidate})},oe.onconnectionstatechange=()=>{["failed","disconnected"].includes(oe.connectionState)&&Ne(F)},x.current[F]=oe,oe},[je,Ne]),en=f.useCallback(F=>{F.on("offer",async({senderId:V,sdp:oe})=>{let se=x.current[V];se||(se=_e(V,V)),await se.setRemoteDescription(new RTCSessionDescription(oe));const de=await se.createAnswer();await se.setLocalDescription(de),F.emit("answer",{targetId:V,sdp:de})}),F.on("answer",async({senderId:V,sdp:oe})=>{const se=x.current[V];se&&await se.setRemoteDescription(new RTCSessionDescription(oe))}),F.on("ice-candidate",async({senderId:V,candidate:oe})=>{const se=x.current[V];if(se&&oe)try{await se.addIceCandidate(new RTCIceCandidate(oe))}catch{}}),F.on("peer-joined",async({peerId:V,displayName:oe})=>{const se=_e(V,oe),de=await se.createOffer();await se.setLocalDescription(de),F.emit("offer",{targetId:V,sdp:de})}),F.on("existing-peers",({peers:V})=>{I("joined")}),F.on("peer-left",({peerId:V})=>{Ne(V)})},[_e,Ne]);f.useEffect(()=>{if(!n||!e)return;let F=!0;return(async()=>{I("connecting"),ie(null);try{const oe=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});if(!F){oe.getTracks().forEach(ce=>ce.stop());return}d.current=oe,g(oe);const se=oe.getAudioTracks()[0];se&&(se.enabled=l);const de=oe.getVideoTracks()[0];de&&(de.enabled=a);const te=eo(`${mC}/video`,{transports:["websocket"]});c.current=te,en(te),r&&te.on("knock-request",({peerId:ce,displayName:we})=>{k(Ze=>[...Ze,{peerId:ce,displayName:we}])}),r||(te.on("waiting-for-approval",()=>{I("waiting")}),te.on("knock-approved",({mediaLocked:ce})=>{var we,Ze;if(I("joined"),ce){A(!0),N(!0);const Ut=(we=d.current)==null?void 0:we.getAudioTracks()[0];Ut&&(Ut.enabled=!1,R(!1));const Vt=(Ze=d.current)==null?void 0:Ze.getVideoTracks()[0];Vt&&(Vt.enabled=!1,O(!1))}}),te.on("knock-rejected",({reason:ce})=>{I("rejected"),ie(ce||"Rad etildi")})),te.on("room-info",({title:ce})=>{ce&&Q(ce)}),te.on("screen-share-stopped",({peerId:ce})=>{h(we=>we.filter(Ze=>Ze.peerId!==ce)),delete J.current[ce]}),te.on("recording-started",()=>ge(!0)),te.on("recording-stopped",()=>ge(!1)),te.on("kicked",()=>{ie("Siz yaratuvchi tomonidan chiqarib yuborildingiz"),I("rejected"),Xe()}),te.on("force-mute-mic",()=>{var we;const ce=(we=d.current)==null?void 0:we.getAudioTracks()[0];ce&&(ce.enabled=!1,R(!1)),A(!0)}),te.on("force-mute-cam",()=>{var we;const ce=(we=d.current)==null?void 0:we.getVideoTracks()[0];ce&&(ce.enabled=!1,O(!1)),N(!0)}),te.on("allow-mic",()=>A(!1)),te.on("allow-cam",()=>N(!1)),te.on("hand-raised",({peerId:ce})=>{P(we=>new Set([...we,ce]))}),te.on("hand-lowered",({peerId:ce})=>{P(we=>{const Ze=new Set(we);return Ze.delete(ce),Ze})}),r?(te.emit("create-room",{roomId:e,displayName:t,isPrivate:o,title:s}),te.once("room-created",()=>{I("joined")})):te.emit("join-room",{roomId:e,displayName:t})}catch(oe){console.error("[useWebRTC]",oe),F&&(ie(oe.message||"Kamera/mikrofonga ruxsat berilmadi"),I("idle"))}})(),()=>{F=!1,Object.values(x.current).forEach(oe=>oe.close()),x.current={},d.current&&(d.current.getTracks().forEach(oe=>oe.stop()),d.current=null),g(null),v([]),k([]),c.current&&(c.current.emit("leave-room",{roomId:e}),c.current.disconnect())}},[n,e,t,r,o,en]);const Rt=f.useCallback(F=>{c.current&&(c.current.emit("approve-knock",{roomId:e,peerId:F}),k(V=>V.filter(oe=>oe.peerId!==F)))},[e]),ke=f.useCallback(F=>{c.current&&(c.current.emit("reject-knock",{roomId:e,peerId:F}),k(V=>V.filter(oe=>oe.peerId!==F)))},[e]),Je=f.useCallback(()=>{var V;if(S)return;const F=(V=d.current)==null?void 0:V.getAudioTracks()[0];F&&(F.enabled=!F.enabled,R(F.enabled))},[S]),Ye=f.useCallback(()=>{var V;if(ne)return;const F=(V=d.current)==null?void 0:V.getVideoTracks()[0];F&&(F.enabled=!F.enabled,O(F.enabled))},[ne]),Xe=f.useCallback(()=>{var F,V;c.current&&(c.current.emit("leave-room",{roomId:e}),c.current.disconnect()),Object.values(x.current).forEach(oe=>oe.close()),x.current={},(F=d.current)==null||F.getTracks().forEach(oe=>oe.stop()),d.current=null,(V=ae.current)==null||V.getTracks().forEach(oe=>oe.stop()),ae.current=null,g(null),C(null),j(!1),v([]),h([])},[e]),qe=f.useCallback(async()=>{var F,V,oe;if(y){(F=ae.current)==null||F.getTracks().forEach(se=>se.stop()),Object.entries(re.current).forEach(([se,de])=>{const te=x.current[se];if(te&&de)try{te.removeTrack(de)}catch{}}),re.current={},ae.current=null,C(null),j(!1),c.current&&c.current.emit("screen-share-stopped",{roomId:e});for(const[se,de]of Object.entries(x.current))try{const te=await de.createOffer();await de.setLocalDescription(te),(V=c.current)==null||V.emit("offer",{targetId:se,sdp:te})}catch{}return}try{const se=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});ae.current=se,C(se),j(!0),se.getVideoTracks()[0].onended=()=>{qe()};for(const[de,te]of Object.entries(x.current)){const ce=te.addTrack(se.getVideoTracks()[0],se);re.current[de]=ce}c.current&&c.current.emit("screen-share-started",{roomId:e});for(const[de,te]of Object.entries(x.current))try{const ce=await te.createOffer();await te.setLocalDescription(ce),(oe=c.current)==null||oe.emit("offer",{targetId:de,sdp:ce})}catch{}}catch(se){console.error("Screen share error:",se)}},[y,e]),un=f.useCallback(F=>{c.current&&c.current.emit(F?"recording-started":"recording-stopped",{roomId:e})},[e]),Bt=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("force-mute-mic",{roomId:e,peerId:F})},[e]),It=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("force-mute-cam",{roomId:e,peerId:F})},[e]),ye=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("allow-mic",{roomId:e,peerId:F})},[e]),ze=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("allow-cam",{roomId:e,peerId:F})},[e]),Le=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("kick-peer",{roomId:e,peerId:F})},[e]),Ft=f.useCallback(()=>{var V;const F=!X;Z(F),(V=c.current)==null||V.emit(F?"hand-raised":"hand-lowered",{roomId:e})},[X,e]);return{localStream:p,remoteStreams:w,screenStream:b,remoteScreenStreams:m,isScreenSharing:y,toggleScreenShare:qe,knockRequests:E,approveKnock:Rt,rejectKnock:ke,joinStatus:Y,isMicOn:_,isCamOn:D,micLocked:S,camLocked:ne,toggleMic:Je,toggleCam:Ye,leaveCall:Xe,error:W,roomTitle:T,remoteIsRecording:ue,emitRecording:un,forceMuteMic:Bt,forceMuteCam:It,allowMic:ye,allowCam:ze,isHandRaised:X,raisedHands:H,toggleHandRaise:Ft,kickPeer:Le}}const Rd=Xn`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,kC=Xn`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,wC=u.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
  animation: ${Rd} 0.3s ease-out;
`,bC=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`,jC=u.div`
  display: flex;
  flex-direction: column;
`,SC=u.span`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`,CC=u.span`
  color: #72767d;
  font-size: 11px;
  font-family: monospace;
`,zC=u.div`
  display: flex;
  gap: 8px;
`,Wo=u.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  border: 1px solid
    ${e=>e.$danger?"rgba(240,71,71,0.3)":"rgba(255,255,255,0.1)"};
  background: ${e=>e.$danger?"rgba(240,71,71,0.1)":"rgba(255,255,255,0.06)"};
  color: ${e=>e.$danger?"#f04747":"#b9bbbe"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  &:hover {
    background: ${e=>e.$danger?"rgba(240,71,71,0.2)":"rgba(255,255,255,0.12)"};
    color: ${e=>e.$danger?"#ff6060":"#fff"};
  }
`,EC=u.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,_C=u.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${e=>{const t=e.$count;return t===1?Wr`
        grid-template-columns: 1fr;
      `:t===2?Wr`
        grid-template-columns: 1fr 1fr;
      `:t<=4?Wr`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `:Wr`
      grid-template-columns: repeat(3, 1fr);
    `}}
`,TC=u.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #1e2124;
  border: 2px solid
    ${e=>e.$isLocal?"rgba(114,137,218,0.4)":"rgba(255,255,255,0.05)"};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: ${e=>e.$isLocal?"scaleX(-1)":"none"};
  }
`,RC=u.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`,IC=u.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #4f545c;
`,PC=u.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5e73bc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: white;
`,MC=u.div`
  width: 280px;
  flex-shrink: 0;
  background: #18191c;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
`,$C=u.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,AC=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,OC=u.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  animation: ${Rd} 0.2s ease;
`,NC=u.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`,LC=u.div`
  display: flex;
  gap: 6px;
`,rg=u.button`
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.15s;
  ${e=>e.$approve?"background: rgba(67,181,129,0.14); color: #43b581; border: 1px solid rgba(67,181,129,0.3); &:hover { background: rgba(67,181,129,0.24); }":"background: rgba(240,71,71,0.12); color: #f04747; border: 1px solid rgba(240,71,71,0.25); &:hover { background: rgba(240,71,71,0.22); }"}
`;u.div`
  text-align: center;
  color: #4f545c;
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;const og=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`,ig=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #7289da, #5e73bc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`,sg=u.div`
  flex: 1;
  min-width: 0;
  color: #dcddde;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,lg=u.div`
  display: flex;
  gap: 4px;
  color: #4f545c;
  flex-shrink: 0;
`,ag=u.div`
  color: #72767d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`,DC=u.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #f04747;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`,BC=u.button`
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: #fff;
  }
`,FC=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
`,Ir=u.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  ${e=>e.$danger?"background: #f04747; color: white; &:hover { background: #d84040; transform: scale(1.08); }":e.$active?"background: rgba(255,255,255,0.09); color: #fff; &:hover { background: rgba(255,255,255,0.15); }":"background: rgba(240,71,71,0.15); color: #f04747; border: 1px solid rgba(240,71,71,0.3); &:hover { background: rgba(240,71,71,0.25); }"}
`,js=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #b9bbbe;
  font-size: 15px;
`,UC=u(xr)`
  animation: ${kC} 1.2s linear infinite;
`,VC=Xn`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,qC=u.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(240, 71, 71, 0.15);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 20px;
  padding: 4px 12px 4px 8px;
  color: #f04747;
  font-size: 11px;
  font-weight: 700;
  animation: ${VC} 1.5s ease infinite;
`,HC=u.div`
  position: absolute;
  bottom: 62px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e2124;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 6px;
  min-width: 220px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
  animation: ${Rd} 0.15s ease;
  z-index: 100;
`,cg=u.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #dcddde;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
  &:hover {
    background: rgba(114, 137, 218, 0.15);
    color: #fff;
  }
`,ug=u.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${e=>e.$bg||"rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`,WC=u.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.55);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 5;
  &:hover {
    background: rgba(114, 137, 218, 0.7);
  }
`,Ss=({stream:e,muted:t=!1,isLocal:n=!1,label:r,isCamOn:o=!0})=>{var c;const s=f.useRef(null),l=f.useRef(null);f.useEffect(()=>{s.current&&e&&(s.current.srcObject=e)},[e,o]);const a=()=>{var x,p;const d=l.current;d&&(document.fullscreenElement?document.exitFullscreen():(x=d.requestFullscreen)!=null&&x.call(d)||((p=d.webkitRequestFullscreen)==null||p.call(d)))};return i.jsxs(TC,{$isLocal:n,ref:l,onDoubleClick:a,style:{cursor:"pointer"},onMouseEnter:d=>{const x=d.currentTarget.querySelector(".fs-btn");x&&(x.style.opacity=1)},onMouseLeave:d=>{const x=d.currentTarget.querySelector(".fs-btn");x&&(x.style.opacity=0)},children:[i.jsx(WC,{className:"fs-btn",onClick:a,children:i.jsx(u0,{size:14})}),o&&e?i.jsx("video",{ref:s,autoPlay:!0,playsInline:!0,muted:t}):i.jsxs(IC,{children:[i.jsx(PC,{children:((c=r==null?void 0:r.charAt(0))==null?void 0:c.toUpperCase())||"?"}),i.jsx("span",{style:{fontSize:12},children:r})]}),i.jsxs(RC,{children:[!o&&i.jsx(Zr,{size:11}),r,n&&" (Sen)"]})]})},YC=({isOpen:e,onClose:t,roomId:n,chatTitle:r,isCreator:o=!0,isPrivate:s=!1,initialMicOn:l=!0,initialCamOn:a=!0})=>{var It;const[c,d]=f.useState(!1),[x,p]=f.useState(!1),g=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")}catch{return null}})(),w=(g==null?void 0:g.nickname)||(g==null?void 0:g.username)||"Mehmon",{localStream:v,remoteStreams:b,screenStream:C,remoteScreenStreams:m,isScreenSharing:h,toggleScreenShare:y,knockRequests:j,approveKnock:E,rejectKnock:k,joinStatus:_,isMicOn:R,isCamOn:D,micLocked:O,camLocked:S,toggleMic:A,toggleCam:ne,leaveCall:N,error:X,roomTitle:Z,remoteIsRecording:H,emitRecording:P,forceMuteMic:Y,forceMuteCam:I,allowMic:W,allowCam:ie,isHandRaised:T,raisedHands:Q,toggleHandRaise:ue,kickPeer:ge}=vC({roomId:n,displayName:w,enabled:e&&!!n,isCreator:o,isPrivate:s,chatTitle:r,initialMicOn:l,initialCamOn:a}),[ae,re]=f.useState(!1),[J,je]=f.useState(!1),Ne=f.useRef(null),_e=f.useRef([]),en=f.useRef(null),Rt=f.useRef(null),ke=f.useRef(null),Je=f.useCallback(()=>{const ye=new AudioContext,ze=ye.createMediaStreamDestination();return[v,...b.map(Ft=>Ft.stream)].filter(Boolean).forEach(Ft=>{const F=Ft.getAudioTracks();F.length>0&&ye.createMediaStreamSource(new MediaStream(F)).connect(ze)}),ze.stream},[v,b]),Ye=f.useCallback(async ye=>{try{je(!1);let ze;if(ye==="screen"){const V=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});ke.current=V,ze=V,V.getVideoTracks()[0].onended=()=>Xe()}else{const V=document.createElement("canvas");V.width=1280,V.height=720,en.current=V;const oe=V.getContext("2d"),se=()=>{const de=document.querySelectorAll("video"),te=de.length||1,ce=te<=1?1:te<=4?2:3,we=Math.ceil(te/ce),Ze=V.width/ce,Ut=V.height/we;oe.fillStyle="#0b0d0f",oe.fillRect(0,0,V.width,V.height),de.forEach((Vt,dn)=>{const Er=dn%ce,Zn=Math.floor(dn/ce);try{oe.drawImage(Vt,Er*Ze,Zn*Ut,Ze,Ut)}catch{}})};Rt.current=setInterval(se,33),ze=V.captureStream(30)}const Le=Je(),Ft=new MediaStream([...ze.getVideoTracks(),...Le.getAudioTracks()]);_e.current=[];const F=new MediaRecorder(Ft,{mimeType:"video/webm;codecs=vp9,opus"});F.ondataavailable=V=>{V.data.size>0&&_e.current.push(V.data)},Ne.current=F,F.start(1e3),re(!0),P(!0)}catch(ze){console.error("Recording error:",ze),je(!1)}},[Je,P]),Xe=f.useCallback(()=>{Rt.current&&(clearInterval(Rt.current),Rt.current=null),ke.current&&(ke.current.getTracks().forEach(ye=>ye.stop()),ke.current=null),Ne.current&&Ne.current.state!=="inactive"&&(Ne.current.onstop=()=>{const ye=new Blob(_e.current,{type:"video/webm"}),ze=URL.createObjectURL(ye),Le=document.createElement("a");Le.href=ze,Le.download=`meet-${n}-${Date.now()}.webm`,Le.click(),URL.revokeObjectURL(ze),_e.current=[]},Ne.current.stop()),re(!1),P(!1)},[n,P]),qe=()=>{ae&&Xe(),N(),t()},un=()=>{navigator.clipboard.writeText(`${window.location.origin}/join/${n}`),d(!0),setTimeout(()=>d(!1),2e3)};if(!e||!n)return null;const Bt=1+b.length+(C?1:0)+m.length;return i.jsxs(wC,{children:[i.jsxs(bC,{children:[i.jsxs(jC,{children:[i.jsxs(SC,{children:[Z||r||"Meet",s&&i.jsx("span",{style:{fontSize:11,color:"#faa61a",marginLeft:8},children:"🔒 Private"})]}),i.jsx(CC,{children:n})]}),i.jsxs(zC,{children:[(ae||H)&&i.jsxs(qC,{children:[i.jsx(Ea,{size:8,fill:"#f04747"})," REC"]}),i.jsxs(Wo,{onClick:un,children:[c?i.jsx(ho,{size:13}):i.jsx(Bk,{size:13}),c?"Nusxalandi!":"Link"]}),i.jsxs(Wo,{onClick:()=>p(ye=>!ye),style:{position:"relative"},children:[i.jsx(xo,{size:13}),Bt,o&&j.length>0&&i.jsx(DC,{children:j.length})]})]})]}),i.jsxs(EC,{children:[X?i.jsxs(js,{children:[i.jsx(c0,{size:38,color:"#f04747"}),i.jsx("span",{children:X}),i.jsx(Wo,{onClick:t,children:"Yopish"})]}):_==="connecting"?i.jsxs(js,{children:[i.jsx(UC,{size:38,color:"#7289da"}),i.jsx("span",{children:"Ulanmoqda…"})]}):_==="waiting"?i.jsxs(js,{children:[i.jsx(gr,{size:48,color:"#faa61a"}),i.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Ruxsat kutilmoqda…"}),i.jsx("span",{children:"Call yaratuvchisi sizga ruxsat berishini kuting"}),i.jsx(Wo,{onClick:qe,children:"Bekor qilish"})]}):_==="rejected"?i.jsxs(js,{children:[i.jsx(Ra,{size:48,color:"#f04747"}),i.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Rad etildi"}),i.jsx("span",{children:"Call yaratuvchisi so'rovingizni rad etdi"}),i.jsx(Wo,{onClick:t,children:"Yopish"})]}):i.jsxs(_C,{$count:Bt,children:[i.jsx(Ss,{stream:v,muted:!0,isLocal:!0,label:w,isCamOn:D}),C&&i.jsx(Ss,{stream:C,muted:!0,label:`🖥️ ${w} (Ekran)`,isCamOn:!0}),b.map(({peerId:ye,stream:ze,displayName:Le})=>i.jsxs("div",{style:{position:"relative"},children:[i.jsx(Ss,{stream:ze,label:Le,isCamOn:!0}),Q.has(ye)&&i.jsx("span",{style:{position:"absolute",top:8,left:8,fontSize:24,zIndex:5,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"},children:"✋"})]},ye)),m.map(({peerId:ye,stream:ze,displayName:Le})=>i.jsx(Ss,{stream:ze,label:`🖥️ ${Le} (Ekran)`,isCamOn:!0},`screen-${ye}`))]}),x&&i.jsxs(MC,{children:[i.jsxs($C,{children:[i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[i.jsx(xo,{size:15,color:"#7289da"}),"A'zolar (",Bt,")"]}),i.jsx(BC,{onClick:()=>p(!1),children:i.jsx(Ra,{size:16})})]}),i.jsxs(AC,{children:[o&&s&&i.jsxs(i.Fragment,{children:[i.jsxs(ag,{children:["⏳ Kutayotganlar (",j.length,")"]}),j.length===0?i.jsx("div",{style:{padding:"8px 14px",color:"#4f545c",fontSize:12},children:"Hech kim kutmayapti"}):j.map(({peerId:ye,displayName:ze})=>i.jsxs(OC,{children:[i.jsxs(NC,{children:["👤 ",ze]}),i.jsxs(LC,{children:[i.jsxs(rg,{$approve:!0,onClick:()=>E(ye),children:[i.jsx(yd,{size:12})," Qabul"]}),i.jsxs(rg,{onClick:()=>k(ye),children:[i.jsx(Ra,{size:12})," Rad"]})]})]},ye))]}),i.jsxs(ag,{children:["✅ Qo'shilganlar (",Bt,")"]}),i.jsxs(og,{children:[i.jsx(ig,{children:((It=w==null?void 0:w.charAt(0))==null?void 0:It.toUpperCase())||"?"}),i.jsxs(sg,{children:[w," (Sen)"]}),i.jsxs(lg,{children:[R?i.jsx(ur,{size:13,color:"#43b581"}):i.jsx(mr,{size:13,color:"#f04747"}),D?i.jsx(yn,{size:13,color:"#43b581"}):i.jsx(Zr,{size:13,color:"#f04747"})]})]}),b.map(({peerId:ye,displayName:ze})=>{var Le;return i.jsxs(og,{children:[i.jsx(ig,{children:((Le=ze==null?void 0:ze.charAt(0))==null?void 0:Le.toUpperCase())||"?"}),i.jsxs(sg,{children:[Q.has(ye)&&"✋ ",ze]}),i.jsx(lg,{children:o?i.jsxs(i.Fragment,{children:[i.jsx("span",{onClick:()=>Y(ye),style:{cursor:"pointer"},title:"Mic o'chirish",children:i.jsx(mr,{size:13,color:"#f04747"})}),i.jsx("span",{onClick:()=>W(ye),style:{cursor:"pointer"},title:"Mic ruxsat",children:i.jsx(ur,{size:13,color:"#43b581"})}),i.jsx("span",{onClick:()=>I(ye),style:{cursor:"pointer"},title:"Cam o'chirish",children:i.jsx(Zr,{size:13,color:"#f04747"})}),i.jsx("span",{onClick:()=>ie(ye),style:{cursor:"pointer"},title:"Cam ruxsat",children:i.jsx(yn,{size:13,color:"#43b581"})}),i.jsx("span",{onClick:()=>ge(ye),style:{cursor:"pointer",marginLeft:8},title:"Chiqarib yuborish",children:i.jsx(p0,{size:13,color:"#f04747"})})]}):i.jsxs(i.Fragment,{children:[i.jsx(ur,{size:13,color:"#43b581"}),i.jsx(yn,{size:13,color:"#43b581"})]})})]},ye)})]})]})]}),i.jsxs(FC,{children:[i.jsxs(Ir,{$active:R,onClick:A,style:O?{opacity:.5,cursor:"not-allowed"}:{},children:[R?i.jsx(ur,{size:21}):i.jsx(mr,{size:21}),O&&i.jsx(go,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),i.jsxs(Ir,{$active:D,onClick:ne,style:S?{opacity:.5,cursor:"not-allowed"}:{},children:[D?i.jsx(yn,{size:21}):i.jsx(Zr,{size:21}),S&&i.jsx(go,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),i.jsx(Ir,{$active:h,onClick:y,children:h?i.jsx(f0,{size:21}):i.jsx(su,{size:21})}),i.jsx(Ir,{$active:T,onClick:ue,style:T?{background:"rgba(250,166,26,0.2)",color:"#faa61a"}:{},children:i.jsx(Hk,{size:21})}),o&&i.jsxs("div",{style:{position:"relative"},children:[i.jsx(Ir,{$active:ae,onClick:()=>ae?Xe():je(ye=>!ye),style:ae?{background:"rgba(240,71,71,0.2)",color:"#f04747"}:{},children:i.jsx(Ea,{size:21,fill:ae?"#f04747":"none"})}),J&&!ae&&i.jsxs(HC,{children:[i.jsxs(cg,{onClick:()=>Ye("screen"),children:[i.jsx(ug,{$bg:"rgba(114,137,218,0.15)",children:i.jsx(su,{size:16,color:"#7289da"})}),i.jsxs("div",{children:[i.jsx("div",{style:{fontWeight:600},children:"Ekranni yozish"}),i.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Faqat ekran + barcha ovozlar"})]})]}),i.jsxs(cg,{onClick:()=>Ye("all"),children:[i.jsx(ug,{$bg:"rgba(240,71,71,0.12)",children:i.jsx(Ea,{size:16,color:"#f04747"})}),i.jsxs("div",{children:[i.jsx("div",{style:{fontWeight:600},children:"Hammasini yozish"}),i.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Barcha oynalar + barcha ovozlar"})]})]})]})]}),i.jsx(Ir,{$danger:!0,onClick:qe,children:i.jsx(ql,{size:21})})]})]})},GC=Xn`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,KC=Xn`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,dg=u.div`
  min-height: 100vh;
  width: 100%;
  background: #0b0d0f;
  display: flex;
  align-items: center;
  justify-content: center;
`,fg=u.div`
  background: rgba(32, 34, 37, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 44px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${GC} 0.3s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`,QC=u.div`
  font-size: 40px;
  margin-bottom: 12px;
`,JC=u.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
`,XC=u.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
`,ZC=u.code`
  display: block;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  color: #7289da;
  font-size: 13px;
  margin-bottom: 24px;
  word-break: break-all;
`,e3=u.input`
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
  color: #fff;
  font-size: 15px;
  outline: none;
  margin-bottom: 14px;
  transition: border-color 0.2s;
  &:focus {
    border-color: #7289da;
  }
  &::placeholder {
    color: #4f545c;
  }
`,t3=u.button`
  width: 100%;
  padding: 13px;
  background: #7289da;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #677bc4;
  }
`,n3=u.p`
  color: #f04747;
  font-size: 13px;
  margin: 8px 0 0;
`,r3=u(xr)`
  animation: ${KC} 1.2s linear infinite;
`,o3=u.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`,pg=u.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  background: ${e=>e.$active?"rgba(255,255,255,0.09)":"rgba(240,71,71,0.15)"};
  color: ${e=>e.$active?"#fff":"#f04747"};
  border: 1px solid
    ${e=>e.$active?"rgba(255,255,255,0.1)":"rgba(240,71,71,0.3)"};
  &:hover {
    background: ${e=>e.$active?"rgba(255,255,255,0.15)":"rgba(240,71,71,0.25)"};
  }
`,hg=u.span`
  display: block;
  font-size: 10px;
  margin-top: 4px;
  color: ${e=>e.$active?"#b9bbbe":"#f04747"};
`,i3=()=>{const{roomId:e}=fd(),[t,n]=f.useState("checking"),[r,o]=f.useState(null),[s,l]=f.useState(""),[a,c]=f.useState(""),[d,x]=f.useState(!1),[p,g]=f.useState(!1);f.useEffect(()=>{const v=Ob(e);o(v);const b=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")}catch{return null}})();v!=null&&v.isCreator?(l((b==null?void 0:b.nickname)||(b==null?void 0:b.username)||"Host"),n("call")):(l((b==null?void 0:b.nickname)||(b==null?void 0:b.username)||""),n("form"))},[e]);const w=()=>{if(!s.trim()){c("Iltimos ismingizni kiriting");return}$b({roomId:e,title:(r==null?void 0:r.title)||"Meet",isPrivate:(r==null?void 0:r.isPrivate)||!1,isCreator:!1}),n("call")};return t==="checking"?i.jsx(dg,{children:i.jsx(fg,{children:i.jsx(r3,{size:32,color:"#7289da"})})}):t==="call"?i.jsx(YC,{isOpen:!0,onClose:()=>window.history.back(),roomId:e,chatTitle:(r==null?void 0:r.title)||"Meet",isCreator:(r==null?void 0:r.isCreator)||!1,isPrivate:(r==null?void 0:r.isPrivate)||!1,initialMicOn:d,initialCamOn:p}):i.jsx(dg,{children:i.jsxs(fg,{children:[i.jsx(QC,{children:"📹"}),i.jsx(JC,{children:"Video Callga qo'shilish"}),i.jsx(XC,{children:"Siz quyidagi callga taklif qilindingiz:"}),i.jsx(ZC,{children:e}),i.jsx(e3,{autoFocus:!0,value:s,onChange:v=>l(v.target.value),placeholder:"Ismingizni kiriting",onKeyDown:v=>v.key==="Enter"&&w()}),i.jsxs(o3,{children:[i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(pg,{$active:d,onClick:()=>x(v=>!v),children:d?i.jsx(ur,{size:22}):i.jsx(mr,{size:22})}),i.jsx(hg,{$active:d,children:d?"Yoniq":"O'chiq"})]}),i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(pg,{$active:p,onClick:()=>g(v=>!v),children:p?i.jsx(yn,{size:22}):i.jsx(Zr,{size:22})}),i.jsx(hg,{$active:p,children:p?"Yoniq":"O'chiq"})]})]}),a&&i.jsx(n3,{children:a}),i.jsx(t3,{onClick:w,children:"🎥 Callga kirish"})]})})};function Za({children:e}){return localStorage.getItem("token")?e:i.jsx(k2,{to:"/login",replace:!0})}function s3(){const{nav:e}=fd(),t=zr(),{resolveChatSlug:n}=Fi();return Ct.useEffect(()=>{!e||["home","users","groups","a","channels","courses","meets","login","register","join"].includes(e)||n(e).then(o=>{o&&o.jammId?t(`/a/${o.jammId}`,{replace:!0}):t("/home",{replace:!0})}).catch(o=>{console.error("Slug resolution failed:",o.message),t("/home",{replace:!0})})},[e,t,n]),i.jsx(L0,{})}function L0(){const{nav:e,channelId:t}=fd(),n=zr();return i.jsx(B5,{initialNav:e||"home",initialChannel:t||"0",navigate:n})}function l3(){return i.jsx(T2,{children:i.jsx(pw,{children:i.jsx(Eb,{children:i.jsx(Mb,{children:i.jsxs(b2,{children:[i.jsx(Pr,{path:"/login",element:i.jsx(xC,{})}),i.jsx(Pr,{path:"/join/:roomId",element:i.jsx(i3,{})}),i.jsx(Pr,{path:"/",element:i.jsx(Za,{children:i.jsx(W5,{})})}),i.jsx(Pr,{path:"/:nav",element:i.jsx(Za,{children:i.jsx(s3,{})})}),i.jsx(Pr,{path:"/:nav/:channelId",element:i.jsx(Za,{children:i.jsx(L0,{})})})]})})})})})}ec.createRoot(document.getElementById("root")).render(i.jsx(Ct.StrictMode,{children:i.jsx(l3,{})}));
