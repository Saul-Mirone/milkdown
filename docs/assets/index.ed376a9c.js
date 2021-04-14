var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,s=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,n=(e,s,r)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r,a=(t,a)=>{for(var i in a||(a={}))e.call(a,i)&&n(t,i,a[i]);if(s)for(var i of s(a))r.call(a,i)&&n(t,i,a[i]);return t};import{M as i,I as o,t as l,w as c,a as h,s as u,b as d,l as p,m,S as g,k,E as f,c as w,h as b,i as M,u as y,r as x,d as v,D as O,e as E,f as D,P as _,g as S}from"./vendor.a91c1ba9.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const r=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,a)=>{const i=new URL(t,r);if(self[e].moduleMap[i])return s(self[e].moduleMap[i]);const o=new Blob([`import * as m from '${i}';`,`${e}.moduleMap['${i}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){a(new Error(`Failed to import: ${t}`)),n(l)},onload(){s(self[e].moduleMap[i]),n(l)}});document.head.appendChild(l)})),self[e].moduleMap={}}}("/milkdown/assets/");class ${constructor(t,e,s){this.stack=t,this.schema=e,this.tokenHandlers=s}parseTokens(t){t.forEach(((e,s)=>{const r=this.tokenHandlers[e.type];if(!r)throw new Error("Token type `"+e.type+"` not supported by Markdown parser");r(this,e,t,s)}))}addText(t){t&&this.stack.addText((e=>this.schema.text(t,e)))}transformTokensToDoc(t){this.parseTokens(t);let e=null;do{e=this.stack.closeNode()}while(this.stack.length);return e}}function R(t){return t.isText}class C{constructor(t){this.els=[{type:t,content:[]}],this.marks=i.none}top(){const{els:t}=this;return t[t.length-1]}pushInTopEl(t){var e;null==(e=this.top())||e.content.push(t)}get length(){return this.els.length}openMark(t){this.marks=t.addToSet(this.marks)}closeMark(t){this.marks=t.removeFromSet(this.marks)}addText(t){const e=this.top();if(!e)throw new Error;const s=e.content,r=s[s.length-1],n=t(this.marks),a=r&&function(t,e){if(R(t)&&R(e)&&i.sameSet(t.marks,e.marks))return t.withText(t.text+e.text)}(r,n);a?s[s.length-1]=a:s.push(n)}openNode(t,e){this.els.push({type:t,attrs:e,content:[]})}addNode(t,e,s){const r=t.createAndFill(e,s,this.marks);return r?(this.pushInTopEl(r),r):null}closeNode(){this.marks.length&&(this.marks=i.none);const t=this.els.pop();if(!t)throw new Error;return this.addNode(t.type,t.attrs,t.content)}}function N(t,e,s,r){return t.getAttrs?t.getAttrs(e,s,r):t.attrs}function z(){}function A(t,e){const s={softbreak:t=>t.addText("\n")};return Object.entries(e).forEach((([e,r])=>{if(function(t){return Reflect.has(t,"block")}(r)){const n=t.nodes[r.block];if(!n)throw new Error;return["hr","hardbreak","fence"].includes(e)?void(s[e]=(t,e,s,a)=>{t.stack.openNode(n,N(r,e,s,a)),t.addText(e.content),t.stack.closeNode()}):(s[e+"_open"]=(t,e,s,a)=>t.stack.openNode(n,N(r,e,s,a)),void(s[e+"_close"]=t=>t.stack.closeNode()))}if(!function(t){return Reflect.has(t,"node")}(r)){if(function(t){return Reflect.has(t,"mark")}(r)){const n=t.marks[r.mark];if(!n)throw new Error;return["code_inline"].includes(e)?void(s[e]=(t,e,s,a)=>{t.stack.openMark(n.create(N(r,e,s,a))),t.addText(e.content),t.stack.closeMark(n)}):(s[e+"_open"]=(t,e,s,a)=>t.stack.openMark(n.create(N(r,e,s,a))),void(s[e+"_close"]=t=>t.stack.closeMark(n)))}if(function(t){return Reflect.has(t,"ignore")}(r))return s[e+"_open"]=z,void(s[e+"_close"]=z);throw new RangeError("Unrecognized parsing spec "+JSON.stringify(r))}{const n=t.nodes[r.node];if(!n)throw new Error;s[e]=(t,e,s,a)=>t.stack.addNode(n,N(r,e,s,a))}})),s.inline=(t,e)=>{var s;return t.parseTokens(null!=(s=e.children)?s:[])},s.text=(t,e)=>t.addText(e.content),s}class B{static escape(t,e){let s=t.replace(/[`*\\~[\]]/g,"\\$&");return e&&(s=s.replace(/^[:#\-*+]/,"\\$&").replace(/^(\d+)\./,"$1\\.")),s}static quote(t){const e=-1===t.indexOf('"')?'""':-1===t.indexOf("'")?"''":"()";return e[0]+t+e[1]}static repeat(t,e){return Array(e).fill(t).reduce(((t,e)=>t+e),"")}static getEnclosingWhitespace(t){return{leading:(t.match(/^(\s+)/)||[])[0],trailing:(t.match(/(\s+)$/)||[])[0]}}static removeWhiteSpaceAfter(t){const e=/\s+$/.exec(t);return e?t.slice(0,e.index):t}}class I{constructor(t,e){this.nodes=t,this.marks=e,this.out="",this.delimitation="",this.closed=!1,this.utils=B,this.nodes=t,this.marks=e}get output(){return this.out}get atBlank(){return/(^|\n)$/.test(this.out)}renderContent(t){return t.forEach(((e,s,r)=>this.render(e,t,r))),this}render(t,e,s){const r=this.nodes[t.type.name];if(!r)throw new Error;return r(this,t,e,s),this}ensureNewLine(){return this.atBlank||(this.out+="\n"),this}closeBlock(t){return this.closed=t,this}flushClose(t=1){if(!this.closed)return this;if(this.atBlank||(this.out+="\n"),t>=1){const e=this.utils.removeWhiteSpaceAfter(this.delimitation),s=this.utils.repeat(e+"\n",t);this.out+=s}return this.closed=!1,this}write(t){return this.flushClose(),t?(this.delimitation&&this.atBlank&&(this.out+=this.delimitation),this.out+=t,this):this}text(t,e=!1){const s=t.split("\n");return s.forEach(((t,r)=>{const n=e?this.utils.escape(t,Boolean(this.atBlank||this.closed)):t;this.write(n);r===s.length-1||(this.out+="\n")})),this}wrapBlock(t,e,s,r=t){this.write(r);const n=this.delimitation;return this.delimitation+=t,s(),this.delimitation=n,this.closeBlock(e),this}markString(t,e,s,r){const n=this.marks[t.type.name];if(!n)throw new Error;const a=e?n.open:n.close;return"string"==typeof a?a:a(this,t,s,r)}wrapWithMark(t,e,s,r){const n=this.markString(t,!0,e,s),a=this.markString(t,!1,e,s+1);return this.text(n+r+a),this}serializeMarks(t,e,s,r=!1){return t.map((t=>this.markString(t,r,e,s))).join("")}renderInline(t){let e=[];const s=(t=!1)=>(e,s)=>{var r,n,a,i;const o=null!=(n=null==(r=this.marks[e.type.name])?void 0:r.priority)?n:0,l=null!=(i=null==(a=this.marks[s.type.name])?void 0:a.priority)?i:0;return t?o-l:l-o};return t.forEach(((r,n,a)=>{if(!R(r))return void this.render(r,t,a);const i=r.marks||[],o=e.filter((t=>!i.includes(t))).sort(s()),l=i.filter((t=>!e.includes(t))).sort(s(!0));l.forEach((t=>e.push(t))),e=e.filter((t=>!o.includes(t)));const c=this.serializeMarks(l,t,a,!0),h=this.serializeMarks(o,t,a+1);this.write(h+c+r.text)})),(()=>{const s=this.serializeMarks(e,t,t.childCount+1);this.write(s)})(),this}renderList(t,e,s){this.closed&&this.closed.type===t.type&&this.flushClose(2),t.forEach(((r,n,a)=>{this.wrapBlock(e,t,(()=>this.render(r,t,a)),s(a))}))}}class T{constructor(t){this.editor=t}}class L extends T{}class j extends T{}function W(t,e){return new o(t,((t,s,r,n)=>{const{tr:a}=t,i=s.length;let o=r,l=n;if(s[i-1]){const c=s[0],h=s[i-1],u=s[i-2],d=r+c.indexOf(u),p=d+u.length-1,m=d+u.lastIndexOf(h),g=m+h.length;if(function(t,e,s){let r=[];return s.doc.nodesBetween(t,e,((t,e)=>{r=[...r,...t.marks.map((s=>({start:e,end:e+t.nodeSize,mark:s})))]})),r}(r,n,t).filter((t=>t.mark.type.excludes(e))).filter((t=>t.end>d)).length)return null;g<p&&a.delete(g,p),m>d&&a.delete(d,m),o=d,l=o+h.length}return a.addMark(o,l,e.create()),a.removeStoredMark(e),a}))}const q=[class extends L{constructor(){super(...arguments),this.name="link",this.schema={attrs:{href:{},title:{default:null}},inclusive:!1,parseDOM:[{tag:"a[href]",getAttrs:t=>({href:t.getAttribute("href"),title:t.getAttribute("title")})}],toDOM:t=>["a",a(a({},t.attrs),{class:"link"})]},this.parser={mark:"link",getAttrs:t=>({href:t.attrGet("href"),title:t.attrGet("title")||null})},this.serializer={open:()=>"[",close:(t,e)=>`](${t.utils.escape(e.attrs.href)}${e.attrs.title?` ${t.utils.quote(e.attrs.title)}`:""})`,priority:1},this.inputRules=(t,e)=>[new o(/\[(?<text>.+?)]\((?<href>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/,((s,r,n,a)=>{const[i,o="",l,c]=r,{tr:h}=s;return i&&h.replaceWith(n,a,e.text(o)).addMark(n,o.length+n,t.create({title:c,href:l})),h}))]}},class extends L{constructor(){super(...arguments),this.name="strong",this.schema={parseDOM:[{tag:"b"},{tag:"strong"},{style:"font-style",getAttrs:t=>"bold"===t}],toDOM:()=>["strong",{class:"strong"}]},this.parser={mark:this.name},this.serializer={open:"**",close:"**"},this.inputRules=t=>[W(/(?:__)([^_]+)(?:__)$/,t),W(/(?:\*\*)([^*]+)(?:\*\*)$/,t)],this.keymap=t=>({"Mod-b":l(t)})}},class extends L{constructor(){super(...arguments),this.name="code_inline",this.schema={excludes:"_",parseDOM:[{tag:"code"}],toDOM:()=>["code",{class:"code-inline"}]},this.parser={mark:"code_inline"},this.serializer={open:"`",close:"`"},this.inputRules=t=>[W(/(?:^|[^`])(`([^`]+)`)$/,t)]}},class extends L{constructor(){super(...arguments),this.name="em",this.schema={parseDOM:[{tag:"i"},{tag:"em"},{style:"font-style",getAttrs:t=>"italic"===t}],toDOM:()=>["em",{class:"em"}]},this.parser={mark:"em"},this.serializer={open:"*",close:"*"},this.inputRules=t=>[W(/(?:^|[^_])(_([^_]+)_)$/,t),W(/(?:^|[^*])(\*([^*]+)\*)$/,t)],this.keymap=t=>({"Mod-i":l(t)})}}];const V=Array(5).fill(0).map(((t,e)=>e+1));const P=["","javascript","typescript","bash","sql","json","c","cpp","java","ruby","python","go","rust"];const U=[class extends j{constructor(){super(...arguments),this.name="paragraph",this.schema={content:"inline*",group:"block",parseDOM:[{tag:"p"}],toDOM:()=>["p",{class:"paragraph"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.renderInline(e).closeBlock(e)}}},class extends j{constructor(){super(...arguments),this.name="hardbreak",this.schema={inline:!0,group:"inline",selectable:!1,parseDOM:[{tag:"br"}],toDOM:()=>["br",{class:"bard-break"}]},this.parser={block:this.name},this.serializer=t=>{t.write("  \n")},this.keymap=t=>({"Shift-Enter":(e,s)=>(null==s||s(e.tr.replaceSelectionWith(t.create()).scrollIntoView()),!0)})}},class extends j{constructor(){super(...arguments),this.name="blockquote",this.schema={content:"block+",group:"block",defining:!0,parseDOM:[{tag:"blockquote"}],toDOM:()=>["blockquote",{class:"blockquote"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.wrapBlock("> ",e,(()=>t.renderContent(e)))},this.inputRules=t=>[c(/^\s*>\s$/,t)]}},class extends j{constructor(){super(...arguments),this.name="fence",this.schema={content:"text*",group:"block",marks:"",defining:!0,code:!0,attrs:{language:{default:""}},parseDOM:[{tag:"pre",preserveWhitespace:"full",getAttrs:t=>({language:t.dataset.language})}],toDOM:t=>{const e=this.createSelectElement(t.attrs.language);return["div",{"data-language":t.attrs.language,class:"code-fence"},["div",{contentEditable:"false"},e],["pre",["code",{spellCheck:"false"},0]]]}},this.parser={block:this.name,getAttrs:t=>({language:t.info})},this.serializer=(t,e)=>{t.write("```"+e.attrs.language+"\n"),t.text(e.textContent),t.ensureNewLine(),t.write("```"),t.closeBlock(e)},this.inputRules=t=>[h(/^```$/,t)],this.keymap=()=>({Tab:(t,e)=>{const{tr:s,selection:r}=t;return!!e&&(e(s.insertText("  ",r.from,r.to)),!0)}})}onChangeLanguage(t,e,s){const{view:r}=this.editor,n=r.posAtCoords({top:t,left:e});if(!n)return;const a=r.state.tr.setNodeMarkup(n.inside,void 0,{language:s});r.dispatch(a)}createSelectElement(t){const e=document.createElement("select");return e.className="code-fence_select",e.addEventListener("change",(t=>{if(this.editor.loadState!==F.Complete)throw new Error("Should not trigger event before milkdown ready.");const e=t.target;if(!e)return;const{top:s,left:r}=e.getBoundingClientRect();this.onChangeLanguage(s,r,e.value)})),P.forEach((s=>{const r=document.createElement("option");r.className="code-fence_select-option",r.value=s,r.innerText=s||"--",r.selected=t===s,e.appendChild(r)})),e}},class extends j{constructor(){super(...arguments),this.name="ordered_list",this.schema={content:"list_item+",group:"block",attrs:{order:{default:1}},parseDOM:[{tag:"ol",getAttrs:t=>({order:t.hasAttribute("start")?Number(t.getAttribute("start")):1})}],toDOM:t=>["ol",a(a({},1===t.attrs.order?{}:t.attrs.order),{class:"ordered-list"}),0]},this.parser={block:this.name},this.serializer=(t,e)=>{const{order:s=1}=e.attrs,r=(""+(s+e.childCount-1)).length,n=t.utils.repeat(" ",r+2);t.renderList(e,n,(e=>{const n=`${s+e}`;return t.utils.repeat(" ",r-n.length)+n+". "}))},this.inputRules=t=>[c(/^(\d+)\.\s$/,t,(t=>({order:Number(t[1])})),((t,e)=>e.childCount+e.attrs.order===Number(t[1])))]}},class extends j{constructor(){super(...arguments),this.name="bullet_list",this.schema={content:"list_item+",group:"block",parseDOM:[{tag:"ul"}],toDOM:()=>["ul",{class:"bullet-list"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.renderList(e,"  ",(()=>"* "))},this.inputRules=t=>[c(/^\s*([-+*])\s$/,t)]}},class extends j{constructor(){super(...arguments),this.name="list_item",this.schema={content:"paragraph block*",defining:!0,parseDOM:[{tag:"li"}],toDOM:()=>["li",{class:"list-item"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.renderContent(e)},this.keymap=t=>({Enter:u(t),"Mod-]":d(t),"Mod-[":p(t)})}},class extends j{constructor(){super(...arguments),this.name="heading",this.schema={content:"text*",group:"block",attrs:{level:{default:1}},parseDOM:V.map((t=>({tag:`h${t}`,attrs:{level:t}}))),toDOM:t=>[`h${t.attrs.level}`,{class:`heading h${t.attrs.level}`},0]},this.parser={block:this.name,getAttrs:t=>({level:Number(t.tag.slice(1))})},this.serializer=(t,e)=>{t.write(`${t.utils.repeat("#",e.attrs.level)} `),t.renderInline(e),t.closeBlock(e)},this.inputRules=t=>V.map((e=>h(new RegExp(`^(#{1,${e}})\\s$`),t,(()=>({level:e})))))}},class extends j{constructor(){super(...arguments),this.name="hr",this.schema={group:"block",parseDOM:[{tag:"hr"}],toDOM:()=>["hr",{class:"hr"}]},this.parser={block:this.name},this.serializer=(t,e)=>{t.write("---"),t.closeBlock(e)},this.inputRules=t=>[new o(/^(?:---|___\s|\*\*\*\s)$/,((e,s,r,n)=>{const{tr:a}=e;return s[0]&&a.replaceWith(r,n,t.create({})),a}))]}},class extends j{constructor(){super(...arguments),this.name="image",this.schema={inline:!0,attrs:{src:{},alt:{default:null},title:{default:null}},group:"inline",draggable:!0,parseDOM:[{tag:"img[src]",getAttrs:t=>({src:t.getAttribute("src"),alt:t.getAttribute("alt"),title:t.getAttribute("title")})}],toDOM:t=>["img",a(a({},t.attrs),{class:"image"})]},this.parser={node:"image",getAttrs:t=>{var e,s;return{src:t.attrGet("src"),alt:(null==(s=null==(e=t.children)?void 0:e[0])?void 0:s.content)||null,title:t.attrGet("title")}}},this.serializer=(t,e)=>{const s=t.utils.escape(e.attrs.alt||""),r=e.attrs.title?" "+t.utils.quote(e.attrs.title):"",n=t.utils.escape(e.attrs.src)+r;t.write(`![${s}](${n}) `)},this.inputRules=t=>[new o(/!\[(?<alt>.*?)]\((?<filename>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/,((e,s,r,n)=>{const[a,i,o,l]=s,{tr:c}=e;return a&&c.replaceWith(r,n,t.create({src:o,alt:i,title:l})),c}))]}},class extends j{constructor(){super(...arguments),this.name="tab_indent",this.schema={group:"inline",inline:!0,selectable:!1,parseDOM:[{tag:"span[class='tab-indent']"}],toDOM:()=>["span",{class:"tab-indent"},"  "]},this.parser={block:this.name},this.serializer=t=>{t.write("  ")},this.keymap=t=>({Tab:(e,s)=>{const{selection:r}=e.tr,n=Boolean(e.tr);if(!r)return n;const{from:a,to:i}=r;if(a!==i||!t)return n;const o=e.tr.replaceSelectionWith(t.create()).scrollIntoView();return null==s||s(o),Boolean(o)}})}}];function G(t,e,s={}){return t.reduce(((t,s)=>{const[r,n]=e(s);return a(a({},t),{[r]:n})}),s)}var F,H;(H=F||(F={}))[H.Idle=0]="Idle",H[H.Complete=1]="Complete";const K=(Y=t=>t.isBlock,(t,e)=>((t,e=!0)=>{const s=[];return t.descendants(((t,r)=>{if(s.push({node:t,pos:r}),!e)return!1})),s})(t,e).filter((t=>Y(t.node))));var Y;const J={};const Q="MILKDOWN_PLUGIN_PRISM";const X=document.getElementById("app");if(!X)throw new Error;new class{constructor({root:t,onChange:e,defaultValue:s="",markdownIt:r=new m("commonmark"),getNodes:n=(t=>t),getMarks:a=(t=>t),plugins:i=[]}){this.createInstance=t=>new t(this),this.loadState=F.Idle,this.markdownIt=r,this.onChange=e,this.root=t,this.nodes=n(U).map(this.createInstance),this.marks=a(q).map(this.createInstance),this.schema=this.createSchema(),this.parser=this.createParser(),this.serializer=this.createSerializer(),this.inputRules=this.createInputRules(),this.keymap=this.createKeymap(),this.plugins=i,this.view=this.createView(t,s),this.loadState=F.Complete}get value(){return this.serializer(this.view.state.doc)}createSchema(){const t=G(this.nodes,(t=>[t.name,t.schema])),e=G(this.marks,(t=>[t.name,t.schema]));return new g({nodes:a(a({doc:{content:"block+"}},t),{text:{group:"inline"}}),marks:e})}createParser(){const t=G([...this.nodes,...this.marks],(t=>[t.name,t.parser]));return e=this.schema,s=this.markdownIt,r=t,t=>new $(new C(e.topNodeType),e,A(e,r)).transformTokensToDoc(s.parse(t,{}));var e,s,r}createSerializer(){return function(t,e){return s=>{const r=new I(t,e);return r.renderContent(s),r.output}}(G(this.nodes,(t=>[t.name,t.serializer]),{text(t,e){const{text:s}=e;s&&t.text(s)}}),G(this.marks,(t=>[t.name,t.serializer])))}createInputRules(){return[...this.nodes.filter((t=>Boolean(t.inputRules))).reduce(((t,e)=>{const s=this.schema.nodes[e.name];return s?[...t,...e.inputRules(s,this.schema)]:t}),[]),...this.marks.filter((t=>Boolean(t.inputRules))).reduce(((t,e)=>{const s=this.schema.marks[e.name];return s?[...t,...e.inputRules(s,this.schema)]:t}),[])]}createKeymap(){return[...this.nodes.filter((t=>Boolean(t.keymap))).map((t=>{const e=this.schema.nodes[t.name];if(!e)throw new Error;return t.keymap(e)})),...this.marks.filter((t=>Boolean(t.keymap))).map((t=>{const e=this.schema.marks[t.name];if(!e)throw new Error;return t.keymap(e)}))].map((t=>k(t)))}createView(t,e){const s=this.createViewContainer(t),r=this.createEditorState(e),n=new f(s,{state:r,dispatchTransaction:t=>{var e;const s=n.state.apply(t);n.updateState(s),null==(e=this.onChange)||e.call(this,(()=>this.value))}});return this.prepareViewDom(n.dom),n}createEditorState(t){const e=this.parser(t);return w.create({schema:this.schema,doc:e,plugins:[b(),k({"Mod-z":y,"Shift-Mod-z":x}),M({rules:this.inputRules}),...this.keymap,k(v),...this.plugins]})}createViewContainer(t){const e=document.createElement("div");return e.className="milkdown",t.appendChild(e),e}prepareViewDom(t){t.classList.add("editor"),t.setAttribute("role","textbox")}}({root:X,defaultValue:"\n# Milkdown\n\n![logo](/milkdown/milkdown-mini.svg)\n\n> Milkdown is a WYSIWYG markdown editor.\n>\n> Here is the [repo](https://github.com/Saul-Mirone/milkdown) (*right click to open link*).\n\nYou can check the output markdown text in **developer tool**.\n",onChange:t=>console.log(t()),plugins:[function(t){let e=!1;return new _({key:new S(Q),state:{init:(t,{doc:e})=>O.create(e,[]),apply:(s,r,n,a)=>{const i=a.selection.$head.parent.type.name===t,o=n.selection.$head.parent.type.name===t,l=s.docChanged&&(i||o);return!e||l?(e=!0,function(t,e){const s=[],r=K(t).filter((t=>t.node.type.name===e));return r.forEach((t=>{var e;let r=t.pos+1;const n=t.node.attrs.language;if(n){if(!(null==(e=J[t.pos])?void 0:e.node.eq(t.node))){const e=E.highlight(t.node.textContent,n),s=(t,e=[])=>t.flatMap((t=>"element"===t.type?s(t.children,[...e,...t.properties.className||[]]):[{text:t.value,className:e}])),a=s(e).map((({text:t,className:e})=>{const s=r,n=s+t.length;return r=n,D.inline(s,n,{class:e.join(" ")})}));J[t.pos]={node:t.node,dec:a}}J[t.pos].dec.forEach((t=>{s.push(t)}))}})),Object.keys(J).filter((t=>!r.find((e=>e.pos===Number(t))))).forEach((t=>{delete J[Number(t)]})),O.create(t,s)}(s.doc,t)):r.map(s.mapping,s.doc)}},view:t=>(window.requestAnimationFrame((()=>{t.dispatch(t.state.tr.setMeta(Q,{loaded:!0}))})),{}),props:{decorations(t){return this.getState(t)}}})}("fence")]});