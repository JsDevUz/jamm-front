import{r,j as e,n as mr,e as Ze,f as rr}from"./react-vendor-UYnqoc53.js";import{l as nr}from"./media-realtime-B2IcwcIy.js";import{u as et,b as hr,A as ar,R as br}from"./feature-admin-D0NNr8sf.js";import{v as vr}from"./vendor-CRWlb9wI.js";import{i as jr,a5 as ot,a6 as or,a7 as ir,a4 as yr,a3 as kr,N as bt,a8 as Z,a9 as ee,aa as _,ab as X,e as wr,W as xt,n as it,ac as st,p as Cr,U as $r,c as Sr,ad as Rr,ae as zr,af as pt,ag as sr,ah as Ie,ai as Pe,d as n,l as Oe,m as ke,aj as Tr,ak as Er,al as Pr,am as Ar,X as Dr,an as Br}from"./ui-vendor-DFyM_Xd9.js";import{S as Lr}from"./feature-arena-BvqxMZzZ.js";import{A as Ne}from"./feature-app-ICtyfBrQ.js";const cr=r.createContext(),Mr=2e4,Or=()=>r.useContext(cr),ya=({children:t})=>{const[x,b]=r.useState(new Map),[i,j]=r.useState(!1),h=r.useRef(null),y=r.useRef(null);r.useEffect(()=>{const k=et.getState().user;if(!(k!=null&&k._id)&&!(k!=null&&k.id))return;const f=nr(hr("/presence"),{withCredentials:!0,transports:["websocket","polling"],reconnection:!0,reconnectionDelay:2e3,reconnectionAttempts:10});return h.current=f,f.on("connect",()=>{j(!0),y.current=setInterval(()=>{f.emit("presence:ping")},Mr)}),f.on("disconnect",()=>{j(!1),y.current&&(clearInterval(y.current),y.current=null)}),f.on("user_online",({userId:S})=>{b(P=>{const C=new Map(P);return C.set(S,!0),C})}),f.on("user_offline",({userId:S})=>{b(P=>{const C=new Map(P);return C.delete(S),C})}),f.on("connect_error",S=>{console.error("Presence connection error:",S.message)}),()=>{y.current&&clearInterval(y.current),f.disconnect(),h.current=null}},[]);const $=r.useCallback(k=>x.has(k),[x]),p=r.useCallback(async k=>{try{const f=await fetch(`${ar}/presence/status/bulk`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({userIds:k})});if(!f.ok)return{};const S=await f.json();return b(P=>{const C=new Map(P);for(const[B,R]of Object.entries(S.statuses||{}))R?C.set(B,!0):C.delete(B);return C}),S.statuses}catch(f){return console.error("Failed to fetch bulk statuses:",f),{}}},[]),v=r.useCallback((k=[])=>!k||k.length===0?0:k.filter(f=>{const S=typeof f=="object"?f._id:f;return x.has(S)}).length,[x]),m={onlineUsers:x,connected:i,isUserOnline:$,getOnlineCount:v,fetchBulkStatuses:p,socket:h.current};return e.jsx(cr.Provider,{value:m,children:t})},lr=r.createContext(),ka=()=>r.useContext(lr),wa=({children:t})=>{const{socket:x}=Or(),b=et(C=>C.user),[i,j]=r.useState(null),[h,y]=r.useState(null),[$,p]=r.useState(null);r.useEffect(()=>{if(!x)return;const C=E=>{if($||h||i){x.emit("call:reject",{toUserId:E.fromUser._id,roomId:E.roomId,reason:"busy"});return}j(E)},B=E=>{h&&h.roomId===E.roomId&&(p({roomId:E.roomId,callType:h.callType,remoteUser:h.targetUser,isCaller:!0}),y(null))},R=E=>{h&&h.roomId===E.roomId&&(mr.error(`${h.targetUser.name} qo'ng'iroqni rad etdi`),y(null))},T=E=>{i&&i.roomId===E.roomId&&j(null)};return x.on("call:incoming",C),x.on("call:accepted",B),x.on("call:rejected",R),x.on("call:cancelled",T),()=>{x.off("call:incoming",C),x.off("call:accepted",B),x.off("call:rejected",R),x.off("call:cancelled",T)}},[x,$,h,i]);const v=r.useCallback((C,B="video")=>{if(!x||!b)return;const R=vr(),T={toUserId:C._id,roomId:R,callType:B};y({targetUser:C,roomId:R,callType:B}),x.emit("call:request",T)},[x,b]),m=r.useCallback(()=>{!x||!i||(x.emit("call:accept",{toUserId:i.fromUser._id,roomId:i.roomId}),p({roomId:i.roomId,callType:i.callType,remoteUser:i.fromUser,isCaller:!1}),j(null))},[x,i]),k=r.useCallback(()=>{!x||!i||(x.emit("call:reject",{toUserId:i.fromUser._id,roomId:i.roomId}),j(null))},[x,i]),f=r.useCallback(()=>{!x||!h||(x.emit("call:cancel",{toUserId:h.targetUser._id,roomId:h.roomId}),y(null))},[x,h]),S=r.useCallback(()=>{p(null)},[]),P={incomingCall:i,outgoingCall:h,activeCall:$,startPrivateCall:v,acceptCall:m,rejectCall:k,cancelCall:f,endActiveCall:S};return e.jsx(lr.Provider,{value:P,children:t})},Ir=ar,vt=[],qr={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},...vt.length>0?[{urls:vt,username:"",credential:""}]:[]]},oe={balanced:{key:"balanced",label:"balanced",width:640,height:360,frameRate:18,videoBitrate:38e4,audioBitrate:32e3,scaleResolutionDownBy:1},crowded:{key:"crowded",label:"crowded",width:480,height:270,frameRate:15,videoBitrate:22e4,audioBitrate:32e3,scaleResolutionDownBy:1.2},poor:{key:"poor",label:"audio-priority",width:320,height:180,frameRate:10,videoBitrate:11e4,audioBitrate:4e4,scaleResolutionDownBy:1.6},screen:{key:"screen",label:"screen-share",width:854,height:480,frameRate:12,videoBitrate:35e4,audioBitrate:32e3,scaleResolutionDownBy:1}},Vr=()=>{const t=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return{saveData:!!(t!=null&&t.saveData),effectiveType:(t==null?void 0:t.effectiveType)||"unknown",downlink:Number((t==null?void 0:t.downlink)||0)}},Fr=({peerCount:t,isScreenSharing:x,networkQuality:b,navigatorState:i})=>x?oe.screen:b==="poor"||i.saveData||i.effectiveType==="slow-2g"||i.effectiveType==="2g"||i.downlink>0&&i.downlink<1?oe.poor:t>=6||b==="limited"?oe.crowded:oe.balanced;function dr({roomId:t,displayName:x,enabled:b,isCreator:i=!1,isPrivate:j=!1,chatTitle:h="",initialMicOn:y=!0,initialCamOn:$=!0}){const p=r.useRef(null),v=r.useRef(null),m=r.useRef({}),[k,f]=r.useState(null),[S,P]=r.useState([]),[C,B]=r.useState({}),[R,T]=r.useState(null),[E,te]=r.useState([]),[I,H]=r.useState(!1),[U,N]=r.useState([]),[ie,W]=r.useState(y),[re,A]=r.useState($),[z,q]=r.useState(!1),[J,ge]=r.useState(!1),[fe,me]=r.useState(!1),[V,M]=r.useState(new Set),[se,L]=r.useState("idle"),[we,K]=r.useState(null),[D,O]=r.useState(h||""),[ne,le]=r.useState(!1),[F,de]=r.useState("good"),[Ae,De]=r.useState(oe.balanced),ae=r.useRef(null),Ce=r.useRef({}),he=r.useRef({}),be=r.useRef({}),G=r.useRef(null),ue=r.useRef(oe.balanced),Be=r.useCallback((o,c,a)=>{P(s=>s.find(u=>u.peerId===o)?s.map(u=>u.peerId===o?{...u,stream:c}:u):[...s,{peerId:o,stream:c,displayName:a||o}]),B(s=>{var u,l,d,g;return{...s,[o]:{hasVideo:!!((u=c==null?void 0:c.getVideoTracks)!=null&&u.call(c).length),hasAudio:!!((l=c==null?void 0:c.getAudioTracks)!=null&&l.call(c).length),videoMuted:!1,audioMuted:!1,connectionState:((d=s[o])==null?void 0:d.connectionState)||"connecting",displayName:a||((g=s[o])==null?void 0:g.displayName)||o}}})},[]),Q=r.useCallback((o,c)=>{B(a=>({...a,[o]:{...a[o]||{},...c}}))},[]),ve=r.useCallback(o=>{P(c=>c.filter(a=>a.peerId!==o)),te(c=>c.filter(a=>a.peerId!==o)),B(c=>{const a={...c};return delete a[o],a}),delete he.current[o],m.current[o]&&(m.current[o].close(),delete m.current[o])},[]),Le=r.useCallback(async o=>{const c=v.current;if(!c)return;const a=c.getAudioTracks()[0];if(a)try{a.contentHint="speech",await a.applyConstraints({echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:1})}catch{}const s=c.getVideoTracks()[0];if(s)try{s.contentHint=I?"detail":"motion",await s.applyConstraints({width:{ideal:o.width,max:o.width},height:{ideal:o.height,max:o.height},frameRate:{ideal:o.frameRate,max:o.frameRate}})}catch{}const u=[];Object.values(m.current).forEach(l=>{l.getSenders().forEach(d=>{d.track&&u.push((async()=>{const g=d.getParameters(),w=g.encodings&&g.encodings.length>0?[...g.encodings]:[{}];d.track.kind==="audio"&&(w[0]={...w[0],maxBitrate:o.audioBitrate,networkPriority:"high"},g.encodings=w),d.track.kind==="video"&&(w[0]={...w[0],maxBitrate:o.videoBitrate,maxFramerate:o.frameRate,scaleResolutionDownBy:o.scaleResolutionDownBy,networkPriority:"medium"},g.encodings=w,g.degradationPreference="maintain-framerate");try{await d.setParameters(g)}catch{}})())})}),await Promise.all(u)},[I]),$e=r.useCallback(async()=>{const o=S.length+E.length+(I?1:0),c=Vr(),a=Fr({peerCount:o,isScreenSharing:I,networkQuality:F,navigatorState:c});ue.current.key!==a.key&&(ue.current=a,De(a),await Le(a))},[Le,I,F,E.length,S.length]),ce=r.useCallback(async()=>{let o="good";for(const c of Object.values(m.current))try{const a=await c.getStats();let s=0,u=0;if(a.forEach(l=>{l.type==="candidate-pair"&&l.state==="succeeded"&&l.nominated&&(s=Math.max(s,Number(l.currentRoundTripTime||0)),u=Math.max(u,Number(l.availableOutgoingBitrate||0)))}),s>.45||u>0&&u<18e4){o="poor";break}o!=="poor"&&(s>.25||u>0&&u<42e4)&&(o="limited")}catch{}de(c=>c===o?c:o)},[]),pe=r.useCallback((o,c)=>{const a=new RTCPeerConnection(qr);return Q(o,{displayName:c||o,connectionState:"connecting"}),v.current&&v.current.getTracks().forEach(s=>a.addTrack(s,v.current)),ae.current&&ae.current.getTracks().forEach(s=>a.addTrack(s,ae.current)),a.ontrack=s=>{const[u]=s.streams;if(!u)return;const l=()=>{const g=u.getVideoTracks(),w=u.getAudioTracks();Q(o,{hasVideo:g.length>0,hasAudio:w.length>0,videoMuted:g.length>0?g.every(Y=>Y.readyState!=="live"||Y.muted===!0):!0,audioMuted:w.length>0?w.every(Y=>Y.readyState!=="live"||Y.muted===!0):!0})};[...u.getVideoTracks(),...u.getAudioTracks()].forEach(g=>{g.onmute=l,g.onunmute=l,g.onended=l}),l();const d=he.current[o];d?d===u.id?Be(o,u,c):te(g=>g.find(w=>w.peerId===o)?g.map(w=>w.peerId===o?{...w,stream:u}:w):[...g,{peerId:o,stream:u,displayName:c}]):(he.current[o]=u.id,Be(o,u,c))},a.onicecandidate=s=>{s.candidate&&p.current&&p.current.emit("ice-candidate",{targetId:o,candidate:s.candidate})},a.onconnectionstatechange=()=>{Q(o,{connectionState:a.connectionState}),["failed","disconnected"].includes(a.connectionState)&&ve(o)},m.current[o]=a,a},[Be,ve,Q]),qe=r.useCallback(o=>{o.on("offer",async({senderId:c,sdp:a})=>{let s=m.current[c];s||(s=pe(c,c)),await s.setRemoteDescription(new RTCSessionDescription(a));const u=be.current[c]||[];for(;u.length>0;){const d=u.shift();await s.addIceCandidate(new RTCIceCandidate(d)).catch(()=>{})}const l=await s.createAnswer();await s.setLocalDescription(l),o.emit("answer",{targetId:c,sdp:l})}),o.on("answer",async({senderId:c,sdp:a})=>{const s=m.current[c];if(s){await s.setRemoteDescription(new RTCSessionDescription(a));const u=be.current[c]||[];for(;u.length>0;){const l=u.shift();await s.addIceCandidate(new RTCIceCandidate(l)).catch(()=>{})}}}),o.on("ice-candidate",async({senderId:c,candidate:a})=>{const s=m.current[c];if(s&&s.remoteDescription&&s.remoteDescription.type)try{await s.addIceCandidate(new RTCIceCandidate(a))}catch{}else be.current[c]||(be.current[c]=[]),be.current[c].push(a)}),o.on("peer-joined",async({peerId:c,displayName:a})=>{const s=pe(c,a),u=await s.createOffer();await s.setLocalDescription(u),o.emit("offer",{targetId:c,sdp:u})}),o.on("existing-peers",({peers:c})=>{L("joined")}),o.on("peer-left",({peerId:c})=>{ve(c)})},[pe,ve]);r.useEffect(()=>{if(!b||!t)return;let o=!0;return(async()=>{L("connecting"),K(null);try{const a=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640,max:640},height:{ideal:360,max:360},frameRate:{ideal:18,max:18}},audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:1}});if(!o){a.getTracks().forEach(d=>d.stop());return}v.current=a,f(a),await Le(ue.current);const s=a.getAudioTracks()[0];s&&(s.enabled=y);const u=a.getVideoTracks()[0];u&&(u.enabled=$);const l=nr(`${Ir}/video`,{transports:["websocket"],withCredentials:!0});if(p.current=l,qe(l),i&&l.on("knock-request",({peerId:d,displayName:g})=>{N(w=>[...w,{peerId:d,displayName:g}])}),i||(l.on("waiting-for-approval",()=>{L("waiting")}),l.on("knock-approved",({mediaLocked:d})=>{var g,w;if(L("joined"),d){q(!0),ge(!0);const Y=(g=v.current)==null?void 0:g.getAudioTracks()[0];Y&&(Y.enabled=!1,W(!1));const je=(w=v.current)==null?void 0:w.getVideoTracks()[0];je&&(je.enabled=!1,A(!1))}}),l.on("knock-rejected",({reason:d})=>{L("rejected"),K(d||"Rad etildi")})),l.on("room-info",({title:d})=>{d&&O(d)}),l.on("screen-share-stopped",({peerId:d})=>{te(g=>g.filter(w=>w.peerId!==d)),delete he.current[d]}),l.on("recording-started",()=>le(!0)),l.on("recording-stopped",()=>le(!1)),l.on("kicked",()=>{K("Siz yaratuvchi tomonidan chiqarib yuborildingiz"),L("rejected"),ze()}),l.on("force-mute-mic",()=>{var g;const d=(g=v.current)==null?void 0:g.getAudioTracks()[0];d&&(d.enabled=!1,W(!1)),q(!0)}),l.on("force-mute-cam",()=>{var g;const d=(g=v.current)==null?void 0:g.getVideoTracks()[0];d&&(d.enabled=!1,A(!1)),ge(!0)}),l.on("allow-mic",()=>q(!1)),l.on("allow-cam",()=>ge(!1)),l.on("hand-raised",({peerId:d})=>{M(g=>new Set([...g,d]))}),l.on("hand-lowered",({peerId:d})=>{M(g=>{const w=new Set(g);return w.delete(d),w})}),l.on("error",({message:d})=>{o&&(d==="Room not found"&&!i||(K(d||"Server xatosi yuz berdi"),L("idle")))}),l.on("connect_error",d=>{o&&(K("Serverga ulanib bo'lmadi: "+d.message),L("idle"))}),i)l.emit("create-room",{roomId:t,displayName:x,isPrivate:j,title:h}),l.once("room-created",()=>{L("joined")});else{let d=0;const g=6,w=()=>{p.current&&p.current.emit("join-room",{roomId:t,displayName:x})},Y=({message:je})=>{je==="Room not found"&&o&&(d<g?(d++,console.log(`[useWebRTC] Room not found, retrying join (${d}/${g})...`),setTimeout(w,1500)):(K("Xona topilmadi yoki hali boshlanmagan"),L("idle")))};l.on("error",Y),w()}}catch(a){console.error("[useWebRTC]",a),o&&(K(a.message||"Kamera/mikrofonga ruxsat berilmadi"),L("idle"))}})(),()=>{o=!1,Object.values(m.current).forEach(a=>a.close()),m.current={},v.current&&(v.current.getTracks().forEach(a=>a.stop()),v.current=null),f(null),P([]),B({}),de("good"),De(oe.balanced),ue.current=oe.balanced,N([]),G.current&&(clearInterval(G.current),G.current=null),p.current&&(p.current.emit("leave-room",{roomId:t}),p.current.disconnect())}},[b,t,x,i,j,qe]);const Se=r.useCallback(o=>{p.current&&(p.current.emit("approve-knock",{roomId:t,peerId:o}),N(c=>c.filter(a=>a.peerId!==o)))},[t]),Re=r.useCallback(o=>{p.current&&(p.current.emit("reject-knock",{roomId:t,peerId:o}),N(c=>c.filter(a=>a.peerId!==o)))},[t]),Ve=r.useCallback(()=>{var c;if(z)return;const o=(c=v.current)==null?void 0:c.getAudioTracks()[0];o&&(o.enabled=!o.enabled,W(o.enabled))},[z]),Fe=r.useCallback(()=>{var c;if(J)return;const o=(c=v.current)==null?void 0:c.getVideoTracks()[0];o&&(o.enabled=!o.enabled,A(o.enabled))},[J]),ze=r.useCallback(()=>{var o,c;try{p.current&&(p.current.emit("leave-room",{roomId:t}),p.current.disconnect()),Object.values(m.current).forEach(a=>a.close()),m.current={},(o=v.current)==null||o.getTracks().forEach(a=>a.stop()),v.current=null,(c=ae.current)==null||c.getTracks().forEach(a=>a.stop()),ae.current=null}catch(a){console.error("Error in leaveCall:",a)}finally{f(null),T(null),H(!1),P([]),te([]),B({}),L("idle"),de("good"),De(oe.balanced),ue.current=oe.balanced,G.current&&(clearInterval(G.current),G.current=null)}},[t]),Me=r.useCallback(async()=>{var o,c,a;if(I){(o=ae.current)==null||o.getTracks().forEach(s=>s.stop()),Object.entries(Ce.current).forEach(([s,u])=>{const l=m.current[s];if(l&&u)try{l.removeTrack(u)}catch{}}),Ce.current={},ae.current=null,T(null),H(!1),p.current&&p.current.emit("screen-share-stopped",{roomId:t});for(const[s,u]of Object.entries(m.current))try{const l=await u.createOffer();await u.setLocalDescription(l),(c=p.current)==null||c.emit("offer",{targetId:s,sdp:l})}catch{}return}try{const s=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});ae.current=s,T(s),H(!0),s.getVideoTracks()[0].onended=()=>{Me()};for(const[u,l]of Object.entries(m.current)){const d=l.addTrack(s.getVideoTracks()[0],s);Ce.current[u]=d}p.current&&p.current.emit("screen-share-started",{roomId:t});for(const[u,l]of Object.entries(m.current))try{const d=await l.createOffer();await l.setLocalDescription(d),(a=p.current)==null||a.emit("offer",{targetId:u,sdp:d})}catch{}}catch(s){console.error("Screen share error:",s)}},[I,t]);r.useEffect(()=>{$e()},[$e]),r.useEffect(()=>{if(!(!b||se!=="joined"))return ce(),G.current=setInterval(ce,5e3),()=>{G.current&&(clearInterval(G.current),G.current=null)}},[b,ce,se]);const tt=r.useCallback(o=>{p.current&&p.current.emit(o?"recording-started":"recording-stopped",{roomId:t})},[t]),Te=r.useCallback(o=>{var c;(c=p.current)==null||c.emit("force-mute-mic",{roomId:t,peerId:o})},[t]),rt=r.useCallback(o=>{var c;(c=p.current)==null||c.emit("force-mute-cam",{roomId:t,peerId:o})},[t]),nt=r.useCallback(o=>{var c;(c=p.current)==null||c.emit("allow-mic",{roomId:t,peerId:o})},[t]),xe=r.useCallback(o=>{var c;(c=p.current)==null||c.emit("allow-cam",{roomId:t,peerId:o})},[t]),He=r.useCallback(o=>{var c;(c=p.current)==null||c.emit("kick-peer",{roomId:t,peerId:o})},[t]),Ue=r.useCallback(()=>{var c;const o=!fe;me(o),(c=p.current)==null||c.emit(o?"hand-raised":"hand-lowered",{roomId:t})},[fe,t]);return{localStream:k,remoteStreams:S,remotePeerStates:C,screenStream:R,remoteScreenStreams:E,isScreenSharing:I,toggleScreenShare:Me,knockRequests:U,approveKnock:Se,rejectKnock:Re,joinStatus:se,isMicOn:ie,isCamOn:re,micLocked:z,camLocked:J,toggleMic:Ve,toggleCam:Fe,leaveCall:ze,error:we,roomTitle:D,remoteIsRecording:ne,emitRecording:tt,forceMuteMic:Te,forceMuteCam:rt,allowMic:nt,allowCam:xe,isHandRaised:fe,raisedHands:V,toggleHandRaise:Ue,kickPeer:He,networkQuality:F,qualityProfile:Ae}}const gt=ke`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`,Hr=ke`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,Ur=n.div`
  --call-bg: var(--background-color);
  --call-surface: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  --call-panel: color-mix(in srgb, var(--input-color) 90%, black 10%);
  --call-border: color-mix(in srgb, var(--border-color) 80%, transparent);
  --call-text: var(--text-color);
  --call-muted: var(--text-muted-color);
  --call-success: var(--success-color);
  --call-warning: var(--warning-color);
  --call-danger: var(--danger-color);
  --call-primary: var(--primary-color);
  position: fixed;
  inset: ${t=>t.$minimized?"auto 20px 20px auto":"0"};
  width: ${t=>t.$minimized?"320px":"auto"};
  height: ${t=>t.$minimized?"180px":"auto"};
  z-index: 10000;
  background: var(--call-bg);
  display: flex;
  flex-direction: column;
  animation: ${gt} 0.3s ease-out;
  border-radius: ${t=>t.$minimized?"18px":"0"};
  border: ${t=>t.$minimized?"1px solid var(--call-border)":"none"};
  box-shadow: ${t=>t.$minimized?"0 20px 50px rgba(0,0,0,0.45)":"none"};
  overflow: hidden;
