import{r as x,R as Er,j as e,n as de,L as Rr,I as Lr,e as Fr,a as Hr}from"./react-vendor-UYnqoc53.js";import{S as Me,C as qr,U as He}from"./feature-arena-BvqxMZzZ.js";import{a as ir,u as Yr,O as Nr}from"./feature-calls-BqelebZ9.js";import{X as $e,aj as pt,ao as or,P as Te,ap as Pt,b as Ur,aq as Kr,d as r,t as xt,o as Vr,ar as mt,ak as Wr,as as Xr,a0 as Qr,at as ft,O as Jr,q as gt,N as Zr,w as ei,au as ti,av as ri,aw as ii,a4 as nr,m as oi,aa as Ct,af as ni,G as si}from"./ui-vendor-DFyM_Xd9.js";import{a as ee,u as we,b as ai,A as ht,R as sr}from"./feature-admin-D0NNr8sf.js";import{u as ar}from"./router-query-D08THUDE.js";import{l as li}from"./media-realtime-B2IcwcIy.js";import{d as ue,r as di,c as ci}from"./vendor-CRWlb9wI.js";import{P as lt,M as ui,a as pi,b as xi,i as mi,c as fi,j as gi,d as hi,e as bi,A as Re,f as vi,D as Gt}from"./feature-app-ICtyfBrQ.js";const yi=async t=>{const{data:i}=await ee.post("/chats/upload-avatar",t);return i},ji=async({chatId:t,formData:i})=>{const{data:a}=await ee.post(`/chats/${t}/avatar`,i);return a},wi=async()=>{const{data:t}=await ee.get("/chats");return t},lr=async t=>{const{data:i}=await ee.post("/chats",t);return i},Si=async({chatId:t,dto:i})=>{const{data:a}=await ee.patch(`/chats/${t}`,i);return a},ki=async(t,i=null)=>{const a=i?`?before=${encodeURIComponent(i)}`:"",{data:n}=await ee.get(`/chats/${t}/messages${a}`);return n},Ii=async({chatId:t,content:i,replayToId:a})=>{const{data:n}=await ee.post(`/chats/${t}/messages`,{content:i,replayToId:a});return n},Mi=async t=>{await ee.delete(`/chats/messages/${t}`)},$i=async t=>{const{data:i}=await ee.get(`/chats/resolve/${t}`);return i},zi=async t=>{const{data:i}=await ee.get(`/chats/preview/${t}`);return i},Di=async t=>{const{data:i}=await ee.post(`/chats/${t}/join-link`);return i},Ai=async t=>{const{data:i}=await ee.get(`/chats/search/users?q=${encodeURIComponent(t)}&limit=10`);return i},_i=async t=>{const{data:i}=await ee.get(`/chats/search/groups?q=${encodeURIComponent(t)}&limit=10`);return i},Pi=async t=>{const{data:i}=await ee.get(`/users/global-search?q=${t}`);return i},Ci=async t=>{const{data:i}=await ee.get(`/users/by-username/${t}`);return i},Gi=async()=>{const{data:t}=await ee.get("/users");return t},Ot=async t=>{const{data:i}=await ee.get(`/users/${t}/profile`);return i},Oi=async t=>{const{data:i}=await ee.delete(`/chats/${t}`);return i},Ti=async t=>{const{data:i}=await ee.post(`/chats/${t}/leave`);return i};ue.extend(di);const Tt=t=>{if(!t)return"";const i=ue(t),a=ue();return i.isSame(a,"day")?i.format("HH:mm"):i.isSame(a.subtract(1,"day"),"day")?"Kecha":i.isSame(a,"year")?i.format("D-MMMM"):i.format("DD.MM.YYYY")},Bi=t=>{if(!t)return"";const i=ue(t),a=ue();return i.isSame(a,"day")?"Bugun":i.isSame(a.subtract(1,"day"),"day")?"Kecha":i.format("D-MMMM YYYY")},dr=x.createContext(),bt=()=>x.useContext(dr),_s=({children:t})=>{const i=we(v=>v.user),[a,n]=x.useState([]),[w,_]=x.useState(!0),[D,T]=x.useState(1),[Y,G]=x.useState(!0),B=Er.useRef(!1),[q,j]=x.useState(()=>{const s=window.location.pathname.split("/").filter(Boolean)[0]||"chats",l=["home","feed","blogs","chats","users","groups","meets","courses","arena","profile"];return s==="a"?"chats":l.includes(s)?s:"chats"}),[F,W]=x.useState(()=>{const v=window.location.pathname.split("/").filter(Boolean);return(v[0]==="a"||v[0]==="blogs"||v[0]==="users"||v[0]==="groups"||v[0]==="chats")&&v[1]?v[1]:0}),[u,L]=x.useState(null),[R,V]=x.useState({}),[$,S]=x.useState(null);x.useEffect(()=>{if(!((i==null?void 0:i._id)||(i==null?void 0:i.id))){L(l=>(l==null||l.disconnect(),null));return}const s=li(ai("/chats"),{withCredentials:!0,transports:["websocket"],reconnectionAttempts:5});return s.on("connect",()=>{console.log("Connected to /chats namespace")}),L(s),()=>{s.disconnect()}},[i==null?void 0:i._id,i==null?void 0:i.id]),x.useEffect(()=>{if(!u)return;const v=C=>{n(o=>{var he;const f=o.findIndex(ve=>ve.id===C.chatId);if(f===-1)return A(),o;const c=[...o],h={...c[f]},I=String(h.urlSlug)===String(F)||String(h.id)===String(F);h.lastMessage=C.content,h.hasMessages=!0,h.time=Tt(C.createdAt),h.date=ue(C.createdAt).format("YYYY-MM-DD");const P=we.getState().user||{},Z=P._id||P.id,ae=(((he=C.senderId)==null?void 0:he._id)||C.senderId)===Z;return!I&&!ae&&(h.unread=(h.unread||0)+1),c.splice(f,1),c.unshift(h),c})},s=({chatId:C,readByUserId:o,messageIds:f})=>{const c=we.getState().user||{},h=c._id||c.id;String(o)===String(h)&&n(I=>I.map(P=>String(P.id)===String(C)?{...P,unread:Math.max(0,(P.unread||0)-f.length)}:P))},l=C=>{const o=we.getState().user||{},f=(o==null?void 0:o._id)||(o==null?void 0:o.id);if(C.members&&f&&!C.members.some(h=>{const I=h._id||h.id||h;return String(I)===String(f)})){n(h=>h.filter(I=>I.id!==C.chatId));return}n(c=>{const h=c.findIndex(I=>I.id===C.chatId);if(h!==-1){const I=[...c];return I[h]={...I[h],...C},I}return c})},g=({chatId:C,userId:o,isTyping:f})=>{V(c=>{const h={...c[C]||{}};return f?h[o]=Date.now():delete h[o],{...c,[C]:h}})},N=({chatId:C})=>{n(o=>o.filter(f=>f.id!==C))};return u.on("message_new",v),u.on("messages_read",s),u.on("chat_updated",l),u.on("user_typing",g),u.on("chat_deleted",N),()=>{u.off("message_new"),u.off("messages_read"),u.off("chat_updated"),u.off("user_typing"),u.off("chat_deleted")}},[u,F]),x.useEffect(()=>{const v=setInterval(()=>{const s=Date.now();V(l=>{let g=!1;const N={...l};return Object.keys(N).forEach(C=>{const o={...N[C]};Object.keys(o).forEach(f=>{s-o[f]>5e3&&(delete o[f],g=!0)}),Object.keys(o).length===0?delete N[C]:N[C]=o}),g?N:l})},2e3);return()=>clearInterval(v)},[]);const H=x.useCallback((v,s)=>{!u||!v||u.emit(s?"typing_start":"typing_stop",{chatId:v})},[u]),A=x.useCallback(async(v=1)=>{try{v===1&&_(!0);const s=we.getState().user;if(!(s!=null&&s._id)&&!(s!=null&&s.id))return;const l=await wi(v,15),g=(l==null?void 0:l.data)||[],N=(l==null?void 0:l.totalPages)||1,C=we.getState().user||{},o=C._id||C.id,f=g.map(c=>{var I;let h={name:"Noma'lum",avatar:""};if(c.isGroup)h={name:c.name,avatar:c.avatar||((I=c.name)==null?void 0:I.charAt(0)),urlSlug:c.privateurl||c._id};else{const P=c.members.find(Z=>String(Z._id||Z.id)!==String(o));P?h={name:P.nickname,username:P.username,avatar:P.avatar||(P.nickname||P.username).charAt(0),urlSlug:P.username,premiumStatus:P.premiumStatus,selectedProfileDecorationId:P.selectedProfileDecorationId,customProfileDecorationImage:P.customProfileDecorationImage,isOfficialProfile:P.isOfficialProfile,officialBadgeKey:P.officialBadgeKey,officialBadgeLabel:P.officialBadgeLabel,hidePresence:P.hidePresence,disableCalls:P.disableCalls,disableGroupInvites:P.disableGroupInvites}:h={name:"Saqlangan xabarlar",avatar:"",urlSlug:c._id,isSavedMessages:!0}}return{id:c._id,jammId:c.jammId,isGroup:!!c.isGroup,type:c.isGroup?"group":"user",name:h.name,username:h.username,avatar:h.avatar,isSavedMessages:h.isSavedMessages,premiumStatus:h.premiumStatus,selectedProfileDecorationId:h.selectedProfileDecorationId,customProfileDecorationImage:h.customProfileDecorationImage,isOfficialProfile:h.isOfficialProfile,officialBadgeKey:h.officialBadgeKey,officialBadgeLabel:h.officialBadgeLabel,hidePresence:h.hidePresence,disableCalls:h.disableCalls,disableGroupInvites:h.disableGroupInvites,urlSlug:c.jammId?String(c.jammId):h.urlSlug||c._id,unread:c.unreadCount||0,lastMessage:c.lastMessage||(c.isGroup?"Guruh yaratildi":"Suhbat boshlandi"),time:c.lastMessageAt?Tt(c.lastMessageAt):"Oldin",date:c.lastMessageAt?ue(c.lastMessageAt).format("YYYY-MM-DD"):"Oldin",members:c.members,createdBy:c.createdBy,admins:c.admins||[],hasMessages:!!c.lastMessage}});n(c=>v===1?f:[...c,...f]),T(v),G(v<N),v===1&&(B.current=!0)}catch(s){console.error(s)}finally{v===1&&_(!1)}},[]),y=x.useCallback(async()=>{B.current||await A(1)},[A]),m=async v=>{const s=await lr(v);return A(),s},ne=async(v,s)=>{await Si({chatId:v,dto:s}),A()},se=async v=>{await Oi(v),n(s=>s.filter(l=>l.id!==v))},X=async v=>{await Ti(v),n(s=>s.filter(l=>l.id!==v))},te=x.useCallback(async(v,s=null)=>{if(!v)return{data:[],hasMore:!1,nextCursor:null};const l=await ki(v,s);return{data:(l.data||[]).map(g=>{var N,C,o,f,c,h,I,P,Z,ae,he,ve,ye,Se,ke,be;return{id:g._id,user:((N=g.senderId)==null?void 0:N.nickname)||((C=g.senderId)==null?void 0:C.username),senderId:((o=g.senderId)==null?void 0:o._id)||g.senderId,avatar:((f=g.senderId)==null?void 0:f.avatar)||((I=((c=g.senderId)==null?void 0:c.nickname)||((h=g.senderId)==null?void 0:h.username))==null?void 0:I.charAt(0))||"U",username:(P=g.senderId)==null?void 0:P.username,premiumStatus:(Z=g.senderId)==null?void 0:Z.premiumStatus,selectedProfileDecorationId:(ae=g.senderId)==null?void 0:ae.selectedProfileDecorationId,customProfileDecorationImage:(he=g.senderId)==null?void 0:he.customProfileDecorationImage,isOfficialProfile:(ve=g.senderId)==null?void 0:ve.isOfficialProfile,officialBadgeKey:(ye=g.senderId)==null?void 0:ye.officialBadgeKey,officialBadgeLabel:(Se=g.senderId)==null?void 0:Se.officialBadgeLabel,content:g.content,timestamp:ue(g.createdAt).format("HH:mm"),date:ue(g.createdAt).format("YYYY-MM-DD"),createdAt:g.createdAt,edited:g.isEdited,isDeleted:g.isDeleted,replayTo:g.replayTo?{id:g.replayTo._id,user:((ke=g.replayTo.senderId)==null?void 0:ke.nickname)||((be=g.replayTo.senderId)==null?void 0:be.username),content:g.replayTo.content}:null,readBy:g.readBy||[]}}),hasMore:!!l.hasMore,nextCursor:l.nextCursor||null}},[]),E=x.useCallback(async(v,s,l)=>{var N,C,o,f,c,h,I,P,Z,ae,he,ve,ye,Se,ke,be;const g=await Ii({chatId:v,content:s,replayToId:l});return{id:g._id,user:((N=g.senderId)==null?void 0:N.nickname)||((C=g.senderId)==null?void 0:C.username),senderId:((o=g.senderId)==null?void 0:o._id)||g.senderId,avatar:((f=g.senderId)==null?void 0:f.avatar)||((I=((c=g.senderId)==null?void 0:c.nickname)||((h=g.senderId)==null?void 0:h.username))==null?void 0:I.charAt(0))||"U",username:(P=g.senderId)==null?void 0:P.username,premiumStatus:(Z=g.senderId)==null?void 0:Z.premiumStatus,selectedProfileDecorationId:(ae=g.senderId)==null?void 0:ae.selectedProfileDecorationId,customProfileDecorationImage:(he=g.senderId)==null?void 0:he.customProfileDecorationImage,isOfficialProfile:(ve=g.senderId)==null?void 0:ve.isOfficialProfile,officialBadgeKey:(ye=g.senderId)==null?void 0:ye.officialBadgeKey,officialBadgeLabel:(Se=g.senderId)==null?void 0:Se.officialBadgeLabel,content:g.content,timestamp:ue(g.createdAt).format("HH:mm"),date:ue(g.createdAt).format("YYYY-MM-DD"),createdAt:g.createdAt,edited:g.isEdited,isDeleted:g.isDeleted,readBy:g.readBy||[],replayTo:g.replayTo?{id:g.replayTo._id||g.replayTo.id,user:((ke=g.replayTo.senderId)==null?void 0:ke.nickname)||((be=g.replayTo.senderId)==null?void 0:be.username)||g.replayTo.user,content:g.replayTo.content}:null}},[]),ce=x.useCallback((v,s)=>{!u||!v||!(s!=null&&s.length)||u.emit("read_messages",{chatId:v,messageIds:s})},[u]),fe=x.useCallback(async v=>$i(v),[]),b=x.useCallback(async v=>v?(await Pi(v)).map(l=>({id:l._id,name:l.nickname||l.username,username:l.username,avatar:l.avatar||(l.nickname||l.username).charAt(0),isOfficialProfile:l.isOfficialProfile,officialBadgeKey:l.officialBadgeKey,officialBadgeLabel:l.officialBadgeLabel,hidePresence:l.hidePresence,disableCalls:l.disableCalls,disableGroupInvites:l.disableGroupInvites})):[],[]),xe=x.useCallback(async v=>v?(await Ai(v)).map(l=>({id:l.id||l._id,name:l.name||l.nickname||l.username,username:l.username,avatar:l.avatar||(l.name||l.nickname||l.username).charAt(0),premiumStatus:l.premiumStatus,selectedProfileDecorationId:l.selectedProfileDecorationId,customProfileDecorationImage:l.customProfileDecorationImage,isOfficialProfile:l.isOfficialProfile,officialBadgeKey:l.officialBadgeKey,officialBadgeLabel:l.officialBadgeLabel,hidePresence:l.hidePresence,disableCalls:l.disableCalls,disableGroupInvites:l.disableGroupInvites})):[],[]),Q=x.useCallback(async v=>v?(await _i(v)).map(l=>({id:l.id||l._id,urlSlug:l.urlSlug||l.jammId||l.id,name:l.name,avatar:l.avatar||(l.name||"").charAt(0),lastMessage:l.lastMessage||"",membersCount:l.membersCount||0,lastMessageAt:l.lastMessageAt||null})):[],[]),J=async v=>{try{return await Ci(v)}catch{return null}},le=x.useCallback(async()=>{try{return(await Gi()).map(s=>({id:s._id,name:s.nickname||s.username,username:s.username,avatar:s.avatar||(s.nickname||s.username||"").charAt(0),premiumStatus:s.premiumStatus,selectedProfileDecorationId:s.selectedProfileDecorationId,customProfileDecorationImage:s.customProfileDecorationImage,isOfficialProfile:s.isOfficialProfile,officialBadgeKey:s.officialBadgeKey,officialBadgeLabel:s.officialBadgeLabel,hidePresence:s.hidePresence,disableCalls:s.disableCalls,disableGroupInvites:s.disableGroupInvites}))}catch{return[]}},[]);x.useEffect(()=>{["chats","groups","users"].includes(q)&&y()},[y,q,i]),x.useEffect(()=>{!F||F==="0"||n(v=>v.map(s=>String(s.urlSlug)===String(F)||String(s.id)===String(F)?{...s,unread:0}:s))},[F]);const ge={chats:a,loading:w,chatsPage:D,chatsHasMore:Y,fetchChats:A,ensureChatsLoaded:y,createChat:m,editChat:ne,deleteChat:se,leaveChat:X,fetchMessages:te,sendMessage:E,markMessagesAsRead:ce,resolveChatSlug:fe,searchUsers:xe,searchGroups:Q,getUserByUsername:J,getAllUsers:le,selectedNav:q,setSelectedNav:j,selectedChatId:F,setSelectedChatId:W,chatSocket:u,typingUsers:R,sendTypingStatus:H,searchGlobalUsers:b,previewGroupChat:async v=>zi(v),joinGroupChat:async v=>{const s=await Di(v);return A(),s},deleteMessage:async v=>{await Mi(v),A()},previewChat:$,setPreviewChat:S};return e.jsx(dr.Provider,{value:ge,children:t})};async function dt(){try{return(await ee.get(`${ht}/meets`)).data.map(i=>({...i,isCreator:!0}))}catch(t){return console.error("Failed to fetch meets",t),[]}}async function Ps({roomId:t,title:i,isPrivate:a,isCreator:n}){if(n)try{await ee.post(`${ht}/meets`,{roomId:t,title:i,isPrivate:a})}catch(w){console.error("Failed to save meet",w)}}async function Ei(t){try{await ee.delete(`${ht}/meets/${t}`)}catch(i){console.error("Failed to remove meet",i)}}async function Cs(t){return(await dt()).find(a=>a.roomId===t)||null}const Ri=({onSuccess:t,onError:i}={})=>ar({mutationFn:ji,onSuccess:a=>{t==null||t(a)},onError:()=>{i==null||i()}}),Li=({onSuccess:t,onError:i}={})=>ar({mutationFn:yi,onSuccess:a=>{t==null||t(a)},onError:()=>{i==null||i()}}),vt=r.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 9999;
`,yt=r.div`
  background-color: var(--secondary-color, #2f3136);
  width: 440px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
`,jt=r.div`
  padding: 24px;
  text-align: center;
  position: relative;
`,wt=r.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color, #ffffff);
  margin-bottom: 8px;
`,Fi=r.p`
  color: var(--text-muted-color, #b9bbbe);
  font-size: 14px;
`;r.button`
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
`;const Hi=r.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Bt=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,qe=r.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,ct=r.input`
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
`,qi=r.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,Yi=r.div`
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
`,Ni=r.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ui=r.div`
  position: relative;
  margin-bottom: 8px;
`,cr=r.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color, #202225);
  border-radius: 16px;
  background-color: var(--tertiary-color, #36393f);
  &::-webkit-scrollbar {
    width: 0;
  }
`,ur=r.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: var(--secondary-color, #2f3136);
  }

  ${t=>t.selected&&`
    background-color: rgba(88, 101, 242, 0.1);
    &:hover { background-color: rgba(88, 101, 242, 0.2); }
  `}
`,pr=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,St=r.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,xr=r.span`
  font-size: 14px;
  color: var(--text-color, #ffffff);
  font-weight: 500;
`,Ki=r.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`,kt=r.div`
  background-color: var(--tertiary-color, #36393f);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Be=r.button`
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${t=>t.primary?`
    background-color: var(--primary-color, #5865F2);
    color: white;
    &:hover { background-color: var(--hover-color, #4752C4); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `:`
    background-color: transparent;
    color: var(--text-color, #ffffff);
    &:hover { background-color: rgba(255,255,255,0.05); }
  `}

  ${t=>t.danger&&`
    color: #ed4245;
    &:hover { background-color: rgba(237, 66, 69, 0.1); }
  `}
`,Vi=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
`,Wi=r.div`
  width: 32px;
  height: 18px;
  background-color: ${t=>t.active?"#43b581":"#72767d"};
  border-radius: 9px;
  position: relative;
  transition: background-color 0.2s;
`,Xi=r.div`
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${t=>t.active?"16px":"2px"};
  transition: left 0.2s;
`,Qi=({isOpen:t,onClose:i,user:a,permissions:n,onTogglePerm:w,onDismissAdmin:_,isOwner:D})=>{var Y;if(!t||!a)return null;const T=[{id:"edit_group_info",label:"Guruh ma'lumotlarini tahrirlash"},{id:"add_members",label:"A'zo qo'shish"},{id:"remove_members",label:"A'zo o'chirish"},{id:"delete_others_messages",label:"Xabarlarni o'chirish"},{id:"add_admins",label:"Admin qo'shish"},{id:"pin_messages",label:"Xabarlarni biriktirish"}];return e.jsx(vt,{onClick:i,children:e.jsxs(yt,{onClick:G=>G.stopPropagation(),style:{width:"380px"},children:[e.jsxs(jt,{style:{padding:"20px"},children:[e.jsx(wt,{style:{fontSize:"18px"},children:"Admin huquqlari"}),e.jsx(Me,{absolute:!0,onClick:i,children:e.jsx($e,{size:18})})]}),e.jsxs("div",{style:{padding:"0 24px 20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingBottom:16,borderBottom:"1px solid var(--border-color, #202225)"},children:[e.jsx(St,{style:{width:44,height:44,fontSize:16},children:((Y=a.avatar)==null?void 0:Y.length)>1?e.jsx("img",{src:a.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(a.name||a.username||"").charAt(0)}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"white",fontWeight:600,fontSize:15},children:a.name||a.username}),e.jsxs("div",{style:{color:"#b9bbbe",fontSize:13},children:["@",a.username]})]})]}),e.jsx(qe,{style:{marginBottom:10,display:"block"},children:"HUQUQLAR"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:4},children:T.map(G=>{const B=n.includes(G.id);return e.jsxs(Vi,{onClick:()=>w(G.id),children:[e.jsx("span",{style:{color:"#dcddde",fontSize:14},children:G.label}),e.jsx(Wi,{active:B,children:e.jsx(Xi,{active:B})})]},G.id)})})]}),e.jsxs(kt,{style:{padding:"16px 20px",justifyContent:"space-between",flexDirection:"row-reverse"},children:[e.jsx(Be,{primary:!0,onClick:i,children:"Saqlash"}),e.jsx(Be,{danger:!0,onClick:_,children:"Adminlikni bekor qilish"})]})]})})},Ji=({isOpen:t,onClose:i,onSelect:a,selectedUsers:n,users:w,searchGlobalUsers:_})=>{const[D,T]=x.useState(""),[Y,G]=x.useState([]),[B,q]=x.useState(!1);x.useEffect(()=>{const u=setTimeout(async()=>{if(!D.trim()){G([]);return}q(!0);try{const L=await _(D);G(L)}catch(L){console.error("Search failed:",L)}finally{q(!1)}},500);return()=>clearTimeout(u)},[D,_]);const F=[...w,...Y.filter(u=>!w.some(L=>L.id===u.id))].filter(u=>{var L,R;return(((L=u.name)==null?void 0:L.toLowerCase().includes(D.toLowerCase()))||((R=u.username)==null?void 0:R.toLowerCase().includes(D.toLowerCase())))&&!n.includes(u.id)}),W=n.length>=40;return t?e.jsx(vt,{onClick:i,children:e.jsxs(yt,{onClick:u=>u.stopPropagation(),style:{width:"400px"},children:[e.jsxs(jt,{style:{padding:"20px"},children:[e.jsxs(wt,{style:{fontSize:"20px"},children:["A'zo qo'shish (",n.length,"/40)"]}),e.jsx(Me,{absolute:!0,onClick:i,children:e.jsx($e,{size:18})})]}),e.jsxs("div",{style:{padding:"0 24px 24px"},children:[e.jsxs(Ui,{children:[e.jsx(ct,{placeholder:"Ism yoki @username orqali qidirish",value:D,onChange:u=>T(u.target.value),style:{paddingLeft:30,width:"100%"},autoFocus:!0}),e.jsx("div",{style:{position:"absolute",left:10,top:12,color:"#aaa"},children:B?e.jsx(pt,{size:14,className:"animate-spin"}):e.jsx(xt,{size:14})})]}),e.jsx(cr,{style:{maxHeight:"300px",marginTop:12},children:D.trim()===""?e.jsx("div",{style:{padding:20,textAlign:"center",color:"#b9bbbe",fontSize:14},children:"Qidirishni boshlang..."}):F.length===0?e.jsx("div",{style:{padding:20,textAlign:"center",color:"#b9bbbe",fontSize:14},children:"Hech kim topilmadi"}):F.map(u=>{var L;return e.jsxs(ur,{style:{opacity:u.disableGroupInvites?.55:1,pointerEvents:u.disableGroupInvites?"none":"auto"},onClick:()=>a(u.id),children:[e.jsxs(pr,{children:[e.jsx(St,{children:((L=u.avatar)==null?void 0:L.length)>1?e.jsx("img",{src:u.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(u.name||u.username||"").charAt(0)}),e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx(xr,{children:u.name||u.username}),e.jsxs("div",{style:{fontSize:11,color:"#b9bbbe"},children:["@",u.username]}),u.isOfficialProfile?e.jsx(Ki,{children:u.officialBadgeLabel||"Rasmiy"}):null]})]}),W?e.jsx("div",{style:{fontSize:10,color:"#ed4245"},children:"Guruh to'la"}):e.jsx(Te,{size:16,color:"var(--primary-color)"})]},u.id)})})]}),e.jsx(kt,{style:{padding:"12px 24px"},children:e.jsx(Be,{onClick:i,children:"Yopish"})})]})}):null},mr=({isOpen:t,onClose:i,onSave:a,group:n={},users:w=[]})=>{var ge,v;if(!t)return null;const[_,D]=x.useState(""),[T,Y]=x.useState(""),[G,B]=x.useState(""),[q,j]=x.useState([]),[F,W]=x.useState(!1),{searchGlobalUsers:u}=bt(),L=x.useRef(null),R=Ri({onSuccess:s=>B(s),onError:()=>de.error("Rasm yuklashda xatolik yuz berdi")}),[V,$]=x.useState([]),[S,H]=x.useState(null),A=we(s=>s.user),y=(A==null?void 0:A.id)||(A==null?void 0:A._id),m=String(n.createdBy)===String(y),ne=V.find(s=>String(s.userId||s.id||s._id)===String(y)),se=s=>m||ne&&ne.permissions.includes(s),X=se("edit_group_info"),te=se("add_members"),E=se("remove_members"),ce=se("add_admins");x.useEffect(()=>{t&&n&&(D(n.name||""),Y(n.description||""),B(n.avatar||""),j(n.members?n.members.map(s=>String(s.id||s._id||s)):[]),$(n.admins?n.admins.map(s=>({...s,userId:String(s.userId||s.id||s._id)})):[]),W(!1))},[t,n]);const fe=s=>{const l=b.get(s);if(!(l!=null&&l.disableGroupInvites||l!=null&&l.isOfficialProfile))if(q.includes(s))j(q.filter(g=>g!==s)),$(g=>g.filter(N=>(N.userId||N.id)!==s));else{if(q.length>=40){de.error("Guruhga maksimal 40ta odam qo'shish mumkin");return}j([...q,s])}};[...w];const b=new Map;(ge=n.members)==null||ge.forEach(s=>b.set(s.id||s._id||s,s)),w.forEach(s=>b.set(s.id||s.jammId||s._id,s));const xe=q.map(s=>b.get(s)).filter(Boolean),Q=(s,l)=>{const g=String(s);$(N=>{const C=N.find(o=>String(o.userId||o.id)===g);if(C){const f=C.permissions.includes(l)?C.permissions.filter(c=>c!==l):[...C.permissions,l];return f.length===0?N.filter(c=>String(c.userId||c.id)!==g):N.map(c=>String(c.userId||c.id)===g?{...c,permissions:f}:c)}else return j(o=>o.includes(g)?o:[...o,g]),[...N,{userId:g,permissions:[l]}]})},J=()=>{console.log(q);const s={name:_,description:T,avatar:G,members:q};ce&&(s.admins=V),a(s),i()},le=s=>{var N;const l=(N=s.target.files)==null?void 0:N[0];if(!l)return;if(l.size>2*1024*1024){de.error("Fayl hajmi juda katta (maksimum 2MB)");return}const g=new FormData;g.append("file",l),R.mutate({chatId:n.id||n._id,formData:g})};return e.jsxs(vt,{onClick:i,children:[e.jsxs(yt,{onClick:s=>s.stopPropagation(),children:[e.jsxs(jt,{children:[e.jsx(wt,{children:"Guruhni tahrirlash"}),e.jsx(Fi,{children:"Guruh ma'lumotlarini o'zgartirish"}),e.jsx(Me,{absolute:!0,onClick:i,children:e.jsx($e,{size:18})})]}),e.jsxs(Hi,{children:[e.jsxs(qi,{children:[e.jsx("input",{type:"file",ref:L,style:{display:"none"},accept:"image/*",onChange:le,disabled:!X}),e.jsx(Yi,{onClick:()=>{X&&L.current&&L.current.click()},style:{cursor:X?"pointer":"not-allowed"},children:R.isPending?e.jsx(pt,{size:24,style:{animation:"spin 1s linear infinite"}}):(G==null?void 0:G.length)>1?e.jsx("img",{src:G,alt:"Group"}):e.jsxs(e.Fragment,{children:[e.jsx(or,{size:24}),e.jsx("span",{children:"UPLOAD"})]})})]}),e.jsxs(Bt,{children:[e.jsx(qe,{children:"Guruh nomi"}),e.jsx(ct,{placeholder:"Guruh nomi",value:_,onChange:s=>D(s.target.value),disabled:!X})]}),e.jsxs(Bt,{children:[e.jsx(qe,{children:"Guruh haqida (ixtiyoriy)"}),e.jsx(ct,{placeholder:"Guruh maqsadini yozing...",value:T,onChange:s=>Y(s.target.value),disabled:!X})]}),e.jsxs(Ni,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(qe,{children:["Mavjud a'zolar (",xe.length,"/40)"]}),te&&e.jsx(Me,{onClick:()=>W(!0),children:e.jsx(Te,{size:16})})]}),e.jsx(cr,{children:xe.map(s=>{var N;const l=String(s.id||s._id),g=V.find(C=>String(C.userId||C.id)===l);return e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:e.jsxs(ur,{children:[e.jsxs(pr,{children:[e.jsx(St,{children:((N=s.avatar)==null?void 0:N.length)>1?e.jsx("img",{src:s.avatar,style:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"},alt:""}):(s.name||s.username||"").charAt(0)}),e.jsx(xr,{children:s.name||s.nickname||s.username}),l===n.createdBy&&e.jsx(Pt,{size:14,color:"#f1c40f"}),l!==n.createdBy&&g&&e.jsx(Pt,{size:14,color:"#5865F2"})]}),e.jsxs("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[l!==n.createdBy&&e.jsxs("button",{onClick:()=>H(l),style:{background:"transparent",border:"none",color:g?"#5865f2":"#b9bbbe",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:2,padding:"4px 8px",borderRadius:4},children:[g?"Admin":"Unsigned",e.jsx(Ur,{size:14})]}),E&&l!==n.createdBy&&e.jsx("button",{onClick:()=>fe(l),style:{background:"transparent",border:"none",color:"#ed4245",cursor:"pointer",padding:6,borderRadius:4},children:e.jsx(Kr,{size:16})})]})]})},l)})})]})]}),e.jsxs(kt,{children:[e.jsx(Be,{onClick:i,children:"Bekor qilish"}),e.jsx(Be,{primary:!0,onClick:J,disabled:!_.trim(),children:"Saqlash"})]})]}),S&&e.jsx(Qi,{isOpen:!!S,onClose:()=>H(null),user:b.get(S),permissions:((v=V.find(s=>String(s.userId||s.id)===String(S)))==null?void 0:v.permissions)||[],onTogglePerm:s=>Q(S,s),onDismissAdmin:()=>{$(s=>s.filter(l=>String(l.userId||l.id)!==String(S))),H(null)},isOwner:m}),F&&e.jsx(Ji,{isOpen:F,onClose:()=>W(!1),onSelect:s=>{fe(s),W(!1)},selectedUsers:q,users:w,searchGlobalUsers:u})]})},Et={isInfoSidebarOpen:!1,isEditGroupDialogOpen:!1,isDescriptionExpanded:!1,isHeaderMenuOpen:!1,isDeleteDialogOpen:!1},oe=ci(t=>({...Et,toggleInfoSidebar:()=>t(i=>({isInfoSidebarOpen:!i.isInfoSidebarOpen})),openInfoSidebar:()=>t({isInfoSidebarOpen:!0}),closeInfoSidebar:()=>t({isInfoSidebarOpen:!1}),openEditGroupDialog:()=>t({isEditGroupDialogOpen:!0,isHeaderMenuOpen:!1}),closeEditGroupDialog:()=>t({isEditGroupDialogOpen:!1}),toggleDescriptionExpanded:()=>t(i=>({isDescriptionExpanded:!i.isDescriptionExpanded})),collapseDescription:()=>t({isDescriptionExpanded:!1}),setHeaderMenuOpen:i=>t({isHeaderMenuOpen:i}),toggleHeaderMenu:()=>t(i=>({isHeaderMenuOpen:!i.isHeaderMenuOpen})),closeHeaderMenu:()=>t({isHeaderMenuOpen:!1}),openDeleteDialog:()=>t({isDeleteDialogOpen:!0,isHeaderMenuOpen:!1}),closeDeleteDialog:()=>t({isDeleteDialogOpen:!1}),resetChatAreaUi:()=>t(Et)})),Zi=({currentChat:t,currentUser:i,onConfirm:a})=>{const n=oe(D=>D.isDeleteDialogOpen),w=oe(D=>D.closeDeleteDialog),_=(t==null?void 0:t.isGroup)&&(t==null?void 0:t.createdBy)!==(i==null?void 0:i._id);return e.jsx(qr,{isOpen:n,onClose:w,title:_?"Guruhni tark etish":"Suhbatni o'chirish",description:_?"Siz haqiqatan ham ushbu guruhni tark etmoqchimisiz?":"Siz haqiqatan ham ushbu suhbatni o'chirib tashlamoqchimisiz? Bu amal barcha xabarlarni ikkala tomon uchun ham o'chirib yuboradi.",confirmText:_?"Chiqish":"O'chirish",onConfirm:a,isDanger:!0})},eo=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--secondary-color);
  min-height: 56px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    min-height: 48px;
  }
`,to=r.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  cursor: ${t=>t.$clickable?"pointer":"default"};
`,Ve=r.button`
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
`,ro=r.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${t=>(t.$isSavedMessages,"var(--primary-color)")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    margin-right: 10px;
  }
`,io=r.div`
  flex: 1;
  min-width: 0;
`,oo=r.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`,no=r.span`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`,so=r.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${t=>t.$online?"var(--success-color, var(--primary-color))":"var(--text-secondary-color)"};
`,ao=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,lo=r.div`
  position: relative;
`,co=r(Zr)`
  margin-right: 4px;
`,uo=r.div`
  position: absolute;
  top: 55px;
  right: 16px;
  background: var(--secondary-color-with-opacity);
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  /* border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent); */
  border-radius: 14px;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  display: flex;
  flex-direction: column;
`,We=r.button`
  width: 100%;
  padding: 10px 14px;
  color: ${t=>t.$danger?"var(--danger-color, var(--primary-color))":"var(--text-color)"};
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  transition: all 0.15s ease;
  margin-bottom: 2px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${t=>t.$danger?"color-mix(in srgb, var(--danger-color, var(--primary-color)) 18%, transparent)":"color-mix(in srgb, var(--text-color) 8%, transparent)"};
    color: ${t=>t.$danger?"var(--danger-color, var(--primary-color))":"var(--text-color)"};
    /* backdrop-filter: blur(2px) saturate(150%); */
    /* -webkit-backdrop-filter: blur(2px) saturate(150%); */
  }
`,po=r.div`
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
`,xo=r.div`
  height: 1px;
  background: var(--border-color);
  margin: 4px 8px;
`,Rt=t=>["groups","users","a","chats"].includes(t),mo=({onBack:t,selectedNav:i,currentChat:a,displayChat:n,otherMember:w,currentChatName:_,currentUser:D,typingText:T,onlineCount:Y,isOnline:G,lastSeenText:B,onStartPrivateVideoCall:q,headerMenuRef:j})=>{var ne,se,X,te;const F=oe(E=>E.isHeaderMenuOpen),W=oe(E=>E.toggleInfoSidebar),u=oe(E=>E.openInfoSidebar),L=oe(E=>E.openEditGroupDialog),R=oe(E=>E.toggleHeaderMenu),V=oe(E=>E.openDeleteDialog),$=a||n,S=(D==null?void 0:D._id)||(D==null?void 0:D.id),H=!!(n!=null&&n.isOfficialProfile)||["jamm","premium","ceo"].includes(n==null?void 0:n.username),A=($==null?void 0:$.isGroup)&&($==null?void 0:$.createdBy)!==S,y=(ne=a==null?void 0:a.admins)==null?void 0:ne.find(E=>(E.userId||E.id||E._id)===S),m=(a==null?void 0:a.type)==="group"&&((a==null?void 0:a.createdBy)===S||y&&((se=y.permissions)==null?void 0:se.length)>0);return e.jsxs(eo,{children:[e.jsxs(to,{$clickable:Rt(i),onClick:()=>{Rt(i)&&W()},children:[e.jsx(Ve,{onClick:E=>{E.stopPropagation(),t()},children:e.jsx(Vr,{size:20})}),e.jsx(ro,{$isSavedMessages:$==null?void 0:$.isSavedMessages,children:$!=null&&$.isSavedMessages?e.jsx(mt,{size:20,color:"white",fill:"white"}):((X=$==null?void 0:$.avatar)==null?void 0:X.length)>1?e.jsx("img",{src:$.avatar,alt:_}):_.charAt(0).toUpperCase()}),e.jsxs(io,{children:[e.jsx(oo,{children:e.jsx(He,{user:w||n,fallback:_})}),e.jsx(no,{children:T?e.jsxs(po,{children:[e.jsxs("div",{className:"dots",children:[e.jsx("div",{className:"dot"}),e.jsx("div",{className:"dot"}),e.jsx("div",{className:"dot"})]}),T]}):(n==null?void 0:n.type)==="group"?e.jsxs(e.Fragment,{children:[e.jsx(co,{size:14}),((te=n==null?void 0:n.members)==null?void 0:te.length)||0," a'zo",Y>0&&`, ${Y} online`]}):n!=null&&n.isSavedMessages?e.jsx(e.Fragment,{children:"o'zim"}):H?e.jsx(e.Fragment,{children:(n==null?void 0:n.officialBadgeLabel)||"Rasmiy"}):e.jsxs(e.Fragment,{children:[e.jsx(so,{$online:G}),B]})})]})]}),e.jsxs(ao,{children:[(n==null?void 0:n.type)==="user"&&!(n!=null&&n.isSavedMessages)&&!H&&!(n!=null&&n.disableCalls)&&e.jsx(Ve,{onClick:()=>{G?q():de.error("Foydalanuvchi offline. Hozirda qo'ng'iroq qilib bo'lmaydi.")},disabled:!G,title:G?"Video qo'ng'iroq":"Foydalanuvchi offline",children:e.jsx(Wr,{size:20})}),e.jsxs(lo,{ref:j,children:[!H&&e.jsx(Ve,{onClick:R,children:e.jsx(Xr,{size:20})}),F&&e.jsxs(uo,{children:[e.jsxs(We,{onClick:()=>{u()},children:[e.jsx(Qr,{size:18}),(n==null?void 0:n.type)==="group"?"Guruh ma'lumotlari":"Foydalanuvchi ma'lumotlari"]}),m&&e.jsxs(We,{onClick:L,children:[e.jsx(ft,{size:18}),"Guruhni tahrirlash"]}),e.jsx(xo,{}),e.jsxs(We,{$danger:!0,onClick:V,children:[A?e.jsx(Jr,{size:18}):e.jsx(gt,{size:18}),A?"Guruhni tark etish":"Suhbatni o'chirish"]})]})]})]})]})},fo=r.div`
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
    z-index: 10;
    box-shadow: -4px 0 16px var(--shadow-color, rgba(0, 0, 0, 0.2));
  }

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
`,go=r.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
`,Lt=r.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  height: 20px;

  &:hover {
    color: var(--text-color);
  }
`,ho=r.span`
  flex: 1;
  text-align: center;
`,bo=r.div`
  width: 28px;
`,vo=r.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`,yo=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,jo=r.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
  overflow: hidden;
  background: ${t=>(t.$savedMessages,"var(--primary-color)")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,wo=r.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 6px;
`,So=r.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`,Ft=r.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid var(--border-color);
`,Ae=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,_e=r.div`
  font-size: 12px;
  color: var(--text-muted-color);
  text-transform: uppercase;
`,Xe=r.div`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-word;
`,fr=r.button`
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`,ko=r.button`
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
  margin-left: 8px;
  background: transparent;
  border: none;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`,Io=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`,Mo=r.h4`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--text-muted-color);
  margin: 0;
`,$o=r.div`
  display: flex;
  flex-direction: column;
`,zo=r.button`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 14px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background: transparent;
  transition: background-color 0.2s;
  text-align: left;

  &:hover {
    background-color: var(--hover-color);
  }
`,Do=r.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`,Ht=r.span`
  font-size: 11px;
  color: var(--primary-color);
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: auto;
`,Qe=r.div`
  height: 1px;
  background-color: var(--border-color);
  margin: 0 -16px;
`,Ao=r.span`
  color: var(--primary-color);
  cursor: pointer;
`,qt=r.span`
  color: ${t=>t.$online?"var(--primary-color)":"var(--text-muted-color)"};
`,_o=r(fr)`
  color: var(--primary-color);
  font-weight: 500;
`,Yt=r(ei)`
  color: ${t=>t.$muted?"var(--text-muted-color)":"var(--primary-color)"};
`,Po=r.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Co=r.span`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`,Go=r.span`
  font-size: 12px;
  color: ${t=>t.$online?"var(--primary-color)":"var(--text-muted-color)"};
`,Oo=r.div`
  font-size: 13px;
  color: var(--text-muted-color);
`,Nt=({text:t})=>{if(!t)return null;const i=t.split(/(@\w+)/g);return e.jsx(e.Fragment,{children:i.map((a,n)=>a.startsWith("@")?e.jsx(Ao,{children:a},n):a)})},To=({currentChat:t,displayChat:i,currentUser:a,onlineCount:n,isUserOnline:w,onMemberClick:_,onCopyLink:D})=>{var L,R,V,$,S,H;const T=oe(A=>A.isInfoSidebarOpen),Y=oe(A=>A.isDescriptionExpanded),G=oe(A=>A.closeInfoSidebar),B=oe(A=>A.openEditGroupDialog),q=oe(A=>A.toggleDescriptionExpanded);if(!T||!t)return null;const j=(a==null?void 0:a._id)||(a==null?void 0:a.id),F=(L=t.admins)==null?void 0:L.find(A=>(A.userId||A.id||A._id)===j),W=t.type==="group"&&(t.createdBy===j||F&&((R=F.permissions)==null?void 0:R.length)>0),u=t.type==="user"?(V=t.members)==null?void 0:V.find(A=>{const y=A._id||A.id;return String(y)!==String(j)}):null;return e.jsxs(fo,{children:[e.jsxs(go,{children:[e.jsx(Lt,{onClick:G,children:e.jsx($e,{size:20})}),e.jsx(ho,{children:t.type==="user"?"Foydalanuvchi haqida":"Guruh ma'lumotlari"}),W?e.jsx(Lt,{onClick:B,children:e.jsx(ft,{size:18})}):e.jsx(bo,{})]}),e.jsxs(vo,{children:[e.jsxs(yo,{children:[e.jsx(jo,{$savedMessages:t==null?void 0:t.isSavedMessages,children:t!=null&&t.isSavedMessages?e.jsx(mt,{size:40,color:"white",fill:"white"}):(($=t==null?void 0:t.avatar)==null?void 0:$.length)>1?e.jsx("img",{src:t.avatar,alt:t.name}):t.name.charAt(0)}),e.jsxs(wo,{children:[t.name,t.premiumStatus==="active"&&e.jsx(lt,{width:20,height:20})]}),e.jsx(So,{children:t.type==="user"?u?u.isOfficialProfile?e.jsx(qt,{$online:!1,children:u.officialBadgeLabel||"Rasmiy"}):e.jsx(qt,{$online:w(u._id||u.id),children:w(u._id||u.id)?"Online":u.lastSeen||u.lastActive?`Oxirgi marta: ${ue(u.lastSeen||u.lastActive).format("HH:mm")}`:"Offline"}):null:e.jsxs(e.Fragment,{children:[((S=t.members)==null?void 0:S.length)||0," a'zo",n>0&&` · ${n} online`]})})]}),t.type==="user"&&!(t!=null&&t.isSavedMessages)&&u&&e.jsxs(Ft,{children:[e.jsxs(Ae,{children:[e.jsx(_e,{children:"foydalanuvchi nomi"}),e.jsxs(_o,{onClick:()=>{u.username&&(navigator.clipboard.writeText(`@${u.username}`),de.success("Nusxa olindi!"))},children:[e.jsxs("span",{children:["@",u.username||"user"]}),e.jsx(Yt,{size:20})]})]}),u.bio&&e.jsxs(e.Fragment,{children:[e.jsx(Qe,{}),e.jsxs(Ae,{children:[e.jsx(_e,{children:"tarjimayi hol"}),e.jsx(Xe,{children:e.jsx(Nt,{text:u.bio})})]})]}),u.jammId&&e.jsxs(e.Fragment,{children:[e.jsx(Qe,{}),e.jsxs(Ae,{children:[e.jsx(_e,{children:"jamm id"}),e.jsxs(Xe,{children:["#",u.jammId]})]})]})]}),t.type==="group"&&e.jsxs(Ft,{children:[((i==null?void 0:i.privateurl)||(i==null?void 0:i.urlSlug))&&e.jsxs(Ae,{children:[e.jsx(_e,{children:"havolani ulashish"}),e.jsxs(fr,{onClick:()=>D(i.privateurl||i.urlSlug),children:[e.jsxs("span",{children:[sr,"/",i.privateurl||i.urlSlug]}),e.jsx(Yt,{size:20,$muted:!0})]})]}),t.description&&e.jsxs(e.Fragment,{children:[e.jsx(Qe,{}),e.jsxs(Ae,{children:[e.jsx(_e,{children:"tasnif"}),e.jsxs(Xe,{children:[e.jsx(Nt,{text:!Y&&t.description.length>100?`${t.description.substring(0,100)}...`:t.description}),t.description.length>100&&e.jsx(ko,{onClick:q,children:Y?"yopish":"yana"})]})]})]})]}),(i==null?void 0:i.type)==="group"&&e.jsxs(Io,{children:[e.jsx(Mo,{children:"A'zolar"}),e.jsx($o,{children:(H=i.members)!=null&&H.length?i.members.map(A=>{var te,E;const y=typeof A=="object"?A:null;if(!y)return null;const m=y._id||y.id,ne=y.name||y.nickname||y.username||"Foydalanuvchi",se=(te=t.admins)==null?void 0:te.some(ce=>(ce.userId||ce.id||ce._id)===m),X=t.createdBy===m;return e.jsxs(zo,{onClick:()=>_(y),children:[e.jsx(Do,{children:((E=y.avatar)==null?void 0:E.length)>1?e.jsx("img",{src:y.avatar,alt:ne}):ne.charAt(0)}),e.jsxs(Po,{children:[e.jsxs(Co,{children:[ne,y.premiumStatus==="active"&&e.jsx(lt,{width:12,height:12})]}),e.jsx(Go,{$online:!y.isOfficialProfile&&w(m),children:y.isOfficialProfile?y.officialBadgeLabel||"Rasmiy":w(m)?"Online":y.lastSeen||y.lastActive?`Oxirgi marta: ${ue(y.lastSeen||y.lastActive).format("HH:mm")}`:"Offline"})]}),X?e.jsx(Ht,{children:"Ega"}):se?e.jsx(Ht,{children:"Admin"}):null]},m)}):e.jsx(Oo,{children:"A'zolar ro'yxati mavjud emas"})})]})]})]})},Je=["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😱","😭","😤","😠","😡","🤬","🤯","😳","🤪","😵","🥴","😵‍💫","🤯","🥶","🥵","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"],gr=x.createContext(null),Bo=({value:t,children:i})=>e.jsx(gr.Provider,{value:t,children:i}),It=()=>{const t=x.useContext(gr);if(!t)throw new Error("useChatAreaContext must be used inside ChatAreaProvider");return t},Ut=r.div`
  padding: 12px 16px 16px;
  background-color: var(--secondary-color);
  border-top: 1px solid var(--border-color);
  position: relative;
`,Eo=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ro=r.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`,Lo=r.div`
  color: var(--text-muted-color);
`,Fo=r.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`,Ho=r.div`
  background: color-mix(in srgb, var(--secondary-color) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 84%, transparent);
  border-left: 3px solid var(--primary-color);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
  cursor: pointer;
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 8%, transparent);
`,qo=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,Yo=r.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`,No=r.div`
  font-size: 12px;
  color: var(--text-secondary-color);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`,Uo=r.strong`
  color: var(--primary-color);
`,Ko=r.span`
  color: var(--text-secondary-color);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 2px;
  flex-shrink: 0;
`,Vo=r.div`
  display: flex;
  align-items: center;
  background-color: var(--input-color);
  border-radius: 20px;
  padding: 8px 12px;
  min-height: 44px;
  transition: background-color 0.2s ease;

  &:focus-within {
    background-color: var(--hover-color);
  }
`,Kt=r.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`,Vt=r.button`
  color: var(--text-muted-color);
  cursor: pointer;
  transition: color 0.2s ease;
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: var(--text-color);
  }
`,Wo=r.textarea`
  flex: 1;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 15px;
  line-height: 25px;
  outline: none;
  resize: none;
  min-height: 25px;
  max-height: 400px;
  padding: 0;
  font-family: inherit;

  &::placeholder {
    color: var(--text-secondary-color);
  }
`,Xo=r.div`
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: min(360px, calc(100vw - 24px));
  background: var(--secondary-color-with-opacity);
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-radius: 18px;
  padding: 12px;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  backdrop-filter: blur(2px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: min(420px, calc(100vh - 140px));
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    right: 12px;
    left: 12px;
    bottom: 88px;
    width: auto;
  }
`,Qo=r.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  top: -12px;
  z-index: 2;
  margin: -12px -12px 0;
  padding: 12px;
  background:    var(--secondary-color-with-opacity);
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 62%, transparent);
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
`,Jo=r.div`
  min-width: 0;
`,Zo=r.div`
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
`,en=r.div`
  color: var(--text-secondary-color);
  font-size: 12px;
  margin-top: 2px;
`,tn=r.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background: color-mix(in srgb, var(--input-color) 82%, transparent);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 74%, transparent);
    color: var(--text-color);
  }
`,rn=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,on=r.div`
  color: var(--text-secondary-color);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0 4px;
`,nn=r.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
`,sn=r.button`
  background: color-mix(in srgb, var(--input-color) 76%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 70%, transparent);
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 78%, transparent);
    border-color: color-mix(in srgb, var(--primary-color) 26%, var(--border-color));
    transform: translateY(-1px) scale(1.04);
  }
`,an=()=>{const{currentChat:t,previewChat:i,navigate:a,joinGroupChat:n,replyMessage:w,setReplyMessage:_,focusReplyTargetMessage:D,toggleEmojiPicker:T,showEmojiPicker:Y,handleEmojiClick:G,messageInputRef:B,messageInput:q,handleInputChange:j,handleSendMessage:F}=It(),W=[{label:"Faces",emojis:Je.slice(0,35)},{label:"Mood",emojis:Je.slice(35,80)},{label:"Fun",emojis:Je.slice(80)}];return i&&!t&&i.type!=="user"?e.jsx(Ut,{children:e.jsxs(Ro,{children:[e.jsx(Lo,{children:"Siz ushbu guruh a'zosi emassiz"}),e.jsx(Fo,{onClick:async()=>{try{await n(i.privateurl||i.jammId),a(`/groups/${i.jammId||i.privateurl}`,{replace:!0})}catch(u){de.error(u.message||"Xatolik yuz berdi")}},children:"Guruhga qo'shilish"})]})}):e.jsxs(Ut,{children:[e.jsxs(Eo,{children:[w&&e.jsx(Ho,{onClick:()=>D(w.id),children:e.jsxs(qo,{children:[e.jsxs(Yo,{children:[e.jsx(Uo,{children:w.user}),e.jsx(No,{children:w.content})]}),e.jsx(Ko,{className:"replay-close",onClick:u=>{u.stopPropagation(),_(null),setTimeout(()=>{var L;(L=B.current)==null||L.focus()},0)},children:"✕"})]})}),e.jsxs(Vo,{children:[e.jsx(Kt,{children:e.jsx(Vt,{children:e.jsx(Te,{size:20})})}),e.jsx(Wo,{id:"message-input",ref:B,value:q,onChange:j,onKeyDown:F,placeholder:"Xabar...",rows:1,maxLength:400}),e.jsx(Kt,{children:e.jsx(Vt,{onClick:T,className:"emoji-button",children:e.jsx(ti,{size:20})})})]})]}),Y&&e.jsxs(Xo,{className:"emoji-picker-container",children:[e.jsxs(Qo,{children:[e.jsxs(Jo,{children:[e.jsx(Zo,{children:"Emoji"}),e.jsx(en,{children:"Tez qo‘shish uchun bosing"})]}),e.jsx(tn,{type:"button",onClick:T,children:e.jsx($e,{size:16})})]}),W.map(u=>e.jsxs(rn,{children:[e.jsx(on,{children:u.label}),e.jsx(nn,{children:u.emojis.map((L,R)=>e.jsx(sn,{onClick:()=>G(L),children:L},`${u.label}-${L}-${R}`))})]},u.label))]})]})},ln=r.div`
  position: fixed;
  left: ${t=>`${t.$x}px`};
  top: ${t=>`${t.$y}px`};
    background:var(--secondary-color-with-opacity);
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-radius: 14px;
  padding: 8px;
  min-width: 180px;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
`,Ze=r.button`
  width: 100%;
  padding: 10px 14px;
  color: ${t=>t.$danger?"var(--danger-color, var(--primary-color))":"var(--text-color)"};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  transition: all 0.15s ease;
  margin-bottom: 2px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${t=>t.$danger?"color-mix(in srgb, var(--danger-color, var(--primary-color)) 18%, transparent)":"color-mix(in srgb, var(--text-color) 8%, transparent)"};
    color: ${t=>t.$danger?"var(--danger-color, var(--primary-color))":"var(--text-color)"};
  }
`,dn=()=>{var Y,G;const{contextMenu:t,currentChat:i,currentUser:a,handleContextMenuAction:n}=It();if(!t)return null;const w=(a==null?void 0:a._id)||(a==null?void 0:a.id),D=(t.message.senderId&&typeof t.message.senderId=="object"?t.message.senderId._id||t.message.senderId.id:t.message.senderId)===w;let T=!1;if(!D&&(i==null?void 0:i.type)==="group"){const B=i.createdBy===w,q=(Y=i.admins)==null?void 0:Y.find(j=>(j.userId||j.id||j._id)===w);T=B||q&&((G=q.permissions)==null?void 0:G.includes("delete_others_messages"))}return e.jsxs(ln,{$x:t.x,$y:t.y,onClick:B=>B.stopPropagation(),onContextMenu:B=>{B.preventDefault(),B.stopPropagation()},children:[e.jsxs(Ze,{onClick:()=>n("reply",t.message),children:[e.jsx(ri,{size:16})," Javob yozish"]}),(D||T)&&e.jsxs(e.Fragment,{children:[D&&e.jsxs(Ze,{onClick:()=>n("edit",t.message),children:[e.jsx(ft,{size:16})," Tahrirlash"]}),e.jsxs(Ze,{$danger:!0,onClick:()=>n("delete",t.message),children:[e.jsx(gt,{size:16})," O'chirish"]})]})]})},cn=r.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`,un=r.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;

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
`,pn=r.div`
  display: flex;
  flex-direction: column;
`,xn=r.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;

  span {
    color: var(--text-secondary-color);
    font-size: 12px;
    font-weight: 600;
    padding: 0 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`,mn=r.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${t=>t.$isOwn?"flex-end":"flex-start"};
  cursor: pointer;
  border-radius: 16px;
  padding: 0 5px 5px 0;
`,Wt=r.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  gap: 8px;
  color: ${t=>t.$isOwn?"var(--text-muted-color)":"var(--text-secondary-color)"};
  justify-content: ${t=>t.$isOwn?"flex-end":"flex-start"};
`,fn=r.div`
  flex: 1;
  margin-left: 40px;
`,gn=r.span`
  color: var(--text-color);
  font-weight: 500;
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,hn=r.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
`,bn=r.div`
  display: flex;
  align-items: center;
  max-width: 90%;
`,vn=r.button`
  background: color-mix(in srgb, var(--input-color) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  ${t=>t.$isOwn?"border-left: 3px solid var(--primary-color);":"border-right: 3px solid var(--primary-color);"}
  padding: 8px 10px;
  margin: 8px 0;
  border-radius: 10px;
  color: var(--text-muted-color);
  cursor: pointer;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isOwn?"flex-end":"flex-start"};
  gap: 2px;
  text-align: ${t=>t.$isOwn?"right":"left"};
  max-width: 320px;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  }
`,yn=r.span`
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 700;
`,jn=r.span`
  color: var(--text-secondary-color);
  font-size: 12px;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`,wn=r.div`
  width: fit-content;
  min-width: 60px;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;
  background-color: ${t=>t.$isOwn?"var(--hover-color)":"var(--input-color)"};
  color: ${t=>t.$isOwn?"white":"var(--text-color)"};
  text-align: ${t=>t.$isOwn?"right":"left"};
`,Sn=r.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  white-space: pre-wrap;
  text-align: ${t=>t.$isOwn?"right":"left"};
`,kn=r.span`
  font-size: 11px;
  color: var(--text-secondary-color);
  font-style: italic;
  margin-left: 4px;
`,In=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`,Mn=r.input`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--input-color) 72%, transparent);
`,$n=r.h4`
  text-align: center;
  padding: 10px;
  color: var(--text-muted-color);
  margin: 0;
`,zn=r.span`
  margin-left: 4px;
  display: flex;
  align-items: center;
`,Dn=()=>{const{messages:t,messageGroups:i,messagesHasMore:a,isLoadingMessages:n,fetchMoreMessages:w,currentUser:_,currentChat:D,displayChat:T,selectedNav:Y,messageRefs:G,messagesEndRef:B,editingMessage:q,editInput:j,setEditInput:F,handleEditMessage:W,handleMessageDoubleClick:u,renderMessageContent:L,focusReplyTargetMessage:R,showContextMenu:V,handleUsernameClick:$,getUserAvatar:S,formatDate:H}=It(),A=y=>{y.currentTarget.scrollTop>120||n||!a||w()};return e.jsx(cn,{children:e.jsxs(un,{id:"scrollableChatArea",onContextMenu:y=>y.preventDefault(),onScroll:A,children:[n&&t.length>0?e.jsx($n,{children:"Oldingi xabarlar yuklanmoqda..."}):null,e.jsx(pn,{children:i.map((y,m)=>{var te;if(y.type==="date")return e.jsx(xn,{children:e.jsx("span",{children:H(y.date)})},`date-${m}`);const ne=(_==null?void 0:_._id)||(_==null?void 0:_.id),se=y.senderId&&typeof y.senderId=="object"?y.senderId._id||y.senderId.id:y.senderId,X=ne&&String(se)===String(ne);return e.jsxs(mn,{"data-message-id":y.id,$isOwn:X,onClick:()=>u(y),ref:E=>{G.current[y.id]=E},children:[!X&&(T==null?void 0:T.type)==="group"&&e.jsx(Wt,{$isOwn:!1,children:e.jsx(fn,{children:e.jsxs(gn,{children:[y.user,((te=y.senderId)==null?void 0:te.premiumStatus)==="active"&&e.jsx(lt,{width:14,height:14})]})})}),y.replayTo&&e.jsxs(vn,{type:"button",$isOwn:X,onClick:E=>{E.stopPropagation();const ce=t.find(fe=>String(fe.id||fe._id)===String(y.replayTo.id));ce&&R(ce.id)},children:[e.jsx(yn,{children:y.replayTo.user}),e.jsx(jn,{children:y.replayTo.content})]}),e.jsxs(bn,{children:[!X&&Y==="groups"&&e.jsx(hn,{onClick:E=>$(y.user,E),children:S(y.user)}),e.jsx(wn,{$isOwn:X,onContextMenu:E=>{E.preventDefault(),E.stopPropagation(),V(y,E)},children:(q==null?void 0:q.id)===y.id?e.jsx(In,{children:e.jsx(Mn,{className:"edit-input",type:"text",value:j,onChange:E=>F(E.target.value),onKeyDown:W,placeholder:"Xabarni tahrirlang...",maxLength:400,autoFocus:!0})}):e.jsxs(e.Fragment,{children:[e.jsx(Sn,{$isOwn:X,children:L(y.content)}),y.edited&&e.jsx(kn,{children:"(tahrirlandi)"})]})})]}),e.jsxs(Wt,{$isOwn:X,children:[e.jsx("span",{children:y.timestamp}),X&&!y.isDeleted&&e.jsx(zn,{children:y.readBy&&y.readBy.length>0?e.jsx(ii,{size:14,color:"var(--success-color, var(--primary-color))"}):e.jsx(nr,{size:14,color:"var(--text-secondary-color)"})})]})]},y.id)})}),e.jsx("div",{ref:B})]})})},An=r.button`
  pointer-events: auto;
  color: var(--primary-color);
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  border: none;
  background: transparent;

  &:hover {
    background: var(--active-color);
  }
`,_n=r.a`
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    border-bottom-color: var(--primary-color);
  }
`,Pn=t=>{const i=/@(\w+)/g,a=/(https?:\/\/[^\s]+)/g,n=[],w=[];let _=0,D;for(;(D=i.exec(t))!==null;)w.push({type:"mention",index:D.index,length:D[0].length,username:D[1],content:D[0]});for(;(D=a.exec(t))!==null;)w.push({type:"url",index:D.index,length:D[0].length,url:D[0],content:D[0]});return w.sort((T,Y)=>T.index-Y.index),w.forEach(T=>{T.index>_&&n.push({type:"text",content:t.substring(_,T.index)}),n.push(T),_=T.index+T.length}),_<t.length&&n.push({type:"text",content:t.substring(_)}),n.length?n:[{type:"text",content:t}]},Cn=(t,i)=>Pn(t).map((a,n)=>a.type==="mention"?e.jsx(An,{onClick:w=>i(a.username,w),children:a.content},`${a.type}-${n}`):a.type==="url"?e.jsx(_n,{href:a.url,target:"_blank",rel:"noopener noreferrer",children:a.content},`${a.type}-${n}`):e.jsx("span",{children:a.content},`${a.type}-${n}`)),et=t=>t&&typeof t=="object"?t._id||t.id:t,Gn=t=>{const i=[];let a=null;return t.forEach(n=>{let w=n.date;if(!w&&n.timestamp){const _=new Date(n.timestamp);w=Number.isNaN(_.getTime())?new Date().toISOString().split("T")[0]:_.toISOString().split("T")[0]}w!==a&&(a=w,i.push({type:"date",date:a})),i.push({...n,type:"message",date:w})}),i},On=t=>{var i,a,n,w,_,D,T,Y,G;return{id:t._id,user:((i=t.senderId)==null?void 0:i.nickname)||((a=t.senderId)==null?void 0:a.username),avatar:((n=t.senderId)==null?void 0:n.avatar)||((D=((w=t.senderId)==null?void 0:w.nickname)||((_=t.senderId)==null?void 0:_.username))==null?void 0:D.charAt(0))||"U",senderId:((T=t.senderId)==null?void 0:T._id)||t.senderId,content:t.content,timestamp:ue(t.createdAt).format("HH:mm"),date:ue(t.createdAt).format("YYYY-MM-DD"),edited:t.isEdited,isDeleted:t.isDeleted,readBy:t.readBy||[],replayTo:t.replayTo?{id:t.replayTo._id,user:((Y=t.replayTo.senderId)==null?void 0:Y.nickname)||((G=t.replayTo.senderId)==null?void 0:G.username),content:t.replayTo.content}:null,createdAt:t.createdAt}},Tn=t=>{const i=t.split(" ");return i.length>=2?i[0][0]+i[i.length-1][0]:i[0].substring(0,2).toUpperCase()};function Bn({selectedChatId:t,selectedNav:i,navigate:a,chats:n}){const{fetchMessages:w,sendMessage:_,editMessage:D,deleteMessage:T,getUserByUsername:Y,createChat:G,editChat:B,previewGroupChat:q,joinGroupChat:j,deleteChat:F,leaveChat:W,chatSocket:u,markMessagesAsRead:L,typingUsers:R,sendTypingStatus:V,previewChat:$,setPreviewChat:S}=bt(),{isUserOnline:H,getOnlineCount:A}=ir(),{startPrivateCall:y}=Yr(),m=we(d=>d.user),ne=oe(d=>d.isEditGroupDialogOpen),se=oe(d=>d.isHeaderMenuOpen),X=oe(d=>d.closeHeaderMenu),te=oe(d=>d.closeDeleteDialog),E=oe(d=>d.closeInfoSidebar),ce=oe(d=>d.closeEditGroupDialog),fe=oe(d=>d.resetChatAreaUi),b=n.find(d=>d.urlSlug===t||d.id===t),[xe,Q]=x.useState(""),[J,le]=x.useState([]),[ge,v]=x.useState(null),[s,l]=x.useState(!0),[g,N]=x.useState(!1),[C,o]=x.useState(null),[f,c]=x.useState(null),[h,I]=x.useState(""),[P,Z]=x.useState(null),[ae,he]=x.useState(!1),[ve,ye]=x.useState(0),[Se,ke]=x.useState(null),[be,hr]=x.useState(null),Ie=x.useRef(null),Ye=x.useRef(null),Ne=x.useRef(null),ze=x.useRef({}),Ee=x.useRef(null),K=x.useRef(null);x.useEffect(()=>{fe()},[t,fe]);const re=b||$,br=(re==null?void 0:re.name)||"Chat",me=(re==null?void 0:re.type)!=="group"&&(re!=null&&re.members)?re.members.find(d=>{const p=d._id||d.id,z=(m==null?void 0:m._id)||(m==null?void 0:m.id);return String(p)!==String(z)}):null,Ue=me?H(me._id):!1,vr=(re==null?void 0:re.type)==="group"?A(re.members):0,yr=x.useMemo(()=>{if(!me||Ue)return"Online";if(!me.lastSeen)return"Offline";const d=new Date(me.lastSeen),z=Math.floor((new Date-d)/6e4),k=Math.floor(z/60);return z<60?`Last seen ${z}m ago`:k<24?`Last seen ${k}h ago`:`Last seen ${d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`},[me,Ue]);x.useEffect(()=>{if(!["groups","users","a","chats"].includes(i)||!t||b){Ye.current=null,S(null);return}if(Ye.current===t)return;Ye.current=t,(async()=>{try{if(i==="users"){const p=await Ot(t);if(p){S({type:"user",id:null,name:p.nickname||p.username,avatar:p.avatar,description:p.bio,targetUserId:p._id||p.id});return}}try{const p=await q(t);S(p)}catch{if(i==="groups"){S(null);return}const p=await Ot(t);S(p?{type:"user",id:null,name:p.nickname||p.username,avatar:p.avatar,description:p.bio,targetUserId:p._id||p.id}:null)}}catch{S(null)}})()},[i,t,b,q,S]),x.useEffect(()=>{if(!b)return;(async()=>{N(!0);const p=await w(b.id),z=p.data||[];le(z),v(p.nextCursor||null),l(!!p.hasMore),N(!1);const k=(m==null?void 0:m._id)||(m==null?void 0:m.id),M=z.find(O=>{var U;return O.senderId!==k&&!((U=O.readBy)!=null&&U.includes(k))});setTimeout(()=>{var U;const O=M?M.id||M._id:null;O&&ze.current[O]?ze.current[O].scrollIntoView({behavior:"auto",block:"center"}):(U=Ee.current)==null||U.scrollIntoView({behavior:"auto"})},100)})()},[b==null?void 0:b.id,m==null?void 0:m._id,m==null?void 0:m.id,w]);const Mt=async()=>{if(!b||g||!s||!ge)return;N(!0);const d=document.getElementById("scrollableChatArea"),p=(d==null?void 0:d.scrollHeight)||0,z=(d==null?void 0:d.scrollTop)||0,k=await w(b.id,ge),M=k.data||[];le(O=>[...M,...O]),v(k.nextCursor||null),l(!!k.hasMore),N(!1),setTimeout(()=>{d&&(d.scrollTop=d.scrollHeight-p+z)},0)};x.useEffect(()=>{if(!(!u||!b))return u.emit("join_chat",{chatId:b.id}),()=>{u.emit("leave_chat",{chatId:b.id})}},[u,b==null?void 0:b.id]),x.useEffect(()=>{if(!u)return;const d=M=>{if(M.chatId!==(b==null?void 0:b.id))return;const O=On(M);le(ie=>ie.some(pe=>pe.id===O.id)?ie:[...ie,O]);const U=(m==null?void 0:m._id)||(m==null?void 0:m.id);O.senderId===U&&setTimeout(()=>{var ie;(ie=Ee.current)==null||ie.scrollIntoView({behavior:"smooth"})},100)},p=M=>{M.chatId===(b==null?void 0:b.id)&&le(O=>O.map(U=>U.id===M._id?{...U,content:M.content,edited:!0}:U))},z=M=>{M.chatId===(b==null?void 0:b.id)&&le(O=>O.filter(U=>U.id!==M._id))},k=({chatId:M,readByUserId:O,messageIds:U})=>{(b==null?void 0:b.id)===M&&le(ie=>ie.map(pe=>{var De;return et(pe.senderId)!==O&&(U!=null&&U.includes(pe.id||pe._id))&&!((De=pe.readBy)!=null&&De.includes(O))?{...pe,readBy:[...pe.readBy||[],O]}:pe}))};return u.on("message_new",d),u.on("message_updated",p),u.on("message_deleted",z),u.on("messages_read",k),()=>{u.off("message_new",d),u.off("message_updated",p),u.off("message_deleted",z),u.off("messages_read",k)}},[u,b==null?void 0:b.id,m==null?void 0:m._id,m==null?void 0:m.id]),x.useEffect(()=>{if(!b)return;const d=(m==null?void 0:m._id)||(m==null?void 0:m.id),p=J.filter(k=>{var O;return et(k.senderId)!==d&&!((O=k.readBy)!=null&&O.includes(d))});if(!p.length)return;const z=new IntersectionObserver(k=>{const M=[];k.forEach(O=>{var Ke;if(!O.isIntersecting)return;const U=O.target.dataset.messageId,ie=J.find(De=>String(De.id)===String(U)||String(De._id)===String(U));if(!ie)return;const pe=et(ie.senderId);String(pe)!==String(d)&&!((Ke=ie.readBy)!=null&&Ke.includes(d))&&M.push(ie.id||ie._id)}),M.length>0&&L(b.id,M)},{threshold:.1});return p.forEach(k=>{const M=ze.current[k.id];M&&z.observe(M)}),()=>z.disconnect()},[J,b,m,L]),x.useEffect(()=>{K.current&&(K.current.focus(),K.current.setSelectionRange(K.current.value.length,K.current.value.length))},[t,i,C,b==null?void 0:b.id]),x.useEffect(()=>{K.current&&(K.current.style.height="25px",K.current.style.height=`${K.current.scrollHeight}px`)},[xe]),x.useEffect(()=>()=>{be&&clearTimeout(be)},[be]),x.useEffect(()=>{const d=p=>{P&&Z(null),ae&&!p.target.closest(".emoji-picker-container")&&!p.target.closest(".emoji-button")&&he(!1)};return document.addEventListener("click",d),()=>document.removeEventListener("click",d)},[P,ae]),x.useEffect(()=>{if(!se)return;const d=p=>{Ne.current&&!Ne.current.contains(p.target)&&X()};return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[X,se]),x.useEffect(()=>{if(!f)return;const d=p=>{p.target.closest(".edit-input")||(c(null),I(""))};return document.addEventListener("click",d),()=>document.removeEventListener("click",d)},[f]);const $t=async d=>{const p=(m==null?void 0:m._id)||(m==null?void 0:m.id),z=d._id||d.id;if(String(z)===String(p)){E();return}const k=n.find(M=>M.isGroup||!M.members||M.isSavedMessages?!1:M.members.some(O=>(O._id||O.id)===z));if(k){a(`/users/${k.jammId||k.urlSlug||k.id}`),E();return}try{const M=await G({isGroup:!1,memberIds:[z]});M&&(a(`/users/${M.jammId||M}`),E())}catch(M){console.error("Failed to start private chat",M)}},jr=(d="auto")=>{var p;(p=Ee.current)==null||p.scrollIntoView({behavior:d})},wr=d=>{const p=ze.current[d];p&&(p.scrollIntoView({behavior:"smooth",block:"center"}),p.style.backgroundColor="color-mix(in srgb, var(--primary-color) 28%, transparent)",setTimeout(()=>{p.style.backgroundColor=""},2e3),setTimeout(()=>{var z;(z=K.current)==null||z.focus()},0))},Sr=(d,p)=>{p&&p.preventDefault(),Se!==d.id?(ye(1),ke(d.id)):ye(k=>k+1),be&&clearTimeout(be);const z=setTimeout(()=>{ve===1&&Se===d.id&&(o(d),setTimeout(()=>{K.current&&(K.current.focus(),K.current.setSelectionRange(K.current.value.length,K.current.value.length))},0)),ye(0),ke(null)},300);hr(z)},kr=(d,p)=>{const k=d.user==="You"?120:40;let M=p.clientX,O=p.clientY;M+180>window.innerWidth&&(M=window.innerWidth-180-10),O+k>window.innerHeight&&(O=window.innerHeight-k-10),Z({x:Math.max(M,10),y:Math.max(O,10),message:d})},Ir=async(d,p)=>{switch(d){case"delete":try{le(z=>z.map(k=>k.id===p.id?{...k,isDeleted:!0,content:"Bu xabar o'chirildi"}:k)),await T(p.id)}catch(z){console.error("Failed to delete message",z)}break;case"edit":if(p.isDeleted)return;c(p),I(p.content);break;case"reply":o(p),Q(""),setTimeout(()=>{K.current&&(K.current.focus(),K.current.setSelectionRange(K.current.value.length,K.current.value.length))},0);break}Z(null)},zt=async d=>{if(d.key==="Enter"&&h.trim()){try{const p=h.trim(),z=f.id;le(k=>k.map(M=>M.id===f.id?{...M,content:p,edited:!0}:M)),c(null),I(""),await D(z,p)}catch(p){console.error("Failed to edit message",p)}return}d.key==="Escape"&&(c(null),I(""))},Dt=d=>{const p=d.target.value,z=(b==null?void 0:b.id)||(b==null?void 0:b._id);Q(p),z&&p.trim()?(Ie.current||V(z,!0),Ie.current&&clearTimeout(Ie.current),Ie.current=setTimeout(()=>{V(z,!1),Ie.current=null},3e3)):z&&!p.trim()&&Ie.current&&(clearTimeout(Ie.current),V(z,!1),Ie.current=null)},Mr=x.useMemo(()=>{const d=(b==null?void 0:b.id)||(b==null?void 0:b._id);if(!d||!R[d])return null;const p=Object.keys(R[d]),z=(m==null?void 0:m._id)||(m==null?void 0:m.id),k=p.filter(O=>String(O)!==String(z));if(!k.length)return null;if(b.type==="user")return"yozmoqda";const M=k.map(O=>{var ie;const U=(ie=b.members)==null?void 0:ie.find(pe=>String(pe._id||pe.id)===String(O));return(U==null?void 0:U.nickname)||(U==null?void 0:U.username)||"Kimdir"});return M.length===1?`${M[0]} yozmoqda`:M.length===2?`${M[0]} va ${M[1]} yozmoqdalar`:"Bir necha kishi yozmoqda"},[b,m==null?void 0:m._id,m==null?void 0:m.id,R]),$r=(d,p)=>{var k;p.stopPropagation();const z=(k=b==null?void 0:b.members)==null?void 0:k.find(M=>(M.nickname||M.username||M.name)===d);z&&$t(z)},zr=async(d,p)=>{p.stopPropagation();try{const z=await Y(d);if(!z||!a){de.error("Bunday foydalanuvchi topilmadi");return}const k=z._id||z.id;if(m&&String(k)===String(m._id||m.id)){de.error("Siz o'zingiz bilan suhbat qura olmaysiz");return}const M=n.find(U=>!U.isGroup&&U.members&&U.members.some(ie=>String(ie._id||ie.id)===String(k)));if(M){a(`/users/${M.jammId}`);return}const O=await G({isGroup:!1,memberIds:[k]});O!=null&&O.jammId&&a(`/users/${O.jammId}`)}catch(z){console.error("Error handling mention click:",z),de.error("Foydalanuvchini qidirishda xatolik yuz berdi")}},Dr=d=>Cn(d,zr),Ar=d=>{Q(p=>p+d),setTimeout(()=>{K.current&&(K.current.focus(),K.current.setSelectionRange(K.current.value.length,K.current.value.length))},0)},_r=d=>{d.stopPropagation(),he(p=>!p),ae&&setTimeout(()=>{K.current&&(K.current.focus(),K.current.setSelectionRange(K.current.value.length,K.current.value.length))},0)},Pr=()=>{!re||!me||y({_id:me._id||me.id,name:me.nickname||me.username||re.name,avatar:me.avatar||re.avatar})},Cr=async()=>{var p,z;if(!(b!=null&&b.id))return;const d=b.isGroup&&b.createdBy!==(m==null?void 0:m._id);try{d?(await W(b.id),de.success("Guruhdan muvaffaqiyatli chiqdingiz")):(await F(b.id),de.success("Suhbat muvaffaqiyatli o'chirildi")),te(),a("/chats")}catch(k){console.error(k),de.error(((z=(p=k.response)==null?void 0:p.data)==null?void 0:z.message)||(d?"Guruhdan chiqishda xatolik yuz berdi":"Suhbatni o'chirishda xatolik yuz berdi"))}},At=x.useMemo(()=>Gn(J),[J]),_t=async d=>{if(d.key!=="Enter"||d.shiftKey||!xe.trim())return;d.preventDefault();const p=xe.trim(),z=C?C.id:null;Q(""),o(null),setTimeout(()=>{var k;(k=K.current)==null||k.focus()},0);try{let k=b==null?void 0:b.id;if(!k&&($==null?void 0:$.type)==="user"&&(k=await lr({isGroup:!1,memberIds:[$.targetUserId]}),k&&a(`/users/${k}`)),!k)return;const M=await _(k,p,z);le(O=>!M||O.some(U=>U.id===M.id)?O:[...O,M]),setTimeout(()=>jr("smooth"),100)}catch(k){console.error("Failed to send message:",k)}},Gr=n.filter(d=>d.type==="user"&&!d.isSavedMessages).map(d=>{var z;const p=(z=d.members)==null?void 0:z.find(k=>(k._id||k.id)!==((m==null?void 0:m._id)||(m==null?void 0:m.id)));return{...p,id:(p==null?void 0:p._id)||(p==null?void 0:p.id),name:(p==null?void 0:p.nickname)||(p==null?void 0:p.username)||"Noma'lum"}}).filter(d=>d.id),Or=async d=>{try{await B(b.id||b._id,d)}catch(p){console.error("Guruhni tahrirlashda xatolik",p)}},Tr=d=>{navigator.clipboard.writeText(`${sr}/${d}`),de.success("Havola nusxalandi")},Br=x.useMemo(()=>({currentChat:b,currentUser:m,displayChat:re,selectedNav:i,previewChat:$,navigate:a,joinGroupChat:j,messages:J,messagesHasMore:s,isLoadingMessages:g,messageGroups:At,contextMenu:P,replyMessage:C,setReplyMessage:o,editingMessage:f,editInput:h,setEditInput:I,showEmojiPicker:ae,messageInput:xe,messageRefs:ze,messagesEndRef:Ee,messageInputRef:K,fetchMoreMessages:Mt,handleMessageDoubleClick:Sr,focusReplyTargetMessage:wr,showContextMenu:kr,handleContextMenuAction:Ir,handleEditMessage:zt,handleUsernameClick:$r,getUserAvatar:Tn,renderMessageContent:Dr,formatDate:Bi,handleInputChange:Dt,handleSendMessage:_t,toggleEmojiPicker:_r,handleEmojiClick:Ar}),[P,b,m,re,h,f,Mt,zt,Dt,_t,j,At,xe,J,s,g,a,$,C,i,ae]);return{closeEditGroupDialog:ce,contextValue:Br,currentChat:b,currentChatName:br,currentUser:m,displayChat:re,editGroupUsers:Gr,handleCopyChatLink:Tr,handleDeleteChat:Cr,handleEditGroupSave:Or,handleMemberClick:$t,headerMenuRef:Ne,isEditGroupDialogOpen:ne,isOnline:Ue,isUserOnline:H,lastSeenText:yr,onlineCount:vr,otherMember:me,startPrivateVideoCall:Pr,typingText:Mr}}const En=r.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--background-color);
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
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
`,Rn=r.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`,Ln=r.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`,Fn=r.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`,Hn=({onBack:t,selectedChatId:i,selectedNav:a,navigate:n,chats:w=[]})=>{const{closeEditGroupDialog:_,contextValue:D,currentChat:T,currentChatName:Y,currentUser:G,displayChat:B,editGroupUsers:q,handleCopyChatLink:j,handleDeleteChat:F,handleEditGroupSave:W,handleMemberClick:u,headerMenuRef:L,isEditGroupDialogOpen:R,isOnline:V,isUserOnline:$,lastSeenText:S,onlineCount:H,startPrivateVideoCall:A,typingText:y,otherMember:m}=Bn({selectedChatId:i,selectedNav:a,navigate:n,chats:w});return!B&&!i?null:e.jsx(Bo,{value:D,children:e.jsxs(Rn,{children:[e.jsxs(En,{children:[e.jsx(mo,{onBack:t,selectedNav:a,currentChat:T,displayChat:B,otherMember:m,currentChatName:Y,currentUser:G,typingText:y,onlineCount:H,isOnline:V,lastSeenText:S,onStartPrivateVideoCall:A,headerMenuRef:L}),e.jsx(Ln,{children:e.jsxs(Fn,{children:[e.jsx(Dn,{}),e.jsx(an,{})]})}),e.jsx(dn,{})]}),e.jsx(To,{currentChat:T,displayChat:B,currentUser:G,onlineCount:H,isUserOnline:$,onMemberClick:u,onCopyLink:j}),e.jsx(Nr,{}),e.jsx(mr,{isOpen:R,onClose:_,group:T,users:q,onSave:W}),e.jsx(Zi,{currentChat:T,currentUser:G,onConfirm:F})]})})},Xt=r.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,tt=r.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
`,rt=r.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`,qn=r.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`,Yn=r.div`
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
`,Nn=r.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Un=r.div`
  position: relative;
  margin-bottom: 8px;
`,Kn=r.div`
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background-color: var(--tertiary-color);
`,Vn=r.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;

  &:hover {
    background-color: var(--secondary-color);
  }

  ${t=>t.selected&&`
    background-color: rgba(88, 101, 242, 0.1);
    &:hover { background-color: rgba(88, 101, 242, 0.2); }
  `}
`,Wn=r.div`
  display: flex;
  align-items: center;
  gap: 10px;
`,Xn=r.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`,Qn=r.span`
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
`,Jn=r.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`,Zn=({isOpen:t,onClose:i,onCreate:a,users:n=[]})=>{const[w,_]=x.useState(""),[D,T]=x.useState(""),[Y,G]=x.useState(""),[B,q]=x.useState([]),[j,F]=x.useState(""),W=x.useRef(null),u=Li({onSuccess:S=>G(S),onError:()=>de.error("Rasm yuklashda xatolik yuz berdi")});if(!t)return null;const L=()=>{w.trim()&&(a({name:w,description:D,image:Y,members:B}),_(""),T(""),G(""),q([]),i())},R=S=>{const H=n.find(A=>String(A.id)===String(S));if(!(H!=null&&H.disableGroupInvites||H!=null&&H.isOfficialProfile))if(B.includes(S))q(B.filter(A=>A!==S));else{if(B.length>=39){de.error("Guruhga maksimal 40ta odam qo'shish mumkin");return}q([...B,S])}},V=n.filter(S=>S.name.toLowerCase().includes(j.toLowerCase())&&S.type==="user"&&!S.isSavedMessages&&j.trim()!==""),$=S=>{var y;const H=(y=S.target.files)==null?void 0:y[0];if(!H)return;if(H.size>2*1024*1024){de.error("Fayl hajmi juda katta (maksimum 2MB)");return}const A=new FormData;A.append("file",H),u.mutate(A)};return e.jsx(ui,{onClick:i,$zIndex:9999,children:e.jsxs(pi,{$width:"min(100%, 520px)",$maxHeight:"min(86vh, 760px)",$radius:"18px",onClick:S=>S.stopPropagation(),children:[e.jsxs(xi,{$padding:"18px",children:[e.jsxs(mi,{children:[e.jsx(fi,{children:"Guruh yaratish"}),e.jsx(gi,{children:"Do'stlaringiz bilan muloqot qiling"})]}),e.jsx(hi,{onClick:i,children:e.jsx($e,{size:18})})]}),e.jsxs(bi,{$padding:"16px 18px 18px",children:[e.jsxs(qn,{children:[e.jsx("input",{type:"file",ref:W,style:{display:"none"},accept:"image/*",onChange:$}),e.jsx(Yn,{onClick:()=>{W.current&&W.current.click()},children:u.isPending?e.jsx(pt,{size:24,style:{animation:"spin 1s linear infinite"}}):Y?e.jsx("img",{src:Y,alt:"Group"}):e.jsxs(e.Fragment,{children:[e.jsx(or,{size:24}),e.jsx("span",{children:"UPLOAD"})]})})]}),e.jsxs(Xt,{children:[e.jsx(tt,{children:"Guruh nomi"}),e.jsx(rt,{placeholder:"Yangi guruh",value:w,onChange:S=>_(S.target.value.slice(0,Re.groupNameChars)),maxLength:Re.groupNameChars,autoFocus:!0})]}),e.jsxs(Xt,{children:[e.jsx(tt,{children:"Guruh haqida (ixtiyoriy)"}),e.jsx(rt,{placeholder:"Guruh maqsadini yozing...",value:D,onChange:S=>T(S.target.value.slice(0,Re.groupDescriptionChars)),maxLength:Re.groupDescriptionChars})]}),e.jsxs(Nn,{children:[e.jsxs(tt,{children:["Ishtirokchilar (",B.length,"/40)"]}),e.jsxs(Un,{children:[e.jsx(rt,{placeholder:"User qidirish...",value:j,onChange:S=>F(S.target.value),style:{paddingLeft:30}}),e.jsx(xt,{size:14,style:{position:"absolute",left:10,top:12,color:"#aaa"}})]}),j.trim()!==""&&e.jsx(Kn,{children:V.length===0?e.jsx("div",{style:{padding:12,color:"#b9bbbe",fontSize:13,textAlign:"center"},children:"Hech kim topilmadi"}):V.map(S=>e.jsxs(Vn,{selected:B.includes(S.id),style:{opacity:S.disableGroupInvites?.55:1,pointerEvents:S.disableGroupInvites?"none":"auto"},onClick:()=>R(S.id),children:[e.jsxs(Wn,{children:[e.jsx(Xn,{children:S.avatar||S.name.charAt(0)}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[e.jsx(Qn,{children:S.name}),S.isOfficialProfile?e.jsx(Jn,{children:S.officialBadgeLabel||"Rasmiy"}):null]})]}),B.includes(S.id)&&e.jsx(nr,{size:16,color:"var(--primary-color)"})]},S.id))})]})]}),e.jsxs(vi,{$padding:"14px 18px",$background:"var(--tertiary-color)",children:[e.jsx(Gt,{$variant:"ghost",onClick:i,children:"Bekor qilish"}),e.jsx(Gt,{$variant:"primary",onClick:L,disabled:!w.trim(),children:"Guruh yaratish"})]})]})})},es=oi`
  0% {
    background-color: var(--border-color, #e0e0e0);
  }
  50% {
    background-color: var(--tertiary-color, #f5f5f5);
  }
  100% {
    background-color: var(--border-color, #e0e0e0);
  }
`,je=r.div`
  width: ${t=>t.width||"100%"};
  height: ${t=>t.height||"20px"};
  border-radius: ${t=>t.borderRadius||"4px"};
  margin-bottom: ${t=>t.mb||"8px"};
  animation: ${es} 1.5s ease-in-out infinite;
  display: ${t=>t.display||"block"};
`,it=r(je)`
  width: ${t=>t.size||"40px"};
  height: ${t=>t.size||"40px"};
  border-radius: 50%;
  margin-bottom: ${t=>t.mb||"0"};
`,Qt=r.div`
  display: flex;
  align-items: center;
  gap: ${t=>t.gap||"12px"};
  margin-bottom: ${t=>t.mb||"16px"};
  width: 100%;
`,ts=r.div`
  position: relative;
  width: 100%;
  min-width: 0;
`,rs=r(xt)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted-color);
  pointer-events: none;
`,is=r.input`
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
`,os=({className:t,containerStyle:i,...a})=>e.jsxs(ts,{className:t,style:i,children:[e.jsx(rs,{size:16}),e.jsx(is,{...a})]}),ns=r.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  border-right: 1px solid var(--border-color);
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`,ss=r.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`,as=r(os).attrs(t=>({containerStyle:{flex:1,marginRight:t.$hasAction?"12px":"0"}}))`
  flex: 1;
  min-width: 0;
`,ls=r.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,ds=r.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,ot=r.button`
  flex: 1;
  padding: 11px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${t=>t.$active?"var(--primary-color)":"transparent"};
  color: ${t=>t.$active?"var(--text-color)":"var(--text-muted-color)"};
  font-size: 14px;
  font-weight: ${t=>t.$active?"700":"500"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`,nt=r.button`
  padding: 4px 12px;
  background-color: ${t=>t.$active?"var(--primary-color)":"var(--input-color)"};
  color: ${t=>t.$active?"white":"var(--text-secondary-color)"};
  border: none;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${t=>t.$active?"var(--primary-color)":"var(--hover-color)"};
  }
`,cs=r.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`,ut=r.div`
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

  ${t=>t.$active&&`
      background-color: var(--active-color);
      color: var(--text-color);
      font-weight: 600;
    `}
`,st=r(ut)`
  cursor: pointer;
`,at=r(Rr)`
  text-decoration: none;
  color: inherit;
  display: block;
`,Le=r.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`,Pe=r.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${t=>t.$isGroup?"var(--tertiary-color)":t.$isSavedMessages?"var(--primary-color)":"var(--tertiary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
  overflow: hidden;
`,Fe=r.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`,us=r.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${t=>t.$online?"var(--success-color)":"var(--text-muted-color)"};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`,ps=r.span`
  font-size: 12px;
  color: var(--success-color);
`,Ce=r.div`
  flex: 1;
  min-width: 0;
`,Ge=r.div`
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
`,Oe=r.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    font-size: 10px;
    color: var(--text-color);
  }
`,Jt=r.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`,Zt=r.div`
  font-size: 12px;
  color: var(--text-muted-color);
  margin-bottom: 2px;
`,xs=r.div`
  background-color: var(--primary-color);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`,ms=r.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
`,fs=r.div`
  flex: 1;
  min-width: 0;
`,gs=r.div`
  width: 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`,er=r.div`
  padding: 32px;
  text-align: center;
  color: var(--text-muted-color);
`,hs=r.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  opacity: 0.4;
`,bs=r.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;

  &:hover {
    color: var(--danger-color);
  }
`;r.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;const vs=r.div`
  text-align: center;
  padding: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`,tr=r.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,rr=r.div`
  flex: 1;
`,ys=r(Lr)`
  display: flex;
  flex-direction: column;
  overflow: visible;
`,js=({onOpenCreateGroup:t,onOpenCreateMeet:i,selectedChatId:a})=>{const{t:n}=Fr(),{chats:w,loading:_,chatsPage:D,chatsHasMore:T,fetchChats:Y,searchUsers:G,searchGroups:B,createChat:q,selectedNav:j,previewChat:F}=bt(),{isUserOnline:W,getOnlineCount:u,fetchBulkStatuses:L}=ir(),R=we(o=>o.user),V=Hr(),[$,S]=x.useState(""),[H,A]=x.useState("all"),[y,m]=x.useState([]),[ne,se]=x.useState(!1),[X,te]=x.useState(()=>j==="groups"?"group":j==="meets"?"video":"private"),[E,ce]=x.useState([]),[fe,b]=x.useState(!1),xe=x.useRef(!1),Q=j==="groups"?"group":j==="users"?"private":j==="meets"?"video":X,J=j==="meets"||j==="chats"&&Q==="video";x.useEffect(()=>{j==="groups"?te("group"):j==="users"?te("private"):j==="meets"&&te("video")},[j]),x.useEffect(()=>{if(!w.length||J)return;const o=new Set;w.forEach(f=>{var c;(c=f.members)==null||c.forEach(h=>{const I=h._id||h.id;I&&o.add(I)})}),o.size>0&&L(Array.from(o))},[w,L,J]),x.useEffect(()=>{if(J||!(j==="users"||j==="groups"||j==="chats")||!["private","group"].includes(Q)){m([]);return}if(!$.trim()){m([]);return}const f=setTimeout(async()=>{se(!0);try{if(Q==="group"){const c=await B($);m(c.map(h=>({resultType:"group",id:h.id,urlSlug:h.urlSlug,name:h.name,avatar:h.avatar,membersCount:h.membersCount,lastMessage:h.lastMessage})))}else{const c=await G($);m(c.map(h=>({resultType:"user",id:h.id||h._id,name:h.name,username:h.username,avatar:h.avatar,premiumStatus:h.premiumStatus,selectedProfileDecorationId:h.selectedProfileDecorationId,customProfileDecorationImage:h.customProfileDecorationImage})))}}finally{se(!1)}},500);return()=>clearTimeout(f)},[Q,J,B,$,G,j]),x.useEffect(()=>{!J||xe.current||(xe.current=!0,b(!0),dt().then(o=>ce(Array.isArray(o)?o:[])).finally(()=>b(!1)))},[J]);const le=async o=>{const f=(R==null?void 0:R._id)||(R==null?void 0:R.id),c=o.id||o._id,h=w.find(I=>I.isGroup||!I.members?!1:c===f?I.isSavedMessages:!I.isSavedMessages&&I.members.some(P=>(P._id||P.id)===c));if(h){S(""),V(`/${h.type==="group"?"groups":"users"}/${h.urlSlug}`);return}try{const I=await q({isGroup:!1,memberIds:[o._id||o.id]}),P=(I==null?void 0:I.urlSlug)||(I==null?void 0:I.jammId)||(I==null?void 0:I._id)||(I==null?void 0:I.id);P&&(V(`/users/${P}`),S(""))}catch(I){console.error("Failed to start private chat",I)}},ge=x.useMemo(()=>{let o=w;if(j==="chats"||j==="users"||j==="groups"?Q==="private"?o=o.filter(f=>!f.isGroup&&(f.isSavedMessages||f.hasMessages||String(f.id)===String(a))):Q==="group"&&(o=o.filter(f=>f.isGroup)):j==="home"&&(o=o.filter(f=>f.isGroup||!f.isGroup&&(f.isSavedMessages||f.hasMessages||String(f.id)===String(a)))),$&&!(j==="users"||j==="groups"||j==="chats")&&(o=o.filter(f=>f.name.toLowerCase().includes($.toLowerCase()))),H==="today"?o=o.filter(f=>f.time.includes(":")||f.time==="Kecha"):H==="week"&&(o=o.filter(f=>f.time.includes("Dushanba")||f.time.includes("Kecha"))),!J&&(j==="users"||j==="chats"&&Q==="private")&&F&&F.type==="user"&&!o.some(f=>{var c;return(c=f.members)==null?void 0:c.some(h=>(h._id||h.id)===F.targetUserId)})){const f={id:`virtual-${F.targetUserId}`,urlSlug:F.targetUserId,isGroup:!1,type:"user",name:F.name,avatar:F.avatar,hasMessages:!1,members:[{_id:F.targetUserId}],lastMessage:n("chatsSidebar.search.startMessage")};String(a)===String(F.targetUserId)&&(o=[f,...o])}return o},[H,w,Q,J,F,$,a,j]),v=x.useMemo(()=>{const o=$.trim().toLowerCase();return o?E.filter(f=>String(f.title||n("chatsSidebar.meets.untitled")).toLowerCase().includes(o)):E},[E,$,n]),s=async(o,f)=>{o.preventDefault(),o.stopPropagation(),await Ei(f);const c=await dt();ce(Array.isArray(c)?c:[])},l=(o=6)=>[...Array(o)].map((f,c)=>e.jsxs(ms,{children:[e.jsx(it,{size:"40px"}),e.jsxs(fs,{children:[e.jsx(je,{height:"15px",width:c%2===0?"56%":"48%",mb:"4px"}),e.jsx(je,{height:"13px",width:c%3===0?"72%":"64%",mb:"0"})]}),e.jsxs(gs,{children:[e.jsx(je,{height:"10px",width:"34px",mb:"0"}),e.jsx(je,{height:"18px",width:"22px",borderRadius:"999px",mb:"0"})]})]},c)),g=j==="groups"||J||j==="chats"&&Q==="group",N=o=>{var f;return o.isSavedMessages?e.jsx(mt,{size:18,color:"white",fill:"white"}):((f=o.avatar)==null?void 0:f.length)>1?e.jsx(Fe,{src:o.avatar,alt:o.name}):o.isGroup?o.name.charAt(0):o.name.split(" ").map(c=>c[0]).join("")},C=o=>{if(!o)return n("chatsSidebar.timeAgo.now");const f=typeof o=="number"?o:new Date(o).getTime();if(!Number.isFinite(f))return n("chatsSidebar.timeAgo.now");const c=(Date.now()-f)/1e3;return!Number.isFinite(c)||c<0||c<60?n("chatsSidebar.timeAgo.now"):c<3600?n("chatsSidebar.timeAgo.minutes",{count:Math.floor(c/60)}):c<86400?n("chatsSidebar.timeAgo.hours",{count:Math.floor(c/3600)}):n("chatsSidebar.timeAgo.days",{count:Math.floor(c/86400)})};return e.jsxs(ns,{children:[e.jsxs(ss,{children:[e.jsx(as,{"data-tour":"chats-search",$hasAction:g,type:"text",placeholder:n("chatsSidebar.searchPlaceholder"),value:$,onChange:o=>S(o.target.value)}),(j==="groups"||j==="chats"&&Q==="group")&&e.jsx(Me,{onClick:t,title:n("chatsSidebar.createGroup"),children:e.jsx(Te,{size:18})}),J&&e.jsx(Me,{onClick:i,title:n("chatsSidebar.createMeet"),children:e.jsx(Te,{size:18})})]}),(j==="chats"||j==="users"||j==="groups"||j==="meets")&&e.jsxs(ds,{"data-tour":"chats-tabs",children:[e.jsx(ot,{"data-tour":"chats-tab-private",$active:Q==="private",onClick:()=>{te("private"),V("/users")},children:n("chatsSidebar.tabs.private")}),e.jsx(ot,{"data-tour":"chats-tab-groups",$active:Q==="group",onClick:()=>{te("group"),V("/groups")},children:n("chatsSidebar.tabs.groups")}),e.jsx(ot,{"data-tour":"chats-tab-video",$active:Q==="video",onClick:()=>{te("video"),V("/meets")},children:n("chatsSidebar.tabs.video")})]}),j==="home"&&e.jsxs(ls,{children:[e.jsx(nt,{$active:H==="all",onClick:()=>A("all"),children:n("chatsSidebar.filters.all")}),e.jsx(nt,{$active:H==="today",onClick:()=>A("today"),children:n("chatsSidebar.filters.today")}),e.jsx(nt,{$active:H==="week",onClick:()=>A("week"),children:n("chatsSidebar.filters.week")})]}),e.jsx(cs,{id:"sidebarScrollArea","data-tour":"chats-list",children:J?fe?e.jsx(e.Fragment,{children:l(1)}):v.length===0?e.jsxs(er,{children:[e.jsx(hs,{children:e.jsx(Ct,{size:32})}),e.jsx("div",{children:$.trim()?n("chatsSidebar.meets.notFound"):n("chatsSidebar.meets.empty")})]}):v.map(o=>e.jsx(at,{to:`/join/${o.roomId}`,children:e.jsxs(ut,{children:[e.jsx(Le,{children:e.jsx(Pe,{$isGroup:!0,children:e.jsx(Ct,{size:18})})}),e.jsxs(Ce,{children:[e.jsx(Ge,{children:o.title||n("chatsSidebar.meets.untitled")}),e.jsxs(Oe,{children:[o.isPrivate?e.jsx(ni,{size:12}):e.jsx(si,{size:12}),e.jsx("span",{children:o.isCreator?n("chatsSidebar.meets.admin"):n("chatsSidebar.meets.participant")})]})]}),e.jsxs(Jt,{children:[e.jsx(Zt,{children:C(o.createdAt)}),e.jsx(bs,{onClick:f=>s(f,o.roomId),title:n("chatsSidebar.delete"),children:e.jsx(gt,{size:12})})]})]})},o.roomId)):e.jsxs(e.Fragment,{children:[$&&["private","group"].includes(Q)&&(j==="users"||j==="groups"||j==="chats")?ne?e.jsx(tr,{children:[...Array(3)].map((o,f)=>e.jsxs(Qt,{children:[e.jsx(it,{size:"40px"}),e.jsxs(rr,{children:[e.jsx(je,{height:"14px",width:"60%",mb:"6px"}),e.jsx(je,{height:"12px",width:"40%",mb:"0"})]})]},f))}):y.length?y.map(o=>{var f,c,h,I,P,Z;return o.resultType==="group"?e.jsx(at,{to:`/groups/${o.urlSlug}`,onClick:()=>S(""),children:e.jsxs(st,{children:[e.jsx(Le,{children:e.jsx(Pe,{$isGroup:!0,children:((f=o.avatar)==null?void 0:f.length)>1?e.jsx(Fe,{src:o.avatar,alt:o.name}):(c=o.name)==null?void 0:c.charAt(0)})}),e.jsxs(Ce,{children:[e.jsx(Ge,{children:o.name}),e.jsx(Oe,{children:o.lastMessage||n("chatsSidebar.search.groupMeta",{count:o.membersCount||0})})]})]})},o.id):e.jsxs(st,{onClick:()=>le(o),children:[e.jsx(Le,{children:e.jsx(Pe,{children:((h=o.avatar)==null?void 0:h.length)>1?e.jsx(Fe,{src:o.avatar,alt:o.name}):(Z=(P=(I=o.name)==null?void 0:I.split(" "))==null?void 0:P.map(ae=>ae[0]))==null?void 0:Z.join("")})}),e.jsxs(Ce,{children:[e.jsx(Ge,{children:e.jsx(He,{user:o,fallback:n("common.userFallback"),size:"sm"})}),e.jsxs(Oe,{children:["@",o.username]})]})]},o.id)}):e.jsx(er,{children:n("chatsSidebar.search.notFound")}):_&&!$?e.jsx(e.Fragment,{children:l(1)}):e.jsx(ys,{dataLength:ge.length,next:()=>Y(D+1),hasMore:T&&H==="all"&&$==="",loader:e.jsx(e.Fragment,{children:l(2)}),endMessage:ge.length>0&&H==="all"&&$===""?e.jsx(vs,{children:n("chatsSidebar.allShown")}):null,scrollableTarget:"sidebarScrollArea",children:ge.map(o=>{const f=(R==null?void 0:R._id)||(R==null?void 0:R.id),c=!o.isGroup&&o.members?o.members.find(ae=>(ae._id||ae.id)!==f):null,h=c==null?void 0:c._id,I=h?W(h):!1,P=!!o.isOfficialProfile,Z=o.isGroup?u(o.members):0;return e.jsx(at,{to:`/${o.isGroup?"groups":"users"}/${o.urlSlug}`,children:e.jsxs(ut,{$active:a===o.urlSlug,children:[e.jsxs(Le,{children:[e.jsx(Pe,{$isGroup:o.isGroup,$isSavedMessages:o.isSavedMessages,children:N(o)}),!o.isGroup&&!o.isSavedMessages&&!P&&e.jsx(us,{$online:I})]}),e.jsxs(Ce,{children:[e.jsx(Ge,{children:e.jsx(He,{user:c||o,fallback:n("common.userFallback"),size:"sm"})}),e.jsx(Oe,{children:o.isGroup&&Z>0?e.jsxs(e.Fragment,{children:[o.lastMessage," · ",e.jsx(ps,{children:n("chatsSidebar.online",{count:Z})})]}):o.lastMessage})]}),e.jsxs(Jt,{children:[e.jsx(Zt,{children:o.time}),o.unread>0&&e.jsx(xs,{children:o.unread})]})]})},o.id)})}),$&&!["private","group"].includes(Q)&&e.jsx(e.Fragment,{children:ne?e.jsx(tr,{children:[...Array(3)].map((o,f)=>e.jsxs(Qt,{children:[e.jsx(it,{size:"40px"}),e.jsxs(rr,{children:[e.jsx(je,{height:"14px",width:"60%",mb:"6px"}),e.jsx(je,{height:"12px",width:"40%",mb:"0"})]})]},f))}):y.filter(o=>{const f=o.id||o._id,c=(R==null?void 0:R._id)||(R==null?void 0:R.id);return f===c?!1:!ge.some(I=>{var P;return!I.isGroup&&!I.isSavedMessages&&((P=I.members)==null?void 0:P.some(Z=>(Z._id||Z.id)===f))})}).map(o=>{var f;return e.jsxs(st,{onClick:()=>le(o),children:[e.jsx(Pe,{children:((f=o.avatar)==null?void 0:f.length)>1?e.jsx(Fe,{src:o.avatar,alt:o.name}):(o.name||"?").charAt(0)}),e.jsxs(Ce,{children:[e.jsx(Ge,{children:e.jsx(He,{user:o,fallback:n("common.userFallback"),size:"sm"})}),e.jsxs(Oe,{children:["@",o.username]})]})]},o.id)})})]})})]})},Gs=Object.freeze(Object.defineProperty({__proto__:null,ChatArea:Hn,ChatsSidebar:js,CreateGroupDialog:Zn,EditGroupDialog:mr},Symbol.toStringTag,{value:"Module"}));export{_s as C,os as S,je as a,it as b,Qt as c,Cs as d,Tt as f,dt as g,Gs as i,Ps as s,bt as u};
