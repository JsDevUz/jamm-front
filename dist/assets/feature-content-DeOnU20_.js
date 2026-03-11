import{r as c,j as e,I as le,R as fe,z as te,e as ce,a as be}from"./react-vendor-UYnqoc53.js";import{X as Z,ax as ae,ay as ve,d as o,m as X,a1 as bt,az as vt,K as we,aA as wt,aB as yt,aC as it,aD as at,aE as jt,aF as kt,aG as $t,aH as Ct,aI as zt,aJ as $e,P as st,o as Pt,aK as lt,aL as ct,H as St,N as It,aM as Tt,y as _t,q as Mt}from"./ui-vendor-DFyM_Xd9.js";import{d as ye}from"./vendor-CRWlb9wI.js";import{a as M,u as de}from"./feature-admin-D0NNr8sf.js";import{S as ee,U as xe,C as Rt}from"./feature-arena-BvqxMZzZ.js";import{k as Ce,A as W,l as ne,m as Bt}from"./feature-app-ICtyfBrQ.js";import{S as Ft,a as Q,b as At,f as Lt}from"./feature-chats-DsVJGdS1.js";const Et=async(t="foryou",r=1,n=10)=>{const{data:s}=await M.get(`/posts/feed?type=${t}&page=${r}&limit=${n}`);return s},Dt=async t=>{const{data:r}=await M.post("/posts",{content:t});return r},Ht=async(t,r)=>{const{data:n}=await M.patch(`/posts/${t}`,{content:r});return n},Yt=async t=>{await M.delete(`/posts/${t}`)},qt=async t=>{const{data:r}=await M.post(`/posts/${t}/like`);return r},Ot=async t=>{const{data:r}=await M.post(`/posts/${t}/view`);return r},Wt=async({postId:t,content:r})=>{const{data:n}=await M.post(`/posts/${t}/comments`,{content:r});return n},Kt=async({postId:t,commentId:r,content:n,replyToUser:s})=>{const{data:i}=await M.post(`/posts/${t}/comments/${r}/reply`,{content:n,replyToUser:s});return i},Nt=async(t,r=1,n=10)=>{const{data:s}=await M.get(`/posts/${t}/comments?page=${r}&limit=${n}`);return s},Qt=async t=>{const{data:r}=await M.get(`/posts/user/${t}`);return r},Gt=async()=>{const{data:t}=await M.get("/posts/liked");return t},Jt=async t=>{const{data:r}=await M.post(`/users/${t}/follow`);return r},Ut=async t=>{const{data:r}=await M.get(`/users/${t}/profile`);return r},dt=c.createContext(),xt=()=>c.useContext(dt),Qn=({children:t})=>{const[r,n]=c.useState([]),[s,i]=c.useState(1),[x,h]=c.useState(!0),[$,a]=c.useState([]),[T,C]=c.useState(1),[F,j]=c.useState(!0),[A,S]=c.useState([]),[_,m]=c.useState(!1),v=c.useCallback(async(y="foryou",g=1)=>{g===1&&m(!0);try{const I=await Et(y,g,10),B=I.data||[],Y=I.totalPages||1;y==="foryou"?(n(D=>g===1?B:[...D,...B]),i(g),h(g<Y)):(a(D=>g===1?B:[...D,...B]),C(g),j(g<Y))}catch(I){console.error("fetchFeed error:",I)}finally{g===1&&m(!1)}},[]),b=c.useCallback(async y=>{try{const g=await Dt(y);return n(I=>[g,...I]),g}catch(g){return console.error("createPost error:",g),null}},[]),z=c.useCallback(async(y,g)=>{try{const I=await Ht(y,g),B=Y=>Y.map(D=>D._id===y?{...D,...I}:D);return n(B),a(B),S(B),I}catch(I){throw console.error("editPost error:",I),I}},[]),P=c.useCallback(async y=>{try{const{liked:g,likes:I}=await qt(y),B=Y=>Y.map(D=>D._id===y?{...D,liked:g,likes:I}:D);n(B),a(B),S(B)}catch(g){console.error("likePost error:",g)}},[]),f=c.useCallback(async y=>{try{const{views:g}=await Ot(y),I=B=>B.map(Y=>Y._id===y?{...Y,views:g,previouslySeen:!0}:Y);n(I),a(I),S(I)}catch(g){console.error("viewPost error:",g)}},[]),l=c.useCallback(async(y,g)=>{try{const{comments:I}=await Wt({postId:y,content:g}),B=Y=>Y.map(D=>D._id===y?{...D,comments:I}:D);n(B),a(B),S(B)}catch(I){console.error("addComment error:",I)}},[]),d=c.useCallback(async(y,g=1,I=10)=>{try{return await Nt(y,g,I)}catch(B){return console.error("getComments error:",B),[]}},[]),p=c.useCallback(async(y,g,I,B)=>{try{return await Kt({postId:y,commentId:g,content:I,replyToUser:B})}catch(Y){return console.error("addReply error:",Y),null}},[]),u=c.useCallback(async y=>{try{const g=await Qt(y);return S(g),g}catch(g){return console.error("fetchUserPosts error:",g),[]}},[]),w=c.useCallback(async y=>{try{await Yt(y);const g=I=>I.filter(B=>B._id!==y);n(g),a(g),S(g)}catch(g){console.error("deletePost error:",g)}},[]),R=c.useCallback(async()=>{try{return await Gt()}catch(y){return console.error("fetchLikedPosts error:",y),[]}},[]),L=c.useCallback(async y=>{try{return await Jt(y)}catch(g){return console.error("toggleFollow error:",g),null}},[]),q=c.useCallback(async y=>{try{return await Ut(y)}catch(g){return console.error("getPublicProfile error:",g),null}},[]),O={forYouPosts:r,forYouPage:s,forYouHasMore:x,followingPosts:$,followingPage:T,followingHasMore:F,userPosts:A,loading:_,fetchFeed:v,createPost:b,editPost:z,likePost:P,viewPost:f,addComment:l,getComments:d,addReply:p,fetchUserPosts:u,fetchLikedPosts:R,deletePost:w,toggleFollow:L,getPublicProfile:q};return e.jsx(dt.Provider,{value:O,children:t})},ze=async(t=1,r=20)=>{const{data:n}=await M.get(`/blogs?page=${t}&limit=${r}`);return n},Gn=async t=>{const{data:r}=await M.get(`/blogs/user/${t}`);return r},Jn=async()=>{const{data:t}=await M.get("/blogs/liked");return t},Vt=async t=>{const{data:r}=await M.get(`/blogs/${t}`);return r},Xt=async t=>{const{data:r}=await M.get(`/blogs/${t}/content`);return r},Zt=async t=>{const{data:r}=await M.post("/blogs",t);return r},Un=async(t,r)=>{const{data:n}=await M.patch(`/blogs/${t}`,r);return n},Vn=async t=>{const{data:r}=await M.delete(`/blogs/${t}`);return r},eo=async t=>{const{data:r}=await M.post(`/blogs/${t}/like`);return r},to=async t=>{const{data:r}=await M.post(`/blogs/${t}/view`);return r},Pe=async(t,r=1,n=10)=>{const{data:s}=await M.get(`/blogs/${t}/comments?page=${r}&limit=${n}`);return s},oo=async({blogId:t,content:r})=>{const{data:n}=await M.post(`/blogs/${t}/comments`,{content:r});return n},ro=async({blogId:t,commentId:r,content:n,replyToUser:s})=>{const{data:i}=await M.post(`/blogs/${t}/comments/${r}/reply`,{content:n,replyToUser:s});return i},no=async t=>{const r=new FormData;r.append("file",t);const{data:n}=await M.post("/blogs/upload-image",r);return n},io=X`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`,ao=o.div`
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
`,so=o.div`
  width: min(100%, 560px);
  height: min(82vh, 760px);
  background: var(--secondary-color);
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -16px 60px rgba(15, 23, 42, 0.28);
  animation: ${io} 0.2s ease;

  @media (min-width: 720px) {
    height: min(78vh, 760px);
    border-radius: 24px;
  }
`,lo=o.div`
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`,co=o.div`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`;o.button`
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
`;const xo=o.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`,Se=o.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`,Ie=o.div`
  width: ${t=>t.size||38}px;
  height: ${t=>t.size||38}px;
  min-width: ${t=>t.size||38}px;
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
`,Te=o.div`
  flex: 1;
  min-width: 0;
`,_e=o.div`
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 12px 14px;
`,Me=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Re=o.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 6px;
`,Be=o.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Fe=o.div`
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
`,Ae=o.button`
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
`,po=o.div`
  margin-top: 10px;
  margin-left: 8px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
