import{j as l,c as R}from"./index-111a7888.js";import{r as s,R as j}from"./index-76fb7be0.js";import{r as L}from"./index-d3ea75b5.js";import{B}from"./index-2f3064e6.js";import"./_commonjsHelpers-de833af9.js";import"./index-dad6ac06.js";const b=({title:r,rect:_,placement:p="top",isClosing:h,onClose:v})=>{const n=s.useRef(null),[y,g]=s.useState("");s.useEffect(()=>{const o=new ResizeObserver(a=>{for(const d of a)d.contentRect&&x()});return n.current&&o.observe(n.current),()=>o.disconnect()},[p]),s.useEffect(()=>{const o=()=>{v()};return n.current&&h&&n.current.addEventListener("animationend",o),()=>{var a;return(a=n.current)==null?void 0:a.removeEventListener("animationend",o)}},[h]);const x=()=>{if(!n.current)return;const{width:o,left:a,top:d,height:e}=_,c=window.scrollX+a,m=window.scrollY+d,{width:f,height:T}=n.current.getBoundingClientRect();let i=c,u=m;switch(p){case"right":i=c+o,u=m+e/2-T/2;break;case"bottom":i=c+o/2-f/2,u=m+e;break;case"left":i=c-f,u=m+e/2-T/2;break;default:i=c+o/2-f/2,u=m-T;break}i=Math.max(0,i),u=Math.max(0,u),g(`translate(${i}px, ${u}px)`)};return l.jsx("div",{className:R("lanting-tooltip-container",`lanting-tooltip--${p}`),ref:n,style:{transform:y},children:l.jsx("div",{className:R("lanting-tooltip-content",{"lanting-tooltip-content--fadeOut":h}),children:r})})};try{b.displayName="Tip",b.__docgenInfo={description:"",displayName:"Tip",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},rect:{defaultValue:null,description:"",name:"rect",required:!0,type:{name:"DOMRect"}},placement:{defaultValue:{value:"top"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}},isClosing:{defaultValue:null,description:"",name:"isClosing",required:!1,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}const w=({children:r,title:_,timeout:p=0,placement:h})=>{const v=s.useRef(0),[n,y]=s.useState(!1),[g,x]=s.useState(),[o,a]=s.useState(!1),d=j.Children.only(r),e=(d==null?void 0:d.props)||{},c=t=>{if(a(!1),!n){const C=t.currentTarget;x(C.getBoundingClientRect()),p>0?v.current=window.setTimeout(()=>{y(!0)},p):y(!0)}},m=()=>{y(!1),x(void 0)},f=t=>{a(!0),v.current&&clearTimeout(v.current)},q={onMouseEnter:t=>{c(t),e==null||e.onMouseEnter(t)},onMouseLeave:t=>{f(),e==null||e.onMouseLeave(t)},onTouchStart:t=>{c(t),e==null||e.onTouchStart(t)},onTouchEnd:t=>{f(),e==null||e.onTouchEnd(t)}},N=s.isValidElement(r)&&j.cloneElement(r,q);return l.jsxs(l.Fragment,{children:[N,n&&g&&L.createPortal(l.jsx(b,{title:_,rect:g,isClosing:o,placement:h,onClose:m}),document.body)]})};try{w.displayName="Tooltip",w.__docgenInfo={description:"",displayName:"Tooltip",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},timeout:{defaultValue:{value:"0"},description:"",name:"timeout",required:!1,type:{name:"number"}},placement:{defaultValue:null,description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}}}}}catch{}const F={component:w},k="夫寵而不驕，驕而能降，降而不憾，憾而能眕者，鮮矣",E={args:{children:l.jsx(B,{children:"Tootip"}),title:k},decorators:[r=>l.jsx("div",{style:{height:"300px",overflow:"auto"},children:l.jsx("div",{style:{margin:"3em",display:"flex",alignContent:"center",justifyContent:"center",height:"400px"},children:l.jsx(r,{})})})]};var M,S,V;E.parameters={...E.parameters,docs:{...(M=E.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(V=(S=E.parameters)==null?void 0:S.docs)==null?void 0:V.source}}};const A=["Primary"];export{E as Primary,A as __namedExportsOrder,F as default};
//# sourceMappingURL=Tooltip.stories-d940e242.js.map
