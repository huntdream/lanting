import{j as n}from"./jsx-runtime-vNq4Oc-g.js";import{r as a}from"./index-4g5l5LRQ.js";import{c as C}from"./index-EtqCS5in.js";import"./_commonjsHelpers-4gQjN7DL.js";const c=({tabs:t=[],sticky:g,activeTab:i,onTabChange:l})=>{var f;const[d,m]=a.useState({}),v=a.useRef(null),[o,u]=a.useState((f=t[0])==null?void 0:f.id);a.useEffect(()=>{var e;u(i||((e=t[0])==null?void 0:e.id))},[i,t]);const x=e=>{u(e),l&&l(e)},_=e=>{var b;const{width:r,left:N}=e.currentTarget.getBoundingClientRect(),E=((b=e.currentTarget.parentElement)==null?void 0:b.getBoundingClientRect().left)||0,w=N-E;m({width:r,opacity:1,transform:`translateX(${w}px)`})},j=()=>{m({...d,opacity:0})},p=a.useMemo(()=>{var e;return(e=t.find(r=>r.id===o))==null?void 0:e.content},[o,t]);return n.jsxs("div",{className:C("tabs",{"tabs--sticky":g}),children:[n.jsx("div",{className:"tabs-header",children:n.jsxs("div",{className:"tabs-list",onMouseLeave:j,children:[t.map(e=>n.jsx("div",{className:`tabs-label ${e.id===o?"active":""}`,onClick:()=>x(e.id),onMouseEnter:_,children:e.label},e.id)),n.jsx("div",{className:"tabs-highlight",style:d,ref:v})]})}),p?n.jsx("div",{className:"tabs-content",children:p}):null]})};try{c.displayName="Tabs",c.__docgenInfo={description:"",displayName:"Tabs",props:{tabs:{defaultValue:{value:"[]"},description:"",name:"tabs",required:!1,type:{name:"Tab[]"}},sticky:{defaultValue:null,description:"",name:"sticky",required:!1,type:{name:"boolean"}},activeTab:{defaultValue:null,description:"",name:"activeTab",required:!1,type:{name:"string"}},onTabChange:{defaultValue:null,description:"",name:"onTabChange",required:!1,type:{name:"((tabId: string) => void)"}}}}}catch{}const q={component:c},s={args:{tabs:[{label:"Tab One",id:"1",content:"Tab one content"},{label:"Tab Two",id:"2",content:"Tab two content"}]}};var T,h,y;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: 'Tab One',
      id: '1',
      content: 'Tab one content'
    }, {
      label: 'Tab Two',
      id: '2',
      content: 'Tab two content'
    }]
  }
}`,...(y=(h=s.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const L=["Primary"];export{s as Primary,L as __namedExportsOrder,q as default};
//# sourceMappingURL=Tabs.stories-V4nOMVtg.js.map