`,ho=o.div`
  border-top: 1px solid var(--border-color);
  padding: 14px 18px 18px;
  background: var(--secondary-color);
`,mo=o.div`
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--hover-color);
  color: var(--text-muted-color);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,uo=o.form`
  display: flex;
  gap: 10px;
  align-items: center;
`,go=o.input`
  flex: 1;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 16px;
  outline: none;
`,fo=o.button`
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
  opacity: ${t=>t.disabled?.45:1};
  pointer-events: ${t=>t.disabled?"none":"auto"};
`,pe=o.div`
  padding: 48px 0;
  text-align: center;
  color: var(--text-muted-color);
`,Le=t=>{const r=Date.now()-new Date(t).getTime(),n=Math.floor(r/6e4);if(n<1)return"Hozir";if(n<60)return`${n}d`;const s=Math.floor(n/60);if(s<24)return`${s}s`;const i=Math.floor(s/24);return i<7?`${i}k`:ye(t).format("D MMM")},Ee=t=>(t||"U").charAt(0).toUpperCase(),pt=({blog:t,onClose:r,onCommentsCountChange:n})=>{de(f=>f.user);const[s,i]=c.useState([]),[x,h]=c.useState(1),[$,a]=c.useState(!0),[T,C]=c.useState(!0),[F,j]=c.useState(""),[A,S]=c.useState(!1),[_,m]=c.useState(null),v=c.useRef(null),b=async(f=1)=>{const l=await Pe(t._id,f,10),d=(l==null?void 0:l.data)||[];return i(d),h(f),a(f<((l==null?void 0:l.totalPages)||1)),l};c.useEffect(()=>{if(!(t!=null&&t._id))return;(async()=>{C(!0);try{await b(1)}finally{C(!1)}})()},[t==null?void 0:t._id]);const z=async()=>{const f=x+1,l=await Pe(t._id,f,10);i(d=>[...d,...(l==null?void 0:l.data)||[]]),h(f),a(f<((l==null?void 0:l.totalPages)||1))},P=async f=>{if(f.preventDefault(),!(!F.trim()||A)){S(!0);try{if(_)await ro({blogId:t._id,commentId:_.commentId,content:F.trim(),replyToUser:_.nickname}),await b(1),m(null);else{const l=await oo({blogId:t._id,content:F.trim()});await b(1),n==null||n((l==null?void 0:l.comments)||s.length+1)}j("")}finally{S(!1)}}};return t?e.jsx(ao,{onClick:r,children:e.jsxs(so,{onClick:f=>f.stopPropagation(),children:[e.jsxs(lo,{children:[e.jsx(co,{children:"Blog izohlari"}),e.jsx(ee,{onClick:r,children:e.jsx(Z,{size:18})})]}),e.jsx(xo,{id:"blog-comments-scroll",children:e.jsx(le,{dataLength:s.length,next:z,hasMore:$,loader:e.jsx(pe,{children:"Yuklanmoqda..."}),scrollableTarget:"blog-comments-scroll",style:{overflow:"visible"},children:T&&s.length===0?e.jsx(pe,{children:"Yuklanmoqda..."}):s.length===0?e.jsx(pe,{children:"Hali izoh yo'q."}):s.map(f=>{var p;const l=f.user||{},d=l.nickname||l.username||"Foydalanuvchi";return e.jsxs(Se,{children:[e.jsx(Ie,{children:l.avatar?e.jsx("img",{src:l.avatar,alt:d}):Ee(d)}),e.jsxs(Te,{children:[e.jsxs(_e,{children:[e.jsxs(Me,{children:[e.jsx(Re,{children:e.jsx(xe,{user:l,fallback:"Foydalanuvchi"})}),e.jsx(Be,{children:Le(f.createdAt)})]}),e.jsx(Fe,{children:f.content})]}),e.jsxs(Ae,{onClick:()=>{m({commentId:f._id,nickname:d}),setTimeout(()=>{var u;return(u=v.current)==null?void 0:u.focus()},50)},children:[e.jsx(ae,{size:13}),"Javob"]}),((p=f.replies)==null?void 0:p.length)>0&&e.jsx(po,{children:f.replies.map(u=>{const w=u.user||{},R=w.nickname||w.username||"Foydalanuvchi";return e.jsxs(Se,{children:[e.jsx(Ie,{size:30,children:w.avatar?e.jsx("img",{src:w.avatar,alt:R}):Ee(R)}),e.jsxs(Te,{children:[e.jsxs(_e,{children:[e.jsxs(Me,{children:[e.jsx(Re,{children:R}),e.jsx(Be,{children:Le(u.createdAt)})]}),e.jsxs(Fe,{children:[u.replyToUser?`@${u.replyToUser} `:"",u.content]})]}),e.jsxs(Ae,{onClick:()=>{m({commentId:f._id,nickname:R}),setTimeout(()=>{var L;return(L=v.current)==null?void 0:L.focus()},50)},children:[e.jsx(ae,{size:13}),"Javob"]})]})]},u._id)})})]})]},f._id)})})}),e.jsxs(ho,{children:[_&&e.jsxs(mo,{children:[e.jsxs("span",{children:["@",_.nickname," ga javob"]}),e.jsx(ee,{onClick:()=>m(null),children:e.jsx(Z,{size:14})})]}),e.jsxs(uo,{onSubmit:P,children:[e.jsx(go,{ref:v,value:F,onChange:f=>j(f.target.value),placeholder:_?`@${_.nickname} ga yozing`:"Izoh yozing"}),e.jsx(fo,{type:"submit",disabled:!F.trim()||A,children:e.jsx(ve,{size:16})})]})]})]})}):null},bo=o.div`
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
`,vo=o.button`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`,wo=o.button`
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
`,yo=o.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`,jo=o.details`
  margin: 0 0 1.2em;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
`,ko=o.summary`
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
`,$o=o.div`
  padding: 1rem 1rem 0.2rem;
