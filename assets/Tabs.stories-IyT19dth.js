import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{r as s}from"./index-CqrSl2Gl.js";import{c as R}from"./index-DyOv56-n.js";const h=({tabs:t=[],sticky:y,activeTab:i,onTabChange:c})=>{var p;const[l,d]=s.useState({}),v=s.useRef(null),[r,m]=s.useState((p=t[0])==null?void 0:p.id);s.useEffect(()=>{var e;m(i||((e=t[0])==null?void 0:e.id))},[i,t]);const x=e=>{m(e),c&&c(e)},j=e=>{var f;const{width:o,left:E}=e.currentTarget.getBoundingClientRect(),N=((f=e.currentTarget.parentElement)==null?void 0:f.getBoundingClientRect().left)||0,M=E-N;d({width:o,opacity:1,transform:`translateX(${M}px)`})},w=()=>{d({...l,opacity:0})},u=s.useMemo(()=>{var e;return(e=t.find(o=>o.id===r))==null?void 0:e.content},[r,t]);return n.jsxs("div",{className:R("tabs",{"tabs--sticky":y}),children:[n.jsx("div",{className:"tabs-header",children:n.jsxs("div",{className:"tabs-list",onMouseLeave:w,children:[t.map(e=>n.jsx("div",{className:`tabs-label ${e.id===r?"active":""}`,onClick:()=>x(e.id),onMouseEnter:j,children:e.label},e.id)),n.jsx("div",{className:"tabs-highlight",style:l,ref:v})]})}),u?n.jsx("div",{className:"tabs-content",children:u}):null]})};h.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{tabs:{required:!1,tsType:{name:"Array",elements:[{name:"Tab"}],raw:"Tab[]"},description:"",defaultValue:{value:"[]",computed:!1}},sticky:{required:!1,tsType:{name:"boolean"},description:""},activeTab:{required:!1,tsType:{name:"string"},description:""},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(tabId: string) => void",signature:{arguments:[{type:{name:"string"},name:"tabId"}],return:{name:"void"}}},description:""}}};const L={component:h},a={args:{tabs:[{label:"Tab One",id:"1",content:"Tab one content"},{label:"Tab Two",id:"2",content:"Tab two content"}]}};var b,T,g;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(g=(T=a.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};const _=["Primary"];export{a as Primary,_ as __namedExportsOrder,L as default};
