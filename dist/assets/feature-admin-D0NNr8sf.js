import{z as q,R as c,j as e,N as J,n as U}from"./react-vendor-UYnqoc53.js";import{a as K}from"./app-vendor-DTdcG8Is.js";import{c as W}from"./vendor-CRWlb9wI.js";import{u as Q}from"./feature-app-ICtyfBrQ.js";import{d as s}from"./ui-vendor-DFyM_Xd9.js";const N=r=>String(r||"").trim().replace(/\/+$/,""),S=N("http://localhost:3000"),X=N("http://localhost:5173"),ze=X||window.location.origin,Me=(r="")=>{const o=r?`/${String(r).replace(/^\/+/,"")}`:"";return S?`${S}${o}`:o};let b=null;const _=W((r,o)=>({user:null,initialized:!1,loading:!1,setAuth:i=>r({user:i,initialized:!0,loading:!1}),setUser:i=>r({user:i,initialized:!0,loading:!1}),updateUser:i=>r(d=>({user:d.user?{...d.user,...i}:null})),logout:async({redirect:i=!0}={})=>{try{await fetch(`${S}/auth/logout`,{method:"POST",credentials:"include"})}catch{}r({user:null,initialized:!0,loading:!1}),b=null,i&&window.location.pathname!=="/login"&&(window.location.href="/login")},bootstrapAuth:async()=>{const i=o();return i.initialized?i.user:b||(r({loading:!0}),b=fetch(`${S}/auth/me`,{credentials:"include"}).then(async d=>{if(!d.ok)return r({user:null,initialized:!0,loading:!1}),null;const x=await d.json();return r({user:x,initialized:!0,loading:!1}),x}).catch(()=>(r({user:null,initialized:!0,loading:!1}),null)).finally(()=>{b=null}),b)}})),Y=/premium|tarif|maksimal|limit|obuna/i,Z=()=>typeof window<"u"&&window.location.pathname.startsWith("/arena"),m=K.create({baseURL:S,withCredentials:!0});m.interceptors.request.use(r=>r);m.interceptors.response.use(r=>r,r=>{var d,x,j,h,n;const o=r.config,i=(d=r.response)==null?void 0:d.status;if(i===401){const{logout:p}=_.getState();p({redirect:!Z()})}if(i===423){const{logout:p}=_.getState();p({redirect:!1}),window.location.href="/blocked"}if(i===503&&window.location.pathname!=="/maintenance"&&(window.location.href="/maintenance"),i===429&&q.error("Siz juda ko'p so'rov yubordingiz. Iltimos birozdan so'ng urinib ko'ring."),i===403&&!(o!=null&&o._skipPremiumModal)&&Y.test(String(((j=(x=r.response)==null?void 0:x.data)==null?void 0:j.message)||""))){const{openPremiumUpgradeModal:p}=Q.getState();p({message:String(((n=(h=r.response)==null?void 0:h.data)==null?void 0:n.message)||""),source:"server-403"})}return Promise.reject(r)});const ee=async(r={})=>{const{data:o}=await m.get("/admin/users",{params:r});return o},re=async(r={})=>{const{data:o}=await m.get("/admin/groups",{params:r});return o},te=async(r={})=>{const{data:o}=await m.get("/admin/courses",{params:r});return o},T=async(r={})=>{const{data:o}=await m.get("/admin/promocodes",{params:r});return o},oe=async r=>{const{data:o}=await m.post("/admin/promocodes",r);return o},ae=s.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  background: var(--bg-color);
`,se=s.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px 10px;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 720px) {
    flex-direction: column;
  }
`,ie=s.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`,R=s.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  color: var(--text-color);
`,ne=s.p`
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
`,de=s.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
`,le=s.input`
  width: 220px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-color);
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`,z=s.select`
  height: 36px;
  min-width: 120px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-color);
  padding: 0 10px;
`,w=s.button`
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${({$variant:r})=>r==="primary"?"var(--primary-color)":"var(--border-color)"};
  background: ${({$variant:r})=>r==="primary"?"var(--primary-color)":"var(--secondary-bg)"};
  color: ${({$variant:r})=>r==="primary"?"#fff":"var(--text-color)"};
  padding: 0 12px;
  font-weight: 700;
  cursor: pointer;
`,ce=s.div`
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
`,pe=s.button`
  height: 34px;
  border-radius: 999px;
  border: 1px solid
    ${({$active:r})=>r?"var(--primary-color)":"var(--border-color)"};
  background: ${({$active:r})=>r?"rgba(var(--primary-rgb), 0.12)":"var(--secondary-bg)"};
  color: ${({$active:r})=>r?"var(--primary-color)":"var(--text-secondary)"};
  padding: 0 12px;
  white-space: nowrap;
  font-weight: 700;
  cursor: pointer;