`;n.div`
  position: absolute;
  bottom: 88px;
  right: 14px;
  z-index: 10020;
  display: flex;
  gap: 8px;
  pointer-events: none;
`;n.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-surface) 74%, transparent);
  backdrop-filter: blur(10px);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.16s ease, transform 0.16s ease;

  &:hover {
    background: color-mix(in srgb, var(--call-panel) 92%, transparent);
    transform: translateY(-1px);
  }
`;const _r=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: color-mix(in srgb, var(--call-bg) 78%, transparent);
  border-bottom: 1px solid var(--call-border);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`,Nr=n.div`
  display: flex;
  flex-direction: column;
`,Wr=n.span`
  color: var(--call-text);
  font-size: 15px;
  font-weight: 700;
`,Kr=n.span`
  color: var(--call-muted);
  font-size: 11px;
  font-family: monospace;
`,Gr=n.div`
  display: flex;
  gap: 8px;
`,ye=n.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  border: 1px solid
    ${t=>t.$danger?"color-mix(in srgb, var(--call-danger) 30%, transparent)":"var(--call-border)"};
  background: ${t=>t.$danger?"color-mix(in srgb, var(--call-danger) 10%, transparent)":"color-mix(in srgb, var(--call-panel) 88%, transparent)"};
  color: ${t=>t.$danger?"var(--call-danger)":"var(--call-text)"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  &:hover {
    background: ${t=>t.$danger?"color-mix(in srgb, var(--call-danger) 18%, transparent)":"color-mix(in srgb, var(--call-panel) 96%, transparent)"};
    color: ${t=>t.$danger?"var(--call-danger)":"var(--call-text)"};
  }
`,Qr=n.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,Yr=n.div`
  width: 100%;
  height: 100%;
  background: var(--call-bg);
  display: flex;
  flex-direction: column;
`,jt=n.button`
  flex: 1;
  border: none;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--call-surface) 84%, transparent),
    color-mix(in srgb, var(--call-panel) 90%, transparent)
  );
  color: var(--call-text);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
`,yt=n.div`
  font-size: 16px;
  font-weight: 700;
`,We=n.div`
  color: var(--call-muted);
  font-size: 12px;
  line-height: 1.5;
`,kt=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Xr=n.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${t=>{const x=t.$count;return x===1?Oe`
        grid-template-columns: 1fr;
      `:x===2?Oe`
        grid-template-columns: 1fr 1fr;
      `:x<=4?Oe`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `:Oe`
      grid-template-columns: repeat(3, 1fr);
    `}}
