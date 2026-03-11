const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/feature-calls-BqelebZ9.js","assets/react-vendor-UYnqoc53.js","assets/vendor-CRWlb9wI.js","assets/app-vendor-DTdcG8Is.js","assets/media-realtime-B2IcwcIy.js","assets/feature-admin-D0NNr8sf.js","assets/ui-vendor-DFyM_Xd9.js","assets/feature-arena-BvqxMZzZ.js","assets/AuthPage-CQ0LraLa.js","assets/feature-chats-DsVJGdS1.js","assets/router-query-D08THUDE.js","assets/JoinCallPage-ByaOVt_Z.js","assets/feature-courses-Blusa5xA.js","assets/feature-profile-shell-CAAc0ZH1.js","assets/feature-content-DeOnU20_.js"])))=>i.map(i=>d[i]);
import{c as te}from"./vendor-CRWlb9wI.js";import{j as e,R as v,u as je,r as x,a as Ce,N as ee,b as Re,c as j,d as we,e as oe,z as I}from"./react-vendor-UYnqoc53.js";import{a as se,u as $,A as re}from"./feature-admin-D0NNr8sf.js";import{u as Oe}from"./feature-calls-BqelebZ9.js";import{d as n,m as ne,S as qe,a as Ne,D as He,C as We,b as Ve,U as Fe,A as Ue,L as Ye,c as ae,e as Ge,H as Je,f as ke,T as Pe,R as Me,B as G,g as ze,h as Qe,Z as Ke,G as Xe,X as Ze,i as er,j as rr}from"./ui-vendor-DFyM_Xd9.js";import{u as ir}from"./feature-chats-DsVJGdS1.js";const J="",Li=te(r=>({isOpen:!1,message:J,source:null,openPremiumUpgradeModal:({message:s=J,source:o=null}={})=>r({isOpen:!0,message:s,source:o}),closePremiumUpgradeModal:()=>r({isOpen:!1,message:J,source:null})})),tr=async()=>{const{data:r}=await se.get("/users/profile-decorations");return Array.isArray(r)?r:[]},Ei=async r=>{const{data:s}=await se.patch("/users/me/profile-decoration",{decorationId:r||null});return s},Ai=async r=>{const s=new FormData;s.append("file",r);const{data:o}=await se.patch("/users/me/profile-decoration-image",s,{headers:{"Content-Type":"multipart/form-data"}});return o},or=te((r,s)=>({decorations:[],loaded:!1,loading:!1,fetchDecorations:async(o=!1)=>{const{loaded:d,loading:i}=s();if(i||d&&!o)return s().decorations;r({loading:!0});try{const h=await tr();return r({decorations:h,loaded:!0,loading:!1}),h}catch{return r({loading:!1,loaded:!0}),[]}}})),Se=n.div`
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`,sr=n.div`
  width: min(100%, 560px);
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 32px;
  box-sizing: border-box;
`,nr=n.h1`
  margin: 0 0 12px;
  font-size: 28px;
  color: var(--text-color);
`,ar=n.p`
  margin: 0;
  line-height: 1.7;
  color: var(--text-muted-color);
`,lr=n(Se)`
  font-size: 15px;
  width: 100vw;
`,dr=n.div`
  width: min(100%, 280px);
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 18px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
`,cr=n.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-top-color: var(--primary-color);
  animation: systemStateSpin 0.8s linear infinite;

  @keyframes systemStateSpin {
    to {
      transform: rotate(360deg);
    }
  }