`,Co=/(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|_([^_]+)_)/g,se=(t,r)=>{if(!t)return null;const n=[];let s=0,i,x=0;for(;(i=Co.exec(t))!==null;)i.index>s&&n.push(e.jsx(fe.Fragment,{children:t.slice(s,i.index)},`${r}-${x++}`)),i[2]&&i[3]?n.push(e.jsx("a",{href:i[3],target:"_blank",rel:"noreferrer",children:i[2]},`${r}-${x++}`)):i[4]?n.push(e.jsx("code",{children:i[4]},`${r}-${x++}`)):i[5]?n.push(e.jsx("strong",{children:i[5]},`${r}-${x++}`)):i[6]&&n.push(e.jsx("em",{children:i[6]},`${r}-${x++}`)),s=i.index+i[0].length;return s<t.length&&n.push(e.jsx(fe.Fragment,{children:t.slice(s)},`${r}-${x++}`)),n},G=(t,r,n)=>{if(!t.length)return;const s=t.join(" ");r.push(e.jsx("p",{children:se(s,"p")},`p-${n.current++}`)),t.length=0},N=(t,r,n)=>{if(!t.items.length)return;const s=t.type==="ol"?"ol":"ul";r.push(e.jsx(s,{children:t.items.map((i,x)=>e.jsx("li",{children:se(i,`${t.type}-${x}`)},`${t.type}-${x}`))},`list-${n.current++}`)),t.type=null,t.items=[]},De=(t,r,n,s)=>{if(!t.active)return;const i=ht(t.lines.join(`
`),s);r.push(e.jsxs(jo,{children:[e.jsx(ko,{children:t.title||"Dropdown"}),e.jsx($o,{children:i})]},`dropdown-${n.current++}`)),t.active=!1,t.title="",t.lines=[]},ht=(t,r={})=>{const{onImageClick:n}=r,s=String(t||"").replace(/\r\n/g,`
`).split(`
`),i=[],x=[],h={type:null,items:[]},$={active:!1,title:"",lines:[]},a={current:0};let T=!1,C=[];return s.forEach(F=>{const j=F.trim();if(j.startsWith(":::dropdown")){G(x,i,a),N(h,i,a),$.active=!0,$.title=j.replace(":::dropdown","").trim(),$.lines=[];return}if(j===":::"&&$.active){G(x,i,a),N(h,i,a),De($,i,a,r);return}if($.active){$.lines.push(F);return}if(j.startsWith("```")){G(x,i,a),N(h,i,a),T?(i.push(e.jsx("pre",{children:e.jsx("code",{children:C.join(`
`)})},`code-${a.current++}`)),C=[],T=!1):T=!0;return}if(T){C.push(F);return}if(!j){G(x,i,a),N(h,i,a);return}const A=j.match(/^(#{1,3})\s+(.*)$/);if(A){G(x,i,a),N(h,i,a);const z=`h${A[1].length}`;i.push(e.jsx(z,{children:se(A[2],`h-${a.current}`)},`h-${a.current++}`));return}const S=j.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);if(S){G(x,i,a),N(h,i,a);const b=S[2],z=S[1]||"Blog image",P=e.jsx("img",{src:b,alt:z},`img-node-${a.current}`);i.push(n?e.jsx(vo,{type:"button",onClick:()=>n({src:b,alt:z}),"aria-label":"Rasmni kattalashtirish",children:P},`img-${a.current++}`):fe.cloneElement(P,{key:`img-${a.current++}`}));return}if(/^---+$/.test(j)){G(x,i,a),N(h,i,a),i.push(e.jsx("hr",{},`hr-${a.current++}`));return}const _=j.match(/^>\s?(.*)$/);if(_){G(x,i,a),N(h,i,a),i.push(e.jsx("blockquote",{children:se(_[1],`quote-${a.current}`)},`quote-${a.current++}`));return}const m=j.match(/^\d+\.\s+(.*)$/);if(m){G(x,i,a),h.type&&h.type!=="ol"&&N(h,i,a),h.type="ol",h.items.push(m[1]);return}const v=j.match(/^[-*]\s+(.*)$/);if(v){G(x,i,a),h.type&&h.type!=="ul"&&N(h,i,a),h.type="ul",h.items.push(v[1]);return}N(h,i,a),x.push(j)}),G(x,i,a),N(h,i,a),De($,i,a,r),T&&C.length&&i.push(e.jsx("pre",{children:e.jsx("code",{children:C.join(`
`)})},`code-${a.current++}`)),i},je=({content:t,className:r,enableImageLightbox:n=!1})=>{const[s,i]=c.useState(null);return c.useEffect(()=>{if(!s)return;const x=h=>{h.key==="Escape"&&i(null)};return window.addEventListener("keydown",x),()=>window.removeEventListener("keydown",x)},[s]),e.jsxs(e.Fragment,{children:[e.jsx(bo,{className:r,children:ht(t,{onImageClick:n?i:null})}),s&&e.jsx(wo,{type:"button",onClick:()=>i(null),"aria-label":"Rasmni yopish",children:e.jsx(yo,{src:s.src,alt:s.alt||"Blog image"})})]})},zo=X`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,Po=X`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,So=o.div`
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
  animation: ${zo} 0.18s ease-out;

  @media (min-width: 960px) {
    padding: 28px;
  }

  @media (max-width: 640px) {
    padding: 0;
  }
