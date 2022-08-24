import{r as a,u as f,d as h,b as g,S as w,U as v,a as e,j as m,T as E,B as b,L as x,h as c,V as C,A as F}from"./index.80894edd.js";import{c as y,a as i,p as R,g as S,u as N,F as P,b as A,d as o,T as t,e as V,f as k}from"./FormWrapper.ffbd7d69.js";import"./TextField.3f5283c4.js";const T=y().shape({email:i().email("Invalid email").required("Required"),firstName:i().max(255),lastName:i().max(255),password:R,passwordConfirmation:i().oneOf([S("password"),null],"Passwords must match")}),j=()=>{const p=f(),u=h(),r=g(w),[n,d]=a.exports.useState(null);a.exports.useEffect(()=>{r!==void 0&&(s.setErrors(r.validationErrors),r.validationErrors.detail!==void 0&&d(r.validationErrors.detail))},[r]);const s=N({initialValues:{email:"",firstName:"",lastName:"",password:"",passwordConfirmation:""},validationSchema:T,async onSubmit(l){(await p(C(l))).payload instanceof F||u(c.home)}});return a.exports.useEffect(()=>{n!==null&&d(null)},[s.values]),a.exports.useEffect(()=>()=>{p(v())},[]),e(P,{value:s,children:m(A,{onSubmit:s.handleSubmit,children:[e(o,{component:t,name:"email",autoComplete:"email",label:"Email"}),e(o,{component:t,name:"firstName",autoComplete:"given-name",label:"First name"}),e(o,{component:t,name:"lastName",autoComplete:"family-name",label:"Last name"}),e(o,{component:t,name:"password",autoComplete:"current-password",label:"Password",type:"password"}),e(o,{component:t,name:"passwordConfirmation",autoComplete:"current-password",label:"Confirm password",type:"password"}),n!==null&&e(E,{sx:l=>({color:l.palette.error.main}),children:n}),m(V,{children:[e(b,{type:"submit",variant:"contained",disabled:!s.isValid,children:"Submit"}),e(x,{to:c.login,children:"Already have account?"})]})]})})},L=a.exports.memo(j),q=()=>m(k,{children:[e("h1",{children:"Register"}),e(L,{})]}),I=a.exports.memo(q);export{I as RegisterPage};