`,mr=n.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,pr=n.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`,ur=n.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;function le({title:r,description:s}){return e.jsx(Se,{children:e.jsxs(sr,{children:[e.jsx(nr,{children:r}),e.jsx(ar,{children:s})]})})}function Te({message:r="Yuklanmoqda..."}){return e.jsx(lr,{children:e.jsxs(dr,{children:[e.jsx(cr,{}),e.jsxs(mr,{children:[e.jsx(pr,{children:r}),e.jsx(ur,{children:"Tizim tayyorlanmoqda"})]})]})})}const hr={loading:!0,maintenanceMode:!1,maintenanceMessage:""};function Ri({children:r}){const[s,o]=v.useState(hr),[d,i]=v.useState(!1),h=je(),l=$(u=>u.user),m=or(u=>u.fetchDecorations);return v.useEffect(()=>{let u=!1;return(async()=>{try{const p=await(await fetch(`${re}/app/status`,{credentials:"include"})).json();u||o({loading:!1,maintenanceMode:!!(p!=null&&p.maintenanceMode),maintenanceMessage:(p==null?void 0:p.maintenanceMessage)||""})}catch{u||o({loading:!1,maintenanceMode:!1,maintenanceMessage:""})}})(),()=>{u=!0}},[]),v.useEffect(()=>{!(l!=null&&l._id)&&!(l!=null&&l.id)||m()},[m,l==null?void 0:l._id,l==null?void 0:l.id]),v.useEffect(()=>{if(!s.loading){i(!1);return}const u=window.setTimeout(()=>{i(!0)},250);return()=>window.clearTimeout(u)},[s.loading]),h.pathname==="/blocked"?e.jsx(le,{title:"Hisob bloklangan",description:"Hisobingiz bloklangan. Qo'llab-quvvatlash bilan bog'laning."}):s.loading&&d?e.jsx(Te,{}):s.loading?null:h.pathname==="/maintenance"||s.maintenanceMode?e.jsx(le,{title:"Texnik ishlar olib borilmoqda",description:s.maintenanceMessage||"Iltimos, birozdan keyin qayta urinib ko'ring."}):r}const xr="modulepreload",gr=function(r){return"/"+r},de={},M=function(s,o,d){let i=Promise.resolve();if(o&&o.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),m=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=Promise.allSettled(o.map(u=>{if(u=gr(u),u in de)return;de[u]=!0;const y=u.endsWith(".css"),g=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${g}`))return;const p=document.createElement("link");if(p.rel=y?"stylesheet":xr,y||(p.as="script"),p.crossOrigin="",p.href=u,m&&p.setAttribute("nonce",m),document.head.appendChild(p),y)return new Promise((w,f)=>{p.addEventListener("load",w),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${u}`)))})}))}function h(l){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=l,window.dispatchEvent(m),!m.defaultPrevented)throw l}return i.then(l=>{for(const m of l||[])m.status==="rejected"&&h(m.reason);return s().catch(h)})},fr=x.lazy(()=>M(()=>import("./feature-calls-BqelebZ9.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(r=>({default:r.IncomingCallRequest}))),br=x.lazy(()=>M(()=>import("./feature-calls-BqelebZ9.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(r=>({default:r.OutgoingCallRequest}))),yr=x.lazy(()=>M(()=>import("./feature-calls-BqelebZ9.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(r=>({default:r.PrivateVideoCall})));function Oi(){const{incomingCall:r,outgoingCall:s,activeCall:o,acceptCall:d,rejectCall:i,cancelCall:h,endActiveCall:l}=Oe();return e.jsxs(x.Suspense,{fallback:null,children:[r&&e.jsx(fr,{isOpen:!!r,caller:r.fromUser,onAccept:d,onReject:i}),s&&e.jsx(br,{isOpen:!!s,target:s.targetUser,onCancel:h}),o&&e.jsx(yr,{isOpen:!!o,roomId:o.roomId,remoteUser:o.remoteUser,isCaller:o.isCaller,onClose:l})]})}const B=te(r=>({activeCall:null,isMinimized:!1,startCall:s=>r({activeCall:s,isMinimized:!1}),minimizeCall:()=>r({isMinimized:!0}),maximizeCall:()=>r({isMinimized:!1}),endCall:()=>r({activeCall:null,isMinimized:!1})})),vr=x.lazy(()=>M(()=>import("./feature-calls-BqelebZ9.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7])).then(r=>({default:r.GroupVideoCall})));function qi(){const r=Ce(),s=je(),o=$(g=>g.user),d=B(g=>g.activeCall),i=B(g=>g.isMinimized),h=B(g=>g.minimizeCall),l=B(g=>g.maximizeCall),m=B(g=>g.endCall);if(v.useEffect(()=>{s.pathname.startsWith("/join/")||sessionStorage.setItem("meet_return_path",`${s.pathname}${s.search}${s.hash}`)},[s.pathname,s.search,s.hash]),!(d!=null&&d.roomId))return null;const u=()=>{const g=d.returnPath||"/chats";m(),s.pathname.startsWith("/join/")&&r(g)},y=()=>{h(),s.pathname.startsWith("/join/")&&o&&r(d.returnPath||"/chats")};return e.jsx(x.Suspense,{fallback:null,children:e.jsx(vr,{isOpen:!0,roomId:d.roomId,chatTitle:d.chatTitle,displayName:d.displayName,isCreator:d.isCreator,isPrivate:d.isPrivate,initialMicOn:d.initialMicOn,initialCamOn:d.initialCamOn,isMinimized:i,onMinimize:y,onMaximize:l,onClose:u})})}function _({children:r}){const s=$(m=>m.user),o=$(m=>m.initialized),d=$(m=>m.loading),i=$(m=>m.bootstrapAuth),[h,l]=v.useState(!1);return v.useEffect(()=>{i()},[i]),v.useEffect(()=>{if(!d||o){l(!1);return}const m=window.setTimeout(()=>{l(!0)},250);return()=>window.clearTimeout(m)},[o,d]),(!o||d)&&h?e.jsx(Te,{}):!o||d?null:s?r:e.jsx(ee,{to:"/login",replace:!0})}const jr=x.lazy(()=>M(()=>import("./AuthPage-CQ0LraLa.js"),__vite__mapDeps([8,1,2,3,6,5,0,4,7,9,10]))),Cr=x.lazy(()=>M(()=>import("./JoinCallPage-ByaOVt_Z.js"),__vite__mapDeps([11,1,2,3,6,9,7,4,5,0,10]))),S=x.lazy(()=>M(()=>Promise.resolve().then(()=>$e),void 0)),ce=x.lazy(()=>M(()=>Promise.resolve().then(()=>Sr),void 0));function Ni(){return e.jsx(x.Suspense,{fallback:null,children:e.jsxs(Re,{children:[e.jsx(j,{path:"/maintenance",element:null}),e.jsx(j,{path:"/blocked",element:null}),e.jsx(j,{path:"/login",element:e.jsx(jr,{})}),e.jsx(j,{path:"/join/:roomId",element:e.jsx(Cr,{})}),e.jsx(j,{path:"/arena",element:e.jsx(S,{forcedNav:"arena"})}),e.jsx(j,{path:"/arena/:resourceId",element:e.jsx(S,{forcedNav:"arena"})}),e.jsx(j,{path:"/arena/:resourceId/:lessonId",element:e.jsx(S,{forcedNav:"arena"})}),e.jsx(j,{path:"/arena/quiz/:resourceId",element:e.jsx(S,{forcedNav:"arena"})}),e.jsx(j,{path:"/arena/quiz/:resourceId/:lessonId",element:e.jsx(S,{forcedNav:"arena"})}),e.jsx(j,{path:"/arena/quiz-link/:resourceId",element:e.jsx(S,{forcedNav:"arena"})}),e.jsx(j,{path:"/",element:e.jsx(_,{children:e.jsx(ee,{to:"/chats",replace:!0})})}),e.jsx(j,{path:"/home",element:e.jsx(_,{children:e.jsx(ee,{to:"/chats",replace:!0})})}),e.jsx(j,{path:"/a/:chatId",element:e.jsx(_,{children:e.jsx(ce,{})})}),e.jsx(j,{path:"/:nav",element:e.jsx(_,{children:e.jsx(ce,{})})}),e.jsx(j,{path:"/:nav/:resourceId",element:e.jsx(_,{children:e.jsx(S,{})})}),e.jsx(j,{path:"/:nav/:resourceId/:lessonId",element:e.jsx(_,{children:e.jsx(S,{})})})]})})}const t={postsPerDay:{ordinary:10,premium:20},postCommentsPerPost:{ordinary:5,premium:10},blogsPerUser:{ordinary:10,premium:30},blogCommentsPerBlog:{ordinary:5,premium:10},blogImagesPerBlog:{ordinary:2,premium:5},blogWords:{ordinary:1e3,premium:2e3},groupsCreated:{ordinary:3,premium:6},groupsJoined:{ordinary:10,premium:20},meetsCreated:{ordinary:2,premium:4},meetParticipants:{ordinary:10,premium:40},coursesCreated:{ordinary:2,premium:6},lessonsPerCourse:{ordinary:10,premium:30},lessonVideosPerLesson:{ordinary:1,premium:3},testsCreated:{ordinary:10,premium:20},testShareLinksPerTest:{ordinary:2,premium:4},flashcardsCreated:{ordinary:10,premium:20},sentenceBuildersCreated:{ordinary:10,premium:20},sentenceBuilderShareLinksPerDeck:{ordinary:2,premium:4},blogTitleChars:120,blogExcerptChars:220,blogTagChars:24,blogTagCount:8,postCommentChars:400,blogCommentChars:400,groupNameChars:60,groupDescriptionChars:240,messageChars:400,meetTitleChars:80,meetDescriptionChars:240,courseNameChars:120,courseDescriptionChars:500,lessonTitleChars:120,lessonDescriptionChars:1e3,nicknameChars:30,usernameChars:24,bioChars:160,testTitleChars:120,testDescriptionChars:300,testQuestionChars:240,testOptionChars:140,flashcardTitleChars:120,flashcardSideChars:220,sentenceBuilderTitleChars:120,sentenceBuilderDescriptionChars:300,sentenceBuilderPromptChars:240,sentenceBuilderAnswerChars:240,blogWordsOrdinary:1e3,blogWordsPremium:2e3,blogImagesOrdinary:2,blogImagesPremium:5,postWords:100,lessonMediaBytes:200*1024*1024,lessonHomeworkPerLesson:{ordinary:1,premium:3},lessonTestsPerLesson:{ordinary:1,premium:1},homeworkTextChars:2e3,homeworkLinkChars:300,homeworkPhotoBytes:10*1024*1024,homeworkAudioBytes:20*1024*1024,homeworkVideoBytes:100*1024*1024,homeworkPdfBytes:20*1024*1024},Hi=r=>(r==null?void 0:r.premiumStatus)==="active"||(r==null?void 0:r.premiumStatus)==="premium",Wi=(r="")=>String(r).trim().split(/\s+/).filter(Boolean).length,Vi=(r="")=>Array.from(String(r||"").matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)).length,wr=x.lazy(()=>M(()=>import("./feature-courses-Blusa5xA.js").then(r=>r.J),__vite__mapDeps([12,1,2,3,9,7,6,4,5,0,10,13,14])));function kr({forcedNav:r}){const{nav:s,chatId:o,resourceId:d,lessonId:i}=we();return e.jsx(x.Suspense,{fallback:null,children:e.jsx(wr,{initialNav:r||s||"feed",initialResourceId:o||d||"0",initialLesson:i})})}const $e=Object.freeze(Object.defineProperty({__proto__:null,default:kr},Symbol.toStringTag,{value:"Module"})),Pr=x.lazy(()=>M(()=>Promise.resolve().then(()=>$e),void 0)),Mr=["feed","blogs","chats","users","groups","courses","arena","meets","profile","admin","login","register","join"];function zr(){const{nav:r,chatId:s}=we(),o=Ce(),{resolveChatSlug:d}=ir(),[i,h]=v.useState(!1);return v.useEffect(()=>{let l;if(!r&&s)l=s;else if(r&&!Mr.includes(r)&&r!=="a")l=r;else return;h(!0),d(l).then(m=>{if(m!=null&&m.jammId){const u=m.type==="group"||m.isGroup?`/groups/${m.jammId}`:`/users/${m.jammId}`;o(u,{replace:!0});return}o("/chats",{replace:!0}),h(!1)}).catch(()=>{o("/chats",{replace:!0}),h(!1)})},[s,r,o,d]),i?null:e.jsx(x.Suspense,{fallback:null,children:e.jsx(Pr,{})})}const Sr=Object.freeze(Object.defineProperty({__proto__:null,default:zr},Symbol.toStringTag,{value:"Module"})),Tr=ne`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,$r=ne`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,Ie=n.div`
  position: fixed;
  inset: 0;
  z-index: ${r=>r.$zIndex||1e3};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${r=>r.$padding||"20px"};
  background: ${r=>r.$overlay||"var(--overlay-color, rgba(0, 0, 0, 0.7))"};
  backdrop-filter: ${r=>r.$backdrop||"blur(4px)"};
  animation: ${Tr} 0.18s ease-out;

  @media (max-width: 768px) {
    padding: ${r=>r.$paddingMobile||"12px"};
  }
`,_e=n.div`
  width: ${r=>r.$width||"min(100%, 520px)"};
  max-width: ${r=>r.$maxWidth||"100%"};
  max-height: ${r=>r.$maxHeight||"90vh"};
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${r=>r.$glass?"var(--secondary-color-with-opacity)":"var(--secondary-color)"};
  backdrop-filter: ${r=>r.$glass?"blur(5px) saturate(150%)":"none"};
  border: 1px solid var(--border-color);
  border-radius: ${r=>r.$radius||"18px"};
  box-shadow: 0 16px 48px var(--shadow-color-strong, rgba(0, 0, 0, 0.28));
  animation: ${$r} 0.22s ease-out;
  @media (max-width: 768px) {
    width: ${r=>r.$mobileFull?"100%":r.$width||"100%"};
    max-width: 100%;
    max-height: ${r=>r.$mobileFull?"calc(100vh - 24px)":r.$maxHeight||"90vh"};
    height: auto;
    min-height: 0;
    border-radius: ${r=>r.$radius||"18px"};
  }
`,Be=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: ${r=>r.$padding||"16px 18px"};
  border-bottom: 1px solid var(--border-color);