`,Jr=n.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: var(--call-panel);
  border: 2px solid
    ${t=>t.$isLocal?"color-mix(in srgb, var(--call-primary) 44%, transparent)":"var(--call-border)"};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: ${t=>t.$isLocal?"scaleX(-1)":"none"};
  }
`,Zr=n.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`,en=n.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: var(--call-muted);
`,tn=n.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--call-panel);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: var(--call-text);
`,rn=n.div`
  width: 304px;
  flex-shrink: 0;
  margin: 12px 12px 12px 0;
  background: color-mix(in srgb, var(--call-surface) 96%, transparent);
  border: 1px solid var(--call-border);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`,nn=n.div`
  padding: 14px 16px;
  border-bottom: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-panel) 92%, transparent);
  color: var(--call-text);
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`,an=n.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,on=n.div`
  background: color-mix(in srgb, var(--call-panel) 88%, transparent);
  border: 1px solid var(--call-border);
  border-radius: 10px;
  padding: 12px;
  animation: ${gt} 0.2s ease;
`,sn=n.div`
  color: var(--call-text);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`,cn=n.div`
  display: flex;
  gap: 6px;
`,wt=n.button`
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
  ${t=>t.$approve?"background: color-mix(in srgb, var(--call-success) 14%, transparent); color: var(--call-success); border: 1px solid color-mix(in srgb, var(--call-success) 30%, transparent); &:hover { background: color-mix(in srgb, var(--call-success) 24%, transparent); }":"background: color-mix(in srgb, var(--call-danger) 12%, transparent); color: var(--call-danger); border: 1px solid color-mix(in srgb, var(--call-danger) 25%, transparent); &:hover { background: color-mix(in srgb, var(--call-danger) 22%, transparent); }"}
