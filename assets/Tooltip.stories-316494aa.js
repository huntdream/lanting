import{j as o,c as C}from"./index-111a7888.js";import{r,R as V}from"./index-76fb7be0.js";import{r as q}from"./index-d3ea75b5.js";import{B as N}from"./index-983af34d.js";import"./_commonjsHelpers-de833af9.js";import"./index-bb758768.js";const T=({title:s,rect:b,placement:u="top",isClosing:m,onClose:f})=>{const e=r.useRef(null),[h,y]=r.useState("");r.useEffect(()=>{const t=new ResizeObserver(n=>{for(const d of n)d.contentRect&&x()});return e.current&&t.observe(e.current),()=>t.disconnect()},[u]),r.useEffect(()=>{const t=()=>{f()};return e.current&&m&&e.current.addEventListener("animationend",t),()=>{var n;return(n=e.current)==null?void 0:n.removeEventListener("animationend",t)}},[m]);const x=()=>{if(!e.current)return;const{width:t,left:n,top:d,height:v}=b,a=window.scrollX+n,i=window.scrollY+d,{width:p,height:g}=e.current.getBoundingClientRect();let l=a,c=i;switch(u){case"right":l=a+t,c=i+v/2-g/2;break;case"bottom":l=a+t/2-p/2,c=i+v;break;case"left":l=a-p,c=i+v/2-g/2;break;default:l=a+t/2-p/2,c=i-g;break}l=Math.max(0,l),c=Math.max(0,c),y(`translate(${l}px, ${c}px)`)};return o.jsx("div",{className:C("lanting-tooltip-container",`lanting-tooltip--${u}`),ref:e,style:{transform:h},children:o.jsx("div",{className:C("lanting-tooltip-content",{"lanting-tooltip-content--fadeOut":m}),children:s})})};try{T.displayName="Tip",T.__docgenInfo={description:"",displayName:"Tip",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},rect:{defaultValue:null,description:"",name:"rect",required:!0,type:{name:"DOMRect"}},placement:{defaultValue:{value:"top"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}},isClosing:{defaultValue:null,description:"",name:"isClosing",required:!1,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}const w=({children:s,title:b,timeout:u=0,placement:m})=>{const f=r.useRef(0),[e,h]=r.useState(!1),[y,x]=r.useState(),[t,n]=r.useState(!1);r.useEffect(()=>{},[]);const d=p=>{if(n(!1),!e){const g=p.currentTarget;x(g.getBoundingClientRect()),u>0?f.current=window.setTimeout(()=>{h(!0)},u):h(!0)}},v=()=>{h(!1),x(void 0)},a=p=>{n(!0),f.current&&clearTimeout(f.current)},i=V.cloneElement(s,{onMouseEnter:d,onMouseLeave:a,onTouchStart:d,onTouchEnd:a});return o.jsxs(o.Fragment,{children:[i,e&&y&&q.createPortal(o.jsx(T,{title:b,rect:y,isClosing:t,placement:m,onClose:v}),document.body)]})};try{w.displayName="Tooltip",w.__docgenInfo={description:"",displayName:"Tooltip",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},timeout:{defaultValue:{value:"0"},description:"",name:"timeout",required:!1,type:{name:"number"}},placement:{defaultValue:null,description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}}}}}catch{}const I={component:w},S="夫寵而不驕，驕而能降，降而不憾，憾而能眕者，鮮矣",_={args:{children:o.jsx(N,{children:"Tootip"}),title:S},decorators:[s=>o.jsx("div",{style:{height:"300px",overflow:"auto"},children:o.jsx("div",{style:{margin:"3em",display:"flex",alignContent:"center",justifyContent:"center",height:"400px"},children:o.jsx(s,{})})})]};var E,R,j;_.parameters={..._.parameters,docs:{...(E=_.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    children: <Button>Tootip</Button>,
    title: text
  },
  decorators: [Story => <div style={{
    height: '300px',
    overflow: 'auto'
  }}>
        <div style={{
      margin: '3em',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      height: '400px'
    }}>
          <Story />
        </div>
      </div>]
}`,...(j=(R=_.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};const $=["Primary"];export{_ as Primary,$ as __namedExportsOrder,I as default};
//# sourceMappingURL=Tooltip.stories-316494aa.js.map
