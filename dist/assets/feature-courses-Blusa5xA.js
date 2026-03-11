const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/feature-chats-DsVJGdS1.js","assets/react-vendor-UYnqoc53.js","assets/vendor-CRWlb9wI.js","assets/app-vendor-DTdcG8Is.js","assets/feature-arena-BvqxMZzZ.js","assets/ui-vendor-DFyM_Xd9.js","assets/media-realtime-B2IcwcIy.js","assets/feature-admin-D0NNr8sf.js","assets/feature-app-ICtyfBrQ.js","assets/feature-calls-BqelebZ9.js","assets/router-query-D08THUDE.js","assets/feature-content-DeOnU20_.js","assets/feature-profile-shell-CAAc0ZH1.js"])))=>i.map(i=>d[i]);
import{u as Ea,k as At,A as be,I as Ma,_ as we,M as Ir,a as Ur,b as Qr,i as _t,c as Jr,j as Ls,d as Et,e as Zr,f as et,D as nr}from"./feature-app-ICtyfBrQ.js";import{r as s,j as e,e as De,a as As,n as St,z as $e,R as dt,I as Ba,T as Ra}from"./react-vendor-UYnqoc53.js";import{u as Rn,g as Ia,s as Ua,a as fe,c as Yr,b as _s,S as Na}from"./feature-chats-DsVJGdS1.js";import{a as ue,u as Es,b as Ha,A as Pt}from"./feature-admin-D0NNr8sf.js";import{d as t,C as Oa,b as Fa,X as gr,ao as $s,aN as Va,aO as qa,L as Da,at as In,u as rt,v as tt,P as st,q as ot,o as Tt,aP as Ka,aQ as Un,k as Ga,y as Nn,aR as Wa,z as zt,aS as Hn,w as Xa,F as Ya,aT as On,af as Ts,K as Fn,a4 as Qa,g as Lt,e as Co,aU as Ja,aV as Za,al as ei,aW as ri,a6 as ti,aK as si,aa as $o,ap as To,W as zo,aX as oi,c as ni,aY as Lo,I as ai,aZ as ii,s as li,a_ as ci,a2 as Ao,N as di}from"./ui-vendor-DFyM_Xd9.js";import{S as ui}from"./feature-profile-shell-CAAc0ZH1.js";import{S as Vn,c as pi,f as xi,a as hi,b as mi,d as gi,C as Ms}from"./feature-arena-BvqxMZzZ.js";import{l as fi}from"./media-realtime-B2IcwcIy.js";const yi=async(r=1,l=15)=>{const{data:n}=await ue.get(`/courses?page=${r}&limit=${l}`);return n},bi=async r=>{const{data:l}=await ue.post("/courses",r);return l},vi=async r=>{await ue.delete(`/courses/${r}`)},ji=async({courseId:r,...l})=>{const{data:n}=await ue.post(`/courses/${r}/lessons`,l);return n},wi=async({courseId:r,lessonId:l})=>{await ue.delete(`/courses/${r}/lessons/${l}`)},ki=async({courseId:r,lessonId:l,...n})=>{const{data:o}=await ue.patch(`/courses/${r}/lessons/${l}`,n);return o},Si=async({courseId:r,lessonId:l})=>{const{data:n}=await ue.patch(`/courses/${r}/lessons/${l}/publish`);return n},Pi=async(r,l,n=1,o=15)=>{const{data:h}=await ue.get(`/courses/${r}/lessons/${l}/comments?page=${n}&limit=${o}`);return h},Ci=async({courseId:r,lessonId:l,text:n})=>{await ue.post(`/courses/${r}/lessons/${l}/comments`,{text:n})},$i=async({courseId:r,lessonId:l,commentId:n,text:o})=>{await ue.post(`/courses/${r}/lessons/${l}/comments/${n}/replies`,{text:o})},Ti=async r=>{await ue.post(`/courses/${r}/enroll`)},zi=async({courseId:r,userId:l})=>{await ue.patch(`/courses/${r}/members/${l}/approve`)},Li=async({courseId:r,userId:l})=>{await ue.delete(`/courses/${r}/members/${l}`)},Ai=async({courseId:r,lessonId:l})=>{await ue.patch(`/courses/${r}/lessons/${l}/views`)},_i=async({courseId:r,lessonId:l})=>{const{data:n}=await ue.post(`/courses/${r}/lessons/${l}/like`);return n},Ei=async()=>{const{data:r}=await ue.get("/courses/liked-lessons");return r},Mi=async(r,l)=>{const{data:n}=await ue.get(`/courses/${r}/lessons/${l}/attendance`);return n},Bi=async({courseId:r,lessonId:l,progressPercent:n})=>{const{data:o}=await ue.post(`/courses/${r}/lessons/${l}/attendance/self`,{progressPercent:n});return o},Ri=async({courseId:r,lessonId:l,userId:n,status:o})=>{const{data:h}=await ue.patch(`/courses/${r}/lessons/${l}/attendance/${n}`,{status:o});return h},Ii=async(r,l)=>{const{data:n}=await ue.get(`/courses/${r}/lessons/${l}/homework`);return n},Ui=async(r,l)=>{const{data:n}=await ue.get(`/courses/${r}/lessons/${l}/tests`);return n},Ni=async({courseId:r,lessonId:l,...n})=>{const{data:o}=await ue.patch(`/courses/${r}/lessons/${l}/tests`,n);return o},Hi=async({courseId:r,lessonId:l,linkedTestId:n})=>{const{data:o}=await ue.delete(`/courses/${r}/lessons/${l}/tests/${n}`);return o},Oi=async({courseId:r,lessonId:l,linkedTestId:n,answers:o,sentenceBuilderAnswers:h})=>{const{data:d}=await ue.post(`/courses/${r}/lessons/${l}/tests/${n}/submit`,{answers:Array.isArray(o)?o:[],sentenceBuilderAnswers:Array.isArray(h)?h:[]});return d},Fi=async({courseId:r,lessonId:l,...n})=>{const{data:o}=await ue.patch(`/courses/${r}/lessons/${l}/homework`,n);return o},Vi=async({courseId:r,lessonId:l,assignmentId:n,...o})=>{const{data:h}=await ue.post(`/courses/${r}/lessons/${l}/homework/${n}/submit`,o);return h},qi=async({courseId:r,lessonId:l,assignmentId:n,userId:o,...h})=>{const{data:d}=await ue.patch(`/courses/${r}/lessons/${l}/homework/${n}/review/${o}`,h);return d},Di=async({courseId:r,lessonId:l,assignmentId:n})=>{const{data:o}=await ue.delete(`/courses/${r}/lessons/${l}/homework/${n}`);return o},Xt=async(r,l,n)=>{const o=n?{params:{mediaId:n}}:void 0,{data:h}=await ue.get(`/courses/${r}/lessons/${l}/playback-token`,o);return h},Ki=async(r,l)=>{const{data:n}=await ue.get(`/courses/${r}/lessons/${l}/materials`);return n},Gi=async({courseId:r,lessonId:l,...n})=>{const{data:o}=await ue.patch(`/courses/${r}/lessons/${l}/materials`,n);return o},Wi=async({courseId:r,lessonId:l,materialId:n})=>{const{data:o}=await ue.delete(`/courses/${r}/lessons/${l}/materials/${n}`);return o},Xi=async(r,l)=>{const{data:n}=await ue.get(`/courses/${r}/lessons/${l}/grading`);return n},Yi=async({courseId:r,lessonId:l,userId:n,score:o,note:h})=>{const{data:d}=await ue.patch(`/courses/${r}/lessons/${l}/oral-assessment/${n}`,{score:o,note:h});return d},Qi=async({courseId:r,lessonId:l,assignmentId:n,userId:o})=>{const{data:h}=await ue.get(`/courses/${r}/lessons/${l}/homework/${n}/submissions/${o}/playback-token`);return h},qn=s.createContext(null),tx=({children:r})=>{const[l,n]=s.useState([]),[o,h]=s.useState(!0),[d,A]=s.useState(1),[u,B]=s.useState(!0),v=s.useRef(!1),_=s.useRef(null),P=Es(c=>c.user),O=s.useCallback(c=>c?typeof c=="string"?c:c._id||c.id||c.userId||null:null,[]),C=s.useCallback(c=>l.find(x=>String(x._id||x.id)===String(c)||String(x.urlSlug||"")===String(c)),[l]),T=s.useCallback((c,x)=>{n(g=>g.map(k=>{if(!(String(k._id||k.id)===String(c)||String(k.urlSlug||"")===String(c)))return k;const se=x(Array.isArray(k.members)?k.members:[]);return{...k,members:se}}))},[]),S=s.useCallback(async(c=1)=>{try{c===1&&h(!0);const x=await yi(c,15),g=(x==null?void 0:x.data)||[],k=(x==null?void 0:x.totalPages)||1,ne=g.map(se=>({...se,id:se._id,createdBy:se.createdBy}));n(se=>c===1?ne:[...se,...ne]),A(c),B(c<k),c===1&&(v.current=!0)}catch(x){console.error("Error fetching courses:",x)}finally{c===1&&h(!1)}},[]),E=s.useCallback(async()=>{v.current||await S(1)},[S]);s.useEffect(()=>{},[]),s.useEffect(()=>{if(!(P!=null&&P._id)&&!(P!=null&&P.id))return;const c=Ha("/courses");_.current=fi(c,{withCredentials:!0,transports:["websocket"]});const x=g=>{console.log("Course socket event receive:",g),S()};return _.current.on("course_enrolled",x),_.current.on("member_approved",x),_.current.on("member_rejected",x),_.current.on("member_approved_broadcast",x),_.current.on("member_rejected_broadcast",x),()=>{_.current&&_.current.disconnect()}},[P,S]);const R=s.useCallback(c=>{_.current&&_.current.connected&&_.current.emit("join_course",{courseId:c})},[]),oe=s.useCallback(c=>{_.current&&_.current.connected&&_.current.emit("leave_course",{courseId:c})},[]),D=s.useCallback(async(c,x,g,k,ne,se)=>{try{const Re=await bi({name:c,description:x,image:g,category:k,price:ne,accessType:se});return await S(),Re._id}catch(Re){throw console.error("Error creating course:",Re),Re}},[S]),N=s.useCallback(async c=>{try{return await vi(c),await S(),!0}catch(x){throw console.error("Error deleting course:",x),x}},[S]),y=s.useCallback(async(c,x,g,k,ne="video",se="",Re="",ve=0,Le="direct",Ke=[],ye="",Oe="draft",Xe=[])=>{try{const Ye=await ji({courseId:c,title:x,videoUrl:g,description:k,type:ne,fileUrl:se,fileName:Re,fileSize:ve,streamType:Le,streamAssets:Ke,hlsKeyAsset:ye,status:Oe,mediaItems:Xe});return await S(),Ye}catch(Ye){throw console.error("Error adding lesson:",Ye),Ye}},[S]),te=s.useCallback(async(c,x,g=1,k=15)=>{try{return await Pi(c,x,g,k)}catch(ne){return console.error("Error getting lesson comments:",ne),{data:[],totalPages:1}}},[]),ge=s.useCallback(async(c,x)=>{try{await wi({courseId:c,lessonId:x}),await S()}catch(g){console.error("Error removing lesson:",g)}},[S]),w=s.useCallback(async(c,x,g)=>{try{await ki({courseId:c,lessonId:x,...g}),await S()}catch(k){throw console.error("Error updating lesson:",k),k}},[S]),ce=s.useCallback(async(c,x)=>{try{await Si({courseId:c,lessonId:x}),await S()}catch(g){throw console.error("Error publishing lesson:",g),g}},[S]),he=s.useCallback(async(c,x,g)=>{try{await Ci({courseId:c,lessonId:x,text:g}),await S()}catch(k){console.error("Error adding comment:",k)}},[S]),f=s.useCallback(async(c,x,g,k)=>{try{await $i({courseId:c,lessonId:x,commentId:g,text:k}),await S()}catch(ne){console.error("Error adding reply:",ne)}},[S]),V=s.useCallback(async c=>{const x=C(c),g=O(P);if(!x||!g)return;const k=x.accessType==="free_open"?"approved":"pending",ne={userId:g,name:P.nickname||P.username,avatar:P.avatar||(P.nickname||P.username||"").substring(0,2).toUpperCase(),status:k,joinedAt:new Date().toISOString()};T(c,se=>[...se.filter(ve=>String(O(ve.userId||ve))!==String(g)),ne]);try{await Ti(c)}catch(se){throw console.error("Error enrolling:",se),await S(),se}},[P,S,C,O,T]),J=s.useCallback(async(c,x)=>{T(c,g=>g.map(k=>String(O(k.userId||k))===String(x)?{...k,status:"approved"}:k));try{await zi({courseId:c,userId:x})}catch(g){throw console.error("Error approving user:",g),await S(),g}},[S,O,T]),$=s.useCallback(async(c,x)=>{T(c,g=>g.filter(k=>String(O(k.userId||k))!==String(x)));try{await Li({courseId:c,userId:x})}catch(g){throw console.error("Error removing user:",g),await S(),g}},[S,O,T]),z=s.useCallback(async(c,x)=>{try{await Ai({courseId:c,lessonId:x}),n(g=>g.map(k=>k.id!==c?k:{...k,lessons:k.lessons.map(ne=>ne.id===x?{...ne,views:ne.views+1}:ne)}))}catch(g){console.error("Error incrementing views:",g)}},[]),ae=s.useCallback(async(c,x)=>{try{const{liked:g,likes:k}=await _i({courseId:c,lessonId:x});return n(ne=>ne.map(se=>String(se.id||se._id)===String(c)||String(se.urlSlug||"")===String(c)?{...se,lessons:(se.lessons||[]).map(ve=>String(ve.id||ve._id)===String(x)||String(ve.urlSlug||"")===String(x)?{...ve,liked:g,likes:k}:ve)}:se)),{liked:g,likes:k}}catch(g){throw console.error("Error toggling lesson like:",g),g}},[]),me=s.useCallback(async()=>{try{return await Ei()}catch(c){return console.error("Error fetching liked lessons:",c),[]}},[]),M=s.useCallback(async(c,x)=>{try{return await Mi(c,x)}catch(g){throw console.error("Error fetching lesson attendance:",g),g}},[]),I=s.useCallback(async(c,x,g)=>{try{return await Bi({courseId:c,lessonId:x,progressPercent:g})}catch(k){throw console.error("Error marking own attendance:",k),k}},[]),X=s.useCallback(async(c,x,g,k)=>{try{return await Ri({courseId:c,lessonId:x,userId:g,status:k})}catch(ne){throw console.error("Error setting lesson attendance:",ne),ne}},[]),ie=s.useCallback(async(c,x)=>{try{return await Ii(c,x)}catch(g){throw console.error("Error fetching lesson homework:",g),g}},[]),Y=s.useCallback(async(c,x)=>{try{return await Ui(c,x)}catch(g){throw console.error("Error fetching lesson linked tests:",g),g}},[]),de=s.useCallback(async(c,x,g)=>{try{const k=await Ni({courseId:c,lessonId:x,...g});return await S(),k}catch(k){throw console.error("Error upserting lesson linked test:",k),k}},[S]),ze=s.useCallback(async(c,x,g)=>{try{const k=await Hi({courseId:c,lessonId:x,linkedTestId:g});return await S(),k}catch(k){throw console.error("Error deleting lesson linked test:",k),k}},[S]),L=s.useCallback(async({courseId:c,lessonId:x,linkedTestId:g,answers:k,sentenceBuilderAnswers:ne})=>{try{const se=await Oi({courseId:c,lessonId:x,linkedTestId:g,answers:k,sentenceBuilderAnswers:ne});return await S(),se}catch(se){throw console.error("Error submitting lesson linked test attempt:",se),se}},[S]),H=s.useCallback(async(c,x,g)=>{try{return await Fi({courseId:c,lessonId:x,...g})}catch(k){throw console.error("Error upserting lesson homework:",k),k}},[]),m=s.useCallback(async(c,x,g)=>{try{return await Vi({courseId:c,lessonId:x,...g})}catch(k){throw console.error("Error submitting lesson homework:",k),k}},[]),pe=s.useCallback(async(c,x,g,k,ne)=>{try{return await qi({courseId:c,lessonId:x,assignmentId:g,userId:k,...ne})}catch(se){throw console.error("Error reviewing lesson homework:",se),se}},[]),le=s.useCallback(async(c,x,g)=>{try{return await Di({courseId:c,lessonId:x,assignmentId:g})}catch(k){throw console.error("Error deleting lesson homework:",k),k}},[]),Te=s.useCallback(async(c,x)=>{try{return await Ki(c,x)}catch(g){throw console.error("Error fetching lesson materials:",g),g}},[]),xe=s.useCallback(async(c,x,g)=>{try{return await Gi({courseId:c,lessonId:x,...g})}catch(k){throw console.error("Error upserting lesson material:",k),k}},[]),Ne=s.useCallback(async(c,x,g)=>{try{return await Wi({courseId:c,lessonId:x,materialId:g})}catch(k){throw console.error("Error deleting lesson material:",k),k}},[]),We=s.useCallback(async(c,x)=>{try{return await Xi(c,x)}catch(g){throw console.error("Error fetching lesson grading:",g),g}},[]),j=s.useCallback(async(c,x,g,k)=>{try{return await Yi({courseId:c,lessonId:x,userId:g,...k})}catch(ne){throw console.error("Error setting lesson oral assessment:",ne),ne}},[]),He=s.useCallback(c=>{if(!P)return!1;const x=C(c);return String(O(x==null?void 0:x.createdBy)||"")===String(O(P)||"")},[P,C,O]),tr=s.useCallback(c=>{var ne;if(!P)return"none";const x=C(c),g=String(O(P)||"");if(String(O(x==null?void 0:x.createdBy)||"")===g)return"admin";const k=(ne=x==null?void 0:x.members)==null?void 0:ne.find(se=>String(O(se.userId||se))===g);return k?k.status:"none"},[P,C,O]),Z={courses:l,currentUser:P?{id:O(P),name:P.nickname||P.username,avatar:(P.nickname||P.username||"").substring(0,2).toUpperCase(),isAdmin:!0}:null,createCourse:D,removeCourse:N,addLesson:y,updateLesson:w,publishLesson:ce,removeLesson:ge,getLessonComments:te,addComment:he,addReply:f,enrollInCourse:V,approveUser:J,removeUser:$,incrementViews:z,toggleLessonLike:ae,fetchLikedLessons:me,getLessonAttendance:M,markOwnAttendance:I,setLessonAttendanceStatus:X,getLessonLinkedTests:Y,upsertLessonLinkedTest:de,deleteLessonLinkedTest:ze,submitLessonLinkedTestAttempt:L,getLessonHomework:ie,upsertLessonHomework:H,submitLessonHomework:m,reviewLessonHomework:pe,deleteLessonHomework:le,getLessonMaterials:Te,upsertLessonMaterial:xe,deleteLessonMaterial:Ne,getLessonGrading:We,setLessonOralAssessment:j,isAdmin:He,isEnrolled:tr,loading:o,coursesPage:d,coursesHasMore:u,fetchCourses:S,ensureCoursesLoaded:E,joinCourseRoom:R,leaveCourseRoom:oe};return e.jsx(qn.Provider,{value:Z,children:r})},lr=()=>{const r=s.useContext(qn);if(!r)throw new Error("useCourses must be used within CoursesProvider");return r},Dn=`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 72px;
  width: calc(100vw - 72px);
  height: 100vh;
  z-index: 1500;
  background: var(--background-color);
  box-shadow: 0 0 0 1px var(--border-color), 0 24px 80px rgba(0, 0, 0, 0.28);
  animation: rightPaneFocusIn 0.22s ease-out;

  @keyframes rightPaneFocusIn {
    from {
      opacity: 0.92;
      transform: scale(0.985);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`,Ji=t.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`,Zi=t.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
  }
`,el=t.div`
  position: relative;
  width: 0;
  flex: 0 0 0;
  border-left: 1px solid var(--border-color);
  z-index: ${r=>r.$focused?1601:2};

  ${r=>r.$focused?`
    position: fixed;
    top: 0;
    left: 72px;
    bottom: 0;
    border-left: none;
  `:""}

  @media (max-width: 768px) {
    display: none;
  }
`,rl=t.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateX(-50%);
  width: 24px;
  height: 35px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition:
    background 0.16s ease,
    color 0.16s ease,
    border-color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
    border-color: var(--text-muted-color);
  }
