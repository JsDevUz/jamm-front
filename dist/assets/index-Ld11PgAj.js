function o1(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const s=Object.getOwnPropertyDescriptor(r,o);s&&Object.defineProperty(e,o,s.get?s:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function i1(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var mg={exports:{}},ja={},yg={exports:{}},ve={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oi=Symbol.for("react.element"),s1=Symbol.for("react.portal"),a1=Symbol.for("react.fragment"),l1=Symbol.for("react.strict_mode"),c1=Symbol.for("react.profiler"),u1=Symbol.for("react.provider"),d1=Symbol.for("react.context"),f1=Symbol.for("react.forward_ref"),p1=Symbol.for("react.suspense"),h1=Symbol.for("react.memo"),g1=Symbol.for("react.lazy"),qd=Symbol.iterator;function x1(e){return e===null||typeof e!="object"?null:(e=qd&&e[qd]||e["@@iterator"],typeof e=="function"?e:null)}var vg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},kg=Object.assign,wg={};function vo(e,t,n){this.props=e,this.context=t,this.refs=wg,this.updater=n||vg}vo.prototype.isReactComponent={};vo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};vo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function bg(){}bg.prototype=vo.prototype;function gu(e,t,n){this.props=e,this.context=t,this.refs=wg,this.updater=n||vg}var xu=gu.prototype=new bg;xu.constructor=gu;kg(xu,vo.prototype);xu.isPureReactComponent=!0;var Hd=Array.isArray,jg=Object.prototype.hasOwnProperty,mu={current:null},Sg={key:!0,ref:!0,__self:!0,__source:!0};function Cg(e,t,n){var r,o={},s=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)jg.call(t,r)&&!Sg.hasOwnProperty(r)&&(o[r]=t[r]);var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];o.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)o[r]===void 0&&(o[r]=l[r]);return{$$typeof:Oi,type:e,key:s,ref:a,props:o,_owner:mu.current}}function m1(e,t){return{$$typeof:Oi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function yu(e){return typeof e=="object"&&e!==null&&e.$$typeof===Oi}function y1(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Wd=/\/+/g;function Qa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?y1(""+e.key):t.toString(36)}function Es(e,t,n,r,o){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Oi:case s1:a=!0}}if(a)return a=e,o=o(a),e=r===""?"."+Qa(a,0):r,Hd(o)?(n="",e!=null&&(n=e.replace(Wd,"$&/")+"/"),Es(o,t,n,"",function(d){return d})):o!=null&&(yu(o)&&(o=m1(o,n+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(Wd,"$&/")+"/")+e)),t.push(o)),1;if(a=0,r=r===""?".":r+":",Hd(e))for(var l=0;l<e.length;l++){s=e[l];var c=r+Qa(s,l);a+=Es(s,t,n,c,o)}else if(c=x1(e),typeof c=="function")for(e=c.call(e),l=0;!(s=e.next()).done;)s=s.value,c=r+Qa(s,l++),a+=Es(s,t,n,c,o);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Wi(e,t,n){if(e==null)return e;var r=[],o=0;return Es(e,r,"","",function(s){return t.call(n,s,o++)}),r}function v1(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ht={current:null},_s={transition:null},k1={ReactCurrentDispatcher:ht,ReactCurrentBatchConfig:_s,ReactCurrentOwner:mu};function zg(){throw Error("act(...) is not supported in production builds of React.")}ve.Children={map:Wi,forEach:function(e,t,n){Wi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Wi(e,function(){t++}),t},toArray:function(e){return Wi(e,function(t){return t})||[]},only:function(e){if(!yu(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ve.Component=vo;ve.Fragment=a1;ve.Profiler=c1;ve.PureComponent=gu;ve.StrictMode=l1;ve.Suspense=p1;ve.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=k1;ve.act=zg;ve.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=kg({},e.props),o=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=mu.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)jg.call(t,c)&&!Sg.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:Oi,type:e.type,key:o,ref:s,props:r,_owner:a}};ve.createContext=function(e){return e={$$typeof:d1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:u1,_context:e},e.Consumer=e};ve.createElement=Cg;ve.createFactory=function(e){var t=Cg.bind(null,e);return t.type=e,t};ve.createRef=function(){return{current:null}};ve.forwardRef=function(e){return{$$typeof:f1,render:e}};ve.isValidElement=yu;ve.lazy=function(e){return{$$typeof:g1,_payload:{_status:-1,_result:e},_init:v1}};ve.memo=function(e,t){return{$$typeof:h1,type:e,compare:t===void 0?null:t}};ve.startTransition=function(e){var t=_s.transition;_s.transition={};try{e()}finally{_s.transition=t}};ve.unstable_act=zg;ve.useCallback=function(e,t){return ht.current.useCallback(e,t)};ve.useContext=function(e){return ht.current.useContext(e)};ve.useDebugValue=function(){};ve.useDeferredValue=function(e){return ht.current.useDeferredValue(e)};ve.useEffect=function(e,t){return ht.current.useEffect(e,t)};ve.useId=function(){return ht.current.useId()};ve.useImperativeHandle=function(e,t,n){return ht.current.useImperativeHandle(e,t,n)};ve.useInsertionEffect=function(e,t){return ht.current.useInsertionEffect(e,t)};ve.useLayoutEffect=function(e,t){return ht.current.useLayoutEffect(e,t)};ve.useMemo=function(e,t){return ht.current.useMemo(e,t)};ve.useReducer=function(e,t,n){return ht.current.useReducer(e,t,n)};ve.useRef=function(e){return ht.current.useRef(e)};ve.useState=function(e){return ht.current.useState(e)};ve.useSyncExternalStore=function(e,t,n){return ht.current.useSyncExternalStore(e,t,n)};ve.useTransition=function(){return ht.current.useTransition()};ve.version="18.3.1";yg.exports=ve;var f=yg.exports;const Ct=i1(f),w1=o1({__proto__:null,default:Ct},[f]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b1=f,j1=Symbol.for("react.element"),S1=Symbol.for("react.fragment"),C1=Object.prototype.hasOwnProperty,z1=b1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,E1={key:!0,ref:!0,__self:!0,__source:!0};function Eg(e,t,n){var r,o={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)C1.call(t,r)&&!E1.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:j1,type:e,key:s,ref:a,props:o,_owner:z1.current}}ja.Fragment=S1;ja.jsx=Eg;ja.jsxs=Eg;mg.exports=ja;var i=mg.exports,nc={},_g={exports:{}},_t={},Tg={exports:{}},Rg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t($,G){var I=$.length;$.push(G);e:for(;0<I;){var W=I-1>>>1,ie=$[W];if(0<o(ie,G))$[W]=G,$[I]=ie,I=W;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var G=$[0],I=$.pop();if(I!==G){$[0]=I;e:for(var W=0,ie=$.length,R=ie>>>1;W<R;){var Q=2*(W+1)-1,ue=$[Q],ge=Q+1,le=$[ge];if(0>o(ue,I))ge<ie&&0>o(le,ue)?($[W]=le,$[ge]=I,W=ge):($[W]=ue,$[Q]=I,W=Q);else if(ge<ie&&0>o(le,I))$[W]=le,$[ge]=I,W=ge;else break e}}return G}function o($,G){var I=$.sortIndex-G.sortIndex;return I!==0?I:$.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var c=[],d=[],x=1,p=null,g=3,b=!1,k=!1,j=!1,C=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m($){for(var G=n(d);G!==null;){if(G.callback===null)r(d);else if(G.startTime<=$)r(d),G.sortIndex=G.expirationTime,t(c,G);else break;G=n(d)}}function w($){if(j=!1,m($),!k)if(n(c)!==null)k=!0,Z(S);else{var G=n(d);G!==null&&H(w,G.startTime-$)}}function S($,G){k=!1,j&&(j=!1,y(T),T=-1),b=!0;var I=g;try{for(m(G),p=n(c);p!==null&&(!(p.expirationTime>G)||$&&!z());){var W=p.callback;if(typeof W=="function"){p.callback=null,g=p.priorityLevel;var ie=W(p.expirationTime<=G);G=e.unstable_now(),typeof ie=="function"?p.callback=ie:p===n(c)&&r(c),m(G)}else r(c);p=n(c)}if(p!==null)var R=!0;else{var Q=n(d);Q!==null&&H(w,Q.startTime-G),R=!1}return R}finally{p=null,g=I,b=!1}}var v=!1,_=null,T=-1,O=5,N=-1;function z(){return!(e.unstable_now()-N<O)}function A(){if(_!==null){var $=e.unstable_now();N=$;var G=!0;try{G=_(!0,$)}finally{G?ne():(v=!1,_=null)}}else v=!1}var ne;if(typeof h=="function")ne=function(){h(A)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,X=L.port2;L.port1.onmessage=A,ne=function(){X.postMessage(null)}}else ne=function(){C(A,0)};function Z($){_=$,v||(v=!0,ne())}function H($,G){T=C(function(){$(e.unstable_now())},G)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){k||b||(k=!0,Z(S))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function($){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var I=g;g=G;try{return $()}finally{g=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,G){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var I=g;g=$;try{return G()}finally{g=I}},e.unstable_scheduleCallback=function($,G,I){var W=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?W+I:W):I=W,$){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=I+ie,$={id:x++,callback:G,priorityLevel:$,startTime:I,expirationTime:ie,sortIndex:-1},I>W?($.sortIndex=I,t(d,$),n(c)===null&&$===n(d)&&(j?(y(T),T=-1):j=!0,H(w,I-W))):($.sortIndex=ie,t(c,$),k||b||(k=!0,Z(S))),$},e.unstable_shouldYield=z,e.unstable_wrapCallback=function($){var G=g;return function(){var I=g;g=G;try{return $.apply(this,arguments)}finally{g=I}}}})(Rg);Tg.exports=Rg;var _1=Tg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T1=f,Et=_1;function D(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ig=new Set,di={};function zr(e,t){ro(e,t),ro(e+"Capture",t)}function ro(e,t){for(di[e]=t,e=0;e<t.length;e++)Ig.add(t[e])}var bn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),rc=Object.prototype.hasOwnProperty,R1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Gd={},Yd={};function I1(e){return rc.call(Yd,e)?!0:rc.call(Gd,e)?!1:R1.test(e)?Yd[e]=!0:(Gd[e]=!0,!1)}function $1(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function P1(e,t,n,r){if(t===null||typeof t>"u"||$1(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function gt(e,t,n,r,o,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var rt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){rt[e]=new gt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];rt[t]=new gt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){rt[e]=new gt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){rt[e]=new gt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){rt[e]=new gt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){rt[e]=new gt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){rt[e]=new gt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){rt[e]=new gt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){rt[e]=new gt(e,5,!1,e.toLowerCase(),null,!1,!1)});var vu=/[\-:]([a-z])/g;function ku(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(vu,ku);rt[t]=new gt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(vu,ku);rt[t]=new gt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(vu,ku);rt[t]=new gt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){rt[e]=new gt(e,1,!1,e.toLowerCase(),null,!1,!1)});rt.xlinkHref=new gt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){rt[e]=new gt(e,1,!1,e.toLowerCase(),null,!0,!0)});function wu(e,t,n,r){var o=rt.hasOwnProperty(t)?rt[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(P1(t,n,o,r)&&(n=null),r||o===null?I1(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var zn=T1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Gi=Symbol.for("react.element"),Ar=Symbol.for("react.portal"),Or=Symbol.for("react.fragment"),bu=Symbol.for("react.strict_mode"),oc=Symbol.for("react.profiler"),$g=Symbol.for("react.provider"),Pg=Symbol.for("react.context"),ju=Symbol.for("react.forward_ref"),ic=Symbol.for("react.suspense"),sc=Symbol.for("react.suspense_list"),Su=Symbol.for("react.memo"),In=Symbol.for("react.lazy"),Mg=Symbol.for("react.offscreen"),Kd=Symbol.iterator;function Eo(e){return e===null||typeof e!="object"?null:(e=Kd&&e[Kd]||e["@@iterator"],typeof e=="function"?e:null)}var Ae=Object.assign,Ja;function Ko(e){if(Ja===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ja=t&&t[1]||""}return`
`+Ja+e}var Xa=!1;function Za(e,t){if(!e||Xa)return"";Xa=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var o=d.stack.split(`
`),s=r.stack.split(`
`),a=o.length-1,l=s.length-1;1<=a&&0<=l&&o[a]!==s[l];)l--;for(;1<=a&&0<=l;a--,l--)if(o[a]!==s[l]){if(a!==1||l!==1)do if(a--,l--,0>l||o[a]!==s[l]){var c=`
`+o[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=l);break}}}finally{Xa=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ko(e):""}function M1(e){switch(e.tag){case 5:return Ko(e.type);case 16:return Ko("Lazy");case 13:return Ko("Suspense");case 19:return Ko("SuspenseList");case 0:case 2:case 15:return e=Za(e.type,!1),e;case 11:return e=Za(e.type.render,!1),e;case 1:return e=Za(e.type,!0),e;default:return""}}function ac(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Or:return"Fragment";case Ar:return"Portal";case oc:return"Profiler";case bu:return"StrictMode";case ic:return"Suspense";case sc:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Pg:return(e.displayName||"Context")+".Consumer";case $g:return(e._context.displayName||"Context")+".Provider";case ju:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Su:return t=e.displayName||null,t!==null?t:ac(e.type)||"Memo";case In:t=e._payload,e=e._init;try{return ac(e(t))}catch{}}return null}function A1(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ac(t);case 8:return t===bu?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Yn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ag(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function O1(e){var t=Ag(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Yi(e){e._valueTracker||(e._valueTracker=O1(e))}function Og(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ag(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Gs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function lc(e,t){var n=t.checked;return Ae({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Qd(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Yn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ng(e,t){t=t.checked,t!=null&&wu(e,"checked",t,!1)}function cc(e,t){Ng(e,t);var n=Yn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?uc(e,t.type,n):t.hasOwnProperty("defaultValue")&&uc(e,t.type,Yn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Jd(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function uc(e,t,n){(t!=="number"||Gs(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Qo=Array.isArray;function Kr(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Yn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function dc(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(D(91));return Ae({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Xd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(D(92));if(Qo(n)){if(1<n.length)throw Error(D(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Yn(n)}}function Lg(e,t){var n=Yn(t.value),r=Yn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Zd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Dg(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fc(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Dg(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ki,Bg=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ki=Ki||document.createElement("div"),Ki.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ki.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function fi(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ti={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},N1=["Webkit","ms","Moz","O"];Object.keys(ti).forEach(function(e){N1.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ti[t]=ti[e]})});function Fg(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ti.hasOwnProperty(e)&&ti[e]?(""+t).trim():t+"px"}function Ug(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Fg(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var L1=Ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function pc(e,t){if(t){if(L1[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(D(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(D(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(D(61))}if(t.style!=null&&typeof t.style!="object")throw Error(D(62))}}function hc(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gc=null;function Cu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var xc=null,Qr=null,Jr=null;function ef(e){if(e=Di(e)){if(typeof xc!="function")throw Error(D(280));var t=e.stateNode;t&&(t=_a(t),xc(e.stateNode,e.type,t))}}function Vg(e){Qr?Jr?Jr.push(e):Jr=[e]:Qr=e}function qg(){if(Qr){var e=Qr,t=Jr;if(Jr=Qr=null,ef(e),t)for(e=0;e<t.length;e++)ef(t[e])}}function Hg(e,t){return e(t)}function Wg(){}var el=!1;function Gg(e,t,n){if(el)return e(t,n);el=!0;try{return Hg(e,t,n)}finally{el=!1,(Qr!==null||Jr!==null)&&(Wg(),qg())}}function pi(e,t){var n=e.stateNode;if(n===null)return null;var r=_a(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(D(231,t,typeof n));return n}var mc=!1;if(bn)try{var _o={};Object.defineProperty(_o,"passive",{get:function(){mc=!0}}),window.addEventListener("test",_o,_o),window.removeEventListener("test",_o,_o)}catch{mc=!1}function D1(e,t,n,r,o,s,a,l,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(x){this.onError(x)}}var ni=!1,Ys=null,Ks=!1,yc=null,B1={onError:function(e){ni=!0,Ys=e}};function F1(e,t,n,r,o,s,a,l,c){ni=!1,Ys=null,D1.apply(B1,arguments)}function U1(e,t,n,r,o,s,a,l,c){if(F1.apply(this,arguments),ni){if(ni){var d=Ys;ni=!1,Ys=null}else throw Error(D(198));Ks||(Ks=!0,yc=d)}}function Er(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Yg(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function tf(e){if(Er(e)!==e)throw Error(D(188))}function V1(e){var t=e.alternate;if(!t){if(t=Er(e),t===null)throw Error(D(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var s=o.alternate;if(s===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===s.child){for(s=o.child;s;){if(s===n)return tf(o),e;if(s===r)return tf(o),t;s=s.sibling}throw Error(D(188))}if(n.return!==r.return)n=o,r=s;else{for(var a=!1,l=o.child;l;){if(l===n){a=!0,n=o,r=s;break}if(l===r){a=!0,r=o,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,r=o;break}if(l===r){a=!0,r=s,n=o;break}l=l.sibling}if(!a)throw Error(D(189))}}if(n.alternate!==r)throw Error(D(190))}if(n.tag!==3)throw Error(D(188));return n.stateNode.current===n?e:t}function Kg(e){return e=V1(e),e!==null?Qg(e):null}function Qg(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Qg(e);if(t!==null)return t;e=e.sibling}return null}var Jg=Et.unstable_scheduleCallback,nf=Et.unstable_cancelCallback,q1=Et.unstable_shouldYield,H1=Et.unstable_requestPaint,De=Et.unstable_now,W1=Et.unstable_getCurrentPriorityLevel,zu=Et.unstable_ImmediatePriority,Xg=Et.unstable_UserBlockingPriority,Qs=Et.unstable_NormalPriority,G1=Et.unstable_LowPriority,Zg=Et.unstable_IdlePriority,Sa=null,cn=null;function Y1(e){if(cn&&typeof cn.onCommitFiberRoot=="function")try{cn.onCommitFiberRoot(Sa,e,void 0,(e.current.flags&128)===128)}catch{}}var Jt=Math.clz32?Math.clz32:J1,K1=Math.log,Q1=Math.LN2;function J1(e){return e>>>=0,e===0?32:31-(K1(e)/Q1|0)|0}var Qi=64,Ji=4194304;function Jo(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Js(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,s=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~o;l!==0?r=Jo(l):(s&=a,s!==0&&(r=Jo(s)))}else a=n&~o,a!==0?r=Jo(a):s!==0&&(r=Jo(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,s=t&-t,o>=s||o===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Jt(t),o=1<<n,r|=e[n],t&=~o;return r}function X1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Z1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-Jt(s),l=1<<a,c=o[a];c===-1?(!(l&n)||l&r)&&(o[a]=X1(l,t)):c<=t&&(e.expiredLanes|=l),s&=~l}}function vc(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ex(){var e=Qi;return Qi<<=1,!(Qi&4194240)&&(Qi=64),e}function tl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ni(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Jt(t),e[t]=n}function ey(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Jt(n),s=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~s}}function Eu(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Jt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Ce=0;function tx(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var nx,_u,rx,ox,ix,kc=!1,Xi=[],Ln=null,Dn=null,Bn=null,hi=new Map,gi=new Map,Pn=[],ty="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rf(e,t){switch(e){case"focusin":case"focusout":Ln=null;break;case"dragenter":case"dragleave":Dn=null;break;case"mouseover":case"mouseout":Bn=null;break;case"pointerover":case"pointerout":hi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":gi.delete(t.pointerId)}}function To(e,t,n,r,o,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[o]},t!==null&&(t=Di(t),t!==null&&_u(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function ny(e,t,n,r,o){switch(t){case"focusin":return Ln=To(Ln,e,t,n,r,o),!0;case"dragenter":return Dn=To(Dn,e,t,n,r,o),!0;case"mouseover":return Bn=To(Bn,e,t,n,r,o),!0;case"pointerover":var s=o.pointerId;return hi.set(s,To(hi.get(s)||null,e,t,n,r,o)),!0;case"gotpointercapture":return s=o.pointerId,gi.set(s,To(gi.get(s)||null,e,t,n,r,o)),!0}return!1}function sx(e){var t=lr(e.target);if(t!==null){var n=Er(t);if(n!==null){if(t=n.tag,t===13){if(t=Yg(n),t!==null){e.blockedOn=t,ix(e.priority,function(){rx(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ts(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=wc(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);gc=r,n.target.dispatchEvent(r),gc=null}else return t=Di(n),t!==null&&_u(t),e.blockedOn=n,!1;t.shift()}return!0}function of(e,t,n){Ts(e)&&n.delete(t)}function ry(){kc=!1,Ln!==null&&Ts(Ln)&&(Ln=null),Dn!==null&&Ts(Dn)&&(Dn=null),Bn!==null&&Ts(Bn)&&(Bn=null),hi.forEach(of),gi.forEach(of)}function Ro(e,t){e.blockedOn===t&&(e.blockedOn=null,kc||(kc=!0,Et.unstable_scheduleCallback(Et.unstable_NormalPriority,ry)))}function xi(e){function t(o){return Ro(o,e)}if(0<Xi.length){Ro(Xi[0],e);for(var n=1;n<Xi.length;n++){var r=Xi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ln!==null&&Ro(Ln,e),Dn!==null&&Ro(Dn,e),Bn!==null&&Ro(Bn,e),hi.forEach(t),gi.forEach(t),n=0;n<Pn.length;n++)r=Pn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Pn.length&&(n=Pn[0],n.blockedOn===null);)sx(n),n.blockedOn===null&&Pn.shift()}var Xr=zn.ReactCurrentBatchConfig,Xs=!0;function oy(e,t,n,r){var o=Ce,s=Xr.transition;Xr.transition=null;try{Ce=1,Tu(e,t,n,r)}finally{Ce=o,Xr.transition=s}}function iy(e,t,n,r){var o=Ce,s=Xr.transition;Xr.transition=null;try{Ce=4,Tu(e,t,n,r)}finally{Ce=o,Xr.transition=s}}function Tu(e,t,n,r){if(Xs){var o=wc(e,t,n,r);if(o===null)dl(e,t,r,Zs,n),rf(e,r);else if(ny(o,e,t,n,r))r.stopPropagation();else if(rf(e,r),t&4&&-1<ty.indexOf(e)){for(;o!==null;){var s=Di(o);if(s!==null&&nx(s),s=wc(e,t,n,r),s===null&&dl(e,t,r,Zs,n),s===o)break;o=s}o!==null&&r.stopPropagation()}else dl(e,t,r,null,n)}}var Zs=null;function wc(e,t,n,r){if(Zs=null,e=Cu(r),e=lr(e),e!==null)if(t=Er(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Yg(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Zs=e,null}function ax(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(W1()){case zu:return 1;case Xg:return 4;case Qs:case G1:return 16;case Zg:return 536870912;default:return 16}default:return 16}}var An=null,Ru=null,Rs=null;function lx(){if(Rs)return Rs;var e,t=Ru,n=t.length,r,o="value"in An?An.value:An.textContent,s=o.length;for(e=0;e<n&&t[e]===o[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===o[s-r];r++);return Rs=o.slice(e,1<r?1-r:void 0)}function Is(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Zi(){return!0}function sf(){return!1}function Tt(e){function t(n,r,o,s,a){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Zi:sf,this.isPropagationStopped=sf,this}return Ae(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Zi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Zi)},persist:function(){},isPersistent:Zi}),t}var ko={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Iu=Tt(ko),Li=Ae({},ko,{view:0,detail:0}),sy=Tt(Li),nl,rl,Io,Ca=Ae({},Li,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$u,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Io&&(Io&&e.type==="mousemove"?(nl=e.screenX-Io.screenX,rl=e.screenY-Io.screenY):rl=nl=0,Io=e),nl)},movementY:function(e){return"movementY"in e?e.movementY:rl}}),af=Tt(Ca),ay=Ae({},Ca,{dataTransfer:0}),ly=Tt(ay),cy=Ae({},Li,{relatedTarget:0}),ol=Tt(cy),uy=Ae({},ko,{animationName:0,elapsedTime:0,pseudoElement:0}),dy=Tt(uy),fy=Ae({},ko,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),py=Tt(fy),hy=Ae({},ko,{data:0}),lf=Tt(hy),gy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},my={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function yy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=my[e])?!!t[e]:!1}function $u(){return yy}var vy=Ae({},Li,{key:function(e){if(e.key){var t=gy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Is(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$u,charCode:function(e){return e.type==="keypress"?Is(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Is(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ky=Tt(vy),wy=Ae({},Ca,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cf=Tt(wy),by=Ae({},Li,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$u}),jy=Tt(by),Sy=Ae({},ko,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cy=Tt(Sy),zy=Ae({},Ca,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ey=Tt(zy),_y=[9,13,27,32],Pu=bn&&"CompositionEvent"in window,ri=null;bn&&"documentMode"in document&&(ri=document.documentMode);var Ty=bn&&"TextEvent"in window&&!ri,cx=bn&&(!Pu||ri&&8<ri&&11>=ri),uf=" ",df=!1;function ux(e,t){switch(e){case"keyup":return _y.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function dx(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Nr=!1;function Ry(e,t){switch(e){case"compositionend":return dx(t);case"keypress":return t.which!==32?null:(df=!0,uf);case"textInput":return e=t.data,e===uf&&df?null:e;default:return null}}function Iy(e,t){if(Nr)return e==="compositionend"||!Pu&&ux(e,t)?(e=lx(),Rs=Ru=An=null,Nr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return cx&&t.locale!=="ko"?null:t.data;default:return null}}var $y={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ff(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!$y[e.type]:t==="textarea"}function fx(e,t,n,r){Vg(r),t=ea(t,"onChange"),0<t.length&&(n=new Iu("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var oi=null,mi=null;function Py(e){jx(e,0)}function za(e){var t=Br(e);if(Og(t))return e}function My(e,t){if(e==="change")return t}var px=!1;if(bn){var il;if(bn){var sl="oninput"in document;if(!sl){var pf=document.createElement("div");pf.setAttribute("oninput","return;"),sl=typeof pf.oninput=="function"}il=sl}else il=!1;px=il&&(!document.documentMode||9<document.documentMode)}function hf(){oi&&(oi.detachEvent("onpropertychange",hx),mi=oi=null)}function hx(e){if(e.propertyName==="value"&&za(mi)){var t=[];fx(t,mi,e,Cu(e)),Gg(Py,t)}}function Ay(e,t,n){e==="focusin"?(hf(),oi=t,mi=n,oi.attachEvent("onpropertychange",hx)):e==="focusout"&&hf()}function Oy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return za(mi)}function Ny(e,t){if(e==="click")return za(t)}function Ly(e,t){if(e==="input"||e==="change")return za(t)}function Dy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var en=typeof Object.is=="function"?Object.is:Dy;function yi(e,t){if(en(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!rc.call(t,o)||!en(e[o],t[o]))return!1}return!0}function gf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xf(e,t){var n=gf(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=gf(n)}}function gx(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gx(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function xx(){for(var e=window,t=Gs();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gs(e.document)}return t}function Mu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function By(e){var t=xx(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&gx(n.ownerDocument.documentElement,n)){if(r!==null&&Mu(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,s=Math.min(r.start,o);r=r.end===void 0?s:Math.min(r.end,o),!e.extend&&s>r&&(o=r,r=s,s=o),o=xf(n,s);var a=xf(n,r);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Fy=bn&&"documentMode"in document&&11>=document.documentMode,Lr=null,bc=null,ii=null,jc=!1;function mf(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jc||Lr==null||Lr!==Gs(r)||(r=Lr,"selectionStart"in r&&Mu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ii&&yi(ii,r)||(ii=r,r=ea(bc,"onSelect"),0<r.length&&(t=new Iu("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function es(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Dr={animationend:es("Animation","AnimationEnd"),animationiteration:es("Animation","AnimationIteration"),animationstart:es("Animation","AnimationStart"),transitionend:es("Transition","TransitionEnd")},al={},mx={};bn&&(mx=document.createElement("div").style,"AnimationEvent"in window||(delete Dr.animationend.animation,delete Dr.animationiteration.animation,delete Dr.animationstart.animation),"TransitionEvent"in window||delete Dr.transitionend.transition);function Ea(e){if(al[e])return al[e];if(!Dr[e])return e;var t=Dr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in mx)return al[e]=t[n];return e}var yx=Ea("animationend"),vx=Ea("animationiteration"),kx=Ea("animationstart"),wx=Ea("transitionend"),bx=new Map,yf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qn(e,t){bx.set(e,t),zr(t,[e])}for(var ll=0;ll<yf.length;ll++){var cl=yf[ll],Uy=cl.toLowerCase(),Vy=cl[0].toUpperCase()+cl.slice(1);Qn(Uy,"on"+Vy)}Qn(yx,"onAnimationEnd");Qn(vx,"onAnimationIteration");Qn(kx,"onAnimationStart");Qn("dblclick","onDoubleClick");Qn("focusin","onFocus");Qn("focusout","onBlur");Qn(wx,"onTransitionEnd");ro("onMouseEnter",["mouseout","mouseover"]);ro("onMouseLeave",["mouseout","mouseover"]);ro("onPointerEnter",["pointerout","pointerover"]);ro("onPointerLeave",["pointerout","pointerover"]);zr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));zr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));zr("onBeforeInput",["compositionend","keypress","textInput","paste"]);zr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));zr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));zr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Xo));function vf(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,U1(r,t,void 0,e),e.currentTarget=null}function jx(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==s&&o.isPropagationStopped())break e;vf(o,l,d),s=c}else for(a=0;a<r.length;a++){if(l=r[a],c=l.instance,d=l.currentTarget,l=l.listener,c!==s&&o.isPropagationStopped())break e;vf(o,l,d),s=c}}}if(Ks)throw e=yc,Ks=!1,yc=null,e}function Te(e,t){var n=t[_c];n===void 0&&(n=t[_c]=new Set);var r=e+"__bubble";n.has(r)||(Sx(t,e,2,!1),n.add(r))}function ul(e,t,n){var r=0;t&&(r|=4),Sx(n,e,r,t)}var ts="_reactListening"+Math.random().toString(36).slice(2);function vi(e){if(!e[ts]){e[ts]=!0,Ig.forEach(function(n){n!=="selectionchange"&&(qy.has(n)||ul(n,!1,e),ul(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ts]||(t[ts]=!0,ul("selectionchange",!1,t))}}function Sx(e,t,n,r){switch(ax(t)){case 1:var o=oy;break;case 4:o=iy;break;default:o=Tu}n=o.bind(null,t,n,e),o=void 0,!mc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function dl(e,t,n,r,o){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===o||c.nodeType===8&&c.parentNode===o))return;a=a.return}for(;l!==null;){if(a=lr(l),a===null)return;if(c=a.tag,c===5||c===6){r=s=a;continue e}l=l.parentNode}}r=r.return}Gg(function(){var d=s,x=Cu(n),p=[];e:{var g=bx.get(e);if(g!==void 0){var b=Iu,k=e;switch(e){case"keypress":if(Is(n)===0)break e;case"keydown":case"keyup":b=ky;break;case"focusin":k="focus",b=ol;break;case"focusout":k="blur",b=ol;break;case"beforeblur":case"afterblur":b=ol;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=af;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=ly;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=jy;break;case yx:case vx:case kx:b=dy;break;case wx:b=Cy;break;case"scroll":b=sy;break;case"wheel":b=Ey;break;case"copy":case"cut":case"paste":b=py;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=cf}var j=(t&4)!==0,C=!j&&e==="scroll",y=j?g!==null?g+"Capture":null:g;j=[];for(var h=d,m;h!==null;){m=h;var w=m.stateNode;if(m.tag===5&&w!==null&&(m=w,y!==null&&(w=pi(h,y),w!=null&&j.push(ki(h,w,m)))),C)break;h=h.return}0<j.length&&(g=new b(g,k,null,n,x),p.push({event:g,listeners:j}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",b=e==="mouseout"||e==="pointerout",g&&n!==gc&&(k=n.relatedTarget||n.fromElement)&&(lr(k)||k[jn]))break e;if((b||g)&&(g=x.window===x?x:(g=x.ownerDocument)?g.defaultView||g.parentWindow:window,b?(k=n.relatedTarget||n.toElement,b=d,k=k?lr(k):null,k!==null&&(C=Er(k),k!==C||k.tag!==5&&k.tag!==6)&&(k=null)):(b=null,k=d),b!==k)){if(j=af,w="onMouseLeave",y="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(j=cf,w="onPointerLeave",y="onPointerEnter",h="pointer"),C=b==null?g:Br(b),m=k==null?g:Br(k),g=new j(w,h+"leave",b,n,x),g.target=C,g.relatedTarget=m,w=null,lr(x)===d&&(j=new j(y,h+"enter",k,n,x),j.target=m,j.relatedTarget=C,w=j),C=w,b&&k)t:{for(j=b,y=k,h=0,m=j;m;m=Rr(m))h++;for(m=0,w=y;w;w=Rr(w))m++;for(;0<h-m;)j=Rr(j),h--;for(;0<m-h;)y=Rr(y),m--;for(;h--;){if(j===y||y!==null&&j===y.alternate)break t;j=Rr(j),y=Rr(y)}j=null}else j=null;b!==null&&kf(p,g,b,j,!1),k!==null&&C!==null&&kf(p,C,k,j,!0)}}e:{if(g=d?Br(d):window,b=g.nodeName&&g.nodeName.toLowerCase(),b==="select"||b==="input"&&g.type==="file")var S=My;else if(ff(g))if(px)S=Ly;else{S=Oy;var v=Ay}else(b=g.nodeName)&&b.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(S=Ny);if(S&&(S=S(e,d))){fx(p,S,n,x);break e}v&&v(e,g,d),e==="focusout"&&(v=g._wrapperState)&&v.controlled&&g.type==="number"&&uc(g,"number",g.value)}switch(v=d?Br(d):window,e){case"focusin":(ff(v)||v.contentEditable==="true")&&(Lr=v,bc=d,ii=null);break;case"focusout":ii=bc=Lr=null;break;case"mousedown":jc=!0;break;case"contextmenu":case"mouseup":case"dragend":jc=!1,mf(p,n,x);break;case"selectionchange":if(Fy)break;case"keydown":case"keyup":mf(p,n,x)}var _;if(Pu)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Nr?ux(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(cx&&n.locale!=="ko"&&(Nr||T!=="onCompositionStart"?T==="onCompositionEnd"&&Nr&&(_=lx()):(An=x,Ru="value"in An?An.value:An.textContent,Nr=!0)),v=ea(d,T),0<v.length&&(T=new lf(T,e,null,n,x),p.push({event:T,listeners:v}),_?T.data=_:(_=dx(n),_!==null&&(T.data=_)))),(_=Ty?Ry(e,n):Iy(e,n))&&(d=ea(d,"onBeforeInput"),0<d.length&&(x=new lf("onBeforeInput","beforeinput",null,n,x),p.push({event:x,listeners:d}),x.data=_))}jx(p,t)})}function ki(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ea(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,s=o.stateNode;o.tag===5&&s!==null&&(o=s,s=pi(e,n),s!=null&&r.unshift(ki(e,s,o)),s=pi(e,t),s!=null&&r.push(ki(e,s,o))),e=e.return}return r}function Rr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function kf(e,t,n,r,o){for(var s=t._reactName,a=[];n!==null&&n!==r;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&d!==null&&(l=d,o?(c=pi(n,s),c!=null&&a.unshift(ki(n,c,l))):o||(c=pi(n,s),c!=null&&a.push(ki(n,c,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Hy=/\r\n?/g,Wy=/\u0000|\uFFFD/g;function wf(e){return(typeof e=="string"?e:""+e).replace(Hy,`
`).replace(Wy,"")}function ns(e,t,n){if(t=wf(t),wf(e)!==t&&n)throw Error(D(425))}function ta(){}var Sc=null,Cc=null;function zc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ec=typeof setTimeout=="function"?setTimeout:void 0,Gy=typeof clearTimeout=="function"?clearTimeout:void 0,bf=typeof Promise=="function"?Promise:void 0,Yy=typeof queueMicrotask=="function"?queueMicrotask:typeof bf<"u"?function(e){return bf.resolve(null).then(e).catch(Ky)}:Ec;function Ky(e){setTimeout(function(){throw e})}function fl(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),xi(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);xi(t)}function Fn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function jf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var wo=Math.random().toString(36).slice(2),ln="__reactFiber$"+wo,wi="__reactProps$"+wo,jn="__reactContainer$"+wo,_c="__reactEvents$"+wo,Qy="__reactListeners$"+wo,Jy="__reactHandles$"+wo;function lr(e){var t=e[ln];if(t)return t;for(var n=e.parentNode;n;){if(t=n[jn]||n[ln]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=jf(e);e!==null;){if(n=e[ln])return n;e=jf(e)}return t}e=n,n=e.parentNode}return null}function Di(e){return e=e[ln]||e[jn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Br(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(D(33))}function _a(e){return e[wi]||null}var Tc=[],Fr=-1;function Jn(e){return{current:e}}function Ie(e){0>Fr||(e.current=Tc[Fr],Tc[Fr]=null,Fr--)}function Ee(e,t){Fr++,Tc[Fr]=e.current,e.current=t}var Kn={},ut=Jn(Kn),vt=Jn(!1),kr=Kn;function oo(e,t){var n=e.type.contextTypes;if(!n)return Kn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},s;for(s in n)o[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function kt(e){return e=e.childContextTypes,e!=null}function na(){Ie(vt),Ie(ut)}function Sf(e,t,n){if(ut.current!==Kn)throw Error(D(168));Ee(ut,t),Ee(vt,n)}function Cx(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(D(108,A1(e)||"Unknown",o));return Ae({},n,r)}function ra(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Kn,kr=ut.current,Ee(ut,e),Ee(vt,vt.current),!0}function Cf(e,t,n){var r=e.stateNode;if(!r)throw Error(D(169));n?(e=Cx(e,t,kr),r.__reactInternalMemoizedMergedChildContext=e,Ie(vt),Ie(ut),Ee(ut,e)):Ie(vt),Ee(vt,n)}var mn=null,Ta=!1,pl=!1;function zx(e){mn===null?mn=[e]:mn.push(e)}function Xy(e){Ta=!0,zx(e)}function Xn(){if(!pl&&mn!==null){pl=!0;var e=0,t=Ce;try{var n=mn;for(Ce=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}mn=null,Ta=!1}catch(o){throw mn!==null&&(mn=mn.slice(e+1)),Jg(zu,Xn),o}finally{Ce=t,pl=!1}}return null}var Ur=[],Vr=0,oa=null,ia=0,Pt=[],Mt=0,wr=null,yn=1,vn="";function ir(e,t){Ur[Vr++]=ia,Ur[Vr++]=oa,oa=e,ia=t}function Ex(e,t,n){Pt[Mt++]=yn,Pt[Mt++]=vn,Pt[Mt++]=wr,wr=e;var r=yn;e=vn;var o=32-Jt(r)-1;r&=~(1<<o),n+=1;var s=32-Jt(t)+o;if(30<s){var a=o-o%5;s=(r&(1<<a)-1).toString(32),r>>=a,o-=a,yn=1<<32-Jt(t)+o|n<<o|r,vn=s+e}else yn=1<<s|n<<o|r,vn=e}function Au(e){e.return!==null&&(ir(e,1),Ex(e,1,0))}function Ou(e){for(;e===oa;)oa=Ur[--Vr],Ur[Vr]=null,ia=Ur[--Vr],Ur[Vr]=null;for(;e===wr;)wr=Pt[--Mt],Pt[Mt]=null,vn=Pt[--Mt],Pt[Mt]=null,yn=Pt[--Mt],Pt[Mt]=null}var zt=null,St=null,$e=!1,Qt=null;function _x(e,t){var n=Ot(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function zf(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,zt=e,St=Fn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,zt=e,St=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=wr!==null?{id:yn,overflow:vn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ot(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,zt=e,St=null,!0):!1;default:return!1}}function Rc(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ic(e){if($e){var t=St;if(t){var n=t;if(!zf(e,t)){if(Rc(e))throw Error(D(418));t=Fn(n.nextSibling);var r=zt;t&&zf(e,t)?_x(r,n):(e.flags=e.flags&-4097|2,$e=!1,zt=e)}}else{if(Rc(e))throw Error(D(418));e.flags=e.flags&-4097|2,$e=!1,zt=e}}}function Ef(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;zt=e}function rs(e){if(e!==zt)return!1;if(!$e)return Ef(e),$e=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!zc(e.type,e.memoizedProps)),t&&(t=St)){if(Rc(e))throw Tx(),Error(D(418));for(;t;)_x(e,t),t=Fn(t.nextSibling)}if(Ef(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){St=Fn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}St=null}}else St=zt?Fn(e.stateNode.nextSibling):null;return!0}function Tx(){for(var e=St;e;)e=Fn(e.nextSibling)}function io(){St=zt=null,$e=!1}function Nu(e){Qt===null?Qt=[e]:Qt.push(e)}var Zy=zn.ReactCurrentBatchConfig;function $o(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(D(309));var r=n.stateNode}if(!r)throw Error(D(147,e));var o=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var l=o.refs;a===null?delete l[s]:l[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(D(284));if(!n._owner)throw Error(D(290,e))}return e}function os(e,t){throw e=Object.prototype.toString.call(t),Error(D(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function _f(e){var t=e._init;return t(e._payload)}function Rx(e){function t(y,h){if(e){var m=y.deletions;m===null?(y.deletions=[h],y.flags|=16):m.push(h)}}function n(y,h){if(!e)return null;for(;h!==null;)t(y,h),h=h.sibling;return null}function r(y,h){for(y=new Map;h!==null;)h.key!==null?y.set(h.key,h):y.set(h.index,h),h=h.sibling;return y}function o(y,h){return y=Hn(y,h),y.index=0,y.sibling=null,y}function s(y,h,m){return y.index=m,e?(m=y.alternate,m!==null?(m=m.index,m<h?(y.flags|=2,h):m):(y.flags|=2,h)):(y.flags|=1048576,h)}function a(y){return e&&y.alternate===null&&(y.flags|=2),y}function l(y,h,m,w){return h===null||h.tag!==6?(h=kl(m,y.mode,w),h.return=y,h):(h=o(h,m),h.return=y,h)}function c(y,h,m,w){var S=m.type;return S===Or?x(y,h,m.props.children,w,m.key):h!==null&&(h.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===In&&_f(S)===h.type)?(w=o(h,m.props),w.ref=$o(y,h,m),w.return=y,w):(w=Ls(m.type,m.key,m.props,null,y.mode,w),w.ref=$o(y,h,m),w.return=y,w)}function d(y,h,m,w){return h===null||h.tag!==4||h.stateNode.containerInfo!==m.containerInfo||h.stateNode.implementation!==m.implementation?(h=wl(m,y.mode,w),h.return=y,h):(h=o(h,m.children||[]),h.return=y,h)}function x(y,h,m,w,S){return h===null||h.tag!==7?(h=hr(m,y.mode,w,S),h.return=y,h):(h=o(h,m),h.return=y,h)}function p(y,h,m){if(typeof h=="string"&&h!==""||typeof h=="number")return h=kl(""+h,y.mode,m),h.return=y,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Gi:return m=Ls(h.type,h.key,h.props,null,y.mode,m),m.ref=$o(y,null,h),m.return=y,m;case Ar:return h=wl(h,y.mode,m),h.return=y,h;case In:var w=h._init;return p(y,w(h._payload),m)}if(Qo(h)||Eo(h))return h=hr(h,y.mode,m,null),h.return=y,h;os(y,h)}return null}function g(y,h,m,w){var S=h!==null?h.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return S!==null?null:l(y,h,""+m,w);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Gi:return m.key===S?c(y,h,m,w):null;case Ar:return m.key===S?d(y,h,m,w):null;case In:return S=m._init,g(y,h,S(m._payload),w)}if(Qo(m)||Eo(m))return S!==null?null:x(y,h,m,w,null);os(y,m)}return null}function b(y,h,m,w,S){if(typeof w=="string"&&w!==""||typeof w=="number")return y=y.get(m)||null,l(h,y,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Gi:return y=y.get(w.key===null?m:w.key)||null,c(h,y,w,S);case Ar:return y=y.get(w.key===null?m:w.key)||null,d(h,y,w,S);case In:var v=w._init;return b(y,h,m,v(w._payload),S)}if(Qo(w)||Eo(w))return y=y.get(m)||null,x(h,y,w,S,null);os(h,w)}return null}function k(y,h,m,w){for(var S=null,v=null,_=h,T=h=0,O=null;_!==null&&T<m.length;T++){_.index>T?(O=_,_=null):O=_.sibling;var N=g(y,_,m[T],w);if(N===null){_===null&&(_=O);break}e&&_&&N.alternate===null&&t(y,_),h=s(N,h,T),v===null?S=N:v.sibling=N,v=N,_=O}if(T===m.length)return n(y,_),$e&&ir(y,T),S;if(_===null){for(;T<m.length;T++)_=p(y,m[T],w),_!==null&&(h=s(_,h,T),v===null?S=_:v.sibling=_,v=_);return $e&&ir(y,T),S}for(_=r(y,_);T<m.length;T++)O=b(_,y,T,m[T],w),O!==null&&(e&&O.alternate!==null&&_.delete(O.key===null?T:O.key),h=s(O,h,T),v===null?S=O:v.sibling=O,v=O);return e&&_.forEach(function(z){return t(y,z)}),$e&&ir(y,T),S}function j(y,h,m,w){var S=Eo(m);if(typeof S!="function")throw Error(D(150));if(m=S.call(m),m==null)throw Error(D(151));for(var v=S=null,_=h,T=h=0,O=null,N=m.next();_!==null&&!N.done;T++,N=m.next()){_.index>T?(O=_,_=null):O=_.sibling;var z=g(y,_,N.value,w);if(z===null){_===null&&(_=O);break}e&&_&&z.alternate===null&&t(y,_),h=s(z,h,T),v===null?S=z:v.sibling=z,v=z,_=O}if(N.done)return n(y,_),$e&&ir(y,T),S;if(_===null){for(;!N.done;T++,N=m.next())N=p(y,N.value,w),N!==null&&(h=s(N,h,T),v===null?S=N:v.sibling=N,v=N);return $e&&ir(y,T),S}for(_=r(y,_);!N.done;T++,N=m.next())N=b(_,y,T,N.value,w),N!==null&&(e&&N.alternate!==null&&_.delete(N.key===null?T:N.key),h=s(N,h,T),v===null?S=N:v.sibling=N,v=N);return e&&_.forEach(function(A){return t(y,A)}),$e&&ir(y,T),S}function C(y,h,m,w){if(typeof m=="object"&&m!==null&&m.type===Or&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Gi:e:{for(var S=m.key,v=h;v!==null;){if(v.key===S){if(S=m.type,S===Or){if(v.tag===7){n(y,v.sibling),h=o(v,m.props.children),h.return=y,y=h;break e}}else if(v.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===In&&_f(S)===v.type){n(y,v.sibling),h=o(v,m.props),h.ref=$o(y,v,m),h.return=y,y=h;break e}n(y,v);break}else t(y,v);v=v.sibling}m.type===Or?(h=hr(m.props.children,y.mode,w,m.key),h.return=y,y=h):(w=Ls(m.type,m.key,m.props,null,y.mode,w),w.ref=$o(y,h,m),w.return=y,y=w)}return a(y);case Ar:e:{for(v=m.key;h!==null;){if(h.key===v)if(h.tag===4&&h.stateNode.containerInfo===m.containerInfo&&h.stateNode.implementation===m.implementation){n(y,h.sibling),h=o(h,m.children||[]),h.return=y,y=h;break e}else{n(y,h);break}else t(y,h);h=h.sibling}h=wl(m,y.mode,w),h.return=y,y=h}return a(y);case In:return v=m._init,C(y,h,v(m._payload),w)}if(Qo(m))return k(y,h,m,w);if(Eo(m))return j(y,h,m,w);os(y,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,h!==null&&h.tag===6?(n(y,h.sibling),h=o(h,m),h.return=y,y=h):(n(y,h),h=kl(m,y.mode,w),h.return=y,y=h),a(y)):n(y,h)}return C}var so=Rx(!0),Ix=Rx(!1),sa=Jn(null),aa=null,qr=null,Lu=null;function Du(){Lu=qr=aa=null}function Bu(e){var t=sa.current;Ie(sa),e._currentValue=t}function $c(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Zr(e,t){aa=e,Lu=qr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(mt=!0),e.firstContext=null)}function Lt(e){var t=e._currentValue;if(Lu!==e)if(e={context:e,memoizedValue:t,next:null},qr===null){if(aa===null)throw Error(D(308));qr=e,aa.dependencies={lanes:0,firstContext:e}}else qr=qr.next=e;return t}var cr=null;function Fu(e){cr===null?cr=[e]:cr.push(e)}function $x(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Fu(t)):(n.next=o.next,o.next=n),t.interleaved=n,Sn(e,r)}function Sn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var $n=!1;function Uu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Px(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function wn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Un(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,be&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Sn(e,n)}return o=r.interleaved,o===null?(t.next=t,Fu(r)):(t.next=o.next,o.next=t),r.interleaved=t,Sn(e,n)}function $s(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Eu(e,n)}}function Tf(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?o=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?o=s=t:s=s.next=t}else o=s=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function la(e,t,n,r){var o=e.updateQueue;$n=!1;var s=o.firstBaseUpdate,a=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var c=l,d=c.next;c.next=null,a===null?s=d:a.next=d,a=c;var x=e.alternate;x!==null&&(x=x.updateQueue,l=x.lastBaseUpdate,l!==a&&(l===null?x.firstBaseUpdate=d:l.next=d,x.lastBaseUpdate=c))}if(s!==null){var p=o.baseState;a=0,x=d=c=null,l=s;do{var g=l.lane,b=l.eventTime;if((r&g)===g){x!==null&&(x=x.next={eventTime:b,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var k=e,j=l;switch(g=t,b=n,j.tag){case 1:if(k=j.payload,typeof k=="function"){p=k.call(b,p,g);break e}p=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=j.payload,g=typeof k=="function"?k.call(b,p,g):k,g==null)break e;p=Ae({},p,g);break e;case 2:$n=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[l]:g.push(l))}else b={eventTime:b,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},x===null?(d=x=b,c=p):x=x.next=b,a|=g;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;g=l,l=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(x===null&&(c=p),o.baseState=c,o.firstBaseUpdate=d,o.lastBaseUpdate=x,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else s===null&&(o.shared.lanes=0);jr|=a,e.lanes=a,e.memoizedState=p}}function Rf(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(D(191,o));o.call(r)}}}var Bi={},un=Jn(Bi),bi=Jn(Bi),ji=Jn(Bi);function ur(e){if(e===Bi)throw Error(D(174));return e}function Vu(e,t){switch(Ee(ji,t),Ee(bi,e),Ee(un,Bi),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:fc(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=fc(t,e)}Ie(un),Ee(un,t)}function ao(){Ie(un),Ie(bi),Ie(ji)}function Mx(e){ur(ji.current);var t=ur(un.current),n=fc(t,e.type);t!==n&&(Ee(bi,e),Ee(un,n))}function qu(e){bi.current===e&&(Ie(un),Ie(bi))}var Pe=Jn(0);function ca(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var hl=[];function Hu(){for(var e=0;e<hl.length;e++)hl[e]._workInProgressVersionPrimary=null;hl.length=0}var Ps=zn.ReactCurrentDispatcher,gl=zn.ReactCurrentBatchConfig,br=0,Me=null,He=null,Ye=null,ua=!1,si=!1,Si=0,ev=0;function ot(){throw Error(D(321))}function Wu(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!en(e[n],t[n]))return!1;return!0}function Gu(e,t,n,r,o,s){if(br=s,Me=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ps.current=e===null||e.memoizedState===null?ov:iv,e=n(r,o),si){s=0;do{if(si=!1,Si=0,25<=s)throw Error(D(301));s+=1,Ye=He=null,t.updateQueue=null,Ps.current=sv,e=n(r,o)}while(si)}if(Ps.current=da,t=He!==null&&He.next!==null,br=0,Ye=He=Me=null,ua=!1,t)throw Error(D(300));return e}function Yu(){var e=Si!==0;return Si=0,e}function sn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?Me.memoizedState=Ye=e:Ye=Ye.next=e,Ye}function Dt(){if(He===null){var e=Me.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var t=Ye===null?Me.memoizedState:Ye.next;if(t!==null)Ye=t,He=e;else{if(e===null)throw Error(D(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},Ye===null?Me.memoizedState=Ye=e:Ye=Ye.next=e}return Ye}function Ci(e,t){return typeof t=="function"?t(e):t}function xl(e){var t=Dt(),n=t.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=e;var r=He,o=r.baseQueue,s=n.pending;if(s!==null){if(o!==null){var a=o.next;o.next=s.next,s.next=a}r.baseQueue=o=s,n.pending=null}if(o!==null){s=o.next,r=r.baseState;var l=a=null,c=null,d=s;do{var x=d.lane;if((br&x)===x)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var p={lane:x,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=p,a=r):c=c.next=p,Me.lanes|=x,jr|=x}d=d.next}while(d!==null&&d!==s);c===null?a=r:c.next=l,en(r,t.memoizedState)||(mt=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do s=o.lane,Me.lanes|=s,jr|=s,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ml(e){var t=Dt(),n=t.queue;if(n===null)throw Error(D(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,s=t.memoizedState;if(o!==null){n.pending=null;var a=o=o.next;do s=e(s,a.action),a=a.next;while(a!==o);en(s,t.memoizedState)||(mt=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Ax(){}function Ox(e,t){var n=Me,r=Dt(),o=t(),s=!en(r.memoizedState,o);if(s&&(r.memoizedState=o,mt=!0),r=r.queue,Ku(Dx.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||Ye!==null&&Ye.memoizedState.tag&1){if(n.flags|=2048,zi(9,Lx.bind(null,n,r,o,t),void 0,null),Qe===null)throw Error(D(349));br&30||Nx(n,t,o)}return o}function Nx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Me.updateQueue,t===null?(t={lastEffect:null,stores:null},Me.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Lx(e,t,n,r){t.value=n,t.getSnapshot=r,Bx(t)&&Fx(e)}function Dx(e,t,n){return n(function(){Bx(t)&&Fx(e)})}function Bx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!en(e,n)}catch{return!0}}function Fx(e){var t=Sn(e,1);t!==null&&Xt(t,e,1,-1)}function If(e){var t=sn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ci,lastRenderedState:e},t.queue=e,e=e.dispatch=rv.bind(null,Me,e),[t.memoizedState,e]}function zi(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Me.updateQueue,t===null?(t={lastEffect:null,stores:null},Me.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ux(){return Dt().memoizedState}function Ms(e,t,n,r){var o=sn();Me.flags|=e,o.memoizedState=zi(1|t,n,void 0,r===void 0?null:r)}function Ra(e,t,n,r){var o=Dt();r=r===void 0?null:r;var s=void 0;if(He!==null){var a=He.memoizedState;if(s=a.destroy,r!==null&&Wu(r,a.deps)){o.memoizedState=zi(t,n,s,r);return}}Me.flags|=e,o.memoizedState=zi(1|t,n,s,r)}function $f(e,t){return Ms(8390656,8,e,t)}function Ku(e,t){return Ra(2048,8,e,t)}function Vx(e,t){return Ra(4,2,e,t)}function qx(e,t){return Ra(4,4,e,t)}function Hx(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Wx(e,t,n){return n=n!=null?n.concat([e]):null,Ra(4,4,Hx.bind(null,t,e),n)}function Qu(){}function Gx(e,t){var n=Dt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Wu(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Yx(e,t){var n=Dt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Wu(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Kx(e,t,n){return br&21?(en(n,t)||(n=ex(),Me.lanes|=n,jr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,mt=!0),e.memoizedState=n)}function tv(e,t){var n=Ce;Ce=n!==0&&4>n?n:4,e(!0);var r=gl.transition;gl.transition={};try{e(!1),t()}finally{Ce=n,gl.transition=r}}function Qx(){return Dt().memoizedState}function nv(e,t,n){var r=qn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Jx(e))Xx(t,n);else if(n=$x(e,t,n,r),n!==null){var o=pt();Xt(n,e,r,o),Zx(n,t,r)}}function rv(e,t,n){var r=qn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Jx(e))Xx(t,o);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,l=s(a,n);if(o.hasEagerState=!0,o.eagerState=l,en(l,a)){var c=t.interleaved;c===null?(o.next=o,Fu(t)):(o.next=c.next,c.next=o),t.interleaved=o;return}}catch{}finally{}n=$x(e,t,o,r),n!==null&&(o=pt(),Xt(n,e,r,o),Zx(n,t,r))}}function Jx(e){var t=e.alternate;return e===Me||t!==null&&t===Me}function Xx(e,t){si=ua=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Zx(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Eu(e,n)}}var da={readContext:Lt,useCallback:ot,useContext:ot,useEffect:ot,useImperativeHandle:ot,useInsertionEffect:ot,useLayoutEffect:ot,useMemo:ot,useReducer:ot,useRef:ot,useState:ot,useDebugValue:ot,useDeferredValue:ot,useTransition:ot,useMutableSource:ot,useSyncExternalStore:ot,useId:ot,unstable_isNewReconciler:!1},ov={readContext:Lt,useCallback:function(e,t){return sn().memoizedState=[e,t===void 0?null:t],e},useContext:Lt,useEffect:$f,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ms(4194308,4,Hx.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ms(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ms(4,2,e,t)},useMemo:function(e,t){var n=sn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=sn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=nv.bind(null,Me,e),[r.memoizedState,e]},useRef:function(e){var t=sn();return e={current:e},t.memoizedState=e},useState:If,useDebugValue:Qu,useDeferredValue:function(e){return sn().memoizedState=e},useTransition:function(){var e=If(!1),t=e[0];return e=tv.bind(null,e[1]),sn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Me,o=sn();if($e){if(n===void 0)throw Error(D(407));n=n()}else{if(n=t(),Qe===null)throw Error(D(349));br&30||Nx(r,t,n)}o.memoizedState=n;var s={value:n,getSnapshot:t};return o.queue=s,$f(Dx.bind(null,r,s,e),[e]),r.flags|=2048,zi(9,Lx.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=sn(),t=Qe.identifierPrefix;if($e){var n=vn,r=yn;n=(r&~(1<<32-Jt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Si++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ev++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},iv={readContext:Lt,useCallback:Gx,useContext:Lt,useEffect:Ku,useImperativeHandle:Wx,useInsertionEffect:Vx,useLayoutEffect:qx,useMemo:Yx,useReducer:xl,useRef:Ux,useState:function(){return xl(Ci)},useDebugValue:Qu,useDeferredValue:function(e){var t=Dt();return Kx(t,He.memoizedState,e)},useTransition:function(){var e=xl(Ci)[0],t=Dt().memoizedState;return[e,t]},useMutableSource:Ax,useSyncExternalStore:Ox,useId:Qx,unstable_isNewReconciler:!1},sv={readContext:Lt,useCallback:Gx,useContext:Lt,useEffect:Ku,useImperativeHandle:Wx,useInsertionEffect:Vx,useLayoutEffect:qx,useMemo:Yx,useReducer:ml,useRef:Ux,useState:function(){return ml(Ci)},useDebugValue:Qu,useDeferredValue:function(e){var t=Dt();return He===null?t.memoizedState=e:Kx(t,He.memoizedState,e)},useTransition:function(){var e=ml(Ci)[0],t=Dt().memoizedState;return[e,t]},useMutableSource:Ax,useSyncExternalStore:Ox,useId:Qx,unstable_isNewReconciler:!1};function Gt(e,t){if(e&&e.defaultProps){t=Ae({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Pc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Ae({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ia={isMounted:function(e){return(e=e._reactInternals)?Er(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pt(),o=qn(e),s=wn(r,o);s.payload=t,n!=null&&(s.callback=n),t=Un(e,s,o),t!==null&&(Xt(t,e,o,r),$s(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pt(),o=qn(e),s=wn(r,o);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Un(e,s,o),t!==null&&(Xt(t,e,o,r),$s(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pt(),r=qn(e),o=wn(n,r);o.tag=2,t!=null&&(o.callback=t),t=Un(e,o,r),t!==null&&(Xt(t,e,r,n),$s(t,e,r))}};function Pf(e,t,n,r,o,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,a):t.prototype&&t.prototype.isPureReactComponent?!yi(n,r)||!yi(o,s):!0}function em(e,t,n){var r=!1,o=Kn,s=t.contextType;return typeof s=="object"&&s!==null?s=Lt(s):(o=kt(t)?kr:ut.current,r=t.contextTypes,s=(r=r!=null)?oo(e,o):Kn),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ia,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=s),t}function Mf(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ia.enqueueReplaceState(t,t.state,null)}function Mc(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Uu(e);var s=t.contextType;typeof s=="object"&&s!==null?o.context=Lt(s):(s=kt(t)?kr:ut.current,o.context=oo(e,s)),o.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Pc(e,t,s,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Ia.enqueueReplaceState(o,o.state,null),la(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function lo(e,t){try{var n="",r=t;do n+=M1(r),r=r.return;while(r);var o=n}catch(s){o=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:o,digest:null}}function yl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ac(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var av=typeof WeakMap=="function"?WeakMap:Map;function tm(e,t,n){n=wn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){pa||(pa=!0,Hc=r),Ac(e,t)},n}function nm(e,t,n){n=wn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Ac(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Ac(e,t),typeof r!="function"&&(Vn===null?Vn=new Set([this]):Vn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Af(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new av;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=wv.bind(null,e,t,n),t.then(e,e))}function Of(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Nf(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=wn(-1,1),t.tag=2,Un(n,t,1))),n.lanes|=1),e)}var lv=zn.ReactCurrentOwner,mt=!1;function ft(e,t,n,r){t.child=e===null?Ix(t,null,n,r):so(t,e.child,n,r)}function Lf(e,t,n,r,o){n=n.render;var s=t.ref;return Zr(t,o),r=Gu(e,t,n,r,s,o),n=Yu(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Cn(e,t,o)):($e&&n&&Au(t),t.flags|=1,ft(e,t,r,o),t.child)}function Df(e,t,n,r,o){if(e===null){var s=n.type;return typeof s=="function"&&!od(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,rm(e,t,s,r,o)):(e=Ls(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&o)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:yi,n(a,r)&&e.ref===t.ref)return Cn(e,t,o)}return t.flags|=1,e=Hn(s,r),e.ref=t.ref,e.return=t,t.child=e}function rm(e,t,n,r,o){if(e!==null){var s=e.memoizedProps;if(yi(s,r)&&e.ref===t.ref)if(mt=!1,t.pendingProps=r=s,(e.lanes&o)!==0)e.flags&131072&&(mt=!0);else return t.lanes=e.lanes,Cn(e,t,o)}return Oc(e,t,n,r,o)}function om(e,t,n){var r=t.pendingProps,o=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ee(Wr,jt),jt|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ee(Wr,jt),jt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,Ee(Wr,jt),jt|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,Ee(Wr,jt),jt|=r;return ft(e,t,o,n),t.child}function im(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Oc(e,t,n,r,o){var s=kt(n)?kr:ut.current;return s=oo(t,s),Zr(t,o),n=Gu(e,t,n,r,s,o),r=Yu(),e!==null&&!mt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Cn(e,t,o)):($e&&r&&Au(t),t.flags|=1,ft(e,t,n,o),t.child)}function Bf(e,t,n,r,o){if(kt(n)){var s=!0;ra(t)}else s=!1;if(Zr(t,o),t.stateNode===null)As(e,t),em(t,n,r),Mc(t,n,r,o),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var c=a.context,d=n.contextType;typeof d=="object"&&d!==null?d=Lt(d):(d=kt(n)?kr:ut.current,d=oo(t,d));var x=n.getDerivedStateFromProps,p=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||c!==d)&&Mf(t,a,r,d),$n=!1;var g=t.memoizedState;a.state=g,la(t,r,a,o),c=t.memoizedState,l!==r||g!==c||vt.current||$n?(typeof x=="function"&&(Pc(t,n,x,r),c=t.memoizedState),(l=$n||Pf(t,n,l,r,g,c,d))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=d,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Px(e,t),l=t.memoizedProps,d=t.type===t.elementType?l:Gt(t.type,l),a.props=d,p=t.pendingProps,g=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Lt(c):(c=kt(n)?kr:ut.current,c=oo(t,c));var b=n.getDerivedStateFromProps;(x=typeof b=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==p||g!==c)&&Mf(t,a,r,c),$n=!1,g=t.memoizedState,a.state=g,la(t,r,a,o);var k=t.memoizedState;l!==p||g!==k||vt.current||$n?(typeof b=="function"&&(Pc(t,n,b,r),k=t.memoizedState),(d=$n||Pf(t,n,d,r,g,k,c)||!1)?(x||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,k,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,k,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=k),a.props=r,a.state=k,a.context=c,r=d):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Nc(e,t,n,r,s,o)}function Nc(e,t,n,r,o,s){im(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return o&&Cf(t,n,!1),Cn(e,t,s);r=t.stateNode,lv.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=so(t,e.child,null,s),t.child=so(t,null,l,s)):ft(e,t,l,s),t.memoizedState=r.state,o&&Cf(t,n,!0),t.child}function sm(e){var t=e.stateNode;t.pendingContext?Sf(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Sf(e,t.context,!1),Vu(e,t.containerInfo)}function Ff(e,t,n,r,o){return io(),Nu(o),t.flags|=256,ft(e,t,n,r),t.child}var Lc={dehydrated:null,treeContext:null,retryLane:0};function Dc(e){return{baseLanes:e,cachePool:null,transitions:null}}function am(e,t,n){var r=t.pendingProps,o=Pe.current,s=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Ee(Pe,o&1),e===null)return Ic(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,s?(r=t.mode,s=t.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Ma(a,r,0,null),e=hr(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Dc(n),t.memoizedState=Lc,e):Ju(t,a));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return cv(e,t,a,r,l,o,n);if(s){s=r.fallback,a=t.mode,o=e.child,l=o.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Hn(o,c),r.subtreeFlags=o.subtreeFlags&14680064),l!==null?s=Hn(l,s):(s=hr(s,a,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,a=e.child.memoizedState,a=a===null?Dc(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~n,t.memoizedState=Lc,r}return s=e.child,e=s.sibling,r=Hn(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ju(e,t){return t=Ma({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function is(e,t,n,r){return r!==null&&Nu(r),so(t,e.child,null,n),e=Ju(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cv(e,t,n,r,o,s,a){if(n)return t.flags&256?(t.flags&=-257,r=yl(Error(D(422))),is(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,o=t.mode,r=Ma({mode:"visible",children:r.children},o,0,null),s=hr(s,o,a,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&so(t,e.child,null,a),t.child.memoizedState=Dc(a),t.memoizedState=Lc,s);if(!(t.mode&1))return is(e,t,a,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(D(419)),r=yl(s,r,void 0),is(e,t,a,r)}if(l=(a&e.childLanes)!==0,mt||l){if(r=Qe,r!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|a)?0:o,o!==0&&o!==s.retryLane&&(s.retryLane=o,Sn(e,o),Xt(r,e,o,-1))}return rd(),r=yl(Error(D(421))),is(e,t,a,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=bv.bind(null,e),o._reactRetry=t,null):(e=s.treeContext,St=Fn(o.nextSibling),zt=t,$e=!0,Qt=null,e!==null&&(Pt[Mt++]=yn,Pt[Mt++]=vn,Pt[Mt++]=wr,yn=e.id,vn=e.overflow,wr=t),t=Ju(t,r.children),t.flags|=4096,t)}function Uf(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),$c(e.return,t,n)}function vl(e,t,n,r,o){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=o)}function lm(e,t,n){var r=t.pendingProps,o=r.revealOrder,s=r.tail;if(ft(e,t,r.children,n),r=Pe.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Uf(e,n,t);else if(e.tag===19)Uf(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ee(Pe,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&ca(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),vl(t,!1,o,n,s);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ca(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}vl(t,!0,n,null,s);break;case"together":vl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function As(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Cn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),jr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(D(153));if(t.child!==null){for(e=t.child,n=Hn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Hn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function uv(e,t,n){switch(t.tag){case 3:sm(t),io();break;case 5:Mx(t);break;case 1:kt(t.type)&&ra(t);break;case 4:Vu(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Ee(sa,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ee(Pe,Pe.current&1),t.flags|=128,null):n&t.child.childLanes?am(e,t,n):(Ee(Pe,Pe.current&1),e=Cn(e,t,n),e!==null?e.sibling:null);Ee(Pe,Pe.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return lm(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Ee(Pe,Pe.current),r)break;return null;case 22:case 23:return t.lanes=0,om(e,t,n)}return Cn(e,t,n)}var cm,Bc,um,dm;cm=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Bc=function(){};um=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,ur(un.current);var s=null;switch(n){case"input":o=lc(e,o),r=lc(e,r),s=[];break;case"select":o=Ae({},o,{value:void 0}),r=Ae({},r,{value:void 0}),s=[];break;case"textarea":o=dc(e,o),r=dc(e,r),s=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ta)}pc(n,r);var a;n=null;for(d in o)if(!r.hasOwnProperty(d)&&o.hasOwnProperty(d)&&o[d]!=null)if(d==="style"){var l=o[d];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(di.hasOwnProperty(d)?s||(s=[]):(s=s||[]).push(d,null));for(d in r){var c=r[d];if(l=o!=null?o[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(s||(s=[]),s.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(s=s||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(s=s||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(di.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&Te("scroll",e),s||l===c||(s=[])):(s=s||[]).push(d,c))}n&&(s=s||[]).push("style",n);var d=s;(t.updateQueue=d)&&(t.flags|=4)}};dm=function(e,t,n,r){n!==r&&(t.flags|=4)};function Po(e,t){if(!$e)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function it(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function dv(e,t,n){var r=t.pendingProps;switch(Ou(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return it(t),null;case 1:return kt(t.type)&&na(),it(t),null;case 3:return r=t.stateNode,ao(),Ie(vt),Ie(ut),Hu(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(rs(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qt!==null&&(Yc(Qt),Qt=null))),Bc(e,t),it(t),null;case 5:qu(t);var o=ur(ji.current);if(n=t.type,e!==null&&t.stateNode!=null)um(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(D(166));return it(t),null}if(e=ur(un.current),rs(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[ln]=t,r[wi]=s,e=(t.mode&1)!==0,n){case"dialog":Te("cancel",r),Te("close",r);break;case"iframe":case"object":case"embed":Te("load",r);break;case"video":case"audio":for(o=0;o<Xo.length;o++)Te(Xo[o],r);break;case"source":Te("error",r);break;case"img":case"image":case"link":Te("error",r),Te("load",r);break;case"details":Te("toggle",r);break;case"input":Qd(r,s),Te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Te("invalid",r);break;case"textarea":Xd(r,s),Te("invalid",r)}pc(n,s),o=null;for(var a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&ns(r.textContent,l,e),o=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&ns(r.textContent,l,e),o=["children",""+l]):di.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&Te("scroll",r)}switch(n){case"input":Yi(r),Jd(r,s,!0);break;case"textarea":Yi(r),Zd(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=ta)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Dg(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[ln]=t,e[wi]=r,cm(e,t,!1,!1),t.stateNode=e;e:{switch(a=hc(n,r),n){case"dialog":Te("cancel",e),Te("close",e),o=r;break;case"iframe":case"object":case"embed":Te("load",e),o=r;break;case"video":case"audio":for(o=0;o<Xo.length;o++)Te(Xo[o],e);o=r;break;case"source":Te("error",e),o=r;break;case"img":case"image":case"link":Te("error",e),Te("load",e),o=r;break;case"details":Te("toggle",e),o=r;break;case"input":Qd(e,r),o=lc(e,r),Te("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Ae({},r,{value:void 0}),Te("invalid",e);break;case"textarea":Xd(e,r),o=dc(e,r),Te("invalid",e);break;default:o=r}pc(n,o),l=o;for(s in l)if(l.hasOwnProperty(s)){var c=l[s];s==="style"?Ug(e,c):s==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Bg(e,c)):s==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&fi(e,c):typeof c=="number"&&fi(e,""+c):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(di.hasOwnProperty(s)?c!=null&&s==="onScroll"&&Te("scroll",e):c!=null&&wu(e,s,c,a))}switch(n){case"input":Yi(e),Jd(e,r,!1);break;case"textarea":Yi(e),Zd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Yn(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Kr(e,!!r.multiple,s,!1):r.defaultValue!=null&&Kr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=ta)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return it(t),null;case 6:if(e&&t.stateNode!=null)dm(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(D(166));if(n=ur(ji.current),ur(un.current),rs(t)){if(r=t.stateNode,n=t.memoizedProps,r[ln]=t,(s=r.nodeValue!==n)&&(e=zt,e!==null))switch(e.tag){case 3:ns(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ns(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ln]=t,t.stateNode=r}return it(t),null;case 13:if(Ie(Pe),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if($e&&St!==null&&t.mode&1&&!(t.flags&128))Tx(),io(),t.flags|=98560,s=!1;else if(s=rs(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(D(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(D(317));s[ln]=t}else io(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;it(t),s=!1}else Qt!==null&&(Yc(Qt),Qt=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Pe.current&1?We===0&&(We=3):rd())),t.updateQueue!==null&&(t.flags|=4),it(t),null);case 4:return ao(),Bc(e,t),e===null&&vi(t.stateNode.containerInfo),it(t),null;case 10:return Bu(t.type._context),it(t),null;case 17:return kt(t.type)&&na(),it(t),null;case 19:if(Ie(Pe),s=t.memoizedState,s===null)return it(t),null;if(r=(t.flags&128)!==0,a=s.rendering,a===null)if(r)Po(s,!1);else{if(We!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=ca(e),a!==null){for(t.flags|=128,Po(s,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ee(Pe,Pe.current&1|2),t.child}e=e.sibling}s.tail!==null&&De()>co&&(t.flags|=128,r=!0,Po(s,!1),t.lanes=4194304)}else{if(!r)if(e=ca(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Po(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!$e)return it(t),null}else 2*De()-s.renderingStartTime>co&&n!==1073741824&&(t.flags|=128,r=!0,Po(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(n=s.last,n!==null?n.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=De(),t.sibling=null,n=Pe.current,Ee(Pe,r?n&1|2:n&1),t):(it(t),null);case 22:case 23:return nd(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?jt&1073741824&&(it(t),t.subtreeFlags&6&&(t.flags|=8192)):it(t),null;case 24:return null;case 25:return null}throw Error(D(156,t.tag))}function fv(e,t){switch(Ou(t),t.tag){case 1:return kt(t.type)&&na(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ao(),Ie(vt),Ie(ut),Hu(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return qu(t),null;case 13:if(Ie(Pe),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(D(340));io()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ie(Pe),null;case 4:return ao(),null;case 10:return Bu(t.type._context),null;case 22:case 23:return nd(),null;case 24:return null;default:return null}}var ss=!1,ct=!1,pv=typeof WeakSet=="function"?WeakSet:Set,ee=null;function Hr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Oe(e,t,r)}else n.current=null}function Fc(e,t,n){try{n()}catch(r){Oe(e,t,r)}}var Vf=!1;function hv(e,t){if(Sc=Xs,e=xx(),Mu(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,l=-1,c=-1,d=0,x=0,p=e,g=null;t:for(;;){for(var b;p!==n||o!==0&&p.nodeType!==3||(l=a+o),p!==s||r!==0&&p.nodeType!==3||(c=a+r),p.nodeType===3&&(a+=p.nodeValue.length),(b=p.firstChild)!==null;)g=p,p=b;for(;;){if(p===e)break t;if(g===n&&++d===o&&(l=a),g===s&&++x===r&&(c=a),(b=p.nextSibling)!==null)break;p=g,g=p.parentNode}p=b}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Cc={focusedElem:e,selectionRange:n},Xs=!1,ee=t;ee!==null;)if(t=ee,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ee=e;else for(;ee!==null;){t=ee;try{var k=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var j=k.memoizedProps,C=k.memoizedState,y=t.stateNode,h=y.getSnapshotBeforeUpdate(t.elementType===t.type?j:Gt(t.type,j),C);y.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(D(163))}}catch(w){Oe(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,ee=e;break}ee=t.return}return k=Vf,Vf=!1,k}function ai(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var s=o.destroy;o.destroy=void 0,s!==void 0&&Fc(t,n,s)}o=o.next}while(o!==r)}}function $a(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Uc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function fm(e){var t=e.alternate;t!==null&&(e.alternate=null,fm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ln],delete t[wi],delete t[_c],delete t[Qy],delete t[Jy])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function pm(e){return e.tag===5||e.tag===3||e.tag===4}function qf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||pm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ta));else if(r!==4&&(e=e.child,e!==null))for(Vc(e,t,n),e=e.sibling;e!==null;)Vc(e,t,n),e=e.sibling}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}var tt=null,Yt=!1;function _n(e,t,n){for(n=n.child;n!==null;)hm(e,t,n),n=n.sibling}function hm(e,t,n){if(cn&&typeof cn.onCommitFiberUnmount=="function")try{cn.onCommitFiberUnmount(Sa,n)}catch{}switch(n.tag){case 5:ct||Hr(n,t);case 6:var r=tt,o=Yt;tt=null,_n(e,t,n),tt=r,Yt=o,tt!==null&&(Yt?(e=tt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):tt.removeChild(n.stateNode));break;case 18:tt!==null&&(Yt?(e=tt,n=n.stateNode,e.nodeType===8?fl(e.parentNode,n):e.nodeType===1&&fl(e,n),xi(e)):fl(tt,n.stateNode));break;case 4:r=tt,o=Yt,tt=n.stateNode.containerInfo,Yt=!0,_n(e,t,n),tt=r,Yt=o;break;case 0:case 11:case 14:case 15:if(!ct&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var s=o,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Fc(n,t,a),o=o.next}while(o!==r)}_n(e,t,n);break;case 1:if(!ct&&(Hr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Oe(n,t,l)}_n(e,t,n);break;case 21:_n(e,t,n);break;case 22:n.mode&1?(ct=(r=ct)||n.memoizedState!==null,_n(e,t,n),ct=r):_n(e,t,n);break;default:_n(e,t,n)}}function Hf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new pv),t.forEach(function(r){var o=jv.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Wt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var s=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:tt=l.stateNode,Yt=!1;break e;case 3:tt=l.stateNode.containerInfo,Yt=!0;break e;case 4:tt=l.stateNode.containerInfo,Yt=!0;break e}l=l.return}if(tt===null)throw Error(D(160));hm(s,a,o),tt=null,Yt=!1;var c=o.alternate;c!==null&&(c.return=null),o.return=null}catch(d){Oe(o,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)gm(t,e),t=t.sibling}function gm(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Wt(t,e),nn(e),r&4){try{ai(3,e,e.return),$a(3,e)}catch(j){Oe(e,e.return,j)}try{ai(5,e,e.return)}catch(j){Oe(e,e.return,j)}}break;case 1:Wt(t,e),nn(e),r&512&&n!==null&&Hr(n,n.return);break;case 5:if(Wt(t,e),nn(e),r&512&&n!==null&&Hr(n,n.return),e.flags&32){var o=e.stateNode;try{fi(o,"")}catch(j){Oe(e,e.return,j)}}if(r&4&&(o=e.stateNode,o!=null)){var s=e.memoizedProps,a=n!==null?n.memoizedProps:s,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Ng(o,s),hc(l,a);var d=hc(l,s);for(a=0;a<c.length;a+=2){var x=c[a],p=c[a+1];x==="style"?Ug(o,p):x==="dangerouslySetInnerHTML"?Bg(o,p):x==="children"?fi(o,p):wu(o,x,p,d)}switch(l){case"input":cc(o,s);break;case"textarea":Lg(o,s);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!s.multiple;var b=s.value;b!=null?Kr(o,!!s.multiple,b,!1):g!==!!s.multiple&&(s.defaultValue!=null?Kr(o,!!s.multiple,s.defaultValue,!0):Kr(o,!!s.multiple,s.multiple?[]:"",!1))}o[wi]=s}catch(j){Oe(e,e.return,j)}}break;case 6:if(Wt(t,e),nn(e),r&4){if(e.stateNode===null)throw Error(D(162));o=e.stateNode,s=e.memoizedProps;try{o.nodeValue=s}catch(j){Oe(e,e.return,j)}}break;case 3:if(Wt(t,e),nn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{xi(t.containerInfo)}catch(j){Oe(e,e.return,j)}break;case 4:Wt(t,e),nn(e);break;case 13:Wt(t,e),nn(e),o=e.child,o.flags&8192&&(s=o.memoizedState!==null,o.stateNode.isHidden=s,!s||o.alternate!==null&&o.alternate.memoizedState!==null||(ed=De())),r&4&&Hf(e);break;case 22:if(x=n!==null&&n.memoizedState!==null,e.mode&1?(ct=(d=ct)||x,Wt(t,e),ct=d):Wt(t,e),nn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!x&&e.mode&1)for(ee=e,x=e.child;x!==null;){for(p=ee=x;ee!==null;){switch(g=ee,b=g.child,g.tag){case 0:case 11:case 14:case 15:ai(4,g,g.return);break;case 1:Hr(g,g.return);var k=g.stateNode;if(typeof k.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(j){Oe(r,n,j)}}break;case 5:Hr(g,g.return);break;case 22:if(g.memoizedState!==null){Gf(p);continue}}b!==null?(b.return=g,ee=b):Gf(p)}x=x.sibling}e:for(x=null,p=e;;){if(p.tag===5){if(x===null){x=p;try{o=p.stateNode,d?(s=o.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=p.stateNode,c=p.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Fg("display",a))}catch(j){Oe(e,e.return,j)}}}else if(p.tag===6){if(x===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(j){Oe(e,e.return,j)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;x===p&&(x=null),p=p.return}x===p&&(x=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Wt(t,e),nn(e),r&4&&Hf(e);break;case 21:break;default:Wt(t,e),nn(e)}}function nn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(pm(n)){var r=n;break e}n=n.return}throw Error(D(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(fi(o,""),r.flags&=-33);var s=qf(e);qc(e,s,o);break;case 3:case 4:var a=r.stateNode.containerInfo,l=qf(e);Vc(e,l,a);break;default:throw Error(D(161))}}catch(c){Oe(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gv(e,t,n){ee=e,xm(e)}function xm(e,t,n){for(var r=(e.mode&1)!==0;ee!==null;){var o=ee,s=o.child;if(o.tag===22&&r){var a=o.memoizedState!==null||ss;if(!a){var l=o.alternate,c=l!==null&&l.memoizedState!==null||ct;l=ss;var d=ct;if(ss=a,(ct=c)&&!d)for(ee=o;ee!==null;)a=ee,c=a.child,a.tag===22&&a.memoizedState!==null?Yf(o):c!==null?(c.return=a,ee=c):Yf(o);for(;s!==null;)ee=s,xm(s),s=s.sibling;ee=o,ss=l,ct=d}Wf(e)}else o.subtreeFlags&8772&&s!==null?(s.return=o,ee=s):Wf(e)}}function Wf(e){for(;ee!==null;){var t=ee;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ct||$a(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ct)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Gt(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Rf(t,s,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Rf(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var x=d.memoizedState;if(x!==null){var p=x.dehydrated;p!==null&&xi(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(D(163))}ct||t.flags&512&&Uc(t)}catch(g){Oe(t,t.return,g)}}if(t===e){ee=null;break}if(n=t.sibling,n!==null){n.return=t.return,ee=n;break}ee=t.return}}function Gf(e){for(;ee!==null;){var t=ee;if(t===e){ee=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ee=n;break}ee=t.return}}function Yf(e){for(;ee!==null;){var t=ee;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{$a(4,t)}catch(c){Oe(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(c){Oe(t,o,c)}}var s=t.return;try{Uc(t)}catch(c){Oe(t,s,c)}break;case 5:var a=t.return;try{Uc(t)}catch(c){Oe(t,a,c)}}}catch(c){Oe(t,t.return,c)}if(t===e){ee=null;break}var l=t.sibling;if(l!==null){l.return=t.return,ee=l;break}ee=t.return}}var xv=Math.ceil,fa=zn.ReactCurrentDispatcher,Xu=zn.ReactCurrentOwner,Nt=zn.ReactCurrentBatchConfig,be=0,Qe=null,Ue=null,nt=0,jt=0,Wr=Jn(0),We=0,Ei=null,jr=0,Pa=0,Zu=0,li=null,xt=null,ed=0,co=1/0,gn=null,pa=!1,Hc=null,Vn=null,as=!1,On=null,ha=0,ci=0,Wc=null,Os=-1,Ns=0;function pt(){return be&6?De():Os!==-1?Os:Os=De()}function qn(e){return e.mode&1?be&2&&nt!==0?nt&-nt:Zy.transition!==null?(Ns===0&&(Ns=ex()),Ns):(e=Ce,e!==0||(e=window.event,e=e===void 0?16:ax(e.type)),e):1}function Xt(e,t,n,r){if(50<ci)throw ci=0,Wc=null,Error(D(185));Ni(e,n,r),(!(be&2)||e!==Qe)&&(e===Qe&&(!(be&2)&&(Pa|=n),We===4&&Mn(e,nt)),wt(e,r),n===1&&be===0&&!(t.mode&1)&&(co=De()+500,Ta&&Xn()))}function wt(e,t){var n=e.callbackNode;Z1(e,t);var r=Js(e,e===Qe?nt:0);if(r===0)n!==null&&nf(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&nf(n),t===1)e.tag===0?Xy(Kf.bind(null,e)):zx(Kf.bind(null,e)),Yy(function(){!(be&6)&&Xn()}),n=null;else{switch(tx(r)){case 1:n=zu;break;case 4:n=Xg;break;case 16:n=Qs;break;case 536870912:n=Zg;break;default:n=Qs}n=Sm(n,mm.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function mm(e,t){if(Os=-1,Ns=0,be&6)throw Error(D(327));var n=e.callbackNode;if(eo()&&e.callbackNode!==n)return null;var r=Js(e,e===Qe?nt:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ga(e,r);else{t=r;var o=be;be|=2;var s=vm();(Qe!==e||nt!==t)&&(gn=null,co=De()+500,pr(e,t));do try{vv();break}catch(l){ym(e,l)}while(!0);Du(),fa.current=s,be=o,Ue!==null?t=0:(Qe=null,nt=0,t=We)}if(t!==0){if(t===2&&(o=vc(e),o!==0&&(r=o,t=Gc(e,o))),t===1)throw n=Ei,pr(e,0),Mn(e,r),wt(e,De()),n;if(t===6)Mn(e,r);else{if(o=e.current.alternate,!(r&30)&&!mv(o)&&(t=ga(e,r),t===2&&(s=vc(e),s!==0&&(r=s,t=Gc(e,s))),t===1))throw n=Ei,pr(e,0),Mn(e,r),wt(e,De()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(D(345));case 2:sr(e,xt,gn);break;case 3:if(Mn(e,r),(r&130023424)===r&&(t=ed+500-De(),10<t)){if(Js(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){pt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Ec(sr.bind(null,e,xt,gn),t);break}sr(e,xt,gn);break;case 4:if(Mn(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var a=31-Jt(r);s=1<<a,a=t[a],a>o&&(o=a),r&=~s}if(r=o,r=De()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*xv(r/1960))-r,10<r){e.timeoutHandle=Ec(sr.bind(null,e,xt,gn),r);break}sr(e,xt,gn);break;case 5:sr(e,xt,gn);break;default:throw Error(D(329))}}}return wt(e,De()),e.callbackNode===n?mm.bind(null,e):null}function Gc(e,t){var n=li;return e.current.memoizedState.isDehydrated&&(pr(e,t).flags|=256),e=ga(e,t),e!==2&&(t=xt,xt=n,t!==null&&Yc(t)),e}function Yc(e){xt===null?xt=e:xt.push.apply(xt,e)}function mv(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],s=o.getSnapshot;o=o.value;try{if(!en(s(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Mn(e,t){for(t&=~Zu,t&=~Pa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Jt(t),r=1<<n;e[n]=-1,t&=~r}}function Kf(e){if(be&6)throw Error(D(327));eo();var t=Js(e,0);if(!(t&1))return wt(e,De()),null;var n=ga(e,t);if(e.tag!==0&&n===2){var r=vc(e);r!==0&&(t=r,n=Gc(e,r))}if(n===1)throw n=Ei,pr(e,0),Mn(e,t),wt(e,De()),n;if(n===6)throw Error(D(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,sr(e,xt,gn),wt(e,De()),null}function td(e,t){var n=be;be|=1;try{return e(t)}finally{be=n,be===0&&(co=De()+500,Ta&&Xn())}}function Sr(e){On!==null&&On.tag===0&&!(be&6)&&eo();var t=be;be|=1;var n=Nt.transition,r=Ce;try{if(Nt.transition=null,Ce=1,e)return e()}finally{Ce=r,Nt.transition=n,be=t,!(be&6)&&Xn()}}function nd(){jt=Wr.current,Ie(Wr)}function pr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Gy(n)),Ue!==null)for(n=Ue.return;n!==null;){var r=n;switch(Ou(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&na();break;case 3:ao(),Ie(vt),Ie(ut),Hu();break;case 5:qu(r);break;case 4:ao();break;case 13:Ie(Pe);break;case 19:Ie(Pe);break;case 10:Bu(r.type._context);break;case 22:case 23:nd()}n=n.return}if(Qe=e,Ue=e=Hn(e.current,null),nt=jt=t,We=0,Ei=null,Zu=Pa=jr=0,xt=li=null,cr!==null){for(t=0;t<cr.length;t++)if(n=cr[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=o,r.next=a}n.pending=r}cr=null}return e}function ym(e,t){do{var n=Ue;try{if(Du(),Ps.current=da,ua){for(var r=Me.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ua=!1}if(br=0,Ye=He=Me=null,si=!1,Si=0,Xu.current=null,n===null||n.return===null){We=1,Ei=t,Ue=null;break}e:{var s=e,a=n.return,l=n,c=t;if(t=nt,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,x=l,p=x.tag;if(!(x.mode&1)&&(p===0||p===11||p===15)){var g=x.alternate;g?(x.updateQueue=g.updateQueue,x.memoizedState=g.memoizedState,x.lanes=g.lanes):(x.updateQueue=null,x.memoizedState=null)}var b=Of(a);if(b!==null){b.flags&=-257,Nf(b,a,l,s,t),b.mode&1&&Af(s,d,t),t=b,c=d;var k=t.updateQueue;if(k===null){var j=new Set;j.add(c),t.updateQueue=j}else k.add(c);break e}else{if(!(t&1)){Af(s,d,t),rd();break e}c=Error(D(426))}}else if($e&&l.mode&1){var C=Of(a);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Nf(C,a,l,s,t),Nu(lo(c,l));break e}}s=c=lo(c,l),We!==4&&(We=2),li===null?li=[s]:li.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var y=tm(s,c,t);Tf(s,y);break e;case 1:l=c;var h=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof h.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Vn===null||!Vn.has(m)))){s.flags|=65536,t&=-t,s.lanes|=t;var w=nm(s,l,t);Tf(s,w);break e}}s=s.return}while(s!==null)}wm(n)}catch(S){t=S,Ue===n&&n!==null&&(Ue=n=n.return);continue}break}while(!0)}function vm(){var e=fa.current;return fa.current=da,e===null?da:e}function rd(){(We===0||We===3||We===2)&&(We=4),Qe===null||!(jr&268435455)&&!(Pa&268435455)||Mn(Qe,nt)}function ga(e,t){var n=be;be|=2;var r=vm();(Qe!==e||nt!==t)&&(gn=null,pr(e,t));do try{yv();break}catch(o){ym(e,o)}while(!0);if(Du(),be=n,fa.current=r,Ue!==null)throw Error(D(261));return Qe=null,nt=0,We}function yv(){for(;Ue!==null;)km(Ue)}function vv(){for(;Ue!==null&&!q1();)km(Ue)}function km(e){var t=jm(e.alternate,e,jt);e.memoizedProps=e.pendingProps,t===null?wm(e):Ue=t,Xu.current=null}function wm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=fv(n,t),n!==null){n.flags&=32767,Ue=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{We=6,Ue=null;return}}else if(n=dv(n,t,jt),n!==null){Ue=n;return}if(t=t.sibling,t!==null){Ue=t;return}Ue=t=e}while(t!==null);We===0&&(We=5)}function sr(e,t,n){var r=Ce,o=Nt.transition;try{Nt.transition=null,Ce=1,kv(e,t,n,r)}finally{Nt.transition=o,Ce=r}return null}function kv(e,t,n,r){do eo();while(On!==null);if(be&6)throw Error(D(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(D(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(ey(e,s),e===Qe&&(Ue=Qe=null,nt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||as||(as=!0,Sm(Qs,function(){return eo(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Nt.transition,Nt.transition=null;var a=Ce;Ce=1;var l=be;be|=4,Xu.current=null,hv(e,n),gm(n,e),By(Cc),Xs=!!Sc,Cc=Sc=null,e.current=n,gv(n),H1(),be=l,Ce=a,Nt.transition=s}else e.current=n;if(as&&(as=!1,On=e,ha=o),s=e.pendingLanes,s===0&&(Vn=null),Y1(n.stateNode),wt(e,De()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(pa)throw pa=!1,e=Hc,Hc=null,e;return ha&1&&e.tag!==0&&eo(),s=e.pendingLanes,s&1?e===Wc?ci++:(ci=0,Wc=e):ci=0,Xn(),null}function eo(){if(On!==null){var e=tx(ha),t=Nt.transition,n=Ce;try{if(Nt.transition=null,Ce=16>e?16:e,On===null)var r=!1;else{if(e=On,On=null,ha=0,be&6)throw Error(D(331));var o=be;for(be|=4,ee=e.current;ee!==null;){var s=ee,a=s.child;if(ee.flags&16){var l=s.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(ee=d;ee!==null;){var x=ee;switch(x.tag){case 0:case 11:case 15:ai(8,x,s)}var p=x.child;if(p!==null)p.return=x,ee=p;else for(;ee!==null;){x=ee;var g=x.sibling,b=x.return;if(fm(x),x===d){ee=null;break}if(g!==null){g.return=b,ee=g;break}ee=b}}}var k=s.alternate;if(k!==null){var j=k.child;if(j!==null){k.child=null;do{var C=j.sibling;j.sibling=null,j=C}while(j!==null)}}ee=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,ee=a;else e:for(;ee!==null;){if(s=ee,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ai(9,s,s.return)}var y=s.sibling;if(y!==null){y.return=s.return,ee=y;break e}ee=s.return}}var h=e.current;for(ee=h;ee!==null;){a=ee;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,ee=m;else e:for(a=h;ee!==null;){if(l=ee,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:$a(9,l)}}catch(S){Oe(l,l.return,S)}if(l===a){ee=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,ee=w;break e}ee=l.return}}if(be=o,Xn(),cn&&typeof cn.onPostCommitFiberRoot=="function")try{cn.onPostCommitFiberRoot(Sa,e)}catch{}r=!0}return r}finally{Ce=n,Nt.transition=t}}return!1}function Qf(e,t,n){t=lo(n,t),t=tm(e,t,1),e=Un(e,t,1),t=pt(),e!==null&&(Ni(e,1,t),wt(e,t))}function Oe(e,t,n){if(e.tag===3)Qf(e,e,n);else for(;t!==null;){if(t.tag===3){Qf(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Vn===null||!Vn.has(r))){e=lo(n,e),e=nm(t,e,1),t=Un(t,e,1),e=pt(),t!==null&&(Ni(t,1,e),wt(t,e));break}}t=t.return}}function wv(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=pt(),e.pingedLanes|=e.suspendedLanes&n,Qe===e&&(nt&n)===n&&(We===4||We===3&&(nt&130023424)===nt&&500>De()-ed?pr(e,0):Zu|=n),wt(e,t)}function bm(e,t){t===0&&(e.mode&1?(t=Ji,Ji<<=1,!(Ji&130023424)&&(Ji=4194304)):t=1);var n=pt();e=Sn(e,t),e!==null&&(Ni(e,t,n),wt(e,n))}function bv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),bm(e,n)}function jv(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(D(314))}r!==null&&r.delete(t),bm(e,n)}var jm;jm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||vt.current)mt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return mt=!1,uv(e,t,n);mt=!!(e.flags&131072)}else mt=!1,$e&&t.flags&1048576&&Ex(t,ia,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;As(e,t),e=t.pendingProps;var o=oo(t,ut.current);Zr(t,n),o=Gu(null,t,r,e,o,n);var s=Yu();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,kt(r)?(s=!0,ra(t)):s=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Uu(t),o.updater=Ia,t.stateNode=o,o._reactInternals=t,Mc(t,r,e,n),t=Nc(null,t,r,!0,s,n)):(t.tag=0,$e&&s&&Au(t),ft(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(As(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=Cv(r),e=Gt(r,e),o){case 0:t=Oc(null,t,r,e,n);break e;case 1:t=Bf(null,t,r,e,n);break e;case 11:t=Lf(null,t,r,e,n);break e;case 14:t=Df(null,t,r,Gt(r.type,e),n);break e}throw Error(D(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Gt(r,o),Oc(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Gt(r,o),Bf(e,t,r,o,n);case 3:e:{if(sm(t),e===null)throw Error(D(387));r=t.pendingProps,s=t.memoizedState,o=s.element,Px(e,t),la(t,r,null,n);var a=t.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){o=lo(Error(D(423)),t),t=Ff(e,t,r,n,o);break e}else if(r!==o){o=lo(Error(D(424)),t),t=Ff(e,t,r,n,o);break e}else for(St=Fn(t.stateNode.containerInfo.firstChild),zt=t,$e=!0,Qt=null,n=Ix(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(io(),r===o){t=Cn(e,t,n);break e}ft(e,t,r,n)}t=t.child}return t;case 5:return Mx(t),e===null&&Ic(t),r=t.type,o=t.pendingProps,s=e!==null?e.memoizedProps:null,a=o.children,zc(r,o)?a=null:s!==null&&zc(r,s)&&(t.flags|=32),im(e,t),ft(e,t,a,n),t.child;case 6:return e===null&&Ic(t),null;case 13:return am(e,t,n);case 4:return Vu(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=so(t,null,r,n):ft(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Gt(r,o),Lf(e,t,r,o,n);case 7:return ft(e,t,t.pendingProps,n),t.child;case 8:return ft(e,t,t.pendingProps.children,n),t.child;case 12:return ft(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,s=t.memoizedProps,a=o.value,Ee(sa,r._currentValue),r._currentValue=a,s!==null)if(en(s.value,a)){if(s.children===o.children&&!vt.current){t=Cn(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var l=s.dependencies;if(l!==null){a=s.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(s.tag===1){c=wn(-1,n&-n),c.tag=2;var d=s.updateQueue;if(d!==null){d=d.shared;var x=d.pending;x===null?c.next=c:(c.next=x.next,x.next=c),d.pending=c}}s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),$c(s.return,n,t),l.lanes|=n;break}c=c.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(D(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),$c(a,n,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}ft(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Zr(t,n),o=Lt(o),r=r(o),t.flags|=1,ft(e,t,r,n),t.child;case 14:return r=t.type,o=Gt(r,t.pendingProps),o=Gt(r.type,o),Df(e,t,r,o,n);case 15:return rm(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Gt(r,o),As(e,t),t.tag=1,kt(r)?(e=!0,ra(t)):e=!1,Zr(t,n),em(t,r,o),Mc(t,r,o,n),Nc(null,t,r,!0,e,n);case 19:return lm(e,t,n);case 22:return om(e,t,n)}throw Error(D(156,t.tag))};function Sm(e,t){return Jg(e,t)}function Sv(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ot(e,t,n,r){return new Sv(e,t,n,r)}function od(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cv(e){if(typeof e=="function")return od(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ju)return 11;if(e===Su)return 14}return 2}function Hn(e,t){var n=e.alternate;return n===null?(n=Ot(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ls(e,t,n,r,o,s){var a=2;if(r=e,typeof e=="function")od(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Or:return hr(n.children,o,s,t);case bu:a=8,o|=8;break;case oc:return e=Ot(12,n,t,o|2),e.elementType=oc,e.lanes=s,e;case ic:return e=Ot(13,n,t,o),e.elementType=ic,e.lanes=s,e;case sc:return e=Ot(19,n,t,o),e.elementType=sc,e.lanes=s,e;case Mg:return Ma(n,o,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case $g:a=10;break e;case Pg:a=9;break e;case ju:a=11;break e;case Su:a=14;break e;case In:a=16,r=null;break e}throw Error(D(130,e==null?e:typeof e,""))}return t=Ot(a,n,t,o),t.elementType=e,t.type=r,t.lanes=s,t}function hr(e,t,n,r){return e=Ot(7,e,r,t),e.lanes=n,e}function Ma(e,t,n,r){return e=Ot(22,e,r,t),e.elementType=Mg,e.lanes=n,e.stateNode={isHidden:!1},e}function kl(e,t,n){return e=Ot(6,e,null,t),e.lanes=n,e}function wl(e,t,n){return t=Ot(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zv(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=tl(0),this.expirationTimes=tl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tl(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function id(e,t,n,r,o,s,a,l,c){return e=new zv(e,t,n,l,c),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Ot(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Uu(s),e}function Ev(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ar,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Cm(e){if(!e)return Kn;e=e._reactInternals;e:{if(Er(e)!==e||e.tag!==1)throw Error(D(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(kt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(D(171))}if(e.tag===1){var n=e.type;if(kt(n))return Cx(e,n,t)}return t}function zm(e,t,n,r,o,s,a,l,c){return e=id(n,r,!0,e,o,s,a,l,c),e.context=Cm(null),n=e.current,r=pt(),o=qn(n),s=wn(r,o),s.callback=t??null,Un(n,s,o),e.current.lanes=o,Ni(e,o,r),wt(e,r),e}function Aa(e,t,n,r){var o=t.current,s=pt(),a=qn(o);return n=Cm(n),t.context===null?t.context=n:t.pendingContext=n,t=wn(s,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Un(o,t,a),e!==null&&(Xt(e,o,a,s),$s(e,o,a)),a}function xa(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Jf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function sd(e,t){Jf(e,t),(e=e.alternate)&&Jf(e,t)}function _v(){return null}var Em=typeof reportError=="function"?reportError:function(e){console.error(e)};function ad(e){this._internalRoot=e}Oa.prototype.render=ad.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(D(409));Aa(e,t,null,null)};Oa.prototype.unmount=ad.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Sr(function(){Aa(null,e,null,null)}),t[jn]=null}};function Oa(e){this._internalRoot=e}Oa.prototype.unstable_scheduleHydration=function(e){if(e){var t=ox();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Pn.length&&t!==0&&t<Pn[n].priority;n++);Pn.splice(n,0,e),n===0&&sx(e)}};function ld(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Na(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Xf(){}function Tv(e,t,n,r,o){if(o){if(typeof r=="function"){var s=r;r=function(){var d=xa(a);s.call(d)}}var a=zm(t,r,e,0,null,!1,!1,"",Xf);return e._reactRootContainer=a,e[jn]=a.current,vi(e.nodeType===8?e.parentNode:e),Sr(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var l=r;r=function(){var d=xa(c);l.call(d)}}var c=id(e,0,!1,null,null,!1,!1,"",Xf);return e._reactRootContainer=c,e[jn]=c.current,vi(e.nodeType===8?e.parentNode:e),Sr(function(){Aa(t,c,n,r)}),c}function La(e,t,n,r,o){var s=n._reactRootContainer;if(s){var a=s;if(typeof o=="function"){var l=o;o=function(){var c=xa(a);l.call(c)}}Aa(t,a,e,o)}else a=Tv(n,t,e,o,r);return xa(a)}nx=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Jo(t.pendingLanes);n!==0&&(Eu(t,n|1),wt(t,De()),!(be&6)&&(co=De()+500,Xn()))}break;case 13:Sr(function(){var r=Sn(e,1);if(r!==null){var o=pt();Xt(r,e,1,o)}}),sd(e,1)}};_u=function(e){if(e.tag===13){var t=Sn(e,134217728);if(t!==null){var n=pt();Xt(t,e,134217728,n)}sd(e,134217728)}};rx=function(e){if(e.tag===13){var t=qn(e),n=Sn(e,t);if(n!==null){var r=pt();Xt(n,e,t,r)}sd(e,t)}};ox=function(){return Ce};ix=function(e,t){var n=Ce;try{return Ce=e,t()}finally{Ce=n}};xc=function(e,t,n){switch(t){case"input":if(cc(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=_a(r);if(!o)throw Error(D(90));Og(r),cc(r,o)}}}break;case"textarea":Lg(e,n);break;case"select":t=n.value,t!=null&&Kr(e,!!n.multiple,t,!1)}};Hg=td;Wg=Sr;var Rv={usingClientEntryPoint:!1,Events:[Di,Br,_a,Vg,qg,td]},Mo={findFiberByHostInstance:lr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Iv={bundleType:Mo.bundleType,version:Mo.version,rendererPackageName:Mo.rendererPackageName,rendererConfig:Mo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Kg(e),e===null?null:e.stateNode},findFiberByHostInstance:Mo.findFiberByHostInstance||_v,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ls=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ls.isDisabled&&ls.supportsFiber)try{Sa=ls.inject(Iv),cn=ls}catch{}}_t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rv;_t.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ld(t))throw Error(D(200));return Ev(e,t,null,n)};_t.createRoot=function(e,t){if(!ld(e))throw Error(D(299));var n=!1,r="",o=Em;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=id(e,1,!1,null,null,n,!1,r,o),e[jn]=t.current,vi(e.nodeType===8?e.parentNode:e),new ad(t)};_t.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(D(188)):(e=Object.keys(e).join(","),Error(D(268,e)));return e=Kg(t),e=e===null?null:e.stateNode,e};_t.flushSync=function(e){return Sr(e)};_t.hydrate=function(e,t,n){if(!Na(t))throw Error(D(200));return La(null,e,t,!0,n)};_t.hydrateRoot=function(e,t,n){if(!ld(e))throw Error(D(405));var r=n!=null&&n.hydratedSources||null,o=!1,s="",a=Em;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=zm(t,null,e,1,n??null,o,!1,s,a),e[jn]=t.current,vi(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Oa(t)};_t.render=function(e,t,n){if(!Na(t))throw Error(D(200));return La(null,e,t,!1,n)};_t.unmountComponentAtNode=function(e){if(!Na(e))throw Error(D(40));return e._reactRootContainer?(Sr(function(){La(null,null,e,!1,function(){e._reactRootContainer=null,e[jn]=null})}),!0):!1};_t.unstable_batchedUpdates=td;_t.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Na(n))throw Error(D(200));if(e==null||e._reactInternals===void 0)throw Error(D(38));return La(e,t,n,!1,r)};_t.version="18.3.1-next-f1338f8080-20240426";function _m(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_m)}catch(e){console.error(e)}}_m(),_g.exports=_t;var $v=_g.exports,Zf=$v;nc.createRoot=Zf.createRoot,nc.hydrateRoot=Zf.hydrateRoot;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function _i(){return _i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_i.apply(this,arguments)}var Nn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Nn||(Nn={}));const ep="popstate";function Pv(e){e===void 0&&(e={});function t(r,o){let{pathname:s,search:a,hash:l}=r.location;return Kc("",{pathname:s,search:a,hash:l},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:ma(o)}return Av(t,n,null,e)}function Be(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function cd(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Mv(){return Math.random().toString(36).substr(2,8)}function tp(e,t){return{usr:e.state,key:e.key,idx:t}}function Kc(e,t,n,r){return n===void 0&&(n=null),_i({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?bo(t):t,{state:n,key:t&&t.key||r||Mv()})}function ma(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function bo(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Av(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:s=!1}=r,a=o.history,l=Nn.Pop,c=null,d=x();d==null&&(d=0,a.replaceState(_i({},a.state,{idx:d}),""));function x(){return(a.state||{idx:null}).idx}function p(){l=Nn.Pop;let C=x(),y=C==null?null:C-d;d=C,c&&c({action:l,location:j.location,delta:y})}function g(C,y){l=Nn.Push;let h=Kc(j.location,C,y);d=x()+1;let m=tp(h,d),w=j.createHref(h);try{a.pushState(m,"",w)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;o.location.assign(w)}s&&c&&c({action:l,location:j.location,delta:1})}function b(C,y){l=Nn.Replace;let h=Kc(j.location,C,y);d=x();let m=tp(h,d),w=j.createHref(h);a.replaceState(m,"",w),s&&c&&c({action:l,location:j.location,delta:0})}function k(C){let y=o.location.origin!=="null"?o.location.origin:o.location.href,h=typeof C=="string"?C:ma(C);return h=h.replace(/ $/,"%20"),Be(y,"No window.location.(origin|href) available to create URL for href: "+h),new URL(h,y)}let j={get action(){return l},get location(){return e(o,a)},listen(C){if(c)throw new Error("A history only accepts one active listener");return o.addEventListener(ep,p),c=C,()=>{o.removeEventListener(ep,p),c=null}},createHref(C){return t(o,C)},createURL:k,encodeLocation(C){let y=k(C);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:b,go(C){return a.go(C)}};return j}var np;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(np||(np={}));function Ov(e,t,n){return n===void 0&&(n="/"),Nv(e,t,n)}function Nv(e,t,n,r){let o=typeof t=="string"?bo(t):t,s=ud(o.pathname||"/",n);if(s==null)return null;let a=Tm(e);Lv(a);let l=null;for(let c=0;l==null&&c<a.length;++c){let d=Qv(s);l=Gv(a[c],d)}return l}function Tm(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let o=(s,a,l)=>{let c={relativePath:l===void 0?s.path||"":l,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};c.relativePath.startsWith("/")&&(Be(c.relativePath.startsWith(r),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(r.length));let d=Wn([r,c.relativePath]),x=n.concat(c);s.children&&s.children.length>0&&(Be(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Tm(s.children,t,x,d)),!(s.path==null&&!s.index)&&t.push({path:d,score:Hv(d,s.index),routesMeta:x})};return e.forEach((s,a)=>{var l;if(s.path===""||!((l=s.path)!=null&&l.includes("?")))o(s,a);else for(let c of Rm(s.path))o(s,a,c)}),t}function Rm(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return o?[s,""]:[s];let a=Rm(r.join("/")),l=[];return l.push(...a.map(c=>c===""?s:[s,c].join("/"))),o&&l.push(...a),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function Lv(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Wv(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Dv=/^:[\w-]+$/,Bv=3,Fv=2,Uv=1,Vv=10,qv=-2,rp=e=>e==="*";function Hv(e,t){let n=e.split("/"),r=n.length;return n.some(rp)&&(r+=qv),t&&(r+=Fv),n.filter(o=>!rp(o)).reduce((o,s)=>o+(Dv.test(s)?Bv:s===""?Uv:Vv),r)}function Wv(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function Gv(e,t,n){let{routesMeta:r}=e,o={},s="/",a=[];for(let l=0;l<r.length;++l){let c=r[l],d=l===r.length-1,x=s==="/"?t:t.slice(s.length)||"/",p=Yv({path:c.relativePath,caseSensitive:c.caseSensitive,end:d},x),g=c.route;if(!p)return null;Object.assign(o,p.params),a.push({params:o,pathname:Wn([s,p.pathname]),pathnameBase:t2(Wn([s,p.pathnameBase])),route:g}),p.pathnameBase!=="/"&&(s=Wn([s,p.pathnameBase]))}return a}function Yv(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Kv(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let s=o[0],a=s.replace(/(.)\/+$/,"$1"),l=o.slice(1);return{params:r.reduce((d,x,p)=>{let{paramName:g,isOptional:b}=x;if(g==="*"){let j=l[p]||"";a=s.slice(0,s.length-j.length).replace(/(.)\/+$/,"$1")}const k=l[p];return b&&!k?d[g]=void 0:d[g]=(k||"").replace(/%2F/g,"/"),d},{}),pathname:s,pathnameBase:a,pattern:e}}function Kv(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),cd(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c)=>(r.push({paramName:l,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function Qv(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return cd(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ud(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Jv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xv=e=>Jv.test(e);function Zv(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?bo(e):e,s;if(n)if(Xv(n))s=n;else{if(n.includes("//")){let a=n;n=n.replace(/\/\/+/g,"/"),cd(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+n))}n.startsWith("/")?s=op(n.substring(1),"/"):s=op(n,t)}else s=t;return{pathname:s,search:n2(r),hash:r2(o)}}function op(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function bl(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function e2(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function dd(e,t){let n=e2(e);return t?n.map((r,o)=>o===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function fd(e,t,n,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=bo(e):(o=_i({},e),Be(!o.pathname||!o.pathname.includes("?"),bl("?","pathname","search",o)),Be(!o.pathname||!o.pathname.includes("#"),bl("#","pathname","hash",o)),Be(!o.search||!o.search.includes("#"),bl("#","search","hash",o)));let s=e===""||o.pathname==="",a=s?"/":o.pathname,l;if(a==null)l=n;else{let p=t.length-1;if(!r&&a.startsWith("..")){let g=a.split("/");for(;g[0]==="..";)g.shift(),p-=1;o.pathname=g.join("/")}l=p>=0?t[p]:"/"}let c=Zv(o,l),d=a&&a!=="/"&&a.endsWith("/"),x=(s||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||x)&&(c.pathname+="/"),c}const Wn=e=>e.join("/").replace(/\/\/+/g,"/"),t2=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),n2=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,r2=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function o2(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Im=["post","put","patch","delete"];new Set(Im);const i2=["get",...Im];new Set(i2);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ti(){return Ti=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ti.apply(this,arguments)}const pd=f.createContext(null),s2=f.createContext(null),Zn=f.createContext(null),Da=f.createContext(null),En=f.createContext({outlet:null,matches:[],isDataRoute:!1}),$m=f.createContext(null);function a2(e,t){let{relative:n}=t===void 0?{}:t;jo()||Be(!1);let{basename:r,navigator:o}=f.useContext(Zn),{hash:s,pathname:a,search:l}=Mm(e,{relative:n}),c=a;return r!=="/"&&(c=a==="/"?r:Wn([r,a])),o.createHref({pathname:c,search:l,hash:s})}function jo(){return f.useContext(Da)!=null}function Fi(){return jo()||Be(!1),f.useContext(Da).location}function Pm(e){f.useContext(Zn).static||f.useLayoutEffect(e)}function _r(){let{isDataRoute:e}=f.useContext(En);return e?k2():l2()}function l2(){jo()||Be(!1);let e=f.useContext(pd),{basename:t,future:n,navigator:r}=f.useContext(Zn),{matches:o}=f.useContext(En),{pathname:s}=Fi(),a=JSON.stringify(dd(o,n.v7_relativeSplatPath)),l=f.useRef(!1);return Pm(()=>{l.current=!0}),f.useCallback(function(d,x){if(x===void 0&&(x={}),!l.current)return;if(typeof d=="number"){r.go(d);return}let p=fd(d,JSON.parse(a),s,x.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:Wn([t,p.pathname])),(x.replace?r.replace:r.push)(p,x.state,x)},[t,r,a,s,e])}function hd(){let{matches:e}=f.useContext(En),t=e[e.length-1];return t?t.params:{}}function Mm(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=f.useContext(Zn),{matches:o}=f.useContext(En),{pathname:s}=Fi(),a=JSON.stringify(dd(o,r.v7_relativeSplatPath));return f.useMemo(()=>fd(e,JSON.parse(a),s,n==="path"),[e,a,s,n])}function c2(e,t){return u2(e,t)}function u2(e,t,n,r){jo()||Be(!1);let{navigator:o}=f.useContext(Zn),{matches:s}=f.useContext(En),a=s[s.length-1],l=a?a.params:{};a&&a.pathname;let c=a?a.pathnameBase:"/";a&&a.route;let d=Fi(),x;if(t){var p;let C=typeof t=="string"?bo(t):t;c==="/"||(p=C.pathname)!=null&&p.startsWith(c)||Be(!1),x=C}else x=d;let g=x.pathname||"/",b=g;if(c!=="/"){let C=c.replace(/^\//,"").split("/");b="/"+g.replace(/^\//,"").split("/").slice(C.length).join("/")}let k=Ov(e,{pathname:b}),j=g2(k&&k.map(C=>Object.assign({},C,{params:Object.assign({},l,C.params),pathname:Wn([c,o.encodeLocation?o.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?c:Wn([c,o.encodeLocation?o.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),s,n,r);return t&&j?f.createElement(Da.Provider,{value:{location:Ti({pathname:"/",search:"",hash:"",state:null,key:"default"},x),navigationType:Nn.Pop}},j):j}function d2(){let e=v2(),t=o2(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),n?f.createElement("pre",{style:o},n):null,null)}const f2=f.createElement(d2,null);class p2 extends f.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?f.createElement(En.Provider,{value:this.props.routeContext},f.createElement($m.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function h2(e){let{routeContext:t,match:n,children:r}=e,o=f.useContext(pd);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),f.createElement(En.Provider,{value:t},r)}function g2(e,t,n,r){var o;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var s;if(!n)return null;if(n.errors)e=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,l=(o=n)==null?void 0:o.errors;if(l!=null){let x=a.findIndex(p=>p.route.id&&(l==null?void 0:l[p.route.id])!==void 0);x>=0||Be(!1),a=a.slice(0,Math.min(a.length,x+1))}let c=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let x=0;x<a.length;x++){let p=a[x];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(d=x),p.route.id){let{loaderData:g,errors:b}=n,k=p.route.loader&&g[p.route.id]===void 0&&(!b||b[p.route.id]===void 0);if(p.route.lazy||k){c=!0,d>=0?a=a.slice(0,d+1):a=[a[0]];break}}}return a.reduceRight((x,p,g)=>{let b,k=!1,j=null,C=null;n&&(b=l&&p.route.id?l[p.route.id]:void 0,j=p.route.errorElement||f2,c&&(d<0&&g===0?(w2("route-fallback"),k=!0,C=null):d===g&&(k=!0,C=p.route.hydrateFallbackElement||null)));let y=t.concat(a.slice(0,g+1)),h=()=>{let m;return b?m=j:k?m=C:p.route.Component?m=f.createElement(p.route.Component,null):p.route.element?m=p.route.element:m=x,f.createElement(h2,{match:p,routeContext:{outlet:x,matches:y,isDataRoute:n!=null},children:m})};return n&&(p.route.ErrorBoundary||p.route.errorElement||g===0)?f.createElement(p2,{location:n.location,revalidation:n.revalidation,component:j,error:b,children:h(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):h()},null)}var Am=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Am||{}),Om=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Om||{});function x2(e){let t=f.useContext(pd);return t||Be(!1),t}function m2(e){let t=f.useContext(s2);return t||Be(!1),t}function y2(e){let t=f.useContext(En);return t||Be(!1),t}function Nm(e){let t=y2(),n=t.matches[t.matches.length-1];return n.route.id||Be(!1),n.route.id}function v2(){var e;let t=f.useContext($m),n=m2(),r=Nm();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function k2(){let{router:e}=x2(Am.UseNavigateStable),t=Nm(Om.UseNavigateStable),n=f.useRef(!1);return Pm(()=>{n.current=!0}),f.useCallback(function(o,s){s===void 0&&(s={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,Ti({fromRouteId:t},s)))},[e,t])}const ip={};function w2(e,t,n){ip[e]||(ip[e]=!0)}function b2(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function j2(e){let{to:t,replace:n,state:r,relative:o}=e;jo()||Be(!1);let{future:s,static:a}=f.useContext(Zn),{matches:l}=f.useContext(En),{pathname:c}=Fi(),d=_r(),x=fd(t,dd(l,s.v7_relativeSplatPath),c,o==="path"),p=JSON.stringify(x);return f.useEffect(()=>d(JSON.parse(p),{replace:n,state:r,relative:o}),[d,p,o,n,r]),null}function Mr(e){Be(!1)}function S2(e){let{basename:t="/",children:n=null,location:r,navigationType:o=Nn.Pop,navigator:s,static:a=!1,future:l}=e;jo()&&Be(!1);let c=t.replace(/^\/*/,"/"),d=f.useMemo(()=>({basename:c,navigator:s,static:a,future:Ti({v7_relativeSplatPath:!1},l)}),[c,l,s,a]);typeof r=="string"&&(r=bo(r));let{pathname:x="/",search:p="",hash:g="",state:b=null,key:k="default"}=r,j=f.useMemo(()=>{let C=ud(x,c);return C==null?null:{location:{pathname:C,search:p,hash:g,state:b,key:k},navigationType:o}},[c,x,p,g,b,k,o]);return j==null?null:f.createElement(Zn.Provider,{value:d},f.createElement(Da.Provider,{children:n,value:j}))}function C2(e){let{children:t,location:n}=e;return c2(Qc(t),n)}new Promise(()=>{});function Qc(e,t){t===void 0&&(t=[]);let n=[];return f.Children.forEach(e,(r,o)=>{if(!f.isValidElement(r))return;let s=[...t,o];if(r.type===f.Fragment){n.push.apply(n,Qc(r.props.children,s));return}r.type!==Mr&&Be(!1),!r.props.index||!r.props.children||Be(!1);let a={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=Qc(r.props.children,s)),n.push(a)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Jc(){return Jc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Jc.apply(this,arguments)}function z2(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,s;for(s=0;s<r.length;s++)o=r[s],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function E2(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function _2(e,t){return e.button===0&&(!t||t==="_self")&&!E2(e)}const T2=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],R2="6";try{window.__reactRouterVersion=R2}catch{}const I2="startTransition",sp=w1[I2];function $2(e){let{basename:t,children:n,future:r,window:o}=e,s=f.useRef();s.current==null&&(s.current=Pv({window:o,v5Compat:!0}));let a=s.current,[l,c]=f.useState({action:a.action,location:a.location}),{v7_startTransition:d}=r||{},x=f.useCallback(p=>{d&&sp?sp(()=>c(p)):c(p)},[c,d]);return f.useLayoutEffect(()=>a.listen(x),[a,x]),f.useEffect(()=>b2(r),[r]),f.createElement(S2,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:a,future:r})}const P2=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",M2=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Lm=f.forwardRef(function(t,n){let{onClick:r,relative:o,reloadDocument:s,replace:a,state:l,target:c,to:d,preventScrollReset:x,viewTransition:p}=t,g=z2(t,T2),{basename:b}=f.useContext(Zn),k,j=!1;if(typeof d=="string"&&M2.test(d)&&(k=d,P2))try{let m=new URL(window.location.href),w=d.startsWith("//")?new URL(m.protocol+d):new URL(d),S=ud(w.pathname,b);w.origin===m.origin&&S!=null?d=S+w.search+w.hash:j=!0}catch{}let C=a2(d,{relative:o}),y=A2(d,{replace:a,state:l,target:c,preventScrollReset:x,relative:o,viewTransition:p});function h(m){r&&r(m),m.defaultPrevented||y(m)}return f.createElement("a",Jc({},g,{href:k||C,onClick:j||s?r:h,ref:n,target:c}))});var ap;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(ap||(ap={}));var lp;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(lp||(lp={}));function A2(e,t){let{target:n,replace:r,state:o,preventScrollReset:s,relative:a,viewTransition:l}=t===void 0?{}:t,c=_r(),d=Fi(),x=Mm(e,{relative:a});return f.useCallback(p=>{if(_2(p,n)){p.preventDefault();let g=r!==void 0?r:ma(d)===ma(x);c(e,{replace:g,state:o,preventScrollReset:s,relative:a,viewTransition:l})}},[d,c,x,r,o,n,e,s,a,l])}var yt=function(){return yt=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},yt.apply(this,arguments)};function Ri(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,s;r<o;r++)(s||!(r in t))&&(s||(s=Array.prototype.slice.call(t,0,r)),s[r]=t[r]);return e.concat(s||Array.prototype.slice.call(t))}var Re="-ms-",ui="-moz-",Se="-webkit-",Dm="comm",Ba="rule",gd="decl",O2="@import",Bm="@keyframes",N2="@layer",Fm=Math.abs,xd=String.fromCharCode,Xc=Object.assign;function L2(e,t){return Ke(e,0)^45?(((t<<2^Ke(e,0))<<2^Ke(e,1))<<2^Ke(e,2))<<2^Ke(e,3):0}function Um(e){return e.trim()}function xn(e,t){return(e=t.exec(e))?e[0]:e}function pe(e,t,n){return e.replace(t,n)}function Ds(e,t,n){return e.indexOf(t,n)}function Ke(e,t){return e.charCodeAt(t)|0}function uo(e,t,n){return e.slice(t,n)}function an(e){return e.length}function Vm(e){return e.length}function Zo(e,t){return t.push(e),e}function D2(e,t){return e.map(t).join("")}function cp(e,t){return e.filter(function(n){return!xn(n,t)})}var Fa=1,fo=1,qm=0,Bt=0,Fe=0,So="";function Ua(e,t,n,r,o,s,a,l){return{value:e,root:t,parent:n,type:r,props:o,children:s,line:Fa,column:fo,length:a,return:"",siblings:l}}function Rn(e,t){return Xc(Ua("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Ir(e){for(;e.root;)e=Rn(e.root,{children:[e]});Zo(e,e.siblings)}function B2(){return Fe}function F2(){return Fe=Bt>0?Ke(So,--Bt):0,fo--,Fe===10&&(fo=1,Fa--),Fe}function Zt(){return Fe=Bt<qm?Ke(So,Bt++):0,fo++,Fe===10&&(fo=1,Fa++),Fe}function gr(){return Ke(So,Bt)}function Bs(){return Bt}function Va(e,t){return uo(So,e,t)}function Zc(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function U2(e){return Fa=fo=1,qm=an(So=e),Bt=0,[]}function V2(e){return So="",e}function jl(e){return Um(Va(Bt-1,eu(e===91?e+2:e===40?e+1:e)))}function q2(e){for(;(Fe=gr())&&Fe<33;)Zt();return Zc(e)>2||Zc(Fe)>3?"":" "}function H2(e,t){for(;--t&&Zt()&&!(Fe<48||Fe>102||Fe>57&&Fe<65||Fe>70&&Fe<97););return Va(e,Bs()+(t<6&&gr()==32&&Zt()==32))}function eu(e){for(;Zt();)switch(Fe){case e:return Bt;case 34:case 39:e!==34&&e!==39&&eu(Fe);break;case 40:e===41&&eu(e);break;case 92:Zt();break}return Bt}function W2(e,t){for(;Zt()&&e+Fe!==57;)if(e+Fe===84&&gr()===47)break;return"/*"+Va(t,Bt-1)+"*"+xd(e===47?e:Zt())}function G2(e){for(;!Zc(gr());)Zt();return Va(e,Bt)}function Y2(e){return V2(Fs("",null,null,null,[""],e=U2(e),0,[0],e))}function Fs(e,t,n,r,o,s,a,l,c){for(var d=0,x=0,p=a,g=0,b=0,k=0,j=1,C=1,y=1,h=0,m="",w=o,S=s,v=r,_=m;C;)switch(k=h,h=Zt()){case 40:if(k!=108&&Ke(_,p-1)==58){Ds(_+=pe(jl(h),"&","&\f"),"&\f",Fm(d?l[d-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:_+=jl(h);break;case 9:case 10:case 13:case 32:_+=q2(k);break;case 92:_+=H2(Bs()-1,7);continue;case 47:switch(gr()){case 42:case 47:Zo(K2(W2(Zt(),Bs()),t,n,c),c);break;default:_+="/"}break;case 123*j:l[d++]=an(_)*y;case 125*j:case 59:case 0:switch(h){case 0:case 125:C=0;case 59+x:y==-1&&(_=pe(_,/\f/g,"")),b>0&&an(_)-p&&Zo(b>32?dp(_+";",r,n,p-1,c):dp(pe(_," ","")+";",r,n,p-2,c),c);break;case 59:_+=";";default:if(Zo(v=up(_,t,n,d,x,o,l,m,w=[],S=[],p,s),s),h===123)if(x===0)Fs(_,t,v,v,w,s,p,l,S);else switch(g===99&&Ke(_,3)===110?100:g){case 100:case 108:case 109:case 115:Fs(e,v,v,r&&Zo(up(e,v,v,0,0,o,l,m,o,w=[],p,S),S),o,S,p,l,r?w:S);break;default:Fs(_,v,v,v,[""],S,0,l,S)}}d=x=b=0,j=y=1,m=_="",p=a;break;case 58:p=1+an(_),b=k;default:if(j<1){if(h==123)--j;else if(h==125&&j++==0&&F2()==125)continue}switch(_+=xd(h),h*j){case 38:y=x>0?1:(_+="\f",-1);break;case 44:l[d++]=(an(_)-1)*y,y=1;break;case 64:gr()===45&&(_+=jl(Zt())),g=gr(),x=p=an(m=_+=G2(Bs())),h++;break;case 45:k===45&&an(_)==2&&(j=0)}}return s}function up(e,t,n,r,o,s,a,l,c,d,x,p){for(var g=o-1,b=o===0?s:[""],k=Vm(b),j=0,C=0,y=0;j<r;++j)for(var h=0,m=uo(e,g+1,g=Fm(C=a[j])),w=e;h<k;++h)(w=Um(C>0?b[h]+" "+m:pe(m,/&\f/g,b[h])))&&(c[y++]=w);return Ua(e,t,n,o===0?Ba:l,c,d,x,p)}function K2(e,t,n,r){return Ua(e,t,n,Dm,xd(B2()),uo(e,2,-2),0,r)}function dp(e,t,n,r,o){return Ua(e,t,n,gd,uo(e,0,r),uo(e,r+1,-1),r,o)}function Hm(e,t,n){switch(L2(e,t)){case 5103:return Se+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Se+e+e;case 4789:return ui+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Se+e+ui+e+Re+e+e;case 5936:switch(Ke(e,t+11)){case 114:return Se+e+Re+pe(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Se+e+Re+pe(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Se+e+Re+pe(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Se+e+Re+e+e;case 6165:return Se+e+Re+"flex-"+e+e;case 5187:return Se+e+pe(e,/(\w+).+(:[^]+)/,Se+"box-$1$2"+Re+"flex-$1$2")+e;case 5443:return Se+e+Re+"flex-item-"+pe(e,/flex-|-self/g,"")+(xn(e,/flex-|baseline/)?"":Re+"grid-row-"+pe(e,/flex-|-self/g,""))+e;case 4675:return Se+e+Re+"flex-line-pack"+pe(e,/align-content|flex-|-self/g,"")+e;case 5548:return Se+e+Re+pe(e,"shrink","negative")+e;case 5292:return Se+e+Re+pe(e,"basis","preferred-size")+e;case 6060:return Se+"box-"+pe(e,"-grow","")+Se+e+Re+pe(e,"grow","positive")+e;case 4554:return Se+pe(e,/([^-])(transform)/g,"$1"+Se+"$2")+e;case 6187:return pe(pe(pe(e,/(zoom-|grab)/,Se+"$1"),/(image-set)/,Se+"$1"),e,"")+e;case 5495:case 3959:return pe(e,/(image-set\([^]*)/,Se+"$1$`$1");case 4968:return pe(pe(e,/(.+:)(flex-)?(.*)/,Se+"box-pack:$3"+Re+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Se+e+e;case 4200:if(!xn(e,/flex-|baseline/))return Re+"grid-column-align"+uo(e,t)+e;break;case 2592:case 3360:return Re+pe(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,xn(r.props,/grid-\w+-end/)})?~Ds(e+(n=n[t].value),"span",0)?e:Re+pe(e,"-start","")+e+Re+"grid-row-span:"+(~Ds(n,"span",0)?xn(n,/\d+/):+xn(n,/\d+/)-+xn(e,/\d+/))+";":Re+pe(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return xn(r.props,/grid-\w+-start/)})?e:Re+pe(pe(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return pe(e,/(.+)-inline(.+)/,Se+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(an(e)-1-t>6)switch(Ke(e,t+1)){case 109:if(Ke(e,t+4)!==45)break;case 102:return pe(e,/(.+:)(.+)-([^]+)/,"$1"+Se+"$2-$3$1"+ui+(Ke(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ds(e,"stretch",0)?Hm(pe(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return pe(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,s,a,l,c,d){return Re+o+":"+s+d+(a?Re+o+"-span:"+(l?c:+c-+s)+d:"")+e});case 4949:if(Ke(e,t+6)===121)return pe(e,":",":"+Se)+e;break;case 6444:switch(Ke(e,Ke(e,14)===45?18:11)){case 120:return pe(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Se+(Ke(e,14)===45?"inline-":"")+"box$3$1"+Se+"$2$3$1"+Re+"$2box$3")+e;case 100:return pe(e,":",":"+Re)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return pe(e,"scroll-","scroll-snap-")+e}return e}function ya(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function Q2(e,t,n,r){switch(e.type){case N2:if(e.children.length)break;case O2:case gd:return e.return=e.return||e.value;case Dm:return"";case Bm:return e.return=e.value+"{"+ya(e.children,r)+"}";case Ba:if(!an(e.value=e.props.join(",")))return""}return an(n=ya(e.children,r))?e.return=e.value+"{"+n+"}":""}function J2(e){var t=Vm(e);return function(n,r,o,s){for(var a="",l=0;l<t;l++)a+=e[l](n,r,o,s)||"";return a}}function X2(e){return function(t){t.root||(t=t.return)&&e(t)}}function Z2(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case gd:e.return=Hm(e.value,e.length,n);return;case Bm:return ya([Rn(e,{value:pe(e.value,"@","@"+Se)})],r);case Ba:if(e.length)return D2(n=e.props,function(o){switch(xn(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Ir(Rn(e,{props:[pe(o,/:(read-\w+)/,":"+ui+"$1")]})),Ir(Rn(e,{props:[o]})),Xc(e,{props:cp(n,r)});break;case"::placeholder":Ir(Rn(e,{props:[pe(o,/:(plac\w+)/,":"+Se+"input-$1")]})),Ir(Rn(e,{props:[pe(o,/:(plac\w+)/,":"+ui+"$1")]})),Ir(Rn(e,{props:[pe(o,/:(plac\w+)/,Re+"input-$1")]})),Ir(Rn(e,{props:[o]})),Xc(e,{props:cp(n,r)});break}return""})}}var ek={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},bt={},po=typeof process<"u"&&bt!==void 0&&(bt.REACT_APP_SC_ATTR||bt.SC_ATTR)||"data-styled",Wm="active",Gm="data-styled-version",qa="6.1.19",md=`/*!sc*/
`,va=typeof window<"u"&&typeof document<"u",tk=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&bt!==void 0&&bt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&bt.REACT_APP_SC_DISABLE_SPEEDY!==""?bt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&bt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&bt!==void 0&&bt.SC_DISABLE_SPEEDY!==void 0&&bt.SC_DISABLE_SPEEDY!==""&&bt.SC_DISABLE_SPEEDY!=="false"&&bt.SC_DISABLE_SPEEDY),Ha=Object.freeze([]),ho=Object.freeze({});function nk(e,t,n){return n===void 0&&(n=ho),e.theme!==n.theme&&e.theme||t||n.theme}var Ym=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),rk=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ok=/(^-|-$)/g;function fp(e){return e.replace(rk,"-").replace(ok,"")}var ik=/(a)(d)/gi,cs=52,pp=function(e){return String.fromCharCode(e+(e>25?39:97))};function tu(e){var t,n="";for(t=Math.abs(e);t>cs;t=t/cs|0)n=pp(t%cs)+n;return(pp(t%cs)+n).replace(ik,"$1-$2")}var Sl,Km=5381,Gr=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},Qm=function(e){return Gr(Km,e)};function Jm(e){return tu(Qm(e)>>>0)}function sk(e){return e.displayName||e.name||"Component"}function Cl(e){return typeof e=="string"&&!0}var Xm=typeof Symbol=="function"&&Symbol.for,Zm=Xm?Symbol.for("react.memo"):60115,ak=Xm?Symbol.for("react.forward_ref"):60112,lk={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ck={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},e0={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},uk=((Sl={})[ak]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Sl[Zm]=e0,Sl);function hp(e){return("type"in(t=e)&&t.type.$$typeof)===Zm?e0:"$$typeof"in e?uk[e.$$typeof]:lk;var t}var dk=Object.defineProperty,fk=Object.getOwnPropertyNames,gp=Object.getOwnPropertySymbols,pk=Object.getOwnPropertyDescriptor,hk=Object.getPrototypeOf,xp=Object.prototype;function t0(e,t,n){if(typeof t!="string"){if(xp){var r=hk(t);r&&r!==xp&&t0(e,r,n)}var o=fk(t);gp&&(o=o.concat(gp(t)));for(var s=hp(e),a=hp(t),l=0;l<o.length;++l){var c=o[l];if(!(c in ck||n&&n[c]||a&&c in a||s&&c in s)){var d=pk(t,c);try{dk(e,c,d)}catch{}}}}return e}function go(e){return typeof e=="function"}function yd(e){return typeof e=="object"&&"styledComponentId"in e}function dr(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function nu(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Ii(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function ru(e,t,n){if(n===void 0&&(n=!1),!n&&!Ii(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=ru(e[r],t[r]);else if(Ii(t))for(var r in t)e[r]=ru(e[r],t[r]);return e}function vd(e,t){Object.defineProperty(e,"toString",{value:t})}function Ui(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var gk=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,s=o;t>=s;)if((s<<=1)<0)throw Ui(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(r),this.length=s;for(var a=o;a<s;a++)this.groupSizes[a]=0}for(var l=this.indexOfGroup(t+1),c=(a=0,n.length);a<c;a++)this.tag.insertRule(l,n[a])&&(this.groupSizes[t]++,l++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var s=r;s<o;s++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),s=o+r,a=o;a<s;a++)n+="".concat(this.tag.getRule(a)).concat(md);return n},e}(),Us=new Map,ka=new Map,Vs=1,us=function(e){if(Us.has(e))return Us.get(e);for(;ka.has(Vs);)Vs++;var t=Vs++;return Us.set(e,t),ka.set(t,e),t},xk=function(e,t){Vs=t+1,Us.set(e,t),ka.set(t,e)},mk="style[".concat(po,"][").concat(Gm,'="').concat(qa,'"]'),yk=new RegExp("^".concat(po,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),vk=function(e,t,n){for(var r,o=n.split(","),s=0,a=o.length;s<a;s++)(r=o[s])&&e.registerName(t,r)},kk=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(md),o=[],s=0,a=r.length;s<a;s++){var l=r[s].trim();if(l){var c=l.match(yk);if(c){var d=0|parseInt(c[1],10),x=c[2];d!==0&&(xk(x,d),vk(e,x,c[3]),e.getTag().insertRules(d,o)),o.length=0}else o.push(l)}}},mp=function(e){for(var t=document.querySelectorAll(mk),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(po)!==Wm&&(kk(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function wk(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var n0=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(l){var c=Array.from(l.querySelectorAll("style[".concat(po,"]")));return c[c.length-1]}(n),s=o!==void 0?o.nextSibling:null;r.setAttribute(po,Wm),r.setAttribute(Gm,qa);var a=wk();return a&&r.setAttribute("nonce",a),n.insertBefore(r,s),r},bk=function(){function e(t){this.element=n0(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,s=r.length;o<s;o++){var a=r[o];if(a.ownerNode===n)return a}throw Ui(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e}(),jk=function(){function e(t){this.element=n0(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Sk=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),yp=va,Ck={isServer:!va,useCSSOMInjection:!tk},r0=function(){function e(t,n,r){t===void 0&&(t=ho),n===void 0&&(n={});var o=this;this.options=yt(yt({},Ck),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&va&&yp&&(yp=!1,mp(this)),vd(this,function(){return function(s){for(var a=s.getTag(),l=a.length,c="",d=function(p){var g=function(y){return ka.get(y)}(p);if(g===void 0)return"continue";var b=s.names.get(g),k=a.getGroup(p);if(b===void 0||!b.size||k.length===0)return"continue";var j="".concat(po,".g").concat(p,'[id="').concat(g,'"]'),C="";b!==void 0&&b.forEach(function(y){y.length>0&&(C+="".concat(y,","))}),c+="".concat(k).concat(j,'{content:"').concat(C,'"}').concat(md)},x=0;x<l;x++)d(x);return c}(o)})}return e.registerId=function(t){return us(t)},e.prototype.rehydrate=function(){!this.server&&va&&mp(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(yt(yt({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Sk(o):r?new bk(o):new jk(o)}(this.options),new gk(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(us(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(us(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(us(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),zk=/&/g,Ek=/^\s*\/\/.*$/gm;function o0(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=o0(n.children,t)),n})}function _k(e){var t,n,r,o=ho,s=o.options,a=s===void 0?ho:s,l=o.plugins,c=l===void 0?Ha:l,d=function(g,b,k){return k.startsWith(n)&&k.endsWith(n)&&k.replaceAll(n,"").length>0?".".concat(t):g},x=c.slice();x.push(function(g){g.type===Ba&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(zk,n).replace(r,d))}),a.prefix&&x.push(Z2),x.push(Q2);var p=function(g,b,k,j){b===void 0&&(b=""),k===void 0&&(k=""),j===void 0&&(j="&"),t=j,n=b,r=new RegExp("\\".concat(n,"\\b"),"g");var C=g.replace(Ek,""),y=Y2(k||b?"".concat(k," ").concat(b," { ").concat(C," }"):C);a.namespace&&(y=o0(y,a.namespace));var h=[];return ya(y,J2(x.concat(X2(function(m){return h.push(m)})))),h};return p.hash=c.length?c.reduce(function(g,b){return b.name||Ui(15),Gr(g,b.name)},Km).toString():"",p}var Tk=new r0,ou=_k(),i0=Ct.createContext({shouldForwardProp:void 0,styleSheet:Tk,stylis:ou});i0.Consumer;Ct.createContext(void 0);function vp(){return f.useContext(i0)}var s0=function(){function e(t,n){var r=this;this.inject=function(o,s){s===void 0&&(s=ou);var a=r.name+s.hash;o.hasNameForId(r.id,a)||o.insertRules(r.id,a,s(r.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,vd(this,function(){throw Ui(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=ou),this.name+t.hash},e}(),Rk=function(e){return e>="A"&&e<="Z"};function kp(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;Rk(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var a0=function(e){return e==null||e===!1||e===""},l0=function(e){var t,n,r=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!a0(s)&&(Array.isArray(s)&&s.isCss||go(s)?r.push("".concat(kp(o),":"),s,";"):Ii(s)?r.push.apply(r,Ri(Ri(["".concat(o," {")],l0(s),!1),["}"],!1)):r.push("".concat(kp(o),": ").concat((t=o,(n=s)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in ek||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function xr(e,t,n,r){if(a0(e))return[];if(yd(e))return[".".concat(e.styledComponentId)];if(go(e)){if(!go(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return xr(o,t,n,r)}var s;return e instanceof s0?n?(e.inject(n,r),[e.getName(r)]):[e]:Ii(e)?l0(e):Array.isArray(e)?Array.prototype.concat.apply(Ha,e.map(function(a){return xr(a,t,n,r)})):[e.toString()]}function Ik(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(go(n)&&!yd(n))return!1}return!0}var $k=Qm(qa),Pk=function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&Ik(t),this.componentId=n,this.baseHash=Gr($k,n),this.baseStyle=r,r0.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=dr(o,this.staticRulesId);else{var s=nu(xr(this.rules,t,n,r)),a=tu(Gr(this.baseHash,s)>>>0);if(!n.hasNameForId(this.componentId,a)){var l=r(s,".".concat(a),void 0,this.componentId);n.insertRules(this.componentId,a,l)}o=dr(o,a),this.staticRulesId=a}else{for(var c=Gr(this.baseHash,r.hash),d="",x=0;x<this.rules.length;x++){var p=this.rules[x];if(typeof p=="string")d+=p;else if(p){var g=nu(xr(p,t,n,r));c=Gr(c,g+x),d+=g}}if(d){var b=tu(c>>>0);n.hasNameForId(this.componentId,b)||n.insertRules(this.componentId,b,r(d,".".concat(b),void 0,this.componentId)),o=dr(o,b)}}return o},e}(),c0=Ct.createContext(void 0);c0.Consumer;var zl={};function Mk(e,t,n){var r=yd(e),o=e,s=!Cl(e),a=t.attrs,l=a===void 0?Ha:a,c=t.componentId,d=c===void 0?function(w,S){var v=typeof w!="string"?"sc":fp(w);zl[v]=(zl[v]||0)+1;var _="".concat(v,"-").concat(Jm(qa+v+zl[v]));return S?"".concat(S,"-").concat(_):_}(t.displayName,t.parentComponentId):c,x=t.displayName,p=x===void 0?function(w){return Cl(w)?"styled.".concat(w):"Styled(".concat(sk(w),")")}(e):x,g=t.displayName&&t.componentId?"".concat(fp(t.displayName),"-").concat(t.componentId):t.componentId||d,b=r&&o.attrs?o.attrs.concat(l).filter(Boolean):l,k=t.shouldForwardProp;if(r&&o.shouldForwardProp){var j=o.shouldForwardProp;if(t.shouldForwardProp){var C=t.shouldForwardProp;k=function(w,S){return j(w,S)&&C(w,S)}}else k=j}var y=new Pk(n,g,r?o.componentStyle:void 0);function h(w,S){return function(v,_,T){var O=v.attrs,N=v.componentStyle,z=v.defaultProps,A=v.foldedComponentIds,ne=v.styledComponentId,L=v.target,X=Ct.useContext(c0),Z=vp(),H=v.shouldForwardProp||Z.shouldForwardProp,$=nk(_,X,z)||ho,G=function(ue,ge,le){for(var re,J=yt(yt({},ge),{className:void 0,theme:le}),je=0;je<ue.length;je+=1){var Ne=go(re=ue[je])?re(J):re;for(var _e in Ne)J[_e]=_e==="className"?dr(J[_e],Ne[_e]):_e==="style"?yt(yt({},J[_e]),Ne[_e]):Ne[_e]}return ge.className&&(J.className=dr(J.className,ge.className)),J}(O,_,$),I=G.as||L,W={};for(var ie in G)G[ie]===void 0||ie[0]==="$"||ie==="as"||ie==="theme"&&G.theme===$||(ie==="forwardedAs"?W.as=G.forwardedAs:H&&!H(ie,I)||(W[ie]=G[ie]));var R=function(ue,ge){var le=vp(),re=ue.generateAndInjectStyles(ge,le.styleSheet,le.stylis);return re}(N,G),Q=dr(A,ne);return R&&(Q+=" "+R),G.className&&(Q+=" "+G.className),W[Cl(I)&&!Ym.has(I)?"class":"className"]=Q,T&&(W.ref=T),f.createElement(I,W)}(m,w,S)}h.displayName=p;var m=Ct.forwardRef(h);return m.attrs=b,m.componentStyle=y,m.displayName=p,m.shouldForwardProp=k,m.foldedComponentIds=r?dr(o.foldedComponentIds,o.styledComponentId):"",m.styledComponentId=g,m.target=r?o.target:e,Object.defineProperty(m,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(w){this._foldedDefaultProps=r?function(S){for(var v=[],_=1;_<arguments.length;_++)v[_-1]=arguments[_];for(var T=0,O=v;T<O.length;T++)ru(S,O[T],!0);return S}({},o.defaultProps,w):w}}),vd(m,function(){return".".concat(m.styledComponentId)}),s&&t0(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}function wp(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var bp=function(e){return Object.assign(e,{isCss:!0})};function Yr(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(go(e)||Ii(e))return bp(xr(wp(Ha,Ri([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?xr(r):bp(xr(wp(r,t)))}function iu(e,t,n){if(n===void 0&&(n=ho),!t)throw Ui(1,t);var r=function(o){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,n,Yr.apply(void 0,Ri([o],s,!1)))};return r.attrs=function(o){return iu(e,t,yt(yt({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return iu(e,t,yt(yt({},n),o))},r}var u0=function(e){return iu(Mk,e)},u=u0;Ym.forEach(function(e){u[e]=u0(e)});function er(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=nu(Yr.apply(void 0,Ri([e],t,!1))),o=Jm(r);return new s0(o,r)}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ak={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ok=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Y=(e,t)=>{const n=f.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:l="",children:c,...d},x)=>f.createElement("svg",{ref:x,...Ak,width:o,height:o,stroke:r,strokeWidth:a?Number(s)*24/Number(o):s,className:["lucide",`lucide-${Ok(e)}`,l].join(" "),...d},[...t.map(([p,g])=>f.createElement(p,g)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=Y("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nk=Y("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lk=Y("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dk=Y("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bk=Y("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jp=Y("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=Y("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fk=Y("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uk=Y("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=Y("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=Y("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const El=Y("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _l=Y("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=Y("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=Y("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vk=Y("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qk=Y("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hk=Y("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=Y("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wk=Y("FileVideo",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gk=Y("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=Y("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yk=Y("Hand",[["path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0",key:"aigmz7"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2",key:"1n6bmn"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8",key:"a9iiix"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const au=Y("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kk=Y("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qk=Y("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jk=Y("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sp=Y("ListVideo",[["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}],["path",{d:"m16 12 5 3-5 3v-6Z",key:"zpskkp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=Y("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=Y("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xk=Y("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zk=Y("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ew=Y("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=Y("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tw=Y("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=Y("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=Y("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=Y("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nw=Y("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0=Y("MonitorOff",[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",key:"k0q8oc"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9",key:"cp1ac0"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lu=Y("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rw=Y("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ow=Y("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iw=Y("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cp=Y("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wa=Y("PhoneOff",[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",key:"z86iuo"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22",key:"11kh81"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=Y("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rl=Y("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $i=Y("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sw=Y("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=Y("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aw=Y("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lw=Y("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=Y("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cw=Y("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uw=Y("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dw=Y("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zp=Y("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sd=Y("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cd=Y("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fw=Y("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=Y("UserMinus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Il=Y("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ep=Y("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=Y("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=Y("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=Y("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=Y("VideoOff",[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8",key:"ubwiq0"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z",key:"1l10zd"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=Y("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m0=Y("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pw=Y("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $l=Y("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cr=Y("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hw=Y("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),y0=f.createContext(),gw=()=>{const e=f.useContext(y0);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},xw=({children:e})=>{const[t,n]=f.useState(()=>localStorage.getItem("theme")||"dark");f.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},[t]);const r=a=>{n(a)},o={dark:{name:"Dark",colors:{primary:"#5865f2",background:"#36393f",secondary:"#2f3136",tertiary:"#202225",text:"#dcddde",textSecondary:"#b9bbbe",textMuted:"#72767d",border:"#40444b",hover:"rgba(255, 255, 255, 0.1)",active:"rgba(88, 101, 242, 0.1)",success:"#43b581",warning:"#faa61a",danger:"#f04747",input:"#40444b",placeholder:"#72767d"}},light:{name:"Light",colors:{primary:"#5865f2",background:"#ffffff",secondary:"#f2f3f5",tertiary:"#e3e5e8",text:"#2e3338",textSecondary:"#4f5660",textMuted:"#747f8d",border:"#e3e5e8",hover:"rgba(0, 0, 0, 0.05)",active:"rgba(88, 101, 242, 0.1)",success:"#3ba55c",warning:"#faa61a",danger:"#ed4245",input:"#ebedef",placeholder:"#747f8d"}}},s=o[t]||o.dark;return i.jsx(y0.Provider,{value:{theme:t,currentTheme:s,themes:o,toggleTheme:r},children:e})},mw=u.div`
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
`,yw=u.div`
  background-color: var(--secondary-color);
  border-radius: 8px;
  width: 740px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,vw=u.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,kw=u.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
`,ww=u.button`
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
`,bw=u.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,jw=u.div`
  width: 240px;
  background-color: #202225;
  padding: 8px 0;
`,Sw=u.div`
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
`,Cw=u.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`,nr=u.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`,$r=u.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.4;
`,rr=u.div`
  margin-bottom: 32px;
`,st=u.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #40444b;
`,at=u.div`
  color: #dcddde;
  font-size: 16px;
  font-weight: 500;
`,lt=u.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-top: 4px;
`,Ao=u.label`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${e=>e.checked?"#5865f2":"#72767d"};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`,Oo=u.div`
  position: absolute;
  top: 2px;
  left: ${e=>e.checked?"22px":"2px"};
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.2s ease;
`,Tn=u.select`
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
`,Pl=u.input`
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
`;const zw=u.button`
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
`,Ew=u.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`,_w=u.div`
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
`,Tw=u.div`
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
`,Ml=u.div`
  margin-bottom: 20px;
`,Al=u.div`
  color: #b9bbbe;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`,Ol=u.input`
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
`,Rw=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`,Iw=u.button`
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
`,_p=u.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${e=>e.$error?"#f04747":"#43b581"};
`,$w=({isOpen:e,onClose:t})=>{const{theme:n,toggleTheme:r}=gw(),[o,s]=f.useState("my-account"),[a,l]=f.useState({inputDevice:"default",outputDevice:"default",autoInputSensitivity:!0,noiseSuppression:!0,desktopNotifications:!0,soundNotifications:!0,theme:n,messageDisplay:"compact",twoFactorAuth:!1,privacyMode:"friends",language:"en-US",region:"US"}),c="http://localhost:3000",[d,x]=f.useState({nickname:"",username:"",phone:"",avatar:""}),[p,g]=f.useState(!1),[b,k]=f.useState(!1),[j,C]=f.useState(null),[y,h]=f.useState(!1),m=f.useRef(null);f.useEffect(()=>{e&&o==="my-account"&&S()},[e,o]);const w=()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}),S=async()=>{g(!0);try{const I=await fetch(`${c}/users/me`,{headers:w()});if(I.ok){const W=await I.json();x({nickname:W.nickname||"",username:W.username||"",phone:W.phone||"",avatar:W.avatar||""})}}catch{}g(!1)},v=async()=>{k(!0),C(null);try{const I=await fetch(`${c}/users/me`,{method:"PATCH",headers:w(),body:JSON.stringify(d)});if(I.ok){const W=await I.json(),ie=JSON.parse(localStorage.getItem("user")||"{}");localStorage.setItem("user",JSON.stringify({...ie,...W})),C("ok")}else{const W=await I.json().catch(()=>null);C((W==null?void 0:W.message)||"Xatolik yuz berdi")}}catch{C("Tarmoq xatosi yuz berdi")}k(!1),setTimeout(()=>C(null),3e3)},_=()=>{m.current&&m.current.click()},T=async I=>{var R;const W=(R=I.target.files)==null?void 0:R[0];if(!W)return;if(W.size>2*1024*1024){alert("Fayl hajmi juda katta (maksimum 2MB)");return}h(!0),C(null);const ie=new FormData;ie.append("file",W);try{const Q=await fetch(`${c}/users/avatar`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:ie});if(Q.ok){const ue=await Q.json();x(le=>({...le,avatar:ue.avatar}));const ge=JSON.parse(localStorage.getItem("user")||"{}");localStorage.setItem("user",JSON.stringify({...ge,...ue})),C("Avatar yuklandi!"),setTimeout(()=>C(null),3e3)}else{const ue=await Q.json().catch(()=>({}));alert(ue.message||"Avatar yuklashda xatolik")}}catch(Q){console.error("Upload error:",Q),alert("Tarmoq xatosi yuz berdi")}finally{h(!1)}},O=[{id:"my-account",label:"My Account",icon:Mi},{id:"voice-video",label:"Voice & Video",icon:fr},{id:"notifications",label:"Notifications",icon:Bk},{id:"appearance",label:"Appearance",icon:ow},{id:"privacy",label:"Privacy & Security",icon:Pi},{id:"language",label:"Language & Region",icon:Gk},{id:"keybinds",label:"Keybinds",icon:Kk}],N=I=>{l(W=>({...W,[I]:!W[I]}))},z=(I,W)=>{l(ie=>({...ie,[I]:W})),I==="theme"&&r(W)},A=()=>p?i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,color:"#b9bbbe",paddingTop:40},children:[i.jsx(yr,{size:18,style:{animation:"spin 1s linear infinite"}}),i.jsx("span",{children:"Yuklanmoqda…"})]}):i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"My Account"}),i.jsx("input",{type:"file",ref:m,style:{display:"none"},accept:"image/*",onChange:T}),i.jsxs(Ew,{onClick:_,title:"Rasm yuklash",children:[i.jsx(_w,{children:y?i.jsx(yr,{size:32,style:{animation:"spin 1s linear infinite"}}):d.avatar?i.jsx("img",{src:d.avatar,alt:"avatar"}):(d.nickname||d.username||"?").charAt(0).toUpperCase()}),i.jsx(Tw,{children:i.jsx(Fk,{size:22})})]}),i.jsxs(Ml,{children:[i.jsx(Al,{children:"Nickname"}),i.jsx(Ol,{value:d.nickname,onChange:I=>x(W=>({...W,nickname:I.target.value})),placeholder:"Nickname"})]}),i.jsxs(Ml,{children:[i.jsx(Al,{children:"Username"}),i.jsx(Ol,{value:d.username,onChange:I=>x(W=>({...W,username:I.target.value})),placeholder:"username"})]}),i.jsxs(Ml,{children:[i.jsx(Al,{children:"Telefon raqam"}),i.jsx(Ol,{value:d.phone,onChange:I=>x(W=>({...W,phone:I.target.value})),placeholder:"+998 90 000 00 00"})]}),i.jsxs(Rw,{children:[i.jsxs(Iw,{onClick:v,disabled:b,children:[b?i.jsx(yr,{size:14}):i.jsx(xo,{size:14}),b?"Saqlanmoqda…":"Saqlash"]}),j==="ok"&&i.jsxs(_p,{children:[i.jsx(xo,{size:13}),"Muvaffaqiyatli saqlandi!"]}),j&&j!=="ok"&&i.jsxs(_p,{$error:!0,children:[i.jsx(d0,{size:13}),j]})]})]}),ne=()=>i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"Voice & Video"}),i.jsx($r,{children:"Configure your input and output devices for voice and video."}),i.jsxs(rr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"INPUT DEVICE"}),i.jsx(lt,{children:"Choose your microphone"})]}),i.jsxs(Tn,{value:a.inputDevice,onChange:I=>z("inputDevice",I.target.value),children:[i.jsx("option",{value:"default",children:"Default Microphone"}),i.jsx("option",{value:"mic1",children:"Built-in Microphone"}),i.jsx("option",{value:"mic2",children:"USB Microphone"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"OUTPUT DEVICE"}),i.jsx(lt,{children:"Choose your speakers"})]}),i.jsxs(Tn,{value:a.outputDevice,onChange:I=>z("outputDevice",I.target.value),children:[i.jsx("option",{value:"default",children:"Default Speakers"}),i.jsx("option",{value:"speakers1",children:"Built-in Speakers"}),i.jsx("option",{value:"speakers2",children:"USB Headphones"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"VIDEO DEVICE"}),i.jsx(lt,{children:"Choose your camera"})]}),i.jsxs(Tn,{value:a.videoDevice,onChange:I=>z("videoDevice",I.target.value),children:[i.jsx("option",{value:"default",children:"Default Camera"}),i.jsx("option",{value:"camera1",children:"Built-in Camera"}),i.jsx("option",{value:"camera2",children:"USB Camera"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"AUTOMATIC INPUT SENSITIVITY"}),i.jsx(lt,{children:"Automatically adjust input volume"})]}),i.jsxs(Ao,{checked:a.autoInputSensitivity,children:[i.jsx("input",{type:"checkbox",checked:a.autoInputSensitivity,onChange:()=>N("autoInputSensitivity")}),i.jsx(Oo,{checked:a.autoInputSensitivity})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"NOISE SUPPRESSION"}),i.jsx(lt,{children:"Remove background noise from your voice"})]}),i.jsxs(Ao,{checked:a.noiseSuppression,children:[i.jsx("input",{type:"checkbox",checked:a.noiseSuppression,onChange:()=>N("noiseSuppression")}),i.jsx(Oo,{checked:a.noiseSuppression})]})]})]})]}),L=()=>i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"Notifications"}),i.jsx($r,{children:"Manage how you receive notifications."}),i.jsxs(rr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"DESKTOP NOTIFICATIONS"}),i.jsx(lt,{children:"Show notifications on your desktop"})]}),i.jsxs(Ao,{checked:a.desktopNotifications,children:[i.jsx("input",{type:"checkbox",checked:a.desktopNotifications,onChange:()=>N("desktopNotifications")}),i.jsx(Oo,{checked:a.desktopNotifications})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"SOUND NOTIFICATIONS"}),i.jsx(lt,{children:"Play sound when you receive a message"})]}),i.jsxs(Ao,{checked:a.soundNotifications,children:[i.jsx("input",{type:"checkbox",checked:a.soundNotifications,onChange:()=>N("soundNotifications")}),i.jsx(Oo,{checked:a.soundNotifications})]})]})]})]}),X=()=>i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"Appearance"}),i.jsx($r,{children:"Customize how Jamm looks on your device."}),i.jsxs(rr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"THEME"}),i.jsx(lt,{children:"Choose your preferred color theme"})]}),i.jsxs(Tn,{value:a.theme,onChange:I=>z("theme",I.target.value),children:[i.jsx("option",{value:"dark",children:"Dark"}),i.jsx("option",{value:"light",children:"Light"}),i.jsx("option",{value:"auto",children:"Auto"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"MESSAGE DISPLAY"}),i.jsx(lt,{children:"Choose how messages are displayed"})]}),i.jsxs(Tn,{value:a.messageDisplay,onChange:I=>z("messageDisplay",I.target.value),children:[i.jsx("option",{value:"compact",children:"Compact"}),i.jsx("option",{value:"cozy",children:"Cozy"}),i.jsx("option",{value:"roomy",children:"Roomy"})]})]})]})]}),Z=()=>i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"Privacy & Security"}),i.jsx($r,{children:"Manage your privacy and security settings."}),i.jsxs(rr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"TWO-FACTOR AUTHENTICATION"}),i.jsx(lt,{children:"Add an extra layer of security to your account"})]}),i.jsxs(Ao,{checked:a.twoFactorAuth,children:[i.jsx("input",{type:"checkbox",checked:a.twoFactorAuth,onChange:()=>N("twoFactorAuth")}),i.jsx(Oo,{checked:a.twoFactorAuth})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"PRIVACY MODE"}),i.jsx(lt,{children:"Control who can contact you"})]}),i.jsxs(Tn,{value:a.privacyMode,onChange:I=>z("privacyMode",I.target.value),children:[i.jsx("option",{value:"everyone",children:"Everyone"}),i.jsx("option",{value:"friends",children:"Friends of Friends"}),i.jsx("option",{value:"friends",children:"Friends Only"})]})]})]}),i.jsx(rr,{children:i.jsxs(zw,{onClick:()=>alert("Log out functionality"),children:[i.jsx(Zk,{size:16,style:{marginRight:"8px"}}),"Log Out"]})})]}),H=()=>i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"Language & Region"}),i.jsx($r,{children:"Set your language and region preferences."}),i.jsxs(rr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"LANGUAGE"}),i.jsx(lt,{children:"Choose your preferred language"})]}),i.jsxs(Tn,{value:a.language,onChange:I=>z("language",I.target.value),children:[i.jsx("option",{value:"en-US",children:"English (US)"}),i.jsx("option",{value:"es-ES",children:"Español"}),i.jsx("option",{value:"fr-FR",children:"Français"}),i.jsx("option",{value:"de-DE",children:"Deutsch"}),i.jsx("option",{value:"ja-JP",children:"日本語"}),i.jsx("option",{value:"zh-CN",children:"中文"}),i.jsx("option",{value:"ru-RU",children:"Русский"}),i.jsx("option",{value:"uz-UZ",children:"O'zbekcha"})]})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"REGION"}),i.jsx(lt,{children:"Choose your server region"})]}),i.jsxs(Tn,{value:a.region,onChange:I=>z("region",I.target.value),children:[i.jsx("option",{value:"US",children:"United States"}),i.jsx("option",{value:"EU",children:"Europe"}),i.jsx("option",{value:"Asia",children:"Asia"}),i.jsx("option",{value:"RU",children:"Russia"})]})]})]})]}),$=()=>i.jsxs(i.Fragment,{children:[i.jsx(nr,{children:"Keybinds"}),i.jsx($r,{children:"Customize your keyboard shortcuts."}),i.jsxs(rr,{children:[i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"PUSH TO MUTE"}),i.jsx(lt,{children:"Hold to temporarily mute your microphone"})]}),i.jsx(Pl,{type:"text",value:"Ctrl + M",readOnly:!0})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"PUSH TO TALK"}),i.jsx(lt,{children:"Hold to speak"})]}),i.jsx(Pl,{type:"text",value:"Ctrl + T",readOnly:!0})]}),i.jsxs(st,{children:[i.jsxs("div",{children:[i.jsx(at,{children:"TOGGLE MUTE"}),i.jsx(lt,{children:"Toggle microphone on/off"})]}),i.jsx(Pl,{type:"text",value:"Ctrl + Shift + M",readOnly:!0})]})]})]}),G=()=>{switch(o){case"my-account":return A();case"voice-video":return ne();case"notifications":return L();case"appearance":return X();case"privacy":return Z();case"language":return H();case"keybinds":return $();default:return A()}};return e?i.jsx(mw,{onClick:t,children:i.jsxs(yw,{onClick:I=>I.stopPropagation(),children:[i.jsxs(vw,{children:[i.jsx(kw,{children:"User Settings"}),i.jsx(ww,{onClick:t,children:i.jsx(Cr,{size:20})})]}),i.jsxs(bw,{children:[i.jsx(jw,{children:O.map(I=>{const W=I.icon;return i.jsxs(Sw,{active:o===I.id,onClick:()=>s(I.id),children:[i.jsx(W,{size:18}),I.label]},I.id)})}),i.jsx(Cw,{children:G()})]})]})}):null},fn=Object.create(null);fn.open="0";fn.close="1";fn.ping="2";fn.pong="3";fn.message="4";fn.upgrade="5";fn.noop="6";const qs=Object.create(null);Object.keys(fn).forEach(e=>{qs[fn[e]]=e});const cu={type:"error",data:"parser error"},v0=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",k0=typeof ArrayBuffer=="function",w0=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,zd=({type:e,data:t},n,r)=>v0&&t instanceof Blob?n?r(t):Tp(t,r):k0&&(t instanceof ArrayBuffer||w0(t))?n?r(t):Tp(new Blob([t]),r):r(fn[e]+(t||"")),Tp=(e,t)=>{const n=new FileReader;return n.onload=function(){const r=n.result.split(",")[1];t("b"+(r||""))},n.readAsDataURL(e)};function Rp(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}let Nl;function Pw(e,t){if(v0&&e.data instanceof Blob)return e.data.arrayBuffer().then(Rp).then(t);if(k0&&(e.data instanceof ArrayBuffer||w0(e.data)))return t(Rp(e.data));zd(e,!1,n=>{Nl||(Nl=new TextEncoder),t(Nl.encode(n))})}const Ip="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ei=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let e=0;e<Ip.length;e++)ei[Ip.charCodeAt(e)]=e;const Mw=e=>{let t=e.length*.75,n=e.length,r,o=0,s,a,l,c;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);const d=new ArrayBuffer(t),x=new Uint8Array(d);for(r=0;r<n;r+=4)s=ei[e.charCodeAt(r)],a=ei[e.charCodeAt(r+1)],l=ei[e.charCodeAt(r+2)],c=ei[e.charCodeAt(r+3)],x[o++]=s<<2|a>>4,x[o++]=(a&15)<<4|l>>2,x[o++]=(l&3)<<6|c&63;return d},Aw=typeof ArrayBuffer=="function",Ed=(e,t)=>{if(typeof e!="string")return{type:"message",data:b0(e,t)};const n=e.charAt(0);return n==="b"?{type:"message",data:Ow(e.substring(1),t)}:qs[n]?e.length>1?{type:qs[n],data:e.substring(1)}:{type:qs[n]}:cu},Ow=(e,t)=>{if(Aw){const n=Mw(e);return b0(n,t)}else return{base64:!0,data:e}},b0=(e,t)=>{switch(t){case"blob":return e instanceof Blob?e:new Blob([e]);case"arraybuffer":default:return e instanceof ArrayBuffer?e:e.buffer}},j0="",Nw=(e,t)=>{const n=e.length,r=new Array(n);let o=0;e.forEach((s,a)=>{zd(s,!1,l=>{r[a]=l,++o===n&&t(r.join(j0))})})},Lw=(e,t)=>{const n=e.split(j0),r=[];for(let o=0;o<n.length;o++){const s=Ed(n[o],t);if(r.push(s),s.type==="error")break}return r};function Dw(){return new TransformStream({transform(e,t){Pw(e,n=>{const r=n.length;let o;if(r<126)o=new Uint8Array(1),new DataView(o.buffer).setUint8(0,r);else if(r<65536){o=new Uint8Array(3);const s=new DataView(o.buffer);s.setUint8(0,126),s.setUint16(1,r)}else{o=new Uint8Array(9);const s=new DataView(o.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(r))}e.data&&typeof e.data!="string"&&(o[0]|=128),t.enqueue(o),t.enqueue(n)})}})}let Ll;function ds(e){return e.reduce((t,n)=>t+n.length,0)}function fs(e,t){if(e[0].length===t)return e.shift();const n=new Uint8Array(t);let r=0;for(let o=0;o<t;o++)n[o]=e[0][r++],r===e[0].length&&(e.shift(),r=0);return e.length&&r<e[0].length&&(e[0]=e[0].slice(r)),n}function Bw(e,t){Ll||(Ll=new TextDecoder);const n=[];let r=0,o=-1,s=!1;return new TransformStream({transform(a,l){for(n.push(a);;){if(r===0){if(ds(n)<1)break;const c=fs(n,1);s=(c[0]&128)===128,o=c[0]&127,o<126?r=3:o===126?r=1:r=2}else if(r===1){if(ds(n)<2)break;const c=fs(n,2);o=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),r=3}else if(r===2){if(ds(n)<8)break;const c=fs(n,8),d=new DataView(c.buffer,c.byteOffset,c.length),x=d.getUint32(0);if(x>Math.pow(2,21)-1){l.enqueue(cu);break}o=x*Math.pow(2,32)+d.getUint32(4),r=3}else{if(ds(n)<o)break;const c=fs(n,o);l.enqueue(Ed(s?c:Ll.decode(c),t)),r=0}if(o===0||o>e){l.enqueue(cu);break}}}})}const S0=4;function Ve(e){if(e)return Fw(e)}function Fw(e){for(var t in Ve.prototype)e[t]=Ve.prototype[t];return e}Ve.prototype.on=Ve.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this};Ve.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this};Ve.prototype.off=Ve.prototype.removeListener=Ve.prototype.removeAllListeners=Ve.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var n=this._callbacks["$"+e];if(!n)return this;if(arguments.length==1)return delete this._callbacks["$"+e],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===t||r.fn===t){n.splice(o,1);break}return n.length===0&&delete this._callbacks["$"+e],this};Ve.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),n=this._callbacks["$"+e],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,t)}return this};Ve.prototype.emitReserved=Ve.prototype.emit;Ve.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]};Ve.prototype.hasListeners=function(e){return!!this.listeners(e).length};const Ga=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,n)=>n(t,0),At=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),Uw="arraybuffer";function C0(e,...t){return t.reduce((n,r)=>(e.hasOwnProperty(r)&&(n[r]=e[r]),n),{})}const Vw=At.setTimeout,qw=At.clearTimeout;function Ya(e,t){t.useNativeTimers?(e.setTimeoutFn=Vw.bind(At),e.clearTimeoutFn=qw.bind(At)):(e.setTimeoutFn=At.setTimeout.bind(At),e.clearTimeoutFn=At.clearTimeout.bind(At))}const Hw=1.33;function Ww(e){return typeof e=="string"?Gw(e):Math.ceil((e.byteLength||e.size)*Hw)}function Gw(e){let t=0,n=0;for(let r=0,o=e.length;r<o;r++)t=e.charCodeAt(r),t<128?n+=1:t<2048?n+=2:t<55296||t>=57344?n+=3:(r++,n+=4);return n}function z0(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function Yw(e){let t="";for(let n in e)e.hasOwnProperty(n)&&(t.length&&(t+="&"),t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t}function Kw(e){let t={},n=e.split("&");for(let r=0,o=n.length;r<o;r++){let s=n[r].split("=");t[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return t}class Qw extends Error{constructor(t,n,r){super(t),this.description=n,this.context=r,this.type="TransportError"}}class _d extends Ve{constructor(t){super(),this.writable=!1,Ya(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,n,r){return super.emitReserved("error",new Qw(t,n,r)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const n=Ed(t,this.socket.binaryType);this.onPacket(n)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,n={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(n)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const n=Yw(t);return n.length?"?"+n:""}}class Jw extends _d{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const n=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let r=0;this._polling&&(r++,this.once("pollComplete",function(){--r||n()})),this.writable||(r++,this.once("drain",function(){--r||n()}))}else n()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const n=r=>{if(this.readyState==="opening"&&r.type==="open"&&this.onOpen(),r.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(r)};Lw(t,this.socket.binaryType).forEach(n),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,Nw(t,n=>{this.doWrite(n,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",n=this.query||{};return this.opts.timestampRequests!==!1&&(n[this.opts.timestampParam]=z0()),!this.supportsBinary&&!n.sid&&(n.b64=1),this.createUri(t,n)}}let E0=!1;try{E0=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const Xw=E0;function Zw(){}class eb extends Jw{constructor(t){if(super(t),typeof location<"u"){const n=location.protocol==="https:";let r=location.port;r||(r=n?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||r!==t.port}}doWrite(t,n){const r=this.request({method:"POST",data:t});r.on("success",n),r.on("error",(o,s)=>{this.onError("xhr post error",o,s)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(n,r)=>{this.onError("xhr poll error",n,r)}),this.pollXhr=t}}class dn extends Ve{constructor(t,n,r){super(),this.createRequest=t,Ya(this,r),this._opts=r,this._method=r.method||"GET",this._uri=n,this._data=r.data!==void 0?r.data:null,this._create()}_create(){var t;const n=C0(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");n.xdomain=!!this._opts.xd;const r=this._xhr=this.createRequest(n);try{r.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){r.setDisableHeaderCheck&&r.setDisableHeaderCheck(!0);for(let o in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this._opts.extraHeaders[o])}}catch{}if(this._method==="POST")try{r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{r.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(r),"withCredentials"in r&&(r.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(r.timeout=this._opts.requestTimeout),r.onreadystatechange=()=>{var o;r.readyState===3&&((o=this._opts.cookieJar)===null||o===void 0||o.parseCookies(r.getResponseHeader("set-cookie"))),r.readyState===4&&(r.status===200||r.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof r.status=="number"?r.status:0)},0))},r.send(this._data)}catch(o){this.setTimeoutFn(()=>{this._onError(o)},0);return}typeof document<"u"&&(this._index=dn.requestsCount++,dn.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=Zw,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete dn.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}dn.requestsCount=0;dn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",$p);else if(typeof addEventListener=="function"){const e="onpagehide"in At?"pagehide":"unload";addEventListener(e,$p,!1)}}function $p(){for(let e in dn.requests)dn.requests.hasOwnProperty(e)&&dn.requests[e].abort()}const tb=function(){const e=_0({xdomain:!1});return e&&e.responseType!==null}();class nb extends eb{constructor(t){super(t);const n=t&&t.forceBase64;this.supportsBinary=tb&&!n}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new dn(_0,this.uri(),t)}}function _0(e){const t=e.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||Xw))return new XMLHttpRequest}catch{}if(!t)try{return new At[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const T0=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class rb extends _d{get name(){return"websocket"}doOpen(){const t=this.uri(),n=this.opts.protocols,r=T0?{}:C0(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(r.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,n,r)}catch(o){return this.emitReserved("error",o)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let n=0;n<t.length;n++){const r=t[n],o=n===t.length-1;zd(r,this.supportsBinary,s=>{try{this.doWrite(r,s)}catch{}o&&Ga(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",n=this.query||{};return this.opts.timestampRequests&&(n[this.opts.timestampParam]=z0()),this.supportsBinary||(n.b64=1),this.createUri(t,n)}}const Dl=At.WebSocket||At.MozWebSocket;class ob extends rb{createSocket(t,n,r){return T0?new Dl(t,n,r):n?new Dl(t,n):new Dl(t)}doWrite(t,n){this.ws.send(n)}}class ib extends _d{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const n=Bw(Number.MAX_SAFE_INTEGER,this.socket.binaryType),r=t.readable.pipeThrough(n).getReader(),o=Dw();o.readable.pipeTo(t.writable),this._writer=o.writable.getWriter();const s=()=>{r.read().then(({done:l,value:c})=>{l||(this.onPacket(c),s())}).catch(l=>{})};s();const a={type:"open"};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let n=0;n<t.length;n++){const r=t[n],o=n===t.length-1;this._writer.write(r).then(()=>{o&&Ga(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const sb={websocket:ob,webtransport:ib,polling:nb},ab=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,lb=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function uu(e){if(e.length>8e3)throw"URI too long";const t=e,n=e.indexOf("["),r=e.indexOf("]");n!=-1&&r!=-1&&(e=e.substring(0,n)+e.substring(n,r).replace(/:/g,";")+e.substring(r,e.length));let o=ab.exec(e||""),s={},a=14;for(;a--;)s[lb[a]]=o[a]||"";return n!=-1&&r!=-1&&(s.source=t,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=cb(s,s.path),s.queryKey=ub(s,s.query),s}function cb(e,t){const n=/\/{2,9}/g,r=t.replace(n,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&r.splice(0,1),t.slice(-1)=="/"&&r.splice(r.length-1,1),r}function ub(e,t){const n={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(r,o,s){o&&(n[o]=s)}),n}const du=typeof addEventListener=="function"&&typeof removeEventListener=="function",Hs=[];du&&addEventListener("offline",()=>{Hs.forEach(e=>e())},!1);class Gn extends Ve{constructor(t,n){if(super(),this.binaryType=Uw,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(n=t,t=null),t){const r=uu(t);n.hostname=r.host,n.secure=r.protocol==="https"||r.protocol==="wss",n.port=r.port,r.query&&(n.query=r.query)}else n.host&&(n.hostname=uu(n.host).host);Ya(this,n),this.secure=n.secure!=null?n.secure:typeof location<"u"&&location.protocol==="https:",n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.hostname=n.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=n.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},n.transports.forEach(r=>{const o=r.prototype.name;this.transports.push(o),this._transportsByName[o]=r}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},n),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=Kw(this.opts.query)),du&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Hs.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const n=Object.assign({},this.opts.query);n.EIO=S0,n.transport=t,this.id&&(n.sid=this.id);const r=Object.assign({},this.opts,{query:n,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](r)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&Gn.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const n=this.createTransport(t);n.open(),this.setTransport(n)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",n=>this._onClose("transport close",n))}onOpen(){this.readyState="open",Gn.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const n=new Error("server error");n.code=t.data,this._onError(n);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let n=1;for(let r=0;r<this.writeBuffer.length;r++){const o=this.writeBuffer[r].data;if(o&&(n+=Ww(o)),r>0&&n>this._maxPayload)return this.writeBuffer.slice(0,r);n+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,Ga(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,n,r){return this._sendPacket("message",t,n,r),this}send(t,n,r){return this._sendPacket("message",t,n,r),this}_sendPacket(t,n,r,o){if(typeof n=="function"&&(o=n,n=void 0),typeof r=="function"&&(o=r,r=null),this.readyState==="closing"||this.readyState==="closed")return;r=r||{},r.compress=r.compress!==!1;const s={type:t,data:n,options:r};this.emitReserved("packetCreate",s),this.writeBuffer.push(s),o&&this.once("flush",o),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},n=()=>{this.off("upgrade",n),this.off("upgradeError",n),t()},r=()=>{this.once("upgrade",n),this.once("upgradeError",n)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?r():t()}):this.upgrading?r():t()),this}_onError(t){if(Gn.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,n){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),du&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const r=Hs.indexOf(this._offlineEventListener);r!==-1&&Hs.splice(r,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,n),this.writeBuffer=[],this._prevBufferLen=0}}}Gn.protocol=S0;class db extends Gn{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_probe(t){let n=this.createTransport(t),r=!1;Gn.priorWebsocketSuccess=!1;const o=()=>{r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",p=>{if(!r)if(p.type==="pong"&&p.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",n),!n)return;Gn.priorWebsocketSuccess=n.name==="websocket",this.transport.pause(()=>{r||this.readyState!=="closed"&&(x(),this.setTransport(n),n.send([{type:"upgrade"}]),this.emitReserved("upgrade",n),n=null,this.upgrading=!1,this.flush())})}else{const g=new Error("probe error");g.transport=n.name,this.emitReserved("upgradeError",g)}}))};function s(){r||(r=!0,x(),n.close(),n=null)}const a=p=>{const g=new Error("probe error: "+p);g.transport=n.name,s(),this.emitReserved("upgradeError",g)};function l(){a("transport closed")}function c(){a("socket closed")}function d(p){n&&p.name!==n.name&&s()}const x=()=>{n.removeListener("open",o),n.removeListener("error",a),n.removeListener("close",l),this.off("close",c),this.off("upgrading",d)};n.once("open",o),n.once("error",a),n.once("close",l),this.once("close",c),this.once("upgrading",d),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{r||n.open()},200):n.open()}onHandshake(t){this._upgrades=this._filterUpgrades(t.upgrades),super.onHandshake(t)}_filterUpgrades(t){const n=[];for(let r=0;r<t.length;r++)~this.transports.indexOf(t[r])&&n.push(t[r]);return n}}let fb=class extends db{constructor(t,n={}){const r=typeof t=="object"?t:n;(!r.transports||r.transports&&typeof r.transports[0]=="string")&&(r.transports=(r.transports||["polling","websocket","webtransport"]).map(o=>sb[o]).filter(o=>!!o)),super(t,r)}};function pb(e,t="",n){let r=e;n=n||typeof location<"u"&&location,e==null&&(e=n.protocol+"//"+n.host),typeof e=="string"&&(e.charAt(0)==="/"&&(e.charAt(1)==="/"?e=n.protocol+e:e=n.host+e),/^(https?|wss?):\/\//.test(e)||(typeof n<"u"?e=n.protocol+"//"+e:e="https://"+e),r=uu(e)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";const s=r.host.indexOf(":")!==-1?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+s+":"+r.port+t,r.href=r.protocol+"://"+s+(n&&n.port===r.port?"":":"+r.port),r}const hb=typeof ArrayBuffer=="function",gb=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer,R0=Object.prototype.toString,xb=typeof Blob=="function"||typeof Blob<"u"&&R0.call(Blob)==="[object BlobConstructor]",mb=typeof File=="function"||typeof File<"u"&&R0.call(File)==="[object FileConstructor]";function Td(e){return hb&&(e instanceof ArrayBuffer||gb(e))||xb&&e instanceof Blob||mb&&e instanceof File}function Ws(e,t){if(!e||typeof e!="object")return!1;if(Array.isArray(e)){for(let n=0,r=e.length;n<r;n++)if(Ws(e[n]))return!0;return!1}if(Td(e))return!0;if(e.toJSON&&typeof e.toJSON=="function"&&arguments.length===1)return Ws(e.toJSON(),!0);for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&Ws(e[n]))return!0;return!1}function yb(e){const t=[],n=e.data,r=e;return r.data=fu(n,t),r.attachments=t.length,{packet:r,buffers:t}}function fu(e,t){if(!e)return e;if(Td(e)){const n={_placeholder:!0,num:t.length};return t.push(e),n}else if(Array.isArray(e)){const n=new Array(e.length);for(let r=0;r<e.length;r++)n[r]=fu(e[r],t);return n}else if(typeof e=="object"&&!(e instanceof Date)){const n={};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=fu(e[r],t));return n}return e}function vb(e,t){return e.data=pu(e.data,t),delete e.attachments,e}function pu(e,t){if(!e)return e;if(e&&e._placeholder===!0){if(typeof e.num=="number"&&e.num>=0&&e.num<t.length)return t[e.num];throw new Error("illegal attachments")}else if(Array.isArray(e))for(let n=0;n<e.length;n++)e[n]=pu(e[n],t);else if(typeof e=="object")for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&(e[n]=pu(e[n],t));return e}const I0=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],kb=5;var he;(function(e){e[e.CONNECT=0]="CONNECT",e[e.DISCONNECT=1]="DISCONNECT",e[e.EVENT=2]="EVENT",e[e.ACK=3]="ACK",e[e.CONNECT_ERROR=4]="CONNECT_ERROR",e[e.BINARY_EVENT=5]="BINARY_EVENT",e[e.BINARY_ACK=6]="BINARY_ACK"})(he||(he={}));class wb{constructor(t){this.replacer=t}encode(t){return(t.type===he.EVENT||t.type===he.ACK)&&Ws(t)?this.encodeAsBinary({type:t.type===he.EVENT?he.BINARY_EVENT:he.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let n=""+t.type;return(t.type===he.BINARY_EVENT||t.type===he.BINARY_ACK)&&(n+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(n+=t.nsp+","),t.id!=null&&(n+=t.id),t.data!=null&&(n+=JSON.stringify(t.data,this.replacer)),n}encodeAsBinary(t){const n=yb(t),r=this.encodeAsString(n.packet),o=n.buffers;return o.unshift(r),o}}class Rd extends Ve{constructor(t){super(),this.reviver=t}add(t){let n;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");n=this.decodeString(t);const r=n.type===he.BINARY_EVENT;r||n.type===he.BINARY_ACK?(n.type=r?he.EVENT:he.ACK,this.reconstructor=new bb(n),n.attachments===0&&super.emitReserved("decoded",n)):super.emitReserved("decoded",n)}else if(Td(t)||t.base64)if(this.reconstructor)n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,super.emitReserved("decoded",n));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let n=0;const r={type:Number(t.charAt(0))};if(he[r.type]===void 0)throw new Error("unknown packet type "+r.type);if(r.type===he.BINARY_EVENT||r.type===he.BINARY_ACK){const s=n+1;for(;t.charAt(++n)!=="-"&&n!=t.length;);const a=t.substring(s,n);if(a!=Number(a)||t.charAt(n)!=="-")throw new Error("Illegal attachments");r.attachments=Number(a)}if(t.charAt(n+1)==="/"){const s=n+1;for(;++n&&!(t.charAt(n)===","||n===t.length););r.nsp=t.substring(s,n)}else r.nsp="/";const o=t.charAt(n+1);if(o!==""&&Number(o)==o){const s=n+1;for(;++n;){const a=t.charAt(n);if(a==null||Number(a)!=a){--n;break}if(n===t.length)break}r.id=Number(t.substring(s,n+1))}if(t.charAt(++n)){const s=this.tryParse(t.substr(n));if(Rd.isPayloadValid(r.type,s))r.data=s;else throw new Error("invalid payload")}return r}tryParse(t){try{return JSON.parse(t,this.reviver)}catch{return!1}}static isPayloadValid(t,n){switch(t){case he.CONNECT:return ba(n);case he.DISCONNECT:return n===void 0;case he.CONNECT_ERROR:return typeof n=="string"||ba(n);case he.EVENT:case he.BINARY_EVENT:return Array.isArray(n)&&(typeof n[0]=="number"||typeof n[0]=="string"&&I0.indexOf(n[0])===-1);case he.ACK:case he.BINARY_ACK:return Array.isArray(n)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class bb{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const n=vb(this.reconPack,this.buffers);return this.finishedReconstruction(),n}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function jb(e){return typeof e=="string"}const Sb=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};function Cb(e){return e===void 0||Sb(e)}function ba(e){return Object.prototype.toString.call(e)==="[object Object]"}function zb(e,t){switch(e){case he.CONNECT:return t===void 0||ba(t);case he.DISCONNECT:return t===void 0;case he.EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&I0.indexOf(t[0])===-1);case he.ACK:return Array.isArray(t);case he.CONNECT_ERROR:return typeof t=="string"||ba(t);default:return!1}}function Eb(e){return jb(e.nsp)&&Cb(e.id)&&zb(e.type,e.data)}const _b=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Rd,Encoder:wb,get PacketType(){return he},isPacketValid:Eb,protocol:kb},Symbol.toStringTag,{value:"Module"}));function Kt(e,t,n){return e.on(t,n),function(){e.off(t,n)}}const Tb=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class $0 extends Ve{constructor(t,n,r){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=n,r&&r.auth&&(this.auth=r.auth),this._opts=Object.assign({},r),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[Kt(t,"open",this.onopen.bind(this)),Kt(t,"packet",this.onpacket.bind(this)),Kt(t,"error",this.onerror.bind(this)),Kt(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...n){var r,o,s;if(Tb.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(n.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(n),this;const a={type:he.EVENT,data:n};if(a.options={},a.options.compress=this.flags.compress!==!1,typeof n[n.length-1]=="function"){const x=this.ids++,p=n.pop();this._registerAckCallback(x,p),a.id=x}const l=(o=(r=this.io.engine)===null||r===void 0?void 0:r.transport)===null||o===void 0?void 0:o.writable,c=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!l||(c?(this.notifyOutgoingListeners(a),this.packet(a)):this.sendBuffer.push(a)),this.flags={},this}_registerAckCallback(t,n){var r;const o=(r=this.flags.timeout)!==null&&r!==void 0?r:this._opts.ackTimeout;if(o===void 0){this.acks[t]=n;return}const s=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let l=0;l<this.sendBuffer.length;l++)this.sendBuffer[l].id===t&&this.sendBuffer.splice(l,1);n.call(this,new Error("operation has timed out"))},o),a=(...l)=>{this.io.clearTimeoutFn(s),n.apply(this,l)};a.withError=!0,this.acks[t]=a}emitWithAck(t,...n){return new Promise((r,o)=>{const s=(a,l)=>a?o(a):r(l);s.withError=!0,n.push(s),this.emit(t,...n)})}_addToQueue(t){let n;typeof t[t.length-1]=="function"&&(n=t.pop());const r={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((o,...s)=>(this._queue[0],o!==null?r.tryCount>this._opts.retries&&(this._queue.shift(),n&&n(o)):(this._queue.shift(),n&&n(null,...s)),r.pending=!1,this._drainQueue())),this._queue.push(r),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const n=this._queue[0];n.pending&&!t||(n.pending=!0,n.tryCount++,this.flags=n.flags,this.emit.apply(this,n.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:he.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,n){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,n),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(r=>String(r.id)===t)){const r=this.acks[t];delete this.acks[t],r.withError&&r.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case he.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case he.EVENT:case he.BINARY_EVENT:this.onevent(t);break;case he.ACK:case he.BINARY_ACK:this.onack(t);break;case he.DISCONNECT:this.ondisconnect();break;case he.CONNECT_ERROR:this.destroy();const r=new Error(t.data.message);r.data=t.data.data,this.emitReserved("connect_error",r);break}}onevent(t){const n=t.data||[];t.id!=null&&n.push(this.ack(t.id)),this.connected?this.emitEvent(n):this.receiveBuffer.push(Object.freeze(n))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const n=this._anyListeners.slice();for(const r of n)r.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const n=this;let r=!1;return function(...o){r||(r=!0,n.packet({type:he.ACK,id:t,data:o}))}}onack(t){const n=this.acks[t.id];typeof n=="function"&&(delete this.acks[t.id],n.withError&&t.data.unshift(null),n.apply(this,t.data))}onconnect(t,n){this.id=t,this.recovered=n&&this._pid===n,this._pid=n,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:he.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const n=this._anyListeners;for(let r=0;r<n.length;r++)if(t===n[r])return n.splice(r,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const n=this._anyOutgoingListeners;for(let r=0;r<n.length;r++)if(t===n[r])return n.splice(r,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const n=this._anyOutgoingListeners.slice();for(const r of n)r.apply(this,t.data)}}}function Co(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}Co.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=Math.floor(t*10)&1?e+n:e-n}return Math.min(e,this.max)|0};Co.prototype.reset=function(){this.attempts=0};Co.prototype.setMin=function(e){this.ms=e};Co.prototype.setMax=function(e){this.max=e};Co.prototype.setJitter=function(e){this.jitter=e};class hu extends Ve{constructor(t,n){var r;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(n=t,t=void 0),n=n||{},n.path=n.path||"/socket.io",this.opts=n,Ya(this,n),this.reconnection(n.reconnection!==!1),this.reconnectionAttempts(n.reconnectionAttempts||1/0),this.reconnectionDelay(n.reconnectionDelay||1e3),this.reconnectionDelayMax(n.reconnectionDelayMax||5e3),this.randomizationFactor((r=n.randomizationFactor)!==null&&r!==void 0?r:.5),this.backoff=new Co({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(n.timeout==null?2e4:n.timeout),this._readyState="closed",this.uri=t;const o=n.parser||_b;this.encoder=new o.Encoder,this.decoder=new o.Decoder,this._autoConnect=n.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var n;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(n=this.backoff)===null||n===void 0||n.setMin(t),this)}randomizationFactor(t){var n;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(n=this.backoff)===null||n===void 0||n.setJitter(t),this)}reconnectionDelayMax(t){var n;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(n=this.backoff)===null||n===void 0||n.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new fb(this.uri,this.opts);const n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;const o=Kt(n,"open",function(){r.onopen(),t&&t()}),s=l=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",l),t?t(l):this.maybeReconnectOnOpen()},a=Kt(n,"error",s);if(this._timeout!==!1){const l=this._timeout,c=this.setTimeoutFn(()=>{o(),s(new Error("timeout")),n.close()},l);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(o),this.subs.push(a),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(Kt(t,"ping",this.onping.bind(this)),Kt(t,"data",this.ondata.bind(this)),Kt(t,"error",this.onerror.bind(this)),Kt(t,"close",this.onclose.bind(this)),Kt(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(n){this.onclose("parse error",n)}}ondecoded(t){Ga(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,n){let r=this.nsps[t];return r?this._autoConnect&&!r.active&&r.connect():(r=new $0(this,t,n),this.nsps[t]=r),r}_destroy(t){const n=Object.keys(this.nsps);for(const r of n)if(this.nsps[r].active)return;this._close()}_packet(t){const n=this.encoder.encode(t);for(let r=0;r<n.length;r++)this.engine.write(n[r],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,n){var r;this.cleanup(),(r=this.engine)===null||r===void 0||r.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,n),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const n=this.backoff.duration();this._reconnecting=!0;const r=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(o=>{o?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",o)):t.onreconnect()}))},n);this.opts.autoUnref&&r.unref(),this.subs.push(()=>{this.clearTimeoutFn(r)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const No={};function no(e,t){typeof e=="object"&&(t=e,e=void 0),t=t||{};const n=pb(e,t.path||"/socket.io"),r=n.source,o=n.id,s=n.path,a=No[o]&&s in No[o].nsps,l=t.forceNew||t["force new connection"]||t.multiplex===!1||a;let c;return l?c=new hu(r,t):(No[o]||(No[o]=new hu(r,t)),c=No[o]),n.query&&!t.query&&(t.query=n.queryKey),c.socket(n.path,t)}Object.assign(no,{Manager:hu,Socket:$0,io:no,connect:no});const P0=f.createContext(),$t="http://localhost:3000",Vi=()=>f.useContext(P0),Rb=({children:e})=>{const[t,n]=f.useState([]),[r,o]=f.useState(!0),[s,a]=f.useState("home"),[l,c]=f.useState(0),[d,x]=f.useState(null),[p,g]=f.useState({});f.useEffect(()=>{const T=localStorage.getItem("token");if(!T)return;const O=$t.replace(/\/$/,""),N=no(`${O}/chats`,{auth:{token:T},transports:["websocket"],reconnectionAttempts:5});return N.on("connect",()=>{console.log("Connected to /chats namespace")}),x(N),()=>{N.disconnect()}},[]),f.useEffect(()=>{if(!d)return;const T=A=>{n(ne=>{var W;const L=ne.findIndex(ie=>ie.id===A.chatId);if(L===-1)return k(),ne;const X=[...ne],Z={...X[L]},H=String(Z.urlSlug)===String(l)||String(Z.id)===String(l);Z.lastMessage=A.content,Z.hasMessages=!0,Z.time=new Date(A.createdAt).toLocaleDateString("uz-UZ",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});const $=JSON.parse(localStorage.getItem("user")||"{}"),G=$._id||$.id,I=(((W=A.senderId)==null?void 0:W._id)||A.senderId)===G;return!H&&!I&&(Z.unread=(Z.unread||0)+1),X.splice(L,1),X.unshift(Z),X})},O=({chatId:A,readByUserId:ne,messageIds:L})=>{const X=JSON.parse(localStorage.getItem("user")||"{}"),Z=X._id||X.id;String(ne)===String(Z)&&n(H=>H.map($=>String($.id)===String(A)?{...$,unread:Math.max(0,($.unread||0)-L.length)}:$))},N=A=>{const ne=JSON.parse(localStorage.getItem("user")||"{}"),L=(ne==null?void 0:ne._id)||(ne==null?void 0:ne.id);if(A.members&&L&&!A.members.some(Z=>{const H=Z._id||Z.id||Z;return String(H)===String(L)})){n(Z=>Z.filter(H=>H.id!==A.chatId));return}n(X=>{const Z=X.findIndex(H=>H.id===A.chatId);if(Z!==-1){const H=[...X];return H[Z]={...H[Z],...A},H}return X})},z=({chatId:A,userId:ne,isTyping:L})=>{g(X=>{const Z={...X[A]||{}};return L?Z[ne]=Date.now():delete Z[ne],{...X,[A]:Z}})};return d.on("message_new",T),d.on("messages_read",O),d.on("chat_updated",N),d.on("user_typing",z),()=>{d.off("message_new"),d.off("messages_read"),d.off("chat_updated"),d.off("user_typing")}},[d,l]),f.useEffect(()=>{const T=setInterval(()=>{const O=Date.now();g(N=>{let z=!1;const A={...N};return Object.keys(A).forEach(ne=>{const L={...A[ne]};Object.keys(L).forEach(X=>{O-L[X]>5e3&&(delete L[X],z=!0)}),Object.keys(L).length===0?delete A[ne]:A[ne]=L}),z?A:N})},2e3);return()=>clearInterval(T)},[]);const b=f.useCallback((T,O)=>{!d||!T||d.emit(O?"typing_start":"typing_stop",{chatId:T})},[d]),k=f.useCallback(async()=>{try{const T=localStorage.getItem("token");if(!T)return;const N=await(await fetch(`${$t}/chats`,{headers:{Authorization:`Bearer ${T}`}})).json(),z=JSON.parse(localStorage.getItem("user")||"{}"),A=z._id||z.id,ne=N.map(L=>{var Z;let X={name:"Noma'lum",avatar:""};if(L.isGroup)X={name:L.name,avatar:L.avatar||((Z=L.name)==null?void 0:Z.charAt(0)),urlSlug:L.privateurl||L._id};else{const H=L.members.find($=>String($._id||$.id)!==String(A));H?X={name:H.nickname||H.username,avatar:H.avatar||(H.nickname||H.username).charAt(0),urlSlug:H.username}:X={name:"Saqlangan xabarlar",avatar:"",urlSlug:L._id,isSavedMessages:!0}}return{id:L._id,jammId:L.jammId,type:L.isGroup?"group":"user",name:X.name,avatar:X.avatar,isSavedMessages:X.isSavedMessages,urlSlug:L.jammId?String(L.jammId):X.urlSlug||L._id,unread:L.unreadCount||0,lastMessage:L.lastMessage||(L.isGroup?"Guruh yaratildi":"Suhbat boshlandi"),time:L.lastMessageAt?new Date(L.lastMessageAt).toLocaleDateString("uz-UZ",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"Oldin",members:L.members,createdBy:L.createdBy,admins:L.admins||[]}});n(ne)}catch(T){console.error(T)}finally{o(!1)}},[]),j=async T=>{const N=await(await fetch(`${$t}/chats`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(T)})).json();return k(),String(N.jammId||N._id)},C=async(T,O)=>{await fetch(`${$t}/chats/${T}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify(O)}),k()},y=f.useCallback(async T=>T?(await(await fetch(`${$t}/chats/${T}/messages`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()).map(z=>{var A,ne,L,X,Z,H,$;return{id:z._id,user:((A=z.senderId)==null?void 0:A.nickname)||((ne=z.senderId)==null?void 0:ne.username),senderId:((L=z.senderId)==null?void 0:L._id)||z.senderId,avatar:((X=z.senderId)==null?void 0:X.avatar)||(($=((Z=z.senderId)==null?void 0:Z.nickname)||((H=z.senderId)==null?void 0:H.username))==null?void 0:$.charAt(0))||"U",content:z.content,timestamp:new Date(z.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),readBy:z.readBy||[]}}):[],[]),h=f.useCallback(async(T,O,N)=>{const z=await fetch(`${$t}/chats/${T}/messages`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({content:O,replayToId:N})});return k(),z.json()},[k]),m=f.useCallback((T,O)=>{!d||!T||!(O!=null&&O.length)||d.emit("read_messages",{chatId:T,messageIds:O})},[d]),w=f.useCallback(async T=>(await fetch(`${$t}/chats/resolve/${T}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json(),[]),S=async T=>T?(await(await fetch(`${$t}/users/search?q=${T}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})).json()).map(z=>({id:z._id,name:z.nickname||z.username,username:z.username,avatar:z.avatar||(z.nickname||z.username).charAt(0)})):[],v=async T=>{const O=await fetch(`${$t}/users/by-username/${T}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});return O.ok?O.json():null};f.useEffect(()=>{k()},[k]),f.useEffect(()=>{!l||l==="0"||n(T=>T.map(O=>String(O.urlSlug)===String(l)||String(O.id)===String(l)?{...O,unread:0}:O))},[l]);const _={chats:t,loading:r,fetchChats:k,createChat:j,editChat:C,fetchMessages:y,sendMessage:h,markMessagesAsRead:m,resolveChatSlug:w,searchUsers:S,getUserByUsername:v,selectedNav:s,setSelectedNav:a,selectedChannel:l,setSelectedChannel:c,chatSocket:d,typingUsers:p,sendTypingStatus:b,previewGroupChat:async T=>{const O=await fetch(`${$t}/chats/preview/${T}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!O.ok)throw new Error("Guruh topilmadi");return O.json()},joinGroupChat:async T=>{const O=await fetch(`${$t}/chats/join/${T}`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!O.ok)throw new Error("Guruhga qo'shilish imkonsiz");return k(),O.json()},deleteMessage:async T=>{await fetch(`${$t}/chats/messages/${T}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}),k()}};return i.jsx(P0.Provider,{value:_,children:e})},Ib=u.div`
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
`,Pp=u.button`
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
`,$b=u.div`
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
`,Pb=[{id:"home",icon:Jk,label:"Dashboard"},{id:"users",icon:Mi,label:"Foydalanuvchilar"},{id:"groups",icon:x0,label:"Guruhlar"},{id:"meets",icon:kn,label:"Video Meetlar"},{id:"courses",icon:wd,label:"Kurslar"}],Mb=({onSelectNav:e})=>{const{selectedNav:t,setSelectedNav:n}=Vi(),[r,o]=f.useState(!1),s=a=>{e?e(a):n(a)};return i.jsxs(i.Fragment,{children:[i.jsxs(Ib,{children:[Pb.map(a=>i.jsx(Pp,{active:t===a.id,onClick:()=>s(a.id),title:a.label,children:i.jsx(a.icon,{size:20})},a.id)),i.jsx($b,{}),i.jsx(Pp,{title:"Sozlamalar",onClick:()=>o(!0),children:i.jsx(lw,{size:20})})]}),i.jsx($w,{isOpen:r,onClose:()=>o(!1)})]})},M0=f.createContext(),Mp="http://localhost:3000",Ab=2e4,A0=()=>f.useContext(M0),Ob=({children:e})=>{const[t,n]=f.useState(new Map),[r,o]=f.useState(!1),s=f.useRef(null),a=f.useRef(null);f.useEffect(()=>{const p=localStorage.getItem("token");if(!p)return;const g=no(`${Mp}/presence`,{auth:{token:p},transports:["websocket","polling"],reconnection:!0,reconnectionDelay:2e3,reconnectionAttempts:10});return s.current=g,g.on("connect",()=>{o(!0),a.current=setInterval(()=>{g.emit("presence:ping")},Ab)}),g.on("disconnect",()=>{o(!1),a.current&&(clearInterval(a.current),a.current=null)}),g.on("user_online",({userId:b})=>{n(k=>{const j=new Map(k);return j.set(b,!0),j})}),g.on("user_offline",({userId:b})=>{n(k=>{const j=new Map(k);return j.delete(b),j})}),g.on("connect_error",b=>{console.error("Presence connection error:",b.message)}),()=>{a.current&&clearInterval(a.current),g.disconnect(),s.current=null}},[]);const l=f.useCallback(p=>t.has(p),[t]),c=f.useCallback(async p=>{try{const g=localStorage.getItem("token"),b=await fetch(`${Mp}/presence/status/bulk`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({userIds:p})});if(!b.ok)return{};const k=await b.json();return n(j=>{const C=new Map(j);for(const[y,h]of Object.entries(k.statuses||{}))h?C.set(y,!0):C.delete(y);return C}),k.statuses}catch(g){return console.error("Failed to fetch bulk statuses:",g),{}}},[]),d=f.useCallback((p=[])=>!p||p.length===0?0:p.filter(g=>{const b=typeof g=="object"?g._id:g;return t.has(b)}).length,[t]),x={onlineUsers:t,connected:r,isUserOnline:l,getOnlineCount:d,fetchBulkStatuses:c};return i.jsx(M0.Provider,{value:x,children:e})},Id="jamm_meets";function Ai(){try{return JSON.parse(localStorage.getItem(Id)||"[]")}catch{return[]}}function Nb({roomId:e,title:t,isPrivate:n,isCreator:r}){const o=Ai().filter(s=>s.roomId!==e);o.unshift({roomId:e,title:t,isPrivate:n,isCreator:r,joinedAt:Date.now()}),localStorage.setItem(Id,JSON.stringify(o.slice(0,20)))}function Lb(e){const t=Ai().filter(n=>n.roomId!==e);localStorage.setItem(Id,JSON.stringify(t))}function Db(e){return Ai().find(t=>t.roomId===e)||null}const Bb=u.div`
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
`,Fb=u.div`
  padding: 16px;
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`,Ap=u.button`
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
`;const Ub=u.input`
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
`,Vb=u.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,Bl=u.button`
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
`,qb=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`,ps=u.div`
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
`,Op=u(Lm)`
  text-decoration: none;
  color: inherit;
  display: block;
`,Np=u.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`,hs=u.div`
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
`,Hb=u.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${e=>e.$online?"#43b581":"#72767d"};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`,Wb=u.span`
  font-size: 12px;
  color: #43b581;
`,gs=u.div`
  flex: 1;
  min-width: 0;
`,xs=u.div`
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
`,ms=u.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Lp=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`,Dp=u.div`
  font-size: 12px;
  color: #72767d;
  margin-bottom: 2px;
`,Gb=u.div`
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
`;const Yb=({onOpenCreateGroup:e,onOpenCreateMeet:t})=>{const{chats:n,searchUsers:r,createChat:o,selectedNav:s,setSelectedNav:a,selectedChannel:l,setSelectedChannel:c}=Vi(),{isUserOnline:d,getOnlineCount:x,fetchBulkStatuses:p}=A0(),g=_r(),[b,k]=f.useState(""),[j,C]=f.useState("all"),[y,h]=f.useState([]),[m,w]=f.useState(!1);f.useEffect(()=>{if(!n||n.length===0)return;const z=new Set;n.forEach(ne=>{ne.members&&ne.members.forEach(L=>{L._id?z.add(L._id):L.id&&z.add(L.id)})});const A=Array.from(z);A.length>0&&p(A)},[n,p]),f.useEffect(()=>{if(s==="users"&&b.trim().length>0){const z=setTimeout(async()=>{w(!0);const A=await r(b);h(A),w(!1)},500);return()=>clearTimeout(z)}else h([])},[b,s,r]);const S=async z=>{const A=localStorage.getItem("user"),ne=A?JSON.parse(A):{},L=ne._id||ne.id,X=z.id||z._id,Z=n.find(H=>H.isGroup||!H.members?!1:X===L?H.isSavedMessages:!H.isSavedMessages&&H.members.some($=>($._id||$.id)===X));if(Z)g(`/a/${Z.urlSlug}`);else try{const H=await o({isGroup:!1,memberIds:[z.id]});H&&(g(`/a/${H}`),k(""))}catch(H){console.error("Failed to start private chat",H)}},v=Ct.useMemo(()=>{let z=n;return s==="users"?z=z.filter(A=>A.type==="user"&&(A.hasMessages||A.id===l)):s==="groups"?z=z.filter(A=>A.type==="group"):s==="home"&&(z=z.filter(A=>A.type==="group"||A.type==="user"&&(A.hasMessages||A.id===l))),b&&(z=z.filter(A=>A.name.toLowerCase().includes(b.toLowerCase()))),j==="today"?(new Date().toDateString(),z=z.filter(A=>A.time.includes(":")||A.time==="Kecha")):j==="week"&&(z=z.filter(A=>A.time.includes("Dushanba")||A.time.includes("Kecha"))),z},[s,b,j,n,l]),[_,T]=f.useState([]);f.useEffect(()=>{s==="meets"&&T(Ai())},[s]);function O(z){const A=(Date.now()-z)/1e3;return A<60?"hozir":A<3600?`${Math.floor(A/60)} daq oldin`:A<86400?`${Math.floor(A/3600)} soat oldin`:`${Math.floor(A/86400)} kun oldin`}const N=(z,A)=>{z.preventDefault(),z.stopPropagation(),Lb(A),T(Ai())};return i.jsxs(Bb,{children:[i.jsxs(Fb,{children:[i.jsx(Ub,{type:"text",placeholder:"Qidirish...",value:b,onChange:z=>k(z.target.value),style:{flex:1,marginRight:s==="groups"||s==="meets"?"12px":"0"}}),s==="groups"&&i.jsx(Ap,{onClick:e,title:"Guruh yaratish",children:i.jsx($i,{size:18})}),s==="meets"&&i.jsx(Ap,{onClick:t,title:"Yangi meet",children:i.jsx($i,{size:18})})]}),s==="home"&&i.jsxs(Vb,{children:[i.jsx(Bl,{active:j==="all",onClick:()=>C("all"),children:"Barchasi"}),i.jsx(Bl,{active:j==="today",onClick:()=>C("today"),children:"Bugun"}),i.jsx(Bl,{active:j==="week",onClick:()=>C("week"),children:"Hafta"})]}),i.jsx(qb,{children:s==="meets"?_.length===0?i.jsxs("div",{style:{padding:32,textAlign:"center",color:"var(--text-muted-color)"},children:[i.jsx(kn,{size:32,style:{marginBottom:10,opacity:.4}}),i.jsx("div",{children:"Hali hech qanday meet yo'q"})]}):_.map(z=>i.jsx(Op,{to:`/join/${z.roomId}`,children:i.jsxs(ps,{children:[i.jsx(hs,{isGroup:!0,children:i.jsx(kn,{size:18})}),i.jsxs(gs,{children:[i.jsx(xs,{children:z.title||"Nomsiz meet"}),i.jsxs(ms,{children:[z.isPrivate?"🔒 Private":"🌐 Open"," · ",z.isCreator?"Yaratuvchi":"Ishtirokchi"]})]}),i.jsxs(Lp,{children:[i.jsx(Dp,{children:O(z.joinedAt)}),i.jsx("button",{onClick:A=>N(A,z.roomId),title:"O'chirish",style:{background:"none",border:"none",color:"#4f545c",cursor:"pointer",padding:2},children:i.jsx(Sd,{size:12})})]})]})},z.roomId)):s==="users"&&b.trim()?i.jsx(i.Fragment,{children:m?i.jsx("div",{style:{padding:"20px",textAlign:"center",color:"var(--text-muted-color)"},children:"Qidirilmoqda..."}):y.length>0?y.map(z=>{var A;return i.jsxs(ps,{onClick:()=>S(z),style:{cursor:"pointer"},children:[i.jsx(hs,{isGroup:!1,children:((A=z==null?void 0:z.avatar)==null?void 0:A.length)>1?i.jsx("img",{src:z.avatar,alt:z.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):z.name.charAt(0)}),i.jsxs(gs,{children:[i.jsx(xs,{children:z.name}),i.jsxs(ms,{children:["@",z.username]})]})]},z.id)}):i.jsx("div",{style:{padding:"20px",textAlign:"center",color:"var(--text-muted-color)"},children:"Foydalanuvchi topilmadi"})}):i.jsxs(i.Fragment,{children:[(s==="users"||s==="home")&&!b.trim()&&!n.some(z=>z.isSavedMessages)&&i.jsxs(ps,{onClick:()=>{const z=localStorage.getItem("user");if(z){const A=JSON.parse(z),ne=A._id||A.id;ne&&S({id:ne})}},style:{cursor:"pointer"},children:[i.jsx(Np,{children:i.jsx(hs,{style:{backgroundColor:"#0288D1"},children:i.jsx(wa,{size:18,color:"white",fill:"white"})})}),i.jsxs(gs,{children:[i.jsx(xs,{children:"Saqlangan xabarlar"}),i.jsx(ms,{children:"O'zingizga xabar yozish"})]})]}),v.map(z=>{var $;const A=JSON.parse(localStorage.getItem("user")||"{}"),ne=A._id||A.id,L=z.type!=="group"&&z.members?z.members.find(G=>G._id!==ne):null,X=L==null?void 0:L._id,Z=X?d(X):!1,H=z.type==="group"?x(z.members):0;return i.jsx(Op,{to:`/a/${z.urlSlug}`,children:i.jsxs(ps,{active:l===z.urlSlug,children:[i.jsxs(Np,{children:[i.jsx(hs,{$isGroup:z.type==="group"||z.isSavedMessages,style:z.isSavedMessages?{backgroundColor:"#0288D1"}:{},children:z.isSavedMessages?i.jsx(wa,{size:18,color:"white",fill:"white"}):(($=z.avatar)==null?void 0:$.length)>1?i.jsx("img",{src:z.avatar,alt:z.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):z.type==="group"?z.name.charAt(0):z.name.split(" ").map(G=>G[0]).join("")}),z.type!=="group"&&!z.isSavedMessages&&i.jsx(Hb,{$online:Z})]}),i.jsxs(gs,{children:[i.jsx(xs,{children:z.name}),i.jsx(ms,{children:z.type==="group"&&H>0?i.jsxs(i.Fragment,{children:[z.lastMessage," · ",i.jsxs(Wb,{children:[H," online"]})]}):z.lastMessage})]}),i.jsxs(Lp,{children:[i.jsx(Dp,{children:z.time}),z.unread>0&&i.jsx(Gb,{children:z.unread})]})]})},z.id)})]})})]})},Kb=u.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  z-index: 10000;
  display: flex;
  flex-direction: column;
`,Qb=u.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`,Jb=u.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`,Xb=u.div`
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
`,Bp=u.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #2f3136;
`,Fp=u.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2f3136;
  color: #dcddde;
`,Up=u.div`
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
`,Vp=u.div`
  font-size: 18px;
  font-weight: 600;
  color: #dcddde;
  margin-bottom: 8px;
`,qp=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b9bbbe;
`,Hp=u.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,Wp=u.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${e=>e.active?"#43b581":"#72767d"};
  transition: background-color 0.3s ease;
`,Zb=u.div`
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
`,ys=u.button`
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
`,ej=({isOpen:e,onClose:t,user:n})=>{const[r,o]=f.useState(!1),[s,a]=f.useState(!1),[l,c]=f.useState(!1),[d,x]=f.useState(!1),[p,g]=f.useState(0),[b,k]=f.useState(!1),[j,C]=f.useState("bottom-right"),y=f.useRef(null),h=f.useRef(null);f.useEffect(()=>{if(e){const S=setInterval(()=>{g(v=>v+1)},1e3);return()=>clearInterval(S)}},[e]),f.useEffect(()=>{const S=setInterval(()=>{k(Math.random()>.6)},2e3);return()=>clearInterval(S)},[]);const m=()=>{x(!d)},w=S=>{S.preventDefault();const v=S.clientX,_=S.clientY,T=S.target.getBoundingClientRect(),O=v-T.left,N=_-T.top,z=ne=>{const L=ne.clientX-O,X=ne.clientY-N,Z=window.innerWidth,H=window.innerHeight;let $="bottom-right";L<Z/2?$=X<H/2?"top-left":"bottom-left":$=X<H/2?"top-right":"bottom-right",C($)},A=()=>{document.removeEventListener("mousemove",z),document.removeEventListener("mouseup",A)};document.addEventListener("mousemove",z),document.addEventListener("mouseup",A)};return e?i.jsx(Kb,{children:i.jsxs(Qb,{children:[i.jsx(Jb,{children:d?i.jsx(Bp,{ref:y,autoPlay:!0,muted:!0,playsInline:!0}):i.jsx(Bp,{ref:h,autoPlay:!0,playsInline:!0})}),i.jsx(Xb,{position:j,onClick:m,onMouseDown:w,children:d?i.jsxs(Fp,{children:[i.jsx(Up,{children:(n||"User")[0]}),i.jsx(Vp,{children:n||"User"}),i.jsxs(qp,{children:[i.jsxs(Hp,{children:[i.jsx(Wp,{active:b}),i.jsx("span",{children:b?"Speaking...":"Silent"})]}),r&&i.jsx(vr,{size:16})]})]}):i.jsxs(Fp,{children:[i.jsx(Up,{children:"You"}),i.jsx(Vp,{children:"You"}),i.jsxs(qp,{children:[i.jsxs(Hp,{children:[i.jsx(Wp,{active:!1}),i.jsx("span",{children:"Silent"})]}),r&&i.jsx(vr,{size:16})]})]})}),i.jsxs(Zb,{children:[i.jsx(ys,{onClick:()=>o(!r),active:!r,children:r?i.jsx(vr,{size:24}):i.jsx(fr,{size:24})}),i.jsx(ys,{onClick:()=>a(!s),active:!s,children:s?i.jsx(to,{size:24}):i.jsx(kn,{size:24})}),i.jsx(ys,{onClick:()=>c(!l),active:l,children:l?i.jsx(h0,{size:24}):i.jsx(lu,{size:24})}),i.jsx(ys,{variant:"primary",onClick:t,children:i.jsx(Wa,{size:24})})]})]})}):null},Gp=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.value=800,t.type="sine",n.gain.value=.3,t.start(),t.stop(e.currentTime+.2),setTimeout(()=>{const r=e.createOscillator(),o=e.createGain();r.connect(o),o.connect(e.destination),r.frequency.value=800,r.type="sine",o.gain.value=.3,r.start(),r.stop(e.currentTime+.2)},400)},Yp=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.value=600,t.type="sine",n.gain.value=.4,setTimeout(()=>{const r=e.createOscillator(),o=e.createGain();r.connect(o),o.connect(e.destination),r.frequency.value=600,r.type="sine",o.gain.value=.4},800)},tj=u.div`
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
`,nj=u.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,rj=u.div`
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
`,oj=u.div`
  text-align: center;
`,ij=u.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,sj=u.div`
  color: #43b581;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,aj=u.div`
  display: flex;
  gap: 16px;
`,Kp=u.button`
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
`,lj=({isOpen:e,onAccept:t,onReject:n,caller:r})=>{var c;const[o,s]=f.useState(0),a=f.useRef(null);f.useEffect(()=>{if(e){Yp(),a.current=setInterval(()=>{Yp()},2e3);const d=setInterval(()=>{s(x=>x+1)},1e3);return()=>{d&&clearInterval(d),a.current&&(clearInterval(a.current),a.current=null)}}},[e]);const l=d=>{const x=Math.floor(d/60),p=d%60;return`${x.toString().padStart(2,"0")}:${p.toString().padStart(2,"0")}`};return e?i.jsx(tj,{children:i.jsxs(nj,{children:[i.jsx(rj,{children:((c=r==null?void 0:r.name)==null?void 0:c[0])||"U"}),i.jsxs(oj,{children:[i.jsx(ij,{children:(r==null?void 0:r.name)||"Unknown"}),i.jsxs(sj,{children:[i.jsx(mr,{size:16}),l(o)]})]}),i.jsxs(aj,{children:[i.jsx(Kp,{variant:"accept",onClick:t,children:i.jsx(bd,{size:24})}),i.jsx(Kp,{onClick:n,children:i.jsx(Wa,{size:24})})]})]})}):null},cj=u.div`
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
`,uj=u.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,dj=u.div`
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
`,fj=u.div`
  text-align: center;
`,pj=u.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,Qp=u.div`
  color: #b9bbbe;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,hj=u.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`,gj=u.button`
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
`,xj=u.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`,Fl=u.div`
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
`,Jp=({isOpen:e,onCancel:t,target:n})=>{var l;const[r,o]=f.useState(0),s=f.useRef(null);f.useEffect(()=>{if(e){Gp(),s.current=setInterval(()=>{Gp()},1500);const c=setInterval(()=>{o(d=>d+1)},1e3);return()=>{c&&clearInterval(c),s.current&&(clearInterval(s.current),s.current=null)}}},[e]);const a=c=>{const d=Math.floor(c/60),x=c%60;return`${d.toString().padStart(2,"0")}:${x.toString().padStart(2,"0")}`};return e?i.jsx(cj,{children:i.jsxs(uj,{children:[i.jsx(dj,{children:((l=n==null?void 0:n.name)==null?void 0:l[0])||"U"}),i.jsxs(fj,{children:[i.jsx(pj,{children:(n==null?void 0:n.name)||"Unknown"}),i.jsxs(Qp,{children:[i.jsx(m0,{size:16}),"Calling..."]}),i.jsxs(Qp,{children:[i.jsx(mr,{size:16}),a(r)]})]}),i.jsxs(xj,{children:[i.jsx(Fl,{}),i.jsx(Fl,{delay:.2}),i.jsx(Fl,{delay:.4})]}),i.jsx(hj,{children:i.jsxs(gj,{variant:"cancel",onClick:t,children:[i.jsx(Wa,{size:20}),"Cancel"]})})]})}):null},mj="http://localhost:3000",yj=u.div`
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
`,vj=u.div`
  background-color: var(--secondary-color, #2f3136);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,kj=u.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,wj=u.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  margin-bottom: 8px;
`,bj=u.p`
  color: var(--text-muted-color, #b9bbbe);
  font-size: 14px;
`,jj=u.button`
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
`,Sj=u.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Xp=u.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,vs=u.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,Ul=u.input`
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
`,Cj=u.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,zj=u.div`
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
`,Zp=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ej=u.div`
  position: relative;
  margin-bottom: 8px;
`,eh=u.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 4px;
  background-color: var(--tertiary-color, #36393f);
`,th=u.div`
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
`,nh=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,rh=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,oh=u.span`
  font-size: 14px;
  color: var(--text-color, #ffffff);
  font-weight: 500;
`,_j=u.div`
  background-color: var(--tertiary-color, #36393f);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,ih=u.button`
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
`,Tj=({isOpen:e,onClose:t,onSave:n,group:r={},users:o=[]})=>{var ie;const[s,a]=f.useState(""),[l,c]=f.useState(""),[d,x]=f.useState(""),[p,g]=f.useState([]),[b,k]=f.useState(""),[j,C]=f.useState(!1),y=f.useRef(null),[h,m]=f.useState([]),[w,S]=f.useState(null),v=JSON.parse(localStorage.getItem("user")||"{}"),_=(v==null?void 0:v.id)||(v==null?void 0:v._id),T=String(r.createdBy)===String(_),O=h.find(R=>String(R.userId||R.id||R._id)===String(_)),N=R=>T||O&&O.permissions.includes(R),z=N("edit_group_info"),A=N("add_members"),ne=N("remove_members"),L=N("add_admins");if(f.useEffect(()=>{e&&r&&(a(r.name||""),c(r.description||""),x(r.avatar||""),g(r.members?r.members.map(R=>String(R.id||R._id||R)):[]),m(r.admins?r.admins.map(R=>({...R,userId:String(R.userId||R.id||R._id)})):[]),k(""),S(null))},[e,r]),!e)return null;const X=R=>{p.includes(R)?(g(p.filter(Q=>Q!==R)),m(Q=>Q.filter(ue=>(ue.userId||ue.id)!==R))):g([...p,R])},Z=o.filter(R=>R.name.toLowerCase().includes(b.toLowerCase())&&R.type==="user"&&!R.isSavedMessages&&b.trim()!==""),H=new Map;(ie=r.members)==null||ie.forEach(R=>H.set(R.id||R._id||R,R)),o.forEach(R=>H.set(R.id||R.jammId||R._id,R));const $=p.map(R=>H.get(R)).filter(Boolean),G=(R,Q)=>{const ue=String(R);m(ge=>{const le=ge.find(re=>String(re.userId||re.id)===ue);if(le){const J=le.permissions.includes(Q)?le.permissions.filter(je=>je!==Q):[...le.permissions,Q];return J.length===0?ge.filter(je=>String(je.userId||je.id)!==ue):ge.map(je=>String(je.userId||je.id)===ue?{...je,permissions:J}:je)}else return g(re=>re.includes(ue)?re:[...re,ue]),[...ge,{userId:ue,permissions:[Q]}]})},I=()=>{const R={name:s,description:l,avatar:d,members:p};L&&(R.admins=h),n(R),t()},W=async R=>{var ge;const Q=(ge=R.target.files)==null?void 0:ge[0];if(!Q)return;if(Q.size>2*1024*1024){alert("Fayl hajmi juda katta (maksimum 2MB)");return}C(!0);const ue=new FormData;ue.append("file",Q);try{const le=await fetch(`${mj}/chats/${r.id||r._id}/avatar`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:ue});if(le.ok){const re=await le.text();x(re)}else alert("Rasm yuklashda xatolik yuz berdi")}catch{alert("Tarmoq xatosi")}finally{C(!1)}};return i.jsx(yj,{onClick:t,children:i.jsxs(vj,{onClick:R=>R.stopPropagation(),children:[i.jsxs(kj,{children:[i.jsx(wj,{children:"Guruhni tahrirlash"}),i.jsx(bj,{children:"Guruh ma'lumotlarini o'zgartirish"}),i.jsx(jj,{onClick:t,children:i.jsx(Cr,{size:24})})]}),i.jsxs(Sj,{children:[i.jsxs(Cj,{children:[i.jsx("input",{type:"file",ref:y,style:{display:"none"},accept:"image/*",onChange:W,disabled:!z}),i.jsx(zj,{onClick:()=>{z&&y.current&&y.current.click()},style:{cursor:z?"pointer":"not-allowed"},children:j?i.jsx(yr,{size:24,style:{animation:"spin 1s linear infinite"}}):(d==null?void 0:d.length)>1?i.jsx("img",{src:d,alt:"Group"}):i.jsxs(i.Fragment,{children:[i.jsx(Cd,{size:24}),i.jsx("span",{children:"UPLOAD"})]})})]}),i.jsxs(Xp,{children:[i.jsx(vs,{children:"Guruh nomi"}),i.jsx(Ul,{placeholder:"Guruh nomi",value:s,onChange:R=>a(R.target.value),disabled:!z})]}),i.jsxs(Xp,{children:[i.jsx(vs,{children:"Guruh haqida (ixtiyoriy)"}),i.jsx(Ul,{placeholder:"Guruh maqsadini yozing...",value:l,onChange:R=>c(R.target.value),disabled:!z})]}),i.jsxs(Zp,{children:[i.jsxs(vs,{children:["Mavjud a'zolar (",$.length,")"]}),i.jsx(eh,{children:$.map(R=>{var ge;const Q=String(R.id||R._id),ue=h.find(le=>String(le.userId||le.id)===Q);return i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsxs(th,{children:[i.jsxs(nh,{children:[i.jsx(rh,{children:((ge=R.avatar)==null?void 0:ge.length)>1?i.jsx("img",{src:R.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(R.name||R.username||"").charAt(0)}),i.jsx(oh,{children:R.name||R.nickname||R.username}),Q===r.createdBy&&i.jsx(Pi,{size:14,color:"#f1c40f"}),Q!==r.createdBy&&ue&&i.jsx(Pi,{size:14,color:"#5865F2"})]}),i.jsxs("div",{style:{display:"flex",gap:8},children:[L&&Q!==r.createdBy&&i.jsx("button",{onClick:()=>S(String(w)===Q?null:Q),style:{background:"transparent",border:"none",color:"#b9bbbe",cursor:"pointer",fontSize:12},children:"Admin"}),ne&&Q!==r.createdBy&&i.jsx("button",{onClick:()=>X(Q),style:{background:"transparent",border:"none",color:"#ed4245",cursor:"pointer"},children:i.jsx(g0,{size:16})})]})]}),w===Q&&i.jsx("div",{style:{padding:"8px 16px",backgroundColor:"var(--input-color, #202225)",fontSize:13,display:"flex",flexDirection:"column",gap:6},children:[{id:"edit_group_info",label:"Ma'lumotlarni tahrirlash"},{id:"add_members",label:"A'zo qo'shish"},{id:"remove_members",label:"A'zo o'chirish"},{id:"delete_others_messages",label:"Xabarlarni o'chirish"},{id:"add_admins",label:"Admin qo'shish"}].map(le=>{var J;const re=((J=ue==null?void 0:ue.permissions)==null?void 0:J.includes(le.id))||!1;return i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#b9bbbe"},children:[i.jsx("input",{type:"checkbox",checked:re,onChange:()=>G(Q,le.id)}),le.label]},le.id)})})]},Q)})})]}),A&&i.jsxs(Zp,{children:[i.jsx(vs,{children:"Yangi a'zo qo'shish"}),i.jsxs(Ej,{children:[i.jsx(Ul,{placeholder:"User qidirish...",value:b,onChange:R=>k(R.target.value),style:{paddingLeft:30,width:"100%"}}),i.jsx(jd,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),b.trim()!==""&&i.jsx(eh,{children:Z.length===0?i.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):Z.map(R=>{var Q;return i.jsxs(th,{selected:p.includes(R.id),onClick:()=>X(R.id),children:[i.jsxs(nh,{children:[i.jsx(rh,{children:((Q=R.avatar)==null?void 0:Q.length)>1?i.jsx("img",{src:R.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):R.name.charAt(0)}),i.jsx(oh,{children:R.name})]}),p.includes(R.id)&&i.jsx(xo,{size:16,color:"var(--primary-color, #5865F2)"})]},R.id)})})]})]}),i.jsxs(_j,{children:[i.jsx(ih,{onClick:t,children:"Bekor qilish"}),i.jsx(ih,{primary:!0,onClick:I,disabled:!s.trim(),children:"Saqlash"})]})]})})},Rj=u.div`
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
`,Ij=u.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`,$j=u.div`
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
`,Pj=u.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`,Mj=u.div`
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
`,Aj=u.div`
  flex: 1;
  min-width: 0;
`,Oj=u.span`
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
`,Nj=u.span`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,Lj=u.div`
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
`,Dj=u.div`
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
`;const Vl=u.button`
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
`;const Bj=u.div`
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
`,Fj=u.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`,Uj=u.div`
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
`,sh=u.div`
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
`,ah=u.div`
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
`,lh=u.div`
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
`;const Vj=u.div`
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
`,ql=u.div`
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
`,ch=u.input`
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
`,uh=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`,dh=u.span`
  font-size: 11px;
  color: #72767d;
  font-style: italic;
  margin-left: 4px;
`,Hl=u.div`
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
`,qj=u.div`
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
`,Hj=u.span`
  color: #dcddde;
  font-weight: 500;
  cursor: default;
`,Wj=u.div`
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
`,Gj=u.div`
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
`,Yj=u.button`
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
`,Kj=u.div`
  padding: 12px 16px 16px;
  background-color: #2f3136;
  border-top: 1px solid #40444b;
  position: relative;
`;u.div`
  padding: 8px 16px;
  font-size: 13px;
  color: #b9bbbe;
  min-height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dots {
    display: flex;
    gap: 3px;
    align-items: center;
    margin-right: 4px;
  }

  .dot {
    width: 4px;
    height: 4px;
    background-color: #b9bbbe;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) {
    animation-delay: -0.32s;
  }
  .dot:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;const Qj=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 500;

  .dots {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .dot {
    width: 3px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) {
    animation-delay: -0.32s;
  }
  .dot:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`,Jj=u.div`
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
`,Xj=u.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`,fh=u.button`
  color: #b9bbbe;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #dcddde;
  }
`,Zj=u.textarea`
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
`,eS=u.div`
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
`,tS=u.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
`,ph=u.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: var(--text-color);
  }
`,nS=u.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`,rS=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,oS=u.div`
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
`,iS=u.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
`,sS=u.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`,Wl=u.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Gl=u.h4`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
  margin-bottom: 8px;
`,hh=u.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-all;
`,aS=u.button`
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
`,lS=u.div`
  display: flex;
  flex-direction: column;
`,cS=u.div`
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
`,uS=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,dS=({onBack:e,selectedChannel:t,selectedNav:n,navigate:r,chats:o=[]})=>{var Md,Ad,Od,Nd,Ld;const[s,a]=f.useState(!1),{fetchMessages:l,sendMessage:c,editMessage:d,deleteMessage:x,getUserByUsername:p,createChat:g,editChat:b,previewGroupChat:k,joinGroupChat:j,chatSocket:C,markMessagesAsRead:y,typingUsers:h,sendTypingStatus:m}=Vi(),{isUserOnline:w,getOnlineCount:S}=A0(),v=o.find(E=>E.urlSlug===t||E.id===t),[_,T]=f.useState(""),O=f.useRef(null),[N,z]=f.useState([]),[A,ne]=f.useState(!1),L=async E=>{const M=localStorage.getItem("user"),B=M?JSON.parse(M):{},q=B._id||B.id,P=E._id||E.id;if(P===q)return;const K=o.find(ae=>ae.isGroup||!ae.members||ae.isSavedMessages?!1:ae.members.some(xe=>(xe._id||xe.id)===P));if(K)r(`/a/${K.urlSlug}`),a(!1);else try{const ae=await g({isGroup:!1,memberIds:[P]});ae&&(r(`/a/${ae}`),a(!1))}catch(ae){console.error("Failed to start private chat",ae)}},[X,Z]=f.useState(null),[H,$]=f.useState(null),[G,I]=f.useState(""),[W,ie]=f.useState(null),R=v||W,[Q,ue]=f.useState(null),ge=f.useRef({}),le=f.useRef(null);f.useRef(null);const re=f.useRef(null),J=Ct.useMemo(()=>{const E=localStorage.getItem("user");return E?JSON.parse(E):null},[]),je=(R==null?void 0:R.type)!=="group"&&(R!=null&&R.members)?R.members.find(E=>E._id!==((J==null?void 0:J._id)||(J==null?void 0:J.id))):null,Ne=je?w(je._id):!1,_e=(R==null?void 0:R.type)==="group"?S(R.members):0,tn=Ct.useMemo(()=>{if(!je||Ne)return"Online";if(!je.lastSeen)return"Offline";const E=new Date(je.lastSeen),B=new Date-E,q=Math.floor(B/6e4),P=Math.floor(q/60);return q<60?`Last seen ${q}m ago`:P<24?`Last seen ${P}h ago`:`Last seen ${E.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`},[je,Ne]);f.useEffect(()=>{(n==="groups"||n==="a")&&t&&!v?k(t).then(E=>ie(E)).catch(E=>{console.error("Preview failed:",E),ie(null)}):ie(null)},[n,t,v,k]),f.useEffect(()=>{if(!v)return;(async()=>{const M=await l(v.id);z(M);const B=(J==null?void 0:J._id)||(J==null?void 0:J.id),q=M.find(P=>{var K;return P.senderId!==B&&!((K=P.readBy)!=null&&K.includes(B))});setTimeout(()=>{const P=q?q.id||q._id:null;P&&ge.current[P]?ge.current[P].scrollIntoView({behavior:"auto",block:"center"}):qt("auto")},100)})()},[v==null?void 0:v.id,l]),f.useEffect(()=>{if(!(!C||!v))return C.emit("join_chat",{chatId:v.id}),()=>{C.emit("leave_chat",{chatId:v.id})}},[C,v==null?void 0:v.id]),f.useEffect(()=>{if(!C)return;const E=P=>{var xe,me,Ht,zo,Dd,Bd,Fd,Ud,Vd;if(P.chatId!==(v==null?void 0:v.id))return;const K={id:P._id,user:((xe=P.senderId)==null?void 0:xe.nickname)||((me=P.senderId)==null?void 0:me.username),avatar:((Ht=P.senderId)==null?void 0:Ht.avatar)||((Bd=((zo=P.senderId)==null?void 0:zo.nickname)||((Dd=P.senderId)==null?void 0:Dd.username))==null?void 0:Bd.charAt(0))||"U",senderId:((Fd=P.senderId)==null?void 0:Fd._id)||P.senderId,content:P.content,timestamp:new Date(P.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),date:new Date(P.createdAt).toDateString(),edited:P.isEdited,isDeleted:P.isDeleted,readBy:P.readBy||[],replayTo:P.replayTo?{id:P.replayTo._id,user:((Ud=P.replayTo.senderId)==null?void 0:Ud.nickname)||((Vd=P.replayTo.senderId)==null?void 0:Vd.username),content:P.replayTo.content}:null};z(Ka=>Ka.some(r1=>r1.id===K.id)?Ka:[...Ka,K]);const ae=(J==null?void 0:J._id)||(J==null?void 0:J.id);K.senderId===ae&&setTimeout(()=>qt("smooth"),100)},M=P=>{P.chatId===(v==null?void 0:v.id)&&z(K=>K.map(ae=>ae.id===P._id?{...ae,content:P.content,edited:!0}:ae))},B=P=>{P.chatId===(v==null?void 0:v.id)&&z(K=>K.filter(ae=>ae.id!==P._id))},q=({chatId:P,readByUserId:K,messageIds:ae})=>{(v==null?void 0:v.id)===P&&z(xe=>xe.map(me=>{var zo;return(me.senderId&&typeof me.senderId=="object"?me.senderId._id||me.senderId.id:me.senderId)!==K&&(ae!=null&&ae.includes(me.id||me._id))&&!((zo=me.readBy)!=null&&zo.includes(K))?{...me,readBy:[...me.readBy||[],K]}:me}))};return C.on("message_new",E),C.on("message_updated",M),C.on("message_deleted",B),C.on("messages_read",q),()=>{C.off("message_new",E),C.off("message_updated",M),C.off("message_deleted",B),C.off("messages_read",q)}},[C,v==null?void 0:v.id]),f.useEffect(()=>{if(!v)return;const E=(J==null?void 0:J._id)||(J==null?void 0:J.id),M=N.filter(q=>{var K;return(q.senderId&&typeof q.senderId=="object"?q.senderId._id||q.senderId.id:q.senderId)!==E&&!((K=q.readBy)!=null&&K.includes(E))});if(M.length===0)return;const B=new IntersectionObserver(q=>{const P=[];q.forEach(K=>{var ae;if(K.isIntersecting){const xe=K.target.dataset.messageId,me=N.find(Ht=>String(Ht.id)===String(xe)||String(Ht._id)===String(xe));if(me){const Ht=me.senderId&&typeof me.senderId=="object"?me.senderId._id||me.senderId.id:me.senderId;String(Ht)!==String(E)&&!((ae=me.readBy)!=null&&ae.includes(E))&&P.push(me.id||me._id)}}}),P.length>0&&y(v.id,P)},{threshold:.1});return M.forEach(q=>{const P=ge.current[q.id];P&&B.observe(P)}),()=>B.disconnect()},[N,v,J,y]),f.useEffect(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},[t,n,X]),f.useEffect(()=>{re.current&&(re.current.style.height="25px",re.current.style.height=`${re.current.scrollHeight}px`)},[_]);const[Rt,ke]=f.useState(0),[Je,Ge]=f.useState(null),[Xe,qe]=f.useState(null),[pn,Ft]=f.useState(null),[It,ye]=f.useState(!1),[ze,Le]=f.useState(!1),[Ut,F]=f.useState(""),[V,oe]=f.useState(null),[se,de]=f.useState(null),[te,ce]=f.useState(!1),we=E=>{const M=`${window.location.origin}/${E}`;navigator.clipboard.writeText(M).then(()=>{ce(!0),setTimeout(()=>ce(!1),2e3)})};f.useEffect(()=>()=>{Xe&&clearTimeout(Xe),pn&&clearTimeout(pn)},[Xe,pn]);const Ze=Ct.useMemo(()=>N,[N]),Vt=(R==null?void 0:R.name)||"Chat",qt=(E="auto")=>{var M;(M=le.current)==null||M.scrollIntoView({behavior:E})},hn=E=>{const M=ge.current[E];M&&(M.scrollIntoView({behavior:"smooth",block:"center"}),M.style.backgroundColor="rgba(114, 137, 218, 0.3)",setTimeout(()=>{M.style.backgroundColor=""},2e3))},Tr=(E,M)=>{Je!==E.id?(ke(1),Ge(E.id)):ke(q=>q+1),Xe&&clearTimeout(Xe);const B=setTimeout(()=>{Rt===1&&Je===E.id&&(Z(E),console.log("Replay triggered for message:",E),setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0)),ke(0),Ge(null)},300);qe(B)},tr=(E,M)=>{const B=M.clientX,q=M.clientY,P=180,K=E.user==="You"?120:40;let ae=B,xe=q;B+P>window.innerWidth&&(ae=window.innerWidth-P-10),q+K>window.innerHeight&&(xe=window.innerHeight-K-10),ae<10&&(ae=10),xe<10&&(xe=10),ue({x:ae,y:xe,message:E})},U=async(E,M)=>{switch(E){case"delete":try{z(B=>B.map(q=>q.id===M.id?{...q,isDeleted:!0,content:"Bu xabar o'chirildi"}:q)),await x(M.id),console.log("Message deleted:",M)}catch(B){console.error("Failed to delete message",B)}break;case"edit":if(M.isDeleted)return;$(M),I(M.content),console.log("Edit mode started for message:",M);break;case"replay":Z(M),T(""),console.log("Replay message:",M),setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0);break}ue(null)},fe=async E=>{if(E.key==="Enter"&&G.trim())try{const M=G.trim();z(q=>q.map(P=>P.id===H.id?{...P,content:M,edited:!0}:P));const B=H.id;$(null),I(""),await d(B,M),console.log("Message edited on backend:",B,"->",M)}catch(M){console.error("Failed to edit message",M)}else E.key==="Escape"&&($(null),I(""))},dt=E=>{const M=E.target.value;T(M);const B=(v==null?void 0:v.id)||(v==null?void 0:v._id);B&&M.trim()?(O.current||m(B,!0),O.current&&clearTimeout(O.current),O.current=setTimeout(()=>{m(B,!1),O.current=null},3e3)):B&&!M.trim()&&O.current&&(clearTimeout(O.current),m(B,!1),O.current=null)},et=()=>{const E=(v==null?void 0:v.id)||(v==null?void 0:v._id);if(!E||!h[E])return null;const M=h[E],B=Object.keys(M);if(B.length===0)return null;const q=(J==null?void 0:J._id)||(J==null?void 0:J.id),P=B.filter(K=>String(K)!==String(q));if(P.length===0)return null;if(v.type==="user")return"yozmoqda...";{const K=P.map(ae=>{var me;const xe=(me=v.members)==null?void 0:me.find(Ht=>String(Ht._id||Ht.id)===String(ae));return(xe==null?void 0:xe.nickname)||(xe==null?void 0:xe.username)||"Kimdir"});return K.length===1?`${K[0]} yozmoqda...`:K.length===2?`${K[0]} va ${K[1]} yozmoqdalar...`:"Bir necha kishi yozmoqda..."}},Hi=(E,M)=>{M.stopPropagation();const q=[{id:200,name:"Ota"},{id:201,name:"Bob Smith"},{id:202,name:"Charlie Wilson"},{id:203,name:"Diana Brown"}].find(P=>P.name===E);q&&r&&r(`/a/${q.id}`)},U0=E=>{const M=E.split(" ");return M.length>=2?M[0][0]+M[M.length-1][0]:M[0].substring(0,2).toUpperCase()},V0=E=>{const M=/@(\w+)/g,B=/(https?:\/\/[^\s]+)/g,q=[];let P=0;const K=[];let ae;for(;(ae=M.exec(E))!==null;)K.push({type:"mention",index:ae.index,length:ae[0].length,username:ae[1],content:ae[0]});for(;(ae=B.exec(E))!==null;)K.push({type:"url",index:ae.index,length:ae[0].length,url:ae[0],content:ae[0]});return K.sort((xe,me)=>xe.index-me.index),K.forEach(xe=>{xe.index>P&&q.push({type:"text",content:E.substring(P,xe.index)}),q.push(xe),P=xe.index+xe.length}),P<E.length&&q.push({type:"text",content:E.substring(P)}),q.length>0?q:[{type:"text",content:E}]},q0=async(E,M)=>{M.stopPropagation();try{const B=await p(E);if(B&&r){if(J&&B.id===J.id){alert("Siz o'zingiz bilan suhbat qura olmaysiz");return}const q=o.find(P=>!P.isGroup&&P.members&&P.members.some(K=>K._id===B.id));if(q)r(`/a/${q.urlSlug}`);else{const P=await g({isGroup:!1,memberIds:[B.id]});P&&r(`/a/${P}`)}}else alert("Bunday foydalanuvchi topilmadi")}catch(B){console.error("Error handling mention click:",B),alert("Foydalanuvchini qidirishda xatolik yuz berdi")}},Pd=E=>V0(E).map((B,q)=>B.type==="mention"?i.jsx("span",{onClick:P=>q0(B.username,P),style:{pointerEvents:"auto",color:"var(--primary-color)",backgroundColor:"var(--hover-color)",padding:"2px 4px",borderRadius:"4px",cursor:"pointer",fontWeight:"500",transition:"background-color 0.2s ease"},onMouseEnter:P=>{P.target.style.backgroundColor="var(--active-color)"},onMouseLeave:P=>{P.target.style.backgroundColor="var(--hover-color)"},children:B.content},q):B.type==="url"?i.jsx("a",{href:B.url,target:"_blank",rel:"noopener noreferrer",style:{color:"var(--primary-color)",textDecoration:"none",borderBottom:"1px solid transparent",transition:"border-color 0.2s ease",cursor:"pointer"},onMouseEnter:P=>{P.target.style.borderBottomColor="var(--primary-color)"},onMouseLeave:P=>{P.target.style.borderBottomColor="transparent"},children:B.content}):i.jsx("span",{children:B.content},q)),H0=["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😱","😭","😤","😠","😡","🤬","🤯","😳","🤪","😵","🥴","😵‍💫","🤯","🥶","🥵","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],W0=E=>{T(M=>M+E),ye(!1),setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0)},G0=E=>{E.stopPropagation(),ye(!It),It&&setTimeout(()=>{re.current&&(re.current.focus(),re.current.setSelectionRange(re.current.value.length,re.current.value.length))},0)},Y0=()=>{ue(null)},K0=E=>{de({name:E}),setTimeout(()=>{de(null),F(E),Le(!0)},3e3)},Q0=()=>{F(V.name),Le(!0),oe(null)},J0=()=>{oe(null)},X0=()=>{de(null)},Z0=()=>{Le(!1),F("")};f.useEffect(()=>{const E=B=>{Q&&Y0()},M=B=>{It&&!B.target.closest(".emoji-picker-container")&&!B.target.closest(".emoji-button")&&ye(!1)};return document.addEventListener("click",E),document.addEventListener("click",M),()=>{document.removeEventListener("click",E),document.removeEventListener("click",M)}},[Q,It]),f.useEffect(()=>{const E=M=>{H&&!M.target.closest(".edit-input")&&($(null),I(""))};if(H)return document.addEventListener("click",E),()=>{document.removeEventListener("click",E)}},[H]);const e1=(E=>{const M=[];let B=null;return E.forEach(q=>{let P;if(q.date)P=q.date;else if(q.timestamp){const K=new Date(q.timestamp);isNaN(K.getTime())?P=new Date().toDateString():P=K.toDateString()}else P=new Date().toDateString();P!==B&&(B=P,M.push({type:"date",date:P,messages:[]})),M.push({type:"message",...q,date:P})}),M})(Ze),t1=E=>{const M=new Date(E),B=new Date,q=new Date(B);return q.setDate(q.getDate()-1),M.toDateString()===B.toDateString()?"Today":M.toDateString()===q.toDateString()?"Yesterday":M.toLocaleDateString("en-US",{month:"long",day:"numeric",year:M.getFullYear()!==B.getFullYear()?"numeric":void 0})},n1=async E=>{if(E.key==="Enter"&&_.trim()){const M=_.trim(),B=X?X.id:null;T(""),Z(null),setTimeout(()=>{re.current&&re.current.focus()},0);try{const q=await c(v.id,M,B),P=await l(v.id);z(P),setTimeout(()=>qt("smooth"),100),console.log("Message sent to backend:",q)}catch(q){console.error("Failed to send message:",q)}}};return i.jsxs(Ij,{children:[i.jsxs(Rj,{children:[i.jsxs($j,{children:[i.jsxs(Pj,{onClick:()=>(n==="groups"||n==="users"||n==="a")&&a(E=>!E),style:{cursor:n==="groups"||n==="users"||n==="a"?"pointer":"default"},children:[i.jsx(Vl,{onClick:E=>{E.stopPropagation(),e()},children:i.jsx(Nk,{size:20})}),i.jsx(Mj,{$isSavedMessages:v==null?void 0:v.isSavedMessages,children:v!=null&&v.isSavedMessages?i.jsx(wa,{size:20,color:"white",fill:"white"}):((Md=v==null?void 0:v.avatar)==null?void 0:Md.length)>1?i.jsx("img",{src:v.avatar,alt:Vt,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):Vt.charAt(0).toUpperCase()}),i.jsxs(Aj,{children:[i.jsx(Oj,{children:n==="channels"?i.jsx(i.Fragment,{children:Vt}):i.jsx(i.Fragment,{children:Vt})}),i.jsx(Nj,{children:et()?i.jsxs(Qj,{children:[i.jsxs("div",{className:"dots",children:[i.jsx("div",{className:"dot"}),i.jsx("div",{className:"dot"}),i.jsx("div",{className:"dot"})]}),et()]}):(R==null?void 0:R.type)==="group"?i.jsxs(i.Fragment,{children:[i.jsx(yo,{size:14,style:{marginRight:4}}),((Ad=R==null?void 0:R.members)==null?void 0:Ad.length)||0," members",_e>0&&`, ${_e} online`]}):i.jsxs(i.Fragment,{children:[i.jsx(Lj,{online:Ne}),tn]})})]})]}),i.jsx(Dj,{children:n=="users"&&i.jsxs(i.Fragment,{children:[i.jsx(Vl,{onClick:()=>K0(v==null?void 0:v.name),children:i.jsx(bd,{size:20})}),i.jsx(Vl,{children:i.jsx(rw,{size:20})})]})})]}),i.jsx("div",{style:{display:"flex",flex:1,overflow:"hidden",position:"relative"},children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0},children:[i.jsxs(Bj,{onContextMenu:E=>E.preventDefault(),children:[i.jsx(Fj,{children:e1.map((E,M)=>{if(E.type==="date")return i.jsx(qj,{children:i.jsx("span",{children:t1(E.date)})},`date-${M}`);const B=J?J._id||J.id:null,q=E.senderId&&typeof E.senderId=="object"?E.senderId._id||E.senderId.id:E.senderId,P=B&&q===B;return i.jsx(Uj,{"data-message-id":E.id,isOwn:P,onClick:()=>Tr(E),ref:K=>{ge.current[E.id]=K},children:P?i.jsxs(i.Fragment,{children:[E.replayTo&&i.jsxs(Hl,{onClick:K=>{K.stopPropagation();const xe=N.find(me=>me.user===E.replayTo.user&&me.content===E.replayTo.content);xe&&hn(xe.id)},children:[E.replayTo.user,' - "',E.replayTo.content,'"']}),i.jsx(ah,{isOwn:!0,onContextMenu:K=>{K.preventDefault(),K.stopPropagation(),tr(E,K)},children:(H==null?void 0:H.id)===E.id?i.jsx(uh,{children:i.jsx(ch,{className:"edit-input",type:"text",value:G,onChange:K=>I(K.target.value),onKeyDown:fe,placeholder:"Xabarni tahrirlang...",autoFocus:!0})}):i.jsxs(i.Fragment,{children:[i.jsx(lh,{isOwn:!0,children:Pd(E.content)}),E.edited&&i.jsx(dh,{children:"(tahrirlandi)"})]})}),i.jsxs(sh,{isOwn:!0,children:[i.jsx("span",{children:E.timestamp}),!E.isDeleted&&i.jsx("span",{style:{marginLeft:"4px",display:"flex",alignItems:"center"},children:E.readBy&&E.readBy.length>0?i.jsx(Uk,{size:14,color:"#4ade80"}):i.jsx(xo,{size:14,color:"#72767d"})})]})]}):i.jsxs(i.Fragment,{children:[i.jsxs(sh,{isOwn:!1,children:[n==="groups"&&i.jsx(Wj,{onClick:K=>Hi(E.user,K),children:U0(E.user)}),i.jsx("div",{style:{flex:1},children:i.jsx(Hj,{children:E.user})})]}),E.replayTo&&i.jsxs(Hl,{onClick:K=>{K.stopPropagation();const xe=N.find(me=>me.user===E.replayTo.user&&me.content===E.replayTo.content);xe&&hn(xe.id)},children:[E.replayTo.user,' - "',E.replayTo.content,'"']}),i.jsx(ah,{isOwn:!1,onContextMenu:K=>{K.preventDefault(),K.stopPropagation(),tr(E,K)},children:(H==null?void 0:H.id)===E.id?i.jsx(uh,{children:i.jsx(ch,{className:"edit-input",type:"text",value:G,onChange:K=>I(K.target.value),onKeyDown:fe,placeholder:"Xabarni tahrirlang...",autoFocus:!0})}):i.jsxs(i.Fragment,{children:[i.jsx(lh,{isOwn:!1,children:Pd(E.content)}),E.edited&&i.jsx(dh,{children:"(tahrirlandi)"})]})})]})},E.id)})}),i.jsx("div",{ref:le})]}),i.jsx(Kj,{children:W&&!v?i.jsxs("div",{style:{padding:"20px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[i.jsx("div",{style:{color:"var(--text-muted-color)"},children:"Siz ushbu guruh a'zosi emassiz"}),i.jsx("button",{onClick:async()=>{try{await j(W.privateurl||W.jammId),r(`/a/${W.jammId||W.privateurl}`,{replace:!0})}catch(E){alert(E.message||"Guruhga qo'shilishda xatolik yuz berdi")}},style:{background:"#5865F2",color:"white",padding:"10px 20px",border:"none",borderRadius:"4px",cursor:"pointer",fontWeight:"bold"},children:"Guruhga qo'shilish"})]}):i.jsxs(i.Fragment,{children:[X&&i.jsx(Hl,{onClick:()=>{hn(X.id)},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[i.jsxs("div",{children:[i.jsx("strong",{style:{color:"#7289da"},children:X.user}),i.jsx("div",{style:{fontSize:"12px",opacity:.8,marginTop:"2px"},children:X.content})]}),i.jsx("span",{className:"replay-close",onClick:E=>{E.stopPropagation(),Z(null)},children:"✕"})]})}),i.jsxs(Jj,{children:[i.jsxs(Xj,{children:[i.jsx(fh,{children:i.jsx($i,{size:20})}),i.jsx(fh,{onClick:G0,className:"emoji-button",children:i.jsx(dw,{size:20})})]}),i.jsx(Zj,{id:"message-input",ref:re,value:_,onChange:dt,onKeyDown:n1,placeholder:"Message...",rows:1})]}),It&&i.jsx(Gj,{className:"emoji-picker-container",style:{position:"fixed",bottom:"100px",right:"40px",backgroundColor:"#36393f",border:"3px solid #7289da",borderRadius:"12px",padding:"16px",boxShadow:"0 12px 24px rgba(0, 0, 0, 0.6)",zIndex:9999,display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"6px",maxWidth:"360px",maxHeight:"240px",overflowY:"auto"},children:H0.map((E,M)=>i.jsx(Yj,{onClick:()=>W0(E),style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"8px",borderRadius:"6px",minWidth:"32px",minHeight:"32px",display:"flex",alignItems:"center",justifyContent:"center"},children:E},M))})]})})]})}),Q&&i.jsxs(Vj,{style:{left:`${Q.x}px`,top:`${Q.y}px`},onClick:E=>E.stopPropagation(),onContextMenu:E=>{E.preventDefault(),E.stopPropagation()},children:[i.jsxs(ql,{onClick:()=>U("replay",Q.message),children:[i.jsx(sw,{size:16})," Javob yozish"]}),(()=>{var P,K;if(!J||!Q.message)return null;const E=J._id||J.id,B=(Q.message.senderId&&typeof Q.message.senderId=="object"?Q.message.senderId._id||Q.message.senderId.id:Q.message.senderId)===E;let q=!1;if(!B&&(v==null?void 0:v.type)==="group"){const ae=v.createdBy===E,xe=(P=v.admins)==null?void 0:P.find(me=>(me.userId||me.id||me._id)===E);q=ae||xe&&((K=xe.permissions)==null?void 0:K.includes("delete_others_messages"))}return!B&&!q?null:i.jsxs(i.Fragment,{children:[B&&i.jsxs(ql,{onClick:()=>U("edit",Q.message),children:[i.jsx(Cp,{size:16})," Tahrirlash"]}),i.jsxs(ql,{onClick:()=>U("delete",Q.message),$danger:!0,children:[i.jsx(Sd,{size:16})," O'chirish"]})]})})()]}),i.jsx(lj,{isOpen:!!V,onAccept:Q0,onReject:J0,caller:V}),i.jsx(Jp,{isOpen:!!se,onCancel:X0,target:se}),i.jsx(ej,{isOpen:ze,onClose:Z0,user:Ut})]}),s&&v&&i.jsxs(eS,{children:[i.jsxs(tS,{children:[i.jsx(ph,{onClick:()=>a(!1),children:i.jsx(Cr,{size:20})}),i.jsx("span",{style:{flex:1,textAlign:"center"},children:v.type==="user"?"Foydalanuvchi ma'lumotlari":"Guruh ma'lumotlari"}),v.type==="group"?(()=>{var P,K;const E=(J==null?void 0:J._id)||(J==null?void 0:J.id),M=v.createdBy===E,B=(P=v.admins)==null?void 0:P.find(ae=>(ae.userId||ae.id||ae._id)===E);return M||B&&((K=B.permissions)==null?void 0:K.length)>0?i.jsx(ph,{onClick:()=>ne(!0),children:i.jsx(Cp,{size:18})}):i.jsx("div",{style:{width:28}})})():i.jsx("div",{style:{width:28}})]}),i.jsxs(nS,{children:[i.jsxs(rS,{children:[i.jsx(oS,{style:v!=null&&v.isSavedMessages?{background:"#0288D1"}:{},children:v!=null&&v.isSavedMessages?i.jsx(wa,{size:40,color:"white",fill:"white"}):((Od=v==null?void 0:v.avatar)==null?void 0:Od.length)>1?i.jsx("img",{src:v.avatar,alt:v.name}):v.name.charAt(0)}),i.jsx(iS,{children:v.name}),i.jsx(sS,{children:v.type==="user"?(()=>{var P;const E=localStorage.getItem("user"),M=E?JSON.parse(E):null,B=(P=v.members)==null?void 0:P.find(K=>(K._id||K.id)!==(M==null?void 0:M.id)),q=(B==null?void 0:B._id)||(B==null?void 0:B.id);return q?i.jsx("span",{style:{color:w(q)?"var(--primary-color)":"var(--text-muted-color)"},children:w(q)?"Online":B.lastSeen||B.lastActive?`Oxirgi marta: ${new Date(B.lastSeen||B.lastActive).toLocaleTimeString("uz-UZ",{hour:"2-digit",minute:"2-digit"})}`:"Offline"}):null})():i.jsxs(i.Fragment,{children:[((Nd=v.members)==null?void 0:Nd.length)||0," a'zo",_e>0&&` · ${_e} online`]})})]}),v.description&&i.jsxs(Wl,{children:[i.jsx(Gl,{children:"Haqida"}),i.jsx(hh,{children:v.description})]}),(R==null?void 0:R.type)==="group"&&i.jsxs(Wl,{children:[i.jsx(Gl,{children:"Taklif havolasi"}),i.jsxs(hh,{style:{fontSize:"12px",color:"var(--text-muted-color)"},children:[window.location.origin,"/",R.privateurl||R.urlSlug]}),i.jsx(aS,{onClick:()=>we(R.privateurl||R.urlSlug),children:te?"Nusxa olindi!":"Nusxa olish"})]}),(R==null?void 0:R.type)==="group"&&i.jsxs(Wl,{children:[i.jsxs(Gl,{children:["A'zolar —"," ",(R==null?void 0:R.memberCount)||((Ld=R==null?void 0:R.members)==null?void 0:Ld.length)||0]}),i.jsxs(lS,{children:[(R==null?void 0:R.members)&&R.members.map(E=>{var P;const M=typeof E=="object"?E:null;if(!M)return null;const B=M._id||M.id,q=M.name||M.nickname||M.username||"Foydalanuvchi";return i.jsxs(cS,{onClick:()=>L(M),children:[i.jsx(uS,{children:((P=M.avatar)==null?void 0:P.length)>1?i.jsx("img",{src:M.avatar,alt:q,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):q.charAt(0)}),i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsx("span",{style:{fontSize:"14px",fontWeight:"500"},children:q}),i.jsx("span",{style:{fontSize:"12px",color:w(B)?"var(--primary-color)":"var(--text-muted-color)"},children:w(B)?"Online":M.lastSeen||M.lastActive?`Oxirgi marta: ${new Date(M.lastSeen||M.lastActive).toLocaleTimeString("uz-UZ",{hour:"2-digit",minute:"2-digit"})}`:"Offline"})]})]},B)}),(!(R!=null&&R.members)||R.members.length===0)&&i.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)"},children:"A'zolar ro'yxati mavjud emas"})]})]})]})]}),i.jsx(Jp,{}),i.jsx(Tj,{isOpen:A,onClose:()=>ne(!1),group:v,users:o.filter(E=>E.type==="user"),onSave:async E=>{try{await b(v.id||v._id,E)}catch(M){console.error("Guruhni tahrirlashda xatolik",M)}}})]})},fS="http://localhost:3000",pS=u.div`
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
`,hS=u.div`
  background-color: var(--secondary-color);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,gS=u.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,xS=u.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,mS=u.p`
  color: var(--text-muted-color);
  font-size: 14px;
`,yS=u.button`
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
`,vS=u.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,gh=u.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Yl=u.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
`,Kl=u.input`
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
`,kS=u.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,wS=u.div`
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
`,bS=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,jS=u.div`
  position: relative;
  margin-bottom: 8px;
`,SS=u.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--tertiary-color);
`,CS=u.div`
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
`,zS=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,ES=u.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,_S=u.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
`,TS=u.div`
  background-color: var(--tertiary-color);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,xh=u.button`
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
`,RS=({isOpen:e,onClose:t,onCreate:n,users:r=[]})=>{const[o,s]=f.useState(""),[a,l]=f.useState(""),[c,d]=f.useState(""),[x,p]=f.useState([]),[g,b]=f.useState(""),[k,j]=f.useState(!1),C=f.useRef(null);if(!e)return null;const y=()=>{o.trim()&&(n({name:o,description:a,image:c,members:x}),s(""),l(""),d(""),p([]),t())},h=S=>{x.includes(S)?p(x.filter(v=>v!==S)):p([...x,S])},m=r.filter(S=>S.name.toLowerCase().includes(g.toLowerCase())&&S.type==="user"&&!S.isSavedMessages&&g.trim()!==""),w=async S=>{var T;const v=(T=S.target.files)==null?void 0:T[0];if(!v)return;if(v.size>2*1024*1024){alert("Fayl hajmi juda katta (maksimum 2MB)");return}j(!0);const _=new FormData;_.append("file",v);try{const O=await fetch(`${fS}/chats/upload-avatar`,{method:"POST",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},body:_});if(O.ok){const N=await O.text();d(N)}else alert("Rasm yuklashda xatolik yuz berdi")}catch{alert("Tarmoq xatosi")}finally{j(!1)}};return i.jsx(pS,{onClick:t,children:i.jsxs(hS,{onClick:S=>S.stopPropagation(),children:[i.jsxs(gS,{children:[i.jsx(xS,{children:"Guruh yaratish"}),i.jsx(mS,{children:"Do'stlaringiz bilan muloqot qiling"}),i.jsx(yS,{onClick:t,children:i.jsx(Cr,{size:24})})]}),i.jsxs(vS,{children:[i.jsxs(kS,{children:[i.jsx("input",{type:"file",ref:C,style:{display:"none"},accept:"image/*",onChange:w}),i.jsx(wS,{onClick:()=>{C.current&&C.current.click()},children:k?i.jsx(yr,{size:24,style:{animation:"spin 1s linear infinite"}}):c?i.jsx("img",{src:c,alt:"Group"}):i.jsxs(i.Fragment,{children:[i.jsx(Cd,{size:24}),i.jsx("span",{children:"UPLOAD"})]})})]}),i.jsxs(gh,{children:[i.jsx(Yl,{children:"Guruh nomi"}),i.jsx(Kl,{placeholder:"Yangi guruh",value:o,onChange:S=>s(S.target.value),autoFocus:!0})]}),i.jsxs(gh,{children:[i.jsx(Yl,{children:"Guruh haqida (ixtiyoriy)"}),i.jsx(Kl,{placeholder:"Guruh maqsadini yozing...",value:a,onChange:S=>l(S.target.value)})]}),i.jsxs(bS,{children:[i.jsxs(Yl,{children:["Ishtirokchilar (",x.length,")"]}),i.jsxs(jS,{children:[i.jsx(Kl,{placeholder:"User qidirish...",value:g,onChange:S=>b(S.target.value),style:{paddingLeft:30}}),i.jsx(jd,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),g.trim()!==""&&i.jsx(SS,{children:m.length===0?i.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):m.map(S=>i.jsxs(CS,{selected:x.includes(S.id),onClick:()=>h(S.id),children:[i.jsxs(zS,{children:[i.jsx(ES,{children:S.avatar||S.name.charAt(0)}),i.jsx(_S,{children:S.name})]}),x.includes(S.id)&&i.jsx(xo,{size:16,color:"var(--primary-color)"})]},S.id))})]})]}),i.jsxs(TS,{children:[i.jsx(xh,{onClick:t,children:"Bekor qilish"}),i.jsx(xh,{primary:!0,onClick:y,disabled:!o.trim(),children:"Guruh yaratish"})]})]})})},O0=f.createContext(null),rn="http://localhost:3000",on=()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}),IS=()=>{try{const e=localStorage.getItem("user");return e?JSON.parse(e):null}catch{return null}},$S=({children:e})=>{const[t,n]=f.useState([]),[r,o]=f.useState(!0),s=IS(),a=f.useCallback(async()=>{try{const m=await fetch(`${rn}/courses`,{headers:on()});if(!m.ok)throw new Error("Failed to fetch courses");const S=(await m.json()).map(v=>({...v,id:v._id,createdBy:v.createdBy,members:(v.members||[]).map(_=>({..._,id:_.userId})),lessons:(v.lessons||[]).map(_=>({..._,id:_._id,comments:(_.comments||[]).map(T=>({...T,id:T._id,replies:(T.replies||[]).map(O=>({...O,id:O._id}))}))}))}));n(S)}catch(m){console.error("Error fetching courses:",m)}finally{o(!1)}},[]);f.useEffect(()=>{a()},[a]);const l=f.useCallback(async(m,w,S)=>{try{const v=await fetch(`${rn}/courses`,{method:"POST",headers:on(),body:JSON.stringify({name:m,description:w,image:S})});if(!v.ok)throw new Error("Failed to create course");return await a(),(await v.json())._id}catch(v){console.error("Error creating course:",v)}},[a]),c=f.useCallback(async(m,w,S,v)=>{try{await fetch(`${rn}/courses/${m}/lessons`,{method:"POST",headers:on(),body:JSON.stringify({title:w,videoUrl:S,description:v})}),await a()}catch(_){console.error("Error adding lesson:",_)}},[a]),d=f.useCallback(async(m,w)=>{try{await fetch(`${rn}/courses/${m}/lessons/${w}`,{method:"DELETE",headers:on()}),await a()}catch(S){console.error("Error removing lesson:",S)}},[a]),x=f.useCallback(async(m,w,S)=>{try{await fetch(`${rn}/courses/${m}/lessons/${w}/comments`,{method:"POST",headers:on(),body:JSON.stringify({text:S})}),await a()}catch(v){console.error("Error adding comment:",v)}},[a]),p=f.useCallback(async(m,w,S,v)=>{try{await fetch(`${rn}/courses/${m}/lessons/${w}/comments/${S}/replies`,{method:"POST",headers:on(),body:JSON.stringify({text:v})}),await a()}catch(_){console.error("Error adding reply:",_)}},[a]),g=f.useCallback(async m=>{try{await fetch(`${rn}/courses/${m}/enroll`,{method:"POST",headers:on()}),await a()}catch(w){console.error("Error enrolling:",w)}},[a]),b=f.useCallback(async(m,w)=>{try{await fetch(`${rn}/courses/${m}/members/${w}/approve`,{method:"PATCH",headers:on()}),await a()}catch(S){console.error("Error approving user:",S)}},[a]),k=f.useCallback(async(m,w)=>{try{await fetch(`${rn}/courses/${m}/members/${w}`,{method:"DELETE",headers:on()}),await a()}catch(S){console.error("Error removing user:",S)}},[a]),j=f.useCallback(async(m,w)=>{try{await fetch(`${rn}/courses/${m}/lessons/${w}/views`,{method:"PATCH",headers:on()}),n(S=>S.map(v=>v.id!==m?v:{...v,lessons:v.lessons.map(_=>_.id===w?{..._,views:_.views+1}:_)}))}catch(S){console.error("Error incrementing views:",S)}},[]),C=f.useCallback(m=>{if(!s)return!1;const w=t.find(S=>S.id===m);return(w==null?void 0:w.createdBy)===s._id},[t,s]),y=f.useCallback(m=>{if(!s)return"none";const w=t.find(v=>v.id===m);if((w==null?void 0:w.createdBy)===s._id)return"admin";const S=w==null?void 0:w.members.find(v=>v.id===s._id);return S?S.status:"none"},[t,s]),h={courses:t,currentUser:s?{id:s._id,name:s.nickname||s.username,avatar:(s.nickname||s.username||"").substring(0,2).toUpperCase(),isAdmin:!0}:null,createCourse:l,addLesson:c,removeLesson:d,addComment:x,addReply:p,enrollInCourse:g,approveUser:b,removeUser:k,incrementViews:j,isAdmin:C,isEnrolled:y,loading:r,fetchCourses:a};return i.jsx(O0.Provider,{value:h,children:e})},qi=()=>{const e=f.useContext(O0);if(!e)throw new Error("useCourses must be used within CoursesProvider");return e},PS=u.div`
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
`,MS=u.div`
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
`,AS=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,OS=u.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,NS=u.button`
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
`,LS=u.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,N0=u.div`
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
`,DS=u.div`
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

  ${N0}:hover & {
    opacity: 1;
  }
`,BS=u.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`,FS=u.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,Ql=u.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Jl=u.label`
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
`,US=u.textarea`
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
`,VS=u.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,yh=u.button`
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
`,qS=({isOpen:e,onClose:t,onCreated:n})=>{const{createCourse:r}=qi(),[o,s]=f.useState(""),[a,l]=f.useState(""),[c,d]=f.useState("");if(f.useRef(null),!e)return null;const x=()=>{if(!o.trim())return;const b=r(o.trim(),a.trim(),c);s(""),l(""),d(""),n(b)},p=b=>{d(b.target.value)},g=b=>{b.key==="Escape"&&t()};return i.jsx(PS,{onClick:t,onKeyDown:g,children:i.jsxs(MS,{onClick:b=>b.stopPropagation(),children:[i.jsxs(AS,{children:[i.jsx(OS,{children:"Yangi kurs yaratish"}),i.jsx(NS,{onClick:t,children:i.jsx(Cr,{size:18})})]}),i.jsxs(LS,{children:[i.jsx(N0,{hasImage:!!c,children:c?i.jsxs(i.Fragment,{children:[i.jsx(BS,{src:c,alt:"Course",onError:()=>d("")}),i.jsx(DS,{children:"Rasmni o'zgartirish"})]}):i.jsxs(i.Fragment,{children:[i.jsx(Qk,{size:32,color:"var(--text-muted-color)"}),i.jsx(FS,{children:"Kurs uchun rasm URL kiriting"})]})}),i.jsxs(Ql,{children:[i.jsx(Jl,{children:"Rasm URL (ixtiyoriy)"}),i.jsx(mh,{type:"url",placeholder:"https://example.com/image.jpg",value:c,onChange:p})]}),i.jsxs(Ql,{children:[i.jsx(Jl,{children:"Kurs nomi *"}),i.jsx(mh,{type:"text",placeholder:"Masalan: React Asoslari",value:o,onChange:b=>s(b.target.value),autoFocus:!0})]}),i.jsxs(Ql,{children:[i.jsx(Jl,{children:"Tavsif"}),i.jsx(US,{placeholder:"Kurs haqida qisqacha ma'lumot...",value:a,onChange:b=>l(b.target.value)})]})]}),i.jsxs(VS,{children:[i.jsx(yh,{onClick:t,children:"Bekor qilish"}),i.jsx(yh,{primary:!0,disabled:!o.trim(),onClick:x,children:"Yaratish"})]})]})})},HS=u.div`
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
`,WS=u.div`
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
`;const GS=u.button`
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
`;const YS=u.input`
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
`,KS=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`,QS=u.div`
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
`,JS=u.div`
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
`,XS=u.div`
  flex: 1;
  min-width: 0;
`,ZS=u.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,e4=u.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,t4=u.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
`,n4=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted-color);
`;u.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;const r4=u.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;

  ${e=>{switch(e.status){case"admin":return"background: rgba(88, 101, 242, 0.15); color: var(--primary-color);";case"approved":return"background: rgba(67, 181, 129, 0.15); color: var(--success-color);";case"pending":return"background: rgba(250, 166, 26, 0.15); color: var(--warning-color);";default:return"background: var(--input-color); color: var(--text-muted-color);"}}}
`,o4=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  gap: 12px;
`,i4=u.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`,s4=({selectedCourse:e,onSelectCourse:t})=>{const{courses:n,isAdmin:r,isEnrolled:o}=qi(),[s,a]=f.useState(""),[l,c]=f.useState(!1),d=Ct.useMemo(()=>s?n.filter(p=>p.name.toLowerCase().includes(s.toLowerCase())||p.description.toLowerCase().includes(s.toLowerCase())):n.filter(p=>{const g=o(p.id);return g==="admin"||g==="approved"||g==="pending"}),[n,s,o]),x=p=>{switch(o(p)){case"admin":return{text:"Admin",icon:null};case"approved":return{text:"A'zo",icon:i.jsx(kd,{size:10})};case"pending":return{text:"Kutilmoqda",icon:i.jsx(mr,{size:10})};default:return null}};return i.jsxs(i.Fragment,{children:[i.jsxs(HS,{children:[i.jsxs(WS,{children:[i.jsx(YS,{type:"text",placeholder:"Kurslarni qidirish...",value:s,onChange:p=>a(p.target.value),style:{flex:1,marginRight:"12px"}}),i.jsx(GS,{onClick:()=>c(!0),title:"Yangi kurs yaratish",children:i.jsx($i,{size:18})})]}),i.jsx(KS,{children:d.length===0?i.jsxs(o4,{children:[i.jsx(i4,{children:i.jsx(mo,{size:24})}),i.jsx("span",{children:"Hozircha kurslar yo'q"}),i.jsx("span",{style:{fontSize:12},children:"Yangi kurs yaratish uchun + tugmasini bosing"})]}):d.map(p=>{const g=x(p.id),b=p.members.filter(k=>k.status==="approved").length;return i.jsxs(QS,{active:e===p.id,onClick:()=>t(p.id),children:[i.jsx(JS,{src:p.image,gradient:p.gradient,children:!p.image&&p.name.charAt(0)}),i.jsxs(XS,{children:[i.jsx(ZS,{children:p.name}),i.jsxs(e4,{children:[p.lessons.length>0?`${p.lessons.length} ta dars`:"Hali dars yo'q",g&&i.jsxs(r4,{status:o(p.id),children:[g.icon,g.text]})]})]}),i.jsx(t4,{children:i.jsxs(n4,{children:[i.jsx(yo,{size:12}),b]})})]},p.id)})})]}),i.jsx(qS,{isOpen:l,onClose:()=>c(!1),onCreated:p=>{c(!1),t(p)}})]})},a4=u.div`
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
`,l4=u.div`
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
`,c4=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,u4=u.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,d4=u.button`
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
`,f4=u.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Lo=u.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Do=u.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,vh=u.input`
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
`,p4=u.textarea`
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
`,h4=u.div`
  display: flex;
  background-color: var(--input-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
  padding: 4px;
  gap: 4px;
`,kh=u.button`
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
`,g4=u.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,x4=u.label`
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
`,m4=u.input`
  display: none;
`,y4=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--input-color);
  border-radius: 8px;
  border: 1px solid var(--primary-color);
`,v4=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
`,k4=u.span`
  color: var(--text-muted-color);
  font-size: 12px;
`,w4=u.button`
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
`,b4=u.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,wh=u.button`
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
`,j4=({isOpen:e,onClose:t,courseId:n})=>{const{addLesson:r}=qi(),[o,s]=f.useState(""),[a,l]=f.useState("upload"),[c,d]=f.useState(""),[x,p]=f.useState(null),[g,b]=f.useState(""),k=f.useRef(null);if(!e)return null;const j=w=>{w.target.files&&w.target.files[0]&&p(w.target.files[0])},C=()=>{p(null),k.current&&(k.current.value="")},y=w=>{if(w===0)return"0 Bytes";const S=1024,v=["Bytes","KB","MB","GB"],_=Math.floor(Math.log(w)/Math.log(S));return parseFloat((w/Math.pow(S,_)).toFixed(2))+" "+v[_]},h=()=>!(!o.trim()||a==="url"&&!c.trim()||a==="upload"&&!x),m=()=>{if(!h())return;const w=a==="url"?c.trim():`upload://${x.name}`;r(n,o.trim(),w,g.trim()),s(""),d(""),p(null),b(""),l("upload"),t()};return i.jsx(a4,{onClick:t,children:i.jsxs(l4,{onClick:w=>w.stopPropagation(),children:[i.jsxs(c4,{children:[i.jsx(u4,{children:"Yangi dars qo'shish"}),i.jsx(d4,{onClick:t,children:i.jsx(Cr,{size:18})})]}),i.jsxs(f4,{children:[i.jsxs(Lo,{children:[i.jsx(Do,{children:"Dars nomi *"}),i.jsx(vh,{type:"text",placeholder:"Masalan: React Hooks asoslari",value:o,onChange:w=>s(w.target.value),autoFocus:!0})]}),i.jsxs(Lo,{children:[i.jsx(Do,{children:"Video manbasi *"}),i.jsxs(h4,{children:[i.jsx(kh,{active:a==="upload",onClick:()=>l("upload"),children:"Video yuklash"}),i.jsx(kh,{active:a==="url",onClick:()=>l("url"),children:"YouTube URL"})]})]}),a==="upload"?i.jsxs(Lo,{children:[i.jsx(Do,{children:"Video fayl *"}),i.jsx(g4,{children:x?i.jsxs(y4,{children:[i.jsxs(v4,{children:[i.jsx(Wk,{size:20,color:"var(--primary-color)"}),i.jsxs("div",{children:[x.name,i.jsx(k4,{style:{display:"block",marginTop:"2px"},children:y(x.size)})]})]}),i.jsx(w4,{onClick:C,children:i.jsx(Cr,{size:16})})]}):i.jsxs(x4,{children:[i.jsx(Cd,{size:24}),i.jsx("span",{style:{marginBottom:"4px",fontWeight:600},children:"Videoni yuklang yoki shu yerga tashlang"}),i.jsx("span",{style:{fontSize:"12px"},children:"MP4, WebM (Max: 2GB)"}),i.jsx(m4,{type:"file",accept:"video/*",onChange:j,ref:k})]})})]}):i.jsxs(Lo,{children:[i.jsx(Do,{children:"YouTube Video URL *"}),i.jsx(vh,{type:"url",placeholder:"https://youtu.be/...",value:c,onChange:w=>d(w.target.value)})]}),i.jsxs(Lo,{children:[i.jsx(Do,{children:"Tavsif (ixtiyoriy)"}),i.jsx(p4,{placeholder:"Dars haqida qisqacha...",value:g,onChange:w=>b(w.target.value)})]})]}),i.jsxs(b4,{children:[i.jsx(wh,{onClick:t,children:"Bekor qilish"}),i.jsx(wh,{primary:!0,disabled:!h(),onClick:m,children:"Qo'shish"})]})]})})},S4=u.div`
  flex: 1;
  display: flex;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 1300px) {
    flex-direction: column;
    overflow-y: auto;
  }
`,C4=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
  }
`,bh=u.div`
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
`,z4=u.video`
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
`;const E4=u.iframe`
  width: 100%;
  height: 100%;
  border: none;
`,_4=u.div`
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
`,T4=u.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,R4=u.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  pointer-events: ${e=>e.isYoutube?"none":"auto"};
`,I4=u.button`
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
`,$4=u.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,L0=u.div`
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
`,P4=u.div`
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

  ${L0}:hover &::after {
    opacity: 1;
  }
`,M4=u.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
`,A4=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,O4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,N4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Bo=u.button`
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
`,L4=u.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;
`,D0=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,D4=u.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${D0}:hover & {
    width: 70px;
    opacity: 1;
  }
`,B4=u.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,F4=u.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,U4=u.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`,V4=u.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`,q4=u.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`,jh=u.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`,Sh=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,H4=u.div`
  display: flex;
  align-items: center;
`,Ch=u.div`
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
`,W4=u.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`,or=u.button`
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
`,G4=u.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${e=>e.open?"400px":"0"};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`,Y4=u.div`
  padding: 16px 24px;
`,zh=u.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-bottom: 12px;
`,Eh=u.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`,_h=u.div`
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
`,Th=u.div`
  flex: 1;
`,Rh=u.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`,Ih=u.div`
  font-size: 12px;
  color: ${e=>e.pending?"var(--warning-color)":"var(--success-color)"};
`,$h=u.div`
  display: flex;
  gap: 6px;
`,Xl=u.button`
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
`,Ph=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`,Mh=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`,K4=u.div`
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
`,Q4=u.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`,J4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,X4=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Z4=u.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`,e5=u.button`
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
`,t5=u.button`
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
`,n5=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${e=>e.collapsed?"0":"500px"};
    overflow: ${e=>e.collapsed?"hidden":"auto"};
    transition: max-height 0.3s ease;
  }
`,B0=u.div`
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
`,r5=u.div`
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
`,o5=u.div`
  flex: 1;
  min-width: 0;
`,i5=u.div`
  font-size: 14px;
  font-weight: ${e=>e.active?"600":"500"};
  color: ${e=>e.active?"var(--text-color)":"var(--text-secondary-color)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`,s5=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`,a5=u.span`
  display: flex;
  align-items: center;
  gap: 3px;
`,l5=u.button`
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

  ${B0}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
  }
`,c5=u.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`,u5=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`,d5=u.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #7c8cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.3);
`,f5=u.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`,p5=u.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`,h5=u.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
`,g5=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`,x5=u.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,m5=u.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted-color);
`,y5=u.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
`,ks=u.div`
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
`,v5=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,k5=u.input`
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
`,w5=u.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`,Ah=u.button`
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
`,b5=u.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,Oh=u.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,Nh=u.div`
  flex: 1;
  min-width: 0;
`,Lh=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Dh=u.span`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.isAdmin?"var(--primary-color)":"var(--text-color)"};
`,Bh=u.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(88, 101, 242, 0.15);
  color: var(--primary-color);
`,Fh=u.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Uh=u.p`
  font-size: 14px;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
`,j5=u.button`
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
`,S5=u.div`
  margin-left: 48px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,C5=u.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
`,z5=u.input`
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
`,E5=u.button`
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
`,_5=u.div`
  text-align: center;
  padding: 20px;
  color: var(--text-muted-color);
  font-size: 14px;
`,T5=u.button`
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
`,R5=u.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`;function Vh(e){if(isNaN(e))return"0:00";const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}:${n.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`:`${n}:${r.toString().padStart(2,"0")}`}function qh(e){return e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"K":e.toString()}function Hh(e){const t=new Date(e),r=new Date-t;if(isNaN(r))return"Noma'lum vaqt";const o=Math.floor(r/6e4),s=Math.floor(r/36e5),a=Math.floor(r/864e5);return o<1?"Hozirgina":o<60?`${o} daqiqa oldin`:s<24?`${s} soat oldin`:a<30?`${a} kun oldin`:t.toLocaleDateString("uz-UZ")}const I5=({selectedCourseId:e})=>{var hn,Tr,tr;const{courses:t,currentUser:n,isAdmin:r,isEnrolled:o,enrollInCourse:s,approveUser:a,removeUser:l,incrementViews:c,removeLesson:d,addComment:x,addReply:p}=qi(),[g,b]=f.useState(0),[k,j]=f.useState(!1),[C,y]=f.useState(!1),[h,m]=f.useState(!1),[w,S]=f.useState(""),[v,_]=f.useState(!1),[T,O]=f.useState(null),[N,z]=f.useState(""),[A,ne]=f.useState(!1),L=f.useRef(null),X=f.useRef(null),[Z,H]=f.useState(!1),[$,G]=f.useState(0),[I,W]=f.useState(0),[ie,R]=f.useState(1),[Q,ue]=f.useState(!1),[ge,le]=f.useState(!1),[re,J]=f.useState(!0),[je,Ne]=f.useState(0),[_e,tn]=f.useState(!1),Rt=f.useRef(null),ke=t.find(U=>U.id===e),Je=ke?o(e):"none",Ge=ke?r(e):!1;f.useEffect(()=>{b(0),j(!1),m(!1),H(!1),G(0),W(0),tn(!1)},[e]);const Xe=Ge||Je==="approved",qe=f.useCallback(U=>Xe||U===0,[Xe]),pn=!Xe&&g===0;f.useEffect(()=>{tn(!1),H(!1),G(0);const U=setTimeout(()=>{if(ke&&!_e){const fe=ke.lessons[g];fe&&qe(g)&&(c(e,fe.id),tn(!0))}},3e3);return()=>clearTimeout(U)},[g,ke,e,qe,_e,c]);const Ft=f.useCallback(()=>{L.current&&(Z?L.current.pause():L.current.play())},[Z]),It=f.useCallback(()=>{if(!L.current)return;G(L.current.currentTime);const U=L.current;U.buffered.length>0&&Ne(U.buffered.end(U.buffered.length-1)/U.duration*100)},[]);f.useCallback(U=>{W(U)},[]);const ye=f.useCallback(U=>{if(!L.current)return;const fe=U.currentTarget.getBoundingClientRect(),dt=(U.clientX-fe.left)/fe.width;L.current.currentTime=dt*I},[I]),ze=f.useCallback(U=>{const fe=parseFloat(U.target.value);R(fe),L.current&&(L.current.volume=fe),ue(fe===0)},[]),Le=f.useCallback(()=>{L.current&&(Q?(L.current.volume=ie||1,ue(!1)):(L.current.volume=0,ue(!0)))},[Q,ie]),Ut=f.useCallback(()=>{X.current&&(document.fullscreenElement?(document.exitFullscreen(),le(!1)):(X.current.requestFullscreen(),le(!0)))},[]),F=f.useCallback(()=>{L.current&&(L.current.currentTime+=10)},[]),V=f.useCallback(()=>{L.current&&(L.current.currentTime-=10)},[]),oe=f.useCallback(()=>{J(!0),Rt.current&&clearTimeout(Rt.current),Rt.current=setTimeout(()=>{Z&&J(!1)},3e3)},[Z]),se=U=>{b(U)},de=f.useCallback(()=>{ke&&g<ke.lessons.length-1&&b(U=>U+1)},[ke,g]);if(!ke)return i.jsxs(u5,{children:[i.jsx(d5,{children:i.jsx(jp,{size:36,color:"white"})}),i.jsx(f5,{children:"Kursni tanlang"}),i.jsx(p5,{children:"Chap tarafdagi ro'yxatdan kursni tanlang yoki yangi kurs yarating."})]});const te=ke.lessons[g],ce=ke.members.filter(U=>U.status==="approved"),we=ke.members.filter(U=>U.status==="pending"),Ze=(hn=te==null?void 0:te.videoUrl)==null?void 0:hn.includes("youtu"),qt=Ze?(U=>{if(!U)return null;const fe=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,dt=U.match(fe);return dt&&dt[2].length===11?dt[2]:null})(te.videoUrl):null;return i.jsxs(i.Fragment,{children:[i.jsxs(S4,{children:[i.jsxs(C4,{children:[qe(g)&&te?i.jsxs(i.Fragment,{children:[Ze&&qt?i.jsx(bh,{ref:X,children:i.jsx(E4,{src:`https://www.youtube.com/embed/${qt}?rel=0&modestbranding=1`,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:te.title})}):i.jsxs(bh,{ref:X,onMouseMove:oe,onMouseLeave:()=>{Z&&J(!1)},onClick:Ft,children:[i.jsx(z4,{ref:L,src:te.videoUrl,onPlay:()=>H(!0),onPause:()=>H(!1),onTimeUpdate:It,onLoadedMetadata:()=>{L.current&&W(L.current.duration)},onEnded:de}),i.jsx(I4,{visible:!Z,onClick:U=>{U.stopPropagation(),Ft()},children:i.jsx(Rl,{size:32,fill:"white",color:"white"})}),i.jsxs(_4,{visible:re||!Z,onClick:U=>U.stopPropagation(),children:[i.jsx(T4,{children:i.jsx(R4,{children:te.title})}),i.jsxs($4,{children:[i.jsxs(L0,{onClick:ye,children:[i.jsx(M4,{style:{width:`${je}%`}}),i.jsx(P4,{style:{width:`${I?$/I*100:0}%`}})]}),i.jsxs(A4,{children:[i.jsxs(O4,{children:[i.jsx(Bo,{onClick:Ft,children:Z?i.jsx(iw,{size:20}):i.jsx(Rl,{size:20,fill:"white"})}),i.jsx(Bo,{onClick:V,title:"-10s",children:i.jsx(cw,{size:18})}),i.jsx(Bo,{onClick:F,title:"+10s",children:i.jsx(uw,{size:18})}),i.jsxs(D0,{children:[i.jsx(Bo,{onClick:Le,children:Q?i.jsx(pw,{size:18}):i.jsx(m0,{size:18})}),i.jsx(D4,{type:"range",min:"0",max:"1",step:"0.05",value:Q?0:ie,onChange:ze})]}),i.jsxs(L4,{children:[Vh($)," / ",Vh(I)]})]}),i.jsx(N4,{children:i.jsx(Bo,{onClick:Ut,children:ge?i.jsx(nw,{size:18}):i.jsx(f0,{size:18})})})]})]})]})]}),i.jsxs(B4,{children:[i.jsxs(F4,{children:[g+1,"-dars: ",te.title]}),i.jsxs(U4,{children:[i.jsxs(q4,{children:[i.jsx(su,{size:14}),qh(te.views)," ko'rish"]}),i.jsxs(V4,{children:[i.jsx(jp,{size:14}),ke.name]})]})]}),pn&&i.jsxs(jh,{style:{background:"var(--secondary-color)"},children:[i.jsxs(Sh,{style:{flex:1},children:[i.jsx("div",{style:{fontSize:14,color:"var(--text-color)",fontWeight:600},children:"Bu bepul tanishuv darsi ✨"}),i.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)",marginTop:2},children:"Qolgan darslarni ko'rish uchun kursga yoziling"})]}),Je==="none"?i.jsxs(or,{variant:"enroll",onClick:()=>s(e),children:[i.jsx(Il,{size:16}),"Kursga yozilish"]}):Je==="pending"?i.jsxs(or,{variant:"pending",children:[i.jsx(mr,{size:16}),"Kutilmoqda"]}):null]}),i.jsxs(h5,{children:[i.jsxs(g5,{children:[i.jsxs(x5,{children:[i.jsx(tw,{size:18}),"Izohlar"]}),i.jsxs(m5,{children:[((Tr=te.comments)==null?void 0:Tr.length)||0," ta izoh"]})]}),i.jsxs(y5,{children:[i.jsx(ks,{isAdmin:Ge,children:((tr=n.avatar)==null?void 0:tr.length)>1?i.jsx("img",{src:n.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(n.name||"?").charAt(0)}),i.jsxs(v5,{children:[i.jsx(k5,{placeholder:"Izoh qoldiring...",value:w,onChange:U=>{S(U.target.value),!v&&U.target.value&&_(!0)},onFocus:()=>_(!0),onKeyDown:U=>{U.key==="Enter"&&w.trim()&&(x(e,te.id,w.trim()),S(""),_(!1))}}),v&&i.jsxs(w5,{children:[i.jsx(Ah,{onClick:()=>{_(!1),S("")},children:"Bekor qilish"}),i.jsx(Ah,{primary:!0,disabled:!w.trim(),onClick:()=>{w.trim()&&(x(e,te.id,w.trim()),S(""),_(!1))},children:"Izoh qoldirish"})]})]})]}),!te.comments||te.comments.length===0?i.jsx(_5,{children:"Hali izohlar yo'q. Birinchi bo'lib izoh qoldiring!"}):i.jsxs(i.Fragment,{children:[(A?te.comments:te.comments.slice(0,1)).map(U=>{var fe,dt;return i.jsxs(b5,{children:[i.jsxs(Oh,{children:[i.jsx(ks,{isAdmin:U.userId===ke.createdBy,children:((fe=U.userAvatar)==null?void 0:fe.length)>1?i.jsx("img",{src:U.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.userName.charAt(0)}),i.jsxs(Nh,{children:[i.jsxs(Lh,{children:[i.jsx(Dh,{isAdmin:U.userId===ke.createdBy,children:U.userName}),U.userId===ke.createdBy&&i.jsx(Bh,{children:"Admin"}),i.jsx(Fh,{children:Hh(U.createdAt)})]}),i.jsx(Uh,{children:U.text}),i.jsxs(j5,{onClick:()=>{O(T===U.id?null:U.id),z("")},children:[i.jsx(qk,{size:12}),"Javob berish"]})]})]}),U.replies&&U.replies.length>0&&i.jsx(S5,{children:U.replies.map(et=>{var Hi;return i.jsxs(Oh,{children:[i.jsx(ks,{small:!0,isAdmin:et.userId===ke.createdBy,children:((Hi=et.userAvatar)==null?void 0:Hi.length)>1?i.jsx("img",{src:et.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):et.userName.charAt(0)}),i.jsxs(Nh,{children:[i.jsxs(Lh,{children:[i.jsx(Dh,{isAdmin:et.userId===ke.createdBy,children:et.userName}),et.userId===ke.createdBy&&i.jsx(Bh,{children:"Admin"}),i.jsx(Fh,{children:Hh(et.createdAt)})]}),i.jsx(Uh,{children:et.text})]})]},et.id)})}),T===U.id&&i.jsxs(C5,{children:[i.jsx(ks,{small:!0,isAdmin:Ge,children:((dt=n.avatar)==null?void 0:dt.length)>1?i.jsx("img",{src:n.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(n.name||"?").charAt(0)}),i.jsx(z5,{placeholder:"Javob yozing...",value:N,onChange:et=>z(et.target.value),onKeyDown:et=>{et.key==="Enter"&&N.trim()&&(p(e,te.id,U.id,N.trim()),z(""),O(null))},autoFocus:!0}),i.jsx(E5,{disabled:!N.trim(),onClick:()=>{N.trim()&&(p(e,te.id,U.id,N.trim()),z(""),O(null))},children:i.jsx(aw,{size:14})})]})]},U.id)}),te.comments.length>1&&i.jsx(T5,{onClick:()=>ne(!A),children:A?i.jsxs(i.Fragment,{children:[i.jsx(_l,{size:14}),"Izohlarni yashirish"]}):i.jsxs(i.Fragment,{children:[i.jsx(El,{size:14}),"Barcha izohlarni ko'rish (",te.comments.length,")"]})})]})]})]}):qe(g)&&ke.lessons.length===0?i.jsxs(Ph,{children:[i.jsx(Mh,{children:i.jsx(Sp,{size:32,color:"var(--text-muted-color)"})}),i.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:"Hali darslar qo'shilmagan"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14},children:Ge?"O'ng tarafdagi + tugmasini bosib dars qo'shing.":"Tez orada darslar qo'shiladi."})]}):i.jsxs(Ph,{children:[i.jsx(Mh,{children:Je==="pending"?i.jsx(mr,{size:32,color:"var(--warning-color)"}):i.jsx(Xk,{size:32,color:"var(--text-muted-color)"})}),i.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:Je==="pending"?"So'rov yuborildi":"Kursga yoziling"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14,maxWidth:350},children:Je==="pending"?"Sizning so'rovingiz admin tomonidan ko'rib chiqilmoqda. Iltimos kuting.":"Darslarni ko'rish uchun avval kursga yozilish kerak. Admin tasdiqlangandan keyin darslarni ko'rishingiz mumkin."}),Je==="none"&&i.jsxs(or,{variant:"enroll",onClick:()=>s(e),children:[i.jsx(Il,{size:16}),"Kursga yozilish"]})]}),i.jsxs(jh,{children:[i.jsxs(Sh,{children:[ce.length>0&&i.jsxs(H4,{children:[ce.slice(0,4).map((U,fe)=>{var dt;return i.jsx(Ch,{index:fe,children:((dt=U.avatar)==null?void 0:dt.length)>1?i.jsx("img",{src:U.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.name.charAt(0)},U.id)}),ce.length>4&&i.jsxs(Ch,{index:4,bg:"var(--input-color)",children:["+",ce.length-4]})]}),i.jsxs(W4,{children:[i.jsx(yo,{size:14}),ce.length," ta a'zo",we.length>0&&Ge&&i.jsxs("span",{style:{color:"var(--warning-color)"},children:["· ",we.length," kutmoqda"]})]})]}),Ge?i.jsxs(or,{variant:"admin",onClick:()=>m(!h),children:[i.jsx(Pi,{size:16}),"A'zolarni boshqarish",h?i.jsx(_l,{size:14}):i.jsx(El,{size:14})]}):Je==="none"?i.jsxs(or,{variant:"enroll",onClick:()=>s(e),children:[i.jsx(Il,{size:16}),"Yozilish"]}):Je==="pending"?i.jsxs(or,{variant:"pending",children:[i.jsx(mr,{size:16}),"Kutilmoqda"]}):i.jsxs(or,{variant:"enrolled",children:[i.jsx(kd,{size:16}),"A'zo"]})]}),Ge&&i.jsx(G4,{open:h,children:i.jsxs(Y4,{children:[we.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs(zh,{children:["Kutayotganlar (",we.length,")"]}),we.map(U=>{var fe;return i.jsxs(Eh,{children:[i.jsx(_h,{children:((fe=U.avatar)==null?void 0:fe.length)>1?i.jsx("img",{src:U.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.name.charAt(0)}),i.jsxs(Th,{children:[i.jsx(Rh,{children:U.name}),i.jsx(Ih,{pending:!0,children:"Kutmoqda"})]}),i.jsxs($h,{children:[i.jsx(Xl,{approve:!0,onClick:()=>a(e,U.id),title:"Tasdiqlash",children:i.jsx(fw,{size:16})}),i.jsx(Xl,{onClick:()=>l(e,U.id),title:"Rad etish",children:i.jsx(Ep,{size:16})})]})]},U.id)})]}),i.jsxs(zh,{style:{marginTop:we.length>0?16:0},children:["A'zolar (",ce.length,")"]}),ce.length===0?i.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:13,padding:"8px 0"},children:"Hali a'zolar yo'q"}):ce.map(U=>{var fe;return i.jsxs(Eh,{children:[i.jsx(_h,{children:((fe=U.avatar)==null?void 0:fe.length)>1?i.jsx("img",{src:U.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):U.name.charAt(0)}),i.jsxs(Th,{children:[i.jsx(Rh,{children:U.name}),i.jsx(Ih,{children:"Tasdiqlangan"})]}),i.jsx($h,{children:i.jsx(Xl,{onClick:()=>l(e,U.id),title:"Chiqarish",children:i.jsx(Ep,{size:16})})})]},U.id)})]})})]}),i.jsxs(K4,{children:[i.jsxs(Q4,{children:[i.jsxs(J4,{children:[i.jsx(Sp,{size:18}),"Darslar"]}),i.jsxs(X4,{children:[i.jsxs(Z4,{children:[ke.lessons.length," ta dars"]}),Ge&&i.jsx(e5,{onClick:()=>y(!0),title:"Dars qo'shish",children:i.jsx($i,{size:16})}),i.jsx(t5,{onClick:()=>j(!k),children:k?i.jsx(El,{size:20}):i.jsx(_l,{size:20})})]})]}),i.jsx(n5,{collapsed:k,children:ke.lessons.length===0?i.jsx(c5,{children:Ge?i.jsxs(i.Fragment,{children:["Hali darslar yo'q.",i.jsx("br",{}),i.jsx("span",{style:{fontSize:12},children:"+ tugmasini bosib dars qo'shing"})]}):"Hali darslar qo'shilmagan"}):ke.lessons.map((U,fe)=>i.jsxs(B0,{active:qe(fe)&&g===fe,onClick:()=>qe(fe)&&se(fe),style:{cursor:qe(fe)?"pointer":"default"},children:[i.jsx(r5,{active:qe(fe)&&g===fe,children:qe(fe)&&g===fe?i.jsx(Rl,{size:12,fill:"white"}):qe(fe)?fe+1:i.jsx(mo,{size:12})}),i.jsx(o5,{children:qe(fe)?i.jsxs(i.Fragment,{children:[i.jsxs(i5,{active:g===fe,children:[U.title,fe===0&&!Xe&&i.jsx("span",{style:{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:4,background:"rgba(67, 181, 129, 0.15)",color:"var(--success-color)",marginLeft:6,verticalAlign:"middle"},children:"Bepul"})]}),i.jsx(s5,{children:i.jsxs(a5,{children:[i.jsx(su,{size:11}),qh(U.views)]})})]}):i.jsxs(R5,{children:[i.jsx(mo,{size:12}),fe+1,"-dars"]})}),Ge&&i.jsx(l5,{onClick:dt=>{dt.stopPropagation(),d(e,U.id),g>=ke.lessons.length-1&&g>0&&b(g-1)},title:"O'chirish",children:i.jsx(Sd,{size:14})})]},U.id))})]})]}),i.jsx(j4,{isOpen:C,onClose:()=>y(!1),courseId:e})]})},$5=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  height: 100vh;
  overflow-y: auto;
`,P5=u.div`
  padding: 32px;
  background-color: var(--tertiary-color);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,M5=u.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
`,A5=u.div`
  position: relative;
  width: 100%;
  max-width: 600px;
`,O5=u.input`
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
`,N5=u(jd)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
`,L5=u.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
`,D5=u.button`
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
`;const B5=u.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`,Wh=u.h2`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`,Gh=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,Yh=u.div`
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
`,Kh=u.div`
  height: 160px;
  background: ${e=>e.gradient||"var(--primary-color)"};
  position: relative;
`,Qh=u.span`
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
`,Jh=u.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`,Xh=u.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 8px 0;
  line-height: 1.4;
`,Zh=u.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
`,eg=u.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
`,tg=u.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fbbf24;
  font-weight: 600;
  font-size: 13px;
`,ng=u.div`
  font-weight: 700;
  color: ${e=>e.free?"var(--success-color)":"var(--text-color)"};
  font-size: 14px;
`,F5=({onNavigateToCourse:e})=>{var b;const{courses:t}=qi(),[n,r]=f.useState(""),[o,s]=f.useState("all"),[a,l]=f.useState("popular"),c=[{id:"all",label:"Barchasi"},{id:"IT",label:"IT & Dasturlash"},{id:"SMM",label:"SMM & Marketing"},{id:"Til o'rganish",label:"Til o'rganish"},{id:"Mobile",label:"Mobil dasturlash"},{id:"Dizayn",label:"Dizayn"}],d=f.useMemo(()=>{let k=[...t];if(o!=="all"&&(k=k.filter(j=>j.category===o)),n){const j=n.toLowerCase();k=k.filter(C=>C.name.toLowerCase().includes(j)||C.description.toLowerCase().includes(j))}return a==="popular"?k.sort((j,C)=>C.rating-j.rating):a==="newest"?k.sort((j,C)=>new Date(C.createdAt)-new Date(j.createdAt)):a==="price_asc"?k.sort((j,C)=>j.price-C.price):a==="price_desc"&&k.sort((j,C)=>C.price-j.price),k},[t,n,o,a]),x=k=>k===0?"Bepul":new Intl.NumberFormat("uz-UZ").format(k)+" UZS",p=!n&&o==="all"&&a==="popular",g=({title:k,courses:j})=>!j||j.length===0?null:i.jsxs("div",{style:{marginBottom:40},children:[i.jsx(Wh,{children:k}),i.jsx(Gh,{children:j.map(C=>i.jsxs(Yh,{onClick:()=>e(C.id),children:[i.jsx(Kh,{gradient:C.gradient,children:i.jsx(Qh,{children:C.category||"General"})}),i.jsxs(Jh,{children:[i.jsx(Xh,{children:C.name}),i.jsxs(Zh,{children:[i.jsx(Mi,{size:14}),C.createdBy==="user-1"?"Sardor Alimov":C.createdBy==="user-2"?"Jasur Karimov":"Malika Rahimova"]}),i.jsx("p",{style:{fontSize:13,color:"var(--text-muted-color)",margin:0,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:C.description}),i.jsxs(eg,{children:[i.jsxs(tg,{children:[i.jsx(zp,{size:14,fill:"#fbbf24",stroke:"#fbbf24"}),C.rating||4.5]}),i.jsx(ng,{free:C.price===0,children:x(C.price||0)})]})]})]},C.id))})]});return i.jsxs($5,{children:[i.jsxs(P5,{children:[i.jsx(M5,{children:"Kurslar Dashboardi"}),i.jsxs(A5,{children:[i.jsx(N5,{size:20}),i.jsx(O5,{placeholder:"Kurslarni qidiring...",value:n,onChange:k=>r(k.target.value)})]}),i.jsx(L5,{children:c.map(k=>i.jsx(D5,{active:o===k.id,onClick:()=>s(k.id),children:k.label},k.id))})]}),i.jsx(B5,{children:p?i.jsxs(i.Fragment,{children:[i.jsx(g,{title:"Top Kurslar 🔥",courses:[...t].sort((k,j)=>j.rating-k.rating).slice(0,3)}),i.jsx(g,{title:"Yangi qo'shilganlar 🆕",courses:[...t].sort((k,j)=>new Date(j.createdAt)-new Date(k.createdAt)).slice(0,3)}),i.jsx(g,{title:"Arzon kurslar 🏷️",courses:[...t].sort((k,j)=>k.price-j.price).slice(0,3)}),i.jsx(g,{title:"IT & Dasturlash 💻",courses:t.filter(k=>k.category==="IT")}),i.jsx(g,{title:"SMM & Marketing 📱",courses:t.filter(k=>k.category==="SMM")}),i.jsx(g,{title:"Til o'rganish 🌍",courses:t.filter(k=>k.category==="Til o'rganish")}),i.jsx(g,{title:"Mobil Dasturlash 📱",courses:t.filter(k=>k.category==="Mobile")})]}):i.jsxs(i.Fragment,{children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[i.jsx(Wh,{children:o==="all"?"Qidiruv natijalari":(b=c.find(k=>k.id===o))==null?void 0:b.label}),i.jsxs("select",{style:{background:"var(--tertiary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)",padding:"6px 12px",borderRadius:"6px",outline:"none"},value:a,onChange:k=>l(k.target.value),children:[i.jsx("option",{value:"popular",children:"Ommabop"}),i.jsx("option",{value:"newest",children:"Yangi qo'shilgan"}),i.jsx("option",{value:"price_asc",children:"Arzonroq"}),i.jsx("option",{value:"price_desc",children:"Qimmatroq"})]})]}),d.length>0?i.jsx(Gh,{children:d.map(k=>i.jsxs(Yh,{onClick:()=>e(k.id),children:[i.jsx(Kh,{gradient:k.gradient,children:i.jsx(Qh,{children:k.category||"General"})}),i.jsxs(Jh,{children:[i.jsx(Xh,{children:k.name}),i.jsxs(Zh,{children:[i.jsx(Mi,{size:14}),k.createdBy==="user-1"?"Sardor Alimov":k.createdBy==="user-2"?"Jasur Karimov":"Malika Rahimova"]}),i.jsx("p",{style:{fontSize:13,color:"var(--text-muted-color)",margin:0,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:k.description}),i.jsxs(eg,{children:[i.jsxs(tg,{children:[i.jsx(zp,{size:14,fill:"#fbbf24",stroke:"#fbbf24"}),k.rating||4.5]}),i.jsx(ng,{free:k.price===0,children:x(k.price||0)})]})]})]},k.id))}):i.jsx("div",{style:{textAlign:"center",padding:"40px",color:"var(--text-muted-color)"},children:"Hech qanday kurs topilmadi"})]})})]})},U5=u.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`,V5=u.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: relative;
  }
`,q5=u.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,H5=({initialNav:e="home",initialChannel:t=0})=>{const{chats:n,createChat:r,selectedNav:o,setSelectedNav:s,selectedChannel:a,setSelectedChannel:l}=Vi(),c=_r(),[d,x]=f.useState(window.innerWidth<=768),[p,g]=f.useState(!1),[b,k]=f.useState(null);f.useEffect(()=>{const y=()=>x(window.innerWidth<=768);return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[]),f.useEffect(()=>{e&&e!==o&&s(e),t!==void 0&&t!==a&&l(t)},[e,t]);const j=y=>{s(y),l(0),c(`/${y}`)},C=async y=>{try{const h=await r({isGroup:!0,name:y.name,description:y.description,avatar:y.image,memberIds:y.members});g(!1),h&&c(`/a/${h}`)}catch(h){console.error("Failed to create group",h)}};return i.jsxs(U5,{children:[i.jsx(Mb,{selectedNav:o,onSelectNav:j}),i.jsx(V5,{children:o==="courses"?i.jsxs(i.Fragment,{children:[i.jsx(s4,{onSelectCourse:k}),i.jsx(I5,{courseId:b})]}):o==="home"?i.jsx(F5,{onNavigateToCourse:y=>{k(y),j("courses")}}):i.jsxs(i.Fragment,{children:[!d||!a||a==="0"?i.jsx(Yb,{selectedChannel:a,selectedNav:o,chats:n,onOpenCreateGroup:()=>g(!0)}):null,i.jsx(q5,{children:a&&a!=="0"?i.jsx(dS,{selectedChannel:a,selectedNav:o,chats:n,onBack:()=>{l(0),c(`/${o}`)}}):i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#8e9297"},children:"Suhbatni tanlang"})})]})}),i.jsx(RS,{isOpen:p,onClose:()=>g(!1),onCreate:C,users:n.filter(y=>y.type==="user"&&!y.isSavedMessages).map(y=>{var w;const h=JSON.parse(localStorage.getItem("user")||"{}"),m=(w=y.members)==null?void 0:w.find(S=>(S._id||S.id)!==((h==null?void 0:h._id)||(h==null?void 0:h.id)));return{...m,id:(m==null?void 0:m._id)||(m==null?void 0:m.id),name:(m==null?void 0:m.nickname)||(m==null?void 0:m.username)||"Noma'lum"}}).filter(y=>y.id)})]})},W5=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dcddde;
  text-align: center;
  padding: 40px;
`,G5=u.div`
  width: 120px;
  height: 120px;
  background-color: #7289da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`,Y5=u.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
`,K5=u.p`
  font-size: 16px;
  color: #b9bbbe;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`,Q5=u.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 800px;
  width: 100%;
  margin-top: 40px;
`,Fo=u.div`
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
`,ws=u(Lm)`
  text-decoration: none;
  color: inherit;
`,Uo=u.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Vo=u.p`
  color: #b9bbbe;
  line-height: 1.5;
`,J5=()=>i.jsxs(W5,{children:[i.jsx(G5,{children:i.jsx(au,{size:60,color:"white"})}),i.jsx(Y5,{children:"Welcome to Jamm"}),i.jsx(K5,{children:"This is a modern communication platform built with React, Vite, and styled-components. Experience real-time chat, voice channels, and a beautiful interface."}),i.jsxs(Q5,{children:[i.jsx(ws,{to:"/home",children:i.jsxs(Fo,{children:[i.jsxs(Uo,{children:[i.jsx(p0,{size:20}),"All Chats"]}),i.jsx(Vo,{children:"View and manage all your conversations in one place. Switch between different chats and stay connected."})]})}),i.jsx(ws,{to:"/users",children:i.jsxs(Fo,{children:[i.jsxs(Uo,{children:[i.jsx(yo,{size:20}),"Direct Messages"]}),i.jsx(Vo,{children:"Start one-on-one conversations with friends and colleagues. Private and secure messaging."})]})}),i.jsx(ws,{to:"/groups",children:i.jsxs(Fo,{children:[i.jsxs(Uo,{children:[i.jsx(x0,{size:20}),"Group Chats"]}),i.jsx(Vo,{children:"Create and join group conversations with multiple participants. Perfect for teams and communities."})]})}),i.jsxs(Fo,{children:[i.jsxs(Uo,{children:[i.jsx(au,{size:20}),"Modern UI"]}),i.jsx(Vo,{children:"Beautiful, responsive interface that works on all devices. Smooth animations and intuitive user experience."})]}),i.jsx(ws,{to:"/courses",children:i.jsxs(Fo,{children:[i.jsxs(Uo,{children:[i.jsx(wd,{size:20}),"Courses"]}),i.jsx(Vo,{children:"Watch video lessons, track your progress, and learn new skills. YouTube-like player with organized playlists."})]})})]})]}),X5=er`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,Zl=er`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;er`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;const Z5=u.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1b2e 0%, #16171d 50%, #0d0e14 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`,ec=u.div`
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
    animation: ${Zl} 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: #eb459e;
    bottom: -50px;
    left: -50px;
    animation: ${Zl} 10s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: #57f287;
    top: 50%;
    left: 50%;
    animation: ${Zl} 12s ease-in-out infinite;
  }
`,eC=u.div`
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
  animation: ${X5} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 420px;
    flex-direction: column;
  }
`,tC=u.div`
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
`,nC=u.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
`,rC=u.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`,oC=u.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`,bs=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`,js=u.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Ss=u.span`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`,iC=u.div`
  flex: 1;
  padding: 40px;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`,sC=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`,aC=u.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5865f2, #7b6cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.35);
`,lC=u.h1`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #b9bbbe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`,cC=u.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
`,uC=u.p`
  font-size: 14px;
  color: #b9bbbe;
  text-align: center;
  margin-bottom: 24px;
`,dC=u.div`
  display: flex;
  background: rgba(32, 34, 37, 0.7);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
`,rg=u.button`
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
`,fC=u.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,qo=u.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ho=u.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b9bbbe;
`,Wo=u.div`
  position: relative;
  display: flex;
  align-items: center;
`,ar=u.div`
  position: absolute;
  left: 14px;
  color: #72767d;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
`,Go=u.input`
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

  &:focus ~ ${ar}, &:focus + ${ar} {
    color: #5865f2;
  }
`,pC=u.button`
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
`,hC=u.button`
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
`,gC=u.div`
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
`,xC=u.button`
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
`,mC=()=>i.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[i.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",fill:"#4285F4"}),i.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),i.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),i.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),yC=u.p`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #72767d;
`,og=u.button`
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
`,vC=u.div`
  background: rgba(240, 71, 71, 0.12);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #f04747;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`,kC=u.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,wC=()=>{const e=_r(),[t,n]=f.useState("login"),[r,o]=f.useState(!1),[s,a]=f.useState(""),[l,c]=f.useState(""),[d,x]=f.useState(""),[p,g]=f.useState(""),[b,k]=f.useState(""),[j,C]=f.useState(!1),[y,h]=f.useState(""),m="http://localhost:3000",w=async v=>{v.preventDefault(),h(""),C(!0);try{const _=t==="login"?"/auth/login":"/auth/signup",T=t==="login"?{email:s,password:l}:{email:s,password:l,username:d,nickname:p,phone:b},O=await fetch(`${m}${_}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(T)}),N=await O.json();if(!O.ok)throw new Error(N.message||"Xatolik yuz berdi");localStorage.setItem("token",N.access_token),localStorage.setItem("user",JSON.stringify(N.user)),e("/")}catch(_){h(_.message)}finally{C(!1)}},S=()=>{alert("Google Auth hali ulanmagan. Email/parol bilan kiring.")};return i.jsxs(Z5,{children:[i.jsx(ec,{}),i.jsx(ec,{}),i.jsx(ec,{}),i.jsxs(eC,{children:[i.jsxs(tC,{children:[i.jsx(nC,{children:"Jamm platformasiga xush kelibsiz!"}),i.jsx(rC,{children:"Zamonaviy muloqot va ta'lim platformasi. Do'stlaringiz bilan bog'laning va yangi bilimlar oling."}),i.jsxs(oC,{children:[i.jsxs(bs,{children:[i.jsx(js,{children:i.jsx(p0,{size:18,color:"white"})}),i.jsx(Ss,{children:"Real-time chat va guruhlar"})]}),i.jsxs(bs,{children:[i.jsx(js,{children:i.jsx(wd,{size:18,color:"white"})}),i.jsx(Ss,{children:"Video kurslar va darsliklar"})]}),i.jsxs(bs,{children:[i.jsx(js,{children:i.jsx(hw,{size:18,color:"white"})}),i.jsx(Ss,{children:"Tez va qulay interfeys"})]}),i.jsxs(bs,{children:[i.jsx(js,{children:i.jsx(Pi,{size:18,color:"white"})}),i.jsx(Ss,{children:"Xavfsiz va himoyalangan"})]})]})]}),i.jsxs(iC,{children:[i.jsxs(sC,{children:[i.jsx(aC,{children:i.jsx(au,{size:26,color:"white"})}),i.jsx(lC,{children:"Jamm"})]}),i.jsx(cC,{children:t==="login"?"Qaytib kelganingizdan xursandmiz!":"Akkaunt yarating"}),i.jsx(uC,{children:t==="login"?"Hisobingizga kirish uchun ma'lumotlaringizni kiriting":"Ro'yxatdan o'tib, platformaga qo'shiling"}),i.jsxs(dC,{children:[i.jsx(rg,{$active:t==="login",onClick:()=>n("login"),children:"Kirish"}),i.jsx(rg,{$active:t==="signup",onClick:()=>n("signup"),children:"Ro'yxatdan o'tish"})]}),i.jsxs(fC,{onSubmit:w,children:[t==="signup"&&i.jsxs(kC,{children:[i.jsxs(qo,{children:[i.jsx(Ho,{children:"Username"}),i.jsxs(Wo,{children:[i.jsx(Go,{type:"text",placeholder:"username",value:d,onChange:v=>x(v.target.value),required:!0}),i.jsx(ar,{children:i.jsx(Dk,{size:16})})]})]}),i.jsxs(qo,{children:[i.jsx(Ho,{children:"Nik (Laqab)"}),i.jsxs(Wo,{children:[i.jsx(Go,{type:"text",placeholder:"Nikingiz",value:p,onChange:v=>g(v.target.value),required:!0}),i.jsx(ar,{children:i.jsx(Mi,{size:16})})]})]})]}),i.jsxs(qo,{children:[i.jsx(Ho,{children:"Email"}),i.jsxs(Wo,{children:[i.jsx(Go,{type:"email",placeholder:"email@example.com",value:s,onChange:v=>a(v.target.value),required:!0}),i.jsx(ar,{children:i.jsx(ew,{size:16})})]})]}),t==="signup"&&i.jsxs(qo,{children:[i.jsx(Ho,{children:"Telefon raqam"}),i.jsxs(Wo,{children:[i.jsx(Go,{type:"tel",placeholder:"+998 90 123 45 67",value:b,onChange:v=>k(v.target.value),required:!0}),i.jsx(ar,{children:i.jsx(bd,{size:16})})]})]}),i.jsxs(qo,{children:[i.jsx(Ho,{children:"Parol"}),i.jsxs(Wo,{children:[i.jsx(Go,{type:r?"text":"password",placeholder:"••••••••",value:l,onChange:v=>c(v.target.value),required:!0}),i.jsx(ar,{children:i.jsx(mo,{size:16})}),i.jsx(pC,{type:"button",onClick:()=>o(!r),children:r?i.jsx(Hk,{size:16}):i.jsx(su,{size:16})})]})]}),y&&i.jsx(vC,{children:y}),i.jsxs(hC,{type:"submit",disabled:j,children:[j?"Yuklanmoqda...":t==="login"?"Kirish":"Ro'yxatdan o'tish",!j&&i.jsx(Lk,{size:18})]})]}),i.jsx(gC,{children:i.jsx("span",{children:"yoki"})}),i.jsxs(xC,{onClick:S,children:[i.jsx(mC,{}),"Google orqali ",t==="login"?"kirish":"ro'yxatdan o'tish"]}),i.jsx(yC,{children:t==="login"?i.jsxs(i.Fragment,{children:["Hisobingiz yo'qmi?"," ",i.jsx(og,{type:"button",onClick:()=>n("signup"),children:"Ro'yxatdan o'ting"})]}):i.jsxs(i.Fragment,{children:["Hisobingiz bormi?"," ",i.jsx(og,{type:"button",onClick:()=>n("login"),children:"Kirish"})]})})]})]})]})},bC="http://localhost:3000",jC={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]};function SC({roomId:e,displayName:t,enabled:n,isCreator:r=!1,isPrivate:o=!1,chatTitle:s="",initialMicOn:a=!0,initialCamOn:l=!0}){const c=f.useRef(null),d=f.useRef(null),x=f.useRef({}),[p,g]=f.useState(null),[b,k]=f.useState([]),[j,C]=f.useState(null),[y,h]=f.useState([]),[m,w]=f.useState(!1),[S,v]=f.useState([]),[_,T]=f.useState(a),[O,N]=f.useState(l),[z,A]=f.useState(!1),[ne,L]=f.useState(!1),[X,Z]=f.useState(!1),[H,$]=f.useState(new Set),[G,I]=f.useState("idle"),[W,ie]=f.useState(null),[R,Q]=f.useState(s||""),[ue,ge]=f.useState(!1),le=f.useRef(null),re=f.useRef({}),J=f.useRef({}),je=f.useCallback((F,V,oe)=>{k(se=>se.find(de=>de.peerId===F)?se.map(de=>de.peerId===F?{...de,stream:V}:de):[...se,{peerId:F,stream:V,displayName:oe||F}])},[]),Ne=f.useCallback(F=>{k(V=>V.filter(oe=>oe.peerId!==F)),h(V=>V.filter(oe=>oe.peerId!==F)),delete J.current[F],x.current[F]&&(x.current[F].close(),delete x.current[F])},[]),_e=f.useCallback((F,V)=>{const oe=new RTCPeerConnection(jC);return d.current&&d.current.getTracks().forEach(se=>oe.addTrack(se,d.current)),le.current&&le.current.getTracks().forEach(se=>oe.addTrack(se,le.current)),oe.ontrack=se=>{const[de]=se.streams;if(!de)return;const te=J.current[F];te?te===de.id?je(F,de,V):h(ce=>ce.find(we=>we.peerId===F)?ce.map(we=>we.peerId===F?{...we,stream:de}:we):[...ce,{peerId:F,stream:de,displayName:V}]):(J.current[F]=de.id,je(F,de,V))},oe.onicecandidate=se=>{se.candidate&&c.current&&c.current.emit("ice-candidate",{targetId:F,candidate:se.candidate})},oe.onconnectionstatechange=()=>{["failed","disconnected"].includes(oe.connectionState)&&Ne(F)},x.current[F]=oe,oe},[je,Ne]),tn=f.useCallback(F=>{F.on("offer",async({senderId:V,sdp:oe})=>{let se=x.current[V];se||(se=_e(V,V)),await se.setRemoteDescription(new RTCSessionDescription(oe));const de=await se.createAnswer();await se.setLocalDescription(de),F.emit("answer",{targetId:V,sdp:de})}),F.on("answer",async({senderId:V,sdp:oe})=>{const se=x.current[V];se&&await se.setRemoteDescription(new RTCSessionDescription(oe))}),F.on("ice-candidate",async({senderId:V,candidate:oe})=>{const se=x.current[V];if(se&&oe)try{await se.addIceCandidate(new RTCIceCandidate(oe))}catch{}}),F.on("peer-joined",async({peerId:V,displayName:oe})=>{const se=_e(V,oe),de=await se.createOffer();await se.setLocalDescription(de),F.emit("offer",{targetId:V,sdp:de})}),F.on("existing-peers",({peers:V})=>{I("joined")}),F.on("peer-left",({peerId:V})=>{Ne(V)})},[_e,Ne]);f.useEffect(()=>{if(!n||!e)return;let F=!0;return(async()=>{I("connecting"),ie(null);try{const oe=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});if(!F){oe.getTracks().forEach(ce=>ce.stop());return}d.current=oe,g(oe);const se=oe.getAudioTracks()[0];se&&(se.enabled=a);const de=oe.getVideoTracks()[0];de&&(de.enabled=l);const te=no(`${bC}/video`,{transports:["websocket"]});c.current=te,tn(te),r&&te.on("knock-request",({peerId:ce,displayName:we})=>{v(Ze=>[...Ze,{peerId:ce,displayName:we}])}),r||(te.on("waiting-for-approval",()=>{I("waiting")}),te.on("knock-approved",({mediaLocked:ce})=>{var we,Ze;if(I("joined"),ce){A(!0),L(!0);const Vt=(we=d.current)==null?void 0:we.getAudioTracks()[0];Vt&&(Vt.enabled=!1,T(!1));const qt=(Ze=d.current)==null?void 0:Ze.getVideoTracks()[0];qt&&(qt.enabled=!1,N(!1))}}),te.on("knock-rejected",({reason:ce})=>{I("rejected"),ie(ce||"Rad etildi")})),te.on("room-info",({title:ce})=>{ce&&Q(ce)}),te.on("screen-share-stopped",({peerId:ce})=>{h(we=>we.filter(Ze=>Ze.peerId!==ce)),delete J.current[ce]}),te.on("recording-started",()=>ge(!0)),te.on("recording-stopped",()=>ge(!1)),te.on("kicked",()=>{ie("Siz yaratuvchi tomonidan chiqarib yuborildingiz"),I("rejected"),Xe()}),te.on("force-mute-mic",()=>{var we;const ce=(we=d.current)==null?void 0:we.getAudioTracks()[0];ce&&(ce.enabled=!1,T(!1)),A(!0)}),te.on("force-mute-cam",()=>{var we;const ce=(we=d.current)==null?void 0:we.getVideoTracks()[0];ce&&(ce.enabled=!1,N(!1)),L(!0)}),te.on("allow-mic",()=>A(!1)),te.on("allow-cam",()=>L(!1)),te.on("hand-raised",({peerId:ce})=>{$(we=>new Set([...we,ce]))}),te.on("hand-lowered",({peerId:ce})=>{$(we=>{const Ze=new Set(we);return Ze.delete(ce),Ze})}),r?(te.emit("create-room",{roomId:e,displayName:t,isPrivate:o,title:s}),te.once("room-created",()=>{I("joined")})):te.emit("join-room",{roomId:e,displayName:t})}catch(oe){console.error("[useWebRTC]",oe),F&&(ie(oe.message||"Kamera/mikrofonga ruxsat berilmadi"),I("idle"))}})(),()=>{F=!1,Object.values(x.current).forEach(oe=>oe.close()),x.current={},d.current&&(d.current.getTracks().forEach(oe=>oe.stop()),d.current=null),g(null),k([]),v([]),c.current&&(c.current.emit("leave-room",{roomId:e}),c.current.disconnect())}},[n,e,t,r,o,tn]);const Rt=f.useCallback(F=>{c.current&&(c.current.emit("approve-knock",{roomId:e,peerId:F}),v(V=>V.filter(oe=>oe.peerId!==F)))},[e]),ke=f.useCallback(F=>{c.current&&(c.current.emit("reject-knock",{roomId:e,peerId:F}),v(V=>V.filter(oe=>oe.peerId!==F)))},[e]),Je=f.useCallback(()=>{var V;if(z)return;const F=(V=d.current)==null?void 0:V.getAudioTracks()[0];F&&(F.enabled=!F.enabled,T(F.enabled))},[z]),Ge=f.useCallback(()=>{var V;if(ne)return;const F=(V=d.current)==null?void 0:V.getVideoTracks()[0];F&&(F.enabled=!F.enabled,N(F.enabled))},[ne]),Xe=f.useCallback(()=>{var F,V;c.current&&(c.current.emit("leave-room",{roomId:e}),c.current.disconnect()),Object.values(x.current).forEach(oe=>oe.close()),x.current={},(F=d.current)==null||F.getTracks().forEach(oe=>oe.stop()),d.current=null,(V=le.current)==null||V.getTracks().forEach(oe=>oe.stop()),le.current=null,g(null),C(null),w(!1),k([]),h([])},[e]),qe=f.useCallback(async()=>{var F,V,oe;if(m){(F=le.current)==null||F.getTracks().forEach(se=>se.stop()),Object.entries(re.current).forEach(([se,de])=>{const te=x.current[se];if(te&&de)try{te.removeTrack(de)}catch{}}),re.current={},le.current=null,C(null),w(!1),c.current&&c.current.emit("screen-share-stopped",{roomId:e});for(const[se,de]of Object.entries(x.current))try{const te=await de.createOffer();await de.setLocalDescription(te),(V=c.current)==null||V.emit("offer",{targetId:se,sdp:te})}catch{}return}try{const se=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});le.current=se,C(se),w(!0),se.getVideoTracks()[0].onended=()=>{qe()};for(const[de,te]of Object.entries(x.current)){const ce=te.addTrack(se.getVideoTracks()[0],se);re.current[de]=ce}c.current&&c.current.emit("screen-share-started",{roomId:e});for(const[de,te]of Object.entries(x.current))try{const ce=await te.createOffer();await te.setLocalDescription(ce),(oe=c.current)==null||oe.emit("offer",{targetId:de,sdp:ce})}catch{}}catch(se){console.error("Screen share error:",se)}},[m,e]),pn=f.useCallback(F=>{c.current&&c.current.emit(F?"recording-started":"recording-stopped",{roomId:e})},[e]),Ft=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("force-mute-mic",{roomId:e,peerId:F})},[e]),It=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("force-mute-cam",{roomId:e,peerId:F})},[e]),ye=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("allow-mic",{roomId:e,peerId:F})},[e]),ze=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("allow-cam",{roomId:e,peerId:F})},[e]),Le=f.useCallback(F=>{var V;(V=c.current)==null||V.emit("kick-peer",{roomId:e,peerId:F})},[e]),Ut=f.useCallback(()=>{var V;const F=!X;Z(F),(V=c.current)==null||V.emit(F?"hand-raised":"hand-lowered",{roomId:e})},[X,e]);return{localStream:p,remoteStreams:b,screenStream:j,remoteScreenStreams:y,isScreenSharing:m,toggleScreenShare:qe,knockRequests:S,approveKnock:Rt,rejectKnock:ke,joinStatus:G,isMicOn:_,isCamOn:O,micLocked:z,camLocked:ne,toggleMic:Je,toggleCam:Ge,leaveCall:Xe,error:W,roomTitle:R,remoteIsRecording:ue,emitRecording:pn,forceMuteMic:Ft,forceMuteCam:It,allowMic:ye,allowCam:ze,isHandRaised:X,raisedHands:H,toggleHandRaise:Ut,kickPeer:Le}}const $d=er`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,CC=er`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,zC=u.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
  animation: ${$d} 0.3s ease-out;
`,EC=u.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`,_C=u.div`
  display: flex;
  flex-direction: column;
`,TC=u.span`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`,RC=u.span`
  color: #72767d;
  font-size: 11px;
  font-family: monospace;
`,IC=u.div`
  display: flex;
  gap: 8px;
`,Yo=u.button`
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
`,$C=u.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,PC=u.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${e=>{const t=e.$count;return t===1?Yr`
        grid-template-columns: 1fr;
      `:t===2?Yr`
        grid-template-columns: 1fr 1fr;
      `:t<=4?Yr`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `:Yr`
      grid-template-columns: repeat(3, 1fr);
    `}}
`,MC=u.div`
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
`,AC=u.div`
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
`,OC=u.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #4f545c;
`,NC=u.div`
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
`,LC=u.div`
  width: 280px;
  flex-shrink: 0;
  background: #18191c;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
`,DC=u.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,BC=u.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,FC=u.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  animation: ${$d} 0.2s ease;
`,UC=u.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`,VC=u.div`
  display: flex;
  gap: 6px;
`,ig=u.button`
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
`;const sg=u.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`,ag=u.div`
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
`,lg=u.div`
  flex: 1;
  min-width: 0;
  color: #dcddde;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,cg=u.div`
  display: flex;
  gap: 4px;
  color: #4f545c;
  flex-shrink: 0;
`,ug=u.div`
  color: #72767d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`,qC=u.span`
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
`,HC=u.button`
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
`,WC=u.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
`,Pr=u.button`
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
`,Cs=u.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #b9bbbe;
  font-size: 15px;
`,GC=u(yr)`
  animation: ${CC} 1.2s linear infinite;
`,YC=er`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,KC=u.div`
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
  animation: ${YC} 1.5s ease infinite;
`,QC=u.div`
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
  animation: ${$d} 0.15s ease;
  z-index: 100;
`,dg=u.button`
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
`,fg=u.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${e=>e.$bg||"rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`,JC=u.button`
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
`,zs=({stream:e,muted:t=!1,isLocal:n=!1,label:r,isCamOn:o=!0})=>{var c;const s=f.useRef(null),a=f.useRef(null);f.useEffect(()=>{s.current&&e&&(s.current.srcObject=e)},[e,o]);const l=()=>{var x,p;const d=a.current;d&&(document.fullscreenElement?document.exitFullscreen():(x=d.requestFullscreen)!=null&&x.call(d)||((p=d.webkitRequestFullscreen)==null||p.call(d)))};return i.jsxs(MC,{$isLocal:n,ref:a,onDoubleClick:l,style:{cursor:"pointer"},onMouseEnter:d=>{const x=d.currentTarget.querySelector(".fs-btn");x&&(x.style.opacity=1)},onMouseLeave:d=>{const x=d.currentTarget.querySelector(".fs-btn");x&&(x.style.opacity=0)},children:[i.jsx(JC,{className:"fs-btn",onClick:l,children:i.jsx(f0,{size:14})}),o&&e?i.jsx("video",{ref:s,autoPlay:!0,playsInline:!0,muted:t}):i.jsxs(OC,{children:[i.jsx(NC,{children:((c=r==null?void 0:r.charAt(0))==null?void 0:c.toUpperCase())||"?"}),i.jsx("span",{style:{fontSize:12},children:r})]}),i.jsxs(AC,{children:[!o&&i.jsx(to,{size:11}),r,n&&" (Sen)"]})]})},XC=({isOpen:e,onClose:t,roomId:n,chatTitle:r,isCreator:o=!0,isPrivate:s=!1,initialMicOn:a=!0,initialCamOn:l=!0})=>{var It;const[c,d]=f.useState(!1),[x,p]=f.useState(!1),g=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")}catch{return null}})(),b=(g==null?void 0:g.nickname)||(g==null?void 0:g.username)||"Mehmon",{localStream:k,remoteStreams:j,screenStream:C,remoteScreenStreams:y,isScreenSharing:h,toggleScreenShare:m,knockRequests:w,approveKnock:S,rejectKnock:v,joinStatus:_,isMicOn:T,isCamOn:O,micLocked:N,camLocked:z,toggleMic:A,toggleCam:ne,leaveCall:L,error:X,roomTitle:Z,remoteIsRecording:H,emitRecording:$,forceMuteMic:G,forceMuteCam:I,allowMic:W,allowCam:ie,isHandRaised:R,raisedHands:Q,toggleHandRaise:ue,kickPeer:ge}=SC({roomId:n,displayName:b,enabled:e&&!!n,isCreator:o,isPrivate:s,chatTitle:r,initialMicOn:a,initialCamOn:l}),[le,re]=f.useState(!1),[J,je]=f.useState(!1),Ne=f.useRef(null),_e=f.useRef([]),tn=f.useRef(null),Rt=f.useRef(null),ke=f.useRef(null),Je=f.useCallback(()=>{const ye=new AudioContext,ze=ye.createMediaStreamDestination();return[k,...j.map(Ut=>Ut.stream)].filter(Boolean).forEach(Ut=>{const F=Ut.getAudioTracks();F.length>0&&ye.createMediaStreamSource(new MediaStream(F)).connect(ze)}),ze.stream},[k,j]),Ge=f.useCallback(async ye=>{try{je(!1);let ze;if(ye==="screen"){const V=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});ke.current=V,ze=V,V.getVideoTracks()[0].onended=()=>Xe()}else{const V=document.createElement("canvas");V.width=1280,V.height=720,tn.current=V;const oe=V.getContext("2d"),se=()=>{const de=document.querySelectorAll("video"),te=de.length||1,ce=te<=1?1:te<=4?2:3,we=Math.ceil(te/ce),Ze=V.width/ce,Vt=V.height/we;oe.fillStyle="#0b0d0f",oe.fillRect(0,0,V.width,V.height),de.forEach((qt,hn)=>{const Tr=hn%ce,tr=Math.floor(hn/ce);try{oe.drawImage(qt,Tr*Ze,tr*Vt,Ze,Vt)}catch{}})};Rt.current=setInterval(se,33),ze=V.captureStream(30)}const Le=Je(),Ut=new MediaStream([...ze.getVideoTracks(),...Le.getAudioTracks()]);_e.current=[];const F=new MediaRecorder(Ut,{mimeType:"video/webm;codecs=vp9,opus"});F.ondataavailable=V=>{V.data.size>0&&_e.current.push(V.data)},Ne.current=F,F.start(1e3),re(!0),$(!0)}catch(ze){console.error("Recording error:",ze),je(!1)}},[Je,$]),Xe=f.useCallback(()=>{Rt.current&&(clearInterval(Rt.current),Rt.current=null),ke.current&&(ke.current.getTracks().forEach(ye=>ye.stop()),ke.current=null),Ne.current&&Ne.current.state!=="inactive"&&(Ne.current.onstop=()=>{const ye=new Blob(_e.current,{type:"video/webm"}),ze=URL.createObjectURL(ye),Le=document.createElement("a");Le.href=ze,Le.download=`meet-${n}-${Date.now()}.webm`,Le.click(),URL.revokeObjectURL(ze),_e.current=[]},Ne.current.stop()),re(!1),$(!1)},[n,$]),qe=()=>{le&&Xe(),L(),t()},pn=()=>{navigator.clipboard.writeText(`${window.location.origin}/join/${n}`),d(!0),setTimeout(()=>d(!1),2e3)};if(!e||!n)return null;const Ft=1+j.length+(C?1:0)+y.length;return i.jsxs(zC,{children:[i.jsxs(EC,{children:[i.jsxs(_C,{children:[i.jsxs(TC,{children:[Z||r||"Meet",s&&i.jsx("span",{style:{fontSize:11,color:"#faa61a",marginLeft:8},children:"🔒 Private"})]}),i.jsx(RC,{children:n})]}),i.jsxs(IC,{children:[(le||H)&&i.jsxs(KC,{children:[i.jsx(Tl,{size:8,fill:"#f04747"})," REC"]}),i.jsxs(Yo,{onClick:pn,children:[c?i.jsx(xo,{size:13}):i.jsx(Vk,{size:13}),c?"Nusxalandi!":"Link"]}),i.jsxs(Yo,{onClick:()=>p(ye=>!ye),style:{position:"relative"},children:[i.jsx(yo,{size:13}),Ft,o&&w.length>0&&i.jsx(qC,{children:w.length})]})]})]}),i.jsxs($C,{children:[X?i.jsxs(Cs,{children:[i.jsx(d0,{size:38,color:"#f04747"}),i.jsx("span",{children:X}),i.jsx(Yo,{onClick:t,children:"Yopish"})]}):_==="connecting"?i.jsxs(Cs,{children:[i.jsx(GC,{size:38,color:"#7289da"}),i.jsx("span",{children:"Ulanmoqda…"})]}):_==="waiting"?i.jsxs(Cs,{children:[i.jsx(mr,{size:48,color:"#faa61a"}),i.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Ruxsat kutilmoqda…"}),i.jsx("span",{children:"Call yaratuvchisi sizga ruxsat berishini kuting"}),i.jsx(Yo,{onClick:qe,children:"Bekor qilish"})]}):_==="rejected"?i.jsxs(Cs,{children:[i.jsx($l,{size:48,color:"#f04747"}),i.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Rad etildi"}),i.jsx("span",{children:"Call yaratuvchisi so'rovingizni rad etdi"}),i.jsx(Yo,{onClick:t,children:"Yopish"})]}):i.jsxs(PC,{$count:Ft,children:[i.jsx(zs,{stream:k,muted:!0,isLocal:!0,label:b,isCamOn:O}),C&&i.jsx(zs,{stream:C,muted:!0,label:`🖥️ ${b} (Ekran)`,isCamOn:!0}),j.map(({peerId:ye,stream:ze,displayName:Le})=>i.jsxs("div",{style:{position:"relative"},children:[i.jsx(zs,{stream:ze,label:Le,isCamOn:!0}),Q.has(ye)&&i.jsx("span",{style:{position:"absolute",top:8,left:8,fontSize:24,zIndex:5,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"},children:"✋"})]},ye)),y.map(({peerId:ye,stream:ze,displayName:Le})=>i.jsx(zs,{stream:ze,label:`🖥️ ${Le} (Ekran)`,isCamOn:!0},`screen-${ye}`))]}),x&&i.jsxs(LC,{children:[i.jsxs(DC,{children:[i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[i.jsx(yo,{size:15,color:"#7289da"}),"A'zolar (",Ft,")"]}),i.jsx(HC,{onClick:()=>p(!1),children:i.jsx($l,{size:16})})]}),i.jsxs(BC,{children:[o&&s&&i.jsxs(i.Fragment,{children:[i.jsxs(ug,{children:["⏳ Kutayotganlar (",w.length,")"]}),w.length===0?i.jsx("div",{style:{padding:"8px 14px",color:"#4f545c",fontSize:12},children:"Hech kim kutmayapti"}):w.map(({peerId:ye,displayName:ze})=>i.jsxs(FC,{children:[i.jsxs(UC,{children:["👤 ",ze]}),i.jsxs(VC,{children:[i.jsxs(ig,{$approve:!0,onClick:()=>S(ye),children:[i.jsx(kd,{size:12})," Qabul"]}),i.jsxs(ig,{onClick:()=>v(ye),children:[i.jsx($l,{size:12})," Rad"]})]})]},ye))]}),i.jsxs(ug,{children:["✅ Qo'shilganlar (",Ft,")"]}),i.jsxs(sg,{children:[i.jsx(ag,{children:((It=b==null?void 0:b.charAt(0))==null?void 0:It.toUpperCase())||"?"}),i.jsxs(lg,{children:[b," (Sen)"]}),i.jsxs(cg,{children:[T?i.jsx(fr,{size:13,color:"#43b581"}):i.jsx(vr,{size:13,color:"#f04747"}),O?i.jsx(kn,{size:13,color:"#43b581"}):i.jsx(to,{size:13,color:"#f04747"})]})]}),j.map(({peerId:ye,displayName:ze})=>{var Le;return i.jsxs(sg,{children:[i.jsx(ag,{children:((Le=ze==null?void 0:ze.charAt(0))==null?void 0:Le.toUpperCase())||"?"}),i.jsxs(lg,{children:[Q.has(ye)&&"✋ ",ze]}),i.jsx(cg,{children:o?i.jsxs(i.Fragment,{children:[i.jsx("span",{onClick:()=>G(ye),style:{cursor:"pointer"},title:"Mic o'chirish",children:i.jsx(vr,{size:13,color:"#f04747"})}),i.jsx("span",{onClick:()=>W(ye),style:{cursor:"pointer"},title:"Mic ruxsat",children:i.jsx(fr,{size:13,color:"#43b581"})}),i.jsx("span",{onClick:()=>I(ye),style:{cursor:"pointer"},title:"Cam o'chirish",children:i.jsx(to,{size:13,color:"#f04747"})}),i.jsx("span",{onClick:()=>ie(ye),style:{cursor:"pointer"},title:"Cam ruxsat",children:i.jsx(kn,{size:13,color:"#43b581"})}),i.jsx("span",{onClick:()=>ge(ye),style:{cursor:"pointer",marginLeft:8},title:"Chiqarib yuborish",children:i.jsx(g0,{size:13,color:"#f04747"})})]}):i.jsxs(i.Fragment,{children:[i.jsx(fr,{size:13,color:"#43b581"}),i.jsx(kn,{size:13,color:"#43b581"})]})})]},ye)})]})]})]}),i.jsxs(WC,{children:[i.jsxs(Pr,{$active:T,onClick:A,style:N?{opacity:.5,cursor:"not-allowed"}:{},children:[T?i.jsx(fr,{size:21}):i.jsx(vr,{size:21}),N&&i.jsx(mo,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),i.jsxs(Pr,{$active:O,onClick:ne,style:z?{opacity:.5,cursor:"not-allowed"}:{},children:[O?i.jsx(kn,{size:21}):i.jsx(to,{size:21}),z&&i.jsx(mo,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),i.jsx(Pr,{$active:h,onClick:m,children:h?i.jsx(h0,{size:21}):i.jsx(lu,{size:21})}),i.jsx(Pr,{$active:R,onClick:ue,style:R?{background:"rgba(250,166,26,0.2)",color:"#faa61a"}:{},children:i.jsx(Yk,{size:21})}),o&&i.jsxs("div",{style:{position:"relative"},children:[i.jsx(Pr,{$active:le,onClick:()=>le?Xe():je(ye=>!ye),style:le?{background:"rgba(240,71,71,0.2)",color:"#f04747"}:{},children:i.jsx(Tl,{size:21,fill:le?"#f04747":"none"})}),J&&!le&&i.jsxs(QC,{children:[i.jsxs(dg,{onClick:()=>Ge("screen"),children:[i.jsx(fg,{$bg:"rgba(114,137,218,0.15)",children:i.jsx(lu,{size:16,color:"#7289da"})}),i.jsxs("div",{children:[i.jsx("div",{style:{fontWeight:600},children:"Ekranni yozish"}),i.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Faqat ekran + barcha ovozlar"})]})]}),i.jsxs(dg,{onClick:()=>Ge("all"),children:[i.jsx(fg,{$bg:"rgba(240,71,71,0.12)",children:i.jsx(Tl,{size:16,color:"#f04747"})}),i.jsxs("div",{children:[i.jsx("div",{style:{fontWeight:600},children:"Hammasini yozish"}),i.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Barcha oynalar + barcha ovozlar"})]})]})]})]}),i.jsx(Pr,{$danger:!0,onClick:qe,children:i.jsx(Wa,{size:21})})]})]})},ZC=er`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,e3=er`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,pg=u.div`
  min-height: 100vh;
  width: 100%;
  background: #0b0d0f;
  display: flex;
  align-items: center;
  justify-content: center;
`,hg=u.div`
  background: rgba(32, 34, 37, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 44px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${ZC} 0.3s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`,t3=u.div`
  font-size: 40px;
  margin-bottom: 12px;
`,n3=u.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
`,r3=u.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
`,o3=u.code`
  display: block;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  color: #7289da;
  font-size: 13px;
  margin-bottom: 24px;
  word-break: break-all;
`,i3=u.input`
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
`,s3=u.button`
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
`,a3=u.p`
  color: #f04747;
  font-size: 13px;
  margin: 8px 0 0;
`,l3=u(yr)`
  animation: ${e3} 1.2s linear infinite;
`,c3=u.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`,gg=u.button`
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
`,xg=u.span`
  display: block;
  font-size: 10px;
  margin-top: 4px;
  color: ${e=>e.$active?"#b9bbbe":"#f04747"};
`,u3=()=>{const{roomId:e}=hd(),[t,n]=f.useState("checking"),[r,o]=f.useState(null),[s,a]=f.useState(""),[l,c]=f.useState(""),[d,x]=f.useState(!1),[p,g]=f.useState(!1);f.useEffect(()=>{const k=Db(e);o(k);const j=(()=>{try{return JSON.parse(localStorage.getItem("user")||"null")}catch{return null}})();k!=null&&k.isCreator?(a((j==null?void 0:j.nickname)||(j==null?void 0:j.username)||"Host"),n("call")):(a((j==null?void 0:j.nickname)||(j==null?void 0:j.username)||""),n("form"))},[e]);const b=()=>{if(!s.trim()){c("Iltimos ismingizni kiriting");return}Nb({roomId:e,title:(r==null?void 0:r.title)||"Meet",isPrivate:(r==null?void 0:r.isPrivate)||!1,isCreator:!1}),n("call")};return t==="checking"?i.jsx(pg,{children:i.jsx(hg,{children:i.jsx(l3,{size:32,color:"#7289da"})})}):t==="call"?i.jsx(XC,{isOpen:!0,onClose:()=>window.history.back(),roomId:e,chatTitle:(r==null?void 0:r.title)||"Meet",isCreator:(r==null?void 0:r.isCreator)||!1,isPrivate:(r==null?void 0:r.isPrivate)||!1,initialMicOn:d,initialCamOn:p}):i.jsx(pg,{children:i.jsxs(hg,{children:[i.jsx(t3,{children:"📹"}),i.jsx(n3,{children:"Video Callga qo'shilish"}),i.jsx(r3,{children:"Siz quyidagi callga taklif qilindingiz:"}),i.jsx(o3,{children:e}),i.jsx(i3,{autoFocus:!0,value:s,onChange:k=>a(k.target.value),placeholder:"Ismingizni kiriting",onKeyDown:k=>k.key==="Enter"&&b()}),i.jsxs(c3,{children:[i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(gg,{$active:d,onClick:()=>x(k=>!k),children:d?i.jsx(fr,{size:22}):i.jsx(vr,{size:22})}),i.jsx(xg,{$active:d,children:d?"Yoniq":"O'chiq"})]}),i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(gg,{$active:p,onClick:()=>g(k=>!k),children:p?i.jsx(kn,{size:22}):i.jsx(to,{size:22})}),i.jsx(xg,{$active:p,children:p?"Yoniq":"O'chiq"})]})]}),l&&i.jsx(a3,{children:l}),i.jsx(s3,{onClick:b,children:"🎥 Callga kirish"})]})})};function tc({children:e}){return localStorage.getItem("token")?e:i.jsx(j2,{to:"/login",replace:!0})}function d3(){const{nav:e}=hd(),t=_r(),{resolveChatSlug:n}=Vi();return Ct.useEffect(()=>{!e||["home","users","groups","a","channels","courses","meets","login","register","join"].includes(e)||n(e).then(o=>{o&&o.jammId?t(`/a/${o.jammId}`,{replace:!0}):t("/home",{replace:!0})}).catch(o=>{console.error("Slug resolution failed:",o.message),t("/home",{replace:!0})})},[e,t,n]),i.jsx(F0,{})}function F0(){const{nav:e,channelId:t}=hd(),n=_r();return i.jsx(H5,{initialNav:e||"home",initialChannel:t||"0",navigate:n})}function f3(){return i.jsx($2,{children:i.jsx(xw,{children:i.jsx(Rb,{children:i.jsx(Ob,{children:i.jsx($S,{children:i.jsxs(C2,{children:[i.jsx(Mr,{path:"/login",element:i.jsx(wC,{})}),i.jsx(Mr,{path:"/join/:roomId",element:i.jsx(u3,{})}),i.jsx(Mr,{path:"/",element:i.jsx(tc,{children:i.jsx(J5,{})})}),i.jsx(Mr,{path:"/:nav",element:i.jsx(tc,{children:i.jsx(d3,{})})}),i.jsx(Mr,{path:"/:nav/:channelId",element:i.jsx(tc,{children:i.jsx(F0,{})})})]})})})})})})}nc.createRoot(document.getElementById("root")).render(i.jsx(Ct.StrictMode,{children:i.jsx(f3,{})}));