`,Io=o.div`
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
  animation: ${Po} 0.22s ease-out;

  @media (max-width: 640px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`,To=o.div`
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
`,_o=o.div`
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
`,Mo=o.div`
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
`,Ro=o.div`
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
`,he=o.button`
  min-width: 0;
  border: none;
  background: ${t=>t.active?"color-mix(in srgb, var(--blog-editor-surface) 82%, white 18%)":"transparent"};
  color: ${t=>t.active?"var(--blog-editor-text)":"var(--blog-editor-muted)"};
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
`,Bo=o.button`
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
`,Fo=o.button`
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
  opacity: ${t=>t.disabled?.55:1};
  pointer-events: ${t=>t.disabled?"none":"auto"};

  @media (max-width: 820px) {
    width: 100%;
  }
`,Ao=o.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${t=>t.mode==="split"?"minmax(0, 1.1fr) minmax(0, 0.9fr)":"1fr"};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`,Lo=o.div`
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: ${t=>t.mode==="preview"?"none":(t.mode==="write","flex")};
  flex-direction: column;
  background: color-mix(in srgb, var(--blog-editor-surface) 82%, transparent);
`,Eo=o.div`
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: ${t=>t.mode==="write"?"none":(t.mode==="preview","block")};

  border-left: ${t=>t.mode==="split"?"1px solid var(--blog-editor-border)":"none"};
  overflow-y: auto;

  @media (max-width: 960px) {
    border-left: none;
  }
`,Do=o.div`
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
`,J=o.button`
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
`,Ho=o.div`
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 22px;

  @media (max-width: 640px) {
    padding: 14px 12px 24px;
  }
`,Yo=o.div`
  display: grid;
  gap: 16px;
  min-width: 0;
  box-sizing: border-box;
`,oe=o.label`
  display: grid;
  gap: 8px;
  min-width: 0;
  color: var(--blog-editor-muted);
  font-size: 13px;
  font-weight: 700;
`,He=o.input`
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
`,Ye=o.textarea`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  min-height: ${t=>t.minHeight||"120px"};
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
`,qo=o.button`
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
`,Oo=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
  gap: 10px;
  color: var(--blog-editor-text);
`,Wo=o.div`
  max-width: 880px;
  min-width: 0;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 36px 28px 60px;

  @media (max-width: 640px) {
    padding: 18px 14px 36px;
  }
`,Ko=o.div`
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
`,No=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`,Qo=o.span`
  padding: 7px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--blog-editor-primary) 16%, transparent);
  color: color-mix(in srgb, var(--blog-editor-primary) 76%, white 24%);
  font-size: 12px;
  font-weight: 700;
`,qe=t=>({title:(t==null?void 0:t.title)||"",excerpt:(t==null?void 0:t.excerpt)||"",coverImage:(t==null?void 0:t.coverImage)||"",tags:Array.isArray(t==null?void 0:t.tags)?t.tags.join(", "):"",markdown:(t==null?void 0:t.markdown)||""}),mt=({isOpen:t,onClose:r,onSubmit:n,initialBlog:s,saving:i})=>{const x=de(d=>d.user),[h,$]=c.useState(window.innerWidth<=960?"write":"split"),[a,T]=c.useState(qe(s)),[C,F]=c.useState(!1),j=c.useRef(null),A=c.useRef(null),S=c.useRef(null);if(c.useEffect(()=>{t&&T(qe(s))},[s,t]),!t)return null;const _=a.tags.split(",").map(d=>d.trim()).filter(Boolean),m=Ce(x)?W.blogWordsPremium:W.blogWordsOrdinary,v=Ce(x)?W.blogImagesPremium:W.blogImagesOrdinary,b=(d,p)=>T(u=>({...u,[d]:p})),z=(d,p="",u="")=>{const w=j.current;if(!w)return;const R=w.selectionStart,L=w.selectionEnd,q=a.markdown.slice(R,L)||u,O=a.markdown.slice(0,R)+d+q+p+a.markdown.slice(L);b("markdown",O),requestAnimationFrame(()=>{w.focus();const y=R+d.length+q.length+p.length;w.setSelectionRange(y,y)})},P=d=>{const p=j.current;if(!p)return;const u=p.selectionStart,w=a.markdown.slice(0,u)+d+a.markdown.slice(u);b("markdown",w),requestAnimationFrame(()=>{p.focus();const R=u+d.length;p.setSelectionRange(R,R)})},f=async(d,p)=>{if(d){F(!0);try{const u=await no(d);if(!(u!=null&&u.url))throw new Error("Upload failed");p==="cover"?b("coverImage",u.url):P(`
![${d.name}](${u.url})
`)}catch{te.error("Rasmni yuklab bo'lmadi")}finally{F(!1)}}},l=async()=>{if(!a.title.trim()){te.error("Sarlavha kiriting");return}if(!a.markdown.trim()){te.error("Blog matni bo'sh bo'lmasin");return}if(ne(a.markdown)>m){te.error(`Blog matni maksimal ${m} ta so'z bo'lishi kerak`);return}if(Bt(a.markdown)+(a.coverImage?1:0)>v){te.error(`Har bir blog uchun maksimal ${v} ta rasm ishlatish mumkin`);return}await n({title:a.title.trim(),excerpt:a.excerpt.trim(),coverImage:a.coverImage,tags:_,markdown:a.markdown})};return e.jsx(So,{onClick:r,children:e.jsxs(Io,{onClick:d=>d.stopPropagation(),children:[e.jsxs(To,{children:[e.jsxs(_o,{children:[e.jsx("h3",{children:s!=null&&s._id?"Blogni tahrirlash":"Yangi blog"}),e.jsx("p",{children:"Medium uslubidagi markdown editor: cover, inline image, preview va publish."})]}),e.jsxs(Mo,{children:[e.jsxs(Ro,{children:[e.jsxs(he,{active:h==="write",onClick:()=>$("write"),children:[e.jsx(bt,{size:14}),"Write"]}),e.jsxs(he,{active:h==="split",onClick:()=>$("split"),children:[e.jsx(vt,{size:14}),"Split"]}),e.jsxs(he,{active:h==="preview",onClick:()=>$("preview"),children:[e.jsx(we,{size:14}),"Preview"]})]}),e.jsx(Fo,{disabled:i||C,onClick:l,children:i?"Saqlanmoqda...":s!=null&&s._id?"Yangilash":"Publish"}),e.jsx(Bo,{onClick:r,children:e.jsx(Z,{size:18})})]})]}),e.jsxs(Ao,{mode:h,children:[e.jsxs(Lo,{mode:h,children:[e.jsxs(Do,{children:[e.jsx(J,{onClick:()=>P("# "),children:e.jsx(wt,{size:16})}),e.jsx(J,{onClick:()=>P("## "),children:e.jsx(yt,{size:16})}),e.jsx(J,{onClick:()=>z("**","**","Qalin"),children:e.jsx(it,{size:16})}),e.jsx(J,{onClick:()=>z("_","_","Kursiv"),children:e.jsx(at,{size:16})}),e.jsx(J,{onClick:()=>P("- "),children:e.jsx(jt,{size:16})}),e.jsx(J,{onClick:()=>P("1. "),children:e.jsx(kt,{size:16})}),e.jsx(J,{onClick:()=>P("> "),children:e.jsx($t,{size:16})}),e.jsx(J,{onClick:()=>P(`
:::dropdown Dropdown sarlavhasi
Bu yerga yashirin kontent yoziladi.
:::
`),children:e.jsx(Ct,{size:16})}),e.jsx(J,{onClick:()=>z("\n```txt\n","\n```\n","Kod bloki"),children:e.jsx(zt,{size:16})}),e.jsxs(J,{onClick:()=>{var d;return(d=S.current)==null?void 0:d.click()},children:[e.jsx($e,{size:16}),"Rasm"]})]}),e.jsx(Ho,{children:e.jsxs(Yo,{children:[e.jsxs(oe,{children:["Cover image",e.jsx(qo,{onClick:()=>{var d;return(d=A.current)==null?void 0:d.click()},children:a.coverImage?e.jsx("img",{src:a.coverImage,alt:"Blog cover"}):e.jsxs(Oo,{children:[e.jsx($e,{size:28}),e.jsx("span",{children:C?"Yuklanmoqda...":"Cover rasm yuklash uchun bosing"})]})})]}),e.jsxs(oe,{children:["Sarlavha",e.jsx(He,{value:a.title,onChange:d=>b("title",d.target.value.slice(0,W.blogTitleChars)),placeholder:"Masalan: Design systems nega chiroyli bo'lmaydi?",maxLength:W.blogTitleChars})]}),e.jsxs(oe,{children:["Qisqa tavsif",e.jsx(Ye,{minHeight:"88px",value:a.excerpt,onChange:d=>b("excerpt",d.target.value.slice(0,W.blogExcerptChars)),placeholder:"Kartochkada ko'rinadigan qisqa intro...",maxLength:W.blogExcerptChars})]}),e.jsxs(oe,{children:["Teglar",e.jsx(He,{value:a.tags,onChange:d=>b("tags",d.target.value.split(",").slice(0,W.blogTagCount).map(p=>p.trim().slice(0,W.blogTagChars)).join(", ")),placeholder:"frontend, product, design"})]}),e.jsxs(oe,{children:["Markdown",e.jsx(Ye,{ref:j,minHeight:"420px",value:a.markdown,onChange:d=>b("markdown",d.target.value),placeholder:`# Birinchi sarlavha

Intro paragraf...

## Bo'lim
- punkt
- yana punkt

![Rasm](https://...)
`})]})]})})]}),e.jsx(Eo,{mode:h,children:e.jsxs(Wo,{children:[e.jsxs(Ko,{children:[a.coverImage?e.jsx("img",{src:a.coverImage,alt:a.title||"Blog cover"}):null,e.jsx("h1",{children:a.title||"Sarlavha shu yerda ko'rinadi"}),e.jsx("p",{children:a.excerpt||"Qisqa tavsif yozilsa shu yerda chiqadi. Preview publish oldidan real ko'rinishni beradi."}),_.length>0&&e.jsx(No,{children:_.map(d=>e.jsxs(Qo,{children:["#",d]},d))})]}),e.jsx(je,{content:a.markdown})]})})]}),e.jsx("input",{ref:A,type:"file",accept:"image/*",hidden:!0,onChange:d=>{var p;return f((p=d.target.files)==null?void 0:p[0],"cover")}}),e.jsx("input",{ref:S,type:"file",accept:"image/*",hidden:!0,onChange:d=>{var p;return f((p=d.target.files)==null?void 0:p[0],"inline")}})]})})},Go=o.div`
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
`,Jo=o.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,Uo=o(Ft)``,Vo=o(ee)``,Xo=o.div`
  flex: 1;
  overflow-y: auto;
`,Zo=o(le)`
  overflow: visible;
`,er=o.button`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-color);
  background: ${t=>t.$active?"var(--active-color)":"transparent"};
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
`,tr=o.div`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  background: var(--input-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,or=o.div`
  flex: 1;
  min-width: 0;
`,rr=o.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 6px;
`,nr=o.div`
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.55;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,ir=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`,ar=o.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted-color);
`,sr=o.div`
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
`,lr=o(Q)`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  margin-bottom: 0;
`,cr=o.div`
  flex: 1;
  min-width: 0;
