import{r as d,j as e,i as Ki,e as Pe,z as L,a as si}from"./react-vendor-UYnqoc53.js";import{u as ni}from"./feature-chats-DsVJGdS1.js";import{u as Z,a as oe}from"./feature-admin-D0NNr8sf.js";import{d as t,aM as _i,a$ as Gi,g as He,b0 as Ee,b1 as Vi,o as ue,P as li,aK as je,aL as di,K as ci,b2 as Ji,q as pi,X as Wi,aj as Ye,b3 as ui,a4 as Ke,e as Qi,C as Xi,b as mi,b4 as Fe,at as hi,_ as Ui,b5 as gi,G as bi,ap as fi,b6 as xi,m as Zi,a1 as ea,Z as ia,b7 as aa}from"./ui-vendor-DFyM_Xd9.js";import{d as De}from"./vendor-CRWlb9wI.js";import{M as ta,B as oa,a as ra,f as vi,g as sa,b as na,v as la,l as da,d as ca,u as pa,c as ua,e as yi,r as ma,C as ha,h as ga}from"./feature-content-DeOnU20_.js";import{S as ki,C as ba,U as we}from"./feature-arena-BvqxMZzZ.js";import{M as fa,a as xa,b as va,c as ya,d as ka,e as Ta,P as Ti,A as J,F as wa,g as _e,n as Da,o as Pa}from"./feature-app-ICtyfBrQ.js";import{u as wi,P as ja,a as Sa}from"./feature-courses-Blusa5xA.js";import{i as Di}from"./app-vendor-DTdcG8Is.js";const Pi=d.createContext(),Ca=()=>{const a=d.useContext(Pi);if(!a)throw new Error("useTheme must be used within a ThemeProvider");return a},Rr=({children:a})=>{const[o,s]=d.useState(()=>localStorage.getItem("theme")||"dark");d.useEffect(()=>{document.documentElement.setAttribute("data-theme",o),localStorage.setItem("theme",o)},[o]);const i=w=>{s(w)},n={dark:{name:"Dark",colors:{primary:"#5865f2",background:"#36393f",secondary:"#2f3136",tertiary:"#202225",text:"#dcddde",textSecondary:"#b9bbbe",textMuted:"#72767d",border:"#40444b",hover:"rgba(255, 255, 255, 0.1)",active:"rgba(88, 101, 242, 0.1)",success:"#43b581",warning:"#faa61a",danger:"#f04747",input:"#40444b",placeholder:"#72767d"}},light:{name:"Light",colors:{primary:"#5865f2",background:"#ffffff",secondary:"#f2f3f5",tertiary:"#e3e5e8",text:"#2e3338",textSecondary:"#4f5660",textMuted:"#747f8d",border:"#e3e5e8",hover:"rgba(0, 0, 0, 0.05)",active:"rgba(88, 101, 242, 0.1)",success:"#3ba55c",warning:"#faa61a",danger:"#ed4245",input:"#ebedef",placeholder:"#747f8d"}}},m=n[o]||n.dark;return e.jsx(Pi.Provider,{value:{theme:o,currentTheme:m,themes:n,toggleTheme:i},children:a})},za={back:"Back",loading:"Loading...",save:"Save",saving:"Saving...",send:"Send",edit:"Edit",delete:"Delete",cancel:"Cancel",create:"Create",activate:"Activate",contact:"Contact",global:"Global",status:"Status",active:"Active",author:"Author",course:"Course",like:"like",views:"views",userFallback:"User",you:"You",message:"Message",actions:"Actions"},qa={feed:"Posts",blogs:"Blogs",chats:"Chats",courses:"Courses",profile:"My profile",admin:"Admin"},La={dark:"Dark",light:"Light"},Ma={uz:"Uzbek",en:"English (US)",ru:"Russian"},Ba={selectMeet:"Select a meet",selectChat:"Select a chat",maximizePane:"Maximize panel",minimizePane:"Minimize panel"},Aa={title:"Install Jamm",subtitle:"Open it faster and use it like a standalone app.",heroTitle:"Launching from the home screen is smoother",heroDescription:"Add Jamm to your home screen to open it faster and without the browser chrome.",later:"Later",install:"Install",showSteps:"Show steps",android:{step1Title:"Tap Install",step1Description:"Your browser will open the install prompt.",step2Title:"Confirm the install",step2Description:"After confirming, Jamm will appear on your home screen like a separate app.",hint:"On Android browsers this uses the native install prompt."},ios:{step1Title:"Open the Share menu",step1Description:"Tap the Share button in Safari or your iOS browser.",step2Title:"Choose Add to Home Screen",step2Description:"Find Add to Home Screen in the actions list.",step3Title:"Tap Add",step3Description:"Jamm will then appear on your home screen like a separate app.",hint:"On iPhone and iPad the install is not automatic and must be done through the Share menu."}},$a={step:"Step {{current}} of {{total}}",skip:"Skip",next:"Next",done:"Done",courses:{searchTitle:"Find courses quickly",searchDescription:"Use search to find the course you need. Both courses and arena items are easy to reach from here.",tabsTitle:"Courses and Arena",tabsDescription:"Switch between your course list and the arena section from these tabs.",createTitle:"Create a new course",createDescription:"Use this button to start your own course.",listTitle:"Course list",listDescription:"Courses you joined or manage appear here. Selecting one opens it on the right.",contentTitle:"Course workspace",contentDescription:"Lessons, videos, assignments and course controls open here for the selected course."},chats:{searchTitle:"Find chats quickly",searchDescription:"Search for users or groups from here. Video meets also live inside this module.",tabsTitle:"Chat sections",tabsDescription:"These tabs switch between private chats, groups and video calls.",privateTabTitle:"Private chats",privateTabDescription:"Your direct conversations and saved messages stay in this tab.",groupsTabTitle:"Groups",groupsTabDescription:"Group chats and their controls are managed from this tab.",videoTabTitle:"Video calls",videoTabDescription:"Created meets and video rooms are listed in this tab.",listTitle:"Chat list",listDescription:"All available conversations appear here. Tap one to open it on the right.",contentTitle:"Chat workspace",contentDescription:"Messages, replies and the composer for the selected chat open in this area."},profile:{entryTitle:"Open your profile from here",entryDescription:"Press the profile avatar button here. The next step will open the profile page automatically.",overviewTitle:"Profile overview",overviewDescription:"Your avatar, stats and main profile sections are grouped here.",editTriggerTitle:"Edit profile button",editTriggerDescription:"At the end of the tour, use this button to open the profile editor.",editDialogTitle:"Edit your profile here",editDialogDescription:"Update your nickname, username, avatar and bio in this dialog.",groupsTabTitle:"Posts tab",groupsTabDescription:"Open your personal posts from this tab.",groupsPaneTitle:"Posts panel",groupsPaneDescription:"Create, edit and browse your posts in this area.",coursesTabTitle:"Courses tab",coursesTabDescription:"Your courses and lessons are available from here.",coursesPaneTitle:"Courses panel",coursesPaneDescription:"Browse your courses here and jump into the course page.",blogsTabTitle:"Blogs tab",blogsTabDescription:"Your blog posts and blog management live in this tab.",blogsPaneTitle:"Blogs panel",blogsPaneDescription:"Create, read and edit your blog posts in this view.",appearanceTabTitle:"Theme tab",appearanceTabDescription:"Use this tab to control how the interface looks.",languageTabTitle:"Language tab",languageTabDescription:"Change the app language from this section.",appearancePaneTitle:"Theme settings",appearancePaneDescription:"Light and dark appearance settings are managed here.",premiumTabTitle:"Jamm Premium",premiumTabDescription:"Premium status, promo codes and profile decorations are here.",supportTabTitle:"Support tab",supportTabDescription:"Help and support contacts are available here.",favoritesTabTitle:"Favorites tab",favoritesTabDescription:"Your liked lessons, posts and blogs are collected here.",premiumPaneTitle:"Premium panel",premiumPaneDescription:"Manage plans, promo codes and profile decorations from this panel."}},Ra={lessons:"Lessons",tabs:{courses:"Courses",arena:"Arena"},arena:{testsTitle:"Tests",testsDescription:"Practice open tests",flashcardsTitle:"Flashcards",flashcardsDescription:"Memorize vocabulary",sentencesTitle:"Sentence builder",sentencesDescription:"Build sentences from pieces",mnemonicsTitle:"Mnemonics",mnemonicsDescription:"Memorize number sequences",battlesTitle:"Knowledge battles",battlesDescription:"Real-time competition"},searchPlaceholder:"Search courses...",createTitle:"Create new course",emptyTitle:"No courses yet",emptyDescription:"Press + to create a new course",allShown:"All courses are shown.",lessonCount:"{{count}} lessons",noLessons:"No lessons yet",deleteAction:"Delete course",deleteError:"Failed to delete the course",deleteTitle:"Delete course",deleteDescription:"Are you sure you want to delete <bold>{{name}}</bold>? This action cannot be undone and all related videos, files, and data will be removed.",deleteConfirm:"Yes, delete",deleteConfirmLoading:"Deleting...",deleteCancel:"Cancel",status:{admin:"Admin",approved:"Member",pending:"Pending"}},Ha={searchPlaceholder:"Search chats...",createGroup:"Create group",createMeet:"New meet",tabs:{private:"Private",groups:"Groups",video:"Video"},filters:{all:"All",today:"Today",week:"Week"},search:{startMessage:"Start typing a message...",notFound:"Nothing found",groupMeta:"{{count}} members"},meets:{untitled:"Untitled meet",notFound:"Meet not found",empty:"No meets yet",admin:"Admin",participant:"Participant"},delete:"Delete",allShown:"All conversations are shown.",online:"{{count}} online",timeAgo:{now:"now",minutes:"{{count}} min ago",hours:"{{count}} hr ago",days:"{{count}} days ago"}},Ea={searchPlaceholder:"Search blogs...",createTitle:"New blog",notFound:"Blog not found.",selectToRead:"Select a blog to read.",backToList:"Blogs",noExcerpt:"No description",author:"Author",comments:"comments",coverClose:"Close cover image"},Fa={errors:{deleteLesson:"Failed to delete the lesson",formatNotSupported:"Your browser does not support this video format (for example, .mov may not play directly in Chrome).",playback:"An error occurred while starting the video.",playbackToken:"Could not get permission to load the video.",hlsUnsupported:"Your browser does not support HLS playback.",hlsPlayback:"An error occurred while playing the HLS video.",chatCreate:"Error: failed to create chat"},empty:{title:"Select a course",description:"Choose a course from the list on the left or create a new one."},speed:{title:"Speed",normal:"Normal (1x)"},tabs:{comments:"Comments",homework:"Homework",attendance:"Attendance",grading:"Grading"},meta:{lesson:"Lesson {{index}}: {{title}}",views:"views",likes:"likes"},description:{title:"About this lesson",more:"Show more",less:"Show less"},extras:{title:"Lesson extras",description:"Open materials, tests, and homework here."},attendance:{title:"Attendance",adminHint:"Manage student attendance for this lesson",studentHint:"Watching at least 70% of the lesson marks attendance",present:"Present",late:"Late",absent:"Absent",progress:"{{percent}}% watched",empty:"No approved students yet",noRecord:"No attendance has been recorded for you yet",status:{present:"Present",late:"Late",absent:"Absent"}},homework:{title:"Homework",adminHint:"Create the task and review student submissions",studentHint:"Submit your response in the required format",typeLabel:"Homework type",types:{text:"Text",audio:"Audio",video:"Video",pdf:"PDF",photo:"Photo"},fields:{title:"Homework title",description:"Task description",score:"Score",feedback:"Comment / feedback",answer:"Write your answer",link:"Additional link (optional)",file:"Upload file",note:"Short note (optional)"},fileHint:"Upload a {{type}} file (max {{size}}MB)",fileUploaded:"File uploaded",uploading:"Uploading...",deadline:"Deadline",noDeadline:"Not set",maxScore:"Maximum score",submissions:"Submissions",save:"Save",createDialogTitle:"New homework",editDialogTitle:"Edit homework",dialogSubtitle:"Set the task type, deadline, and maximum score.",addAnother:"Add another task",delete:"Delete task",disable:"Disable",submit:"Submit",resubmit:"Resubmit",review:"Mark as reviewed",needsRevision:"Request revision",alreadySubmitted:"This task has already been submitted. You can submit again only if the teacher requests revision.",disabled:"Homework is not enabled for this lesson yet",disabledStudent:"No homework was assigned for this lesson",emptySubmissions:"No one has submitted anything yet",statusLabel:"Status",scoreLabel:"Score",status:{submitted:"Submitted",reviewed:"Reviewed",needs_revision:"Needs revision"},errors:{fileOrLinkRequired:"Provide a file or a link",textOrLinkRequired:"Provide text or a link",saveFirst:"Save the task first",limitReached:"This plan allows up to {{count}} homework task(s) per lesson",textTooLong:"Homework text must not exceed {{count}} characters",linkTooLong:"Link must not exceed {{count}} characters",invalidFileType:"Invalid file type selected for {{type}}",fileTooLarge:"{{type}} file must not exceed {{size}}MB"},assignmentLabel:"Task {{index}}",emptyAssignments:"No tasks added yet",collapse:"Collapse homework",expand:"Expand homework"},materials:{title:"Lesson materials",adminHint:"Attach PDF materials to this lesson",studentHint:"Open the lesson PDFs attached here",add:"Add PDF",empty:"No materials added yet",dialogTitle:"New material",dialogSubtitle:"Attach a PDF file only.",uploadError:"Failed to upload material",deleteError:"Failed to delete material",fields:{title:"Material title",titlePlaceholder:"Example: Lesson slides",file:"PDF file"},collapse:"Collapse materials",expand:"Expand materials"},grading:{title:"Grading",adminHint:"See lesson grading and the overall course status of students",studentHint:"See your lesson and course performance",lessonSection:"Current lesson",courseSection:"Overall course status",averageScore:"Average score",excellent:"Excellent",homeworkDone:"Homework done",attendanceMarked:"Attendance marked",totalStudents:"Students",totalLessons:"Lessons",needAttention:"Need attention",student:"Student",attendance:"Attendance",attendanceRate:"Attendance %",homework:"Homework",oral:"Oral",oralScore:"0-100 score",oralNote:"Oral Q&A note",oralSaved:"Oral assessment saved",oralSaveError:"Failed to save oral assessment",score:"Score",status:"Status",notEnabled:"Not enabled",progressValue:"{{percent}}% watched",presentValue:"{{present}}/{{total}} present",homeworkState:{submitted:"Submitted",reviewed:"Reviewed",needs_revision:"Needs revision",missing:"Missing"},performance:{excellent:"Excellent",good:"Good",average:"Average",needs_attention:"Needs attention",no_activity:"No activity"},empty:"No grading data yet"},adminPane:{title:"Lesson management",subtitle:"All lessons, students, and statistics in one place",currentLesson:"Current lesson",lessonNumber:"Lesson {{index}}",published:"Published",addLesson:"New lesson",publish:"Publish",deleteLesson:"Delete lesson",totalLessons:"Total lessons",students:"Students",noPending:"No pending students",tabs:{tests:"Tests",homework:"Homework",attendance:"Attendance",grading:"Grading",members:"Students"}},lessonTests:{title:"Lesson tests",adminHint:"Attach an Arena test or sentence-builder link and define the unlock rule",studentHint:"{{count}} / {{total}} tests completed",add:"Add test",limitReached:"Only one test can be linked to a lesson",edit:"Edit test",delete:"Delete test",saved:"Lesson test saved",deleted:"Lesson test deleted",saveError:"Failed to save the lesson test",deleteError:"Failed to delete the lesson test",loadError:"Failed to load the test",submitError:"Failed to save the test result",passed:"Test completed successfully",failed:"Result {{score}}%. At least {{minimum}}% is required",completed:"Completed",required:"Required",resultsShown:"Results are shown",resultsHidden:"Results are hidden",requiredToggle:"Unlock: {{value}}",unlockRequiredShort:"required",unlockOptionalShort:"optional",latestScoreMeta:"Latest {{score}}%, attempts {{attempts}}",typeTest:"Test",typeSentenceBuilder:"Sentence builder",minScoreMeta:"Min {{score}}%",timeLimitMeta:"{{count}} min",noTimeLimit:"No time limit",retry:"Retry",start:"Start",openArena:"Open in Arena",emptyAdmin:"No test is attached to this lesson",emptyStudent:"There is no test for this lesson",collapse:"Collapse tests",expand:"Expand tests",newDialogTitle:"Add lesson test",editDialogTitle:"Edit lesson test",dialogSubtitle:"Paste an Arena test URL, test share-link URL, or sentence-builder URL.",urlLabel:"Test URL",urlPlaceholder:"https://.../arena/quiz/... or /arena/sentence-builder/...",minimumScoreLabel:"Minimum score (%)",timeLimitLabel:"Time (minutes)",showResultsLabel:"Show results",showResultsOn:"Show",showResultsOff:"Hide",unlockRuleLabel:"Next lesson unlock rule",unlockRequired:"Required to unlock next lesson",unlockOptional:"Optional extra test",deleteConfirmTitle:"Delete lesson test",deleteConfirmDescription:"Do you want to remove this lesson-test link?",builderBack:"Back to lesson",builderProgress:"Question {{current}} / {{total}}",builderPromptTitle:"Prompt",builderAnswerTitle:"Your answer",builderPoolTitle:"Tokens",builderComposeHint:"Build the sentence by tapping the tokens",builderCheck:"Check",builderChecking:"Checking...",builderNext:"Next question",builderFinish:"Finish",builderCorrect:"Correct answer",builderWrong:"There is a mistake",builderExpected:"Expected answer",builderCorrectCount:"Correct answers",builderTotalCount:"Total questions",builderAccuracy:"Score",builderQuestionLabel:"Question {{number}}",builderNoBreakdown:"Detailed answers are hidden for this test.",lockedTitle:"Complete the test first",lockedDescription:"You need to pass the required test from the previous lesson before opening the next lesson."},locked:{noLessonsTitle:"No lessons added yet",noLessonsAdmin:"Press the + button on the right to add a lesson.",noLessonsUser:"Lessons will be added soon.",draftTitle:"Draft lesson",draftDescription:"This lesson has not been published yet.",draftAdminDescription:"This lesson is still a draft. Attach media and publish it, or continue editing.",missingMediaTitle:"No media attached",missingMediaDescription:"A video or file is not ready for this lesson yet.",missingMediaAdminDescription:"The lesson exists, but no video or file has been attached yet.",pendingTitle:"Request sent",enrollTitle:"Enroll in the course",pendingDescription:"Your request is being reviewed by the admin. Please wait.",enrollDescription:"You need to enroll first to watch the lessons. You can view them after the admin approves your request."},playlist:{count:"{{count}} lessons",draft:"Draft",free:"Free",edit:"Edit"},creator:{author:"Author",students:"{{count}} students"},actions:{manage:"Manage",pending:"Pending",cancel:"Cancel",enrolled:"Enrolled",buy:"Buy: {{price}} UZS",enroll:"Enroll",approve:"Approve",reject:"Reject",remove:"Remove"},members:{pendingTitle:"Pending ({{count}})",pending:"Pending",approvedTitle:"Members ({{count}})",empty:"No members yet",approved:"Approved"},deleteLesson:{title:"Delete lesson",description:"Are you sure you want to delete this lesson? Any attached video will also be removed.",confirm:"Yes, delete",confirmLoading:"Deleting...",cancel:"Cancel"}},Oa={title:"Create new course",imageChange:"Change image",imagePrompt:"Enter an image URL for the course",imageUrl:"Image URL (optional)",name:"Course name *",namePlaceholder:"Example: React Basics",category:"Category",categories:{it:"IT & Programming",smm:"SMM & Marketing",language:"Language learning",mobile:"Mobile development",design:"Design"},accessType:"Access type",access:{freeRequest:"Request access (free)",freeOpen:"Open access (free)",paid:"Paid"},price:"Price (UZS)",pricePlaceholder:"Example: 500000",description:"Description",descriptionPlaceholder:"Short info about the course...",error:"Failed to create the course",creating:"Creating..."},Na={title:"Add new lesson",editTitle:"Edit lesson",createSubtitle:"Create the lesson as a draft first. You can attach the video or file later.",editSubtitle:"Update the lesson details and publish it when ready.",draftNotice:"This lesson is currently a draft. Publish it to make it visible to students.",lessonName:"Lesson name *",lessonNamePlaceholder:"Example: React Hooks basics",source:"Video/File source *",uploadTab:"Upload file (Max 200MB)",youtubeTab:"YouTube URL",premiumNotice:"Premium is required for file uploads. On the free plan you can only add video through a YouTube URL.",fileLabel:"Video/File *",fileDropTitle:"Upload a file or drop it here",fileDropMeta:"MP4, WEBM, MOV (total up to 200MB)",multiFileCount:"{{count}} videos selected",videoNameLabel:"Video {{index}} title",videoNamePlaceholder:"Enter a video title",videoCountLimitHint:"You can upload up to {{count}} video(s) to one lesson.",videoCountLimitError:"This plan allows up to {{count}} video(s) per lesson",totalUploadLimitError:"Total uploaded videos for one lesson must not exceed 200MB",processing:"Processing video...",savingLesson:"Saving lesson...",uploading:"Uploading...",preparing:"Preparing",processingMeta:"The file reached the server and is now being split into HLS segments.",savingMeta:"Saving final data.",youtubeLabel:"YouTube Video URL *",optionalMediaHint:"Media is optional while saving a draft.",description:"Description (optional)",descriptionPlaceholder:"Short info about the lesson...",processingShort:"Processing...",savingShort:"Saving...",sending:"Sending...",createDraft:"Create draft",saveDraft:"Save draft",saveChanges:"Save changes",publish:"Publish",saveAndPublish:"Save and publish",submit:"Add",uploadError:"Upload failed",publishError:"Failed to publish the lesson"},Ia={title:"Create Group Video Call",subtitle:"Enter a title, choose privacy, and create a meet quickly.",heroTitle:"Create a meet quickly",heroDescription:"A link appears after creation. If public, people join instantly; if private, they join after approval.",detailsTitle:"Meet details",detailsDescription:"Enter the room name and a short note.",name:"Room name",namePlaceholder:"Example: Frontend sprint review",description:"Short note",descriptionPlaceholder:"What is today’s call about?",privacyTitle:"Who can join?",privacyPrivateHint:"Only people you approve can enter",privacyPublicHint:"Anyone with the link can join immediately",publicBadge:"Public",publicTitle:"Open to everyone",publicDescription:"Anyone with the link joins immediately.",privateBadge:"Private",privateTitle:"Approval required",privateDescription:"People wait first, then you approve them.",footerNote:"After creation you will see the meet in the sidebar.",create:"Create meet"},Ya={guest:"Guest",roomDefault:"Meet",localSuffix:" (You)",privateBadge:"Private",recording:"REC",open:"Open",minimize:"Minimize",copied:"Copied!",copyLink:"Link",participants:"{{count}} participants",privateRoom:"private room",publicRoom:"public room",minimizeTitle:"Minimize meet",close:"Close",connecting:"Connecting…",waiting:"Waiting for approval…",waitingDescription:"Wait until the call host approves your request",rejected:"Rejected",rejectedDescription:"The call host rejected your request",members:"Members ({{count}})",waitingMembers:"Waiting ({{count}})",joinedMembers:"Joined ({{count}})",cameraOff:"Camera off"},Ka={titleFallback:"Private call",calling:"Call in progress",localLabel:"You",remoteLabel:"Participant",screenShareLabel:"Screen share"},_a={title:"Mnemonics",description:"Only the best result is saved and shown in the ranking.",modes:{digits:"Digits",words:"Words"},numbers:{title:"Numbers"},words:{title:"Words"},fields:{digitsToMemorize:"Digits to Memorize:",wordsToMemorize:"Words to Memorize:",maxMemorizationTime:"Maximum Memorization Time:",maxRecallTime:"Maximum Recall Time:",autoAdvanceTotalTime:"Auto Advance Total Time:",optional:"Optional"},stage:{memorizationStartsIn:"Memorization starts in",memorizationEndsIn:"Memorization ends in",recallStartsIn:"Recall starts in",recallEndsIn:"Recall ends in",score:"Score",time:"Time",completed:"Completed",done:"Done"},actions:{start:"Start",skip:"Skip",finished:"Finished",continue:"Continue",clear:"Clear"},leaderboard:{title:"Leaderboard",sorting:"Higher score, lower time",yourBest:"Your best result",loading:"Loading leaderboard...",empty:"No results yet."},secondsShort:"sec",setupHintDigits:"The digit count can be from 1 to {{count}}. Only the best result is saved.",setupHintWords:"The word count can be from 1 to {{count}}. The prepared noun pool contains {{total}} words. Only the best result is saved."},Ga={shareLinks:{subtitle:"Short links for `{{itemTitle}}`",limit:"Total limit",persistLabel:"Save result",persist:"Save",persistHint:"Sent to teacher",ephemeral:"Do not save",ephemeralHint:"Student only",groupName:"Group name",groupPlaceholder:"Example: g12",showResults:"Final result",showResultsOn:"Show",showResultsOnHint:"Visible to student",showResultsOff:"Hide",showResultsOffHint:"Teacher only",timeLimit:"Time limit",timeLimitPlaceholder:"0 = unlimited",creating:"Creating...",limitReached:"Limit reached",create:"Create link",previousLinks:"Previous links",empty:"No links created yet.",persistedDefault:"Result is saved",ephemeralDefault:"Result is not saved",resultShown:"shown",resultHidden:"hidden",result:"Result",time:"Time",minutes:"{{count}} minutes",unlimited:"unlimited"},results:{searchPlaceholder:"Search...",allGroups:"All groups",unknownUser:"User",noGroup:"-",reportTitle:"Report",resultsSuffix:"results",filteredReport:"Filtered report",submitted:"Submitted",mastery:"Mastery",easiest:"Easiest question",hardest:"Hardest question",student:"Student",group:"Group",date:"Date",total:"Total",percent:"Percent",filteredCount:"Filtered submissions",average:"Average score",allResults:"All results",empty:"No results found for this filter.",questionCount:"{{count}} questions",yourSentence:"Your sentence",correctAnswer:"Correct answer",selectedAnswer:"Selected answer",noData:"No data yet",question:"Question",correct:"Correct",wrong:"Wrong",nothing:"nothing",extraToken:"extra token",mistakeTemplate:"Part {{position}}: you chose {{actual}}. Correct: {{expected}}.",noAnswer:"No answer",noInfo:"No information"},createBattle:{title:"New battle room",name:"Battle name",namePlaceholder:"Example: Friday battle",testLabel:"Select a test",testPlaceholder:"--- Select a test ---",visibility:"Visibility",public:"Public",unlisted:"Unlisted",emptyTests:"No tests found yet. If you created one, the list may still be refreshing.",publicInfo:"This room is open to everyone and appears in the Active Battles list.",unlistedInfo:"This room does not appear in the list. Only people with the room ID can join.",create:"Create room"}},Va={title:"Posts",tabs:{forYou:"For you",following:"Following"},composePlaceholder:"Share your thoughts…",emptyFollowing:"You will see posts from users you follow",emptyForYou:"No posts yet. Be the first!",allShown:"All posts are shown.",editPost:"Edit",deletePost:"Delete",editTitle:"Edit post",createTitle:"New post",deleteTitle:"Delete post",deleteDescription:"If this post is deleted, it cannot be restored."},Ja={title:"Comments",allShown:"All comments are shown.",empty:"No comments yet. Be the first to write one!",reply:"Reply",replyingTo:"Reply",replyPlaceholder:"Reply to @{{name}}...",commentPlaceholder:"Write a comment..."},Wa={avatarChange:"Change avatar",bioMissingOwn:"No bio yet. Complete your profile.",bioMissingOther:"No bio added.",following:"Following",follow:"Follow",settings:"Settings",tabs:{groups:"Posts",blogs:"Blogs",courses:"Lessons",appearance:"Theme",language:"Language",premium:"Jamm Premium",support:"Support",favorites:"Favorites"},stats:{members:"Members",posts:"Posts",blogs:"Blogs",courses:"Lessons"}},Qa={sections:{appearance:{title:"Theme",description:"Control the interface appearance."},language:{title:"Language",description:"Manage language and region settings."},premium:{title:"Jamm Premium",description:"Manage premium status, promo code and plans."},support:{title:"Support",description:"Quick contact points for issues and questions."},favorites:{title:"Favorites",description:"A separate section for saved content."}},appearance:{groupTitle:"Appearance",groupDescription:"For now, only the main theme switch is available.",themeLabel:"Theme",themeDescription:"The Jamm interface works in dark or light mode."},language:{groupTitle:"Language and region",groupDescription:"Selected values are stored in local storage.",languageLabel:"Language",languageDescription:"Primary interface language.",regionLabel:"Region",regionDescription:"Global mode is currently used."},premium:{statusTitle:"Premium status",statusDescription:"Current subscription and activation via promo code.",statusLabel:"Status",statusMeta:"Premium status on your profile.",freeAccount:"Standard account",promoLabel:"Promo code",promoDescription:"Enter a code to activate Premium quickly.",promoPlaceholder:"Enter code",checking:"Checking...",activated:"Premium activated",invalidPromo:"Invalid promo code",plansTitle:"Subscription plans",plansDescription:"Premium plans for extra features.",decorationTitle:"Profile decoration",decorationDescription:"Premium subscribers can add an animated decoration after their nickname.",decorationSaved:"Profile decoration updated",decorationCleared:"Profile decoration removed",decorationError:"Failed to save the decoration",decorationNone:"No decoration",decorationNoneMeta:"Only the nickname will be shown.",decorationBadgeMeta:"Shows the official premium badge.",decorationLockedTitle:"Decorations are premium only",decorationLockedDescription:"Animated nickname decorations are available only for premium subscribers.",decorationImageUpload:"Upload a custom decoration image",decorationImageReplace:"Select or replace the custom decoration",decorationImageUploading:"Uploading image...",decorationImageSaved:"Custom decoration image saved",decorationImageError:"Failed to upload the custom decoration image",days:"days",contactPremium:"Contact premium support",plansUnavailable:"Plans are temporarily unavailable."},support:{premiumTitle:"Premium support",premiumDescription:"For questions about subscriptions, promo codes, or limits.",premiumAction:"Message @premium",jammTitle:"Jamm support",jammDescription:"For general technical issues or account problems.",jammAction:"Message @jamm",chatError:"Could not open the chat"},favorites:{lessonsTitle:"Liked lessons",lessonsDescription:"Your favorite lessons are collected here.",lessonsEmpty:"No liked lessons yet.",postsTitle:"Liked posts",postsDescription:"A list of posts you liked.",postsEmpty:"No liked posts yet.",blogsTitle:"Liked blogs",blogsDescription:"Blogs you liked appear here.",blogsEmpty:"No liked blogs yet."}},Xa={title:"Jamm Premium",subtitle:"All limits in one place. Premium unlocks higher caps and a smoother teaching workflow.",limitReachedTitle:"Limit reached",freePlan:"Free plan",freePlanDescription:"Core limits for daily usage.",premiumPlan:"Premium plan",premiumPlanDescription:"More content, more students, and broader lesson control.",columns:{feature:"Limit",free:"Free",premium:"Premium"},sections:{posts:{title:"Posts",description:"Daily post and comment limits."},blogs:{title:"Blogs",description:"Blog creation and content capacity."},groups:{title:"Groups and chat",description:"Group and messaging limits."},meets:{title:"Video calls",description:"Meet creation and participant capacity."},courses:{title:"Courses and lessons",description:"Lesson media, tests, and homework limits."},arena:{title:"Arena",description:"Tests, flashcards, and sentence-builder limits."},profile:{title:"Profile",description:"Profile field and account-related limits."}},items:{postsPerDay:"Posts per day",postCommentsPerPost:"Comments per post",postWords:"Post text",postCommentChars:"Comment length",blogsPerUser:"Blogs",blogCommentsPerBlog:"Comments per blog",blogImagesPerBlog:"Blog images",blogWords:"Blog text",blogTitleChars:"Blog title",blogExcerptChars:"Short description",blogTagChars:"Tag capacity",blogCommentChars:"Blog comment",groupsCreated:"Groups created",groupsJoined:"Groups joined",messageChars:"Message length",groupNameChars:"Group name",groupDescriptionChars:"Group description",meetsCreated:"Meets",meetParticipants:"Meet participants",meetTitleChars:"Meet title",meetDescriptionChars:"Meet description",coursesCreated:"Courses",lessonsPerCourse:"Lessons per course",lessonVideosPerLesson:"Videos per lesson",lessonMediaBytes:"Lesson media size",lessonTestsPerLesson:"Tests per lesson",lessonHomeworkPerLesson:"Homework per lesson",homeworkTextChars:"Homework text",homeworkLinkChars:"Homework link",homeworkPhotoBytes:"Homework photo size",homeworkAudioBytes:"Homework audio size",homeworkVideoBytes:"Homework video size",homeworkPdfBytes:"Homework PDF size",courseNameChars:"Course title",courseDescriptionChars:"Course description",lessonTitleChars:"Lesson title",lessonDescriptionChars:"Lesson description",testsCreated:"Tests",testShareLinksPerTest:"Share links per test",testTitleChars:"Test title",testDescriptionChars:"Test description",testQuestionChars:"Question length",testOptionChars:"Option length",flashcardsCreated:"Flashcard decks",flashcardSideChars:"Flashcard side",sentenceBuildersCreated:"Sentence-builder decks",sentenceBuilderShareLinksPerDeck:"Share links per sentence-builder",sentenceBuilderPromptChars:"Sentence-builder prompt",sentenceBuilderAnswerChars:"Sentence-builder answer",nicknameChars:"Nickname",usernameChars:"Username",bioChars:"Bio"},words:"{{count}} words",chars:"{{count}} chars",footerNote:"Some limits are total size caps, while others are counted per lesson or per post.",upgrade:"Open premium section"},Ua={dashboard:{welcomeTitle:"Welcome to the knowledge arena!",welcomeDescription:"Choose a section from the menu on the left: solve tests, memorize vocabulary, or compete with friends."}},Za={common:za,navigation:qa,theme:La,language:Ma,layout:Ba,installPrompt:Aa,featureTour:$a,courseSidebar:Ra,chatsSidebar:Ha,blogs:Ea,coursePlayer:Fa,createCourse:Oa,addLesson:Na,meetDialog:Ia,groupCall:Ya,privateCall:Ka,mnemonics:_a,arenaShared:Ga,feed:Va,comments:Ja,profile:Wa,profileUtility:Qa,premiumModal:Xa,arena:Ua},et={back:"Назад",loading:"Загрузка...",save:"Сохранить",saving:"Сохранение...",send:"Отправить",edit:"Редактировать",delete:"Удалить",cancel:"Отмена",create:"Создать",activate:"Активировать",contact:"Контакт",global:"Глобально",status:"Статус",active:"Активен",author:"Автор",course:"Курс",like:"like",views:"просмотров",userFallback:"Пользователь",you:"Вы",message:"Сообщение",actions:"Действия"},it={feed:"Посты",blogs:"Блоги",chats:"Чаты",courses:"Курсы",profile:"Мой профиль",admin:"Админ"},at={dark:"Тёмная",light:"Светлая"},tt={uz:"Узбекский",en:"Английский (US)",ru:"Русский"},ot={selectMeet:"Выберите meet",selectChat:"Выберите чат",maximizePane:"Развернуть панель",minimizePane:"Свернуть панель"},rt={title:"Установите Jamm",subtitle:"Открывайте быстрее и используйте как отдельное приложение.",heroTitle:"С главного экрана открывать удобнее",heroDescription:"Добавьте Jamm на главный экран, чтобы он открывался быстрее и без панели браузера.",later:"Позже",install:"Установить",showSteps:"Как установить",android:{step1Title:"Нажмите «Установить»",step1Description:"Браузер откроет системное окно установки.",step2Title:"Подтвердите установку",step2Description:"После подтверждения Jamm появится на главном экране как отдельное приложение.",hint:"На Android это работает через встроенный install prompt браузера."},ios:{step1Title:"Откройте меню Share",step1Description:"Нажмите кнопку Share в Safari или другом браузере iOS.",step2Title:"Выберите Add to Home Screen",step2Description:"Найдите пункт Add to Home Screen в списке действий.",step3Title:"Нажмите Add",step3Description:"После этого Jamm появится на главном экране как отдельное приложение.",hint:"На iPhone и iPad установка не автоматическая и выполняется через меню Share."}},st={step:"Шаг {{current}} из {{total}}",skip:"Пропустить",next:"Далее",done:"Готово",courses:{searchTitle:"Быстрый поиск курсов",searchDescription:"Ищите нужный курс по названию. Отсюда также удобно переходить к разделам арены.",tabsTitle:"Курсы и Арена",tabsDescription:"Эти вкладки позволяют быстро переключаться между курсами и ареной.",createTitle:"Создать новый курс",createDescription:"Через эту кнопку вы можете открыть свой курс.",listTitle:"Список курсов",listDescription:"Здесь находятся курсы, где вы участник или администратор. При выборе курс откроется справа.",contentTitle:"Окно курса",contentDescription:"Для выбранного курса здесь открываются уроки, видео, задания и панель управления."},chats:{searchTitle:"Быстрый поиск чатов",searchDescription:"Отсюда можно искать пользователей и группы. Видеозвонки тоже находятся внутри этого модуля.",tabsTitle:"Разделы чатов",tabsDescription:"Эти вкладки переключают личные чаты, группы и видеозвонки.",privateTabTitle:"Личные чаты",privateTabDescription:"Здесь находятся личные диалоги и сохранённые сообщения.",groupsTabTitle:"Группы",groupsTabDescription:"Групповые чаты и их управление находятся в этой вкладке.",videoTabTitle:"Видеозвонки",videoTabDescription:"Созданные meet-комнаты и видеокомнаты отображаются здесь.",listTitle:"Список чатов",listDescription:"Здесь отображаются все доступные диалоги. Выберите один, чтобы открыть его справа.",contentTitle:"Окно чата",contentDescription:"Сообщения, ответы и поле ввода для выбранного чата открываются в этой области."},profile:{entryTitle:"Переход в профиль отсюда",entryDescription:"Нажмите на кнопку аватара профиля. На следующем шаге страница профиля откроется автоматически.",overviewTitle:"Обзор профиля",overviewDescription:"Здесь собраны аватар, статистика и основные разделы профиля.",editTriggerTitle:"Кнопка редактирования профиля",editTriggerDescription:"В конце тура именно эта кнопка откроет окно редактирования профиля.",editDialogTitle:"Здесь редактируется профиль",editDialogDescription:"В этом окне меняются nickname, username, avatar и bio.",groupsTabTitle:"Вкладка постов",groupsTabDescription:"Через эту вкладку открываются ваши посты.",groupsPaneTitle:"Панель постов",groupsPaneDescription:"Здесь можно создавать, редактировать и просматривать свои посты.",coursesTabTitle:"Вкладка курсов",coursesTabDescription:"Здесь находятся ваши курсы и уроки.",coursesPaneTitle:"Панель курсов",coursesPaneDescription:"Отсюда можно открыть курс и перейти на его страницу.",blogsTabTitle:"Вкладка блогов",blogsTabDescription:"Публикации блога и управление ими находятся здесь.",blogsPaneTitle:"Панель блогов",blogsPaneDescription:"В этом окне можно создавать, читать и редактировать блоги.",appearanceTabTitle:"Вкладка темы",appearanceTabDescription:"Через неё управляется внешний вид интерфейса.",languageTabTitle:"Вкладка языка",languageTabDescription:"Здесь меняется язык приложения.",appearancePaneTitle:"Настройки темы",appearancePaneDescription:"Здесь находятся настройки светлой и тёмной темы.",premiumTabTitle:"Jamm Premium",premiumTabDescription:"Статус премиума, промокоды и украшения профиля находятся здесь.",supportTabTitle:"Вкладка поддержки",supportTabDescription:"Здесь находятся помощь и контакты поддержки.",favoritesTabTitle:"Вкладка избранного",favoritesTabDescription:"Здесь собираются понравившиеся уроки, посты и блоги.",premiumPaneTitle:"Панель Premium",premiumPaneDescription:"Здесь можно управлять тарифами, промокодами и украшениями профиля."}},nt={lessons:"Уроки",tabs:{courses:"Курсы",arena:"Арена"},arena:{testsTitle:"Тесты",testsDescription:"Решать открытые тесты",flashcardsTitle:"Флеш-карточки",flashcardsDescription:"Запоминать слова",sentencesTitle:"Составление предложений",sentencesDescription:"Собирать предложения из частей",mnemonicsTitle:"Мнемоника",mnemonicsDescription:"Запоминание чисел",battlesTitle:"Битва знаний",battlesDescription:"Соревнование в реальном времени"},searchPlaceholder:"Поиск курсов...",createTitle:"Создать новый курс",emptyTitle:"Пока нет курсов",emptyDescription:"Нажмите +, чтобы создать новый курс",allShown:"Показаны все курсы.",lessonCount:"{{count}} уроков",noLessons:"Уроков пока нет",deleteAction:"Удалить курс",deleteError:"Не удалось удалить курс",deleteTitle:"Удалить курс",deleteDescription:"Вы уверены, что хотите удалить курс <bold>{{name}}</bold>? Это действие нельзя отменить, и все связанные видео, файлы и данные будут удалены.",deleteConfirm:"Да, удалить",deleteConfirmLoading:"Удаление...",deleteCancel:"Отмена",status:{admin:"Admin",approved:"Участник",pending:"Ожидает"}},lt={searchPlaceholder:"Поиск чатов...",createGroup:"Создать группу",createMeet:"Новый meet",tabs:{private:"Личные",groups:"Группы",video:"Video"},filters:{all:"Все",today:"Сегодня",week:"Неделя"},search:{startMessage:"Начните писать сообщение...",notFound:"Ничего не найдено",groupMeta:"{{count}} участников"},meets:{untitled:"Без названия",notFound:"Meet не найден",empty:"Пока нет ни одного meet",admin:"Admin",participant:"Участник"},delete:"Удалить",allShown:"Показаны все диалоги.",online:"{{count}} online",timeAgo:{now:"сейчас",minutes:"{{count}} мин назад",hours:"{{count}} ч назад",days:"{{count}} дн назад"}},dt={searchPlaceholder:"Поиск блогов...",createTitle:"Новый блог",notFound:"Блог не найден.",selectToRead:"Выберите блог для чтения.",backToList:"Блоги",noExcerpt:"Нет описания",author:"Автор",comments:"комментарии",coverClose:"Закрыть обложку"},ct={errors:{deleteLesson:"Не удалось удалить урок",formatNotSupported:"Ваш браузер не поддерживает этот формат видео (например, .mov может не воспроизводиться напрямую в Chrome).",playback:"Произошла ошибка при запуске видео.",playbackToken:"Не удалось получить доступ к загрузке видео.",hlsUnsupported:"Ваш браузер не поддерживает HLS.",hlsPlayback:"Произошла ошибка при воспроизведении HLS-видео.",chatCreate:"Ошибка: не удалось создать чат"},empty:{title:"Выберите курс",description:"Выберите курс из списка слева или создайте новый."},speed:{title:"Скорость",normal:"Обычная (1x)"},tabs:{comments:"Комментарии",homework:"Домашнее задание",attendance:"Посещаемость",grading:"Оценивание"},meta:{lesson:"Урок {{index}}: {{title}}",views:"просмотры",likes:"лайки"},description:{title:"Об уроке",more:"Показать больше",less:"Скрыть"},extras:{title:"Дополнения к уроку",description:"Открывайте материалы, тест и домашнее задание здесь."},attendance:{title:"Посещаемость",adminHint:"Управляйте посещаемостью студентов по этому уроку",studentHint:"Просмотр не менее 70% урока фиксирует посещаемость",present:"Присутствовал",late:"Опоздал",absent:"Отсутствовал",progress:"Просмотрено {{percent}}%",empty:"Пока нет одобренных студентов",noRecord:"Для вас посещаемость пока не зафиксирована",status:{present:"Присутствовал",late:"Опоздал",absent:"Отсутствовал"}},homework:{title:"Домашнее задание",adminHint:"Создайте задание и проверяйте ответы студентов",studentHint:"Отправьте ответ в нужном формате",typeLabel:"Тип задания",types:{text:"Текст",audio:"Аудио",video:"Видео",pdf:"PDF",photo:"Фото"},fields:{title:"Название задания",description:"Описание задания",score:"Балл",feedback:"Комментарий / feedback",answer:"Напишите свой ответ",link:"Дополнительная ссылка (необязательно)",file:"Загрузить файл",note:"Короткая заметка (необязательно)"},fileHint:"Загрузите файл типа {{type}} (макс. {{size}}MB)",fileUploaded:"Файл загружен",uploading:"Загрузка...",deadline:"Срок",noDeadline:"Не задан",maxScore:"Максимальный балл",submissions:"Сдано",save:"Сохранить",createDialogTitle:"Новое домашнее задание",editDialogTitle:"Редактировать домашнее задание",dialogSubtitle:"Укажите тип задания, срок и максимальный балл.",addAnother:"Добавить ещё задание",delete:"Удалить задание",disable:"Отключить",submit:"Отправить",resubmit:"Отправить повторно",review:"Отметить как проверенное",needsRevision:"Отправить на доработку",alreadySubmitted:"Задание уже отправлено. Повторная отправка доступна только после запроса на доработку.",disabled:"Для этого урока домашнее задание ещё не включено",disabledStudent:"Для этого урока домашнее задание не задано",emptySubmissions:"Пока никто ничего не отправил",statusLabel:"Статус",scoreLabel:"Балл",status:{submitted:"Отправлено",reviewed:"Проверено",needs_revision:"Нужно доработать"},errors:{fileOrLinkRequired:"Добавьте файл или ссылку",textOrLinkRequired:"Добавьте текст или ссылку",saveFirst:"Сначала сохраните задание",limitReached:"На этом тарифе в одном уроке можно создать максимум {{count}} заданий",textTooLong:"Текст домашнего задания не должен превышать {{count}} символов",linkTooLong:"Ссылка не должна превышать {{count}} символов",invalidFileType:"Выбран неверный тип файла для {{type}}",fileTooLarge:"Файл типа {{type}} не должен превышать {{size}}MB"},assignmentLabel:"Задание {{index}}",emptyAssignments:"Задания пока не добавлены",collapse:"Свернуть домашнее задание",expand:"Развернуть домашнее задание"},materials:{title:"Материалы урока",adminHint:"Прикрепите PDF-материалы к этому уроку",studentHint:"Открывайте PDF-материалы урока здесь",add:"Добавить PDF",empty:"Материалы пока не добавлены",dialogTitle:"Новый материал",dialogSubtitle:"Прикрепите только PDF-файл.",uploadError:"Не удалось загрузить материал",deleteError:"Не удалось удалить материал",fields:{title:"Название материала",titlePlaceholder:"Например: Слайды урока",file:"PDF-файл"},collapse:"Свернуть материалы",expand:"Развернуть материалы"},grading:{title:"Оценивание",adminHint:"Смотрите оценку по уроку и общий статус студентов по курсу",studentHint:"Смотрите свой результат по уроку и по курсу",lessonSection:"Текущий урок",courseSection:"Общее состояние по курсу",averageScore:"Средний балл",excellent:"Отлично",homeworkDone:"Сдали задание",attendanceMarked:"Посещаемость отмечена",totalStudents:"Студенты",totalLessons:"Уроки",needAttention:"Нужно внимание",student:"Студент",attendance:"Посещаемость",attendanceRate:"Посещаемость %",homework:"Задание",oral:"Устно",oralScore:"0-100 балл",oralNote:"Заметка по устному ответу",oralSaved:"Устная оценка сохранена",oralSaveError:"Не удалось сохранить устную оценку",score:"Балл",status:"Статус",notEnabled:"Не включено",progressValue:"Просмотрено {{percent}}%",presentValue:"{{present}}/{{total}} присутствовал",homeworkState:{submitted:"Отправлено",reviewed:"Проверено",needs_revision:"Нужно доработать",missing:"Не сдано"},performance:{excellent:"Отлично",good:"Хорошо",average:"Средне",needs_attention:"Нужно внимание",no_activity:"Нет активности"},empty:"Пока нет данных для оценивания"},adminPane:{title:"Управление уроками",subtitle:"Все уроки, студенты и статистика в одном месте",currentLesson:"Текущий урок",lessonNumber:"Урок {{index}}",published:"Опубликовано",addLesson:"Новый урок",publish:"Опубликовать",deleteLesson:"Удалить урок",totalLessons:"Всего уроков",students:"Студенты",noPending:"Нет ожидающих студентов",tabs:{tests:"Тест",homework:"Домашнее задание",attendance:"Посещаемость",grading:"Оценивание",members:"Студенты"}},lessonTests:{title:"Тест урока",adminHint:"Прикрепите ссылку на тест или sentence-builder из Arena и задайте правило открытия",studentHint:"Выполнено тестов: {{count}} / {{total}}",add:"Добавить тест",limitReached:"К уроку можно привязать только один тест",edit:"Редактировать тест",delete:"Удалить тест",saved:"Тест урока сохранён",deleted:"Тест урока удалён",saveError:"Не удалось сохранить тест урока",deleteError:"Не удалось удалить тест урока",loadError:"Не удалось загрузить тест",submitError:"Не удалось сохранить результат теста",passed:"Тест успешно выполнен",failed:"Результат {{score}}%. Для прохождения нужно минимум {{minimum}}%",completed:"Выполнен",required:"Обязательный",resultsShown:"Результат показывается",resultsHidden:"Результат скрыт",requiredToggle:"Открытие: {{value}}",unlockRequiredShort:"обязательно",unlockOptionalShort:"необязательно",latestScoreMeta:"Последний результат {{score}}%, попыток {{attempts}}",typeTest:"Тест",typeSentenceBuilder:"Сборка предложения",minScoreMeta:"Мин {{score}}%",timeLimitMeta:"{{count}} мин",noTimeLimit:"Без ограничения времени",retry:"Повторить",start:"Начать",openArena:"Открыть в Arena",emptyAdmin:"К этому уроку тест не прикреплён",emptyStudent:"Для этого урока теста нет",collapse:"Свернуть тесты",expand:"Развернуть тесты",newDialogTitle:"Добавить тест урока",editDialogTitle:"Редактировать тест урока",dialogSubtitle:"Вставьте ссылку на тест Arena, безопасную share-ссылку или ссылку на sentence-builder.",urlLabel:"Ссылка на тест",urlPlaceholder:"https://.../arena/quiz/... или /arena/sentence-builder/...",minimumScoreLabel:"Минимальный балл (%)",timeLimitLabel:"Время (минуты)",showResultsLabel:"Показывать результат",showResultsOn:"Показывать",showResultsOff:"Скрыть",unlockRuleLabel:"Правило открытия следующего урока",unlockRequired:"Обязателен для открытия следующего урока",unlockOptional:"Просто дополнительный тест",deleteConfirmTitle:"Удалить тест урока",deleteConfirmDescription:"Удалить эту привязку теста к уроку?",builderBack:"Назад к уроку",builderProgress:"Вопрос {{current}} / {{total}}",builderPromptTitle:"Задание",builderAnswerTitle:"Ваш ответ",builderPoolTitle:"Токены",builderComposeHint:"Соберите предложение, нажимая на токены",builderCheck:"Проверить",builderChecking:"Проверка...",builderNext:"Следующий вопрос",builderFinish:"Завершить",builderCorrect:"Ответ верный",builderWrong:"В ответе есть ошибка",builderExpected:"Правильный ответ",builderCorrectCount:"Верных ответов",builderTotalCount:"Всего вопросов",builderAccuracy:"Результат",builderQuestionLabel:"Вопрос {{number}}",builderNoBreakdown:"Подробные ответы для этого теста скрыты.",lockedTitle:"Сначала выполните тест",lockedDescription:"Чтобы открыть следующий урок, нужно пройти обязательный тест из предыдущего урока."},locked:{noLessonsTitle:"Уроки ещё не добавлены",noLessonsAdmin:"Нажмите кнопку + справа, чтобы добавить урок.",noLessonsUser:"Уроки скоро появятся.",draftTitle:"Черновик урока",draftDescription:"Этот урок ещё не опубликован.",draftAdminDescription:"Урок находится в черновике. Прикрепите медиа и опубликуйте его или продолжите редактирование.",missingMediaTitle:"Медиа не прикреплено",missingMediaDescription:"Для этого урока видео или файл пока не готовы.",missingMediaAdminDescription:"Урок создан, но к нему пока не прикреплено видео или файл.",pendingTitle:"Запрос отправлен",enrollTitle:"Запишитесь на курс",pendingDescription:"Ваш запрос рассматривается администратором. Пожалуйста, подождите.",enrollDescription:"Чтобы смотреть уроки, сначала нужно записаться на курс. После одобрения администратора вы получите доступ."},playlist:{count:"{{count}} уроков",draft:"Черновик",free:"Бесплатно",edit:"Редактировать"},creator:{author:"Автор",students:"{{count}} студентов"},actions:{manage:"Управление",pending:"Ожидается",cancel:"Отменить",enrolled:"Вы записаны",buy:"Купить: {{price}} сум",enroll:"Записаться",approve:"Одобрить",reject:"Отклонить",remove:"Удалить"},members:{pendingTitle:"Ожидают ({{count}})",pending:"Ожидает",approvedTitle:"Участники ({{count}})",empty:"Участников пока нет",approved:"Одобрено"},deleteLesson:{title:"Удалить урок",description:"Вы уверены, что хотите удалить этот урок? Если к нему прикреплено видео, оно тоже будет удалено.",confirm:"Да, удалить",confirmLoading:"Удаление...",cancel:"Отмена"}},pt={title:"Создать новый курс",imageChange:"Изменить изображение",imagePrompt:"Введите URL изображения для курса",imageUrl:"URL изображения (необязательно)",name:"Название курса *",namePlaceholder:"Например: Основы React",category:"Категория",categories:{it:"IT и программирование",smm:"SMM и маркетинг",language:"Изучение языков",mobile:"Мобильная разработка",design:"Дизайн"},accessType:"Тип доступа",access:{freeRequest:"По запросу (бесплатно)",freeOpen:"Открытый доступ (бесплатно)",paid:"Платно"},price:"Цена (UZS)",pricePlaceholder:"Например: 500000",description:"Описание",descriptionPlaceholder:"Краткая информация о курсе...",error:"Ошибка при создании курса",creating:"Создание..."},ut={title:"Добавить новый урок",editTitle:"Редактировать урок",createSubtitle:"Сначала создайте урок как черновик. Видео или файл можно прикрепить позже.",editSubtitle:"Обновите данные урока и опубликуйте его, когда всё будет готово.",draftNotice:"Этот урок сейчас в черновике. Опубликуйте его, чтобы он стал виден студентам.",lessonName:"Название урока *",lessonNamePlaceholder:"Например: Основы React Hooks",source:"Источник видео/файла *",uploadTab:"Загрузить файл (макс. 200MB)",youtubeTab:"YouTube URL",premiumNotice:"Для загрузки файла требуется Premium. На бесплатном тарифе можно добавить только YouTube URL.",fileLabel:"Видео/файл *",fileDropTitle:"Загрузите файл или перетащите его сюда",fileDropMeta:"MP4, WEBM, MOV (общий объём до 200MB)",multiFileCount:"Выбрано видео: {{count}}",videoNameLabel:"Название видео {{index}}",videoNamePlaceholder:"Введите название видео",videoCountLimitHint:"В один урок можно загрузить максимум {{count}} видео.",videoCountLimitError:"На этом тарифе в один урок можно загрузить максимум {{count}} видео",totalUploadLimitError:"Общий размер видео в одном уроке не должен превышать 200MB",processing:"Видео обрабатывается...",savingLesson:"Урок сохраняется...",uploading:"Загрузка...",preparing:"Подготовка",processingMeta:"Файл загружен на сервер и теперь делится на HLS-сегменты.",savingMeta:"Сохраняются итоговые данные.",youtubeLabel:"YouTube Video URL *",optionalMediaHint:"При сохранении черновика медиа не обязательно.",description:"Описание (необязательно)",descriptionPlaceholder:"Кратко об уроке...",processingShort:"Обработка...",savingShort:"Сохранение...",sending:"Отправка...",createDraft:"Создать черновик",saveDraft:"Сохранить черновик",saveChanges:"Сохранить изменения",publish:"Опубликовать",saveAndPublish:"Сохранить и опубликовать",submit:"Добавить",uploadError:"Ошибка загрузки",publishError:"Не удалось опубликовать урок"},mt={title:"Создать групповой видеозвонок",subtitle:"Введите название, выберите приватность и быстро создайте meet.",heroTitle:"Быстрое создание meet",heroDescription:"После создания появится ссылка. В public-комнату входят сразу, в private — после вашего одобрения.",detailsTitle:"Детали meet",detailsDescription:"Введите название комнаты и короткое описание.",name:"Название комнаты",namePlaceholder:"Например: Frontend sprint review",description:"Короткое описание",descriptionPlaceholder:"О чём сегодняшний звонок?",privacyTitle:"Кто может присоединиться?",privacyPrivateHint:"Входят только те, кого вы одобрите",privacyPublicHint:"Любой со ссылкой может войти сразу",publicBadge:"Public",publicTitle:"Открыт для всех",publicDescription:"Все со ссылкой входят сразу.",privateBadge:"Private",privateTitle:"Только по одобрению",privateDescription:"Сначала ждут, затем вы подтверждаете вход.",footerNote:"После создания вы увидите meet в сайдбаре.",create:"Создать meet"},ht={guest:"Гость",roomDefault:"Meet",localSuffix:" (Вы)",privateBadge:"Private",recording:"REC",open:"Открыть",minimize:"Свернуть",copied:"Скопировано!",copyLink:"Link",participants:"{{count}} участников",privateRoom:"приватная комната",publicRoom:"публичная комната",minimizeTitle:"Свернуть meet",close:"Закрыть",connecting:"Подключение…",waiting:"Ожидание одобрения…",waitingDescription:"Подождите, пока создатель звонка одобрит ваш запрос",rejected:"Отклонено",rejectedDescription:"Создатель звонка отклонил ваш запрос",members:"Участники ({{count}})",waitingMembers:"Ожидают ({{count}})",joinedMembers:"Подключились ({{count}})",cameraOff:"Камера выключена"},gt={titleFallback:"Личный звонок",calling:"Звонок идет",localLabel:"Вы",remoteLabel:"Собеседник",screenShareLabel:"Показ экрана"},bt={title:"Мнемоника",description:"Сохраняется только лучший результат и показывается в рейтинге.",modes:{digits:"Digits",words:"Words"},numbers:{title:"Numbers"},words:{title:"Words"},fields:{digitsToMemorize:"Digits to Memorize:",wordsToMemorize:"Words to Memorize:",maxMemorizationTime:"Maximum Memorization Time:",maxRecallTime:"Maximum Recall Time:",autoAdvanceTotalTime:"Auto Advance Total Time:",optional:"Необязательно"},stage:{memorizationStartsIn:"Memorization starts in",memorizationEndsIn:"Memorization ends in",recallStartsIn:"Recall starts in",recallEndsIn:"Recall ends in",score:"Score",time:"Time",completed:"Completed",done:"Готово"},actions:{start:"Начать",skip:"Пропустить",finished:"Finished",continue:"Continue",clear:"Очистить"},leaderboard:{title:"Рейтинг",sorting:"Больше балл, меньше время",yourBest:"Ваш лучший результат",loading:"Загрузка рейтинга...",empty:"Результатов пока нет."},secondsShort:"sec",setupHintDigits:"Количество цифр может быть от 1 до {{count}}. Сохраняется только лучший результат.",setupHintWords:"Количество слов может быть от 1 до {{count}}. Подготовленный noun pool содержит {{total}} слов. Сохраняется только лучший результат."},ft={shareLinks:{subtitle:"Короткие ссылки для `{{itemTitle}}`",limit:"Общий лимит",persistLabel:"Сохранять результат",persist:"Сохранять",persistHint:"Отправляется преподавателю",ephemeral:"Не сохранять",ephemeralHint:"Только для студента",groupName:"Название группы",groupPlaceholder:"Например: g12",showResults:"Итоговый результат",showResultsOn:"Показывать",showResultsOnHint:"Студент увидит",showResultsOff:"Скрыть",showResultsOffHint:"Только для преподавателя",timeLimit:"Лимит времени",timeLimitPlaceholder:"0 = без ограничений",creating:"Создание...",limitReached:"Лимит достигнут",create:"Создать ссылку",previousLinks:"Предыдущие ссылки",empty:"Ссылки ещё не созданы.",persistedDefault:"Результат сохраняется",ephemeralDefault:"Результат не сохраняется",resultShown:"показывается",resultHidden:"скрыт",result:"Результат",time:"Время",minutes:"{{count}} минут",unlimited:"без ограничений"},results:{searchPlaceholder:"Поиск...",allGroups:"Все группы",unknownUser:"Пользователь",noGroup:"-",reportTitle:"Отчёт",resultsSuffix:"результаты",filteredReport:"Отфильтрованный отчёт",submitted:"Сдали",mastery:"Освоение",easiest:"Самый лёгкий вопрос",hardest:"Самый сложный вопрос",student:"Студент",group:"Группа",date:"Дата",total:"Всего",percent:"Процент",filteredCount:"Количество отфильтрованных работ",average:"Средний результат",allResults:"Все результаты",empty:"По данному фильтру ничего не найдено.",questionCount:"{{count}} вопросов",yourSentence:"Ваше предложение",correctAnswer:"Правильный ответ",selectedAnswer:"Ваш ответ",noData:"Данных пока нет",question:"Вопрос",correct:"Верно",wrong:"Ошибка",nothing:"ничего",extraToken:"лишний элемент",mistakeTemplate:"{{position}}-й элемент: вы выбрали {{actual}}. Правильно: {{expected}}.",noAnswer:"Нет ответа",noInfo:"Нет данных"},createBattle:{title:"Новая комната состязания",name:"Название состязания",namePlaceholder:"Например: пятничное состязание",testLabel:"Выберите тест",testPlaceholder:"--- Выберите тест ---",visibility:"Видимость",public:"Public",unlisted:"Unlisted",emptyTests:"Тесты пока не найдены. Если вы только что создали тест, список может ещё обновляться.",publicInfo:"Эта комната открыта для всех и отображается в списке активных состязаний.",unlistedInfo:"Эта комната не отображается в списке. Присоединиться смогут только те, кто знает ID комнаты.",create:"Создать комнату"}},xt={title:"Посты",tabs:{forYou:"Для вас",following:"Подписки"},composePlaceholder:"Поделитесь своей мыслью…",emptyFollowing:"Здесь будут посты пользователей, на которых вы подписаны",emptyForYou:"Постов пока нет. Станьте первым!",allShown:"Показаны все сообщения.",editPost:"Редактировать",deletePost:"Удалить",editTitle:"Редактировать пост",createTitle:"Новый пост",deleteTitle:"Удалить пост",deleteDescription:"Если этот пост удалить, восстановить его будет нельзя."},vt={title:"Комментарии",allShown:"Показаны все комментарии.",empty:"Комментариев пока нет. Напишите первым!",reply:"Ответить",replyingTo:"Ответ",replyPlaceholder:"Ответ для @{{name}}...",commentPlaceholder:"Напишите комментарий..."},yt={avatarChange:"Изменить аватар",bioMissingOwn:"Описание пока не добавлено. Заполните профиль.",bioMissingOther:"Описание не добавлено.",following:"Подписаны",follow:"Подписаться",settings:"Настройки",tabs:{groups:"Посты",blogs:"Блоги",courses:"Уроки",appearance:"Тема",language:"Язык",premium:"Jamm Premium",support:"Поддержка",favorites:"Избранное"},stats:{members:"Участники",posts:"Посты",blogs:"Блоги",courses:"Уроки"}},kt={sections:{appearance:{title:"Тема",description:"Управляйте внешним видом интерфейса."},language:{title:"Язык",description:"Управляйте языком и регионом."},premium:{title:"Jamm Premium",description:"Управляйте премиум-статусом, промокодом и тарифами."},support:{title:"Поддержка",description:"Быстрые контакты для вопросов и проблем."},favorites:{title:"Избранное",description:"Отдельный раздел для сохранённого контента."}},appearance:{groupTitle:"Оформление",groupDescription:"Пока доступно только переключение основной темы.",themeLabel:"Тема",themeDescription:"Интерфейс Jamm работает в тёмном или светлом режиме."},language:{groupTitle:"Язык и регион",groupDescription:"Выбранные значения сохраняются в local storage.",languageLabel:"Язык",languageDescription:"Основной язык интерфейса.",regionLabel:"Регион",regionDescription:"Сейчас используется глобальный режим."},premium:{statusTitle:"Статус Premium",statusDescription:"Текущая подписка и активация через промокод.",statusLabel:"Статус",statusMeta:"Премиум-статус вашего профиля.",freeAccount:"Обычный аккаунт",promoLabel:"Промокод",promoDescription:"Введите код, чтобы быстро активировать Premium.",promoPlaceholder:"Введите код",checking:"Проверка...",activated:"Premium активирован",invalidPromo:"Недействительный промокод",plansTitle:"Тарифы подписки",plansDescription:"Premium-тарифы для дополнительных возможностей.",decorationTitle:"Декорация профиля",decorationDescription:"Премиум-подписчики могут добавить анимированное украшение после ника.",decorationSaved:"Декорация профиля обновлена",decorationCleared:"Декорация профиля удалена",decorationError:"Не удалось сохранить декорацию",decorationNone:"Без декорации",decorationNoneMeta:"Будет показан только ник.",decorationBadgeMeta:"Показывает официальный premium badge.",decorationLockedTitle:"Декорации доступны только в premium",decorationLockedDescription:"Анимированные украшения ника доступны только премиум-подписчикам.",decorationImageUpload:"Загрузить своё изображение для декорации",decorationImageReplace:"Выбрать или заменить свою декорацию",decorationImageUploading:"Изображение загружается...",decorationImageSaved:"Изображение декорации сохранено",decorationImageError:"Не удалось загрузить изображение декорации",days:"дней",contactPremium:"Связаться с Premium",plansUnavailable:"Тарифы временно недоступны."},support:{premiumTitle:"Поддержка Premium",premiumDescription:"Для вопросов по подписке, промокодам и лимитам.",premiumAction:"Написать @premium",jammTitle:"Поддержка Jamm",jammDescription:"Для общих технических проблем или вопросов аккаунта.",jammAction:"Написать @jamm",chatError:"Не удалось открыть чат"},favorites:{lessonsTitle:"Понравившиеся уроки",lessonsDescription:"Здесь собраны ваши любимые уроки.",lessonsEmpty:"Понравившихся уроков пока нет.",postsTitle:"Понравившиеся посты",postsDescription:"Список постов, которые вам понравились.",postsEmpty:"Понравившихся постов пока нет.",blogsTitle:"Понравившиеся блоги",blogsDescription:"Здесь отображаются понравившиеся вам блоги.",blogsEmpty:"Понравившихся блогов пока нет."}},Tt={title:"Jamm Premium",subtitle:"Все лимиты в одном месте. Premium открывает более высокие ограничения и более удобный рабочий процесс для преподавателя.",limitReachedTitle:"Лимит достигнут",freePlan:"Обычный тариф",freePlanDescription:"Базовые лимиты для ежедневного использования.",premiumPlan:"Premium тариф",premiumPlanDescription:"Больше контента, больше студентов и шире управление уроками.",columns:{feature:"Лимит",free:"Обычный",premium:"Premium"},sections:{posts:{title:"Посты",description:"Дневные лимиты постов и комментариев."},blogs:{title:"Блоги",description:"Создание блогов и объём контента."},groups:{title:"Группы и чат",description:"Лимиты групп и сообщений."},meets:{title:"Видеозвонки",description:"Создание meet и лимит участников."},courses:{title:"Курсы и уроки",description:"Лимиты медиа, тестов и домашнего задания в уроках."},arena:{title:"Arena",description:"Лимиты тестов, карточек и сборщиков предложений."},profile:{title:"Профиль",description:"Лимиты полей профиля и общих пользовательских данных."}},items:{postsPerDay:"Постов в день",postCommentsPerPost:"Комментариев на пост",postWords:"Текст поста",postCommentChars:"Длина комментария",blogsPerUser:"Блогов",blogCommentsPerBlog:"Комментариев на блог",blogImagesPerBlog:"Изображений в блоге",blogWords:"Текст блога",blogTitleChars:"Заголовок блога",blogExcerptChars:"Краткое описание",blogTagChars:"Ёмкость тега",blogCommentChars:"Комментарий к блогу",groupsCreated:"Созданных групп",groupsJoined:"Вступлений в группы",messageChars:"Длина сообщения",groupNameChars:"Название группы",groupDescriptionChars:"Описание группы",meetsCreated:"Meet",meetParticipants:"Участников meet",meetTitleChars:"Название meet",meetDescriptionChars:"Описание meet",coursesCreated:"Курсов",lessonsPerCourse:"Уроков в курсе",lessonVideosPerLesson:"Видео в уроке",lessonMediaBytes:"Размер медиа урока",lessonTestsPerLesson:"Тестов в уроке",lessonHomeworkPerLesson:"Домашних заданий в уроке",homeworkTextChars:"Текст домашнего задания",homeworkLinkChars:"Ссылка в домашнем задании",homeworkPhotoBytes:"Размер фото для домашнего задания",homeworkAudioBytes:"Размер аудио для домашнего задания",homeworkVideoBytes:"Размер видео для домашнего задания",homeworkPdfBytes:"Размер PDF для домашнего задания",courseNameChars:"Название курса",courseDescriptionChars:"Описание курса",lessonTitleChars:"Заголовок урока",lessonDescriptionChars:"Описание урока",testsCreated:"Тестов",testShareLinksPerTest:"Ссылок на тест",testTitleChars:"Заголовок теста",testDescriptionChars:"Описание теста",testQuestionChars:"Длина вопроса",testOptionChars:"Длина варианта",flashcardsCreated:"Колод карточек",flashcardSideChars:"Сторона карточки",sentenceBuildersCreated:"Колод “Составь предложение”",sentenceBuilderShareLinksPerDeck:"Ссылок на набор предложений",sentenceBuilderPromptChars:"Вопрос в «Составь предложение»",sentenceBuilderAnswerChars:"Ответ в «Составь предложение»",nicknameChars:"Nickname",usernameChars:"Username",bioChars:"Bio"},words:"{{count}} слов",chars:"{{count}} символов",footerNote:"Часть лимитов считается как общий объём, а часть — отдельно для каждого урока или поста.",upgrade:"Открыть раздел premium"},wt={dashboard:{welcomeTitle:"Добро пожаловать на арену знаний!",welcomeDescription:"Выберите нужный раздел в меню слева: решайте тесты, запоминайте слова или соревнуйтесь с друзьями."}},Dt={common:et,navigation:it,theme:at,language:tt,layout:ot,installPrompt:rt,featureTour:st,courseSidebar:nt,chatsSidebar:lt,blogs:dt,coursePlayer:ct,createCourse:pt,addLesson:ut,meetDialog:mt,groupCall:ht,privateCall:gt,mnemonics:bt,arenaShared:ft,feed:xt,comments:vt,profile:yt,profileUtility:kt,premiumModal:Tt,arena:wt},Pt={back:"Orqaga",loading:"Yuklanmoqda...",save:"Saqlash",saving:"Saqlanmoqda...",send:"Yuborish",edit:"Tahrirlash",delete:"O'chirish",cancel:"Bekor qilish",create:"Yaratish",activate:"Faollashtirish",contact:"Aloqa",global:"Global",status:"Status",active:"Aktiv",author:"Muallif",course:"Kurs",like:"like",views:"ko'rish",userFallback:"Foydalanuvchi",you:"Siz",message:"Xabar",actions:"Amallar"},jt={feed:"Gurunglar",blogs:"Bloglar",chats:"Chatlar",courses:"Kurslar",profile:"Profilim",admin:"Admin"},St={dark:"Dark",light:"Light"},Ct={uz:"O'zbekcha",en:"English (US)",ru:"Русский"},zt={selectMeet:"Meet tanlang",selectChat:"Suhbatni tanlang",maximizePane:"Panelni kattalashtirish",minimizePane:"Panelni kichraytirish"},qt={title:"Jamm ni qurilmaga o'rnating",subtitle:"Tezroq ochiladi va alohida ilova kabi ishlaydi.",heroTitle:"Home screen dan ochish qulayroq",heroDescription:"Jamm ni bosh ekranga qo'shsangiz, brauzer panellarisiz va tezroq ochiladi.",later:"Keyinroq",install:"O'rnatish",showSteps:"Qanday qilish",android:{step1Title:"O'rnatish tugmasini bosing",step1Description:"Brauzer system install oynasini ochadi.",step2Title:"Tasdiqlang",step2Description:"Tasdiqlagandan keyin Jamm bosh ekranga alohida ilova bo'lib qo'shiladi.",hint:"Android brauzerlarda install prompt avtomatik ishlaydi."},ios:{step1Title:"Share menyusini oching",step1Description:"Safari yoki iOS brauzeridagi Share tugmasini bosing.",step2Title:"Add to Home Screen ni tanlang",step2Description:"Pastdagi ro'yxatdan Add to Home Screen bandini toping.",step3Title:"Add ni bosing",step3Description:"Shundan keyin Jamm bosh ekranda alohida ilova bo'lib chiqadi.",hint:"iPhone va iPad’da install avtomatik emas, Apple share menyusi orqali qilinadi."}},Lt={step:"{{current}} / {{total}} qadam",skip:"O'tkazib yuborish",next:"Keyingi",done:"Tugatish",courses:{searchTitle:"Kurslarni tez toping",searchDescription:"Kerakli kursni nomi bo'yicha qidiring. Arena va kurslar shu yerdan tez topiladi.",tabsTitle:"Kurslar va Maydon",tabsDescription:"Bu tablar orqali kurslar va arena bo'limi o'rtasida tez almashasiz.",createTitle:"Yangi kurs yarating",createDescription:"O'zingizning kursingizni shu tugma orqali ochasiz.",listTitle:"Kurslar ro'yxati",listDescription:"Siz a'zo bo'lgan yoki boshqarayotgan kurslar shu yerda turadi. Kurs tanlasangiz o'ng tomonda ochiladi.",contentTitle:"Kurs oynasi",contentDescription:"Tanlangan kursning darslari, video, vazifalar va boshqaruv qismi shu yerda ochiladi."},chats:{searchTitle:"Chatlarni tez toping",searchDescription:"User yoki groupni shu qidiruv orqali topasiz. Video meetlar ham shu module ichida.",tabsTitle:"Chat bo'limlari",tabsDescription:"Shaxsiy, Guruhlar va Video qo'ng'iroq bo'limlari shu tablarda.",privateTabTitle:"Shaxsiy chatlar",privateTabDescription:"Bitta-bitta suhbatlar va saqlangan xabarlar shu tabda turadi.",groupsTabTitle:"Guruhlar",groupsTabDescription:"Guruh suhbatlari va ularga oid boshqaruvlar shu tabda.",videoTabTitle:"Video qo'ng'iroqlar",videoTabDescription:"Yaratilgan meetlar va video xonalar shu tabda ko'rinadi.",listTitle:"Chatlar ro'yxati",listDescription:"Tanlash uchun barcha suhbatlar shu yerda turadi. Keraklisini bossangiz o'ng tomonda ochiladi.",contentTitle:"Suhbat oynasi",contentDescription:"Tanlangan chatning xabarlari va yozish oynasi shu qismda ochiladi."},profile:{entryTitle:"Profilga shu yerdan o'tasiz",entryDescription:"Profil rasmi tugmasini bosing. Keyingi bosqichda profil sahifasi avtomatik ochiladi.",overviewTitle:"Profil boshqaruvi",overviewDescription:"Profil rasmi, statistika va asosiy bo'limlar shu yerda jamlangan.",editTriggerTitle:"Profilni tahrirlash tugmasi",editTriggerDescription:"Tur oxirida shu tugma orqali profil tahrirlash oynasini ochasiz.",editDialogTitle:"Profilni shu yerda o'zgartirasiz",editDialogDescription:"Nickname, username, avatar va bio shu oynada yangilanadi.",groupsTabTitle:"Gurunglar bo'limi",groupsTabDescription:"Shaxsiy gurunglaringizni shu tab orqali ochasiz.",groupsPaneTitle:"Gurunglar oynasi",groupsPaneDescription:"Post yaratish, tahrirlash va ko'rish shu ekran ichida bo'ladi.",coursesTabTitle:"Darslar bo'limi",coursesTabDescription:"Qo'shgan kurslaringiz va darslaringiz shu tabda turadi.",coursesPaneTitle:"Darslar oynasi",coursesPaneDescription:"Kurslar ro'yxatini ochib, shu yerdan kurs sahifasiga o'tasiz.",blogsTabTitle:"Bloglar bo'limi",blogsTabDescription:"Blog yozuvlari va ularni boshqarish shu tabda.",blogsPaneTitle:"Bloglar oynasi",blogsPaneDescription:"Bloglarni yaratish, o'qish va tahrirlash shu yerda ochiladi.",appearanceTabTitle:"Theme bo'limi",appearanceTabDescription:"Interfeys ko'rinishini shu yerda boshqarasiz.",languageTabTitle:"Til bo'limi",languageTabDescription:"Ilova tilini shu bo'limdan almashtirasiz.",appearancePaneTitle:"Theme sozlamalari",appearancePaneDescription:"Light va dark theme kabi asosiy ko'rinish sozlamalari shu oynada.",premiumTabTitle:"Jamm Premium",premiumTabDescription:"Premium holati, promo-kod va bezaklar shu tabda.",supportTabTitle:"Qo'llab-quvvatlash bo'limi",supportTabDescription:"Yordam va aloqa ma'lumotlari shu bo'limda turadi.",favoritesTabTitle:"Sevimlilarim bo'limi",favoritesTabDescription:"Like bosgan dars, gurung va bloglar shu yerda yig'iladi.",premiumPaneTitle:"Premium oynasi",premiumPaneDescription:"Tariflar, promo-kodlar va profil bezaklarini shu yerda boshqarasiz."}},Mt={lessons:"Darslar",tabs:{courses:"Kurslar",arena:"Maydon"},arena:{testsTitle:"Testlar",testsDescription:"Ochiq testlarni ishlash",flashcardsTitle:"Flashcards",flashcardsDescription:"Lug'atlarni yodlash",sentencesTitle:"Gap tuzish",sentencesDescription:"Bo'laklardan gap yig'ish",mnemonicsTitle:"Minemonika",mnemonicsDescription:"Raqamlarni eslab qolish",battlesTitle:"Bilimlar bellashuvi",battlesDescription:"Real vaqt musobaqa"},searchPlaceholder:"Kurslarni qidirish...",createTitle:"Yangi kurs yaratish",emptyTitle:"Hozircha kurslar yo'q",emptyDescription:"Yangi kurs yaratish uchun + tugmasini bosing",allShown:"Barcha kurslar ko'rsatildi.",lessonCount:"{{count}} ta dars",noLessons:"Hali dars yo'q",deleteAction:"Kursni o'chirish",deleteError:"Kursni o'chirishda xatolik yuz berdi",deleteTitle:"Kursni o'chirish",deleteDescription:"Rostdan ham <bold>{{name}}</bold> kursni o'chirmoqchimisiz? Bu amalni keyin tiklab bo'lmaydi va kursga tegishli barcha videolar, fayllar va ma'lumotlar o'chib ketadi.",deleteConfirm:"Ha, o'chirish",deleteConfirmLoading:"O'chirilmoqda...",deleteCancel:"Yo'q, qolsin",status:{admin:"Admin",approved:"A'zo",pending:"Kutilmoqda"}},Bt={searchPlaceholder:"Chat qidirish...",createGroup:"Guruh yaratish",createMeet:"Yangi meet",tabs:{private:"Shaxsiy",groups:"Guruhlar",video:"Video"},filters:{all:"Barchasi",today:"Bugun",week:"Hafta"},search:{startMessage:"Xabar yozishni boshlang...",notFound:"Hech narsa topilmadi",groupMeta:"{{count}} a'zo"},meets:{untitled:"Nomsiz meet",notFound:"Meet topilmadi",empty:"Hali hech qanday meet yo'q",admin:"Admin",participant:"Ishtirokchi"},delete:"O'chirish",allShown:"Barcha suhbatlar ko'rsatildi.",online:"{{count}} online",timeAgo:{now:"hozir",minutes:"{{count}} daq oldin",hours:"{{count}} soat oldin",days:"{{count}} kun oldin"}},At={searchPlaceholder:"Blog qidirish...",createTitle:"Yangi blog",notFound:"Blog topilmadi.",selectToRead:"O‘qish uchun blog tanlang.",backToList:"Bloglar",noExcerpt:"Tavsif yo'q",author:"Muallif",comments:"izoh",coverClose:"Cover rasmni yopish"},$t={errors:{deleteLesson:"Darsni o'chirishda xatolik yuz berdi",formatNotSupported:"Bu video formatini brauzeringiz qo'llab-quvvatlamaydi (masalan .mov bevosita Chrome'da ishlamasligi mumkin).",playback:"Videoni ishga tushirishda xatolik yuz berdi.",playbackToken:"Videoni yuklashga ruxsat olinmadi.",hlsUnsupported:"Brauzer HLS videoni qo'llab-quvvatlamaydi.",hlsPlayback:"HLS videoni ishga tushirishda xatolik yuz berdi.",chatCreate:"Xatolik yuz berdi: Chat yaratib bo'lmadi"},empty:{title:"Kursni tanlang",description:"Chap tarafdagi ro'yxatdan kursni tanlang yoki yangi kurs yarating."},speed:{title:"Tezlik",normal:"Oddiy (1x)"},tabs:{comments:"Izohlar",homework:"Uyga vazifa",attendance:"Davomat",grading:"Baholash"},meta:{lesson:"{{index}}-dars: {{title}}",views:"ko'rish",likes:"like"},description:{title:"Dars haqida",more:"Ko'proq",less:"Yopish"},extras:{title:"Dars qo'shimchalari",description:"Material, test va uyga vazifani shu yerda ochasiz."},attendance:{title:"Davomat",adminHint:"Bu dars bo'yicha student davomatini boshqaring",studentHint:"Darsni kamida 70% ko'rish davomatga yoziladi",present:"Bor",late:"Kechikdi",absent:"Yo'q",progress:"{{percent}}% ko'rilgan",empty:"Hali tasdiqlangan studentlar yo'q",noRecord:"Siz uchun hali davomat yozilmagan",status:{present:"Bor",late:"Kechikdi",absent:"Yo'q"}},homework:{title:"Uyga vazifa",adminHint:"Topshiriq yarating va talabalar javobini tekshiring",studentHint:"Javobni topshiriq turiga mos yuboring",typeLabel:"Topshiriq turi",types:{text:"Matn",audio:"Audio",video:"Video",pdf:"PDF",photo:"Rasm"},fields:{title:"Uyga vazifa sarlavhasi",description:"Topshiriq tavsifi",score:"Ball",feedback:"Izoh / feedback",answer:"Javobingizni yozing",link:"Qo'shimcha havola (ixtiyoriy)",file:"Fayl yuklash",note:"Qisqa izoh (ixtiyoriy)"},fileHint:"{{type}} faylini yuklang (maks. {{size}}MB)",fileUploaded:"Fayl yuklangan",uploading:"Yuklanmoqda...",deadline:"Muddat",noDeadline:"Belgilanmagan",maxScore:"Maksimal ball",submissions:"Topshirganlar",save:"Saqlash",createDialogTitle:"Yangi uyga vazifa",editDialogTitle:"Uyga vazifani tahrirlash",dialogSubtitle:"Topshiriq turini, muddatini va maksimal ballini belgilang.",addAnother:"Yana vazifa qo'shish",delete:"Vazifani o'chirish",disable:"O'chirish",submit:"Topshirish",resubmit:"Qayta topshirish",review:"Tekshirildi deb belgilash",needsRevision:"Qayta ishlashga yuborish",alreadySubmitted:"Vazifa topshirilgan. Ustoz qayta ishlashga yubormasa, yana topshirib bo'lmaydi.",disabled:"Bu dars uchun uyga vazifa hali yoqilmagan",disabledStudent:"Bu dars uchun uyga vazifa berilmagan",emptySubmissions:"Hali hech kim topshirmagan",statusLabel:"Holat",scoreLabel:"Ball",status:{submitted:"Topshirilgan",reviewed:"Tekshirilgan",needs_revision:"Qayta ishlash kerak"},errors:{fileOrLinkRequired:"Fayl yoki havola kiriting",textOrLinkRequired:"Matn yoki havola kiriting",saveFirst:"Avval vazifani saqlang",limitReached:"Bu tarifda bitta dars uchun maksimal {{count}} ta uyga vazifa qo'shish mumkin",textTooLong:"Javob matni maksimal {{count}} ta belgidan oshmasligi kerak",linkTooLong:"Havola maksimal {{count}} ta belgidan oshmasligi kerak",invalidFileType:"{{type}} uchun noto'g'ri fayl turi tanlandi",fileTooLarge:"{{type}} fayli maksimal {{size}}MB bo'lishi kerak"},assignmentLabel:"{{index}}-vazifa",emptyAssignments:"Hali vazifalar qo'shilmagan",collapse:"Uyga vazifani yopish",expand:"Uyga vazifani ochish"},materials:{title:"Dars materiallari",adminHint:"PDF materiallarni shu darsga biriktiring",studentHint:"Darsga biriktirilgan PDF materiallarni shu yerda oching",add:"PDF qo'shish",empty:"Hali material qo'shilmagan",dialogTitle:"Yangi material",dialogSubtitle:"Faqat PDF formatdagi faylni biriktiring.",uploadError:"Materialni yuklab bo'lmadi",deleteError:"Materialni o'chirib bo'lmadi",fields:{title:"Material sarlavhasi",titlePlaceholder:"Masalan: Dars slaydlari",file:"PDF fayl"},collapse:"Materiallarni yopish",expand:"Materiallarni ochish"},grading:{title:"Baholash",adminHint:"Dars bahosi va kurs bo'yicha umumiy student holatini ko'ring",studentHint:"Dars va kurs bo'yicha umumiy holatingizni ko'ring",lessonSection:"Joriy dars",courseSection:"Kurs bo'yicha umumiy holat",averageScore:"O'rtacha ball",excellent:"Yaxshi o'zlashtirganlar",homeworkDone:"Vazifa topshirganlar",attendanceMarked:"Davomati borlar",totalStudents:"Talabalar",totalLessons:"Darslar",needAttention:"E'tibor kerak",student:"Talaba",attendance:"Davomat",attendanceRate:"Davomat %",homework:"Vazifa",oral:"Og'zaki",oralScore:"0-100 ball",oralNote:"Savol-javob izohi",oralSaved:"Og'zaki baholash saqlandi",oralSaveError:"Og'zaki baholashni saqlab bo'lmadi",score:"Ball",status:"Holat",notEnabled:"Yoqilmagan",progressValue:"{{percent}}% ko'rilgan",presentValue:"{{present}}/{{total}} bor",homeworkState:{submitted:"Topshirilgan",reviewed:"Tekshirilgan",needs_revision:"Qayta topshirish kerak",missing:"Topshirilmagan"},performance:{excellent:"A'lo",good:"Yaxshi",average:"O'rtacha",needs_attention:"E'tibor kerak",no_activity:"Faollik yo'q"},empty:"Baholash uchun hali ma'lumot yo'q"},adminPane:{title:"Darslarni boshqarish",subtitle:"Barcha darslar, a'zolar va statistika bir joyda",currentLesson:"Joriy dars",lessonNumber:"{{index}}-dars",published:"E'lon qilingan",addLesson:"Yangi dars",publish:"E'lon qilish",deleteLesson:"Darsni o'chirish",totalLessons:"Jami dars",students:"Talabalar",noPending:"Kutayotgan talabalar yo'q",tabs:{tests:"Test",homework:"Uyga vazifa",attendance:"Davomat",grading:"Baholash",members:"Talabalar"}},lessonTests:{title:"Lesson testi",adminHint:"Arena test yoki gap tuzish havolasini biriktiring va unlock qoidasini belgilang",studentHint:"{{count}} / {{total}} test bajarilgan",add:"Test qo'shish",limitReached:"Bu darsga faqat bitta test biriktirish mumkin",edit:"Testni tahrirlash",delete:"Testni o'chirish",saved:"Lesson testi saqlandi",deleted:"Lesson testi o'chirildi",saveError:"Lesson testini saqlab bo'lmadi",deleteError:"Lesson testini o'chirib bo'lmadi",loadError:"Testni yuklab bo'lmadi",submitError:"Test natijasini saqlab bo'lmadi",passed:"Test muvaffaqiyatli topshirildi",failed:"Natija {{score}}%. O'tish uchun kamida {{minimum}}% kerak",completed:"Bajarilgan",required:"Majburiy",resultsShown:"Natija ko'rsatiladi",resultsHidden:"Natija yashiriladi",requiredToggle:"Unlock: {{value}}",unlockRequiredShort:"majburiy",unlockOptionalShort:"ixtiyoriy",latestScoreMeta:"Oxirgi natija {{score}}%, urinishlar {{attempts}}",typeTest:"Test",typeSentenceBuilder:"Gap tuzish",minScoreMeta:"Min {{score}}%",timeLimitMeta:"{{count}} min",noTimeLimit:"Vaqt cheklovi yo'q",retry:"Qayta ishlash",start:"Boshlash",openArena:"Arenada ochish",emptyAdmin:"Bu darsga test biriktirilmagan",emptyStudent:"Bu dars uchun test yo'q",collapse:"Testlarni yopish",expand:"Testlarni ochish",newDialogTitle:"Lesson testini qo'shish",editDialogTitle:"Lesson testini tahrirlash",dialogSubtitle:"Arena ichida yaratilgan test, test share linki yoki gap tuzish havolasini kiriting.",urlLabel:"Test havolasi",urlPlaceholder:"https://.../arena/quiz/... yoki /arena/sentence-builder/...",minimumScoreLabel:"Minimal score (%)",timeLimitLabel:"Vaqt (minut)",showResultsLabel:"Natijani ko'rsatish",showResultsOn:"Ko'rsatilsin",showResultsOff:"Ko'rsatilmasin",unlockRuleLabel:"Keyingi darsni ochish qoidasi",unlockRequired:"Majburiy qilib lock qilsin",unlockOptional:"Faqat qo'shimcha test bo'lsin",deleteConfirmTitle:"Lesson testini o'chirish",deleteConfirmDescription:"Bu test bog'lanishini o'chirmoqchimisiz?",builderBack:"Lessonga qaytish",builderProgress:"Savol {{current}} / {{total}}",builderPromptTitle:"Savol",builderAnswerTitle:"Sizning javobingiz",builderPoolTitle:"Bo'laklar",builderComposeHint:"Bo'laklarni bosib gap tuzing",builderCheck:"Tekshirish",builderChecking:"Tekshirilmoqda...",builderNext:"Keyingi savol",builderFinish:"Yakunlash",builderCorrect:"Javob to'g'ri",builderWrong:"Javobda xato bor",builderExpected:"To'g'ri javob",builderCorrectCount:"To'g'ri javoblar",builderTotalCount:"Jami savollar",builderAccuracy:"Natija",builderQuestionLabel:"Savol {{number}}",builderNoBreakdown:"Bu test uchun javoblar tafsiloti ko'rsatilmaydi.",lockedTitle:"Avval testni ishlang",lockedDescription:"Keyingi darsni ochish uchun oldingi darsdagi majburiy testdan o'tish kerak."},locked:{noLessonsTitle:"Hali darslar qo'shilmagan",noLessonsAdmin:"O'ng tarafdagi + tugmasini bosib dars qo'shing.",noLessonsUser:"Tez orada darslar qo'shiladi.",draftTitle:"Draft dars",draftDescription:"Bu dars hali e'lon qilinmagan.",draftAdminDescription:"Dars draft holatda turibdi. Media biriktirib e'lon qiling yoki tahrirlashni davom ettiring.",missingMediaTitle:"Media biriktirilmagan",missingMediaDescription:"Bu dars uchun video yoki fayl hali tayyor emas.",missingMediaAdminDescription:"Dars yaratilgan, lekin hali video yoki fayl biriktirilmagan.",pendingTitle:"So'rov yuborildi",enrollTitle:"Kursga yoziling",pendingDescription:"Sizning so'rovingiz admin tomonidan ko'rib chiqilmoqda. Iltimos kuting.",enrollDescription:"Darslarni ko'rish uchun avval kursga yozilish kerak. Admin tasdiqlangandan keyin darslarni ko'rishingiz mumkin."},playlist:{count:"{{count}} ta dars",draft:"Draft",free:"Bepul",edit:"Tahrirlash"},creator:{author:"Muallif",students:"{{count}} talaba"},actions:{manage:"Boshqarish",pending:"Kutilmoqda",cancel:"Bekor qilish",enrolled:"Obuna bo'lingan",buy:"Sotib olish: {{price}} so'm",enroll:"Obuna bo'lish",approve:"Tasdiqlash",reject:"Rad etish",remove:"Chiqarish"},members:{pendingTitle:"Kutayotganlar ({{count}})",pending:"Kutmoqda",approvedTitle:"A'zolar ({{count}})",empty:"Hali a'zolar yo'q",approved:"Tasdiqlangan"},deleteLesson:{title:"Darsni o'chirish",description:"Rostdan ham bu darsni o'chirmoqchimisiz? Agar unga video biriktirilgan bo'lsa, u ham o'chib ketadi.",confirm:"Ha, o'chirish",confirmLoading:"O'chirilmoqda...",cancel:"Beqor qilish"}},Rt={title:"Yangi kurs yaratish",imageChange:"Rasmni o'zgartirish",imagePrompt:"Kurs uchun rasm URL kiriting",imageUrl:"Rasm URL (ixtiyoriy)",name:"Kurs nomi *",namePlaceholder:"Masalan: React Asoslari",category:"Kategoriya",categories:{it:"IT & Dasturlash",smm:"SMM & Marketing",language:"Til o'rganish",mobile:"Mobil Dasturlash",design:"Dizayn"},accessType:"Ruxsat turi",access:{freeRequest:"Ruxsat so'rab (Tekin)",freeOpen:"Ruxsatsiz ochiq (Tekin)",paid:"Pullik"},price:"Narxi (UZS)",pricePlaceholder:"Masalan: 500000",description:"Tavsif",descriptionPlaceholder:"Kurs haqida qisqacha ma'lumot...",error:"Kurs yaratishda xatolik yuz berdi",creating:"Yaratilmoqda..."},Ht={title:"Yangi dars qo'shish",editTitle:"Darsni tahrirlash",createSubtitle:"Darsni hozircha draft qilib yarating. Video yoki faylni keyinroq biriktirishingiz mumkin.",editSubtitle:"Dars ma'lumotini yangilang va tayyor bo'lsa e'lon qiling.",draftNotice:"Bu dars draft holatda. Studentlarga ko'rinishi uchun e'lon qilish kerak.",lessonName:"Dars nomi *",lessonNamePlaceholder:"Masalan: React Hooks asoslari",source:"Video/Fayl manbasi *",uploadTab:"Fayl yuklash (Max 200MB)",youtubeTab:"YouTube URL",premiumNotice:"Fayl yuklash uchun Premium obuna talab qilinadi. Bepul tarifda faqat YouTube URL orqali video qo'shishingiz mumkin.",fileLabel:"Video/Fayl *",fileDropTitle:"Faylni yuklang yoki shu yerga tashlang",fileDropMeta:"MP4, WEBM, MOV (jami 200MB gacha)",multiFileCount:"{{count}} ta video tanlandi",videoNameLabel:"{{index}}-video nomi",videoNamePlaceholder:"Video nomini kiriting",videoCountLimitHint:"Bitta darsga maksimal {{count}} ta video yuklash mumkin.",videoCountLimitError:"Bu tarifda bitta darsga maksimal {{count}} ta video yuklash mumkin",totalUploadLimitError:"Bitta darsga yuklanadigan videolar jami 200MB dan oshmasligi kerak",processing:"Video qayta ishlanmoqda...",savingLesson:"Dars saqlanmoqda...",uploading:"Yuklanmoqda...",preparing:"Tayyorlanmoqda",processingMeta:"Fayl serverga bordi, endi HLS segmentlarga bo'linmoqda.",savingMeta:"Oxirgi ma'lumotlar saqlanmoqda.",youtubeLabel:"YouTube Video URL *",optionalMediaHint:"Draft saqlash uchun media majburiy emas.",description:"Tavsif (ixtiyoriy)",descriptionPlaceholder:"Dars haqida qisqacha...",processingShort:"Qayta ishlanmoqda...",savingShort:"Saqlanmoqda...",sending:"Yuborilmoqda...",createDraft:"Draft yaratish",saveDraft:"Draftni saqlash",saveChanges:"O'zgarishlarni saqlash",publish:"E'lon qilish",saveAndPublish:"Saqlash va e'lon qilish",submit:"Qo'shish",uploadError:"Yuklashda xatolik yuz berdi",publishError:"Darsni e'lon qilishda xatolik yuz berdi"},Et={title:"Create Group Video Call",subtitle:"Sarlavha yozing, maxfiylikni tanlang va tez meet yarating.",heroTitle:"Tez meet yaratish",heroDescription:"Meet yaratilgach link chiqadi. Public bo'lsa odamlar darhol, private bo'lsa tasdiq bilan kiradi.",detailsTitle:"Meet tafsilotlari",detailsDescription:"Xona nomi va izoh kiriting.",name:"Xona nomi",namePlaceholder:"Masalan: Frontend sprint review",description:"Qisqa izoh",descriptionPlaceholder:"Bugungi call nima haqida?",privacyTitle:"Kimlar qo'shila oladi?",privacyPrivateHint:"Faqat siz tasdiqlaganlar kiradi",privacyPublicHint:"Havolasi bor odamlar darhol qo'shiladi",publicBadge:"Public",publicTitle:"Barchaga ochiq",publicDescription:"Havolasi borlar darhol kiradi.",privateBadge:"Private",privateTitle:"Faqat ruxsat bilan",privateDescription:"Avval kutadi, keyin siz tasdiqlaysiz.",footerNote:"Meet yaratilgach uni sidebar ichida ko'rasiz.",create:"Meet yaratish"},Ft={guest:"Mehmon",roomDefault:"Meet",localSuffix:" (Sen)",privateBadge:"Private",recording:"REC",open:"Ochish",minimize:"Yig'ish",copied:"Nusxalandi!",copyLink:"Link",participants:"{{count}} qatnashchi",privateRoom:"private xona",publicRoom:"public xona",minimizeTitle:"Meetni yig'ish",close:"Yopish",connecting:"Ulanmoqda…",waiting:"Ruxsat kutilmoqda…",waitingDescription:"Call yaratuvchisi sizga ruxsat berishini kuting",rejected:"Rad etildi",rejectedDescription:"Call yaratuvchisi so'rovingizni rad etdi",members:"A'zolar ({{count}})",waitingMembers:"Kutayotganlar ({{count}})",joinedMembers:"Qo'shilganlar ({{count}})",cameraOff:"Kamera o'chirilgan"},Ot={titleFallback:"Shaxsiy qo'ng'iroq",calling:"Qo'ng'iroq davom etmoqda",localLabel:"Siz",remoteLabel:"Suhbatdosh",screenShareLabel:"Ekran ulashish"},Nt={title:"Minemonika",description:"Eng yaxshi natija saqlanadi va reytingda ko'rsatiladi.",modes:{digits:"Digits",words:"Words"},numbers:{title:"Numbers"},words:{title:"Words"},fields:{digitsToMemorize:"Digits to Memorize:",wordsToMemorize:"Words to Memorize:",maxMemorizationTime:"Maximum Memorization Time:",maxRecallTime:"Maximum Recall Time:",autoAdvanceTotalTime:"Auto Advance Total Time:",optional:"Ixtiyoriy"},stage:{memorizationStartsIn:"Memorization starts in",memorizationEndsIn:"Memorization ends in",recallStartsIn:"Recall starts in",recallEndsIn:"Recall ends in",score:"Score",time:"Time",completed:"Completed",done:"Tugadi"},actions:{start:"Boshlash",skip:"Skip",finished:"Finished",continue:"Continue",clear:"Tozalash"},leaderboard:{title:"Reyting",sorting:"Ko'p score, kam vaqt",yourBest:"Sizning eng yaxshi natijangiz",loading:"Reyting yuklanmoqda...",empty:"Hali natijalar yo'q."},secondsShort:"sec",setupHintDigits:"Digits soni 1 dan {{count}} gacha bo'lishi mumkin. Faqat eng yaxshi natija saqlanadi.",setupHintWords:"Words soni 1 dan {{count}} gacha bo'lishi mumkin. Tayyor noun pool: {{total}} ta. Faqat eng yaxshi natija saqlanadi."},It={shareLinks:{subtitle:"`{{itemTitle}}` uchun qisqa havolalar",limit:"Jami limit",persistLabel:"Natijani saqlash",persist:"Saqlansin",persistHint:"Ustozga boradi",ephemeral:"Saqlanmasin",ephemeralHint:"Faqat talabaga",groupName:"Guruh nomi",groupPlaceholder:"Masalan: g12",showResults:"Yakuniy natija",showResultsOn:"Ko'rsatilsin",showResultsOnHint:"Talaba ko'radi",showResultsOff:"Yashirilsin",showResultsOffHint:"Faqat ustozga",timeLimit:"Vaqt cheklovi",timeLimitPlaceholder:"0 = cheklanmagan",creating:"Yaratilmoqda...",limitReached:"Limitga yetdi",create:"Havola yaratish",previousLinks:"Oldingi havolalar",empty:"Hali havola yaratilmagan.",persistedDefault:"Natija saqlanadi",ephemeralDefault:"Natija saqlanmaydi",resultShown:"ko'rsatiladi",resultHidden:"yashiriladi",result:"Natija",time:"Vaqt",minutes:"{{count}} daqiqa",unlimited:"cheklanmagan"},results:{searchPlaceholder:"Qidirish...",allGroups:"Barcha guruhlar",unknownUser:"Foydalanuvchi",noGroup:"-",reportTitle:"Hisobot",resultsSuffix:"natijalari",filteredReport:"Filtrlangan hisobot",submitted:"Topshirganlar",mastery:"O'zlashtirish",easiest:"Eng oson savol",hardest:"Eng qiyin savol",student:"Talaba",group:"Guruh",date:"Sana",total:"Jami",percent:"Foiz",filteredCount:"Filtrlangan ishlar soni",average:"O'rtacha natija",allResults:"Barcha natijalar",empty:"Filtr bo'yicha natija topilmadi.",questionCount:"{{count}} ta savol",yourSentence:"Siz tuzgan gap",correctAnswer:"To'g'ri javob",selectedAnswer:"Siz tanlagan javob",noData:"Hali ma'lumot yo'q",question:"Savol",correct:"To'g'ri",wrong:"Xato",nothing:"hech narsa",extraToken:"ortiqcha bo'lak",mistakeTemplate:"{{position}}-bo'lak: siz {{actual}} tanladingiz. To'g'risi {{expected}}.",noAnswer:"Javob berilmagan",noInfo:"Ma'lumot yo'q"},createBattle:{title:"Yangi Bellashuv Xonasi",name:"Bellashuv nomi",namePlaceholder:"Masalan: Juma kungi bellashuv",testLabel:"Testni tanlang",testPlaceholder:"--- Test tanlang ---",visibility:"Ko'rinish",public:"Public",unlisted:"Unlisted",emptyTests:"Hali test topilmadi. Test yaratgan bo'lsangiz, ro'yxat yangilanmoqda.",publicInfo:"Ushbu xona barcha uchun ochiq va 'Aktiv Bellashuvlar' ro'yxatida ko'rinadi.",unlistedInfo:"Ushbu xona ro'yxatda ko'rinmaydi. Faqat xona ID sini bilganlargina qo'shila oladi.",create:"Xonani Yaratish"}},Yt={title:"Gurunglar",tabs:{forYou:"Siz uchun",following:"Obunachidan"},composePlaceholder:"Fikringizni baham ko'ring…",emptyFollowing:"Obuna bo'lgan foydalanuvchilar gurunglarini ko'rasiz",emptyForYou:"Hali gurunglar yo'q. Birinchi bo'ling!",allShown:"Barcha xabarlar ko'rsatildi.",editPost:"Tahrirlash",deletePost:"O'chirish",editTitle:"Gurungni tahrirlash",createTitle:"Yangi Gurung",deleteTitle:"Gurungni o'chirish",deleteDescription:"Bu gurung o'chirilsa, u qayta tiklanmaydi."},Kt={title:"Izohlar",allShown:"Barcha izohlar ko'rsatildi.",empty:"Hali izohlar yo'q. Birinchi bo'lib yozing!",reply:"Javob berish",replyingTo:"Javob",replyPlaceholder:"@{{name}} ga javob...",commentPlaceholder:"Izoh yozing..."},_t={avatarChange:"Avatarni o'zgartirish",bioMissingOwn:"Hali tavsif qo'shilmagan. O'z profilingizni to'ldiring!",bioMissingOther:"Tavsif qo'shilmagan.",following:"Obunasiz",follow:"Obuna bo'lish",settings:"Sozlamalar",tabs:{groups:"Gurunglar",blogs:"Bloglar",courses:"Darslar",appearance:"Theme",language:"Language",premium:"Jamm Premium",support:"Qo'llab-quvvatlash",favorites:"Sevimlilarim"},stats:{members:"A'zolar",posts:"Gurunglar",blogs:"Bloglar",courses:"Darslar"}},Gt={sections:{appearance:{title:"Theme",description:"Interfeys ko'rinishini boshqaring."},language:{title:"Language",description:"Til va region parametrlarini saqlang."},premium:{title:"Jamm Premium",description:"Premium holati, promo-kod va obuna rejalarini boshqaring."},support:{title:"Qo'llab-quvvatlash",description:"Muammo yoki savollar uchun tez aloqa nuqtalari."},favorites:{title:"Sevimlilarim",description:"Saqlangan kontentlar uchun alohida bo'lim."}},appearance:{groupTitle:"Ko'rinish",groupDescription:"Hozircha faqat asosiy mavzu almashinuvi mavjud.",themeLabel:"Theme",themeDescription:"Jamm interfeysi dark yoki light ko'rinishda ishlaydi."},language:{groupTitle:"Til va region",groupDescription:"Tanlangan qiymatlar local storage’da saqlanadi.",languageLabel:"Language",languageDescription:"Asosiy interfeys tili uchun tayyor parametr.",regionLabel:"Region",regionDescription:"Hozircha global rejim ishlatiladi."},premium:{statusTitle:"Premium holati",statusDescription:"Joriy obuna va promo-kod orqali faollashtirish.",statusLabel:"Status",statusMeta:"Profilingizdagi premium holati.",freeAccount:"Oddiy hisob",promoLabel:"Promo-kod",promoDescription:"Premium’ni tez yoqish uchun kod kiriting.",promoPlaceholder:"Kodni kiriting",checking:"Tekshirilmoqda...",activated:"Premium faollashtirildi",invalidPromo:"Promo-kod yaroqsiz",plansTitle:"Obuna rejalari",plansDescription:"Qo'shimcha imkoniyatlar uchun premium rejalari.",decorationTitle:"Profil dekoratsiyasi",decorationDescription:"Premium obunachi nickname oxiriga animatsiyali bezak qo'sha oladi.",decorationSaved:"Profil dekoratsiyasi yangilandi",decorationCleared:"Profil dekoratsiyasi olib tashlandi",decorationError:"Dekoratsiyani saqlab bo'lmadi",decorationNone:"Bezaksiz",decorationNoneMeta:"Faqat nickname ko'rinadi.",decorationBadgeMeta:"Rasmiy premium badge ko'rinadi.",decorationLockedTitle:"Dekoratsiyalar premium uchun",decorationLockedDescription:"Animatsiyali nickname bezaklari faqat premium obunachilar uchun ochiladi.",decorationImageUpload:"Custom bezak rasmini yuklash",decorationImageReplace:"Custom bezakni tanlash yoki almashtirish",decorationImageUploading:"Rasm yuklanmoqda...",decorationImageSaved:"Custom bezak rasmi saqlandi",decorationImageError:"Custom bezak rasmini yuklab bo'lmadi",days:"kun",contactPremium:"Premium bilan bog'lanish",plansUnavailable:"Rejalar vaqtincha ko'rsatilmayapti."},support:{premiumTitle:"Premium support",premiumDescription:"Obuna, promo-kod yoki limitlar bo'yicha savollar uchun.",premiumAction:"@premium ga yozish",jammTitle:"Jamm support",jammDescription:"Umumiy texnik muammo yoki account masalalari uchun.",jammAction:"@jamm ga yozish",chatError:"Chatni ochib bo'lmadi"},favorites:{lessonsTitle:"Like bosgan darslar",lessonsDescription:"Sevimli lessonlar shu yerda jamlanadi.",lessonsEmpty:"Hozircha like bosilgan darslar yo'q.",postsTitle:"Like bosgan gurunglar",postsDescription:"Yoqtirgan gurunglaringiz ro'yxati.",postsEmpty:"Hozircha like bosilgan gurunglar yo'q.",blogsTitle:"Like bosgan bloglar",blogsDescription:"Yoqtirgan bloglaringiz shu yerda turadi.",blogsEmpty:"Hozircha like bosilgan bloglar yo'q."}},Vt={title:"Jamm Premium",subtitle:"Barcha limitlar bir joyda. Premium bilan kengroq limitlar va qulayroq workflow ochiladi.",limitReachedTitle:"Cheklovga yetdingiz",freePlan:"Oddiy tarif",freePlanDescription:"Asosiy limitlar bilan kundalik foydalanish.",premiumPlan:"Premium tarif",premiumPlanDescription:"Ko'proq kontent, ko'proq o'quvchi va kengroq lesson boshqaruvi.",columns:{feature:"Limit",free:"Oddiy",premium:"Premium"},sections:{posts:{title:"Gurunglar",description:"Kunlik post va komment limitlari."},blogs:{title:"Bloglar",description:"Blog yaratish va kontent sig'imi."},groups:{title:"Guruhlar va chat",description:"Guruhlar va xabar limitlari."},meets:{title:"Video qo'ng'iroqlar",description:"Meet yaratish va qatnashchi sig'imi."},courses:{title:"Kurslar va darslar",description:"Lesson media, test va homework limitlari."},arena:{title:"Arena",description:"Test, lug'at va gap tuzish limitlari."},profile:{title:"Profil",description:"Profil maydonlari va umumiy foydalanuvchi limitlari."}},items:{postsPerDay:"Kuniga gurung",postCommentsPerPost:"Har gurungga komment",postWords:"Gurung matni",postCommentChars:"Komment uzunligi",blogsPerUser:"Blog soni",blogCommentsPerBlog:"Har blogga komment",blogImagesPerBlog:"Blog rasmi",blogWords:"Blog matni",blogTitleChars:"Blog sarlavhasi",blogExcerptChars:"Qisqa tavsif",blogTagChars:"Tag sig'imi",blogCommentChars:"Blog kommenti",groupsCreated:"Ochsa bo'ladigan guruh",groupsJoined:"Qo'shilsa bo'ladigan guruh",messageChars:"Xabar uzunligi",groupNameChars:"Guruh nomi",groupDescriptionChars:"Guruh haqida",meetsCreated:"Meet soni",meetParticipants:"Meet qatnashchisi",meetTitleChars:"Meet sarlavhasi",meetDescriptionChars:"Meet tavsifi",coursesCreated:"Kurs soni",lessonsPerCourse:"Har kursdagi dars",lessonVideosPerLesson:"Har darsdagi video",lessonMediaBytes:"Dars media hajmi",lessonTestsPerLesson:"Har darsdagi test",lessonHomeworkPerLesson:"Har darsdagi uyga vazifa",homeworkTextChars:"Uyga vazifa matni",homeworkLinkChars:"Uyga vazifa havolasi",homeworkPhotoBytes:"Uyga vazifa rasmi",homeworkAudioBytes:"Uyga vazifa audio",homeworkVideoBytes:"Uyga vazifa video hajmi",homeworkPdfBytes:"Uyga vazifa PDF",courseNameChars:"Kurs nomi",courseDescriptionChars:"Kurs tavsifi",lessonTitleChars:"Dars sarlavhasi",lessonDescriptionChars:"Dars tavsifi",testsCreated:"Test soni",testShareLinksPerTest:"Har testga havola",testTitleChars:"Test sarlavhasi",testDescriptionChars:"Test tavsifi",testQuestionChars:"Savol uzunligi",testOptionChars:"Variant uzunligi",flashcardsCreated:"Lug'at soni",flashcardSideChars:"Lug'at tomoni",sentenceBuildersCreated:"Gap tuzish soni",sentenceBuilderShareLinksPerDeck:"Har gap tuzishga havola",sentenceBuilderPromptChars:"Gap tuzish savoli",sentenceBuilderAnswerChars:"Gap tuzish javobi",nicknameChars:"Nickname",usernameChars:"Username",bioChars:"Bio"},words:"{{count}} so'z",chars:"{{count}} belgi",footerNote:"Ba'zi cheklovlar umumiy hajm, ba'zilari esa dars yoki post bo'yicha alohida hisoblanadi.",upgrade:"Premium bo'limiga o'tish"},Jt={dashboard:{welcomeTitle:"Bilimlar maydoniga xush kelibsiz!",welcomeDescription:"Chap tomondagi menyudan o'zingizga kerakli bo'limni tanlang: testlar ishlash, lug'at yodlash yoki do'stlar bilan bellashuv."}},Wt={common:Pt,navigation:jt,theme:St,language:Ct,layout:zt,installPrompt:qt,featureTour:Lt,courseSidebar:Mt,chatsSidebar:Bt,blogs:At,coursePlayer:$t,createCourse:Rt,addLesson:Ht,meetDialog:Et,groupCall:Ft,privateCall:Ot,mnemonics:Nt,arenaShared:It,feed:Yt,comments:Kt,profile:_t,profileUtility:Gt,premiumModal:Vt,arena:Jt},Qt={uz:"uz","uz-uz":"uz","uz-latn":"uz",en:"en","en-us":"en",ru:"ru","ru-ru":"ru"},te=a=>a&&Qt[String(a).trim().toLowerCase()]||"uz",Xt={uz:{translation:Wt},en:{translation:Za},ru:{translation:Dt}},ji=a=>{const o={uz:"uz-latn",en:"en",ru:"ru"};De.locale(o[a]||"uz-latn")},Oe=te(localStorage.getItem("language")||window.navigator.language);Di.use(Ki).init({resources:Xt,lng:Oe,fallbackLng:"uz",interpolation:{escapeValue:!1}});ji(Oe);localStorage.setItem("language",Oe);Di.on("languageChanged",a=>{const o=te(a);ji(o),localStorage.setItem("language",o)});const Ut=t.div`
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
    backdrop-filter: blur(4px) saturate(160%);
    -webkit-backdrop-filter: blur(4px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    z-index: 100;
    overflow: visible;
  }
`,Zt=t.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${a=>a.$active?"var(--primary-color)":"transparent"};
  color: ${a=>a.$active?"white":"var(--text-secondary-color)"};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  flex-shrink: 0;

  &:hover {
    background-color: ${a=>a.$active?"var(--primary-color)":"var(--hover-color)"};
    color: ${a=>a.$active?"white":"var(--text-color)"};
    transform: scale(1.1);
  }

  @media (max-width: 700px) {
    margin-bottom: 0;
    width: 44px;
    height: 44px;
  }
