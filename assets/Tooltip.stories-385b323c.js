import{j as r,c as E}from"./index-111a7888.js";import{r as o,R as q}from"./index-76fb7be0.js";import{r as N}from"./index-d3ea75b5.js";import{B as S}from"./index-983af34d.js";import"./_commonjsHelpers-de833af9.js";import"./index-bb758768.js";const w=({title:s,rect:b,placement:u="top",isClosing:f,onClose:h})=>{const e=o.useRef(null),[d,y]=o.useState({left:0,top:0,transform:""});o.useEffect(()=>{const t=new ResizeObserver(n=>{for(const p of n)p.contentRect&&x()});return e.current&&t.observe(e.current),()=>t.disconnect()},[u]),o.useEffect(()=>{const t=()=>{h()};return e.current&&f&&e.current.addEventListener("animationend",t),()=>{var n;return(n=e.current)==null?void 0:n.removeEventListener("animationend",t)}},[f]);const x=()=>{if(!e.current)return;const{width:t,left:n,top:p,height:v}=b,a=window.scrollX+n,i=window.scrollY+p,{width:m,height:g}=e.current.getBoundingClientRect();let l=a,c=i,V="";switch(u){case"right":l=a+t,c=i+v/2-g/2;break;case"bottom":l=a+t/2-m/2,c=i+v;break;case"left":l=a-m,c=i+v/2-g/2;break;default:l=a+t/2-m/2,c=i-g;break}l=Math.max(0,l),c=Math.max(0,c),y({left:l,top:c,transform:V})};return r.jsx("div",{className:E("lanting-tooltip-container",`lanting-tooltip--${u}`),ref:e,style:{transform:`translate(${d.left}px, ${d.top}px)`},children:r.jsx("div",{className:E("lanting-tooltip-content",{"lanting-tooltip-content--fadeOut":f}),children:s})})};try{w.displayName="Tip",w.__docgenInfo={description:"",displayName:"Tip",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},rect:{defaultValue:null,description:"",name:"rect",required:!0,type:{name:"DOMRect"}},placement:{defaultValue:{value:"top"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}},isClosing:{defaultValue:null,description:"",name:"isClosing",required:!1,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}const C=({children:s,title:b,timeout:u=0,placement:f})=>{const h=o.useRef(0),[e,d]=o.useState(!1),[y,x]=o.useState(),[t,n]=o.useState(!1);o.useEffect(()=>{},[]);const p=m=>{if(n(!1),!e){const g=m.currentTarget;x(g.getBoundingClientRect()),u>0?h.current=window.setTimeout(()=>{d(!0)},u):d(!0)}},v=()=>{d(!1),x(void 0)},a=m=>{n(!0),h.current&&clearTimeout(h.current)},i=q.cloneElement(s,{onMouseEnter:p,onMouseLeave:a,onTouchStart:p,onTouchEnd:a});return r.jsxs(r.Fragment,{children:[i,e&&y&&N.createPortal(r.jsx(w,{title:b,rect:y,isClosing:t,placement:f,onClose:v}),document.body)]})};try{C.displayName="Tooltip",C.__docgenInfo={description:"",displayName:"Tooltip",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},timeout:{defaultValue:{value:"0"},description:"",name:"timeout",required:!1,type:{name:"number"}},placement:{defaultValue:null,description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}}}}}catch{}const $={component:C},B="夫寵而不驕，驕而能降，降而不憾，憾而能眕者，鮮矣",_={args:{children:r.jsx(S,{children:"Tootip"}),title:B},decorators:[s=>r.jsx("div",{style:{height:"300px",overflow:"auto"},children:r.jsx("div",{style:{margin:"3em",display:"flex",alignContent:"center",justifyContent:"center",height:"400px"},children:r.jsx(s,{})})})]};var R,T,j;_.parameters={..._.parameters,docs:{...(R=_.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(j=(T=_.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};const D=["Primary"];export{_ as Primary,D as __namedExportsOrder,$ as default};
//# sourceMappingURL=Tooltip.stories-385b323c.js.map