`,Ir=n.div`
  min-width: 0;
  flex: 1;
`,_r=n.h2`
  margin: 0;
  color: var(--text-color);
  font-size: ${r=>r.$size||"17px"};
  font-weight: 700;
`,Br=n.p`
  margin: 6px 0 0;
  color: var(--text-muted-color);
  font-size: 13px;
`,De=n.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;

  &:hover {
    background: var(--hover-color);
  }
`,Le=n.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${r=>r.$padding||"18px"};
`,Ee=n.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: ${r=>r.$padding||"14px 18px"};
  border-top: 1px solid var(--border-color);
  background: ${r=>r.$background||"transparent"};
`,ie=n.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    opacity 0.15s ease,
    transform 0.15s ease;
  opacity: ${r=>r.disabled?.55:1};
  pointer-events: ${r=>r.disabled?"none":"auto"};

  ${r=>r.$variant==="danger"?`
        background: var(--danger-color, var(--primary-color));
        color: white;

        &:hover {
          background: var(--danger-hover-color, var(--hover-color));
          transform: translateY(-1px);
        }
      `:r.$variant==="ghost"?`
        background: transparent;
        color: var(--text-color);

        &:hover {
          background: var(--hover-color);
        }
      `:`
      background: var(--primary-color);
      color: white;

      &:hover {
        transform: translateY(-1px);
      }
    `}
`,me="jamm-install-prompt-dismissed-v1",Dr=n.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,Lr=n.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--tertiary-color, var(--input-color));
`,Er=n.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--input-color);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,Ar=n.div`
  min-width: 0;
`,Rr=n.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
`,Or=n.p`
  margin: 6px 0 0;
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.55;
`,pe=n.div`
  display: grid;
  gap: 10px;
`,D=n.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
`,L=n.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
`,E=n.div`
  min-width: 0;
`,A=n.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
`,R=n.div`
  margin-top: 4px;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;
`,ue=n.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;
  padding: 0 2px;