`,eo=t.div`
  flex: 1;

  @media (max-width: 700px) {
    display: none;
  }
`,io=t.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid
    ${a=>a.$active?"var(--primary-color)":a.$premium?"var(--warning-color)":"var(--border-color)"};
  background: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 0;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: ${a=>a.$active?"0 0 0 2px color-mix(in srgb, var(--primary-color) 40%, transparent)":"none"};

  &:hover {
    transform: scale(1.08);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--primary-color) 40%, transparent);
  }

  @media (max-width: 700px) {
    margin-bottom: 0;
    width: 40px;
    height: 40px;
  }
`,ao=t.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,to=t.span`
  font-size: 16px;
  font-weight: 800;
  color: white;
  line-height: 1;
`,Ge=[{id:"feed",icon:_i,labelKey:"navigation.feed"},{id:"chats",icon:Gi,labelKey:"navigation.chats"},{id:"blogs",icon:He,labelKey:"navigation.blogs"},{id:"courses",icon:Ee,labelKey:"navigation.courses"}];function Hr({onSelectNav:a,onPreloadNav:o}){const{t:s}=Pe(),{selectedNav:i,setSelectedNav:n}=ni(),m=Z(c=>c.user),w=c=>{if(a){a(c);return}n(c)},P=(m==null?void 0:m.nickname)||(m==null?void 0:m.username)||"U",$=P.charAt(0).toUpperCase(),R=(m==null?void 0:m.premiumStatus)==="active",l=(m==null?void 0:m.officialBadgeKey)==="ceo"?[...Ge,{id:"admin",icon:Vi,labelKey:"navigation.admin"}]:Ge;return e.jsxs(Ut,{children:[l.map(c=>e.jsx(Zt,{$active:c.id==="chats"?["chats","users","groups","meets"].includes(i):i===c.id,onClick:()=>w(c.id),onMouseEnter:()=>o&&o(c.id),title:s(c.labelKey),children:e.jsx(c.icon,{size:20})},c.id)),e.jsx(eo,{}),e.jsx(io,{"data-tour":"nav-profile",$active:i==="profile",$premium:R,onClick:()=>w("profile"),onMouseEnter:()=>o&&o("profile"),title:`${P} — ${s("navigation.profile")}`,children:m!=null&&m.avatar?e.jsx(ao,{src:m.avatar,alt:P}):e.jsx(to,{children:$})})]})}const Si=t.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`,Se=t.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 10;
`,Ce=t.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
`,Ne=t.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`,W=t.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
`;t.div`
  padding: 12px 14px 0;