`,dr=({selectedBlogId:t})=>{const{t:r}=ce(),n=be(),[s,i]=c.useState([]),[x,h]=c.useState(1),[$,a]=c.useState(!0),[T,C]=c.useState(""),[F,j]=c.useState(!0),[A,S]=c.useState(!1),[_,m]=c.useState(!1),v=async()=>{j(!0);try{const l=await ze(1,20);i((l==null?void 0:l.data)||[]),h(1),a(1<((l==null?void 0:l.totalPages)||1))}finally{j(!1)}};c.useEffect(()=>{v()},[]);const b=async()=>{const l=x+1,d=await ze(l,20);i(p=>[...p,...(d==null?void 0:d.data)||[]]),h(l),a(l<((d==null?void 0:d.totalPages)||1))},z=c.useMemo(()=>{if(!T.trim())return s;const l=T.trim().toLowerCase();return s.filter(d=>{var u,w,R,L;const p=((u=d.author)==null?void 0:u.nickname)||((w=d.author)==null?void 0:w.username)||"";return((R=d.title)==null?void 0:R.toLowerCase().includes(l))||((L=d.excerpt)==null?void 0:L.toLowerCase().includes(l))||p.toLowerCase().includes(l)})},[s,T]),P=async l=>{m(!0);try{const d=await Zt(l);i(p=>[d,...p]),S(!1),n(`/blogs/${d.slug||d._id}`)}finally{m(!1)}},f=(l=6)=>[...Array(l)].map((d,p)=>e.jsxs(sr,{children:[e.jsx(lr,{}),e.jsxs(cr,{children:[e.jsx(Q,{height:"16px",width:p%2===0?"72%":"58%",mb:"6px"}),e.jsx(Q,{height:"12px",width:"92%",mb:"6px"}),e.jsx(Q,{height:"12px",width:p%3===0?"76%":"68%",mb:"12px"}),e.jsx(Q,{height:"12px",width:"60%",mb:"0"})]})]},p));return e.jsxs(Go,{children:[e.jsxs(Jo,{children:[e.jsx(Uo,{placeholder:r("blogs.searchPlaceholder"),value:T,onChange:l=>C(l.target.value)}),e.jsx(Vo,{onClick:()=>S(!0),title:r("blogs.createTitle"),children:e.jsx(st,{size:16})})]}),e.jsx(Xo,{id:"blogs-sidebar-scroll",children:F?e.jsx(e.Fragment,{children:f(1)}):z.length===0?e.jsx(ar,{children:r("blogs.notFound")}):e.jsx(Zo,{dataLength:z.length,next:b,hasMore:$&&!T.trim(),loader:e.jsx(e.Fragment,{children:f(2)}),scrollableTarget:"blogs-sidebar-scroll",children:z.map(l=>{var p,u;const d=l.slug||l._id;return e.jsxs(er,{$active:String(t)===String(d),onClick:()=>n(`/blogs/${d}`),children:[e.jsx(tr,{children:l.coverImage?e.jsx("img",{src:l.coverImage,alt:l.title}):null}),e.jsxs(or,{children:[e.jsx(rr,{children:l.title}),e.jsx(nr,{children:l.excerpt||r("blogs.noExcerpt")}),e.jsxs(ir,{children:[e.jsx("span",{children:((p=l.author)==null?void 0:p.nickname)||((u=l.author)==null?void 0:u.username)||r("blogs.author")}),e.jsxs("span",{children:[l.likes," ",r("common.like")]}),e.jsxs("span",{children:[l.comments," ",r("blogs.comments")]})]})]})]},l._id)})})}),e.jsx(mt,{isOpen:A,onClose:()=>S(!1),onSubmit:P,saving:_})]})},xr=o.div`
  display: flex;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  background: var(--background-color);

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
`,me=o.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);
  text-align: center;
  padding: 40px;
`,pr=o.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 28px 72px;

  @media (max-width: 768px) {
    padding: 18px 16px 96px;
  }
`,hr=o.button`
  display: none;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--input-color) 85%, transparent);
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
`,mr=o.button`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`,ur=o.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 28px;
  margin-bottom: 26px;
`,gr=o.h1`
  margin: 0 0 12px;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  color: var(--text-color);
`,fr=o.p`
  margin: 0 0 16px;
  color: var(--text-secondary-color);
  font-size: 17px;
  line-height: 1.7;
`,br=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  margin-bottom: 20px;
`,vr=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
`,ue=o.button`
  border: 1px solid
    ${t=>t.$active?"var(--danger-color)":"var(--border-color)"};
  background: ${t=>t.$active?"color-mix(in srgb, var(--danger-color) 8%, transparent)":"transparent"};
  color: ${t=>t.$active?"var(--danger-color)":"var(--text-secondary-color)"};
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`,wr=o.div`
  height: 1px;
  background: var(--border-color);
  margin-bottom: 28px;
`,yr=o.button`
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
`,jr=o.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`,kr=({blogIdentifier:t,onBack:r})=>{const{t:n}=ce(),s=be(),i=c.useRef(new Set),[x,h]=c.useState(null),[$,a]=c.useState(""),[T,C]=c.useState(!0),[F,j]=c.useState(!1),[A,S]=c.useState(!1);c.useEffect(()=>{if(!t||t==="0"){h(null),a(""),C(!1);return}(async()=>{C(!0),h(null),a("");try{const[v,b]=await Promise.all([Vt(t),Xt(t)]);if(h(v),a((b==null?void 0:b.content)||""),v.previouslySeen)i.current.add(v._id);else if(!i.current.has(v._id)){i.current.add(v._id);const z=await to(v._id);h(P=>P&&{...P,views:(z==null?void 0:z.views)||P.views,previouslySeen:!0})}}catch{h(null),a("")}finally{C(!1)}})()},[t]),c.useEffect(()=>{if(!(x!=null&&x._id))return;const m=x.slug||x._id,v=window.location.pathname,b=`/blogs/${m}`;v!==b&&window.history.replaceState(null,"",b)},[x==null?void 0:x._id,x==null?void 0:x.slug]);const _=async()=>{if(!(x!=null&&x._id))return;const m=await eo(x._id);h(v=>v&&{...v,...m})};return!t||t==="0"?e.jsx(me,{children:n("blogs.selectToRead")}):T?e.jsx(me,{children:n("common.loading")}):x?e.jsxs(xr,{children:[e.jsxs(pr,{children:[e.jsxs(hr,{onClick:()=>{r==null||r(),s("/blogs")},children:[e.jsx(Pt,{size:16}),n("blogs.backToList")]}),x.coverImage?e.jsx(mr,{type:"button",onClick:()=>S(!0),children:e.jsx(ur,{src:x.coverImage,alt:x.title})}):null,e.jsx(gr,{children:x.title}),x.excerpt?e.jsx(fr,{children:x.excerpt}):null,e.jsxs(br,{children:[e.jsx(xe,{user:x.author,fallback:n("blogs.author"),showPremiumBadge:!1}),e.jsx("span",{children:ye(x.publishedAt||x.createdAt).format("DD MMM YYYY · HH:mm")})]}),e.jsxs(vr,{children:[e.jsxs(ue,{$active:x.liked,onClick:_,children:[e.jsx(lt,{size:16,fill:x.liked?"currentColor":"none"}),x.likes]}),e.jsxs(ue,{onClick:()=>j(!0),children:[e.jsx(ct,{size:16}),x.comments]}),e.jsxs(ue,{as:"div",children:[e.jsx(we,{size:16}),x.views]})]}),e.jsx(wr,{}),e.jsx(je,{content:$,enableImageLightbox:!0})]}),F&&e.jsx(pt,{blog:x,onClose:()=>j(!1),onCommentsCountChange:m=>h(v=>v&&{...v,comments:m})}),A&&x.coverImage&&e.jsx(yr,{type:"button",onClick:()=>S(!1),"aria-label":n("blogs.coverClose"),children:e.jsx(jr,{src:x.coverImage,alt:x.title})})]}):e.jsx(me,{children:n("blogs.notFound")})},Xn=Object.freeze(Object.defineProperty({__proto__:null,BlogComments:pt,BlogEditorDialog:mt,BlogReaderPane:kr,BlogsSidebar:dr,MarkdownRenderer:je},Symbol.toStringTag,{value:"Module"})),$r=/\*\*(.+?)\*\*|_(.+?)_/g,Cr=t=>{if(!t)return"";const r=[];let n=0,s=0,i;for(;(i=$r.exec(t))!==null;)i.index>s&&r.push(e.jsx("span",{children:t.slice(s,i.index)},n++)),i[1]!==void 0?r.push(e.jsx("strong",{children:i[1]},n++)):r.push(e.jsx("em",{children:i[2]},n++)),s=i.index+i[0].length;return s<t.length&&r.push(e.jsx("span",{children:t.slice(s)},n++)),r.length?r:t},zr=X`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`,Pr=X`
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`,Sr=o.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: ${zr} 0.2s ease;
`,Ir=o.div`
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  animation: ${Pr} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
`,Tr=o.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
`,_r=o.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`,Mr=o.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
`,Rr=o.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  font-size: 15px;
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Br=o.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Fr=o.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`,Ar=o.textarea`
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
`,Lr=o.div`
  align-self: flex-end;
  color: ${t=>t.$warn?"var(--danger-color)":"var(--text-muted-color)"};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`,Er=o.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 20px 16px;