`;function qr(){var o,d;if(typeof window>"u")return!1;const r=(d=(o=window.matchMedia)==null?void 0:o.call(window,"(display-mode: standalone)"))==null?void 0:d.matches,s=window.navigator.standalone===!0;return!!(r||s)}function Nr(){if(typeof window>"u")return!1;const r=window.navigator.userAgent||"";return/iPad|iPhone|iPod/.test(r)||r.includes("Mac")&&"ontouchend"in document}function Fi({currentUser:r}){const{t:s}=oe(),[o,d]=x.useState(null),[i,h]=x.useState(!1),[l,m]=x.useState(()=>qr()),u=x.useMemo(()=>Nr(),[]);x.useEffect(()=>{if(l)return;const p=f=>{f.preventDefault(),d(f)},w=()=>{m(!0),h(!1)};return window.addEventListener("beforeinstallprompt",p),window.addEventListener("appinstalled",w),()=>{window.removeEventListener("beforeinstallprompt",p),window.removeEventListener("appinstalled",w)}},[l]),x.useEffect(()=>{if(!(r!=null&&r._id)||l||localStorage.getItem(me)==="done")return;const p=window.setTimeout(()=>{(u||o)&&h(!0)},1800);return()=>window.clearTimeout(p)},[r==null?void 0:r._id,l,u,o]);const y=()=>{localStorage.setItem(me,"done"),h(!1)},g=async()=>{if(u||!o){y();return}o.prompt();const p=await o.userChoice;(p==null?void 0:p.outcome)==="accepted"?h(!1):y(),d(null)};return!i||l||!(r!=null&&r._id)?null:e.jsx(Ie,{$zIndex:1400,children:e.jsxs(_e,{$width:"min(100%, 520px)",$radius:"20px",children:[e.jsxs(Be,{children:[e.jsxs(Ir,{children:[e.jsx(_r,{children:s("installPrompt.title")}),e.jsx(Br,{children:s("installPrompt.subtitle")})]}),e.jsx(De,{type:"button",onClick:y,"aria-label":s("common.cancel"),children:"×"})]}),e.jsx(Le,{children:e.jsxs(Dr,{children:[e.jsxs(Lr,{children:[e.jsx(Er,{children:e.jsx(qe,{size:20})}),e.jsxs(Ar,{children:[e.jsx(Rr,{children:s("installPrompt.heroTitle")}),e.jsx(Or,{children:s("installPrompt.heroDescription")})]})]}),u?e.jsxs(e.Fragment,{children:[e.jsxs(pe,{children:[e.jsxs(D,{children:[e.jsx(L,{children:"1"}),e.jsxs(E,{children:[e.jsx(A,{children:s("installPrompt.ios.step1Title")}),e.jsx(R,{children:s("installPrompt.ios.step1Description")})]})]}),e.jsxs(D,{children:[e.jsx(L,{children:"2"}),e.jsxs(E,{children:[e.jsx(A,{children:s("installPrompt.ios.step2Title")}),e.jsx(R,{children:s("installPrompt.ios.step2Description")})]})]}),e.jsxs(D,{children:[e.jsx(L,{children:"3"}),e.jsxs(E,{children:[e.jsx(A,{children:s("installPrompt.ios.step3Title")}),e.jsx(R,{children:s("installPrompt.ios.step3Description")})]})]})]}),e.jsx(ue,{children:s("installPrompt.ios.hint")})]}):e.jsxs(e.Fragment,{children:[e.jsxs(pe,{children:[e.jsxs(D,{children:[e.jsx(L,{children:"1"}),e.jsxs(E,{children:[e.jsx(A,{children:s("installPrompt.android.step1Title")}),e.jsx(R,{children:s("installPrompt.android.step1Description")})]})]}),e.jsxs(D,{children:[e.jsx(L,{children:"2"}),e.jsxs(E,{children:[e.jsx(A,{children:s("installPrompt.android.step2Title")}),e.jsx(R,{children:s("installPrompt.android.step2Description")})]})]})]}),e.jsx(ue,{children:s("installPrompt.android.hint")})]})]})}),e.jsxs(Ee,{children:[e.jsx(ie,{type:"button",$variant:"ghost",onClick:y,children:s("installPrompt.later")}),e.jsx(ie,{type:"button",onClick:g,children:u?e.jsxs(e.Fragment,{children:[e.jsx(Ne,{size:15}),s("installPrompt.showSteps")]}):e.jsxs(e.Fragment,{children:[e.jsx(He,{size:15}),s("installPrompt.install")]})})]})]})})}const Hr=({width:r=20,height:s=20,color:o="var(--primary-color)"})=>e.jsx("svg",{width:r,height:s,viewBox:"0 0 24 24",fill:o,style:{display:"inline-block",verticalAlign:"middle",marginLeft:"4px"},children:e.jsx("path",{d:"M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-1.01-1.01-2.52-1.27-3.91-.81-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01 1.01-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-1.01 1.27-2.52.81-3.91 1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"})}),Wr=({width:r,height:s,color:o})=>e.jsx(Hr,{width:r,height:s,color:o}),Vr=ne`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`,Fr=n.div`
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
`,Ur=n.div`
  width: 100%;
  max-width: 600px;
  background: #2f3136;
  border-radius: 24px;
  border: 1px solid rgba(88, 101, 242, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  animation: ${Vr} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`,Yr=n.div`
  padding: 24px 32px 0;
  display: flex;
  gap: 8px;
`,Gr=n.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${r=>r.$progress}%;
    background: linear-gradient(90deg, #5865f2, #7b6cf6);
    transition: width 0.4s ease;
  }
`,O=n.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,q=n.div`
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
`,N=n.h2`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
`,H=n.p`
  font-size: 16px;
  color: #b9bbbe;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 32px;
`,Q=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,K=n.button`
  padding: 16px;
  background: ${r=>r.$active?"rgba(88, 101, 242, 0.1)":"#202225"};
  border: 2px solid ${r=>r.$active?"#5865f2":"transparent"};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${r=>r.$active?"#fff":"#b9bbbe"};

  &:hover {
    background: ${r=>r.$active?"rgba(88, 101, 242, 0.15)":"rgba(255,255,255,0.05)"};
    transform: translateY(-2px);
  }

  svg {
    color: ${r=>r.$active?"#5865f2":"#72767d"};
  }
`,X=n.span`
  font-size: 14px;
  font-weight: 600;
`,Jr=n.div`
  padding: 24px 32px;
  background: rgba(32, 34, 37, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,he=n.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${r=>r.$primary?`
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
`,Qr=[{id:"dev",label:"Dasturlash",icon:e.jsx(Qe,{size:24})},{id:"sci",label:"Fan va Texnika",icon:e.jsx(Ke,{size:24})},{id:"lang",label:"Tillar",icon:e.jsx(Xe,{size:24})},{id:"math",label:"Matematika",icon:e.jsx(ze,{size:24})}],Kr=[{id:"learn",label:"O'rganish",icon:e.jsx(ze,{size:24})},{id:"compete",label:"Musobaqalashish",icon:e.jsx(ke,{size:24})},{id:"fun",label:"Ko'ngilochar",icon:e.jsx(Me,{size:24})},{id:"social",label:"Muloqot",icon:e.jsx(Pe,{size:24})}],Xr=[{id:"beg",label:"Boshlang'ich",icon:e.jsx(G,{size:24})},{id:"int",label:"O'rta daraja",icon:e.jsx(G,{size:24})},{id:"adv",label:"Kuchli bilim",icon:e.jsx(G,{size:24})}],Zr=()=>{const[r,s]=x.useState(1),[o,d]=x.useState({username:"",gender:"",age:"",interests:[],goals:[],level:""}),[i,h]=x.useState(""),[l,m]=x.useState(!1),[u,y]=x.useState(!1),g=$(a=>a.updateUser),p=5;x.useEffect(()=>{const b=setTimeout(async()=>{const k=o.username.trim();if(!k){h(""),y(!1);return}if(!/^[a-zA-Z0-9]{8,30}$/.test(k)){h("Kamida 8 harf/raqam"),y(!1);return}m(!0);try{(await(await fetch(`${re}/users/check-username/${k}`,{credentials:"include"})).json()).available?(h(""),y(!0)):(h("Bu username band!"),y(!1))}catch{h("Xatolik")}finally{m(!1)}},500);return()=>clearTimeout(b)},[o.username,token]);const w=a=>{d(b=>({...b,interests:b.interests.includes(a)?b.interests.filter(k=>k!==a):[...b.interests,a]}))},f=a=>{d(b=>({...b,goals:b.goals.includes(a)?b.goals.filter(k=>k!==a):[...b.goals,a]}))},Y=async()=>{if(!o.username)return I.error("Username kiriting");if(!o.gender)return I.error("Jinsingizni tanlang");if(!o.age)return I.error("Yoshingizni kiriting");try{const a=await fetch(`${re}/users/complete-onboarding`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(o)});if(!a.ok){const k=await a.json();throw new Error(k.message||"Xatolik yuz berdi")}const b=await a.json();console.log(b),g(b),I.success("Muvaffaqiyatli! Platformaga xush kelibsiz. 🚀")}catch(a){const b=Array.isArray(a.message)?a.message[0]:a.message;I.error(b||"Xatolik yuz berdi. Qaytadan urinib ko'ring.")}},W=()=>{if(r===5){if(!o.username||!u||!o.gender||!o.age)return!1;const a=Number(o.age);if(isNaN(a)||a<4||a>100)return!1}return!(r===2&&o.interests.length===0||r===3&&o.goals.length===0||r===4&&!o.level)},C=()=>{if(!W()&&r>1){let a="Maydonlarni to'ldiring";if(r===5){const b=Number(o.age);o.username?u?o.gender?o.age?(b<4||b>100)&&(a="Yosh 4 va 100 oralig'ida bo'lishi kerak"):a="Yoshingizni kiriting":a="Jinsingizni tanlang":a="Yaroqli username tanlang":a="Username kiriting"}else r===2?a="Kamida bitta qiziqish tanlang":r===3?a="Kamida bitta maqsad tanlang":r===4&&(a="Bilim darajangizni tanlang");return I.error(a)}r<p?s(a=>a+1):Y()},z=()=>r>1&&s(a=>a-1),T=()=>{switch(r){case 1:return e.jsxs(O,{children:[e.jsx(q,{children:e.jsx(Me,{size:40})}),e.jsx(N,{children:"Xush Kelibsiz!"}),e.jsxs(H,{children:["Platformamizga xush kelibsiz! Bu yerda siz o'z bilimlaringizni sinovdan o'tkazishingiz, boshqalar bilan bellashishingiz va qiziqarli muloqot qilishingiz mumkin.",e.jsx("br",{}),e.jsx("br",{}),"Tajribangizni mukammal darajada shaxsiylashtirish uchun bizga bir oz yordam berasizmi?"]})]});case 2:return e.jsxs(O,{children:[e.jsx(q,{children:e.jsx(Pe,{size:40})}),e.jsx(N,{children:"Qiziqishlaringiz?"}),e.jsx(H,{children:"Sizni qaysi yo'nalishlar ko'proq qiziqtiradi? (Bir nechta tanlash mumkin)"}),e.jsx(Q,{children:Qr.map(a=>e.jsxs(K,{$active:o.interests.includes(a.id),onClick:()=>w(a.id),children:[a.icon,e.jsx(X,{children:a.label})]},a.id))})]});case 3:return e.jsxs(O,{children:[e.jsx(q,{children:e.jsx(ke,{size:40})}),e.jsx(N,{children:"Asosiy Maqsadlar?"}),e.jsx(H,{children:"Platformadan qaysi maqsadda foydalanmoqchisiz?"}),e.jsx(Q,{children:Kr.map(a=>e.jsxs(K,{$active:o.goals.includes(a.id),onClick:()=>f(a.id),children:[a.icon,e.jsx(X,{children:a.label})]},a.id))})]});case 4:return e.jsxs(O,{children:[e.jsx(q,{children:e.jsx(ae,{size:40})}),e.jsx(N,{children:"Bilim Darajangiz?"}),e.jsx(H,{children:"Hozirgi bilim darajangizni qanday baholaysiz?"}),e.jsx(Q,{children:Xr.map(a=>e.jsxs(K,{$active:o.level===a.id,onClick:()=>d({...o,level:a.id}),children:[a.icon,e.jsx(X,{children:a.label})]},a.id))})]});case 5:return e.jsxs(O,{children:[e.jsx(q,{children:e.jsx(Fe,{size:40})}),e.jsx(N,{children:"Shaxsiy ma'lumotlar"}),e.jsx(H,{children:"Profilingizni to'ldiring"}),e.jsxs("div",{style:{width:"100%",maxWidth:"360px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Ue,{size:16,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#72767d"}}),e.jsx("input",{type:"text",placeholder:"Username",value:o.username,onChange:a=>d({...o,username:a.target.value.toLowerCase()}),style:{width:"100%",padding:"12px 12px 12px 40px",background:"#202225",border:i?"1px solid #f04747":u?"1px solid #43b581":"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",outline:"none",transition:"border-color 0.2s"}}),l&&e.jsx(Ye,{size:16,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#b9bbbe",animation:"spin 1s linear infinite"}}),!l&&u&&o.username&&e.jsx(ae,{size:16,style:{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#43b581"}})]}),i&&e.jsxs("div",{style:{color:"#f04747",fontSize:"12px",marginTop:"-12px",display:"flex",alignItems:"center",gap:"4px"},children:[e.jsx(Ge,{size:12})," ",i]}),e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx("button",{type:"button",onClick:()=>d({...o,gender:"male"}),style:{flex:1,padding:"12px",background:o.gender==="male"?"rgba(88, 101, 242, 0.1)":"#202225",border:`2px solid ${o.gender==="male"?"#5865f2":"transparent"}`,borderRadius:"12px",color:o.gender==="male"?"white":"#72767d",cursor:"pointer"},children:"Erkak"}),e.jsx("button",{type:"button",onClick:()=>d({...o,gender:"female"}),style:{flex:1,padding:"12px",background:o.gender==="female"?"rgba(88, 101, 242, 0.1)":"#202225",border:`2px solid ${o.gender==="female"?"#5865f2":"transparent"}`,borderRadius:"12px",color:o.gender==="female"?"white":"#72767d",cursor:"pointer"},children:"Ayol"})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Je,{size:16,style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"#72767d"}}),e.jsx("input",{type:"number",placeholder:"Yoshingiz",value:o.age,onChange:a=>d({...o,age:a.target.value}),style:{width:"100%",padding:"12px 12px 12px 40px",background:"#202225",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",color:"white",outline:"none"}})]})]})]});default:return null}};return e.jsx(Fr,{children:e.jsxs(Ur,{children:[e.jsx(Yr,{children:[1,2,3,4,5].map(a=>e.jsx(Gr,{$progress:r>=a?100:0},a))}),T(),e.jsxs(Jr,{children:[e.jsxs(he,{onClick:z,disabled:r===1,children:[e.jsx(We,{size:18})," Orqaga"]}),e.jsxs(he,{$primary:!0,onClick:C,children:[r===p?"Boshlash":"Keyingisi"," ",e.jsx(Ve,{size:18})]})]})]})})},Ui=Object.freeze(Object.defineProperty({__proto__:null,default:Zr},Symbol.toStringTag,{value:"Module"})),ei=n.div`
  display: grid;
  gap: 8px;
`,xe=n.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,ri=n.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`,ii=n.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
`,ti=n.div`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--warning-color) 22%, var(--border-color));
  background: color-mix(in srgb, var(--warning-color) 10%, transparent);
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.5;
`,oi=n.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`,ge=n.div`
  border: 1px solid
    ${r=>r.$premium?"color-mix(in srgb, var(--primary-color) 32%, var(--border-color))":"var(--border-color)"};
  background: ${r=>r.$premium?"color-mix(in srgb, var(--primary-color) 8%, var(--input-color))":"var(--input-color)"};
  border-radius: 14px;
  padding: 14px;
  display: grid;
  gap: 10px;
  min-width: 0;
`,fe=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  color: ${r=>r.$premium?"var(--primary-color)":"var(--text-color)"};
`,be=n.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,si=n.div`
  display: grid;
  gap: 12px;