`,Yt=t.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;

  ${r=>r.$focused&&Dn}
`,tl=t.div`
  flex: 1;
  overflow-y: auto;
  position: relative;

  ${r=>r.$focused&&Dn}
`,sl=t.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
`,ol=s.lazy(()=>we(()=>import("./feature-chats-DsVJGdS1.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(r=>({default:r.ChatArea}))),nl=s.lazy(()=>we(()=>import("./feature-chats-DsVJGdS1.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(r=>({default:r.ChatsSidebar}))),al=s.lazy(()=>we(()=>import("./feature-chats-DsVJGdS1.js").then(r=>r.i),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])).then(r=>({default:r.CreateGroupDialog}))),il=s.lazy(()=>we(()=>Promise.resolve().then(()=>Rs),void 0).then(r=>({default:r.CoursePlayer}))),ll=s.lazy(()=>we(()=>Promise.resolve().then(()=>Rs),void 0).then(r=>({default:r.CourseSidebar}))),cl=s.lazy(()=>we(()=>import("./feature-app-ICtyfBrQ.js").then(r=>r.O),__vite__mapDeps([8,2,1,3,7,5,9,6,4,0,10]))),dl=s.lazy(()=>we(()=>import("./feature-app-ICtyfBrQ.js").then(r=>r.t),__vite__mapDeps([8,2,1,3,7,5,9,6,4,0,10]))),Qt=s.lazy(()=>we(()=>import("./feature-app-ICtyfBrQ.js").then(r=>r.v),__vite__mapDeps([8,2,1,3,7,5,9,6,4,0,10]))),ul=s.lazy(()=>we(()=>import("./feature-arena-BvqxMZzZ.js").then(r=>r.i),__vite__mapDeps([4,1,2,3,5,6,7,8,9,0,10])).then(r=>({default:r.ArenaDashboard}))),pl=s.lazy(()=>we(()=>import("./feature-content-DeOnU20_.js").then(r=>r.i),__vite__mapDeps([11,1,2,3,5,7,8,9,6,4,0,10])).then(r=>({default:r.BlogReaderPane}))),xl=s.lazy(()=>we(()=>import("./feature-content-DeOnU20_.js").then(r=>r.i),__vite__mapDeps([11,1,2,3,5,7,8,9,6,4,0,10])).then(r=>({default:r.BlogsSidebar}))),hl=s.lazy(()=>we(()=>import("./feature-calls-BqelebZ9.js").then(r=>r.i),__vite__mapDeps([9,1,2,3,6,7,8,5,0,4,10])).then(r=>({default:r.UniversalDialog}))),ml=s.lazy(()=>we(()=>import("./feature-content-DeOnU20_.js").then(r=>r.j),__vite__mapDeps([11,1,2,3,5,7,8,9,6,4,0,10])).then(r=>({default:r.FeedPage}))),gl=s.lazy(()=>we(()=>import("./feature-profile-shell-CAAc0ZH1.js").then(r=>r.i),__vite__mapDeps([12,1,2,3,0,4,5,6,7,8,9,10,11])).then(r=>({default:r.ProfilePage}))),fl=s.lazy(()=>we(()=>import("./feature-admin-D0NNr8sf.js").then(r=>r.i),__vite__mapDeps([7,1,2,3,8,9,6,5,4,0,10])).then(r=>({default:r.AdminPanel})));function Me({children:r,message:l}){return e.jsx(s.Suspense,{fallback:null,children:r})}const yl=({initialNav:r="home",initialResourceId:l=0,initialLesson:n})=>{const{chats:o,createChat:h,selectedNav:d,setSelectedNav:A,selectedChatId:u,setSelectedChatId:B}=Rn(),{t:v}=De(),_=As(),[U,P]=s.useState(window.innerWidth<=768),[O,C]=s.useState(!1),[T,S]=s.useState(null),[E,R]=s.useState("courses"),[oe,D]=s.useState(null),[N,y]=s.useState(!1),[te,ge]=s.useState(!1),[w,ce]=s.useState(!1),[he,f]=s.useState(!1),[V,J]=s.useState(!1),$=Es(L=>L.user),{isOpen:z,message:ae,openPremiumUpgradeModal:me,closePremiumUpgradeModal:M}=Ea();s.useEffect(()=>{const L=()=>P(window.innerWidth<=768);return window.addEventListener("resize",L),()=>window.removeEventListener("resize",L)},[]),s.useEffect(()=>{ge(!1)},[d,u,T,oe,U]),s.useEffect(()=>{if(!($!=null&&$.isOnboardingCompleted)||d!=="courses"||E!=="courses"||localStorage.getItem("jamm-tour-courses-v1")==="done")return;const L=window.setTimeout(()=>{ce(!0)},450);return()=>window.clearTimeout(L)},[$==null?void 0:$.isOnboardingCompleted,d,E]),s.useEffect(()=>{if(!($!=null&&$.isOnboardingCompleted)||!["chats","users","groups","meets"].includes(d)||u&&u!=="0"&&u!==0||localStorage.getItem("jamm-tour-profile-v1")!=="done"||localStorage.getItem("jamm-tour-chats-v1")==="done")return;const L=window.setTimeout(()=>{f(!0)},450);return()=>window.clearTimeout(L)},[$==null?void 0:$.isOnboardingCompleted,d,u]),s.useEffect(()=>{if(!($!=null&&$.isOnboardingCompleted)||d==="profile"||localStorage.getItem("jamm-tour-profile-v1")==="done"||sessionStorage.getItem("jamm-tour-profile-started")==="done")return;let L=0,H=null;const m=()=>{if(document.querySelector('[data-tour="nav-profile"]')){J(!0);return}L>=15||(L+=1,H=window.setTimeout(m,120))};return H=window.setTimeout(m,500),()=>{H&&window.clearTimeout(H)}},[$==null?void 0:$.isOnboardingCompleted,d]),s.useEffect(()=>{if(l!==void 0&&l!==u&&B(l),r==="a"||r==="chats")d!=="chats"&&A("chats");else if(r==="users"||r==="groups")d!==r&&A(r);else if(r==="arena"){A("arena"),R("arena");const L=window.location.pathname,H={quiz:"tests",test:"tests",flashcard:"flashcards",falshcard:"flashcards",flashcards:"flashcards","sentence-builder":"sentenceBuilders","sentence-builders":"sentenceBuilders",sentences:"sentenceBuilders",gap:"sentenceBuilders","gap-tuzish":"sentenceBuilders",minemonika:"mnemonics",mnemonika:"mnemonics",mnemonic:"mnemonics",mnemonics:"mnemonics",battle:"battles",battles:"battles"};let m=null;L.includes("/arena/quiz-link")||L.includes("/arena/quiz")?m="tests":L.includes("/arena/flashcard")?m="flashcards":L.includes("/arena/sentence-builder")?m="sentenceBuilders":L.includes("/arena/minemonika")?m="mnemonics":L.includes("/arena/battle")?m="battles":m=H[l]||l,m&&["tests","flashcards","sentenceBuilders","mnemonics","battles"].includes(m)?D(m):L==="/arena"&&D(null)}else r!==d&&(A(r),r==="courses"&&R("courses"));(r==="courses"||r==="arena")&&(l&&l!=="0"&&r!=="arena"?S(l):r==="courses"&&(!l||l==="0")&&S(null))},[r,l,o]);const I={feed:()=>we(()=>import("./feature-content-DeOnU20_.js").then(L=>L.j),__vite__mapDeps([11,1,2,3,5,7,8,9,6,4,0,10])),chats:()=>Promise.all([we(()=>import("./feature-chats-DsVJGdS1.js").then(L=>L.i),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10])),we(()=>import("./feature-calls-BqelebZ9.js").then(L=>L.i),__vite__mapDeps([9,1,2,3,6,7,8,5,0,4,10]))]),blogs:()=>we(()=>import("./feature-content-DeOnU20_.js").then(L=>L.i),__vite__mapDeps([11,1,2,3,5,7,8,9,6,4,0,10])),courses:()=>we(()=>Promise.resolve().then(()=>Rs),void 0),arena:()=>we(()=>import("./feature-arena-BvqxMZzZ.js").then(L=>L.i),__vite__mapDeps([4,1,2,3,5,6,7,8,9,0,10])),profile:()=>we(()=>import("./feature-profile-shell-CAAc0ZH1.js").then(L=>L.i),__vite__mapDeps([12,1,2,3,0,4,5,6,7,8,9,10,11])),admin:()=>we(()=>import("./feature-admin-D0NNr8sf.js").then(L=>L.i),__vite__mapDeps([7,1,2,3,8,9,6,5,4,0,10]))},X=L=>{if(I[L]){const H=I[L]();H&&H.catch&&H.catch(()=>{})}},ie=L=>{s.startTransition(()=>{A(L),B(0),L==="arena"?(R("arena"),D(null)):L==="courses"&&R("courses"),_(`/${L}`)})},Y=async L=>{try{const H=await h({isGroup:!0,name:L.name,description:L.description,avatar:L.image,memberIds:L.members});C(!1);const m=(H==null?void 0:H.urlSlug)||(H==null?void 0:H.jammId)||(H==null?void 0:H._id)||(H==null?void 0:H.id);m&&_(`/a/${m}`)}catch(H){console.error("Failed to create group",H),H.message.includes("Premium")||H.message.includes("maksimal")?me({message:H.message,source:"create-group"}):St.error(H.message)}},de=v(te?"layout.minimizePane":"layout.maximizePane"),ze=(L=!0)=>L?e.jsx(el,{$focused:te,children:e.jsx(rl,{type:"button",onClick:()=>ge(H=>!H),title:de,"aria-label":de,children:te?e.jsx(Fa,{size:18}):e.jsx(Oa,{size:18})})}):null;return e.jsxs(Ji,{children:[e.jsx(ui,{selectedNav:d,onSelectNav:ie,onPreloadNav:X}),e.jsx(Zi,{children:d==="courses"||d==="arena"||d==="home"?e.jsxs(e.Fragment,{children:[e.jsx(Me,{message:"Kurslar yuklanmoqda...",children:e.jsx(ll,{onSelectCourse:S,onOpenPremium:()=>me({source:"courses-sidebar"}),viewMode:d==="arena"?"arena":E,onToggleViewMode:R,selectedCourse:T,activeArenaTab:oe,setActiveArenaTab:D})}),d==="arena"||d==="home"||E==="arena"?e.jsxs(e.Fragment,{children:[ze(!0),e.jsx(tl,{$focused:te,children:e.jsx(Me,{message:"Arena yuklanmoqda...",children:e.jsx(ul,{activeTab:oe,initialId:r==="arena"&&l&&!["tests","flashcards","sentenceBuilders","mnemonics","battles","quiz","quiz-link","flashcard","sentence-builder","minemonika","battle","0"].includes(l)?l:n,onBack:()=>{D(null),_("/arena")}})})})]}):e.jsxs(e.Fragment,{children:[ze(!!T),e.jsx(Yt,{$focused:te,"data-tour":"courses-content",children:e.jsx(Me,{message:"Dars yuklanmoqda...",children:e.jsx(il,{courseId:T,initialLessonSlug:n,onClose:()=>{S(null),_("/courses")}})})})]})]}):d==="profile"?e.jsx(Me,{message:"Profil yuklanmoqda...",children:e.jsx(gl,{profileUserId:l&&l!==0&&l!=="0"?String(l):null,isFocused:te,onToggleFocus:()=>ge(L=>!L)})}):d==="admin"?e.jsx(Me,{message:"Admin panel yuklanmoqda...",children:e.jsx(fl,{})}):d==="blogs"?e.jsxs(e.Fragment,{children:[!U||!u||u==="0"?e.jsx(Me,{message:"Bloglar yuklanmoqda...",children:e.jsx(xl,{selectedBlogId:u})}):null,ze(!!(u&&u!=="0")),e.jsx(Yt,{$focused:te,children:e.jsx(Me,{message:"Blog yuklanmoqda...",children:e.jsx(pl,{blogIdentifier:u,onBack:()=>{B(0),_("/blogs")}})})})]}):d==="feed"?e.jsx(Me,{message:"Lenta yuklanmoqda...",children:e.jsx(ml,{})}):e.jsxs(e.Fragment,{children:[!U||!u||u==="0"?e.jsx(Me,{message:"Chatlar yuklanmoqda...",children:e.jsx(nl,{selectedChatId:u,selectedNav:d,chats:o,onOpenCreateGroup:()=>C(!0),onOpenCreateMeet:()=>y(!0)})}):null,ze(!!(u&&u!=="0")),e.jsx(Yt,{$focused:te,"data-tour":"chats-content",children:u&&u!=="0"?e.jsx(Me,{message:"Suhbat yuklanmoqda...",children:e.jsx(ol,{selectedChatId:u,selectedNav:d,chats:o,navigate:_,onBack:()=>{B(0),_(`/${d}`)}})}):e.jsx(sl,{children:v(d==="meets"?"layout.selectMeet":"layout.selectChat")})})]})}),O&&e.jsx(Me,{message:"Dialog yuklanmoqda...",children:e.jsx(al,{isOpen:O,onClose:()=>C(!1),onCreate:Y,users:o.filter(L=>L.type==="user"&&!L.isSavedMessages).map(L=>{var m;const H=(m=L.members)==null?void 0:m.find(pe=>(pe._id||pe.id)!==(($==null?void 0:$._id)||($==null?void 0:$.id)));return{...H,id:(H==null?void 0:H._id)||(H==null?void 0:H.id),name:(H==null?void 0:H.nickname)||(H==null?void 0:H.username)||"Noma'lum"}}).filter(L=>L.id)})}),z&&e.jsx(Me,{message:"Premium oynasi yuklanmoqda...",children:e.jsx(dl,{isOpen:z,message:ae,onClose:M,onUpgrade:()=>{M(),sessionStorage.setItem("profile_initial_tab","premium"),A("profile"),B(0),_("/profile")}})}),N&&e.jsx(Me,{message:"Video qo‘ng‘iroq oynasi yuklanmoqda...",children:e.jsx(hl,{isOpen:N,onClose:()=>y(!1),onCreateCall:async({title:L,isPrivate:H})=>{if($){const pe=At($),Te=(await Ia()).filter(Ne=>{var We;return Ne.creator===($==null?void 0:$._id)||((We=Ne.creator)==null?void 0:We._id)===($==null?void 0:$._id)}),xe=pe?be.meetsCreated.premium:be.meetsCreated.ordinary;if(Te.length>=xe){y(!1),me({message:v("premiumModal.meetCreateLimit",{count:xe}),source:"meet-create"});return}}const m=L.toLowerCase().replace(/\s+/g,"-")+"-"+Date.now().toString().slice(-4);await Ua({roomId:m,title:L,isPrivate:H,isCreator:!0}),_(`/join/${m}`)}})}),w&&e.jsx(Me,{message:"Tour yuklanmoqda...",children:e.jsx(Qt,{isOpen:w,onClose:()=>ce(!1),storageKey:"jamm-tour-courses-v1",steps:[{selector:'[data-tour="courses-search"]',title:v("featureTour.courses.searchTitle"),description:v("featureTour.courses.searchDescription")},{selector:'[data-tour="courses-tabs"]',title:v("featureTour.courses.tabsTitle"),description:v("featureTour.courses.tabsDescription")},{selector:'[data-tour="courses-create"]',title:v("featureTour.courses.createTitle"),description:v("featureTour.courses.createDescription")},{selector:'[data-tour="courses-list"]',title:v("featureTour.courses.listTitle"),description:v("featureTour.courses.listDescription")},{selector:'[data-tour="courses-content"]',title:v("featureTour.courses.contentTitle"),description:v("featureTour.courses.contentDescription")}]})}),he&&e.jsx(Me,{message:"Tour yuklanmoqda...",children:e.jsx(Qt,{isOpen:he,onClose:()=>f(!1),storageKey:"jamm-tour-chats-v1",onStepChange:L=>{if(B(0),L<=2){A("users"),_("/users",{replace:!0});return}if(L===3){A("groups"),_("/groups",{replace:!0});return}if(L===4){A("meets"),_("/meets",{replace:!0});return}A("users"),_("/users",{replace:!0})},steps:[{selector:'[data-tour="chats-search"]',title:v("featureTour.chats.searchTitle"),description:v("featureTour.chats.searchDescription")},{selector:'[data-tour="chats-tabs"]',title:v("featureTour.chats.tabsTitle"),description:v("featureTour.chats.tabsDescription")},{selector:'[data-tour="chats-tab-private"]',title:v("featureTour.chats.privateTabTitle"),description:v("featureTour.chats.privateTabDescription")},{selector:'[data-tour="chats-tab-groups"]',title:v("featureTour.chats.groupsTabTitle"),description:v("featureTour.chats.groupsTabDescription")},{selector:'[data-tour="chats-tab-video"]',title:v("featureTour.chats.videoTabTitle"),description:v("featureTour.chats.videoTabDescription")},{selector:'[data-tour="chats-list"]',title:v("featureTour.chats.listTitle"),description:v("featureTour.chats.listDescription")},{selector:'[data-tour="chats-content"]',title:v("featureTour.chats.contentTitle"),description:v("featureTour.chats.contentDescription")}]})}),V&&e.jsx(Me,{message:"Tour yuklanmoqda...",children:e.jsx(Qt,{isOpen:V,onClose:()=>{sessionStorage.setItem("jamm-tour-profile-started","done"),J(!1)},steps:[{selector:'[data-tour="nav-profile"]',title:v("featureTour.profile.entryTitle"),description:v("featureTour.profile.entryDescription"),onNext:async()=>{sessionStorage.setItem("jamm-tour-profile-autostart","1"),sessionStorage.setItem("jamm-tour-profile-started","done"),J(!1),A("profile"),B(0),_("/profile")}}]})}),$&&$.isOnboardingCompleted&&e.jsx(Ma,{currentUser:$}),$&&!$.isOnboardingCompleted&&e.jsx(Me,{message:"Onboarding yuklanmoqda...",children:e.jsx(cl,{})})]})},sx=Object.freeze(Object.defineProperty({__proto__:null,default:yl},Symbol.toStringTag,{value:"Module"})),bl=t.div`
  position: fixed;
  inset: 0;
  z-index: 10040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);

  @media (max-width: 640px) {
    padding: 12px;
  }
`,vl=t.div`
  width: min(100%, 560px);
  max-width: 100%;
  max-height: min(90vh, 760px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);

  @media (max-width: 640px) {
    width: 100%;
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`,jl=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 640px) {
    padding: 16px 16px 12px;
  }
`,wl=t.div`
  display: grid;
  gap: 4px;
`,kl=t.h2`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`,Sl=t.p`
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-muted-color);
`,Pl=t.div`
  display: grid;
  gap: 16px;
  padding: 16px 18px 18px;
  overflow-y: auto;

  @media (max-width: 640px) {
    gap: 12px;
    padding: 14px 16px 16px;
  }
`,Dr=t.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`,Kr=t.label`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`,Jt=t.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid
    ${r=>r.$outlined?"color-mix(in srgb, var(--border-color) 80%, var(--text-muted-color) 20%)":"transparent"};
  border-radius: 10px;
  background: ${r=>r.$outlined?"var(--secondary-color)":"var(--input-color)"};
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,Cl=t.textarea`
  width: 100%;
  min-width: 0;
  min-height: 88px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.45;
  font-family: inherit;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`,jr=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
`,$l=t.div`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--warning-color) 28%, transparent);
  background: color-mix(in srgb, var(--warning-color) 10%, transparent);
  color: var(--warning-color);
  font-size: 13px;
  line-height: 1.45;
`,Tl=t.div`
  display: flex;
  gap: 6px;
  padding: 4px;
  border-radius: 10px;
  background: var(--input-color);
`,_o=t.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  padding: 9px 10px;
  border: none;
  border-radius: 8px;
  background: ${r=>r.$active?"var(--primary-color)":"transparent"};
  color: ${r=>r.$active?"white":"var(--text-secondary-color)"};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;

  &:hover {
    color: ${r=>r.$active?"white":"var(--text-color)"};
    background: ${r=>r.$active?"var(--primary-color)":"var(--hover-color)"};
  }
`,zl=t.div`
  display: grid;
  gap: 10px;
`,Ll=t.label`
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: 22px 16px;
  border-radius: 12px;
  border: 1px dashed var(--border-color);
  background: var(--input-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`,Al=t.input`
  display: none;
`,_l=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
`,El=t.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
`,Ml=t.div`
  min-width: 0;
`,Bl=t.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
`,Rl=t.div`
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-muted-color);
`,Il=t.div`
  display: grid;
  gap: 8px;
`,Ul=t.div`
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`,Nl=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,Hl=t.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary-color);
`,Ol=t.button`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;

  &:hover {
    color: var(--danger-color);
    background: color-mix(in srgb, var(--danger-color) 14%, transparent);
  }
`,Fl=t.div`
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
`,Vl=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
`,ql=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,Dl=t.div`
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--border-color) 72%, transparent);
`,Kl=t.div`
  width: ${r=>r.$width||"0%"};
  height: 100%;
  border-radius: inherit;
  background: var(--primary-color);
  transition: width 0.18s ease;
`,Gl=t.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 640px) {
    padding: 12px 16px 16px;
    flex-direction: column-reverse;
    align-items: stretch;
  }
`,Zt=t.button`
  min-width: 110px;
  padding: 10px 16px;
  border: 1px solid
    ${r=>r.$primary?"var(--primary-color)":"var(--border-color)"};
  border-radius: 10px;
  background: ${r=>r.$primary?"var(--primary-color)":"var(--input-color)"};
  color: ${r=>r.$primary?"white":"var(--text-color)"};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.18s ease, transform 0.18s ease;

  &:hover {
    opacity: ${r=>r.disabled?1:.92};
    transform: ${r=>r.disabled?"none":"translateY(-1px)"};
  }

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    width: ${r=>r.$grow?"100%":"auto"};
  }
`,Wl=t.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`,Xl=r=>(r==null?void 0:r._id)||(r==null?void 0:r.id)||(r==null?void 0:r.urlSlug)||"",Kn=({isOpen:r,onClose:l,courseId:n,lesson:o=null,onSaved:h})=>{var He,tr;const{t:d}=De(),{addLesson:A,updateLesson:u,publishLesson:B}=lr(),v=Es(Z=>Z.user),U=At(v)?be.lessonVideosPerLesson.premium:be.lessonVideosPerLesson.ordinary,P=!!o,O=s.useRef(null),[C,T]=s.useState(""),[S,E]=s.useState(""),[R,oe]=s.useState("upload"),[D,N]=s.useState(""),[y,te]=s.useState([]),[ge,w]=s.useState([]),[ce,he]=s.useState(!1),[f,V]=s.useState(!1),[J,$]=s.useState(0),[z,ae]=s.useState(0),[me,M]=s.useState(0),[I,X]=s.useState("idle"),ie=s.useCallback(()=>{T(""),E(""),N(""),te([]),w([]),he(!1),$(0),ae(0),M(0),X("idle"),oe("upload"),O.current&&(O.current.value="")},[]);s.useEffect(()=>{if(r){if(o){T(o.title||""),E(o.description||""),N(o.type==="video"&&o.videoUrl||""),oe(o.type==="video"?"url":"upload"),he(!1),te([]),w((Array.isArray(o.mediaItems)&&o.mediaItems.length?o.mediaItems:o.videoUrl||o.fileUrl?[o]:[]).map((Z,c)=>{var x;return Z.title||((x=Z.fileName)==null?void 0:x.replace(/\.[^.]+$/u,""))||`${o.title||d("addLesson.lessonName")} ${c+1}`})),$(0),ae(0),M(0),X("idle"),O.current&&(O.current.value="");return}ie()}},[r,o,ie,d]);const Y=s.useMemo(()=>!o||R!=="upload"||ce||o.type!=="file"?null:(Array.isArray(o.mediaItems)&&o.mediaItems.length?o.mediaItems:o.videoUrl||o.fileUrl?[{fileName:o.fileName||o.title,fileSize:o.fileSize||0,videoUrl:o.videoUrl||"",fileUrl:o.fileUrl||"",streamType:o.streamType||"direct",streamAssets:Array.isArray(o.streamAssets)?o.streamAssets:[],hlsKeyAsset:o.hlsKeyAsset||""}]:[]).map((c,x)=>({id:c.mediaId||c._id||`existing-${x}`,title:c.title||"",name:c.fileName||c.title||`${o.title} ${x+1}`,size:c.fileSize||0,durationSeconds:c.durationSeconds||0,videoUrl:c.videoUrl||"",fileUrl:c.fileUrl||"",streamType:c.streamType||"direct",streamAssets:Array.isArray(c.streamAssets)?c.streamAssets:[],hlsKeyAsset:c.hlsKeyAsset||""})),[ce,o,R]),de=Z=>{if(!Z)return"0 Bytes";const c=["Bytes","KB","MB","GB"],x=Math.floor(Math.log(Z)/Math.log(1024));return`${parseFloat((Z/1024**x).toFixed(2))} ${c[x]}`},ze=s.useMemo(()=>R==="url"?!!D.trim():!!(y.length||Y!=null&&Y.length),[Y,R,y,D]),L=s.useMemo(()=>y.reduce((Z,c)=>Z+Number(c.size||0),0),[y]),H=s.useMemo(()=>y.length?y.map((Z,c)=>{var x,g;return ge[c]||((g=(x=y[c])==null?void 0:x.name)==null?void 0:g.replace(/\.[^.]+$/u,""))||`${C.trim()||d("addLesson.lessonName")} ${c+1}`}):Y!=null&&Y.length?Y.map((Z,c)=>{var x;return ge[c]||Z.title||((x=Z.name)==null?void 0:x.replace(/\.[^.]+$/u,""))||`${C.trim()||d("addLesson.lessonName")} ${c+1}`}):[],[Y,d,C,y,ge]),m=(o==null?void 0:o.status)==="draft",pe=Xl(o);if(!r)return null;const le=Z=>{const c=Array.from(Z.target.files||[]);if(!c.length)return;if(c.length>U){St.error(d("addLesson.videoCountLimitError",{count:U})),Z.target.value="";return}const x=c.reduce((g,k)=>g+Number(k.size||0),0);if(x>be.lessonMediaBytes){St.error(d("addLesson.totalUploadLimitError")),Z.target.value="";return}te(c),w(c.map((g,k)=>g.name.replace(/\.[^.]+$/u,"")||`${C.trim()||d("addLesson.lessonName")} ${k+1}`)),he(!1),$(0),ae(0),M(x||0),X("idle")},Te=()=>{te([]),w([]),N(""),R==="upload"&&he(!0),$(0),ae(0),M(0),X("idle"),O.current&&(O.current.value="")},xe=async()=>{var c,x,g,k,ne,se,Re;const Z={title:C.trim(),description:S.trim(),type:"video",videoUrl:"",fileUrl:"",fileName:"",fileSize:0,durationSeconds:0,streamType:"direct",streamAssets:[],hlsKeyAsset:"",mediaItems:[]};if(R==="url")return{...Z,type:"video",videoUrl:D.trim()};if(y.length){const ve=[],Le=y.reduce((Oe,Xe)=>Oe+Number(Xe.size||0),0);let Ke=0;for(let Oe=0;Oe<y.length;Oe+=1){const Xe=y[Oe],Ye=new FormData;Ye.append("file",Xe);const{data:Pe}=await ue.post("/courses/upload-media",Ye,{onUploadProgress:ee=>{const Qe=ee.loaded||0,qe=Le?Math.min(100,Math.round((Ke+Qe)/Le*100)):0;X(qe>=100?"processing":"uploading"),M(Le),ae(Math.min(Ke+Qe,Le)),$(qe)}});Ke+=Number(Xe.size||0),ve.push({title:H[Oe]||(y.length>1?`${C.trim()||d("addLesson.lessonName")} ${Oe+1}`:C.trim()),videoUrl:Pe.manifestUrl||"",fileUrl:Pe.fileUrl||Pe.url||"",fileName:Pe.fileName||Xe.name,fileSize:Pe.fileSize||Xe.size||0,durationSeconds:Number(Pe.durationSeconds||0),streamType:Pe.streamType||"direct",streamAssets:Array.isArray(Pe.assetKeys)?Pe.assetKeys:[],hlsKeyAsset:Pe.hlsKeyAsset||""})}const ye=ve[0]||null;return{...Z,type:"file",videoUrl:(ye==null?void 0:ye.videoUrl)||"",fileUrl:(ye==null?void 0:ye.fileUrl)||"",fileName:(ye==null?void 0:ye.fileName)||"",fileSize:(ye==null?void 0:ye.fileSize)||0,streamType:(ye==null?void 0:ye.streamType)||"direct",streamAssets:(ye==null?void 0:ye.streamAssets)||[],hlsKeyAsset:(ye==null?void 0:ye.hlsKeyAsset)||"",mediaItems:ve}}if(Y!=null&&Y.length&&o){const ve=Y.map((Le,Ke)=>({title:H[Ke]||`${C.trim()||o.title} ${Y.length>1?Ke+1:""}`.trim(),videoUrl:Le.videoUrl||"",fileUrl:Le.fileUrl||"",fileName:Le.name||"",fileSize:Le.size||0,durationSeconds:Le.durationSeconds||0,streamType:Le.streamType||"direct",streamAssets:Le.streamAssets||[],hlsKeyAsset:Le.hlsKeyAsset||""}));return{...Z,type:"file",videoUrl:((c=ve[0])==null?void 0:c.videoUrl)||"",fileUrl:((x=ve[0])==null?void 0:x.fileUrl)||"",fileName:((g=ve[0])==null?void 0:g.fileName)||"",fileSize:((k=ve[0])==null?void 0:k.fileSize)||0,streamType:((ne=ve[0])==null?void 0:ne.streamType)||"direct",streamAssets:((se=ve[0])==null?void 0:se.streamAssets)||[],hlsKeyAsset:((Re=ve[0])==null?void 0:Re.hlsKeyAsset)||"",mediaItems:ve}}return{...Z,type:"file",mediaItems:[]}},Ne=async({publish:Z=!1})=>{if(!(!C.trim()||f)&&!(Z&&!ze)){V(!0),X(R==="upload"&&y.length?"uploading":"saving");try{const c=await xe();let x="draft";P?(X("saving"),await u(n,pe,c),Z?(await B(n,pe),x="published"):!c.videoUrl&&!c.fileUrl?x="draft":x=(o==null?void 0:o.status)||"draft"):(X("saving"),await A(n,c.title,c.videoUrl,c.description,c.type,c.fileUrl,c.fileName,c.fileSize,c.streamType,c.streamAssets,c.hlsKeyAsset,Z?"published":"draft",c.mediaItems||[]),x=Z?"published":"draft"),h==null||h({lessonId:pe,status:x,mode:P?"edit":"create"}),ie(),l()}catch(c){console.error(c),St.error(d("addLesson.uploadError"))}finally{V(!1),X("idle")}}},We=d(P?m?"addLesson.saveDraft":"addLesson.saveChanges":"addLesson.createDraft"),j=d(m?"addLesson.publish":"addLesson.saveAndPublish");return e.jsx(bl,{onClick:l,children:e.jsxs(vl,{onClick:Z=>Z.stopPropagation(),children:[e.jsxs(jl,{children:[e.jsxs(wl,{children:[e.jsx(kl,{children:d(P?"addLesson.editTitle":"addLesson.title")}),e.jsx(Sl,{children:d(P?"addLesson.editSubtitle":"addLesson.createSubtitle")})]}),e.jsx(Vn,{onClick:l,children:e.jsx(gr,{size:18})})]}),e.jsxs(Pl,{children:[P&&m&&e.jsx($l,{children:d("addLesson.draftNotice")}),e.jsxs(Dr,{children:[e.jsx(Kr,{children:d("addLesson.lessonName")}),e.jsx(Jt,{type:"text",value:C,autoFocus:!0,maxLength:be.lessonTitleChars,placeholder:d("addLesson.lessonNamePlaceholder"),onChange:Z=>T(Z.target.value.slice(0,be.lessonTitleChars))}),e.jsxs(jr,{children:[C.length,"/",be.lessonTitleChars]})]}),e.jsxs(Dr,{children:[e.jsx(Kr,{children:d("addLesson.source")}),e.jsxs(Tl,{children:[e.jsxs(_o,{type:"button",$active:R==="upload",onClick:()=>{oe("upload"),N("")},children:[e.jsx($s,{style:{flexShrink:0},size:14}),d("addLesson.uploadTab")]}),e.jsxs(_o,{type:"button",$active:R==="url",onClick:()=>{oe("url"),he(!0),te([])},children:[e.jsx(Va,{size:14})," ",d("addLesson.youtubeTab")]})]}),e.jsx(jr,{children:d("addLesson.videoCountLimitHint",{count:U})})]}),R==="upload"?e.jsxs(Dr,{children:[e.jsx(Kr,{children:d("addLesson.fileLabel")}),e.jsxs(zl,{children:[!y.length&&!(Y!=null&&Y.length)?e.jsxs(Ll,{children:[e.jsx($s,{size:22}),e.jsx("strong",{children:d("addLesson.fileDropTitle")}),e.jsx(jr,{children:d("addLesson.fileDropMeta")}),e.jsx(jr,{children:d("addLesson.videoCountLimitHint",{count:U})}),e.jsx(Al,{ref:O,type:"file",accept:"video/*",multiple:U>1,onChange:le})]}):e.jsxs(_l,{children:[e.jsxs(El,{children:[e.jsx(qa,{size:18,color:"var(--primary-color)"}),e.jsxs(Ml,{children:[e.jsx(Bl,{children:y.length?y.length===1?(He=y[0])==null?void 0:He.name:d("addLesson.multiFileCount",{count:y.length}):(Y==null?void 0:Y.length)===1?(tr=Y[0])==null?void 0:tr.name:d("addLesson.multiFileCount",{count:(Y==null?void 0:Y.length)||0})}),e.jsx(Rl,{children:de(L||(Y==null?void 0:Y.reduce((Z,c)=>Z+Number(c.size||0),0))||0)})]})]}),e.jsx(Ol,{type:"button",disabled:f,onClick:Te,children:e.jsx(gr,{size:16})})]}),H.length?e.jsx(Il,{children:H.map((Z,c)=>{var x,g;return e.jsxs(Ul,{children:[e.jsxs(Nl,{children:[e.jsx(Hl,{children:d("addLesson.videoNameLabel",{index:c+1})}),e.jsx(jr,{children:((x=y[c])==null?void 0:x.name)||((g=Y==null?void 0:Y[c])==null?void 0:g.name)||""})]}),e.jsx(Jt,{$outlined:!0,type:"text",value:Z,maxLength:be.lessonTitleChars,placeholder:d("addLesson.videoNamePlaceholder"),onChange:k=>w(ne=>{const se=[...ne];return se[c]=k.target.value.slice(0,be.lessonTitleChars),se})})]},`media-title-${c}`)})}):null,f&&R==="upload"&&e.jsxs(Fl,{children:[e.jsxs(Vl,{children:[e.jsx("span",{children:d(I==="processing"?"addLesson.processing":I==="saving"?"addLesson.savingLesson":"addLesson.uploading")}),e.jsx("span",{children:I==="processing"||I==="saving"?d("addLesson.preparing"):`${J}%`})]}),e.jsx(Dl,{children:e.jsx(Kl,{$width:I==="processing"||I==="saving"?"100%":`${J}%`})}),e.jsx(ql,{children:I==="processing"?d("addLesson.processingMeta"):I==="saving"?d("addLesson.savingMeta"):`${de(z)} / ${de(me||L||0)}`})]})]})]}):e.jsxs(Dr,{children:[e.jsx(Kr,{children:d("addLesson.youtubeLabel")}),e.jsx(Jt,{type:"url",value:D,placeholder:"https://youtu.be/...",onChange:Z=>N(Z.target.value)}),e.jsx(jr,{children:d("addLesson.optionalMediaHint")})]}),e.jsxs(Dr,{children:[e.jsx(Kr,{children:d("addLesson.description")}),e.jsx(Cl,{value:S,maxLength:be.lessonDescriptionChars,placeholder:d("addLesson.descriptionPlaceholder"),onChange:Z=>E(Z.target.value.slice(0,be.lessonDescriptionChars))}),e.jsxs(jr,{children:[S.length,"/",be.lessonDescriptionChars]})]})]}),e.jsxs(Gl,{children:[e.jsx(Zt,{type:"button",onClick:l,disabled:f,children:d("common.cancel")}),e.jsx(Zt,{type:"button",disabled:!C.trim()||f,onClick:()=>Ne({publish:!1}),children:f&&I!=="idle"?e.jsxs(Wl,{children:[e.jsx(Da,{size:15,className:"spin"}),I==="processing"?d("addLesson.processingShort"):I==="saving"?d("addLesson.savingShort"):`${J}%`]}):We}),e.jsx(Zt,{type:"button",$primary:!0,$grow:!0,disabled:!C.trim()||!ze||f,onClick:()=>Ne({publish:!0}),children:j})]})]})})},Gn=s.createContext(null),Yl=({value:r,children:l})=>e.jsx(Gn.Provider,{value:r,children:l}),Sr=()=>{const r=s.useContext(Gn);if(!r)throw new Error("useCoursePlayerContext must be used inside CoursePlayerProvider");return r},Ql=t.div`
  padding: 18px 24px 24px;
  border-top: 0;
`,Jl=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`,Zl=t.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`,Eo=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,Mo=t.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
`,ut=t.div`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`,es=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,rs=t.div`
  margin-top: 4px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`,Bo=t.div`
  display: grid;
  gap: 8px;
