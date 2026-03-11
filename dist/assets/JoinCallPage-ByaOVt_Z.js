import{d as N,r as n,a as R,j as t}from"./react-vendor-UYnqoc53.js";import{a8 as Y,a9 as _,aa as A,ab as J,d as o,m as $,aj as V}from"./ui-vendor-DFyM_Xd9.js";import{d as T,s as D}from"./feature-chats-DsVJGdS1.js";import{u as F}from"./feature-admin-D0NNr8sf.js";import{s as C}from"./feature-app-ICtyfBrQ.js";import"./vendor-CRWlb9wI.js";import"./app-vendor-DTdcG8Is.js";import"./feature-arena-BvqxMZzZ.js";import"./media-realtime-B2IcwcIy.js";import"./feature-calls-BqelebZ9.js";import"./router-query-D08THUDE.js";const H=$`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`,K=$`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`,b=o.div`
  min-height: 100vh;
  width: 100%;
  background: #0b0d0f;
  display: flex;
  align-items: center;
  justify-content: center;
`,h=o.div`
  background: rgba(32, 34, 37, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 44px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  animation: ${H} 0.3s ease;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
`,U=o.div`
  font-size: 40px;
  margin-bottom: 12px;
`,G=o.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
`,Q=o.p`
  color: #8e9297;
  font-size: 14px;
  margin: 0 0 24px;
  line-height: 1.5;
`,W=o.code`
  display: block;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  color: #7289da;
  font-size: 13px;
  margin-bottom: 24px;
  word-break: break-all;
`,X=o.input`
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
`,Z=o.button`
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
`,tt=o.p`
  color: #f04747;
  font-size: 13px;
  margin: 8px 0 0;
`,z=o(V)`
  animation: ${K} 1.2s linear infinite;
`,it=o.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 18px;
`,M=o.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  background: ${r=>r.$active?"rgba(255,255,255,0.09)":"rgba(240,71,71,0.15)"};
  color: ${r=>r.$active?"#fff":"#f04747"};
  border: 1px solid
    ${r=>r.$active?"rgba(255,255,255,0.1)":"rgba(240,71,71,0.3)"};
  &:hover {
    background: ${r=>r.$active?"rgba(255,255,255,0.15)":"rgba(240,71,71,0.25)"};
  }
`,S=o.span`
  display: block;
  font-size: 10px;
  margin-top: 4px;
  color: ${r=>r.$active?"#b9bbbe":"#f04747"};
`,gt=()=>{const{roomId:r}=N(),[d,p]=n.useState("checking"),[e,I]=n.useState(null),[f,x]=n.useState(""),[u,w]=n.useState(""),[s,P]=n.useState(!1),[c,E]=n.useState(!1),[m,q]=n.useState(!1),g=n.useRef(!1);R();const i=F(a=>a.user),j=C(a=>a.startCall),O=C(a=>a.activeCall);n.useEffect(()=>{let a=!0;return(async()=>{var k;const l=await T(r);if(a)if(l){I(l);const B=(i==null?void 0:i._id)||(i==null?void 0:i.id),L=typeof l.creator=="object"&&((k=l.creator)==null?void 0:k._id)||l.creator,y=String(L)===String(B);q(y),y?(g.current||x((i==null?void 0:i.nickname)||(i==null?void 0:i.username)||"Host"),p("call")):(g.current||x((i==null?void 0:i.nickname)||(i==null?void 0:i.username)||""),p("form"))}else g.current||x((i==null?void 0:i.nickname)||(i==null?void 0:i.username)||""),p("form")})(),()=>{a=!1}},[r,i]);const v=async()=>{if(!f.trim()){w("Iltimos ismingizni kiriting");return}await D({roomId:r,title:(e==null?void 0:e.title)||"Meet",isPrivate:(e==null?void 0:e.isPrivate)||!1,isCreator:!1}),p("call")};return n.useEffect(()=>{if(d!=="call"||!r)return;const a=sessionStorage.getItem("meet_return_path")||"/chats";j({roomId:r,chatTitle:(e==null?void 0:e.title)||"Meet",displayName:f.trim(),isCreator:m,isPrivate:(e==null?void 0:e.isPrivate)||!1,initialMicOn:s,initialCamOn:c,returnPath:a})},[d,r,e==null?void 0:e.title,e==null?void 0:e.isPrivate,f,m,s,c,j]),d==="checking"?t.jsx(b,{children:t.jsx(h,{children:t.jsx(z,{size:32,color:"#7289da"})})}):d==="call"?t.jsx(b,{children:!O&&t.jsx(h,{children:t.jsx(z,{size:32,color:"#7289da"})})}):t.jsx(b,{children:t.jsxs(h,{children:[t.jsx(U,{children:"📹"}),t.jsx(G,{children:"Video Callga qo'shilish"}),t.jsx(Q,{children:"Siz quyidagi callga taklif qilindingiz:"}),t.jsx(W,{children:r}),t.jsx(X,{autoFocus:!0,value:f,onChange:a=>{g.current=!0,x(a.target.value)},placeholder:"Ismingizni kiriting",onKeyDown:a=>a.key==="Enter"&&v()}),t.jsxs(it,{children:[t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx(M,{$active:s,onClick:()=>P(a=>!a),children:s?t.jsx(Y,{size:22}):t.jsx(_,{size:22})}),t.jsx(S,{$active:s,children:s?"Yoniq":"O'chiq"})]}),t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx(M,{$active:c,onClick:()=>E(a=>!a),children:c?t.jsx(A,{size:22}):t.jsx(J,{size:22})}),t.jsx(S,{$active:c,children:c?"Yoniq":"O'chiq"})]})]}),u&&t.jsx(tt,{children:u}),t.jsx(Z,{onClick:v,children:"🎥 Callga kirish"})]})})};export{gt as default};
