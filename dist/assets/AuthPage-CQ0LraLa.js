import{a as X,r,R as D,j as i}from"./react-vendor-UYnqoc53.js";import{b4 as V,b0 as Z,a2 as _,Z as W,ap as Q,U as ii,b8 as ai,af as ei,$ as ni,K as ti,b9 as oi,X as ri,d as a,m as L}from"./ui-vendor-DFyM_Xd9.js";import{u as si,A as I}from"./feature-admin-D0NNr8sf.js";import"./vendor-CRWlb9wI.js";import"./app-vendor-DTdcG8Is.js";import"./feature-app-ICtyfBrQ.js";import"./feature-calls-BqelebZ9.js";import"./media-realtime-B2IcwcIy.js";import"./feature-arena-BvqxMZzZ.js";import"./feature-chats-DsVJGdS1.js";import"./router-query-D08THUDE.js";const Y=L`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`,v=L`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;L`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;const li=a.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1b2e 0%, #16171d 50%, #0d0e14 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`,w=a.div`
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
    animation: ${v} 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: #eb459e;
    bottom: -50px;
    left: -50px;
    animation: ${v} 10s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: #57f287;
    top: 50%;
    left: 50%;
    animation: ${v} 12s ease-in-out infinite;
  }
`,di=a.div`
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
  animation: ${Y} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 420px;
    flex-direction: column;
  }
`,ci=a.div`
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
`,xi=a.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
`,pi=a.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`,hi=a.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`,s=a.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`,l=a.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,d=a.span`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`,gi=a.div`
  flex: 1;
  padding: 40px;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`,ui=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`,fi=a.div`
  /* width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5865f2, #7b6cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.35); */
  img{
    width: 40px;
    height: 40px;
    border-radius: 14px;
  }
`,bi=a.h1`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #b9bbbe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`,mi=a.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
`,ji=a.p`
  font-size: 14px;
  color: #b9bbbe;
  text-align: center;
  margin-bottom: 24px;
`,yi=a.div`
  display: flex;
  background: rgba(32, 34, 37, 0.7);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
`,H=a.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${o=>o.$active?"linear-gradient(135deg, #5865f2, #4752c4)":"transparent"};
  color: ${o=>o.$active?"#fff":"#b9bbbe"};
  box-shadow: ${o=>o.$active?"0 2px 10px rgba(88, 101, 242, 0.3)":"none"};

  &:hover {
    color: #fff;
    background: ${o=>o.$active?"linear-gradient(135deg, #5865f2, #4752c4)":"rgba(255,255,255,0.05)"};
  }
`,ki=a.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,z=a.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`,q=a.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b9bbbe;
`,S=a.div`
  position: relative;
  display: flex;
  align-items: center;
`,c=a.div`
  position: absolute;
  left: 14px;
  color: #72767d;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
`,C=a.input`
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

  &:focus ~ ${c}, &:focus + ${c} {
    color: #5865f2;
  }
`,vi=a.button`
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
`,wi=a.button`
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
`,zi=a.div`
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
`,qi=a.button`
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
`,Si=()=>i.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",children:[i.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z",fill:"#4285F4"}),i.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),i.jsx("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",fill:"#FBBC05"}),i.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),Ci=a.p`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #72767d;
`,G=a.button`
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
`,Li=a.div`
  background: rgba(240, 71, 71, 0.12);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #f04747;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`,$i=a.div`
  background: rgba(67, 181, 129, 0.12);
  border: 1px solid rgba(67, 181, 129, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #43b581;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;a.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;const Pi=a.div`
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
  animation: ${Y} 0.3s ease-out;
