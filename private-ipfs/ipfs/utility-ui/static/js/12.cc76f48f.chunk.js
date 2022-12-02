/*! For license information please see 12.cc76f48f.chunk.js.LICENSE */
(this["webpackJsonpipfs-webui"]=this["webpackJsonpipfs-webui"]||[]).push([[12],{1042:function(e,t,n){"use strict";(function(t){!function(t){var n=/^(b|B)$/,r={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},o={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]};function i(e){var t,i,a,c,s,u,l,d,g,f,p,h,b,v,y,m=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},w=[],O=0,S=void 0,D=void 0;if(isNaN(e))throw new TypeError("Invalid number");return i=!0===m.bits,p=!0===m.unix,t=m.base||2,f=void 0!==m.round?m.round:p?1:2,u=void 0!==m.locale?m.locale:"",l=m.localeOptions||{},h=void 0!==m.separator?m.separator:"",b=void 0!==m.spacer?m.spacer:p?"":" ",y=m.symbols||{},v=2===t&&m.standard||"jedec",g=m.output||"string",c=!0===m.fullform,s=m.fullforms instanceof Array?m.fullforms:[],S=void 0!==m.exponent?m.exponent:-1,a=2<t?1e3:1024,(d=(D=Number(e))<0)&&(D=-D),(-1===S||isNaN(S))&&(S=Math.floor(Math.log(D)/Math.log(a)))<0&&(S=0),8<S&&(S=8),"exponent"===g?S:(0===D?(w[0]=0,w[1]=p?"":r[v][i?"bits":"bytes"][S]):(O=D/(2===t?Math.pow(2,10*S):Math.pow(1e3,S)),i&&a<=(O*=8)&&S<8&&(O/=a,S++),w[0]=Number(O.toFixed(0<S?f:0)),w[0]===a&&S<8&&void 0===m.exponent&&(w[0]=1,S++),w[1]=10===t&&1===S?i?"kb":"kB":r[v][i?"bits":"bytes"][S],p&&(w[1]="jedec"===v?w[1].charAt(0):0<S?w[1].replace(/B$/,""):w[1],n.test(w[1])&&(w[0]=Math.floor(w[0]),w[1]=""))),d&&(w[0]=-w[0]),w[1]=y[w[1]]||w[1],!0===u?w[0]=w[0].toLocaleString():0<u.length?w[0]=w[0].toLocaleString(u,l):0<h.length&&(w[0]=w[0].toString().replace(".",h)),"array"===g?w:(c&&(w[1]=s[S]?s[S]:o[v][S]+(i?"bit":"byte")+(1===w[0]?"":"s")),"object"===g?{value:w[0],symbol:w[1]}:w.join(b)))}i.partial=function(e){return function(t){return i(t,e)}},e.exports=i}("undefined"!=typeof window&&window)}).call(this,n(28))},1286:function(e,t,n){"use strict";var r=n(1744).CopyToClipboard;r.CopyToClipboard=r,e.exports=r},1744:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var r=i(n(0)),o=i(n(1745));function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(e){function t(){var e,n,i,c;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var s=arguments.length,u=new Array(s),g=0;g<s;g++)u[g]=arguments[g];return i=this,c=(e=l(t)).call.apply(e,[this].concat(u)),n=!c||"object"!==a(c)&&"function"!==typeof c?d(i):c,f(d(n),"onClick",(function(e){var t=n.props,i=t.text,a=t.onCopy,c=t.children,s=t.options,u=r.default.Children.only(c),l=(0,o.default)(i,s);a&&a(i,l),u&&u.props&&"function"===typeof u.props.onClick&&u.props.onClick(e)})),n}var n,i,p;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,e),n=t,(i=[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),n=s(e,["text","onCopy","options","children"]),o=r.default.Children.only(t);return r.default.cloneElement(o,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{onClick:this.onClick}))}}])&&u(n.prototype,i),p&&u(n,p),t}(r.default.PureComponent);t.CopyToClipboard=p,f(p,"defaultProps",{onCopy:void 0,options:void 0})},1745:function(e,t,n){"use strict";var r=n(1746),o="Copy to clipboard: #{key}, Enter";e.exports=function(e,t){var n,i,a,c,s,u,l=!1;t||(t={}),n=t.debug||!1;try{if(a=r(),c=document.createRange(),s=document.getSelection(),(u=document.createElement("span")).textContent=e,u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",u.addEventListener("copy",(function(n){n.stopPropagation(),t.format&&(n.preventDefault(),n.clipboardData.clearData(),n.clipboardData.setData(t.format,e))})),document.body.appendChild(u),c.selectNodeContents(u),s.addRange(c),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");l=!0}catch(d){n&&console.error("unable to copy using execCommand: ",d),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),l=!0}catch(d){n&&console.error("unable to copy using clipboardData: ",d),n&&console.error("falling back to prompt"),i=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:o),window.prompt(i,e)}}finally{s&&("function"==typeof s.removeRange?s.removeRange(c):s.removeAllRanges()),u&&document.body.removeChild(u),a()}return l}},1746:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],r=0;r<e.rangeCount;r++)n.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach((function(t){e.addRange(t)})),t&&t.focus()}}},1747:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return g}));var r=n(0),o=n.n(r),i=function(e){var t=e.children,n=e.className;return o.a.createElement("div",{className:"inline-block align-top ".concat(n)},t)},a=function(e){var t=e.onClick,n=e.zIndex;return o.a.createElement("div",{onClick:t,style:{position:"fixed",zIndex:n,top:0,right:0,bottom:0,left:0},"data-id":"dropdown-overlay"})},c=function(e){var t=e.open,n=e.top,r=void 0===n?0:n,i=e.children;return o.a.createElement("div",{style:{display:t?null:"none",position:"relative",top:r},"data-id":"dropdown-menu"},i)},s=function(e){var t=e.height,n=e.boxShadow,r=void 0===n?"0px 1px 10px 0px rgba(0,0,0,0.20)":n,i=e.background,a=void 0===i?"white":i,c=e.align,s=void 0===c?"center":c,u=e.marginLeft,l=void 0===u?"auto":u,d=e.marginRight,g=void 0===d?"auto":d,f=Math.round(Math.sqrt(2)*t);return o.a.createElement("div",{style:{position:"absolute",width:"100%",height:"".concat(t,"px"),top:"-".concat(t,"px"),textAlign:s,overflow:"hidden",zIndex:1}},o.a.createElement("div",{style:{display:"inline-block",position:"relative",width:"".concat(f,"px"),height:"".concat(f,"px"),transform:"translate(0, ".concat(t/2,"px) rotate(45deg)"),borderRadius:"2px 0 0 0",background:a,left:l,right:g,boxShadow:r}}))},u=function(e){var t=e.height,n=e.boxShadow,r=void 0===n?"0px 1px 10px 0px rgba(0,0,0,0.20)":n,i=e.background,a=void 0===i?"white":i,c=e.align,s=void 0===c?"center":c,u=e.marginLeft,l=void 0===u?"auto":u,d=e.marginRight,g=void 0===d?"auto":d,f=Math.round(Math.sqrt(2)*t);return o.a.createElement("div",{style:{width:"100%",height:"".concat(t+5,"px"),textAlign:s,overflow:"hidden",zIndex:1}},o.a.createElement("div",{style:{display:"inline-block",position:"relative",width:"".concat(f,"px"),height:"".concat(f,"px"),transform:"translate(0, ".concat(t/2,"px) rotate(45deg)"),borderRadius:"2px 0 0 0",background:a,boxShadow:r,top:"-".concat(t+2,"px"),left:l,right:g}}))},l=function(e){var t=e.width,n=e.left,r=void 0===n?"calc(50% - ".concat(t/2,"px)"):n,i=e.translateX,a=e.translateY,c=e.children,s=e.zIndex;return o.a.createElement("div",{style:{position:"absolute",width:"".concat(t,"px"),left:r,transform:"translateX(".concat(i,"px) translateY(").concat(a,"px)"),zIndex:s}},c)},d=function(e){var t=e.boxShadow,n=void 0===t?"0px 1px 10px 0px rgba(0,0,0,0.20)":t,r=e.background,i=void 0===r?"white":r,a=e.className,c=e.children;return o.a.createElement("div",{style:{position:"relative",textAlign:"left",background:i,boxShadow:n},className:a},c)},g=function(e){var t=e.open,n=e.boxShadow,r=e.className,i=e.background,g=e.translateX,f=void 0===g?0:g,p=e.translateY,h=void 0===p?0:p,b=e.width,v=e.left,y=e.top,m=void 0===y?0:y,w=e.arrowHeight,O=void 0===w?12:w,S=e.arrowPosition,D=void 0===S?"top":S,k=e.arrowAlign,x=e.arrowMarginLeft,C=e.arrowMarginRight,P=e.onDismiss,I=e.alignRight,j=e.children,E=e.baseZIndex,M=void 0===E?100:E;return I&&(v="calc(100% - ".concat(b,"px)"),k="right",C=C||"13px"),o.a.createElement(c,{open:t,top:m+O},o.a.createElement(a,{onClick:P,zIndex:M}),o.a.createElement(l,{zIndex:M+1,width:b,left:v,translateX:f,translateY:h},"top"===D&&o.a.createElement(s,{boxShadow:n,background:i,height:O,align:k,marginLeft:x,marginRight:C}),o.a.createElement(d,{className:r,boxShadow:n,background:i},t?j:null),"bottom"===D&&o.a.createElement(u,{boxShadow:n,background:i,height:O,align:k,marginLeft:x,marginRight:C})))}},1748:function(e,t,n){"use strict";e.exports=function(e){for(var t="utf8",n=0;n<24;n++){var r=e.charCodeAt(n);if(65533===r||r<=8){t="binary";break}}return"binary"===t}},1749:function(e,t,n){"use strict";e.exports=function(e,t){if(t||(t={}),!e)return"";var n=(/[^./\\]*$/.exec(e)||[""])[0];return t.preserveCase?n:n.toLowerCase()}},1753:function(e,t,n){"use strict";var r=n(23),o=n(26);Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(t){r(this,e),this.config={abbrev:["k","m","b","t"],decimal:2},t&&(this.config=Object.assign({},this.config,t))}return o(e,[{key:"simplify",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=e,n=this.config.decimal;n=null!=n?n:2,n=Math.pow(10,n);for(var r=this.config.abbrev,o=r.length-1;o>=0;o--){var i=Math.pow(10,3*(o+1));if(i<=t){1e3===(t=Math.round(t*n/i)/n)&&o<r.length-1&&(t=1,o++),t+=r[o];break}}return String(t)}}]),e}();t.Instance=i,t.default=function(e,t){return new i(t).simplify(e)}},1803:function(e,t,n){"use strict";var r=n(8),o=n(57),i=n(113),a=n(403),c=n(280);function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=!1,l=!1,d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.sourceId=null,this.internalMonitor=t.getMonitor()}var t,n,o;return t=e,(n=[{key:"receiveHandlerId",value:function(e){this.sourceId=e}},{key:"getHandlerId",value:function(){return this.sourceId}},{key:"canDrag",value:function(){Object(r.a)(!u,"You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return u=!0,this.internalMonitor.canDragSource(this.sourceId)}finally{u=!1}}},{key:"isDragging",value:function(){if(!this.sourceId)return!1;Object(r.a)(!l,"You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");try{return l=!0,this.internalMonitor.isDraggingSource(this.sourceId)}finally{l=!1}}},{key:"subscribeToStateChange",value:function(e,t){return this.internalMonitor.subscribeToStateChange(e,t)}},{key:"isDraggingSource",value:function(e){return this.internalMonitor.isDraggingSource(e)}},{key:"isOverTarget",value:function(e,t){return this.internalMonitor.isOverTarget(e,t)}},{key:"getTargetIds",value:function(){return this.internalMonitor.getTargetIds()}},{key:"isSourcePublic",value:function(){return this.internalMonitor.isSourcePublic()}},{key:"getSourceId",value:function(){return this.internalMonitor.getSourceId()}},{key:"subscribeToOffsetChange",value:function(e){return this.internalMonitor.subscribeToOffsetChange(e)}},{key:"canDragSource",value:function(e){return this.internalMonitor.canDragSource(e)}},{key:"canDropOnTarget",value:function(e){return this.internalMonitor.canDropOnTarget(e)}},{key:"getItemType",value:function(){return this.internalMonitor.getItemType()}},{key:"getItem",value:function(){return this.internalMonitor.getItem()}},{key:"getDropResult",value:function(){return this.internalMonitor.getDropResult()}},{key:"didDrop",value:function(){return this.internalMonitor.didDrop()}},{key:"getInitialClientOffset",value:function(){return this.internalMonitor.getInitialClientOffset()}},{key:"getInitialSourceClientOffset",value:function(){return this.internalMonitor.getInitialSourceClientOffset()}},{key:"getSourceClientOffset",value:function(){return this.internalMonitor.getSourceClientOffset()}},{key:"getClientOffset",value:function(){return this.internalMonitor.getClientOffset()}},{key:"getDifferenceFromInitialOffset",value:function(){return this.internalMonitor.getDifferenceFromInitialOffset()}}])&&s(t.prototype,n),o&&s(t,o),e}(),g=n(404),f=n(281),p=n(115);function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var b=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.hooks=Object(g.a)({dragSource:function(e,t){n.clearDragSource(),n.dragSourceOptions=t||null,Object(f.a)(e)?n.dragSourceRef=e:n.dragSourceNode=e,n.reconnectDragSource()},dragPreview:function(e,t){n.clearDragPreview(),n.dragPreviewOptions=t||null,Object(f.a)(e)?n.dragPreviewRef=e:n.dragPreviewNode=e,n.reconnectDragPreview()}}),this.handlerId=null,this.dragSourceRef=null,this.dragSourceOptionsInternal=null,this.dragPreviewRef=null,this.dragPreviewOptionsInternal=null,this.lastConnectedHandlerId=null,this.lastConnectedDragSource=null,this.lastConnectedDragSourceOptions=null,this.lastConnectedDragPreview=null,this.lastConnectedDragPreviewOptions=null,this.backend=t}var t,n,r;return t=e,(n=[{key:"receiveHandlerId",value:function(e){this.handlerId!==e&&(this.handlerId=e,this.reconnect())}},{key:"reconnect",value:function(){this.reconnectDragSource(),this.reconnectDragPreview()}},{key:"reconnectDragSource",value:function(){var e=this.dragSource,t=this.didHandlerIdChange()||this.didConnectedDragSourceChange()||this.didDragSourceOptionsChange();t&&this.disconnectDragSource(),this.handlerId&&(e?t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragSource=e,this.lastConnectedDragSourceOptions=this.dragSourceOptions,this.dragSourceUnsubscribe=this.backend.connectDragSource(this.handlerId,e,this.dragSourceOptions)):this.lastConnectedDragSource=e)}},{key:"reconnectDragPreview",value:function(){var e=this.dragPreview,t=this.didHandlerIdChange()||this.didConnectedDragPreviewChange()||this.didDragPreviewOptionsChange();this.handlerId?this.dragPreview&&t&&(this.lastConnectedHandlerId=this.handlerId,this.lastConnectedDragPreview=e,this.lastConnectedDragPreviewOptions=this.dragPreviewOptions,this.disconnectDragPreview(),this.dragPreviewUnsubscribe=this.backend.connectDragPreview(this.handlerId,e,this.dragPreviewOptions)):this.disconnectDragPreview()}},{key:"didHandlerIdChange",value:function(){return this.lastConnectedHandlerId!==this.handlerId}},{key:"didConnectedDragSourceChange",value:function(){return this.lastConnectedDragSource!==this.dragSource}},{key:"didConnectedDragPreviewChange",value:function(){return this.lastConnectedDragPreview!==this.dragPreview}},{key:"didDragSourceOptionsChange",value:function(){return!Object(p.a)(this.lastConnectedDragSourceOptions,this.dragSourceOptions)}},{key:"didDragPreviewOptionsChange",value:function(){return!Object(p.a)(this.lastConnectedDragPreviewOptions,this.dragPreviewOptions)}},{key:"disconnectDragSource",value:function(){this.dragSourceUnsubscribe&&(this.dragSourceUnsubscribe(),this.dragSourceUnsubscribe=void 0)}},{key:"disconnectDragPreview",value:function(){this.dragPreviewUnsubscribe&&(this.dragPreviewUnsubscribe(),this.dragPreviewUnsubscribe=void 0,this.dragPreviewNode=null,this.dragPreviewRef=null)}},{key:"clearDragSource",value:function(){this.dragSourceNode=null,this.dragSourceRef=null}},{key:"clearDragPreview",value:function(){this.dragPreviewNode=null,this.dragPreviewRef=null}},{key:"connectTarget",get:function(){return this.dragSource}},{key:"dragSourceOptions",get:function(){return this.dragSourceOptionsInternal},set:function(e){this.dragSourceOptionsInternal=e}},{key:"dragPreviewOptions",get:function(){return this.dragPreviewOptionsInternal},set:function(e){this.dragPreviewOptionsInternal=e}},{key:"dragSource",get:function(){return this.dragSourceNode||this.dragSourceRef&&this.dragSourceRef.current}},{key:"dragPreview",get:function(){return this.dragPreviewNode||this.dragPreviewRef&&this.dragPreviewRef.current}}])&&h(t.prototype,n),r&&h(t,r),e}(),v=n(277);function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m=["canDrag","beginDrag","isDragging","endDrag"],w=["beginDrag"],O=function(){function e(t,n,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.props=null,this.beginDrag=function(){if(o.props)return o.spec.beginDrag(o.props,o.monitor,o.ref.current)},this.spec=t,this.monitor=n,this.ref=r}var t,n,r;return t=e,(n=[{key:"receiveProps",value:function(e){this.props=e}},{key:"canDrag",value:function(){return!!this.props&&(!this.spec.canDrag||this.spec.canDrag(this.props,this.monitor))}},{key:"isDragging",value:function(e,t){return!!this.props&&(this.spec.isDragging?this.spec.isDragging(this.props,this.monitor):t===e.getSourceId())}},{key:"endDrag",value:function(){this.props&&this.spec.endDrag&&this.spec.endDrag(this.props,this.monitor,Object(i.b)(this.ref))}}])&&y(t.prototype,n),r&&y(t,r),e}();function S(e,t,n){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};Object(i.a)("DragSource","type, spec, collect[, options]",e,t,n,s);var u=e;"function"!==typeof e&&(Object(r.a)(Object(v.a)(e),'Expected "type" provided as the first argument to DragSource to be a string, or a function that returns a string given the current props. Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',e),u=function(){return e}),Object(r.a)(Object(o.b)(t),'Expected "spec" provided as the second argument to DragSource to be a plain object. Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',t);var l=function(e){return Object.keys(e).forEach((function(t){Object(r.a)(m.indexOf(t)>-1,'Expected the drag source specification to only have some of the following keys: %s. Instead received a specification with an unexpected "%s" key. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',m.join(", "),t),Object(r.a)("function"===typeof e[t],"Expected %s in the drag source specification to be a function. Instead received a specification with %s: %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source",t,t,e[t])})),w.forEach((function(t){Object(r.a)("function"===typeof e[t],"Expected %s in the drag source specification to be a function. Instead received a specification with %s: %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source",t,t,e[t])})),function(t,n){return new O(e,t,n)}}(t);return Object(r.a)("function"===typeof n,'Expected "collect" provided as the third argument to DragSource to be a function that returns a plain object of props to inject. Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',n),Object(r.a)(Object(o.b)(s),'Expected "options" provided as the fourth argument to DragSource to be a plain object when specified. Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source',n),function(e){return Object(a.a)({containerDisplayName:"DragSource",createHandler:l,registerHandler:c.a,createConnector:function(e){return new b(e)},createMonitor:function(e){return new d(e)},DecoratedComponent:e,getType:u,collect:n,options:s})}}n.d(t,"a",(function(){return S}))}}]);
//# sourceMappingURL=12.cc76f48f.chunk.js.map