import{j as a}from"./jsx-runtime-vNq4Oc-g.js";import{r as n}from"./index-4g5l5LRQ.js";import"./_commonjsHelpers-4gQjN7DL.js";const j=({containerRef:d,handlerRef:u})=>{const[t,o]=n.useState();return[t]},l=({value:d,direction:u="x"})=>{const t=n.useRef(null),o=n.useRef(null);j({containerRef:t,handlerRef:o});const[c,g]=n.useState(0),e=n.useCallback(r=>{if(!t.current||!o.current)return;const m="touches"in r?r.touches[0]:r,y=m.pageX-document.documentElement.scrollLeft||document.body.scrollLeft||window.scrollX,E=m.pageY-document.documentElement.scrollTop||document.body.scrollTop||window.scrollY,{x:L,y:_,width:w,height:R}=t.current.getBoundingClientRect(),{width:M,height:S}=o.current.getBoundingClientRect(),X=M/2,Y=S/2,f=Math.max(0,Math.min(y-L,w))-X,b=Math.max(0,Math.min(E-_,R))-Y;console.log(f),g(u==="x"?f:b)},[]);console.log(c,"offsetValue");const i=n.useCallback(()=>{document.removeEventListener("mousemove",e),document.removeEventListener("touchmove",e),document.removeEventListener("mouseup",e),document.removeEventListener("touchend",e)},[e]),x=r=>{e(r),document.addEventListener("mousemove",e),document.addEventListener("touchmove",e),document.addEventListener("mouseup",i),document.addEventListener("touchend",i)};return a.jsxs("div",{className:"lanting-slider",ref:t,onMouseDown:x,children:[a.jsx("div",{className:"lanting-slider-track",style:{width:`${c+8}px`}}),a.jsx("div",{className:"lanting-slider-handler",ref:o,style:{left:`${c}px`}})]})};try{l.displayName="Slider",l.__docgenInfo={description:"",displayName:"Slider",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},direction:{defaultValue:{value:"x"},description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"x"'},{value:'"y"'}]}}}}}catch{}const C={component:l},s={};var p,v,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(h=(v=s.parameters)==null?void 0:v.docs)==null?void 0:h.source}}};const k=["Primary"];export{s as Primary,k as __namedExportsOrder,C as default};