`,ni=n.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  overflow: hidden;
`,ai=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
`,li=n.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: var(--text-color);
`,di=n.p`
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-muted-color);
`,ci=n.div`
  display: grid;
`,mi=n.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 110px 110px;
  gap: 10px;
  padding: 9px 14px;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted-color);
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr) 82px 82px;
  }
`,pi=n.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) 110px 110px;
  gap: 10px;
  padding: 10px 14px;
  align-items: center;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr) 82px 82px;
  }
`,ui=n.div`
  min-width: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-color);
`,ye=n.div`
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  color: ${r=>r.$premium?"var(--primary-color)":"var(--text-secondary-color)"};
  text-align: right;
  white-space: nowrap;
`,hi=n.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--text-muted-color);
`,P=r=>`${Math.round(r/(1024*1024))}MB`,c=(r,s)=>r("premiumModal.chars",{count:s}),V=(r,s)=>r("premiumModal.words",{count:s}),xi=({isOpen:r,onClose:s,onUpgrade:o,message:d=""})=>{const{t:i}=oe(),h=x.useMemo(()=>[{key:"posts",title:i("premiumModal.sections.posts.title"),description:i("premiumModal.sections.posts.description"),items:[{label:i("premiumModal.items.postsPerDay"),ordinary:t.postsPerDay.ordinary,premium:t.postsPerDay.premium},{label:i("premiumModal.items.postCommentsPerPost"),ordinary:t.postCommentsPerPost.ordinary,premium:t.postCommentsPerPost.premium},{label:i("premiumModal.items.postWords"),ordinary:V(i,t.postWords),premium:V(i,t.postWords)},{label:i("premiumModal.items.postCommentChars"),ordinary:c(i,t.postCommentChars),premium:c(i,t.postCommentChars)}]},{key:"blogs",title:i("premiumModal.sections.blogs.title"),description:i("premiumModal.sections.blogs.description"),items:[{label:i("premiumModal.items.blogsPerUser"),ordinary:t.blogsPerUser.ordinary,premium:t.blogsPerUser.premium},{label:i("premiumModal.items.blogCommentsPerBlog"),ordinary:t.blogCommentsPerBlog.ordinary,premium:t.blogCommentsPerBlog.premium},{label:i("premiumModal.items.blogImagesPerBlog"),ordinary:t.blogImagesPerBlog.ordinary,premium:t.blogImagesPerBlog.premium},{label:i("premiumModal.items.blogWords"),ordinary:V(i,t.blogWords.ordinary),premium:V(i,t.blogWords.premium)},{label:i("premiumModal.items.blogTitleChars"),ordinary:c(i,t.blogTitleChars),premium:c(i,t.blogTitleChars)},{label:i("premiumModal.items.blogExcerptChars"),ordinary:c(i,t.blogExcerptChars),premium:c(i,t.blogExcerptChars)},{label:i("premiumModal.items.blogTagChars"),ordinary:`${t.blogTagCount} × ${c(i,t.blogTagChars)}`,premium:`${t.blogTagCount} × ${c(i,t.blogTagChars)}`},{label:i("premiumModal.items.blogCommentChars"),ordinary:c(i,t.blogCommentChars),premium:c(i,t.blogCommentChars)}]},{key:"groups",title:i("premiumModal.sections.groups.title"),description:i("premiumModal.sections.groups.description"),items:[{label:i("premiumModal.items.groupsCreated"),ordinary:t.groupsCreated.ordinary,premium:t.groupsCreated.premium},{label:i("premiumModal.items.groupsJoined"),ordinary:t.groupsJoined.ordinary,premium:t.groupsJoined.premium},{label:i("premiumModal.items.messageChars"),ordinary:c(i,t.messageChars),premium:c(i,t.messageChars)},{label:i("premiumModal.items.groupNameChars"),ordinary:c(i,t.groupNameChars),premium:c(i,t.groupNameChars)},{label:i("premiumModal.items.groupDescriptionChars"),ordinary:c(i,t.groupDescriptionChars),premium:c(i,t.groupDescriptionChars)}]},{key:"meets",title:i("premiumModal.sections.meets.title"),description:i("premiumModal.sections.meets.description"),items:[{label:i("premiumModal.items.meetsCreated"),ordinary:t.meetsCreated.ordinary,premium:t.meetsCreated.premium},{label:i("premiumModal.items.meetParticipants"),ordinary:t.meetParticipants.ordinary,premium:t.meetParticipants.premium},{label:i("premiumModal.items.meetTitleChars"),ordinary:c(i,t.meetTitleChars),premium:c(i,t.meetTitleChars)},{label:i("premiumModal.items.meetDescriptionChars"),ordinary:c(i,t.meetDescriptionChars),premium:c(i,t.meetDescriptionChars)}]},{key:"courses",title:i("premiumModal.sections.courses.title"),description:i("premiumModal.sections.courses.description"),items:[{label:i("premiumModal.items.coursesCreated"),ordinary:t.coursesCreated.ordinary,premium:t.coursesCreated.premium},{label:i("premiumModal.items.lessonsPerCourse"),ordinary:t.lessonsPerCourse.ordinary,premium:t.lessonsPerCourse.premium},{label:i("premiumModal.items.lessonVideosPerLesson"),ordinary:t.lessonVideosPerLesson.ordinary,premium:t.lessonVideosPerLesson.premium},{label:i("premiumModal.items.lessonMediaBytes"),ordinary:P(t.lessonMediaBytes),premium:P(t.lessonMediaBytes)},{label:i("premiumModal.items.lessonTestsPerLesson"),ordinary:t.lessonTestsPerLesson.ordinary,premium:t.lessonTestsPerLesson.premium},{label:i("premiumModal.items.lessonHomeworkPerLesson"),ordinary:t.lessonHomeworkPerLesson.ordinary,premium:t.lessonHomeworkPerLesson.premium},{label:i("premiumModal.items.homeworkTextChars"),ordinary:c(i,t.homeworkTextChars),premium:c(i,t.homeworkTextChars)},{label:i("premiumModal.items.homeworkLinkChars"),ordinary:c(i,t.homeworkLinkChars),premium:c(i,t.homeworkLinkChars)},{label:i("premiumModal.items.homeworkPhotoBytes"),ordinary:P(t.homeworkPhotoBytes),premium:P(t.homeworkPhotoBytes)},{label:i("premiumModal.items.homeworkAudioBytes"),ordinary:P(t.homeworkAudioBytes),premium:P(t.homeworkAudioBytes)},{label:i("premiumModal.items.homeworkVideoBytes"),ordinary:P(t.homeworkVideoBytes),premium:P(t.homeworkVideoBytes)},{label:i("premiumModal.items.homeworkPdfBytes"),ordinary:P(t.homeworkPdfBytes),premium:P(t.homeworkPdfBytes)},{label:i("premiumModal.items.courseNameChars"),ordinary:c(i,t.courseNameChars),premium:c(i,t.courseNameChars)},{label:i("premiumModal.items.courseDescriptionChars"),ordinary:c(i,t.courseDescriptionChars),premium:c(i,t.courseDescriptionChars)},{label:i("premiumModal.items.lessonTitleChars"),ordinary:c(i,t.lessonTitleChars),premium:c(i,t.lessonTitleChars)},{label:i("premiumModal.items.lessonDescriptionChars"),ordinary:c(i,t.lessonDescriptionChars),premium:c(i,t.lessonDescriptionChars)}]},{key:"arena",title:i("premiumModal.sections.arena.title"),description:i("premiumModal.sections.arena.description"),items:[{label:i("premiumModal.items.testsCreated"),ordinary:t.testsCreated.ordinary,premium:t.testsCreated.premium},{label:i("premiumModal.items.testShareLinksPerTest"),ordinary:t.testShareLinksPerTest.ordinary,premium:t.testShareLinksPerTest.premium},{label:i("premiumModal.items.flashcardsCreated"),ordinary:t.flashcardsCreated.ordinary,premium:t.flashcardsCreated.premium},{label:i("premiumModal.items.sentenceBuildersCreated"),ordinary:t.sentenceBuildersCreated.ordinary,premium:t.sentenceBuildersCreated.premium},{label:i("premiumModal.items.sentenceBuilderShareLinksPerDeck"),ordinary:t.sentenceBuilderShareLinksPerDeck.ordinary,premium:t.sentenceBuilderShareLinksPerDeck.premium},{label:i("premiumModal.items.testTitleChars"),ordinary:c(i,t.testTitleChars),premium:c(i,t.testTitleChars)},{label:i("premiumModal.items.testDescriptionChars"),ordinary:c(i,t.testDescriptionChars),premium:c(i,t.testDescriptionChars)},{label:i("premiumModal.items.testQuestionChars"),ordinary:c(i,t.testQuestionChars),premium:c(i,t.testQuestionChars)},{label:i("premiumModal.items.testOptionChars"),ordinary:c(i,t.testOptionChars),premium:c(i,t.testOptionChars)},{label:i("premiumModal.items.flashcardSideChars"),ordinary:c(i,t.flashcardSideChars),premium:c(i,t.flashcardSideChars)},{label:i("premiumModal.items.sentenceBuilderPromptChars"),ordinary:c(i,t.sentenceBuilderPromptChars),premium:c(i,t.sentenceBuilderPromptChars)},{label:i("premiumModal.items.sentenceBuilderAnswerChars"),ordinary:c(i,t.sentenceBuilderAnswerChars),premium:c(i,t.sentenceBuilderAnswerChars)}]},{key:"profile",title:i("premiumModal.sections.profile.title"),description:i("premiumModal.sections.profile.description"),items:[{label:i("premiumModal.items.nicknameChars"),ordinary:c(i,t.nicknameChars),premium:c(i,t.nicknameChars)},{label:i("premiumModal.items.usernameChars"),ordinary:c(i,t.usernameChars),premium:c(i,t.usernameChars)},{label:i("premiumModal.items.bioChars"),ordinary:c(i,t.bioChars),premium:c(i,t.bioChars)}]}],[i]);return r?e.jsx(Ie,{onClick:s,$zIndex:10060,$overlay:"rgba(0, 0, 0, 0.78)",children:e.jsxs(_e,{onClick:l=>l.stopPropagation(),$width:"min(100%, 980px)",$maxWidth:"100%",$maxHeight:"92vh",children:[e.jsxs(Be,{children:[e.jsxs(ei,{children:[e.jsxs(xe,{children:[e.jsx(Wr,{width:28,height:28}),e.jsx(ri,{children:i("premiumModal.title")})]}),e.jsx(ii,{children:i("premiumModal.subtitle")})]}),e.jsx(De,{type:"button",onClick:s,children:e.jsx(Ze,{size:18})})]}),e.jsxs(Le,{children:[d?e.jsxs(ti,{children:[e.jsxs(xe,{children:[e.jsx(er,{size:16}),e.jsx("strong",{children:i("premiumModal.limitReachedTitle")})]}),e.jsx("div",{children:d})]}):null,e.jsxs(oi,{children:[e.jsxs(ge,{children:[e.jsx(fe,{children:i("premiumModal.freePlan")}),e.jsx(be,{children:i("premiumModal.freePlanDescription")})]}),e.jsxs(ge,{$premium:!0,children:[e.jsxs(fe,{$premium:!0,children:[e.jsx(rr,{size:16}),i("premiumModal.premiumPlan")]}),e.jsx(be,{children:i("premiumModal.premiumPlanDescription")})]})]}),e.jsx(si,{children:h.map(l=>e.jsxs(ni,{children:[e.jsx(ai,{children:e.jsxs("div",{children:[e.jsx(li,{children:l.title}),e.jsx(di,{children:l.description})]})}),e.jsxs(ci,{children:[e.jsxs(mi,{children:[e.jsx("div",{children:i("premiumModal.columns.feature")}),e.jsx("div",{children:i("premiumModal.columns.free")}),e.jsx("div",{children:i("premiumModal.columns.premium")})]}),l.items.map(m=>e.jsxs(pi,{children:[e.jsx(ui,{children:m.label}),e.jsx(ye,{children:m.ordinary}),e.jsx(ye,{$premium:!0,children:m.premium})]},m.label))]})]},l.key))})]}),e.jsxs(Ee,{children:[e.jsx(hi,{children:i("premiumModal.footerNote")}),e.jsx(ie,{type:"button",onClick:o,children:i("premiumModal.upgrade")})]})]})}):null},Yi=Object.freeze(Object.defineProperty({__proto__:null,default:xi},Symbol.toStringTag,{value:"Module"})),gi=n.div`
  position: fixed;
  inset: 0;
  z-index: 20000;
  pointer-events: none;