`,ue=s.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 12px 16px 16px;
`,A=s.table`
  width: 100%;
  min-width: 820px;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;

  th,
  td {
    padding: 10px 12px;
    font-size: 13px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--tertiary-bg);
    color: var(--text-secondary);
  }

  tr:last-child td {
    border-bottom: none;
  }
`,M=s.span`
  display: inline-flex;
  align-items: center;
  height: 26px;
  border-radius: 999px;
  padding: 0 10px;
  background: ${({$tone:r})=>r==="success"?"rgba(34, 197, 94, 0.14)":r==="danger"?"rgba(239, 68, 68, 0.14)":"rgba(var(--primary-rgb), 0.12)"};
  color: ${({$tone:r})=>r==="success"?"var(--success-color)":r==="danger"?"var(--danger-color)":"var(--primary-color)"};
  font-size: 12px;
  font-weight: 700;
`,B=s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  border-radius: 14px;
  border: 1px dashed var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-secondary);
`,xe=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px 14px;
  border-top: 1px solid var(--border-color);
`,he=s.div`
  font-size: 13px;
  color: var(--text-secondary);
`,ge=s.div`
  display: flex;
  gap: 8px;
`,me=s.div`
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(8, 12, 24, 0.52);
  backdrop-filter: blur(10px);
`,je=s.div`
  width: min(520px, 100%);
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  overflow: hidden;
`,ve=s.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
`,fe=s.div`
  padding: 16px;
  display: grid;
  gap: 12px;