`;t.h3`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
`;t.p`
  margin: 0 0 12px;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;const re=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 24px 16px;
  color: var(--text-muted-color);
  font-size: 13px;
  gap: 10px;
  text-align: center;
`,Ci=t.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`,ze=t.button`
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
`,oo=t(ze)``,ro=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`,so=t.button`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--secondary-color);
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition:
    transform 0.16s ease,
    border-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--text-muted-color);
  }
`,no=t.div`
  height: 108px;
  background: var(--primary-color);
  background-image: ${a=>a.$image?`url(${a.$image})`:"none"};
  background-size: cover;
  background-position: center;
  color: white;
  font-size: 34px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`,lo=t.div`
  padding: 10px 12px 12px;
`,co=t.h4`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,po=t.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,zi=({courses:a,onBack:o,onOpenCourse:s})=>e.jsxs("div",{"data-tour":"profile-pane-courses",style:{display:"contents"},children:[e.jsxs(Se,{children:[e.jsx(oo,{onClick:o,children:e.jsx(ue,{size:20})}),e.jsx(Ce,{children:"Darslar"})]}),e.jsx(Ne,{children:a.length===0?e.jsxs(re,{children:[e.jsx(Ci,{children:e.jsx(Ee,{size:28,color:"var(--text-muted-color)"})}),e.jsx("span",{children:"Siz qo'shgan darslar yo'q"})]}):e.jsx(ro,{children:a.map(i=>e.jsxs(so,{onClick:()=>s(i),children:[e.jsx(no,{$image:i.image,children:!i.image&&(i.name||"?").charAt(0)}),e.jsxs(lo,{children:[e.jsx(co,{children:i.name}),e.jsx(po,{children:(i.lessonCount??(i.lessons||[]).length)>0?`${i.lessonCount??i.lessons.length} ta dars`:"Hali dars yo'q"})]})]},i._id||i.id))})})]}),uo=t(ze)`
  @media (max-width: 768px) {
    display: inline-flex;
  }
`,mo=t(ki)``,ho=t.div`
  flex: 1;
  min-height: 0;
  display: flex;
`,go=t.div`
  flex: 1;
  width: 100%;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
`,bo=t.div`
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 88%, transparent) 0%,
    color-mix(in srgb, var(--background-color) 76%, transparent) 100%
  );
`,fo=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`,xo=t.button`
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
`,vo=t(re)`
  min-height: 340px;