`;n.div`
  text-align: center;
  color: var(--call-muted);
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;const Ct=n.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  transition: background 0.12s;
  &:hover {
    background: color-mix(in srgb, var(--call-panel) 88%, transparent);
  }
`,$t=n.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--call-panel);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--call-text);
`,St=n.div`
  flex: 1;
  min-width: 0;
  color: var(--call-text);
  font-size: 13px;
  font-weight: 500;
  display: grid;
  gap: 6px;
`,Rt=n.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,zt=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--call-muted);
  font-size: 11px;
`,Ke=n.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 999px;
  border: 1px solid
    ${t=>t.$tone==="danger"?"color-mix(in srgb, var(--call-danger) 30%, transparent)":"color-mix(in srgb, var(--call-success) 30%, transparent)"};
  background: ${t=>t.$tone==="danger"?"color-mix(in srgb, var(--call-danger) 12%, transparent)":"color-mix(in srgb, var(--call-success) 12%, transparent)"};
  color: ${t=>t.$tone==="danger"?"var(--call-danger)":"var(--call-success)"};
`,Tt=n.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  color: var(--call-muted);
  flex-shrink: 0;
`,ct=n.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid
    ${t=>t.$danger?"color-mix(in srgb, var(--call-danger) 32%, transparent)":t.$success?"color-mix(in srgb, var(--call-success) 32%, transparent)":"var(--call-border)"};
  background: ${t=>t.$danger?"color-mix(in srgb, var(--call-danger) 14%, transparent)":t.$success?"color-mix(in srgb, var(--call-success) 14%, transparent)":"color-mix(in srgb, var(--call-panel) 92%, transparent)"};
  color: ${t=>t.$danger?"var(--call-danger)":t.$success?"var(--call-success)":"var(--call-text)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${t=>t.$danger?"color-mix(in srgb, var(--call-danger) 20%, transparent)":t.$success?"color-mix(in srgb, var(--call-success) 20%, transparent)":"color-mix(in srgb, var(--call-panel) 100%, transparent)"};
  }
`,Et=n.div`
  color: var(--call-muted);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`,ln=n.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--call-danger);
  color: white;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`,dn=n.button`
  background: none;
  border: none;
  color: var(--call-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: var(--call-text);
  }
