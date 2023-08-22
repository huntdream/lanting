import{j as a,c as d}from"./index-111a7888.js";import{I as u}from"./index-dad6ac06.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const e=({src:s,size:t="normal",round:m,onClick:n})=>a.jsx("div",{className:d("lanting-avatar",{[`lanting-avatar-${t}`]:t!=="normal","lanting-avatar-round":m,"lanting-avatar-clickable":!!n}),onClick:n,children:s?a.jsx("img",{src:`${s}?imageView2/2/w/100`,alt:"Avatar",className:"lanting-avatar-img"}):a.jsx(u,{name:"account_circle",clickable:!!n,size:"100%"})});try{e.displayName="Avatar",e.__docgenInfo={description:"",displayName:"Avatar",props:{src:{defaultValue:null,description:"",name:"src",required:!1,type:{name:"string"}},size:{defaultValue:{value:"normal"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'},{value:'"normal"'}]}},round:{defaultValue:null,description:"",name:"round",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const f={component:e},i="https://storage.maoyu.info/109895_chggwv.webp",r={args:{src:"https://storage.maoyu.info"},render:()=>a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx(e,{size:"small",src:i}),a.jsx(e,{size:"small"})]}),a.jsxs("div",{children:[a.jsx(e,{size:"normal",src:i}),a.jsx(e,{size:"normal"})]}),a.jsxs("div",{children:[a.jsx(e,{size:"large",src:i}),a.jsx(e,{size:"large"})]})]})};var l,o,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    src: 'https://storage.maoyu.info'
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
}`,...(c=(o=r.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const j=["Primary"];export{r as Primary,j as __namedExportsOrder,f as default};
//# sourceMappingURL=Avatar.stories-c6482aed.js.map
