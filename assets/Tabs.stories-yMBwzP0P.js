import{j as n,c as C}from"./index-b9F5Aj1R.js";import{r as a}from"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";const c=({tabs:t=[],sticky:g,activeTab:l,onTabChange:i})=>{var b;const[d,u]=a.useState({}),v=a.useRef(null),[o,m]=a.useState((b=t[0])==null?void 0:b.id);a.useEffect(()=>{var e;m(l||((e=t[0])==null?void 0:e.id))},[l,t]);const x=e=>{m(e),i&&i(e)},_=e=>{var f;const{width:r,left:N}=e.currentTarget.getBoundingClientRect(),E=((f=e.currentTarget.parentElement)==null?void 0:f.getBoundingClientRect().left)||0,w=N-E;u({width:r,opacity:1,transform:`translateX(${w}px)`})},j=()=>{u({...d,opacity:0})},p=a.useMemo(()=>{var e;return(e=t.find(r=>r.id===o))==null?void 0:e.content},[o,t]);return n.jsxs("div",{className:C("tabs",{"tabs--sticky":g}),children:[n.jsx("div",{className:"tabs-header",children:n.jsxs("div",{className:"tabs-list",onMouseLeave:j,children:[t.map(e=>n.jsx("div",{className:`tabs-label ${e.id===o?"active":""}`,onClick:()=>x(e.id),onMouseEnter:_,children:e.label},e.id)),n.jsx("div",{className:"tabs-highlight",style:d,ref:v})]})}),p?n.jsx("div",{className:"tabs-content",children:p}):null]})};try{c.displayName="Tabs",c.__docgenInfo={description:"",displayName:"Tabs",props:{tabs:{defaultValue:{value:"[]"},description:"",name:"tabs",required:!1,type:{name:"Tab[]"}},sticky:{defaultValue:null,description:"",name:"sticky",required:!1,type:{name:"boolean"}},activeTab:{defaultValue:null,description:"",name:"activeTab",required:!1,type:{name:"string"}},onTabChange:{defaultValue:null,description:"",name:"onTabChange",required:!1,type:{name:"((tabId: string) => void)"}}}}}catch{}const k={component:c},s={args:{tabs:[{label:"Tab One",id:"1",content:"Tab one content"},{label:"Tab Two",id:"2",content:"Tab two content"}]}};var T,h,y;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(y=(h=s.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const q=["Primary"];export{s as Primary,q as __namedExportsOrder,k as default};
//# sourceMappingURL=Tabs.stories-yMBwzP0P.js.map