`,Ro=t.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) auto auto;
  gap: 10px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`,ec=t.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,rc=t.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tertiary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
`,tc=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,sc=t.div`
  min-width: 0;
`,oc=t.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`,nc=t.div`
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-muted-color);
`,Io=t.div`
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  color: ${r=>r.$status==="present"?"var(--success-color)":r.$status==="late"?"var(--warning-color)":"var(--danger-color)"};
  background: ${r=>r.$status==="present"?"color-mix(in srgb, var(--success-color) 12%, transparent)":r.$status==="late"?"color-mix(in srgb, var(--warning-color) 12%, transparent)":"color-mix(in srgb, var(--danger-color) 12%, transparent)"};
`,ac=t.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,ic=t.button`
  padding: 7px 10px;
  border: 1px solid
    ${r=>r.$active?r.$status==="present"?"var(--success-color)":r.$status==="late"?"var(--warning-color)":"var(--danger-color)":"var(--border-color)"};
  border-radius: 999px;
  white-space: nowrap;
  background: ${r=>r.$active?r.$status==="present"?"color-mix(in srgb, var(--success-color) 12%, transparent)":r.$status==="late"?"color-mix(in srgb, var(--warning-color) 12%, transparent)":"color-mix(in srgb, var(--danger-color) 12%, transparent)":"var(--secondary-color)"};
  color: ${r=>r.$active?r.$status==="present"?"var(--success-color)":r.$status==="late"?"var(--warning-color)":"var(--danger-color)":"var(--text-secondary-color)"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`,lc=t.div`
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
`,Uo=t.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  text-align: center;
`,cc=r=>(r||"?").charAt(0).toUpperCase(),dc=r=>typeof r=="string"&&/^(https?:\/\/|\/)/i.test(r.trim()),uc=()=>{var O;const{t:r}=De(),{getLessonAttendance:l,setLessonAttendanceStatus:n}=lr(),{admin:o,courseId:h,currentLessonData:d}=Sr(),[A,u]=s.useState(null),[B,v]=s.useState(!1),_=(d==null?void 0:d._id)||(d==null?void 0:d.id)||(d==null?void 0:d.urlSlug);s.useEffect(()=>{if(!h||!_)return;let C=!1;return(async()=>{try{v(!0);const S=await l(h,_);C||u(S)}catch{C||u(null)}finally{C||v(!1)}})(),()=>{C=!0}},[h,l,_]);const U=s.useMemo(()=>{var T;if(o)return(A==null?void 0:A.summary)||{present:0,late:0,absent:0};const C=(T=A==null?void 0:A.self)==null?void 0:T.status;return{present:C==="present"?1:0,late:C==="late"?1:0,absent:!C||C==="absent"?1:0}},[o,A]),P=async(C,T)=>{try{const S=await n(h,_,C,T);u(S)}catch(S){console.error(S)}};return e.jsxs(Ql,{children:[e.jsxs(Jl,{children:[e.jsx(Zl,{children:r("coursePlayer.attendance.title")}),e.jsx(Eo,{children:r(B?"common.loading":o?"coursePlayer.attendance.adminHint":"coursePlayer.attendance.studentHint")})]}),B?e.jsxs(e.Fragment,{children:[e.jsx(Mo,{children:[0,1,2].map(C=>e.jsxs(ut,{children:[e.jsx(fe,{width:"55%",height:"12px",borderRadius:"8px"}),e.jsx(fe,{width:"38%",height:"20px",borderRadius:"8px",mb:"0"})]},C))}),e.jsx(Bo,{children:[0,1,2].map(C=>e.jsxs(Ro,{children:[e.jsxs(Yr,{gap:"10px",mb:"0",children:[e.jsx(_s,{size:"34px"}),e.jsxs("div",{children:[e.jsx(fe,{width:"42%",height:"13px",borderRadius:"8px"}),e.jsx(fe,{width:"26%",height:"11px",borderRadius:"8px",mb:"0"})]})]}),e.jsx(fe,{width:"76px",height:"26px",borderRadius:"999px",mb:"0"}),e.jsxs(Yr,{gap:"6px",mb:"0",children:[e.jsx(fe,{width:"74px",height:"30px",borderRadius:"8px",mb:"0"}),e.jsx(fe,{width:"74px",height:"30px",borderRadius:"8px",mb:"0"}),e.jsx(fe,{width:"74px",height:"30px",borderRadius:"8px",mb:"0"})]})]},C))})]}):e.jsxs(Mo,{children:[e.jsxs(ut,{children:[e.jsx(es,{children:r("coursePlayer.attendance.present")}),e.jsx(rs,{children:U.present||0})]}),e.jsxs(ut,{children:[e.jsx(es,{children:r("coursePlayer.attendance.late")}),e.jsx(rs,{children:U.late||0})]}),e.jsxs(ut,{children:[e.jsx(es,{children:r("coursePlayer.attendance.absent")}),e.jsx(rs,{children:U.absent||0})]})]}),!B&&o?(O=A==null?void 0:A.members)!=null&&O.length?e.jsx(Bo,{children:A.members.map(C=>e.jsxs(Ro,{children:[e.jsxs(ec,{children:[e.jsx(rc,{children:dc(C.userAvatar)?e.jsx(tc,{src:C.userAvatar,alt:C.userName}):cc(C.userName)}),e.jsxs(sc,{children:[e.jsx(oc,{children:C.userName}),e.jsx(nc,{children:r("coursePlayer.attendance.progress",{percent:Math.round(C.progressPercent||0)})})]})]}),e.jsx(Io,{$status:C.status,children:r(`coursePlayer.attendance.status.${C.status}`)}),e.jsx(ac,{children:["present","late","absent"].map(T=>e.jsx(ic,{type:"button",$status:T,$active:C.status===T,onClick:()=>P(String(C.userId),T),children:r(`coursePlayer.attendance.status.${T}`)},T))})]},String(C.userId)))}):e.jsx(Uo,{children:r("coursePlayer.attendance.empty")}):!B&&(A!=null&&A.self)?e.jsxs(lc,{children:[e.jsx(Io,{$status:A.self.status,children:r(`coursePlayer.attendance.status.${A.self.status}`)}),e.jsx(Eo,{children:r("coursePlayer.attendance.progress",{percent:Math.round(A.self.progressPercent||0)})})]}):B?null:e.jsx(Uo,{children:r("coursePlayer.attendance.noRecord")})]})},pc=t.div`
  padding: 18px 24px 24px;
  display: grid;
  gap: 14px;
`,xc=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,hc=t.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`,mc=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,_r=t.div`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
`,pt=t.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`,Er=t.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,_e=t.div`
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
`,Be=t.div`
  font-size: 11px;
  color: var(--text-muted-color);
`,Ve=t.div`
  margin-top: 3px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,ts=t.div`
  display: grid;
  gap: 8px;

  @media (max-width: 820px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`,No=t.div`
  display: grid;
  grid-template-columns: ${r=>r.$columns===5?"minmax(180px, 1.65fr) repeat(4, minmax(88px, 0.8fr))":r.$columns===7?"minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr)) auto":"minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr))"};
  gap: 10px;
  padding: 0 2px;
  font-size: 11px;
  color: var(--text-muted-color);
  min-width: max-content;

  @media (max-width: 820px) {
    display: grid;
  }
`,ss=t.div`
  display: grid;
  grid-template-columns: ${r=>r.$columns===5?"minmax(180px, 1.65fr) repeat(4, minmax(88px, 0.8fr))":r.$columns===7?"minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr)) auto":"minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr))"};
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  min-width: max-content;

  @media (max-width: 820px) {
    grid-template-columns: ${r=>r.$columns===5?"minmax(180px, 1.65fr) repeat(4, minmax(88px, 0.8fr))":r.$columns===7?"minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr)) auto":"minmax(180px, 1.65fr) repeat(5, minmax(88px, 0.8fr))"};
    gap: 10px;
  }
`,os=t.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`,Ho=t.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tertiary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
`,Oo=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,Fo=t.div`
  min-width: 0;
`,Vo=t.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,qo=t.div`
  margin-top: 2px;
  font-size: 11px;
  color: var(--text-muted-color);
`,hr=t.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  min-width: 0;

  @media (max-width: 820px) {
    display: block;
  }
`,mr=t.span`
  display: none;
  color: var(--text-muted-color);
  font-weight: 500;

  @media (max-width: 820px) {
    display: none;
  }
`,xt=t.div`
  justify-self: start;
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;

white-space: nowrap;
  color: ${r=>r.$status==="excellent"?"var(--success-color)":r.$status==="good"?"var(--primary-color)":r.$status==="average"?"var(--warning-color)":"var(--danger-color)"};
  background: ${r=>r.$status==="excellent"?"color-mix(in srgb, var(--success-color) 12%, transparent)":r.$status==="good"?"color-mix(in srgb, var(--primary-color) 12%, transparent)":r.$status==="average"?"color-mix(in srgb, var(--warning-color) 12%, transparent)":"color-mix(in srgb, var(--danger-color) 12%, transparent)"};
`,gc=t.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 820px) {
    justify-content: flex-start;
  }
`,ns=t.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  text-align: center;
  font-size: 13px;
  color: var(--text-muted-color);
`,fc=t.input`
  width: 100%;
  min-width: 0;
  padding: 7px 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 12px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,yc=t.textarea`
  width: 100%;
  min-width: 0;
  min-height: 58px;
  padding: 7px 9px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 12px;
  line-height: 1.45;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,Do=t.div`
  display: grid;
  gap: 6px;
`,Ko=t.button`
  padding: 4px 6px;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  justify-self: start;
`,bc=t.div`
  display: grid;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
`,vc=t.div`
  font-size: 11px;
  line-height: 1.4;
  color: var(--text-muted-color);
  white-space: pre-wrap;
`,Go=r=>(r||"?").charAt(0).toUpperCase(),Wo=r=>typeof r=="string"&&/^(https?:\/\/|\/)/i.test(r.trim()),jc=()=>{var ge,w,ce,he;const{t:r}=De(),{getLessonGrading:l,setLessonOralAssessment:n}=lr(),{admin:o,courseId:h,currentLessonData:d}=Sr(),A=(d==null?void 0:d._id)||(d==null?void 0:d.id)||(d==null?void 0:d.urlSlug),[u,B]=s.useState(null),[v,_]=s.useState(!1),[U,P]=s.useState({}),[O,C]=s.useState({}),[T,S]=s.useState({});s.useEffect(()=>{if(!h||!A)return;let f=!1;return(async()=>{try{_(!0);const J=await l(h,A);f||B(J)}catch{f||B(null)}finally{f||_(!1)}})(),()=>{f=!0}},[h,l,A]);const E=(ge=u==null?void 0:u.lesson)==null?void 0:ge.summary,R=u==null?void 0:u.overview,oe=((w=u==null?void 0:u.lesson)==null?void 0:w.students)||[],D=((ce=u==null?void 0:u.lesson)==null?void 0:ce.self)||null,N=((he=u==null?void 0:u.overview)==null?void 0:he.self)||null,y=s.useMemo(()=>{var f;return((f=u==null?void 0:u.overview)==null?void 0:f.students)||[]},[u]),te=async f=>{var V,J;try{const $=await n(h,A,f,{score:U[f]===""||U[f]===void 0?null:Number(U[f]),note:O[f]||""});B($),S(z=>({...z,[f]:!1})),$e.success(r("coursePlayer.grading.oralSaved"))}catch($){$e.error(((J=(V=$==null?void 0:$.response)==null?void 0:V.data)==null?void 0:J.message)||r("coursePlayer.grading.oralSaveError"))}};return e.jsxs(pc,{children:[e.jsxs(xc,{children:[e.jsx(hc,{children:r("coursePlayer.grading.title")}),e.jsx(mc,{children:r(v?"common.loading":o?"coursePlayer.grading.adminHint":"coursePlayer.grading.studentHint")})]}),v?e.jsxs(e.Fragment,{children:[e.jsxs(_r,{children:[e.jsx(fe,{width:"28%",height:"14px",borderRadius:"8px"}),e.jsx(Er,{children:[0,1,2,3].map(f=>e.jsxs(_e,{children:[e.jsx(fe,{width:"60%",height:"12px",borderRadius:"8px"}),e.jsx(fe,{width:"36%",height:"20px",borderRadius:"8px",mb:"0"})]},f))}),e.jsx(ts,{children:[0,1,2].map(f=>e.jsxs(ss,{$columns:7,children:[e.jsxs(os,{children:[e.jsx(_s,{size:"34px"}),e.jsxs("div",{children:[e.jsx(fe,{width:"88px",height:"13px",borderRadius:"8px"}),e.jsx(fe,{width:"64px",height:"11px",borderRadius:"8px",mb:"0"})]})]}),e.jsx(fe,{width:"70px",height:"12px",borderRadius:"8px",mb:"0"}),e.jsx(fe,{width:"70px",height:"12px",borderRadius:"8px",mb:"0"}),e.jsx(fe,{width:"90px",height:"36px",borderRadius:"10px",mb:"0"}),e.jsx(fe,{width:"50px",height:"12px",borderRadius:"8px",mb:"0"}),e.jsx(fe,{width:"74px",height:"26px",borderRadius:"999px",mb:"0"}),e.jsx(fe,{width:"34px",height:"34px",borderRadius:"10px",mb:"0"})]},f))})]}),e.jsxs(_r,{children:[e.jsx(fe,{width:"32%",height:"14px",borderRadius:"8px"}),e.jsx(Er,{children:[0,1,2,3].map(f=>e.jsxs(_e,{children:[e.jsx(fe,{width:"60%",height:"12px",borderRadius:"8px"}),e.jsx(fe,{width:"36%",height:"20px",borderRadius:"8px",mb:"0"})]},f))})]})]}):o?e.jsxs(e.Fragment,{children:[e.jsxs(_r,{children:[e.jsx(pt,{children:r("coursePlayer.grading.lessonSection")}),e.jsxs(Er,{children:[e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.averageScore")}),e.jsxs(Ve,{children:[(E==null?void 0:E.averageScore)||0,"%"]})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.excellent")}),e.jsx(Ve,{children:(E==null?void 0:E.excellentCount)||0})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.homeworkDone")}),e.jsx(Ve,{children:(E==null?void 0:E.completedHomeworkCount)||0})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.attendanceMarked")}),e.jsx(Ve,{children:(E==null?void 0:E.attendanceMarkedCount)||0})]})]}),oe.length?e.jsxs(ts,{children:[e.jsxs(No,{$columns:7,children:[e.jsx("div",{children:r("coursePlayer.grading.student")}),e.jsx("div",{children:r("coursePlayer.grading.attendance")}),e.jsx("div",{children:r("coursePlayer.grading.homework")}),e.jsx("div",{children:r("coursePlayer.grading.oral")}),e.jsx("div",{children:r("coursePlayer.grading.score")}),e.jsx("div",{children:r("coursePlayer.grading.status")}),e.jsx("div",{children:r("common.actions")})]}),oe.map(f=>e.jsxs(ss,{$columns:7,children:[e.jsxs(os,{children:[e.jsx(Ho,{children:Wo(f.userAvatar)?e.jsx(Oo,{src:f.userAvatar,alt:f.userName}):Go(f.userName)}),e.jsxs(Fo,{children:[e.jsx(Vo,{children:f.userName}),e.jsx(qo,{children:r("coursePlayer.grading.progressValue",{percent:Math.round(f.attendanceProgress||0)})})]})]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.attendance")}),r(`coursePlayer.attendance.status.${f.attendanceStatus}`)]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.homework")}),f.homeworkEnabled?r(`coursePlayer.grading.homeworkState.${f.homeworkStatus}`):r("coursePlayer.grading.notEnabled")]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.oral")}),!T[f.userId]&&(f.oralUpdatedAt||f.oralScore!==null||f.oralScore!==void 0||f.oralNote)?e.jsxs(Do,{children:[e.jsx(bc,{children:f.oralScore??"-"}),f.oralNote?e.jsx(vc,{children:f.oralNote}):null]}):e.jsxs(Do,{children:[e.jsx(fc,{type:"number",min:"0",max:"100",value:U[f.userId]??f.oralScore??"",placeholder:r("coursePlayer.grading.oralScore"),onChange:V=>P(J=>({...J,[f.userId]:V.target.value}))}),e.jsx(yc,{value:O[f.userId]??f.oralNote??"",placeholder:r("coursePlayer.grading.oralNote"),onChange:V=>C(J=>({...J,[f.userId]:V.target.value}))})]})]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.score")}),f.lessonScore,"%"]}),e.jsx(xt,{$status:f.performance,children:r(`coursePlayer.grading.performance.${f.performance}`)}),e.jsx(gc,{children:!T[f.userId]&&(f.oralUpdatedAt||f.oralScore!==null||f.oralScore!==void 0||f.oralNote)?e.jsx(Ko,{type:"button",onClick:()=>S(V=>({...V,[f.userId]:!0})),children:e.jsx(In,{size:12})}):T[f.userId]?e.jsx(Ko,{type:"button",onClick:()=>te(String(f.userId)),children:r("common.save")}):null})]},String(f.userId)))]}):e.jsx(ns,{children:r("coursePlayer.grading.empty")})]}),e.jsxs(_r,{children:[e.jsx(pt,{children:r("coursePlayer.grading.courseSection")}),e.jsxs(Er,{children:[e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.totalStudents")}),e.jsx(Ve,{children:(R==null?void 0:R.totalStudents)||0})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.totalLessons")}),e.jsx(Ve,{children:(R==null?void 0:R.totalLessons)||0})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.averageScore")}),e.jsxs(Ve,{children:[(R==null?void 0:R.averageScore)||0,"%"]})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.needAttention")}),e.jsx(Ve,{children:(R==null?void 0:R.attentionCount)||0})]})]}),y.length?e.jsxs(ts,{children:[e.jsxs(No,{children:[e.jsx("div",{children:r("coursePlayer.grading.student")}),e.jsx("div",{children:r("coursePlayer.grading.attendanceRate")}),e.jsx("div",{children:r("coursePlayer.grading.homeworkDone")}),e.jsx("div",{children:r("coursePlayer.grading.oral")}),e.jsx("div",{children:r("coursePlayer.grading.score")}),e.jsx("div",{children:r("coursePlayer.grading.status")})]}),y.map(f=>e.jsxs(ss,{children:[e.jsxs(os,{children:[e.jsx(Ho,{children:Wo(f.userAvatar)?e.jsx(Oo,{src:f.userAvatar,alt:f.userName}):Go(f.userName)}),e.jsxs(Fo,{children:[e.jsx(Vo,{children:f.userName}),e.jsx(qo,{children:r("coursePlayer.grading.presentValue",{present:f.presentCount||0,total:f.totalLessons||0})})]})]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.attendanceRate")}),f.attendanceRate||0,"%"]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.homeworkDone")}),f.homeworkCompleted||0,"/",f.totalLessons||0]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.oral")}),f.oralAverage??"-"]}),e.jsxs(hr,{children:[e.jsx(mr,{children:r("coursePlayer.grading.score")}),f.averageScore||0,"%"]}),e.jsx(xt,{$status:f.performance,children:r(`coursePlayer.grading.performance.${f.performance}`)})]},String(f.userId)))]}):e.jsx(ns,{children:r("coursePlayer.grading.empty")})]})]}):D&&N?e.jsxs(e.Fragment,{children:[e.jsxs(_r,{children:[e.jsx(pt,{children:r("coursePlayer.grading.lessonSection")}),e.jsxs(Er,{children:[e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.score")}),e.jsxs(Ve,{children:[D.lessonScore||0,"%"]})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.attendance")}),e.jsx(Ve,{children:r(`coursePlayer.attendance.status.${D.attendanceStatus}`)})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.homework")}),e.jsx(Ve,{children:D.homeworkEnabled?r(`coursePlayer.grading.homeworkState.${D.homeworkStatus}`):r("coursePlayer.grading.notEnabled")})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.oral")}),e.jsx(Ve,{children:D.oralScore??"-"})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.status")}),e.jsx(xt,{$status:D.performance,children:r(`coursePlayer.grading.performance.${D.performance}`)})]})]})]}),e.jsxs(_r,{children:[e.jsx(pt,{children:r("coursePlayer.grading.courseSection")}),e.jsxs(Er,{children:[e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.averageScore")}),e.jsxs(Ve,{children:[N.averageScore||0,"%"]})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.attendanceRate")}),e.jsxs(Ve,{children:[N.attendanceRate||0,"%"]})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.homeworkDone")}),e.jsxs(Ve,{children:[N.homeworkCompleted||0,"/",N.totalLessons||0]})]}),e.jsxs(_e,{children:[e.jsx(Be,{children:r("coursePlayer.grading.status")}),e.jsx(xt,{$status:N.performance,children:r(`coursePlayer.grading.performance.${N.performance}`)})]})]})]})]}):e.jsx(ns,{children:r("coursePlayer.grading.empty")})]})},wc=t.div`
  padding: 18px 24px 24px;
`,kc=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`,as=t.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-color);
`,is=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,ht=t.div`
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
`,ls=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
`,Sc=t.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`,Pc=t.button`
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 10%, transparent)":"var(--input-color)"};
  color: ${r=>r.$active?"var(--primary-color)":"var(--text-secondary-color)"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,mt=t.div`
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary-color);
      overflow-wrap: anywhere;
  white-space: pre-wrap;
`,Cc=t.div`
  display: grid;
  gap: 8px;
`,Gr=t.label`
  display: grid;
  gap: 5px;
  min-width: 0;
`,Xo=t.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`,Wr=t.span`
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted-color);
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`,Mr=t.input`
  width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,$c=t.select`
  width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,cs=t.textarea`
  width: 100%;
  min-width: 0;
  min-height: 78px;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`,Tc=t.input`
  display: none;