`,ge=o.button`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--input-color);
    color: var(--primary-color);
  }
`,Dr=o.div`
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: var(--border-color);
`,Hr=o.div`
  flex: 1;
`,Yr=o.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  border: none;
  border-radius: 20px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  opacity: ${t=>t.disabled?.4:1};
  pointer-events: ${t=>t.disabled?"none":"auto"};
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`,ut=({isOpen:t,onClose:r,onSubmit:n,currentUser:s,initialContent:i="",title:x="Yangi Gurung",submitLabel:h="Yuborish"})=>{const[$,a]=c.useState(""),T=c.useRef(null);c.useEffect(()=>{if(t){a(i||""),setTimeout(()=>{var m;return(m=T.current)==null?void 0:m.focus()},80);return}a("")},[i,t]);const C=async()=>{$.trim()&&(ne($)>W.postWords||(await n($.trim()),r()))},F=m=>{m.key==="Escape"&&r(),(m.metaKey||m.ctrlKey)&&m.key==="Enter"&&C()},j=(m,v="")=>{const b=T.current;if(!b)return;const z=b.selectionStart,P=b.selectionEnd,f=$.slice(z,P),l=$.slice(0,z),d=$.slice(P),p=`${l}${m}${f}${v}${d}`;ne(p)>W.postWords||(a(p),setTimeout(()=>{b.focus(),b.setSelectionRange(z+m.length,P+m.length)},0))};if(!t)return null;const A=(s==null?void 0:s.nickname)||(s==null?void 0:s.username)||"Siz",S=A.charAt(0).toUpperCase(),_=ne($);return e.jsx(Sr,{onClick:m=>m.target===m.currentTarget&&r(),children:e.jsxs(Ir,{children:[e.jsxs(Tr,{children:[e.jsx(_r,{children:x}),e.jsx(ee,{onClick:r,children:e.jsx(Z,{size:18})})]}),e.jsxs(Mr,{children:[e.jsx(Rr,{children:s!=null&&s.avatar?e.jsx("img",{src:s.avatar,alt:A}):S}),e.jsxs(Br,{children:[e.jsx(Fr,{children:A}),e.jsx(Ar,{ref:T,value:$,onChange:m=>{ne(m.target.value)<=W.postWords&&a(m.target.value)},onKeyDown:F,placeholder:"Fikringizni yozing… markdown qo'llab-quvvatlanadi: **qalin**, _kursiv_, #teg",spellCheck:!1}),e.jsxs(Lr,{$warn:_>W.postWords-10,children:[_,"/",W.postWords," so'z"]})]})]}),e.jsxs(Er,{children:[e.jsx(ge,{title:"Qalin (Ctrl+B)",onClick:()=>j("**","**"),children:e.jsx(it,{size:15})}),e.jsx(ge,{title:"Kursiv (Ctrl+I)",onClick:()=>j("_","_"),children:e.jsx(at,{size:15})}),e.jsx(ge,{title:"Teg qo'shish",onClick:()=>j("#"),children:e.jsx(St,{size:15})}),e.jsx(Dr,{}),e.jsx(Hr,{}),e.jsxs(Yr,{disabled:!$.trim(),onClick:C,children:[e.jsx(ve,{size:14}),h]})]})]})})},ke=X`
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`,qr=o.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (min-width: 600px) {
    align-items: center;
  }
`,Or=o.div`
  background: var(--secondary-color);
  width: 100%;
  max-width: 520px;
  height: 85vh;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 40px rgba(0, 0, 0, 0.4);
  animation: ${ke} 0.25s ease;

  @media (min-width: 600px) {
    height: auto;
    max-height: 80vh;
    border-radius: 16px;
  }
`,Wr=o.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Kr=o.span`
  font-weight: 700;
  font-size: 17px;
  color: var(--text-color);
`,Nr=o.div`
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
`,Qr=o(le)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: visible;
`,Oe=o.div`
  text-align: center;
  padding: 16px;
  color: var(--text-muted-color);
  font-size: ${t=>t.$small?"13px":"14px"};
`,Gr=o.div`
  display: flex;
  gap: 12px;
  animation: ${ke} 0.2s ease;
`,We=o.div`
  width: ${t=>t.$size||36}px;
  height: ${t=>t.$size||36}px;
  min-width: ${t=>t.$size||36}px;
  border-radius: 50%;
  background: ${t=>t.$color||"var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${t=>t.$size?Math.floor(t.$size*.38):13}px;
  font-weight: 700;
  color: white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Ke=o.div`
  flex: 1;
  min-width: 0;
`,Jr=o.div`
  background: var(--background-color);
  padding: 10px 14px;
  border-radius: 4px 14px 14px 14px;
`,Ne=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,Qe=o.span`
  font-weight: 700;
  font-size: 13px;
  color: var(--text-color);
`,Ge=o.span`
  font-size: 11px;
  color: var(--text-muted-color);
`,Je=o.div`
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  word-break: break-word;
`,Ue=o.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
  padding-left: 2px;
`,Ve=o.button`
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
`,Ur=o.div`
  margin-top: 10px;
  padding-left: 4px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Vr=o.div`
  display: flex;
  gap: 10px;
  animation: ${ke} 0.2s ease;
`,Xr=o.div`
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: 4px 12px 12px 12px;
`,Zr=o.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
  margin-right: 4px;
`,en=o.div`
  border-top: 1px solid var(--border-color);
  padding: 12px 20px;
`,tn=o.div`
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
`,on=o.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;
  display: flex;

  &:hover {
    color: var(--text-color);
  }
`,rn=o.form`
  display: flex;
  gap: 10px;
  align-items: center;
`,nn=o.input`
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
`,an=o.button`
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
  opacity: ${t=>t.$disabled?.4:1};
  pointer-events: ${t=>t.$disabled?"none":"auto"};

  &:hover {
    filter: brightness(1.05);
    transform: scale(1.05);
  }