`,un=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: color-mix(in srgb, var(--call-bg) 76%, transparent);
  border-top: 1px solid var(--call-border);
  flex-shrink: 0;
`,Ee=n.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  ${t=>t.$danger?"background: var(--call-danger); color: white; &:hover { background: color-mix(in srgb, var(--call-danger) 88%, black); transform: scale(1.08); }":t.$active?"background: color-mix(in srgb, var(--call-panel) 88%, transparent); color: var(--call-text); border: 1px solid var(--call-border); &:hover { background: color-mix(in srgb, var(--call-panel) 96%, transparent); }":"background: color-mix(in srgb, var(--call-danger) 15%, transparent); color: var(--call-danger); border: 1px solid color-mix(in srgb, var(--call-danger) 30%, transparent); &:hover { background: color-mix(in srgb, var(--call-danger) 25%, transparent); }"}
`,Ge=n.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--call-muted);
  font-size: 15px;
`,pn=n(Tr)`
  animation: ${Hr} 1.2s linear infinite;
`,xn=ke`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`,gn=n.div`
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
  animation: ${xn} 1.5s ease infinite;
`,fn=n.div`
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
  animation: ${gt} 0.15s ease;
  z-index: 100;
`,Pt=n.button`
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
`,At=n.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${t=>t.$bg||"rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`,mn=n.button`
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
`,Qe=({stream:t,muted:x=!1,isLocal:b=!1,label:i,isCamOn:j=!0})=>{var v;const{t:h}=Ze(),y=r.useRef(null),$=r.useRef(null);r.useEffect(()=>{y.current&&t&&(y.current.srcObject=t)},[t,j]);const p=()=>{var k,f;const m=$.current;m&&(document.fullscreenElement?document.exitFullscreen():(k=m.requestFullscreen)!=null&&k.call(m)||((f=m.webkitRequestFullscreen)==null||f.call(m)))};return e.jsxs(Jr,{$isLocal:b,ref:$,onDoubleClick:p,style:{cursor:"pointer"},onMouseEnter:m=>{const k=m.currentTarget.querySelector(".fs-btn");k&&(k.style.opacity=1)},onMouseLeave:m=>{const k=m.currentTarget.querySelector(".fs-btn");k&&(k.style.opacity=0)},children:[e.jsx(mn,{className:"fs-btn",onClick:p,children:e.jsx(or,{size:14})}),j&&t?e.jsx("video",{ref:y,autoPlay:!0,playsInline:!0,muted:x}):e.jsxs(en,{children:[e.jsx(tn,{children:((v=i==null?void 0:i.charAt(0))==null?void 0:v.toUpperCase())||"?"}),e.jsx("span",{style:{fontSize:12},children:i})]}),e.jsxs(Zr,{children:[!j&&e.jsx(X,{size:11}),i,b&&h("groupCall.localSuffix")]})]})},hn=({isOpen:t,onClose:x,onMinimize:b,onMaximize:i,isMinimized:j=!1,roomId:h,chatTitle:y,displayName:$,isCreator:p=!0,isPrivate:v=!1,initialMicOn:m=!0,initialCamOn:k=!0})=>{var c;const{t:f}=Ze(),[S,P]=r.useState(!1),[C,B]=r.useState(!1),[R,T]=r.useState(null),[E,te]=r.useState(null),I=r.useRef(!1),H=et(a=>a.user),U=($==null?void 0:$.trim())||(H==null?void 0:H.nickname)||(H==null?void 0:H.username)||f("groupCall.guest"),{localStream:N,remoteStreams:ie,remotePeerStates:W,screenStream:re,remoteScreenStreams:A,isScreenSharing:z,toggleScreenShare:q,knockRequests:J,approveKnock:ge,rejectKnock:fe,joinStatus:me,isMicOn:V,isCamOn:M,micLocked:se,camLocked:L,toggleMic:we,toggleCam:K,leaveCall:D,error:O,roomTitle:ne,remoteIsRecording:le,emitRecording:F,forceMuteMic:de,forceMuteCam:Ae,allowMic:De,allowCam:ae,isHandRaised:Ce,raisedHands:he,toggleHandRaise:be,kickPeer:G,networkQuality:ue,qualityProfile:Be}=dr({roomId:h,displayName:U,enabled:t&&!!h,isCreator:p,isPrivate:v,chatTitle:y,initialMicOn:m,initialCamOn:k}),[Q,ve]=r.useState(!1),[Le,$e]=r.useState(!1),ce=r.useRef(null),pe=r.useRef([]),qe=r.useRef(null),Se=r.useRef(null),Re=r.useRef(null),Ve=r.useCallback(()=>{const a=new AudioContext,s=a.createMediaStreamDestination();return[N,...ie.map(l=>l.stream)].filter(Boolean).forEach(l=>{const d=l.getAudioTracks();d.length>0&&a.createMediaStreamSource(new MediaStream(d)).connect(s)}),s.stream},[N,ie]),Fe=r.useCallback(async a=>{try{$e(!1);let s;if(a==="screen"){const g=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!1});Re.current=g,s=g,g.getVideoTracks()[0].onended=()=>ze()}else{const g=document.createElement("canvas");g.width=1280,g.height=720,qe.current=g;const w=g.getContext("2d"),Y=()=>{const je=document.querySelectorAll("video"),at=je.length||1,_e=at<=1?1:at<=4?2:3,pr=Math.ceil(at/_e),ft=g.width/_e,mt=g.height/pr;w.fillStyle="#0b0d0f",w.fillRect(0,0,g.width,g.height),je.forEach((xr,ht)=>{const gr=ht%_e,fr=Math.floor(ht/_e);try{w.drawImage(xr,gr*ft,fr*mt,ft,mt)}catch{}})};Se.current=setInterval(Y,33),s=g.captureStream(30)}const u=Ve(),l=new MediaStream([...s.getVideoTracks(),...u.getAudioTracks()]);pe.current=[];const d=new MediaRecorder(l,{mimeType:"video/webm;codecs=vp9,opus"});d.ondataavailable=g=>{g.data.size>0&&pe.current.push(g.data)},ce.current=d,d.start(1e3),ve(!0),F(!0)}catch(s){console.error("Recording error:",s),$e(!1)}},[Ve,F]),ze=r.useCallback(()=>{Se.current&&(clearInterval(Se.current),Se.current=null),Re.current&&(Re.current.getTracks().forEach(a=>a.stop()),Re.current=null),ce.current&&ce.current.state!=="inactive"&&(ce.current.onstop=()=>{const a=new Blob(pe.current,{type:"video/webm"}),s=URL.createObjectURL(a),u=document.createElement("a");u.href=s,u.download=`meet-${h}-${Date.now()}.webm`,u.click(),URL.revokeObjectURL(s),pe.current=[]},ce.current.stop()),ve(!1),F(!1)},[h,F]),Me=()=>{try{Q&&ze()}catch(a){console.error("Failed to stop recording:",a)}try{D()}catch(a){console.error("Failed to leave call:",a)}x()},tt=()=>{navigator.clipboard.writeText(`${br}/join/${h}`),P(!0),setTimeout(()=>P(!1),2e3)},Te=r.useCallback(()=>{R&&!R.closed&&(I.current=!0,R.close()),T(null),te(null)},[R]);r.useEffect(()=>{if(!j||!R)return;const a=()=>{if(T(null),te(null),I.current){I.current=!1;return}i==null||i()};return R.addEventListener("pagehide",a),()=>{R.removeEventListener("pagehide",a)}},[j,i,R]),r.useEffect(()=>{!t&&R&&Te()},[Te,t,R]),r.useEffect(()=>{!j&&R&&Te()},[Te,j,R]);const rt=r.useCallback(async()=>{if(j){i==null||i();return}const a=window==null?void 0:window.documentPictureInPicture;if(!(a!=null&&a.requestWindow)){b==null||b();return}try{const s=await a.requestWindow({width:360,height:220});s.document.body.innerHTML="",s.document.body.style.margin="0",s.document.body.style.background="#0b0d0f",s.document.body.style.overflow="hidden",[...document.styleSheets].forEach(l=>{try{const d=[...l.cssRules].map(w=>w.cssText).join(""),g=document.createElement("style");g.textContent=d,s.document.head.appendChild(g)}catch{if(l.href){const d=document.createElement("link");d.rel="stylesheet",d.type=l.type,d.media=l.media,d.href=l.href,s.document.head.appendChild(d)}}});const u=s.document.createElement("div");u.style.width="100%",u.style.height="100%",s.document.body.appendChild(u),I.current=!1,T(s),te(u),b==null||b()}catch(s){console.error("Document PiP ochilmadi:",s),b==null||b()}},[j,i,b]),nt=r.useCallback(()=>{i==null||i()},[i]);if(!t||!h)return null;const xe=1+ie.length+(re?1:0)+A.length,He=ue==="poor"?"var(--call-warning)":ue==="limited"?"var(--call-primary)":"var(--call-success)",Ue=e.jsxs(_r,{children:[e.jsxs(Nr,{children:[e.jsxs(Wr,{children:[ne||y||"Meet",v&&e.jsxs("span",{style:{fontSize:11,color:"#faa61a",marginLeft:8,display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(jr,{size:12})," ",f("groupCall.privateBadge")]})]}),e.jsx(Kr,{children:h})]}),e.jsxs(Gr,{children:[(Q||le)&&e.jsxs(gn,{children:[e.jsx(ot,{size:8,fill:"#f04747"})," ",f("groupCall.recording")]}),e.jsx(ye,{as:"div",style:{cursor:"default",color:He,borderColor:He},children:Be.label}),(b||j)&&e.jsxs(ye,{onClick:rt,children:[j?e.jsx(or,{size:13}):e.jsx(ir,{size:13}),f(j?"groupCall.open":"groupCall.minimize")]}),e.jsxs(ye,{onClick:tt,children:[S?e.jsx(yr,{size:13}):e.jsx(kr,{size:13}),f(S?"groupCall.copied":"groupCall.copyLink")]}),!j&&e.jsxs(ye,{onClick:()=>B(a=>!a),style:{position:"relative"},children:[e.jsx(bt,{size:13}),xe,p&&J.length>0&&e.jsx(ln,{children:J.length})]})]})]}),o=e.jsxs(e.Fragment,{children:[Ue,e.jsxs(jt,{type:"button",onClick:E?nt:i,children:[e.jsxs("div",{children:[e.jsx(yt,{children:ne||y||f("groupCall.roomDefault")}),e.jsxs(We,{children:[f("groupCall.participants",{count:xe})," •"," ",f(v?"groupCall.privateRoom":"groupCall.publicRoom")]})]}),e.jsxs(kt,{children:[e.jsx(We,{children:h}),V?e.jsx(Z,{size:16,color:"#43b581"}):e.jsx(ee,{size:16,color:"#f04747"}),M?e.jsx(_,{size:16,color:"#43b581"}):e.jsx(X,{size:16,color:"#f04747"})]})]})]});return j&&E?rr.createPortal(e.jsx(Yr,{children:o}),E):e.jsxs(Ur,{$minimized:j,children:[j?e.jsxs(jt,{type:"button",onClick:i,children:[e.jsxs("div",{children:[e.jsx(yt,{children:ne||y||f("groupCall.roomDefault")}),e.jsxs(We,{children:[f("groupCall.participants",{count:xe})," •"," ",f(v?"groupCall.privateRoom":"groupCall.publicRoom")]})]}),e.jsxs(kt,{children:[e.jsx(We,{children:h}),V?e.jsx(Z,{size:16,color:"#43b581"}):e.jsx(ee,{size:16,color:"#f04747"}),M?e.jsx(_,{size:16,color:"#43b581"}):e.jsx(X,{size:16,color:"#f04747"})]})]}):e.jsxs(e.Fragment,{children:[Ue,e.jsxs(Qr,{children:[O?e.jsxs(Ge,{children:[e.jsx(wr,{size:38,color:"#f04747"}),e.jsx("span",{children:O}),e.jsx(ye,{onClick:x,children:f("groupCall.close")})]}):me==="connecting"?e.jsxs(Ge,{children:[e.jsx(pn,{size:38,color:"#7289da"}),e.jsx("span",{children:f("groupCall.connecting")})]}):me==="waiting"?e.jsxs(Ge,{children:[e.jsx(xt,{size:48,color:"#faa61a"}),e.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:f("groupCall.waiting")}),e.jsx("span",{children:f("groupCall.waitingDescription")}),e.jsx(ye,{onClick:Me,children:f("common.cancel")})]}):me==="rejected"?e.jsxs(Ge,{children:[e.jsx(it,{size:48,color:"#f04747"}),e.jsx("span",{style:{fontSize:18,fontWeight:700,color:"#fff"},children:f("groupCall.rejected")}),e.jsx("span",{children:f("groupCall.rejectedDescription")}),e.jsx(ye,{onClick:x,children:f("groupCall.close")})]}):e.jsxs(Xr,{$count:xe,children:[e.jsx(Qe,{stream:N,muted:!0,isLocal:!0,label:U,isCamOn:M}),re&&e.jsx(Qe,{stream:re,muted:!0,label:`${U} (Ekran)`,isCamOn:!0}),ie.map(({peerId:a,stream:s,displayName:u})=>{const l=W[a],d=(l==null?void 0:l.hasVideo)!==!1&&(l==null?void 0:l.videoMuted)!==!0;return e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Qe,{stream:s,label:u,isCamOn:d}),he.has(a)&&e.jsx("span",{style:{position:"absolute",top:8,left:8,fontSize:24,zIndex:5,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"},children:e.jsx(st,{size:20,color:"#faa61a",fill:"#faa61a"})}),!d&&e.jsx("span",{style:{position:"absolute",top:8,right:8,fontSize:12,zIndex:5,padding:"4px 8px",borderRadius:999,background:"rgba(0,0,0,0.5)",color:"white"},children:f("groupCall.cameraOff")})]},a)}),A.map(({peerId:a,stream:s,displayName:u})=>e.jsx(Qe,{stream:s,label:`${u} (Ekran)`,isCamOn:!0},`screen-${a}`))]}),C&&e.jsxs(rn,{children:[e.jsxs(nn,{children:[e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(bt,{size:15,color:"#7289da"}),f("groupCall.members",{count:xe})]}),e.jsx(dn,{onClick:()=>B(!1),children:e.jsx(it,{size:16})})]}),e.jsxs(an,{children:[p&&v&&e.jsxs(e.Fragment,{children:[e.jsxs(Et,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(Cr,{size:12})," ",f("groupCall.waitingMembers",{count:J.length})]}),J.length===0?e.jsx("div",{style:{padding:"8px 14px",color:"#4f545c",fontSize:12},children:"Hech kim kutmayapti"}):J.map(({peerId:a,displayName:s})=>e.jsxs(on,{children:[e.jsxs(sn,{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx($r,{size:14})," ",s]}),e.jsxs(cn,{children:[e.jsxs(wt,{$approve:!0,onClick:()=>ge(a),children:[e.jsx(Sr,{size:12})," Qabul"]}),e.jsxs(wt,{onClick:()=>fe(a),children:[e.jsx(it,{size:12})," Rad"]})]})]},a))]}),e.jsxs(Et,{style:{display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(Rr,{size:12,color:"#43b581"})," Qo'shilganlar (",xe,")"]}),e.jsxs(Ct,{children:[e.jsx($t,{children:((c=U==null?void 0:U.charAt(0))==null?void 0:c.toUpperCase())||"?"}),e.jsxs(St,{children:[e.jsxs(Rt,{children:[U," (Sen)"]}),e.jsxs(zt,{children:[e.jsxs(Ke,{$tone:V?"success":"danger",children:[V?e.jsx(Z,{size:11}):e.jsx(ee,{size:11}),V?"Mikrofon on":"Mikrofon off"]}),e.jsxs(Ke,{$tone:M?"success":"danger",children:[M?e.jsx(_,{size:11}):e.jsx(X,{size:11}),M?"Kamera on":"Kamera off"]})]})]}),e.jsxs(Tt,{children:[V?e.jsx(Z,{size:13,color:"var(--call-success)"}):e.jsx(ee,{size:13,color:"var(--call-danger)"}),M?e.jsx(_,{size:13,color:"var(--call-success)"}):e.jsx(X,{size:13,color:"var(--call-danger)"})]})]}),ie.map(({peerId:a,displayName:s})=>{var g;const u=W[a]||{},l=u.hasAudio!==!1&&u.audioMuted!==!0,d=u.hasVideo!==!1&&u.videoMuted!==!0;return e.jsxs(Ct,{children:[e.jsx($t,{children:((g=s==null?void 0:s.charAt(0))==null?void 0:g.toUpperCase())||"?"}),e.jsxs(St,{children:[e.jsxs(Rt,{children:[he.has(a)&&e.jsx(st,{size:14,color:"#faa61a",fill:"#faa61a"}),s]}),e.jsxs(zt,{children:[e.jsxs(Ke,{$tone:l?"success":"danger",children:[l?e.jsx(Z,{size:11}):e.jsx(ee,{size:11}),l?"Mikrofon on":"Mikrofon off"]}),e.jsxs(Ke,{$tone:d?"success":"danger",children:[d?e.jsx(_,{size:11}):e.jsx(X,{size:11}),d?"Kamera on":"Kamera off"]})]})]}),e.jsx(Tt,{children:p?e.jsxs(e.Fragment,{children:[e.jsx(ct,{onClick:()=>l?de(a):De(a),title:l?"Mic o'chirish":"Mic ruxsat",$danger:l,$success:!l,children:l?e.jsx(ee,{size:16}):e.jsx(Z,{size:16})}),e.jsx(ct,{onClick:()=>d?Ae(a):ae(a),title:d?"Cam o'chirish":"Cam ruxsat",$danger:d,$success:!d,children:d?e.jsx(X,{size:16}):e.jsx(_,{size:16})}),e.jsx(ct,{onClick:()=>G(a),title:"Chiqarib yuborish",$danger:!0,children:e.jsx(zr,{size:16})})]}):e.jsxs(e.Fragment,{children:[l?e.jsx(Z,{size:13,color:"var(--call-success)"}):e.jsx(ee,{size:13,color:"var(--call-danger)"}),d?e.jsx(_,{size:13,color:"var(--call-success)"}):e.jsx(X,{size:13,color:"var(--call-danger)"})]})})]},a)})]})]})]})]}),!j&&e.jsxs(un,{children:[e.jsxs(Ee,{$active:V,onClick:we,style:se?{opacity:.5,cursor:"not-allowed"}:{},children:[V?e.jsx(Z,{size:21}):e.jsx(ee,{size:21}),se&&e.jsx(pt,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),e.jsxs(Ee,{$active:M,onClick:K,style:L?{opacity:.5,cursor:"not-allowed"}:{},children:[M?e.jsx(_,{size:21}):e.jsx(X,{size:21}),L&&e.jsx(pt,{size:10,style:{position:"absolute",bottom:4,right:4}})]}),e.jsx(Ee,{$active:z,onClick:q,children:z?e.jsx(sr,{size:21}):e.jsx(Ie,{size:21})}),e.jsx(Ee,{$active:Ce,onClick:be,style:Ce?{background:"rgba(250,166,26,0.2)",color:"#faa61a"}:{},children:e.jsx(st,{size:21})}),p&&e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Ee,{$active:Q,onClick:()=>Q?ze():$e(a=>!a),style:Q?{background:"rgba(240,71,71,0.2)",color:"#f04747"}:{},children:e.jsx(ot,{size:21,fill:Q?"#f04747":"none"})}),Le&&!Q&&e.jsxs(fn,{children:[e.jsxs(Pt,{onClick:()=>Fe("screen"),children:[e.jsx(At,{$bg:"rgba(114,137,218,0.15)",children:e.jsx(Ie,{size:16,color:"#7289da"})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:600},children:"Ekranni yozish"}),e.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Faqat ekran + barcha ovozlar"})]})]}),e.jsxs(Pt,{onClick:()=>Fe("all"),children:[e.jsx(At,{$bg:"rgba(240,71,71,0.12)",children:e.jsx(ot,{size:16,color:"#f04747"})}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:600},children:"Hammasini yozish"}),e.jsx("div",{style:{fontSize:11,color:"#72767d"},children:"Barcha oynalar + barcha ovozlar"})]})]})]})]}),e.jsx(Ee,{$danger:!0,onClick:Me,children:e.jsx(Pe,{size:21})})]})]})},Dt=()=>{const t=new(window.AudioContext||window.webkitAudioContext),x=t.createOscillator(),b=t.createGain();x.connect(b),b.connect(t.destination),x.frequency.value=800,x.type="sine",b.gain.value=.3,x.start(),x.stop(t.currentTime+.2),setTimeout(()=>{const i=t.createOscillator(),j=t.createGain();i.connect(j),j.connect(t.destination),i.frequency.value=800,i.type="sine",j.gain.value=.3,i.start(),i.stop(t.currentTime+.2)},400)},Bt=()=>{const t=new(window.AudioContext||window.webkitAudioContext),x=t.createOscillator(),b=t.createGain();x.connect(b),b.connect(t.destination),x.frequency.value=600,x.type="sine",b.gain.value=.4,setTimeout(()=>{const i=t.createOscillator(),j=t.createGain();i.connect(j),j.connect(t.destination),i.frequency.value=600,i.type="sine",j.gain.value=.4},800)},bn=n.div`
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
`,vn=n.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,jn=n.div`
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
`,yn=n.div`
  text-align: center;
`,kn=n.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,wn=n.div`
  color: #43b581;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Cn=n.div`
  display: flex;
  gap: 16px;
`,Lt=n.button`
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
  
  ${t=>t.variant==="accept"?`
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
`,$n=({isOpen:t,onAccept:x,onReject:b,caller:i})=>{var p;const[j,h]=r.useState(0),y=r.useRef(null);r.useEffect(()=>{if(t){Bt(),y.current=setInterval(()=>{Bt()},2e3);const v=setInterval(()=>{h(m=>m+1)},1e3);return()=>{v&&clearInterval(v),y.current&&(clearInterval(y.current),y.current=null)}}},[t]);const $=v=>{const m=Math.floor(v/60),k=v%60;return`${m.toString().padStart(2,"0")}:${k.toString().padStart(2,"0")}`};return t?e.jsx(bn,{children:e.jsxs(vn,{children:[e.jsx(jn,{children:((p=i==null?void 0:i.name)==null?void 0:p[0])||"U"}),e.jsxs(yn,{children:[e.jsx(kn,{children:(i==null?void 0:i.name)||"Unknown"}),e.jsxs(wn,{children:[e.jsx(xt,{size:16}),$(j)]})]}),e.jsxs(Cn,{children:[e.jsx(Lt,{variant:"accept",onClick:x,children:e.jsx(Er,{size:24})}),e.jsx(Lt,{onClick:b,children:e.jsx(Pe,{size:24})})]})]})}):null},Sn=n.div`
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
`,Rn=n.div`
  background-color: #2f3136;
  border-radius: 20px;
  padding: 32px;
  width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,zn=n.div`
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
`,Tn=n.div`
  text-align: center;
`,En=n.div`
  color: #dcddde;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`,Mt=n.div`
  color: #b9bbbe;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,Pn=n.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
`,An=n.button`
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
  
  ${t=>t.variant==="cancel"?`
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
`,Dn=n.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`,lt=n.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #43b581;
  animation: ringing 1.4s infinite ease-in-out;
  
  ${t=>t.delay&&`
    animation-delay: ${t.delay}s;
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
`,Bn=({isOpen:t,onCancel:x,target:b})=>{var $;const[i,j]=r.useState(0),h=r.useRef(null);r.useEffect(()=>{if(t){Dt(),h.current=setInterval(()=>{Dt()},1500);const p=setInterval(()=>{j(v=>v+1)},1e3);return()=>{p&&clearInterval(p),h.current&&(clearInterval(h.current),h.current=null)}}},[t]);const y=p=>{const v=Math.floor(p/60),m=p%60;return`${v.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`};return t?e.jsx(Sn,{children:e.jsxs(Rn,{children:[e.jsx(zn,{children:(($=b==null?void 0:b.name)==null?void 0:$[0])||"U"}),e.jsxs(Tn,{children:[e.jsx(En,{children:(b==null?void 0:b.name)||"Unknown"}),e.jsxs(Mt,{children:[e.jsx(Pr,{size:16}),"Calling..."]}),e.jsxs(Mt,{children:[e.jsx(xt,{size:16}),y(i)]})]}),e.jsxs(Dn,{children:[e.jsx(lt,{}),e.jsx(lt,{delay:.2}),e.jsx(lt,{delay:.4})]}),e.jsx(Pn,{children:e.jsxs(An,{variant:"cancel",onClick:x,children:[e.jsx(Pe,{size:20}),"Cancel"]})})]})}):null},Ln=n.div`
  --call-bg: var(--background-color);
  --call-surface: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  --call-panel: color-mix(in srgb, var(--input-color) 88%, black 12%);
  --call-border: color-mix(in srgb, var(--border-color) 82%, transparent);
  --call-text: var(--text-color);
  --call-muted: var(--text-muted-color);
  --call-tint: color-mix(in srgb, var(--primary-color) 16%, transparent);
  --call-danger: var(--danger-color);
  position: fixed;
  inset: ${t=>t.$minimized?"auto 16px 16px auto":"0"};
  width: ${t=>t.$minimized?"320px":"auto"};
  height: ${t=>t.$minimized?"180px":"auto"};
  z-index: 10000;
  background: ${t=>t.$minimized?"var(--call-surface)":"var(--call-bg)"};
  border: ${t=>t.$minimized?"1px solid var(--call-border)":"none"};
  border-radius: ${t=>t.$minimized?"16px":"0"};
  box-shadow: ${t=>t.$minimized?"0 16px 40px rgba(0, 0, 0, 0.35)":"none"};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Mn=n.div`
  width: 100%;
  height: 100%;
  background: var(--background-color);
  display: flex;
  flex-direction: column;
`,Ot=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-surface) 90%, transparent);
  backdrop-filter: blur(10px);
`,It=n.div`
  min-width: 0;
  display: grid;
  gap: 2px;
`,Ye=n.div`
  color: var(--call-text);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,dt=n.div`
  color: var(--call-muted);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,qt=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Xe=n.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,On=n.div`
  flex: 1;
  min-height: 0;
  position: relative;
  background: color-mix(in srgb, var(--call-bg) 88%, black 12%);
`,In=n.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`,ut=n.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: black;
  transform: ${t=>t.$mirror?"scaleX(-1)":"none"};
`,Vt=n.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--call-panel) 88%, black 12%);
  color: var(--call-muted);
  padding: 20px;
  text-align: center;
`,Ft=n.div`
  display: grid;
  gap: 10px;
  justify-items: center;
`,Ht=n.div`
  width: ${t=>t.$small?"44px":"72px"};
  height: ${t=>t.$small?"44px":"72px"};
  border-radius: 50%;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${t=>t.$small?"16px":"24px"};
  font-weight: 800;
`,qn=n.div`
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--call-border);
  background: rgba(0, 0, 0, 0.46);
  color: white;
  font-size: 12px;
  font-weight: 700;
`,Vn=n.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--call-border);
  background: rgba(0, 0, 0, 0.42);
  color: white;
  font-size: 12px;
  font-weight: 600;
`,Fn=n.button`
  position: absolute;
  right: 16px;
  bottom: 84px;
  width: 188px;
  height: 132px;
  border-radius: 14px;
  border: 1px solid var(--call-border);
  background: var(--call-panel);
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    width: 144px;
    height: 104px;
    right: 12px;
    bottom: 78px;
  }
