import{r as a,n as wa,j as e,z as J,e as Mr,R as Ze,a as za,I as Wn}from"./react-vendor-UYnqoc53.js";import{d as t,k as Gn,X as Ie,l as wr,m as je,c as ur,n as wo,o as qe,p as Qn,q as er,P as Oe,r as Sa,F as $a,s as Ca,D as Yn,t as Jn,u as Ta,v as Ba,w as hr,M as mo,x as po,y as fo,z as bo,I as zo,L as Xn,E as xo,J as Ia,C as uo,b as ho,K as Vn,N as Tt,O as Un,Q as Bt,V as $t,W as Kn,Y as go,_ as La,U as Ct,G as Ma,$ as Ra,a0 as Aa,a1 as _a,a2 as Da,a3 as qa,a4 as Pa}from"./ui-vendor-DFyM_Xd9.js";import{l as Oa}from"./media-realtime-B2IcwcIy.js";import{a as ne,u as Je,b as Ea,A as So,R as gr}from"./feature-admin-D0NNr8sf.js";import{M as Zn,a as ea,b as ra,c as ta,d as oa,e as na,f as Fa,D as $o,g as Ha,P as Na,A as Te,h as vo,i as Wa,j as Ga}from"./feature-app-ICtyfBrQ.js";import{a as Qa}from"./app-vendor-DTdcG8Is.js";import{d as aa}from"./vendor-CRWlb9wI.js";const Ya=async()=>{const{data:r}=await ne.get("/arena/tests");return r},Ja=async r=>{const{data:n}=await ne.get(`/arena/tests/${r}`);return n},sa=async r=>{const{data:n}=await ne.post("/arena/tests",r);return n},Xa=async(r,n)=>{const{data:s}=await ne.patch(`/arena/tests/${r}`,n);return s},Va=async(r=1,n=15)=>{const{data:s}=await ne.get(`/arena/tests/my?page=${r}&limit=${n}`);return s},Ua=async r=>{const{data:n}=await ne.delete(`/arena/tests/${r}`);return n},Ka=async(r,n={})=>{const{data:s}=await ne.get(`/arena/tests/${r}/results`,{params:n});return s},Za=async r=>{const{data:n}=await ne.get(`/arena/tests/shared/${r}`);return n},es=async r=>{const{data:n}=await ne.get(`/arena/tests/${r}/share-links`);return n},rs=async(r,n)=>{const{data:s}=await ne.post(`/arena/tests/${r}/share-links`,n);return s},ts=async(r,n)=>{const{data:s}=await ne.delete(`/arena/tests/${r}/share-links/${n}`);return s},os=async(r,n)=>{const{data:s}=await ne.post(`/arena/tests/${r}/submit`,{answers:(n==null?void 0:n.answers)||[],shareShortCode:(n==null?void 0:n.shareShortCode)||null});return s},ns=async(r=1,n=20)=>{const{data:s}=await ne.get(`/arena/flashcards?page=${r}&limit=${n}`);return s},as=async r=>{const{data:n}=await ne.post("/arena/flashcards",r);return n},ss=async(r,n)=>{const{data:s}=await ne.patch(`/arena/flashcards/${r}`,n);return s},is=async r=>{const{data:n}=await ne.get(`/arena/flashcards/${r}`);return n},ls=async({deckId:r,cardId:n,quality:s})=>{const{data:c}=await ne.patch(`/arena/flashcards/${r}/cards/${n}/review`,{quality:s});return c},cs=async r=>{const{data:n}=await ne.post(`/arena/flashcards/${r}/join`);return n},ds=async r=>{const{data:n}=await ne.delete(`/arena/flashcards/${r}/leave`);return n},ps=async r=>{const{data:n}=await ne.delete(`/arena/flashcards/${r}`);return n},xs=async(r=1,n=20)=>{const{data:s}=await ne.get(`/arena/sentence-builders?page=${r}&limit=${n}`);return s},us=async r=>{const{data:n}=await ne.post("/arena/sentence-builders",r);return n},hs=async(r,n)=>{const{data:s}=await ne.patch(`/arena/sentence-builders/${r}`,n);return s},gs=async r=>{const{data:n}=await ne.get(`/arena/sentence-builders/${r}`);return n},ms=async r=>{const{data:n}=await ne.get(`/arena/sentence-builders/shared/${r}`);return n},fs=async(r,n,s)=>{const{data:c}=await ne.post(`/arena/sentence-builders/${r}/check`,{questionIndex:n,selectedTokens:s});return c},bs=async r=>{const{data:n}=await ne.delete(`/arena/sentence-builders/${r}`);return n},vs=async(r,n={})=>{const{data:s}=await ne.get(`/arena/sentence-builders/${r}/results`,{params:n});return s},ys=async r=>{const{data:n}=await ne.get(`/arena/sentence-builders/${r}/share-links`);return n},js=async(r,n)=>{const{data:s}=await ne.post(`/arena/sentence-builders/${r}/share-links`,n);return s},ks=async(r,n)=>{const{data:s}=await ne.delete(`/arena/sentence-builders/${r}/share-links/${n}`);return s},ws=async(r,n)=>{const{data:s}=await ne.post(`/arena/sentence-builders/${r}/submit`,n);return s},zs=async(r={})=>{const{data:n}=await ne.get("/arena/battles/history",{params:r});return n},Ss=async(r=1,n=15)=>{const{data:s}=await ne.get(`/arena/battles/active?page=${r}&limit=${n}`);return s},$s=async(r="digits")=>{const{data:n}=await ne.get("/arena/mnemonics/leaderboard",{params:{mode:r}});return n},Cs=async r=>{const{data:n}=await ne.post("/arena/mnemonics/result",r);return n},ia=a.createContext(null),wx=({children:r})=>{const[n,s]=a.useState([]),[c,g]=a.useState([]),[S,i]=a.useState([]),[C,E]=a.useState(1),[T,R]=a.useState(!0),[$,B]=a.useState([]),[D,m]=a.useState(1),[M,h]=a.useState(!0),[F,H]=a.useState(null),[Z,x]=a.useState([]),[k,v]=a.useState([]),[f,z]=a.useState(1),[G,Y]=a.useState(!0),[ae,ge]=a.useState(1),[d,w]=a.useState(!0),[j,p]=a.useState(!1),[I,ie]=a.useState(localStorage.getItem("jamm_guest_name")||null),_=a.useRef(null),te=Je(u=>u.user),xe=a.useCallback(async()=>{try{const u=await Ya();s(u)}catch(u){console.error("Error fetching arena tests:",u)}},[]),N=async u=>{try{const b=await sa(u);return le(),b}catch(b){console.error("Error creating test:",b)}},V=async(u,b)=>{try{const P=await Xa(u,b);return g(Q=>Q.map(he=>he._id===u?{...he,...P}:he)),s(Q=>Q.map(he=>he._id===u?{...he,...P}:he)),P}catch(P){throw console.error("Error updating test:",P),P}},de=async u=>{const b=c,P=n;g(Q=>Q.filter(he=>he._id!==u)),s(Q=>Q.filter(he=>he._id!==u));try{return{success:!0,...await Ua(u)}}catch(Q){throw g(b),s(P),console.error("Error deleting test:",Q),Q}},le=a.useCallback(async(u=1)=>{try{const b=await Va(u,15),P=b.data||[],Q=b.totalPages||1;g(he=>u===1?P:[...he,...P]),ge(u),w(u<Q)}catch(b){console.error("Error fetching my tests:",b)}},[]),pe=a.useCallback(async(u=1)=>{try{const b=await ns(u,20),P=b.data||[],Q=b.totalPages||1;i(he=>u===1?P:[...he,...P]),E(u),R(u<Q)}catch(b){console.error("Error fetching flashcards:",b)}},[]),me=async u=>{try{const b=await as(u);return pe(1),b}catch(b){console.error("Error creating flashcard deck:",b)}},ke=async(u,b)=>{try{const P=await ss(u,b);return pe(1),P}catch(P){throw console.error("Error updating flashcard deck:",P),P}},ze=async u=>{const b=S;i(P=>P.filter(Q=>Q._id!==u));try{return{success:!0,...await ps(u)}}catch(P){throw i(b),console.error("Error deleting flashcard deck:",P),P}},Se=async(u,b,P)=>{try{await ls({deckId:u,cardId:b,quality:P}),pe(1)}catch(Q){console.error("Error reviewing flashcard:",Q)}},ye=a.useCallback(async(u=1)=>{try{const b=await xs(u,20),P=b.data||[],Q=b.totalPages||1;B(he=>u===1?P:[...he,...P]),m(u),h(u<Q)}catch(b){console.error("Error fetching sentence builders:",b)}},[]),we=async u=>{try{const b=await us(u);return ye(1),b}catch(b){throw console.error("Error creating sentence builder deck:",b),b}},W=async(u,b)=>{try{const P=await hs(u,b);return ye(1),P}catch(P){throw console.error("Error updating sentence builder deck:",P),P}},q=async u=>{const b=$;B(P=>P.filter(Q=>Q._id!==u));try{return{success:!0,...await bs(u)}}catch(P){throw B(b),console.error("Error deleting sentence builder deck:",P),P}},O=a.useCallback(async u=>await ms(u),[]),se=a.useCallback(async(u,b={})=>await vs(u,b),[]),ve=a.useCallback(async u=>await ys(u),[]),fe=a.useCallback(async(u,b)=>await js(u,b),[]),$e=a.useCallback(async(u,b)=>await ks(u,b),[]),X=a.useCallback(async(u,b)=>await ws(u,b),[]),ce=a.useCallback(async(u={})=>{try{const b=await zs(u);return x(b.data||b),b}catch(b){return console.error("Error fetching battle history:",b),{data:[],total:0}}},[]),U=a.useCallback(async(u=1)=>{try{const b=await Ss(u,15),P=b.data||[],Q=b.totalPages||1;v(he=>u===1?P:[...he,...P]),z(u),Y(u<Q)}catch(b){console.error("Error fetching active battles:",b)}},[]);a.useEffect(()=>{},[]),a.useEffect(()=>{if(!(te!=null&&te._id)&&!(te!=null&&te.id)&&!I){_.current&&_.current.disconnect();return}const u=Ea("/arena");return _.current=Oa(u,{auth:I?{guestName:I}:void 0,withCredentials:!0,transports:["websocket"],forceNew:!0}),_.current.on("connect",()=>{console.log("Arena Socket connected:",_.current.id)}),_.current.on("connect_error",b=>{console.error("Arena Socket connection error:",b)}),_.current.on("battle_created",b=>{console.log("Battle created:",b)}),_.current.on("battle_update",b=>{console.log("Battle updated:",b),H(b)}),_.current.on("battle_started",b=>{H(b)}),_.current.on("next_question_started",b=>{H(b)}),_.current.on("battle_finished",b=>{H(b)}),_.current.on("error",b=>{wa.error("Xatolik: "+b)}),()=>{_.current&&_.current.disconnect()}},[te,I]);const re=u=>{localStorage.setItem("jamm_guest_name",u),ie(u)},be=(u,b="Yangi Bellashuv",P="solo",Q="public")=>{_.current&&_.current.emit("create_battle",{testId:u,roomName:b,mode:P,visibility:Q})},Re=u=>{console.log("Emitting join_battle:",u),_.current?_.current.emit("join_battle",{roomId:u}):console.warn("Socket not connected, cannot join battle")},Ae=u=>{_.current&&_.current.emit("start_battle",{roomId:u})},L=(u,b)=>{_.current&&_.current.emit("submit_answer",{roomId:u,answerIndex:b})},A=u=>{_.current&&_.current.emit("next_question",{roomId:u})},oe=u=>{_.current&&_.current.emit("end_battle",{roomId:u})},ue=u=>{const b=u||(F==null?void 0:F.roomId);b&&_.current&&_.current.emit("leave_battle",{roomId:b}),H(null)};return e.jsx(ia.Provider,{value:{tests:n,myTests:c,myTestsPage:ae,myTestsHasMore:d,flashcardDecks:S,flashcardsPage:C,flashcardsHasMore:T,sentenceBuilderDecks:$,sentenceBuildersPage:D,sentenceBuildersHasMore:M,activeBattle:F,fetchTests:xe,fetchMyTests:le,createTest:N,deleteTest:de,updateTest:V,fetchFlashcards:pe,createFlashcardDeck:me,updateFlashcardDeck:ke,deleteFlashcardDeck:ze,reviewFlashcard:Se,fetchSentenceBuilders:ye,createSentenceBuilderDeck:we,updateSentenceBuilderDeck:W,deleteSentenceBuilderDeck:q,fetchSharedSentenceBuilderDeck:O,fetchSentenceBuilderResults:se,fetchSentenceBuilderShareLinks:ve,createSentenceBuilderShareLink:fe,deleteSentenceBuilderShareLink:$e,submitSentenceBuilderAttempt:X,createBattle:be,joinBattle:Re,startBattle:Ae,submitAnswer:L,nextQuestion:A,endBattle:oe,leaveBattle:ue,battleHistory:Z,fetchBattleHistory:ce,activeBattles:k,activeBattlesPage:f,activeBattlesHasMore:G,fetchActiveBattles:U,fetchTestResults:async(u,b={})=>{try{return await Ka(u,b)}catch(P){return console.error(P),{data:[],total:0}}},fetchFlashcardDeck:async u=>{try{return await is(u)}catch(b){return console.error(b),null}},joinFlashcardDeck:async u=>{try{return await cs(u),{success:!0}}catch(b){return console.error(b),{success:!1}}},leaveFlashcardDeck:async u=>{try{return await ds(u),{success:!0}}catch(b){return console.error(b),{success:!1}}},fetchSentenceBuilderDeck:async u=>{try{return await gs(u)}catch(b){return console.error(b),null}},checkSentenceBuilderAnswer:async(u,b,P)=>{try{return await fs(u,b,P)}catch(Q){throw console.error(Q),Q}},guestName:I,setGuestSession:re,socketRef:_},children:r})},Me=()=>{const r=a.useContext(ia);if(!r)throw new Error("useArena must be used within ArenaProvider");return r},Be=t.button`
  margin-left: auto;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 15px;
  border: none;
  background: ${r=>r.absolute?"none":" var(--input-color)"};
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: ${r=>r.absolute?"absolute":"relative"};
  top: ${r=>r.absolute?"5px":"auto"};
  right: ${r=>r.absolute?"5px":"auto"};

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`,Ts=t.div`
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.55;
`,Bs=t.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${r=>r.$danger?"var(--danger-color)":"var(--primary-color)"};
    flex-shrink: 0;
  }
`,yo=({isOpen:r,onClose:n,title:s,description:c,confirmText:g="Tasdiqlash",cancelText:S="Bekor qilish",onConfirm:i,isDanger:C=!1})=>r?e.jsx(Zn,{onClick:n,$overlay:"rgba(0, 0, 0, 0.8)",$zIndex:10050,children:e.jsxs(ea,{$width:"min(100%, 450px)",$maxWidth:"95vw",$maxHeight:"90vh",$radius:"14px",onClick:E=>E.stopPropagation(),children:[e.jsxs(ra,{$padding:"16px 18px",children:[e.jsxs(Bs,{$danger:C,children:[C&&e.jsx(Gn,{size:20}),e.jsx(ta,{$size:"18px",children:s})]}),e.jsx(oa,{onClick:n,children:e.jsx(Ie,{size:18})})]}),e.jsx(na,{$padding:"16px 18px 8px",children:e.jsx(Ts,{children:c})}),e.jsxs(Fa,{$padding:"14px 18px",children:[e.jsx($o,{$variant:"ghost",onClick:n,children:S}),e.jsx($o,{$variant:C?"danger":"primary",onClick:()=>{i()},children:g})]})]})}):null,Is=je`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
`,Ls=je`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`,Ms=je`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-8deg); }
  75% { transform: rotate(8deg); }
`,Rs=je`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`,As=je`
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.18); opacity: 1; }
`,Co={pulse:wr`
    animation: ${Is} 1.6s ease-in-out infinite;
  `,float:wr`
    animation: ${Ls} 1.8s ease-in-out infinite;
  `,wiggle:wr`
    animation: ${Ms} 1.7s ease-in-out infinite;
  `,spin:wr`
    animation: ${Rs} 3.8s linear infinite;
  `,sparkle:wr`
    animation: ${As} 1.45s ease-in-out infinite;
  `},_s=t.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  max-width: 100%;
  flex-wrap: wrap;
`,Ds=t.span`
  min-width: 0;
  display: inline-block;
`,qs=t.span`
  width: ${r=>r.$size}px;
  height: ${r=>r.$size}px;
  min-width: ${r=>r.$size}px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${r=>Math.max(12,r.$size-6)}px;
  line-height: 1;
  transform-origin: center;
  ${r=>Co[r.$animation]||Co.sparkle}
`,Ps=t.img`
  width: ${r=>r.$size}px;
  height: ${r=>r.$size}px;
  min-width: ${r=>r.$size}px;
  border-radius: 999px;
  /* border: 1px solid var(--border-color);
  background: var(--input-color); */
  object-fit: cover;
`,To={sm:{width:14,height:14},md:{width:16,height:16},lg:{width:18,height:18}},Bo={sm:18,md:20,lg:22};function Io({user:r,fallback:n="User",size:s="md",showPremiumBadge:c=!0,className:g}){const S=Ha(B=>B.decorations),i=(r==null?void 0:r.nickname)||(r==null?void 0:r.username)||n,C=a.useMemo(()=>!(r!=null&&r.selectedProfileDecorationId)||r.selectedProfileDecorationId==="custom-upload"||r.selectedProfileDecorationId==="premium-badge"||!S.length?null:S.find(B=>B.key===r.selectedProfileDecorationId||B._id===r.selectedProfileDecorationId)||null,[S,r==null?void 0:r.selectedProfileDecorationId]),E=To[s]||To.md,T=Bo[s]||Bo.md,R=(r==null?void 0:r.selectedProfileDecorationId)==="custom-upload"&&(r==null?void 0:r.customProfileDecorationImage),$=c&&(r==null?void 0:r.premiumStatus)==="active"&&(r==null?void 0:r.selectedProfileDecorationId)==="premium-badge";return e.jsxs(_s,{className:g,children:[e.jsx(Ds,{children:i}),R?e.jsx(Ps,{src:r.customProfileDecorationImage,alt:i,$size:T}):null,C?e.jsx(qs,{$size:T,$animation:C.animation,title:C.label,"aria-label":C.label,children:C.emoji}):null,$?e.jsx(Na,{width:E.width,height:E.height}):null]})}const Gr=t.div`
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
`,Os=t.div`
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
`,Es=t.button`
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
`,Fs=t.h2`
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
`,Lo=t.div`
  background: var(--bg-color);
  padding: 24px;
  border-radius: 30px;
  border: 1px solid var(--border-color);
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`,Mo=t.h3`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: var(--text-color);
  font-weight: 500;
`,Ro=t.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Ao=t.button`
  padding: 14px 20px;
  border-radius: 30px;
  border: 1px solid
    ${r=>{if(r.isRevealed&&r.showResults){if(r.isCorrect)return"#2ecc71";if(r.isSelected)return"#e74c3c"}return r.isSelected?"var(--primary-color)":"var(--border-color)"}};
  background-color: ${r=>{if(r.isRevealed&&r.showResults){if(r.isCorrect)return"rgba(46, 204, 113, 0.05)";if(r.isSelected)return"rgba(231, 76, 60, 0.05)"}return r.isSelected?"rgba(var(--primary-color-rgb), 0.05)":"var(--bg-color)"}};
  color: var(--text-color);
  font-size: 1.05rem;
  text-align: left;
  cursor: ${r=>r.disabled?"default":"pointer"};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    border-color: ${r=>r.disabled?"":"var(--primary-color)"};
    background-color: ${r=>r.disabled?"":"rgba(var(--primary-color-rgb), 0.02)"};
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 12px;
  }
`,_o=t.div`
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
    ${r=>{if(r.isRevealed&&r.showResults){if(r.isCorrect)return"#2ecc71";if(r.isSelected)return"#e74c3c"}return r.isSelected?"var(--primary-color)":"var(--border-color)"}};
  background-color: ${r=>{if(r.isRevealed&&r.showResults){if(r.isCorrect)return"#2ecc71";if(r.isSelected)return"#e74c3c"}return r.isSelected?"var(--primary-color)":"transparent"}};
  color: ${r=>r.isRevealed&&r.showResults&&(r.isCorrect||r.isSelected)||r.isSelected?"#fff":"var(--text-muted-color)"};
  transition: all 0.2s;
`,Do=t.span`
  flex: 1;
  line-height: 1.5;
`,qo=t.div`
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,Hs=t.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
`,Ns=t.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`,Ws=t.div`
  background-color: var(--bg-color);
  border: 1px solid
    ${r=>r.$correct?"rgba(34, 197, 94, 0.3)":"rgba(239, 68, 68, 0.28)"};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Gs=t.div`
  color: var(--text-color);
  font-weight: 700;
  line-height: 1.5;
`,Pt=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--text-muted-color);
  font-size: 0.95rem;
`,Qs=t.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  background-color: ${r=>r.$correct?"rgba(34, 197, 94, 0.12)":"rgba(239, 68, 68, 0.12)"};
  color: ${r=>r.$correct?"#22c55e":"#ef4444"};
`,Ys=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Js=t.div`
  border: 1px solid
    ${r=>r.$isCorrect?"rgba(34, 197, 94, 0.3)":r.$isSelected?"rgba(239, 68, 68, 0.28)":"var(--border-color)"};
  background-color: ${r=>r.$isCorrect?"rgba(34, 197, 94, 0.08)":r.$isSelected?"rgba(239, 68, 68, 0.08)":"var(--tertiary-color)"};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,Xs=t.div`
  color: var(--text-color);
  line-height: 1.45;
`,Vs=t.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,Ot=t.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  background-color: ${r=>r.$tone==="correct"?"rgba(34, 197, 94, 0.12)":r.$tone==="selected"?"rgba(239, 68, 68, 0.12)":r.$tone==="selected-correct"?"rgba(59, 130, 246, 0.12)":"var(--secondary-color)"};
  color: ${r=>r.$tone==="correct"?"#22c55e":r.$tone==="selected"?"#ef4444":r.$tone==="selected-correct"?"#60a5fa":"var(--text-muted-color)"};
`,Po=t.button`
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
`,Us=t.div`
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
`,Ks=t.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`,Zs=t.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${r=>r.bgColor||"var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`,ei=t.div`
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
`,ri=t.div`
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
`,ti=t.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 1.2rem;
`,oi=t.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 0.95rem;
  line-height: 1.5;
`,ni=t.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`,la=t.button`
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
`,ai=t(la)`
  background: var(--primary-color);
  color: white;
`,si=t(la)`
  background: rgba(240, 71, 71, 0.15);
  color: #f04747;
  border: 1px solid rgba(240, 71, 71, 0.3);
