import{j as e}from"./index-111a7888.js";import{r as o,R as E}from"./index-76fb7be0.js";import{r as V}from"./index-d3ea75b5.js";import{B as g}from"./index-b357493c.js";import"./_commonjsHelpers-de833af9.js";import"./index-d4805227.js";const j=({title:p,rect:_,placement:x="top",offset:i=6})=>{const m=o.useRef(null),[d,v]=o.useState({left:0,top:0,transform:""});o.useEffect(()=>{const t=new ResizeObserver(s=>{for(const c of s)c.contentRect});return m.current&&t.observe(m.current),()=>t.disconnect()},[]);const f=()=>{const{width:t,left:s,top:c,height:u}=_,r=window.scrollX+s,n=window.scrollY+c;let a=r,y=n,h="";switch(x){case"right":a=r+t+i,y=n+u/2,h="translateY(-50%)";break;case"bottom":a=r+t/2,y=n+u+i,h="translateX(-50%)";break;case"left":a=r-i,y=n+u/2,h="translate(-100%, -50%)";break;default:a=r+t/2,y=n-i,h="translate(-50%, -100%)";break}v({left:a,top:y,transform:h})};return o.useEffect(()=>{f()},[]),e.jsx("div",{className:"lanting-tooltip-container",ref:m,style:{...d},children:e.jsx("div",{className:"lanting-tooltip-content",style:{opacity:1},children:p})})};try{j.displayName="Tip",j.__docgenInfo={description:"",displayName:"Tip",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"ReactNode"}},rect:{defaultValue:null,description:"",name:"rect",required:!0,type:{name:"DOMRect"}},placement:{defaultValue:{value:"top"},description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}},offset:{defaultValue:{value:"6"},description:"",name:"offset",required:!1,type:{name:"number"}}}}}catch{}const l=({children:p,title:_,timeout:x=0,placement:i,offset:m})=>{const d=o.useRef(0),[v,f]=o.useState(!1),[t,s]=o.useState();o.useEffect(()=>{},[]);const c=n=>{if(!v){const a=n.currentTarget;s(a.getBoundingClientRect()),x>0?d.current=window.setTimeout(()=>{f(!0)},x):f(!0)}},u=n=>{f(!1),s(void 0),d.current&&clearTimeout(d.current)},r=E.cloneElement(p,{onMouseEnter:c,onMouseLeave:u,onTouchStart:c,onTouchEnd:u});return e.jsxs(e.Fragment,{children:[r,v&&t&&V.createPortal(e.jsx(j,{title:_,rect:t,placement:i,offset:m}),document.body)]})};try{l.displayName="Tooltip",l.__docgenInfo={description:"",displayName:"Tooltip",props:{title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"ReactNode"}},timeout:{defaultValue:{value:"0"},description:"",name:"timeout",required:!1,type:{name:"number"}},placement:{defaultValue:null,description:"",name:"placement",required:!1,type:{name:"enum",value:[{value:'"top"'},{value:'"right"'},{value:'"bottom"'},{value:'"left"'}]}},offset:{defaultValue:null,description:"",name:"offset",required:!1,type:{name:"number"}}}}}catch{}const L={component:l},T="夫寵而不驕，驕而能降，降而不憾，憾而能眕者，鮮矣",b={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",margin:"20px 0",justifyContent:"space-between"},children:[e.jsx(l,{title:T,placement:"top",children:e.jsx(g,{children:"Top"})}),e.jsx(l,{title:T,placement:"right",children:e.jsx(g,{children:"Right"})}),e.jsx(l,{title:T,placement:"bottom",children:e.jsx(g,{children:"Bottom"})}),e.jsx(l,{title:T,placement:"left",children:e.jsx(g,{children:"Left"})})]})};var R,B,w;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    justifyContent: 'space-between'
  }}>
      <Tooltip title={text} placement='top'>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title={text} placement='right'>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip title={text} placement='bottom'>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title={text} placement='left'>
        <Button>Left</Button>
      </Tooltip>
    </div>
}`,...(w=(B=b.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};const C=["Primary"];export{b as Primary,C as __namedExportsOrder,L as default};
//# sourceMappingURL=Tooltip.stories-097bdc17.js.map