`,zc=t.label`
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: 16px 12px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`,Lc=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,ds=t.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
  justify-content: flex-end;
`,wr=t.button`
  padding: ${r=>r.$iconOnly?"8px":"9px 12px"};
  min-width: ${r=>r.$iconOnly?"34px":"auto"};
  min-height: ${r=>r.$iconOnly?"34px":"auto"};
  border-radius: 10px;
  border: 1px solid
    ${r=>r.$primary?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$primary?"var(--primary-color)":"var(--secondary-color)"};
  color: ${r=>r.$primary?"white":"var(--text-color)"};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
  }
`,Ac=t.div`
  display: grid;
  gap: 10px;
`,_c=t.div`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
`,Ec=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`,Mc=t.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`,Bc=t.div`
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${r=>r.$status==="reviewed"?"var(--success-color)":r.$status==="needs_revision"?"var(--warning-color)":"var(--primary-color)"};
  background: ${r=>r.$status==="reviewed"?"color-mix(in srgb, var(--success-color) 12%, transparent)":r.$status==="needs_revision"?"color-mix(in srgb, var(--warning-color) 12%, transparent)":"color-mix(in srgb, var(--primary-color) 12%, transparent)"};
`,Rc=t.div`
  font-size: 13px;
  line-height: 1.5;
      overflow-wrap: anywhere;

  color: var(--text-secondary-color);
  white-space: pre-wrap;
`,Ct=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,gt=t.a`
  font-size: 13px;
  color: var(--primary-color);
  word-break: break-all;
`,Xr=t.div`
  display: grid;
  gap: 8px;
`,Ic=t.img`
  width: 100%;
  max-width: 320px;
  max-height: 220px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
`,Uc=t.audio`
  width: 100%;
  max-width: 360px;
`,Wn=t.video`
  width: 100%;
  max-width: 420px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: black;
`,Nc=t.iframe`
  width: 100%;
  max-width: 520px;
  height: 320px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
`,ft=t.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  text-align: center;
`,Hc=["text","audio","video","pdf","photo"],Yo={photo:{maxBytes:be.homeworkPhotoBytes,extensions:[".jpg",".jpeg",".png",".webp",".gif"]},audio:{maxBytes:be.homeworkAudioBytes,extensions:[".mp3",".wav",".m4a",".aac",".ogg"]},video:{maxBytes:be.homeworkVideoBytes,extensions:[".mp4",".mov",".webm",".mkv",".m4v"]},pdf:{maxBytes:be.homeworkPdfBytes,extensions:[".pdf"]}},us=r=>{if(!r)return"0 Bytes";const l=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(r)/Math.log(1024));return`${parseFloat((r/1024**n).toFixed(2))} ${l[n]}`},Oc=()=>`draft-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,Fc=()=>({assignmentId:Oc(),enabled:!0,title:"",description:"",type:"text",deadline:null,maxScore:100,submissionCount:0,selfSubmission:null,submissions:[]}),Vc=r=>At(r)?be.lessonHomeworkPerLesson.premium:be.lessonHomeworkPerLesson.ordinary,qc=({courseId:r,lessonId:l,assignmentId:n,submissionUserId:o})=>{const{t:h}=De(),d=s.useRef(null),A=s.useRef(null),[u,B]=s.useState("");return s.useEffect(()=>{let v=!0;return(async()=>{try{const U=await Qi({courseId:r,lessonId:l,assignmentId:n,userId:o});if(v){const P=(U==null?void 0:U.streamUrl)||"",O=P.startsWith("http")?P:`${Pt}${P}`;B(O)}}catch{v&&B("")}})(),()=>{v=!1}},[n,r,l,o]),s.useEffect(()=>{const v=d.current;if(!v||!u)return;let _=!1;return(async()=>{if(v.canPlayType("application/vnd.apple.mpegurl")){v.src=u;return}const P=await we(()=>import("./media-realtime-B2IcwcIy.js").then(T=>T.h),__vite__mapDeps([6,2,1,3]));if(_)return;const O=P.default;if(!O.isSupported())return;const C=new O({enableWorker:!0,lowLatencyMode:!1,xhrSetup:(T,S)=>{T.withCredentials=!1},fetchSetup:(T,S)=>{const E=String((T==null?void 0:T.url)||""),R=/^https?:\/\/files\.tayn\.uz\//i.test(E);return new Request(E,{...S,credentials:R?"omit":"include",headers:S==null?void 0:S.headers})}});A.current=C,C.loadSource(u),C.attachMedia(v)})(),()=>{_=!0,A.current&&(A.current.destroy(),A.current=null)}},[u]),u?e.jsx(Xr,{children:e.jsx(Wn,{ref:d,controls:!0,preload:"metadata"})}):e.jsx(Ct,{children:h("common.loading")})},Xn=({forceExpanded:r=!1,showCollapseToggle:l=!0})=>{var Qe,qe,fr;const{t:n}=De(),{getLessonHomework:o,upsertLessonHomework:h,submitLessonHomework:d,reviewLessonHomework:A,deleteLessonHomework:u}=lr(),{admin:B,courseId:v,currentLessonData:_,currentUser:U}=Sr(),P=(_==null?void 0:_._id)||(_==null?void 0:_.id)||(_==null?void 0:_.urlSlug),O=s.useRef(null),[C,T]=s.useState({assignments:[]}),[S,E]=s.useState(!1),[R,oe]=s.useState(null),[D,N]=s.useState(!1),[y,te]=s.useState(!1),[ge,w]=s.useState(""),[ce,he]=s.useState(""),[f,V]=s.useState(""),[J,$]=s.useState(100),[z,ae]=s.useState("text"),[me,M]=s.useState(""),[I,X]=s.useState(""),[ie,Y]=s.useState(null),[de,ze]=s.useState(null),[L,H]=s.useState({}),[m,pe]=s.useState({}),[le,Te]=s.useState(!1),xe=(C==null?void 0:C.assignments)||[],Ne=s.useMemo(()=>Vc(U),[U]),We=xe.length<Ne,j=xe.find(p=>String(p.assignmentId)===String(R))||null,He=B?z:(j==null?void 0:j.type)||"text",tr=He==="text",Z=((Qe=j==null?void 0:j.selfSubmission)==null?void 0:Qe.status)==="needs_revision",c=!!(j!=null&&j.selfSubmission)&&!Z;s.useEffect(()=>{r&&te(!0)},[r]),s.useEffect(()=>{if(!v||!P)return;let p=!1;return(async()=>{var re;try{E(!0);const Ee=await o(v,P);if(p)return;T(Ee||{assignments:[]});const sr=((re=Ee==null?void 0:Ee.assignments)==null?void 0:re[0])||null;oe((sr==null?void 0:sr.assignmentId)||null),N(!1)}catch{p||T({assignments:[]})}finally{p||E(!1)}})(),()=>{p=!0}},[v,o,P]),s.useEffect(()=>{var p,G,re;if(!j){w(""),he(""),V(""),$(100),ae("text"),M(""),X(""),ze(null),Y(null);return}w(j.title||""),he(j.description||""),V(j.deadline?String(j.deadline).slice(0,16):""),$(j.maxScore||100),ae(j.type||"text"),M(((p=j.selfSubmission)==null?void 0:p.text)||""),X(((G=j.selfSubmission)==null?void 0:G.link)||""),ze((re=j.selfSubmission)!=null&&re.fileUrl?{fileUrl:j.selfSubmission.fileUrl,fileName:j.selfSubmission.fileName,fileSize:j.selfSubmission.fileSize,streamType:j.selfSubmission.streamType}:null),Y(null),O.current&&(O.current.value="")},[j]);const x=s.useMemo(()=>Hc.map(p=>({value:p,label:n(`coursePlayer.homework.types.${p}`)})),[n]),g=tr?!!(me.trim()||I.trim()):!!(ie||de||I.trim()),k=s.useMemo(()=>{const p=Yo[He];return p?Math.round(p.maxBytes/(1024*1024)):0},[He]),ne=()=>me.length>be.homeworkTextChars?($e.error(n("coursePlayer.homework.errors.textTooLong",{count:be.homeworkTextChars})),!1):I.length>be.homeworkLinkChars?($e.error(n("coursePlayer.homework.errors.linkTooLong",{count:be.homeworkLinkChars})),!1):!0,se=(p,G)=>{const re=Yo[G];if(!re||!p)return!0;const Ee=String(p.name||"").toLowerCase();return re.extensions.some(cr=>Ee.endsWith(cr))?Number(p.size||0)>Number(re.maxBytes||0)?($e.error(n("coursePlayer.homework.errors.fileTooLarge",{type:n(`coursePlayer.homework.types.${G}`),size:Math.round(re.maxBytes/(1024*1024))})),!1):!0:($e.error(n("coursePlayer.homework.errors.invalidFileType",{type:n(`coursePlayer.homework.types.${G}`)})),!1)},Re=(p,G,re)=>p!=null&&p.fileUrl?G==="photo"?e.jsx(Xr,{children:e.jsx(Ic,{src:p.fileUrl,alt:p.fileName||"submission"})}):G==="audio"?e.jsx(Xr,{children:e.jsx(Uc,{controls:!0,preload:"none",src:p.fileUrl})}):G==="video"?p.streamType==="hls"?e.jsx(qc,{courseId:v,lessonId:P,assignmentId:re,submissionUserId:String(p.userId)}):e.jsx(Xr,{children:e.jsx(Wn,{controls:!0,preload:"metadata",src:p.fileUrl})}):G==="pdf"?e.jsx(Xr,{children:e.jsx(Nc,{src:p.fileUrl,title:p.fileName||"PDF"})}):null:null,ve=p=>{oe((p==null?void 0:p.assignmentId)||null),N(!1)},Le=()=>{if(!We){$e.error(n("coursePlayer.homework.errors.limitReached",{count:Ne}));return}const p=Fc();T(G=>({assignments:[...(G==null?void 0:G.assignments)||[],p]})),oe(p.assignmentId),N(!0),w(""),he(""),V(""),$(100),ae("text"),M(""),X(""),ze(null),Y(null)},Ke=async()=>{const p=await h(v,P,{assignmentId:(j==null?void 0:j.assignmentId)||void 0,enabled:!0,title:ge,description:ce,type:z,deadline:f||null,maxScore:Number(J||100)});T(p);const G=(p==null?void 0:p.assignments)||[],re=G.find(Ee=>Ee.assignmentId===(j==null?void 0:j.assignmentId))||G[G.length-1];oe((re==null?void 0:re.assignmentId)||null),N(!1)},ye=async()=>{var G,re,Ee;if(!(j!=null&&j.assignmentId)){T(sr=>({assignments:((sr==null?void 0:sr.assignments)||[]).filter(cr=>cr!==j)})),oe(((G=xe[0])==null?void 0:G.assignmentId)||null),N(!1);return}const p=await u(v,P,j.assignmentId);T(p),oe(((Ee=(re=p==null?void 0:p.assignments)==null?void 0:re[0])==null?void 0:Ee.assignmentId)||null),N(!1)},Oe=p=>{var re;const G=(re=p.target.files)==null?void 0:re[0];if(G){if(!se(G,He)){p.target.value="";return}Y(G),ze(null)}},Xe=async()=>{if(!ie)return null;Te(!0);try{const p=new FormData;p.append("file",ie);const{data:G}=await ue.post("/courses/upload-media",p),re=G.fileUrl||G.manifestUrl||G.url||"";if(!re)throw new Error("Homework upload did not return a file URL");return{fileUrl:re,fileName:G.fileName||ie.name,fileSize:G.fileSize||ie.size||0,streamType:G.streamType||"direct",streamAssets:Array.isArray(G.assetKeys)?G.assetKeys:[],hlsKeyAsset:G.hlsKeyAsset||""}}finally{Te(!1)}},Ye=async()=>{if(!(j!=null&&j.assignmentId)){$e.error(n("coursePlayer.homework.errors.saveFirst"));return}if(!ne())return;if(!tr&&!ie&&!de&&!I.trim()){$e.error(n("coursePlayer.homework.errors.fileOrLinkRequired"));return}if(tr&&!me.trim()&&!I.trim()){$e.error(n("coursePlayer.homework.errors.textOrLinkRequired"));return}let p=null;!tr&&ie&&(p=await Xe());const G=await d(v,P,{assignmentId:j.assignmentId,text:me,link:I,fileUrl:(p==null?void 0:p.fileUrl)||(de==null?void 0:de.fileUrl)||"",fileName:(p==null?void 0:p.fileName)||(de==null?void 0:de.fileName)||"",fileSize:(p==null?void 0:p.fileSize)||(de==null?void 0:de.fileSize)||0,streamType:(p==null?void 0:p.streamType)||(de==null?void 0:de.streamType)||"direct",streamAssets:(p==null?void 0:p.streamAssets)||[],hlsKeyAsset:(p==null?void 0:p.hlsKeyAsset)||""});T(G),oe(j.assignmentId)},Pe=async(p,G)=>{const re=await A(v,P,j.assignmentId,p,{status:G,score:L[p]===""||L[p]===void 0?null:Number(L[p]),feedback:m[p]||""});T(re)},ee=()=>xe.length?e.jsx(Sc,{children:xe.map((p,G)=>e.jsx(Pc,{type:"button",$active:String(p.assignmentId||"")===String((j==null?void 0:j.assignmentId)||""),onClick:()=>ve(p),children:p.title||n("coursePlayer.homework.assignmentLabel",{index:G+1})},p.assignmentId||`draft-${G}`))}):null;return e.jsxs(wc,{children:[e.jsxs(kc,{children:[e.jsxs("div",{children:[e.jsx(as,{children:n("coursePlayer.homework.title")}),e.jsx(is,{children:n(S?"common.loading":B?"coursePlayer.homework.adminHint":"coursePlayer.homework.studentHint")})]}),!B&&l?e.jsx(wr,{type:"button",onClick:()=>te(p=>!p),"aria-label":n(y?"coursePlayer.homework.collapse":"coursePlayer.homework.expand"),title:n(y?"coursePlayer.homework.collapse":"coursePlayer.homework.expand"),children:y?e.jsx(rt,{size:14}):e.jsx(tt,{size:14})}):null]}),!B&&!(r||y)?null:ee(),B?e.jsxs(e.Fragment,{children:[e.jsxs(ds,{children:[e.jsx(wr,{type:"button",$primary:!0,$iconOnly:!0,onClick:Le,disabled:!We,"aria-label":n("coursePlayer.homework.addAnother"),title:n("coursePlayer.homework.addAnother"),children:e.jsx(st,{size:14})}),j?e.jsx(wr,{type:"button",$iconOnly:!0,onClick:()=>N(p=>!p),"aria-label":n(D?"common.cancel":"common.edit"),title:n(D?"common.cancel":"common.edit"),children:D?e.jsx(gr,{size:14}):e.jsx(In,{size:14})}):null,j?e.jsx(wr,{type:"button",$iconOnly:!0,onClick:ye,"aria-label":n("coursePlayer.homework.delete"),title:n("coursePlayer.homework.delete"),children:e.jsx(ot,{size:14})}):null]}),S?e.jsxs(ht,{children:[e.jsxs(Yr,{gap:"10px",mb:"0",children:[e.jsx(_s,{size:"30px"}),e.jsx(fe,{width:"36%",height:"14px",borderRadius:"8px",mb:"0"})]}),e.jsx(fe,{width:"100%",height:"42px",borderRadius:"10px"}),e.jsx(fe,{width:"100%",height:"68px",borderRadius:"10px"}),e.jsxs(Yr,{gap:"8px",mb:"0",children:[e.jsx(fe,{width:"50%",height:"38px",borderRadius:"10px",mb:"0"}),e.jsx(fe,{width:"50%",height:"38px",borderRadius:"10px",mb:"0"})]})]}):!j&&!D?e.jsx(ft,{children:n("coursePlayer.homework.emptyAssignments")}):null,We?null:e.jsx(is,{children:n("coursePlayer.homework.errors.limitReached",{count:Ne})}),j?e.jsxs(e.Fragment,{children:[e.jsxs(ht,{children:[e.jsx(as,{children:j.title}),e.jsx(mt,{children:j.description}),e.jsxs(ls,{children:[e.jsxs("span",{children:[n("coursePlayer.homework.typeLabel"),":"," ",n(`coursePlayer.homework.types.${j.type||"text"}`)]}),e.jsxs("span",{children:[n("coursePlayer.homework.deadline"),":"," ",j.deadline?new Date(j.deadline).toLocaleString():n("coursePlayer.homework.noDeadline")]}),e.jsxs("span",{children:[n("coursePlayer.homework.maxScore"),": ",j.maxScore]}),e.jsxs("span",{children:[n("coursePlayer.homework.submissions"),":"," ",j.submissionCount||0]})]})]}),(qe=j.submissions)!=null&&qe.length?e.jsx(Ac,{children:j.submissions.map(p=>e.jsxs(_c,{children:[e.jsxs(Ec,{children:[e.jsx(Mc,{children:p.userName}),e.jsx(Bc,{$status:p.status,children:n(`coursePlayer.homework.status.${p.status}`)})]}),p.text?e.jsx(Rc,{children:p.text}):null,p.link?e.jsx(gt,{href:p.link,target:"_blank",rel:"noreferrer",children:p.link}):null,p.fileUrl?e.jsxs(e.Fragment,{children:[e.jsx(gt,{href:p.fileUrl,target:"_blank",rel:"noreferrer",children:p.fileName||n("coursePlayer.homework.fileUploaded")}),e.jsx(Ct,{children:us(p.fileSize||0)}),Re(p,j.type||"text",j.assignmentId)]}):null,p.status==="submitted"?e.jsxs(e.Fragment,{children:[e.jsx(Mr,{type:"number",min:"0",max:j.maxScore||100,value:L[p.userId]??p.score??"",placeholder:n("coursePlayer.homework.fields.score"),onChange:G=>H(re=>({...re,[p.userId]:G.target.value}))}),e.jsx(cs,{value:m[p.userId]??p.feedback??"",placeholder:n("coursePlayer.homework.fields.feedback"),onChange:G=>pe(re=>({...re,[p.userId]:G.target.value}))}),e.jsxs(ds,{children:[e.jsx(wr,{type:"button",onClick:()=>Pe(String(p.userId),"needs_revision"),children:n("coursePlayer.homework.needsRevision")}),e.jsx(wr,{type:"button",$primary:!0,onClick:()=>Pe(String(p.userId),"reviewed"),children:n("coursePlayer.homework.review")})]})]}):null]},String(p.userId)))}):e.jsx(ft,{children:n("coursePlayer.homework.emptySubmissions")})]}):null]}):r||y?xe.length?j?e.jsxs(e.Fragment,{children:[e.jsxs(ht,{children:[e.jsx(as,{children:j.title}),e.jsx(mt,{children:j.description}),e.jsxs(ls,{children:[e.jsxs("span",{children:[n("coursePlayer.homework.typeLabel"),":"," ",n(`coursePlayer.homework.types.${j.type||"text"}`)]}),e.jsxs("span",{children:[n("coursePlayer.homework.deadline"),":"," ",j.deadline?new Date(j.deadline).toLocaleDateString():n("coursePlayer.homework.noDeadline")]}),e.jsxs("span",{children:[n("coursePlayer.homework.maxScore"),": ",j.maxScore]})]})]}),e.jsxs(ht,{children:[j.selfSubmission?e.jsxs(e.Fragment,{children:[e.jsxs(ls,{children:[e.jsxs("span",{children:[n("coursePlayer.homework.statusLabel"),":"," ",n(`coursePlayer.homework.status.${j.selfSubmission.status}`)]}),e.jsxs("span",{children:[n("coursePlayer.homework.scoreLabel"),":"," ",j.selfSubmission.score??"-"]})]}),j.selfSubmission.text?e.jsx(mt,{children:j.selfSubmission.text}):null,j.selfSubmission.link?e.jsx(gt,{href:j.selfSubmission.link,target:"_blank",rel:"noreferrer",children:j.selfSubmission.link}):null,j.selfSubmission.fileUrl?e.jsxs(e.Fragment,{children:[e.jsx(gt,{href:j.selfSubmission.fileUrl,target:"_blank",rel:"noreferrer",children:j.selfSubmission.fileName||n("coursePlayer.homework.fileUploaded")}),e.jsx(Ct,{children:us(j.selfSubmission.fileSize||0)}),Re(j.selfSubmission,j.type||"text",j.assignmentId)]}):null]}):null,(fr=j.selfSubmission)!=null&&fr.feedback?e.jsx(mt,{children:j.selfSubmission.feedback}):null,c?e.jsx(is,{children:n("coursePlayer.homework.alreadySubmitted")}):e.jsxs(e.Fragment,{children:[j.type==="text"?e.jsx(cs,{value:me,placeholder:n("coursePlayer.homework.fields.answer"),onChange:p=>M(p.target.value)}):e.jsxs(e.Fragment,{children:[!ie&&!de?e.jsxs(zc,{children:[e.jsx($s,{size:18}),e.jsx("span",{children:n("coursePlayer.homework.fields.file")}),e.jsx(Lc,{children:n("coursePlayer.homework.fileHint",{type:n(`coursePlayer.homework.types.${He}`),size:k})}),e.jsx(Tc,{ref:O,type:"file",accept:He==="audio"?"audio/*":He==="video"?"video/*":He==="pdf"?"application/pdf":"image/*",onChange:Oe})]}):e.jsxs(Ct,{children:[((ie==null?void 0:ie.name)||(de==null?void 0:de.fileName))??n("coursePlayer.homework.fileUploaded")," • ",us((ie==null?void 0:ie.size)||(de==null?void 0:de.fileSize)||0)]}),e.jsx(Mr,{value:me,placeholder:n("coursePlayer.homework.fields.note"),onChange:p=>M(p.target.value)})]}),e.jsx(Mr,{value:I,placeholder:n("coursePlayer.homework.fields.link"),onChange:p=>X(p.target.value)}),e.jsx(ds,{children:e.jsx(wr,{type:"button",$primary:!0,disabled:!g||le,onClick:Ye,children:n(le?"coursePlayer.homework.uploading":Z?"coursePlayer.homework.resubmit":"coursePlayer.homework.submit")})})]})]})]}):e.jsx(ft,{children:n("coursePlayer.homework.emptyAssignments")}):e.jsx(ft,{children:n("coursePlayer.homework.disabledStudent")}):null,B&&D?e.jsx(Ir,{onClick:()=>N(!1),$zIndex:10030,children:e.jsxs(Ur,{onClick:p=>p.stopPropagation(),$width:"min(100%, 560px)",$maxHeight:"88vh",children:[e.jsxs(Qr,{$padding:"14px 16px",children:[e.jsxs(_t,{children:[e.jsx(Jr,{children:j!=null&&j.title?n("coursePlayer.homework.editDialogTitle"):n("coursePlayer.homework.createDialogTitle")}),e.jsx(Ls,{children:n("coursePlayer.homework.dialogSubtitle")})]}),e.jsx(Et,{onClick:()=>N(!1),children:e.jsx(gr,{size:16})})]}),e.jsx(Zr,{$padding:"14px 16px 16px",children:e.jsxs(Cc,{children:[e.jsxs(Gr,{children:[e.jsx(Wr,{children:n("coursePlayer.homework.fields.title")}),e.jsx(Mr,{value:ge,placeholder:n("coursePlayer.homework.fields.title"),onChange:p=>w(p.target.value)})]}),e.jsxs(Gr,{children:[e.jsx(Wr,{children:n("coursePlayer.homework.fields.description")}),e.jsx(cs,{value:ce,placeholder:n("coursePlayer.homework.fields.description"),onChange:p=>he(p.target.value)})]}),e.jsxs(Xo,{children:[e.jsxs(Gr,{children:[e.jsx(Wr,{children:n("coursePlayer.homework.typeLabel")}),e.jsx($c,{value:z,onChange:p=>ae(p.target.value),children:x.map(p=>e.jsx("option",{value:p.value,children:p.label},p.value))})]}),e.jsxs(Gr,{children:[e.jsx(Wr,{children:n("coursePlayer.homework.deadline")}),e.jsx(Mr,{type:"datetime-local",value:f,onChange:p=>V(p.target.value)})]})]}),e.jsx(Xo,{children:e.jsxs(Gr,{children:[e.jsx(Wr,{children:n("coursePlayer.homework.maxScore")}),e.jsx(Mr,{type:"number",min:"1",max:"100",value:J,onChange:p=>$(p.target.value)})]})})]})}),e.jsxs(et,{$padding:"12px 16px",children:[e.jsx(nr,{$variant:"ghost",onClick:()=>N(!1),children:n("common.cancel")}),e.jsx(nr,{onClick:Ke,children:n("coursePlayer.homework.save")})]})]})}):null]})},Dc=t.div`
  display: flex;
  flex-direction: column;
  min-height: min(78vh, 760px);
  background: var(--tertiary-color);
`,Kc=t.button`
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
`,Gc=t.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`,Wc=t.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: var(--secondary-color);
  overflow: hidden;
`,Xc=t.div`
  height: 100%;
  width: ${r=>r.$width||"0%"};
  background: linear-gradient(90deg, #22c55e 0%, #14b8a6 100%);
`,Yc=t.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--input-color);
  padding: 16px;
  display: grid;
  gap: 14px;
`,ps=t.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`,Qc=t.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
`,Jc=t.div`
  min-height: 72px;
  border: 1px dashed var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`,xs=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,yt=t.button`
  min-height: 38px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid
    ${r=>r.$state==="correct"?"rgba(34, 197, 94, 0.5)":r.$state==="wrong"?"rgba(239, 68, 68, 0.45)":"var(--border-color)"};
  background: ${r=>r.$selected?"color-mix(in srgb, var(--primary-color) 10%, transparent)":r.$state==="correct"?"rgba(34, 197, 94, 0.1)":r.$state==="wrong"?"rgba(239, 68, 68, 0.1)":"var(--secondary-color)"};
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`,bt=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,Zc=t.div`
  border-radius: 14px;
  border: 1px solid
    ${r=>r.$correct?"rgba(34, 197, 94, 0.35)":"rgba(239, 68, 68, 0.32)"};
  background: ${r=>r.$correct?"rgba(34, 197, 94, 0.08)":"rgba(239, 68, 68, 0.08)"};
  padding: 14px;
  display: grid;
  gap: 10px;
`,ed=t.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`,rd=t.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,hs=t.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  padding: 14px;
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted-color);

  strong {
    font-size: 24px;
    color: var(--text-color);
  }
`,td=t.div`
  display: grid;
  gap: 10px;
`,sd=t.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  padding: 14px;
  display: grid;
  gap: 8px;
`,od=t.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`,nd=(r=[])=>r.map((l,n)=>({id:`${String(l)}-${n}-${Math.random().toString(36).slice(2,8)}`,text:l})),ad=({deck:r,linkedTest:l,onClose:n,onSubmit:o})=>{var z,ae,me;const{t:h}=De(),[d,A]=s.useState(0),[u,B]=s.useState([]),[v,_]=s.useState([]),[U,P]=s.useState(null),[O,C]=s.useState({}),[T,S]=s.useState([]),[E,R]=s.useState(null),[oe,D]=s.useState(!1),[N,y]=s.useState(!1),[te,ge]=s.useState(Math.max(0,Number((l==null?void 0:l.timeLimit)||0)*60)),w=((z=r==null?void 0:r.items)==null?void 0:z[d])||null,ce=s.useMemo(()=>{var M;return(M=r==null?void 0:r.items)!=null&&M.length?`${(d+1)/r.items.length*100}%`:"0%"},[r,d]);s.useEffect(()=>{!w||E||(B([]),_(nd(w.poolTokens||[])),P(null))},[w,E]),s.useEffect(()=>{if(!te||E||N)return;const M=window.setInterval(()=>{ge(I=>Math.max(0,I-1))},1e3);return()=>window.clearInterval(M)},[E,N,te]);const he=s.useCallback(async()=>{if(!(!(r!=null&&r._id)||!(l!=null&&l.linkedTestId)||N)){y(!0);try{const M={...O,...w&&u.length?{[d]:u.map(ie=>ie.text)}:{}},I=Object.entries(M).map(([ie,Y])=>({questionIndex:Number(ie),selectedTokens:Y})),X=await o({sentenceBuilderAnswers:I});R(X),Array.isArray(X==null?void 0:X.results)&&X.results.length&&S(X.results)}finally{y(!1)}}},[O,w,l==null?void 0:l.linkedTestId,o,d,u,N,r==null?void 0:r._id]);s.useEffect(()=>{te===0&&Number((l==null?void 0:l.timeLimit)||0)>0&&!E&&he().catch(()=>{$e.error(h("coursePlayer.lessonTests.submitError"))})},[he,l==null?void 0:l.timeLimit,E,h,te]);const f=M=>{U||(_(I=>I.filter(X=>X.id!==M.id)),B(I=>[...I,M]))},V=M=>{U||(B(I=>I.filter(X=>X.id!==M.id)),_(I=>[...I,M]))},J=async()=>{var M,I;if(!(!(r!=null&&r._id)||!w)){if(!u.length){$e.error(h("coursePlayer.lessonTests.builderComposeHint"));return}D(!0);try{const X=await pi(r._id,d,u.map(ie=>ie.text));P(X),C(ie=>({...ie,[d]:u.map(Y=>Y.text)}))}catch(X){$e.error(((I=(M=X==null?void 0:X.response)==null?void 0:M.data)==null?void 0:I.message)||h("coursePlayer.lessonTests.loadError"))}finally{D(!1)}}},$=async()=>{var I;if(!U||!w)return;const M=[...T,{prompt:w.prompt,...U}];if(S(M),d>=(((I=r==null?void 0:r.items)==null?void 0:I.length)||0)-1){await he();return}A(X=>X+1)};return e.jsxs(Dc,{children:[e.jsx(Qr,{children:e.jsxs(_t,{children:[e.jsxs(Kc,{type:"button",onClick:n,children:[e.jsx(Tt,{size:16}),h("coursePlayer.lessonTests.builderBack")]}),e.jsx(Jr,{children:(l==null?void 0:l.title)||(r==null?void 0:r.title)})]})}),e.jsx(Zr,{style:{display:"grid",gap:14},children:E?e.jsxs(e.Fragment,{children:[e.jsxs(rd,{children:[e.jsxs(hs,{children:[h("coursePlayer.lessonTests.builderCorrectCount"),e.jsx("strong",{children:Number((E==null?void 0:E.score)||0)})]}),e.jsxs(hs,{children:[h("coursePlayer.lessonTests.builderTotalCount"),e.jsx("strong",{children:Number((E==null?void 0:E.total)||0)})]}),e.jsxs(hs,{children:[h("coursePlayer.lessonTests.builderAccuracy"),e.jsxs("strong",{children:[Number((E==null?void 0:E.percent)||0),"%"]})]})]}),(E==null?void 0:E.showResults)!==!1?e.jsx(td,{children:T.map((M,I)=>e.jsxs(sd,{children:[e.jsxs(od,{children:[h("coursePlayer.lessonTests.builderQuestionLabel",{number:I+1}),": ",M.prompt]}),e.jsx(bt,{children:M.isCorrect?h("coursePlayer.lessonTests.builderCorrect"):h("coursePlayer.lessonTests.builderWrong")}),e.jsx(xs,{children:(M.expectedTokens||M.expected||[]).map((X,ie)=>e.jsx(yt,{type:"button",children:X},`${X}-${ie}`))})]},`${M.prompt||"item"}-${I}`))}):e.jsx(bt,{children:h("coursePlayer.lessonTests.builderNoBreakdown")})]}):e.jsxs(e.Fragment,{children:[e.jsxs(Gc,{children:[e.jsx("span",{children:h("coursePlayer.lessonTests.builderProgress",{current:d+1,total:((ae=r==null?void 0:r.items)==null?void 0:ae.length)||0})}),Number((l==null?void 0:l.timeLimit)||0)>0?e.jsxs("span",{children:[e.jsx(Ka,{size:14,style:{marginRight:6}}),Math.floor(te/60),":",String(te%60).padStart(2,"0")]}):null]}),e.jsx(Wc,{children:e.jsx(Xc,{$width:ce})}),e.jsxs(Yc,{children:[e.jsxs("div",{children:[e.jsx(ps,{children:h("coursePlayer.lessonTests.builderPromptTitle")}),e.jsx(Qc,{children:w==null?void 0:w.prompt})]}),e.jsxs("div",{children:[e.jsx(ps,{children:h("coursePlayer.lessonTests.builderAnswerTitle")}),e.jsx(Jc,{children:u.length?u.map((M,I)=>{var ie;const X=U?M.text===((ie=U.expected)==null?void 0:ie[I])?"correct":"wrong":null;return e.jsx(yt,{type:"button",$selected:!0,$state:X,onClick:()=>V(M),children:M.text},M.id)}):e.jsx(bt,{children:h("coursePlayer.lessonTests.builderComposeHint")})})]}),e.jsxs("div",{children:[e.jsx(ps,{children:h("coursePlayer.lessonTests.builderPoolTitle")}),e.jsx(xs,{children:v.map(M=>e.jsx(yt,{type:"button",onClick:()=>f(M),children:M.text},M.id))})]}),U?e.jsxs(Zc,{$correct:U.isCorrect,children:[e.jsx(ed,{children:U.isCorrect?e.jsxs(e.Fragment,{children:[e.jsx(Un,{size:16}),h("coursePlayer.lessonTests.builderCorrect")]}):e.jsxs(e.Fragment,{children:[e.jsx(Ga,{size:16}),h("coursePlayer.lessonTests.builderWrong")]})}),e.jsx(bt,{children:h("coursePlayer.lessonTests.builderExpected")}),e.jsx(xs,{children:(U.expected||[]).map((M,I)=>e.jsx(yt,{type:"button",children:M},`${M}-${I}`))})]}):null]})]})}),e.jsxs(et,{children:[e.jsx(nr,{type:"button",$variant:"ghost",onClick:n,children:h(E?"common.close":"common.cancel")}),E?null:U?e.jsx(nr,{type:"button",onClick:$,disabled:N,children:d>=(((me=r==null?void 0:r.items)==null?void 0:me.length)||0)-1?h("coursePlayer.lessonTests.builderFinish"):h("coursePlayer.lessonTests.builderNext")}):e.jsx(nr,{type:"button",onClick:J,disabled:oe||N,children:h(oe?"coursePlayer.lessonTests.builderChecking":"coursePlayer.lessonTests.builderCheck")})]})]})},id=t.div`
  padding: 14px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,ld=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`,cd=t.div`
  display: grid;
  gap: 4px;
  min-width: 0;
`,dd=t.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`,Qo=t.p`
  margin: 0;
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
`,vt=t.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,ud=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Jo=t.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,pd=t.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,xd=t.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`,hd=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11px;
  color: var(--text-muted-color);
`,md=t.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
`,Zo=t.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: ${r=>r.$tone==="success"?"var(--success-color)":r.$tone==="warning"?"var(--warning-color)":"var(--text-muted-color)"};
  background: ${r=>r.$tone==="success"?"color-mix(in srgb, var(--success-color) 10%, transparent)":r.$tone==="warning"?"color-mix(in srgb, var(--warning-color) 10%, transparent)":"var(--secondary-color)"};
  border: 1px solid
    ${r=>r.$tone==="success"?"color-mix(in srgb, var(--success-color) 22%, var(--border-color))":r.$tone==="warning"?"color-mix(in srgb, var(--warning-color) 22%, var(--border-color))":"var(--border-color)"};
`,ms=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,en=t.button`
  height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid
    ${r=>r.$primary?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$primary?"var(--primary-color)":"var(--secondary-color)"};
  color: ${r=>r.$primary?"#fff":"var(--text-color)"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`,gd=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
`,fd=t.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 12px;
  background: var(--secondary-color);
`,yd=t.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`,Yn=t.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,rn=t(Yn)`
  grid-column: 1 / -1;
`,gs=t.span`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-color);
`,tn=t.input`
  width: 100%;
  min-width: 0;
  height: 38px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
`,bd=t.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`,sn=t.button`
  min-height: 40px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 10%, transparent)":"var(--input-color)"};
  color: ${r=>r.$active?"var(--primary-color)":"var(--text-color)"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,on=t.div`
  height: 92px;
  border-radius: 12px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.06) 50%,
      transparent 100%
    );
    animation: lessonTestSkeleton 1.2s infinite;
  }

  @keyframes lessonTestSkeleton {
    to {
      transform: translateX(100%);
    }
  }
`,fs={linkedTestId:"",url:"",minimumScore:60,requiredToUnlock:!0},Qn=({adminMode:r=!1,forceExpanded:l=!1,showCollapseToggle:n=!0})=>{const{t:o}=De(),{getLessonLinkedTests:h,upsertLessonLinkedTest:d,deleteLessonLinkedTest:A,submitLessonLinkedTestAttempt:u}=lr(),{courseId:B,currentLessonData:v,currentUser:_}=Sr(),U=(v==null?void 0:v._id)||(v==null?void 0:v.id)||(v==null?void 0:v.urlSlug),[P,O]=s.useState([]),[C,T]=s.useState(!0),[S,E]=s.useState(!1),[R,oe]=s.useState(!1),[D,N]=s.useState(fs),[y,te]=s.useState(null),[,ge]=s.useState(!1),[w,ce]=s.useState(null),[he,f]=s.useState(null),[V,J]=s.useState(null),[$,z]=s.useState(r),ae=s.useCallback(async()=>{if(!B||!U){O([]),T(!1);return}try{T(!0);const m=await h(B,U);O(Array.isArray(m==null?void 0:m.items)?m.items:[])}catch(m){console.error(m),O([])}finally{T(!1)}},[B,h,U]);s.useEffect(()=>{ae()},[ae]),s.useEffect(()=>{z(r)},[r]),s.useEffect(()=>{l&&z(!0)},[l]);const me=s.useCallback(()=>{E(!1),N(fs)},[]),M=s.useCallback(()=>{N(fs),E(!0)},[]),I=s.useCallback(m=>{N({linkedTestId:m.linkedTestId||"",url:m.url||"",minimumScore:Number(m.minimumScore||0),requiredToUnlock:m.requiredToUnlock!==!1}),E(!0)},[]),X=s.useCallback(async()=>{var m,pe;if(!(!B||!U))try{oe(!0);const le=await d(B,U,D);O(Array.isArray(le==null?void 0:le.items)?le.items:[]),me(),$e.success(o("coursePlayer.lessonTests.saved"))}catch(le){console.error(le),$e.error(((pe=(m=le==null?void 0:le.response)==null?void 0:m.data)==null?void 0:pe.message)||o("coursePlayer.lessonTests.saveError"))}finally{oe(!1)}},[me,B,D,U,o,d]),ie=s.useCallback(async()=>{var m,pe;if(!(!B||!U||!(y!=null&&y.linkedTestId)))try{ge(!0);const le=await A(B,U,y.linkedTestId);O(Array.isArray(le==null?void 0:le.items)?le.items:[]),te(null),$e.success(o("coursePlayer.lessonTests.deleted"))}catch(le){console.error(le),$e.error(((pe=(m=le==null?void 0:le.response)==null?void 0:m.data)==null?void 0:pe.message)||o("coursePlayer.lessonTests.deleteError"))}finally{ge(!1)}},[B,A,U,y,o]),Y=s.useCallback(async m=>{var pe,le;try{if(m.resourceType==="sentenceBuilder"){const xe=m.shareShortCode?await xi(m.shareShortCode):await hi(m.resourceId||m.testId),Ne=(xe==null?void 0:xe.deck)||xe;ce(m),J({...Ne,timeLimit:Number(m.timeLimit||0),showResults:m.showResults!==!1}),f(null);return}const Te=await mi(m.testId);ce(m),f({...Te,timeLimit:Number(m.timeLimit||0),showResults:m.showResults!==!1}),J(null)}catch(Te){console.error(Te),$e.error(((le=(pe=Te==null?void 0:Te.response)==null?void 0:pe.data)==null?void 0:le.message)||o("coursePlayer.lessonTests.loadError"))}},[o]),de=s.useCallback(async({answers:m,sentenceBuilderAnswers:pe}={})=>{var le,Te;if(!(!B||!U||!(w!=null&&w.linkedTestId)))try{const xe=await u({courseId:B,lessonId:U,linkedTestId:w.linkedTestId,answers:m,sentenceBuilderAnswers:pe});return await ae(),xe!=null&&xe.passed?$e.success(o("coursePlayer.lessonTests.passed")):$e.error(o("coursePlayer.lessonTests.failed",{score:Number((xe==null?void 0:xe.percent)||0),minimum:Number((xe==null?void 0:xe.minimumScore)||0)})),xe}catch(xe){throw console.error(xe),$e.error(((Te=(le=xe==null?void 0:xe.response)==null?void 0:le.data)==null?void 0:Te.message)||o("coursePlayer.lessonTests.submitError")),xe}},[w,B,U,ae,u,o]),ze=s.useMemo(()=>P.filter(m=>{var pe;return(pe=m==null?void 0:m.selfProgress)==null?void 0:pe.passed}).length,[P]),L=s.useMemo(()=>At(_)?be.lessonTestsPerLesson.premium:be.lessonTestsPerLesson.ordinary,[_]),H=P.length<L;return e.jsxs(e.Fragment,{children:[e.jsxs(id,{children:[e.jsxs(ld,{children:[e.jsxs(cd,{children:[e.jsx(dd,{children:o("coursePlayer.lessonTests.title")}),e.jsx(Qo,{children:r?o("coursePlayer.lessonTests.adminHint"):o("coursePlayer.lessonTests.studentHint",{count:ze,total:P.length})})]}),e.jsxs(ud,{children:[r?e.jsx(vt,{type:"button",onClick:M,title:o("coursePlayer.lessonTests.add"),"aria-label":o("coursePlayer.lessonTests.add"),disabled:!H,children:e.jsx(st,{size:16})}):null,n?e.jsx(vt,{type:"button",onClick:()=>z(m=>!m),title:o($?"coursePlayer.lessonTests.collapse":"coursePlayer.lessonTests.expand"),"aria-label":o($?"coursePlayer.lessonTests.collapse":"coursePlayer.lessonTests.expand"),children:$?e.jsx(rt,{size:16}):e.jsx(tt,{size:16})}):null]})]}),l||$?C?e.jsxs(Jo,{children:[e.jsx(on,{}),e.jsx(on,{})]}):P.length?e.jsx(Jo,{children:P.map(m=>{var pe,le;return e.jsxs(pd,{children:[e.jsxs(xd,{children:[e.jsxs("div",{children:[e.jsx(md,{children:m.title}),e.jsxs(hd,{children:[e.jsx("span",{children:m.resourceType==="sentenceBuilder"?o("coursePlayer.lessonTests.typeSentenceBuilder"):o("coursePlayer.lessonTests.typeTest")}),e.jsx("span",{children:o("coursePlayer.lessonTests.minScoreMeta",{score:Number(m.minimumScore||0)})}),e.jsx("span",{children:Number(m.timeLimit||0)>0?o("coursePlayer.lessonTests.timeLimitMeta",{count:Number(m.timeLimit||0)}):o("coursePlayer.lessonTests.noTimeLimit")})]})]}),r?e.jsxs(ms,{children:[e.jsx(vt,{type:"button",onClick:()=>I(m),title:o("coursePlayer.lessonTests.edit"),"aria-label":o("coursePlayer.lessonTests.edit"),children:e.jsx(Nn,{size:15})}),e.jsx(vt,{type:"button",onClick:()=>te(m),title:o("coursePlayer.lessonTests.delete"),"aria-label":o("coursePlayer.lessonTests.delete"),children:e.jsx(ot,{size:15})})]}):(pe=m==null?void 0:m.selfProgress)!=null&&pe.passed?e.jsxs(Zo,{$tone:"success",children:[e.jsx(Un,{size:13}),o("coursePlayer.lessonTests.completed")]}):m.requiredToUnlock!==!1?e.jsxs(Zo,{$tone:"warning",children:[e.jsx(Wa,{size:13}),o("coursePlayer.lessonTests.required")]}):null]}),e.jsxs(gd,{children:[e.jsx("span",{children:m.showResults?o("coursePlayer.lessonTests.resultsShown"):o("coursePlayer.lessonTests.resultsHidden")}),r?e.jsx("span",{children:o("coursePlayer.lessonTests.requiredToggle",{value:m.requiredToUnlock!==!1?o("coursePlayer.lessonTests.unlockRequiredShort"):o("coursePlayer.lessonTests.unlockOptionalShort")})}):null,m!=null&&m.selfProgress?e.jsx("span",{children:o("coursePlayer.lessonTests.latestScoreMeta",{score:Number(m.selfProgress.percent||0),attempts:Number(m.selfProgress.attemptsCount||0)})}):null]}),r?e.jsx(ms,{children:e.jsxs(en,{as:"a",href:m.url,target:"_blank",rel:"noreferrer",children:[e.jsx(Hn,{size:14}),o("coursePlayer.lessonTests.openArena")]})}):e.jsx(ms,{children:e.jsxs(en,{type:"button",$primary:!0,onClick:()=>Y(m),children:[e.jsx(zt,{size:14}),(le=m==null?void 0:m.selfProgress)!=null&&le.passed?o("coursePlayer.lessonTests.retry"):o("coursePlayer.lessonTests.start")]})})]},m.linkedTestId)})}):e.jsx(fd,{children:o(r?"coursePlayer.lessonTests.emptyAdmin":"coursePlayer.lessonTests.emptyStudent")}):null,r&&!H?e.jsx(Qo,{children:o("coursePlayer.lessonTests.limitReached")}):null]}),S?e.jsx(Ir,{onClick:me,$zIndex:10030,children:e.jsxs(Ur,{onClick:m=>m.stopPropagation(),$width:"min(100%, 520px)",$mobileFull:!1,children:[e.jsxs(Qr,{children:[e.jsxs(_t,{children:[e.jsx(Jr,{children:D.linkedTestId?o("coursePlayer.lessonTests.editDialogTitle"):o("coursePlayer.lessonTests.newDialogTitle")}),e.jsx(Ls,{children:o("coursePlayer.lessonTests.dialogSubtitle")})]}),e.jsx(Et,{type:"button",onClick:me,children:e.jsx(gr,{size:15})})]}),e.jsx(Zr,{children:e.jsxs(yd,{children:[e.jsxs(rn,{children:[e.jsx(gs,{children:o("coursePlayer.lessonTests.urlLabel")}),e.jsx(tn,{value:D.url,onChange:m=>N(pe=>({...pe,url:m.target.value})),placeholder:o("coursePlayer.lessonTests.urlPlaceholder")})]}),e.jsxs(Yn,{children:[e.jsx(gs,{children:o("coursePlayer.lessonTests.minimumScoreLabel")}),e.jsx(tn,{type:"number",min:"0",max:"100",value:D.minimumScore,onChange:m=>N(pe=>({...pe,minimumScore:Number(m.target.value||0)}))})]}),e.jsxs(rn,{children:[e.jsx(gs,{children:o("coursePlayer.lessonTests.unlockRuleLabel")}),e.jsxs(bd,{children:[e.jsx(sn,{type:"button",$active:D.requiredToUnlock,onClick:()=>N(m=>({...m,requiredToUnlock:!0})),children:o("coursePlayer.lessonTests.unlockRequired")}),e.jsx(sn,{type:"button",$active:!D.requiredToUnlock,onClick:()=>N(m=>({...m,requiredToUnlock:!1})),children:o("coursePlayer.lessonTests.unlockOptional")})]})]})]})}),e.jsxs(et,{children:[e.jsx(nr,{type:"button",$variant:"ghost",onClick:me,children:o("common.cancel")}),e.jsxs(nr,{type:"button",onClick:X,disabled:R,children:[e.jsx(Xa,{size:14}),o(R?"common.saving":"common.save")]})]})]})}):null,he?e.jsx(Ir,{onClick:()=>{ce(null),f(null),J(null)},$zIndex:10035,children:e.jsx(Ur,{onClick:m=>m.stopPropagation(),$width:"min(100%, 920px)",$mobileFull:!0,children:e.jsx(gi,{test:he,onClose:()=>{ce(null),f(null),J(null)},onFinishedResult:de})})}):null,V?e.jsx(Ir,{onClick:()=>{ce(null),J(null),f(null)},$zIndex:10035,children:e.jsx(Ur,{onClick:m=>m.stopPropagation(),$width:"min(100%, 920px)",$mobileFull:!0,children:e.jsx(ad,{deck:V,linkedTest:w,onClose:()=>{ce(null),J(null),f(null)},onSubmit:de})})}):null,e.jsx(Ms,{isOpen:!!y,title:o("coursePlayer.lessonTests.deleteConfirmTitle"),description:o("coursePlayer.lessonTests.deleteConfirmDescription"),confirmText:o("common.delete"),cancelText:o("common.cancel"),onClose:()=>te(null),onConfirm:ie,isDanger:!0})]})},vd=t.div`
  position: fixed;
  inset: 0;
  z-index: 10020;
  background: color-mix(in srgb, var(--background-color) 82%, black);
  display: flex;
  justify-content: flex-end;
  overflow: hidden;

  @media (max-width: 980px) {
    overflow-y: auto;
    align-items: stretch;
  }
`,jd=t.div`
  width: 100vw;
  height: 100dvh;
  background: var(--background-color);
  border-left: 1px solid var(--border-color);
  display: block;
  overflow-y: auto;

  @media (max-width: 980px) {
    width: 100%;
    min-height: 100dvh;
    height: auto;
  }
`;t.div`
  border-right: 1px solid var(--border-color);
  background: var(--secondary-color);
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 0;

  @media (max-width: 980px) {
    display: none;
  }
`;const wd=t.div`
  display: block;
  border-bottom: 1px solid var(--border-color);
   overflow-x: auto;
  background: var(--background-color);
`;t.div`
  padding: 12px 12px 10px;
  display: grid;
  gap: 4px;
`;const kd=t.h2`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`,Sd=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,Pd=t.div`
  padding: 10px;
  overflow-y: hidden;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 980px) {
    max-height: none;
    padding: 10px;
  }
`,Cd=t.button`
  width: auto;
  min-width: 0;
  flex: 0 0 auto;
  text-align: left;
  padding: 8px 12px;
  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"var(--border-color)"};
  border-radius: 12px;
  background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 8%, var(--input-color))":"var(--input-color)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.18s ease, background 0.18s ease;
`,$d=t.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Td=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-muted-color);
  white-space: nowrap;
`,zd=t.span`
  padding: 3px 6px;
  border-radius: 999px;
  background: ${r=>r.$draft?"color-mix(in srgb, var(--warning-color) 12%, transparent)":"color-mix(in srgb, var(--success-color) 12%, transparent)"};
  color: ${r=>r.$draft?"var(--warning-color)":"var(--success-color)"};
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  white-space: nowrap;
`;t.div`
  padding: 10px 10px 10px;
  border-top: 1px solid var(--border-color);

  & > button {
    width: 100%;
  }
`;const Ld=t.button`
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,Ad=t.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  min-height: 0;
`,_d=t.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
 
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,Ed=t.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,zs=t.button`
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`,Md=t(zs)`
  color: var(--danger-color);
  border-color: color-mix(in srgb, var(--danger-color) 24%, var(--border-color));
`,Bd=t.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,jt=t.div`
  padding: 11px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`,wt=t.div`
  font-size: 11px;
  color: var(--text-muted-color);
`,kt=t.div`
  margin-top: 3px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`,Rd=t.div`
  padding: 12px 18px 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,Id=t.button`
  padding: 8px 12px;
  border-radius: 999px;
    white-space: nowrap;

  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"var(--border-color)"};
  background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 10%, transparent)":"var(--input-color)"};
  color: ${r=>r.$active?"var(--primary-color)":"var(--text-secondary-color)"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,Ud=t.div`
  min-height: 0;
  overflow: visible;
`,Nd=t.div`
  padding: 16px 18px 20px;
  display: grid;
  gap: 16px;
`,nn=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
`,an=t.div`
  display: grid;
  gap: 8px;
`,ln=t.div`
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
`,cn=t.div`
  min-width: 0;
`,dn=t.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
`,un=t.div`
  font-size: 11px;
  color: var(--text-muted-color);
  margin-top: 2px;
`,pn=t.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,ys=t.button`
  padding: 7px 9px;
  border-radius: 9px;
  border: 1px solid
    ${r=>r.$approve?"color-mix(in srgb, var(--success-color) 24%, var(--border-color))":"color-mix(in srgb, var(--danger-color) 24%, var(--border-color))"};
  background: ${r=>r.$approve?"color-mix(in srgb, var(--success-color) 10%, transparent)":"color-mix(in srgb, var(--danger-color) 10%, transparent)"};
  color: ${r=>r.$approve?"var(--success-color)":"var(--danger-color)"};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`,xn=t.div`
  padding: 12px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
  text-align: center;
`,Hd=({isOpen:r,onClose:l})=>{const{t:n}=De(),{approveUser:o,removeUser:h}=lr(),{course:d,courseId:A,currentLessonData:u,handleLessonClick:B,openLessonEditor:v,handlePublishLesson:_,setLessonToDelete:U}=Sr(),[P,O]=s.useState("homework"),C=s.useMemo(()=>((d==null?void 0:d.members)||[]).filter(y=>y.status==="approved"),[d]),T=s.useMemo(()=>((d==null?void 0:d.members)||[]).filter(y=>y.status==="pending"),[d]),S=(d==null?void 0:d.lessons)||[],E=(u==null?void 0:u._id)||(u==null?void 0:u.id)||(u==null?void 0:u.urlSlug);if(!r||!d)return null;const R=S.filter(y=>(y.status||"published")==="draft").length,oe=S.length-R,D=!!(Array.isArray(u==null?void 0:u.mediaItems)&&u.mediaItems.length||u!=null&&u.videoUrl||u!=null&&u.fileUrl),N=()=>S.map((y,te)=>{const ge=y._id||y.id||y.urlSlug;return e.jsxs(Cd,{type:"button",$active:String(ge)===String(E),onClick:()=>B(te),children:[e.jsx($d,{children:y.title}),e.jsxs(Td,{children:[e.jsx("span",{children:n("coursePlayer.adminPane.lessonNumber",{index:te+1})}),e.jsx(zd,{$draft:(y.status||"published")==="draft",children:(y.status||"published")==="draft"?n("coursePlayer.playlist.draft"):n("coursePlayer.adminPane.published")})]})]},String(ge))});return e.jsx(vd,{onClick:l,children:e.jsx(jd,{onClick:y=>y.stopPropagation(),children:e.jsxs(Ad,{children:[e.jsxs(_d,{children:[e.jsxs("div",{children:[e.jsx(kd,{children:(u==null?void 0:u.title)||d.name}),e.jsx(Sd,{children:n("coursePlayer.adminPane.currentLesson")})]}),e.jsxs(Ed,{children:[u?e.jsxs(e.Fragment,{children:[e.jsx(zs,{type:"button",onClick:()=>v(u),children:n("coursePlayer.playlist.edit")}),(u.status||"published")==="draft"&&D?e.jsx(Ld,{type:"button",onClick:()=>_(u._id||u.id||u.urlSlug),children:n("coursePlayer.adminPane.publish")}):null,e.jsx(Md,{type:"button",onClick:()=>U(u._id||u.id||u.urlSlug),children:n("coursePlayer.adminPane.deleteLesson")})]}):null,e.jsx(zs,{type:"button",onClick:l,children:e.jsx(gr,{size:16})})]})]}),e.jsx(wd,{children:e.jsx(Pd,{children:N()})}),e.jsxs(Bd,{children:[e.jsxs(jt,{children:[e.jsx(wt,{children:n("coursePlayer.adminPane.totalLessons")}),e.jsx(kt,{children:S.length})]}),e.jsxs(jt,{children:[e.jsx(wt,{children:n("coursePlayer.adminPane.published")}),e.jsx(kt,{children:oe})]}),e.jsxs(jt,{children:[e.jsx(wt,{children:n("coursePlayer.playlist.draft")}),e.jsx(kt,{children:R})]}),e.jsxs(jt,{children:[e.jsx(wt,{children:n("coursePlayer.adminPane.students")}),e.jsx(kt,{children:C.length})]})]}),e.jsx(Rd,{children:["tests","homework","attendance","grading","members"].map(y=>e.jsx(Id,{type:"button",$active:P===y,onClick:()=>O(y),children:n(`coursePlayer.adminPane.tabs.${y}`)},y))}),e.jsx(Ud,{children:P==="tests"?e.jsx(Qn,{adminMode:!0}):P==="homework"?e.jsx(Xn,{}):P==="attendance"?e.jsx(uc,{}):P==="grading"?e.jsx(jc,{}):e.jsxs(Nd,{children:[e.jsxs("div",{children:[e.jsx(nn,{children:n("coursePlayer.members.pendingTitle",{count:T.length})}),T.length?e.jsx(an,{children:T.map(y=>e.jsxs(ln,{children:[e.jsxs(cn,{children:[e.jsx(dn,{children:y.name}),e.jsx(un,{children:n("coursePlayer.members.pending")})]}),e.jsxs(pn,{children:[e.jsx(ys,{type:"button",$approve:!0,onClick:()=>o(A,y.userId||y._id||y.id),children:n("coursePlayer.actions.approve")}),e.jsx(ys,{type:"button",onClick:()=>h(A,y.userId||y._id||y.id),children:n("coursePlayer.actions.reject")})]})]},y.userId||y._id||y.id))}):e.jsx(xn,{children:n("coursePlayer.adminPane.noPending")})]}),e.jsxs("div",{children:[e.jsx(nn,{children:n("coursePlayer.members.approvedTitle",{count:C.length})}),C.length?e.jsx(an,{children:C.map(y=>e.jsxs(ln,{children:[e.jsxs(cn,{children:[e.jsx(dn,{children:y.name}),e.jsx(un,{children:n("coursePlayer.members.approved")})]}),e.jsx(pn,{children:e.jsx(ys,{type:"button",onClick:()=>h(A,y.userId||y._id||y.id),children:n("coursePlayer.actions.remove")})})]},y.userId||y._id||y.id))}):e.jsx(xn,{children:n("coursePlayer.members.empty")})]})]})})]})})})},Od=t.div`
  margin: ${r=>r.$admin?"5px 8px":"5px 0"};
  border-radius: ${r=>r.$admin?"12px":"0"};
  border: ${r=>r.$admin?"1px solid var(--border-color)":"none"};
  padding: 14px;
  background: var(--secondary-color);
  display: grid;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 12px;
    border-radius: 12px;
  }
`,Fd=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`,Vd=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,qd=t.div`
  display: grid;
  gap: 4px;
`,Dd=t.h3`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,Kd=t.p`
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.45;
`,bs=t.button`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--input-color);
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`,hn=t.div`
  display: grid;
  gap: 8px;
`,mn=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
`,gn=t.div`
  min-width: 0;
  display: grid;
  gap: 3px;
`,Gd=t.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,fn=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
`,Wd=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`,Xd=t.a`
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
`,Yd=t.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 10px;
  color: var(--text-muted-color);
  font-size: 13px;
  text-align: center;
`,yn=t.div`
  display: grid;
  gap: 6px;
  margin: 8px 0;
`,bn=t.label`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`,Qd=t.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
`,Jd=t.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
`,vn=r=>{if(!r)return"0 Bytes";const l=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(r)/Math.log(1024));return`${parseFloat((r/1024**n).toFixed(2))} ${l[n]}`},jn=({forceExpanded:r=!1,showCollapseToggle:l=!0})=>{const{t:n}=De(),{getLessonMaterials:o,upsertLessonMaterial:h,deleteLessonMaterial:d}=lr(),{admin:A,courseId:u,currentLessonData:B}=Sr(),v=(B==null?void 0:B._id)||(B==null?void 0:B.id)||(B==null?void 0:B.urlSlug),_=s.useRef(null),[U,P]=s.useState([]),[O,C]=s.useState(!0),[T,S]=s.useState(!1),[E,R]=s.useState(A),[oe,D]=s.useState(""),[N,y]=s.useState(null),[te,ge]=s.useState(!1),w=s.useCallback(async()=>{if(!u||!v){P([]),C(!1);return}try{C(!0);const V=await o(u,v);P(Array.isArray(V==null?void 0:V.items)?V.items:[])}catch(V){console.error(V),P([])}finally{C(!1)}},[u,o,v]);s.useEffect(()=>{w()},[w]),s.useEffect(()=>{R(A)},[A]),s.useEffect(()=>{r&&R(!0)},[r]);const ce=s.useCallback(()=>{S(!1),D(""),y(null),_.current&&(_.current.value="")},[]),he=s.useCallback(async()=>{var V,J;if(!(!N||!u||!v))try{ge(!0);const $=new FormData;$.append("file",N);const{data:z}=await ue.post("/courses/upload-media",$);await h(u,v,{title:oe.trim()||N.name.replace(/\.pdf$/i,""),fileUrl:z.fileUrl||z.url||"",fileName:z.fileName||N.name,fileSize:z.fileSize||N.size||0}),await w(),ce()}catch($){console.error($),$e.error(((J=(V=$==null?void 0:$.response)==null?void 0:V.data)==null?void 0:J.message)||n("coursePlayer.materials.uploadError"))}finally{ge(!1)}},[ce,u,v,w,N,n,oe,h]),f=s.useCallback(async V=>{var J,$;try{await d(u,v,V),await w()}catch(z){console.error(z),$e.error((($=(J=z==null?void 0:z.response)==null?void 0:J.data)==null?void 0:$.message)||n("coursePlayer.materials.deleteError"))}},[u,d,v,w,n]);return e.jsxs(Od,{$admin:A,children:[e.jsxs(Fd,{children:[e.jsxs(qd,{children:[e.jsx(Dd,{children:n("coursePlayer.materials.title")}),e.jsx(Kd,{children:n(A?"coursePlayer.materials.adminHint":"coursePlayer.materials.studentHint")})]}),e.jsxs(Vd,{children:[A?e.jsx(bs,{type:"button",onClick:()=>S(!0),title:n("coursePlayer.materials.add"),"aria-label":n("coursePlayer.materials.add"),children:e.jsx(st,{size:15})}):null,l?e.jsx(bs,{type:"button",onClick:()=>R(V=>!V),title:n(E?"coursePlayer.materials.collapse":"coursePlayer.materials.expand"),"aria-label":n(E?"coursePlayer.materials.collapse":"coursePlayer.materials.expand"),children:E?e.jsx(rt,{size:15}):e.jsx(tt,{size:15})}):null]})]}),r||E?O?e.jsx(hn,{children:[0,1,2].map(V=>e.jsxs(mn,{children:[e.jsxs(gn,{children:[e.jsx(fe,{width:"132px",height:"13px",borderRadius:"8px"}),e.jsx(fe,{width:"184px",height:"11px",borderRadius:"8px",mb:"0"})]}),e.jsxs(Yr,{gap:"6px",mb:"0",children:[e.jsx(fe,{width:"30px",height:"30px",borderRadius:"9px",mb:"0"}),A?e.jsx(fe,{width:"30px",height:"30px",borderRadius:"9px",mb:"0"}):null]})]},V))}):U.length?e.jsx(hn,{children:U.map(V=>e.jsxs(mn,{children:[e.jsxs(gn,{children:[e.jsx(Gd,{children:V.title||V.fileName}),e.jsxs(fn,{children:[V.fileName," · ",vn(V.fileSize||0)]})]}),e.jsxs(Wd,{children:[e.jsx(Xd,{href:V.fileUrl,target:"_blank",rel:"noreferrer",children:e.jsx(Hn,{size:14})}),A?e.jsx(bs,{type:"button",onClick:()=>f(V.materialId),title:n("common.delete"),"aria-label":n("common.delete"),children:e.jsx(ot,{size:14})}):null]})]},V.materialId))}):e.jsx(Yd,{children:n("coursePlayer.materials.empty")}):null,T?e.jsx(Ir,{onClick:ce,$zIndex:10031,children:e.jsxs(Ur,{onClick:V=>V.stopPropagation(),$width:"min(100%, 420px)",$mobileFull:!1,children:[e.jsxs(Qr,{children:[e.jsxs(_t,{children:[e.jsx(Jr,{children:n("coursePlayer.materials.dialogTitle")}),e.jsx(Ls,{children:n("coursePlayer.materials.dialogSubtitle")})]}),e.jsx(Et,{type:"button",onClick:ce,children:e.jsx(gr,{size:15})})]}),e.jsxs(Zr,{children:[e.jsxs(yn,{children:[e.jsx(bn,{children:n("coursePlayer.materials.fields.title")}),e.jsx(Qd,{value:oe,onChange:V=>D(V.target.value),placeholder:n("coursePlayer.materials.fields.titlePlaceholder")})]}),e.jsxs(yn,{children:[e.jsx(bn,{children:n("coursePlayer.materials.fields.file")}),e.jsx(Jd,{ref:_,type:"file",accept:"application/pdf,.pdf",onChange:V=>{var J;return y(((J=V.target.files)==null?void 0:J[0])||null)}})]}),N?e.jsxs(fn,{children:[e.jsx(Ya,{size:14})," ",N.name," ·"," ",vn(N.size||0)]}):null]}),e.jsxs(et,{children:[e.jsx(nr,{type:"button",$variant:"ghost",onClick:ce,children:n("common.cancel")}),e.jsx(nr,{type:"button",onClick:he,disabled:!N||te,children:n("common.save")})]})]})}):null]})},Zd=t.div`
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
`,eu=t.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`,ru=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`,tu=t.button`
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
`,su=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ou=t.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`,nu=t.button`
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
    transform: scale(1.06);
  }
`,au=t.button`
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
`,iu=t.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${r=>r.$collapsed?"0":"500px"};
    overflow: ${r=>r.$collapsed?"hidden":"auto"};
    transition: max-height 0.3s ease;
  }
`,lu=t.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`,cu=t.span`
  font-size: 12px;
`,Jn=t.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 12px;
  cursor: ${r=>r.$interactive?"pointer":"default"};
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background-color: var(--hover-color);
  }

  ${r=>r.$active&&`
      background-color: var(--active-color);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--primary-color);
        border-radius: 0 2px 2px 0;
      }
    `}
`,du=t.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${r=>r.$active?"var(--primary-color)":"var(--input-color)"};
  color: ${r=>r.$active?"white":"var(--text-secondary-color)"};
`,uu=t.div`
  flex: 1;
  min-width: 0;
`,pu=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: 14px;
  font-weight: ${r=>r.$active?"600":"500"};
  color: ${r=>r.$active?"var(--text-color)":"var(--text-secondary-color)"};
  margin-bottom: 2px;
`,xu=t.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,hu=t.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--success-color) 15%, transparent);
  color: var(--success-color);
  margin-left: 6px;
  vertical-align: middle;
`,mu=t.span`
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--warning-color) 14%, transparent);
  color: var(--warning-color);
  font-size: 10px;
  font-weight: 700;
`,gu=t.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`,fu=t.span`
  display: flex;
  align-items: center;
  gap: 3px;
`,yu=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`,Bs=t.button`
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

  ${Jn}:hover & {
    opacity: 1;
  }

  &:hover {
    background: color-mix(in srgb, var(--danger-color) 16%, transparent);
    color: var(--danger-color);
  }
`,bu=t(Bs)`
  &:hover {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
  }
`,vu=t(Bs)`
  &:hover {
    background: color-mix(in srgb, var(--success-color) 14%, transparent);
    color: var(--success-color);
  }
`,ju=()=>{const{t:r}=De(),{activeLesson:l,admin:n,canAccessLesson:o,canAccessLessons:h,course:d,formatViews:A,handleLessonClick:u,handlePublishLesson:B,onClose:v,openLessonCreator:_,openLessonEditor:U,playlistCollapsed:P,setLessonToDelete:O,setPlaylistCollapsed:C}=Sr();return e.jsxs(Zd,{children:[e.jsxs(eu,{children:[e.jsxs(ru,{children:[e.jsx(tu,{onClick:v,children:e.jsx(Tt,{size:20})}),e.jsx(On,{size:18}),r("courseSidebar.lessons")]}),e.jsxs(su,{children:[e.jsx(ou,{children:r("coursePlayer.playlist.count",{count:d.lessons.length})}),n&&e.jsx(nu,{onClick:_,title:r("addLesson.createDraft"),children:e.jsx(st,{size:16})}),e.jsx(au,{onClick:()=>C(!P),children:P?e.jsx(tt,{size:20}):e.jsx(rt,{size:20})})]})]}),e.jsx(iu,{$collapsed:P,children:d.lessons.length===0?e.jsx(lu,{children:n?e.jsxs(e.Fragment,{children:[r("coursePlayer.locked.noLessonsTitle"),e.jsx("br",{}),e.jsx(cu,{children:r("coursePlayer.locked.noLessonsAdmin")})]}):r("coursePlayer.locked.noLessonsUser")}):d.lessons.map((T,S)=>{const E=o(S),R=E&&l===S,oe=!!(Array.isArray(T.mediaItems)&&T.mediaItems.length||T.videoUrl||T.fileUrl);return e.jsxs(Jn,{$active:R,$interactive:E,onClick:()=>E&&u(S),children:[e.jsx(du,{$active:R,children:R?e.jsx(zt,{size:12,fill:"white"}):E?S+1:e.jsx(Ts,{size:12})}),e.jsx(uu,{children:E?e.jsxs(e.Fragment,{children:[e.jsxs(pu,{$active:l===S,children:[e.jsx(xu,{children:T.title}),T.status==="draft"&&e.jsx(mu,{children:r("coursePlayer.playlist.draft")}),S===0&&!h&&e.jsx(hu,{children:r("coursePlayer.playlist.free")})]}),e.jsx(gu,{children:e.jsxs(fu,{children:[e.jsx(Fn,{size:11}),A(T.views)]})})]}):e.jsxs(yu,{children:[e.jsx(Ts,{size:12}),S+1,"-dars"]})}),n&&e.jsxs(e.Fragment,{children:[e.jsx(bu,{onClick:D=>{D.stopPropagation(),U(T)},title:r("coursePlayer.playlist.edit"),children:e.jsx(Nn,{size:14})}),T.status==="draft"&&oe&&e.jsx(vu,{onClick:D=>{D.stopPropagation(),B(T)},title:r("addLesson.publish"),children:e.jsx(Qa,{size:14})}),e.jsx(Bs,{onClick:D=>{D.stopPropagation(),O(T._id)},title:r("common.delete"),children:e.jsx(ot,{size:14})})]})]},T._id)})})]})},wu=t.div`
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
    inset: 0;
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
`,ku=t.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
  }
`,wn=t.div`
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
`,Su=t.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`,Pu=t.iframe`
  width: 100%;
  height: 100%;
  border: none;
`,Zn=t.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.42);
  opacity: ${r=>r.$visible?1:0};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: ${r=>r.$pointerEvents?r.$pointerEvents:"auto"};
`,Cu=t(Zn)`
  background: transparent;
  pointer-events: none;
`,kn=t.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,$u=t.div`
  display: flex;
  align-items: center;
`,Tu=t.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
`,zu=t.button`
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
`,ea=t(zu)`
  color: white;
`,Lu=t(ea)`
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 8px;
`,Au=t.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary-color) 80%, transparent);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${r=>r.$visible?1:0};
  pointer-events: ${r=>r.$visible?"auto":"none"};
  z-index: 30;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px
    color-mix(in srgb, var(--primary-color) 50%, transparent);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: var(--primary-color);
  }