`,Xe=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  text-align: center;
`,Ze=["var(--primary-color)","var(--success-color)","var(--warning-color)","var(--danger-color)","var(--accent-color, var(--primary-color))","var(--link-color, var(--primary-color))"],et=t=>Ze[(t||"A").charCodeAt(0)%Ze.length],tt=t=>{const r=Date.now()-new Date(t).getTime(),n=Math.floor(r/6e4);if(n<1)return"Hozir";if(n<60)return`${n}d`;const s=Math.floor(n/60);if(s<24)return`${s}s`;const i=Math.floor(s/24);return i<7?`${i}k`:ye(t).format("D MMM")},gt=({post:t,onClose:r})=>{const{t:n}=ce(),{getComments:s,addComment:i,addReply:x}=xt();de(p=>p.user);const[h,$]=c.useState([]),[a,T]=c.useState(!0),[C,F]=c.useState(""),[j,A]=c.useState(!1),[S,_]=c.useState(1),[m,v]=c.useState(!0),[b,z]=c.useState(null),P=c.useRef(null),f=async(p=1)=>{p===1&&T(!0);try{const u=await s(t._id,p,10),w=(u==null?void 0:u.data)||[],R=(u==null?void 0:u.totalPages)||1;$(L=>p===1?w:[...L,...w]),_(p),v(p<R)}catch(u){console.error(u)}finally{p===1&&T(!1)}};c.useEffect(()=>{t&&f(1)},[t,s]);const l=(p,u,w)=>{z({commentId:p,replyToUserId:u,nickname:w}),setTimeout(()=>{var R;return(R=P.current)==null?void 0:R.focus()},100)},d=async p=>{if(p.preventDefault(),!(!C.trim()||j)){A(!0);try{b?(await x(t._id,b.commentId,C.trim(),b.replyToUserId),await f(1),z(null)):(await i(t._id,C.trim()),await f(1)),F("")}finally{A(!1)}}};return t?e.jsx(qr,{onClick:r,children:e.jsxs(Or,{onClick:p=>p.stopPropagation(),children:[e.jsxs(Wr,{children:[e.jsx(Kr,{children:n("comments.title")}),e.jsx(ee,{onClick:r,children:e.jsx(Z,{size:18})})]}),e.jsx(Nr,{id:"scrollableComments",children:e.jsx(Qr,{dataLength:h.length,next:()=>f(S+1),hasMore:m,loader:e.jsx(Oe,{children:n("common.loading")}),endMessage:h.length>0?e.jsx(Oe,{$small:!0,children:n("comments.allShown")}):null,scrollableTarget:"scrollableComments",children:a&&h.length===0?e.jsx(Xe,{children:n("common.loading")}):h.length===0?e.jsx(Xe,{children:n("comments.empty")}):h.map(p=>{var R;const u=p.user||{},w=u.nickname||u.username||n("common.userFallback");return e.jsx("div",{children:e.jsxs(Gr,{children:[e.jsx(We,{$color:et(w),$size:36,children:u.avatar?e.jsx("img",{src:u.avatar,alt:w}):w.charAt(0).toUpperCase()}),e.jsxs(Ke,{children:[e.jsxs(Jr,{children:[e.jsxs(Ne,{children:[e.jsx(Qe,{children:e.jsx(xe,{user:u,fallback:n("common.userFallback")})}),e.jsx(Ge,{children:tt(p.createdAt)})]}),e.jsx(Je,{children:p.content})]}),e.jsx(Ue,{children:e.jsxs(Ve,{onClick:()=>l(p._id,u._id,w),children:[e.jsx(ae,{size:12})," ",n("comments.reply")]})}),((R=p.replies)==null?void 0:R.length)>0&&e.jsx(Ur,{children:p.replies.map(L=>{const q=L.user||{},O=q.nickname||q.username||n("common.userFallback");return e.jsxs(Vr,{children:[e.jsx(We,{$color:et(O),$size:28,children:q.avatar?e.jsx("img",{src:q.avatar,alt:O}):O.charAt(0).toUpperCase()}),e.jsxs(Ke,{children:[e.jsxs(Xr,{children:[e.jsxs(Ne,{children:[e.jsx(Qe,{children:O}),e.jsx(Ge,{children:tt(L.createdAt)})]}),e.jsxs(Je,{children:[L.replyToUser&&e.jsxs(Zr,{children:["@",L.replyToUser]}),L.content]})]}),e.jsx(Ue,{children:e.jsxs(Ve,{onClick:()=>l(p._id,q._id,O),children:[e.jsx(ae,{size:12})," ",n("comments.reply")]})})]})]},L._id)})})]})]})},p._id)})})}),e.jsxs(en,{children:[b&&e.jsxs(tn,{children:[e.jsxs("div",{children:[n("comments.replyingTo"),": ",e.jsxs("span",{children:["@",b.nickname]})]}),e.jsx(on,{onClick:()=>z(null),children:e.jsx(Z,{size:14})})]}),e.jsxs(rn,{onSubmit:d,children:[e.jsx(nn,{ref:P,placeholder:b?n("comments.replyPlaceholder",{name:b.nickname}):n("comments.commentPlaceholder"),value:C,onChange:p=>F(p.target.value)}),e.jsx(an,{type:"submit",$disabled:!C.trim()||j,children:e.jsx(ve,{size:16})})]})]})]})}):null},sn=X`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`,ln=o.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
`,cn=o.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;

  &::-webkit-scrollbar {
    width: 0;
  }
`,dn=o.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`,xn=o.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 20;
`,pn=o.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`,hn=o.div`
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
`,mn=o.div`
  display: flex;
  margin-top: 12px;
`,ot=o.button`
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 3px solid
    ${t=>t.$active?"var(--primary-color)":"transparent"};
  color: ${t=>t.$active?"var(--text-color)":"var(--text-muted-color)"};
  font-size: 15px;
  font-weight: ${t=>t.$active?"700":"500"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`,un=o.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px;
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
`,gn=o.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
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
`,fn=o.span`
  font-size: 15px;
  color: var(--text-muted-color);
  flex: 1;
  text-align: left;
`,bn=o(le)`
  display: flex;
  flex-direction: column;
  overflow: visible;
`,rt=o.div`
  text-align: center;
  padding: 16px;
  color: var(--text-muted-color);
  font-size: ${t=>t.$small?"13px":"14px"};
`,vn=o.div`
  position: relative;
  padding: 16px 10px;
  display: flex;
  gap: 12px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 -1px 0 var(--border-color);
  animation: ${sn} 0.3s ease both;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--hover-color);
  }
`,wn=o.div`
  flex-shrink: 0;
`,yn=o.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${t=>t.$color||"var(--primary-color)"};
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
`,jn=o.div`
  flex: 1;
  min-width: 0;
`,kn=o.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`,$n=o.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`,Cn=o.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,zn=o.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,Pn=o.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,Sn=o.div`
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
`,In=o.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`,re=o.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${t=>t.$active?t.$activeColor||"var(--danger-color)":"var(--text-muted-color)"};
  font-size: 13px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    color: ${t=>t.$activeColor||"var(--text-secondary-color)"};
    transform: scale(1.12);
  }
`,Tn=o.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
`,_n=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 15px;
  text-align: center;
`,Mn=o.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  margin-bottom: 4px;
`,Rn=o.div`
  padding: 16px 0;
  width: 100%;