`,Hn=n.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 18px 18px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.28) 24%,
    rgba(0, 0, 0, 0.64) 100%
  );
`,Je=n.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid
    ${t=>t.$danger?"transparent":"color-mix(in srgb, white 12%, transparent)"};
  background: ${t=>t.$danger?"var(--call-danger)":t.$active?"rgba(255, 255, 255, 0.16)":"rgba(0, 0, 0, 0.38)"};
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,Un=n.button`
  flex: 1;
  border: none;
  background: var(--call-surface);
  padding: 14px;
  color: var(--call-text);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
`,Ut=n.div`
  color: var(--call-muted);
  font-size: 12px;
  line-height: 1.45;
`,_n=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--call-muted);
`,Nn=({isOpen:t,onClose:x,roomId:b,remoteUser:i,isCaller:j})=>{var we,K;const{t:h}=Ze(),y=et(D=>D.user),$=(y==null?void 0:y.nickname)||(y==null?void 0:y.username)||h("privateCall.localLabel"),[p,v]=r.useState(!1),[m,k]=r.useState(null),[f,S]=r.useState(null),P=r.useRef(!1),{localStream:C,remoteStreams:B,remotePeerStates:R,isMicOn:T,isCamOn:E,toggleMic:te,toggleCam:I,leaveCall:H,error:U,isScreenSharing:N,toggleScreenShare:ie,remoteScreenStreams:W,joinStatus:re}=dr({roomId:b,displayName:$,enabled:t&&!!b,isCreator:j,isPrivate:!1}),A=B[0],z=A?R[A.peerId]:null,q=(A==null?void 0:A.displayName)||(i==null?void 0:i.name)||h("privateCall.remoteLabel"),J=!!(A!=null&&A.stream)&&(z==null?void 0:z.hasVideo)!==!1&&(z==null?void 0:z.videoMuted)!==!0,ge=r.useCallback(D=>{D&&(A!=null&&A.stream)&&(D.srcObject=A.stream)},[A==null?void 0:A.stream]),fe=r.useCallback(D=>{D&&C&&(D.srcObject=C)},[C]),me=r.useCallback(D=>{var O;D&&((O=W[0])!=null&&O.stream)&&(D.srcObject=W[0].stream)},[W]),V=r.useCallback(()=>{H(),x()},[H,x]),M=r.useCallback(()=>{m&&!m.closed&&(P.current=!0,m.close()),k(null),S(null)},[m]);r.useEffect(()=>{!t&&m&&M()},[M,t,m]),r.useEffect(()=>{!p&&m&&M()},[M,p,m]),r.useEffect(()=>{if(!p||!m)return;const D=()=>{if(k(null),S(null),P.current){P.current=!1;return}v(!1)};return m.addEventListener("pagehide",D),()=>m.removeEventListener("pagehide",D)},[p,m]);const se=r.useCallback(async()=>{if(p){v(!1);return}const D=window==null?void 0:window.documentPictureInPicture;if(!(D!=null&&D.requestWindow)){v(!0);return}try{const O=await D.requestWindow({width:340,height:210});O.document.body.innerHTML="",O.document.body.style.margin="0",O.document.body.style.background="var(--background-color)",O.document.body.style.overflow="hidden",[...document.styleSheets].forEach(le=>{try{const F=[...le.cssRules].map(Ae=>Ae.cssText).join(""),de=document.createElement("style");de.textContent=F,O.document.head.appendChild(de)}catch{if(le.href){const F=document.createElement("link");F.rel="stylesheet",F.href=le.href,O.document.head.appendChild(F)}}});const ne=O.document.createElement("div");ne.style.width="100%",ne.style.height="100%",O.document.body.appendChild(ne),P.current=!1,k(O),S(ne),v(!0)}catch{v(!0)}},[p]),L=e.jsxs(e.Fragment,{children:[e.jsxs(Ot,{children:[e.jsxs(It,{children:[e.jsx(Ye,{children:q}),e.jsx(dt,{children:re==="joined"?b:h("groupCall.connecting")})]}),e.jsxs(qt,{children:[e.jsx(Xe,{type:"button",onClick:()=>v(!1),children:e.jsx(Ar,{size:16})}),e.jsx(Xe,{type:"button",onClick:V,children:e.jsx(Pe,{size:16})})]})]}),e.jsxs(Un,{type:"button",onClick:()=>v(!1),children:[e.jsxs("div",{children:[e.jsx(Ye,{children:q}),e.jsx(Ut,{children:(z==null?void 0:z.connectionState)||re||h("privateCall.calling")})]}),e.jsxs(_n,{children:[T?e.jsx(Z,{size:16,color:"#43b581"}):e.jsx(ee,{size:16,color:"#f04747"}),E?e.jsx(_,{size:16,color:"#43b581"}):e.jsx(X,{size:16,color:"#f04747"}),N?e.jsx(Ie,{size:16,color:"var(--primary-color)"}):null]})]})]});return t?p&&f?rr.createPortal(e.jsx(Mn,{children:L}),f):e.jsx(Ln,{$minimized:p,children:p?L:e.jsxs(e.Fragment,{children:[e.jsxs(Ot,{children:[e.jsxs(It,{children:[e.jsx(Ye,{children:q||h("privateCall.titleFallback")}),e.jsx(dt,{children:U||(re==="joined"?b:h("groupCall.connecting"))})]}),e.jsxs(qt,{children:[e.jsx(Xe,{type:"button",onClick:se,children:e.jsx(ir,{size:16})}),e.jsx(Xe,{type:"button",onClick:V,children:e.jsx(Pe,{size:16})})]})]}),e.jsx(On,{children:e.jsxs(In,{children:[W.length>0?e.jsx(ut,{ref:me,autoPlay:!0,playsInline:!0}):J?e.jsx(ut,{ref:ge,autoPlay:!0,playsInline:!0}):e.jsx(Vt,{children:e.jsxs(Ft,{children:[e.jsx(Ht,{children:((we=q==null?void 0:q.charAt(0))==null?void 0:we.toUpperCase())||"?"}),e.jsx(Ye,{children:q}),e.jsx(dt,{children:U||h(re==="joined"?"privateCall.calling":"groupCall.connecting")})]})}),e.jsxs(Vn,{children:[z!=null&&z.audioMuted?e.jsx(ee,{size:14}):e.jsx(Z,{size:14}),z!=null&&z.videoMuted||(z==null?void 0:z.hasVideo)===!1?e.jsx(X,{size:14}):e.jsx(_,{size:14}),e.jsx("span",{children:q})]}),e.jsx(qn,{children:W.length>0?e.jsxs(e.Fragment,{children:[e.jsx(Ie,{size:14}),h("privateCall.screenShareLabel")]}):null}),e.jsx(Fn,{type:"button",onClick:se,children:E&&C?e.jsx(ut,{ref:fe,autoPlay:!0,muted:!0,playsInline:!0,$mirror:!0}):e.jsx(Vt,{children:e.jsxs(Ft,{children:[e.jsx(Ht,{$small:!0,children:((K=$==null?void 0:$.charAt(0))==null?void 0:K.toUpperCase())||"?"}),e.jsx(Ut,{children:h("privateCall.localLabel")})]})})}),e.jsxs(Hn,{children:[e.jsx(Je,{type:"button",$active:T,onClick:te,children:T?e.jsx(Z,{size:22}):e.jsx(ee,{size:22})}),e.jsx(Je,{type:"button",$active:E,onClick:I,children:E?e.jsx(_,{size:22}):e.jsx(X,{size:22})}),e.jsx(Je,{type:"button",$active:N,onClick:ie,children:N?e.jsx(sr,{size:22}):e.jsx(Ie,{size:22})}),e.jsx(Je,{type:"button",$danger:!0,onClick:V,children:e.jsx(Pe,{size:22})})]})]})})]})}):null},Wn=ke`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,Kn=ke`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`,Gn=ke`
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,Qn=ke`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }
`,Yn=n.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(2, 6, 23, 0.78);
  backdrop-filter: blur(12px);
  animation: ${t=>t.$closing?Kn:Wn} 180ms ease
    forwards;

  @media (max-width: 640px) {
    padding: 12px;
    align-items: center;
  }
`,Xn=n.div`
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
  animation: ${t=>t.$closing?Qn:Gn} 180ms ease
    forwards;

  @media (max-width: 640px) {
    width: 100%;
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`,Jn=n.div`
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
`,Zn=n.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`,ea=n.div`
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
`,ta=n.div`
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
`;n.button`
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
`;const ra=n.div`
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
`,na=n.div`
  border-radius: 12px;
  padding: 12px;
  background: color-mix(
    in srgb,
    var(--meet-surface) 72%,
    var(--meet-primary-soft) 28%
  );
  border: 1px solid
    color-mix(in srgb, var(--meet-primary) 16%, var(--meet-border) 84%);