`,_u=t.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ra=t.div`
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
`,Eu=t.div`
  position: absolute;
  top: -1px;
  left: ${r=>`${r.$left}%`};
  width: 2px;
  height: calc(100% + 2px);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: none;
`,Mu=t.div`
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  position: relative;
  transition: width 0.1s linear;
  width: ${r=>`${r.$width}%`};

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
    box-shadow: 0 0 4px
      color-mix(in srgb, var(--primary-color) 50%, transparent);
    opacity: 0;
    transition: opacity 0.15s;
  }

  ${ra}:hover &::after {
    opacity: 1;
  }
`,Bu=t.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  width: ${r=>`${r.$width}%`};
`,Ru=t.div`
  position: absolute;
  bottom: 14px;
  left: ${r=>`${r.$left}px`};
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: grid;
  gap: 2px;
  min-width: 0;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 20;
  letter-spacing: 0.5px;

  strong {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0;
  }

  span {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.82);
    letter-spacing: 0;
  }
`,Iu=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,Uu=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Nu=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,$t=t.button`
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
`,Hu=t.div`
  position: relative;
`,Ou=t($t)`
  font-size: 11px;
  font-weight: 700;
  width: auto;
  padding: 0 8px;
  border-radius: 4px;
  height: 25px;

  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"rgba(255, 255, 255, 0.2)"};
  color: ${r=>r.$accent?"var(--primary-color)":"white"};
`,Fu=t.div`
  position: absolute;
  bottom: 44px;
  right: 0;
  background: rgba(15, 15, 20, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  min-width: 110px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  z-index: 50;
`,Vu=t.div`
  padding: 8px 12px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`,qu=t.button`
  width: 100%;
  padding: 9px 16px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  text-align: left;
  color: ${r=>r.$active?"var(--primary-color)":"white"};
  font-weight: ${r=>r.$active?700:400};
  background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 16%, transparent)":"transparent"};
  transition: background 0.15s;

  &:hover {
    background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 16%, transparent)":"rgba(255, 255, 255, 0.06)"};
  }
`,Du=t.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
`,Ku=t.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`,Gu=t(Su)`
  user-select: none;
  -webkit-user-select: none;
`,Wu=t.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: var(--danger-color);
  padding: 20px;
  text-align: center;
  z-index: 20;
  flex-direction: column;
  gap: 12px;
