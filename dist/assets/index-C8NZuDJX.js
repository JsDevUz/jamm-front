var Fm=e=>{throw TypeError(e)};var vp=(e,t,r)=>t.has(e)||Fm("Cannot "+r);var te=(e,t,r)=>(vp(e,t,"read from private field"),r?r.call(e):t.get(e)),Ue=(e,t,r)=>t.has(e)?Fm("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),Ae=(e,t,r,o)=>(vp(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r),$t=(e,t,r)=>(vp(e,t,"access private method"),r);var pc=(e,t,r,o)=>({set _(i){Ae(e,t,i,r)},get _(){return te(e,t,o)}});function pC(e,t){for(var r=0;r<t.length;r++){const o=t[r];if(typeof o!="string"&&!Array.isArray(o)){for(const i in o)if(i!=="default"&&!(i in e)){const s=Object.getOwnPropertyDescriptor(o,i);s&&Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:()=>o[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var Vx=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Wx(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Q2={exports:{}},_u={},K2={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gl=Symbol.for("react.element"),hC=Symbol.for("react.portal"),fC=Symbol.for("react.fragment"),xC=Symbol.for("react.strict_mode"),gC=Symbol.for("react.profiler"),mC=Symbol.for("react.provider"),yC=Symbol.for("react.context"),vC=Symbol.for("react.forward_ref"),bC=Symbol.for("react.suspense"),wC=Symbol.for("react.memo"),kC=Symbol.for("react.lazy"),Nm=Symbol.iterator;function jC(e){return e===null||typeof e!="object"?null:(e=Nm&&e[Nm]||e["@@iterator"],typeof e=="function"?e:null)}var J2={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},X2=Object.assign,Z2={};function Gs(e,t,r){this.props=e,this.context=t,this.refs=Z2,this.updater=r||J2}Gs.prototype.isReactComponent={};Gs.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Gs.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ew(){}ew.prototype=Gs.prototype;function Gx(e,t,r){this.props=e,this.context=t,this.refs=Z2,this.updater=r||J2}var Qx=Gx.prototype=new ew;Qx.constructor=Gx;X2(Qx,Gs.prototype);Qx.isPureReactComponent=!0;var qm=Array.isArray,tw=Object.prototype.hasOwnProperty,Kx={current:null},rw={key:!0,ref:!0,__self:!0,__source:!0};function nw(e,t,r){var o,i={},s=null,a=null;if(t!=null)for(o in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)tw.call(t,o)&&!rw.hasOwnProperty(o)&&(i[o]=t[o]);var c=arguments.length-2;if(c===1)i.children=r;else if(1<c){for(var d=Array(c),p=0;p<c;p++)d[p]=arguments[p+2];i.children=d}if(e&&e.defaultProps)for(o in c=e.defaultProps,c)i[o]===void 0&&(i[o]=c[o]);return{$$typeof:Gl,type:e,key:s,ref:a,props:i,_owner:Kx.current}}function SC(e,t){return{$$typeof:Gl,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Jx(e){return typeof e=="object"&&e!==null&&e.$$typeof===Gl}function CC(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var Hm=/\/+/g;function bp(e,t){return typeof e=="object"&&e!==null&&e.key!=null?CC(""+e.key):t.toString(36)}function md(e,t,r,o,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Gl:case hC:a=!0}}if(a)return a=e,i=i(a),e=o===""?"."+bp(a,0):o,qm(i)?(r="",e!=null&&(r=e.replace(Hm,"$&/")+"/"),md(i,t,r,"",function(p){return p})):i!=null&&(Jx(i)&&(i=SC(i,r+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Hm,"$&/")+"/")+e)),t.push(i)),1;if(a=0,o=o===""?".":o+":",qm(e))for(var c=0;c<e.length;c++){s=e[c];var d=o+bp(s,c);a+=md(s,t,r,d,i)}else if(d=jC(e),typeof d=="function")for(e=d.call(e),c=0;!(s=e.next()).done;)s=s.value,d=o+bp(s,c++),a+=md(s,t,r,d,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function hc(e,t,r){if(e==null)return e;var o=[],i=0;return md(e,o,"","",function(s){return t.call(r,s,i++)}),o}function zC(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var cr={current:null},yd={transition:null},$C={ReactCurrentDispatcher:cr,ReactCurrentBatchConfig:yd,ReactCurrentOwner:Kx};function ow(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:hc,forEach:function(e,t,r){hc(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return hc(e,function(){t++}),t},toArray:function(e){return hc(e,function(t){return t})||[]},only:function(e){if(!Jx(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ke.Component=Gs;Ke.Fragment=fC;Ke.Profiler=gC;Ke.PureComponent=Gx;Ke.StrictMode=xC;Ke.Suspense=bC;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$C;Ke.act=ow;Ke.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=X2({},e.props),i=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=Kx.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(d in t)tw.call(t,d)&&!rw.hasOwnProperty(d)&&(o[d]=t[d]===void 0&&c!==void 0?c[d]:t[d])}var d=arguments.length-2;if(d===1)o.children=r;else if(1<d){c=Array(d);for(var p=0;p<d;p++)c[p]=arguments[p+2];o.children=c}return{$$typeof:Gl,type:e.type,key:i,ref:s,props:o,_owner:a}};Ke.createContext=function(e){return e={$$typeof:yC,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:mC,_context:e},e.Consumer=e};Ke.createElement=nw;Ke.createFactory=function(e){var t=nw.bind(null,e);return t.type=e,t};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(e){return{$$typeof:vC,render:e}};Ke.isValidElement=Jx;Ke.lazy=function(e){return{$$typeof:kC,_payload:{_status:-1,_result:e},_init:zC}};Ke.memo=function(e,t){return{$$typeof:wC,type:e,compare:t===void 0?null:t}};Ke.startTransition=function(e){var t=yd.transition;yd.transition={};try{e()}finally{yd.transition=t}};Ke.unstable_act=ow;Ke.useCallback=function(e,t){return cr.current.useCallback(e,t)};Ke.useContext=function(e){return cr.current.useContext(e)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(e){return cr.current.useDeferredValue(e)};Ke.useEffect=function(e,t){return cr.current.useEffect(e,t)};Ke.useId=function(){return cr.current.useId()};Ke.useImperativeHandle=function(e,t,r){return cr.current.useImperativeHandle(e,t,r)};Ke.useInsertionEffect=function(e,t){return cr.current.useInsertionEffect(e,t)};Ke.useLayoutEffect=function(e,t){return cr.current.useLayoutEffect(e,t)};Ke.useMemo=function(e,t){return cr.current.useMemo(e,t)};Ke.useReducer=function(e,t,r){return cr.current.useReducer(e,t,r)};Ke.useRef=function(e){return cr.current.useRef(e)};Ke.useState=function(e){return cr.current.useState(e)};Ke.useSyncExternalStore=function(e,t,r){return cr.current.useSyncExternalStore(e,t,r)};Ke.useTransition=function(){return cr.current.useTransition()};Ke.version="18.3.1";K2.exports=Ke;var u=K2.exports;const Qe=Wx(u),_C=pC({__proto__:null,default:Qe},[u]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var TC=u,EC=Symbol.for("react.element"),RC=Symbol.for("react.fragment"),PC=Object.prototype.hasOwnProperty,MC=TC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,IC={key:!0,ref:!0,__self:!0,__source:!0};function iw(e,t,r){var o,i={},s=null,a=null;r!==void 0&&(s=""+r),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(o in t)PC.call(t,o)&&!IC.hasOwnProperty(o)&&(i[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps,t)i[o]===void 0&&(i[o]=t[o]);return{$$typeof:EC,type:e,key:s,ref:a,props:i,_owner:MC.current}}_u.Fragment=RC;_u.jsx=iw;_u.jsxs=iw;Q2.exports=_u;var n=Q2.exports,uf={},sw={exports:{}},_r={},aw={exports:{}},lw={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,q){var $=P.length;P.push(q);e:for(;0<$;){var E=$-1>>>1,I=P[E];if(0<i(I,q))P[E]=q,P[$]=I,$=E;else break e}}function r(P){return P.length===0?null:P[0]}function o(P){if(P.length===0)return null;var q=P[0],$=P.pop();if($!==q){P[0]=$;e:for(var E=0,I=P.length,N=I>>>1;E<N;){var J=2*(E+1)-1,Y=P[J],L=J+1,H=P[L];if(0>i(Y,$))L<I&&0>i(H,Y)?(P[E]=H,P[L]=$,E=L):(P[E]=Y,P[J]=$,E=J);else if(L<I&&0>i(H,$))P[E]=H,P[L]=$,E=L;else break e}}return q}function i(P,q){var $=P.sortIndex-q.sortIndex;return $!==0?$:P.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,c=a.now();e.unstable_now=function(){return a.now()-c}}var d=[],p=[],h=1,f=null,x=3,S=!1,m=!1,b=!1,w=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(P){for(var q=r(p);q!==null;){if(q.callback===null)o(p);else if(q.startTime<=P)o(p),q.sortIndex=q.expirationTime,t(d,q);else break;q=r(p)}}function g(P){if(b=!1,y(P),!m)if(r(d)!==null)m=!0,T(k);else{var q=r(p);q!==null&&F(g,q.startTime-P)}}function k(P,q){m=!1,b&&(b=!1,j(z),z=-1),S=!0;var $=x;try{for(y(q),f=r(d);f!==null&&(!(f.expirationTime>q)||P&&!V());){var E=f.callback;if(typeof E=="function"){f.callback=null,x=f.priorityLevel;var I=E(f.expirationTime<=q);q=e.unstable_now(),typeof I=="function"?f.callback=I:f===r(d)&&o(d),y(q)}else o(d);f=r(d)}if(f!==null)var N=!0;else{var J=r(p);J!==null&&F(g,J.startTime-q),N=!1}return N}finally{f=null,x=$,S=!1}}var C=!1,_=null,z=-1,D=5,B=-1;function V(){return!(e.unstable_now()-B<D)}function R(){if(_!==null){var P=e.unstable_now();B=P;var q=!0;try{q=_(!0,P)}finally{q?M():(C=!1,_=null)}}else C=!1}var M;if(typeof v=="function")M=function(){v(R)};else if(typeof MessageChannel<"u"){var A=new MessageChannel,O=A.port2;A.port1.onmessage=R,M=function(){O.postMessage(null)}}else M=function(){w(R,0)};function T(P){_=P,C||(C=!0,M())}function F(P,q){z=w(function(){P(e.unstable_now())},q)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){m||S||(m=!0,T(k))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):D=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return r(d)},e.unstable_next=function(P){switch(x){case 1:case 2:case 3:var q=3;break;default:q=x}var $=x;x=q;try{return P()}finally{x=$}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,q){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var $=x;x=P;try{return q()}finally{x=$}},e.unstable_scheduleCallback=function(P,q,$){var E=e.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?E+$:E):$=E,P){case 1:var I=-1;break;case 2:I=250;break;case 5:I=1073741823;break;case 4:I=1e4;break;default:I=5e3}return I=$+I,P={id:h++,callback:q,priorityLevel:P,startTime:$,expirationTime:I,sortIndex:-1},$>E?(P.sortIndex=$,t(p,P),r(d)===null&&P===r(p)&&(b?(j(z),z=-1):b=!0,F(g,$-E))):(P.sortIndex=I,t(d,P),m||S||(m=!0,T(k))),P},e.unstable_shouldYield=V,e.unstable_wrapCallback=function(P){var q=x;return function(){var $=x;x=q;try{return P.apply(this,arguments)}finally{x=$}}}})(lw);aw.exports=lw;var AC=aw.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var OC=u,$r=AC;function ge(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var cw=new Set,wl={};function Oi(e,t){Is(e,t),Is(e+"Capture",t)}function Is(e,t){for(wl[e]=t,e=0;e<t.length;e++)cw.add(t[e])}var Vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),pf=Object.prototype.hasOwnProperty,LC=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Um={},Ym={};function BC(e){return pf.call(Ym,e)?!0:pf.call(Um,e)?!1:LC.test(e)?Ym[e]=!0:(Um[e]=!0,!1)}function DC(e,t,r,o){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return o?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function FC(e,t,r,o){if(t===null||typeof t>"u"||DC(e,t,r,o))return!0;if(o)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function dr(e,t,r,o,i,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=o,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var Gt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Gt[e]=new dr(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Gt[t]=new dr(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Gt[e]=new dr(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Gt[e]=new dr(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Gt[e]=new dr(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Gt[e]=new dr(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Gt[e]=new dr(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Gt[e]=new dr(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Gt[e]=new dr(e,5,!1,e.toLowerCase(),null,!1,!1)});var Xx=/[\-:]([a-z])/g;function Zx(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Xx,Zx);Gt[t]=new dr(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Xx,Zx);Gt[t]=new dr(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Xx,Zx);Gt[t]=new dr(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Gt[e]=new dr(e,1,!1,e.toLowerCase(),null,!1,!1)});Gt.xlinkHref=new dr("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Gt[e]=new dr(e,1,!1,e.toLowerCase(),null,!0,!0)});function eg(e,t,r,o){var i=Gt.hasOwnProperty(t)?Gt[t]:null;(i!==null?i.type!==0:o||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(FC(t,r,i,o)&&(r=null),o||i===null?BC(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(t=i.attributeName,o=i.attributeNamespace,r===null?e.removeAttribute(t):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,o?e.setAttributeNS(o,t,r):e.setAttribute(t,r))))}var Jn=OC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fc=Symbol.for("react.element"),os=Symbol.for("react.portal"),is=Symbol.for("react.fragment"),tg=Symbol.for("react.strict_mode"),hf=Symbol.for("react.profiler"),dw=Symbol.for("react.provider"),uw=Symbol.for("react.context"),rg=Symbol.for("react.forward_ref"),ff=Symbol.for("react.suspense"),xf=Symbol.for("react.suspense_list"),ng=Symbol.for("react.memo"),lo=Symbol.for("react.lazy"),pw=Symbol.for("react.offscreen"),Vm=Symbol.iterator;function ca(e){return e===null||typeof e!="object"?null:(e=Vm&&e[Vm]||e["@@iterator"],typeof e=="function"?e:null)}var wt=Object.assign,wp;function Za(e){if(wp===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);wp=t&&t[1]||""}return`
`+wp+e}var kp=!1;function jp(e,t){if(!e||kp)return"";kp=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var o=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){o=p}e.call(t.prototype)}else{try{throw Error()}catch(p){o=p}e()}}catch(p){if(p&&o&&typeof p.stack=="string"){for(var i=p.stack.split(`
`),s=o.stack.split(`
`),a=i.length-1,c=s.length-1;1<=a&&0<=c&&i[a]!==s[c];)c--;for(;1<=a&&0<=c;a--,c--)if(i[a]!==s[c]){if(a!==1||c!==1)do if(a--,c--,0>c||i[a]!==s[c]){var d=`
`+i[a].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=a&&0<=c);break}}}finally{kp=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Za(e):""}function NC(e){switch(e.tag){case 5:return Za(e.type);case 16:return Za("Lazy");case 13:return Za("Suspense");case 19:return Za("SuspenseList");case 0:case 2:case 15:return e=jp(e.type,!1),e;case 11:return e=jp(e.type.render,!1),e;case 1:return e=jp(e.type,!0),e;default:return""}}function gf(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case is:return"Fragment";case os:return"Portal";case hf:return"Profiler";case tg:return"StrictMode";case ff:return"Suspense";case xf:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case uw:return(e.displayName||"Context")+".Consumer";case dw:return(e._context.displayName||"Context")+".Provider";case rg:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ng:return t=e.displayName||null,t!==null?t:gf(e.type)||"Memo";case lo:t=e._payload,e=e._init;try{return gf(e(t))}catch{}}return null}function qC(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return gf(t);case 8:return t===tg?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Lo(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hw(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function HC(e){var t=hw(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),o=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,s=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){o=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return o},setValue:function(a){o=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function xc(e){e._valueTracker||(e._valueTracker=HC(e))}function fw(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),o="";return e&&(o=hw(e)?e.checked?"true":"false":e.value),e=o,e!==r?(t.setValue(e),!0):!1}function Yd(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function mf(e,t){var r=t.checked;return wt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Wm(e,t){var r=t.defaultValue==null?"":t.defaultValue,o=t.checked!=null?t.checked:t.defaultChecked;r=Lo(t.value!=null?t.value:r),e._wrapperState={initialChecked:o,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function xw(e,t){t=t.checked,t!=null&&eg(e,"checked",t,!1)}function yf(e,t){xw(e,t);var r=Lo(t.value),o=t.type;if(r!=null)o==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(o==="submit"||o==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?vf(e,t.type,r):t.hasOwnProperty("defaultValue")&&vf(e,t.type,Lo(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Gm(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var o=t.type;if(!(o!=="submit"&&o!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function vf(e,t,r){(t!=="number"||Yd(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var el=Array.isArray;function ys(e,t,r,o){if(e=e.options,t){t={};for(var i=0;i<r.length;i++)t["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=t.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&o&&(e[r].defaultSelected=!0)}else{for(r=""+Lo(r),t=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,o&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function bf(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(ge(91));return wt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Qm(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(ge(92));if(el(r)){if(1<r.length)throw Error(ge(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Lo(r)}}function gw(e,t){var r=Lo(t.value),o=Lo(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),o!=null&&(e.defaultValue=""+o)}function Km(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function mw(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wf(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?mw(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var gc,yw=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,o,i){MSApp.execUnsafeLocalFunction(function(){return e(t,r,o,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(gc=gc||document.createElement("div"),gc.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=gc.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function kl(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var sl={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},UC=["Webkit","ms","Moz","O"];Object.keys(sl).forEach(function(e){UC.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),sl[t]=sl[e]})});function vw(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||sl.hasOwnProperty(e)&&sl[e]?(""+t).trim():t+"px"}function bw(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var o=r.indexOf("--")===0,i=vw(r,t[r],o);r==="float"&&(r="cssFloat"),o?e.setProperty(r,i):e[r]=i}}var YC=wt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kf(e,t){if(t){if(YC[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(ge(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(ge(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(ge(61))}if(t.style!=null&&typeof t.style!="object")throw Error(ge(62))}}function jf(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Sf=null;function og(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Cf=null,vs=null,bs=null;function Jm(e){if(e=Jl(e)){if(typeof Cf!="function")throw Error(ge(280));var t=e.stateNode;t&&(t=Mu(t),Cf(e.stateNode,e.type,t))}}function ww(e){vs?bs?bs.push(e):bs=[e]:vs=e}function kw(){if(vs){var e=vs,t=bs;if(bs=vs=null,Jm(e),t)for(e=0;e<t.length;e++)Jm(t[e])}}function jw(e,t){return e(t)}function Sw(){}var Sp=!1;function Cw(e,t,r){if(Sp)return e(t,r);Sp=!0;try{return jw(e,t,r)}finally{Sp=!1,(vs!==null||bs!==null)&&(Sw(),kw())}}function jl(e,t){var r=e.stateNode;if(r===null)return null;var o=Mu(r);if(o===null)return null;r=o[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(ge(231,t,typeof r));return r}var zf=!1;if(Vn)try{var da={};Object.defineProperty(da,"passive",{get:function(){zf=!0}}),window.addEventListener("test",da,da),window.removeEventListener("test",da,da)}catch{zf=!1}function VC(e,t,r,o,i,s,a,c,d){var p=Array.prototype.slice.call(arguments,3);try{t.apply(r,p)}catch(h){this.onError(h)}}var al=!1,Vd=null,Wd=!1,$f=null,WC={onError:function(e){al=!0,Vd=e}};function GC(e,t,r,o,i,s,a,c,d){al=!1,Vd=null,VC.apply(WC,arguments)}function QC(e,t,r,o,i,s,a,c,d){if(GC.apply(this,arguments),al){if(al){var p=Vd;al=!1,Vd=null}else throw Error(ge(198));Wd||(Wd=!0,$f=p)}}function Li(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function zw(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xm(e){if(Li(e)!==e)throw Error(ge(188))}function KC(e){var t=e.alternate;if(!t){if(t=Li(e),t===null)throw Error(ge(188));return t!==e?null:e}for(var r=e,o=t;;){var i=r.return;if(i===null)break;var s=i.alternate;if(s===null){if(o=i.return,o!==null){r=o;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===r)return Xm(i),e;if(s===o)return Xm(i),t;s=s.sibling}throw Error(ge(188))}if(r.return!==o.return)r=i,o=s;else{for(var a=!1,c=i.child;c;){if(c===r){a=!0,r=i,o=s;break}if(c===o){a=!0,o=i,r=s;break}c=c.sibling}if(!a){for(c=s.child;c;){if(c===r){a=!0,r=s,o=i;break}if(c===o){a=!0,o=s,r=i;break}c=c.sibling}if(!a)throw Error(ge(189))}}if(r.alternate!==o)throw Error(ge(190))}if(r.tag!==3)throw Error(ge(188));return r.stateNode.current===r?e:t}function $w(e){return e=KC(e),e!==null?_w(e):null}function _w(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=_w(e);if(t!==null)return t;e=e.sibling}return null}var Tw=$r.unstable_scheduleCallback,Zm=$r.unstable_cancelCallback,JC=$r.unstable_shouldYield,XC=$r.unstable_requestPaint,_t=$r.unstable_now,ZC=$r.unstable_getCurrentPriorityLevel,ig=$r.unstable_ImmediatePriority,Ew=$r.unstable_UserBlockingPriority,Gd=$r.unstable_NormalPriority,e5=$r.unstable_LowPriority,Rw=$r.unstable_IdlePriority,Tu=null,Sn=null;function t5(e){if(Sn&&typeof Sn.onCommitFiberRoot=="function")try{Sn.onCommitFiberRoot(Tu,e,void 0,(e.current.flags&128)===128)}catch{}}var nn=Math.clz32?Math.clz32:o5,r5=Math.log,n5=Math.LN2;function o5(e){return e>>>=0,e===0?32:31-(r5(e)/n5|0)|0}var mc=64,yc=4194304;function tl(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Qd(e,t){var r=e.pendingLanes;if(r===0)return 0;var o=0,i=e.suspendedLanes,s=e.pingedLanes,a=r&268435455;if(a!==0){var c=a&~i;c!==0?o=tl(c):(s&=a,s!==0&&(o=tl(s)))}else a=r&~i,a!==0?o=tl(a):s!==0&&(o=tl(s));if(o===0)return 0;if(t!==0&&t!==o&&!(t&i)&&(i=o&-o,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(o&4&&(o|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=o;0<t;)r=31-nn(t),i=1<<r,o|=e[r],t&=~i;return o}function i5(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function s5(e,t){for(var r=e.suspendedLanes,o=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-nn(s),c=1<<a,d=i[a];d===-1?(!(c&r)||c&o)&&(i[a]=i5(c,t)):d<=t&&(e.expiredLanes|=c),s&=~c}}function _f(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pw(){var e=mc;return mc<<=1,!(mc&4194240)&&(mc=64),e}function Cp(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Ql(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-nn(t),e[t]=r}function a5(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var o=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-nn(r),s=1<<i;t[i]=0,o[i]=-1,e[i]=-1,r&=~s}}function sg(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var o=31-nn(r),i=1<<o;i&t|e[o]&t&&(e[o]|=t),r&=~i}}var lt=0;function Mw(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Iw,ag,Aw,Ow,Lw,Tf=!1,vc=[],zo=null,$o=null,_o=null,Sl=new Map,Cl=new Map,po=[],l5="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function e0(e,t){switch(e){case"focusin":case"focusout":zo=null;break;case"dragenter":case"dragleave":$o=null;break;case"mouseover":case"mouseout":_o=null;break;case"pointerover":case"pointerout":Sl.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cl.delete(t.pointerId)}}function ua(e,t,r,o,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:r,eventSystemFlags:o,nativeEvent:s,targetContainers:[i]},t!==null&&(t=Jl(t),t!==null&&ag(t)),e):(e.eventSystemFlags|=o,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function c5(e,t,r,o,i){switch(t){case"focusin":return zo=ua(zo,e,t,r,o,i),!0;case"dragenter":return $o=ua($o,e,t,r,o,i),!0;case"mouseover":return _o=ua(_o,e,t,r,o,i),!0;case"pointerover":var s=i.pointerId;return Sl.set(s,ua(Sl.get(s)||null,e,t,r,o,i)),!0;case"gotpointercapture":return s=i.pointerId,Cl.set(s,ua(Cl.get(s)||null,e,t,r,o,i)),!0}return!1}function Bw(e){var t=li(e.target);if(t!==null){var r=Li(t);if(r!==null){if(t=r.tag,t===13){if(t=zw(r),t!==null){e.blockedOn=t,Lw(e.priority,function(){Aw(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vd(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Ef(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var o=new r.constructor(r.type,r);Sf=o,r.target.dispatchEvent(o),Sf=null}else return t=Jl(r),t!==null&&ag(t),e.blockedOn=r,!1;t.shift()}return!0}function t0(e,t,r){vd(e)&&r.delete(t)}function d5(){Tf=!1,zo!==null&&vd(zo)&&(zo=null),$o!==null&&vd($o)&&($o=null),_o!==null&&vd(_o)&&(_o=null),Sl.forEach(t0),Cl.forEach(t0)}function pa(e,t){e.blockedOn===t&&(e.blockedOn=null,Tf||(Tf=!0,$r.unstable_scheduleCallback($r.unstable_NormalPriority,d5)))}function zl(e){function t(i){return pa(i,e)}if(0<vc.length){pa(vc[0],e);for(var r=1;r<vc.length;r++){var o=vc[r];o.blockedOn===e&&(o.blockedOn=null)}}for(zo!==null&&pa(zo,e),$o!==null&&pa($o,e),_o!==null&&pa(_o,e),Sl.forEach(t),Cl.forEach(t),r=0;r<po.length;r++)o=po[r],o.blockedOn===e&&(o.blockedOn=null);for(;0<po.length&&(r=po[0],r.blockedOn===null);)Bw(r),r.blockedOn===null&&po.shift()}var ws=Jn.ReactCurrentBatchConfig,Kd=!0;function u5(e,t,r,o){var i=lt,s=ws.transition;ws.transition=null;try{lt=1,lg(e,t,r,o)}finally{lt=i,ws.transition=s}}function p5(e,t,r,o){var i=lt,s=ws.transition;ws.transition=null;try{lt=4,lg(e,t,r,o)}finally{lt=i,ws.transition=s}}function lg(e,t,r,o){if(Kd){var i=Ef(e,t,r,o);if(i===null)Ap(e,t,o,Jd,r),e0(e,o);else if(c5(i,e,t,r,o))o.stopPropagation();else if(e0(e,o),t&4&&-1<l5.indexOf(e)){for(;i!==null;){var s=Jl(i);if(s!==null&&Iw(s),s=Ef(e,t,r,o),s===null&&Ap(e,t,o,Jd,r),s===i)break;i=s}i!==null&&o.stopPropagation()}else Ap(e,t,o,null,r)}}var Jd=null;function Ef(e,t,r,o){if(Jd=null,e=og(o),e=li(e),e!==null)if(t=Li(e),t===null)e=null;else if(r=t.tag,r===13){if(e=zw(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Jd=e,null}function Dw(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ZC()){case ig:return 1;case Ew:return 4;case Gd:case e5:return 16;case Rw:return 536870912;default:return 16}default:return 16}}var jo=null,cg=null,bd=null;function Fw(){if(bd)return bd;var e,t=cg,r=t.length,o,i="value"in jo?jo.value:jo.textContent,s=i.length;for(e=0;e<r&&t[e]===i[e];e++);var a=r-e;for(o=1;o<=a&&t[r-o]===i[s-o];o++);return bd=i.slice(e,1<o?1-o:void 0)}function wd(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function bc(){return!0}function r0(){return!1}function Tr(e){function t(r,o,i,s,a){this._reactName=r,this._targetInst=i,this.type=o,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?bc:r0,this.isPropagationStopped=r0,this}return wt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=bc)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=bc)},persist:function(){},isPersistent:bc}),t}var Qs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dg=Tr(Qs),Kl=wt({},Qs,{view:0,detail:0}),h5=Tr(Kl),zp,$p,ha,Eu=wt({},Kl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ug,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==ha&&(ha&&e.type==="mousemove"?(zp=e.screenX-ha.screenX,$p=e.screenY-ha.screenY):$p=zp=0,ha=e),zp)},movementY:function(e){return"movementY"in e?e.movementY:$p}}),n0=Tr(Eu),f5=wt({},Eu,{dataTransfer:0}),x5=Tr(f5),g5=wt({},Kl,{relatedTarget:0}),_p=Tr(g5),m5=wt({},Qs,{animationName:0,elapsedTime:0,pseudoElement:0}),y5=Tr(m5),v5=wt({},Qs,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),b5=Tr(v5),w5=wt({},Qs,{data:0}),o0=Tr(w5),k5={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},j5={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},S5={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function C5(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=S5[e])?!!t[e]:!1}function ug(){return C5}var z5=wt({},Kl,{key:function(e){if(e.key){var t=k5[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=wd(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?j5[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ug,charCode:function(e){return e.type==="keypress"?wd(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?wd(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),$5=Tr(z5),_5=wt({},Eu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),i0=Tr(_5),T5=wt({},Kl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ug}),E5=Tr(T5),R5=wt({},Qs,{propertyName:0,elapsedTime:0,pseudoElement:0}),P5=Tr(R5),M5=wt({},Eu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),I5=Tr(M5),A5=[9,13,27,32],pg=Vn&&"CompositionEvent"in window,ll=null;Vn&&"documentMode"in document&&(ll=document.documentMode);var O5=Vn&&"TextEvent"in window&&!ll,Nw=Vn&&(!pg||ll&&8<ll&&11>=ll),s0=" ",a0=!1;function qw(e,t){switch(e){case"keyup":return A5.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hw(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ss=!1;function L5(e,t){switch(e){case"compositionend":return Hw(t);case"keypress":return t.which!==32?null:(a0=!0,s0);case"textInput":return e=t.data,e===s0&&a0?null:e;default:return null}}function B5(e,t){if(ss)return e==="compositionend"||!pg&&qw(e,t)?(e=Fw(),bd=cg=jo=null,ss=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Nw&&t.locale!=="ko"?null:t.data;default:return null}}var D5={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function l0(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!D5[e.type]:t==="textarea"}function Uw(e,t,r,o){ww(o),t=Xd(t,"onChange"),0<t.length&&(r=new dg("onChange","change",null,r,o),e.push({event:r,listeners:t}))}var cl=null,$l=null;function F5(e){tk(e,0)}function Ru(e){var t=cs(e);if(fw(t))return e}function N5(e,t){if(e==="change")return t}var Yw=!1;if(Vn){var Tp;if(Vn){var Ep="oninput"in document;if(!Ep){var c0=document.createElement("div");c0.setAttribute("oninput","return;"),Ep=typeof c0.oninput=="function"}Tp=Ep}else Tp=!1;Yw=Tp&&(!document.documentMode||9<document.documentMode)}function d0(){cl&&(cl.detachEvent("onpropertychange",Vw),$l=cl=null)}function Vw(e){if(e.propertyName==="value"&&Ru($l)){var t=[];Uw(t,$l,e,og(e)),Cw(F5,t)}}function q5(e,t,r){e==="focusin"?(d0(),cl=t,$l=r,cl.attachEvent("onpropertychange",Vw)):e==="focusout"&&d0()}function H5(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ru($l)}function U5(e,t){if(e==="click")return Ru(t)}function Y5(e,t){if(e==="input"||e==="change")return Ru(t)}function V5(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var an=typeof Object.is=="function"?Object.is:V5;function _l(e,t){if(an(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),o=Object.keys(t);if(r.length!==o.length)return!1;for(o=0;o<r.length;o++){var i=r[o];if(!pf.call(t,i)||!an(e[i],t[i]))return!1}return!0}function u0(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function p0(e,t){var r=u0(e);e=0;for(var o;r;){if(r.nodeType===3){if(o=e+r.textContent.length,e<=t&&o>=t)return{node:r,offset:t-e};e=o}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=u0(r)}}function Ww(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ww(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gw(){for(var e=window,t=Yd();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=Yd(e.document)}return t}function hg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function W5(e){var t=Gw(),r=e.focusedElem,o=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Ww(r.ownerDocument.documentElement,r)){if(o!==null&&hg(r)){if(t=o.start,e=o.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,s=Math.min(o.start,i);o=o.end===void 0?s:Math.min(o.end,i),!e.extend&&s>o&&(i=o,o=s,s=i),i=p0(r,s);var a=p0(r,o);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>o?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var G5=Vn&&"documentMode"in document&&11>=document.documentMode,as=null,Rf=null,dl=null,Pf=!1;function h0(e,t,r){var o=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Pf||as==null||as!==Yd(o)||(o=as,"selectionStart"in o&&hg(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),dl&&_l(dl,o)||(dl=o,o=Xd(Rf,"onSelect"),0<o.length&&(t=new dg("onSelect","select",null,t,r),e.push({event:t,listeners:o}),t.target=as)))}function wc(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ls={animationend:wc("Animation","AnimationEnd"),animationiteration:wc("Animation","AnimationIteration"),animationstart:wc("Animation","AnimationStart"),transitionend:wc("Transition","TransitionEnd")},Rp={},Qw={};Vn&&(Qw=document.createElement("div").style,"AnimationEvent"in window||(delete ls.animationend.animation,delete ls.animationiteration.animation,delete ls.animationstart.animation),"TransitionEvent"in window||delete ls.transitionend.transition);function Pu(e){if(Rp[e])return Rp[e];if(!ls[e])return e;var t=ls[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Qw)return Rp[e]=t[r];return e}var Kw=Pu("animationend"),Jw=Pu("animationiteration"),Xw=Pu("animationstart"),Zw=Pu("transitionend"),ek=new Map,f0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qo(e,t){ek.set(e,t),Oi(t,[e])}for(var Pp=0;Pp<f0.length;Pp++){var Mp=f0[Pp],Q5=Mp.toLowerCase(),K5=Mp[0].toUpperCase()+Mp.slice(1);qo(Q5,"on"+K5)}qo(Kw,"onAnimationEnd");qo(Jw,"onAnimationIteration");qo(Xw,"onAnimationStart");qo("dblclick","onDoubleClick");qo("focusin","onFocus");qo("focusout","onBlur");qo(Zw,"onTransitionEnd");Is("onMouseEnter",["mouseout","mouseover"]);Is("onMouseLeave",["mouseout","mouseover"]);Is("onPointerEnter",["pointerout","pointerover"]);Is("onPointerLeave",["pointerout","pointerover"]);Oi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Oi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Oi("onBeforeInput",["compositionend","keypress","textInput","paste"]);Oi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Oi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Oi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var rl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),J5=new Set("cancel close invalid load scroll toggle".split(" ").concat(rl));function x0(e,t,r){var o=e.type||"unknown-event";e.currentTarget=r,QC(o,t,void 0,e),e.currentTarget=null}function tk(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var o=e[r],i=o.event;o=o.listeners;e:{var s=void 0;if(t)for(var a=o.length-1;0<=a;a--){var c=o[a],d=c.instance,p=c.currentTarget;if(c=c.listener,d!==s&&i.isPropagationStopped())break e;x0(i,c,p),s=d}else for(a=0;a<o.length;a++){if(c=o[a],d=c.instance,p=c.currentTarget,c=c.listener,d!==s&&i.isPropagationStopped())break e;x0(i,c,p),s=d}}}if(Wd)throw e=$f,Wd=!1,$f=null,e}function ht(e,t){var r=t[Lf];r===void 0&&(r=t[Lf]=new Set);var o=e+"__bubble";r.has(o)||(rk(t,e,2,!1),r.add(o))}function Ip(e,t,r){var o=0;t&&(o|=4),rk(r,e,o,t)}var kc="_reactListening"+Math.random().toString(36).slice(2);function Tl(e){if(!e[kc]){e[kc]=!0,cw.forEach(function(r){r!=="selectionchange"&&(J5.has(r)||Ip(r,!1,e),Ip(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[kc]||(t[kc]=!0,Ip("selectionchange",!1,t))}}function rk(e,t,r,o){switch(Dw(t)){case 1:var i=u5;break;case 4:i=p5;break;default:i=lg}r=i.bind(null,t,r,e),i=void 0,!zf||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),o?i!==void 0?e.addEventListener(t,r,{capture:!0,passive:i}):e.addEventListener(t,r,!0):i!==void 0?e.addEventListener(t,r,{passive:i}):e.addEventListener(t,r,!1)}function Ap(e,t,r,o,i){var s=o;if(!(t&1)&&!(t&2)&&o!==null)e:for(;;){if(o===null)return;var a=o.tag;if(a===3||a===4){var c=o.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(a===4)for(a=o.return;a!==null;){var d=a.tag;if((d===3||d===4)&&(d=a.stateNode.containerInfo,d===i||d.nodeType===8&&d.parentNode===i))return;a=a.return}for(;c!==null;){if(a=li(c),a===null)return;if(d=a.tag,d===5||d===6){o=s=a;continue e}c=c.parentNode}}o=o.return}Cw(function(){var p=s,h=og(r),f=[];e:{var x=ek.get(e);if(x!==void 0){var S=dg,m=e;switch(e){case"keypress":if(wd(r)===0)break e;case"keydown":case"keyup":S=$5;break;case"focusin":m="focus",S=_p;break;case"focusout":m="blur",S=_p;break;case"beforeblur":case"afterblur":S=_p;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=n0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=x5;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=E5;break;case Kw:case Jw:case Xw:S=y5;break;case Zw:S=P5;break;case"scroll":S=h5;break;case"wheel":S=I5;break;case"copy":case"cut":case"paste":S=b5;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=i0}var b=(t&4)!==0,w=!b&&e==="scroll",j=b?x!==null?x+"Capture":null:x;b=[];for(var v=p,y;v!==null;){y=v;var g=y.stateNode;if(y.tag===5&&g!==null&&(y=g,j!==null&&(g=jl(v,j),g!=null&&b.push(El(v,g,y)))),w)break;v=v.return}0<b.length&&(x=new S(x,m,null,r,h),f.push({event:x,listeners:b}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",x&&r!==Sf&&(m=r.relatedTarget||r.fromElement)&&(li(m)||m[Wn]))break e;if((S||x)&&(x=h.window===h?h:(x=h.ownerDocument)?x.defaultView||x.parentWindow:window,S?(m=r.relatedTarget||r.toElement,S=p,m=m?li(m):null,m!==null&&(w=Li(m),m!==w||m.tag!==5&&m.tag!==6)&&(m=null)):(S=null,m=p),S!==m)){if(b=n0,g="onMouseLeave",j="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(b=i0,g="onPointerLeave",j="onPointerEnter",v="pointer"),w=S==null?x:cs(S),y=m==null?x:cs(m),x=new b(g,v+"leave",S,r,h),x.target=w,x.relatedTarget=y,g=null,li(h)===p&&(b=new b(j,v+"enter",m,r,h),b.target=y,b.relatedTarget=w,g=b),w=g,S&&m)t:{for(b=S,j=m,v=0,y=b;y;y=Wi(y))v++;for(y=0,g=j;g;g=Wi(g))y++;for(;0<v-y;)b=Wi(b),v--;for(;0<y-v;)j=Wi(j),y--;for(;v--;){if(b===j||j!==null&&b===j.alternate)break t;b=Wi(b),j=Wi(j)}b=null}else b=null;S!==null&&g0(f,x,S,b,!1),m!==null&&w!==null&&g0(f,w,m,b,!0)}}e:{if(x=p?cs(p):window,S=x.nodeName&&x.nodeName.toLowerCase(),S==="select"||S==="input"&&x.type==="file")var k=N5;else if(l0(x))if(Yw)k=Y5;else{k=H5;var C=q5}else(S=x.nodeName)&&S.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(k=U5);if(k&&(k=k(e,p))){Uw(f,k,r,h);break e}C&&C(e,x,p),e==="focusout"&&(C=x._wrapperState)&&C.controlled&&x.type==="number"&&vf(x,"number",x.value)}switch(C=p?cs(p):window,e){case"focusin":(l0(C)||C.contentEditable==="true")&&(as=C,Rf=p,dl=null);break;case"focusout":dl=Rf=as=null;break;case"mousedown":Pf=!0;break;case"contextmenu":case"mouseup":case"dragend":Pf=!1,h0(f,r,h);break;case"selectionchange":if(G5)break;case"keydown":case"keyup":h0(f,r,h)}var _;if(pg)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else ss?qw(e,r)&&(z="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(z="onCompositionStart");z&&(Nw&&r.locale!=="ko"&&(ss||z!=="onCompositionStart"?z==="onCompositionEnd"&&ss&&(_=Fw()):(jo=h,cg="value"in jo?jo.value:jo.textContent,ss=!0)),C=Xd(p,z),0<C.length&&(z=new o0(z,e,null,r,h),f.push({event:z,listeners:C}),_?z.data=_:(_=Hw(r),_!==null&&(z.data=_)))),(_=O5?L5(e,r):B5(e,r))&&(p=Xd(p,"onBeforeInput"),0<p.length&&(h=new o0("onBeforeInput","beforeinput",null,r,h),f.push({event:h,listeners:p}),h.data=_))}tk(f,t)})}function El(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Xd(e,t){for(var r=t+"Capture",o=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=jl(e,r),s!=null&&o.unshift(El(e,s,i)),s=jl(e,t),s!=null&&o.push(El(e,s,i))),e=e.return}return o}function Wi(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function g0(e,t,r,o,i){for(var s=t._reactName,a=[];r!==null&&r!==o;){var c=r,d=c.alternate,p=c.stateNode;if(d!==null&&d===o)break;c.tag===5&&p!==null&&(c=p,i?(d=jl(r,s),d!=null&&a.unshift(El(r,d,c))):i||(d=jl(r,s),d!=null&&a.push(El(r,d,c)))),r=r.return}a.length!==0&&e.push({event:t,listeners:a})}var X5=/\r\n?/g,Z5=/\u0000|\uFFFD/g;function m0(e){return(typeof e=="string"?e:""+e).replace(X5,`
`).replace(Z5,"")}function jc(e,t,r){if(t=m0(t),m0(e)!==t&&r)throw Error(ge(425))}function Zd(){}var Mf=null,If=null;function Af(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Of=typeof setTimeout=="function"?setTimeout:void 0,e8=typeof clearTimeout=="function"?clearTimeout:void 0,y0=typeof Promise=="function"?Promise:void 0,t8=typeof queueMicrotask=="function"?queueMicrotask:typeof y0<"u"?function(e){return y0.resolve(null).then(e).catch(r8)}:Of;function r8(e){setTimeout(function(){throw e})}function Op(e,t){var r=t,o=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(o===0){e.removeChild(i),zl(t);return}o--}else r!=="$"&&r!=="$?"&&r!=="$!"||o++;r=i}while(r);zl(t)}function To(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function v0(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Ks=Math.random().toString(36).slice(2),kn="__reactFiber$"+Ks,Rl="__reactProps$"+Ks,Wn="__reactContainer$"+Ks,Lf="__reactEvents$"+Ks,n8="__reactListeners$"+Ks,o8="__reactHandles$"+Ks;function li(e){var t=e[kn];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Wn]||r[kn]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=v0(e);e!==null;){if(r=e[kn])return r;e=v0(e)}return t}e=r,r=e.parentNode}return null}function Jl(e){return e=e[kn]||e[Wn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function cs(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(ge(33))}function Mu(e){return e[Rl]||null}var Bf=[],ds=-1;function Ho(e){return{current:e}}function gt(e){0>ds||(e.current=Bf[ds],Bf[ds]=null,ds--)}function pt(e,t){ds++,Bf[ds]=e.current,e.current=t}var Bo={},or=Ho(Bo),gr=Ho(!1),zi=Bo;function As(e,t){var r=e.type.contextTypes;if(!r)return Bo;var o=e.stateNode;if(o&&o.__reactInternalMemoizedUnmaskedChildContext===t)return o.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in r)i[s]=t[s];return o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function mr(e){return e=e.childContextTypes,e!=null}function eu(){gt(gr),gt(or)}function b0(e,t,r){if(or.current!==Bo)throw Error(ge(168));pt(or,t),pt(gr,r)}function nk(e,t,r){var o=e.stateNode;if(t=t.childContextTypes,typeof o.getChildContext!="function")return r;o=o.getChildContext();for(var i in o)if(!(i in t))throw Error(ge(108,qC(e)||"Unknown",i));return wt({},r,o)}function tu(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Bo,zi=or.current,pt(or,e),pt(gr,gr.current),!0}function w0(e,t,r){var o=e.stateNode;if(!o)throw Error(ge(169));r?(e=nk(e,t,zi),o.__reactInternalMemoizedMergedChildContext=e,gt(gr),gt(or),pt(or,e)):gt(gr),pt(gr,r)}var Bn=null,Iu=!1,Lp=!1;function ok(e){Bn===null?Bn=[e]:Bn.push(e)}function i8(e){Iu=!0,ok(e)}function Uo(){if(!Lp&&Bn!==null){Lp=!0;var e=0,t=lt;try{var r=Bn;for(lt=1;e<r.length;e++){var o=r[e];do o=o(!0);while(o!==null)}Bn=null,Iu=!1}catch(i){throw Bn!==null&&(Bn=Bn.slice(e+1)),Tw(ig,Uo),i}finally{lt=t,Lp=!1}}return null}var us=[],ps=0,ru=null,nu=0,Ar=[],Or=0,$i=null,qn=1,Hn="";function oi(e,t){us[ps++]=nu,us[ps++]=ru,ru=e,nu=t}function ik(e,t,r){Ar[Or++]=qn,Ar[Or++]=Hn,Ar[Or++]=$i,$i=e;var o=qn;e=Hn;var i=32-nn(o)-1;o&=~(1<<i),r+=1;var s=32-nn(t)+i;if(30<s){var a=i-i%5;s=(o&(1<<a)-1).toString(32),o>>=a,i-=a,qn=1<<32-nn(t)+i|r<<i|o,Hn=s+e}else qn=1<<s|r<<i|o,Hn=e}function fg(e){e.return!==null&&(oi(e,1),ik(e,1,0))}function xg(e){for(;e===ru;)ru=us[--ps],us[ps]=null,nu=us[--ps],us[ps]=null;for(;e===$i;)$i=Ar[--Or],Ar[Or]=null,Hn=Ar[--Or],Ar[Or]=null,qn=Ar[--Or],Ar[Or]=null}var Cr=null,Sr=null,yt=!1,en=null;function sk(e,t){var r=Dr(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function k0(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Cr=e,Sr=To(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Cr=e,Sr=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=$i!==null?{id:qn,overflow:Hn}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Dr(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Cr=e,Sr=null,!0):!1;default:return!1}}function Df(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ff(e){if(yt){var t=Sr;if(t){var r=t;if(!k0(e,t)){if(Df(e))throw Error(ge(418));t=To(r.nextSibling);var o=Cr;t&&k0(e,t)?sk(o,r):(e.flags=e.flags&-4097|2,yt=!1,Cr=e)}}else{if(Df(e))throw Error(ge(418));e.flags=e.flags&-4097|2,yt=!1,Cr=e}}}function j0(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Cr=e}function Sc(e){if(e!==Cr)return!1;if(!yt)return j0(e),yt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Af(e.type,e.memoizedProps)),t&&(t=Sr)){if(Df(e))throw ak(),Error(ge(418));for(;t;)sk(e,t),t=To(t.nextSibling)}if(j0(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(ge(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Sr=To(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Sr=null}}else Sr=Cr?To(e.stateNode.nextSibling):null;return!0}function ak(){for(var e=Sr;e;)e=To(e.nextSibling)}function Os(){Sr=Cr=null,yt=!1}function gg(e){en===null?en=[e]:en.push(e)}var s8=Jn.ReactCurrentBatchConfig;function fa(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(ge(309));var o=r.stateNode}if(!o)throw Error(ge(147,e));var i=o,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var c=i.refs;a===null?delete c[s]:c[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(ge(284));if(!r._owner)throw Error(ge(290,e))}return e}function Cc(e,t){throw e=Object.prototype.toString.call(t),Error(ge(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function S0(e){var t=e._init;return t(e._payload)}function lk(e){function t(j,v){if(e){var y=j.deletions;y===null?(j.deletions=[v],j.flags|=16):y.push(v)}}function r(j,v){if(!e)return null;for(;v!==null;)t(j,v),v=v.sibling;return null}function o(j,v){for(j=new Map;v!==null;)v.key!==null?j.set(v.key,v):j.set(v.index,v),v=v.sibling;return j}function i(j,v){return j=Mo(j,v),j.index=0,j.sibling=null,j}function s(j,v,y){return j.index=y,e?(y=j.alternate,y!==null?(y=y.index,y<v?(j.flags|=2,v):y):(j.flags|=2,v)):(j.flags|=1048576,v)}function a(j){return e&&j.alternate===null&&(j.flags|=2),j}function c(j,v,y,g){return v===null||v.tag!==6?(v=Up(y,j.mode,g),v.return=j,v):(v=i(v,y),v.return=j,v)}function d(j,v,y,g){var k=y.type;return k===is?h(j,v,y.props.children,g,y.key):v!==null&&(v.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===lo&&S0(k)===v.type)?(g=i(v,y.props),g.ref=fa(j,v,y),g.return=j,g):(g=_d(y.type,y.key,y.props,null,j.mode,g),g.ref=fa(j,v,y),g.return=j,g)}function p(j,v,y,g){return v===null||v.tag!==4||v.stateNode.containerInfo!==y.containerInfo||v.stateNode.implementation!==y.implementation?(v=Yp(y,j.mode,g),v.return=j,v):(v=i(v,y.children||[]),v.return=j,v)}function h(j,v,y,g,k){return v===null||v.tag!==7?(v=wi(y,j.mode,g,k),v.return=j,v):(v=i(v,y),v.return=j,v)}function f(j,v,y){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Up(""+v,j.mode,y),v.return=j,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case fc:return y=_d(v.type,v.key,v.props,null,j.mode,y),y.ref=fa(j,null,v),y.return=j,y;case os:return v=Yp(v,j.mode,y),v.return=j,v;case lo:var g=v._init;return f(j,g(v._payload),y)}if(el(v)||ca(v))return v=wi(v,j.mode,y,null),v.return=j,v;Cc(j,v)}return null}function x(j,v,y,g){var k=v!==null?v.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return k!==null?null:c(j,v,""+y,g);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case fc:return y.key===k?d(j,v,y,g):null;case os:return y.key===k?p(j,v,y,g):null;case lo:return k=y._init,x(j,v,k(y._payload),g)}if(el(y)||ca(y))return k!==null?null:h(j,v,y,g,null);Cc(j,y)}return null}function S(j,v,y,g,k){if(typeof g=="string"&&g!==""||typeof g=="number")return j=j.get(y)||null,c(v,j,""+g,k);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case fc:return j=j.get(g.key===null?y:g.key)||null,d(v,j,g,k);case os:return j=j.get(g.key===null?y:g.key)||null,p(v,j,g,k);case lo:var C=g._init;return S(j,v,y,C(g._payload),k)}if(el(g)||ca(g))return j=j.get(y)||null,h(v,j,g,k,null);Cc(v,g)}return null}function m(j,v,y,g){for(var k=null,C=null,_=v,z=v=0,D=null;_!==null&&z<y.length;z++){_.index>z?(D=_,_=null):D=_.sibling;var B=x(j,_,y[z],g);if(B===null){_===null&&(_=D);break}e&&_&&B.alternate===null&&t(j,_),v=s(B,v,z),C===null?k=B:C.sibling=B,C=B,_=D}if(z===y.length)return r(j,_),yt&&oi(j,z),k;if(_===null){for(;z<y.length;z++)_=f(j,y[z],g),_!==null&&(v=s(_,v,z),C===null?k=_:C.sibling=_,C=_);return yt&&oi(j,z),k}for(_=o(j,_);z<y.length;z++)D=S(_,j,z,y[z],g),D!==null&&(e&&D.alternate!==null&&_.delete(D.key===null?z:D.key),v=s(D,v,z),C===null?k=D:C.sibling=D,C=D);return e&&_.forEach(function(V){return t(j,V)}),yt&&oi(j,z),k}function b(j,v,y,g){var k=ca(y);if(typeof k!="function")throw Error(ge(150));if(y=k.call(y),y==null)throw Error(ge(151));for(var C=k=null,_=v,z=v=0,D=null,B=y.next();_!==null&&!B.done;z++,B=y.next()){_.index>z?(D=_,_=null):D=_.sibling;var V=x(j,_,B.value,g);if(V===null){_===null&&(_=D);break}e&&_&&V.alternate===null&&t(j,_),v=s(V,v,z),C===null?k=V:C.sibling=V,C=V,_=D}if(B.done)return r(j,_),yt&&oi(j,z),k;if(_===null){for(;!B.done;z++,B=y.next())B=f(j,B.value,g),B!==null&&(v=s(B,v,z),C===null?k=B:C.sibling=B,C=B);return yt&&oi(j,z),k}for(_=o(j,_);!B.done;z++,B=y.next())B=S(_,j,z,B.value,g),B!==null&&(e&&B.alternate!==null&&_.delete(B.key===null?z:B.key),v=s(B,v,z),C===null?k=B:C.sibling=B,C=B);return e&&_.forEach(function(R){return t(j,R)}),yt&&oi(j,z),k}function w(j,v,y,g){if(typeof y=="object"&&y!==null&&y.type===is&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case fc:e:{for(var k=y.key,C=v;C!==null;){if(C.key===k){if(k=y.type,k===is){if(C.tag===7){r(j,C.sibling),v=i(C,y.props.children),v.return=j,j=v;break e}}else if(C.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===lo&&S0(k)===C.type){r(j,C.sibling),v=i(C,y.props),v.ref=fa(j,C,y),v.return=j,j=v;break e}r(j,C);break}else t(j,C);C=C.sibling}y.type===is?(v=wi(y.props.children,j.mode,g,y.key),v.return=j,j=v):(g=_d(y.type,y.key,y.props,null,j.mode,g),g.ref=fa(j,v,y),g.return=j,j=g)}return a(j);case os:e:{for(C=y.key;v!==null;){if(v.key===C)if(v.tag===4&&v.stateNode.containerInfo===y.containerInfo&&v.stateNode.implementation===y.implementation){r(j,v.sibling),v=i(v,y.children||[]),v.return=j,j=v;break e}else{r(j,v);break}else t(j,v);v=v.sibling}v=Yp(y,j.mode,g),v.return=j,j=v}return a(j);case lo:return C=y._init,w(j,v,C(y._payload),g)}if(el(y))return m(j,v,y,g);if(ca(y))return b(j,v,y,g);Cc(j,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,v!==null&&v.tag===6?(r(j,v.sibling),v=i(v,y),v.return=j,j=v):(r(j,v),v=Up(y,j.mode,g),v.return=j,j=v),a(j)):r(j,v)}return w}var Ls=lk(!0),ck=lk(!1),ou=Ho(null),iu=null,hs=null,mg=null;function yg(){mg=hs=iu=null}function vg(e){var t=ou.current;gt(ou),e._currentValue=t}function Nf(e,t,r){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===r)break;e=e.return}}function ks(e,t){iu=e,mg=hs=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(fr=!0),e.firstContext=null)}function Nr(e){var t=e._currentValue;if(mg!==e)if(e={context:e,memoizedValue:t,next:null},hs===null){if(iu===null)throw Error(ge(308));hs=e,iu.dependencies={lanes:0,firstContext:e}}else hs=hs.next=e;return t}var ci=null;function bg(e){ci===null?ci=[e]:ci.push(e)}function dk(e,t,r,o){var i=t.interleaved;return i===null?(r.next=r,bg(t)):(r.next=i.next,i.next=r),t.interleaved=r,Gn(e,o)}function Gn(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var co=!1;function wg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function uk(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Un(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Eo(e,t,r){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,Ze&2){var i=o.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),o.pending=t,Gn(e,r)}return i=o.interleaved,i===null?(t.next=t,bg(o)):(t.next=i.next,i.next=t),o.interleaved=t,Gn(e,r)}function kd(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,sg(e,r)}}function C0(e,t){var r=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,r===o)){var i=null,s=null;if(r=r.firstBaseUpdate,r!==null){do{var a={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};s===null?i=s=a:s=s.next=a,r=r.next}while(r!==null);s===null?i=s=t:s=s.next=t}else i=s=t;r={baseState:o.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:o.shared,effects:o.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function su(e,t,r,o){var i=e.updateQueue;co=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var d=c,p=d.next;d.next=null,a===null?s=p:a.next=p,a=d;var h=e.alternate;h!==null&&(h=h.updateQueue,c=h.lastBaseUpdate,c!==a&&(c===null?h.firstBaseUpdate=p:c.next=p,h.lastBaseUpdate=d))}if(s!==null){var f=i.baseState;a=0,h=p=d=null,c=s;do{var x=c.lane,S=c.eventTime;if((o&x)===x){h!==null&&(h=h.next={eventTime:S,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var m=e,b=c;switch(x=t,S=r,b.tag){case 1:if(m=b.payload,typeof m=="function"){f=m.call(S,f,x);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=b.payload,x=typeof m=="function"?m.call(S,f,x):m,x==null)break e;f=wt({},f,x);break e;case 2:co=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,x=i.effects,x===null?i.effects=[c]:x.push(c))}else S={eventTime:S,lane:x,tag:c.tag,payload:c.payload,callback:c.callback,next:null},h===null?(p=h=S,d=f):h=h.next=S,a|=x;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;x=c,c=x.next,x.next=null,i.lastBaseUpdate=x,i.shared.pending=null}}while(!0);if(h===null&&(d=f),i.baseState=d,i.firstBaseUpdate=p,i.lastBaseUpdate=h,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);Ti|=a,e.lanes=a,e.memoizedState=f}}function z0(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var o=e[t],i=o.callback;if(i!==null){if(o.callback=null,o=r,typeof i!="function")throw Error(ge(191,i));i.call(o)}}}var Xl={},Cn=Ho(Xl),Pl=Ho(Xl),Ml=Ho(Xl);function di(e){if(e===Xl)throw Error(ge(174));return e}function kg(e,t){switch(pt(Ml,t),pt(Pl,e),pt(Cn,Xl),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:wf(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=wf(t,e)}gt(Cn),pt(Cn,t)}function Bs(){gt(Cn),gt(Pl),gt(Ml)}function pk(e){di(Ml.current);var t=di(Cn.current),r=wf(t,e.type);t!==r&&(pt(Pl,e),pt(Cn,r))}function jg(e){Pl.current===e&&(gt(Cn),gt(Pl))}var vt=Ho(0);function au(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bp=[];function Sg(){for(var e=0;e<Bp.length;e++)Bp[e]._workInProgressVersionPrimary=null;Bp.length=0}var jd=Jn.ReactCurrentDispatcher,Dp=Jn.ReactCurrentBatchConfig,_i=0,bt=null,At=null,Dt=null,lu=!1,ul=!1,Il=0,a8=0;function Jt(){throw Error(ge(321))}function Cg(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!an(e[r],t[r]))return!1;return!0}function zg(e,t,r,o,i,s){if(_i=s,bt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,jd.current=e===null||e.memoizedState===null?u8:p8,e=r(o,i),ul){s=0;do{if(ul=!1,Il=0,25<=s)throw Error(ge(301));s+=1,Dt=At=null,t.updateQueue=null,jd.current=h8,e=r(o,i)}while(ul)}if(jd.current=cu,t=At!==null&&At.next!==null,_i=0,Dt=At=bt=null,lu=!1,t)throw Error(ge(300));return e}function $g(){var e=Il!==0;return Il=0,e}function gn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Dt===null?bt.memoizedState=Dt=e:Dt=Dt.next=e,Dt}function qr(){if(At===null){var e=bt.alternate;e=e!==null?e.memoizedState:null}else e=At.next;var t=Dt===null?bt.memoizedState:Dt.next;if(t!==null)Dt=t,At=e;else{if(e===null)throw Error(ge(310));At=e,e={memoizedState:At.memoizedState,baseState:At.baseState,baseQueue:At.baseQueue,queue:At.queue,next:null},Dt===null?bt.memoizedState=Dt=e:Dt=Dt.next=e}return Dt}function Al(e,t){return typeof t=="function"?t(e):t}function Fp(e){var t=qr(),r=t.queue;if(r===null)throw Error(ge(311));r.lastRenderedReducer=e;var o=At,i=o.baseQueue,s=r.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}o.baseQueue=i=s,r.pending=null}if(i!==null){s=i.next,o=o.baseState;var c=a=null,d=null,p=s;do{var h=p.lane;if((_i&h)===h)d!==null&&(d=d.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),o=p.hasEagerState?p.eagerState:e(o,p.action);else{var f={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};d===null?(c=d=f,a=o):d=d.next=f,bt.lanes|=h,Ti|=h}p=p.next}while(p!==null&&p!==s);d===null?a=o:d.next=c,an(o,t.memoizedState)||(fr=!0),t.memoizedState=o,t.baseState=a,t.baseQueue=d,r.lastRenderedState=o}if(e=r.interleaved,e!==null){i=e;do s=i.lane,bt.lanes|=s,Ti|=s,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Np(e){var t=qr(),r=t.queue;if(r===null)throw Error(ge(311));r.lastRenderedReducer=e;var o=r.dispatch,i=r.pending,s=t.memoizedState;if(i!==null){r.pending=null;var a=i=i.next;do s=e(s,a.action),a=a.next;while(a!==i);an(s,t.memoizedState)||(fr=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),r.lastRenderedState=s}return[s,o]}function hk(){}function fk(e,t){var r=bt,o=qr(),i=t(),s=!an(o.memoizedState,i);if(s&&(o.memoizedState=i,fr=!0),o=o.queue,_g(mk.bind(null,r,o,e),[e]),o.getSnapshot!==t||s||Dt!==null&&Dt.memoizedState.tag&1){if(r.flags|=2048,Ol(9,gk.bind(null,r,o,i,t),void 0,null),Nt===null)throw Error(ge(349));_i&30||xk(r,t,i)}return i}function xk(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function gk(e,t,r,o){t.value=r,t.getSnapshot=o,yk(t)&&vk(e)}function mk(e,t,r){return r(function(){yk(t)&&vk(e)})}function yk(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!an(e,r)}catch{return!0}}function vk(e){var t=Gn(e,1);t!==null&&on(t,e,1,-1)}function $0(e){var t=gn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Al,lastRenderedState:e},t.queue=e,e=e.dispatch=d8.bind(null,bt,e),[t.memoizedState,e]}function Ol(e,t,r,o){return e={tag:e,create:t,destroy:r,deps:o,next:null},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(o=r.next,r.next=e,e.next=o,t.lastEffect=e)),e}function bk(){return qr().memoizedState}function Sd(e,t,r,o){var i=gn();bt.flags|=e,i.memoizedState=Ol(1|t,r,void 0,o===void 0?null:o)}function Au(e,t,r,o){var i=qr();o=o===void 0?null:o;var s=void 0;if(At!==null){var a=At.memoizedState;if(s=a.destroy,o!==null&&Cg(o,a.deps)){i.memoizedState=Ol(t,r,s,o);return}}bt.flags|=e,i.memoizedState=Ol(1|t,r,s,o)}function _0(e,t){return Sd(8390656,8,e,t)}function _g(e,t){return Au(2048,8,e,t)}function wk(e,t){return Au(4,2,e,t)}function kk(e,t){return Au(4,4,e,t)}function jk(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Sk(e,t,r){return r=r!=null?r.concat([e]):null,Au(4,4,jk.bind(null,t,e),r)}function Tg(){}function Ck(e,t){var r=qr();t=t===void 0?null:t;var o=r.memoizedState;return o!==null&&t!==null&&Cg(t,o[1])?o[0]:(r.memoizedState=[e,t],e)}function zk(e,t){var r=qr();t=t===void 0?null:t;var o=r.memoizedState;return o!==null&&t!==null&&Cg(t,o[1])?o[0]:(e=e(),r.memoizedState=[e,t],e)}function $k(e,t,r){return _i&21?(an(r,t)||(r=Pw(),bt.lanes|=r,Ti|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,fr=!0),e.memoizedState=r)}function l8(e,t){var r=lt;lt=r!==0&&4>r?r:4,e(!0);var o=Dp.transition;Dp.transition={};try{e(!1),t()}finally{lt=r,Dp.transition=o}}function _k(){return qr().memoizedState}function c8(e,t,r){var o=Po(e);if(r={lane:o,action:r,hasEagerState:!1,eagerState:null,next:null},Tk(e))Ek(t,r);else if(r=dk(e,t,r,o),r!==null){var i=ar();on(r,e,o,i),Rk(r,t,o)}}function d8(e,t,r){var o=Po(e),i={lane:o,action:r,hasEagerState:!1,eagerState:null,next:null};if(Tk(e))Ek(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,c=s(a,r);if(i.hasEagerState=!0,i.eagerState=c,an(c,a)){var d=t.interleaved;d===null?(i.next=i,bg(t)):(i.next=d.next,d.next=i),t.interleaved=i;return}}catch{}finally{}r=dk(e,t,i,o),r!==null&&(i=ar(),on(r,e,o,i),Rk(r,t,o))}}function Tk(e){var t=e.alternate;return e===bt||t!==null&&t===bt}function Ek(e,t){ul=lu=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Rk(e,t,r){if(r&4194240){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,sg(e,r)}}var cu={readContext:Nr,useCallback:Jt,useContext:Jt,useEffect:Jt,useImperativeHandle:Jt,useInsertionEffect:Jt,useLayoutEffect:Jt,useMemo:Jt,useReducer:Jt,useRef:Jt,useState:Jt,useDebugValue:Jt,useDeferredValue:Jt,useTransition:Jt,useMutableSource:Jt,useSyncExternalStore:Jt,useId:Jt,unstable_isNewReconciler:!1},u8={readContext:Nr,useCallback:function(e,t){return gn().memoizedState=[e,t===void 0?null:t],e},useContext:Nr,useEffect:_0,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Sd(4194308,4,jk.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Sd(4194308,4,e,t)},useInsertionEffect:function(e,t){return Sd(4,2,e,t)},useMemo:function(e,t){var r=gn();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var o=gn();return t=r!==void 0?r(t):t,o.memoizedState=o.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},o.queue=e,e=e.dispatch=c8.bind(null,bt,e),[o.memoizedState,e]},useRef:function(e){var t=gn();return e={current:e},t.memoizedState=e},useState:$0,useDebugValue:Tg,useDeferredValue:function(e){return gn().memoizedState=e},useTransition:function(){var e=$0(!1),t=e[0];return e=l8.bind(null,e[1]),gn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var o=bt,i=gn();if(yt){if(r===void 0)throw Error(ge(407));r=r()}else{if(r=t(),Nt===null)throw Error(ge(349));_i&30||xk(o,t,r)}i.memoizedState=r;var s={value:r,getSnapshot:t};return i.queue=s,_0(mk.bind(null,o,s,e),[e]),o.flags|=2048,Ol(9,gk.bind(null,o,s,r,t),void 0,null),r},useId:function(){var e=gn(),t=Nt.identifierPrefix;if(yt){var r=Hn,o=qn;r=(o&~(1<<32-nn(o)-1)).toString(32)+r,t=":"+t+"R"+r,r=Il++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=a8++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},p8={readContext:Nr,useCallback:Ck,useContext:Nr,useEffect:_g,useImperativeHandle:Sk,useInsertionEffect:wk,useLayoutEffect:kk,useMemo:zk,useReducer:Fp,useRef:bk,useState:function(){return Fp(Al)},useDebugValue:Tg,useDeferredValue:function(e){var t=qr();return $k(t,At.memoizedState,e)},useTransition:function(){var e=Fp(Al)[0],t=qr().memoizedState;return[e,t]},useMutableSource:hk,useSyncExternalStore:fk,useId:_k,unstable_isNewReconciler:!1},h8={readContext:Nr,useCallback:Ck,useContext:Nr,useEffect:_g,useImperativeHandle:Sk,useInsertionEffect:wk,useLayoutEffect:kk,useMemo:zk,useReducer:Np,useRef:bk,useState:function(){return Np(Al)},useDebugValue:Tg,useDeferredValue:function(e){var t=qr();return At===null?t.memoizedState=e:$k(t,At.memoizedState,e)},useTransition:function(){var e=Np(Al)[0],t=qr().memoizedState;return[e,t]},useMutableSource:hk,useSyncExternalStore:fk,useId:_k,unstable_isNewReconciler:!1};function Qr(e,t){if(e&&e.defaultProps){t=wt({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function qf(e,t,r,o){t=e.memoizedState,r=r(o,t),r=r==null?t:wt({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Ou={isMounted:function(e){return(e=e._reactInternals)?Li(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var o=ar(),i=Po(e),s=Un(o,i);s.payload=t,r!=null&&(s.callback=r),t=Eo(e,s,i),t!==null&&(on(t,e,i,o),kd(t,e,i))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var o=ar(),i=Po(e),s=Un(o,i);s.tag=1,s.payload=t,r!=null&&(s.callback=r),t=Eo(e,s,i),t!==null&&(on(t,e,i,o),kd(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=ar(),o=Po(e),i=Un(r,o);i.tag=2,t!=null&&(i.callback=t),t=Eo(e,i,o),t!==null&&(on(t,e,o,r),kd(t,e,o))}};function T0(e,t,r,o,i,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,s,a):t.prototype&&t.prototype.isPureReactComponent?!_l(r,o)||!_l(i,s):!0}function Pk(e,t,r){var o=!1,i=Bo,s=t.contextType;return typeof s=="object"&&s!==null?s=Nr(s):(i=mr(t)?zi:or.current,o=t.contextTypes,s=(o=o!=null)?As(e,i):Bo),t=new t(r,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ou,e.stateNode=t,t._reactInternals=e,o&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function E0(e,t,r,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,o),t.state!==e&&Ou.enqueueReplaceState(t,t.state,null)}function Hf(e,t,r,o){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs={},wg(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Nr(s):(s=mr(t)?zi:or.current,i.context=As(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(qf(e,t,s,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Ou.enqueueReplaceState(i,i.state,null),su(e,r,i,o),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Ds(e,t){try{var r="",o=t;do r+=NC(o),o=o.return;while(o);var i=r}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function qp(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Uf(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var f8=typeof WeakMap=="function"?WeakMap:Map;function Mk(e,t,r){r=Un(-1,r),r.tag=3,r.payload={element:null};var o=t.value;return r.callback=function(){uu||(uu=!0,ex=o),Uf(e,t)},r}function Ik(e,t,r){r=Un(-1,r),r.tag=3;var o=e.type.getDerivedStateFromError;if(typeof o=="function"){var i=t.value;r.payload=function(){return o(i)},r.callback=function(){Uf(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(r.callback=function(){Uf(e,t),typeof o!="function"&&(Ro===null?Ro=new Set([this]):Ro.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),r}function R0(e,t,r){var o=e.pingCache;if(o===null){o=e.pingCache=new f8;var i=new Set;o.set(t,i)}else i=o.get(t),i===void 0&&(i=new Set,o.set(t,i));i.has(r)||(i.add(r),e=_8.bind(null,e,t,r),t.then(e,e))}function P0(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function M0(e,t,r,o,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Un(-1,1),t.tag=2,Eo(r,t,1))),r.lanes|=1),e)}var x8=Jn.ReactCurrentOwner,fr=!1;function sr(e,t,r,o){t.child=e===null?ck(t,null,r,o):Ls(t,e.child,r,o)}function I0(e,t,r,o,i){r=r.render;var s=t.ref;return ks(t,i),o=zg(e,t,r,o,s,i),r=$g(),e!==null&&!fr?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Qn(e,t,i)):(yt&&r&&fg(t),t.flags|=1,sr(e,t,o,i),t.child)}function A0(e,t,r,o,i){if(e===null){var s=r.type;return typeof s=="function"&&!Lg(s)&&s.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=s,Ak(e,t,s,o,i)):(e=_d(r.type,null,o,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var a=s.memoizedProps;if(r=r.compare,r=r!==null?r:_l,r(a,o)&&e.ref===t.ref)return Qn(e,t,i)}return t.flags|=1,e=Mo(s,o),e.ref=t.ref,e.return=t,t.child=e}function Ak(e,t,r,o,i){if(e!==null){var s=e.memoizedProps;if(_l(s,o)&&e.ref===t.ref)if(fr=!1,t.pendingProps=o=s,(e.lanes&i)!==0)e.flags&131072&&(fr=!0);else return t.lanes=e.lanes,Qn(e,t,i)}return Yf(e,t,r,o,i)}function Ok(e,t,r){var o=t.pendingProps,i=o.children,s=e!==null?e.memoizedState:null;if(o.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},pt(xs,jr),jr|=r;else{if(!(r&1073741824))return e=s!==null?s.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,pt(xs,jr),jr|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},o=s!==null?s.baseLanes:r,pt(xs,jr),jr|=o}else s!==null?(o=s.baseLanes|r,t.memoizedState=null):o=r,pt(xs,jr),jr|=o;return sr(e,t,i,r),t.child}function Lk(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Yf(e,t,r,o,i){var s=mr(r)?zi:or.current;return s=As(t,s),ks(t,i),r=zg(e,t,r,o,s,i),o=$g(),e!==null&&!fr?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Qn(e,t,i)):(yt&&o&&fg(t),t.flags|=1,sr(e,t,r,i),t.child)}function O0(e,t,r,o,i){if(mr(r)){var s=!0;tu(t)}else s=!1;if(ks(t,i),t.stateNode===null)Cd(e,t),Pk(t,r,o),Hf(t,r,o,i),o=!0;else if(e===null){var a=t.stateNode,c=t.memoizedProps;a.props=c;var d=a.context,p=r.contextType;typeof p=="object"&&p!==null?p=Nr(p):(p=mr(r)?zi:or.current,p=As(t,p));var h=r.getDerivedStateFromProps,f=typeof h=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==o||d!==p)&&E0(t,a,o,p),co=!1;var x=t.memoizedState;a.state=x,su(t,o,a,i),d=t.memoizedState,c!==o||x!==d||gr.current||co?(typeof h=="function"&&(qf(t,r,h,o),d=t.memoizedState),(c=co||T0(t,r,c,o,x,d,p))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=d),a.props=o,a.state=d,a.context=p,o=c):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{a=t.stateNode,uk(e,t),c=t.memoizedProps,p=t.type===t.elementType?c:Qr(t.type,c),a.props=p,f=t.pendingProps,x=a.context,d=r.contextType,typeof d=="object"&&d!==null?d=Nr(d):(d=mr(r)?zi:or.current,d=As(t,d));var S=r.getDerivedStateFromProps;(h=typeof S=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(c!==f||x!==d)&&E0(t,a,o,d),co=!1,x=t.memoizedState,a.state=x,su(t,o,a,i);var m=t.memoizedState;c!==f||x!==m||gr.current||co?(typeof S=="function"&&(qf(t,r,S,o),m=t.memoizedState),(p=co||T0(t,r,p,o,x,m,d)||!1)?(h||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(o,m,d),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(o,m,d)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=m),a.props=o,a.state=m,a.context=d,o=p):(typeof a.componentDidUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),o=!1)}return Vf(e,t,r,o,s,i)}function Vf(e,t,r,o,i,s){Lk(e,t);var a=(t.flags&128)!==0;if(!o&&!a)return i&&w0(t,r,!1),Qn(e,t,s);o=t.stateNode,x8.current=t;var c=a&&typeof r.getDerivedStateFromError!="function"?null:o.render();return t.flags|=1,e!==null&&a?(t.child=Ls(t,e.child,null,s),t.child=Ls(t,null,c,s)):sr(e,t,c,s),t.memoizedState=o.state,i&&w0(t,r,!0),t.child}function Bk(e){var t=e.stateNode;t.pendingContext?b0(e,t.pendingContext,t.pendingContext!==t.context):t.context&&b0(e,t.context,!1),kg(e,t.containerInfo)}function L0(e,t,r,o,i){return Os(),gg(i),t.flags|=256,sr(e,t,r,o),t.child}var Wf={dehydrated:null,treeContext:null,retryLane:0};function Gf(e){return{baseLanes:e,cachePool:null,transitions:null}}function Dk(e,t,r){var o=t.pendingProps,i=vt.current,s=!1,a=(t.flags&128)!==0,c;if((c=a)||(c=e!==null&&e.memoizedState===null?!1:(i&2)!==0),c?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),pt(vt,i&1),e===null)return Ff(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=o.children,e=o.fallback,s?(o=t.mode,s=t.child,a={mode:"hidden",children:a},!(o&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Du(a,o,0,null),e=wi(e,o,r,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Gf(r),t.memoizedState=Wf,e):Eg(t,a));if(i=e.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return g8(e,t,a,o,c,i,r);if(s){s=o.fallback,a=t.mode,i=e.child,c=i.sibling;var d={mode:"hidden",children:o.children};return!(a&1)&&t.child!==i?(o=t.child,o.childLanes=0,o.pendingProps=d,t.deletions=null):(o=Mo(i,d),o.subtreeFlags=i.subtreeFlags&14680064),c!==null?s=Mo(c,s):(s=wi(s,a,r,null),s.flags|=2),s.return=t,o.return=t,o.sibling=s,t.child=o,o=s,s=t.child,a=e.child.memoizedState,a=a===null?Gf(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~r,t.memoizedState=Wf,o}return s=e.child,e=s.sibling,o=Mo(s,{mode:"visible",children:o.children}),!(t.mode&1)&&(o.lanes=r),o.return=t,o.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=o,t.memoizedState=null,o}function Eg(e,t){return t=Du({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function zc(e,t,r,o){return o!==null&&gg(o),Ls(t,e.child,null,r),e=Eg(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function g8(e,t,r,o,i,s,a){if(r)return t.flags&256?(t.flags&=-257,o=qp(Error(ge(422))),zc(e,t,a,o)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=o.fallback,i=t.mode,o=Du({mode:"visible",children:o.children},i,0,null),s=wi(s,i,a,null),s.flags|=2,o.return=t,s.return=t,o.sibling=s,t.child=o,t.mode&1&&Ls(t,e.child,null,a),t.child.memoizedState=Gf(a),t.memoizedState=Wf,s);if(!(t.mode&1))return zc(e,t,a,null);if(i.data==="$!"){if(o=i.nextSibling&&i.nextSibling.dataset,o)var c=o.dgst;return o=c,s=Error(ge(419)),o=qp(s,o,void 0),zc(e,t,a,o)}if(c=(a&e.childLanes)!==0,fr||c){if(o=Nt,o!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(o.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Gn(e,i),on(o,e,i,-1))}return Og(),o=qp(Error(ge(421))),zc(e,t,a,o)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=T8.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,Sr=To(i.nextSibling),Cr=t,yt=!0,en=null,e!==null&&(Ar[Or++]=qn,Ar[Or++]=Hn,Ar[Or++]=$i,qn=e.id,Hn=e.overflow,$i=t),t=Eg(t,o.children),t.flags|=4096,t)}function B0(e,t,r){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),Nf(e.return,t,r)}function Hp(e,t,r,o,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:r,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=o,s.tail=r,s.tailMode=i)}function Fk(e,t,r){var o=t.pendingProps,i=o.revealOrder,s=o.tail;if(sr(e,t,o.children,r),o=vt.current,o&2)o=o&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&B0(e,r,t);else if(e.tag===19)B0(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}o&=1}if(pt(vt,o),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(r=t.child,i=null;r!==null;)e=r.alternate,e!==null&&au(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=t.child,t.child=null):(i=r.sibling,r.sibling=null),Hp(t,!1,i,r,s);break;case"backwards":for(r=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&au(e)===null){t.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}Hp(t,!0,r,null,s);break;case"together":Hp(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Cd(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Qn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Ti|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(ge(153));if(t.child!==null){for(e=t.child,r=Mo(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Mo(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function m8(e,t,r){switch(t.tag){case 3:Bk(t),Os();break;case 5:pk(t);break;case 1:mr(t.type)&&tu(t);break;case 4:kg(t,t.stateNode.containerInfo);break;case 10:var o=t.type._context,i=t.memoizedProps.value;pt(ou,o._currentValue),o._currentValue=i;break;case 13:if(o=t.memoizedState,o!==null)return o.dehydrated!==null?(pt(vt,vt.current&1),t.flags|=128,null):r&t.child.childLanes?Dk(e,t,r):(pt(vt,vt.current&1),e=Qn(e,t,r),e!==null?e.sibling:null);pt(vt,vt.current&1);break;case 19:if(o=(r&t.childLanes)!==0,e.flags&128){if(o)return Fk(e,t,r);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),pt(vt,vt.current),o)break;return null;case 22:case 23:return t.lanes=0,Ok(e,t,r)}return Qn(e,t,r)}var Nk,Qf,qk,Hk;Nk=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Qf=function(){};qk=function(e,t,r,o){var i=e.memoizedProps;if(i!==o){e=t.stateNode,di(Cn.current);var s=null;switch(r){case"input":i=mf(e,i),o=mf(e,o),s=[];break;case"select":i=wt({},i,{value:void 0}),o=wt({},o,{value:void 0}),s=[];break;case"textarea":i=bf(e,i),o=bf(e,o),s=[];break;default:typeof i.onClick!="function"&&typeof o.onClick=="function"&&(e.onclick=Zd)}kf(r,o);var a;r=null;for(p in i)if(!o.hasOwnProperty(p)&&i.hasOwnProperty(p)&&i[p]!=null)if(p==="style"){var c=i[p];for(a in c)c.hasOwnProperty(a)&&(r||(r={}),r[a]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(wl.hasOwnProperty(p)?s||(s=[]):(s=s||[]).push(p,null));for(p in o){var d=o[p];if(c=i!=null?i[p]:void 0,o.hasOwnProperty(p)&&d!==c&&(d!=null||c!=null))if(p==="style")if(c){for(a in c)!c.hasOwnProperty(a)||d&&d.hasOwnProperty(a)||(r||(r={}),r[a]="");for(a in d)d.hasOwnProperty(a)&&c[a]!==d[a]&&(r||(r={}),r[a]=d[a])}else r||(s||(s=[]),s.push(p,r)),r=d;else p==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(s=s||[]).push(p,d)):p==="children"?typeof d!="string"&&typeof d!="number"||(s=s||[]).push(p,""+d):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(wl.hasOwnProperty(p)?(d!=null&&p==="onScroll"&&ht("scroll",e),s||c===d||(s=[])):(s=s||[]).push(p,d))}r&&(s=s||[]).push("style",r);var p=s;(t.updateQueue=p)&&(t.flags|=4)}};Hk=function(e,t,r,o){r!==o&&(t.flags|=4)};function xa(e,t){if(!yt)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Xt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,o=0;if(t)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,o|=i.subtreeFlags&14680064,o|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,o|=i.subtreeFlags,o|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=o,e.childLanes=r,t}function y8(e,t,r){var o=t.pendingProps;switch(xg(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xt(t),null;case 1:return mr(t.type)&&eu(),Xt(t),null;case 3:return o=t.stateNode,Bs(),gt(gr),gt(or),Sg(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),(e===null||e.child===null)&&(Sc(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,en!==null&&(nx(en),en=null))),Qf(e,t),Xt(t),null;case 5:jg(t);var i=di(Ml.current);if(r=t.type,e!==null&&t.stateNode!=null)qk(e,t,r,o,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!o){if(t.stateNode===null)throw Error(ge(166));return Xt(t),null}if(e=di(Cn.current),Sc(t)){o=t.stateNode,r=t.type;var s=t.memoizedProps;switch(o[kn]=t,o[Rl]=s,e=(t.mode&1)!==0,r){case"dialog":ht("cancel",o),ht("close",o);break;case"iframe":case"object":case"embed":ht("load",o);break;case"video":case"audio":for(i=0;i<rl.length;i++)ht(rl[i],o);break;case"source":ht("error",o);break;case"img":case"image":case"link":ht("error",o),ht("load",o);break;case"details":ht("toggle",o);break;case"input":Wm(o,s),ht("invalid",o);break;case"select":o._wrapperState={wasMultiple:!!s.multiple},ht("invalid",o);break;case"textarea":Qm(o,s),ht("invalid",o)}kf(r,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var c=s[a];a==="children"?typeof c=="string"?o.textContent!==c&&(s.suppressHydrationWarning!==!0&&jc(o.textContent,c,e),i=["children",c]):typeof c=="number"&&o.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&jc(o.textContent,c,e),i=["children",""+c]):wl.hasOwnProperty(a)&&c!=null&&a==="onScroll"&&ht("scroll",o)}switch(r){case"input":xc(o),Gm(o,s,!0);break;case"textarea":xc(o),Km(o);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(o.onclick=Zd)}o=i,t.updateQueue=o,o!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=mw(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof o.is=="string"?e=a.createElement(r,{is:o.is}):(e=a.createElement(r),r==="select"&&(a=e,o.multiple?a.multiple=!0:o.size&&(a.size=o.size))):e=a.createElementNS(e,r),e[kn]=t,e[Rl]=o,Nk(e,t,!1,!1),t.stateNode=e;e:{switch(a=jf(r,o),r){case"dialog":ht("cancel",e),ht("close",e),i=o;break;case"iframe":case"object":case"embed":ht("load",e),i=o;break;case"video":case"audio":for(i=0;i<rl.length;i++)ht(rl[i],e);i=o;break;case"source":ht("error",e),i=o;break;case"img":case"image":case"link":ht("error",e),ht("load",e),i=o;break;case"details":ht("toggle",e),i=o;break;case"input":Wm(e,o),i=mf(e,o),ht("invalid",e);break;case"option":i=o;break;case"select":e._wrapperState={wasMultiple:!!o.multiple},i=wt({},o,{value:void 0}),ht("invalid",e);break;case"textarea":Qm(e,o),i=bf(e,o),ht("invalid",e);break;default:i=o}kf(r,i),c=i;for(s in c)if(c.hasOwnProperty(s)){var d=c[s];s==="style"?bw(e,d):s==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&yw(e,d)):s==="children"?typeof d=="string"?(r!=="textarea"||d!=="")&&kl(e,d):typeof d=="number"&&kl(e,""+d):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(wl.hasOwnProperty(s)?d!=null&&s==="onScroll"&&ht("scroll",e):d!=null&&eg(e,s,d,a))}switch(r){case"input":xc(e),Gm(e,o,!1);break;case"textarea":xc(e),Km(e);break;case"option":o.value!=null&&e.setAttribute("value",""+Lo(o.value));break;case"select":e.multiple=!!o.multiple,s=o.value,s!=null?ys(e,!!o.multiple,s,!1):o.defaultValue!=null&&ys(e,!!o.multiple,o.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Zd)}switch(r){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}}o&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Xt(t),null;case 6:if(e&&t.stateNode!=null)Hk(e,t,e.memoizedProps,o);else{if(typeof o!="string"&&t.stateNode===null)throw Error(ge(166));if(r=di(Ml.current),di(Cn.current),Sc(t)){if(o=t.stateNode,r=t.memoizedProps,o[kn]=t,(s=o.nodeValue!==r)&&(e=Cr,e!==null))switch(e.tag){case 3:jc(o.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&jc(o.nodeValue,r,(e.mode&1)!==0)}s&&(t.flags|=4)}else o=(r.nodeType===9?r:r.ownerDocument).createTextNode(o),o[kn]=t,t.stateNode=o}return Xt(t),null;case 13:if(gt(vt),o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(yt&&Sr!==null&&t.mode&1&&!(t.flags&128))ak(),Os(),t.flags|=98560,s=!1;else if(s=Sc(t),o!==null&&o.dehydrated!==null){if(e===null){if(!s)throw Error(ge(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ge(317));s[kn]=t}else Os(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Xt(t),s=!1}else en!==null&&(nx(en),en=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(o=o!==null,o!==(e!==null&&e.memoizedState!==null)&&o&&(t.child.flags|=8192,t.mode&1&&(e===null||vt.current&1?Lt===0&&(Lt=3):Og())),t.updateQueue!==null&&(t.flags|=4),Xt(t),null);case 4:return Bs(),Qf(e,t),e===null&&Tl(t.stateNode.containerInfo),Xt(t),null;case 10:return vg(t.type._context),Xt(t),null;case 17:return mr(t.type)&&eu(),Xt(t),null;case 19:if(gt(vt),s=t.memoizedState,s===null)return Xt(t),null;if(o=(t.flags&128)!==0,a=s.rendering,a===null)if(o)xa(s,!1);else{if(Lt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=au(e),a!==null){for(t.flags|=128,xa(s,!1),o=a.updateQueue,o!==null&&(t.updateQueue=o,t.flags|=4),t.subtreeFlags=0,o=r,r=t.child;r!==null;)s=r,e=o,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return pt(vt,vt.current&1|2),t.child}e=e.sibling}s.tail!==null&&_t()>Fs&&(t.flags|=128,o=!0,xa(s,!1),t.lanes=4194304)}else{if(!o)if(e=au(a),e!==null){if(t.flags|=128,o=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),xa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!yt)return Xt(t),null}else 2*_t()-s.renderingStartTime>Fs&&r!==1073741824&&(t.flags|=128,o=!0,xa(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(r=s.last,r!==null?r.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=_t(),t.sibling=null,r=vt.current,pt(vt,o?r&1|2:r&1),t):(Xt(t),null);case 22:case 23:return Ag(),o=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==o&&(t.flags|=8192),o&&t.mode&1?jr&1073741824&&(Xt(t),t.subtreeFlags&6&&(t.flags|=8192)):Xt(t),null;case 24:return null;case 25:return null}throw Error(ge(156,t.tag))}function v8(e,t){switch(xg(t),t.tag){case 1:return mr(t.type)&&eu(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bs(),gt(gr),gt(or),Sg(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return jg(t),null;case 13:if(gt(vt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(ge(340));Os()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return gt(vt),null;case 4:return Bs(),null;case 10:return vg(t.type._context),null;case 22:case 23:return Ag(),null;case 24:return null;default:return null}}var $c=!1,tr=!1,b8=typeof WeakSet=="function"?WeakSet:Set,Te=null;function fs(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(o){St(e,t,o)}else r.current=null}function Kf(e,t,r){try{r()}catch(o){St(e,t,o)}}var D0=!1;function w8(e,t){if(Mf=Kd,e=Gw(),hg(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var o=r.getSelection&&r.getSelection();if(o&&o.rangeCount!==0){r=o.anchorNode;var i=o.anchorOffset,s=o.focusNode;o=o.focusOffset;try{r.nodeType,s.nodeType}catch{r=null;break e}var a=0,c=-1,d=-1,p=0,h=0,f=e,x=null;t:for(;;){for(var S;f!==r||i!==0&&f.nodeType!==3||(c=a+i),f!==s||o!==0&&f.nodeType!==3||(d=a+o),f.nodeType===3&&(a+=f.nodeValue.length),(S=f.firstChild)!==null;)x=f,f=S;for(;;){if(f===e)break t;if(x===r&&++p===i&&(c=a),x===s&&++h===o&&(d=a),(S=f.nextSibling)!==null)break;f=x,x=f.parentNode}f=S}r=c===-1||d===-1?null:{start:c,end:d}}else r=null}r=r||{start:0,end:0}}else r=null;for(If={focusedElem:e,selectionRange:r},Kd=!1,Te=t;Te!==null;)if(t=Te,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Te=e;else for(;Te!==null;){t=Te;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var b=m.memoizedProps,w=m.memoizedState,j=t.stateNode,v=j.getSnapshotBeforeUpdate(t.elementType===t.type?b:Qr(t.type,b),w);j.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ge(163))}}catch(g){St(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,Te=e;break}Te=t.return}return m=D0,D0=!1,m}function pl(e,t,r){var o=t.updateQueue;if(o=o!==null?o.lastEffect:null,o!==null){var i=o=o.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&Kf(t,r,s)}i=i.next}while(i!==o)}}function Lu(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var o=r.create;r.destroy=o()}r=r.next}while(r!==t)}}function Jf(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Uk(e){var t=e.alternate;t!==null&&(e.alternate=null,Uk(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[kn],delete t[Rl],delete t[Lf],delete t[n8],delete t[o8])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Yk(e){return e.tag===5||e.tag===3||e.tag===4}function F0(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Yk(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xf(e,t,r){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Zd));else if(o!==4&&(e=e.child,e!==null))for(Xf(e,t,r),e=e.sibling;e!==null;)Xf(e,t,r),e=e.sibling}function Zf(e,t,r){var o=e.tag;if(o===5||o===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(o!==4&&(e=e.child,e!==null))for(Zf(e,t,r),e=e.sibling;e!==null;)Zf(e,t,r),e=e.sibling}var Yt=null,Xr=!1;function to(e,t,r){for(r=r.child;r!==null;)Vk(e,t,r),r=r.sibling}function Vk(e,t,r){if(Sn&&typeof Sn.onCommitFiberUnmount=="function")try{Sn.onCommitFiberUnmount(Tu,r)}catch{}switch(r.tag){case 5:tr||fs(r,t);case 6:var o=Yt,i=Xr;Yt=null,to(e,t,r),Yt=o,Xr=i,Yt!==null&&(Xr?(e=Yt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):Yt.removeChild(r.stateNode));break;case 18:Yt!==null&&(Xr?(e=Yt,r=r.stateNode,e.nodeType===8?Op(e.parentNode,r):e.nodeType===1&&Op(e,r),zl(e)):Op(Yt,r.stateNode));break;case 4:o=Yt,i=Xr,Yt=r.stateNode.containerInfo,Xr=!0,to(e,t,r),Yt=o,Xr=i;break;case 0:case 11:case 14:case 15:if(!tr&&(o=r.updateQueue,o!==null&&(o=o.lastEffect,o!==null))){i=o=o.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Kf(r,t,a),i=i.next}while(i!==o)}to(e,t,r);break;case 1:if(!tr&&(fs(r,t),o=r.stateNode,typeof o.componentWillUnmount=="function"))try{o.props=r.memoizedProps,o.state=r.memoizedState,o.componentWillUnmount()}catch(c){St(r,t,c)}to(e,t,r);break;case 21:to(e,t,r);break;case 22:r.mode&1?(tr=(o=tr)||r.memoizedState!==null,to(e,t,r),tr=o):to(e,t,r);break;default:to(e,t,r)}}function N0(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new b8),t.forEach(function(o){var i=E8.bind(null,e,o);r.has(o)||(r.add(o),o.then(i,i))})}}function Wr(e,t){var r=t.deletions;if(r!==null)for(var o=0;o<r.length;o++){var i=r[o];try{var s=e,a=t,c=a;e:for(;c!==null;){switch(c.tag){case 5:Yt=c.stateNode,Xr=!1;break e;case 3:Yt=c.stateNode.containerInfo,Xr=!0;break e;case 4:Yt=c.stateNode.containerInfo,Xr=!0;break e}c=c.return}if(Yt===null)throw Error(ge(160));Vk(s,a,i),Yt=null,Xr=!1;var d=i.alternate;d!==null&&(d.return=null),i.return=null}catch(p){St(i,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Wk(t,e),t=t.sibling}function Wk(e,t){var r=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Wr(t,e),fn(e),o&4){try{pl(3,e,e.return),Lu(3,e)}catch(b){St(e,e.return,b)}try{pl(5,e,e.return)}catch(b){St(e,e.return,b)}}break;case 1:Wr(t,e),fn(e),o&512&&r!==null&&fs(r,r.return);break;case 5:if(Wr(t,e),fn(e),o&512&&r!==null&&fs(r,r.return),e.flags&32){var i=e.stateNode;try{kl(i,"")}catch(b){St(e,e.return,b)}}if(o&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,a=r!==null?r.memoizedProps:s,c=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&xw(i,s),jf(c,a);var p=jf(c,s);for(a=0;a<d.length;a+=2){var h=d[a],f=d[a+1];h==="style"?bw(i,f):h==="dangerouslySetInnerHTML"?yw(i,f):h==="children"?kl(i,f):eg(i,h,f,p)}switch(c){case"input":yf(i,s);break;case"textarea":gw(i,s);break;case"select":var x=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var S=s.value;S!=null?ys(i,!!s.multiple,S,!1):x!==!!s.multiple&&(s.defaultValue!=null?ys(i,!!s.multiple,s.defaultValue,!0):ys(i,!!s.multiple,s.multiple?[]:"",!1))}i[Rl]=s}catch(b){St(e,e.return,b)}}break;case 6:if(Wr(t,e),fn(e),o&4){if(e.stateNode===null)throw Error(ge(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(b){St(e,e.return,b)}}break;case 3:if(Wr(t,e),fn(e),o&4&&r!==null&&r.memoizedState.isDehydrated)try{zl(t.containerInfo)}catch(b){St(e,e.return,b)}break;case 4:Wr(t,e),fn(e);break;case 13:Wr(t,e),fn(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Mg=_t())),o&4&&N0(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(tr=(p=tr)||h,Wr(t,e),tr=p):Wr(t,e),fn(e),o&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&e.mode&1)for(Te=e,h=e.child;h!==null;){for(f=Te=h;Te!==null;){switch(x=Te,S=x.child,x.tag){case 0:case 11:case 14:case 15:pl(4,x,x.return);break;case 1:fs(x,x.return);var m=x.stateNode;if(typeof m.componentWillUnmount=="function"){o=x,r=x.return;try{t=o,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(b){St(o,r,b)}}break;case 5:fs(x,x.return);break;case 22:if(x.memoizedState!==null){H0(f);continue}}S!==null?(S.return=x,Te=S):H0(f)}h=h.sibling}e:for(h=null,f=e;;){if(f.tag===5){if(h===null){h=f;try{i=f.stateNode,p?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=f.stateNode,d=f.memoizedProps.style,a=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=vw("display",a))}catch(b){St(e,e.return,b)}}}else if(f.tag===6){if(h===null)try{f.stateNode.nodeValue=p?"":f.memoizedProps}catch(b){St(e,e.return,b)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;h===f&&(h=null),f=f.return}h===f&&(h=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Wr(t,e),fn(e),o&4&&N0(e);break;case 21:break;default:Wr(t,e),fn(e)}}function fn(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Yk(r)){var o=r;break e}r=r.return}throw Error(ge(160))}switch(o.tag){case 5:var i=o.stateNode;o.flags&32&&(kl(i,""),o.flags&=-33);var s=F0(e);Zf(e,s,i);break;case 3:case 4:var a=o.stateNode.containerInfo,c=F0(e);Xf(e,c,a);break;default:throw Error(ge(161))}}catch(d){St(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function k8(e,t,r){Te=e,Gk(e)}function Gk(e,t,r){for(var o=(e.mode&1)!==0;Te!==null;){var i=Te,s=i.child;if(i.tag===22&&o){var a=i.memoizedState!==null||$c;if(!a){var c=i.alternate,d=c!==null&&c.memoizedState!==null||tr;c=$c;var p=tr;if($c=a,(tr=d)&&!p)for(Te=i;Te!==null;)a=Te,d=a.child,a.tag===22&&a.memoizedState!==null?U0(i):d!==null?(d.return=a,Te=d):U0(i);for(;s!==null;)Te=s,Gk(s),s=s.sibling;Te=i,$c=c,tr=p}q0(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,Te=s):q0(e)}}function q0(e){for(;Te!==null;){var t=Te;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:tr||Lu(5,t);break;case 1:var o=t.stateNode;if(t.flags&4&&!tr)if(r===null)o.componentDidMount();else{var i=t.elementType===t.type?r.memoizedProps:Qr(t.type,r.memoizedProps);o.componentDidUpdate(i,r.memoizedState,o.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&z0(t,s,o);break;case 3:var a=t.updateQueue;if(a!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}z0(t,a,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var d=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&r.focus();break;case"img":d.src&&(r.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var f=h.dehydrated;f!==null&&zl(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ge(163))}tr||t.flags&512&&Jf(t)}catch(x){St(t,t.return,x)}}if(t===e){Te=null;break}if(r=t.sibling,r!==null){r.return=t.return,Te=r;break}Te=t.return}}function H0(e){for(;Te!==null;){var t=Te;if(t===e){Te=null;break}var r=t.sibling;if(r!==null){r.return=t.return,Te=r;break}Te=t.return}}function U0(e){for(;Te!==null;){var t=Te;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Lu(4,t)}catch(d){St(t,r,d)}break;case 1:var o=t.stateNode;if(typeof o.componentDidMount=="function"){var i=t.return;try{o.componentDidMount()}catch(d){St(t,i,d)}}var s=t.return;try{Jf(t)}catch(d){St(t,s,d)}break;case 5:var a=t.return;try{Jf(t)}catch(d){St(t,a,d)}}}catch(d){St(t,t.return,d)}if(t===e){Te=null;break}var c=t.sibling;if(c!==null){c.return=t.return,Te=c;break}Te=t.return}}var j8=Math.ceil,du=Jn.ReactCurrentDispatcher,Rg=Jn.ReactCurrentOwner,Fr=Jn.ReactCurrentBatchConfig,Ze=0,Nt=null,Mt=null,Wt=0,jr=0,xs=Ho(0),Lt=0,Ll=null,Ti=0,Bu=0,Pg=0,hl=null,hr=null,Mg=0,Fs=1/0,On=null,uu=!1,ex=null,Ro=null,_c=!1,So=null,pu=0,fl=0,tx=null,zd=-1,$d=0;function ar(){return Ze&6?_t():zd!==-1?zd:zd=_t()}function Po(e){return e.mode&1?Ze&2&&Wt!==0?Wt&-Wt:s8.transition!==null?($d===0&&($d=Pw()),$d):(e=lt,e!==0||(e=window.event,e=e===void 0?16:Dw(e.type)),e):1}function on(e,t,r,o){if(50<fl)throw fl=0,tx=null,Error(ge(185));Ql(e,r,o),(!(Ze&2)||e!==Nt)&&(e===Nt&&(!(Ze&2)&&(Bu|=r),Lt===4&&ho(e,Wt)),yr(e,o),r===1&&Ze===0&&!(t.mode&1)&&(Fs=_t()+500,Iu&&Uo()))}function yr(e,t){var r=e.callbackNode;s5(e,t);var o=Qd(e,e===Nt?Wt:0);if(o===0)r!==null&&Zm(r),e.callbackNode=null,e.callbackPriority=0;else if(t=o&-o,e.callbackPriority!==t){if(r!=null&&Zm(r),t===1)e.tag===0?i8(Y0.bind(null,e)):ok(Y0.bind(null,e)),t8(function(){!(Ze&6)&&Uo()}),r=null;else{switch(Mw(o)){case 1:r=ig;break;case 4:r=Ew;break;case 16:r=Gd;break;case 536870912:r=Rw;break;default:r=Gd}r=rj(r,Qk.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Qk(e,t){if(zd=-1,$d=0,Ze&6)throw Error(ge(327));var r=e.callbackNode;if(js()&&e.callbackNode!==r)return null;var o=Qd(e,e===Nt?Wt:0);if(o===0)return null;if(o&30||o&e.expiredLanes||t)t=hu(e,o);else{t=o;var i=Ze;Ze|=2;var s=Jk();(Nt!==e||Wt!==t)&&(On=null,Fs=_t()+500,bi(e,t));do try{z8();break}catch(c){Kk(e,c)}while(!0);yg(),du.current=s,Ze=i,Mt!==null?t=0:(Nt=null,Wt=0,t=Lt)}if(t!==0){if(t===2&&(i=_f(e),i!==0&&(o=i,t=rx(e,i))),t===1)throw r=Ll,bi(e,0),ho(e,o),yr(e,_t()),r;if(t===6)ho(e,o);else{if(i=e.current.alternate,!(o&30)&&!S8(i)&&(t=hu(e,o),t===2&&(s=_f(e),s!==0&&(o=s,t=rx(e,s))),t===1))throw r=Ll,bi(e,0),ho(e,o),yr(e,_t()),r;switch(e.finishedWork=i,e.finishedLanes=o,t){case 0:case 1:throw Error(ge(345));case 2:ii(e,hr,On);break;case 3:if(ho(e,o),(o&130023424)===o&&(t=Mg+500-_t(),10<t)){if(Qd(e,0)!==0)break;if(i=e.suspendedLanes,(i&o)!==o){ar(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Of(ii.bind(null,e,hr,On),t);break}ii(e,hr,On);break;case 4:if(ho(e,o),(o&4194240)===o)break;for(t=e.eventTimes,i=-1;0<o;){var a=31-nn(o);s=1<<a,a=t[a],a>i&&(i=a),o&=~s}if(o=i,o=_t()-o,o=(120>o?120:480>o?480:1080>o?1080:1920>o?1920:3e3>o?3e3:4320>o?4320:1960*j8(o/1960))-o,10<o){e.timeoutHandle=Of(ii.bind(null,e,hr,On),o);break}ii(e,hr,On);break;case 5:ii(e,hr,On);break;default:throw Error(ge(329))}}}return yr(e,_t()),e.callbackNode===r?Qk.bind(null,e):null}function rx(e,t){var r=hl;return e.current.memoizedState.isDehydrated&&(bi(e,t).flags|=256),e=hu(e,t),e!==2&&(t=hr,hr=r,t!==null&&nx(t)),e}function nx(e){hr===null?hr=e:hr.push.apply(hr,e)}function S8(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var o=0;o<r.length;o++){var i=r[o],s=i.getSnapshot;i=i.value;try{if(!an(s(),i))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ho(e,t){for(t&=~Pg,t&=~Bu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-nn(t),o=1<<r;e[r]=-1,t&=~o}}function Y0(e){if(Ze&6)throw Error(ge(327));js();var t=Qd(e,0);if(!(t&1))return yr(e,_t()),null;var r=hu(e,t);if(e.tag!==0&&r===2){var o=_f(e);o!==0&&(t=o,r=rx(e,o))}if(r===1)throw r=Ll,bi(e,0),ho(e,t),yr(e,_t()),r;if(r===6)throw Error(ge(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,ii(e,hr,On),yr(e,_t()),null}function Ig(e,t){var r=Ze;Ze|=1;try{return e(t)}finally{Ze=r,Ze===0&&(Fs=_t()+500,Iu&&Uo())}}function Ei(e){So!==null&&So.tag===0&&!(Ze&6)&&js();var t=Ze;Ze|=1;var r=Fr.transition,o=lt;try{if(Fr.transition=null,lt=1,e)return e()}finally{lt=o,Fr.transition=r,Ze=t,!(Ze&6)&&Uo()}}function Ag(){jr=xs.current,gt(xs)}function bi(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,e8(r)),Mt!==null)for(r=Mt.return;r!==null;){var o=r;switch(xg(o),o.tag){case 1:o=o.type.childContextTypes,o!=null&&eu();break;case 3:Bs(),gt(gr),gt(or),Sg();break;case 5:jg(o);break;case 4:Bs();break;case 13:gt(vt);break;case 19:gt(vt);break;case 10:vg(o.type._context);break;case 22:case 23:Ag()}r=r.return}if(Nt=e,Mt=e=Mo(e.current,null),Wt=jr=t,Lt=0,Ll=null,Pg=Bu=Ti=0,hr=hl=null,ci!==null){for(t=0;t<ci.length;t++)if(r=ci[t],o=r.interleaved,o!==null){r.interleaved=null;var i=o.next,s=r.pending;if(s!==null){var a=s.next;s.next=i,o.next=a}r.pending=o}ci=null}return e}function Kk(e,t){do{var r=Mt;try{if(yg(),jd.current=cu,lu){for(var o=bt.memoizedState;o!==null;){var i=o.queue;i!==null&&(i.pending=null),o=o.next}lu=!1}if(_i=0,Dt=At=bt=null,ul=!1,Il=0,Rg.current=null,r===null||r.return===null){Lt=1,Ll=t,Mt=null;break}e:{var s=e,a=r.return,c=r,d=t;if(t=Wt,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var p=d,h=c,f=h.tag;if(!(h.mode&1)&&(f===0||f===11||f===15)){var x=h.alternate;x?(h.updateQueue=x.updateQueue,h.memoizedState=x.memoizedState,h.lanes=x.lanes):(h.updateQueue=null,h.memoizedState=null)}var S=P0(a);if(S!==null){S.flags&=-257,M0(S,a,c,s,t),S.mode&1&&R0(s,p,t),t=S,d=p;var m=t.updateQueue;if(m===null){var b=new Set;b.add(d),t.updateQueue=b}else m.add(d);break e}else{if(!(t&1)){R0(s,p,t),Og();break e}d=Error(ge(426))}}else if(yt&&c.mode&1){var w=P0(a);if(w!==null){!(w.flags&65536)&&(w.flags|=256),M0(w,a,c,s,t),gg(Ds(d,c));break e}}s=d=Ds(d,c),Lt!==4&&(Lt=2),hl===null?hl=[s]:hl.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var j=Mk(s,d,t);C0(s,j);break e;case 1:c=d;var v=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Ro===null||!Ro.has(y)))){s.flags|=65536,t&=-t,s.lanes|=t;var g=Ik(s,c,t);C0(s,g);break e}}s=s.return}while(s!==null)}Zk(r)}catch(k){t=k,Mt===r&&r!==null&&(Mt=r=r.return);continue}break}while(!0)}function Jk(){var e=du.current;return du.current=cu,e===null?cu:e}function Og(){(Lt===0||Lt===3||Lt===2)&&(Lt=4),Nt===null||!(Ti&268435455)&&!(Bu&268435455)||ho(Nt,Wt)}function hu(e,t){var r=Ze;Ze|=2;var o=Jk();(Nt!==e||Wt!==t)&&(On=null,bi(e,t));do try{C8();break}catch(i){Kk(e,i)}while(!0);if(yg(),Ze=r,du.current=o,Mt!==null)throw Error(ge(261));return Nt=null,Wt=0,Lt}function C8(){for(;Mt!==null;)Xk(Mt)}function z8(){for(;Mt!==null&&!JC();)Xk(Mt)}function Xk(e){var t=tj(e.alternate,e,jr);e.memoizedProps=e.pendingProps,t===null?Zk(e):Mt=t,Rg.current=null}function Zk(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=v8(r,t),r!==null){r.flags&=32767,Mt=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Lt=6,Mt=null;return}}else if(r=y8(r,t,jr),r!==null){Mt=r;return}if(t=t.sibling,t!==null){Mt=t;return}Mt=t=e}while(t!==null);Lt===0&&(Lt=5)}function ii(e,t,r){var o=lt,i=Fr.transition;try{Fr.transition=null,lt=1,$8(e,t,r,o)}finally{Fr.transition=i,lt=o}return null}function $8(e,t,r,o){do js();while(So!==null);if(Ze&6)throw Error(ge(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(ge(177));e.callbackNode=null,e.callbackPriority=0;var s=r.lanes|r.childLanes;if(a5(e,s),e===Nt&&(Mt=Nt=null,Wt=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||_c||(_c=!0,rj(Gd,function(){return js(),null})),s=(r.flags&15990)!==0,r.subtreeFlags&15990||s){s=Fr.transition,Fr.transition=null;var a=lt;lt=1;var c=Ze;Ze|=4,Rg.current=null,w8(e,r),Wk(r,e),W5(If),Kd=!!Mf,If=Mf=null,e.current=r,k8(r),XC(),Ze=c,lt=a,Fr.transition=s}else e.current=r;if(_c&&(_c=!1,So=e,pu=i),s=e.pendingLanes,s===0&&(Ro=null),t5(r.stateNode),yr(e,_t()),t!==null)for(o=e.onRecoverableError,r=0;r<t.length;r++)i=t[r],o(i.value,{componentStack:i.stack,digest:i.digest});if(uu)throw uu=!1,e=ex,ex=null,e;return pu&1&&e.tag!==0&&js(),s=e.pendingLanes,s&1?e===tx?fl++:(fl=0,tx=e):fl=0,Uo(),null}function js(){if(So!==null){var e=Mw(pu),t=Fr.transition,r=lt;try{if(Fr.transition=null,lt=16>e?16:e,So===null)var o=!1;else{if(e=So,So=null,pu=0,Ze&6)throw Error(ge(331));var i=Ze;for(Ze|=4,Te=e.current;Te!==null;){var s=Te,a=s.child;if(Te.flags&16){var c=s.deletions;if(c!==null){for(var d=0;d<c.length;d++){var p=c[d];for(Te=p;Te!==null;){var h=Te;switch(h.tag){case 0:case 11:case 15:pl(8,h,s)}var f=h.child;if(f!==null)f.return=h,Te=f;else for(;Te!==null;){h=Te;var x=h.sibling,S=h.return;if(Uk(h),h===p){Te=null;break}if(x!==null){x.return=S,Te=x;break}Te=S}}}var m=s.alternate;if(m!==null){var b=m.child;if(b!==null){m.child=null;do{var w=b.sibling;b.sibling=null,b=w}while(b!==null)}}Te=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Te=a;else e:for(;Te!==null;){if(s=Te,s.flags&2048)switch(s.tag){case 0:case 11:case 15:pl(9,s,s.return)}var j=s.sibling;if(j!==null){j.return=s.return,Te=j;break e}Te=s.return}}var v=e.current;for(Te=v;Te!==null;){a=Te;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,Te=y;else e:for(a=v;Te!==null;){if(c=Te,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Lu(9,c)}}catch(k){St(c,c.return,k)}if(c===a){Te=null;break e}var g=c.sibling;if(g!==null){g.return=c.return,Te=g;break e}Te=c.return}}if(Ze=i,Uo(),Sn&&typeof Sn.onPostCommitFiberRoot=="function")try{Sn.onPostCommitFiberRoot(Tu,e)}catch{}o=!0}return o}finally{lt=r,Fr.transition=t}}return!1}function V0(e,t,r){t=Ds(r,t),t=Mk(e,t,1),e=Eo(e,t,1),t=ar(),e!==null&&(Ql(e,1,t),yr(e,t))}function St(e,t,r){if(e.tag===3)V0(e,e,r);else for(;t!==null;){if(t.tag===3){V0(t,e,r);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ro===null||!Ro.has(o))){e=Ds(r,e),e=Ik(t,e,1),t=Eo(t,e,1),e=ar(),t!==null&&(Ql(t,1,e),yr(t,e));break}}t=t.return}}function _8(e,t,r){var o=e.pingCache;o!==null&&o.delete(t),t=ar(),e.pingedLanes|=e.suspendedLanes&r,Nt===e&&(Wt&r)===r&&(Lt===4||Lt===3&&(Wt&130023424)===Wt&&500>_t()-Mg?bi(e,0):Pg|=r),yr(e,t)}function ej(e,t){t===0&&(e.mode&1?(t=yc,yc<<=1,!(yc&130023424)&&(yc=4194304)):t=1);var r=ar();e=Gn(e,t),e!==null&&(Ql(e,t,r),yr(e,r))}function T8(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),ej(e,r)}function E8(e,t){var r=0;switch(e.tag){case 13:var o=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:o=e.stateNode;break;default:throw Error(ge(314))}o!==null&&o.delete(t),ej(e,r)}var tj;tj=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||gr.current)fr=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return fr=!1,m8(e,t,r);fr=!!(e.flags&131072)}else fr=!1,yt&&t.flags&1048576&&ik(t,nu,t.index);switch(t.lanes=0,t.tag){case 2:var o=t.type;Cd(e,t),e=t.pendingProps;var i=As(t,or.current);ks(t,r),i=zg(null,t,o,e,i,r);var s=$g();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,mr(o)?(s=!0,tu(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,wg(t),i.updater=Ou,t.stateNode=i,i._reactInternals=t,Hf(t,o,e,r),t=Vf(null,t,o,!0,s,r)):(t.tag=0,yt&&s&&fg(t),sr(null,t,i,r),t=t.child),t;case 16:o=t.elementType;e:{switch(Cd(e,t),e=t.pendingProps,i=o._init,o=i(o._payload),t.type=o,i=t.tag=P8(o),e=Qr(o,e),i){case 0:t=Yf(null,t,o,e,r);break e;case 1:t=O0(null,t,o,e,r);break e;case 11:t=I0(null,t,o,e,r);break e;case 14:t=A0(null,t,o,Qr(o.type,e),r);break e}throw Error(ge(306,o,""))}return t;case 0:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Qr(o,i),Yf(e,t,o,i,r);case 1:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Qr(o,i),O0(e,t,o,i,r);case 3:e:{if(Bk(t),e===null)throw Error(ge(387));o=t.pendingProps,s=t.memoizedState,i=s.element,uk(e,t),su(t,o,null,r);var a=t.memoizedState;if(o=a.element,s.isDehydrated)if(s={element:o,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=Ds(Error(ge(423)),t),t=L0(e,t,o,r,i);break e}else if(o!==i){i=Ds(Error(ge(424)),t),t=L0(e,t,o,r,i);break e}else for(Sr=To(t.stateNode.containerInfo.firstChild),Cr=t,yt=!0,en=null,r=ck(t,null,o,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Os(),o===i){t=Qn(e,t,r);break e}sr(e,t,o,r)}t=t.child}return t;case 5:return pk(t),e===null&&Ff(t),o=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,a=i.children,Af(o,i)?a=null:s!==null&&Af(o,s)&&(t.flags|=32),Lk(e,t),sr(e,t,a,r),t.child;case 6:return e===null&&Ff(t),null;case 13:return Dk(e,t,r);case 4:return kg(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Ls(t,null,o,r):sr(e,t,o,r),t.child;case 11:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Qr(o,i),I0(e,t,o,i,r);case 7:return sr(e,t,t.pendingProps,r),t.child;case 8:return sr(e,t,t.pendingProps.children,r),t.child;case 12:return sr(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(o=t.type._context,i=t.pendingProps,s=t.memoizedProps,a=i.value,pt(ou,o._currentValue),o._currentValue=a,s!==null)if(an(s.value,a)){if(s.children===i.children&&!gr.current){t=Qn(e,t,r);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var c=s.dependencies;if(c!==null){a=s.child;for(var d=c.firstContext;d!==null;){if(d.context===o){if(s.tag===1){d=Un(-1,r&-r),d.tag=2;var p=s.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?d.next=d:(d.next=h.next,h.next=d),p.pending=d}}s.lanes|=r,d=s.alternate,d!==null&&(d.lanes|=r),Nf(s.return,r,t),c.lanes|=r;break}d=d.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(ge(341));a.lanes|=r,c=a.alternate,c!==null&&(c.lanes|=r),Nf(a,r,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}sr(e,t,i.children,r),t=t.child}return t;case 9:return i=t.type,o=t.pendingProps.children,ks(t,r),i=Nr(i),o=o(i),t.flags|=1,sr(e,t,o,r),t.child;case 14:return o=t.type,i=Qr(o,t.pendingProps),i=Qr(o.type,i),A0(e,t,o,i,r);case 15:return Ak(e,t,t.type,t.pendingProps,r);case 17:return o=t.type,i=t.pendingProps,i=t.elementType===o?i:Qr(o,i),Cd(e,t),t.tag=1,mr(o)?(e=!0,tu(t)):e=!1,ks(t,r),Pk(t,o,i),Hf(t,o,i,r),Vf(null,t,o,!0,e,r);case 19:return Fk(e,t,r);case 22:return Ok(e,t,r)}throw Error(ge(156,t.tag))};function rj(e,t){return Tw(e,t)}function R8(e,t,r,o){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Dr(e,t,r,o){return new R8(e,t,r,o)}function Lg(e){return e=e.prototype,!(!e||!e.isReactComponent)}function P8(e){if(typeof e=="function")return Lg(e)?1:0;if(e!=null){if(e=e.$$typeof,e===rg)return 11;if(e===ng)return 14}return 2}function Mo(e,t){var r=e.alternate;return r===null?(r=Dr(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function _d(e,t,r,o,i,s){var a=2;if(o=e,typeof e=="function")Lg(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case is:return wi(r.children,i,s,t);case tg:a=8,i|=8;break;case hf:return e=Dr(12,r,t,i|2),e.elementType=hf,e.lanes=s,e;case ff:return e=Dr(13,r,t,i),e.elementType=ff,e.lanes=s,e;case xf:return e=Dr(19,r,t,i),e.elementType=xf,e.lanes=s,e;case pw:return Du(r,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case dw:a=10;break e;case uw:a=9;break e;case rg:a=11;break e;case ng:a=14;break e;case lo:a=16,o=null;break e}throw Error(ge(130,e==null?e:typeof e,""))}return t=Dr(a,r,t,i),t.elementType=e,t.type=o,t.lanes=s,t}function wi(e,t,r,o){return e=Dr(7,e,o,t),e.lanes=r,e}function Du(e,t,r,o){return e=Dr(22,e,o,t),e.elementType=pw,e.lanes=r,e.stateNode={isHidden:!1},e}function Up(e,t,r){return e=Dr(6,e,null,t),e.lanes=r,e}function Yp(e,t,r){return t=Dr(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function M8(e,t,r,o,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Cp(0),this.expirationTimes=Cp(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cp(0),this.identifierPrefix=o,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Bg(e,t,r,o,i,s,a,c,d){return e=new M8(e,t,r,c,d),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Dr(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:o,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},wg(s),e}function I8(e,t,r){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:os,key:o==null?null:""+o,children:e,containerInfo:t,implementation:r}}function nj(e){if(!e)return Bo;e=e._reactInternals;e:{if(Li(e)!==e||e.tag!==1)throw Error(ge(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(mr(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(ge(171))}if(e.tag===1){var r=e.type;if(mr(r))return nk(e,r,t)}return t}function oj(e,t,r,o,i,s,a,c,d){return e=Bg(r,o,!0,e,i,s,a,c,d),e.context=nj(null),r=e.current,o=ar(),i=Po(r),s=Un(o,i),s.callback=t??null,Eo(r,s,i),e.current.lanes=i,Ql(e,i,o),yr(e,o),e}function Fu(e,t,r,o){var i=t.current,s=ar(),a=Po(i);return r=nj(r),t.context===null?t.context=r:t.pendingContext=r,t=Un(s,a),t.payload={element:e},o=o===void 0?null:o,o!==null&&(t.callback=o),e=Eo(i,t,a),e!==null&&(on(e,i,a,s),kd(e,i,a)),a}function fu(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function W0(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Dg(e,t){W0(e,t),(e=e.alternate)&&W0(e,t)}function A8(){return null}var ij=typeof reportError=="function"?reportError:function(e){console.error(e)};function Fg(e){this._internalRoot=e}Nu.prototype.render=Fg.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(ge(409));Fu(e,t,null,null)};Nu.prototype.unmount=Fg.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ei(function(){Fu(null,e,null,null)}),t[Wn]=null}};function Nu(e){this._internalRoot=e}Nu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ow();e={blockedOn:null,target:e,priority:t};for(var r=0;r<po.length&&t!==0&&t<po[r].priority;r++);po.splice(r,0,e),r===0&&Bw(e)}};function Ng(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function qu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function G0(){}function O8(e,t,r,o,i){if(i){if(typeof o=="function"){var s=o;o=function(){var p=fu(a);s.call(p)}}var a=oj(t,o,e,0,null,!1,!1,"",G0);return e._reactRootContainer=a,e[Wn]=a.current,Tl(e.nodeType===8?e.parentNode:e),Ei(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof o=="function"){var c=o;o=function(){var p=fu(d);c.call(p)}}var d=Bg(e,0,!1,null,null,!1,!1,"",G0);return e._reactRootContainer=d,e[Wn]=d.current,Tl(e.nodeType===8?e.parentNode:e),Ei(function(){Fu(t,d,r,o)}),d}function Hu(e,t,r,o,i){var s=r._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var c=i;i=function(){var d=fu(a);c.call(d)}}Fu(t,a,e,i)}else a=O8(r,t,e,i,o);return fu(a)}Iw=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=tl(t.pendingLanes);r!==0&&(sg(t,r|1),yr(t,_t()),!(Ze&6)&&(Fs=_t()+500,Uo()))}break;case 13:Ei(function(){var o=Gn(e,1);if(o!==null){var i=ar();on(o,e,1,i)}}),Dg(e,1)}};ag=function(e){if(e.tag===13){var t=Gn(e,134217728);if(t!==null){var r=ar();on(t,e,134217728,r)}Dg(e,134217728)}};Aw=function(e){if(e.tag===13){var t=Po(e),r=Gn(e,t);if(r!==null){var o=ar();on(r,e,t,o)}Dg(e,t)}};Ow=function(){return lt};Lw=function(e,t){var r=lt;try{return lt=e,t()}finally{lt=r}};Cf=function(e,t,r){switch(t){case"input":if(yf(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var o=r[t];if(o!==e&&o.form===e.form){var i=Mu(o);if(!i)throw Error(ge(90));fw(o),yf(o,i)}}}break;case"textarea":gw(e,r);break;case"select":t=r.value,t!=null&&ys(e,!!r.multiple,t,!1)}};jw=Ig;Sw=Ei;var L8={usingClientEntryPoint:!1,Events:[Jl,cs,Mu,ww,kw,Ig]},ga={findFiberByHostInstance:li,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},B8={bundleType:ga.bundleType,version:ga.version,rendererPackageName:ga.rendererPackageName,rendererConfig:ga.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Jn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=$w(e),e===null?null:e.stateNode},findFiberByHostInstance:ga.findFiberByHostInstance||A8,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Tc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Tc.isDisabled&&Tc.supportsFiber)try{Tu=Tc.inject(B8),Sn=Tc}catch{}}_r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=L8;_r.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ng(t))throw Error(ge(200));return I8(e,t,null,r)};_r.createRoot=function(e,t){if(!Ng(e))throw Error(ge(299));var r=!1,o="",i=ij;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Bg(e,1,!1,null,null,r,!1,o,i),e[Wn]=t.current,Tl(e.nodeType===8?e.parentNode:e),new Fg(t)};_r.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(ge(188)):(e=Object.keys(e).join(","),Error(ge(268,e)));return e=$w(t),e=e===null?null:e.stateNode,e};_r.flushSync=function(e){return Ei(e)};_r.hydrate=function(e,t,r){if(!qu(t))throw Error(ge(200));return Hu(null,e,t,!0,r)};_r.hydrateRoot=function(e,t,r){if(!Ng(e))throw Error(ge(405));var o=r!=null&&r.hydratedSources||null,i=!1,s="",a=ij;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(s=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),t=oj(t,null,e,1,r??null,i,!1,s,a),e[Wn]=t.current,Tl(e),o)for(e=0;e<o.length;e++)r=o[e],i=r._getVersion,i=i(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,i]:t.mutableSourceEagerHydrationData.push(r,i);return new Nu(t)};_r.render=function(e,t,r){if(!qu(t))throw Error(ge(200));return Hu(null,e,t,!1,r)};_r.unmountComponentAtNode=function(e){if(!qu(e))throw Error(ge(40));return e._reactRootContainer?(Ei(function(){Hu(null,null,e,!1,function(){e._reactRootContainer=null,e[Wn]=null})}),!0):!1};_r.unstable_batchedUpdates=Ig;_r.unstable_renderSubtreeIntoContainer=function(e,t,r,o){if(!qu(r))throw Error(ge(200));if(e==null||e._reactInternals===void 0)throw Error(ge(38));return Hu(e,t,r,!1,o)};_r.version="18.3.1-next-f1338f8080-20240426";function sj(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sj)}catch(e){console.error(e)}}sj(),sw.exports=_r;var aj=sw.exports,Q0=aj;uf.createRoot=Q0.createRoot,uf.hydrateRoot=Q0.hydrateRoot;var Zl=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},D8={setTimeout:(e,t)=>setTimeout(e,t),clearTimeout:e=>clearTimeout(e),setInterval:(e,t)=>setInterval(e,t),clearInterval:e=>clearInterval(e)},go,Yx,D2,F8=(D2=class{constructor(){Ue(this,go,D8);Ue(this,Yx,!1)}setTimeoutProvider(e){Ae(this,go,e)}setTimeout(e,t){return te(this,go).setTimeout(e,t)}clearTimeout(e){te(this,go).clearTimeout(e)}setInterval(e,t){return te(this,go).setInterval(e,t)}clearInterval(e){te(this,go).clearInterval(e)}},go=new WeakMap,Yx=new WeakMap,D2),ox=new F8;function N8(e){setTimeout(e,0)}var Uu=typeof window>"u"||"Deno"in globalThis;function Ir(){}function q8(e,t){return typeof e=="function"?e(t):e}function H8(e){return typeof e=="number"&&e>=0&&e!==1/0}function U8(e,t){return Math.max(e+(t||0)-Date.now(),0)}function ix(e,t){return typeof e=="function"?e(t):e}function Y8(e,t){return typeof e=="function"?e(t):e}function K0(e,t){const{type:r="all",exact:o,fetchStatus:i,predicate:s,queryKey:a,stale:c}=e;if(a){if(o){if(t.queryHash!==qg(a,t.options))return!1}else if(!Bl(t.queryKey,a))return!1}if(r!=="all"){const d=t.isActive();if(r==="active"&&!d||r==="inactive"&&d)return!1}return!(typeof c=="boolean"&&t.isStale()!==c||i&&i!==t.state.fetchStatus||s&&!s(t))}function J0(e,t){const{exact:r,status:o,predicate:i,mutationKey:s}=e;if(s){if(!t.options.mutationKey)return!1;if(r){if(Ri(t.options.mutationKey)!==Ri(s))return!1}else if(!Bl(t.options.mutationKey,s))return!1}return!(o&&t.state.status!==o||i&&!i(t))}function qg(e,t){return((t==null?void 0:t.queryKeyHashFn)||Ri)(e)}function Ri(e){return JSON.stringify(e,(t,r)=>sx(r)?Object.keys(r).sort().reduce((o,i)=>(o[i]=r[i],o),{}):r)}function Bl(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(t).every(r=>Bl(e[r],t[r])):!1}var V8=Object.prototype.hasOwnProperty;function lj(e,t,r=0){if(e===t)return e;if(r>500)return t;const o=X0(e)&&X0(t);if(!o&&!(sx(e)&&sx(t)))return t;const s=(o?e:Object.keys(e)).length,a=o?t:Object.keys(t),c=a.length,d=o?new Array(c):{};let p=0;for(let h=0;h<c;h++){const f=o?h:a[h],x=e[f],S=t[f];if(x===S){d[f]=x,(o?h<s:V8.call(e,f))&&p++;continue}if(x===null||S===null||typeof x!="object"||typeof S!="object"){d[f]=S;continue}const m=lj(x,S,r+1);d[f]=m,m===x&&p++}return s===c&&p===s?e:d}function W8(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(e[r]!==t[r])return!1;return!0}function X0(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function sx(e){if(!Z0(e))return!1;const t=e.constructor;if(t===void 0)return!0;const r=t.prototype;return!(!Z0(r)||!r.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function Z0(e){return Object.prototype.toString.call(e)==="[object Object]"}function G8(e){return new Promise(t=>{ox.setTimeout(t,e)})}function Q8(e,t,r){return typeof r.structuralSharing=="function"?r.structuralSharing(e,t):r.structuralSharing!==!1?lj(e,t):t}function K8(e,t,r=0){const o=[...e,t];return r&&o.length>r?o.slice(1):o}function J8(e,t,r=0){const o=[t,...e];return r&&o.length>r?o.slice(0,-1):o}var Hg=Symbol();function cj(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Hg?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function X8(e,t){return typeof e=="function"?e(...t):!!e}function Z8(e,t,r){let o=!1,i;return Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(i??(i=t()),o||(o=!0,i.aborted?r():i.addEventListener("abort",r,{once:!0})),i)}),e}var fi,mo,zs,F2,e6=(F2=class extends Zl{constructor(){super();Ue(this,fi);Ue(this,mo);Ue(this,zs);Ae(this,zs,t=>{if(!Uu&&window.addEventListener){const r=()=>t();return window.addEventListener("visibilitychange",r,!1),()=>{window.removeEventListener("visibilitychange",r)}}})}onSubscribe(){te(this,mo)||this.setEventListener(te(this,zs))}onUnsubscribe(){var t;this.hasListeners()||((t=te(this,mo))==null||t.call(this),Ae(this,mo,void 0))}setEventListener(t){var r;Ae(this,zs,t),(r=te(this,mo))==null||r.call(this),Ae(this,mo,t(o=>{typeof o=="boolean"?this.setFocused(o):this.onFocus()}))}setFocused(t){te(this,fi)!==t&&(Ae(this,fi,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(r=>{r(t)})}isFocused(){var t;return typeof te(this,fi)=="boolean"?te(this,fi):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},fi=new WeakMap,mo=new WeakMap,zs=new WeakMap,F2),dj=new e6;function t6(){let e,t;const r=new Promise((i,s)=>{e=i,t=s});r.status="pending",r.catch(()=>{});function o(i){Object.assign(r,i),delete r.resolve,delete r.reject}return r.resolve=i=>{o({status:"fulfilled",value:i}),e(i)},r.reject=i=>{o({status:"rejected",reason:i}),t(i)},r}var r6=N8;function n6(){let e=[],t=0,r=c=>{c()},o=c=>{c()},i=r6;const s=c=>{t?e.push(c):i(()=>{r(c)})},a=()=>{const c=e;e=[],c.length&&i(()=>{o(()=>{c.forEach(d=>{r(d)})})})};return{batch:c=>{let d;t++;try{d=c()}finally{t--,t||a()}return d},batchCalls:c=>(...d)=>{s(()=>{c(...d)})},schedule:s,setNotifyFunction:c=>{r=c},setBatchNotifyFunction:c=>{o=c},setScheduler:c=>{i=c}}}var Vt=n6(),$s,yo,_s,N2,o6=(N2=class extends Zl{constructor(){super();Ue(this,$s,!0);Ue(this,yo);Ue(this,_s);Ae(this,_s,t=>{if(!Uu&&window.addEventListener){const r=()=>t(!0),o=()=>t(!1);return window.addEventListener("online",r,!1),window.addEventListener("offline",o,!1),()=>{window.removeEventListener("online",r),window.removeEventListener("offline",o)}}})}onSubscribe(){te(this,yo)||this.setEventListener(te(this,_s))}onUnsubscribe(){var t;this.hasListeners()||((t=te(this,yo))==null||t.call(this),Ae(this,yo,void 0))}setEventListener(t){var r;Ae(this,_s,t),(r=te(this,yo))==null||r.call(this),Ae(this,yo,t(this.setOnline.bind(this)))}setOnline(t){te(this,$s)!==t&&(Ae(this,$s,t),this.listeners.forEach(o=>{o(t)}))}isOnline(){return te(this,$s)}},$s=new WeakMap,yo=new WeakMap,_s=new WeakMap,N2),xu=new o6;function i6(e){return Math.min(1e3*2**e,3e4)}function uj(e){return(e??"online")==="online"?xu.isOnline():!0}var ax=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function pj(e){let t=!1,r=0,o;const i=t6(),s=()=>i.status!=="pending",a=b=>{var w;if(!s()){const j=new ax(b);x(j),(w=e.onCancel)==null||w.call(e,j)}},c=()=>{t=!0},d=()=>{t=!1},p=()=>dj.isFocused()&&(e.networkMode==="always"||xu.isOnline())&&e.canRun(),h=()=>uj(e.networkMode)&&e.canRun(),f=b=>{s()||(o==null||o(),i.resolve(b))},x=b=>{s()||(o==null||o(),i.reject(b))},S=()=>new Promise(b=>{var w;o=j=>{(s()||p())&&b(j)},(w=e.onPause)==null||w.call(e)}).then(()=>{var b;o=void 0,s()||(b=e.onContinue)==null||b.call(e)}),m=()=>{if(s())return;let b;const w=r===0?e.initialPromise:void 0;try{b=w??e.fn()}catch(j){b=Promise.reject(j)}Promise.resolve(b).then(f).catch(j=>{var C;if(s())return;const v=e.retry??(Uu?0:3),y=e.retryDelay??i6,g=typeof y=="function"?y(r,j):y,k=v===!0||typeof v=="number"&&r<v||typeof v=="function"&&v(r,j);if(t||!k){x(j);return}r++,(C=e.onFail)==null||C.call(e,r,j),G8(g).then(()=>p()?void 0:S()).then(()=>{t?x(j):m()})})};return{promise:i,status:()=>i.status,cancel:a,continue:()=>(o==null||o(),i),cancelRetry:c,continueRetry:d,canStart:h,start:()=>(h()?m():S().then(m),i)}}var xi,q2,hj=(q2=class{constructor(){Ue(this,xi)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),H8(this.gcTime)&&Ae(this,xi,ox.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Uu?1/0:5*60*1e3))}clearGcTimeout(){te(this,xi)&&(ox.clearTimeout(te(this,xi)),Ae(this,xi,void 0))}},xi=new WeakMap,q2),gi,Ts,Mr,mi,Bt,Yl,yi,Kr,In,H2,s6=(H2=class extends hj{constructor(t){super();Ue(this,Kr);Ue(this,gi);Ue(this,Ts);Ue(this,Mr);Ue(this,mi);Ue(this,Bt);Ue(this,Yl);Ue(this,yi);Ae(this,yi,!1),Ae(this,Yl,t.defaultOptions),this.setOptions(t.options),this.observers=[],Ae(this,mi,t.client),Ae(this,Mr,te(this,mi).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,Ae(this,gi,t1(this.options)),this.state=t.state??te(this,gi),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=te(this,Bt))==null?void 0:t.promise}setOptions(t){if(this.options={...te(this,Yl),...t},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const r=t1(this.options);r.data!==void 0&&(this.setState(e1(r.data,r.dataUpdatedAt)),Ae(this,gi,r))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&te(this,Mr).remove(this)}setData(t,r){const o=Q8(this.state.data,t,this.options);return $t(this,Kr,In).call(this,{data:o,type:"success",dataUpdatedAt:r==null?void 0:r.updatedAt,manual:r==null?void 0:r.manual}),o}setState(t,r){$t(this,Kr,In).call(this,{type:"setState",state:t,setStateOptions:r})}cancel(t){var o,i;const r=(o=te(this,Bt))==null?void 0:o.promise;return(i=te(this,Bt))==null||i.cancel(t),r?r.then(Ir).catch(Ir):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(te(this,gi))}isActive(){return this.observers.some(t=>Y8(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Hg||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(t=>ix(t.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(t=0){return this.state.data===void 0?!0:t==="static"?!1:this.state.isInvalidated?!0:!U8(this.state.dataUpdatedAt,t)}onFocus(){var r;const t=this.observers.find(o=>o.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(r=te(this,Bt))==null||r.continue()}onOnline(){var r;const t=this.observers.find(o=>o.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(r=te(this,Bt))==null||r.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),te(this,Mr).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(r=>r!==t),this.observers.length||(te(this,Bt)&&(te(this,yi)?te(this,Bt).cancel({revert:!0}):te(this,Bt).cancelRetry()),this.scheduleGc()),te(this,Mr).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||$t(this,Kr,In).call(this,{type:"invalidate"})}async fetch(t,r){var d,p,h,f,x,S,m,b,w,j,v,y;if(this.state.fetchStatus!=="idle"&&((d=te(this,Bt))==null?void 0:d.status())!=="rejected"){if(this.state.data!==void 0&&(r!=null&&r.cancelRefetch))this.cancel({silent:!0});else if(te(this,Bt))return te(this,Bt).continueRetry(),te(this,Bt).promise}if(t&&this.setOptions(t),!this.options.queryFn){const g=this.observers.find(k=>k.options.queryFn);g&&this.setOptions(g.options)}const o=new AbortController,i=g=>{Object.defineProperty(g,"signal",{enumerable:!0,get:()=>(Ae(this,yi,!0),o.signal)})},s=()=>{const g=cj(this.options,r),C=(()=>{const _={client:te(this,mi),queryKey:this.queryKey,meta:this.meta};return i(_),_})();return Ae(this,yi,!1),this.options.persister?this.options.persister(g,C,this):g(C)},c=(()=>{const g={fetchOptions:r,options:this.options,queryKey:this.queryKey,client:te(this,mi),state:this.state,fetchFn:s};return i(g),g})();(p=this.options.behavior)==null||p.onFetch(c,this),Ae(this,Ts,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((h=c.fetchOptions)==null?void 0:h.meta))&&$t(this,Kr,In).call(this,{type:"fetch",meta:(f=c.fetchOptions)==null?void 0:f.meta}),Ae(this,Bt,pj({initialPromise:r==null?void 0:r.initialPromise,fn:c.fetchFn,onCancel:g=>{g instanceof ax&&g.revert&&this.setState({...te(this,Ts),fetchStatus:"idle"}),o.abort()},onFail:(g,k)=>{$t(this,Kr,In).call(this,{type:"failed",failureCount:g,error:k})},onPause:()=>{$t(this,Kr,In).call(this,{type:"pause"})},onContinue:()=>{$t(this,Kr,In).call(this,{type:"continue"})},retry:c.options.retry,retryDelay:c.options.retryDelay,networkMode:c.options.networkMode,canRun:()=>!0}));try{const g=await te(this,Bt).start();if(g===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(g),(S=(x=te(this,Mr).config).onSuccess)==null||S.call(x,g,this),(b=(m=te(this,Mr).config).onSettled)==null||b.call(m,g,this.state.error,this),g}catch(g){if(g instanceof ax){if(g.silent)return te(this,Bt).promise;if(g.revert){if(this.state.data===void 0)throw g;return this.state.data}}throw $t(this,Kr,In).call(this,{type:"error",error:g}),(j=(w=te(this,Mr).config).onError)==null||j.call(w,g,this),(y=(v=te(this,Mr).config).onSettled)==null||y.call(v,this.state.data,g,this),g}finally{this.scheduleGc()}}},gi=new WeakMap,Ts=new WeakMap,Mr=new WeakMap,mi=new WeakMap,Bt=new WeakMap,Yl=new WeakMap,yi=new WeakMap,Kr=new WeakSet,In=function(t){const r=o=>{switch(t.type){case"failed":return{...o,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...o,fetchStatus:"paused"};case"continue":return{...o,fetchStatus:"fetching"};case"fetch":return{...o,...a6(o.data,this.options),fetchMeta:t.meta??null};case"success":const i={...o,...e1(t.data,t.dataUpdatedAt),dataUpdateCount:o.dataUpdateCount+1,...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return Ae(this,Ts,t.manual?i:void 0),i;case"error":const s=t.error;return{...o,error:s,errorUpdateCount:o.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:o.fetchFailureCount+1,fetchFailureReason:s,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...o,isInvalidated:!0};case"setState":return{...o,...t.state}}};this.state=r(this.state),Vt.batch(()=>{this.observers.forEach(o=>{o.onQueryUpdate()}),te(this,Mr).notify({query:this,type:"updated",action:t})})},H2);function a6(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:uj(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function e1(e,t){return{data:e,dataUpdatedAt:t??Date.now(),error:null,isInvalidated:!1,status:"success"}}function t1(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,r=t!==void 0,o=r?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:r?o??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:r?"success":"pending",fetchStatus:"idle"}}function r1(e){return{onFetch:(t,r)=>{var h,f,x,S,m;const o=t.options,i=(x=(f=(h=t.fetchOptions)==null?void 0:h.meta)==null?void 0:f.fetchMore)==null?void 0:x.direction,s=((S=t.state.data)==null?void 0:S.pages)||[],a=((m=t.state.data)==null?void 0:m.pageParams)||[];let c={pages:[],pageParams:[]},d=0;const p=async()=>{let b=!1;const w=y=>{Z8(y,()=>t.signal,()=>b=!0)},j=cj(t.options,t.fetchOptions),v=async(y,g,k)=>{if(b)return Promise.reject();if(g==null&&y.pages.length)return Promise.resolve(y);const _=(()=>{const V={client:t.client,queryKey:t.queryKey,pageParam:g,direction:k?"backward":"forward",meta:t.options.meta};return w(V),V})(),z=await j(_),{maxPages:D}=t.options,B=k?J8:K8;return{pages:B(y.pages,z,D),pageParams:B(y.pageParams,g,D)}};if(i&&s.length){const y=i==="backward",g=y?l6:n1,k={pages:s,pageParams:a},C=g(o,k);c=await v(k,C,y)}else{const y=e??s.length;do{const g=d===0?a[0]??o.initialPageParam:n1(o,c);if(d>0&&g==null)break;c=await v(c,g),d++}while(d<y)}return c};t.options.persister?t.fetchFn=()=>{var b,w;return(w=(b=t.options).persister)==null?void 0:w.call(b,p,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},r)}:t.fetchFn=p}}}function n1(e,{pages:t,pageParams:r}){const o=t.length-1;return t.length>0?e.getNextPageParam(t[o],t,r[o],r):void 0}function l6(e,{pages:t,pageParams:r}){var o;return t.length>0?(o=e.getPreviousPageParam)==null?void 0:o.call(e,t[0],t,r[0],r):void 0}var Vl,yn,er,vi,vn,so,U2,c6=(U2=class extends hj{constructor(t){super();Ue(this,vn);Ue(this,Vl);Ue(this,yn);Ue(this,er);Ue(this,vi);Ae(this,Vl,t.client),this.mutationId=t.mutationId,Ae(this,er,t.mutationCache),Ae(this,yn,[]),this.state=t.state||fj(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){te(this,yn).includes(t)||(te(this,yn).push(t),this.clearGcTimeout(),te(this,er).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){Ae(this,yn,te(this,yn).filter(r=>r!==t)),this.scheduleGc(),te(this,er).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){te(this,yn).length||(this.state.status==="pending"?this.scheduleGc():te(this,er).remove(this))}continue(){var t;return((t=te(this,vi))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var a,c,d,p,h,f,x,S,m,b,w,j,v,y,g,k,C,_;const r=()=>{$t(this,vn,so).call(this,{type:"continue"})},o={client:te(this,Vl),meta:this.options.meta,mutationKey:this.options.mutationKey};Ae(this,vi,pj({fn:()=>this.options.mutationFn?this.options.mutationFn(t,o):Promise.reject(new Error("No mutationFn found")),onFail:(z,D)=>{$t(this,vn,so).call(this,{type:"failed",failureCount:z,error:D})},onPause:()=>{$t(this,vn,so).call(this,{type:"pause"})},onContinue:r,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>te(this,er).canRun(this)}));const i=this.state.status==="pending",s=!te(this,vi).canStart();try{if(i)r();else{$t(this,vn,so).call(this,{type:"pending",variables:t,isPaused:s}),te(this,er).config.onMutate&&await te(this,er).config.onMutate(t,this,o);const D=await((c=(a=this.options).onMutate)==null?void 0:c.call(a,t,o));D!==this.state.context&&$t(this,vn,so).call(this,{type:"pending",context:D,variables:t,isPaused:s})}const z=await te(this,vi).start();return await((p=(d=te(this,er).config).onSuccess)==null?void 0:p.call(d,z,t,this.state.context,this,o)),await((f=(h=this.options).onSuccess)==null?void 0:f.call(h,z,t,this.state.context,o)),await((S=(x=te(this,er).config).onSettled)==null?void 0:S.call(x,z,null,this.state.variables,this.state.context,this,o)),await((b=(m=this.options).onSettled)==null?void 0:b.call(m,z,null,t,this.state.context,o)),$t(this,vn,so).call(this,{type:"success",data:z}),z}catch(z){try{await((j=(w=te(this,er).config).onError)==null?void 0:j.call(w,z,t,this.state.context,this,o))}catch(D){Promise.reject(D)}try{await((y=(v=this.options).onError)==null?void 0:y.call(v,z,t,this.state.context,o))}catch(D){Promise.reject(D)}try{await((k=(g=te(this,er).config).onSettled)==null?void 0:k.call(g,void 0,z,this.state.variables,this.state.context,this,o))}catch(D){Promise.reject(D)}try{await((_=(C=this.options).onSettled)==null?void 0:_.call(C,void 0,z,t,this.state.context,o))}catch(D){Promise.reject(D)}throw $t(this,vn,so).call(this,{type:"error",error:z}),z}finally{te(this,er).runNext(this)}}},Vl=new WeakMap,yn=new WeakMap,er=new WeakMap,vi=new WeakMap,vn=new WeakSet,so=function(t){const r=o=>{switch(t.type){case"failed":return{...o,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...o,isPaused:!0};case"continue":return{...o,isPaused:!1};case"pending":return{...o,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...o,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...o,data:void 0,error:t.error,failureCount:o.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=r(this.state),Vt.batch(()=>{te(this,yn).forEach(o=>{o.onMutationUpdate(t)}),te(this,er).notify({mutation:this,type:"updated",action:t})})},U2);function fj(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var Dn,Jr,Wl,Y2,d6=(Y2=class extends Zl{constructor(t={}){super();Ue(this,Dn);Ue(this,Jr);Ue(this,Wl);this.config=t,Ae(this,Dn,new Set),Ae(this,Jr,new Map),Ae(this,Wl,0)}build(t,r,o){const i=new c6({client:t,mutationCache:this,mutationId:++pc(this,Wl)._,options:t.defaultMutationOptions(r),state:o});return this.add(i),i}add(t){te(this,Dn).add(t);const r=Ec(t);if(typeof r=="string"){const o=te(this,Jr).get(r);o?o.push(t):te(this,Jr).set(r,[t])}this.notify({type:"added",mutation:t})}remove(t){if(te(this,Dn).delete(t)){const r=Ec(t);if(typeof r=="string"){const o=te(this,Jr).get(r);if(o)if(o.length>1){const i=o.indexOf(t);i!==-1&&o.splice(i,1)}else o[0]===t&&te(this,Jr).delete(r)}}this.notify({type:"removed",mutation:t})}canRun(t){const r=Ec(t);if(typeof r=="string"){const o=te(this,Jr).get(r),i=o==null?void 0:o.find(s=>s.state.status==="pending");return!i||i===t}else return!0}runNext(t){var o;const r=Ec(t);if(typeof r=="string"){const i=(o=te(this,Jr).get(r))==null?void 0:o.find(s=>s!==t&&s.state.isPaused);return(i==null?void 0:i.continue())??Promise.resolve()}else return Promise.resolve()}clear(){Vt.batch(()=>{te(this,Dn).forEach(t=>{this.notify({type:"removed",mutation:t})}),te(this,Dn).clear(),te(this,Jr).clear()})}getAll(){return Array.from(te(this,Dn))}find(t){const r={exact:!0,...t};return this.getAll().find(o=>J0(r,o))}findAll(t={}){return this.getAll().filter(r=>J0(t,r))}notify(t){Vt.batch(()=>{this.listeners.forEach(r=>{r(t)})})}resumePausedMutations(){const t=this.getAll().filter(r=>r.state.isPaused);return Vt.batch(()=>Promise.all(t.map(r=>r.continue().catch(Ir))))}},Dn=new WeakMap,Jr=new WeakMap,Wl=new WeakMap,Y2);function Ec(e){var t;return(t=e.options.scope)==null?void 0:t.id}var Fn,vo,pr,Nn,Yn,Td,lx,V2,u6=(V2=class extends Zl{constructor(r,o){super();Ue(this,Yn);Ue(this,Fn);Ue(this,vo);Ue(this,pr);Ue(this,Nn);Ae(this,Fn,r),this.setOptions(o),this.bindMethods(),$t(this,Yn,Td).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(r){var i;const o=this.options;this.options=te(this,Fn).defaultMutationOptions(r),W8(this.options,o)||te(this,Fn).getMutationCache().notify({type:"observerOptionsUpdated",mutation:te(this,pr),observer:this}),o!=null&&o.mutationKey&&this.options.mutationKey&&Ri(o.mutationKey)!==Ri(this.options.mutationKey)?this.reset():((i=te(this,pr))==null?void 0:i.state.status)==="pending"&&te(this,pr).setOptions(this.options)}onUnsubscribe(){var r;this.hasListeners()||(r=te(this,pr))==null||r.removeObserver(this)}onMutationUpdate(r){$t(this,Yn,Td).call(this),$t(this,Yn,lx).call(this,r)}getCurrentResult(){return te(this,vo)}reset(){var r;(r=te(this,pr))==null||r.removeObserver(this),Ae(this,pr,void 0),$t(this,Yn,Td).call(this),$t(this,Yn,lx).call(this)}mutate(r,o){var i;return Ae(this,Nn,o),(i=te(this,pr))==null||i.removeObserver(this),Ae(this,pr,te(this,Fn).getMutationCache().build(te(this,Fn),this.options)),te(this,pr).addObserver(this),te(this,pr).execute(r)}},Fn=new WeakMap,vo=new WeakMap,pr=new WeakMap,Nn=new WeakMap,Yn=new WeakSet,Td=function(){var o;const r=((o=te(this,pr))==null?void 0:o.state)??fj();Ae(this,vo,{...r,isPending:r.status==="pending",isSuccess:r.status==="success",isError:r.status==="error",isIdle:r.status==="idle",mutate:this.mutate,reset:this.reset})},lx=function(r){Vt.batch(()=>{var o,i,s,a,c,d,p,h;if(te(this,Nn)&&this.hasListeners()){const f=te(this,vo).variables,x=te(this,vo).context,S={client:te(this,Fn),meta:this.options.meta,mutationKey:this.options.mutationKey};if((r==null?void 0:r.type)==="success"){try{(i=(o=te(this,Nn)).onSuccess)==null||i.call(o,r.data,f,x,S)}catch(m){Promise.reject(m)}try{(a=(s=te(this,Nn)).onSettled)==null||a.call(s,r.data,null,f,x,S)}catch(m){Promise.reject(m)}}else if((r==null?void 0:r.type)==="error"){try{(d=(c=te(this,Nn)).onError)==null||d.call(c,r.error,f,x,S)}catch(m){Promise.reject(m)}try{(h=(p=te(this,Nn)).onSettled)==null||h.call(p,void 0,r.error,f,x,S)}catch(m){Promise.reject(m)}}}this.listeners.forEach(f=>{f(te(this,vo))})})},V2),bn,W2,p6=(W2=class extends Zl{constructor(t={}){super();Ue(this,bn);this.config=t,Ae(this,bn,new Map)}build(t,r,o){const i=r.queryKey,s=r.queryHash??qg(i,r);let a=this.get(s);return a||(a=new s6({client:t,queryKey:i,queryHash:s,options:t.defaultQueryOptions(r),state:o,defaultOptions:t.getQueryDefaults(i)}),this.add(a)),a}add(t){te(this,bn).has(t.queryHash)||(te(this,bn).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const r=te(this,bn).get(t.queryHash);r&&(t.destroy(),r===t&&te(this,bn).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){Vt.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return te(this,bn).get(t)}getAll(){return[...te(this,bn).values()]}find(t){const r={exact:!0,...t};return this.getAll().find(o=>K0(r,o))}findAll(t={}){const r=this.getAll();return Object.keys(t).length>0?r.filter(o=>K0(t,o)):r}notify(t){Vt.batch(()=>{this.listeners.forEach(r=>{r(t)})})}onFocus(){Vt.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){Vt.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},bn=new WeakMap,W2),jt,bo,wo,Es,Rs,ko,Ps,Ms,G2,h6=(G2=class{constructor(e={}){Ue(this,jt);Ue(this,bo);Ue(this,wo);Ue(this,Es);Ue(this,Rs);Ue(this,ko);Ue(this,Ps);Ue(this,Ms);Ae(this,jt,e.queryCache||new p6),Ae(this,bo,e.mutationCache||new d6),Ae(this,wo,e.defaultOptions||{}),Ae(this,Es,new Map),Ae(this,Rs,new Map),Ae(this,ko,0)}mount(){pc(this,ko)._++,te(this,ko)===1&&(Ae(this,Ps,dj.subscribe(async e=>{e&&(await this.resumePausedMutations(),te(this,jt).onFocus())})),Ae(this,Ms,xu.subscribe(async e=>{e&&(await this.resumePausedMutations(),te(this,jt).onOnline())})))}unmount(){var e,t;pc(this,ko)._--,te(this,ko)===0&&((e=te(this,Ps))==null||e.call(this),Ae(this,Ps,void 0),(t=te(this,Ms))==null||t.call(this),Ae(this,Ms,void 0))}isFetching(e){return te(this,jt).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return te(this,bo).findAll({...e,status:"pending"}).length}getQueryData(e){var r;const t=this.defaultQueryOptions({queryKey:e});return(r=te(this,jt).get(t.queryHash))==null?void 0:r.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),r=te(this,jt).build(this,t),o=r.state.data;return o===void 0?this.fetchQuery(e):(e.revalidateIfStale&&r.isStaleByTime(ix(t.staleTime,r))&&this.prefetchQuery(t),Promise.resolve(o))}getQueriesData(e){return te(this,jt).findAll(e).map(({queryKey:t,state:r})=>{const o=r.data;return[t,o]})}setQueryData(e,t,r){const o=this.defaultQueryOptions({queryKey:e}),i=te(this,jt).get(o.queryHash),s=i==null?void 0:i.state.data,a=q8(t,s);if(a!==void 0)return te(this,jt).build(this,o).setData(a,{...r,manual:!0})}setQueriesData(e,t,r){return Vt.batch(()=>te(this,jt).findAll(e).map(({queryKey:o})=>[o,this.setQueryData(o,t,r)]))}getQueryState(e){var r;const t=this.defaultQueryOptions({queryKey:e});return(r=te(this,jt).get(t.queryHash))==null?void 0:r.state}removeQueries(e){const t=te(this,jt);Vt.batch(()=>{t.findAll(e).forEach(r=>{t.remove(r)})})}resetQueries(e,t){const r=te(this,jt);return Vt.batch(()=>(r.findAll(e).forEach(o=>{o.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const r={revert:!0,...t},o=Vt.batch(()=>te(this,jt).findAll(e).map(i=>i.cancel(r)));return Promise.all(o).then(Ir).catch(Ir)}invalidateQueries(e,t={}){return Vt.batch(()=>(te(this,jt).findAll(e).forEach(r=>{r.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},t)))}refetchQueries(e,t={}){const r={...t,cancelRefetch:t.cancelRefetch??!0},o=Vt.batch(()=>te(this,jt).findAll(e).filter(i=>!i.isDisabled()&&!i.isStatic()).map(i=>{let s=i.fetch(void 0,r);return r.throwOnError||(s=s.catch(Ir)),i.state.fetchStatus==="paused"?Promise.resolve():s}));return Promise.all(o).then(Ir)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const r=te(this,jt).build(this,t);return r.isStaleByTime(ix(t.staleTime,r))?r.fetch(t):Promise.resolve(r.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(Ir).catch(Ir)}fetchInfiniteQuery(e){return e.behavior=r1(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(Ir).catch(Ir)}ensureInfiniteQueryData(e){return e.behavior=r1(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return xu.isOnline()?te(this,bo).resumePausedMutations():Promise.resolve()}getQueryCache(){return te(this,jt)}getMutationCache(){return te(this,bo)}getDefaultOptions(){return te(this,wo)}setDefaultOptions(e){Ae(this,wo,e)}setQueryDefaults(e,t){te(this,Es).set(Ri(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...te(this,Es).values()],r={};return t.forEach(o=>{Bl(e,o.queryKey)&&Object.assign(r,o.defaultOptions)}),r}setMutationDefaults(e,t){te(this,Rs).set(Ri(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...te(this,Rs).values()],r={};return t.forEach(o=>{Bl(e,o.mutationKey)&&Object.assign(r,o.defaultOptions)}),r}defaultQueryOptions(e){if(e._defaulted)return e;const t={...te(this,wo).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=qg(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Hg&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...te(this,wo).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){te(this,jt).clear(),te(this,bo).clear()}},jt=new WeakMap,bo=new WeakMap,wo=new WeakMap,Es=new WeakMap,Rs=new WeakMap,ko=new WeakMap,Ps=new WeakMap,Ms=new WeakMap,G2),xj=u.createContext(void 0),f6=e=>{const t=u.useContext(xj);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},x6=({client:e,children:t})=>(u.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),n.jsx(xj.Provider,{value:e,children:t}));function gj(e,t){const r=f6(),[o]=u.useState(()=>new u6(r,e));u.useEffect(()=>{o.setOptions(e)},[o,e]);const i=u.useSyncExternalStore(u.useCallback(a=>o.subscribe(Vt.batchCalls(a)),[o]),()=>o.getCurrentResult(),()=>o.getCurrentResult()),s=u.useCallback((a,c)=>{o.mutate(a,c).catch(Ir)},[o]);if(i.error&&X8(o.options.throwOnError,[i.error]))throw i.error;return{...i,mutate:s,mutateAsync:i.mutate}}var mj={exports:{}};(function(e,t){(function(r,o){e.exports=o()})(Vx,function(){var r=1e3,o=6e4,i=36e5,s="millisecond",a="second",c="minute",d="hour",p="day",h="week",f="month",x="quarter",S="year",m="date",b="Invalid Date",w=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,j=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(A){var O=["th","st","nd","rd"],T=A%100;return"["+A+(O[(T-20)%10]||O[T]||O[0])+"]"}},y=function(A,O,T){var F=String(A);return!F||F.length>=O?A:""+Array(O+1-F.length).join(T)+A},g={s:y,z:function(A){var O=-A.utcOffset(),T=Math.abs(O),F=Math.floor(T/60),P=T%60;return(O<=0?"+":"-")+y(F,2,"0")+":"+y(P,2,"0")},m:function A(O,T){if(O.date()<T.date())return-A(T,O);var F=12*(T.year()-O.year())+(T.month()-O.month()),P=O.clone().add(F,f),q=T-P<0,$=O.clone().add(F+(q?-1:1),f);return+(-(F+(T-P)/(q?P-$:$-P))||0)},a:function(A){return A<0?Math.ceil(A)||0:Math.floor(A)},p:function(A){return{M:f,y:S,w:h,d:p,D:m,h:d,m:c,s:a,ms:s,Q:x}[A]||String(A||"").toLowerCase().replace(/s$/,"")},u:function(A){return A===void 0}},k="en",C={};C[k]=v;var _="$isDayjsObject",z=function(A){return A instanceof R||!(!A||!A[_])},D=function A(O,T,F){var P;if(!O)return k;if(typeof O=="string"){var q=O.toLowerCase();C[q]&&(P=q),T&&(C[q]=T,P=q);var $=O.split("-");if(!P&&$.length>1)return A($[0])}else{var E=O.name;C[E]=O,P=E}return!F&&P&&(k=P),P||!F&&k},B=function(A,O){if(z(A))return A.clone();var T=typeof O=="object"?O:{};return T.date=A,T.args=arguments,new R(T)},V=g;V.l=D,V.i=z,V.w=function(A,O){return B(A,{locale:O.$L,utc:O.$u,x:O.$x,$offset:O.$offset})};var R=function(){function A(T){this.$L=D(T.locale,null,!0),this.parse(T),this.$x=this.$x||T.x||{},this[_]=!0}var O=A.prototype;return O.parse=function(T){this.$d=function(F){var P=F.date,q=F.utc;if(P===null)return new Date(NaN);if(V.u(P))return new Date;if(P instanceof Date)return new Date(P);if(typeof P=="string"&&!/Z$/i.test(P)){var $=P.match(w);if($){var E=$[2]-1||0,I=($[7]||"0").substring(0,3);return q?new Date(Date.UTC($[1],E,$[3]||1,$[4]||0,$[5]||0,$[6]||0,I)):new Date($[1],E,$[3]||1,$[4]||0,$[5]||0,$[6]||0,I)}}return new Date(P)}(T),this.init()},O.init=function(){var T=this.$d;this.$y=T.getFullYear(),this.$M=T.getMonth(),this.$D=T.getDate(),this.$W=T.getDay(),this.$H=T.getHours(),this.$m=T.getMinutes(),this.$s=T.getSeconds(),this.$ms=T.getMilliseconds()},O.$utils=function(){return V},O.isValid=function(){return this.$d.toString()!==b},O.isSame=function(T,F){var P=B(T);return this.startOf(F)<=P&&P<=this.endOf(F)},O.isAfter=function(T,F){return B(T)<this.startOf(F)},O.isBefore=function(T,F){return this.endOf(F)<B(T)},O.$g=function(T,F,P){return V.u(T)?this[F]:this.set(P,T)},O.unix=function(){return Math.floor(this.valueOf()/1e3)},O.valueOf=function(){return this.$d.getTime()},O.startOf=function(T,F){var P=this,q=!!V.u(F)||F,$=V.p(T),E=function(ie,G){var le=V.w(P.$u?Date.UTC(P.$y,G,ie):new Date(P.$y,G,ie),P);return q?le:le.endOf(p)},I=function(ie,G){return V.w(P.toDate()[ie].apply(P.toDate("s"),(q?[0,0,0,0]:[23,59,59,999]).slice(G)),P)},N=this.$W,J=this.$M,Y=this.$D,L="set"+(this.$u?"UTC":"");switch($){case S:return q?E(1,0):E(31,11);case f:return q?E(1,J):E(0,J+1);case h:var H=this.$locale().weekStart||0,Q=(N<H?N+7:N)-H;return E(q?Y-Q:Y+(6-Q),J);case p:case m:return I(L+"Hours",0);case d:return I(L+"Minutes",1);case c:return I(L+"Seconds",2);case a:return I(L+"Milliseconds",3);default:return this.clone()}},O.endOf=function(T){return this.startOf(T,!1)},O.$set=function(T,F){var P,q=V.p(T),$="set"+(this.$u?"UTC":""),E=(P={},P[p]=$+"Date",P[m]=$+"Date",P[f]=$+"Month",P[S]=$+"FullYear",P[d]=$+"Hours",P[c]=$+"Minutes",P[a]=$+"Seconds",P[s]=$+"Milliseconds",P)[q],I=q===p?this.$D+(F-this.$W):F;if(q===f||q===S){var N=this.clone().set(m,1);N.$d[E](I),N.init(),this.$d=N.set(m,Math.min(this.$D,N.daysInMonth())).$d}else E&&this.$d[E](I);return this.init(),this},O.set=function(T,F){return this.clone().$set(T,F)},O.get=function(T){return this[V.p(T)]()},O.add=function(T,F){var P,q=this;T=Number(T);var $=V.p(F),E=function(J){var Y=B(q);return V.w(Y.date(Y.date()+Math.round(J*T)),q)};if($===f)return this.set(f,this.$M+T);if($===S)return this.set(S,this.$y+T);if($===p)return E(1);if($===h)return E(7);var I=(P={},P[c]=o,P[d]=i,P[a]=r,P)[$]||1,N=this.$d.getTime()+T*I;return V.w(N,this)},O.subtract=function(T,F){return this.add(-1*T,F)},O.format=function(T){var F=this,P=this.$locale();if(!this.isValid())return P.invalidDate||b;var q=T||"YYYY-MM-DDTHH:mm:ssZ",$=V.z(this),E=this.$H,I=this.$m,N=this.$M,J=P.weekdays,Y=P.months,L=P.meridiem,H=function(G,le,ue,me){return G&&(G[le]||G(F,q))||ue[le].slice(0,me)},Q=function(G){return V.s(E%12||12,G,"0")},ie=L||function(G,le,ue){var me=G<12?"AM":"PM";return ue?me.toLowerCase():me};return q.replace(j,function(G,le){return le||function(ue){switch(ue){case"YY":return String(F.$y).slice(-2);case"YYYY":return V.s(F.$y,4,"0");case"M":return N+1;case"MM":return V.s(N+1,2,"0");case"MMM":return H(P.monthsShort,N,Y,3);case"MMMM":return H(Y,N);case"D":return F.$D;case"DD":return V.s(F.$D,2,"0");case"d":return String(F.$W);case"dd":return H(P.weekdaysMin,F.$W,J,2);case"ddd":return H(P.weekdaysShort,F.$W,J,3);case"dddd":return J[F.$W];case"H":return String(E);case"HH":return V.s(E,2,"0");case"h":return Q(1);case"hh":return Q(2);case"a":return ie(E,I,!0);case"A":return ie(E,I,!1);case"m":return String(I);case"mm":return V.s(I,2,"0");case"s":return String(F.$s);case"ss":return V.s(F.$s,2,"0");case"SSS":return V.s(F.$ms,3,"0");case"Z":return $}return null}(G)||$.replace(":","")})},O.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},O.diff=function(T,F,P){var q,$=this,E=V.p(F),I=B(T),N=(I.utcOffset()-this.utcOffset())*o,J=this-I,Y=function(){return V.m($,I)};switch(E){case S:q=Y()/12;break;case f:q=Y();break;case x:q=Y()/3;break;case h:q=(J-N)/6048e5;break;case p:q=(J-N)/864e5;break;case d:q=J/i;break;case c:q=J/o;break;case a:q=J/r;break;default:q=J}return P?q:V.a(q)},O.daysInMonth=function(){return this.endOf(f).$D},O.$locale=function(){return C[this.$L]},O.locale=function(T,F){if(!T)return this.$L;var P=this.clone(),q=D(T,F,!0);return q&&(P.$L=q),P},O.clone=function(){return V.w(this.$d,this)},O.toDate=function(){return new Date(this.valueOf())},O.toJSON=function(){return this.isValid()?this.toISOString():null},O.toISOString=function(){return this.$d.toISOString()},O.toString=function(){return this.$d.toUTCString()},A}(),M=R.prototype;return B.prototype=M,[["$ms",s],["$s",a],["$m",c],["$H",d],["$W",p],["$M",f],["$y",S],["$D",m]].forEach(function(A){M[A[1]]=function(O){return this.$g(O,A[0],A[1])}}),B.extend=function(A,O){return A.$i||(A(O,R,B),A.$i=!0),B},B.locale=D,B.isDayjs=z,B.unix=function(A){return B(1e3*A)},B.en=C[k],B.Ls=C,B.p={},B})})(mj);var yj=mj.exports;const xt=Wx(yj);var g6={exports:{}};(function(e,t){(function(r,o){e.exports=o(yj)})(Vx,function(r){function o(a){return a&&typeof a=="object"&&"default"in a?a:{default:a}}var i=o(r),s={name:"uz-latn",weekdays:"Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),months:"Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),weekStart:1,weekdaysShort:"Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),monthsShort:"Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),weekdaysMin:"Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),ordinal:function(a){return a},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"D MMMM YYYY, dddd HH:mm"},relativeTime:{future:"Yaqin %s ichida",past:"%s oldin",s:"soniya",m:"bir daqiqa",mm:"%d daqiqa",h:"bir soat",hh:"%d soat",d:"bir kun",dd:"%d kun",M:"bir oy",MM:"%d oy",y:"bir yil",yy:"%d yil"}};return i.default.locale(s,null,!0),s})})(g6);/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Dl(){return Dl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},Dl.apply(this,arguments)}var Co;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Co||(Co={}));const o1="popstate";function m6(e){e===void 0&&(e={});function t(o,i){let{pathname:s,search:a,hash:c}=o.location;return cx("",{pathname:s,search:a,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(o,i){return typeof i=="string"?i:gu(i)}return v6(t,r,null,e)}function Tt(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ug(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function y6(){return Math.random().toString(36).substr(2,8)}function i1(e,t){return{usr:e.state,key:e.key,idx:t}}function cx(e,t,r,o){return r===void 0&&(r=null),Dl({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Js(t):t,{state:r,key:t&&t.key||o||y6()})}function gu(e){let{pathname:t="/",search:r="",hash:o=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),o&&o!=="#"&&(t+=o.charAt(0)==="#"?o:"#"+o),t}function Js(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let o=e.indexOf("?");o>=0&&(t.search=e.substr(o),e=e.substr(0,o)),e&&(t.pathname=e)}return t}function v6(e,t,r,o){o===void 0&&(o={});let{window:i=document.defaultView,v5Compat:s=!1}=o,a=i.history,c=Co.Pop,d=null,p=h();p==null&&(p=0,a.replaceState(Dl({},a.state,{idx:p}),""));function h(){return(a.state||{idx:null}).idx}function f(){c=Co.Pop;let w=h(),j=w==null?null:w-p;p=w,d&&d({action:c,location:b.location,delta:j})}function x(w,j){c=Co.Push;let v=cx(b.location,w,j);p=h()+1;let y=i1(v,p),g=b.createHref(v);try{a.pushState(y,"",g)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;i.location.assign(g)}s&&d&&d({action:c,location:b.location,delta:1})}function S(w,j){c=Co.Replace;let v=cx(b.location,w,j);p=h();let y=i1(v,p),g=b.createHref(v);a.replaceState(y,"",g),s&&d&&d({action:c,location:b.location,delta:0})}function m(w){let j=i.location.origin!=="null"?i.location.origin:i.location.href,v=typeof w=="string"?w:gu(w);return v=v.replace(/ $/,"%20"),Tt(j,"No window.location.(origin|href) available to create URL for href: "+v),new URL(v,j)}let b={get action(){return c},get location(){return e(i,a)},listen(w){if(d)throw new Error("A history only accepts one active listener");return i.addEventListener(o1,f),d=w,()=>{i.removeEventListener(o1,f),d=null}},createHref(w){return t(i,w)},createURL:m,encodeLocation(w){let j=m(w);return{pathname:j.pathname,search:j.search,hash:j.hash}},push:x,replace:S,go(w){return a.go(w)}};return b}var s1;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(s1||(s1={}));function b6(e,t,r){return r===void 0&&(r="/"),w6(e,t,r)}function w6(e,t,r,o){let i=typeof t=="string"?Js(t):t,s=Yg(i.pathname||"/",r);if(s==null)return null;let a=vj(e);k6(a);let c=null;for(let d=0;c==null&&d<a.length;++d){let p=I6(s);c=R6(a[d],p)}return c}function vj(e,t,r,o){t===void 0&&(t=[]),r===void 0&&(r=[]),o===void 0&&(o="");let i=(s,a,c)=>{let d={relativePath:c===void 0?s.path||"":c,caseSensitive:s.caseSensitive===!0,childrenIndex:a,route:s};d.relativePath.startsWith("/")&&(Tt(d.relativePath.startsWith(o),'Absolute route path "'+d.relativePath+'" nested under path '+('"'+o+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),d.relativePath=d.relativePath.slice(o.length));let p=Io([o,d.relativePath]),h=r.concat(d);s.children&&s.children.length>0&&(Tt(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),vj(s.children,t,h,p)),!(s.path==null&&!s.index)&&t.push({path:p,score:T6(p,s.index),routesMeta:h})};return e.forEach((s,a)=>{var c;if(s.path===""||!((c=s.path)!=null&&c.includes("?")))i(s,a);else for(let d of bj(s.path))i(s,a,d)}),t}function bj(e){let t=e.split("/");if(t.length===0)return[];let[r,...o]=t,i=r.endsWith("?"),s=r.replace(/\?$/,"");if(o.length===0)return i?[s,""]:[s];let a=bj(o.join("/")),c=[];return c.push(...a.map(d=>d===""?s:[s,d].join("/"))),i&&c.push(...a),c.map(d=>e.startsWith("/")&&d===""?"/":d)}function k6(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:E6(t.routesMeta.map(o=>o.childrenIndex),r.routesMeta.map(o=>o.childrenIndex)))}const j6=/^:[\w-]+$/,S6=3,C6=2,z6=1,$6=10,_6=-2,a1=e=>e==="*";function T6(e,t){let r=e.split("/"),o=r.length;return r.some(a1)&&(o+=_6),t&&(o+=C6),r.filter(i=>!a1(i)).reduce((i,s)=>i+(j6.test(s)?S6:s===""?z6:$6),o)}function E6(e,t){return e.length===t.length&&e.slice(0,-1).every((o,i)=>o===t[i])?e[e.length-1]-t[t.length-1]:0}function R6(e,t,r){let{routesMeta:o}=e,i={},s="/",a=[];for(let c=0;c<o.length;++c){let d=o[c],p=c===o.length-1,h=s==="/"?t:t.slice(s.length)||"/",f=P6({path:d.relativePath,caseSensitive:d.caseSensitive,end:p},h),x=d.route;if(!f)return null;Object.assign(i,f.params),a.push({params:i,pathname:Io([s,f.pathname]),pathnameBase:D6(Io([s,f.pathnameBase])),route:x}),f.pathnameBase!=="/"&&(s=Io([s,f.pathnameBase]))}return a}function P6(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,o]=M6(e.path,e.caseSensitive,e.end),i=t.match(r);if(!i)return null;let s=i[0],a=s.replace(/(.)\/+$/,"$1"),c=i.slice(1);return{params:o.reduce((p,h,f)=>{let{paramName:x,isOptional:S}=h;if(x==="*"){let b=c[f]||"";a=s.slice(0,s.length-b.length).replace(/(.)\/+$/,"$1")}const m=c[f];return S&&!m?p[x]=void 0:p[x]=(m||"").replace(/%2F/g,"/"),p},{}),pathname:s,pathnameBase:a,pattern:e}}function M6(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Ug(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let o=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,c,d)=>(o.push({paramName:c,isOptional:d!=null}),d?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(o.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),o]}function I6(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ug(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Yg(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,o=e.charAt(r);return o&&o!=="/"?null:e.slice(r)||"/"}const A6=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,O6=e=>A6.test(e);function L6(e,t){t===void 0&&(t="/");let{pathname:r,search:o="",hash:i=""}=typeof e=="string"?Js(e):e,s;if(r)if(O6(r))s=r;else{if(r.includes("//")){let a=r;r=r.replace(/\/\/+/g,"/"),Ug(!1,"Pathnames cannot have embedded double slashes - normalizing "+(a+" -> "+r))}r.startsWith("/")?s=l1(r.substring(1),"/"):s=l1(r,t)}else s=t;return{pathname:s,search:F6(o),hash:N6(i)}}function l1(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?r.length>1&&r.pop():i!=="."&&r.push(i)}),r.length>1?r.join("/"):"/"}function Vp(e,t,r,o){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(o)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function B6(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Vg(e,t){let r=B6(e);return t?r.map((o,i)=>i===r.length-1?o.pathname:o.pathnameBase):r.map(o=>o.pathnameBase)}function Wg(e,t,r,o){o===void 0&&(o=!1);let i;typeof e=="string"?i=Js(e):(i=Dl({},e),Tt(!i.pathname||!i.pathname.includes("?"),Vp("?","pathname","search",i)),Tt(!i.pathname||!i.pathname.includes("#"),Vp("#","pathname","hash",i)),Tt(!i.search||!i.search.includes("#"),Vp("#","search","hash",i)));let s=e===""||i.pathname==="",a=s?"/":i.pathname,c;if(a==null)c=r;else{let f=t.length-1;if(!o&&a.startsWith("..")){let x=a.split("/");for(;x[0]==="..";)x.shift(),f-=1;i.pathname=x.join("/")}c=f>=0?t[f]:"/"}let d=L6(i,c),p=a&&a!=="/"&&a.endsWith("/"),h=(s||a===".")&&r.endsWith("/");return!d.pathname.endsWith("/")&&(p||h)&&(d.pathname+="/"),d}const Io=e=>e.join("/").replace(/\/\/+/g,"/"),D6=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),F6=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,N6=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function q6(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const wj=["post","put","patch","delete"];new Set(wj);const H6=["get",...wj];new Set(H6);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Fl(){return Fl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},Fl.apply(this,arguments)}const Gg=u.createContext(null),U6=u.createContext(null),Yo=u.createContext(null),Yu=u.createContext(null),Xn=u.createContext({outlet:null,matches:[],isDataRoute:!1}),kj=u.createContext(null);function Y6(e,t){let{relative:r}=t===void 0?{}:t;Xs()||Tt(!1);let{basename:o,navigator:i}=u.useContext(Yo),{hash:s,pathname:a,search:c}=Sj(e,{relative:r}),d=a;return o!=="/"&&(d=a==="/"?o:Io([o,a])),i.createHref({pathname:d,search:c,hash:s})}function Xs(){return u.useContext(Yu)!=null}function Bi(){return Xs()||Tt(!1),u.useContext(Yu).location}function jj(e){u.useContext(Yo).static||u.useLayoutEffect(e)}function Qt(){let{isDataRoute:e}=u.useContext(Xn);return e?oz():V6()}function V6(){Xs()||Tt(!1);let e=u.useContext(Gg),{basename:t,future:r,navigator:o}=u.useContext(Yo),{matches:i}=u.useContext(Xn),{pathname:s}=Bi(),a=JSON.stringify(Vg(i,r.v7_relativeSplatPath)),c=u.useRef(!1);return jj(()=>{c.current=!0}),u.useCallback(function(p,h){if(h===void 0&&(h={}),!c.current)return;if(typeof p=="number"){o.go(p);return}let f=Wg(p,JSON.parse(a),s,h.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:Io([t,f.pathname])),(h.replace?o.replace:o.push)(f,h.state,h)},[t,o,a,s,e])}function Qg(){let{matches:e}=u.useContext(Xn),t=e[e.length-1];return t?t.params:{}}function Sj(e,t){let{relative:r}=t===void 0?{}:t,{future:o}=u.useContext(Yo),{matches:i}=u.useContext(Xn),{pathname:s}=Bi(),a=JSON.stringify(Vg(i,o.v7_relativeSplatPath));return u.useMemo(()=>Wg(e,JSON.parse(a),s,r==="path"),[e,a,s,r])}function W6(e,t){return G6(e,t)}function G6(e,t,r,o){Xs()||Tt(!1);let{navigator:i}=u.useContext(Yo),{matches:s}=u.useContext(Xn),a=s[s.length-1],c=a?a.params:{};a&&a.pathname;let d=a?a.pathnameBase:"/";a&&a.route;let p=Bi(),h;if(t){var f;let w=typeof t=="string"?Js(t):t;d==="/"||(f=w.pathname)!=null&&f.startsWith(d)||Tt(!1),h=w}else h=p;let x=h.pathname||"/",S=x;if(d!=="/"){let w=d.replace(/^\//,"").split("/");S="/"+x.replace(/^\//,"").split("/").slice(w.length).join("/")}let m=b6(e,{pathname:S}),b=Z6(m&&m.map(w=>Object.assign({},w,{params:Object.assign({},c,w.params),pathname:Io([d,i.encodeLocation?i.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?d:Io([d,i.encodeLocation?i.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),s,r,o);return t&&b?u.createElement(Yu.Provider,{value:{location:Fl({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:Co.Pop}},b):b}function Q6(){let e=nz(),t=q6(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),r?u.createElement("pre",{style:i},r):null,null)}const K6=u.createElement(Q6,null);class J6 extends u.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?u.createElement(Xn.Provider,{value:this.props.routeContext},u.createElement(kj.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function X6(e){let{routeContext:t,match:r,children:o}=e,i=u.useContext(Gg);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),u.createElement(Xn.Provider,{value:t},o)}function Z6(e,t,r,o){var i;if(t===void 0&&(t=[]),r===void 0&&(r=null),o===void 0&&(o=null),e==null){var s;if(!r)return null;if(r.errors)e=r.matches;else if((s=o)!=null&&s.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let a=e,c=(i=r)==null?void 0:i.errors;if(c!=null){let h=a.findIndex(f=>f.route.id&&(c==null?void 0:c[f.route.id])!==void 0);h>=0||Tt(!1),a=a.slice(0,Math.min(a.length,h+1))}let d=!1,p=-1;if(r&&o&&o.v7_partialHydration)for(let h=0;h<a.length;h++){let f=a[h];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(p=h),f.route.id){let{loaderData:x,errors:S}=r,m=f.route.loader&&x[f.route.id]===void 0&&(!S||S[f.route.id]===void 0);if(f.route.lazy||m){d=!0,p>=0?a=a.slice(0,p+1):a=[a[0]];break}}}return a.reduceRight((h,f,x)=>{let S,m=!1,b=null,w=null;r&&(S=c&&f.route.id?c[f.route.id]:void 0,b=f.route.errorElement||K6,d&&(p<0&&x===0?(iz("route-fallback"),m=!0,w=null):p===x&&(m=!0,w=f.route.hydrateFallbackElement||null)));let j=t.concat(a.slice(0,x+1)),v=()=>{let y;return S?y=b:m?y=w:f.route.Component?y=u.createElement(f.route.Component,null):f.route.element?y=f.route.element:y=h,u.createElement(X6,{match:f,routeContext:{outlet:h,matches:j,isDataRoute:r!=null},children:y})};return r&&(f.route.ErrorBoundary||f.route.errorElement||x===0)?u.createElement(J6,{location:r.location,revalidation:r.revalidation,component:b,error:S,children:v(),routeContext:{outlet:null,matches:j,isDataRoute:!0}}):v()},null)}var Cj=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Cj||{}),zj=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(zj||{});function ez(e){let t=u.useContext(Gg);return t||Tt(!1),t}function tz(e){let t=u.useContext(U6);return t||Tt(!1),t}function rz(e){let t=u.useContext(Xn);return t||Tt(!1),t}function $j(e){let t=rz(),r=t.matches[t.matches.length-1];return r.route.id||Tt(!1),r.route.id}function nz(){var e;let t=u.useContext(kj),r=tz(),o=$j();return t!==void 0?t:(e=r.errors)==null?void 0:e[o]}function oz(){let{router:e}=ez(Cj.UseNavigateStable),t=$j(zj.UseNavigateStable),r=u.useRef(!1);return jj(()=>{r.current=!0}),u.useCallback(function(i,s){s===void 0&&(s={}),r.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,Fl({fromRouteId:t},s)))},[e,t])}const c1={};function iz(e,t,r){c1[e]||(c1[e]=!0)}function sz(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function az(e){let{to:t,replace:r,state:o,relative:i}=e;Xs()||Tt(!1);let{future:s,static:a}=u.useContext(Yo),{matches:c}=u.useContext(Xn),{pathname:d}=Bi(),p=Qt(),h=Wg(t,Vg(c,s.v7_relativeSplatPath),d,i==="path"),f=JSON.stringify(h);return u.useEffect(()=>p(JSON.parse(f),{replace:r,state:o,relative:i}),[p,f,i,r,o]),null}function Zt(e){Tt(!1)}function lz(e){let{basename:t="/",children:r=null,location:o,navigationType:i=Co.Pop,navigator:s,static:a=!1,future:c}=e;Xs()&&Tt(!1);let d=t.replace(/^\/*/,"/"),p=u.useMemo(()=>({basename:d,navigator:s,static:a,future:Fl({v7_relativeSplatPath:!1},c)}),[d,c,s,a]);typeof o=="string"&&(o=Js(o));let{pathname:h="/",search:f="",hash:x="",state:S=null,key:m="default"}=o,b=u.useMemo(()=>{let w=Yg(h,d);return w==null?null:{location:{pathname:w,search:f,hash:x,state:S,key:m},navigationType:i}},[d,h,f,x,S,m,i]);return b==null?null:u.createElement(Yo.Provider,{value:p},u.createElement(Yu.Provider,{children:r,value:b}))}function cz(e){let{children:t,location:r}=e;return W6(dx(t),r)}new Promise(()=>{});function dx(e,t){t===void 0&&(t=[]);let r=[];return u.Children.forEach(e,(o,i)=>{if(!u.isValidElement(o))return;let s=[...t,i];if(o.type===u.Fragment){r.push.apply(r,dx(o.props.children,s));return}o.type!==Zt&&Tt(!1),!o.props.index||!o.props.children||Tt(!1);let a={id:o.props.id||s.join("-"),caseSensitive:o.props.caseSensitive,element:o.props.element,Component:o.props.Component,index:o.props.index,path:o.props.path,loader:o.props.loader,action:o.props.action,errorElement:o.props.errorElement,ErrorBoundary:o.props.ErrorBoundary,hasErrorBoundary:o.props.ErrorBoundary!=null||o.props.errorElement!=null,shouldRevalidate:o.props.shouldRevalidate,handle:o.props.handle,lazy:o.props.lazy};o.props.children&&(a.children=dx(o.props.children,s)),r.push(a)}),r}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ux(){return ux=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},ux.apply(this,arguments)}function dz(e,t){if(e==null)return{};var r={},o=Object.keys(e),i,s;for(s=0;s<o.length;s++)i=o[s],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}function uz(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function pz(e,t){return e.button===0&&(!t||t==="_self")&&!uz(e)}const hz=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],fz="6";try{window.__reactRouterVersion=fz}catch{}const xz="startTransition",d1=_C[xz];function gz(e){let{basename:t,children:r,future:o,window:i}=e,s=u.useRef();s.current==null&&(s.current=m6({window:i,v5Compat:!0}));let a=s.current,[c,d]=u.useState({action:a.action,location:a.location}),{v7_startTransition:p}=o||{},h=u.useCallback(f=>{p&&d1?d1(()=>d(f)):d(f)},[d,p]);return u.useLayoutEffect(()=>a.listen(h),[a,h]),u.useEffect(()=>sz(o),[o]),u.createElement(lz,{basename:t,children:r,location:c.location,navigationType:c.action,navigator:a,future:o})}const mz=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",yz=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_j=u.forwardRef(function(t,r){let{onClick:o,relative:i,reloadDocument:s,replace:a,state:c,target:d,to:p,preventScrollReset:h,viewTransition:f}=t,x=dz(t,hz),{basename:S}=u.useContext(Yo),m,b=!1;if(typeof p=="string"&&yz.test(p)&&(m=p,mz))try{let y=new URL(window.location.href),g=p.startsWith("//")?new URL(y.protocol+p):new URL(p),k=Yg(g.pathname,S);g.origin===y.origin&&k!=null?p=k+g.search+g.hash:b=!0}catch{}let w=Y6(p,{relative:i}),j=vz(p,{replace:a,state:c,target:d,preventScrollReset:h,relative:i,viewTransition:f});function v(y){o&&o(y),y.defaultPrevented||j(y)}return u.createElement("a",ux({},x,{href:m||w,onClick:b||s?o:v,ref:r,target:d}))});var u1;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(u1||(u1={}));var p1;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(p1||(p1={}));function vz(e,t){let{target:r,replace:o,state:i,preventScrollReset:s,relative:a,viewTransition:c}=t===void 0?{}:t,d=Qt(),p=Bi(),h=Sj(e,{relative:a});return u.useCallback(f=>{if(pz(f,r)){f.preventDefault();let x=o!==void 0?o:gu(p)===gu(h);d(e,{replace:x,state:i,preventScrollReset:s,relative:a,viewTransition:c})}},[p,d,h,o,i,r,e,s,a,c])}var xr=function(){return xr=Object.assign||function(t){for(var r,o=1,i=arguments.length;o<i;o++){r=arguments[o];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},xr.apply(this,arguments)};function Nl(e,t,r){if(r||arguments.length===2)for(var o=0,i=t.length,s;o<i;o++)(s||!(o in t))&&(s||(s=Array.prototype.slice.call(t,0,o)),s[o]=t[o]);return e.concat(s||Array.prototype.slice.call(t))}var ft="-ms-",xl="-moz-",it="-webkit-",Tj="comm",Vu="rule",Kg="decl",bz="@import",Ej="@keyframes",wz="@layer",Rj=Math.abs,Jg=String.fromCharCode,px=Object.assign;function kz(e,t){return Ft(e,0)^45?(((t<<2^Ft(e,0))<<2^Ft(e,1))<<2^Ft(e,2))<<2^Ft(e,3):0}function Pj(e){return e.trim()}function Ln(e,t){return(e=t.exec(e))?e[0]:e}function Ye(e,t,r){return e.replace(t,r)}function Ed(e,t,r){return e.indexOf(t,r)}function Ft(e,t){return e.charCodeAt(t)|0}function Ns(e,t,r){return e.slice(t,r)}function wn(e){return e.length}function Mj(e){return e.length}function nl(e,t){return t.push(e),e}function jz(e,t){return e.map(t).join("")}function h1(e,t){return e.filter(function(r){return!Ln(r,t)})}var Wu=1,qs=1,Ij=0,Hr=0,Pt=0,Zs="";function Gu(e,t,r,o,i,s,a,c){return{value:e,root:t,parent:r,type:o,props:i,children:s,line:Wu,column:qs,length:a,return:"",siblings:c}}function ao(e,t){return px(Gu("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Gi(e){for(;e.root;)e=ao(e.root,{children:[e]});nl(e,e.siblings)}function Sz(){return Pt}function Cz(){return Pt=Hr>0?Ft(Zs,--Hr):0,qs--,Pt===10&&(qs=1,Wu--),Pt}function sn(){return Pt=Hr<Ij?Ft(Zs,Hr++):0,qs++,Pt===10&&(qs=1,Wu++),Pt}function ki(){return Ft(Zs,Hr)}function Rd(){return Hr}function Qu(e,t){return Ns(Zs,e,t)}function hx(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function zz(e){return Wu=qs=1,Ij=wn(Zs=e),Hr=0,[]}function $z(e){return Zs="",e}function Wp(e){return Pj(Qu(Hr-1,fx(e===91?e+2:e===40?e+1:e)))}function _z(e){for(;(Pt=ki())&&Pt<33;)sn();return hx(e)>2||hx(Pt)>3?"":" "}function Tz(e,t){for(;--t&&sn()&&!(Pt<48||Pt>102||Pt>57&&Pt<65||Pt>70&&Pt<97););return Qu(e,Rd()+(t<6&&ki()==32&&sn()==32))}function fx(e){for(;sn();)switch(Pt){case e:return Hr;case 34:case 39:e!==34&&e!==39&&fx(Pt);break;case 40:e===41&&fx(e);break;case 92:sn();break}return Hr}function Ez(e,t){for(;sn()&&e+Pt!==57;)if(e+Pt===84&&ki()===47)break;return"/*"+Qu(t,Hr-1)+"*"+Jg(e===47?e:sn())}function Rz(e){for(;!hx(ki());)sn();return Qu(e,Hr)}function Pz(e){return $z(Pd("",null,null,null,[""],e=zz(e),0,[0],e))}function Pd(e,t,r,o,i,s,a,c,d){for(var p=0,h=0,f=a,x=0,S=0,m=0,b=1,w=1,j=1,v=0,y="",g=i,k=s,C=o,_=y;w;)switch(m=v,v=sn()){case 40:if(m!=108&&Ft(_,f-1)==58){Ed(_+=Ye(Wp(v),"&","&\f"),"&\f",Rj(p?c[p-1]:0))!=-1&&(j=-1);break}case 34:case 39:case 91:_+=Wp(v);break;case 9:case 10:case 13:case 32:_+=_z(m);break;case 92:_+=Tz(Rd()-1,7);continue;case 47:switch(ki()){case 42:case 47:nl(Mz(Ez(sn(),Rd()),t,r,d),d);break;default:_+="/"}break;case 123*b:c[p++]=wn(_)*j;case 125*b:case 59:case 0:switch(v){case 0:case 125:w=0;case 59+h:j==-1&&(_=Ye(_,/\f/g,"")),S>0&&wn(_)-f&&nl(S>32?x1(_+";",o,r,f-1,d):x1(Ye(_," ","")+";",o,r,f-2,d),d);break;case 59:_+=";";default:if(nl(C=f1(_,t,r,p,h,i,c,y,g=[],k=[],f,s),s),v===123)if(h===0)Pd(_,t,C,C,g,s,f,c,k);else switch(x===99&&Ft(_,3)===110?100:x){case 100:case 108:case 109:case 115:Pd(e,C,C,o&&nl(f1(e,C,C,0,0,i,c,y,i,g=[],f,k),k),i,k,f,c,o?g:k);break;default:Pd(_,C,C,C,[""],k,0,c,k)}}p=h=S=0,b=j=1,y=_="",f=a;break;case 58:f=1+wn(_),S=m;default:if(b<1){if(v==123)--b;else if(v==125&&b++==0&&Cz()==125)continue}switch(_+=Jg(v),v*b){case 38:j=h>0?1:(_+="\f",-1);break;case 44:c[p++]=(wn(_)-1)*j,j=1;break;case 64:ki()===45&&(_+=Wp(sn())),x=ki(),h=f=wn(y=_+=Rz(Rd())),v++;break;case 45:m===45&&wn(_)==2&&(b=0)}}return s}function f1(e,t,r,o,i,s,a,c,d,p,h,f){for(var x=i-1,S=i===0?s:[""],m=Mj(S),b=0,w=0,j=0;b<o;++b)for(var v=0,y=Ns(e,x+1,x=Rj(w=a[b])),g=e;v<m;++v)(g=Pj(w>0?S[v]+" "+y:Ye(y,/&\f/g,S[v])))&&(d[j++]=g);return Gu(e,t,r,i===0?Vu:c,d,p,h,f)}function Mz(e,t,r,o){return Gu(e,t,r,Tj,Jg(Sz()),Ns(e,2,-2),0,o)}function x1(e,t,r,o,i){return Gu(e,t,r,Kg,Ns(e,0,o),Ns(e,o+1,-1),o,i)}function Aj(e,t,r){switch(kz(e,t)){case 5103:return it+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return it+e+e;case 4789:return xl+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return it+e+xl+e+ft+e+e;case 5936:switch(Ft(e,t+11)){case 114:return it+e+ft+Ye(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return it+e+ft+Ye(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return it+e+ft+Ye(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return it+e+ft+e+e;case 6165:return it+e+ft+"flex-"+e+e;case 5187:return it+e+Ye(e,/(\w+).+(:[^]+)/,it+"box-$1$2"+ft+"flex-$1$2")+e;case 5443:return it+e+ft+"flex-item-"+Ye(e,/flex-|-self/g,"")+(Ln(e,/flex-|baseline/)?"":ft+"grid-row-"+Ye(e,/flex-|-self/g,""))+e;case 4675:return it+e+ft+"flex-line-pack"+Ye(e,/align-content|flex-|-self/g,"")+e;case 5548:return it+e+ft+Ye(e,"shrink","negative")+e;case 5292:return it+e+ft+Ye(e,"basis","preferred-size")+e;case 6060:return it+"box-"+Ye(e,"-grow","")+it+e+ft+Ye(e,"grow","positive")+e;case 4554:return it+Ye(e,/([^-])(transform)/g,"$1"+it+"$2")+e;case 6187:return Ye(Ye(Ye(e,/(zoom-|grab)/,it+"$1"),/(image-set)/,it+"$1"),e,"")+e;case 5495:case 3959:return Ye(e,/(image-set\([^]*)/,it+"$1$`$1");case 4968:return Ye(Ye(e,/(.+:)(flex-)?(.*)/,it+"box-pack:$3"+ft+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+it+e+e;case 4200:if(!Ln(e,/flex-|baseline/))return ft+"grid-column-align"+Ns(e,t)+e;break;case 2592:case 3360:return ft+Ye(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(o,i){return t=i,Ln(o.props,/grid-\w+-end/)})?~Ed(e+(r=r[t].value),"span",0)?e:ft+Ye(e,"-start","")+e+ft+"grid-row-span:"+(~Ed(r,"span",0)?Ln(r,/\d+/):+Ln(r,/\d+/)-+Ln(e,/\d+/))+";":ft+Ye(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(o){return Ln(o.props,/grid-\w+-start/)})?e:ft+Ye(Ye(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return Ye(e,/(.+)-inline(.+)/,it+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(wn(e)-1-t>6)switch(Ft(e,t+1)){case 109:if(Ft(e,t+4)!==45)break;case 102:return Ye(e,/(.+:)(.+)-([^]+)/,"$1"+it+"$2-$3$1"+xl+(Ft(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ed(e,"stretch",0)?Aj(Ye(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return Ye(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(o,i,s,a,c,d,p){return ft+i+":"+s+p+(a?ft+i+"-span:"+(c?d:+d-+s)+p:"")+e});case 4949:if(Ft(e,t+6)===121)return Ye(e,":",":"+it)+e;break;case 6444:switch(Ft(e,Ft(e,14)===45?18:11)){case 120:return Ye(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+it+(Ft(e,14)===45?"inline-":"")+"box$3$1"+it+"$2$3$1"+ft+"$2box$3")+e;case 100:return Ye(e,":",":"+ft)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ye(e,"scroll-","scroll-snap-")+e}return e}function mu(e,t){for(var r="",o=0;o<e.length;o++)r+=t(e[o],o,e,t)||"";return r}function Iz(e,t,r,o){switch(e.type){case wz:if(e.children.length)break;case bz:case Kg:return e.return=e.return||e.value;case Tj:return"";case Ej:return e.return=e.value+"{"+mu(e.children,o)+"}";case Vu:if(!wn(e.value=e.props.join(",")))return""}return wn(r=mu(e.children,o))?e.return=e.value+"{"+r+"}":""}function Az(e){var t=Mj(e);return function(r,o,i,s){for(var a="",c=0;c<t;c++)a+=e[c](r,o,i,s)||"";return a}}function Oz(e){return function(t){t.root||(t=t.return)&&e(t)}}function Lz(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case Kg:e.return=Aj(e.value,e.length,r);return;case Ej:return mu([ao(e,{value:Ye(e.value,"@","@"+it)})],o);case Vu:if(e.length)return jz(r=e.props,function(i){switch(Ln(i,o=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Gi(ao(e,{props:[Ye(i,/:(read-\w+)/,":"+xl+"$1")]})),Gi(ao(e,{props:[i]})),px(e,{props:h1(r,o)});break;case"::placeholder":Gi(ao(e,{props:[Ye(i,/:(plac\w+)/,":"+it+"input-$1")]})),Gi(ao(e,{props:[Ye(i,/:(plac\w+)/,":"+xl+"$1")]})),Gi(ao(e,{props:[Ye(i,/:(plac\w+)/,ft+"input-$1")]})),Gi(ao(e,{props:[i]})),px(e,{props:h1(r,o)});break}return""})}}var Bz={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},kr={},Hs=typeof process<"u"&&kr!==void 0&&(kr.REACT_APP_SC_ATTR||kr.SC_ATTR)||"data-styled",Oj="active",Lj="data-styled-version",Ku="6.1.19",Xg=`/*!sc*/
`,yu=typeof window<"u"&&typeof document<"u",Dz=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&kr!==void 0&&kr.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&kr.REACT_APP_SC_DISABLE_SPEEDY!==""?kr.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&kr.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&kr!==void 0&&kr.SC_DISABLE_SPEEDY!==void 0&&kr.SC_DISABLE_SPEEDY!==""&&kr.SC_DISABLE_SPEEDY!=="false"&&kr.SC_DISABLE_SPEEDY),Ju=Object.freeze([]),Us=Object.freeze({});function Fz(e,t,r){return r===void 0&&(r=Us),e.theme!==r.theme&&e.theme||t||r.theme}var Bj=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Nz=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,qz=/(^-|-$)/g;function g1(e){return e.replace(Nz,"-").replace(qz,"")}var Hz=/(a)(d)/gi,Rc=52,m1=function(e){return String.fromCharCode(e+(e>25?39:97))};function xx(e){var t,r="";for(t=Math.abs(e);t>Rc;t=t/Rc|0)r=m1(t%Rc)+r;return(m1(t%Rc)+r).replace(Hz,"$1-$2")}var Gp,Dj=5381,gs=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},Fj=function(e){return gs(Dj,e)};function Nj(e){return xx(Fj(e)>>>0)}function Uz(e){return e.displayName||e.name||"Component"}function Qp(e){return typeof e=="string"&&!0}var qj=typeof Symbol=="function"&&Symbol.for,Hj=qj?Symbol.for("react.memo"):60115,Yz=qj?Symbol.for("react.forward_ref"):60112,Vz={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Wz={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Uj={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Gz=((Gp={})[Yz]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Gp[Hj]=Uj,Gp);function y1(e){return("type"in(t=e)&&t.type.$$typeof)===Hj?Uj:"$$typeof"in e?Gz[e.$$typeof]:Vz;var t}var Qz=Object.defineProperty,Kz=Object.getOwnPropertyNames,v1=Object.getOwnPropertySymbols,Jz=Object.getOwnPropertyDescriptor,Xz=Object.getPrototypeOf,b1=Object.prototype;function Yj(e,t,r){if(typeof t!="string"){if(b1){var o=Xz(t);o&&o!==b1&&Yj(e,o,r)}var i=Kz(t);v1&&(i=i.concat(v1(t)));for(var s=y1(e),a=y1(t),c=0;c<i.length;++c){var d=i[c];if(!(d in Wz||r&&r[d]||a&&d in a||s&&d in s)){var p=Jz(t,d);try{Qz(e,d,p)}catch{}}}}return e}function Ys(e){return typeof e=="function"}function Zg(e){return typeof e=="object"&&"styledComponentId"in e}function ui(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function gx(e,t){if(e.length===0)return"";for(var r=e[0],o=1;o<e.length;o++)r+=e[o];return r}function ql(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function mx(e,t,r){if(r===void 0&&(r=!1),!r&&!ql(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var o=0;o<t.length;o++)e[o]=mx(e[o],t[o]);else if(ql(t))for(var o in t)e[o]=mx(e[o],t[o]);return e}function em(e,t){Object.defineProperty(e,"toString",{value:t})}function ec(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Zz=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,o=0;o<t;o++)r+=this.groupSizes[o];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var o=this.groupSizes,i=o.length,s=i;t>=s;)if((s<<=1)<0)throw ec(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(o),this.length=s;for(var a=i;a<s;a++)this.groupSizes[a]=0}for(var c=this.indexOfGroup(t+1),d=(a=0,r.length);a<d;a++)this.tag.insertRule(c,r[a])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],o=this.indexOfGroup(t),i=o+r;this.groupSizes[t]=0;for(var s=o;s<i;s++)this.tag.deleteRule(o)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var o=this.groupSizes[t],i=this.indexOfGroup(t),s=i+o,a=i;a<s;a++)r+="".concat(this.tag.getRule(a)).concat(Xg);return r},e}(),Md=new Map,vu=new Map,Id=1,Pc=function(e){if(Md.has(e))return Md.get(e);for(;vu.has(Id);)Id++;var t=Id++;return Md.set(e,t),vu.set(t,e),t},e3=function(e,t){Id=t+1,Md.set(e,t),vu.set(t,e)},t3="style[".concat(Hs,"][").concat(Lj,'="').concat(Ku,'"]'),r3=new RegExp("^".concat(Hs,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),n3=function(e,t,r){for(var o,i=r.split(","),s=0,a=i.length;s<a;s++)(o=i[s])&&e.registerName(t,o)},o3=function(e,t){for(var r,o=((r=t.textContent)!==null&&r!==void 0?r:"").split(Xg),i=[],s=0,a=o.length;s<a;s++){var c=o[s].trim();if(c){var d=c.match(r3);if(d){var p=0|parseInt(d[1],10),h=d[2];p!==0&&(e3(h,p),n3(e,h,d[3]),e.getTag().insertRules(p,i)),i.length=0}else i.push(c)}}},w1=function(e){for(var t=document.querySelectorAll(t3),r=0,o=t.length;r<o;r++){var i=t[r];i&&i.getAttribute(Hs)!==Oj&&(o3(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function i3(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Vj=function(e){var t=document.head,r=e||t,o=document.createElement("style"),i=function(c){var d=Array.from(c.querySelectorAll("style[".concat(Hs,"]")));return d[d.length-1]}(r),s=i!==void 0?i.nextSibling:null;o.setAttribute(Hs,Oj),o.setAttribute(Lj,Ku);var a=i3();return a&&o.setAttribute("nonce",a),r.insertBefore(o,s),o},s3=function(){function e(t){this.element=Vj(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var o=document.styleSheets,i=0,s=o.length;i<s;i++){var a=o[i];if(a.ownerNode===r)return a}throw ec(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),a3=function(){function e(t){this.element=Vj(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var o=document.createTextNode(r);return this.element.insertBefore(o,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),l3=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),k1=yu,c3={isServer:!yu,useCSSOMInjection:!Dz},Wj=function(){function e(t,r,o){t===void 0&&(t=Us),r===void 0&&(r={});var i=this;this.options=xr(xr({},c3),t),this.gs=r,this.names=new Map(o),this.server=!!t.isServer,!this.server&&yu&&k1&&(k1=!1,w1(this)),em(this,function(){return function(s){for(var a=s.getTag(),c=a.length,d="",p=function(f){var x=function(j){return vu.get(j)}(f);if(x===void 0)return"continue";var S=s.names.get(x),m=a.getGroup(f);if(S===void 0||!S.size||m.length===0)return"continue";var b="".concat(Hs,".g").concat(f,'[id="').concat(x,'"]'),w="";S!==void 0&&S.forEach(function(j){j.length>0&&(w+="".concat(j,","))}),d+="".concat(m).concat(b,'{content:"').concat(w,'"}').concat(Xg)},h=0;h<c;h++)p(h);return d}(i)})}return e.registerId=function(t){return Pc(t)},e.prototype.rehydrate=function(){!this.server&&yu&&w1(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(xr(xr({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var o=r.useCSSOMInjection,i=r.target;return r.isServer?new l3(i):o?new s3(i):new a3(i)}(this.options),new Zz(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(Pc(t),this.names.has(t))this.names.get(t).add(r);else{var o=new Set;o.add(r),this.names.set(t,o)}},e.prototype.insertRules=function(t,r,o){this.registerName(t,r),this.getTag().insertRules(Pc(t),o)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Pc(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),d3=/&/g,u3=/^\s*\/\/.*$/gm;function Gj(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(o){return"".concat(t," ").concat(o)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=Gj(r.children,t)),r})}function p3(e){var t,r,o,i=Us,s=i.options,a=s===void 0?Us:s,c=i.plugins,d=c===void 0?Ju:c,p=function(x,S,m){return m.startsWith(r)&&m.endsWith(r)&&m.replaceAll(r,"").length>0?".".concat(t):x},h=d.slice();h.push(function(x){x.type===Vu&&x.value.includes("&")&&(x.props[0]=x.props[0].replace(d3,r).replace(o,p))}),a.prefix&&h.push(Lz),h.push(Iz);var f=function(x,S,m,b){S===void 0&&(S=""),m===void 0&&(m=""),b===void 0&&(b="&"),t=b,r=S,o=new RegExp("\\".concat(r,"\\b"),"g");var w=x.replace(u3,""),j=Pz(m||S?"".concat(m," ").concat(S," { ").concat(w," }"):w);a.namespace&&(j=Gj(j,a.namespace));var v=[];return mu(j,Az(h.concat(Oz(function(y){return v.push(y)})))),v};return f.hash=d.length?d.reduce(function(x,S){return S.name||ec(15),gs(x,S.name)},Dj).toString():"",f}var h3=new Wj,yx=p3(),Qj=Qe.createContext({shouldForwardProp:void 0,styleSheet:h3,stylis:yx});Qj.Consumer;Qe.createContext(void 0);function j1(){return u.useContext(Qj)}var Kj=function(){function e(t,r){var o=this;this.inject=function(i,s){s===void 0&&(s=yx);var a=o.name+s.hash;i.hasNameForId(o.id,a)||i.insertRules(o.id,a,s(o.rules,a,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,em(this,function(){throw ec(12,String(o.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=yx),this.name+t.hash},e}(),f3=function(e){return e>="A"&&e<="Z"};function S1(e){for(var t="",r=0;r<e.length;r++){var o=e[r];if(r===1&&o==="-"&&e[0]==="-")return e;f3(o)?t+="-"+o.toLowerCase():t+=o}return t.startsWith("ms-")?"-"+t:t}var Jj=function(e){return e==null||e===!1||e===""},Xj=function(e){var t,r,o=[];for(var i in e){var s=e[i];e.hasOwnProperty(i)&&!Jj(s)&&(Array.isArray(s)&&s.isCss||Ys(s)?o.push("".concat(S1(i),":"),s,";"):ql(s)?o.push.apply(o,Nl(Nl(["".concat(i," {")],Xj(s),!1),["}"],!1)):o.push("".concat(S1(i),": ").concat((t=i,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in Bz||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return o};function ji(e,t,r,o){if(Jj(e))return[];if(Zg(e))return[".".concat(e.styledComponentId)];if(Ys(e)){if(!Ys(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var i=e(t);return ji(i,t,r,o)}var s;return e instanceof Kj?r?(e.inject(r,o),[e.getName(o)]):[e]:ql(e)?Xj(e):Array.isArray(e)?Array.prototype.concat.apply(Ju,e.map(function(a){return ji(a,t,r,o)})):[e.toString()]}function x3(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(Ys(r)&&!Zg(r))return!1}return!0}var g3=Fj(Ku),m3=function(){function e(t,r,o){this.rules=t,this.staticRulesId="",this.isStatic=(o===void 0||o.isStatic)&&x3(t),this.componentId=r,this.baseHash=gs(g3,r),this.baseStyle=o,Wj.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,o){var i=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,o):"";if(this.isStatic&&!o.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))i=ui(i,this.staticRulesId);else{var s=gx(ji(this.rules,t,r,o)),a=xx(gs(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,a)){var c=o(s,".".concat(a),void 0,this.componentId);r.insertRules(this.componentId,a,c)}i=ui(i,a),this.staticRulesId=a}else{for(var d=gs(this.baseHash,o.hash),p="",h=0;h<this.rules.length;h++){var f=this.rules[h];if(typeof f=="string")p+=f;else if(f){var x=gx(ji(f,t,r,o));d=gs(d,x+h),p+=x}}if(p){var S=xx(d>>>0);r.hasNameForId(this.componentId,S)||r.insertRules(this.componentId,S,o(p,".".concat(S),void 0,this.componentId)),i=ui(i,S)}}return i},e}(),Zj=Qe.createContext(void 0);Zj.Consumer;var Kp={};function y3(e,t,r){var o=Zg(e),i=e,s=!Qp(e),a=t.attrs,c=a===void 0?Ju:a,d=t.componentId,p=d===void 0?function(g,k){var C=typeof g!="string"?"sc":g1(g);Kp[C]=(Kp[C]||0)+1;var _="".concat(C,"-").concat(Nj(Ku+C+Kp[C]));return k?"".concat(k,"-").concat(_):_}(t.displayName,t.parentComponentId):d,h=t.displayName,f=h===void 0?function(g){return Qp(g)?"styled.".concat(g):"Styled(".concat(Uz(g),")")}(e):h,x=t.displayName&&t.componentId?"".concat(g1(t.displayName),"-").concat(t.componentId):t.componentId||p,S=o&&i.attrs?i.attrs.concat(c).filter(Boolean):c,m=t.shouldForwardProp;if(o&&i.shouldForwardProp){var b=i.shouldForwardProp;if(t.shouldForwardProp){var w=t.shouldForwardProp;m=function(g,k){return b(g,k)&&w(g,k)}}else m=b}var j=new m3(r,x,o?i.componentStyle:void 0);function v(g,k){return function(C,_,z){var D=C.attrs,B=C.componentStyle,V=C.defaultProps,R=C.foldedComponentIds,M=C.styledComponentId,A=C.target,O=Qe.useContext(Zj),T=j1(),F=C.shouldForwardProp||T.shouldForwardProp,P=Fz(_,O,V)||Us,q=function(Y,L,H){for(var Q,ie=xr(xr({},L),{className:void 0,theme:H}),G=0;G<Y.length;G+=1){var le=Ys(Q=Y[G])?Q(ie):Q;for(var ue in le)ie[ue]=ue==="className"?ui(ie[ue],le[ue]):ue==="style"?xr(xr({},ie[ue]),le[ue]):le[ue]}return L.className&&(ie.className=ui(ie.className,L.className)),ie}(D,_,P),$=q.as||A,E={};for(var I in q)q[I]===void 0||I[0]==="$"||I==="as"||I==="theme"&&q.theme===P||(I==="forwardedAs"?E.as=q.forwardedAs:F&&!F(I,$)||(E[I]=q[I]));var N=function(Y,L){var H=j1(),Q=Y.generateAndInjectStyles(L,H.styleSheet,H.stylis);return Q}(B,q),J=ui(R,M);return N&&(J+=" "+N),q.className&&(J+=" "+q.className),E[Qp($)&&!Bj.has($)?"class":"className"]=J,z&&(E.ref=z),u.createElement($,E)}(y,g,k)}v.displayName=f;var y=Qe.forwardRef(v);return y.attrs=S,y.componentStyle=j,y.displayName=f,y.shouldForwardProp=m,y.foldedComponentIds=o?ui(i.foldedComponentIds,i.styledComponentId):"",y.styledComponentId=x,y.target=o?i.target:e,Object.defineProperty(y,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(g){this._foldedDefaultProps=o?function(k){for(var C=[],_=1;_<arguments.length;_++)C[_-1]=arguments[_];for(var z=0,D=C;z<D.length;z++)mx(k,D[z],!0);return k}({},i.defaultProps,g):g}}),em(y,function(){return".".concat(y.styledComponentId)}),s&&Yj(y,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),y}function C1(e,t){for(var r=[e[0]],o=0,i=t.length;o<i;o+=1)r.push(t[o],e[o+1]);return r}var z1=function(e){return Object.assign(e,{isCss:!0})};function pi(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(Ys(e)||ql(e))return z1(ji(C1(Ju,Nl([e],t,!0))));var o=e;return t.length===0&&o.length===1&&typeof o[0]=="string"?ji(o):z1(ji(C1(o,t)))}function vx(e,t,r){if(r===void 0&&(r=Us),!t)throw ec(1,t);var o=function(i){for(var s=[],a=1;a<arguments.length;a++)s[a-1]=arguments[a];return e(t,r,pi.apply(void 0,Nl([i],s,!1)))};return o.attrs=function(i){return vx(e,t,xr(xr({},r),{attrs:Array.prototype.concat(r.attrs,i).filter(Boolean)}))},o.withConfig=function(i){return vx(e,t,xr(xr({},r),i))},o}var e4=function(e){return vx(y3,e)},l=e4;Bj.forEach(function(e){l[e]=e4(e)});function et(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var o=gx(pi.apply(void 0,Nl([e],t,!1))),i=Nj(o);return new Kj(i,o)}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v3={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b3=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),ce=(e,t)=>{const r=u.forwardRef(({color:o="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:c="",children:d,...p},h)=>u.createElement("svg",{ref:h,...v3,width:i,height:i,stroke:o,strokeWidth:a?Number(s)*24/Number(i):s,className:["lucide",`lucide-${b3(e)}`,c].join(" "),...p},[...t.map(([f,x])=>u.createElement(f,x)),...Array.isArray(d)?d:[d]]));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xu=ce("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t4=ce("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=ce("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w3=ce("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k3=ce("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r4=ce("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bx=ce("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=ce("BarChart",[["line",{x1:"12",x2:"12",y1:"20",y2:"10",key:"1vz5eb"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4",key:"cun8e5"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16",key:"hq0ia6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n4=ce("Bold",[["path",{d:"M14 12a4 4 0 0 0 0-8H6v8",key:"v2sylx"}],["path",{d:"M15 20a4 4 0 0 0 0-8H6v8Z",key:"1ef5ya"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j3=ce("BookCopy",[["path",{d:"M2 16V4a2 2 0 0 1 2-2h11",key:"spzkk5"}],["path",{d:"M5 14H4a2 2 0 1 0 0 4h1",key:"16gqf9"}],["path",{d:"M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12",key:"1owzki"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $n=ce("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wx=ce("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o4=ce("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=ce("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S3=ce("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rn=ce("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C3=ce("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=ce("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=ce("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z3=ce("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=ce("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ad=ce("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $3=ce("ChevronsDownUp",[["path",{d:"m7 20 5-5 5 5",key:"13a0gw"}],["path",{d:"m7 4 5 5 5-5",key:"1kwcof"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=ce("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=ce("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _3=ce("Code2",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T3=ce("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i4=ce("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bu=ce("CornerDownRight",[["polyline",{points:"15 10 20 15 15 20",key:"1q7qjw"}],["path",{d:"M4 4v7a4 4 0 0 0 4 4h12",key:"z08zvw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s4=ce("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a4=ce("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n=ce("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E3=ce("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R3=ce("FileVideo",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l4=ce("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P3=ce("Globe2",[["path",{d:"M21.54 15H17a2 2 0 0 0-2 2v4.54",key:"1djwo0"}],["path",{d:"M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.17",key:"1fi5u6"}],["path",{d:"M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05",key:"xsiumc"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tc=ce("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=ce("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zp=ce("Hand",[["path",{d:"M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0",key:"aigmz7"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2",key:"1n6bmn"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8",key:"a9iiix"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hl=ce("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M3=ce("Heading1",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"m17 12 3-2v8",key:"1hhhft"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I3=ce("Heading2",[["path",{d:"M4 12h8",key:"17cfdx"}],["path",{d:"M4 18V6",key:"1rz3zl"}],["path",{d:"M12 18V6",key:"zqpxq5"}],["path",{d:"M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",key:"9jr5yi"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c4=ce("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=ce("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=ce("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $1=ce("ImagePlus",[["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7",key:"31hg93"}],["line",{x1:"16",x2:"22",y1:"5",y2:"5",key:"ez7e4s"}],["line",{x1:"19",x2:"19",y1:"2",y2:"8",key:"1gkr8c"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=ce("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d4=ce("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u4=ce("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A3=ce("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=ce("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O3=ce("ListOrdered",[["line",{x1:"10",x2:"21",y1:"6",y2:"6",key:"76qw6h"}],["line",{x1:"10",x2:"21",y1:"12",y2:"12",key:"16nom4"}],["line",{x1:"10",x2:"21",y1:"18",y2:"18",key:"u3jurt"}],["path",{d:"M4 6h1v4",key:"cnovpq"}],["path",{d:"M4 10h2",key:"16xx2s"}],["path",{d:"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",key:"m9a95d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _1=ce("ListVideo",[["path",{d:"M12 12H3",key:"18klou"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M12 18H3",key:"11ftsu"}],["path",{d:"m16 12 5 3-5 3v-6Z",key:"zpskkp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L3=ce("List",[["line",{x1:"8",x2:"21",y1:"6",y2:"6",key:"7ey8pc"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12",key:"rjfblc"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18",key:"c3b1m8"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6",key:"1g7gq3"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12",key:"1pjlvk"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18",key:"28t2mc"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zu=ce("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ii=ce("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fo=ce("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B3=ce("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tm=ce("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D3=ce("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rm=ce("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ep=ce("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=ce("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F3=ce("MessagesSquare",[["path",{d:"M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z",key:"16vlm8"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",key:"1cx29u"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const si=ce("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=ce("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T1=ce("Minimize2",[["polyline",{points:"4 14 10 14 10 20",key:"11kfnr"}],["polyline",{points:"20 10 14 10 14 4",key:"rlmsce"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3",key:"o5lafz"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14",key:"1atl0r"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N3=ce("Minimize",[["path",{d:"M8 3v3a2 2 0 0 1-2 2H3",key:"hohbtr"}],["path",{d:"M21 8h-3a2 2 0 0 1-2-2V3",key:"5jw1f3"}],["path",{d:"M3 16h3a2 2 0 0 1 2 2v3",key:"198tvr"}],["path",{d:"M16 21v-3a2 2 0 0 1 2-2h3",key:"ph8mxp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p4=ce("MonitorOff",[["path",{d:"M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",key:"k0q8oc"}],["path",{d:"M22 15V5a2 2 0 0 0-2-2H9",key:"cp1ac0"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=ce("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nm=ce("MoreHorizontal",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q3=ce("MoreVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h4=ce("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",key:"1xcu5"}],["circle",{cx:"17.5",cy:"10.5",r:".5",key:"736e4u"}],["circle",{cx:"8.5",cy:"7.5",r:".5",key:"clrty"}],["circle",{cx:"6.5",cy:"12.5",r:".5",key:"1s4xz9"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H3=ce("PanelRight",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["line",{x1:"15",x2:"15",y1:"3",y2:"21",key:"1hpv9i"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U3=ce("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y3=ce("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=ce("Pen",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tp=ce("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=ce("PhoneOff",[["path",{d:"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91",key:"z86iuo"}],["line",{x1:"22",x2:"2",y1:"2",y2:"22",key:"11kh81"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f4=ce("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wu=ce("PlayCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=ce("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=ce("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V3=ce("Quote",[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",key:"4rm80e"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",key:"10za9r"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=ce("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W3=ce("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x4=ce("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rc=ce("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=ce("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G3=ce("ShieldAlert",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=ce("Shield",[["path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",key:"1irkt0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q3=ce("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K3=ce("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J3=ce("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=ce("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ku=ce("Swords",[["polyline",{points:"14.5 17.5 3 6 3 3 6 3 17.5 14.5",key:"1hfsw2"}],["line",{x1:"13",x2:"19",y1:"19",y2:"13",key:"1vrmhu"}],["line",{x1:"16",x2:"20",y1:"16",y2:"20",key:"1bron3"}],["line",{x1:"19",x2:"21",y1:"21",y2:"19",key:"13pww6"}],["polyline",{points:"14.5 6.5 18 3 21 3 21 6 17.5 9.5",key:"hbey2j"}],["line",{x1:"5",x2:"9",y1:"14",y2:"18",key:"1hf58s"}],["line",{x1:"7",x2:"4",y1:"17",y2:"20",key:"pidxm4"}],["line",{x1:"3",x2:"5",y1:"19",y2:"21",key:"1pehsh"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g4=ce("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=ce("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=ce("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X3=ce("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z3=ce("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m4=ce("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=ce("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e$=ce("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t$=ce("UserMinus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E1=ce("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R1=ce("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Si=ce("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r$=ce("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const No=ce("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=ce("VideoOff",[["path",{d:"M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8",key:"ubwiq0"}],["path",{d:"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z",key:"1l10zd"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=ce("Video",[["path",{d:"m22 8-6 4 6 4V8Z",key:"50v9me"}],["rect",{width:"14",height:"12",x:"2",y:"6",rx:"2",ry:"2",key:"1rqjg6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y4=ce("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n$=ce("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yl=ce("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=ce("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const op=ce("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),Tn=Object.create(null);Tn.open="0";Tn.close="1";Tn.ping="2";Tn.pong="3";Tn.message="4";Tn.upgrade="5";Tn.noop="6";const Od=Object.create(null);Object.keys(Tn).forEach(e=>{Od[Tn[e]]=e});const _x={type:"error",data:"parser error"},v4=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",b4=typeof ArrayBuffer=="function",w4=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e&&e.buffer instanceof ArrayBuffer,am=({type:e,data:t},r,o)=>v4&&t instanceof Blob?r?o(t):P1(t,o):b4&&(t instanceof ArrayBuffer||w4(t))?r?o(t):P1(new Blob([t]),o):o(Tn[e]+(t||"")),P1=(e,t)=>{const r=new FileReader;return r.onload=function(){const o=r.result.split(",")[1];t("b"+(o||""))},r.readAsDataURL(e)};function M1(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}let eh;function o$(e,t){if(v4&&e.data instanceof Blob)return e.data.arrayBuffer().then(M1).then(t);if(b4&&(e.data instanceof ArrayBuffer||w4(e.data)))return t(M1(e.data));am(e,!1,r=>{eh||(eh=new TextEncoder),t(eh.encode(r))})}const I1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ol=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let e=0;e<I1.length;e++)ol[I1.charCodeAt(e)]=e;const i$=e=>{let t=e.length*.75,r=e.length,o,i=0,s,a,c,d;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);const p=new ArrayBuffer(t),h=new Uint8Array(p);for(o=0;o<r;o+=4)s=ol[e.charCodeAt(o)],a=ol[e.charCodeAt(o+1)],c=ol[e.charCodeAt(o+2)],d=ol[e.charCodeAt(o+3)],h[i++]=s<<2|a>>4,h[i++]=(a&15)<<4|c>>2,h[i++]=(c&3)<<6|d&63;return p},s$=typeof ArrayBuffer=="function",lm=(e,t)=>{if(typeof e!="string")return{type:"message",data:k4(e,t)};const r=e.charAt(0);return r==="b"?{type:"message",data:a$(e.substring(1),t)}:Od[r]?e.length>1?{type:Od[r],data:e.substring(1)}:{type:Od[r]}:_x},a$=(e,t)=>{if(s$){const r=i$(e);return k4(r,t)}else return{base64:!0,data:e}},k4=(e,t)=>{switch(t){case"blob":return e instanceof Blob?e:new Blob([e]);case"arraybuffer":default:return e instanceof ArrayBuffer?e:e.buffer}},j4="",l$=(e,t)=>{const r=e.length,o=new Array(r);let i=0;e.forEach((s,a)=>{am(s,!1,c=>{o[a]=c,++i===r&&t(o.join(j4))})})},c$=(e,t)=>{const r=e.split(j4),o=[];for(let i=0;i<r.length;i++){const s=lm(r[i],t);if(o.push(s),s.type==="error")break}return o};function d$(){return new TransformStream({transform(e,t){o$(e,r=>{const o=r.length;let i;if(o<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,o);else if(o<65536){i=new Uint8Array(3);const s=new DataView(i.buffer);s.setUint8(0,126),s.setUint16(1,o)}else{i=new Uint8Array(9);const s=new DataView(i.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(o))}e.data&&typeof e.data!="string"&&(i[0]|=128),t.enqueue(i),t.enqueue(r)})}})}let th;function Mc(e){return e.reduce((t,r)=>t+r.length,0)}function Ic(e,t){if(e[0].length===t)return e.shift();const r=new Uint8Array(t);let o=0;for(let i=0;i<t;i++)r[i]=e[0][o++],o===e[0].length&&(e.shift(),o=0);return e.length&&o<e[0].length&&(e[0]=e[0].slice(o)),r}function u$(e,t){th||(th=new TextDecoder);const r=[];let o=0,i=-1,s=!1;return new TransformStream({transform(a,c){for(r.push(a);;){if(o===0){if(Mc(r)<1)break;const d=Ic(r,1);s=(d[0]&128)===128,i=d[0]&127,i<126?o=3:i===126?o=1:o=2}else if(o===1){if(Mc(r)<2)break;const d=Ic(r,2);i=new DataView(d.buffer,d.byteOffset,d.length).getUint16(0),o=3}else if(o===2){if(Mc(r)<8)break;const d=Ic(r,8),p=new DataView(d.buffer,d.byteOffset,d.length),h=p.getUint32(0);if(h>Math.pow(2,21)-1){c.enqueue(_x);break}i=h*Math.pow(2,32)+p.getUint32(4),o=3}else{if(Mc(r)<i)break;const d=Ic(r,i);c.enqueue(lm(s?d:th.decode(d),t)),o=0}if(i===0||i>e){c.enqueue(_x);break}}}})}const S4=4;function It(e){if(e)return p$(e)}function p$(e){for(var t in It.prototype)e[t]=It.prototype[t];return e}It.prototype.on=It.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this};It.prototype.once=function(e,t){function r(){this.off(e,r),t.apply(this,arguments)}return r.fn=t,this.on(e,r),this};It.prototype.off=It.prototype.removeListener=It.prototype.removeAllListeners=It.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var r=this._callbacks["$"+e];if(!r)return this;if(arguments.length==1)return delete this._callbacks["$"+e],this;for(var o,i=0;i<r.length;i++)if(o=r[i],o===t||o.fn===t){r.splice(i,1);break}return r.length===0&&delete this._callbacks["$"+e],this};It.prototype.emit=function(e){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),r=this._callbacks["$"+e],o=1;o<arguments.length;o++)t[o-1]=arguments[o];if(r){r=r.slice(0);for(var o=0,i=r.length;o<i;++o)r[o].apply(this,t)}return this};It.prototype.emitReserved=It.prototype.emit;It.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]};It.prototype.hasListeners=function(e){return!!this.listeners(e).length};const ip=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,r)=>r(t,0),Br=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),h$="arraybuffer";function C4(e,...t){return t.reduce((r,o)=>(e.hasOwnProperty(o)&&(r[o]=e[o]),r),{})}const f$=Br.setTimeout,x$=Br.clearTimeout;function sp(e,t){t.useNativeTimers?(e.setTimeoutFn=f$.bind(Br),e.clearTimeoutFn=x$.bind(Br)):(e.setTimeoutFn=Br.setTimeout.bind(Br),e.clearTimeoutFn=Br.clearTimeout.bind(Br))}const g$=1.33;function m$(e){return typeof e=="string"?y$(e):Math.ceil((e.byteLength||e.size)*g$)}function y$(e){let t=0,r=0;for(let o=0,i=e.length;o<i;o++)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:t<55296||t>=57344?r+=3:(o++,r+=4);return r}function z4(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function v$(e){let t="";for(let r in e)e.hasOwnProperty(r)&&(t.length&&(t+="&"),t+=encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t}function b$(e){let t={},r=e.split("&");for(let o=0,i=r.length;o<i;o++){let s=r[o].split("=");t[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return t}class w$ extends Error{constructor(t,r,o){super(t),this.description=r,this.context=o,this.type="TransportError"}}class cm extends It{constructor(t){super(),this.writable=!1,sp(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,r,o){return super.emitReserved("error",new w$(t,r,o)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const r=lm(t,this.socket.binaryType);this.onPacket(r)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,r={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(r)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const r=v$(t);return r.length?"?"+r:""}}class k$ extends cm{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const r=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let o=0;this._polling&&(o++,this.once("pollComplete",function(){--o||r()})),this.writable||(o++,this.once("drain",function(){--o||r()}))}else r()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const r=o=>{if(this.readyState==="opening"&&o.type==="open"&&this.onOpen(),o.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(o)};c$(t,this.socket.binaryType).forEach(r),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,l$(t,r=>{this.doWrite(r,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",r=this.query||{};return this.opts.timestampRequests!==!1&&(r[this.opts.timestampParam]=z4()),!this.supportsBinary&&!r.sid&&(r.b64=1),this.createUri(t,r)}}let $4=!1;try{$4=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const j$=$4;function S$(){}class C$ extends k${constructor(t){if(super(t),typeof location<"u"){const r=location.protocol==="https:";let o=location.port;o||(o=r?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||o!==t.port}}doWrite(t,r){const o=this.request({method:"POST",data:t});o.on("success",r),o.on("error",(i,s)=>{this.onError("xhr post error",i,s)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(r,o)=>{this.onError("xhr poll error",r,o)}),this.pollXhr=t}}class zn extends It{constructor(t,r,o){super(),this.createRequest=t,sp(this,o),this._opts=o,this._method=o.method||"GET",this._uri=r,this._data=o.data!==void 0?o.data:null,this._create()}_create(){var t;const r=C4(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");r.xdomain=!!this._opts.xd;const o=this._xhr=this.createRequest(r);try{o.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){o.setDisableHeaderCheck&&o.setDisableHeaderCheck(!0);for(let i in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(i)&&o.setRequestHeader(i,this._opts.extraHeaders[i])}}catch{}if(this._method==="POST")try{o.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{o.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(o),"withCredentials"in o&&(o.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(o.timeout=this._opts.requestTimeout),o.onreadystatechange=()=>{var i;o.readyState===3&&((i=this._opts.cookieJar)===null||i===void 0||i.parseCookies(o.getResponseHeader("set-cookie"))),o.readyState===4&&(o.status===200||o.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof o.status=="number"?o.status:0)},0))},o.send(this._data)}catch(i){this.setTimeoutFn(()=>{this._onError(i)},0);return}typeof document<"u"&&(this._index=zn.requestsCount++,zn.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=S$,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete zn.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}zn.requestsCount=0;zn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",A1);else if(typeof addEventListener=="function"){const e="onpagehide"in Br?"pagehide":"unload";addEventListener(e,A1,!1)}}function A1(){for(let e in zn.requests)zn.requests.hasOwnProperty(e)&&zn.requests[e].abort()}const z$=function(){const e=_4({xdomain:!1});return e&&e.responseType!==null}();class $$ extends C${constructor(t){super(t);const r=t&&t.forceBase64;this.supportsBinary=z$&&!r}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new zn(_4,this.uri(),t)}}function _4(e){const t=e.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||j$))return new XMLHttpRequest}catch{}if(!t)try{return new Br[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const T4=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class _$ extends cm{get name(){return"websocket"}doOpen(){const t=this.uri(),r=this.opts.protocols,o=T4?{}:C4(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(o.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,r,o)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let r=0;r<t.length;r++){const o=t[r],i=r===t.length-1;am(o,this.supportsBinary,s=>{try{this.doWrite(o,s)}catch{}i&&ip(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",r=this.query||{};return this.opts.timestampRequests&&(r[this.opts.timestampParam]=z4()),this.supportsBinary||(r.b64=1),this.createUri(t,r)}}const rh=Br.WebSocket||Br.MozWebSocket;class T$ extends _${createSocket(t,r,o){return T4?new rh(t,r,o):r?new rh(t,r):new rh(t)}doWrite(t,r){this.ws.send(r)}}class E$ extends cm{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const r=u$(Number.MAX_SAFE_INTEGER,this.socket.binaryType),o=t.readable.pipeThrough(r).getReader(),i=d$();i.readable.pipeTo(t.writable),this._writer=i.writable.getWriter();const s=()=>{o.read().then(({done:c,value:d})=>{c||(this.onPacket(d),s())}).catch(c=>{})};s();const a={type:"open"};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let r=0;r<t.length;r++){const o=t[r],i=r===t.length-1;this._writer.write(o).then(()=>{i&&ip(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const R$={websocket:T$,webtransport:E$,polling:$$},P$=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,M$=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Tx(e){if(e.length>8e3)throw"URI too long";const t=e,r=e.indexOf("["),o=e.indexOf("]");r!=-1&&o!=-1&&(e=e.substring(0,r)+e.substring(r,o).replace(/:/g,";")+e.substring(o,e.length));let i=P$.exec(e||""),s={},a=14;for(;a--;)s[M$[a]]=i[a]||"";return r!=-1&&o!=-1&&(s.source=t,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=I$(s,s.path),s.queryKey=A$(s,s.query),s}function I$(e,t){const r=/\/{2,9}/g,o=t.replace(r,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&o.splice(0,1),t.slice(-1)=="/"&&o.splice(o.length-1,1),o}function A$(e,t){const r={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(o,i,s){i&&(r[i]=s)}),r}const Ex=typeof addEventListener=="function"&&typeof removeEventListener=="function",Ld=[];Ex&&addEventListener("offline",()=>{Ld.forEach(e=>e())},!1);class Ao extends It{constructor(t,r){if(super(),this.binaryType=h$,this.writeBuffer=[],this._prevBufferLen=0,this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(r=t,t=null),t){const o=Tx(t);r.hostname=o.host,r.secure=o.protocol==="https"||o.protocol==="wss",r.port=o.port,o.query&&(r.query=o.query)}else r.host&&(r.hostname=Tx(r.host).host);sp(this,r),this.secure=r.secure!=null?r.secure:typeof location<"u"&&location.protocol==="https:",r.hostname&&!r.port&&(r.port=this.secure?"443":"80"),this.hostname=r.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=r.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=[],this._transportsByName={},r.transports.forEach(o=>{const i=o.prototype.name;this.transports.push(i),this._transportsByName[i]=o}),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},r),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=b$(this.opts.query)),Ex&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Ld.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const r=Object.assign({},this.opts.query);r.EIO=S4,r.transport=t,this.id&&(r.sid=this.id);const o=Object.assign({},this.opts,{query:r,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](o)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&Ao.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const r=this.createTransport(t);r.open(),this.setTransport(r)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",r=>this._onClose("transport close",r))}onOpen(){this.readyState="open",Ao.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush()}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const r=new Error("server error");r.code=t.data,this._onError(r);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let r=1;for(let o=0;o<this.writeBuffer.length;o++){const i=this.writeBuffer[o].data;if(i&&(r+=m$(i)),o>0&&r>this._maxPayload)return this.writeBuffer.slice(0,o);r+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,ip(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,r,o){return this._sendPacket("message",t,r,o),this}send(t,r,o){return this._sendPacket("message",t,r,o),this}_sendPacket(t,r,o,i){if(typeof r=="function"&&(i=r,r=void 0),typeof o=="function"&&(i=o,o=null),this.readyState==="closing"||this.readyState==="closed")return;o=o||{},o.compress=o.compress!==!1;const s={type:t,data:r,options:o};this.emitReserved("packetCreate",s),this.writeBuffer.push(s),i&&this.once("flush",i),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},r=()=>{this.off("upgrade",r),this.off("upgradeError",r),t()},o=()=>{this.once("upgrade",r),this.once("upgradeError",r)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?o():t()}):this.upgrading?o():t()),this}_onError(t){if(Ao.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,r){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Ex&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const o=Ld.indexOf(this._offlineEventListener);o!==-1&&Ld.splice(o,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,r),this.writeBuffer=[],this._prevBufferLen=0}}}Ao.protocol=S4;class O$ extends Ao{constructor(){super(...arguments),this._upgrades=[]}onOpen(){if(super.onOpen(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_probe(t){let r=this.createTransport(t),o=!1;Ao.priorWebsocketSuccess=!1;const i=()=>{o||(r.send([{type:"ping",data:"probe"}]),r.once("packet",f=>{if(!o)if(f.type==="pong"&&f.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",r),!r)return;Ao.priorWebsocketSuccess=r.name==="websocket",this.transport.pause(()=>{o||this.readyState!=="closed"&&(h(),this.setTransport(r),r.send([{type:"upgrade"}]),this.emitReserved("upgrade",r),r=null,this.upgrading=!1,this.flush())})}else{const x=new Error("probe error");x.transport=r.name,this.emitReserved("upgradeError",x)}}))};function s(){o||(o=!0,h(),r.close(),r=null)}const a=f=>{const x=new Error("probe error: "+f);x.transport=r.name,s(),this.emitReserved("upgradeError",x)};function c(){a("transport closed")}function d(){a("socket closed")}function p(f){r&&f.name!==r.name&&s()}const h=()=>{r.removeListener("open",i),r.removeListener("error",a),r.removeListener("close",c),this.off("close",d),this.off("upgrading",p)};r.once("open",i),r.once("error",a),r.once("close",c),this.once("close",d),this.once("upgrading",p),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{o||r.open()},200):r.open()}onHandshake(t){this._upgrades=this._filterUpgrades(t.upgrades),super.onHandshake(t)}_filterUpgrades(t){const r=[];for(let o=0;o<t.length;o++)~this.transports.indexOf(t[o])&&r.push(t[o]);return r}}let L$=class extends O${constructor(t,r={}){const o=typeof t=="object"?t:r;(!o.transports||o.transports&&typeof o.transports[0]=="string")&&(o.transports=(o.transports||["polling","websocket","webtransport"]).map(i=>R$[i]).filter(i=>!!i)),super(t,o)}};function B$(e,t="",r){let o=e;r=r||typeof location<"u"&&location,e==null&&(e=r.protocol+"//"+r.host),typeof e=="string"&&(e.charAt(0)==="/"&&(e.charAt(1)==="/"?e=r.protocol+e:e=r.host+e),/^(https?|wss?):\/\//.test(e)||(typeof r<"u"?e=r.protocol+"//"+e:e="https://"+e),o=Tx(e)),o.port||(/^(http|ws)$/.test(o.protocol)?o.port="80":/^(http|ws)s$/.test(o.protocol)&&(o.port="443")),o.path=o.path||"/";const s=o.host.indexOf(":")!==-1?"["+o.host+"]":o.host;return o.id=o.protocol+"://"+s+":"+o.port+t,o.href=o.protocol+"://"+s+(r&&r.port===o.port?"":":"+o.port),o}const D$=typeof ArrayBuffer=="function",F$=e=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(e):e.buffer instanceof ArrayBuffer,E4=Object.prototype.toString,N$=typeof Blob=="function"||typeof Blob<"u"&&E4.call(Blob)==="[object BlobConstructor]",q$=typeof File=="function"||typeof File<"u"&&E4.call(File)==="[object FileConstructor]";function dm(e){return D$&&(e instanceof ArrayBuffer||F$(e))||N$&&e instanceof Blob||q$&&e instanceof File}function Bd(e,t){if(!e||typeof e!="object")return!1;if(Array.isArray(e)){for(let r=0,o=e.length;r<o;r++)if(Bd(e[r]))return!0;return!1}if(dm(e))return!0;if(e.toJSON&&typeof e.toJSON=="function"&&arguments.length===1)return Bd(e.toJSON(),!0);for(const r in e)if(Object.prototype.hasOwnProperty.call(e,r)&&Bd(e[r]))return!0;return!1}function H$(e){const t=[],r=e.data,o=e;return o.data=Rx(r,t),o.attachments=t.length,{packet:o,buffers:t}}function Rx(e,t){if(!e)return e;if(dm(e)){const r={_placeholder:!0,num:t.length};return t.push(e),r}else if(Array.isArray(e)){const r=new Array(e.length);for(let o=0;o<e.length;o++)r[o]=Rx(e[o],t);return r}else if(typeof e=="object"&&!(e instanceof Date)){const r={};for(const o in e)Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=Rx(e[o],t));return r}return e}function U$(e,t){return e.data=Px(e.data,t),delete e.attachments,e}function Px(e,t){if(!e)return e;if(e&&e._placeholder===!0){if(typeof e.num=="number"&&e.num>=0&&e.num<t.length)return t[e.num];throw new Error("illegal attachments")}else if(Array.isArray(e))for(let r=0;r<e.length;r++)e[r]=Px(e[r],t);else if(typeof e=="object")for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(e[r]=Px(e[r],t));return e}const R4=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"],Y$=5;var Ve;(function(e){e[e.CONNECT=0]="CONNECT",e[e.DISCONNECT=1]="DISCONNECT",e[e.EVENT=2]="EVENT",e[e.ACK=3]="ACK",e[e.CONNECT_ERROR=4]="CONNECT_ERROR",e[e.BINARY_EVENT=5]="BINARY_EVENT",e[e.BINARY_ACK=6]="BINARY_ACK"})(Ve||(Ve={}));class V${constructor(t){this.replacer=t}encode(t){return(t.type===Ve.EVENT||t.type===Ve.ACK)&&Bd(t)?this.encodeAsBinary({type:t.type===Ve.EVENT?Ve.BINARY_EVENT:Ve.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let r=""+t.type;return(t.type===Ve.BINARY_EVENT||t.type===Ve.BINARY_ACK)&&(r+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(r+=t.nsp+","),t.id!=null&&(r+=t.id),t.data!=null&&(r+=JSON.stringify(t.data,this.replacer)),r}encodeAsBinary(t){const r=H$(t),o=this.encodeAsString(r.packet),i=r.buffers;return i.unshift(o),i}}class um extends It{constructor(t){super(),this.reviver=t}add(t){let r;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");r=this.decodeString(t);const o=r.type===Ve.BINARY_EVENT;o||r.type===Ve.BINARY_ACK?(r.type=o?Ve.EVENT:Ve.ACK,this.reconstructor=new W$(r),r.attachments===0&&super.emitReserved("decoded",r)):super.emitReserved("decoded",r)}else if(dm(t)||t.base64)if(this.reconstructor)r=this.reconstructor.takeBinaryData(t),r&&(this.reconstructor=null,super.emitReserved("decoded",r));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let r=0;const o={type:Number(t.charAt(0))};if(Ve[o.type]===void 0)throw new Error("unknown packet type "+o.type);if(o.type===Ve.BINARY_EVENT||o.type===Ve.BINARY_ACK){const s=r+1;for(;t.charAt(++r)!=="-"&&r!=t.length;);const a=t.substring(s,r);if(a!=Number(a)||t.charAt(r)!=="-")throw new Error("Illegal attachments");o.attachments=Number(a)}if(t.charAt(r+1)==="/"){const s=r+1;for(;++r&&!(t.charAt(r)===","||r===t.length););o.nsp=t.substring(s,r)}else o.nsp="/";const i=t.charAt(r+1);if(i!==""&&Number(i)==i){const s=r+1;for(;++r;){const a=t.charAt(r);if(a==null||Number(a)!=a){--r;break}if(r===t.length)break}o.id=Number(t.substring(s,r+1))}if(t.charAt(++r)){const s=this.tryParse(t.substr(r));if(um.isPayloadValid(o.type,s))o.data=s;else throw new Error("invalid payload")}return o}tryParse(t){try{return JSON.parse(t,this.reviver)}catch{return!1}}static isPayloadValid(t,r){switch(t){case Ve.CONNECT:return ju(r);case Ve.DISCONNECT:return r===void 0;case Ve.CONNECT_ERROR:return typeof r=="string"||ju(r);case Ve.EVENT:case Ve.BINARY_EVENT:return Array.isArray(r)&&(typeof r[0]=="number"||typeof r[0]=="string"&&R4.indexOf(r[0])===-1);case Ve.ACK:case Ve.BINARY_ACK:return Array.isArray(r)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class W${constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const r=U$(this.reconPack,this.buffers);return this.finishedReconstruction(),r}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}function G$(e){return typeof e=="string"}const Q$=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};function K$(e){return e===void 0||Q$(e)}function ju(e){return Object.prototype.toString.call(e)==="[object Object]"}function J$(e,t){switch(e){case Ve.CONNECT:return t===void 0||ju(t);case Ve.DISCONNECT:return t===void 0;case Ve.EVENT:return Array.isArray(t)&&(typeof t[0]=="number"||typeof t[0]=="string"&&R4.indexOf(t[0])===-1);case Ve.ACK:return Array.isArray(t);case Ve.CONNECT_ERROR:return typeof t=="string"||ju(t);default:return!1}}function X$(e){return G$(e.nsp)&&K$(e.id)&&J$(e.type,e.data)}const Z$=Object.freeze(Object.defineProperty({__proto__:null,Decoder:um,Encoder:V$,get PacketType(){return Ve},isPacketValid:X$,protocol:Y$},Symbol.toStringTag,{value:"Module"}));function Zr(e,t,r){return e.on(t,r),function(){e.off(t,r)}}const e_=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class P4 extends It{constructor(t,r,o){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=r,o&&o.auth&&(this.auth=o.auth),this._opts=Object.assign({},o),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[Zr(t,"open",this.onopen.bind(this)),Zr(t,"packet",this.onpacket.bind(this)),Zr(t,"error",this.onerror.bind(this)),Zr(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...r){var o,i,s;if(e_.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(r.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(r),this;const a={type:Ve.EVENT,data:r};if(a.options={},a.options.compress=this.flags.compress!==!1,typeof r[r.length-1]=="function"){const h=this.ids++,f=r.pop();this._registerAckCallback(h,f),a.id=h}const c=(i=(o=this.io.engine)===null||o===void 0?void 0:o.transport)===null||i===void 0?void 0:i.writable,d=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!c||(d?(this.notifyOutgoingListeners(a),this.packet(a)):this.sendBuffer.push(a)),this.flags={},this}_registerAckCallback(t,r){var o;const i=(o=this.flags.timeout)!==null&&o!==void 0?o:this._opts.ackTimeout;if(i===void 0){this.acks[t]=r;return}const s=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let c=0;c<this.sendBuffer.length;c++)this.sendBuffer[c].id===t&&this.sendBuffer.splice(c,1);r.call(this,new Error("operation has timed out"))},i),a=(...c)=>{this.io.clearTimeoutFn(s),r.apply(this,c)};a.withError=!0,this.acks[t]=a}emitWithAck(t,...r){return new Promise((o,i)=>{const s=(a,c)=>a?i(a):o(c);s.withError=!0,r.push(s),this.emit(t,...r)})}_addToQueue(t){let r;typeof t[t.length-1]=="function"&&(r=t.pop());const o={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((i,...s)=>(this._queue[0],i!==null?o.tryCount>this._opts.retries&&(this._queue.shift(),r&&r(i)):(this._queue.shift(),r&&r(null,...s)),o.pending=!1,this._drainQueue())),this._queue.push(o),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const r=this._queue[0];r.pending&&!t||(r.pending=!0,r.tryCount++,this.flags=r.flags,this.emit.apply(this,r.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:Ve.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,r){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,r),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(o=>String(o.id)===t)){const o=this.acks[t];delete this.acks[t],o.withError&&o.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case Ve.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Ve.EVENT:case Ve.BINARY_EVENT:this.onevent(t);break;case Ve.ACK:case Ve.BINARY_ACK:this.onack(t);break;case Ve.DISCONNECT:this.ondisconnect();break;case Ve.CONNECT_ERROR:this.destroy();const o=new Error(t.data.message);o.data=t.data.data,this.emitReserved("connect_error",o);break}}onevent(t){const r=t.data||[];t.id!=null&&r.push(this.ack(t.id)),this.connected?this.emitEvent(r):this.receiveBuffer.push(Object.freeze(r))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const r=this._anyListeners.slice();for(const o of r)o.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const r=this;let o=!1;return function(...i){o||(o=!0,r.packet({type:Ve.ACK,id:t,data:i}))}}onack(t){const r=this.acks[t.id];typeof r=="function"&&(delete this.acks[t.id],r.withError&&t.data.unshift(null),r.apply(this,t.data))}onconnect(t,r){this.id=t,this.recovered=r&&this._pid===r,this._pid=r,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Ve.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const r=this._anyListeners;for(let o=0;o<r.length;o++)if(t===r[o])return r.splice(o,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const r=this._anyOutgoingListeners;for(let o=0;o<r.length;o++)if(t===r[o])return r.splice(o,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const r=this._anyOutgoingListeners.slice();for(const o of r)o.apply(this,t.data)}}}function ea(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}ea.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),r=Math.floor(t*this.jitter*e);e=Math.floor(t*10)&1?e+r:e-r}return Math.min(e,this.max)|0};ea.prototype.reset=function(){this.attempts=0};ea.prototype.setMin=function(e){this.ms=e};ea.prototype.setMax=function(e){this.max=e};ea.prototype.setJitter=function(e){this.jitter=e};class Mx extends It{constructor(t,r){var o;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(r=t,t=void 0),r=r||{},r.path=r.path||"/socket.io",this.opts=r,sp(this,r),this.reconnection(r.reconnection!==!1),this.reconnectionAttempts(r.reconnectionAttempts||1/0),this.reconnectionDelay(r.reconnectionDelay||1e3),this.reconnectionDelayMax(r.reconnectionDelayMax||5e3),this.randomizationFactor((o=r.randomizationFactor)!==null&&o!==void 0?o:.5),this.backoff=new ea({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(r.timeout==null?2e4:r.timeout),this._readyState="closed",this.uri=t;const i=r.parser||Z$;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=r.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var r;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(r=this.backoff)===null||r===void 0||r.setMin(t),this)}randomizationFactor(t){var r;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(r=this.backoff)===null||r===void 0||r.setJitter(t),this)}reconnectionDelayMax(t){var r;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(r=this.backoff)===null||r===void 0||r.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new L$(this.uri,this.opts);const r=this.engine,o=this;this._readyState="opening",this.skipReconnect=!1;const i=Zr(r,"open",function(){o.onopen(),t&&t()}),s=c=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",c),t?t(c):this.maybeReconnectOnOpen()},a=Zr(r,"error",s);if(this._timeout!==!1){const c=this._timeout,d=this.setTimeoutFn(()=>{i(),s(new Error("timeout")),r.close()},c);this.opts.autoUnref&&d.unref(),this.subs.push(()=>{this.clearTimeoutFn(d)})}return this.subs.push(i),this.subs.push(a),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(Zr(t,"ping",this.onping.bind(this)),Zr(t,"data",this.ondata.bind(this)),Zr(t,"error",this.onerror.bind(this)),Zr(t,"close",this.onclose.bind(this)),Zr(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(r){this.onclose("parse error",r)}}ondecoded(t){ip(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,r){let o=this.nsps[t];return o?this._autoConnect&&!o.active&&o.connect():(o=new P4(this,t,r),this.nsps[t]=o),o}_destroy(t){const r=Object.keys(this.nsps);for(const o of r)if(this.nsps[o].active)return;this._close()}_packet(t){const r=this.encoder.encode(t);for(let o=0;o<r.length;o++)this.engine.write(r[o],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,r){var o;this.cleanup(),(o=this.engine)===null||o===void 0||o.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,r),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const r=this.backoff.duration();this._reconnecting=!0;const o=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(i=>{i?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",i)):t.onreconnect()}))},r);this.opts.autoUnref&&o.unref(),this.subs.push(()=>{this.clearTimeoutFn(o)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const ma={};function Oo(e,t){typeof e=="object"&&(t=e,e=void 0),t=t||{};const r=B$(e,t.path||"/socket.io"),o=r.source,i=r.id,s=r.path,a=ma[i]&&s in ma[i].nsps,c=t.forceNew||t["force new connection"]||t.multiplex===!1||a;let d;return c?d=new Mx(o,t):(ma[i]||(ma[i]=new Mx(o,t)),d=ma[i]),r.query&&!t.query&&(t.query=r.queryKey),d.socket(r.path,t)}Object.assign(Oo,{Manager:Mx,Socket:P4,io:Oo,connect:Oo});const O1=e=>{let t;const r=new Set,o=(p,h)=>{const f=typeof p=="function"?p(t):p;if(!Object.is(f,t)){const x=t;t=h??(typeof f!="object"||f===null)?f:Object.assign({},t,f),r.forEach(S=>S(t,x))}},i=()=>t,c={setState:o,getState:i,getInitialState:()=>d,subscribe:p=>(r.add(p),()=>r.delete(p))},d=t=e(o,i,c);return c},t_=e=>e?O1(e):O1,r_=e=>e;function n_(e,t=r_){const r=Qe.useSyncExternalStore(e.subscribe,Qe.useCallback(()=>t(e.getState()),[e,t]),Qe.useCallback(()=>t(e.getInitialState()),[e,t]));return Qe.useDebugValue(r),r}const L1=e=>{const t=t_(e),r=o=>n_(t,o);return Object.assign(r,t),r},M4=e=>e?L1(e):L1;function o_(e,t){let r;try{r=e()}catch{return}return{getItem:i=>{var s;const a=d=>d===null?null:JSON.parse(d,void 0),c=(s=r.getItem(i))!=null?s:null;return c instanceof Promise?c.then(a):a(c)},setItem:(i,s)=>r.setItem(i,JSON.stringify(s,void 0)),removeItem:i=>r.removeItem(i)}}const Ix=e=>t=>{try{const r=e(t);return r instanceof Promise?r:{then(o){return Ix(o)(r)},catch(o){return this}}}catch(r){return{then(o){return this},catch(o){return Ix(o)(r)}}}},i_=(e,t)=>(r,o,i)=>{let s={storage:o_(()=>window.localStorage),partialize:w=>w,version:0,merge:(w,j)=>({...j,...w}),...t},a=!1,c=0;const d=new Set,p=new Set;let h=s.storage;if(!h)return e((...w)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),r(...w)},o,i);const f=()=>{const w=s.partialize({...o()});return h.setItem(s.name,{state:w,version:s.version})},x=i.setState;i.setState=(w,j)=>(x(w,j),f());const S=e((...w)=>(r(...w),f()),o,i);i.getInitialState=()=>S;let m;const b=()=>{var w,j;if(!h)return;const v=++c;a=!1,d.forEach(g=>{var k;return g((k=o())!=null?k:S)});const y=((j=s.onRehydrateStorage)==null?void 0:j.call(s,(w=o())!=null?w:S))||void 0;return Ix(h.getItem.bind(h))(s.name).then(g=>{if(g)if(typeof g.version=="number"&&g.version!==s.version){if(s.migrate){const k=s.migrate(g.state,g.version);return k instanceof Promise?k.then(C=>[!0,C]):[!0,k]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,g.state];return[!1,void 0]}).then(g=>{var k;if(v!==c)return;const[C,_]=g;if(m=s.merge(_,(k=o())!=null?k:S),r(m,!0),C)return f()}).then(()=>{v===c&&(y==null||y(m,void 0),m=o(),a=!0,p.forEach(g=>g(m)))}).catch(g=>{v===c&&(y==null||y(void 0,g))})};return i.persist={setOptions:w=>{s={...s,...w},w.storage&&(h=w.storage)},clearStorage:()=>{h==null||h.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>b(),hasHydrated:()=>a,onHydrate:w=>(d.add(w),()=>{d.delete(w)}),onFinishHydration:w=>(p.add(w),()=>{p.delete(w)})},s.skipHydration||b(),m||S},s_=i_,Ie=M4(s_(e=>({user:null,token:null,setAuth:(t,r)=>e({user:t,token:r}),updateUser:t=>e(r=>({user:r.user?{...r.user,...t}:null})),logout:()=>e({user:null,token:null})}),{name:"auth-storage"}));function I4(e,t){return function(){return e.apply(t,arguments)}}const{toString:a_}=Object.prototype,{getPrototypeOf:pm}=Object,{iterator:ap,toStringTag:A4}=Symbol,lp=(e=>t=>{const r=a_.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),ln=e=>(e=e.toLowerCase(),t=>lp(t)===e),cp=e=>t=>typeof t===e,{isArray:ta}=Array,Ws=cp("undefined");function nc(e){return e!==null&&!Ws(e)&&e.constructor!==null&&!Ws(e.constructor)&&vr(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const O4=ln("ArrayBuffer");function l_(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&O4(e.buffer),t}const c_=cp("string"),vr=cp("function"),L4=cp("number"),oc=e=>e!==null&&typeof e=="object",d_=e=>e===!0||e===!1,Dd=e=>{if(lp(e)!=="object")return!1;const t=pm(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(A4 in e)&&!(ap in e)},u_=e=>{if(!oc(e)||nc(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},p_=ln("Date"),h_=ln("File"),f_=e=>!!(e&&typeof e.uri<"u"),x_=e=>e&&typeof e.getParts<"u",g_=ln("Blob"),m_=ln("FileList"),y_=e=>oc(e)&&vr(e.pipe);function v_(){return typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}}const B1=v_(),D1=typeof B1.FormData<"u"?B1.FormData:void 0,b_=e=>{let t;return e&&(D1&&e instanceof D1||vr(e.append)&&((t=lp(e))==="formdata"||t==="object"&&vr(e.toString)&&e.toString()==="[object FormData]"))},w_=ln("URLSearchParams"),[k_,j_,S_,C_]=["ReadableStream","Request","Response","Headers"].map(ln),z_=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function ic(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let o,i;if(typeof e!="object"&&(e=[e]),ta(e))for(o=0,i=e.length;o<i;o++)t.call(null,e[o],o,e);else{if(nc(e))return;const s=r?Object.getOwnPropertyNames(e):Object.keys(e),a=s.length;let c;for(o=0;o<a;o++)c=s[o],t.call(null,e[c],c,e)}}function B4(e,t){if(nc(e))return null;t=t.toLowerCase();const r=Object.keys(e);let o=r.length,i;for(;o-- >0;)if(i=r[o],t===i.toLowerCase())return i;return null}const hi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,D4=e=>!Ws(e)&&e!==hi;function Ax(){const{caseless:e,skipUndefined:t}=D4(this)&&this||{},r={},o=(i,s)=>{if(s==="__proto__"||s==="constructor"||s==="prototype")return;const a=e&&B4(r,s)||s;Dd(r[a])&&Dd(i)?r[a]=Ax(r[a],i):Dd(i)?r[a]=Ax({},i):ta(i)?r[a]=i.slice():(!t||!Ws(i))&&(r[a]=i)};for(let i=0,s=arguments.length;i<s;i++)arguments[i]&&ic(arguments[i],o);return r}const $_=(e,t,r,{allOwnKeys:o}={})=>(ic(t,(i,s)=>{r&&vr(i)?Object.defineProperty(e,s,{value:I4(i,r),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,s,{value:i,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:o}),e),__=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),T_=(e,t,r,o)=>{e.prototype=Object.create(t.prototype,o),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},E_=(e,t,r,o)=>{let i,s,a;const c={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),s=i.length;s-- >0;)a=i[s],(!o||o(a,e,t))&&!c[a]&&(t[a]=e[a],c[a]=!0);e=r!==!1&&pm(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},R_=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const o=e.indexOf(t,r);return o!==-1&&o===r},P_=e=>{if(!e)return null;if(ta(e))return e;let t=e.length;if(!L4(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},M_=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&pm(Uint8Array)),I_=(e,t)=>{const o=(e&&e[ap]).call(e);let i;for(;(i=o.next())&&!i.done;){const s=i.value;t.call(e,s[0],s[1])}},A_=(e,t)=>{let r;const o=[];for(;(r=e.exec(t))!==null;)o.push(r);return o},O_=ln("HTMLFormElement"),L_=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,o,i){return o.toUpperCase()+i}),F1=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),B_=ln("RegExp"),F4=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),o={};ic(r,(i,s)=>{let a;(a=t(i,s,e))!==!1&&(o[s]=a||i)}),Object.defineProperties(e,o)},D_=e=>{F4(e,(t,r)=>{if(vr(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const o=e[r];if(vr(o)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},F_=(e,t)=>{const r={},o=i=>{i.forEach(s=>{r[s]=!0})};return ta(e)?o(e):o(String(e).split(t)),r},N_=()=>{},q_=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function H_(e){return!!(e&&vr(e.append)&&e[A4]==="FormData"&&e[ap])}const U_=e=>{const t=new Array(10),r=(o,i)=>{if(oc(o)){if(t.indexOf(o)>=0)return;if(nc(o))return o;if(!("toJSON"in o)){t[i]=o;const s=ta(o)?[]:{};return ic(o,(a,c)=>{const d=r(a,i+1);!Ws(d)&&(s[c]=d)}),t[i]=void 0,s}}return o};return r(e,0)},Y_=ln("AsyncFunction"),V_=e=>e&&(oc(e)||vr(e))&&vr(e.then)&&vr(e.catch),N4=((e,t)=>e?setImmediate:t?((r,o)=>(hi.addEventListener("message",({source:i,data:s})=>{i===hi&&s===r&&o.length&&o.shift()()},!1),i=>{o.push(i),hi.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",vr(hi.postMessage)),W_=typeof queueMicrotask<"u"?queueMicrotask.bind(hi):typeof process<"u"&&process.nextTick||N4,G_=e=>e!=null&&vr(e[ap]),ne={isArray:ta,isArrayBuffer:O4,isBuffer:nc,isFormData:b_,isArrayBufferView:l_,isString:c_,isNumber:L4,isBoolean:d_,isObject:oc,isPlainObject:Dd,isEmptyObject:u_,isReadableStream:k_,isRequest:j_,isResponse:S_,isHeaders:C_,isUndefined:Ws,isDate:p_,isFile:h_,isReactNativeBlob:f_,isReactNative:x_,isBlob:g_,isRegExp:B_,isFunction:vr,isStream:y_,isURLSearchParams:w_,isTypedArray:M_,isFileList:m_,forEach:ic,merge:Ax,extend:$_,trim:z_,stripBOM:__,inherits:T_,toFlatObject:E_,kindOf:lp,kindOfTest:ln,endsWith:R_,toArray:P_,forEachEntry:I_,matchAll:A_,isHTMLForm:O_,hasOwnProperty:F1,hasOwnProp:F1,reduceDescriptors:F4,freezeMethods:D_,toObjectSet:F_,toCamelCase:L_,noop:N_,toFiniteNumber:q_,findKey:B4,global:hi,isContextDefined:D4,isSpecCompliantForm:H_,toJSONObject:U_,isAsyncFn:Y_,isThenable:V_,setImmediate:N4,asap:W_,isIterable:G_};let Be=class q4 extends Error{static from(t,r,o,i,s,a){const c=new q4(t.message,r||t.code,o,i,s);return c.cause=t,c.name=t.name,t.status!=null&&c.status==null&&(c.status=t.status),a&&Object.assign(c,a),c}constructor(t,r,o,i,s){super(t),Object.defineProperty(this,"message",{value:t,enumerable:!0,writable:!0,configurable:!0}),this.name="AxiosError",this.isAxiosError=!0,r&&(this.code=r),o&&(this.config=o),i&&(this.request=i),s&&(this.response=s,this.status=s.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:ne.toJSONObject(this.config),code:this.code,status:this.status}}};Be.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";Be.ERR_BAD_OPTION="ERR_BAD_OPTION";Be.ECONNABORTED="ECONNABORTED";Be.ETIMEDOUT="ETIMEDOUT";Be.ERR_NETWORK="ERR_NETWORK";Be.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";Be.ERR_DEPRECATED="ERR_DEPRECATED";Be.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";Be.ERR_BAD_REQUEST="ERR_BAD_REQUEST";Be.ERR_CANCELED="ERR_CANCELED";Be.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";Be.ERR_INVALID_URL="ERR_INVALID_URL";const Q_=null;function Ox(e){return ne.isPlainObject(e)||ne.isArray(e)}function H4(e){return ne.endsWith(e,"[]")?e.slice(0,-2):e}function nh(e,t,r){return e?e.concat(t).map(function(i,s){return i=H4(i),!r&&s?"["+i+"]":i}).join(r?".":""):t}function K_(e){return ne.isArray(e)&&!e.some(Ox)}const J_=ne.toFlatObject(ne,{},null,function(t){return/^is[A-Z]/.test(t)});function dp(e,t,r){if(!ne.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=ne.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(b,w){return!ne.isUndefined(w[b])});const o=r.metaTokens,i=r.visitor||h,s=r.dots,a=r.indexes,d=(r.Blob||typeof Blob<"u"&&Blob)&&ne.isSpecCompliantForm(t);if(!ne.isFunction(i))throw new TypeError("visitor must be a function");function p(m){if(m===null)return"";if(ne.isDate(m))return m.toISOString();if(ne.isBoolean(m))return m.toString();if(!d&&ne.isBlob(m))throw new Be("Blob is not supported. Use a Buffer instead.");return ne.isArrayBuffer(m)||ne.isTypedArray(m)?d&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function h(m,b,w){let j=m;if(ne.isReactNative(t)&&ne.isReactNativeBlob(m))return t.append(nh(w,b,s),p(m)),!1;if(m&&!w&&typeof m=="object"){if(ne.endsWith(b,"{}"))b=o?b:b.slice(0,-2),m=JSON.stringify(m);else if(ne.isArray(m)&&K_(m)||(ne.isFileList(m)||ne.endsWith(b,"[]"))&&(j=ne.toArray(m)))return b=H4(b),j.forEach(function(y,g){!(ne.isUndefined(y)||y===null)&&t.append(a===!0?nh([b],g,s):a===null?b:b+"[]",p(y))}),!1}return Ox(m)?!0:(t.append(nh(w,b,s),p(m)),!1)}const f=[],x=Object.assign(J_,{defaultVisitor:h,convertValue:p,isVisitable:Ox});function S(m,b){if(!ne.isUndefined(m)){if(f.indexOf(m)!==-1)throw Error("Circular reference detected in "+b.join("."));f.push(m),ne.forEach(m,function(j,v){(!(ne.isUndefined(j)||j===null)&&i.call(t,j,ne.isString(v)?v.trim():v,b,x))===!0&&S(j,b?b.concat(v):[v])}),f.pop()}}if(!ne.isObject(e))throw new TypeError("data must be an object");return S(e),t}function N1(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(o){return t[o]})}function hm(e,t){this._pairs=[],e&&dp(e,this,t)}const U4=hm.prototype;U4.append=function(t,r){this._pairs.push([t,r])};U4.toString=function(t){const r=t?function(o){return t.call(this,o,N1)}:N1;return this._pairs.map(function(i){return r(i[0])+"="+r(i[1])},"").join("&")};function X_(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function Y4(e,t,r){if(!t)return e;const o=r&&r.encode||X_,i=ne.isFunction(r)?{serialize:r}:r,s=i&&i.serialize;let a;if(s?a=s(t,i):a=ne.isURLSearchParams(t)?t.toString():new hm(t,i).toString(o),a){const c=e.indexOf("#");c!==-1&&(e=e.slice(0,c)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e}class q1{constructor(){this.handlers=[]}use(t,r,o){return this.handlers.push({fulfilled:t,rejected:r,synchronous:o?o.synchronous:!1,runWhen:o?o.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){ne.forEach(this.handlers,function(o){o!==null&&t(o)})}}const fm={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1,legacyInterceptorReqResOrdering:!0},Z_=typeof URLSearchParams<"u"?URLSearchParams:hm,eT=typeof FormData<"u"?FormData:null,tT=typeof Blob<"u"?Blob:null,rT={isBrowser:!0,classes:{URLSearchParams:Z_,FormData:eT,Blob:tT},protocols:["http","https","file","blob","url","data"]},xm=typeof window<"u"&&typeof document<"u",Lx=typeof navigator=="object"&&navigator||void 0,nT=xm&&(!Lx||["ReactNative","NativeScript","NS"].indexOf(Lx.product)<0),oT=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",iT=xm&&window.location.href||"http://localhost",sT=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:xm,hasStandardBrowserEnv:nT,hasStandardBrowserWebWorkerEnv:oT,navigator:Lx,origin:iT},Symbol.toStringTag,{value:"Module"})),rr={...sT,...rT};function aT(e,t){return dp(e,new rr.classes.URLSearchParams,{visitor:function(r,o,i,s){return rr.isNode&&ne.isBuffer(r)?(this.append(o,r.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)},...t})}function lT(e){return ne.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function cT(e){const t={},r=Object.keys(e);let o;const i=r.length;let s;for(o=0;o<i;o++)s=r[o],t[s]=e[s];return t}function V4(e){function t(r,o,i,s){let a=r[s++];if(a==="__proto__")return!0;const c=Number.isFinite(+a),d=s>=r.length;return a=!a&&ne.isArray(i)?i.length:a,d?(ne.hasOwnProp(i,a)?i[a]=[i[a],o]:i[a]=o,!c):((!i[a]||!ne.isObject(i[a]))&&(i[a]=[]),t(r,o,i[a],s)&&ne.isArray(i[a])&&(i[a]=cT(i[a])),!c)}if(ne.isFormData(e)&&ne.isFunction(e.entries)){const r={};return ne.forEachEntry(e,(o,i)=>{t(lT(o),i,r,0)}),r}return null}function dT(e,t,r){if(ne.isString(e))try{return(t||JSON.parse)(e),ne.trim(e)}catch(o){if(o.name!=="SyntaxError")throw o}return(r||JSON.stringify)(e)}const sc={transitional:fm,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const o=r.getContentType()||"",i=o.indexOf("application/json")>-1,s=ne.isObject(t);if(s&&ne.isHTMLForm(t)&&(t=new FormData(t)),ne.isFormData(t))return i?JSON.stringify(V4(t)):t;if(ne.isArrayBuffer(t)||ne.isBuffer(t)||ne.isStream(t)||ne.isFile(t)||ne.isBlob(t)||ne.isReadableStream(t))return t;if(ne.isArrayBufferView(t))return t.buffer;if(ne.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(s){if(o.indexOf("application/x-www-form-urlencoded")>-1)return aT(t,this.formSerializer).toString();if((c=ne.isFileList(t))||o.indexOf("multipart/form-data")>-1){const d=this.env&&this.env.FormData;return dp(c?{"files[]":t}:t,d&&new d,this.formSerializer)}}return s||i?(r.setContentType("application/json",!1),dT(t)):t}],transformResponse:[function(t){const r=this.transitional||sc.transitional,o=r&&r.forcedJSONParsing,i=this.responseType==="json";if(ne.isResponse(t)||ne.isReadableStream(t))return t;if(t&&ne.isString(t)&&(o&&!this.responseType||i)){const a=!(r&&r.silentJSONParsing)&&i;try{return JSON.parse(t,this.parseReviver)}catch(c){if(a)throw c.name==="SyntaxError"?Be.from(c,Be.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:rr.classes.FormData,Blob:rr.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};ne.forEach(["delete","get","head","post","put","patch"],e=>{sc.headers[e]={}});const uT=ne.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),pT=e=>{const t={};let r,o,i;return e&&e.split(`
`).forEach(function(a){i=a.indexOf(":"),r=a.substring(0,i).trim().toLowerCase(),o=a.substring(i+1).trim(),!(!r||t[r]&&uT[r])&&(r==="set-cookie"?t[r]?t[r].push(o):t[r]=[o]:t[r]=t[r]?t[r]+", "+o:o)}),t},H1=Symbol("internals");function ya(e){return e&&String(e).trim().toLowerCase()}function Fd(e){return e===!1||e==null?e:ne.isArray(e)?e.map(Fd):String(e)}function hT(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let o;for(;o=r.exec(e);)t[o[1]]=o[2];return t}const fT=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function oh(e,t,r,o,i){if(ne.isFunction(o))return o.call(this,t,r);if(i&&(t=r),!!ne.isString(t)){if(ne.isString(o))return t.indexOf(o)!==-1;if(ne.isRegExp(o))return o.test(t)}}function xT(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,o)=>r.toUpperCase()+o)}function gT(e,t){const r=ne.toCamelCase(" "+t);["get","set","has"].forEach(o=>{Object.defineProperty(e,o+r,{value:function(i,s,a){return this[o].call(this,t,i,s,a)},configurable:!0})})}let br=class{constructor(t){t&&this.set(t)}set(t,r,o){const i=this;function s(c,d,p){const h=ya(d);if(!h)throw new Error("header name must be a non-empty string");const f=ne.findKey(i,h);(!f||i[f]===void 0||p===!0||p===void 0&&i[f]!==!1)&&(i[f||d]=Fd(c))}const a=(c,d)=>ne.forEach(c,(p,h)=>s(p,h,d));if(ne.isPlainObject(t)||t instanceof this.constructor)a(t,r);else if(ne.isString(t)&&(t=t.trim())&&!fT(t))a(pT(t),r);else if(ne.isObject(t)&&ne.isIterable(t)){let c={},d,p;for(const h of t){if(!ne.isArray(h))throw TypeError("Object iterator must return a key-value pair");c[p=h[0]]=(d=c[p])?ne.isArray(d)?[...d,h[1]]:[d,h[1]]:h[1]}a(c,r)}else t!=null&&s(r,t,o);return this}get(t,r){if(t=ya(t),t){const o=ne.findKey(this,t);if(o){const i=this[o];if(!r)return i;if(r===!0)return hT(i);if(ne.isFunction(r))return r.call(this,i,o);if(ne.isRegExp(r))return r.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=ya(t),t){const o=ne.findKey(this,t);return!!(o&&this[o]!==void 0&&(!r||oh(this,this[o],o,r)))}return!1}delete(t,r){const o=this;let i=!1;function s(a){if(a=ya(a),a){const c=ne.findKey(o,a);c&&(!r||oh(o,o[c],c,r))&&(delete o[c],i=!0)}}return ne.isArray(t)?t.forEach(s):s(t),i}clear(t){const r=Object.keys(this);let o=r.length,i=!1;for(;o--;){const s=r[o];(!t||oh(this,this[s],s,t,!0))&&(delete this[s],i=!0)}return i}normalize(t){const r=this,o={};return ne.forEach(this,(i,s)=>{const a=ne.findKey(o,s);if(a){r[a]=Fd(i),delete r[s];return}const c=t?xT(s):String(s).trim();c!==s&&delete r[s],r[c]=Fd(i),o[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return ne.forEach(this,(o,i)=>{o!=null&&o!==!1&&(r[i]=t&&ne.isArray(o)?o.join(", "):o)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const o=new this(t);return r.forEach(i=>o.set(i)),o}static accessor(t){const o=(this[H1]=this[H1]={accessors:{}}).accessors,i=this.prototype;function s(a){const c=ya(a);o[c]||(gT(i,a),o[c]=!0)}return ne.isArray(t)?t.forEach(s):s(t),this}};br.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);ne.reduceDescriptors(br.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(o){this[r]=o}}});ne.freezeMethods(br);function ih(e,t){const r=this||sc,o=t||r,i=br.from(o.headers);let s=o.data;return ne.forEach(e,function(c){s=c.call(r,s,i.normalize(),t?t.status:void 0)}),i.normalize(),s}function W4(e){return!!(e&&e.__CANCEL__)}let ac=class extends Be{constructor(t,r,o){super(t??"canceled",Be.ERR_CANCELED,r,o),this.name="CanceledError",this.__CANCEL__=!0}};function G4(e,t,r){const o=r.config.validateStatus;!r.status||!o||o(r.status)?e(r):t(new Be("Request failed with status code "+r.status,[Be.ERR_BAD_REQUEST,Be.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function mT(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function yT(e,t){e=e||10;const r=new Array(e),o=new Array(e);let i=0,s=0,a;return t=t!==void 0?t:1e3,function(d){const p=Date.now(),h=o[s];a||(a=p),r[i]=d,o[i]=p;let f=s,x=0;for(;f!==i;)x+=r[f++],f=f%e;if(i=(i+1)%e,i===s&&(s=(s+1)%e),p-a<t)return;const S=h&&p-h;return S?Math.round(x*1e3/S):void 0}}function vT(e,t){let r=0,o=1e3/t,i,s;const a=(p,h=Date.now())=>{r=h,i=null,s&&(clearTimeout(s),s=null),e(...p)};return[(...p)=>{const h=Date.now(),f=h-r;f>=o?a(p,h):(i=p,s||(s=setTimeout(()=>{s=null,a(i)},o-f)))},()=>i&&a(i)]}const Su=(e,t,r=3)=>{let o=0;const i=yT(50,250);return vT(s=>{const a=s.loaded,c=s.lengthComputable?s.total:void 0,d=a-o,p=i(d),h=a<=c;o=a;const f={loaded:a,total:c,progress:c?a/c:void 0,bytes:d,rate:p||void 0,estimated:p&&c&&h?(c-a)/p:void 0,event:s,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(f)},r)},U1=(e,t)=>{const r=e!=null;return[o=>t[0]({lengthComputable:r,total:e,loaded:o}),t[1]]},Y1=e=>(...t)=>ne.asap(()=>e(...t)),bT=rr.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,rr.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(rr.origin),rr.navigator&&/(msie|trident)/i.test(rr.navigator.userAgent)):()=>!0,wT=rr.hasStandardBrowserEnv?{write(e,t,r,o,i,s,a){if(typeof document>"u")return;const c=[`${e}=${encodeURIComponent(t)}`];ne.isNumber(r)&&c.push(`expires=${new Date(r).toUTCString()}`),ne.isString(o)&&c.push(`path=${o}`),ne.isString(i)&&c.push(`domain=${i}`),s===!0&&c.push("secure"),ne.isString(a)&&c.push(`SameSite=${a}`),document.cookie=c.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function kT(e){return typeof e!="string"?!1:/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function jT(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function Q4(e,t,r){let o=!kT(t);return e&&(o||r==!1)?jT(e,t):t}const V1=e=>e instanceof br?{...e}:e;function Ai(e,t){t=t||{};const r={};function o(p,h,f,x){return ne.isPlainObject(p)&&ne.isPlainObject(h)?ne.merge.call({caseless:x},p,h):ne.isPlainObject(h)?ne.merge({},h):ne.isArray(h)?h.slice():h}function i(p,h,f,x){if(ne.isUndefined(h)){if(!ne.isUndefined(p))return o(void 0,p,f,x)}else return o(p,h,f,x)}function s(p,h){if(!ne.isUndefined(h))return o(void 0,h)}function a(p,h){if(ne.isUndefined(h)){if(!ne.isUndefined(p))return o(void 0,p)}else return o(void 0,h)}function c(p,h,f){if(f in t)return o(p,h);if(f in e)return o(void 0,p)}const d={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,withXSRFToken:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c,headers:(p,h,f)=>i(V1(p),V1(h),f,!0)};return ne.forEach(Object.keys({...e,...t}),function(h){if(h==="__proto__"||h==="constructor"||h==="prototype")return;const f=ne.hasOwnProp(d,h)?d[h]:i,x=f(e[h],t[h],h);ne.isUndefined(x)&&f!==c||(r[h]=x)}),r}const K4=e=>{const t=Ai({},e);let{data:r,withXSRFToken:o,xsrfHeaderName:i,xsrfCookieName:s,headers:a,auth:c}=t;if(t.headers=a=br.from(a),t.url=Y4(Q4(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),c&&a.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):""))),ne.isFormData(r)){if(rr.hasStandardBrowserEnv||rr.hasStandardBrowserWebWorkerEnv)a.setContentType(void 0);else if(ne.isFunction(r.getHeaders)){const d=r.getHeaders(),p=["content-type","content-length"];Object.entries(d).forEach(([h,f])=>{p.includes(h.toLowerCase())&&a.set(h,f)})}}if(rr.hasStandardBrowserEnv&&(o&&ne.isFunction(o)&&(o=o(t)),o||o!==!1&&bT(t.url))){const d=i&&s&&wT.read(s);d&&a.set(i,d)}return t},ST=typeof XMLHttpRequest<"u",CT=ST&&function(e){return new Promise(function(r,o){const i=K4(e);let s=i.data;const a=br.from(i.headers).normalize();let{responseType:c,onUploadProgress:d,onDownloadProgress:p}=i,h,f,x,S,m;function b(){S&&S(),m&&m(),i.cancelToken&&i.cancelToken.unsubscribe(h),i.signal&&i.signal.removeEventListener("abort",h)}let w=new XMLHttpRequest;w.open(i.method.toUpperCase(),i.url,!0),w.timeout=i.timeout;function j(){if(!w)return;const y=br.from("getAllResponseHeaders"in w&&w.getAllResponseHeaders()),k={data:!c||c==="text"||c==="json"?w.responseText:w.response,status:w.status,statusText:w.statusText,headers:y,config:e,request:w};G4(function(_){r(_),b()},function(_){o(_),b()},k),w=null}"onloadend"in w?w.onloadend=j:w.onreadystatechange=function(){!w||w.readyState!==4||w.status===0&&!(w.responseURL&&w.responseURL.indexOf("file:")===0)||setTimeout(j)},w.onabort=function(){w&&(o(new Be("Request aborted",Be.ECONNABORTED,e,w)),w=null)},w.onerror=function(g){const k=g&&g.message?g.message:"Network Error",C=new Be(k,Be.ERR_NETWORK,e,w);C.event=g||null,o(C),w=null},w.ontimeout=function(){let g=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const k=i.transitional||fm;i.timeoutErrorMessage&&(g=i.timeoutErrorMessage),o(new Be(g,k.clarifyTimeoutError?Be.ETIMEDOUT:Be.ECONNABORTED,e,w)),w=null},s===void 0&&a.setContentType(null),"setRequestHeader"in w&&ne.forEach(a.toJSON(),function(g,k){w.setRequestHeader(k,g)}),ne.isUndefined(i.withCredentials)||(w.withCredentials=!!i.withCredentials),c&&c!=="json"&&(w.responseType=i.responseType),p&&([x,m]=Su(p,!0),w.addEventListener("progress",x)),d&&w.upload&&([f,S]=Su(d),w.upload.addEventListener("progress",f),w.upload.addEventListener("loadend",S)),(i.cancelToken||i.signal)&&(h=y=>{w&&(o(!y||y.type?new ac(null,e,w):y),w.abort(),w=null)},i.cancelToken&&i.cancelToken.subscribe(h),i.signal&&(i.signal.aborted?h():i.signal.addEventListener("abort",h)));const v=mT(i.url);if(v&&rr.protocols.indexOf(v)===-1){o(new Be("Unsupported protocol "+v+":",Be.ERR_BAD_REQUEST,e));return}w.send(s||null)})},zT=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let o=new AbortController,i;const s=function(p){if(!i){i=!0,c();const h=p instanceof Error?p:this.reason;o.abort(h instanceof Be?h:new ac(h instanceof Error?h.message:h))}};let a=t&&setTimeout(()=>{a=null,s(new Be(`timeout of ${t}ms exceeded`,Be.ETIMEDOUT))},t);const c=()=>{e&&(a&&clearTimeout(a),a=null,e.forEach(p=>{p.unsubscribe?p.unsubscribe(s):p.removeEventListener("abort",s)}),e=null)};e.forEach(p=>p.addEventListener("abort",s));const{signal:d}=o;return d.unsubscribe=()=>ne.asap(c),d}},$T=function*(e,t){let r=e.byteLength;if(r<t){yield e;return}let o=0,i;for(;o<r;)i=o+t,yield e.slice(o,i),o=i},_T=async function*(e,t){for await(const r of TT(e))yield*$T(r,t)},TT=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:o}=await t.read();if(r)break;yield o}}finally{await t.cancel()}},W1=(e,t,r,o)=>{const i=_T(e,t);let s=0,a,c=d=>{a||(a=!0,o&&o(d))};return new ReadableStream({async pull(d){try{const{done:p,value:h}=await i.next();if(p){c(),d.close();return}let f=h.byteLength;if(r){let x=s+=f;r(x)}d.enqueue(new Uint8Array(h))}catch(p){throw c(p),p}},cancel(d){return c(d),i.return()}},{highWaterMark:2})},G1=64*1024,{isFunction:Ac}=ne,ET=(({Request:e,Response:t})=>({Request:e,Response:t}))(ne.global),{ReadableStream:Q1,TextEncoder:K1}=ne.global,J1=(e,...t)=>{try{return!!e(...t)}catch{return!1}},RT=e=>{e=ne.merge.call({skipUndefined:!0},ET,e);const{fetch:t,Request:r,Response:o}=e,i=t?Ac(t):typeof fetch=="function",s=Ac(r),a=Ac(o);if(!i)return!1;const c=i&&Ac(Q1),d=i&&(typeof K1=="function"?(m=>b=>m.encode(b))(new K1):async m=>new Uint8Array(await new r(m).arrayBuffer())),p=s&&c&&J1(()=>{let m=!1;const b=new r(rr.origin,{body:new Q1,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!b}),h=a&&c&&J1(()=>ne.isReadableStream(new o("").body)),f={stream:h&&(m=>m.body)};i&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!f[m]&&(f[m]=(b,w)=>{let j=b&&b[m];if(j)return j.call(b);throw new Be(`Response type '${m}' is not supported`,Be.ERR_NOT_SUPPORT,w)})});const x=async m=>{if(m==null)return 0;if(ne.isBlob(m))return m.size;if(ne.isSpecCompliantForm(m))return(await new r(rr.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(ne.isArrayBufferView(m)||ne.isArrayBuffer(m))return m.byteLength;if(ne.isURLSearchParams(m)&&(m=m+""),ne.isString(m))return(await d(m)).byteLength},S=async(m,b)=>{const w=ne.toFiniteNumber(m.getContentLength());return w??x(b)};return async m=>{let{url:b,method:w,data:j,signal:v,cancelToken:y,timeout:g,onDownloadProgress:k,onUploadProgress:C,responseType:_,headers:z,withCredentials:D="same-origin",fetchOptions:B}=K4(m),V=t||fetch;_=_?(_+"").toLowerCase():"text";let R=zT([v,y&&y.toAbortSignal()],g),M=null;const A=R&&R.unsubscribe&&(()=>{R.unsubscribe()});let O;try{if(C&&p&&w!=="get"&&w!=="head"&&(O=await S(z,j))!==0){let E=new r(b,{method:"POST",body:j,duplex:"half"}),I;if(ne.isFormData(j)&&(I=E.headers.get("content-type"))&&z.setContentType(I),E.body){const[N,J]=U1(O,Su(Y1(C)));j=W1(E.body,G1,N,J)}}ne.isString(D)||(D=D?"include":"omit");const T=s&&"credentials"in r.prototype,F={...B,signal:R,method:w.toUpperCase(),headers:z.normalize().toJSON(),body:j,duplex:"half",credentials:T?D:void 0};M=s&&new r(b,F);let P=await(s?V(M,B):V(b,F));const q=h&&(_==="stream"||_==="response");if(h&&(k||q&&A)){const E={};["status","statusText","headers"].forEach(Y=>{E[Y]=P[Y]});const I=ne.toFiniteNumber(P.headers.get("content-length")),[N,J]=k&&U1(I,Su(Y1(k),!0))||[];P=new o(W1(P.body,G1,N,()=>{J&&J(),A&&A()}),E)}_=_||"text";let $=await f[ne.findKey(f,_)||"text"](P,m);return!q&&A&&A(),await new Promise((E,I)=>{G4(E,I,{data:$,headers:br.from(P.headers),status:P.status,statusText:P.statusText,config:m,request:M})})}catch(T){throw A&&A(),T&&T.name==="TypeError"&&/Load failed|fetch/i.test(T.message)?Object.assign(new Be("Network Error",Be.ERR_NETWORK,m,M,T&&T.response),{cause:T.cause||T}):Be.from(T,T&&T.code,m,M,T&&T.response)}}},PT=new Map,J4=e=>{let t=e&&e.env||{};const{fetch:r,Request:o,Response:i}=t,s=[o,i,r];let a=s.length,c=a,d,p,h=PT;for(;c--;)d=s[c],p=h.get(d),p===void 0&&h.set(d,p=c?new Map:RT(t)),h=p;return p};J4();const gm={http:Q_,xhr:CT,fetch:{get:J4}};ne.forEach(gm,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const X1=e=>`- ${e}`,MT=e=>ne.isFunction(e)||e===null||e===!1;function IT(e,t){e=ne.isArray(e)?e:[e];const{length:r}=e;let o,i;const s={};for(let a=0;a<r;a++){o=e[a];let c;if(i=o,!MT(o)&&(i=gm[(c=String(o)).toLowerCase()],i===void 0))throw new Be(`Unknown adapter '${c}'`);if(i&&(ne.isFunction(i)||(i=i.get(t))))break;s[c||"#"+a]=i}if(!i){const a=Object.entries(s).map(([d,p])=>`adapter ${d} `+(p===!1?"is not supported by the environment":"is not available in the build"));let c=r?a.length>1?`since :
`+a.map(X1).join(`
`):" "+X1(a[0]):"as no adapter specified";throw new Be("There is no suitable adapter to dispatch the request "+c,"ERR_NOT_SUPPORT")}return i}const X4={getAdapter:IT,adapters:gm};function sh(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ac(null,e)}function Z1(e){return sh(e),e.headers=br.from(e.headers),e.data=ih.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),X4.getAdapter(e.adapter||sc.adapter,e)(e).then(function(o){return sh(e),o.data=ih.call(e,e.transformResponse,o),o.headers=br.from(o.headers),o},function(o){return W4(o)||(sh(e),o&&o.response&&(o.response.data=ih.call(e,e.transformResponse,o.response),o.response.headers=br.from(o.response.headers))),Promise.reject(o)})}const Z4="1.13.6",up={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{up[e]=function(o){return typeof o===e||"a"+(t<1?"n ":" ")+e}});const ey={};up.transitional=function(t,r,o){function i(s,a){return"[Axios v"+Z4+"] Transitional option '"+s+"'"+a+(o?". "+o:"")}return(s,a,c)=>{if(t===!1)throw new Be(i(a," has been removed"+(r?" in "+r:"")),Be.ERR_DEPRECATED);return r&&!ey[a]&&(ey[a]=!0,console.warn(i(a," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(s,a,c):!0}};up.spelling=function(t){return(r,o)=>(console.warn(`${o} is likely a misspelling of ${t}`),!0)};function AT(e,t,r){if(typeof e!="object")throw new Be("options must be an object",Be.ERR_BAD_OPTION_VALUE);const o=Object.keys(e);let i=o.length;for(;i-- >0;){const s=o[i],a=t[s];if(a){const c=e[s],d=c===void 0||a(c,s,e);if(d!==!0)throw new Be("option "+s+" must be "+d,Be.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new Be("Unknown option "+s,Be.ERR_BAD_OPTION)}}const Nd={assertOptions:AT,validators:up},Rr=Nd.validators;let Ci=class{constructor(t){this.defaults=t||{},this.interceptors={request:new q1,response:new q1}}async request(t,r){try{return await this._request(t,r)}catch(o){if(o instanceof Error){let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const s=i.stack?i.stack.replace(/^.+\n/,""):"";try{o.stack?s&&!String(o.stack).endsWith(s.replace(/^.+\n.+\n/,""))&&(o.stack+=`
`+s):o.stack=s}catch{}}throw o}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=Ai(this.defaults,r);const{transitional:o,paramsSerializer:i,headers:s}=r;o!==void 0&&Nd.assertOptions(o,{silentJSONParsing:Rr.transitional(Rr.boolean),forcedJSONParsing:Rr.transitional(Rr.boolean),clarifyTimeoutError:Rr.transitional(Rr.boolean),legacyInterceptorReqResOrdering:Rr.transitional(Rr.boolean)},!1),i!=null&&(ne.isFunction(i)?r.paramsSerializer={serialize:i}:Nd.assertOptions(i,{encode:Rr.function,serialize:Rr.function},!0)),r.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?r.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:r.allowAbsoluteUrls=!0),Nd.assertOptions(r,{baseUrl:Rr.spelling("baseURL"),withXsrfToken:Rr.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let a=s&&ne.merge(s.common,s[r.method]);s&&ne.forEach(["delete","get","head","post","put","patch","common"],m=>{delete s[m]}),r.headers=br.concat(a,s);const c=[];let d=!0;this.interceptors.request.forEach(function(b){if(typeof b.runWhen=="function"&&b.runWhen(r)===!1)return;d=d&&b.synchronous;const w=r.transitional||fm;w&&w.legacyInterceptorReqResOrdering?c.unshift(b.fulfilled,b.rejected):c.push(b.fulfilled,b.rejected)});const p=[];this.interceptors.response.forEach(function(b){p.push(b.fulfilled,b.rejected)});let h,f=0,x;if(!d){const m=[Z1.bind(this),void 0];for(m.unshift(...c),m.push(...p),x=m.length,h=Promise.resolve(r);f<x;)h=h.then(m[f++],m[f++]);return h}x=c.length;let S=r;for(;f<x;){const m=c[f++],b=c[f++];try{S=m(S)}catch(w){b.call(this,w);break}}try{h=Z1.call(this,S)}catch(m){return Promise.reject(m)}for(f=0,x=p.length;f<x;)h=h.then(p[f++],p[f++]);return h}getUri(t){t=Ai(this.defaults,t);const r=Q4(t.baseURL,t.url,t.allowAbsoluteUrls);return Y4(r,t.params,t.paramsSerializer)}};ne.forEach(["delete","get","head","options"],function(t){Ci.prototype[t]=function(r,o){return this.request(Ai(o||{},{method:t,url:r,data:(o||{}).data}))}});ne.forEach(["post","put","patch"],function(t){function r(o){return function(s,a,c){return this.request(Ai(c||{},{method:t,headers:o?{"Content-Type":"multipart/form-data"}:{},url:s,data:a}))}}Ci.prototype[t]=r(),Ci.prototype[t+"Form"]=r(!0)});let OT=class eS{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(s){r=s});const o=this;this.promise.then(i=>{if(!o._listeners)return;let s=o._listeners.length;for(;s-- >0;)o._listeners[s](i);o._listeners=null}),this.promise.then=i=>{let s;const a=new Promise(c=>{o.subscribe(c),s=c}).then(i);return a.cancel=function(){o.unsubscribe(s)},a},t(function(s,a,c){o.reason||(o.reason=new ac(s,a,c),r(o.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=o=>{t.abort(o)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new eS(function(i){t=i}),cancel:t}}};function LT(e){return function(r){return e.apply(null,r)}}function BT(e){return ne.isObject(e)&&e.isAxiosError===!0}const Bx={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Bx).forEach(([e,t])=>{Bx[t]=e});function tS(e){const t=new Ci(e),r=I4(Ci.prototype.request,t);return ne.extend(r,Ci.prototype,t,{allOwnKeys:!0}),ne.extend(r,t,null,{allOwnKeys:!0}),r.create=function(i){return tS(Ai(e,i))},r}const mt=tS(sc);mt.Axios=Ci;mt.CanceledError=ac;mt.CancelToken=OT;mt.isCancel=W4;mt.VERSION=Z4;mt.toFormData=dp;mt.AxiosError=Be;mt.Cancel=mt.CanceledError;mt.all=function(t){return Promise.all(t)};mt.spread=LT;mt.isAxiosError=BT;mt.mergeConfig=Ai;mt.AxiosHeaders=br;mt.formToJSON=e=>V4(ne.isHTMLForm(e)?new FormData(e):e);mt.getAdapter=X4.getAdapter;mt.HttpStatusCode=Bx;mt.default=mt;const{Axios:xY,AxiosError:gY,CanceledError:mY,isCancel:yY,CancelToken:vY,VERSION:bY,all:wY,Cancel:kY,isAxiosError:jY,spread:SY,toFormData:CY,AxiosHeaders:zY,HttpStatusCode:$Y,formToJSON:_Y,getAdapter:TY,mergeConfig:EY}=mt;let DT={data:""},FT=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||DT},NT=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,qT=/\/\*[^]*?\*\/|  +/g,ty=/\n+/g,xo=(e,t)=>{let r="",o="",i="";for(let s in e){let a=e[s];s[0]=="@"?s[1]=="i"?r=s+" "+a+";":o+=s[1]=="f"?xo(a,s):s+"{"+xo(a,s[1]=="k"?"":t)+"}":typeof a=="object"?o+=xo(a,t?t.replace(/([^,])+/g,c=>s.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,c):c?c+" "+d:d)):s):a!=null&&(s=/^--/.test(s)?s:s.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=xo.p?xo.p(s,a):s+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+o},Mn={},rS=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+rS(e[r]);return t}return e},HT=(e,t,r,o,i)=>{let s=rS(e),a=Mn[s]||(Mn[s]=(d=>{let p=0,h=11;for(;p<d.length;)h=101*h+d.charCodeAt(p++)>>>0;return"go"+h})(s));if(!Mn[a]){let d=s!==e?e:(p=>{let h,f,x=[{}];for(;h=NT.exec(p.replace(qT,""));)h[4]?x.shift():h[3]?(f=h[3].replace(ty," ").trim(),x.unshift(x[0][f]=x[0][f]||{})):x[0][h[1]]=h[2].replace(ty," ").trim();return x[0]})(e);Mn[a]=xo(i?{["@keyframes "+a]:d}:d,r?"":"."+a)}let c=r&&Mn.g?Mn.g:null;return r&&(Mn.g=Mn[a]),((d,p,h,f)=>{f?p.data=p.data.replace(f,d):p.data.indexOf(d)===-1&&(p.data=h?d+p.data:p.data+d)})(Mn[a],t,o,c),a},UT=(e,t,r)=>e.reduce((o,i,s)=>{let a=t[s];if(a&&a.call){let c=a(r),d=c&&c.props&&c.props.className||/^go/.test(c)&&c;a=d?"."+d:c&&typeof c=="object"?c.props?"":xo(c,""):c===!1?"":c}return o+i+(a??"")},"");function pp(e){let t=this||{},r=e.call?e(t.p):e;return HT(r.unshift?r.raw?UT(r,[].slice.call(arguments,1),t.p):r.reduce((o,i)=>Object.assign(o,i&&i.call?i(t.p):i),{}):r,FT(t.target),t.g,t.o,t.k)}let nS,Dx,Fx;pp.bind({g:1});let Kn=pp.bind({k:1});function YT(e,t,r,o){xo.p=t,nS=e,Dx=r,Fx=o}function Vo(e,t){let r=this||{};return function(){let o=arguments;function i(s,a){let c=Object.assign({},s),d=c.className||i.className;r.p=Object.assign({theme:Dx&&Dx()},c),r.o=/ *go\d+/.test(d),c.className=pp.apply(r,o)+(d?" "+d:"");let p=e;return e[0]&&(p=c.as||e,delete c.as),Fx&&p[0]&&Fx(c),nS(p,c)}return i}}var VT=e=>typeof e=="function",Cu=(e,t)=>VT(e)?e(t):e,WT=(()=>{let e=0;return()=>(++e).toString()})(),oS=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),GT=20,mm="default",iS=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:o}=t;return iS(e,{type:e.toasts.find(a=>a.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},qd=[],sS={toasts:[],pausedAt:void 0,settings:{toastLimit:GT}},jn={},aS=(e,t=mm)=>{jn[t]=iS(jn[t]||sS,e),qd.forEach(([r,o])=>{r===t&&o(jn[t])})},lS=e=>Object.keys(jn).forEach(t=>aS(e,t)),QT=e=>Object.keys(jn).find(t=>jn[t].toasts.some(r=>r.id===e)),hp=(e=mm)=>t=>{aS(t,e)},KT={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},JT=(e={},t=mm)=>{let[r,o]=u.useState(jn[t]||sS),i=u.useRef(jn[t]);u.useEffect(()=>(i.current!==jn[t]&&o(jn[t]),qd.push([t,o]),()=>{let a=qd.findIndex(([c])=>c===t);a>-1&&qd.splice(a,1)}),[t]);let s=r.toasts.map(a=>{var c,d,p;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((c=e[a.type])==null?void 0:c.removeDelay)||(e==null?void 0:e.removeDelay),duration:a.duration||((d=e[a.type])==null?void 0:d.duration)||(e==null?void 0:e.duration)||KT[a.type],style:{...e.style,...(p=e[a.type])==null?void 0:p.style,...a.style}}});return{...r,toasts:s}},XT=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||WT()}),lc=e=>(t,r)=>{let o=XT(t,e,r);return hp(o.toasterId||QT(o.id))({type:2,toast:o}),o.id},Xe=(e,t)=>lc("blank")(e,t);Xe.error=lc("error");Xe.success=lc("success");Xe.loading=lc("loading");Xe.custom=lc("custom");Xe.dismiss=(e,t)=>{let r={type:3,toastId:e};t?hp(t)(r):lS(r)};Xe.dismissAll=e=>Xe.dismiss(void 0,e);Xe.remove=(e,t)=>{let r={type:4,toastId:e};t?hp(t)(r):lS(r)};Xe.removeAll=e=>Xe.remove(void 0,e);Xe.promise=(e,t,r)=>{let o=Xe.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let s=t.success?Cu(t.success,i):void 0;return s?Xe.success(s,{id:o,...r,...r==null?void 0:r.success}):Xe.dismiss(o),i}).catch(i=>{let s=t.error?Cu(t.error,i):void 0;s?Xe.error(s,{id:o,...r,...r==null?void 0:r.error}):Xe.dismiss(o)}),e};var ZT=1e3,eE=(e,t="default")=>{let{toasts:r,pausedAt:o}=JT(e,t),i=u.useRef(new Map).current,s=u.useCallback((f,x=ZT)=>{if(i.has(f))return;let S=setTimeout(()=>{i.delete(f),a({type:4,toastId:f})},x);i.set(f,S)},[]);u.useEffect(()=>{if(o)return;let f=Date.now(),x=r.map(S=>{if(S.duration===1/0)return;let m=(S.duration||0)+S.pauseDuration-(f-S.createdAt);if(m<0){S.visible&&Xe.dismiss(S.id);return}return setTimeout(()=>Xe.dismiss(S.id,t),m)});return()=>{x.forEach(S=>S&&clearTimeout(S))}},[r,o,t]);let a=u.useCallback(hp(t),[t]),c=u.useCallback(()=>{a({type:5,time:Date.now()})},[a]),d=u.useCallback((f,x)=>{a({type:1,toast:{id:f,height:x}})},[a]),p=u.useCallback(()=>{o&&a({type:6,time:Date.now()})},[o,a]),h=u.useCallback((f,x)=>{let{reverseOrder:S=!1,gutter:m=8,defaultPosition:b}=x||{},w=r.filter(y=>(y.position||b)===(f.position||b)&&y.height),j=w.findIndex(y=>y.id===f.id),v=w.filter((y,g)=>g<j&&y.visible).length;return w.filter(y=>y.visible).slice(...S?[v+1]:[0,v]).reduce((y,g)=>y+(g.height||0)+m,0)},[r]);return u.useEffect(()=>{r.forEach(f=>{if(f.dismissed)s(f.id,f.removeDelay);else{let x=i.get(f.id);x&&(clearTimeout(x),i.delete(f.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:d,startPause:c,endPause:p,calculateOffset:h}}},tE=Kn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,rE=Kn`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,nE=Kn`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,oE=Vo("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${tE} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${rE} 0.15s ease-out forwards;
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
    animation: ${nE} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,iE=Kn`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,sE=Vo("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${iE} 1s linear infinite;
`,aE=Kn`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,lE=Kn`
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
}`,cE=Vo("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${aE} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${lE} 0.2s ease-out forwards;
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
`,dE=Vo("div")`
  position: absolute;
`,uE=Vo("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,pE=Kn`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,hE=Vo("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${pE} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,fE=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?u.createElement(hE,null,t):t:r==="blank"?null:u.createElement(uE,null,u.createElement(sE,{...o}),r!=="loading"&&u.createElement(dE,null,r==="error"?u.createElement(oE,{...o}):u.createElement(cE,{...o})))},xE=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,gE=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,mE="0%{opacity:0;} 100%{opacity:1;}",yE="0%{opacity:1;} 100%{opacity:0;}",vE=Vo("div")`
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
`,bE=Vo("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,wE=(e,t)=>{let r=e.includes("top")?1:-1,[o,i]=oS()?[mE,yE]:[xE(r),gE(r)];return{animation:t?`${Kn(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${Kn(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},kE=u.memo(({toast:e,position:t,style:r,children:o})=>{let i=e.height?wE(e.position||t||"top-center",e.visible):{opacity:0},s=u.createElement(fE,{toast:e}),a=u.createElement(bE,{...e.ariaProps},Cu(e.message,e));return u.createElement(vE,{className:e.className,style:{...i,...r,...e.style}},typeof o=="function"?o({icon:s,message:a}):u.createElement(u.Fragment,null,s,a))});YT(u.createElement);var jE=({id:e,className:t,style:r,onHeightUpdate:o,children:i})=>{let s=u.useCallback(a=>{if(a){let c=()=>{let d=a.getBoundingClientRect().height;o(e,d)};c(),new MutationObserver(c).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return u.createElement("div",{ref:s,className:t,style:r},i)},SE=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:oS()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...i}},CE=pp`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Oc=16,zE=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:i,toasterId:s,containerStyle:a,containerClassName:c})=>{let{toasts:d,handlers:p}=eE(r,s);return u.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:Oc,left:Oc,right:Oc,bottom:Oc,pointerEvents:"none",...a},className:c,onMouseEnter:p.startPause,onMouseLeave:p.endPause},d.map(h=>{let f=h.position||t,x=p.calculateOffset(h,{reverseOrder:e,gutter:o,defaultPosition:t}),S=SE(f,x);return u.createElement(jE,{id:h.id,key:h.id,onHeightUpdate:p.updateHeight,className:h.visible?CE:"",style:S},h.type==="custom"?Cu(h.message,h):i?i(h):u.createElement(kE,{toast:h,position:f}))}))},be=Xe;const $E="http://localhost:3000",fe=mt.create({baseURL:$E,withCredentials:!0});fe.interceptors.request.use(e=>{const t=Ie.getState().token;return t&&(e.headers.Authorization=`Bearer ${t}`),e});fe.interceptors.response.use(e=>e,e=>{var r;e.config;const t=(r=e.response)==null?void 0:r.status;if(t===401){const{logout:o}=Ie.getState();o(),window.location.href="/login"}if(t===423){const{logout:o}=Ie.getState();o(),window.location.href="/blocked"}return t===503&&window.location.pathname!=="/maintenance"&&(window.location.href="/maintenance"),t===429&&be.error("Siz juda ko'p so'rov yubordingiz. Iltimos birozdan so'ng urinib ko'ring."),Promise.reject(e)});const cS=async e=>{const{data:t}=await fe.post("/chats/upload-avatar",e);return t},dS=async({chatId:e,formData:t})=>{const{data:r}=await fe.post(`/chats/${e}/avatar`,t);return r},uS=async()=>{const{data:e}=await fe.get("/chats");return e},pS=async e=>{const{data:t}=await fe.post("/chats",e);return t},hS=async({chatId:e,dto:t})=>{const{data:r}=await fe.patch(`/chats/${e}`,t);return r},fS=async(e,t=1,r=30)=>{const{data:o}=await fe.get(`/chats/${e}/messages?page=${t}&limit=${r}`);return o},xS=async({chatId:e,content:t,replayToId:r})=>{const{data:o}=await fe.post(`/chats/${e}/messages`,{content:t,replayToId:r});return o},gS=async e=>{await fe.delete(`/chats/messages/${e}`)},mS=async e=>{const{data:t}=await fe.get(`/chats/resolve/${e}`);return t},yS=async e=>{const{data:t}=await fe.get(`/chats/preview/${e}`);return t},vS=async e=>{const{data:t}=await fe.post(`/chats/${e}/join-link`);return t},bS=async e=>{const{data:t}=await fe.get(`/users/search?q=${e}`);return t},wS=async e=>{const{data:t}=await fe.get(`/users/global-search?q=${e}`);return t},kS=async e=>{const{data:t}=await fe.get(`/users/by-username/${e}`);return t},jS=async()=>{const{data:e}=await fe.get("/users");return e},_E=async e=>{const{data:t}=await fe.get(`/users/${e}/profile`);return t},SS=async e=>{const{data:t}=await fe.delete(`/chats/${e}`);return t},CS=async e=>{const{data:t}=await fe.post(`/chats/${e}/leave`);return t},ah=Object.freeze(Object.defineProperty({__proto__:null,createChat:pS,deleteChat:SS,deleteMessage:gS,editChat:hS,fetchChats:uS,fetchMessages:fS,getAllUsers:jS,getPublicProfile:_E,getUserByUsername:kS,joinGroupChat:vS,leaveChat:CS,previewGroupChat:yS,resolveChatSlug:mS,searchGlobalUsers:wS,searchUsers:bS,sendMessage:xS,updateGroupAvatar:dS,uploadAvatar:cS},Symbol.toStringTag,{value:"Module"}));var zS={exports:{}};(function(e,t){(function(r,o){e.exports=o()})(Vx,function(){return function(r,o,i){r=r||{};var s=o.prototype,a={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function c(p,h,f,x){return s.fromToBase(p,h,f,x)}i.en.relativeTime=a,s.fromToBase=function(p,h,f,x,S){for(var m,b,w,j=f.$locale().relativeTime||a,v=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],y=v.length,g=0;g<y;g+=1){var k=v[g];k.d&&(m=x?i(p).diff(f,k.d,!0):f.diff(p,k.d,!0));var C=(r.rounding||Math.round)(Math.abs(m));if(w=m>0,C<=k.r||!k.r){C<=1&&g>0&&(k=v[g-1]);var _=j[k.l];S&&(C=S(""+C)),b=typeof _=="string"?_.replace("%d",C):_(C,h,k.l,w);break}}if(h)return b;var z=w?j.future:j.past;return typeof z=="function"?z(b):z.replace("%s",b)},s.to=function(p,h){return c(p,h,this,!0)},s.from=function(p,h){return c(p,h,this)};var d=function(p){return p.$u?i.utc():i()};s.toNow=function(p){return this.to(d(this),p)},s.fromNow=function(p){return this.from(d(this),p)}}})})(zS);var TE=zS.exports;const EE=Wx(TE);xt.extend(EE);const Nx=e=>{if(!e)return"";const t=xt(e),r=xt();return t.isSame(r,"day")?t.format("HH:mm"):t.isSame(r.subtract(1,"day"),"day")?"Kecha":t.isSame(r,"year")?t.format("D-MMMM"):t.format("DD.MM.YYYY")},RE=e=>{if(!e)return"";const t=xt(e),r=xt();return t.isSame(r,"day")?"Bugun":t.isSame(r.subtract(1,"day"),"day")?"Kecha":t.format("D-MMMM YYYY")},$S=u.createContext(),PE="http://localhost:3000",Wo=()=>u.useContext($S),ME=({children:e})=>{const[t,r]=u.useState([]),[o,i]=u.useState(!0),[s,a]=u.useState(1),[c,d]=u.useState(!0),p=Qe.useRef(!1),[h,f]=u.useState(()=>{const E=window.location.pathname.split("/").filter(Boolean)[0]||"home",I=["home","feed","blogs","chats","users","groups","meets","courses","arena","profile"];return E==="a"?"chats":I.includes(E)?E:"feed"}),[x,S]=u.useState(()=>{const $=window.location.pathname.split("/").filter(Boolean);return($[0]==="a"||$[0]==="blogs"||$[0]==="users"||$[0]==="groups"||$[0]==="chats")&&$[1]?$[1]:0}),[m,b]=u.useState(null),[w,j]=u.useState({}),[v,y]=u.useState(null);u.useEffect(()=>{const $=Ie.getState().token;if(!$)return;const E=PE.replace(/\/$/,""),I=Oo(`${E}/chats`,{auth:{token:$},transports:["websocket"],reconnectionAttempts:5});return I.on("connect",()=>{console.log("Connected to /chats namespace")}),b(I),()=>{I.disconnect()}},[]),u.useEffect(()=>{if(!m)return;const $=Y=>{r(L=>{var W;const H=L.findIndex(Me=>Me.id===Y.chatId);if(H===-1)return k(),L;const Q=[...L],ie={...Q[H]},G=String(ie.urlSlug)===String(x)||String(ie.id)===String(x);ie.lastMessage=Y.content,ie.hasMessages=!0,ie.time=Nx(Y.createdAt),ie.date=xt(Y.createdAt).format("YYYY-MM-DD");const le=Ie.getState().user||{},ue=le._id||le.id,me=(((W=Y.senderId)==null?void 0:W._id)||Y.senderId)===ue;return!G&&!me&&(ie.unread=(ie.unread||0)+1),Q.splice(H,1),Q.unshift(ie),Q})},E=({chatId:Y,readByUserId:L,messageIds:H})=>{const Q=Ie.getState().user||{},ie=Q._id||Q.id;String(L)===String(ie)&&r(G=>G.map(le=>String(le.id)===String(Y)?{...le,unread:Math.max(0,(le.unread||0)-H.length)}:le))},I=Y=>{const L=Ie.getState().user||{},H=(L==null?void 0:L._id)||(L==null?void 0:L.id);if(Y.members&&H&&!Y.members.some(ie=>{const G=ie._id||ie.id||ie;return String(G)===String(H)})){r(ie=>ie.filter(G=>G.id!==Y.chatId));return}r(Q=>{const ie=Q.findIndex(G=>G.id===Y.chatId);if(ie!==-1){const G=[...Q];return G[ie]={...G[ie],...Y},G}return Q})},N=({chatId:Y,userId:L,isTyping:H})=>{j(Q=>{const ie={...Q[Y]||{}};return H?ie[L]=Date.now():delete ie[L],{...Q,[Y]:ie}})},J=({chatId:Y})=>{r(L=>L.filter(H=>H.id!==Y))};return m.on("message_new",$),m.on("messages_read",E),m.on("chat_updated",I),m.on("user_typing",N),m.on("chat_deleted",J),()=>{m.off("message_new"),m.off("messages_read"),m.off("chat_updated"),m.off("user_typing"),m.off("chat_deleted")}},[m,x]),u.useEffect(()=>{const $=setInterval(()=>{const E=Date.now();j(I=>{let N=!1;const J={...I};return Object.keys(J).forEach(Y=>{const L={...J[Y]};Object.keys(L).forEach(H=>{E-L[H]>5e3&&(delete L[H],N=!0)}),Object.keys(L).length===0?delete J[Y]:J[Y]=L}),N?J:I})},2e3);return()=>clearInterval($)},[]);const g=u.useCallback(($,E)=>{!m||!$||m.emit(E?"typing_start":"typing_stop",{chatId:$})},[m]),k=u.useCallback(async($=1)=>{try{if($===1&&i(!0),!Ie.getState().token)return;const I=await uS($,15),N=(I==null?void 0:I.data)||[],J=(I==null?void 0:I.totalPages)||1,Y=Ie.getState().user||{},L=Y._id||Y.id,H=N.map(Q=>{var G;let ie={name:"Noma'lum",avatar:""};if(Q.isGroup)ie={name:Q.name,avatar:Q.avatar||((G=Q.name)==null?void 0:G.charAt(0)),urlSlug:Q.privateurl||Q._id};else{const le=Q.members.find(ue=>String(ue._id||ue.id)!==String(L));le?ie={name:le.nickname,username:le.username,avatar:le.avatar||(le.nickname||le.username).charAt(0),urlSlug:le.username,premiumStatus:le.premiumStatus}:ie={name:"Saqlangan xabarlar",avatar:"",urlSlug:Q._id,isSavedMessages:!0}}return{id:Q._id,jammId:Q.jammId,isGroup:!!Q.isGroup,type:Q.isGroup?"group":"user",name:ie.name,username:ie.username,avatar:ie.avatar,isSavedMessages:ie.isSavedMessages,premiumStatus:ie.premiumStatus,urlSlug:Q.jammId?String(Q.jammId):ie.urlSlug||Q._id,unread:Q.unreadCount||0,lastMessage:Q.lastMessage||(Q.isGroup?"Guruh yaratildi":"Suhbat boshlandi"),time:Q.lastMessageAt?Nx(Q.lastMessageAt):"Oldin",date:Q.lastMessageAt?xt(Q.lastMessageAt).format("YYYY-MM-DD"):"Oldin",members:Q.members,createdBy:Q.createdBy,admins:Q.admins||[],hasMessages:!!Q.lastMessage}});r(Q=>$===1?H:[...Q,...H]),a($),d($<J),$===1&&(p.current=!0)}catch(E){console.error(E)}finally{$===1&&i(!1)}},[]),C=u.useCallback(async()=>{p.current||await k(1)},[k]),_=async $=>{const E=await pS($);return k(),E},z=async($,E)=>{await hS({chatId:$,dto:E}),k()},D=async $=>{await SS($),r(E=>E.filter(I=>I.id!==$))},B=async $=>{await CS($),r(E=>E.filter(I=>I.id!==$))},V=u.useCallback(async($,E=1,I=30)=>{if(!$)return{data:[],totalPages:1};const N=await fS($,E,I);return{data:(N.data||[]).map(J=>{var Y,L,H,Q,ie,G,le;return{id:J._id,user:((Y=J.senderId)==null?void 0:Y.nickname)||((L=J.senderId)==null?void 0:L.username),senderId:((H=J.senderId)==null?void 0:H._id)||J.senderId,avatar:((Q=J.senderId)==null?void 0:Q.avatar)||((le=((ie=J.senderId)==null?void 0:ie.nickname)||((G=J.senderId)==null?void 0:G.username))==null?void 0:le.charAt(0))||"U",content:J.content,timestamp:xt(J.createdAt).format("HH:mm"),readBy:J.readBy||[]}}),totalPages:N.totalPages||1,page:N.page||1}},[]),R=u.useCallback(async($,E,I)=>{var J,Y,L,H,Q,ie,G;const N=await xS({chatId:$,content:E,replayToId:I});return{id:N._id,user:((J=N.senderId)==null?void 0:J.nickname)||((Y=N.senderId)==null?void 0:Y.username),senderId:((L=N.senderId)==null?void 0:L._id)||N.senderId,avatar:((H=N.senderId)==null?void 0:H.avatar)||((G=((Q=N.senderId)==null?void 0:Q.nickname)||((ie=N.senderId)==null?void 0:ie.username))==null?void 0:G.charAt(0))||"U",content:N.content,timestamp:xt(N.createdAt).format("HH:mm"),readBy:N.readBy||[],replayTo:N.replayTo||null}},[]),M=u.useCallback(($,E)=>{!m||!$||!(E!=null&&E.length)||m.emit("read_messages",{chatId:$,messageIds:E})},[m]),A=u.useCallback(async $=>mS($),[]),O=u.useCallback(async $=>$?(await wS($)).map(I=>({id:I._id,name:I.nickname||I.username,username:I.username,avatar:I.avatar||(I.nickname||I.username).charAt(0)})):[],[]),T=u.useCallback(async $=>$?(await bS($)).map(I=>({id:I._id,name:I.nickname||I.username,username:I.username,avatar:I.avatar||(I.nickname||I.username).charAt(0)})):[],[]),F=async $=>{try{return await kS($)}catch{return null}},P=u.useCallback(async()=>{try{return(await jS()).map(E=>({id:E._id,name:E.nickname||E.username,username:E.username,avatar:E.avatar||(E.nickname||E.username||"").charAt(0),premiumStatus:E.premiumStatus}))}catch{return[]}},[]);u.useEffect(()=>{["chats","groups","users"].includes(h)&&C()},[C,h]),u.useEffect(()=>{!x||x==="0"||r($=>$.map(E=>String(E.urlSlug)===String(x)||String(E.id)===String(x)?{...E,unread:0}:E))},[x]);const q={chats:t,loading:o,chatsPage:s,chatsHasMore:c,fetchChats:k,ensureChatsLoaded:C,createChat:_,editChat:z,deleteChat:D,leaveChat:B,fetchMessages:V,sendMessage:R,markMessagesAsRead:M,resolveChatSlug:A,searchUsers:T,getUserByUsername:F,getAllUsers:P,selectedNav:h,setSelectedNav:f,selectedChannel:x,setSelectedChannel:S,chatSocket:m,typingUsers:w,sendTypingStatus:g,searchGlobalUsers:O,previewGroupChat:async $=>yS($),joinGroupChat:async $=>{const E=await vS($);return k(),E},deleteMessage:async $=>{await gS($),k()},previewChat:v,setPreviewChat:y};return n.jsx($S.Provider,{value:q,children:e})},IE=l.div`
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
`,AE=l.button`
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
`;l.div`
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
`;const OE=l.div`
  flex: 1;

  @media (max-width: 700px) {
    display: none;
  }
`,LE=l.button`
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
`,BE=[{id:"feed",icon:l4,label:"Gurunglar"},{id:"blogs",icon:$n,label:"Bloglar"},{id:"chats",icon:F3,label:"Chatlar"},{id:"courses",icon:Ss,label:"Kurslar"}],DE=({onSelectNav:e,onOpenSettings:t,onOpenPremium:r})=>{const{selectedNav:o,setSelectedNav:i}=Wo(),s=Ie(h=>h.user),a=h=>{e?e(h):i(h)},c=(s==null?void 0:s.nickname)||(s==null?void 0:s.username)||"U",d=c.charAt(0).toUpperCase(),p=(s==null?void 0:s.premiumStatus)==="active";return n.jsx(n.Fragment,{children:n.jsxs(IE,{children:[BE.map(h=>n.jsx(AE,{active:h.id==="chats"?["chats","users","groups","meets"].includes(o):o===h.id,onClick:()=>a(h.id),title:h.label,children:n.jsx(h.icon,{size:20})},h.id)),n.jsx(OE,{}),n.jsx(LE,{active:o==="profile",premium:p?1:0,onClick:()=>a("profile"),title:`${c} — Profilim`,children:s!=null&&s.avatar?n.jsx("img",{src:s.avatar,alt:c}):n.jsx("span",{children:d})})]})})},FE=et`
  0% {
    background-color: var(--border-color, #e0e0e0);
  }
  50% {
    background-color: var(--tertiary-color, #f5f5f5);
  }
  100% {
    background-color: var(--border-color, #e0e0e0);
  }
`,Ot=l.div`
  width: ${e=>e.width||"100%"};
  height: ${e=>e.height||"20px"};
  border-radius: ${e=>e.borderRadius||"4px"};
  margin-bottom: ${e=>e.mb||"8px"};
  animation: ${FE} 1.5s ease-in-out infinite;
  display: ${e=>e.display||"block"};
`,qx=l(Ot)`
  width: ${e=>e.size||"40px"};
  height: ${e=>e.size||"40px"};
  border-radius: 50%;
  margin-bottom: ${e=>e.mb||"0"};
`,NE=l.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.gap||"12px"};
  margin-bottom: ${e=>e.mb||"16px"};
  width: 100%;
`,qE=({width:e=20,height:t=20,color:r="#1d9bf0"})=>n.jsx("svg",{width:e,height:t,viewBox:"0 0 24 24",fill:r,style:{display:"inline-block",verticalAlign:"middle",marginLeft:"4px"},children:n.jsx("path",{d:"M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-1.01-1.01-2.52-1.27-3.91-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01 1.01-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-1.01 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"})}),zr=({width:e,height:t,color:r})=>n.jsx(qE,{width:e,height:t,color:r}),HE=l.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,UE=l(rc)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
  pointer-events: none;
`,YE=l.input`
  width: 100%;
  min-width: 0;
  height: 40px;
  padding: 0 14px 0 40px;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }
`,ym=({className:e,containerStyle:t,...r})=>n.jsxs(HE,{className:e,style:t,children:[n.jsx(UE,{size:16}),n.jsx(YE,{...r})]}),_S=u.createContext(),ry="http://localhost:3000",VE=2e4,vm=()=>u.useContext(_S),WE=({children:e})=>{const[t,r]=u.useState(new Map),[o,i]=u.useState(!1),s=u.useRef(null),a=u.useRef(null);u.useEffect(()=>{const f=Ie.getState().token;if(!f)return;const x=Oo(`${ry}/presence`,{auth:{token:f},transports:["websocket","polling"],reconnection:!0,reconnectionDelay:2e3,reconnectionAttempts:10});return s.current=x,x.on("connect",()=>{i(!0),a.current=setInterval(()=>{x.emit("presence:ping")},VE)}),x.on("disconnect",()=>{i(!1),a.current&&(clearInterval(a.current),a.current=null)}),x.on("user_online",({userId:S})=>{r(m=>{const b=new Map(m);return b.set(S,!0),b})}),x.on("user_offline",({userId:S})=>{r(m=>{const b=new Map(m);return b.delete(S),b})}),x.on("connect_error",S=>{console.error("Presence connection error:",S.message)}),()=>{a.current&&clearInterval(a.current),x.disconnect(),s.current=null}},[]);const c=u.useCallback(f=>t.has(f),[t]),d=u.useCallback(async f=>{try{const x=Ie.getState().token,S=await fetch(`${ry}/presence/status/bulk`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({userIds:f})});if(!S.ok)return{};const m=await S.json();return r(b=>{const w=new Map(b);for(const[j,v]of Object.entries(m.statuses||{}))v?w.set(j,!0):w.delete(j);return w}),m.statuses}catch(x){return console.error("Failed to fetch bulk statuses:",x),{}}},[]),p=u.useCallback((f=[])=>!f||f.length===0?0:f.filter(x=>{const S=typeof x=="object"?x._id:x;return t.has(S)}).length,[t]),h={onlineUsers:t,connected:o,isUserOnline:c,getOnlineCount:p,fetchBulkStatuses:d,socket:s.current};return n.jsx(_S.Provider,{value:h,children:e})},bm="http://localhost:3000",wm=()=>({headers:{Authorization:`Bearer ${Ie.getState().token}`}});async function zu(){try{return(await mt.get(`${bm}/meets`,wm())).data.map(t=>({...t,isCreator:!0}))}catch(e){return console.error("Failed to fetch meets",e),[]}}async function TS({roomId:e,title:t,isPrivate:r,isCreator:o}){if(o)try{await mt.post(`${bm}/meets`,{roomId:e,title:t,isPrivate:r},wm())}catch(i){console.error("Failed to save meet",i)}}async function GE(e){try{await mt.delete(`${bm}/meets/${e}`,wm())}catch(t){console.error("Failed to remove meet",t)}}async function QE(e){return(await zu()).find(r=>r.roomId===e)||null}/*! *****************************************************************************
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
***************************************************************************** */var Hx=function(e,t){return Hx=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var i in o)o.hasOwnProperty(i)&&(r[i]=o[i])},Hx(e,t)};function KE(e,t){Hx(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}var vl=function(){return vl=Object.assign||function(t){for(var r,o=1,i=arguments.length;o<i;o++){r=arguments[o];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},vl.apply(this,arguments)};function JE(e,t,r,o){var i,s=!1,a=0;function c(){i&&clearTimeout(i)}function d(){c(),s=!0}typeof t!="boolean"&&(o=r,r=t,t=void 0);function p(){var h=this,f=Date.now()-a,x=arguments;if(s)return;function S(){a=Date.now(),r.apply(h,x)}function m(){i=void 0}o&&!i&&S(),c(),o===void 0&&f>e?S():t!==!0&&(i=setTimeout(o?m:S,o===void 0?e-f:e))}return p.cancel=d,p}var Cs={Pixel:"Pixel",Percent:"Percent"},ny={unit:Cs.Percent,value:.8};function oy(e){return typeof e=="number"?{unit:Cs.Percent,value:e*100}:typeof e=="string"?e.match(/^(\d*(\.\d+)?)px$/)?{unit:Cs.Pixel,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:Cs.Percent,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),ny):(console.warn("scrollThreshold should be string or number"),ny)}var En=function(e){KE(t,e);function t(r){var o=e.call(this,r)||this;return o.lastScrollTop=0,o.actionTriggered=!1,o.startY=0,o.currentY=0,o.dragging=!1,o.maxPullDownDistance=0,o.getScrollableTarget=function(){return o.props.scrollableTarget instanceof HTMLElement?o.props.scrollableTarget:typeof o.props.scrollableTarget=="string"?document.getElementById(o.props.scrollableTarget):(o.props.scrollableTarget===null&&console.warn(`You are trying to pass scrollableTarget but it is null. This might
        happen because the element may not have been added to DOM yet.
        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.
      `),null)},o.onStart=function(i){o.lastScrollTop||(o.dragging=!0,i instanceof MouseEvent?o.startY=i.pageY:i instanceof TouchEvent&&(o.startY=i.touches[0].pageY),o.currentY=o.startY,o._infScroll&&(o._infScroll.style.willChange="transform",o._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},o.onMove=function(i){o.dragging&&(i instanceof MouseEvent?o.currentY=i.pageY:i instanceof TouchEvent&&(o.currentY=i.touches[0].pageY),!(o.currentY<o.startY)&&(o.currentY-o.startY>=Number(o.props.pullDownToRefreshThreshold)&&o.setState({pullToRefreshThresholdBreached:!0}),!(o.currentY-o.startY>o.maxPullDownDistance*1.5)&&o._infScroll&&(o._infScroll.style.overflow="visible",o._infScroll.style.transform="translate3d(0px, "+(o.currentY-o.startY)+"px, 0px)")))},o.onEnd=function(){o.startY=0,o.currentY=0,o.dragging=!1,o.state.pullToRefreshThresholdBreached&&(o.props.refreshFunction&&o.props.refreshFunction(),o.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame(function(){o._infScroll&&(o._infScroll.style.overflow="auto",o._infScroll.style.transform="none",o._infScroll.style.willChange="unset")})},o.onScrollListener=function(i){typeof o.props.onScroll=="function"&&setTimeout(function(){return o.props.onScroll&&o.props.onScroll(i)},0);var s=o.props.height||o._scrollableNode?i.target:document.documentElement.scrollTop?document.documentElement:document.body;if(!o.actionTriggered){var a=o.props.inverse?o.isElementAtTop(s,o.props.scrollThreshold):o.isElementAtBottom(s,o.props.scrollThreshold);a&&o.props.hasMore&&(o.actionTriggered=!0,o.setState({showLoader:!0}),o.props.next&&o.props.next()),o.lastScrollTop=s.scrollTop}},o.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:r.dataLength},o.throttledOnScrollListener=JE(150,o.onScrollListener).bind(o),o.onStart=o.onStart.bind(o),o.onMove=o.onMove.bind(o),o.onEnd=o.onEnd.bind(o),o}return t.prototype.componentDidMount=function(){if(typeof this.props.dataLength>"u")throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),typeof this.props.initialScrollY=="number"&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),typeof this.props.refreshFunction!="function"))throw new Error(`Mandatory prop "refreshFunction" missing.
          Pull Down To Refresh functionality will not work
          as expected. Check README.md for usage'`)},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(r){this.props.dataLength!==r.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(r,o){var i=r.dataLength!==o.prevDataLength;return i?vl(vl({},o),{prevDataLength:r.dataLength}):null},t.prototype.isElementAtTop=function(r,o){o===void 0&&(o=.8);var i=r===document.body||r===document.documentElement?window.screen.availHeight:r.clientHeight,s=oy(o);return s.unit===Cs.Pixel?r.scrollTop<=s.value+i-r.scrollHeight+1:r.scrollTop<=s.value/100+i-r.scrollHeight+1},t.prototype.isElementAtBottom=function(r,o){o===void 0&&(o=.8);var i=r===document.body||r===document.documentElement?window.screen.availHeight:r.clientHeight,s=oy(o);return s.unit===Cs.Pixel?r.scrollTop+i>=r.scrollHeight-s.value:r.scrollTop+i>=s.value/100*r.scrollHeight},t.prototype.render=function(){var r=this,o=vl({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),i=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),s=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return Qe.createElement("div",{style:s,className:"infinite-scroll-component__outerdiv"},Qe.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(a){return r._infScroll=a},style:o},this.props.pullDownToRefresh&&Qe.createElement("div",{style:{position:"relative"},ref:function(a){return r._pullDown=a}},Qe.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!i&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(u.Component);const iy=async(e=1,t=20)=>{const{data:r}=await fe.get(`/blogs?page=${e}&limit=${t}`);return r},ES=async e=>{const{data:t}=await fe.get(`/blogs/user/${e}`);return t},XE=async()=>{const{data:e}=await fe.get("/blogs/liked");return e},RS=async e=>{const{data:t}=await fe.get(`/blogs/${e}`);return t},PS=async e=>{const{data:t}=await fe.get(`/blogs/${e}/content`);return t},MS=async e=>{const{data:t}=await fe.post("/blogs",e);return t},ZE=async(e,t)=>{const{data:r}=await fe.patch(`/blogs/${e}`,t);return r},eR=async e=>{const{data:t}=await fe.delete(`/blogs/${e}`);return t},IS=async e=>{const{data:t}=await fe.post(`/blogs/${e}/like`);return t},AS=async e=>{const{data:t}=await fe.post(`/blogs/${e}/view`);return t},sy=async(e,t=1,r=10)=>{const{data:o}=await fe.get(`/blogs/${e}/comments?page=${t}&limit=${r}`);return o},tR=async({blogId:e,content:t})=>{const{data:r}=await fe.post(`/blogs/${e}/comments`,{content:t});return r},rR=async({blogId:e,commentId:t,content:r,replyToUser:o})=>{const{data:i}=await fe.post(`/blogs/${e}/comments/${t}/reply`,{content:r,replyToUser:o});return i},nR=async e=>{const t=new FormData;t.append("file",e);const{data:r}=await fe.post("/blogs/upload-image",t);return r},oR=l.div`
  color: var(--text-color);
  line-height: 1.8;
  word-break: break-word;

  h1,
  h2,
  h3 {
    margin: 1.4em 0 0.55em;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  h2 {
    font-size: clamp(1.45rem, 3vw, 2.1rem);
  }

  h3 {
    font-size: 1.2rem;
  }

  p,
  ul,
  ol,
  blockquote,
  pre {
    margin: 0 0 1.15em;
  }

  ul,
  ol {
    padding-left: 1.25rem;
  }

  li + li {
    margin-top: 0.4rem;
  }

  blockquote {
    margin-left: 0;
    padding: 0.95rem 1rem 0.95rem 1.1rem;
    border-left: 3px solid rgba(88, 101, 242, 0.55);
    color: var(--text-secondary-color);
    background: rgba(88, 101, 242, 0.06);
    border-radius: 0 16px 16px 0;
    font-style: italic;
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    background: rgba(17, 24, 39, 0.08);
    padding: 0.15rem 0.35rem;
    border-radius: 6px;
    font-size: 0.92em;
  }

  pre {
    background: #101827;
    color: #f8fafc;
    padding: 1rem 1.1rem;
    border-radius: 18px;
    overflow-x: auto;
  }

  pre code {
    background: transparent;
    padding: 0;
    color: inherit;
  }

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    border-radius: 20px;
    margin: 1.2rem 0;
    object-fit: cover;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
  }

  a {
    color: #2d6cdf;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  hr {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 1.6rem 0;
  }
`,iR=l.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`,sR=l.button`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`,aR=l.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`,lR=l.details`
  margin: 0 0 1.2em;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
`,cR=l.summary`
  list-style: none;
  cursor: pointer;
  padding: 0.95rem 1rem;
  font-weight: 700;
  color: var(--text-color);
  background: rgba(148, 163, 184, 0.08);
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }
`,dR=l.div`
  padding: 1rem 1rem 0.2rem;
`,uR=/(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|_([^_]+)_)/g,$u=(e,t)=>{if(!e)return null;const r=[];let o=0,i,s=0;for(;(i=uR.exec(e))!==null;)i.index>o&&r.push(n.jsx(Qe.Fragment,{children:e.slice(o,i.index)},`${t}-${s++}`)),i[2]&&i[3]?r.push(n.jsx("a",{href:i[3],target:"_blank",rel:"noreferrer",children:i[2]},`${t}-${s++}`)):i[4]?r.push(n.jsx("code",{children:i[4]},`${t}-${s++}`)):i[5]?r.push(n.jsx("strong",{children:i[5]},`${t}-${s++}`)):i[6]&&r.push(n.jsx("em",{children:i[6]},`${t}-${s++}`)),o=i.index+i[0].length;return o<e.length&&r.push(n.jsx(Qe.Fragment,{children:e.slice(o)},`${t}-${s++}`)),r},Gr=(e,t,r)=>{if(!e.length)return;const o=e.join(" ");t.push(n.jsx("p",{children:$u(o,"p")},`p-${r.current++}`)),e.length=0},Pr=(e,t,r)=>{if(!e.items.length)return;const o=e.type==="ol"?"ol":"ul";t.push(n.jsx(o,{children:e.items.map((i,s)=>n.jsx("li",{children:$u(i,`${e.type}-${s}`)},`${e.type}-${s}`))},`list-${r.current++}`)),e.type=null,e.items=[]},ay=(e,t,r,o)=>{if(!e.active)return;const i=OS(e.lines.join(`
`),o);t.push(n.jsxs(lR,{children:[n.jsx(cR,{children:e.title||"Dropdown"}),n.jsx(dR,{children:i})]},`dropdown-${r.current++}`)),e.active=!1,e.title="",e.lines=[]},OS=(e,t={})=>{const{onImageClick:r}=t,o=String(e||"").replace(/\r\n/g,`
`).split(`
`),i=[],s=[],a={type:null,items:[]},c={active:!1,title:"",lines:[]},d={current:0};let p=!1,h=[];return o.forEach(f=>{const x=f.trim();if(x.startsWith(":::dropdown")){Gr(s,i,d),Pr(a,i,d),c.active=!0,c.title=x.replace(":::dropdown","").trim(),c.lines=[];return}if(x===":::"&&c.active){Gr(s,i,d),Pr(a,i,d),ay(c,i,d,t);return}if(c.active){c.lines.push(f);return}if(x.startsWith("```")){Gr(s,i,d),Pr(a,i,d),p?(i.push(n.jsx("pre",{children:n.jsx("code",{children:h.join(`
`)})},`code-${d.current++}`)),h=[],p=!1):p=!0;return}if(p){h.push(f);return}if(!x){Gr(s,i,d),Pr(a,i,d);return}const S=x.match(/^(#{1,3})\s+(.*)$/);if(S){Gr(s,i,d),Pr(a,i,d);const y=`h${S[1].length}`;i.push(n.jsx(y,{children:$u(S[2],`h-${d.current}`)},`h-${d.current++}`));return}const m=x.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);if(m){Gr(s,i,d),Pr(a,i,d);const v=m[2],y=m[1]||"Blog image",g=n.jsx("img",{src:v,alt:y},`img-node-${d.current}`);i.push(r?n.jsx(iR,{type:"button",onClick:()=>r({src:v,alt:y}),"aria-label":"Rasmni kattalashtirish",children:g},`img-${d.current++}`):Qe.cloneElement(g,{key:`img-${d.current++}`}));return}if(/^---+$/.test(x)){Gr(s,i,d),Pr(a,i,d),i.push(n.jsx("hr",{},`hr-${d.current++}`));return}const b=x.match(/^>\s?(.*)$/);if(b){Gr(s,i,d),Pr(a,i,d),i.push(n.jsx("blockquote",{children:$u(b[1],`quote-${d.current}`)},`quote-${d.current++}`));return}const w=x.match(/^\d+\.\s+(.*)$/);if(w){Gr(s,i,d),a.type&&a.type!=="ol"&&Pr(a,i,d),a.type="ol",a.items.push(w[1]);return}const j=x.match(/^[-*]\s+(.*)$/);if(j){Gr(s,i,d),a.type&&a.type!=="ul"&&Pr(a,i,d),a.type="ul",a.items.push(j[1]);return}Pr(a,i,d),s.push(x)}),Gr(s,i,d),Pr(a,i,d),ay(c,i,d,t),p&&h.length&&i.push(n.jsx("pre",{children:n.jsx("code",{children:h.join(`
`)})},`code-${d.current++}`)),i},km=({content:e,className:t,enableImageLightbox:r=!1})=>{const[o,i]=u.useState(null);return u.useEffect(()=>{if(!o)return;const s=a=>{a.key==="Escape"&&i(null)};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[o]),n.jsxs(n.Fragment,{children:[n.jsx(oR,{className:t,children:OS(e,{onImageClick:r?i:null})}),o&&n.jsx(sR,{type:"button",onClick:()=>i(null),"aria-label":"Rasmni yopish",children:n.jsx(aR,{src:o.src,alt:o.alt||"Blog image"})})]})},Pe={blogTitleChars:120,blogExcerptChars:220,blogTagChars:24,blogTagCount:8,groupNameChars:60,groupDescriptionChars:240,meetTitleChars:80,meetDescriptionChars:240,courseNameChars:120,courseDescriptionChars:500,lessonTitleChars:120,lessonDescriptionChars:1e3,nicknameChars:30,usernameChars:24,bioChars:160,testTitleChars:120,testDescriptionChars:300,testQuestionChars:240,testOptionChars:140,flashcardTitleChars:120,flashcardSideChars:220,sentenceBuilderTitleChars:120,sentenceBuilderDescriptionChars:300,sentenceBuilderPromptChars:240,sentenceBuilderAnswerChars:240,blogWordsOrdinary:1e3,blogWordsPremium:2e3,blogImagesOrdinary:2,blogImagesPremium:5,postWords:100},ly=e=>(e==null?void 0:e.premiumStatus)==="active"||(e==null?void 0:e.premiumStatus)==="premium",il=(e="")=>String(e).trim().split(/\s+/).filter(Boolean).length,pR=(e="")=>Array.from(String(e||"").matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)).length,hR=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,fR=et`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,xR=l.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 28, 0.72);
  backdrop-filter: blur(8px);
  z-index: 12000;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 12px;
  overflow: hidden;
  animation: ${hR} 0.18s ease-out;

  @media (min-width: 960px) {
    padding: 28px;
  }

  @media (max-width: 640px) {
    padding: 0;
  }
`,gR=l.div`
  --blog-editor-text: var(--text-color);
  --blog-editor-muted: var(--text-muted-color);
  --blog-editor-surface: color-mix(
    in srgb,
    var(--secondary-color) 84%,
    black 16%
  );
  --blog-editor-surface-2: color-mix(
    in srgb,
    var(--tertiary-color) 86%,
    black 14%
  );
  --blog-editor-surface-3: color-mix(
    in srgb,
    var(--input-color) 88%,
    black 12%
  );
  --blog-editor-border: color-mix(in srgb, var(--border-color) 80%, white 20%);
  --blog-editor-soft: color-mix(
    in srgb,
    var(--background-color) 76%,
    transparent
  );
  --blog-editor-primary: var(--primary-color);

  width: min(1320px, 100%);
  max-width: 100vw;
  height: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--blog-editor-surface) 92%, white 8%) 0%,
    var(--blog-editor-surface-2) 100%
  );
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.3);
  animation: ${fR} 0.22s ease-out;

  @media (max-width: 640px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`,mR=l.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  box-sizing: border-box;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid var(--blog-editor-border);
  background: color-mix(in srgb, var(--blog-editor-surface) 86%, transparent);
  backdrop-filter: blur(16px);

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    gap: 14px;
  }

  @media (max-width: 640px) {
    padding: 14px 12px 12px;
  }
`,yR=l.div`
  min-width: 0;
  color: var(--blog-editor-text);

  h3 {
    margin: 0 0 4px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--blog-editor-muted);
  }

  @media (max-width: 640px) {
    h3 {
      font-size: 16px;
    }

    p {
      font-size: 12px;
      line-height: 1.5;
    }
  }
`,vR=l.div`
  display: flex;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
  gap: 10px;

  @media (max-width: 820px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: start;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,bR=l.div`
  display: flex;
  min-width: 0;
  box-sizing: border-box;
  padding: 4px;
  background: color-mix(in srgb, var(--blog-editor-soft) 74%, transparent);
  border-radius: 999px;

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-radius: 18px;
    gap: 4px;
  }
`,lh=l.button`
  min-width: 0;
  border: none;
  background: ${e=>e.active?"color-mix(in srgb, var(--blog-editor-surface) 82%, white 18%)":"transparent"};
  color: ${e=>e.active?"var(--blog-editor-text)":"var(--blog-editor-muted)"};
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (max-width: 640px) {
    padding: 10px 8px;
    border-radius: 14px;
    font-size: 12px;
  }
`,wR=l.button`
  border: none;
  background: color-mix(in srgb, var(--blog-editor-soft) 74%, transparent);
  color: var(--blog-editor-text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 820px) {
    justify-self: end;
  }

  @media (max-width: 640px) {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
`,kR=l.button`
  border: none;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--blog-editor-primary) 84%, #2563eb 16%),
    #0f9d8f
  );
  color: white;
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${e=>e.disabled?.55:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};

  @media (max-width: 820px) {
    width: 100%;
  }
`,jR=l.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${e=>e.mode==="split"?"minmax(0, 1.1fr) minmax(0, 0.9fr)":"1fr"};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`,SR=l.div`
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: ${e=>e.mode==="preview"?"none":(e.mode==="write","flex")};
  flex-direction: column;
  background: color-mix(in srgb, var(--blog-editor-surface) 82%, transparent);
`,CR=l.div`
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: ${e=>e.mode==="write"?"none":(e.mode==="preview","block")};

  border-left: ${e=>e.mode==="split"?"1px solid var(--blog-editor-border)":"none"};
  overflow-y: auto;

  @media (max-width: 960px) {
    border-left: none;
  }
`,zR=l.div`
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  border-bottom: 1px solid var(--blog-editor-border);
  background: color-mix(in srgb, var(--blog-editor-surface) 84%, transparent);

  @media (max-width: 640px) {
    padding: 10px 12px;
    gap: 6px;
    position: sticky;
    top: 0;
    z-index: 4;
  }
`,xn=l.button`
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--blog-editor-border);
  background: color-mix(in srgb, var(--blog-editor-surface) 80%, white 20%);
  color: var(--blog-editor-text);
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;

  @media (max-width: 640px) {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 12px;
  }
`,$R=l.div`
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 22px;

  @media (max-width: 640px) {
    padding: 14px 12px 24px;
  }
`,_R=l.div`
  display: grid;
  gap: 16px;
  min-width: 0;
  box-sizing: border-box;
`,va=l.label`
  display: grid;
  gap: 8px;
  min-width: 0;
  color: var(--blog-editor-muted);
  font-size: 13px;
  font-weight: 700;
`,cy=l.input`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  border: 1px solid var(--blog-editor-border);
  background: var(--blog-editor-surface-3);
  border-radius: 16px;
  padding: 14px 16px;
  color: var(--blog-editor-text);
  font-size: 15px;
  outline: none;

  @media (max-width: 640px) {
    border-radius: 14px;
    padding: 13px 14px;
    font-size: 14px;
  }
`,dy=l.textarea`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  min-height: ${e=>e.minHeight||"120px"};
  border: 1px solid var(--blog-editor-border);
  background: var(--blog-editor-surface-3);
  border-radius: 18px;
  padding: 16px;
  color: var(--blog-editor-text);
  font-size: 15px;
  line-height: 1.75;
  resize: vertical;
  outline: none;

  @media (max-width: 640px) {
    border-radius: 16px;
    padding: 14px;
    font-size: 14px;
    line-height: 1.65;
  }
`,TR=l.button`
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed
    color-mix(in srgb, var(--blog-editor-primary) 36%, transparent);
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(15, 157, 143, 0.08)),
    color-mix(in srgb, var(--blog-editor-surface) 78%, transparent);
  min-height: 180px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 640px) {
    min-height: 148px;
    border-radius: 18px;
  }
`,ER=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
  gap: 10px;
  color: var(--blog-editor-text);
`,RR=l.div`
  max-width: 880px;
  min-width: 0;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 36px 28px 60px;

  @media (max-width: 640px) {
    padding: 18px 14px 36px;
  }
`,PR=l.div`
  margin-bottom: 28px;

  img {
    width: 100%;
    border-radius: 28px;
    margin-bottom: 24px;
    max-height: 360px;
    object-fit: cover;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(2rem, 5vw, 3.8rem);
    line-height: 1.05;
    color: var(--blog-editor-text);
  }

  p {
    margin: 0;
    color: var(--blog-editor-muted);
    font-size: 17px;
    line-height: 1.7;
  }

  @media (max-width: 640px) {
    margin-bottom: 22px;

    img {
      border-radius: 18px;
      margin-bottom: 16px;
      max-height: 220px;
    }

    h1 {
      font-size: 1.9rem;
      line-height: 1.08;
    }

    p {
      font-size: 14px;
      line-height: 1.6;
    }
  }
`,MR=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`,IR=l.span`
  padding: 7px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--blog-editor-primary) 16%, transparent);
  color: color-mix(in srgb, var(--blog-editor-primary) 76%, white 24%);
  font-size: 12px;
  font-weight: 700;
`,uy=e=>({title:(e==null?void 0:e.title)||"",excerpt:(e==null?void 0:e.excerpt)||"",coverImage:(e==null?void 0:e.coverImage)||"",tags:Array.isArray(e==null?void 0:e.tags)?e.tags.join(", "):"",markdown:(e==null?void 0:e.markdown)||""}),LS=({isOpen:e,onClose:t,onSubmit:r,initialBlog:o,saving:i})=>{const s=Ie(_=>_.user),[a,c]=u.useState(window.innerWidth<=960?"write":"split"),[d,p]=u.useState(uy(o)),[h,f]=u.useState(!1),x=u.useRef(null),S=u.useRef(null),m=u.useRef(null);if(u.useEffect(()=>{e&&p(uy(o))},[o,e]),!e)return null;const b=d.tags.split(",").map(_=>_.trim()).filter(Boolean),w=ly(s)?Pe.blogWordsPremium:Pe.blogWordsOrdinary,j=ly(s)?Pe.blogImagesPremium:Pe.blogImagesOrdinary,v=(_,z)=>p(D=>({...D,[_]:z})),y=(_,z="",D="")=>{const B=x.current;if(!B)return;const V=B.selectionStart,R=B.selectionEnd,M=d.markdown.slice(V,R)||D,A=d.markdown.slice(0,V)+_+M+z+d.markdown.slice(R);v("markdown",A),requestAnimationFrame(()=>{B.focus();const O=V+_.length+M.length+z.length;B.setSelectionRange(O,O)})},g=_=>{const z=x.current;if(!z)return;const D=z.selectionStart,B=d.markdown.slice(0,D)+_+d.markdown.slice(D);v("markdown",B),requestAnimationFrame(()=>{z.focus();const V=D+_.length;z.setSelectionRange(V,V)})},k=async(_,z)=>{if(_){f(!0);try{const D=await nR(_);if(!(D!=null&&D.url))throw new Error("Upload failed");z==="cover"?v("coverImage",D.url):g(`
![${_.name}](${D.url})
`)}catch{be.error("Rasmni yuklab bo'lmadi")}finally{f(!1)}}},C=async()=>{if(!d.title.trim()){be.error("Sarlavha kiriting");return}if(!d.markdown.trim()){be.error("Blog matni bo'sh bo'lmasin");return}if(il(d.markdown)>w){be.error(`Blog matni maksimal ${w} ta so'z bo'lishi kerak`);return}if(pR(d.markdown)+(d.coverImage?1:0)>j){be.error(`Har bir blog uchun maksimal ${j} ta rasm ishlatish mumkin`);return}await r({title:d.title.trim(),excerpt:d.excerpt.trim(),coverImage:d.coverImage,tags:b,markdown:d.markdown})};return n.jsx(xR,{onClick:t,children:n.jsxs(gR,{onClick:_=>_.stopPropagation(),children:[n.jsxs(mR,{children:[n.jsxs(yR,{children:[n.jsx("h3",{children:o!=null&&o._id?"Blogni tahrirlash":"Yangi blog"}),n.jsx("p",{children:"Medium uslubidagi markdown editor: cover, inline image, preview va publish."})]}),n.jsxs(vR,{children:[n.jsxs(bR,{children:[n.jsxs(lh,{active:a==="write",onClick:()=>c("write"),children:[n.jsx(om,{size:14}),"Write"]}),n.jsxs(lh,{active:a==="split",onClick:()=>c("split"),children:[n.jsx(H3,{size:14}),"Split"]}),n.jsxs(lh,{active:a==="preview",onClick:()=>c("preview"),children:[n.jsx(_n,{size:14}),"Preview"]})]}),n.jsx(kR,{disabled:i||h,onClick:C,children:i?"Saqlanmoqda...":o!=null&&o._id?"Yangilash":"Publish"}),n.jsx(wR,{onClick:t,children:n.jsx(nt,{size:18})})]})]}),n.jsxs(jR,{mode:a,children:[n.jsxs(SR,{mode:a,children:[n.jsxs(zR,{children:[n.jsx(xn,{onClick:()=>g("# "),children:n.jsx(M3,{size:16})}),n.jsx(xn,{onClick:()=>g("## "),children:n.jsx(I3,{size:16})}),n.jsx(xn,{onClick:()=>y("**","**","Qalin"),children:n.jsx(n4,{size:16})}),n.jsx(xn,{onClick:()=>y("_","_","Kursiv"),children:n.jsx(u4,{size:16})}),n.jsx(xn,{onClick:()=>g("- "),children:n.jsx(L3,{size:16})}),n.jsx(xn,{onClick:()=>g("1. "),children:n.jsx(O3,{size:16})}),n.jsx(xn,{onClick:()=>g("> "),children:n.jsx(V3,{size:16})}),n.jsx(xn,{onClick:()=>g(`
:::dropdown Dropdown sarlavhasi
Bu yerga yashirin kontent yoziladi.
:::
`),children:n.jsx($3,{size:16})}),n.jsx(xn,{onClick:()=>y("\n```txt\n","\n```\n","Kod bloki"),children:n.jsx(_3,{size:16})}),n.jsxs(xn,{onClick:()=>{var _;return(_=m.current)==null?void 0:_.click()},children:[n.jsx($1,{size:16}),"Rasm"]})]}),n.jsx($R,{children:n.jsxs(_R,{children:[n.jsxs(va,{children:["Cover image",n.jsx(TR,{onClick:()=>{var _;return(_=S.current)==null?void 0:_.click()},children:d.coverImage?n.jsx("img",{src:d.coverImage,alt:"Blog cover"}):n.jsxs(ER,{children:[n.jsx($1,{size:28}),n.jsx("span",{children:h?"Yuklanmoqda...":"Cover rasm yuklash uchun bosing"})]})})]}),n.jsxs(va,{children:["Sarlavha",n.jsx(cy,{value:d.title,onChange:_=>v("title",_.target.value.slice(0,Pe.blogTitleChars)),placeholder:"Masalan: Design systems nega chiroyli bo'lmaydi?",maxLength:Pe.blogTitleChars})]}),n.jsxs(va,{children:["Qisqa tavsif",n.jsx(dy,{minHeight:"88px",value:d.excerpt,onChange:_=>v("excerpt",_.target.value.slice(0,Pe.blogExcerptChars)),placeholder:"Kartochkada ko'rinadigan qisqa intro...",maxLength:Pe.blogExcerptChars})]}),n.jsxs(va,{children:["Teglar",n.jsx(cy,{value:d.tags,onChange:_=>v("tags",_.target.value.split(",").slice(0,Pe.blogTagCount).map(z=>z.trim().slice(0,Pe.blogTagChars)).join(", ")),placeholder:"frontend, product, design"})]}),n.jsxs(va,{children:["Markdown",n.jsx(dy,{ref:x,minHeight:"420px",value:d.markdown,onChange:_=>v("markdown",_.target.value),placeholder:`# Birinchi sarlavha

Intro paragraf...

## Bo'lim
- punkt
- yana punkt

![Rasm](https://...)
`})]})]})})]}),n.jsx(CR,{mode:a,children:n.jsxs(RR,{children:[n.jsxs(PR,{children:[d.coverImage?n.jsx("img",{src:d.coverImage,alt:d.title||"Blog cover"}):null,n.jsx("h1",{children:d.title||"Sarlavha shu yerda ko'rinadi"}),n.jsx("p",{children:d.excerpt||"Qisqa tavsif yozilsa shu yerda chiqadi. Preview publish oldidan real ko'rinishni beradi."}),b.length>0&&n.jsx(MR,{children:b.map(_=>n.jsxs(IR,{children:["#",_]},_))})]}),n.jsx(km,{content:d.markdown})]})})]}),n.jsx("input",{ref:S,type:"file",accept:"image/*",hidden:!0,onChange:_=>{var z;return k((z=_.target.files)==null?void 0:z[0],"cover")}}),n.jsx("input",{ref:m,type:"file",accept:"image/*",hidden:!0,onChange:_=>{var z;return k((z=_.target.files)==null?void 0:z[0],"inline")}})]})})},AR=l.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;l.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    color: var(--text-color);
    font-size: 16px;
    font-weight: 700;
  }
`;const Je=l.button`
  margin-left: auto;
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  border-radius: 15px;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`,OR=l.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,LR=l(ym)``,BR=l.div`
  flex: 1;
  overflow-y: auto;
`,DR=l.button`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-color);
  background: ${e=>e.active?"var(--active-color)":"transparent"};
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  color: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: var(--hover-color);
  }
`,FR=l.div`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary-color) 14%, transparent),
    color-mix(in srgb, var(--secondary-color) 82%, black 18%)
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,NR=l.div`
  flex: 1;
  min-width: 0;
`,qR=l.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 6px;
`,HR=l.div`
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.55;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,UR=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`,YR=l.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted-color);
`,VR=l.div`
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
`,WR=l(Ot)`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  margin-bottom: 0;
`,GR=l.div`
  flex: 1;
  min-width: 0;
`,QR=({selectedChannel:e})=>{const t=Qt(),[r,o]=u.useState([]),[i,s]=u.useState(1),[a,c]=u.useState(!0),[d,p]=u.useState(""),[h,f]=u.useState(!0),[x,S]=u.useState(!1),[m,b]=u.useState(!1),w=async()=>{f(!0);try{const k=await iy(1,20);o((k==null?void 0:k.data)||[]),s(1),c(1<((k==null?void 0:k.totalPages)||1))}finally{f(!1)}};u.useEffect(()=>{w()},[]);const j=async()=>{const k=i+1,C=await iy(k,20);o(_=>[..._,...(C==null?void 0:C.data)||[]]),s(k),c(k<((C==null?void 0:C.totalPages)||1))},v=u.useMemo(()=>{if(!d.trim())return r;const k=d.trim().toLowerCase();return r.filter(C=>{var z,D,B,V;const _=((z=C.author)==null?void 0:z.nickname)||((D=C.author)==null?void 0:D.username)||"";return((B=C.title)==null?void 0:B.toLowerCase().includes(k))||((V=C.excerpt)==null?void 0:V.toLowerCase().includes(k))||_.toLowerCase().includes(k)})},[r,d]),y=async k=>{b(!0);try{const C=await MS(k);o(_=>[C,..._]),S(!1),t(`/blogs/${C.slug||C._id}`)}finally{b(!1)}},g=(k=6)=>[...Array(k)].map((C,_)=>n.jsxs(VR,{children:[n.jsx(WR,{}),n.jsxs(GR,{children:[n.jsx(Ot,{height:"15px",width:_%2===0?"72%":"58%",mb:"8px"}),n.jsx(Ot,{height:"12px",width:"92%",mb:"6px"}),n.jsx(Ot,{height:"12px",width:_%3===0?"76%":"68%",mb:"10px"}),n.jsx(Ot,{height:"11px",width:"54%",mb:"0"})]})]},_));return n.jsxs(AR,{children:[n.jsxs(OR,{children:[n.jsx(LR,{placeholder:"Blog qidirish...",value:d,onChange:k=>p(k.target.value)}),n.jsx(Je,{onClick:()=>S(!0),title:"Yangi blog",children:n.jsx(Et,{size:16})})]}),n.jsx(BR,{id:"blogs-sidebar-scroll",children:h?n.jsx(n.Fragment,{children:g(1)}):v.length===0?n.jsx(YR,{children:"Blog topilmadi."}):n.jsx(En,{dataLength:v.length,next:j,hasMore:a&&!d.trim(),loader:n.jsx(n.Fragment,{children:g(2)}),scrollableTarget:"blogs-sidebar-scroll",style:{overflow:"visible"},children:v.map(k=>{var _,z;const C=k.slug||k._id;return n.jsxs(DR,{active:String(e)===String(C),onClick:()=>t(`/blogs/${C}`),children:[n.jsx(FR,{children:k.coverImage?n.jsx("img",{src:k.coverImage,alt:k.title}):null}),n.jsxs(NR,{children:[n.jsx(qR,{children:k.title}),n.jsx(HR,{children:k.excerpt||"Tavsif yo'q"}),n.jsxs(UR,{children:[n.jsx("span",{children:((_=k.author)==null?void 0:_.nickname)||((z=k.author)==null?void 0:z.username)||"Muallif"}),n.jsxs("span",{children:[k.likes," like"]}),n.jsxs("span",{children:[k.comments," izoh"]})]})]})]},k._id)})})}),n.jsx(LS,{isOpen:x,onClose:()=>S(!1),onSubmit:y,saving:m})]})},KR=l.div`
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
`,JR=l.div`
  padding: 12px 16px;
  display: flex;
  // height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`;l.button`
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
`;l.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
`;const XR=l(ym)`
  flex: 1;
  min-width: 0;
`,ZR=l.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,eP=l.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,ch=l.button`
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
`,dh=l.button`
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
`,tP=l.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`,uh=l.div`
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
`,py=l(_j)`
  text-decoration: none;
  color: inherit;
  display: block;
`,hy=l.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`,ph=l.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${e=>e.$isGroup?"linear-gradient(135deg, #667eea 0%, #764ba2 100%)":e.$isSavedMessages?"#0288D1":"#7289da"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`,rP=l.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${e=>e.$online?"#43b581":"#72767d"};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`,nP=l.span`
  font-size: 12px;
  color: #43b581;
`,hh=l.div`
  flex: 1;
  min-width: 0;
`,fh=l.div`
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
`,xh=l.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,fy=l.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`,xy=l.div`
  font-size: 12px;
  color: #72767d;
  margin-bottom: 2px;
`,oP=l.div`
  background-color: #7289da;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;l.div`
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
`;l.div`
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
`;l.div`
  flex: 1;
`;l.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
`;l.div`
  font-size: 12px;
  color: var(--primary-color);
`;const iP=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid
    color-mix(in srgb, var(--border-color) 68%, transparent);
`,sP=l.div`
  flex: 1;
  min-width: 0;
`,aP=l.div`
  width: 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`,lP=({onOpenCreateGroup:e,onOpenCreateMeet:t})=>{const{chats:r,loading:o,chatsPage:i,chatsHasMore:s,fetchChats:a,searchUsers:c,createChat:d,selectedNav:p,getAllUsers:h,setSelectedNav:f,selectedChannel:x,setSelectedChannel:S,previewChat:m}=Wo(),{isUserOnline:b,getOnlineCount:w,fetchBulkStatuses:j}=vm(),v=Ie(H=>H.user),y=Qt(),[g,k]=u.useState(""),[C,_]=u.useState("all"),[z,D]=u.useState([]),[B,V]=u.useState(!1),[R,M]=u.useState(()=>p==="groups"?"group":p==="meets"?"video":"private"),[A,O]=u.useState([]),[T,F]=u.useState(!1),P=p==="groups"?"group":p==="users"?"private":p==="meets"?"video":R,q=p==="meets"||p==="chats"&&P==="video";u.useEffect(()=>{p==="groups"?M("group"):p==="users"?M("private"):p==="meets"&&M("video")},[p]),u.useEffect(()=>{if(!r||r.length===0||q)return;const H=new Set;r.forEach(ie=>{ie.members&&ie.members.forEach(G=>{G._id?H.add(G._id):G.id&&H.add(G.id)})});const Q=Array.from(H);Q.length>0&&j(Q)},[r,j,q]),u.useEffect(()=>{if(q||p!=="users"&&p!=="chats"){D([]);return}if(g.trim().length>0){const H=setTimeout(async()=>{V(!0);const Q=await c(g);D(Q.map(ie=>({id:ie.id||ie._id,name:ie.name,username:ie.username,avatar:ie.avatar,premiumStatus:ie.premiumStatus}))),V(!1)},500);return()=>clearTimeout(H)}else D([])},[q,g,p,c]);const $=async H=>{const Q=(v==null?void 0:v._id)||(v==null?void 0:v.id),ie=H.id||H._id,G=r.find(le=>le.isGroup||!le.members?!1:ie===Q?le.isSavedMessages:!le.isSavedMessages&&le.members.some(ue=>(ue._id||ue.id)===ie));if(G)G.type==="group"?y(`/groups/${G.urlSlug}`):y(`/users/${G.urlSlug}`);else try{const le=await d({isGroup:!1,memberIds:[H._id||H.id]}),ue=(le==null?void 0:le.urlSlug)||(le==null?void 0:le.jammId)||(le==null?void 0:le._id)||(le==null?void 0:le.id);ue&&(y(`/users/${ue}`),k(""))}catch(le){console.error("Failed to start private chat",le)}},E=Qe.useMemo(()=>{let H=r;if(p==="chats"||p==="users"||p==="groups"?P==="private"?H=H.filter(Q=>!Q.isGroup&&(Q.isSavedMessages||Q.hasMessages||String(Q.id)===String(x))):P==="group"&&(H=H.filter(Q=>Q.isGroup)):p==="home"&&(H=H.filter(Q=>Q.isGroup||!Q.isGroup&&(Q.isSavedMessages||Q.hasMessages||String(Q.id)===String(x)))),g&&(H=H.filter(Q=>Q.name.toLowerCase().includes(g.toLowerCase()))),C==="today"?H=H.filter(Q=>Q.time.includes(":")||Q.time==="Kecha"):C==="week"&&(H=H.filter(Q=>Q.time.includes("Dushanba")||Q.time.includes("Kecha"))),!q&&(p==="users"||p==="chats"&&P==="private")&&m&&m.type==="user"&&!H.some(Q=>{var ie;return(ie=Q.members)==null?void 0:ie.some(G=>(G._id||G.id)===m.targetUserId)})){const Q={id:`virtual-${m.targetUserId}`,urlSlug:m.targetUserId,isGroup:!1,type:"user",name:m.name,avatar:m.avatar,hasMessages:!1,members:[{_id:m.targetUserId}],lastMessage:"Xabar yozishni boshlang..."};String(x)===String(m.targetUserId)&&(H=[Q,...H])}return H},[p,P,g,C,r,x,m,q]),I=Qe.useMemo(()=>{const H=g.trim().toLowerCase();return H?A.filter(Q=>String(Q.title||"Nomsiz meet").toLowerCase().includes(H)):A},[A,g]),N=Qe.useRef(!1);u.useEffect(()=>{q&&!N.current&&(N.current=!0,F(!0),zu().then(H=>O(Array.isArray(H)?H:[])).finally(()=>F(!1)))},[q]);function J(H){const Q=(Date.now()-H)/1e3;return Q<60?"hozir":Q<3600?`${Math.floor(Q/60)} daq oldin`:Q<86400?`${Math.floor(Q/3600)} soat oldin`:`${Math.floor(Q/86400)} kun oldin`}const Y=async(H,Q)=>{H.preventDefault(),H.stopPropagation(),await GE(Q);const ie=await zu();O(Array.isArray(ie)?ie:[])},L=(H=6)=>[...Array(H)].map((Q,ie)=>n.jsxs(iP,{children:[n.jsx(qx,{size:"40px"}),n.jsxs(sP,{children:[n.jsx(Ot,{height:"14px",width:ie%2===0?"56%":"48%",mb:"8px"}),n.jsx(Ot,{height:"12px",width:ie%3===0?"72%":"64%",mb:"0"})]}),n.jsxs(aP,{children:[n.jsx(Ot,{height:"10px",width:"34px",mb:"0"}),n.jsx(Ot,{height:"18px",width:"22px",borderRadius:"999px",mb:"0"})]})]},ie));return n.jsxs(KR,{children:[n.jsxs(JR,{children:[n.jsx(XR,{type:"text",placeholder:"Chat qidirish...",value:g,onChange:H=>k(H.target.value),containerStyle:{flex:1,marginRight:p==="groups"||q||p==="chats"&&P==="group"?"12px":"0"}}),(p==="groups"||p==="chats"&&P==="group")&&n.jsx(Je,{onClick:e,title:"Guruh yaratish",children:n.jsx(Et,{size:18})}),q&&n.jsx(Je,{onClick:t,title:"Yangi meet",children:n.jsx(Et,{size:18})})]}),(p==="chats"||p==="users"||p==="groups"||p==="meets")&&n.jsxs(eP,{children:[n.jsx(ch,{active:P==="private",onClick:()=>{M("private"),y("/users")},children:"Shaxsiy"}),n.jsx(ch,{active:P==="group",onClick:()=>{M("group"),y("/groups")},children:"Guruhlar"}),n.jsx(ch,{active:P==="video",onClick:()=>{M("video"),y("/meets")},children:"Video"})]}),p==="home"&&n.jsxs(ZR,{children:[n.jsx(dh,{active:C==="all",onClick:()=>_("all"),children:"Barchasi"}),n.jsx(dh,{active:C==="today",onClick:()=>_("today"),children:"Bugun"}),n.jsx(dh,{active:C==="week",onClick:()=>_("week"),children:"Hafta"})]}),n.jsx(tP,{id:"sidebarScrollArea",children:q?T?n.jsx(n.Fragment,{children:L(6)}):I.length===0?n.jsxs("div",{style:{padding:32,textAlign:"center",color:"var(--text-muted-color)"},children:[n.jsx(Lr,{size:32,style:{marginBottom:10,opacity:.4}}),n.jsx("div",{children:g.trim()?"Meet topilmadi":"Hali hech qanday meet yo'q"})]}):I.map(H=>n.jsx(py,{to:`/join/${H.roomId}`,children:n.jsxs(uh,{children:[n.jsx(hy,{children:n.jsx(ph,{isGroup:!0,children:n.jsx(Lr,{size:18})})}),n.jsxs(hh,{children:[n.jsx(fh,{children:H.title||"Nomsiz meet"}),n.jsxs(xh,{children:[H.isPrivate?n.jsx(Fo,{size:12}):n.jsx(tc,{size:12}),n.jsx("span",{children:H.isCreator?"Admin":"Ishtirokchi"})]})]}),n.jsxs(fy,{children:[n.jsx(xy,{children:J(H.createdAt)}),n.jsx("button",{onClick:Q=>Y(Q,H.roomId),title:"O'chirish",style:{background:"none",border:"none",color:"#4f545c",cursor:"pointer",padding:2},children:n.jsx(lr,{size:12})})]})]})},H.roomId)):n.jsxs(n.Fragment,{children:[o&&!g?n.jsx(n.Fragment,{children:L(1)}):n.jsx(En,{dataLength:E.length,next:()=>a(i+1),hasMore:s&&C==="all"&&g==="",loader:n.jsx(n.Fragment,{children:L(2)}),endMessage:E.length>0&&C==="all"&&g===""?n.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Barcha suhbatlar ko'rsatildi."}):null,scrollableTarget:"sidebarScrollArea",style:{display:"flex",flexDirection:"column",overflow:"visible"},children:E.map(H=>{var me;const Q=(v==null?void 0:v._id)||(v==null?void 0:v.id),ie=!H.isGroup&&H.members?H.members.find(W=>W._id!==Q):null,G=ie==null?void 0:ie._id,le=G?b(G):!1,ue=H.isGroup?w(H.members):0;return n.jsx(py,{to:`/${H.isGroup?"groups":"users"}/${H.urlSlug}`,children:n.jsxs(uh,{active:x===H.urlSlug,children:[n.jsxs(hy,{children:[n.jsx(ph,{$isGroup:H.isGroup,$isSavedMessages:H.isSavedMessages,children:H.isSavedMessages?n.jsx(wx,{size:18,color:"white",fill:"white"}):((me=H.avatar)==null?void 0:me.length)>1?n.jsx("img",{src:H.avatar,alt:H.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):H.isGroup?H.name.charAt(0):H.name.split(" ").map(W=>W[0]).join("")}),!H.isGroup&&!H.isSavedMessages&&n.jsx(rP,{$online:le})]}),n.jsxs(hh,{children:[n.jsxs(fh,{children:[H.name,H.premiumStatus==="active"&&n.jsx(zr,{width:14,height:14})]}),n.jsx(xh,{children:H.isGroup&&ue>0?n.jsxs(n.Fragment,{children:[H.lastMessage," · ",n.jsxs(nP,{children:[ue," online"]})]}):H.lastMessage})]}),n.jsxs(fy,{children:[n.jsx(xy,{children:H.time}),H.unread>0&&n.jsx(oP,{children:H.unread})]})]})},H.id)})}),g&&n.jsx(n.Fragment,{children:B?n.jsx("div",{style:{padding:"20px 16px",display:"flex",flexDirection:"column",gap:"16px"},children:[...Array(3)].map((H,Q)=>n.jsxs(NE,{children:[n.jsx(qx,{size:"40px"}),n.jsxs("div",{style:{flex:1},children:[n.jsx(Ot,{height:"14px",width:"60%",mb:"6px"}),n.jsx(Ot,{height:"12px",width:"40%",mb:"0"})]})]},Q))}):z.filter(H=>{const Q=H.id||H._id,ie=(v==null?void 0:v._id)||(v==null?void 0:v.id);return Q===ie?!1:!E.some(le=>{var ue;return!le.isGroup&&!le.isSavedMessages&&((ue=le.members)==null?void 0:ue.some(me=>(me._id||me.id)===Q))})}).map(H=>{var Q;return n.jsxs(uh,{onClick:()=>$(H),style:{cursor:"pointer"},children:[n.jsx(ph,{isGroup:!1,children:((Q=H==null?void 0:H.avatar)==null?void 0:Q.length)>1?n.jsx("img",{src:H.avatar,alt:H.name,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(H.name||"?").charAt(0)}),n.jsxs(hh,{children:[n.jsxs(fh,{children:[H.name,H.premiumStatus==="active"&&n.jsx(zr,{width:14,height:14})]}),n.jsxs(xh,{children:["@",H.username]})]})]},H.id)})})]})})]})},cP="modulepreload",dP=function(e){return"/"+e},gy={},Hd=function(t,r,o){let i=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(r.map(d=>{if(d=dP(d),d in gy)return;gy[d]=!0;const p=d.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${h}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":cP,p||(f.as="script"),f.crossOrigin="",f.href=d,c&&f.setAttribute("nonce",c),document.head.appendChild(f),p)return new Promise((x,S)=>{f.addEventListener("load",x),f.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return i.then(a=>{for(const c of a||[])c.status==="rejected"&&s(c.reason);return t().catch(s)})},uP=({onSuccess:e,onError:t}={})=>gj({mutationFn:dS,onSuccess:r=>{e==null||e(r)},onError:()=>{t==null||t()}}),pP=({onSuccess:e,onError:t}={})=>gj({mutationFn:cS,onSuccess:r=>{e==null||e(r)},onError:()=>{t==null||t()}}),hP=et`from { opacity: 0; } to { opacity: 1; }`,fP=et`from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); }`,xP=l.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${hP} 0.2s ease;
  padding: 20px;
`,gP=l.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  animation: ${fP} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
`,mP=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
`,yP=l.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;l.button`
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
`;const vP=l.div`
  padding: 16px 20px;
  display: flex;
  gap: 12px;
`,bP=l.div`
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
`,wP=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,kP=l.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`,jP=l.textarea`
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
`,SP=l.div`
  font-size: 12px;
  color: ${e=>e.warn?"#ed4245":"var(--text-muted-color)"};
  align-self: flex-end;
  font-variant-numeric: tabular-nums;
`,CP=l.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 20px 16px 20px;
`,gh=l.button`
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
`,zP=l.div`
  width: 1px;
  height: 20px;
  background: var(--border-color);
  margin: 0 4px;
`,$P=l.div`
  flex: 1;
`,_P=l.button`
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
`,BS=({isOpen:e,onClose:t,onSubmit:r,currentUser:o,initialContent:i="",title:s="Yangi Gurung",submitLabel:a="Yuborish"})=>{const[c,d]=u.useState(""),p=u.useRef(null);u.useEffect(()=>{e?(d(i||""),setTimeout(()=>{var w;return(w=p.current)==null?void 0:w.focus()},80)):d("")},[i,e]);const h=w=>{w.key==="Escape"&&t(),(w.metaKey||w.ctrlKey)&&w.key==="Enter"&&f()},f=async()=>{c.trim()&&(il(c)>Pe.postWords||(await r(c.trim()),t()))},x=(w,j="")=>{const v=p.current;if(!v)return;const y=v.selectionStart,g=v.selectionEnd,k=c.slice(y,g),C=c.slice(0,y),_=c.slice(g),z=`${C}${w}${k}${j}${_}`;il(z)<=Pe.postWords&&(d(z),setTimeout(()=>{v.focus(),v.setSelectionRange(y+w.length,g+w.length)},0))},S=(o==null?void 0:o.nickname)||(o==null?void 0:o.username)||"Siz",m=S.charAt(0).toUpperCase(),b=il(c);return e?n.jsx(xP,{onClick:w=>w.target===w.currentTarget&&t(),children:n.jsxs(gP,{children:[n.jsxs(mP,{children:[n.jsx(yP,{children:s}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(vP,{children:[n.jsx(bP,{children:o!=null&&o.avatar?n.jsx("img",{src:o.avatar,alt:S}):m}),n.jsxs(wP,{children:[n.jsx(kP,{children:S}),n.jsx(jP,{ref:p,value:c,onChange:w=>{il(w.target.value)<=Pe.postWords&&d(w.target.value)},onKeyDown:h,placeholder:"Fikringizni yozing… markdown qo'llab-quvvatlanadi: **qalin**, _kursiv_, #teg",spellCheck:!1}),n.jsxs(SP,{warn:b>Pe.postWords-10,children:[b,"/",Pe.postWords," so'z"]})]})]}),n.jsxs(CP,{children:[n.jsx(gh,{title:"Qalin (Ctrl+B)",onClick:()=>x("**","**"),children:n.jsx(n4,{size:15})}),n.jsx(gh,{title:"Kursiv (Ctrl+I)",onClick:()=>x("_","_"),children:n.jsx(u4,{size:15})}),n.jsx(gh,{title:"Teg qo'shish",onClick:()=>x("#"),children:n.jsx(Hl,{size:15})}),n.jsx(zP,{}),n.jsx($P,{}),n.jsxs(_P,{disabled:!c.trim(),onClick:f,children:[n.jsx(np,{size:14}),a]})]})]})}):null},TP=async(e="foryou",t=1,r=10)=>{const{data:o}=await fe.get(`/posts/feed?type=${e}&page=${t}&limit=${r}`);return o},EP=async e=>{const{data:t}=await fe.post("/posts",{content:e});return t},RP=async(e,t)=>{const{data:r}=await fe.patch(`/posts/${e}`,{content:t});return r},PP=async e=>{await fe.delete(`/posts/${e}`)},MP=async e=>{const{data:t}=await fe.post(`/posts/${e}/like`);return t},IP=async e=>{const{data:t}=await fe.post(`/posts/${e}/view`);return t},AP=async({postId:e,content:t})=>{const{data:r}=await fe.post(`/posts/${e}/comments`,{content:t});return r},OP=async({postId:e,commentId:t,content:r,replyToUser:o})=>{const{data:i}=await fe.post(`/posts/${e}/comments/${t}/reply`,{content:r,replyToUser:o});return i},LP=async(e,t=1,r=10)=>{const{data:o}=await fe.get(`/posts/${e}/comments?page=${t}&limit=${r}`);return o},BP=async e=>{const{data:t}=await fe.get(`/posts/user/${e}`);return t},DP=async()=>{const{data:e}=await fe.get("/posts/liked");return e},FP=async e=>{const{data:t}=await fe.post(`/users/${e}/follow`);return t},NP=async e=>{const{data:t}=await fe.get(`/users/${e}/profile`);return t},DS=u.createContext(),fp=()=>u.useContext(DS),qP=({children:e})=>{const[t,r]=u.useState([]),[o,i]=u.useState(1),[s,a]=u.useState(!0),[c,d]=u.useState([]),[p,h]=u.useState(1),[f,x]=u.useState(!0),[S,m]=u.useState([]),[b,w]=u.useState(!1),j=u.useCallback(async(O="foryou",T=1)=>{T===1&&w(!0);try{const F=await TP(O,T,10),P=F.data||[],q=F.totalPages||1;O==="foryou"?(r($=>T===1?P:[...$,...P]),i(T),a(T<q)):(d($=>T===1?P:[...$,...P]),h(T),x(T<q))}catch(F){console.error("fetchFeed error:",F)}finally{T===1&&w(!1)}},[]),v=u.useCallback(async O=>{try{const T=await EP(O);return r(F=>[T,...F]),T}catch(T){return console.error("createPost error:",T),null}},[]),y=u.useCallback(async(O,T)=>{try{const F=await RP(O,T),P=q=>q.map($=>$._id===O?{...$,...F}:$);return r(P),d(P),m(P),F}catch(F){throw console.error("editPost error:",F),F}},[]),g=u.useCallback(async O=>{try{const{liked:T,likes:F}=await MP(O),P=q=>q.map($=>$._id===O?{...$,liked:T,likes:F}:$);r(P),d(P),m(P)}catch(T){console.error("likePost error:",T)}},[]),k=u.useCallback(async O=>{try{const{views:T}=await IP(O),F=P=>P.map(q=>q._id===O?{...q,views:T}:q);r(F),d(F),m(F)}catch(T){console.error("viewPost error:",T)}},[]),C=u.useCallback(async(O,T)=>{try{const{comments:F}=await AP({postId:O,content:T}),P=q=>q.map($=>$._id===O?{...$,comments:F}:$);r(P),d(P),m(P)}catch(F){console.error("addComment error:",F)}},[]),_=u.useCallback(async(O,T=1,F=10)=>{try{return await LP(O,T,F)}catch(P){return console.error("getComments error:",P),[]}},[]),z=u.useCallback(async(O,T,F,P)=>{try{return await OP({postId:O,commentId:T,content:F,replyToUser:P})}catch(q){return console.error("addReply error:",q),null}},[]),D=u.useCallback(async O=>{try{const T=await BP(O);return m(T),T}catch(T){return console.error("fetchUserPosts error:",T),[]}},[]),B=u.useCallback(async O=>{try{await PP(O);const T=F=>F.filter(P=>P._id!==O);r(T),d(T),m(T)}catch(T){console.error("deletePost error:",T)}},[]),V=u.useCallback(async()=>{try{return await DP()}catch(O){return console.error("fetchLikedPosts error:",O),[]}},[]),R=u.useCallback(async O=>{try{return await FP(O)}catch(T){return console.error("toggleFollow error:",T),null}},[]),M=u.useCallback(async O=>{try{return await NP(O)}catch(T){return console.error("getPublicProfile error:",T),null}},[]),A={forYouPosts:t,forYouPage:o,forYouHasMore:s,followingPosts:c,followingPage:p,followingHasMore:f,userPosts:S,loading:b,fetchFeed:j,createPost:v,editPost:y,likePost:g,viewPost:k,addComment:C,getComments:_,addReply:z,fetchUserPosts:D,fetchLikedPosts:V,deletePost:B,toggleFollow:R,getPublicProfile:M};return n.jsx(DS.Provider,{value:A,children:e})},HP=async(e=1,t=15)=>{const{data:r}=await fe.get(`/courses?page=${e}&limit=${t}`);return r},UP=async e=>{const{data:t}=await fe.post("/courses",e);return t},YP=async e=>{await fe.delete(`/courses/${e}`)},VP=async({courseId:e,...t})=>{await fe.post(`/courses/${e}/lessons`,t)},WP=async({courseId:e,lessonId:t})=>{await fe.delete(`/courses/${e}/lessons/${t}`)},GP=async(e,t,r=1,o=15)=>{const{data:i}=await fe.get(`/courses/${e}/lessons/${t}/comments?page=${r}&limit=${o}`);return i},QP=async({courseId:e,lessonId:t,text:r})=>{await fe.post(`/courses/${e}/lessons/${t}/comments`,{text:r})},KP=async({courseId:e,lessonId:t,commentId:r,text:o})=>{await fe.post(`/courses/${e}/lessons/${t}/comments/${r}/replies`,{text:o})},JP=async e=>{await fe.post(`/courses/${e}/enroll`)},XP=async({courseId:e,userId:t})=>{await fe.patch(`/courses/${e}/members/${t}/approve`)},ZP=async({courseId:e,userId:t})=>{await fe.delete(`/courses/${e}/members/${t}`)},eM=async({courseId:e,lessonId:t})=>{await fe.patch(`/courses/${e}/lessons/${t}/views`)},tM=async({courseId:e,lessonId:t})=>{const{data:r}=await fe.post(`/courses/${e}/lessons/${t}/like`);return r},rM=async()=>{const{data:e}=await fe.get("/courses/liked-lessons");return e},nM=async(e,t)=>{const{data:r}=await fe.get(`/courses/${e}/lessons/${t}/playback-token`);return r},FS=u.createContext(null),oM="http://localhost:3000",iM=()=>{var e;try{const t=localStorage.getItem("auth-storage");if(!t)return null;const r=JSON.parse(t);return((e=r==null?void 0:r.state)==null?void 0:e.user)||null}catch{return null}},sM=({children:e})=>{const[t,r]=u.useState([]),[o,i]=u.useState(!0),[s,a]=u.useState(1),[c,d]=u.useState(!0),p=u.useRef(!1),h=u.useRef(null),x=Ie($=>$.user)||iM(),S=u.useCallback($=>$?typeof $=="string"?$:$._id||$.id||$.userId||null:null,[]),m=u.useCallback($=>t.find(E=>String(E._id||E.id)===String($)||String(E.urlSlug||"")===String($)),[t]),b=u.useCallback(($,E)=>{r(I=>I.map(N=>{if(!(String(N._id||N.id)===String($)||String(N.urlSlug||"")===String($)))return N;const Y=E(Array.isArray(N.members)?N.members:[]);return{...N,members:Y}}))},[]),w=u.useCallback(async($=1)=>{try{$===1&&i(!0);const E=await HP($,15),I=(E==null?void 0:E.data)||[],N=(E==null?void 0:E.totalPages)||1,J=I.map(Y=>({...Y,id:Y._id,createdBy:Y.createdBy}));r(Y=>$===1?J:[...Y,...J]),a($),d($<N),$===1&&(p.current=!0)}catch(E){console.error("Error fetching courses:",E)}finally{$===1&&i(!1)}},[]),j=u.useCallback(async()=>{p.current||await w(1)},[w]);u.useEffect(()=>{},[]),u.useEffect(()=>{var N,J;let $=null;try{const Y=localStorage.getItem("auth-storage");Y&&($=((J=(N=JSON.parse(Y))==null?void 0:N.state)==null?void 0:J.token)||null)}catch{}if(!$)return;const E=oM.replace("http","ws")+"/courses";h.current=Oo(E,{auth:{token:$},transports:["websocket"]});const I=Y=>{console.log("Course socket event receive:",Y),w()};return h.current.on("course_enrolled",I),h.current.on("member_approved",I),h.current.on("member_rejected",I),h.current.on("member_approved_broadcast",I),h.current.on("member_rejected_broadcast",I),()=>{h.current&&h.current.disconnect()}},[w]);const v=u.useCallback($=>{h.current&&h.current.connected&&h.current.emit("join_course",{courseId:$})},[]),y=u.useCallback($=>{h.current&&h.current.connected&&h.current.emit("leave_course",{courseId:$})},[]),g=u.useCallback(async($,E,I,N,J,Y)=>{try{const L=await UP({name:$,description:E,image:I,category:N,price:J,accessType:Y});return await w(),L._id}catch(L){throw console.error("Error creating course:",L),L}},[w]),k=u.useCallback(async $=>{try{return await YP($),await w(),!0}catch(E){throw console.error("Error deleting course:",E),E}},[w]),C=u.useCallback(async($,E,I,N,J="video",Y="",L="",H=0,Q="direct",ie=[])=>{try{await VP({courseId:$,title:E,videoUrl:I,description:N,type:J,fileUrl:Y,fileName:L,fileSize:H,streamType:Q,streamAssets:ie}),await w()}catch(G){console.error("Error adding lesson:",G)}},[w]),_=u.useCallback(async($,E,I=1,N=15)=>{try{return await GP($,E,I,N)}catch(J){return console.error("Error getting lesson comments:",J),{data:[],totalPages:1}}},[]),z=u.useCallback(async($,E)=>{try{await WP({courseId:$,lessonId:E}),await w()}catch(I){console.error("Error removing lesson:",I)}},[w]),D=u.useCallback(async($,E,I)=>{try{await QP({courseId:$,lessonId:E,text:I}),await w()}catch(N){console.error("Error adding comment:",N)}},[w]),B=u.useCallback(async($,E,I,N)=>{try{await KP({courseId:$,lessonId:E,commentId:I,text:N}),await w()}catch(J){console.error("Error adding reply:",J)}},[w]),V=u.useCallback(async $=>{const E=m($),I=S(x);if(!E||!I)return;const N=E.accessType==="free_open"?"approved":"pending",J={userId:I,name:x.nickname||x.username,avatar:x.avatar||(x.nickname||x.username||"").substring(0,2).toUpperCase(),status:N,joinedAt:new Date().toISOString()};b($,Y=>[...Y.filter(H=>String(S(H.userId||H))!==String(I)),J]);try{await JP($)}catch(Y){throw console.error("Error enrolling:",Y),await w(),Y}},[x,w,m,S,b]),R=u.useCallback(async($,E)=>{b($,I=>I.map(N=>String(S(N.userId||N))===String(E)?{...N,status:"approved"}:N));try{await XP({courseId:$,userId:E})}catch(I){throw console.error("Error approving user:",I),await w(),I}},[w,S,b]),M=u.useCallback(async($,E)=>{b($,I=>I.filter(N=>String(S(N.userId||N))!==String(E)));try{await ZP({courseId:$,userId:E})}catch(I){throw console.error("Error removing user:",I),await w(),I}},[w,S,b]),A=u.useCallback(async($,E)=>{try{await eM({courseId:$,lessonId:E}),r(I=>I.map(N=>N.id!==$?N:{...N,lessons:N.lessons.map(J=>J.id===E?{...J,views:J.views+1}:J)}))}catch(I){console.error("Error incrementing views:",I)}},[]),O=u.useCallback(async($,E)=>{try{const{liked:I,likes:N}=await tM({courseId:$,lessonId:E});return r(J=>J.map(Y=>String(Y.id||Y._id)===String($)||String(Y.urlSlug||"")===String($)?{...Y,lessons:(Y.lessons||[]).map(H=>String(H.id||H._id)===String(E)||String(H.urlSlug||"")===String(E)?{...H,liked:I,likes:N}:H)}:Y)),{liked:I,likes:N}}catch(I){throw console.error("Error toggling lesson like:",I),I}},[]),T=u.useCallback(async()=>{try{return await rM()}catch($){return console.error("Error fetching liked lessons:",$),[]}},[]),F=u.useCallback($=>{if(!x)return!1;const E=m($);return String(S(E==null?void 0:E.createdBy)||"")===String(S(x)||"")},[x,m,S]),P=u.useCallback($=>{var J;if(!x)return"none";const E=m($),I=String(S(x)||"");if(String(S(E==null?void 0:E.createdBy)||"")===I)return"admin";const N=(J=E==null?void 0:E.members)==null?void 0:J.find(Y=>String(S(Y.userId||Y))===I);return N?N.status:"none"},[x,m,S]),q={courses:t,currentUser:x?{id:S(x),name:x.nickname||x.username,avatar:(x.nickname||x.username||"").substring(0,2).toUpperCase(),isAdmin:!0}:null,createCourse:g,removeCourse:k,addLesson:C,removeLesson:z,getLessonComments:_,addComment:D,addReply:B,enrollInCourse:V,approveUser:R,removeUser:M,incrementViews:A,toggleLessonLike:O,fetchLikedLessons:T,isAdmin:F,isEnrolled:P,loading:o,coursesPage:s,coursesHasMore:c,fetchCourses:w,ensureCoursesLoaded:j,joinCourseRoom:v,leaveCourseRoom:y};return n.jsx(FS.Provider,{value:q,children:e})},ra=()=>{const e=u.useContext(FS);if(!e)throw new Error("useCourses must be used within CoursesProvider");return e},aM=et`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`,lM=l.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 28, 0.62);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (min-width: 720px) {
    align-items: center;
  }
`,cM=l.div`
  width: min(100%, 560px);
  height: min(82vh, 760px);
  background: var(--secondary-color);
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -16px 60px rgba(15, 23, 42, 0.28);
  animation: ${aM} 0.2s ease;

  @media (min-width: 720px) {
    height: min(78vh, 760px);
    border-radius: 24px;
  }
`,dM=l.div`
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`,uM=l.div`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`;l.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: var(--hover-color);
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;const pM=l.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`,my=l.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`,yy=l.div`
  width: ${e=>e.size||38}px;
  height: ${e=>e.size||38}px;
  min-width: ${e=>e.size||38}px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cdf, #0f9d8f);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,vy=l.div`
  flex: 1;
  min-width: 0;
`,by=l.div`
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 12px 14px;
`,wy=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,ky=l.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 6px;
`,jy=l.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Sy=l.div`
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
`,Cy=l.button`
  margin-top: 8px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`,hM=l.div`
  margin-top: 10px;
  margin-left: 8px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
`,fM=l.div`
  border-top: 1px solid var(--border-color);
  padding: 14px 18px 18px;
  background: var(--secondary-color);
`,xM=l.div`
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--hover-color);
  color: var(--text-muted-color);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,gM=l.form`
  display: flex;
  gap: 10px;
  align-items: center;
`,mM=l.input`
  flex: 1;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 16px;
  outline: none;
`,yM=l.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #2d6cdf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${e=>e.disabled?.45:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};
`,mh=l.div`
  padding: 48px 0;
  text-align: center;
  color: var(--text-muted-color);
`,zy=e=>{const t=Date.now()-new Date(e).getTime(),r=Math.floor(t/6e4);if(r<1)return"Hozir";if(r<60)return`${r}d`;const o=Math.floor(r/60);if(o<24)return`${o}s`;const i=Math.floor(o/24);return i<7?`${i}k`:xt(e).format("D MMM")},$y=e=>(e||"U").charAt(0).toUpperCase(),NS=({blog:e,onClose:t,onCommentsCountChange:r})=>{const o=Ie(k=>k.user),[i,s]=u.useState([]),[a,c]=u.useState(1),[d,p]=u.useState(!0),[h,f]=u.useState(!0),[x,S]=u.useState(""),[m,b]=u.useState(!1),[w,j]=u.useState(null),v=u.useRef(null);u.useEffect(()=>{if(!(e!=null&&e._id))return;(async()=>{f(!0);try{const C=await sy(e._id,1,10),_=(C==null?void 0:C.data)||[];s(_),c(1),p(((C==null?void 0:C.totalPages)||1)>1)}finally{f(!1)}})()},[e==null?void 0:e._id]);const y=async()=>{const k=a+1,C=await sy(e._id,k,10);s(_=>[..._,...(C==null?void 0:C.data)||[]]),c(k),p(k<((C==null?void 0:C.totalPages)||1))},g=async k=>{if(k.preventDefault(),!(!x.trim()||m)){b(!0);try{if(w)await rR({blogId:e._id,commentId:w.commentId,content:x.trim(),replyToUser:w.nickname}),s(C=>C.map(_=>_._id===w.commentId?{..._,replies:[..._.replies||[],{_id:Date.now().toString(),user:{_id:o==null?void 0:o._id,username:o==null?void 0:o.username,nickname:o==null?void 0:o.nickname,avatar:o==null?void 0:o.avatar,premiumStatus:o==null?void 0:o.premiumStatus},content:x.trim(),replyToUser:w.nickname,createdAt:new Date().toISOString()}]}:_)),j(null);else{const C=await tR({blogId:e._id,content:x.trim()});s(_=>[{_id:Date.now().toString(),user:{_id:o==null?void 0:o._id,username:o==null?void 0:o.username,nickname:o==null?void 0:o.nickname,avatar:o==null?void 0:o.avatar,premiumStatus:o==null?void 0:o.premiumStatus},content:x.trim(),createdAt:new Date().toISOString(),replies:[]},..._]),r==null||r((C==null?void 0:C.comments)||i.length+1)}S("")}finally{b(!1)}}};return e?n.jsx(lM,{onClick:t,children:n.jsxs(cM,{onClick:k=>k.stopPropagation(),children:[n.jsxs(dM,{children:[n.jsx(uM,{children:"Blog izohlari"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsx(pM,{id:"blog-comments-scroll",children:n.jsx(En,{dataLength:i.length,next:y,hasMore:d,loader:n.jsx(mh,{children:"Yuklanmoqda..."}),scrollableTarget:"blog-comments-scroll",style:{overflow:"visible"},children:h&&i.length===0?n.jsx(mh,{children:"Yuklanmoqda..."}):i.length===0?n.jsx(mh,{children:"Hali izoh yo'q."}):i.map(k=>{var z;const C=k.user||{},_=C.nickname||C.username||"Foydalanuvchi";return n.jsxs(my,{children:[n.jsx(yy,{children:C.avatar?n.jsx("img",{src:C.avatar,alt:_}):$y(_)}),n.jsxs(vy,{children:[n.jsxs(by,{children:[n.jsxs(wy,{children:[n.jsxs(ky,{children:[_,C.premiumStatus==="active"&&n.jsx(zr,{width:14,height:14})]}),n.jsx(jy,{children:zy(k.createdAt)})]}),n.jsx(Sy,{children:k.content})]}),n.jsxs(Cy,{onClick:()=>{j({commentId:k._id,nickname:_}),setTimeout(()=>{var D;return(D=v.current)==null?void 0:D.focus()},50)},children:[n.jsx(bu,{size:13}),"Javob"]}),((z=k.replies)==null?void 0:z.length)>0&&n.jsx(hM,{children:k.replies.map(D=>{const B=D.user||{},V=B.nickname||B.username||"Foydalanuvchi";return n.jsxs(my,{children:[n.jsx(yy,{size:30,children:B.avatar?n.jsx("img",{src:B.avatar,alt:V}):$y(V)}),n.jsxs(vy,{children:[n.jsxs(by,{children:[n.jsxs(wy,{children:[n.jsx(ky,{children:V}),n.jsx(jy,{children:zy(D.createdAt)})]}),n.jsxs(Sy,{children:[D.replyToUser?`@${D.replyToUser} `:"",D.content]})]}),n.jsxs(Cy,{onClick:()=>{j({commentId:k._id,nickname:V}),setTimeout(()=>{var R;return(R=v.current)==null?void 0:R.focus()},50)},children:[n.jsx(bu,{size:13}),"Javob"]})]})]},D._id)})})]})]},k._id)})})}),n.jsxs(fM,{children:[w&&n.jsxs(xM,{children:[n.jsxs("span",{children:["@",w.nickname," ga javob"]}),n.jsx(Je,{onClick:()=>j(null),children:n.jsx(nt,{size:14})})]}),n.jsxs(gM,{onSubmit:g,children:[n.jsx(mM,{ref:v,value:x,onChange:k=>S(k.target.value),placeholder:w?`@${w.nickname} ga yozing`:"Izoh yozing"}),n.jsx(yM,{type:"submit",disabled:!x.trim()||m,children:n.jsx(np,{size:16})})]})]})]})}):null},vM=l.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`,bM=l.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 84%, transparent),
    transparent
  );
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }
`,wM=l.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
  }
`;l.button`
  margin-left: auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #2563eb, #0f9d8f);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;const kM=l.div`
  flex: 1;
  min-height: 0;
  display: flex;
`,jM=l.div`
  flex: 1;
  width: 100%;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
`,SM=l.div`
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 88%, transparent) 0%,
    color-mix(in srgb, var(--background-color) 76%, transparent) 100%
  );
`,CM=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`,zM=l.button`
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
`,$M=l.div`
  min-height: 340px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--text-muted-color);
  text-align: center;
`,_M=l.button`
  width: 100%;
  border: none;
  background: ${e=>e.active?"linear-gradient(135deg, rgba(37,99,235,0.12), rgba(15,157,143,0.1))":"transparent"};
  border-bottom: 1px solid var(--border-color);
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
`,TM=l.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary-color) 14%, transparent),
    color-mix(in srgb, var(--secondary-color) 82%, black 18%)
  );
  margin-bottom: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,EM=l.h3`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`,RM=l.p`
  margin: 0 0 10px;
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.5;
`,_y=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 11px;
`,Ty=l.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 18px 18px 40px;
`,PM=l.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.18);
`,MM=l.h1`
  margin: 0 0 10px;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.04;
  color: var(--text-color);
`,IM=l.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary-color);
`,AM=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px;
`,OM=l.span`
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #60a5fa;
  font-size: 12px;
  font-weight: 700;
`,LM=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 18px 0 30px;
`,qS=l.button`
  border: 1px solid
    ${e=>e.active?e.activeColor||"#ef4444":"var(--border-color)"};
  background: ${e=>e.active?"rgba(239, 68, 68, 0.08)":"rgba(255,255,255,0.04)"};
  color: ${e=>e.active?e.activeColor||"#ef4444":"var(--text-secondary-color)"};
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`,Lc=l(qS)`
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
`,BM=l.div`
  height: 1px;
  background: var(--border-color);
  margin: 18px 0 28px;
`,ro=l.div`
  height: ${e=>e.height||"18px"};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.08),
    rgba(148, 163, 184, 0.18),
    rgba(148, 163, 184, 0.08)
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite linear;
  margin-bottom: 12px;

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`,DM=(e,t)=>t||String((e==null?void 0:e._id)||(e==null?void 0:e.id)||""),FM=({profileUser:e,profileUserId:t,isOwnProfile:r,onBack:o,onCountChange:i})=>{var P,q,$;const s=Ie(E=>E.user),[a,c]=u.useState([]),[d,p]=u.useState(!0),[h,f]=u.useState(null),[x,S]=u.useState(""),[m,b]=u.useState(!1),[w,j]=u.useState(null),[v,y]=u.useState(!1),[g,k]=u.useState(null),[C,_]=u.useState(!1),[z,D]=u.useState(!1),B=u.useRef(new Set),V=u.useMemo(()=>DM(e,t),[e,t]),R=(E,I)=>{c(N=>N.map(J=>J._id===E?{...J,...I}:J)),f(N=>N&&N._id===E?{...N,...I}:N)},M=async()=>{if(V){p(!0);try{const E=await ES(V);if(c(E||[]),i==null||i((E==null?void 0:E.length)||0),h!=null&&h._id){const I=(E==null?void 0:E.find(N=>N._id===h._id))||null;f(I),D(!!I),I||S("")}else D(!1);E!=null&&E.length||(f(null),S(""),D(!1))}catch{be.error("Bloglarni yuklab bo'lmadi")}finally{p(!1)}}};u.useEffect(()=>{M()},[V]),u.useEffect(()=>{if(!(h!=null&&h._id))return;(async()=>{b(!0);try{const[I,N]=await Promise.all([RS(h._id),PS(h._id)]);if(R(I._id,I),f(I),S((N==null?void 0:N.content)||""),!B.current.has(h._id)){B.current.add(h._id);const J=await AS(h._id);R(h._id,{views:(J==null?void 0:J.views)||0})}}catch{be.error("Blog ochilmadi")}finally{b(!1)}})()},[h==null?void 0:h._id]);const A=async E=>{_(!0);try{if(g!=null&&g._id){const I=await ZE(g._id,E);R(I._id,I),f(I),S(E.markdown),be.success("Blog yangilandi")}else{const I=await MS(E);c(N=>{const J=[I,...N];return i==null||i(J.length),J}),f(I),S(E.markdown),D(!0),be.success("Blog yaratildi")}y(!1),k(null)}catch{be.error("Blogni saqlab bo'lmadi")}finally{_(!1)}},O=async()=>{if(h!=null&&h._id&&window.confirm("Blog o'chirilsinmi?"))try{await eR(h._id);const E=a.filter(I=>I._id!==h._id);c(E),f(null),S(""),D(!1),i==null||i(E.length),be.success("Blog o'chirildi")}catch{be.error("Blogni o'chirib bo'lmadi")}},T=async E=>{try{const I=await IS(E);R(E,I)}catch{be.error("Like yuborilmadi")}},F=g&&g._id?{...g,markdown:(h==null?void 0:h._id)===g._id?x:""}:null;return n.jsxs(vM,{children:[!z&&n.jsxs(bM,{children:[n.jsx(wM,{onClick:o,children:n.jsx(nr,{size:20})}),n.jsx($n,{size:24,color:"#60a5fa"}),n.jsx("h2",{children:"Bloglar"}),r&&n.jsx(Je,{onClick:()=>{k(null),y(!0)},title:"Yangi blog",children:n.jsx(Et,{size:18})})]}),n.jsxs(kM,{children:[!z&&n.jsx(jM,{children:d?n.jsxs("div",{style:{padding:"20px"},children:[n.jsx(ro,{height:"190px"}),n.jsx(ro,{height:"24px"}),n.jsx(ro,{height:"16px"}),n.jsx(ro,{height:"16px"})]}):a.length===0?n.jsxs($M,{children:[n.jsx($n,{size:30}),n.jsx("span",{children:r?"Hali blog yo'q. Birinchi maqolangizni yarating.":"Bu foydalanuvchining hali blogi yo'q."})]}):a.map(E=>n.jsxs(_M,{active:(h==null?void 0:h._id)===E._id,onClick:()=>{f(E),D(!0)},children:[n.jsx(TM,{children:E.coverImage?n.jsx("img",{src:E.coverImage,alt:E.title}):null}),n.jsx(EM,{children:E.title}),n.jsx(RM,{children:E.excerpt||"Tavsif yo'q"}),n.jsxs(_y,{children:[n.jsx("span",{children:xt(E.publishedAt||E.createdAt).format("DD MMM YYYY")}),n.jsxs("span",{children:[E.likes," like"]}),n.jsxs("span",{children:[E.comments," izoh"]}),n.jsxs("span",{children:[E.views," ko'rish"]})]})]},E._id))}),z&&h&&n.jsx(SM,{children:m?n.jsxs(Ty,{children:[n.jsx(ro,{height:"320px"}),n.jsx(ro,{height:"56px"}),n.jsx(ro,{height:"20px"}),n.jsx(ro,{height:"20px"})]}):n.jsxs(Ty,{children:[n.jsx(CM,{children:n.jsxs(zM,{onClick:()=>{D(!1),f(null),S("")},children:[n.jsx(nr,{size:16}),"Bloglar ro'yxati"]})}),h.coverImage?n.jsx(PM,{src:h.coverImage,alt:h.title}):null,n.jsx(MM,{children:h.title}),h.excerpt?n.jsx(IM,{children:h.excerpt}):null,((P=h.tags)==null?void 0:P.length)>0&&n.jsx(AM,{children:h.tags.map(E=>n.jsxs(OM,{children:["#",E]},E))}),n.jsxs(_y,{children:[n.jsx("span",{children:xt(h.publishedAt||h.createdAt).format("DD MMMM YYYY · HH:mm")}),n.jsx("span",{children:((q=h.author)==null?void 0:q.nickname)||(($=h.author)==null?void 0:$.username)||(s==null?void 0:s.nickname)})]}),n.jsxs(LM,{children:[n.jsxs(qS,{active:h.liked,activeColor:"#ef4444",onClick:()=>T(h._id),children:[n.jsx(Mi,{size:16,fill:h.liked?"#ef4444":"none"}),h.likes]}),n.jsxs(Lc,{onClick:()=>j(h),children:[n.jsx(ep,{size:16}),h.comments]}),n.jsxs(Lc,{as:"div",children:[n.jsx(_n,{size:16}),h.views]}),r&&n.jsxs(Lc,{onClick:()=>{k({...h,markdown:x}),y(!0)},children:[n.jsx(Y3,{size:16}),"Tahrirlash"]}),r&&n.jsxs(Lc,{onClick:O,children:[n.jsx(lr,{size:16}),"O'chirish"]})]}),n.jsx(BM,{}),n.jsx(km,{content:x})]})})]}),n.jsx(LS,{isOpen:v,onClose:()=>{y(!1),k(null)},onSubmit:A,initialBlog:F,saving:C}),w&&n.jsx(NS,{blog:w,onClose:()=>j(null),onCommentsCountChange:E=>{R(w._id,{comments:E})}})]})},HS=u.createContext(),NM=()=>{const e=u.useContext(HS);if(!e)throw new Error("useTheme must be used within a ThemeProvider");return e},qM=({children:e})=>{const[t,r]=u.useState(()=>localStorage.getItem("theme")||"dark");u.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},[t]);const o=a=>{r(a)},i={dark:{name:"Dark",colors:{primary:"#5865f2",background:"#36393f",secondary:"#2f3136",tertiary:"#202225",text:"#dcddde",textSecondary:"#b9bbbe",textMuted:"#72767d",border:"#40444b",hover:"rgba(255, 255, 255, 0.1)",active:"rgba(88, 101, 242, 0.1)",success:"#43b581",warning:"#faa61a",danger:"#f04747",input:"#40444b",placeholder:"#72767d"}},light:{name:"Light",colors:{primary:"#5865f2",background:"#ffffff",secondary:"#f2f3f5",tertiary:"#e3e5e8",text:"#2e3338",textSecondary:"#4f5660",textMuted:"#747f8d",border:"#e3e5e8",hover:"rgba(0, 0, 0, 0.05)",active:"rgba(88, 101, 242, 0.1)",success:"#3ba55c",warning:"#faa61a",danger:"#ed4245",input:"#ebedef",placeholder:"#747f8d"}}},s=i[t]||i.dark;return n.jsx(HS.Provider,{value:{theme:t,currentTheme:s,themes:i,toggleTheme:o},children:e})},HM=l.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`,UM=l.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }
`,YM=l.div`
  padding: 16px 18px 22px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`,VM=l.div`
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);

  h3 {
    margin: 0 0 6px;
    color: var(--text-color);
    font-size: 18px;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: var(--text-secondary-color);
    line-height: 1.5;
    max-width: 620px;
    font-size: 12px;
  }
`,Zo=l.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`,ei=l.div`
  padding: 12px 14px 0;

  h4 {
    margin: 0 0 4px;
    color: var(--text-color);
    font-size: 14px;
    font-weight: 700;
  }

  p {
    margin: 0 0 12px;
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
  }
`,ba=l.div`
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 320px);
  gap: 12px;

  & > :last-child {
    width: 100%;
    min-width: 0;
    justify-self: end;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    & > :last-child {
      justify-self: stretch;
    }
  }
`,wa=l.div`
  min-width: 0;

  strong {
    display: block;
    color: var(--text-color);
    font-size: 13px;
    margin-bottom: 3px;
  }

  span {
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
  }
`,Ey=l.select`
  width: 100%;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 12px;
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`,Ry=l.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  background: ${e=>e.$active?"rgba(250, 166, 26, 0.12)":"rgba(88,101,242,0.08)"};
  color: ${e=>e.$active?"#faa61a":"var(--primary-color)"};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`,WM=l.div`
  display: flex;
  gap: 8px;
  width: 100%;
  min-width: 0;

  > * {
    min-width: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,GM=l.input`
  flex: 1;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 12px;
  outline: none;
  min-width: 0;
`,ka=l.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: none;
  background: ${e=>e.$secondary?"var(--input-color)":"var(--primary-color)"};
  color: ${e=>e.$secondary?"var(--text-color)":"white"};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${e=>e.disabled?.55:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};
  white-space: nowrap;
`,QM=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
`,Py=l.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid
    ${e=>e.$premium?"rgba(250, 166, 26, 0.35)":"var(--border-color)"};
  background: ${e=>e.$premium?"linear-gradient(180deg, rgba(250,166,26,0.08), rgba(255,255,255,0.02))":"var(--secondary-color)"};
  display: flex;
  flex-direction: column;
  gap: 8px;
`,My=l.div`
  color: ${e=>e.$premium?"#faa61a":"var(--text-color)"};
  font-size: 14px;
  font-weight: 700;
`,KM=l.div`
  color: var(--text-color);
  font-size: 22px;
  font-weight: 800;
`,Bc=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`,Iy=l.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);

  h4 {
    margin: 0 0 6px;
    color: var(--text-color);
    font-size: 14px;
    font-weight: 700;
  }

  p {
    margin: 0 0 12px;
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
  }
`,yh=l.div`
  padding: 18px 14px;
  border-radius: 12px;
  border: 1px dashed var(--border-color);
  color: var(--text-muted-color);
  text-align: center;
  line-height: 1.5;
  font-size: 12px;
`,JM=l.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,vh=l.button`
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  cursor: pointer;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,bh=l.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
`,wh=l.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,XM=[{value:"uz-UZ",label:"O'zbekcha"},{value:"en-US",label:"English (US)"},{value:"ru-RU",label:"Русский"}],ZM=[{value:"dark",label:"Dark"},{value:"light",label:"Light"}],Ay={appearance:{icon:h4,title:"Theme",description:"Interfeys ko'rinishini boshqaring."},language:{icon:tc,title:"Language",description:"Til va region parametrlarini saqlang."},premium:{icon:Vs,title:"Jamm Premium",description:"Premium holati, promo-kod va obuna rejalarini boshqaring."},support:{icon:c4,title:"Qo'llab-quvvatlash",description:"Muammo yoki savollar uchun tez aloqa nuqtalari."},favorites:{icon:Mi,title:"Sevimlilarim",description:"Saqlangan kontentlar uchun alohida bo'lim."}},e7=({section:e,currentUser:t})=>{const{theme:r,toggleTheme:o}=NM(),{getUserByUsername:i,createChat:s,fetchChats:a}=Wo(),{fetchLikedPosts:c}=fp(),{fetchLikedLessons:d}=ra(),p=Qt(),h=Ie(Y=>Y.user),f=Ie(Y=>Y.token),x=Ie(Y=>Y.setAuth),[S,m]=u.useState(()=>localStorage.getItem("language")||"uz-UZ"),[b,w]=u.useState([]),[j,v]=u.useState(!1),[y,g]=u.useState(""),[k,C]=u.useState(!1),[_,z]=u.useState([]),[D,B]=u.useState([]),[V,R]=u.useState([]),[M,A]=u.useState(!1),O=u.useMemo(()=>Ay[e]||Ay.appearance,[e]),T=O.icon;u.useEffect(()=>{e==="language"&&localStorage.setItem("language",S)},[e,S]),u.useEffect(()=>{if(e!=="premium")return;(async()=>{v(!0);try{const{data:L}=await fe.get("/premium/plans");w(Array.isArray(L)?L:[])}catch{w([])}finally{v(!1)}})()},[e]),u.useEffect(()=>{if(e!=="favorites")return;(async()=>{A(!0);try{const[L,H,Q]=await Promise.all([c(),XE(),d()]);z(Array.isArray(L)?L:[]),B(Array.isArray(H)?H:[]),R(Array.isArray(Q)?Q:[])}finally{A(!1)}})()},[d,c,e]);const F=async()=>{const{data:Y}=await fe.get("/users/me");x({...h||{},...Y},f)},P=async Y=>{try{const L=await i(Y);if(!L)return;const H=await s({isGroup:!1,memberIds:[L._id||L.id]});await a(),p(`/groups/${H.urlSlug||H.jammId||H._id||H.id}`)}catch{be.error("Chatni ochib bo'lmadi")}},q=async()=>{var Y,L;if(y.trim()){C(!0);try{await fe.post("/premium/redeem",{code:y.trim()}),await F(),g(""),be.success("Premium faollashtirildi")}catch(H){be.error(((L=(Y=H==null?void 0:H.response)==null?void 0:Y.data)==null?void 0:L.message)||"Promo-kod yaroqsiz")}finally{C(!1)}}},$=()=>n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Ko'rinish"}),n.jsx("p",{children:"Hozircha faqat asosiy mavzu almashinuvi mavjud."})]}),n.jsxs(ba,{children:[n.jsxs(wa,{children:[n.jsx("strong",{children:"Theme"}),n.jsx("span",{children:"Jamm interfeysi dark yoki light ko'rinishda ishlaydi."})]}),n.jsx(Ey,{value:r,onChange:Y=>o(Y.target.value),children:ZM.map(Y=>n.jsx("option",{value:Y.value,children:Y.label},Y.value))})]})]}),E=()=>n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Til va region"}),n.jsx("p",{children:"Tanlangan qiymatlar local storage’da saqlanadi."})]}),n.jsxs(ba,{children:[n.jsxs(wa,{children:[n.jsx("strong",{children:"Language"}),n.jsx("span",{children:"Asosiy interfeys tili uchun tayyor parametr."})]}),n.jsx(Ey,{value:S,onChange:Y=>m(Y.target.value),children:XM.map(Y=>n.jsx("option",{value:Y.value,children:Y.label},Y.value))})]}),n.jsxs(ba,{children:[n.jsxs(wa,{children:[n.jsx("strong",{children:"Region"}),n.jsx("span",{children:"Hozircha global rejim ishlatiladi."})]}),n.jsx(Ry,{children:"Global"})]})]}),I=()=>n.jsxs(n.Fragment,{children:[n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Premium holati"}),n.jsx("p",{children:"Joriy obuna va promo-kod orqali faollashtirish."})]}),n.jsxs(ba,{children:[n.jsxs(wa,{children:[n.jsx("strong",{children:"Status"}),n.jsx("span",{children:"Profilingizdagi premium holati."})]}),n.jsxs(Ry,{$active:(t==null?void 0:t.premiumStatus)==="active",children:[n.jsx(om,{size:14}),(t==null?void 0:t.premiumStatus)==="active"?"Aktiv":"Oddiy hisob"]})]}),n.jsxs(ba,{children:[n.jsxs(wa,{children:[n.jsx("strong",{children:"Promo-kod"}),n.jsx("span",{children:"Premium’ni tez yoqish uchun kod kiriting."})]}),n.jsxs(WM,{children:[n.jsx(GM,{value:y,onChange:Y=>g(Y.target.value),placeholder:"Kodni kiriting"}),n.jsxs(ka,{disabled:k||!y.trim(),onClick:q,children:[n.jsx(op,{size:14}),k?"Tekshirilmoqda...":"Faollashtirish"]})]})]})]}),n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Obuna rejalari"}),n.jsx("p",{children:"Qo'shimcha imkoniyatlar uchun premium rejalari."})]}),n.jsx("div",{style:{padding:"0 14px 14px"},children:n.jsxs(QM,{children:[b.map(Y=>n.jsxs(Py,{$premium:!0,children:[n.jsx(My,{$premium:!0,children:Y.name}),n.jsxs(KM,{children:["$",Y.price]}),n.jsxs("div",{style:{color:"var(--text-muted-color)",fontSize:12},children:[Y.durationInDays," kun"]}),n.jsx(ka,{onClick:()=>P("premium"),children:"Premium bilan bog'lanish"})]},Y._id)),!b.length&&!j&&n.jsxs(Py,{children:[n.jsx(My,{children:"Premium"}),n.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:12},children:"Rejalar vaqtincha ko'rsatilmayapti."}),n.jsx(ka,{onClick:()=>P("premium"),children:"Aloqa"})]})]})})]})]}),N=()=>n.jsxs(Bc,{children:[n.jsxs(Iy,{children:[n.jsx("h4",{children:"Premium support"}),n.jsx("p",{children:"Obuna, promo-kod yoki limitlar bo'yicha savollar uchun."}),n.jsx(ka,{onClick:()=>P("premium"),children:"@premium ga yozish"})]}),n.jsxs(Iy,{children:[n.jsx("h4",{children:"Jamm support"}),n.jsx("p",{children:"Umumiy texnik muammo yoki account masalalari uchun."}),n.jsx(ka,{$secondary:!0,onClick:()=>P("jamm"),children:"@jamm ga yozish"})]})]}),J=()=>n.jsxs(JM,{children:[n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Like bosgan darslar"}),n.jsx("p",{children:"Sevimli lessonlar shu yerda jamlanadi."})]}),n.jsx("div",{style:{padding:"0 14px 14px"},children:V.length?n.jsx(Bc,{children:V.map(Y=>{var L;return n.jsxs(vh,{onClick:()=>{var H,Q;return p(`/courses/${((H=Y.course)==null?void 0:H.urlSlug)||((Q=Y.course)==null?void 0:Q._id)}/${Y.urlSlug||Y._id}`)},children:[n.jsx(bh,{children:Y.title}),n.jsxs(wh,{children:[((L=Y.course)==null?void 0:L.name)||"Kurs"," · ",Y.likes||0," like · ",Y.views||0," ko'rish"]})]},Y._id)})}):n.jsx(yh,{children:M?"Yuklanmoqda...":"Hozircha like bosilgan darslar yo'q."})})]}),n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Like bosgan gurunglar"}),n.jsx("p",{children:"Yoqtirgan gurunglaringiz ro'yxati."})]}),n.jsx("div",{style:{padding:"0 14px 14px"},children:_.length?n.jsx(Bc,{children:_.map(Y=>{var L,H;return n.jsxs(vh,{onClick:()=>p("/feed"),children:[n.jsx(bh,{children:((L=Y.author)==null?void 0:L.nickname)||((H=Y.author)==null?void 0:H.username)||"Muallif"}),n.jsx(wh,{children:String(Y.content||"").slice(0,160)})]},Y._id)})}):n.jsx(yh,{children:M?"Yuklanmoqda...":"Hozircha like bosilgan gurunglar yo'q."})})]}),n.jsxs(Zo,{children:[n.jsxs(ei,{children:[n.jsx("h4",{children:"Like bosgan bloglar"}),n.jsx("p",{children:"Yoqtirgan bloglaringiz shu yerda turadi."})]}),n.jsx("div",{style:{padding:"0 14px 14px"},children:D.length?n.jsx(Bc,{children:D.map(Y=>{var L,H;return n.jsxs(vh,{onClick:()=>p(`/blogs/${Y.slug||Y._id}`),children:[n.jsx(bh,{children:Y.title}),n.jsxs(wh,{children:[((L=Y.author)==null?void 0:L.nickname)||((H=Y.author)==null?void 0:H.username)||"Muallif"," · ",Y.likes||0," like"]})]},Y._id)})}):n.jsx(yh,{children:M?"Yuklanmoqda...":"Hozircha like bosilgan bloglar yo'q."})})]})]});return n.jsxs(HM,{children:[n.jsxs(UM,{children:[n.jsx(T,{size:22,color:"var(--primary-color)"}),n.jsx("h2",{children:O.title})]}),n.jsxs(YM,{children:[n.jsxs(VM,{children:[n.jsx("h3",{children:O.title}),n.jsx("p",{children:O.description})]}),e==="appearance"&&$(),e==="language"&&E(),e==="premium"&&I(),e==="support"&&N(),e==="favorites"&&J()]})]})},t7=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,r7=et`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,kh=(e="")=>{const r=String(e||"").trim().replace(/\D/g,"");if(!r.length)return"+998";let o=r;o.startsWith("998")&&(o=o.slice(3)),o=o.slice(0,9);let i="+998";return o.length>0&&(i+=` ${o.slice(0,2)}`),o.length>2&&(i+=` ${o.slice(2,5)}`),o.length>5&&(i+=` ${o.slice(5,7)}`),o.length>7&&(i+=` ${o.slice(7,9)}`),i},n7=l.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${t7} 0.18s ease-out;
`,o7=l.div`
  width: min(100%, 560px);
  max-height: min(88vh, 760px);
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${r7} 0.22s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 100vh;
    height: 100%;
    border-radius: 0;
  }
`,i7=l.div`
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    color: var(--text-color);
    font-size: 18px;
    font-weight: 800;
  }
`;l.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;const s7=l.div`
  padding: 22px 20px 24px;
  overflow-y: auto;
`,US=l.button`
  position: relative;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  margin-bottom: 22px;
`,a7=l.div`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 800;
  color: white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,l7=l.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${US}:hover & {
    opacity: 1;
  }
`,Dc=l.div`
  margin-bottom: 18px;
`,Fc=l.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Nc=l.input`
  width: 100%;
  box-sizing: border-box;
  background: var(--input-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`,c7=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,d7=l.button`
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  background: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${e=>e.disabled?.55:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};

  @media (max-width: 768px) {
    width: 100%;
  }
`,Oy=l.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${e=>e.$error?"#f04747":"#43b581"};
`,ja=l.div`
  height: ${e=>e.$h||"16px"};
  width: ${e=>e.$w||"100%"};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.08),
    rgba(148, 163, 184, 0.18),
    rgba(148, 163, 184, 0.08)
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  margin-bottom: ${e=>e.$mb||"12px"};

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`,u7=({isOpen:e,onClose:t})=>{var y,g;const r=Ie(k=>k.user),o=Ie(k=>k.token),i=Ie(k=>k.setAuth),[s,a]=u.useState({nickname:"",username:"",phone:"+998",avatar:"",bio:"",premiumStatus:"none",premiumExpiresAt:null}),[c,d]=u.useState(!1),[p,h]=u.useState(!1),[f,x]=u.useState(null),[S,m]=u.useState(!1),b=u.useRef(null);if(u.useEffect(()=>{if(!e)return;(async()=>{d(!0);try{const{data:C}=await fe.get("/users/me");a({nickname:C.nickname||"",username:C.username||"",phone:kh(C.phone),avatar:C.avatar||"",bio:C.bio||"",premiumStatus:C.premiumStatus||"none",premiumExpiresAt:C.premiumExpiresAt}),i({...r||{},...C},o)}catch{a({nickname:(r==null?void 0:r.nickname)||"",username:(r==null?void 0:r.username)||"",phone:kh(r==null?void 0:r.phone),avatar:(r==null?void 0:r.avatar)||"",bio:(r==null?void 0:r.bio)||"",premiumStatus:(r==null?void 0:r.premiumStatus)||"none",premiumExpiresAt:(r==null?void 0:r.premiumExpiresAt)||null})}finally{d(!1)}})()},[e]),!e)return null;const w=()=>s.nickname&&(s.nickname.length<3||s.nickname.length>30)?"Nickname 3 tadan 30 tagacha belgi bo'lishi kerak":s.username&&!/^[a-zA-Z0-9]{8,30}$/.test(s.username)?"Username kamida 8 ta harf va raqamdan iborat bo'lishi kerak":s.bio&&s.bio.length>30?"Haqida (Bio) ko'pi bilan 30 ta belgi bo'lishi kerak":s.phone&&!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(s.phone)?"Telefon raqam '+998 XX XXX XX XX' formatida bo'lishi kerak":null,j=async()=>{var C,_,z,D;const k=w();if(k){x(k),setTimeout(()=>x(null),3e3);return}h(!0),x(null);try{const{premiumStatus:B,premiumExpiresAt:V,phone:R,...M}=s,{data:A}=await fe.patch("/users/me",{...M,phone:(R||"").replace(/\s/g,"")});i({...r||{},...A},o),a(O=>({...O,...A})),x("ok"),setTimeout(()=>{x(null),t==null||t()},900)}catch(B){const V=Array.isArray((_=(C=B==null?void 0:B.response)==null?void 0:C.data)==null?void 0:_.message)?B.response.data.message[0]:((D=(z=B==null?void 0:B.response)==null?void 0:z.data)==null?void 0:D.message)||"Tarmoq xatosi yuz berdi";x(V),setTimeout(()=>x(null),3e3)}finally{h(!1)}},v=async k=>{var z;const C=(z=k.target.files)==null?void 0:z[0];if(!C)return;if(C.size>2*1024*1024){be.error("Fayl hajmi juda katta (maksimum 2MB)");return}const _=new FormData;_.append("file",C),m(!0);try{const{data:D}=await fe.post("/users/avatar",_);a(B=>({...B,avatar:D.avatar})),i({...r||{},...D},o),be.success("Avatar yangilandi")}catch{be.error("Avatar yuklashda xatolik")}finally{m(!1)}};return n.jsx(n7,{onClick:t,children:n.jsxs(o7,{onClick:k=>k.stopPropagation(),children:[n.jsxs(i7,{children:[n.jsx("h3",{children:"Profilni tahrirlash"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsx(s7,{children:c?n.jsxs(n.Fragment,{children:[n.jsx(ja,{$h:"92px",$w:"92px",$mb:"22px"}),n.jsx(ja,{}),n.jsx(ja,{}),n.jsx(ja,{$h:"64px"}),n.jsx(ja,{})]}):n.jsxs(n.Fragment,{children:[n.jsx("input",{type:"file",ref:b,hidden:!0,accept:"image/*",onChange:v}),n.jsxs(US,{type:"button",onClick:()=>{var k;return(k=b.current)==null?void 0:k.click()},title:"Avatarni o'zgartirish",children:[n.jsx(a7,{children:S?n.jsx(Ii,{size:30,style:{animation:"spin 1s linear infinite"}}):s.avatar?n.jsx("img",{src:s.avatar,alt:"avatar"}):(s.nickname||s.username||"?").charAt(0).toUpperCase()}),n.jsx(l7,{children:n.jsx(kx,{size:20})})]}),n.jsxs(Dc,{children:[n.jsxs(Fc,{children:["Nickname",s.premiumStatus==="active"&&n.jsx(zr,{width:14,height:14})]}),n.jsx(Nc,{value:s.nickname,onChange:k=>a(C=>({...C,nickname:k.target.value.slice(0,Pe.nicknameChars)})),placeholder:"Nickname",maxLength:Pe.nicknameChars})]}),n.jsxs(Dc,{children:[n.jsx(Fc,{children:"Username"}),n.jsx(Nc,{value:s.username,onChange:k=>a(C=>({...C,username:k.target.value.toLowerCase().slice(0,Pe.usernameChars)})),placeholder:"username",maxLength:Pe.usernameChars})]}),n.jsxs(Dc,{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[n.jsx(Fc,{children:"Haqida (Bio)"}),n.jsxs("span",{style:{fontSize:"11px",color:(((y=s.bio)==null?void 0:y.length)||0)>Pe.bioChars?"#f04747":"var(--text-muted-color)"},children:[((g=s.bio)==null?void 0:g.length)||0,"/",Pe.bioChars]})]}),n.jsx(Nc,{as:"textarea",rows:2,value:s.bio||"",onChange:k=>a(C=>({...C,bio:k.target.value.slice(0,Pe.bioChars)})),placeholder:"O'zingiz haqingizda qisqacha yozing...",maxLength:Pe.bioChars,style:{resize:"none",minHeight:76,paddingTop:12}})]}),n.jsxs(Dc,{children:[n.jsx(Fc,{children:"Telefon raqam"}),n.jsx(Nc,{value:s.phone||"+998",onChange:k=>{a(C=>({...C,phone:kh(k.target.value)}))},placeholder:"+998 90 000 00 00"})]}),n.jsxs(c7,{children:[n.jsxs(d7,{onClick:j,disabled:p||S,children:[p?n.jsx(Ii,{size:14}):n.jsx(tn,{size:14}),p?"Saqlanmoqda...":"Saqlash"]}),f==="ok"&&n.jsxs(Oy,{children:[n.jsx(tn,{size:13}),"Muvaffaqiyatli saqlandi"]}),f&&f!=="ok"&&n.jsxs(Oy,{$error:!0,children:[n.jsx(Xu,{size:13}),f]})]})]})})]})})},p7=l.div`
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
`,h7=l.div`
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
`,f7=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,x7=l.h2`
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
`;l.button`
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
`;const g7=l.div`
  color: #b9bbbe;
  margin-bottom: 24px;
  line-height: 1.5;
  font-size: 15px;
`,m7=l.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,Ly=l.button`
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
`,Di=({isOpen:e,onClose:t,title:r,description:o,confirmText:i="Tasdiqlash",cancelText:s="Bekor qilish",onConfirm:a,isDanger:c=!1})=>e?n.jsx(p7,{onClick:t,children:n.jsxs(h7,{onClick:d=>d.stopPropagation(),children:[n.jsxs(f7,{children:[n.jsxs(x7,{isDanger:c,children:[c&&n.jsx(t4,{size:24}),r]}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsx(g7,{children:o}),n.jsxs(m7,{children:[n.jsx(Ly,{onClick:t,children:s}),n.jsx(Ly,{variant:c?"danger":"primary",onClick:()=>{a()},children:i})]})]})}):null,By=l.button`
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
`,cc=et`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;et`from { background-position: -200% 0; } to { background-position: 200% 0; }`;const y7=l.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-color);
`,v7=l.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  animation: ${cc} 0.3s ease;

  /* hide scrollbar visually */
  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`,YS=l.div`
  position: relative;
  height: 140px;
  background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #9b59b6 100%);
  flex-shrink: 0;
  overflow: hidden;
`,b7=l.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.3) 100%
  );
`,w7=l.button`
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

  ${YS}:hover & {
    opacity: 1;
  }
`,k7=l.button`
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
`,j7=l.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 20px;
  flex-shrink: 0;
  z-index: 2;
`,S7=l.div`
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
`,C7=l.div`
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
`,z7=l.div`
  padding: 12px 20px 0;
  animation: ${cc} 0.35s ease 0.05s both;
`,$7=l.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`,_7=l.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0 2px;
  line-height: 1.2;
`,T7=l.div`
  font-size: 13px;
  color: var(--text-muted-color);
  margin-bottom: 10px;
`,E7=l.p`
  font-size: 13px;
  color: var(--text-secondary-color);
  line-height: 1.55;
  margin: 0 0 14px;
`,R7=l.div`
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
`,P7=l.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin: 0 20px 20px;
  padding: 16px 0;
  animation: ${cc} 0.35s ease 0.1s both;
`,M7=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-right: 1px solid var(--border-color);

  &:last-child {
    border-right: none;
  }
`,I7=l.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1;
`,A7=l.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted-color);
`,O7=l.div`
  display: flex;
  gap: 10px;
  padding: 0 20px 16px;
  animation: ${cc} 0.35s ease 0.15s both;
`;l.button`
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
`;const L7=l.button`
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
`,B7=l.button`
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
`;l.button`
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
`;const D7=l.div`
  height: 24px;
`,Dy=l.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  background: var(--secondary-color, #2f3136);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  animation: ${cc} 0.35s ease 0.2s both;
`,no=l.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 16px;
  background: ${e=>e.active?"var(--hover-color)":"transparent"};
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  min-height: 56px;

  &:hover {
    background: var(--hover-color);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 60px;
    right: 0;
    height: 1px;
    background: var(--border-color);
    opacity: 0.3;
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
    flex-shrink: 0;
  }

  .label {
    flex: 1;
    text-align: left;
    white-space: normal;
    line-height: 1.35;
    padding-top: 4px;
  }

  .chevron {
    color: var(--text-muted-color);
    opacity: 0.5;
    flex-shrink: 0;
    margin-top: 8px;
  }
`,F7=l.div`
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
`,Fy=l.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }
`,Ny=l.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`,qy=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
  font-size: 13px;
  gap: 10px;
  margin-top: 48px;
`,Hy=l.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`,N7=l.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`,q7=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,H7=l.div`
  width: 34px;
  height: 34px;
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
`,U7=l.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0 0 2px;
  }
  span {
    font-size: 11px;
    color: var(--text-muted-color);
  }
`,Y7=l.div`
  font-size: 13px;
  line-height: 1.55;
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
`,V7=l.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
`,Sa=l.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${e=>e.active?e.activeColor||"#ed4245":"var(--text-muted-color)"};
  font-size: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    color: ${e=>e.activeColor||"var(--text-secondary-color)"};
    transform: scale(1.1);
  }
`,W7=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;l.button`
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
`;const G7=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`,Q7=l.button`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--secondary-color);
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition:
    transform 0.16s ease,
    border-color 0.16s ease,
    background-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--text-muted-color);
  }
`,K7=l.div`
  height: 108px;
  background: var(--primary-color);
  background-image: ${e=>e.$image?`url(${e.$image})`:"none"};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 34px;
  font-weight: 800;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`,J7=l.div`
  padding: 10px 12px 12px;
`,X7=l.h4`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Z7=l.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,eI=({profileUserId:e})=>{var ie;const t=Ie(G=>G.user),{userPosts:r,fetchUserPosts:o,createPost:i,editPost:s,deletePost:a,likePost:c,getPublicProfile:d,toggleFollow:p}=fp(),{courses:h}=ra(),f=Qt(),x=window.innerWidth<=768,[S,m]=u.useState(()=>{const G=sessionStorage.getItem("profile_initial_tab");return G?(sessionStorage.removeItem("profile_initial_tab"),G):x?null:"groups"}),[b,w]=u.useState(!1),[j,v]=u.useState(!1),[y,g]=u.useState(null),[k,C]=u.useState(!1),[_,z]=u.useState(0),[D,B]=u.useState(null),[V,R]=u.useState(null),M=(t==null?void 0:t._id)||(t==null?void 0:t.id),A=!e||e===M;u.useEffect(()=>{if(A){const G=M;G&&o(G)}else d(e).then(G=>{G&&(g(G),C(G.isFollowing))}),o(e)},[e,M,A,o,d]),u.useEffect(()=>{const G=A?M:e;if(!G){z(0);return}ES(G).then(le=>z((le==null?void 0:le.length)||0)).catch(()=>z(0))},[A,M,e]);const O=async G=>{await i(G);const le=M;le&&o(le)},T=async G=>{D!=null&&D._id&&(await s(D._id,G),B(null))},F=async()=>{V!=null&&V._id&&(await a(V._id),R(null))},P=async()=>{const G=await p(e);G&&(C(G.following),g(le=>le&&{...le,followersCount:G.followersCount}))},q=G=>xt(G).format("D-MMM · HH:mm"),$=G=>{if(!G)return"";const le=[];let ue=0;const me=/\*\*(.+?)\*\*|_(.+?)_/g;let W=0,Me;for(;(Me=me.exec(G))!==null;)Me.index>W&&le.push(n.jsx("span",{children:G.slice(W,Me.index)},ue++)),Me[1]!==void 0?le.push(n.jsx("strong",{children:Me[1]},ue++)):le.push(n.jsx("em",{children:Me[2]},ue++)),W=Me.index+Me[0].length;return W<G.length&&le.push(n.jsx("span",{children:G.slice(W)},ue++)),le.length?le:G};if(!t||!A&&!y)return null;const E=A?t:y,I=E.nickname||E.username||"Foydalanuvchi",N=`@${(E.username||"user").toLowerCase()}`,J=I.charAt(0).toUpperCase(),Y=E.premiumStatus==="active",L=A?t.avatar:E.avatar,H=h.filter(G=>{if(!G||!G.createdBy)return!1;let le=G.createdBy,ue="";typeof le=="string"?ue=le:typeof le=="object"&&(ue=le._id||le.id||JSON.stringify(le));let me=String(E._id||E.id);return ue.toString()===me.toString()}),Q=[{value:A?((ie=t.followers)==null?void 0:ie.length)||"0":String(E.followersCount||0),label:"A'zolar"},{value:String(r.length),label:"Gurunglar"},{value:String(_),label:"Bloglar"},{value:String(H.length),label:"Darslar"}];return n.jsxs(y7,{children:[n.jsxs(v7,{children:[n.jsxs(YS,{children:[n.jsx(b7,{}),A&&n.jsxs(n.Fragment,{children:[n.jsx(w7,{title:"Muqovani o'zgartirish",children:n.jsx(kx,{size:14})}),n.jsx(k7,{title:"Sozlamalar",onClick:()=>v(!0),children:n.jsx(gl,{size:16})})]})]}),n.jsxs(j7,{children:[n.jsx(S7,{children:L?n.jsx("img",{src:L,alt:I}):J}),A&&n.jsx(C7,{title:"Avatarni o'zgartirish",children:n.jsx(kx,{size:10})})]}),n.jsxs(z7,{children:[n.jsxs($7,{children:[n.jsx(_7,{children:I}),Y&&n.jsx(zr,{})]}),n.jsx(T7,{children:N}),n.jsx(E7,{children:E.bio||(A?"Hali tavsif qo'shilmagan. O'z profilingizni to'ldiring!":"Tavsif qo'shilmagan.")}),n.jsxs(R7,{children:[n.jsx(o4,{size:13}),n.jsxs("span",{children:[xt(E.createdAt).format("DD MMMM YYYY")," dan a'zo"]})]})]}),!A&&n.jsxs(O7,{children:[n.jsx(L7,{following:k,onClick:P,children:k?n.jsxs(n.Fragment,{children:[n.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:n.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Obunasiz"]}):n.jsxs(n.Fragment,{children:[n.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),n.jsx("circle",{cx:"9",cy:"7",r:"4"}),n.jsx("line",{x1:"19",y1:"8",x2:"19",y2:"14"}),n.jsx("line",{x1:"22",y1:"11",x2:"16",y2:"11"})]}),"Obuna bo'lish"]})}),n.jsxs(B7,{onClick:()=>{const G=E.jammId||E._id;f(`/a/${G}`)},children:[n.jsx(ms,{size:16}),"Xabar"]})]}),n.jsx(D7,{}),n.jsx(P7,{children:Q.map((G,le)=>n.jsxs(M7,{children:[n.jsx(I7,{children:G.value}),n.jsx(A7,{children:G.label})]},le))}),n.jsxs("div",{style:{width:"100%",height:"100%",overflow:"auto","::-webkit-scrollbar-thumb":{display:"none"}},children:[n.jsxs(Dy,{children:[n.jsxs(no,{active:S==="groups",onClick:()=>m("groups"),iconBg:"linear-gradient(135deg, #3ba55d, #248147)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(ms,{size:16})}),n.jsx("span",{className:"label",children:"Gurunglar"}),n.jsx(mn,{className:"chevron",size:16})]}),n.jsxs(no,{active:S==="blogs",onClick:()=>m("blogs"),iconBg:"linear-gradient(135deg, #2563eb, #0f9d8f)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx($n,{size:16})}),n.jsx("span",{className:"label",children:"Bloglar"}),n.jsx(mn,{className:"chevron",size:16})]}),n.jsxs(no,{active:S==="courses",onClick:()=>m("courses"),iconBg:"linear-gradient(135deg, #faa61a, #bd7b0a)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(Ss,{size:16})}),n.jsx("span",{className:"label",children:"Darslar"}),n.jsx(mn,{className:"chevron",size:16})]})]}),A&&n.jsxs(Dy,{children:[n.jsxs(no,{active:S==="appearance",onClick:()=>m("appearance"),iconBg:"linear-gradient(135deg, #5865f2, #7289da)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(h4,{size:16})}),n.jsx("span",{className:"label",children:"Theme"}),n.jsx(mn,{className:"chevron",size:16})]}),n.jsxs(no,{active:S==="language",onClick:()=>m("language"),iconBg:"linear-gradient(135deg, #00b0f4, #2d6cdf)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(tc,{size:16})}),n.jsx("span",{className:"label",children:"Language"}),n.jsx(mn,{className:"chevron",size:16})]}),n.jsxs(no,{active:S==="premium",onClick:()=>m("premium"),iconBg:"linear-gradient(135deg, #faa61a, #f57c00)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(Vs,{size:16})}),n.jsx("span",{className:"label",children:"Jamm Premium"}),n.jsx(mn,{className:"chevron",size:16})]}),n.jsxs(no,{active:S==="support",onClick:()=>m("support"),iconBg:"linear-gradient(135deg, #3ba55d, #248147)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(c4,{size:16})}),n.jsx("span",{className:"label",children:"Qo'llab-quvvatlash"}),n.jsx(mn,{className:"chevron",size:16})]}),n.jsxs(no,{active:S==="favorites",onClick:()=>m("favorites"),iconBg:"linear-gradient(135deg, #ec4899, #9b59b6)",children:[n.jsx("div",{className:"icon-wrapper",children:n.jsx(Mi,{size:16})}),n.jsx("span",{className:"label",children:"Sevimlilarim"}),n.jsx(mn,{className:"chevron",size:16})]})]})]})]}),n.jsxs(F7,{style:{display:S?"flex":"none"},children:[S==="groups"&&n.jsxs(n.Fragment,{children:[n.jsxs(Fy,{children:[n.jsx(By,{onClick:()=>m(null),children:n.jsx(nr,{size:20})}),n.jsx(ms,{size:24,color:"#3ba55d"}),n.jsx("h2",{children:"Gurunglar"}),A&&n.jsx(Je,{onClick:()=>w(!0),title:"Gurung yarating",children:n.jsx(Et,{size:16})})]}),r.length===0?n.jsx(Ny,{children:n.jsxs(qy,{children:[n.jsx(Hy,{children:n.jsx(ms,{size:28,color:"var(--text-muted-color)"})}),n.jsx("span",{children:"Birinchi gurungi yozing!"})]})}):r.map(G=>n.jsxs(N7,{children:[n.jsxs(q7,{children:[n.jsx(H7,{children:L?n.jsx("img",{src:L,alt:I}):I.charAt(0).toUpperCase()}),n.jsxs(U7,{children:[n.jsxs("h4",{children:[I,n.jsx(zr,{isPremium:Y})]}),n.jsx("span",{children:q(G.createdAt)})]})]}),n.jsx(Y7,{children:$(G.content)}),n.jsxs(V7,{children:[n.jsxs(Sa,{active:G.liked,activeColor:"#ed4245",onClick:()=>c(G._id),children:[n.jsx(Mi,{size:16,fill:G.liked?"#ed4245":"none"}),G.likes]}),n.jsxs(Sa,{activeColor:"#5865f2",children:[n.jsx(ep,{size:16}),G.comments]}),n.jsxs(Sa,{activeColor:"var(--text-muted-color)",children:[n.jsx(_n,{size:16}),G.views]})]}),A&&n.jsxs(W7,{children:[n.jsxs(Sa,{activeColor:"var(--primary-color)",onClick:()=>B(G),children:[n.jsx(gl,{size:16}),"Tahrirlash"]}),n.jsxs(Sa,{activeColor:"#ed4245",onClick:()=>R(G),children:[n.jsx(lr,{size:16}),"O'chirish"]})]})]},G._id))]}),S==="courses"&&n.jsxs(n.Fragment,{children:[n.jsxs(Fy,{children:[n.jsx(By,{onClick:()=>m(null),children:n.jsx(nr,{size:20})}),n.jsx(Ss,{size:24,color:"#faa61a"}),n.jsx("h2",{children:"Darslar"})]}),n.jsx(Ny,{children:H.length===0?n.jsxs(qy,{children:[n.jsx(Hy,{children:n.jsx(Ss,{size:28,color:"var(--text-muted-color)"})}),n.jsx("span",{children:"Siz qo'shgan darslar yo'q"})]}):n.jsx(G7,{children:H.map(G=>n.jsxs(Q7,{onClick:()=>f(`/courses/${G.urlSlug||G.id||G._id}`),children:[n.jsx(K7,{$image:G.image,style:{background:G.image?void 0:"var(--primary-color)"},children:!G.image&&(G.name||"?").charAt(0)}),n.jsxs(J7,{children:[n.jsx(X7,{children:G.name}),n.jsx(Z7,{children:(G.lessons||[]).length>0?`${G.lessons.length} ta dars`:"Hali dars yo'q"})]})]},G._id||G.id))})})]}),S==="blogs"&&n.jsx(FM,{profileUser:E,profileUserId:e,isOwnProfile:A,onBack:()=>m(null),onCountChange:z}),A&&["appearance","language","premium","support","favorites"].includes(S)&&n.jsx(e7,{section:S,currentUser:t})]}),n.jsx(BS,{isOpen:b||!!D,onClose:()=>{w(!1),B(null)},onSubmit:D?T:O,currentUser:t,initialContent:(D==null?void 0:D.content)||"",title:D?"Gurungni tahrirlash":"Yangi Gurung",submitLabel:D?"Saqlash":"Yuborish"}),n.jsx(u7,{isOpen:j,onClose:()=>v(!1)}),n.jsx(Di,{isOpen:!!V,onClose:()=>R(null),title:"Gurungni o'chirish",description:"Bu gurung o'chirilsa, uni qayta tiklab bo'lmaydi.",confirmText:"O'chirish",cancelText:"Bekor qilish",onConfirm:F,isDanger:!0})]})},jm=l.div`
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
`,Sm=l.div`
  background-color: var(--secondary-color, #2f3136);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,Cm=l.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,zm=l.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  margin-bottom: 8px;
`,tI=l.p`
  color: var(--text-muted-color, #b9bbbe);
  font-size: 14px;
`;l.button`
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
`;const rI=l.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Uy=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ud=l.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,Ux=l.input`
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
`,nI=l.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,oI=l.div`
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
`,iI=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,sI=l.div`
  position: relative;
  margin-bottom: 8px;
`,VS=l.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 16px;
  background-color: var(--tertiary-color, #36393f);
  &::-webkit-scrollbar {
    width: 0;
  }
`,WS=l.div`
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
`,GS=l.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,$m=l.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,QS=l.span`
  font-size: 14px;
  color: var(--text-color, #ffffff);
  font-weight: 500;
`,_m=l.div`
  background-color: var(--tertiary-color, #36393f);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Ul=l.button`
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
    &:hover { background-color: rgba(255,255,255,0.05); }
  `}

  ${e=>e.danger&&`
    color: #ed4245;
    &:hover { background-color: rgba(237, 66, 69, 0.1); }
  `}
`,aI=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
`,lI=l.div`
  width: 32px;
  height: 18px;
  background-color: ${e=>e.active?"#43b581":"#72767d"};
  border-radius: 9px;
  position: relative;
  transition: background-color 0.2s;
`,cI=l.div`
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${e=>e.active?"16px":"2px"};
  transition: left 0.2s;
`,dI=({isOpen:e,onClose:t,user:r,permissions:o,onTogglePerm:i,onDismissAdmin:s,isOwner:a})=>{var d;if(!e||!r)return null;const c=[{id:"edit_group_info",label:"Guruh ma'lumotlarini tahrirlash"},{id:"add_members",label:"A'zo qo'shish"},{id:"remove_members",label:"A'zo o'chirish"},{id:"delete_others_messages",label:"Xabarlarni o'chirish"},{id:"add_admins",label:"Admin qo'shish"},{id:"pin_messages",label:"Xabarlarni biriktirish"}];return n.jsx(jm,{onClick:t,children:n.jsxs(Sm,{onClick:p=>p.stopPropagation(),style:{width:"380px"},children:[n.jsxs(Cm,{style:{padding:"20px"},children:[n.jsx(zm,{style:{fontSize:"18px"},children:"Admin huquqlari"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs("div",{style:{padding:"0 24px 20px"},children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingBottom:16,borderBottom:"1px solid var(--border-color, #202225)"},children:[n.jsx($m,{style:{width:44,height:44,fontSize:16},children:((d=r.avatar)==null?void 0:d.length)>1?n.jsx("img",{src:r.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(r.name||r.username||"").charAt(0)}),n.jsxs("div",{children:[n.jsx("div",{style:{color:"white",fontWeight:600,fontSize:15},children:r.name||r.username}),n.jsxs("div",{style:{color:"#b9bbbe",fontSize:13},children:["@",r.username]})]})]}),n.jsx(Ud,{style:{marginBottom:10,display:"block"},children:"HUQUQLAR"}),n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:c.map(p=>{const h=o.includes(p.id);return n.jsxs(aI,{onClick:()=>i(p.id),children:[n.jsx("span",{style:{color:"#dcddde",fontSize:14},children:p.label}),n.jsx(lI,{active:h,children:n.jsx(cI,{active:h})})]},p.id)})})]}),n.jsxs(_m,{style:{padding:"16px 20px",justifyContent:"space-between",flexDirection:"row-reverse"},children:[n.jsx(Ul,{primary:!0,onClick:t,children:"Saqlash"}),n.jsx(Ul,{danger:!0,onClick:s,children:"Adminlikni bekor qilish"})]})]})})},uI=({isOpen:e,onClose:t,onSelect:r,selectedUsers:o,users:i,searchGlobalUsers:s})=>{const[a,c]=u.useState(""),[d,p]=u.useState([]),[h,f]=u.useState(!1);u.useEffect(()=>{const b=setTimeout(async()=>{if(!a.trim()){p([]);return}f(!0);try{const w=await s(a);p(w)}catch(w){console.error("Search failed:",w)}finally{f(!1)}},500);return()=>clearTimeout(b)},[a,s]);const S=[...i,...d.filter(b=>!i.some(w=>w.id===b.id))].filter(b=>{var w,j;return(((w=b.name)==null?void 0:w.toLowerCase().includes(a.toLowerCase()))||((j=b.username)==null?void 0:j.toLowerCase().includes(a.toLowerCase())))&&!o.includes(b.id)}),m=o.length>=40;return e?n.jsx(jm,{onClick:t,children:n.jsxs(Sm,{onClick:b=>b.stopPropagation(),style:{width:"400px"},children:[n.jsxs(Cm,{style:{padding:"20px"},children:[n.jsxs(zm,{style:{fontSize:"20px"},children:["A'zo qo'shish (",o.length,"/40)"]}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs("div",{style:{padding:"0 24px 24px"},children:[n.jsxs(sI,{children:[n.jsx(Ux,{placeholder:"Ism yoki @username orqali qidirish",value:a,onChange:b=>c(b.target.value),style:{paddingLeft:30,width:"100%"},autoFocus:!0}),n.jsx("div",{style:{position:"absolute",left:10,top:12,color:"#aaa"},children:h?n.jsx(Ii,{size:14,className:"animate-spin"}):n.jsx(rc,{size:14})})]}),n.jsx(VS,{style:{maxHeight:"300px",marginTop:12},children:a.trim()===""?n.jsx("div",{style:{padding:20,textAlign:"center",color:"#b9bbbe",fontSize:14},children:"Qidirishni boshlang..."}):S.length===0?n.jsx("div",{style:{padding:20,textAlign:"center",color:"#b9bbbe",fontSize:14},children:"Hech kim topilmadi"}):S.map(b=>{var w;return n.jsxs(WS,{onClick:()=>r(b.id),children:[n.jsxs(GS,{children:[n.jsx($m,{children:((w=b.avatar)==null?void 0:w.length)>1?n.jsx("img",{src:b.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(b.name||b.username||"").charAt(0)}),n.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[n.jsx(QS,{children:b.name||b.username}),n.jsxs("div",{style:{fontSize:11,color:"#b9bbbe"},children:["@",b.username]})]})]}),m?n.jsx("div",{style:{fontSize:10,color:"#ed4245"},children:"Guruh to'la"}):n.jsx(Et,{size:16,color:"var(--primary-color)"})]},b.id)})})]}),n.jsx(_m,{style:{padding:"12px 24px"},children:n.jsx(Ul,{onClick:t,children:"Yopish"})})]})}):null},pI=({isOpen:e,onClose:t,onSave:r,group:o={},users:i=[]})=>{var E,I;if(!e)return null;const[s,a]=u.useState(""),[c,d]=u.useState(""),[p,h]=u.useState(""),[f,x]=u.useState([]),[S,m]=u.useState(!1),{searchGlobalUsers:b}=Wo(),w=u.useRef(null),j=uP({onSuccess:N=>h(N),onError:()=>Xe.error("Rasm yuklashda xatolik yuz berdi")}),[v,y]=u.useState([]),[g,k]=u.useState(null),C=Ie(N=>N.user),_=(C==null?void 0:C.id)||(C==null?void 0:C._id),z=String(o.createdBy)===String(_),D=v.find(N=>String(N.userId||N.id||N._id)===String(_)),B=N=>z||D&&D.permissions.includes(N),V=B("edit_group_info"),R=B("add_members"),M=B("remove_members"),A=B("add_admins");u.useEffect(()=>{e&&o&&(a(o.name||""),d(o.description||""),h(o.avatar||""),x(o.members?o.members.map(N=>String(N.id||N._id||N)):[]),y(o.admins?o.admins.map(N=>({...N,userId:String(N.userId||N.id||N._id)})):[]),m(!1))},[e,o]);const O=N=>{if(f.includes(N))x(f.filter(J=>J!==N)),y(J=>J.filter(Y=>(Y.userId||Y.id)!==N));else{if(f.length>=40){Xe.error("Guruhga maksimal 40ta odam qo'shish mumkin");return}x([...f,N])}};[...i];const T=new Map;(E=o.members)==null||E.forEach(N=>T.set(N.id||N._id||N,N)),i.forEach(N=>T.set(N.id||N.jammId||N._id,N));const F=f.map(N=>T.get(N)).filter(Boolean),P=(N,J)=>{const Y=String(N);y(L=>{const H=L.find(Q=>String(Q.userId||Q.id)===Y);if(H){const ie=H.permissions.includes(J)?H.permissions.filter(G=>G!==J):[...H.permissions,J];return ie.length===0?L.filter(G=>String(G.userId||G.id)!==Y):L.map(G=>String(G.userId||G.id)===Y?{...G,permissions:ie}:G)}else return x(Q=>Q.includes(Y)?Q:[...Q,Y]),[...L,{userId:Y,permissions:[J]}]})},q=()=>{console.log(f);const N={name:s,description:c,avatar:p,members:f};A&&(N.admins=v),r(N),t()},$=N=>{var L;const J=(L=N.target.files)==null?void 0:L[0];if(!J)return;if(J.size>2*1024*1024){Xe.error("Fayl hajmi juda katta (maksimum 2MB)");return}const Y=new FormData;Y.append("file",J),j.mutate({chatId:o.id||o._id,formData:Y})};return n.jsxs(jm,{onClick:t,children:[n.jsxs(Sm,{onClick:N=>N.stopPropagation(),children:[n.jsxs(Cm,{children:[n.jsx(zm,{children:"Guruhni tahrirlash"}),n.jsx(tI,{children:"Guruh ma'lumotlarini o'zgartirish"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(rI,{children:[n.jsxs(nI,{children:[n.jsx("input",{type:"file",ref:w,style:{display:"none"},accept:"image/*",onChange:$,disabled:!V}),n.jsx(oI,{onClick:()=>{V&&w.current&&w.current.click()},style:{cursor:V?"pointer":"not-allowed"},children:j.isPending?n.jsx(Ii,{size:24,style:{animation:"spin 1s linear infinite"}}):(p==null?void 0:p.length)>1?n.jsx("img",{src:p,alt:"Group"}):n.jsxs(n.Fragment,{children:[n.jsx(sm,{size:24}),n.jsx("span",{children:"UPLOAD"})]})})]}),n.jsxs(Uy,{children:[n.jsx(Ud,{children:"Guruh nomi"}),n.jsx(Ux,{placeholder:"Guruh nomi",value:s,onChange:N=>a(N.target.value),disabled:!V})]}),n.jsxs(Uy,{children:[n.jsx(Ud,{children:"Guruh haqida (ixtiyoriy)"}),n.jsx(Ux,{placeholder:"Guruh maqsadini yozing...",value:c,onChange:N=>d(N.target.value),disabled:!V})]}),n.jsxs(iI,{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsxs(Ud,{children:["Mavjud a'zolar (",F.length,"/40)"]}),R&&n.jsx(Je,{onClick:()=>m(!0),children:n.jsx(Et,{size:16})})]}),n.jsx(VS,{children:F.map(N=>{var L;const J=String(N.id||N._id),Y=v.find(H=>String(H.userId||H.id)===J);return n.jsx("div",{style:{display:"flex",flexDirection:"column"},children:n.jsxs(WS,{children:[n.jsxs(GS,{children:[n.jsx($m,{children:((L=N.avatar)==null?void 0:L.length)>1?n.jsx("img",{src:N.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(N.name||N.username||"").charAt(0)}),n.jsx(QS,{children:N.name||N.nickname||N.username}),J===o.createdBy&&n.jsx(Vs,{size:14,color:"#f1c40f"}),J!==o.createdBy&&Y&&n.jsx(Vs,{size:14,color:"#5865F2"})]}),n.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[J!==o.createdBy&&n.jsxs("button",{onClick:()=>k(J),style:{background:"transparent",border:"none",color:Y?"#5865f2":"#b9bbbe",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:2,padding:"4px 8px",borderRadius:4},children:[Y?"Admin":"Unsigned",n.jsx(mn,{size:14})]}),M&&J!==o.createdBy&&n.jsx("button",{onClick:()=>O(J),style:{background:"transparent",border:"none",color:"#ed4245",cursor:"pointer",padding:6,borderRadius:4},children:n.jsx(X3,{size:16})})]})]})},J)})})]})]}),n.jsxs(_m,{children:[n.jsx(Ul,{onClick:t,children:"Bekor qilish"}),n.jsx(Ul,{primary:!0,onClick:q,disabled:!s.trim(),children:"Saqlash"})]})]}),g&&n.jsx(dI,{isOpen:!!g,onClose:()=>k(null),user:T.get(g),permissions:((I=v.find(N=>String(N.userId||N.id)===String(g)))==null?void 0:I.permissions)||[],onTogglePerm:N=>P(g,N),onDismissAdmin:()=>{y(N=>N.filter(J=>String(J.userId||J.id)!==String(g))),k(null)},isOwner:z}),S&&n.jsx(uI,{isOpen:S,onClose:()=>m(!1),onSelect:N=>{O(N),m(!1)},selectedUsers:f,users:i,searchGlobalUsers:b})]})},Ut=[];for(let e=0;e<256;++e)Ut.push((e+256).toString(16).slice(1));function hI(e,t=0){return(Ut[e[t+0]]+Ut[e[t+1]]+Ut[e[t+2]]+Ut[e[t+3]]+"-"+Ut[e[t+4]]+Ut[e[t+5]]+"-"+Ut[e[t+6]]+Ut[e[t+7]]+"-"+Ut[e[t+8]]+Ut[e[t+9]]+"-"+Ut[e[t+10]]+Ut[e[t+11]]+Ut[e[t+12]]+Ut[e[t+13]]+Ut[e[t+14]]+Ut[e[t+15]]).toLowerCase()}let jh;const fI=new Uint8Array(16);function xI(){if(!jh){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");jh=crypto.getRandomValues.bind(crypto)}return jh(fI)}const gI=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Yy={randomUUID:gI};function mI(e,t,r){var i;e=e||{};const o=e.random??((i=e.rng)==null?void 0:i.call(e))??xI();if(o.length<16)throw new Error("Random bytes length must be >= 16");return o[6]=o[6]&15|64,o[8]=o[8]&63|128,hI(o)}function yI(e,t,r){return Yy.randomUUID&&!e?Yy.randomUUID():mI(e)}const KS=u.createContext(),JS=()=>u.useContext(KS),vI=({children:e})=>{const{socket:t}=vm(),r=Ie(b=>b.user),[o,i]=u.useState(null),[s,a]=u.useState(null),[c,d]=u.useState(null);u.useEffect(()=>{if(!t)return;const b=y=>{if(c||s||o){t.emit("call:reject",{toUserId:y.fromUser._id,roomId:y.roomId,reason:"busy"});return}i(y)},w=y=>{s&&s.roomId===y.roomId&&(d({roomId:y.roomId,callType:s.callType,remoteUser:s.targetUser,isCaller:!0}),a(null))},j=y=>{s&&s.roomId===y.roomId&&(Xe.error(`${s.targetUser.name} qo'ng'iroqni rad etdi`),a(null))},v=y=>{o&&o.roomId===y.roomId&&i(null)};return t.on("call:incoming",b),t.on("call:accepted",w),t.on("call:rejected",j),t.on("call:cancelled",v),()=>{t.off("call:incoming",b),t.off("call:accepted",w),t.off("call:rejected",j),t.off("call:cancelled",v)}},[t,c,s,o]);const p=u.useCallback((b,w="video")=>{if(!t||!r)return;const j=yI(),v={toUserId:b._id,roomId:j,callType:w};a({targetUser:b,roomId:j,callType:w}),t.emit("call:request",v)},[t,r]),h=u.useCallback(()=>{!t||!o||(t.emit("call:accept",{toUserId:o.fromUser._id,roomId:o.roomId}),d({roomId:o.roomId,callType:o.callType,remoteUser:o.fromUser,isCaller:!1}),i(null))},[t,o]),f=u.useCallback(()=>{!t||!o||(t.emit("call:reject",{toUserId:o.fromUser._id,roomId:o.roomId}),i(null))},[t,o]),x=u.useCallback(()=>{!t||!s||(t.emit("call:cancel",{toUserId:s.targetUser._id,roomId:s.roomId}),a(null))},[t,s]),S=u.useCallback(()=>{d(null)},[]),m={incomingCall:o,outgoingCall:s,activeCall:c,startPrivateCall:p,acceptCall:h,rejectCall:f,cancelCall:x,endActiveCall:S};return n.jsx(KS.Provider,{value:m,children:e})},Vy=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.value=.3,t.start(),t.stop(e.currentTime+.2),setTimeout(()=>{const o=e.createOscillator(),i=e.createGain();o.connect(i),i.connect(e.destination),o.frequency.value=800,o.type="sine",i.gain.value=.3,o.start(),o.stop(e.currentTime+.2)},400)},Wy=()=>{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=600,t.type="sine",r.gain.value=.4,setTimeout(()=>{const o=e.createOscillator(),i=e.createGain();o.connect(i),i.connect(e.destination),o.frequency.value=600,o.type="sine",i.gain.value=.4},800)},bI=l.div`
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
`,wI=l.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,kI=l.div`
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
`,jI=l.div`
  text-align: center;
`,SI=l.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,Gy=l.div`
  color: #b9bbbe;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,CI=l.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`,zI=l.button`
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
`,$I=l.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`,Sh=l.div`
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
`,XS=({isOpen:e,onCancel:t,target:r})=>{var c;const[o,i]=u.useState(0),s=u.useRef(null);u.useEffect(()=>{if(e){Vy(),s.current=setInterval(()=>{Vy()},1500);const d=setInterval(()=>{i(p=>p+1)},1e3);return()=>{d&&clearInterval(d),s.current&&(clearInterval(s.current),s.current=null)}}},[e]);const a=d=>{const p=Math.floor(d/60),h=d%60;return`${p.toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`};return e?n.jsx(bI,{children:n.jsxs(wI,{children:[n.jsx(kI,{children:((c=r==null?void 0:r.name)==null?void 0:c[0])||"U"}),n.jsxs(jI,{children:[n.jsx(SI,{children:(r==null?void 0:r.name)||"Unknown"}),n.jsxs(Gy,{children:[n.jsx(y4,{size:16}),"Calling..."]}),n.jsxs(Gy,{children:[n.jsx(Pi,{size:16}),a(o)]})]}),n.jsxs($I,{children:[n.jsx(Sh,{}),n.jsx(Sh,{delay:.2}),n.jsx(Sh,{delay:.4})]}),n.jsx(CI,{children:n.jsxs(zI,{variant:"cancel",onClick:t,children:[n.jsx(rp,{size:20}),"Cancel"]})})]})}):null},_I=l.div`
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
`,TI=l.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;l.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;l.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background-color: var(--hover-color);
  }
`;l.div`
  color: var(--primary-color);
  margin-top: 2px;
`;l.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;l.div`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.4;
`;l.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;l.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  margin: 0 16px;
`;l.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`;const Qy=l.span`
  font-size: 11px;
  color: var(--primary-color);
  background: rgba(88, 101, 242, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: auto;
`,Ky=l.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--border-color);
`,Ca=l.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`,za=l.div`
  font-size: 13px;
  color: var(--text-muted-color);
  font-weight: 400;
`,Ch=l.div`
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-word;
`,Jy=l.div`
  font-size: 15px;
  color: #0088cc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`,EI=l.span`
  color: #0088cc;
  cursor: pointer;
  font-weight: 500;
  margin-left: 8px;

  &:hover {
    text-decoration: underline;
  }
`,Xy=({text:e})=>{if(!e)return null;const t=e.split(/(@\w+)/g);return n.jsx(n.Fragment,{children:t.map((r,o)=>r.startsWith("@")?n.jsx("span",{style:{color:"#0088cc",cursor:"pointer"},children:r},o):r)})},RI=l.div`
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
`,PI=l.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`,MI=l.div`
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
`,II=l.div`
  flex: 1;
  min-width: 0;
`,AI=l.span`
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
`,OI=l.span`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,LI=l.div`
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
`,BI=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,zh=l.button`
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

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
      color: var(--text-secondary-color);
    }
  }
`;l.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;l.button`
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
`;const DI=l.div`
  position: absolute;
  top: 55px;
  right: 16px;
  background-color: rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(5px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  display: flex;
  flex-direction: column;

  transform-origin: top right;
  animation: headerMenuFadeIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;

  @keyframes headerMenuFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`,qc=l.div`
  padding: 10px 14px;
  color: #dcddde;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
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

  ${e=>e.danger&&`
    color: #f04747;
    &:hover {
      background-color: #f04747;
      color: #ffffff;
    }
  `}
`,FI=l.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`,NI=l.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
`,qI=l.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: var(--text-color);
`,HI=l.p`
  margin: 0 0 24px 0;
  font-size: 15px;
  color: var(--text-muted-color);
  line-height: 1.5;
`,UI=l.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`,Zy=l.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${e=>e.danger?"#ff4d4d":"transparent"};
  color: ${e=>e.danger?"white":"var(--text-muted-color)"};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`,YI=l.div`
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
`,VI=l.div`
  display: flex;
  flex-direction: column;
`,WI=l.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${e=>e.isOwn?"flex-end":"flex-start"};
  cursor: pointer;
  border-radius: 16px;
  padding: 0 5px 5px 0;
  transition: background-color 0.2s ease;

  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.05);
  //   border-radius: 8px;
  // }
`,ev=l.div`
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
`,tv=l.div`
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
`,rv=l.div`
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
`;l.div`
  font-size: 11px;
  opacity: 0.7;

  ${e=>e.isOwn?`
    text-align: right;
  `:`
    text-align: left;
  `}
`;const GI=l.div`
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
`,$h=l.div`
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
`,nv=l.input`
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
`,ov=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`,iv=l.span`
  font-size: 11px;
  color: #72767d;
  font-style: italic;
  margin-left: 4px;
`,_h=l.div`
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
`,QI=l.div`
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
`,KI=l.span`
  color: #dcddde;
  font-weight: 500;
  cursor: default;
`,JI=l.div`
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
`,XI=l.div`
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
`,ZI=l.button`
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
`,eA=l.div`
  padding: 12px 16px 16px;
  background-color: #2f3136;
  border-top: 1px solid #40444b;
  position: relative;
`,tA=l.div`
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
`,rA=l.div`
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
`,nA=l.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`,sv=l.button`
  color: #b9bbbe;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #dcddde;
  }
`,oA=l.textarea`
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
`,iA=l.div`
  width: 350px;
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
    width: 350px;
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
`,sA=l.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
`,av=l.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  height: 20px;
  &:hover {
    color: var(--text-color);
  }
`,aA=l.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`,lA=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,cA=l.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,dA=l.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
`,uA=l.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`,pA=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`,hA=l.h4`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--text-muted-color);
`;l.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-all;
`;l.button`
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
`;const fA=l.div`
  display: flex;
  flex-direction: column;
`,xA=l.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 14px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color, rgba(255, 255, 255, 0.05));
  }
`,gA=l.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,mA=({onBack:e,selectedChannel:t,selectedNav:r,navigate:o,chats:i=[]})=>{var se,Ce,$e,dt;console.log(i,r,t);const[s,a]=u.useState(!1);u.useEffect(()=>{a(!1)},[t]);const{fetchMessages:c,sendMessage:d,editMessage:p,deleteMessage:h,getUserByUsername:f,createChat:x,editChat:S,previewGroupChat:m,joinGroupChat:b,deleteChat:w,leaveChat:j,chatSocket:v,markMessagesAsRead:y,typingUsers:g,sendTypingStatus:k,previewChat:C,setPreviewChat:_,searchGlobalUsers:z}=Wo(),{isUserOnline:D,getOnlineCount:B}=vm(),{startPrivateCall:V}=JS(),R=i.find(U=>U.urlSlug===t||U.id===t);console.log(R,"----------");const[M,A]=u.useState(""),O=u.useRef(null),[T,F]=u.useState([]),[P,q]=u.useState(1),[$,E]=u.useState(!0),[I,N]=u.useState(!1),[J,Y]=u.useState(!1),L=Ie(U=>U.user),H=async U=>{L!=null&&L._id||(L==null||L.id);const re=U._id||U.id,pe=i.find(de=>de.isGroup||!de.members||de.isSavedMessages?!1:de.members.some(K=>(K._id||K.id)===re));if(console.log(U,pe),console.log(pe),!pe)o(`/users/${pe.jammId}`),a(!1);else try{const de=await x({isGroup:!1,memberIds:[re]});de&&(o(`/users/${de.jammId}`),a(!1))}catch(de){console.error("Failed to start private chat",de)}},[Q,ie]=u.useState(null),[G,le]=u.useState(null),[ue,me]=u.useState(""),W=R||C,[Me,De]=u.useState(!1),[Fe,ot]=u.useState(null),[st,ze]=u.useState(!1),[Oe,Re]=u.useState(!1),[qe,ae]=u.useState(!1),Le=u.useRef(null),Ge=u.useRef({}),at=u.useRef(null);u.useRef(null);const oe=u.useRef(null),xe=(W==null?void 0:W.type)!=="group"&&(W!=null&&W.members)?W.members.find(U=>{const re=U._id||U.id,pe=(L==null?void 0:L._id)||(L==null?void 0:L.id);return String(re)!==String(pe)}):null,we=xe?D(xe._id):!1,X=(W==null?void 0:W.type)==="group"?B(W.members):0,ee=Qe.useMemo(()=>{if(!xe||we)return"Online";if(!xe.lastSeen)return"Offline";const U=new Date(xe.lastSeen),pe=new Date-U,de=Math.floor(pe/6e4),K=Math.floor(de/60);return de<60?`Last seen ${de}m ago`:K<24?`Last seen ${K}h ago`:`Last seen ${U.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`},[xe,we]),ye=u.useRef(null);u.useEffect(()=>{(r==="groups"||r==="users"||r==="a"||r==="chats")&&t&&!R?ye.current!==t&&(ye.current=t,(async()=>{try{if(r==="users"){const{getPublicProfile:re}=await Hd(async()=>{const{getPublicProfile:de}=await Promise.resolve().then(()=>ah);return{getPublicProfile:de}},void 0);console.log(re);const pe=await re(t);if(pe){_({type:"user",id:null,name:pe.nickname||pe.username,avatar:pe.avatar,description:pe.bio,targetUserId:pe._id||pe.id});return}}if(r==="groups"||r==="a"||r==="chats")try{const re=await m(t);_(re)}catch(re){if(r==="groups"&&console.error("Group Preview failed, trying user resolution:",re),r!=="groups"){const{getPublicProfile:pe}=await Hd(async()=>{const{getPublicProfile:K}=await Promise.resolve().then(()=>ah);return{getPublicProfile:K}},void 0),de=await pe(t);console.log(de,"kjhkkkkkkk"),_(de?{type:"user",id:null,name:de.nickname||de.username,avatar:de.avatar,description:de.bio,targetUserId:de._id||de.id}:null)}else _(null)}else _(null)}catch(re){console.error("Preview resolution completely failed:",re),_(null)}})()):(ye.current=null,_(null))},[r,t,R]),u.useEffect(()=>{if(!R)return;(async()=>{N(!0);const re=await c(R.id,1,30);F(re.data||[]),q(re.page||1),E((re.page||1)<(re.totalPages||1)),N(!1);const pe=re.data||[],de=(L==null?void 0:L._id)||(L==null?void 0:L.id),K=pe.find(_e=>{var je;return _e.senderId!==de&&!((je=_e.readBy)!=null&&je.includes(de))});setTimeout(()=>{const _e=K?K.id||K._id:null;_e&&Ge.current[_e]?Ge.current[_e].scrollIntoView({behavior:"auto",block:"center"}):Vr("auto")},100)})()},[R==null?void 0:R.id,c]);const ke=async()=>{if(!R||I||!$)return;N(!0);const U=document.getElementById("scrollableChatArea"),re=U?U.scrollHeight:0,pe=U?U.scrollTop:0,de=P+1,K=await c(R.id,de,30),_e=K.data||[];F(je=>[..._e,...je]),q(de),E(de<(K.totalPages||1)),N(!1),setTimeout(()=>{U&&(U.scrollTop=U.scrollHeight-re+pe)},0)};u.useEffect(()=>{if(!(!v||!R))return v.emit("join_chat",{chatId:R.id}),()=>{v.emit("leave_chat",{chatId:R.id})}},[v,R==null?void 0:R.id]),u.useEffect(()=>{if(!v)return;const U=K=>{var We,Ne,zt,Pn,Xo,mp,ia,sa,aa;if(K.chatId!==(R==null?void 0:R.id))return;const _e={id:K._id,user:((We=K.senderId)==null?void 0:We.nickname)||((Ne=K.senderId)==null?void 0:Ne.username),avatar:((zt=K.senderId)==null?void 0:zt.avatar)||((mp=((Pn=K.senderId)==null?void 0:Pn.nickname)||((Xo=K.senderId)==null?void 0:Xo.username))==null?void 0:mp.charAt(0))||"U",senderId:((ia=K.senderId)==null?void 0:ia._id)||K.senderId,content:K.content,timestamp:xt(K.createdAt).format("HH:mm"),date:xt(K.createdAt).format("YYYY-MM-DD"),edited:K.isEdited,isDeleted:K.isDeleted,readBy:K.readBy||[],replayTo:K.replayTo?{id:K.replayTo._id,user:((sa=K.replayTo.senderId)==null?void 0:sa.nickname)||((aa=K.replayTo.senderId)==null?void 0:aa.username),content:K.replayTo.content}:null};F(Vi=>Vi.some(uc=>uc.id===_e.id)?Vi:[...Vi,_e]);const je=(L==null?void 0:L._id)||(L==null?void 0:L.id);_e.senderId===je&&setTimeout(()=>Vr("smooth"),100)},re=K=>{K.chatId===(R==null?void 0:R.id)&&F(_e=>_e.map(je=>je.id===K._id?{...je,content:K.content,edited:!0}:je))},pe=K=>{K.chatId===(R==null?void 0:R.id)&&F(_e=>_e.filter(je=>je.id!==K._id))},de=({chatId:K,readByUserId:_e,messageIds:je})=>{(R==null?void 0:R.id)===K&&F(We=>We.map(Ne=>{var Pn;return(Ne.senderId&&typeof Ne.senderId=="object"?Ne.senderId._id||Ne.senderId.id:Ne.senderId)!==_e&&(je!=null&&je.includes(Ne.id||Ne._id))&&!((Pn=Ne.readBy)!=null&&Pn.includes(_e))?{...Ne,readBy:[...Ne.readBy||[],_e]}:Ne}))};return v.on("message_new",U),v.on("message_updated",re),v.on("message_deleted",pe),v.on("messages_read",de),()=>{v.off("message_new",U),v.off("message_updated",re),v.off("message_deleted",pe),v.off("messages_read",de)}},[v,R==null?void 0:R.id]),u.useEffect(()=>{if(!R)return;const U=(L==null?void 0:L._id)||(L==null?void 0:L.id),re=T.filter(de=>{var _e;return(de.senderId&&typeof de.senderId=="object"?de.senderId._id||de.senderId.id:de.senderId)!==U&&!((_e=de.readBy)!=null&&_e.includes(U))});if(re.length===0)return;const pe=new IntersectionObserver(de=>{const K=[];de.forEach(_e=>{var je;if(_e.isIntersecting){const We=_e.target.dataset.messageId,Ne=T.find(zt=>String(zt.id)===String(We)||String(zt._id)===String(We));if(Ne){const zt=Ne.senderId&&typeof Ne.senderId=="object"?Ne.senderId._id||Ne.senderId.id:Ne.senderId;String(zt)!==String(U)&&!((je=Ne.readBy)!=null&&je.includes(U))&&K.push(Ne.id||Ne._id)}}}),K.length>0&&y(R.id,K)},{threshold:.1});return re.forEach(de=>{const K=Ge.current[de.id];K&&pe.observe(K)}),()=>pe.disconnect()},[T,R,L,y]),u.useEffect(()=>{oe.current&&(oe.current.focus(),oe.current.setSelectionRange(oe.current.value.length,oe.current.value.length))},[t,r,Q]),u.useEffect(()=>{oe.current&&(oe.current.style.height="25px",oe.current.style.height=`${oe.current.scrollHeight}px`)},[M]);const[he,Ee]=u.useState(0),[He,ct]=u.useState(null),[tt,ut]=u.useState(null),[ir,Go]=u.useState(null),[ur,Rt]=u.useState(!1),[Kt,cn]=u.useState(!1),Yr=U=>{const re=`${window.location.origin}/${U}`;navigator.clipboard.writeText(re).then(()=>{cn(!0),setTimeout(()=>cn(!1),2e3)})};u.useEffect(()=>()=>{tt&&clearTimeout(tt),ir&&clearTimeout(ir)},[tt,ir]);const Rn=Qe.useMemo(()=>T,[T]),dn=(W==null?void 0:W.name)||"Chat",Vr=(U="auto")=>{var re;(re=at.current)==null||re.scrollIntoView({behavior:U})},qt=U=>{const re=Ge.current[U];re&&(re.scrollIntoView({behavior:"smooth",block:"center"}),re.style.backgroundColor="rgba(114, 137, 218, 0.3)",setTimeout(()=>{re.style.backgroundColor=""},2e3))},Qo=(U,re)=>{He!==U.id?(Ee(1),ct(U.id)):Ee(de=>de+1),tt&&clearTimeout(tt);const pe=setTimeout(()=>{he===1&&He===U.id&&(ie(U),console.log("Replay triggered for message:",U),setTimeout(()=>{oe.current&&(oe.current.focus(),oe.current.setSelectionRange(oe.current.value.length,oe.current.value.length))},0)),Ee(0),ct(null)},300);ut(pe)},Ko=(U,re)=>{const pe=re.clientX,de=re.clientY,K=180,_e=U.user==="You"?120:40;let je=pe,We=de;pe+K>window.innerWidth&&(je=window.innerWidth-K-10),de+_e>window.innerHeight&&(We=window.innerHeight-_e-10),je<10&&(je=10),We<10&&(We=10),ot({x:je,y:We,message:U})},Se=async(U,re)=>{switch(U){case"delete":try{F(pe=>pe.map(de=>de.id===re.id?{...de,isDeleted:!0,content:"Bu xabar o'chirildi"}:de)),await h(re.id),console.log("Message deleted:",re)}catch(pe){console.error("Failed to delete message",pe)}break;case"edit":if(re.isDeleted)return;le(re),me(re.content),console.log("Edit mode started for message:",re);break;case"replay":ie(re),A(""),console.log("Replay message:",re),setTimeout(()=>{oe.current&&(oe.current.focus(),oe.current.setSelectionRange(oe.current.value.length,oe.current.value.length))},0);break}ot(null)},Fi=async U=>{if(U.key==="Enter"&&ue.trim())try{const re=ue.trim();F(de=>de.map(K=>K.id===G.id?{...K,content:re,edited:!0}:K));const pe=G.id;le(null),me(""),await p(pe,re),console.log("Message edited on backend:",pe,"->",re)}catch(re){console.error("Failed to edit message",re)}else U.key==="Escape"&&(le(null),me(""))},Ct=U=>{const re=U.target.value;A(re);const pe=(R==null?void 0:R.id)||(R==null?void 0:R._id);pe&&re.trim()?(O.current||k(pe,!0),O.current&&clearTimeout(O.current),O.current=setTimeout(()=>{k(pe,!1),O.current=null},3e3)):pe&&!re.trim()&&O.current&&(clearTimeout(O.current),k(pe,!1),O.current=null)},un=()=>{const U=(R==null?void 0:R.id)||(R==null?void 0:R._id);if(!U||!g[U])return null;const re=g[U],pe=Object.keys(re);if(pe.length===0)return null;const de=(L==null?void 0:L._id)||(L==null?void 0:L.id),K=pe.filter(_e=>String(_e)!==String(de));if(K.length===0)return null;if(R.type==="user")return"yozmoqda";{const _e=K.map(je=>{var Ne;const We=(Ne=R.members)==null?void 0:Ne.find(zt=>String(zt._id||zt.id)===String(je));return(We==null?void 0:We.nickname)||(We==null?void 0:We.username)||"Kimdir"});return _e.length===1?`${_e[0]} yozmoqda`:_e.length===2?`${_e[0]} va ${_e[1]} yozmoqdalar`:"Bir necha kishi yozmoqda"}},na=(U,re)=>{re.stopPropagation();const pe=[{id:200,name:"Ota"},{id:201,name:"Bob Smith"},{id:202,name:"Charlie Wilson"},{id:203,name:"Diana Brown"}];console.log("click",U,re);const de=pe.find(K=>K.name===U);de&&o&&o(`/a/${de.id}`)},wr=U=>{const re=U.split(" ");return re.length>=2?re[0][0]+re[re.length-1][0]:re[0].substring(0,2).toUpperCase()},Ni=U=>{const re=/@(\w+)/g,pe=/(https?:\/\/[^\s]+)/g,de=[];let K=0;const _e=[];let je;for(;(je=re.exec(U))!==null;)_e.push({type:"mention",index:je.index,length:je[0].length,username:je[1],content:je[0]});for(;(je=pe.exec(U))!==null;)_e.push({type:"url",index:je.index,length:je[0].length,url:je[0],content:je[0]});return _e.sort((We,Ne)=>We.index-Ne.index),_e.forEach(We=>{We.index>K&&de.push({type:"text",content:U.substring(K,We.index)}),de.push(We),K=We.index+We.length}),K<U.length&&de.push({type:"text",content:U.substring(K)}),de.length>0?de:[{type:"text",content:U}]},Zn=async(U,re)=>{re.stopPropagation();try{const pe=await f(U);if(console.log(pe,o,L),pe&&o){if(L&&pe.i_d===L._id){Xe.error("Siz o'zingiz bilan suhbat qura olmaysiz");return}const de=i.find(K=>!K.isGroup&&K.members&&K.members.some(_e=>_e._id===pe._id));if(de)de!=null&&de.isGroup?o(`/groups/${de.jammId}`):o(`/users/${de.jammId}`);else{const K=await x({isGroup:!1,memberIds:[pe._id]});console.log(K),K&&(K!=null&&K.isGroup?o(`/groups/${K==null?void 0:K.jammId}`):o(`/users/${K==null?void 0:K.jammId}`))}}else Xe.error("Bunday foydalanuvchi topilmadi")}catch(pe){console.error("Error handling mention click:",pe),Xe.error("Foydalanuvchini qidirishda xatolik yuz berdi")}},qi=U=>Ni(U).map((pe,de)=>pe.type==="mention"?n.jsx("span",{onClick:K=>Zn(pe.username,K),style:{pointerEvents:"auto",color:"var(--primary-color)",padding:"2px 4px",borderRadius:"4px",cursor:"pointer",fontWeight:"500"},onMouseEnter:K=>{K.target.style.backgroundColor="var(--active-color)"},onMouseLeave:K=>{K.target.style.backgroundColor="transparent"},children:pe.content},de):pe.type==="url"?n.jsx("a",{href:pe.url,target:"_blank",rel:"noopener noreferrer",style:{color:"var(--primary-color)",textDecoration:"none",borderBottom:"1px solid transparent",transition:"border-color 0.2s ease",cursor:"pointer"},onMouseEnter:K=>{K.target.style.borderBottomColor="var(--primary-color)"},onMouseLeave:K=>{K.target.style.borderBottomColor="transparent"},children:pe.content}):n.jsx("span",{children:pe.content},de)),Hi=["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😱","😭","😤","😠","😡","🤬","🤯","😳","🤪","😵","🥴","😵‍💫","🤯","🥶","🥵","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],Er=U=>{A(re=>re+U),Rt(!1),setTimeout(()=>{oe.current&&(oe.current.focus(),oe.current.setSelectionRange(oe.current.value.length,oe.current.value.length))},0)},Jo=U=>{U.stopPropagation(),Rt(!ur),ur&&setTimeout(()=>{oe.current&&(oe.current.focus(),oe.current.setSelectionRange(oe.current.value.length,oe.current.value.length))},0)},Ht=()=>{ot(null)},Ui=()=>{!W||!xe||V({_id:xe._id||xe.id,name:xe.nickname||xe.username||W.name,avatar:xe.avatar||W.avatar})},pn=async()=>{var re,pe;if(!(R!=null&&R.id))return;const U=R.isGroup&&R.createdBy!==(L==null?void 0:L._id);try{U?(await j(R.id),Xe.success("Guruhdan muvaffaqiyatli chiqdingiz")):(await w(R.id),Xe.success("Suhbat muvaffaqiyatli o'chirildi")),ae(!1),o("/chats")}catch(de){console.error(de),Xe.error(((pe=(re=de.response)==null?void 0:re.data)==null?void 0:pe.message)||(U?"Guruhdan chiqishda xatolik yuz berdi":"Suhbatni o'chirishda xatolik yuz berdi"))}};u.useEffect(()=>{const U=pe=>{Fe&&Ht()},re=pe=>{ur&&!pe.target.closest(".emoji-picker-container")&&!pe.target.closest(".emoji-button")&&Rt(!1)};return document.addEventListener("click",U),document.addEventListener("click",re),()=>{document.removeEventListener("click",U),document.removeEventListener("click",re)}},[Fe,ur]),u.useEffect(()=>{const U=re=>{Oe&&Le.current&&!Le.current.contains(re.target)&&Re(!1)};if(Oe)return document.addEventListener("mousedown",U),()=>{document.removeEventListener("mousedown",U)}},[Oe]),u.useEffect(()=>{const U=re=>{G&&!re.target.closest(".edit-input")&&(le(null),me(""))};if(G)return document.addEventListener("click",U),()=>{document.removeEventListener("click",U)}},[G]);const oa=(U=>{const re=[];let pe=null;return U.forEach(de=>{let K;if(de.date)K=de.date;else if(de.timestamp){const _e=new Date(de.timestamp);isNaN(_e.getTime())?K=xt().format("YYYY-MM-DD"):K=xt(_e).format("YYYY-MM-DD")}else K=xt().format("YYYY-MM-DD");K!==pe&&(pe=K,re.push({type:"date",date:K,messages:[]})),re.push({type:"message",...de,date:K})}),re})(Rn),Yi=U=>RE(U),eo=async U=>{if(U.key==="Enter"&&!U.shiftKey&&(U.preventDefault(),M.trim())){const re=M.trim(),pe=Q?Q.id:null;A(""),ie(null),setTimeout(()=>{oe.current&&oe.current.focus()},0);try{let de=R==null?void 0:R.id;if(!de&&(C==null?void 0:C.type)==="user"){const{createChat:K}=await Hd(async()=>{const{createChat:_e}=await Promise.resolve().then(()=>ah);return{createChat:_e}},void 0);de=await K({isGroup:!1,memberIds:[C.targetUserId]}),de&&o(`/users/${de}`)}if(de){const K=await d(de,re,pe);setTimeout(()=>Vr("smooth"),100),console.log("Message sent to backend:",K)}}catch(de){console.error("Failed to send message:",de)}}};return n.jsxs(TI,{children:[n.jsxs(_I,{children:[n.jsxs(RI,{children:[n.jsxs(PI,{onClick:()=>{["groups","users","a","chats"].includes(r)&&a(U=>!U)},style:{cursor:["groups","users","a","chats"].includes(r)?"pointer":"default"},children:[n.jsx(zh,{onClick:U=>{U.stopPropagation(),e()},children:n.jsx(nr,{size:20})}),n.jsx(MI,{$isSavedMessages:R==null?void 0:R.isSavedMessages,children:R!=null&&R.isSavedMessages?n.jsx(wx,{size:20,color:"white",fill:"white"}):((se=R==null?void 0:R.avatar)==null?void 0:se.length)>1?n.jsx("img",{src:R.avatar,alt:dn,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):dn.charAt(0).toUpperCase()}),n.jsxs(II,{children:[n.jsxs(AI,{children:[dn,(W==null?void 0:W.premiumStatus)==="active"&&n.jsx(zr,{width:16,height:16})]}),n.jsx(OI,{children:un()?n.jsxs(tA,{children:[n.jsxs("div",{className:"dots",children:[n.jsx("div",{className:"dot"}),n.jsx("div",{className:"dot"}),n.jsx("div",{className:"dot"})]}),un()]}):(W==null?void 0:W.type)==="group"?n.jsxs(n.Fragment,{children:[n.jsx(No,{size:14,style:{marginRight:4}}),((Ce=W==null?void 0:W.members)==null?void 0:Ce.length)||0," a'zo",X>0&&`, ${X} online`]}):W!=null&&W.isSavedMessages?n.jsx(n.Fragment,{children:"o'zim"}):["jamm","premium"].includes(W==null?void 0:W.username)?n.jsx(n.Fragment,{children:"Rasmiy"}):n.jsxs(n.Fragment,{children:[n.jsx(LI,{online:we}),ee]})})]})]}),n.jsxs(BI,{children:[(W==null?void 0:W.type)==="user"&&!(W!=null&&W.isSavedMessages)&&!["jamm","premium"].includes(W==null?void 0:W.username)&&n.jsx(zh,{onClick:()=>{we?Ui():Xe.error("Foydalanuvchi offline. Hozirda qo'ng'iroq qilib bo'lmaydi.")},disabled:!we,title:we?"Video qo'ng'iroq":"Foydalanuvchi offline",children:n.jsx(f4,{size:20})}),n.jsxs("div",{style:{position:"relative"},ref:Le,children:[!["jamm","premium"].includes(W==null?void 0:W.username)&&n.jsx(zh,{onClick:()=>Re(!Oe),children:n.jsx(q3,{size:20})}),Oe&&n.jsxs(DI,{children:[n.jsxs(qc,{onClick:()=>{Re(!1),a(!0)},children:[n.jsx(d4,{size:18}),(W==null?void 0:W.type)==="group"?"Guruh ma'lumotlari":"Foydalanuvchi ma'lumotlari"]}),(W==null?void 0:W.type)==="group"&&(()=>{var K,_e;const U=(L==null?void 0:L._id)||(L==null?void 0:L.id),re=R.createdBy===U,pe=(K=R.admins)==null?void 0:K.find(je=>(je.userId||je.id||je._id)===U);return re||pe&&((_e=pe.permissions)==null?void 0:_e.length)>0?n.jsxs(qc,{onClick:()=>{Re(!1),Y(!0)},children:[n.jsx(gl,{size:18}),"Guruhni tahrirlash"]}):null})(),n.jsx("div",{style:{height:"1px",background:"rgba(255, 255, 255, 0.1)",margin:"4px 8px"}}),W!=null&&W.isGroup&&(W==null?void 0:W.createdBy)!==(L==null?void 0:L._id)?n.jsxs(qc,{danger:!0,onClick:()=>{Re(!1),ae(!0)},children:[n.jsx(tm,{size:18}),"Guruhni tark etish"]}):n.jsxs(qc,{danger:!0,onClick:()=>{Re(!1),ae(!0)},children:[n.jsx(lr,{size:18}),"Suhbatni o'chirish"]})]})]})]})]}),n.jsx("div",{style:{display:"flex",flex:1,overflow:"hidden",position:"relative"},children:n.jsxs("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0},children:[n.jsxs(YI,{id:"scrollableChatArea",onContextMenu:U=>U.preventDefault(),children:[n.jsx(En,{dataLength:T.length,next:ke,style:{display:"flex",flexDirection:"column"},inverse:!1,hasMore:$,loader:n.jsx("h4",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)"},children:"Yuklanmoqda..."}),scrollableTarget:"scrollableChatArea",children:n.jsx(VI,{children:oa.map((U,re)=>{var _e;if(U.type==="date")return n.jsx(QI,{children:n.jsx("span",{children:Yi(U.date)})},`date-${re}`);const pe=L?L._id||L.id:null,de=U.senderId&&typeof U.senderId=="object"?U.senderId._id||U.senderId.id:U.senderId,K=pe&&de===pe;return n.jsx(WI,{"data-message-id":U.id,isOwn:K,onClick:()=>Qo(U),ref:je=>{Ge.current[U.id]=je},children:K?n.jsxs(n.Fragment,{children:[U.replayTo&&n.jsxs(_h,{onClick:je=>{je.stopPropagation();const Ne=T.find(zt=>zt.user===U.replayTo.user&&zt.content===U.replayTo.content);Ne&&qt(Ne.id)},children:[U.replayTo.user,' - "',U.replayTo.content,'"']}),n.jsx(tv,{isOwn:!0,onContextMenu:je=>{je.preventDefault(),je.stopPropagation(),Ko(U,je)},children:(G==null?void 0:G.id)===U.id?n.jsx(ov,{children:n.jsx(nv,{className:"edit-input",type:"text",value:ue,onChange:je=>me(je.target.value),onKeyDown:Fi,placeholder:"Xabarni tahrirlang...",maxLength:400,autoFocus:!0})}):n.jsxs(n.Fragment,{children:[n.jsx(rv,{isOwn:!0,children:qi(U.content)}),U.edited&&n.jsx(iv,{children:"(tahrirlandi)"})]})}),n.jsxs(ev,{isOwn:!0,children:[n.jsx("span",{children:U.timestamp}),!U.isDeleted&&n.jsx("span",{style:{marginLeft:"4px",display:"flex",alignItems:"center"},children:U.readBy&&U.readBy.length>0?n.jsx(S3,{size:14,color:"#4ade80"}):n.jsx(tn,{size:14,color:"#72767d"})})]})]}):n.jsxs(n.Fragment,{children:[(W==null?void 0:W.type)==="group"&&n.jsx(ev,{isOwn:!1,children:n.jsx("div",{style:{flex:1,marginLeft:"40px"},children:n.jsxs(KI,{children:[U.user,((_e=U.senderId)==null?void 0:_e.premiumStatus)==="active"&&n.jsx(zr,{width:14,height:14})]})})}),U.replayTo&&n.jsxs(_h,{onClick:je=>{je.stopPropagation();const Ne=T.find(zt=>zt.user===U.replayTo.user&&zt.content===U.replayTo.content);Ne&&qt(Ne.id)},children:[U.replayTo.user,' - "',U.replayTo.content,'"']}),n.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[r==="groups"&&n.jsx(JI,{onClick:je=>na(U.user,je),children:wr(U.user)}),n.jsx(tv,{isOwn:!1,onContextMenu:je=>{je.preventDefault(),je.stopPropagation(),Ko(U,je)},children:(G==null?void 0:G.id)===U.id?n.jsx(ov,{children:n.jsx(nv,{className:"edit-input",type:"text",value:ue,onChange:je=>me(je.target.value),onKeyDown:Fi,placeholder:"Xabarni tahrirlang...",maxLength:400,autoFocus:!0})}):n.jsxs(n.Fragment,{children:[n.jsx(rv,{isOwn:!1,children:qi(U.content)}),U.edited&&n.jsx(iv,{children:"(tahrirlandi)"})]})})]})]})},U.id)})})}),n.jsx("div",{ref:at})]}),n.jsx(eA,{children:C&&!R&&C.type!=="user"?n.jsxs("div",{style:{padding:"20px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},children:[n.jsx("div",{style:{color:"var(--text-muted-color)"},children:"Siz ushbu guruh a'zosi emassiz"}),n.jsx("button",{onClick:async()=>{try{await b(C.privateurl||C.jammId),o(`/groups/${C.jammId||C.privateurl}`,{replace:!0})}catch(U){Xe.error(U.message||"Xatolik yuz berdi")}},style:{background:"#5865F2",color:"white",border:"none",padding:"10px 24px",borderRadius:"6px",cursor:"pointer",fontWeight:600,fontSize:"14px"},children:"Guruhga qo'shilish"})]}):n.jsxs(n.Fragment,{children:[Q&&n.jsx(_h,{onClick:()=>{qt(Q.id)},children:n.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[n.jsxs("div",{children:[n.jsx("strong",{style:{color:"#7289da"},children:Q.user}),n.jsx("div",{style:{fontSize:"12px",opacity:.8,marginTop:"2px"},children:Q.content})]}),n.jsx("span",{className:"replay-close",onClick:U=>{U.stopPropagation(),ie(null)},children:"✕"})]})}),n.jsxs(rA,{children:[n.jsxs(nA,{children:[n.jsx(sv,{children:n.jsx(Et,{size:20})}),n.jsx(sv,{onClick:Jo,className:"emoji-button",children:n.jsx(J3,{size:20})})]}),n.jsx(oA,{id:"message-input",ref:oe,value:M,onChange:Ct,onKeyDown:eo,placeholder:"Xabar...",rows:1,maxLength:400})]}),ur&&n.jsx(XI,{className:"emoji-picker-container",style:{position:"fixed",bottom:"100px",right:"40px",backgroundColor:"#36393f",border:"3px solid #7289da",borderRadius:"12px",padding:"16px",boxShadow:"0 12px 24px rgba(0, 0, 0, 0.6)",zIndex:9999,display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"6px",maxWidth:"360px",maxHeight:"240px",overflowY:"auto"},children:Hi.map((U,re)=>n.jsx(ZI,{onClick:()=>Er(U),style:{background:"none",border:"none",fontSize:"24px",cursor:"pointer",padding:"8px",borderRadius:"6px",minWidth:"32px",minHeight:"32px",display:"flex",alignItems:"center",justifyContent:"center"},children:U},re))})]})})]})}),Fe&&n.jsxs(GI,{style:{left:`${Fe.x}px`,top:`${Fe.y}px`},onClick:U=>U.stopPropagation(),onContextMenu:U=>{U.preventDefault(),U.stopPropagation()},children:[n.jsxs($h,{onClick:()=>Se("replay",Fe.message),children:[n.jsx(W3,{size:16})," Javob yozish"]}),(()=>{var K,_e;if(!L||!Fe.message)return null;const U=L._id||L.id,pe=(Fe.message.senderId&&typeof Fe.message.senderId=="object"?Fe.message.senderId._id||Fe.message.senderId.id:Fe.message.senderId)===U;let de=!1;if(!pe&&(R==null?void 0:R.type)==="group"){const je=R.createdBy===U,We=(K=R.admins)==null?void 0:K.find(Ne=>(Ne.userId||Ne.id||Ne._id)===U);de=je||We&&((_e=We.permissions)==null?void 0:_e.includes("delete_others_messages"))}return!pe&&!de?null:n.jsxs(n.Fragment,{children:[pe&&n.jsxs($h,{onClick:()=>Se("edit",Fe.message),children:[n.jsx(gl,{size:16})," Tahrirlash"]}),n.jsxs($h,{onClick:()=>Se("delete",Fe.message),$danger:!0,children:[n.jsx(lr,{size:16})," O'chirish"]})]})})()]})]}),s&&R&&n.jsxs(iA,{children:[n.jsxs(sA,{children:[n.jsx(av,{onClick:()=>a(!1),children:n.jsx(nt,{size:20})}),n.jsx("span",{style:{flex:1,textAlign:"center"},children:R.type==="user"?"Foydalanuvchi haqida":"Guruh ma'lumotlari"}),R.type==="group"?(()=>{var K,_e;const U=(L==null?void 0:L._id)||(L==null?void 0:L.id),re=R.createdBy===U,pe=(K=R.admins)==null?void 0:K.find(je=>(je.userId||je.id||je._id)===U);return re||pe&&((_e=pe.permissions)==null?void 0:_e.length)>0?n.jsx(av,{onClick:()=>Y(!0),children:n.jsx(gl,{size:18})}):n.jsx("div",{style:{width:28}})})():n.jsx("div",{style:{width:28}})]}),n.jsxs(aA,{children:[n.jsxs(lA,{children:[n.jsx(cA,{style:R!=null&&R.isSavedMessages?{background:"#0288D1"}:{},children:R!=null&&R.isSavedMessages?n.jsx(wx,{size:40,color:"white",fill:"white"}):(($e=R==null?void 0:R.avatar)==null?void 0:$e.length)>1?n.jsx("img",{src:R.avatar,alt:R.name}):R.name.charAt(0)}),n.jsx(dA,{style:{fontSize:"22px",margin:"0 0 6px"},children:R.name}),n.jsx(uA,{style:{fontSize:"14px"},children:R.type==="user"?(()=>{var pe;const U=(pe=R.members)==null?void 0:pe.find(de=>{const K=de._id||de.id;return K!==(L==null?void 0:L.id)&&K!==(L==null?void 0:L._id)}),re=(U==null?void 0:U._id)||(U==null?void 0:U.id);return re?n.jsx("span",{style:{color:D(re)?"var(--primary-color)":"var(--text-muted-color)"},children:D(re)?"Online":U.lastSeen||U.lastActive?`Oxirgi marta: ${xt(U.lastSeen||U.lastActive).format("HH:mm")}`:"Offline"}):null})():n.jsxs(n.Fragment,{children:[((dt=R.members)==null?void 0:dt.length)||0," a'zo",X>0&&` · ${X} online`]})})]}),R.type==="user"&&!(R!=null&&R.isSavedMessages)&&n.jsx(Ky,{children:(()=>{var re;const U=(re=R.members)==null?void 0:re.find(pe=>{const de=pe._id||pe.id;return String(de)!==String((L==null?void 0:L.id)||(L==null?void 0:L._id))});return U?n.jsxs(n.Fragment,{children:[n.jsxs(Ca,{children:[n.jsx(za,{children:"foydalanuvchi nomi"}),n.jsxs(Jy,{style:{color:"#0088cc",fontWeight:"500"},onClick:()=>{U.username&&(navigator.clipboard.writeText(`@${U.username}`),Xe.success("Nusxa olindi!"))},children:[n.jsxs("span",{children:["@",U.username||"user"]}),n.jsx(Do,{size:20,style:{color:"#0088cc"}})]})]}),U.bio&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{height:"1px",backgroundColor:"var(--border-color)",margin:"0 -16px"}}),n.jsxs(Ca,{children:[n.jsx(za,{children:"tarjimayi hol"}),n.jsx(Ch,{children:n.jsx(Xy,{text:U.bio})})]})]}),U.jammId&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{height:"1px",backgroundColor:"var(--border-color)",margin:"0 -16px"}}),n.jsxs(Ca,{children:[n.jsx(za,{children:"jamm id"}),n.jsxs(Ch,{children:["#",U.jammId]})]})]})]}):null})()}),R.type==="group"&&n.jsxs(Ky,{children:[((W==null?void 0:W.privateurl)||(W==null?void 0:W.urlSlug))&&n.jsxs(Ca,{children:[n.jsx(za,{children:"havolani ulashish"}),n.jsxs(Jy,{onClick:()=>Yr(W.privateurl||W.urlSlug),children:[n.jsxs("span",{children:[window.location.origin,"/",W.privateurl||W.urlSlug]}),n.jsx(Do,{size:20,style:{color:"var(--text-muted-color)"}})]})]}),R.description&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{height:"1px",backgroundColor:"var(--border-color)",margin:"0 -16px"}}),n.jsxs(Ca,{children:[n.jsx(za,{children:"tasnif"}),n.jsxs(Ch,{children:[n.jsx(Xy,{text:!st&&R.description.length>100?R.description.substring(0,100)+"...":R.description}),R.description.length>100&&n.jsx(EI,{onClick:()=>ze(!st),children:st?"yopish":"yana"})]})]})]})]}),(W==null?void 0:W.type)==="group"&&n.jsxs(pA,{children:[n.jsx(hA,{children:"A'zolar"}),n.jsxs(fA,{children:[(W==null?void 0:W.members)&&W.members.map(U=>{var K;const re=typeof U=="object"?U:null;if(!re)return null;const pe=re._id||re.id,de=re.name||re.nickname||re.username||"Foydalanuvchi";return n.jsxs(xA,{onClick:()=>H(re),children:[n.jsx(gA,{children:((K=re.avatar)==null?void 0:K.length)>1?n.jsx("img",{src:re.avatar,alt:de,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):de.charAt(0)}),n.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[n.jsxs("span",{style:{fontSize:"14px",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px"},children:[de,re.premiumStatus==="active"&&n.jsx(zr,{width:12,height:12})]}),n.jsx("span",{style:{fontSize:"12px",color:D(pe)?"var(--primary-color)":"var(--text-muted-color)"},children:D(pe)?"Online":re.lastSeen||re.lastActive?`Oxirgi marta: ${xt(re.lastSeen||re.lastActive).format("HH:mm")}`:"Offline"})]}),(()=>{var We;const _e=(We=R.admins)==null?void 0:We.some(Ne=>(Ne.userId||Ne.id||Ne._id)===pe);return R.createdBy===pe?n.jsx(Qy,{children:"Ega"}):_e?n.jsx(Qy,{children:"Admin"}):null})()]},pe)}),(!(W!=null&&W.members)||W.members.length===0)&&n.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)"},children:"A'zolar ro'yxati mavjud emas"})]})]})]})]}),n.jsx(XS,{}),n.jsx(pI,{isOpen:J,onClose:()=>Y(!1),group:R,users:i.filter(U=>U.type==="user"&&!U.isSavedMessages).map(U=>{var pe;const re=(pe=U.members)==null?void 0:pe.find(de=>(de._id||de.id)!==((L==null?void 0:L._id)||(L==null?void 0:L.id)));return{...re,id:(re==null?void 0:re._id)||(re==null?void 0:re.id),name:(re==null?void 0:re.nickname)||(re==null?void 0:re.username)||"Noma'lum"}}).filter(U=>U.id),onSave:async U=>{console.log(U);try{await S(R.id||R._id,U)}catch(re){console.error("Guruhni tahrirlashda xatolik",re)}}}),qe&&n.jsx(FI,{onClick:()=>ae(!1),children:n.jsxs(NI,{onClick:U=>U.stopPropagation(),children:[n.jsx(qI,{children:R!=null&&R.isGroup&&(R==null?void 0:R.createdBy)!==(L==null?void 0:L._id)?"Guruhni tark etish":"Suhbatni o'chirish"}),n.jsx(HI,{children:R!=null&&R.isGroup&&(R==null?void 0:R.createdBy)!==(L==null?void 0:L._id)?"Siz haqiqatan ham ushbu guruhni tark etmoqchimisiz?":"Siz haqiqatan ham ushbu suhbatni o'chirib tashlamoqchimisiz? Bu amal barcha xabarlarni ikkala tomon uchun ham o'chirib yuboradi."}),n.jsxs(UI,{children:[n.jsx(Zy,{onClick:()=>ae(!1),children:"Bekor qilish"}),n.jsx(Zy,{danger:!0,onClick:pn,children:R!=null&&R.isGroup&&(R==null?void 0:R.createdBy)!==(L==null?void 0:L._id)?"Chiqish":"O'chirish"})]})]})})]})},yA=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,vA=et`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,bA=l.div`
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
  padding: 20px;
  animation: ${yA} 0.18s ease-out;
`,wA=l.div`
  background-color: var(--secondary-color);
  width: min(100%, 520px);
  height: min(86vh, 760px);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  animation: ${vA} 0.22s ease-out;

  @media (max-width: 640px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`,kA=l.div`
  padding: 24px 24px 20px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid var(--border-color);
`,jA=l.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,SA=l.p`
  color: var(--text-muted-color);
  font-size: 14px;
`;l.button`
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
`;const CA=l.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,lv=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Th=l.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
`,Eh=l.input`
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
`,zA=l.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,$A=l.div`
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
`,_A=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,TA=l.div`
  position: relative;
  margin-bottom: 8px;
`,EA=l.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--tertiary-color);
`,RA=l.div`
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
`,PA=l.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,MA=l.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,IA=l.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
`,AA=l.div`
  background-color: var(--tertiary-color);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--border-color);
`,cv=l.button`
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
`,OA=({isOpen:e,onClose:t,onCreate:r,users:o=[]})=>{const[i,s]=u.useState(""),[a,c]=u.useState(""),[d,p]=u.useState(""),[h,f]=u.useState([]),[x,S]=u.useState(""),m=u.useRef(null),b=pP({onSuccess:g=>p(g),onError:()=>toast.error("Rasm yuklashda xatolik yuz berdi")});if(!e)return null;const w=()=>{i.trim()&&(r({name:i,description:a,image:d,members:h}),s(""),c(""),p(""),f([]),t())},j=g=>{if(h.includes(g))f(h.filter(k=>k!==g));else{if(h.length>=39){toast.error("Guruhga maksimal 40ta odam qo'shish mumkin");return}f([...h,g])}},v=o.filter(g=>g.name.toLowerCase().includes(x.toLowerCase())&&g.type==="user"&&!g.isSavedMessages&&x.trim()!==""),y=g=>{var _;const k=(_=g.target.files)==null?void 0:_[0];if(!k)return;if(k.size>2*1024*1024){toast.error("Fayl hajmi juda katta (maksimum 2MB)");return}const C=new FormData;C.append("file",k),b.mutate(C)};return n.jsx(bA,{onClick:t,children:n.jsxs(wA,{onClick:g=>g.stopPropagation(),children:[n.jsxs(kA,{children:[n.jsx(jA,{children:"Guruh yaratish"}),n.jsx(SA,{children:"Do'stlaringiz bilan muloqot qiling"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(CA,{children:[n.jsxs(zA,{children:[n.jsx("input",{type:"file",ref:m,style:{display:"none"},accept:"image/*",onChange:y}),n.jsx($A,{onClick:()=>{m.current&&m.current.click()},children:b.isPending?n.jsx(Ii,{size:24,style:{animation:"spin 1s linear infinite"}}):d?n.jsx("img",{src:d,alt:"Group"}):n.jsxs(n.Fragment,{children:[n.jsx(sm,{size:24}),n.jsx("span",{children:"UPLOAD"})]})})]}),n.jsxs(lv,{children:[n.jsx(Th,{children:"Guruh nomi"}),n.jsx(Eh,{placeholder:"Yangi guruh",value:i,onChange:g=>s(g.target.value.slice(0,Pe.groupNameChars)),maxLength:Pe.groupNameChars,autoFocus:!0})]}),n.jsxs(lv,{children:[n.jsx(Th,{children:"Guruh haqida (ixtiyoriy)"}),n.jsx(Eh,{placeholder:"Guruh maqsadini yozing...",value:a,onChange:g=>c(g.target.value.slice(0,Pe.groupDescriptionChars)),maxLength:Pe.groupDescriptionChars})]}),n.jsxs(_A,{children:[n.jsxs(Th,{children:["Ishtirokchilar (",h.length,"/40)"]}),n.jsxs(TA,{children:[n.jsx(Eh,{placeholder:"User qidirish...",value:x,onChange:g=>S(g.target.value),style:{paddingLeft:30}}),n.jsx(rc,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),x.trim()!==""&&n.jsx(EA,{children:v.length===0?n.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):v.map(g=>n.jsxs(RA,{selected:h.includes(g.id),onClick:()=>j(g.id),children:[n.jsxs(PA,{children:[n.jsx(MA,{children:g.avatar||g.name.charAt(0)}),n.jsx(IA,{children:g.name})]}),h.includes(g.id)&&n.jsx(tn,{size:16,color:"var(--primary-color)"})]},g.id))})]})]}),n.jsxs(AA,{children:[n.jsx(cv,{onClick:t,children:"Bekor qilish"}),n.jsx(cv,{primary:!0,onClick:w,disabled:!i.trim(),children:"Guruh yaratish"})]})]})})},LA=l.div`
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
`,BA=l.div`
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
`,DA=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,FA=l.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`;l.button`
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
`;const NA=l.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,ZS=l.div`
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
`,qA=l.div`
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

  ${ZS}:hover & {
    opacity: 1;
  }
`,HA=l.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`,UA=l.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,Qi=l.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ki=l.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,Rh=l.input`
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
`,YA=l.textarea`
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
`,VA=l.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,dv=l.button`
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
`,WA=({isOpen:e,onClose:t,onCreated:r,onOpenPremium:o})=>{const{createCourse:i}=ra(),[s,a]=u.useState(""),[c,d]=u.useState(""),[p,h]=u.useState(""),[f,x]=u.useState("IT"),[S,m]=u.useState(0),[b,w]=u.useState("free_request");u.useRef(null);const[j,v]=u.useState(""),[y,g]=u.useState(!1);if(!e)return null;const k=async()=>{if(s.trim()){v(""),g(!0);try{const z=await i(s.trim(),c.trim(),p,f,S,b);a(""),d(""),h(""),x("IT"),m(0),w("free_request"),r(z)}catch(z){z.message.includes("Premium")||z.message.includes("maksimal")?(t(),o&&o()):v(z.message||"Kurs yaratishda xatolik yuz berdi")}finally{g(!1)}}},C=z=>{h(z.target.value)},_=z=>{z.key==="Escape"&&t()};return n.jsx(LA,{onClick:t,onKeyDown:_,children:n.jsxs(BA,{onClick:z=>z.stopPropagation(),children:[n.jsxs(DA,{children:[n.jsx(FA,{children:"Yangi kurs yaratish"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(NA,{children:[n.jsx(ZS,{hasImage:!!p,children:p?n.jsxs(n.Fragment,{children:[n.jsx(HA,{src:p,alt:"Course",onError:()=>h("")}),n.jsx(qA,{children:"Rasmni o'zgartirish"})]}):n.jsxs(n.Fragment,{children:[n.jsx(Cx,{size:32,color:"var(--text-muted-color)"}),n.jsx(UA,{children:"Kurs uchun rasm URL kiriting"})]})}),n.jsxs(Qi,{children:[n.jsx(Ki,{children:"Rasm URL (ixtiyoriy)"}),n.jsx(Rh,{type:"url",placeholder:"https://example.com/image.jpg",value:p,onChange:C})]}),n.jsxs(Qi,{children:[n.jsx(Ki,{children:"Kurs nomi *"}),n.jsx(Rh,{type:"text",placeholder:"Masalan: React Asoslari",value:s,onChange:z=>a(z.target.value.slice(0,Pe.courseNameChars)),maxLength:Pe.courseNameChars,autoFocus:!0})]}),n.jsxs(Qi,{children:[n.jsx(Ki,{children:"Kategoriya"}),n.jsxs("select",{value:f,onChange:z=>x(z.target.value),style:{padding:"10px 14px",backgroundColor:"var(--input-color)",color:"var(--text-color)",border:"none",borderRadius:"8px",outline:"none"},children:[n.jsx("option",{value:"IT",children:"IT & Dasturlash"}),n.jsx("option",{value:"SMM",children:"SMM & Marketing"}),n.jsx("option",{value:"Til o'rganish",children:"Til o'rganish"}),n.jsx("option",{value:"Mobile",children:"Mobil Dasturlash"}),n.jsx("option",{value:"Design",children:"Dizayn"})]})]}),n.jsxs(Qi,{children:[n.jsx(Ki,{children:"Ruxsat turi"}),n.jsxs("select",{value:b,onChange:z=>w(z.target.value),style:{padding:"10px 14px",backgroundColor:"var(--input-color)",color:"var(--text-color)",border:"none",borderRadius:"8px",outline:"none"},children:[n.jsx("option",{value:"free_request",children:"Ruxsat so'rab (Tekin)"}),n.jsx("option",{value:"free_open",children:"Ruxsatsiz ochiq (Tekin)"}),n.jsx("option",{value:"paid",children:"Pullik"})]})]}),b==="paid"&&n.jsxs(Qi,{children:[n.jsx(Ki,{children:"Narxi (UZS)"}),n.jsx(Rh,{type:"number",min:"0",placeholder:"Masalan: 500000",value:S,onChange:z=>m(Number(z.target.value))})]}),n.jsxs(Qi,{children:[n.jsx(Ki,{children:"Tavsif"}),n.jsx(YA,{placeholder:"Kurs haqida qisqacha ma'lumot...",value:c,onChange:z=>d(z.target.value.slice(0,Pe.courseDescriptionChars)),maxLength:Pe.courseDescriptionChars})]}),j&&n.jsx("div",{style:{color:"#ef4444",fontSize:"14px",marginTop:"8px"},children:j})]}),n.jsxs(VA,{children:[n.jsx(dv,{$variant:"secondary",onClick:t,disabled:y,children:"Bekor qilish"}),n.jsx(dv,{$variant:"primary",onClick:k,disabled:!s.trim()||y,children:y?"Yaratilmoqda...":"Yaratish"})]})]})})},GA=l.div`
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
`,QA=l.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  height: 56ppx;
  align-items: center;
  justify-content: space-between;
`;l.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;l.button`
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
`;const KA=l.div`
  display: flex;
  padding: 16px 16px 0 16px;
  gap: 8px;
`,uv=l.button`
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
`,JA=l(ym)`
  flex: 1;
  min-width: 0;
  margin-right: 12px;
`,pv=l.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`,$a=l.div`
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
`,_a=l.div`
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
`,Ta=l.div`
  flex: 1;
  min-width: 0;
`,Ea=l.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Ra=l.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,XA=l.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`,ZA=l.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted-color);
`;l.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;const eO=l.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;

  ${e=>{switch(e.status){case"admin":return"background: rgba(88, 101, 242, 0.15); color: var(--primary-color);";case"approved":return"background: rgba(67, 181, 129, 0.15); color: var(--success-color);";case"pending":return"background: rgba(250, 166, 26, 0.15); color: var(--warning-color);";default:return"background: var(--input-color); color: var(--text-muted-color);"}}}
`,tO=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  gap: 12px;
`,rO=l.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`,nO=({selectedCourse:e,onSelectCourse:t,onOpenPremium:r,viewMode:o="courses",onToggleViewMode:i,activeArenaTab:s,setActiveArenaTab:a})=>{console.log(e);const c=Qt(),{courses:d,loading:p,coursesPage:h,coursesHasMore:f,isAdmin:x,isEnrolled:S,removeCourse:m,fetchCourses:b,ensureCoursesLoaded:w}=ra(),[j,v]=u.useState("");Qe.useEffect(()=>{o==="courses"&&w()},[w,o]);const[y,g]=u.useState(!1),[k,C]=u.useState(null),[_,z]=u.useState(!1),D=Qe.useMemo(()=>j?d.filter(M=>M.name.toLowerCase().includes(j.toLowerCase())||M.description.toLowerCase().includes(j.toLowerCase())):d.filter(M=>{const A=S(M._id);return A==="admin"||A==="approved"||A==="pending"}),[d,j,S]),B=M=>{switch(S(M)){case"admin":return{text:"Admin",icon:null};case"approved":return{text:"A'zo",icon:n.jsx(rn,{size:10})};case"pending":return{text:"Kutilmoqda",icon:n.jsx(Pi,{size:10})};default:return null}},V=M=>{t(M._id);const A=M.urlSlug||M._id;window.history.replaceState(null,"",`/courses/${A}`)},R=async()=>{if(k)try{z(!0),await m(k._id),e===k._id&&(t(null),window.history.replaceState(null,"","/courses")),C(null)}catch(M){console.error(M),toast.error("Kursni o'chirishda xatolik yuz berdi")}finally{z(!1)}};return n.jsxs(n.Fragment,{children:[n.jsxs(GA,{children:[n.jsxs(KA,{children:[n.jsxs(uv,{active:o==="courses",onClick:()=>{i&&i("courses"),c("/courses")},children:[n.jsx($n,{size:16})," Kurslar"]}),n.jsxs(uv,{active:o==="arena",onClick:()=>{i&&i("arena"),t(null),c("/arena")},children:[n.jsx(ku,{size:16})," Maydon"]})]}),o==="arena"?n.jsxs(pv,{style:{paddingTop:"16px"},children:[n.jsxs($a,{active:s==="tests",onClick:()=>{a&&a("tests"),c("/arena/quiz")},children:[n.jsx(_a,{gradient:"linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",children:n.jsx($n,{size:20,color:"white"})}),n.jsxs(Ta,{children:[n.jsx(Ea,{children:"Testlar"}),n.jsx(Ra,{children:"Ochiq testlarni ishlash"})]})]}),n.jsxs($a,{active:s==="flashcards",onClick:()=>{a&&a("flashcards"),c("/arena/flashcard")},children:[n.jsx(_a,{gradient:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",children:n.jsx(A3,{size:20,color:"white"})}),n.jsxs(Ta,{children:[n.jsx(Ea,{children:"Flashcards"}),n.jsx(Ra,{children:"Lug'atlarni yodlash"})]})]}),n.jsxs($a,{active:s==="sentenceBuilders",onClick:()=>{a&&a("sentenceBuilders"),c("/arena/sentence-builder")},children:[n.jsx(_a,{gradient:"linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)",children:n.jsx(m4,{size:20,color:"white"})}),n.jsxs(Ta,{children:[n.jsx(Ea,{children:"Gap tuzish"}),n.jsx(Ra,{children:"Bo'laklardan gap yig'ish"})]})]}),n.jsxs($a,{active:s==="battles",onClick:()=>{a&&a("battles"),c("/arena/battle")},children:[n.jsx(_a,{gradient:"linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",children:n.jsx(ku,{size:20,color:"white"})}),n.jsxs(Ta,{children:[n.jsx(Ea,{children:"Bilimlar bellashuvi"}),n.jsx(Ra,{children:"Real vaqt musobaqa"})]})]})]}):n.jsxs(n.Fragment,{children:[n.jsxs(QA,{children:[n.jsx(JA,{type:"text",placeholder:"Kurslarni qidirish...",value:j,onChange:M=>v(M.target.value)}),n.jsx(Je,{onClick:()=>g(!0),title:"Yangi kurs yaratish",children:n.jsx(Et,{size:18})})]}),n.jsx(pv,{id:"sidebarCoursesArea",children:p?null:D.length===0?n.jsxs(tO,{children:[n.jsx(rO,{children:n.jsx(Fo,{size:24})}),n.jsx("span",{children:"Hozircha kurslar yo'q"}),n.jsx("span",{style:{fontSize:12},children:"Yangi kurs yaratish uchun + tugmasini bosing"})]}):n.jsx(En,{dataLength:D.length,next:()=>b(h+1),hasMore:f&&!j,loader:n.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Yuklanmoqda..."}),endMessage:D.length>0&&!j?n.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Barcha kurslar ko'rsatildi."}):null,scrollableTarget:"sidebarCoursesArea",style:{display:"flex",flexDirection:"column",overflow:"visible"},children:D.map(M=>{const A=B(M._id),O=(M.members||[]).filter(T=>T.status==="approved").length;return n.jsxs($a,{active:e===M._id||e===M.urlSlug,onClick:()=>V(M),children:[n.jsx(_a,{src:M.image,gradient:M.gradient,children:!M.image&&M.name.charAt(0)}),n.jsxs(Ta,{children:[n.jsx(Ea,{children:M.name}),n.jsxs(Ra,{children:[(M.lessons||[]).length>0?`${M.lessons.length} ta dars`:"Hali dars yo'q",A&&n.jsxs(eO,{status:S(M._id),children:[A.icon,A.text]})]})]}),n.jsxs(XA,{children:[n.jsxs(ZA,{children:[n.jsx(No,{size:12}),O]}),x(M._id)&&n.jsx("div",{onClick:T=>{T.stopPropagation(),C(M)},style:{color:"var(--text-muted-color)",cursor:"pointer",padding:"2px",borderRadius:"4px",display:"flex"},onMouseOver:T=>{T.currentTarget.style.color="var(--danger-color)",T.currentTarget.style.backgroundColor="rgba(239, 68, 68, 0.1)"},onMouseOut:T=>{T.currentTarget.style.color="var(--text-muted-color)",T.currentTarget.style.backgroundColor="transparent"},title:"Kursni o'chirish",children:n.jsx(lr,{size:14})})]})]},M._id)})})})]})]}),n.jsx(WA,{isOpen:y,onClose:()=>g(!1),onCreated:M=>{g(!1);const A=d.find(O=>O._id===M);A?V(A):t(M)},onOpenPremium:r}),n.jsx(Di,{isOpen:!!k,onClose:()=>C(null),title:"Kursni o'chirish",description:n.jsxs(n.Fragment,{children:["Rostdan ham ",n.jsx("b",{children:k==null?void 0:k.name})," kursni o'chirmoqchimisiz? Bu amalni keyin tiklab bo'lmaydi va kursga tegishli barcha videolar, fayllar va ma'lumotlar o'chib ketadi."]}),confirmText:_?"O'chirilmoqda...":"Ha, o'chirish",cancelText:"Yo'q, qolsin",onConfirm:R,isDanger:!0})]})},oO=l.div`
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
`,iO=l.div`
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
`,sO=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
`,aO=l.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`;l.button`
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
`;const lO=l.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Pa=l.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ma=l.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,hv=l.input`
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
`,cO=l.textarea`
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
`,dO=l.div`
  display: flex;
  background-color: var(--input-color);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
  padding: 4px;
  gap: 4px;
`,fv=l.button`
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
`,uO=l.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,pO=l.label`
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
`,hO=l.input`
  display: none;
`,fO=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--input-color);
  border-radius: 8px;
  border: 1px solid var(--primary-color);
`,xO=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
`,gO=l.span`
  color: var(--text-muted-color);
  font-size: 12px;
`,mO=l.button`
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
`,yO=l.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--input-color);
  border: 1px solid var(--border-color);
  display: grid;
  gap: 8px;
`,vO=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
`,bO=l.div`
  color: var(--text-muted-color);
  font-size: 12px;
`,wO=l.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border-color) 72%, transparent);
  overflow: hidden;
`,kO=l.div`
  width: ${e=>e.$width||"0%"};
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.18s ease;
`,jO=l.div`
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,xv=l.button`
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
`,SO=({isOpen:e,onClose:t,courseId:r})=>{const{addLesson:o}=ra(),i=Ie(T=>T.user),s=(i==null?void 0:i.premiumStatus)==="active",[a,c]=u.useState(""),[d,p]=u.useState(s?"upload":"url"),[h,f]=u.useState(""),[x,S]=u.useState(null),[m,b]=u.useState(""),[w,j]=u.useState(!1),[v,y]=u.useState(0),[g,k]=u.useState(0),[C,_]=u.useState(0),[z,D]=u.useState("idle"),B=u.useRef(null);if(u.useEffect(()=>{e&&p(s?"upload":"url")},[e,s]),!e)return null;const V=T=>{T.target.files&&T.target.files[0]&&(S(T.target.files[0]),y(0),k(0),_(T.target.files[0].size||0),D("idle"))},R=()=>{S(null),y(0),k(0),_(0),D("idle"),B.current&&(B.current.value="")},M=T=>{if(T===0)return"0 Bytes";const F=1024,P=["Bytes","KB","MB","GB"],q=Math.floor(Math.log(T)/Math.log(F));return parseFloat((T/Math.pow(F,q)).toFixed(2))+" "+P[q]},A=()=>!(!a.trim()||d==="url"&&!h.trim()||d==="upload"&&!x),O=async()=>{if(!(!A()||w)){j(!0),D(d==="upload"?"uploading":"saving"),y(0),k(0),_((x==null?void 0:x.size)||0);try{let T="",F="",P=0,q="",$="direct",E=[],I="video";if(d==="upload"&&x&&s){const N=new FormData;N.append("file",x);const{data:J}=await fe.post("/courses/upload-media",N,{onUploadProgress:Y=>{const L=Y.total||x.size||0,H=Y.loaded||0,Q=L?Math.min(100,Math.round(H/L*100)):0;D(Q>=100?"processing":"uploading"),_(L),k(H),y(Q)}});$=J.streamType||"direct",T=J.url||"",q=J.manifestUrl||"",F=J.fileName,P=J.fileSize,E=Array.isArray(J.assetKeys)?J.assetKeys:[],I="file"}else D("saving"),q=h.trim(),I="video";D("saving"),await o(r,a.trim(),q,m.trim(),I,T,F,P,$,E),c(""),f(""),S(null),b(""),p(s?"upload":"url"),y(0),k(0),_(0),D("idle"),t()}catch(T){console.error(T),Xe.error("Yuklashda xatolik yuz berdi")}finally{j(!1),z!=="idle"&&D("idle")}}};return n.jsx(oO,{onClick:t,children:n.jsxs(iO,{onClick:T=>T.stopPropagation(),children:[n.jsxs(sO,{children:[n.jsx(aO,{children:"Yangi dars qo'shish"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(lO,{children:[n.jsxs(Pa,{children:[n.jsx(Ma,{children:"Dars nomi *"}),n.jsx(hv,{type:"text",placeholder:"Masalan: React Hooks asoslari",value:a,onChange:T=>c(T.target.value.slice(0,Pe.lessonTitleChars)),maxLength:Pe.lessonTitleChars,autoFocus:!0})]}),n.jsxs(Pa,{children:[n.jsx(Ma,{children:"Video/Fayl manbasi *"}),s?n.jsxs(dO,{children:[n.jsx(fv,{active:d==="upload",onClick:()=>p("upload"),type:"button",children:"Fayl yuklash (Max 100MB)"}),n.jsx(fv,{active:d==="url",onClick:()=>p("url"),type:"button",children:"YouTube URL"})]}):n.jsx("div",{style:{padding:"8px",background:"rgba(251, 191, 36, 0.1)",color:"#fbbf24",borderRadius:"8px",fontSize:"13px",marginBottom:"8px"},children:"Fayl yuklash uchun Premium obuna talab qilinadi. Bepul tarifda faqat YouTube URL orqali video qo'shishingiz mumkin."})]}),d==="upload"&&s?n.jsxs(Pa,{children:[n.jsx(Ma,{children:"Video/Fayl *"}),n.jsx(uO,{children:x?n.jsxs(n.Fragment,{children:[n.jsxs(fO,{children:[n.jsxs(xO,{children:[n.jsx(R3,{size:20,color:"var(--primary-color)"}),n.jsxs("div",{children:[x.name,n.jsx(gO,{style:{display:"block",marginTop:"2px"},children:M(x.size)})]})]}),n.jsx(mO,{onClick:R,disabled:w,children:n.jsx(nt,{size:16})})]}),w&&n.jsxs(yO,{children:[n.jsxs(vO,{children:[n.jsx("span",{children:z==="processing"?"Video qayta ishlanmoqda...":z==="saving"?"Dars saqlanmoqda...":"Yuklanmoqda..."}),n.jsx("span",{children:z==="processing"||z==="saving"?"Tayyorlanmoqda":`${v}%`})]}),n.jsx(wO,{children:n.jsx(kO,{$width:z==="processing"||z==="saving"?"100%":`${v}%`})}),n.jsx(bO,{children:z==="processing"?"Fayl serverga bordi, endi HLS segmentlarga bo'linmoqda.":z==="saving"?"Oxirgi ma'lumotlar saqlanmoqda.":`${M(g)} / ${M(C||x.size||0)}`})]})]}):n.jsxs(pO,{children:[n.jsx(sm,{size:24}),n.jsx("span",{style:{marginBottom:"4px",fontWeight:600},children:"Faylni yuklang yoki shu yerga tashlang"}),n.jsx("span",{style:{fontSize:"12px"},children:"MP4, WEBM, MOV (Max: 100MB)"}),n.jsx(hO,{type:"file",accept:"video/*",onChange:V,ref:B})]})})]}):n.jsxs(Pa,{children:[n.jsx(Ma,{children:"YouTube Video URL *"}),n.jsx(hv,{type:"url",placeholder:"https://youtu.be/...",value:h,onChange:T=>f(T.target.value)})]}),n.jsxs(Pa,{children:[n.jsx(Ma,{children:"Tavsif (ixtiyoriy)"}),n.jsx(cO,{placeholder:"Dars haqida qisqacha...",value:m,onChange:T=>b(T.target.value.slice(0,Pe.lessonDescriptionChars)),maxLength:Pe.lessonDescriptionChars})]})]}),n.jsxs(jO,{children:[n.jsx(xv,{onClick:t,disabled:w,children:"Bekor qilish"}),n.jsx(xv,{primary:!0,disabled:!A()||w,onClick:O,children:w?n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[n.jsx(Zu,{size:16,className:"spin"}),z==="processing"?"Qayta ishlanmoqda...":z==="saving"?"Saqlanmoqda...":d==="upload"?`${v}%`:"Yuborilmoqda..."]}):"Qo'shish"})]})]})})},CO=l.div`
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
`,zO=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
  }
`,gv=l.div`
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
`,$O=l.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;l.div`
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
`;const _O=l.iframe`
  width: 100%;
  height: 100%;
  border: none;
`,mv=l.div`
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
`,yv=l.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,TO=l.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  pointer-events: ${e=>e.isYoutube?"none":"auto"};
`,EO=l.button`
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
`,RO=l.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,eC=l.div`
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
`,PO=l.div`
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

  ${eC}:hover &::after {
    opacity: 1;
  }
`,MO=l.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
`,IO=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,AO=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,OO=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ji=l.button`
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
`,LO=l.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;
`,tC=l.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,BO=l.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${tC}:hover & {
    width: 70px;
    opacity: 1;
  }
`,DO=l.div`
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,FO=l.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,NO=l.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`,qO=l.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`,vv=l.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`,HO=l.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`,UO=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;l.div`
  display: flex;
  align-items: center;
`;const YO=l.div`
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
`;l.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;const Xi=l.button`
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
`,VO=l.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${e=>e.open?"400px":"0"};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`,WO=l.div`
  padding: 16px 24px;
`,bv=l.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-bottom: 12px;
`,wv=l.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`,kv=l.div`
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
`,jv=l.div`
  flex: 1;
`,Sv=l.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`,Cv=l.div`
  font-size: 12px;
  color: ${e=>e.pending?"var(--warning-color)":"var(--success-color)"};
`,zv=l.div`
  display: flex;
  gap: 6px;
`,Ph=l.button`
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
`,$v=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`,_v=l.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`,GO=l.div`
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
`,QO=l.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`,KO=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,Mh=l.button`
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
`,JO=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,XO=l.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`,ZO=l.button`
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
`,eL=l.button`
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
`,tL=l.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${e=>e.collapsed?"0":"500px"};
    overflow: ${e=>e.collapsed?"hidden":"auto"};
    transition: max-height 0.3s ease;
  }
`,rC=l.div`
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
`,rL=l.div`
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
`,nL=l.div`
  flex: 1;
  min-width: 0;
`,oL=l.div`
  font-size: 14px;
  font-weight: ${e=>e.active?"600":"500"};
  color: ${e=>e.active?"var(--text-color)":"var(--text-secondary-color)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`,iL=l.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`,sL=l.span`
  display: flex;
  align-items: center;
  gap: 3px;
`,aL=l.button`
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

  ${rC}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(240, 71, 71, 0.15);
    color: var(--danger-color);
  }
`,lL=l.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`,cL=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`,dL=l.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #7c8cf8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.3);
`,uL=l.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`,pL=l.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`,hL=l.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
`,fL=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`,xL=l.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`,gL=l.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted-color);
`,mL=l.div`
  background: var(--input-color);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--hover-color);
  }
`;l.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;l.span`
  font-size: 13px;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;const yL=l.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
`,Hc=l.div`
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
`,vL=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,bL=l.input`
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
`,wL=l.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`,Tv=l.button`
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
`,kL=l.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`,Ev=l.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,Rv=l.div`
  flex: 1;
  min-width: 0;
`,Pv=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Mv=l.span`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.isAdmin?"var(--primary-color)":"var(--text-color)"};
`,Iv=l.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(88, 101, 242, 0.15);
  color: var(--primary-color);
`,Av=l.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Ov=l.p`
  font-size: 14px;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
`,jL=l.button`
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
`,SL=l.div`
  margin-left: 48px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,CL=l.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
`,zL=l.input`
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
`,$L=l.button`
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
`;l.div`
  text-align: center;
  padding: 20px;
  color: var(--text-muted-color);
  font-size: 14px;
`;l.button`
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
`;const _L=l.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`;function Ih(e){if(isNaN(e))return"0:00";const t=Math.floor(e/3600),r=Math.floor(e%3600/60),o=Math.floor(e%60);return t>0?`${t}:${r.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${r}:${o.toString().padStart(2,"0")}`}function Lv(e){return e>=1e6?(e/1e6).toFixed(1)+"M":e>=1e3?(e/1e3).toFixed(1)+"K":e.toString()}function Bv(e){const t=new Date(e),o=new Date-t;if(isNaN(o))return"Noma'lum vaqt";const i=Math.floor(o/6e4),s=Math.floor(o/36e5),a=Math.floor(o/864e5);return i<1?"Hozirgina":i<60?`${i} daqiqa oldin`:s<24?`${s} soat oldin`:a<30?`${a} kun oldin`:t.toLocaleDateString("uz-UZ")}function Dv(e){return e?typeof e=="string"?e:e._id||e.id||e.userId||null:null}const TL=({courseId:e,initialLessonSlug:t,onClose:r})=>{var sa,aa,Vi,uc,Rm,Pm,Mm,Im,Am,Om,Lm,Bm;const o=Qt(),{createChat:i}=Wo(),{courses:s,currentUser:a,isAdmin:c,isEnrolled:d,enrollInCourse:p,approveUser:h,removeUser:f,incrementViews:x,removeLesson:S,getLessonComments:m,addComment:b,addReply:w,toggleLessonLike:j,joinCourseRoom:v,leaveCourseRoom:y}=ra(),[g,k]=u.useState(0),[C,_]=u.useState(!1),[z,D]=u.useState(!1),[B,V]=u.useState(!1),[R,M]=u.useState(""),[A,O]=u.useState(!1),[T,F]=u.useState(null),[P,q]=u.useState(""),[$,E]=u.useState(!1),[I,N]=u.useState([]),[J,Y]=u.useState(1),[L,H]=u.useState(!0),[Q,ie]=u.useState(!1),[G,le]=u.useState(null),[ue,me]=u.useState(!1),W=u.useRef(null),Me=u.useRef(null),De=u.useRef(null),[Fe,ot]=u.useState(!1),[st,ze]=u.useState(0),[Oe,Re]=u.useState(0),[qe,ae]=u.useState(null),[Le,Ge]=u.useState(1),[at,oe]=u.useState(!1),[xe,we]=u.useState(!1),[X,ee]=u.useState(!0),[ye,ke]=u.useState(0),[he,Ee]=u.useState(!1),He=u.useRef(null),[ct,tt]=u.useState(null),[ut,ir]=u.useState("direct"),[Go,ur]=u.useState(!1),[Rt,Kt]=u.useState(1),[cn,Yr]=u.useState(!1),[Rn,dn]=u.useState(null),[Vr,qt]=u.useState(0),[Qo,Ko]=u.useState(!1),Se=s.find(Z=>Z._id===e||Z.urlSlug===e||String(Z.id)===String(e)),Ct=((Se==null?void 0:Se.lessons)||[])[g]||null,un=u.useCallback(async(Z=1)=>{if(!(!e||!(Ct!=null&&Ct._id)))try{Z===1&&ie(!0);const ve=await m(e,Ct._id,Z,10),rt=ve.data||[],kt=ve.totalPages||1;N(hn=>Z===1?rt:[...hn,...rt]),Y(Z),H(Z<kt)}catch(ve){console.error(ve)}finally{Z===1&&ie(!1)}},[e,Ct==null?void 0:Ct._id,m]);u.useEffect(()=>{$&&un(1)},[Ct==null?void 0:Ct._id,$,un]);const na=d(e),wr=Se?c(e):!1,Ni=Dv(a),Zn=Dv(Se==null?void 0:Se.createdBy),qi=String(Zn||"")===String(Ni||""),Hi=async()=>{if(G)try{me(!0),await S(e,G),g>=Se.lessons.length-1&&g>0&&k(g-1),le(null)}catch(Z){console.error(Z),toast.error("Darsni o'chirishda xatolik yuz berdi")}finally{me(!1)}};u.useEffect(()=>{if(Se&&t){const Z=Se.lessons.findIndex(ve=>ve.urlSlug===t||String(ve._id)===t||String(ve.id)===t);Z!==-1&&Z!==g&&k(Z)}},[Se,t]);const Er=na,Jo=qi||Er==="approved"||wr,Ht=u.useCallback(Z=>Jo||Z===0,[Jo]);u.useEffect(()=>{k(0),_(!1),V(!1),ot(!1),ze(0),Re(0),Ee(!1)},[e]);const Ui=u.useRef(new Set);u.useEffect(()=>{ot(!1),ze(0);const Z=(Ct==null?void 0:Ct._id)||(Ct==null?void 0:Ct.id);if(!e||!Z||!Ht(g)||Ui.current.has(Z))return;const ve=setTimeout(()=>{x(e,Z),Ui.current.add(Z)},1e4);return()=>clearTimeout(ve)},[g,e,Ct,Ht,x]);const pn=u.useCallback(()=>{if(W.current)if(ae(null),Fe)W.current.pause();else{const Z=W.current.play();Z!==void 0&&Z.catch(ve=>{ve.name==="NotSupportedError"?ae("Bu video formatini brauzeringiz qo'llab-quvvatlamaydi (masalan .mov bevosita Chrome'da ishlamasligi mumkin)."):(console.error("Playback error:",ve),ae("Videoni ishga tushirishda xatolik yuz berdi.")),ot(!1)})}},[Fe]),dc=u.useCallback(()=>{if(!W.current)return;ze(W.current.currentTime);const Z=W.current;Z.buffered.length>0&&ke(Z.buffered.end(Z.buffered.length-1)/Z.duration*100)},[]);u.useCallback(Z=>{Re(Z)},[]);const oa=u.useCallback(Z=>{if(!W.current)return;const ve=Z.currentTarget.getBoundingClientRect(),rt=(Z.clientX-ve.left)/ve.width;W.current.currentTime=rt*Oe},[Oe]),Yi=u.useCallback(Z=>{const ve=parseFloat(Z.target.value);Ge(ve),W.current&&(W.current.volume=ve),oe(ve===0)},[]),eo=u.useCallback(()=>{W.current&&(at?(W.current.volume=Le||1,oe(!1)):(W.current.volume=0,oe(!0)))},[at,Le]),se=u.useCallback(()=>{Me.current&&(document.fullscreenElement?(document.exitFullscreen(),we(!1)):(Me.current.requestFullscreen(),we(!0)))},[]),Ce=u.useCallback(()=>{W.current&&(W.current.currentTime+=10)},[]),$e=u.useCallback(()=>{W.current&&(W.current.currentTime-=10)},[]),dt=u.useCallback(Z=>{Kt(Z),W.current&&(W.current.playbackRate=Z),Yr(!1)},[]),U=u.useCallback(Z=>{if(!Oe)return;const ve=Z.currentTarget.getBoundingClientRect(),rt=Math.max(0,Math.min(1,(Z.clientX-ve.left)/ve.width));dn(rt*Oe),qt(Z.clientX-ve.left)},[Oe]),re=u.useCallback(()=>{ee(!0),He.current&&clearTimeout(He.current),He.current=setTimeout(()=>{Fe&&ee(!1)},3e3)},[Fe]);u.useEffect(()=>{const Z=ve=>{if(!["INPUT","TEXTAREA"].includes(ve.target.tagName))switch(ve.key){case" ":case"k":ve.preventDefault(),pn();break;case"ArrowRight":W.current&&(W.current.currentTime+=10);break;case"ArrowLeft":W.current&&(W.current.currentTime-=10);break;case"ArrowUp":if(ve.preventDefault(),W.current){const rt=Math.min(1,(W.current.volume||0)+.1);W.current.volume=rt,Ge(rt),oe(!1)}break;case"ArrowDown":if(ve.preventDefault(),W.current){const rt=Math.max(0,(W.current.volume||0)-.1);W.current.volume=rt,Ge(rt),oe(rt===0)}break;case"f":case"F":se();break;case"m":case"M":eo();break}};return window.addEventListener("keydown",Z),()=>window.removeEventListener("keydown",Z)},[pn,se,eo]);const pe=Z=>{k(Z);const ve=Se.lessons[Z];if(ve){const rt=ve.urlSlug||ve._id||ve.id,kt=Se.urlSlug||Se._id||Se.id;window.history.replaceState(null,"",`/courses/${kt}/${rt}`)}},de=u.useCallback(()=>{Se&&g<Se.lessons.length-1&&k(Z=>Z+1)},[Se,g]),K=(sa=Se==null?void 0:Se.lessons)==null?void 0:sa[g],_e=(aa=K==null?void 0:K.videoUrl)==null?void 0:aa.includes("youtu"),je=(K==null?void 0:K.type)==="file",We=je&&((K==null?void 0:K.streamType)==="hls"||((Vi=K==null?void 0:K.videoUrl)==null?void 0:Vi.endsWith(".m3u8"))||ut==="hls"),Ne="http://localhost:3000",zt=(K==null?void 0:K.urlSlug)||(K==null?void 0:K._id)||(K==null?void 0:K.id);if(u.useEffect(()=>{if(!je||!zt||!Ht(g)){tt(null),ir("direct");return}let Z=!1;return(async()=>{ur(!0),tt(null),ir("direct"),ae(null);try{const{streamUrl:rt,streamType:kt}=await nM(e,zt);if(Z||!rt)return;const hn=rt.startsWith("http")?rt:`${Ne}${rt}`;ir(kt||"direct"),tt(hn)}catch{Z||ae("Videoni yuklashga ruxsat olinmadi.")}finally{Z||ur(!1)}})(),()=>{Z=!0}},[g,Ht,e,je,zt,Ne]),u.useEffect(()=>{De.current&&(De.current.destroy(),De.current=null);const Z=W.current;if(!Z||!ct||!We)return;let ve=!1;return(async()=>{if(Z.canPlayType("application/vnd.apple.mpegurl")){Z.src=ct;return}const kt=await Hd(()=>import("./hls-ywO_6aio.js"),[]);if(ve)return;const hn=kt.default;if(!hn.isSupported()){ae("Brauzer HLS videoni qo'llab-quvvatlamaydi.");return}const la=new hn({enableWorker:!0,lowLatencyMode:!1,xhrSetup:Dm=>{Dm.withCredentials=!0}});De.current=la,la.loadSource(ct),la.attachMedia(Z),la.on(hn.Events.ERROR,(Dm,yp)=>{yp!=null&&yp.fatal&&(ae("HLS videoni ishga tushirishda xatolik yuz berdi."),la.destroy(),De.current=null)})})(),()=>{ve=!0,De.current&&(De.current.destroy(),De.current=null)}},[We,ct]),!Se)return n.jsxs(cL,{children:[n.jsx(dL,{children:n.jsx($n,{size:36,color:"white"})}),n.jsx(uL,{children:"Kursni tanlang"}),n.jsx(pL,{children:"Chap tarafdagi ro'yxatdan kursni tanlang yoki yangi kurs yarating."})]});const Pn=Se.members.filter(Z=>Z.status==="approved"),Xo=Se.members.filter(Z=>Z.status==="pending"),ia=_e?(Z=>{if(!Z)return null;const ve=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,rt=Z.match(ve);return rt&&rt[2].length===11?rt[2]:null})(K.videoUrl):null;return n.jsxs(n.Fragment,{children:[n.jsxs(CO,{children:[n.jsxs(zO,{children:[Ht(g)&&K?n.jsxs(n.Fragment,{children:[_e&&ia?n.jsxs(gv,{ref:Me,children:[n.jsx(_O,{src:`https://www.youtube.com/embed/${ia}?rel=0&modestbranding=1`,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:K.title}),n.jsx(mv,{visible:!0,style:{pointerEvents:"none",background:"transparent"},children:n.jsx(yv,{children:n.jsx(Mh,{onClick:()=>r(),style:{pointerEvents:"auto",color:"white",background:"rgba(0,0,0,0.5)",borderRadius:"50%",padding:"8px"},children:n.jsx(nr,{size:20})})})})]}):n.jsxs(gv,{ref:Me,onMouseMove:re,onMouseLeave:()=>{Fe&&ee(!1)},onClick:pn,onContextMenu:Z=>Z.preventDefault(),children:[(Go||Qo)&&n.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,background:"rgba(0,0,0,0.3)",pointerEvents:"none"},children:[n.jsx("div",{style:{width:48,height:48,border:"4px solid rgba(255,255,255,0.2)",borderTop:"4px solid var(--primary-color)",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}),n.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]}),n.jsx($O,{ref:W,src:je?We?void 0:ct||void 0:K.videoUrl,preload:"metadata",crossOrigin:"use-credentials",controlsList:"nodownload",disablePictureInPicture:!0,onContextMenu:Z=>Z.preventDefault(),onPlay:()=>ot(!0),onPause:()=>ot(!1),onWaiting:()=>Ko(!0),onCanPlay:()=>Ko(!1),onTimeUpdate:dc,onLoadedMetadata:()=>{W.current&&(Re(W.current.duration),W.current.playbackRate=Rt)},onError:Z=>{Go||ae("Videoni ishga tushirishda xatolik yuz berdi.")},onEnded:de,style:{userSelect:"none",WebkitUserSelect:"none"}}),qe&&n.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0, 0, 0, 0.8)",color:"#ef4444",padding:"20px",textAlign:"center",zIndex:20,flexDirection:"column",gap:"12px"},children:[n.jsx(Xu,{size:48}),n.jsx("p",{style:{fontWeight:600,maxWidth:"400px",lineHeight:1.5},children:qe})]}),n.jsx(EO,{visible:!Fe&&!qe,onClick:Z=>{Z.stopPropagation(),pn()},children:n.jsx(ml,{size:32,fill:"white",color:"white"})}),n.jsxs(mv,{visible:X||!Fe,onClick:Z=>Z.stopPropagation(),children:[n.jsx(yv,{children:n.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[n.jsx(Mh,{onClick:()=>r(),style:{color:"white"},children:n.jsx(nr,{size:20})}),n.jsx(TO,{children:K.title})]})}),n.jsxs(RO,{children:[n.jsxs(eC,{onMouseMove:Z=>{U(Z),Z.stopPropagation()},onMouseLeave:()=>dn(null),onClick:Z=>{Z.stopPropagation(),oa(Z)},style:{cursor:"pointer"},children:[n.jsx(MO,{style:{width:`${ye}%`}}),n.jsx(PO,{style:{width:`${Oe?st/Oe*100:0}%`}}),Rn!==null&&n.jsx("div",{style:{position:"absolute",bottom:"14px",left:Vr,transform:"translateX(-50%)",background:"rgba(0,0,0,0.85)",color:"white",fontSize:"11px",fontWeight:600,padding:"3px 7px",borderRadius:"4px",whiteSpace:"nowrap",pointerEvents:"none",zIndex:20,letterSpacing:"0.5px"},children:Ih(Rn)})]}),n.jsxs(IO,{children:[n.jsxs(AO,{children:[n.jsx(Ji,{onClick:pn,children:Fe?n.jsx(U3,{size:20}):n.jsx(ml,{size:20,fill:"white"})}),n.jsx(Ji,{onClick:$e,title:"-10s",children:n.jsx(Q3,{size:18})}),n.jsx(Ji,{onClick:Ce,title:"+10s",children:n.jsx(K3,{size:18})}),n.jsxs(tC,{children:[n.jsx(Ji,{onClick:eo,children:at?n.jsx(n$,{size:18}):n.jsx(y4,{size:18})}),n.jsx(BO,{type:"range",min:"0",max:"1",step:"0.05",value:at?0:Le,onChange:Yi})]}),n.jsxs(LO,{children:[Ih(st)," / ",Ih(Oe)]})]}),n.jsxs(OO,{children:[n.jsxs("div",{style:{position:"relative"},onClick:Z=>Z.stopPropagation(),children:[n.jsxs(Ji,{title:"Tezlik",onClick:()=>Yr(Z=>!Z),style:{fontSize:"11px",fontWeight:700,width:"auto",padding:"0 8px",borderRadius:"4px",border:cn?"1px solid var(--primary-color)":"1px solid rgba(255,255,255,0.2)",color:Rt!==1?"var(--primary-color)":"white"},children:[Rt,"x"]}),cn&&n.jsxs("div",{style:{position:"absolute",bottom:"44px",right:0,background:"rgba(15,15,20,0.97)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",overflow:"hidden",minWidth:"110px",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",zIndex:50},children:[n.jsx("div",{style:{padding:"8px 12px",fontSize:"11px",color:"rgba(255,255,255,0.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",borderBottom:"1px solid rgba(255,255,255,0.08)"},children:"Tezlik"}),[.5,.75,1,1.25,1.5,2].map(Z=>n.jsx("div",{onClick:()=>dt(Z),style:{padding:"9px 16px",fontSize:"13px",cursor:"pointer",color:Rt===Z?"var(--primary-color)":"white",fontWeight:Rt===Z?700:400,background:Rt===Z?"rgba(88,101,242,0.1)":"transparent",transition:"background 0.15s"},onMouseEnter:ve=>ve.currentTarget.style.background="rgba(255,255,255,0.06)",onMouseLeave:ve=>ve.currentTarget.style.background=Rt===Z?"rgba(88,101,242,0.1)":"transparent",children:Z===1?"Oddiy (1x)":`${Z}x`},Z))]})]}),n.jsx(Ji,{onClick:se,children:xe?n.jsx(N3,{size:18}):n.jsx(rm,{size:18})})]})]})]})]})]}),n.jsxs(DO,{children:[n.jsxs(FO,{children:[g+1,"-dars: ",K.title]}),n.jsxs(NO,{children:[n.jsxs(vv,{children:[n.jsx(_n,{size:14}),Lv(K.views)," ko'rish"]}),n.jsxs(vv,{as:"button",type:"button",onClick:()=>j(e,K._id),style:{border:"none",cursor:"pointer",color:K.liked?"#ed4245":"var(--text-muted-color)"},children:[n.jsx(Mi,{size:14,fill:K.liked?"#ed4245":"none"}),K.likes||0," like"]}),n.jsxs(qO,{children:[n.jsx($n,{size:14}),Se.name]})]})]}),n.jsxs(hL,{children:[n.jsxs(fL,{children:[n.jsx(xL,{children:"Izohlar"}),n.jsx(gL,{children:((uc=K.comments)==null?void 0:uc.length)||0})]}),$?n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:16},children:n.jsxs("button",{onClick:()=>E(!1),style:{background:"none",border:"none",color:"var(--text-secondary-color)",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:600},children:[n.jsx(Ad,{size:16})," Yig'ish"]})}),n.jsxs(yL,{children:[n.jsx(Hc,{isAdmin:wr,children:((Rm=a.avatar)==null?void 0:Rm.length)>1?n.jsx("img",{src:a.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(a.name||"?").charAt(0)}),n.jsxs(vL,{children:[n.jsx(bL,{placeholder:"Izoh qoldiring...",value:R,onChange:Z=>{M(Z.target.value),!A&&Z.target.value&&O(!0)},onFocus:()=>O(!0),onKeyDown:Z=>{Z.key==="Enter"&&R.trim()&&(b(e,K._id,R.trim()),M(""),O(!1))}}),A&&n.jsxs(wL,{children:[n.jsx(Tv,{onClick:()=>{O(!1),M("")},children:"Bekor qilish"}),n.jsx(Tv,{primary:!0,disabled:!R.trim(),onClick:()=>{R.trim()&&(b(e,K._id,R.trim()).then(()=>un(1)),M(""),O(!1))},children:"Yuborish"})]})]})]}),n.jsx(En,{dataLength:I.length,next:()=>un(J+1),hasMore:L,loader:n.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:"Yuklanmoqda..."}),style:{display:"flex",flexDirection:"column",gap:"16px",paddingBottom:"32px"},scrollableTarget:null,children:I.map(Z=>{var ve,rt;return n.jsxs(kL,{children:[n.jsxs(Ev,{children:[n.jsx(Hc,{isAdmin:Z.userId===Se.createdBy,children:((ve=Z.userAvatar)==null?void 0:ve.length)>1?n.jsx("img",{src:Z.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):Z.userName.charAt(0)}),n.jsxs(Rv,{children:[n.jsxs(Pv,{children:[n.jsx(Mv,{isAdmin:Z.userId===Se.createdBy,children:Z.userName}),Z.userId===Se.createdBy&&n.jsx(Iv,{children:"Admin"}),n.jsx(Av,{children:Bv(Z.createdAt)})]}),n.jsx(Ov,{children:Z.text}),n.jsx(jL,{onClick:()=>F(T===Z._id?null:Z._id),children:"Javob berish"})]})]}),Z.replies&&Z.replies.length>0&&n.jsx(SL,{children:Z.replies.map(kt=>{var hn;return n.jsxs(Ev,{children:[n.jsx(Hc,{small:!0,isAdmin:kt.userId===Se.createdBy,children:((hn=kt.userAvatar)==null?void 0:hn.length)>1?n.jsx("img",{src:kt.userAvatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):kt.userName.charAt(0)}),n.jsxs(Rv,{children:[n.jsxs(Pv,{children:[n.jsx(Mv,{isAdmin:kt.userId===Se.createdBy,children:kt.userName}),kt.userId===Se.createdBy&&n.jsx(Iv,{children:"Admin"}),n.jsx(Av,{children:Bv(kt.createdAt)})]}),n.jsx(Ov,{children:kt.text})]})]},kt._id)})}),T===Z._id&&n.jsxs(CL,{children:[n.jsx(Hc,{small:!0,isAdmin:wr,children:((rt=a.avatar)==null?void 0:rt.length)>1?n.jsx("img",{src:a.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(a.name||"?").charAt(0)}),n.jsx(zL,{placeholder:"Javob yozing...",value:P,onChange:kt=>q(kt.target.value),onKeyDown:kt=>{kt.key==="Enter"&&P.trim()&&(w(e,K._id,Z._id,P.trim()).then(()=>un(1)),q(""),F(null))},autoFocus:!0}),n.jsx($L,{disabled:!P.trim(),onClick:()=>{P.trim()&&(w(e,K._id,Z._id,P.trim()),q(""),F(null))},children:n.jsx(np,{size:14})})]})]},Z._id)})})]}):n.jsx(mL,{onClick:()=>E(!0),children:n.jsx("div",{style:{fontSize:13,color:"var(--text-muted-color)"},children:"Izoh yozing..."})})]})]}):Ht(g)&&Se.lessons.length===0?n.jsxs($v,{children:[n.jsx(_v,{children:n.jsx(_1,{size:32,color:"var(--text-muted-color)"})}),n.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:"Hali darslar qo'shilmagan"}),n.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14},children:wr?"O'ng tarafdagi + tugmasini bosib dars qo'shing.":"Tez orada darslar qo'shiladi."})]}):n.jsxs($v,{children:[n.jsx(_v,{children:Er==="pending"?n.jsx(Pi,{size:32,color:"var(--warning-color)"}):n.jsx(B3,{size:32,color:"var(--text-muted-color)"})}),n.jsx("h3",{style:{color:"var(--text-color)",fontWeight:700},children:Er==="pending"?"So'rov yuborildi":"Kursga yoziling"}),n.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:14,maxWidth:350},children:Er==="pending"?"Sizning so'rovingiz admin tomonidan ko'rib chiqilmoqda. Iltimos kuting.":"Darslarni ko'rish uchun avval kursga yozilish kerak. Admin tasdiqlangandan keyin darslarni ko'rishingiz mumkin."})]}),n.jsxs(HO,{style:{padding:"12px 24px",borderBottom:"none"},children:[n.jsxs(UO,{children:[n.jsx(YO,{style:{width:40,height:40,fontSize:16},children:(Pm=Se==null?void 0:Se.createdBy)!=null&&Pm.avatar?n.jsx("img",{src:Se.createdBy.avatar,alt:"author",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):(((Mm=Se==null?void 0:Se.createdBy)==null?void 0:Mm.name)||((Im=Se==null?void 0:Se.createdBy)==null?void 0:Im.username)||"?").charAt(0).toUpperCase()}),n.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[n.jsx("span",{style:{fontWeight:600,color:"var(--text-color)",fontSize:15},children:((Am=Se==null?void 0:Se.createdBy)==null?void 0:Am.name)||((Om=Se==null?void 0:Se.createdBy)==null?void 0:Om.username)||"Muallif"}),n.jsxs("span",{style:{fontSize:12,color:"var(--text-muted-color)"},children:[((Lm=Se==null?void 0:Se.members)==null?void 0:Lm.length)||0," talaba"]})]})]}),n.jsx("div",{style:{display:"flex",gap:"8px"},children:wr?n.jsxs(Xi,{variant:"admin",onClick:()=>V(!B),style:{borderRadius:"20px",padding:"8px 16px"},children:[n.jsx(Vs,{size:16}),"Boshqarish",B?n.jsx(Ad,{size:16}):n.jsx(jx,{size:16})]}):Er==="pending"?n.jsxs("div",{style:{display:"flex",gap:"8px"},children:[n.jsxs(Xi,{variant:"pending",style:{borderRadius:"20px"},children:[n.jsx(Pi,{size:16}),"Kutilmoqda"]}),n.jsx(Xi,{variant:"admin",onClick:()=>f(e,Ni),style:{borderRadius:"20px"},children:"Bekor qilish"})]}):Er==="approved"?n.jsxs(Xi,{variant:"enrolled",style:{borderRadius:"20px"},children:[n.jsx(rn,{size:16}),"Obuna bo'lingan"]}):(Se==null?void 0:Se.accessType)==="paid"&&Er==="none"?n.jsxs(Xi,{variant:"enroll",style:{borderRadius:"20px"},onClick:async()=>{try{await p(e);const ve=await i({isGroup:!1,memberIds:[Zn]});console.log(ve),ve&&o(`/users/${ve==null?void 0:ve.jammId}`)}catch(Z){console.error(Z),toast.error("Xatolik yuz berdi: Chat yaratib bo'lmadi")}},children:[n.jsx(E1,{size:16}),"Sotib olish: ",((Bm=Se==null?void 0:Se.price)==null?void 0:Bm.toLocaleString())||0," so'm"]}):Er==="none"?n.jsxs(Xi,{variant:"enroll",onClick:()=>p(e),style:{borderRadius:"20px"},children:[n.jsx(E1,{size:16}),"Obuna bo'lish ",(Se==null?void 0:Se.price)>0&&`(${Se.price})`]}):null})]}),wr&&n.jsx(VO,{open:B,children:n.jsxs(WO,{children:[Xo.length>0&&n.jsxs(n.Fragment,{children:[n.jsxs(bv,{children:["Kutayotganlar (",Xo.length,")"]}),Xo.map(Z=>{var ve;return n.jsxs(wv,{children:[n.jsx(kv,{children:((ve=Z.avatar)==null?void 0:ve.length)>1?n.jsx("img",{src:Z.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):Z.name.charAt(0)}),n.jsxs(jv,{children:[n.jsx(Sv,{children:Z.name}),n.jsx(Cv,{pending:!0,children:"Kutmoqda"})]}),n.jsxs(zv,{children:[n.jsx(Ph,{approve:!0,onClick:()=>h(e,Z.userId||Z._id||Z.id),title:"Tasdiqlash",children:n.jsx(e$,{size:16})}),n.jsx(Ph,{onClick:()=>f(e,Z.userId||Z._id||Z.id),title:"Rad etish",children:n.jsx(R1,{size:16})})]})]},Z.userId||Z._id||Z.id)})]}),n.jsxs(bv,{style:{marginTop:Xo.length>0?16:0},children:["A'zolar (",Pn.length,")"]}),Pn.length===0?n.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:13,padding:"8px 0"},children:"Hali a'zolar yo'q"}):Pn.map(Z=>{var ve;return n.jsxs(wv,{children:[n.jsx(kv,{children:((ve=Z.avatar)==null?void 0:ve.length)>1?n.jsx("img",{src:Z.avatar,alt:"avatar",style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}}):Z.name.charAt(0)}),n.jsxs(jv,{children:[n.jsx(Sv,{children:Z.name}),n.jsx(Cv,{children:"Tasdiqlangan"})]}),n.jsx(zv,{children:n.jsx(Ph,{onClick:()=>f(e,Z.userId||Z._id||Z.id),title:"Chiqarish",children:n.jsx(R1,{size:16})})})]},Z.userId||Z._id||Z.id)})]})})]}),n.jsxs(GO,{children:[n.jsxs(QO,{children:[n.jsxs(KO,{children:[n.jsx(Mh,{onClick:()=>r(),children:n.jsx(nr,{size:20})}),n.jsx(_1,{size:18}),"Darslar"]}),n.jsxs(JO,{children:[n.jsxs(XO,{children:[Se.lessons.length," ta dars"]}),wr&&n.jsx(ZO,{onClick:()=>D(!0),title:"Dars qo'shish",children:n.jsx(Et,{size:16})}),n.jsx(eL,{onClick:()=>_(!C),children:C?n.jsx(jx,{size:20}):n.jsx(Ad,{size:20})})]})]}),n.jsx(tL,{collapsed:C,children:Se.lessons.length===0?n.jsx(lL,{children:wr?n.jsxs(n.Fragment,{children:["Hali darslar yo'q.",n.jsx("br",{}),n.jsx("span",{style:{fontSize:12},children:"+ tugmasini bosib dars qo'shing"})]}):"Hali darslar qo'shilmagan"}):Se.lessons.map((Z,ve)=>n.jsxs(rC,{active:Ht(ve)&&g===ve,onClick:()=>Ht(ve)&&pe(ve),style:{cursor:Ht(ve)?"pointer":"default"},children:[n.jsx(rL,{active:Ht(ve)&&g===ve,children:Ht(ve)&&g===ve?n.jsx(ml,{size:12,fill:"white"}):Ht(ve)?ve+1:n.jsx(Fo,{size:12})}),n.jsx(nL,{children:Ht(ve)?n.jsxs(n.Fragment,{children:[n.jsxs(oL,{active:g===ve,children:[Z.title,ve===0&&!Jo&&n.jsx("span",{style:{fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:4,background:"rgba(67, 181, 129, 0.15)",color:"var(--success-color)",marginLeft:6,verticalAlign:"middle"},children:"Bepul"})]}),n.jsx(iL,{children:n.jsxs(sL,{children:[n.jsx(_n,{size:11}),Lv(Z.views)]})})]}):n.jsxs(_L,{children:[n.jsx(Fo,{size:12}),ve+1,"-dars"]})}),wr&&n.jsx(aL,{onClick:rt=>{rt.stopPropagation(),le(Z._id)},title:"O'chirish",children:n.jsx(lr,{size:14})})]},Z._id))})]})]}),n.jsx(SO,{isOpen:z,onClose:()=>D(!1),courseId:e,onCreated:Z=>{D(!1),k(Se.lessons.length)}}),n.jsx(Di,{isOpen:!!G,onClose:()=>le(null),title:"Darsni o'chirish",description:"Rostdan ham bu darsni o'chirmoqchimisiz? Agar unga video biriktirilgan bo'lsa, u ham o'chib ketadi.",confirmText:ue?"O'chirilmoqda...":"Ha, o'chirish",cancelText:"Beqor qilish",onConfirm:Hi,isDanger:!0})]})},EL=async()=>{const{data:e}=await fe.get("/arena/tests");return e},RL=async e=>{const{data:t}=await fe.get(`/arena/tests/${e}`);return t},nC=async e=>{const{data:t}=await fe.post("/arena/tests",e);return t},PL=async(e,t)=>{const{data:r}=await fe.patch(`/arena/tests/${e}`,t);return r},ML=async(e=1,t=15)=>{const{data:r}=await fe.get(`/arena/tests/my?page=${e}&limit=${t}`);return r},IL=async e=>{const{data:t}=await fe.delete(`/arena/tests/${e}`);return t},AL=async(e,t={})=>{const{data:r}=await fe.get(`/arena/tests/${e}/results`,{params:t});return r},OL=async e=>{const{data:t}=await fe.get(`/arena/tests/shared/${e}`);return t},LL=async e=>{const{data:t}=await fe.get(`/arena/tests/${e}/share-links`);return t},BL=async(e,t)=>{const{data:r}=await fe.post(`/arena/tests/${e}/share-links`,t);return r},DL=async(e,t)=>{const{data:r}=await fe.delete(`/arena/tests/${e}/share-links/${t}`);return r},FL=async(e,t)=>{const{data:r}=await fe.post(`/arena/tests/${e}/submit`,{answers:(t==null?void 0:t.answers)||[],shareShortCode:(t==null?void 0:t.shareShortCode)||null});return r},NL=async(e=1,t=20)=>{const{data:r}=await fe.get(`/arena/flashcards?page=${e}&limit=${t}`);return r},qL=async e=>{const{data:t}=await fe.post("/arena/flashcards",e);return t},HL=async(e,t)=>{const{data:r}=await fe.patch(`/arena/flashcards/${e}`,t);return r},UL=async e=>{const{data:t}=await fe.get(`/arena/flashcards/${e}`);return t},YL=async({deckId:e,cardId:t,quality:r})=>{const{data:o}=await fe.patch(`/arena/flashcards/${e}/cards/${t}/review`,{quality:r});return o},VL=async e=>{const{data:t}=await fe.post(`/arena/flashcards/${e}/join`);return t},WL=async e=>{const{data:t}=await fe.delete(`/arena/flashcards/${e}/leave`);return t},GL=async e=>{const{data:t}=await fe.delete(`/arena/flashcards/${e}`);return t},QL=async(e=1,t=20)=>{const{data:r}=await fe.get(`/arena/sentence-builders?page=${e}&limit=${t}`);return r},KL=async e=>{const{data:t}=await fe.post("/arena/sentence-builders",e);return t},JL=async(e,t)=>{const{data:r}=await fe.patch(`/arena/sentence-builders/${e}`,t);return r},XL=async e=>{const{data:t}=await fe.get(`/arena/sentence-builders/${e}`);return t},ZL=async e=>{const{data:t}=await fe.get(`/arena/sentence-builders/shared/${e}`);return t},eB=async(e,t,r)=>{const{data:o}=await fe.post(`/arena/sentence-builders/${e}/check`,{questionIndex:t,selectedTokens:r});return o},tB=async e=>{const{data:t}=await fe.delete(`/arena/sentence-builders/${e}`);return t},rB=async(e,t={})=>{const{data:r}=await fe.get(`/arena/sentence-builders/${e}/results`,{params:t});return r},nB=async e=>{const{data:t}=await fe.get(`/arena/sentence-builders/${e}/share-links`);return t},oB=async(e,t)=>{const{data:r}=await fe.post(`/arena/sentence-builders/${e}/share-links`,t);return r},iB=async(e,t)=>{const{data:r}=await fe.delete(`/arena/sentence-builders/${e}/share-links/${t}`);return r},sB=async(e,t)=>{const{data:r}=await fe.post(`/arena/sentence-builders/${e}/submit`,t);return r},aB=async(e={})=>{const{data:t}=await fe.get("/arena/battles/history",{params:e});return t},lB=async(e=1,t=15)=>{const{data:r}=await fe.get(`/arena/battles/active?page=${e}&limit=${t}`);return r},oC=u.createContext(null),cB="http://localhost:3000",dB=({children:e})=>{const[t,r]=u.useState([]),[o,i]=u.useState([]),[s,a]=u.useState([]),[c,d]=u.useState(1),[p,h]=u.useState(!0),[f,x]=u.useState([]),[S,m]=u.useState(1),[b,w]=u.useState(!0),[j,v]=u.useState(null),[y,g]=u.useState([]),[k,C]=u.useState([]),[_,z]=u.useState(1),[D,B]=u.useState(!0),[V,R]=u.useState(1),[M,A]=u.useState(!0),[O,T]=u.useState(!1),[F,P]=u.useState(localStorage.getItem("jamm_guest_name")||null),q=u.useRef(null),$=Ie(X=>X.token),E=u.useCallback(async()=>{try{const X=await EL();r(X)}catch(X){console.error("Error fetching arena tests:",X)}},[]),I=async X=>{try{const ee=await nC(X);return Y(),ee}catch(ee){console.error("Error creating test:",ee)}},N=async(X,ee)=>{try{const ye=await PL(X,ee);return i(ke=>ke.map(he=>he._id===X?{...he,...ye}:he)),r(ke=>ke.map(he=>he._id===X?{...he,...ye}:he)),ye}catch(ye){throw console.error("Error updating test:",ye),ye}},J=async X=>{const ee=o,ye=t;i(ke=>ke.filter(he=>he._id!==X)),r(ke=>ke.filter(he=>he._id!==X));try{return{success:!0,...await IL(X)}}catch(ke){throw i(ee),r(ye),console.error("Error deleting test:",ke),ke}},Y=u.useCallback(async(X=1)=>{if($)try{const ee=await ML(X,15),ye=ee.data||[],ke=ee.totalPages||1;i(he=>X===1?ye:[...he,...ye]),R(X),A(X<ke)}catch(ee){console.error("Error fetching my tests:",ee)}},[$]),L=u.useCallback(async(X=1)=>{try{const ee=await NL(X,20),ye=ee.data||[],ke=ee.totalPages||1;a(he=>X===1?ye:[...he,...ye]),d(X),h(X<ke)}catch(ee){console.error("Error fetching flashcards:",ee)}},[]),H=async X=>{try{const ee=await qL(X);return L(1),ee}catch(ee){console.error("Error creating flashcard deck:",ee)}},Q=async(X,ee)=>{try{const ye=await HL(X,ee);return L(1),ye}catch(ye){throw console.error("Error updating flashcard deck:",ye),ye}},ie=async X=>{const ee=s;a(ye=>ye.filter(ke=>ke._id!==X));try{return{success:!0,...await GL(X)}}catch(ye){throw a(ee),console.error("Error deleting flashcard deck:",ye),ye}},G=async(X,ee,ye)=>{try{await YL({deckId:X,cardId:ee,quality:ye}),L(1)}catch(ke){console.error("Error reviewing flashcard:",ke)}},le=u.useCallback(async(X=1)=>{try{const ee=await QL(X,20),ye=ee.data||[],ke=ee.totalPages||1;x(he=>X===1?ye:[...he,...ye]),m(X),w(X<ke)}catch(ee){console.error("Error fetching sentence builders:",ee)}},[]),ue=async X=>{try{const ee=await KL(X);return le(1),ee}catch(ee){throw console.error("Error creating sentence builder deck:",ee),ee}},me=async(X,ee)=>{try{const ye=await JL(X,ee);return le(1),ye}catch(ye){throw console.error("Error updating sentence builder deck:",ye),ye}},W=async X=>{const ee=f;x(ye=>ye.filter(ke=>ke._id!==X));try{return{success:!0,...await tB(X)}}catch(ye){throw x(ee),console.error("Error deleting sentence builder deck:",ye),ye}},Me=u.useCallback(async X=>await ZL(X),[]),De=u.useCallback(async(X,ee={})=>await rB(X,ee),[]),Fe=u.useCallback(async X=>await nB(X),[]),ot=u.useCallback(async(X,ee)=>await oB(X,ee),[]),st=u.useCallback(async(X,ee)=>await iB(X,ee),[]),ze=u.useCallback(async(X,ee)=>await sB(X,ee),[]),Oe=u.useCallback(async(X={})=>{try{const ee=await aB(X);return g(ee.data||ee),ee}catch(ee){return console.error("Error fetching battle history:",ee),{data:[],total:0}}},[]),Re=u.useCallback(async(X=1)=>{try{const ee=await lB(X,15),ye=ee.data||[],ke=ee.totalPages||1;C(he=>X===1?ye:[...he,...ye]),z(X),B(X<ke)}catch(ee){console.error("Error fetching active battles:",ee)}},[]);u.useEffect(()=>{},[]),u.useEffect(()=>{if(!$&&!F){q.current&&q.current.disconnect();return}const X=cB.replace("http","ws")+"/arena";return q.current=Oo(X,{auth:{token:$,guestName:F},transports:["websocket"],forceNew:!0}),q.current.on("connect",()=>{console.log("Arena Socket connected:",q.current.id)}),q.current.on("connect_error",ee=>{console.error("Arena Socket connection error:",ee)}),q.current.on("battle_created",ee=>{console.log("Battle created:",ee)}),q.current.on("battle_update",ee=>{console.log("Battle updated:",ee),v(ee)}),q.current.on("battle_started",ee=>{v(ee)}),q.current.on("next_question_started",ee=>{v(ee)}),q.current.on("battle_finished",ee=>{v(ee)}),q.current.on("error",ee=>{Xe.error("Xatolik: "+ee)}),()=>{q.current&&q.current.disconnect()}},[$,F]);const qe=X=>{localStorage.setItem("jamm_guest_name",X),P(X)},ae=(X,ee="Yangi Bellashuv",ye="solo",ke="public")=>{q.current&&q.current.emit("create_battle",{testId:X,roomName:ee,mode:ye,visibility:ke})},Le=X=>{console.log("Emitting join_battle:",X),q.current?q.current.emit("join_battle",{roomId:X}):console.warn("Socket not connected, cannot join battle")},Ge=X=>{q.current&&q.current.emit("start_battle",{roomId:X})},at=(X,ee)=>{q.current&&q.current.emit("submit_answer",{roomId:X,answerIndex:ee})},oe=X=>{q.current&&q.current.emit("next_question",{roomId:X})},xe=X=>{q.current&&q.current.emit("end_battle",{roomId:X})},we=X=>{const ee=X||(j==null?void 0:j.roomId);ee&&q.current&&q.current.emit("leave_battle",{roomId:ee}),v(null)};return n.jsx(oC.Provider,{value:{tests:t,myTests:o,myTestsPage:V,myTestsHasMore:M,flashcardDecks:s,flashcardsPage:c,flashcardsHasMore:p,sentenceBuilderDecks:f,sentenceBuildersPage:S,sentenceBuildersHasMore:b,activeBattle:j,fetchTests:E,fetchMyTests:Y,createTest:I,deleteTest:J,updateTest:N,fetchFlashcards:L,createFlashcardDeck:H,updateFlashcardDeck:Q,deleteFlashcardDeck:ie,reviewFlashcard:G,fetchSentenceBuilders:le,createSentenceBuilderDeck:ue,updateSentenceBuilderDeck:me,deleteSentenceBuilderDeck:W,fetchSharedSentenceBuilderDeck:Me,fetchSentenceBuilderResults:De,fetchSentenceBuilderShareLinks:Fe,createSentenceBuilderShareLink:ot,deleteSentenceBuilderShareLink:st,submitSentenceBuilderAttempt:ze,createBattle:ae,joinBattle:Le,startBattle:Ge,submitAnswer:at,nextQuestion:oe,endBattle:xe,leaveBattle:we,battleHistory:y,fetchBattleHistory:Oe,activeBattles:k,activeBattlesPage:_,activeBattlesHasMore:D,fetchActiveBattles:Re,fetchTestResults:async(X,ee={})=>{try{return Ie.getState().token?await AL(X,ee):{data:[],total:0}}catch(ye){return console.error(ye),{data:[],total:0}}},fetchFlashcardDeck:async X=>{try{return await UL(X)}catch(ee){return console.error(ee),null}},joinFlashcardDeck:async X=>{try{return Ie.getState().token?(await VL(X),{success:!0}):{success:!1}}catch(ee){return console.error(ee),{success:!1}}},leaveFlashcardDeck:async X=>{try{return Ie.getState().token?(await WL(X),{success:!0}):{success:!1}}catch(ee){return console.error(ee),{success:!1}}},fetchSentenceBuilderDeck:async X=>{try{return await XL(X)}catch(ee){return console.error(ee),null}},checkSentenceBuilderAnswer:async(X,ee,ye)=>{try{return await eB(X,ee,ye)}catch(ke){throw console.error(ke),ke}},guestName:F,setGuestSession:qe,socketRef:q},children:e})},Ur=()=>{const e=u.useContext(oC);if(!e)throw new Error("useArena must be used within ArenaProvider");return e},uB=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,pB=et`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,hB=l.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 10000;
  animation: ${uB} 0.18s ease-out;
`,fB=l.div`
  width: min(100%, 860px);
  max-height: min(88vh, 920px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 22px;
  animation: ${pB} 0.22s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`,xB=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`;l.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;const gB=l.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`,Zi=l.div`
  margin-bottom: 16px;
`,es=l.label`
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`,Ah=l.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`,Oh=l.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: ${e=>e.$minHeight||"88px"};
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
  resize: vertical;

  &:focus {
    border-color: var(--primary-color);
  }
`,Fv=l.div`
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.5;
`,mB=l.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
`,yB=l.div`
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 18px;
  padding: 18px;
`,vB=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`,bB=l.h3`
  margin: 0;
  font-size: 15px;
  color: var(--text-color);
`,wB=l.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,Nv=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`,qv=l.span`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${e=>e.$tone||"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 12px;
  font-weight: 600;
`,kB=l.button`
  width: 100%;
  min-height: 52px;
  border-radius: 14px;
  border: 1px dashed var(--border-color);
  background: transparent;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 18px;
`,jB=l.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,SB=l.div`
  font-size: 13px;
  color: var(--text-muted-color);
  line-height: 1.5;
`,CB=l.button`
  min-width: 180px;
  height: 46px;
  border-radius: 12px;
  border: none;
  background: var(--primary-color);
  color: white;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;l.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;const zB=(e="")=>String(e).split(/[\s,]+/).map(t=>t.trim()).filter(Boolean),Uc=()=>({prompt:"",answer:"",extraTokens:""}),$B=(e="")=>String(e).split(/\n\s*\n+/).map(t=>t.trim()).filter(Boolean).map(t=>{const r=t.split(`
`).map(a=>a.trim()).filter(Boolean),o=r.find(a=>a.startsWith("$")),i=r.find(a=>a.startsWith('"')&&a.endsWith('"')||a.startsWith("'")&&a.endsWith("'")),s=r.find(a=>a.startsWith("`")&&a.endsWith("`"));return{prompt:o?o.replace(/^\$\s*/,"").trim():"",answer:i?i.slice(1,-1).trim():"",extraTokens:s?s.slice(1,-1).trim():""}}).filter(t=>t.prompt&&t.answer),_B=({onClose:e,initialDeck:t=null})=>{const{createSentenceBuilderDeck:r,updateSentenceBuilderDeck:o}=Ur(),i=!!(t!=null&&t._id),[s,a]=u.useState(""),[c,d]=u.useState(""),[p,h]=u.useState(""),[f,x]=u.useState([Uc()]),[S,m]=u.useState(!1);u.useEffect(()=>{if(i){a((t==null?void 0:t.title)||""),d((t==null?void 0:t.description)||""),h(""),x(((t==null?void 0:t.items)||[]).length?t.items.map(g=>({prompt:g.prompt||"",answer:Array.isArray(g.answerTokens)?g.answerTokens.join(" "):g.answer||"",extraTokens:Array.isArray(g.extraTokens)?g.extraTokens.join(", "):""})):[Uc()]);return}a(""),d(""),h(""),x([Uc()])},[t,i]);const b=u.useMemo(()=>f.filter(g=>g.prompt.trim()&&g.answer.trim()).length,[f]),w=(g,k,C)=>{const _={prompt:Pe.sentenceBuilderPromptChars,answer:Pe.sentenceBuilderAnswerChars,extraTokens:Pe.sentenceBuilderDescriptionChars};x(z=>z.map((D,B)=>B===g?{...D,[k]:_[k]?C.slice(0,_[k]):C}:D))},j=()=>{if(f.length>=30){be.error("Bitta to'plamga maksimal 30 ta savol qo'shiladi");return}x(g=>[...g,Uc()])},v=g=>{x(k=>k.filter((C,_)=>_!==g))},y=async()=>{var C,_,z,D;if(!s.trim()){be.error("To'plam nomini kiriting");return}const g=f.map(B=>({prompt:B.prompt.trim(),answer:B.answer.trim(),extraTokens:B.extraTokens.split(",").map(V=>V.trim()).filter(Boolean)})).filter(B=>B.prompt&&B.answer),k=$B(p);if(!g.length&&!k.length){be.error("Kamida bitta savol kiriting");return}m(!0);try{const B={title:s.trim(),description:c.trim(),items:k.length?void 0:g,pattern:k.length?p:""};i?await o(t._id,B):await r(B),be.success(i?"Gap tuzish to'plami yangilandi":"Gap tuzish to'plami yaratildi"),e()}catch(B){const V=Array.isArray((_=(C=B==null?void 0:B.response)==null?void 0:C.data)==null?void 0:_.message)?B.response.data.message[0]:((D=(z=B==null?void 0:B.response)==null?void 0:z.data)==null?void 0:D.message)||"Saqlashda xatolik yuz berdi";be.error(V)}finally{m(!1)}};return n.jsx(hB,{onClick:e,children:n.jsxs(fB,{onClick:g=>g.stopPropagation(),children:[n.jsxs(xB,{children:[n.jsx("h2",{children:i?"Gap Tuzish To'plamini Tahrirlash":"Yangi Gap Tuzish To'plami"}),n.jsx(Je,{onClick:e,children:n.jsx(nt,{size:18})})]}),n.jsxs(gB,{children:[n.jsxs(Zi,{children:[n.jsx(es,{children:"To'plam nomi"}),n.jsx(Ah,{placeholder:"Masalan: Past Simple gaplari",value:s,onChange:g=>a(g.target.value.slice(0,Pe.sentenceBuilderTitleChars)),maxLength:Pe.sentenceBuilderTitleChars})]}),n.jsxs(Zi,{children:[n.jsx(es,{children:"Tavsif"}),n.jsx(Oh,{$minHeight:"74px",placeholder:"Bu to'plam nima haqida?",value:c,onChange:g=>d(g.target.value.slice(0,Pe.sentenceBuilderDescriptionChars)),maxLength:Pe.sentenceBuilderDescriptionChars})]}),n.jsxs(Zi,{children:[n.jsx(es,{children:"Pattern orqali qo'shish"}),n.jsx(Oh,{$minHeight:"180px",placeholder:`$Men kecha maktabga bordim.
"I went to school yesterday"
\`my,are,today,tomorrow,go,will\`

$U bugun ishlayapti.
"She is working today"
\`was,were,tomorrow,goes\``,value:p,onChange:g=>h(g.target.value.slice(0,Pe.sentenceBuilderDescriptionChars*10))}),n.jsx(Fv,{children:"Pattern to'ldirilsa, shu formatdagi bloklardan savollar avtomatik olinadi."})]}),n.jsx(Fv,{children:"Har savolda siz prompt yozasiz, to'g'ri javobni kiritasiz. Javob avtomatik bo'laklarga ajratiladi. Istasangiz qo'shimcha chalg'ituvchi bo'laklarni ham vergul bilan kiriting."}),n.jsx(mB,{children:f.map((g,k)=>{const C=zB(g.answer),_=g.extraTokens.split(",").map(z=>z.trim()).filter(Boolean);return n.jsxs(yB,{children:[n.jsxs(vB,{children:[n.jsxs(bB,{children:["Savol #",k+1]}),f.length>1&&n.jsx(wB,{onClick:()=>v(k),children:n.jsx(lr,{size:16})})]}),n.jsxs(Zi,{children:[n.jsx(es,{children:"Savol / Prompt"}),n.jsx(Oh,{$minHeight:"88px",placeholder:"Masalan: Men kecha maktabga bordim.",value:g.prompt,onChange:z=>w(k,"prompt",z.target.value),maxLength:Pe.sentenceBuilderPromptChars})]}),n.jsxs(Zi,{children:[n.jsx(es,{children:"To'g'ri javob"}),n.jsx(Ah,{placeholder:"Masalan: I went to school yesterday",value:g.answer,onChange:z=>w(k,"answer",z.target.value),maxLength:Pe.sentenceBuilderAnswerChars}),C.length>0&&n.jsx(Nv,{children:C.map((z,D)=>n.jsx(qv,{$tone:"rgba(59, 130, 246, 0.12)",children:z},`${z}-${D}`))})]}),n.jsxs(Zi,{style:{marginBottom:0},children:[n.jsx(es,{children:"Chalg'ituvchi bo'laklar"}),n.jsx(Ah,{placeholder:"Masalan: my, are, today, tomorrow, go, will",value:g.extraTokens,onChange:z=>w(k,"extraTokens",z.target.value),maxLength:Pe.sentenceBuilderDescriptionChars}),_.length>0&&n.jsx(Nv,{children:_.map((z,D)=>n.jsx(qv,{$tone:"rgba(244, 114, 182, 0.12)",children:z},`${z}-${D}`))})]})]},k)})}),n.jsxs(kB,{onClick:j,children:[n.jsx(Et,{size:18}),"Yana savol qo'shish"]})]}),n.jsxs(jB,{children:[n.jsxs(SB,{children:["Tayyor savollar: ",b,". Bitta to'plamda ko'p savol saqlashingiz mumkin."]}),n.jsx(CB,{onClick:y,disabled:S,children:S?"Saqlanmoqda...":i?"Saqlash":"Yaratish"})]})]})})},TB=l.div`
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
`,EB=l.div`
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
`,RB=l.div`
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
`;l.button`
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
`;const PB=l.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,MB=l.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Yc=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ia=l.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`,Vc=l.input`
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
`,IB=l.textarea`
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
`,Wc=l.button`
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
`,Hv=l.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`,Gc=l.button`
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
`,AB=l.div`
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,OB=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,LB=l.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`,BB=l.div`
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
`,Qc=()=>({questionText:"",options:["",""],correctOptionIndex:0}),DB=({isOpen:e,onClose:t,initialTest:r=null})=>{const{fetchMyTests:o,updateTest:i}=Ur(),s=!!(r!=null&&r._id),[a,c]=u.useState("manual"),[d,p]=u.useState(""),[h,f]=u.useState(""),[x,S]=u.useState("single"),[m,b]=u.useState(!1),[w,j]=u.useState([Qc()]),[v,y]=u.useState("");if(u.useEffect(()=>{if(e){if(s){c("manual"),p((r==null?void 0:r.title)||""),f((r==null?void 0:r.description)||""),S((r==null?void 0:r.displayMode)||"single"),j(((r==null?void 0:r.questions)||[]).length?r.questions.map(M=>({questionText:M.questionText||"",options:Array.isArray(M.options)?[...M.options]:["",""],correctOptionIndex:Number(M.correctOptionIndex)||0})):[Qc()]),y("");return}c("manual"),p(""),f(""),S("single"),j([Qc()]),y("")}},[r,s,e]),!e)return null;const g=()=>{if(w.length>=30){be.error("Maksimal 30 ta savol qo'shish mumkin!");return}j([...w,Qc()])},k=M=>{w.length<=1||j(w.filter((A,O)=>O!==M))},C=(M,A)=>{const O=[...w];O[M].questionText=A.slice(0,Pe.testQuestionChars),j(O)},_=M=>{const A=[...w];A[M].options.length>=4||(A[M].options.push(""),j(A))},z=(M,A)=>{const O=[...w];O[M].options.length<=2||(O[M].options=O[M].options.filter((T,F)=>F!==A),(O[M].correctOptionIndex>=O[M].options.length||O[M].correctOptionIndex===A)&&(O[M].correctOptionIndex=0),j(O))},D=(M,A,O)=>{const T=[...w];T[M].options[A]=O.slice(0,Pe.testOptionChars),j(T)},B=(M,A)=>{const O=[...w];O[M].correctOptionIndex=A,j(O)},V=M=>{const A=[],O=M.split(`
`).map(F=>F.trim()).filter(Boolean);let T=null;for(let F of O)if(F.startsWith("$")){if(T&&T.questionText&&T.options.length>=2){if(T.correctOptionIndex===-1)throw new Error(`Savolga to'g'ri javob belgilanmagan: ${T.questionText}`);A.push(T)}T={questionText:F.substring(1).trim(),options:[],correctOptionIndex:-1}}else if(F.startsWith("+")){if(!T)throw new Error("Javobdan oldin savol yozilishi ($) kerak");T.options.push(F.substring(1).trim()),T.correctOptionIndex=T.options.length-1}else if(F.startsWith("-")){if(!T)throw new Error("Javobdan oldin savol yozilishi ($) kerak");T.options.push(F.substring(1).trim())}else throw new Error(`Tushunarsiz qator: ${F}. Faqat $, +, - ishlating.`);if(T){if(T.correctOptionIndex===-1)throw new Error(`Savolga to'g'ri javob belgilanmagan: ${T.questionText}`);if(T.options.length<2)throw new Error(`Savolda kamida 2 ta javob bo'lishi kerak: ${T.questionText}`);A.push(T)}return A},R=async()=>{var A,O;if(!d.trim())return be.error("Testga nom bering!");let M=[];if(a==="manual"){for(let T=0;T<w.length;T++){const F=w[T];if(!F.questionText.trim())return be.error(`${T+1}-shavol matni bo'sh!`);if(F.options.some(P=>!P.trim()))return be.error(`${T+1}-savolning barcha javoblarini to'ldiring!`)}M=w}else try{if(M=V(v),M.length===0)return be.error("Andazada hech qanday savol topilmadi.");if(M.length>30)return be.error("Andazada savollar soni 30 tadan oshmasligi kerak!")}catch(T){return be.error(`Xato: ${T.message}`)}try{b(!0);const T={title:d.trim(),description:h.trim(),isPublic:!0,displayMode:x,questions:M};s?await i(r._id,T):await nC(T),await o(),be.success(s?"Test yangilandi":"Test yaratildi"),t()}catch(T){const F=((O=(A=T==null?void 0:T.response)==null?void 0:A.data)==null?void 0:O.message)||T.message||"Test yaratishda xatolik";be.error(F)}finally{b(!1)}};return n.jsx(TB,{onClick:t,children:n.jsxs(EB,{onClick:M=>M.stopPropagation(),children:[n.jsxs(RB,{children:[n.jsx("h2",{children:s?"Testni Tahrirlash":"Yangi Test Yaratish"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(PB,{children:[n.jsxs(Yc,{children:[n.jsx(Ia,{children:"Test nomi"}),n.jsx(Vc,{placeholder:"Masalan: JavaScript Asoslari",value:d,onChange:M=>p(M.target.value.slice(0,Pe.testTitleChars)),maxLength:Pe.testTitleChars})]}),n.jsxs(Yc,{children:[n.jsx(Ia,{children:"Test haqida (Ixtiyoriy)"}),n.jsx(Vc,{placeholder:"Qisqacha tavsif...",value:h,onChange:M=>f(M.target.value.slice(0,Pe.testDescriptionChars)),maxLength:Pe.testDescriptionChars})]}),n.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"16px",padding:"16px",background:"rgba(0,0,0,0.1)",borderRadius:"8px",border:"1px solid var(--border-color)"},children:n.jsxs(Yc,{style:{gridColumn:"span 1"},children:[n.jsx(Ia,{children:"Test ko'rinishi"}),n.jsxs(Hv,{style:{marginBottom:0},children:[n.jsxs(Gc,{active:x==="single",onClick:()=>S("single"),type:"button",style:{padding:"8px"},children:[n.jsx(j3,{size:14})," 1-talab"]}),n.jsxs(Gc,{active:x==="list",onClick:()=>S("list"),type:"button",style:{padding:"8px"},children:[n.jsx(E3,{size:14})," Ro'yxat"]})]})]})}),n.jsxs(Hv,{children:[n.jsxs(Gc,{active:a==="manual",onClick:()=>c("manual"),type:"button",children:[n.jsx(Et,{size:16})," Qo'lda kiritish"]}),n.jsxs(Gc,{active:a==="template",onClick:()=>c("template"),type:"button",children:[n.jsx(m4,{size:16})," Maxsus Andaza"]})]}),a==="manual"?n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[w.map((M,A)=>n.jsxs(AB,{children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsxs(Ia,{children:[A+1," - Savol"]}),n.jsx(Je,{onClick:()=>k(A),disabled:w.length<=1,style:{color:"var(--danger-color)"},children:n.jsx(lr,{size:18})})]}),n.jsx(Vc,{placeholder:"Savol matni...",value:M.questionText,onChange:O=>C(A,O.target.value)}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[n.jsx(Ia,{style:{fontSize:"12px",color:"var(--text-muted-color)"},children:"Javob variantlari (To'g'ri javobni belgilang)"}),M.options.map((O,T)=>n.jsxs(OB,{children:[n.jsx(LB,{type:"radio",name:`correct-${A}`,checked:M.correctOptionIndex===T,onChange:()=>B(A,T)}),n.jsx(Vc,{style:{flex:1},placeholder:`${T+1} - variant`,value:O,onChange:F=>D(A,T,F.target.value)}),n.jsx(Je,{onClick:()=>z(A,T),disabled:M.options.length<=2,children:n.jsx(nt,{size:18})})]},T))]}),M.options.length<4&&n.jsxs(Wc,{type:"button",style:{alignSelf:"flex-start",marginTop:"8px",fontSize:"12px",padding:"6px 12px"},onClick:()=>_(A),children:[n.jsx(Et,{size:14})," Variant qo'shish"]})]},A)),n.jsxs(Wc,{type:"button",style:{borderStyle:"dashed",padding:"16px"},onClick:g,disabled:w.length>=30,children:[n.jsx(Et,{size:18})," ",w.length>=30?"Limitga yetildi (30/30)":"Yana savol qo'shish"]})]}):n.jsxs(Yc,{children:[n.jsxs(BB,{children:[n.jsx("b",{children:"Andaza qoidalari:"})," ",n.jsx("br",{}),n.jsx("code",{children:"$"})," belgisi bilan ",n.jsx("b",{children:"Savol"}),"ni boshlang. ",n.jsx("br",{}),n.jsx("code",{children:"-"})," belgisi bilan ",n.jsx("b",{children:"Xato javoblar"}),"ni kiriting."," ",n.jsx("br",{}),n.jsx("code",{children:"+"})," belgisi bilan bitta ",n.jsx("b",{children:"To'g'ri javob"}),"ni kiriting. ",n.jsx("br",{}),"Qator tashlab navbatdagi savolga o'tasiz."]}),n.jsx(IB,{placeholder:`$ JavaScript qaysi yilda yaratilgan?
- 1990
- 1994
+ 1995
- 2000

$ Const qanday o'zgaruvchi?
- O'zgaruvchan
+ O'zgarmas
- Funksiya`,value:v,onChange:M=>y(M.target.value)})]})]}),n.jsxs(MB,{children:[n.jsx(Wc,{onClick:t,disabled:m,children:"Bekor qilish"}),n.jsx(Wc,{primary:!0,onClick:R,disabled:m,children:m?"Saqlanmoqda...":s?"O'zgarishlarni saqlash":"Testni Yaratish"})]})]})})},Kc=l.div`
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
`,FB=l.div`
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
`,NB=l.button`
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
`,qB=l.h2`
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
`,Uv=l.div`
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
`,Yv=l.h3`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: var(--text-color);
  font-weight: 500;
`,Vv=l.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Wv=l.button`
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
`,Gv=l.div`
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
`,Qv=l.span`
  flex: 1;
  line-height: 1.5;
`,Kv=l.div`
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,HB=l.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
`,UB=l.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`,YB=l.div`
  background-color: var(--bg-color);
  border: 1px solid
    ${e=>e.$correct?"rgba(34, 197, 94, 0.3)":"rgba(239, 68, 68, 0.28)"};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,VB=l.div`
  color: var(--text-color);
  font-weight: 700;
  line-height: 1.5;
`,Lh=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--text-muted-color);
  font-size: 0.95rem;
`,WB=l.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  background-color: ${e=>e.$correct?"rgba(34, 197, 94, 0.12)":"rgba(239, 68, 68, 0.12)"};
  color: ${e=>e.$correct?"#22c55e":"#ef4444"};
`,GB=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,QB=l.div`
  border: 1px solid
    ${e=>e.$isCorrect?"rgba(34, 197, 94, 0.3)":e.$isSelected?"rgba(239, 68, 68, 0.28)":"var(--border-color)"};
  background-color: ${e=>e.$isCorrect?"rgba(34, 197, 94, 0.08)":e.$isSelected?"rgba(239, 68, 68, 0.08)":"var(--tertiary-color)"};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,KB=l.div`
  color: var(--text-color);
  line-height: 1.45;
`,JB=l.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,Bh=l.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  background-color: ${e=>e.$tone==="correct"?"rgba(34, 197, 94, 0.12)":e.$tone==="selected"?"rgba(239, 68, 68, 0.12)":e.$tone==="selected-correct"?"rgba(59, 130, 246, 0.12)":"var(--secondary-color)"};
  color: ${e=>e.$tone==="correct"?"#22c55e":e.$tone==="selected"?"#ef4444":e.$tone==="selected-correct"?"#60a5fa":"var(--text-muted-color)"};
`,Jv=l.button`
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
`,XB=l.div`
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
`,ZB=l.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`,e9=l.button`
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
`,t9=l.div`
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
`,r9=l.div`
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
`,n9=l.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 1.2rem;
`,o9=l.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 0.95rem;
  line-height: 1.5;
`,i9=l.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`,iC=l.button`
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
`,s9=l(iC)`
  background: var(--primary-color);
  color: white;
`,a9=l(iC)`
  background: rgba(240, 71, 71, 0.15);
  color: #f04747;
  border: 1px solid rgba(240, 71, 71, 0.3);
`,l9=({test:e,onClose:t,shareShortCode:r=null})=>{const o=Number(e.timeLimit)||0,i=e.showResults??!0,s=e.displayMode||"single",[a,c]=u.useState(0),[d,p]=u.useState(0),[h,f]=u.useState(null),[x,S]=u.useState(!1),[m,b]=u.useState(!1),[w,j]=u.useState(!1),[v,y]=u.useState(""),[g,k]=u.useState(null),[C,_]=u.useState(!1),[z,D]=u.useState(!1),[B,V]=u.useState([]),[R,M]=u.useState(o*60),[A,O]=u.useState([]),[T,F]=u.useState({}),{user:P,token:q}=Ie(),{guestName:$,setGuestSession:E}=Ur(),I=e.questions||[],N=I[a],J=u.useCallback(()=>s==="list"?I.map((ue,me)=>T[me]??-1):I.map((ue,me)=>A[me]??-1),[s,I,T,A]),Y=u.useCallback(()=>{D(!1);const ue=J();L(ue)},[J]);u.useEffect(()=>{if(m)return;const ue=me=>{me.preventDefault(),me.returnValue="";const W=J(),Me="http://localhost:3000",De=JSON.stringify({answers:W,shareShortCode:r||null}),Fe={"Content-Type":"application/json"};q&&(Fe.Authorization=`Bearer ${q}`),console.log(e),fetch(`${Me}/arena/tests/${e._id}/submit`,{method:"POST",headers:Fe,body:De,keepalive:!0}).catch(()=>{})};return window.addEventListener("beforeunload",ue),()=>window.removeEventListener("beforeunload",ue)},[m,J,e._id,q]);const L=async ue=>{_(!0),V(ue);try{const me=await FL(e._id,{answers:ue,shareShortCode:r||null});k(me),p(me.score)}catch(me){console.error("Failed to submit answers:",me),p(0)}finally{_(!1),b(!0)}};u.useEffect(()=>{if(o>0&&!m&&R>0){const ue=setInterval(()=>M(me=>me-1),1e3);return()=>clearInterval(ue)}else if(o>0&&R<=0&&!m)if(s==="list")le();else{const ue=I.map((me,W)=>A[W]??-1);L(ue)}},[o,R,m,s]);const H=ue=>{const me=Math.floor(ue/60),W=ue%60;return`${me}:${W<10?"0":""}${W}`};u.useEffect(()=>{if(m&&!w){const ue=(g==null?void 0:g.showResults)??i;if(ue&&!g)return;const me=!!P;(me||$)&&(j(!0),(async()=>{try{await mt.post("http://localhost:3000/arena/battles/save-solo",{testId:e._id,score:d,totalQuestions:I.length,guestName:me?null:$,answers:B,results:ue?(g==null?void 0:g.results)||[]:[],shareShortCode:r||null},{headers:q?{Authorization:`Bearer ${q}`}:{}})}catch(De){console.error("Yakkalik test natijasini saqlashda xatolik:",De)}})())}},[m,w,P,q,$,e._id,d,I.length,B,g,i,r]),u.useEffect(()=>{M(o*60)},[o,e._id]);const Q=(g==null?void 0:g.showResults)??i,ie=ue=>{if(x)return;f(ue),S(!0);const me=[...A];me[a]=ue,O(me),setTimeout(()=>{if(a+1<I.length)c(a+1),f(null),S(!1);else{const W=I.map((Me,De)=>De===a?ue:me[De]??-1);L(W)}},300)},G=(ue,me)=>{m||F(W=>({...W,[ue]:me}))},le=()=>{if(m)return;const ue=I.map((me,W)=>T[W]??-1);L(ue)};return!q&&!$?n.jsx(Kc,{children:n.jsxs(XB,{children:[n.jsx("h2",{children:"Ismingizni kiriting"}),n.jsx("p",{style:{color:"var(--text-muted-color)",margin:0},children:"Testda qatnashish uchun ismingizni kiriting."}),n.jsx(ZB,{placeholder:"Ismingiz...",value:v,onChange:ue=>y(ue.target.value)}),n.jsx(e9,{onClick:()=>v.trim()&&E(v.trim()),children:"Kirish"}),n.jsx("button",{onClick:t,style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},children:"Bekor qilish"})]})}):C?n.jsx(Kc,{children:n.jsx(Kv,{children:n.jsx("h2",{children:"Javoblar tekshirilmoqda..."})})}):m?n.jsx(Kc,{children:n.jsxs(Kv,{children:[n.jsx("h2",{children:"Test yakunlandi!"}),Q&&g?n.jsxs(n.Fragment,{children:[n.jsxs(HB,{children:[g.score," / ",g.total]}),n.jsx("p",{style:{color:"var(--text-muted-color)"},children:"To'g'ri javoblar"}),n.jsx(UB,{children:I.map((ue,me)=>{var De,Fe,ot;const W=(De=g.results)==null?void 0:De.find(st=>st.questionIndex===me),Me=B[me];return n.jsxs(YB,{$correct:!!(W!=null&&W.correct),children:[n.jsxs(Lh,{children:[n.jsxs(VB,{children:[me+1,". ",ue.questionText]}),n.jsx(WB,{$correct:!!(W!=null&&W.correct),children:W!=null&&W.correct?n.jsxs(n.Fragment,{children:[n.jsx(rn,{size:14})," To'g'ri"]}):n.jsxs(n.Fragment,{children:[n.jsx(yl,{size:14})," Xato"]})})]}),n.jsx(Lh,{children:n.jsxs("span",{children:["Sizning javobingiz:"," ",n.jsx("strong",{style:{color:"var(--text-color)"},children:Me>=0?(Fe=ue.options)==null?void 0:Fe[Me]:"Javob berilmagan"})]})}),n.jsx(Lh,{children:n.jsxs("span",{children:["To'g'ri javob:"," ",n.jsx("strong",{style:{color:"#22c55e"},children:(W==null?void 0:W.correctOptionIndex)>=0?(ot=ue.options)==null?void 0:ot[W.correctOptionIndex]:"Ma'lumot yo'q"})]})}),n.jsx(GB,{children:(ue.options||[]).map((st,ze)=>{const Oe=Me===ze,Re=(W==null?void 0:W.correctOptionIndex)===ze,qe=Oe&&Re?"selected-correct":Re?"correct":Oe?"selected":"default";return n.jsxs(QB,{$isSelected:Oe,$isCorrect:Re,children:[n.jsxs(KB,{children:[String.fromCharCode(65+ze),". ",st]}),(Oe||Re)&&n.jsx(JB,{children:Oe&&Re?n.jsxs(Bh,{$tone:qe,children:[n.jsx(rn,{size:12}),"Siz tanlagan va to'g'ri"]}):n.jsxs(n.Fragment,{children:[Oe&&n.jsxs(Bh,{$tone:"selected",children:[n.jsx(yl,{size:12}),"Siz tanlagan"]}),Re&&n.jsxs(Bh,{$tone:"correct",children:[n.jsx(rn,{size:12}),"To'g'ri javob"]})]})})]},`${ue._id||me}-${ze}`)})})]},ue._id||me)})})]}):n.jsxs(n.Fragment,{children:[n.jsx(rn,{size:64,color:"var(--primary-color)"}),n.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:"1.2rem"},children:"Javoblaringiz saqlandi."})]}),n.jsx(Jv,{onClick:t,children:"Testlar ro'yxatiga qaytish"})]})}):N?n.jsxs(Kc,{style:s==="list"?{maxWidth:"900px"}:{},children:[n.jsxs(FB,{children:[n.jsxs(NB,{onClick:()=>D(!0),children:[n.jsx(nr,{size:20})," Orqaga"]}),n.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:"16px",alignItems:"center",flexShrink:0},children:o>0&&n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",color:R<=60?"var(--danger-color)":"var(--primary-color)",fontWeight:"bold"},children:[n.jsx(im,{size:18})," ",n.jsx("span",{children:H(R)})]})}),n.jsx("div",{style:{color:"var(--text-muted-color)"},children:s==="single"?`${a+1} / ${I.length}`:`${I.length} ta savol`}),n.jsx(qB,{children:e.title})]}),s==="single"?n.jsxs("div",{children:[n.jsx(Uv,{children:n.jsx(Yv,{children:N.questionText})}),n.jsx(Vv,{children:N.options.map((ue,me)=>{const W=["A","B","D","E","F","G"][me]||String.fromCharCode(65+me);return n.jsxs(Wv,{disabled:x,isSelected:h===me,isCorrect:!1,isRevealed:!1,showResults:!1,onClick:()=>ie(me),children:[n.jsx(Gv,{isSelected:h===me,isCorrect:!1,isRevealed:!1,showResults:!1,children:W}),n.jsx(Qv,{children:ue})]},me)})})]}):n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[I.map((ue,me)=>n.jsxs("div",{children:[n.jsx(Uv,{children:n.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start"},children:[n.jsxs("div",{style:{fontWeight:"bold",color:"var(--primary-color)",fontSize:"1.1rem",marginTop:"2px"},children:[me+1,"."]}),n.jsx(Yv,{children:ue.questionText})]})}),n.jsx(Vv,{children:ue.options.map((W,Me)=>{const De=["A","B","D","E","F","G"][Me]||String.fromCharCode(65+Me),Fe=T[me]===Me;return n.jsxs(Wv,{disabled:m,isSelected:Fe,isCorrect:!1,isRevealed:!1,showResults:!1,onClick:()=>G(me,Me),children:[n.jsx(Gv,{isSelected:Fe,isCorrect:!1,isRevealed:!1,showResults:!1,children:De}),n.jsx(Qv,{children:W})]},Me)})})]},me)),n.jsx(Jv,{onClick:le,style:{marginTop:"16px",alignSelf:"center",minWidth:"200px"},children:"Yakunlash"})]}),z&&n.jsx(t9,{onClick:()=>D(!1),children:n.jsxs(r9,{onClick:ue=>ue.stopPropagation(),children:[n.jsx(n9,{children:"Testni yakunlaysizmi?"}),n.jsx(o9,{children:"Hozirgi natijangiz qabul qilinadi. Javob bermagan savollaringiz 0 ball hisoblanadi."}),n.jsxs(i9,{children:[n.jsx(s9,{onClick:()=>D(!1),children:"Davom etish"}),n.jsx(a9,{onClick:Y,children:"Chiqish"})]})]})})]}):null},c9=l.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.28);
  z-index: 10000;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    background: var(--background-color);
  }
`,d9=l.aside`
  width: min(680px, 100vw);
  height: 100vh;
  border-left: 1px solid var(--border-color);
  background: var(--background-color);
  display: flex;
  flex-direction: column;
  animation: slideInResultsPane 0.22s ease-out;

  @keyframes slideInResultsPane {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
  }
`,u9=l.div`
  padding: 14px 14px 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
`,p9=l.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`,h9=l.div`
  min-width: 0;
`,f9=l.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,x9=l.h2`
  margin: 4px 0 0;
  color: var(--text-color);
  font-size: 20px;
  line-height: 1.2;
`,g9=l.p`
  margin: 4px 0 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,m9=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`,y9=l.button`
  min-height: 34px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,v9=l.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b9=l.label`
  min-height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
`,w9=l.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 13px;
  outline: none;
`,k9=l.select`
  min-height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 13px;
  outline: none;
`,j9=l.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,S9=l.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,Jc=l.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Xc=l.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`,Zc=l.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
`,ed=l.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`,C9=l.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
`,z9=l.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  overflow: hidden;
`,$9=l.div`
  overflow-x: auto;
`,_9=l.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 620px;
`,ti=l.th`
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 800;
  text-align: left;
  white-space: nowrap;
`,ri=l.td`
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  font-size: 13px;
  vertical-align: top;
`,T9=l.tr`
  cursor: pointer;

  &:hover td {
    background: rgba(148, 163, 184, 0.04);
  }
`,E9=l.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R9=l.div`
  font-weight: 700;
  color: var(--text-color);
`,Dh=l.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`,P9=l.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`,M9=l.span`
  color: ${e=>e.$value>=80?"#22c55e":e.$value>=50?"var(--text-color)":"#ef4444"};
  font-weight: 800;
`,I9=l.button`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,A9=l.td`
  padding: 10px 12px 12px;
  background: rgba(148, 163, 184, 0.04);
  border-bottom: 1px solid var(--border-color);
`,O9=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,L9=l.div`
  border: 1px solid
    ${e=>e.$correct?"rgba(34, 197, 94, 0.22)":"rgba(239, 68, 68, 0.22)"};
  border-radius: 10px;
  background: ${e=>e.$correct?"rgba(34, 197, 94, 0.05)":"rgba(239, 68, 68, 0.05)"};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,B9=l.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`,D9=l.div`
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`,F9=l.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: ${e=>e.$correct?"rgba(34, 197, 94, 0.12)":"rgba(239, 68, 68, 0.12)"};
  color: ${e=>e.$correct?"#22c55e":"#ef4444"};
  font-size: 11px;
  font-weight: 700;
`,Aa=l.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;

  strong {
    color: var(--text-color);
  }
`,Xv=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Zv=l.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${e=>e.$bg||"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`,N9=l.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,q9=l.div`
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.08);
  padding: 8px 10px;
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.45;
`,H9=l.div`
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  padding: 24px 14px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 13px;
`,U9=l.div`
  height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  opacity: 0.7;
`,Y9=(e,t)=>(e==null?void 0:e.questionIndex)!==void 0&&(e==null?void 0:e.questionIndex)!==null?String(e.questionIndex):e!=null&&e.prompt?`prompt:${e.prompt}`:`q:${t}`,ni=(e="")=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),sC=e=>{if(!e)return"";try{return new Date(e).toLocaleString("uz-UZ")}catch{return""}},V9=e=>{const t=e.length,r=t?Math.round(e.reduce((s,a)=>s+Number(a.accuracy||0),0)/t):0,o=new Map;e.forEach(s=>{(s.breakdowns||[]).forEach((a,c)=>{const d=Y9(a,c),p=o.get(d)||{prompt:a.prompt||`Savol #${c+1}`,correct:0,total:0};p.total+=1,a.isCorrect&&(p.correct+=1),o.set(d,p)})});const i=Array.from(o.values()).map(s=>({...s,rate:s.total?Math.round(s.correct/s.total*100):0})).sort((s,a)=>a.rate-s.rate);return{submittedCount:t,mastery:r,easiest:i[0]||null,hardest:i[i.length-1]||null}},W9=({title:e,filteredResults:t,analytics:r})=>{var c,d,p,h;const o=t.map(f=>`
        <tr>
          <td>${ni(f.participantName||"Foydalanuvchi")}</td>
          <td>${ni(f.groupName||"-")}</td>
          <td>${ni(sC(f.createdAt))}</td>
          <td>${f.score}</td>
          <td>${f.total}</td>
          <td>${f.accuracy}%</td>
        </tr>
      `).join(""),i=`
    <!doctype html>
    <html lang="uz">
      <head>
        <meta charset="utf-8" />
        <title>${ni(e)} - Hisobot</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 28px; font-family: Arial, sans-serif; color: #0f172a; }
          h1, p { margin: 0; }
          .head { margin-bottom: 18px; }
          .sub { margin-top: 6px; color: #475569; font-size: 13px; }
          .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 16px; }
          .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px; background: #f8fafc; }
          .label { color: #475569; font-size: 11px; font-weight: 700; }
          .value { font-size: 22px; font-weight: 800; margin-top: 4px; }
          .meta { color: #475569; font-size: 11px; margin-top: 4px; line-height: 1.4; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 12px; text-align: left; }
          th { background: #f1f5f9; color: #475569; }
        </style>
      </head>
      <body>
        <div class="head">
          <h1>${ni(e)} natijalari</h1>
          <p class="sub">Filtrlangan hisobot</p>
        </div>
        <section class="stats">
          <div class="card"><div class="label">Topshirganlar</div><div class="value">${r.submittedCount}</div></div>
          <div class="card"><div class="label">O'zlashtirish</div><div class="value">${r.mastery}%</div></div>
          <div class="card"><div class="label">Eng oson savol</div><div class="meta">${ni(((c=r.easiest)==null?void 0:c.prompt)||"Hali ma'lumot yo'q")}</div><div class="value">${((d=r.easiest)==null?void 0:d.rate)??0}%</div></div>
          <div class="card"><div class="label">Eng qiyin savol</div><div class="meta">${ni(((p=r.hardest)==null?void 0:p.prompt)||"Hali ma'lumot yo'q")}</div><div class="value">${((h=r.hardest)==null?void 0:h.rate)??0}%</div></div>
        </section>
        <table>
          <thead>
            <tr>
              <th>Talaba</th>
              <th>Guruh</th>
              <th>Sana</th>
              <th>To'g'ri</th>
              <th>Jami</th>
              <th>Foiz</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
      </body>
    </html>
  `,s=document.createElement("iframe");s.style.position="fixed",s.style.right="0",s.style.bottom="0",s.style.width="0",s.style.height="0",s.style.border="0",s.setAttribute("aria-hidden","true");const a=()=>{window.setTimeout(()=>{s.remove()},1200)};s.onload=()=>{const f=s.contentWindow;if(!f){a();return}f.focus(),f.print(),a()},s.srcdoc=i,document.body.appendChild(s)},aC=({title:e,subtitle:t,searchPlaceholder:r="Qidirish...",loading:o=!1,results:i=[],onClose:s})=>{var b,w,j,v;const[a,c]=u.useState(""),[d,p]=u.useState("all"),[h,f]=u.useState(null),x=u.useMemo(()=>Array.from(new Set(i.map(y=>y.groupName).filter(Boolean))).sort((y,g)=>y.localeCompare(g)),[i]),S=u.useMemo(()=>{const y=a.trim().toLowerCase();return i.filter(g=>{const k=!y||String(g.participantName||"").toLowerCase().includes(y)||String(g.groupName||"").toLowerCase().includes(y),C=d==="all"||String(g.groupName||"")===d;return k&&C})},[d,i,a]),m=u.useMemo(()=>V9(S),[S]);return n.jsx(c9,{onClick:s,children:n.jsxs(d9,{onClick:y=>y.stopPropagation(),children:[n.jsxs(u9,{children:[n.jsxs(p9,{children:[n.jsxs(h9,{children:[n.jsxs(f9,{onClick:s,children:[n.jsx(nr,{size:16}),"Orqaga"]}),n.jsx(x9,{children:e}),n.jsx(g9,{children:t})]}),n.jsx(m9,{children:n.jsxs(y9,{type:"button",onClick:()=>W9({title:e,filteredResults:S,analytics:m}),children:[n.jsx(s4,{size:14}),"PDF"]})})]}),n.jsxs(v9,{children:[n.jsxs(b9,{children:[n.jsx(rc,{size:14}),n.jsx(w9,{placeholder:r,value:a,onChange:y=>c(y.target.value)})]}),n.jsxs(k9,{value:d,onChange:y=>p(y.target.value),children:[n.jsx("option",{value:"all",children:"Barcha guruhlar"}),x.map(y=>n.jsx("option",{value:y,children:y},y))]})]})]}),n.jsxs(j9,{children:[n.jsxs(S9,{children:[n.jsxs(Jc,{children:[n.jsx(Xc,{children:"Topshirganlar"}),n.jsx(Zc,{children:m.submittedCount}),n.jsx(ed,{children:"Filtrlangan ishlar soni"})]}),n.jsxs(Jc,{children:[n.jsx(Xc,{children:"O'zlashtirish"}),n.jsxs(Zc,{children:[m.mastery,"%"]}),n.jsx(ed,{children:"O'rtacha natija"})]}),n.jsxs(Jc,{children:[n.jsx(Xc,{children:"Eng oson savol"}),n.jsxs(Zc,{children:[((b=m.easiest)==null?void 0:b.rate)??0,"%"]}),n.jsx(ed,{children:((w=m.easiest)==null?void 0:w.prompt)||"Hali ma'lumot yo'q"})]}),n.jsxs(Jc,{children:[n.jsx(Xc,{children:"Eng qiyin savol"}),n.jsxs(Zc,{children:[((j=m.hardest)==null?void 0:j.rate)??0,"%"]}),n.jsx(ed,{children:((v=m.hardest)==null?void 0:v.prompt)||"Hali ma'lumot yo'q"})]})]}),n.jsx(C9,{children:"Barcha natijalar"}),o?n.jsx(n.Fragment,{children:Array.from({length:5}).map((y,g)=>n.jsx(U9,{},g))}):S.length===0?n.jsx(H9,{children:"Filtr bo'yicha natija topilmadi."}):n.jsx(z9,{children:n.jsx($9,{children:n.jsxs(_9,{children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx(ti,{children:"Talaba"}),n.jsx(ti,{children:"Guruh"}),n.jsx(ti,{children:"Sana"}),n.jsx(ti,{children:"To'g'ri"}),n.jsx(ti,{children:"Jami"}),n.jsx(ti,{children:"Foiz"}),n.jsx(ti,{})]})}),n.jsx("tbody",{children:S.map(y=>{const g=h===y.id;return n.jsxs(Qe.Fragment,{children:[n.jsxs(T9,{onClick:()=>f(k=>k===y.id?null:y.id),children:[n.jsx(ri,{children:n.jsxs(E9,{children:[n.jsx(R9,{children:y.participantName}),n.jsxs(Dh,{children:[(y.breakdowns||[]).length," ta savol"]})]})}),n.jsx(ri,{children:y.groupName?n.jsx(P9,{children:y.groupName}):n.jsx(Dh,{children:"-"})}),n.jsx(ri,{children:n.jsx(Dh,{children:sC(y.createdAt)})}),n.jsx(ri,{children:y.score}),n.jsx(ri,{children:y.total}),n.jsx(ri,{children:n.jsxs(M9,{$value:y.accuracy,children:[y.accuracy,"%"]})}),n.jsx(ri,{children:n.jsx(I9,{type:"button",onClick:k=>{k.stopPropagation(),f(C=>C===y.id?null:y.id)},children:g?n.jsx(Ad,{size:14}):n.jsx(jx,{size:14})})})]}),g?n.jsx("tr",{children:n.jsx(A9,{colSpan:7,children:n.jsx(O9,{children:(y.breakdowns||[]).map((k,C)=>n.jsxs(L9,{$correct:k.isCorrect,children:[n.jsxs(B9,{children:[n.jsxs(D9,{children:[C+1,". ",k.prompt||"Savol"]}),n.jsx(F9,{$correct:k.isCorrect,children:k.isCorrect?"To'g'ri":"Xato"})]}),Array.isArray(k.selectedTokens)?n.jsxs(n.Fragment,{children:[n.jsx(Aa,{children:"Siz tuzgan gap"}),n.jsx(Xv,{children:(k.selectedTokens||[]).length?k.selectedTokens.map((_,z)=>n.jsx(Zv,{$bg:"rgba(59, 130, 246, 0.12)",children:_},`${_}-${z}`)):n.jsx(Aa,{children:n.jsx("strong",{children:"Javob yuborilmagan"})})}),n.jsx(Aa,{children:"To'g'ri javob"}),n.jsx(Xv,{children:(k.expectedTokens||[]).map((_,z)=>n.jsx(Zv,{$bg:"rgba(34, 197, 94, 0.14)",children:_},`${_}-${z}`))}),!k.isCorrect&&(k.mistakes||[]).length>0?n.jsx(N9,{children:(k.mistakes||[]).map((_,z)=>n.jsxs(q9,{children:[_.position,"-bo'lak: siz"," ",n.jsx("strong",{children:_.actual||"hech narsa"})," ","tanladingiz. To'g'risi"," ",n.jsx("strong",{children:_.expected||"ortiqcha bo'lak"}),"."]},`${C}-${z}`))}):null]}):n.jsxs(n.Fragment,{children:[n.jsxs(Aa,{children:["Siz tanlagan javob:"," ",n.jsx("strong",{children:k.selectedText||"Javob berilmagan"})]}),n.jsxs(Aa,{children:["To'g'ri javob:"," ",n.jsx("strong",{children:k.correctText||"Ma'lumot yo'q"})]})]})]},`${y.id}-${C}`))})})}):null]},y.id)})})]})})})]})]})})},G9=(e="")=>{const t=String(e).match(/\(([^()]+)\)\s*$/);return t?t[1].trim():""},Q9=(e="")=>String(e).replace(/\s*\([^()]+\)\s*$/,"").trim(),K9=({test:e,onClose:t})=>{const{fetchTestResults:r}=Ur(),[o,i]=u.useState([]),[s,a]=u.useState(!0);u.useEffect(()=>{let d=!0;return(async()=>{if(e!=null&&e._id){a(!0);try{const h=await r(e._id,{page:1,limit:500});if(!d)return;const x=(Array.isArray(h)?h:(h==null?void 0:h.data)||[]).flatMap(S=>(S.participants||[]).map((m,b)=>{var w,j,v,y,g,k;return{id:`${S._id||S.createdAt}-${m.userId||b}`,participantName:Q9(m.nickname)||"Foydalanuvchi",groupName:G9(m.nickname),createdAt:S.createdAt,score:Number(m.score||0),total:Number(m.total||((w=m.results)==null?void 0:w.length)||((j=e.questions)==null?void 0:j.length)||0),accuracy:Number(m.total||((v=m.results)==null?void 0:v.length)||((y=e.questions)==null?void 0:y.length)||0)>0?Math.round(Number(m.score||0)/Number(m.total||((g=m.results)==null?void 0:g.length)||((k=e.questions)==null?void 0:k.length)||0)*100):0,breakdowns:(m.results||[]).map(C=>{var D,B,V;const _=(D=e.questions)==null?void 0:D[C.questionIndex],z=Array.isArray(m.answers)?m.answers[C.questionIndex]:-1;return{questionIndex:C.questionIndex,prompt:(_==null?void 0:_.questionText)||`Savol #${C.questionIndex+1}`,isCorrect:!!C.correct,selectedText:z>=0?(B=_==null?void 0:_.options)==null?void 0:B[z]:"Javob berilmagan",correctText:C.correctOptionIndex>=0?(V=_==null?void 0:_.options)==null?void 0:V[C.correctOptionIndex]:"Ma'lumot yo'q"}})}})).sort((S,m)=>new Date(m.createdAt||0).getTime()-new Date(S.createdAt||0).getTime());i(x)}catch(h){console.error("Failed to load test results",h),d&&i([])}finally{d&&a(!1)}}})(),()=>{d=!1}},[r,e]);const c=u.useMemo(()=>`"${(e==null?void 0:e.title)||"Test"}" bo'yicha ishlagan foydalanuvchilar, ularning natijasi va har bir savoldagi breakdown.`,[e]);return e?n.jsx(aC,{title:"Test natijalari",subtitle:c,searchPlaceholder:"Talaba yoki guruh qidirish...",loading:s,results:o,onClose:t}):null},J9=l.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 42, 0.44);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
`,X9=l.div`
  width: min(100%, 420px);
  margin: auto 0;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Z9=l.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`,eD=l.div`
  min-width: 0;
`,tD=l.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`,rD=l.p`
  margin: 4px 0 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,nD=l.button`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`,oD=l.div`
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
`,iD=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`,sD=l.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`,Oa=l.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,La=l.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`,eb=l.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
`,td=l.button`
  min-height: 40px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid
    ${e=>e.$active?"var(--primary-color)":"var(--border-color)"};
  background: ${e=>e.$active?"rgba(59, 130, 246, 0.12)":"var(--secondary-color)"};
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  text-align: left;
  cursor: pointer;
`,rd=l.span`
  font-size: 12px;
  font-weight: 700;
`,nd=l.span`
  font-size: 11px;
  line-height: 1.35;
  color: var(--text-muted-color);
`,tb=l.input`
  width: 100%;
  min-height: 38px;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;
  outline: none;
`,aD=l.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`,rb=l.button`
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid
    ${e=>e.$primary?"var(--primary-color)":"var(--border-color)"};
  background: ${e=>e.$primary?"var(--primary-color)":"var(--secondary-color)"};
  color: ${e=>e.$primary?"#fff":"var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`,lD=l.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,cD=l.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,dD=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,uD=l.div`
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
`,nb=l.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
  word-break: break-all;
`,pD=l.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,ob=l.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${e=>e.$danger?"rgba(239, 68, 68, 0.08)":"var(--tertiary-color)"};
  color: ${e=>e.$danger?"#ef4444":"var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`,ib=l.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,lC=({isOpen:e,onClose:t,title:r,itemTitle:o,limit:i,currentCount:s,mode:a,onModeChange:c,groupName:d,onGroupNameChange:p,showResults:h,onShowResultsChange:f,timeLimit:x,onTimeLimitChange:S,onCreate:m,isCreating:b,links:w,loadingLinks:j,onCopyLink:v,onDeleteLink:y,deletingLinkId:g,linkPrefix:k})=>e?n.jsx(J9,{onClick:t,children:n.jsxs(X9,{onClick:C=>C.stopPropagation(),children:[n.jsxs(Z9,{children:[n.jsxs(eD,{children:[n.jsx(tD,{children:r}),n.jsxs(rD,{children:["`",o,"` uchun qisqa havolalar"]})]}),n.jsx(nD,{type:"button",onClick:t,children:n.jsx(nt,{size:15})})]}),n.jsxs(oD,{children:[n.jsxs(iD,{children:[n.jsx("span",{children:"Jami limit"}),n.jsxs(sD,{children:[s,"/",i]})]}),n.jsxs(Oa,{children:[n.jsx(La,{children:"Natijani saqlash"}),n.jsxs(eb,{children:[n.jsxs(td,{type:"button",$active:a==="persist",onClick:()=>c("persist"),children:[n.jsx(rd,{children:"Saqlansin"}),n.jsx(nd,{children:"Ustozga boradi"})]}),n.jsxs(td,{type:"button",$active:a==="ephemeral",onClick:()=>c("ephemeral"),children:[n.jsx(rd,{children:"Saqlanmasin"}),n.jsx(nd,{children:"Faqat talabaga"})]})]})]}),a==="persist"?n.jsxs(Oa,{children:[n.jsx(La,{children:"Guruh nomi"}),n.jsx(tb,{placeholder:"Masalan: g12",value:d,onChange:C=>p(C.target.value)})]}):null,n.jsxs(Oa,{children:[n.jsx(La,{children:"Yakuniy natija"}),n.jsxs(eb,{children:[n.jsxs(td,{type:"button",$active:h,onClick:()=>f(!0),children:[n.jsx(rd,{children:"Ko'rsatilsin"}),n.jsx(nd,{children:"Talaba ko'radi"})]}),n.jsxs(td,{type:"button",$active:!h,onClick:()=>f(!1),children:[n.jsx(rd,{children:"Yashirilsin"}),n.jsx(nd,{children:"Faqat ustozga"})]})]})]}),n.jsxs(Oa,{children:[n.jsx(La,{children:"Vaqt cheklovi"}),n.jsx(tb,{type:"number",min:"0",placeholder:"0 = cheklanmagan",value:x,onChange:C=>S(C.target.value)})]}),n.jsxs(aD,{children:[n.jsx(rb,{type:"button",onClick:t,children:"Bekor"}),n.jsxs(rb,{$primary:!0,type:"button",onClick:m,disabled:b||s>=i,children:[n.jsx(Do,{size:14}),b?"Yaratilmoqda...":s>=i?"Limitga yetdi":"Havola yaratish"]})]}),n.jsxs(Oa,{children:[n.jsx(La,{children:"Oldingi havolalar"}),j?n.jsx(ib,{children:"Yuklanmoqda..."}):w.length===0?n.jsx(ib,{children:"Hali havola yaratilmagan."}):n.jsx(lD,{children:w.map(C=>n.jsxs(cD,{children:[n.jsxs(dD,{children:[n.jsx(uD,{children:C.persistResults?C.groupName||"Natija saqlanadi":"Natija saqlanmaydi"}),n.jsxs(pD,{children:[n.jsx(ob,{type:"button",onClick:()=>v(C.shortCode),children:n.jsx(Do,{size:14})}),n.jsx(ob,{type:"button",$danger:!0,disabled:g===C._id,onClick:()=>y(C._id),children:n.jsx(lr,{size:14})})]})]}),n.jsxs(nb,{children:[k,C.shortCode]}),n.jsxs(nb,{children:["Natija: ",C.showResults?"ko'rsatiladi":"yashiriladi"," ","• Vaqt:"," ",C.timeLimit?`${C.timeLimit} daqiqa`:"cheklanmagan"]})]},C._id))})]})]})]})}):null,hD=l.div`
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
`,fD=l.div`
  background: #23272a;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid #36393f;
`,xD=l.div`
  background: linear-gradient(135deg, #2c2f33 0%, #1e2124 100%);
  padding: 32px 24px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #36393f;
`;l.button`
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
`;const gD=l.h2`
  color: #fff;
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`,mD=l.p`
  color: #b9bbbe;
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.5;
`,yD=l.div`
  padding: 32px 24px;
`,vD=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,sb=l.div`
  background: ${e=>e.$premium?"rgba(255, 170, 0, 0.05)":"#2f3136"};
  border: 1px solid
    ${e=>e.$premium?"rgba(255, 170, 0, 0.3)":"#40444b"};
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`,ab=l.h3`
  color: ${e=>e.$premium?"#ffaa00":"#fff"};
  font-size: 18px;
  margin: 0 0 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,lb=l.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,oo=l.li`
  color: #dcddde;
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.4;
`,bD=l.button`
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
`,xp=({isOpen:e,onClose:t,onUpgrade:r})=>e?n.jsx(hD,{onClick:t,children:n.jsxs(fD,{onClick:o=>o.stopPropagation(),children:[n.jsxs(xD,{children:[n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})}),n.jsxs(gD,{children:[n.jsx(zr,{width:32,height:32}),"Jamm Premium"]}),n.jsxs(mD,{children:["Siz limitga yetdingiz! ",n.jsx("br",{}),"Cheklovlarni olib tashlash va qo'shimcha imkoniyatlarga ega bo'lish uchun Premium obunaga o'ting."]})]}),n.jsxs(yD,{children:[n.jsxs(vD,{children:[n.jsxs(sb,{children:[n.jsx(ab,{children:"Oddiy"}),n.jsxs(lb,{children:[n.jsxs(oo,{children:[n.jsx(tn,{size:16,color:"#2ecc71",style:{flexShrink:0,marginTop:2}}),"Maksimal 3 ta test yaratish"]}),n.jsxs(oo,{children:[n.jsx(tn,{size:16,color:"#2ecc71",style:{flexShrink:0,marginTop:2}}),"Maksimal 4 ta lug'at yaratish"]}),n.jsxs(oo,{children:[n.jsx(nt,{size:16,color:"#ed4245",style:{flexShrink:0,marginTop:2}}),"Har bir to'plamda max 30 ta savol"]}),n.jsxs(oo,{children:[n.jsx(nt,{size:16,color:"#ed4245",style:{flexShrink:0,marginTop:2}}),"Oddiy avatar va fonlar"]})]})]}),n.jsxs(sb,{$premium:!0,children:[n.jsxs(ab,{$premium:!0,children:[n.jsx(zr,{width:18,height:18})," Premium"]}),n.jsxs(lb,{children:[n.jsxs(oo,{children:[n.jsx(tn,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),n.jsx("span",{style:{color:"#fff",fontWeight:500},children:"Maksimal 10 ta test yaratish"})]}),n.jsxs(oo,{children:[n.jsx(tn,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),n.jsx("span",{style:{color:"#fff",fontWeight:500},children:"Maksimal 10 ta lug'at yaratish"})]}),n.jsxs(oo,{children:[n.jsx(tn,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),"Maxsus oltin belgi (badge)"]}),n.jsxs(oo,{children:[n.jsx(tn,{size:16,color:"#ffaa00",style:{flexShrink:0,marginTop:2}}),"Reklamasiz va cheksiz imkoniyatlar"]})]})]})]}),n.jsxs(bD,{onClick:r,children:[n.jsx(op,{size:18,fill:"#fff"}),"Obunani ko'rish va faollashtirish"]})]})]})}):null,wD=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,kD=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,jD=l.h2`
  font-size: 24px;
  color: var(--text-color);
  margin: 0;
`,SD=l.span`
  font-size: 14px;
  margin-top: 6px;
  color: var(--text-muted-color);
`,CD=l.button`
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
`;l.button`
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
`;const zD=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  right: 0;
`,$D=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,gp=({title:e,count:t,limit:r,onBack:o,rightContent:i})=>n.jsxs(wD,{style:{justifyContent:"center",position:"relative"},children:[n.jsx(kD,{style:{position:"absolute",left:0},children:o?n.jsx(CD,{onClick:o,children:n.jsx(nr,{size:20})}):n.jsx("div",{style:{width:"40px"}})}),n.jsxs($D,{children:[n.jsx(jD,{children:e}),t!==void 0&&r!==void 0&&n.jsxs(SD,{children:["(",t,"/",r,")"]})]}),n.jsx(zD,{children:i})]}),_D=l.div`
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
`;l.button`
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
`;const TD=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`,ED=l.div`
  position: relative;
  z-index: ${e=>e.$raised?12:1};
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    border-color: var(--text-muted-color);
    transform: translateY(-2px);
  }
`,RD=l.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`,PD=l.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`,cb=l.p`
  font-size: 14px;
  color: var(--text-muted-color);
  margin: 0;
  line-height: 1.4;
`,db=l.div`
  font-size: 13px;
  color: var(--text-muted-color);
`,MD=l.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`,ID=l.div`
  position: relative;
  flex-shrink: 0;
`,AD=l.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`,OD=l.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,od=l.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${e=>e.$danger?"rgba(239, 68, 68, 0.08)":"transparent"};
  color: ${e=>e.$danger?"#ef4444":"var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${e=>e.$danger?"rgba(239, 68, 68, 0.12)":"var(--tertiary-color)"};
  }
`,LD=({initialTestId:e,onBack:t})=>{const{tests:r,myTests:o,myTestsPage:i,myTestsHasMore:s,fetchMyTests:a,deleteTest:c}=Ur(),d=Qt(),p=Ie(ze=>ze.user),[h,f]=u.useState(!1),[x,S]=u.useState(!1),[m,b]=u.useState(null),[w,j]=u.useState(null),[v,y]=u.useState(null),[g,k]=u.useState(null),[C,_]=u.useState(!1),[z,D]=u.useState(null),[B,V]=u.useState("persist"),[R,M]=u.useState(""),[A,O]=u.useState(!0),[T,F]=u.useState(0),[P,q]=u.useState(!1),[$,E]=u.useState([]),[I,N]=u.useState(!1),[J,Y]=u.useState(null),[L,H]=u.useState(null),[Q,ie]=u.useState(null),G=Qe.useRef(!1);u.useEffect(()=>{G.current||(a(),G.current=!0)},[a]),u.useEffect(()=>{if(!Q)return;const ze=()=>ie(null);return document.addEventListener("click",ze),()=>{document.removeEventListener("click",ze)}},[Q]),u.useEffect(()=>{if(e&&!m){const Oe=[...r,...o].find(Re=>Re._id===e||Re.urlSlug===e);if(Oe)H(null),b(Oe);else{if(e=="0")return;RL(e).then(Re=>{Re&&(H(null),b(Re))}).catch(Re=>{OL(e).then(qe=>{var ae;qe!=null&&qe.test&&(b(qe.test),H(((ae=qe==null?void 0:qe.shareLink)==null?void 0:ae.shortCode)||e))}).catch(qe=>{console.error("Failed to fetch test by ID:",Re||qe),be.error("Test topilmadi yoki unga ruxsat yo'q.")})})}}},[e,r,o,m]),u.useEffect(()=>{if(!(z!=null&&z._id)){E([]);return}N(!0),LL(z._id).then(ze=>E(Array.isArray(ze)?ze:[])).catch(()=>E([])).finally(()=>N(!1))},[z]);const le=async()=>{var ze,Oe;if(z){q(!0);try{const Re=await BL(z._id,{persistResults:B!=="ephemeral",groupName:B==="persist"?R.trim():"",showResults:A,timeLimit:Number(T)||0}),qe=`${window.location.origin}/arena/quiz-link/${Re.shortCode}`;await navigator.clipboard.writeText(qe),E(ae=>[Re,...ae]),be.success("Qisqa test havolasi nusxalandi!"),M(""),V("persist"),O(!0),F(0)}catch(Re){be.error(((Oe=(ze=Re==null?void 0:Re.response)==null?void 0:ze.data)==null?void 0:Oe.message)||"Test havolasini yaratishda xatolik yuz berdi.")}finally{q(!1)}}},ue=async ze=>{const Oe=`${window.location.origin}/arena/quiz-link/${ze}`;await navigator.clipboard.writeText(Oe),be.success("Test havolasi nusxalandi!")},me=async ze=>{var Oe,Re;if(z!=null&&z._id){Y(ze);try{await DL(z._id,ze),E(qe=>qe.filter(ae=>ae._id!==ze)),be.success("Havola o'chirildi.")}catch(qe){be.error(((Re=(Oe=qe==null?void 0:qe.response)==null?void 0:Oe.data)==null?void 0:Re.message)||"Havolani o'chirishda xatolik yuz berdi.")}finally{Y(null)}}},W=async()=>{var ze,Oe;if(!(!g||C)){_(!0);try{await c(g._id),(w==null?void 0:w._id)===g._id&&j(null),(m==null?void 0:m._id)===g._id&&b(null),be.success("Test va unga tegishli natijalar o'chirildi."),k(null)}catch(Re){be.error(((Oe=(ze=Re==null?void 0:Re.response)==null?void 0:ze.data)==null?void 0:Oe.message)||"Testni o'chirishda xatolik yuz berdi.")}finally{_(!1)}}};if(m)return n.jsx(l9,{test:m,shareShortCode:L,onClose:()=>{b(null),H(null),d("/arena")}});const Me=(p==null?void 0:p.premiumStatus)==="premium"||(p==null?void 0:p.premiumStatus)==="active",De=Me?10:4,Fe=Me?4:2,ot=o.length,st=()=>{if(ot>=De){Me?be.error("Siz maksimal limitga yetgansiz (10/10)."):S(!0);return}f(!0)};return n.jsxs(_D,{children:[n.jsx(gp,{title:"Testlar",count:ot,onBack:()=>t&&t(),rightContent:n.jsx(Je,{onClick:st,children:n.jsx(Et,{size:18})})}),n.jsx(En,{dataLength:o.length,next:()=>a(i+1),hasMore:s,loader:n.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px",gridColumn:"1 / -1"},children:"Yuklanmoqda..."}),endMessage:o.length>0?n.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px",gridColumn:"1 / -1"},children:"Barcha testlar ko'rsatildi."}):null,scrollableTarget:null,style:{overflow:"visible"},children:n.jsxs(TD,{id:"arenaTestsList",children:[o.map(ze=>{var Oe,Re,qe;return n.jsxs(ED,{$raised:Q===ze._id,onClick:()=>{ie(null),H(null),b(ze)},children:[n.jsxs(RD,{children:[n.jsx(PD,{children:ze.title}),n.jsxs(ID,{onClick:ae=>{ae.stopPropagation()},children:[n.jsx(AD,{onClick:()=>ie(ae=>ae===ze._id?null:ze._id),children:n.jsx(nm,{size:16})}),Q===ze._id&&n.jsxs(OD,{onClick:ae=>ae.stopPropagation(),children:[n.jsxs(od,{onClick:()=>{j(ze),ie(null)},children:[n.jsx(bx,{size:14}),"Natijalar"]}),n.jsxs(od,{onClick:()=>{D(ze),V("persist"),M(""),O(!0),F(0),ie(null)},children:[n.jsx(Do,{size:14}),"Havola yaratish"]}),n.jsxs(od,{onClick:()=>{y(ze),ie(null)},children:[n.jsx(tp,{size:14}),"Tahrirlash"]}),n.jsxs(od,{$danger:!0,onClick:()=>{k(ze),ie(null)},children:[n.jsx(lr,{size:14}),"O'chirish"]})]})]})]}),n.jsx(cb,{children:ze.description||"Tavsif yo'q"}),n.jsxs(db,{children:["Savollar soni: ",((Oe=ze.questions)==null?void 0:Oe.length)||0]}),n.jsxs(db,{children:["Tuzuvchi: ",((Re=ze.createdBy)==null?void 0:Re.nickname)||((qe=ze.createdBy)==null?void 0:qe.username)]}),n.jsxs(MD,{children:[n.jsx(ml,{size:14}),"Boshlash uchun kartani bosing"]})]},ze._id)}),o.length===0&&n.jsx(cb,{style:{gridColumn:"1 / -1"},children:"Hozircha hech qanday test yaratilmagan."})]})}),n.jsx(DB,{isOpen:h||!!v,onClose:()=>{f(!1),y(null)},initialTest:v}),w&&n.jsx(K9,{test:w,onClose:()=>j(null)}),n.jsx(xp,{isOpen:x,onClose:()=>S(!1),onUpgrade:()=>{S(!1),window.location.href="/premium"}}),n.jsx(lC,{isOpen:!!z,onClose:()=>{D(null),M(""),V("persist"),O(!0),F(0)},title:"Test havolasini yaratish",itemTitle:(z==null?void 0:z.title)||"",limit:Fe,currentCount:$.length,mode:B,onModeChange:V,groupName:R,onGroupNameChange:M,showResults:A,onShowResultsChange:O,timeLimit:T,onTimeLimitChange:F,onCreate:le,isCreating:P,links:$,loadingLinks:I,onCopyLink:ue,onDeleteLink:me,deletingLinkId:J,linkPrefix:"/arena/quiz-link/"}),n.jsx(Di,{isOpen:!!g,onClose:()=>{C||k(null)},title:"Testni o'chirish",description:`${(g==null?void 0:g.title)||"Bu test"} o'chirilsa, unga tegishli barcha natijalar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`,confirmText:C?"O'chirilmoqda...":"O'chirish",cancelText:"Bekor qilish",onConfirm:W,isDanger:!0})]})},BD=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,DD=et`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,ub=l.div`
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
  animation: ${BD} 0.18s ease-out;
`,FD=l.div`
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  height: min(90vh, 860px);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${DD} 0.22s ease-out;

  @media (max-width: 768px) {
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`,pb=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`,ND=l.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px;
`;l.button`
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
`;const hb=l.div`
  margin-bottom: 16px;
`,fb=l.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-muted-color);
  font-weight: 500;
  font-size: 0.9rem;
`,xb=l.input`
  width: 100%;
  padding: 12px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
`,qD=l.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`,gb=l.button`
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
`,HD=l.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`,UD=l.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,YD=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,VD=l.button`
  background: transparent;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`,WD=l.button`
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
`,GD=l.textarea`
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
`,QD=l.p`
  font-size: 0.85rem;
  color: var(--text-muted-color);
  margin-top: 8px;
`,KD=l.div`
  background: #111;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  color: #ddd;
  margin-top: 8px;
  white-space: pre-wrap;
`,JD=l.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 18px 24px 24px;
  border-top: 1px solid var(--border-color);
`,Fh=l.button`
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
`,mb=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 4px 8px;
`,yb=l.input`
  flex: 1;
  padding: 6px;
  background: transparent;
  border: none;
  color: var(--text-color);
  outline: none;
  font-size: 0.95rem;
  width: 100%;
`,vb=l.button`
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
`,bb=l.img`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  object-fit: cover;
`,XD=l.div`
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
`,ZD=l.form`
  display: flex;
  gap: 8px;
`,eF=l.div`
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
`,tF=l.img`
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
`,rF=({onClose:e,initialDeck:t=null})=>{const{createFlashcardDeck:r,updateFlashcardDeck:o}=Ur(),i=!!(t!=null&&t._id),[s,a]=u.useState(""),[c,d]=u.useState("manual"),[p,h]=u.useState([{front:"",back:"",frontImage:"",backImage:""}]),[f,x]=u.useState(""),[S,m]=u.useState({isOpen:!1,cardIndex:null,side:null}),[b,w]=u.useState(""),[j,v]=u.useState([]),[y,g]=u.useState(!1);u.useEffect(()=>{if(i){a((t==null?void 0:t.title)||""),d("manual"),h(((t==null?void 0:t.cards)||[]).length?t.cards.map(M=>({front:M.front||"",back:M.back||"",frontImage:M.frontImage||"",backImage:M.backImage||""})):[{front:"",back:"",frontImage:"",backImage:""}]),x("");return}a(""),d("manual"),h([{front:"",back:"",frontImage:"",backImage:""}]),x("")},[t,i]);const k=async M=>{if(M==null||M.preventDefault(),!b.trim())return;g(!0),await new Promise(T=>setTimeout(T,600));const A=encodeURIComponent(b.trim()),O=Array.from({length:9}).map((T,F)=>`https://loremflickr.com/320/240/${A}?lock=${F+Math.floor(Math.random()*1e3)}`);v(O),g(!1)},C=M=>{B(S.cardIndex,S.side,M),m({isOpen:!1,cardIndex:null,side:null}),w(""),v([])},_=(M,A)=>{m({isOpen:!0,cardIndex:M,side:A});const O=p[M][A.replace("Image","")];O?w(O):(w(""),v([]))},z=()=>{if(p.length>=30){be.error("Maksimal 30 ta so'z qo'shish mumkin!");return}h([...p,{front:"",back:"",frontImage:"",backImage:""}])},D=M=>{h(p.filter((A,O)=>O!==M))},B=(M,A,O)=>{const T=[...p];T[M][A]=A==="front"||A==="back"?O.slice(0,Pe.flashcardSideChars):O,h(T)},V=()=>{if(!f.trim())return[];const M=f.split(";").filter(O=>O.trim()),A=[];for(const O of M){const T=O.indexOf(",");if(T>-1){const F=O.substring(0,T).trim(),P=O.substring(T+1).trim();F&&P&&A.push({front:F,back:P})}}return A},R=async()=>{if(!s.trim()){be.error("Lug'at sarlavhasini kiriting");return}let M=[];if(c==="manual"?M=p.filter(O=>O.front.trim()!==""&&O.back.trim()!==""):M=V(),M.length===0){be.error("Kamida bitta to'g'ri karta kiriting");return}if(M.length>30){be.error("Maksimal 30 ta so'z qo'shish mumkin!");return}const A={title:s.trim(),cards:M};try{i?await o(t._id,A):await r(A),be.success(i?"Lug'at yangilandi":"Lug'at muvaffaqiyatli yaratildi"),e()}catch{be.error("Xatolik yuz berdi")}};return n.jsxs(ub,{onClick:e,children:[n.jsxs(FD,{onClick:M=>M.stopPropagation(),children:[n.jsxs(pb,{children:[n.jsx("h2",{children:i?"Lug'atni Tahrirlash":"Yangi Lug'at (Flashcards)"}),n.jsx(Je,{onClick:e,children:n.jsx(nt,{size:18})})]}),n.jsxs(ND,{children:[n.jsxs(hb,{children:[n.jsx(fb,{children:"To'plam nomi"}),n.jsx(xb,{placeholder:"Masalan: Ingliz tili - 1-dars",value:s,onChange:M=>a(M.target.value.slice(0,Pe.flashcardTitleChars)),maxLength:Pe.flashcardTitleChars})]}),n.jsxs(qD,{children:[n.jsx(gb,{active:c==="manual",onClick:()=>d("manual"),children:"Qo'lda kiritish"}),n.jsx(gb,{active:c==="template",onClick:()=>d("template"),children:"Andaza (Shablon)"})]}),c==="manual"?n.jsxs(n.Fragment,{children:[n.jsx(HD,{children:p.map((M,A)=>n.jsxs(UD,{children:[n.jsxs(YD,{children:[n.jsxs(mb,{children:[M.frontImage&&n.jsx(bb,{src:M.frontImage,alt:"f"}),n.jsx(yb,{placeholder:`So'z (front) ${A+1}`,value:M.front,onChange:O=>B(A,"front",O.target.value)}),n.jsx(vb,{onClick:()=>_(A,"frontImage"),title:"Rasm qidirish",children:n.jsx(Cx,{size:16})})]}),n.jsxs(mb,{children:[M.backImage&&n.jsx(bb,{src:M.backImage,alt:"b"}),n.jsx(yb,{placeholder:`Ma'nosi (back) ${A+1}`,value:M.back,onChange:O=>B(A,"back",O.target.value)}),n.jsx(vb,{onClick:()=>_(A,"backImage"),title:"Rasm qidirish",children:n.jsx(Cx,{size:16})})]})]}),p.length>1&&n.jsx(VD,{onClick:()=>D(A),children:n.jsx(lr,{size:20})})]},A))}),n.jsxs(WD,{onClick:z,disabled:p.length>=30,children:[n.jsx(Et,{size:18})," ",p.length>=30?"Limitga yetildi (30/30)":"Yangi so'z qo'shish"]})]}):n.jsxs(hb,{children:[n.jsx(fb,{children:"Shablon matni"}),n.jsx(GD,{placeholder:"Apple,Olma;Book,Kitob;",value:f,onChange:M=>x(M.target.value)}),n.jsxs(QD,{children:["So'z va uning ma'nosini vergul (",n.jsx("b",{children:","}),") bilan ajrating. Har bir so'z juftligini nuqtali-vergul (",n.jsx("b",{children:";"}),") bilan ajrating."]}),n.jsxs(KD,{children:["Apple,Olma;",n.jsx("br",{}),"Book,Kitob;",n.jsx("br",{}),"Car,Mashina;"]})]})]}),n.jsxs(JD,{children:[n.jsx(Fh,{onClick:e,children:"Bekor qilish"}),n.jsx(Fh,{primary:!0,onClick:R,children:i?"O'zgarishlarni saqlash":"Saqlash"})]})]}),S.isOpen&&n.jsx(ub,{onClick:()=>m({isOpen:!1,cardIndex:null,side:null}),style:{zIndex:1100},children:n.jsxs(XD,{onClick:M=>M.stopPropagation(),children:[n.jsxs(pb,{style:{marginBottom:8},children:[n.jsx("h2",{children:"Rasm Qidirish"}),n.jsx(Je,{onClick:()=>m({isOpen:!1,cardIndex:null,side:null}),children:n.jsx(nt,{size:28})})]}),n.jsxs(ZD,{onSubmit:k,children:[n.jsx(xb,{placeholder:"Rasm qidirish uchun so'z yozing...",value:b,onChange:M=>w(M.target.value),autoFocus:!0}),n.jsx(Fh,{primary:!0,type:"submit",disabled:y||!b.trim(),children:y?n.jsx(Zu,{size:18,className:"spin"}):n.jsx(rc,{size:18})})]}),n.jsxs(eF,{children:[j.length===0&&!y&&n.jsx("div",{style:{gridColumn:"span 3",textAlign:"center",padding:"40px 0",color:"var(--text-muted-color)"},children:"Qidirish tugmasini bosing"}),j.map((M,A)=>n.jsx(tF,{src:M,alt:"result",onClick:()=>C(M)},A))]})]})})]})},wb=l.div`
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
`,nF=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,oF=et`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,kb=l.div`
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
  animation: ${nF} 0.18s ease-out;
`,jb=l.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  height: min(80vh, 720px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${oF} 0.22s ease-out;
`,Sb=l.div`
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;l.button`
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
`;const iF=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`,sF=l.div`
  position: relative;
  z-index: ${e=>e.$raised?12:1};
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: var(--text-muted-color);
    transform: translateY(-2px);
  }
`,aF=l.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`,lF=l.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`;l.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;l.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;const cF=l.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`,dF=l.div`
  position: relative;
  flex-shrink: 0;
`,uF=l.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`,pF=l.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,ts=l.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${e=>e.$danger?"rgba(239, 68, 68, 0.08)":"transparent"};
  color: ${e=>e.$danger?"#ef4444":"var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${e=>e.$danger?"rgba(239, 68, 68, 0.12)":"var(--tertiary-color)"};
  }
`,hF=l.div`
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
`,fF=l.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Cb=l.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`,zb=l.span`
  color: var(--text-muted-color);
  min-width: 60px;
  font-weight: 500;
`,$b=l.span`
  color: var(--text-color);
  word-break: break-word;
`,Nh=l.div`
  font-size: 14px;
  color: var(--text-muted-color);
`,qh=l.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,_b=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`,Tb=l.button`
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
`,xF=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  gap: 24px;
  box-sizing: border-box;
`,gF=l.div`
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
`,mF=l.button`
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
`,yF=l.button`
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
`,vF=l.div`
  display: flex;
  gap: 12px;
  width: 100%;
`,id=l.button`
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
`,bF=({initialDeckId:e,onBack:t})=>{var De,Fe,ot,st,ze,Oe,Re,qe;const{flashcardDecks:r,flashcardsPage:o,flashcardsHasMore:i,fetchFlashcards:s,reviewFlashcard:a,fetchFlashcardDeck:c,joinFlashcardDeck:d,leaveFlashcardDeck:p,deleteFlashcardDeck:h}=Ur(),f=Ie(ae=>ae.token),x=Ie(ae=>ae.user),[S,m]=u.useState(null),[b,w]=u.useState(null),[j,v]=u.useState(!1),[y,g]=u.useState([]),[k,C]=u.useState(0),[_,z]=u.useState(!1),[D,B]=u.useState(null),[V,R]=u.useState(null),[M,A]=u.useState(!1),[O,T]=u.useState(null),[F,P]=u.useState(null),[q,$]=u.useState(!1),[E,I]=u.useState(null),N=(x==null?void 0:x.premiumStatus)==="premium",J=N?10:4,L=r.filter(ae=>{var Le;return(((Le=ae.createdBy)==null?void 0:Le._id)||ae.createdBy)===((x==null?void 0:x._id)||(x==null?void 0:x.id))}).length,H=()=>{if(L>=J){N?be.error("Siz maksimal limitga yetgansiz (10/10)."):A(!0);return}v(!0)},Q=Qe.useRef(!1);u.useEffect(()=>{f&&!Q.current&&r.length===0&&(s(1),Q.current=!0)},[s,f,r.length]);const ie=()=>{i&&s(o+1)};u.useEffect(()=>{(async()=>{if(e&&!S){const Le=await c(e);Le&&w(Le)}})()},[e]),u.useEffect(()=>{if(!E)return;const ae=()=>I(null);return document.addEventListener("click",ae),()=>{document.removeEventListener("click",ae)}},[E]);const G=async(ae,Le=!1)=>{const Ge=await c(ae._id);if(!Ge)return;const at=new Date,oe=Le?Ge.cards:Ge.cards.filter(xe=>new Date(xe.nextReviewDate)<=at);if(oe.length===0){be("Hozircha yodlash kerak bo'lgan so'zlar yo'q! Kutib turing.",{icon:"ℹ️"});return}w(null),m(Ge),g(oe),C(0),z(!1)},le=ae=>{const Le=`${window.location.origin}/arena/flashcards/${ae}`;navigator.clipboard.writeText(Le),be.success("Lug'at havolasi nusxalandi!")},ue=async()=>{var ae,Le;if(!(!F||q)){$(!0);try{await h(F._id),(b==null?void 0:b._id)===F._id&&w(null),(S==null?void 0:S._id)===F._id&&m(null),(D==null?void 0:D._id)===F._id&&B(null),be.success("Lug'at va unga tegishli progresslar o'chirildi."),P(null)}catch(Ge){be.error(((Le=(ae=Ge==null?void 0:Ge.response)==null?void 0:ae.data)==null?void 0:Le.message)||"Lug'atni o'chirishda xatolik yuz berdi.")}finally{$(!1)}}},me=async ae=>{if((await d(ae)).success&&(R(null),s(),b&&b._id===ae)){const Ge=await c(ae);w(Ge)}},W=async ae=>{window.confirm("Haqiqatdan ham ushbu lug'atdan chiqmoqchimisiz? Progressingiz o'chib ketadi.")&&(await p(ae)).success&&(s(),b&&b._id===ae&&w(null))},Me=async ae=>{const Le=y[k];if(!Le)return;const Ge=Le._id,at=S._id;a(at,Ge,ae).catch(oe=>console.error(oe)),ae<3?(g(oe=>[...oe,Le]),C(oe=>oe+1),z(!1)):k+1<y.length?(C(oe=>oe+1),z(!1)):(be.success("Barakalla! Ushbu to'plamni yodlashni tugatdingiz.",{duration:4e3}),m(null),s())};if(S){const ae=y[k];return n.jsx(wb,{children:n.jsxs(xF,{children:[n.jsxs(mF,{onClick:()=>m(null),children:[n.jsx(nr,{size:20})," Orqaga"]}),n.jsxs(qh,{children:[S.title," - Qolgan:"," ",y.length-k]}),n.jsx(gF,{children:_?n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[(ae==null?void 0:ae.backImage)&&n.jsx("img",{src:ae.backImage,alt:"back",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),n.jsx("div",{children:(ae==null?void 0:ae.back)||"???"})]}):n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[(ae==null?void 0:ae.frontImage)&&n.jsx("img",{src:ae.frontImage,alt:"front",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),n.jsx("div",{children:(ae==null?void 0:ae.front)||"???"})]})}),_?n.jsxs(vF,{children:[n.jsx(id,{type:"fail",onClick:()=>Me(0),children:"Topolmadim"}),n.jsx(id,{type:"hard",onClick:()=>Me(1),children:"Qiyin"}),n.jsx(id,{type:"good",onClick:()=>Me(2),children:"Biroz qiynaldim"}),n.jsx(id,{type:"easy",onClick:()=>Me(3),children:"Oson"})]}):n.jsxs(yF,{onClick:()=>z(!0),children:[n.jsx($x,{size:16,style:{marginRight:8,display:"inline"}}),"Javobni ko'rish"]})]})})}return n.jsxs(wb,{children:[n.jsx(gp,{title:"Flashcards",count:L,onBack:()=>t&&t(),rightContent:n.jsx(Je,{onClick:H,children:n.jsx(Et,{size:18})})}),n.jsx(En,{dataLength:r.length,next:ie,hasMore:i,loader:n.jsx("h4",{style:{textAlign:"center",color:"var(--text-muted-color)",marginTop:"16px"},children:"Yuklanmoqda..."}),style:{overflow:"visible"},children:n.jsxs(iF,{children:[r.map(ae=>{var at,oe,xe;const Le=(((at=ae.createdBy)==null?void 0:at._id)||ae.createdBy)===((x==null?void 0:x._id)||(x==null?void 0:x.id)),Ge=((oe=ae.createdBy)==null?void 0:oe.nickname)||"Noma'lum";return n.jsxs(sF,{$raised:E===ae._id,onClick:()=>{I(null),G(ae,!0)},children:[n.jsxs(aF,{children:[n.jsx(lF,{children:ae.title}),n.jsxs(dF,{onClick:we=>{we.stopPropagation()},children:[n.jsx(uF,{onClick:()=>I(we=>we===ae._id?null:ae._id),children:n.jsx(nm,{size:16})}),E===ae._id&&n.jsxs(pF,{onClick:we=>we.stopPropagation(),children:[n.jsxs(ts,{onClick:()=>{w(ae),I(null)},children:[n.jsx(_n,{size:14}),"Ko'rish"]}),n.jsxs(ts,{onClick:()=>{le(ae._id),I(null)},children:[n.jsx(Do,{size:14}),"Havola nusxalash"]}),Le?n.jsxs(n.Fragment,{children:[n.jsxs(ts,{onClick:()=>{B(ae),I(null)},children:[n.jsx(No,{size:14}),"A'zolar"]}),n.jsxs(ts,{onClick:()=>{T(ae),I(null)},children:[n.jsx(tp,{size:14}),"Tahrirlash"]}),n.jsxs(ts,{$danger:!0,onClick:()=>{P(ae),I(null)},children:[n.jsx(lr,{size:14}),"O'chirish"]})]}):n.jsxs(ts,{onClick:()=>{W(ae._id),I(null)},children:[n.jsx(tm,{size:14}),"Lug'atdan chiqish"]})]})]})]}),n.jsxs(Nh,{children:["Jami so'zlar: ",((xe=ae.cards)==null?void 0:xe.length)||0]}),n.jsx(Nh,{children:Le?"Siz yaratgan":`Muallif: ${Ge}`}),n.jsxs(cF,{children:[n.jsx(wu,{size:14}),"Boshlash uchun kartani bosing"]})]},ae._id)}),r.length===0&&n.jsx(Nh,{children:"Sizda hozircha lug'atlar yo'q."})]})}),b&&n.jsx(kb,{onClick:()=>w(null),children:n.jsxs(jb,{onClick:ae=>ae.stopPropagation(),children:[n.jsxs(_b,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[n.jsx(qh,{children:b.title}),n.jsx(Je,{onClick:()=>w(null),children:n.jsx(nt,{size:20})})]}),n.jsxs(Sb,{children:[n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[n.jsx("img",{src:((De=b.createdBy)==null?void 0:De.avatar)||"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar",style:{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover"}}),n.jsxs("div",{children:[n.jsx("div",{style:{color:"var(--text-color)",fontWeight:"600"},children:((Fe=b.createdBy)==null?void 0:Fe.nickname)||"Noma'lum"}),n.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:"13px"},children:"Lug'at yaratuvchisi"})]}),!(((ot=b.createdBy)==null?void 0:ot._id)===((x==null?void 0:x._id)||(x==null?void 0:x.id))||(st=b.members)!=null&&st.some(ae=>{var Le;return(((Le=ae.userId)==null?void 0:Le._id)||ae.userId)===((x==null?void 0:x._id)||(x==null?void 0:x.id))}))&&n.jsx("button",{onClick:()=>me(b._id),style:{marginLeft:"auto",background:"var(--primary-color)",color:"white",border:"none",padding:"8px",borderRadius:"8px",cursor:"pointer"},title:"Yuklab olish (Qo'shilish)",children:n.jsx(s4,{size:20})})]}),n.jsx("div",{style:{display:"flex",gap:"12px"},children:(ze=b.cards)!=null&&ze.some(ae=>new Date(ae.nextReviewDate)<=new Date)?n.jsxs(Tb,{style:{flex:1},onClick:()=>G(b),children:[n.jsx(wu,{size:18})," O'qishni boshlash"]}):n.jsxs(Tb,{style:{flex:1,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},onClick:()=>G(b,!0),children:[n.jsx($x,{size:18})," Yana mashiq qilish"]})}),n.jsxs("div",{children:[n.jsxs("div",{style:{color:"var(--text-color)",fontWeight:"600",marginBottom:"8px",fontSize:"15px"},children:["To'plamdagi so'zlar (",((Oe=b.cards)==null?void 0:Oe.length)||0,")"]}),n.jsx(hF,{children:(Re=b.cards)==null?void 0:Re.map((ae,Le)=>n.jsxs(fF,{children:[n.jsxs(Cb,{style:{alignItems:"center"},children:[n.jsx(zb,{children:"Oldi:"}),n.jsxs($b,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[ae.frontImage&&n.jsx("img",{src:ae.frontImage,alt:"f",style:{width:30,height:30,borderRadius:4,objectFit:"cover"}}),ae.front]})]}),n.jsxs(Cb,{style:{alignItems:"center"},children:[n.jsx(zb,{children:"Orqa:"}),n.jsxs($b,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[ae.backImage&&n.jsx("img",{src:ae.backImage,alt:"b",style:{width:30,height:30,borderRadius:4,objectFit:"cover"}}),ae.back]})]})]},ae._id||Le))})]})]})]})}),D&&n.jsx(kb,{onClick:()=>B(null),children:n.jsxs(jb,{onClick:ae=>ae.stopPropagation(),children:[n.jsxs(_b,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[n.jsx(qh,{children:"A'zolar ro'yxati"}),n.jsx(Je,{onClick:()=>B(null),children:n.jsx(nt,{size:20})})]}),n.jsx(Sb,{children:((qe=D.members)==null?void 0:qe.length)>0?D.members.map((ae,Le)=>{var Ge,at;return n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid var(--border-color)"},children:[n.jsx("img",{src:((Ge=ae.userId)==null?void 0:Ge.avatar)||"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar",style:{width:"32px",height:"32px",borderRadius:"50%",objectFit:"cover"}}),n.jsx("span",{style:{color:"var(--text-color)"},children:((at=ae.userId)==null?void 0:at.nickname)||"Noma'lum"}),n.jsxs("span",{style:{marginLeft:"auto",fontSize:"12px",color:"var(--text-muted-color)"},children:["Joined: ",new Date(ae.joinedAt).toLocaleDateString()]})]},Le)}):n.jsx("p",{style:{textAlign:"center",color:"var(--text-muted-color)"},children:"Hozircha hech kim qo'shilmagan."})})]})}),(j||O)&&n.jsx(rF,{onClose:()=>{v(!1),T(null)},initialDeck:O}),n.jsx(xp,{isOpen:M,onClose:()=>A(!1),onUpgrade:()=>{A(!1),window.location.href="/premium"}}),n.jsx(Di,{isOpen:!!F,onClose:()=>{q||P(null)},title:"Lug'atni o'chirish",description:`${(F==null?void 0:F.title)||"Bu lug'at"} o'chirilsa, unga tegishli barcha progresslar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`,confirmText:q?"O'chirilmoqda...":"O'chirish",cancelText:"Bekor qilish",onConfirm:ue,isDanger:!0})]})};l.div`
  margin-top: 40px;
  background: var(--surface-secondary-color, #2f3136);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;l.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--text-color);
  font-weight: 700;
  letter-spacing: -0.02em;
`;l.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;l.div`
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
`;l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
`;l.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;l.div`
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
`;l.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
`;l.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted-color);
`;l.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${e=>e.isWinner?"linear-gradient(90deg, rgba(46, 204, 113, 0.15), transparent)":"transparent"};
  border-left: ${e=>e.isWinner?"4px solid #2ecc71":"4px solid transparent"};
`;l.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;l.div`
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
`;l.span`
  font-weight: ${e=>e.isWinner?"600":"500"};
  color: ${e=>e.isWinner?"#2ecc71":"var(--text-color)"};
`;l.div`
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: ${e=>e.isWinner?"#2ecc71":"var(--text-color)"};
`;l.div`
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
`;const wF=l.div`
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
`,kF=l.div`
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
`,jF=l.div`
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
`;l.button`
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
`;const SF=l.div`
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
`,CF=l.div`
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
`,zF=l.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,$F=l.div`
  font-weight: 700;
  font-size: 16px;
  color: var(--text-color);
`,_F=l.div`
  font-size: 12px;
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  gap: 4px;
`,TF=l.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-muted-color);
`,Eb=l.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,EF=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`,RF=l.div`
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
`,PF=l.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: var(--primary-color);
`,MF=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted-color);
  gap: 12px;
  text-align: center;
`,IF=({isOpen:e,onClose:t})=>{const{fetchBattleHistory:r}=Ur(),[o,i]=u.useState([]),[s,a]=u.useState(1),[c,d]=u.useState(!0),[p,h]=u.useState(!1),f=u.useRef(),x=u.useCallback(async(m=!1)=>{if(p||!c&&!m)return;h(!0);const b=m?1:s;try{const w=await r({page:b,limit:15});w&&w.data&&(i(m?w.data:j=>[...j,...w.data]),d(w.page<w.totalPages),a(b+1))}catch(w){console.error("Failed to load history:",w)}finally{h(!1)}},[s,c,p,r]);u.useEffect(()=>{e?x(!0):(i([]),a(1),d(!0))},[e]);const S=u.useCallback(m=>{p||(f.current&&f.current.disconnect(),f.current=new IntersectionObserver(b=>{b[0].isIntersecting&&c&&x()}),m&&f.current.observe(m))},[p,c,x]);return e?n.jsx(wF,{onClick:t,children:n.jsxs(kF,{onClick:m=>m.stopPropagation(),children:[n.jsxs(jF,{children:[n.jsxs("h2",{children:[n.jsx(Sx,{size:22})," Bellashuvlar Tarixi"]}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsxs(SF,{children:[o.length>0?o.map((m,b)=>{var w;return n.jsxs(CF,{ref:b===o.length-1?S:null,children:[n.jsxs(zF,{children:[n.jsx($F,{children:((w=m.testId)==null?void 0:w.title)||"O'chirilgan test"}),n.jsxs(_F,{children:[n.jsx(o4,{size:12}),xt(m.createdAt).format("DD.MM.YYYY HH:mm")]})]}),n.jsxs(TF,{children:[n.jsxs(Eb,{children:[n.jsx(Z3,{size:14})," ",m.mode==="solo"?"Yakkalik":"Jamoaviy"]}),n.jsxs(Eb,{children:[n.jsx(No,{size:14})," ",m.participants.length," ishtirokchi"]})]}),n.jsx(EF,{children:m.participants.map((j,v)=>n.jsxs(RF,{children:[n.jsx(Si,{size:12})," ",j.nickname," ",n.jsx("span",{children:j.score})]},v))})]},m._id)}):p?null:n.jsxs(MF,{children:[n.jsx(Sx,{size:48,opacity:.3}),n.jsx("p",{children:"Hozircha bellashuvlar tarixi mavjud emas."})]}),p&&n.jsx(PF,{children:n.jsx(Zu,{size:24,className:"animate-spin"})})]})]})}):null},AF=l.div`
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
`,OF=l.div`
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
`,LF=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`;l.button`
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
`;const Hh=l.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Uh=l.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,BF=l.input`
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
`,DF=l.select`
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
`,FF=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,Rb=l.div`
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
`,NF=l.div`
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
`,qF=l.button`
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
`,HF=({isOpen:e,onClose:t})=>{const{myTests:r,createBattle:o,fetchMyTests:i}=Ur(),[s,a]=u.useState(""),[c,d]=u.useState(""),[p,h]=u.useState("public");if(u.useEffect(()=>{e&&i(1)},[i,e]),!e)return null;const f=()=>{!s||!c.trim()||(o(s,c,"solo",p),t(),d(""),a(""))};return n.jsx(AF,{onClick:t,children:n.jsxs(OF,{onClick:x=>x.stopPropagation(),children:[n.jsxs(LF,{children:[n.jsx("h2",{children:"Yangi Bellashuv Xonasi"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:20})})]}),n.jsxs(Hh,{children:[n.jsx(Uh,{children:"Bellashuv nomi"}),n.jsx(BF,{placeholder:"Masalan: Juma kungi bellashuv",value:c,onChange:x=>d(x.target.value)})]}),n.jsxs(Hh,{children:[n.jsx(Uh,{children:"Testni tanlang"}),n.jsxs(DF,{value:s,onChange:x=>a(x.target.value),children:[n.jsx("option",{value:"",children:"--- Test tanlang ---"}),r.map(x=>n.jsx("option",{value:x._id,children:x.title},x._id))]}),r.length===0&&n.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted-color)",lineHeight:1.5},children:"Hali test topilmadi. Test yaratgan bo'lsangiz, ro'yxat yangilanmoqda."})]}),n.jsxs(Hh,{children:[n.jsx(Uh,{children:"Maxfiylik sozlamasi"}),n.jsxs(FF,{children:[n.jsxs(Rb,{active:p==="public",onClick:()=>h("public"),children:[n.jsx(tc,{size:24}),n.jsx("span",{children:"Publik"})]}),n.jsxs(Rb,{active:p==="unlisted",onClick:()=>h("unlisted"),children:[n.jsx(a4,{size:24}),n.jsx("span",{children:"Maxfiy"})]})]})]}),n.jsxs(NF,{children:[n.jsx(d4,{size:16}),p==="public"?"Ushbu xona barcha uchun ochiq va 'Aktiv Bellashuvlar' ro'yxatida ko'rinadi.":"Ushbu xona ro'yxatda ko'rinmaydi. Faqat xona ID sini bilganlargina qo'shila oladi."]}),n.jsxs(qF,{onClick:f,disabled:!s||!c.trim(),children:[n.jsx(ml,{size:18,fill:"white"})," Xonani Yaratish"]})]})})},UF=l.div`
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
`,Pb=l.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,Mb=l.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`,YF=l.div`
  display: flex;
  gap: 8px;
  width: 100%;
`,Ib=l.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`,Ba=l.button`
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
`,Yh=l.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,sd=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`,ad=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: var(--text-color);
`,Vh=l.span`
  background-color: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
`,VF=l.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`,WF=l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,GF=l.button`
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
`,QF=({initialRoomId:e,onBack:t})=>{const{tests:r,activeBattle:o,joinBattle:i,startBattle:s,submitAnswer:a,nextQuestion:c,endBattle:d,leaveBattle:p,guestName:h,setGuestSession:f,activeBattles:x,fetchActiveBattles:S,socketRef:m,fetchTests:b}=Ur();Qe.useEffect(()=>{b()},[b]);const[w,j]=u.useState(""),[v,y]=u.useState(""),[g,k]=u.useState(!1),[C,_]=u.useState(!1),z=Ie(F=>F.user),D=Ie(F=>F.token);Qe.useEffect(()=>{e&&e!=="0"&&!o&&i(e)},[e,o,i]),Qe.useEffect(()=>{if(!o){S();const F=setInterval(S,1e4);return()=>clearInterval(F)}},[o,S]);const B=o?r.find(F=>F._id===o.testId):null,V=o&&z&&String(o.hostId)===String(z._id),R=()=>{w.trim()&&i(w.trim())},M=()=>{const F=`${window.location.origin}/arena/battle/${o.roomId}`;navigator.clipboard.writeText(F),be.success("Havola nusxalandi!")},A=()=>{if(!D&&!h)return{headerProps:{title:"Ismingizni kiriting",onBack:t},content:n.jsxs(Mb,{children:[n.jsx("p",{style:{color:"var(--text-muted-color)",margin:0},children:"Bellashuvda qatnashish uchun ismingizni kiriting."}),n.jsx(Ib,{placeholder:"Ismingiz...",value:v,onChange:F=>y(F.target.value)}),n.jsx(Ba,{onClick:()=>v.trim()&&f(v.trim()),children:"Kirish"})]})};if(!o)return{headerProps:{title:"Bellashuvlar",onBack:t,rightContent:n.jsx("div",{style:{display:"flex",gap:"8px"},children:n.jsx("button",{onClick:()=>k(!0),style:{background:"none",border:"none",color:"var(--text-color)",cursor:"pointer",padding:"8px",display:"flex"},children:n.jsx(Sx,{size:20})})})},content:n.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",width:"100%"},children:[n.jsxs(Mb,{children:[n.jsx(Pb,{children:"Xona ID si orqali qo'shilish"}),n.jsxs(YF,{children:[n.jsx(Ib,{placeholder:"Masalan: battle_1234_567",value:w,onChange:F=>j(F.target.value)}),n.jsx(Ba,{onClick:R,style:{width:"48px",flexShrink:0},children:n.jsx(Et,{size:20})})]})]}),n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[n.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[n.jsxs(Pb,{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(om,{size:16,color:"var(--primary-color)"})," Aktiv Bellashuvlar (",(x==null?void 0:x.length)||0,")"]}),n.jsx(Je,{onClick:()=>_(!0),children:n.jsx(Et,{size:16})})]}),x&&x.length>0?n.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:x.map(F=>n.jsxs(sd,{children:[n.jsx(ad,{style:{flexDirection:"column",alignItems:"flex-start",gap:"2px"},children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",fontWeight:"600",fontSize:"14px"},children:[n.jsx(ku,{size:14,color:"var(--text-color)"}),F.roomName||"Noma'lum Bellashuv"]})}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[n.jsxs("span",{style:{fontSize:"12px",display:"flex",alignItems:"center",color:"var(--text-muted-color)"},children:[n.jsx(Si,{size:12,style:{marginRight:"4px"}}),n.jsx("span",{children:F.participantsCount})]}),n.jsx(Ba,{style:{width:"auto",padding:"6px 12px",fontSize:"13px"},onClick:()=>{console.log("Joining battle:",F.roomId),i(F.roomId)},children:"Kirish"})]})]},F.roomId))}):n.jsxs("div",{style:{padding:"40px",textAlign:"center",border:"1px dashed var(--border-color)",borderRadius:"12px",color:"var(--text-muted-color)",fontSize:"14px"},children:["Hozircha ochiq bellashuvlar yo'q. ",n.jsx("br",{})," O'zingiz yangi xona yarating!"]})]})]})};if(o.status==="waiting")return{headerProps:{title:"Kutish Zali",rightContent:n.jsx("button",{onClick:()=>p(o.roomId),style:{background:"#e74c3c",border:"none",color:"white",cursor:"pointer",padding:"8px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:n.jsx(tm,{size:18})})},content:n.jsxs("div",{style:{maxWidth:"450px",margin:"0 auto",width:"100%"},children:[n.jsxs("div",{style:{background:"#333",padding:"12px",fontSize:"13px",borderRadius:"8px",marginBottom:"20px",border:"1px solid var(--border-color)"},children:[n.jsxs("div",{style:{marginBottom:4},children:[n.jsx(Si,{size:12}),":"," ",n.jsx("b",{children:(z==null?void 0:z.nickname)||(z==null?void 0:z.username)||h||"Mehmon"})]}),n.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted-color)",display:"flex",alignItems:"center",gap:4},children:[n.jsxs("span",{children:[" Xona ID: ",o.roomId," "]}),n.jsx("button",{onClick:M,style:{marginLeft:12,background:"none",border:"none",color:"var(--primary-color)",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4},children:n.jsx(i4,{size:16})})]})]}),n.jsx(Yh,{children:o.participants.map(F=>n.jsx(sd,{children:n.jsxs(ad,{children:[n.jsx(Si,{size:12})," ",F.nickname," ",F.userId===o.hostId&&"(Host)"]})},F.userId))}),V&&n.jsx(Ba,{onClick:()=>s(o.roomId),style:{marginTop:24,fontSize:18,padding:16},children:"Musobaqani Boshlash! 🚀"})]})};if(o.status==="playing"){if(!B)return{headerProps:{title:"Yuklanmoqda..."},content:n.jsx("div",{children:"Testni yuklab bo'lmadi..."})};const F=B.questions[o.currentQuestionIndex],P=o.participants.find(q=>{var $;return q.socketId===(($=m.current)==null?void 0:$.id)});return F?{headerProps:{title:`Savol ${o.currentQuestionIndex+1} / ${B.questions.length}`,rightContent:n.jsxs(Vh,{children:["Sizning ballingiz: ",(P==null?void 0:P.score)||0]})},content:n.jsxs(n.Fragment,{children:[n.jsxs(VF,{children:[n.jsx("h2",{style:{color:"var(--text-color)"},children:F.questionText}),n.jsx(WF,{children:F.options.map((q,$)=>n.jsx(GF,{selected:(P==null?void 0:P.lastAnswerIndex)===$,disabled:P==null?void 0:P.hasAnsweredCurrent,onClick:()=>{a(o.roomId,$)},children:q},$))})]}),n.jsxs("div",{style:{marginTop:32},children:[n.jsx("h3",{style:{color:"var(--text-color)"},children:"Jonli Natijalar"}),n.jsx(Yh,{children:o.participants.map(q=>n.jsxs(sd,{children:[n.jsxs(ad,{children:[q.hasAnsweredCurrent?n.jsx(rn,{color:"#2ecc71",size:16}):n.jsx(Pi,{color:"#3498db",size:16}),q.nickname]}),n.jsxs(Vh,{children:[q.score," ball"]})]},q.userId))})]})]})}:(V&&d(o.roomId),{headerProps:{title:"Tugadi"},content:n.jsx("div",{children:"Barcha savollar tugadi... Natijalar hisoblanmoqda..."})})}return o.status==="finished"?{headerProps:{title:"🏆 Yakuniy Natijalar"},content:n.jsxs(n.Fragment,{children:[n.jsx(Yh,{children:o.participants.map((F,P)=>n.jsxs(sd,{style:{padding:24},children:[n.jsxs(ad,{style:{fontSize:20},children:[P===0?"🥇":P===1?"🥈":P===2?"🥉":`${P+1}.`,F.nickname]}),n.jsxs(Vh,{style:{fontSize:20},children:[F.score," ball"]})]},F.userId))}),n.jsx(Ba,{onClick:()=>p(),style:{marginTop:32},children:"Bellashuvni tark etish"})]})}:{headerProps:{title:"Bilimlar Bellashuvi"},content:null}},{headerProps:O,content:T}=A();return n.jsxs(UF,{children:[n.jsx(gp,{...O}),T,n.jsx(IF,{isOpen:g,onClose:()=>k(!1)}),n.jsx(HF,{isOpen:C,onClose:()=>_(!1)})]})},ld=l.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

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
    padding-bottom: 24px;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,KF=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`,JF=l.div`
  position: relative;
  z-index: ${e=>e.$raised?12:1};
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: var(--text-muted-color);
    transform: translateY(-2px);
  }
`,XF=l.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`,ZF=l.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
`,Ab=l.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`,io=l.div`
  color: var(--text-muted-color);
  font-size: 13px;
`,eN=l.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`,tN=l.div`
  position: relative;
  flex-shrink: 0;
`,rN=l.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`,nN=l.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Da=l.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${e=>e.$danger?"rgba(239, 68, 68, 0.08)":"transparent"};
  color: ${e=>e.$danger?"#ef4444":"var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${e=>e.$danger?"rgba(239, 68, 68, 0.12)":"var(--tertiary-color)"};
  }
`,oN=l.div`
  border: 1px dashed var(--border-color);
  border-radius: 20px;
  padding: 48px 24px;
  text-align: center;
  color: var(--text-muted-color);
  background: rgba(148, 163, 184, 0.04);

  h3 {
    color: var(--text-color);
    margin-bottom: 8px;
  }
`,iN=l.button`
  align-self: center;
  min-width: 180px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-weight: 700;
  cursor: pointer;
`,sN=l.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,aN=l.div`
  padding: 24px;
  border-radius: 22px;
  border: 1px solid var(--border-color);
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.12),
    rgba(20, 184, 166, 0.08)
  );
`,Wh=l.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  font-weight: 700;
`,Ob=l.h2`
  margin: 0 0 8px;
  font-size: 28px;
  color: var(--text-color);
`,lN=l.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,cN=l.div`
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 18px;
  padding: 18px;
`,Lb=l.div`
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,dN=l.div`
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  line-height: 1.6;
`,Bb=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`,cd=l.span`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${e=>e.$bg||"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
`,Db=l.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
`,Fb=l.div`
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--tertiary-color);
  padding: 24px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`,uN=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  color: var(--text-muted-color);
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`,pN=l.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: var(--secondary-color);
  overflow: hidden;
`,hN=l.div`
  height: 100%;
  width: ${e=>e.$width||"0%"};
  background: linear-gradient(90deg, #22c55e, #14b8a6);
`,Fa=l.h3`
  margin: 0 0 12px;
  color: var(--text-color);
  font-size: 18px;
`,fN=l.h2`
  margin: 0 0 18px;
  color: var(--text-color);
  font-size: 28px;
  line-height: 1.35;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`,xN=l.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,gN=l.div`
  min-height: 94px;
  border-radius: 18px;
  border: 1px dashed var(--border-color);
  background: var(--secondary-color);
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
`,Nb=l.button`
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid
    ${e=>e.$state==="correct"?"rgba(34,197,94,0.55)":e.$state==="wrong"?"rgba(239,68,68,0.55)":"var(--border-color)"};
  background: ${e=>e.$selected?"rgba(59,130,246,0.14)":e.$state==="correct"?"rgba(34,197,94,0.16)":e.$state==="wrong"?"rgba(239,68,68,0.14)":"var(--secondary-color)"};
  color: var(--text-color);
  font-weight: 700;
  cursor: ${e=>e.disabled?"default":"pointer"};
`,mN=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`,yN=l.div`
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: ${e=>e.$correct?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.08)"};
  padding: 16px;
`,qb=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`,vN=l.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
`,bN=l.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.5;
`,Gh=l.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
`,dd=l.button`
  min-height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
`,ud=l.button`
  min-height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`,wN=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`,Qh=l.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--secondary-color);
  padding: 18px;

  strong {
    display: block;
    font-size: 28px;
    color: var(--text-color);
    margin-top: 8px;
  }
`,kN=l.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,jN=l.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
  padding: 14px;
`,SN=l.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;l.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  padding: 12px;

  span {
    display: block;
    font-size: 12px;
    color: var(--text-muted-color);
  }

  strong {
    display: block;
    margin-top: 6px;
    color: var(--text-color);
    font-size: 18px;
  }
`;l.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;l.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;const CN=e=>{const t=[...e];for(let r=t.length-1;r>0;r-=1){const o=Math.floor(Math.random()*(r+1));[t[r],t[o]]=[t[o],t[r]]}return t},zN=e=>{const t=(e==null?void 0:e.poolTokens)||[...(e==null?void 0:e.answerTokens)||[],...(e==null?void 0:e.extraTokens)||[]];return CN(t).map((r,o)=>({id:`pool-${o}-${r}`,text:r}))},$N=({initialDeckId:e,onBack:t})=>{var Yi,eo;const{sentenceBuilderDecks:r,sentenceBuildersPage:o,sentenceBuildersHasMore:i,fetchSentenceBuilders:s,fetchSentenceBuilderDeck:a,fetchSharedSentenceBuilderDeck:c,checkSentenceBuilderAnswer:d,deleteSentenceBuilderDeck:p,fetchSentenceBuilderResults:h,fetchSentenceBuilderShareLinks:f,createSentenceBuilderShareLink:x,deleteSentenceBuilderShareLink:S,submitSentenceBuilderAttempt:m,guestName:b}=Ur(),w=Ie(se=>se.token),j=Ie(se=>se.user),[v,y]=u.useState(!1),[g,k]=u.useState(!1),[C,_]=u.useState(null),[z,D]=u.useState(null),[B,V]=u.useState(0),[R,M]=u.useState([]),[A,O]=u.useState([]),[T,F]=u.useState(null),[P,q]=u.useState([]),[$,E]=u.useState(!1),[I,N]=u.useState(!1),[J,Y]=u.useState(null),[L,H]=u.useState(null),[Q,ie]=u.useState(!1),[G,le]=u.useState(null),[ue,me]=u.useState(0),[W,Me]=u.useState({}),[De,Fe]=u.useState(null),[ot,st]=u.useState(!1),[ze,Oe]=u.useState(null),[Re,qe]=u.useState("persist"),[ae,Le]=u.useState(""),[Ge,at]=u.useState(!0),[oe,xe]=u.useState(0),[we,X]=u.useState([]),[ee,ye]=u.useState(!1),[ke,he]=u.useState(!1),[Ee,He]=u.useState(null),[ct,tt]=u.useState(null),[ut,ir]=u.useState([]),[Go,ur]=u.useState(!1),[Rt,Kt]=u.useState(null),cn=u.useRef(!1),Yr=(j==null?void 0:j.premiumStatus)==="active"||(j==null?void 0:j.premiumStatus)==="premium",Rn=Yr?10:4,dn=Yr?4:2,Vr=r.filter(se=>{var Ce;return(((Ce=se.createdBy)==null?void 0:Ce._id)||se.createdBy)===((j==null?void 0:j._id)||(j==null?void 0:j.id))}).length;u.useEffect(()=>{w&&!cn.current&&r.length===0&&(s(1),cn.current=!0)},[s,r.length,w]),u.useEffect(()=>{if(!Rt)return;const se=()=>Kt(null);return document.addEventListener("click",se),()=>{document.removeEventListener("click",se)}},[Rt]),u.useEffect(()=>{(async()=>{var Ce;if(!(!e||C||z)){try{const $e=await a(e);if($e){le(null),_($e);return}}catch{}try{const $e=await c(e);$e!=null&&$e.deck&&(le(((Ce=$e.shareLink)==null?void 0:Ce.shortCode)||e),_($e.deck))}catch{}}})()},[a,c,e,z,C]);const qt=((Yi=z==null?void 0:z.items)==null?void 0:Yi[B])||null;u.useEffect(()=>{!qt||$||(M(zN(qt)),O([]),F(null))},[qt,$]),u.useEffect(()=>{if(!z||$)return;const se=Number(z.timeLimit||0)*60;me(se)},[z,$]),u.useEffect(()=>{if(!z||$||!ue)return;const se=setInterval(()=>me(Ce=>Ce-1),1e3);return()=>clearInterval(se)},[z,$,ue]);const Qo=()=>{if(Vr>=Rn){Yr?be.error("Siz maksimal limitga yetgansiz"):k(!0);return}y(!0)},Ko=async se=>{const Ce=await a(se);Ce&&(_(Ce),D(null),E(!1))},Se=async se=>{var $e,dt;let Ce=typeof se=="string"?null:se;if(!Ce&&typeof se=="string")try{Ce=await a(se),le(null)}catch{const U=await c(se);Ce=(U==null?void 0:U.deck)||null,le((($e=U==null?void 0:U.shareLink)==null?void 0:$e.shortCode)||se)}if(!((dt=Ce==null?void 0:Ce.items)!=null&&dt.length)){be.error("Bu to'plamda savollar topilmadi");return}_(null),D(Ce),V(0),q([]),E(!1),Me({}),Fe(null)},Fi=async se=>{Oe(se),qe("persist"),Le(""),at(!0),xe(0),ye(!0);try{const Ce=await f(se._id);X(Array.isArray(Ce)?Ce:[])}finally{ye(!1)}},Ct=async()=>{var se,Ce;if(!(!L||Q)){ie(!0);try{await p(L._id),(C==null?void 0:C._id)===L._id&&_(null),(z==null?void 0:z._id)===L._id&&D(null),be.success("Gap tuzish to'plami o'chirildi."),H(null)}catch($e){be.error(((Ce=(se=$e==null?void 0:$e.response)==null?void 0:se.data)==null?void 0:Ce.message)||"To'plamni o'chirishda xatolik yuz berdi.")}finally{ie(!1)}}},un=se=>{T||(M(Ce=>Ce.filter($e=>$e.id!==se.id)),O(Ce=>[...Ce,se]))},na=se=>{T||(O(Ce=>Ce.filter($e=>$e.id!==se.id)),M(Ce=>[...Ce,se]))},wr=async()=>{if(qt){if(!A.length){be.error("Avval bo'laklardan gap tuzing");return}N(!0);try{const se=await d(z._id,B,A.map(Ce=>Ce.text));F(se),Me(Ce=>({...Ce,[B]:A.map($e=>$e.text)}))}catch{be.error("Javobni tekshirishda xatolik yuz berdi")}finally{N(!1)}}},Ni=()=>{if(!T||!qt)return;const se=[...P,{prompt:qt.prompt,...T}];if(q(se),B>=z.items.length-1){Zn();return}V(Ce=>Ce+1)},Zn=async()=>{if(!(!z||ot)){st(!0);try{const se={...W,...qt&&A.length&&!T?{[B]:A.map(dt=>dt.text)}:{}},Ce=Object.entries(se).map(([dt,U])=>({questionIndex:Number(dt),selectedTokens:U})),$e=await m(z._id,{answers:Ce,guestName:w?null:b,shareShortCode:G||null});Fe($e),q(($e==null?void 0:$e.items)||[]),E(!0)}catch{be.error("Natijani saqlashda xatolik yuz berdi")}finally{st(!1)}}},qi=()=>{z&&(V(0),q([]),E(!1),Me({}),Fe(null),F(null),O([]))},Hi=async se=>{tt(se),ur(!0);try{const Ce=await h(se._id,{page:1,limit:500});ir((Ce==null?void 0:Ce.data)||[])}finally{ur(!1)}},Er=async()=>{var se,Ce;if(!(!ze||ke)){if(Re==="persist"&&!ae.trim()){be.error("Guruh nomini kiriting");return}he(!0);try{const $e=await x(ze._id,{persistResults:Re==="persist",groupName:Re==="persist"?ae.trim():"",showResults:Ge,timeLimit:Number(oe)||0});X(U=>[$e,...U]);const dt=`${window.location.origin}/arena/sentence-builder/${$e.shortCode}`;await navigator.clipboard.writeText(dt),be.success("Havola yaratildi va nusxalandi."),Le(""),at(!0),xe(0)}catch($e){be.error(((Ce=(se=$e==null?void 0:$e.response)==null?void 0:se.data)==null?void 0:Ce.message)||"Havolani yaratishda xatolik yuz berdi")}finally{he(!1)}}},Jo=async se=>{try{await navigator.clipboard.writeText(`${window.location.origin}/arena/sentence-builder/${se}`),be.success("Havola nusxalandi.")}catch{be.error("Havolani nusxalab bo'lmadi")}},Ht=async se=>{var Ce,$e;if(!(!ze||Ee)){He(se);try{await S(ze._id,se),X(dt=>dt.filter(U=>U._id!==se)),be.success("Havola o'chirildi.")}catch(dt){be.error((($e=(Ce=dt==null?void 0:dt.response)==null?void 0:Ce.data)==null?void 0:$e.message)||"Havolani o'chirishda xatolik yuz berdi")}finally{He(null)}}};u.useEffect(()=>{z&&Number(z.timeLimit||0)>0&&ue<=0&&!$&&!ot&&Zn()},[z,ue,$,ot]);const Ui=u.useMemo(()=>{var se;return(se=z==null?void 0:z.items)!=null&&se.length?`${(B+1)/z.items.length*100}%`:"0%"},[z,B]),pn=P.filter(se=>se.isCorrect).length,dc=P.length?Math.round(pn/P.length*100):0,oa=u.useMemo(()=>(ut||[]).map((se,Ce)=>({id:se._id||`${se.participantName}-${se.createdAt}-${Ce}`,participantName:se.participantName||"Foydalanuvchi",groupName:se.groupName||"",createdAt:se.createdAt,score:Number(se.score||0),total:Number(se.total||0),accuracy:Number(se.accuracy||0),breakdowns:(se.items||[]).map(($e,dt)=>({questionIndex:$e.questionIndex!==void 0?$e.questionIndex:dt,prompt:$e.prompt||`Savol #${dt+1}`,isCorrect:!!$e.isCorrect,selectedTokens:$e.selectedTokens||[],expectedTokens:$e.expectedTokens||[],mistakes:$e.mistakes||[]}))})),[ut]);return $&&z?n.jsx(ld,{children:n.jsxs(Db,{children:[n.jsxs(Wh,{onClick:()=>D(null),children:[n.jsx(nr,{size:18}),"To'plamga qaytish"]}),n.jsxs(Fb,{children:[n.jsx(Fa,{children:"Yakuniy natija"}),n.jsx(Ob,{children:z.title}),n.jsxs(wN,{children:[n.jsxs(Qh,{children:["To'g'ri javoblar",n.jsx("strong",{children:(De==null?void 0:De.score)??pn})]}),n.jsxs(Qh,{children:["Jami savollar",n.jsx("strong",{children:(De==null?void 0:De.total)??P.length})]}),n.jsxs(Qh,{children:["Reyting",n.jsxs("strong",{children:[(De==null?void 0:De.accuracy)??dc,"%"]})]})]}),(De==null?void 0:De.showResults)!==!1?n.jsx(kN,{children:P.map((se,Ce)=>n.jsxs(jN,{children:[n.jsxs(Lb,{children:["Savol #",Ce+1,": ",se.prompt]}),n.jsx(io,{children:se.isCorrect?"To'g'ri":"Noto'g'ri"}),n.jsx(qb,{children:(se.expectedTokens||se.expected||[]).map(($e,dt)=>n.jsx(cd,{$bg:"rgba(59,130,246,0.12)",children:$e},`${$e}-${dt}`))})]},`${se.prompt}-${Ce}`))}):n.jsx(SN,{children:"Bu havola uchun natija breakdowni talabalarga ko'rsatilmaydi."}),n.jsxs(Gh,{children:[n.jsxs(dd,{onClick:qi,children:[n.jsx($x,{size:16}),"Qayta boshlash"]}),n.jsx(ud,{onClick:()=>D(null),children:"Orqaga"})]})]})]})}):z&&qt?n.jsx(ld,{children:n.jsxs(Db,{children:[n.jsxs(Wh,{onClick:()=>D(null),children:[n.jsx(nr,{size:18}),"To'plamga qaytish"]}),n.jsxs(Fb,{children:[n.jsxs(uN,{children:[n.jsxs("div",{children:[z.title," • Savol ",B+1," /"," ",z.items.length]}),n.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[Number(z.timeLimit||0)>0&&n.jsxs("span",{children:[n.jsx(im,{size:14,style:{marginRight:6}}),Math.max(0,Math.floor(ue/60)),":",String(Math.max(0,ue%60)).padStart(2,"0")]}),n.jsx("span",{children:T!=null&&T.isCorrect?"To'g'ri":"Gapni tuzing"})]})]}),n.jsx(pN,{children:n.jsx(hN,{$width:Ui})}),n.jsxs(xN,{children:[n.jsxs("div",{children:[n.jsx(Fa,{children:"Savol"}),n.jsx(fN,{children:qt.prompt})]}),n.jsxs("div",{children:[n.jsx(Fa,{children:"Sizning gapingiz"}),n.jsx(gN,{children:A.length?A.map((se,Ce)=>{const $e=T?se.text===T.expected[Ce]?"correct":"wrong":null;return n.jsx(Nb,{$selected:!0,$state:$e,disabled:!!T,onClick:()=>na(se),children:se.text},se.id)}):n.jsx(io,{children:"Bo'laklarni bosib gap tuzing"})})]}),n.jsxs("div",{children:[n.jsx(Fa,{children:"Bo'laklar"}),n.jsx(mN,{children:R.map(se=>n.jsx(Nb,{onClick:()=>un(se),disabled:!!T,children:se.text},se.id))})]}),T&&z.showResults!==!1&&n.jsxs(yN,{$correct:T.isCorrect,children:[n.jsx(Fa,{children:T.isCorrect?n.jsxs(n.Fragment,{children:[n.jsx(rn,{size:18,style:{marginRight:8}}),"Javob to'g'ri"]}):n.jsxs(n.Fragment,{children:[n.jsx(t4,{size:18,style:{marginRight:8}}),"Javobda xato bor"]})}),n.jsx(io,{children:"To'g'ri javob bo'laklari"}),n.jsx(qb,{children:T.expected.map((se,Ce)=>n.jsx(cd,{$bg:"rgba(34,197,94,0.14)",children:se},`${se}-${Ce}`))}),!T.isCorrect&&n.jsx(vN,{children:T.mistakes.map(se=>n.jsxs(bN,{children:[se.position,"-bo'lakda siz"," ",n.jsx("strong",{children:se.actual||"hech narsa"})," ","tanladingiz.",n.jsx("br",{}),"To'g'risi:"," ",n.jsx("strong",{children:se.expected||"ortiqcha bo'lak"})]},se.position))})]}),n.jsxs(Gh,{children:[T?n.jsx(dd,{onClick:Ni,children:B>=z.items.length-1?"Yakunlash":"Keyingi savol"}):n.jsx(dd,{onClick:wr,children:I?"Tekshirilmoqda...":"Tekshirish"}),B>=z.items.length-1&&n.jsx(ud,{onClick:Zn,children:"Yakunlash"})]})]})]})]})}):C?n.jsx(ld,{children:n.jsxs(sN,{children:[n.jsxs(Wh,{onClick:()=>_(null),children:[n.jsx(nr,{size:18}),"Ro'yxatga qaytish"]}),n.jsxs(aN,{children:[n.jsx(Ob,{children:C.title}),n.jsx(Ab,{children:C.description||"Tavsif kiritilmagan"}),n.jsxs(io,{style:{marginTop:10},children:["Savollar soni: ",((eo=C.items)==null?void 0:eo.length)||0]}),n.jsxs(Gh,{children:[n.jsxs(dd,{onClick:()=>Se(C),children:[n.jsx(wu,{size:16}),"Mashq qilish"]}),C.canViewAnswers&&n.jsxs(n.Fragment,{children:[n.jsxs(ud,{onClick:()=>Fi(C),children:[n.jsx(Do,{size:16}),"Havolalar"]}),n.jsxs(ud,{onClick:()=>Hi(C),children:[n.jsx(bx,{size:16}),"Natijalar"]})]})]})]}),n.jsx(lN,{children:(C.items||[]).map((se,Ce)=>n.jsxs(cN,{children:[n.jsxs(Lb,{children:["Savol #",Ce+1]}),n.jsx(dN,{children:se.prompt}),C.canViewAnswers?n.jsxs(n.Fragment,{children:[n.jsx(io,{style:{marginTop:14},children:"To'g'ri bo'laklar"}),n.jsx(Bb,{children:(se.answerTokens||[]).map(($e,dt)=>n.jsx(cd,{$bg:"rgba(59,130,246,0.12)",children:$e},`${$e}-${dt}`))}),(se.extraTokens||[]).length>0&&n.jsxs(n.Fragment,{children:[n.jsx(io,{style:{marginTop:14},children:"Chalg'ituvchi bo'laklar"}),n.jsx(Bb,{children:se.extraTokens.map(($e,dt)=>n.jsx(cd,{$bg:"rgba(244,114,182,0.12)",children:$e},`${$e}-${dt}`))})]})]}):n.jsx(io,{style:{marginTop:14},children:"Javoblar faqat creator uchun ko'rinadi."})]},se._id||Ce))})]})}):n.jsxs(ld,{children:[n.jsx(gp,{title:"Gap tuzish",count:Vr,onBack:t,rightContent:n.jsx(Je,{onClick:Qo,children:n.jsx(Et,{size:16})})}),r.length===0?n.jsxs(oN,{children:[n.jsx("h3",{children:"Hozircha to'plam yo'q"}),"Gap bo'laklaridan mashq qilish uchun birinchi to'plamni yarating."]}):n.jsxs(n.Fragment,{children:[n.jsx(KF,{children:r.map(se=>{var Ce;return n.jsxs(JF,{$raised:Rt===se._id,onClick:()=>{Kt(null),Se(se._id)},children:[n.jsxs(XF,{children:[n.jsx(ZF,{children:se.title}),n.jsxs(tN,{onClick:$e=>{$e.stopPropagation()},children:[n.jsx(rN,{onClick:()=>Kt($e=>$e===se._id?null:se._id),children:n.jsx(nm,{size:16})}),Rt===se._id&&n.jsxs(nN,{onClick:$e=>$e.stopPropagation(),children:[n.jsxs(Da,{onClick:()=>{Ko(se._id),Kt(null)},children:[n.jsx(_n,{size:14}),"Ko'rish"]}),n.jsxs(Da,{onClick:()=>{Fi(se),Kt(null)},children:[n.jsx(Do,{size:14}),"Havolalar"]}),n.jsxs(Da,{onClick:()=>{Hi(se),Kt(null)},children:[n.jsx(bx,{size:14}),"Natijalar"]}),n.jsxs(Da,{onClick:()=>{Y(se),Kt(null)},children:[n.jsx(tp,{size:14}),"Tahrirlash"]}),n.jsxs(Da,{$danger:!0,onClick:()=>{H(se),Kt(null)},children:[n.jsx(lr,{size:14}),"O'chirish"]})]})]})]}),n.jsx(Ab,{children:se.description||"Tavsif yo'q"}),n.jsxs(io,{children:["Savollar: ",((Ce=se.items)==null?void 0:Ce.length)||0]}),n.jsxs(eN,{children:[n.jsx(wu,{size:14}),"Boshlash uchun kartani bosing"]})]},se._id)})}),i&&n.jsx(iN,{onClick:()=>s(o+1),children:"Yana yuklash"})]}),(v||J)&&n.jsx(_B,{onClose:()=>{y(!1),Y(null)},initialDeck:J}),g&&n.jsx(xp,{isOpen:g,onClose:()=>k(!1)}),n.jsx(Di,{isOpen:!!L,onClose:()=>{Q||H(null)},title:"To'plamni o'chirish",description:`${(L==null?void 0:L.title)||"Bu to'plam"} butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.`,confirmText:Q?"O'chirilmoqda...":"O'chirish",cancelText:"Bekor qilish",onConfirm:Ct,isDanger:!0}),n.jsx(lC,{isOpen:!!ze,onClose:()=>{Oe(null),qe("persist"),Le(""),at(!0),xe(0)},title:"Gap tuzish havolasini yaratish",itemTitle:(ze==null?void 0:ze.title)||"",limit:dn,currentCount:we.length,mode:Re,onModeChange:qe,groupName:ae,onGroupNameChange:Le,showResults:Ge,onShowResultsChange:at,timeLimit:oe,onTimeLimitChange:xe,onCreate:Er,isCreating:ke,links:we,loadingLinks:ee,onCopyLink:Jo,onDeleteLink:Ht,deletingLinkId:Ee,linkPrefix:"/arena/sentence-builder/"}),ct&&n.jsx(aC,{title:"Gap tuzish natijalari",subtitle:`"${ct.title}" bo'yicha ishlagan talabalar, ularning to'g'ri javoblari va har bir bo'lakdagi xatolari.`,searchPlaceholder:"Talaba yoki guruh qidirish...",loading:Go,results:oa,onClose:()=>tt(null)})]})},_N=l.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-color);
  overflow-y: auto;
`,TN=l.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`,EN=({activeTab:e="tests",initialId:t,onBack:r})=>{const{fetchMyTests:o,fetchFlashcards:i}=Ur();return Qe.useEffect(()=>{},[]),n.jsx(_N,{children:n.jsxs(TN,{children:[e==="tests"&&n.jsx(LD,{initialTestId:t,onBack:r}),e==="flashcards"&&n.jsx(bF,{initialDeckId:t,onBack:r}),e==="sentenceBuilders"&&n.jsx($N,{initialDeckId:t,onBack:r}),e==="battles"&&n.jsx(QF,{initialRoomId:t,onBack:r}),!e&&n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"var(--text-muted-color)",opacity:.8,textAlign:"center",marginTop:"100px"},children:[n.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"🏟️"}),n.jsx("h2",{style:{color:"var(--text-color)",marginBottom:"8px"},children:"Bilimlar maydoniga xush kelibsiz!"}),n.jsx("p",{style:{maxWidth:"400px"},children:"Chap tomondagi menyudan o'zingizga kerakli bo'limni tanlang: testlar ishlash, lug'at yodlash yoki do'stlar bilan bellashuv."})]})]})})},Tm=et`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`,RN=l.div`
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
`,PN=l.div`
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
  animation: ${Tm} 0.25s ease;
`,MN=l.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,IN=l.span`
  font-weight: 700;
  font-size: 17px;
  color: var(--text-color);
`;l.button`
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
`;const AN=l.div`
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
`,ON=l.div`
  display: flex;
  gap: 12px;
  animation: ${Tm} 0.2s ease;
`,Hb=["#5865f2","#3ba55d","#faa61a","#ed4245","#9b59b6","#00b0f4"],Ub=e=>Hb[(e||"A").charCodeAt(0)%Hb.length],Yb=l.div`
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
`,Vb=l.div`
  flex: 1;
  min-width: 0;
`,LN=l.div`
  background: var(--background-color);
  padding: 10px 14px;
  border-radius: 4px 14px 14px 14px;
`,Wb=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Gb=l.span`
  font-weight: 700;
  font-size: 13px;
  color: var(--text-color);
`,Qb=l.span`
  font-size: 11px;
  color: var(--text-muted-color);
`,Kb=l.div`
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  word-break: break-word;
`,Jb=l.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
  padding-left: 2px;
`,Xb=l.button`
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
`,BN=l.div`
  margin-top: 10px;
  padding-left: 4px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,DN=l.div`
  display: flex;
  gap: 10px;
  animation: ${Tm} 0.2s ease;
`,FN=l.div`
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: 4px 12px 12px 12px;
`,NN=l.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
  margin-right: 4px;
`,qN=l.div`
  border-top: 1px solid var(--border-color);
  padding: 12px 20px;
`,HN=l.div`
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
`,UN=l.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;
  display: flex;
  &:hover {
    color: var(--text-color);
  }
`,YN=l.form`
  display: flex;
  gap: 10px;
  align-items: center;
`,VN=l.input`
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
`,WN=l.button`
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
`,Zb=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  text-align: center;
`,e2=e=>{const t=Date.now()-new Date(e).getTime(),r=Math.floor(t/6e4);if(r<1)return"Hozir";if(r<60)return`${r}d`;const o=Math.floor(r/60);if(o<24)return`${o}s`;const i=Math.floor(o/24);return i<7?`${i}k`:xt(e).format("D MMM")},GN=({post:e,onClose:t})=>{const{getComments:r,addComment:o,addReply:i}=fp(),s=Ie(B=>B.user),[a,c]=u.useState([]),[d,p]=u.useState(!0),[h,f]=u.useState(""),[x,S]=u.useState(!1),[m,b]=u.useState(1),[w,j]=u.useState(!0),[v,y]=u.useState(null),g=u.useRef(null),k=async(B=1)=>{B===1&&p(!0);try{const V=await r(e._id,B,10),R=(V==null?void 0:V.data)||[],M=(V==null?void 0:V.totalPages)||1;c(A=>B===1?R:[...A,...R]),b(B),j(B<M)}catch(V){console.error(V)}finally{B===1&&p(!1)}};u.useEffect(()=>{e&&k(1)},[e,r]);const C=()=>k(m+1),_=(B,V)=>{y({commentId:B,nickname:V}),setTimeout(()=>{var R;return(R=g.current)==null?void 0:R.focus()},100)},z=()=>y(null),D=async B=>{if(B.preventDefault(),!(!h.trim()||x)){if(S(!0),v){await i(e._id,v.commentId,h.trim(),v.nickname);const V={_id:Date.now().toString(),user:{_id:s._id,username:s.username,nickname:s.nickname,avatar:s.avatar},content:h.trim(),replyToUser:v.nickname,createdAt:new Date().toISOString()};c(R=>R.map(M=>M._id===v.commentId?{...M,replies:[...M.replies||[],V]}:M)),y(null)}else{await o(e._id,h.trim());const V={_id:Date.now().toString(),user:{_id:s._id,username:s.username,nickname:s.nickname,avatar:s.avatar},content:h.trim(),createdAt:new Date().toISOString(),replies:[]};c(R=>[...R,V])}f(""),S(!1)}};return e?n.jsx(RN,{onClick:t,children:n.jsxs(PN,{onClick:B=>B.stopPropagation(),children:[n.jsxs(MN,{children:[n.jsx(IN,{children:"Izohlar"}),n.jsx(Je,{onClick:t,children:n.jsx(nt,{size:18})})]}),n.jsx(AN,{id:"scrollableComments",children:n.jsx(En,{dataLength:a.length,next:C,hasMore:w,loader:n.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)",fontSize:"14px"},children:"Yuklanmoqda..."}),endMessage:a.length>0?n.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)",fontSize:"13px"},children:"Barcha izohlar ko'rsatildi."}):null,scrollableTarget:"scrollableComments",style:{display:"flex",flexDirection:"column",gap:"20px",overflow:"visible"},children:d&&a.length===0?n.jsx(Zb,{children:"Yuklanmoqda..."}):a.length===0?n.jsx(Zb,{children:"Hali izohlar yo'q. Birinchi bo'lib yozing! 💬"}):a.map(B=>{const V=B.user||{},R=V.nickname||V.username||"Foydalanuvchi";return n.jsx("div",{children:n.jsxs(ON,{children:[n.jsx(Yb,{color:Ub(R),size:36,children:V.avatar?n.jsx("img",{src:V.avatar,alt:R}):R.charAt(0).toUpperCase()}),n.jsxs(Vb,{children:[n.jsxs(LN,{children:[n.jsxs(Wb,{children:[n.jsxs(Gb,{children:[R,(V==null?void 0:V.premiumStatus)==="active"&&n.jsx(zr,{width:16,height:16})]}),n.jsx(Qb,{children:e2(B.createdAt)})]}),n.jsx(Kb,{children:B.content})]}),n.jsx(Jb,{children:n.jsxs(Xb,{onClick:()=>_(B._id,R),children:[n.jsx(bu,{size:12})," Javob berish"]})}),B.replies&&B.replies.length>0&&n.jsx(BN,{children:B.replies.map(M=>{const A=M.user||{},O=A.nickname||A.username||"Foydalanuvchi";return n.jsxs(DN,{children:[n.jsx(Yb,{color:Ub(O),size:28,children:A.avatar?n.jsx("img",{src:A.avatar,alt:O}):O.charAt(0).toUpperCase()}),n.jsxs(Vb,{children:[n.jsxs(FN,{children:[n.jsxs(Wb,{children:[n.jsx(Gb,{children:O}),n.jsx(Qb,{children:e2(M.createdAt)})]}),n.jsxs(Kb,{children:[M.replyToUser&&n.jsxs(NN,{children:["@",M.replyToUser]}),M.content]})]}),n.jsx(Jb,{children:n.jsxs(Xb,{onClick:()=>_(B._id,O),children:[n.jsx(bu,{size:12})," Javob berish"]})})]})]},M._id)})})]})]})},B._id)})})}),n.jsxs(qN,{children:[v&&n.jsxs(HN,{children:[n.jsxs("div",{children:["Javob: ",n.jsxs("span",{children:["@",v.nickname]})]}),n.jsx(UN,{onClick:z,children:n.jsx(nt,{size:14})})]}),n.jsxs(YN,{onSubmit:D,children:[n.jsx(VN,{ref:g,placeholder:v?`@${v.nickname} ga javob...`:"Izoh yozing...",value:h,onChange:B=>f(B.target.value)}),n.jsx(WN,{type:"submit",disabled:!h.trim()||x,children:n.jsx(np,{size:16})})]})]})]})}):null},QN=et`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`,KN=l.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
`,JN=l.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 0;
  }
`,XN=l.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`,ZN=l.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 20;
`,eq=l.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`,tq=l.div`
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
`;l.button`
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
`;const rq=l.div`
  display: flex;
  margin-top: 12px;
`,t2=l.button`
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
`,nq=l.button`
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
`,oq=l.div`
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
`,iq=l.span`
  font-size: 15px;
  color: var(--text-muted-color);
  flex: 1;
  text-align: left;
`,sq=l.div`
  padding: 16px 10px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
  border-radius: 16px;
  animation: ${QN} 0.3s ease both;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
`,aq=l.div`
  flex-shrink: 0;
`,r2=["#5865f2","#3ba55d","#faa61a","#ed4245","#9b59b6","#00b0f4"],lq=e=>r2[e.charCodeAt(0)%r2.length],cq=l.div`
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
`,dq=l.div`
  flex: 1;
  min-width: 0;
`,uq=l.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`,pq=l.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`,hq=l.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,fq=l.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,xq=l.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,gq=l.div`
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
`,mq=l.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`,Na=l.button`
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
`,yq=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
`,vq=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 15px;
  text-align: center;
`,bq=l.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  margin-bottom: 4px;
`,wq=e=>{if(!e)return"";const t=[];let r=0;const o=/\*\*(.+?)\*\*|_(.+?)_/g;let i=0,s;for(;(s=o.exec(e))!==null;)s.index>i&&t.push(n.jsx("span",{children:e.slice(i,s.index)},r++)),s[1]!==void 0?t.push(n.jsx("strong",{children:s[1]},r++)):t.push(n.jsx("em",{children:s[2]},r++)),i=s.index+s[0].length;return i<e.length&&t.push(n.jsx("span",{children:e.slice(i)},r++)),t.length?t:e},kq=()=>{const e=Ie($=>$.user),t=Qt(),{forYouPosts:r,forYouPage:o,forYouHasMore:i,followingPosts:s,followingPage:a,followingHasMore:c,loading:d,fetchFeed:p,createPost:h,editPost:f,likePost:x,viewPost:S,deletePost:m}=fp(),[b,w]=u.useState("foryou"),[j,v]=u.useState(!1),[y,g]=u.useState(null),[k,C]=u.useState(null),[_,z]=u.useState(null),D=b==="foryou"?r:s,B=b==="foryou"?i:c,V=b==="foryou"?o:a,R=()=>{p(b,V+1)};u.useEffect(()=>{(b==="foryou"&&r.length===0||b==="following"&&s.length===0)&&p(b,1)},[b,p,r.length,s.length]);const M=u.useRef(new Set);u.useEffect(()=>{const $=D.filter(E=>E._id&&!M.current.has(E._id));if($.length>0){const E=setTimeout(()=>{$.forEach(I=>{M.current.has(I._id)||(M.current.add(I._id),S(I._id))})},500);return()=>clearTimeout(E)}},[D,S]);const A=(e==null?void 0:e.nickname)||(e==null?void 0:e.username)||"Siz",O=A.charAt(0).toUpperCase(),T=async $=>{await h($),b!=="foryou"&&w("foryou")},F=async $=>{k!=null&&k._id&&(await f(k._id,$),C(null))},P=async()=>{_!=null&&_._id&&(await m(_._id),z(null))},q=$=>{const E=typeof $=="string"?$:$==null?void 0:$._id,I=typeof $=="object"?$==null?void 0:$.jammId:null,N=(e==null?void 0:e._id)||(e==null?void 0:e.id);t(E===N?"/profile":`/profile/${I||E}`)};return n.jsxs(KN,{children:[n.jsx(ZN,{children:n.jsxs(eq,{children:[n.jsxs(tq,{children:[n.jsx("h1",{children:"Gurunglar"}),n.jsx(Je,{onClick:()=>v(!0),children:n.jsx(Et,{size:14})})]}),n.jsxs(rq,{children:[n.jsx(t2,{active:b==="foryou",onClick:()=>w("foryou"),children:"Siz uchun"}),n.jsx(t2,{active:b==="following",onClick:()=>w("following"),children:"Obunachidan"})]})]})}),n.jsx(JN,{id:"scrollableFeed",children:n.jsx(XN,{children:n.jsxs(En,{dataLength:D.length,next:R,hasMore:B,loader:n.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)"},children:"Yuklanmoqda..."}),endMessage:D.length>0?n.jsx("div",{style:{textAlign:"center",padding:"16px",color:"var(--text-muted-color)",fontSize:"13px"},children:"Barcha xabarlar ko'rsatildi."}):null,style:{display:"flex",flexDirection:"column",overflow:"visible"},scrollableTarget:"scrollableFeed",children:[n.jsxs(nq,{onClick:()=>v(!0),children:[n.jsx(oq,{children:e!=null&&e.avatar?n.jsx("img",{src:e.avatar,alt:A}):O}),n.jsx(iq,{children:"Fikringizni baham ko'ring…"})]}),d&&D.length===0?n.jsx("div",{style:{padding:"16px 0",width:"100%"},children:[...Array(3)].map(($,E)=>n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",width:"100%"},children:[n.jsx(qx,{size:"44px"}),n.jsxs("div",{style:{flex:1},children:[n.jsx(Ot,{height:"15px",width:"120px",mb:"12px"}),n.jsx(Ot,{height:"14px",width:"90%",mb:"8px"}),n.jsx(Ot,{height:"14px",width:"70%",mb:"8px"}),n.jsx(Ot,{height:"14px",width:"40%",mb:"16px"}),n.jsxs("div",{style:{display:"flex",gap:"24px"},children:[n.jsx(Ot,{height:"16px",width:"40px",mb:"0"}),n.jsx(Ot,{height:"16px",width:"40px",mb:"0"}),n.jsx(Ot,{height:"16px",width:"40px",mb:"0"})]})]})]},E))}):D.length===0?n.jsxs(vq,{children:[n.jsx(bq,{children:b==="following"?n.jsx(No,{size:28,color:"var(--text-muted-color)"}):n.jsx(l4,{size:28,color:"var(--text-muted-color)"})}),b==="following"?"Obuna bo'lgan foydalanuvchilar gurunglarini ko'rasiz":"Hali gurunglar yo'q. Birinchi bo'ling!"]}):D.map($=>{const E=$.author||{},I=E.nickname||E.username||"Foydalanuvchi",N=E.username||"user",J=String(E._id||"")===String((e==null?void 0:e._id)||(e==null?void 0:e.id)||"");return n.jsxs(sq,{children:[n.jsx(aq,{children:n.jsx(cq,{color:lq(I),onClick:()=>q(E._id),children:E.avatar?n.jsx("img",{src:E.avatar,alt:I}):I.charAt(0).toUpperCase()})}),n.jsxs(dq,{children:[n.jsxs(uq,{children:[n.jsxs(pq,{onClick:()=>q(E._id),children:[I,E.premiumStatus==="active"&&n.jsx(zr,{width:16,height:16})]}),n.jsxs(hq,{children:["@",N]}),n.jsx(fq,{children:"·"}),n.jsx(xq,{children:Nx($.createdAt)})]}),n.jsx(gq,{children:wq($.content)}),n.jsxs(mq,{children:[n.jsxs(Na,{active:$.liked,activeColor:"#ed4245",onClick:Y=>{Y.stopPropagation(),x($._id)},children:[n.jsx(Mi,{size:16,fill:$.liked?"#ed4245":"none"}),$.likes]}),n.jsxs(Na,{activeColor:"#5865f2",onClick:Y=>{Y.stopPropagation(),g($)},children:[n.jsx(ep,{size:16}),$.comments]}),n.jsxs(Na,{activeColor:"var(--text-secondary-color)",children:[n.jsx(_n,{size:16}),$.views]})]}),J&&n.jsxs(yq,{children:[n.jsxs(Na,{activeColor:"var(--primary-color)",onClick:Y=>{Y.stopPropagation(),C($)},children:[n.jsx(tp,{size:16}),"Tahrirlash"]}),n.jsxs(Na,{activeColor:"#ed4245",onClick:Y=>{Y.stopPropagation(),z($)},children:[n.jsx(lr,{size:16}),"O'chirish"]})]})]})]},$._id)})]})})}),n.jsx(BS,{isOpen:j||!!k,onClose:()=>{v(!1),C(null)},onSubmit:k?F:T,currentUser:e,initialContent:(k==null?void 0:k.content)||"",title:k?"Gurungni tahrirlash":"Yangi Gurung",submitLabel:k?"Saqlash":"Yuborish"}),y&&n.jsx(GN,{post:y,onClose:()=>g(null)}),n.jsx(Di,{isOpen:!!_,onClose:()=>z(null),title:"Gurungni o'chirish",description:"Bu gurung o'chirilsa, u qayta tiklanmaydi.",confirmText:"O'chirish",cancelText:"Bekor qilish",onConfirm:P,isDanger:!0})]})},jq=l.div`
  display: flex;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 88%, transparent) 0%,
    color-mix(in srgb, var(--background-color) 76%, transparent) 100%
  );

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(100%, calc(100% - 72px));
    z-index: 10;
    background-color: var(--secondary-color);
    box-shadow: -4px 0 18px rgba(0, 0, 0, 0.22);
    animation: slideInFromRight 0.28s ease-out;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`,Kh=l.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);
  text-align: center;
  padding: 40px;
`,Sq=l.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 28px 72px;

  @media (max-width: 768px) {
    padding: 18px 16px 96px;
  }
`,Cq=l.button`
  display: none;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  background: rgba(255,255,255,0.05);
  color: var(--text-color);
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`,zq=l.button`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`,$q=l.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 28px;
  margin-bottom: 26px;
`,_q=l.h1`
  margin: 0 0 12px;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  color: var(--text-color);
`,Tq=l.p`
  margin: 0 0 16px;
  color: var(--text-secondary-color);
  font-size: 17px;
  line-height: 1.7;
`,Eq=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  margin-bottom: 20px;
`,Rq=l.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
`,Jh=l.button`
  border: 1px solid
    ${e=>e.active?"#ef4444":"var(--border-color)"};
  background: ${e=>e.active?"rgba(239,68,68,0.08)":"transparent"};
  color: ${e=>e.active?"#ef4444":"var(--text-secondary-color)"};
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`,Pq=l.div`
  height: 1px;
  background: var(--border-color);
  margin-bottom: 28px;
`,Mq=l.button`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`,Iq=l.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`,Aq=({blogIdentifier:e,onBack:t})=>{var b,w;const r=Qt(),o=u.useRef(new Set),[i,s]=u.useState(null),[a,c]=u.useState(""),[d,p]=u.useState(!0),[h,f]=u.useState(!1),[x,S]=u.useState(!1);u.useEffect(()=>{if(!e||e==="0"){s(null),c(""),p(!1);return}(async()=>{p(!0),s(null),c("");try{const[v,y]=await Promise.all([RS(e),PS(e)]);if(s(v),c((y==null?void 0:y.content)||""),!o.current.has(v._id)){o.current.add(v._id);const g=await AS(v._id);s(k=>k&&{...k,views:(g==null?void 0:g.views)||k.views})}}catch{s(null),c("")}finally{p(!1)}})()},[e]);const m=async()=>{if(!(i!=null&&i._id))return;const j=await IS(i._id);s(v=>v&&{...v,...j})};return!e||e==="0"?n.jsx(Kh,{children:"O‘qish uchun blog tanlang."}):d?n.jsx(Kh,{children:"Yuklanmoqda..."}):i?n.jsxs(jq,{children:[n.jsxs(Sq,{children:[n.jsxs(Cq,{onClick:()=>{t==null||t(),r("/blogs")},children:[n.jsx(nr,{size:16}),"Bloglar"]}),i.coverImage?n.jsx(zq,{type:"button",onClick:()=>S(!0),children:n.jsx($q,{src:i.coverImage,alt:i.title})}):null,n.jsx(_q,{children:i.title}),i.excerpt?n.jsx(Tq,{children:i.excerpt}):null,n.jsxs(Eq,{children:[n.jsx("span",{children:((b=i.author)==null?void 0:b.nickname)||((w=i.author)==null?void 0:w.username)||"Muallif"}),n.jsx("span",{children:xt(i.publishedAt||i.createdAt).format("DD MMM YYYY · HH:mm")})]}),n.jsxs(Rq,{children:[n.jsxs(Jh,{active:i.liked,onClick:m,children:[n.jsx(Mi,{size:16,fill:i.liked?"#ef4444":"none"}),i.likes]}),n.jsxs(Jh,{onClick:()=>f(!0),children:[n.jsx(ep,{size:16}),i.comments]}),n.jsxs(Jh,{as:"div",children:[n.jsx(_n,{size:16}),i.views]})]}),n.jsx(Pq,{}),n.jsx(km,{content:a,enableImageLightbox:!0})]}),h&&n.jsx(NS,{blog:i,onClose:()=>f(!1),onCommentsCountChange:j=>s(v=>v&&{...v,comments:j})}),x&&i.coverImage&&n.jsx(Mq,{type:"button",onClick:()=>S(!1),"aria-label":"Cover rasmni yopish",children:n.jsx(Iq,{src:i.coverImage,alt:i.title})})]}):n.jsx(Kh,{children:"Blog topilmadi."})},Oq=et`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,Lq=et`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`,Bq=et`
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,Dq=et`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
`,Fq=l.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(12px);
  animation: ${e=>e.$closing?Lq:Oq} 180ms ease
    forwards;

  @media (max-width: 640px) {
    padding: 0;
    align-items: stretch;
  }
`,Nq=l.div`
  --meet-text: var(--text-color);
  --meet-muted: var(--text-muted-color);
  --meet-surface: color-mix(in srgb, var(--secondary-color) 82%, black 18%);
  --meet-surface-2: color-mix(in srgb, var(--tertiary-color) 84%, black 16%);
  --meet-surface-3: color-mix(in srgb, var(--input-color) 86%, black 14%);
  --meet-border: color-mix(in srgb, var(--border-color) 82%, white 18%);
  --meet-soft: color-mix(in srgb, var(--background-color) 72%, transparent);
  --meet-primary: var(--primary-color);
  --meet-primary-soft: color-mix(
    in srgb,
    var(--primary-color) 18%,
    transparent
  );
  --meet-accent: #14b8a6;

  width: min(100%, 480px);
  max-height: min(86vh, 640px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--meet-border);
  background: color-mix(
    in srgb,
    var(--meet-surface) 88%,
    var(--meet-surface-2) 12%
  );
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.34);
  animation: ${e=>e.$closing?Dq:Bq} 180ms ease
    forwards;

  @media (max-width: 640px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`,qq=l.div`
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--meet-border);
  background: color-mix(in srgb, var(--meet-surface) 88%, transparent);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 640px) {
    padding: 14px 14px 10px;
  }
`,Hq=l.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`,Uq=l.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--meet-primary) 82%, white 18%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 10px 24px rgba(20, 184, 166, 0.2);
`,Yq=l.div`
  h2 {
    margin: 0 0 4px;
    color: var(--meet-text);
    font-size: 18px;
    line-height: 1.1;
  }

  p {
    margin: 0;
    color: var(--meet-muted);
    font-size: 12px;
    line-height: 1.45;
    max-width: 320px;
  }
`;l.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: color-mix(in srgb, var(--meet-soft) 72%, transparent);
  color: var(--meet-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;const Vq=l.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 14px 16px;
  display: grid;
  gap: 12px;

  @media (max-width: 640px) {
    padding: 12px 14px;
    gap: 10px;
  }
`,Wq=l.div`
  border-radius: 12px;
  padding: 12px;
  background: color-mix(
    in srgb,
    var(--meet-surface) 72%,
    var(--meet-primary-soft) 28%
  );
  border: 1px solid
    color-mix(in srgb, var(--meet-primary) 16%, var(--meet-border) 84%);

`,Gq=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--meet-text);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 4px;
`,Qq=l.p`
  margin: 0;
  color: var(--meet-muted);
  font-size: 12px;
  line-height: 1.45;
`,n2=l.div`
  border-radius: 12px;
  padding: 12px;
  background: color-mix(in srgb, var(--meet-surface) 76%, transparent);
  border: 1px solid var(--meet-border);
`,o2=l.div`
  color: var(--meet-text);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 4px;
`,i2=l.div`
  color: var(--meet-muted);
  font-size: 12px;
  line-height: 1.45;
  margin-bottom: 10px;
`,Kq=l.div`
  display: grid;
  gap: 10px;
`,s2=l.label`
  display: grid;
  gap: 6px;
  color: var(--meet-muted);
  font-size: 12px;
  font-weight: 700;
`,cC=pi`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--meet-border);
  border-radius: 10px;
  background: var(--meet-surface-3);
  color: var(--meet-text);
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:focus {
    border-color: color-mix(in srgb, var(--meet-primary) 62%, white 38%);
    background: color-mix(in srgb, var(--meet-surface) 86%, white 14%);
  }
`,Jq=l.input`
  ${cC};
  min-height: 40px;
  padding: 0 12px;
  font-size: 13px;
`,Xq=l.textarea`
  ${cC};
  min-height: 84px;
  padding: 10px 12px;
  resize: vertical;
  font-size: 13px;
  line-height: 1.5;
`,Zq=l.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,a2=l.button`
  border: 1px solid
    ${e=>e.$active?"color-mix(in srgb, var(--meet-primary) 55%, white 45%)":"var(--meet-border)"};
  background: ${e=>e.$active?"color-mix(in srgb, var(--meet-primary-soft) 70%, var(--meet-surface-2) 30%)":"color-mix(in srgb, var(--meet-surface-2) 90%, transparent)"};
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  cursor: pointer;
`,l2=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`,c2=l.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--meet-soft) 72%, transparent);
  color: var(--meet-accent);
  display: flex;
  align-items: center;
  justify-content: center;
`,d2=l.div`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${e=>e.$active?"var(--meet-primary-soft)":"color-mix(in srgb, var(--meet-soft) 72%, transparent)"};
  color: ${e=>e.$active?"color-mix(in srgb, var(--meet-primary) 78%, white 22%)":"var(--meet-muted)"};
  font-size: 10px;
  font-weight: 800;
`,u2=l.div`
  color: var(--meet-text);
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 3px;
`,p2=l.div`
  color: var(--meet-muted);
  font-size: 11px;
  line-height: 1.4;
`,eH=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px 14px;
  border-top: 1px solid var(--meet-border);
  background: color-mix(in srgb, var(--meet-surface) 86%, transparent);

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    padding: 10px 14px 14px;
  }
`,tH=l.div`
  color: var(--meet-muted);
  font-size: 11px;
  line-height: 1.4;
`,rH=l.div`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
  }
`,h2=l.button`
  min-width: 112px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid
    ${e=>e.$variant==="primary"?"transparent":"var(--meet-border)"};
  border-radius: 10px;
  background: ${e=>e.$variant==="primary"?"var(--meet-primary)":"color-mix(in srgb, var(--meet-soft) 72%, transparent)"};
  color: ${e=>e.$variant==="primary"?"white":"var(--meet-text)"};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  opacity: ${e=>e.disabled?.55:1};
  pointer-events: ${e=>e.disabled?"none":"auto"};

  @media (max-width: 640px) {
    flex: 1;
    min-width: 0;
  }
`,f2=180,nH=({isOpen:e,onClose:t,onCreateCall:r})=>{const[o,i]=u.useState(""),[s,a]=u.useState(""),[c,d]=u.useState(!1),[p,h]=u.useState(e),[f,x]=u.useState(!1),S=()=>{i(""),a(""),d(!1)};u.useEffect(()=>{if(e){h(!0),x(!1);return}if(!p)return;x(!0);const j=setTimeout(()=>{h(!1),x(!1),S()},f2);return()=>clearTimeout(j)},[e,p]);const m=()=>{f||(x(!0),setTimeout(()=>{t==null||t()},f2))},b=()=>{o.trim()&&(r({title:o.trim(),description:s.trim(),isPrivate:c}),m())},w=u.useMemo(()=>c?"Faqat siz tasdiqlaganlar kiradi":"Havolasi bor odamlar darhol qo'shiladi",[c]);return p?n.jsx(Fq,{$closing:f,onClick:m,children:n.jsxs(Nq,{$closing:f,onClick:j=>j.stopPropagation(),children:[n.jsxs(qq,{children:[n.jsxs(Hq,{children:[n.jsx(Uq,{children:n.jsx(Lr,{size:26})}),n.jsxs(Yq,{children:[n.jsx("h2",{children:"Create Group Video Call"}),n.jsx("p",{children:"Sarlavha yozing, maxfiylikni tanlang va tez meet yarating."})]})]}),n.jsx(Je,{onClick:m,children:n.jsx(nt,{size:18})})]}),n.jsxs(Vq,{children:[n.jsxs(Wq,{children:[n.jsxs(Gq,{children:[n.jsx(Lr,{size:16}),"Tez meet yaratish"]}),n.jsx(Qq,{children:"Meet yaratilgach link chiqadi. Public bo'lsa odamlar darhol, private bo'lsa tasdiq bilan kiradi."})]}),n.jsxs(n2,{children:[n.jsx(o2,{children:"Meet tafsilotlari"}),n.jsx(i2,{children:"Xona nomi va izoh kiriting."}),n.jsxs(Kq,{children:[n.jsxs(s2,{children:["Xona nomi",n.jsx(Jq,{value:o,onChange:j=>i(j.target.value.slice(0,Pe.meetTitleChars)),placeholder:"Masalan: Frontend sprint review",maxLength:Pe.meetTitleChars,autoFocus:!0})]}),n.jsxs(s2,{children:["Qisqa izoh",n.jsx(Xq,{value:s,onChange:j=>a(j.target.value.slice(0,Pe.meetDescriptionChars)),placeholder:"Bugungi call nima haqida?",maxLength:Pe.meetDescriptionChars})]})]})]}),n.jsxs(n2,{children:[n.jsx(o2,{children:"Kimlar qo'shila oladi?"}),n.jsx(i2,{children:w}),n.jsxs(Zq,{children:[n.jsxs(a2,{type:"button",$active:!c,onClick:()=>d(!1),children:[n.jsxs(l2,{children:[n.jsx(c2,{children:n.jsx(P3,{size:18})}),n.jsx(d2,{$active:!c,children:"Public"})]}),n.jsx(u2,{children:"Barchaga ochiq"}),n.jsx(p2,{children:"Havolasi borlar darhol kiradi."})]}),n.jsxs(a2,{type:"button",$active:c,onClick:()=>d(!0),children:[n.jsxs(l2,{children:[n.jsx(c2,{children:n.jsx(Fo,{size:18})}),n.jsx(d2,{$active:c,children:"Private"})]}),n.jsx(u2,{children:"Faqat ruxsat bilan"}),n.jsx(p2,{children:"Avval kutadi, keyin siz tasdiqlaysiz."})]})]})]})]}),n.jsxs(eH,{children:[n.jsx(tH,{children:"Meet yaratilgach uni sidebar ichida ko'rasiz."}),n.jsxs(rH,{children:[n.jsx(h2,{onClick:m,children:"Bekor qilish"}),n.jsx(h2,{$variant:"primary",onClick:b,disabled:!o.trim(),children:"Meet yaratish"})]})]})]})}):null},oH=et`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`,iH=l.div`
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
`,sH=l.div`
  width: 100%;
  max-width: 600px;
  background: #2f3136;
  border-radius: 24px;
  border: 1px solid rgba(88, 101, 242, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  animation: ${oH} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`,aH=l.div`
  padding: 24px 32px 0;
  display: flex;
  gap: 8px;
`,lH=l.div`
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
`,qa=l.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,Ha=l.div`
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
`,Ua=l.h2`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
`,Ya=l.p`
  font-size: 16px;
  color: #b9bbbe;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 32px;
`,Xh=l.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,Zh=l.button`
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
`,ef=l.span`
  font-size: 14px;
  font-weight: 600;
`,cH=l.div`
  padding: 24px 32px;
  background: rgba(32, 34, 37, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,x2=l.button`
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
`,dH=[{id:"dev",label:"Dasturlash",icon:n.jsx(T3,{size:24})},{id:"sci",label:"Fan va Texnika",icon:n.jsx(op,{size:24})},{id:"lang",label:"Tillar",icon:n.jsx(tc,{size:24})},{id:"math",label:"Matematika",icon:n.jsx($n,{size:24})}],uH=[{id:"learn",label:"O'rganish",icon:n.jsx($n,{size:24})},{id:"compete",label:"Musobaqalashish",icon:n.jsx(r4,{size:24})},{id:"fun",label:"Ko'ngilochar",icon:n.jsx(x4,{size:24})},{id:"social",label:"Muloqot",icon:n.jsx(g4,{size:24})}],pH=[{id:"beg",label:"Boshlang'ich",icon:n.jsx(Jp,{size:24})},{id:"int",label:"O'rta daraja",icon:n.jsx(Jp,{size:24})},{id:"adv",label:"Kuchli bilim",icon:n.jsx(Jp,{size:24})}],hH=()=>{const[e,t]=u.useState(1),[r,o]=u.useState({username:"",gender:"",age:"",interests:[],goals:[],level:""}),[i,s]=u.useState(""),[a,c]=u.useState(!1),[d,p]=u.useState(!1),h=Ie(g=>g.updateUser),f=Ie(g=>g.token),x=5;u.useEffect(()=>{const k=setTimeout(async()=>{const C=r.username.trim();if(!C){s(""),p(!1);return}if(!/^[a-zA-Z0-9]{8,30}$/.test(C)){s("Kamida 8 harf/raqam"),p(!1);return}c(!0);try{(await(await fetch(`http://localhost:3000/users/check-username/${C}`,{headers:{Authorization:`Bearer ${f}`}})).json()).available?(s(""),p(!0)):(s("Bu username band!"),p(!1))}catch{s("Xatolik")}finally{c(!1)}},500);return()=>clearTimeout(k)},[r.username,f]);const S=g=>{o(k=>({...k,interests:k.interests.includes(g)?k.interests.filter(C=>C!==g):[...k.interests,g]}))},m=g=>{o(k=>({...k,goals:k.goals.includes(g)?k.goals.filter(C=>C!==g):[...k.goals,g]}))},b=async()=>{if(!r.username)return be.error("Username kiriting");if(!r.gender)return be.error("Jinsingizni tanlang");if(!r.age)return be.error("Yoshingizni kiriting");try{const g=await fetch("http://localhost:3000/users/complete-onboarding",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify(r)});if(!g.ok){const C=await g.json();throw new Error(C.message||"Xatolik yuz berdi")}const k=await g.json();console.log(k),h(k),be.success("Muvaffaqiyatli! Platformaga xush kelibsiz. 🚀")}catch(g){const k=Array.isArray(g.message)?g.message[0]:g.message;be.error(k||"Xatolik yuz berdi. Qaytadan urinib ko'ring.")}},w=()=>{if(e===5){if(!r.username||!d||!r.gender||!r.age)return!1;const g=Number(r.age);if(isNaN(g)||g<4||g>100)return!1}return!(e===2&&r.interests.length===0||e===3&&r.goals.length===0||e===4&&!r.level)},j=()=>{if(!w()&&e>1){let g="Maydonlarni to'ldiring";if(e===5){const k=Number(r.age);r.username?d?r.gender?r.age?(k<4||k>100)&&(g="Yosh 4 va 100 oralig'ida bo'lishi kerak"):g="Yoshingizni kiriting":g="Jinsingizni tanlang":g="Yaroqli username tanlang":g="Username kiriting"}else e===2?g="Kamida bitta qiziqish tanlang":e===3?g="Kamida bitta maqsad tanlang":e===4&&(g="Bilim darajangizni tanlang");return be.error(g)}e<x?t(g=>g+1):b()},v=()=>e>1&&t(g=>g-1),y=()=>{switch(e){case 1:return n.jsxs(qa,{children:[n.jsx(Ha,{children:n.jsx(x4,{size:40})}),n.jsx(Ua,{children:"Xush Kelibsiz!"}),n.jsxs(Ya,{children:["Platformamizga xush kelibsiz! Bu yerda siz o'z bilimlaringizni sinovdan o'tkazishingiz, boshqalar bilan bellashishingiz va qiziqarli muloqot qilishingiz mumkin.",n.jsx("br",{}),n.jsx("br",{}),"Tajribangizni mukammal darajada shaxsiylashtirish uchun bizga bir oz yordam berasizmi?"]})]});case 2:return n.jsxs(qa,{children:[n.jsx(Ha,{children:n.jsx(g4,{size:40})}),n.jsx(Ua,{children:"Qiziqishlaringiz?"}),n.jsx(Ya,{children:"Sizni qaysi yo'nalishlar ko'proq qiziqtiradi? (Bir nechta tanlash mumkin)"}),n.jsx(Xh,{children:dH.map(g=>n.jsxs(Zh,{$active:r.interests.includes(g.id),onClick:()=>S(g.id),children:[g.icon,n.jsx(ef,{children:g.label})]},g.id))})]});case 3:return n.jsxs(qa,{children:[n.jsx(Ha,{children:n.jsx(r4,{size:40})}),n.jsx(Ua,{children:"Asosiy Maqsadlar?"}),n.jsx(Ya,{children:"Platformadan qaysi maqsadda foydalanmoqchisiz?"}),n.jsx(Xh,{children:uH.map(g=>n.jsxs(Zh,{$active:r.goals.includes(g.id),onClick:()=>m(g.id),children:[g.icon,n.jsx(ef,{children:g.label})]},g.id))})]});case 4:return n.jsxs(qa,{children:[n.jsx(Ha,{children:n.jsx(rn,{size:40})}),n.jsx(Ua,{children:"Bilim Darajangiz?"}),n.jsx(Ya,{children:"Hozirgi bilim darajangizni qanday baholaysiz?"}),n.jsx(Xh,{children:pH.map(g=>n.jsxs(Zh,{$active:r.level===g.id,onClick:()=>o({...r,level:g.id}),children:[g.icon,n.jsx(ef,{children:g.label})]},g.id))})]});case 5:return n.jsxs(qa,{children:[n.jsx(Ha,{children:n.jsx(Si,{size:40})}),n.jsx(Ua,{children:"Shaxsiy ma'lumotlar"}),n.jsx(Ya,{children:"Profilingizni to'ldiring"}),n.jsxs("div",{style:{width:"100%",maxWidth:"360px",display:"flex",flexDirection:"column",gap:"16px"},children:[n.jsxs("div",{style:{position:"relative"},children:[n.jsx(k3,{size:16,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#72767d"}}),n.jsx("input",{type:"text",placeholder:"Username",value:r.username,onChange:g=>o({...r,username:g.target.value.toLowerCase()}),style:{width:"100%",padding:"12px 12px 12px 40px",background:"#202225",border:i?"1px solid #f04747":d?"1px solid #43b581":"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",outline:"none",transition:"border-color 0.2s"}}),a&&n.jsx(Zu,{size:16,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#b9bbbe",animation:"spin 1s linear infinite"}}),!a&&d&&r.username&&n.jsx(rn,{size:16,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#43b581"}})]}),i&&n.jsxs("div",{style:{color:"#f04747",fontSize:"12px",marginTop:"-12px",display:"flex",alignItems:"center",gap:"4px"},children:[n.jsx(Xu,{size:12})," ",i]}),n.jsxs("div",{style:{display:"flex",gap:"10px"},children:[n.jsx("button",{type:"button",onClick:()=>o({...r,gender:"male"}),style:{flex:1,padding:"12px",background:r.gender==="male"?"rgba(88, 101, 242, 0.1)":"#202225",border:`2px solid ${r.gender==="male"?"#5865f2":"transparent"}`,borderRadius:"12px",color:r.gender==="male"?"white":"#72767d",cursor:"pointer"},children:"Erkak"}),n.jsx("button",{type:"button",onClick:()=>o({...r,gender:"female"}),style:{flex:1,padding:"12px",background:r.gender==="female"?"rgba(88, 101, 242, 0.1)":"#202225",border:`2px solid ${r.gender==="female"?"#5865f2":"transparent"}`,borderRadius:"12px",color:r.gender==="female"?"white":"#72767d",cursor:"pointer"},children:"Ayol"})]}),n.jsxs("div",{style:{position:"relative"},children:[n.jsx(Hl,{size:16,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#72767d"}}),n.jsx("input",{type:"number",placeholder:"Yoshingiz",value:r.age,onChange:g=>o({...r,age:g.target.value}),style:{width:"100%",padding:"12px 12px 12px 40px",background:"#202225",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",outline:"none"}})]})]})]});default:return null}};return n.jsx(iH,{children:n.jsxs(sH,{children:[n.jsx(aH,{children:[1,2,3,4,5].map(g=>n.jsx(lH,{$progress:e>=g?100:0},g))}),y(),n.jsxs(cH,{children:[n.jsxs(x2,{onClick:v,disabled:e===1,children:[n.jsx(z3,{size:18})," Orqaga"]}),n.jsxs(x2,{$primary:!0,onClick:j,children:[e===x?"Boshlash":"Keyingisi"," ",n.jsx(mn,{size:18})]})]})]})})},fH=l.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`,xH=l.div`
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
`,g2=l.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,gH=({initialNav:e="home",initialChannel:t=0,initialLesson:r})=>{const{chats:o,createChat:i,selectedNav:s,setSelectedNav:a,selectedChannel:c,setSelectedChannel:d}=Wo(),p=Qt(),[h,f]=u.useState(window.innerWidth<=768),[x,S]=u.useState(!1),[m,b]=u.useState(null),[w,j]=u.useState("courses"),[v,y]=u.useState(null),[g,k]=u.useState(!1),[C,_]=u.useState(!1),z=Ie(V=>V.user);u.useEffect(()=>{const V=()=>f(window.innerWidth<=768);return window.addEventListener("resize",V),()=>window.removeEventListener("resize",V)},[]),u.useEffect(()=>{if(t!==void 0&&t!==c&&d(t),e==="a"||e==="chats")s!=="chats"&&a("chats");else if(e==="users"||e==="groups")s!==e&&a(e);else if(e==="arena"){a("arena"),j("arena");const V=window.location.pathname,R={quiz:"tests",test:"tests",flashcard:"flashcards",falshcard:"flashcards",flashcards:"flashcards","sentence-builder":"sentenceBuilders","sentence-builders":"sentenceBuilders",sentences:"sentenceBuilders",gap:"sentenceBuilders","gap-tuzish":"sentenceBuilders",battle:"battles",battles:"battles"};let M=null;V.includes("/arena/quiz-link")||V.includes("/arena/quiz")?M="tests":V.includes("/arena/flashcard")?M="flashcards":V.includes("/arena/sentence-builder")?M="sentenceBuilders":V.includes("/arena/battle")?M="battles":M=R[t]||t,M&&["tests","flashcards","sentenceBuilders","battles"].includes(M)?y(M):V==="/arena"&&y(null)}else e!==s&&(a(e),e==="courses"&&j("courses"));(e==="courses"||e==="arena")&&(t&&t!=="0"&&e!=="arena"?b(t):e==="courses"&&(!t||t==="0")&&b(null))},[e,t,o]);const D=V=>{a(V),d(0),V==="arena"?(j("arena"),y(null)):V==="courses"&&j("courses"),p(`/${V}`)},B=async V=>{try{const R=await i({isGroup:!0,name:V.name,description:V.description,avatar:V.image,memberIds:V.members});S(!1);const M=(R==null?void 0:R.urlSlug)||(R==null?void 0:R.jammId)||(R==null?void 0:R._id)||(R==null?void 0:R.id);M&&p(`/a/${M}`)}catch(R){console.error("Failed to create group",R),R.message.includes("Premium")||R.message.includes("maksimal")?k(!0):Xe.error(R.message)}};return n.jsxs(fH,{children:[n.jsx(DE,{selectedNav:s,onSelectNav:D}),n.jsx(xH,{children:s==="courses"||s==="arena"||s==="home"?n.jsxs(n.Fragment,{children:[n.jsx(nO,{onSelectCourse:b,onOpenPremium:()=>setIsPremiumOpen(!0),viewMode:s==="arena"?"arena":w,onToggleViewMode:j,selectedCourse:m,activeArenaTab:v,setActiveArenaTab:y}),s==="arena"||s==="home"||w==="arena"?n.jsx("div",{style:{flex:1,overflowY:"auto"},children:n.jsx(EN,{activeTab:v,initialId:e==="arena"&&t&&!["tests","flashcards","sentenceBuilders","battles","quiz","quiz-link","flashcard","sentence-builder","battle","0"].includes(t)?t:r,onBack:()=>{y(null),p("/arena")}})}):n.jsx(TL,{courseId:m,initialLessonSlug:r,onClose:()=>{b(null),p("/courses")}})]}):s==="profile"?n.jsx(eI,{profileUserId:t&&t!==0&&t!=="0"?String(t):null}):s==="blogs"?n.jsxs(n.Fragment,{children:[!h||!c||c==="0"?n.jsx(QR,{selectedChannel:c}):null,n.jsx(g2,{children:n.jsx(Aq,{blogIdentifier:c,onBack:()=>{d(0),p("/blogs")}})})]}):s==="feed"?n.jsx(kq,{}):n.jsxs(n.Fragment,{children:[!h||!c||c==="0"?n.jsx(lP,{selectedChannel:c,selectedNav:s,chats:o,onOpenCreateGroup:()=>S(!0),onOpenCreateMeet:()=>_(!0)}):null,n.jsx(g2,{children:c&&c!=="0"?n.jsx(mA,{selectedChannel:c,selectedNav:s,chats:o,navigate:p,onBack:()=>{d(0),p(`/${s}`)}}):n.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#8e9297"},children:s==="meets"?"Meet tanlang":"Suhbatni tanlang"})})]})}),n.jsx(OA,{isOpen:x,onClose:()=>S(!1),onCreate:B,users:o.filter(V=>V.type==="user"&&!V.isSavedMessages).map(V=>{var M;const R=(M=V.members)==null?void 0:M.find(A=>(A._id||A.id)!==((z==null?void 0:z._id)||(z==null?void 0:z.id)));return{...R,id:(R==null?void 0:R._id)||(R==null?void 0:R.id),name:(R==null?void 0:R.nickname)||(R==null?void 0:R.username)||"Noma'lum"}}).filter(V=>V.id)}),n.jsx(xp,{isOpen:g,onClose:()=>k(!1),onUpgrade:()=>{k(!1),sessionStorage.setItem("profile_initial_tab","premium"),a("profile"),d(0),p("/profile")}}),n.jsx(nH,{isOpen:C,onClose:()=>_(!1),onCreateCall:async({title:V,isPrivate:R})=>{if(z){const A=z.premiumStatus==="active",T=(await zu()).filter(P=>{var q;return P.creator===(z==null?void 0:z._id)||((q=P.creator)==null?void 0:q._id)===(z==null?void 0:z._id)}),F=A?3:1;if(T.length>=F){_(!1),k(!0);return}}const M=V.toLowerCase().replace(/\s+/g,"-")+"-"+Date.now().toString().slice(-4);await TS({roomId:M,title:V,isPrivate:R,isCreator:!0}),p(`/join/${M}`)}}),z&&!z.isOnboardingCompleted&&n.jsx(hH,{})]})},mH=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dcddde;
  text-align: center;
  padding: 40px;
`,yH=l.div`
  width: 120px;
  height: 120px;
  background-color: #7289da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`,vH=l.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
`,bH=l.p`
  font-size: 16px;
  color: #b9bbbe;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`,wH=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 800px;
  width: 100%;
  margin-top: 40px;
`,Va=l.div`
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
`,pd=l(_j)`
  text-decoration: none;
  color: inherit;
`,Wa=l.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Ga=l.p`
  color: #b9bbbe;
  line-height: 1.5;
`,kH=()=>n.jsxs(mH,{children:[n.jsx(yH,{children:n.jsx(Hl,{size:60,color:"white"})}),n.jsx(vH,{children:"Welcome to Jamm"}),n.jsx(bH,{children:"This is a modern communication platform built with React, Vite, and styled-components. Experience real-time chat, voice channels, and a beautiful interface."}),n.jsxs(wH,{children:[n.jsx(pd,{to:"/home",children:n.jsxs(Va,{children:[n.jsxs(Wa,{children:[n.jsx(ms,{size:20}),"All Chats"]}),n.jsx(Ga,{children:"View and manage all your conversations in one place. Switch between different chats and stay connected."})]})}),n.jsx(pd,{to:"/users",children:n.jsxs(Va,{children:[n.jsxs(Wa,{children:[n.jsx(No,{size:20}),"Direct Messages"]}),n.jsx(Ga,{children:"Start one-on-one conversations with friends and colleagues. Private and secure messaging."})]})}),n.jsx(pd,{to:"/groups",children:n.jsxs(Va,{children:[n.jsxs(Wa,{children:[n.jsx(r$,{size:20}),"Group Chats"]}),n.jsx(Ga,{children:"Create and join group conversations with multiple participants. Perfect for teams and communities."})]})}),n.jsxs(Va,{children:[n.jsxs(Wa,{children:[n.jsx(Hl,{size:20}),"Modern UI"]}),n.jsx(Ga,{children:"Beautiful, responsive interface that works on all devices. Smooth animations and intuitive user experience."})]}),n.jsx(pd,{to:"/courses",children:n.jsxs(Va,{children:[n.jsxs(Wa,{children:[n.jsx(Ss,{size:20}),"Courses"]}),n.jsx(Ga,{children:"Watch video lessons, track your progress, and learn new skills. YouTube-like player with organized playlists."})]})})]})]}),dC=et`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,tf=et`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;et`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;const jH=l.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1b2e 0%, #16171d 50%, #0d0e14 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`,rf=l.div`
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
    animation: ${tf} 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: #eb459e;
    bottom: -50px;
    left: -50px;
    animation: ${tf} 10s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: #57f287;
    top: 50%;
    left: 50%;
    animation: ${tf} 12s ease-in-out infinite;
  }
`,SH=l.div`
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
  animation: ${dC} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 420px;
    flex-direction: column;
  }
`,CH=l.div`
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
`,zH=l.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
`,$H=l.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`,_H=l.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`,Qa=l.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`,Ka=l.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Ja=l.span`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`,TH=l.div`
  flex: 1;
  padding: 40px;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`,EH=l.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`,RH=l.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5865f2, #7b6cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.35);
`,PH=l.h1`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #b9bbbe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`,MH=l.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
`,IH=l.p`
  font-size: 14px;
  color: #b9bbbe;
  text-align: center;
  margin-bottom: 24px;
`,AH=l.div`
  display: flex;
  background: rgba(32, 34, 37, 0.7);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
`,m2=l.button`
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
`,OH=l.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,nf=l.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,of=l.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b9bbbe;
`,sf=l.div`
  position: relative;
  display: flex;
  align-items: center;
`,bl=l.div`
  position: absolute;
  left: 14px;
  color: #72767d;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
`,af=l.input`
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

  &:focus ~ ${bl}, &:focus + ${bl} {
    color: #5865f2;
  }
`,LH=l.button`
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
`,BH=l.button`
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
`,DH=l.div`
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
`,FH=l.button`
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
`,NH=()=>n.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[n.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",fill:"#4285F4"}),n.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),n.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),n.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),qH=l.p`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #72767d;
`,y2=l.button`
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
`,HH=l.div`
  background: rgba(240, 71, 71, 0.12);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #f04747;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`,UH=l.div`
  background: rgba(67, 181, 129, 0.12);
  border: 1px solid rgba(67, 181, 129, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #43b581;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;l.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;const YH=l.div`
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
  animation: ${dC} 0.3s ease-out;
`,VH=l.div`
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
`,WH=l.div`
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
`,GH=l.div`
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
`,QH=l.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 11px;
`,v2=l.button`
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #5865f2;
    text-decoration: underline;
  }
`,KH=()=>{const e=Qt(),t=Ie(z=>z.setAuth),[r,o]=u.useState("login"),[i,s]=u.useState(!1),[a,c]=u.useState(null),[d,p]=u.useState(""),[h,f]=u.useState(""),[x,S]=u.useState(""),[m,b]=u.useState(!1),[w,j]=u.useState(""),[v,y]=u.useState(""),g="http://localhost:3000";Qe.useEffect(()=>{const D=new URLSearchParams(window.location.search).get("verify_token");D&&k(D)},[]);const k=async z=>{b(!0),j("");try{const D=await fetch(`${g}/auth/verify/${z}`),B=await D.json();if(!D.ok)throw new Error(B.message||"Tasdiqlashda xatolik yuz berdi");t(B.user,B.access_token),e("/")}catch(D){j(D.message)}finally{b(!1)}},C=async z=>{z.preventDefault(),j(""),y(""),b(!0);try{const D=r==="login"?"/auth/login":"/auth/signup",B=r==="login"?{email:d,password:h}:{email:d,password:h,nickname:x},V=await fetch(`${g}${D}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(B)}),R=await V.json();if(!V.ok)throw new Error(R.message||"Xatolik yuz berdi");r==="signup"?(y(R.message),p(""),f(""),S("")):(t(R.user,R.access_token),e("/"))}catch(D){j(D.message)}finally{b(!1)}},_=()=>{toast.error("Google Auth hali ulanmagan. Email/parol bilan kiring.")};return n.jsxs(jH,{children:[n.jsx(rf,{}),n.jsx(rf,{}),n.jsx(rf,{}),n.jsxs(SH,{children:[n.jsxs(CH,{children:[n.jsx(zH,{children:"Jamm platformasiga xush kelibsiz!"}),n.jsx($H,{children:"Zamonaviy muloqot va ta'lim platformasi. Do'stlaringiz bilan bog'laning va yangi bilimlar oling."}),n.jsxs(_H,{children:[n.jsxs(Qa,{children:[n.jsx(Ka,{children:n.jsx(ms,{size:18,color:"white"})}),n.jsx(Ja,{children:"Real-time chat va guruhlar"})]}),n.jsxs(Qa,{children:[n.jsx(Ka,{children:n.jsx(Ss,{size:18,color:"white"})}),n.jsx(Ja,{children:"Video kurslar va darsliklar"})]}),n.jsxs(Qa,{children:[n.jsx(Ka,{children:n.jsx(ku,{size:18,color:"white"})}),n.jsx(Ja,{children:"Bilimlar bellashuvi (Arena)"})]}),n.jsxs(Qa,{children:[n.jsx(Ka,{children:n.jsx(op,{size:18,color:"white"})}),n.jsx(Ja,{children:"Tez va qulay interfeys"})]}),n.jsxs(Qa,{children:[n.jsx(Ka,{children:n.jsx(Vs,{size:18,color:"white"})}),n.jsx(Ja,{children:"Xavfsiz va himoyalangan"})]})]})]}),n.jsxs(TH,{children:[n.jsxs(EH,{children:[n.jsx(RH,{children:n.jsx(Hl,{size:26,color:"white"})}),n.jsx(PH,{children:"Jamm"})]}),n.jsx(MH,{children:r==="login"?"Qaytib kelganingizdan xursandmiz!":"Akkaunt yarating"}),n.jsx(IH,{children:r==="login"?"Hisobingizga kirish uchun ma'lumotlaringizni kiriting":"Ro'yxatdan o'tib, platformaga qo'shiling"}),n.jsxs(AH,{children:[n.jsx(m2,{$active:r==="login",onClick:()=>o("login"),children:"Kirish"}),n.jsx(m2,{$active:r==="signup",onClick:()=>o("signup"),children:"Ro'yxatdan o'tish"})]}),n.jsxs(OH,{onSubmit:C,children:[r==="signup"&&n.jsxs(nf,{children:[n.jsx(of,{children:"Nik (Laqab)"}),n.jsxs(sf,{children:[n.jsx(af,{type:"text",placeholder:"Nikingiz",value:x,onChange:z=>S(z.target.value),required:r==="signup"}),n.jsx(bl,{children:n.jsx(Si,{size:16})})]})]}),n.jsxs(nf,{children:[n.jsx(of,{children:"Email"}),n.jsxs(sf,{children:[n.jsx(af,{type:"email",placeholder:"email@example.com",value:d,onChange:z=>p(z.target.value),required:!0}),n.jsx(bl,{children:n.jsx(D3,{size:16})})]})]}),n.jsxs(nf,{children:[n.jsx(of,{children:"Parol"}),n.jsxs(sf,{children:[n.jsx(af,{type:i?"text":"password",placeholder:"••••••••",value:h,onChange:z=>f(z.target.value),required:!0}),n.jsx(bl,{children:n.jsx(Fo,{size:16})}),n.jsx(LH,{type:"button",onClick:()=>s(!i),children:i?n.jsx(a4,{size:16}):n.jsx(_n,{size:16})})]})]}),v&&n.jsx(UH,{children:v}),w&&n.jsx(HH,{children:w}),n.jsxs(BH,{type:"submit",disabled:m,children:[m?"Yuklanmoqda...":r==="login"?"Kirish":"Ro'yxatdan o'tish",!m&&n.jsx(w3,{size:18})]})]}),n.jsx(DH,{children:n.jsx("span",{children:"yoki"})}),n.jsxs(FH,{onClick:_,children:[n.jsx(NH,{}),"Google orqali ",r==="login"?"kirish":"ro'yxatdan o'tish"]}),n.jsx(qH,{children:r==="login"?n.jsxs(n.Fragment,{children:["Hisobingiz yo'qmi?"," ",n.jsx(y2,{type:"button",onClick:()=>o("signup"),children:"Ro'yxatdan o'ting"})]}):n.jsxs(n.Fragment,{children:["Hisobingiz bormi?"," ",n.jsx(y2,{type:"button",onClick:()=>o("login"),children:"Kirish"})]})}),n.jsxs(QH,{children:[n.jsx(v2,{type:"button",onClick:()=>c("privacy"),children:"Maxfiylik siyosati"}),n.jsx(v2,{type:"button",onClick:()=>c("terms"),children:"Foydalanish shartlari"})]})]})]}),a&&n.jsx(YH,{onClick:()=>c(null),children:n.jsxs(VH,{onClick:z=>z.stopPropagation(),children:[n.jsxs(WH,{children:[n.jsx("h3",{children:a==="privacy"?"Maxfiylik Siyosati":"Foydalanish Shartlari"}),n.jsx("button",{onClick:()=>c(null),style:{background:"none",border:"none",color:"#72767d",cursor:"pointer"},children:n.jsx(nt,{size:24})})]}),n.jsx(GH,{children:a==="privacy"?n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"Jamm platformasi sizning maxfiyligingizni hurmat qiladi va shaxsiy ma'lumotlaringizni himoya qilishga intiladi."}),n.jsx("h4",{children:"1. To'planadigan ma'lumotlar"}),n.jsx("p",{children:"Biz quyidagi ma'lumotlarni to'playmiz:"}),n.jsxs("ul",{children:[n.jsx("li",{children:"Elektron pochta manzili (hisobga kirish uchun)"}),n.jsx("li",{children:"Username va Nik (platformada ko'rinish uchun)"}),n.jsx("li",{children:"Telefon raqami (xavfsizlik va aloqa uchun)"}),n.jsx("li",{children:"Akkaunt rasmi (ixtiyoriy, profilingizni shaxsiylashtirish uchun)"})]}),n.jsx("h4",{children:"2. Ma'lumotlardan foydalanish"}),n.jsx("p",{children:"Sizning ma'lumotlaringiz platformaning to'liq ishlashini ta'minlash, siz bilan bog'lanish va xavfsizlikni ta'minlash maqsadida ishlatiladi."}),n.jsx("h4",{children:"3. Ma'lumotlarni saqlash"}),n.jsx("p",{children:"Barcha ma'lumotlar himoyalangan serverlarda saqlanadi va uchinchi shaxslarga sotilmaydi yoki ixtiyoriy ravishda berilmaydi."}),n.jsx("h4",{children:"4. Xavfsizlik"}),n.jsx("p",{children:"Biz zamonaviy shifrlash usullari va xavfsizlik protokollaridan foydalanamiz. Biroq, parolingizni hech kimga bermaslikni tavsiya qilamiz."})]}):n.jsxs(n.Fragment,{children:[n.jsx("p",{children:"Ushbu shartlar Jamm platformasidan foydalanish qoidalarini belgilaydi. Platformadan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz."}),n.jsx("h4",{children:"1. Foydalanish qoidalari"}),n.jsxs("ul",{children:[n.jsx("li",{children:"Boshqa foydalanuvchilarni haqorat qilmaslik"}),n.jsx("li",{children:"Spam yoki noqonuniy kontent tarqatmaslik"}),n.jsx("li",{children:"Platforma xavfsizligiga zarar yetkazuvchi harakatlar qilmaslik"}),n.jsx("li",{children:"Bellashuvlarda (Arena) halol o'ynash"})]}),n.jsx("h4",{children:"2. Mualliflik huquqi"}),n.jsx("p",{children:"Platformadagi barcha kontent (kurslar, savollar, kodlar) mualliflik huquqi bilan himoyalangan. Ularni ruxsatsiz ko'chirish taqiqlanadi."}),n.jsx("h4",{children:"3. Mas'uliyat"}),n.jsx("p",{children:"Foydalanuvchi o'z hisobi va u orqali amalga oshirilgan barcha harakatlar uchun shaxsan mas'uldir."}),n.jsx("h4",{children:"4. Hisobni o'chirish"}),n.jsx("p",{children:"Biz qoidalarni buzgan foydalanuvchilar hisobini ogohlantirishsiz to'xtatish yoki o'chirish huquqiga egamiz."})]})})]})})]})},ai=M4(e=>({activeCall:null,isMinimized:!1,startCall:t=>e({activeCall:t,isMinimized:!1}),minimizeCall:()=>e({isMinimized:!0}),maximizeCall:()=>e({isMinimized:!1}),endCall:()=>e({activeCall:null,isMinimized:!1})})),JH=et`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,XH=et`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,lf=l.div`
  min-height: 100vh;
  width: 100%;
  background: #0b0d0f;
  display: flex;
  align-items: center;
  justify-content: center;
`,cf=l.div`
  background: rgba(32, 34, 37, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 44px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${JH} 0.3s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`,ZH=l.div`
  font-size: 40px;
  margin-bottom: 12px;
`,eU=l.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
`,tU=l.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
`,rU=l.code`
  display: block;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  color: #7289da;
  font-size: 13px;
  margin-bottom: 24px;
  word-break: break-all;
`,nU=l.input`
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
`,oU=l.button`
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
`,iU=l.p`
  color: #f04747;
  font-size: 13px;
  margin: 8px 0 0;
`,b2=l(Ii)`
  animation: ${XH} 1.2s linear infinite;
`,sU=l.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`,w2=l.button`
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
`,k2=l.span`
  display: block;
  font-size: 10px;
  margin-top: 4px;
  color: ${e=>e.$active?"#b9bbbe":"#f04747"};
`,aU=()=>{const{roomId:e}=Qg(),[t,r]=u.useState("checking"),[o,i]=u.useState(null),[s,a]=u.useState(""),[c,d]=u.useState(""),[p,h]=u.useState(!1),[f,x]=u.useState(!1),[S,m]=u.useState(!1);Qt();const b=Ie(y=>y.user),w=ai(y=>y.startCall),j=ai(y=>y.activeCall);u.useEffect(()=>{let y=!0;return(async()=>{var C;const k=await QE(e);if(y)if(k){i(k);const _=(b==null?void 0:b._id)||(b==null?void 0:b.id),z=typeof k.creator=="object"&&((C=k.creator)==null?void 0:C._id)||k.creator,D=String(z)===String(_);m(D),D?(a((b==null?void 0:b.nickname)||(b==null?void 0:b.username)||"Host"),r("call")):(a((b==null?void 0:b.nickname)||(b==null?void 0:b.username)||""),r("form"))}else a((b==null?void 0:b.nickname)||(b==null?void 0:b.username)||""),r("form")})(),()=>{y=!1}},[e,b]);const v=async()=>{if(!s.trim()){d("Iltimos ismingizni kiriting");return}await TS({roomId:e,title:(o==null?void 0:o.title)||"Meet",isPrivate:(o==null?void 0:o.isPrivate)||!1,isCreator:!1}),r("call")};return u.useEffect(()=>{if(t!=="call"||!e)return;const y=sessionStorage.getItem("meet_return_path")||"/chats";w({roomId:e,chatTitle:(o==null?void 0:o.title)||"Meet",isCreator:S,isPrivate:(o==null?void 0:o.isPrivate)||!1,initialMicOn:p,initialCamOn:f,returnPath:y})},[t,e,o==null?void 0:o.title,o==null?void 0:o.isPrivate,S,p,f,w]),t==="checking"?n.jsx(lf,{children:n.jsx(cf,{children:n.jsx(b2,{size:32,color:"#7289da"})})}):t==="call"?n.jsx(lf,{children:!j&&n.jsx(cf,{children:n.jsx(b2,{size:32,color:"#7289da"})})}):n.jsx(lf,{children:n.jsxs(cf,{children:[n.jsx(ZH,{children:"📹"}),n.jsx(eU,{children:"Video Callga qo'shilish"}),n.jsx(tU,{children:"Siz quyidagi callga taklif qilindingiz:"}),n.jsx(rU,{children:e}),n.jsx(nU,{autoFocus:!0,value:s,onChange:y=>a(y.target.value),placeholder:"Ismingizni kiriting",onKeyDown:y=>y.key==="Enter"&&v()}),n.jsxs(sU,{children:[n.jsxs("div",{style:{textAlign:"center"},children:[n.jsx(w2,{$active:p,onClick:()=>h(y=>!y),children:p?n.jsx(uo,{size:22}):n.jsx(si,{size:22})}),n.jsx(k2,{$active:p,children:p?"Yoniq":"O'chiq"})]}),n.jsxs("div",{style:{textAlign:"center"},children:[n.jsx(w2,{$active:f,onClick:()=>x(y=>!y),children:f?n.jsx(Lr,{size:22}):n.jsx(fo,{size:22})}),n.jsx(k2,{$active:f,children:f?"Yoniq":"O'chiq"})]})]}),c&&n.jsx(iU,{children:c}),n.jsx(oU,{onClick:v,children:"🎥 Callga kirish"})]})})},lU=l.div`
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
`,cU=l.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,dU=l.div`
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
`,uU=l.div`
  text-align: center;
`,pU=l.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,hU=l.div`
  color: #43b581;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,fU=l.div`
  display: flex;
  gap: 16px;
`,j2=l.button`
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
`,xU=({isOpen:e,onAccept:t,onReject:r,caller:o})=>{var d;const[i,s]=u.useState(0),a=u.useRef(null);u.useEffect(()=>{if(e){Wy(),a.current=setInterval(()=>{Wy()},2e3);const p=setInterval(()=>{s(h=>h+1)},1e3);return()=>{p&&clearInterval(p),a.current&&(clearInterval(a.current),a.current=null)}}},[e]);const c=p=>{const h=Math.floor(p/60),f=p%60;return`${h.toString().padStart(2,"0")}:${f.toString().padStart(2,"0")}`};return e?n.jsx(lU,{children:n.jsxs(cU,{children:[n.jsx(dU,{children:((d=o==null?void 0:o.name)==null?void 0:d[0])||"U"}),n.jsxs(uU,{children:[n.jsx(pU,{children:(o==null?void 0:o.name)||"Unknown"}),n.jsxs(hU,{children:[n.jsx(Pi,{size:16}),c(i)]})]}),n.jsxs(fU,{children:[n.jsx(j2,{variant:"accept",onClick:t,children:n.jsx(f4,{size:24})}),n.jsx(j2,{onClick:r,children:n.jsx(rp,{size:24})})]})]})}):null},gU="http://localhost:3000",mU={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"}]};function uC({roomId:e,displayName:t,enabled:r,isCreator:o=!1,isPrivate:i=!1,chatTitle:s="",initialMicOn:a=!0,initialCamOn:c=!0}){const d=u.useRef(null),p=u.useRef(null),h=u.useRef({}),[f,x]=u.useState(null),[S,m]=u.useState([]),[b,w]=u.useState(null),[j,v]=u.useState([]),[y,g]=u.useState(!1),[k,C]=u.useState([]),[_,z]=u.useState(a),[D,B]=u.useState(c),[V,R]=u.useState(!1),[M,A]=u.useState(!1),[O,T]=u.useState(!1),[F,P]=u.useState(new Set),[q,$]=u.useState("idle"),[E,I]=u.useState(null),[N,J]=u.useState(s||""),[Y,L]=u.useState(!1),H=u.useRef(null),Q=u.useRef({}),ie=u.useRef({}),G=u.useRef({}),le=u.useCallback((oe,xe,we)=>{m(X=>X.find(ee=>ee.peerId===oe)?X.map(ee=>ee.peerId===oe?{...ee,stream:xe}:ee):[...X,{peerId:oe,stream:xe,displayName:we||oe}])},[]),ue=u.useCallback(oe=>{m(xe=>xe.filter(we=>we.peerId!==oe)),v(xe=>xe.filter(we=>we.peerId!==oe)),delete ie.current[oe],h.current[oe]&&(h.current[oe].close(),delete h.current[oe])},[]),me=u.useCallback((oe,xe)=>{const we=new RTCPeerConnection(mU);return p.current&&p.current.getTracks().forEach(X=>we.addTrack(X,p.current)),H.current&&H.current.getTracks().forEach(X=>we.addTrack(X,H.current)),we.ontrack=X=>{const[ee]=X.streams;if(!ee)return;const ye=ie.current[oe];ye?ye===ee.id?le(oe,ee,xe):v(ke=>ke.find(he=>he.peerId===oe)?ke.map(he=>he.peerId===oe?{...he,stream:ee}:he):[...ke,{peerId:oe,stream:ee,displayName:xe}]):(ie.current[oe]=ee.id,le(oe,ee,xe))},we.onicecandidate=X=>{X.candidate&&d.current&&d.current.emit("ice-candidate",{targetId:oe,candidate:X.candidate})},we.onconnectionstatechange=()=>{["failed","disconnected"].includes(we.connectionState)&&ue(oe)},h.current[oe]=we,we},[le,ue]),W=u.useCallback(oe=>{oe.on("offer",async({senderId:xe,sdp:we})=>{let X=h.current[xe];X||(X=me(xe,xe)),await X.setRemoteDescription(new RTCSessionDescription(we));const ee=G.current[xe]||[];for(;ee.length>0;){const ke=ee.shift();await X.addIceCandidate(new RTCIceCandidate(ke)).catch(()=>{})}const ye=await X.createAnswer();await X.setLocalDescription(ye),oe.emit("answer",{targetId:xe,sdp:ye})}),oe.on("answer",async({senderId:xe,sdp:we})=>{const X=h.current[xe];if(X){await X.setRemoteDescription(new RTCSessionDescription(we));const ee=G.current[xe]||[];for(;ee.length>0;){const ye=ee.shift();await X.addIceCandidate(new RTCIceCandidate(ye)).catch(()=>{})}}}),oe.on("ice-candidate",async({senderId:xe,candidate:we})=>{const X=h.current[xe];if(X&&X.remoteDescription&&X.remoteDescription.type)try{await X.addIceCandidate(new RTCIceCandidate(we))}catch{}else G.current[xe]||(G.current[xe]=[]),G.current[xe].push(we)}),oe.on("peer-joined",async({peerId:xe,displayName:we})=>{const X=me(xe,we),ee=await X.createOffer();await X.setLocalDescription(ee),oe.emit("offer",{targetId:xe,sdp:ee})}),oe.on("existing-peers",({peers:xe})=>{$("joined")}),oe.on("peer-left",({peerId:xe})=>{ue(xe)})},[me,ue]);u.useEffect(()=>{if(!r||!e)return;let oe=!0;return(async()=>{$("connecting"),I(null);try{const we=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});if(!oe){we.getTracks().forEach(he=>he.stop());return}p.current=we,x(we);const X=we.getAudioTracks()[0];X&&(X.enabled=a);const ee=we.getVideoTracks()[0];ee&&(ee.enabled=c);const ye=Ie.getState().token,ke=Oo(`${gU}/video`,{transports:["websocket"],auth:{token:ye}});if(d.current=ke,W(ke),o&&ke.on("knock-request",({peerId:he,displayName:Ee})=>{C(He=>[...He,{peerId:he,displayName:Ee}])}),o||(ke.on("waiting-for-approval",()=>{$("waiting")}),ke.on("knock-approved",({mediaLocked:he})=>{var Ee,He;if($("joined"),he){R(!0),A(!0);const ct=(Ee=p.current)==null?void 0:Ee.getAudioTracks()[0];ct&&(ct.enabled=!1,z(!1));const tt=(He=p.current)==null?void 0:He.getVideoTracks()[0];tt&&(tt.enabled=!1,B(!1))}}),ke.on("knock-rejected",({reason:he})=>{$("rejected"),I(he||"Rad etildi")})),ke.on("room-info",({title:he})=>{he&&J(he)}),ke.on("screen-share-stopped",({peerId:he})=>{v(Ee=>Ee.filter(He=>He.peerId!==he)),delete ie.current[he]}),ke.on("recording-started",()=>L(!0)),ke.on("recording-stopped",()=>L(!1)),ke.on("kicked",()=>{I("Siz yaratuvchi tomonidan chiqarib yuborildingiz"),$("rejected"),st()}),ke.on("force-mute-mic",()=>{var Ee;const he=(Ee=p.current)==null?void 0:Ee.getAudioTracks()[0];he&&(he.enabled=!1,z(!1)),R(!0)}),ke.on("force-mute-cam",()=>{var Ee;const he=(Ee=p.current)==null?void 0:Ee.getVideoTracks()[0];he&&(he.enabled=!1,B(!1)),A(!0)}),ke.on("allow-mic",()=>R(!1)),ke.on("allow-cam",()=>A(!1)),ke.on("hand-raised",({peerId:he})=>{P(Ee=>new Set([...Ee,he]))}),ke.on("hand-lowered",({peerId:he})=>{P(Ee=>{const He=new Set(Ee);return He.delete(he),He})}),ke.on("error",({message:he})=>{oe&&(he==="Room not found"&&!o||(I(he||"Server xatosi yuz berdi"),$("idle")))}),ke.on("connect_error",he=>{oe&&(I("Serverga ulanib bo'lmadi: "+he.message),$("idle"))}),o)ke.emit("create-room",{roomId:e,displayName:t,isPrivate:i,title:s}),ke.once("room-created",()=>{$("joined")});else{let he=0;const Ee=6,He=()=>{d.current&&d.current.emit("join-room",{roomId:e,displayName:t})},ct=({message:tt})=>{tt==="Room not found"&&oe&&(he<Ee?(he++,console.log(`[useWebRTC] Room not found, retrying join (${he}/${Ee})...`),setTimeout(He,1500)):(I("Xona topilmadi yoki hali boshlanmagan"),$("idle")))};ke.on("error",ct),He()}}catch(we){console.error("[useWebRTC]",we),oe&&(I(we.message||"Kamera/mikrofonga ruxsat berilmadi"),$("idle"))}})(),()=>{oe=!1,Object.values(h.current).forEach(we=>we.close()),h.current={},p.current&&(p.current.getTracks().forEach(we=>we.stop()),p.current=null),x(null),m([]),C([]),d.current&&(d.current.emit("leave-room",{roomId:e}),d.current.disconnect())}},[r,e,t,o,i,W]);const Me=u.useCallback(oe=>{d.current&&(d.current.emit("approve-knock",{roomId:e,peerId:oe}),C(xe=>xe.filter(we=>we.peerId!==oe)))},[e]),De=u.useCallback(oe=>{d.current&&(d.current.emit("reject-knock",{roomId:e,peerId:oe}),C(xe=>xe.filter(we=>we.peerId!==oe)))},[e]),Fe=u.useCallback(()=>{var xe;if(V)return;const oe=(xe=p.current)==null?void 0:xe.getAudioTracks()[0];oe&&(oe.enabled=!oe.enabled,z(oe.enabled))},[V]),ot=u.useCallback(()=>{var xe;if(M)return;const oe=(xe=p.current)==null?void 0:xe.getVideoTracks()[0];oe&&(oe.enabled=!oe.enabled,B(oe.enabled))},[M]),st=u.useCallback(()=>{var oe,xe;try{d.current&&(d.current.emit("leave-room",{roomId:e}),d.current.disconnect()),Object.values(h.current).forEach(we=>we.close()),h.current={},(oe=p.current)==null||oe.getTracks().forEach(we=>we.stop()),p.current=null,(xe=H.current)==null||xe.getTracks().forEach(we=>we.stop()),H.current=null}catch(we){console.error("Error in leaveCall:",we)}finally{x(null),w(null),g(!1),m([]),v([]),$("idle")}},[e]),ze=u.useCallback(async()=>{var oe,xe,we;if(y){(oe=H.current)==null||oe.getTracks().forEach(X=>X.stop()),Object.entries(Q.current).forEach(([X,ee])=>{const ye=h.current[X];if(ye&&ee)try{ye.removeTrack(ee)}catch{}}),Q.current={},H.current=null,w(null),g(!1),d.current&&d.current.emit("screen-share-stopped",{roomId:e});for(const[X,ee]of Object.entries(h.current))try{const ye=await ee.createOffer();await ee.setLocalDescription(ye),(xe=d.current)==null||xe.emit("offer",{targetId:X,sdp:ye})}catch{}return}try{const X=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});H.current=X,w(X),g(!0),X.getVideoTracks()[0].onended=()=>{ze()};for(const[ee,ye]of Object.entries(h.current)){const ke=ye.addTrack(X.getVideoTracks()[0],X);Q.current[ee]=ke}d.current&&d.current.emit("screen-share-started",{roomId:e});for(const[ee,ye]of Object.entries(h.current))try{const ke=await ye.createOffer();await ye.setLocalDescription(ke),(we=d.current)==null||we.emit("offer",{targetId:ee,sdp:ke})}catch{}}catch(X){console.error("Screen share error:",X)}},[y,e]),Oe=u.useCallback(oe=>{d.current&&d.current.emit(oe?"recording-started":"recording-stopped",{roomId:e})},[e]),Re=u.useCallback(oe=>{var xe;(xe=d.current)==null||xe.emit("force-mute-mic",{roomId:e,peerId:oe})},[e]),qe=u.useCallback(oe=>{var xe;(xe=d.current)==null||xe.emit("force-mute-cam",{roomId:e,peerId:oe})},[e]),ae=u.useCallback(oe=>{var xe;(xe=d.current)==null||xe.emit("allow-mic",{roomId:e,peerId:oe})},[e]),Le=u.useCallback(oe=>{var xe;(xe=d.current)==null||xe.emit("allow-cam",{roomId:e,peerId:oe})},[e]),Ge=u.useCallback(oe=>{var xe;(xe=d.current)==null||xe.emit("kick-peer",{roomId:e,peerId:oe})},[e]),at=u.useCallback(()=>{var xe;const oe=!O;T(oe),(xe=d.current)==null||xe.emit(oe?"hand-raised":"hand-lowered",{roomId:e})},[O,e]);return{localStream:f,remoteStreams:S,screenStream:b,remoteScreenStreams:j,isScreenSharing:y,toggleScreenShare:ze,knockRequests:k,approveKnock:Me,rejectKnock:De,joinStatus:q,isMicOn:_,isCamOn:D,micLocked:V,camLocked:M,toggleMic:Fe,toggleCam:ot,leaveCall:st,error:E,roomTitle:N,remoteIsRecording:Y,emitRecording:Oe,forceMuteMic:Re,forceMuteCam:qe,allowMic:ae,allowCam:Le,isHandRaised:O,raisedHands:F,toggleHandRaise:at,kickPeer:Ge}}const yU=l.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #202225;
  z-index: 10000;
  display: flex;
  flex-direction: column;
`,vU=l.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`,bU=l.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  position: relative;
`,wU=l.div`
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
`,df=l.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #2f3136;
`,S2=l.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2f3136;
  color: #dcddde;
`,C2=l.div`
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
`,kU=l.div`
  font-size: 18px;
  font-weight: 600;
  color: #dcddde;
  margin-bottom: 8px;
`,jU=l.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b9bbbe;
`,SU=l.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(32, 34, 37, 0.9) 20%,
    rgba(32, 34, 37, 0.95) 100%
  );
  padding: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  backdrop-filter: blur(10px);
`,hd=l.button`
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
    background-color: ${e.$active?"rgba(255, 255, 255, 0.2)":"rgba(255, 255, 255, 0.1)"};
    color: white;
    backdrop-filter: blur(10px);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  `}
`,CU=({isOpen:e,onClose:t,roomId:r,remoteUser:o,isCaller:i})=>{var M;const s=Ie(A=>A.user),a=(s==null?void 0:s.nickname)||(s==null?void 0:s.username)||"You",{localStream:c,remoteStreams:d,isMicOn:p,isCamOn:h,toggleMic:f,toggleCam:x,leaveCall:S,isScreenSharing:m,toggleScreenShare:b,remoteScreenStreams:w}=uC({roomId:r,displayName:a,enabled:e&&!!r,isCreator:i,isPrivate:!1}),[j,v]=u.useState(!1),[y,g]=u.useState("bottom-right"),k=d[0],C=!!(k!=null&&k.stream),_=u.useCallback(A=>{A&&c&&(A.srcObject=c)},[c]),z=u.useCallback(A=>{A&&(k!=null&&k.stream)&&(A.srcObject=k.stream)},[k==null?void 0:k.stream]),D=u.useCallback(A=>{A&&w.length>0&&(A.srcObject=w[0].stream)},[w]),B=u.useRef(!1);u.useEffect(()=>{d.length>0?B.current=!0:B.current&&t()},[d,t]);const V=()=>{v(!j)},R=u.useCallback(()=>{S(),t()},[S,t]);return e?n.jsx(yU,{children:n.jsxs(vU,{children:[n.jsx(bU,{children:w.length>0?n.jsx(df,{ref:D,autoPlay:!0,playsInline:!0}):C?n.jsx(df,{ref:z,autoPlay:!0,playsInline:!0}):n.jsxs(S2,{children:[n.jsx(C2,{children:((M=o==null?void 0:o.name)==null?void 0:M[0])||"?"}),n.jsx(kU,{children:(o==null?void 0:o.name)||"User"}),n.jsx(jU,{children:"Qo'ng'iroqqa ulanmoqda..."})]})}),n.jsx(wU,{position:y,onClick:V,children:h&&c?n.jsx(df,{ref:_,autoPlay:!0,muted:!0,playsInline:!0,style:{transform:"scaleX(-1)"}}):n.jsx(S2,{children:n.jsx(C2,{style:{width:40,height:40,fontSize:16},children:"Siz"})})}),n.jsxs(SU,{children:[n.jsx(hd,{onClick:f,$active:p,children:p?n.jsx(uo,{size:24}):n.jsx(si,{size:24})}),n.jsx(hd,{onClick:x,$active:h,children:h?n.jsx(Lr,{size:24}):n.jsx(fo,{size:24})}),n.jsx(hd,{onClick:b,$active:m,children:m?n.jsx(p4,{size:24}):n.jsx(zx,{size:24})}),n.jsx(hd,{variant:"primary",onClick:R,children:n.jsx(rp,{size:24})})]})]})}):null},Em=et`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,zU=et`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,$U=l.div`
  position: fixed;
  inset: ${e=>e.$minimized?"auto 20px 20px auto":"0"};
  width: ${e=>e.$minimized?"320px":"auto"};
  height: ${e=>e.$minimized?"180px":"auto"};
  z-index: 10000;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
  animation: ${Em} 0.3s ease-out;
  border-radius: ${e=>e.$minimized?"18px":"0"};
  border: ${e=>e.$minimized?"1px solid rgba(255,255,255,0.08)":"none"};
  box-shadow: ${e=>e.$minimized?"0 20px 50px rgba(0,0,0,0.45)":"none"};
  overflow: hidden;
`,_U=l.div`
  position: absolute;
  bottom: 88px;
  right: 14px;
  z-index: 10020;
  display: flex;
  gap: 8px;
  pointer-events: none;
`,TU=l.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(11, 13, 15, 0.72);
  backdrop-filter: blur(10px);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.16s ease, transform 0.16s ease;

  &:hover {
    background: rgba(24, 28, 34, 0.92);
    transform: translateY(-1px);
  }
`,EU=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`,RU=l.div`
  display: flex;
  flex-direction: column;
`,PU=l.span`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`,MU=l.span`
  color: #72767d;
  font-size: 11px;
  font-family: monospace;
`,IU=l.div`
  display: flex;
  gap: 8px;
`,rs=l.button`
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
`,AU=l.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,OU=l.div`
  width: 100%;
  height: 100%;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
`,z2=l.button`
  flex: 1;
  border: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.02)
  );
  color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
`,$2=l.div`
  font-size: 16px;
  font-weight: 700;
`,fd=l.div`
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.5;
`,_2=l.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,LU=l.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${e=>{const t=e.$count;return t===1?pi`
        grid-template-columns: 1fr;
      `:t===2?pi`
        grid-template-columns: 1fr 1fr;
      `:t<=4?pi`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `:pi`
      grid-template-columns: repeat(3, 1fr);
    `}}
`,BU=l.div`
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
`,DU=l.div`
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
`,FU=l.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #4f545c;
`,NU=l.div`
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
`,qU=l.div`
  width: 280px;
  flex-shrink: 0;
  background: #18191c;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
`,HU=l.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,UU=l.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,YU=l.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  animation: ${Em} 0.2s ease;
`,VU=l.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`,WU=l.div`
  display: flex;
  gap: 6px;
`,T2=l.button`
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
`;l.div`
  text-align: center;
  color: #4f545c;
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;const E2=l.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`,R2=l.div`
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
`,P2=l.div`
  flex: 1;
  min-width: 0;
  color: #dcddde;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,M2=l.div`
  display: flex;
  gap: 4px;
  color: #4f545c;
  flex-shrink: 0;
`,I2=l.div`
  color: #72767d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`,GU=l.span`
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
`,QU=l.button`
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
`,KU=l.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
`,ns=l.button`
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
`,xd=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #b9bbbe;
  font-size: 15px;
`,JU=l(Ii)`
  animation: ${zU} 1.2s linear infinite;
`,XU=et`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,ZU=l.div`
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
  animation: ${XU} 1.5s ease infinite;
`,eY=l.div`
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
  animation: ${Em} 0.15s ease;
  z-index: 100;
`,A2=l.button`
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
`,O2=l.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${e=>e.$bg||"rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`,tY=l.button`
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
`,gd=({stream:e,muted:t=!1,isLocal:r=!1,label:o,isCamOn:i=!0})=>{var d;const s=u.useRef(null),a=u.useRef(null);u.useEffect(()=>{s.current&&e&&(s.current.srcObject=e)},[e,i]);const c=()=>{var h,f;const p=a.current;p&&(document.fullscreenElement?document.exitFullscreen():(h=p.requestFullscreen)!=null&&h.call(p)||((f=p.webkitRequestFullscreen)==null||f.call(p)))};return n.jsxs(BU,{$isLocal:r,ref:a,onDoubleClick:c,style:{cursor:"pointer"},onMouseEnter:p=>{const h=p.currentTarget.querySelector(".fs-btn");h&&(h.style.opacity=1)},onMouseLeave:p=>{const h=p.currentTarget.querySelector(".fs-btn");h&&(h.style.opacity=0)},children:[n.jsx(tY,{className:"fs-btn",onClick:c,children:n.jsx(rm,{size:14})}),i&&e?n.jsx("video",{ref:s,autoPlay:!0,playsInline:!0,muted:t}):n.jsxs(FU,{children:[n.jsx(NU,{children:((d=o==null?void 0:o.charAt(0))==null?void 0:d.toUpperCase())||"?"}),n.jsx("span",{style:{fontSize:12},children:o})]}),n.jsxs(DU,{children:[!i&&n.jsx(fo,{size:11}),o,r&&" (Sen)"]})]})},rY=({isOpen:e,onClose:t,onMinimize:r,onMaximize:o,isMinimized:i=!1,roomId:s,chatTitle:a,isCreator:c=!0,isPrivate:d=!1,initialMicOn:p=!0,initialCamOn:h=!0})=>{var ke;const[f,x]=u.useState(!1),[S,m]=u.useState(!1),[b,w]=u.useState(null),[j,v]=u.useState(null),y=u.useRef(!1),g=Ie(he=>he.user),k=(g==null?void 0:g.nickname)||(g==null?void 0:g.username)||"Mehmon",{localStream:C,remoteStreams:_,screenStream:z,remoteScreenStreams:D,isScreenSharing:B,toggleScreenShare:V,knockRequests:R,approveKnock:M,rejectKnock:A,joinStatus:O,isMicOn:T,isCamOn:F,micLocked:P,camLocked:q,toggleMic:$,toggleCam:E,leaveCall:I,error:N,roomTitle:J,remoteIsRecording:Y,emitRecording:L,forceMuteMic:H,forceMuteCam:Q,allowMic:ie,allowCam:G,isHandRaised:le,raisedHands:ue,toggleHandRaise:me,kickPeer:W}=uC({roomId:s,displayName:k,enabled:e&&!!s,isCreator:c,isPrivate:d,chatTitle:a,initialMicOn:p,initialCamOn:h}),[Me,De]=u.useState(!1),[Fe,ot]=u.useState(!1),st=u.useRef(null),ze=u.useRef([]),Oe=u.useRef(null),Re=u.useRef(null),qe=u.useRef(null),ae=u.useCallback(()=>{const he=new AudioContext,Ee=he.createMediaStreamDestination();return[C,..._.map(ct=>ct.stream)].filter(Boolean).forEach(ct=>{const tt=ct.getAudioTracks();tt.length>0&&he.createMediaStreamSource(new MediaStream(tt)).connect(Ee)}),Ee.stream},[C,_]),Le=u.useCallback(async he=>{try{ot(!1);let Ee;if(he==="screen"){const ut=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});qe.current=ut,Ee=ut,ut.getVideoTracks()[0].onended=()=>Ge()}else{const ut=document.createElement("canvas");ut.width=1280,ut.height=720,Oe.current=ut;const ir=ut.getContext("2d"),Go=()=>{const ur=document.querySelectorAll("video"),Rt=ur.length||1,Kt=Rt<=1?1:Rt<=4?2:3,cn=Math.ceil(Rt/Kt),Yr=ut.width/Kt,Rn=ut.height/cn;ir.fillStyle="#0b0d0f",ir.fillRect(0,0,ut.width,ut.height),ur.forEach((dn,Vr)=>{const qt=Vr%Kt,Qo=Math.floor(Vr/Kt);try{ir.drawImage(dn,qt*Yr,Qo*Rn,Yr,Rn)}catch{}})};Re.current=setInterval(Go,33),Ee=ut.captureStream(30)}const He=ae(),ct=new MediaStream([...Ee.getVideoTracks(),...He.getAudioTracks()]);ze.current=[];const tt=new MediaRecorder(ct,{mimeType:"video/webm;codecs=vp9,opus"});tt.ondataavailable=ut=>{ut.data.size>0&&ze.current.push(ut.data)},st.current=tt,tt.start(1e3),De(!0),L(!0)}catch(Ee){console.error("Recording error:",Ee),ot(!1)}},[ae,L]),Ge=u.useCallback(()=>{Re.current&&(clearInterval(Re.current),Re.current=null),qe.current&&(qe.current.getTracks().forEach(he=>he.stop()),qe.current=null),st.current&&st.current.state!=="inactive"&&(st.current.onstop=()=>{const he=new Blob(ze.current,{type:"video/webm"}),Ee=URL.createObjectURL(he),He=document.createElement("a");He.href=Ee,He.download=`meet-${s}-${Date.now()}.webm`,He.click(),URL.revokeObjectURL(Ee),ze.current=[]},st.current.stop()),De(!1),L(!1)},[s,L]),at=()=>{try{Me&&Ge()}catch(he){console.error("Failed to stop recording:",he)}try{I()}catch(he){console.error("Failed to leave call:",he)}t()},oe=()=>{navigator.clipboard.writeText(`${window.location.origin}/join/${s}`),x(!0),setTimeout(()=>x(!1),2e3)},xe=u.useCallback(()=>{b&&!b.closed&&(y.current=!0,b.close()),w(null),v(null)},[b]);u.useEffect(()=>{if(!i||!b)return;const he=()=>{if(w(null),v(null),y.current){y.current=!1;return}o==null||o()};return b.addEventListener("pagehide",he),()=>{b.removeEventListener("pagehide",he)}},[i,o,b]),u.useEffect(()=>{!e&&b&&xe()},[xe,e,b]),u.useEffect(()=>{!i&&b&&xe()},[xe,i,b]);const we=u.useCallback(async()=>{if(i){o==null||o();return}const he=window==null?void 0:window.documentPictureInPicture;if(!(he!=null&&he.requestWindow)){r==null||r();return}try{const Ee=await he.requestWindow({width:360,height:220});Ee.document.body.innerHTML="",Ee.document.body.style.margin="0",Ee.document.body.style.background="#0b0d0f",Ee.document.body.style.overflow="hidden",[...document.styleSheets].forEach(ct=>{try{const tt=[...ct.cssRules].map(ir=>ir.cssText).join(""),ut=document.createElement("style");ut.textContent=tt,Ee.document.head.appendChild(ut)}catch{if(ct.href){const tt=document.createElement("link");tt.rel="stylesheet",tt.type=ct.type,tt.media=ct.media,tt.href=ct.href,Ee.document.head.appendChild(tt)}}});const He=Ee.document.createElement("div");He.style.width="100%",He.style.height="100%",Ee.document.body.appendChild(He),y.current=!1,w(Ee),v(He),r==null||r()}catch(Ee){console.error("Document PiP ochilmadi:",Ee),r==null||r()}},[i,o,r]),X=u.useCallback(()=>{o==null||o()},[o]);if(!e||!s)return null;const ee=1+_.length+(z?1:0)+D.length,ye=n.jsxs(n.Fragment,{children:[n.jsxs(EU,{children:[n.jsxs(RU,{children:[n.jsxs(PU,{children:[J||a||"Meet",d&&n.jsxs("span",{style:{fontSize:11,color:"#faa61a",marginLeft:8,display:"flex",alignItems:"center",gap:"4px"},children:[n.jsx(G3,{size:12})," Private"]})]}),n.jsx(MU,{children:s})]}),n.jsxs(IU,{children:[(Me||Y)&&n.jsxs(ZU,{children:[n.jsx(Xp,{size:8,fill:"#f04747"})," REC"]}),(r||i)&&n.jsxs(rs,{onClick:we,children:[i?n.jsx(rm,{size:13}):n.jsx(T1,{size:13}),i?"Ochish":"Yig'ish"]}),n.jsxs(rs,{onClick:oe,children:[f?n.jsx(tn,{size:13}):n.jsx(i4,{size:13}),f?"Nusxalandi!":"Link"]}),!i&&n.jsxs(rs,{onClick:()=>m(he=>!he),style:{position:"relative"},children:[n.jsx(No,{size:13}),ee,c&&R.length>0&&n.jsx(GU,{children:R.length})]})]})]}),n.jsxs(z2,{type:"button",onClick:j?X:o,children:[n.jsxs("div",{children:[n.jsx($2,{children:J||a||"Meet"}),n.jsxs(fd,{children:[ee," qatnashchi • ",d?"private xona":"public xona"]})]}),n.jsxs(_2,{children:[n.jsx(fd,{children:s}),T?n.jsx(uo,{size:16,color:"#43b581"}):n.jsx(si,{size:16,color:"#f04747"}),F?n.jsx(Lr,{size:16,color:"#43b581"}):n.jsx(fo,{size:16,color:"#f04747"})]})]})]});return i&&j?aj.createPortal(n.jsx(OU,{children:ye}),j):n.jsxs($U,{$minimized:i,children:[!i&&n.jsx(_U,{children:n.jsx(TU,{type:"button",title:"Meetni yig'ish","aria-label":"Meetni yig'ish",onClick:we,children:n.jsx(T1,{size:18})})}),i?n.jsxs(z2,{type:"button",onClick:o,children:[n.jsxs("div",{children:[n.jsx($2,{children:J||a||"Meet"}),n.jsxs(fd,{children:[ee," qatnashchi • ",d?"private xona":"public xona"]})]}),n.jsxs(_2,{children:[n.jsx(fd,{children:s}),T?n.jsx(uo,{size:16,color:"#43b581"}):n.jsx(si,{size:16,color:"#f04747"}),F?n.jsx(Lr,{size:16,color:"#43b581"}):n.jsx(fo,{size:16,color:"#f04747"})]})]}):n.jsxs(AU,{children:[N?n.jsxs(xd,{children:[n.jsx(Xu,{size:38,color:"#f04747"}),n.jsx("span",{children:N}),n.jsx(rs,{onClick:t,children:"Yopish"})]}):O==="connecting"?n.jsxs(xd,{children:[n.jsx(JU,{size:38,color:"#7289da"}),n.jsx("span",{children:"Ulanmoqda…"})]}):O==="waiting"?n.jsxs(xd,{children:[n.jsx(Pi,{size:48,color:"#faa61a"}),n.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Ruxsat kutilmoqda…"}),n.jsx("span",{children:"Call yaratuvchisi sizga ruxsat berishini kuting"}),n.jsx(rs,{onClick:at,children:"Bekor qilish"})]}):O==="rejected"?n.jsxs(xd,{children:[n.jsx(yl,{size:48,color:"#f04747"}),n.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:"Rad etildi"}),n.jsx("span",{children:"Call yaratuvchisi so'rovingizni rad etdi"}),n.jsx(rs,{onClick:t,children:"Yopish"})]}):n.jsxs(LU,{$count:ee,children:[n.jsx(gd,{stream:C,muted:!0,isLocal:!0,label:k,isCamOn:F}),z&&n.jsx(gd,{stream:z,muted:!0,label:`${k} (Ekran)`,isCamOn:!0}),_.map(({peerId:he,stream:Ee,displayName:He})=>n.jsxs("div",{style:{position:"relative"},children:[n.jsx(gd,{stream:Ee,label:He,isCamOn:!0}),ue.has(he)&&n.jsx("span",{style:{position:"absolute",top:8,left:8,fontSize:24,zIndex:5,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"},children:n.jsx(Zp,{size:20,color:"#faa61a",fill:"#faa61a"})})]},he)),D.map(({peerId:he,stream:Ee,displayName:He})=>n.jsx(gd,{stream:Ee,label:`${He} (Ekran)`,isCamOn:!0},`screen-${he}`))]}),S&&n.jsxs(qU,{children:[n.jsxs(HU,{children:[n.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[n.jsx(No,{size:15,color:"#7289da"}),"A'zolar (",ee,")"]}),n.jsx(QU,{onClick:()=>m(!1),children:n.jsx(yl,{size:16})})]}),n.jsxs(UU,{children:[c&&d&&n.jsxs(n.Fragment,{children:[n.jsxs(I2,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[n.jsx(im,{size:12})," Kutayotganlar (",R.length,")"]}),R.length===0?n.jsx("div",{style:{padding:"8px 14px",color:"#4f545c",fontSize:12},children:"Hech kim kutmayapti"}):R.map(({peerId:he,displayName:Ee})=>n.jsxs(YU,{children:[n.jsxs(VU,{style:{display:"flex",alignItems:"center",gap:"6px"},children:[n.jsx(Si,{size:14})," ",Ee]}),n.jsxs(WU,{children:[n.jsxs(T2,{$approve:!0,onClick:()=>M(he),children:[n.jsx(rn,{size:12})," Qabul"]}),n.jsxs(T2,{onClick:()=>A(he),children:[n.jsx(yl,{size:12})," Rad"]})]})]},he))]}),n.jsxs(I2,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[n.jsx(C3,{size:12,color:"#43b581"})," Qo'shilganlar (",ee,")"]}),n.jsxs(E2,{children:[n.jsx(R2,{children:((ke=k==null?void 0:k.charAt(0))==null?void 0:ke.toUpperCase())||"?"}),n.jsxs(P2,{children:[k," (Sen)"]}),n.jsxs(M2,{children:[T?n.jsx(uo,{size:13,color:"#43b581"}):n.jsx(si,{size:13,color:"#f04747"}),F?n.jsx(Lr,{size:13,color:"#43b581"}):n.jsx(fo,{size:13,color:"#f04747"})]})]}),_.map(({peerId:he,displayName:Ee})=>{var He;return n.jsxs(E2,{children:[n.jsx(R2,{children:((He=Ee==null?void 0:Ee.charAt(0))==null?void 0:He.toUpperCase())||"?"}),n.jsxs(P2,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[ue.has(he)&&n.jsx(Zp,{size:14,color:"#faa61a",fill:"#faa61a"}),Ee]}),n.jsx(M2,{children:c?n.jsxs(n.Fragment,{children:[n.jsx("span",{onClick:()=>H(he),style:{cursor:"pointer"},title:"Mic o'chirish",children:n.jsx(si,{size:13,color:"#f04747"})}),n.jsx("span",{onClick:()=>ie(he),style:{cursor:"pointer"},title:"Mic ruxsat",children:n.jsx(uo,{size:13,color:"#43b581"})}),n.jsx("span",{onClick:()=>Q(he),style:{cursor:"pointer"},title:"Cam o'chirish",children:n.jsx(fo,{size:13,color:"#f04747"})}),n.jsx("span",{onClick:()=>G(he),style:{cursor:"pointer"},title:"Cam ruxsat",children:n.jsx(Lr,{size:13,color:"#43b581"})}),n.jsx("span",{onClick:()=>W(he),style:{cursor:"pointer",marginLeft:8},title:"Chiqarib yuborish",children:n.jsx(t$,{size:13,color:"#f04747"})})]}):n.jsxs(n.Fragment,{children:[n.jsx(uo,{size:13,color:"#43b581"}),n.jsx(Lr,{size:13,color:"#43b581"})]})})]},he)})]})]})]}),!i&&n.jsxs(KU,{children:[n.jsxs(ns,{$active:T,onClick:$,style:P?{opacity:.5,cursor:"not-allowed"}:{},children:[T?n.jsx(uo,{size:21}):n.jsx(si,{size:21}),P&&n.jsx(Fo,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),n.jsxs(ns,{$active:F,onClick:E,style:q?{opacity:.5,cursor:"not-allowed"}:{},children:[F?n.jsx(Lr,{size:21}):n.jsx(fo,{size:21}),q&&n.jsx(Fo,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),n.jsx(ns,{$active:B,onClick:V,children:B?n.jsx(p4,{size:21}):n.jsx(zx,{size:21})}),n.jsx(ns,{$active:le,onClick:me,style:le?{background:"rgba(250,166,26,0.2)",color:"#faa61a"}:{},children:n.jsx(Zp,{size:21})}),c&&n.jsxs("div",{style:{position:"relative"},children:[n.jsx(ns,{$active:Me,onClick:()=>Me?Ge():ot(he=>!he),style:Me?{background:"rgba(240,71,71,0.2)",color:"#f04747"}:{},children:n.jsx(Xp,{size:21,fill:Me?"#f04747":"none"})}),Fe&&!Me&&n.jsxs(eY,{children:[n.jsxs(A2,{onClick:()=>Le("screen"),children:[n.jsx(O2,{$bg:"rgba(114,137,218,0.15)",children:n.jsx(zx,{size:16,color:"#7289da"})}),n.jsxs("div",{children:[n.jsx("div",{style:{fontWeight:600},children:"Ekranni yozish"}),n.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Faqat ekran + barcha ovozlar"})]})]}),n.jsxs(A2,{onClick:()=>Le("all"),children:[n.jsx(O2,{$bg:"rgba(240,71,71,0.12)",children:n.jsx(Xp,{size:16,color:"#f04747"})}),n.jsxs("div",{children:[n.jsx("div",{style:{fontWeight:600},children:"Hammasini yozish"}),n.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Barcha oynalar + barcha ovozlar"})]})]})]})]}),n.jsx(ns,{$danger:!0,onClick:at,children:n.jsx(rp,{size:21})})]})]})},nY="http://localhost:3000";function L2({title:e,description:t}){return n.jsx("div",{style:{minHeight:"100vh",background:"var(--bg-color)",color:"var(--text-color)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"},children:n.jsxs("div",{style:{width:"min(100%, 560px)",background:"var(--secondary-color)",border:"1px solid var(--border-color)",borderRadius:"24px",padding:"32px",boxSizing:"border-box"},children:[n.jsx("h1",{style:{margin:"0 0 12px",fontSize:"28px"},children:e}),n.jsx("p",{style:{margin:0,lineHeight:1.7,color:"var(--text-muted-color)"},children:t})]})})}function oY({children:e}){const[t,r]=Qe.useState({loading:!0,maintenanceMode:!1,maintenanceMessage:""}),o=Bi();return Qe.useEffect(()=>{let i=!1;return(async()=>{try{const c=await(await fetch(`${nY}/app/status`,{credentials:"include"})).json();i||r({loading:!1,maintenanceMode:!!(c!=null&&c.maintenanceMode),maintenanceMessage:(c==null?void 0:c.maintenanceMessage)||""})}catch{i||r({loading:!1,maintenanceMode:!1,maintenanceMessage:""})}})(),()=>{i=!0}},[]),o.pathname==="/blocked"?n.jsx(L2,{title:"Hisob bloklangan",description:"Hisobingiz bloklangan. Qo'llab-quvvatlash bilan bog'laning."}):t.loading?n.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg-color)",color:"var(--text-color)"},children:"Yuklanmoqda..."}):o.pathname==="/maintenance"||t.maintenanceMode?n.jsx(L2,{title:"Texnik ishlar olib borilmoqda",description:t.maintenanceMessage||"Iltimos, birozdan keyin qayta urinib ko'ring."}):e}function iY(){const{incomingCall:e,outgoingCall:t,activeCall:r,acceptCall:o,rejectCall:i,cancelCall:s,endActiveCall:a}=JS();return n.jsxs(n.Fragment,{children:[e&&n.jsx(xU,{isOpen:!!e,caller:e.fromUser,onAccept:o,onReject:i}),t&&n.jsx(XS,{isOpen:!!t,target:t.targetUser,onCancel:s}),r&&n.jsx(CU,{isOpen:!!r,roomId:r.roomId,remoteUser:r.remoteUser,isCaller:r.isCaller,onClose:a})]})}function sY(){const e=Qt(),t=Bi(),r=Ie(h=>h.user),o=ai(h=>h.activeCall),i=ai(h=>h.isMinimized),s=ai(h=>h.minimizeCall),a=ai(h=>h.maximizeCall),c=ai(h=>h.endCall);if(Qe.useEffect(()=>{t.pathname.startsWith("/join/")||sessionStorage.setItem("meet_return_path",`${t.pathname}${t.search}${t.hash}`)},[t.pathname,t.search,t.hash]),!(o!=null&&o.roomId))return null;const d=()=>{const h=o.returnPath||"/chats";c(),t.pathname.startsWith("/join/")&&e(h)},p=()=>{s(),t.pathname.startsWith("/join/")&&r&&e(o.returnPath||"/chats")};return n.jsx(rY,{isOpen:!0,roomId:o.roomId,chatTitle:o.chatTitle,isCreator:o.isCreator,isPrivate:o.isPrivate,initialMicOn:o.initialMicOn,initialCamOn:o.initialCamOn,isMinimized:i,onMinimize:p,onMaximize:a,onClose:d})}function Xa({children:e}){return Ie(r=>r.token)?e:n.jsx(az,{to:"/login",replace:!0})}function B2(){const{nav:e,channelId:t}=Qg(),r=Qt(),{resolveChatSlug:o}=Wo(),[i,s]=Qe.useState(!1),a=["home","feed","blogs","chats","users","groups","courses","arena","meets","profile","login","register","join"];return Qe.useEffect(()=>{let c;if(!e&&t)c=t;else if(e&&!a.includes(e)&&e!=="a")c=e;else return;s(!0),o(c).then(d=>{if(d&&d.jammId){const p=d.type==="group"||d.isGroup?`/groups/${d.jammId}`:`/users/${d.jammId}`;r(p,{replace:!0})}else r("/home",{replace:!0}),s(!1)}).catch(()=>{r("/home",{replace:!0}),s(!1)})},[e,t,r,o]),i?n.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"var(--bg-color)",color:"var(--text-color)"},children:"Yuklanmoqda..."}):n.jsx(An,{})}function An({forcedNav:e}){const{nav:t,channelId:r,lessonId:o}=Qg(),i=Qt();return n.jsx(gH,{initialNav:e||t||"feed",initialChannel:r||"0",initialLesson:o,navigate:i})}function aY(){return n.jsx(gz,{children:n.jsx(qM,{children:n.jsxs(oY,{children:[n.jsx(zE,{position:"top-center",containerStyle:{zIndex:99999}}),n.jsx(ME,{children:n.jsx(WE,{children:n.jsx(vI,{children:n.jsx(sM,{children:n.jsx(dB,{children:n.jsxs(qP,{children:[n.jsx(iY,{}),n.jsx(sY,{}),n.jsxs(cz,{children:[n.jsx(Zt,{path:"/maintenance",element:null}),n.jsx(Zt,{path:"/blocked",element:null}),n.jsx(Zt,{path:"/login",element:n.jsx(KH,{})}),n.jsx(Zt,{path:"/join/:roomId",element:n.jsx(aU,{})}),n.jsx(Zt,{path:"/arena",element:n.jsx(An,{forcedNav:"arena"})}),n.jsx(Zt,{path:"/arena/:channelId",element:n.jsx(An,{forcedNav:"arena"})}),n.jsx(Zt,{path:"/arena/:channelId/:lessonId",element:n.jsx(An,{forcedNav:"arena"})}),n.jsx(Zt,{path:"/arena/quiz/:channelId",element:n.jsx(An,{forcedNav:"arena"})}),n.jsx(Zt,{path:"/arena/quiz/:channelId/:lessonId",element:n.jsx(An,{forcedNav:"arena"})}),n.jsx(Zt,{path:"/arena/quiz-link/:channelId",element:n.jsx(An,{forcedNav:"arena"})}),n.jsx(Zt,{path:"/",element:n.jsx(Xa,{children:n.jsx(kH,{})})}),n.jsx(Zt,{path:"/a/:channelId",element:n.jsx(Xa,{children:n.jsx(B2,{})})}),n.jsx(Zt,{path:"/:nav",element:n.jsx(Xa,{children:n.jsx(B2,{})})}),n.jsx(Zt,{path:"/:nav/:channelId",element:n.jsx(Xa,{children:n.jsx(An,{})})}),n.jsx(Zt,{path:"/:nav/:channelId/:lessonId",element:n.jsx(Xa,{children:n.jsx(An,{})})})]})]})})})})})})]})})})}xt.locale("uz-latn");const lY=new h6;uf.createRoot(document.getElementById("root")).render(n.jsx(x6,{client:lY,children:n.jsx(aY,{})}));