`,yo=t.button`
  width: 100%;
  border: none;
  background: ${a=>a.active?"linear-gradient(135deg, rgba(37,99,235,0.12), rgba(15,157,143,0.1))":"transparent"};
  border-bottom: 1px solid var(--border-color);
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
`,ko=t.div`
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
`,To=t.h3`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`,wo=t.p`
  margin: 0 0 10px;
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.5;
`,Ve=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 11px;
`,Je=t.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 18px 18px 40px;
`,Do=t.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.18);
`,Po=t.h1`
  margin: 0 0 10px;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.04;
  color: var(--text-color);
`,jo=t.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary-color);
`,So=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px;
`,Co=t.span`
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #60a5fa;
  font-size: 12px;
  font-weight: 700;
`,zo=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 18px 0 30px;
`,qi=t.button`
  border: 1px solid
    ${a=>a.active?a.activeColor||"#ef4444":"var(--border-color)"};
  background: ${a=>a.active?"rgba(239, 68, 68, 0.08)":"rgba(255,255,255,0.04)"};
  color: ${a=>a.active?a.activeColor||"#ef4444":"var(--text-secondary-color)"};
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`,ge=t(qi)`
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
`,qo=t.div`
  height: 1px;
  background: var(--border-color);
  margin: 18px 0 28px;
