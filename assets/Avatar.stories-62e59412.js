import{j as a,c as d}from"./index-111a7888.js";import{S as u}from"./account_circle-bdacd3d6.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const r=({src:s,size:t="normal",round:m,onClick:i})=>a.jsx("div",{className:d("lanting-avatar",{[`lanting-avatar-${t}`]:t!=="normal","lanting-avatar-round":m,"lanting-avatar-clickable":!!i}),onClick:i,children:s?a.jsx("img",{src:`${s}?imageView2/2/w/100`,alt:"Avatar",className:"lanting-avatar-img"}):a.jsx(u,{className:"lanting-avatar-account"})});try{r.displayName="Avatar",r.__docgenInfo={description:"",displayName:"Avatar",props:{src:{defaultValue:null,description:"",name:"src",required:!1,type:{name:"string"}},size:{defaultValue:{value:"normal"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"large"'},{value:'"normal"'}]}},round:{defaultValue:null,description:"",name:"round",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const f={component:r},n="https://storage.maoyu.info/109895_chggwv.webp",e={args:{src:"https://storage.maoyu.info"},render:()=>a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx(r,{size:"small",src:n}),a.jsx(r,{size:"small"})]}),a.jsxs("div",{children:[a.jsx(r,{size:"normal",src:n}),a.jsx(r,{size:"normal"})]}),a.jsxs("div",{children:[a.jsx(r,{size:"large",src:n}),a.jsx(r,{size:"large"})]})]})};var l,o,c;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(c=(o=e.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const j=["Primary"];export{e as Primary,j as __namedExportsOrder,f as default};
//# sourceMappingURL=Avatar.stories-62e59412.js.map
