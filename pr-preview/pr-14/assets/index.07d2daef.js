import{W as F,X as U,r as d,Y as E,Z as G,k as b,a as c,_ as l,i as _,$ as V,a0 as j,q as B,t as M,z as $,P as D,C as N,w as h,a1 as z,I as W,a2 as I,n as q,m as J,a3 as X,j as g,T as S,a4 as Y,a5 as Z,a6 as H,u as K,b as Q,a7 as ee,a8 as te}from"./index.1245426b.js";import{a as k,L as se}from"./List.e64b35cc.js";const ae=["className","component"];function oe(e={}){const{defaultTheme:t,defaultClassName:a="MuiBox-root",generateClassName:s,styleFunctionSx:n=U}=e,r=F("div",{shouldForwardProp:o=>o!=="theme"&&o!=="sx"&&o!=="as"})(n);return d.exports.forwardRef(function(p,m){const f=E(t),C=G(p),{className:v,component:u="div"}=C,x=b(C,ae);return c(r,l({as:u,ref:m,className:_(v,s?s(a):a),theme:f},x))})}const ne=V(),re=oe({defaultTheme:ne,defaultClassName:"MuiBox-root",generateClassName:j.generate});var ie=re;function ce(e){return B("MuiCard",e)}M("MuiCard",["root"]);const le=["className","raised"],de=e=>{const{classes:t}=e;return h({root:["root"]},ce,t)},pe=$(D,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({overflow:"hidden"})),ue=d.exports.forwardRef(function(t,a){const s=N({props:t,name:"MuiCard"}),{className:n,raised:r=!1}=s,i=b(s,le),o=l({},s,{raised:r}),p=de(o);return c(pe,l({className:_(p.root,n),elevation:r?8:void 0,ref:a,ownerState:o},i))});var me=ue;function Ce(e){return B("MuiCardContent",e)}M("MuiCardContent",["root"]);const ge=["className","component"],fe=e=>{const{classes:t}=e;return h({root:["root"]},Ce,t)},ve=$("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),xe=d.exports.forwardRef(function(t,a){const s=N({props:t,name:"MuiCardContent"}),{className:n,component:r="div"}=s,i=b(s,ge),o=l({},s,{component:r}),p=fe(o);return c(ve,l({as:r,className:_(p.root,n),ownerState:o,ref:a},i))});var ye=xe;function be(e){return B("MuiCardMedia",e)}M("MuiCardMedia",["root","media","img"]);const _e=["children","className","component","image","src","style"],Ie=e=>{const{classes:t,isMediaComponent:a,isImageComponent:s}=e;return h({root:["root",a&&"media",s&&"img"]},be,t)},Be=$("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,{isMediaComponent:s,isImageComponent:n}=a;return[t.root,s&&t.media,n&&t.img]}})(({ownerState:e})=>l({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})),Me=["video","audio","picture","iframe","img"],$e=["picture","img"],Ne=d.exports.forwardRef(function(t,a){const s=N({props:t,name:"MuiCardMedia"}),{children:n,className:r,component:i="div",image:o,src:p,style:m}=s,f=b(s,_e),C=Me.indexOf(i)!==-1,v=!C&&o?l({backgroundImage:`url("${o}")`},m):m,u=l({},s,{component:i,isMediaComponent:C,isImageComponent:$e.indexOf(i)!==-1}),x=Ie(u);return c(Be,l({className:_(x.root,r),as:i,role:!C&&o?"img":void 0,ref:a,style:v,ownerState:u,src:C?o||p:void 0},f,{children:n}))});var he=Ne;function Re(e){return B("MuiListItemButton",e)}const Se=M("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);var y=Se;const we=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected"],Ae=(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.alignItems==="flex-start"&&t.alignItemsFlexStart,a.divider&&t.divider,!a.disableGutters&&t.gutters]},Le=e=>{const{alignItems:t,classes:a,dense:s,disabled:n,disableGutters:r,divider:i,selected:o}=e,m=h({root:["root",s&&"dense",!r&&"gutters",i&&"divider",n&&"disabled",t==="flex-start"&&"alignItemsFlexStart",o&&"selected"]},Re,a);return l({},a,m)},Oe=$(z,{shouldForwardProp:e=>W(e)||e==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:Ae})(({theme:e,ownerState:t})=>l({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${y.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:I(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${y.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:I(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${y.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:I(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:I(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${y.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${y.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.alignItems==="flex-start"&&{alignItems:"flex-start"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.dense&&{paddingTop:4,paddingBottom:4})),ke=d.exports.forwardRef(function(t,a){const s=N({props:t,name:"MuiListItemButton"}),{alignItems:n="center",autoFocus:r=!1,component:i="div",children:o,dense:p=!1,disableGutters:m=!1,divider:f=!1,focusVisibleClassName:C,selected:v=!1}=s,u=b(s,we),x=d.exports.useContext(k),A={dense:p||x.dense||!1,alignItems:n,disableGutters:m},R=d.exports.useRef(null);q(()=>{r&&R.current&&R.current.focus()},[r]);const L=l({},s,{alignItems:n,dense:A.dense,disableGutters:m,divider:f,selected:v}),O=Le(L),T=J(R,a);return c(k.Provider,{value:A,children:c(Oe,l({ref:T,href:u.href||u.to,component:(u.href||u.to)&&i==="div"?"a":i,focusVisibleClassName:_(O.focusVisible,C),ownerState:L},u,{classes:O,children:o}))})});var Pe=ke;const{selectAll:Te,selectById:ze,selectIds:We}=X.getSelectors(e=>e.anime);var w={"anime-card":"_anime-card_1lpv4_1","anime-card__content":"_anime-card__content_1lpv4_5","anime-card__image":"_anime-card__image_1lpv4_10"};const Fe=({anime:e})=>c(me,{className:w["anime-card"],children:g(ye,{className:w["anime-card__content"],children:[c(he,{component:"img",className:w["anime-card__image"],image:e.image,alt:e.titleEng}),g("div",{children:[g(S,{gutterBottom:!0,children:[e.titleEng," / ",e.titleJapan]}),g(S,{color:"text.secondary",gutterBottom:!0,children:["Status: ",Y.toReadable(e.status)]}),g(S,{color:"text.secondary",gutterBottom:!0,children:["Type: ",Z.toReadable(e.type)]})]})]})}),Ue=d.exports.memo(Fe),Ee=({className:e,animeList:t})=>{const a=t?.map(s=>c(Pe,{children:c(Ue,{anime:s})},s.id));return g(ie,{className:e,children:[c(H,{}),c(se,{children:a})]})},Ge=d.exports.memo(Ee);var P={"anime-page-wrapper":"_anime-page-wrapper_5upyt_1","anime-list":"_anime-list_5upyt_6"};const Ve=()=>{const e=K(),t=Q(Te);return d.exports.useEffect(()=>{e(ee())},[e]),g("div",{className:P["anime-page-wrapper"],children:[c(Ge,{className:P["anime-list"],animeList:t}),c(te,{})]})},qe=d.exports.memo(Ve);export{qe as AnimesPage};