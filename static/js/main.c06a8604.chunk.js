(this.webpackJsonplanting=this.webpackJsonplanting||[]).push([[0],{114:function(e,t,n){e.exports=n.p+"static/media/bg.f0ef5918.jpg"},119:function(e,t,n){e.exports=n(236)},124:function(e,t,n){},128:function(e,t,n){},129:function(e,t,n){},130:function(e,t,n){},226:function(e,t,n){},228:function(e,t,n){},229:function(e,t,n){},230:function(e,t,n){},231:function(e,t,n){},236:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(65),c=n.n(r),o=(n(124),n(239)),i=new(n(118).a)({uri:"http://localhost:4000"}),s=function(e){var t=e.children;return l.a.createElement(o.a,{client:i},t)},u=n(39),m=n(9),d=n(113),g=(n(128),n(129),function(){return l.a.createElement("article",{className:"lanting-post"},l.a.createElement("header",{className:"lanting-post-header"},l.a.createElement("h3",{className:"lanting-post-title"},"\u5170\u4ead\u96c6\u5e8f")),l.a.createElement("main",{className:"lanting-post-content"},"\u4ef0\u89c2\u5b87\u5b99\u4e4b\u5927\uff0c\u4fef\u5bdf\u54c1\u7c7b\u4e4b\u76db"),l.a.createElement("footer",{className:"lanting-post-footer"},"2020\u5e7407\u670808\u65e515:58:23"))}),f=function(){return l.a.createElement("div",{className:"index"},Object(d.range)(10).map((function(e){return l.a.createElement(g,{key:e})})))},h=(n(130),n(30)),y=n(8),b=n.n(y),v=n(31),E=n.n(v),p=(n(225),n(25)),k=n.n(p),C=(n(50),function(e){var t=e.active,n=e.className,a=e.label,r=e.onToggle;return l.a.createElement("div",{onMouseDown:function(e){e.preventDefault(),r()},className:k()("stylecontrols-button",{"stylecontrols-button--active":t},n)},a)}),S=n(53),N=function(e){var t=e.className,n=e.children,a=e.style,r=(e.onClick,Object(S.a)(e,["className","children","style","onClick"]));return l.a.createElement("i",Object.assign({className:k()("material-icons","lanting-icon--clickable",t),style:a},r),n)},j=n(114),T=n.n(j),O=[{label:"H1",style:"header-one"},{label:"H2",style:"header-two"},{label:"H3",style:"header-three"},{label:l.a.createElement(N,null,"format_quote"),style:"blockquote"},{label:l.a.createElement(N,null,"format_list_bulleted"),style:"unordered-list-item"},{label:l.a.createElement(N,null,"format_list_numbered"),style:"ordered-list-item"},{label:l.a.createElement(N,null,"code"),style:"code-block"},{label:l.a.createElement(N,null,"image"),style:"image"}],x=function(e){var t=e.editorState,n=e.onChange,a=t.getSelection(),r=t.getCurrentContent().getBlockForKey(a.getStartKey()).getType(),c=function(){var e=t.getSelection(),a=t.getCurrentContent().createEntity("PHOTO","MUTABLE",{src:T.a}),l=a.getLastCreatedEntityKey(),r=y.Modifier.applyEntity(a,e,l),c=y.EditorState.push(t,r,"apply-entity");n(y.AtomicBlockUtils.insertAtomicBlock(c,l," "))};return l.a.createElement("div",{className:"stylecontrols-block"},O.map((function(e){var a=e.label,o=e.style;return l.a.createElement(C,{active:o===r,className:"stylecontrols-".concat(o.toLowerCase()),key:o,label:a,onToggle:function(){return function(e){"image"===e?c():n(y.RichUtils.toggleBlockType(t,e))}(o)}})})))},B=[{label:l.a.createElement(N,null,"format_bold"),style:"BOLD"},{label:l.a.createElement(N,null,"format_italic"),style:"ITALIC"},{label:l.a.createElement(N,null,"format_underline"),style:"UNDERLINE"},{label:l.a.createElement(N,null,"format_strikethrough"),style:"STRIKETHROUGH"}],R=function(e){var t=e.editorState,n=e.onChange,a=t.getCurrentInlineStyle();return l.a.createElement("div",{className:"stylecontrols-block"},B.map((function(e){var r=e.label,c=e.style;return l.a.createElement(C,{active:a.has(c),key:c,label:r,onToggle:function(){return e=c,void n(y.RichUtils.toggleInlineStyle(t,e));var e}})})))},w=function(e){var t=e.editorState,n=e.onChange;return l.a.createElement("div",{className:"stylecontrols"},l.a.createElement(R,{editorState:t,onChange:n}),l.a.createElement(x,{editorState:t,onChange:n}))},M=n(115),K=n(116),I=n(4),L=n.n(I);var F=new(function(){function e(){Object(M.a)(this,e),this.highlighted={}}return Object(K.a)(e,[{key:"getDecorations",value:function(e,t){var n,a,l=this,r=0,c=0,o=e.getType(),i=e.getText(),s=e.getKey(),u=Array(i.length).fill(null);if(!["code-block"].includes(o))return L.a.List(u);var m=null===(n=document.querySelector("code[data-offset-key*='".concat(s,"']")))||void 0===n||null===(a=n.closest("pre[class*=language-]"))||void 0===a?void 0:a.className,d=m?/(?<=language-)\w+$/.exec(m):["javascript"],g=E.a.tokenize(i,function(e){return e&&E.a.languages[e]?E.a.languages[e]:E.a.languages.javascript}(d?d[0]:""));this.highlighted[s]={};for(var f=function e(t,n,a){if("string"!==typeof n){var r="tk"+c++,o=s+"-"+r;l.highlighted[s][r]=n,function(e,t,n,a){for(var l=t;l<n;l++)e[l]=a}(t,a,a+n.length,o);for(var i=a,u=0;u<n.content.length;u++){var m=n.content[u];e(t,m,i),i+=m.length}}},h=0;h<g.length;h++){var y=g[h];f(u,y,r),r+=y.length}return L.a.List(u)}},{key:"getComponentForKey",value:function(e){return function(e){return l.a.createElement("span",{className:"token ".concat(e.type)},e.children)}}},{key:"getPropsForKey",value:function(e){var t=e.split("-"),n=Object(h.a)(t,2),a=n[0],l=n[1];return{type:this.highlighted[a][l].type}}}]),e}()),D=(n(226),[{label:"Javascript",syntax:"javascript"},{label:"CSS",syntax:"css"},{label:"HTML",syntax:"html"},{label:"Golang",syntax:"golang"},{label:"C",syntax:"c"},{label:"C++",syntax:"cpp"},{label:"Bash",syntax:"bas"},{label:"Java",syntax:"java"},{label:"Typescript",syntax:"ts"},{label:"React JSX ",syntax:"jsx"},{label:"React TSX",syntax:"tsx"},{label:"Git",syntax:"git"},{label:"Json",syntax:"json"}]),_=function(e){var t=e.children,n=Object(S.a)(e,["children"]),r=Object(a.useState)("javascript"),c=Object(h.a)(r,2),o=c[0],i=c[1];return l.a.createElement("div",{className:"prismjscode"},l.a.createElement("div",{className:"prismjscode-header",contentEditable:!1},l.a.createElement("select",{className:"prismjscode-switch",value:o,onChange:function(e){i(e.target.value)}},D.map((function(e){return l.a.createElement("option",{value:e.syntax,key:e.syntax},e.label)}))),l.a.createElement(N,null,"description")),l.a.createElement("pre",{className:"language-".concat(o)},l.a.createElement("code",n,t)))},A=Object(I.Map)({"code-block":{wrapper:l.a.createElement(_,null)}}),H=y.DefaultDraftBlockRenderMap.merge(A),U=function(e){var t=e.getCurrentContent(),n=e.getSelection().getStartKey();return t.getBlockForKey(n)},J=function(e,t){return U(t).getType()===e},q={getCurrentBlock:U,hasSelectionInBlock:J,onTabInCode:function(e,t){e.preventDefault();var n=t.getCurrentContent(),a=t.getSelection(),l=a.getStartKey(),r=(n.getBlockForKey(l).getText(),null);return r=a.isCollapsed()?b.a.Modifier.insertText(n,a,"  "):b.a.Modifier.replaceText(n,a,"  "),b.a.EditorState.push(t,r,"insert-characters")},hidePlaceholder:function(e){var t=e.getCurrentContent();return!t.hasText()&&"unstyled"!==t.getBlockMap().first().getType()},convertToState:function(e){try{var t=JSON.parse(e);return console.log(t),y.EditorState.createWithContent(Object(y.convertFromRaw)(t))}catch(l){var n=Object(y.convertFromHTML)(e),a=y.ContentState.createFromBlockArray(n.contentBlocks,n.entityMap);return y.EditorState.createWithContent(a)}}},P=function(e){return"blockquote"===e.getType()?"myeditor-blockquote":""},G=(n(227),n(228),function(e){var t=e.contentState,n=e.block;console.log(t,n);var a=t.getEntity(n.getEntityAt(0)).getData().src;return l.a.createElement("img",{src:a,alt:"flower",className:"lanting-editor-image"})}),W=function(e){return function(e){return"atomic"===e.getType()?{component:G,editable:!1}:null}},X=(n(229),function(e){var t=e.rawContent,n=e.onChange,r=Object(a.useRef)(null),c=y.EditorState.createEmpty(F),o=Object(a.useState)(!1),i=Object(h.a)(o,1)[0],s=Object(a.useState)(c),u=Object(h.a)(s,2),m=u[0],d=u[1];Object(a.useEffect)((function(){i||g(),E.a.highlightAll()}),[]),Object(a.useEffect)((function(){console.log(t),t&&d(q.convertToState(t))}),[t]);var g=function(){return r.current&&r.current.focus()},f=function(e){var t=Object(y.convertToRaw)(e.getCurrentContent());d(e),n&&n(t)},b=Object(a.useCallback)((function(){}),[]);return l.a.createElement("div",{className:k()("lanting-editor",{"lanting-editor-hideplaceholder":q.hidePlaceholder(m)}),id:"lanting-editor"},!i&&l.a.createElement(w,{onChange:f,editorState:m}),l.a.createElement(y.Editor,{ref:r,readOnly:i,placeholder:"Your Story",onChange:f,editorState:m,onFocus:function(){document.addEventListener("selectionchange",b)},onBlur:function(){document.removeEventListener("selectionchange",b)},onTab:function(e){q.hasSelectionInBlock("code-block",m)&&f(q.onTabInCode(e,m))},blockRenderMap:H,blockRendererFn:W(m),blockStyleFn:P,handleKeyCommand:function(e,t){var n=y.RichUtils.handleKeyCommand(t,e);return n?(d(n),"handled"):"not-handled"},handleReturn:function(e,t){var n=q.getCurrentBlock(t);return["blockquote","code-block"].includes(n.getType())?(f(y.RichUtils.insertSoftNewline(t)),"handled"):"not-handled"}}))}),z=function(){return l.a.createElement("div",{className:"edit"},l.a.createElement(X,null))},Y=(n(230),n(231),function(){var e=Object(m.f)().pathname,t=Object(a.useMemo)((function(){return"/edit"===e}),[e]);return l.a.createElement("div",{className:k()("lanting-nav")},l.a.createElement("div",{className:"lanting-nav-inner"},l.a.createElement("div",{className:"lanting-nav-title"},l.a.createElement(u.b,{to:"/",className:"lanting-nav-link"},l.a.createElement("h2",{className:"lanting-nav-name"},"\u5170\u4ead")),l.a.createElement("div",{className:"lanting-nav-bio"},"\u6d41\u89de\u66f2\u6c34")),!t&&l.a.createElement(u.b,{className:"lanting-nav-edit",to:"/edit"},l.a.createElement(N,null,"edit"))))});var $=function(){return Object(a.useEffect)((function(){localStorage.setItem("color-mode","light")}),[]),l.a.createElement("div",{className:"app"},l.a.createElement(u.a,null,l.a.createElement(Y,null),l.a.createElement(m.a,{path:"/",exact:!0,component:f}),l.a.createElement(m.c,null,l.a.createElement(m.a,{path:"/edit",component:z}))))};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(s,null,l.a.createElement($,null))),document.getElementById("root"))},50:function(e,t,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.c06a8604.chunk.js.map