`,Xu=t.p`
  font-weight: 600;
  max-width: 400px;
  line-height: 1.5;
`,Yu=t.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;
`,Qu=t.div`
  max-width: 220px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  @media (max-width: 768px) {
    max-width: 140px;
    font-size: 11px;
    padding: 5px 9px;
  }
`,ta=t.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,Ju=t.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${ta}:hover & {
    width: 70px;
    opacity: 1;
  }
`,Zu=t.div`
  padding: 18px 24px 14px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`,ep=t.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`,rp=t.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`,tp=t.div`
  margin: 5px;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  display: grid;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 12px 14px;
    border-radius: 12px;
  }
`,sp=t.div`
  margin: 10px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);

  @media (max-width: 768px) {
    margin: 16px;
    border-radius: 12px;
  }
`,op=t.button`
  width: 100%;
  display: grid;
  gap: 10px;
  padding: 12px 14px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
`,np=t.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`,ap=t.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
`,ip=t.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,lp=t.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px;
`,vs=t.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid
    color-mix(in srgb, var(--success-color) 24%, var(--border-color));
  background: color-mix(in srgb, var(--success-color) 10%, transparent);
  color: var(--success-color);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`,cp=t.div`
  border-top: 1px solid var(--border-color);
`,dp=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`,up=t.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`,pp=t.div`
  font-size: 13px;
  line-height: 1.62;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: ${r=>r.$expanded?"unset":3};
  -webkit-box-orient: vertical;
  overflow: hidden;
`,xp=t.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
  cursor: pointer;
`,Sn=t.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`,sa=t.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`,hp=t(sa).attrs({as:"button",type:"button"})`
  border: none;
  cursor: pointer;
  background: transparent;
  color: ${r=>r.$liked?"var(--danger-color)":"var(--text-muted-color)"};
  padding: 0;
`,mp=t.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`,gp=t(mp)`
  padding: 12px 24px;
  border-bottom: none;
`,fp=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,yp=t.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${r=>r.$bg||"var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid var(--background-color);
  margin-left: ${r=>r.$index>0?"-8px":"0"};
  position: relative;
  z-index: ${r=>10-(r.$index||0)};
`,bp=t(yp)`
  width: 40px;
  height: 40px;
  font-size: 16px;
  overflow: hidden;
`,oa=t.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`,vp=t.div`
  display: flex;
  flex-direction: column;
`,jp=t.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 15px;
`,wp=t.span`
  font-size: 12px;
  color: var(--text-muted-color);
`,Pn=t.div`
  display: flex;
  gap: 8px;
`;t.div`
  display: flex;
  align-items: center;
`;t.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;const kp=t.button`
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

  ${r=>{switch(r.$variant){case"enroll":return`
          background: var(--primary-color);
          color: white;
        `;case"pending":return`
          background: color-mix(in srgb, var(--warning-color) 15%, transparent);
          color: var(--warning-color);
          cursor: default;
        `;case"enrolled":return`
          background: color-mix(in srgb, var(--success-color) 15%, transparent);
          color: var(--success-color);
          cursor: default;
        `;case"admin":return`
          background: color-mix(in srgb, var(--primary-color) 15%, transparent);
          color: var(--primary-color);
          cursor: pointer;
          &:hover { background: color-mix(in srgb, var(--primary-color) 24%, transparent); }
        `;default:return"background: var(--input-color); color: var(--text-color);"}}}
`,kr=t(kp)`
  border-radius: 20px;
`;t(kr)`
  padding: 8px 16px;
`;t.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${r=>r.$open?"400px":"0"};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`;t.div`
  padding: 16px 24px;
`;t.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-top: ${r=>r.$spaced?"16px":"0"};
  margin-bottom: 12px;
`;t.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;t.div`
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
  overflow: hidden;
`;t(oa)``;t.div`
  flex: 1;
`;t.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`;t.div`
  font-size: 12px;
  color: ${r=>r.$pending?"var(--warning-color)":"var(--success-color)"};
`;t.div`
  display: flex;
  gap: 6px;
