import{W as J,X as Y,r as d,Y as Z,Z as H,k as b,a as o,_ as l,i as y,$ as Q,a0 as ee,q as I,t as M,z as w,P as te,C as k,w as N,a1 as ae,I as se,a2 as B,n as oe,m as ne,a3 as D,a4 as F,a5 as re,c as ie,j as C,T as v,a6 as ce,a7 as le,u as de,b as T,a8 as ue,a9 as me}from"./index.6075d378.js";import{a as j,L as pe}from"./List.286e85e8.js";const ge=["className","component"];function fe(e={}){const{defaultTheme:t,defaultClassName:a="MuiBox-root",generateClassName:s,styleFunctionSx:n=Y}=e,c=J("div",{shouldForwardProp:r=>r!=="theme"&&r!=="sx"&&r!=="as"})(n);return d.exports.forwardRef(function(u,g){const h=Z(t),m=H(u),{className:f,component:p="div"}=m,_=b(m,ge);return o(c,l({as:p,ref:g,className:y(f,s?s(a):a),theme:h},_))})}function Ce(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function he(e){return parseFloat(e)}const ve=Q(),xe=fe({defaultTheme:ve,defaultClassName:"MuiBox-root",generateClassName:ee.generate});var E=xe;function be(e){return I("MuiCard",e)}M("MuiCard",["root"]);const ye=["className","raised"],_e=e=>{const{classes:t}=e;return N({root:["root"]},be,t)},$e=w(te,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({overflow:"hidden"})),Be=d.exports.forwardRef(function(t,a){const s=k({props:t,name:"MuiCard"}),{className:n,raised:c=!1}=s,i=b(s,ye),r=l({},s,{raised:c}),u=_e(r);return o($e,l({className:y(u.root,n),elevation:c?8:void 0,ref:a,ownerState:r},i))});var W=Be;function Ie(e){return I("MuiCardContent",e)}M("MuiCardContent",["root"]);const Me=["className","component"],we=e=>{const{classes:t}=e;return N({root:["root"]},Ie,t)},ke=w("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),Ne=d.exports.forwardRef(function(t,a){const s=k({props:t,name:"MuiCardContent"}),{className:n,component:c="div"}=s,i=b(s,Me),r=l({},s,{component:c}),u=we(r);return o(ke,l({as:c,className:y(u.root,n),ownerState:r,ref:a},i))});var K=Ne;function Re(e){return I("MuiCardMedia",e)}M("MuiCardMedia",["root","media","img"]);const Se=["children","className","component","image","src","style"],Ae=e=>{const{classes:t,isMediaComponent:a,isImageComponent:s}=e;return N({root:["root",a&&"media",s&&"img"]},Re,t)},Le=w("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e,{isMediaComponent:s,isImageComponent:n}=a;return[t.root,s&&t.media,n&&t.img]}})(({ownerState:e})=>l({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"})),Oe=["video","audio","picture","iframe","img"],Pe=["picture","img"],Ue=d.exports.forwardRef(function(t,a){const s=k({props:t,name:"MuiCardMedia"}),{children:n,className:c,component:i="div",image:r,src:u,style:g}=s,h=b(s,Se),m=Oe.indexOf(i)!==-1,f=!m&&r?l({backgroundImage:`url("${r}")`},g):g,p=l({},s,{component:i,isMediaComponent:m,isImageComponent:Pe.indexOf(i)!==-1}),_=Ae(p);return o(Le,l({className:y(_.root,c),as:i,role:!m&&r?"img":void 0,ref:a,style:f,ownerState:p,src:m?r||u:void 0},h,{children:n}))});var Fe=Ue;function Te(e){return I("MuiListItemButton",e)}const je=M("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);var $=je;const Ee=["alignItems","autoFocus","component","children","dense","disableGutters","divider","focusVisibleClassName","selected"],Ge=(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.alignItems==="flex-start"&&t.alignItemsFlexStart,a.divider&&t.divider,!a.disableGutters&&t.gutters]},Ve=e=>{const{alignItems:t,classes:a,dense:s,disabled:n,disableGutters:c,divider:i,selected:r}=e,g=N({root:["root",s&&"dense",!c&&"gutters",i&&"divider",n&&"disabled",t==="flex-start"&&"alignItemsFlexStart",r&&"selected"]},Te,a);return l({},a,g)},ze=w(ae,{shouldForwardProp:e=>se(e)||e==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:Ge})(({theme:e,ownerState:t})=>l({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${$.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:B(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${$.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:B(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${$.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:B(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:B(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${$.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${$.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.alignItems==="flex-start"&&{alignItems:"flex-start"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.dense&&{paddingTop:4,paddingBottom:4})),Xe=d.exports.forwardRef(function(t,a){const s=k({props:t,name:"MuiListItemButton"}),{alignItems:n="center",autoFocus:c=!1,component:i="div",children:r,dense:u=!1,disableGutters:g=!1,divider:h=!1,focusVisibleClassName:m,selected:f=!1}=s,p=b(s,Ee),_=d.exports.useContext(j),O={dense:u||_.dense||!1,alignItems:n,disableGutters:g},A=d.exports.useRef(null);oe(()=>{c&&A.current&&A.current.focus()},[c]);const P=l({},s,{alignItems:n,dense:O.dense,disableGutters:g,divider:h,selected:f}),U=Ve(P),q=ne(A,a);return o(j.Provider,{value:O,children:o(ze,l({ref:q,href:p.href||p.to,component:(p.href||p.to)&&i==="div"?"a":i,focusVisibleClassName:y(U.focusVisible,m),ownerState:P},p,{classes:U,children:r}))})});var De=Xe;function We(e){return I("MuiSkeleton",e)}M("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Ke=["animation","className","component","height","style","variant","width"];let S=e=>e,G,V,z,X;const qe=e=>{const{classes:t,variant:a,animation:s,hasChildren:n,width:c,height:i}=e;return N({root:["root",a,s,n&&"withChildren",n&&!c&&"fitContent",n&&!i&&"heightAuto"]},We,t)},Je=D(G||(G=S`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Ye=D(V||(V=S`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),Ze=w("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],a.animation!==!1&&t[a.animation],a.hasChildren&&t.withChildren,a.hasChildren&&!a.width&&t.fitContent,a.hasChildren&&!a.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const a=Ce(e.shape.borderRadius)||"px",s=he(e.shape.borderRadius);return l({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:B(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${a}/${Math.round(s/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&F(z||(z=S`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),Je),({ownerState:e,theme:t})=>e.animation==="wave"&&F(X||(X=S`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Ye,(t.vars||t).palette.action.hover)),He=d.exports.forwardRef(function(t,a){const s=k({props:t,name:"MuiSkeleton"}),{animation:n="pulse",className:c,component:i="span",height:r,style:u,variant:g="text",width:h}=s,m=b(s,Ke),f=l({},s,{animation:n,component:i,variant:g,hasChildren:Boolean(m.children)}),p=qe(f);return o(Ze,l({as:i,ref:a,className:y(p.root,c),ownerState:f},m,{style:l({width:h,height:r},u)}))});var R=He;const{selectAll:Qe,selectById:dt,selectIds:ut}=re.getSelectors(e=>e.anime),et=ie(e=>e.anime.isLoading,e=>e);var x={"anime-card":"_anime-card_1gjan_1","anime-card__content":"_anime-card__content_1gjan_5","anime-card__image":"_anime-card__image_1gjan_11"};const tt=({anime:e})=>o(W,{className:x["anime-card"],children:C(K,{className:x["anime-card__content"],children:[o(Fe,{component:"img",className:x["anime-card__image"],image:e.image,alt:e.titleEng}),C("div",{children:[C(v,{gutterBottom:!0,children:[e.titleEng," / ",e.titleJapan]}),C(v,{component:"div",color:"text.secondary",gutterBottom:!0,children:["Status: ",ce.toReadable(e.status)]}),C(v,{color:"text.secondary",gutterBottom:!0,children:["Type: ",le.toReadable(e.type)]})]})]})}),at=d.exports.memo(tt),st=()=>o(W,{className:x["anime-card"],children:C(K,{className:x["anime-card__content"],children:[o(R,{variant:"rectangular",className:x["anime-card__image"]}),C("div",{children:[o(v,{gutterBottom:!0,children:o(R,{})}),o(v,{component:"div",color:"text.secondary",gutterBottom:!0,children:o(R,{width:"40%"})}),o(v,{color:"text.secondary",gutterBottom:!0,children:o(R,{width:"40%"})})]})]})}),ot=d.exports.memo(st),nt=({animeList:e,isLoading:t})=>{const a=(t?Array.from(new Array(10)):e)?.map((s,n)=>o(De,{children:s!==void 0?o(at,{anime:s}):o(ot,{})},s?.id??n));return o(pe,{children:a})},rt=d.exports.memo(nt);var L={"anime-page-wrapper":"_anime-page-wrapper_ze9lt_1","anime-list":"_anime-list_ze9lt_6","anime-details":"_anime-details_ze9lt_7"};const it=()=>{const e=de(),t=T(Qe),a=T(et);return d.exports.useEffect(()=>{e(ue())},[e]),C("div",{className:L["anime-page-wrapper"],children:[o(E,{className:L["anime-list"],children:o(rt,{animeList:t,isLoading:a})}),o(E,{className:L["anime-details"],children:o(me,{})})]})},mt=d.exports.memo(it);export{mt as AnimesPage};
