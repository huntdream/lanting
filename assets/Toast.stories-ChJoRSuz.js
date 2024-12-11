import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{a as d,T as u}from"./index-BbbtoR1f.js";import{r as m}from"./index-CqrSl2Gl.js";import{B as r}from"./index-dAP08o2W.js";import"./index-FqUYIDda.js";import"./index-729qusIZ.js";import"./index-DyOv56-n.js";import"./index-1wmjQJzN.js";import"./platform-BPwMEPFl.js";import"./icons-B0K51NOX.js";import"./account_circle-CO_csfER.js";const x=()=>{const{toast:s}=m.useContext(d);return[s]},k={component:u},o={render:()=>{const[s]=x(),[i,c]=m.useState("top"),l=["top","top-left","top-right","bottom","bottom-left","bottom-right"];return t.jsxs("div",{children:[t.jsx("div",{children:l.map(n=>t.jsx(r,{onClick:()=>c(n),style:{textTransform:"capitalize",margin:"12px"},children:n.split("-").join(" ")},n))}),t.jsx("div",{style:{marginTop:"16px"},children:t.jsx(r,{onClick:()=>s(`This is a ${i.split("-").join(" ")} toast`,{position:i}),children:"Show Toast"})})]})}};var e,p,a;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
}`,...(a=(p=o.parameters)==null?void 0:p.docs)==null?void 0:a.source}}};const S=["Primary"];export{o as Primary,S as __namedExportsOrder,k as default};