`;t.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  ${r=>r.$approve?`
        background: color-mix(in srgb, var(--success-color) 15%, transparent);
        color: var(--success-color);

        &:hover {
          background: color-mix(in srgb, var(--success-color) 30%, transparent);
        }
      `:`
        background: color-mix(in srgb, var(--danger-color) 15%, transparent);
        color: var(--danger-color);

        &:hover {
          background: color-mix(in srgb, var(--danger-color) 30%, transparent);
        }
      `}
`;const js=t.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`,ws=t.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`,Sp=t.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`,Pp=t.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
`,Cp=t.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`,$p=t.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`,ks=t.h3`
  color: var(--text-color);
  font-weight: 700;
`,Ss=t.p`
  color: var(--text-muted-color);
  font-size: 14px;
  max-width: ${r=>r.$wide?"350px":"none"};
`;t.div`
  color: var(--text-muted-color);
  font-size: 13px;
  padding: 8px 0;
`;t.div`
  display: flex;
  gap: 8px;
  padding: 0 24px 16px;
  border-bottom: 1px solid var(--border-color);
`;t.button`
  padding: 8px 12px;
  border: 1px solid
    ${r=>r.$active?"var(--primary-color)":"var(--border-color)"};
  border-radius: 999px;
  background: ${r=>r.$active?"color-mix(in srgb, var(--primary-color) 12%, transparent)":"var(--input-color)"};
  color: ${r=>r.$active?"var(--primary-color)":"var(--text-secondary-color)"};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;function Ps(r){if(Number.isNaN(r))return"0:00";const l=Math.floor(r/3600),n=Math.floor(r%3600/60),o=Math.floor(r%60);return l>0?`${l}:${n.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${n}:${o.toString().padStart(2,"0")}`}function Cn(r){return r>=1e6?`${(r/1e6).toFixed(1)}M`:r>=1e3?`${(r/1e3).toFixed(1)}K`:String(r)}function Tp(r){const l=new Date(r),o=new Date-l;if(Number.isNaN(o))return"Noma'lum vaqt";const h=Math.floor(o/6e4),d=Math.floor(o/36e5),A=Math.floor(o/864e5);return h<1?"Hozirgina":h<60?`${h} daqiqa oldin`:d<24?`${d} soat oldin`:A<30?`${A} kun oldin`:l.toLocaleDateString("uz-UZ")}function $n(r){return r?typeof r=="string"?r:r._id||r.id||r.userId||null:null}function zp(r){if(!r)return null;const l=/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,n=r.match(l);return n&&n[2].length===11?n[2]:null}const Lp=({courseId:r,initialLessonSlug:l,onClose:n})=>{var ao,io,lo,co,uo,po,xo,ho,mo,go,fo,yo,bo,vo,jo;const{t:o}=De(),h=As(),{createChat:d}=Rn(),{courses:A,currentUser:u,isAdmin:B,isEnrolled:v,enrollInCourse:_,updateLesson:U,publishLesson:P,markOwnAttendance:O,approveUser:C,removeUser:T,incrementViews:S,removeLesson:E,getLessonComments:R,getLessonHomework:oe,addComment:D,addReply:N,toggleLessonLike:y,joinCourseRoom:te,leaveCourseRoom:ge}=lr(),[w,ce]=s.useState(0),[he,f]=s.useState(!1),[V,J]=s.useState(!1),[$,z]=s.useState(null),[ae,me]=s.useState(!1),[M,I]=s.useState(0),[X,ie]=s.useState({}),[Y,de]=s.useState(!1),[ze,L]=s.useState(!1),[H,m]=s.useState(!1),[pe,le]=s.useState(!1),[Te,xe]=s.useState(""),[Ne,We]=s.useState(!1),[j,He]=s.useState(null),[tr,Z]=s.useState(""),[c,x]=s.useState(!1),[g,k]=s.useState([]),[ne,se]=s.useState(1),[Re,ve]=s.useState(!0),[Le,Ke]=s.useState(!1),[ye,Oe]=s.useState(null),[Xe,Ye]=s.useState(!1),Pe=s.useRef(null),ee=s.useRef(null),Qe=s.useRef(null),qe=s.useRef(null),fr=s.useRef(null),p=s.useRef(!1),G=s.useRef(!1),[re,Ee]=s.useState(!1),[sr,cr]=s.useState(0),[Je,Nr]=s.useState(0),[Mt,ar]=s.useState(null),[Bt,Rt]=s.useState(1),[nt,Hr]=s.useState(!1),[ia,Is]=s.useState(!1),[la,at]=s.useState(!0),[ca,Us]=s.useState(0),yr=s.useRef(null),[dr,Or]=s.useState(null),[da,Fr]=s.useState("direct"),[Ns,It]=s.useState(!1),[Pr,ua]=s.useState(1),[Hs,Os]=s.useState(!1),[Fs,Vs]=s.useState(null),[pa,xa]=s.useState(0),[qs,Ds]=s.useState(""),[ha,Ks]=s.useState(!1),it=s.useCallback(()=>{yr.current&&clearTimeout(yr.current),re&&(yr.current=setTimeout(()=>{at(!1)},2200))},[re]),F=A.find(i=>i._id===r||i.urlSlug===r||String(i.id)===String(r)),ir=((F==null?void 0:F.lessons)||[])[w]||null,a=(ao=F==null?void 0:F.lessons)==null?void 0:ao[w],Ut=!!((io=a==null?void 0:a.materials)!=null&&io.length),Nt=!!((lo=a==null?void 0:a.linkedTests)!=null&&lo.length),Gs=!!((uo=(co=a==null?void 0:a.homework)==null?void 0:co.assignments)!=null&&uo.length||(po=a==null?void 0:a.homework)!=null&&po.length||a!=null&&a.homework),ma=Ut||Nt||pe,Ce=Array.isArray(a==null?void 0:a.mediaItems)&&a.mediaItems.length?a.mediaItems:a!=null&&a.videoUrl||a!=null&&a.fileUrl?[{mediaId:(a==null?void 0:a._id)||(a==null?void 0:a.id)||(a==null?void 0:a.urlSlug),title:(a==null?void 0:a.title)||"",videoUrl:(a==null?void 0:a.videoUrl)||"",fileUrl:(a==null?void 0:a.fileUrl)||"",fileName:(a==null?void 0:a.fileName)||"",fileSize:(a==null?void 0:a.fileSize)||0,durationSeconds:(a==null?void 0:a.durationSeconds)||0,streamType:(a==null?void 0:a.streamType)||"direct",streamAssets:Array.isArray(a==null?void 0:a.streamAssets)?a.streamAssets:[]}]:[],K=Ce[M]||Ce[0]||null,Ws=(a==null?void 0:a.type)==="video"&&((xo=a==null?void 0:a.videoUrl)==null?void 0:xo.includes("youtu")),pr=!!(K!=null&&K.videoUrl||K!=null&&K.fileUrl),ur=(a==null?void 0:a.urlSlug)||(a==null?void 0:a._id)||(a==null?void 0:a.id),Vr=!!(Ce.length||a!=null&&a.videoUrl||a!=null&&a.fileUrl),br=s.useMemo(()=>Ce.map((i,b)=>String((i==null?void 0:i.mediaId)||(i==null?void 0:i._id)||(i==null?void 0:i.fileUrl)||(i==null?void 0:i.videoUrl)||b)),[Ce]),Xs=String((K==null?void 0:K.mediaId)||(K==null?void 0:K._id)||(K==null?void 0:K.fileUrl)||(K==null?void 0:K.videoUrl)||M);s.useEffect(()=>{let i=!1;if(!ur||!r){le(!1);return}if(Gs){le(!0);return}return(async()=>{var q;try{const Q=await oe(r,ur);i||le(!!((q=Q==null?void 0:Q.assignments)!=null&&q.length))}catch{i||le(!1)}})(),()=>{i=!0}},[r,oe,Gs,ur]),s.useEffect(()=>{if(!Y||!r||!ur||Ce.length<=1)return;let i=!1;const b=[];return(async()=>{const Q=await we(()=>import("./media-realtime-B2IcwcIy.js").then(je=>je.h),__vite__mapDeps([6,2,1,3])).catch(()=>null),W=Q==null?void 0:Q.default;await Promise.all(Ce.map(async(je,Ae)=>{var rr;const ke=br[Ae];if(!(X[ke]>0))try{const{streamUrl:Se,streamType:xr}=await Xt(r,ur,je==null?void 0:je.mediaId);if(!Se||i)return;const or=Se.startsWith("http")?Se:`${Pt}${Se}`,Ue=document.createElement("video");Ue.preload="metadata",Ue.muted=!0;const Gt=()=>{const vr=Number(Ue.duration||0);!i&&vr>0&&ie(wo=>({...wo,[ke]:vr}))},Wt=()=>{Ue.removeAttribute("src"),Ue.load()};if(xr==="hls"||or.endsWith(".m3u8")||(je==null?void 0:je.streamType)==="hls"){if(Ue.canPlayType("application/vnd.apple.mpegurl")){Ue.onloadedmetadata=Gt,Ue.src=or,b.push(Wt);return}if((rr=W==null?void 0:W.isSupported)!=null&&rr.call(W)){const vr=new W({enableWorker:!0,lowLatencyMode:!1});vr.on(W.Events.LEVEL_LOADED,(wo,Ar)=>{var So,Po;const ko=Number(((So=Ar==null?void 0:Ar.details)==null?void 0:So.totalduration)||((Po=Ar==null?void 0:Ar.details)==null?void 0:Po.averagetargetduration)||0);!i&&ko>0&&ie(_a=>({..._a,[ke]:ko}))}),vr.loadSource(or),vr.attachMedia(Ue),b.push(()=>{vr.destroy(),Wt()});return}}Ue.onloadedmetadata=Gt,Ue.src=or,b.push(Wt)}catch(Se){console.error("Failed to preload media duration:",Se)}}))})(),()=>{i=!0,b.forEach(Q=>{try{Q()}catch{}})}},[Pt,r,Xt,ur,Ce,X,br,Y]);const Ge=s.useMemo(()=>{const i=Ce.map(W=>Number((W==null?void 0:W.durationSeconds)||0));if(i.some(W=>W>0))return i.map((W,je)=>Number(X[br[je]]||0)||(W>0?W:1));const q=br.map(W=>Number(X[W]||0));return q.length>0&&q.every(W=>Number(W)>0)?q:Ce.map(()=>1)},[Ce,X,br]),lt=s.useMemo(()=>Ge.map((i,b)=>b===M?Math.max(Number(i||0),Number(Je||0)):Number(i||0)),[M,Je,Ge]),Fe=s.useMemo(()=>lt.reduce((i,b)=>i+Number(b||0),0),[lt]),Cr=s.useMemo(()=>lt.slice(0,M).reduce((i,b)=>i+Number(b||0),0),[M,lt])+sr,Ht=Fe?Cr/Fe*100:Je?sr/Je*100:0,ga=s.useMemo(()=>{if(!Ge.length||!Fe)return[];let i=0;return Ge.slice(0,-1).map(b=>(i+=Number(b||0),i/Fe*100))},[Ge,Fe]),Ys=s.useMemo(()=>Ce.map((i,b)=>({key:br[b],title:(i==null?void 0:i.title)||`${(a==null?void 0:a.title)||"Video"} ${b+1}`})),[a==null?void 0:a.title,Ce,br]),Ot=s.useCallback(async(i=1)=>{if(!(!r||!(ir!=null&&ir._id)))try{i===1&&Ke(!0);const b=await R(r,ir._id,i,10),q=b.data||[],Q=b.totalPages||1;k(W=>i===1?q:[...W,...q]),se(i),ve(i<Q)}catch(b){console.error(b)}finally{i===1&&Ke(!1)}},[r,ir==null?void 0:ir._id,R]);s.useEffect(()=>{c&&Ot(1)},[ir==null?void 0:ir._id,c,Ot]);const fa=v(r),Ie=F?B(r):!1,Qs=$n(u),Js=$n(F==null?void 0:F.createdBy),qr=String(Js||"")===String(Qs||""),ya=async()=>{if(ye)try{Ye(!0),await E(r,ye),w>=F.lessons.length-1&&w>0&&ce(w-1),Oe(null)}catch(i){console.error(i),toast.error(o("coursePlayer.errors.deleteLesson"))}finally{Ye(!1)}},Zs=s.useCallback(()=>{J(!1),z(null)},[]),ba=s.useCallback(()=>{z(null),J(!0)},[]),eo=s.useCallback(i=>{z(i),J(!0)},[]);s.useEffect(()=>{if(F&&l){const i=F.lessons.findIndex(b=>b.urlSlug===l||String(b._id)===l||String(b.id)===l);i!==-1&&i!==w&&ce(i)}},[F,l]),s.useEffect(()=>{if(!F)return;const i=F.urlSlug||F._id||F.id,b=(a==null?void 0:a.urlSlug)||(a==null?void 0:a._id)||(a==null?void 0:a.id),q=b?`/courses/${i}/${b}`:`/courses/${i}`;window.location.pathname!==q&&window.history.replaceState(null,"",q)},[F,a]);const Ze=fa,Ft=qr||Ze==="approved"||Ie,ro=s.useCallback(i=>{var b;if(qr||Ie||!F)return!0;if(Ze!=="approved")return i===0;if(i===0)return!0;for(let q=0;q<i;q+=1){const Q=(b=F.lessons)==null?void 0:b[q];if(!Q||Q.status==="draft")continue;if((Array.isArray(Q.linkedTests)?Q.linkedTests.filter(Ae=>(Ae==null?void 0:Ae.requiredToUnlock)!==!1):[]).some(Ae=>{var ke;return!((ke=Ae==null?void 0:Ae.selfProgress)!=null&&ke.passed)}))return!1}return!0},[Ie,F,Ze,qr]),er=s.useCallback(i=>Ie||qr?!0:Ft?ro(i):i===0,[Ie,Ft,ro,qr]);s.useEffect(()=>{ce(0),f(!1),me(!1),Ee(!1),cr(0),Nr(0),de(!1),Or(null),Fr("direct")},[r]),s.useEffect(()=>{if(!Ce.length){I(0);return}M>Ce.length-1&&I(0)},[M,Ce.length]),s.useEffect(()=>{cr(0),Us(0),ar(null),Nr(Number(X[Xs]||(K==null?void 0:K.durationSeconds)||0))},[M,K==null?void 0:K.durationSeconds,Xs,X]);const Vt=s.useRef(new Set),to=s.useRef({}),$r=s.useRef({}),qt=s.useRef({});s.useEffect(()=>{Ee(!1),cr(0),Nr(0),I(0),de(!1),Or(null),Fr("direct"),L(!1);const i=(a==null?void 0:a._id)||(a==null?void 0:a.id)||(a==null?void 0:a.urlSlug);i&&(qt.current[String(i)]=0)},[w,r]),s.useEffect(()=>{!a||!Vr||!pr||!er(w)||Y||(G.current=!1,de(!0))},[w,er,a,Vr,pr,Y]);const Tr=s.useCallback(async(i,b=!1)=>{const q=String(i||"");if(!q)return;const Q=Number($r.current[q]||0);if(!(!Q||!b&&Q<10)){$r.current[q]=0;try{await O(r,q,Number(Q.toFixed(2)))}catch(W){console.error(W),$r.current[q]=Number($r.current[q]||0)+Q}}},[r,O]);s.useEffect(()=>{const i=(a==null?void 0:a._id)||(a==null?void 0:a.id)||(a==null?void 0:a.urlSlug);!r||!i||!Je||!er(w)||Vt.current.has(String(i))||Math.round(Ht)<20||(Vt.current.add(String(i)),S(r,i).catch(q=>{console.error(q),Vt.current.delete(String(i))}))},[w,er,r,a,Ht,S]),s.useEffect(()=>{const i=(a==null?void 0:a._id)||(a==null?void 0:a.id)||(a==null?void 0:a.urlSlug);if(!i||Ie||Ze!=="approved"||!Vr||!Fe||!er(w))return;const b=String(i),q=Number(qt.current[b]??Cr),Q=Cr-q;if(qt.current[b]=Cr,!re||Q<=0||Q>2.5)return;const W=Q/Fe*100;if(W<=0)return;const je=Number(to.current[b]||0)+W,Ae=Number($r.current[b]||0)+W;to.current[b]=je,$r.current[b]=Ae;const ke=je>=70&&je-W<70;(ke||Ae>=10)&&Tr(b,ke)},[w,Ie,er,a,Vr,Ze,Tr,re,Cr,Fe]),s.useEffect(()=>{const i=(a==null?void 0:a._id)||(a==null?void 0:a.id)||(a==null?void 0:a.urlSlug);!i||re||Tr(i,!0)},[a,Tr,re]),s.useEffect(()=>{const i=(a==null?void 0:a._id)||(a==null?void 0:a.id)||(a==null?void 0:a.urlSlug);return()=>{i&&Tr(i,!0)}},[a,Tr]);const zr=s.useCallback(()=>{if(pr&&!dr){G.current=!0,de(!0),ar(null);return}if(ee.current)if(ar(null),re)ee.current.pause();else{const i=ee.current.play();i!==void 0&&i.catch(b=>{b.name==="NotSupportedError"?ar(o("coursePlayer.errors.formatNotSupported")):(console.error("Playback error:",b),ar(o("coursePlayer.errors.playback"))),Ee(!1)})}},[pr,re,dr]),ct=s.useCallback(()=>{!ee.current||!G.current&&!p.current||(G.current=!1,p.current=!1,ee.current.play().catch(()=>{}))},[]),so=s.useCallback(()=>{ee.current&&(ee.current.currentTime+=10)},[]),oo=s.useCallback(()=>{ee.current&&(ee.current.currentTime-=10)},[]),va=s.useCallback(()=>{Pe.current&&clearTimeout(Pe.current),Pe.current=setTimeout(()=>{zr(),Pe.current=null},220)},[zr]),ja=s.useCallback(i=>{if(!Qe.current)return;Pe.current&&(clearTimeout(Pe.current),Pe.current=null);const b=Qe.current.getBoundingClientRect();i.clientX-b.left<b.width/2?oo():so()},[oo,so]),wa=s.useCallback(()=>{if(!ee.current)return;cr(ee.current.currentTime);const i=ee.current;i.buffered.length>0&&Us(i.buffered.end(i.buffered.length-1)/i.duration*100)},[]);s.useCallback(i=>{Nr(i)},[]);const ka=s.useCallback(i=>{if(!ee.current)return;const b=i.currentTarget.getBoundingClientRect(),q=(i.clientX-b.left)/b.width,Q=q*(Fe||Je||0);if(Ce.length<=1||!Fe){ee.current.currentTime=q*Je;return}let W=0;for(let je=0;je<Ge.length;je+=1){const Ae=Number(Ge[je]||0),ke=W+Ae;if(Q<=ke||je===Ge.length-1){je!==M?(p.current=re,I(je),fr.current=Math.max(0,Q-W),cr(0)):ee.current.currentTime=Math.max(0,Q-W);break}W=ke}},[M,Je,Ce.length,Ge,Fe]),Sa=s.useCallback(i=>{const b=parseFloat(i.target.value);Rt(b),ee.current&&(ee.current.volume=b),Hr(b===0)},[]),Dt=s.useCallback(()=>{ee.current&&(nt?(ee.current.volume=Bt||1,Hr(!1)):(ee.current.volume=0,Hr(!0)))},[nt,Bt]),Kt=s.useCallback(()=>{Qe.current&&(document.fullscreenElement?(document.exitFullscreen(),Is(!1)):(Qe.current.requestFullscreen(),Is(!0)))},[]);s.useEffect(()=>()=>{Pe.current&&clearTimeout(Pe.current),yr.current&&clearTimeout(yr.current)},[]);const Pa=s.useCallback(i=>{ua(i),ee.current&&(ee.current.playbackRate=i),Os(!1)},[]),Ca=s.useCallback(i=>{var Ae;if(!Je&&!Fe)return;const b=i.currentTarget.getBoundingClientRect(),Q=Math.max(0,Math.min(1,(i.clientX-b.left)/b.width))*(Fe||Je);let W=0,je=0;for(let ke=0;ke<Ge.length&&(W+=Number(Ge[ke]||0),je=ke,!(Q<=W||ke===Ge.length-1));ke+=1);Vs(Q),xa(i.clientX-b.left),Ds(((Ae=Ys[je])==null?void 0:Ae.title)||"")},[Je,Ge,Ys,Fe]),$a=s.useCallback(()=>{at(!0),it()},[it]);s.useEffect(()=>{if(!re){at(!0),yr.current&&clearTimeout(yr.current);return}it()},[M,re,it]),s.useEffect(()=>{const i=b=>{if(!["INPUT","TEXTAREA"].includes(b.target.tagName))switch(b.key){case" ":case"k":b.preventDefault(),zr();break;case"ArrowRight":ee.current&&(ee.current.currentTime+=10);break;case"ArrowLeft":ee.current&&(ee.current.currentTime-=10);break;case"ArrowUp":if(b.preventDefault(),ee.current){const q=Math.min(1,(ee.current.volume||0)+.1);ee.current.volume=q,Rt(q),Hr(!1)}break;case"ArrowDown":if(b.preventDefault(),ee.current){const q=Math.max(0,(ee.current.volume||0)-.1);ee.current.volume=q,Rt(q),Hr(q===0)}break;case"f":case"F":Kt();break;case"m":case"M":Dt();break}};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[zr,Kt,Dt]);const Ta=i=>{const b=F.lessons[i];if(b){if(Ie&&b.status==="draft"){eo(b);return}if(ce(i),b){const q=b.urlSlug||b._id||b.id,Q=F.urlSlug||F._id||F.id;window.history.replaceState(null,"",`/courses/${Q}/${q}`)}}},za=s.useCallback(async i=>{var q,Q;const b=(i==null?void 0:i._id)||(i==null?void 0:i.id)||(i==null?void 0:i.urlSlug);if(b)try{await P(r,b)}catch(W){console.error(W),toast.error(((Q=(q=W==null?void 0:W.response)==null?void 0:q.data)==null?void 0:Q.message)||o("addLesson.publishError"))}},[r,P,o]),La=s.useCallback(()=>{if(M<Ce.length-1){p.current=!0,I(i=>i+1);return}F&&w<F.lessons.length-1&&ce(i=>i+1)},[w,M,F,Ce.length]),Lr=pr&&((K==null?void 0:K.streamType)==="hls"||((ho=K==null?void 0:K.videoUrl)==null?void 0:ho.endsWith(".m3u8"))||da==="hls");if(s.useEffect(()=>{if(!Y||!pr||!ur||!er(w)){Or(null),Fr("direct"),It(!1);return}let i=!1;return(async()=>{It(!0),Or(null),Fr("direct"),ar(null);try{const{streamUrl:q,streamType:Q}=await Xt(r,ur,K==null?void 0:K.mediaId);if(i||!q)return;const W=q.startsWith("http")?q:`${Pt}${q}`;Fr(Q||"direct"),Or(W)}catch{i||ar(o("coursePlayer.errors.playbackToken"))}finally{i||It(!1)}})(),()=>{i=!0}},[w,er,r,K==null?void 0:K.mediaId,pr,ur,Y]),s.useEffect(()=>{qe.current&&(qe.current.destroy(),qe.current=null);const i=ee.current;if(!i||!dr||!Lr)return;let b=!1;return(async()=>{if(i.canPlayType("application/vnd.apple.mpegurl")){i.src=dr;return}const Q=await we(()=>import("./media-realtime-B2IcwcIy.js").then(rr=>rr.h),__vite__mapDeps([6,2,1,3]));if(b)return;const W=Q.default;if(!W.isSupported()){ar(o("coursePlayer.errors.hlsUnsupported"));return}const je=W.DefaultConfig.loader;class Ae extends je{load(Se,xr,or){const Ue=String((Se==null?void 0:Se.url)||"");return/^https?:\/\/files\.tayn\.uz\//i.test(Ue)&&(delete Se.rangeStart,delete Se.rangeEnd),super.load(Se,xr,or)}}const ke=new W({enableWorker:!0,lowLatencyMode:!1,loader:Ae,xhrSetup:(rr,Se)=>{const xr=String(Se||""),or=/^https?:\/\/files\.tayn\.uz\//i.test(xr);rr.withCredentials=!or},fetchSetup:(rr,Se)=>{const xr=String((rr==null?void 0:rr.url)||""),or=/^https?:\/\/files\.tayn\.uz\//i.test(xr),Ue=new Headers((Se==null?void 0:Se.headers)||{});return or&&Ue.delete("Range"),new Request(xr,{...Se,credentials:or?"omit":"include",headers:Ue})}});qe.current=ke,ke.on(W.Events.MANIFEST_PARSED,()=>{ee.current&&(ee.current.playbackRate=Pr),ct()}),ke.loadSource(dr),ke.attachMedia(i),ke.on(W.Events.ERROR,(rr,Se)=>{Se!=null&&Se.fatal&&(ar(o("coursePlayer.errors.hlsPlayback")),ke.destroy(),qe.current=null)})})(),()=>{b=!0,qe.current&&(qe.current.destroy(),qe.current=null)}},[ct,Lr,Pr,dr,o]),s.useEffect(()=>{if(!dr||Lr||!G.current||!ee.current)return;let i=!1;const b=ee.current,q=()=>{i||!ee.current||!G.current||(G.current=!1,ee.current.play().catch(()=>{}))},Q=()=>{b.removeEventListener("canplay",Q),q()},W=requestAnimationFrame(()=>{b.readyState>=2?q():b.addEventListener("canplay",Q,{once:!0})});return()=>{i=!0,cancelAnimationFrame(W),b.removeEventListener("canplay",Q)}},[Lr,dr]),!F)return e.jsxs(Sp,{children:[e.jsx(Pp,{children:e.jsx(Lt,{size:36,color:"white"})}),e.jsx(Cp,{children:o("coursePlayer.empty.title")}),e.jsx($p,{children:o("coursePlayer.empty.description")})]});const no=Ws?zp(a.videoUrl):null,Aa={addComment:D,addReply:N,admin:Ie,course:F,courseId:r,currentLessonData:a,currentUser:u,fetchComments:Ot,formatCommentTime:Tp,formatViews:Cn,handleLessonClick:Ta,onClose:n,paginatedComments:g,playlistCollapsed:he,replyingTo:j,replyText:tr,setCommentText:xe,setCommentsExpanded:x,setIsAddLessonOpen:J,setLessonToDelete:Oe,setPlaylistCollapsed:f,setReplyText:Z,setReplyingTo:He,setShowCommentInput:We,openLessonCreator:ba,openLessonEditor:eo,handlePublishLesson:za,showCommentInput:Ne,commentsExpanded:c,commentsHasMore:Re,commentsPage:ne,commentText:Te,activeLesson:w,canAccessLesson:er,canAccessLessons:Ft};return e.jsxs(Yl,{value:Aa,children:[e.jsxs(wu,{children:[e.jsxs(ku,{children:[er(w)&&a&&Vr?e.jsxs(e.Fragment,{children:[Ws&&no?e.jsxs(wn,{ref:Qe,children:[e.jsx(Pu,{src:`https://www.youtube.com/embed/${no}?rel=0&modestbranding=1`,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,title:a.title}),e.jsx(Cu,{$visible:!0,children:e.jsx(kn,{children:e.jsx(Lu,{onClick:()=>n(),children:e.jsx(Tt,{size:20})})})})]}):e.jsxs(wn,{ref:Qe,onMouseMove:$a,onMouseLeave:()=>{re&&at(!1)},onClick:va,onDoubleClick:ja,onContextMenu:i=>i.preventDefault(),children:[(Ns||ha)&&e.jsx(Du,{children:e.jsx(Ku,{})}),e.jsx(Gu,{ref:ee,src:pr?Lr?void 0:dr||void 0:(K==null?void 0:K.videoUrl)||a.videoUrl,preload:"metadata",crossOrigin:Lr?"anonymous":void 0,controlsList:"nodownload",disablePictureInPicture:!0,onContextMenu:i=>i.preventDefault(),onPlay:()=>Ee(!0),onPause:()=>Ee(!1),onWaiting:()=>Ks(!0),onCanPlay:()=>{Ks(!1),ct()},onTimeUpdate:wa,onLoadedMetadata:()=>{if(ee.current){const i=Number(ee.current.duration||0),b=String((K==null?void 0:K.mediaId)||(K==null?void 0:K._id)||(K==null?void 0:K.fileUrl)||(K==null?void 0:K.videoUrl)||M);Nr(i),ie(q=>({...q,[b]:i})),fr.current!==null&&(ee.current.currentTime=fr.current,fr.current=null),ee.current.playbackRate=Pr,ct()}},onError:i=>{Ns||ar(o("coursePlayer.errors.playback"))},onEnded:La}),Mt&&e.jsxs(Wu,{children:[e.jsx(Co,{size:48}),e.jsx(Xu,{children:Mt})]}),e.jsx(Au,{$visible:!re&&!Mt,onClick:i=>{i.stopPropagation(),zr()},children:e.jsx(zt,{size:32,fill:"white",color:"white"})}),e.jsxs(Zn,{$visible:la||!re,onClick:i=>i.stopPropagation(),children:[e.jsx(kn,{children:e.jsxs($u,{children:[e.jsx(ea,{onClick:()=>n(),children:e.jsx(Tt,{size:20})}),e.jsx(Tu,{children:a.title})]})}),e.jsxs(_u,{children:[e.jsxs(ra,{onMouseMove:i=>{Ca(i),i.stopPropagation()},onMouseLeave:()=>{Vs(null),Ds("")},onClick:i=>{i.stopPropagation(),ka(i)},children:[e.jsx(Bu,{$width:ca}),e.jsx(Mu,{$width:Ht}),ga.map(i=>e.jsx(Eu,{$left:i},i)),Fs!==null&&e.jsxs(Ru,{$left:pa,children:[qs?e.jsx("strong",{children:qs}):null,e.jsx("span",{children:Ps(Fs)})]})]}),e.jsxs(Iu,{children:[e.jsxs(Uu,{children:[e.jsx($t,{onClick:zr,children:re?e.jsx(Ja,{size:20}):e.jsx(zt,{size:20,fill:"white"})}),e.jsxs(ta,{children:[e.jsx($t,{onClick:Dt,children:nt?e.jsx(Za,{size:18}):e.jsx(ei,{size:18})}),e.jsx(Ju,{type:"range",min:"0",max:"1",step:"0.05",value:nt?0:Bt,onChange:Sa})]}),e.jsxs(Yu,{children:[Ps(Cr)," /"," ",Ps(Fe||Je)]}),Ce.length>1?e.jsx(Qu,{title:(K==null?void 0:K.title)||"",children:(K==null?void 0:K.title)||`${(a==null?void 0:a.title)||"Video"} ${M+1}`}):null]}),e.jsxs(Nu,{children:[e.jsxs(Hu,{onClick:i=>i.stopPropagation(),children:[e.jsxs(Ou,{title:o("coursePlayer.speed.title"),onClick:()=>Os(i=>!i),$active:Hs,$accent:Pr!==1,children:[Pr,"x"]}),Hs&&e.jsxs(Fu,{children:[e.jsx(Vu,{children:o("coursePlayer.speed.title")}),[.5,.75,1,1.25,1.5,2].map(i=>e.jsx(qu,{onClick:()=>Pa(i),$active:Pr===i,children:i===1?o("coursePlayer.speed.normal"):`${i}x`},i))]})]}),e.jsx($t,{onClick:Kt,children:ia?e.jsx(ri,{size:18}):e.jsx(ti,{size:18})})]})]})]})]})]}),e.jsxs(Zu,{children:[e.jsx(ep,{children:o("coursePlayer.meta.lesson",{index:w+1,title:a.title})}),e.jsxs(rp,{children:[e.jsxs(sa,{children:[e.jsx(Fn,{size:14}),Cn(a.views)," ",o("coursePlayer.meta.views")]}),e.jsxs(hp,{onClick:()=>y(r,a._id),$liked:a.liked,children:[e.jsx(si,{size:14,fill:a.liked?"currentColor":"none"}),a.likes||0," ",o("coursePlayer.meta.likes")]}),e.jsxs(Sn,{children:[e.jsx(Lt,{size:14}),F.name]}),Ce.length>1?e.jsxs(Sn,{children:[e.jsx($o,{size:14}),M+1,"/",Ce.length]}):null]})]}),a!=null&&a.description?e.jsxs(tp,{children:[e.jsxs(dp,{children:[e.jsx(up,{children:o("coursePlayer.description.title")}),a.description.length>180?e.jsx(xp,{type:"button",onClick:()=>L(i=>!i),children:o(ze?"coursePlayer.description.less":"coursePlayer.description.more")}):null]}),e.jsx(pp,{$expanded:ze,children:a.description})]}):null,!Ie&&ma?e.jsxs(sp,{children:[e.jsxs(op,{type:"button",onClick:()=>m(i=>!i),children:[e.jsxs(np,{children:[e.jsxs(ap,{children:[o("coursePlayer.extras.title"),H?e.jsx(rt,{size:16}):e.jsx(tt,{size:16})]}),e.jsx(ip,{children:o("coursePlayer.extras.description")})]}),H?null:e.jsxs(lp,{children:[!H&&Ut?e.jsx(vs,{children:o("coursePlayer.materials.title")}):null,!H&&Nt?e.jsx(vs,{children:o("coursePlayer.lessonTests.title")}):null,!H&&pe?e.jsx(vs,{children:o("coursePlayer.homework.title")}):null]})]}),H?e.jsxs(cp,{children:[Ut?e.jsx(jn,{forceExpanded:!0,showCollapseToggle:!1}):null,Nt?e.jsx(Qn,{forceExpanded:!0,showCollapseToggle:!1}):null,e.jsx(Xn,{forceExpanded:!0,showCollapseToggle:!1})]}):null]}):null,Ie?e.jsx(jn,{}):null]}):er(w)&&a?e.jsxs(js,{children:[e.jsx(ws,{children:a.status==="draft"?e.jsx($o,{size:32,color:"var(--warning-color)"}):e.jsx(Co,{size:32,color:"var(--text-muted-color)"})}),e.jsx(ks,{children:a.status==="draft"?o("coursePlayer.locked.draftTitle"):o("coursePlayer.locked.missingMediaTitle")}),e.jsx(Ss,{$wide:!0,children:a.status==="draft"?o(Ie?"coursePlayer.locked.draftAdminDescription":"coursePlayer.locked.draftDescription"):o(Ie?"coursePlayer.locked.missingMediaAdminDescription":"coursePlayer.locked.missingMediaDescription")})]}):er(w)&&F.lessons.length===0?e.jsxs(js,{children:[e.jsx(ws,{children:e.jsx(On,{size:32,color:"var(--text-muted-color)"})}),e.jsx(ks,{children:o("coursePlayer.locked.noLessonsTitle")}),e.jsx(Ss,{children:o(Ie?"coursePlayer.locked.noLessonsAdmin":"coursePlayer.locked.noLessonsUser")})]}):e.jsxs(js,{children:[e.jsx(ws,{children:Array.isArray(a==null?void 0:a.accessLockedByTests)&&a.accessLockedByTests.length>0?e.jsx(To,{size:32,color:"var(--warning-color)"}):Ze==="pending"?e.jsx(zo,{size:32,color:"var(--warning-color)"}):e.jsx(oi,{size:32,color:"var(--text-muted-color)"})}),e.jsx(ks,{children:Array.isArray(a==null?void 0:a.accessLockedByTests)&&a.accessLockedByTests.length>0?o("coursePlayer.lessonTests.lockedTitle"):o(Ze==="pending"?"coursePlayer.locked.pendingTitle":"coursePlayer.locked.enrollTitle")}),e.jsx(Ss,{$wide:!0,children:Array.isArray(a==null?void 0:a.accessLockedByTests)&&a.accessLockedByTests.length>0?o("coursePlayer.lessonTests.lockedDescription"):o(Ze==="pending"?"coursePlayer.locked.pendingDescription":"coursePlayer.locked.enrollDescription")})]}),e.jsxs(gp,{children:[e.jsxs(fp,{children:[e.jsx(bp,{children:(mo=F==null?void 0:F.createdBy)!=null&&mo.avatar?e.jsx(oa,{src:F.createdBy.avatar,alt:"author"}):(((go=F==null?void 0:F.createdBy)==null?void 0:go.name)||((fo=F==null?void 0:F.createdBy)==null?void 0:fo.username)||"?").charAt(0).toUpperCase()}),e.jsxs(vp,{children:[e.jsx(jp,{children:((yo=F==null?void 0:F.createdBy)==null?void 0:yo.name)||((bo=F==null?void 0:F.createdBy)==null?void 0:bo.username)||o("coursePlayer.creator.author")}),e.jsx(wp,{children:o("coursePlayer.creator.students",{count:((vo=F==null?void 0:F.members)==null?void 0:vo.length)||0})})]})]}),e.jsx(Pn,{children:Ie?e.jsxs(kr,{$variant:"admin",onClick:()=>me(!0),children:[e.jsx(To,{size:16}),o("coursePlayer.actions.manage")]}):Ze==="pending"?e.jsxs(Pn,{children:[e.jsxs(kr,{$variant:"pending",children:[e.jsx(zo,{size:16}),o("coursePlayer.actions.pending")]}),e.jsx(kr,{$variant:"admin",onClick:()=>T(r,Qs),children:o("coursePlayer.actions.cancel")})]}):Ze==="approved"?e.jsxs(kr,{$variant:"enrolled",children:[e.jsx(ni,{size:16}),o("coursePlayer.actions.enrolled")]}):(F==null?void 0:F.accessType)==="paid"&&Ze==="none"?e.jsxs(kr,{$variant:"enroll",onClick:async()=>{try{await _(r);const b=await d({isGroup:!1,memberIds:[Js]});b&&h(`/users/${b==null?void 0:b.jammId}`)}catch(i){console.error(i),toast.error(o("coursePlayer.errors.chatCreate"))}},children:[e.jsx(Lo,{size:16}),o("coursePlayer.actions.buy",{price:((jo=F==null?void 0:F.price)==null?void 0:jo.toLocaleString())||0})]}):Ze==="none"?e.jsxs(kr,{$variant:"enroll",onClick:()=>_(r),children:[e.jsx(Lo,{size:16}),o("coursePlayer.actions.enroll")," ",(F==null?void 0:F.price)>0&&`(${F.price})`]}):null})]})]}),e.jsx(ju,{})]}),Ie?e.jsx(Hd,{isOpen:ae,onClose:()=>me(!1)}):null,e.jsx(Kn,{isOpen:V,onClose:Zs,courseId:r,lesson:$,onSaved:({mode:i})=>{if(i==="create")ce(F.lessons.length);else if($){const b=$._id||$.id||$.urlSlug,q=(F.lessons||[]).findIndex(Q=>String(Q._id||Q.id||Q.urlSlug)===String(b));q>=0&&ce(q)}Zs()}}),e.jsx(Ms,{isOpen:!!ye,onClose:()=>Oe(null),title:o("coursePlayer.deleteLesson.title"),description:o("coursePlayer.deleteLesson.description"),confirmText:o(Xe?"coursePlayer.deleteLesson.confirmLoading":"coursePlayer.deleteLesson.confirm"),cancelText:o("coursePlayer.deleteLesson.cancel"),onConfirm:ya,isDanger:!0})]})},na=t.div`
  width: 100%;
  height: 140px;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  ${r=>r.hasImage?`
    border: none;
  `:`
    &:hover {
      border-color: var(--primary-color);
      background-color: rgba(88, 101, 242, 0.05);
    }
  `}
`,Ap=t.div`
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

  ${na}:hover & {
    opacity: 1;
  }
`,_p=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`,Ep=t.span`
  font-size: 13px;
  color: var(--text-muted-color);
`,Br=t.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`,Rr=t.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary-color);
`,Cs=t.input`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
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
`,Mp=t.textarea`
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
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
`,Tn=t.select`
  padding: 10px 14px;
  background-color: var(--input-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  outline: none;
`,Bp=t.div`
  margin-top: 8px;
  color: var(--danger-color);
  font-size: 14px;
`,aa=({isOpen:r,onClose:l,onCreated:n,onOpenPremium:o})=>{const{t:h}=De(),{createCourse:d}=lr(),[A,u]=s.useState(""),[B,v]=s.useState(""),[_,U]=s.useState(""),[P,O]=s.useState("IT"),[C,T]=s.useState(0),[S,E]=s.useState("free_request");s.useRef(null);const[R,oe]=s.useState(""),[D,N]=s.useState(!1);if(!r)return null;const y=async()=>{if(A.trim()){oe(""),N(!0);try{const w=await d(A.trim(),B.trim(),_,P,C,S);u(""),v(""),U(""),O("IT"),T(0),E("free_request"),n(w)}catch(w){w.message.includes("Premium")||w.message.includes("maksimal")?(l(),o&&o()):oe(w.message||h("createCourse.error"))}finally{N(!1)}}},te=w=>{U(w.target.value)},ge=w=>{w.key==="Escape"&&l()};return e.jsx(Ir,{onClick:l,onKeyDown:ge,children:e.jsxs(Ur,{$width:"min(100%, 520px)",$maxWidth:"95vw",$maxHeight:"min(88vh, 760px)",$radius:"18px",onClick:w=>w.stopPropagation(),children:[e.jsxs(Qr,{$padding:"16px 18px",children:[e.jsx(Jr,{children:h("createCourse.title")}),e.jsx(Et,{onClick:l,children:e.jsx(gr,{size:18})})]}),e.jsxs(Zr,{$padding:"16px 18px 18px",children:[e.jsx(na,{hasImage:!!_,children:_?e.jsxs(e.Fragment,{children:[e.jsx(_p,{src:_,alt:"Course",onError:()=>U("")}),e.jsx(Ap,{children:h("createCourse.imageChange")})]}):e.jsxs(e.Fragment,{children:[e.jsx(ai,{size:32,color:"var(--text-muted-color)"}),e.jsx(Ep,{children:h("createCourse.imagePrompt")})]})}),e.jsxs(Br,{children:[e.jsx(Rr,{children:h("createCourse.imageUrl")}),e.jsx(Cs,{type:"url",placeholder:"https://example.com/image.jpg",value:_,onChange:te})]}),e.jsxs(Br,{children:[e.jsx(Rr,{children:h("createCourse.name")}),e.jsx(Cs,{type:"text",placeholder:h("createCourse.namePlaceholder"),value:A,onChange:w=>u(w.target.value.slice(0,be.courseNameChars)),maxLength:be.courseNameChars,autoFocus:!0})]}),e.jsxs(Br,{children:[e.jsx(Rr,{children:h("createCourse.category")}),e.jsxs(Tn,{value:P,onChange:w=>O(w.target.value),children:[e.jsx("option",{value:"IT",children:h("createCourse.categories.it")}),e.jsx("option",{value:"SMM",children:h("createCourse.categories.smm")}),e.jsx("option",{value:"Til o'rganish",children:h("createCourse.categories.language")}),e.jsx("option",{value:"Mobile",children:h("createCourse.categories.mobile")}),e.jsx("option",{value:"Design",children:h("createCourse.categories.design")})]})]}),e.jsxs(Br,{children:[e.jsx(Rr,{children:h("createCourse.accessType")}),e.jsxs(Tn,{value:S,onChange:w=>E(w.target.value),children:[e.jsx("option",{value:"free_request",children:h("createCourse.access.freeRequest")}),e.jsx("option",{value:"free_open",children:h("createCourse.access.freeOpen")}),e.jsx("option",{value:"paid",children:h("createCourse.access.paid")})]})]}),S==="paid"&&e.jsxs(Br,{children:[e.jsx(Rr,{children:h("createCourse.price")}),e.jsx(Cs,{type:"number",min:"0",placeholder:h("createCourse.pricePlaceholder"),value:C,onChange:w=>T(Number(w.target.value))})]}),e.jsxs(Br,{children:[e.jsx(Rr,{children:h("createCourse.description")}),e.jsx(Mp,{placeholder:h("createCourse.descriptionPlaceholder"),value:B,onChange:w=>v(w.target.value.slice(0,be.courseDescriptionChars)),maxLength:be.courseDescriptionChars})]}),R&&e.jsx(Bp,{children:R})]}),e.jsxs(et,{$padding:"14px 18px",children:[e.jsx(nr,{$variant:"ghost",onClick:l,disabled:D,children:h("common.cancel")}),e.jsx(nr,{$variant:"primary",onClick:y,disabled:!A.trim()||D,children:h(D?"createCourse.creating":"common.create")})]})]})})},Rp=t.div`
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
`,Ip=t.div`
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;t.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
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
`;const Up=t.div`
  display: flex;
  padding: 0 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`,zn=t.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 10px;
  border-radius: 0;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: transparent;
  color: ${r=>r.$active?"var(--text-color)":"var(--text-muted-color)"};
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: var(--text-color);
  }

  &::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    background: ${r=>r.$active?"var(--primary-color)":"transparent"};
  }