`,F=n.div`
  position: fixed;
  background: rgba(7, 10, 16, 0.64);
  pointer-events: auto;
`,fi=n.div`
  position: fixed;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 18px 48px rgba(0, 0, 0, 0.32);
  pointer-events: none;
`,bi=n.div`
  position: fixed;
  width: min(320px, calc(100vw - 32px));
  background: color-mix(in srgb, var(--secondary-color) 88%, transparent);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  padding: 14px;
  color: var(--text-color);
  pointer-events: auto;
`,yi=n.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  margin-bottom: 8px;
`,vi=n.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 6px;
`,ji=n.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);
`,Ci=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
`,wi=n.button`
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 10px;

  &:hover {
    color: var(--text-color);
    background: rgba(255, 255, 255, 0.06);
  }
`,ki=n.button`
  border: 1px solid color-mix(in srgb, var(--primary-color) 46%, transparent);
  background: var(--primary-color);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 9px 14px;
  border-radius: 12px;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--primary-color) 24%, transparent);

  &:hover {
    filter: brightness(1.04);
  }
`,U=10,Z=14,ve=r=>{if(!r)return null;const s=document.querySelector(r);if(!s)return null;const o=s.getBoundingClientRect();return!o.width||!o.height?null:o},Pi=r=>{const s=Math.min(320,window.innerWidth-32),d=r.bottom+Z+176<=window.innerHeight?Math.min(window.innerHeight-188,r.bottom+Z):Math.max(16,r.top-188-Z),i=Math.min(window.innerWidth-s-16,Math.max(16,r.left+r.width/2-s/2));return{top:d,left:i,width:s}},Mi=({isOpen:r,steps:s,onClose:o,storageKey:d,onStepChange:i})=>{const{t:h}=oe(),[l,m]=v.useState(0),[u,y]=v.useState(null),g=v.useMemo(()=>s.filter(C=>ve(C.selector)),[s,r]),p=g[l]||null,w=v.useCallback(()=>{d&&localStorage.setItem(d,"done"),m(0),o==null||o()},[o,d]);if(v.useEffect(()=>{if(!r){y(null),m(0);return}g.length||w()},[w,r,g.length]),v.useEffect(()=>{!r||!p||i==null||i(l,p)},[p,r,i,l]),v.useEffect(()=>{if(!r||!p)return;let C=null,z=null;const T=()=>{const a=(b=0)=>{const k=ve(p.selector);if(k){y(k);return}if(b>=8){w();return}z=window.setTimeout(()=>a(b+1),80)};C=window.requestAnimationFrame(()=>a())};return T(),window.addEventListener("resize",T),window.addEventListener("scroll",T,!0),()=>{C&&window.cancelAnimationFrame(C),z&&window.clearTimeout(z),window.removeEventListener("resize",T),window.removeEventListener("scroll",T,!0)}},[p,w,r]),v.useEffect(()=>{var z;if(!r||!p)return;const C=document.querySelector(p.selector);(z=C==null?void 0:C.scrollIntoView)==null||z.call(C,{block:"nearest",inline:"nearest",behavior:"smooth"})},[p,r]),!r||!p||!u)return null;const f={top:Math.max(8,u.top-U),left:Math.max(8,u.left-U),right:Math.min(window.innerWidth-8,u.right+U),bottom:Math.min(window.innerHeight-8,u.bottom+U)},Y=Pi(f),W=l===g.length-1;return e.jsxs(gi,{children:[e.jsx(F,{style:{top:0,left:0,right:0,height:f.top}}),e.jsx(F,{style:{top:f.top,left:0,width:f.left,height:f.bottom-f.top}}),e.jsx(F,{style:{top:f.top,left:f.right,right:0,height:f.bottom-f.top}}),e.jsx(F,{style:{left:0,right:0,bottom:0,top:f.bottom}}),e.jsx(fi,{style:{top:f.top,left:f.left,width:f.right-f.left,height:f.bottom-f.top}}),e.jsxs(bi,{style:Y,children:[e.jsx(yi,{children:h("featureTour.step",{current:l+1,total:g.length})}),e.jsx(vi,{children:p.title}),e.jsx(ji,{children:p.description}),e.jsxs(Ci,{children:[e.jsx(wi,{type:"button",onClick:w,children:h("featureTour.skip")}),e.jsx(ki,{type:"button",onClick:async()=>{if(p.onNext&&await p.onNext(),W){w();return}m(C=>C+1)},children:h(W?"featureTour.done":"featureTour.next")})]})]})]})},Gi=Object.freeze(Object.defineProperty({__proto__:null,default:Mi},Symbol.toStringTag,{value:"Module"}));export{t as A,Oi as C,ie as D,Mi as F,Fi as I,Ie as M,Ui as O,Wr as P,M as _,_e as a,Be as b,_r as c,De as d,Le as e,Ee as f,or as g,xi as h,Ir as i,Br as j,Hi as k,Wi as l,Vi as m,Ei as n,Ai as o,Ri as p,qi as q,Ni as r,B as s,Yi as t,Li as u,Gi as v};