`,be=s.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,k=s.label`
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
`,C=s.input`
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-bg);
  color: var(--text-color);
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`,ye=s.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 16px 16px;
  border-top: 1px solid var(--border-color);
`,we=[{id:"users",label:"Users"},{id:"groups",label:"Groups"},{id:"courses",label:"Courses"},{id:"promocodes",label:"Promocodes"}],E={code:"",validFrom:"",validUntil:"",maxUses:""},g=r=>{if(!r)return"—";const o=new Date(r);return Number.isNaN(o.getTime())?"—":o.toLocaleDateString()};function Se(){const r=_(a=>a.user),[o,i]=c.useState("users"),[d,x]=c.useState(""),[j,h]=c.useState(1),[n,p]=c.useState(""),[u,F]=c.useState({items:[],total:0,totalPages:1}),[O,$]=c.useState(!1),[I,P]=c.useState(!1),[v,y]=c.useState(E);if((r==null?void 0:r.officialBadgeKey)!=="ceo")return e.jsx(J,{to:"/chats",replace:!0});c.useEffect(()=>{h(1)},[o,n]),c.useEffect(()=>{const a=window.setTimeout(async()=>{var t,f;$(!0);try{const l={page:j,limit:20,q:d.trim()||void 0};o==="users"&&n&&(l.premiumStatus=n),o==="courses"&&n&&(l.accessType=n),o==="promocodes"&&n&&(l.isActive=n);const H=o==="users"?await ee(l):o==="groups"?await re(l):o==="courses"?await te(l):await T(l);F(H||{items:[],total:0,totalPages:1})}catch(l){U.error(((f=(t=l==null?void 0:l.response)==null?void 0:t.data)==null?void 0:f.message)||"Failed to load admin data")}finally{$(!1)}},250);return()=>window.clearTimeout(a)},[o,j,d,n]);const L=async()=>{const a=await T({page:1,limit:20});F(a||{items:[],total:0,totalPages:1})},D=async()=>{var a,t;try{await oe({...v,maxUses:v.maxUses||null}),U.success("Promocode created"),P(!1),y(E),i("promocodes"),h(1),await L()}catch(f){U.error(((t=(a=f==null?void 0:f.response)==null?void 0:a.data)==null?void 0:t.message)||"Failed to create promocode")}},V=()=>o==="users"?e.jsxs(z,{value:n,onChange:a=>p(a.target.value),children:[e.jsx("option",{value:"",children:"All premium"}),e.jsx("option",{value:"active",children:"Active premium"}),e.jsx("option",{value:"expired",children:"Expired premium"}),e.jsx("option",{value:"none",children:"No premium"})]}):o==="courses"?e.jsxs(z,{value:n,onChange:a=>p(a.target.value),children:[e.jsx("option",{value:"",children:"All access"}),e.jsx("option",{value:"public",children:"Public"}),e.jsx("option",{value:"private",children:"Private"}),e.jsx("option",{value:"free_open",children:"Free open"})]}):o==="promocodes"?e.jsxs(z,{value:n,onChange:a=>p(a.target.value),children:[e.jsx("option",{value:"",children:"All status"}),e.jsx("option",{value:"true",children:"Active"}),e.jsx("option",{value:"false",children:"Inactive"})]}):null,G=()=>{var a;return(a=u.items)!=null&&a.length?o==="users"?e.jsxs(A,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"User"}),e.jsx("th",{children:"Email"}),e.jsx("th",{children:"Premium"}),e.jsx("th",{children:"Blocked"}),e.jsx("th",{children:"Badge"}),e.jsx("th",{children:"Created"})]})}),e.jsx("tbody",{children:u.items.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.nickname||t.username||"—"}),e.jsx("td",{children:t.email||"—"}),e.jsx("td",{children:e.jsx(M,{$tone:t.premiumStatus==="active"?"success":"default",children:t.premiumStatus||"none"})}),e.jsx("td",{children:e.jsx(M,{$tone:t.isBlocked?"danger":"success",children:t.isBlocked?"Blocked":"Open"})}),e.jsx("td",{children:t.officialBadgeLabel||"—"}),e.jsx("td",{children:g(t.createdAt)})]},t._id))})]}):o==="groups"?e.jsxs(A,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Group"}),e.jsx("th",{children:"Description"}),e.jsx("th",{children:"Members"}),e.jsx("th",{children:"Created"}),e.jsx("th",{children:"Activity"})]})}),e.jsx("tbody",{children:u.items.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.name||"Untitled group"}),e.jsx("td",{children:t.description||"—"}),e.jsx("td",{children:t.membersCount||0}),e.jsx("td",{children:g(t.createdAt)}),e.jsx("td",{children:g(t.lastMessageAt)})]},t._id))})]}):o==="courses"?e.jsxs(A,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Course"}),e.jsx("th",{children:"Slug"}),e.jsx("th",{children:"Access"}),e.jsx("th",{children:"Created"}),e.jsx("th",{children:"Updated"})]})}),e.jsx("tbody",{children:u.items.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.title||"Untitled course"}),e.jsx("td",{children:t.urlSlug||"—"}),e.jsx("td",{children:t.accessType||"—"}),e.jsx("td",{children:g(t.createdAt)}),e.jsx("td",{children:g(t.updatedAt)})]},t._id))})]}):e.jsxs(A,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Code"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Uses"}),e.jsx("th",{children:"Valid from"}),e.jsx("th",{children:"Valid until"})]})}),e.jsx("tbody",{children:u.items.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.displayCode||"—"}),e.jsx("td",{children:e.jsx(M,{$tone:t.isActive?"success":"danger",children:t.isActive?"Active":"Inactive"})}),e.jsxs("td",{children:[t.usedCount||0,t.maxUses?` / ${t.maxUses}`:""]}),e.jsx("td",{children:g(t.validFrom)}),e.jsx("td",{children:g(t.validUntil)})]},t._id))})]}):e.jsx(B,{children:"No data found"})};return e.jsxs(ae,{children:[e.jsxs(se,{children:[e.jsxs(ie,{children:[e.jsx(R,{children:"CEO Admin Panel"}),e.jsx(ne,{children:"Users, groups, courses and promocodes overview"})]}),e.jsxs(de,{children:[e.jsx(le,{value:d,onChange:a=>x(a.target.value),placeholder:"Search..."}),V(),o==="promocodes"?e.jsx(w,{$variant:"primary",onClick:()=>P(!0),children:"New promocode"}):null]})]}),e.jsx(ce,{children:we.map(a=>e.jsx(pe,{$active:o===a.id,onClick:()=>i(a.id),children:a.label},a.id))}),e.jsx(ue,{children:O?e.jsx(B,{children:"Loading..."}):G()}),e.jsxs(xe,{children:[e.jsxs(he,{children:[u.total||0," total • page ",j," / ",u.totalPages||1]}),e.jsxs(ge,{children:[e.jsx(w,{onClick:()=>h(a=>Math.max(1,a-1)),children:"Prev"}),e.jsx(w,{onClick:()=>h(a=>Math.min(u.totalPages||1,a+1)),children:"Next"})]})]}),I?e.jsx(me,{onClick:()=>P(!1),children:e.jsxs(je,{onClick:a=>a.stopPropagation(),children:[e.jsx(ve,{children:e.jsx(R,{style:{fontSize:17},children:"Create promocode"})}),e.jsx(fe,{children:e.jsxs(be,{children:[e.jsxs(k,{children:["Code",e.jsx(C,{value:v.code,onChange:a=>y(t=>({...t,code:a.target.value})),placeholder:"JAMM2026"})]}),e.jsxs(k,{children:["Max uses",e.jsx(C,{type:"number",value:v.maxUses,onChange:a=>y(t=>({...t,maxUses:a.target.value})),placeholder:"Optional"})]}),e.jsxs(k,{children:["Valid from",e.jsx(C,{type:"datetime-local",value:v.validFrom,onChange:a=>y(t=>({...t,validFrom:a.target.value}))})]}),e.jsxs(k,{children:["Valid until",e.jsx(C,{type:"datetime-local",value:v.validUntil,onChange:a=>y(t=>({...t,validUntil:a.target.value}))})]})]})}),e.jsxs(ye,{children:[e.jsx(w,{onClick:()=>P(!1),children:"Cancel"}),e.jsx(w,{$variant:"primary",onClick:D,children:"Create"})]})]})}):null]})}const _e=Object.freeze(Object.defineProperty({__proto__:null,AdminPanel:Se},Symbol.toStringTag,{value:"Module"}));export{S as A,ze as R,m as a,Me as b,_e as i,_ as u};