`,Ai=a.div`
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
`,Bi=a.div`
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
`,Fi=a.div`
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
`,Ei=a.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 11px;
`,U=a.button`
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #5865f2;
    text-decoration: underline;
  }
`,Ki=()=>{const o=X(),$=si(e=>e.setAuth),[n,x]=r.useState("login"),[f,N]=r.useState(!1),[b,p]=r.useState(null),[m,P]=r.useState(""),[j,A]=r.useState(""),[B,F]=r.useState(""),[y,h]=r.useState(!1),[E,g]=r.useState(""),[M,T]=r.useState("");D.useEffect(()=>{const t=new URLSearchParams(window.location.search).get("verify_token");t&&J(t)},[]);const J=async e=>{h(!0),g("");try{const t=await fetch(`${I}/auth/verify/${e}`,{credentials:"include"}),u=await t.json();if(!t.ok)throw new Error(u.message||"Tasdiqlashda xatolik yuz berdi");$(u.user),o("/chats")}catch(t){g(t.message)}finally{h(!1)}},O=async e=>{e.preventDefault(),g(""),T(""),h(!0);try{const t=n==="login"?"/auth/login":"/auth/signup",u=n==="login"?{email:m,password:j}:{email:m,password:j,nickname:B},R=await fetch(`${I}${t}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(u)}),k=await R.json();if(!R.ok)throw new Error(k.message||"Xatolik yuz berdi");n==="signup"?(T(k.message),P(""),A(""),F("")):($(k.user),o("/chats"))}catch(t){g(t.message)}finally{h(!1)}},K=()=>{toast.error("Google Auth hali ulanmagan. Email/parol bilan kiring.")};return i.jsxs(li,{children:[i.jsx(w,{}),i.jsx(w,{}),i.jsx(w,{}),i.jsxs(di,{children:[i.jsxs(ci,{children:[i.jsx(xi,{children:"Jamm platformasiga xush kelibsiz!"}),i.jsx(pi,{children:"Zamonaviy muloqot va ta'lim platformasi. Do'stlaringiz bilan bog'laning va yangi bilimlar oling."}),i.jsxs(hi,{children:[i.jsxs(s,{children:[i.jsx(l,{children:i.jsx(V,{size:18,color:"white"})}),i.jsx(d,{children:"Real-time chat va guruhlar"})]}),i.jsxs(s,{children:[i.jsx(l,{children:i.jsx(Z,{size:18,color:"white"})}),i.jsx(d,{children:"Video kurslar va darsliklar"})]}),i.jsxs(s,{children:[i.jsx(l,{children:i.jsx(_,{size:18,color:"white"})}),i.jsx(d,{children:"Bilimlar bellashuvi (Arena)"})]}),i.jsxs(s,{children:[i.jsx(l,{children:i.jsx(W,{size:18,color:"white"})}),i.jsx(d,{children:"Tez va qulay interfeys"})]}),i.jsxs(s,{children:[i.jsx(l,{children:i.jsx(Q,{size:18,color:"white"})}),i.jsx(d,{children:"Xavfsiz va himoyalangan"})]})]})]}),i.jsxs(gi,{children:[i.jsxs(ui,{children:[i.jsx(fi,{children:i.jsx("img",{src:"./fav.png",alt:"logo"})}),i.jsx(bi,{children:"Jamm"})]}),i.jsx(mi,{children:n==="login"?"Qaytib kelganingizdan xursandmiz!":"Akkaunt yarating"}),i.jsx(ji,{children:n==="login"?"Hisobingizga kirish uchun ma'lumotlaringizni kiriting":"Ro'yxatdan o'tib, platformaga qo'shiling"}),i.jsxs(yi,{children:[i.jsx(H,{$active:n==="login",onClick:()=>x("login"),children:"Kirish"}),i.jsx(H,{$active:n==="signup",onClick:()=>x("signup"),children:"Ro'yxatdan o'tish"})]}),i.jsxs(ki,{onSubmit:O,children:[n==="signup"&&i.jsxs(z,{children:[i.jsx(q,{children:"Ism (Nikname)"}),i.jsxs(S,{children:[i.jsx(C,{type:"text",placeholder:"Nikingiz",value:B,onChange:e=>F(e.target.value),required:n==="signup"}),i.jsx(c,{children:i.jsx(ii,{size:16})})]})]}),i.jsxs(z,{children:[i.jsx(q,{children:"Email"}),i.jsxs(S,{children:[i.jsx(C,{type:"email",placeholder:"email@example.com",value:m,onChange:e=>P(e.target.value),required:!0}),i.jsx(c,{children:i.jsx(ai,{size:16})})]})]}),i.jsxs(z,{children:[i.jsx(q,{children:"Parol"}),i.jsxs(S,{children:[i.jsx(C,{type:f?"text":"password",placeholder:"••••••••",value:j,onChange:e=>A(e.target.value),required:!0}),i.jsx(c,{children:i.jsx(ei,{size:16})}),i.jsx(vi,{type:"button",onClick:()=>N(!f),children:f?i.jsx(ni,{size:16}):i.jsx(ti,{size:16})})]})]}),M&&i.jsx($i,{children:M}),E&&i.jsx(Li,{children:E}),i.jsxs(wi,{type:"submit",disabled:y,children:[y?"Yuklanmoqdaaaa...":n==="login"?"Kirish":"Ro'yxatdan o'tish",!y&&i.jsx(oi,{size:18})]})]}),i.jsx(zi,{children:i.jsx("span",{children:"yoki"})}),i.jsxs(qi,{onClick:K,children:[i.jsx(Si,{}),"Google orqali ",n==="login"?"kirish":"ro'yxatdan o'tish"]}),i.jsx(Ci,{children:n==="login"?i.jsxs(i.Fragment,{children:["Hisobingiz yo'qmi?"," ",i.jsx(G,{type:"button",onClick:()=>x("signup"),children:"Ro'yxatdan o'ting"})]}):i.jsxs(i.Fragment,{children:["Hisobingiz bormi?"," ",i.jsx(G,{type:"button",onClick:()=>x("login"),children:"Kirish"})]})}),i.jsxs(Ei,{children:[i.jsx(U,{type:"button",onClick:()=>p("privacy"),children:"Maxfiylik siyosati"}),i.jsx(U,{type:"button",onClick:()=>p("terms"),children:"Foydalanish shartlari"})]})]})]}),b&&i.jsx(Pi,{onClick:()=>p(null),children:i.jsxs(Ai,{onClick:e=>e.stopPropagation(),children:[i.jsxs(Bi,{children:[i.jsx("h3",{children:b==="privacy"?"Maxfiylik Siyosati":"Foydalanish Shartlari"}),i.jsx("button",{onClick:()=>p(null),style:{background:"none",border:"none",color:"#72767d",cursor:"pointer"},children:i.jsx(ri,{size:24})})]}),i.jsx(Fi,{children:b==="privacy"?i.jsxs(i.Fragment,{children:[i.jsx("p",{children:"Jamm platformasi sizning maxfiyligingizni hurmat qiladi va shaxsiy ma'lumotlaringizni himoya qilishga intiladi."}),i.jsx("h4",{children:"1. To'planadigan ma'lumotlar"}),i.jsx("p",{children:"Biz quyidagi ma'lumotlarni to'playmiz:"}),i.jsxs("ul",{children:[i.jsx("li",{children:"Elektron pochta manzili (hisobga kirish uchun)"}),i.jsx("li",{children:"Username va Nik (platformada ko'rinish uchun)"}),i.jsx("li",{children:"Telefon raqami (xavfsizlik va aloqa uchun)"}),i.jsx("li",{children:"Akkaunt rasmi (ixtiyoriy, profilingizni shaxsiylashtirish uchun)"})]}),i.jsx("h4",{children:"2. Ma'lumotlardan foydalanish"}),i.jsx("p",{children:"Sizning ma'lumotlaringiz platformaning to'liq ishlashini ta'minlash, siz bilan bog'lanish va xavfsizlikni ta'minlash maqsadida ishlatiladi."}),i.jsx("h4",{children:"3. Ma'lumotlarni saqlash"}),i.jsx("p",{children:"Barcha ma'lumotlar himoyalangan serverlarda saqlanadi va uchinchi shaxslarga sotilmaydi yoki ixtiyoriy ravishda berilmaydi."}),i.jsx("h4",{children:"4. Xavfsizlik"}),i.jsx("p",{children:"Biz zamonaviy shifrlash usullari va xavfsizlik protokollaridan foydalanamiz. Biroq, parolingizni hech kimga bermaslikni tavsiya qilamiz."})]}):i.jsxs(i.Fragment,{children:[i.jsx("p",{children:"Ushbu shartlar Jamm platformasidan foydalanish qoidalarini belgilaydi. Platformadan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz."}),i.jsx("h4",{children:"1. Foydalanish qoidalari"}),i.jsxs("ul",{children:[i.jsx("li",{children:"Boshqa foydalanuvchilarni haqorat qilmaslik"}),i.jsx("li",{children:"Spam yoki noqonuniy kontent tarqatmaslik"}),i.jsx("li",{children:"Platforma xavfsizligiga zarar yetkazuvchi harakatlar qilmaslik"}),i.jsx("li",{children:"Bellashuvlarda (Arena) halol o'ynash"})]}),i.jsx("h4",{children:"2. Mualliflik huquqi"}),i.jsx("p",{children:"Platformadagi barcha kontent (kurslar, savollar, kodlar) mualliflik huquqi bilan himoyalangan. Ularni ruxsatsiz ko'chirish taqiqlanadi."}),i.jsx("h4",{children:"3. Mas'uliyat"}),i.jsx("p",{children:"Foydalanuvchi o'z hisobi va u orqali amalga oshirilgan barcha harakatlar uchun shaxsan mas'uldir."}),i.jsx("h4",{children:"4. Hisobni o'chirish"}),i.jsx("p",{children:"Biz qoidalarni buzgan foydalanuvchilar hisobini ogohlantirishsiz to'xtatish yoki o'chirish huquqiga egamiz."})]})})]})})]})};export{Ki as default};
