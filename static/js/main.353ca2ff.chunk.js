(this.webpackJsonplanting=this.webpackJsonplanting||[]).push([[0],{54:function(e,t,n){e.exports=n(84)},59:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){},67:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(27),l=n.n(c),o=(n(59),n(87)),i=new(n(52).a)({uri:"http://localhost:4000"}),m=function(e){var t=e.children;return r.a.createElement(o.a,{client:i},t)},u=n(26),s=n(9),f=n(47),d=(n(62),n(63),function(){return r.a.createElement("article",{className:"lanting-post"},r.a.createElement("header",{className:"lanting-post-header"},r.a.createElement("h3",{className:"lanting-post-title"},"\u5170\u4ead\u96c6\u5e8f")),r.a.createElement("main",{className:"lanting-post-content"},"\u4ef0\u89c2\u5b87\u5b99\u4e4b\u5927\uff0c\u4fef\u5bdf\u54c1\u7c7b\u4e4b\u76db"),r.a.createElement("footer",{className:"lanting-post-footer"},"2020\u5e7407\u670808\u65e515:58:23"))}),E=function(){return r.a.createElement("div",{className:"index"},Object(f.range)(10).map((function(e){return r.a.createElement(d,{key:e})})))},b=(n(64),n(2)),h=n(3),v=n(21),p=function(e){var t=e.attributes,n=e.children;e.element;return r.a.createElement("pre",t,r.a.createElement("code",null,n))},g=n(20),N=n.n(g),k=(n(65),n(53)),j=function(e){var t=e.className,n=e.children,a=e.style,c=Object(k.a)(e,["className","children","style"]);return r.a.createElement("i",Object.assign({className:N()("material-icons",t),style:a},c),n)},y=function(e){var t=e.icon,n=e.active,a=e.onMouseDown;return r.a.createElement("div",{className:N()("mark-button",{"mark-button--active":n}),onMouseDown:a},r.a.createElement(j,{className:"mark-button-icon"},t))},O=function(e,t){var n=h.a.marks(e);return!!n&&!0===n[t]},w=(n(67),function(){var e=Object(v.c)();return r.a.createElement("div",{className:"lanting-editor-toolbar"},[{format:"bold",icon:"format_bold"},{format:"italic",icon:"format_italic"},{format:"underline",icon:"format_underlined"},{format:"code",icon:"code"},{format:"heading-one",icon:"looks_one"},{format:"heading-two",icon:"looks_two"},{format:"block-quote",icon:"format_quote"},{format:"numbered-list",icon:"format_list_numbered"},{format:"bulleted-list",icon:"format_list_bulleted"}].map((function(t){return r.a.createElement(y,{key:t.format,format:t.format,icon:t.icon,active:O(e,t.format),onMouseDown:function(n){n.preventDefault(),function(e,t){O(e,t)?h.a.removeMark(e,t):h.a.addMark(e,t,!0)}(e,t.format)}})})))}),_=function(e){var t=e.attributes,n=e.children;switch(e.element.type){case"block-quote":return r.a.createElement("blockquote",t,n);case"bulleted-list":return r.a.createElement("ul",t,n);case"heading-one":return r.a.createElement("h1",t,n);case"heading-two":return r.a.createElement("h2",t,n);case"list-item":return r.a.createElement("li",t,n);case"numbered-list":return r.a.createElement("ol",t,n);default:return r.a.createElement("p",t,n)}},M=function(e){var t=e.attributes,n=e.children,a=e.leaf;return a.bold&&(n=r.a.createElement("strong",null,n)),a.code&&(n=r.a.createElement("code",null,n)),a.italic&&(n=r.a.createElement("em",null,n)),a.underline&&(n=r.a.createElement("u",null,n)),r.a.createElement("span",t,n)},D=(n(77),function(){var e=Object(a.useState)([{type:"paragraph",children:[{text:""}]}]),t=Object(b.a)(e,2),n=t[0],c=t[1],l=Object(a.useMemo)((function(){return Object(v.d)(Object(h.h)())}),[]),o=Object(a.useCallback)((function(e){return r.a.createElement(M,e)}),[]),i=Object(a.useCallback)((function(e){switch(e.element.type){case"code":return r.a.createElement(p,e);default:return r.a.createElement(_,e)}}),[]);return r.a.createElement(v.b,{editor:l,value:n,onChange:function(e){return c(e)}},r.a.createElement(w,null),r.a.createElement(v.a,{autoFocus:!0,spellCheck:!0,className:"my-editor",placeholder:"Tell a story...",renderElement:i,renderLeaf:o,onKeyDown:function(e){if(e.ctrlKey)switch(e.key){case"b":e.preventDefault(),h.g.setNodes(l,{bold:!0},{match:function(e){return h.f.isText(e)},split:!0})}}}))}),x=function(){return r.a.createElement("div",{className:"edit"},r.a.createElement(D,null))},q=(n(78),n(79),function(){var e=Object(s.f)().pathname,t=Object(a.useMemo)((function(){return"/edit"===e}),[e]);return r.a.createElement("div",{className:N()("lanting-nav")},r.a.createElement("div",{className:"lanting-nav-inner"},r.a.createElement("div",{className:"lanting-nav-title"},r.a.createElement(u.b,{to:"/",className:"lanting-nav-link"},r.a.createElement("h2",{className:"lanting-nav-name"},"\u5170\u4ead")),r.a.createElement("div",{className:"lanting-nav-bio"},"\u6d41\u89de\u66f2\u6c34")),!t&&r.a.createElement(u.b,{className:"lanting-nav-edit",to:"/edit"},r.a.createElement(j,null,"edit"))))});var C=function(){return Object(a.useEffect)((function(){localStorage.setItem("color-mode","light")}),[]),r.a.createElement("div",{className:"app"},r.a.createElement(u.a,null,r.a.createElement(q,null),r.a.createElement(s.a,{path:"/",exact:!0,component:E}),r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/edit",component:x}))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(m,null,r.a.createElement(C,null))),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.353ca2ff.chunk.js.map