`,ca=({test:r,onClose:n,shareShortCode:s=null,onFinishedResult:c=null})=>{const g=Number(r.timeLimit)||0,S=r.showResults??!0,i=r.displayMode||"single",[C,E]=a.useState(0),[T,R]=a.useState(0),[$,B]=a.useState(null),[D,m]=a.useState(!1),[M,h]=a.useState(!1),[F,H]=a.useState(!1),[Z,x]=a.useState(""),[k,v]=a.useState(null),[f,z]=a.useState(!1),[G,Y]=a.useState(!1),[ae,ge]=a.useState([]),[d,w]=a.useState(g*60),[j,p]=a.useState([]),[I,ie]=a.useState({}),{user:_}=Je(),{guestName:te,setGuestSession:xe}=Me(),N=!!(_!=null&&_._id||_!=null&&_.id),V=r.questions||[],de=V[C],le=a.useCallback(()=>i==="list"?V.map((W,q)=>I[q]??-1):V.map((W,q)=>j[q]??-1),[i,V,I,j]),pe=a.useCallback(()=>{Y(!1);const W=le();me(W)},[le]);a.useEffect(()=>{if(M)return;const W=q=>{q.preventDefault(),q.returnValue="";const O=le(),se=JSON.stringify({answers:O,shareShortCode:s||null});fetch(`${So}/arena/tests/${r._id}/submit`,{method:"POST",headers:{"Content-Type":"application/json"},body:se,keepalive:!0,credentials:"include"}).catch(()=>{})};return window.addEventListener("beforeunload",W),()=>window.removeEventListener("beforeunload",W)},[M,le,r._id]);const me=async W=>{z(!0),ge(W);try{const q=await os(r._id,{answers:W,shareShortCode:s||null});v(q),R(q.score),typeof c=="function"&&await Promise.resolve(c({answers:W,result:q}))}catch(q){console.error("Failed to submit answers:",q),R(0)}finally{z(!1),h(!0)}};a.useEffect(()=>{if(g>0&&!M&&d>0){const W=setInterval(()=>w(q=>q-1),1e3);return()=>clearInterval(W)}else if(g>0&&d<=0&&!M)if(i==="list")we();else{const W=V.map((q,O)=>j[O]??-1);me(W)}},[g,d,M,i]);const ke=W=>{const q=Math.floor(W/60),O=W%60;return`${q}:${O<10?"0":""}${O}`};a.useEffect(()=>{if(M&&!F){const W=(k==null?void 0:k.showResults)??S;if(W&&!k)return;const q=N;(q||te)&&(H(!0),(async()=>{try{await Qa.post(`${So}/arena/battles/save-solo`,{testId:r._id,score:T,totalQuestions:V.length,guestName:q?null:te,answers:ae,results:W?(k==null?void 0:k.results)||[]:[],shareShortCode:s||null},{withCredentials:!0})}catch(ve){console.error("Yakkalik test natijasini saqlashda xatolik:",ve)}})())}},[M,F,_,N,te,r._id,T,V.length,ae,k,S,s]),a.useEffect(()=>{w(g*60)},[g,r._id]);const ze=(k==null?void 0:k.showResults)??S,Se=W=>{if(D)return;B(W),m(!0);const q=[...j];q[C]=W,p(q),setTimeout(()=>{if(C+1<V.length)E(C+1),B(null),m(!1);else{const O=V.map((se,ve)=>ve===C?W:q[ve]??-1);me(O)}},300)},ye=(W,q)=>{M||ie(O=>({...O,[W]:q}))},we=()=>{if(M)return;const W=V.map((q,O)=>I[O]??-1);me(W)};return!N&&!te?e.jsx(Gr,{children:e.jsxs(Us,{children:[e.jsx("h2",{children:"Ismingizni kiriting"}),e.jsx("p",{style:{color:"var(--text-muted-color)",margin:0},children:"Testda qatnashish uchun ismingizni kiriting."}),e.jsx(Ks,{placeholder:"Ismingiz...",value:Z,onChange:W=>x(W.target.value)}),e.jsx(Zs,{onClick:()=>Z.trim()&&xe(Z.trim()),children:"Kirish"}),e.jsx("button",{onClick:n,style:{background:"none",border:"none",color:"var(--text-muted-color)",cursor:"pointer"},children:"Bekor qilish"})]})}):f?e.jsx(Gr,{children:e.jsx(qo,{children:e.jsx("h2",{children:"Javoblar tekshirilmoqda..."})})}):M?e.jsx(Gr,{children:e.jsxs(qo,{children:[e.jsx("h2",{children:"Test yakunlandi!"}),ze&&k?e.jsxs(e.Fragment,{children:[e.jsxs(Hs,{children:[k.score," / ",k.total]}),e.jsx("p",{style:{color:"var(--text-muted-color)"},children:"To'g'ri javoblar"}),e.jsx(Ns,{children:V.map((W,q)=>{var ve,fe,$e;const O=(ve=k.results)==null?void 0:ve.find(X=>X.questionIndex===q),se=ae[q];return e.jsxs(Ws,{$correct:!!(O!=null&&O.correct),children:[e.jsxs(Pt,{children:[e.jsxs(Gs,{children:[q+1,". ",W.questionText]}),e.jsx(Qs,{$correct:!!(O!=null&&O.correct),children:O!=null&&O.correct?e.jsxs(e.Fragment,{children:[e.jsx(ur,{size:14})," To'g'ri"]}):e.jsxs(e.Fragment,{children:[e.jsx(wo,{size:14})," Xato"]})})]}),e.jsx(Pt,{children:e.jsxs("span",{children:["Sizning javobingiz:"," ",e.jsx("strong",{style:{color:"var(--text-color)"},children:se>=0?(fe=W.options)==null?void 0:fe[se]:"Javob berilmagan"})]})}),e.jsx(Pt,{children:e.jsxs("span",{children:["To'g'ri javob:"," ",e.jsx("strong",{style:{color:"#22c55e"},children:(O==null?void 0:O.correctOptionIndex)>=0?($e=W.options)==null?void 0:$e[O.correctOptionIndex]:"Ma'lumot yo'q"})]})}),e.jsx(Ys,{children:(W.options||[]).map((X,ce)=>{const U=se===ce,re=(O==null?void 0:O.correctOptionIndex)===ce,be=U&&re?"selected-correct":re?"correct":U?"selected":"default";return e.jsxs(Js,{$isSelected:U,$isCorrect:re,children:[e.jsxs(Xs,{children:[String.fromCharCode(65+ce),". ",X]}),(U||re)&&e.jsx(Vs,{children:U&&re?e.jsxs(Ot,{$tone:be,children:[e.jsx(ur,{size:12}),"Siz tanlagan va to'g'ri"]}):e.jsxs(e.Fragment,{children:[U&&e.jsxs(Ot,{$tone:"selected",children:[e.jsx(wo,{size:12}),"Siz tanlagan"]}),re&&e.jsxs(Ot,{$tone:"correct",children:[e.jsx(ur,{size:12}),"To'g'ri javob"]})]})})]},`${W._id||q}-${ce}`)})})]},W._id||q)})})]}):e.jsxs(e.Fragment,{children:[e.jsx(ur,{size:64,color:"var(--primary-color)"}),e.jsx("p",{style:{color:"var(--text-muted-color)",fontSize:"1.2rem"},children:"Javoblaringiz saqlandi."})]}),e.jsx(Po,{onClick:n,children:"Testlar ro'yxatiga qaytish"})]})}):de?e.jsxs(Gr,{style:i==="list"?{maxWidth:"900px"}:{},children:[e.jsxs(Os,{children:[e.jsxs(Es,{onClick:()=>Y(!0),children:[e.jsx(qe,{size:20})," Orqaga"]}),e.jsx("div",{style:{marginLeft:"auto",display:"flex",gap:"16px",alignItems:"center",flexShrink:0},children:g>0&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",color:d<=60?"var(--danger-color)":"var(--primary-color)",fontWeight:"bold"},children:[e.jsx(Qn,{size:18})," ",e.jsx("span",{children:ke(d)})]})}),e.jsx("div",{style:{color:"var(--text-muted-color)"},children:i==="single"?`${C+1} / ${V.length}`:`${V.length} ta savol`}),e.jsx(Fs,{children:r.title})]}),i==="single"?e.jsxs("div",{children:[e.jsx(Lo,{children:e.jsx(Mo,{children:de.questionText})}),e.jsx(Ro,{children:de.options.map((W,q)=>{const O=["A","B","D","E","F","G"][q]||String.fromCharCode(65+q);return e.jsxs(Ao,{disabled:D,isSelected:$===q,isCorrect:!1,isRevealed:!1,showResults:!1,onClick:()=>Se(q),children:[e.jsx(_o,{isSelected:$===q,isCorrect:!1,isRevealed:!1,showResults:!1,children:O}),e.jsx(Do,{children:W})]},q)})})]}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"32px"},children:[V.map((W,q)=>e.jsxs("div",{children:[e.jsx(Lo,{children:e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"flex-start"},children:[e.jsxs("div",{style:{fontWeight:"bold",color:"var(--primary-color)",fontSize:"1.1rem",marginTop:"2px"},children:[q+1,"."]}),e.jsx(Mo,{children:W.questionText})]})}),e.jsx(Ro,{children:W.options.map((O,se)=>{const ve=["A","B","D","E","F","G"][se]||String.fromCharCode(65+se),fe=I[q]===se;return e.jsxs(Ao,{disabled:M,isSelected:fe,isCorrect:!1,isRevealed:!1,showResults:!1,onClick:()=>ye(q,se),children:[e.jsx(_o,{isSelected:fe,isCorrect:!1,isRevealed:!1,showResults:!1,children:ve}),e.jsx(Do,{children:O})]},se)})})]},q)),e.jsx(Po,{onClick:we,style:{marginTop:"16px",alignSelf:"center",minWidth:"200px"},children:"Yakunlash"})]}),G&&e.jsx(ei,{onClick:()=>Y(!1),children:e.jsxs(ri,{onClick:W=>W.stopPropagation(),children:[e.jsx(ti,{children:"Testni yakunlaysizmi?"}),e.jsx(oi,{children:"Hozirgi natijangiz qabul qilinadi. Javob bermagan savollaringiz 0 ball hisoblanadi."}),e.jsxs(ni,{children:[e.jsx(ai,{onClick:()=>Y(!1),children:"Davom etish"}),e.jsx(si,{onClick:pe,children:"Chiqish"})]})]})})]}):null},ii=je`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,li=je`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,ci=t.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 10000;
  animation: ${ii} 0.18s ease-out;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,di=t.div`
  width: min(100%, 860px);
  max-height: min(88vh, 920px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 22px;
  animation: ${li} 0.22s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`,pi=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`;t.button`
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
`;const xi=t.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 18px;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`,nr=t.div`
  margin-bottom: 16px;
`,ar=t.label`
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`,Et=t.input`
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
`,Ft=t.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: ${r=>r.$minHeight||"88px"};
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
`,Oo=t.div`
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.5;
`,ui=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
`,hi=t.div`
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 18px;
  padding: 18px;
`,gi=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`,mi=t.h3`
  margin: 0;
  font-size: 15px;
  color: var(--text-color);
`,fi=t.button`
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
`,Eo=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`,Fo=t.span`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${r=>r.$tone||"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 12px;
  font-weight: 600;
`,bi=t.button`
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
`,vi=t.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px 16px 16px;
  }
`,yi=t.div`
  font-size: 13px;
  color: var(--text-muted-color);
  line-height: 1.5;
`,ji=t.button`
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
`;t.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;const ki=(r="")=>String(r).split(/[\s,]+/).map(n=>n.trim()).filter(Boolean),Qr=()=>({prompt:"",answer:"",extraTokens:""}),wi=(r="")=>String(r).split(/\n\s*\n+/).map(n=>n.trim()).filter(Boolean).map(n=>{const s=n.split(`
`).map(i=>i.trim()).filter(Boolean),c=s.find(i=>i.startsWith("$")),g=s.find(i=>i.startsWith('"')&&i.endsWith('"')||i.startsWith("'")&&i.endsWith("'")),S=s.find(i=>i.startsWith("+")&&i.endsWith("+")||i.startsWith("`")&&i.endsWith("`"));return{prompt:c?c.replace(/^\$\s*/,"").trim():"",answer:g?g.slice(1,-1).trim():"",extraTokens:S?S.slice(1,-1).trim():""}}).filter(n=>n.prompt&&n.answer),da=({onClose:r,initialDeck:n=null})=>{const{createSentenceBuilderDeck:s,updateSentenceBuilderDeck:c}=Me(),g=!!(n!=null&&n._id),[S,i]=a.useState(""),[C,E]=a.useState(""),[T,R]=a.useState(""),[$,B]=a.useState([Qr()]),[D,m]=a.useState(!1);a.useEffect(()=>{if(g){i((n==null?void 0:n.title)||""),E((n==null?void 0:n.description)||""),R(""),B(((n==null?void 0:n.items)||[]).length?n.items.map(x=>({prompt:x.prompt||"",answer:Array.isArray(x.answerTokens)?x.answerTokens.join(" "):x.answer||"",extraTokens:Array.isArray(x.extraTokens)?x.extraTokens.join(", "):""})):[Qr()]);return}i(""),E(""),R(""),B([Qr()])},[n,g]);const M=a.useMemo(()=>$.filter(x=>x.prompt.trim()&&x.answer.trim()).length,[$]),h=(x,k,v)=>{const f={prompt:Te.sentenceBuilderPromptChars,answer:Te.sentenceBuilderAnswerChars,extraTokens:Te.sentenceBuilderDescriptionChars};B(z=>z.map((G,Y)=>Y===x?{...G,[k]:f[k]?v.slice(0,f[k]):v}:G))},F=()=>{if($.length>=30){J.error("Bitta to'plamga maksimal 30 ta savol qo'shiladi");return}B(x=>[...x,Qr()])},H=x=>{B(k=>k.filter((v,f)=>f!==x))},Z=async()=>{var v,f,z,G;if(!S.trim()){J.error("To'plam nomini kiriting");return}const x=$.map(Y=>({prompt:Y.prompt.trim(),answer:Y.answer.trim(),extraTokens:Y.extraTokens.split(",").map(ae=>ae.trim()).filter(Boolean)})).filter(Y=>Y.prompt&&Y.answer),k=wi(T);if(!x.length&&!k.length){J.error("Kamida bitta savol kiriting");return}m(!0);try{const Y={title:S.trim(),description:C.trim(),items:k.length?void 0:x,pattern:k.length?T:""};g?await c(n._id,Y):await s(Y),J.success(g?"Gap tuzish to'plami yangilandi":"Gap tuzish to'plami yaratildi"),r()}catch(Y){const ae=Array.isArray((f=(v=Y==null?void 0:Y.response)==null?void 0:v.data)==null?void 0:f.message)?Y.response.data.message[0]:((G=(z=Y==null?void 0:Y.response)==null?void 0:z.data)==null?void 0:G.message)||"Saqlashda xatolik yuz berdi";J.error(ae)}finally{m(!1)}};return e.jsx(ci,{onClick:r,children:e.jsxs(di,{onClick:x=>x.stopPropagation(),children:[e.jsxs(pi,{children:[e.jsx("h2",{children:g?"Gap Tuzish To'plamini Tahrirlash":"Yangi Gap Tuzish To'plami"}),e.jsx(Be,{onClick:r,children:e.jsx(Ie,{size:18})})]}),e.jsxs(xi,{children:[e.jsxs(nr,{children:[e.jsx(ar,{children:"To'plam nomi"}),e.jsx(Et,{placeholder:"Masalan: Past Simple gaplari",value:S,onChange:x=>i(x.target.value.slice(0,Te.sentenceBuilderTitleChars)),maxLength:Te.sentenceBuilderTitleChars})]}),e.jsxs(nr,{children:[e.jsx(ar,{children:"Tavsif"}),e.jsx(Ft,{$minHeight:"74px",placeholder:"Bu to'plam nima haqida?",value:C,onChange:x=>E(x.target.value.slice(0,Te.sentenceBuilderDescriptionChars)),maxLength:Te.sentenceBuilderDescriptionChars})]}),e.jsxs(nr,{children:[e.jsx(ar,{children:"Pattern orqali qo'shish"}),e.jsx(Ft,{$minHeight:"180px",placeholder:`$Men kecha maktabga bordim.
"I went to school yesterday"
+my,are,today,tomorrow,go,will+

$U bugun ishlayapti.
"She is working today"
+was,were,tomorrow,goes+`,value:T,onChange:x=>R(x.target.value.slice(0,Te.sentenceBuilderDescriptionChars*10))}),e.jsx(Oo,{children:"Pattern to'ldirilsa, shu formatdagi bloklardan savollar avtomatik olinadi. Chalg'ituvchi bo'laklar qatori `+token1,token2+` ko'rinishida yoziladi."})]}),e.jsx(Oo,{children:"Har savolda siz prompt yozasiz, to'g'ri javobni kiritasiz. Javob avtomatik bo'laklarga ajratiladi. Istasangiz qo'shimcha chalg'ituvchi bo'laklarni ham vergul bilan kiriting."}),e.jsx(ui,{children:$.map((x,k)=>{const v=ki(x.answer),f=x.extraTokens.split(",").map(z=>z.trim()).filter(Boolean);return e.jsxs(hi,{children:[e.jsxs(gi,{children:[e.jsxs(mi,{children:["Savol #",k+1]}),$.length>1&&e.jsx(fi,{onClick:()=>H(k),children:e.jsx(er,{size:16})})]}),e.jsxs(nr,{children:[e.jsx(ar,{children:"Savol / Prompt"}),e.jsx(Ft,{$minHeight:"88px",placeholder:"Masalan: Men kecha maktabga bordim.",value:x.prompt,onChange:z=>h(k,"prompt",z.target.value),maxLength:Te.sentenceBuilderPromptChars})]}),e.jsxs(nr,{children:[e.jsx(ar,{children:"To'g'ri javob"}),e.jsx(Et,{placeholder:"Masalan: I went to school yesterday",value:x.answer,onChange:z=>h(k,"answer",z.target.value),maxLength:Te.sentenceBuilderAnswerChars}),v.length>0&&e.jsx(Eo,{children:v.map((z,G)=>e.jsx(Fo,{$tone:"rgba(59, 130, 246, 0.12)",children:z},`${z}-${G}`))})]}),e.jsxs(nr,{style:{marginBottom:0},children:[e.jsx(ar,{children:"Chalg'ituvchi bo'laklar"}),e.jsx(Et,{placeholder:"Masalan: my, are, today, tomorrow, go, will",value:x.extraTokens,onChange:z=>h(k,"extraTokens",z.target.value),maxLength:Te.sentenceBuilderDescriptionChars}),f.length>0&&e.jsx(Eo,{children:f.map((z,G)=>e.jsx(Fo,{$tone:"rgba(244, 114, 182, 0.12)",children:z},`${z}-${G}`))})]})]},k)})}),e.jsxs(bi,{onClick:F,children:[e.jsx(Oe,{size:18}),"Yana savol qo'shish"]})]}),e.jsxs(vi,{children:[e.jsxs(yi,{children:["Tayyor savollar: ",M,". Bitta to'plamda ko'p savol saqlashingiz mumkin."]}),e.jsx(ji,{onClick:Z,disabled:D,children:D?"Saqlanmoqda...":g?"Saqlash":"Yaratish"})]})]})})},zi=t.div`
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
`,Si=t.div`
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
`,$i=t.div`
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
`;t.button`
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
`;const Ci=t.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Ti=t.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Yr=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,zr=t.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`,Jr=t.input`
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
`,Bi=t.textarea`
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
`,Xr=t.button`
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

  ${r=>r.primary?`
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
`,Ho=t.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`,Vr=t.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid
    ${r=>r.active?"var(--primary-color)":"var(--border-color)"};
  background-color: ${r=>r.active?"rgba(88, 101, 242, 0.1)":"transparent"};
  color: ${r=>r.active?"var(--primary-color)":"var(--text-color)"};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${r=>r.active?"rgba(88, 101, 242, 0.15)":"var(--hover-color)"};
  }
`,Ii=t.div`
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Li=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Mi=t.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`,Ri=t.div`
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
`,Ur=()=>({questionText:"",options:["",""],correctOptionIndex:0}),pa=({isOpen:r,onClose:n,initialTest:s=null})=>{const{fetchMyTests:c,updateTest:g}=Me(),S=!!(s!=null&&s._id),[i,C]=a.useState("manual"),[E,T]=a.useState(""),[R,$]=a.useState(""),[B,D]=a.useState("single"),[m,M]=a.useState(!1),[h,F]=a.useState([Ur()]),[H,Z]=a.useState("");if(a.useEffect(()=>{if(r){if(S){C("manual"),T((s==null?void 0:s.title)||""),$((s==null?void 0:s.description)||""),D((s==null?void 0:s.displayMode)||"single"),F(((s==null?void 0:s.questions)||[]).length?s.questions.map(d=>({questionText:d.questionText||"",options:Array.isArray(d.options)?[...d.options]:["",""],correctOptionIndex:Number(d.correctOptionIndex)||0})):[Ur()]),Z("");return}C("manual"),T(""),$(""),D("single"),F([Ur()]),Z("")}},[s,S,r]),!r)return null;const x=()=>{if(h.length>=30){J.error("Maksimal 30 ta savol qo'shish mumkin!");return}F([...h,Ur()])},k=d=>{h.length<=1||F(h.filter((w,j)=>j!==d))},v=(d,w)=>{const j=[...h];j[d].questionText=w.slice(0,Te.testQuestionChars),F(j)},f=d=>{const w=[...h];w[d].options.length>=4||(w[d].options.push(""),F(w))},z=(d,w)=>{const j=[...h];j[d].options.length<=2||(j[d].options=j[d].options.filter((p,I)=>I!==w),(j[d].correctOptionIndex>=j[d].options.length||j[d].correctOptionIndex===w)&&(j[d].correctOptionIndex=0),F(j))},G=(d,w,j)=>{const p=[...h];p[d].options[w]=j.slice(0,Te.testOptionChars),F(p)},Y=(d,w)=>{const j=[...h];j[d].correctOptionIndex=w,F(j)},ae=d=>{const w=[],j=d.split(`
`).map(I=>I.trim()).filter(Boolean);let p=null;for(let I of j)if(I.startsWith("$")){if(p&&p.questionText&&p.options.length>=2){if(p.correctOptionIndex===-1)throw new Error(`Savolga to'g'ri javob belgilanmagan: ${p.questionText}`);w.push(p)}p={questionText:I.substring(1).trim(),options:[],correctOptionIndex:-1}}else if(I.startsWith("+")){if(!p)throw new Error("Javobdan oldin savol yozilishi ($) kerak");p.options.push(I.substring(1).trim()),p.correctOptionIndex=p.options.length-1}else if(I.startsWith("-")){if(!p)throw new Error("Javobdan oldin savol yozilishi ($) kerak");p.options.push(I.substring(1).trim())}else throw new Error(`Tushunarsiz qator: ${I}. Faqat $, +, - ishlating.`);if(p){if(p.correctOptionIndex===-1)throw new Error(`Savolga to'g'ri javob belgilanmagan: ${p.questionText}`);if(p.options.length<2)throw new Error(`Savolda kamida 2 ta javob bo'lishi kerak: ${p.questionText}`);w.push(p)}return w},ge=async()=>{var w,j;if(!E.trim())return J.error("Testga nom bering!");let d=[];if(i==="manual"){for(let p=0;p<h.length;p++){const I=h[p];if(!I.questionText.trim())return J.error(`${p+1}-shavol matni bo'sh!`);if(I.options.some(ie=>!ie.trim()))return J.error(`${p+1}-savolning barcha javoblarini to'ldiring!`)}d=h}else try{if(d=ae(H),d.length===0)return J.error("Andazada hech qanday savol topilmadi.");if(d.length>30)return J.error("Andazada savollar soni 30 tadan oshmasligi kerak!")}catch(p){return J.error(`Xato: ${p.message}`)}try{M(!0);const p={title:E.trim(),description:R.trim(),isPublic:!0,displayMode:B,questions:d};S?await g(s._id,p):await sa(p),await c(),J.success(S?"Test yangilandi":"Test yaratildi"),n()}catch(p){const I=((j=(w=p==null?void 0:p.response)==null?void 0:w.data)==null?void 0:j.message)||p.message||"Test yaratishda xatolik";J.error(I)}finally{M(!1)}};return e.jsx(zi,{onClick:n,children:e.jsxs(Si,{onClick:d=>d.stopPropagation(),children:[e.jsxs($i,{children:[e.jsx("h2",{children:S?"Testni Tahrirlash":"Yangi Test Yaratish"}),e.jsx(Be,{onClick:n,children:e.jsx(Ie,{size:18})})]}),e.jsxs(Ci,{children:[e.jsxs(Yr,{children:[e.jsx(zr,{children:"Test nomi"}),e.jsx(Jr,{placeholder:"Masalan: JavaScript Asoslari",value:E,onChange:d=>T(d.target.value.slice(0,Te.testTitleChars)),maxLength:Te.testTitleChars})]}),e.jsxs(Yr,{children:[e.jsx(zr,{children:"Test haqida (Ixtiyoriy)"}),e.jsx(Jr,{placeholder:"Qisqacha tavsif...",value:R,onChange:d=>$(d.target.value.slice(0,Te.testDescriptionChars)),maxLength:Te.testDescriptionChars})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr",gap:"16px",padding:"16px",background:"rgba(0,0,0,0.1)",borderRadius:"8px",border:"1px solid var(--border-color)"},children:e.jsxs(Yr,{style:{gridColumn:"span 1"},children:[e.jsx(zr,{children:"Test ko'rinishi"}),e.jsxs(Ho,{style:{marginBottom:0},children:[e.jsxs(Vr,{active:B==="single",onClick:()=>D("single"),type:"button",style:{padding:"8px"},children:[e.jsx(Sa,{size:14})," 1-talab"]}),e.jsxs(Vr,{active:B==="list",onClick:()=>D("list"),type:"button",style:{padding:"8px"},children:[e.jsx($a,{size:14})," Ro'yxat"]})]})]})}),e.jsxs(Ho,{children:[e.jsxs(Vr,{active:i==="manual",onClick:()=>C("manual"),type:"button",children:[e.jsx(Oe,{size:16})," Qo'lda kiritish"]}),e.jsxs(Vr,{active:i==="template",onClick:()=>C("template"),type:"button",children:[e.jsx(Ca,{size:16})," Maxsus Andaza"]})]}),i==="manual"?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[h.map((d,w)=>e.jsxs(Ii,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(zr,{children:[w+1," - Savol"]}),e.jsx(Be,{onClick:()=>k(w),disabled:h.length<=1,style:{color:"var(--danger-color)"},children:e.jsx(er,{size:18})})]}),e.jsx(Jr,{placeholder:"Savol matni...",value:d.questionText,onChange:j=>v(w,j.target.value)}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(zr,{style:{fontSize:"12px",color:"var(--text-muted-color)"},children:"Javob variantlari (To'g'ri javobni belgilang)"}),d.options.map((j,p)=>e.jsxs(Li,{children:[e.jsx(Mi,{type:"radio",name:`correct-${w}`,checked:d.correctOptionIndex===p,onChange:()=>Y(w,p)}),e.jsx(Jr,{style:{flex:1},placeholder:`${p+1} - variant`,value:j,onChange:I=>G(w,p,I.target.value)}),e.jsx(Be,{onClick:()=>z(w,p),disabled:d.options.length<=2,children:e.jsx(Ie,{size:18})})]},p))]}),d.options.length<4&&e.jsxs(Xr,{type:"button",style:{alignSelf:"flex-start",marginTop:"8px",fontSize:"12px",padding:"6px 12px"},onClick:()=>f(w),children:[e.jsx(Oe,{size:14})," Variant qo'shish"]})]},w)),e.jsxs(Xr,{type:"button",style:{borderStyle:"dashed",padding:"16px"},onClick:x,disabled:h.length>=30,children:[e.jsx(Oe,{size:18})," ",h.length>=30?"Limitga yetildi (30/30)":"Yana savol qo'shish"]})]}):e.jsxs(Yr,{children:[e.jsxs(Ri,{children:[e.jsx("b",{children:"Andaza qoidalari:"})," ",e.jsx("br",{}),e.jsx("code",{children:"$"})," belgisi bilan ",e.jsx("b",{children:"Savol"}),"ni boshlang. ",e.jsx("br",{}),e.jsx("code",{children:"-"})," belgisi bilan ",e.jsx("b",{children:"Xato javoblar"}),"ni kiriting."," ",e.jsx("br",{}),e.jsx("code",{children:"+"})," belgisi bilan bitta ",e.jsx("b",{children:"To'g'ri javob"}),"ni kiriting. ",e.jsx("br",{}),"Qator tashlab navbatdagi savolga o'tasiz."]}),e.jsx(Bi,{placeholder:`$ JavaScript qaysi yilda yaratilgan?
- 1990
- 1994
+ 1995
- 2000

$ Const qanday o'zgaruvchi?
- O'zgaruvchan
+ O'zgarmas
- Funksiya`,value:H,onChange:d=>Z(d.target.value)})]})]}),e.jsxs(Ti,{children:[e.jsx(Xr,{onClick:n,disabled:m,children:"Bekor qilish"}),e.jsx(Xr,{primary:!0,onClick:ge,disabled:m,children:m?"Saqlanmoqda...":S?"O'zgarishlarni saqlash":"Testni Yaratish"})]})]})})},Ai=t.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.28);
  z-index: 10000;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    background: var(--background-color);
  }
`,_i=t.aside`
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
`,Di=t.div`
  padding: 14px 14px 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
`,qi=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`,Pi=t.div`
  min-width: 0;
`,Oi=t.button`
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
`,Ei=t.h2`
  margin: 4px 0 0;
  color: var(--text-color);
  font-size: 20px;
  line-height: 1.2;
`,Fi=t.p`
  margin: 4px 0 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,Hi=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`,Ni=t.button`
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
`,Wi=t.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Gi=t.label`
  min-height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
`,Qi=t.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 13px;
  outline: none;
`,Yi=t.select`
  min-height: 38px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 13px;
  outline: none;
`,Ji=t.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Xi=t.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,Kr=t.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Zr=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
`,et=t.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
`,rt=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`,Vi=t.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
`,Ui=t.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  overflow: hidden;
`,Ki=t.div`
  overflow-x: auto;
`,Zi=t.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 620px;
`,Ue=t.th`
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 800;
  text-align: left;
  white-space: nowrap;
`,Ke=t.td`
  padding: 10px 12px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
  font-size: 13px;
  vertical-align: top;
`,el=t.tr`
  cursor: pointer;

  &:hover td {
    background: rgba(148, 163, 184, 0.04);
  }
`,rl=t.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,tl=t.div`
  font-weight: 700;
  color: var(--text-color);
`,Ht=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`,ol=t.span`
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
`,nl=t.span`
  color: ${r=>r.$value>=80?"var(--success-color)":r.$value>=50?"var(--text-color)":"var(--danger-color)"};
  font-weight: 800;
`,al=t.button`
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
`,sl=t.td`
  padding: 10px 12px 12px;
  background: rgba(148, 163, 184, 0.04);
  border-bottom: 1px solid var(--border-color);
`,il=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ll=t.div`
  border: 1px solid
    ${r=>r.$correct?"rgba(34, 197, 94, 0.22)":"rgba(239, 68, 68, 0.22)"};
  border-radius: 10px;
  background: ${r=>r.$correct?"rgba(34, 197, 94, 0.05)":"rgba(239, 68, 68, 0.05)"};
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,cl=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`,dl=t.div`
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45;
`,pl=t.span`
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: ${r=>r.$correct?"rgba(34, 197, 94, 0.12)":"rgba(239, 68, 68, 0.12)"};
  color: ${r=>r.$correct?"var(--success-color)":"var(--danger-color)"};
  font-size: 11px;
  font-weight: 700;
`,Sr=t.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.5;

  strong {
    color: var(--text-color);
  }
`,No=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Wo=t.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${r=>r.$bg||"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 11px;
  font-weight: 700;
`,xl=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,ul=t.div`
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.08);
  padding: 8px 10px;
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.45;
`,hl=t.div`
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  background: var(--tertiary-color);
  padding: 24px 14px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 13px;
`,gl=t.div`
  height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  opacity: 0.7;
`,ml=(r,n)=>(r==null?void 0:r.questionIndex)!==void 0&&(r==null?void 0:r.questionIndex)!==null?String(r.questionIndex):r!=null&&r.prompt?`prompt:${r.prompt}`:`q:${n}`,Ce=(r="")=>String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),xa=r=>{if(!r)return"";try{return new Date(r).toLocaleString("uz-UZ")}catch{return""}},fl=r=>{const n=r.length,s=n?Math.round(r.reduce((S,i)=>S+Number(i.accuracy||0),0)/n):0,c=new Map;r.forEach(S=>{(S.breakdowns||[]).forEach((i,C)=>{const E=ml(i,C),T=c.get(E)||{prompt:i.prompt||`Savol #${C+1}`,correct:0,total:0};T.total+=1,i.isCorrect&&(T.correct+=1),c.set(E,T)})});const g=Array.from(c.values()).map(S=>({...S,rate:S.total?Math.round(S.correct/S.total*100):0})).sort((S,i)=>i.rate-S.rate);return{submittedCount:n,mastery:s,easiest:g[0]||null,hardest:g[g.length-1]||null}},bl=({title:r,filteredResults:n,analytics:s,t:c})=>{var E,T,R,$;const g=n.map(B=>`
        <tr>
          <td>${Ce(B.participantName||c("arenaShared.results.unknownUser"))}</td>
          <td>${Ce(B.groupName||c("arenaShared.results.noGroup"))}</td>
          <td>${Ce(xa(B.createdAt))}</td>
          <td>${B.score}</td>
          <td>${B.total}</td>
          <td>${B.accuracy}%</td>
        </tr>
      `).join(""),S=`
    <!doctype html>
    <html lang="uz">
      <head>
        <meta charset="utf-8" />
        <title>${Ce(r)} - ${Ce(c("arenaShared.results.reportTitle"))}</title>
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
          <h1>${Ce(r)} ${Ce(c("arenaShared.results.resultsSuffix"))}</h1>
          <p class="sub">${Ce(c("arenaShared.results.filteredReport"))}</p>
        </div>
        <section class="stats">
          <div class="card"><div class="label">${Ce(c("arenaShared.results.submitted"))}</div><div class="value">${s.submittedCount}</div></div>
          <div class="card"><div class="label">${Ce(c("arenaShared.results.mastery"))}</div><div class="value">${s.mastery}%</div></div>
          <div class="card"><div class="label">${Ce(c("arenaShared.results.easiest"))}</div><div class="meta">${Ce(((E=s.easiest)==null?void 0:E.prompt)||c("arenaShared.results.noData"))}</div><div class="value">${((T=s.easiest)==null?void 0:T.rate)??0}%</div></div>
          <div class="card"><div class="label">${Ce(c("arenaShared.results.hardest"))}</div><div class="meta">${Ce(((R=s.hardest)==null?void 0:R.prompt)||c("arenaShared.results.noData"))}</div><div class="value">${(($=s.hardest)==null?void 0:$.rate)??0}%</div></div>
        </section>
        <table>
          <thead>
            <tr>
              <th>${Ce(c("arenaShared.results.student"))}</th>
              <th>${Ce(c("arenaShared.results.group"))}</th>
              <th>${Ce(c("arenaShared.results.date"))}</th>
              <th>${Ce(c("arenaShared.results.correct"))}</th>
              <th>${Ce(c("arenaShared.results.total"))}</th>
              <th>${Ce(c("arenaShared.results.percent"))}</th>
            </tr>
          </thead>
          <tbody>${g}</tbody>
        </table>
      </body>
    </html>
  `,i=document.createElement("iframe");i.style.position="fixed",i.style.right="0",i.style.bottom="0",i.style.width="0",i.style.height="0",i.style.border="0",i.setAttribute("aria-hidden","true");const C=()=>{window.setTimeout(()=>{i.remove()},1200)};i.onload=()=>{const B=i.contentWindow;if(!B){C();return}B.focus(),B.print(),C()},i.srcdoc=S,document.body.appendChild(i)},jo=({title:r,subtitle:n,searchPlaceholder:s="",loading:c=!1,results:g=[],onClose:S})=>{var h,F,H,Z;const{t:i}=Mr(),[C,E]=a.useState(""),[T,R]=a.useState("all"),[$,B]=a.useState(null),D=a.useMemo(()=>Array.from(new Set(g.map(x=>x.groupName).filter(Boolean))).sort((x,k)=>x.localeCompare(k)),[g]),m=a.useMemo(()=>{const x=C.trim().toLowerCase();return g.filter(k=>{const v=!x||String(k.participantName||"").toLowerCase().includes(x)||String(k.groupName||"").toLowerCase().includes(x),f=T==="all"||String(k.groupName||"")===T;return v&&f})},[T,g,C]),M=a.useMemo(()=>fl(m),[m]);return e.jsx(Ai,{onClick:S,children:e.jsxs(_i,{onClick:x=>x.stopPropagation(),children:[e.jsxs(Di,{children:[e.jsxs(qi,{children:[e.jsxs(Pi,{children:[e.jsxs(Oi,{onClick:S,children:[e.jsx(qe,{size:16}),i("common.back",{defaultValue:"Orqaga"})]}),e.jsx(Ei,{children:r}),e.jsx(Fi,{children:n})]}),e.jsx(Hi,{children:e.jsxs(Ni,{type:"button",onClick:()=>bl({title:r,filteredResults:m,analytics:M,t:i}),children:[e.jsx(Yn,{size:14}),"PDF"]})})]}),e.jsxs(Wi,{children:[e.jsxs(Gi,{children:[e.jsx(Jn,{size:14}),e.jsx(Qi,{placeholder:s||i("arenaShared.results.searchPlaceholder"),value:C,onChange:x=>E(x.target.value)})]}),e.jsxs(Yi,{value:T,onChange:x=>R(x.target.value),children:[e.jsx("option",{value:"all",children:i("arenaShared.results.allGroups")}),D.map(x=>e.jsx("option",{value:x,children:x},x))]})]})]}),e.jsxs(Ji,{children:[e.jsxs(Xi,{children:[e.jsxs(Kr,{children:[e.jsx(Zr,{children:i("arenaShared.results.submitted")}),e.jsx(et,{children:M.submittedCount}),e.jsx(rt,{children:i("arenaShared.results.filteredCount")})]}),e.jsxs(Kr,{children:[e.jsx(Zr,{children:i("arenaShared.results.mastery")}),e.jsxs(et,{children:[M.mastery,"%"]}),e.jsx(rt,{children:i("arenaShared.results.average")})]}),e.jsxs(Kr,{children:[e.jsx(Zr,{children:i("arenaShared.results.easiest")}),e.jsxs(et,{children:[((h=M.easiest)==null?void 0:h.rate)??0,"%"]}),e.jsx(rt,{children:((F=M.easiest)==null?void 0:F.prompt)||i("arenaShared.results.noData")})]}),e.jsxs(Kr,{children:[e.jsx(Zr,{children:i("arenaShared.results.hardest")}),e.jsxs(et,{children:[((H=M.hardest)==null?void 0:H.rate)??0,"%"]}),e.jsx(rt,{children:((Z=M.hardest)==null?void 0:Z.prompt)||i("arenaShared.results.noData")})]})]}),e.jsx(Vi,{children:i("arenaShared.results.allResults")}),c?e.jsx(e.Fragment,{children:Array.from({length:5}).map((x,k)=>e.jsx(gl,{},k))}):m.length===0?e.jsx(hl,{children:i("arenaShared.results.empty")}):e.jsx(Ui,{children:e.jsx(Ki,{children:e.jsxs(Zi,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx(Ue,{children:i("arenaShared.results.student")}),e.jsx(Ue,{children:i("arenaShared.results.group")}),e.jsx(Ue,{children:i("arenaShared.results.date")}),e.jsx(Ue,{children:i("arenaShared.results.correct")}),e.jsx(Ue,{children:i("arenaShared.results.total")}),e.jsx(Ue,{children:i("arenaShared.results.percent")}),e.jsx(Ue,{})]})}),e.jsx("tbody",{children:m.map(x=>{const k=$===x.id;return e.jsxs(Ze.Fragment,{children:[e.jsxs(el,{onClick:()=>B(v=>v===x.id?null:x.id),children:[e.jsx(Ke,{children:e.jsxs(rl,{children:[e.jsx(tl,{children:x.participantName}),e.jsx(Ht,{children:i("arenaShared.results.questionCount",{count:(x.breakdowns||[]).length})})]})}),e.jsx(Ke,{children:x.groupName?e.jsx(ol,{children:x.groupName}):e.jsx(Ht,{children:"-"})}),e.jsx(Ke,{children:e.jsx(Ht,{children:xa(x.createdAt)})}),e.jsx(Ke,{children:x.score}),e.jsx(Ke,{children:x.total}),e.jsx(Ke,{children:e.jsxs(nl,{$value:x.accuracy,children:[x.accuracy,"%"]})}),e.jsx(Ke,{children:e.jsx(al,{type:"button",onClick:v=>{v.stopPropagation(),B(f=>f===x.id?null:x.id)},children:k?e.jsx(Ta,{size:14}):e.jsx(Ba,{size:14})})})]}),k?e.jsx("tr",{children:e.jsx(sl,{colSpan:7,children:e.jsx(il,{children:(x.breakdowns||[]).map((v,f)=>e.jsxs(ll,{$correct:v.isCorrect,children:[e.jsxs(cl,{children:[e.jsxs(dl,{children:[f+1,"."," ",v.prompt||i("arenaShared.results.question")]}),e.jsx(pl,{$correct:v.isCorrect,children:v.isCorrect?i("arenaShared.results.correct"):i("arenaShared.results.wrong")})]}),Array.isArray(v.selectedTokens)?e.jsxs(e.Fragment,{children:[e.jsx(Sr,{children:i("arenaShared.results.yourSentence")}),e.jsx(No,{children:(v.selectedTokens||[]).length?v.selectedTokens.map((z,G)=>e.jsx(Wo,{$bg:"rgba(59, 130, 246, 0.12)",children:z},`${z}-${G}`)):e.jsx(Sr,{children:e.jsx("strong",{children:i("arenaShared.results.noAnswer")})})}),e.jsx(Sr,{children:i("arenaShared.results.correctAnswer")}),e.jsx(No,{children:(v.expectedTokens||[]).map((z,G)=>e.jsx(Wo,{$bg:"rgba(34, 197, 94, 0.14)",children:z},`${z}-${G}`))}),!v.isCorrect&&(v.mistakes||[]).length>0?e.jsx(xl,{children:(v.mistakes||[]).map((z,G)=>e.jsx(ul,{children:i("arenaShared.results.mistakeTemplate",{position:z.position,actual:z.actual||i("arenaShared.results.nothing"),expected:z.expected||i("arenaShared.results.extraToken")})},`${f}-${G}`))}):null]}):e.jsxs(e.Fragment,{children:[e.jsxs(Sr,{children:[i("arenaShared.results.selectedAnswer"),":"," ",e.jsx("strong",{children:v.selectedText||i("arenaShared.results.noAnswer")})]}),e.jsxs(Sr,{children:[i("arenaShared.results.correctAnswer"),":"," ",e.jsx("strong",{children:v.correctText||i("arenaShared.results.noInfo")})]})]})]},`${x.id}-${f}`))})})}):null]},x.id)})})]})})})]})]})})},vl=(r="")=>{const n=String(r).match(/\(([^()]+)\)\s*$/);return n?n[1].trim():""},yl=(r="")=>String(r).replace(/\s*\([^()]+\)\s*$/,"").trim(),ua=({test:r,onClose:n})=>{const{fetchTestResults:s}=Me(),[c,g]=a.useState([]),[S,i]=a.useState(!0);a.useEffect(()=>{let E=!0;return(async()=>{if(r!=null&&r._id){i(!0);try{const R=await s(r._id,{page:1,limit:500});if(!E)return;const B=(Array.isArray(R)?R:(R==null?void 0:R.data)||[]).flatMap(D=>(D.participants||[]).map((m,M)=>{var h,F,H,Z,x,k;return{id:`${D._id||D.createdAt}-${m.userId||M}`,participantName:yl(m.nickname)||"Foydalanuvchi",groupName:vl(m.nickname),createdAt:D.createdAt,score:Number(m.score||0),total:Number(m.total||((h=m.results)==null?void 0:h.length)||((F=r.questions)==null?void 0:F.length)||0),accuracy:Number(m.total||((H=m.results)==null?void 0:H.length)||((Z=r.questions)==null?void 0:Z.length)||0)>0?Math.round(Number(m.score||0)/Number(m.total||((x=m.results)==null?void 0:x.length)||((k=r.questions)==null?void 0:k.length)||0)*100):0,breakdowns:(m.results||[]).map(v=>{var G,Y,ae;const f=(G=r.questions)==null?void 0:G[v.questionIndex],z=Array.isArray(m.answers)?m.answers[v.questionIndex]:-1;return{questionIndex:v.questionIndex,prompt:(f==null?void 0:f.questionText)||`Savol #${v.questionIndex+1}`,isCorrect:!!v.correct,selectedText:z>=0?(Y=f==null?void 0:f.options)==null?void 0:Y[z]:"Javob berilmagan",correctText:v.correctOptionIndex>=0?(ae=f==null?void 0:f.options)==null?void 0:ae[v.correctOptionIndex]:"Ma'lumot yo'q"}})}})).sort((D,m)=>new Date(m.createdAt||0).getTime()-new Date(D.createdAt||0).getTime());g(B)}catch(R){console.error("Failed to load test results",R),E&&g([])}finally{E&&i(!1)}}})(),()=>{E=!1}},[s,r]);const C=a.useMemo(()=>`"${(r==null?void 0:r.title)||"Test"}" bo'yicha ishlagan foydalanuvchilar, ularning natijasi va har bir savoldagi breakdown.`,[r]);return r?e.jsx(jo,{title:"Test natijalari",subtitle:C,searchPlaceholder:"Talaba yoki guruh qidirish...",loading:S,results:c,onClose:n}):null},jl=t.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 42, 0.44);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
`,kl=t.div`
  width: min(100%, 420px);
  margin: auto 0;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,wl=t.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`,zl=t.div`
  min-width: 0;
`,Sl=t.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`,$l=t.p`
  margin: 4px 0 0;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,Cl=t.button`
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
`,Tl=t.div`
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
`,Bl=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`,Il=t.span`
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
`,$r=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Cr=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`,Go=t.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
`,tt=t.button`
  min-height: 40px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$active?"rgba(59, 130, 246, 0.12)":"var(--secondary-color)"};
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  text-align: left;
  cursor: pointer;
`,ot=t.span`
  font-size: 12px;
  font-weight: 700;
`,nt=t.span`
  font-size: 11px;
  line-height: 1.35;
  color: var(--text-muted-color);
`,Qo=t.input`
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
`,Ll=t.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
`,Yo=t.button`
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid
    ${r=>r.$primary?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$primary?"var(--primary-color)":"var(--secondary-color)"};
  color: ${r=>r.$primary?"#fff":"var(--text-color)"};
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
`,Ml=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Rl=t.div`
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Al=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`,_l=t.div`
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
`,Jo=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
  word-break: break-all;
`,Dl=t.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,Xo=t.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${r=>r.$danger?"rgba(239, 68, 68, 0.08)":"var(--tertiary-color)"};
  color: ${r=>r.$danger?"#ef4444":"var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: default;
  }
`,Vo=t.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,ko=({isOpen:r,onClose:n,title:s,itemTitle:c,limit:g,currentCount:S,mode:i,onModeChange:C,groupName:E,onGroupNameChange:T,showResults:R,onShowResultsChange:$,timeLimit:B,onTimeLimitChange:D,onCreate:m,isCreating:M,links:h,loadingLinks:F,onCopyLink:H,onDeleteLink:Z,deletingLinkId:x,linkPrefix:k})=>{const{t:v}=Mr();return r?e.jsx(jl,{onClick:n,children:e.jsxs(kl,{onClick:f=>f.stopPropagation(),children:[e.jsxs(wl,{children:[e.jsxs(zl,{children:[e.jsx(Sl,{children:s}),e.jsx($l,{children:v("arenaShared.shareLinks.subtitle",{itemTitle:c})})]}),e.jsx(Cl,{type:"button",onClick:n,children:e.jsx(Ie,{size:15})})]}),e.jsxs(Tl,{children:[e.jsxs(Bl,{children:[e.jsx("span",{children:v("arenaShared.shareLinks.limit")}),e.jsxs(Il,{children:[S,"/",g]})]}),e.jsxs($r,{children:[e.jsx(Cr,{children:v("arenaShared.shareLinks.persistLabel")}),e.jsxs(Go,{children:[e.jsxs(tt,{type:"button",$active:i==="persist",onClick:()=>C("persist"),children:[e.jsx(ot,{children:v("arenaShared.shareLinks.persist")}),e.jsx(nt,{children:v("arenaShared.shareLinks.persistHint")})]}),e.jsxs(tt,{type:"button",$active:i==="ephemeral",onClick:()=>C("ephemeral"),children:[e.jsx(ot,{children:v("arenaShared.shareLinks.ephemeral")}),e.jsx(nt,{children:v("arenaShared.shareLinks.ephemeralHint")})]})]})]}),i==="persist"?e.jsxs($r,{children:[e.jsx(Cr,{children:v("arenaShared.shareLinks.groupName")}),e.jsx(Qo,{placeholder:v("arenaShared.shareLinks.groupPlaceholder"),value:E,onChange:f=>T(f.target.value)})]}):null,e.jsxs($r,{children:[e.jsx(Cr,{children:v("arenaShared.shareLinks.showResults")}),e.jsxs(Go,{children:[e.jsxs(tt,{type:"button",$active:R,onClick:()=>$(!0),children:[e.jsx(ot,{children:v("arenaShared.shareLinks.showResultsOn")}),e.jsx(nt,{children:v("arenaShared.shareLinks.showResultsOnHint")})]}),e.jsxs(tt,{type:"button",$active:!R,onClick:()=>$(!1),children:[e.jsx(ot,{children:v("arenaShared.shareLinks.showResultsOff")}),e.jsx(nt,{children:v("arenaShared.shareLinks.showResultsOffHint")})]})]})]}),e.jsxs($r,{children:[e.jsx(Cr,{children:v("arenaShared.shareLinks.timeLimit")}),e.jsx(Qo,{type:"number",min:"0",placeholder:v("arenaShared.shareLinks.timeLimitPlaceholder"),value:B,onChange:f=>D(f.target.value)})]}),e.jsxs(Ll,{children:[e.jsx(Yo,{type:"button",onClick:n,children:v("common.cancel")}),e.jsxs(Yo,{$primary:!0,type:"button",onClick:m,disabled:M||S>=g,children:[e.jsx(hr,{size:14}),M?v("arenaShared.shareLinks.creating"):S>=g?v("arenaShared.shareLinks.limitReached"):v("arenaShared.shareLinks.create")]})]}),e.jsxs($r,{children:[e.jsx(Cr,{children:v("arenaShared.shareLinks.previousLinks")}),F?e.jsx(Vo,{children:v("common.loading")}):h.length===0?e.jsx(Vo,{children:v("arenaShared.shareLinks.empty")}):e.jsx(Ml,{children:h.map(f=>e.jsxs(Rl,{children:[e.jsxs(Al,{children:[e.jsx(_l,{children:f.persistResults?f.groupName||v("arenaShared.shareLinks.persistedDefault"):v("arenaShared.shareLinks.ephemeralDefault")}),e.jsxs(Dl,{children:[e.jsx(Xo,{type:"button",onClick:()=>H(f.shortCode),children:e.jsx(hr,{size:14})}),e.jsx(Xo,{type:"button",$danger:!0,disabled:x===f._id,onClick:()=>Z(f._id),children:e.jsx(er,{size:14})})]})]}),e.jsxs(Jo,{children:[k,f.shortCode]}),e.jsxs(Jo,{children:[v("arenaShared.shareLinks.result"),":"," ",f.showResults?v("arenaShared.shareLinks.resultShown"):v("arenaShared.shareLinks.resultHidden")," ","• ",v("arenaShared.shareLinks.time"),":"," ",f.timeLimit?v("arenaShared.shareLinks.minutes",{count:f.timeLimit}):v("arenaShared.shareLinks.unlimited")]})]},f._id))})]})]})]})}):null},ql=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,Pl=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Ol=t.h2`
  font-size: 24px;
  color: var(--text-color);
  margin: 0;
`,El=t.span`
  font-size: 14px;
  margin-top: 6px;
  color: var(--text-muted-color);
`,Fl=t.button`
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
`;t.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: ${r=>r.bgColor||"var(--primary-color)"};
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
`;const Hl=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  right: 0;
`,Nl=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,mr=({title:r,count:n,limit:s,onBack:c,rightContent:g})=>e.jsxs(ql,{style:{justifyContent:"center",position:"relative"},children:[e.jsx(Pl,{style:{position:"absolute",left:0},children:c?e.jsx(Fl,{onClick:c,children:e.jsx(qe,{size:20})}):e.jsx("div",{style:{width:"40px"}})}),e.jsxs(Nl,{children:[e.jsx(Ol,{children:r}),n!==void 0&&s!==void 0&&e.jsxs(El,{children:["(",n,"/",s,")"]})]}),e.jsx(Hl,{children:g})]}),Wl=t.div`
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
`;t.button`
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
`;const Gl=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`,Ql=t.div`
  position: relative;
  z-index: ${r=>r.$raised?12:1};
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
`,Yl=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`,Jl=t.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`,Uo=t.p`
  font-size: 14px;
  color: var(--text-muted-color);
  margin: 0;
  line-height: 1.4;
`,Ko=t.div`
  font-size: 13px;
  color: var(--text-muted-color);
`,Xl=t.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`,Vl=t.div`
  position: relative;
  flex-shrink: 0;
`,Ul=t.button`
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
`,Kl=t.div`
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
`,at=t.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${r=>r.$danger?"rgba(239, 68, 68, 0.08)":"transparent"};
  color: ${r=>r.$danger?"#ef4444":"var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${r=>r.$danger?"rgba(239, 68, 68, 0.12)":"var(--tertiary-color)"};
  }
`,ha=({initialTestId:r,onBack:n})=>{const{tests:s,myTests:c,myTestsPage:g,myTestsHasMore:S,fetchMyTests:i,deleteTest:C}=Me(),E=za(),T=Je(X=>X.user),[R,$]=a.useState(!1),[B,D]=a.useState(!1),[m,M]=a.useState(null),[h,F]=a.useState(null),[H,Z]=a.useState(null),[x,k]=a.useState(null),[v,f]=a.useState(!1),[z,G]=a.useState(null),[Y,ae]=a.useState("persist"),[ge,d]=a.useState(""),[w,j]=a.useState(!0),[p,I]=a.useState(0),[ie,_]=a.useState(!1),[te,xe]=a.useState([]),[N,V]=a.useState(!1),[de,le]=a.useState(null),[pe,me]=a.useState(null),[ke,ze]=a.useState(null),Se=Ze.useRef(!1);a.useEffect(()=>{if(!Se.current){if(c.length>0){Se.current=!0;return}i(1).finally(()=>{Se.current=!0})}},[i,c.length]),a.useEffect(()=>{if(!ke)return;const X=()=>ze(null);return document.addEventListener("click",X),()=>{document.removeEventListener("click",X)}},[ke]),a.useEffect(()=>{if(r&&!m){const ce=[...s,...c].find(U=>U._id===r||U.urlSlug===r);if(ce)me(null),M(ce);else{if(r=="0")return;Ja(r).then(U=>{U&&(me(null),M(U))}).catch(U=>{Za(r).then(re=>{var be;re!=null&&re.test&&(M(re.test),me(((be=re==null?void 0:re.shareLink)==null?void 0:be.shortCode)||r))}).catch(re=>{console.error("Failed to fetch test by ID:",U||re),J.error("Test topilmadi yoki unga ruxsat yo'q.")})})}}},[r,s,c,m]),a.useEffect(()=>{if(!(z!=null&&z._id)){xe([]);return}V(!0),es(z._id).then(X=>xe(Array.isArray(X)?X:[])).catch(()=>xe([])).finally(()=>V(!1))},[z]);const ye=async()=>{var X,ce;if(z){_(!0);try{const U=await rs(z._id,{persistResults:Y!=="ephemeral",groupName:Y==="persist"?ge.trim():"",showResults:w,timeLimit:Number(p)||0}),re=`${gr}/arena/quiz-link/${U.shortCode}`;await navigator.clipboard.writeText(re),xe(be=>[U,...be]),J.success("Qisqa test havolasi nusxalandi!"),d(""),ae("persist"),j(!0),I(0)}catch(U){J.error(((ce=(X=U==null?void 0:U.response)==null?void 0:X.data)==null?void 0:ce.message)||"Test havolasini yaratishda xatolik yuz berdi.")}finally{_(!1)}}},we=async X=>{const ce=`${gr}/arena/quiz-link/${X}`;await navigator.clipboard.writeText(ce),J.success("Test havolasi nusxalandi!")},W=async X=>{var ce,U;if(z!=null&&z._id){le(X);try{await ts(z._id,X),xe(re=>re.filter(be=>be._id!==X)),J.success("Havola o'chirildi.")}catch(re){J.error(((U=(ce=re==null?void 0:re.response)==null?void 0:ce.data)==null?void 0:U.message)||"Havolani o'chirishda xatolik yuz berdi.")}finally{le(null)}}},q=async()=>{var X,ce;if(!(!x||v)){f(!0);try{await C(x._id),(h==null?void 0:h._id)===x._id&&F(null),(m==null?void 0:m._id)===x._id&&M(null),J.success("Test va unga tegishli natijalar o'chirildi."),k(null)}catch(U){J.error(((ce=(X=U==null?void 0:U.response)==null?void 0:X.data)==null?void 0:ce.message)||"Testni o'chirishda xatolik yuz berdi.")}finally{f(!1)}}};if(m)return e.jsx(ca,{test:m,shareShortCode:pe,onClose:()=>{M(null),me(null),E("/arena")}});const O=(T==null?void 0:T.premiumStatus)==="premium"||(T==null?void 0:T.premiumStatus)==="active",se=O?10:4,ve=O?4:2,fe=c.length,$e=()=>{if(fe>=se){O?J.error("Siz maksimal limitga yetgansiz (10/10)."):D(!0);return}$(!0)};return e.jsxs(Wl,{children:[e.jsx(mr,{title:"Testlar",count:fe,onBack:()=>n&&n(),rightContent:e.jsx(Be,{onClick:$e,children:e.jsx(Oe,{size:18})})}),e.jsx(Wn,{dataLength:c.length,next:()=>i(g+1),hasMore:S,loader:e.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px",gridColumn:"1 / -1"},children:"Yuklanmoqda..."}),endMessage:c.length>0?e.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px",gridColumn:"1 / -1"},children:"Barcha testlar ko'rsatildi."}):null,scrollableTarget:null,style:{overflow:"visible"},children:e.jsxs(Gl,{id:"arenaTestsList",children:[c.map(X=>{var ce,U,re;return e.jsxs(Ql,{$raised:ke===X._id,onClick:()=>{ze(null),me(null),M(X)},children:[e.jsxs(Yl,{children:[e.jsx(Jl,{children:X.title}),e.jsxs(Vl,{onClick:be=>{be.stopPropagation()},children:[e.jsx(Ul,{onClick:()=>ze(be=>be===X._id?null:X._id),children:e.jsx(mo,{size:16})}),ke===X._id&&e.jsxs(Kl,{onClick:be=>be.stopPropagation(),children:[e.jsxs(at,{onClick:()=>{F(X),ze(null)},children:[e.jsx(po,{size:14}),"Natijalar"]}),e.jsxs(at,{onClick:()=>{G(X),ae("persist"),d(""),j(!0),I(0),ze(null)},children:[e.jsx(hr,{size:14}),"Havola yaratish"]}),e.jsxs(at,{onClick:()=>{Z(X),ze(null)},children:[e.jsx(fo,{size:14}),"Tahrirlash"]}),e.jsxs(at,{$danger:!0,onClick:()=>{k(X),ze(null)},children:[e.jsx(er,{size:14}),"O'chirish"]})]})]})]}),e.jsx(Uo,{children:X.description||"Tavsif yo'q"}),e.jsxs(Ko,{children:["Savollar soni: ",((ce=X.questions)==null?void 0:ce.length)||0]}),e.jsxs(Ko,{children:["Tuzuvchi: ",((U=X.createdBy)==null?void 0:U.nickname)||((re=X.createdBy)==null?void 0:re.username)]}),e.jsxs(Xl,{children:[e.jsx(bo,{size:14}),"Boshlash uchun kartani bosing"]})]},X._id)}),c.length===0&&e.jsx(Uo,{style:{gridColumn:"1 / -1"},children:"Hozircha hech qanday test yaratilmagan."})]})}),e.jsx(pa,{isOpen:R||!!H,onClose:()=>{$(!1),Z(null)},initialTest:H}),h&&e.jsx(ua,{test:h,onClose:()=>F(null)}),e.jsx(vo,{isOpen:B,onClose:()=>D(!1),onUpgrade:()=>{D(!1),window.location.href="/premium"}}),e.jsx(ko,{isOpen:!!z,onClose:()=>{G(null),d(""),ae("persist"),j(!0),I(0)},title:"Test havolasini yaratish",itemTitle:(z==null?void 0:z.title)||"",limit:ve,currentCount:te.length,mode:Y,onModeChange:ae,groupName:ge,onGroupNameChange:d,showResults:w,onShowResultsChange:j,timeLimit:p,onTimeLimitChange:I,onCreate:ye,isCreating:ie,links:te,loadingLinks:N,onCopyLink:we,onDeleteLink:W,deletingLinkId:de,linkPrefix:"/arena/quiz-link/"}),e.jsx(yo,{isOpen:!!x,onClose:()=>{v||k(null)},title:"Testni o'chirish",description:`${(x==null?void 0:x.title)||"Bu test"} o'chirilsa, unga tegishli barcha natijalar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`,confirmText:v?"O'chirilmoqda...":"O'chirish",cancelText:"Bekor qilish",onConfirm:q,isDanger:!0})]})},Zl=je`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,ec=je`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,Zo=t.div`
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
  animation: ${Zl} 0.18s ease-out;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,rc=t.div`
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
  animation: ${ec} 0.22s ease-out;

  @media (max-width: 768px) {
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`,en=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`,tc=t.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 18px;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;t.button`
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
`;const rn=t.div`
  margin-bottom: 16px;
`,tn=t.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-muted-color);
  font-weight: 500;
  font-size: 0.9rem;
`,on=t.input`
  width: 100%;
  padding: 12px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
`,oc=t.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`,nn=t.button`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  background-color: ${r=>r.active?"var(--primary-color)":"var(--tertiary-color)"};
  color: ${r=>r.active?"white":"var(--text-color)"};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    filter: brightness(1.1);
  }
`,nc=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`,ac=t.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,sc=t.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ic=t.button`
  background: transparent;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`,lc=t.button`
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
`,cc=t.textarea`
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
`,dc=t.p`
  font-size: 0.85rem;
  color: var(--text-muted-color);
  margin-top: 8px;
`,pc=t.div`
  background: #111;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  color: #ddd;
  margin-top: 8px;
  white-space: pre-wrap;
`,xc=t.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    padding: 12px 16px 16px;
  }
`,Nt=t.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${r=>r.primary?"var(--primary-color)":"var(--tertiary-color)"};
  color: ${r=>r.primary?"white":"var(--text-color)"};

  &:hover {
    filter: brightness(1.1);
  }
`,an=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 4px 8px;

  &:focus-within {
    border-color: var(--primary-color);
    box-shadow: none;
  }
`,sn=t.input`
  flex: 1;
  padding: 6px;
  background: transparent;
  border: none;
  color: var(--text-color);
  outline: none;
  font-size: 0.95rem;
  width: 100%;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`,ln=t.button`
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
`,cn=t.img`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  object-fit: cover;
`,uc=t.div`
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
`,hc=t.form`
  display: flex;
  gap: 8px;
`,gc=t.div`
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
`,mc=t.img`
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
`,ga=({onClose:r,initialDeck:n=null})=>{const{createFlashcardDeck:s,updateFlashcardDeck:c}=Me(),g=!!(n!=null&&n._id),[S,i]=a.useState(""),[C,E]=a.useState("manual"),[T,R]=a.useState([{front:"",back:"",frontImage:"",backImage:""}]),[$,B]=a.useState(""),[D,m]=a.useState({isOpen:!1,cardIndex:null,side:null}),[M,h]=a.useState(""),[F,H]=a.useState([]),[Z,x]=a.useState(!1);a.useEffect(()=>{if(g){i((n==null?void 0:n.title)||""),E("manual"),R(((n==null?void 0:n.cards)||[]).length?n.cards.map(d=>({front:d.front||"",back:d.back||"",frontImage:d.frontImage||"",backImage:d.backImage||""})):[{front:"",back:"",frontImage:"",backImage:""}]),B("");return}i(""),E("manual"),R([{front:"",back:"",frontImage:"",backImage:""}]),B("")},[n,g]);const k=async d=>{var w;if(d==null||d.preventDefault(),!!M.trim()){x(!0);try{const j=new URLSearchParams({action:"query",format:"json",origin:"*",generator:"search",gsrsearch:M.trim(),gsrnamespace:"6",gsrlimit:"9",prop:"imageinfo",iiprop:"url",iiurlwidth:"320",iiurlheight:"240"}),p=await fetch(`https://commons.wikimedia.org/w/api.php?${j.toString()}`);if(!p.ok)throw new Error("Image search request failed");const I=await p.json(),_=Object.values(((w=I==null?void 0:I.query)==null?void 0:w.pages)||{}).map(te=>{var xe,N,V,de;return((N=(xe=te==null?void 0:te.imageinfo)==null?void 0:xe[0])==null?void 0:N.thumburl)||((de=(V=te==null?void 0:te.imageinfo)==null?void 0:V[0])==null?void 0:de.url)||""}).filter(Boolean).slice(0,9);H(_),_.length||J.error("Mos rasm topilmadi")}catch(j){console.error("Image search error:",j),J.error("Rasm qidirib bo'lmadi"),H([])}finally{x(!1)}}},v=d=>{Y(D.cardIndex,D.side,d),m({isOpen:!1,cardIndex:null,side:null}),h(""),H([])},f=(d,w)=>{m({isOpen:!0,cardIndex:d,side:w});const j=T[d][w.replace("Image","")];j?h(j):(h(""),H([]))},z=()=>{if(T.length>=30){J.error("Maksimal 30 ta so'z qo'shish mumkin!");return}R([...T,{front:"",back:"",frontImage:"",backImage:""}])},G=d=>{R(T.filter((w,j)=>j!==d))},Y=(d,w,j)=>{const p=[...T];p[d][w]=w==="front"||w==="back"?j.slice(0,Te.flashcardSideChars):j,R(p)},ae=()=>{if(!$.trim())return[];const d=$.split(";").filter(j=>j.trim()),w=[];for(const j of d){const p=j.indexOf(",");if(p>-1){const I=j.substring(0,p).trim(),ie=j.substring(p+1).trim();I&&ie&&w.push({front:I,back:ie})}}return w},ge=async()=>{if(!S.trim()){J.error("Lug'at sarlavhasini kiriting");return}let d=[];if(C==="manual"?d=T.filter(j=>j.front.trim()!==""&&j.back.trim()!==""):d=ae(),d.length===0){J.error("Kamida bitta to'g'ri karta kiriting");return}if(d.length>30){J.error("Maksimal 30 ta so'z qo'shish mumkin!");return}const w={title:S.trim(),cards:d};try{g?await c(n._id,w):await s(w),J.success(g?"Lug'at yangilandi":"Lug'at muvaffaqiyatli yaratildi"),r()}catch{J.error("Xatolik yuz berdi")}};return e.jsxs(Zo,{onClick:r,children:[e.jsxs(rc,{onClick:d=>d.stopPropagation(),children:[e.jsxs(en,{children:[e.jsx("h2",{children:g?"Lug'atni Tahrirlash":"Yangi Lug'at (Flashcards)"}),e.jsx(Be,{onClick:r,children:e.jsx(Ie,{size:18})})]}),e.jsxs(tc,{children:[e.jsxs(rn,{children:[e.jsx(tn,{children:"To'plam nomi"}),e.jsx(on,{placeholder:"Masalan: Ingliz tili - 1-dars",value:S,onChange:d=>i(d.target.value.slice(0,Te.flashcardTitleChars)),maxLength:Te.flashcardTitleChars})]}),e.jsxs(oc,{children:[e.jsx(nn,{active:C==="manual",onClick:()=>E("manual"),children:"Qo'lda kiritish"}),e.jsx(nn,{active:C==="template",onClick:()=>E("template"),children:"Andaza (Shablon)"})]}),C==="manual"?e.jsxs(e.Fragment,{children:[e.jsx(nc,{children:T.map((d,w)=>e.jsxs(ac,{children:[e.jsxs(sc,{children:[e.jsxs(an,{children:[d.frontImage&&e.jsx(cn,{src:d.frontImage,alt:"f"}),e.jsx(sn,{placeholder:`So'z (front) ${w+1}`,value:d.front,onChange:j=>Y(w,"front",j.target.value)}),e.jsx(ln,{onClick:()=>f(w,"frontImage"),title:"Rasm qidirish",children:e.jsx(zo,{size:16})})]}),e.jsxs(an,{children:[d.backImage&&e.jsx(cn,{src:d.backImage,alt:"b"}),e.jsx(sn,{placeholder:`Ma'nosi (back) ${w+1}`,value:d.back,onChange:j=>Y(w,"back",j.target.value)}),e.jsx(ln,{onClick:()=>f(w,"backImage"),title:"Rasm qidirish",children:e.jsx(zo,{size:16})})]})]}),T.length>1&&e.jsx(ic,{onClick:()=>G(w),children:e.jsx(er,{size:20})})]},w))}),e.jsxs(lc,{onClick:z,disabled:T.length>=30,children:[e.jsx(Oe,{size:18})," ",T.length>=30?"Limitga yetildi (30/30)":"Yangi so'z qo'shish"]})]}):e.jsxs(rn,{children:[e.jsx(tn,{children:"Shablon matni"}),e.jsx(cc,{placeholder:"Apple,Olma;Book,Kitob;",value:$,onChange:d=>B(d.target.value)}),e.jsxs(dc,{children:["So'z va uning ma'nosini vergul (",e.jsx("b",{children:","}),") bilan ajrating. Har bir so'z juftligini nuqtali-vergul (",e.jsx("b",{children:";"}),") bilan ajrating."]}),e.jsxs(pc,{children:["Apple,Olma;",e.jsx("br",{}),"Book,Kitob;",e.jsx("br",{}),"Car,Mashina;"]})]})]}),e.jsxs(xc,{children:[e.jsx(Nt,{onClick:r,children:"Bekor qilish"}),e.jsx(Nt,{primary:!0,onClick:ge,children:g?"O'zgarishlarni saqlash":"Saqlash"})]})]}),D.isOpen&&e.jsx(Zo,{onClick:()=>m({isOpen:!1,cardIndex:null,side:null}),style:{zIndex:1100},children:e.jsxs(uc,{onClick:d=>d.stopPropagation(),children:[e.jsxs(en,{style:{marginBottom:8},children:[e.jsx("h2",{children:"Rasm Qidirish"}),e.jsx(Be,{onClick:()=>m({isOpen:!1,cardIndex:null,side:null}),children:e.jsx(Ie,{size:28})})]}),e.jsxs(hc,{onSubmit:k,children:[e.jsx(on,{placeholder:"Rasm qidirish uchun so'z yozing...",value:M,onChange:d=>h(d.target.value),autoFocus:!0}),e.jsx(Nt,{primary:!0,type:"submit",disabled:Z||!M.trim(),children:Z?e.jsx(Xn,{size:18,className:"spin"}):e.jsx(Jn,{size:18})})]}),e.jsxs(gc,{children:[F.length===0&&!Z&&e.jsx("div",{style:{gridColumn:"span 3",textAlign:"center",padding:"40px 0",color:"var(--text-muted-color)"},children:"Qidirish tugmasini bosing"}),F.map((d,w)=>e.jsx(mc,{src:d,alt:"result",onClick:()=>v(d)},w))]})]})})]})},fc=je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(16px, -18px, 0) scale(1.03); }
  50% { transform: translate3d(-10px, -34px, 0) scale(0.98); }
  75% { transform: translate3d(20px, -8px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`,bc=je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  20% { transform: translate3d(-20px, -16px, 0) scale(0.98); }
  45% { transform: translate3d(10px, -30px, 0) scale(1.04); }
  75% { transform: translate3d(-14px, -10px, 0) scale(1.01); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`,vc=je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  30% { transform: translate3d(12px, -26px, 0) scale(1.02); }
  55% { transform: translate3d(-16px, -18px, 0) scale(0.99); }
  85% { transform: translate3d(6px, -4px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`,yc=je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(-18px, -28px, 0) scale(1.04); }
  60% { transform: translate3d(14px, -12px, 0) scale(0.99); }
  85% { transform: translate3d(-10px, -2px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`,jc=je`
  from {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  to {
    transform: translate(var(--target-x), var(--target-y)) scale(1.5);
    opacity: 0.8;
  }
`,kc=je`
  0%, 100% { transform: translate(0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
  20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
`,wc=je`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`,zc=je`
  0% { transform: scale(0.1); opacity: 1; }
  70% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
`,Sc=je`
  from { transform: translateY(0); }
  to { transform: translateY(-1000px); }
`,dn=t.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${r=>r.$shaking?kc:"none"} 0.4s
    cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`,pn=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,xn=t.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: var(--text-color);
  }
`,un=t.h2`
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 800;
  color: var(--text-color);
  margin: 0;
`,hn=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`,sr=t.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`,ir=t.span`
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted-color);
  font-weight: 700;
  letter-spacing: 0.05em;
`,lr=t.span`
  font-size: 20px;
  font-weight: 900;
  color: var(--primary-color);
`,$c=t.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  min-height: 500px;
  background: #050a14;
  border-radius: 24px;
  border: 2px solid color-mix(in srgb, var(--primary-color) 40%, #1a1f2e);
  overflow: hidden;
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.5),
    inset 0 0 100px rgba(0, 0, 0, 0.8);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(white, rgba(255, 255, 255, 0.2) 2px, transparent 40px),
      radial-gradient(white, rgba(255, 255, 255, 0.1) 1px, transparent 30px);
    background-size:
      550px 550px,
      350px 350px;
    background-position:
      0 0,
      40px 60px;
    opacity: 0.1;
    animation: ${Sc} 100s linear infinite;
  }
`,Cc=t.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center bottom,
    color-mix(in srgb, var(--primary-color) 15%, transparent),
    transparent 70%
  );
  pointer-events: none;
  animation: ${wc} 4s ease-in-out infinite;
`,Tc=t.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 10;
  background: linear-gradient(180deg, rgba(5, 10, 20, 0.95), transparent);
  text-align: center;
`,Bc=t.h3`
  margin: 0;
  font-size: clamp(24px, 5vw, 42px);
  color: #fff;
  font-weight: 900;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
`,Ic=t.div`
  position: absolute;
  inset: 0;
`,Wt=[{top:"25%",left:"15%"},{top:"20%",right:"15%"},{top:"50%",left:"12%"},{top:"45%",right:"12%"}],Lc=t.button`
  position: absolute;
  top: ${r=>r.$top};
  left: ${r=>r.$left||"auto"};
  right: ${r=>r.$right||"auto"};
  min-width: 140px;
  max-width: 240px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 2px solid
    ${r=>r.$isWrong?"#ef4444":"rgba(255,255,255,0.1)"};
  border-radius: 999px;
  color: #f8fafc;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  box-shadow:
    ${r=>r.$isWrong?"0 0 20px rgba(239, 68, 68, 0.4)":"0 10px 25px rgba(0,0,0,0.3)"},
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;

  opacity: ${r=>r.$hidden?0:1};
  transform: ${r=>r.$hidden?"scale(0.8)":"scale(1)"};
  pointer-events: ${r=>r.$hidden?"none":"auto"};

  animation: ${r=>{const n=r.$index%4;return[fc,bc,vc,yc][n]}}
    ${r=>6+r.$speedBoost}s ease-in-out infinite;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-4px) scale(1.05);
    background: linear-gradient(135deg, #2a3852, #1a2a44);
    box-shadow:
      0 15px 30px rgba(0, 0, 0, 0.4),
      0 0 15px color-mix(in srgb, var(--primary-color) 30%, transparent);
  }
`,Mc=t.div`
  position: absolute;
  left: ${r=>r.$x}px;
  top: ${r=>r.$y}px;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    #fbbf24 0%,
    #ef4444 60%,
    transparent 100%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 8;
  animation: ${zc} 0.5s ease-out forwards;
`,Rc=t.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  z-index: 10;
`,Ac=t.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 60px;
  background: linear-gradient(to right, #1e293b, #334155, #1e293b);
  border-radius: 50% 50% 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
`,_c=t.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 24px;
  height: 80px;
  background: linear-gradient(to right, #475569, #94a3b8, #475569);
  border-radius: 12px 12px 4px 4px;
  transform-origin: center 70px;
  transform: translateX(-50%) rotate(${r=>r.$angle}deg);
  transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -4px;
    right: -4px;
    height: 12px;
    background: #0f172a;
    border-radius: 4px;
  }
`,Dc=t.div`
  position: absolute;
  left: 50%;
  bottom: 60px;
  width: 12px;
  height: 24px;
  background: radial-gradient(
    circle at center,
    #fff 0%,
    #34d399 70%,
    #10b981 100%
  );
  border-radius: 50%;
  box-shadow:
    0 0 20px #10b981,
    0 0 40px rgba(16, 185, 129, 0.4);
  z-index: 6;
  --target-x: ${r=>r.$tx}px;
  --target-y: ${r=>r.$ty}px;
  animation: ${jc} 0.25s ease-out forwards;
`,qc=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Gt=t.button`
  padding: 14px 20px;
  background: ${r=>r.$primary?"var(--primary-color)":"var(--tertiary-color)"};
  color: ${r=>r.$primary?"white":"var(--text-color)"};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Pc=t.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
`,Oc=t.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  &:last-child {
    border: none;
    padding: 0;
  }
`,Ec=t.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${r=>r.$correct?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.1)"};
  color: ${r=>r.$correct?"#22c55e":"#ef4444"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`,Fc=({deck:r,queue:n,promptSide:s,onBack:c,onFinish:g})=>{const[S,i]=a.useState(n),[C,E]=a.useState(0),[T,R]=a.useState([]),[$,B]=a.useState(0),[D,m]=a.useState(!1),[M,h]=a.useState(0),[F,H]=a.useState(null),[Z,x]=a.useState(null),[k,v]=a.useState(null),[f,z]=a.useState(null),[G,Y]=a.useState(!1),[ae,ge]=a.useState(!1),d=a.useRef(null),w=S[C];S.length-C;const j=T.filter(N=>N.isCorrect).length,p=()=>{if(!w||!r)return[];const N=s==="front"?w.back:w.front,V=(r.cards||[]).filter(pe=>pe._id!==w._id).map(pe=>s==="front"?pe.back:pe.front).filter(pe=>pe&&pe!==N),de=[...new Set(V)].sort(()=>.5-Math.random());return[N,...de.slice(0,3)].sort(()=>.5-Math.random())},[I,ie]=a.useState([]);a.useEffect(()=>{!D&&w&&ie(p())},[C,D]);const _=(N,V)=>{if(G||D)return;const de=d.current.getBoundingClientRect(),le=V.currentTarget.getBoundingClientRect(),pe=le.left-de.left+le.width/2,me=le.top-de.top+le.height/2,ke=de.width/2,ze=de.height-60,Se=Math.atan2(pe-ke,ze-me)*(180/Math.PI);h(Se);const ye=pe-ke,we=me-ze;Y(!0),H({tx:ye,ty:we}),setTimeout(()=>{const q=s==="front"?w.back:w.front,O=N===q;H(null),O?(x({x:pe,y:me}),z(N),B(fe=>fe+1)):(v(N),B(0),ge(!0),setTimeout(()=>ge(!1),400));const se={card:w,selectedOption:N,isCorrect:O},ve=[...T,se];setTimeout(()=>{x(null),v(null),z(null),R(ve),C+1>=S.length?m(!0):(E(fe=>fe+1),Y(!1))},600)},250)},te=()=>{i(n),R([]),E(0),m(!1),Y(!1),B(0)},xe=()=>{const N=T.filter(V=>!V.isCorrect).map(V=>V.card);N.length!==0&&(i(N),R([]),E(0),m(!1),Y(!1),B(0))};return D?e.jsxs(dn,{children:[e.jsxs(pn,{children:[e.jsxs(xn,{onClick:c,children:[e.jsx(qe,{size:18})," Orqaga"]}),e.jsx(un,{children:"Natijalar"})]}),e.jsxs(hn,{children:[e.jsxs(sr,{children:[e.jsx(ir,{children:"Jami"}),e.jsx(lr,{children:S.length})]}),e.jsxs(sr,{children:[e.jsx(ir,{children:"To'g'ri"}),e.jsx(lr,{children:j})]}),e.jsxs(sr,{children:[e.jsx(ir,{children:"Foiz"}),e.jsxs(lr,{children:[Math.round(j/S.length*100),"%"]})]})]}),e.jsx(Pc,{children:T.map((N,V)=>e.jsxs(Oc,{children:[e.jsx(Ec,{$correct:N.isCorrect,children:N.isCorrect?"✓":"✗"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{color:"var(--text-color)",fontWeight:600},children:N.card.front}),e.jsxs("div",{style:{color:"var(--text-muted-color)",fontSize:13},children:["To'g'ri: ",N.card.back]})]}),!N.isCorrect&&e.jsx("div",{style:{color:"#ef4444",fontSize:12,fontWeight:700},children:N.selectedOption})]},V))}),e.jsxs(qc,{children:[e.jsx(Gt,{onClick:xe,disabled:j===S.length,children:"Topilmaganlarni ishlash"}),e.jsx(Gt,{onClick:te,$primary:!0,children:"Qayta urinish"}),e.jsx(Gt,{onClick:c,children:"Tugallash"})]})]}):e.jsxs(dn,{$shaking:ae,children:[e.jsxs(pn,{children:[e.jsxs(xn,{onClick:c,children:[e.jsx(qe,{size:18})," Chiqish"]}),e.jsx(un,{children:r.title})]}),e.jsxs(hn,{children:[e.jsxs(sr,{children:[e.jsx(ir,{children:"Savol"}),e.jsxs(lr,{children:[C+1,"/",S.length]})]}),e.jsxs(sr,{children:[e.jsx(ir,{children:"Topildi"}),e.jsx(lr,{children:j})]}),e.jsxs(sr,{children:[e.jsx(ir,{children:"Streak"}),e.jsx(lr,{children:$})]})]}),e.jsxs($c,{ref:d,children:[e.jsx(Cc,{}),e.jsx(Tc,{children:e.jsx(Bc,{children:s==="front"?w.front:w.back})}),e.jsxs(Ic,{children:[I.map((N,V)=>e.jsx(Lc,{type:"button",$index:V,$top:Wt[V].top,$left:Wt[V].left,$right:Wt[V].right,$hidden:f===N,$isWrong:k===N,$speedBoost:Math.max(0,4-Math.floor($/3)),onClick:de=>_(N,de),children:N},`${C}-${V}`)),F&&e.jsx(Dc,{$tx:F.tx,$ty:F.ty}),Z&&e.jsx(Mc,{$x:Z.x,$y:Z.y})]}),e.jsxs(Rc,{children:[e.jsx(_c,{$angle:M}),e.jsx(Ac,{})]})]}),e.jsx("div",{style:{textAlign:"center",color:"var(--text-muted-color)",fontSize:13},children:"To'g'ri variantni tanlab o'q uzing!"})]})},gn="jamm-flashcard-prompt-side-v1",Tr=t.div`
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
`,Hc=je`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,Nc=je`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,Qt=t.div`
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
  animation: ${Hc} 0.18s ease-out;
`,Yt=t.div`
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
  animation: ${Nc} 0.22s ease-out;
`,Jt=t.div`
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`,Wc=t.div`
  display: grid;
  gap: 10px;
`,Gc=t.label`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`,Qc=t.select`
  width: 100%;
  min-height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;t.button`
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
`;const Yc=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`,Jc=t.div`
  position: relative;
  z-index: ${r=>r.$raised?12:1};
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
`,Xc=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`,Vc=t.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`;t.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;t.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;const Uc=t.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`,Kc=t.div`
  position: relative;
  flex-shrink: 0;
`,Zc=t.button`
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
`,ed=t.div`
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
`,cr=t.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${r=>r.$danger?"rgba(239, 68, 68, 0.08)":"transparent"};
  color: ${r=>r.$danger?"#ef4444":"var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${r=>r.$danger?"rgba(239, 68, 68, 0.12)":"var(--tertiary-color)"};
  }
`,rd=t.div`
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
`,Xt=t.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,Ne=t.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`,We=t.span`
  color: var(--text-muted-color);
  min-width: 60px;
  font-weight: 500;
`,Ge=t.span`
  color: var(--text-color);
  word-break: break-word;
`,Vt=t.div`
  font-size: 14px;
  color: var(--text-muted-color);
`,dr=t.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`,Ut=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`,Qe=t.button`
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
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  opacity: ${r=>r.disabled?.5:1};
`,st=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  gap: 24px;
  box-sizing: border-box;
`,td=t.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,it=t.button`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &:hover {
    border-color: var(--text-muted-color);
    background: var(--tertiary-color);
  }
`,lt=t.span`
  font-size: 16px;
  font-weight: 700;
`,ct=t.span`
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
`,Kt=t.div`
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
`,Zt=t.button`
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
`,od=t.button`
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
`,nd=t.div`
  display: flex;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,dt=t.button`
  flex: 1;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid
    ${r=>r.type==="fail"?"rgba(239, 68, 68, 0.35)":r.type==="hard"?"rgba(249, 115, 22, 0.35)":r.type==="good"?"rgba(59, 130, 246, 0.35)":r.type==="easy"?"rgba(34, 197, 94, 0.35)":"var(--border-color)"};
  background:
    ${r=>r.type==="fail"?"rgba(239, 68, 68, 0.12)":r.type==="hard"?"rgba(249, 115, 22, 0.12)":r.type==="good"?"rgba(59, 130, 246, 0.12)":r.type==="easy"?"rgba(34, 197, 94, 0.12)":"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    filter 0.16s ease,
    background 0.16s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
`,ad=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`,eo=t.button`
  min-width: 52px;
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: ${r=>r.$variant==="fail"?"rgba(239, 68, 68, 0.12)":r.$variant==="success"?"rgba(34, 197, 94, 0.12)":"var(--secondary-color)"};
  color: ${r=>r.$variant==="fail"?"#ef4444":r.$variant==="success"?"#22c55e":"var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`,mn=t.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
`,fn=t.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,sd=t.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,id=t.button`
  min-height: 54px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: var(--tertiary-color);
    border-color: var(--text-muted-color);
  }
`;je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(16px, -18px, 0) scale(1.03); }
  50% { transform: translate3d(-10px, -34px, 0) scale(0.98); }
  75% { transform: translate3d(20px, -8px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  20% { transform: translate3d(-20px, -16px, 0) scale(0.98); }
  45% { transform: translate3d(10px, -30px, 0) scale(1.04); }
  75% { transform: translate3d(-14px, -10px, 0) scale(1.01); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  30% { transform: translate3d(12px, -26px, 0) scale(1.02); }
  55% { transform: translate3d(-16px, -18px, 0) scale(0.99); }
  85% { transform: translate3d(6px, -4px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;je`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(-18px, -28px, 0) scale(1.04); }
  60% { transform: translate3d(14px, -12px, 0) scale(0.99); }
  85% { transform: translate3d(-10px, -2px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;const ma=({initialDeckId:r,onBack:n})=>{var Er,Fr,Hr,yr,Nr,Wr,jr,kr;const{flashcardDecks:s,flashcardsPage:c,flashcardsHasMore:g,fetchFlashcards:S,reviewFlashcard:i,fetchFlashcardDeck:C,joinFlashcardDeck:E,leaveFlashcardDeck:T,deleteFlashcardDeck:R}=Me(),$=Je(o=>o.user),[B,D]=a.useState(null),[m,M]=a.useState(null),[h,F]=a.useState(!1),[H,Z]=a.useState([]),[x,k]=a.useState(0),[v,f]=a.useState(!1),[z,G]=a.useState(null),[Y,ae]=a.useState(null),[ge,d]=a.useState(!1),[w,j]=a.useState(null),[p,I]=a.useState(null),[ie,_]=a.useState(!1),[te,xe]=a.useState(null),[N,V]=a.useState(null),[de,le]=a.useState(null),[pe,me]=a.useState([]),[ke,ze]=a.useState(0),[Se,ye]=a.useState(!1),[we,W]=a.useState([]),[q,O]=a.useState(!1),[se,ve]=a.useState(null),[fe,$e]=a.useState([]),[X,ce]=a.useState(0),[U,re]=a.useState([]),[be,Re]=a.useState(!1),[Ae,L]=a.useState(null),[A,oe]=a.useState([]),[ue,u]=a.useState(()=>typeof window>"u"?"front":window.localStorage.getItem(gn)==="back"?"back":"front");a.useRef(null);const b=($==null?void 0:$.premiumStatus)==="premium",P=b?10:4,he=s.filter(o=>{var l;return(((l=o.createdBy)==null?void 0:l._id)||o.createdBy)===(($==null?void 0:$._id)||($==null?void 0:$.id))}).length,Rr=()=>{if(he>=P){b?J.error("Siz maksimal limitga yetgansiz (10/10)."):d(!0);return}F(!0)},rr=Ze.useRef(!1);a.useEffect(()=>{if(!rr.current){if(s.length>0){rr.current=!0;return}S(1).finally(()=>{rr.current=!0})}},[S,s.length]);const Ar=()=>{g&&S(c+1)};a.useEffect(()=>{(async()=>{if(r&&!B){const l=await C(r);l&&M(l)}})()},[r]),a.useEffect(()=>{if(!te)return;const o=()=>xe(null);return document.addEventListener("click",o),()=>{document.removeEventListener("click",o)}},[te]),a.useEffect(()=>{typeof window>"u"||window.localStorage.setItem(gn,ue)},[ue]);const Fe=o=>ue==="front"?o==null?void 0:o.front:o==null?void 0:o.back,He=o=>ue==="front"?o==null?void 0:o.frontImage:o==null?void 0:o.backImage,_e=o=>ue==="front"?o==null?void 0:o.back:o==null?void 0:o.front,Xe=o=>ue==="front"?o==null?void 0:o.backImage:o==null?void 0:o.frontImage,tr=async(o,l=!1)=>{const y=await C(o._id);if(!y)return;const K=new Date,ee=l?y.cards:y.cards.filter(Ee=>new Date(Ee.nextReviewDate)<=K);if(ee.length===0){J("Hozircha yodlash kerak bo'lgan so'zlar yo'q! Kutib turing.",{icon:"ℹ️"});return}M(null),D(y),Z(ee),k(0),f(!1)},Le=async o=>{const l=await C(o._id);l&&V(l)},Ve=(o,l)=>{M(null),V(null),D(null),le(o),me(l),ze(0),ye(!1),W([]),O(!1)},fr=(o,l)=>{const y=(o.cards||[]).filter(Pe=>Pe._id!==l._id&&_e(Pe)!==_e(l)).map(Pe=>_e(Pe)).filter(Boolean),ee=[...new Set(y)].sort(()=>Math.random()-.5);return[_e(l),...ee.slice(0,3)].filter(Boolean).sort(()=>Math.random()-.5)},br=(o,l)=>{M(null),V(null),D(null),le(null),ve(o),$e(l),ce(0),re([]),Re(!1)},It=(o,l)=>{M(null),V(null),D(null),le(null),ve(null),L(o),oe(l)},_r=o=>{const l=(N==null?void 0:N._id)===o._id?N:(m==null?void 0:m._id)===o._id?m:o;br(l,[...l.cards||[]])},De=o=>{const l=(N==null?void 0:N._id)===o._id?N:(m==null?void 0:m._id)===o._id?m:o;It(l,[...l.cards||[]])},Lt=o=>{const l=fe[X];if(!l)return;const y=o===_e(l),K=[...U,{card:l,selectedOption:o,isCorrect:y}];if(re(K),X+1>=fe.length){Re(!0);return}ce(ee=>ee+1)},Mt=()=>{if(!se)return;const o=U.filter(l=>!l.isCorrect).map(l=>l.card);if(o.length===0){J("Hamma javob to'g'ri topildi.",{icon:"👏"});return}br(se,o)},Dr=()=>{se&&br(se,[...se.cards||[]])},qr=o=>{const l=(N==null?void 0:N._id)===o._id?N:(m==null?void 0:m._id)===o._id?m:o;Ve(l,[...l.cards||[]])},Pr=o=>{const l=pe[ke];if(!l)return;const y=[...we,{card:l,known:o}];if(W(y),ye(!1),ke+1>=pe.length){O(!0);return}ze(K=>K+1)},Rt=()=>{if(ke===0||we.length===0)return;const o=[...we];o.pop(),W(o),ze(l=>Math.max(l-1,0)),ye(!1),O(!1)},At=()=>{if(!de)return;const o=we.filter(l=>!l.known).map(l=>l.card);if(o.length===0){J("Hamma kartani topdingiz.",{icon:"👏"});return}Ve(de,o)},_t=()=>{de&&Ve(de,[...de.cards||[]])},Dt=o=>{if(!o){J.error("Lug'at havolasi hali tayyor emas.");return}const l=`${gr}/arena/flashcards/${o}`;navigator.clipboard.writeText(l),J.success("Lug'at havolasi nusxalandi!")},vr=async()=>{var o,l;if(!(!p||ie)){_(!0);try{await R(p._id),(m==null?void 0:m._id)===p._id&&M(null),(B==null?void 0:B._id)===p._id&&D(null),(z==null?void 0:z._id)===p._id&&G(null),J.success("Lug'at va unga tegishli progresslar o'chirildi."),I(null)}catch(y){J.error(((l=(o=y==null?void 0:y.response)==null?void 0:o.data)==null?void 0:l.message)||"Lug'atni o'chirishda xatolik yuz berdi.")}finally{_(!1)}}},qt=async o=>{if((await E(o)).success&&(ae(null),S(),m&&m._id===o)){const y=await C(o);M(y)}},Or=async o=>{window.confirm("Haqiqatdan ham ushbu lug'atdan chiqmoqchimisiz? Progressingiz o'chib ketadi.")&&(await T(o)).success&&(S(),m&&m._id===o&&M(null))},or=async o=>{const l=H[x];if(!l)return;const y=l._id,K=B._id;i(K,y,o).catch(ee=>console.error(ee)),o<3?(Z(ee=>[...ee,l]),k(ee=>ee+1),f(!1)):x+1<H.length?(k(ee=>ee+1),f(!1)):(J.success("Barakalla! Ushbu to'plamni yodlashni tugatdingiz.",{duration:4e3}),D(null),S())};if(B){const o=H[x];return e.jsx(Tr,{children:e.jsxs(st,{children:[e.jsxs(Zt,{onClick:()=>D(null),children:[e.jsx(qe,{size:20})," Orqaga"]}),e.jsxs(dr,{children:[B.title," - Qolgan:"," ",H.length-x]}),e.jsx(Kt,{children:v?e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[Xe(o)&&e.jsx("img",{src:Xe(o),alt:"back",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),e.jsx("div",{children:_e(o)||"???"})]}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[He(o)&&e.jsx("img",{src:He(o),alt:"prompt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),e.jsx("div",{children:Fe(o)||"???"})]})}),v?e.jsxs(nd,{children:[e.jsx(dt,{type:"fail",onClick:()=>or(0),children:"Topolmadim"}),e.jsx(dt,{type:"hard",onClick:()=>or(1),children:"Qiyin"}),e.jsx(dt,{type:"good",onClick:()=>or(2),children:"Biroz qiynaldim"}),e.jsx(dt,{type:"easy",onClick:()=>or(3),children:"Oson"})]}):e.jsxs(od,{onClick:()=>f(!0),children:[e.jsx(xo,{size:16,style:{marginRight:8,display:"inline"}}),"Javobni ko'rish"]})]})})}if(de){const o=pe[ke],l=we.filter(ee=>ee.known).length,y=we.filter(ee=>!ee.known).length,K=we.length;return e.jsx(Tr,{children:e.jsxs(st,{children:[e.jsxs(Zt,{onClick:()=>{le(null),me([]),W([]),O(!1)},children:[e.jsx(qe,{size:20})," Orqaga"]}),e.jsxs(dr,{children:[de.title," - Flashcards"]}),e.jsxs(mn,{children:[e.jsx("span",{children:q?`Natija: ${l}/${pe.length}`:`Karta: ${ke+1}/${pe.length}`}),e.jsxs("span",{children:["Topdi: ",l," · Topolmadi: ",y]})]}),e.jsx(Kt,{onClick:()=>ye(ee=>!ee),children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px",width:"100%"},children:[!q&&(Se?Xe(o):He(o))&&e.jsx("img",{src:Se?Xe(o):He(o),alt:Se?"answer":"prompt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",objectFit:"contain"}}),q?e.jsx("div",{style:{width:"100%",display:"flex",flexDirection:"column",gap:"10px"},children:we.map((ee,Ee)=>e.jsxs(Xt,{children:[e.jsxs(Ne,{children:[e.jsxs(We,{children:[Ee+1,"."]}),e.jsx(Ge,{children:Fe(ee.card)})]}),e.jsxs(Ne,{children:[e.jsx(We,{children:"Javob:"}),e.jsx(Ge,{children:_e(ee.card)})]}),e.jsxs(Ne,{children:[e.jsx(We,{children:"Holat:"}),e.jsx(Ge,{style:{color:ee.known?"#22c55e":"#ef4444",fontWeight:700},children:ee.known?"Topdi":"Topolmadi"})]})]},`${ee.card._id||Ee}-${Ee}`))}):e.jsx("div",{children:Se?_e(o)||"???":Fe(o)||"???"})]})}),q?e.jsxs(fn,{children:[e.jsx(Qe,{onClick:At,disabled:y===0,style:{marginTop:0},children:"Topilmaganlarni ishlash"}),e.jsx(Qe,{onClick:_t,style:{marginTop:0,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},children:"To'liq qayta ishlash"}),e.jsx(Qe,{onClick:()=>{le(null),me([]),W([]),O(!1)},style:{marginTop:0,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},children:"Asosiy oynaga qaytish"})]}):e.jsxs(ad,{children:[e.jsx(eo,{onClick:Rt,disabled:ke===0||K===0,title:"Oldingi karta",children:e.jsx(Ia,{size:18})}),e.jsx(eo,{$variant:"fail",onClick:()=>Pr(!1),title:"Topolmadi",children:e.jsx(uo,{size:20})}),e.jsx(eo,{$variant:"success",onClick:()=>Pr(!0),title:"Topdi",children:e.jsx(ho,{size:20})})]})]})})}if(se){const o=fe[X],l=U.filter(y=>y.isCorrect).length;return e.jsx(Tr,{children:e.jsxs(st,{children:[e.jsxs(Zt,{onClick:()=>{ve(null),$e([]),re([]),Re(!1)},children:[e.jsx(qe,{size:20})," Orqaga"]}),e.jsxs(dr,{children:[se.title," - Test"]}),e.jsxs(mn,{children:[e.jsx("span",{children:be?`Natija: ${l}/${fe.length}`:`Savol: ${X+1}/${fe.length}`}),e.jsxs("span",{children:["To'g'ri: ",l]})]}),e.jsx(Kt,{children:be?e.jsx("div",{style:{width:"100%",display:"flex",flexDirection:"column",gap:"10px"},children:U.map((y,K)=>e.jsxs(Xt,{children:[e.jsxs(Ne,{children:[e.jsxs(We,{children:[K+1,"."]}),e.jsx(Ge,{children:Fe(y.card)})]}),e.jsxs(Ne,{children:[e.jsx(We,{children:"To'g'ri:"}),e.jsx(Ge,{children:_e(y.card)})]}),e.jsxs(Ne,{children:[e.jsx(We,{children:"Tanlangan:"}),e.jsx(Ge,{style:{color:y.isCorrect?"#22c55e":"#ef4444",fontWeight:700},children:y.selectedOption||"-"})]})]},`${y.card._id||K}-${K}`))}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"18px",width:"100%"},children:[He(o)&&e.jsx("img",{src:He(o),alt:"prompt",style:{maxWidth:"100%",maxHeight:"180px",borderRadius:"8px",objectFit:"contain"}}),e.jsx("div",{style:{fontSize:"28px",fontWeight:700},children:Fe(o)||"???"})]})}),be?e.jsxs(fn,{children:[e.jsx(Qe,{onClick:Mt,disabled:l===fe.length,style:{marginTop:0},children:"Topilmaganlarni ishlash"}),e.jsx(Qe,{onClick:Dr,style:{marginTop:0,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},children:"To'liq qayta ishlash"}),e.jsx(Qe,{onClick:()=>{ve(null),$e([]),re([]),Re(!1)},style:{marginTop:0,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},children:"Asosiy oynaga qaytish"})]}):e.jsx(sd,{children:fr(se,o).map(y=>e.jsx(id,{onClick:()=>Lt(y),children:y},y))})]})})}return Ae?e.jsx(Tr,{children:e.jsx(st,{style:{maxWidth:"800px"},children:e.jsx(Fc,{deck:Ae,queue:A,promptSide:ue,onBack:()=>{L(null),oe([])},onFinish:()=>{L(null),oe([])}})})}):e.jsxs(Tr,{children:[e.jsx(mr,{title:"Flashcards",count:he,onBack:()=>n&&n(),rightContent:e.jsx(Be,{onClick:Rr,children:e.jsx(Oe,{size:18})})}),e.jsx(Wn,{dataLength:s.length,next:Ar,hasMore:g,loader:e.jsx("h4",{style:{textAlign:"center",color:"var(--text-muted-color)",marginTop:"16px"},children:"Yuklanmoqda..."}),style:{overflow:"visible"},children:e.jsxs(Yc,{children:[s.map(o=>{var K,ee,Ee;const l=(((K=o.createdBy)==null?void 0:K._id)||o.createdBy)===(($==null?void 0:$._id)||($==null?void 0:$.id)),y=((ee=o.createdBy)==null?void 0:ee.nickname)||"Noma'lum";return e.jsxs(Jc,{$raised:te===o._id,onClick:()=>{xe(null),Le(o)},children:[e.jsxs(Xc,{children:[e.jsx(Vc,{children:o.title}),e.jsxs(Kc,{onClick:Pe=>{Pe.stopPropagation()},children:[e.jsx(Zc,{onClick:()=>xe(Pe=>Pe===o._id?null:o._id),children:e.jsx(mo,{size:16})}),te===o._id&&e.jsxs(ed,{onClick:Pe=>Pe.stopPropagation(),children:[e.jsxs(cr,{onClick:()=>{M(o),xe(null)},children:[e.jsx(Vn,{size:14}),"Ko'rish"]}),e.jsxs(cr,{onClick:()=>{Dt(o.urlSlug),xe(null)},children:[e.jsx(hr,{size:14}),"Havola nusxalash"]}),l?e.jsxs(e.Fragment,{children:[e.jsxs(cr,{onClick:()=>{G(o),xe(null)},children:[e.jsx(Tt,{size:14}),"A'zolar"]}),e.jsxs(cr,{onClick:()=>{j(o),xe(null)},children:[e.jsx(fo,{size:14}),"Tahrirlash"]}),e.jsxs(cr,{$danger:!0,onClick:()=>{I(o),xe(null)},children:[e.jsx(er,{size:14}),"O'chirish"]})]}):e.jsxs(cr,{onClick:()=>{Or(o._id),xe(null)},children:[e.jsx(Un,{size:14}),"Lug'atdan chiqish"]})]})]})]}),e.jsxs(Vt,{children:["Jami so'zlar: ",((Ee=o.cards)==null?void 0:Ee.length)||0]}),e.jsx(Vt,{children:l?"Siz yaratgan":`Muallif: ${y}`}),e.jsxs(Uc,{children:[e.jsx(Bt,{size:14}),"Boshlash uchun kartani bosing"]})]},o._id)}),s.length===0&&e.jsx(Vt,{children:"Sizda hozircha lug'atlar yo'q."})]})}),m&&e.jsx(Qt,{onClick:()=>M(null),children:e.jsxs(Yt,{onClick:o=>o.stopPropagation(),children:[e.jsxs(Ut,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[e.jsx(dr,{children:m.title}),e.jsx(Be,{onClick:()=>M(null),children:e.jsx(Ie,{size:20})})]}),e.jsxs(Jt,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("img",{src:((Er=m.createdBy)==null?void 0:Er.avatar)||"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar",style:{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover"}}),e.jsxs("div",{children:[e.jsx("div",{style:{color:"var(--text-color)",fontWeight:"600"},children:((Fr=m.createdBy)==null?void 0:Fr.nickname)||"Noma'lum"}),e.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:"13px"},children:"Lug'at yaratuvchisi"})]}),!(((Hr=m.createdBy)==null?void 0:Hr._id)===(($==null?void 0:$._id)||($==null?void 0:$.id))||(yr=m.members)!=null&&yr.some(o=>{var l;return(((l=o.userId)==null?void 0:l._id)||o.userId)===(($==null?void 0:$._id)||($==null?void 0:$.id))}))&&e.jsx("button",{onClick:()=>qt(m._id),style:{marginLeft:"auto",background:"var(--primary-color)",color:"white",border:"none",padding:"8px",borderRadius:"8px",cursor:"pointer"},title:"Yuklab olish (Qo'shilish)",children:e.jsx(Yn,{size:20})})]}),e.jsx("div",{style:{display:"flex",gap:"12px"},children:(Nr=m.cards)!=null&&Nr.some(o=>new Date(o.nextReviewDate)<=new Date)?e.jsxs(Qe,{style:{flex:1},onClick:()=>Le(m),children:[e.jsx(Bt,{size:18})," O'qishni boshlash"]}):e.jsxs(Qe,{style:{flex:1,background:"var(--secondary-color)",color:"var(--text-color)",border:"1px solid var(--border-color)"},onClick:()=>Le(m),children:[e.jsx(xo,{size:18})," Yana mashiq qilish"]})}),e.jsxs("div",{children:[e.jsxs("div",{style:{color:"var(--text-color)",fontWeight:"600",marginBottom:"8px",fontSize:"15px"},children:["To'plamdagi so'zlar (",((Wr=m.cards)==null?void 0:Wr.length)||0,")"]}),e.jsx(rd,{children:(jr=m.cards)==null?void 0:jr.map((o,l)=>e.jsxs(Xt,{children:[e.jsxs(Ne,{style:{alignItems:"center"},children:[e.jsx(We,{children:"Oldi:"}),e.jsxs(Ge,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.frontImage&&e.jsx("img",{src:o.frontImage,alt:"f",style:{width:30,height:30,borderRadius:4,objectFit:"cover"}}),o.front]})]}),e.jsxs(Ne,{style:{alignItems:"center"},children:[e.jsx(We,{children:"Orqa:"}),e.jsxs(Ge,{style:{display:"flex",alignItems:"center",gap:"8px"},children:[o.backImage&&e.jsx("img",{src:o.backImage,alt:"b",style:{width:30,height:30,borderRadius:4,objectFit:"cover"}}),o.back]})]})]},o._id||l))})]})]})]})}),z&&e.jsx(Qt,{onClick:()=>G(null),children:e.jsxs(Yt,{onClick:o=>o.stopPropagation(),children:[e.jsxs(Ut,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[e.jsx(dr,{children:"A'zolar ro'yxati"}),e.jsx(Be,{onClick:()=>G(null),children:e.jsx(Ie,{size:20})})]}),e.jsx(Jt,{children:((kr=z.members)==null?void 0:kr.length)>0?z.members.map((o,l)=>{var y,K;return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid var(--border-color)"},children:[e.jsx("img",{src:((y=o.userId)==null?void 0:y.avatar)||"https://cdn-icons-png.flaticon.com/512/149/149071.png",alt:"avatar",style:{width:"32px",height:"32px",borderRadius:"50%",objectFit:"cover"}}),e.jsx("span",{style:{color:"var(--text-color)"},children:((K=o.userId)==null?void 0:K.nickname)||"Noma'lum"}),e.jsxs("span",{style:{marginLeft:"auto",fontSize:"12px",color:"var(--text-muted-color)"},children:["Joined: ",new Date(o.joinedAt).toLocaleDateString()]})]},l)}):e.jsx("p",{style:{textAlign:"center",color:"var(--text-muted-color)"},children:"Hozircha hech kim qo'shilmagan."})})]})}),(h||w)&&e.jsx(ga,{onClose:()=>{F(!1),j(null)},initialDeck:w}),N&&e.jsx(Qt,{onClick:()=>V(null),children:e.jsxs(Yt,{onClick:o=>o.stopPropagation(),children:[e.jsxs(Ut,{style:{padding:"16px 20px",borderBottom:"1px solid var(--border-color)"},children:[e.jsx(dr,{children:"Mashq turini tanlang"}),e.jsx(Be,{onClick:()=>V(null),children:e.jsx(Ie,{size:20})})]}),e.jsxs(Jt,{children:[e.jsxs(Wc,{children:[e.jsx(Gc,{htmlFor:"flashcard-prompt-side",children:"Qaysi tomoni so'ralsin?"}),e.jsxs(Qc,{id:"flashcard-prompt-side",value:ue,onChange:o=>u(o.target.value),children:[e.jsx("option",{value:"front",children:"Old tomoni so'ralsin"}),e.jsx("option",{value:"back",children:"Orqa tomoni so'ralsin"})]})]}),e.jsxs(td,{children:[e.jsxs(it,{onClick:()=>{tr(N,!0),V(null)},children:[e.jsx(lt,{children:"Eslab qolish"}),e.jsx(ct,{children:ue==="front"?"Old tomoni ko'rsatiladi, orqa tomon bo'yicha baholaysiz.":"Orqa tomoni ko'rsatiladi, old tomon bo'yicha baholaysiz."})]}),e.jsxs(it,{onClick:()=>qr(N),children:[e.jsx(lt,{children:"Flashcards"}),e.jsx(ct,{children:ue==="front"?"Old tomondan boshlanadi, aylantirib orqa tomonni topasiz.":"Orqa tomondan boshlanadi, aylantirib old tomonni topasiz."})]}),e.jsxs(it,{onClick:()=>_r(N),children:[e.jsx(lt,{children:"Test mashqi"}),e.jsx(ct,{children:ue==="front"?"Old tomon ko'rinadi, variantlarda mos orqa tomonni tanlaysiz.":"Orqa tomon ko'rinadi, variantlarda mos old tomonni tanlaysiz."})]}),e.jsxs(it,{onClick:()=>De(N),children:[e.jsx(lt,{children:"Shooter o'yin"}),e.jsx(ct,{children:ue==="front"?"Old tomoni bo'yicha mos orqa tomonga o'q uzasiz.":"Orqa tomoni bo'yicha mos old tomonga o'q uzasiz."})]})]})]})]})}),e.jsx(vo,{isOpen:ge,onClose:()=>d(!1),onUpgrade:()=>{d(!1),window.location.href="/premium"}}),e.jsx(yo,{isOpen:!!p,onClose:()=>{ie||I(null)},title:"Lug'atni o'chirish",description:`${(p==null?void 0:p.title)||"Bu lug'at"} o'chirilsa, unga tegishli barcha progresslar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`,confirmText:ie?"O'chirilmoqda...":"O'chirish",cancelText:"Bekor qilish",onConfirm:vr,isDanger:!0})]})},ld=t.div`
  margin-top: 40px;
  background: var(--surface-secondary-color, #2f3136);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,cd=t.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--text-color);
  font-weight: 700;
  letter-spacing: -0.02em;
`,dd=t.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,pd=t.div`
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
`,xd=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
`,ud=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,hd=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${r=>r.color||"var(--primary-color)"};
  color: white;
`,gd=t.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;
`,md=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-muted-color);
`,fd=t.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,bd=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: ${r=>r.isWinner?"linear-gradient(90deg, rgba(46, 204, 113, 0.15), transparent)":"transparent"};
  border-left: ${r=>r.isWinner?"4px solid #2ecc71":"4px solid transparent"};
`,vd=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,yd=t.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${r=>r.rank===1?"#f1c40f":r.rank===2?"#bdc3c7":r.rank===3?"#e67e22":"var(--border-color)"};
  color: ${r=>r.rank<=3?"#000":"var(--text-muted-color)"};
`,jd=t.span`
  font-weight: ${r=>r.isWinner?"600":"500"};
  color: ${r=>r.isWinner?"#2ecc71":"var(--text-color)"};
`,kd=t.div`
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: ${r=>r.isWinner?"#2ecc71":"var(--text-color)"};
`,wd=t.div`
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
`,zd=()=>{const{battleHistory:r,fetchBattleHistory:n}=Me(),s=Ze.useRef(!1);a.useEffect(()=>{s.current||(n(),s.current=!0)},[n]);const c=g=>g.mode==="solo"||g.participants.length===1?{label:"Solo",color:"#3498db",icon:e.jsx(Tt,{size:14})}:g.mode==="team"?{label:"Jamoaviy",color:"#e74c3c",icon:e.jsx($t,{size:14})}:{label:"Duel",color:"#9b59b6",icon:e.jsx(Tt,{size:14})};return e.jsxs(ld,{children:[e.jsxs(cd,{children:[e.jsx($t,{size:28,color:"#f1c40f"})," O'ynalgan Bellashuvlar Tarixi"]}),!r||r.length===0?e.jsxs(wd,{children:[e.jsx($t,{size:64}),e.jsx("h3",{children:"Hali g'alabalar yo'q"}),e.jsx("p",{children:"Bellashuvlarda qatnashing va o'z tarixingizni yarating!"})]}):e.jsx(dd,{children:r.map(g=>{var E;const S=[...g.participants].sort((T,R)=>R.score-T.score),i=((E=g.testId)==null?void 0:E.title)||"Noma'lum Test",C=c(g);return e.jsxs(pd,{children:[e.jsxs(xd,{children:[e.jsxs(ud,{children:[e.jsxs(hd,{color:C.color,children:[C.icon," ",C.label]}),e.jsx(gd,{children:i})]}),e.jsxs(md,{children:[e.jsx(Kn,{size:14}),aa(g.createdAt).format("DD MMM, YYYY • HH:mm")]})]}),e.jsx(fd,{children:S.map((T,R)=>{const $=R===0&&T.score>0;return e.jsxs(bd,{isWinner:$,children:[e.jsxs(vd,{children:[e.jsx(yd,{rank:R+1,children:R+1}),e.jsx(jd,{isWinner:$,children:T.nickname})]}),e.jsxs(kd,{isWinner:$,children:[T.score," ",e.jsx("span",{style:{fontSize:"0.8rem",opacity:.7},children:"PT"})]})]},T.userId||R)})})]},g._id)})})]})},Sd=t.div`
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
`,$d=t.div`
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
`,Cd=t.div`
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
`;t.button`
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
`;const Td=t.div`
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
`,Bd=t.div`
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
`,Id=t.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,Ld=t.div`
  font-weight: 700;
  font-size: 16px;
  color: var(--text-color);
`,Md=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  gap: 4px;
`,Rd=t.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-muted-color);
`,bn=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,Ad=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`,_d=t.div`
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
`,Dd=t.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: var(--primary-color);
`,qd=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted-color);
  gap: 12px;
  text-align: center;
`,fa=({isOpen:r,onClose:n})=>{const{fetchBattleHistory:s}=Me(),[c,g]=a.useState([]),[S,i]=a.useState(1),[C,E]=a.useState(!0),[T,R]=a.useState(!1),$=a.useRef(),B=a.useCallback(async(m=!1)=>{if(T||!C&&!m)return;R(!0);const M=m?1:S;try{const h=await s({page:M,limit:15});h&&h.data&&(g(m?h.data:F=>[...F,...h.data]),E(h.page<h.totalPages),i(M+1))}catch(h){console.error("Failed to load history:",h)}finally{R(!1)}},[S,C,T,s]);a.useEffect(()=>{r?B(!0):(g([]),i(1),E(!0))},[r]);const D=a.useCallback(m=>{T||($.current&&$.current.disconnect(),$.current=new IntersectionObserver(M=>{M[0].isIntersecting&&C&&B()}),m&&$.current.observe(m))},[T,C,B]);return r?e.jsx(Sd,{onClick:n,children:e.jsxs($d,{onClick:m=>m.stopPropagation(),children:[e.jsxs(Cd,{children:[e.jsxs("h2",{children:[e.jsx(go,{size:22})," Bellashuvlar Tarixi"]}),e.jsx(Be,{onClick:n,children:e.jsx(Ie,{size:18})})]}),e.jsxs(Td,{children:[c.length>0?c.map((m,M)=>{var h;return e.jsxs(Bd,{ref:M===c.length-1?D:null,children:[e.jsxs(Id,{children:[e.jsx(Ld,{children:((h=m.testId)==null?void 0:h.title)||"O'chirilgan test"}),e.jsxs(Md,{children:[e.jsx(La,{size:12}),aa(m.createdAt).format("DD.MM.YYYY HH:mm")]})]}),e.jsxs(Rd,{children:[e.jsxs(bn,{children:[e.jsx($t,{size:14})," ",m.mode==="solo"?"Yakkalik":"Jamoaviy"]}),e.jsxs(bn,{children:[e.jsx(Tt,{size:14})," ",m.participants.length," ishtirokchi"]})]}),e.jsx(Ad,{children:m.participants.map((F,H)=>e.jsxs(_d,{children:[e.jsx(Ct,{size:12})," ",F.nickname," ",e.jsx("span",{children:F.score})]},H))})]},m._id)}):T?null:e.jsxs(qd,{children:[e.jsx(go,{size:48,opacity:.3}),e.jsx("p",{children:"Hozircha bellashuvlar tarixi mavjud emas."})]}),T&&e.jsx(Dd,{children:e.jsx(Xn,{size:24,className:"animate-spin"})})]})]})}):null},Pd=t.div`
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
`,Od=t.div`
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
`,Ed=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`;t.button`
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
`;const ro=t.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,to=t.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Fd=t.input`
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
`,Hd=t.select`
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
`,Nd=t.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,vn=t.div`
  background: ${r=>r.active?"var(--hover-color)":"var(--tertiary-color)"};
  border: 1px solid
    ${r=>r.active?"var(--primary-color)":"var(--border-color)"};
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
    color: ${r=>r.active?"var(--primary-color)":"var(--text-muted-color)"};
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: ${r=>r.active?"var(--text-color)":"var(--text-muted-color)"};
  }

  &:hover {
    border-color: var(--primary-color);
  }
`,Wd=t.div`
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: var(--text-muted-color);
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    color: var(--primary-color);
  }
`,Gd=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.5;
`,Qd=t.button`
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
`,ba=({isOpen:r,onClose:n})=>{const{t:s}=Mr(),{myTests:c,createBattle:g,fetchMyTests:S}=Me(),[i,C]=a.useState(""),[E,T]=a.useState(""),[R,$]=a.useState("public");if(a.useEffect(()=>{r&&S(1)},[S,r]),!r)return null;const B=()=>{!i||!E.trim()||(g(i,E,"solo",R),n(),T(""),C(""))};return e.jsx(Pd,{onClick:n,children:e.jsxs(Od,{onClick:D=>D.stopPropagation(),children:[e.jsxs(Ed,{children:[e.jsx("h2",{children:s("arenaShared.createBattle.title")}),e.jsx(Be,{onClick:n,children:e.jsx(Ie,{size:20})})]}),e.jsxs(ro,{children:[e.jsx(to,{children:s("arenaShared.createBattle.name")}),e.jsx(Fd,{placeholder:s("arenaShared.createBattle.namePlaceholder"),value:E,onChange:D=>T(D.target.value)})]}),e.jsxs(ro,{children:[e.jsx(to,{children:s("arenaShared.createBattle.testLabel")}),e.jsxs(Hd,{value:i,onChange:D=>C(D.target.value),children:[e.jsx("option",{value:"",children:s("arenaShared.createBattle.testPlaceholder")}),c.map(D=>e.jsx("option",{value:D._id,children:D.title},D._id))]}),c.length===0&&e.jsx(Gd,{children:s("arenaShared.createBattle.emptyTests")})]}),e.jsxs(ro,{children:[e.jsx(to,{children:s("arenaShared.createBattle.visibility")}),e.jsxs(Nd,{children:[e.jsxs(vn,{active:R==="public",onClick:()=>$("public"),children:[e.jsx(Ma,{size:24}),e.jsx("span",{children:s("arenaShared.createBattle.public")})]}),e.jsxs(vn,{active:R==="unlisted",onClick:()=>$("unlisted"),children:[e.jsx(Ra,{size:24}),e.jsx("span",{children:s("arenaShared.createBattle.unlisted")})]})]})]}),e.jsxs(Wd,{children:[e.jsx(Aa,{size:16}),s(R==="public"?"arenaShared.createBattle.publicInfo":"arenaShared.createBattle.unlistedInfo")]}),e.jsxs(Qd,{onClick:B,disabled:!i||!E.trim(),children:[e.jsx(bo,{size:18,fill:"white"})," ",s("arenaShared.createBattle.create")]})]})})},Yd=t.div`
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
`,yn=t.label`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color, #b9bbbe);
`,jn=t.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`,Jd=t.div`
  display: flex;
  gap: 8px;
  width: 100%;
`,kn=t.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`,Br=t.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${r=>r.bgColor||"var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`,oo=t.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,pt=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`,xt=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: var(--text-color);
`,no=t.span`
  background-color: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
`,Xd=t.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`,Vd=t.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,Ud=t.button`
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

  ${r=>r.selected&&`
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  `}
`,va=({initialRoomId:r,onBack:n})=>{const{tests:s,activeBattle:c,joinBattle:g,startBattle:S,submitAnswer:i,nextQuestion:C,endBattle:E,leaveBattle:T,guestName:R,setGuestSession:$,activeBattles:B,fetchActiveBattles:D,socketRef:m,fetchTests:M}=Me();Ze.useEffect(()=>{M()},[M]);const[h,F]=a.useState(""),[H,Z]=a.useState(""),[x,k]=a.useState(!1),[v,f]=a.useState(!1),z=Je(p=>p.user);Ze.useEffect(()=>{r&&r!=="0"&&!c&&g(r)},[r,c,g]),Ze.useEffect(()=>{if(!c){D();const p=setInterval(D,1e4);return()=>clearInterval(p)}},[c,D]);const G=c?s.find(p=>p._id===c.testId):null,Y=c&&z&&String(c.hostId)===String(z._id),ae=()=>{h.trim()&&g(h.trim())},ge=()=>{const p=`${gr}/arena/battle/${c.roomId}`;navigator.clipboard.writeText(p),J.success("Havola nusxalandi!")},d=()=>{if(!z&&!R)return{headerProps:{title:"Ismingizni kiriting",onBack:n},content:e.jsxs(jn,{children:[e.jsx("p",{style:{color:"var(--text-muted-color)",margin:0},children:"Bellashuvda qatnashish uchun ismingizni kiriting."}),e.jsx(kn,{placeholder:"Ismingiz...",value:H,onChange:p=>Z(p.target.value)}),e.jsx(Br,{onClick:()=>H.trim()&&$(H.trim()),children:"Kirish"})]})};if(!c)return{headerProps:{title:"Bellashuvlar",onBack:n,rightContent:e.jsx("div",{style:{display:"flex",gap:"8px"},children:e.jsx("button",{onClick:()=>k(!0),style:{background:"none",border:"none",color:"var(--text-color)",cursor:"pointer",padding:"8px",display:"flex"},children:e.jsx(go,{size:20})})})},content:e.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",width:"100%"},children:[e.jsxs(jn,{children:[e.jsx(yn,{children:"Xona ID si orqali qo'shilish"}),e.jsxs(Jd,{children:[e.jsx(kn,{placeholder:"Masalan: battle_1234_567",value:h,onChange:p=>F(p.target.value)}),e.jsx(Br,{onClick:ae,style:{width:"48px",flexShrink:0},children:e.jsx(Oe,{size:20})})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(yn,{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(_a,{size:16,color:"var(--primary-color)"})," Aktiv Bellashuvlar (",(B==null?void 0:B.length)||0,")"]}),e.jsx(Be,{onClick:()=>f(!0),children:e.jsx(Oe,{size:16})})]}),B&&B.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:B.map(p=>e.jsxs(pt,{children:[e.jsx(xt,{style:{flexDirection:"column",alignItems:"flex-start",gap:"2px"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",fontWeight:"600",fontSize:"14px"},children:[e.jsx(Da,{size:14,color:"var(--text-color)"}),p.roomName||"Noma'lum Bellashuv"]})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsxs("span",{style:{fontSize:"12px",display:"flex",alignItems:"center",color:"var(--text-muted-color)"},children:[e.jsx(Ct,{size:12,style:{marginRight:"4px"}}),e.jsx("span",{children:p.participantsCount})]}),e.jsx(Br,{style:{width:"auto",padding:"6px 12px",fontSize:"13px"},onClick:()=>{console.log("Joining battle:",p.roomId),g(p.roomId)},children:"Kirish"})]})]},p.roomId))}):e.jsxs("div",{style:{padding:"40px",textAlign:"center",border:"1px dashed var(--border-color)",borderRadius:"12px",color:"var(--text-muted-color)",fontSize:"14px"},children:["Hozircha ochiq bellashuvlar yo'q. ",e.jsx("br",{})," O'zingiz yangi xona yarating!"]})]})]})};if(c.status==="waiting")return{headerProps:{title:"Kutish Zali",rightContent:e.jsx("button",{onClick:()=>T(c.roomId),style:{background:"#e74c3c",border:"none",color:"white",cursor:"pointer",padding:"8px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(Un,{size:18})})},content:e.jsxs("div",{style:{maxWidth:"450px",margin:"0 auto",width:"100%"},children:[e.jsxs("div",{style:{background:"#333",padding:"12px",fontSize:"13px",borderRadius:"8px",marginBottom:"20px",border:"1px solid var(--border-color)"},children:[e.jsxs("div",{style:{marginBottom:4},children:[e.jsx(Ct,{size:12}),":"," ",e.jsx("b",{children:(z==null?void 0:z.nickname)||(z==null?void 0:z.username)||R||"Mehmon"})]}),e.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted-color)",display:"flex",alignItems:"center",gap:4},children:[e.jsxs("span",{children:[" Xona ID: ",c.roomId," "]}),e.jsx("button",{onClick:ge,style:{marginLeft:12,background:"none",border:"none",color:"var(--primary-color)",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4},children:e.jsx(qa,{size:16})})]})]}),e.jsx(oo,{children:c.participants.map(p=>e.jsx(pt,{children:e.jsxs(xt,{children:[e.jsx(Ct,{size:12})," ",p.nickname," ",p.userId===c.hostId&&"(Host)"]})},p.userId))}),Y&&e.jsx(Br,{onClick:()=>S(c.roomId),style:{marginTop:24,fontSize:18,padding:16},children:"Musobaqani Boshlash! 🚀"})]})};if(c.status==="playing"){if(!G)return{headerProps:{title:"Yuklanmoqda..."},content:e.jsx("div",{children:"Testni yuklab bo'lmadi..."})};const p=G.questions[c.currentQuestionIndex],I=c.participants.find(ie=>{var _;return ie.socketId===((_=m.current)==null?void 0:_.id)});return p?{headerProps:{title:`Savol ${c.currentQuestionIndex+1} / ${G.questions.length}`,rightContent:e.jsxs(no,{children:["Sizning ballingiz: ",(I==null?void 0:I.score)||0]})},content:e.jsxs(e.Fragment,{children:[e.jsxs(Xd,{children:[e.jsx("h2",{style:{color:"var(--text-color)"},children:p.questionText}),e.jsx(Vd,{children:p.options.map((ie,_)=>e.jsx(Ud,{selected:(I==null?void 0:I.lastAnswerIndex)===_,disabled:I==null?void 0:I.hasAnsweredCurrent,onClick:()=>{i(c.roomId,_)},children:ie},_))})]}),e.jsxs("div",{style:{marginTop:32},children:[e.jsx("h3",{style:{color:"var(--text-color)"},children:"Jonli Natijalar"}),e.jsx(oo,{children:c.participants.map(ie=>e.jsxs(pt,{children:[e.jsxs(xt,{children:[ie.hasAnsweredCurrent?e.jsx(ur,{color:"#2ecc71",size:16}):e.jsx(Kn,{color:"#3498db",size:16}),ie.nickname]}),e.jsxs(no,{children:[ie.score," ball"]})]},ie.userId))})]})]})}:(Y&&E(c.roomId),{headerProps:{title:"Tugadi"},content:e.jsx("div",{children:"Barcha savollar tugadi... Natijalar hisoblanmoqda..."})})}return c.status==="finished"?{headerProps:{title:"🏆 Yakuniy Natijalar"},content:e.jsxs(e.Fragment,{children:[e.jsx(oo,{children:c.participants.map((p,I)=>e.jsxs(pt,{style:{padding:24},children:[e.jsxs(xt,{style:{fontSize:20},children:[I===0?"🥇":I===1?"🥈":I===2?"🥉":`${I+1}.`,p.nickname]}),e.jsxs(no,{style:{fontSize:20},children:[p.score," ball"]})]},p.userId))}),e.jsx(Br,{onClick:()=>T(),style:{marginTop:32},children:"Bellashuvni tark etish"})]})}:{headerProps:{title:"Bilimlar Bellashuvi"},content:null}},{headerProps:w,content:j}=d();return e.jsxs(Yd,{children:[e.jsx(mr,{...w}),j,e.jsx(fa,{isOpen:x,onClose:()=>k(!1)}),e.jsx(ba,{isOpen:v,onClose:()=>f(!1)})]})},ut=t.div`
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
`,Kd=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`,Zd=t.div`
  position: relative;
  z-index: ${r=>r.$raised?12:1};
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
`,ep=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`,rp=t.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
`,wn=t.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`,Ye=t.div`
  color: var(--text-muted-color);
  font-size: 13px;
`,tp=t.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`,op=t.div`
  position: relative;
  flex-shrink: 0;
`,np=t.button`
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
`,ap=t.div`
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
`,Ir=t.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${r=>r.$danger?"rgba(239, 68, 68, 0.08)":"transparent"};
  color: ${r=>r.$danger?"#ef4444":"var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${r=>r.$danger?"rgba(239, 68, 68, 0.12)":"var(--tertiary-color)"};
  }
`,sp=t.div`
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
`,ip=t.button`
  align-self: center;
  min-width: 180px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-weight: 700;
  cursor: pointer;
`,lp=t.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,cp=t.div`
  padding: 24px;
  border-radius: 22px;
  border: 1px solid var(--border-color);
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.12),
    rgba(20, 184, 166, 0.08)
  );
`,ao=t.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  font-weight: 700;
`,zn=t.h2`
  margin: 0 0 8px;
  font-size: 28px;
  color: var(--text-color);
`,dp=t.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`,pp=t.div`
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 18px;
  padding: 18px;
`,Sn=t.div`
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,xp=t.div`
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  line-height: 1.6;
`,$n=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`,ht=t.span`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${r=>r.$bg||"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
`,Cn=t.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
`,Tn=t.div`
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--tertiary-color);
  padding: 24px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`,up=t.div`
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
`,hp=t.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: var(--secondary-color);
  overflow: hidden;
`,gp=t.div`
  height: 100%;
  width: ${r=>r.$width||"0%"};
  background: linear-gradient(90deg, #22c55e, #14b8a6);
`,Lr=t.h3`
  margin: 0 0 12px;
  color: var(--text-color);
  font-size: 18px;
`,mp=t.h2`
  margin: 0 0 18px;
  color: var(--text-color);
  font-size: 28px;
  line-height: 1.35;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`,fp=t.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`,bp=t.div`
  min-height: 94px;
  border-radius: 18px;
  border: 1px dashed var(--border-color);
  background: var(--secondary-color);
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
`,Bn=t.button`
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid
    ${r=>r.$state==="correct"?"rgba(34,197,94,0.55)":r.$state==="wrong"?"rgba(239,68,68,0.55)":"var(--border-color)"};
  background: ${r=>r.$selected?"rgba(59,130,246,0.14)":r.$state==="correct"?"rgba(34,197,94,0.16)":r.$state==="wrong"?"rgba(239,68,68,0.14)":"var(--secondary-color)"};
  color: var(--text-color);
  font-weight: 700;
  cursor: ${r=>r.disabled?"default":"pointer"};
`,vp=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`,yp=t.div`
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: ${r=>r.$correct?"rgba(34, 197, 94, 0.1)":"rgba(239, 68, 68, 0.08)"};
  padding: 16px;
`,In=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`,jp=t.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
`,kp=t.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.5;
`,so=t.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
`,gt=t.button`
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
`,mt=t.button`
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
`,wp=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`,io=t.div`
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
`,zp=t.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`,Sp=t.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
  padding: 14px;
`,$p=t.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;t.div`
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
`;t.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;t.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;const Cp=r=>{const n=[...r];for(let s=n.length-1;s>0;s-=1){const c=Math.floor(Math.random()*(s+1));[n[s],n[c]]=[n[c],n[s]]}return n},Tp=r=>{const n=(r==null?void 0:r.poolTokens)||[...(r==null?void 0:r.answerTokens)||[],...(r==null?void 0:r.extraTokens)||[]];return Cp(n).map((s,c)=>({id:`pool-${c}-${s}`,text:s}))},ya=({initialDeckId:r,onBack:n})=>{var jr,kr;const{sentenceBuilderDecks:s,sentenceBuildersPage:c,sentenceBuildersHasMore:g,fetchSentenceBuilders:S,fetchSentenceBuilderDeck:i,fetchSharedSentenceBuilderDeck:C,checkSentenceBuilderAnswer:E,deleteSentenceBuilderDeck:T,fetchSentenceBuilderResults:R,fetchSentenceBuilderShareLinks:$,createSentenceBuilderShareLink:B,deleteSentenceBuilderShareLink:D,submitSentenceBuilderAttempt:m,guestName:M}=Me(),h=Je(o=>o.user),[F,H]=a.useState(!1),[Z,x]=a.useState(!1),[k,v]=a.useState(null),[f,z]=a.useState(null),[G,Y]=a.useState(0),[ae,ge]=a.useState([]),[d,w]=a.useState([]),[j,p]=a.useState(null),[I,ie]=a.useState([]),[_,te]=a.useState(!1),[xe,N]=a.useState(!1),[V,de]=a.useState(null),[le,pe]=a.useState(null),[me,ke]=a.useState(!1),[ze,Se]=a.useState(null),[ye,we]=a.useState(0),[W,q]=a.useState({}),[O,se]=a.useState(null),[ve,fe]=a.useState(!1),[$e,X]=a.useState(null),[ce,U]=a.useState("persist"),[re,be]=a.useState(""),[Re,Ae]=a.useState(!0),[L,A]=a.useState(0),[oe,ue]=a.useState([]),[u,b]=a.useState(!1),[P,Q]=a.useState(!1),[he,Rr]=a.useState(null),[rr,Ar]=a.useState(null),[Fe,He]=a.useState([]),[_e,Xe]=a.useState(!1),[tr,Le]=a.useState(null),Ve=a.useRef(!1),fr=(h==null?void 0:h.premiumStatus)==="active"||(h==null?void 0:h.premiumStatus)==="premium",br=fr?10:4,It=fr?4:2,_r=s.filter(o=>{var l;return(((l=o.createdBy)==null?void 0:l._id)||o.createdBy)===((h==null?void 0:h._id)||(h==null?void 0:h.id))}).length;a.useEffect(()=>{if(!Ve.current){if(s.length>0){Ve.current=!0;return}S(1).finally(()=>{Ve.current=!0})}},[S,s.length]),a.useEffect(()=>{if(!tr)return;const o=()=>Le(null);return document.addEventListener("click",o),()=>{document.removeEventListener("click",o)}},[tr]),a.useEffect(()=>{(async()=>{var l;if(!(!r||k||f)){try{const y=await i(r);if(y){Se(null),v(y);return}}catch{}try{const y=await C(r);y!=null&&y.deck&&(Se(((l=y.shareLink)==null?void 0:l.shortCode)||r),v(y.deck))}catch{}}})()},[i,C,r,f,k]);const De=((jr=f==null?void 0:f.items)==null?void 0:jr[G])||null;a.useEffect(()=>{!De||_||(ge(Tp(De)),w([]),p(null))},[De,_]),a.useEffect(()=>{if(!f||_)return;const o=Number(f.timeLimit||0)*60;we(o)},[f,_]),a.useEffect(()=>{if(!f||_||!ye)return;const o=setInterval(()=>we(l=>l-1),1e3);return()=>clearInterval(o)},[f,_,ye]);const Lt=()=>{if(_r>=br){fr?J.error("Siz maksimal limitga yetgansiz"):x(!0);return}H(!0)},Mt=async o=>{const l=await i(o);l&&(v(l),z(null),te(!1))},Dr=async o=>{var y,K;let l=typeof o=="string"?null:o;if(!l&&typeof o=="string")try{l=await i(o),Se(null)}catch{const ee=await C(o);l=(ee==null?void 0:ee.deck)||null,Se(((y=ee==null?void 0:ee.shareLink)==null?void 0:y.shortCode)||o)}if(!((K=l==null?void 0:l.items)!=null&&K.length)){J.error("Bu to'plamda savollar topilmadi");return}v(null),z(l),Y(0),ie([]),te(!1),q({}),se(null)},qr=async o=>{X(o),U("persist"),be(""),Ae(!0),A(0),b(!0);try{const l=await $(o._id);ue(Array.isArray(l)?l:[])}finally{b(!1)}},Pr=async()=>{var o,l;if(!(!le||me)){ke(!0);try{await T(le._id),(k==null?void 0:k._id)===le._id&&v(null),(f==null?void 0:f._id)===le._id&&z(null),J.success("Gap tuzish to'plami o'chirildi."),pe(null)}catch(y){J.error(((l=(o=y==null?void 0:y.response)==null?void 0:o.data)==null?void 0:l.message)||"To'plamni o'chirishda xatolik yuz berdi.")}finally{ke(!1)}}},Rt=o=>{j||(ge(l=>l.filter(y=>y.id!==o.id)),w(l=>[...l,o]))},At=o=>{j||(w(l=>l.filter(y=>y.id!==o.id)),ge(l=>[...l,o]))},_t=async()=>{if(De){if(!d.length){J.error("Avval bo'laklardan gap tuzing");return}N(!0);try{const o=await E(f._id,G,d.map(l=>l.text));p(o),q(l=>({...l,[G]:d.map(y=>y.text)}))}catch{J.error("Javobni tekshirishda xatolik yuz berdi")}finally{N(!1)}}},Dt=()=>{if(!j||!De)return;const o=[...I,{prompt:De.prompt,...j}];if(ie(o),G>=f.items.length-1){vr();return}Y(l=>l+1)},vr=async()=>{if(!(!f||ve)){fe(!0);try{const o={...W,...De&&d.length&&!j?{[G]:d.map(K=>K.text)}:{}},l=Object.entries(o).map(([K,ee])=>({questionIndex:Number(K),selectedTokens:ee})),y=await m(f._id,{answers:l,guestName:h?null:M,shareShortCode:ze||null});se(y),ie((y==null?void 0:y.items)||[]),te(!0)}catch{J.error("Natijani saqlashda xatolik yuz berdi")}finally{fe(!1)}}},qt=()=>{f&&(Y(0),ie([]),te(!1),q({}),se(null),p(null),w([]))},Or=async o=>{Ar(o),Xe(!0);try{const l=await R(o._id,{page:1,limit:500});He((l==null?void 0:l.data)||[])}finally{Xe(!1)}},or=async()=>{var o,l;if(!(!$e||P)){if(ce==="persist"&&!re.trim()){J.error("Guruh nomini kiriting");return}Q(!0);try{const y=await B($e._id,{persistResults:ce==="persist",groupName:ce==="persist"?re.trim():"",showResults:Re,timeLimit:Number(L)||0});ue(ee=>[y,...ee]);const K=`${gr}/arena/sentence-builder/${y.shortCode}`;await navigator.clipboard.writeText(K),J.success("Havola yaratildi va nusxalandi."),be(""),Ae(!0),A(0)}catch(y){J.error(((l=(o=y==null?void 0:y.response)==null?void 0:o.data)==null?void 0:l.message)||"Havolani yaratishda xatolik yuz berdi")}finally{Q(!1)}}},Er=async o=>{try{await navigator.clipboard.writeText(`${gr}/arena/sentence-builder/${o}`),J.success("Havola nusxalandi.")}catch{J.error("Havolani nusxalab bo'lmadi")}},Fr=async o=>{var l,y;if(!(!$e||he)){Rr(o);try{await D($e._id,o),ue(K=>K.filter(ee=>ee._id!==o)),J.success("Havola o'chirildi.")}catch(K){J.error(((y=(l=K==null?void 0:K.response)==null?void 0:l.data)==null?void 0:y.message)||"Havolani o'chirishda xatolik yuz berdi")}finally{Rr(null)}}};a.useEffect(()=>{f&&Number(f.timeLimit||0)>0&&ye<=0&&!_&&!ve&&vr()},[f,ye,_,ve]);const Hr=a.useMemo(()=>{var o;return(o=f==null?void 0:f.items)!=null&&o.length?`${(G+1)/f.items.length*100}%`:"0%"},[f,G]),yr=I.filter(o=>o.isCorrect).length,Nr=I.length?Math.round(yr/I.length*100):0,Wr=a.useMemo(()=>(Fe||[]).map((o,l)=>({id:o._id||`${o.participantName}-${o.createdAt}-${l}`,participantName:o.participantName||"Foydalanuvchi",groupName:o.groupName||"",createdAt:o.createdAt,score:Number(o.score||0),total:Number(o.total||0),accuracy:Number(o.accuracy||0),breakdowns:(o.items||[]).map((y,K)=>({questionIndex:y.questionIndex!==void 0?y.questionIndex:K,prompt:y.prompt||`Savol #${K+1}`,isCorrect:!!y.isCorrect,selectedTokens:y.selectedTokens||[],expectedTokens:y.expectedTokens||[],mistakes:y.mistakes||[]}))})),[Fe]);return _&&f?e.jsx(ut,{children:e.jsxs(Cn,{children:[e.jsxs(ao,{onClick:()=>z(null),children:[e.jsx(qe,{size:18}),"To'plamga qaytish"]}),e.jsxs(Tn,{children:[e.jsx(Lr,{children:"Yakuniy natija"}),e.jsx(zn,{children:f.title}),e.jsxs(wp,{children:[e.jsxs(io,{children:["To'g'ri javoblar",e.jsx("strong",{children:(O==null?void 0:O.score)??yr})]}),e.jsxs(io,{children:["Jami savollar",e.jsx("strong",{children:(O==null?void 0:O.total)??I.length})]}),e.jsxs(io,{children:["Reyting",e.jsxs("strong",{children:[(O==null?void 0:O.accuracy)??Nr,"%"]})]})]}),(O==null?void 0:O.showResults)!==!1?e.jsx(zp,{children:I.map((o,l)=>e.jsxs(Sp,{children:[e.jsxs(Sn,{children:["Savol #",l+1,": ",o.prompt]}),e.jsx(Ye,{children:o.isCorrect?"To'g'ri":"Noto'g'ri"}),e.jsx(In,{children:(o.expectedTokens||o.expected||[]).map((y,K)=>e.jsx(ht,{$bg:"rgba(59,130,246,0.12)",children:y},`${y}-${K}`))})]},`${o.prompt}-${l}`))}):e.jsx($p,{children:"Bu havola uchun natija breakdowni talabalarga ko'rsatilmaydi."}),e.jsxs(so,{children:[e.jsxs(gt,{onClick:qt,children:[e.jsx(xo,{size:16}),"Qayta boshlash"]}),e.jsx(mt,{onClick:()=>z(null),children:"Orqaga"})]})]})]})}):f&&De?e.jsx(ut,{children:e.jsxs(Cn,{children:[e.jsxs(ao,{onClick:()=>z(null),children:[e.jsx(qe,{size:18}),"To'plamga qaytish"]}),e.jsxs(Tn,{children:[e.jsxs(up,{children:[e.jsxs("div",{children:[f.title," • Savol ",G+1," /"," ",f.items.length]}),e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[Number(f.timeLimit||0)>0&&e.jsxs("span",{children:[e.jsx(Qn,{size:14,style:{marginRight:6}}),Math.max(0,Math.floor(ye/60)),":",String(Math.max(0,ye%60)).padStart(2,"0")]}),e.jsx("span",{children:j!=null&&j.isCorrect?"To'g'ri":"Gapni tuzing"})]})]}),e.jsx(hp,{children:e.jsx(gp,{$width:Hr})}),e.jsxs(fp,{children:[e.jsxs("div",{children:[e.jsx(Lr,{children:"Savol"}),e.jsx(mp,{children:De.prompt})]}),e.jsxs("div",{children:[e.jsx(Lr,{children:"Sizning gapingiz"}),e.jsx(bp,{children:d.length?d.map((o,l)=>{const y=j?o.text===j.expected[l]?"correct":"wrong":null;return e.jsx(Bn,{$selected:!0,$state:y,disabled:!!j,onClick:()=>At(o),children:o.text},o.id)}):e.jsx(Ye,{children:"Bo'laklarni bosib gap tuzing"})})]}),e.jsxs("div",{children:[e.jsx(Lr,{children:"Bo'laklar"}),e.jsx(vp,{children:ae.map(o=>e.jsx(Bn,{onClick:()=>Rt(o),disabled:!!j,children:o.text},o.id))})]}),j&&f.showResults!==!1&&e.jsxs(yp,{$correct:j.isCorrect,children:[e.jsx(Lr,{children:j.isCorrect?e.jsxs(e.Fragment,{children:[e.jsx(ur,{size:18,style:{marginRight:8}}),"Javob to'g'ri"]}):e.jsxs(e.Fragment,{children:[e.jsx(Gn,{size:18,style:{marginRight:8}}),"Javobda xato bor"]})}),e.jsx(Ye,{children:"To'g'ri javob bo'laklari"}),e.jsx(In,{children:j.expected.map((o,l)=>e.jsx(ht,{$bg:"rgba(34,197,94,0.14)",children:o},`${o}-${l}`))}),!j.isCorrect&&e.jsx(jp,{children:j.mistakes.map(o=>e.jsxs(kp,{children:[o.position,"-bo'lakda siz"," ",e.jsx("strong",{children:o.actual||"hech narsa"})," ","tanladingiz.",e.jsx("br",{}),"To'g'risi:"," ",e.jsx("strong",{children:o.expected||"ortiqcha bo'lak"})]},o.position))})]}),e.jsxs(so,{children:[j?e.jsx(gt,{onClick:Dt,children:G>=f.items.length-1?"Yakunlash":"Keyingi savol"}):e.jsx(gt,{onClick:_t,children:xe?"Tekshirilmoqda...":"Tekshirish"}),G>=f.items.length-1&&e.jsx(mt,{onClick:vr,children:"Yakunlash"})]})]})]})]})}):k?e.jsx(ut,{children:e.jsxs(lp,{children:[e.jsxs(ao,{onClick:()=>v(null),children:[e.jsx(qe,{size:18}),"Ro'yxatga qaytish"]}),e.jsxs(cp,{children:[e.jsx(zn,{children:k.title}),e.jsx(wn,{children:k.description||"Tavsif kiritilmagan"}),e.jsxs(Ye,{style:{marginTop:10},children:["Savollar soni: ",((kr=k.items)==null?void 0:kr.length)||0]}),e.jsxs(so,{children:[e.jsxs(gt,{onClick:()=>Dr(k),children:[e.jsx(Bt,{size:16}),"Mashq qilish"]}),k.canViewAnswers&&e.jsxs(e.Fragment,{children:[e.jsxs(mt,{onClick:()=>qr(k),children:[e.jsx(hr,{size:16}),"Havolalar"]}),e.jsxs(mt,{onClick:()=>Or(k),children:[e.jsx(po,{size:16}),"Natijalar"]})]})]})]}),e.jsx(dp,{children:(k.items||[]).map((o,l)=>e.jsxs(pp,{children:[e.jsxs(Sn,{children:["Savol #",l+1]}),e.jsx(xp,{children:o.prompt}),k.canViewAnswers?e.jsxs(e.Fragment,{children:[e.jsx(Ye,{style:{marginTop:14},children:"To'g'ri bo'laklar"}),e.jsx($n,{children:(o.answerTokens||[]).map((y,K)=>e.jsx(ht,{$bg:"rgba(59,130,246,0.12)",children:y},`${y}-${K}`))}),(o.extraTokens||[]).length>0&&e.jsxs(e.Fragment,{children:[e.jsx(Ye,{style:{marginTop:14},children:"Chalg'ituvchi bo'laklar"}),e.jsx($n,{children:o.extraTokens.map((y,K)=>e.jsx(ht,{$bg:"rgba(244,114,182,0.12)",children:y},`${y}-${K}`))})]})]}):e.jsx(Ye,{style:{marginTop:14},children:"Javoblar faqat creator uchun ko'rinadi."})]},o._id||l))})]})}):e.jsxs(ut,{children:[e.jsx(mr,{title:"Gap tuzish",count:_r,onBack:n,rightContent:e.jsx(Be,{onClick:Lt,children:e.jsx(Oe,{size:16})})}),s.length===0?e.jsxs(sp,{children:[e.jsx("h3",{children:"Hozircha to'plam yo'q"}),"Gap bo'laklaridan mashq qilish uchun birinchi to'plamni yarating."]}):e.jsxs(e.Fragment,{children:[e.jsx(Kd,{children:s.map(o=>{var l;return e.jsxs(Zd,{$raised:tr===o._id,onClick:()=>{Le(null),Dr(o._id)},children:[e.jsxs(ep,{children:[e.jsx(rp,{children:o.title}),e.jsxs(op,{onClick:y=>{y.stopPropagation()},children:[e.jsx(np,{onClick:()=>Le(y=>y===o._id?null:o._id),children:e.jsx(mo,{size:16})}),tr===o._id&&e.jsxs(ap,{onClick:y=>y.stopPropagation(),children:[e.jsxs(Ir,{onClick:()=>{Mt(o._id),Le(null)},children:[e.jsx(Vn,{size:14}),"Ko'rish"]}),e.jsxs(Ir,{onClick:()=>{qr(o),Le(null)},children:[e.jsx(hr,{size:14}),"Havolalar"]}),e.jsxs(Ir,{onClick:()=>{Or(o),Le(null)},children:[e.jsx(po,{size:14}),"Natijalar"]}),e.jsxs(Ir,{onClick:()=>{de(o),Le(null)},children:[e.jsx(fo,{size:14}),"Tahrirlash"]}),e.jsxs(Ir,{$danger:!0,onClick:()=>{pe(o),Le(null)},children:[e.jsx(er,{size:14}),"O'chirish"]})]})]})]}),e.jsx(wn,{children:o.description||"Tavsif yo'q"}),e.jsxs(Ye,{children:["Savollar: ",((l=o.items)==null?void 0:l.length)||0]}),e.jsxs(tp,{children:[e.jsx(Bt,{size:14}),"Boshlash uchun kartani bosing"]})]},o._id)})}),g&&e.jsx(ip,{onClick:()=>S(c+1),children:"Yana yuklash"})]}),(F||V)&&e.jsx(da,{onClose:()=>{H(!1),de(null)},initialDeck:V}),Z&&e.jsx(vo,{isOpen:Z,onClose:()=>x(!1)}),e.jsx(yo,{isOpen:!!le,onClose:()=>{me||pe(null)},title:"To'plamni o'chirish",description:`${(le==null?void 0:le.title)||"Bu to'plam"} butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.`,confirmText:me?"O'chirilmoqda...":"O'chirish",cancelText:"Bekor qilish",onConfirm:Pr,isDanger:!0}),e.jsx(ko,{isOpen:!!$e,onClose:()=>{X(null),U("persist"),be(""),Ae(!0),A(0)},title:"Gap tuzish havolasini yaratish",itemTitle:($e==null?void 0:$e.title)||"",limit:It,currentCount:oe.length,mode:ce,onModeChange:U,groupName:re,onGroupNameChange:be,showResults:Re,onShowResultsChange:Ae,timeLimit:L,onTimeLimitChange:A,onCreate:or,isCreating:P,links:oe,loadingLinks:u,onCopyLink:Er,onDeleteLink:Fr,deletingLinkId:he,linkPrefix:"/arena/sentence-builder/"}),rr&&e.jsx(jo,{title:"Gap tuzish natijalari",subtitle:`"${rr.title}" bo'yicha ishlagan talabalar, ularning to'g'ri javoblari va har bir bo'lakdagi xatolari.`,searchPlaceholder:"Talaba yoki guruh qidirish...",loading:_e,results:Wr,onClose:()=>Ar(null)})]})},Bp=[{en:"river",uz:"daryo",ru:"река"},{en:"mountain",uz:"tog'",ru:"гора"},{en:"sun",uz:"quyosh",ru:"солнце"},{en:"moon",uz:"oy",ru:"луна"},{en:"wind",uz:"shamol",ru:"ветер"},{en:"stone",uz:"tosh",ru:"камень"},{en:"forest",uz:"o'rmon",ru:"лес"},{en:"garden",uz:"bog'",ru:"сад"},{en:"city",uz:"shahar",ru:"город"},{en:"village",uz:"qishloq",ru:"деревня"},{en:"school",uz:"maktab",ru:"школа"},{en:"market",uz:"bozor",ru:"рынок"},{en:"road",uz:"yo'l",ru:"дорога"},{en:"sea",uz:"dengiz",ru:"море"},{en:"cloud",uz:"bulut",ru:"облако"},{en:"snow",uz:"qor",ru:"снег"},{en:"spring",uz:"bahor",ru:"весна"},{en:"autumn",uz:"kuz",ru:"осень"},{en:"winter",uz:"qish",ru:"зима"},{en:"summer",uz:"yoz",ru:"лето"},{en:"book",uz:"kitob",ru:"книга"},{en:"bread",uz:"non",ru:"хлеб"},{en:"tea",uz:"choy",ru:"чай"},{en:"song",uz:"qo'shiq",ru:"песня"},{en:"dream",uz:"orzu",ru:"мечта"},{en:"house",uz:"uy",ru:"дом"},{en:"room",uz:"xona",ru:"комната"},{en:"door",uz:"eshik",ru:"дверь"},{en:"window",uz:"oyna",ru:"окно"},{en:"table",uz:"stol",ru:"стол"},{en:"chair",uz:"stul",ru:"стул"},{en:"tree",uz:"daraxt",ru:"дерево"},{en:"flower",uz:"gul",ru:"цветок"},{en:"fruit",uz:"meva",ru:"фрукт"},{en:"bridge",uz:"ko'prik",ru:"мост"},{en:"lake",uz:"ko'l",ru:"озеро"},{en:"island",uz:"orol",ru:"остров"},{en:"meadow",uz:"o'tloq",ru:"луг"},{en:"star",uz:"yulduz",ru:"звезда"},{en:"lamp",uz:"chiroq",ru:"лампа"},{en:"box",uz:"quti",ru:"коробка"},{en:"key",uz:"kalit",ru:"ключ"},{en:"clock",uz:"soat",ru:"часы"},{en:"bell",uz:"qo'ng'iroq",ru:"колокол"},{en:"child",uz:"bola",ru:"ребёнок"},{en:"friend",uz:"do'st",ru:"друг"},{en:"harbor",uz:"bandargoh",ru:"гавань"},{en:"bird",uz:"qush",ru:"птица"},{en:"horse",uz:"ot",ru:"лошадь"},{en:"cat",uz:"mushuk",ru:"кошка"},{en:"dog",uz:"it",ru:"собака"},{en:"apple",uz:"olma",ru:"яблоко"},{en:"pear",uz:"nok",ru:"груша"},{en:"grape",uz:"uzum",ru:"виноград"},{en:"melon",uz:"qovun",ru:"дыня"},{en:"watermelon",uz:"tarvuz",ru:"арбуз"},{en:"carrot",uz:"sabzi",ru:"морковь"},{en:"potato",uz:"kartoshka",ru:"картофель"},{en:"tomato",uz:"pomidor",ru:"помидор"},{en:"pepper",uz:"qalampir",ru:"перец"},{en:"onion",uz:"piyoz",ru:"лук"},{en:"garlic",uz:"sarimsoq",ru:"чеснок"},{en:"pencil",uz:"qalam",ru:"карандаш"},{en:"notebook",uz:"daftar",ru:"тетрадь"},{en:"letter",uz:"maktub",ru:"письмо"},{en:"newspaper",uz:"gazeta",ru:"газета"},{en:"magazine",uz:"jurnal",ru:"журнал"},{en:"picture",uz:"rasm",ru:"картина"},{en:"camera",uz:"kamera",ru:"камера"},{en:"phone",uz:"telefon",ru:"телефон"},{en:"computer",uz:"kompyuter",ru:"компьютер"},{en:"screen",uz:"ekran",ru:"экран"},{en:"battery",uz:"batareya",ru:"батарея"},{en:"pillow",uz:"yostiq",ru:"подушка"},{en:"blanket",uz:"ko'rpa",ru:"одеяло"},{en:"mirror",uz:"oyna",ru:"зеркало"},{en:"bucket",uz:"chelak",ru:"ведро"},{en:"basket",uz:"savat",ru:"корзина"},{en:"wallet",uz:"hamyon",ru:"кошелёк"},{en:"coin",uz:"tanga",ru:"монета"},{en:"ticket",uz:"chipta",ru:"билет"},{en:"rocket",uz:"raketa",ru:"ракета"},{en:"planet",uz:"sayyora",ru:"планета"},{en:"engine",uz:"dvigatel",ru:"двигатель"},{en:"ship",uz:"kema",ru:"корабль"},{en:"train",uz:"poyezd",ru:"поезд"},{en:"station",uz:"bekat",ru:"станция"},{en:"airport",uz:"aeroport",ru:"аэропорт"},{en:"tower",uz:"minora",ru:"башня"},{en:"square",uz:"maydon",ru:"площадь"},{en:"museum",uz:"muzey",ru:"музей"},{en:"theater",uz:"teatr",ru:"театр"},{en:"library",uz:"kutubxona",ru:"библиотека"},{en:"hospital",uz:"shifoxona",ru:"больница"},{en:"factory",uz:"zavod",ru:"завод"},{en:"office",uz:"idora",ru:"офис"},{en:"teacher",uz:"ustoz",ru:"учитель"},{en:"student",uz:"talaba",ru:"студент"},{en:"driver",uz:"haydovchi",ru:"водитель"},{en:"doctor",uz:"shifokor",ru:"врач"},{en:"farmer",uz:"dehqon",ru:"фермер"},{en:"actor",uz:"aktyor",ru:"актёр"},{en:"painter",uz:"rassom",ru:"художник"},{en:"singer",uz:"xonanda",ru:"певец"},{en:"worker",uz:"ishchi",ru:"рабочий"},{en:"captain",uz:"kapitan",ru:"капитан"},{en:"pilot",uz:"uchuvchi",ru:"пилот"},{en:"soldier",uz:"askar",ru:"солдат"},{en:"farmland",uz:"ekinzor",ru:"пашня"},{en:"valley",uz:"vodiy",ru:"долина"},{en:"desert",uz:"sahro",ru:"пустыня"},{en:"beach",uz:"sohil",ru:"пляж"},{en:"waterfall",uz:"sharshara",ru:"водопад"},{en:"candle",uz:"sham",ru:"свеча"},{en:"ring",uz:"uzuk",ru:"кольцо"},{en:"necklace",uz:"marjon",ru:"ожерелье"},{en:"button",uz:"tugma",ru:"пуговица"},{en:"bottle",uz:"shisha",ru:"бутылка"},{en:"plate",uz:"likop",ru:"тарелка"},{en:"spoon",uz:"qoshiq",ru:"ложка"},{en:"fork",uz:"sanchqi",ru:"вилка"},{en:"knife",uz:"pichoq",ru:"нож"}],lo=r=>typeof r=="string"&&r.trim().length>0&&!/\s/.test(r.trim()),ja=Bp.filter(r=>lo(r.en)&&lo(r.uz)&&lo(r.ru)).reduce((r,n,s)=>(r.some(g=>g.en.toLowerCase()===n.en.toLowerCase()||g.uz.toLowerCase()===n.uz.toLowerCase()||g.ru.toLowerCase()===n.ru.toLowerCase())||r.push({...n,en:n.en.trim(),uz:n.uz.trim(),ru:n.ru.trim(),id:`${n.en.trim().toLowerCase()}-${s}`}),r),[]),Ip=r=>{const n=[...r];for(let s=n.length-1;s>0;s-=1){const c=Math.floor(Math.random()*(s+1));[n[s],n[c]]=[n[c],n[s]]}return n},Lp=(r,n)=>{const s=["uz","ru","en"].includes(r)?r:"en";return Ip(ja).slice(0,n).map(c=>c[s]||c.en)},Mp=ja.length,Rp=t.div`
  display: flex;
  flex-direction: column;
  /* gap: 16px; */

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--background-color);
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
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
`,Ap=t.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px 24px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
`,_p=t.div`
  display: flex;
  gap: 0;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
`,Ln=t.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 0;
  background: transparent;
  color: ${r=>r.$active?"var(--text-color)":"var(--text-muted-color)"};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${r=>r.$active?"var(--primary-color)":"transparent"};
  }
`,Dp=t.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`,qp=t.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
`,ft=t.label`
  display: grid;
  grid-template-columns: minmax(180px, 320px) 140px auto;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`,bt=t.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,vt=t.input`
  width: 100%;
  min-width: 0;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 16px;
  font-weight: 700;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,Pp=t.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-muted-color);
`,Mn=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,Op=t.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
`,Ep=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`,Fp=t.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  color: var(--text-color);
`,Hp=t.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Np=t.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Rn=t.div`
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 10px;
  border: 1px solid ${r=>r.$highlight?"var(--primary-color)":"var(--border-color)"};
  border-radius: 10px;
  background: ${r=>r.$highlight?"color-mix(in srgb, var(--primary-color) 10%, var(--background-color) 90%)":"var(--background-color)"};

  @media (max-width: 768px) {
    grid-template-columns: 28px minmax(0, 1fr);
    padding: 10px;
    gap: 8px;
  }
`,An=t.div`
  font-size: 13px;
  font-weight: 800;
  color: var(--text-muted-color);
`,_n=t.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,Dn=t.div`
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  font-size: 12px;
  font-weight: 800;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`,qn=t.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;

  > span:last-child {
    font-size: 11px;
    color: var(--text-muted-color);
  }
`,yt=t.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  white-space: nowrap;

  @media (max-width: 768px) {
    grid-column: 2 / -1;
    font-size: 12px;
  }
`,Pn=t.div`
  padding: 14px 0;
  font-size: 13px;
  color: var(--text-muted-color);
`,jt=t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 35px;
  padding: 0 8px;
  border: 0;
  border-radius: 12px;
  background: var(--primary-color);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`;t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--tertiary-color);
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;const Wp=t.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Gp=t.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);

  @media (max-width: 900px) {
    grid-template-columns: 1fr auto;
  }
`,Qp=t.div`
  font-size: 18px;
  font-weight: 800;
  color: var(--primary-color);
`,Yp=t.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  color: var(--text-muted-color);
  font-size: 15px;

  @media (max-width: 900px) {
    justify-content: flex-start;
  }
`,Jp=t.span`
  color: var(--text-color);
  font-size: 24px;
  font-weight: 500;
`,Xp=t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  background: var(--success-color);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
`,Vp=t.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100px;
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--text-color) 28%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 55%, var(--background-color) 45%);
  overflow: auto;

  @media (max-width: 768px) {
    min-height: 420px;
    padding: 14px;
  }
`,On=t.div`
  display: flex;
  overflow: auto;
  align-items: flex-start;
  gap: 0;
`,co=t.div`
  min-width: 28px;
  margin-right: 8px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
`,En=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border: 1px solid color-mix(in srgb, var(--text-color) 35%, transparent);
  background: ${r=>r.$active?"var(--warning-color)":"var(--background-color)"};
  color: var(--text-color);
  font-size: 32px;
  font-weight: 500;

  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    font-size: 24px;
  }
`,Up=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 180px;
`,Kp=t.div`
  min-width: min(100%, 720px);
  min-height: 136px;
  padding: 16px 28px;
  border-radius: 8px;
  background: var(--background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(40px, 8vw, 74px);
  font-weight: 500;
  text-align: center;

  @media (max-width: 768px) {
    min-height: 100px;
    font-size: 40px;
  }
`,Zp=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  align-items: start;
`,ex=t.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,rx=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;

  span {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-muted-color);
  }

  strong {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 8px;
    background: ${r=>r.$active?"var(--warning-color)":"var(--background-color)"};
    color: var(--text-color);
    font-size: 14px;
    font-weight: 700;
  }
`,tx=t.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ox=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`,nx=t.input`
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid ${r=>r.$active?"var(--warning-color)":"var(--border-color)"};
  border-radius: 8px;
  background: ${r=>r.$active?"color-mix(in srgb, var(--warning-color) 22%, var(--background-color) 78%)":"var(--background-color)"};
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,Fn=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: auto;
`,pr=t.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 74px;
  min-height: 64px;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    min-width: 58px;
    min-height: 52px;
    font-size: 18px;
  }
`,ax=t.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,sx=t.div`
  display: grid;
  grid-template-columns: ${r=>r.$wide?"repeat(auto-fit, minmax(260px, 1fr))":"repeat(auto-fit, minmax(120px, 1fr))"};
  gap: 10px;
`,ix=t.div`
  display: flex;
  flex-direction: ${r=>r.$wide?"row":"column"};
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--text-color) 35%, transparent);
  overflow: hidden;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: ${r=>r.$wide?"52px":"54px"};
    padding: 0 10px;
    font-size: ${r=>r.$wide?"18px":"24px"};
    font-weight: 500;
    text-align: center;
  }

  span:first-child {
    flex: 1;
    background: var(--background-color);
    color: var(--text-color);
  }

  span:last-child {
    flex: 1;
    background: ${r=>r.$correct?"color-mix(in srgb, var(--success-color) 85%, white 15%)":"color-mix(in srgb, var(--danger-color) 80%, white 20%)"};
    color: var(--text-color);
  }
`,kt=40,xr=10,wt=(r,n,s)=>Math.min(Math.max(r,n),s),zt=r=>{const n=Math.max(0,r),s=Math.floor(n/60),c=n%60;return`${s}:${String(c).padStart(2,"0")}`},Hn=(r,n)=>`${(Math.max(0,r)/1e3).toFixed(2)} ${n("mnemonics.secondsShort")}`,lx=r=>Array.from({length:r},()=>String(Math.floor(Math.random()*10))),St=r=>r.trim().replace(/\s+/g," ").toLowerCase(),Nn=(r,n)=>{const s=[];for(let c=0;c<r.length;c+=n)s.push(r.slice(c,c+n));return s},ka=({onBack:r})=>{const{t:n,i18n:s}=Mr(),c=Je(L=>L.token),g=Je(L=>L.user),S=a.useRef([]),[i,C]=a.useState("digits"),[E,T]=a.useState(8),[R,$]=a.useState(60),[B,D]=a.useState(240),[m,M]=a.useState(""),[h,F]=a.useState("setup"),[H,Z]=a.useState([]),[x,k]=a.useState(0),[v,f]=a.useState([]),[z,G]=a.useState(xr),[Y,ae]=a.useState(0),[ge,d]=a.useState(null),[w,j]=a.useState([]),[p,I]=a.useState(null),[ie,_]=a.useState(!1),[te,xe]=a.useState(!1),N=a.useMemo(()=>{if(!m)return null;const L=Number(m);return!Number.isFinite(L)||L<=0?null:L},[m]),V=a.useMemo(()=>(s.resolvedLanguage||s.language||"en").split("-")[0],[s.language,s.resolvedLanguage]),de=H[x]||"",le=a.useMemo(()=>Nn(H,10),[H]),pe=a.useMemo(()=>Nn(v,10),[v]),me=async(L=i)=>{try{_(!0);const A=await $s(L);j(Array.isArray(A==null?void 0:A.leaderboard)?A.leaderboard:[]),I((A==null?void 0:A.currentUserBest)||null)}catch{j([]),I(null)}finally{_(!1)}};a.useEffect(()=>{if(h!=="prepare-memorize"&&h!=="memorize"&&h!=="prepare-recall"&&h!=="recall")return;const L=window.setInterval(()=>{G(A=>{if(A<=1){if(window.clearInterval(L),h==="prepare-memorize")return F("memorize"),R;if(h==="memorize")return F("prepare-recall"),k(0),xr;if(h==="prepare-recall")return F("recall"),k(0),B;if(h==="recall")return ye(),0}return A-1})},1e3);return()=>window.clearInterval(L)},[h,R,B]),a.useEffect(()=>{if(h!=="memorize")return;const L=Date.now(),A=window.setInterval(()=>{ae(Date.now()-L)},100);return()=>window.clearInterval(A)},[h]),a.useEffect(()=>{if(h!=="memorize"||!N||H.length<=1)return;const L=Math.max(500,Math.round(N*1e3/H.length)),A=window.setInterval(()=>{k(oe=>(oe+1)%H.length)},L);return()=>window.clearInterval(A)},[h,N,H.length]),a.useEffect(()=>{if(i!=="digits"||h!=="memorize"&&h!=="recall")return;const L=S.current[x];L&&L.scrollIntoView({block:"center",inline:"center",behavior:"smooth"})},[x,i,h]),a.useEffect(()=>{me(i)},[i]);const ke=L=>i==="words"?Lp(V,L):lx(L),ze=()=>{const L=wt(Number(E)||8,1,kt),A=wt(Number(R)||60,5,3600),oe=wt(Number(B)||240,5,3600),ue=ke(L);T(L),$(A),D(oe),Z(ue),f(Array.from({length:L},()=>"")),k(0),ae(0),d(null),G(xr),F("prepare-memorize"),xe(!0)},Se=()=>{F("prepare-recall"),k(0),G(xr)},ye=()=>{const A={score:H.reduce((oe,ue,u)=>i==="words"?oe+(St(v[u])===St(ue)?1:0):oe+(v[u]===ue?1:0),0),total:H.length,expected:H,actual:v,elapsedMemorizeMs:Y};d(A),F("result"),c&&Cs({mode:i,score:A.score,total:A.total,elapsedMemorizeMs:A.elapsedMemorizeMs}).then(()=>me(i)).catch(()=>{})},we=()=>{F("setup"),Z([]),f([]),k(0),G(xr),ae(0),d(null),xe(!1)},W=()=>{xe(!1),F("setup"),Z([]),f([]),k(0),G(xr),ae(0),d(null)},q=L=>{k(A=>wt(A+L,0,H.length-1))},O=L=>{h!=="recall"||i!=="digits"||(f(A=>{const oe=[...A];return oe[x]=String(L),oe}),k(A=>Math.min(A+1,H.length-1)))},se=()=>{h==="recall"&&f(L=>{const A=[...L];return A[x]="",A})},ve=()=>{if(h==="prepare-memorize"){F("memorize"),G(R);return}h==="prepare-recall"&&(F("recall"),k(0),G(B))},fe=()=>e.jsxs(_p,{children:[e.jsx(Ln,{type:"button",$active:i==="digits",onClick:()=>C("digits"),children:n("mnemonics.modes.digits")}),e.jsx(Ln,{type:"button",$active:i==="words",onClick:()=>C("words"),children:n("mnemonics.modes.words")})]}),$e=()=>{var L,A,oe,ue,u,b;return e.jsxs(Op,{children:[e.jsxs(Ep,{children:[e.jsx(Fp,{children:n("mnemonics.leaderboard.title")}),e.jsx(Hp,{children:n("mnemonics.leaderboard.sorting")})]}),p?e.jsxs(Rn,{$highlight:!0,children:[e.jsxs(An,{children:["#",p.rank]}),e.jsxs(_n,{children:[e.jsx(Dn,{children:(L=p.user)!=null&&L.avatar||g!=null&&g.avatar?e.jsx("img",{src:((A=p.user)==null?void 0:A.avatar)||(g==null?void 0:g.avatar),alt:((oe=p.user)==null?void 0:oe.nickname)||((ue=p.user)==null?void 0:ue.username)||(g==null?void 0:g.nickname)||(g==null?void 0:g.username)||"You"}):(((u=p.user)==null?void 0:u.nickname)||((b=p.user)==null?void 0:b.username)||(g==null?void 0:g.nickname)||(g==null?void 0:g.username)||"Y").slice(0,1).toUpperCase()}),e.jsxs(qn,{children:[e.jsx(Io,{user:p.user||g,fallback:n("common.you"),size:"sm"}),e.jsx("span",{children:n("mnemonics.leaderboard.yourBest")})]})]}),e.jsxs(yt,{children:[p.score,"/",p.total]}),e.jsx(yt,{children:Hn(p.elapsedMemorizeMs,n)})]}):null,ie?e.jsx(Pn,{children:n("mnemonics.leaderboard.loading")}):w.length?e.jsx(Np,{children:w.slice(0,10).map(P=>{const Q=P.user||{},he=String((Q==null?void 0:Q._id)||"")===String((g==null?void 0:g._id)||(g==null?void 0:g.id)||"");return e.jsxs(Rn,{$highlight:he,children:[e.jsxs(An,{children:["#",P.rank]}),e.jsxs(_n,{children:[e.jsx(Dn,{children:Q!=null&&Q.avatar?e.jsx("img",{src:Q.avatar,alt:Q.nickname||Q.username||"U"}):((Q==null?void 0:Q.nickname)||(Q==null?void 0:Q.username)||"U").slice(0,1).toUpperCase()}),e.jsxs(qn,{children:[e.jsx(Io,{user:Q,fallback:"User",size:"sm"}),e.jsxs("span",{children:[P.accuracy,"%"]})]})]}),e.jsxs(yt,{children:[P.score,"/",P.total]}),e.jsx(yt,{children:Hn(P.elapsedMemorizeMs,n)})]},`${P.rank}-${(Q==null?void 0:Q._id)||"guest"}`)})}):e.jsx(Pn,{children:n("mnemonics.leaderboard.empty")})]})},X=()=>e.jsxs(Ap,{children:[fe(),e.jsx(Dp,{children:n(i==="digits"?"mnemonics.numbers.title":"mnemonics.words.title")}),e.jsxs(qp,{children:[e.jsxs(ft,{children:[e.jsx(bt,{children:n(i==="digits"?"mnemonics.fields.digitsToMemorize":"mnemonics.fields.wordsToMemorize")}),e.jsx(vt,{type:"number",min:"1",max:kt,value:E,onChange:L=>T(L.target.value)})]}),e.jsxs(ft,{children:[e.jsx(bt,{children:n("mnemonics.fields.maxMemorizationTime")}),e.jsx(vt,{type:"number",min:"5",max:"3600",value:R,onChange:L=>$(L.target.value)})]}),e.jsxs(ft,{children:[e.jsx(bt,{children:n("mnemonics.fields.maxRecallTime")}),e.jsx(vt,{type:"number",min:"5",max:"3600",value:B,onChange:L=>D(L.target.value)})]}),e.jsxs(ft,{children:[e.jsx(bt,{children:n("mnemonics.fields.autoAdvanceTotalTime")}),e.jsx(vt,{type:"number",min:"1",max:"3600",placeholder:n("mnemonics.fields.optional"),value:m,onChange:L=>M(L.target.value)})]})]}),e.jsx(Pp,{children:i==="digits"?n("mnemonics.setupHintDigits",{count:kt}):n("mnemonics.setupHintWords",{count:kt,total:Mp})}),e.jsx(Mn,{children:e.jsx(jt,{type:"button",onClick:ze,children:n("mnemonics.actions.start")})})]}),ce=()=>e.jsxs(e.Fragment,{children:[e.jsx(On,{children:H.map((L,A)=>e.jsxs("div",{ref:oe=>{S.current[A]=oe},children:[e.jsx(co,{children:A+1}),e.jsx(En,{$active:A===x,children:L})]},`digit-memorize-${A}`))}),e.jsx(Up,{children:e.jsx(Kp,{children:de})})]}),U=()=>e.jsx(Zp,{children:le.map((L,A)=>e.jsx(ex,{children:L.map((oe,ue)=>{const u=A*10+ue;return e.jsxs(rx,{$active:u===x,children:[e.jsxs("span",{children:[u+1,"."]}),e.jsx("strong",{children:oe})]},`${oe}-${u}`)})},`word-column-${A}`))}),re=()=>e.jsx(tx,{children:pe.map((L,A)=>e.jsx("div",{children:L.map((oe,ue)=>{const u=A*10+ue;return e.jsxs(ox,{children:[e.jsxs(co,{children:[u+1,"."]}),e.jsx(nx,{type:"text",value:oe,$active:u===x,onFocus:()=>k(u),onChange:b=>{const P=b.target.value;f(Q=>{const he=[...Q];return he[u]=P,he})}})]},`word-input-${u}`)})},`recall-column-${A}`))}),be=()=>i==="digits"?e.jsxs(e.Fragment,{children:[e.jsx(On,{children:v.map((L,A)=>e.jsxs("div",{ref:oe=>{S.current[A]=oe},children:[e.jsx(co,{children:A+1}),e.jsx(En,{$active:A===x,children:L||""})]},`digit-recall-${A}`))}),e.jsxs(Fn,{children:[Array.from({length:10},(L,A)=>e.jsx(pr,{type:"button",onClick:()=>O(A),children:A},A)),e.jsx(pr,{type:"button",onClick:()=>q(-1),children:e.jsx(uo,{size:22})}),e.jsx(pr,{type:"button",onClick:()=>q(1),children:e.jsx(ho,{size:22})}),e.jsx(pr,{type:"button",onClick:se,children:n("mnemonics.actions.clear")})]})]}):re(),Re=()=>e.jsxs(ax,{children:[e.jsx(sx,{$wide:i==="words",children:ge.expected.map((L,A)=>{const oe=i==="words"?St(ge.actual[A])===St(L):ge.actual[A]===L;return e.jsxs(ix,{$correct:oe,$wide:i==="words",children:[e.jsx("span",{children:L}),e.jsx("span",{children:ge.actual[A]||""})]},`result-${A}`)})}),e.jsx(Mn,{children:e.jsx(jt,{type:"button",onClick:we,children:n("mnemonics.actions.continue")})})]}),Ae=()=>{const L=(Y/1e3).toFixed(2),A=h==="prepare-memorize"?[{label:n("mnemonics.stage.memorizationStartsIn"),value:zt(z)}]:h==="memorize"?[{label:n("mnemonics.stage.memorizationEndsIn"),value:zt(z)}]:h==="prepare-recall"?[{label:n("mnemonics.stage.time"),value:`${L} ${n("mnemonics.secondsShort")}`},{label:n("mnemonics.stage.recallStartsIn"),value:zt(z)}]:h==="recall"?[{label:n("mnemonics.stage.time"),value:`${L} ${n("mnemonics.secondsShort")}`},{label:n("mnemonics.stage.recallEndsIn"),value:zt(z)}]:[{label:n("mnemonics.stage.score"),value:(ge==null?void 0:ge.score)??0},{label:n("mnemonics.stage.time"),value:`${L} ${n("mnemonics.secondsShort")}`},{label:n("mnemonics.stage.completed"),value:n("mnemonics.stage.done")}];return e.jsxs(Wp,{children:[e.jsxs(Gp,{children:[e.jsx(Qp,{children:n(i==="digits"?"mnemonics.modes.digits":"mnemonics.modes.words")}),e.jsx(Yp,{children:A.map(oe=>e.jsxs("div",{children:[oe.label,": ",e.jsx(Jp,{children:oe.value})]},oe.label))}),h==="prepare-memorize"||h==="prepare-recall"?e.jsx(jt,{type:"button",onClick:ve,children:n("mnemonics.actions.skip")}):h==="result"?e.jsx(jt,{type:"button",onClick:we,children:n("mnemonics.actions.continue")}):e.jsxs(Xp,{type:"button",onClick:h==="recall"?ye:Se,children:[e.jsx(Pa,{size:18}),n("mnemonics.actions.finished")]})]}),e.jsxs(Vp,{children:[h==="memorize"&&(i==="digits"?ce():U()),h==="recall"&&be(),h==="result"&&Re()]}),h==="memorize"&&e.jsxs(Fn,{children:[e.jsx(pr,{type:"button",onClick:()=>q(-1),disabled:x===0,children:e.jsx(uo,{size:22})}),e.jsx(pr,{type:"button",onClick:()=>q(1),disabled:x===H.length-1,children:e.jsx(ho,{size:22})})]})]})};return e.jsxs(Rp,{children:[e.jsx(mr,{title:n("mnemonics.title"),onBack:r,rightContent:e.jsx(Be,{type:"button",onClick:()=>xe(!0),children:e.jsx(bo,{size:16})})}),fe(),$e(),te&&e.jsx(Zn,{onClick:W,$zIndex:10030,children:e.jsxs(ea,{role:"dialog","aria-modal":"true",$width:h==="setup"?"min(100%, 760px)":"min(100%, 1320px)",$maxHeight:"92vh",$mobileFull:!0,onClick:L=>L.stopPropagation(),children:[e.jsxs(ra,{children:[e.jsxs(Wa,{children:[e.jsx(ta,{children:n("mnemonics.title")}),e.jsx(Ga,{children:n(h==="setup"?"mnemonics.description":i==="digits"?"mnemonics.numbers.title":"mnemonics.words.title")})]}),e.jsx(oa,{type:"button",onClick:W,children:e.jsx(Ie,{size:18})})]}),e.jsx(na,{$padding:h==="setup"?"16px":"16px 16px 20px",children:h==="setup"?X():Ae()})]})})]})},cx=t.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  background-color: var(--background-color);
`,dx=t.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`,px=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 100px;
  color: var(--text-muted-color);
  opacity: 0.8;
  text-align: center;
`,xx=t.div`
  margin-bottom: 16px;
  font-size: 48px;
`,ux=t.h2`
  margin: 0 0 8px;
  color: var(--text-color);
`,hx=t.p`
  max-width: 400px;
  margin: 0;
`,gx=({activeTab:r="tests",initialId:n,onBack:s})=>{const{t:c}=Mr();return e.jsx(cx,{children:e.jsxs(dx,{children:[r==="tests"&&e.jsx(ha,{initialTestId:n,onBack:s}),r==="flashcards"&&e.jsx(ma,{initialDeckId:n,onBack:s}),r==="sentenceBuilders"&&e.jsx(ya,{initialDeckId:n,onBack:s}),r==="battles"&&e.jsx(va,{initialRoomId:n,onBack:s}),r==="mnemonics"&&e.jsx(ka,{onBack:s}),!r&&e.jsxs(px,{children:[e.jsx(xx,{children:"🏟️"}),e.jsx(ux,{children:c("arena.dashboard.welcomeTitle")}),e.jsx(hx,{children:c("arena.dashboard.welcomeDescription")})]})]})})},zx=Object.freeze(Object.defineProperty({__proto__:null,ArenaDashboard:gx,ArenaHeader:mr,ArenaResultsPane:jo,BattleHistoryDialog:fa,BattleHistoryList:zd,BattleLobby:va,CreateBattleDialog:ba,CreateFlashcardDialog:ga,CreateSentenceBuilderDialog:da,CreateTestDialog:pa,FlashcardList:ma,MnemonicsPanel:ka,SentenceBuilderList:ya,ShareLinksDialog:ko,SoloTestPlayer:ca,TestList:ha,TestResultsDialog:ua},Symbol.toStringTag,{value:"Module"}));export{wx as A,yo as C,Be as S,Io as U,gs as a,Ja as b,fs as c,ca as d,ms as f,zx as i};