`,Np=t(Na)`
  flex: 1;
  min-width: 0;
  margin-right: 12px;
`,Ln=t.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`,An=t.div`
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

  ${r=>r.$active&&`
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
`,_n=t.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${r=>r.gradient||"linear-gradient(135deg, #667eea, #764ba2)"};
  background-image: ${r=>r.src?`url(${r.src})`:"none"};
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
`,En=t.div`
  flex: 1;
  min-width: 0;
`,Mn=t.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,Bn=t.div`
  font-size: 12px;
  color: var(--text-muted-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`,Hp=t.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`,Op=t.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--text-muted-color);
`;t.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;const Fp=t.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;

  ${r=>{switch(r.status){case"admin":return"background: rgba(88, 101, 242, 0.15); color: var(--primary-color);";case"approved":return"background: rgba(67, 181, 129, 0.15); color: var(--success-color);";case"pending":return"background: rgba(250, 166, 26, 0.15); color: var(--warning-color);";default:return"background: var(--input-color); color: var(--text-muted-color);"}}}
`,Vp=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  gap: 12px;
`,qp=t.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`,Dp=({selectedCourse:r,onSelectCourse:l,onOpenPremium:n,viewMode:o="courses",onToggleViewMode:h,activeArenaTab:d,setActiveArenaTab:A})=>{const{t:u}=De(),B=As(),{courses:v,loading:_,coursesPage:U,coursesHasMore:P,isAdmin:O,isEnrolled:C,removeCourse:T,fetchCourses:S,ensureCoursesLoaded:E}=lr(),[R,oe]=s.useState("");dt.useEffect(()=>{o==="courses"&&E()},[E,o]);const[D,N]=s.useState(!1),[y,te]=s.useState(null),[ge,w]=s.useState(!1),ce=dt.useMemo(()=>[{key:"tests",title:u("courseSidebar.arena.testsTitle"),description:u("courseSidebar.arena.testsDescription"),icon:e.jsx(Lt,{size:20,color:"white"}),gradient:"linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",path:"/arena/quiz"},{key:"flashcards",title:u("courseSidebar.arena.flashcardsTitle"),description:u("courseSidebar.arena.flashcardsDescription"),icon:e.jsx(ii,{size:20,color:"white"}),gradient:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",path:"/arena/flashcard"},{key:"sentenceBuilders",title:u("courseSidebar.arena.sentencesTitle"),description:u("courseSidebar.arena.sentencesDescription"),icon:e.jsx(li,{size:20,color:"white"}),gradient:"linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)",path:"/arena/sentence-builder"},{key:"mnemonics",title:u("courseSidebar.arena.mnemonicsTitle"),description:u("courseSidebar.arena.mnemonicsDescription"),icon:e.jsx(ci,{size:20,color:"white"}),gradient:"linear-gradient(135deg, #64748b 0%, #334155 100%)",path:"/arena/minemonika"},{key:"battles",title:u("courseSidebar.arena.battlesTitle"),description:u("courseSidebar.arena.battlesDescription"),icon:e.jsx(Ao,{size:20,color:"white"}),gradient:"linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",path:"/arena/battle"}],[u]),he=dt.useMemo(()=>R?v.filter(z=>z.name.toLowerCase().includes(R.toLowerCase())||z.description.toLowerCase().includes(R.toLowerCase())):v.filter(z=>{const ae=C(z._id);return ae==="admin"||ae==="approved"||ae==="pending"}),[v,R,C]),f=dt.useMemo(()=>{const z=R.trim().toLowerCase();return z?ce.filter(ae=>`${ae.title} ${ae.description}`.toLowerCase().includes(z)):ce},[ce,R]),V=z=>{switch(C(z)){case"admin":return{text:u("courseSidebar.status.admin"),icon:null};case"approved":return{text:u("courseSidebar.status.approved"),icon:null};case"pending":return{text:u("courseSidebar.status.pending"),icon:null};default:return null}},J=z=>{l(z._id);const ae=z.urlSlug||z._id;window.history.replaceState(null,"",`/courses/${ae}`)},$=async()=>{if(y)try{w(!0),await T(y._id),r===y._id&&(l(null),window.history.replaceState(null,"","/courses")),te(null)}catch(z){console.error(z),toast.error(u("courseSidebar.deleteError"))}finally{w(!1)}};return e.jsxs(e.Fragment,{children:[e.jsxs(Rp,{children:[e.jsxs(Ip,{children:[e.jsx("div",{"data-tour":"courses-search",style:{display:"flex",flex:1,minWidth:0},children:e.jsx(Np,{type:"text",placeholder:o==="arena"?u("courseSidebar.arena.searchPlaceholder",{defaultValue:"Arena qidirish..."}):u("courseSidebar.searchPlaceholder"),value:R,onChange:z=>oe(z.target.value)})}),o==="courses"&&e.jsx("div",{"data-tour":"courses-create",children:e.jsx(Vn,{onClick:()=>N(!0),title:u("courseSidebar.createTitle"),children:e.jsx(st,{size:18})})})]}),e.jsxs(Up,{"data-tour":"courses-tabs",children:[e.jsxs(zn,{$active:o==="courses",onClick:()=>{h&&h("courses"),B("/courses")},children:[e.jsx(Lt,{size:16})," ",u("courseSidebar.tabs.courses")]}),e.jsxs(zn,{$active:o==="arena",onClick:()=>{h&&h("arena"),l(null),B("/arena")},children:[e.jsx(Ao,{size:16})," ",u("courseSidebar.tabs.arena")]})]}),o==="arena"?e.jsx(Ln,{children:f.map(z=>e.jsxs(An,{$active:d===z.key,onClick:()=>{A&&A(z.key),B(z.path)},children:[e.jsx(_n,{gradient:z.gradient,children:z.icon}),e.jsxs(En,{children:[e.jsx(Mn,{children:z.title}),e.jsx(Bn,{children:z.description})]})]},z.key))}):e.jsx(e.Fragment,{children:e.jsx(Ln,{id:"sidebarCoursesArea","data-tour":"courses-list",children:_?null:he.length===0?e.jsxs(Vp,{children:[e.jsx(qp,{children:e.jsx(Ts,{size:24})}),e.jsx("span",{children:u("courseSidebar.emptyTitle")}),e.jsx("span",{style:{fontSize:12},children:u("courseSidebar.emptyDescription")})]}):e.jsx(Ba,{dataLength:he.length,next:()=>S(U+1),hasMore:P&&!R,loader:e.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:u("common.loading")}),endMessage:he.length>0&&!R?e.jsx("div",{style:{textAlign:"center",padding:"10px",color:"var(--text-muted-color)",fontSize:"12px"},children:u("courseSidebar.allShown")}):null,scrollableTarget:"sidebarCoursesArea",style:{display:"flex",flexDirection:"column",overflow:"visible"},children:he.map(z=>{const ae=V(z._id),me=z.membersCount??(z.members||[]).filter(I=>I.status==="approved").length,M=z.lessonCount??(z.lessons||[]).length;return e.jsxs(An,{$active:r===z._id||r===z.urlSlug,onClick:()=>J(z),children:[e.jsx(_n,{src:z.image,gradient:z.gradient,children:!z.image&&z.name.charAt(0)}),e.jsxs(En,{children:[e.jsx(Mn,{children:z.name}),e.jsxs(Bn,{children:[M>0?u("courseSidebar.lessonCount",{count:M}):u("courseSidebar.noLessons"),ae&&e.jsxs(Fp,{status:C(z._id),children:[ae.icon,ae.text]})]})]}),e.jsxs(Hp,{children:[e.jsxs(Op,{children:[e.jsx(di,{size:12}),me]}),O(z._id)&&e.jsx("div",{onClick:I=>{I.stopPropagation(),te(z)},style:{color:"var(--text-muted-color)",cursor:"pointer",padding:"2px",borderRadius:"4px",display:"flex"},onMouseOver:I=>{I.currentTarget.style.color="var(--danger-color)",I.currentTarget.style.backgroundColor="rgba(239, 68, 68, 0.1)"},onMouseOut:I=>{I.currentTarget.style.color="var(--text-muted-color)",I.currentTarget.style.backgroundColor="transparent"},title:u("courseSidebar.deleteAction"),children:e.jsx(ot,{size:14})})]})]},z._id)})})})})]}),e.jsx(aa,{isOpen:D,onClose:()=>N(!1),onCreated:z=>{N(!1);const ae=v.find(me=>me._id===z);ae?J(ae):l(z)},onOpenPremium:n}),e.jsx(Ms,{isOpen:!!y,onClose:()=>te(null),title:u("courseSidebar.deleteTitle"),description:e.jsx(Ra,{i18nKey:"courseSidebar.deleteDescription",values:{name:(y==null?void 0:y.name)||""},components:{bold:e.jsx("b",{})}}),confirmText:u(ge?"courseSidebar.deleteConfirmLoading":"courseSidebar.deleteConfirm"),cancelText:u("courseSidebar.deleteCancel"),onConfirm:$,isDanger:!0})]})},Rs=Object.freeze(Object.defineProperty({__proto__:null,AddLessonDialog:Kn,CoursePlayer:Lp,CourseSidebar:Dp,CreateCourseDialog:aa},Symbol.toStringTag,{value:"Module"}));export{tx as C,sx as J,el as P,rl as a,lr as u};
