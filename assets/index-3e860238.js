import{j as l,c as S}from"./index-111a7888.js";import{r}from"./index-76fb7be0.js";import{r as E}from"./index-d3ea75b5.js";import{I as D}from"./index-bb758768.js";const L=()=>crypto.randomUUID().split("-")[0];const h=({id:s,text:i,showProgress:d,close:p,closing:c,playState:t,onClose:n,onStartClose:e})=>{const a=o=>{o.target!==o.currentTarget||!c||n(s)};return l.jsxs("div",{className:S("lanting-toast-bar",{"lanting-toast-bar--slideout":c}),onAnimationEnd:a,children:[l.jsx("div",{className:"lanting-toast-bar-content",children:i}),p&&l.jsx(D,{onClick:e,name:"close"}),d&&l.jsx("div",{className:"lanting-toast-progress",style:{animationPlayState:t}})]})};try{h.displayName="ToastBar",h.__docgenInfo={description:"",displayName:"ToastBar",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},showProgress:{defaultValue:null,description:"",name:"showProgress",required:!1,type:{name:"boolean"}},playState:{defaultValue:null,description:"",name:"playState",required:!1,type:{name:"string"}},close:{defaultValue:null,description:"",name:"close",required:!1,type:{name:"boolean"}},closing:{defaultValue:null,description:"",name:"closing",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"(id: string) => void"}},onStartClose:{defaultValue:null,description:"",name:"onStartClose",required:!0,type:{name:"() => void"}}}}}catch{}const _=({id:s,text:i,close:d,offset:p,position:c="top",timeout:t=3e3,showProgress:n,updateHeight:e,onClose:a})=>{const o=r.useRef(null),m=r.useRef(Date.now()),u=r.useRef(0),[f,w]=r.useState(t),[I,v]=r.useState(!1),[N,T]=r.useState("running");r.useEffect(()=>{u.current=window.setTimeout(()=>{g()},t)},[s,a,t]),r.useEffect(()=>{if(o.current){const y=o.current,{height:V}=y.getBoundingClientRect();console.log(V,"height"),e(s,V)}},[]);const j=()=>{v(!1),clearTimeout(u.current);const y=f-(Date.now()-m.current);w(y),T("paused")},P=()=>{u.current=window.setTimeout(()=>{g()},f),m.current=Date.now(),T("running")},g=()=>{v(!0)},[q,C]=c.split("-");return l.jsx("div",{className:S("lanting-toast-item",{[`lanting-toast--${q}`]:q,[`lanting-toast--${C}`]:C}),onMouseEnter:j,onMouseLeave:P,ref:o,style:{transform:`translateY(${p}px)`},children:l.jsx(h,{id:s,onStartClose:g,onClose:a,close:d,playState:N,showProgress:n,text:i,closing:I})})};try{_.displayName="Toaster",_.__docgenInfo={description:"",displayName:"Toaster",props:{offset:{defaultValue:null,description:"",name:"offset",required:!0,type:{name:"number"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"(id: string) => void"}},updateHeight:{defaultValue:null,description:"",name:"updateHeight",required:!0,type:{name:"(id: string, height: number) => void"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},close:{defaultValue:null,description:"",name:"close",required:!1,type:{name:"boolean"}},timeout:{defaultValue:{value:"3000"},description:"",name:"timeout",required:!1,type:{name:"number"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}},position:{defaultValue:{value:"top"},description:"",name:"position",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"bottom"'},{value:'"top-right"'},{value:'"top-left"'},{value:'"bottom-right"'},{value:'"bottom-left"'}]}},showProgress:{defaultValue:null,description:"",name:"showProgress",required:!1,type:{name:"boolean"}}}}}catch{}const x=({updateList:s,list:i})=>{const d=r.useCallback(t=>{s(n=>n.filter(e=>e.id!==t))},[]),p=(t,n)=>{s(e=>e.map(a=>a.id===t?{...a,height:n}:a))},c=(t,n)=>{const e=i.filter(u=>u.position===n),a=e.findIndex(u=>u.id===t),o=n.includes("top");return e.slice(a+1).reverse().reduce((u,f)=>u+(f.height||0)+16,0)*(o?1:-1)};return E.createPortal(l.jsx("div",{className:"lanting-toast",children:i.map(({id:t,...n})=>{const e=c(t,n.position);return l.jsx(_,{id:t,...n,offset:e,onClose:d,updateHeight:p},t)})}),document.body)};try{x.displayName="Toasts",x.__docgenInfo={description:"",displayName:"Toasts",props:{updateList:{defaultValue:null,description:"",name:"updateList",required:!0,type:{name:"Dispatch<SetStateAction<IToastConfig[]>>"}},list:{defaultValue:null,description:"",name:"list",required:!0,type:{name:"IToastConfig[]"}}}}}catch{}const R=r.createContext({}),b=({children:s})=>{const[i,d]=r.useState([]),c={toast:r.useCallback((t,n)=>{const e={text:t,...n},a=[...i];if(e.id){const o=i.findIndex(m=>m.id===e.id);o!==-1&&e.id?a[o]=e:a.push(e)}else{const o=L();a.push({position:"top",...e,id:o})}d(a)},[i])};return l.jsxs(R.Provider,{value:c,children:[s,l.jsx(x,{list:i,updateList:d})]})};try{b.displayName="Toast",b.__docgenInfo={description:"",displayName:"Toast",props:{}}}catch{}export{b as T,R as a};
//# sourceMappingURL=index-3e860238.js.map
