import{j as t}from"./index-b9F5Aj1R.js";import{a as d,T as u}from"./index-EWPxQa1k.js";import{r as m}from"./index-4g5l5LRQ.js";import{B as r}from"./index-Dhb-M1Y1.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-jmm5gWkb.js";import"./index-M7YHbpXm.js";import"./platform-DTidj1Fe.js";import"./icons-UAwrDR8W.js";import"./account_circle-CWE-8K_X.js";const x=()=>{const{toast:s}=m.useContext(d);return[s]},C={component:u},o={render:()=>{const[s]=x(),[i,c]=m.useState("top"),l=["top","top-left","top-right","bottom","bottom-left","bottom-right"];return t.jsxs("div",{children:[t.jsx("div",{children:l.map(n=>t.jsx(r,{onClick:()=>c(n),style:{textTransform:"capitalize",margin:"12px"},children:n.split("-").join(" ")},n))}),t.jsx("div",{style:{marginTop:"16px"},children:t.jsx(r,{onClick:()=>s(`This is a ${i.split("-").join(" ")} toast`,{position:i}),children:"Show Toast"})})]})}};var e,a,p;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: () => {
    const [toast] = useToast();
    const [position, setPosition] = useState<Position>('top');
    const positions: Position[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
    return <div>
        <div>
          {positions.map(p => <Button onClick={() => setPosition(p)} style={{
          textTransform: 'capitalize',
          margin: '12px'
        }} key={p}>
              {p.split('-').join(' ')}
            </Button>)}
        </div>
        <div style={{
        marginTop: '16px'
      }}>
          <Button onClick={() => toast(\`This is a \${position.split('-').join(' ')} toast\`, {
          position
        })}>
            Show Toast
          </Button>
        </div>
      </div>;
  }
}`,...(p=(a=o.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const k=["Primary"];export{o as Primary,k as __namedExportsOrder,C as default};
//# sourceMappingURL=Toast.stories-ctYk3u8b.js.map
