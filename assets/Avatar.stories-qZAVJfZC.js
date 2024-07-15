import{j as a}from"./jsx-runtime-DEdD30eg.js";import{c as d}from"./index-CKcLqzwt.js";import{S as v}from"./account_circle-BKWw04MH.js";import"./index-RYns6xqu.js";const r=({src:n,size:t="normal",round:c,onClick:i})=>a.jsx("div",{className:d("lanting-avatar",{[`lanting-avatar-${t}`]:t!=="normal","lanting-avatar-round":c,"lanting-avatar-clickable":!!i}),onClick:i,children:n?a.jsx("img",{src:`${n}?imageView2/2/w/100`,alt:"Avatar",className:"lanting-avatar-img"}):a.jsx(v,{className:"lanting-avatar-account"})});r.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'large' | 'normal'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'large'"},{name:"literal",value:"'normal'"}]},description:"",defaultValue:{value:"'normal'",computed:!1}},round:{required:!1,tsType:{name:"boolean"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const j={component:r},s="https://storage.maoyu.space/109895_chggwv.webp",e={args:{src:"https://storage.maoyu.space"},render:()=>a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx(r,{size:"small",src:s}),a.jsx(r,{size:"small"})]}),a.jsxs("div",{children:[a.jsx(r,{size:"normal",src:s}),a.jsx(r,{size:"normal"})]}),a.jsxs("div",{children:[a.jsx(r,{size:"large",src:s}),a.jsx(r,{size:"large"})]})]})};var l,o,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    src: 'https://storage.maoyu.space'
  },
  render: () => {
    return <div>
        <div>
          <Avatar size='small' src={src} />
          <Avatar size='small' />
        </div>
        <div>
          <Avatar size='normal' src={src} />
          <Avatar size='normal' />
        </div>
        <div>
          <Avatar size='large' src={src} />
          <Avatar size='large' />
        </div>
      </div>;
  }
}`,...(m=(o=e.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};const f=["Primary"];export{e as Primary,f as __namedExportsOrder,j as default};
