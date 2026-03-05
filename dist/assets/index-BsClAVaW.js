var hg=e=>{throw TypeError(e)};var uu=(e,t,r)=>t.has(e)||hg("Cannot "+r);var Y=(e,t,r)=>(uu(e,t,"read from private field"),r?r.call(e):t.get(e)),Te=(e,t,r)=>t.has(e)?hg("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),we=(e,t,r,o)=>(uu(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r),lt=(e,t,r)=>(uu(e,t,"access private method"),r);var Cl=(e,t,r,o)=>({set _(s){we(e,t,s,r)},get _(){return Y(e,t,o)}});function bj(e,t){for(var r=0;r<t.length;r++){const o=t[r];if(typeof o!="string"&&!Array.isArray(o)){for(const s in o)if(s!=="default"&&!(s in e)){const a=Object.getOwnPropertyDescriptor(o,s);a&&Object.defineProperty(e,s,a.get?a:{enumerable:!0,get:()=>o[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();var Th=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $h(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Rv={exports:{}},bd={},Pv={exports:{}},Me={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ga=Symbol.for("react.element"),wj=Symbol.for("react.portal"),kj=Symbol.for("react.fragment"),jj=Symbol.for("react.strict_mode"),Sj=Symbol.for("react.profiler"),Cj=Symbol.for("react.provider"),zj=Symbol.for("react.context"),Ej=Symbol.for("react.forward_ref"),_j=Symbol.for("react.suspense"),Tj=Symbol.for("react.memo"),$j=Symbol.for("react.lazy"),xg=Symbol.iterator;function Rj(e){return e===null||typeof e!="object"?null:(e=xg&&e[xg]||e["@@iterator"],typeof e=="function"?e:null)}var Mv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ov=Object.assign,Av={};function cs(e,t,r){this.props=e,this.context=t,this.refs=Av,this.updater=r||Mv}cs.prototype.isReactComponent={};cs.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};cs.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Iv(){}Iv.prototype=cs.prototype;function Rh(e,t,r){this.props=e,this.context=t,this.refs=Av,this.updater=r||Mv}var Ph=Rh.prototype=new Iv;Ph.constructor=Rh;Ov(Ph,cs.prototype);Ph.isPureReactComponent=!0;var gg=Array.isArray,Lv=Object.prototype.hasOwnProperty,Mh={current:null},Dv={key:!0,ref:!0,__self:!0,__source:!0};function Bv(e,t,r){var o,s={},a=null,l=null;if(t!=null)for(o in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(a=""+t.key),t)Lv.call(t,o)&&!Dv.hasOwnProperty(o)&&(s[o]=t[o]);var c=arguments.length-2;if(c===1)s.children=r;else if(1<c){for(var u=Array(c),p=0;p<c;p++)u[p]=arguments[p+2];s.children=u}if(e&&e.defaultProps)for(o in c=e.defaultProps,c)s[o]===void 0&&(s[o]=c[o]);return{$$typeof:Ga,type:e,key:a,ref:l,props:s,_owner:Mh.current}}function Pj(e,t){return{$$typeof:Ga,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Oh(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ga}function Mj(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var mg=/\/+/g;function pu(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Mj(""+e.key):t.toString(36)}function hc(e,t,r,o,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Ga:case wj:l=!0}}if(l)return l=e,s=s(l),e=o===""?"."+pu(l,0):o,gg(s)?(r="",e!=null&&(r=e.replace(mg,"$&/")+"/"),hc(s,t,r,"",function(p){return p})):s!=null&&(Oh(s)&&(s=Pj(s,r+(!s.key||l&&l.key===s.key?"":(""+s.key).replace(mg,"$&/")+"/")+e)),t.push(s)),1;if(l=0,o=o===""?".":o+":",gg(e))for(var c=0;c<e.length;c++){a=e[c];var u=o+pu(a,c);l+=hc(a,t,r,u,s)}else if(u=Rj(e),typeof u=="function")for(e=u.call(e),c=0;!(a=e.next()).done;)a=a.value,u=o+pu(a,c++),l+=hc(a,t,r,u,s);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function zl(e,t,r){if(e==null)return e;var o=[],s=0;return hc(e,o,"","",function(a){return t.call(r,a,s++)}),o}function Oj(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Vt={current:null},xc={transition:null},Aj={ReactCurrentDispatcher:Vt,ReactCurrentBatchConfig:xc,ReactCurrentOwner:Mh};function Fv(){throw Error("act(...) is not supported in production builds of React.")}Me.Children={map:zl,forEach:function(e,t,r){zl(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return zl(e,function(){t++}),t},toArray:function(e){return zl(e,function(t){return t})||[]},only:function(e){if(!Oh(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Me.Component=cs;Me.Fragment=kj;Me.Profiler=Sj;Me.PureComponent=Rh;Me.StrictMode=jj;Me.Suspense=_j;Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Aj;Me.act=Fv;Me.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=Ov({},e.props),s=e.key,a=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,l=Mh.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(u in t)Lv.call(t,u)&&!Dv.hasOwnProperty(u)&&(o[u]=t[u]===void 0&&c!==void 0?c[u]:t[u])}var u=arguments.length-2;if(u===1)o.children=r;else if(1<u){c=Array(u);for(var p=0;p<u;p++)c[p]=arguments[p+2];o.children=c}return{$$typeof:Ga,type:e.type,key:s,ref:a,props:o,_owner:l}};Me.createContext=function(e){return e={$$typeof:zj,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Cj,_context:e},e.Consumer=e};Me.createElement=Bv;Me.createFactory=function(e){var t=Bv.bind(null,e);return t.type=e,t};Me.createRef=function(){return{current:null}};Me.forwardRef=function(e){return{$$typeof:Ej,render:e}};Me.isValidElement=Oh;Me.lazy=function(e){return{$$typeof:$j,_payload:{_status:-1,_result:e},_init:Oj}};Me.memo=function(e,t){return{$$typeof:Tj,type:e,compare:t===void 0?null:t}};Me.startTransition=function(e){var t=xc.transition;xc.transition={};try{e()}finally{xc.transition=t}};Me.unstable_act=Fv;Me.useCallback=function(e,t){return Vt.current.useCallback(e,t)};Me.useContext=function(e){return Vt.current.useContext(e)};Me.useDebugValue=function(){};Me.useDeferredValue=function(e){return Vt.current.useDeferredValue(e)};Me.useEffect=function(e,t){return Vt.current.useEffect(e,t)};Me.useId=function(){return Vt.current.useId()};Me.useImperativeHandle=function(e,t,r){return Vt.current.useImperativeHandle(e,t,r)};Me.useInsertionEffect=function(e,t){return Vt.current.useInsertionEffect(e,t)};Me.useLayoutEffect=function(e,t){return Vt.current.useLayoutEffect(e,t)};Me.useMemo=function(e,t){return Vt.current.useMemo(e,t)};Me.useReducer=function(e,t,r){return Vt.current.useReducer(e,t,r)};Me.useRef=function(e){return Vt.current.useRef(e)};Me.useState=function(e){return Vt.current.useState(e)};Me.useSyncExternalStore=function(e,t,r){return Vt.current.useSyncExternalStore(e,t,r)};Me.useTransition=function(){return Vt.current.useTransition()};Me.version="18.3.1";Pv.exports=Me;var f=Pv.exports;const Le=$h(f),Ij=bj({__proto__:null,default:Le},[f]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lj=f,Dj=Symbol.for("react.element"),Bj=Symbol.for("react.fragment"),Fj=Object.prototype.hasOwnProperty,Nj=Lj.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Uj={key:!0,ref:!0,__self:!0,__source:!0};function Nv(e,t,r){var o,s={},a=null,l=null;r!==void 0&&(a=""+r),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(l=t.ref);for(o in t)Fj.call(t,o)&&!Uj.hasOwnProperty(o)&&(s[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)s[o]===void 0&&(s[o]=t[o]);return{$$typeof:Dj,type:e,key:a,ref:l,props:s,_owner:Nj.current}}bd.Fragment=Bj;bd.jsx=Nv;bd.jsxs=Nv;Rv.exports=bd;var i=Rv.exports,Xp={},Uv={exports:{}},dr={},qv={exports:{}},Hv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t($,F){var L=$.length;$.push(F);e:for(;0<L;){var O=L-1>>>1,S=$[O];if(0<s(S,F))$[O]=F,$[L]=S,L=O;else break e}}function r($){return $.length===0?null:$[0]}function o($){if($.length===0)return null;var F=$[0],L=$.pop();if(L!==F){$[0]=L;e:for(var O=0,S=$.length,N=S>>>1;O<N;){var Q=2*(O+1)-1,X=$[Q],ee=Q+1,ae=$[ee];if(0>s(X,L))ee<S&&0>s(ae,X)?($[O]=ae,$[ee]=L,O=ee):($[O]=X,$[Q]=L,O=Q);else if(ee<S&&0>s(ae,L))$[O]=ae,$[ee]=L,O=ee;else break e}}return F}function s($,F){var L=$.sortIndex-F.sortIndex;return L!==0?L:$.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,c=l.now();e.unstable_now=function(){return l.now()-c}}var u=[],p=[],x=1,h=null,m=3,k=!1,w=!1,j=!1,C=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function b($){for(var F=r(p);F!==null;){if(F.callback===null)o(p);else if(F.startTime<=$)o(p),F.sortIndex=F.expirationTime,t(u,F);else break;F=r(p)}}function g($){if(j=!1,b($),!w)if(r(u)!==null)w=!0,_(T);else{var F=r(p);F!==null&&R(g,F.startTime-$)}}function T($,F){w=!1,j&&(j=!1,y(z),z=-1),k=!0;var L=m;try{for(b(F),h=r(u);h!==null&&(!(h.expirationTime>F)||$&&!U());){var O=h.callback;if(typeof O=="function"){h.callback=null,m=h.priorityLevel;var S=O(h.expirationTime<=F);F=e.unstable_now(),typeof S=="function"?h.callback=S:h===r(u)&&o(u),b(F)}else o(u);h=r(u)}if(h!==null)var N=!0;else{var Q=r(p);Q!==null&&R(g,Q.startTime-F),N=!1}return N}finally{h=null,m=L,k=!1}}var A=!1,B=null,z=-1,H=5,D=-1;function U(){return!(e.unstable_now()-D<H)}function M(){if(B!==null){var $=e.unstable_now();D=$;var F=!0;try{F=B(!0,$)}finally{F?I():(A=!1,B=null)}}else A=!1}var I;if(typeof v=="function")I=function(){v(M)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,E=P.port2;P.port1.onmessage=M,I=function(){E.postMessage(null)}}else I=function(){C(M,0)};function _($){B=$,A||(A=!0,I())}function R($,F){z=C(function(){$(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){w||k||(w=!0,_(T))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return r(u)},e.unstable_next=function($){switch(m){case 1:case 2:case 3:var F=3;break;default:F=m}var L=m;m=F;try{return $()}finally{m=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,F){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var L=m;m=$;try{return F()}finally{m=L}},e.unstable_scheduleCallback=function($,F,L){var O=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?O+L:O):L=O,$){case 1:var S=-1;break;case 2:S=250;break;case 5:S=1073741823;break;case 4:S=1e4;break;default:S=5e3}return S=L+S,$={id:x++,callback:F,priorityLevel:$,startTime:L,expirationTime:S,sortIndex:-1},L>O?($.sortIndex=L,t(p,$),r(u)===null&&$===r(p)&&(j?(y(z),z=-1):j=!0,R(g,L-O))):($.sortIndex=S,t(u,$),w||k||(w=!0,_(T))),$},e.unstable_shouldYield=U,e.unstable_wrapCallback=function($){var F=m;return function(){var L=m;m=F;try{return $.apply(this,arguments)}finally{m=L}}}})(Hv);qv.exports=Hv;var qj=qv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hj=f,cr=qj;function se(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Vv=new Set,ka={};function ti(e,t){Ki(e,t),Ki(e+"Capture",t)}function Ki(e,t){for(ka[e]=t,e=0;e<t.length;e++)Vv.add(t[e])}var vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Jp=Object.prototype.hasOwnProperty,Vj=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yg={},vg={};function Yj(e){return Jp.call(vg,e)?!0:Jp.call(yg,e)?!1:Vj.test(e)?vg[e]=!0:(yg[e]=!0,!1)}function Wj(e,t,r,o){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return o?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Kj(e,t,r,o){if(t===null||typeof t>"u"||Wj(e,t,r,o))return!0;if(o)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Yt(e,t,r,o,s,a,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=o,this.attributeNamespace=s,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=l}var Tt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Tt[e]=new Yt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Tt[t]=new Yt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Tt[e]=new Yt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Tt[e]=new Yt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Tt[e]=new Yt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Tt[e]=new Yt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Tt[e]=new Yt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Tt[e]=new Yt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Tt[e]=new Yt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ah=/[\-:]([a-z])/g;function Ih(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ah,Ih);Tt[t]=new Yt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ah,Ih);Tt[t]=new Yt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ah,Ih);Tt[t]=new Yt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Tt[e]=new Yt(e,1,!1,e.toLowerCase(),null,!1,!1)});Tt.xlinkHref=new Yt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Tt[e]=new Yt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Lh(e,t,r,o){var s=Tt.hasOwnProperty(t)?Tt[t]:null;(s!==null?s.type!==0:o||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Kj(t,r,s,o)&&(r=null),o||s===null?Yj(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):s.mustUseProperty?e[s.propertyName]=r===null?s.type===3?!1:"":r:(t=s.attributeName,o=s.attributeNamespace,r===null?e.removeAttribute(t):(s=s.type,r=s===3||s===4&&r===!0?"":""+r,o?e.setAttributeNS(o,t,r):e.setAttribute(t,r))))}var Cn=Hj.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,El=Symbol.for("react.element"),gi=Symbol.for("react.portal"),mi=Symbol.for("react.fragment"),Dh=Symbol.for("react.strict_mode"),Zp=Symbol.for("react.profiler"),Yv=Symbol.for("react.provider"),Wv=Symbol.for("react.context"),Bh=Symbol.for("react.forward_ref"),ef=Symbol.for("react.suspense"),tf=Symbol.for("react.suspense_list"),Fh=Symbol.for("react.memo"),In=Symbol.for("react.lazy"),Kv=Symbol.for("react.offscreen"),bg=Symbol.iterator;function _s(e){return e===null||typeof e!="object"?null:(e=bg&&e[bg]||e["@@iterator"],typeof e=="function"?e:null)}var ot=Object.assign,fu;function ra(e){if(fu===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);fu=t&&t[1]||""}return`
`+fu+e}var hu=!1;function xu(e,t){if(!e||hu)return"";hu=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var o=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){o=p}e.call(t.prototype)}else{try{throw Error()}catch(p){o=p}e()}}catch(p){if(p&&o&&typeof p.stack=="string"){for(var s=p.stack.split(`
`),a=o.stack.split(`
`),l=s.length-1,c=a.length-1;1<=l&&0<=c&&s[l]!==a[c];)c--;for(;1<=l&&0<=c;l--,c--)if(s[l]!==a[c]){if(l!==1||c!==1)do if(l--,c--,0>c||s[l]!==a[c]){var u=`
`+s[l].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=l&&0<=c);break}}}finally{hu=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?ra(e):""}function Qj(e){switch(e.tag){case 5:return ra(e.type);case 16:return ra("Lazy");case 13:return ra("Suspense");case 19:return ra("SuspenseList");case 0:case 2:case 15:return e=xu(e.type,!1),e;case 11:return e=xu(e.type.render,!1),e;case 1:return e=xu(e.type,!0),e;default:return""}}function rf(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case mi:return"Fragment";case gi:return"Portal";case Zp:return"Profiler";case Dh:return"StrictMode";case ef:return"Suspense";case tf:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Wv:return(e.displayName||"Context")+".Consumer";case Yv:return(e._context.displayName||"Context")+".Provider";case Bh:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Fh:return t=e.displayName||null,t!==null?t:rf(e.type)||"Memo";case In:t=e._payload,e=e._init;try{return rf(e(t))}catch{}}return null}function Gj(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return rf(t);case 8:return t===Dh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function lo(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Qv(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Xj(e){var t=Qv(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),o=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var s=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(l){o=""+l,a.call(this,l)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return o},setValue:function(l){o=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _l(e){e._valueTracker||(e._valueTracker=Xj(e))}function Gv(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),o="";return e&&(o=Qv(e)?e.checked?"true":"false":e.value),e=o,e!==r?(t.setValue(e),!0):!1}function Fc(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function nf(e,t){var r=t.checked;return ot({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function wg(e,t){var r=t.defaultValue==null?"":t.defaultValue,o=t.checked!=null?t.checked:t.defaultChecked;r=lo(t.value!=null?t.value:r),e._wrapperState={initialChecked:o,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Xv(e,t){t=t.checked,t!=null&&Lh(e,"checked",t,!1)}function of(e,t){Xv(e,t);var r=lo(t.value),o=t.type;if(r!=null)o==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(o==="submit"||o==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?sf(e,t.type,r):t.hasOwnProperty("defaultValue")&&sf(e,t.type,lo(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function kg(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var o=t.type;if(!(o!=="submit"&&o!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function sf(e,t,r){(t!=="number"||Fc(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var na=Array.isArray;function Ri(e,t,r,o){if(e=e.options,t){t={};for(var s=0;s<r.length;s++)t["$"+r[s]]=!0;for(r=0;r<e.length;r++)s=t.hasOwnProperty("$"+e[r].value),e[r].selected!==s&&(e[r].selected=s),s&&o&&(e[r].defaultSelected=!0)}else{for(r=""+lo(r),t=null,s=0;s<e.length;s++){if(e[s].value===r){e[s].selected=!0,o&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function af(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(se(91));return ot({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function jg(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(se(92));if(na(r)){if(1<r.length)throw Error(se(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:lo(r)}}function Jv(e,t){var r=lo(t.value),o=lo(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),o!=null&&(e.defaultValue=""+o)}function Sg(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Zv(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function lf(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Zv(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Tl,eb=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,o,s){MSApp.execUnsafeLocalFunction(function(){return e(t,r,o,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Tl=Tl||document.createElement("div"),Tl.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Tl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ja(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var da={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Jj=["Webkit","ms","Moz","O"];Object.keys(da).forEach(function(e){Jj.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),da[t]=da[e]})});function tb(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||da.hasOwnProperty(e)&&da[e]?(""+t).trim():t+"px"}function rb(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var o=r.indexOf("--")===0,s=tb(r,t[r],o);r==="float"&&(r="cssFloat"),o?e.setProperty(r,s):e[r]=s}}var Zj=ot({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cf(e,t){if(t){if(Zj[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(se(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(se(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(se(61))}if(t.style!=null&&typeof t.style!="object")throw Error(se(62))}}function df(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var uf=null;function Nh(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pf=null,Pi=null,Mi=null;function Cg(e){if(e=Za(e)){if(typeof pf!="function")throw Error(se(280));var t=e.stateNode;t&&(t=Cd(t),pf(e.stateNode,e.type,t))}}function nb(e){Pi?Mi?Mi.push(e):Mi=[e]:Pi=e}function ob(){if(Pi){var e=Pi,t=Mi;if(Mi=Pi=null,Cg(e),t)for(e=0;e<t.length;e++)Cg(t[e])}}function ib(e,t){return e(t)}function sb(){}var gu=!1;function ab(e,t,r){if(gu)return e(t,r);gu=!0;try{return ib(e,t,r)}finally{gu=!1,(Pi!==null||Mi!==null)&&(sb(),ob())}}function Sa(e,t){var r=e.stateNode;if(r===null)return null;var o=Cd(r);if(o===null)return null;r=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(se(231,t,typeof r));return r}var ff=!1;if(vn)try{var Ts={};Object.defineProperty(Ts,"passive",{get:function(){ff=!0}}),window.addEventListener("test",Ts,Ts),window.removeEventListener("test",Ts,Ts)}catch{ff=!1}function eS(e,t,r,o,s,a,l,c,u){var p=Array.prototype.slice.call(arguments,3);try{t.apply(r,p)}catch(x){this.onError(x)}}var ua=!1,Nc=null,Uc=!1,hf=null,tS={onError:function(e){ua=!0,Nc=e}};function rS(e,t,r,o,s,a,l,c,u){ua=!1,Nc=null,eS.apply(tS,arguments)}function nS(e,t,r,o,s,a,l,c,u){if(rS.apply(this,arguments),ua){if(ua){var p=Nc;ua=!1,Nc=null}else throw Error(se(198));Uc||(Uc=!0,hf=p)}}function ri(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function lb(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zg(e){if(ri(e)!==e)throw Error(se(188))}function oS(e){var t=e.alternate;if(!t){if(t=ri(e),t===null)throw Error(se(188));return t!==e?null:e}for(var r=e,o=t;;){var s=r.return;if(s===null)break;var a=s.alternate;if(a===null){if(o=s.return,o!==null){r=o;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===r)return zg(s),e;if(a===o)return zg(s),t;a=a.sibling}throw Error(se(188))}if(r.return!==o.return)r=s,o=a;else{for(var l=!1,c=s.child;c;){if(c===r){l=!0,r=s,o=a;break}if(c===o){l=!0,o=s,r=a;break}c=c.sibling}if(!l){for(c=a.child;c;){if(c===r){l=!0,r=a,o=s;break}if(c===o){l=!0,o=a,r=s;break}c=c.sibling}if(!l)throw Error(se(189))}}if(r.alternate!==o)throw Error(se(190))}if(r.tag!==3)throw Error(se(188));return r.stateNode.current===r?e:t}function cb(e){return e=oS(e),e!==null?db(e):null}function db(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=db(e);if(t!==null)return t;e=e.sibling}return null}var ub=cr.unstable_scheduleCallback,Eg=cr.unstable_cancelCallback,iS=cr.unstable_shouldYield,sS=cr.unstable_requestPaint,ct=cr.unstable_now,aS=cr.unstable_getCurrentPriorityLevel,Uh=cr.unstable_ImmediatePriority,pb=cr.unstable_UserBlockingPriority,qc=cr.unstable_NormalPriority,lS=cr.unstable_LowPriority,fb=cr.unstable_IdlePriority,wd=null,Jr=null;function cS(e){if(Jr&&typeof Jr.onCommitFiberRoot=="function")try{Jr.onCommitFiberRoot(wd,e,void 0,(e.current.flags&128)===128)}catch{}}var Ar=Math.clz32?Math.clz32:pS,dS=Math.log,uS=Math.LN2;function pS(e){return e>>>=0,e===0?32:31-(dS(e)/uS|0)|0}var $l=64,Rl=4194304;function oa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hc(e,t){var r=e.pendingLanes;if(r===0)return 0;var o=0,s=e.suspendedLanes,a=e.pingedLanes,l=r&268435455;if(l!==0){var c=l&~s;c!==0?o=oa(c):(a&=l,a!==0&&(o=oa(a)))}else l=r&~s,l!==0?o=oa(l):a!==0&&(o=oa(a));if(o===0)return 0;if(t!==0&&t!==o&&!(t&s)&&(s=o&-o,a=t&-t,s>=a||s===16&&(a&4194240)!==0))return t;if(o&4&&(o|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=o;0<t;)r=31-Ar(t),s=1<<r,o|=e[r],t&=~s;return o}function fS(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hS(e,t){for(var r=e.suspendedLanes,o=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-Ar(a),c=1<<l,u=s[l];u===-1?(!(c&r)||c&o)&&(s[l]=fS(c,t)):u<=t&&(e.expiredLanes|=c),a&=~c}}function xf(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function hb(){var e=$l;return $l<<=1,!($l&4194240)&&($l=64),e}function mu(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Xa(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ar(t),e[t]=r}function xS(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var o=e.eventTimes;for(e=e.expirationTimes;0<r;){var s=31-Ar(r),a=1<<s;t[s]=0,o[s]=-1,e[s]=-1,r&=~a}}function qh(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var o=31-Ar(r),s=1<<o;s&t|e[o]&t&&(e[o]|=t),r&=~s}}var Ue=0;function xb(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var gb,Hh,mb,yb,vb,gf=!1,Pl=[],Xn=null,Jn=null,Zn=null,Ca=new Map,za=new Map,Dn=[],gS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _g(e,t){switch(e){case"focusin":case"focusout":Xn=null;break;case"dragenter":case"dragleave":Jn=null;break;case"mouseover":case"mouseout":Zn=null;break;case"pointerover":case"pointerout":Ca.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":za.delete(t.pointerId)}}function $s(e,t,r,o,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:r,eventSystemFlags:o,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Za(t),t!==null&&Hh(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function mS(e,t,r,o,s){switch(t){case"focusin":return Xn=$s(Xn,e,t,r,o,s),!0;case"dragenter":return Jn=$s(Jn,e,t,r,o,s),!0;case"mouseover":return Zn=$s(Zn,e,t,r,o,s),!0;case"pointerover":var a=s.pointerId;return Ca.set(a,$s(Ca.get(a)||null,e,t,r,o,s)),!0;case"gotpointercapture":return a=s.pointerId,za.set(a,$s(za.get(a)||null,e,t,r,o,s)),!0}return!1}function bb(e){var t=Eo(e.target);if(t!==null){var r=ri(t);if(r!==null){if(t=r.tag,t===13){if(t=lb(r),t!==null){e.blockedOn=t,vb(e.priority,function(){mb(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function gc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=mf(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var o=new r.constructor(r.type,r);uf=o,r.target.dispatchEvent(o),uf=null}else return t=Za(r),t!==null&&Hh(t),e.blockedOn=r,!1;t.shift()}return!0}function Tg(e,t,r){gc(e)&&r.delete(t)}function yS(){gf=!1,Xn!==null&&gc(Xn)&&(Xn=null),Jn!==null&&gc(Jn)&&(Jn=null),Zn!==null&&gc(Zn)&&(Zn=null),Ca.forEach(Tg),za.forEach(Tg)}function Rs(e,t){e.blockedOn===t&&(e.blockedOn=null,gf||(gf=!0,cr.unstable_scheduleCallback(cr.unstable_NormalPriority,yS)))}function Ea(e){function t(s){return Rs(s,e)}if(0<Pl.length){Rs(Pl[0],e);for(var r=1;r<Pl.length;r++){var o=Pl[r];o.blockedOn===e&&(o.blockedOn=null)}}for(Xn!==null&&Rs(Xn,e),Jn!==null&&Rs(Jn,e),Zn!==null&&Rs(Zn,e),Ca.forEach(t),za.forEach(t),r=0;r<Dn.length;r++)o=Dn[r],o.blockedOn===e&&(o.blockedOn=null);for(;0<Dn.length&&(r=Dn[0],r.blockedOn===null);)bb(r),r.blockedOn===null&&Dn.shift()}var Oi=Cn.ReactCurrentBatchConfig,Vc=!0;function vS(e,t,r,o){var s=Ue,a=Oi.transition;Oi.transition=null;try{Ue=1,Vh(e,t,r,o)}finally{Ue=s,Oi.transition=a}}function bS(e,t,r,o){var s=Ue,a=Oi.transition;Oi.transition=null;try{Ue=4,Vh(e,t,r,o)}finally{Ue=s,Oi.transition=a}}function Vh(e,t,r,o){if(Vc){var s=mf(e,t,r,o);if(s===null)Eu(e,t,o,Yc,r),_g(e,o);else if(mS(s,e,t,r,o))o.stopPropagation();else if(_g(e,o),t&4&&-1<gS.indexOf(e)){for(;s!==null;){var a=Za(s);if(a!==null&&gb(a),a=mf(e,t,r,o),a===null&&Eu(e,t,o,Yc,r),a===s)break;s=a}s!==null&&o.stopPropagation()}else Eu(e,t,o,null,r)}}var Yc=null;function mf(e,t,r,o){if(Yc=null,e=Nh(o),e=Eo(e),e!==null)if(t=ri(e),t===null)e=null;else if(r=t.tag,r===13){if(e=lb(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Yc=e,null}function wb(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(aS()){case Uh:return 1;case pb:return 4;case qc:case lS:return 16;case fb:return 536870912;default:return 16}default:return 16}}var Kn=null,Yh=null,mc=null;function kb(){if(mc)return mc;var e,t=Yh,r=t.length,o,s="value"in Kn?Kn.value:Kn.textContent,a=s.length;for(e=0;e<r&&t[e]===s[e];e++);var l=r-e;for(o=1;o<=l&&t[r-o]===s[a-o];o++);return mc=s.slice(e,1<o?1-o:void 0)}function yc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ml(){return!0}function $g(){return!1}function ur(e){function t(r,o,s,a,l){this._reactName=r,this._targetInst=s,this.type=o,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ml:$g,this.isPropagationStopped=$g,this}return ot(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Ml)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Ml)},persist:function(){},isPersistent:Ml}),t}var ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wh=ur(ds),Ja=ot({},ds,{view:0,detail:0}),wS=ur(Ja),yu,vu,Ps,kd=ot({},Ja,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kh,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ps&&(Ps&&e.type==="mousemove"?(yu=e.screenX-Ps.screenX,vu=e.screenY-Ps.screenY):vu=yu=0,Ps=e),yu)},movementY:function(e){return"movementY"in e?e.movementY:vu}}),Rg=ur(kd),kS=ot({},kd,{dataTransfer:0}),jS=ur(kS),SS=ot({},Ja,{relatedTarget:0}),bu=ur(SS),CS=ot({},ds,{animationName:0,elapsedTime:0,pseudoElement:0}),zS=ur(CS),ES=ot({},ds,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),_S=ur(ES),TS=ot({},ds,{data:0}),Pg=ur(TS),$S={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},RS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},PS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function MS(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=PS[e])?!!t[e]:!1}function Kh(){return MS}var OS=ot({},Ja,{key:function(e){if(e.key){var t=$S[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=yc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?RS[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kh,charCode:function(e){return e.type==="keypress"?yc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?yc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),AS=ur(OS),IS=ot({},kd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mg=ur(IS),LS=ot({},Ja,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kh}),DS=ur(LS),BS=ot({},ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),FS=ur(BS),NS=ot({},kd,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),US=ur(NS),qS=[9,13,27,32],Qh=vn&&"CompositionEvent"in window,pa=null;vn&&"documentMode"in document&&(pa=document.documentMode);var HS=vn&&"TextEvent"in window&&!pa,jb=vn&&(!Qh||pa&&8<pa&&11>=pa),Og=" ",Ag=!1;function Sb(e,t){switch(e){case"keyup":return qS.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cb(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var yi=!1;function VS(e,t){switch(e){case"compositionend":return Cb(t);case"keypress":return t.which!==32?null:(Ag=!0,Og);case"textInput":return e=t.data,e===Og&&Ag?null:e;default:return null}}function YS(e,t){if(yi)return e==="compositionend"||!Qh&&Sb(e,t)?(e=kb(),mc=Yh=Kn=null,yi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return jb&&t.locale!=="ko"?null:t.data;default:return null}}var WS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ig(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!WS[e.type]:t==="textarea"}function zb(e,t,r,o){nb(o),t=Wc(t,"onChange"),0<t.length&&(r=new Wh("onChange","change",null,r,o),e.push({event:r,listeners:t}))}var fa=null,_a=null;function KS(e){Lb(e,0)}function jd(e){var t=wi(e);if(Gv(t))return e}function QS(e,t){if(e==="change")return t}var Eb=!1;if(vn){var wu;if(vn){var ku="oninput"in document;if(!ku){var Lg=document.createElement("div");Lg.setAttribute("oninput","return;"),ku=typeof Lg.oninput=="function"}wu=ku}else wu=!1;Eb=wu&&(!document.documentMode||9<document.documentMode)}function Dg(){fa&&(fa.detachEvent("onpropertychange",_b),_a=fa=null)}function _b(e){if(e.propertyName==="value"&&jd(_a)){var t=[];zb(t,_a,e,Nh(e)),ab(KS,t)}}function GS(e,t,r){e==="focusin"?(Dg(),fa=t,_a=r,fa.attachEvent("onpropertychange",_b)):e==="focusout"&&Dg()}function XS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return jd(_a)}function JS(e,t){if(e==="click")return jd(t)}function ZS(e,t){if(e==="input"||e==="change")return jd(t)}function e4(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Br=typeof Object.is=="function"?Object.is:e4;function Ta(e,t){if(Br(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),o=Object.keys(t);if(r.length!==o.length)return!1;for(o=0;o<r.length;o++){var s=r[o];if(!Jp.call(t,s)||!Br(e[s],t[s]))return!1}return!0}function Bg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fg(e,t){var r=Bg(e);e=0;for(var o;r;){if(r.nodeType===3){if(o=e+r.textContent.length,e<=t&&o>=t)return{node:r,offset:t-e};e=o}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Bg(r)}}function Tb(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Tb(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function $b(){for(var e=window,t=Fc();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Fc(e.document)}return t}function Gh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function t4(e){var t=$b(),r=e.focusedElem,o=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Tb(r.ownerDocument.documentElement,r)){if(o!==null&&Gh(r)){if(t=o.start,e=o.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=r.textContent.length,a=Math.min(o.start,s);o=o.end===void 0?a:Math.min(o.end,s),!e.extend&&a>o&&(s=o,o=a,a=s),s=Fg(r,a);var l=Fg(r,o);s&&l&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),a>o?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var r4=vn&&"documentMode"in document&&11>=document.documentMode,vi=null,yf=null,ha=null,vf=!1;function Ng(e,t,r){var o=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;vf||vi==null||vi!==Fc(o)||(o=vi,"selectionStart"in o&&Gh(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),ha&&Ta(ha,o)||(ha=o,o=Wc(yf,"onSelect"),0<o.length&&(t=new Wh("onSelect","select",null,t,r),e.push({event:t,listeners:o}),t.target=vi)))}function Ol(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var bi={animationend:Ol("Animation","AnimationEnd"),animationiteration:Ol("Animation","AnimationIteration"),animationstart:Ol("Animation","AnimationStart"),transitionend:Ol("Transition","TransitionEnd")},ju={},Rb={};vn&&(Rb=document.createElement("div").style,"AnimationEvent"in window||(delete bi.animationend.animation,delete bi.animationiteration.animation,delete bi.animationstart.animation),"TransitionEvent"in window||delete bi.transitionend.transition);function Sd(e){if(ju[e])return ju[e];if(!bi[e])return e;var t=bi[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Rb)return ju[e]=t[r];return e}var Pb=Sd("animationend"),Mb=Sd("animationiteration"),Ob=Sd("animationstart"),Ab=Sd("transitionend"),Ib=new Map,Ug="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fo(e,t){Ib.set(e,t),ti(t,[e])}for(var Su=0;Su<Ug.length;Su++){var Cu=Ug[Su],n4=Cu.toLowerCase(),o4=Cu[0].toUpperCase()+Cu.slice(1);fo(n4,"on"+o4)}fo(Pb,"onAnimationEnd");fo(Mb,"onAnimationIteration");fo(Ob,"onAnimationStart");fo("dblclick","onDoubleClick");fo("focusin","onFocus");fo("focusout","onBlur");fo(Ab,"onTransitionEnd");Ki("onMouseEnter",["mouseout","mouseover"]);Ki("onMouseLeave",["mouseout","mouseover"]);Ki("onPointerEnter",["pointerout","pointerover"]);Ki("onPointerLeave",["pointerout","pointerover"]);ti("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ti("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ti("onBeforeInput",["compositionend","keypress","textInput","paste"]);ti("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ti("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ti("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ia="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),i4=new Set("cancel close invalid load scroll toggle".split(" ").concat(ia));function qg(e,t,r){var o=e.type||"unknown-event";e.currentTarget=r,nS(o,t,void 0,e),e.currentTarget=null}function Lb(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var o=e[r],s=o.event;o=o.listeners;e:{var a=void 0;if(t)for(var l=o.length-1;0<=l;l--){var c=o[l],u=c.instance,p=c.currentTarget;if(c=c.listener,u!==a&&s.isPropagationStopped())break e;qg(s,c,p),a=u}else for(l=0;l<o.length;l++){if(c=o[l],u=c.instance,p=c.currentTarget,c=c.listener,u!==a&&s.isPropagationStopped())break e;qg(s,c,p),a=u}}}if(Uc)throw e=hf,Uc=!1,hf=null,e}function We(e,t){var r=t[Sf];r===void 0&&(r=t[Sf]=new Set);var o=e+"__bubble";r.has(o)||(Db(t,e,2,!1),r.add(o))}function zu(e,t,r){var o=0;t&&(o|=4),Db(r,e,o,t)}var Al="_reactListening"+Math.random().toString(36).slice(2);function $a(e){if(!e[Al]){e[Al]=!0,Vv.forEach(function(r){r!=="selectionchange"&&(i4.has(r)||zu(r,!1,e),zu(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Al]||(t[Al]=!0,zu("selectionchange",!1,t))}}function Db(e,t,r,o){switch(wb(t)){case 1:var s=vS;break;case 4:s=bS;break;default:s=Vh}r=s.bind(null,t,r,e),s=void 0,!ff||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),o?s!==void 0?e.addEventListener(t,r,{capture:!0,passive:s}):e.addEventListener(t,r,!0):s!==void 0?e.addEventListener(t,r,{passive:s}):e.addEventListener(t,r,!1)}function Eu(e,t,r,o,s){var a=o;if(!(t&1)&&!(t&2)&&o!==null)e:for(;;){if(o===null)return;var l=o.tag;if(l===3||l===4){var c=o.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(l===4)for(l=o.return;l!==null;){var u=l.tag;if((u===3||u===4)&&(u=l.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;l=l.return}for(;c!==null;){if(l=Eo(c),l===null)return;if(u=l.tag,u===5||u===6){o=a=l;continue e}c=c.parentNode}}o=o.return}ab(function(){var p=a,x=Nh(r),h=[];e:{var m=Ib.get(e);if(m!==void 0){var k=Wh,w=e;switch(e){case"keypress":if(yc(r)===0)break e;case"keydown":case"keyup":k=AS;break;case"focusin":w="focus",k=bu;break;case"focusout":w="blur",k=bu;break;case"beforeblur":case"afterblur":k=bu;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=Rg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=jS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=DS;break;case Pb:case Mb:case Ob:k=zS;break;case Ab:k=FS;break;case"scroll":k=wS;break;case"wheel":k=US;break;case"copy":case"cut":case"paste":k=_S;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=Mg}var j=(t&4)!==0,C=!j&&e==="scroll",y=j?m!==null?m+"Capture":null:m;j=[];for(var v=p,b;v!==null;){b=v;var g=b.stateNode;if(b.tag===5&&g!==null&&(b=g,y!==null&&(g=Sa(v,y),g!=null&&j.push(Ra(v,g,b)))),C)break;v=v.return}0<j.length&&(m=new k(m,w,null,r,x),h.push({event:m,listeners:j}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",k=e==="mouseout"||e==="pointerout",m&&r!==uf&&(w=r.relatedTarget||r.fromElement)&&(Eo(w)||w[bn]))break e;if((k||m)&&(m=x.window===x?x:(m=x.ownerDocument)?m.defaultView||m.parentWindow:window,k?(w=r.relatedTarget||r.toElement,k=p,w=w?Eo(w):null,w!==null&&(C=ri(w),w!==C||w.tag!==5&&w.tag!==6)&&(w=null)):(k=null,w=p),k!==w)){if(j=Rg,g="onMouseLeave",y="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(j=Mg,g="onPointerLeave",y="onPointerEnter",v="pointer"),C=k==null?m:wi(k),b=w==null?m:wi(w),m=new j(g,v+"leave",k,r,x),m.target=C,m.relatedTarget=b,g=null,Eo(x)===p&&(j=new j(y,v+"enter",w,r,x),j.target=b,j.relatedTarget=C,g=j),C=g,k&&w)t:{for(j=k,y=w,v=0,b=j;b;b=li(b))v++;for(b=0,g=y;g;g=li(g))b++;for(;0<v-b;)j=li(j),v--;for(;0<b-v;)y=li(y),b--;for(;v--;){if(j===y||y!==null&&j===y.alternate)break t;j=li(j),y=li(y)}j=null}else j=null;k!==null&&Hg(h,m,k,j,!1),w!==null&&C!==null&&Hg(h,C,w,j,!0)}}e:{if(m=p?wi(p):window,k=m.nodeName&&m.nodeName.toLowerCase(),k==="select"||k==="input"&&m.type==="file")var T=QS;else if(Ig(m))if(Eb)T=ZS;else{T=XS;var A=GS}else(k=m.nodeName)&&k.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(T=JS);if(T&&(T=T(e,p))){zb(h,T,r,x);break e}A&&A(e,m,p),e==="focusout"&&(A=m._wrapperState)&&A.controlled&&m.type==="number"&&sf(m,"number",m.value)}switch(A=p?wi(p):window,e){case"focusin":(Ig(A)||A.contentEditable==="true")&&(vi=A,yf=p,ha=null);break;case"focusout":ha=yf=vi=null;break;case"mousedown":vf=!0;break;case"contextmenu":case"mouseup":case"dragend":vf=!1,Ng(h,r,x);break;case"selectionchange":if(r4)break;case"keydown":case"keyup":Ng(h,r,x)}var B;if(Qh)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else yi?Sb(e,r)&&(z="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(z="onCompositionStart");z&&(jb&&r.locale!=="ko"&&(yi||z!=="onCompositionStart"?z==="onCompositionEnd"&&yi&&(B=kb()):(Kn=x,Yh="value"in Kn?Kn.value:Kn.textContent,yi=!0)),A=Wc(p,z),0<A.length&&(z=new Pg(z,e,null,r,x),h.push({event:z,listeners:A}),B?z.data=B:(B=Cb(r),B!==null&&(z.data=B)))),(B=HS?VS(e,r):YS(e,r))&&(p=Wc(p,"onBeforeInput"),0<p.length&&(x=new Pg("onBeforeInput","beforeinput",null,r,x),h.push({event:x,listeners:p}),x.data=B))}Lb(h,t)})}function Ra(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Wc(e,t){for(var r=t+"Capture",o=[];e!==null;){var s=e,a=s.stateNode;s.tag===5&&a!==null&&(s=a,a=Sa(e,r),a!=null&&o.unshift(Ra(e,a,s)),a=Sa(e,t),a!=null&&o.push(Ra(e,a,s))),e=e.return}return o}function li(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Hg(e,t,r,o,s){for(var a=t._reactName,l=[];r!==null&&r!==o;){var c=r,u=c.alternate,p=c.stateNode;if(u!==null&&u===o)break;c.tag===5&&p!==null&&(c=p,s?(u=Sa(r,a),u!=null&&l.unshift(Ra(r,u,c))):s||(u=Sa(r,a),u!=null&&l.push(Ra(r,u,c)))),r=r.return}l.length!==0&&e.push({event:t,listeners:l})}var s4=/\r\n?/g,a4=/\u0000|\uFFFD/g;function Vg(e){return(typeof e=="string"?e:""+e).replace(s4,`
`).replace(a4,"")}function Il(e,t,r){if(t=Vg(t),Vg(e)!==t&&r)throw Error(se(425))}function Kc(){}var bf=null,wf=null;function kf(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var jf=typeof setTimeout=="function"?setTimeout:void 0,l4=typeof clearTimeout=="function"?clearTimeout:void 0,Yg=typeof Promise=="function"?Promise:void 0,c4=typeof queueMicrotask=="function"?queueMicrotask:typeof Yg<"u"?function(e){return Yg.resolve(null).then(e).catch(d4)}:jf;function d4(e){setTimeout(function(){throw e})}function _u(e,t){var r=t,o=0;do{var s=r.nextSibling;if(e.removeChild(r),s&&s.nodeType===8)if(r=s.data,r==="/$"){if(o===0){e.removeChild(s),Ea(t);return}o--}else r!=="$"&&r!=="$?"&&r!=="$!"||o++;r=s}while(r);Ea(t)}function eo(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Wg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var us=Math.random().toString(36).slice(2),Gr="__reactFiber$"+us,Pa="__reactProps$"+us,bn="__reactContainer$"+us,Sf="__reactEvents$"+us,u4="__reactListeners$"+us,p4="__reactHandles$"+us;function Eo(e){var t=e[Gr];if(t)return t;for(var r=e.parentNode;r;){if(t=r[bn]||r[Gr]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Wg(e);e!==null;){if(r=e[Gr])return r;e=Wg(e)}return t}e=r,r=e.parentNode}return null}function Za(e){return e=e[Gr]||e[bn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function wi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(se(33))}function Cd(e){return e[Pa]||null}var Cf=[],ki=-1;function ho(e){return{current:e}}function Qe(e){0>ki||(e.current=Cf[ki],Cf[ki]=null,ki--)}function Ve(e,t){ki++,Cf[ki]=e.current,e.current=t}var co={},Bt=ho(co),Jt=ho(!1),Yo=co;function Qi(e,t){var r=e.type.contextTypes;if(!r)return co;var o=e.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===t)return o.__reactInternalMemoizedMaskedChildContext;var s={},a;for(a in r)s[a]=t[a];return o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Zt(e){return e=e.childContextTypes,e!=null}function Qc(){Qe(Jt),Qe(Bt)}function Kg(e,t,r){if(Bt.current!==co)throw Error(se(168));Ve(Bt,t),Ve(Jt,r)}function Bb(e,t,r){var o=e.stateNode;if(t=t.childContextTypes,typeof o.getChildContext!="function")return r;o=o.getChildContext();for(var s in o)if(!(s in t))throw Error(se(108,Gj(e)||"Unknown",s));return ot({},r,o)}function Gc(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||co,Yo=Bt.current,Ve(Bt,e),Ve(Jt,Jt.current),!0}function Qg(e,t,r){var o=e.stateNode;if(!o)throw Error(se(169));r?(e=Bb(e,t,Yo),o.__reactInternalMemoizedMergedChildContext=e,Qe(Jt),Qe(Bt),Ve(Bt,e)):Qe(Jt),Ve(Jt,r)}var dn=null,zd=!1,Tu=!1;function Fb(e){dn===null?dn=[e]:dn.push(e)}function f4(e){zd=!0,Fb(e)}function xo(){if(!Tu&&dn!==null){Tu=!0;var e=0,t=Ue;try{var r=dn;for(Ue=1;e<r.length;e++){var o=r[e];do o=o(!0);while(o!==null)}dn=null,zd=!1}catch(s){throw dn!==null&&(dn=dn.slice(e+1)),ub(Uh,xo),s}finally{Ue=t,Tu=!1}}return null}var ji=[],Si=0,Xc=null,Jc=0,vr=[],br=0,Wo=null,hn=1,xn="";function So(e,t){ji[Si++]=Jc,ji[Si++]=Xc,Xc=e,Jc=t}function Nb(e,t,r){vr[br++]=hn,vr[br++]=xn,vr[br++]=Wo,Wo=e;var o=hn;e=xn;var s=32-Ar(o)-1;o&=~(1<<s),r+=1;var a=32-Ar(t)+s;if(30<a){var l=s-s%5;a=(o&(1<<l)-1).toString(32),o>>=l,s-=l,hn=1<<32-Ar(t)+s|r<<s|o,xn=a+e}else hn=1<<a|r<<s|o,xn=e}function Xh(e){e.return!==null&&(So(e,1),Nb(e,1,0))}function Jh(e){for(;e===Xc;)Xc=ji[--Si],ji[Si]=null,Jc=ji[--Si],ji[Si]=null;for(;e===Wo;)Wo=vr[--br],vr[br]=null,xn=vr[--br],vr[br]=null,hn=vr[--br],vr[br]=null}var lr=null,ar=null,Ze=!1,Mr=null;function Ub(e,t){var r=kr(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Gg(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,lr=e,ar=eo(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,lr=e,ar=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Wo!==null?{id:hn,overflow:xn}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=kr(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,lr=e,ar=null,!0):!1;default:return!1}}function zf(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ef(e){if(Ze){var t=ar;if(t){var r=t;if(!Gg(e,t)){if(zf(e))throw Error(se(418));t=eo(r.nextSibling);var o=lr;t&&Gg(e,t)?Ub(o,r):(e.flags=e.flags&-4097|2,Ze=!1,lr=e)}}else{if(zf(e))throw Error(se(418));e.flags=e.flags&-4097|2,Ze=!1,lr=e}}}function Xg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;lr=e}function Ll(e){if(e!==lr)return!1;if(!Ze)return Xg(e),Ze=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!kf(e.type,e.memoizedProps)),t&&(t=ar)){if(zf(e))throw qb(),Error(se(418));for(;t;)Ub(e,t),t=eo(t.nextSibling)}if(Xg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(se(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){ar=eo(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}ar=null}}else ar=lr?eo(e.stateNode.nextSibling):null;return!0}function qb(){for(var e=ar;e;)e=eo(e.nextSibling)}function Gi(){ar=lr=null,Ze=!1}function Zh(e){Mr===null?Mr=[e]:Mr.push(e)}var h4=Cn.ReactCurrentBatchConfig;function Ms(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(se(309));var o=r.stateNode}if(!o)throw Error(se(147,e));var s=o,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(l){var c=s.refs;l===null?delete c[a]:c[a]=l},t._stringRef=a,t)}if(typeof e!="string")throw Error(se(284));if(!r._owner)throw Error(se(290,e))}return e}function Dl(e,t){throw e=Object.prototype.toString.call(t),Error(se(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Jg(e){var t=e._init;return t(e._payload)}function Hb(e){function t(y,v){if(e){var b=y.deletions;b===null?(y.deletions=[v],y.flags|=16):b.push(v)}}function r(y,v){if(!e)return null;for(;v!==null;)t(y,v),v=v.sibling;return null}function o(y,v){for(y=new Map;v!==null;)v.key!==null?y.set(v.key,v):y.set(v.index,v),v=v.sibling;return y}function s(y,v){return y=oo(y,v),y.index=0,y.sibling=null,y}function a(y,v,b){return y.index=b,e?(b=y.alternate,b!==null?(b=b.index,b<v?(y.flags|=2,v):b):(y.flags|=2,v)):(y.flags|=1048576,v)}function l(y){return e&&y.alternate===null&&(y.flags|=2),y}function c(y,v,b,g){return v===null||v.tag!==6?(v=Iu(b,y.mode,g),v.return=y,v):(v=s(v,b),v.return=y,v)}function u(y,v,b,g){var T=b.type;return T===mi?x(y,v,b.props.children,g,b.key):v!==null&&(v.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===In&&Jg(T)===v.type)?(g=s(v,b.props),g.ref=Ms(y,v,b),g.return=y,g):(g=Cc(b.type,b.key,b.props,null,y.mode,g),g.ref=Ms(y,v,b),g.return=y,g)}function p(y,v,b,g){return v===null||v.tag!==4||v.stateNode.containerInfo!==b.containerInfo||v.stateNode.implementation!==b.implementation?(v=Lu(b,y.mode,g),v.return=y,v):(v=s(v,b.children||[]),v.return=y,v)}function x(y,v,b,g,T){return v===null||v.tag!==7?(v=Fo(b,y.mode,g,T),v.return=y,v):(v=s(v,b),v.return=y,v)}function h(y,v,b){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Iu(""+v,y.mode,b),v.return=y,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case El:return b=Cc(v.type,v.key,v.props,null,y.mode,b),b.ref=Ms(y,null,v),b.return=y,b;case gi:return v=Lu(v,y.mode,b),v.return=y,v;case In:var g=v._init;return h(y,g(v._payload),b)}if(na(v)||_s(v))return v=Fo(v,y.mode,b,null),v.return=y,v;Dl(y,v)}return null}function m(y,v,b,g){var T=v!==null?v.key:null;if(typeof b=="string"&&b!==""||typeof b=="number")return T!==null?null:c(y,v,""+b,g);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case El:return b.key===T?u(y,v,b,g):null;case gi:return b.key===T?p(y,v,b,g):null;case In:return T=b._init,m(y,v,T(b._payload),g)}if(na(b)||_s(b))return T!==null?null:x(y,v,b,g,null);Dl(y,b)}return null}function k(y,v,b,g,T){if(typeof g=="string"&&g!==""||typeof g=="number")return y=y.get(b)||null,c(v,y,""+g,T);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case El:return y=y.get(g.key===null?b:g.key)||null,u(v,y,g,T);case gi:return y=y.get(g.key===null?b:g.key)||null,p(v,y,g,T);case In:var A=g._init;return k(y,v,b,A(g._payload),T)}if(na(g)||_s(g))return y=y.get(b)||null,x(v,y,g,T,null);Dl(v,g)}return null}function w(y,v,b,g){for(var T=null,A=null,B=v,z=v=0,H=null;B!==null&&z<b.length;z++){B.index>z?(H=B,B=null):H=B.sibling;var D=m(y,B,b[z],g);if(D===null){B===null&&(B=H);break}e&&B&&D.alternate===null&&t(y,B),v=a(D,v,z),A===null?T=D:A.sibling=D,A=D,B=H}if(z===b.length)return r(y,B),Ze&&So(y,z),T;if(B===null){for(;z<b.length;z++)B=h(y,b[z],g),B!==null&&(v=a(B,v,z),A===null?T=B:A.sibling=B,A=B);return Ze&&So(y,z),T}for(B=o(y,B);z<b.length;z++)H=k(B,y,z,b[z],g),H!==null&&(e&&H.alternate!==null&&B.delete(H.key===null?z:H.key),v=a(H,v,z),A===null?T=H:A.sibling=H,A=H);return e&&B.forEach(function(U){return t(y,U)}),Ze&&So(y,z),T}function j(y,v,b,g){var T=_s(b);if(typeof T!="function")throw Error(se(150));if(b=T.call(b),b==null)throw Error(se(151));for(var A=T=null,B=v,z=v=0,H=null,D=b.next();B!==null&&!D.done;z++,D=b.next()){B.index>z?(H=B,B=null):H=B.sibling;var U=m(y,B,D.value,g);if(U===null){B===null&&(B=H);break}e&&B&&U.alternate===null&&t(y,B),v=a(U,v,z),A===null?T=U:A.sibling=U,A=U,B=H}if(D.done)return r(y,B),Ze&&So(y,z),T;if(B===null){for(;!D.done;z++,D=b.next())D=h(y,D.value,g),D!==null&&(v=a(D,v,z),A===null?T=D:A.sibling=D,A=D);return Ze&&So(y,z),T}for(B=o(y,B);!D.done;z++,D=b.next())D=k(B,y,z,D.value,g),D!==null&&(e&&D.alternate!==null&&B.delete(D.key===null?z:D.key),v=a(D,v,z),A===null?T=D:A.sibling=D,A=D);return e&&B.forEach(function(M){return t(y,M)}),Ze&&So(y,z),T}function C(y,v,b,g){if(typeof b=="object"&&b!==null&&b.type===mi&&b.key===null&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case El:e:{for(var T=b.key,A=v;A!==null;){if(A.key===T){if(T=b.type,T===mi){if(A.tag===7){r(y,A.sibling),v=s(A,b.props.children),v.return=y,y=v;break e}}else if(A.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===In&&Jg(T)===A.type){r(y,A.sibling),v=s(A,b.props),v.ref=Ms(y,A,b),v.return=y,y=v;break e}r(y,A);break}else t(y,A);A=A.sibling}b.type===mi?(v=Fo(b.props.children,y.mode,g,b.key),v.return=y,y=v):(g=Cc(b.type,b.key,b.props,null,y.mode,g),g.ref=Ms(y,v,b),g.return=y,y=g)}return l(y);case gi:e:{for(A=b.key;v!==null;){if(v.key===A)if(v.tag===4&&v.stateNode.containerInfo===b.containerInfo&&v.stateNode.implementation===b.implementation){r(y,v.sibling),v=s(v,b.children||[]),v.return=y,y=v;break e}else{r(y,v);break}else t(y,v);v=v.sibling}v=Lu(b,y.mode,g),v.return=y,y=v}return l(y);case In:return A=b._init,C(y,v,A(b._payload),g)}if(na(b))return w(y,v,b,g);if(_s(b))return j(y,v,b,g);Dl(y,b)}return typeof b=="string"&&b!==""||typeof b=="number"?(b=""+b,v!==null&&v.tag===6?(r(y,v.sibling),v=s(v,b),v.return=y,y=v):(r(y,v),v=Iu(b,y.mode,g),v.return=y,y=v),l(y)):r(y,v)}return C}var Xi=Hb(!0),Vb=Hb(!1),Zc=ho(null),ed=null,Ci=null,ex=null;function tx(){ex=Ci=ed=null}function rx(e){var t=Zc.current;Qe(Zc),e._currentValue=t}function _f(e,t,r){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===r)break;e=e.return}}function Ai(e,t){ed=e,ex=Ci=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Gt=!0),e.firstContext=null)}function Sr(e){var t=e._currentValue;if(ex!==e)if(e={context:e,memoizedValue:t,next:null},Ci===null){if(ed===null)throw Error(se(308));Ci=e,ed.dependencies={lanes:0,firstContext:e}}else Ci=Ci.next=e;return t}var _o=null;function nx(e){_o===null?_o=[e]:_o.push(e)}function Yb(e,t,r,o){var s=t.interleaved;return s===null?(r.next=r,nx(t)):(r.next=s.next,s.next=r),t.interleaved=r,wn(e,o)}function wn(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Ln=!1;function ox(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wb(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function to(e,t,r){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,Ie&2){var s=o.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),o.pending=t,wn(e,r)}return s=o.interleaved,s===null?(t.next=t,nx(o)):(t.next=s.next,s.next=t),o.interleaved=t,wn(e,r)}function vc(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,qh(e,r)}}function Zg(e,t){var r=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,r===o)){var s=null,a=null;if(r=r.firstBaseUpdate,r!==null){do{var l={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};a===null?s=a=l:a=a.next=l,r=r.next}while(r!==null);a===null?s=a=t:a=a.next=t}else s=a=t;r={baseState:o.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:o.shared,effects:o.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function td(e,t,r,o){var s=e.updateQueue;Ln=!1;var a=s.firstBaseUpdate,l=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var u=c,p=u.next;u.next=null,l===null?a=p:l.next=p,l=u;var x=e.alternate;x!==null&&(x=x.updateQueue,c=x.lastBaseUpdate,c!==l&&(c===null?x.firstBaseUpdate=p:c.next=p,x.lastBaseUpdate=u))}if(a!==null){var h=s.baseState;l=0,x=p=u=null,c=a;do{var m=c.lane,k=c.eventTime;if((o&m)===m){x!==null&&(x=x.next={eventTime:k,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var w=e,j=c;switch(m=t,k=r,j.tag){case 1:if(w=j.payload,typeof w=="function"){h=w.call(k,h,m);break e}h=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=j.payload,m=typeof w=="function"?w.call(k,h,m):w,m==null)break e;h=ot({},h,m);break e;case 2:Ln=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,m=s.effects,m===null?s.effects=[c]:m.push(c))}else k={eventTime:k,lane:m,tag:c.tag,payload:c.payload,callback:c.callback,next:null},x===null?(p=x=k,u=h):x=x.next=k,l|=m;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;m=c,c=m.next,m.next=null,s.lastBaseUpdate=m,s.shared.pending=null}}while(!0);if(x===null&&(u=h),s.baseState=u,s.firstBaseUpdate=p,s.lastBaseUpdate=x,t=s.shared.interleaved,t!==null){s=t;do l|=s.lane,s=s.next;while(s!==t)}else a===null&&(s.shared.lanes=0);Qo|=l,e.lanes=l,e.memoizedState=h}}function em(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var o=e[t],s=o.callback;if(s!==null){if(o.callback=null,o=r,typeof s!="function")throw Error(se(191,s));s.call(o)}}}var el={},Zr=ho(el),Ma=ho(el),Oa=ho(el);function To(e){if(e===el)throw Error(se(174));return e}function ix(e,t){switch(Ve(Oa,t),Ve(Ma,e),Ve(Zr,el),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:lf(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=lf(t,e)}Qe(Zr),Ve(Zr,t)}function Ji(){Qe(Zr),Qe(Ma),Qe(Oa)}function Kb(e){To(Oa.current);var t=To(Zr.current),r=lf(t,e.type);t!==r&&(Ve(Ma,e),Ve(Zr,r))}function sx(e){Ma.current===e&&(Qe(Zr),Qe(Ma))}var tt=ho(0);function rd(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $u=[];function ax(){for(var e=0;e<$u.length;e++)$u[e]._workInProgressVersionPrimary=null;$u.length=0}var bc=Cn.ReactCurrentDispatcher,Ru=Cn.ReactCurrentBatchConfig,Ko=0,rt=null,yt=null,jt=null,nd=!1,xa=!1,Aa=0,x4=0;function Rt(){throw Error(se(321))}function lx(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Br(e[r],t[r]))return!1;return!0}function cx(e,t,r,o,s,a){if(Ko=a,rt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,bc.current=e===null||e.memoizedState===null?v4:b4,e=r(o,s),xa){a=0;do{if(xa=!1,Aa=0,25<=a)throw Error(se(301));a+=1,jt=yt=null,t.updateQueue=null,bc.current=w4,e=r(o,s)}while(xa)}if(bc.current=od,t=yt!==null&&yt.next!==null,Ko=0,jt=yt=rt=null,nd=!1,t)throw Error(se(300));return e}function dx(){var e=Aa!==0;return Aa=0,e}function Vr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return jt===null?rt.memoizedState=jt=e:jt=jt.next=e,jt}function Cr(){if(yt===null){var e=rt.alternate;e=e!==null?e.memoizedState:null}else e=yt.next;var t=jt===null?rt.memoizedState:jt.next;if(t!==null)jt=t,yt=e;else{if(e===null)throw Error(se(310));yt=e,e={memoizedState:yt.memoizedState,baseState:yt.baseState,baseQueue:yt.baseQueue,queue:yt.queue,next:null},jt===null?rt.memoizedState=jt=e:jt=jt.next=e}return jt}function Ia(e,t){return typeof t=="function"?t(e):t}function Pu(e){var t=Cr(),r=t.queue;if(r===null)throw Error(se(311));r.lastRenderedReducer=e;var o=yt,s=o.baseQueue,a=r.pending;if(a!==null){if(s!==null){var l=s.next;s.next=a.next,a.next=l}o.baseQueue=s=a,r.pending=null}if(s!==null){a=s.next,o=o.baseState;var c=l=null,u=null,p=a;do{var x=p.lane;if((Ko&x)===x)u!==null&&(u=u.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),o=p.hasEagerState?p.eagerState:e(o,p.action);else{var h={lane:x,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};u===null?(c=u=h,l=o):u=u.next=h,rt.lanes|=x,Qo|=x}p=p.next}while(p!==null&&p!==a);u===null?l=o:u.next=c,Br(o,t.memoizedState)||(Gt=!0),t.memoizedState=o,t.baseState=l,t.baseQueue=u,r.lastRenderedState=o}if(e=r.interleaved,e!==null){s=e;do a=s.lane,rt.lanes|=a,Qo|=a,s=s.next;while(s!==e)}else s===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Mu(e){var t=Cr(),r=t.queue;if(r===null)throw Error(se(311));r.lastRenderedReducer=e;var o=r.dispatch,s=r.pending,a=t.memoizedState;if(s!==null){r.pending=null;var l=s=s.next;do a=e(a,l.action),l=l.next;while(l!==s);Br(a,t.memoizedState)||(Gt=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),r.lastRenderedState=a}return[a,o]}function Qb(){}function Gb(e,t){var r=rt,o=Cr(),s=t(),a=!Br(o.memoizedState,s);if(a&&(o.memoizedState=s,Gt=!0),o=o.queue,ux(Zb.bind(null,r,o,e),[e]),o.getSnapshot!==t||a||jt!==null&&jt.memoizedState.tag&1){if(r.flags|=2048,La(9,Jb.bind(null,r,o,s,t),void 0,null),Ct===null)throw Error(se(349));Ko&30||Xb(r,t,s)}return s}function Xb(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=rt.updateQueue,t===null?(t={lastEffect:null,stores:null},rt.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Jb(e,t,r,o){t.value=r,t.getSnapshot=o,e2(t)&&t2(e)}function Zb(e,t,r){return r(function(){e2(t)&&t2(e)})}function e2(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Br(e,r)}catch{return!0}}function t2(e){var t=wn(e,1);t!==null&&Ir(t,e,1,-1)}function tm(e){var t=Vr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ia,lastRenderedState:e},t.queue=e,e=e.dispatch=y4.bind(null,rt,e),[t.memoizedState,e]}function La(e,t,r,o){return e={tag:e,create:t,destroy:r,deps:o,next:null},t=rt.updateQueue,t===null?(t={lastEffect:null,stores:null},rt.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(o=r.next,r.next=e,e.next=o,t.lastEffect=e)),e}function r2(){return Cr().memoizedState}function wc(e,t,r,o){var s=Vr();rt.flags|=e,s.memoizedState=La(1|t,r,void 0,o===void 0?null:o)}function Ed(e,t,r,o){var s=Cr();o=o===void 0?null:o;var a=void 0;if(yt!==null){var l=yt.memoizedState;if(a=l.destroy,o!==null&&lx(o,l.deps)){s.memoizedState=La(t,r,a,o);return}}rt.flags|=e,s.memoizedState=La(1|t,r,a,o)}function rm(e,t){return wc(8390656,8,e,t)}function ux(e,t){return Ed(2048,8,e,t)}function n2(e,t){return Ed(4,2,e,t)}function o2(e,t){return Ed(4,4,e,t)}function i2(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function s2(e,t,r){return r=r!=null?r.concat([e]):null,Ed(4,4,i2.bind(null,t,e),r)}function px(){}function a2(e,t){var r=Cr();t=t===void 0?null:t;var o=r.memoizedState;return o!==null&&t!==null&&lx(t,o[1])?o[0]:(r.memoizedState=[e,t],e)}function l2(e,t){var r=Cr();t=t===void 0?null:t;var o=r.memoizedState;return o!==null&&t!==null&&lx(t,o[1])?o[0]:(e=e(),r.memoizedState=[e,t],e)}function c2(e,t,r){return Ko&21?(Br(r,t)||(r=hb(),rt.lanes|=r,Qo|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Gt=!0),e.memoizedState=r)}function g4(e,t){var r=Ue;Ue=r!==0&&4>r?r:4,e(!0);var o=Ru.transition;Ru.transition={};try{e(!1),t()}finally{Ue=r,Ru.transition=o}}function d2(){return Cr().memoizedState}function m4(e,t,r){var o=no(e);if(r={lane:o,action:r,hasEagerState:!1,eagerState:null,next:null},u2(e))p2(t,r);else if(r=Yb(e,t,r,o),r!==null){var s=qt();Ir(r,e,o,s),f2(r,t,o)}}function y4(e,t,r){var o=no(e),s={lane:o,action:r,hasEagerState:!1,eagerState:null,next:null};if(u2(e))p2(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var l=t.lastRenderedState,c=a(l,r);if(s.hasEagerState=!0,s.eagerState=c,Br(c,l)){var u=t.interleaved;u===null?(s.next=s,nx(t)):(s.next=u.next,u.next=s),t.interleaved=s;return}}catch{}finally{}r=Yb(e,t,s,o),r!==null&&(s=qt(),Ir(r,e,o,s),f2(r,t,o))}}function u2(e){var t=e.alternate;return e===rt||t!==null&&t===rt}function p2(e,t){xa=nd=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function f2(e,t,r){if(r&4194240){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,qh(e,r)}}var od={readContext:Sr,useCallback:Rt,useContext:Rt,useEffect:Rt,useImperativeHandle:Rt,useInsertionEffect:Rt,useLayoutEffect:Rt,useMemo:Rt,useReducer:Rt,useRef:Rt,useState:Rt,useDebugValue:Rt,useDeferredValue:Rt,useTransition:Rt,useMutableSource:Rt,useSyncExternalStore:Rt,useId:Rt,unstable_isNewReconciler:!1},v4={readContext:Sr,useCallback:function(e,t){return Vr().memoizedState=[e,t===void 0?null:t],e},useContext:Sr,useEffect:rm,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,wc(4194308,4,i2.bind(null,t,e),r)},useLayoutEffect:function(e,t){return wc(4194308,4,e,t)},useInsertionEffect:function(e,t){return wc(4,2,e,t)},useMemo:function(e,t){var r=Vr();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var o=Vr();return t=r!==void 0?r(t):t,o.memoizedState=o.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},o.queue=e,e=e.dispatch=m4.bind(null,rt,e),[o.memoizedState,e]},useRef:function(e){var t=Vr();return e={current:e},t.memoizedState=e},useState:tm,useDebugValue:px,useDeferredValue:function(e){return Vr().memoizedState=e},useTransition:function(){var e=tm(!1),t=e[0];return e=g4.bind(null,e[1]),Vr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var o=rt,s=Vr();if(Ze){if(r===void 0)throw Error(se(407));r=r()}else{if(r=t(),Ct===null)throw Error(se(349));Ko&30||Xb(o,t,r)}s.memoizedState=r;var a={value:r,getSnapshot:t};return s.queue=a,rm(Zb.bind(null,o,a,e),[e]),o.flags|=2048,La(9,Jb.bind(null,o,a,r,t),void 0,null),r},useId:function(){var e=Vr(),t=Ct.identifierPrefix;if(Ze){var r=xn,o=hn;r=(o&~(1<<32-Ar(o)-1)).toString(32)+r,t=":"+t+"R"+r,r=Aa++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=x4++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},b4={readContext:Sr,useCallback:a2,useContext:Sr,useEffect:ux,useImperativeHandle:s2,useInsertionEffect:n2,useLayoutEffect:o2,useMemo:l2,useReducer:Pu,useRef:r2,useState:function(){return Pu(Ia)},useDebugValue:px,useDeferredValue:function(e){var t=Cr();return c2(t,yt.memoizedState,e)},useTransition:function(){var e=Pu(Ia)[0],t=Cr().memoizedState;return[e,t]},useMutableSource:Qb,useSyncExternalStore:Gb,useId:d2,unstable_isNewReconciler:!1},w4={readContext:Sr,useCallback:a2,useContext:Sr,useEffect:ux,useImperativeHandle:s2,useInsertionEffect:n2,useLayoutEffect:o2,useMemo:l2,useReducer:Mu,useRef:r2,useState:function(){return Mu(Ia)},useDebugValue:px,useDeferredValue:function(e){var t=Cr();return yt===null?t.memoizedState=e:c2(t,yt.memoizedState,e)},useTransition:function(){var e=Mu(Ia)[0],t=Cr().memoizedState;return[e,t]},useMutableSource:Qb,useSyncExternalStore:Gb,useId:d2,unstable_isNewReconciler:!1};function _r(e,t){if(e&&e.defaultProps){t=ot({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Tf(e,t,r,o){t=e.memoizedState,r=r(o,t),r=r==null?t:ot({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var _d={isMounted:function(e){return(e=e._reactInternals)?ri(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var o=qt(),s=no(e),a=gn(o,s);a.payload=t,r!=null&&(a.callback=r),t=to(e,a,s),t!==null&&(Ir(t,e,s,o),vc(t,e,s))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var o=qt(),s=no(e),a=gn(o,s);a.tag=1,a.payload=t,r!=null&&(a.callback=r),t=to(e,a,s),t!==null&&(Ir(t,e,s,o),vc(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=qt(),o=no(e),s=gn(r,o);s.tag=2,t!=null&&(s.callback=t),t=to(e,s,o),t!==null&&(Ir(t,e,o,r),vc(t,e,o))}};function nm(e,t,r,o,s,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,a,l):t.prototype&&t.prototype.isPureReactComponent?!Ta(r,o)||!Ta(s,a):!0}function h2(e,t,r){var o=!1,s=co,a=t.contextType;return typeof a=="object"&&a!==null?a=Sr(a):(s=Zt(t)?Yo:Bt.current,o=t.contextTypes,a=(o=o!=null)?Qi(e,s):co),t=new t(r,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=_d,e.stateNode=t,t._reactInternals=e,o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=a),t}function om(e,t,r,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,o),t.state!==e&&_d.enqueueReplaceState(t,t.state,null)}function $f(e,t,r,o){var s=e.stateNode;s.props=r,s.state=e.memoizedState,s.refs={},ox(e);var a=t.contextType;typeof a=="object"&&a!==null?s.context=Sr(a):(a=Zt(t)?Yo:Bt.current,s.context=Qi(e,a)),s.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Tf(e,t,a,r),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&_d.enqueueReplaceState(s,s.state,null),td(e,r,s,o),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Zi(e,t){try{var r="",o=t;do r+=Qj(o),o=o.return;while(o);var s=r}catch(a){s=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:s,digest:null}}function Ou(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Rf(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var k4=typeof WeakMap=="function"?WeakMap:Map;function x2(e,t,r){r=gn(-1,r),r.tag=3,r.payload={element:null};var o=t.value;return r.callback=function(){sd||(sd=!0,Nf=o),Rf(e,t)},r}function g2(e,t,r){r=gn(-1,r),r.tag=3;var o=e.type.getDerivedStateFromError;if(typeof o=="function"){var s=t.value;r.payload=function(){return o(s)},r.callback=function(){Rf(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(r.callback=function(){Rf(e,t),typeof o!="function"&&(ro===null?ro=new Set([this]):ro.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),r}function im(e,t,r){var o=e.pingCache;if(o===null){o=e.pingCache=new k4;var s=new Set;o.set(t,s)}else s=o.get(t),s===void 0&&(s=new Set,o.set(t,s));s.has(r)||(s.add(r),e=I4.bind(null,e,t,r),t.then(e,e))}function sm(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function am(e,t,r,o,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=gn(-1,1),t.tag=2,to(r,t,1))),r.lanes|=1),e)}var j4=Cn.ReactCurrentOwner,Gt=!1;function Ut(e,t,r,o){t.child=e===null?Vb(t,null,r,o):Xi(t,e.child,r,o)}function lm(e,t,r,o,s){r=r.render;var a=t.ref;return Ai(t,s),o=cx(e,t,r,o,a,s),r=dx(),e!==null&&!Gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,kn(e,t,s)):(Ze&&r&&Xh(t),t.flags|=1,Ut(e,t,o,s),t.child)}function cm(e,t,r,o,s){if(e===null){var a=r.type;return typeof a=="function"&&!bx(a)&&a.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=a,m2(e,t,a,o,s)):(e=Cc(r.type,null,o,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&s)){var l=a.memoizedProps;if(r=r.compare,r=r!==null?r:Ta,r(l,o)&&e.ref===t.ref)return kn(e,t,s)}return t.flags|=1,e=oo(a,o),e.ref=t.ref,e.return=t,t.child=e}function m2(e,t,r,o,s){if(e!==null){var a=e.memoizedProps;if(Ta(a,o)&&e.ref===t.ref)if(Gt=!1,t.pendingProps=o=a,(e.lanes&s)!==0)e.flags&131072&&(Gt=!0);else return t.lanes=e.lanes,kn(e,t,s)}return Pf(e,t,r,o,s)}function y2(e,t,r){var o=t.pendingProps,s=o.children,a=e!==null?e.memoizedState:null;if(o.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ve(Ei,ir),ir|=r;else{if(!(r&1073741824))return e=a!==null?a.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ve(Ei,ir),ir|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},o=a!==null?a.baseLanes:r,Ve(Ei,ir),ir|=o}else a!==null?(o=a.baseLanes|r,t.memoizedState=null):o=r,Ve(Ei,ir),ir|=o;return Ut(e,t,s,r),t.child}function v2(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Pf(e,t,r,o,s){var a=Zt(r)?Yo:Bt.current;return a=Qi(t,a),Ai(t,s),r=cx(e,t,r,o,a,s),o=dx(),e!==null&&!Gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,kn(e,t,s)):(Ze&&o&&Xh(t),t.flags|=1,Ut(e,t,r,s),t.child)}function dm(e,t,r,o,s){if(Zt(r)){var a=!0;Gc(t)}else a=!1;if(Ai(t,s),t.stateNode===null)kc(e,t),h2(t,r,o),$f(t,r,o,s),o=!0;else if(e===null){var l=t.stateNode,c=t.memoizedProps;l.props=c;var u=l.context,p=r.contextType;typeof p=="object"&&p!==null?p=Sr(p):(p=Zt(r)?Yo:Bt.current,p=Qi(t,p));var x=r.getDerivedStateFromProps,h=typeof x=="function"||typeof l.getSnapshotBeforeUpdate=="function";h||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==o||u!==p)&&om(t,l,o,p),Ln=!1;var m=t.memoizedState;l.state=m,td(t,o,l,s),u=t.memoizedState,c!==o||m!==u||Jt.current||Ln?(typeof x=="function"&&(Tf(t,r,x,o),u=t.memoizedState),(c=Ln||nm(t,r,c,o,m,u,p))?(h||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=u),l.props=o,l.state=u,l.context=p,o=c):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{l=t.stateNode,Wb(e,t),c=t.memoizedProps,p=t.type===t.elementType?c:_r(t.type,c),l.props=p,h=t.pendingProps,m=l.context,u=r.contextType,typeof u=="object"&&u!==null?u=Sr(u):(u=Zt(r)?Yo:Bt.current,u=Qi(t,u));var k=r.getDerivedStateFromProps;(x=typeof k=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==h||m!==u)&&om(t,l,o,u),Ln=!1,m=t.memoizedState,l.state=m,td(t,o,l,s);var w=t.memoizedState;c!==h||m!==w||Jt.current||Ln?(typeof k=="function"&&(Tf(t,r,k,o),w=t.memoizedState),(p=Ln||nm(t,r,p,o,m,w,u)||!1)?(x||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(o,w,u),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(o,w,u)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=w),l.props=o,l.state=w,l.context=u,o=p):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),o=!1)}return Mf(e,t,r,o,a,s)}function Mf(e,t,r,o,s,a){v2(e,t);var l=(t.flags&128)!==0;if(!o&&!l)return s&&Qg(t,r,!1),kn(e,t,a);o=t.stateNode,j4.current=t;var c=l&&typeof r.getDerivedStateFromError!="function"?null:o.render();return t.flags|=1,e!==null&&l?(t.child=Xi(t,e.child,null,a),t.child=Xi(t,null,c,a)):Ut(e,t,c,a),t.memoizedState=o.state,s&&Qg(t,r,!0),t.child}function b2(e){var t=e.stateNode;t.pendingContext?Kg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Kg(e,t.context,!1),ix(e,t.containerInfo)}function um(e,t,r,o,s){return Gi(),Zh(s),t.flags|=256,Ut(e,t,r,o),t.child}var Of={dehydrated:null,treeContext:null,retryLane:0};function Af(e){return{baseLanes:e,cachePool:null,transitions:null}}function w2(e,t,r){var o=t.pendingProps,s=tt.current,a=!1,l=(t.flags&128)!==0,c;if((c=l)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),Ve(tt,s&1),e===null)return Ef(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=o.children,e=o.fallback,a?(o=t.mode,a=t.child,l={mode:"hidden",children:l},!(o&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=Rd(l,o,0,null),e=Fo(e,o,r,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Af(r),t.memoizedState=Of,e):fx(t,l));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return S4(e,t,l,o,c,s,r);if(a){a=o.fallback,l=t.mode,s=e.child,c=s.sibling;var u={mode:"hidden",children:o.children};return!(l&1)&&t.child!==s?(o=t.child,o.childLanes=0,o.pendingProps=u,t.deletions=null):(o=oo(s,u),o.subtreeFlags=s.subtreeFlags&14680064),c!==null?a=oo(c,a):(a=Fo(a,l,r,null),a.flags|=2),a.return=t,o.return=t,o.sibling=a,t.child=o,o=a,a=t.child,l=e.child.memoizedState,l=l===null?Af(r):{baseLanes:l.baseLanes|r,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~r,t.memoizedState=Of,o}return a=e.child,e=a.sibling,o=oo(a,{mode:"visible",children:o.children}),!(t.mode&1)&&(o.lanes=r),o.return=t,o.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=o,t.memoizedState=null,o}function fx(e,t){return t=Rd({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Bl(e,t,r,o){return o!==null&&Zh(o),Xi(t,e.child,null,r),e=fx(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function S4(e,t,r,o,s,a,l){if(r)return t.flags&256?(t.flags&=-257,o=Ou(Error(se(422))),Bl(e,t,l,o)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=o.fallback,s=t.mode,o=Rd({mode:"visible",children:o.children},s,0,null),a=Fo(a,s,l,null),a.flags|=2,o.return=t,a.return=t,o.sibling=a,t.child=o,t.mode&1&&Xi(t,e.child,null,l),t.child.memoizedState=Af(l),t.memoizedState=Of,a);if(!(t.mode&1))return Bl(e,t,l,null);if(s.data==="$!"){if(o=s.nextSibling&&s.nextSibling.dataset,o)var c=o.dgst;return o=c,a=Error(se(419)),o=Ou(a,o,void 0),Bl(e,t,l,o)}if(c=(l&e.childLanes)!==0,Gt||c){if(o=Ct,o!==null){switch(l&-l){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(o.suspendedLanes|l)?0:s,s!==0&&s!==a.retryLane&&(a.retryLane=s,wn(e,s),Ir(o,e,s,-1))}return vx(),o=Ou(Error(se(421))),Bl(e,t,l,o)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=L4.bind(null,e),s._reactRetry=t,null):(e=a.treeContext,ar=eo(s.nextSibling),lr=t,Ze=!0,Mr=null,e!==null&&(vr[br++]=hn,vr[br++]=xn,vr[br++]=Wo,hn=e.id,xn=e.overflow,Wo=t),t=fx(t,o.children),t.flags|=4096,t)}function pm(e,t,r){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),_f(e.return,t,r)}function Au(e,t,r,o,s){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:r,tailMode:s}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=o,a.tail=r,a.tailMode=s)}function k2(e,t,r){var o=t.pendingProps,s=o.revealOrder,a=o.tail;if(Ut(e,t,o.children,r),o=tt.current,o&2)o=o&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&pm(e,r,t);else if(e.tag===19)pm(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}o&=1}if(Ve(tt,o),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(r=t.child,s=null;r!==null;)e=r.alternate,e!==null&&rd(e)===null&&(s=r),r=r.sibling;r=s,r===null?(s=t.child,t.child=null):(s=r.sibling,r.sibling=null),Au(t,!1,s,r,a);break;case"backwards":for(r=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&rd(e)===null){t.child=s;break}e=s.sibling,s.sibling=r,r=s,s=e}Au(t,!0,r,null,a);break;case"together":Au(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function kc(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function kn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Qo|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(se(153));if(t.child!==null){for(e=t.child,r=oo(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=oo(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function C4(e,t,r){switch(t.tag){case 3:b2(t),Gi();break;case 5:Kb(t);break;case 1:Zt(t.type)&&Gc(t);break;case 4:ix(t,t.stateNode.containerInfo);break;case 10:var o=t.type._context,s=t.memoizedProps.value;Ve(Zc,o._currentValue),o._currentValue=s;break;case 13:if(o=t.memoizedState,o!==null)return o.dehydrated!==null?(Ve(tt,tt.current&1),t.flags|=128,null):r&t.child.childLanes?w2(e,t,r):(Ve(tt,tt.current&1),e=kn(e,t,r),e!==null?e.sibling:null);Ve(tt,tt.current&1);break;case 19:if(o=(r&t.childLanes)!==0,e.flags&128){if(o)return k2(e,t,r);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Ve(tt,tt.current),o)break;return null;case 22:case 23:return t.lanes=0,y2(e,t,r)}return kn(e,t,r)}var j2,If,S2,C2;j2=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};If=function(){};S2=function(e,t,r,o){var s=e.memoizedProps;if(s!==o){e=t.stateNode,To(Zr.current);var a=null;switch(r){case"input":s=nf(e,s),o=nf(e,o),a=[];break;case"select":s=ot({},s,{value:void 0}),o=ot({},o,{value:void 0}),a=[];break;case"textarea":s=af(e,s),o=af(e,o),a=[];break;default:typeof s.onClick!="function"&&typeof o.onClick=="function"&&(e.onclick=Kc)}cf(r,o);var l;r=null;for(p in s)if(!o.hasOwnProperty(p)&&s.hasOwnProperty(p)&&s[p]!=null)if(p==="style"){var c=s[p];for(l in c)c.hasOwnProperty(l)&&(r||(r={}),r[l]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(ka.hasOwnProperty(p)?a||(a=[]):(a=a||[]).push(p,null));for(p in o){var u=o[p];if(c=s!=null?s[p]:void 0,o.hasOwnProperty(p)&&u!==c&&(u!=null||c!=null))if(p==="style")if(c){for(l in c)!c.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(r||(r={}),r[l]="");for(l in u)u.hasOwnProperty(l)&&c[l]!==u[l]&&(r||(r={}),r[l]=u[l])}else r||(a||(a=[]),a.push(p,r)),r=u;else p==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(a=a||[]).push(p,u)):p==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(p,""+u):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(ka.hasOwnProperty(p)?(u!=null&&p==="onScroll"&&We("scroll",e),a||c===u||(a=[])):(a=a||[]).push(p,u))}r&&(a=a||[]).push("style",r);var p=a;(t.updateQueue=p)&&(t.flags|=4)}};C2=function(e,t,r,o){r!==o&&(t.flags|=4)};function Os(e,t){if(!Ze)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Pt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,o=0;if(t)for(var s=e.child;s!==null;)r|=s.lanes|s.childLanes,o|=s.subtreeFlags&14680064,o|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)r|=s.lanes|s.childLanes,o|=s.subtreeFlags,o|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=o,e.childLanes=r,t}function z4(e,t,r){var o=t.pendingProps;switch(Jh(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pt(t),null;case 1:return Zt(t.type)&&Qc(),Pt(t),null;case 3:return o=t.stateNode,Ji(),Qe(Jt),Qe(Bt),ax(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(e===null||e.child===null)&&(Ll(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Mr!==null&&(Hf(Mr),Mr=null))),If(e,t),Pt(t),null;case 5:sx(t);var s=To(Oa.current);if(r=t.type,e!==null&&t.stateNode!=null)S2(e,t,r,o,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!o){if(t.stateNode===null)throw Error(se(166));return Pt(t),null}if(e=To(Zr.current),Ll(t)){o=t.stateNode,r=t.type;var a=t.memoizedProps;switch(o[Gr]=t,o[Pa]=a,e=(t.mode&1)!==0,r){case"dialog":We("cancel",o),We("close",o);break;case"iframe":case"object":case"embed":We("load",o);break;case"video":case"audio":for(s=0;s<ia.length;s++)We(ia[s],o);break;case"source":We("error",o);break;case"img":case"image":case"link":We("error",o),We("load",o);break;case"details":We("toggle",o);break;case"input":wg(o,a),We("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!a.multiple},We("invalid",o);break;case"textarea":jg(o,a),We("invalid",o)}cf(r,a),s=null;for(var l in a)if(a.hasOwnProperty(l)){var c=a[l];l==="children"?typeof c=="string"?o.textContent!==c&&(a.suppressHydrationWarning!==!0&&Il(o.textContent,c,e),s=["children",c]):typeof c=="number"&&o.textContent!==""+c&&(a.suppressHydrationWarning!==!0&&Il(o.textContent,c,e),s=["children",""+c]):ka.hasOwnProperty(l)&&c!=null&&l==="onScroll"&&We("scroll",o)}switch(r){case"input":_l(o),kg(o,a,!0);break;case"textarea":_l(o),Sg(o);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(o.onclick=Kc)}o=s,t.updateQueue=o,o!==null&&(t.flags|=4)}else{l=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Zv(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof o.is=="string"?e=l.createElement(r,{is:o.is}):(e=l.createElement(r),r==="select"&&(l=e,o.multiple?l.multiple=!0:o.size&&(l.size=o.size))):e=l.createElementNS(e,r),e[Gr]=t,e[Pa]=o,j2(e,t,!1,!1),t.stateNode=e;e:{switch(l=df(r,o),r){case"dialog":We("cancel",e),We("close",e),s=o;break;case"iframe":case"object":case"embed":We("load",e),s=o;break;case"video":case"audio":for(s=0;s<ia.length;s++)We(ia[s],e);s=o;break;case"source":We("error",e),s=o;break;case"img":case"image":case"link":We("error",e),We("load",e),s=o;break;case"details":We("toggle",e),s=o;break;case"input":wg(e,o),s=nf(e,o),We("invalid",e);break;case"option":s=o;break;case"select":e._wrapperState={wasMultiple:!!o.multiple},s=ot({},o,{value:void 0}),We("invalid",e);break;case"textarea":jg(e,o),s=af(e,o),We("invalid",e);break;default:s=o}cf(r,s),c=s;for(a in c)if(c.hasOwnProperty(a)){var u=c[a];a==="style"?rb(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&eb(e,u)):a==="children"?typeof u=="string"?(r!=="textarea"||u!=="")&&ja(e,u):typeof u=="number"&&ja(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(ka.hasOwnProperty(a)?u!=null&&a==="onScroll"&&We("scroll",e):u!=null&&Lh(e,a,u,l))}switch(r){case"input":_l(e),kg(e,o,!1);break;case"textarea":_l(e),Sg(e);break;case"option":o.value!=null&&e.setAttribute("value",""+lo(o.value));break;case"select":e.multiple=!!o.multiple,a=o.value,a!=null?Ri(e,!!o.multiple,a,!1):o.defaultValue!=null&&Ri(e,!!o.multiple,o.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Kc)}switch(r){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}}o&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Pt(t),null;case 6:if(e&&t.stateNode!=null)C2(e,t,e.memoizedProps,o);else{if(typeof o!="string"&&t.stateNode===null)throw Error(se(166));if(r=To(Oa.current),To(Zr.current),Ll(t)){if(o=t.stateNode,r=t.memoizedProps,o[Gr]=t,(a=o.nodeValue!==r)&&(e=lr,e!==null))switch(e.tag){case 3:Il(o.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Il(o.nodeValue,r,(e.mode&1)!==0)}a&&(t.flags|=4)}else o=(r.nodeType===9?r:r.ownerDocument).createTextNode(o),o[Gr]=t,t.stateNode=o}return Pt(t),null;case 13:if(Qe(tt),o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ze&&ar!==null&&t.mode&1&&!(t.flags&128))qb(),Gi(),t.flags|=98560,a=!1;else if(a=Ll(t),o!==null&&o.dehydrated!==null){if(e===null){if(!a)throw Error(se(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(se(317));a[Gr]=t}else Gi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pt(t),a=!1}else Mr!==null&&(Hf(Mr),Mr=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(o=o!==null,o!==(e!==null&&e.memoizedState!==null)&&o&&(t.child.flags|=8192,t.mode&1&&(e===null||tt.current&1?vt===0&&(vt=3):vx())),t.updateQueue!==null&&(t.flags|=4),Pt(t),null);case 4:return Ji(),If(e,t),e===null&&$a(t.stateNode.containerInfo),Pt(t),null;case 10:return rx(t.type._context),Pt(t),null;case 17:return Zt(t.type)&&Qc(),Pt(t),null;case 19:if(Qe(tt),a=t.memoizedState,a===null)return Pt(t),null;if(o=(t.flags&128)!==0,l=a.rendering,l===null)if(o)Os(a,!1);else{if(vt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=rd(e),l!==null){for(t.flags|=128,Os(a,!1),o=l.updateQueue,o!==null&&(t.updateQueue=o,t.flags|=4),t.subtreeFlags=0,o=r,r=t.child;r!==null;)a=r,e=o,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Ve(tt,tt.current&1|2),t.child}e=e.sibling}a.tail!==null&&ct()>es&&(t.flags|=128,o=!0,Os(a,!1),t.lanes=4194304)}else{if(!o)if(e=rd(l),e!==null){if(t.flags|=128,o=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Os(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!Ze)return Pt(t),null}else 2*ct()-a.renderingStartTime>es&&r!==1073741824&&(t.flags|=128,o=!0,Os(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(r=a.last,r!==null?r.sibling=l:t.child=l,a.last=l)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ct(),t.sibling=null,r=tt.current,Ve(tt,o?r&1|2:r&1),t):(Pt(t),null);case 22:case 23:return yx(),o=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==o&&(t.flags|=8192),o&&t.mode&1?ir&1073741824&&(Pt(t),t.subtreeFlags&6&&(t.flags|=8192)):Pt(t),null;case 24:return null;case 25:return null}throw Error(se(156,t.tag))}function E4(e,t){switch(Jh(t),t.tag){case 1:return Zt(t.type)&&Qc(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ji(),Qe(Jt),Qe(Bt),ax(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return sx(t),null;case 13:if(Qe(tt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(se(340));Gi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Qe(tt),null;case 4:return Ji(),null;case 10:return rx(t.type._context),null;case 22:case 23:return yx(),null;case 24:return null;default:return null}}var Fl=!1,Lt=!1,_4=typeof WeakSet=="function"?WeakSet:Set,ge=null;function zi(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(o){at(e,t,o)}else r.current=null}function Lf(e,t,r){try{r()}catch(o){at(e,t,o)}}var fm=!1;function T4(e,t){if(bf=Vc,e=$b(),Gh(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var o=r.getSelection&&r.getSelection();if(o&&o.rangeCount!==0){r=o.anchorNode;var s=o.anchorOffset,a=o.focusNode;o=o.focusOffset;try{r.nodeType,a.nodeType}catch{r=null;break e}var l=0,c=-1,u=-1,p=0,x=0,h=e,m=null;t:for(;;){for(var k;h!==r||s!==0&&h.nodeType!==3||(c=l+s),h!==a||o!==0&&h.nodeType!==3||(u=l+o),h.nodeType===3&&(l+=h.nodeValue.length),(k=h.firstChild)!==null;)m=h,h=k;for(;;){if(h===e)break t;if(m===r&&++p===s&&(c=l),m===a&&++x===o&&(u=l),(k=h.nextSibling)!==null)break;h=m,m=h.parentNode}h=k}r=c===-1||u===-1?null:{start:c,end:u}}else r=null}r=r||{start:0,end:0}}else r=null;for(wf={focusedElem:e,selectionRange:r},Vc=!1,ge=t;ge!==null;)if(t=ge,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ge=e;else for(;ge!==null;){t=ge;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var j=w.memoizedProps,C=w.memoizedState,y=t.stateNode,v=y.getSnapshotBeforeUpdate(t.elementType===t.type?j:_r(t.type,j),C);y.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var b=t.stateNode.containerInfo;b.nodeType===1?b.textContent="":b.nodeType===9&&b.documentElement&&b.removeChild(b.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(g){at(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,ge=e;break}ge=t.return}return w=fm,fm=!1,w}function ga(e,t,r){var o=t.updateQueue;if(o=o!==null?o.lastEffect:null,o!==null){var s=o=o.next;do{if((s.tag&e)===e){var a=s.destroy;s.destroy=void 0,a!==void 0&&Lf(t,r,a)}s=s.next}while(s!==o)}}function Td(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var o=r.create;r.destroy=o()}r=r.next}while(r!==t)}}function Df(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function z2(e){var t=e.alternate;t!==null&&(e.alternate=null,z2(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Gr],delete t[Pa],delete t[Sf],delete t[u4],delete t[p4])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function E2(e){return e.tag===5||e.tag===3||e.tag===4}function hm(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||E2(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Bf(e,t,r){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Kc));else if(o!==4&&(e=e.child,e!==null))for(Bf(e,t,r),e=e.sibling;e!==null;)Bf(e,t,r),e=e.sibling}function Ff(e,t,r){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(o!==4&&(e=e.child,e!==null))for(Ff(e,t,r),e=e.sibling;e!==null;)Ff(e,t,r),e=e.sibling}var zt=null,Rr=!1;function Tn(e,t,r){for(r=r.child;r!==null;)_2(e,t,r),r=r.sibling}function _2(e,t,r){if(Jr&&typeof Jr.onCommitFiberUnmount=="function")try{Jr.onCommitFiberUnmount(wd,r)}catch{}switch(r.tag){case 5:Lt||zi(r,t);case 6:var o=zt,s=Rr;zt=null,Tn(e,t,r),zt=o,Rr=s,zt!==null&&(Rr?(e=zt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):zt.removeChild(r.stateNode));break;case 18:zt!==null&&(Rr?(e=zt,r=r.stateNode,e.nodeType===8?_u(e.parentNode,r):e.nodeType===1&&_u(e,r),Ea(e)):_u(zt,r.stateNode));break;case 4:o=zt,s=Rr,zt=r.stateNode.containerInfo,Rr=!0,Tn(e,t,r),zt=o,Rr=s;break;case 0:case 11:case 14:case 15:if(!Lt&&(o=r.updateQueue,o!==null&&(o=o.lastEffect,o!==null))){s=o=o.next;do{var a=s,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&Lf(r,t,l),s=s.next}while(s!==o)}Tn(e,t,r);break;case 1:if(!Lt&&(zi(r,t),o=r.stateNode,typeof o.componentWillUnmount=="function"))try{o.props=r.memoizedProps,o.state=r.memoizedState,o.componentWillUnmount()}catch(c){at(r,t,c)}Tn(e,t,r);break;case 21:Tn(e,t,r);break;case 22:r.mode&1?(Lt=(o=Lt)||r.memoizedState!==null,Tn(e,t,r),Lt=o):Tn(e,t,r);break;default:Tn(e,t,r)}}function xm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new _4),t.forEach(function(o){var s=D4.bind(null,e,o);r.has(o)||(r.add(o),o.then(s,s))})}}function Er(e,t){var r=t.deletions;if(r!==null)for(var o=0;o<r.length;o++){var s=r[o];try{var a=e,l=t,c=l;e:for(;c!==null;){switch(c.tag){case 5:zt=c.stateNode,Rr=!1;break e;case 3:zt=c.stateNode.containerInfo,Rr=!0;break e;case 4:zt=c.stateNode.containerInfo,Rr=!0;break e}c=c.return}if(zt===null)throw Error(se(160));_2(a,l,s),zt=null,Rr=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(p){at(s,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)T2(t,e),t=t.sibling}function T2(e,t){var r=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Er(t,e),Hr(e),o&4){try{ga(3,e,e.return),Td(3,e)}catch(j){at(e,e.return,j)}try{ga(5,e,e.return)}catch(j){at(e,e.return,j)}}break;case 1:Er(t,e),Hr(e),o&512&&r!==null&&zi(r,r.return);break;case 5:if(Er(t,e),Hr(e),o&512&&r!==null&&zi(r,r.return),e.flags&32){var s=e.stateNode;try{ja(s,"")}catch(j){at(e,e.return,j)}}if(o&4&&(s=e.stateNode,s!=null)){var a=e.memoizedProps,l=r!==null?r.memoizedProps:a,c=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{c==="input"&&a.type==="radio"&&a.name!=null&&Xv(s,a),df(c,l);var p=df(c,a);for(l=0;l<u.length;l+=2){var x=u[l],h=u[l+1];x==="style"?rb(s,h):x==="dangerouslySetInnerHTML"?eb(s,h):x==="children"?ja(s,h):Lh(s,x,h,p)}switch(c){case"input":of(s,a);break;case"textarea":Jv(s,a);break;case"select":var m=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!a.multiple;var k=a.value;k!=null?Ri(s,!!a.multiple,k,!1):m!==!!a.multiple&&(a.defaultValue!=null?Ri(s,!!a.multiple,a.defaultValue,!0):Ri(s,!!a.multiple,a.multiple?[]:"",!1))}s[Pa]=a}catch(j){at(e,e.return,j)}}break;case 6:if(Er(t,e),Hr(e),o&4){if(e.stateNode===null)throw Error(se(162));s=e.stateNode,a=e.memoizedProps;try{s.nodeValue=a}catch(j){at(e,e.return,j)}}break;case 3:if(Er(t,e),Hr(e),o&4&&r!==null&&r.memoizedState.isDehydrated)try{Ea(t.containerInfo)}catch(j){at(e,e.return,j)}break;case 4:Er(t,e),Hr(e);break;case 13:Er(t,e),Hr(e),s=e.child,s.flags&8192&&(a=s.memoizedState!==null,s.stateNode.isHidden=a,!a||s.alternate!==null&&s.alternate.memoizedState!==null||(gx=ct())),o&4&&xm(e);break;case 22:if(x=r!==null&&r.memoizedState!==null,e.mode&1?(Lt=(p=Lt)||x,Er(t,e),Lt=p):Er(t,e),Hr(e),o&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!x&&e.mode&1)for(ge=e,x=e.child;x!==null;){for(h=ge=x;ge!==null;){switch(m=ge,k=m.child,m.tag){case 0:case 11:case 14:case 15:ga(4,m,m.return);break;case 1:zi(m,m.return);var w=m.stateNode;if(typeof w.componentWillUnmount=="function"){o=m,r=m.return;try{t=o,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(j){at(o,r,j)}}break;case 5:zi(m,m.return);break;case 22:if(m.memoizedState!==null){mm(h);continue}}k!==null?(k.return=m,ge=k):mm(h)}x=x.sibling}e:for(x=null,h=e;;){if(h.tag===5){if(x===null){x=h;try{s=h.stateNode,p?(a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(c=h.stateNode,u=h.memoizedProps.style,l=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=tb("display",l))}catch(j){at(e,e.return,j)}}}else if(h.tag===6){if(x===null)try{h.stateNode.nodeValue=p?"":h.memoizedProps}catch(j){at(e,e.return,j)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;x===h&&(x=null),h=h.return}x===h&&(x=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Er(t,e),Hr(e),o&4&&xm(e);break;case 21:break;default:Er(t,e),Hr(e)}}function Hr(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(E2(r)){var o=r;break e}r=r.return}throw Error(se(160))}switch(o.tag){case 5:var s=o.stateNode;o.flags&32&&(ja(s,""),o.flags&=-33);var a=hm(e);Ff(e,a,s);break;case 3:case 4:var l=o.stateNode.containerInfo,c=hm(e);Bf(e,c,l);break;default:throw Error(se(161))}}catch(u){at(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $4(e,t,r){ge=e,$2(e)}function $2(e,t,r){for(var o=(e.mode&1)!==0;ge!==null;){var s=ge,a=s.child;if(s.tag===22&&o){var l=s.memoizedState!==null||Fl;if(!l){var c=s.alternate,u=c!==null&&c.memoizedState!==null||Lt;c=Fl;var p=Lt;if(Fl=l,(Lt=u)&&!p)for(ge=s;ge!==null;)l=ge,u=l.child,l.tag===22&&l.memoizedState!==null?ym(s):u!==null?(u.return=l,ge=u):ym(s);for(;a!==null;)ge=a,$2(a),a=a.sibling;ge=s,Fl=c,Lt=p}gm(e)}else s.subtreeFlags&8772&&a!==null?(a.return=s,ge=a):gm(e)}}function gm(e){for(;ge!==null;){var t=ge;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Lt||Td(5,t);break;case 1:var o=t.stateNode;if(t.flags&4&&!Lt)if(r===null)o.componentDidMount();else{var s=t.elementType===t.type?r.memoizedProps:_r(t.type,r.memoizedProps);o.componentDidUpdate(s,r.memoizedState,o.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&em(t,a,o);break;case 3:var l=t.updateQueue;if(l!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}em(t,l,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&r.focus();break;case"img":u.src&&(r.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var x=p.memoizedState;if(x!==null){var h=x.dehydrated;h!==null&&Ea(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}Lt||t.flags&512&&Df(t)}catch(m){at(t,t.return,m)}}if(t===e){ge=null;break}if(r=t.sibling,r!==null){r.return=t.return,ge=r;break}ge=t.return}}function mm(e){for(;ge!==null;){var t=ge;if(t===e){ge=null;break}var r=t.sibling;if(r!==null){r.return=t.return,ge=r;break}ge=t.return}}function ym(e){for(;ge!==null;){var t=ge;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Td(4,t)}catch(u){at(t,r,u)}break;case 1:var o=t.stateNode;if(typeof o.componentDidMount=="function"){var s=t.return;try{o.componentDidMount()}catch(u){at(t,s,u)}}var a=t.return;try{Df(t)}catch(u){at(t,a,u)}break;case 5:var l=t.return;try{Df(t)}catch(u){at(t,l,u)}}}catch(u){at(t,t.return,u)}if(t===e){ge=null;break}var c=t.sibling;if(c!==null){c.return=t.return,ge=c;break}ge=t.return}}var R4=Math.ceil,id=Cn.ReactCurrentDispatcher,hx=Cn.ReactCurrentOwner,jr=Cn.ReactCurrentBatchConfig,Ie=0,Ct=null,xt=null,_t=0,ir=0,Ei=ho(0),vt=0,Da=null,Qo=0,$d=0,xx=0,ma=null,Qt=null,gx=0,es=1/0,an=null,sd=!1,Nf=null,ro=null,Nl=!1,Qn=null,ad=0,ya=0,Uf=null,jc=-1,Sc=0;function qt(){return Ie&6?ct():jc!==-1?jc:jc=ct()}function no(e){return e.mode&1?Ie&2&&_t!==0?_t&-_t:h4.transition!==null?(Sc===0&&(Sc=hb()),Sc):(e=Ue,e!==0||(e=window.event,e=e===void 0?16:wb(e.type)),e):1}function Ir(e,t,r,o){if(50<ya)throw ya=0,Uf=null,Error(se(185));Xa(e,r,o),(!(Ie&2)||e!==Ct)&&(e===Ct&&(!(Ie&2)&&($d|=r),vt===4&&Bn(e,_t)),er(e,o),r===1&&Ie===0&&!(t.mode&1)&&(es=ct()+500,zd&&xo()))}function er(e,t){var r=e.callbackNode;hS(e,t);var o=Hc(e,e===Ct?_t:0);if(o===0)r!==null&&Eg(r),e.callbackNode=null,e.callbackPriority=0;else if(t=o&-o,e.callbackPriority!==t){if(r!=null&&Eg(r),t===1)e.tag===0?f4(vm.bind(null,e)):Fb(vm.bind(null,e)),c4(function(){!(Ie&6)&&xo()}),r=null;else{switch(xb(o)){case 1:r=Uh;break;case 4:r=pb;break;case 16:r=qc;break;case 536870912:r=fb;break;default:r=qc}r=D2(r,R2.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function R2(e,t){if(jc=-1,Sc=0,Ie&6)throw Error(se(327));var r=e.callbackNode;if(Ii()&&e.callbackNode!==r)return null;var o=Hc(e,e===Ct?_t:0);if(o===0)return null;if(o&30||o&e.expiredLanes||t)t=ld(e,o);else{t=o;var s=Ie;Ie|=2;var a=M2();(Ct!==e||_t!==t)&&(an=null,es=ct()+500,Bo(e,t));do try{O4();break}catch(c){P2(e,c)}while(!0);tx(),id.current=a,Ie=s,xt!==null?t=0:(Ct=null,_t=0,t=vt)}if(t!==0){if(t===2&&(s=xf(e),s!==0&&(o=s,t=qf(e,s))),t===1)throw r=Da,Bo(e,0),Bn(e,o),er(e,ct()),r;if(t===6)Bn(e,o);else{if(s=e.current.alternate,!(o&30)&&!P4(s)&&(t=ld(e,o),t===2&&(a=xf(e),a!==0&&(o=a,t=qf(e,a))),t===1))throw r=Da,Bo(e,0),Bn(e,o),er(e,ct()),r;switch(e.finishedWork=s,e.finishedLanes=o,t){case 0:case 1:throw Error(se(345));case 2:Co(e,Qt,an);break;case 3:if(Bn(e,o),(o&130023424)===o&&(t=gx+500-ct(),10<t)){if(Hc(e,0)!==0)break;if(s=e.suspendedLanes,(s&o)!==o){qt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=jf(Co.bind(null,e,Qt,an),t);break}Co(e,Qt,an);break;case 4:if(Bn(e,o),(o&4194240)===o)break;for(t=e.eventTimes,s=-1;0<o;){var l=31-Ar(o);a=1<<l,l=t[l],l>s&&(s=l),o&=~a}if(o=s,o=ct()-o,o=(120>o?120:480>o?480:1080>o?1080:1920>o?1920:3e3>o?3e3:4320>o?4320:1960*R4(o/1960))-o,10<o){e.timeoutHandle=jf(Co.bind(null,e,Qt,an),o);break}Co(e,Qt,an);break;case 5:Co(e,Qt,an);break;default:throw Error(se(329))}}}return er(e,ct()),e.callbackNode===r?R2.bind(null,e):null}function qf(e,t){var r=ma;return e.current.memoizedState.isDehydrated&&(Bo(e,t).flags|=256),e=ld(e,t),e!==2&&(t=Qt,Qt=r,t!==null&&Hf(t)),e}function Hf(e){Qt===null?Qt=e:Qt.push.apply(Qt,e)}function P4(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var o=0;o<r.length;o++){var s=r[o],a=s.getSnapshot;s=s.value;try{if(!Br(a(),s))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Bn(e,t){for(t&=~xx,t&=~$d,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Ar(t),o=1<<r;e[r]=-1,t&=~o}}function vm(e){if(Ie&6)throw Error(se(327));Ii();var t=Hc(e,0);if(!(t&1))return er(e,ct()),null;var r=ld(e,t);if(e.tag!==0&&r===2){var o=xf(e);o!==0&&(t=o,r=qf(e,o))}if(r===1)throw r=Da,Bo(e,0),Bn(e,t),er(e,ct()),r;if(r===6)throw Error(se(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Co(e,Qt,an),er(e,ct()),null}function mx(e,t){var r=Ie;Ie|=1;try{return e(t)}finally{Ie=r,Ie===0&&(es=ct()+500,zd&&xo())}}function Go(e){Qn!==null&&Qn.tag===0&&!(Ie&6)&&Ii();var t=Ie;Ie|=1;var r=jr.transition,o=Ue;try{if(jr.transition=null,Ue=1,e)return e()}finally{Ue=o,jr.transition=r,Ie=t,!(Ie&6)&&xo()}}function yx(){ir=Ei.current,Qe(Ei)}function Bo(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,l4(r)),xt!==null)for(r=xt.return;r!==null;){var o=r;switch(Jh(o),o.tag){case 1:o=o.type.childContextTypes,o!=null&&Qc();break;case 3:Ji(),Qe(Jt),Qe(Bt),ax();break;case 5:sx(o);break;case 4:Ji();break;case 13:Qe(tt);break;case 19:Qe(tt);break;case 10:rx(o.type._context);break;case 22:case 23:yx()}r=r.return}if(Ct=e,xt=e=oo(e.current,null),_t=ir=t,vt=0,Da=null,xx=$d=Qo=0,Qt=ma=null,_o!==null){for(t=0;t<_o.length;t++)if(r=_o[t],o=r.interleaved,o!==null){r.interleaved=null;var s=o.next,a=r.pending;if(a!==null){var l=a.next;a.next=s,o.next=l}r.pending=o}_o=null}return e}function P2(e,t){do{var r=xt;try{if(tx(),bc.current=od,nd){for(var o=rt.memoizedState;o!==null;){var s=o.queue;s!==null&&(s.pending=null),o=o.next}nd=!1}if(Ko=0,jt=yt=rt=null,xa=!1,Aa=0,hx.current=null,r===null||r.return===null){vt=1,Da=t,xt=null;break}e:{var a=e,l=r.return,c=r,u=t;if(t=_t,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var p=u,x=c,h=x.tag;if(!(x.mode&1)&&(h===0||h===11||h===15)){var m=x.alternate;m?(x.updateQueue=m.updateQueue,x.memoizedState=m.memoizedState,x.lanes=m.lanes):(x.updateQueue=null,x.memoizedState=null)}var k=sm(l);if(k!==null){k.flags&=-257,am(k,l,c,a,t),k.mode&1&&im(a,p,t),t=k,u=p;var w=t.updateQueue;if(w===null){var j=new Set;j.add(u),t.updateQueue=j}else w.add(u);break e}else{if(!(t&1)){im(a,p,t),vx();break e}u=Error(se(426))}}else if(Ze&&c.mode&1){var C=sm(l);if(C!==null){!(C.flags&65536)&&(C.flags|=256),am(C,l,c,a,t),Zh(Zi(u,c));break e}}a=u=Zi(u,c),vt!==4&&(vt=2),ma===null?ma=[a]:ma.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var y=x2(a,u,t);Zg(a,y);break e;case 1:c=u;var v=a.type,b=a.stateNode;if(!(a.flags&128)&&(typeof v.getDerivedStateFromError=="function"||b!==null&&typeof b.componentDidCatch=="function"&&(ro===null||!ro.has(b)))){a.flags|=65536,t&=-t,a.lanes|=t;var g=g2(a,c,t);Zg(a,g);break e}}a=a.return}while(a!==null)}A2(r)}catch(T){t=T,xt===r&&r!==null&&(xt=r=r.return);continue}break}while(!0)}function M2(){var e=id.current;return id.current=od,e===null?od:e}function vx(){(vt===0||vt===3||vt===2)&&(vt=4),Ct===null||!(Qo&268435455)&&!($d&268435455)||Bn(Ct,_t)}function ld(e,t){var r=Ie;Ie|=2;var o=M2();(Ct!==e||_t!==t)&&(an=null,Bo(e,t));do try{M4();break}catch(s){P2(e,s)}while(!0);if(tx(),Ie=r,id.current=o,xt!==null)throw Error(se(261));return Ct=null,_t=0,vt}function M4(){for(;xt!==null;)O2(xt)}function O4(){for(;xt!==null&&!iS();)O2(xt)}function O2(e){var t=L2(e.alternate,e,ir);e.memoizedProps=e.pendingProps,t===null?A2(e):xt=t,hx.current=null}function A2(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=E4(r,t),r!==null){r.flags&=32767,xt=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{vt=6,xt=null;return}}else if(r=z4(r,t,ir),r!==null){xt=r;return}if(t=t.sibling,t!==null){xt=t;return}xt=t=e}while(t!==null);vt===0&&(vt=5)}function Co(e,t,r){var o=Ue,s=jr.transition;try{jr.transition=null,Ue=1,A4(e,t,r,o)}finally{jr.transition=s,Ue=o}return null}function A4(e,t,r,o){do Ii();while(Qn!==null);if(Ie&6)throw Error(se(327));r=e.finishedWork;var s=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(se(177));e.callbackNode=null,e.callbackPriority=0;var a=r.lanes|r.childLanes;if(xS(e,a),e===Ct&&(xt=Ct=null,_t=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Nl||(Nl=!0,D2(qc,function(){return Ii(),null})),a=(r.flags&15990)!==0,r.subtreeFlags&15990||a){a=jr.transition,jr.transition=null;var l=Ue;Ue=1;var c=Ie;Ie|=4,hx.current=null,T4(e,r),T2(r,e),t4(wf),Vc=!!bf,wf=bf=null,e.current=r,$4(r),sS(),Ie=c,Ue=l,jr.transition=a}else e.current=r;if(Nl&&(Nl=!1,Qn=e,ad=s),a=e.pendingLanes,a===0&&(ro=null),cS(r.stateNode),er(e,ct()),t!==null)for(o=e.onRecoverableError,r=0;r<t.length;r++)s=t[r],o(s.value,{componentStack:s.stack,digest:s.digest});if(sd)throw sd=!1,e=Nf,Nf=null,e;return ad&1&&e.tag!==0&&Ii(),a=e.pendingLanes,a&1?e===Uf?ya++:(ya=0,Uf=e):ya=0,xo(),null}function Ii(){if(Qn!==null){var e=xb(ad),t=jr.transition,r=Ue;try{if(jr.transition=null,Ue=16>e?16:e,Qn===null)var o=!1;else{if(e=Qn,Qn=null,ad=0,Ie&6)throw Error(se(331));var s=Ie;for(Ie|=4,ge=e.current;ge!==null;){var a=ge,l=a.child;if(ge.flags&16){var c=a.deletions;if(c!==null){for(var u=0;u<c.length;u++){var p=c[u];for(ge=p;ge!==null;){var x=ge;switch(x.tag){case 0:case 11:case 15:ga(8,x,a)}var h=x.child;if(h!==null)h.return=x,ge=h;else for(;ge!==null;){x=ge;var m=x.sibling,k=x.return;if(z2(x),x===p){ge=null;break}if(m!==null){m.return=k,ge=m;break}ge=k}}}var w=a.alternate;if(w!==null){var j=w.child;if(j!==null){w.child=null;do{var C=j.sibling;j.sibling=null,j=C}while(j!==null)}}ge=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,ge=l;else e:for(;ge!==null;){if(a=ge,a.flags&2048)switch(a.tag){case 0:case 11:case 15:ga(9,a,a.return)}var y=a.sibling;if(y!==null){y.return=a.return,ge=y;break e}ge=a.return}}var v=e.current;for(ge=v;ge!==null;){l=ge;var b=l.child;if(l.subtreeFlags&2064&&b!==null)b.return=l,ge=b;else e:for(l=v;ge!==null;){if(c=ge,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Td(9,c)}}catch(T){at(c,c.return,T)}if(c===l){ge=null;break e}var g=c.sibling;if(g!==null){g.return=c.return,ge=g;break e}ge=c.return}}if(Ie=s,xo(),Jr&&typeof Jr.onPostCommitFiberRoot=="function")try{Jr.onPostCommitFiberRoot(wd,e)}catch{}o=!0}return o}finally{Ue=r,jr.transition=t}}return!1}function bm(e,t,r){t=Zi(r,t),t=x2(e,t,1),e=to(e,t,1),t=qt(),e!==null&&(Xa(e,1,t),er(e,t))}function at(e,t,r){if(e.tag===3)bm(e,e,r);else for(;t!==null;){if(t.tag===3){bm(t,e,r);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ro===null||!ro.has(o))){e=Zi(r,e),e=g2(t,e,1),t=to(t,e,1),e=qt(),t!==null&&(Xa(t,1,e),er(t,e));break}}t=t.return}}function I4(e,t,r){var o=e.pingCache;o!==null&&o.delete(t),t=qt(),e.pingedLanes|=e.suspendedLanes&r,Ct===e&&(_t&r)===r&&(vt===4||vt===3&&(_t&130023424)===_t&&500>ct()-gx?Bo(e,0):xx|=r),er(e,t)}function I2(e,t){t===0&&(e.mode&1?(t=Rl,Rl<<=1,!(Rl&130023424)&&(Rl=4194304)):t=1);var r=qt();e=wn(e,t),e!==null&&(Xa(e,t,r),er(e,r))}function L4(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),I2(e,r)}function D4(e,t){var r=0;switch(e.tag){case 13:var o=e.stateNode,s=e.memoizedState;s!==null&&(r=s.retryLane);break;case 19:o=e.stateNode;break;default:throw Error(se(314))}o!==null&&o.delete(t),I2(e,r)}var L2;L2=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Jt.current)Gt=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Gt=!1,C4(e,t,r);Gt=!!(e.flags&131072)}else Gt=!1,Ze&&t.flags&1048576&&Nb(t,Jc,t.index);switch(t.lanes=0,t.tag){case 2:var o=t.type;kc(e,t),e=t.pendingProps;var s=Qi(t,Bt.current);Ai(t,r),s=cx(null,t,o,e,s,r);var a=dx();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Zt(o)?(a=!0,Gc(t)):a=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,ox(t),s.updater=_d,t.stateNode=s,s._reactInternals=t,$f(t,o,e,r),t=Mf(null,t,o,!0,a,r)):(t.tag=0,Ze&&a&&Xh(t),Ut(null,t,s,r),t=t.child),t;case 16:o=t.elementType;e:{switch(kc(e,t),e=t.pendingProps,s=o._init,o=s(o._payload),t.type=o,s=t.tag=F4(o),e=_r(o,e),s){case 0:t=Pf(null,t,o,e,r);break e;case 1:t=dm(null,t,o,e,r);break e;case 11:t=lm(null,t,o,e,r);break e;case 14:t=cm(null,t,o,_r(o.type,e),r);break e}throw Error(se(306,o,""))}return t;case 0:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:_r(o,s),Pf(e,t,o,s,r);case 1:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:_r(o,s),dm(e,t,o,s,r);case 3:e:{if(b2(t),e===null)throw Error(se(387));o=t.pendingProps,a=t.memoizedState,s=a.element,Wb(e,t),td(t,o,null,r);var l=t.memoizedState;if(o=l.element,a.isDehydrated)if(a={element:o,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){s=Zi(Error(se(423)),t),t=um(e,t,o,r,s);break e}else if(o!==s){s=Zi(Error(se(424)),t),t=um(e,t,o,r,s);break e}else for(ar=eo(t.stateNode.containerInfo.firstChild),lr=t,Ze=!0,Mr=null,r=Vb(t,null,o,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Gi(),o===s){t=kn(e,t,r);break e}Ut(e,t,o,r)}t=t.child}return t;case 5:return Kb(t),e===null&&Ef(t),o=t.type,s=t.pendingProps,a=e!==null?e.memoizedProps:null,l=s.children,kf(o,s)?l=null:a!==null&&kf(o,a)&&(t.flags|=32),v2(e,t),Ut(e,t,l,r),t.child;case 6:return e===null&&Ef(t),null;case 13:return w2(e,t,r);case 4:return ix(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Xi(t,null,o,r):Ut(e,t,o,r),t.child;case 11:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:_r(o,s),lm(e,t,o,s,r);case 7:return Ut(e,t,t.pendingProps,r),t.child;case 8:return Ut(e,t,t.pendingProps.children,r),t.child;case 12:return Ut(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(o=t.type._context,s=t.pendingProps,a=t.memoizedProps,l=s.value,Ve(Zc,o._currentValue),o._currentValue=l,a!==null)if(Br(a.value,l)){if(a.children===s.children&&!Jt.current){t=kn(e,t,r);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var c=a.dependencies;if(c!==null){l=a.child;for(var u=c.firstContext;u!==null;){if(u.context===o){if(a.tag===1){u=gn(-1,r&-r),u.tag=2;var p=a.updateQueue;if(p!==null){p=p.shared;var x=p.pending;x===null?u.next=u:(u.next=x.next,x.next=u),p.pending=u}}a.lanes|=r,u=a.alternate,u!==null&&(u.lanes|=r),_f(a.return,r,t),c.lanes|=r;break}u=u.next}}else if(a.tag===10)l=a.type===t.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(se(341));l.lanes|=r,c=l.alternate,c!==null&&(c.lanes|=r),_f(l,r,t),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===t){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}Ut(e,t,s.children,r),t=t.child}return t;case 9:return s=t.type,o=t.pendingProps.children,Ai(t,r),s=Sr(s),o=o(s),t.flags|=1,Ut(e,t,o,r),t.child;case 14:return o=t.type,s=_r(o,t.pendingProps),s=_r(o.type,s),cm(e,t,o,s,r);case 15:return m2(e,t,t.type,t.pendingProps,r);case 17:return o=t.type,s=t.pendingProps,s=t.elementType===o?s:_r(o,s),kc(e,t),t.tag=1,Zt(o)?(e=!0,Gc(t)):e=!1,Ai(t,r),h2(t,o,s),$f(t,o,s,r),Mf(null,t,o,!0,e,r);case 19:return k2(e,t,r);case 22:return y2(e,t,r)}throw Error(se(156,t.tag))};function D2(e,t){return ub(e,t)}function B4(e,t,r,o){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kr(e,t,r,o){return new B4(e,t,r,o)}function bx(e){return e=e.prototype,!(!e||!e.isReactComponent)}function F4(e){if(typeof e=="function")return bx(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Bh)return 11;if(e===Fh)return 14}return 2}function oo(e,t){var r=e.alternate;return r===null?(r=kr(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Cc(e,t,r,o,s,a){var l=2;if(o=e,typeof e=="function")bx(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case mi:return Fo(r.children,s,a,t);case Dh:l=8,s|=8;break;case Zp:return e=kr(12,r,t,s|2),e.elementType=Zp,e.lanes=a,e;case ef:return e=kr(13,r,t,s),e.elementType=ef,e.lanes=a,e;case tf:return e=kr(19,r,t,s),e.elementType=tf,e.lanes=a,e;case Kv:return Rd(r,s,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Yv:l=10;break e;case Wv:l=9;break e;case Bh:l=11;break e;case Fh:l=14;break e;case In:l=16,o=null;break e}throw Error(se(130,e==null?e:typeof e,""))}return t=kr(l,r,t,s),t.elementType=e,t.type=o,t.lanes=a,t}function Fo(e,t,r,o){return e=kr(7,e,o,t),e.lanes=r,e}function Rd(e,t,r,o){return e=kr(22,e,o,t),e.elementType=Kv,e.lanes=r,e.stateNode={isHidden:!1},e}function Iu(e,t,r){return e=kr(6,e,null,t),e.lanes=r,e}function Lu(e,t,r){return t=kr(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function N4(e,t,r,o,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mu(0),this.expirationTimes=mu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mu(0),this.identifierPrefix=o,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function wx(e,t,r,o,s,a,l,c,u){return e=new N4(e,t,r,c,u),t===1?(t=1,a===!0&&(t|=8)):t=0,a=kr(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:o,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},ox(a),e}function U4(e,t,r){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gi,key:o==null?null:""+o,children:e,containerInfo:t,implementation:r}}function B2(e){if(!e)return co;e=e._reactInternals;e:{if(ri(e)!==e||e.tag!==1)throw Error(se(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Zt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(se(171))}if(e.tag===1){var r=e.type;if(Zt(r))return Bb(e,r,t)}return t}function F2(e,t,r,o,s,a,l,c,u){return e=wx(r,o,!0,e,s,a,l,c,u),e.context=B2(null),r=e.current,o=qt(),s=no(r),a=gn(o,s),a.callback=t??null,to(r,a,s),e.current.lanes=s,Xa(e,s,o),er(e,o),e}function Pd(e,t,r,o){var s=t.current,a=qt(),l=no(s);return r=B2(r),t.context===null?t.context=r:t.pendingContext=r,t=gn(a,l),t.payload={element:e},o=o===void 0?null:o,o!==null&&(t.callback=o),e=to(s,t,l),e!==null&&(Ir(e,s,l,a),vc(e,s,l)),l}function cd(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function wm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function kx(e,t){wm(e,t),(e=e.alternate)&&wm(e,t)}function q4(){return null}var N2=typeof reportError=="function"?reportError:function(e){console.error(e)};function jx(e){this._internalRoot=e}Md.prototype.render=jx.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(se(409));Pd(e,t,null,null)};Md.prototype.unmount=jx.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Go(function(){Pd(null,e,null,null)}),t[bn]=null}};function Md(e){this._internalRoot=e}Md.prototype.unstable_scheduleHydration=function(e){if(e){var t=yb();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Dn.length&&t!==0&&t<Dn[r].priority;r++);Dn.splice(r,0,e),r===0&&bb(e)}};function Sx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Od(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function km(){}function H4(e,t,r,o,s){if(s){if(typeof o=="function"){var a=o;o=function(){var p=cd(l);a.call(p)}}var l=F2(t,o,e,0,null,!1,!1,"",km);return e._reactRootContainer=l,e[bn]=l.current,$a(e.nodeType===8?e.parentNode:e),Go(),l}for(;s=e.lastChild;)e.removeChild(s);if(typeof o=="function"){var c=o;o=function(){var p=cd(u);c.call(p)}}var u=wx(e,0,!1,null,null,!1,!1,"",km);return e._reactRootContainer=u,e[bn]=u.current,$a(e.nodeType===8?e.parentNode:e),Go(function(){Pd(t,u,r,o)}),u}function Ad(e,t,r,o,s){var a=r._reactRootContainer;if(a){var l=a;if(typeof s=="function"){var c=s;s=function(){var u=cd(l);c.call(u)}}Pd(t,l,e,s)}else l=H4(r,t,e,s,o);return cd(l)}gb=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=oa(t.pendingLanes);r!==0&&(qh(t,r|1),er(t,ct()),!(Ie&6)&&(es=ct()+500,xo()))}break;case 13:Go(function(){var o=wn(e,1);if(o!==null){var s=qt();Ir(o,e,1,s)}}),kx(e,1)}};Hh=function(e){if(e.tag===13){var t=wn(e,134217728);if(t!==null){var r=qt();Ir(t,e,134217728,r)}kx(e,134217728)}};mb=function(e){if(e.tag===13){var t=no(e),r=wn(e,t);if(r!==null){var o=qt();Ir(r,e,t,o)}kx(e,t)}};yb=function(){return Ue};vb=function(e,t){var r=Ue;try{return Ue=e,t()}finally{Ue=r}};pf=function(e,t,r){switch(t){case"input":if(of(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var o=r[t];if(o!==e&&o.form===e.form){var s=Cd(o);if(!s)throw Error(se(90));Gv(o),of(o,s)}}}break;case"textarea":Jv(e,r);break;case"select":t=r.value,t!=null&&Ri(e,!!r.multiple,t,!1)}};ib=mx;sb=Go;var V4={usingClientEntryPoint:!1,Events:[Za,wi,Cd,nb,ob,mx]},As={findFiberByHostInstance:Eo,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Y4={bundleType:As.bundleType,version:As.version,rendererPackageName:As.rendererPackageName,rendererConfig:As.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Cn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=cb(e),e===null?null:e.stateNode},findFiberByHostInstance:As.findFiberByHostInstance||q4,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ul=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ul.isDisabled&&Ul.supportsFiber)try{wd=Ul.inject(Y4),Jr=Ul}catch{}}dr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=V4;dr.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Sx(t))throw Error(se(200));return U4(e,t,null,r)};dr.createRoot=function(e,t){if(!Sx(e))throw Error(se(299));var r=!1,o="",s=N2;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=wx(e,1,!1,null,null,r,!1,o,s),e[bn]=t.current,$a(e.nodeType===8?e.parentNode:e),new jx(t)};dr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(se(188)):(e=Object.keys(e).join(","),Error(se(268,e)));return e=cb(t),e=e===null?null:e.stateNode,e};dr.flushSync=function(e){return Go(e)};dr.hydrate=function(e,t,r){if(!Od(t))throw Error(se(200));return Ad(null,e,t,!0,r)};dr.hydrateRoot=function(e,t,r){if(!Sx(e))throw Error(se(405));var o=r!=null&&r.hydratedSources||null,s=!1,a="",l=N2;if(r!=null&&(r.unstable_strictMode===!0&&(s=!0),r.identifierPrefix!==void 0&&(a=r.identifierPrefix),r.onRecoverableError!==void 0&&(l=r.onRecoverableError)),t=F2(t,null,e,1,r??null,s,!1,a,l),e[bn]=t.current,$a(e),o)for(e=0;e<o.length;e++)r=o[e],s=r._getVersion,s=s(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,s]:t.mutableSourceEagerHydrationData.push(r,s);return new Md(t)};dr.render=function(e,t,r){if(!Od(t))throw Error(se(200));return Ad(null,e,t,!1,r)};dr.unmountComponentAtNode=function(e){if(!Od(e))throw Error(se(40));return e._reactRootContainer?(Go(function(){Ad(null,null,e,!1,function(){e._reactRootContainer=null,e[bn]=null})}),!0):!1};dr.unstable_batchedUpdates=mx;dr.unstable_renderSubtreeIntoContainer=function(e,t,r,o){if(!Od(r))throw Error(se(200));if(e==null||e._reactInternals===void 0)throw Error(se(38));return Ad(e,t,r,!1,o)};dr.version="18.3.1-next-f1338f8080-20240426";function U2(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(U2)}catch(e){console.error(e)}}U2(),Uv.exports=dr;var W4=Uv.exports,jm=W4;Xp.createRoot=jm.createRoot,Xp.hydrateRoot=jm.hydrateRoot;var tl=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},K4={setTimeout:(e,t)=>setTimeout(e,t),clearTimeout:e=>clearTimeout(e),setInterval:(e,t)=>setInterval(e,t),clearInterval:e=>clearInterval(e)},Nn,_h,wv,Q4=(wv=class{constructor(){Te(this,Nn,K4);Te(this,_h,!1)}setTimeoutProvider(e){we(this,Nn,e)}setTimeout(e,t){return Y(this,Nn).setTimeout(e,t)}clearTimeout(e){Y(this,Nn).clearTimeout(e)}setInterval(e,t){return Y(this,Nn).setInterval(e,t)}clearInterval(e){Y(this,Nn).clearInterval(e)}},Nn=new WeakMap,_h=new WeakMap,wv),Vf=new Q4;function G4(e){setTimeout(e,0)}var Id=typeof window>"u"||"Deno"in globalThis;function yr(){}function X4(e,t){return typeof e=="function"?e(t):e}function J4(e){return typeof e=="number"&&e>=0&&e!==1/0}function Z4(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Yf(e,t){return typeof e=="function"?e(t):e}function eC(e,t){return typeof e=="function"?e(t):e}function Sm(e,t){const{type:r="all",exact:o,fetchStatus:s,predicate:a,queryKey:l,stale:c}=e;if(l){if(o){if(t.queryHash!==Cx(l,t.options))return!1}else if(!Ba(t.queryKey,l))return!1}if(r!=="all"){const u=t.isActive();if(r==="active"&&!u||r==="inactive"&&u)return!1}return!(typeof c=="boolean"&&t.isStale()!==c||s&&s!==t.state.fetchStatus||a&&!a(t))}function Cm(e,t){const{exact:r,status:o,predicate:s,mutationKey:a}=e;if(a){if(!t.options.mutationKey)return!1;if(r){if(Xo(t.options.mutationKey)!==Xo(a))return!1}else if(!Ba(t.options.mutationKey,a))return!1}return!(o&&t.state.status!==o||s&&!s(t))}function Cx(e,t){return((t==null?void 0:t.queryKeyHashFn)||Xo)(e)}function Xo(e){return JSON.stringify(e,(t,r)=>Wf(r)?Object.keys(r).sort().reduce((o,s)=>(o[s]=r[s],o),{}):r)}function Ba(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(t).every(r=>Ba(e[r],t[r])):!1}var tC=Object.prototype.hasOwnProperty;function q2(e,t,r=0){if(e===t)return e;if(r>500)return t;const o=zm(e)&&zm(t);if(!o&&!(Wf(e)&&Wf(t)))return t;const a=(o?e:Object.keys(e)).length,l=o?t:Object.keys(t),c=l.length,u=o?new Array(c):{};let p=0;for(let x=0;x<c;x++){const h=o?x:l[x],m=e[h],k=t[h];if(m===k){u[h]=m,(o?x<a:tC.call(e,h))&&p++;continue}if(m===null||k===null||typeof m!="object"||typeof k!="object"){u[h]=k;continue}const w=q2(m,k,r+1);u[h]=w,w===m&&p++}return a===c&&p===a?e:u}function rC(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(e[r]!==t[r])return!1;return!0}function zm(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function Wf(e){if(!Em(e))return!1;const t=e.constructor;if(t===void 0)return!0;const r=t.prototype;return!(!Em(r)||!r.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function Em(e){return Object.prototype.toString.call(e)==="[object Object]"}function nC(e){return new Promise(t=>{Vf.setTimeout(t,e)})}function oC(e,t,r){return typeof r.structuralSharing=="function"?r.structuralSharing(e,t):r.structuralSharing!==!1?q2(e,t):t}function iC(e,t,r=0){const o=[...e,t];return r&&o.length>r?o.slice(1):o}function sC(e,t,r=0){const o=[t,...e];return r&&o.length>r?o.slice(0,-1):o}var zx=Symbol();function H2(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===zx?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function aC(e,t){return typeof e=="function"?e(...t):!!e}function lC(e,t,r){let o=!1,s;return Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(s??(s=t()),o||(o=!0,s.aborted?r():s.addEventListener("abort",r,{once:!0})),s)}),e}var Mo,Un,Fi,kv,cC=(kv=class extends tl{constructor(){super();Te(this,Mo);Te(this,Un);Te(this,Fi);we(this,Fi,t=>{if(!Id&&window.addEventListener){const r=()=>t();return window.addEventListener("visibilitychange",r,!1),()=>{window.removeEventListener("visibilitychange",r)}}})}onSubscribe(){Y(this,Un)||this.setEventListener(Y(this,Fi))}onUnsubscribe(){var t;this.hasListeners()||((t=Y(this,Un))==null||t.call(this),we(this,Un,void 0))}setEventListener(t){var r;we(this,Fi,t),(r=Y(this,Un))==null||r.call(this),we(this,Un,t(o=>{typeof o=="boolean"?this.setFocused(o):this.onFocus()}))}setFocused(t){Y(this,Mo)!==t&&(we(this,Mo,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(r=>{r(t)})}isFocused(){var t;return typeof Y(this,Mo)=="boolean"?Y(this,Mo):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},Mo=new WeakMap,Un=new WeakMap,Fi=new WeakMap,kv),V2=new cC;function dC(){let e,t;const r=new Promise((s,a)=>{e=s,t=a});r.status="pending",r.catch(()=>{});function o(s){Object.assign(r,s),delete r.resolve,delete r.reject}return r.resolve=s=>{o({status:"fulfilled",value:s}),e(s)},r.reject=s=>{o({status:"rejected",reason:s}),t(s)},r}var uC=G4;function pC(){let e=[],t=0,r=c=>{c()},o=c=>{c()},s=uC;const a=c=>{t?e.push(c):s(()=>{r(c)})},l=()=>{const c=e;e=[],c.length&&s(()=>{o(()=>{c.forEach(u=>{r(u)})})})};return{batch:c=>{let u;t++;try{u=c()}finally{t--,t||l()}return u},batchCalls:c=>(...u)=>{a(()=>{c(...u)})},schedule:a,setNotifyFunction:c=>{r=c},setBatchNotifyFunction:c=>{o=c},setScheduler:c=>{s=c}}}var Et=pC(),Ni,qn,Ui,jv,fC=(jv=class extends tl{constructor(){super();Te(this,Ni,!0);Te(this,qn);Te(this,Ui);we(this,Ui,t=>{if(!Id&&window.addEventListener){const r=()=>t(!0),o=()=>t(!1);return window.addEventListener("online",r,!1),window.addEventListener("offline",o,!1),()=>{window.removeEventListener("online",r),window.removeEventListener("offline",o)}}})}onSubscribe(){Y(this,qn)||this.setEventListener(Y(this,Ui))}onUnsubscribe(){var t;this.hasListeners()||((t=Y(this,qn))==null||t.call(this),we(this,qn,void 0))}setEventListener(t){var r;we(this,Ui,t),(r=Y(this,qn))==null||r.call(this),we(this,qn,t(this.setOnline.bind(this)))}setOnline(t){Y(this,Ni)!==t&&(we(this,Ni,t),this.listeners.forEach(o=>{o(t)}))}isOnline(){return Y(this,Ni)}},Ni=new WeakMap,qn=new WeakMap,Ui=new WeakMap,jv),dd=new fC;function hC(e){return Math.min(1e3*2**e,3e4)}function Y2(e){return(e??"online")==="online"?dd.isOnline():!0}var Kf=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function W2(e){let t=!1,r=0,o;const s=dC(),a=()=>s.status!=="pending",l=j=>{var C;if(!a()){const y=new Kf(j);m(y),(C=e.onCancel)==null||C.call(e,y)}},c=()=>{t=!0},u=()=>{t=!1},p=()=>V2.isFocused()&&(e.networkMode==="always"||dd.isOnline())&&e.canRun(),x=()=>Y2(e.networkMode)&&e.canRun(),h=j=>{a()||(o==null||o(),s.resolve(j))},m=j=>{a()||(o==null||o(),s.reject(j))},k=()=>new Promise(j=>{var C;o=y=>{(a()||p())&&j(y)},(C=e.onPause)==null||C.call(e)}).then(()=>{var j;o=void 0,a()||(j=e.onContinue)==null||j.call(e)}),w=()=>{if(a())return;let j;const C=r===0?e.initialPromise:void 0;try{j=C??e.fn()}catch(y){j=Promise.reject(y)}Promise.resolve(j).then(h).catch(y=>{var A;if(a())return;const v=e.retry??(Id?0:3),b=e.retryDelay??hC,g=typeof b=="function"?b(r,y):b,T=v===!0||typeof v=="number"&&r<v||typeof v=="function"&&v(r,y);if(t||!T){m(y);return}r++,(A=e.onFail)==null||A.call(e,r,y),nC(g).then(()=>p()?void 0:k()).then(()=>{t?m(y):w()})})};return{promise:s,status:()=>s.status,cancel:l,continue:()=>(o==null||o(),s),cancelRetry:c,continueRetry:u,canStart:x,start:()=>(x()?w():k().then(w),s)}}var Oo,Sv,K2=(Sv=class{constructor(){Te(this,Oo)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),J4(this.gcTime)&&we(this,Oo,Vf.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Id?1/0:5*60*1e3))}clearGcTimeout(){Y(this,Oo)&&(Vf.clearTimeout(Y(this,Oo)),we(this,Oo,void 0))}},Oo=new WeakMap,Sv),Ao,qi,mr,Io,kt,Wa,Lo,Tr,sn,Cv,xC=(Cv=class extends K2{constructor(t){super();Te(this,Tr);Te(this,Ao);Te(this,qi);Te(this,mr);Te(this,Io);Te(this,kt);Te(this,Wa);Te(this,Lo);we(this,Lo,!1),we(this,Wa,t.defaultOptions),this.setOptions(t.options),this.observers=[],we(this,Io,t.client),we(this,mr,Y(this,Io).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,we(this,Ao,Tm(this.options)),this.state=t.state??Y(this,Ao),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=Y(this,kt))==null?void 0:t.promise}setOptions(t){if(this.options={...Y(this,Wa),...t},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const r=Tm(this.options);r.data!==void 0&&(this.setState(_m(r.data,r.dataUpdatedAt)),we(this,Ao,r))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&Y(this,mr).remove(this)}setData(t,r){const o=oC(this.state.data,t,this.options);return lt(this,Tr,sn).call(this,{data:o,type:"success",dataUpdatedAt:r==null?void 0:r.updatedAt,manual:r==null?void 0:r.manual}),o}setState(t,r){lt(this,Tr,sn).call(this,{type:"setState",state:t,setStateOptions:r})}cancel(t){var o,s;const r=(o=Y(this,kt))==null?void 0:o.promise;return(s=Y(this,kt))==null||s.cancel(t),r?r.then(yr).catch(yr):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(Y(this,Ao))}isActive(){return this.observers.some(t=>eC(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===zx||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(t=>Yf(t.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(t=0){return this.state.data===void 0?!0:t==="static"?!1:this.state.isInvalidated?!0:!Z4(this.state.dataUpdatedAt,t)}onFocus(){var r;const t=this.observers.find(o=>o.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(r=Y(this,kt))==null||r.continue()}onOnline(){var r;const t=this.observers.find(o=>o.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(r=Y(this,kt))==null||r.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),Y(this,mr).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(r=>r!==t),this.observers.length||(Y(this,kt)&&(Y(this,Lo)?Y(this,kt).cancel({revert:!0}):Y(this,kt).cancelRetry()),this.scheduleGc()),Y(this,mr).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||lt(this,Tr,sn).call(this,{type:"invalidate"})}async fetch(t,r){var u,p,x,h,m,k,w,j,C,y,v,b;if(this.state.fetchStatus!=="idle"&&((u=Y(this,kt))==null?void 0:u.status())!=="rejected"){if(this.state.data!==void 0&&(r!=null&&r.cancelRefetch))this.cancel({silent:!0});else if(Y(this,kt))return Y(this,kt).continueRetry(),Y(this,kt).promise}if(t&&this.setOptions(t),!this.options.queryFn){const g=this.observers.find(T=>T.options.queryFn);g&&this.setOptions(g.options)}const o=new AbortController,s=g=>{Object.defineProperty(g,"signal",{enumerable:!0,get:()=>(we(this,Lo,!0),o.signal)})},a=()=>{const g=H2(this.options,r),A=(()=>{const B={client:Y(this,Io),queryKey:this.queryKey,meta:this.meta};return s(B),B})();return we(this,Lo,!1),this.options.persister?this.options.persister(g,A,this):g(A)},c=(()=>{const g={fetchOptions:r,options:this.options,queryKey:this.queryKey,client:Y(this,Io),state:this.state,fetchFn:a};return s(g),g})();(p=this.options.behavior)==null||p.onFetch(c,this),we(this,qi,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((x=c.fetchOptions)==null?void 0:x.meta))&&lt(this,Tr,sn).call(this,{type:"fetch",meta:(h=c.fetchOptions)==null?void 0:h.meta}),we(this,kt,W2({initialPromise:r==null?void 0:r.initialPromise,fn:c.fetchFn,onCancel:g=>{g instanceof Kf&&g.revert&&this.setState({...Y(this,qi),fetchStatus:"idle"}),o.abort()},onFail:(g,T)=>{lt(this,Tr,sn).call(this,{type:"failed",failureCount:g,error:T})},onPause:()=>{lt(this,Tr,sn).call(this,{type:"pause"})},onContinue:()=>{lt(this,Tr,sn).call(this,{type:"continue"})},retry:c.options.retry,retryDelay:c.options.retryDelay,networkMode:c.options.networkMode,canRun:()=>!0}));try{const g=await Y(this,kt).start();if(g===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(g),(k=(m=Y(this,mr).config).onSuccess)==null||k.call(m,g,this),(j=(w=Y(this,mr).config).onSettled)==null||j.call(w,g,this.state.error,this),g}catch(g){if(g instanceof Kf){if(g.silent)return Y(this,kt).promise;if(g.revert){if(this.state.data===void 0)throw g;return this.state.data}}throw lt(this,Tr,sn).call(this,{type:"error",error:g}),(y=(C=Y(this,mr).config).onError)==null||y.call(C,g,this),(b=(v=Y(this,mr).config).onSettled)==null||b.call(v,this.state.data,g,this),g}finally{this.scheduleGc()}}},Ao=new WeakMap,qi=new WeakMap,mr=new WeakMap,Io=new WeakMap,kt=new WeakMap,Wa=new WeakMap,Lo=new WeakMap,Tr=new WeakSet,sn=function(t){const r=o=>{switch(t.type){case"failed":return{...o,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...o,fetchStatus:"paused"};case"continue":return{...o,fetchStatus:"fetching"};case"fetch":return{...o,...gC(o.data,this.options),fetchMeta:t.meta??null};case"success":const s={...o,..._m(t.data,t.dataUpdatedAt),dataUpdateCount:o.dataUpdateCount+1,...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return we(this,qi,t.manual?s:void 0),s;case"error":const a=t.error;return{...o,error:a,errorUpdateCount:o.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:o.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...o,isInvalidated:!0};case"setState":return{...o,...t.state}}};this.state=r(this.state),Et.batch(()=>{this.observers.forEach(o=>{o.onQueryUpdate()}),Y(this,mr).notify({query:this,type:"updated",action:t})})},Cv);function gC(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:Y2(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function _m(e,t){return{data:e,dataUpdatedAt:t??Date.now(),error:null,isInvalidated:!1,status:"success"}}function Tm(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,r=t!==void 0,o=r?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:r?o??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:r?"success":"pending",fetchStatus:"idle"}}function $m(e){return{onFetch:(t,r)=>{var x,h,m,k,w;const o=t.options,s=(m=(h=(x=t.fetchOptions)==null?void 0:x.meta)==null?void 0:h.fetchMore)==null?void 0:m.direction,a=((k=t.state.data)==null?void 0:k.pages)||[],l=((w=t.state.data)==null?void 0:w.pageParams)||[];let c={pages:[],pageParams:[]},u=0;const p=async()=>{let j=!1;const C=b=>{lC(b,()=>t.signal,()=>j=!0)},y=H2(t.options,t.fetchOptions),v=async(b,g,T)=>{if(j)return Promise.reject();if(g==null&&b.pages.length)return Promise.resolve(b);const B=(()=>{const U={client:t.client,queryKey:t.queryKey,pageParam:g,direction:T?"backward":"forward",meta:t.options.meta};return C(U),U})(),z=await y(B),{maxPages:H}=t.options,D=T?sC:iC;return{pages:D(b.pages,z,H),pageParams:D(b.pageParams,g,H)}};if(s&&a.length){const b=s==="backward",g=b?mC:Rm,T={pages:a,pageParams:l},A=g(o,T);c=await v(T,A,b)}else{const b=e??a.length;do{const g=u===0?l[0]??o.initialPageParam:Rm(o,c);if(u>0&&g==null)break;c=await v(c,g),u++}while(u<b)}return c};t.options.persister?t.fetchFn=()=>{var j,C;return(C=(j=t.options).persister)==null?void 0:C.call(j,p,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},r)}:t.fetchFn=p}}}function Rm(e,{pages:t,pageParams:r}){const o=t.length-1;return t.length>0?e.getNextPageParam(t[o],t,r[o],r):void 0}function mC(e,{pages:t,pageParams:r}){var o;return t.length>0?(o=e.getPreviousPageParam)==null?void 0:o.call(e,t[0],t,r[0],r):void 0}var Ka,Yr,It,Do,Wr,Pn,zv,yC=(zv=class extends K2{constructor(t){super();Te(this,Wr);Te(this,Ka);Te(this,Yr);Te(this,It);Te(this,Do);we(this,Ka,t.client),this.mutationId=t.mutationId,we(this,It,t.mutationCache),we(this,Yr,[]),this.state=t.state||Q2(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){Y(this,Yr).includes(t)||(Y(this,Yr).push(t),this.clearGcTimeout(),Y(this,It).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){we(this,Yr,Y(this,Yr).filter(r=>r!==t)),this.scheduleGc(),Y(this,It).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){Y(this,Yr).length||(this.state.status==="pending"?this.scheduleGc():Y(this,It).remove(this))}continue(){var t;return((t=Y(this,Do))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var l,c,u,p,x,h,m,k,w,j,C,y,v,b,g,T,A,B;const r=()=>{lt(this,Wr,Pn).call(this,{type:"continue"})},o={client:Y(this,Ka),meta:this.options.meta,mutationKey:this.options.mutationKey};we(this,Do,W2({fn:()=>this.options.mutationFn?this.options.mutationFn(t,o):Promise.reject(new Error("No mutationFn found")),onFail:(z,H)=>{lt(this,Wr,Pn).call(this,{type:"failed",failureCount:z,error:H})},onPause:()=>{lt(this,Wr,Pn).call(this,{type:"pause"})},onContinue:r,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>Y(this,It).canRun(this)}));const s=this.state.status==="pending",a=!Y(this,Do).canStart();try{if(s)r();else{lt(this,Wr,Pn).call(this,{type:"pending",variables:t,isPaused:a}),Y(this,It).config.onMutate&&await Y(this,It).config.onMutate(t,this,o);const H=await((c=(l=this.options).onMutate)==null?void 0:c.call(l,t,o));H!==this.state.context&&lt(this,Wr,Pn).call(this,{type:"pending",context:H,variables:t,isPaused:a})}const z=await Y(this,Do).start();return await((p=(u=Y(this,It).config).onSuccess)==null?void 0:p.call(u,z,t,this.state.context,this,o)),await((h=(x=this.options).onSuccess)==null?void 0:h.call(x,z,t,this.state.context,o)),await((k=(m=Y(this,It).config).onSettled)==null?void 0:k.call(m,z,null,this.state.variables,this.state.context,this,o)),await((j=(w=this.options).onSettled)==null?void 0:j.call(w,z,null,t,this.state.context,o)),lt(this,Wr,Pn).call(this,{type:"success",data:z}),z}catch(z){try{await((y=(C=Y(this,It).config).onError)==null?void 0:y.call(C,z,t,this.state.context,this,o))}catch(H){Promise.reject(H)}try{await((b=(v=this.options).onError)==null?void 0:b.call(v,z,t,this.state.context,o))}catch(H){Promise.reject(H)}try{await((T=(g=Y(this,It).config).onSettled)==null?void 0:T.call(g,void 0,z,this.state.variables,this.state.context,this,o))}catch(H){Promise.reject(H)}try{await((B=(A=this.options).onSettled)==null?void 0:B.call(A,void 0,z,t,this.state.context,o))}catch(H){Promise.reject(H)}throw lt(this,Wr,Pn).call(this,{type:"error",error:z}),z}finally{Y(this,It).runNext(this)}}},Ka=new WeakMap,Yr=new WeakMap,It=new WeakMap,Do=new WeakMap,Wr=new WeakSet,Pn=function(t){const r=o=>{switch(t.type){case"failed":return{...o,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...o,isPaused:!0};case"continue":return{...o,isPaused:!1};case"pending":return{...o,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...o,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...o,data:void 0,error:t.error,failureCount:o.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=r(this.state),Et.batch(()=>{Y(this,Yr).forEach(o=>{o.onMutationUpdate(t)}),Y(this,It).notify({mutation:this,type:"updated",action:t})})},zv);function Q2(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var un,$r,Qa,Ev,vC=(Ev=class extends tl{constructor(t={}){super();Te(this,un);Te(this,$r);Te(this,Qa);this.config=t,we(this,un,new Set),we(this,$r,new Map),we(this,Qa,0)}build(t,r,o){const s=new yC({client:t,mutationCache:this,mutationId:++Cl(this,Qa)._,options:t.defaultMutationOptions(r),state:o});return this.add(s),s}add(t){Y(this,un).add(t);const r=ql(t);if(typeof r=="string"){const o=Y(this,$r).get(r);o?o.push(t):Y(this,$r).set(r,[t])}this.notify({type:"added",mutation:t})}remove(t){if(Y(this,un).delete(t)){const r=ql(t);if(typeof r=="string"){const o=Y(this,$r).get(r);if(o)if(o.length>1){const s=o.indexOf(t);s!==-1&&o.splice(s,1)}else o[0]===t&&Y(this,$r).delete(r)}}this.notify({type:"removed",mutation:t})}canRun(t){const r=ql(t);if(typeof r=="string"){const o=Y(this,$r).get(r),s=o==null?void 0:o.find(a=>a.state.status==="pending");return!s||s===t}else return!0}runNext(t){var o;const r=ql(t);if(typeof r=="string"){const s=(o=Y(this,$r).get(r))==null?void 0:o.find(a=>a!==t&&a.state.isPaused);return(s==null?void 0:s.continue())??Promise.resolve()}else return Promise.resolve()}clear(){Et.batch(()=>{Y(this,un).forEach(t=>{this.notify({type:"removed",mutation:t})}),Y(this,un).clear(),Y(this,$r).clear()})}getAll(){return Array.from(Y(this,un))}find(t){const r={exact:!0,...t};return this.getAll().find(o=>Cm(r,o))}findAll(t={}){return this.getAll().filter(r=>Cm(t,r))}notify(t){Et.batch(()=>{this.listeners.forEach(r=>{r(t)})})}resumePausedMutations(){const t=this.getAll().filter(r=>r.state.isPaused);return Et.batch(()=>Promise.all(t.map(r=>r.continue().catch(yr))))}},un=new WeakMap,$r=new WeakMap,Qa=new WeakMap,Ev);function ql(e){var t;return(t=e.options.scope)==null?void 0:t.id}var pn,Hn,Kt,fn,yn,zc,Qf,_v,bC=(_v=class extends tl{constructor(r,o){super();Te(this,yn);Te(this,pn);Te(this,Hn);Te(this,Kt);Te(this,fn);we(this,pn,r),this.setOptions(o),this.bindMethods(),lt(this,yn,zc).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(r){var s;const o=this.options;this.options=Y(this,pn).defaultMutationOptions(r),rC(this.options,o)||Y(this,pn).getMutationCache().notify({type:"observerOptionsUpdated",mutation:Y(this,Kt),observer:this}),o!=null&&o.mutationKey&&this.options.mutationKey&&Xo(o.mutationKey)!==Xo(this.options.mutationKey)?this.reset():((s=Y(this,Kt))==null?void 0:s.state.status)==="pending"&&Y(this,Kt).setOptions(this.options)}onUnsubscribe(){var r;this.hasListeners()||(r=Y(this,Kt))==null||r.removeObserver(this)}onMutationUpdate(r){lt(this,yn,zc).call(this),lt(this,yn,Qf).call(this,r)}getCurrentResult(){return Y(this,Hn)}reset(){var r;(r=Y(this,Kt))==null||r.removeObserver(this),we(this,Kt,void 0),lt(this,yn,zc).call(this),lt(this,yn,Qf).call(this)}mutate(r,o){var s;return we(this,fn,o),(s=Y(this,Kt))==null||s.removeObserver(this),we(this,Kt,Y(this,pn).getMutationCache().build(Y(this,pn),this.options)),Y(this,Kt).addObserver(this),Y(this,Kt).execute(r)}},pn=new WeakMap,Hn=new WeakMap,Kt=new WeakMap,fn=new WeakMap,yn=new WeakSet,zc=function(){var o;const r=((o=Y(this,Kt))==null?void 0:o.state)??Q2();we(this,Hn,{...r,isPending:r.status==="pending",isSuccess:r.status==="success",isError:r.status==="error",isIdle:r.status==="idle",mutate:this.mutate,reset:this.reset})},Qf=function(r){Et.batch(()=>{var o,s,a,l,c,u,p,x;if(Y(this,fn)&&this.hasListeners()){const h=Y(this,Hn).variables,m=Y(this,Hn).context,k={client:Y(this,pn),meta:this.options.meta,mutationKey:this.options.mutationKey};if((r==null?void 0:r.type)==="success"){try{(s=(o=Y(this,fn)).onSuccess)==null||s.call(o,r.data,h,m,k)}catch(w){Promise.reject(w)}try{(l=(a=Y(this,fn)).onSettled)==null||l.call(a,r.data,null,h,m,k)}catch(w){Promise.reject(w)}}else if((r==null?void 0:r.type)==="error"){try{(u=(c=Y(this,fn)).onError)==null||u.call(c,r.error,h,m,k)}catch(w){Promise.reject(w)}try{(x=(p=Y(this,fn)).onSettled)==null||x.call(p,void 0,r.error,h,m,k)}catch(w){Promise.reject(w)}}}this.listeners.forEach(h=>{h(Y(this,Hn))})})},_v),Kr,Tv,wC=(Tv=class extends tl{constructor(t={}){super();Te(this,Kr);this.config=t,we(this,Kr,new Map)}build(t,r,o){const s=r.queryKey,a=r.queryHash??Cx(s,r);let l=this.get(a);return l||(l=new xC({client:t,queryKey:s,queryHash:a,options:t.defaultQueryOptions(r),state:o,defaultOptions:t.getQueryDefaults(s)}),this.add(l)),l}add(t){Y(this,Kr).has(t.queryHash)||(Y(this,Kr).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const r=Y(this,Kr).get(t.queryHash);r&&(t.destroy(),r===t&&Y(this,Kr).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){Et.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return Y(this,Kr).get(t)}getAll(){return[...Y(this,Kr).values()]}find(t){const r={exact:!0,...t};return this.getAll().find(o=>Sm(r,o))}findAll(t={}){const r=this.getAll();return Object.keys(t).length>0?r.filter(o=>Sm(t,o)):r}notify(t){Et.batch(()=>{this.listeners.forEach(r=>{r(t)})})}onFocus(){Et.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){Et.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},Kr=new WeakMap,Tv),st,Vn,Yn,Hi,Vi,Wn,Yi,Wi,$v,kC=($v=class{constructor(e={}){Te(this,st);Te(this,Vn);Te(this,Yn);Te(this,Hi);Te(this,Vi);Te(this,Wn);Te(this,Yi);Te(this,Wi);we(this,st,e.queryCache||new wC),we(this,Vn,e.mutationCache||new vC),we(this,Yn,e.defaultOptions||{}),we(this,Hi,new Map),we(this,Vi,new Map),we(this,Wn,0)}mount(){Cl(this,Wn)._++,Y(this,Wn)===1&&(we(this,Yi,V2.subscribe(async e=>{e&&(await this.resumePausedMutations(),Y(this,st).onFocus())})),we(this,Wi,dd.subscribe(async e=>{e&&(await this.resumePausedMutations(),Y(this,st).onOnline())})))}unmount(){var e,t;Cl(this,Wn)._--,Y(this,Wn)===0&&((e=Y(this,Yi))==null||e.call(this),we(this,Yi,void 0),(t=Y(this,Wi))==null||t.call(this),we(this,Wi,void 0))}isFetching(e){return Y(this,st).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return Y(this,Vn).findAll({...e,status:"pending"}).length}getQueryData(e){var r;const t=this.defaultQueryOptions({queryKey:e});return(r=Y(this,st).get(t.queryHash))==null?void 0:r.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),r=Y(this,st).build(this,t),o=r.state.data;return o===void 0?this.fetchQuery(e):(e.revalidateIfStale&&r.isStaleByTime(Yf(t.staleTime,r))&&this.prefetchQuery(t),Promise.resolve(o))}getQueriesData(e){return Y(this,st).findAll(e).map(({queryKey:t,state:r})=>{const o=r.data;return[t,o]})}setQueryData(e,t,r){const o=this.defaultQueryOptions({queryKey:e}),s=Y(this,st).get(o.queryHash),a=s==null?void 0:s.state.data,l=X4(t,a);if(l!==void 0)return Y(this,st).build(this,o).setData(l,{...r,manual:!0})}setQueriesData(e,t,r){return Et.batch(()=>Y(this,st).findAll(e).map(({queryKey:o})=>[o,this.setQueryData(o,t,r)]))}getQueryState(e){var r;const t=this.defaultQueryOptions({queryKey:e});return(r=Y(this,st).get(t.queryHash))==null?void 0:r.state}removeQueries(e){const t=Y(this,st);Et.batch(()=>{t.findAll(e).forEach(r=>{t.remove(r)})})}resetQueries(e,t){const r=Y(this,st);return Et.batch(()=>(r.findAll(e).forEach(o=>{o.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const r={revert:!0,...t},o=Et.batch(()=>Y(this,st).findAll(e).map(s=>s.cancel(r)));return Promise.all(o).then(yr).catch(yr)}invalidateQueries(e,t={}){return Et.batch(()=>(Y(this,st).findAll(e).forEach(r=>{r.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},t)))}refetchQueries(e,t={}){const r={...t,cancelRefetch:t.cancelRefetch??!0},o=Et.batch(()=>Y(this,st).findAll(e).filter(s=>!s.isDisabled()&&!s.isStatic()).map(s=>{let a=s.fetch(void 0,r);return r.throwOnError||(a=a.catch(yr)),s.state.fetchStatus==="paused"?Promise.resolve():a}));return Promise.all(o).then(yr)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const r=Y(this,st).build(this,t);return r.isStaleByTime(Yf(t.staleTime,r))?r.fetch(t):Promise.resolve(r.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(yr).catch(yr)}fetchInfiniteQuery(e){return e.behavior=$m(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(yr).catch(yr)}ensureInfiniteQueryData(e){return e.behavior=$m(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return dd.isOnline()?Y(this,Vn).resumePausedMutations():Promise.resolve()}getQueryCache(){return Y(this,st)}getMutationCache(){return Y(this,Vn)}getDefaultOptions(){return Y(this,Yn)}setDefaultOptions(e){we(this,Yn,e)}setQueryDefaults(e,t){Y(this,Hi).set(Xo(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...Y(this,Hi).values()],r={};return t.forEach(o=>{Ba(e,o.queryKey)&&Object.assign(r,o.defaultOptions)}),r}setMutationDefaults(e,t){Y(this,Vi).set(Xo(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...Y(this,Vi).values()],r={};return t.forEach(o=>{Ba(e,o.mutationKey)&&Object.assign(r,o.defaultOptions)}),r}defaultQueryOptions(e){if(e._defaulted)return e;const t={...Y(this,Yn).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Cx(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===zx&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...Y(this,Yn).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){Y(this,st).clear(),Y(this,Vn).clear()}},st=new WeakMap,Vn=new WeakMap,Yn=new WeakMap,Hi=new WeakMap,Vi=new WeakMap,Wn=new WeakMap,Yi=new WeakMap,Wi=new WeakMap,$v),G2=f.createContext(void 0),jC=e=>{const t=f.useContext(G2);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},SC=({client:e,children:t})=>(f.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),i.jsx(G2.Provider,{value:e,children:t}));function X2(e,t){const r=jC(),[o]=f.useState(()=>new bC(r,e));f.useEffect(()=>{o.setOptions(e)},[o,e]);const s=f.useSyncExternalStore(f.useCallback(l=>o.subscribe(Et.batchCalls(l)),[o]),()=>o.getCurrentResult(),()=>o.getCurrentResult()),a=f.useCallback((l,c)=>{o.mutate(l,c).catch(yr)},[o]);if(s.error&&aC(o.options.throwOnError,[s.error]))throw s.error;return{...s,mutate:a,mutateAsync:s.mutate}}/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Fa(){return Fa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},Fa.apply(this,arguments)}var Gn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Gn||(Gn={}));const Pm="popstate";function CC(e){e===void 0&&(e={});function t(o,s){let{pathname:a,search:l,hash:c}=o.location;return Gf("",{pathname:a,search:l,hash:c},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function r(o,s){return typeof s=="string"?s:ud(s)}return EC(t,r,null,e)}function dt(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ex(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function zC(){return Math.random().toString(36).substr(2,8)}function Mm(e,t){return{usr:e.state,key:e.key,idx:t}}function Gf(e,t,r,o){return r===void 0&&(r=null),Fa({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?ps(t):t,{state:r,key:t&&t.key||o||zC()})}function ud(e){let{pathname:t="/",search:r="",hash:o=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),o&&o!=="#"&&(t+=o.charAt(0)==="#"?o:"#"+o),t}function ps(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let o=e.indexOf("?");o>=0&&(t.search=e.substr(o),e=e.substr(0,o)),e&&(t.pathname=e)}return t}function EC(e,t,r,o){o===void 0&&(o={});let{window:s=document.defaultView,v5Compat:a=!1}=o,l=s.history,c=Gn.Pop,u=null,p=x();p==null&&(p=0,l.replaceState(Fa({},l.state,{idx:p}),""));function x(){return(l.state||{idx:null}).idx}function h(){c=Gn.Pop;let C=x(),y=C==null?null:C-p;p=C,u&&u({action:c,location:j.location,delta:y})}function m(C,y){c=Gn.Push;let v=Gf(j.location,C,y);p=x()+1;let b=Mm(v,p),g=j.createHref(v);try{l.pushState(b,"",g)}catch(T){if(T instanceof DOMException&&T.name==="DataCloneError")throw T;s.location.assign(g)}a&&u&&u({action:c,location:j.location,delta:1})}function k(C,y){c=Gn.Replace;let v=Gf(j.location,C,y);p=x();let b=Mm(v,p),g=j.createHref(v);l.replaceState(b,"",g),a&&u&&u({action:c,location:j.location,delta:0})}function w(C){let y=s.location.origin!=="null"?s.location.origin:s.location.href,v=typeof C=="string"?C:ud(C);return v=v.replace(/ $/,"%20"),dt(y,"No window.location.(origin|href) available to create URL for href: "+v),new URL(v,y)}let j={get action(){return c},get location(){return e(s,l)},listen(C){if(u)throw new Error("A history only accepts one active listener");return s.addEventListener(Pm,h),u=C,()=>{s.removeEventListener(Pm,h),u=null}},createHref(C){return t(s,C)},createURL:w,encodeLocation(C){let y=w(C);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:m,replace:k,go(C){return l.go(C)}};return j}var Om;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Om||(Om={}));function _C(e,t,r){return r===void 0&&(r="/"),TC(e,t,r)}function TC(e,t,r,o){let s=typeof t=="string"?ps(t):t,a=_x(s.pathname||"/",r);if(a==null)return null;let l=J2(e);$C(l);let c=null;for(let u=0;c==null&&u<l.length;++u){let p=UC(a);c=BC(l[u],p)}return c}function J2(e,t,r,o){t===void 0&&(t=[]),r===void 0&&(r=[]),o===void 0&&(o="");let s=(a,l,c)=>{let u={relativePath:c===void 0?a.path||"":c,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};u.relativePath.startsWith("/")&&(dt(u.relativePath.startsWith(o),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+o+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(o.length));let p=io([o,u.relativePath]),x=r.concat(u);a.children&&a.children.length>0&&(dt(a.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),J2(a.children,t,x,p)),!(a.path==null&&!a.index)&&t.push({path:p,score:LC(p,a.index),routesMeta:x})};return e.forEach((a,l)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))s(a,l);else for(let u of Z2(a.path))s(a,l,u)}),t}function Z2(e){let t=e.split("/");if(t.length===0)return[];let[r,...o]=t,s=r.endsWith("?"),a=r.replace(/\?$/,"");if(o.length===0)return s?[a,""]:[a];let l=Z2(o.join("/")),c=[];return c.push(...l.map(u=>u===""?a:[a,u].join("/"))),s&&c.push(...l),c.map(u=>e.startsWith("/")&&u===""?"/":u)}function $C(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:DC(t.routesMeta.map(o=>o.childrenIndex),r.routesMeta.map(o=>o.childrenIndex)))}const RC=/^:[\w-]+$/,PC=3,MC=2,OC=1,AC=10,IC=-2,Am=e=>e==="*";function LC(e,t){let r=e.split("/"),o=r.length;return r.some(Am)&&(o+=IC),t&&(o+=MC),r.filter(s=>!Am(s)).reduce((s,a)=>s+(RC.test(a)?PC:a===""?OC:AC),o)}function DC(e,t){return e.length===t.length&&e.slice(0,-1).every((o,s)=>o===t[s])?e[e.length-1]-t[t.length-1]:0}function BC(e,t,r){let{routesMeta:o}=e,s={},a="/",l=[];for(let c=0;c<o.length;++c){let u=o[c],p=c===o.length-1,x=a==="/"?t:t.slice(a.length)||"/",h=FC({path:u.relativePath,caseSensitive:u.caseSensitive,end:p},x),m=u.route;if(!h)return null;Object.assign(s,h.params),l.push({params:s,pathname:io([a,h.pathname]),pathnameBase:WC(io([a,h.pathnameBase])),route:m}),h.pathnameBase!=="/"&&(a=io([a,h.pathnameBase]))}return l}function FC(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,o]=NC(e.path,e.caseSensitive,e.end),s=t.match(r);if(!s)return null;let a=s[0],l=a.replace(/(.)\/+$/,"$1"),c=s.slice(1);return{params:o.reduce((p,x,h)=>{let{paramName:m,isOptional:k}=x;if(m==="*"){let j=c[h]||"";l=a.slice(0,a.length-j.length).replace(/(.)\/+$/,"$1")}const w=c[h];return k&&!w?p[m]=void 0:p[m]=(w||"").replace(/%2F/g,"/"),p},{}),pathname:a,pathnameBase:l,pattern:e}}function NC(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Ex(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let o=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,c,u)=>(o.push({paramName:c,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(o.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),o]}function UC(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ex(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function _x(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,o=e.charAt(r);return o&&o!=="/"?null:e.slice(r)||"/"}const qC=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,HC=e=>qC.test(e);function VC(e,t){t===void 0&&(t="/");let{pathname:r,search:o="",hash:s=""}=typeof e=="string"?ps(e):e,a;if(r)if(HC(r))a=r;else{if(r.includes("//")){let l=r;r=r.replace(/\/\/+/g,"/"),Ex(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+r))}r.startsWith("/")?a=Im(r.substring(1),"/"):a=Im(r,t)}else a=t;return{pathname:a,search:KC(o),hash:QC(s)}}function Im(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?r.length>1&&r.pop():s!=="."&&r.push(s)}),r.length>1?r.join("/"):"/"}function Du(e,t,r,o){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function YC(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Tx(e,t){let r=YC(e);return t?r.map((o,s)=>s===r.length-1?o.pathname:o.pathnameBase):r.map(o=>o.pathnameBase)}function $x(e,t,r,o){o===void 0&&(o=!1);let s;typeof e=="string"?s=ps(e):(s=Fa({},e),dt(!s.pathname||!s.pathname.includes("?"),Du("?","pathname","search",s)),dt(!s.pathname||!s.pathname.includes("#"),Du("#","pathname","hash",s)),dt(!s.search||!s.search.includes("#"),Du("#","search","hash",s)));let a=e===""||s.pathname==="",l=a?"/":s.pathname,c;if(l==null)c=r;else{let h=t.length-1;if(!o&&l.startsWith("..")){let m=l.split("/");for(;m[0]==="..";)m.shift(),h-=1;s.pathname=m.join("/")}c=h>=0?t[h]:"/"}let u=VC(s,c),p=l&&l!=="/"&&l.endsWith("/"),x=(a||l===".")&&r.endsWith("/");return!u.pathname.endsWith("/")&&(p||x)&&(u.pathname+="/"),u}const io=e=>e.join("/").replace(/\/\/+/g,"/"),WC=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),KC=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,QC=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function GC(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const ew=["post","put","patch","delete"];new Set(ew);const XC=["get",...ew];new Set(XC);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Na(){return Na=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},Na.apply(this,arguments)}const Rx=f.createContext(null),JC=f.createContext(null),go=f.createContext(null),Ld=f.createContext(null),zn=f.createContext({outlet:null,matches:[],isDataRoute:!1}),tw=f.createContext(null);function ZC(e,t){let{relative:r}=t===void 0?{}:t;fs()||dt(!1);let{basename:o,navigator:s}=f.useContext(go),{hash:a,pathname:l,search:c}=nw(e,{relative:r}),u=l;return o!=="/"&&(u=l==="/"?o:io([o,l])),s.createHref({pathname:u,search:c,hash:a})}function fs(){return f.useContext(Ld)!=null}function rl(){return fs()||dt(!1),f.useContext(Ld).location}function rw(e){f.useContext(go).static||f.useLayoutEffect(e)}function pr(){let{isDataRoute:e}=f.useContext(zn);return e?p5():e5()}function e5(){fs()||dt(!1);let e=f.useContext(Rx),{basename:t,future:r,navigator:o}=f.useContext(go),{matches:s}=f.useContext(zn),{pathname:a}=rl(),l=JSON.stringify(Tx(s,r.v7_relativeSplatPath)),c=f.useRef(!1);return rw(()=>{c.current=!0}),f.useCallback(function(p,x){if(x===void 0&&(x={}),!c.current)return;if(typeof p=="number"){o.go(p);return}let h=$x(p,JSON.parse(l),a,x.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:io([t,h.pathname])),(x.replace?o.replace:o.push)(h,x.state,x)},[t,o,l,a,e])}function Px(){let{matches:e}=f.useContext(zn),t=e[e.length-1];return t?t.params:{}}function nw(e,t){let{relative:r}=t===void 0?{}:t,{future:o}=f.useContext(go),{matches:s}=f.useContext(zn),{pathname:a}=rl(),l=JSON.stringify(Tx(s,o.v7_relativeSplatPath));return f.useMemo(()=>$x(e,JSON.parse(l),a,r==="path"),[e,l,a,r])}function t5(e,t){return r5(e,t)}function r5(e,t,r,o){fs()||dt(!1);let{navigator:s}=f.useContext(go),{matches:a}=f.useContext(zn),l=a[a.length-1],c=l?l.params:{};l&&l.pathname;let u=l?l.pathnameBase:"/";l&&l.route;let p=rl(),x;if(t){var h;let C=typeof t=="string"?ps(t):t;u==="/"||(h=C.pathname)!=null&&h.startsWith(u)||dt(!1),x=C}else x=p;let m=x.pathname||"/",k=m;if(u!=="/"){let C=u.replace(/^\//,"").split("/");k="/"+m.replace(/^\//,"").split("/").slice(C.length).join("/")}let w=_C(e,{pathname:k}),j=a5(w&&w.map(C=>Object.assign({},C,{params:Object.assign({},c,C.params),pathname:io([u,s.encodeLocation?s.encodeLocation(C.pathname).pathname:C.pathname]),pathnameBase:C.pathnameBase==="/"?u:io([u,s.encodeLocation?s.encodeLocation(C.pathnameBase).pathname:C.pathnameBase])})),a,r,o);return t&&j?f.createElement(Ld.Provider,{value:{location:Na({pathname:"/",search:"",hash:"",state:null,key:"default"},x),navigationType:Gn.Pop}},j):j}function n5(){let e=u5(),t=GC(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),r?f.createElement("pre",{style:s},r):null,null)}const o5=f.createElement(n5,null);class i5 extends f.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?f.createElement(zn.Provider,{value:this.props.routeContext},f.createElement(tw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function s5(e){let{routeContext:t,match:r,children:o}=e,s=f.useContext(Rx);return s&&s.static&&s.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=r.route.id),f.createElement(zn.Provider,{value:t},o)}function a5(e,t,r,o){var s;if(t===void 0&&(t=[]),r===void 0&&(r=null),o===void 0&&(o=null),e==null){var a;if(!r)return null;if(r.errors)e=r.matches;else if((a=o)!=null&&a.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let l=e,c=(s=r)==null?void 0:s.errors;if(c!=null){let x=l.findIndex(h=>h.route.id&&(c==null?void 0:c[h.route.id])!==void 0);x>=0||dt(!1),l=l.slice(0,Math.min(l.length,x+1))}let u=!1,p=-1;if(r&&o&&o.v7_partialHydration)for(let x=0;x<l.length;x++){let h=l[x];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(p=x),h.route.id){let{loaderData:m,errors:k}=r,w=h.route.loader&&m[h.route.id]===void 0&&(!k||k[h.route.id]===void 0);if(h.route.lazy||w){u=!0,p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}return l.reduceRight((x,h,m)=>{let k,w=!1,j=null,C=null;r&&(k=c&&h.route.id?c[h.route.id]:void 0,j=h.route.errorElement||o5,u&&(p<0&&m===0?(f5("route-fallback"),w=!0,C=null):p===m&&(w=!0,C=h.route.hydrateFallbackElement||null)));let y=t.concat(l.slice(0,m+1)),v=()=>{let b;return k?b=j:w?b=C:h.route.Component?b=f.createElement(h.route.Component,null):h.route.element?b=h.route.element:b=x,f.createElement(s5,{match:h,routeContext:{outlet:x,matches:y,isDataRoute:r!=null},children:b})};return r&&(h.route.ErrorBoundary||h.route.errorElement||m===0)?f.createElement(i5,{location:r.location,revalidation:r.revalidation,component:j,error:k,children:v(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):v()},null)}var ow=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ow||{}),iw=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(iw||{});function l5(e){let t=f.useContext(Rx);return t||dt(!1),t}function c5(e){let t=f.useContext(JC);return t||dt(!1),t}function d5(e){let t=f.useContext(zn);return t||dt(!1),t}function sw(e){let t=d5(),r=t.matches[t.matches.length-1];return r.route.id||dt(!1),r.route.id}function u5(){var e;let t=f.useContext(tw),r=c5(),o=sw();return t!==void 0?t:(e=r.errors)==null?void 0:e[o]}function p5(){let{router:e}=l5(ow.UseNavigateStable),t=sw(iw.UseNavigateStable),r=f.useRef(!1);return rw(()=>{r.current=!0}),f.useCallback(function(s,a){a===void 0&&(a={}),r.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,Na({fromRouteId:t},a)))},[e,t])}const Lm={};function f5(e,t,r){Lm[e]||(Lm[e]=!0)}function h5(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function x5(e){let{to:t,replace:r,state:o,relative:s}=e;fs()||dt(!1);let{future:a,static:l}=f.useContext(go),{matches:c}=f.useContext(zn),{pathname:u}=rl(),p=pr(),x=$x(t,Tx(c,a.v7_relativeSplatPath),u,s==="path"),h=JSON.stringify(x);return f.useEffect(()=>p(JSON.parse(h),{replace:r,state:o,relative:s}),[p,h,s,r,o]),null}function nr(e){dt(!1)}function g5(e){let{basename:t="/",children:r=null,location:o,navigationType:s=Gn.Pop,navigator:a,static:l=!1,future:c}=e;fs()&&dt(!1);let u=t.replace(/^\/*/,"/"),p=f.useMemo(()=>({basename:u,navigator:a,static:l,future:Na({v7_relativeSplatPath:!1},c)}),[u,c,a,l]);typeof o=="string"&&(o=ps(o));let{pathname:x="/",search:h="",hash:m="",state:k=null,key:w="default"}=o,j=f.useMemo(()=>{let C=_x(x,u);return C==null?null:{location:{pathname:C,search:h,hash:m,state:k,key:w},navigationType:s}},[u,x,h,m,k,w,s]);return j==null?null:f.createElement(go.Provider,{value:p},f.createElement(Ld.Provider,{children:r,value:j}))}function m5(e){let{children:t,location:r}=e;return t5(Xf(t),r)}new Promise(()=>{});function Xf(e,t){t===void 0&&(t=[]);let r=[];return f.Children.forEach(e,(o,s)=>{if(!f.isValidElement(o))return;let a=[...t,s];if(o.type===f.Fragment){r.push.apply(r,Xf(o.props.children,a));return}o.type!==nr&&dt(!1),!o.props.index||!o.props.children||dt(!1);let l={id:o.props.id||a.join("-"),caseSensitive:o.props.caseSensitive,element:o.props.element,Component:o.props.Component,index:o.props.index,path:o.props.path,loader:o.props.loader,action:o.props.action,errorElement:o.props.errorElement,ErrorBoundary:o.props.ErrorBoundary,hasErrorBoundary:o.props.ErrorBoundary!=null||o.props.errorElement!=null,shouldRevalidate:o.props.shouldRevalidate,handle:o.props.handle,lazy:o.props.lazy};o.props.children&&(l.children=Xf(o.props.children,a)),r.push(l)}),r}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Jf(){return Jf=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},Jf.apply(this,arguments)}function y5(e,t){if(e==null)return{};var r={},o=Object.keys(e),s,a;for(a=0;a<o.length;a++)s=o[a],!(t.indexOf(s)>=0)&&(r[s]=e[s]);return r}function v5(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function b5(e,t){return e.button===0&&(!t||t==="_self")&&!v5(e)}const w5=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],k5="6";try{window.__reactRouterVersion=k5}catch{}const j5="startTransition",Dm=Ij[j5];function S5(e){let{basename:t,children:r,future:o,window:s}=e,a=f.useRef();a.current==null&&(a.current=CC({window:s,v5Compat:!0}));let l=a.current,[c,u]=f.useState({action:l.action,location:l.location}),{v7_startTransition:p}=o||{},x=f.useCallback(h=>{p&&Dm?Dm(()=>u(h)):u(h)},[u,p]);return f.useLayoutEffect(()=>l.listen(x),[l,x]),f.useEffect(()=>h5(o),[o]),f.createElement(g5,{basename:t,children:r,location:c.location,navigationType:c.action,navigator:l,future:o})}const C5=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",z5=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,aw=f.forwardRef(function(t,r){let{onClick:o,relative:s,reloadDocument:a,replace:l,state:c,target:u,to:p,preventScrollReset:x,viewTransition:h}=t,m=y5(t,w5),{basename:k}=f.useContext(go),w,j=!1;if(typeof p=="string"&&z5.test(p)&&(w=p,C5))try{let b=new URL(window.location.href),g=p.startsWith("//")?new URL(b.protocol+p):new URL(p),T=_x(g.pathname,k);g.origin===b.origin&&T!=null?p=T+g.search+g.hash:j=!0}catch{}let C=ZC(p,{relative:s}),y=E5(p,{replace:l,state:c,target:u,preventScrollReset:x,relative:s,viewTransition:h});function v(b){o&&o(b),b.defaultPrevented||y(b)}return f.createElement("a",Jf({},m,{href:w||C,onClick:j||a?o:v,ref:r,target:u}))});var Bm;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Bm||(Bm={}));var Fm;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Fm||(Fm={}));function E5(e,t){let{target:r,replace:o,state:s,preventScrollReset:a,relative:l,viewTransition:c}=t===void 0?{}:t,u=pr(),p=rl(),x=nw(e,{relative:l});return f.useCallback(h=>{if(b5(h,r)){h.preventDefault();let m=o!==void 0?o:ud(p)===ud(x);u(e,{replace:m,state:s,preventScrollReset:a,relative:l,viewTransition:c})}},[p,u,x,o,s,r,e,a,l,c])}var Xt=function(){return Xt=Object.assign||function(t){for(var r,o=1,s=arguments.length;o<s;o++){r=arguments[o];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},Xt.apply(this,arguments)};function Ua(e,t,r){if(r||arguments.length===2)for(var o=0,s=t.length,a;o<s;o++)(a||!(o in t))&&(a||(a=Array.prototype.slice.call(t,0,o)),a[o]=t[o]);return e.concat(a||Array.prototype.slice.call(t))}var Ke="-ms-",va="-moz-",Fe="-webkit-",lw="comm",Dd="rule",Mx="decl",_5="@import",cw="@keyframes",T5="@layer",dw=Math.abs,Ox=String.fromCharCode,Zf=Object.assign;function $5(e,t){return St(e,0)^45?(((t<<2^St(e,0))<<2^St(e,1))<<2^St(e,2))<<2^St(e,3):0}function uw(e){return e.trim()}function ln(e,t){return(e=t.exec(e))?e[0]:e}function $e(e,t,r){return e.replace(t,r)}function Ec(e,t,r){return e.indexOf(t,r)}function St(e,t){return e.charCodeAt(t)|0}function ts(e,t,r){return e.slice(t,r)}function Qr(e){return e.length}function pw(e){return e.length}function sa(e,t){return t.push(e),e}function R5(e,t){return e.map(t).join("")}function Nm(e,t){return e.filter(function(r){return!ln(r,t)})}var Bd=1,rs=1,fw=0,zr=0,ht=0,hs="";function Fd(e,t,r,o,s,a,l,c){return{value:e,root:t,parent:r,type:o,props:s,children:a,line:Bd,column:rs,length:l,return:"",siblings:c}}function Mn(e,t){return Zf(Fd("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function ci(e){for(;e.root;)e=Mn(e.root,{children:[e]});sa(e,e.siblings)}function P5(){return ht}function M5(){return ht=zr>0?St(hs,--zr):0,rs--,ht===10&&(rs=1,Bd--),ht}function Lr(){return ht=zr<fw?St(hs,zr++):0,rs++,ht===10&&(rs=1,Bd++),ht}function No(){return St(hs,zr)}function _c(){return zr}function Nd(e,t){return ts(hs,e,t)}function eh(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function O5(e){return Bd=rs=1,fw=Qr(hs=e),zr=0,[]}function A5(e){return hs="",e}function Bu(e){return uw(Nd(zr-1,th(e===91?e+2:e===40?e+1:e)))}function I5(e){for(;(ht=No())&&ht<33;)Lr();return eh(e)>2||eh(ht)>3?"":" "}function L5(e,t){for(;--t&&Lr()&&!(ht<48||ht>102||ht>57&&ht<65||ht>70&&ht<97););return Nd(e,_c()+(t<6&&No()==32&&Lr()==32))}function th(e){for(;Lr();)switch(ht){case e:return zr;case 34:case 39:e!==34&&e!==39&&th(ht);break;case 40:e===41&&th(e);break;case 92:Lr();break}return zr}function D5(e,t){for(;Lr()&&e+ht!==57;)if(e+ht===84&&No()===47)break;return"/*"+Nd(t,zr-1)+"*"+Ox(e===47?e:Lr())}function B5(e){for(;!eh(No());)Lr();return Nd(e,zr)}function F5(e){return A5(Tc("",null,null,null,[""],e=O5(e),0,[0],e))}function Tc(e,t,r,o,s,a,l,c,u){for(var p=0,x=0,h=l,m=0,k=0,w=0,j=1,C=1,y=1,v=0,b="",g=s,T=a,A=o,B=b;C;)switch(w=v,v=Lr()){case 40:if(w!=108&&St(B,h-1)==58){Ec(B+=$e(Bu(v),"&","&\f"),"&\f",dw(p?c[p-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:B+=Bu(v);break;case 9:case 10:case 13:case 32:B+=I5(w);break;case 92:B+=L5(_c()-1,7);continue;case 47:switch(No()){case 42:case 47:sa(N5(D5(Lr(),_c()),t,r,u),u);break;default:B+="/"}break;case 123*j:c[p++]=Qr(B)*y;case 125*j:case 59:case 0:switch(v){case 0:case 125:C=0;case 59+x:y==-1&&(B=$e(B,/\f/g,"")),k>0&&Qr(B)-h&&sa(k>32?qm(B+";",o,r,h-1,u):qm($e(B," ","")+";",o,r,h-2,u),u);break;case 59:B+=";";default:if(sa(A=Um(B,t,r,p,x,s,c,b,g=[],T=[],h,a),a),v===123)if(x===0)Tc(B,t,A,A,g,a,h,c,T);else switch(m===99&&St(B,3)===110?100:m){case 100:case 108:case 109:case 115:Tc(e,A,A,o&&sa(Um(e,A,A,0,0,s,c,b,s,g=[],h,T),T),s,T,h,c,o?g:T);break;default:Tc(B,A,A,A,[""],T,0,c,T)}}p=x=k=0,j=y=1,b=B="",h=l;break;case 58:h=1+Qr(B),k=w;default:if(j<1){if(v==123)--j;else if(v==125&&j++==0&&M5()==125)continue}switch(B+=Ox(v),v*j){case 38:y=x>0?1:(B+="\f",-1);break;case 44:c[p++]=(Qr(B)-1)*y,y=1;break;case 64:No()===45&&(B+=Bu(Lr())),m=No(),x=h=Qr(b=B+=B5(_c())),v++;break;case 45:w===45&&Qr(B)==2&&(j=0)}}return a}function Um(e,t,r,o,s,a,l,c,u,p,x,h){for(var m=s-1,k=s===0?a:[""],w=pw(k),j=0,C=0,y=0;j<o;++j)for(var v=0,b=ts(e,m+1,m=dw(C=l[j])),g=e;v<w;++v)(g=uw(C>0?k[v]+" "+b:$e(b,/&\f/g,k[v])))&&(u[y++]=g);return Fd(e,t,r,s===0?Dd:c,u,p,x,h)}function N5(e,t,r,o){return Fd(e,t,r,lw,Ox(P5()),ts(e,2,-2),0,o)}function qm(e,t,r,o,s){return Fd(e,t,r,Mx,ts(e,0,o),ts(e,o+1,-1),o,s)}function hw(e,t,r){switch($5(e,t)){case 5103:return Fe+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Fe+e+e;case 4789:return va+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return Fe+e+va+e+Ke+e+e;case 5936:switch(St(e,t+11)){case 114:return Fe+e+Ke+$e(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return Fe+e+Ke+$e(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return Fe+e+Ke+$e(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return Fe+e+Ke+e+e;case 6165:return Fe+e+Ke+"flex-"+e+e;case 5187:return Fe+e+$e(e,/(\w+).+(:[^]+)/,Fe+"box-$1$2"+Ke+"flex-$1$2")+e;case 5443:return Fe+e+Ke+"flex-item-"+$e(e,/flex-|-self/g,"")+(ln(e,/flex-|baseline/)?"":Ke+"grid-row-"+$e(e,/flex-|-self/g,""))+e;case 4675:return Fe+e+Ke+"flex-line-pack"+$e(e,/align-content|flex-|-self/g,"")+e;case 5548:return Fe+e+Ke+$e(e,"shrink","negative")+e;case 5292:return Fe+e+Ke+$e(e,"basis","preferred-size")+e;case 6060:return Fe+"box-"+$e(e,"-grow","")+Fe+e+Ke+$e(e,"grow","positive")+e;case 4554:return Fe+$e(e,/([^-])(transform)/g,"$1"+Fe+"$2")+e;case 6187:return $e($e($e(e,/(zoom-|grab)/,Fe+"$1"),/(image-set)/,Fe+"$1"),e,"")+e;case 5495:case 3959:return $e(e,/(image-set\([^]*)/,Fe+"$1$`$1");case 4968:return $e($e(e,/(.+:)(flex-)?(.*)/,Fe+"box-pack:$3"+Ke+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Fe+e+e;case 4200:if(!ln(e,/flex-|baseline/))return Ke+"grid-column-align"+ts(e,t)+e;break;case 2592:case 3360:return Ke+$e(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(o,s){return t=s,ln(o.props,/grid-\w+-end/)})?~Ec(e+(r=r[t].value),"span",0)?e:Ke+$e(e,"-start","")+e+Ke+"grid-row-span:"+(~Ec(r,"span",0)?ln(r,/\d+/):+ln(r,/\d+/)-+ln(e,/\d+/))+";":Ke+$e(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(o){return ln(o.props,/grid-\w+-start/)})?e:Ke+$e($e(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return $e(e,/(.+)-inline(.+)/,Fe+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Qr(e)-1-t>6)switch(St(e,t+1)){case 109:if(St(e,t+4)!==45)break;case 102:return $e(e,/(.+:)(.+)-([^]+)/,"$1"+Fe+"$2-$3$1"+va+(St(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ec(e,"stretch",0)?hw($e(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return $e(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(o,s,a,l,c,u,p){return Ke+s+":"+a+p+(l?Ke+s+"-span:"+(c?u:+u-+a)+p:"")+e});case 4949:if(St(e,t+6)===121)return $e(e,":",":"+Fe)+e;break;case 6444:switch(St(e,St(e,14)===45?18:11)){case 120:return $e(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Fe+(St(e,14)===45?"inline-":"")+"box$3$1"+Fe+"$2$3$1"+Ke+"$2box$3")+e;case 100:return $e(e,":",":"+Ke)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return $e(e,"scroll-","scroll-snap-")+e}return e}function pd(e,t){for(var r="",o=0;o<e.length;o++)r+=t(e[o],o,e,t)||"";return r}function U5(e,t,r,o){switch(e.type){case T5:if(e.children.length)break;case _5:case Mx:return e.return=e.return||e.value;case lw:return"";case cw:return e.return=e.value+"{"+pd(e.children,o)+"}";case Dd:if(!Qr(e.value=e.props.join(",")))return""}return Qr(r=pd(e.children,o))?e.return=e.value+"{"+r+"}":""}function q5(e){var t=pw(e);return function(r,o,s,a){for(var l="",c=0;c<t;c++)l+=e[c](r,o,s,a)||"";return l}}function H5(e){return function(t){t.root||(t=t.return)&&e(t)}}function V5(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case Mx:e.return=hw(e.value,e.length,r);return;case cw:return pd([Mn(e,{value:$e(e.value,"@","@"+Fe)})],o);case Dd:if(e.length)return R5(r=e.props,function(s){switch(ln(s,o=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ci(Mn(e,{props:[$e(s,/:(read-\w+)/,":"+va+"$1")]})),ci(Mn(e,{props:[s]})),Zf(e,{props:Nm(r,o)});break;case"::placeholder":ci(Mn(e,{props:[$e(s,/:(plac\w+)/,":"+Fe+"input-$1")]})),ci(Mn(e,{props:[$e(s,/:(plac\w+)/,":"+va+"$1")]})),ci(Mn(e,{props:[$e(s,/:(plac\w+)/,Ke+"input-$1")]})),ci(Mn(e,{props:[s]})),Zf(e,{props:Nm(r,o)});break}return""})}}var Y5={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},or={},ns=typeof process<"u"&&or!==void 0&&(or.REACT_APP_SC_ATTR||or.SC_ATTR)||"data-styled",xw="active",gw="data-styled-version",Ud="6.1.19",Ax=`/*!sc*/
`,fd=typeof window<"u"&&typeof document<"u",W5=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&or!==void 0&&or.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&or.REACT_APP_SC_DISABLE_SPEEDY!==""?or.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&or.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&or!==void 0&&or.SC_DISABLE_SPEEDY!==void 0&&or.SC_DISABLE_SPEEDY!==""&&or.SC_DISABLE_SPEEDY!=="false"&&or.SC_DISABLE_SPEEDY),qd=Object.freeze([]),os=Object.freeze({});function K5(e,t,r){return r===void 0&&(r=os),e.theme!==r.theme&&e.theme||t||r.theme}var mw=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Q5=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,G5=/(^-|-$)/g;function Hm(e){return e.replace(Q5,"-").replace(G5,"")}var X5=/(a)(d)/gi,Hl=52,Vm=function(e){return String.fromCharCode(e+(e>25?39:97))};function rh(e){var t,r="";for(t=Math.abs(e);t>Hl;t=t/Hl|0)r=Vm(t%Hl)+r;return(Vm(t%Hl)+r).replace(X5,"$1-$2")}var Fu,yw=5381,_i=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},vw=function(e){return _i(yw,e)};function bw(e){return rh(vw(e)>>>0)}function J5(e){return e.displayName||e.name||"Component"}function Nu(e){return typeof e=="string"&&!0}var ww=typeof Symbol=="function"&&Symbol.for,kw=ww?Symbol.for("react.memo"):60115,Z5=ww?Symbol.for("react.forward_ref"):60112,e3={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},t3={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},jw={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},r3=((Fu={})[Z5]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Fu[kw]=jw,Fu);function Ym(e){return("type"in(t=e)&&t.type.$$typeof)===kw?jw:"$$typeof"in e?r3[e.$$typeof]:e3;var t}var n3=Object.defineProperty,o3=Object.getOwnPropertyNames,Wm=Object.getOwnPropertySymbols,i3=Object.getOwnPropertyDescriptor,s3=Object.getPrototypeOf,Km=Object.prototype;function Sw(e,t,r){if(typeof t!="string"){if(Km){var o=s3(t);o&&o!==Km&&Sw(e,o,r)}var s=o3(t);Wm&&(s=s.concat(Wm(t)));for(var a=Ym(e),l=Ym(t),c=0;c<s.length;++c){var u=s[c];if(!(u in t3||r&&r[u]||l&&u in l||a&&u in a)){var p=i3(t,u);try{n3(e,u,p)}catch{}}}}return e}function is(e){return typeof e=="function"}function Ix(e){return typeof e=="object"&&"styledComponentId"in e}function $o(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function nh(e,t){if(e.length===0)return"";for(var r=e[0],o=1;o<e.length;o++)r+=e[o];return r}function qa(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function oh(e,t,r){if(r===void 0&&(r=!1),!r&&!qa(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=oh(e[o],t[o]);else if(qa(t))for(var o in t)e[o]=oh(e[o],t[o]);return e}function Lx(e,t){Object.defineProperty(e,"toString",{value:t})}function nl(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var a3=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,o=0;o<t;o++)r+=this.groupSizes[o];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var o=this.groupSizes,s=o.length,a=s;t>=a;)if((a<<=1)<0)throw nl(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(o),this.length=a;for(var l=s;l<a;l++)this.groupSizes[l]=0}for(var c=this.indexOfGroup(t+1),u=(l=0,r.length);l<u;l++)this.tag.insertRule(c,r[l])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],o=this.indexOfGroup(t),s=o+r;this.groupSizes[t]=0;for(var a=o;a<s;a++)this.tag.deleteRule(o)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var o=this.groupSizes[t],s=this.indexOfGroup(t),a=s+o,l=s;l<a;l++)r+="".concat(this.tag.getRule(l)).concat(Ax);return r},e}(),$c=new Map,hd=new Map,Rc=1,Vl=function(e){if($c.has(e))return $c.get(e);for(;hd.has(Rc);)Rc++;var t=Rc++;return $c.set(e,t),hd.set(t,e),t},l3=function(e,t){Rc=t+1,$c.set(e,t),hd.set(t,e)},c3="style[".concat(ns,"][").concat(gw,'="').concat(Ud,'"]'),d3=new RegExp("^".concat(ns,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),u3=function(e,t,r){for(var o,s=r.split(","),a=0,l=s.length;a<l;a++)(o=s[a])&&e.registerName(t,o)},p3=function(e,t){for(var r,o=((r=t.textContent)!==null&&r!==void 0?r:"").split(Ax),s=[],a=0,l=o.length;a<l;a++){var c=o[a].trim();if(c){var u=c.match(d3);if(u){var p=0|parseInt(u[1],10),x=u[2];p!==0&&(l3(x,p),u3(e,x,u[3]),e.getTag().insertRules(p,s)),s.length=0}else s.push(c)}}},Qm=function(e){for(var t=document.querySelectorAll(c3),r=0,o=t.length;r<o;r++){var s=t[r];s&&s.getAttribute(ns)!==xw&&(p3(e,s),s.parentNode&&s.parentNode.removeChild(s))}};function f3(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Cw=function(e){var t=document.head,r=e||t,o=document.createElement("style"),s=function(c){var u=Array.from(c.querySelectorAll("style[".concat(ns,"]")));return u[u.length-1]}(r),a=s!==void 0?s.nextSibling:null;o.setAttribute(ns,xw),o.setAttribute(gw,Ud);var l=f3();return l&&o.setAttribute("nonce",l),r.insertBefore(o,a),o},h3=function(){function e(t){this.element=Cw(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var o=document.styleSheets,s=0,a=o.length;s<a;s++){var l=o[s];if(l.ownerNode===r)return l}throw nl(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),x3=function(){function e(t){this.element=Cw(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var o=document.createTextNode(r);return this.element.insertBefore(o,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),g3=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Gm=fd,m3={isServer:!fd,useCSSOMInjection:!W5},zw=function(){function e(t,r,o){t===void 0&&(t=os),r===void 0&&(r={});var s=this;this.options=Xt(Xt({},m3),t),this.gs=r,this.names=new Map(o),this.server=!!t.isServer,!this.server&&fd&&Gm&&(Gm=!1,Qm(this)),Lx(this,function(){return function(a){for(var l=a.getTag(),c=l.length,u="",p=function(h){var m=function(y){return hd.get(y)}(h);if(m===void 0)return"continue";var k=a.names.get(m),w=l.getGroup(h);if(k===void 0||!k.size||w.length===0)return"continue";var j="".concat(ns,".g").concat(h,'[id="').concat(m,'"]'),C="";k!==void 0&&k.forEach(function(y){y.length>0&&(C+="".concat(y,","))}),u+="".concat(w).concat(j,'{content:"').concat(C,'"}').concat(Ax)},x=0;x<c;x++)p(x);return u}(s)})}return e.registerId=function(t){return Vl(t)},e.prototype.rehydrate=function(){!this.server&&fd&&Qm(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(Xt(Xt({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var o=r.useCSSOMInjection,s=r.target;return r.isServer?new g3(s):o?new h3(s):new x3(s)}(this.options),new a3(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(Vl(t),this.names.has(t))this.names.get(t).add(r);else{var o=new Set;o.add(r),this.names.set(t,o)}},e.prototype.insertRules=function(t,r,o){this.registerName(t,r),this.getTag().insertRules(Vl(t),o)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Vl(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),y3=/&/g,v3=/^\s*\/\/.*$/gm;function Ew(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(o){return"".concat(t," ").concat(o)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Ew(r.children,t)),r})}function b3(e){var t,r,o,s=os,a=s.options,l=a===void 0?os:a,c=s.plugins,u=c===void 0?qd:c,p=function(m,k,w){return w.startsWith(r)&&w.endsWith(r)&&w.replaceAll(r,"").length>0?".".concat(t):m},x=u.slice();x.push(function(m){m.type===Dd&&m.value.includes("&")&&(m.props[0]=m.props[0].replace(y3,r).replace(o,p))}),l.prefix&&x.push(V5),x.push(U5);var h=function(m,k,w,j){k===void 0&&(k=""),w===void 0&&(w=""),j===void 0&&(j="&"),t=j,r=k,o=new RegExp("\\".concat(r,"\\b"),"g");var C=m.replace(v3,""),y=F5(w||k?"".concat(w," ").concat(k," { ").concat(C," }"):C);l.namespace&&(y=Ew(y,l.namespace));var v=[];return pd(y,q5(x.concat(H5(function(b){return v.push(b)})))),v};return h.hash=u.length?u.reduce(function(m,k){return k.name||nl(15),_i(m,k.name)},yw).toString():"",h}var w3=new zw,ih=b3(),_w=Le.createContext({shouldForwardProp:void 0,styleSheet:w3,stylis:ih});_w.Consumer;Le.createContext(void 0);function Xm(){return f.useContext(_w)}var Tw=function(){function e(t,r){var o=this;this.inject=function(s,a){a===void 0&&(a=ih);var l=o.name+a.hash;s.hasNameForId(o.id,l)||s.insertRules(o.id,l,a(o.rules,l,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,Lx(this,function(){throw nl(12,String(o.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=ih),this.name+t.hash},e}(),k3=function(e){return e>="A"&&e<="Z"};function Jm(e){for(var t="",r=0;r<e.length;r++){var o=e[r];if(r===1&&o==="-"&&e[0]==="-")return e;k3(o)?t+="-"+o.toLowerCase():t+=o}return t.startsWith("ms-")?"-"+t:t}var $w=function(e){return e==null||e===!1||e===""},Rw=function(e){var t,r,o=[];for(var s in e){var a=e[s];e.hasOwnProperty(s)&&!$w(a)&&(Array.isArray(a)&&a.isCss||is(a)?o.push("".concat(Jm(s),":"),a,";"):qa(a)?o.push.apply(o,Ua(Ua(["".concat(s," {")],Rw(a),!1),["}"],!1)):o.push("".concat(Jm(s),": ").concat((t=s,(r=a)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in Y5||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return o};function Uo(e,t,r,o){if($w(e))return[];if(Ix(e))return[".".concat(e.styledComponentId)];if(is(e)){if(!is(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var s=e(t);return Uo(s,t,r,o)}var a;return e instanceof Tw?r?(e.inject(r,o),[e.getName(o)]):[e]:qa(e)?Rw(e):Array.isArray(e)?Array.prototype.concat.apply(qd,e.map(function(l){return Uo(l,t,r,o)})):[e.toString()]}function j3(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(is(r)&&!Ix(r))return!1}return!0}var S3=vw(Ud),C3=function(){function e(t,r,o){this.rules=t,this.staticRulesId="",this.isStatic=(o===void 0||o.isStatic)&&j3(t),this.componentId=r,this.baseHash=_i(S3,r),this.baseStyle=o,zw.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,o){var s=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,o):"";if(this.isStatic&&!o.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))s=$o(s,this.staticRulesId);else{var a=nh(Uo(this.rules,t,r,o)),l=rh(_i(this.baseHash,a)>>>0);if(!r.hasNameForId(this.componentId,l)){var c=o(a,".".concat(l),void 0,this.componentId);r.insertRules(this.componentId,l,c)}s=$o(s,l),this.staticRulesId=l}else{for(var u=_i(this.baseHash,o.hash),p="",x=0;x<this.rules.length;x++){var h=this.rules[x];if(typeof h=="string")p+=h;else if(h){var m=nh(Uo(h,t,r,o));u=_i(u,m+x),p+=m}}if(p){var k=rh(u>>>0);r.hasNameForId(this.componentId,k)||r.insertRules(this.componentId,k,o(p,".".concat(k),void 0,this.componentId)),s=$o(s,k)}}return s},e}(),Pw=Le.createContext(void 0);Pw.Consumer;var Uu={};function z3(e,t,r){var o=Ix(e),s=e,a=!Nu(e),l=t.attrs,c=l===void 0?qd:l,u=t.componentId,p=u===void 0?function(g,T){var A=typeof g!="string"?"sc":Hm(g);Uu[A]=(Uu[A]||0)+1;var B="".concat(A,"-").concat(bw(Ud+A+Uu[A]));return T?"".concat(T,"-").concat(B):B}(t.displayName,t.parentComponentId):u,x=t.displayName,h=x===void 0?function(g){return Nu(g)?"styled.".concat(g):"Styled(".concat(J5(g),")")}(e):x,m=t.displayName&&t.componentId?"".concat(Hm(t.displayName),"-").concat(t.componentId):t.componentId||p,k=o&&s.attrs?s.attrs.concat(c).filter(Boolean):c,w=t.shouldForwardProp;if(o&&s.shouldForwardProp){var j=s.shouldForwardProp;if(t.shouldForwardProp){var C=t.shouldForwardProp;w=function(g,T){return j(g,T)&&C(g,T)}}else w=j}var y=new C3(r,m,o?s.componentStyle:void 0);function v(g,T){return function(A,B,z){var H=A.attrs,D=A.componentStyle,U=A.defaultProps,M=A.foldedComponentIds,I=A.styledComponentId,P=A.target,E=Le.useContext(Pw),_=Xm(),R=A.shouldForwardProp||_.shouldForwardProp,$=K5(B,E,U)||os,F=function(X,ee,ae){for(var de,le=Xt(Xt({},ee),{className:void 0,theme:ae}),te=0;te<X.length;te+=1){var Z=is(de=X[te])?de(le):de;for(var ne in Z)le[ne]=ne==="className"?$o(le[ne],Z[ne]):ne==="style"?Xt(Xt({},le[ne]),Z[ne]):Z[ne]}return ee.className&&(le.className=$o(le.className,ee.className)),le}(H,B,$),L=F.as||P,O={};for(var S in F)F[S]===void 0||S[0]==="$"||S==="as"||S==="theme"&&F.theme===$||(S==="forwardedAs"?O.as=F.forwardedAs:R&&!R(S,L)||(O[S]=F[S]));var N=function(X,ee){var ae=Xm(),de=X.generateAndInjectStyles(ee,ae.styleSheet,ae.stylis);return de}(D,F),Q=$o(M,I);return N&&(Q+=" "+N),F.className&&(Q+=" "+F.className),O[Nu(L)&&!mw.has(L)?"class":"className"]=Q,z&&(O.ref=z),f.createElement(L,O)}(b,g,T)}v.displayName=h;var b=Le.forwardRef(v);return b.attrs=k,b.componentStyle=y,b.displayName=h,b.shouldForwardProp=w,b.foldedComponentIds=o?$o(s.foldedComponentIds,s.styledComponentId):"",b.styledComponentId=m,b.target=o?s.target:e,Object.defineProperty(b,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(g){this._foldedDefaultProps=o?function(T){for(var A=[],B=1;B<arguments.length;B++)A[B-1]=arguments[B];for(var z=0,H=A;z<H.length;z++)oh(T,H[z],!0);return T}({},s.defaultProps,g):g}}),Lx(b,function(){return".".concat(b.styledComponentId)}),a&&Sw(b,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),b}function Zm(e,t){for(var r=[e[0]],o=0,s=t.length;o<s;o+=1)r.push(t[o],e[o+1]);return r}var e0=function(e){return Object.assign(e,{isCss:!0})};function Ti(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(is(e)||qa(e))return e0(Uo(Zm(qd,Ua([e],t,!0))));var o=e;return t.length===0&&o.length===1&&typeof o[0]=="string"?Uo(o):e0(Uo(Zm(o,t)))}function sh(e,t,r){if(r===void 0&&(r=os),!t)throw nl(1,t);var o=function(s){for(var a=[],l=1;l<arguments.length;l++)a[l-1]=arguments[l];return e(t,r,Ti.apply(void 0,Ua([s],a,!1)))};return o.attrs=function(s){return sh(e,t,Xt(Xt({},r),{attrs:Array.prototype.concat(r.attrs,s).filter(Boolean)}))},o.withConfig=function(s){return sh(e,t,Xt(Xt({},r),s))},o}var Mw=function(e){return sh(z3,e)},d=Mw;mw.forEach(function(e){d[e]=Mw(e)});function Ft(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var o=nh(Ti.apply(void 0,Ua([e],t,!1))),s=bw(o);return new Tw(s,o)}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E3={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _3=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),re=(e,t)=>{const r=f.forwardRef(({color:o="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:l,className:c="",children:u,...p},x)=>f.createElement("svg",{ref:x,...E3,width:s,height:s,stroke:o,strokeWidth:l?Number(a)*24/Number(s):a,className:["lucide",`lucide-${_3(e)}`,c].join(" "),...p},[...t.map(([h,m])=>f.createElement(h,m)),...Array.isArray(u)?u:[u]]));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd=re("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T3=re("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=re("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $3=re("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R3=re("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ow=re("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qu=re("BarChart",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P3=re("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M3=re("Bold",[["path",{d:"M14 12a4 4 0 0 0 0-8H6v8",key:"v2sylx"}],["path",{d:"M15 20a4 4 0 0 0 0-8H6v8Z",key:"1ef5ya"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O3=re("BookCopy",[["path",{d:"M2 16V4a2 2 0 0 1 2-2h11",key:"spzkk5"}],["path",{d:"M5 14H4a2 2 0 1 0 0 4h1",key:"16gqf9"}],["path",{d:"M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12",key:"1owzki"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=re("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ah=re("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aw=re("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lh=re("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A3=re("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jo=re("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I3=re("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=re("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=re("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L3=re("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D3=re("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hu=re("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vu=re("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=re("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B3=re("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=re("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=re("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F3=re("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iw=re("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ha=re("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N3=re("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U3=re("FileVideo",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lw=re("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vd=re("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Li=re("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yu=re("Hand",[["path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0",key:"aigmz7"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2",key:"1n6bmn"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8",key:"a9iiix"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Va=re("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dw=re("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q3=re("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ch=re("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dh=re("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H3=re("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V3=re("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y3=re("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bw=re("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=re("ListVideo",[["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}],["path",{d:"m16 12 5 3-5 3v-6Z",key:"zpskkp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yd=re("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=re("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zo=re("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W3=re("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=re("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K3=re("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fw=re("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nw=re("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $i=re("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q3=re("MessagesSquare",[["path",{d:"M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z",key:"16vlm8"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",key:"1cx29u"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qo=re("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ro=re("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G3=re("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uw=re("MonitorOff",[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",key:"k0q8oc"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9",key:"cp1ac0"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uh=re("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X3=re("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J3=re("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z3=re("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=re("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wd=re("PhoneOff",[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",key:"z86iuo"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22",key:"11kh81"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qw=re("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e6=re("PlayCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pc=re("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=re("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=re("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t6=re("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hw=re("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=re("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=re("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r6=re("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n6=re("ShieldAlert",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=re("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o6=re("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i6=re("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s6=re("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a6=re("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ho=re("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=re("Swords",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5",key:"hbey2j"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18",key:"1hf58s"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20",key:"pidxm4"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21",key:"1pehsh"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vw=re("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yw=re("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=re("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ww=re("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l6=re("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=re("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c6=re("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kw=re("UserMinus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=re("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=re("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=re("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d6=re("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jn=re("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=re("VideoOff",[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8",key:"ubwiq0"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z",key:"1l10zd"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Or=re("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qw=re("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u6=re("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wu=re("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=re("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=re("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),tn=Object.create(null);tn.open="0";tn.close="1";tn.ping="2";tn.pong="3";tn.message="4";tn.upgrade="5";tn.noop="6";const Mc=Object.create(null);Object.keys(tn).forEach(e=>{Mc[tn[e]]=e});const ph={type:"error",data:"parser error"},Gw=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Xw=typeof ArrayBuffer=="function",Jw=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,qx=({type:e,data:t},r,o)=>Gw&&t instanceof Blob?r?o(t):l0(t,o):Xw&&(t instanceof ArrayBuffer||Jw(t))?r?o(t):l0(new Blob([t]),o):o(tn[e]+(t||"")),l0=(e,t)=>{const r=new FileReader;return r.onload=function(){const o=r.result.split(",")[1];t("b"+(o||""))},r.readAsDataURL(e)};function c0(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}let Ku;function p6(e,t){if(Gw&&e.data instanceof Blob)return e.data.arrayBuffer().then(c0).then(t);if(Xw&&(e.data instanceof ArrayBuffer||Jw(e.data)))return t(c0(e.data));qx(e,!1,r=>{Ku||(Ku=new TextEncoder),t(Ku.encode(r))})}const d0="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",aa=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let e=0;e<d0.length;e++)aa[d0.charCodeAt(e)]=e;const f6=e=>{let t=e.length*.75,r=e.length,o,s=0,a,l,c,u;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);const p=new ArrayBuffer(t),x=new Uint8Array(p);for(o=0;o<r;o+=4)a=aa[e.charCodeAt(o)],l=aa[e.charCodeAt(o+1)],c=aa[e.charCodeAt(o+2)],u=aa[e.charCodeAt(o+3)],x[s++]=a<<2|l>>4,x[s++]=(l&15)<<4|c>>2,x[s++]=(c&3)<<6|u&63;return p},h6=typeof ArrayBuffer=="function",Hx=(e,t)=>{if(typeof e!="string")return{type:"message",data:Zw(e,t)};const r=e.charAt(0);return r==="b"?{type:"message",data:x6(e.substring(1),t)}:Mc[r]?e.length>1?{type:Mc[r],data:e.substring(1)}:{type:Mc[r]}:ph},x6=(e,t)=>{if(h6){const r=f6(e);return Zw(r,t)}else return{base64:!0,data:e}},Zw=(e,t)=>{switch(t){case"blob":return e instanceof Blob?e:new Blob([e]);case"arraybuffer":default:return e instanceof ArrayBuffer?e:e.buffer}},ek="",g6=(e,t)=>{const r=e.length,o=new Array(r);let s=0;e.forEach((a,l)=>{qx(a,!1,c=>{o[l]=c,++s===r&&t(o.join(ek))})})},m6=(e,t)=>{const r=e.split(ek),o=[];for(let s=0;s<r.length;s++){const a=Hx(r[s],t);if(o.push(a),a.type==="error")break}return o};function y6(){return new TransformStream({transform(e,t){p6(e,r=>{const o=r.length;let s;if(o<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,o);else if(o<65536){s=new Uint8Array(3);const a=new DataView(s.buffer);a.setUint8(0,126),a.setUint16(1,o)}else{s=new Uint8Array(9);const a=new DataView(s.buffer);a.setUint8(0,127),a.setBigUint64(1,BigInt(o))}e.data&&typeof e.data!="string"&&(s[0]|=128),t.enqueue(s),t.enqueue(r)})}})}let Qu;function Yl(e){return e.reduce((t,r)=>t+r.length,0)}function Wl(e,t){if(e[0].length===t)return e.shift();const r=new Uint8Array(t);let o=0;for(let s=0;s<t;s++)r[s]=e[0][o++],o===e[0].length&&(e.shift(),o=0);return e.length&&o<e[0].length&&(e[0]=e[0].slice(o)),r}function v6(e,t){Qu||(Qu=new TextDecoder);const r=[];let o=0,s=-1,a=!1;return new TransformStream({transform(l,c){for(r.push(l);;){if(o===0){if(Yl(r)<1)break;const u=Wl(r,1);a=(u[0]&128)===128,s=u[0]&127,s<126?o=3:s===126?o=1:o=2}else if(o===1){if(Yl(r)<2)break;const u=Wl(r,2);s=new DataView(u.buffer,u.byteOffset,u.length).getUint16(0),o=3}else if(o===2){if(Yl(r)<8)break;const u=Wl(r,8),p=new DataView(u.buffer,u.byteOffset,u.length),x=p.getUint32(0);if(x>Math.pow(2,21)-1){c.enqueue(ph);break}s=x*Math.pow(2,32)+p.getUint32(4),o=3}else{if(Yl(r)<s)break;const u=Wl(r,s);c.enqueue(Hx(a?u:Qu.decode(u),t)),o=0}if(s===0||s>e){c.enqueue(ph);break}}}})}const tk=4;function gt(e){if(e)return b6(e)}function b6(e){for(var t in gt.prototype)e[t]=gt.prototype[t];return e}gt.prototype.on=gt.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this};gt.prototype.once=function(e,t){function r(){this.off(e,r),t.apply(this,arguments)}return r.fn=t,this.on(e,r),this};gt.prototype.off=gt.prototype.removeListener=gt.prototype.removeAllListeners=gt.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var r=this._callbacks["$"+e];if(!r)return this;if(arguments.length==1)return delete this._callbacks["$"+e],this;for(var o,s=0;s<r.length;s++)if(o=r[s],o===t||o.fn===t){r.splice(s,1);break}return r.length===0&&delete this._callbacks["$"+e],this};gt.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),r=this._callbacks["$"+e],o=1;o<arguments.length;o++)t[o-1]=arguments[o];if(r){r=r.slice(0);for(var o=0,s=r.length;o<s;++o)r[o].apply(this,t)}return this};gt.prototype.emitReserved=gt.prototype.emit;gt.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]};gt.prototype.hasListeners=function(e){return!!this.listeners(e).length};const Qd=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,r)=>r(t,0),wr=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),w6="arraybuffer";function rk(e,...t){return t.reduce((r,o)=>(e.hasOwnProperty(o)&&(r[o]=e[o]),r),{})}const k6=wr.setTimeout,j6=wr.clearTimeout;function Gd(e,t){t.useNativeTimers?(e.setTimeoutFn=k6.bind(wr),e.clearTimeoutFn=j6.bind(wr)):(e.setTimeoutFn=wr.setTimeout.bind(wr),e.clearTimeoutFn=wr.clearTimeout.bind(wr))}const S6=1.33;function C6(e){return typeof e=="string"?z6(e):Math.ceil((e.byteLength||e.size)*S6)}function z6(e){let t=0,r=0;for(let o=0,s=e.length;o<s;o++)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:t<55296||t>=57344?r+=3:(o++,r+=4);return r}function nk(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function E6(e){let t="";for(let r in e)e.hasOwnProperty(r)&&(t.length&&(t+="&"),t+=encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t}function _6(e){let t={},r=e.split("&");for(let o=0,s=r.length;o<s;o++){let a=r[o].split("=");t[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}return t}class T6 extends Error{constructor(t,r,o){super(t),this.description=r,this.context=o,this.type="TransportError"}}class Vx extends gt{constructor(t){super(),this.writable=!1,Gd(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,r,o){return super.emitReserved("error",new T6(t,r,o)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const r=Hx(t,this.socket.binaryType);this.onPacket(r)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,r={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(r)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const r=E6(t);return r.length?"?"+r:""}}class $6 extends Vx{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const r=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let o=0;this._polling&&(o++,this.once("pollComplete",function(){--o||r()})),this.writable||(o++,this.once("drain",function(){--o||r()}))}else r()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const r=o=>{if(this.readyState==="opening"&&o.type==="open"&&this.onOpen(),o.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(o)};m6(t,this.socket.binaryType).forEach(r),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,g6(t,r=>{this.doWrite(r,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",r=this.query||{};return this.opts.timestampRequests!==!1&&(r[this.opts.timestampParam]=nk()),!this.supportsBinary&&!r.sid&&(r.b64=1),this.createUri(t,r)}}let ok=!1;try{ok=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const R6=ok;function P6(){}class M6 extends $6{constructor(t){if(super(t),typeof location<"u"){const r=location.protocol==="https:";let o=location.port;o||(o=r?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||o!==t.port}}doWrite(t,r){const o=this.request({method:"POST",data:t});o.on("success",r),o.on("error",(s,a)=>{this.onError("xhr post error",s,a)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(r,o)=>{this.onError("xhr poll error",r,o)}),this.pollXhr=t}}class en extends gt{constructor(t,r,o){super(),this.createRequest=t,Gd(this,o),this._opts=o,this._method=o.method||"GET",this._uri=r,this._data=o.data!==void 0?o.data:null,this._create()}_create(){var t;const r=rk(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");r.xdomain=!!this._opts.xd;const o=this._xhr=this.createRequest(r);try{o.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){o.setDisableHeaderCheck&&o.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&o.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{o.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{o.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(o),"withCredentials"in o&&(o.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(o.timeout=this._opts.requestTimeout),o.onreadystatechange=()=>{var s;o.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(o.getResponseHeader("set-cookie"))),o.readyState===4&&(o.status===200||o.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof o.status=="number"?o.status:0)},0))},o.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=en.requestsCount++,en.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=P6,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete en.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}en.requestsCount=0;en.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",u0);else if(typeof addEventListener=="function"){const e="onpagehide"in wr?"pagehide":"unload";addEventListener(e,u0,!1)}}function u0(){for(let e in en.requests)en.requests.hasOwnProperty(e)&&en.requests[e].abort()}const O6=function(){const e=ik({xdomain:!1});return e&&e.responseType!==null}();class A6 extends M6{constructor(t){super(t);const r=t&&t.forceBase64;this.supportsBinary=O6&&!r}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new en(ik,this.uri(),t)}}function ik(e){const t=e.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||R6))return new XMLHttpRequest}catch{}if(!t)try{return new wr[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const sk=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class I6 extends Vx{get name(){return"websocket"}doOpen(){const t=this.uri(),r=this.opts.protocols,o=sk?{}:rk(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(o.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,r,o)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let r=0;r<t.length;r++){const o=t[r],s=r===t.length-1;qx(o,this.supportsBinary,a=>{try{this.doWrite(o,a)}catch{}s&&Qd(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",r=this.query||{};return this.opts.timestampRequests&&(r[this.opts.timestampParam]=nk()),this.supportsBinary||(r.b64=1),this.createUri(t,r)}}const Gu=wr.WebSocket||wr.MozWebSocket;class L6 extends I6{createSocket(t,r,o){return sk?new Gu(t,r,o):r?new Gu(t,r):new Gu(t)}doWrite(t,r){this.ws.send(r)}}class D6 extends Vx{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const r=v6(Number.MAX_SAFE_INTEGER,this.socket.binaryType),o=t.readable.pipeThrough(r).getReader(),s=y6();s.readable.pipeTo(t.writable),this._writer=s.writable.getWriter();const a=()=>{o.read().then(({done:c,value:u})=>{c||(this.onPacket(u),a())}).catch(c=>{})};a();const l={type:"open"};this.query.sid&&(l.data=`{"sid":"${this.query.sid}"}`),this._writer.write(l).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let r=0;r<t.length;r++){const o=t[r],s=r===t.length-1;this._writer.write(o).then(()=>{s&&Qd(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const B6={websocket:L6,webtransport:D6,polling:A6},F6=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,N6=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function fh(e){if(e.length>8e3)throw"URI too long";const t=e,r=e.indexOf("["),o=e.indexOf("]");r!=-1&&o!=-1&&(e=e.substring(0,r)+e.substring(r,o).replace(/:/g,";")+e.substring(o,e.length));let s=F6.exec(e||""),a={},l=14;for(;l--;)a[N6[l]]=s[l]||"";return r!=-1&&o!=-1&&(a.source=t,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=U6(a,a.path),a.queryKey=q6(a,a.query),a}function U6(e,t){const r=/\/{2,9}/g,o=t.replace(r,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&o.splice(0,1),t.slice(-1)=="/"&&o.splice(o.length-1,1),o}function q6(e,t){const r={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(o,s,a){s&&(r[s]=a)}),r}const hh=typeof addEventListener=="function"&&typeof removeEventListener=="function",Oc=[];hh&&addEventListener("offline",()=>{Oc.forEach(e=>e())},!1);class so extends gt{constructor(t,r){if(super(),this.binaryType=w6,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(r=t,t=null),t){const o=fh(t);r.hostname=o.host,r.secure=o.protocol==="https"||o.protocol==="wss",r.port=o.port,o.query&&(r.query=o.query)}else r.host&&(r.hostname=fh(r.host).host);Gd(this,r),this.secure=r.secure!=null?r.secure:typeof location<"u"&&location.protocol==="https:",r.hostname&&!r.port&&(r.port=this.secure?"443":"80"),this.hostname=r.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=r.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},r.transports.forEach(o=>{const s=o.prototype.name;this.transports.push(s),this._transportsByName[s]=o}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},r),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=_6(this.opts.query)),hh&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Oc.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const r=Object.assign({},this.opts.query);r.EIO=tk,r.transport=t,this.id&&(r.sid=this.id);const o=Object.assign({},this.opts,{query:r,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](o)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&so.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const r=this.createTransport(t);r.open(),this.setTransport(r)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",r=>this._onClose("transport close",r))}onOpen(){this.readyState="open",so.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const r=new Error("server error");r.code=t.data,this._onError(r);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let r=1;for(let o=0;o<this.writeBuffer.length;o++){const s=this.writeBuffer[o].data;if(s&&(r+=C6(s)),o>0&&r>this._maxPayload)return this.writeBuffer.slice(0,o);r+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,Qd(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,r,o){return this._sendPacket("message",t,r,o),this}send(t,r,o){return this._sendPacket("message",t,r,o),this}_sendPacket(t,r,o,s){if(typeof r=="function"&&(s=r,r=void 0),typeof o=="function"&&(s=o,o=null),this.readyState==="closing"||this.readyState==="closed")return;o=o||{},o.compress=o.compress!==!1;const a={type:t,data:r,options:o};this.emitReserved("packetCreate",a),this.writeBuffer.push(a),s&&this.once("flush",s),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},r=()=>{this.off("upgrade",r),this.off("upgradeError",r),t()},o=()=>{this.once("upgrade",r),this.once("upgradeError",r)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?o():t()}):this.upgrading?o():t()),this}_onError(t){if(so.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,r){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),hh&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const o=Oc.indexOf(this._offlineEventListener);o!==-1&&Oc.splice(o,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,r),this.writeBuffer=[],this._prevBufferLen=0}}}so.protocol=tk;class H6 extends so{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_probe(t){let r=this.createTransport(t),o=!1;so.priorWebsocketSuccess=!1;const s=()=>{o||(r.send([{type:"ping",data:"probe"}]),r.once("packet",h=>{if(!o)if(h.type==="pong"&&h.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",r),!r)return;so.priorWebsocketSuccess=r.name==="websocket",this.transport.pause(()=>{o||this.readyState!=="closed"&&(x(),this.setTransport(r),r.send([{type:"upgrade"}]),this.emitReserved("upgrade",r),r=null,this.upgrading=!1,this.flush())})}else{const m=new Error("probe error");m.transport=r.name,this.emitReserved("upgradeError",m)}}))};function a(){o||(o=!0,x(),r.close(),r=null)}const l=h=>{const m=new Error("probe error: "+h);m.transport=r.name,a(),this.emitReserved("upgradeError",m)};function c(){l("transport closed")}function u(){l("socket closed")}function p(h){r&&h.name!==r.name&&a()}const x=()=>{r.removeListener("open",s),r.removeListener("error",l),r.removeListener("close",c),this.off("close",u),this.off("upgrading",p)};r.once("open",s),r.once("error",l),r.once("close",c),this.once("close",u),this.once("upgrading",p),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{o||r.open()},200):r.open()}onHandshake(t){this._upgrades=this._filterUpgrades(t.upgrades),super.onHandshake(t)}_filterUpgrades(t){const r=[];for(let o=0;o<t.length;o++)~this.transports.indexOf(t[o])&&r.push(t[o]);return r}}let V6=class extends H6{constructor(t,r={}){const o=typeof t=="object"?t:r;(!o.transports||o.transports&&typeof o.transports[0]=="string")&&(o.transports=(o.transports||["polling","websocket","webtransport"]).map(s=>B6[s]).filter(s=>!!s)),super(t,o)}};function Y6(e,t="",r){let o=e;r=r||typeof location<"u"&&location,e==null&&(e=r.protocol+"//"+r.host),typeof e=="string"&&(e.charAt(0)==="/"&&(e.charAt(1)==="/"?e=r.protocol+e:e=r.host+e),/^(https?|wss?):\/\//.test(e)||(typeof r<"u"?e=r.protocol+"//"+e:e="https://"+e),o=fh(e)),o.port||(/^(http|ws)$/.test(o.protocol)?o.port="80":/^(http|ws)s$/.test(o.protocol)&&(o.port="443")),o.path=o.path||"/";const a=o.host.indexOf(":")!==-1?"["+o.host+"]":o.host;return o.id=o.protocol+"://"+a+":"+o.port+t,o.href=o.protocol+"://"+a+(r&&r.port===o.port?"":":"+o.port),o}const W6=typeof ArrayBuffer=="function",K6=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer,ak=Object.prototype.toString,Q6=typeof Blob=="function"||typeof Blob<"u"&&ak.call(Blob)==="[object BlobConstructor]",G6=typeof File=="function"||typeof File<"u"&&ak.call(File)==="[object FileConstructor]";function Yx(e){return W6&&(e instanceof ArrayBuffer||K6(e))||Q6&&e instanceof Blob||G6&&e instanceof File}function Ac(e,t){if(!e||typeof e!="object")return!1;if(Array.isArray(e)){for(let r=0,o=e.length;r<o;r++)if(Ac(e[r]))return!0;return!1}if(Yx(e))return!0;if(e.toJSON&&typeof e.toJSON=="function"&&arguments.length===1)return Ac(e.toJSON(),!0);for(const r in e)if(Object.prototype.hasOwnProperty.call(e,r)&&Ac(e[r]))return!0;return!1}function X6(e){const t=[],r=e.data,o=e;return o.data=xh(r,t),o.attachments=t.length,{packet:o,buffers:t}}function xh(e,t){if(!e)return e;if(Yx(e)){const r={_placeholder:!0,num:t.length};return t.push(e),r}else if(Array.isArray(e)){const r=new Array(e.length);for(let o=0;o<e.length;o++)r[o]=xh(e[o],t);return r}else if(typeof e=="object"&&!(e instanceof Date)){const r={};for(const o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=xh(e[o],t));return r}return e}function J6(e,t){return e.data=gh(e.data,t),delete e.attachments,e}function gh(e,t){if(!e)return e;if(e&&e._placeholder===!0){if(typeof e.num=="number"&&e.num>=0&&e.num<t.length)return t[e.num];throw new Error("illegal attachments")}else if(Array.isArray(e))for(let r=0;r<e.length;r++)e[r]=gh(e[r],t);else if(typeof e=="object")for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(e[r]=gh(e[r],t));return e}const lk=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Z6=5;var Re;(function(e){e[e.CONNECT=0]="CONNECT",e[e.DISCONNECT=1]="DISCONNECT",e[e.EVENT=2]="EVENT",e[e.ACK=3]="ACK",e[e.CONNECT_ERROR=4]="CONNECT_ERROR",e[e.BINARY_EVENT=5]="BINARY_EVENT",e[e.BINARY_ACK=6]="BINARY_ACK"})(Re||(Re={}));class ez{constructor(t){this.replacer=t}encode(t){return(t.type===Re.EVENT||t.type===Re.ACK)&&Ac(t)?this.encodeAsBinary({type:t.type===Re.EVENT?Re.BINARY_EVENT:Re.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let r=""+t.type;return(t.type===Re.BINARY_EVENT||t.type===Re.BINARY_ACK)&&(r+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(r+=t.nsp+","),t.id!=null&&(r+=t.id),t.data!=null&&(r+=JSON.stringify(t.data,this.replacer)),r}encodeAsBinary(t){const r=X6(t),o=this.encodeAsString(r.packet),s=r.buffers;return s.unshift(o),s}}class Wx extends gt{constructor(t){super(),this.reviver=t}add(t){let r;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");r=this.decodeString(t);const o=r.type===Re.BINARY_EVENT;o||r.type===Re.BINARY_ACK?(r.type=o?Re.EVENT:Re.ACK,this.reconstructor=new tz(r),r.attachments===0&&super.emitReserved("decoded",r)):super.emitReserved("decoded",r)}else if(Yx(t)||t.base64)if(this.reconstructor)r=this.reconstructor.takeBinaryData(t),r&&(this.reconstructor=null,super.emitReserved("decoded",r));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let r=0;const o={type:Number(t.charAt(0))};if(Re[o.type]===void 0)throw new Error("unknown packet type "+o.type);if(o.type===Re.BINARY_EVENT||o.type===Re.BINARY_ACK){const a=r+1;for(;t.charAt(++r)!=="-"&&r!=t.length;);const l=t.substring(a,r);if(l!=Number(l)||t.charAt(r)!=="-")throw new Error("Illegal attachments");o.attachments=Number(l)}if(t.charAt(r+1)==="/"){const a=r+1;for(;++r&&!(t.charAt(r)===","||r===t.length););o.nsp=t.substring(a,r)}else o.nsp="/";const s=t.charAt(r+1);if(s!==""&&Number(s)==s){const a=r+1;for(;++r;){const l=t.charAt(r);if(l==null||Number(l)!=l){--r;break}if(r===t.length)break}o.id=Number(t.substring(a,r+1))}if(t.charAt(++r)){const a=this.tryParse(t.substr(r));if(Wx.isPayloadValid(o.type,a))o.data=a;else throw new Error("invalid payload")}return o}tryParse(t){try{return JSON.parse(t,this.reviver)}catch{return!1}}static isPayloadValid(t,r){switch(t){case Re.CONNECT:return gd(r);case Re.DISCONNECT:return r===void 0;case Re.CONNECT_ERROR:return typeof r=="string"||gd(r);case Re.EVENT:case Re.BINARY_EVENT:return Array.isArray(r)&&(typeof r[0]=="number"||typeof r[0]=="string"&&lk.indexOf(r[0])===-1);case Re.ACK:case Re.BINARY_ACK:return Array.isArray(r)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class tz{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const r=J6(this.reconPack,this.buffers);return this.finishedReconstruction(),r}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function rz(e){return typeof e=="string"}const nz=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};function oz(e){return e===void 0||nz(e)}function gd(e){return Object.prototype.toString.call(e)==="[object Object]"}function iz(e,t){switch(e){case Re.CONNECT:return t===void 0||gd(t);case Re.DISCONNECT:return t===void 0;case Re.EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&lk.indexOf(t[0])===-1);case Re.ACK:return Array.isArray(t);case Re.CONNECT_ERROR:return typeof t=="string"||gd(t);default:return!1}}function sz(e){return rz(e.nsp)&&oz(e.id)&&iz(e.type,e.data)}const az=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Wx,Encoder:ez,get PacketType(){return Re},isPacketValid:sz,protocol:Z6},Symbol.toStringTag,{value:"Module"}));function Pr(e,t,r){return e.on(t,r),function(){e.off(t,r)}}const lz=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class ck extends gt{constructor(t,r,o){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=r,o&&o.auth&&(this.auth=o.auth),this._opts=Object.assign({},o),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[Pr(t,"open",this.onopen.bind(this)),Pr(t,"packet",this.onpacket.bind(this)),Pr(t,"error",this.onerror.bind(this)),Pr(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...r){var o,s,a;if(lz.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(r.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(r),this;const l={type:Re.EVENT,data:r};if(l.options={},l.options.compress=this.flags.compress!==!1,typeof r[r.length-1]=="function"){const x=this.ids++,h=r.pop();this._registerAckCallback(x,h),l.id=x}const c=(s=(o=this.io.engine)===null||o===void 0?void 0:o.transport)===null||s===void 0?void 0:s.writable,u=this.connected&&!(!((a=this.io.engine)===null||a===void 0)&&a._hasPingExpired());return this.flags.volatile&&!c||(u?(this.notifyOutgoingListeners(l),this.packet(l)):this.sendBuffer.push(l)),this.flags={},this}_registerAckCallback(t,r){var o;const s=(o=this.flags.timeout)!==null&&o!==void 0?o:this._opts.ackTimeout;if(s===void 0){this.acks[t]=r;return}const a=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let c=0;c<this.sendBuffer.length;c++)this.sendBuffer[c].id===t&&this.sendBuffer.splice(c,1);r.call(this,new Error("operation has timed out"))},s),l=(...c)=>{this.io.clearTimeoutFn(a),r.apply(this,c)};l.withError=!0,this.acks[t]=l}emitWithAck(t,...r){return new Promise((o,s)=>{const a=(l,c)=>l?s(l):o(c);a.withError=!0,r.push(a),this.emit(t,...r)})}_addToQueue(t){let r;typeof t[t.length-1]=="function"&&(r=t.pop());const o={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((s,...a)=>(this._queue[0],s!==null?o.tryCount>this._opts.retries&&(this._queue.shift(),r&&r(s)):(this._queue.shift(),r&&r(null,...a)),o.pending=!1,this._drainQueue())),this._queue.push(o),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const r=this._queue[0];r.pending&&!t||(r.pending=!0,r.tryCount++,this.flags=r.flags,this.emit.apply(this,r.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:Re.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,r){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,r),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(o=>String(o.id)===t)){const o=this.acks[t];delete this.acks[t],o.withError&&o.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case Re.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Re.EVENT:case Re.BINARY_EVENT:this.onevent(t);break;case Re.ACK:case Re.BINARY_ACK:this.onack(t);break;case Re.DISCONNECT:this.ondisconnect();break;case Re.CONNECT_ERROR:this.destroy();const o=new Error(t.data.message);o.data=t.data.data,this.emitReserved("connect_error",o);break}}onevent(t){const r=t.data||[];t.id!=null&&r.push(this.ack(t.id)),this.connected?this.emitEvent(r):this.receiveBuffer.push(Object.freeze(r))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const r=this._anyListeners.slice();for(const o of r)o.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const r=this;let o=!1;return function(...s){o||(o=!0,r.packet({type:Re.ACK,id:t,data:s}))}}onack(t){const r=this.acks[t.id];typeof r=="function"&&(delete this.acks[t.id],r.withError&&t.data.unshift(null),r.apply(this,t.data))}onconnect(t,r){this.id=t,this.recovered=r&&this._pid===r,this._pid=r,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Re.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const r=this._anyListeners;for(let o=0;o<r.length;o++)if(t===r[o])return r.splice(o,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const r=this._anyOutgoingListeners;for(let o=0;o<r.length;o++)if(t===r[o])return r.splice(o,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const r=this._anyOutgoingListeners.slice();for(const o of r)o.apply(this,t.data)}}}function gs(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}gs.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),r=Math.floor(t*this.jitter*e);e=Math.floor(t*10)&1?e+r:e-r}return Math.min(e,this.max)|0};gs.prototype.reset=function(){this.attempts=0};gs.prototype.setMin=function(e){this.ms=e};gs.prototype.setMax=function(e){this.max=e};gs.prototype.setJitter=function(e){this.jitter=e};class mh extends gt{constructor(t,r){var o;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(r=t,t=void 0),r=r||{},r.path=r.path||"/socket.io",this.opts=r,Gd(this,r),this.reconnection(r.reconnection!==!1),this.reconnectionAttempts(r.reconnectionAttempts||1/0),this.reconnectionDelay(r.reconnectionDelay||1e3),this.reconnectionDelayMax(r.reconnectionDelayMax||5e3),this.randomizationFactor((o=r.randomizationFactor)!==null&&o!==void 0?o:.5),this.backoff=new gs({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(r.timeout==null?2e4:r.timeout),this._readyState="closed",this.uri=t;const s=r.parser||az;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=r.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var r;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(r=this.backoff)===null||r===void 0||r.setMin(t),this)}randomizationFactor(t){var r;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(r=this.backoff)===null||r===void 0||r.setJitter(t),this)}reconnectionDelayMax(t){var r;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(r=this.backoff)===null||r===void 0||r.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new V6(this.uri,this.opts);const r=this.engine,o=this;this._readyState="opening",this.skipReconnect=!1;const s=Pr(r,"open",function(){o.onopen(),t&&t()}),a=c=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",c),t?t(c):this.maybeReconnectOnOpen()},l=Pr(r,"error",a);if(this._timeout!==!1){const c=this._timeout,u=this.setTimeoutFn(()=>{s(),a(new Error("timeout")),r.close()},c);this.opts.autoUnref&&u.unref(),this.subs.push(()=>{this.clearTimeoutFn(u)})}return this.subs.push(s),this.subs.push(l),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(Pr(t,"ping",this.onping.bind(this)),Pr(t,"data",this.ondata.bind(this)),Pr(t,"error",this.onerror.bind(this)),Pr(t,"close",this.onclose.bind(this)),Pr(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(r){this.onclose("parse error",r)}}ondecoded(t){Qd(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,r){let o=this.nsps[t];return o?this._autoConnect&&!o.active&&o.connect():(o=new ck(this,t,r),this.nsps[t]=o),o}_destroy(t){const r=Object.keys(this.nsps);for(const o of r)if(this.nsps[o].active)return;this._close()}_packet(t){const r=this.encoder.encode(t);for(let o=0;o<r.length;o++)this.engine.write(r[o],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,r){var o;this.cleanup(),(o=this.engine)===null||o===void 0||o.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,r),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const r=this.backoff.duration();this._reconnecting=!0;const o=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(s=>{s?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",s)):t.onreconnect()}))},r);this.opts.autoUnref&&o.unref(),this.subs.push(()=>{this.clearTimeoutFn(o)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const Is={};function ao(e,t){typeof e=="object"&&(t=e,e=void 0),t=t||{};const r=Y6(e,t.path||"/socket.io"),o=r.source,s=r.id,a=r.path,l=Is[s]&&a in Is[s].nsps,c=t.forceNew||t["force new connection"]||t.multiplex===!1||l;let u;return c?u=new mh(o,t):(Is[s]||(Is[s]=new mh(o,t)),u=Is[s]),r.query&&!t.query&&(t.query=r.queryKey),u.socket(r.path,t)}Object.assign(ao,{Manager:mh,Socket:ck,io:ao,connect:ao});const p0=e=>{let t;const r=new Set,o=(p,x)=>{const h=typeof p=="function"?p(t):p;if(!Object.is(h,t)){const m=t;t=x??(typeof h!="object"||h===null)?h:Object.assign({},t,h),r.forEach(k=>k(t,m))}},s=()=>t,c={setState:o,getState:s,getInitialState:()=>u,subscribe:p=>(r.add(p),()=>r.delete(p))},u=t=e(o,s,c);return c},cz=e=>e?p0(e):p0,dz=e=>e;function uz(e,t=dz){const r=Le.useSyncExternalStore(e.subscribe,Le.useCallback(()=>t(e.getState()),[e,t]),Le.useCallback(()=>t(e.getInitialState()),[e,t]));return Le.useDebugValue(r),r}const f0=e=>{const t=cz(e),r=o=>uz(t,o);return Object.assign(r,t),r},pz=e=>e?f0(e):f0;function fz(e,t){let r;try{r=e()}catch{return}return{getItem:s=>{var a;const l=u=>u===null?null:JSON.parse(u,void 0),c=(a=r.getItem(s))!=null?a:null;return c instanceof Promise?c.then(l):l(c)},setItem:(s,a)=>r.setItem(s,JSON.stringify(a,void 0)),removeItem:s=>r.removeItem(s)}}const yh=e=>t=>{try{const r=e(t);return r instanceof Promise?r:{then(o){return yh(o)(r)},catch(o){return this}}}catch(r){return{then(o){return this},catch(o){return yh(o)(r)}}}},hz=(e,t)=>(r,o,s)=>{let a={storage:fz(()=>window.localStorage),partialize:C=>C,version:0,merge:(C,y)=>({...y,...C}),...t},l=!1,c=0;const u=new Set,p=new Set;let x=a.storage;if(!x)return e((...C)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),r(...C)},o,s);const h=()=>{const C=a.partialize({...o()});return x.setItem(a.name,{state:C,version:a.version})},m=s.setState;s.setState=(C,y)=>(m(C,y),h());const k=e((...C)=>(r(...C),h()),o,s);s.getInitialState=()=>k;let w;const j=()=>{var C,y;if(!x)return;const v=++c;l=!1,u.forEach(g=>{var T;return g((T=o())!=null?T:k)});const b=((y=a.onRehydrateStorage)==null?void 0:y.call(a,(C=o())!=null?C:k))||void 0;return yh(x.getItem.bind(x))(a.name).then(g=>{if(g)if(typeof g.version=="number"&&g.version!==a.version){if(a.migrate){const T=a.migrate(g.state,g.version);return T instanceof Promise?T.then(A=>[!0,A]):[!0,T]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,g.state];return[!1,void 0]}).then(g=>{var T;if(v!==c)return;const[A,B]=g;if(w=a.merge(B,(T=o())!=null?T:k),r(w,!0),A)return h()}).then(()=>{v===c&&(b==null||b(w,void 0),w=o(),l=!0,p.forEach(g=>g(w)))}).catch(g=>{v===c&&(b==null||b(void 0,g))})};return s.persist={setOptions:C=>{a={...a,...C},C.storage&&(x=C.storage)},clearStorage:()=>{x==null||x.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>j(),hasHydrated:()=>l,onHydrate:C=>(u.add(C),()=>{u.delete(C)}),onFinishHydration:C=>(p.add(C),()=>{p.delete(C)})},a.skipHydration||j(),w||k},xz=hz,je=pz(xz(e=>({user:null,token:null,setAuth:(t,r)=>e({user:t,token:r}),updateUser:t=>e(r=>({user:r.user?{...r.user,...t}:null})),logout:()=>e({user:null,token:null})}),{name:"auth-storage"}));function dk(e,t){return function(){return e.apply(t,arguments)}}const{toString:gz}=Object.prototype,{getPrototypeOf:Kx}=Object,{iterator:Xd,toStringTag:uk}=Symbol,Jd=(e=>t=>{const r=gz.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),Fr=e=>(e=e.toLowerCase(),t=>Jd(t)===e),Zd=e=>t=>typeof t===e,{isArray:ms}=Array,ls=Zd("undefined");function ol(e){return e!==null&&!ls(e)&&e.constructor!==null&&!ls(e.constructor)&&tr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const pk=Fr("ArrayBuffer");function mz(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&pk(e.buffer),t}const yz=Zd("string"),tr=Zd("function"),fk=Zd("number"),il=e=>e!==null&&typeof e=="object",vz=e=>e===!0||e===!1,Ic=e=>{if(Jd(e)!=="object")return!1;const t=Kx(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(uk in e)&&!(Xd in e)},bz=e=>{if(!il(e)||ol(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},wz=Fr("Date"),kz=Fr("File"),jz=e=>!!(e&&typeof e.uri<"u"),Sz=e=>e&&typeof e.getParts<"u",Cz=Fr("Blob"),zz=Fr("FileList"),Ez=e=>il(e)&&tr(e.pipe);function _z(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const h0=_z(),x0=typeof h0.FormData<"u"?h0.FormData:void 0,Tz=e=>{let t;return e&&(x0&&e instanceof x0||tr(e.append)&&((t=Jd(e))==="formdata"||t==="object"&&tr(e.toString)&&e.toString()==="[object FormData]"))},$z=Fr("URLSearchParams"),[Rz,Pz,Mz,Oz]=["ReadableStream","Request","Response","Headers"].map(Fr),Az=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function sl(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let o,s;if(typeof e!="object"&&(e=[e]),ms(e))for(o=0,s=e.length;o<s;o++)t.call(null,e[o],o,e);else{if(ol(e))return;const a=r?Object.getOwnPropertyNames(e):Object.keys(e),l=a.length;let c;for(o=0;o<l;o++)c=a[o],t.call(null,e[c],c,e)}}function hk(e,t){if(ol(e))return null;t=t.toLowerCase();const r=Object.keys(e);let o=r.length,s;for(;o-- >0;)if(s=r[o],t===s.toLowerCase())return s;return null}const Po=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,xk=e=>!ls(e)&&e!==Po;function vh(){const{caseless:e,skipUndefined:t}=xk(this)&&this||{},r={},o=(s,a)=>{if(a==="__proto__"||a==="constructor"||a==="prototype")return;const l=e&&hk(r,a)||a;Ic(r[l])&&Ic(s)?r[l]=vh(r[l],s):Ic(s)?r[l]=vh({},s):ms(s)?r[l]=s.slice():(!t||!ls(s))&&(r[l]=s)};for(let s=0,a=arguments.length;s<a;s++)arguments[s]&&sl(arguments[s],o);return r}const Iz=(e,t,r,{allOwnKeys:o}={})=>(sl(t,(s,a)=>{r&&tr(s)?Object.defineProperty(e,a,{value:dk(s,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,a,{value:s,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:o}),e),Lz=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Dz=(e,t,r,o)=>{e.prototype=Object.create(t.prototype,o),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},Bz=(e,t,r,o)=>{let s,a,l;const c={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),a=s.length;a-- >0;)l=s[a],(!o||o(l,e,t))&&!c[l]&&(t[l]=e[l],c[l]=!0);e=r!==!1&&Kx(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},Fz=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const o=e.indexOf(t,r);return o!==-1&&o===r},Nz=e=>{if(!e)return null;if(ms(e))return e;let t=e.length;if(!fk(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},Uz=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&Kx(Uint8Array)),qz=(e,t)=>{const o=(e&&e[Xd]).call(e);let s;for(;(s=o.next())&&!s.done;){const a=s.value;t.call(e,a[0],a[1])}},Hz=(e,t)=>{let r;const o=[];for(;(r=e.exec(t))!==null;)o.push(r);return o},Vz=Fr("HTMLFormElement"),Yz=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,o,s){return o.toUpperCase()+s}),g0=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),Wz=Fr("RegExp"),gk=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),o={};sl(r,(s,a)=>{let l;(l=t(s,a,e))!==!1&&(o[a]=l||s)}),Object.defineProperties(e,o)},Kz=e=>{gk(e,(t,r)=>{if(tr(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const o=e[r];if(tr(o)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},Qz=(e,t)=>{const r={},o=s=>{s.forEach(a=>{r[a]=!0})};return ms(e)?o(e):o(String(e).split(t)),r},Gz=()=>{},Xz=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Jz(e){return!!(e&&tr(e.append)&&e[uk]==="FormData"&&e[Xd])}const Zz=e=>{const t=new Array(10),r=(o,s)=>{if(il(o)){if(t.indexOf(o)>=0)return;if(ol(o))return o;if(!("toJSON"in o)){t[s]=o;const a=ms(o)?[]:{};return sl(o,(l,c)=>{const u=r(l,s+1);!ls(u)&&(a[c]=u)}),t[s]=void 0,a}}return o};return r(e,0)},e8=Fr("AsyncFunction"),t8=e=>e&&(il(e)||tr(e))&&tr(e.then)&&tr(e.catch),mk=((e,t)=>e?setImmediate:t?((r,o)=>(Po.addEventListener("message",({source:s,data:a})=>{s===Po&&a===r&&o.length&&o.shift()()},!1),s=>{o.push(s),Po.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",tr(Po.postMessage)),r8=typeof queueMicrotask<"u"?queueMicrotask.bind(Po):typeof process<"u"&&process.nextTick||mk,n8=e=>e!=null&&tr(e[Xd]),W={isArray:ms,isArrayBuffer:pk,isBuffer:ol,isFormData:Tz,isArrayBufferView:mz,isString:yz,isNumber:fk,isBoolean:vz,isObject:il,isPlainObject:Ic,isEmptyObject:bz,isReadableStream:Rz,isRequest:Pz,isResponse:Mz,isHeaders:Oz,isUndefined:ls,isDate:wz,isFile:kz,isReactNativeBlob:jz,isReactNative:Sz,isBlob:Cz,isRegExp:Wz,isFunction:tr,isStream:Ez,isURLSearchParams:$z,isTypedArray:Uz,isFileList:zz,forEach:sl,merge:vh,extend:Iz,trim:Az,stripBOM:Lz,inherits:Dz,toFlatObject:Bz,kindOf:Jd,kindOfTest:Fr,endsWith:Fz,toArray:Nz,forEachEntry:qz,matchAll:Hz,isHTMLForm:Vz,hasOwnProperty:g0,hasOwnProp:g0,reduceDescriptors:gk,freezeMethods:Kz,toObjectSet:Qz,toCamelCase:Yz,noop:Gz,toFiniteNumber:Xz,findKey:hk,global:Po,isContextDefined:xk,isSpecCompliantForm:Jz,toJSONObject:Zz,isAsyncFn:e8,isThenable:t8,setImmediate:mk,asap:r8,isIterable:n8};let ke=class yk extends Error{static from(t,r,o,s,a,l){const c=new yk(t.message,r||t.code,o,s,a);return c.cause=t,c.name=t.name,t.status!=null&&c.status==null&&(c.status=t.status),l&&Object.assign(c,l),c}constructor(t,r,o,s,a){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),o&&(this.config=o),s&&(this.request=s),a&&(this.response=a,this.status=a.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:W.toJSONObject(this.config),code:this.code,status:this.status}}};ke.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";ke.ERR_BAD_OPTION="ERR_BAD_OPTION";ke.ECONNABORTED="ECONNABORTED";ke.ETIMEDOUT="ETIMEDOUT";ke.ERR_NETWORK="ERR_NETWORK";ke.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";ke.ERR_DEPRECATED="ERR_DEPRECATED";ke.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";ke.ERR_BAD_REQUEST="ERR_BAD_REQUEST";ke.ERR_CANCELED="ERR_CANCELED";ke.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";ke.ERR_INVALID_URL="ERR_INVALID_URL";const o8=null;function bh(e){return W.isPlainObject(e)||W.isArray(e)}function vk(e){return W.endsWith(e,"[]")?e.slice(0,-2):e}function Xu(e,t,r){return e?e.concat(t).map(function(s,a){return s=vk(s),!r&&a?"["+s+"]":s}).join(r?".":""):t}function i8(e){return W.isArray(e)&&!e.some(bh)}const s8=W.toFlatObject(W,{},null,function(t){return/^is[A-Z]/.test(t)});function eu(e,t,r){if(!W.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=W.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(j,C){return!W.isUndefined(C[j])});const o=r.metaTokens,s=r.visitor||x,a=r.dots,l=r.indexes,u=(r.Blob||typeof Blob<"u"&&Blob)&&W.isSpecCompliantForm(t);if(!W.isFunction(s))throw new TypeError("visitor must be a function");function p(w){if(w===null)return"";if(W.isDate(w))return w.toISOString();if(W.isBoolean(w))return w.toString();if(!u&&W.isBlob(w))throw new ke("Blob is not supported. Use a Buffer instead.");return W.isArrayBuffer(w)||W.isTypedArray(w)?u&&typeof Blob=="function"?new Blob([w]):Buffer.from(w):w}function x(w,j,C){let y=w;if(W.isReactNative(t)&&W.isReactNativeBlob(w))return t.append(Xu(C,j,a),p(w)),!1;if(w&&!C&&typeof w=="object"){if(W.endsWith(j,"{}"))j=o?j:j.slice(0,-2),w=JSON.stringify(w);else if(W.isArray(w)&&i8(w)||(W.isFileList(w)||W.endsWith(j,"[]"))&&(y=W.toArray(w)))return j=vk(j),y.forEach(function(b,g){!(W.isUndefined(b)||b===null)&&t.append(l===!0?Xu([j],g,a):l===null?j:j+"[]",p(b))}),!1}return bh(w)?!0:(t.append(Xu(C,j,a),p(w)),!1)}const h=[],m=Object.assign(s8,{defaultVisitor:x,convertValue:p,isVisitable:bh});function k(w,j){if(!W.isUndefined(w)){if(h.indexOf(w)!==-1)throw Error("Circular reference detected in "+j.join("."));h.push(w),W.forEach(w,function(y,v){(!(W.isUndefined(y)||y===null)&&s.call(t,y,W.isString(v)?v.trim():v,j,m))===!0&&k(y,j?j.concat(v):[v])}),h.pop()}}if(!W.isObject(e))throw new TypeError("data must be an object");return k(e),t}function m0(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(o){return t[o]})}function Qx(e,t){this._pairs=[],e&&eu(e,this,t)}const bk=Qx.prototype;bk.append=function(t,r){this._pairs.push([t,r])};bk.toString=function(t){const r=t?function(o){return t.call(this,o,m0)}:m0;return this._pairs.map(function(s){return r(s[0])+"="+r(s[1])},"").join("&")};function a8(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function wk(e,t,r){if(!t)return e;const o=r&&r.encode||a8,s=W.isFunction(r)?{serialize:r}:r,a=s&&s.serialize;let l;if(a?l=a(t,s):l=W.isURLSearchParams(t)?t.toString():new Qx(t,s).toString(o),l){const c=e.indexOf("#");c!==-1&&(e=e.slice(0,c)),e+=(e.indexOf("?")===-1?"?":"&")+l}return e}class y0{constructor(){this.handlers=[]}use(t,r,o){return this.handlers.push({fulfilled:t,rejected:r,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){W.forEach(this.handlers,function(o){o!==null&&t(o)})}}const Gx={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},l8=typeof URLSearchParams<"u"?URLSearchParams:Qx,c8=typeof FormData<"u"?FormData:null,d8=typeof Blob<"u"?Blob:null,u8={isBrowser:!0,classes:{URLSearchParams:l8,FormData:c8,Blob:d8},protocols:["http","https","file","blob","url","data"]},Xx=typeof window<"u"&&typeof document<"u",wh=typeof navigator=="object"&&navigator||void 0,p8=Xx&&(!wh||["ReactNative","NativeScript","NS"].indexOf(wh.product)<0),f8=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",h8=Xx&&window.location.href||"http://localhost",x8=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Xx,hasStandardBrowserEnv:p8,hasStandardBrowserWebWorkerEnv:f8,navigator:wh,origin:h8},Symbol.toStringTag,{value:"Module"})),Dt={...x8,...u8};function g8(e,t){return eu(e,new Dt.classes.URLSearchParams,{visitor:function(r,o,s,a){return Dt.isNode&&W.isBuffer(r)?(this.append(o,r.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...t})}function m8(e){return W.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function y8(e){const t={},r=Object.keys(e);let o;const s=r.length;let a;for(o=0;o<s;o++)a=r[o],t[a]=e[a];return t}function kk(e){function t(r,o,s,a){let l=r[a++];if(l==="__proto__")return!0;const c=Number.isFinite(+l),u=a>=r.length;return l=!l&&W.isArray(s)?s.length:l,u?(W.hasOwnProp(s,l)?s[l]=[s[l],o]:s[l]=o,!c):((!s[l]||!W.isObject(s[l]))&&(s[l]=[]),t(r,o,s[l],a)&&W.isArray(s[l])&&(s[l]=y8(s[l])),!c)}if(W.isFormData(e)&&W.isFunction(e.entries)){const r={};return W.forEachEntry(e,(o,s)=>{t(m8(o),s,r,0)}),r}return null}function v8(e,t,r){if(W.isString(e))try{return(t||JSON.parse)(e),W.trim(e)}catch(o){if(o.name!=="SyntaxError")throw o}return(r||JSON.stringify)(e)}const al={transitional:Gx,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const o=r.getContentType()||"",s=o.indexOf("application/json")>-1,a=W.isObject(t);if(a&&W.isHTMLForm(t)&&(t=new FormData(t)),W.isFormData(t))return s?JSON.stringify(kk(t)):t;if(W.isArrayBuffer(t)||W.isBuffer(t)||W.isStream(t)||W.isFile(t)||W.isBlob(t)||W.isReadableStream(t))return t;if(W.isArrayBufferView(t))return t.buffer;if(W.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(a){if(o.indexOf("application/x-www-form-urlencoded")>-1)return g8(t,this.formSerializer).toString();if((c=W.isFileList(t))||o.indexOf("multipart/form-data")>-1){const u=this.env&&this.env.FormData;return eu(c?{"files[]":t}:t,u&&new u,this.formSerializer)}}return a||s?(r.setContentType("application/json",!1),v8(t)):t}],transformResponse:[function(t){const r=this.transitional||al.transitional,o=r&&r.forcedJSONParsing,s=this.responseType==="json";if(W.isResponse(t)||W.isReadableStream(t))return t;if(t&&W.isString(t)&&(o&&!this.responseType||s)){const l=!(r&&r.silentJSONParsing)&&s;try{return JSON.parse(t,this.parseReviver)}catch(c){if(l)throw c.name==="SyntaxError"?ke.from(c,ke.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Dt.classes.FormData,Blob:Dt.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};W.forEach(["delete","get","head","post","put","patch"],e=>{al.headers[e]={}});const b8=W.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),w8=e=>{const t={};let r,o,s;return e&&e.split(`
`).forEach(function(l){s=l.indexOf(":"),r=l.substring(0,s).trim().toLowerCase(),o=l.substring(s+1).trim(),!(!r||t[r]&&b8[r])&&(r==="set-cookie"?t[r]?t[r].push(o):t[r]=[o]:t[r]=t[r]?t[r]+", "+o:o)}),t},v0=Symbol("internals");function Ls(e){return e&&String(e).trim().toLowerCase()}function Lc(e){return e===!1||e==null?e:W.isArray(e)?e.map(Lc):String(e)}function k8(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=r.exec(e);)t[o[1]]=o[2];return t}const j8=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Ju(e,t,r,o,s){if(W.isFunction(o))return o.call(this,t,r);if(s&&(t=r),!!W.isString(t)){if(W.isString(o))return t.indexOf(o)!==-1;if(W.isRegExp(o))return o.test(t)}}function S8(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,o)=>r.toUpperCase()+o)}function C8(e,t){const r=W.toCamelCase(" "+t);["get","set","has"].forEach(o=>{Object.defineProperty(e,o+r,{value:function(s,a,l){return this[o].call(this,t,s,a,l)},configurable:!0})})}let rr=class{constructor(t){t&&this.set(t)}set(t,r,o){const s=this;function a(c,u,p){const x=Ls(u);if(!x)throw new Error("header name must be a non-empty string");const h=W.findKey(s,x);(!h||s[h]===void 0||p===!0||p===void 0&&s[h]!==!1)&&(s[h||u]=Lc(c))}const l=(c,u)=>W.forEach(c,(p,x)=>a(p,x,u));if(W.isPlainObject(t)||t instanceof this.constructor)l(t,r);else if(W.isString(t)&&(t=t.trim())&&!j8(t))l(w8(t),r);else if(W.isObject(t)&&W.isIterable(t)){let c={},u,p;for(const x of t){if(!W.isArray(x))throw TypeError("Object iterator must return a key-value pair");c[p=x[0]]=(u=c[p])?W.isArray(u)?[...u,x[1]]:[u,x[1]]:x[1]}l(c,r)}else t!=null&&a(r,t,o);return this}get(t,r){if(t=Ls(t),t){const o=W.findKey(this,t);if(o){const s=this[o];if(!r)return s;if(r===!0)return k8(s);if(W.isFunction(r))return r.call(this,s,o);if(W.isRegExp(r))return r.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=Ls(t),t){const o=W.findKey(this,t);return!!(o&&this[o]!==void 0&&(!r||Ju(this,this[o],o,r)))}return!1}delete(t,r){const o=this;let s=!1;function a(l){if(l=Ls(l),l){const c=W.findKey(o,l);c&&(!r||Ju(o,o[c],c,r))&&(delete o[c],s=!0)}}return W.isArray(t)?t.forEach(a):a(t),s}clear(t){const r=Object.keys(this);let o=r.length,s=!1;for(;o--;){const a=r[o];(!t||Ju(this,this[a],a,t,!0))&&(delete this[a],s=!0)}return s}normalize(t){const r=this,o={};return W.forEach(this,(s,a)=>{const l=W.findKey(o,a);if(l){r[l]=Lc(s),delete r[a];return}const c=t?S8(a):String(a).trim();c!==a&&delete r[a],r[c]=Lc(s),o[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return W.forEach(this,(o,s)=>{o!=null&&o!==!1&&(r[s]=t&&W.isArray(o)?o.join(", "):o)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const o=new this(t);return r.forEach(s=>o.set(s)),o}static accessor(t){const o=(this[v0]=this[v0]={accessors:{}}).accessors,s=this.prototype;function a(l){const c=Ls(l);o[c]||(C8(s,l),o[c]=!0)}return W.isArray(t)?t.forEach(a):a(t),this}};rr.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);W.reduceDescriptors(rr.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(o){this[r]=o}}});W.freezeMethods(rr);function Zu(e,t){const r=this||al,o=t||r,s=rr.from(o.headers);let a=o.data;return W.forEach(e,function(c){a=c.call(r,a,s.normalize(),t?t.status:void 0)}),s.normalize(),a}function jk(e){return!!(e&&e.__CANCEL__)}let ll=class extends ke{constructor(t,r,o){super(t??"canceled",ke.ERR_CANCELED,r,o),this.name="CanceledError",this.__CANCEL__=!0}};function Sk(e,t,r){const o=r.config.validateStatus;!r.status||!o||o(r.status)?e(r):t(new ke("Request failed with status code "+r.status,[ke.ERR_BAD_REQUEST,ke.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function z8(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function E8(e,t){e=e||10;const r=new Array(e),o=new Array(e);let s=0,a=0,l;return t=t!==void 0?t:1e3,function(u){const p=Date.now(),x=o[a];l||(l=p),r[s]=u,o[s]=p;let h=a,m=0;for(;h!==s;)m+=r[h++],h=h%e;if(s=(s+1)%e,s===a&&(a=(a+1)%e),p-l<t)return;const k=x&&p-x;return k?Math.round(m*1e3/k):void 0}}function _8(e,t){let r=0,o=1e3/t,s,a;const l=(p,x=Date.now())=>{r=x,s=null,a&&(clearTimeout(a),a=null),e(...p)};return[(...p)=>{const x=Date.now(),h=x-r;h>=o?l(p,x):(s=p,a||(a=setTimeout(()=>{a=null,l(s)},o-h)))},()=>s&&l(s)]}const md=(e,t,r=3)=>{let o=0;const s=E8(50,250);return _8(a=>{const l=a.loaded,c=a.lengthComputable?a.total:void 0,u=l-o,p=s(u),x=l<=c;o=l;const h={loaded:l,total:c,progress:c?l/c:void 0,bytes:u,rate:p||void 0,estimated:p&&c&&x?(c-l)/p:void 0,event:a,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(h)},r)},b0=(e,t)=>{const r=e!=null;return[o=>t[0]({lengthComputable:r,total:e,loaded:o}),t[1]]},w0=e=>(...t)=>W.asap(()=>e(...t)),T8=Dt.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,Dt.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(Dt.origin),Dt.navigator&&/(msie|trident)/i.test(Dt.navigator.userAgent)):()=>!0,$8=Dt.hasStandardBrowserEnv?{write(e,t,r,o,s,a,l){if(typeof document>"u")return;const c=[`${e}=${encodeURIComponent(t)}`];W.isNumber(r)&&c.push(`expires=${new Date(r).toUTCString()}`),W.isString(o)&&c.push(`path=${o}`),W.isString(s)&&c.push(`domain=${s}`),a===!0&&c.push("secure"),W.isString(l)&&c.push(`SameSite=${l}`),document.cookie=c.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function R8(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function P8(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Ck(e,t,r){let o=!R8(t);return e&&(o||r==!1)?P8(e,t):t}const k0=e=>e instanceof rr?{...e}:e;function ei(e,t){t=t||{};const r={};function o(p,x,h,m){return W.isPlainObject(p)&&W.isPlainObject(x)?W.merge.call({caseless:m},p,x):W.isPlainObject(x)?W.merge({},x):W.isArray(x)?x.slice():x}function s(p,x,h,m){if(W.isUndefined(x)){if(!W.isUndefined(p))return o(void 0,p,h,m)}else return o(p,x,h,m)}function a(p,x){if(!W.isUndefined(x))return o(void 0,x)}function l(p,x){if(W.isUndefined(x)){if(!W.isUndefined(p))return o(void 0,p)}else return o(void 0,x)}function c(p,x,h){if(h in t)return o(p,x);if(h in e)return o(void 0,p)}const u={url:a,method:a,data:a,baseURL:l,transformRequest:l,transformResponse:l,paramsSerializer:l,timeout:l,timeoutMessage:l,withCredentials:l,withXSRFToken:l,adapter:l,responseType:l,xsrfCookieName:l,xsrfHeaderName:l,onUploadProgress:l,onDownloadProgress:l,decompress:l,maxContentLength:l,maxBodyLength:l,beforeRedirect:l,transport:l,httpAgent:l,httpsAgent:l,cancelToken:l,socketPath:l,responseEncoding:l,validateStatus:c,headers:(p,x,h)=>s(k0(p),k0(x),h,!0)};return W.forEach(Object.keys({...e,...t}),function(x){if(x==="__proto__"||x==="constructor"||x==="prototype")return;const h=W.hasOwnProp(u,x)?u[x]:s,m=h(e[x],t[x],x);W.isUndefined(m)&&h!==c||(r[x]=m)}),r}const zk=e=>{const t=ei({},e);let{data:r,withXSRFToken:o,xsrfHeaderName:s,xsrfCookieName:a,headers:l,auth:c}=t;if(t.headers=l=rr.from(l),t.url=wk(Ck(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),c&&l.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),W.isFormData(r)){if(Dt.hasStandardBrowserEnv||Dt.hasStandardBrowserWebWorkerEnv)l.setContentType(void 0);else if(W.isFunction(r.getHeaders)){const u=r.getHeaders(),p=["content-type","content-length"];Object.entries(u).forEach(([x,h])=>{p.includes(x.toLowerCase())&&l.set(x,h)})}}if(Dt.hasStandardBrowserEnv&&(o&&W.isFunction(o)&&(o=o(t)),o||o!==!1&&T8(t.url))){const u=s&&a&&$8.read(a);u&&l.set(s,u)}return t},M8=typeof XMLHttpRequest<"u",O8=M8&&function(e){return new Promise(function(r,o){const s=zk(e);let a=s.data;const l=rr.from(s.headers).normalize();let{responseType:c,onUploadProgress:u,onDownloadProgress:p}=s,x,h,m,k,w;function j(){k&&k(),w&&w(),s.cancelToken&&s.cancelToken.unsubscribe(x),s.signal&&s.signal.removeEventListener("abort",x)}let C=new XMLHttpRequest;C.open(s.method.toUpperCase(),s.url,!0),C.timeout=s.timeout;function y(){if(!C)return;const b=rr.from("getAllResponseHeaders"in C&&C.getAllResponseHeaders()),T={data:!c||c==="text"||c==="json"?C.responseText:C.response,status:C.status,statusText:C.statusText,headers:b,config:e,request:C};Sk(function(B){r(B),j()},function(B){o(B),j()},T),C=null}"onloadend"in C?C.onloadend=y:C.onreadystatechange=function(){!C||C.readyState!==4||C.status===0&&!(C.responseURL&&C.responseURL.indexOf("file:")===0)||setTimeout(y)},C.onabort=function(){C&&(o(new ke("Request aborted",ke.ECONNABORTED,e,C)),C=null)},C.onerror=function(g){const T=g&&g.message?g.message:"Network Error",A=new ke(T,ke.ERR_NETWORK,e,C);A.event=g||null,o(A),C=null},C.ontimeout=function(){let g=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const T=s.transitional||Gx;s.timeoutErrorMessage&&(g=s.timeoutErrorMessage),o(new ke(g,T.clarifyTimeoutError?ke.ETIMEDOUT:ke.ECONNABORTED,e,C)),C=null},a===void 0&&l.setContentType(null),"setRequestHeader"in C&&W.forEach(l.toJSON(),function(g,T){C.setRequestHeader(T,g)}),W.isUndefined(s.withCredentials)||(C.withCredentials=!!s.withCredentials),c&&c!=="json"&&(C.responseType=s.responseType),p&&([m,w]=md(p,!0),C.addEventListener("progress",m)),u&&C.upload&&([h,k]=md(u),C.upload.addEventListener("progress",h),C.upload.addEventListener("loadend",k)),(s.cancelToken||s.signal)&&(x=b=>{C&&(o(!b||b.type?new ll(null,e,C):b),C.abort(),C=null)},s.cancelToken&&s.cancelToken.subscribe(x),s.signal&&(s.signal.aborted?x():s.signal.addEventListener("abort",x)));const v=z8(s.url);if(v&&Dt.protocols.indexOf(v)===-1){o(new ke("Unsupported protocol "+v+":",ke.ERR_BAD_REQUEST,e));return}C.send(a||null)})},A8=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let o=new AbortController,s;const a=function(p){if(!s){s=!0,c();const x=p instanceof Error?p:this.reason;o.abort(x instanceof ke?x:new ll(x instanceof Error?x.message:x))}};let l=t&&setTimeout(()=>{l=null,a(new ke(`timeout of ${t}ms exceeded`,ke.ETIMEDOUT))},t);const c=()=>{e&&(l&&clearTimeout(l),l=null,e.forEach(p=>{p.unsubscribe?p.unsubscribe(a):p.removeEventListener("abort",a)}),e=null)};e.forEach(p=>p.addEventListener("abort",a));const{signal:u}=o;return u.unsubscribe=()=>W.asap(c),u}},I8=function*(e,t){let r=e.byteLength;if(r<t){yield e;return}let o=0,s;for(;o<r;)s=o+t,yield e.slice(o,s),o=s},L8=async function*(e,t){for await(const r of D8(e))yield*I8(r,t)},D8=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:o}=await t.read();if(r)break;yield o}}finally{await t.cancel()}},j0=(e,t,r,o)=>{const s=L8(e,t);let a=0,l,c=u=>{l||(l=!0,o&&o(u))};return new ReadableStream({async pull(u){try{const{done:p,value:x}=await s.next();if(p){c(),u.close();return}let h=x.byteLength;if(r){let m=a+=h;r(m)}u.enqueue(new Uint8Array(x))}catch(p){throw c(p),p}},cancel(u){return c(u),s.return()}},{highWaterMark:2})},S0=64*1024,{isFunction:Kl}=W,B8=(({Request:e,Response:t})=>({Request:e,Response:t}))(W.global),{ReadableStream:C0,TextEncoder:z0}=W.global,E0=(e,...t)=>{try{return!!e(...t)}catch{return!1}},F8=e=>{e=W.merge.call({skipUndefined:!0},B8,e);const{fetch:t,Request:r,Response:o}=e,s=t?Kl(t):typeof fetch=="function",a=Kl(r),l=Kl(o);if(!s)return!1;const c=s&&Kl(C0),u=s&&(typeof z0=="function"?(w=>j=>w.encode(j))(new z0):async w=>new Uint8Array(await new r(w).arrayBuffer())),p=a&&c&&E0(()=>{let w=!1;const j=new r(Dt.origin,{body:new C0,method:"POST",get duplex(){return w=!0,"half"}}).headers.has("Content-Type");return w&&!j}),x=l&&c&&E0(()=>W.isReadableStream(new o("").body)),h={stream:x&&(w=>w.body)};s&&["text","arrayBuffer","blob","formData","stream"].forEach(w=>{!h[w]&&(h[w]=(j,C)=>{let y=j&&j[w];if(y)return y.call(j);throw new ke(`Response type '${w}' is not supported`,ke.ERR_NOT_SUPPORT,C)})});const m=async w=>{if(w==null)return 0;if(W.isBlob(w))return w.size;if(W.isSpecCompliantForm(w))return(await new r(Dt.origin,{method:"POST",body:w}).arrayBuffer()).byteLength;if(W.isArrayBufferView(w)||W.isArrayBuffer(w))return w.byteLength;if(W.isURLSearchParams(w)&&(w=w+""),W.isString(w))return(await u(w)).byteLength},k=async(w,j)=>{const C=W.toFiniteNumber(w.getContentLength());return C??m(j)};return async w=>{let{url:j,method:C,data:y,signal:v,cancelToken:b,timeout:g,onDownloadProgress:T,onUploadProgress:A,responseType:B,headers:z,withCredentials:H="same-origin",fetchOptions:D}=zk(w),U=t||fetch;B=B?(B+"").toLowerCase():"text";let M=A8([v,b&&b.toAbortSignal()],g),I=null;const P=M&&M.unsubscribe&&(()=>{M.unsubscribe()});let E;try{if(A&&p&&C!=="get"&&C!=="head"&&(E=await k(z,y))!==0){let O=new r(j,{method:"POST",body:y,duplex:"half"}),S;if(W.isFormData(y)&&(S=O.headers.get("content-type"))&&z.setContentType(S),O.body){const[N,Q]=b0(E,md(w0(A)));y=j0(O.body,S0,N,Q)}}W.isString(H)||(H=H?"include":"omit");const _=a&&"credentials"in r.prototype,R={...D,signal:M,method:C.toUpperCase(),headers:z.normalize().toJSON(),body:y,duplex:"half",credentials:_?H:void 0};I=a&&new r(j,R);let $=await(a?U(I,D):U(j,R));const F=x&&(B==="stream"||B==="response");if(x&&(T||F&&P)){const O={};["status","statusText","headers"].forEach(X=>{O[X]=$[X]});const S=W.toFiniteNumber($.headers.get("content-length")),[N,Q]=T&&b0(S,md(w0(T),!0))||[];$=new o(j0($.body,S0,N,()=>{Q&&Q(),P&&P()}),O)}B=B||"text";let L=await h[W.findKey(h,B)||"text"]($,w);return!F&&P&&P(),await new Promise((O,S)=>{Sk(O,S,{data:L,headers:rr.from($.headers),status:$.status,statusText:$.statusText,config:w,request:I})})}catch(_){throw P&&P(),_&&_.name==="TypeError"&&/Load failed|fetch/i.test(_.message)?Object.assign(new ke("Network Error",ke.ERR_NETWORK,w,I,_&&_.response),{cause:_.cause||_}):ke.from(_,_&&_.code,w,I,_&&_.response)}}},N8=new Map,Ek=e=>{let t=e&&e.env||{};const{fetch:r,Request:o,Response:s}=t,a=[o,s,r];let l=a.length,c=l,u,p,x=N8;for(;c--;)u=a[c],p=x.get(u),p===void 0&&x.set(u,p=c?new Map:F8(t)),x=p;return p};Ek();const Jx={http:o8,xhr:O8,fetch:{get:Ek}};W.forEach(Jx,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const _0=e=>`- ${e}`,U8=e=>W.isFunction(e)||e===null||e===!1;function q8(e,t){e=W.isArray(e)?e:[e];const{length:r}=e;let o,s;const a={};for(let l=0;l<r;l++){o=e[l];let c;if(s=o,!U8(o)&&(s=Jx[(c=String(o)).toLowerCase()],s===void 0))throw new ke(`Unknown adapter '${c}'`);if(s&&(W.isFunction(s)||(s=s.get(t))))break;a[c||"#"+l]=s}if(!s){const l=Object.entries(a).map(([u,p])=>`adapter ${u} `+(p===!1?"is not supported by the environment":"is not available in the build"));let c=r?l.length>1?`since :
`+l.map(_0).join(`
`):" "+_0(l[0]):"as no adapter specified";throw new ke("There is no suitable adapter to dispatch the request "+c,"ERR_NOT_SUPPORT")}return s}const _k={getAdapter:q8,adapters:Jx};function ep(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ll(null,e)}function T0(e){return ep(e),e.headers=rr.from(e.headers),e.data=Zu.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),_k.getAdapter(e.adapter||al.adapter,e)(e).then(function(o){return ep(e),o.data=Zu.call(e,e.transformResponse,o),o.headers=rr.from(o.headers),o},function(o){return jk(o)||(ep(e),o&&o.response&&(o.response.data=Zu.call(e,e.transformResponse,o.response),o.response.headers=rr.from(o.response.headers))),Promise.reject(o)})}const Tk="1.13.6",tu={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{tu[e]=function(o){return typeof o===e||"a"+(t<1?"n ":" ")+e}});const $0={};tu.transitional=function(t,r,o){function s(a,l){return"[Axios v"+Tk+"] Transitional option '"+a+"'"+l+(o?". "+o:"")}return(a,l,c)=>{if(t===!1)throw new ke(s(l," has been removed"+(r?" in "+r:"")),ke.ERR_DEPRECATED);return r&&!$0[l]&&($0[l]=!0,console.warn(s(l," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(a,l,c):!0}};tu.spelling=function(t){return(r,o)=>(console.warn(`${o} is likely a misspelling of ${t}`),!0)};function H8(e,t,r){if(typeof e!="object")throw new ke("options must be an object",ke.ERR_BAD_OPTION_VALUE);const o=Object.keys(e);let s=o.length;for(;s-- >0;){const a=o[s],l=t[a];if(l){const c=e[a],u=c===void 0||l(c,a,e);if(u!==!0)throw new ke("option "+a+" must be "+u,ke.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new ke("Unknown option "+a,ke.ERR_BAD_OPTION)}}const Dc={assertOptions:H8,validators:tu},gr=Dc.validators;let Vo=class{constructor(t){this.defaults=t||{},this.interceptors={request:new y0,response:new y0}}async request(t,r){try{return await this._request(t,r)}catch(o){if(o instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const a=s.stack?s.stack.replace(/^.+\n/,""):"";try{o.stack?a&&!String(o.stack).endsWith(a.replace(/^.+\n.+\n/,""))&&(o.stack+=`
`+a):o.stack=a}catch{}}throw o}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=ei(this.defaults,r);const{transitional:o,paramsSerializer:s,headers:a}=r;o!==void 0&&Dc.assertOptions(o,{silentJSONParsing:gr.transitional(gr.boolean),forcedJSONParsing:gr.transitional(gr.boolean),clarifyTimeoutError:gr.transitional(gr.boolean),legacyInterceptorReqResOrdering:gr.transitional(gr.boolean)},!1),s!=null&&(W.isFunction(s)?r.paramsSerializer={serialize:s}:Dc.assertOptions(s,{encode:gr.function,serialize:gr.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),Dc.assertOptions(r,{baseUrl:gr.spelling("baseURL"),withXsrfToken:gr.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let l=a&&W.merge(a.common,a[r.method]);a&&W.forEach(["delete","get","head","post","put","patch","common"],w=>{delete a[w]}),r.headers=rr.concat(l,a);const c=[];let u=!0;this.interceptors.request.forEach(function(j){if(typeof j.runWhen=="function"&&j.runWhen(r)===!1)return;u=u&&j.synchronous;const C=r.transitional||Gx;C&&C.legacyInterceptorReqResOrdering?c.unshift(j.fulfilled,j.rejected):c.push(j.fulfilled,j.rejected)});const p=[];this.interceptors.response.forEach(function(j){p.push(j.fulfilled,j.rejected)});let x,h=0,m;if(!u){const w=[T0.bind(this),void 0];for(w.unshift(...c),w.push(...p),m=w.length,x=Promise.resolve(r);h<m;)x=x.then(w[h++],w[h++]);return x}m=c.length;let k=r;for(;h<m;){const w=c[h++],j=c[h++];try{k=w(k)}catch(C){j.call(this,C);break}}try{x=T0.call(this,k)}catch(w){return Promise.reject(w)}for(h=0,m=p.length;h<m;)x=x.then(p[h++],p[h++]);return x}getUri(t){t=ei(this.defaults,t);const r=Ck(t.baseURL,t.url,t.allowAbsoluteUrls);return wk(r,t.params,t.paramsSerializer)}};W.forEach(["delete","get","head","options"],function(t){Vo.prototype[t]=function(r,o){return this.request(ei(o||{},{method:t,url:r,data:(o||{}).data}))}});W.forEach(["post","put","patch"],function(t){function r(o){return function(a,l,c){return this.request(ei(c||{},{method:t,headers:o?{"Content-Type":"multipart/form-data"}:{},url:a,data:l}))}}Vo.prototype[t]=r(),Vo.prototype[t+"Form"]=r(!0)});let V8=class $k{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(a){r=a});const o=this;this.promise.then(s=>{if(!o._listeners)return;let a=o._listeners.length;for(;a-- >0;)o._listeners[a](s);o._listeners=null}),this.promise.then=s=>{let a;const l=new Promise(c=>{o.subscribe(c),a=c}).then(s);return l.cancel=function(){o.unsubscribe(a)},l},t(function(a,l,c){o.reason||(o.reason=new ll(a,l,c),r(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=o=>{t.abort(o)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new $k(function(s){t=s}),cancel:t}}};function Y8(e){return function(r){return e.apply(null,r)}}function W8(e){return W.isObject(e)&&e.isAxiosError===!0}const kh={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(kh).forEach(([e,t])=>{kh[t]=e});function Rk(e){const t=new Vo(e),r=dk(Vo.prototype.request,t);return W.extend(r,Vo.prototype,t,{allOwnKeys:!0}),W.extend(r,t,null,{allOwnKeys:!0}),r.create=function(s){return Rk(ei(e,s))},r}const Ge=Rk(al);Ge.Axios=Vo;Ge.CanceledError=ll;Ge.CancelToken=V8;Ge.isCancel=jk;Ge.VERSION=Tk;Ge.toFormData=eu;Ge.AxiosError=ke;Ge.Cancel=Ge.CanceledError;Ge.all=function(t){return Promise.all(t)};Ge.spread=Y8;Ge.isAxiosError=W8;Ge.mergeConfig=ei;Ge.AxiosHeaders=rr;Ge.formToJSON=e=>kk(W.isHTMLForm(e)?new FormData(e):e);Ge.getAdapter=_k.getAdapter;Ge.HttpStatusCode=kh;Ge.default=Ge;const{Axios:pD,AxiosError:fD,CanceledError:hD,isCancel:xD,CancelToken:gD,VERSION:mD,all:yD,Cancel:vD,isAxiosError:bD,spread:wD,toFormData:kD,AxiosHeaders:jD,HttpStatusCode:SD,formToJSON:CD,getAdapter:zD,mergeConfig:ED}=Ge;let K8={data:""},Q8=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||K8},G8=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,X8=/\/\*[^]*?\*\/|  +/g,R0=/\n+/g,Fn=(e,t)=>{let r="",o="",s="";for(let a in e){let l=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+l+";":o+=a[1]=="f"?Fn(l,a):a+"{"+Fn(l,a[1]=="k"?"":t)+"}":typeof l=="object"?o+=Fn(l,t?t.replace(/([^,])+/g,c=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,c):c?c+" "+u:u)):a):l!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=Fn.p?Fn.p(a,l):a+":"+l+";")}return r+(t&&s?t+"{"+s+"}":s)+o},on={},Pk=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+Pk(e[r]);return t}return e},J8=(e,t,r,o,s)=>{let a=Pk(e),l=on[a]||(on[a]=(u=>{let p=0,x=11;for(;p<u.length;)x=101*x+u.charCodeAt(p++)>>>0;return"go"+x})(a));if(!on[l]){let u=a!==e?e:(p=>{let x,h,m=[{}];for(;x=G8.exec(p.replace(X8,""));)x[4]?m.shift():x[3]?(h=x[3].replace(R0," ").trim(),m.unshift(m[0][h]=m[0][h]||{})):m[0][x[1]]=x[2].replace(R0," ").trim();return m[0]})(e);on[l]=Fn(s?{["@keyframes "+l]:u}:u,r?"":"."+l)}let c=r&&on.g?on.g:null;return r&&(on.g=on[l]),((u,p,x,h)=>{h?p.data=p.data.replace(h,u):p.data.indexOf(u)===-1&&(p.data=x?u+p.data:p.data+u)})(on[l],t,o,c),l},Z8=(e,t,r)=>e.reduce((o,s,a)=>{let l=t[a];if(l&&l.call){let c=l(r),u=c&&c.props&&c.props.className||/^go/.test(c)&&c;l=u?"."+u:c&&typeof c=="object"?c.props?"":Fn(c,""):c===!1?"":c}return o+s+(l??"")},"");function ru(e){let t=this||{},r=e.call?e(t.p):e;return J8(r.unshift?r.raw?Z8(r,[].slice.call(arguments,1),t.p):r.reduce((o,s)=>Object.assign(o,s&&s.call?s(t.p):s),{}):r,Q8(t.target),t.g,t.o,t.k)}let Mk,jh,Sh;ru.bind({g:1});let Sn=ru.bind({k:1});function eE(e,t,r,o){Fn.p=t,Mk=e,jh=r,Sh=o}function mo(e,t){let r=this||{};return function(){let o=arguments;function s(a,l){let c=Object.assign({},a),u=c.className||s.className;r.p=Object.assign({theme:jh&&jh()},c),r.o=/ *go\d+/.test(u),c.className=ru.apply(r,o)+(u?" "+u:"");let p=e;return e[0]&&(p=c.as||e,delete c.as),Sh&&p[0]&&Sh(c),Mk(p,c)}return s}}var tE=e=>typeof e=="function",yd=(e,t)=>tE(e)?e(t):e,rE=(()=>{let e=0;return()=>(++e).toString()})(),Ok=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),nE=20,Zx="default",Ak=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(l=>l.id===t.toast.id?{...l,...t.toast}:l)};case 2:let{toast:o}=t;return Ak(e,{type:e.toasts.find(l=>l.id===o.id)?1:0,toast:o});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(l=>l.id===s||s===void 0?{...l,dismissed:!0,visible:!1}:l)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(l=>l.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(l=>({...l,pauseDuration:l.pauseDuration+a}))}}},Bc=[],Ik={toasts:[],pausedAt:void 0,settings:{toastLimit:nE}},Xr={},Lk=(e,t=Zx)=>{Xr[t]=Ak(Xr[t]||Ik,e),Bc.forEach(([r,o])=>{r===t&&o(Xr[t])})},Dk=e=>Object.keys(Xr).forEach(t=>Lk(e,t)),oE=e=>Object.keys(Xr).find(t=>Xr[t].toasts.some(r=>r.id===e)),nu=(e=Zx)=>t=>{Lk(t,e)},iE={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},sE=(e={},t=Zx)=>{let[r,o]=f.useState(Xr[t]||Ik),s=f.useRef(Xr[t]);f.useEffect(()=>(s.current!==Xr[t]&&o(Xr[t]),Bc.push([t,o]),()=>{let l=Bc.findIndex(([c])=>c===t);l>-1&&Bc.splice(l,1)}),[t]);let a=r.toasts.map(l=>{var c,u,p;return{...e,...e[l.type],...l,removeDelay:l.removeDelay||((c=e[l.type])==null?void 0:c.removeDelay)||(e==null?void 0:e.removeDelay),duration:l.duration||((u=e[l.type])==null?void 0:u.duration)||(e==null?void 0:e.duration)||iE[l.type],style:{...e.style,...(p=e[l.type])==null?void 0:p.style,...l.style}}});return{...r,toasts:a}},aE=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||rE()}),cl=e=>(t,r)=>{let o=aE(t,e,r);return nu(o.toasterId||oE(o.id))({type:2,toast:o}),o.id},Ne=(e,t)=>cl("blank")(e,t);Ne.error=cl("error");Ne.success=cl("success");Ne.loading=cl("loading");Ne.custom=cl("custom");Ne.dismiss=(e,t)=>{let r={type:3,toastId:e};t?nu(t)(r):Dk(r)};Ne.dismissAll=e=>Ne.dismiss(void 0,e);Ne.remove=(e,t)=>{let r={type:4,toastId:e};t?nu(t)(r):Dk(r)};Ne.removeAll=e=>Ne.remove(void 0,e);Ne.promise=(e,t,r)=>{let o=Ne.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let a=t.success?yd(t.success,s):void 0;return a?Ne.success(a,{id:o,...r,...r==null?void 0:r.success}):Ne.dismiss(o),s}).catch(s=>{let a=t.error?yd(t.error,s):void 0;a?Ne.error(a,{id:o,...r,...r==null?void 0:r.error}):Ne.dismiss(o)}),e};var lE=1e3,cE=(e,t="default")=>{let{toasts:r,pausedAt:o}=sE(e,t),s=f.useRef(new Map).current,a=f.useCallback((h,m=lE)=>{if(s.has(h))return;let k=setTimeout(()=>{s.delete(h),l({type:4,toastId:h})},m);s.set(h,k)},[]);f.useEffect(()=>{if(o)return;let h=Date.now(),m=r.map(k=>{if(k.duration===1/0)return;let w=(k.duration||0)+k.pauseDuration-(h-k.createdAt);if(w<0){k.visible&&Ne.dismiss(k.id);return}return setTimeout(()=>Ne.dismiss(k.id,t),w)});return()=>{m.forEach(k=>k&&clearTimeout(k))}},[r,o,t]);let l=f.useCallback(nu(t),[t]),c=f.useCallback(()=>{l({type:5,time:Date.now()})},[l]),u=f.useCallback((h,m)=>{l({type:1,toast:{id:h,height:m}})},[l]),p=f.useCallback(()=>{o&&l({type:6,time:Date.now()})},[o,l]),x=f.useCallback((h,m)=>{let{reverseOrder:k=!1,gutter:w=8,defaultPosition:j}=m||{},C=r.filter(b=>(b.position||j)===(h.position||j)&&b.height),y=C.findIndex(b=>b.id===h.id),v=C.filter((b,g)=>g<y&&b.visible).length;return C.filter(b=>b.visible).slice(...k?[v+1]:[0,v]).reduce((b,g)=>b+(g.height||0)+w,0)},[r]);return f.useEffect(()=>{r.forEach(h=>{if(h.dismissed)a(h.id,h.removeDelay);else{let m=s.get(h.id);m&&(clearTimeout(m),s.delete(h.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:u,startPause:c,endPause:p,calculateOffset:x}}},dE=Sn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,uE=Sn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,pE=Sn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,fE=mo("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${dE} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${uE} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${pE} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,hE=Sn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,xE=mo("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${hE} 1s linear infinite;
`,gE=Sn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,mE=Sn`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,yE=mo("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${gE} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${mE} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,vE=mo("div")`
  position: absolute;
`,bE=mo("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,wE=Sn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,kE=mo("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${wE} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,jE=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?f.createElement(kE,null,t):t:r==="blank"?null:f.createElement(bE,null,f.createElement(xE,{...o}),r!=="loading"&&f.createElement(vE,null,r==="error"?f.createElement(fE,{...o}):f.createElement(yE,{...o})))},SE=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,CE=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,zE="0%{opacity:0;} 100%{opacity:1;}",EE="0%{opacity:1;} 100%{opacity:0;}",_E=mo("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,TE=mo("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,$E=(e,t)=>{let r=e.includes("top")?1:-1,[o,s]=Ok()?[zE,EE]:[SE(r),CE(r)];return{animation:t?`${Sn(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Sn(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},RE=f.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?$E(e.position||t||"top-center",e.visible):{opacity:0},a=f.createElement(jE,{toast:e}),l=f.createElement(TE,{...e.ariaProps},yd(e.message,e));return f.createElement(_E,{className:e.className,style:{...s,...r,...e.style}},typeof o=="function"?o({icon:a,message:l}):f.createElement(f.Fragment,null,a,l))});eE(f.createElement);var PE=({id:e,className:t,style:r,onHeightUpdate:o,children:s})=>{let a=f.useCallback(l=>{if(l){let c=()=>{let u=l.getBoundingClientRect().height;o(e,u)};c(),new MutationObserver(c).observe(l,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return f.createElement("div",{ref:a,className:t,style:r},s)},ME=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Ok()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...s}},OE=ru`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Ql=16,AE=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:s,toasterId:a,containerStyle:l,containerClassName:c})=>{let{toasts:u,handlers:p}=cE(r,a);return f.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:Ql,left:Ql,right:Ql,bottom:Ql,pointerEvents:"none",...l},className:c,onMouseEnter:p.startPause,onMouseLeave:p.endPause},u.map(x=>{let h=x.position||t,m=p.calculateOffset(x,{reverseOrder:e,gutter:o,defaultPosition:t}),k=ME(h,m);return f.createElement(PE,{id:x.id,key:x.id,onHeightUpdate:p.updateHeight,className:x.visible?OE:"",style:k},x.type==="custom"?yd(x.message,x):s?s(x):f.createElement(RE,{toast:x,position:h}))}))},He=Ne;const IE="http://localhost:3000",be=Ge.create({baseURL:IE});be.interceptors.request.use(e=>{const t=je.getState().token;return t&&(e.headers.Authorization=`Bearer ${t}`),e});be.interceptors.response.use(e=>e,e=>{var r;e.config;const t=(r=e.response)==null?void 0:r.status;if(t===401){const{logout:o}=je.getState();o(),window.location.href="/login"}return t===429&&He.error("Siz juda ko'p so'rov yubordingiz. Iltimos birozdan so'ng urinib ko'ring."),Promise.reject(e)});const Bk=async e=>{const{data:t}=await be.post("/chats/upload-avatar",e);return t},Fk=async({chatId:e,formData:t})=>{const{data:r}=await be.post(`/chats/${e}/avatar`,t);return r},Nk=async()=>{const{data:e}=await be.get("/chats");return e},Uk=async e=>{const{data:t}=await be.post("/chats",e);return t},qk=async({chatId:e,dto:t})=>{const{data:r}=await be.patch(`/chats/${e}`,t);return r},Hk=async(e,t=1,r=30)=>{const{data:o}=await be.get(`/chats/${e}/messages?page=${t}&limit=${r}`);return o},Vk=async({chatId:e,content:t,replayToId:r})=>{const{data:o}=await be.post(`/chats/${e}/messages`,{content:t,replayToId:r});return o},Yk=async e=>{await be.delete(`/chats/messages/${e}`)},Wk=async e=>{const{data:t}=await be.get(`/chats/resolve/${e}`);return t},Kk=async e=>{const{data:t}=await be.get(`/chats/preview/${e}`);return t},Qk=async e=>{const{data:t}=await be.post(`/chats/${e}/join-link`);return t},Gk=async e=>{const{data:t}=await be.get(`/users/search?q=${e}`);return t},Xk=async e=>{const{data:t}=await be.get(`/users/by-username/${e}`);return t},Jk=async()=>{const{data:e}=await be.get("/users");return e},LE=async e=>{const{data:t}=await be.get(`/users/${e}/profile`);return t},tp=Object.freeze(Object.defineProperty({__proto__:null,createChat:Uk,deleteMessage:Yk,editChat:qk,fetchChats:Nk,fetchMessages:Hk,getAllUsers:Jk,getPublicProfile:LE,getUserByUsername:Xk,joinGroupChat:Qk,previewGroupChat:Kk,resolveChatSlug:Wk,searchUsers:Gk,sendMessage:Vk,updateGroupAvatar:Fk,uploadAvatar:Bk},Symbol.toStringTag,{value:"Module"}));var Zk={exports:{}};(function(e,t){(function(r,o){e.exports=o()})(Th,function(){var r=1e3,o=6e4,s=36e5,a="millisecond",l="second",c="minute",u="hour",p="day",x="week",h="month",m="quarter",k="year",w="date",j="Invalid Date",C=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(P){var E=["th","st","nd","rd"],_=P%100;return"["+P+(E[(_-20)%10]||E[_]||E[0])+"]"}},b=function(P,E,_){var R=String(P);return!R||R.length>=E?P:""+Array(E+1-R.length).join(_)+P},g={s:b,z:function(P){var E=-P.utcOffset(),_=Math.abs(E),R=Math.floor(_/60),$=_%60;return(E<=0?"+":"-")+b(R,2,"0")+":"+b($,2,"0")},m:function P(E,_){if(E.date()<_.date())return-P(_,E);var R=12*(_.year()-E.year())+(_.month()-E.month()),$=E.clone().add(R,h),F=_-$<0,L=E.clone().add(R+(F?-1:1),h);return+(-(R+(_-$)/(F?$-L:L-$))||0)},a:function(P){return P<0?Math.ceil(P)||0:Math.floor(P)},p:function(P){return{M:h,y:k,w:x,d:p,D:w,h:u,m:c,s:l,ms:a,Q:m}[P]||String(P||"").toLowerCase().replace(/s$/,"")},u:function(P){return P===void 0}},T="en",A={};A[T]=v;var B="$isDayjsObject",z=function(P){return P instanceof M||!(!P||!P[B])},H=function P(E,_,R){var $;if(!E)return T;if(typeof E=="string"){var F=E.toLowerCase();A[F]&&($=F),_&&(A[F]=_,$=F);var L=E.split("-");if(!$&&L.length>1)return P(L[0])}else{var O=E.name;A[O]=E,$=O}return!R&&$&&(T=$),$||!R&&T},D=function(P,E){if(z(P))return P.clone();var _=typeof E=="object"?E:{};return _.date=P,_.args=arguments,new M(_)},U=g;U.l=H,U.i=z,U.w=function(P,E){return D(P,{locale:E.$L,utc:E.$u,x:E.$x,$offset:E.$offset})};var M=function(){function P(_){this.$L=H(_.locale,null,!0),this.parse(_),this.$x=this.$x||_.x||{},this[B]=!0}var E=P.prototype;return E.parse=function(_){this.$d=function(R){var $=R.date,F=R.utc;if($===null)return new Date(NaN);if(U.u($))return new Date;if($ instanceof Date)return new Date($);if(typeof $=="string"&&!/Z$/i.test($)){var L=$.match(C);if(L){var O=L[2]-1||0,S=(L[7]||"0").substring(0,3);return F?new Date(Date.UTC(L[1],O,L[3]||1,L[4]||0,L[5]||0,L[6]||0,S)):new Date(L[1],O,L[3]||1,L[4]||0,L[5]||0,L[6]||0,S)}}return new Date($)}(_),this.init()},E.init=function(){var _=this.$d;this.$y=_.getFullYear(),this.$M=_.getMonth(),this.$D=_.getDate(),this.$W=_.getDay(),this.$H=_.getHours(),this.$m=_.getMinutes(),this.$s=_.getSeconds(),this.$ms=_.getMilliseconds()},E.$utils=function(){return U},E.isValid=function(){return this.$d.toString()!==j},E.isSame=function(_,R){var $=D(_);return this.startOf(R)<=$&&$<=this.endOf(R)},E.isAfter=function(_,R){return D(_)<this.startOf(R)},E.isBefore=function(_,R){return this.endOf(R)<D(_)},E.$g=function(_,R,$){return U.u(_)?this[R]:this.set($,_)},E.unix=function(){return Math.floor(this.valueOf()/1e3)},E.valueOf=function(){return this.$d.getTime()},E.startOf=function(_,R){var $=this,F=!!U.u(R)||R,L=U.p(_),O=function(le,te){var Z=U.w($.$u?Date.UTC($.$y,te,le):new Date($.$y,te,le),$);return F?Z:Z.endOf(p)},S=function(le,te){return U.w($.toDate()[le].apply($.toDate("s"),(F?[0,0,0,0]:[23,59,59,999]).slice(te)),$)},N=this.$W,Q=this.$M,X=this.$D,ee="set"+(this.$u?"UTC":"");switch(L){case k:return F?O(1,0):O(31,11);case h:return F?O(1,Q):O(0,Q+1);case x:var ae=this.$locale().weekStart||0,de=(N<ae?N+7:N)-ae;return O(F?X-de:X+(6-de),Q);case p:case w:return S(ee+"Hours",0);case u:return S(ee+"Minutes",1);case c:return S(ee+"Seconds",2);case l:return S(ee+"Milliseconds",3);default:return this.clone()}},E.endOf=function(_){return this.startOf(_,!1)},E.$set=function(_,R){var $,F=U.p(_),L="set"+(this.$u?"UTC":""),O=($={},$[p]=L+"Date",$[w]=L+"Date",$[h]=L+"Month",$[k]=L+"FullYear",$[u]=L+"Hours",$[c]=L+"Minutes",$[l]=L+"Seconds",$[a]=L+"Milliseconds",$)[F],S=F===p?this.$D+(R-this.$W):R;if(F===h||F===k){var N=this.clone().set(w,1);N.$d[O](S),N.init(),this.$d=N.set(w,Math.min(this.$D,N.daysInMonth())).$d}else O&&this.$d[O](S);return this.init(),this},E.set=function(_,R){return this.clone().$set(_,R)},E.get=function(_){return this[U.p(_)]()},E.add=function(_,R){var $,F=this;_=Number(_);var L=U.p(R),O=function(Q){var X=D(F);return U.w(X.date(X.date()+Math.round(Q*_)),F)};if(L===h)return this.set(h,this.$M+_);if(L===k)return this.set(k,this.$y+_);if(L===p)return O(1);if(L===x)return O(7);var S=($={},$[c]=o,$[u]=s,$[l]=r,$)[L]||1,N=this.$d.getTime()+_*S;return U.w(N,this)},E.subtract=function(_,R){return this.add(-1*_,R)},E.format=function(_){var R=this,$=this.$locale();if(!this.isValid())return $.invalidDate||j;var F=_||"YYYY-MM-DDTHH:mm:ssZ",L=U.z(this),O=this.$H,S=this.$m,N=this.$M,Q=$.weekdays,X=$.months,ee=$.meridiem,ae=function(te,Z,ne,ze){return te&&(te[Z]||te(R,F))||ne[Z].slice(0,ze)},de=function(te){return U.s(O%12||12,te,"0")},le=ee||function(te,Z,ne){var ze=te<12?"AM":"PM";return ne?ze.toLowerCase():ze};return F.replace(y,function(te,Z){return Z||function(ne){switch(ne){case"YY":return String(R.$y).slice(-2);case"YYYY":return U.s(R.$y,4,"0");case"M":return N+1;case"MM":return U.s(N+1,2,"0");case"MMM":return ae($.monthsShort,N,X,3);case"MMMM":return ae(X,N);case"D":return R.$D;case"DD":return U.s(R.$D,2,"0");case"d":return String(R.$W);case"dd":return ae($.weekdaysMin,R.$W,Q,2);case"ddd":return ae($.weekdaysShort,R.$W,Q,3);case"dddd":return Q[R.$W];case"H":return String(O);case"HH":return U.s(O,2,"0");case"h":return de(1);case"hh":return de(2);case"a":return le(O,S,!0);case"A":return le(O,S,!1);case"m":return String(S);case"mm":return U.s(S,2,"0");case"s":return String(R.$s);case"ss":return U.s(R.$s,2,"0");case"SSS":return U.s(R.$ms,3,"0");case"Z":return L}return null}(te)||L.replace(":","")})},E.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},E.diff=function(_,R,$){var F,L=this,O=U.p(R),S=D(_),N=(S.utcOffset()-this.utcOffset())*o,Q=this-S,X=function(){return U.m(L,S)};switch(O){case k:F=X()/12;break;case h:F=X();break;case m:F=X()/3;break;case x:F=(Q-N)/6048e5;break;case p:F=(Q-N)/864e5;break;case u:F=Q/s;break;case c:F=Q/o;break;case l:F=Q/r;break;default:F=Q}return $?F:U.a(F)},E.daysInMonth=function(){return this.endOf(h).$D},E.$locale=function(){return A[this.$L]},E.locale=function(_,R){if(!_)return this.$L;var $=this.clone(),F=H(_,R,!0);return F&&($.$L=F),$},E.clone=function(){return U.w(this.$d,this)},E.toDate=function(){return new Date(this.valueOf())},E.toJSON=function(){return this.isValid()?this.toISOString():null},E.toISOString=function(){return this.$d.toISOString()},E.toString=function(){return this.$d.toUTCString()},P}(),I=M.prototype;return D.prototype=I,[["$ms",a],["$s",l],["$m",c],["$H",u],["$W",p],["$M",h],["$y",k],["$D",w]].forEach(function(P){I[P[1]]=function(E){return this.$g(E,P[0],P[1])}}),D.extend=function(P,E){return P.$i||(P(E,M,D),P.$i=!0),D},D.locale=H,D.isDayjs=z,D.unix=function(P){return D(1e3*P)},D.en=A[T],D.Ls=A,D.p={},D})})(Zk);var ej=Zk.exports;const pt=$h(ej);var tj={exports:{}};(function(e,t){(function(r,o){e.exports=o()})(Th,function(){return function(r,o,s){r=r||{};var a=o.prototype,l={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function c(p,x,h,m){return a.fromToBase(p,x,h,m)}s.en.relativeTime=l,a.fromToBase=function(p,x,h,m,k){for(var w,j,C,y=h.$locale().relativeTime||l,v=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],b=v.length,g=0;g<b;g+=1){var T=v[g];T.d&&(w=m?s(p).diff(h,T.d,!0):h.diff(p,T.d,!0));var A=(r.rounding||Math.round)(Math.abs(w));if(C=w>0,A<=T.r||!T.r){A<=1&&g>0&&(T=v[g-1]);var B=y[T.l];k&&(A=k(""+A)),j=typeof B=="string"?B.replace("%d",A):B(A,x,T.l,C);break}}if(x)return j;var z=C?y.future:y.past;return typeof z=="function"?z(j):z.replace("%s",j)},a.to=function(p,x){return c(p,x,this,!0)},a.from=function(p,x){return c(p,x,this)};var u=function(p){return p.$u?s.utc():s()};a.toNow=function(p){return this.to(u(this),p)},a.fromNow=function(p){return this.from(u(this),p)}}})})(tj);var DE=tj.exports;const BE=$h(DE);var FE={exports:{}};(function(e,t){(function(r,o){e.exports=o(ej)})(Th,function(r){function o(l){return l&&typeof l=="object"&&"default"in l?l:{default:l}}var s=o(r),a={name:"uz-latn",weekdays:"Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),weekStart:1,weekdaysShort:"Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),monthsShort:"Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),weekdaysMin:"Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),ordinal:function(l){return l},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},relativeTime:{future:"Yaqin %s ichida",past:"%s oldin",s:"soniya",m:"bir daqiqa",mm:"%d daqiqa",h:"bir soat",hh:"%d soat",d:"bir kun",dd:"%d kun",M:"bir oy",MM:"%d oy",y:"bir yil",yy:"%d yil"}};return s.default.locale(a,null,!0),a})})(FE);pt.extend(BE);const P0=e=>{if(!e)return"";const t=pt(e),r=pt();return t.isSame(r,"day")?t.format("HH:mm"):t.isSame(r.subtract(1,"day"),"day")?"Kecha":t.isSame(r,"year")?t.format("D-MMMM"):t.format("DD.MM.YYYY")},NE=e=>{if(!e)return"";const t=pt(e),r=pt();return t.isSame(r,"day")?"Bugun":t.isSame(r.subtract(1,"day"),"day")?"Kecha":t.locale("uz-latn").format("D-MMMM YYYY")},rj=f.createContext(),UE="http://localhost:3000",ni=()=>f.useContext(rj),qE=({children:e})=>{const[t,r]=f.useState([]),[o,s]=f.useState(!0),[a,l]=f.useState(1),[c,u]=f.useState(!0),[p,x]=f.useState(()=>{const _=window.location.pathname.split("/").filter(Boolean)[0]||"home",R=["home","feed","chats","users","groups","meets","courses","arena","profile"];return _==="a"?"chats":R.includes(_)?_:"feed"}),[h,m]=f.useState(()=>{const E=window.location.pathname.split("/").filter(Boolean);return(E[0]==="a"||E[0]==="users"||E[0]==="groups"||E[0]==="chats")&&E[1]?E[1]:0}),[k,w]=f.useState(null),[j,C]=f.useState({}),[y,v]=f.useState(null);f.useEffect(()=>{const E=je.getState().token;if(!E)return;const _=UE.replace(/\/$/,""),R=ao(`${_}/chats`,{auth:{token:E},transports:["websocket"],reconnectionAttempts:5});return R.on("connect",()=>{console.log("Connected to /chats namespace")}),w(R),()=>{R.disconnect()}},[]),f.useEffect(()=>{if(!k)return;const E=F=>{r(L=>{var de;const O=L.findIndex(le=>le.id===F.chatId);if(O===-1)return g(),L;const S=[...L],N={...S[O]},Q=String(N.urlSlug)===String(h)||String(N.id)===String(h);N.lastMessage=F.content,N.hasMessages=!0,N.time=P0(F.createdAt),N.date=pt(F.createdAt).format("YYYY-MM-DD");const X=je.getState().user||{},ee=X._id||X.id,ae=(((de=F.senderId)==null?void 0:de._id)||F.senderId)===ee;return!Q&&!ae&&(N.unread=(N.unread||0)+1),S.splice(O,1),S.unshift(N),S})},_=({chatId:F,readByUserId:L,messageIds:O})=>{const S=je.getState().user||{},N=S._id||S.id;String(L)===String(N)&&r(Q=>Q.map(X=>String(X.id)===String(F)?{...X,unread:Math.max(0,(X.unread||0)-O.length)}:X))},R=F=>{const L=je.getState().user||{},O=(L==null?void 0:L._id)||(L==null?void 0:L.id);if(F.members&&O&&!F.members.some(N=>{const Q=N._id||N.id||N;return String(Q)===String(O)})){r(N=>N.filter(Q=>Q.id!==F.chatId));return}r(S=>{const N=S.findIndex(Q=>Q.id===F.chatId);if(N!==-1){const Q=[...S];return Q[N]={...Q[N],...F},Q}return S})},$=({chatId:F,userId:L,isTyping:O})=>{C(S=>{const N={...S[F]||{}};return O?N[L]=Date.now():delete N[L],{...S,[F]:N}})};return k.on("message_new",E),k.on("messages_read",_),k.on("chat_updated",R),k.on("user_typing",$),()=>{k.off("message_new"),k.off("messages_read"),k.off("chat_updated"),k.off("user_typing")}},[k,h]),f.useEffect(()=>{const E=setInterval(()=>{const _=Date.now();C(R=>{let $=!1;const F={...R};return Object.keys(F).forEach(L=>{const O={...F[L]};Object.keys(O).forEach(S=>{_-O[S]>5e3&&(delete O[S],$=!0)}),Object.keys(O).length===0?delete F[L]:F[L]=O}),$?F:R})},2e3);return()=>clearInterval(E)},[]);const b=f.useCallback((E,_)=>{!k||!E||k.emit(_?"typing_start":"typing_stop",{chatId:E})},[k]),g=f.useCallback(async(E=1)=>{try{if(E===1&&s(!0),!je.getState().token)return;const R=await Nk(E,15),$=(R==null?void 0:R.data)||[],F=(R==null?void 0:R.totalPages)||1,L=je.getState().user||{},O=L._id||L.id,S=$.map(N=>{var X;let Q={name:"Noma'lum",avatar:""};if(N.isGroup)Q={name:N.name,avatar:N.avatar||((X=N.name)==null?void 0:X.charAt(0)),urlSlug:N.privateurl||N._id};else{const ee=N.members.find(ae=>String(ae._id||ae.id)!==String(O));ee?Q={name:ee.nickname||ee.username,avatar:ee.avatar||(ee.nickname||ee.username).charAt(0),urlSlug:ee.username,premiumStatus:ee.premiumStatus}:Q={name:"Saqlangan xabarlar",avatar:"",urlSlug:N._id,isSavedMessages:!0}}return{id:N._id,jammId:N.jammId,type:N.isGroup?"group":"user",name:Q.name,avatar:Q.avatar,isSavedMessages:Q.isSavedMessages,premiumStatus:Q.premiumStatus,urlSlug:N.jammId?String(N.jammId):Q.urlSlug||N._id,unread:N.unreadCount||0,lastMessage:N.lastMessage||(N.isGroup?"Guruh yaratildi":"Suhbat boshlandi"),time:N.lastMessageAt?P0(N.lastMessageAt):"Oldin",date:N.lastMessageAt?pt(N.lastMessageAt).format("YYYY-MM-DD"):"Oldin",members:N.members,createdBy:N.createdBy,admins:N.admins||[],hasMessages:!!N.lastMessage}});r(N=>E===1?S:[...N,...S]),l(E),u(E<F)}catch(_){console.error(_)}finally{E===1&&s(!1)}},[]),T=async E=>{const _=await Uk(E);return g(),_},A=async(E,_)=>{await qk({chatId:E,dto:_}),g()},B=f.useCallback(async(E,_=1,R=30)=>{if(!E)return{data:[],totalPages:1};const $=await Hk(E,_,R);return{data:($.data||[]).map(F=>{var L,O,S,N,Q,X,ee;return{id:F._id,user:((L=F.senderId)==null?void 0:L.nickname)||((O=F.senderId)==null?void 0:O.username),senderId:((S=F.senderId)==null?void 0:S._id)||F.senderId,avatar:((N=F.senderId)==null?void 0:N.avatar)||((ee=((Q=F.senderId)==null?void 0:Q.nickname)||((X=F.senderId)==null?void 0:X.username))==null?void 0:ee.charAt(0))||"U",content:F.content,timestamp:pt(F.createdAt).format("HH:mm"),readBy:F.readBy||[]}}),totalPages:$.totalPages||1,page:$.page||1}},[]),z=f.useCallback(async(E,_,R)=>{var F,L,O,S,N,Q,X;const $=await Vk({chatId:E,content:_,replayToId:R});return{id:$._id,user:((F=$.senderId)==null?void 0:F.nickname)||((L=$.senderId)==null?void 0:L.username),senderId:((O=$.senderId)==null?void 0:O._id)||$.senderId,avatar:((S=$.senderId)==null?void 0:S.avatar)||((X=((N=$.senderId)==null?void 0:N.nickname)||((Q=$.senderId)==null?void 0:Q.username))==null?void 0:X.charAt(0))||"U",content:$.content,timestamp:pt($.createdAt).format("HH:mm"),readBy:$.readBy||[],replayTo:$.replayTo||null}},[]),H=f.useCallback((E,_)=>{!k||!E||!(_!=null&&_.length)||k.emit("read_messages",{chatId:E,messageIds:_})},[k]),D=f.useCallback(async E=>Wk(E),[]),U=f.useCallback(async E=>E?(await Gk(E)).map(R=>({id:R._id,name:R.nickname||R.username,username:R.username,avatar:R.avatar||(R.nickname||R.username).charAt(0)})):[],[]),M=async E=>{try{return await Xk(E)}catch{return null}},I=f.useCallback(async()=>{try{return(await Jk()).map(_=>({id:_._id,name:_.nickname||_.username,username:_.username,avatar:_.avatar||(_.nickname||_.username||"").charAt(0),premiumStatus:_.premiumStatus}))}catch{return[]}},[]);f.useEffect(()=>{},[]),f.useEffect(()=>{!h||h==="0"||r(E=>E.map(_=>String(_.urlSlug)===String(h)||String(_.id)===String(h)?{..._,unread:0}:_))},[h]);const P={chats:t,loading:o,chatsPage:a,chatsHasMore:c,fetchChats:g,createChat:T,editChat:A,fetchMessages:B,sendMessage:z,markMessagesAsRead:H,resolveChatSlug:D,searchUsers:U,getUserByUsername:M,getAllUsers:I,selectedNav:p,setSelectedNav:x,selectedChannel:h,setSelectedChannel:m,chatSocket:k,typingUsers:j,sendTypingStatus:b,previewGroupChat:async E=>Kk(E),joinGroupChat:async E=>{const _=await Qk(E);return g(),_},deleteMessage:async E=>{await Yk(E),g()},previewChat:y,setPreviewChat:v};return i.jsx(rj.Provider,{value:P,children:e})},HE=d.div`
  width: 72px;
  height: 100vh;
  background-color: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 700px) {
    /* Floating bottom nav */
    position: fixed;
    bottom: 12px;
    left: 14px;
    right: 14px;
    width: auto;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 12px;
    border-radius: 20px;
    background: rgba(var(--tertiary-color-rgb, 32, 34, 37), 0.7);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    z-index: 100;
    overflow: visible;
  }
`,VE=d.button`
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
  flex-shrink: 0;

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
    transform: scale(1.1);
  }

  ${e=>e.active&&"background-color: var(--primary-color); color: white; border-radius: 50%;"}

  @media (max-width: 700px) {
    margin-bottom: 0;
    width: 44px;
    height: 44px;
  }
`;d.div`
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
`;const YE=d.div`
  flex: 1;

  @media (max-width: 700px) {
    display: none;
  }
`,WE=d.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid
    ${e=>e.active?"var(--primary-color)":e.premium?"#faa61a":"var(--border-color)"};
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 0;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: ${e=>e.active?"0 0 0 2px rgba(88,101,242,0.4)":"none"};

  &:hover {
    transform: scale(1.08);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.4);
  }

  @media (max-width: 700px) {
    margin-bottom: 0;
    width: 40px;
    height: 40px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: 16px;
    font-weight: 800;
    color: white;
    line-height: 1;
  }
`,KE=[{id:"feed",icon:Lw,label:"Gurunglar"},{id:"chats",icon:Q3,label:"Chatlar"},{id:"meets",icon:Or,label:"Video Meetlar"},{id:"courses",icon:Li,label:"Kurslar"}],QE=({onSelectNav:e,onOpenSettings:t,onOpenPremium:r})=>{const{selectedNav:o,setSelectedNav:s}=ni(),a=je(x=>x.user),l=x=>{e?e(x):s(x)},c=(a==null?void 0:a.nickname)||(a==null?void 0:a.username)||"U",u=c.charAt(0).toUpperCase(),p=(a==null?void 0:a.premiumStatus)==="active";return i.jsx(i.Fragment,{children:i.jsxs(HE,{children:[KE.map(x=>i.jsx(VE,{active:o===x.id,onClick:()=>l(x.id),title:x.label,children:i.jsx(x.icon,{size:20})},x.id)),i.jsx(YE,{}),i.jsx(WE,{active:o==="profile",premium:p?1:0,onClick:()=>l("profile"),title:`${c} — Profilim`,children:a!=null&&a.avatar?i.jsx("img",{src:a.avatar,alt:c}):i.jsx("span",{children:u})})]})})},GE=Ft`
  0% {
    background-color: var(--border-color, #e0e0e0);
  }
  50% {
    background-color: var(--tertiary-color, #f5f5f5);
  }
  100% {
    background-color: var(--border-color, #e0e0e0);
  }
`,ft=d.div`
  width: ${e=>e.width||"100%"};
  height: ${e=>e.height||"20px"};
  border-radius: ${e=>e.borderRadius||"4px"};
  margin-bottom: ${e=>e.mb||"8px"};
  animation: ${GE} 1.5s ease-in-out infinite;
  display: ${e=>e.display||"block"};
`,Ya=d(ft)`
  width: ${e=>e.size||"40px"};
  height: ${e=>e.size||"40px"};
  border-radius: 50%;
  margin-bottom: ${e=>e.mb||"0"};
`,XE=d.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.gap||"12px"};
  margin-bottom: ${e=>e.mb||"16px"};
  width: 100%;
`,nj=f.createContext(),M0="http://localhost:3000",JE=2e4,oj=()=>f.useContext(nj),ZE=({children:e})=>{const[t,r]=f.useState(new Map),[o,s]=f.useState(!1),a=f.useRef(null),l=f.useRef(null);f.useEffect(()=>{const h=je.getState().token;if(!h)return;const m=ao(`${M0}/presence`,{auth:{token:h},transports:["websocket","polling"],reconnection:!0,reconnectionDelay:2e3,reconnectionAttempts:10});return a.current=m,m.on("connect",()=>{s(!0),l.current=setInterval(()=>{m.emit("presence:ping")},JE)}),m.on("disconnect",()=>{s(!1),l.current&&(clearInterval(l.current),l.current=null)}),m.on("user_online",({userId:k})=>{r(w=>{const j=new Map(w);return j.set(k,!0),j})}),m.on("user_offline",({userId:k})=>{r(w=>{const j=new Map(w);return j.delete(k),j})}),m.on("connect_error",k=>{console.error("Presence connection error:",k.message)}),()=>{l.current&&clearInterval(l.current),m.disconnect(),a.current=null}},[]);const c=f.useCallback(h=>t.has(h),[t]),u=f.useCallback(async h=>{try{const m=je.getState().token,k=await fetch(`${M0}/presence/status/bulk`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({userIds:h})});if(!k.ok)return{};const w=await k.json();return r(j=>{const C=new Map(j);for(const[y,v]of Object.entries(w.statuses||{}))v?C.set(y,!0):C.delete(y);return C}),w.statuses}catch(m){return console.error("Failed to fetch bulk statuses:",m),{}}},[]),p=f.useCallback((h=[])=>!h||h.length===0?0:h.filter(m=>{const k=typeof m=="object"?m._id:m;return t.has(k)}).length,[t]),x={onlineUsers:t,connected:o,isUserOnline:c,getOnlineCount:p,fetchBulkStatuses:u};return i.jsx(nj.Provider,{value:x,children:e})},eg="http://localhost:3000",tg=()=>({headers:{Authorization:`Bearer ${je.getState().token}`}});async function vd(){try{return(await Ge.get(`${eg}/meets`,tg())).data.map(t=>({...t,isCreator:!0}))}catch(e){return console.error("Failed to fetch meets",e),[]}}async function ij({roomId:e,title:t,isPrivate:r,isCreator:o}){if(o)try{await Ge.post(`${eg}/meets`,{roomId:e,title:t,isPrivate:r},tg())}catch(s){console.error("Failed to save meet",s)}}async function e_(e){try{await Ge.delete(`${eg}/meets/${e}`,tg())}catch(t){console.error("Failed to remove meet",t)}}async function t_(e){return(await vd()).find(r=>r.roomId===e)||null}/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var Ch=function(e,t){return Ch=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var s in o)o.hasOwnProperty(s)&&(r[s]=o[s])},Ch(e,t)};function r_(e,t){Ch(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}var ba=function(){return ba=Object.assign||function(t){for(var r,o=1,s=arguments.length;o<s;o++){r=arguments[o];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},ba.apply(this,arguments)};function n_(e,t,r,o){var s,a=!1,l=0;function c(){s&&clearTimeout(s)}function u(){c(),a=!0}typeof t!="boolean"&&(o=r,r=t,t=void 0);function p(){var x=this,h=Date.now()-l,m=arguments;if(a)return;function k(){l=Date.now(),r.apply(x,m)}function w(){s=void 0}o&&!s&&k(),c(),o===void 0&&h>e?k():t!==!0&&(s=setTimeout(o?w:k,o===void 0?e-h:e))}return p.cancel=u,p}var Bi={Pixel:"Pixel",Percent:"Percent"},O0={unit:Bi.Percent,value:.8};function A0(e){return typeof e=="number"?{unit:Bi.Percent,value:e*100}:typeof e=="string"?e.match(/^(\d*(\.\d+)?)px$/)?{unit:Bi.Pixel,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:Bi.Percent,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),O0):(console.warn("scrollThreshold should be string or number"),O0)}var yo=function(e){r_(t,e);function t(r){var o=e.call(this,r)||this;return o.lastScrollTop=0,o.actionTriggered=!1,o.startY=0,o.currentY=0,o.dragging=!1,o.maxPullDownDistance=0,o.getScrollableTarget=function(){return o.props.scrollableTarget instanceof HTMLElement?o.props.scrollableTarget:typeof o.props.scrollableTarget=="string"?document.getElementById(o.props.scrollableTarget):(o.props.scrollableTarget===null&&console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `),null)},o.onStart=function(s){o.lastScrollTop||(o.dragging=!0,s instanceof MouseEvent?o.startY=s.pageY:s instanceof TouchEvent&&(o.startY=s.touches[0].pageY),o.currentY=o.startY,o._infScroll&&(o._infScroll.style.willChange="transform",o._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},o.onMove=function(s){o.dragging&&(s instanceof MouseEvent?o.currentY=s.pageY:s instanceof TouchEvent&&(o.currentY=s.touches[0].pageY),!(o.currentY<o.startY)&&(o.currentY-o.startY>=Number(o.props.pullDownToRefreshThreshold)&&o.setState({pullToRefreshThresholdBreached:!0}),!(o.currentY-o.startY>o.maxPullDownDistance*1.5)&&o._infScroll&&(o._infScroll.style.overflow="visible",o._infScroll.style.transform="translate3d(0px, "+(o.currentY-o.startY)+"px, 0px)")))},o.onEnd=function(){o.startY=0,o.currentY=0,o.dragging=!1,o.state.pullToRefreshThresholdBreached&&(o.props.refreshFunction&&o.props.refreshFunction(),o.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){o._infScroll&&(o._infScroll.style.overflow="auto",o._infScroll.style.transform="none",o._infScroll.style.willChange="unset")})},o.onScrollListener=function(s){typeof o.props.onScroll=="function"&&setTimeout(function(){return o.props.onScroll&&o.props.onScroll(s)},0);var a=o.props.height||o._scrollableNode?s.target:document.documentElement.scrollTop?document.documentElement:document.body;if(!o.actionTriggered){var l=o.props.inverse?o.isElementAtTop(a,o.props.scrollThreshold):o.isElementAtBottom(a,o.props.scrollThreshold);l&&o.props.hasMore&&(o.actionTriggered=!0,o.setState({showLoader:!0}),o.props.next&&o.props.next()),o.lastScrollTop=a.scrollTop}},o.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:r.dataLength},o.throttledOnScrollListener=n_(150,o.onScrollListener).bind(o),o.onStart=o.onStart.bind(o),o.onMove=o.onMove.bind(o),o.onEnd=o.onEnd.bind(o),o}return t.prototype.componentDidMount=function(){if(typeof this.props.dataLength>"u")throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),typeof this.props.initialScrollY=="number"&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),typeof this.props.refreshFunction!="function"))throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`)},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(r){this.props.dataLength!==r.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(r,o){var s=r.dataLength!==o.prevDataLength;return s?ba(ba({},o),{prevDataLength:r.dataLength}):null},t.prototype.isElementAtTop=function(r,o){o===void 0&&(o=.8);var s=r===document.body||r===document.documentElement?window.screen.availHeight:r.clientHeight,a=A0(o);return a.unit===Bi.Pixel?r.scrollTop<=a.value+s-r.scrollHeight+1:r.scrollTop<=a.value/100+s-r.scrollHeight+1},t.prototype.isElementAtBottom=function(r,o){o===void 0&&(o=.8);var s=r===document.body||r===document.documentElement?window.screen.availHeight:r.clientHeight,a=A0(o);return a.unit===Bi.Pixel?r.scrollTop+s>=r.scrollHeight-a.value:r.scrollTop+s>=a.value/100*r.scrollHeight},t.prototype.render=function(){var r=this,o=ba({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),s=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),a=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return Le.createElement("div",{style:a,className:"infinite-scroll-component__outerdiv"},Le.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(l){return r._infScroll=l},style:o},this.props.pullDownToRefresh&&Le.createElement("div",{style:{position:"relative"},ref:function(l){return r._pullDown=l}},Le.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!s&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(f.Component);const o_=d.div`
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
`,i_=d.div`
  padding: 16px;
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`,I0=d.button`
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
`;d.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
`;d.div`
  padding: 12px 16px;
  height: 56px;
`;const s_=d.input`
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
`,a_=d.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,l_=d.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,L0=d.button`
  flex: 1;
  padding: 11px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${e=>e.active?"var(--primary-color)":"transparent"};
  color: ${e=>e.active?"var(--text-color)":"var(--text-muted-color)"};
  font-size: 14px;
  font-weight: ${e=>e.active?"700":"500"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`,rp=d.button`
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
`,c_=d.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`,np=d.div`
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
`,D0=d(aw)`
  text-decoration: none;
  color: inherit;
  display: block;
`,B0=d.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`,op=d.div`
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
`,d_=d.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${e=>e.$online?"#43b581":"#72767d"};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`,u_=d.span`
  font-size: 12px;
  color: #43b581;
`,ip=d.div`
  flex: 1;
  min-width: 0;
`,sp=d.div`
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
`,ap=d.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,F0=d.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`,N0=d.div`
  font-size: 12px;
  color: #72767d;
  margin-bottom: 2px;
`,p_=d.div`
  background-color: #7289da;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;d.div`
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
`;d.div`
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
`;d.div`
  flex: 1;
`;d.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
`;d.div`
  font-size: 12px;
  color: var(--primary-color);
`;const f_=({onOpenCreateGroup:e,onOpenCreateMeet:t})=>{const{chats:r,chatsPage:o,chatsHasMore:s,fetchChats:a,searchUsers:l,createChat:c,selectedNav:u,getAllUsers:p,setSelectedNav:x,selectedChannel:h,setSelectedChannel:m,previewChat:k}=ni(),{isUserOnline:w,getOnlineCount:j,fetchBulkStatuses:C}=oj(),y=je(O=>O.user),v=pr();f.useEffect(()=>{u!=="meets"&&a()},[a,u]);const[b,g]=f.useState(""),[T,A]=f.useState("all"),[B,z]=f.useState([]),[H,D]=f.useState(!1),[U,M]=f.useState(()=>u==="groups"?"group":"private"),[I,P]=f.useState([]);f.useEffect(()=>{u==="groups"?M("group"):u==="users"&&M("private")},[u]),f.useEffect(()=>{if(!r||r.length===0||u==="meets")return;const O=new Set;r.forEach(N=>{N.members&&N.members.forEach(Q=>{Q._id?O.add(Q._id):Q.id&&O.add(Q.id)})});const S=Array.from(O);S.length>0&&C(S)},[r,C,u]);const E=Le.useRef(null);f.useEffect(()=>{if(u!=="users"){z([]),E.current=null;return}if(b.trim().length>0){E.current=null;const O=setTimeout(async()=>{D(!0);const S=await l(b);z(S.map(N=>({id:N.id||N._id,name:N.name,username:N.username,avatar:N.avatar,premiumStatus:N.premiumStatus}))),D(!1)},500);return()=>clearTimeout(O)}else{if(E.current==="users")return;E.current="users",D(!0),p().then(O=>{z(O),D(!1)})}},[b,u,l,p]);const _=async O=>{const S=(y==null?void 0:y._id)||(y==null?void 0:y.id),N=O.id||O._id,Q=r.find(X=>X.isGroup||!X.members?!1:N===S?X.isSavedMessages:!X.isSavedMessages&&X.members.some(ee=>(ee._id||ee.id)===N));if(Q)Q.type==="group"?v(`/groups/${Q.urlSlug}`):v(`/users/${Q.urlSlug}`);else try{const X=await c({isGroup:!1,memberIds:[O._id||O.id]}),ee=(X==null?void 0:X.urlSlug)||(X==null?void 0:X.jammId)||(X==null?void 0:X._id)||(X==null?void 0:X.id);ee&&(v(`/users/${ee}`),g(""))}catch(X){console.error("Failed to start private chat",X)}},R=Le.useMemo(()=>{let O=r;if(u==="chats"||u==="users"||u==="groups"?U==="private"?O=O.filter(S=>S.type==="user"&&(S.isSavedMessages||S.hasMessages||String(S.id)===String(h))):O=O.filter(S=>S.type==="group"):u==="home"&&(O=O.filter(S=>S.type==="group"||S.type==="user"&&(S.isSavedMessages||S.hasMessages||String(S.id)===String(h)))),b&&(O=O.filter(S=>S.name.toLowerCase().includes(b.toLowerCase()))),T==="today"?O=O.filter(S=>S.time.includes(":")||S.time==="Kecha"):T==="week"&&(O=O.filter(S=>S.time.includes("Dushanba")||S.time.includes("Kecha"))),(u==="users"||u==="chats"&&U==="private")&&k&&k.type==="user"&&!O.some(S=>{var N;return(N=S.members)==null?void 0:N.some(Q=>(Q._id||Q.id)===k.targetUserId)})){const S={id:`virtual-${k.targetUserId}`,urlSlug:k.targetUserId,type:"user",name:k.name,avatar:k.avatar,hasMessages:!1,members:[{_id:k.targetUserId}],lastMessage:"Xabar yozishni boshlang..."};String(h)===String(k.targetUserId)&&(O=[S,...O])}return O},[u,U,b,T,r,h,k]),$=Le.useRef(!1);f.useEffect(()=>{u==="meets"&&!$.current&&($.current=!0,vd().then(O=>P(Array.isArray(O)?O:[]))),u!=="meets"&&($.current=!1)},[u]);function F(O){const S=(Date.now()-O)/1e3;return S<60?"hozir":S<3600?`${Math.floor(S/60)} daq oldin`:S<86400?`${Math.floor(S/3600)} soat oldin`:`${Math.floor(S/86400)} kun oldin`}const L=(O,S)=>{O.preventDefault(),O.stopPropagation(),e_(S),P(vd())};return i.jsxs(o_,{children:[i.jsxs(i_,{children:[i.jsx(s_,{type:"text",placeholder:"Qidirish...",value:b,onChange:O=>g(O.target.value),style:{flex:1,marginRight:u==="groups"||u==="meets"||u==="chats"&&U==="group"?"12px":"0"}}),(u==="groups"||u==="chats"&&U==="group")&&i.jsx(I0,{onClick:e,title:"Guruh yaratish",children:i.jsx(Ht,{size:18})}),u==="meets"&&i.jsx(I0,{onClick:t,title:"Yangi meet",children:i.jsx(Ht,{size:18})})]}),(u==="chats"||u==="users"||u==="groups")&&i.jsxs(l_,{children:[i.jsx(L0,{active:U==="private",onClick:()=>M("private"),children:"Shaxsiy"}),i.jsx(L0,{active:U==="group",onClick:()=>M("group"),children:"Guruhlar"})]}),u==="home"&&i.jsxs(a_,{children:[i.jsx(rp,{active:T==="all",onClick:()=>A("all"),children:"Barchasi"}),i.jsx(rp,{active:T==="today",onClick:()=>A("today"),children:"Bugun"}),i.jsx(rp,{active:T==="week",onClick:()=>A("week"),children:"Hafta"})]}),i.jsx(c_,{id:"sidebarScrollArea",children:u==="meets"?I.length===0?i.jsxs("div",{style:{padding:32,textAlign:"center",color:"var(--text-muted-color)"},children:[i.jsx(Or,{size:32,style:{marginBottom:10,opacity:.4}}),i.jsx("div",{children:"Hali hech qanday meet yo'q"})]}):I.map(O=>i.jsx(D0,{to:`/join/${O.roomId}`,children:i.jsxs(np,{children:[i.jsx(B0,{children:i.jsx(op,{isGroup:!0,children:i.jsx(Or,{size:18})})}),i.jsxs(ip,{children:[i.jsx(sp,{children:O.title||"Nomsiz meet"}),i.jsxs(ap,{children:[O.isPrivate?i.jsx(Zo,{size:12}):i.jsx(Vd,{size:12}),i.jsx("span",{children:O.isCreator?"Admin":"Ishtirokchi"})]})]}),i.jsxs(F0,{children:[i.jsx(N0,{children:F(O.joinedAt)}),i.jsx("button",{onClick:S=>L(S,O.roomId),title:"O'chirish",style:{background:"none",border:"none",color:"#4f545c",cursor:"pointer",padding:2},children:i.jsx(xs,{size:12})})]})]})},O.roomId)):i.jsxs(i.Fragment,{children:[i.jsx(yo,{dataLength:R.length,next:()=>a(o+1),hasMore:s&&T==="all"&&b==="",loader:i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Yuklanmoqda..."}),endMessage:R.length>0&&T==="all"&&b===""?i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Barcha suhbatlar ko'rsatildi."}):null,scrollableTarget:"sidebarScrollArea",style:{display:"flex",flexDirection:"column",overflow:"visible"},children:R.map(O=>{var ae;const S=(y==null?void 0:y._id)||(y==null?void 0:y.id),N=O.type!=="group"&&O.members?O.members.find(de=>de._id!==S):null,Q=N==null?void 0:N._id,X=Q?w(Q):!1,ee=O.type==="group"?j(O.members):0;return i.jsx(D0,{to:`/${O.type==="group"?"groups":"users"}/${O.urlSlug}`,children:i.jsxs(np,{active:h===O.urlSlug,children:[i.jsxs(B0,{children:[i.jsx(op,{$isGroup:O.type==="group"||O.isSavedMessages,style:O.isSavedMessages?{backgroundColor:"#0288D1"}:{},children:O.isSavedMessages?i.jsx(ah,{size:18,color:"white",fill:"white"}):((ae=O.avatar)==null?void 0:ae.length)>1?i.jsx("img",{src:O.avatar,alt:O.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):O.type==="group"?O.name.charAt(0):O.name.split(" ").map(de=>de[0]).join("")}),O.type!=="group"&&!O.isSavedMessages&&i.jsx(d_,{$online:X})]}),i.jsxs(ip,{children:[i.jsxs(sp,{children:[O.name,O.premiumStatus==="active"&&i.jsx(Star,{size:14,fill:"#ffaa00",color:"#ffaa00",style:{marginLeft:4}})]}),i.jsx(ap,{children:O.type==="group"&&ee>0?i.jsxs(i.Fragment,{children:[O.lastMessage," · ",i.jsxs(u_,{children:[ee," online"]})]}):O.lastMessage})]}),i.jsxs(F0,{children:[i.jsx(N0,{children:O.time}),O.unread>0&&i.jsx(p_,{children:O.unread})]})]})},O.id)})}),u==="users"&&i.jsx(i.Fragment,{children:H?i.jsx("div",{style:{padding:"20px 16px",display:"flex",flexDirection:"column",gap:"16px"},children:[...Array(4)].map((O,S)=>i.jsxs(XE,{children:[i.jsx(Ya,{size:"40px"}),i.jsxs("div",{style:{flex:1},children:[i.jsx(ft,{height:"14px",width:"60%",mb:"6px"}),i.jsx(ft,{height:"12px",width:"40%",mb:"0"})]})]},S))}):B.filter(O=>{const S=O.id||O._id,N=(y==null?void 0:y._id)||(y==null?void 0:y.id);return S===N?!1:!R.some(X=>{var ee;return!X.isGroup&&!X.isSavedMessages&&((ee=X.members)==null?void 0:ee.some(ae=>(ae._id||ae.id)===S))})}).map(O=>{var S;return i.jsxs(np,{onClick:()=>_(O),style:{cursor:"pointer"},children:[i.jsx(op,{isGroup:!1,children:((S=O==null?void 0:O.avatar)==null?void 0:S.length)>1?i.jsx("img",{src:O.avatar,alt:O.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(O.name||"?").charAt(0)}),i.jsxs(ip,{children:[i.jsxs(sp,{children:[O.name,O.premiumStatus==="active"&&i.jsx(Star,{size:14,fill:"#ffaa00",color:"#ffaa00",style:{marginLeft:4}})]}),i.jsxs(ap,{children:["@",O.username]})]})]},O.id)})})]})})]})},h_="modulepreload",x_=function(e){return"/"+e},U0={},lp=function(t,r,o){let s=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=Promise.allSettled(r.map(u=>{if(u=x_(u),u in U0)return;U0[u]=!0;const p=u.endsWith(".css"),x=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${x}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":h_,p||(h.as="script"),h.crossOrigin="",h.href=u,c&&h.setAttribute("nonce",c),document.head.appendChild(h),p)return new Promise((m,k)=>{h.addEventListener("load",m),h.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return s.then(l=>{for(const c of l||[])c.status==="rejected"&&a(c.reason);return t().catch(a)})},g_=d.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  z-index: 10000;
  display: flex;
  flex-direction: column;
`,m_=d.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`,y_=d.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`,v_=d.div`
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
`,q0=d.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #2f3136;
`,H0=d.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2f3136;
  color: #dcddde;
`,V0=d.div`
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
`,Y0=d.div`
  font-size: 18px;
  font-weight: 600;
  color: #dcddde;
  margin-bottom: 8px;
`,W0=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b9bbbe;
`,K0=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,Q0=d.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${e=>e.active?"#43b581":"#72767d"};
  transition: background-color 0.3s ease;
`,b_=d.div`
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
`,Gl=d.button`
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
`,w_=({isOpen:e,onClose:t,user:r})=>{const[o,s]=f.useState(!1),[a,l]=f.useState(!1),[c,u]=f.useState(!1),[p,x]=f.useState(!1),[h,m]=f.useState(0),[k,w]=f.useState(!1),[j,C]=f.useState("bottom-right"),y=f.useRef(null),v=f.useRef(null);f.useEffect(()=>{if(e){const T=setInterval(()=>{m(A=>A+1)},1e3);return()=>clearInterval(T)}},[e]),f.useEffect(()=>{const T=setInterval(()=>{w(Math.random()>.6)},2e3);return()=>clearInterval(T)},[]);const b=()=>{x(!p)},g=T=>{T.preventDefault();const A=T.clientX,B=T.clientY,z=T.target.getBoundingClientRect(),H=A-z.left,D=B-z.top,U=I=>{const P=I.clientX-H,E=I.clientY-D,_=window.innerWidth,R=window.innerHeight;let $="bottom-right";P<_/2?$=E<R/2?"top-left":"bottom-left":$=E<R/2?"top-right":"bottom-right",C($)},M=()=>{document.removeEventListener("mousemove",U),document.removeEventListener("mouseup",M)};document.addEventListener("mousemove",U),document.addEventListener("mouseup",M)};return e?i.jsx(g_,{children:i.jsxs(m_,{children:[i.jsx(y_,{children:p?i.jsx(q0,{ref:y,autoPlay:!0,muted:!0,playsInline:!0}):i.jsx(q0,{ref:v,autoPlay:!0,playsInline:!0})}),i.jsx(v_,{position:j,onClick:b,onMouseDown:g,children:p?i.jsxs(H0,{children:[i.jsx(V0,{children:(r||"User")[0]}),i.jsx(Y0,{children:r||"User"}),i.jsxs(W0,{children:[i.jsxs(K0,{children:[i.jsx(Q0,{active:k}),i.jsx("span",{children:k?"Speaking...":"Silent"})]}),o&&i.jsx(qo,{size:16})]})]}):i.jsxs(H0,{children:[i.jsx(V0,{children:"You"}),i.jsx(Y0,{children:"You"}),i.jsxs(W0,{children:[i.jsxs(K0,{children:[i.jsx(Q0,{active:!1}),i.jsx("span",{children:"Silent"})]}),o&&i.jsx(qo,{size:16})]})]})}),i.jsxs(b_,{children:[i.jsx(Gl,{onClick:()=>s(!o),active:!o,children:o?i.jsx(qo,{size:24}):i.jsx(Ro,{size:24})}),i.jsx(Gl,{onClick:()=>l(!a),active:!a,children:a?i.jsx(Di,{size:24}):i.jsx(Or,{size:24})}),i.jsx(Gl,{onClick:()=>u(!c),active:c,children:c?i.jsx(Uw,{size:24}):i.jsx(uh,{size:24})}),i.jsx(Gl,{variant:"primary",onClick:t,children:i.jsx(Wd,{size:24})})]})]})}):null},G0=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.value=.3,t.start(),t.stop(e.currentTime+.2),setTimeout(()=>{const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.frequency.value=800,o.type="sine",s.gain.value=.3,o.start(),o.stop(e.currentTime+.2)},400)},X0=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=600,t.type="sine",r.gain.value=.4,setTimeout(()=>{const o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.frequency.value=600,o.type="sine",s.gain.value=.4},800)},k_=d.div`
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
`,j_=d.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,S_=d.div`
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
`,C_=d.div`
  text-align: center;
`,z_=d.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,E_=d.div`
  color: #43b581;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,__=d.div`
  display: flex;
  gap: 16px;
`,J0=d.button`
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
`,T_=({isOpen:e,onAccept:t,onReject:r,caller:o})=>{var u;const[s,a]=f.useState(0),l=f.useRef(null);f.useEffect(()=>{if(e){X0(),l.current=setInterval(()=>{X0()},2e3);const p=setInterval(()=>{a(x=>x+1)},1e3);return()=>{p&&clearInterval(p),l.current&&(clearInterval(l.current),l.current=null)}}},[e]);const c=p=>{const x=Math.floor(p/60),h=p%60;return`${x.toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`};return e?i.jsx(k_,{children:i.jsxs(j_,{children:[i.jsx(S_,{children:((u=o==null?void 0:o.name)==null?void 0:u[0])||"U"}),i.jsxs(C_,{children:[i.jsx(z_,{children:(o==null?void 0:o.name)||"Unknown"}),i.jsxs(E_,{children:[i.jsx(uo,{size:16}),c(s)]})]}),i.jsxs(__,{children:[i.jsx(J0,{variant:"accept",onClick:t,children:i.jsx(qw,{size:24})}),i.jsx(J0,{onClick:r,children:i.jsx(Wd,{size:24})})]})]})}):null},$_=d.div`
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
`,R_=d.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,P_=d.div`
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
`,M_=d.div`
  text-align: center;
`,O_=d.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,Z0=d.div`
  color: #b9bbbe;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,A_=d.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`,I_=d.button`
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
`,L_=d.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`,cp=d.div`
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
`,e1=({isOpen:e,onCancel:t,target:r})=>{var c;const[o,s]=f.useState(0),a=f.useRef(null);f.useEffect(()=>{if(e){G0(),a.current=setInterval(()=>{G0()},1500);const u=setInterval(()=>{s(p=>p+1)},1e3);return()=>{u&&clearInterval(u),a.current&&(clearInterval(a.current),a.current=null)}}},[e]);const l=u=>{const p=Math.floor(u/60),x=u%60;return`${p.toString().padStart(2,"0")}:${x.toString().padStart(2,"0")}`};return e?i.jsx($_,{children:i.jsxs(R_,{children:[i.jsx(P_,{children:((c=r==null?void 0:r.name)==null?void 0:c[0])||"U"}),i.jsxs(M_,{children:[i.jsx(O_,{children:(r==null?void 0:r.name)||"Unknown"}),i.jsxs(Z0,{children:[i.jsx(Qw,{size:16}),"Calling..."]}),i.jsxs(Z0,{children:[i.jsx(uo,{size:16}),l(o)]})]}),i.jsxs(L_,{children:[i.jsx(cp,{}),i.jsx(cp,{delay:.2}),i.jsx(cp,{delay:.4})]}),i.jsx(A_,{children:i.jsxs(I_,{variant:"cancel",onClick:t,children:[i.jsx(Wd,{size:20}),"Cancel"]})})]})}):null},D_=({onSuccess:e,onError:t}={})=>X2({mutationFn:Fk,onSuccess:r=>{e==null||e(r)},onError:()=>{t==null||t()}}),B_=d.div`
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
`,F_=d.div`
  background-color: var(--secondary-color, #2f3136);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,N_=d.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,U_=d.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  margin-bottom: 8px;
`,q_=d.p`
  color: var(--text-muted-color, #b9bbbe);
  font-size: 14px;
`,H_=d.button`
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
`,V_=d.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,t1=d.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Xl=d.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,dp=d.input`
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
`,Y_=d.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,W_=d.div`
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
`,r1=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,K_=d.div`
  position: relative;
  margin-bottom: 8px;
`,n1=d.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 4px;
  background-color: var(--tertiary-color, #36393f);
`,o1=d.div`
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
`,i1=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,s1=d.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,a1=d.span`
  font-size: 14px;
  color: var(--text-color, #ffffff);
  font-weight: 500;
`,Q_=d.div`
  background-color: var(--tertiary-color, #36393f);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,l1=d.button`
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
`,G_=({isOpen:e,onClose:t,onSave:r,group:o={},users:s=[]})=>{var O;const[a,l]=f.useState(""),[c,u]=f.useState(""),[p,x]=f.useState(""),[h,m]=f.useState([]),[k,w]=f.useState(""),j=f.useRef(null),C=D_({onSuccess:S=>x(S),onError:()=>toast.error("Rasm yuklashda xatolik yuz berdi")}),[y,v]=f.useState([]),[b,g]=f.useState(null),T=je(S=>S.user),A=(T==null?void 0:T.id)||(T==null?void 0:T._id),B=String(o.createdBy)===String(A),z=y.find(S=>String(S.userId||S.id||S._id)===String(A)),H=S=>B||z&&z.permissions.includes(S),D=H("edit_group_info"),U=H("add_members"),M=H("remove_members"),I=H("add_admins");if(f.useEffect(()=>{e&&o&&(l(o.name||""),u(o.description||""),x(o.avatar||""),m(o.members?o.members.map(S=>String(S.id||S._id||S)):[]),v(o.admins?o.admins.map(S=>({...S,userId:String(S.userId||S.id||S._id)})):[]),w(""),g(null))},[e,o]),!e)return null;const P=S=>{h.includes(S)?(m(h.filter(N=>N!==S)),v(N=>N.filter(Q=>(Q.userId||Q.id)!==S))):m([...h,S])},E=s.filter(S=>S.name.toLowerCase().includes(k.toLowerCase())&&S.type==="user"&&!S.isSavedMessages&&k.trim()!==""),_=new Map;(O=o.members)==null||O.forEach(S=>_.set(S.id||S._id||S,S)),s.forEach(S=>_.set(S.id||S.jammId||S._id,S));const R=h.map(S=>_.get(S)).filter(Boolean),$=(S,N)=>{const Q=String(S);v(X=>{const ee=X.find(ae=>String(ae.userId||ae.id)===Q);if(ee){const de=ee.permissions.includes(N)?ee.permissions.filter(le=>le!==N):[...ee.permissions,N];return de.length===0?X.filter(le=>String(le.userId||le.id)!==Q):X.map(le=>String(le.userId||le.id)===Q?{...le,permissions:de}:le)}else return m(ae=>ae.includes(Q)?ae:[...ae,Q]),[...X,{userId:Q,permissions:[N]}]})},F=()=>{const S={name:a,description:c,avatar:p,members:h};I&&(S.admins=y),r(S),t()},L=S=>{var X;const N=(X=S.target.files)==null?void 0:X[0];if(!N)return;if(N.size>2*1024*1024){toast.error("Fayl hajmi juda katta (maksimum 2MB)");return}const Q=new FormData;Q.append("file",N),C.mutate({chatId:o.id||o._id,formData:Q})};return i.jsx(B_,{onClick:t,children:i.jsxs(F_,{onClick:S=>S.stopPropagation(),children:[i.jsxs(N_,{children:[i.jsx(U_,{children:"Guruhni tahrirlash"}),i.jsx(q_,{children:"Guruh ma'lumotlarini o'zgartirish"}),i.jsx(H_,{onClick:t,children:i.jsx(nt,{size:24})})]}),i.jsxs(V_,{children:[i.jsxs(Y_,{children:[i.jsx("input",{type:"file",ref:j,style:{display:"none"},accept:"image/*",onChange:L,disabled:!D}),i.jsx(W_,{onClick:()=>{D&&j.current&&j.current.click()},style:{cursor:D?"pointer":"not-allowed"},children:C.isPending?i.jsx(po,{size:24,style:{animation:"spin 1s linear infinite"}}):(p==null?void 0:p.length)>1?i.jsx("img",{src:p,alt:"Group"}):i.jsxs(i.Fragment,{children:[i.jsx(Ux,{size:24}),i.jsx("span",{children:"UPLOAD"})]})})]}),i.jsxs(t1,{children:[i.jsx(Xl,{children:"Guruh nomi"}),i.jsx(dp,{placeholder:"Guruh nomi",value:a,onChange:S=>l(S.target.value),disabled:!D})]}),i.jsxs(t1,{children:[i.jsx(Xl,{children:"Guruh haqida (ixtiyoriy)"}),i.jsx(dp,{placeholder:"Guruh maqsadini yozing...",value:c,onChange:S=>u(S.target.value),disabled:!D})]}),i.jsxs(r1,{children:[i.jsxs(Xl,{children:["Mavjud a'zolar (",R.length,")"]}),i.jsx(n1,{children:R.map(S=>{var X;const N=String(S.id||S._id),Q=y.find(ee=>String(ee.userId||ee.id)===N);return i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsxs(o1,{children:[i.jsxs(i1,{children:[i.jsx(s1,{children:((X=S.avatar)==null?void 0:X.length)>1?i.jsx("img",{src:S.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(S.name||S.username||"").charAt(0)}),i.jsx(a1,{children:S.name||S.nickname||S.username}),N===o.createdBy&&i.jsx(as,{size:14,color:"#f1c40f"}),N!==o.createdBy&&Q&&i.jsx(as,{size:14,color:"#5865F2"})]}),i.jsxs("div",{style:{display:"flex",gap:8},children:[I&&N!==o.createdBy&&i.jsx("button",{onClick:()=>g(String(b)===N?null:N),style:{background:"transparent",border:"none",color:"#b9bbbe",cursor:"pointer",fontSize:12},children:"Admin"}),M&&N!==o.createdBy&&i.jsx("button",{onClick:()=>P(N),style:{background:"transparent",border:"none",color:"#ed4245",cursor:"pointer"},children:i.jsx(Kw,{size:16})})]})]}),b===N&&i.jsx("div",{style:{padding:"8px 16px",backgroundColor:"var(--input-color, #202225)",fontSize:13,display:"flex",flexDirection:"column",gap:6},children:[{id:"edit_group_info",label:"Ma'lumotlarni tahrirlash"},{id:"add_members",label:"A'zo qo'shish"},{id:"remove_members",label:"A'zo o'chirish"},{id:"delete_others_messages",label:"Xabarlarni o'chirish"},{id:"add_admins",label:"Admin qo'shish"}].map(ee=>{var de;const ae=((de=Q==null?void 0:Q.permissions)==null?void 0:de.includes(ee.id))||!1;return i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#b9bbbe"},children:[i.jsx("input",{type:"checkbox",checked:ae,onChange:()=>$(N,ee.id)}),ee.label]},ee.id)})})]},N)})})]}),U&&i.jsxs(r1,{children:[i.jsx(Xl,{children:"Yangi a'zo qo'shish"}),i.jsxs(K_,{children:[i.jsx(dp,{placeholder:"User qidirish...",value:k,onChange:S=>w(S.target.value),style:{paddingLeft:30,width:"100%"}}),i.jsx(Fx,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),k.trim()!==""&&i.jsx(n1,{children:E.length===0?i.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):E.map(S=>{var N;return i.jsxs(o1,{selected:h.includes(S.id),onClick:()=>P(S.id),children:[i.jsxs(i1,{children:[i.jsx(s1,{children:((N=S.avatar)==null?void 0:N.length)>1?i.jsx("img",{src:S.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):S.name.charAt(0)}),i.jsx(a1,{children:S.name})]}),h.includes(S.id)&&i.jsx(sr,{size:16,color:"var(--primary-color, #5865F2)"})]},S.id)})})]})]}),i.jsxs(Q_,{children:[i.jsx(l1,{onClick:t,children:"Bekor qilish"}),i.jsx(l1,{primary:!0,onClick:F,disabled:!a.trim(),children:"Saqlash"})]})]})})},X_=d.div`
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
`,J_=d.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`,Z_=d.div`
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
`,eT=d.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`,tT=d.div`
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
`,rT=d.div`
  flex: 1;
  min-width: 0;
`,nT=d.span`
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
`,oT=d.span`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,iT=d.div`
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
`,sT=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;d.button`
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
`;d.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;d.div`
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
`;d.span`
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
`;const up=d.button`
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
`;d.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;d.button`
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
`;const aT=d.div`
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
`,lT=d.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
`,cT=d.div`
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
`,c1=d.div`
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
`,d1=d.div`
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
`,u1=d.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  white-space: pre-wrap;
  // user-select: none;

  ${e=>e.isOwn?`
    text-align: right;
  `:`
    text-align: left;
  `}
`;d.div`
  font-size: 11px;
  opacity: 0.7;

  ${e=>e.isOwn?`
    text-align: right;
  `:`
    text-align: left;
  `}
`;const dT=d.div`
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
`,pp=d.div`
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
`,p1=d.input`
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
`,f1=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`,h1=d.span`
  font-size: 11px;
  color: #72767d;
  font-style: italic;
  margin-left: 4px;
`,fp=d.div`
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
`,uT=d.div`
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
`,pT=d.span`
  color: #dcddde;
  font-weight: 500;
  cursor: default;
`,fT=d.div`
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
`,hT=d.div`
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
`,xT=d.button`
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
`,gT=d.div`
  padding: 12px 16px 16px;
  background-color: #2f3136;
  border-top: 1px solid #40444b;
  position: relative;
`,mT=d.div`
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
`,yT=d.div`
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
`,vT=d.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`,x1=d.button`
  color: #b9bbbe;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #dcddde;
  }
`,bT=d.textarea`
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
`,wT=d.div`
  width: 300px;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    z-index: 10;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--secondary-color);
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,kT=d.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
`,g1=d.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: var(--text-color);
  }
`,jT=d.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`,ST=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,CT=d.div`
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
`,zT=d.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
`,ET=d.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`,hp=d.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,xp=d.h4`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
  margin-bottom: 8px;
`,m1=d.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-all;
`,_T=d.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;

  &:hover {
    background-color: #4752c4;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,TT=d.div`
  display: flex;
  flex-direction: column;
`,$T=d.div`
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
`,RT=d.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,PT=({onBack:e,selectedChannel:t,selectedNav:r,navigate:o,chats:s=[]})=>{var vl,bl,wl,kl,jl;const[a,l]=f.useState(!1),{fetchMessages:c,sendMessage:u,editMessage:p,deleteMessage:x,getUserByUsername:h,createChat:m,editChat:k,previewGroupChat:w,joinGroupChat:j,chatSocket:C,markMessagesAsRead:y,typingUsers:v,sendTypingStatus:b,previewChat:g,setPreviewChat:T}=ni(),{isUserOnline:A,getOnlineCount:B}=oj(),z=s.find(q=>q.urlSlug===t||q.id===t),[H,D]=f.useState(""),U=f.useRef(null),[M,I]=f.useState([]),[P,E]=f.useState(1),[_,R]=f.useState(!0),[$,F]=f.useState(!1),[L,O]=f.useState(!1),S=je(q=>q.user),N=async q=>{const K=(S==null?void 0:S._id)||(S==null?void 0:S.id),ie=q._id||q.id;if(ie===K)return;const oe=s.find(G=>G.isGroup||!G.members||G.isSavedMessages?!1:G.members.some(me=>(me._id||me.id)===ie));if(oe)o(`/a/${oe.urlSlug}`),l(!1);else try{const G=await m({isGroup:!1,memberIds:[ie]});G&&(o(`/a/${G}`),l(!1))}catch(G){console.error("Failed to start private chat",G)}},[Q,X]=f.useState(null),[ee,ae]=f.useState(null),[de,le]=f.useState(""),te=z||g,[Z,ne]=f.useState(null),ze=f.useRef({}),J=f.useRef(null);f.useRef(null);const pe=f.useRef(null),Ae=(te==null?void 0:te.type)!=="group"&&(te!=null&&te.members)?te.members.find(q=>q._id!==((S==null?void 0:S._id)||(S==null?void 0:S.id))):null,Xe=Ae?A(Ae._id):!1,qe=(te==null?void 0:te.type)==="group"?B(te.members):0,Nt=Le.useMemo(()=>{if(!Ae||Xe)return"Online";if(!Ae.lastSeen)return"Offline";const q=new Date(Ae.lastSeen),ie=new Date-q,oe=Math.floor(ie/6e4),G=Math.floor(oe/60);return oe<60?`Last seen ${oe}m ago`:G<24?`Last seen ${G}h ago`:`Last seen ${q.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`},[Ae,Xe]),$t=f.useRef(null);f.useEffect(()=>{(r==="groups"||r==="users"||r==="a"||r==="chats")&&t&&!z?$t.current!==t&&($t.current=t,(async()=>{try{if(r==="users"){const{getPublicProfile:K}=await lp(async()=>{const{getPublicProfile:oe}=await Promise.resolve().then(()=>tp);return{getPublicProfile:oe}},void 0),ie=await K(t);if(ie){T({type:"user",id:null,name:ie.nickname||ie.username,avatar:ie.avatar,description:ie.bio,targetUserId:ie._id||ie.id});return}}if(r==="groups"||r==="a"||r==="chats")try{const K=await w(t);T(K)}catch(K){if(r==="groups"&&console.error("Group Preview failed, trying user resolution:",K),r!=="groups"){const{getPublicProfile:ie}=await lp(async()=>{const{getPublicProfile:G}=await Promise.resolve().then(()=>tp);return{getPublicProfile:G}},void 0),oe=await ie(t);T(oe?{type:"user",id:null,name:oe.nickname||oe.username,avatar:oe.avatar,description:oe.bio,targetUserId:oe._id||oe.id}:null)}else T(null)}else T(null)}catch(K){console.error("Preview resolution completely failed:",K),T(null)}})()):($t.current=null,T(null))},[r,t,z]),f.useEffect(()=>{if(!z)return;(async()=>{F(!0);const K=await c(z.id,1,30);I(K.data||[]),E(K.page||1),R((K.page||1)<(K.totalPages||1)),F(!1);const ie=K.data||[],oe=(S==null?void 0:S._id)||(S==null?void 0:S.id),G=ie.find(me=>{var xe;return me.senderId!==oe&&!((xe=me.readBy)!=null&&xe.includes(oe))});setTimeout(()=>{const me=G?G.id||G._id:null;me&&ze.current[me]?ze.current[me].scrollIntoView({behavior:"auto",block:"center"}):oi("auto")},100)})()},[z==null?void 0:z.id,c]);const fr=async()=>{if(!z||$||!_)return;F(!0);const q=document.getElementById("scrollableChatArea"),K=q?q.scrollHeight:0,ie=q?q.scrollTop:0,oe=P+1,G=await c(z.id,oe,30),me=G.data||[];I(xe=>[...me,...xe]),E(oe),R(oe<(G.totalPages||1)),F(!1),setTimeout(()=>{q&&(q.scrollTop=q.scrollHeight-K+ie)},0)};f.useEffect(()=>{if(!(!C||!z))return C.emit("join_chat",{chatId:z.id}),()=>{C.emit("leave_chat",{chatId:z.id})}},[C,z==null?void 0:z.id]),f.useEffect(()=>{if(!C)return;const q=G=>{var Oe,Ce,wt,_n,js,Ss,Cs,zs,Es;if(G.chatId!==(z==null?void 0:z.id))return;const me={id:G._id,user:((Oe=G.senderId)==null?void 0:Oe.nickname)||((Ce=G.senderId)==null?void 0:Ce.username),avatar:((wt=G.senderId)==null?void 0:wt.avatar)||((Ss=((_n=G.senderId)==null?void 0:_n.nickname)||((js=G.senderId)==null?void 0:js.username))==null?void 0:Ss.charAt(0))||"U",senderId:((Cs=G.senderId)==null?void 0:Cs._id)||G.senderId,content:G.content,timestamp:pt(G.createdAt).format("HH:mm"),date:pt(G.createdAt).format("YYYY-MM-DD"),edited:G.isEdited,isDeleted:G.isDeleted,readBy:G.readBy||[],replayTo:G.replayTo?{id:G.replayTo._id,user:((zs=G.replayTo.senderId)==null?void 0:zs.nickname)||((Es=G.replayTo.senderId)==null?void 0:Es.username),content:G.replayTo.content}:null};I(si=>si.some(Sl=>Sl.id===me.id)?si:[...si,me]);const xe=(S==null?void 0:S._id)||(S==null?void 0:S.id);me.senderId===xe&&setTimeout(()=>oi("smooth"),100)},K=G=>{G.chatId===(z==null?void 0:z.id)&&I(me=>me.map(xe=>xe.id===G._id?{...xe,content:G.content,edited:!0}:xe))},ie=G=>{G.chatId===(z==null?void 0:z.id)&&I(me=>me.filter(xe=>xe.id!==G._id))},oe=({chatId:G,readByUserId:me,messageIds:xe})=>{(z==null?void 0:z.id)===G&&I(Oe=>Oe.map(Ce=>{var _n;return(Ce.senderId&&typeof Ce.senderId=="object"?Ce.senderId._id||Ce.senderId.id:Ce.senderId)!==me&&(xe!=null&&xe.includes(Ce.id||Ce._id))&&!((_n=Ce.readBy)!=null&&_n.includes(me))?{...Ce,readBy:[...Ce.readBy||[],me]}:Ce}))};return C.on("message_new",q),C.on("message_updated",K),C.on("message_deleted",ie),C.on("messages_read",oe),()=>{C.off("message_new",q),C.off("message_updated",K),C.off("message_deleted",ie),C.off("messages_read",oe)}},[C,z==null?void 0:z.id]),f.useEffect(()=>{if(!z)return;const q=(S==null?void 0:S._id)||(S==null?void 0:S.id),K=M.filter(oe=>{var me;return(oe.senderId&&typeof oe.senderId=="object"?oe.senderId._id||oe.senderId.id:oe.senderId)!==q&&!((me=oe.readBy)!=null&&me.includes(q))});if(K.length===0)return;const ie=new IntersectionObserver(oe=>{const G=[];oe.forEach(me=>{var xe;if(me.isIntersecting){const Oe=me.target.dataset.messageId,Ce=M.find(wt=>String(wt.id)===String(Oe)||String(wt._id)===String(Oe));if(Ce){const wt=Ce.senderId&&typeof Ce.senderId=="object"?Ce.senderId._id||Ce.senderId.id:Ce.senderId;String(wt)!==String(q)&&!((xe=Ce.readBy)!=null&&xe.includes(q))&&G.push(Ce.id||Ce._id)}}}),G.length>0&&y(z.id,G)},{threshold:.1});return K.forEach(oe=>{const G=ze.current[oe.id];G&&ie.observe(G)}),()=>ie.disconnect()},[M,z,S,y]),f.useEffect(()=>{pe.current&&(pe.current.focus(),pe.current.setSelectionRange(pe.current.value.length,pe.current.value.length))},[t,r,Q]),f.useEffect(()=>{pe.current&&(pe.current.style.height="25px",pe.current.style.height=`${pe.current.scrollHeight}px`)},[H]);const[Nr,Se]=f.useState(0),[De,it]=f.useState(null),[bt,ce]=f.useState(null),[ue,ye]=f.useState(null),[ve,Ee]=f.useState(!1),[et,_e]=f.useState(!1),[Pe,Ye]=f.useState(""),[ut,nn]=f.useState(null),[hr,En]=f.useState(null),[vo,Ur]=f.useState(!1),ou=q=>{const K=`${window.location.origin}/${q}`;navigator.clipboard.writeText(K).then(()=>{Ur(!0),setTimeout(()=>Ur(!1),2e3)})};f.useEffect(()=>()=>{bt&&clearTimeout(bt),ue&&clearTimeout(ue)},[bt,ue]);const fl=Le.useMemo(()=>M,[M]),bo=(te==null?void 0:te.name)||"Chat",oi=(q="auto")=>{var K;(K=J.current)==null||K.scrollIntoView({behavior:q})},ii=q=>{const K=ze.current[q];K&&(K.scrollIntoView({behavior:"smooth",block:"center"}),K.style.backgroundColor="rgba(114, 137, 218, 0.3)",setTimeout(()=>{K.style.backgroundColor=""},2e3))},iu=(q,K)=>{De!==q.id?(Se(1),it(q.id)):Se(oe=>oe+1),bt&&clearTimeout(bt);const ie=setTimeout(()=>{Nr===1&&De===q.id&&(X(q),console.log("Replay triggered for message:",q),setTimeout(()=>{pe.current&&(pe.current.focus(),pe.current.setSelectionRange(pe.current.value.length,pe.current.value.length))},0)),Se(0),it(null)},300);ce(ie)},hl=(q,K)=>{const ie=K.clientX,oe=K.clientY,G=180,me=q.user==="You"?120:40;let xe=ie,Oe=oe;ie+G>window.innerWidth&&(xe=window.innerWidth-G-10),oe+me>window.innerHeight&&(Oe=window.innerHeight-me-10),xe<10&&(xe=10),Oe<10&&(Oe=10),ne({x:xe,y:Oe,message:q})},ys=async(q,K)=>{switch(q){case"delete":try{I(ie=>ie.map(oe=>oe.id===K.id?{...oe,isDeleted:!0,content:"Bu xabar o'chirildi"}:oe)),await x(K.id),console.log("Message deleted:",K)}catch(ie){console.error("Failed to delete message",ie)}break;case"edit":if(K.isDeleted)return;ae(K),le(K.content),console.log("Edit mode started for message:",K);break;case"replay":X(K),D(""),console.log("Replay message:",K),setTimeout(()=>{pe.current&&(pe.current.focus(),pe.current.setSelectionRange(pe.current.value.length,pe.current.value.length))},0);break}ne(null)},vs=async q=>{if(q.key==="Enter"&&de.trim())try{const K=de.trim();I(oe=>oe.map(G=>G.id===ee.id?{...G,content:K,edited:!0}:G));const ie=ee.id;ae(null),le(""),await p(ie,K),console.log("Message edited on backend:",ie,"->",K)}catch(K){console.error("Failed to edit message",K)}else q.key==="Escape"&&(ae(null),le(""))},he=q=>{const K=q.target.value;D(K);const ie=(z==null?void 0:z.id)||(z==null?void 0:z._id);ie&&K.trim()?(U.current||b(ie,!0),U.current&&clearTimeout(U.current),U.current=setTimeout(()=>{b(ie,!1),U.current=null},3e3)):ie&&!K.trim()&&U.current&&(clearTimeout(U.current),b(ie,!1),U.current=null)},su=()=>{const q=(z==null?void 0:z.id)||(z==null?void 0:z._id);if(!q||!v[q])return null;const K=v[q],ie=Object.keys(K);if(ie.length===0)return null;const oe=(S==null?void 0:S._id)||(S==null?void 0:S.id),G=ie.filter(me=>String(me)!==String(oe));if(G.length===0)return null;if(z.type==="user")return"yozmoqda";{const me=G.map(xe=>{var Ce;const Oe=(Ce=z.members)==null?void 0:Ce.find(wt=>String(wt._id||wt.id)===String(xe));return(Oe==null?void 0:Oe.nickname)||(Oe==null?void 0:Oe.username)||"Kimdir"});return me.length===1?`${me[0]} yozmoqda`:me.length===2?`${me[0]} va ${me[1]} yozmoqdalar`:"Bir necha kishi yozmoqda"}},mt=(q,K)=>{K.stopPropagation();const oe=[{id:200,name:"Ota"},{id:201,name:"Bob Smith"},{id:202,name:"Charlie Wilson"},{id:203,name:"Diana Brown"}].find(G=>G.name===q);oe&&o&&o(`/a/${oe.id}`)},wo=q=>{const K=q.split(" ");return K.length>=2?K[0][0]+K[K.length-1][0]:K[0].substring(0,2).toUpperCase()},xr=q=>{const K=/@(\w+)/g,ie=/(https?:\/\/[^\s]+)/g,oe=[];let G=0;const me=[];let xe;for(;(xe=K.exec(q))!==null;)me.push({type:"mention",index:xe.index,length:xe[0].length,username:xe[1],content:xe[0]});for(;(xe=ie.exec(q))!==null;)me.push({type:"url",index:xe.index,length:xe[0].length,url:xe[0],content:xe[0]});return me.sort((Oe,Ce)=>Oe.index-Ce.index),me.forEach(Oe=>{Oe.index>G&&oe.push({type:"text",content:q.substring(G,Oe.index)}),oe.push(Oe),G=Oe.index+Oe.length}),G<q.length&&oe.push({type:"text",content:q.substring(G)}),oe.length>0?oe:[{type:"text",content:q}]},xl=async(q,K)=>{K.stopPropagation();try{const ie=await h(q);if(console.log(ie,o,S),ie&&o){if(S&&ie.i_d===S._id){Ne.error("Siz o'zingiz bilan suhbat qura olmaysiz");return}const oe=s.find(G=>!G.isGroup&&G.members&&G.members.some(me=>me._id===ie._id));if(oe)o(`/a/${oe.urlSlug}`);else{const G=await m({isGroup:!1,memberIds:[ie._id]});console.log(G),G&&o(`/a/${G==null?void 0:G.jammId}`)}}else Ne.error("Bunday foydalanuvchi topilmadi")}catch(ie){console.error("Error handling mention click:",ie),Ne.error("Foydalanuvchini qidirishda xatolik yuz berdi")}},gl=q=>xr(q).map((ie,oe)=>ie.type==="mention"?i.jsx("span",{onClick:G=>xl(ie.username,G),style:{pointerEvents:"auto",color:"var(--primary-color)",backgroundColor:"var(--hover-color)",padding:"2px 4px",borderRadius:"4px",cursor:"pointer",fontWeight:"500",transition:"background-color 0.2s ease"},onMouseEnter:G=>{G.target.style.backgroundColor="var(--active-color)"},onMouseLeave:G=>{G.target.style.backgroundColor="var(--hover-color)"},children:ie.content},oe):ie.type==="url"?i.jsx("a",{href:ie.url,target:"_blank",rel:"noopener noreferrer",style:{color:"var(--primary-color)",textDecoration:"none",borderBottom:"1px solid transparent",transition:"border-color 0.2s ease",cursor:"pointer"},onMouseEnter:G=>{G.target.style.borderBottomColor="var(--primary-color)"},onMouseLeave:G=>{G.target.style.borderBottomColor="transparent"},children:ie.content}):i.jsx("span",{children:ie.content},oe)),au=["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😱","😭","😤","😠","😡","🤬","🤯","😳","🤪","😵","🥴","😵‍💫","🤯","🥶","🥵","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],ml=q=>{D(K=>K+q),Ee(!1),setTimeout(()=>{pe.current&&(pe.current.focus(),pe.current.setSelectionRange(pe.current.value.length,pe.current.value.length))},0)},qr=q=>{q.stopPropagation(),Ee(!ve),ve&&setTimeout(()=>{pe.current&&(pe.current.focus(),pe.current.setSelectionRange(pe.current.value.length,pe.current.value.length))},0)},bs=()=>{ne(null)},Wt=q=>{En({name:q}),setTimeout(()=>{En(null),Ye(q),_e(!0)},3e3)},yl=()=>{Ye(ut.name),_e(!0),nn(null)},ko=()=>{nn(null)},lu=()=>{En(null)},cu=()=>{_e(!1),Ye("")};f.useEffect(()=>{const q=ie=>{Z&&bs()},K=ie=>{ve&&!ie.target.closest(".emoji-picker-container")&&!ie.target.closest(".emoji-button")&&Ee(!1)};return document.addEventListener("click",q),document.addEventListener("click",K),()=>{document.removeEventListener("click",q),document.removeEventListener("click",K)}},[Z,ve]),f.useEffect(()=>{const q=K=>{ee&&!K.target.closest(".edit-input")&&(ae(null),le(""))};if(ee)return document.addEventListener("click",q),()=>{document.removeEventListener("click",q)}},[ee]);const ws=(q=>{const K=[];let ie=null;return q.forEach(oe=>{let G;if(oe.date)G=oe.date;else if(oe.timestamp){const me=new Date(oe.timestamp);isNaN(me.getTime())?G=pt().format("YYYY-MM-DD"):G=pt(me).format("YYYY-MM-DD")}else G=pt().format("YYYY-MM-DD");G!==ie&&(ie=G,K.push({type:"date",date:G,messages:[]})),K.push({type:"message",...oe,date:G})}),K})(fl),ks=q=>NE(q),du=async q=>{if(q.key==="Enter"&&!q.shiftKey&&(q.preventDefault(),H.trim())){const K=H.trim(),ie=Q?Q.id:null;D(""),X(null),setTimeout(()=>{pe.current&&pe.current.focus()},0);try{let oe=z==null?void 0:z.id;if(!oe&&(g==null?void 0:g.type)==="user"){const{createChat:G}=await lp(async()=>{const{createChat:me}=await Promise.resolve().then(()=>tp);return{createChat:me}},void 0);oe=await G({isGroup:!1,memberIds:[g.targetUserId]}),oe&&o(`/users/${oe}`)}if(oe){const G=await u(oe,K,ie);setTimeout(()=>oi("smooth"),100),console.log("Message sent to backend:",G)}}catch(oe){console.error("Failed to send message:",oe)}}};return i.jsxs(J_,{children:[i.jsxs(X_,{children:[i.jsxs(Z_,{children:[i.jsxs(eT,{onClick:()=>{["groups","users","a","chats"].includes(r)&&l(q=>!q)},style:{cursor:["groups","users","a","chats"].includes(r)?"pointer":"default"},children:[i.jsx(up,{onClick:q=>{q.stopPropagation(),e()},children:i.jsx(Dr,{size:20})}),i.jsx(tT,{$isSavedMessages:z==null?void 0:z.isSavedMessages,children:z!=null&&z.isSavedMessages?i.jsx(ah,{size:20,color:"white",fill:"white"}):((vl=z==null?void 0:z.avatar)==null?void 0:vl.length)>1?i.jsx("img",{src:z.avatar,alt:bo,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):bo.charAt(0).toUpperCase()}),i.jsxs(rT,{children:[i.jsx(nT,{children:r==="channels"?i.jsxs(i.Fragment,{children:[bo,(te==null?void 0:te.premiumStatus)==="active"&&i.jsx(Ho,{size:16,fill:"#ffaa00",color:"#ffaa00",style:{marginLeft:6,flexShrink:0}})]}):i.jsx(i.Fragment,{children:bo})}),i.jsx(oT,{children:su()?i.jsxs(mT,{children:[i.jsxs("div",{className:"dots",children:[i.jsx("div",{className:"dot"}),i.jsx("div",{className:"dot"}),i.jsx("div",{className:"dot"})]}),su()]}):(te==null?void 0:te.type)==="group"?i.jsxs(i.Fragment,{children:[i.jsx(jn,{size:14,style:{marginRight:4}}),((bl=te==null?void 0:te.members)==null?void 0:bl.length)||0," members",qe>0&&`, ${qe} online`]}):i.jsxs(i.Fragment,{children:[i.jsx(iT,{online:Xe}),Nt]})})]})]}),i.jsx(sT,{children:r=="users"&&i.jsxs(i.Fragment,{children:[i.jsx(up,{onClick:()=>Wt(z==null?void 0:z.name),children:i.jsx(qw,{size:20})}),i.jsx(up,{children:i.jsx(X3,{size:20})})]})})]}),i.jsx("div",{style:{display:"flex",flex:1,overflow:"hidden",position:"relative"},children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0},children:[i.jsxs(aT,{id:"scrollableChatArea",onContextMenu:q=>q.preventDefault(),children:[i.jsx(yo,{dataLength:M.length,next:fr,style:{display:"flex",flexDirection:"column"},inverse:!1,hasMore:_,loader:i.jsx("h4",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)"},children:"Yuklanmoqda..."}),scrollableTarget:"scrollableChatArea",children:i.jsx(lT,{children:ws.map((q,K)=>{var me;if(q.type==="date")return i.jsx(uT,{children:i.jsx("span",{children:ks(q.date)})},`date-${K}`);const ie=S?S._id||S.id:null,oe=q.senderId&&typeof q.senderId=="object"?q.senderId._id||q.senderId.id:q.senderId,G=ie&&oe===ie;return i.jsx(cT,{"data-message-id":q.id,isOwn:G,onClick:()=>iu(q),ref:xe=>{ze.current[q.id]=xe},children:G?i.jsxs(i.Fragment,{children:[q.replayTo&&i.jsxs(fp,{onClick:xe=>{xe.stopPropagation();const Ce=M.find(wt=>wt.user===q.replayTo.user&&wt.content===q.replayTo.content);Ce&&ii(Ce.id)},children:[q.replayTo.user,' - "',q.replayTo.content,'"']}),i.jsx(d1,{isOwn:!0,onContextMenu:xe=>{xe.preventDefault(),xe.stopPropagation(),hl(q,xe)},children:(ee==null?void 0:ee.id)===q.id?i.jsx(f1,{children:i.jsx(p1,{className:"edit-input",type:"text",value:de,onChange:xe=>le(xe.target.value),onKeyDown:vs,placeholder:"Xabarni tahrirlang...",autoFocus:!0})}):i.jsxs(i.Fragment,{children:[i.jsx(u1,{isOwn:!0,children:gl(q.content)}),q.edited&&i.jsx(h1,{children:"(tahrirlandi)"})]})}),i.jsxs(c1,{isOwn:!0,children:[i.jsx("span",{children:q.timestamp}),!q.isDeleted&&i.jsx("span",{style:{marginLeft:"4px",display:"flex",alignItems:"center"},children:q.readBy&&q.readBy.length>0?i.jsx(A3,{size:14,color:"#4ade80"}):i.jsx(sr,{size:14,color:"#72767d"})})]})]}):i.jsxs(i.Fragment,{children:[i.jsxs(c1,{isOwn:!1,children:[r==="groups"&&i.jsx(fT,{onClick:xe=>mt(q.user,xe),children:wo(q.user)}),i.jsx("div",{style:{flex:1},children:i.jsxs(pT,{children:[q.user,((me=q.senderId)==null?void 0:me.premiumStatus)==="active"&&i.jsx(Ho,{size:14,fill:"#ffaa00",color:"#ffaa00",style:{marginLeft:4,transform:"translateY(2px)"}})]})})]}),q.replayTo&&i.jsxs(fp,{onClick:xe=>{xe.stopPropagation();const Ce=M.find(wt=>wt.user===q.replayTo.user&&wt.content===q.replayTo.content);Ce&&ii(Ce.id)},children:[q.replayTo.user,' - "',q.replayTo.content,'"']}),i.jsx(d1,{isOwn:!1,onContextMenu:xe=>{xe.preventDefault(),xe.stopPropagation(),hl(q,xe)},children:(ee==null?void 0:ee.id)===q.id?i.jsx(f1,{children:i.jsx(p1,{className:"edit-input",type:"text",value:de,onChange:xe=>le(xe.target.value),onKeyDown:vs,placeholder:"Xabarni tahrirlang...",autoFocus:!0})}):i.jsxs(i.Fragment,{children:[i.jsx(u1,{isOwn:!1,children:gl(q.content)}),q.edited&&i.jsx(h1,{children:"(tahrirlandi)"})]})})]})},q.id)})})}),i.jsx("div",{ref:J})]}),i.jsx(gT,{children:g&&!z&&g.type!=="user"?i.jsxs("div",{style:{padding:"20px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[i.jsx("div",{style:{color:"var(--text-muted-color)"},children:"Siz ushbu guruh a'zosi emassiz"}),i.jsx("button",{onClick:async()=>{try{await j(g.privateurl||g.jammId),o(`/groups/${g.jammId||g.privateurl}`,{replace:!0})}catch(q){Ne.error(q.message||"Xatolik yuz berdi")}},style:{background:"#5865F2",color:"white",border:"none",padding:"10px 24px",borderRadius:"6px",cursor:"pointer",fontWeight:600,fontSize:"14px"},children:"Guruhga qo'shilish"})]}):i.jsxs(i.Fragment,{children:[Q&&i.jsx(fp,{onClick:()=>{ii(Q.id)},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[i.jsxs("div",{children:[i.jsx("strong",{style:{color:"#7289da"},children:Q.user}),i.jsx("div",{style:{fontSize:"12px",opacity:.8,marginTop:"2px"},children:Q.content})]}),i.jsx("span",{className:"replay-close",onClick:q=>{q.stopPropagation(),X(null)},children:"✕"})]})}),i.jsxs(yT,{children:[i.jsxs(vT,{children:[i.jsx(x1,{children:i.jsx(Ht,{size:20})}),i.jsx(x1,{onClick:qr,className:"emoji-button",children:i.jsx(s6,{size:20})})]}),i.jsx(bT,{id:"message-input",ref:pe,value:H,onChange:he,onKeyDown:du,placeholder:"Message...",rows:1})]}),ve&&i.jsx(hT,{className:"emoji-picker-container",style:{position:"fixed",bottom:"100px",right:"40px",backgroundColor:"#36393f",border:"3px solid #7289da",borderRadius:"12px",padding:"16px",boxShadow:"0 12px 24px rgba(0, 0, 0, 0.6)",zIndex:9999,display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"6px",maxWidth:"360px",maxHeight:"240px",overflowY:"auto"},children:au.map((q,K)=>i.jsx(xT,{onClick:()=>ml(q),style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"8px",borderRadius:"6px",minWidth:"32px",minHeight:"32px",display:"flex",alignItems:"center",justifyContent:"center"},children:q},K))})]})})]})}),Z&&i.jsxs(dT,{style:{left:`${Z.x}px`,top:`${Z.y}px`},onClick:q=>q.stopPropagation(),onContextMenu:q=>{q.preventDefault(),q.stopPropagation()},children:[i.jsxs(pp,{onClick:()=>ys("replay",Z.message),children:[i.jsx(t6,{size:16})," Javob yozish"]}),(()=>{var G,me;if(!S||!Z.message)return null;const q=S._id||S.id,ie=(Z.message.senderId&&typeof Z.message.senderId=="object"?Z.message.senderId._id||Z.message.senderId.id:Z.message.senderId)===q;let oe=!1;if(!ie&&(z==null?void 0:z.type)==="group"){const xe=z.createdBy===q,Oe=(G=z.admins)==null?void 0:G.find(Ce=>(Ce.userId||Ce.id||Ce._id)===q);oe=xe||Oe&&((me=Oe.permissions)==null?void 0:me.includes("delete_others_messages"))}return!ie&&!oe?null:i.jsxs(i.Fragment,{children:[ie&&i.jsxs(pp,{onClick:()=>ys("edit",Z.message),children:[i.jsx(o0,{size:16})," Tahrirlash"]}),i.jsxs(pp,{onClick:()=>ys("delete",Z.message),$danger:!0,children:[i.jsx(xs,{size:16})," O'chirish"]})]})})()]}),i.jsx(T_,{isOpen:!!ut,onAccept:yl,onReject:ko,caller:ut}),i.jsx(e1,{isOpen:!!hr,onCancel:lu,target:hr}),i.jsx(w_,{isOpen:et,onClose:cu,user:Pe})]}),a&&z&&i.jsxs(wT,{children:[i.jsxs(kT,{children:[i.jsx(g1,{onClick:()=>l(!1),children:i.jsx(nt,{size:20})}),i.jsx("span",{style:{flex:1,textAlign:"center"},children:z.type==="user"?"Foydalanuvchi ma'lumotlari":"Guruh ma'lumotlari"}),z.type==="group"?(()=>{var G,me;const q=(S==null?void 0:S._id)||(S==null?void 0:S.id),K=z.createdBy===q,ie=(G=z.admins)==null?void 0:G.find(xe=>(xe.userId||xe.id||xe._id)===q);return K||ie&&((me=ie.permissions)==null?void 0:me.length)>0?i.jsx(g1,{onClick:()=>O(!0),children:i.jsx(o0,{size:18})}):i.jsx("div",{style:{width:28}})})():i.jsx("div",{style:{width:28}})]}),i.jsxs(jT,{children:[i.jsxs(ST,{children:[i.jsx(CT,{style:z!=null&&z.isSavedMessages?{background:"#0288D1"}:{},children:z!=null&&z.isSavedMessages?i.jsx(ah,{size:40,color:"white",fill:"white"}):((wl=z==null?void 0:z.avatar)==null?void 0:wl.length)>1?i.jsx("img",{src:z.avatar,alt:z.name}):z.name.charAt(0)}),i.jsx(zT,{children:z.name}),i.jsx(ET,{children:z.type==="user"?(()=>{var ie;const q=(ie=z.members)==null?void 0:ie.find(oe=>{const G=oe._id||oe.id;return G!==(S==null?void 0:S.id)&&G!==(S==null?void 0:S._id)}),K=(q==null?void 0:q._id)||(q==null?void 0:q.id);return K?i.jsx("span",{style:{color:A(K)?"var(--primary-color)":"var(--text-muted-color)"},children:A(K)?"Online":q.lastSeen||q.lastActive?`Oxirgi marta: ${pt(q.lastSeen||q.lastActive).format("HH:mm")}`:"Offline"}):null})():i.jsxs(i.Fragment,{children:[((kl=z.members)==null?void 0:kl.length)||0," a'zo",qe>0&&` · ${qe} online`]})})]}),z.description&&i.jsxs(hp,{children:[i.jsx(xp,{children:"Haqida"}),i.jsx(m1,{children:z.description})]}),(te==null?void 0:te.type)==="group"&&i.jsxs(hp,{children:[i.jsx(xp,{children:"Taklif havolasi"}),i.jsxs(m1,{style:{fontSize:"12px",color:"var(--text-muted-color)"},children:[window.location.origin,"/",te.privateurl||te.urlSlug]}),i.jsx(_T,{onClick:()=>ou(te.privateurl||te.urlSlug),style:{backgroundColor:vo?"#43b581":""},children:vo?i.jsxs(i.Fragment,{children:[i.jsx(sr,{size:16,strokeWidth:2.5})," Nusxa olindi!"]}):i.jsxs(i.Fragment,{children:[i.jsx(Dx,{size:16,strokeWidth:2.5})," Nusxa olish"]})})]}),(te==null?void 0:te.type)==="group"&&i.jsxs(hp,{children:[i.jsxs(xp,{children:["A'zolar —"," ",(te==null?void 0:te.memberCount)||((jl=te==null?void 0:te.members)==null?void 0:jl.length)||0]}),i.jsxs(TT,{children:[(te==null?void 0:te.members)&&te.members.map(q=>{var G;const K=typeof q=="object"?q:null;if(!K)return null;const ie=K._id||K.id,oe=K.name||K.nickname||K.username||"Foydalanuvchi";return i.jsxs($T,{onClick:()=>N(K),children:[i.jsx(RT,{children:((G=K.avatar)==null?void 0:G.length)>1?i.jsx("img",{src:K.avatar,alt:oe,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):oe.charAt(0)}),i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsxs("span",{style:{fontSize:"14px",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px"},children:[oe,K.premiumStatus==="active"&&i.jsx(Ho,{size:12,fill:"#ffaa00",color:"#ffaa00"})]}),i.jsx("span",{style:{fontSize:"12px",color:A(ie)?"var(--primary-color)":"var(--text-muted-color)"},children:A(ie)?"Online":K.lastSeen||K.lastActive?`Oxirgi marta: ${pt(K.lastSeen||K.lastActive).format("HH:mm")}`:"Offline"})]})]},ie)}),(!(te!=null&&te.members)||te.members.length===0)&&i.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)"},children:"A'zolar ro'yxati mavjud emas"})]})]})]})]}),i.jsx(e1,{}),i.jsx(G_,{isOpen:L,onClose:()=>O(!1),group:z,users:s.filter(q=>q.type==="user"),onSave:async q=>{try{await k(z.id||z._id,q)}catch(K){console.error("Guruhni tahrirlashda xatolik",K)}}})]})},MT=({onSuccess:e,onError:t}={})=>X2({mutationFn:Bk,onSuccess:r=>{e==null||e(r)},onError:()=>{t==null||t()}}),OT=d.div`
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
`,AT=d.div`
  background-color: var(--secondary-color);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,IT=d.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,LT=d.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,DT=d.p`
  color: var(--text-muted-color);
  font-size: 14px;
`,BT=d.button`
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
`,FT=d.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,y1=d.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,gp=d.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
`,mp=d.input`
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
`,NT=d.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,UT=d.div`
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
`,qT=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,HT=d.div`
  position: relative;
  margin-bottom: 8px;
`,VT=d.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--tertiary-color);
`,YT=d.div`
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
`,WT=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,KT=d.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,QT=d.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
`,GT=d.div`
  background-color: var(--tertiary-color);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,v1=d.button`
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
`,XT=({isOpen:e,onClose:t,onCreate:r,users:o=[]})=>{const[s,a]=f.useState(""),[l,c]=f.useState(""),[u,p]=f.useState(""),[x,h]=f.useState([]),[m,k]=f.useState(""),w=f.useRef(null),j=MT({onSuccess:g=>p(g),onError:()=>toast.error("Rasm yuklashda xatolik yuz berdi")});if(!e)return null;const C=()=>{s.trim()&&(r({name:s,description:l,image:u,members:x}),a(""),c(""),p(""),h([]),t())},y=g=>{x.includes(g)?h(x.filter(T=>T!==g)):h([...x,g])},v=o.filter(g=>g.name.toLowerCase().includes(m.toLowerCase())&&g.type==="user"&&!g.isSavedMessages&&m.trim()!==""),b=g=>{var B;const T=(B=g.target.files)==null?void 0:B[0];if(!T)return;if(T.size>2*1024*1024){toast.error("Fayl hajmi juda katta (maksimum 2MB)");return}const A=new FormData;A.append("file",T),j.mutate(A)};return i.jsx(OT,{onClick:t,children:i.jsxs(AT,{onClick:g=>g.stopPropagation(),children:[i.jsxs(IT,{children:[i.jsx(LT,{children:"Guruh yaratish"}),i.jsx(DT,{children:"Do'stlaringiz bilan muloqot qiling"}),i.jsx(BT,{onClick:t,children:i.jsx(nt,{size:24})})]}),i.jsxs(FT,{children:[i.jsxs(NT,{children:[i.jsx("input",{type:"file",ref:w,style:{display:"none"},accept:"image/*",onChange:b}),i.jsx(UT,{onClick:()=>{w.current&&w.current.click()},children:j.isPending?i.jsx(po,{size:24,style:{animation:"spin 1s linear infinite"}}):u?i.jsx("img",{src:u,alt:"Group"}):i.jsxs(i.Fragment,{children:[i.jsx(Ux,{size:24}),i.jsx("span",{children:"UPLOAD"})]})})]}),i.jsxs(y1,{children:[i.jsx(gp,{children:"Guruh nomi"}),i.jsx(mp,{placeholder:"Yangi guruh",value:s,onChange:g=>a(g.target.value),autoFocus:!0})]}),i.jsxs(y1,{children:[i.jsx(gp,{children:"Guruh haqida (ixtiyoriy)"}),i.jsx(mp,{placeholder:"Guruh maqsadini yozing...",value:l,onChange:g=>c(g.target.value)})]}),i.jsxs(qT,{children:[i.jsxs(gp,{children:["Ishtirokchilar (",x.length,")"]}),i.jsxs(HT,{children:[i.jsx(mp,{placeholder:"User qidirish...",value:m,onChange:g=>k(g.target.value),style:{paddingLeft:30}}),i.jsx(Fx,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),m.trim()!==""&&i.jsx(VT,{children:v.length===0?i.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):v.map(g=>i.jsxs(YT,{selected:x.includes(g.id),onClick:()=>y(g.id),children:[i.jsxs(WT,{children:[i.jsx(KT,{children:g.avatar||g.name.charAt(0)}),i.jsx(QT,{children:g.name})]}),x.includes(g.id)&&i.jsx(sr,{size:16,color:"var(--primary-color)"})]},g.id))})]})]}),i.jsxs(GT,{children:[i.jsx(v1,{onClick:t,children:"Bekor qilish"}),i.jsx(v1,{primary:!0,onClick:C,disabled:!s.trim(),children:"Guruh yaratish"})]})]})})},JT=async(e=1,t=15)=>{const{data:r}=await be.get(`/courses?page=${e}&limit=${t}`);return r},ZT=async e=>{const{data:t}=await be.post("/courses",e);return t},e$=async e=>{await be.delete(`/courses/${e}`)},t$=async({courseId:e,...t})=>{await be.post(`/courses/${e}/lessons`,t)},r$=async({courseId:e,lessonId:t})=>{await be.delete(`/courses/${e}/lessons/${t}`)},n$=async(e,t,r=1,o=15)=>{const{data:s}=await be.get(`/courses/${e}/lessons/${t}/comments?page=${r}&limit=${o}`);return s},o$=async({courseId:e,lessonId:t,text:r})=>{await be.post(`/courses/${e}/lessons/${t}/comments`,{text:r})},i$=async({courseId:e,lessonId:t,commentId:r,text:o})=>{await be.post(`/courses/${e}/lessons/${t}/comments/${r}/replies`,{text:o})},s$=async e=>{await be.post(`/courses/${e}/enroll`)},a$=async({courseId:e,userId:t})=>{await be.patch(`/courses/${e}/members/${t}/approve`)},l$=async({courseId:e,userId:t})=>{await be.delete(`/courses/${e}/members/${t}`)},c$=async({courseId:e,lessonId:t})=>{await be.patch(`/courses/${e}/lessons/${t}/views`)},sj=f.createContext(null),d$="http://localhost:3000",u$=()=>{var e;try{const t=localStorage.getItem("auth-storage");if(!t)return null;const r=JSON.parse(t);return((e=r==null?void 0:r.state)==null?void 0:e.user)||null}catch{return null}},p$=({children:e})=>{const[t,r]=f.useState([]),[o,s]=f.useState(!0),[a,l]=f.useState(1),[c,u]=f.useState(!0),p=f.useRef(null),x=u$(),h=f.useCallback(async(M=1)=>{try{M===1&&s(!0);const I=await JT(M,15),P=(I==null?void 0:I.data)||[],E=(I==null?void 0:I.totalPages)||1,_=P.map(R=>({...R,id:R._id,createdBy:R.createdBy}));r(R=>M===1?_:[...R,..._]),l(M),u(M<E)}catch(I){console.error("Error fetching courses:",I)}finally{M===1&&s(!1)}},[]);f.useEffect(()=>{},[]),f.useEffect(()=>{var E,_;let M=null;try{const R=localStorage.getItem("auth-storage");R&&(M=((_=(E=JSON.parse(R))==null?void 0:E.state)==null?void 0:_.token)||null)}catch{}if(!M)return;const I=d$.replace("http","ws")+"/courses";p.current=ao(I,{auth:{token:M},transports:["websocket"]});const P=R=>{console.log("Course socket event receive:",R),h()};return p.current.on("course_enrolled",P),p.current.on("member_approved",P),p.current.on("member_rejected",P),p.current.on("member_approved_broadcast",P),p.current.on("member_rejected_broadcast",P),()=>{p.current&&p.current.disconnect()}},[h]);const m=f.useCallback(M=>{p.current&&p.current.connected&&p.current.emit("join_course",{courseId:M})},[]),k=f.useCallback(M=>{p.current&&p.current.connected&&p.current.emit("leave_course",{courseId:M})},[]),w=f.useCallback(async(M,I,P,E,_,R)=>{try{const $=await ZT({name:M,description:I,image:P,category:E,price:_,accessType:R});return await h(),$._id}catch($){throw console.error("Error creating course:",$),$}},[h]),j=f.useCallback(async M=>{try{return await e$(M),await h(),!0}catch(I){throw console.error("Error deleting course:",I),I}},[h]),C=f.useCallback(async(M,I,P,E,_="video",R="",$="",F=0)=>{try{await t$({courseId:M,title:I,videoUrl:P,description:E,type:_,fileUrl:R,fileName:$,fileSize:F}),await h()}catch(L){console.error("Error adding lesson:",L)}},[h]),y=f.useCallback(async(M,I,P=1,E=15)=>{try{return await n$(M,I,P,E)}catch(_){return console.error("Error getting lesson comments:",_),{data:[],totalPages:1}}},[]),v=f.useCallback(async(M,I)=>{try{await r$({courseId:M,lessonId:I}),await h()}catch(P){console.error("Error removing lesson:",P)}},[h]),b=f.useCallback(async(M,I,P)=>{try{await o$({courseId:M,lessonId:I,text:P}),await h()}catch(E){console.error("Error adding comment:",E)}},[h]),g=f.useCallback(async(M,I,P,E)=>{try{await i$({courseId:M,lessonId:I,commentId:P,text:E}),await h()}catch(_){console.error("Error adding reply:",_)}},[h]),T=f.useCallback(async M=>{try{await s$(M),await h()}catch(I){console.error("Error enrolling:",I)}},[h]),A=f.useCallback(async(M,I)=>{try{await a$({courseId:M,userId:I}),await h()}catch(P){console.error("Error approving user:",P)}},[h]),B=f.useCallback(async(M,I)=>{try{await l$({courseId:M,userId:I}),await h()}catch(P){console.error("Error removing user:",P)}},[h]),z=f.useCallback(async(M,I)=>{try{await c$({courseId:M,lessonId:I}),r(P=>P.map(E=>E.id!==M?E:{...E,lessons:E.lessons.map(_=>_.id===I?{..._,views:_.views+1}:_)}))}catch(P){console.error("Error incrementing views:",P)}},[]),H=f.useCallback(M=>{if(!x)return!1;const I=t.find(P=>(P._id||P.id)===M);return(I==null?void 0:I.createdBy)===x._id},[t,x]),D=f.useCallback(M=>{var E;if(!x)return"none";const I=t.find(_=>(_._id||_.id)===M);if((I==null?void 0:I.createdBy)===x._id)return"admin";const P=(E=I==null?void 0:I.members)==null?void 0:E.find(_=>(_._id||_.id||_.userId)===x._id);return P?P.status:"none"},[t,x]),U={courses:t,currentUser:x?{id:x._id,name:x.nickname||x.username,avatar:(x.nickname||x.username||"").substring(0,2).toUpperCase(),isAdmin:!0}:null,createCourse:w,removeCourse:j,addLesson:C,removeLesson:v,getLessonComments:y,addComment:b,addReply:g,enrollInCourse:T,approveUser:A,removeUser:B,incrementViews:z,isAdmin:H,isEnrolled:D,loading:o,coursesPage:a,coursesHasMore:c,fetchCourses:h,joinCourseRoom:m,leaveCourseRoom:k};return i.jsx(sj.Provider,{value:U,children:e})},dl=()=>{const e=f.useContext(sj);if(!e)throw new Error("useCourses must be used within CoursesProvider");return e},f$=d.div`
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
`,h$=d.div`
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
`,x$=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,g$=d.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,m$=d.button`
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
`,y$=d.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,aj=d.div`
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
`,v$=d.div`
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

  ${aj}:hover & {
    opacity: 1;
  }
`,b$=d.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`,w$=d.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,di=d.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,ui=d.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,yp=d.input`
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
`,k$=d.textarea`
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
`,j$=d.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,b1=d.button`
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
`,S$=({isOpen:e,onClose:t,onCreated:r,onOpenPremium:o})=>{const{createCourse:s}=dl(),[a,l]=f.useState(""),[c,u]=f.useState(""),[p,x]=f.useState(""),[h,m]=f.useState("IT"),[k,w]=f.useState(0),[j,C]=f.useState("free_request");f.useRef(null);const[y,v]=f.useState(""),[b,g]=f.useState(!1);if(!e)return null;const T=async()=>{if(a.trim()){v(""),g(!0);try{const z=await s(a.trim(),c.trim(),p,h,k,j);l(""),u(""),x(""),m("IT"),w(0),C("free_request"),r(z)}catch(z){z.message.includes("Premium")||z.message.includes("maksimal")?(t(),o&&o()):v(z.message||"Kurs yaratishda xatolik yuz berdi")}finally{g(!1)}}},A=z=>{x(z.target.value)},B=z=>{z.key==="Escape"&&t()};return i.jsx(f$,{onClick:t,onKeyDown:B,children:i.jsxs(h$,{onClick:z=>z.stopPropagation(),children:[i.jsxs(x$,{children:[i.jsx(g$,{children:"Yangi kurs yaratish"}),i.jsx(m$,{onClick:t,children:i.jsx(nt,{size:18})})]}),i.jsxs(y$,{children:[i.jsx(aj,{hasImage:!!p,children:p?i.jsxs(i.Fragment,{children:[i.jsx(b$,{src:p,alt:"Course",onError:()=>x("")}),i.jsx(v$,{children:"Rasmni o'zgartirish"})]}):i.jsxs(i.Fragment,{children:[i.jsx(dh,{size:32,color:"var(--text-muted-color)"}),i.jsx(w$,{children:"Kurs uchun rasm URL kiriting"})]})}),i.jsxs(di,{children:[i.jsx(ui,{children:"Rasm URL (ixtiyoriy)"}),i.jsx(yp,{type:"url",placeholder:"https://example.com/image.jpg",value:p,onChange:A})]}),i.jsxs(di,{children:[i.jsx(ui,{children:"Kurs nomi *"}),i.jsx(yp,{type:"text",placeholder:"Masalan: React Asoslari",value:a,onChange:z=>l(z.target.value),autoFocus:!0})]}),i.jsxs(di,{children:[i.jsx(ui,{children:"Kategoriya"}),i.jsxs("select",{value:h,onChange:z=>m(z.target.value),style:{padding:"10px 14px",backgroundColor:"var(--input-color)",color:"var(--text-color)",border:"none",borderRadius:"8px",outline:"none"},children:[i.jsx("option",{value:"IT",children:"IT & Dasturlash"}),i.jsx("option",{value:"SMM",children:"SMM & Marketing"}),i.jsx("option",{value:"Til o'rganish",children:"Til o'rganish"}),i.jsx("option",{value:"Mobile",children:"Mobil Dasturlash"}),i.jsx("option",{value:"Design",children:"Dizayn"})]})]}),i.jsxs(di,{children:[i.jsx(ui,{children:"Ruxsat turi"}),i.jsxs("select",{value:j,onChange:z=>C(z.target.value),style:{padding:"10px 14px",backgroundColor:"var(--input-color)",color:"var(--text-color)",border:"none",borderRadius:"8px",outline:"none"},children:[i.jsx("option",{value:"free_request",children:"Ruxsat so'rab (Tekin)"}),i.jsx("option",{value:"free_open",children:"Ruxsatsiz ochiq (Tekin)"}),i.jsx("option",{value:"paid",children:"Pullik"})]})]}),j==="paid"&&i.jsxs(di,{children:[i.jsx(ui,{children:"Narxi (UZS)"}),i.jsx(yp,{type:"number",min:"0",placeholder:"Masalan: 500000",value:k,onChange:z=>w(Number(z.target.value))})]}),i.jsxs(di,{children:[i.jsx(ui,{children:"Tavsif"}),i.jsx(k$,{placeholder:"Kurs haqida qisqacha ma'lumot...",value:c,onChange:z=>u(z.target.value)})]}),y&&i.jsx("div",{style:{color:"#ef4444",fontSize:"14px",marginTop:"8px"},children:y})]}),i.jsxs(j$,{children:[i.jsx(b1,{$variant:"secondary",onClick:t,disabled:b,children:"Bekor qilish"}),i.jsx(b1,{$variant:"primary",onClick:T,disabled:!a.trim()||b,children:b?"Yaratilmoqda...":"Yaratish"})]})]})})},C$=d.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`,z$=d.div`
  background-color: #36393f;
  border-radius: 12px;
  padding: 24px;
  max-width: 450px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 95%;
    max-width: 95%;
    padding: 16px;
    margin: 0 16px;
  }
`,E$=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,_$=d.h2`
  color: #dcddde;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  /* If danger, we can style icon */
  svg {
    color: ${e=>e.isDanger?"#ef4444":"#7289da"};
  }
`,T$=d.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }
`,$$=d.div`
  color: #b9bbbe;
  margin-bottom: 24px;
  line-height: 1.5;
  font-size: 15px;
`,R$=d.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,w1=d.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${e=>e.variant==="danger"?`
        background-color: #da373c;
        color: white;
        &:hover {
          background-color: #a1282c;
          transform: translateY(-1px);
        }
      `:e.variant==="primary"?`
        background-color: #7289da;
        color: white;
        &:hover {
          background-color: #677bc4;
          transform: translateY(-1px);
        }
      `:`
        background-color: transparent;
        color: #dcddde;
        &:hover {
          text-decoration: underline;
        }
      `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,lj=({isOpen:e,onClose:t,title:r,description:o,confirmText:s="Tasdiqlash",cancelText:a="Bekor qilish",onConfirm:l,isDanger:c=!1})=>e?i.jsx(C$,{onClick:t,children:i.jsxs(z$,{onClick:u=>u.stopPropagation(),children:[i.jsxs(E$,{children:[i.jsxs(_$,{isDanger:c,children:[c&&i.jsx(T3,{size:24}),r]}),i.jsx(T$,{onClick:t,children:i.jsx(nt,{size:20})})]}),i.jsx($$,{children:o}),i.jsxs(R$,{children:[i.jsx(w1,{onClick:t,children:a}),i.jsx(w1,{variant:c?"danger":"primary",onClick:()=>{l()},children:s})]})]})}):null,P$=d.div`
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
`,M$=d.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  height: 56ppx;
  align-items: center;
  justify-content: space-between;
`;d.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;const O$=d.button`
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
`,A$=d.div`
  display: flex;
  padding: 16px 16px 0 16px;
  gap: 8px;
`,k1=d.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${e=>e.active?"var(--primary-color)":"var(--background-color)"};
  color: ${e=>e.active?"white":"var(--text-color)"};
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;d.div`
  padding: 12px 16px;
`;d.input`
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
`;const j1=d.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`,Jl=d.div`
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
`,Zl=d.div`
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
`,ec=d.div`
  flex: 1;
  min-width: 0;
`,tc=d.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,rc=d.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,I$=d.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`,L$=d.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted-color);
`;d.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;const D$=d.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;

  ${e=>{switch(e.status){case"admin":return"background: rgba(88, 101, 242, 0.15); color: var(--primary-color);";case"approved":return"background: rgba(67, 181, 129, 0.15); color: var(--success-color);";case"pending":return"background: rgba(250, 166, 26, 0.15); color: var(--warning-color);";default:return"background: var(--input-color); color: var(--text-muted-color);"}}}
`,B$=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  gap: 12px;
`,F$=d.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`,N$=({selectedCourse:e,onSelectCourse:t,onOpenPremium:r,viewMode:o="courses",onToggleViewMode:s,activeArenaTab:a,setActiveArenaTab:l})=>{console.log(e);const c=pr(),{courses:u,coursesPage:p,coursesHasMore:x,isAdmin:h,isEnrolled:m,removeCourse:k,fetchCourses:w}=dl(),[j,C]=f.useState(""),y=Le.useRef(!1);Le.useEffect(()=>{o==="courses"&&!y.current&&(y.current=!0,w()),o!=="courses"&&(y.current=!1)},[w,o]);const[v,b]=f.useState(!1),[g,T]=f.useState(null),[A,B]=f.useState(!1),z=Le.useMemo(()=>j?u.filter(M=>M.name.toLowerCase().includes(j.toLowerCase())||M.description.toLowerCase().includes(j.toLowerCase())):u.filter(M=>{const I=m(M._id);return I==="admin"||I==="approved"||I==="pending"}),[u,j,m]),H=M=>{switch(m(M)){case"admin":return{text:"Admin",icon:null};case"approved":return{text:"A'zo",icon:i.jsx(Jo,{size:10})};case"pending":return{text:"Kutilmoqda",icon:i.jsx(uo,{size:10})};default:return null}},D=M=>{t(M._id);const I=M.urlSlug||M._id;window.history.replaceState(null,"",`/courses/${I}`)},U=async()=>{if(g)try{B(!0),await k(g._id),e===g._id&&(t(null),window.history.replaceState(null,"","/courses")),T(null)}catch(M){console.error(M),toast.error("Kursni o'chirishda xatolik yuz berdi")}finally{B(!1)}};return i.jsxs(i.Fragment,{children:[i.jsxs(P$,{children:[i.jsxs(A$,{children:[i.jsxs(k1,{active:o==="courses",onClick:()=>{s&&s("courses"),c("/courses")},children:[i.jsx(ss,{size:16})," Kurslar"]}),i.jsxs(k1,{active:o==="arena",onClick:()=>{s&&s("arena"),t(null),c("/arena")},children:[i.jsx(xd,{size:16})," Maydon"]})]}),o==="arena"?i.jsxs(j1,{style:{paddingTop:"16px"},children:[i.jsxs(Jl,{active:a==="tests",onClick:()=>{l&&l("tests"),c("/arena/quiz")},children:[i.jsx(Zl,{gradient:"linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",children:i.jsx(ss,{size:20,color:"white"})}),i.jsxs(ec,{children:[i.jsx(tc,{children:"Testlar"}),i.jsx(rc,{children:"Ochiq testlarni ishlash"})]})]}),i.jsxs(Jl,{active:a==="flashcards",onClick:()=>{l&&l("flashcards"),c("/arena/flashcard")},children:[i.jsx(Zl,{gradient:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",children:i.jsx(Y3,{size:20,color:"white"})}),i.jsxs(ec,{children:[i.jsx(tc,{children:"Flashcards"}),i.jsx(rc,{children:"Lug'atlarni yodlash"})]})]}),i.jsxs(Jl,{active:a==="battles",onClick:()=>{l&&l("battles"),c("/arena/battle")},children:[i.jsx(Zl,{gradient:"linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",children:i.jsx(xd,{size:20,color:"white"})}),i.jsxs(ec,{children:[i.jsx(tc,{children:"Bilimlar bellashuvi"}),i.jsx(rc,{children:"Real vaqt musobaqa"})]})]})]}):i.jsxs(i.Fragment,{children:[i.jsxs(M$,{children:[i.jsx("input",{type:"text",placeholder:"Kurslarni qidirish...",value:j,onChange:M=>C(M.target.value),style:{flex:1,marginRight:"12px",padding:"8px 12px",borderRadius:"6px",border:"1px solid var(--border-color)",background:"var(--input-color)",color:"var(--text-color)"}}),i.jsx(O$,{onClick:()=>b(!0),title:"Yangi kurs yaratish",children:i.jsx(Ht,{size:18})})]}),i.jsx(j1,{id:"sidebarCoursesArea",children:z.length===0?i.jsxs(B$,{children:[i.jsx(F$,{children:i.jsx(Zo,{size:24})}),i.jsx("span",{children:"Hozircha kurslar yo'q"}),i.jsx("span",{style:{fontSize:12},children:"Yangi kurs yaratish uchun + tugmasini bosing"})]}):i.jsx(yo,{dataLength:z.length,next:()=>w(p+1),hasMore:x&&!j,loader:i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Yuklanmoqda..."}),endMessage:z.length>0&&!j?i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Barcha kurslar ko'rsatildi."}):null,scrollableTarget:"sidebarCoursesArea",style:{display:"flex",flexDirection:"column",overflow:"visible"},children:z.map(M=>{const I=H(M._id),P=(M.members||[]).filter(E=>E.status==="approved").length;return i.jsxs(Jl,{active:e===M._id||e===M.urlSlug,onClick:()=>D(M),children:[i.jsx(Zl,{src:M.image,gradient:M.gradient,children:!M.image&&M.name.charAt(0)}),i.jsxs(ec,{children:[i.jsx(tc,{children:M.name}),i.jsxs(rc,{children:[(M.lessons||[]).length>0?`${M.lessons.length} ta dars`:"Hali dars yo'q",I&&i.jsxs(D$,{status:m(M._id),children:[I.icon,I.text]})]})]}),i.jsxs(I$,{children:[i.jsxs(L$,{children:[i.jsx(jn,{size:12}),P]}),h(M._id)&&i.jsx("div",{onClick:E=>{E.stopPropagation(),T(M)},style:{color:"var(--text-muted-color)",cursor:"pointer",padding:"2px",borderRadius:"4px",display:"flex"},onMouseOver:E=>{E.currentTarget.style.color="var(--danger-color)",E.currentTarget.style.backgroundColor="rgba(239, 68, 68, 0.1)"},onMouseOut:E=>{E.currentTarget.style.color="var(--text-muted-color)",E.currentTarget.style.backgroundColor="transparent"},title:"Kursni o'chirish",children:i.jsx(xs,{size:14})})]})]},M._id)})})})]})]}),i.jsx(S$,{isOpen:v,onClose:()=>b(!1),onCreated:M=>{b(!1);const I=u.find(P=>P._id===M);I?D(I):t(M)},onOpenPremium:r}),i.jsx(lj,{isOpen:!!g,onClose:()=>T(null),title:"Kursni o'chirish",description:i.jsxs(i.Fragment,{children:["Rostdan ham ",i.jsx("b",{children:g==null?void 0:g.name})," kursni o'chirmoqchimisiz? Bu amalni keyin tiklab bo'lmaydi va kursga tegishli barcha videolar, fayllar va ma'lumotlar o'chib ketadi."]}),confirmText:A?"O'chirilmoqda...":"Ha, o'chirish",cancelText:"Yo'q, qolsin",onConfirm:U,isDanger:!0})]})},U$=d.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
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
`,q$=d.div`
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
`,H$=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,V$=d.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,Y$=d.button`
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
`,W$=d.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Ds=d.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Bs=d.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,S1=d.input`
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
`,K$=d.textarea`
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
`,Q$=d.div`
  display: flex;
  background-color: var(--input-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
  padding: 4px;
  gap: 4px;
`,C1=d.button`
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
`,G$=d.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,X$=d.label`
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
`,J$=d.input`
  display: none;
`,Z$=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--input-color);
  border-radius: 8px;
  border: 1px solid var(--primary-color);
`,eR=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
`,tR=d.span`
  color: var(--text-muted-color);
  font-size: 12px;
`,rR=d.button`
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
`,nR=d.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,z1=d.button`
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
`,oR=({isOpen:e,onClose:t,courseId:r})=>{const{addLesson:o}=dl(),s=je(H=>H.user),a=(s==null?void 0:s.premiumStatus)==="active",[l,c]=f.useState(""),[u,p]=f.useState(a?"upload":"url"),[x,h]=f.useState(""),[m,k]=f.useState(null),[w,j]=f.useState(""),[C,y]=f.useState(!1),v=f.useRef(null),b="http://localhost:3000";if(f.useEffect(()=>{e&&p(a?"upload":"url")},[e,a]),!e)return null;const g=H=>{H.target.files&&H.target.files[0]&&k(H.target.files[0])},T=()=>{k(null),v.current&&(v.current.value="")},A=H=>{if(H===0)return"0 Bytes";const D=1024,U=["Bytes","KB","MB","GB"],M=Math.floor(Math.log(H)/Math.log(D));return parseFloat((H/Math.pow(D,M)).toFixed(2))+" "+U[M]},B=()=>!(!l.trim()||u==="url"&&!x.trim()||u==="upload"&&!m),z=async()=>{if(!(!B()||C)){y(!0);try{let H="",D="",U=0,M="",I="video";if(u==="upload"&&m&&a){const P=new FormData;P.append("file",m);const E=je.getState().token,_=await fetch(`${b}/courses/upload-media`,{method:"POST",headers:{Authorization:`Bearer ${E}`},body:P});if(!_.ok)throw new Error("Upload failed");const R=await _.json();H=R.url,D=R.fileName,U=R.fileSize,I="file"}else M=x.trim(),I="video";await o(r,l.trim(),M,w.trim(),I,H,D,U),c(""),h(""),k(null),j(""),p(a?"upload":"url"),t()}catch(H){console.error(H),Ne.error("Yuklashda xatolik yuz berdi")}finally{y(!1)}}};return i.jsx(U$,{onClick:t,children:i.jsxs(q$,{onClick:H=>H.stopPropagation(),children:[i.jsxs(H$,{children:[i.jsx(V$,{children:"Yangi dars qo'shish"}),i.jsx(Y$,{onClick:t,children:i.jsx(nt,{size:18})})]}),i.jsxs(W$,{children:[i.jsxs(Ds,{children:[i.jsx(Bs,{children:"Dars nomi *"}),i.jsx(S1,{type:"text",placeholder:"Masalan: React Hooks asoslari",value:l,onChange:H=>c(H.target.value),autoFocus:!0})]}),i.jsxs(Ds,{children:[i.jsx(Bs,{children:"Video/Fayl manbasi *"}),a?i.jsxs(Q$,{children:[i.jsx(C1,{active:u==="upload",onClick:()=>p("upload"),type:"button",children:"Fayl yuklash (Max 100MB)"}),i.jsx(C1,{active:u==="url",onClick:()=>p("url"),type:"button",children:"YouTube URL"})]}):i.jsx("div",{style:{padding:"8px",background:"rgba(251, 191, 36, 0.1)",color:"#fbbf24",borderRadius:"8px",fontSize:"13px",marginBottom:"8px"},children:"Fayl yuklash uchun Premium obuna talab qilinadi. Bepul tarifda faqat YouTube URL orqali video qo'shishingiz mumkin."})]}),u==="upload"&&a?i.jsxs(Ds,{children:[i.jsx(Bs,{children:"Video/Fayl *"}),i.jsx(G$,{children:m?i.jsxs(Z$,{children:[i.jsxs(eR,{children:[i.jsx(U3,{size:20,color:"var(--primary-color)"}),i.jsxs("div",{children:[m.name,i.jsx(tR,{style:{display:"block",marginTop:"2px"},children:A(m.size)})]})]}),i.jsx(rR,{onClick:T,children:i.jsx(nt,{size:16})})]}):i.jsxs(X$,{children:[i.jsx(Ux,{size:24}),i.jsx("span",{style:{marginBottom:"4px",fontWeight:600},children:"Faylni yuklang yoki shu yerga tashlang"}),i.jsx("span",{style:{fontSize:"12px"},children:"MP4, WEBM, MOV (Max: 100MB)"}),i.jsx(J$,{type:"file",accept:"video/*",onChange:g,ref:v})]})})]}):i.jsxs(Ds,{children:[i.jsx(Bs,{children:"YouTube Video URL *"}),i.jsx(S1,{type:"url",placeholder:"https://youtu.be/...",value:x,onChange:H=>h(H.target.value)})]}),i.jsxs(Ds,{children:[i.jsx(Bs,{children:"Tavsif (ixtiyoriy)"}),i.jsx(K$,{placeholder:"Dars haqida qisqacha...",value:w,onChange:H=>j(H.target.value)})]})]}),i.jsxs(nR,{children:[i.jsx(z1,{onClick:t,disabled:C,children:"Bekor qilish"}),i.jsx(z1,{primary:!0,disabled:!B()||C,onClick:z,children:C?i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx(Yd,{size:16,className:"spin"})," Yuklanmoqda..."]}):"Qo'shish"})]})]})})},iR=d.div`
  flex: 1;
  display: flex;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 1300px) {
    flex-direction: column;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,sR=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
  }
`,E1=d.div`
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
`,aR=d.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;d.div`
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
`;const lR=d.iframe`
  width: 100%;
  height: 100%;
  border: none;
`,_1=d.div`
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
`,T1=d.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,cR=d.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  pointer-events: ${e=>e.isYoutube?"none":"auto"};
`,dR=d.button`
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
`,uR=d.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,cj=d.div`
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
`,pR=d.div`
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

  ${cj}:hover &::after {
    opacity: 1;
  }
`,fR=d.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
`,hR=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,xR=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,gR=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,pi=d.button`
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
`,mR=d.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;
`,dj=d.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,yR=d.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${dj}:hover & {
    width: 70px;
    opacity: 1;
  }
`,vR=d.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,bR=d.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,wR=d.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`,kR=d.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`,jR=d.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`,SR=d.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`,CR=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;d.div`
  display: flex;
  align-items: center;
`;const zR=d.div`
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
`;d.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;const fi=d.button`
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
`,ER=d.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${e=>e.open?"400px":"0"};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`,_R=d.div`
  padding: 16px 24px;
`,$1=d.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-bottom: 12px;
`,R1=d.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`,P1=d.div`
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
`,M1=d.div`
  flex: 1;
`,O1=d.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`,A1=d.div`
  font-size: 12px;
  color: ${e=>e.pending?"var(--warning-color)":"var(--success-color)"};
`,I1=d.div`
  display: flex;
  gap: 6px;
`,vp=d.button`
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
`,L1=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`,D1=d.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`,TR=d.div`
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
`,$R=d.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`,RR=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,bp=d.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`,PR=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,MR=d.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`,OR=d.button`
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
`,AR=d.button`
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
`,IR=d.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${e=>e.collapsed?"0":"500px"};
    overflow: ${e=>e.collapsed?"hidden":"auto"};
    transition: max-height 0.3s ease;
  }
`,uj=d.div`
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
`,LR=d.div`
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
`,DR=d.div`
  flex: 1;
  min-width: 0;
`,BR=d.div`
  font-size: 14px;
  font-weight: ${e=>e.active?"600":"500"};
  color: ${e=>e.active?"var(--text-color)":"var(--text-secondary-color)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`,FR=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`,NR=d.span`
  display: flex;
  align-items: center;
  gap: 3px;
`,UR=d.button`
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

  ${uj}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
  }
`,qR=d.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`,HR=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`,VR=d.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #7c8cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.3);
`,YR=d.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`,WR=d.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`,KR=d.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
`,QR=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`,GR=d.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,XR=d.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted-color);
`,JR=d.div`
  background: var(--input-color);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--hover-color);
  }
`;d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;d.span`
  font-size: 13px;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;const ZR=d.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
`,nc=d.div`
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
`,eP=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,tP=d.input`
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
`,rP=d.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`,B1=d.button`
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
`,nP=d.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,F1=d.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,N1=d.div`
  flex: 1;
  min-width: 0;
`,U1=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,q1=d.span`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.isAdmin?"var(--primary-color)":"var(--text-color)"};
`,H1=d.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(88, 101, 242, 0.15);
  color: var(--primary-color);
`,V1=d.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Y1=d.p`
  font-size: 14px;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
`,oP=d.button`
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
`,iP=d.div`
  margin-left: 48px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,sP=d.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
`,aP=d.input`
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
`,lP=d.button`
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
`;d.div`
  text-align: center;
  padding: 20px;
  color: var(--text-muted-color);
  font-size: 14px;
`;d.button`
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
`;const cP=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`;function wp(e){if(isNaN(e))return"0:00";const t=Math.floor(e/3600),r=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}:${r.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${r}:${o.toString().padStart(2,"0")}`}function W1(e){return e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"K":e.toString()}function K1(e){const t=new Date(e),o=new Date-t;if(isNaN(o))return"Noma'lum vaqt";const s=Math.floor(o/6e4),a=Math.floor(o/36e5),l=Math.floor(o/864e5);return s<1?"Hozirgina":s<60?`${s} daqiqa oldin`:a<24?`${a} soat oldin`:l<30?`${l} kun oldin`:t.toLocaleDateString("uz-UZ")}const dP=({courseId:e,initialLessonSlug:t,onClose:r})=>{var js,Ss,Cs,zs,Es,si,Sl,lg,cg,dg,ug,pg,fg;const o=pr(),{createChat:s}=ni(),a=je(V=>V.token),{courses:l,currentUser:c,isAdmin:u,isEnrolled:p,enrollInCourse:x,approveUser:h,removeUser:m,incrementViews:k,removeLesson:w,getLessonComments:j,addComment:C,addReply:y,joinCourseRoom:v,leaveCourseRoom:b}=dl(),[g,T]=f.useState(0),[A,B]=f.useState(!1),[z,H]=f.useState(!1),[D,U]=f.useState(!1),[M,I]=f.useState(""),[P,E]=f.useState(!1),[_,R]=f.useState(null),[$,F]=f.useState(""),[L,O]=f.useState(!1),[S,N]=f.useState([]),[Q,X]=f.useState(1),[ee,ae]=f.useState(!0),[de,le]=f.useState(!1),[te,Z]=f.useState(null),[ne,ze]=f.useState(!1),J=f.useRef(null),pe=f.useRef(null),[Ae,Xe]=f.useState(!1),[qe,Nt]=f.useState(0),[$t,fr]=f.useState(0),[Nr,Se]=f.useState(null),[De,it]=f.useState(1),[bt,ce]=f.useState(!1),[ue,ye]=f.useState(!1),[ve,Ee]=f.useState(!0),[et,_e]=f.useState(0),[Pe,Ye]=f.useState(!1),ut=f.useRef(null),[nn,hr]=f.useState(null),[En,vo]=f.useState(!1),[Ur,ou]=f.useState(1),[fl,bo]=f.useState(!1),[oi,ii]=f.useState(null),[iu,hl]=f.useState(0),[ys,vs]=f.useState(!1),he=l.find(V=>V._id===e||V.urlSlug===e||String(V.id)===String(e)),mt=((he==null?void 0:he.lessons)||[])[g]||null,wo=f.useCallback(async(V=1)=>{if(!(!e||!(mt!=null&&mt._id)))try{V===1&&le(!0);const fe=await j(e,mt._id,V,10),Be=fe.data||[],Je=fe.totalPages||1;N(ai=>V===1?Be:[...ai,...Be]),X(V),ae(V<Je)}catch(fe){console.error(fe)}finally{V===1&&le(!1)}},[e,mt==null?void 0:mt._id,j]);f.useEffect(()=>{L&&wo(1)},[mt==null?void 0:mt._id,L,wo]),p(e);const xr=he?u(e):!1;console.log(xr);const xl=(c==null?void 0:c._id)||(c==null?void 0:c.id),gl=((js=he==null?void 0:he.createdBy)==null?void 0:js._id)===xl,au=async()=>{if(te)try{ze(!0),await w(e,te),g>=he.lessons.length-1&&g>0&&T(g-1),Z(null)}catch(V){console.error(V),toast.error("Darsni o'chirishda xatolik yuz berdi")}finally{ze(!1)}};f.useEffect(()=>{if(he&&t){const V=he.lessons.findIndex(fe=>fe.urlSlug===t||String(fe._id)===t||String(fe.id)===t);V!==-1&&V!==g&&T(V)}},[he,t]);const ml=(Ss=he==null?void 0:he.members)==null?void 0:Ss.find(V=>{var Be;return(((Be=V.userId)==null?void 0:Be._id)||V.userId||V._id||V.id)===xl}),qr=ml?ml.status:"none",bs=gl||qr==="approved"||xr,Wt=f.useCallback(V=>bs||V===0,[bs]);f.useEffect(()=>{T(0),B(!1),U(!1),Xe(!1),Nt(0),fr(0),Ye(!1)},[e]);const yl=f.useRef(new Set);f.useEffect(()=>{Xe(!1),Nt(0);const V=(mt==null?void 0:mt._id)||(mt==null?void 0:mt.id);if(!e||!V||!Wt(g)||yl.current.has(V))return;const fe=setTimeout(()=>{k(e,V),yl.current.add(V)},1e4);return()=>clearTimeout(fe)},[g,e,mt,Wt,k]);const ko=f.useCallback(()=>{if(J.current)if(Se(null),Ae)J.current.pause();else{const V=J.current.play();V!==void 0&&V.catch(fe=>{fe.name==="NotSupportedError"?Se("Bu video formatini brauzeringiz qo'llab-quvvatlamaydi (masalan .mov bevosita Chrome'da ishlamasligi mumkin)."):(console.error("Playback error:",fe),Se("Videoni ishga tushirishda xatolik yuz berdi.")),Xe(!1)})}},[Ae]),lu=f.useCallback(()=>{if(!J.current)return;Nt(J.current.currentTime);const V=J.current;V.buffered.length>0&&_e(V.buffered.end(V.buffered.length-1)/V.duration*100)},[]);f.useCallback(V=>{fr(V)},[]);const cu=f.useCallback(V=>{if(!J.current)return;const fe=V.currentTarget.getBoundingClientRect(),Be=(V.clientX-fe.left)/fe.width;J.current.currentTime=Be*$t},[$t]),ag=f.useCallback(V=>{const fe=parseFloat(V.target.value);it(fe),J.current&&(J.current.volume=fe),ce(fe===0)},[]),ws=f.useCallback(()=>{J.current&&(bt?(J.current.volume=De||1,ce(!1)):(J.current.volume=0,ce(!0)))},[bt,De]),ks=f.useCallback(()=>{pe.current&&(document.fullscreenElement?(document.exitFullscreen(),ye(!1)):(pe.current.requestFullscreen(),ye(!0)))},[]),du=f.useCallback(()=>{J.current&&(J.current.currentTime+=10)},[]),vl=f.useCallback(()=>{J.current&&(J.current.currentTime-=10)},[]),bl=f.useCallback(V=>{ou(V),J.current&&(J.current.playbackRate=V),bo(!1)},[]),wl=f.useCallback(V=>{if(!$t)return;const fe=V.currentTarget.getBoundingClientRect(),Be=Math.max(0,Math.min(1,(V.clientX-fe.left)/fe.width));ii(Be*$t),hl(V.clientX-fe.left)},[$t]),kl=f.useCallback(()=>{Ee(!0),ut.current&&clearTimeout(ut.current),ut.current=setTimeout(()=>{Ae&&Ee(!1)},3e3)},[Ae]);f.useEffect(()=>{const V=fe=>{if(!["INPUT","TEXTAREA"].includes(fe.target.tagName))switch(fe.key){case" ":case"k":fe.preventDefault(),ko();break;case"ArrowRight":J.current&&(J.current.currentTime+=10);break;case"ArrowLeft":J.current&&(J.current.currentTime-=10);break;case"ArrowUp":if(fe.preventDefault(),J.current){const Be=Math.min(1,(J.current.volume||0)+.1);J.current.volume=Be,it(Be),ce(!1)}break;case"ArrowDown":if(fe.preventDefault(),J.current){const Be=Math.max(0,(J.current.volume||0)-.1);J.current.volume=Be,it(Be),ce(Be===0)}break;case"f":case"F":ks();break;case"m":case"M":ws();break}};return window.addEventListener("keydown",V),()=>window.removeEventListener("keydown",V)},[ko,ks,ws]);const jl=V=>{T(V);const fe=he.lessons[V];if(fe){const Be=fe.urlSlug||fe._id||fe.id,Je=he.urlSlug||he._id||he.id;window.history.replaceState(null,"",`/courses/${Je}/${Be}`)}},q=f.useCallback(()=>{he&&g<he.lessons.length-1&&T(V=>V+1)},[he,g]),K=(Cs=he==null?void 0:he.lessons)==null?void 0:Cs[g],ie=(zs=K==null?void 0:K.videoUrl)==null?void 0:zs.includes("youtu"),oe=(K==null?void 0:K.type)==="file",G="http://localhost:3000",me=(K==null?void 0:K.urlSlug)||(K==null?void 0:K._id)||(K==null?void 0:K.id),xe=`${G}/courses/${e}/lessons/${me}/stream`;if(f.useEffect(()=>{if(!oe||!me||!Wt(g)){hr(null);return}let V=null;const fe=new AbortController;return(async()=>{vo(!0),hr(null),Se(null);try{const Je=await fetch(xe,{signal:fe.signal,headers:{Authorization:`Bearer ${a}`}});if(!Je.ok)throw new Error(`Stream error: ${Je.status}`);const ai=await Je.blob();V=URL.createObjectURL(ai),hr(V)}catch(Je){Je.name!=="AbortError"&&Se("Videoni yuklab olishda xatolik yuz berdi.")}finally{vo(!1)}})(),()=>{fe.abort(),V&&URL.revokeObjectURL(V)}},[me,g,oe,a,xe]),!he)return i.jsxs(HR,{children:[i.jsx(VR,{children:i.jsx(ss,{size:36,color:"white"})}),i.jsx(YR,{children:"Kursni tanlang"}),i.jsx(WR,{children:"Chap tarafdagi ro'yxatdan kursni tanlang yoki yangi kurs yarating."})]});const Oe=he.members.filter(V=>V.status==="approved"),Ce=he.members.filter(V=>V.status==="pending"),_n=ie?(V=>{if(!V)return null;const fe=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,Be=V.match(fe);return Be&&Be[2].length===11?Be[2]:null})(K.videoUrl):null;return i.jsxs(i.Fragment,{children:[i.jsxs(iR,{children:[i.jsxs(sR,{children:[Wt(g)&&K?i.jsxs(i.Fragment,{children:[ie&&_n?i.jsxs(E1,{ref:pe,children:[i.jsx(lR,{src:`https://www.youtube.com/embed/${_n}?rel=0&modestbranding=1`,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:K.title}),i.jsx(_1,{visible:!0,style:{pointerEvents:"none",background:"transparent"},children:i.jsx(T1,{children:i.jsx(bp,{onClick:()=>r(),style:{pointerEvents:"auto",color:"white",background:"rgba(0,0,0,0.5)",borderRadius:"50%",padding:"8px"},children:i.jsx(Dr,{size:20})})})})]}):i.jsxs(E1,{ref:pe,onMouseMove:kl,onMouseLeave:()=>{Ae&&Ee(!1)},onClick:ko,onContextMenu:V=>V.preventDefault(),children:[(En||ys)&&i.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,background:"rgba(0,0,0,0.3)",pointerEvents:"none"},children:[i.jsx("div",{style:{width:48,height:48,border:"4px solid rgba(255,255,255,0.2)",borderTop:"4px solid var(--primary-color)",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}),i.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]}),i.jsx(aR,{ref:J,src:oe?nn||void 0:K.videoUrl,controlsList:"nodownload",disablePictureInPicture:!0,onContextMenu:V=>V.preventDefault(),onPlay:()=>Xe(!0),onPause:()=>Xe(!1),onWaiting:()=>vs(!0),onCanPlay:()=>vs(!1),onTimeUpdate:lu,onLoadedMetadata:()=>{J.current&&(fr(J.current.duration),J.current.playbackRate=Ur)},onError:V=>{En||Se("Videoni ishga tushirishda xatolik yuz berdi.")},onEnded:q,style:{userSelect:"none",WebkitUserSelect:"none"}}),Nr&&i.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0, 0, 0, 0.8)",color:"#ef4444",padding:"20px",textAlign:"center",zIndex:20,flexDirection:"column",gap:"12px"},children:[i.jsx(Hd,{size:48}),i.jsx("p",{style:{fontWeight:600,maxWidth:"400px",lineHeight:1.5},children:Nr})]}),i.jsx(dR,{visible:!Ae&&!Nr,onClick:V=>{V.stopPropagation(),ko()},children:i.jsx(Pc,{size:32,fill:"white",color:"white"})}),i.jsxs(_1,{visible:ve||!Ae,onClick:V=>V.stopPropagation(),children:[i.jsx(T1,{children:i.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[i.jsx(bp,{onClick:()=>r(),style:{color:"white"},children:i.jsx(Dr,{size:20})}),i.jsx(cR,{children:K.title})]})}),i.jsxs(uR,{children:[i.jsxs(cj,{onMouseMove:V=>{wl(V),V.stopPropagation()},onMouseLeave:()=>ii(null),onClick:V=>{V.stopPropagation(),cu(V)},style:{cursor:"pointer"},children:[i.jsx(fR,{style:{width:`${et}%`}}),i.jsx(pR,{style:{width:`${$t?qe/$t*100:0}%`}}),oi!==null&&i.jsx("div",{style:{position:"absolute",bottom:"14px",left:iu,transform:"translateX(-50%)",background:"rgba(0,0,0,0.85)",color:"white",fontSize:"11px",fontWeight:600,padding:"3px 7px",borderRadius:"4px",whiteSpace:"nowrap",pointerEvents:"none",zIndex:20,letterSpacing:"0.5px"},children:wp(oi)})]}),i.jsxs(hR,{children:[i.jsxs(xR,{children:[i.jsx(pi,{onClick:ko,children:Ae?i.jsx(Z3,{size:20}):i.jsx(Pc,{size:20,fill:"white"})}),i.jsx(pi,{onClick:vl,title:"-10s",children:i.jsx(o6,{size:18})}),i.jsx(pi,{onClick:du,title:"+10s",children:i.jsx(i6,{size:18})}),i.jsxs(dj,{children:[i.jsx(pi,{onClick:ws,children:bt?i.jsx(u6,{size:18}):i.jsx(Qw,{size:18})}),i.jsx(yR,{type:"range",min:"0",max:"1",step:"0.05",value:bt?0:De,onChange:ag})]}),i.jsxs(mR,{children:[wp(qe)," / ",wp($t)]})]}),i.jsxs(gR,{children:[i.jsxs("div",{style:{position:"relative"},onClick:V=>V.stopPropagation(),children:[i.jsxs(pi,{title:"Tezlik",onClick:()=>bo(V=>!V),style:{fontSize:"11px",fontWeight:700,width:"auto",padding:"0 8px",borderRadius:"4px",border:fl?"1px solid var(--primary-color)":"1px solid rgba(255,255,255,0.2)",color:Ur!==1?"var(--primary-color)":"white"},children:[Ur,"x"]}),fl&&i.jsxs("div",{style:{position:"absolute",bottom:"44px",right:0,background:"rgba(15,15,20,0.97)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",overflow:"hidden",minWidth:"110px",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",zIndex:50},children:[i.jsx("div",{style:{padding:"8px 12px",fontSize:"11px",color:"rgba(255,255,255,0.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",borderBottom:"1px solid rgba(255,255,255,0.08)"},children:"Tezlik"}),[.5,.75,1,1.25,1.5,2].map(V=>i.jsx("div",{onClick:()=>bl(V),style:{padding:"9px 16px",fontSize:"13px",cursor:"pointer",color:Ur===V?"var(--primary-color)":"white",fontWeight:Ur===V?700:400,background:Ur===V?"rgba(88,101,242,0.1)":"transparent",transition:"background 0.15s"},onMouseEnter:fe=>fe.currentTarget.style.background="rgba(255,255,255,0.06)",onMouseLeave:fe=>fe.currentTarget.style.background=Ur===V?"rgba(88,101,242,0.1)":"transparent",children:V===1?"Oddiy (1x)":`${V}x`},V))]})]}),i.jsx(pi,{onClick:ks,children:ue?i.jsx(G3,{size:18}):i.jsx(Fw,{size:18})})]})]})]})]})]}),i.jsxs(vR,{children:[i.jsxs(bR,{children:[g+1,"-dars: ",K.title]}),i.jsxs(wR,{children:[i.jsxs(jR,{children:[i.jsx(Ha,{size:14}),W1(K.views)," ko'rish"]}),i.jsxs(kR,{children:[i.jsx(ss,{size:14}),he.name]})]})]}),i.jsxs(KR,{children:[i.jsxs(QR,{children:[i.jsx(GR,{children:"Izohlar"}),i.jsx(XR,{children:((Es=K.comments)==null?void 0:Es.length)||0})]}),L?i.jsxs(i.Fragment,{children:[i.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:16},children:i.jsxs("button",{onClick:()=>O(!1),style:{background:"none",border:"none",color:"var(--text-secondary-color)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:600},children:[i.jsx(Hu,{size:16})," Yig'ish"]})}),i.jsxs(ZR,{children:[i.jsx(nc,{isAdmin:xr,children:((si=c.avatar)==null?void 0:si.length)>1?i.jsx("img",{src:c.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(c.name||"?").charAt(0)}),i.jsxs(eP,{children:[i.jsx(tP,{placeholder:"Izoh qoldiring...",value:M,onChange:V=>{I(V.target.value),!P&&V.target.value&&E(!0)},onFocus:()=>E(!0),onKeyDown:V=>{V.key==="Enter"&&M.trim()&&(C(e,K._id,M.trim()),I(""),E(!1))}}),P&&i.jsxs(rP,{children:[i.jsx(B1,{onClick:()=>{E(!1),I("")},children:"Bekor qilish"}),i.jsx(B1,{primary:!0,disabled:!M.trim(),onClick:()=>{M.trim()&&(C(e,K._id,M.trim()).then(()=>wo(1)),I(""),E(!1))},children:"Yuborish"})]})]})]}),i.jsx(yo,{dataLength:S.length,next:()=>wo(Q+1),hasMore:ee,loader:i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Yuklanmoqda..."}),style:{display:"flex",flexDirection:"column",gap:"16px",paddingBottom:"32px"},scrollableTarget:null,children:S.map(V=>{var fe,Be;return i.jsxs(nP,{children:[i.jsxs(F1,{children:[i.jsx(nc,{isAdmin:V.userId===he.createdBy,children:((fe=V.userAvatar)==null?void 0:fe.length)>1?i.jsx("img",{src:V.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):V.userName.charAt(0)}),i.jsxs(N1,{children:[i.jsxs(U1,{children:[i.jsx(q1,{isAdmin:V.userId===he.createdBy,children:V.userName}),V.userId===he.createdBy&&i.jsx(H1,{children:"Admin"}),i.jsx(V1,{children:K1(V.createdAt)})]}),i.jsx(Y1,{children:V.text}),i.jsx(oP,{onClick:()=>R(_===V._id?null:V._id),children:"Javob berish"})]})]}),V.replies&&V.replies.length>0&&i.jsx(iP,{children:V.replies.map(Je=>{var ai;return i.jsxs(F1,{children:[i.jsx(nc,{small:!0,isAdmin:Je.userId===he.createdBy,children:((ai=Je.userAvatar)==null?void 0:ai.length)>1?i.jsx("img",{src:Je.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):Je.userName.charAt(0)}),i.jsxs(N1,{children:[i.jsxs(U1,{children:[i.jsx(q1,{isAdmin:Je.userId===he.createdBy,children:Je.userName}),Je.userId===he.createdBy&&i.jsx(H1,{children:"Admin"}),i.jsx(V1,{children:K1(Je.createdAt)})]}),i.jsx(Y1,{children:Je.text})]})]},Je._id)})}),_===V._id&&i.jsxs(sP,{children:[i.jsx(nc,{small:!0,isAdmin:xr,children:((Be=c.avatar)==null?void 0:Be.length)>1?i.jsx("img",{src:c.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(c.name||"?").charAt(0)}),i.jsx(aP,{placeholder:"Javob yozing...",value:$,onChange:Je=>F(Je.target.value),onKeyDown:Je=>{Je.key==="Enter"&&$.trim()&&(y(e,K._id,V._id,$.trim()).then(()=>wo(1)),F(""),R(null))},autoFocus:!0}),i.jsx(lP,{disabled:!$.trim(),onClick:()=>{$.trim()&&(y(e,K._id,V._id,$.trim()),F(""),R(null))},children:i.jsx(Nx,{size:14})})]})]},V._id)})})]}):i.jsx(JR,{onClick:()=>O(!0),children:i.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)"},children:"Izoh yozing..."})})]})]}):Wt(g)&&he.lessons.length===0?i.jsxs(L1,{children:[i.jsx(D1,{children:i.jsx(n0,{size:32,color:"var(--text-muted-color)"})}),i.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:"Hali darslar qo'shilmagan"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14},children:xr?"O'ng tarafdagi + tugmasini bosib dars qo'shing.":"Tez orada darslar qo'shiladi."})]}):i.jsxs(L1,{children:[i.jsx(D1,{children:qr==="pending"?i.jsx(uo,{size:32,color:"var(--warning-color)"}):i.jsx(W3,{size:32,color:"var(--text-muted-color)"})}),i.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:qr==="pending"?"So'rov yuborildi":"Kursga yoziling"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14,maxWidth:350},children:qr==="pending"?"Sizning so'rovingiz admin tomonidan ko'rib chiqilmoqda. Iltimos kuting.":"Darslarni ko'rish uchun avval kursga yozilish kerak. Admin tasdiqlangandan keyin darslarni ko'rishingiz mumkin."})]}),i.jsxs(SR,{style:{padding:"12px 24px",borderBottom:"none"},children:[i.jsxs(CR,{children:[i.jsx(zR,{style:{width:40,height:40,fontSize:16},children:(Sl=he==null?void 0:he.createdBy)!=null&&Sl.avatar?i.jsx("img",{src:he.createdBy.avatar,alt:"author",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(((lg=he==null?void 0:he.createdBy)==null?void 0:lg.name)||((cg=he==null?void 0:he.createdBy)==null?void 0:cg.username)||"?").charAt(0).toUpperCase()}),i.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i.jsx("span",{style:{fontWeight:600,color:"var(--text-color)",fontSize:15},children:((dg=he==null?void 0:he.createdBy)==null?void 0:dg.name)||((ug=he==null?void 0:he.createdBy)==null?void 0:ug.username)||"Muallif"}),i.jsxs("span",{style:{fontSize:12,color:"var(--text-muted-color)"},children:[((pg=he==null?void 0:he.members)==null?void 0:pg.length)||0," talaba"]})]})]}),i.jsx("div",{style:{display:"flex",gap:"8px"},children:xr?i.jsxs(fi,{variant:"admin",onClick:()=>U(!D),style:{borderRadius:"20px",padding:"8px 16px"},children:[i.jsx(as,{size:16}),"Boshqarish",D?i.jsx(Hu,{size:16}):i.jsx(t0,{size:16})]}):qr==="pending"?i.jsxs("div",{style:{display:"flex",gap:"8px"},children:[i.jsxs(fi,{variant:"pending",style:{borderRadius:"20px"},children:[i.jsx(uo,{size:16}),"Kutilmoqda"]}),i.jsx(fi,{variant:"admin",onClick:()=>m(e,(c==null?void 0:c.id)||(c==null?void 0:c._id)),style:{borderRadius:"20px"},children:"Bekor qilish"})]}):qr==="approved"?i.jsxs(fi,{variant:"enrolled",style:{borderRadius:"20px"},children:[i.jsx(Jo,{size:16}),"Obuna bo'lingan"]}):(he==null?void 0:he.accessType)==="paid"&&qr==="none"?i.jsxs(fi,{variant:"enroll",style:{borderRadius:"20px"},onClick:async()=>{try{await x(e);const V=he.createdBy._id||he.createdBy,fe=await s({isGroup:!1,memberIds:[V]});if(fe){const Be=fe.urlSlug||fe.jammId||fe._id||fe.id||fe;o(`/a/${Be}`)}}catch(V){console.error(V),toast.error("Xatolik yuz berdi: Chat yaratib bo'lmadi")}},children:[i.jsx(s0,{size:16}),"Sotib olish: ",((fg=he==null?void 0:he.price)==null?void 0:fg.toLocaleString())||0," so'm"]}):qr==="none"?i.jsxs(fi,{variant:"enroll",onClick:()=>x(e),style:{borderRadius:"20px"},children:[i.jsx(s0,{size:16}),"Obuna bo'lish ",(he==null?void 0:he.price)>0&&`(${he.price})`]}):null})]}),xr&&i.jsx(ER,{open:D,children:i.jsxs(_R,{children:[Ce.length>0&&i.jsxs(i.Fragment,{children:[i.jsxs($1,{children:["Kutayotganlar (",Ce.length,")"]}),Ce.map(V=>{var fe;return i.jsxs(R1,{children:[i.jsx(P1,{children:((fe=V.avatar)==null?void 0:fe.length)>1?i.jsx("img",{src:V.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):V.name.charAt(0)}),i.jsxs(M1,{children:[i.jsx(O1,{children:V.name}),i.jsx(A1,{pending:!0,children:"Kutmoqda"})]}),i.jsxs(I1,{children:[i.jsx(vp,{approve:!0,onClick:()=>h(e,V.userId||V._id||V.id),title:"Tasdiqlash",children:i.jsx(c6,{size:16})}),i.jsx(vp,{onClick:()=>m(e,V.userId||V._id||V.id),title:"Rad etish",children:i.jsx(a0,{size:16})})]})]},V.userId||V._id||V.id)})]}),i.jsxs($1,{style:{marginTop:Ce.length>0?16:0},children:["A'zolar (",Oe.length,")"]}),Oe.length===0?i.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:13,padding:"8px 0"},children:"Hali a'zolar yo'q"}):Oe.map(V=>{var fe;return i.jsxs(R1,{children:[i.jsx(P1,{children:((fe=V.avatar)==null?void 0:fe.length)>1?i.jsx("img",{src:V.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):V.name.charAt(0)}),i.jsxs(M1,{children:[i.jsx(O1,{children:V.name}),i.jsx(A1,{children:"Tasdiqlangan"})]}),i.jsx(I1,{children:i.jsx(vp,{onClick:()=>m(e,V.userId||V._id||V.id),title:"Chiqarish",children:i.jsx(a0,{size:16})})})]},V.userId||V._id||V.id)})]})})]}),i.jsxs(TR,{children:[i.jsxs($R,{children:[i.jsxs(RR,{children:[i.jsx(bp,{onClick:()=>r(),children:i.jsx(Dr,{size:20})}),i.jsx(n0,{size:18}),"Darslar"]}),i.jsxs(PR,{children:[i.jsxs(MR,{children:[he.lessons.length," ta dars"]}),xr&&i.jsx(OR,{onClick:()=>H(!0),title:"Dars qo'shish",children:i.jsx(Ht,{size:16})}),i.jsx(AR,{onClick:()=>B(!A),children:A?i.jsx(t0,{size:20}):i.jsx(Hu,{size:20})})]})]}),i.jsx(IR,{collapsed:A,children:he.lessons.length===0?i.jsx(qR,{children:xr?i.jsxs(i.Fragment,{children:["Hali darslar yo'q.",i.jsx("br",{}),i.jsx("span",{style:{fontSize:12},children:"+ tugmasini bosib dars qo'shing"})]}):"Hali darslar qo'shilmagan"}):he.lessons.map((V,fe)=>i.jsxs(uj,{active:Wt(fe)&&g===fe,onClick:()=>Wt(fe)&&jl(fe),style:{cursor:Wt(fe)?"pointer":"default"},children:[i.jsx(LR,{active:Wt(fe)&&g===fe,children:Wt(fe)&&g===fe?i.jsx(Pc,{size:12,fill:"white"}):Wt(fe)?fe+1:i.jsx(Zo,{size:12})}),i.jsx(DR,{children:Wt(fe)?i.jsxs(i.Fragment,{children:[i.jsxs(BR,{active:g===fe,children:[V.title,fe===0&&!bs&&i.jsx("span",{style:{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:4,background:"rgba(67, 181, 129, 0.15)",color:"var(--success-color)",marginLeft:6,verticalAlign:"middle"},children:"Bepul"})]}),i.jsx(FR,{children:i.jsxs(NR,{children:[i.jsx(Ha,{size:11}),W1(V.views)]})})]}):i.jsxs(cP,{children:[i.jsx(Zo,{size:12}),fe+1,"-dars"]})}),xr&&i.jsx(UR,{onClick:Be=>{Be.stopPropagation(),Z(V._id)},title:"O'chirish",children:i.jsx(xs,{size:14})})]},V._id))})]})]}),i.jsx(oR,{isOpen:z,onClose:()=>H(!1),courseId:e,onCreated:V=>{H(!1),T(he.lessons.length)}}),i.jsx(lj,{isOpen:!!te,onClose:()=>Z(null),title:"Darsni o'chirish",description:"Rostdan ham bu darsni o'chirmoqchimisiz? Agar unga video biriktirilgan bo'lsa, u ham o'chib ketadi.",confirmText:ne?"O'chirilmoqda...":"Ha, o'chirish",cancelText:"Beqor qilish",onConfirm:au,isDanger:!0})]})},uP=async()=>{const{data:e}=await be.get("/arena/tests");return e},pP=async e=>{const{data:t}=await be.get(`/arena/tests/${e}`);return t},pj=async e=>{const{data:t}=await be.post("/arena/tests",e);return t},fP=async(e=1,t=15)=>{const{data:r}=await be.get(`/arena/tests/my?page=${e}&limit=${t}`);return r},hP=async(e,t={})=>{const{data:r}=await be.get(`/arena/tests/${e}/results`,{params:t});return r},xP=async(e,t)=>{const{data:r}=await be.post(`/arena/tests/${e}/submit`,{answers:t});return r},gP=async(e=1,t=20)=>{const{data:r}=await be.get(`/arena/flashcards?page=${e}&limit=${t}`);return r},mP=async e=>{const{data:t}=await be.post("/arena/flashcards",e);return t},yP=async e=>{const{data:t}=await be.get(`/arena/flashcards/${e}`);return t},vP=async({deckId:e,cardId:t,quality:r})=>{const{data:o}=await be.patch(`/arena/flashcards/${e}/cards/${t}/review`,{quality:r});return o},bP=async e=>{const{data:t}=await be.post(`/arena/flashcards/${e}/join`);return t},wP=async e=>{const{data:t}=await be.delete(`/arena/flashcards/${e}/leave`);return t},kP=async(e={})=>{const{data:t}=await be.get("/arena/battles/history",{params:e});return t},jP=async(e=1,t=15)=>{const{data:r}=await be.get(`/arena/battles/active?page=${e}&limit=${t}`);return r},fj=f.createContext(null),SP="http://localhost:3000",CP=({children:e})=>{const[t,r]=f.useState([]),[o,s]=f.useState([]),[a,l]=f.useState([]),[c,u]=f.useState(1),[p,x]=f.useState(!0),[h,m]=f.useState(null),[k,w]=f.useState([]),[j,C]=f.useState([]),[y,v]=f.useState(1),[b,g]=f.useState(!0),[T,A]=f.useState(1),[B,z]=f.useState(!0),[H,D]=f.useState(!1),[U,M]=f.useState(localStorage.getItem("jamm_guest_name")||null),I=f.useRef(null),P=je(Z=>Z.token),E=f.useCallback(async()=>{try{const Z=await uP();r(Z)}catch(Z){console.error("Error fetching arena tests:",Z)}},[]),_=async Z=>{try{const ne=await pj(Z);return R(),ne}catch(ne){console.error("Error creating test:",ne)}},R=f.useCallback(async(Z=1)=>{if(P)try{const ne=await fP(Z,15),ze=ne.data||[],J=ne.totalPages||1;s(pe=>Z===1?ze:[...pe,...ze]),A(Z),z(Z<J)}catch(ne){console.error("Error fetching my tests:",ne)}},[P]),$=f.useCallback(async(Z=1)=>{try{const ne=await gP(Z,20),ze=ne.data||[],J=ne.totalPages||1;l(pe=>Z===1?ze:[...pe,...ze]),u(Z),x(Z<J)}catch(ne){console.error("Error fetching flashcards:",ne)}},[]),F=async Z=>{try{const ne=await mP(Z);return $(1),ne}catch(ne){console.error("Error creating flashcard deck:",ne)}},L=async(Z,ne,ze)=>{try{await vP({deckId:Z,cardId:ne,quality:ze}),$(1)}catch(J){console.error("Error reviewing flashcard:",J)}},O=f.useCallback(async(Z={})=>{try{const ne=await kP(Z);return w(ne.data||ne),ne}catch(ne){return console.error("Error fetching battle history:",ne),{data:[],total:0}}},[]),S=f.useCallback(async(Z=1)=>{try{const ne=await jP(Z,15),ze=ne.data||[],J=ne.totalPages||1;C(pe=>Z===1?ze:[...pe,...ze]),v(Z),g(Z<J)}catch(ne){console.error("Error fetching active battles:",ne)}},[]);f.useEffect(()=>{},[]),f.useEffect(()=>{if(!P&&!U){I.current&&I.current.disconnect();return}const Z=SP.replace("http","ws")+"/arena";return I.current=ao(Z,{auth:{token:P,guestName:U},transports:["websocket"],forceNew:!0}),I.current.on("connect",()=>{console.log("Arena Socket connected:",I.current.id)}),I.current.on("connect_error",ne=>{console.error("Arena Socket connection error:",ne)}),I.current.on("battle_created",ne=>{console.log("Battle created:",ne)}),I.current.on("battle_update",ne=>{console.log("Battle updated:",ne),m(ne)}),I.current.on("battle_started",ne=>{m(ne)}),I.current.on("next_question_started",ne=>{m(ne)}),I.current.on("battle_finished",ne=>{m(ne)}),I.current.on("error",ne=>{Ne.error("Xatolik: "+ne)}),()=>{I.current&&I.current.disconnect()}},[P,U]);const N=Z=>{localStorage.setItem("jamm_guest_name",Z),M(Z)},Q=(Z,ne="Yangi Bellashuv",ze="solo",J="public")=>{I.current&&I.current.emit("create_battle",{testId:Z,roomName:ne,mode:ze,visibility:J})},X=Z=>{console.log("Emitting join_battle:",Z),I.current?I.current.emit("join_battle",{roomId:Z}):console.warn("Socket not connected, cannot join battle")},ee=Z=>{I.current&&I.current.emit("start_battle",{roomId:Z})},ae=(Z,ne)=>{I.current&&I.current.emit("submit_answer",{roomId:Z,answerIndex:ne})},de=Z=>{I.current&&I.current.emit("next_question",{roomId:Z})},le=Z=>{I.current&&I.current.emit("end_battle",{roomId:Z})},te=Z=>{const ne=Z||(h==null?void 0:h.roomId);ne&&I.current&&I.current.emit("leave_battle",{roomId:ne}),m(null)};return i.jsx(fj.Provider,{value:{tests:t,myTests:o,myTestsPage:T,myTestsHasMore:B,flashcardDecks:a,flashcardsPage:c,flashcardsHasMore:p,activeBattle:h,fetchTests:E,fetchMyTests:R,createTest:_,fetchFlashcards:$,createFlashcardDeck:F,reviewFlashcard:L,createBattle:Q,joinBattle:X,startBattle:ee,submitAnswer:ae,nextQuestion:de,endBattle:le,leaveBattle:te,battleHistory:k,fetchBattleHistory:O,activeBattles:j,activeBattlesPage:y,activeBattlesHasMore:b,fetchActiveBattles:S,fetchTestResults:async(Z,ne={})=>{try{return je.getState().token?await hP(Z,ne):{data:[],total:0}}catch(ze){return console.error(ze),{data:[],total:0}}},fetchFlashcardDeck:async Z=>{try{return await yP(Z)}catch(ne){return console.error(ne),null}},joinFlashcardDeck:async Z=>{try{return je.getState().token?(await bP(Z),{success:!0}):{success:!1}}catch(ne){return console.error(ne),{success:!1}}},leaveFlashcardDeck:async Z=>{try{return je.getState().token?(await wP(Z),{success:!0}):{success:!1}}catch(ne){return console.error(ne),{success:!1}}},guestName:U,setGuestSession:N,socketRef:I},children:e})},rn=()=>{const e=f.useContext(fj);if(!e)throw new Error("useArena must be used within ArenaProvider");return e},zP=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`,EP=d.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color);
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,_P=d.div`
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-color);
  }
`,kp=d.button`
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
`,TP=d.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,$P=d.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,hi=d.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,jo=d.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`,Fs=d.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: var(--primary-color);
  }
`,RP=d.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  min-height: 200px;
  resize: vertical;
  outline: none;
  transition: all 0.2s;
  font-family: monospace;
  white-space: pre-wrap;

  &:focus {
    border-color: var(--primary-color);
  }
`,oc=d.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${e=>e.primary?`
    background-color: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      filter: brightness(1.1);
    }
    
    &:disabled {
      background-color: var(--border-color);
      color: var(--text-muted-color);
      cursor: not-allowed;
    }
  `:`
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      background-color: var(--hover-color);
    }
  `}
`,Q1=d.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`,ic=d.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid
    ${e=>e.active?"var(--primary-color)":"var(--border-color)"};
  background-color: ${e=>e.active?"rgba(88, 101, 242, 0.1)":"transparent"};
  color: ${e=>e.active?"var(--primary-color)":"var(--text-color)"};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.active?"rgba(88, 101, 242, 0.15)":"var(--hover-color)"};
  }
`,PP=d.div`
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,MP=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,OP=d.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`,AP=d.div`
  font-size: 12px;
  color: var(--text-muted-color);
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 6px;
  line-height: 1.5;

  code {
    background: var(--tertiary-color);
    padding: 2px 4px;
    border-radius: 4px;
    color: var(--primary-color);
  }
`,IP=({isOpen:e,onClose:t})=>{const{fetchMyTests:r}=rn(),[o,s]=f.useState("manual"),[a,l]=f.useState(""),[c,u]=f.useState(""),[p,x]=f.useState(0),[h,m]=f.useState(!0),[k,w]=f.useState("single"),[j,C]=f.useState(!1),[y,v]=f.useState([{questionText:"",options:["",""],correctOptionIndex:0}]),[b,g]=f.useState("");if(!e)return null;const T=()=>{if(y.length>=30){He.error("Maksimal 30 ta savol qo'shish mumkin!");return}v([...y,{questionText:"",options:["",""],correctOptionIndex:0}])},A=P=>{y.length<=1||v(y.filter((E,_)=>_!==P))},B=(P,E)=>{const _=[...y];_[P].questionText=E,v(_)},z=P=>{const E=[...y];E[P].options.length>=4||(E[P].options.push(""),v(E))},H=(P,E)=>{const _=[...y];_[P].options.length<=2||(_[P].options=_[P].options.filter((R,$)=>$!==E),(_[P].correctOptionIndex>=_[P].options.length||_[P].correctOptionIndex===E)&&(_[P].correctOptionIndex=0),v(_))},D=(P,E,_)=>{const R=[...y];R[P].options[E]=_,v(R)},U=(P,E)=>{const _=[...y];_[P].correctOptionIndex=E,v(_)},M=P=>{const E=[],_=P.split(`
`).map($=>$.trim()).filter(Boolean);let R=null;for(let $ of _)if($.startsWith("$")){if(R&&R.questionText&&R.options.length>=2){if(R.correctOptionIndex===-1)throw new Error(`Savolga to'g'ri javob belgilanmagan: ${R.questionText}`);E.push(R)}R={questionText:$.substring(1).trim(),options:[],correctOptionIndex:-1}}else if($.startsWith("+")){if(!R)throw new Error("Javobdan oldin savol yozilishi ($) kerak");R.options.push($.substring(1).trim()),R.correctOptionIndex=R.options.length-1}else if($.startsWith("-")){if(!R)throw new Error("Javobdan oldin savol yozilishi ($) kerak");R.options.push($.substring(1).trim())}else throw new Error(`Tushunarsiz qator: ${$}. Faqat $, +, - ishlating.`);if(R){if(R.correctOptionIndex===-1)throw new Error(`Savolga to'g'ri javob belgilanmagan: ${R.questionText}`);if(R.options.length<2)throw new Error(`Savolda kamida 2 ta javob bo'lishi kerak: ${R.questionText}`);E.push(R)}return E},I=async()=>{var E,_;if(!a.trim())return He.error("Testga nom bering!");let P=[];if(o==="manual"){for(let R=0;R<y.length;R++){const $=y[R];if(!$.questionText.trim())return He.error(`${R+1}-shavol matni bo'sh!`);if($.options.some(F=>!F.trim()))return He.error(`${R+1}-savolning barcha javoblarini to'ldiring!`)}P=y}else try{if(P=M(b),P.length===0)return He.error("Andazada hech qanday savol topilmadi.");if(P.length>30)return He.error("Andazada savollar soni 30 tadan oshmasligi kerak!")}catch(R){return He.error(`Xato: ${R.message}`)}try{C(!0);const R={title:a.trim(),description:c.trim(),isPublic:!0,timeLimit:Number(p),showResults:h,displayMode:k,questions:P};await pj(R),await r(),t()}catch(R){const $=((_=(E=R==null?void 0:R.response)==null?void 0:E.data)==null?void 0:_.message)||R.message||"Test yaratishda xatolik";He.error($)}finally{C(!1)}};return i.jsx(zP,{onClick:t,children:i.jsxs(EP,{onClick:P=>P.stopPropagation(),children:[i.jsxs(_P,{children:[i.jsx("h2",{children:"Yangi Test Yaratish"}),i.jsx(kp,{onClick:t,children:i.jsx(nt,{size:20})})]}),i.jsxs(TP,{children:[i.jsxs(hi,{children:[i.jsx(jo,{children:"Test nomi"}),i.jsx(Fs,{placeholder:"Masalan: JavaScript Asoslari",value:a,onChange:P=>l(P.target.value)})]}),i.jsxs(hi,{children:[i.jsx(jo,{children:"Test haqida (Ixtiyoriy)"}),i.jsx(Fs,{placeholder:"Qisqacha tavsif...",value:c,onChange:P=>u(P.target.value)})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",padding:"16px",background:"rgba(0,0,0,0.1)",borderRadius:"8px",border:"1px solid var(--border-color)"},children:[i.jsxs(hi,{children:[i.jsx(jo,{children:"Vaqt cheklovi (daqiqa)"}),i.jsx(Fs,{type:"number",min:"0",placeholder:"0 = Cheklanmagan",value:p,onChange:P=>x(P.target.value)})]}),i.jsxs(hi,{children:[i.jsx(jo,{children:"Natijalarni ko'rsatish"}),i.jsxs("select",{style:{padding:"12px",borderRadius:"8px",border:"1px solid var(--border-color)",backgroundColor:"var(--input-color)",color:"var(--text-color)",fontSize:"14px",outline:"none"},value:h?"yes":"no",onChange:P=>m(P.target.value==="yes"),children:[i.jsx("option",{value:"yes",children:"Ha, ko'rsatish"}),i.jsx("option",{value:"no",children:"Yo'q, yashirish"})]})]}),i.jsxs(hi,{style:{gridColumn:"span 2"},children:[i.jsx(jo,{children:"Test ko'rinishi"}),i.jsxs(Q1,{style:{marginBottom:0},children:[i.jsxs(ic,{active:k==="single",onClick:()=>w("single"),type:"button",style:{padding:"8px"},children:[i.jsx(O3,{size:14})," 1-talab"]}),i.jsxs(ic,{active:k==="list",onClick:()=>w("list"),type:"button",style:{padding:"8px"},children:[i.jsx(N3,{size:14})," Ro'yxat"]})]})]})]}),i.jsxs(Q1,{children:[i.jsxs(ic,{active:o==="manual",onClick:()=>s("manual"),type:"button",children:[i.jsx(Ht,{size:16})," Qo'lda kiritish"]}),i.jsxs(ic,{active:o==="template",onClick:()=>s("template"),type:"button",children:[i.jsx(l6,{size:16})," Maxsus Andaza"]})]}),o==="manual"?i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[y.map((P,E)=>i.jsxs(PP,{children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[i.jsxs(jo,{children:[E+1," - Savol"]}),i.jsx(kp,{onClick:()=>A(E),disabled:y.length<=1,style:{color:"var(--danger-color)"},children:i.jsx(xs,{size:16})})]}),i.jsx(Fs,{placeholder:"Savol matni...",value:P.questionText,onChange:_=>B(E,_.target.value)}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[i.jsx(jo,{style:{fontSize:"12px",color:"var(--text-muted-color)"},children:"Javob variantlari (To'g'ri javobni belgilang)"}),P.options.map((_,R)=>i.jsxs(MP,{children:[i.jsx(OP,{type:"radio",name:`correct-${E}`,checked:P.correctOptionIndex===R,onChange:()=>U(E,R)}),i.jsx(Fs,{style:{flex:1},placeholder:`${R+1} - variant`,value:_,onChange:$=>D(E,R,$.target.value)}),i.jsx(kp,{onClick:()=>H(E,R),disabled:P.options.length<=2,children:i.jsx(nt,{size:16})})]},R))]}),P.options.length<4&&i.jsxs(oc,{type:"button",style:{alignSelf:"flex-start",marginTop:"8px",fontSize:"12px",padding:"6px 12px"},onClick:()=>z(E),children:[i.jsx(Ht,{size:14})," Variant qo'shish"]})]},E)),i.jsxs(oc,{type:"button",style:{borderStyle:"dashed",padding:"16px"},onClick:T,disabled:y.length>=30,children:[i.jsx(Ht,{size:18})," ",y.length>=30?"Limitga yetildi (30/30)":"Yana savol qo'shish"]})]}):i.jsxs(hi,{children:[i.jsxs(AP,{children:[i.jsx("b",{children:"Andaza qoidalari:"})," ",i.jsx("br",{}),i.jsx("code",{children:"$"})," belgisi bilan ",i.jsx("b",{children:"Savol"}),"ni boshlang. ",i.jsx("br",{}),i.jsx("code",{children:"-"})," belgisi bilan ",i.jsx("b",{children:"Xato javoblar"}),"ni kiriting."," ",i.jsx("br",{}),i.jsx("code",{children:"+"})," belgisi bilan bitta ",i.jsx("b",{children:"To'g'ri javob"}),"ni kiriting. ",i.jsx("br",{}),"Qator tashlab navbatdagi savolga o'tasiz."]}),i.jsx(RP,{placeholder:`$ JavaScript qaysi yilda yaratilgan?
- 1990
- 1994
+ 1995
- 2000

$ Const qanday o'zgaruvchi?
- O'zgaruvchan
+ O'zgarmas
- Funksiya`,value:b,onChange:P=>g(P.target.value)})]})]}),i.jsxs($P,{children:[i.jsx(oc,{onClick:t,disabled:j,children:"Bekor qilish"}),i.jsx(oc,{primary:!0,onClick:I,disabled:j,children:j?"Yaratilmoqda...":"Testni Yaratish"})]})]})})},sc=d.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100%;
    border-radius: 0;
    border: none;
    padding: 16px;
    z-index: 100;
    overflow-y: auto;
  }
`,LP=d.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap; /* allow wrapping on mobile */

  position: sticky;
  top: -32px;
  margin-top: -32px;
  padding-top: 32px;
  background-color: var(--tertiary-color);
  z-index: 10;

  @media (max-width: 768px) {
    top: -16px;
    margin-top: -16px;
    padding-top: 16px;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
`,DP=d.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  &:hover {
    color: var(--text-color);
  }
`,BP=d.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 1.5rem;
  flex: 1 1 100%; /* take full width on mobile if it wraps */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (min-width: 768px) {
    flex: 1; /* take remaining space next to back btn on desktop */
  }
`,G1=d.div`
  background: var(--bg-color);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`,X1=d.h3`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: var(--text-color);
  font-weight: 500;
`,J1=d.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Z1=d.button`
  padding: 14px 20px;
  border-radius: 8px;
  border: 1px solid
    ${e=>{if(e.isRevealed&&e.showResults){if(e.isCorrect)return"#2ecc71";if(e.isSelected)return"#e74c3c"}return e.isSelected?"var(--primary-color)":"var(--border-color)"}};
  background-color: ${e=>{if(e.isRevealed&&e.showResults){if(e.isCorrect)return"rgba(46, 204, 113, 0.05)";if(e.isSelected)return"rgba(231, 76, 60, 0.05)"}return e.isSelected?"rgba(var(--primary-color-rgb), 0.05)":"var(--bg-color)"}};
  color: var(--text-color);
  font-size: 1.05rem;
  text-align: left;
  cursor: ${e=>e.disabled?"default":"pointer"};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    border-color: ${e=>e.disabled?"":"var(--primary-color)"};
    background-color: ${e=>e.disabled?"":"rgba(var(--primary-color-rgb), 0.02)"};
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 12px;
  }
`,ey=d.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 600;
  flex-shrink: 0;
  border: 1px solid
    ${e=>{if(e.isRevealed&&e.showResults){if(e.isCorrect)return"#2ecc71";if(e.isSelected)return"#e74c3c"}return e.isSelected?"var(--primary-color)":"var(--border-color)"}};
  background-color: ${e=>{if(e.isRevealed&&e.showResults){if(e.isCorrect)return"#2ecc71";if(e.isSelected)return"#e74c3c"}return e.isSelected?"var(--primary-color)":"transparent"}};
  color: ${e=>e.isRevealed&&e.showResults&&(e.isCorrect||e.isSelected)||e.isSelected?"#fff":"var(--text-muted-color)"};
  transition: all 0.2s;
`,ty=d.span`
  flex: 1;
  line-height: 1.5;
`,ry=d.div`
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,FP=d.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
`,ny=d.button`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`,NP=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`,UP=d.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`,qP=d.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${e=>e.bgColor||"var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`,HP=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,VP=d.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,YP=d.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 1.2rem;
`,WP=d.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 0.95rem;
  line-height: 1.5;
`,KP=d.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`,hj=d.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    filter: brightness(1.1);
  }
`,QP=d(hj)`
  background: var(--primary-color);
  color: white;
`,GP=d(hj)`
  background: rgba(240, 71, 71, 0.15);
  color: #f04747;
  border: 1px solid rgba(240, 71, 71, 0.3);
`,XP=({test:e,onClose:t})=>{const r=e.timeLimit||0,o=e.showResults??!0,s=e.displayMode||"single",[a,l]=f.useState(0),[c,u]=f.useState(0),[p,x]=f.useState(null),[h,m]=f.useState(!1),[k,w]=f.useState(!1),[j,C]=f.useState(!1),[y,v]=f.useState(""),[b,g]=f.useState(null),[T,A]=f.useState(!1),[B,z]=f.useState(!1),[H,D]=f.useState(r*60),[U,M]=f.useState([]),[I,P]=f.useState({}),{user:E,token:_}=je(),{guestName:R,setGuestSession:$}=rn(),F=e.questions||[],L=F[a],O=f.useCallback(()=>s==="list"?F.map((de,le)=>I[le]??-1):F.map((de,le)=>U[le]??-1),[s,F,I,U]),S=f.useCallback(()=>{z(!1);const de=O();N(de)},[O]);f.useEffect(()=>{if(k)return;const de=le=>{le.preventDefault(),le.returnValue="";const te=O(),Z="http://localhost:3000",ne=JSON.stringify({answers:te}),ze={"Content-Type":"application/json"};_&&(ze.Authorization=`Bearer ${_}`),console.log(e),fetch(`${Z}/arena/tests/${e._id}/submit`,{method:"POST",headers:ze,body:ne,keepalive:!0}).catch(()=>{})};return window.addEventListener("beforeunload",de),()=>window.removeEventListener("beforeunload",de)},[k,O,e._id,_]);const N=async de=>{A(!0);try{const le=await xP(e._id,de);g(le),u(le.score)}catch(le){console.error("Failed to submit answers:",le),u(0)}finally{A(!1),w(!0)}};f.useEffect(()=>{if(r>0&&!k&&H>0){const de=setInterval(()=>D(le=>le-1),1e3);return()=>clearInterval(de)}else if(r>0&&H<=0&&!k)if(s==="list")ae();else{const de=F.map((le,te)=>U[te]??-1);N(de)}},[r,H,k,s]);const Q=de=>{const le=Math.floor(de/60),te=de%60;return`${le}:${te<10?"0":""}${te}`};f.useEffect(()=>{if(k&&!j){const de=!!E;(de||R)&&(C(!0),(async()=>{try{await Ge.post("http://localhost:3000/arena/battles/save-solo",{testId:e._id,score:c,totalQuestions:F.length,guestName:de?null:R},{headers:_?{Authorization:`Bearer ${_}`}:{}})}catch(Z){console.error("Yakkalik test natijasini saqlashda xatolik:",Z)}})())}},[k,j,E,_,R,e._id,c,F.length]);const X=de=>{if(h)return;x(de),m(!0);const le=[...U];le[a]=de,M(le),setTimeout(()=>{if(a+1<F.length)l(a+1),x(null),m(!1);else{const te=F.map((Z,ne)=>ne===a?de:le[ne]??-1);N(te)}},300)},ee=(de,le)=>{k||P(te=>({...te,[de]:le}))},ae=()=>{if(k)return;const de=F.map((le,te)=>I[te]??-1);N(de)};return!_&&!R?i.jsx(sc,{children:i.jsxs(NP,{children:[i.jsx("h2",{children:"Ismingizni kiriting"}),i.jsx("p",{style:{color:"var(--text-muted-color)",margin:0},children:"Testda qatnashish uchun ismingizni kiriting."}),i.jsx(UP,{placeholder:"Ismingiz...",value:y,onChange:de=>v(de.target.value)}),i.jsx(qP,{onClick:()=>y.trim()&&$(y.trim()),children:"Kirish"}),i.jsx("button",{onClick:t,style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},children:"Bekor qilish"})]})}):T?i.jsx(sc,{children:i.jsx(ry,{children:i.jsx("h2",{children:"Javoblar tekshirilmoqda..."})})}):k?i.jsx(sc,{children:i.jsxs(ry,{children:[i.jsx("h2",{children:"Test yakunlandi!"}),o&&b?i.jsxs(i.Fragment,{children:[i.jsxs(FP,{children:[b.score," / ",b.total]}),i.jsx("p",{style:{color:"var(--text-muted-color)"},children:"To'g'ri javoblar"})]}):i.jsxs(i.Fragment,{children:[i.jsx(Jo,{size:64,color:"var(--primary-color)"}),i.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:"1.2rem"},children:"Javoblaringiz saqlandi."})]}),i.jsx(ny,{onClick:t,children:"Testlar ro'yxatiga qaytish"})]})}):L?i.jsxs(sc,{style:s==="list"?{maxWidth:"900px"}:{},children:[i.jsxs(LP,{children:[i.jsxs(DP,{onClick:()=>z(!0),children:[i.jsx(Dr,{size:20})," Orqaga"]}),i.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:"16px",alignItems:"center",flexShrink:0},children:r>0&&i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",color:H<=60?"var(--danger-color)":"var(--primary-color)",fontWeight:"bold"},children:[i.jsx(Yw,{size:18})," ",i.jsx("span",{children:Q(H)})]})}),i.jsx("div",{style:{color:"var(--text-muted-color)"},children:s==="single"?`${a+1} / ${F.length}`:`${F.length} ta savol`}),i.jsx(BP,{children:e.title})]}),s==="single"?i.jsxs("div",{children:[i.jsx(G1,{children:i.jsx(X1,{children:L.questionText})}),i.jsx(J1,{children:L.options.map((de,le)=>{const te=["A","B","D","E","F","G"][le]||String.fromCharCode(65+le);return i.jsxs(Z1,{disabled:h,isSelected:p===le,isCorrect:!1,isRevealed:!1,showResults:!1,onClick:()=>X(le),children:[i.jsx(ey,{isSelected:p===le,isCorrect:!1,isRevealed:!1,showResults:!1,children:te}),i.jsx(ty,{children:de})]},le)})})]}):i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[F.map((de,le)=>i.jsxs("div",{children:[i.jsx(G1,{children:i.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start"},children:[i.jsxs("div",{style:{fontWeight:"bold",color:"var(--primary-color)",fontSize:"1.1rem",marginTop:"2px"},children:[le+1,"."]}),i.jsx(X1,{children:de.questionText})]})}),i.jsx(J1,{children:de.options.map((te,Z)=>{const ne=["A","B","D","E","F","G"][Z]||String.fromCharCode(65+Z),ze=I[le]===Z;return i.jsxs(Z1,{disabled:k,isSelected:ze,isCorrect:!1,isRevealed:!1,showResults:!1,onClick:()=>ee(le,Z),children:[i.jsx(ey,{isSelected:ze,isCorrect:!1,isRevealed:!1,showResults:!1,children:ne}),i.jsx(ty,{children:te})]},Z)})})]},le)),i.jsx(ny,{onClick:ae,style:{marginTop:"16px",alignSelf:"center",minWidth:"200px"},children:"Yakunlash"})]}),B&&i.jsx(HP,{onClick:()=>z(!1),children:i.jsxs(VP,{onClick:de=>de.stopPropagation(),children:[i.jsx(YP,{children:"Testni yakunlaysizmi?"}),i.jsx(WP,{children:"Hozirgi natijangiz qabul qilinadi. Javob bermagan savollaringiz 0 ball hisoblanadi."}),i.jsxs(KP,{children:[i.jsx(QP,{onClick:()=>z(!1),children:"Davom etish"}),i.jsx(GP,{onClick:S,children:"Chiqish"})]})]})})]}):null},JP=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,ZP=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,eM=d.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,tM=d.h2`
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-color);
`,rM=d.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  &:hover {
    color: var(--text-color);
  }
`,nM=d.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,oy=d.div`
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,oM=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,iM=d.span`
  font-weight: 600;
  color: var(--text-color);
`,sM=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.1rem;
`,aM=d.div`
  text-align: center;
  color: var(--text-muted-color);
  padding: 40px;
`,lM=d.input`
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,cM=d.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: ${e=>e.rank===1?"#f1c40f":e.rank===2?"#bdc3c7":e.rank===3?"#cd7f32":"var(--border-color)"};
  color: ${e=>e.rank<=3?"#000":"var(--text-muted-color)"};
`,dM=({test:e,onClose:t})=>{const{fetchTestResults:r}=rn(),[o,s]=f.useState([]),[a,l]=f.useState(""),[c,u]=f.useState(!0),[p,x]=f.useState(!1),[h,m]=f.useState(1),[k,w]=f.useState(!0),j=Le.useRef(),C=async(b=!1,g="")=>{if(!(e!=null&&e._id))return;const T=b?1:h;b?(u(!0),s([])):x(!0);const A=await r(e._id,{page:T,limit:30,search:g});if(!A){u(!1),x(!1);return}const z=(Array.isArray(A)?A:A.data||[]).flatMap(H=>(H.participants||[]).map(D=>({...D,date:H.createdAt,mode:H.mode})));s(b?z:H=>[...H,...z]),Array.isArray(A)?w(!1):(w(A.page<A.totalPages),m(T+1)),u(!1),x(!1)},y=Le.useRef("");f.useEffect(()=>{C(!0,a),y.current=a},[e==null?void 0:e._id]),f.useEffect(()=>{if(a===y.current)return;const b=setTimeout(()=>{C(!0,a),y.current=a},500);return()=>clearTimeout(b)},[a]);const v=f.useCallback(b=>{c||p||(j.current&&j.current.disconnect(),j.current=new IntersectionObserver(g=>{g[0].isIntersecting&&k&&C(!1,a)}),b&&j.current.observe(b))},[c,p,k,h,a]);return e?i.jsx(JP,{onClick:t,children:i.jsxs(ZP,{onClick:b=>b.stopPropagation(),children:[i.jsxs(eM,{children:[i.jsxs(tM,{children:['"',e.title,'" natijalari']}),i.jsx(rM,{onClick:t,children:i.jsx(nt,{size:20})})]}),i.jsxs(nM,{children:[i.jsx(lM,{placeholder:"Foydalanuvchi qidirish...",value:a,onChange:b=>l(b.target.value)}),c&&o.length===0?i.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[...Array(5)].map((b,g)=>i.jsxs(oy,{children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",flex:1},children:[i.jsx(Ya,{size:"24px"}),i.jsx(Ya,{size:"28px"}),i.jsx(ft,{height:"16px",width:"120px",mb:"0"})]}),i.jsx(ft,{height:"20px",width:"40px",mb:"0"})]},g))}):o.length>0?i.jsxs(i.Fragment,{children:[o.map((b,g)=>i.jsxs(oy,{ref:g===o.length-1?v:null,children:[i.jsxs(oM,{children:[i.jsx(cM,{rank:g+1,children:g+1}),i.jsx(mn,{size:18,color:"var(--text-muted-color)"}),i.jsx(iM,{children:b.nickname}),i.jsx("span",{style:{fontSize:"0.8rem",color:"var(--text-muted-color)",marginLeft:"4px"},children:pt(b.date).format("DD.MM.YYYY HH:mm")})]}),i.jsxs(sM,{children:[i.jsx(Ww,{size:16}),b.score]})]},g)),p&&i.jsx("div",{style:{textAlign:"center",padding:"10px"},children:i.jsx(ft,{height:"20px",width:"100%",mb:"0"})})]}):i.jsx(aM,{children:a?"Natija topilmadi.":"Hozircha natijalar yo'q."})]})]})}):null},uM=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 10005;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,pM=d.div`
  background: #23272a;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid #36393f;
`,fM=d.div`
  background: linear-gradient(135deg, #2c2f33 0%, #1e2124 100%);
  padding: 32px 24px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #36393f;
`,hM=d.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
`,xM=d.h2`
  color: #fff;
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,gM=d.p`
  color: #b9bbbe;
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.5;
`,mM=d.div`
  padding: 32px 24px;
`,yM=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,iy=d.div`
  background: ${e=>e.$premium?"rgba(255, 170, 0, 0.05)":"#2f3136"};
  border: 1px solid
    ${e=>e.$premium?"rgba(255, 170, 0, 0.3)":"#40444b"};
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`,sy=d.h3`
  color: ${e=>e.$premium?"#ffaa00":"#fff"};
  font-size: 18px;
  margin: 0 0 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,ay=d.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,$n=d.li`
  color: #dcddde;
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.4;
`,vM=d.button`
  width: 100%;
  background: linear-gradient(135deg, #ffaa00 0%, #d48e00 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(255, 170, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 170, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`,rg=({isOpen:e,onClose:t,onUpgrade:r})=>e?i.jsx(uM,{onClick:t,children:i.jsxs(pM,{onClick:o=>o.stopPropagation(),children:[i.jsxs(fM,{children:[i.jsx(hM,{onClick:t,children:i.jsx(nt,{size:20})}),i.jsxs(xM,{children:[i.jsx(Ho,{color:"#ffaa00",fill:"#ffaa00",size:32}),"Jamm Premium"]}),i.jsxs(gM,{children:["Siz limitga yetdingiz! ",i.jsx("br",{}),"Cheklovlarni olib tashlash va qo'shimcha imkoniyatlarga ega bo'lish uchun Premium obunaga o'ting."]})]}),i.jsxs(mM,{children:[i.jsxs(yM,{children:[i.jsxs(iy,{children:[i.jsx(sy,{children:"Oddiy"}),i.jsxs(ay,{children:[i.jsxs($n,{children:[i.jsx(sr,{size:16,color:"#2ecc71",style:{flexShrink:0,marginTop:2}}),"Maksimal 3 ta test yaratish"]}),i.jsxs($n,{children:[i.jsx(sr,{size:16,color:"#2ecc71",style:{flexShrink:0,marginTop:2}}),"Maksimal 4 ta lug'at yaratish"]}),i.jsxs($n,{children:[i.jsx(nt,{size:16,color:"#ed4245",style:{flexShrink:0,marginTop:2}}),"Har bir to'plamda max 30 ta savol"]}),i.jsxs($n,{children:[i.jsx(nt,{size:16,color:"#ed4245",style:{flexShrink:0,marginTop:2}}),"Oddiy avatar va fonlar"]})]})]}),i.jsxs(iy,{$premium:!0,children:[i.jsxs(sy,{$premium:!0,children:[i.jsx(Ho,{size:18,fill:"#ffaa00"})," Premium"]}),i.jsxs(ay,{children:[i.jsxs($n,{children:[i.jsx(sr,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),i.jsx("span",{style:{color:"#fff",fontWeight:500},children:"Maksimal 10 ta test yaratish"})]}),i.jsxs($n,{children:[i.jsx(sr,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),i.jsx("span",{style:{color:"#fff",fontWeight:500},children:"Maksimal 10 ta lug'at yaratish"})]}),i.jsxs($n,{children:[i.jsx(sr,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),"Maxsus oltin belgi (badge)"]}),i.jsxs($n,{children:[i.jsx(sr,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),"Reklamasiz va cheksiz imkoniyatlar"]})]})]})]}),i.jsxs(vM,{onClick:r,children:[i.jsx(Kd,{size:18,fill:"#fff"}),"Obunani ko'rish va faollashtirish"]})]})]})}):null,bM=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,wM=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,kM=d.h2`
  font-size: 24px;
  color: var(--text-color);
  margin: 0;
`,jM=d.span`
  font-size: 14px;
  margin-top: 6px;
  color: var(--text-muted-color);
`,SM=d.button`
  display: flex;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;

  // @media (max-width: 768px) {
  //   display: flex;
  // }
`;d.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${e=>e.bgColor||"var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }
`;const CM=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  right: 0;
`,zM=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,ng=({title:e,count:t,limit:r,onBack:o,rightContent:s})=>i.jsxs(bM,{style:{justifyContent:"center",position:"relative"},children:[i.jsx(wM,{style:{position:"absolute",left:0},children:o?i.jsx(SM,{onClick:o,children:i.jsx(Dr,{size:20})}):i.jsx("div",{style:{width:"40px"}})}),i.jsxs(zM,{children:[i.jsx(kM,{children:e}),t!==void 0&&r!==void 0&&i.jsxs(jM,{children:["(",t,"/",r,")"]})]}),i.jsx(CM,{children:s})]}),EM=({width:e=20,height:t=20,color:r="#1d9bf0"})=>i.jsx("svg",{width:e,height:t,viewBox:"0 0 24 24",fill:r,style:{display:"inline-block",verticalAlign:"middle",marginLeft:"4px"},children:i.jsx("path",{d:"M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-1.01-1.01-2.52-1.27-3.91-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01 1.01-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-1.01 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"})}),_M=({width:e,height:t,color:r})=>i.jsx(EM,{width:e,height:t,color:r}),xj=f.createContext(),TM=()=>{const e=f.useContext(xj);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},$M=({children:e})=>{const[t,r]=f.useState(()=>localStorage.getItem("theme")||"dark");f.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},[t]);const o=l=>{r(l)},s={dark:{name:"Dark",colors:{primary:"#5865f2",background:"#36393f",secondary:"#2f3136",tertiary:"#202225",text:"#dcddde",textSecondary:"#b9bbbe",textMuted:"#72767d",border:"#40444b",hover:"rgba(255, 255, 255, 0.1)",active:"rgba(88, 101, 242, 0.1)",success:"#43b581",warning:"#faa61a",danger:"#f04747",input:"#40444b",placeholder:"#72767d"}},light:{name:"Light",colors:{primary:"#5865f2",background:"#ffffff",secondary:"#f2f3f5",tertiary:"#e3e5e8",text:"#2e3338",textSecondary:"#4f5660",textMuted:"#747f8d",border:"#e3e5e8",hover:"rgba(0, 0, 0, 0.05)",active:"rgba(88, 101, 242, 0.1)",success:"#3ba55c",warning:"#faa61a",danger:"#ed4245",input:"#ebedef",placeholder:"#747f8d"}}},a=s[t]||s.dark;return i.jsx(xj.Provider,{value:{theme:t,currentTheme:a,themes:s,toggleTheme:o},children:e})},RM=d.div`
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
`,PM=d.div`
  background-color: var(--secondary-color);
  border-radius: 8px;
  width: 740px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`,MM=d.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,OM=d.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
`,AM=d.button`
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
`,IM=d.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,LM=d.div`
  width: 240px;
  background-color: #202225;
  padding: 8px 0;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 0;
    flex-shrink: 0;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`,DM=d.div`
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

  @media (max-width: 768px) {
    padding: 12px 16px;
    white-space: nowrap;
    border-radius: 0;
    ${e=>e.active&&`
      border-bottom: 2px solid #5865f2;
      border-radius: 0;
    `}
  }
`,BM=d.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`,cn=d.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`,zo=d.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.4;
`,On=d.div`
  margin-bottom: 32px;
`,Mt=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #40444b;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,Ot=d.div`
  color: #dcddde;
  font-size: 16px;
  font-weight: 500;
`,At=d.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-top: 4px;
`,Ns=d.label`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${e=>e.checked?"#5865f2":"#72767d"};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`,Us=d.div`
  position: absolute;
  top: 2px;
  left: ${e=>e.checked?"22px":"2px"};
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.2s ease;
`,Rn=d.select`
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
  }
`,jp=d.input`
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
  }
`,ly=d.button`
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 16px;
  }
`,FM=d.button`
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 16px;
  }
`,NM=d.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`,UM=d.div`
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
`,qM=d.div`
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
`,ac=d.div`
  margin-bottom: 20px;
`,la=d.div`
  color: #b9bbbe;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`,ca=d.input`
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
`,HM=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,VM=d.button`
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
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  &:hover {
    background: #4752c4;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 20px;
  }
`,zh=d.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${e=>e.$error?"#f04747":"#43b581"};
`,YM=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,WM=d.div`
  background: #2f3136;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #40444b;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,KM=d.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,QM=d.div`
  background: var(--input-color);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 32px;
  border: 1px solid
    ${e=>e.$active?"var(--primary-color)":"var(--border-color)"};
`,GM=({profile:e,API_URL:t,getHeaders:r,loadProfile:o,onClose:s})=>{const{getUserByUsername:a,createChat:l,fetchChats:c}=ni(),u=pr(),[p,x]=f.useState(""),[h,m]=f.useState(!1),[k,w]=f.useState([]),[j,C]=f.useState(!1),[y,v]=f.useState(null);f.useEffect(()=>{b()},[]);const b=async()=>{C(!0);try{const T=await fetch(`${t}/premium/plans`,{headers:r()});if(T.ok){const A=await T.json();w(A)}}catch(T){console.error("Failed to load plans",T)}C(!1)},g=async()=>{if(p.trim()){m(!0),v(null);try{const T=await fetch(`${t}/premium/redeem`,{method:"POST",headers:r(),body:JSON.stringify({code:p})}),A=await T.json();T.ok?(v({text:"Premium faollashtirildi!",error:!1}),o(),x("")):v({text:A.message||"Promo-kod yaroqsiz",error:!0})}catch{v({text:"Tarmoq xatosi",error:!0})}m(!1),setTimeout(()=>v(null),3e3)}};return i.jsxs(i.Fragment,{children:[i.jsxs(cn,{style:{display:"flex",alignItems:"center",gap:10},children:[i.jsx(as,{size:20,color:"var(--primary-color)"})," Jamm Premium"]}),i.jsx(zo,{children:"Qo'shimcha imkoniyatlarni ochish uchun Premium obunani faollashtiring: Fayllar hajmini oshirish, qo'shimcha guruhlar ochish va maxsus imtiyozlar."}),i.jsxs(QM,{$active:e.premiumStatus==="active",children:[i.jsxs("div",{style:{fontSize:16,fontWeight:600,color:"var(--text-color)",marginBottom:8},children:["Holat:"," ",e.premiumStatus==="active"?i.jsx("span",{style:{color:"var(--primary-color)"},children:"Aktiv"}):i.jsx("span",{style:{color:"var(--text-muted-color)"},children:"Oddiy (Faol emas)"})]}),e.premiumStatus==="active"&&i.jsxs("div",{style:{color:"var(--text-muted-color)",fontSize:13},children:["Amal qilish muddati:"," ",i.jsx("strong",{style:{color:"var(--text-color)"},children:new Date(e.premiumExpiresAt).toLocaleDateString()})," ","gacha"]})]}),i.jsxs(On,{children:[i.jsx(la,{children:"Promo-kod orqali faollashtirish"}),i.jsxs(KM,{children:[i.jsx(ca,{placeholder:"Kodni kiriting",value:p,onChange:T=>x(T.target.value),style:{flex:1}}),i.jsxs(ly,{onClick:g,disabled:h||!p,style:{display:"flex",alignItems:"center",gap:8,justifyContent:"center"},children:[h?i.jsx(po,{size:14,style:{animation:"spin 1s linear infinite"}}):i.jsx(Kd,{size:14}),i.jsx("span",{children:h?"Tekshirilmoqda...":"Tasdiqlash"})]})]}),y&&i.jsx(zh,{style:{marginTop:10},$error:y.error,children:y.text})]}),i.jsx(cn,{style:{fontSize:18,marginTop:40},children:"Obuna rejalari"}),i.jsxs(YM,{children:[k.map(T=>i.jsxs(WM,{children:[i.jsx("div",{style:{color:"var(--text-color)",fontWeight:600,fontSize:16},children:T.name}),i.jsxs("div",{style:{color:"var(--text-color)",fontSize:24,fontWeight:700,margin:"8px 0"},children:["$",T.price]}),i.jsxs("div",{style:{color:"var(--text-muted-color)",fontSize:13},children:[T.durationInDays," kunlik muddat"]}),i.jsx(ly,{style:{marginTop:16,width:"100%"},onClick:async()=>{try{const A=await a("jamm_admin");if(!A)return;const B=await l({isGroup:!1,memberIds:[A._id||A.id]});await c(),s==null||s(),u(`/groups/${B.urlSlug||B.jammId||B._id||B.id}`)}catch(A){console.error("Admin chat open error",A)}},children:"Ulanish uchun murojaat"})]},T._id)),j&&i.jsx(po,{size:20,style:{animation:"spin 1s linear infinite"}})]})]})},Eh=({isOpen:e,onClose:t,initialSection:r="my-account"})=>{const{theme:o,toggleTheme:s}=TM(),[a,l]=f.useState(r);f.useEffect(()=>{e&&l(r)},[e,r]);const[c,u]=f.useState({inputDevice:"default",outputDevice:"default",autoInputSensitivity:!0,noiseSuppression:!0,desktopNotifications:!0,soundNotifications:!0,theme:o,messageDisplay:"compact",twoFactorAuth:!1,privacyMode:"friends",language:"en-US",region:"US"}),p="http://localhost:3000",x=je(S=>S.user)||{},[h,m]=f.useState({nickname:x.nickname||"",username:x.username||"",phone:x.phone||"",avatar:x.avatar||"",premiumStatus:x.premiumStatus||"none",premiumExpiresAt:x.premiumExpiresAt||null}),[k,w]=f.useState(!1),[j,C]=f.useState(!1),[y,v]=f.useState(null),[b,g]=f.useState(!1),T=f.useRef(null);f.useEffect(()=>{e&&B()},[e]);const A=()=>({"Content-Type":"application/json",Authorization:`Bearer ${je.getState().token}`}),B=async()=>{w(!0);try{const S=await fetch(`${p}/users/me`,{headers:A()});if(S.ok){const N=await S.json();m({nickname:N.nickname||"",username:N.username||"",phone:N.phone||"",avatar:N.avatar||"",bio:N.bio||"",premiumStatus:N.premiumStatus||"none",premiumExpiresAt:N.premiumExpiresAt});const{user:Q,token:X,setAuth:ee}=je.getState();ee({...Q,...N},X)}}catch{}w(!1)},z=async()=>{if(h.nickname&&(h.nickname.length<3||h.nickname.length>30)){v("Nickname 3 tadan 30 tagacha belgi bo'lishi kerak"),setTimeout(()=>v(null),3e3);return}if(h.username&&!/^[a-zA-Z0-9]{8,30}$/.test(h.username)){v("Username kamida 8 ta harf va raqamdan (min 8) iborat bo'lishi kerak"),setTimeout(()=>v(null),3e3);return}if(h.bio&&h.bio.length>30){v("Haqida (Bio) ko'pi bilan 30 ta belgidan iborat bo'lishi kerak"),setTimeout(()=>v(null),3e3);return}if(h.phone&&!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(h.phone)){v("Telefon raqam aniq '+998 XX XXX XX XX' formatida bo'lishi kerak"),setTimeout(()=>v(null),3e3);return}C(!0),v(null);const{premiumStatus:S,premiumExpiresAt:N,phone:Q,...X}=h;try{const ee=await fetch(`${p}/users/me`,{method:"PATCH",headers:A(),body:JSON.stringify({...X,phone:Q.replace(/\s/g,"")})});if(ee.ok){const ae=await ee.json(),{user:de,token:le,setAuth:te}=je.getState();te({...de,...ae},le),v("ok")}else{const ae=await ee.json().catch(()=>null),de=Array.isArray(ae==null?void 0:ae.message)?ae.message[0]:ae==null?void 0:ae.message;v(de||"Xatolik yuz berdi")}}catch(ee){console.log(ee),v("Tarmoq xatosi yuz berdi")}C(!1),setTimeout(()=>v(null),3e3)},H=()=>{T.current&&T.current.click()},D=async S=>{var X;const N=(X=S.target.files)==null?void 0:X[0];if(!N)return;if(N.size>2*1024*1024){Ne.error("Fayl hajmi juda katta (maksimum 2MB)");return}g(!0),v(null);const Q=new FormData;Q.append("file",N);try{const ee=await fetch(`${p}/users/avatar`,{method:"POST",headers:{Authorization:`Bearer ${je.getState().token}`},body:Q});if(ee.ok){const ae=await ee.json();m(Z=>({...Z,avatar:ae.avatar}));const{user:de,token:le,setAuth:te}=je.getState();te({...de,...ae},le),v("Avatar yuklandi!"),setTimeout(()=>v(null),3e3)}else{const ae=await ee.json().catch(()=>({}));Ne.error(ae.message||"Avatar yuklashda xatolik")}}catch(ee){console.error("Upload error:",ee),Ne.error("Tarmoq xatosi yuz berdi")}finally{g(!1)}},U=[{id:"my-account",label:"My Account",icon:mn},{id:"voice-video",label:"Voice & Video",icon:Ro},{id:"notifications",label:"Notifications",icon:P3},{id:"appearance",label:"Appearance",icon:J3},{id:"privacy",label:"Privacy & Security",icon:as},{id:"language",label:"Language & Region",icon:Vd},{id:"keybinds",label:"Keybinds",icon:q3},{id:"premium",label:"Jamm Premium",icon:Ho,color:"#ffaa00"}],M=S=>{u(N=>({...N,[S]:!N[S]}))},I=(S,N)=>{u(Q=>({...Q,[S]:N})),S==="theme"&&s(N)},P=()=>{var S,N;return k?i.jsxs("div",{style:{paddingTop:40,display:"flex",flexDirection:"column",gap:"24px"},children:[i.jsx(ft,{height:"24px",width:"150px",mb:"0"}),i.jsx(Ya,{size:"80px",mb:"0"}),i.jsxs("div",{children:[i.jsx(ft,{height:"16px",width:"80px",mb:"8px"}),i.jsx(ft,{height:"40px",width:"100%",mb:"0"})]}),i.jsxs("div",{children:[i.jsx(ft,{height:"16px",width:"80px",mb:"8px"}),i.jsx(ft,{height:"40px",width:"100%",mb:"0"})]}),i.jsxs("div",{children:[i.jsx(ft,{height:"16px",width:"80px",mb:"8px"}),i.jsx(ft,{height:"40px",width:"100%",mb:"0"})]})]}):i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"My Account"}),i.jsx("input",{type:"file",ref:T,style:{display:"none"},accept:"image/*",onChange:D}),i.jsxs(NM,{onClick:H,title:"Rasm yuklash",children:[i.jsx(UM,{children:b?i.jsx(po,{size:32,style:{animation:"spin 1s linear infinite"}}):h.avatar?i.jsx("img",{src:h.avatar,alt:"avatar"}):(h.nickname||h.username||"?").charAt(0).toUpperCase()}),i.jsx(qM,{children:i.jsx(lh,{size:22})})]}),i.jsxs(ac,{children:[i.jsxs(la,{style:{display:"flex",alignItems:"center",gap:6},children:["Nickname"," ",h.premiumStatus==="active"&&i.jsx(Ho,{size:14,color:"#ffaa00",fill:"#ffaa00"})]}),i.jsx(ca,{value:h.nickname,onChange:Q=>m(X=>({...X,nickname:Q.target.value})),placeholder:"Nickname"})]}),i.jsxs(ac,{children:[i.jsx(la,{children:"Username"}),i.jsx(ca,{value:h.username,onChange:Q=>m(X=>({...X,username:Q.target.value})),placeholder:"username"})]}),i.jsxs(ac,{children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx(la,{children:"Haqida (Bio)"}),i.jsxs("span",{style:{fontSize:"11px",color:((S=h.bio)==null?void 0:S.length)>30?"#f04747":"var(--text-muted-color)"},children:[((N=h.bio)==null?void 0:N.length)||0,"/30"]})]}),i.jsx(ca,{as:"textarea",rows:2,value:h.bio||"",onChange:Q=>m(X=>({...X,bio:Q.target.value})),placeholder:"O'zingiz haqingizda maksimal 30 ta belgi...",maxLength:30,style:{resize:"none"}})]}),i.jsxs(ac,{children:[i.jsx(la,{children:"Telefon raqam"}),i.jsx(ca,{value:h.phone||"+998",onChange:Q=>{let X=Q.target.value;X.startsWith("+998")||(X="+998");const ee=X.slice(4).replace(/[^\d]/g,"").slice(0,9);let ae="+998";ee.length>0&&(ae+=" "+ee.slice(0,2)),ee.length>2&&(ae+=" "+ee.slice(2,5)),ee.length>5&&(ae+=" "+ee.slice(5,7)),ee.length>7&&(ae+=" "+ee.slice(7,9)),m(de=>({...de,phone:ae}))},placeholder:"+998 90 000 00 00"})]}),i.jsxs(HM,{children:[i.jsxs(VM,{onClick:z,disabled:j,children:[j?i.jsx(po,{size:14}):i.jsx(sr,{size:14}),j?"Saqlanmoqda…":"Saqlash"]}),y==="ok"&&i.jsxs(zh,{children:[i.jsx(sr,{size:13}),"Muvaffaqiyatli saqlandi!"]}),y&&y!=="ok"&&i.jsxs(zh,{$error:!0,children:[i.jsx(Hd,{size:13}),y]})]})]})},E=()=>i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"Voice & Video"}),i.jsx(zo,{children:"Configure your input and output devices for voice and video."}),i.jsxs(On,{children:[i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"INPUT DEVICE"}),i.jsx(At,{children:"Choose your microphone"})]}),i.jsxs(Rn,{value:c.inputDevice,onChange:S=>I("inputDevice",S.target.value),children:[i.jsx("option",{value:"default",children:"Default Microphone"}),i.jsx("option",{value:"mic1",children:"Built-in Microphone"}),i.jsx("option",{value:"mic2",children:"USB Microphone"})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"OUTPUT DEVICE"}),i.jsx(At,{children:"Choose your speakers"})]}),i.jsxs(Rn,{value:c.outputDevice,onChange:S=>I("outputDevice",S.target.value),children:[i.jsx("option",{value:"default",children:"Default Speakers"}),i.jsx("option",{value:"speakers1",children:"Built-in Speakers"}),i.jsx("option",{value:"speakers2",children:"USB Headphones"})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"VIDEO DEVICE"}),i.jsx(At,{children:"Choose your camera"})]}),i.jsxs(Rn,{value:c.videoDevice,onChange:S=>I("videoDevice",S.target.value),children:[i.jsx("option",{value:"default",children:"Default Camera"}),i.jsx("option",{value:"camera1",children:"Built-in Camera"}),i.jsx("option",{value:"camera2",children:"USB Camera"})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"AUTOMATIC INPUT SENSITIVITY"}),i.jsx(At,{children:"Automatically adjust input volume"})]}),i.jsxs(Ns,{checked:c.autoInputSensitivity,children:[i.jsx("input",{type:"checkbox",checked:c.autoInputSensitivity,onChange:()=>M("autoInputSensitivity")}),i.jsx(Us,{checked:c.autoInputSensitivity})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"NOISE SUPPRESSION"}),i.jsx(At,{children:"Remove background noise from your voice"})]}),i.jsxs(Ns,{checked:c.noiseSuppression,children:[i.jsx("input",{type:"checkbox",checked:c.noiseSuppression,onChange:()=>M("noiseSuppression")}),i.jsx(Us,{checked:c.noiseSuppression})]})]})]})]}),_=()=>i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"Notifications"}),i.jsx(zo,{children:"Manage how you receive notifications."}),i.jsxs(On,{children:[i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"DESKTOP NOTIFICATIONS"}),i.jsx(At,{children:"Show notifications on your desktop"})]}),i.jsxs(Ns,{checked:c.desktopNotifications,children:[i.jsx("input",{type:"checkbox",checked:c.desktopNotifications,onChange:()=>M("desktopNotifications")}),i.jsx(Us,{checked:c.desktopNotifications})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"SOUND NOTIFICATIONS"}),i.jsx(At,{children:"Play sound when you receive a message"})]}),i.jsxs(Ns,{checked:c.soundNotifications,children:[i.jsx("input",{type:"checkbox",checked:c.soundNotifications,onChange:()=>M("soundNotifications")}),i.jsx(Us,{checked:c.soundNotifications})]})]})]})]}),R=()=>i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"Appearance"}),i.jsx(zo,{children:"Customize how Jamm looks on your device."}),i.jsxs(On,{children:[i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"THEME"}),i.jsx(At,{children:"Choose your preferred color theme"})]}),i.jsxs(Rn,{value:c.theme,onChange:S=>I("theme",S.target.value),children:[i.jsx("option",{value:"dark",children:"Dark"}),i.jsx("option",{value:"light",children:"Light"}),i.jsx("option",{value:"auto",children:"Auto"})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"MESSAGE DISPLAY"}),i.jsx(At,{children:"Choose how messages are displayed"})]}),i.jsxs(Rn,{value:c.messageDisplay,onChange:S=>I("messageDisplay",S.target.value),children:[i.jsx("option",{value:"compact",children:"Compact"}),i.jsx("option",{value:"cozy",children:"Cozy"}),i.jsx("option",{value:"roomy",children:"Roomy"})]})]})]})]}),$=()=>i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"Privacy & Security"}),i.jsx(zo,{children:"Manage your privacy and security settings."}),i.jsxs(On,{children:[i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"TWO-FACTOR AUTHENTICATION"}),i.jsx(At,{children:"Add an extra layer of security to your account"})]}),i.jsxs(Ns,{checked:c.twoFactorAuth,children:[i.jsx("input",{type:"checkbox",checked:c.twoFactorAuth,onChange:()=>M("twoFactorAuth")}),i.jsx(Us,{checked:c.twoFactorAuth})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"PRIVACY MODE"}),i.jsx(At,{children:"Control who can contact you"})]}),i.jsxs(Rn,{value:c.privacyMode,onChange:S=>I("privacyMode",S.target.value),children:[i.jsx("option",{value:"everyone",children:"Everyone"}),i.jsx("option",{value:"friends",children:"Friends of Friends"}),i.jsx("option",{value:"friends",children:"Friends Only"})]})]})]}),i.jsx(On,{children:i.jsxs(FM,{onClick:()=>Ne("Log out functionality WIP"),children:[i.jsx(Bx,{size:16,style:{marginRight:"8px"}}),"Log Out"]})})]}),F=()=>i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"Language & Region"}),i.jsx(zo,{children:"Set your language and region preferences."}),i.jsxs(On,{children:[i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"LANGUAGE"}),i.jsx(At,{children:"Choose your preferred language"})]}),i.jsxs(Rn,{value:c.language,onChange:S=>I("language",S.target.value),children:[i.jsx("option",{value:"en-US",children:"English (US)"}),i.jsx("option",{value:"es-ES",children:"Español"}),i.jsx("option",{value:"fr-FR",children:"Français"}),i.jsx("option",{value:"de-DE",children:"Deutsch"}),i.jsx("option",{value:"ja-JP",children:"日本語"}),i.jsx("option",{value:"zh-CN",children:"中文"}),i.jsx("option",{value:"ru-RU",children:"Русский"}),i.jsx("option",{value:"uz-UZ",children:"O'zbekcha"})]})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"REGION"}),i.jsx(At,{children:"Choose your server region"})]}),i.jsxs(Rn,{value:c.region,onChange:S=>I("region",S.target.value),children:[i.jsx("option",{value:"US",children:"United States"}),i.jsx("option",{value:"EU",children:"Europe"}),i.jsx("option",{value:"Asia",children:"Asia"}),i.jsx("option",{value:"RU",children:"Russia"})]})]})]})]}),L=()=>i.jsxs(i.Fragment,{children:[i.jsx(cn,{children:"Keybinds"}),i.jsx(zo,{children:"Customize your keyboard shortcuts."}),i.jsxs(On,{children:[i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"PUSH TO MUTE"}),i.jsx(At,{children:"Hold to temporarily mute your microphone"})]}),i.jsx(jp,{type:"text",value:"Ctrl + M",readOnly:!0})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"PUSH TO TALK"}),i.jsx(At,{children:"Hold to speak"})]}),i.jsx(jp,{type:"text",value:"Ctrl + T",readOnly:!0})]}),i.jsxs(Mt,{children:[i.jsxs("div",{children:[i.jsx(Ot,{children:"TOGGLE MUTE"}),i.jsx(At,{children:"Toggle microphone on/off"})]}),i.jsx(jp,{type:"text",value:"Ctrl + Shift + M",readOnly:!0})]})]})]}),O=()=>{switch(a){case"my-account":return P();case"voice-video":return E();case"notifications":return _();case"appearance":return R();case"privacy":return $();case"language":return F();case"keybinds":return L();case"premium":return i.jsx(GM,{profile:h,API_URL:p,getHeaders:A,loadProfile:B,onClose:t});default:return P()}};return e?i.jsx(RM,{onClick:t,children:i.jsxs(PM,{onClick:S=>S.stopPropagation(),children:[i.jsxs(MM,{children:[i.jsx(OM,{children:"User Settings"}),i.jsx(AM,{onClick:t,children:i.jsx(nt,{size:20})})]}),i.jsxs(IM,{children:[i.jsx(LM,{children:U.map(S=>{const N=S.icon;return i.jsxs(DM,{active:a===S.id,onClick:()=>l(S.id),children:[i.jsx(N,{size:18}),S.label]},S.id)})}),i.jsx(BM,{children:O()})]})]})}):null},XM=Ft`from { opacity: 0; } to { opacity: 1; }`,JM=Ft`from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); }`,ZM=d.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${XM} 0.2s ease;
  padding: 20px;
`,e7=d.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  animation: ${JM} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
`,t7=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
`,r7=d.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`,n7=d.button`
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
  transition: all 0.15s;
  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`,o7=d.div`
  padding: 16px 20px;
  display: flex;
  gap: 12px;
`,i7=d.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,s7=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,a7=d.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`,l7=d.textarea`
  width: 100%;
  min-height: 120px;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.6;
  font-family: inherit;
  caret-color: var(--primary-color);

  &::placeholder {
    color: var(--text-muted-color);
  }
`,c7=d.div`
  font-size: 12px;
  color: ${e=>e.warn?"#ed4245":"var(--text-muted-color)"};
  align-self: flex-end;
  font-variant-numeric: tabular-nums;
`,d7=d.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 20px 16px 20px;
`,Sp=d.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.15s;
  &:hover {
    background: var(--input-color);
    color: var(--primary-color);
  }
`,u7=d.div`
  width: 1px;
  height: 20px;
  background: var(--border-color);
  margin: 0 4px;
`,p7=d.div`
  flex: 1;
`,f7=d.button`
  padding: 9px 20px;
  border-radius: 20px;
  background: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  opacity: ${e=>e.disabled?.4:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.35);
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.5);
  }
`,Cp=500,gj=({isOpen:e,onClose:t,onSubmit:r,currentUser:o})=>{const[s,a]=f.useState(""),l=f.useRef(null);f.useEffect(()=>{e?setTimeout(()=>{var k;return(k=l.current)==null?void 0:k.focus()},80):a("")},[e]);const c=k=>{k.key==="Escape"&&t(),(k.metaKey||k.ctrlKey)&&k.key==="Enter"&&u()},u=()=>{s.trim()&&(r(s.trim()),t())},p=(k,w="")=>{const j=l.current;if(!j)return;const C=j.selectionStart,y=j.selectionEnd,v=s.slice(C,y),b=s.slice(0,C),g=s.slice(y),T=`${b}${k}${v}${w}${g}`;T.length<=Cp&&(a(T),setTimeout(()=>{j.focus(),j.setSelectionRange(C+k.length,y+k.length)},0))},x=(o==null?void 0:o.nickname)||(o==null?void 0:o.username)||"Siz",h=x.charAt(0).toUpperCase(),m=Cp-s.length;return e?i.jsx(ZM,{onClick:k=>k.target===k.currentTarget&&t(),children:i.jsxs(e7,{children:[i.jsxs(t7,{children:[i.jsx(r7,{children:"Yangi Gurung"}),i.jsx(n7,{onClick:t,children:i.jsx(nt,{size:16})})]}),i.jsxs(o7,{children:[i.jsx(i7,{children:o!=null&&o.avatar?i.jsx("img",{src:o.avatar,alt:x}):h}),i.jsxs(s7,{children:[i.jsx(a7,{children:x}),i.jsx(l7,{ref:l,value:s,onChange:k=>{k.target.value.length<=Cp&&a(k.target.value)},onKeyDown:c,placeholder:"Fikringizni yozing… markdown qo'llab-quvvatlanadi: **qalin**, _kursiv_, #teg",spellCheck:!1}),i.jsx(c7,{warn:m<50,children:m})]})]}),i.jsxs(d7,{children:[i.jsx(Sp,{title:"Qalin (Ctrl+B)",onClick:()=>p("**","**"),children:i.jsx(M3,{size:15})}),i.jsx(Sp,{title:"Kursiv (Ctrl+I)",onClick:()=>p("_","_"),children:i.jsx(V3,{size:15})}),i.jsx(Sp,{title:"Teg qo'shish",onClick:()=>p("#"),children:i.jsx(Va,{size:15})}),i.jsx(u7,{}),i.jsx(p7,{}),i.jsxs(f7,{disabled:!s.trim(),onClick:u,children:[i.jsx(Nx,{size:14}),"E'lon berish"]})]})]})}):null},h7=async(e="foryou",t=1,r=10)=>{const{data:o}=await be.get(`/posts/feed?type=${e}&page=${t}&limit=${r}`);return o},x7=async e=>{const{data:t}=await be.post("/posts",{content:e});return t},g7=async e=>{await be.delete(`/posts/${e}`)},m7=async e=>{const{data:t}=await be.post(`/posts/${e}/like`);return t},y7=async e=>{const{data:t}=await be.post(`/posts/${e}/view`);return t},v7=async({postId:e,content:t})=>{const{data:r}=await be.post(`/posts/${e}/comments`,{content:t});return r},b7=async({postId:e,commentId:t,content:r,replyToUser:o})=>{const{data:s}=await be.post(`/posts/${e}/comments/${t}/reply`,{content:r,replyToUser:o});return s},w7=async(e,t=1,r=10)=>{const{data:o}=await be.get(`/posts/${e}/comments?page=${t}&limit=${r}`);return o},k7=async e=>{const{data:t}=await be.get(`/posts/user/${e}`);return t},j7=async e=>{const{data:t}=await be.post(`/users/${e}/follow`);return t},S7=async e=>{const{data:t}=await be.get(`/users/${e}/profile`);return t},mj=f.createContext(),og=()=>f.useContext(mj),C7=({children:e})=>{const[t,r]=f.useState([]),[o,s]=f.useState(1),[a,l]=f.useState(!0),[c,u]=f.useState([]),[p,x]=f.useState(1),[h,m]=f.useState(!0),[k,w]=f.useState([]),[j,C]=f.useState(!1),y=f.useCallback(async(I="foryou",P=1)=>{P===1&&C(!0);try{const E=await h7(I,P,10),_=E.data||[],R=E.totalPages||1;I==="foryou"?(r($=>P===1?_:[...$,..._]),s(P),l(P<R)):(u($=>P===1?_:[...$,..._]),x(P),m(P<R))}catch(E){console.error("fetchFeed error:",E)}finally{P===1&&C(!1)}},[]),v=f.useCallback(async I=>{try{const P=await x7(I);return r(E=>[P,...E]),P}catch(P){return console.error("createPost error:",P),null}},[]),b=f.useCallback(async I=>{try{const{liked:P,likes:E}=await m7(I),_=R=>R.map($=>$._id===I?{...$,liked:P,likes:E}:$);r(_),u(_),w(_)}catch(P){console.error("likePost error:",P)}},[]),g=f.useCallback(async I=>{try{const{views:P}=await y7(I),E=_=>_.map(R=>R._id===I?{...R,views:P}:R);r(E),u(E),w(E)}catch(P){console.error("viewPost error:",P)}},[]),T=f.useCallback(async(I,P)=>{try{const{comments:E}=await v7({postId:I,content:P}),_=R=>R.map($=>$._id===I?{...$,comments:E}:$);r(_),u(_),w(_)}catch(E){console.error("addComment error:",E)}},[]),A=f.useCallback(async(I,P=1,E=10)=>{try{return await w7(I,P,E)}catch(_){return console.error("getComments error:",_),[]}},[]),B=f.useCallback(async(I,P,E,_)=>{try{return await b7({postId:I,commentId:P,content:E,replyToUser:_})}catch(R){return console.error("addReply error:",R),null}},[]),z=f.useCallback(async I=>{try{const P=await k7(I);return w(P),P}catch(P){return console.error("fetchUserPosts error:",P),[]}},[]),H=f.useCallback(async I=>{try{await g7(I);const P=E=>E.filter(_=>_._id!==I);r(P),u(P),w(P)}catch(P){console.error("deletePost error:",P)}},[]),D=f.useCallback(async I=>{try{return await j7(I)}catch(P){return console.error("toggleFollow error:",P),null}},[]),U=f.useCallback(async I=>{try{return await S7(I)}catch(P){return console.error("getPublicProfile error:",P),null}},[]),M={forYouPosts:t,forYouPage:o,forYouHasMore:a,followingPosts:c,followingPage:p,followingHasMore:h,userPosts:k,loading:j,fetchFeed:y,createPost:v,likePost:b,viewPost:g,addComment:T,getComments:A,addReply:B,fetchUserPosts:z,deletePost:H,toggleFollow:D,getPublicProfile:U};return i.jsx(mj.Provider,{value:M,children:e})},cy=d.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  margin-right: 12px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`,ul=Ft`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;Ft`from { background-position: -200% 0; } to { background-position: 200% 0; }`;const z7=d.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-color);
`,E7=d.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  animation: ${ul} 0.3s ease;

  /* hide scrollbar visually */
  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`,yj=d.div`
  position: relative;
  height: 140px;
  background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #9b59b6 100%);
  flex-shrink: 0;
  overflow: hidden;
`,_7=d.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.3) 100%
  );
`,T7=d.button`
  position: absolute;
  top: 10px;
  right: 50px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${yj}:hover & {
    opacity: 1;
  }
`,$7=d.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.65);
    transform: scale(1.05);
  }
`,R7=d.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 20px;
  flex-shrink: 0;
  z-index: 2;
`,P7=d.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--secondary-color);
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: white;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.4);
  cursor: pointer;
  transition: transform 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }
`,M7=d.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 2px solid var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`,O7=d.div`
  padding: 12px 20px 0;
  animation: ${ul} 0.35s ease 0.05s both;
`,A7=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`,I7=d.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0 2px;
  line-height: 1.2;
`,L7=d.div`
  font-size: 13px;
  color: var(--text-muted-color);
  margin-bottom: 10px;
`,D7=d.p`
  font-size: 13px;
  color: var(--text-secondary-color);
  line-height: 1.55;
  margin: 0 0 14px;
`,B7=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted-color);
  margin-bottom: 6px;

  a {
    color: var(--primary-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`,F7=d.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin: 0 20px 20px;
  padding: 16px 0;
  animation: ${ul} 0.35s ease 0.1s both;
`,N7=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-right: 1px solid var(--border-color);

  &:last-child {
    border-right: none;
  }
`,U7=d.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1;
`,q7=d.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted-color);
`,H7=d.div`
  display: flex;
  gap: 10px;
  padding: 0 20px 16px;
  animation: ${ul} 0.35s ease 0.15s both;
`;d.button`
  flex: 1;
  padding: 9px 0;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);

  &:hover {
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.5);
    transform: translateY(-1px);
  }
`;const V7=d.button`
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  background: ${e=>e.following?"transparent":"var(--primary-color)"};
  color: ${e=>e.following?"var(--text-color)":"white"};
  font-size: 14px;
  font-weight: 600;
  border: ${e=>e.following?"1px solid var(--border-color)":"1px solid var(--primary-color)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${e=>e.following?"rgba(237, 66, 69, 0.1)":"#4752c4"};
    color: ${e=>e.following?"#ed4245":"white"};
    border-color: ${e=>e.following?"#ed4245":"#4752c4"};
  }
`,Y7=d.button`
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-color);
  }
`;d.button`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--input-color);
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`;const W7=d.div`
  height: 24px;
`,K7=d.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px 20px;
  animation: ${ul} 0.35s ease 0.2s both;
`,dy=d.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${e=>e.active?"var(--input-color)":"transparent"};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: ${e=>e.active?"var(--text-color)":"var(--text-muted-color)"};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: var(--input-color);
    color: var(--text-color);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${e=>e.iconBg||"var(--primary-color)"};
    color: white;
  }
`,Q7=d.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  overflow-y: auto;
  border-left: 1px solid var(--border-color);

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,uy=d.div`
  padding: 24px 32px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-color);
  }
`,py=d.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`,fy=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
  font-size: 14px;
  gap: 12px;
  margin-top: 100px;
`,hy=d.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`,G7=d.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`,X7=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`,J7=d.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Z7=d.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0 0 2px;
  }
  span {
    font-size: 12px;
    color: var(--text-muted-color);
  }
`,eO=d.div`
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-color);
  white-space: pre-wrap;
  word-break: break-word;

  /* simple markdown rendering */
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
`,tO=d.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
`,zp=d.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${e=>e.active?e.activeColor||"#ed4245":"var(--text-muted-color)"};
  font-size: 13px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    color: ${e=>e.activeColor||"var(--text-secondary-color)"};
    transform: scale(1.1);
  }
`,pl=d.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.4);
  &:hover {
    transform: scale(1.12) rotate(90deg);
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.55);
  }
`,rO=({profileUserId:e})=>{var F;const t=je(L=>L.user),{userPosts:r,fetchUserPosts:o,createPost:s,likePost:a,getPublicProfile:l,toggleFollow:c}=og(),{courses:u}=dl(),p=pr(),x=window.innerWidth<=768,[h,m]=f.useState(x?null:"groups"),[k,w]=f.useState(!1),[j,C]=f.useState(!1),[y,v]=f.useState(null),[b,g]=f.useState(!1),T=(t==null?void 0:t._id)||(t==null?void 0:t.id),A=!e||e===T;f.useEffect(()=>{if(A){const L=T;L&&o(L)}else l(e).then(L=>{L&&(v(L),g(L.isFollowing))}),o(e)},[e,T,A,o,l]);const B=async L=>{await s(L);const O=T;O&&o(O)},z=async()=>{const L=await c(e);L&&(g(L.following),v(O=>O&&{...O,followersCount:L.followersCount}))},H=L=>{const O=new Date(L);return O.toLocaleDateString("uz-UZ",{day:"numeric",month:"short"})+" · "+O.toLocaleTimeString("uz-UZ",{hour:"2-digit",minute:"2-digit"})},D=L=>{if(!L)return"";const O=[];let S=0;const N=/\*\*(.+?)\*\*|_(.+?)_/g;let Q=0,X;for(;(X=N.exec(L))!==null;)X.index>Q&&O.push(i.jsx("span",{children:L.slice(Q,X.index)},S++)),X[1]!==void 0?O.push(i.jsx("strong",{children:X[1]},S++)):O.push(i.jsx("em",{children:X[2]},S++)),Q=X.index+X[0].length;return Q<L.length&&O.push(i.jsx("span",{children:L.slice(Q)},S++)),O.length?O:L};if(!t||!A&&!y)return null;const U=A?t:y,M=U.nickname||U.username||"Foydalanuvchi",I=`@${(U.username||"user").toLowerCase()}`,P=M.charAt(0).toUpperCase(),E=U.premiumStatus==="active",_=A?t.avatar:U.avatar,R=u.filter(L=>{if(!L||!L.createdBy)return!1;let O=L.createdBy,S="";typeof O=="string"?S=O:typeof O=="object"&&(S=O._id||O.id||JSON.stringify(O));let N=String(U._id||U.id);return S.toString()===N.toString()}),$=[{value:A?((F=t.followers)==null?void 0:F.length)||"0":String(U.followersCount||0),label:"Obunachilar"},{value:String(r.length),label:"Gurunglar"},{value:String(R.length),label:"Darslar"}];return i.jsxs(z7,{children:[i.jsxs(E7,{children:[i.jsxs(yj,{children:[i.jsx(_7,{}),A&&i.jsxs(i.Fragment,{children:[i.jsx(T7,{title:"Muqovani o'zgartirish",children:i.jsx(lh,{size:14})}),i.jsx($7,{title:"Sozlamalar",onClick:()=>w(!0),children:i.jsx(r6,{size:16})})]})]}),i.jsxs(R7,{children:[i.jsx(P7,{children:_?i.jsx("img",{src:_,alt:M}):P}),A&&i.jsx(M7,{title:"Avatarni o'zgartirish",children:i.jsx(lh,{size:10})})]}),i.jsxs(O7,{children:[i.jsxs(A7,{children:[i.jsx(I7,{children:M}),E&&i.jsx(_M,{})]}),i.jsx(L7,{children:I}),i.jsx(D7,{children:U.bio||(A?"Hali tavsif qo'shilmagan. O'z profilingizni to'ldiring!":"Tavsif qo'shilmagan.")}),i.jsxs(B7,{children:[i.jsx(Aw,{size:13}),i.jsxs("span",{children:[pt(U.createdAt).format("DD MMMM YYYY")," dan a'zo"]})]})]}),!A&&i.jsxs(H7,{children:[i.jsx(V7,{following:b,onClick:z,children:b?i.jsxs(i.Fragment,{children:[i.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:i.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Obunasiz"]}):i.jsxs(i.Fragment,{children:[i.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[i.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),i.jsx("circle",{cx:"9",cy:"7",r:"4"}),i.jsx("line",{x1:"19",y1:"8",x2:"19",y2:"14"}),i.jsx("line",{x1:"22",y1:"11",x2:"16",y2:"11"})]}),"Obuna bo'lish"]})}),i.jsxs(Y7,{onClick:()=>{const L=U.jammId||U._id;p(`/a/${L}`)},children:[i.jsx($i,{size:16}),"Xabar"]})]}),i.jsx(W7,{}),i.jsx(F7,{children:$.map((L,O)=>i.jsxs(N7,{children:[i.jsx(U7,{children:L.value}),i.jsx(q7,{children:L.label})]},O))}),i.jsxs(K7,{children:[i.jsxs(dy,{active:h==="groups",onClick:()=>m("groups"),iconBg:"#3ba55d",children:[i.jsx("div",{className:"icon-wrapper",children:i.jsx($i,{size:16})}),"Gurunglar"]}),i.jsxs(dy,{active:h==="courses",onClick:()=>m("courses"),iconBg:"#faa61a",children:[i.jsx("div",{className:"icon-wrapper",children:i.jsx(Li,{size:16})}),"Darslar"]})]})]}),i.jsxs(Q7,{style:{display:h?"flex":"none"},children:[h==="groups"&&i.jsxs(i.Fragment,{children:[i.jsxs(uy,{children:[i.jsx(cy,{onClick:()=>m(null),children:i.jsx(Dr,{size:20})}),i.jsx($i,{size:24,color:"#3ba55d"}),i.jsx("h2",{children:"Gurunglar"}),A&&i.jsx(pl,{onClick:()=>C(!0),title:"Gurung yarating",children:i.jsx(Ht,{size:16})})]}),r.length===0?i.jsx(py,{children:i.jsxs(fy,{children:[i.jsx(hy,{children:i.jsx($i,{size:28,color:"var(--text-muted-color)"})}),i.jsx("span",{children:"Birinchi gurungi yozing!"})]})}):r.map(L=>i.jsxs(G7,{children:[i.jsxs(X7,{children:[i.jsx(J7,{children:t!=null&&t.avatar?i.jsx("img",{src:t.avatar,alt:M}):M.charAt(0).toUpperCase()}),i.jsxs(Z7,{children:[i.jsx("h4",{children:M}),i.jsx("span",{children:H(L.createdAt)})]})]}),i.jsx(eO,{children:D(L.content)}),i.jsxs(tO,{children:[i.jsxs(zp,{active:L.liked,activeColor:"#ed4245",onClick:()=>a(L._id),children:[i.jsx(Dw,{size:16,fill:L.liked?"#ed4245":"none"}),L.likes]}),i.jsxs(zp,{activeColor:"#5865f2",children:[i.jsx(Nw,{size:16}),L.comments]}),i.jsxs(zp,{activeColor:"var(--text-muted-color)",children:[i.jsx(Ha,{size:16}),L.views]})]})]},L._id))]}),h==="courses"&&i.jsxs(i.Fragment,{children:[i.jsxs(uy,{children:[i.jsx(cy,{onClick:()=>m(null),children:i.jsx(Dr,{size:20})}),i.jsx(Li,{size:24,color:"#faa61a"}),i.jsx("h2",{children:"Darslar"})]}),i.jsx(py,{children:R.length===0?i.jsxs(fy,{children:[i.jsx(hy,{children:i.jsx(Li,{size:28,color:"var(--text-muted-color)"})}),i.jsx("span",{children:"Siz qo'shgan darslar yo'q"})]}):i.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))",gap:"20px"},children:R.map(L=>i.jsxs("div",{onClick:()=>p(`/courses/${L.urlSlug||L.id||L._id}`),style:{background:"var(--input-color)",borderRadius:"12px",overflow:"hidden",cursor:"pointer",transition:"transform 0.2s"},onMouseEnter:O=>O.currentTarget.style.transform="scale(1.03)",onMouseLeave:O=>O.currentTarget.style.transform="scale(1)",children:[i.jsx("div",{style:{height:"140px",background:L.gradient||"var(--primary-color)",backgroundImage:L.image?`url(${L.image})`:"none",backgroundSize:"cover",backgroundPosition:"center"}}),i.jsxs("div",{style:{padding:"16px"},children:[i.jsx("h4",{style:{margin:"0 0 8px",color:"var(--text-color)",fontSize:"16px",fontWeight:"700"},children:L.name}),i.jsx("p",{style:{margin:"0",color:"var(--text-muted-color)",fontSize:"13px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:L.description||"Tavsif yo'q"})]})]},L._id||L.id))})})]})]}),i.jsx(Eh,{isOpen:k,onClose:()=>w(!1)}),i.jsx(gj,{isOpen:j,onClose:()=>C(!1),onSubmit:B,currentUser:t})]})},nO=d.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--background-color);
    animation: slideInFromRight 0.3s ease-out;
    padding: 20px;
    overflow-y: auto;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;d.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;const oO=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`,iO=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,sO=d.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`,xy=d.p`
  font-size: 14px;
  color: var(--text-muted-color);
  margin: 0;
  line-height: 1.4;
`,gy=d.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,my=d.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`,aO=({initialTestId:e,onBack:t})=>{const{tests:r,myTests:o,myTestsPage:s,myTestsHasMore:a,fetchMyTests:l,createBattle:c}=rn(),u=pr(),p=je(z=>z.user),[x,h]=f.useState(!1),[m,k]=f.useState(!1),[w,j]=f.useState(null),[C,y]=f.useState(null),v=Le.useRef(!1);f.useEffect(()=>{v.current||(l(),v.current=!0)},[l]),f.useEffect(()=>{if(e&&!w){const H=[...r,...o].find(D=>D._id===e||D.urlSlug===e);if(H)j(H);else{if(e=="0")return;pP(e).then(D=>{D&&j(D)}).catch(D=>{console.error("Failed to fetch test by ID:",D),He.error("Test topilmadi yoki unga ruxsat yo'q.")})}}},[e,r,o,w]);const b=z=>{const H=`${window.location.origin}/arena/quiz/${z}`;navigator.clipboard.writeText(H),He.success("Test havolasi nusxalandi!")};if(w)return i.jsx(XP,{test:w,onClose:()=>{j(null),u("/arena")}});const g=(p==null?void 0:p.premiumStatus)==="premium",T=g?10:3,A=o.length,B=()=>{if(A>=T){g?He.error("Siz maksimal limitga yetgansiz (10/10)."):k(!0);return}h(!0)};return i.jsxs(nO,{children:[i.jsx(ng,{title:"Testlar",count:A,onBack:()=>t&&t(),rightContent:i.jsx(pl,{onClick:B,children:i.jsx(Ht,{size:18})})}),i.jsx(yo,{dataLength:o.length,next:()=>l(s+1),hasMore:a,loader:i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px",gridColumn:"1 / -1"},children:"Yuklanmoqda..."}),endMessage:o.length>0?i.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px",gridColumn:"1 / -1"},children:"Barcha testlar ko'rsatildi."}):null,scrollableTarget:null,style:{overflow:"visible"},children:i.jsxs(oO,{id:"arenaTestsList",children:[o.map(z=>{var H,D,U;return i.jsxs(iO,{children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx(sO,{children:z.title}),i.jsx("button",{onClick:()=>b(z._id),style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},title:"Havolani nusxalash",children:i.jsx(Bw,{size:16})})]}),i.jsx(xy,{children:z.description||"Tavsif yo'q"}),i.jsxs(gy,{children:["Savollar soni: ",((H=z.questions)==null?void 0:H.length)||0]}),i.jsxs(gy,{children:["Tuzuvchi: ",((D=z.createdBy)==null?void 0:D.nickname)||((U=z.createdBy)==null?void 0:U.username)]}),i.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"auto"},children:[i.jsx(my,{style:{flex:1,backgroundColor:"var(--bg-color)"},onClick:()=>j(z),children:"Boshlash"}),i.jsx(my,{style:{flex:1,backgroundColor:"var(--primary-color)",color:"white",borderColor:"var(--primary-color)"},onClick:()=>y(z),children:"Natijalar"})]})]},z._id)}),o.length===0&&i.jsx(xy,{style:{gridColumn:"1 / -1"},children:"Hozircha hech qanday test yaratilmagan."})]})}),i.jsx(IP,{isOpen:x,onClose:()=>h(!1)}),C&&i.jsx(dM,{test:C,onClose:()=>y(null)}),i.jsx(rg,{isOpen:m,onClose:()=>k(!1),onUpgrade:()=>{k(!1),window.location.href="/premium"}})]})},yy=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`,lO=d.div`
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
`,vy=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`,by=d.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  &:hover {
    background: var(--tertiary-color);
    color: var(--text-color);
  }
`,wy=d.div`
  margin-bottom: 16px;
`,ky=d.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-muted-color);
  font-weight: 500;
  font-size: 0.9rem;
`,jy=d.input`
  width: 100%;
  padding: 12px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
`,cO=d.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`,Sy=d.button`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  background-color: ${e=>e.active?"var(--primary-color)":"var(--tertiary-color)"};
  color: ${e=>e.active?"white":"var(--text-color)"};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    filter: brightness(1.1);
  }
`,dO=d.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`,uO=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,pO=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,fO=d.button`
  background: transparent;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`,hO=d.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  color: var(--primary-color);
  border: 1px dashed var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(var(--primary-color-rgb), 0.1);
  }
`,xO=d.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  font-family: monospace;
`,gO=d.p`
  font-size: 0.85rem;
  color: var(--text-muted-color);
  margin-top: 8px;
`,mO=d.div`
  background: #111;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  color: #ddd;
  margin-top: 8px;
  white-space: pre-wrap;
`,yO=d.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`,Ep=d.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${e=>e.primary?"var(--primary-color)":"var(--tertiary-color)"};
  color: ${e=>e.primary?"white":"var(--text-color)"};

  &:hover {
    filter: brightness(1.1);
  }
`,Cy=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 4px 8px;
`,zy=d.input`
  flex: 1;
  padding: 6px;
  background: transparent;
  border: none;
  color: var(--text-color);
  outline: none;
  font-size: 0.95rem;
  width: 100%;
`,Ey=d.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    color: var(--primary-color);
    background: rgba(88, 101, 242, 0.1);
  }
`,_y=d.img`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  object-fit: cover;
`,vO=d.div`
  background: var(--secondary-color);
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
`,bO=d.form`
  display: flex;
  gap: 8px;
`,wO=d.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-height: 350px;
  overflow-y: auto;
  padding: 4px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`,kO=d.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.03);
    border: 2px solid var(--primary-color);
  }
`,jO=({onClose:e})=>{const{createFlashcardDeck:t}=rn(),[r,o]=f.useState(""),[s,a]=f.useState("manual"),[l,c]=f.useState([{front:"",back:"",frontImage:"",backImage:""}]),[u,p]=f.useState(""),[x,h]=f.useState({isOpen:!1,cardIndex:null,side:null}),[m,k]=f.useState(""),[w,j]=f.useState([]),[C,y]=f.useState(!1),v=async D=>{if(D==null||D.preventDefault(),!m.trim())return;y(!0),await new Promise(I=>setTimeout(I,600));const U=encodeURIComponent(m.trim()),M=Array.from({length:9}).map((I,P)=>`https://loremflickr.com/320/240/${U}?lock=${P+Math.floor(Math.random()*1e3)}`);j(M),y(!1)},b=D=>{B(x.cardIndex,x.side,D),h({isOpen:!1,cardIndex:null,side:null}),k(""),j([])},g=(D,U)=>{h({isOpen:!0,cardIndex:D,side:U});const M=l[D][U.replace("Image","")];M?k(M):(k(""),j([]))},T=()=>{if(l.length>=30){He.error("Maksimal 30 ta so'z qo'shish mumkin!");return}c([...l,{front:"",back:"",frontImage:"",backImage:""}])},A=D=>{c(l.filter((U,M)=>M!==D))},B=(D,U,M)=>{const I=[...l];I[D][U]=M,c(I)},z=()=>{if(!u.trim())return[];const D=u.split(";").filter(M=>M.trim()),U=[];for(const M of D){const I=M.indexOf(",");if(I>-1){const P=M.substring(0,I).trim(),E=M.substring(I+1).trim();P&&E&&U.push({front:P,back:E})}}return U},H=async()=>{if(!r.trim()){He.error("Lug'at sarlavhasini kiriting");return}let D=[];if(s==="manual"?D=l.filter(M=>M.front.trim()!==""&&M.back.trim()!==""):D=z(),D.length===0){He.error("Kamida bitta to'g'ri karta kiriting");return}if(D.length>30){He.error("Maksimal 30 ta so'z qo'shish mumkin!");return}const U={title:r.trim(),cards:D};try{await t(U),e()}catch{He.error("Xatolik yuz berdi")}};return i.jsxs(yy,{children:[i.jsxs(lO,{children:[i.jsxs(vy,{children:[i.jsx("h2",{children:"Yangi Lug'at (Flashcards)"}),i.jsx(by,{onClick:e,children:i.jsx(nt,{size:24})})]}),i.jsxs(wy,{children:[i.jsx(ky,{children:"To'plam nomi"}),i.jsx(jy,{placeholder:"Masalan: Ingliz tili - 1-dars",value:r,onChange:D=>o(D.target.value)})]}),i.jsxs(cO,{children:[i.jsx(Sy,{active:s==="manual",onClick:()=>a("manual"),children:"Qo'lda kiritish"}),i.jsx(Sy,{active:s==="template",onClick:()=>a("template"),children:"Andaza (Shablon)"})]}),s==="manual"?i.jsxs(i.Fragment,{children:[i.jsx(dO,{children:l.map((D,U)=>i.jsxs(uO,{children:[i.jsxs(pO,{children:[i.jsxs(Cy,{children:[D.frontImage&&i.jsx(_y,{src:D.frontImage,alt:"f"}),i.jsx(zy,{placeholder:`So'z (front) ${U+1}`,value:D.front,onChange:M=>B(U,"front",M.target.value)}),i.jsx(Ey,{onClick:()=>g(U,"frontImage"),title:"Rasm qidirish",children:i.jsx(dh,{size:16})})]}),i.jsxs(Cy,{children:[D.backImage&&i.jsx(_y,{src:D.backImage,alt:"b"}),i.jsx(zy,{placeholder:`Ma'nosi (back) ${U+1}`,value:D.back,onChange:M=>B(U,"back",M.target.value)}),i.jsx(Ey,{onClick:()=>g(U,"backImage"),title:"Rasm qidirish",children:i.jsx(dh,{size:16})})]})]}),l.length>1&&i.jsx(fO,{onClick:()=>A(U),children:i.jsx(xs,{size:20})})]},U))}),i.jsxs(hO,{onClick:T,disabled:l.length>=30,children:[i.jsx(Ht,{size:18})," ",l.length>=30?"Limitga yetildi (30/30)":"Yangi so'z qo'shish"]})]}):i.jsxs(wy,{children:[i.jsx(ky,{children:"Shablon matni"}),i.jsx(xO,{placeholder:"Apple,Olma;Book,Kitob;",value:u,onChange:D=>p(D.target.value)}),i.jsxs(gO,{children:["So'z va uning ma'nosini vergul (",i.jsx("b",{children:","}),") bilan ajrating. Har bir so'z juftligini nuqtali-vergul (",i.jsx("b",{children:";"}),") bilan ajrating."]}),i.jsxs(mO,{children:["Apple,Olma;",i.jsx("br",{}),"Book,Kitob;",i.jsx("br",{}),"Car,Mashina;"]})]}),i.jsxs(yO,{children:[i.jsx(Ep,{onClick:e,children:"Bekor qilish"}),i.jsx(Ep,{primary:!0,onClick:H,children:"Saqlash"})]})]}),x.isOpen&&i.jsx(yy,{onClick:()=>h({isOpen:!1,cardIndex:null,side:null}),style:{zIndex:1100},children:i.jsxs(vO,{onClick:D=>D.stopPropagation(),children:[i.jsxs(vy,{style:{marginBottom:8},children:[i.jsx("h2",{children:"Rasm Qidirish"}),i.jsx(by,{onClick:()=>h({isOpen:!1,cardIndex:null,side:null}),children:i.jsx(nt,{size:20})})]}),i.jsxs(bO,{onSubmit:v,children:[i.jsx(jy,{placeholder:"Rasm qidirish uchun so'z yozing...",value:m,onChange:D=>k(D.target.value),autoFocus:!0}),i.jsx(Ep,{primary:!0,type:"submit",disabled:C||!m.trim(),children:C?i.jsx(Yd,{size:18,className:"spin"}):i.jsx(Fx,{size:18})})]}),i.jsxs(wO,{children:[w.length===0&&!C&&i.jsx("div",{style:{gridColumn:"span 3",textAlign:"center",padding:"40px 0",color:"var(--text-muted-color)"},children:"Qidirish tugmasini bosing"}),w.map((D,U)=>i.jsx(kO,{src:D,alt:"result",onClick:()=>b(D)},U))]})]})})]})},Ty=d.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--background-color);
    animation: slideInFromRight 0.3s ease-out;
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,$y=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,Ry=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;d.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;const SO=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`,CO=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,zO=d.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`;d.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;const EO=d.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 4px;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`,_O=d.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Py=d.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`,My=d.span`
  color: var(--text-muted-color);
  min-width: 60px;
  font-weight: 500;
`,Oy=d.span`
  color: var(--text-color);
  word-break: break-word;
`,_p=d.div`
  font-size: 14px;
  color: var(--text-muted-color);
`,Tp=d.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,Ay=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`,Iy=d.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.5:1};
`,TO=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  gap: 24px;
  box-sizing: border-box;
`,$O=d.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  box-sizing: border-box;
`,RO=d.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  &:hover {
    color: var(--text-color);
  }
`,PO=d.button`
  padding: 12px 24px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
`,MO=d.div`
  display: flex;
  gap: 12px;
  width: 100%;
`,lc=d.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background-color: ${e=>e.type==="fail"?"#e74c3c":e.type==="hard"?"#e67e22":e.type==="good"?"#3498db":e.type==="easy"?"#2ecc71":"gray"};
  &:hover {
    filter: brightness(1.1);
  }
`,OO=({initialDeckId:e,onBack:t})=>{var ee,ae,de,le,te,Z,ne,ze;const{flashcardDecks:r,flashcardsPage:o,flashcardsHasMore:s,fetchFlashcards:a,reviewFlashcard:l,fetchFlashcardDeck:c,joinFlashcardDeck:u,leaveFlashcardDeck:p}=rn(),x=je(J=>J.token),h=je(J=>J.user),[m,k]=f.useState(null),[w,j]=f.useState(null),[C,y]=f.useState(!1),[v,b]=f.useState([]),[g,T]=f.useState(0),[A,B]=f.useState(!1),[z,H]=f.useState(null),[D,U]=f.useState(null),[M,I]=f.useState(!1),P=(h==null?void 0:h.premiumStatus)==="premium",E=P?10:4,R=r.filter(J=>{var pe;return(((pe=J.createdBy)==null?void 0:pe._id)||J.createdBy)===((h==null?void 0:h._id)||(h==null?void 0:h.id))}).length,$=()=>{if(R>=E){P?He.error("Siz maksimal limitga yetgansiz (10/10)."):I(!0);return}y(!0)},F=Le.useRef(!1);f.useEffect(()=>{x&&!F.current&&r.length===0&&(a(1),F.current=!0)},[a,x,r.length]);const L=()=>{s&&a(o+1)};f.useEffect(()=>{(async()=>{if(e&&!m){const pe=await c(e);pe&&j(pe)}})()},[e]);const O=async(J,pe=!1)=>{const Ae=await c(J._id);if(!Ae)return;const Xe=new Date,qe=pe?Ae.cards:Ae.cards.filter(Nt=>new Date(Nt.nextReviewDate)<=Xe);if(qe.length===0){He("Hozircha yodlash kerak bo'lgan so'zlar yo'q! Kutib turing.",{icon:"ℹ️"});return}j(null),k(Ae),b(qe),T(0),B(!1)},S=J=>{const pe=`${window.location.origin}/arena/flashcards/${J}`;navigator.clipboard.writeText(pe),He.success("Lug'at havolasi nusxalandi!")},N=async J=>{if((await u(J)).success&&(U(null),a(),w&&w._id===J)){const Ae=await c(J);j(Ae)}},Q=async J=>{window.confirm("Haqiqatdan ham ushbu lug'atdan chiqmoqchimisiz? Progressingiz o'chib ketadi.")&&(await p(J)).success&&(a(),w&&w._id===J&&j(null))},X=async J=>{const pe=v[g];if(!pe)return;const Ae=pe._id,Xe=m._id;l(Xe,Ae,J).catch(qe=>console.error(qe)),J<3?(b(qe=>[...qe,pe]),T(qe=>qe+1),B(!1)):g+1<v.length?(T(qe=>qe+1),B(!1)):(He.success("Barakalla! Ushbu to'plamni yodlashni tugatdingiz.",{duration:4e3}),k(null),a())};if(m){const J=v[g];return i.jsx(Ty,{children:i.jsxs(TO,{children:[i.jsxs(RO,{onClick:()=>k(null),children:[i.jsx(Dr,{size:20})," Orqaga"]}),i.jsxs(Tp,{children:[m.title," - Qolgan:"," ",v.length-g]}),i.jsx($O,{children:A?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[(J==null?void 0:J.backImage)&&i.jsx("img",{src:J.backImage,alt:"back",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),i.jsx("div",{children:(J==null?void 0:J.back)||"???"})]}):i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[(J==null?void 0:J.frontImage)&&i.jsx("img",{src:J.frontImage,alt:"front",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),i.jsx("div",{children:(J==null?void 0:J.front)||"???"})]})}),A?i.jsxs(MO,{children:[i.jsx(lc,{type:"fail",onClick:()=>X(0),children:"Topolmadim"}),i.jsx(lc,{type:"hard",onClick:()=>X(1),children:"Qiyin"}),i.jsx(lc,{type:"good",onClick:()=>X(2),children:"Biroz qiynaldim"}),i.jsx(lc,{type:"easy",onClick:()=>X(3),children:"Oson"})]}):i.jsxs(PO,{onClick:()=>B(!0),children:[i.jsx(i0,{size:16,style:{marginRight:8,display:"inline"}}),"Javobni ko'rish"]})]})})}return i.jsxs(Ty,{children:[i.jsx(ng,{title:"Flashcards",count:R,onBack:()=>t&&t(),rightContent:i.jsx(pl,{onClick:$,children:i.jsx(Ht,{size:18})})}),i.jsx(yo,{dataLength:r.length,next:L,hasMore:s,loader:i.jsx("h4",{style:{textAlign:"center",color:"var(--text-muted-color)",marginTop:"16px"},children:"Yuklanmoqda..."}),style:{overflow:"visible"},children:i.jsxs(SO,{children:[r.map(J=>{var Ae,Xe,qe;const pe=(((Ae=J.createdBy)==null?void 0:Ae._id)||J.createdBy)===((h==null?void 0:h._id)||(h==null?void 0:h.id));return i.jsxs(CO,{onClick:()=>j(J),style:{cursor:"pointer"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx(zO,{children:J.title}),i.jsxs("div",{style:{display:"flex",gap:"8px"},onClick:Nt=>Nt.stopPropagation(),children:[pe&&i.jsx("button",{onClick:()=>H(J),style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},title:"A'zolar",children:i.jsx(jn,{size:18})}),i.jsx("button",{onClick:()=>S(J._id),style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},title:"Nusxalash",children:i.jsx(Bw,{size:18})}),!pe&&i.jsx("button",{onClick:()=>Q(J._id),style:{background:"none",border:"none",color:"#e74c3c",cursor:"pointer"},title:"Chiqish",children:i.jsx(Bx,{size:18})})]})]}),i.jsxs(_p,{children:["Jami so'zlar: ",((Xe=J.cards)==null?void 0:Xe.length)||0]}),i.jsx(_p,{children:pe?"Siz yaratgan":`Muallif: ${((qe=J.createdBy)==null?void 0:qe.nickname)||"Noma'lum"}`})]},J._id)}),r.length===0&&i.jsx(_p,{children:"Sizda hozircha lug'atlar yo'q."})]})}),w&&i.jsx($y,{onClick:()=>j(null),children:i.jsxs(Ry,{onClick:J=>J.stopPropagation(),children:[i.jsxs(Ay,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[i.jsx(Tp,{children:w.title}),i.jsx("button",{onClick:()=>j(null),style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},children:i.jsx(Dr,{size:20})})]}),i.jsxs("div",{style:{padding:"20px",display:"flex",flexDirection:"column",gap:"20px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[i.jsx("img",{src:((ee=w.createdBy)==null?void 0:ee.avatar)||"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar",style:{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover"}}),i.jsxs("div",{children:[i.jsx("div",{style:{color:"var(--text-color)",fontWeight:"600"},children:((ae=w.createdBy)==null?void 0:ae.nickname)||"Noma'lum"}),i.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:"13px"},children:"Lug'at yaratuvchisi"})]}),!(((de=w.createdBy)==null?void 0:de._id)===((h==null?void 0:h._id)||(h==null?void 0:h.id))||(le=w.members)!=null&&le.some(J=>{var pe;return(((pe=J.userId)==null?void 0:pe._id)||J.userId)===((h==null?void 0:h._id)||(h==null?void 0:h.id))}))&&i.jsx("button",{onClick:()=>N(w._id),style:{marginLeft:"auto",background:"var(--primary-color)",color:"white",border:"none",padding:"8px",borderRadius:"8px",cursor:"pointer"},title:"Yuklab olish (Qo'shilish)",children:i.jsx(F3,{size:20})})]}),i.jsx("div",{style:{display:"flex",gap:"12px"},children:(te=w.cards)!=null&&te.some(J=>new Date(J.nextReviewDate)<=new Date)?i.jsxs(Iy,{style:{flex:1},onClick:()=>O(w),children:[i.jsx(e6,{size:18})," O'qishni boshlash"]}):i.jsxs(Iy,{style:{flex:1,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},onClick:()=>O(w,!0),children:[i.jsx(i0,{size:18})," Yana mashiq qilish"]})}),i.jsxs("div",{children:[i.jsxs("div",{style:{color:"var(--text-color)",fontWeight:"600",marginBottom:"8px",fontSize:"15px"},children:["To'plamdagi so'zlar (",((Z=w.cards)==null?void 0:Z.length)||0,")"]}),i.jsx(EO,{children:(ne=w.cards)==null?void 0:ne.map((J,pe)=>i.jsxs(_O,{children:[i.jsxs(Py,{style:{alignItems:"center"},children:[i.jsx(My,{children:"Oldi:"}),i.jsxs(Oy,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[J.frontImage&&i.jsx("img",{src:J.frontImage,alt:"f",style:{width:30,height:30,borderRadius:4,objectFit:"cover"}}),J.front]})]}),i.jsxs(Py,{style:{alignItems:"center"},children:[i.jsx(My,{children:"Orqa:"}),i.jsxs(Oy,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[J.backImage&&i.jsx("img",{src:J.backImage,alt:"b",style:{width:30,height:30,borderRadius:4,objectFit:"cover"}}),J.back]})]})]},J._id||pe))})]})]})]})}),z&&i.jsx($y,{onClick:()=>H(null),children:i.jsxs(Ry,{onClick:J=>J.stopPropagation(),children:[i.jsxs(Ay,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[i.jsx(Tp,{children:"A'zolar ro'yxati"}),i.jsx("button",{onClick:()=>H(null),style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},children:i.jsx(Dr,{size:20})})]}),i.jsx("div",{style:{padding:"20px",maxHeight:"60vh",overflowY:"auto"},children:((ze=z.members)==null?void 0:ze.length)>0?z.members.map((J,pe)=>{var Ae,Xe;return i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid var(--border-color)"},children:[i.jsx("img",{src:((Ae=J.userId)==null?void 0:Ae.avatar)||"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar",style:{width:"32px",height:"32px",borderRadius:"50%",objectFit:"cover"}}),i.jsx("span",{style:{color:"var(--text-color)"},children:((Xe=J.userId)==null?void 0:Xe.nickname)||"Noma'lum"}),i.jsxs("span",{style:{marginLeft:"auto",fontSize:"12px",color:"var(--text-muted-color)"},children:["Joined: ",new Date(J.joinedAt).toLocaleDateString()]})]},pe)}):i.jsx("p",{style:{textAlign:"center",color:"var(--text-muted-color)"},children:"Hozircha hech kim qo'shilmagan."})})]})}),C&&i.jsx(jO,{onClose:()=>y(!1)}),i.jsx(rg,{isOpen:M,onClose:()=>I(!1),onUpgrade:()=>{I(!1),window.location.href="/premium"}})]})};d.div`
  margin-top: 40px;
  background: var(--surface-secondary-color, #2f3136);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;d.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--text-color);
  font-weight: 700;
  letter-spacing: -0.02em;
`;d.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;d.div`
  background: var(--surface-color, #36393f);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
`;d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
`;d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.color||"var(--primary-color)"};
  color: white;
`;d.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
`;d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted-color);
`;d.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${e=>e.isWinner?"linear-gradient(90deg, rgba(46, 204, 113, 0.15), transparent)":"transparent"};
  border-left: ${e=>e.isWinner?"4px solid #2ecc71":"4px solid transparent"};
`;d.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;d.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${e=>e.rank===1?"#f1c40f":e.rank===2?"#bdc3c7":e.rank===3?"#e67e22":"var(--border-color)"};
  color: ${e=>e.rank<=3?"#000":"var(--text-muted-color)"};
`;d.span`
  font-weight: ${e=>e.isWinner?"600":"500"};
  color: ${e=>e.isWinner?"#2ecc71":"var(--text-color)"};
`;d.div`
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: ${e=>e.isWinner?"#2ecc71":"var(--text-color)"};
`;d.div`
  text-align: center;
  padding: 60px 40px;
  color: var(--text-muted-color);
  background: var(--surface-color);
  border: 2px dashed var(--border-color);
  border-radius: 16px;

  svg {
    margin-bottom: 20px;
    opacity: 0.3;
  }

  h3 {
    color: var(--text-color);
    margin-bottom: 8px;
  }
`;const AO=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(4px);
`,IO=d.div`
  background: var(--secondary-color);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
  animation: slideBottom 0.3s ease-out;

  @keyframes slideBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`,LO=d.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text-color);
  }
`,DO=d.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`,BO=d.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`,FO=d.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s;

  &:hover {
    border-color: var(--primary-color);
  }
`,NO=d.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,UO=d.div`
  font-weight: 700;
  font-size: 16px;
  color: var(--text-color);
`,qO=d.div`
  font-size: 12px;
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  gap: 4px;
`,HO=d.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-muted-color);
`,Ly=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,VO=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`,YO=d.div`
  background: var(--background-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: var(--primary-color);
    font-weight: 600;
  }
`,WO=d.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: var(--primary-color);
`,KO=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted-color);
  gap: 12px;
  text-align: center;
`,QO=({isOpen:e,onClose:t})=>{const{fetchBattleHistory:r}=rn(),[o,s]=f.useState([]),[a,l]=f.useState(1),[c,u]=f.useState(!0),[p,x]=f.useState(!1),h=f.useRef(),m=f.useCallback(async(w=!1)=>{if(p||!c&&!w)return;x(!0);const j=w?1:a;try{const C=await r({page:j,limit:15});C&&C.data&&(s(w?C.data:y=>[...y,...C.data]),u(C.page<C.totalPages),l(j+1))}catch(C){console.error("Failed to load history:",C)}finally{x(!1)}},[a,c,p,r]);f.useEffect(()=>{e?m(!0):(s([]),l(1),u(!0))},[e]);const k=f.useCallback(w=>{p||(h.current&&h.current.disconnect(),h.current=new IntersectionObserver(j=>{j[0].isIntersecting&&c&&m()}),w&&h.current.observe(w))},[p,c,m]);return e?i.jsx(AO,{onClick:t,children:i.jsxs(IO,{onClick:w=>w.stopPropagation(),children:[i.jsxs(LO,{children:[i.jsxs("h2",{children:[i.jsx(ch,{size:22})," Bellashuvlar Tarixi"]}),i.jsx(DO,{onClick:t,children:i.jsx(nt,{size:20})})]}),i.jsxs(BO,{children:[o.length>0?o.map((w,j)=>{var C;return i.jsxs(FO,{ref:j===o.length-1?k:null,children:[i.jsxs(NO,{children:[i.jsx(UO,{children:((C=w.testId)==null?void 0:C.title)||"O'chirilgan test"}),i.jsxs(qO,{children:[i.jsx(Aw,{size:12}),pt(w.createdAt).format("DD.MM.YYYY HH:mm")]})]}),i.jsxs(HO,{children:[i.jsxs(Ly,{children:[i.jsx(Ww,{size:14})," ",w.mode==="solo"?"Yakkalik":"Jamoaviy"]}),i.jsxs(Ly,{children:[i.jsx(jn,{size:14})," ",w.participants.length," ishtirokchi"]})]}),i.jsx(VO,{children:w.participants.map((y,v)=>i.jsxs(YO,{children:[i.jsx(mn,{size:12})," ",y.nickname," ",i.jsx("span",{children:y.score})]},v))})]},w._id)}):p?null:i.jsxs(KO,{children:[i.jsx(ch,{size:48,opacity:.3}),i.jsx("p",{children:"Hozircha bellashuvlar tarixi mavjud emas."})]}),p&&i.jsx(WO,{children:i.jsx(Yd,{size:24,className:"animate-spin"})})]})]})}):null},GO=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(4px);
`,XO=d.div`
  background: var(--secondary-color);
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
  animation: scaleIn 0.2s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`,JO=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`,ZO=d.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`,$p=d.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Rp=d.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,eA=d.input`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,tA=d.select`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,rA=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Dy=d.div`
  background: ${e=>e.active?"var(--hover-color)":"var(--tertiary-color)"};
  border: 1px solid
    ${e=>e.active?"var(--primary-color)":"var(--border-color)"};
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  text-align: center;

  svg {
    color: ${e=>e.active?"var(--primary-color)":"var(--text-muted-color)"};
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${e=>e.active?"var(--text-color)":"var(--text-muted-color)"};
  }

  &:hover {
    border-color: var(--primary-color);
  }
`,nA=d.div`
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted-color);
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    color: #3498db;
  }
`,oA=d.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,iA=({isOpen:e,onClose:t})=>{const{myTests:r,createBattle:o}=rn(),[s,a]=f.useState(""),[l,c]=f.useState(""),[u,p]=f.useState("public");if(!e)return null;const x=()=>{!s||!l.trim()||(o(s,l,"solo",u),t(),c(""),a(""))};return i.jsx(GO,{onClick:t,children:i.jsxs(XO,{onClick:h=>h.stopPropagation(),children:[i.jsxs(JO,{children:[i.jsx("h2",{children:"Yangi Bellashuv Xonasi"}),i.jsx(ZO,{onClick:t,children:i.jsx(nt,{size:20})})]}),i.jsxs($p,{children:[i.jsx(Rp,{children:"Bellashuv nomi"}),i.jsx(eA,{placeholder:"Masalan: Juma kungi bellashuv",value:l,onChange:h=>c(h.target.value)})]}),i.jsxs($p,{children:[i.jsx(Rp,{children:"Testni tanlang"}),i.jsxs(tA,{value:s,onChange:h=>a(h.target.value),children:[i.jsx("option",{value:"",children:"--- Test tanlang ---"}),r.map(h=>i.jsx("option",{value:h._id,children:h.title},h._id))]})]}),i.jsxs($p,{children:[i.jsx(Rp,{children:"Maxfiylik sozlamasi"}),i.jsxs(rA,{children:[i.jsxs(Dy,{active:u==="public",onClick:()=>p("public"),children:[i.jsx(Vd,{size:24}),i.jsx("span",{children:"Publik"})]}),i.jsxs(Dy,{active:u==="unlisted",onClick:()=>p("unlisted"),children:[i.jsx(Iw,{size:24}),i.jsx("span",{children:"Maxfiy"})]})]})]}),i.jsxs(nA,{children:[i.jsx(H3,{size:16}),u==="public"?"Ushbu xona barcha uchun ochiq va 'Aktiv Bellashuvlar' ro'yxatida ko'rinadi.":"Ushbu xona ro'yxatda ko'rinmaydi. Faqat xona ID sini bilganlargina qo'shila oladi."]}),i.jsxs(oA,{onClick:x,disabled:!s||!l.trim(),children:[i.jsx(Pc,{size:18,fill:"white"})," Xonani Yaratish"]})]})})},sA=d.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--background-color);
    animation: slideInFromRight 0.3s ease-out;
    padding: 20px;
    overflow-y: auto;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,By=d.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,Fy=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`,aA=d.div`
  display: flex;
  gap: 8px;
  width: 100%;
`,Ny=d.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`,qs=d.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${e=>e.bgColor||"var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`,Pp=d.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,cc=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`,dc=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: var(--text-color);
`,Mp=d.span`
  background-color: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
`,lA=d.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`,cA=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,dA=d.button`
  padding: 16px;
  background-color: var(--background-color);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-color);
  }

  ${e=>e.selected&&`
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  `}
`,uA=({initialRoomId:e,onBack:t})=>{const{tests:r,activeBattle:o,joinBattle:s,startBattle:a,submitAnswer:l,nextQuestion:c,endBattle:u,leaveBattle:p,guestName:x,setGuestSession:h,activeBattles:m,fetchActiveBattles:k,socketRef:w,fetchTests:j}=rn();Le.useEffect(()=>{j()},[j]);const[C,y]=f.useState(""),[v,b]=f.useState(""),[g,T]=f.useState(!1),[A,B]=f.useState(!1),z=je(R=>R.user),H=je(R=>R.token);Le.useEffect(()=>{e&&e!=="0"&&!o&&s(e)},[e,o,s]),Le.useEffect(()=>{if(!o){k();const R=setInterval(k,1e4);return()=>clearInterval(R)}},[o,k]);const D=o?r.find(R=>R._id===o.testId):null,U=o&&z&&String(o.hostId)===String(z._id),M=()=>{C.trim()&&s(C.trim())},I=()=>{const R=`${window.location.origin}/arena/battle/${o.roomId}`;navigator.clipboard.writeText(R),He.success("Havola nusxalandi!")},P=()=>{if(!H&&!x)return{headerProps:{title:"Ismingizni kiriting",onBack:t},content:i.jsxs(Fy,{children:[i.jsx("p",{style:{color:"var(--text-muted-color)",margin:0},children:"Bellashuvda qatnashish uchun ismingizni kiriting."}),i.jsx(Ny,{placeholder:"Ismingiz...",value:v,onChange:R=>b(R.target.value)}),i.jsx(qs,{onClick:()=>v.trim()&&h(v.trim()),children:"Kirish"})]})};if(!o)return{headerProps:{title:"Bellashuvlar",onBack:t,rightContent:i.jsx("div",{style:{display:"flex",gap:"8px"},children:i.jsx("button",{onClick:()=>T(!0),style:{background:"none",border:"none",color:"var(--text-color)",cursor:"pointer",padding:"8px",display:"flex"},children:i.jsx(ch,{size:20})})})},content:i.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",width:"100%"},children:[i.jsxs(Fy,{children:[i.jsx(By,{children:"Xona ID si orqali qo'shilish"}),i.jsxs(aA,{children:[i.jsx(Ny,{placeholder:"Masalan: battle_1234_567",value:C,onChange:R=>y(R.target.value)}),i.jsx(qs,{onClick:M,style:{width:"auto"},children:i.jsx(Ht,{size:20})})]})]}),i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[i.jsxs(By,{style:{display:"flex",alignItems:"center",gap:8},children:[i.jsx(a6,{size:16,color:"var(--primary-color)"})," Aktiv Bellashuvlar (",(m==null?void 0:m.length)||0,")"]}),i.jsx(pl,{onClick:()=>B(!0),children:i.jsx(Ht,{size:16})})]}),m&&m.length>0?i.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:m.map(R=>i.jsxs(cc,{children:[i.jsx(dc,{style:{flexDirection:"column",alignItems:"flex-start",gap:"2px"},children:i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",fontWeight:"600",fontSize:"14px"},children:[i.jsx(xd,{size:14,color:"var(--text-color)"}),R.roomName||"Noma'lum Bellashuv"]})}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[i.jsxs("span",{style:{fontSize:"12px",display:"flex",alignItems:"center",color:"var(--text-muted-color)"},children:[i.jsx(mn,{size:12,style:{marginRight:"4px"}}),i.jsx("span",{children:R.participantsCount})]}),i.jsx(qs,{style:{width:"auto",padding:"6px 12px",fontSize:"13px"},onClick:()=>{console.log("Joining battle:",R.roomId),s(R.roomId)},children:"Kirish"})]})]},R.roomId))}):i.jsxs("div",{style:{padding:"40px",textAlign:"center",border:"1px dashed var(--border-color)",borderRadius:"12px",color:"var(--text-muted-color)",fontSize:"14px"},children:["Hozircha ochiq bellashuvlar yo'q. ",i.jsx("br",{})," O'zingiz yangi xona yarating!"]})]})]})};if(o.status==="waiting")return{headerProps:{title:"Kutish Zali",rightContent:i.jsx("button",{onClick:()=>p(o.roomId),style:{background:"#e74c3c",border:"none",color:"white",cursor:"pointer",padding:"8px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:i.jsx(Bx,{size:18})})},content:i.jsxs("div",{style:{maxWidth:"450px",margin:"0 auto",width:"100%"},children:[i.jsxs("div",{style:{background:"#333",padding:"12px",fontSize:"13px",borderRadius:"8px",marginBottom:"20px",border:"1px solid var(--border-color)"},children:[i.jsxs("div",{style:{marginBottom:4},children:[i.jsx(mn,{size:12}),":"," ",i.jsx("b",{children:(z==null?void 0:z.nickname)||(z==null?void 0:z.username)||x||"Mehmon"})]}),i.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted-color)",display:"flex",alignItems:"center",gap:4},children:[i.jsxs("span",{children:[" Xona ID: ",o.roomId," "]}),i.jsx("button",{onClick:I,style:{marginLeft:12,background:"none",border:"none",color:"var(--primary-color)",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4},children:i.jsx(Dx,{size:16})})]})]}),i.jsx(Pp,{children:o.participants.map(R=>i.jsx(cc,{children:i.jsxs(dc,{children:[i.jsx(mn,{size:12})," ",R.nickname," ",R.userId===o.hostId&&"(Host)"]})},R.userId))}),U&&i.jsx(qs,{onClick:()=>a(o.roomId),style:{marginTop:24,fontSize:18,padding:16},children:"Musobaqani Boshlash! 🚀"})]})};if(o.status==="playing"){if(!D)return{headerProps:{title:"Yuklanmoqda..."},content:i.jsx("div",{children:"Testni yuklab bo'lmadi..."})};const R=D.questions[o.currentQuestionIndex],$=o.participants.find(F=>{var L;return F.socketId===((L=w.current)==null?void 0:L.id)});return R?{headerProps:{title:`Savol ${o.currentQuestionIndex+1} / ${D.questions.length}`,rightContent:i.jsxs(Mp,{children:["Sizning ballingiz: ",($==null?void 0:$.score)||0]})},content:i.jsxs(i.Fragment,{children:[i.jsxs(lA,{children:[i.jsx("h2",{style:{color:"var(--text-color)"},children:R.questionText}),i.jsx(cA,{children:R.options.map((F,L)=>i.jsx(dA,{selected:($==null?void 0:$.lastAnswerIndex)===L,disabled:$==null?void 0:$.hasAnsweredCurrent,onClick:()=>{l(o.roomId,L)},children:F},L))})]}),i.jsxs("div",{style:{marginTop:32},children:[i.jsx("h3",{style:{color:"var(--text-color)"},children:"Jonli Natijalar"}),i.jsx(Pp,{children:o.participants.map(F=>i.jsxs(cc,{children:[i.jsxs(dc,{children:[F.hasAnsweredCurrent?i.jsx(Jo,{color:"#2ecc71",size:16}):i.jsx(uo,{color:"#3498db",size:16}),F.nickname]}),i.jsxs(Mp,{children:[F.score," ball"]})]},F.userId))})]})]})}:(U&&u(o.roomId),{headerProps:{title:"Tugadi"},content:i.jsx("div",{children:"Barcha savollar tugadi... Natijalar hisoblanmoqda..."})})}return o.status==="finished"?{headerProps:{title:"🏆 Yakuniy Natijalar"},content:i.jsxs(i.Fragment,{children:[i.jsx(Pp,{children:o.participants.map((R,$)=>i.jsxs(cc,{style:{padding:24},children:[i.jsxs(dc,{style:{fontSize:20},children:[$===0?"🥇":$===1?"🥈":$===2?"🥉":`${$+1}.`,R.nickname]}),i.jsxs(Mp,{style:{fontSize:20},children:[R.score," ball"]})]},R.userId))}),i.jsx(qs,{onClick:()=>p(),style:{marginTop:32},children:"Bellashuvni tark etish"})]})}:{headerProps:{title:"Bilimlar Bellashuvi"},content:null}},{headerProps:E,content:_}=P();return i.jsxs(sA,{children:[i.jsx(ng,{...E}),_,i.jsx(QO,{isOpen:g,onClose:()=>T(!1)}),i.jsx(iA,{isOpen:A,onClose:()=>B(!1)})]})},pA=d.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-color);
  overflow-y: auto;
`,fA=d.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`,hA=({activeTab:e="tests",initialId:t,onBack:r})=>{const{fetchMyTests:o,fetchFlashcards:s}=rn();return Le.useEffect(()=>{},[]),i.jsx(pA,{children:i.jsxs(fA,{children:[e==="tests"&&i.jsx(aO,{initialTestId:t,onBack:r}),e==="flashcards"&&i.jsx(OO,{initialDeckId:t,onBack:r}),e==="battles"&&i.jsx(uA,{initialRoomId:t,onBack:r}),!e&&i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"var(--text-muted-color)",opacity:.8,textAlign:"center",marginTop:"100px"},children:[i.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"🏟️"}),i.jsx("h2",{style:{color:"var(--text-color)",marginBottom:"8px"},children:"Bilimlar maydoniga xush kelibsiz!"}),i.jsx("p",{style:{maxWidth:"400px"},children:"Chap tomondagi menyudan o'zingizga kerakli bo'limni tanlang: testlar ishlash, lug'at yodlash yoki do'stlar bilan bellashuv."})]})]})})},ig=Ft`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`,xA=d.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media (min-width: 600px) {
    align-items: center;
  }
`,gA=d.div`
  background: var(--secondary-color);
  width: 100%;
  max-width: 520px;
  height: 85vh;
  border-radius: 16px 16px 0 0;
  @media (min-width: 600px) {
    height: auto;
    max-height: 80vh;
    border-radius: 16px;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 40px rgba(0, 0, 0, 0.4);
  animation: ${ig} 0.25s ease;
`,mA=d.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,yA=d.span`
  font-weight: 700;
  font-size: 17px;
  color: var(--text-color);
`,vA=d.button`
  background: var(--hover-color);
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover {
    color: var(--text-color);
    background: var(--input-color);
  }
`,bA=d.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`,wA=d.div`
  display: flex;
  gap: 12px;
  animation: ${ig} 0.2s ease;
`,Uy=["#5865f2","#3ba55d","#faa61a","#ed4245","#9b59b6","#00b0f4"],qy=e=>Uy[(e||"A").charCodeAt(0)%Uy.length],Hy=d.div`
  width: ${e=>e.size||36}px;
  height: ${e=>e.size||36}px;
  min-width: ${e=>e.size||36}px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${e=>e.color||"#5865f2"}, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.size?Math.floor(e.size*.38):13}px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Vy=d.div`
  flex: 1;
  min-width: 0;
`,kA=d.div`
  background: var(--background-color);
  padding: 10px 14px;
  border-radius: 4px 14px 14px 14px;
`,Yy=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Wy=d.span`
  font-weight: 700;
  font-size: 13px;
  color: var(--text-color);
`,Ky=d.span`
  font-size: 11px;
  color: var(--text-muted-color);
`,Qy=d.div`
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  word-break: break-word;
`,Gy=d.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
  padding-left: 2px;
`,Xy=d.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 0;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    color: var(--primary-color);
  }
`,jA=d.div`
  margin-top: 10px;
  padding-left: 4px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,SA=d.div`
  display: flex;
  gap: 10px;
  animation: ${ig} 0.2s ease;
`,CA=d.div`
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: 4px 12px 12px 12px;
`,zA=d.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
  margin-right: 4px;
`,EA=d.div`
  border-top: 1px solid var(--border-color);
  padding: 12px 20px;
`,_A=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: var(--hover-color);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-muted-color);
  span {
    color: var(--primary-color);
    font-weight: 600;
  }
`,TA=d.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;
  display: flex;
  &:hover {
    color: var(--text-color);
  }
`,$A=d.form`
  display: flex;
  gap: 10px;
  align-items: center;
`,RA=d.input`
  flex: 1;
  background: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 10px 18px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: var(--primary-color);
  }
  &::placeholder {
    color: var(--text-muted-color);
  }
`,PA=d.button`
  background: var(--primary-color);
  color: white;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  opacity: ${e=>e.disabled?.4:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};
  &:hover {
    background: #4752c4;
    transform: scale(1.05);
  }
`,Jy=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  text-align: center;
`,Zy=e=>{const t=Date.now()-new Date(e).getTime(),r=Math.floor(t/6e4);if(r<1)return"Hozir";if(r<60)return`${r}d`;const o=Math.floor(r/60);if(o<24)return`${o}s`;const s=Math.floor(o/24);return s<7?`${s}k`:new Date(e).toLocaleDateString("uz-UZ",{day:"numeric",month:"short"})},MA=({post:e,onClose:t})=>{const{getComments:r,addComment:o,addReply:s}=og(),a=je(D=>D.user),[l,c]=f.useState([]),[u,p]=f.useState(!0),[x,h]=f.useState(""),[m,k]=f.useState(!1),[w,j]=f.useState(1),[C,y]=f.useState(!0),[v,b]=f.useState(null),g=f.useRef(null),T=async(D=1)=>{D===1&&p(!0);try{const U=await r(e._id,D,10),M=(U==null?void 0:U.data)||[],I=(U==null?void 0:U.totalPages)||1;c(P=>D===1?M:[...P,...M]),j(D),y(D<I)}catch(U){console.error(U)}finally{D===1&&p(!1)}};f.useEffect(()=>{e&&T(1)},[e,r]);const A=()=>T(w+1),B=(D,U)=>{b({commentId:D,nickname:U}),setTimeout(()=>{var M;return(M=g.current)==null?void 0:M.focus()},100)},z=()=>b(null),H=async D=>{if(D.preventDefault(),!(!x.trim()||m)){if(k(!0),v){await s(e._id,v.commentId,x.trim(),v.nickname);const U={_id:Date.now().toString(),user:{_id:a._id,username:a.username,nickname:a.nickname,avatar:a.avatar},content:x.trim(),replyToUser:v.nickname,createdAt:new Date().toISOString()};c(M=>M.map(I=>I._id===v.commentId?{...I,replies:[...I.replies||[],U]}:I)),b(null)}else{await o(e._id,x.trim());const U={_id:Date.now().toString(),user:{_id:a._id,username:a.username,nickname:a.nickname,avatar:a.avatar},content:x.trim(),createdAt:new Date().toISOString(),replies:[]};c(M=>[...M,U])}h(""),k(!1)}};return e?i.jsx(xA,{onClick:t,children:i.jsxs(gA,{onClick:D=>D.stopPropagation(),children:[i.jsxs(mA,{children:[i.jsx(yA,{children:"Izohlar"}),i.jsx(vA,{onClick:t,children:i.jsx(nt,{size:18})})]}),i.jsx(bA,{id:"scrollableComments",children:i.jsx(yo,{dataLength:l.length,next:A,hasMore:C,loader:i.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)",fontSize:"14px"},children:"Yuklanmoqda..."}),endMessage:l.length>0?i.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)",fontSize:"13px"},children:"Barcha izohlar ko'rsatildi."}):null,scrollableTarget:"scrollableComments",style:{display:"flex",flexDirection:"column",gap:"20px",overflow:"visible"},children:u&&l.length===0?i.jsx(Jy,{children:"Yuklanmoqda..."}):l.length===0?i.jsx(Jy,{children:"Hali izohlar yo'q. Birinchi bo'lib yozing! 💬"}):l.map(D=>{const U=D.user||{},M=U.nickname||U.username||"Foydalanuvchi";return i.jsx("div",{children:i.jsxs(wA,{children:[i.jsx(Hy,{color:qy(M),size:36,children:U.avatar?i.jsx("img",{src:U.avatar,alt:M}):M.charAt(0).toUpperCase()}),i.jsxs(Vy,{children:[i.jsxs(kA,{children:[i.jsxs(Yy,{children:[i.jsx(Wy,{children:M}),i.jsx(Ky,{children:Zy(D.createdAt)})]}),i.jsx(Qy,{children:D.content})]}),i.jsx(Gy,{children:i.jsxs(Xy,{onClick:()=>B(D._id,M),children:[i.jsx(r0,{size:12})," Javob berish"]})}),D.replies&&D.replies.length>0&&i.jsx(jA,{children:D.replies.map(I=>{const P=I.user||{},E=P.nickname||P.username||"Foydalanuvchi";return i.jsxs(SA,{children:[i.jsx(Hy,{color:qy(E),size:28,children:P.avatar?i.jsx("img",{src:P.avatar,alt:E}):E.charAt(0).toUpperCase()}),i.jsxs(Vy,{children:[i.jsxs(CA,{children:[i.jsxs(Yy,{children:[i.jsx(Wy,{children:E}),i.jsx(Ky,{children:Zy(I.createdAt)})]}),i.jsxs(Qy,{children:[I.replyToUser&&i.jsxs(zA,{children:["@",I.replyToUser]}),I.content]})]}),i.jsx(Gy,{children:i.jsxs(Xy,{onClick:()=>B(D._id,E),children:[i.jsx(r0,{size:12})," Javob berish"]})})]})]},I._id)})})]})]})},D._id)})})}),i.jsxs(EA,{children:[v&&i.jsxs(_A,{children:[i.jsxs("div",{children:["Javob: ",i.jsxs("span",{children:["@",v.nickname]})]}),i.jsx(TA,{onClick:z,children:i.jsx(nt,{size:14})})]}),i.jsxs($A,{onSubmit:H,children:[i.jsx(RA,{ref:g,placeholder:v?`@${v.nickname} ga javob...`:"Izoh yozing...",value:x,onChange:D=>h(D.target.value)}),i.jsx(PA,{type:"submit",disabled:!x.trim()||m,children:i.jsx(Nx,{size:16})})]})]})]})}):null},OA=Ft`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`,AA=d.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
`,IA=d.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 0;
  }
`,LA=d.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`,DA=d.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 20;
`,BA=d.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`,FA=d.div`
  padding: 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    font-weight: 800;
    color: var(--text-color);
    margin: 0;
  }
`;d.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--primary-color);
  color: white;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.45);
  }
`;const NA=d.div`
  display: flex;
  margin-top: 12px;
`,ev=d.button`
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 3px solid
    ${e=>e.active?"var(--primary-color)":"transparent"};
  color: ${e=>e.active?"var(--text-color)":"var(--text-muted-color)"};
  font-size: 15px;
  font-weight: ${e=>e.active?"700":"500"};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`,UA=d.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px;
  border-radius: 16px;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
`,qA=d.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,HA=d.span`
  font-size: 15px;
  color: var(--text-muted-color);
  flex: 1;
  text-align: left;
`,VA=d.div`
  padding: 16px 10px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
  border-radius: 16px;
  animation: ${OA} 0.3s ease both;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
`,YA=d.div`
  flex-shrink: 0;
`,tv=["#5865f2","#3ba55d","#faa61a","#ed4245","#9b59b6","#00b0f4"],WA=e=>tv[e.charCodeAt(0)%tv.length],KA=d.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${e=>e.color||"#5865f2"}, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,QA=d.div`
  flex: 1;
  min-width: 0;
`,GA=d.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`,XA=d.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`,JA=d.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,ZA=d.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,eI=d.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,tI=d.div`
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-color);
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 10px;
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
`,rI=d.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,Op=d.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${e=>e.active?e.activeColor||"#ed4245":"var(--text-muted-color)"};
  font-size: 13px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover {
    color: ${e=>e.activeColor||"var(--text-secondary-color)"};
    transform: scale(1.12);
  }
`,nI=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 15px;
  text-align: center;
`,oI=d.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  margin-bottom: 4px;
`,iI=e=>{if(!e)return"";const t=[];let r=0;const o=/\*\*(.+?)\*\*|_(.+?)_/g;let s=0,a;for(;(a=o.exec(e))!==null;)a.index>s&&t.push(i.jsx("span",{children:e.slice(s,a.index)},r++)),a[1]!==void 0?t.push(i.jsx("strong",{children:a[1]},r++)):t.push(i.jsx("em",{children:a[2]},r++)),s=a.index+a[0].length;return s<e.length&&t.push(i.jsx("span",{children:e.slice(s)},r++)),t.length?t:e},sI=e=>{const r=Date.now()-new Date(e).getTime(),o=Math.floor(r/6e4);if(o<1)return"Hozir";if(o<60)return`${o} daqiqa`;const s=Math.floor(o/60);return s<24?`${s} soat`:pt(e).format("DD MMM YYYY")},aI=()=>{const e=je(M=>M.user),t=pr(),{forYouPosts:r,forYouPage:o,forYouHasMore:s,followingPosts:a,followingPage:l,followingHasMore:c,loading:u,fetchFeed:p,createPost:x,likePost:h,viewPost:m}=og(),[k,w]=f.useState("foryou"),[j,C]=f.useState(!1),[y,v]=f.useState(null),b=k==="foryou"?r:a,g=k==="foryou"?s:c,T=k==="foryou"?o:l,A=()=>{p(k,T+1)};f.useEffect(()=>{(k==="foryou"&&r.length===0||k==="following"&&a.length===0)&&p(k,1)},[k,p,r.length,a.length]);const B=f.useRef(new Set);f.useEffect(()=>{const M=b.filter(I=>I._id&&!B.current.has(I._id));if(M.length>0){const I=setTimeout(()=>{M.forEach(P=>{B.current.has(P._id)||(B.current.add(P._id),m(P._id))})},500);return()=>clearTimeout(I)}},[b,m]);const z=(e==null?void 0:e.nickname)||(e==null?void 0:e.username)||"Siz",H=z.charAt(0).toUpperCase(),D=async M=>{await x(M),k!=="foryou"&&w("foryou")},U=M=>{const I=typeof M=="string"?M:M==null?void 0:M._id,P=typeof M=="object"?M==null?void 0:M.jammId:null,E=(e==null?void 0:e._id)||(e==null?void 0:e.id);t(I===E?"/profile":`/profile/${P||I}`)};return i.jsxs(AA,{children:[i.jsx(DA,{children:i.jsxs(BA,{children:[i.jsxs(FA,{children:[i.jsx("h1",{children:"Gurunglar"}),i.jsx(pl,{onClick:()=>C(!0),children:i.jsx(Ht,{size:14})})]}),i.jsxs(NA,{children:[i.jsx(ev,{active:k==="foryou",onClick:()=>w("foryou"),children:"Siz uchun"}),i.jsx(ev,{active:k==="following",onClick:()=>w("following"),children:"Obunachidan"})]})]})}),i.jsx(IA,{id:"scrollableFeed",children:i.jsx(LA,{children:i.jsxs(yo,{dataLength:b.length,next:A,hasMore:g,loader:i.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)"},children:"Yuklanmoqda..."}),endMessage:b.length>0?i.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)",fontSize:"13px"},children:"Barcha xabarlar ko'rsatildi."}):null,style:{display:"flex",flexDirection:"column",overflow:"visible"},scrollableTarget:"scrollableFeed",children:[i.jsxs(UA,{onClick:()=>C(!0),children:[i.jsx(qA,{children:e!=null&&e.avatar?i.jsx("img",{src:e.avatar,alt:z}):H}),i.jsx(HA,{children:"Fikringizni baham ko'ring…"})]}),u&&b.length===0?i.jsx("div",{style:{padding:"16px 0",width:"100%"},children:[...Array(3)].map((M,I)=>i.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",width:"100%"},children:[i.jsx(Ya,{size:"44px"}),i.jsxs("div",{style:{flex:1},children:[i.jsx(ft,{height:"15px",width:"120px",mb:"12px"}),i.jsx(ft,{height:"14px",width:"90%",mb:"8px"}),i.jsx(ft,{height:"14px",width:"70%",mb:"8px"}),i.jsx(ft,{height:"14px",width:"40%",mb:"16px"}),i.jsxs("div",{style:{display:"flex",gap:"24px"},children:[i.jsx(ft,{height:"16px",width:"40px",mb:"0"}),i.jsx(ft,{height:"16px",width:"40px",mb:"0"}),i.jsx(ft,{height:"16px",width:"40px",mb:"0"})]})]})]},I))}):b.length===0?i.jsxs(nI,{children:[i.jsx(oI,{children:k==="following"?i.jsx(jn,{size:28,color:"var(--text-muted-color)"}):i.jsx(Lw,{size:28,color:"var(--text-muted-color)"})}),k==="following"?"Obuna bo'lgan foydalanuvchilar gurunglarini ko'rasiz":"Hali gurunglar yo'q. Birinchi bo'ling!"]}):b.map(M=>{const I=M.author||{},P=I.nickname||I.username||"Foydalanuvchi",E=I.username||"user";return i.jsxs(VA,{children:[i.jsx(YA,{children:i.jsx(KA,{color:WA(P),onClick:()=>U(I._id),children:I.avatar?i.jsx("img",{src:I.avatar,alt:P}):P.charAt(0).toUpperCase()})}),i.jsxs(QA,{children:[i.jsxs(GA,{children:[i.jsx(XA,{onClick:()=>U(I._id),children:P}),i.jsxs(JA,{children:["@",E]}),i.jsx(ZA,{children:"·"}),i.jsx(eI,{children:sI(M.createdAt)})]}),i.jsx(tI,{children:iI(M.content)}),i.jsxs(rI,{children:[i.jsxs(Op,{active:M.liked,activeColor:"#ed4245",onClick:_=>{_.stopPropagation(),h(M._id)},children:[i.jsx(Dw,{size:16,fill:M.liked?"#ed4245":"none"}),M.likes]}),i.jsxs(Op,{activeColor:"#5865f2",onClick:_=>{_.stopPropagation(),v(M)},children:[i.jsx(Nw,{size:16}),M.comments]}),i.jsxs(Op,{activeColor:"var(--text-secondary-color)",children:[i.jsx(Ha,{size:16}),M.views]})]})]})]},M._id)})]})})}),i.jsx(gj,{isOpen:j,onClose:()=>C(!1),onSubmit:D,currentUser:e}),y&&i.jsx(MA,{post:y,onClose:()=>v(null)})]})},lI=d.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`,cI=d.div`
  background-color: #36393f;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 95%;
    max-width: 95%;
    padding: 16px;
    margin: 0 16px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    padding: 12px;
    margin: 0;
    border-radius: 8px;
  }
`,dI=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,uI=d.h2`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,pI=d.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }
`,fI=d.div`
  color: #dcddde;
  margin-bottom: 24px;
`,hI=d.p`
  color: #b9bbbe;
  line-height: 1.6;
  margin-bottom: 20px;
`,xI=d.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,Ap=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #dcddde;
`,Ip=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #4a4d52;
  border-radius: 8px;
  color: #7289da;
  flex-shrink: 0;
`,Lp=d.div`
  font-size: 14px;
`,Dp=d.div`
  font-weight: 600;
  margin-bottom: 2px;
`,Bp=d.div`
  color: #b9bbbe;
  font-size: 12px;
`,gI=d.div`
  background-color: #2f3136;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,mI=d.h3`
  color: #dcddde;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`,yI=d.p`
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 16px;
`,Fp=d.div`
  margin-bottom: 16px;
`,Np=d.label`
  display: block;
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 8px;
`,rv=d.input`
  width: 100%;
  padding: 12px;
  background-color: #40444b;
  border: 1px solid #202225;
  border-radius: 6px;
  color: #dcddde;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #7289da;
  }

  &::placeholder {
    color: #72767d;
  }
`,vI=d.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,nv=d.button`
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${e=>e.variant==="primary"?`
    background-color: #7289da;
    color: white;
    
    &:hover {
      background-color: #677bc4;
      transform: translateY(-1px);
    }
  `:`
    background-color: #4a4d52;
    color: #dcddde;
    
    &:hover {
      background-color: #5a5d62;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,bI=({isOpen:e,onClose:t,onCreateCall:r})=>{const[o,s]=f.useState(""),[a,l]=f.useState(""),[c,u]=f.useState(!1),p=()=>{o.trim()&&(r({title:o.trim(),description:a.trim(),isPrivate:c}),t())},x=()=>{s(""),l(""),t()};return e?i.jsx(lI,{onClick:x,children:i.jsxs(cI,{onClick:h=>h.stopPropagation(),children:[i.jsxs(dI,{children:[i.jsxs(uI,{children:[i.jsx(Or,{size:24}),"Create Group Video Call"]}),i.jsx(pI,{onClick:x,children:i.jsx(nt,{size:20})})]}),i.jsxs(fI,{children:[i.jsx(hI,{children:"Create a group video call room where multiple participants can join and collaborate."}),i.jsxs(xI,{children:[i.jsxs(Ap,{children:[i.jsx(Ip,{children:i.jsx(jn,{size:16})}),i.jsxs(Lp,{children:[i.jsx(Dp,{children:"Multiple Participants"}),i.jsx(Bp,{children:"Invite up to 50 people to join your video call"})]})]}),i.jsxs(Ap,{children:[i.jsx(Ip,{children:i.jsx(Or,{size:16})}),i.jsxs(Lp,{children:[i.jsx(Dp,{children:"HD Video Quality"}),i.jsx(Bp,{children:"Crystal clear video with adaptive quality"})]})]}),i.jsxs(Ap,{children:[i.jsx(Ip,{children:i.jsx(uo,{size:16})}),i.jsxs(Lp,{children:[i.jsx(Dp,{children:"Unlimited Duration"}),i.jsx(Bp,{children:"No time limits on your group conversations"})]})]})]}),i.jsxs(gI,{children:[i.jsx(mI,{children:"Call Details"}),i.jsx(yI,{children:"Set up your video call room with a title and optional description."}),i.jsxs(Fp,{children:[i.jsx(Np,{children:"Call Title *"}),i.jsx(rv,{value:o,onChange:h=>s(h.target.value),placeholder:"Enter call title...",maxLength:100})]}),i.jsxs(Fp,{children:[i.jsx(Np,{children:"Kimlar qo'shila oladi?"}),i.jsxs("div",{style:{display:"flex",gap:10,marginBottom:4},children:[i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#dcddde",fontSize:14},children:[i.jsx("input",{type:"radio",name:"privacy",checked:!c,onChange:()=>u(!1),style:{accentColor:"#7289da"}}),"🌐 Barcha — ruxsatsiz"]}),i.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,cursor:"pointer",color:"#dcddde",fontSize:14},children:[i.jsx("input",{type:"radio",name:"privacy",checked:c,onChange:()=>u(!0),style:{accentColor:"#7289da"}}),"🔒 Faqat mening ruxsatim bilan"]})]}),c&&i.jsx("p",{style:{color:"#8e9297",fontSize:12,margin:"4px 0 0"},children:"Mehmonlar siz ruxsat berguncha kutadi"})]}),i.jsxs(Fp,{children:[i.jsx(Np,{children:"Description (Optional)"}),i.jsx(rv,{value:a,onChange:h=>l(h.target.value),placeholder:"What's this call about?",maxLength:500})]})]})]}),i.jsxs(vI,{children:[i.jsx(nv,{onClick:x,children:"Cancel"}),i.jsx(nv,{variant:"primary",onClick:p,disabled:!o.trim(),children:"Create Call"})]})]})}):null},wI=Ft`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`,kI=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`,jI=d.div`
  width: 100%;
  max-width: 600px;
  background: #2f3136;
  border-radius: 24px;
  border: 1px solid rgba(88, 101, 242, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  animation: ${wI} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`,SI=d.div`
  padding: 24px 32px 0;
  display: flex;
  gap: 8px;
`,CI=d.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${e=>e.$progress}%;
    background: linear-gradient(90deg, #5865f2, #7b6cf6);
    transition: width 0.4s ease;
  }
`,Hs=d.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,Vs=d.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.1),
    rgba(123, 108, 246, 0.1)
  );
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5865f2;
  margin-bottom: 24px;
  border: 1px solid rgba(88, 101, 242, 0.2);
`,Ys=d.h2`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
`,Ws=d.p`
  font-size: 16px;
  color: #b9bbbe;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 32px;
`,Up=d.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,qp=d.button`
  padding: 16px;
  background: ${e=>e.$active?"rgba(88, 101, 242, 0.1)":"#202225"};
  border: 2px solid ${e=>e.$active?"#5865f2":"transparent"};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${e=>e.$active?"#fff":"#b9bbbe"};

  &:hover {
    background: ${e=>e.$active?"rgba(88, 101, 242, 0.15)":"rgba(255,255,255,0.05)"};
    transform: translateY(-2px);
  }

  svg {
    color: ${e=>e.$active?"#5865f2":"#72767d"};
  }
`,Hp=d.span`
  font-size: 14px;
  font-weight: 600;
`,zI=d.div`
  padding: 24px 32px;
  background: rgba(32, 34, 37, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ov=d.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${e=>e.$primary?`
    background: linear-gradient(135deg, #5865f2, #4752c4);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.3);
    &:hover { filter: brightness(1.1); transform: translateY(-1px); }
  `:`
    background: transparent;
    color: #b9bbbe;
    border: 1px solid transparent;
    &:hover { color: #fff; }
    &:disabled { opacity: 0; cursor: default; }
  `}
`,EI=[{id:"dev",label:"Dasturlash",icon:i.jsx(B3,{size:24})},{id:"sci",label:"Fan va Texnika",icon:i.jsx(Kd,{size:24})},{id:"lang",label:"Tillar",icon:i.jsx(Vd,{size:24})},{id:"math",label:"Matematika",icon:i.jsx(ss,{size:24})}],_I=[{id:"learn",label:"O'rganish",icon:i.jsx(ss,{size:24})},{id:"compete",label:"Musobaqalashish",icon:i.jsx(Ow,{size:24})},{id:"fun",label:"Ko'ngilochar",icon:i.jsx(Hw,{size:24})},{id:"social",label:"Muloqot",icon:i.jsx(Vw,{size:24})}],TI=[{id:"beg",label:"Boshlang'ich",icon:i.jsx(qu,{size:24})},{id:"int",label:"O'rta daraja",icon:i.jsx(qu,{size:24})},{id:"adv",label:"Kuchli bilim",icon:i.jsx(qu,{size:24})}],$I=()=>{const[e,t]=f.useState(1),[r,o]=f.useState({username:"",gender:"",age:"",interests:[],goals:[],level:""}),[s,a]=f.useState(""),[l,c]=f.useState(!1),[u,p]=f.useState(!1),x=je(g=>g.updateUser),h=je(g=>g.token),m=5;f.useEffect(()=>{const T=setTimeout(async()=>{const A=r.username.trim();if(!A){a(""),p(!1);return}if(!/^[a-zA-Z0-9]{8,30}$/.test(A)){a("Kamida 8 harf/raqam"),p(!1);return}c(!0);try{(await(await fetch(`http://localhost:3000/users/check-username/${A}`,{headers:{Authorization:`Bearer ${h}`}})).json()).available?(a(""),p(!0)):(a("Bu username band!"),p(!1))}catch{a("Xatolik")}finally{c(!1)}},500);return()=>clearTimeout(T)},[r.username,h]);const k=g=>{o(T=>({...T,interests:T.interests.includes(g)?T.interests.filter(A=>A!==g):[...T.interests,g]}))},w=g=>{o(T=>({...T,goals:T.goals.includes(g)?T.goals.filter(A=>A!==g):[...T.goals,g]}))},j=async()=>{if(!r.username)return He.error("Username kiriting");if(!r.gender)return He.error("Jinsingizni tanlang");if(!r.age)return He.error("Yoshingizni kiriting");try{const g=await fetch("http://localhost:3000/users/complete-onboarding",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify(r)});if(!g.ok){const A=await g.json();throw new Error(A.message||"Xatolik yuz berdi")}const T=await g.json();x(T),He.success("Muvaffaqiyatli! Platformaga xush kelibsiz. 🚀")}catch(g){const T=Array.isArray(g.message)?g.message[0]:g.message;He.error(T||"Xatolik yuz berdi. Qaytadan urinib ko'ring.")}},C=()=>{if(e===2){if(!r.username||!u||!r.gender||!r.age)return!1;const g=Number(r.age);if(isNaN(g)||g<4||g>100)return!1}return!(e===3&&r.interests.length===0||e===4&&r.goals.length===0||e===5&&!r.level)},y=()=>{if(!C()&&e>1){let g="Maydonlarni to'ldiring";if(e===2){const T=Number(r.age);r.username?u?r.gender?r.age?(T<4||T>100)&&(g="Yosh 4 va 100 oralig'ida bo'lishi kerak"):g="Yoshingizni kiriting":g="Jinsingizni tanlang":g="Yaroqli username tanlang":g="Username kiriting"}else e===3?g="Kamida bitta qiziqish tanlang":e===4?g="Kamida bitta maqsad tanlang":e===5&&(g="Bilim darajangizni tanlang");return He.error(g)}e<m?t(g=>g+1):j()},v=()=>e>1&&t(g=>g-1),b=()=>{switch(e){case 1:return i.jsxs(Hs,{children:[i.jsx(Vs,{children:i.jsx(Hw,{size:40})}),i.jsx(Ys,{children:"Xush Kelibsiz!"}),i.jsxs(Ws,{children:["Platformamizga xush kelibsiz! Bu yerda siz o'z bilimlaringizni sinovdan o'tkazishingiz, boshqalar bilan bellashishingiz va qiziqarli muloqot qilishingiz mumkin.",i.jsx("br",{}),i.jsx("br",{}),"Tajribangizni mukammal darajada shaxsiylashtirish uchun bizga bir oz yordam berasizmi?"]})]});case 2:return i.jsxs(Hs,{children:[i.jsx(Vs,{children:i.jsx(mn,{size:40})}),i.jsx(Ys,{children:"Shaxsiy ma'lumotlar"}),i.jsx(Ws,{children:"Profilingizni to'ldiring"}),i.jsxs("div",{style:{width:"100%",maxWidth:"360px",display:"flex",flexDirection:"column",gap:"16px"},children:[i.jsxs("div",{style:{position:"relative"},children:[i.jsx(R3,{size:16,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#72767d"}}),i.jsx("input",{type:"text",placeholder:"Username",value:r.username,onChange:g=>o({...r,username:g.target.value.toLowerCase()}),style:{width:"100%",padding:"12px 12px 12px 40px",background:"#202225",border:s?"1px solid #f04747":u?"1px solid #43b581":"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",outline:"none",transition:"border-color 0.2s"}}),l&&i.jsx(Yd,{size:16,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#b9bbbe",animation:"spin 1s linear infinite"}}),!l&&u&&r.username&&i.jsx(Jo,{size:16,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#43b581"}})]}),s&&i.jsxs("div",{style:{color:"#f04747",fontSize:"12px",marginTop:"-12px",display:"flex",alignItems:"center",gap:"4px"},children:[i.jsx(Hd,{size:12})," ",s]}),i.jsxs("div",{style:{display:"flex",gap:"10px"},children:[i.jsx("button",{type:"button",onClick:()=>o({...r,gender:"male"}),style:{flex:1,padding:"12px",background:r.gender==="male"?"rgba(88, 101, 242, 0.1)":"#202225",border:`2px solid ${r.gender==="male"?"#5865f2":"transparent"}`,borderRadius:"12px",color:r.gender==="male"?"white":"#72767d",cursor:"pointer"},children:"Erkak"}),i.jsx("button",{type:"button",onClick:()=>o({...r,gender:"female"}),style:{flex:1,padding:"12px",background:r.gender==="female"?"rgba(88, 101, 242, 0.1)":"#202225",border:`2px solid ${r.gender==="female"?"#5865f2":"transparent"}`,borderRadius:"12px",color:r.gender==="female"?"white":"#72767d",cursor:"pointer"},children:"Ayol"})]}),i.jsxs("div",{style:{position:"relative"},children:[i.jsx(Va,{size:16,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#72767d"}}),i.jsx("input",{type:"number",placeholder:"Yoshingiz",value:r.age,onChange:g=>o({...r,age:g.target.value}),style:{width:"100%",padding:"12px 12px 12px 40px",background:"#202225",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",outline:"none"}})]})]})]});case 3:return i.jsxs(Hs,{children:[i.jsx(Vs,{children:i.jsx(Vw,{size:40})}),i.jsx(Ys,{children:"Qiziqishlaringiz?"}),i.jsx(Ws,{children:"Sizni qaysi yo'nalishlar ko'proq qiziqtiradi? (Bir nechta tanlash mumkin)"}),i.jsx(Up,{children:EI.map(g=>i.jsxs(qp,{$active:r.interests.includes(g.id),onClick:()=>k(g.id),children:[g.icon,i.jsx(Hp,{children:g.label})]},g.id))})]});case 4:return i.jsxs(Hs,{children:[i.jsx(Vs,{children:i.jsx(Ow,{size:40})}),i.jsx(Ys,{children:"Asosiy Maqsadlar?"}),i.jsx(Ws,{children:"Platformadan qaysi maqsadda foydalanmoqchisiz?"}),i.jsx(Up,{children:_I.map(g=>i.jsxs(qp,{$active:r.goals.includes(g.id),onClick:()=>w(g.id),children:[g.icon,i.jsx(Hp,{children:g.label})]},g.id))})]});case 5:return i.jsxs(Hs,{children:[i.jsx(Vs,{children:i.jsx(Jo,{size:40})}),i.jsx(Ys,{children:"Bilim Darajangiz?"}),i.jsx(Ws,{children:"Hozirgi bilim darajangizni qanday baholaysiz?"}),i.jsx(Up,{children:TI.map(g=>i.jsxs(qp,{$active:r.level===g.id,onClick:()=>o({...r,level:g.id}),children:[g.icon,i.jsx(Hp,{children:g.label})]},g.id))})]});default:return null}};return i.jsx(kI,{children:i.jsxs(jI,{children:[i.jsx(SI,{children:[1,2,3,4,5].map(g=>i.jsx(CI,{$progress:e>=g?100:0},g))}),b(),i.jsxs(zI,{children:[i.jsxs(ov,{onClick:v,disabled:e===1,children:[i.jsx(L3,{size:18})," Orqaga"]}),i.jsxs(ov,{$primary:!0,onClick:y,children:[e===m?"Boshlash":"Keyingisi"," ",i.jsx(D3,{size:18})]})]})]})})},RI=d.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`,PI=d.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding-bottom: 88px;
    box-sizing: border-box;
  }
`,MI=d.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,OI=({initialNav:e="home",initialChannel:t=0,initialLesson:r})=>{const{chats:o,createChat:s,selectedNav:a,setSelectedNav:l,selectedChannel:c,setSelectedChannel:u}=ni(),p=pr(),[x,h]=f.useState(window.innerWidth<=768),[m,k]=f.useState(!1),[w,j]=f.useState(null),[C,y]=f.useState(!1),[v,b]=f.useState(!1),[g,T]=f.useState("courses"),[A,B]=f.useState(null),[z,H]=f.useState(!1),[D,U]=f.useState(!1),M=je(E=>E.user);f.useEffect(()=>{const E=()=>h(window.innerWidth<=768);return window.addEventListener("resize",E),()=>window.removeEventListener("resize",E)},[]),f.useEffect(()=>{if(t!==void 0&&t!==c&&u(t),e==="a"||e==="chats")a!=="chats"&&l("chats");else if(e==="users"||e==="groups")a!==e&&l(e);else if(e==="arena"){l("arena"),T("arena");const E=window.location.pathname,_={quiz:"tests",test:"tests",flashcard:"flashcards",falshcard:"flashcards",flashcards:"flashcards",battle:"battles",battles:"battles"};let R=null;E.includes("/arena/quiz")?R="tests":E.includes("/arena/flashcard")?R="flashcards":E.includes("/arena/battle")?R="battles":R=_[t]||t,R&&["tests","flashcards","battles"].includes(R)?B(R):E==="/arena"&&B(null)}else e!==a&&(l(e),e==="courses"&&T("courses"));(e==="courses"||e==="arena")&&(t&&t!=="0"&&e!=="arena"?j(t):e==="courses"&&(!t||t==="0")&&j(null))},[e,t,o]);const I=E=>{l(E),u(0),E==="arena"?(T("arena"),B(null)):E==="courses"&&T("courses"),p(`/${E}`)},P=async E=>{try{const _=await s({isGroup:!0,name:E.name,description:E.description,avatar:E.image,memberIds:E.members});k(!1);const R=(_==null?void 0:_.urlSlug)||(_==null?void 0:_.jammId)||(_==null?void 0:_._id)||(_==null?void 0:_.id);R&&p(`/a/${R}`)}catch(_){console.error("Failed to create group",_),_.message.includes("Premium")||_.message.includes("maksimal")?H(!0):Ne.error(_.message)}};return i.jsxs(RI,{children:[i.jsx(QE,{selectedNav:a,onSelectNav:I,onOpenSettings:()=>y(!0),onOpenPremium:()=>b(!0)}),i.jsx(PI,{children:a==="courses"||a==="arena"||a==="home"?i.jsxs(i.Fragment,{children:[i.jsx(N$,{onSelectCourse:j,onOpenPremium:()=>b(!0),viewMode:a==="arena"?"arena":g,onToggleViewMode:T,selectedCourse:w,activeArenaTab:A,setActiveArenaTab:B}),a==="arena"||a==="home"||g==="arena"?i.jsx("div",{style:{flex:1,overflowY:"auto"},children:i.jsx(hA,{activeTab:A,initialId:e==="arena"&&t&&!["tests","flashcards","battles","quiz","flashcard","battle","0"].includes(t)?t:r,onBack:()=>{B(null),p("/arena")}})}):i.jsx(dP,{courseId:w,initialLessonSlug:r,onClose:()=>{j(null),p("/courses")}})]}):a==="profile"?i.jsx(rO,{profileUserId:t&&t!==0&&t!=="0"?String(t):null}):a==="feed"?i.jsx(aI,{}):i.jsxs(i.Fragment,{children:[!x||!c||c==="0"?i.jsx(f_,{selectedChannel:c,selectedNav:a,chats:o,onOpenCreateGroup:()=>k(!0),onOpenCreateMeet:()=>U(!0)}):null,i.jsx(MI,{children:c&&c!=="0"?i.jsx(PT,{selectedChannel:c,selectedNav:a,chats:o,navigate:p,onBack:()=>{u(0),p(`/${a}`)}}):i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#8e9297"},children:a==="meets"?"Meet tanlang":"Suhbatni tanlang"})})]})}),i.jsx(XT,{isOpen:m,onClose:()=>k(!1),onCreate:P,users:o.filter(E=>E.type==="user"&&!E.isSavedMessages).map(E=>{var R;const _=(R=E.members)==null?void 0:R.find($=>($._id||$.id)!==((M==null?void 0:M._id)||(M==null?void 0:M.id)));return{..._,id:(_==null?void 0:_._id)||(_==null?void 0:_.id),name:(_==null?void 0:_.nickname)||(_==null?void 0:_.username)||"Noma'lum"}}).filter(E=>E.id)}),i.jsx(Eh,{isOpen:C,onClose:()=>y(!1)}),i.jsx(Eh,{isOpen:v,onClose:()=>b(!1),initialSection:"premium"}),i.jsx(rg,{isOpen:z,onClose:()=>H(!1),onUpgrade:()=>{H(!1),b(!0)}}),i.jsx(bI,{isOpen:D,onClose:()=>U(!1),onCreateCall:async({title:E,isPrivate:_})=>{if(M){const $=M.premiumStatus==="active",L=(await vd()).filter(S=>{var N;return S.creator===(M==null?void 0:M._id)||((N=S.creator)==null?void 0:N._id)===(M==null?void 0:M._id)}),O=$?3:1;if(L.length>=O){U(!1),H(!0);return}}const R=E.toLowerCase().replace(/\s+/g,"-")+"-"+Date.now().toString().slice(-4);await ij({roomId:R,title:E,isPrivate:_,isCreator:!0}),p(`/join/${R}`)}}),M&&!M.isOnboardingCompleted&&i.jsx($I,{})]})},AI=d.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dcddde;
  text-align: center;
  padding: 40px;
`,II=d.div`
  width: 120px;
  height: 120px;
  background-color: #7289da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`,LI=d.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
`,DI=d.p`
  font-size: 16px;
  color: #b9bbbe;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`,BI=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 800px;
  width: 100%;
  margin-top: 40px;
`,Ks=d.div`
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
`,uc=d(aw)`
  text-decoration: none;
  color: inherit;
`,Qs=d.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Gs=d.p`
  color: #b9bbbe;
  line-height: 1.5;
`,FI=()=>i.jsxs(AI,{children:[i.jsx(II,{children:i.jsx(Va,{size:60,color:"white"})}),i.jsx(LI,{children:"Welcome to Jamm"}),i.jsx(DI,{children:"This is a modern communication platform built with React, Vite, and styled-components. Experience real-time chat, voice channels, and a beautiful interface."}),i.jsxs(BI,{children:[i.jsx(uc,{to:"/home",children:i.jsxs(Ks,{children:[i.jsxs(Qs,{children:[i.jsx($i,{size:20}),"All Chats"]}),i.jsx(Gs,{children:"View and manage all your conversations in one place. Switch between different chats and stay connected."})]})}),i.jsx(uc,{to:"/users",children:i.jsxs(Ks,{children:[i.jsxs(Qs,{children:[i.jsx(jn,{size:20}),"Direct Messages"]}),i.jsx(Gs,{children:"Start one-on-one conversations with friends and colleagues. Private and secure messaging."})]})}),i.jsx(uc,{to:"/groups",children:i.jsxs(Ks,{children:[i.jsxs(Qs,{children:[i.jsx(d6,{size:20}),"Group Chats"]}),i.jsx(Gs,{children:"Create and join group conversations with multiple participants. Perfect for teams and communities."})]})}),i.jsxs(Ks,{children:[i.jsxs(Qs,{children:[i.jsx(Va,{size:20}),"Modern UI"]}),i.jsx(Gs,{children:"Beautiful, responsive interface that works on all devices. Smooth animations and intuitive user experience."})]}),i.jsx(uc,{to:"/courses",children:i.jsxs(Ks,{children:[i.jsxs(Qs,{children:[i.jsx(Li,{size:20}),"Courses"]}),i.jsx(Gs,{children:"Watch video lessons, track your progress, and learn new skills. YouTube-like player with organized playlists."})]})})]})]}),vj=Ft`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,Vp=Ft`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;Ft`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;const NI=d.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1b2e 0%, #16171d 50%, #0d0e14 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`,Yp=d.div`
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
    animation: ${Vp} 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: #eb459e;
    bottom: -50px;
    left: -50px;
    animation: ${Vp} 10s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: #57f287;
    top: 50%;
    left: 50%;
    animation: ${Vp} 12s ease-in-out infinite;
  }
`,UI=d.div`
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
  animation: ${vj} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 420px;
    flex-direction: column;
  }
`,qI=d.div`
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
`,HI=d.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
`,VI=d.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`,YI=d.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`,Xs=d.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`,Js=d.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Zs=d.span`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`,WI=d.div`
  flex: 1;
  padding: 40px;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`,KI=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`,QI=d.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5865f2, #7b6cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.35);
`,GI=d.h1`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #b9bbbe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`,XI=d.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
`,JI=d.p`
  font-size: 14px;
  color: #b9bbbe;
  text-align: center;
  margin-bottom: 24px;
`,ZI=d.div`
  display: flex;
  background: rgba(32, 34, 37, 0.7);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
`,iv=d.button`
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
`,eL=d.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Wp=d.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Kp=d.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b9bbbe;
`,Qp=d.div`
  position: relative;
  display: flex;
  align-items: center;
`,wa=d.div`
  position: absolute;
  left: 14px;
  color: #72767d;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
`,Gp=d.input`
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

  &:focus ~ ${wa}, &:focus + ${wa} {
    color: #5865f2;
  }
`,tL=d.button`
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
`,rL=d.button`
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
`,nL=d.div`
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
`,oL=d.button`
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
`,iL=()=>i.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[i.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",fill:"#4285F4"}),i.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),i.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),i.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),sL=d.p`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #72767d;
`,sv=d.button`
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
`,aL=d.div`
  background: rgba(240, 71, 71, 0.12);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #f04747;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`,lL=d.div`
  background: rgba(67, 181, 129, 0.12);
  border: 1px solid rgba(67, 181, 129, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #43b581;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;const cL=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${vj} 0.3s ease-out;
`,dL=d.div`
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  background: #2f3136;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
`,uL=d.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    color: #fff;
    font-size: 18px;
  }
`,pL=d.div`
  padding: 24px;
  overflow-y: auto;
  color: #dcddde;
  line-height: 1.6;
  font-size: 14px;

  h4 {
    color: #fff;
    margin: 20px 0 10px 0;
    font-size: 16px;
  }

  p {
    margin-bottom: 16px;
  }

  ul {
    margin-bottom: 16px;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #202225;
    border-radius: 4px;
  }
`,fL=d.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 11px;
`,av=d.button`
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #5865f2;
    text-decoration: underline;
  }
`,hL=()=>{const e=pr(),t=je(z=>z.setAuth),[r,o]=f.useState("login"),[s,a]=f.useState(!1),[l,c]=f.useState(null),[u,p]=f.useState(""),[x,h]=f.useState(""),[m,k]=f.useState(""),[w,j]=f.useState(!1),[C,y]=f.useState(""),[v,b]=f.useState(""),g="http://localhost:3000";Le.useEffect(()=>{const H=new URLSearchParams(window.location.search).get("verify_token");H&&T(H)},[]);const T=async z=>{j(!0),y("");try{const H=await fetch(`${g}/auth/verify/${z}`),D=await H.json();if(!H.ok)throw new Error(D.message||"Tasdiqlashda xatolik yuz berdi");t(D.user,D.access_token),e("/")}catch(H){y(H.message)}finally{j(!1)}},A=async z=>{z.preventDefault(),y(""),b(""),j(!0);try{const H=r==="login"?"/auth/login":"/auth/signup",D=r==="login"?{email:u,password:x}:{email:u,password:x,nickname:m},U=await fetch(`${g}${H}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(D)}),M=await U.json();if(!U.ok)throw new Error(M.message||"Xatolik yuz berdi");r==="signup"?(b(M.message),p(""),h(""),k("")):(t(M.user,M.access_token),e("/"))}catch(H){y(H.message)}finally{j(!1)}},B=()=>{toast.error("Google Auth hali ulanmagan. Email/parol bilan kiring.")};return i.jsxs(NI,{children:[i.jsx(Yp,{}),i.jsx(Yp,{}),i.jsx(Yp,{}),i.jsxs(UI,{children:[i.jsxs(qI,{children:[i.jsx(HI,{children:"Jamm platformasiga xush kelibsiz!"}),i.jsx(VI,{children:"Zamonaviy muloqot va ta'lim platformasi. Do'stlaringiz bilan bog'laning va yangi bilimlar oling."}),i.jsxs(YI,{children:[i.jsxs(Xs,{children:[i.jsx(Js,{children:i.jsx($i,{size:18,color:"white"})}),i.jsx(Zs,{children:"Real-time chat va guruhlar"})]}),i.jsxs(Xs,{children:[i.jsx(Js,{children:i.jsx(Li,{size:18,color:"white"})}),i.jsx(Zs,{children:"Video kurslar va darsliklar"})]}),i.jsxs(Xs,{children:[i.jsx(Js,{children:i.jsx(xd,{size:18,color:"white"})}),i.jsx(Zs,{children:"Bilimlar bellashuvi (Arena)"})]}),i.jsxs(Xs,{children:[i.jsx(Js,{children:i.jsx(Kd,{size:18,color:"white"})}),i.jsx(Zs,{children:"Tez va qulay interfeys"})]}),i.jsxs(Xs,{children:[i.jsx(Js,{children:i.jsx(as,{size:18,color:"white"})}),i.jsx(Zs,{children:"Xavfsiz va himoyalangan"})]})]})]}),i.jsxs(WI,{children:[i.jsxs(KI,{children:[i.jsx(QI,{children:i.jsx(Va,{size:26,color:"white"})}),i.jsx(GI,{children:"Jamm"})]}),i.jsx(XI,{children:r==="login"?"Qaytib kelganingizdan xursandmiz!":"Akkaunt yarating"}),i.jsx(JI,{children:r==="login"?"Hisobingizga kirish uchun ma'lumotlaringizni kiriting":"Ro'yxatdan o'tib, platformaga qo'shiling"}),i.jsxs(ZI,{children:[i.jsx(iv,{$active:r==="login",onClick:()=>o("login"),children:"Kirish"}),i.jsx(iv,{$active:r==="signup",onClick:()=>o("signup"),children:"Ro'yxatdan o'tish"})]}),i.jsxs(eL,{onSubmit:A,children:[r==="signup"&&i.jsxs(Wp,{children:[i.jsx(Kp,{children:"Nik (Laqab)"}),i.jsxs(Qp,{children:[i.jsx(Gp,{type:"text",placeholder:"Nikingiz",value:m,onChange:z=>k(z.target.value),required:r==="signup"}),i.jsx(wa,{children:i.jsx(mn,{size:16})})]})]}),i.jsxs(Wp,{children:[i.jsx(Kp,{children:"Email"}),i.jsxs(Qp,{children:[i.jsx(Gp,{type:"email",placeholder:"email@example.com",value:u,onChange:z=>p(z.target.value),required:!0}),i.jsx(wa,{children:i.jsx(K3,{size:16})})]})]}),i.jsxs(Wp,{children:[i.jsx(Kp,{children:"Parol"}),i.jsxs(Qp,{children:[i.jsx(Gp,{type:s?"text":"password",placeholder:"••••••••",value:x,onChange:z=>h(z.target.value),required:!0}),i.jsx(wa,{children:i.jsx(Zo,{size:16})}),i.jsx(tL,{type:"button",onClick:()=>a(!s),children:s?i.jsx(Iw,{size:16}):i.jsx(Ha,{size:16})})]})]}),v&&i.jsx(lL,{children:v}),C&&i.jsx(aL,{children:C}),i.jsxs(rL,{type:"submit",disabled:w,children:[w?"Yuklanmoqda...":r==="login"?"Kirish":"Ro'yxatdan o'tish",!w&&i.jsx($3,{size:18})]})]}),i.jsx(nL,{children:i.jsx("span",{children:"yoki"})}),i.jsxs(oL,{onClick:B,children:[i.jsx(iL,{}),"Google orqali ",r==="login"?"kirish":"ro'yxatdan o'tish"]}),i.jsx(sL,{children:r==="login"?i.jsxs(i.Fragment,{children:["Hisobingiz yo'qmi?"," ",i.jsx(sv,{type:"button",onClick:()=>o("signup"),children:"Ro'yxatdan o'ting"})]}):i.jsxs(i.Fragment,{children:["Hisobingiz bormi?"," ",i.jsx(sv,{type:"button",onClick:()=>o("login"),children:"Kirish"})]})}),i.jsxs(fL,{children:[i.jsx(av,{type:"button",onClick:()=>c("privacy"),children:"Maxfiylik siyosati"}),i.jsx(av,{type:"button",onClick:()=>c("terms"),children:"Foydalanish shartlari"})]})]})]}),l&&i.jsx(cL,{onClick:()=>c(null),children:i.jsxs(dL,{onClick:z=>z.stopPropagation(),children:[i.jsxs(uL,{children:[i.jsx("h3",{children:l==="privacy"?"Maxfiylik Siyosati":"Foydalanish Shartlari"}),i.jsx("button",{onClick:()=>c(null),style:{background:"none",border:"none",color:"#72767d",cursor:"pointer"},children:i.jsx(nt,{size:24})})]}),i.jsx(pL,{children:l==="privacy"?i.jsxs(i.Fragment,{children:[i.jsx("p",{children:"Jamm platformasi sizning maxfiyligingizni hurmat qiladi va shaxsiy ma'lumotlaringizni himoya qilishga intiladi."}),i.jsx("h4",{children:"1. To'planadigan ma'lumotlar"}),i.jsx("p",{children:"Biz quyidagi ma'lumotlarni to'playmiz:"}),i.jsxs("ul",{children:[i.jsx("li",{children:"Elektron pochta manzili (hisobga kirish uchun)"}),i.jsx("li",{children:"Username va Nik (platformada ko'rinish uchun)"}),i.jsx("li",{children:"Telefon raqami (xavfsizlik va aloqa uchun)"}),i.jsx("li",{children:"Akkaunt rasmi (ixtiyoriy, profilingizni shaxsiylashtirish uchun)"})]}),i.jsx("h4",{children:"2. Ma'lumotlardan foydalanish"}),i.jsx("p",{children:"Sizning ma'lumotlaringiz platformaning to'liq ishlashini ta'minlash, siz bilan bog'lanish va xavfsizlikni ta'minlash maqsadida ishlatiladi."}),i.jsx("h4",{children:"3. Ma'lumotlarni saqlash"}),i.jsx("p",{children:"Barcha ma'lumotlar himoyalangan serverlarda saqlanadi va uchinchi shaxslarga sotilmaydi yoki ixtiyoriy ravishda berilmaydi."}),i.jsx("h4",{children:"4. Xavfsizlik"}),i.jsx("p",{children:"Biz zamonaviy shifrlash usullari va xavfsizlik protokollaridan foydalanamiz. Biroq, parolingizni hech kimga bermaslikni tavsiya qilamiz."})]}):i.jsxs(i.Fragment,{children:[i.jsx("p",{children:"Ushbu shartlar Jamm platformasidan foydalanish qoidalarini belgilaydi. Platformadan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz."}),i.jsx("h4",{children:"1. Foydalanish qoidalari"}),i.jsxs("ul",{children:[i.jsx("li",{children:"Boshqa foydalanuvchilarni haqorat qilmaslik"}),i.jsx("li",{children:"Spam yoki noqonuniy kontent tarqatmaslik"}),i.jsx("li",{children:"Platforma xavfsizligiga zarar yetkazuvchi harakatlar qilmaslik"}),i.jsx("li",{children:"Bellashuvlarda (Arena) halol o'ynash"})]}),i.jsx("h4",{children:"2. Mualliflik huquqi"}),i.jsx("p",{children:"Platformadagi barcha kontent (kurslar, savollar, kodlar) mualliflik huquqi bilan himoyalangan. Ularni ruxsatsiz ko'chirish taqiqlanadi."}),i.jsx("h4",{children:"3. Mas'uliyat"}),i.jsx("p",{children:"Foydalanuvchi o'z hisobi va u orqali amalga oshirilgan barcha harakatlar uchun shaxsan mas'uldir."}),i.jsx("h4",{children:"4. Hisobni o'chirish"}),i.jsx("p",{children:"Biz qoidalarni buzgan foydalanuvchilar hisobini ogohlantirishsiz to'xtatish yoki o'chirish huquqiga egamiz."})]})})]})})]})},xL="http://localhost:3000",gL={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]};function mL({roomId:e,displayName:t,enabled:r,isCreator:o=!1,isPrivate:s=!1,chatTitle:a="",initialMicOn:l=!0,initialCamOn:c=!0}){const u=f.useRef(null),p=f.useRef(null),x=f.useRef({}),[h,m]=f.useState(null),[k,w]=f.useState([]),[j,C]=f.useState(null),[y,v]=f.useState([]),[b,g]=f.useState(!1),[T,A]=f.useState([]),[B,z]=f.useState(l),[H,D]=f.useState(c),[U,M]=f.useState(!1),[I,P]=f.useState(!1),[E,_]=f.useState(!1),[R,$]=f.useState(new Set),[F,L]=f.useState("idle"),[O,S]=f.useState(null),[N,Q]=f.useState(a||""),[X,ee]=f.useState(!1),ae=f.useRef(null),de=f.useRef({}),le=f.useRef({}),te=f.useCallback((ce,ue,ye)=>{w(ve=>ve.find(Ee=>Ee.peerId===ce)?ve.map(Ee=>Ee.peerId===ce?{...Ee,stream:ue}:Ee):[...ve,{peerId:ce,stream:ue,displayName:ye||ce}])},[]),Z=f.useCallback(ce=>{w(ue=>ue.filter(ye=>ye.peerId!==ce)),v(ue=>ue.filter(ye=>ye.peerId!==ce)),delete le.current[ce],x.current[ce]&&(x.current[ce].close(),delete x.current[ce])},[]),ne=f.useCallback((ce,ue)=>{const ye=new RTCPeerConnection(gL);return p.current&&p.current.getTracks().forEach(ve=>ye.addTrack(ve,p.current)),ae.current&&ae.current.getTracks().forEach(ve=>ye.addTrack(ve,ae.current)),ye.ontrack=ve=>{const[Ee]=ve.streams;if(!Ee)return;const et=le.current[ce];et?et===Ee.id?te(ce,Ee,ue):v(_e=>_e.find(Pe=>Pe.peerId===ce)?_e.map(Pe=>Pe.peerId===ce?{...Pe,stream:Ee}:Pe):[..._e,{peerId:ce,stream:Ee,displayName:ue}]):(le.current[ce]=Ee.id,te(ce,Ee,ue))},ye.onicecandidate=ve=>{ve.candidate&&u.current&&u.current.emit("ice-candidate",{targetId:ce,candidate:ve.candidate})},ye.onconnectionstatechange=()=>{["failed","disconnected"].includes(ye.connectionState)&&Z(ce)},x.current[ce]=ye,ye},[te,Z]),ze=f.useCallback(ce=>{ce.on("offer",async({senderId:ue,sdp:ye})=>{let ve=x.current[ue];ve||(ve=ne(ue,ue)),await ve.setRemoteDescription(new RTCSessionDescription(ye));const Ee=await ve.createAnswer();await ve.setLocalDescription(Ee),ce.emit("answer",{targetId:ue,sdp:Ee})}),ce.on("answer",async({senderId:ue,sdp:ye})=>{const ve=x.current[ue];ve&&await ve.setRemoteDescription(new RTCSessionDescription(ye))}),ce.on("ice-candidate",async({senderId:ue,candidate:ye})=>{const ve=x.current[ue];if(ve&&ye)try{await ve.addIceCandidate(new RTCIceCandidate(ye))}catch{}}),ce.on("peer-joined",async({peerId:ue,displayName:ye})=>{const ve=ne(ue,ye),Ee=await ve.createOffer();await ve.setLocalDescription(Ee),ce.emit("offer",{targetId:ue,sdp:Ee})}),ce.on("existing-peers",({peers:ue})=>{L("joined")}),ce.on("peer-left",({peerId:ue})=>{Z(ue)})},[ne,Z]);f.useEffect(()=>{if(!r||!e)return;let ce=!0;return(async()=>{L("connecting"),S(null);try{const ye=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});if(!ce){ye.getTracks().forEach(Pe=>Pe.stop());return}p.current=ye,m(ye);const ve=ye.getAudioTracks()[0];ve&&(ve.enabled=l);const Ee=ye.getVideoTracks()[0];Ee&&(Ee.enabled=c);const et=je.getState().token,_e=ao(`${xL}/video`,{transports:["websocket"],auth:{token:et}});u.current=_e,ze(_e),o&&_e.on("knock-request",({peerId:Pe,displayName:Ye})=>{A(ut=>[...ut,{peerId:Pe,displayName:Ye}])}),o||(_e.on("waiting-for-approval",()=>{L("waiting")}),_e.on("knock-approved",({mediaLocked:Pe})=>{var Ye,ut;if(L("joined"),Pe){M(!0),P(!0);const nn=(Ye=p.current)==null?void 0:Ye.getAudioTracks()[0];nn&&(nn.enabled=!1,z(!1));const hr=(ut=p.current)==null?void 0:ut.getVideoTracks()[0];hr&&(hr.enabled=!1,D(!1))}}),_e.on("knock-rejected",({reason:Pe})=>{L("rejected"),S(Pe||"Rad etildi")})),_e.on("room-info",({title:Pe})=>{Pe&&Q(Pe)}),_e.on("screen-share-stopped",({peerId:Pe})=>{v(Ye=>Ye.filter(ut=>ut.peerId!==Pe)),delete le.current[Pe]}),_e.on("recording-started",()=>ee(!0)),_e.on("recording-stopped",()=>ee(!1)),_e.on("kicked",()=>{S("Siz yaratuvchi tomonidan chiqarib yuborildingiz"),L("rejected"),qe()}),_e.on("force-mute-mic",()=>{var Ye;const Pe=(Ye=p.current)==null?void 0:Ye.getAudioTracks()[0];Pe&&(Pe.enabled=!1,z(!1)),M(!0)}),_e.on("force-mute-cam",()=>{var Ye;const Pe=(Ye=p.current)==null?void 0:Ye.getVideoTracks()[0];Pe&&(Pe.enabled=!1,D(!1)),P(!0)}),_e.on("allow-mic",()=>M(!1)),_e.on("allow-cam",()=>P(!1)),_e.on("hand-raised",({peerId:Pe})=>{$(Ye=>new Set([...Ye,Pe]))}),_e.on("hand-lowered",({peerId:Pe})=>{$(Ye=>{const ut=new Set(Ye);return ut.delete(Pe),ut})}),_e.on("error",({message:Pe})=>{ce&&(S(Pe||"Server xatosi yuz berdi"),L("idle"))}),_e.on("connect_error",Pe=>{ce&&(S("Serverga ulanib bo'lmadi: "+Pe.message),L("idle"))}),o?(_e.emit("create-room",{roomId:e,displayName:t,isPrivate:s,title:a}),_e.once("room-created",()=>{L("joined")})):_e.emit("join-room",{roomId:e,displayName:t})}catch(ye){console.error("[useWebRTC]",ye),ce&&(S(ye.message||"Kamera/mikrofonga ruxsat berilmadi"),L("idle"))}})(),()=>{ce=!1,Object.values(x.current).forEach(ye=>ye.close()),x.current={},p.current&&(p.current.getTracks().forEach(ye=>ye.stop()),p.current=null),m(null),w([]),A([]),u.current&&(u.current.emit("leave-room",{roomId:e}),u.current.disconnect())}},[r,e,t,o,s,ze]);const J=f.useCallback(ce=>{u.current&&(u.current.emit("approve-knock",{roomId:e,peerId:ce}),A(ue=>ue.filter(ye=>ye.peerId!==ce)))},[e]),pe=f.useCallback(ce=>{u.current&&(u.current.emit("reject-knock",{roomId:e,peerId:ce}),A(ue=>ue.filter(ye=>ye.peerId!==ce)))},[e]),Ae=f.useCallback(()=>{var ue;if(U)return;const ce=(ue=p.current)==null?void 0:ue.getAudioTracks()[0];ce&&(ce.enabled=!ce.enabled,z(ce.enabled))},[U]),Xe=f.useCallback(()=>{var ue;if(I)return;const ce=(ue=p.current)==null?void 0:ue.getVideoTracks()[0];ce&&(ce.enabled=!ce.enabled,D(ce.enabled))},[I]),qe=f.useCallback(()=>{var ce,ue;u.current&&(u.current.emit("leave-room",{roomId:e}),u.current.disconnect()),Object.values(x.current).forEach(ye=>ye.close()),x.current={},(ce=p.current)==null||ce.getTracks().forEach(ye=>ye.stop()),p.current=null,(ue=ae.current)==null||ue.getTracks().forEach(ye=>ye.stop()),ae.current=null,m(null),C(null),g(!1),w([]),v([])},[e]),Nt=f.useCallback(async()=>{var ce,ue,ye;if(b){(ce=ae.current)==null||ce.getTracks().forEach(ve=>ve.stop()),Object.entries(de.current).forEach(([ve,Ee])=>{const et=x.current[ve];if(et&&Ee)try{et.removeTrack(Ee)}catch{}}),de.current={},ae.current=null,C(null),g(!1),u.current&&u.current.emit("screen-share-stopped",{roomId:e});for(const[ve,Ee]of Object.entries(x.current))try{const et=await Ee.createOffer();await Ee.setLocalDescription(et),(ue=u.current)==null||ue.emit("offer",{targetId:ve,sdp:et})}catch{}return}try{const ve=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});ae.current=ve,C(ve),g(!0),ve.getVideoTracks()[0].onended=()=>{Nt()};for(const[Ee,et]of Object.entries(x.current)){const _e=et.addTrack(ve.getVideoTracks()[0],ve);de.current[Ee]=_e}u.current&&u.current.emit("screen-share-started",{roomId:e});for(const[Ee,et]of Object.entries(x.current))try{const _e=await et.createOffer();await et.setLocalDescription(_e),(ye=u.current)==null||ye.emit("offer",{targetId:Ee,sdp:_e})}catch{}}catch(ve){console.error("Screen share error:",ve)}},[b,e]),$t=f.useCallback(ce=>{u.current&&u.current.emit(ce?"recording-started":"recording-stopped",{roomId:e})},[e]),fr=f.useCallback(ce=>{var ue;(ue=u.current)==null||ue.emit("force-mute-mic",{roomId:e,peerId:ce})},[e]),Nr=f.useCallback(ce=>{var ue;(ue=u.current)==null||ue.emit("force-mute-cam",{roomId:e,peerId:ce})},[e]),Se=f.useCallback(ce=>{var ue;(ue=u.current)==null||ue.emit("allow-mic",{roomId:e,peerId:ce})},[e]),De=f.useCallback(ce=>{var ue;(ue=u.current)==null||ue.emit("allow-cam",{roomId:e,peerId:ce})},[e]),it=f.useCallback(ce=>{var ue;(ue=u.current)==null||ue.emit("kick-peer",{roomId:e,peerId:ce})},[e]),bt=f.useCallback(()=>{var ue;const ce=!E;_(ce),(ue=u.current)==null||ue.emit(ce?"hand-raised":"hand-lowered",{roomId:e})},[E,e]);return{localStream:h,remoteStreams:k,screenStream:j,remoteScreenStreams:y,isScreenSharing:b,toggleScreenShare:Nt,knockRequests:T,approveKnock:J,rejectKnock:pe,joinStatus:F,isMicOn:B,isCamOn:H,micLocked:U,camLocked:I,toggleMic:Ae,toggleCam:Xe,leaveCall:qe,error:O,roomTitle:N,remoteIsRecording:X,emitRecording:$t,forceMuteMic:fr,forceMuteCam:Nr,allowMic:Se,allowCam:De,isHandRaised:E,raisedHands:R,toggleHandRaise:bt,kickPeer:it}}const sg=Ft`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,yL=Ft`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,vL=d.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
  animation: ${sg} 0.3s ease-out;
`,bL=d.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`,wL=d.div`
  display: flex;
  flex-direction: column;
`,kL=d.span`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`,jL=d.span`
  color: #72767d;
  font-size: 11px;
  font-family: monospace;
`,SL=d.div`
  display: flex;
  gap: 8px;
`,ea=d.button`
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
`,CL=d.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,zL=d.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${e=>{const t=e.$count;return t===1?Ti`
        grid-template-columns: 1fr;
      `:t===2?Ti`
        grid-template-columns: 1fr 1fr;
      `:t<=4?Ti`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `:Ti`
      grid-template-columns: repeat(3, 1fr);
    `}}
`,EL=d.div`
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
`,_L=d.div`
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
`,TL=d.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #4f545c;
`,$L=d.div`
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
`,RL=d.div`
  width: 280px;
  flex-shrink: 0;
  background: #18191c;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
`,PL=d.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,ML=d.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,OL=d.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  animation: ${sg} 0.2s ease;
`,AL=d.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`,IL=d.div`
  display: flex;
  gap: 6px;
`,lv=d.button`
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
`;d.div`
  text-align: center;
  color: #4f545c;
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;const cv=d.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`,dv=d.div`
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
`,uv=d.div`
  flex: 1;
  min-width: 0;
  color: #dcddde;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,pv=d.div`
  display: flex;
  gap: 4px;
  color: #4f545c;
  flex-shrink: 0;
`,fv=d.div`
  color: #72767d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`,LL=d.span`
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
`,DL=d.button`
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
`,BL=d.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
`,xi=d.button`
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
`,pc=d.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #b9bbbe;
  font-size: 15px;
`,FL=d(po)`
  animation: ${yL} 1.2s linear infinite;
`,NL=Ft`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,UL=d.div`
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
  animation: ${NL} 1.5s ease infinite;
`,qL=d.div`
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
  animation: ${sg} 0.15s ease;
  z-index: 100;
`,hv=d.button`
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
`,xv=d.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${e=>e.$bg||"rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`,HL=d.button`
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
`,fc=({stream:e,muted:t=!1,isLocal:r=!1,label:o,isCamOn:s=!0})=>{var u;const a=f.useRef(null),l=f.useRef(null);f.useEffect(()=>{a.current&&e&&(a.current.srcObject=e)},[e,s]);const c=()=>{var x,h;const p=l.current;p&&(document.fullscreenElement?document.exitFullscreen():(x=p.requestFullscreen)!=null&&x.call(p)||((h=p.webkitRequestFullscreen)==null||h.call(p)))};return i.jsxs(EL,{$isLocal:r,ref:l,onDoubleClick:c,style:{cursor:"pointer"},onMouseEnter:p=>{const x=p.currentTarget.querySelector(".fs-btn");x&&(x.style.opacity=1)},onMouseLeave:p=>{const x=p.currentTarget.querySelector(".fs-btn");x&&(x.style.opacity=0)},children:[i.jsx(HL,{className:"fs-btn",onClick:c,children:i.jsx(Fw,{size:14})}),s&&e?i.jsx("video",{ref:a,autoPlay:!0,playsInline:!0,muted:t}):i.jsxs(TL,{children:[i.jsx($L,{children:((u=o==null?void 0:o.charAt(0))==null?void 0:u.toUpperCase())||"?"}),i.jsx("span",{style:{fontSize:12},children:o})]}),i.jsxs(_L,{children:[!s&&i.jsx(Di,{size:11}),o,r&&" (Sen)"]})]})},VL=({isOpen:e,onClose:t,roomId:r,chatTitle:o,isCreator:s=!0,isPrivate:a=!1,initialMicOn:l=!0,initialCamOn:c=!0})=>{var Nr;const[u,p]=f.useState(!1),[x,h]=f.useState(!1),m=je(Se=>Se.user),k=(m==null?void 0:m.nickname)||(m==null?void 0:m.username)||"Mehmon",{localStream:w,remoteStreams:j,screenStream:C,remoteScreenStreams:y,isScreenSharing:v,toggleScreenShare:b,knockRequests:g,approveKnock:T,rejectKnock:A,joinStatus:B,isMicOn:z,isCamOn:H,micLocked:D,camLocked:U,toggleMic:M,toggleCam:I,leaveCall:P,error:E,roomTitle:_,remoteIsRecording:R,emitRecording:$,forceMuteMic:F,forceMuteCam:L,allowMic:O,allowCam:S,isHandRaised:N,raisedHands:Q,toggleHandRaise:X,kickPeer:ee}=mL({roomId:r,displayName:k,enabled:e&&!!r,isCreator:s,isPrivate:a,chatTitle:o,initialMicOn:l,initialCamOn:c}),[ae,de]=f.useState(!1),[le,te]=f.useState(!1),Z=f.useRef(null),ne=f.useRef([]),ze=f.useRef(null),J=f.useRef(null),pe=f.useRef(null),Ae=f.useCallback(()=>{const Se=new AudioContext,De=Se.createMediaStreamDestination();return[w,...j.map(bt=>bt.stream)].filter(Boolean).forEach(bt=>{const ce=bt.getAudioTracks();ce.length>0&&Se.createMediaStreamSource(new MediaStream(ce)).connect(De)}),De.stream},[w,j]),Xe=f.useCallback(async Se=>{try{te(!1);let De;if(Se==="screen"){const ue=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});pe.current=ue,De=ue,ue.getVideoTracks()[0].onended=()=>qe()}else{const ue=document.createElement("canvas");ue.width=1280,ue.height=720,ze.current=ue;const ye=ue.getContext("2d"),ve=()=>{const Ee=document.querySelectorAll("video"),et=Ee.length||1,_e=et<=1?1:et<=4?2:3,Pe=Math.ceil(et/_e),Ye=ue.width/_e,ut=ue.height/Pe;ye.fillStyle="#0b0d0f",ye.fillRect(0,0,ue.width,ue.height),Ee.forEach((nn,hr)=>{const En=hr%_e,vo=Math.floor(hr/_e);try{ye.drawImage(nn,En*Ye,vo*ut,Ye,ut)}catch{}})};J.current=setInterval(ve,33),De=ue.captureStream(30)}const it=Ae(),bt=new MediaStream([...De.getVideoTracks(),...it.getAudioTracks()]);ne.current=[];const ce=new MediaRecorder(bt,{mimeType:"video/webm;codecs=vp9,opus"});ce.ondataavailable=ue=>{ue.data.size>0&&ne.current.push(ue.data)},Z.current=ce,ce.start(1e3),de(!0),$(!0)}catch(De){console.error("Recording error:",De),te(!1)}},[Ae,$]),qe=f.useCallback(()=>{J.current&&(clearInterval(J.current),J.current=null),pe.current&&(pe.current.getTracks().forEach(Se=>Se.stop()),pe.current=null),Z.current&&Z.current.state!=="inactive"&&(Z.current.onstop=()=>{const Se=new Blob(ne.current,{type:"video/webm"}),De=URL.createObjectURL(Se),it=document.createElement("a");it.href=De,it.download=`meet-${r}-${Date.now()}.webm`,it.click(),URL.revokeObjectURL(De),ne.current=[]},Z.current.stop()),de(!1),$(!1)},[r,$]),Nt=()=>{ae&&qe(),P(),t()},$t=()=>{navigator.clipboard.writeText(`${window.location.origin}/join/${r}`),p(!0),setTimeout(()=>p(!1),2e3)};if(!e||!r)return null;const fr=1+j.length+(C?1:0)+y.length;return i.jsxs(vL,{children:[i.jsxs(bL,{children:[i.jsxs(wL,{children:[i.jsxs(kL,{children:[_||o||"Meet",a&&i.jsxs("span",{style:{fontSize:11,color:"#faa61a",marginLeft:8,display:"flex",alignItems:"center",gap:"4px"},children:[i.jsx(n6,{size:12})," Private"]})]}),i.jsx(jL,{children:r})]}),i.jsxs(SL,{children:[(ae||R)&&i.jsxs(UL,{children:[i.jsx(Vu,{size:8,fill:"#f04747"})," REC"]}),i.jsxs(ea,{onClick:$t,children:[u?i.jsx(sr,{size:13}):i.jsx(Dx,{size:13}),u?"Nusxalandi!":"Link"]}),i.jsxs(ea,{onClick:()=>h(Se=>!Se),style:{position:"relative"},children:[i.jsx(jn,{size:13}),fr,s&&g.length>0&&i.jsx(LL,{children:g.length})]})]})]}),i.jsxs(CL,{children:[E?i.jsxs(pc,{children:[i.jsx(Hd,{size:38,color:"#f04747"}),i.jsx("span",{children:E}),i.jsx(ea,{onClick:t,children:"Yopish"})]}):B==="connecting"?i.jsxs(pc,{children:[i.jsx(FL,{size:38,color:"#7289da"}),i.jsx("span",{children:"Ulanmoqda…"})]}):B==="waiting"?i.jsxs(pc,{children:[i.jsx(uo,{size:48,color:"#faa61a"}),i.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Ruxsat kutilmoqda…"}),i.jsx("span",{children:"Call yaratuvchisi sizga ruxsat berishini kuting"}),i.jsx(ea,{onClick:Nt,children:"Bekor qilish"})]}):B==="rejected"?i.jsxs(pc,{children:[i.jsx(Wu,{size:48,color:"#f04747"}),i.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Rad etildi"}),i.jsx("span",{children:"Call yaratuvchisi so'rovingizni rad etdi"}),i.jsx(ea,{onClick:t,children:"Yopish"})]}):i.jsxs(zL,{$count:fr,children:[i.jsx(fc,{stream:w,muted:!0,isLocal:!0,label:k,isCamOn:H}),C&&i.jsx(fc,{stream:C,muted:!0,label:`${n} (Ekran)`,isCamOn:!0}),j.map(({peerId:Se,stream:De,displayName:it})=>i.jsxs("div",{style:{position:"relative"},children:[i.jsx(fc,{stream:De,label:it,isCamOn:!0}),Q.has(Se)&&i.jsx("span",{style:{position:"absolute",top:8,left:8,fontSize:24,zIndex:5,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"},children:i.jsx(Yu,{size:20,color:"#faa61a",fill:"#faa61a"})})]},Se)),y.map(({peerId:Se,stream:De,displayName:it})=>i.jsx(fc,{stream:De,label:`${it} (Ekran)`,isCamOn:!0},`screen-${Se}`))]}),x&&i.jsxs(RL,{children:[i.jsxs(PL,{children:[i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[i.jsx(jn,{size:15,color:"#7289da"}),"A'zolar (",fr,")"]}),i.jsx(DL,{onClick:()=>h(!1),children:i.jsx(Wu,{size:16})})]}),i.jsxs(ML,{children:[s&&a&&i.jsxs(i.Fragment,{children:[i.jsxs(fv,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[i.jsx(Yw,{size:12})," Kutayotganlar (",g.length,")"]}),g.length===0?i.jsx("div",{style:{padding:"8px 14px",color:"#4f545c",fontSize:12},children:"Hech kim kutmayapti"}):g.map(({peerId:Se,displayName:De})=>i.jsxs(OL,{children:[i.jsxs(AL,{style:{display:"flex",alignItems:"center",gap:"6px"},children:[i.jsx(mn,{size:14})," ",De]}),i.jsxs(IL,{children:[i.jsxs(lv,{$approve:!0,onClick:()=>T(Se),children:[i.jsx(Jo,{size:12})," Qabul"]}),i.jsxs(lv,{onClick:()=>A(Se),children:[i.jsx(Wu,{size:12})," Rad"]})]})]},Se))]}),i.jsxs(fv,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[i.jsx(I3,{size:12,color:"#43b581"})," Qo'shilganlar (",fr,")"]}),i.jsxs(cv,{children:[i.jsx(dv,{children:((Nr=k==null?void 0:k.charAt(0))==null?void 0:Nr.toUpperCase())||"?"}),i.jsxs(uv,{children:[k," (Sen)"]}),i.jsxs(pv,{children:[z?i.jsx(Ro,{size:13,color:"#43b581"}):i.jsx(qo,{size:13,color:"#f04747"}),H?i.jsx(Or,{size:13,color:"#43b581"}):i.jsx(Di,{size:13,color:"#f04747"})]})]}),j.map(({peerId:Se,displayName:De})=>{var it;return i.jsxs(cv,{children:[i.jsx(dv,{children:((it=De==null?void 0:De.charAt(0))==null?void 0:it.toUpperCase())||"?"}),i.jsxs(uv,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[Q.has(Se)&&i.jsx(Yu,{size:14,color:"#faa61a",fill:"#faa61a"}),De]}),i.jsx(pv,{children:s?i.jsxs(i.Fragment,{children:[i.jsx("span",{onClick:()=>F(Se),style:{cursor:"pointer"},title:"Mic o'chirish",children:i.jsx(qo,{size:13,color:"#f04747"})}),i.jsx("span",{onClick:()=>O(Se),style:{cursor:"pointer"},title:"Mic ruxsat",children:i.jsx(Ro,{size:13,color:"#43b581"})}),i.jsx("span",{onClick:()=>L(Se),style:{cursor:"pointer"},title:"Cam o'chirish",children:i.jsx(Di,{size:13,color:"#f04747"})}),i.jsx("span",{onClick:()=>S(Se),style:{cursor:"pointer"},title:"Cam ruxsat",children:i.jsx(Or,{size:13,color:"#43b581"})}),i.jsx("span",{onClick:()=>ee(Se),style:{cursor:"pointer",marginLeft:8},title:"Chiqarib yuborish",children:i.jsx(Kw,{size:13,color:"#f04747"})})]}):i.jsxs(i.Fragment,{children:[i.jsx(Ro,{size:13,color:"#43b581"}),i.jsx(Or,{size:13,color:"#43b581"})]})})]},Se)})]})]})]}),i.jsxs(BL,{children:[i.jsxs(xi,{$active:z,onClick:M,style:D?{opacity:.5,cursor:"not-allowed"}:{},children:[z?i.jsx(Ro,{size:21}):i.jsx(qo,{size:21}),D&&i.jsx(Zo,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),i.jsxs(xi,{$active:H,onClick:I,style:U?{opacity:.5,cursor:"not-allowed"}:{},children:[H?i.jsx(Or,{size:21}):i.jsx(Di,{size:21}),U&&i.jsx(Zo,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),i.jsx(xi,{$active:v,onClick:b,children:v?i.jsx(Uw,{size:21}):i.jsx(uh,{size:21})}),i.jsx(xi,{$active:N,onClick:X,style:N?{background:"rgba(250,166,26,0.2)",color:"#faa61a"}:{},children:i.jsx(Yu,{size:21})}),s&&i.jsxs("div",{style:{position:"relative"},children:[i.jsx(xi,{$active:ae,onClick:()=>ae?qe():te(Se=>!Se),style:ae?{background:"rgba(240,71,71,0.2)",color:"#f04747"}:{},children:i.jsx(Vu,{size:21,fill:ae?"#f04747":"none"})}),le&&!ae&&i.jsxs(qL,{children:[i.jsxs(hv,{onClick:()=>Xe("screen"),children:[i.jsx(xv,{$bg:"rgba(114,137,218,0.15)",children:i.jsx(uh,{size:16,color:"#7289da"})}),i.jsxs("div",{children:[i.jsx("div",{style:{fontWeight:600},children:"Ekranni yozish"}),i.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Faqat ekran + barcha ovozlar"})]})]}),i.jsxs(hv,{onClick:()=>Xe("all"),children:[i.jsx(xv,{$bg:"rgba(240,71,71,0.12)",children:i.jsx(Vu,{size:16,color:"#f04747"})}),i.jsxs("div",{children:[i.jsx("div",{style:{fontWeight:600},children:"Hammasini yozish"}),i.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Barcha oynalar + barcha ovozlar"})]})]})]})]}),i.jsx(xi,{$danger:!0,onClick:Nt,children:i.jsx(Wd,{size:21})})]})]})},YL=Ft`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,WL=Ft`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,gv=d.div`
  min-height: 100vh;
  width: 100%;
  background: #0b0d0f;
  display: flex;
  align-items: center;
  justify-content: center;
`,mv=d.div`
  background: rgba(32, 34, 37, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 44px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${YL} 0.3s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`,KL=d.div`
  font-size: 40px;
  margin-bottom: 12px;
`,QL=d.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
`,GL=d.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
`,XL=d.code`
  display: block;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  color: #7289da;
  font-size: 13px;
  margin-bottom: 24px;
  word-break: break-all;
`,JL=d.input`
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
`,ZL=d.button`
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
`,eD=d.p`
  color: #f04747;
  font-size: 13px;
  margin: 8px 0 0;
`,tD=d(po)`
  animation: ${WL} 1.2s linear infinite;
`,rD=d.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`,yv=d.button`
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
`,vv=d.span`
  display: block;
  font-size: 10px;
  margin-top: 4px;
  color: ${e=>e.$active?"#b9bbbe":"#f04747"};
`,nD=()=>{const{roomId:e}=Px(),[t,r]=f.useState("checking"),[o,s]=f.useState(null),[a,l]=f.useState(""),[c,u]=f.useState(""),[p,x]=f.useState(!1),[h,m]=f.useState(!1),[k,w]=f.useState(!1),j=je(y=>y.user);f.useEffect(()=>{let y=!0;return(async()=>{var g;const b=await t_(e);if(y)if(b){s(b);const T=(j==null?void 0:j._id)||(j==null?void 0:j.id),A=typeof b.creator=="object"&&((g=b.creator)==null?void 0:g._id)||b.creator,B=String(A)===String(T);w(B),B?(l((j==null?void 0:j.nickname)||(j==null?void 0:j.username)||"Host"),r("call")):(l((j==null?void 0:j.nickname)||(j==null?void 0:j.username)||""),r("form"))}else l((j==null?void 0:j.nickname)||(j==null?void 0:j.username)||""),r("form")})(),()=>{y=!1}},[e,j]);const C=async()=>{if(!a.trim()){u("Iltimos ismingizni kiriting");return}await ij({roomId:e,title:(o==null?void 0:o.title)||"Meet",isPrivate:(o==null?void 0:o.isPrivate)||!1,isCreator:!1}),r("call")};return t==="checking"?i.jsx(gv,{children:i.jsx(mv,{children:i.jsx(tD,{size:32,color:"#7289da"})})}):t==="call"?i.jsx(VL,{isOpen:!0,onClose:()=>window.history.back(),roomId:e,chatTitle:(o==null?void 0:o.title)||"Meet",isCreator:k,isPrivate:(o==null?void 0:o.isPrivate)||!1,initialMicOn:p,initialCamOn:h}):i.jsx(gv,{children:i.jsxs(mv,{children:[i.jsx(KL,{children:"📹"}),i.jsx(QL,{children:"Video Callga qo'shilish"}),i.jsx(GL,{children:"Siz quyidagi callga taklif qilindingiz:"}),i.jsx(XL,{children:e}),i.jsx(JL,{autoFocus:!0,value:a,onChange:y=>l(y.target.value),placeholder:"Ismingizni kiriting",onKeyDown:y=>y.key==="Enter"&&C()}),i.jsxs(rD,{children:[i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(yv,{$active:p,onClick:()=>x(y=>!y),children:p?i.jsx(Ro,{size:22}):i.jsx(qo,{size:22})}),i.jsx(vv,{$active:p,children:p?"Yoniq":"O'chiq"})]}),i.jsxs("div",{style:{textAlign:"center"},children:[i.jsx(yv,{$active:h,onClick:()=>m(y=>!y),children:h?i.jsx(Or,{size:22}):i.jsx(Di,{size:22})}),i.jsx(vv,{$active:h,children:h?"Yoniq":"O'chiq"})]})]}),c&&i.jsx(eD,{children:c}),i.jsx(ZL,{onClick:C,children:"🎥 Callga kirish"})]})})};function ta({children:e}){return je(r=>r.token)?e:i.jsx(x5,{to:"/login",replace:!0})}function bv(){const{nav:e,channelId:t}=Px(),r=pr(),{resolveChatSlug:o}=ni(),[s,a]=Le.useState(!1),l=["home","feed","chats","users","groups","channels","courses","arena","meets","profile","login","register","join"];return Le.useEffect(()=>{let c;if(!e&&t)c=t;else if(e&&!l.includes(e)&&e!=="a")c=e;else return;a(!0),o(c).then(u=>{if(u&&u.jammId){const p=u.type==="group"||u.isGroup?`/groups/${u.jammId}`:`/users/${u.jammId}`;r(p,{replace:!0})}else r("/home",{replace:!0}),a(!1)}).catch(()=>{r("/home",{replace:!0}),a(!1)})},[e,t,r,o]),s?i.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg-color)",color:"var(--text-color)"},children:"Yuklanmoqda..."}):i.jsx(An,{})}function An({forcedNav:e}){const{nav:t,channelId:r,lessonId:o}=Px(),s=pr();return i.jsx(OI,{initialNav:e||t||"feed",initialChannel:r||"0",initialLesson:o,navigate:s})}function oD(){return i.jsx(S5,{children:i.jsxs($M,{children:[i.jsx(AE,{position:"top-center",containerStyle:{zIndex:99999}}),i.jsx(qE,{children:i.jsx(ZE,{children:i.jsx(p$,{children:i.jsx(CP,{children:i.jsx(C7,{children:i.jsxs(m5,{children:[i.jsx(nr,{path:"/login",element:i.jsx(hL,{})}),i.jsx(nr,{path:"/join/:roomId",element:i.jsx(nD,{})}),i.jsx(nr,{path:"/arena",element:i.jsx(An,{forcedNav:"arena"})}),i.jsx(nr,{path:"/arena/:channelId",element:i.jsx(An,{forcedNav:"arena"})}),i.jsx(nr,{path:"/arena/:channelId/:lessonId",element:i.jsx(An,{forcedNav:"arena"})}),i.jsx(nr,{path:"/arena/quiz/:channelId",element:i.jsx(An,{forcedNav:"arena"})}),i.jsx(nr,{path:"/arena/quiz/:channelId/:lessonId",element:i.jsx(An,{forcedNav:"arena"})}),i.jsx(nr,{path:"/",element:i.jsx(ta,{children:i.jsx(FI,{})})}),i.jsx(nr,{path:"/a/:channelId",element:i.jsx(ta,{children:i.jsx(bv,{})})}),i.jsx(nr,{path:"/:nav",element:i.jsx(ta,{children:i.jsx(bv,{})})}),i.jsx(nr,{path:"/:nav/:channelId",element:i.jsx(ta,{children:i.jsx(An,{})})}),i.jsx(nr,{path:"/:nav/:channelId/:lessonId",element:i.jsx(ta,{children:i.jsx(An,{})})})]})})})})})})]})})}const iD=new kC;Xp.createRoot(document.getElementById("root")).render(i.jsx(SC,{client:iD,children:i.jsx(oD,{})}));