`,aa=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--meet-text);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 4px;
`,oa=n.p`
  margin: 0;
  color: var(--meet-muted);
  font-size: 12px;
  line-height: 1.45;
`,_t=n.div`
  border-radius: 12px;
  padding: 12px;
  background: color-mix(in srgb, var(--meet-surface) 76%, transparent);
  border: 1px solid var(--meet-border);
`,Nt=n.div`
  color: var(--meet-text);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 4px;
`,Wt=n.div`
  color: var(--meet-muted);
  font-size: 12px;
  line-height: 1.45;
  margin-bottom: 10px;
`,ia=n.div`
  display: grid;
  gap: 10px;
`,Kt=n.label`
  display: grid;
  gap: 6px;
  color: var(--meet-muted);
  font-size: 12px;
  font-weight: 700;
`,ur=Oe`
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
`,sa=n.input`
  ${ur};
  min-height: 40px;
  padding: 0 12px;
  font-size: 13px;
`,ca=n.textarea`
  ${ur};
  min-height: 84px;
  padding: 10px 12px;
  resize: vertical;
  font-size: 13px;
  line-height: 1.5;
`,la=n.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Gt=n.button`
  border: 1px solid
    ${t=>t.$active?"color-mix(in srgb, var(--meet-primary) 55%, white 45%)":"var(--meet-border)"};
  background: ${t=>t.$active?"color-mix(in srgb, var(--meet-primary-soft) 70%, var(--meet-surface-2) 30%)":"color-mix(in srgb, var(--meet-surface-2) 90%, transparent)"};
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  cursor: pointer;
`,Qt=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
`,Yt=n.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--meet-soft) 72%, transparent);
  color: var(--meet-accent);
  display: flex;
  align-items: center;
  justify-content: center;
`,Xt=n.div`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${t=>t.$active?"var(--meet-primary-soft)":"color-mix(in srgb, var(--meet-soft) 72%, transparent)"};
  color: ${t=>t.$active?"color-mix(in srgb, var(--meet-primary) 78%, white 22%)":"var(--meet-muted)"};
  font-size: 10px;
  font-weight: 800;
`,Jt=n.div`
  color: var(--meet-text);
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 3px;
`,Zt=n.div`
  color: var(--meet-muted);
  font-size: 11px;
  line-height: 1.4;
`,da=n.div`
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
`,ua=n.div`
  color: var(--meet-muted);
  font-size: 11px;
  line-height: 1.4;
`,pa=n.div`
  display: flex;
  gap: 8px;

  @media (max-width: 640px) {
    width: 100%;
  }
`,er=n.button`
  min-width: 112px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid
    ${t=>t.$variant==="primary"?"transparent":"var(--meet-border)"};
  border-radius: 10px;
  background: ${t=>t.$variant==="primary"?"var(--meet-primary)":"color-mix(in srgb, var(--meet-soft) 72%, transparent)"};
  color: ${t=>t.$variant==="primary"?"white":"var(--meet-text)"};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  opacity: ${t=>t.disabled?.55:1};
  pointer-events: ${t=>t.disabled?"none":"auto"};

  @media (max-width: 640px) {
    flex: 1;
    min-width: 0;
  }
`,tr=180,xa=({isOpen:t,onClose:x,onCreateCall:b})=>{const{t:i}=Ze(),[j,h]=r.useState(""),[y,$]=r.useState(""),[p,v]=r.useState(!1),[m,k]=r.useState(t),[f,S]=r.useState(!1),P=()=>{h(""),$(""),v(!1)};r.useEffect(()=>{if(t){k(!0),S(!1);return}if(!m)return;S(!0);const T=setTimeout(()=>{k(!1),S(!1),P()},tr);return()=>clearTimeout(T)},[t,m]);const C=()=>{f||(S(!0),setTimeout(()=>{x==null||x()},tr))},B=()=>{j.trim()&&(b({title:j.trim(),description:y.trim(),isPrivate:p}),C())},R=r.useMemo(()=>i(p?"meetDialog.privacyPrivateHint":"meetDialog.privacyPublicHint"),[p,i]);return m?e.jsx(Yn,{$closing:f,onClick:C,children:e.jsxs(Xn,{$closing:f,onClick:T=>T.stopPropagation(),children:[e.jsxs(Jn,{children:[e.jsxs(Zn,{children:[e.jsx(ea,{children:e.jsx(_,{size:26})}),e.jsxs(ta,{children:[e.jsx("h2",{children:i("meetDialog.title")}),e.jsx("p",{children:i("meetDialog.subtitle")})]})]}),e.jsx(Lr,{onClick:C,children:e.jsx(Dr,{size:18})})]}),e.jsxs(ra,{children:[e.jsxs(na,{children:[e.jsxs(aa,{children:[e.jsx(_,{size:16}),i("meetDialog.heroTitle")]}),e.jsx(oa,{children:i("meetDialog.heroDescription")})]}),e.jsxs(_t,{children:[e.jsx(Nt,{children:i("meetDialog.detailsTitle")}),e.jsx(Wt,{children:i("meetDialog.detailsDescription")}),e.jsxs(ia,{children:[e.jsxs(Kt,{children:[i("meetDialog.name"),e.jsx(sa,{value:j,onChange:T=>h(T.target.value.slice(0,Ne.meetTitleChars)),placeholder:i("meetDialog.namePlaceholder"),maxLength:Ne.meetTitleChars,autoFocus:!0})]}),e.jsxs(Kt,{children:[i("meetDialog.description"),e.jsx(ca,{value:y,onChange:T=>$(T.target.value.slice(0,Ne.meetDescriptionChars)),placeholder:i("meetDialog.descriptionPlaceholder"),maxLength:Ne.meetDescriptionChars})]})]})]}),e.jsxs(_t,{children:[e.jsx(Nt,{children:i("meetDialog.privacyTitle")}),e.jsx(Wt,{children:R}),e.jsxs(la,{children:[e.jsxs(Gt,{type:"button",$active:!p,onClick:()=>v(!1),children:[e.jsxs(Qt,{children:[e.jsx(Yt,{children:e.jsx(Br,{size:18})}),e.jsx(Xt,{$active:!p,children:i("meetDialog.publicBadge")})]}),e.jsx(Jt,{children:i("meetDialog.publicTitle")}),e.jsx(Zt,{children:i("meetDialog.publicDescription")})]}),e.jsxs(Gt,{type:"button",$active:p,onClick:()=>v(!0),children:[e.jsxs(Qt,{children:[e.jsx(Yt,{children:e.jsx(pt,{size:18})}),e.jsx(Xt,{$active:p,children:i("meetDialog.privateBadge")})]}),e.jsx(Jt,{children:i("meetDialog.privateTitle")}),e.jsx(Zt,{children:i("meetDialog.privateDescription")})]})]})]})]}),e.jsxs(da,{children:[e.jsx(ua,{children:i("meetDialog.footerNote")}),e.jsxs(pa,{children:[e.jsx(er,{onClick:C,children:i("common.cancel")}),e.jsx(er,{$variant:"primary",onClick:B,disabled:!j.trim(),children:i("meetDialog.create")})]})]})]})}):null},Ca=Object.freeze(Object.defineProperty({__proto__:null,GroupVideoCall:hn,IncomingCallRequest:$n,OutgoingCallRequest:Bn,PrivateVideoCall:Nn,UniversalDialog:xa},Symbol.toStringTag,{value:"Module"}));export{wa as C,Bn as O,ya as P,Or as a,Ca as i,ka as u};