`,Q=t.div`
  height: ${a=>a.height||"18px"};
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
`,Lo=(a,o)=>o||String((a==null?void 0:a._id)||(a==null?void 0:a.id)||""),Li=({profileUser:a,profileUserId:o,isOwnProfile:s,onBack:i,onCountChange:n})=>{var F,z,U;const m=Z(p=>p.user),[w,P]=d.useState([]),[$,R]=d.useState(!0),[l,c]=d.useState(null),[v,j]=d.useState(""),[N,_]=d.useState(!1),[S,C]=d.useState(null),[x,M]=d.useState(!1),[g,h]=d.useState(null),[H,B]=d.useState(!1),[E,T]=d.useState(!1),G=d.useRef(new Set),A=d.useMemo(()=>Lo(a,o),[a,o]),D=(p,f)=>{P(q=>q.map(y=>y._id===p?{...y,...f}:y)),c(q=>q&&q._id===p?{...q,...f}:q)},I=async()=>{if(A){R(!0);try{const p=await vi(A);if(P(p||[]),n==null||n((p==null?void 0:p.length)||0),l!=null&&l._id){const f=(p==null?void 0:p.find(q=>q._id===l._id))||null;c(f),T(!!f),f||j("")}else T(!1);p!=null&&p.length||(c(null),j(""),T(!1))}catch{L.error("Bloglarni yuklab bo'lmadi")}finally{R(!1)}}};d.useEffect(()=>{I()},[A]),d.useEffect(()=>{if(!(l!=null&&l._id))return;(async()=>{_(!0);try{const[f,q]=await Promise.all([sa(l._id),na(l._id)]);if(D(f._id,f),c(f),j((q==null?void 0:q.content)||""),f.previouslySeen)G.current.add(f._id);else if(!G.current.has(l._id)){G.current.add(l._id);const y=await la(l._id);D(l._id,{views:(y==null?void 0:y.views)||0,previouslySeen:!0})}}catch{L.error("Blog ochilmadi")}finally{_(!1)}})()},[l==null?void 0:l._id]);const K=async p=>{B(!0);try{if(g!=null&&g._id){const f=await pa(g._id,p);D(f._id,f),c(f),j(p.markdown),L.success("Blog yangilandi")}else{const f=await ua(p);P(q=>{const y=[f,...q];return n==null||n(y.length),y}),c(f),j(p.markdown),T(!0),L.success("Blog yaratildi")}M(!1),h(null)}catch{L.error("Blogni saqlab bo'lmadi")}finally{B(!1)}},V=async()=>{if(l!=null&&l._id&&window.confirm("Blog o'chirilsinmi?"))try{await ca(l._id);const p=w.filter(f=>f._id!==l._id);P(p),c(null),j(""),T(!1),n==null||n(p.length),L.success("Blog o'chirildi")}catch{L.error("Blogni o'chirib bo'lmadi")}},ee=async p=>{try{const f=await da(p);D(p,f)}catch{L.error("Like yuborilmadi")}},ie=g&&g._id?{...g,markdown:(l==null?void 0:l._id)===g._id?v:""}:null;return e.jsxs(Si,{"data-tour":"profile-pane-blogs",children:[!E&&e.jsxs(Se,{children:[e.jsx(uo,{onClick:i,children:e.jsx(ue,{size:20})}),e.jsx(Ce,{children:"Bloglar"}),s&&e.jsx(mo,{onClick:()=>{h(null),M(!0)},title:"Yangi blog",children:e.jsx(li,{size:18})})]}),e.jsxs(ho,{children:[!E&&e.jsx(go,{children:$?e.jsxs("div",{style:{padding:"20px"},children:[e.jsx(Q,{height:"190px"}),e.jsx(Q,{height:"24px"}),e.jsx(Q,{height:"16px"}),e.jsx(Q,{height:"16px"})]}):w.length===0?e.jsxs(vo,{children:[e.jsx(He,{size:30}),e.jsx("span",{children:s?"Hali blog yo'q. Birinchi maqolangizni yarating.":"Bu foydalanuvchining hali blogi yo'q."})]}):w.map(p=>e.jsxs(yo,{active:(l==null?void 0:l._id)===p._id,onClick:()=>{c(p),T(!0)},children:[e.jsx(ko,{children:p.coverImage?e.jsx("img",{src:p.coverImage,alt:p.title}):null}),e.jsx(To,{children:p.title}),e.jsx(wo,{children:p.excerpt||"Tavsif yo'q"}),e.jsxs(Ve,{children:[e.jsx("span",{children:De(p.publishedAt||p.createdAt).format("DD MMM YYYY")}),e.jsxs("span",{children:[p.likes," like"]}),e.jsxs("span",{children:[p.comments," izoh"]}),e.jsxs("span",{children:[p.views," ko'rish"]})]})]},p._id))}),E&&l&&e.jsx(bo,{children:N?e.jsxs(Je,{children:[e.jsx(Q,{height:"320px"}),e.jsx(Q,{height:"56px"}),e.jsx(Q,{height:"20px"}),e.jsx(Q,{height:"20px"})]}):e.jsxs(Je,{children:[e.jsx(fo,{children:e.jsxs(xo,{onClick:()=>{T(!1),c(null),j("")},children:[e.jsx(ue,{size:16}),"Bloglar ro'yxati"]})}),l.coverImage?e.jsx(Do,{src:l.coverImage,alt:l.title}):null,e.jsx(Po,{children:l.title}),l.excerpt?e.jsx(jo,{children:l.excerpt}):null,((F=l.tags)==null?void 0:F.length)>0&&e.jsx(So,{children:l.tags.map(p=>e.jsxs(Co,{children:["#",p]},p))}),e.jsxs(Ve,{children:[e.jsx("span",{children:De(l.publishedAt||l.createdAt).format("DD MMMM YYYY · HH:mm")}),e.jsx("span",{children:((z=l.author)==null?void 0:z.nickname)||((U=l.author)==null?void 0:U.username)||(m==null?void 0:m.nickname)})]}),e.jsxs(zo,{children:[e.jsxs(qi,{active:l.liked,activeColor:"#ef4444",onClick:()=>ee(l._id),children:[e.jsx(je,{size:16,fill:l.liked?"#ef4444":"none"}),l.likes]}),e.jsxs(ge,{onClick:()=>C(l),children:[e.jsx(di,{size:16}),l.comments]}),e.jsxs(ge,{as:"div",children:[e.jsx(ci,{size:16}),l.views]}),s&&e.jsxs(ge,{onClick:()=>{h({...l,markdown:v}),M(!0)},children:[e.jsx(Ji,{size:16}),"Tahrirlash"]}),s&&e.jsxs(ge,{onClick:V,children:[e.jsx(pi,{size:16}),"O'chirish"]})]}),e.jsx(qo,{}),e.jsx(ta,{content:v})]})})]}),e.jsx(oa,{isOpen:x,onClose:()=>{M(!1),h(null)},onSubmit:K,initialBlog:ie,saving:H}),S&&e.jsx(ra,{blog:S,onClose:()=>C(null),onCommentsCountChange:p=>{D(S._id,{comments:p})}})]})},Me=(a="")=>{const s=String(a||"").trim().replace(/\D/g,"");if(!s.length)return"+998";let i=s;i.startsWith("998")&&(i=i.slice(3)),i=i.slice(0,9);let n="+998";return i.length>0&&(n+=` ${i.slice(0,2)}`),i.length>2&&(n+=` ${i.slice(2,5)}`),i.length>5&&(n+=` ${i.slice(5,7)}`),i.length>7&&(n+=` ${i.slice(7,9)}`),n},Mi=t.button`
  position: relative;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  margin-bottom: 22px;