`,Bn=o.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
`,Fn=o.div`
  flex: 1;
`,An=o.div`
  display: flex;
  gap: 24px;
`,nt=["var(--primary-color)","var(--success-color)","var(--warning-color)","var(--danger-color)","var(--accent-color, var(--primary-color))","var(--link-color, var(--primary-color))"],Ln=t=>nt[(t||"A").charCodeAt(0)%nt.length],En=Cr,Dn=()=>{const{t}=ce(),r=de(k=>k.user),n=be(),{forYouPosts:s,forYouPage:i,forYouHasMore:x,followingPosts:h,followingPage:$,followingHasMore:a,loading:T,fetchFeed:C,createPost:F,editPost:j,likePost:A,viewPost:S,deletePost:_}=xt(),[m,v]=c.useState("foryou"),[b,z]=c.useState(!1),[P,f]=c.useState(null),[l,d]=c.useState(null),[p,u]=c.useState(null),w=m==="foryou"?s:h,R=m==="foryou"?x:a,L=m==="foryou"?i:$,q=c.useRef(new Set),O=c.useRef(new Map);c.useEffect(()=>{(m==="foryou"&&s.length===0||m==="following"&&h.length===0)&&C(m,1)},[m,C,s.length,h.length]),c.useEffect(()=>{const k=document.getElementById("scrollableFeed");if(!k||w.length===0)return;const H=E=>{const K=O.current.get(E);K&&(clearTimeout(K),O.current.delete(E))},U=new IntersectionObserver(E=>{E.forEach(K=>{const V=K.target.getAttribute("data-post-id");if(!(!V||q.current.has(V))){if(K.isIntersecting&&K.intersectionRatio>=.6){if(!O.current.has(V)){const ft=setTimeout(()=>{q.current.add(V),O.current.delete(V),S(V)},800);O.current.set(V,ft)}return}H(V)}})},{root:k,threshold:[.6]});return k.querySelectorAll("[data-post-id]").forEach(E=>U.observe(E)),w.forEach(E=>{E!=null&&E._id&&E.previouslySeen&&q.current.add(E._id)}),()=>{U.disconnect(),w.forEach(E=>{E!=null&&E._id&&!q.current.has(E._id)&&H(E._id)})}},[w,S]);const y=(r==null?void 0:r.nickname)||(r==null?void 0:r.username)||t("common.you"),g=y.charAt(0).toUpperCase(),I=async k=>{await F(k),m!=="foryou"&&v("foryou")},B=async k=>{l!=null&&l._id&&(await j(l._id,k),d(null))},Y=async()=>{p!=null&&p._id&&(await _(p._id),u(null))},D=k=>{const H=typeof k=="string"?k:k==null?void 0:k._id,U=typeof k=="object"?k==null?void 0:k.jammId:null,ie=(r==null?void 0:r._id)||(r==null?void 0:r.id);if(H===ie){n("/profile");return}n(`/profile/${U||H}`)};return e.jsxs(ln,{children:[e.jsx(xn,{children:e.jsxs(pn,{children:[e.jsxs(hn,{children:[e.jsx("h1",{children:t("feed.title")}),e.jsx(ee,{onClick:()=>z(!0),children:e.jsx(st,{size:14})})]}),e.jsxs(mn,{children:[e.jsx(ot,{$active:m==="foryou",onClick:()=>v("foryou"),children:t("feed.tabs.forYou")}),e.jsx(ot,{$active:m==="following",onClick:()=>v("following"),children:t("feed.tabs.following")})]})]})}),e.jsx(cn,{id:"scrollableFeed",children:e.jsx(dn,{children:e.jsxs(bn,{dataLength:w.length,next:()=>C(m,L+1),hasMore:R,loader:e.jsx(rt,{children:t("common.loading")}),endMessage:w.length>0?e.jsx(rt,{$small:!0,children:t("feed.allShown")}):null,scrollableTarget:"scrollableFeed",children:[e.jsxs(un,{onClick:()=>z(!0),children:[e.jsx(gn,{children:r!=null&&r.avatar?e.jsx("img",{src:r.avatar,alt:y}):g}),e.jsx(fn,{children:t("feed.composePlaceholder")})]}),T&&w.length===0?e.jsx(Rn,{children:[...Array(3)].map((k,H)=>e.jsxs(Bn,{children:[e.jsx(At,{size:"44px"}),e.jsxs(Fn,{children:[e.jsx(Q,{height:"15px",width:"120px",mb:"12px"}),e.jsx(Q,{height:"14px",width:"90%",mb:"8px"}),e.jsx(Q,{height:"14px",width:"70%",mb:"8px"}),e.jsx(Q,{height:"14px",width:"40%",mb:"16px"}),e.jsxs(An,{children:[e.jsx(Q,{height:"16px",width:"40px",mb:"0"}),e.jsx(Q,{height:"16px",width:"40px",mb:"0"}),e.jsx(Q,{height:"16px",width:"40px",mb:"0"})]})]})]},H))}):w.length===0?e.jsxs(_n,{children:[e.jsx(Mn,{children:m==="following"?e.jsx(It,{size:28,color:"var(--text-muted-color)"}):e.jsx(Tt,{size:28,color:"var(--text-muted-color)"})}),t(m==="following"?"feed.emptyFollowing":"feed.emptyForYou")]}):w.map(k=>{const H=k.author||{},U=H.nickname||H.username||t("common.userFallback"),ie=H.username||"user",E=String(H._id||"")===String((r==null?void 0:r._id)||(r==null?void 0:r.id)||"");return e.jsxs(vn,{"data-post-id":k._id,children:[e.jsx(wn,{children:e.jsx(yn,{$color:Ln(U),onClick:()=>D(H._id),children:H.avatar?e.jsx("img",{src:H.avatar,alt:U}):U.charAt(0).toUpperCase()})}),e.jsxs(jn,{children:[e.jsxs(kn,{children:[e.jsx($n,{onClick:()=>D(H._id),children:e.jsx(xe,{user:H,fallback:t("common.userFallback")})}),e.jsxs(Cn,{children:["@",ie]}),e.jsx(zn,{children:"·"}),e.jsx(Pn,{children:Lt(k.createdAt)})]}),e.jsx(Sn,{children:En(k.content)}),e.jsxs(In,{children:[e.jsxs(re,{$active:k.liked,$activeColor:"var(--danger-color)",onClick:K=>{K.stopPropagation(),A(k._id)},children:[e.jsx(lt,{size:16,fill:k.liked?"currentColor":"none"}),k.likes]}),e.jsxs(re,{$activeColor:"var(--primary-color)",onClick:K=>{K.stopPropagation(),f(k)},children:[e.jsx(ct,{size:16}),k.comments]}),e.jsxs(re,{$activeColor:"var(--text-secondary-color)",children:[e.jsx(we,{size:16}),k.views]})]}),E&&e.jsxs(Tn,{children:[e.jsxs(re,{$activeColor:"var(--primary-color)",onClick:K=>{K.stopPropagation(),d(k)},children:[e.jsx(_t,{size:16}),t("common.edit")]}),e.jsxs(re,{$activeColor:"var(--danger-color)",onClick:K=>{K.stopPropagation(),u(k)},children:[e.jsx(Mt,{size:16}),t("common.delete")]})]})]})]},k._id)})]})})}),e.jsx(ut,{isOpen:b||!!l,onClose:()=>{z(!1),d(null)},onSubmit:l?B:I,currentUser:r,initialContent:(l==null?void 0:l.content)||"",title:t(l?"feed.editTitle":"feed.createTitle"),submitLabel:t(l?"common.save":"common.send")}),P&&e.jsx(gt,{post:P,onClose:()=>f(null)}),e.jsx(Rt,{isOpen:!!p,onClose:()=>u(null),title:t("feed.deleteTitle"),description:t("feed.deleteDescription"),confirmText:t("common.delete"),cancelText:t("common.cancel"),onConfirm:Y,isDanger:!0})]})},Zn=Object.freeze(Object.defineProperty({__proto__:null,CreatePostDialog:ut,FeedPage:Dn,PostComments:gt},Symbol.toStringTag,{value:"Module"}));export{mt as B,ut as C,je as M,Qn as P,pt as a,Xt as b,Zt as c,Vn as d,xt as e,Gn as f,Vt as g,Jn as h,Xn as i,Zn as j,eo as l,Cr as r,Un as u,to as v};
