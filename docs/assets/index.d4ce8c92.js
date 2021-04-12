var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,s=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,n=(e,s,r)=>s in e?t(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r,i=(t,i)=>{for(var a in i||(i={}))e.call(i,a)&&n(t,a,i[a]);if(s)for(var a of s(i))r.call(i,a)&&n(t,a,i[a]);return t};import{M as a,I as o,w as l,t as c,s as h,D as u,S as d,E as p,a as m,i as k,k as g,b as f,c as w,d as b,e as y,P as v,f as x}from"./vendor.8161b711.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const r=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,i)=>{const a=new URL(t,r);if(self[e].moduleMap[a])return s(self[e].moduleMap[a]);const o=new Blob([`import * as m from '${a}';`,`${e}.moduleMap['${a}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(o),onerror(){i(new Error(`Failed to import: ${t}`)),n(l)},onload(){s(self[e].moduleMap[a]),n(l)}});document.head.appendChild(l)})),self[e].moduleMap={}}}("/milkdown/assets/");class M{constructor(t,e,s){this.stack=t,this.schema=e,this.tokenHandlers=s}parseTokens(t){t.forEach(((e,s)=>{const r=this.tokenHandlers[e.type];if(!r)throw new Error("Token type `"+e.type+"` not supported by Markdown parser");r(this,e,t,s)}))}addText(t){t&&this.stack.addText((e=>this.schema.text(t,e)))}transformTokensToDoc(t){this.parseTokens(t);let e=null;do{e=this.stack.closeNode()}while(this.stack.length);return e}}function O(t){return t.isText}class E{constructor(t){this.els=[{type:t,content:[]}],this.marks=a.none}top(){const{els:t}=this;return t[t.length-1]}pushInTopEl(t){var e;null==(e=this.top())||e.content.push(t)}get length(){return this.els.length}openMark(t){this.marks=t.addToSet(this.marks)}closeMark(t){this.marks=t.removeFromSet(this.marks)}addText(t){const e=this.top();if(!e)throw new Error;const s=e.content,r=s[s.length-1],n=t(this.marks),i=r&&function(t,e){if(O(t)&&O(e)&&a.sameSet(t.marks,e.marks))return t.withText(t.text+e.text)}(r,n);i?s[s.length-1]=i:s.push(n)}openNode(t,e){this.els.push({type:t,attrs:e,content:[]})}addNode(t,e,s){const r=t.createAndFill(e,s,this.marks);return r?(this.pushInTopEl(r),r):null}closeNode(){this.marks.length&&(this.marks=a.none);const t=this.els.pop();if(!t)throw new Error;return this.addNode(t.type,t.attrs,t.content)}}function _(t,e,s,r){return t.getAttrs?t.getAttrs(e,s,r):t.attrs}function D(){}function R(t,e){const s={softbreak:t=>t.addText("\n")};return Object.entries(e).forEach((([e,r])=>{if(function(t){return Reflect.has(t,"block")}(r)){const n=t.nodes[r.block];if(!n)throw new Error;return["hr","hardbreak","fence"].includes(e)?void(s[e]=(t,e,s,i)=>{t.stack.openNode(n,_(r,e,s,i)),t.addText(e.content),t.stack.closeNode()}):(s[e+"_open"]=(t,e,s,i)=>t.stack.openNode(n,_(r,e,s,i)),void(s[e+"_close"]=t=>t.stack.closeNode()))}if(!function(t){return Reflect.has(t,"node")}(r)){if(function(t){return Reflect.has(t,"mark")}(r)){const n=t.marks[r.mark];if(!n)throw new Error;return["code_inline"].includes(e)?void(s[e]=(t,e,s,i)=>{t.stack.openMark(n.create(_(r,e,s,i))),t.addText(e.content),t.stack.closeMark(n)}):(s[e+"_open"]=(t,e,s,i)=>t.stack.openMark(n.create(_(r,e,s,i))),void(s[e+"_close"]=t=>t.stack.closeMark(n)))}if(function(t){return Reflect.has(t,"ignore")}(r))return s[e+"_open"]=D,void(s[e+"_close"]=D);throw new RangeError("Unrecognized parsing spec "+JSON.stringify(r))}{const n=t.nodes[r.node];if(!n)throw new Error;s[e]=(t,e,s,i)=>t.stack.addNode(n,_(r,e,s,i))}})),s.inline=(t,e)=>{var s;return t.parseTokens(null!=(s=e.children)?s:[])},s.text=(t,e)=>t.addText(e.content),s}class ${static escape(t,e){let s=t.replace(/[`*\\~[\]]/g,"\\$&");return e&&(s=s.replace(/^[:#\-*+]/,"\\$&").replace(/^(\d+)\./,"$1\\.")),s}static quote(t){const e=-1===t.indexOf('"')?'""':-1===t.indexOf("'")?"''":"()";return e[0]+t+e[1]}static repeat(t,e){return Array(e).fill(t).reduce(((t,e)=>t+e),"")}static getEnclosingWhitespace(t){return{leading:(t.match(/^(\s+)/)||[])[0],trailing:(t.match(/(\s+)$/)||[])[0]}}static removeWhiteSpaceAfter(t){const e=/\s+$/.exec(t);return e?t.slice(0,e.index):t}}class S{constructor(t,e){this.nodes=t,this.marks=e,this.out="",this.delimitation="",this.closed=!1,this.utils=$,this.nodes=t,this.marks=e}get output(){return this.out}get atBlank(){return/(^|\n)$/.test(this.out)}renderContent(t){return t.forEach(((e,s,r)=>this.render(e,t,r))),this}render(t,e,s){const r=this.nodes[t.type.name];if(!r)throw new Error;return r(this,t,e,s),this}ensureNewLine(){return this.atBlank||(this.out+="\n"),this}closeBlock(t){return this.closed=t,this}flushClose(t=1){if(!this.closed)return this;if(this.atBlank||(this.out+="\n"),t>=1){const e=this.utils.removeWhiteSpaceAfter(this.delimitation),s=this.utils.repeat(e+"\n",t);this.out+=s}return this.closed=!1,this}write(t){return this.flushClose(),t?(this.delimitation&&this.atBlank&&(this.out+=this.delimitation),this.out+=t,this):this}text(t,e=!1){const s=t.split("\n");return s.forEach(((t,r)=>{const n=e?this.utils.escape(t,Boolean(this.atBlank||this.closed)):t;this.write(n);r===s.length-1||(this.out+="\n")})),this}wrapBlock(t,e,s,r=t){this.write(r);const n=this.delimitation;return this.delimitation+=t,s(),this.delimitation=n,this.closeBlock(e),this}markString(t,e,s,r){const n=this.marks[t.type.name];if(!n)throw new Error;const i=e?n.open:n.close;return"string"==typeof i?i:i(this,t,s,r)}wrapWithMark(t,e,s,r){const n=this.markString(t,!0,e,s),i=this.markString(t,!1,e,s+1);return this.text(n+r+i),this}serializeMarks(t,e,s,r=!1){return t.map((t=>this.markString(t,r,e,s))).join("")}renderInline(t){let e=[];const s=(t=!1)=>(e,s)=>{var r,n,i,a;const o=null!=(n=null==(r=this.marks[e.type.name])?void 0:r.priority)?n:0,l=null!=(a=null==(i=this.marks[s.type.name])?void 0:i.priority)?a:0;return t?o-l:l-o};return t.forEach(((r,n,i)=>{if(!O(r))return void this.render(r,t,i);const a=r.marks||[],o=e.filter((t=>!a.includes(t))).sort(s()),l=a.filter((t=>!e.includes(t))).sort(s(!0));l.forEach((t=>e.push(t))),e=e.filter((t=>!o.includes(t)));const c=this.serializeMarks(l,t,i,!0),h=this.serializeMarks(o,t,i+1);this.write(h+c+r.text)})),(()=>{const s=this.serializeMarks(e,t,t.childCount+1);this.write(s)})(),this}renderList(t,e,s){this.closed&&this.closed.type===t.type&&this.flushClose(2),t.forEach(((r,n,i)=>{this.wrapBlock(e,t,(()=>this.render(r,t,i)),s(i))}))}}class C{constructor(t){this.editor=t}}class N extends C{}class A extends C{}function z(t,e){return new o(t,((t,s,r,n)=>{const{tr:i}=t,a=s.length;let o=r,l=n;if(s[a-1]){const c=s[0],h=s[a-1],u=s[a-2],d=r+c.indexOf(u),p=d+u.length-1,m=d+u.lastIndexOf(h),k=m+h.length;if(function(t,e,s){let r=[];return s.doc.nodesBetween(t,e,((t,e)=>{r=[...r,...t.marks.map((s=>({start:e,end:e+t.nodeSize,mark:s})))]})),r}(r,n,t).filter((t=>t.mark.type.excludes(e))).filter((t=>t.end>d)).length)return null;k<p&&i.delete(k,p),m>d&&i.delete(d,m),o=d,l=o+h.length}return i.addMark(o,l,e.create()),i.removeStoredMark(e),i}))}const I=[class extends N{constructor(){super(...arguments),this.name="link",this.schema={attrs:{href:{},title:{default:null}},inclusive:!1,parseDOM:[{tag:"a[href]",getAttrs:t=>({href:t.getAttribute("href"),title:t.getAttribute("title")})}],toDOM:t=>["a",i(i({},t.attrs),{class:"link"})]},this.parser={mark:"link",getAttrs:t=>({href:t.attrGet("href"),title:t.attrGet("title")||null})},this.serializer={open:()=>"[",close:(t,e)=>`](${t.utils.escape(e.attrs.href)}${e.attrs.title?` ${t.utils.quote(e.attrs.title)}`:""})`,priority:1},this.inputRules=(t,e)=>[new o(/\[(?<text>.+?)]\((?<href>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/,((s,r,n,i)=>{const[a,o="",l,c]=r,{tr:h}=s;return a&&h.replaceWith(n,i,e.text(o)).addMark(n,o.length+n,t.create({title:c,href:l})),h}))],this.keymap=()=>({})}},class extends N{constructor(){super(...arguments),this.name="strong",this.schema={parseDOM:[{tag:"b"},{tag:"strong"},{style:"font-style",getAttrs:t=>"bold"===t}],toDOM:()=>["strong",{class:"strong"}]},this.parser={mark:this.name},this.serializer={open:"**",close:"**"},this.inputRules=t=>[z(/(?:__)([^_]+)(?:__)$/,t),z(/(?:\*\*)([^*]+)(?:\*\*)$/,t)],this.keymap=()=>({})}},class extends N{constructor(){super(...arguments),this.name="code_inline",this.schema={excludes:"_",parseDOM:[{tag:"code"}],toDOM:()=>["code",{class:"code-inline"}]},this.parser={mark:"code_inline"},this.serializer={open:"`",close:"`"},this.inputRules=t=>[z(/(?:^|[^`])(`([^`]+)`)$/,t)],this.keymap=()=>({})}},class extends N{constructor(){super(...arguments),this.name="em",this.schema={parseDOM:[{tag:"i"},{tag:"em"},{style:"font-style",getAttrs:t=>"italic"===t}],toDOM:()=>["em",{class:"em"}]},this.parser={mark:"em"},this.serializer={open:"*",close:"*"},this.inputRules=t=>[z(/(?:^|[^_])(_([^_]+)_)$/,t),z(/(?:^|[^*])(\*([^*]+)\*)$/,t)],this.keymap=()=>({})}}];const T=Array(5).fill(0).map(((t,e)=>e+1));const B=["","javascript","typescript","bash","sql","json","c","cpp","java","ruby","python","go","rust"];const L=[class extends A{constructor(){super(...arguments),this.name="paragraph",this.schema={content:"inline*",group:"block",parseDOM:[{tag:"p"}],toDOM:()=>["p",{class:"paragraph"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.renderInline(e).closeBlock(e)},this.inputRules=()=>[],this.keymap=()=>({})}},class extends A{constructor(){super(...arguments),this.name="hardbreak",this.schema={inline:!0,group:"inline",selectable:!1,parseDOM:[{tag:"br"}],toDOM:()=>["br",{class:"bard-break"}]},this.parser={block:this.name},this.serializer=t=>{t.write("  \n")},this.inputRules=()=>[],this.keymap=t=>({"Shift-Enter":(e,s)=>(null==s||s(e.tr.replaceSelectionWith(t.create()).scrollIntoView()),!0)})}},class extends A{constructor(){super(...arguments),this.name="blockquote",this.schema={content:"block+",group:"block",defining:!0,parseDOM:[{tag:"blockquote"}],toDOM:()=>["blockquote",{class:"blockquote"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.wrapBlock("> ",e,(()=>t.renderContent(e)))},this.inputRules=t=>[l(/^\s*>\s$/,t)],this.keymap=()=>({})}},class extends A{constructor(){super(...arguments),this.name="fence",this.schema={content:"text*",group:"block",marks:"",defining:!0,code:!0,attrs:{language:{default:""}},parseDOM:[{tag:"pre",preserveWhitespace:"full",getAttrs:t=>({language:t.dataset.language})}],toDOM:t=>{const e=this.createSelectElement(t.attrs.language);return["div",{"data-language":t.attrs.language,class:"code-fence"},["div",{contentEditable:"false"},e],["pre",["code",{spellCheck:"false"},0]]]}},this.parser={block:this.name,getAttrs:t=>({language:t.info})},this.serializer=(t,e)=>{t.write("```"+e.attrs.language+"\n"),t.text(e.textContent),t.ensureNewLine(),t.write("```"),t.closeBlock(e)},this.inputRules=t=>[c(/^```$/,t)],this.keymap=()=>({})}onChangeLanguage(t,e,s){const{view:r}=this.editor,n=r.posAtCoords({top:t,left:e});if(!n)return;const i=r.state.tr.setNodeMarkup(n.inside,void 0,{language:s});r.dispatch(i)}createSelectElement(t){const e=document.createElement("select");return e.className="code-fence_select",e.addEventListener("change",(t=>{if(this.editor.loadState!==W.Complete)throw new Error("Should not trigger event before milkdown ready.");const e=t.target;if(!e)return;const{top:s,left:r}=e.getBoundingClientRect();this.onChangeLanguage(s,r,e.value)})),B.forEach((s=>{const r=document.createElement("option");r.className="code-fence_select-option",r.value=s,r.innerText=s||"--",r.selected=t===s,e.appendChild(r)})),e}},class extends A{constructor(){super(...arguments),this.name="ordered_list",this.schema={content:"list_item+",group:"block",attrs:{order:{default:1}},parseDOM:[{tag:"ol",getAttrs:t=>({order:t.hasAttribute("start")?Number(t.getAttribute("start")):1})}],toDOM:t=>["ol",i(i({},1===t.attrs.order?{}:t.attrs.order),{class:"ordered-list"}),0]},this.parser={block:this.name},this.serializer=(t,e)=>{const{order:s=1}=e.attrs,r=(""+(s+e.childCount-1)).length,n=t.utils.repeat(" ",r+2);t.renderList(e,n,(e=>{const n=`${s+e}`;return t.utils.repeat(" ",r-n.length)+n+". "}))},this.inputRules=t=>[l(/^(\d+)\.\s$/,t,(t=>({order:Number(t[1])})),((t,e)=>e.childCount+e.attrs.order===Number(t[1])))],this.keymap=()=>({})}},class extends A{constructor(){super(...arguments),this.name="bullet_list",this.schema={content:"list_item+",group:"block",parseDOM:[{tag:"ul"}],toDOM:()=>["ul",{class:"bullet-list"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.renderList(e,"  ",(()=>"* "))},this.inputRules=t=>[l(/^\s*([-+*])\s$/,t)],this.keymap=()=>({})}},class extends A{constructor(){super(...arguments),this.name="list_item",this.schema={content:"paragraph block*",defining:!0,parseDOM:[{tag:"li"}],toDOM:()=>["li",{class:"list-item"},0]},this.parser={block:this.name},this.serializer=(t,e)=>{t.renderContent(e)},this.inputRules=()=>[],this.keymap=t=>({Enter:h(t)})}},class extends A{constructor(){super(...arguments),this.name="heading",this.schema={content:"text*",group:"block",attrs:{level:{default:1}},parseDOM:T.map((t=>({tag:`h${t}`,attrs:{level:t}}))),toDOM:t=>[`h${t.attrs.level}`,{class:`heading h${t.attrs.level}`},0]},this.parser={block:this.name,getAttrs:t=>({level:Number(t.tag.slice(1))})},this.serializer=(t,e)=>{t.write(`${t.utils.repeat("#",e.attrs.level)} `),t.renderInline(e),t.closeBlock(e)},this.inputRules=t=>T.map((e=>c(new RegExp(`^(#{1,${e}})\\s$`),t,(()=>({level:e}))))),this.keymap=()=>({})}},class extends A{constructor(){super(...arguments),this.name="hr",this.schema={group:"block",parseDOM:[{tag:"hr"}],toDOM:()=>["hr",{class:"hr"}]},this.parser={block:this.name},this.serializer=(t,e)=>{t.write("---"),t.closeBlock(e)},this.inputRules=t=>[new o(/^(?:---|___\s|\*\*\*\s)$/,((e,s,r,n)=>{const{tr:i}=e;return s[0]&&i.replaceWith(r,n,t.create({})),i}))],this.keymap=()=>({})}},class extends A{constructor(){super(...arguments),this.name="image",this.schema={inline:!0,attrs:{src:{},alt:{default:null},title:{default:null}},group:"inline",draggable:!0,parseDOM:[{tag:"img[src]",getAttrs:t=>({src:t.getAttribute("src"),alt:t.getAttribute("alt"),title:t.getAttribute("title")})}],toDOM:t=>["img",i(i({},t.attrs),{class:"image"})]},this.parser={node:"image",getAttrs:t=>{var e,s;return{src:t.attrGet("src"),alt:(null==(s=null==(e=t.children)?void 0:e[0])?void 0:s.content)||null,title:t.attrGet("title")}}},this.serializer=(t,e)=>{const s=t.utils.escape(e.attrs.alt||""),r=e.attrs.title?" "+t.utils.quote(e.attrs.title):"",n=t.utils.escape(e.attrs.src)+r;t.write(`![${s}](${n}) `)},this.inputRules=t=>[new o(/!\[(?<alt>.*?)]\((?<filename>.*?)(?=“|\))"?(?<title>[^"]+)?"?\)/,((e,s,r,n)=>{const[i,a,o,l]=s,{tr:c}=e;return i&&c.replaceWith(r,n,t.create({src:o,alt:a,title:l})),c}))],this.keymap=()=>({})}}];function j(t,e,s={}){return t.reduce(((t,s)=>{const[r,n]=e(s);return i(i({},t),{[r]:n})}),s)}var W,q;(q=W||(W={}))[q.Idle=0]="Idle",q[q.Complete=1]="Complete";const P=(V=t=>t.isBlock,(t,e)=>((t,e=!0)=>{const s=[];return t.descendants(((t,r)=>{if(s.push({node:t,pos:r}),!e)return!1})),s})(t,e).filter((t=>V(t.node))));var V;const U={};const G="MILKDOWN_PLUGIN_PRISM";const F=document.getElementById("app");if(!F)throw new Error;new class{constructor({root:t,onChange:e,defaultValue:s="",markdownIt:r=new u("commonmark"),getNodes:n=(t=>t),getMarks:i=(t=>t),plugins:a=[]}){this.createInstance=t=>new t(this),this.loadState=W.Idle,this.markdownIt=r,this.onChange=e,this.root=t,this.nodes=n(L).map(this.createInstance),this.marks=i(I).map(this.createInstance),this.schema=this.createSchema(),this.parser=this.createParser(),this.serializer=this.createSerializer(),this.inputRules=this.createInputRules(),this.keymap=this.createKeymap(),this.plugins=a,this.view=this.createView(t,s),this.loadState=W.Complete}get value(){return this.serializer(this.view.state.doc)}createSchema(){const t=j(this.nodes,(t=>[t.name,t.schema])),e=j(this.marks,(t=>[t.name,t.schema]));return new d({nodes:i(i({doc:{content:"block+"}},t),{text:{group:"inline"}}),marks:e})}createParser(){const t=j([...this.nodes,...this.marks],(t=>[t.name,t.parser]));return e=this.schema,s=this.markdownIt,r=t,t=>new M(new E(e.topNodeType),e,R(e,r)).transformTokensToDoc(s.parse(t,{}));var e,s,r}createSerializer(){return function(t,e){return s=>{const r=new S(t,e);return r.renderContent(s),r.output}}(j(this.nodes,(t=>[t.name,t.serializer]),{text(t,e){const{text:s}=e;s&&t.text(s)}}),j(this.marks,(t=>[t.name,t.serializer])))}createInputRules(){return[...this.nodes.reduce(((t,e)=>{const s=this.schema.nodes[e.name];return s?[...t,...e.inputRules(s,this.schema)]:t}),[]),...this.marks.reduce(((t,e)=>{const s=this.schema.marks[e.name];return s?[...t,...e.inputRules(s,this.schema)]:t}),[])]}createKeymap(){const t=this.nodes.reduce(((t,e)=>{const s=this.schema.nodes[e.name];return s?i(i({},t),e.keymap(s)):t}),{}),e=this.marks.reduce(((t,e)=>{const s=this.schema.marks[e.name];return s?i(i({},t),e.keymap(s)):t}),{});return i(i({},t),e)}createView(t,e){const s=this.createViewContainer(t),r=this.createEditorState(e),n=new p(s,{state:r,dispatchTransaction:t=>{var e;const s=n.state.apply(t);n.updateState(s),null==(e=this.onChange)||e.call(this,(()=>this.value))}});return this.prepareViewDom(n.dom),n}createEditorState(t){const e=this.parser(t);return m.create({schema:this.schema,doc:e,plugins:[k({rules:this.inputRules}),g(this.keymap),g(f),...this.plugins]})}createViewContainer(t){const e=document.createElement("div");return e.className="milkdown",t.appendChild(e),e}prepareViewDom(t){t.classList.add("editor"),t.setAttribute("role","textbox")}}({root:F,defaultValue:"\n# Milkdown\n\n![logo](/milkdown/milkdown-mini.svg)\n\n> Milkdown is a WYSIWYG markdown editor.\n>\n> Here is the [repo](https://github.com/Saul-Mirone/milkdown) (*right click to open link*).\n\nYou can check the output markdown text in **developer tool**.\n",onChange:t=>console.log(t()),plugins:[function(t){let e=!1;return new v({key:new x(G),state:{init:(t,{doc:e})=>w.create(e,[]),apply:(s,r,n,i)=>{const a=i.selection.$head.parent.type.name===t,o=n.selection.$head.parent.type.name===t,l=s.docChanged&&(a||o);return!e||l?(e=!0,function(t,e){const s=[],r=P(t).filter((t=>t.node.type.name===e));return r.forEach((t=>{var e;let r=t.pos+1;const n=t.node.attrs.language;if(n){if(!(null==(e=U[t.pos])?void 0:e.node.eq(t.node))){const e=b.highlight(t.node.textContent,n),s=(t,e=[])=>t.flatMap((t=>"element"===t.type?s(t.children,[...e,...t.properties.className||[]]):[{text:t.value,className:e}])),i=s(e).map((({text:t,className:e})=>{const s=r,n=s+t.length;return r=n,y.inline(s,n,{class:e.join(" ")})}));U[t.pos]={node:t.node,dec:i}}U[t.pos].dec.forEach((t=>{s.push(t)}))}})),Object.keys(U).filter((t=>!r.find((e=>e.pos===Number(t))))).forEach((t=>{delete U[Number(t)]})),w.create(t,s)}(s.doc,t)):r.map(s.mapping,s.doc)}},view:t=>(window.requestAnimationFrame((()=>{t.dispatch(t.state.tr.setMeta(G,{loaded:!0}))})),{}),props:{decorations(t){return this.getState(t)}}})}("fence")]});