`,Mo=t.div`
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
`,Bo=t.div`
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

  ${Mi}:hover & {
    opacity: 1;
  }
`,be=t.div`
  margin-bottom: 18px;
`,fe=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`,xe=t.input`
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
`,Ao=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,$o=t.button`
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
  opacity: ${a=>a.disabled?.55:1};
  pointer-events: ${a=>a.disabled?"none":"auto"};

  @media (max-width: 768px) {
    width: 100%;
  }
`,We=t.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${a=>a.$error?"#f04747":"#43b581"};
`,le=t.div`
  height: ${a=>a.$h||"16px"};
  width: ${a=>a.$w||"100%"};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.08),
    rgba(148, 163, 184, 0.18),
    rgba(148, 163, 184, 0.08)
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  margin-bottom: ${a=>a.$mb||"12px"};

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`,Bi=({isOpen:a,onClose:o})=>{var x,M;const s=Z(g=>g.user),i=Z(g=>g.setAuth),[n,m]=d.useState({nickname:"",username:"",phone:"+998",avatar:"",bio:"",premiumStatus:"none",premiumExpiresAt:null}),[w,P]=d.useState(!1),[$,R]=d.useState(!1),[l,c]=d.useState(null),[v,j]=d.useState(!1),N=d.useRef(null);if(d.useEffect(()=>{if(!a)return;(async()=>{P(!0);try{const{data:h}=await oe.get("/users/me");m({nickname:h.nickname||"",username:h.username||"",phone:Me(h.phone),avatar:h.avatar||"",bio:h.bio||"",premiumStatus:h.premiumStatus||"none",premiumExpiresAt:h.premiumExpiresAt}),i({...s||{},...h})}catch{m({nickname:(s==null?void 0:s.nickname)||"",username:(s==null?void 0:s.username)||"",phone:Me(s==null?void 0:s.phone),avatar:(s==null?void 0:s.avatar)||"",bio:(s==null?void 0:s.bio)||"",premiumStatus:(s==null?void 0:s.premiumStatus)||"none",premiumExpiresAt:(s==null?void 0:s.premiumExpiresAt)||null})}finally{P(!1)}})()},[a]),!a)return null;const _=()=>n.nickname&&(n.nickname.length<3||n.nickname.length>30)?"Nickname 3 tadan 30 tagacha belgi bo'lishi kerak":n.username&&!/^[a-zA-Z0-9]{8,30}$/.test(n.username)?"Username kamida 8 ta harf va raqamdan iborat bo'lishi kerak":n.bio&&n.bio.length>30?"Haqida (Bio) ko'pi bilan 30 ta belgi bo'lishi kerak":n.phone&&!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(n.phone)?"Telefon raqam '+998 XX XXX XX XX' formatida bo'lishi kerak":null,S=async()=>{var h,H,B,E;const g=_();if(g){c(g),setTimeout(()=>c(null),3e3);return}R(!0),c(null);try{const{premiumStatus:T,premiumExpiresAt:G,phone:A,...D}=n,{data:I}=await oe.patch("/users/me",{...D,phone:(A||"").replace(/\s/g,"")});i({...s||{},...I}),m(K=>({...K,...I})),c("ok"),setTimeout(()=>{c(null),o==null||o()},900)}catch(T){const G=Array.isArray((H=(h=T==null?void 0:T.response)==null?void 0:h.data)==null?void 0:H.message)?T.response.data.message[0]:((E=(B=T==null?void 0:T.response)==null?void 0:B.data)==null?void 0:E.message)||"Tarmoq xatosi yuz berdi";c(G),setTimeout(()=>c(null),3e3)}finally{R(!1)}},C=async g=>{var B;const h=(B=g.target.files)==null?void 0:B[0];if(!h)return;if(h.size>2*1024*1024){L.error("Fayl hajmi juda katta (maksimum 2MB)");return}const H=new FormData;H.append("file",h),j(!0);try{const{data:E}=await oe.post("/users/avatar",H);m(T=>({...T,avatar:E.avatar})),i({...s||{},...E}),L.success("Avatar yangilandi")}catch{L.error("Avatar yuklashda xatolik")}finally{j(!1)}};return e.jsx(fa,{onClick:o,$overlay:"rgba(0, 0, 0, 0.78)",$backdrop:"blur(8px)",$zIndex:12e3,children:e.jsxs(xa,{$width:"min(100%, 560px)",$maxHeight:"min(88vh, 760px)",$radius:"22px",$mobileFull:!0,"data-tour":"profile-edit-dialog",onClick:g=>g.stopPropagation(),children:[e.jsxs(va,{$padding:"18px 20px",children:[e.jsx(ya,{$size:"18px",children:"Profilni tahrirlash"}),e.jsx(ka,{onClick:o,children:e.jsx(Wi,{size:18})})]}),e.jsx(Ta,{$padding:"22px 20px 24px",children:w?e.jsxs(e.Fragment,{children:[e.jsx(le,{$h:"92px",$w:"92px",$mb:"22px"}),e.jsx(le,{}),e.jsx(le,{}),e.jsx(le,{$h:"64px"}),e.jsx(le,{})]}):e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"file",ref:N,hidden:!0,accept:"image/*",onChange:C}),e.jsxs(Mi,{type:"button",onClick:()=>{var g;return(g=N.current)==null?void 0:g.click()},title:"Avatarni o'zgartirish",children:[e.jsx(Mo,{children:v?e.jsx(Ye,{size:30,style:{animation:"spin 1s linear infinite"}}):n.avatar?e.jsx("img",{src:n.avatar,alt:"avatar"}):(n.nickname||n.username||"?").charAt(0).toUpperCase()}),e.jsx(Bo,{children:e.jsx(ui,{size:20})})]}),e.jsxs(be,{children:[e.jsxs(fe,{children:["Nickname",n.premiumStatus==="active"&&e.jsx(Ti,{width:14,height:14})]}),e.jsx(xe,{value:n.nickname,onChange:g=>m(h=>({...h,nickname:g.target.value.slice(0,J.nicknameChars)})),placeholder:"Nickname",maxLength:J.nicknameChars})]}),e.jsxs(be,{children:[e.jsx(fe,{children:"Username"}),e.jsx(xe,{value:n.username,onChange:g=>m(h=>({...h,username:g.target.value.toLowerCase().slice(0,J.usernameChars)})),placeholder:"username",maxLength:J.usernameChars})]}),e.jsxs(be,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx(fe,{children:"Haqida (Bio)"}),e.jsxs("span",{style:{fontSize:"11px",color:(((x=n.bio)==null?void 0:x.length)||0)>J.bioChars?"#f04747":"var(--text-muted-color)"},children:[((M=n.bio)==null?void 0:M.length)||0,"/",J.bioChars]})]}),e.jsx(xe,{as:"textarea",rows:2,value:n.bio||"",onChange:g=>m(h=>({...h,bio:g.target.value.slice(0,J.bioChars)})),placeholder:"O'zingiz haqingizda qisqacha yozing...",maxLength:J.bioChars,style:{resize:"none",minHeight:76,paddingTop:12}})]}),e.jsxs(be,{children:[e.jsx(fe,{children:"Telefon raqam"}),e.jsx(xe,{value:n.phone||"+998",onChange:g=>{m(h=>({...h,phone:Me(g.target.value)}))},placeholder:"+998 90 000 00 00"})]}),e.jsxs(Ao,{children:[e.jsxs($o,{onClick:S,disabled:$||v,children:[$?e.jsx(Ye,{size:14}):e.jsx(Ke,{size:14}),$?"Saqlanmoqda...":"Saqlash"]}),l==="ok"&&e.jsxs(We,{children:[e.jsx(Ke,{size:13}),"Muvaffaqiyatli saqlandi"]}),l&&l!=="ok"&&e.jsxs(We,{$error:!0,children:[e.jsx(Qi,{size:13}),l]})]})]})})]})})},Ro=t.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background: var(--background-color);
`,Ho=t.div`
  flex: 1;
  height: 100vh;
  display: ${a=>a.$visible?"flex":"none"};
  flex-direction: column;
  background: var(--background-color);
  overflow-y: auto;
  border-left: 1px solid var(--border-color);
  position: relative;

  ${a=>a.$focused?`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 72px;
    width: calc(100vw - 72px);
    height: 100vh;
    z-index: 1500;
    border-left: none;
    box-shadow: 0 0 0 1px var(--border-color), 0 24px 80px rgba(0, 0, 0, 0.28);
  `:""}

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
`,Eo=({profileUserId:a,isFocused:o=!1,onToggleFocus:s})=>{const{t:i}=Pe(),n=Z(u=>u.user),{userPosts:m,fetchUserPosts:w,createPost:P,editPost:$,deletePost:R,likePost:l,getPublicProfile:c,toggleFollow:v}=yi(),{courses:j}=wi(),N=si(),_=window.innerWidth<=768,[S,C]=d.useState(()=>{const u=sessionStorage.getItem("profile_initial_tab");return u?(sessionStorage.removeItem("profile_initial_tab"),u):_?null:"groups"}),[x,M]=d.useState(!1),[g,h]=d.useState(!1),[H,B]=d.useState(null),[E,T]=d.useState(!1),[G,A]=d.useState(0),[D,I]=d.useState(null),[K,V]=d.useState(null),[ee,ie]=d.useState(!1),F=(n==null?void 0:n._id)||(n==null?void 0:n.id),z=!a||a===F;d.useEffect(()=>{if(z){F&&w(F);return}c(a).then(u=>{u&&(B(u),T(u.isFollowing))}),w(a)},[a,F,z,w,c]),d.useEffect(()=>{const u=z?F:a;if(!u){A(0);return}vi(u).then(Y=>A((Y==null?void 0:Y.length)||0)).catch(()=>A(0))},[z,F,a]),d.useEffect(()=>{if(!z)return;const u=sessionStorage.getItem("jamm-tour-profile-autostart")==="1";if(!u&&localStorage.getItem("jamm-tour-profile-v1")==="done")return;const Y=window.setTimeout(()=>{C(null),ie(!0)},450);return u&&sessionStorage.removeItem("jamm-tour-profile-autostart"),()=>window.clearTimeout(Y)},[z]);const U=async u=>{await P(u),F&&w(F)},p=async u=>{D!=null&&D._id&&(await $(D._id,u),I(null))},f=async()=>{K!=null&&K._id&&(await R(K._id),V(null))},q=async()=>{const u=await v(a);u&&(T(u.following),B(Y=>Y&&{...Y,followersCount:u.followersCount}))},y=d.useMemo(()=>z?n:H,[n,z,H]),me=d.useMemo(()=>y?j.filter(u=>{if(!(u!=null&&u.createdBy))return!1;const Y=typeof u.createdBy=="string"?u.createdBy:u.createdBy._id||u.createdBy.id;return String(Y)===String(y._id||y.id)}):[],[j,y]);if(!n||!z&&!H||!y)return null;const se=y.nickname||y.username||"Foydalanuvchi",qe=y.premiumStatus==="active",Le=z?n.avatar:y.avatar;return e.jsxs(Ro,{children:[e.jsx($i,{activeTab:S,onTabChange:C,targetUser:y,isOwnProfile:z,isFollowing:E,blogCount:G,postCount:m.length,courseCount:me.length,onToggleFollow:q,onOpenProfileEdit:()=>h(!0),onOpenDirectMessage:()=>{const u=y.jammId||y._id;N(`/a/${u}`)}}),S?e.jsx(ja,{$focused:o,children:e.jsx(Sa,{type:"button",onClick:s,title:i(o?"layout.minimizePane":"layout.maximizePane"),"aria-label":i(o?"layout.minimizePane":"layout.maximizePane"),children:o?e.jsx(Xi,{size:18}):e.jsx(mi,{size:18})})}):null,e.jsxs(Ho,{$visible:!!S,$focused:o,children:[S==="groups"?e.jsx(Ai,{posts:m,isOwnProfile:z,userAvatar:Le,displayName:se,isPremium:qe,formatTime:u=>De(u).format("D-MMM · HH:mm"),renderText:ma,likePost:l,onEditPost:I,onDeletePost:V,onCreatePost:()=>M(!0),onBack:()=>C(null)}):null,S==="courses"?e.jsx(zi,{courses:me,onBack:()=>C(null),onOpenCourse:u=>N(`/courses/${u.urlSlug||u.id||u._id}`)}):null,S==="blogs"?e.jsx(Li,{profileUser:y,profileUserId:a,isOwnProfile:z,onBack:()=>C(null),onCountChange:A}):null,z&&["appearance","language","premium","support","favorites"].includes(S)?e.jsx(Ri,{section:S,currentUser:n,onBack:()=>C(null)}):null]}),e.jsx(ha,{isOpen:x||!!D,onClose:()=>{M(!1),I(null)},onSubmit:D?p:U,currentUser:n,initialContent:(D==null?void 0:D.content)||"",title:D?"Gurungni tahrirlash":"Yangi Gurung",submitLabel:D?"Saqlash":"Yuborish"}),e.jsx(Bi,{isOpen:g,onClose:()=>h(!1)}),e.jsx(ba,{isOpen:!!K,onClose:()=>V(null),title:"Gurungni o'chirish",description:"Bu gurung o'chirilsa, uni qayta tiklab bo'lmaydi.",confirmText:"O'chirish",cancelText:"Bekor qilish",onConfirm:f,isDanger:!0}),e.jsx(wa,{isOpen:ee,onClose:()=>{ie(!1),h(!1)},storageKey:"jamm-tour-profile-v1",onStepChange:u=>{if(C(null),u===10){h(!0);return}h(!1)},steps:[{selector:'[data-tour="profile-overview"]',title:i("featureTour.profile.overviewTitle"),description:i("featureTour.profile.overviewDescription")},{selector:'[data-tour="profile-tab-groups"]',title:i("featureTour.profile.groupsTabTitle"),description:i("featureTour.profile.groupsTabDescription")},{selector:'[data-tour="profile-tab-courses"]',title:i("featureTour.profile.coursesTabTitle"),description:i("featureTour.profile.coursesTabDescription")},{selector:'[data-tour="profile-tab-blogs"]',title:i("featureTour.profile.blogsTabTitle"),description:i("featureTour.profile.blogsTabDescription")},{selector:'[data-tour="profile-tab-appearance"]',title:i("featureTour.profile.appearanceTabTitle"),description:i("featureTour.profile.appearanceTabDescription")},{selector:'[data-tour="profile-tab-language"]',title:i("featureTour.profile.languageTabTitle"),description:i("featureTour.profile.languageTabDescription")},{selector:'[data-tour="profile-tab-premium"]',title:i("featureTour.profile.premiumTabTitle"),description:i("featureTour.profile.premiumTabDescription")},{selector:'[data-tour="profile-tab-support"]',title:i("featureTour.profile.supportTabTitle"),description:i("featureTour.profile.supportTabDescription")},{selector:'[data-tour="profile-tab-favorites"]',title:i("featureTour.profile.favoritesTabTitle"),description:i("featureTour.profile.favoritesTabDescription")},{selector:'[data-tour="profile-edit-trigger"]',title:i("featureTour.profile.editTriggerTitle"),description:i("featureTour.profile.editTriggerDescription"),onNext:async()=>{h(!0)}},{selector:'[data-tour="profile-edit-dialog"]',title:i("featureTour.profile.editDialogTitle"),description:i("featureTour.profile.editDialogDescription"),onNext:async()=>{h(!1)}}]})]})},Fo=t(ze)``,Oo=t(ki)``,No=t.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  transition: background 0.15s;

  &:hover {
    background: var(--hover-color);
  }

  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`,Io=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,Yo=t.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Ko=t.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0 0 2px;
    color: var(--text-color);
    font-size: 13px;
    font-weight: 700;
  }

  span {
    color: var(--text-muted-color);
    font-size: 11px;
  }
`,_o=t.div`
  color: var(--text-color);
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }
`,Go=t.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
`,de=t.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${a=>a.$active?a.$activeColor||"#ed4245":"var(--text-muted-color)"};
  font-size: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
`,Vo=t.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`,Ai=({posts:a,isOwnProfile:o,userAvatar:s,displayName:i,isPremium:n,formatTime:m,renderText:w,likePost:P,onEditPost:$,onDeletePost:R,onCreatePost:l,onBack:c})=>e.jsxs("div",{"data-tour":"profile-pane-groups",style:{display:"contents"},children:[e.jsxs(Se,{children:[e.jsx(Fo,{onClick:c,children:e.jsx(ue,{size:20})}),e.jsx(Ce,{children:"Gurunglar"}),o?e.jsx(Oo,{onClick:l,title:"Gurung yarating",children:e.jsx(li,{size:16})}):null]}),a.length===0?e.jsx(Ne,{children:e.jsxs(re,{children:[e.jsx(Ci,{children:e.jsx(Fe,{size:28,color:"var(--text-muted-color)"})}),e.jsx("span",{children:"Birinchi gurungi yozing!"})]})}):a.map(v=>e.jsxs(No,{children:[e.jsxs(Io,{children:[e.jsx(Yo,{children:s?e.jsx("img",{src:s,alt:i}):i.charAt(0).toUpperCase()}),e.jsxs(Ko,{children:[e.jsxs("h4",{children:[i,e.jsx(Ti,{isPremium:n})]}),e.jsx("span",{children:m(v.createdAt)})]})]}),e.jsx(_o,{children:w(v.content)}),e.jsxs(Go,{children:[e.jsxs(de,{$active:v.liked,$activeColor:"#ed4245",onClick:()=>P(v._id),children:[e.jsx(je,{size:16,fill:v.liked?"#ed4245":"none"}),v.likes]}),e.jsxs(de,{$activeColor:"#5865f2",children:[e.jsx(di,{size:16}),v.comments]}),e.jsxs(de,{$activeColor:"var(--text-muted-color)",children:[e.jsx(ci,{size:16}),v.views]})]}),o?e.jsxs(Vo,{children:[e.jsxs(de,{$activeColor:"var(--primary-color)",onClick:()=>$(v),children:[e.jsx(hi,{size:16}),"Tahrirlash"]}),e.jsxs(de,{$activeColor:"#ed4245",onClick:()=>R(v),children:[e.jsx(pi,{size:16}),"O'chirish"]})]}):null]},v._id))]}),Jo=Zi`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,Wo=t.aside`
  width: 340px;
  height: 100vh;
  background: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  animation: ${Jo} 0.3s ease;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`,Qo=t.div`
  position: relative;
  height: 132px;
  background: var(--primary-color);
  flex-shrink: 0;
`,Xo=t.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
`,Uo=t.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  border: none;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`,Zo=t.div`
  position: relative;
  width: 76px;
  height: 76px;
  margin: -38px 0 0 18px;
  z-index: 2;
`,er=t.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 3px solid var(--secondary-color);
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,ir=t.div`
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 2px solid var(--secondary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`,ar=t.div`
  padding: 12px 18px 0;
`,tr=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`,or=t.h2`
  margin: 0 0 2px;
  color: var(--text-color);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
