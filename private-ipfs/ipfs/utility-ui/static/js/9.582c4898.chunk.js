(this["webpackJsonpipfs-webui"]=this["webpackJsonpipfs-webui"]||[]).push([[9],{1018:function(e,t,a){"use strict";var n=a(52),r=a(53),l=a(71),c=a(70),s=a(72),o=a(0),i=a.n(o),u=a(36),d=a(142);t.a=function(e){var t=function(t){function a(){var e,t;Object(n.a)(this,a);for(var r=arguments.length,s=new Array(r),o=0;o<r;o++)s[o]=arguments[o];return(t=Object(l.a)(this,(e=Object(c.a)(a)).call.apply(e,[this].concat(s)))).handleJoyrideCallback=function(e){var a=t.props.doDisableTours,n=e.action,r=e.status;("close"===n||[d.a.FINISHED].includes(r))&&a()},t}return Object(s.a)(a,t),Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(e,Object.assign({handleJoyrideCallback:this.handleJoyrideCallback},this.props))}}]),a}(i.a.Component);return Object(u.b)("doDisableTours",t)}},1043:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=a(37),r=a(0),l=a.n(r),c=a(254),s=function(e){var t=e.justify,a=e.className,r=e.children,c=Object(n.a)(e,["justify","className","children"]);return l.a.createElement("div",Object.assign({className:"flex justify-".concat(t," pa2 ").concat(a),style:{backgroundColor:"#f4f6f8"}},c),r)};s.defaultProps={justify:"between",className:""};var o=function(e){var t=e.className,a=e.icon,r=e.title,c=e.children,s=Object(n.a)(e,["className","icon","title","children"]);return a=l.a.createElement(a,{className:"fill-gray w3"}),l.a.createElement("div",Object.assign({className:"ph2 pv3 tc ".concat(t)},s),l.a.createElement("div",{className:"center bg-snow br-100 flex justify-center items-center",style:{width:"80px",height:"80px"}},a),l.a.createElement("p",{className:"charcoal-muted fw5"},r),c)};o.defaultProps={className:""};var i=function(e){var t=e.onCancel,a=e.children,r=e.className,s=Object(n.a)(e,["onCancel","children","className"]);return l.a.createElement("div",Object.assign({className:"".concat(r," bg-white w-80 shadow-4 sans-serif relative"),style:{maxWidth:"30em"}},s),t&&l.a.createElement(c.a,{className:"absolute pointer w2 h2 top-0 right-0 fill-gray",onClick:t}),a)};i.defaultProps={onCancel:null,className:""}},1073:function(e,t,a){"use strict";var n=a(37),r=a(0),l=a.n(r),c=a(1165);function s(e){var t=e.children,a=e.show,r=e.onLeave,s=e.className,o=Object(n.a)(e,["children","show","onLeave","className"]);return l.a.createElement(c.a,Object.assign({},o,{show:a,className:"".concat(s," fixed top-0 left-0 right-0 bottom-0 z-max flex items-center justify-around"),renderBackdrop:function(e){return l.a.createElement("div",Object.assign({className:"fixed top-0 left-0 right-0 bottom-0 bg-black o-50"},e))},onKeyDown:function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),"Escape"===e.key&&r()},onBackdropClick:r}),t)}s.defaultProps={className:""},t.a=s},1074:function(e,t,a){"use strict";var n=a(37),r=a(52),l=a(53),c=a(71),s=a(70),o=a(72),i=a(0),u=a.n(i),d=a(173),m=a(1043),p=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(s.a)(t).call(this,e))).onChange=function(e){var t=e.target.value;a.props.onChange&&(t=a.props.onChange(t)),a.setState({value:t})},a.onSubmit=function(){(!a.props.validate||a.props.validate&&a.props.validate(a.state.value))&&a.props.onSubmit(a.state.value)},a.onKeyPress=function(e){"Enter"===e.key&&a.onSubmit()},a.state={value:e.defaultValue},a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.onCancel,a=(e.onChange,e.mustBeDifferent,e.onSubmit,e.className),r=e.icon,l=e.submitText,c=(e.validate,e.defaultValue,e.description),s=e.title,o=Object(n.a)(e,["onCancel","onChange","mustBeDifferent","onSubmit","className","icon","submitText","validate","defaultValue","description","title"]);return u.a.createElement(m.a,Object.assign({},o,{className:a,onCancel:t}),u.a.createElement(m.c,{title:s,icon:r},c&&"object"===typeof c&&c,c&&"string"===typeof c&&u.a.createElement("p",{className:"gray w-80 center"},c),u.a.createElement("input",{onChange:this.onChange,onKeyPress:this.onKeyPress,value:this.state.value,required:!0,autoFocus:!0,className:"input-reset charcoal ba b--black-20 br1 pa2 mb2 db w-75 center focus-outline ".concat(this.inputClass),type:"text"})),u.a.createElement(m.b,null,u.a.createElement(d.a,{className:"ma2",bg:"bg-gray",onClick:t},"Cancel"),u.a.createElement(d.a,{className:"ma2",bg:"bg-teal",disabled:this.isDisabled,onClick:this.onSubmit},l)))}},{key:"inputClass",get:function(){return!this.props.validate||""===this.state.value||this.props.mustBeDifferent&&this.state.value===this.props.defaultValue?"":this.props.validate(this.state.value)?"b--green-muted focus-outline-green":"b--red-muted focus-outline-red"}},{key:"isDisabled",get:function(){return!!(""===this.state.value||this.props.mustBeDifferent&&this.state.value===this.props.defaultValue)||!!this.props.validate&&!this.props.validate(this.state.value)}}]),t}(u.a.Component);p.defaultProps={className:"",defaultValue:"",submitText:"Save",mustBeDifferent:!1},t.a=p},1113:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("svg",Object.assign({viewBox:"0 0 100 100"},e),r.a.createElement("path",{d:"M90 39.9a4.75 4.75 0 0 0-5.4-3.9 4.66 4.66 0 0 0-2.18 1l-8.25-5.41a4.59 4.59 0 0 0 .11-2 4.81 4.81 0 0 0-.25-.94l5.3-4.33a1.22 1.22 0 0 0 .17.15 4.67 4.67 0 0 0 2.78.91 4.79 4.79 0 0 0 3.85-2 4.75 4.75 0 0 0-4.58-7.48 4.74 4.74 0 0 0-4 5.43c0 .13.07.26.1.39l-5.59 4.57a4.69 4.69 0 0 0-3.26-.69 4.85 4.85 0 0 0-.63.16L58.16 11.6c.06-.07.12-.12.17-.19a4.68 4.68 0 0 0 .85-3.53 4.76 4.76 0 1 0-4 5.43c.14 0 .26-.07.4-.1L65.77 27.5a4.73 4.73 0 0 0-.86 3.5c0 .15.07.29.1.43L50 41.13l-.17-.13a4.73 4.73 0 0 0-3.53-.84 4.75 4.75 0 0 0-.7 9.21l.4 25.88a4.73 4.73 0 0 0-2.14 1.53L19.4 67.92a6.35 6.35 0 0 0 0-.87 4.73 4.73 0 0 0-1.9-3.1 4.75 4.75 0 1 0-2.79 8.59 4.73 4.73 0 0 0 3.71-1.81L42.8 79.6a5 5 0 0 0 .05.86c0 .16.08.31.12.46l-10.3 6.75-.14-.13a4.73 4.73 0 0 0-3.53-.85 4.75 4.75 0 0 0 .73 9.44 4.84 4.84 0 0 0 .75-.06 4.73 4.73 0 0 0 3.94-5.43 3.43 3.43 0 0 0-.11-.46l10.3-6.75a4.64 4.64 0 0 0 3.67 1 4.75 4.75 0 0 0 3.61-2.82l12 1a4.73 4.73 0 1 0 .24-3l-12-1A4.73 4.73 0 0 0 49 75.22l-.4-25.93a4.72 4.72 0 0 0 3.13-5.22c0-.14-.08-.28-.11-.42l15-9.66c.06 0 .11.11.17.15a4.7 4.7 0 0 0 3.53.85 4.8 4.8 0 0 0 2.19-1l8.24 5.41a4.74 4.74 0 1 0 9.25.5zM16.88 69.41A2.75 2.75 0 0 1 12 68.22a2.75 2.75 0 0 1 2.28-3.14 3.25 3.25 0 0 1 .44 0 2.73 2.73 0 0 1 1.6.52 2.69 2.69 0 0 1 1.1 1.79 2.73 2.73 0 0 1-.54 2.02zm51.2 9.34a3.11 3.11 0 0 1 .43 0 2.74 2.74 0 0 1 1.61.52 2.69 2.69 0 0 1 1.1 1.73 2.75 2.75 0 1 1-3.14-2.28zM80.07 19A2.74 2.74 0 0 1 85 20.18a2.7 2.7 0 0 1-.49 2 2.75 2.75 0 0 1-3.84.61A2.74 2.74 0 0 1 79.58 21a2.7 2.7 0 0 1 .49-2zm-27.19-8.16a2.74 2.74 0 0 1 1.18-4.93 3.27 3.27 0 0 1 .44 0 2.75 2.75 0 1 1-1.62 5zM32 93a2.75 2.75 0 0 1-3.84.61 2.77 2.77 0 0 1-1.16-1.8 2.73 2.73 0 0 1 .5-2 2.69 2.69 0 0 1 1.79-1.09 2.09 2.09 0 0 1 .43 0 2.68 2.68 0 0 1 1.61.53A2.74 2.74 0 0 1 32 93zm18.29-13.7a2.74 2.74 0 1 1-3.18-2.3 3.13 3.13 0 0 1 .43 0 2.75 2.75 0 0 1 2.71 2.29zm-1-32.86a2.77 2.77 0 0 1-1.8 1.1 2.71 2.71 0 0 1-2-.5 2.74 2.74 0 0 1-1.1-1.79 2.71 2.71 0 0 1 .5-2 2.74 2.74 0 0 1 1.79-1.1 3.11 3.11 0 0 1 .43 0 2.74 2.74 0 0 1 1.61.52 2.69 2.69 0 0 1 1.1 1.8 2.75 2.75 0 0 1-.56 1.96zM70 33a2.75 2.75 0 1 1 2.29-3.14A2.75 2.75 0 0 1 70 33zm15.77 10.35a2.75 2.75 0 0 1-3.14-2.28 2.74 2.74 0 1 1 3.14 2.28z"}))}},1163:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(121),c=a.n(l);t.a=function(e){var t=e.value;if(!t)return null;var a=c()(t).protoNames().concat(["ipfs","p2p"]),n=t.split("/");return r.a.createElement("div",{className:"charcoal-muted monospace"},n.map((function(e,t){return r.a.createElement("span",{key:t},r.a.createElement("span",{className:a.includes(e)?"force-select":"force-select charcoal"},e),t<n.length-1?"/":"")})))}},1773:function(e,t,a){e.exports=a.p+"static/media/StaticMap.5cd62256.svg"},1774:function(e,t,a){},1775:function(e,t,a){},1778:function(e,t,a){},1801:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(36),c=a(144),s=a(15),o=a(142),i=a(1018),u=a(179),d=a(253),m=a(143),p=a(79),f=a(1754),h=a.n(f),b=a(1789),v=a(1290),g=a(7),E=a(1773),w=a.n(E),y=a(1163),N=a(5),j=a(180),O=a.n(j),C=(a(1774),function(e){var t=e.show,a=e.children,n=e.top,l=e.right,c=e.bottom,s=e.left,o=e.align,i=e.handleMouseEnter,u=e.handleMouseLeave;return r.a.createElement("div",{className:O()("popover absolute bg-white shadow-3",o&&"popover--align-".concat(o)),"aria-hidden":t?"false":"true",style:Object(N.a)({},n&&{top:n},{},l&&{right:l},{},c&&{bottom:c},{},s&&{left:s}),onMouseEnter:i,onMouseLeave:u},r.a.createElement("div",{className:"pa2"},a))});C.defaultProps={show:!1};var x=C,k=(a(1775),a(37)),S=a(1776),P=a.n(S),D=a(1777),R=[D.a.navy,D.a.aqua,D.a.gray,D.a.charcoal,D.a.red,D.a.yellow,D.a.teal,D.a.green],L=function(e){var t=e.size,a=void 0===t?14:t,n=e.cid,l=e.className,c=void 0===l?"v-btm":l;return r.a.createElement(P.a,{string:n,size:a,palette:R,className:c})};function M(e){var t=e.split("");return t.length<=9?e:{value:e,start:t.slice(0,4).join(""),end:t.slice(t.length-4).join("")}}var B=function(e){var t=e.value,a=e.title,n=e.style,l=e.identicon,c=void 0!==l&&l,s=Object(k.a)(e,["value","title","style","identicon"]);n=Object.assign({},{textDecoration:"none",marginLeft:c?"5px":null},n);var o=M(t),i=o.start,u=o.end;return r.a.createElement("abbr",Object.assign({title:a||t,style:n},s),c&&r.a.createElement(L,{cid:t,className:"mr1 v-mid"}),r.a.createElement("span",{className:"v-mid"},r.a.createElement("span",null,i),r.a.createElement("span",{className:"o-20"},"\u2026"),r.a.createElement("span",null,u)))},I=function(e){var t=1.7*(e-350);return t>3e3?3e3:t<700?700:t},z=function(e){return e>1e3?.273*e:.5*e},T=Object(l.b)("selectPeers",(function(e){var t=e.peers;return t?t.length:0})),A=function(e){var t=e.width,a=e.height,n=e.children,r=b.b().scale(a/Math.PI).translate([t/2,a/2]).precision(.1);return n({path:b.c().projection(r)})},K=function(e){return e<10?5:e<100?8:10},V=function(e){return e<10?"rgba(150, 204, 255, 0.6)":e<100?"rgba(53, 126, 221, 0.6)":"rgba(53, 126, 221, 0.8)"},F=Object(l.b)("selectPeersCoordinates",(function(e){var t=e.width,a=e.height,n=e.path,r=e.peersCoordinates,l=e.handleMouseEnter,c=e.handleMouseLeave,s=b.d(h.a.createElement("svg")).attr("width",t).attr("height",a).attr("viewBox","0 0 ".concat(t," ").concat(a));return r.forEach((function(e){var t=e.peerIds,a=e.coordinates;s.append("path").datum({type:"Point",coordinates:a}).attr("d",n.pointRadius((function(){return K(t.length)}))).attr("fill",(function(){return V(t.length)})).attr("class","mapDot").on("mouseenter",(function(){return l(t,b.a.relatedTarget)})).on("mouseleave",(function(){return c()}))})),s.node().toReact()})),W=Object(l.b)("selectPeerLocationsForSwarm",(function(e){var t=e.ids,a=e.peerLocationsForSwarm,l=e.t;if(!a)return null;var c=a.filter((function(e){var a=e.peerId;return t.includes(a)}));if(!c.length)return null;var s=Object(n.useMemo)((function(){return-1!==window.navigator.appVersion.indexOf("Win")}),[]);return r.a.createElement("div",{className:"f6 flex flex-column justify-center"},c.sort((function(e,t){return e.address.localeCompare(t.address)})).map((function(e,t){return 5===t&&c.length>5?r.a.createElement("div",{className:"f7 pa1 self-end",key:"worldmap-more-label"},l("plusPeers",{number:c.length-5})):t>5?null:r.a.createElement("div",{className:"pa2 f7 flex items-center monospace",key:e.peerId},r.a.createElement(v.a,{className:"mr1",code:e.flagCode,svg:s}),r.a.createElement("div",{className:"flex flex-auto items-center"},r.a.createElement(y.a,{value:e.address}),r.a.createElement("span",{className:"charcoal-muted"},"/p2p/"),r.a.createElement(B,{value:e.peerId})),r.a.createElement("span",{className:"gray ml1"}," (",e.latency||"???","ms)"))})))})),H=Object(l.b)("selectSelectedPeers","doSetSelectedPeers",Object(s.c)("peers")((function(e){var t=e.t,a=e.className,l=e.selectedPeers,c=e.doSetSelectedPeers,s=Object(n.useState)(I(window.innerWidth)),o=Object(p.a)(s,2),i=o[0],u=o[1],d=Object(n.useState)(z(i)),m=Object(p.a)(d,2),f=m[0],h=m[1],b=Object(n.useState)(null),v=Object(p.a)(b,2),E=v[0],y=v[1];Object(n.useEffect)((function(){var e=Object(g.f)((function(){var e=I(window.innerWidth);u(e),h(z(e))}),100);return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}));var N=Object(n.useCallback)((function(e,t){if(t){clearTimeout(E);var a=t.getBBox(),n=a.x,r=a.y,l=a.width,s=a.height;c({peerIds:e,left:"".concat(n+l/2,"px"),top:"".concat(r-s/2,"px")})}}),[c,E]),j=Object(n.useCallback)((function(){y(setTimeout((function(){return c({})}),600))}),[c]),O=Object(n.useCallback)((function(){return clearTimeout(E)}),[E]);return r.a.createElement("div",{className:"flex flex-column"},r.a.createElement("div",{className:"relative ".concat(a)},r.a.createElement("div",{className:"mb1 flex flex-column items-center"},r.a.createElement("div",{className:"relative no-events",style:{width:i,height:f,background:"transparent url(".concat(w.a,") center no-repeat"),backgroundSize:"auto 100%"}},r.a.createElement(A,{width:i,height:f},(function(e){var t=e.path;return r.a.createElement(F,{width:i,height:f,path:t,handleMouseEnter:N,handleMouseLeave:j})})),(null===l||void 0===l?void 0:l.peerIds)&&r.a.createElement(x,{show:!(!l.top||!l.left),top:l.top,left:l.left,align:"bottom",handleMouseEnter:O,handleMouseLeave:j},r.a.createElement(W,{ids:l.peerIds,t:t})))),r.a.createElement("div",{className:"no-events absolute bottom-0 left-0 right-0"},r.a.createElement("div",{className:"flex flex-auto flex-column items-center self-end pb5-ns no-select"},r.a.createElement("div",{className:"f1 fw5 black"},r.a.createElement(T,null)),r.a.createElement("div",{className:"f4 b ttu charcoal-muted"},t("peers"))))),r.a.createElement("div",{className:"relative flex justify-end pt2 pb4"},r.a.createElement("div",{className:"f6 p2 no-select flex items-center"},r.a.createElement("span",{className:"f6 charcoal-muted pr3"},t("peers"),": "),r.a.createElement("i",{className:"mapDotExplanation mr1",style:{width:2*K(1),height:2*K(1),backgroundColor:V(1)}}),"1-10",r.a.createElement("i",{className:"mapDotExplanation ml3 mr1",style:{width:2*K(50),height:2*K(50),backgroundColor:V(50)}})," 10-100",r.a.createElement("i",{className:"mapDotExplanation ml3 mr1",style:{width:2*K(110),height:2*K(110),backgroundColor:V(110)}}),"100+")))}))),J=a(52),G=a(53),Q=a(71),q=a(70),U=a(96),_=a(72),X=a(116),Y=a(244),Z=(a(1778),function(e){function t(e){var a;return Object(J.a)(this,t),(a=Object(Q.a)(this,Object(q.a)(t).call(this,e))).flagRenderer=function(e,t){var a=-1!==window.navigator.appVersion.indexOf("Win");return r.a.createElement("span",{className:"f4 pr2"},t?"\ud83e\udd1d":e?r.a.createElement(v.a,{code:e,svg:a}):"\ud83c\udf10")},a.locationCellRenderer=function(e){var t=e.rowData,n=t.isPrivate?a.props.t("localNetwork"):t.location?t.isNearby?r.a.createElement("span",null,t.location," ",r.a.createElement("span",{className:"charcoal-muted"},"(",a.props.t("nearby"),")")):t.location:r.a.createElement("span",{className:"charcoal-muted fw4"},a.props.t("unknownLocation"));return r.a.createElement("span",{title:t.location||a.props.t("unknownLocation")},a.flagRenderer(t.flagCode,t.isPrivate),n)},a.latencyCellRenderer=function(e){var t=e.cellData,a={width:"60px"};return t?r.a.createElement("span",{className:"dib tr",style:a},t,"ms"):r.a.createElement("span",{className:"dib tr o-40",style:a},"-")},a.peerIdCellRenderer=function(e){var t=e.cellData;return r.a.createElement(B,{value:t,identicon:!0})},a.notesCellRenderer=function(e){var t=e.cellData;if(t)return"BOOTSTRAP_NODE"===t.type?a.props.t("bootstrapNode"):"RELAY_NODE"===t.type?r.a.createElement(s.b,{i18nKey:"viaRelay",defaults:"via <0>{node}</0>",values:{node:t.node},components:[r.a.createElement(B,{value:t.node,identicon:!0})]}):void 0},a.connectionCellRenderer=function(e){var t=e.rowData;return r.a.createElement("abbr",{style:{textDecoration:"none"},title:t.address},t.connection)},a.rowClassRenderer=function(e){var t,n,r=e.index,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],c=a.props.selectedPeers,s=null===c||void 0===c?void 0:null===(t=c.peerIds)||void 0===t?void 0:t.includes(null===(n=l[r])||void 0===n?void 0:n.peerId);return O()("bb b--near-white peersTableItem",-1===r&&"bg-near-white",s&&"bg-light-gray")},a.state={sortBy:"latency",sortDirection:X.d.ASC},a.sort=a.sort.bind(Object(U.a)(a)),a}return Object(_.a)(t,e),Object(G.a)(t,[{key:"sort",value:function(e){var t=e.sortBy,a=e.sortDirection;this.setState({sortBy:t,sortDirection:a})}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,n=t.peerLocationsForSwarm,l=t.t,c=this.state,s=c.sortBy,o=c.sortDirection,i=(n||[]).sort(Object(Y.b)(s,o===X.d.ASC?1:-1));return r.a.createElement("div",{className:"bg-white-70 center ".concat(a),style:{height:"".concat(400,"px"),maxWidth:1764}},n&&r.a.createElement(X.a,{disableHeight:!0},(function(t){var a=t.width;return r.a.createElement(X.e,{className:"tl fw4 w-100 f6",headerClassName:"teal fw2 ttu tracked ph2",rowClassName:function(t){return e.rowClassRenderer(t,n)},width:a,height:400,headerHeight:32,rowHeight:36,rowCount:n.length,rowGetter:function(e){var t=e.index;return i[t]},sort:e.sort,sortBy:s,sortDirection:o},r.a.createElement(X.b,{label:l("location"),cellRenderer:e.locationCellRenderer,dataKey:"location",width:450,className:"f6 navy-muted truncate pl2"}),r.a.createElement(X.b,{label:l("latency"),cellRenderer:e.latencyCellRenderer,dataKey:"latency",width:250,className:"f6 navy-muted monospace pl2"}),r.a.createElement(X.b,{label:l("peerId"),cellRenderer:e.peerIdCellRenderer,dataKey:"peerId",width:250,className:"charcoal monospace truncate f7 pl2"}),r.a.createElement(X.b,{label:l("connection"),cellRenderer:e.connectionCellRenderer,dataKey:"connection",width:400,className:"f6 navy-muted truncate pl2"}),r.a.createElement(X.b,{label:l("notes"),cellRenderer:e.notesCellRenderer,disableSort:!0,dataKey:"notes",width:400,className:"charcoal monospace truncate f7 pl2"}))})))}}]),t}(r.a.Component)),$=Object(l.b)("selectPeerLocationsForSwarm","selectSelectedPeers",Object(s.c)("peers")(Z)),ee=a(138),te=a.n(ee),ae=a(1113),ne=a(173),re=a(1073),le=a(1074),ce=function(e){function t(){var e,a;Object(J.a)(this,t);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(a=Object(Q.a)(this,(e=Object(q.a)(t)).call.apply(e,[this].concat(l)))).state={open:!1},a.toggleModal=function(){a.setState({open:!a.state.open})},a.addConnection=function(e){a.props.doConnectSwarm(e),a.toggleModal()},a.getDescription=function(){var e=a.props.t;return r.a.createElement("div",{className:"mb3 flex flex-column items-center"},r.a.createElement("p",{className:"gray w-80"},e("insertPeerAddress")),r.a.createElement("span",{className:"w-80 mv2 f7 charcoal-muted"},e("example")),r.a.createElement("code",{className:"w-90 mb1 pa1 bg-snow f7 charcoal-muted truncate"},"/ip4/76.176.168.65/tcp/4001/ipfs/QmbBHw1Xx9pUpAbrVZUKTPL5Rsph5Q9GQhRvcWVBPFgGtC"))},a}return Object(_.a)(t,e),Object(G.a)(t,[{key:"render",value:function(){var e=this.state.open,t=this.props.t;return r.a.createElement("div",null,r.a.createElement(ne.a,{onClick:this.toggleModal,className:"f6 ph3",bg:"bg-navy",color:"white"},r.a.createElement("span",{style:{color:"#8CDDE6"}},"+")," ",t("addConnection")),r.a.createElement(re.a,{show:e,onLeave:this.toggleModal},r.a.createElement(le.a,{validate:te.a.peerMultiaddr,onSubmit:this.addConnection,onCancel:this.toggleModal,submitText:t("add"),icon:ae.a,title:t("addConnection"),description:this.getDescription()})))}}]),t}(r.a.Component),se=Object(l.b)("doConnectSwarm",Object(s.c)("peers")(ce));t.default=Object(l.b)("selectToursEnabled",Object(i.a)(Object(s.c)("peers")((function(e){var t=e.t,a=e.toursEnabled,n=e.handleJoyrideCallback;return r.a.createElement("div",{"data-id":"PeersPage",className:"overflow-hidden"},r.a.createElement(c.Helmet,null,r.a.createElement("title",null,t("title")," - IPFS")),r.a.createElement("div",{className:"flex justify-end mb3"},r.a.createElement(se,null)),r.a.createElement(m.a,{className:"pt3 ph3 pb4"},r.a.createElement(H,{className:"joyride-peers-map"}),r.a.createElement($,{className:"joyride-peers-table"})),r.a.createElement(o.b,{run:a,steps:u.c.getSteps({t:t}),styles:u.c.styles,callback:n,continuous:!0,scrollToFirstStep:!0,locale:Object(d.a)(t),showProgress:!0}))}))))}}]);
//# sourceMappingURL=9.582c4898.chunk.js.map