`,rr=t.div`
  color: var(--text-muted-color);
  font-size: 13px;
  margin-bottom: 10px;
`,sr=t.p`
  margin: 0 0 14px;
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.55;
`,nr=t.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted-color);
  margin-bottom: 14px;
  font-size: 12px;
`,lr=t.div`
  display: flex;
  gap: 8px;
  padding: 0 18px 14px;
`,Qe=t.button`
  flex: 1;
  min-height: 36px;
  border-radius: 8px;
  border: 1px solid
    ${a=>a.$primary?"var(--primary-color)":"var(--border-color)"};
  background: ${a=>a.$primary?"var(--primary-color)":"var(--input-color)"};
  color: ${a=>a.$primary?"white":"var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`,dr=t.div`
  height: 18px;
`,cr=t.div`
  display: flex;
  align-items: center;
  margin: 0 18px 16px;
  padding: 14px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`,pr=t.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border-right: 1px solid var(--border-color);

  &:last-child {
    border-right: none;
  }
`,ur=t.div`
  color: var(--text-color);
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
`,mr=t.div`
  color: var(--text-muted-color);
  font-size: 12px;
`,hr=t.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 18px;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    padding-bottom: 80px; /* Space for mobile bottom navigation */
  }
`,Xe=t.div`
  display: flex;
  flex-direction: column;
  margin: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
  overflow: hidden;
`,Ue=t.button`
  width: 100%;
  min-height: 52px;
  padding: 10px 14px;
  border: none;
  background: ${a=>a.$active?"var(--hover-color)":"transparent"};
  color: var(--text-color);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 52px;
    right: 0;
    bottom: 0;
    height: 1px;
    background: var(--border-color);
    opacity: 0.3;
  }
`,Ze=t.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${a=>a.$active?"var(--hover-color)":"var(--input-color)"};
  color: ${a=>a.$active?"var(--text-color)":"var(--text-secondary-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,ei=t.span`
  flex: 1;
  text-align: left;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  padding-top: 3px;
`,ii=t(mi)`
  color: var(--text-muted-color);
  opacity: 0.5;
  flex-shrink: 0;
  margin-top: 5px;
`,gr=[{key:"groups",labelKey:"profile.tabs.groups",icon:Fe,color:"#3ba55d"},{key:"blogs",labelKey:"profile.tabs.blogs",icon:He,color:"#2563eb"},{key:"courses",labelKey:"profile.tabs.courses",icon:Ee,color:"#f59e0b"}],br=[{key:"appearance",labelKey:"profile.tabs.appearance",icon:gi,color:"#5865f2"},{key:"language",labelKey:"profile.tabs.language",icon:bi,color:"#0ea5e9"},{key:"premium",labelKey:"profile.tabs.premium",icon:fi,color:"#f59e0b"},{key:"support",labelKey:"profile.tabs.support",icon:xi,color:"#16a34a"},{key:"favorites",labelKey:"profile.tabs.favorites",icon:je,color:"#ec4899"}],$i=({activeTab:a,onTabChange:o,targetUser:s,isOwnProfile:i,isFollowing:n,blogCount:m,postCount:w,courseCount:P,onToggleFollow:$,onOpenProfileEdit:R,onOpenDirectMessage:l})=>{var C;const{t:c}=Pe(),v=(s==null?void 0:s.nickname)||(s==null?void 0:s.username)||c("common.userFallback"),j=`@${((s==null?void 0:s.username)||"user").toLowerCase()}`,N=v.charAt(0).toUpperCase(),_=s==null?void 0:s.avatar,S=[{value:i?((C=s==null?void 0:s.followers)==null?void 0:C.length)||"0":String((s==null?void 0:s.followersCount)||0),label:c("profile.stats.members")},{value:String(w),label:c("profile.stats.posts")},{value:String(m),label:c("profile.stats.blogs")},{value:String(P),label:c("profile.stats.courses")}];return e.jsxs(Wo,{"data-tour":"profile-overview",children:[e.jsxs(Qo,{children:[e.jsx(Xo,{}),i?e.jsx(Uo,{title:c("profile.settings"),onClick:R,"data-tour":"profile-edit-trigger",children:e.jsx(hi,{size:16})}):null]}),e.jsxs(Zo,{children:[e.jsx(er,{children:_?e.jsx("img",{src:_,alt:v}):N}),i?e.jsx(ir,{title:c("profile.avatarChange"),children:e.jsx(ui,{size:10})}):null]}),e.jsxs(ar,{children:[e.jsx(tr,{children:e.jsx(or,{as:"div",children:e.jsx(we,{user:s,fallback:c("common.userFallback"),size:"lg"})})}),e.jsx(rr,{children:j}),e.jsx(sr,{children:(s==null?void 0:s.bio)||c(i?"profile.bioMissingOwn":"profile.bioMissingOther")}),e.jsxs(nr,{children:[e.jsx(Ui,{size:13}),e.jsx("span",{children:s!=null&&s.createdAt?new Date(s.createdAt).toLocaleDateString("uz-UZ"):""})]})]}),i?null:e.jsxs(lr,{children:[e.jsx(Qe,{$primary:!n,onClick:$,children:c(n?"profile.following":"profile.follow")}),e.jsxs(Qe,{onClick:l,children:[e.jsx(Fe,{size:15}),c("common.message")]})]}),e.jsx(dr,{}),e.jsx(cr,{children:S.map(x=>e.jsxs(pr,{children:[e.jsx(ur,{children:x.value}),e.jsx(mr,{children:x.label})]},x.label))}),e.jsxs(hr,{children:[e.jsx(Xe,{children:gr.map(x=>{const M=x.icon;return e.jsxs(Ue,{$active:a===x.key,onClick:()=>o(x.key),"data-tour":`profile-tab-${x.key}`,children:[e.jsx(Ze,{$active:a===x.key,children:e.jsx(M,{size:15})}),e.jsx(ei,{children:c(x.labelKey)}),e.jsx(ii,{size:16})]},x.key)})}),i?e.jsx(Xe,{children:br.map(x=>{const M=x.icon;return e.jsxs(Ue,{$active:a===x.key,onClick:()=>o(x.key),"data-tour":`profile-tab-${x.key}`,children:[e.jsx(Ze,{$active:a===x.key,children:e.jsx(M,{size:15})}),e.jsx(ei,{children:c(x.labelKey)}),e.jsx(ii,{size:16})]},x.key)})}):null]})]})},fr=t(ze)``,X=t.div`
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
`,ce=t.div`
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 12px;
  row-gap: 4px;
  align-items: start;

  & > :last-child {
    width: auto;
    min-width: ${a=>a.$wideControl?"220px":"96px"};
    max-width: ${a=>a.$wideControl?"none":"140px"};
    justify-self: end;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: start;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;

    & > :last-child {
      justify-self: stretch;
      width: 100%;
      max-width: none;
      grid-column: auto;
      grid-row: auto;
    }
  }
`,pe=t.div`
  min-width: 0;
  display: contents;

  strong {
    display: block;
    grid-column: 1;
    color: var(--text-color);
    font-size: 13px;
    line-height: 1.3;
  }

  span {
    display: block;
    grid-column: 1;
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
    margin-top: 1px;
  }

  @media (max-width: 768px) {
    display: grid;
    gap: 3px;

    strong,
    span {
      grid-column: auto;
    }
  }
`,ai=t.select`
  width: auto;
  min-width: 96px;
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
`,ti=t.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 10px;
  min-width: 96px;
  border-radius: 999px;
  background: ${a=>a.$active?"rgba(250, 166, 26, 0.12)":"rgba(88,101,242,0.08)"};
  color: ${a=>a.$active?"#faa61a":"var(--primary-color)"};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`,xr=t.div`
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
`,vr=t.input`
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
`,ae=t.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: none;
  background: ${a=>a.$secondary?"var(--input-color)":"var(--primary-color)"};
  color: ${a=>a.$secondary?"var(--text-color)":"white"};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${a=>a.disabled?.55:1};
  pointer-events: ${a=>a.disabled?"none":"auto"};
  white-space: nowrap;
`,yr=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
`,ve=t.button`
  text-align: left;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid
    ${a=>a.$active?"var(--primary-color)":"var(--border-color)"};
  background: ${a=>a.$active?"rgba(88,101,242,0.08)":"var(--secondary-color)"};
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ye=t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 13px;
  font-weight: 700;
`,kr=t.div`
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`,ke=t.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`,Tr=t.input`
  display: none;
`,wr=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
`,oi=t.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid
    ${a=>a.$premium?"rgba(250, 166, 26, 0.35)":"var(--border-color)"};
  background: ${a=>a.$premium?"linear-gradient(180deg, rgba(250,166,26,0.08), rgba(255,255,255,0.02))":"var(--secondary-color)"};
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ri=t.div`
  color: ${a=>a.$premium?"#faa61a":"var(--text-color)"};
  font-size: 14px;
  font-weight: 700;
`,Dr=t.div`
  color: var(--text-color);
  font-size: 22px;
  font-weight: 800;
`,Te=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`,Be=t.div`
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
`,Pr=t.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Ae=t.button`
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
`,$e=t.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
`,Re=t.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`,Ri=({section:a,currentUser:o,onBack:s})=>{const{t:i,i18n:n}=Pe(),{theme:m,toggleTheme:w}=Ca(),{getUserByUsername:P,createChat:$,fetchChats:R}=ni(),{fetchLikedPosts:l}=yi(),{fetchLikedLessons:c}=wi(),v=si(),j=Z(r=>r.user),N=Z(r=>r.setAuth),_=_e(r=>r.decorations),S=_e(r=>r.fetchDecorations),[C,x]=d.useState(()=>te(n.resolvedLanguage||localStorage.getItem("language")||"uz")),[M,g]=d.useState([]),[h,H]=d.useState(!1),[B,E]=d.useState(""),[T,G]=d.useState(!1),[A,D]=d.useState(!1),[I,K]=d.useState(!1),V=d.useRef(null),[ee,ie]=d.useState([]),[F,z]=d.useState([]),[U,p]=d.useState([]),[f,q]=d.useState(!1),y=d.useMemo(()=>[{value:"uz",label:i("language.uz")},{value:"en",label:i("language.en")},{value:"ru",label:i("language.ru")}],[i]),me=d.useMemo(()=>[{value:"dark",label:i("theme.dark")},{value:"light",label:i("theme.light")}],[i]),se=d.useMemo(()=>({appearance:{icon:gi,title:i("profileUtility.sections.appearance.title"),description:i("profileUtility.sections.appearance.description")},language:{icon:bi,title:i("profileUtility.sections.language.title"),description:i("profileUtility.sections.language.description")},premium:{icon:fi,title:i("profileUtility.sections.premium.title"),description:i("profileUtility.sections.premium.description")},support:{icon:xi,title:i("profileUtility.sections.support.title"),description:i("profileUtility.sections.support.description")},favorites:{icon:je,title:i("profileUtility.sections.favorites.title"),description:i("profileUtility.sections.favorites.description")}}),[i]),qe=d.useMemo(()=>se[a]||se.appearance,[a,se]);d.useEffect(()=>{if(a!=="language")return;const r=te(C);r!==te(n.resolvedLanguage)&&(localStorage.setItem("language",r),n.changeLanguage(r))},[n,C,a]),d.useEffect(()=>{const r=te(n.resolvedLanguage);x(b=>b===r?b:r)},[n.resolvedLanguage]),d.useEffect(()=>{if(a!=="premium")return;(async()=>{H(!0);try{const{data:b}=await oe.get("/premium/plans");g(Array.isArray(b)?b:[])}catch{g([])}finally{H(!1)}})(),S()},[S,a]),d.useEffect(()=>{if(a!=="favorites")return;(async()=>{q(!0);try{const[b,k,O]=await Promise.all([l(),ga(),c()]);ie(Array.isArray(b)?b:[]),z(Array.isArray(k)?k:[]),p(Array.isArray(O)?O:[])}finally{q(!1)}})()},[c,l,a]);const Le=async()=>{const{data:r}=await oe.get("/users/me");N({...j||{},...r})},u=async r=>{try{const b=await P(r);if(!b)return;const k=await $({isGroup:!1,memberIds:[b._id||b.id]});await R(),v(`/groups/${k.urlSlug||k.jammId||k._id||k.id}`)}catch{L.error(i("profileUtility.support.chatError"))}},Y=async()=>{var r,b;if(B.trim()){G(!0);try{await oe.post("/premium/redeem",{code:B.trim()}),await Le(),E(""),L.success(i("profileUtility.premium.activated"))}catch(k){L.error(((b=(r=k==null?void 0:k.response)==null?void 0:r.data)==null?void 0:b.message)||i("profileUtility.premium.invalidPromo"))}finally{G(!1)}}},he=async r=>{var b,k;if(!A){D(!0);try{const O=await Da(r);N({...j||{},...O}),L.success(i(r?"profileUtility.premium.decorationSaved":"profileUtility.premium.decorationCleared"))}catch(O){L.error(((k=(b=O==null?void 0:O.response)==null?void 0:b.data)==null?void 0:k.message)||i("profileUtility.premium.decorationError"))}finally{D(!1)}}},Hi=async r=>{var k,O,Ie;const b=(k=r.target.files)==null?void 0:k[0];if(r.target.value="",!(!b||I)){K(!0);try{const ne=await Pa(b);N({...j||{},...ne}),L.success(i("profileUtility.premium.decorationImageSaved"))}catch(ne){L.error(((Ie=(O=ne==null?void 0:ne.response)==null?void 0:O.data)==null?void 0:Ie.message)||i("profileUtility.premium.decorationImageError"))}finally{K(!1)}}},Ei=async()=>{var r,b;if(!(o!=null&&o.customProfileDecorationImage)||I){(r=V.current)==null||r.click();return}if((o==null?void 0:o.selectedProfileDecorationId)!=="custom-upload"){await he("custom-upload");return}(b=V.current)==null||b.click()},Fi=()=>e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.appearance.groupTitle")}),e.jsx("p",{children:i("profileUtility.appearance.groupDescription")})]}),e.jsxs(ce,{children:[e.jsxs(pe,{children:[e.jsx("strong",{children:i("profileUtility.appearance.themeLabel")}),e.jsx("span",{children:i("profileUtility.appearance.themeDescription")})]}),e.jsx(ai,{value:m,onChange:r=>w(r.target.value),children:me.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]})]}),Oi=()=>e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.language.groupTitle")}),e.jsx("p",{children:i("profileUtility.language.groupDescription")})]}),e.jsxs(ce,{children:[e.jsxs(pe,{children:[e.jsx("strong",{children:i("profileUtility.language.languageLabel")}),e.jsx("span",{children:i("profileUtility.language.languageDescription")})]}),e.jsx(ai,{value:C,onChange:r=>x(r.target.value),children:y.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))})]}),e.jsxs(ce,{children:[e.jsxs(pe,{children:[e.jsx("strong",{children:i("profileUtility.language.regionLabel")}),e.jsx("span",{children:i("profileUtility.language.regionDescription")})]}),e.jsx(ti,{children:i("common.global")})]})]}),Ni=()=>e.jsxs(e.Fragment,{children:[e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.premium.statusTitle")}),e.jsx("p",{children:i("profileUtility.premium.statusDescription")})]}),e.jsxs(ce,{children:[e.jsxs(pe,{children:[e.jsx("strong",{children:i("profileUtility.premium.statusLabel")}),e.jsx("span",{children:i("profileUtility.premium.statusMeta")})]}),e.jsxs(ti,{$active:(o==null?void 0:o.premiumStatus)==="active",children:[e.jsx(ea,{size:14}),(o==null?void 0:o.premiumStatus)==="active"?i("common.active"):i("profileUtility.premium.freeAccount")]})]}),e.jsxs(ce,{$wideControl:!0,children:[e.jsxs(pe,{children:[e.jsx("strong",{children:i("profileUtility.premium.promoLabel")}),e.jsx("span",{children:i("profileUtility.premium.promoDescription")})]}),e.jsxs(xr,{children:[e.jsx(vr,{value:B,onChange:r=>E(r.target.value),placeholder:i("profileUtility.premium.promoPlaceholder")}),e.jsxs(ae,{disabled:T||!B.trim(),onClick:Y,children:[e.jsx(ia,{size:14}),i(T?"profileUtility.premium.checking":"common.activate")]})]})]})]}),e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.premium.plansTitle")}),e.jsx("p",{children:i("profileUtility.premium.plansDescription")})]}),e.jsx("div",{style:{padding:"0 14px 14px"},children:e.jsxs(wr,{children:[M.map(r=>e.jsxs(oi,{$premium:!0,children:[e.jsx(ri,{$premium:!0,children:r.name}),e.jsxs(Dr,{children:["$",r.price]}),e.jsxs("div",{style:{color:"var(--text-muted-color)",fontSize:12},children:[r.durationInDays," ",i("profileUtility.premium.days")]}),e.jsx(ae,{onClick:()=>u("premium"),children:i("profileUtility.premium.contactPremium")})]},r._id)),!M.length&&!h&&e.jsxs(oi,{children:[e.jsx(ri,{children:"Premium"}),e.jsx("div",{style:{color:"var(--text-muted-color)",fontSize:12},children:i("profileUtility.premium.plansUnavailable")}),e.jsx(ae,{onClick:()=>u("premium"),children:i("common.contact")})]})]})})]}),e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.premium.decorationTitle")}),e.jsx("p",{children:i("profileUtility.premium.decorationDescription")})]}),e.jsx("div",{style:{padding:"0 14px 14px"},children:(o==null?void 0:o.premiumStatus)==="active"?e.jsx(e.Fragment,{children:e.jsxs(yr,{children:[e.jsxs(ve,{type:"button",$active:(o==null?void 0:o.selectedProfileDecorationId)==="premium-badge",onClick:()=>he("premium-badge"),disabled:A,children:[e.jsx(ye,{children:e.jsx(we,{user:{nickname:(o==null?void 0:o.nickname)||(o==null?void 0:o.username)||i("common.userFallback"),username:o==null?void 0:o.username,premiumStatus:"active",selectedProfileDecorationId:"premium-badge"},fallback:i("common.userFallback")})}),e.jsx(ke,{children:i("profileUtility.premium.decorationBadgeMeta")})]}),e.jsxs(ve,{type:"button",$active:!(o!=null&&o.selectedProfileDecorationId),onClick:()=>he(null),disabled:A,children:[e.jsxs(ye,{children:[e.jsx(kr,{children:"∅"}),e.jsx("span",{children:i("profileUtility.premium.decorationNone")})]}),e.jsx(ke,{children:i("profileUtility.premium.decorationNoneMeta")})]}),e.jsxs(ve,{type:"button",$active:(o==null?void 0:o.selectedProfileDecorationId)==="custom-upload",onClick:Ei,disabled:I||A,children:[e.jsx(Tr,{ref:V,type:"file",accept:"image/*",onChange:Hi}),e.jsx(ye,{children:e.jsx(we,{user:{nickname:(o==null?void 0:o.nickname)||(o==null?void 0:o.username)||i("common.userFallback"),username:o==null?void 0:o.username,premiumStatus:o==null?void 0:o.premiumStatus,selectedProfileDecorationId:o!=null&&o.customProfileDecorationImage?"custom-upload":null,customProfileDecorationImage:(o==null?void 0:o.customProfileDecorationImage)||null},fallback:i("common.userFallback")})}),e.jsx(ke,{children:I?i("profileUtility.premium.decorationImageUploading"):o!=null&&o.customProfileDecorationImage?i("profileUtility.premium.decorationImageReplace"):i("profileUtility.premium.decorationImageUpload")})]}),_.map(r=>e.jsxs(ve,{type:"button",$active:(o==null?void 0:o.selectedProfileDecorationId)===r.key,onClick:()=>he(r.key),disabled:A,children:[e.jsx(ye,{children:e.jsx(we,{user:{nickname:(o==null?void 0:o.nickname)||(o==null?void 0:o.username)||i("common.userFallback"),username:o==null?void 0:o.username,premiumStatus:o==null?void 0:o.premiumStatus,selectedProfileDecorationId:r.key},fallback:i("common.userFallback")})}),e.jsx(ke,{children:r.label})]},r.key||r._id))]})}):e.jsxs(Be,{children:[e.jsx("h4",{children:i("profileUtility.premium.decorationLockedTitle")}),e.jsx("p",{children:i("profileUtility.premium.decorationLockedDescription")}),e.jsxs(ae,{onClick:()=>u("premium"),children:[e.jsx(aa,{size:14}),i("profileUtility.premium.contactPremium")]})]})})]})]}),Ii=()=>e.jsxs(Te,{children:[e.jsxs(Be,{children:[e.jsx("h4",{children:i("profileUtility.support.premiumTitle")}),e.jsx("p",{children:i("profileUtility.support.premiumDescription")}),e.jsx(ae,{onClick:()=>u("premium"),children:i("profileUtility.support.premiumAction")})]}),e.jsxs(Be,{children:[e.jsx("h4",{children:i("profileUtility.support.jammTitle")}),e.jsx("p",{children:i("profileUtility.support.jammDescription")}),e.jsx(ae,{$secondary:!0,onClick:()=>u("jamm"),children:i("profileUtility.support.jammAction")})]})]}),Yi=()=>e.jsxs(Pr,{children:[e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.favorites.lessonsTitle")}),e.jsx("p",{children:i("profileUtility.favorites.lessonsDescription")})]}),e.jsx("div",{style:{padding:"0 14px 14px"},children:U.length?e.jsx(Te,{children:U.map(r=>{var b;return e.jsxs(Ae,{onClick:()=>{var k,O;return v(`/courses/${((k=r.course)==null?void 0:k.urlSlug)||((O=r.course)==null?void 0:O._id)}/${r.urlSlug||r._id}`)},children:[e.jsx($e,{children:r.title}),e.jsxs(Re,{children:[((b=r.course)==null?void 0:b.name)||i("common.course")," · ",r.likes||0," ",i("common.like")," · ",r.views||0," ",i("common.views")]})]},r._id)})}):e.jsx(re,{children:i(f?"common.loading":"profileUtility.favorites.lessonsEmpty")})})]}),e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.favorites.postsTitle")}),e.jsx("p",{children:i("profileUtility.favorites.postsDescription")})]}),e.jsx("div",{style:{padding:"0 14px 14px"},children:ee.length?e.jsx(Te,{children:ee.map(r=>{var b,k;return e.jsxs(Ae,{onClick:()=>v("/feed"),children:[e.jsx($e,{children:((b=r.author)==null?void 0:b.nickname)||((k=r.author)==null?void 0:k.username)||i("common.author")}),e.jsx(Re,{children:String(r.content||"").slice(0,160)})]},r._id)})}):e.jsx(re,{children:i(f?"common.loading":"profileUtility.favorites.postsEmpty")})})]}),e.jsxs(W,{children:[e.jsxs(X,{children:[e.jsx("h4",{children:i("profileUtility.favorites.blogsTitle")}),e.jsx("p",{children:i("profileUtility.favorites.blogsDescription")})]}),e.jsx("div",{style:{padding:"0 14px 14px"},children:F.length?e.jsx(Te,{children:F.map(r=>{var b,k;return e.jsxs(Ae,{onClick:()=>v(`/blogs/${r.slug||r._id}`),children:[e.jsx($e,{children:r.title}),e.jsxs(Re,{children:[((b=r.author)==null?void 0:b.nickname)||((k=r.author)==null?void 0:k.username)||i("common.author")," · ",r.likes||0," ",i("common.like")]})]},r._id)})}):e.jsx(re,{children:i(f?"common.loading":"profileUtility.favorites.blogsEmpty")})})]})]});return e.jsxs(Si,{"data-tour":`profile-pane-${a}`,children:[e.jsxs(Se,{children:[e.jsx(fr,{onClick:s,children:e.jsx(ue,{size:20})}),e.jsx(Ce,{children:qe.title})]}),e.jsxs(Ne,{children:[a==="appearance"&&Fi(),a==="language"&&Oi(),a==="premium"&&Ni(),a==="support"&&Ii(),a==="favorites"&&Yi()]})]})},Er=Object.freeze(Object.defineProperty({__proto__:null,ProfileBlogsPanel:Li,ProfileCoursesPane:zi,ProfileEditDialog:Bi,ProfilePage:Eo,ProfilePostsPane:Ai,ProfileSidebar:$i,ProfileUtilityPanel:Ri},Symbol.toStringTag,{value:"Module"}));export{Hr as S,Rr as T,Er as i};
