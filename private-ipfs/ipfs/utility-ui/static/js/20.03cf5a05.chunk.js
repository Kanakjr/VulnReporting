(this["webpackJsonpipfs-webui"]=this["webpackJsonpipfs-webui"]||[]).push([[20],{1804:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),l=r(144),o=r(15),c=r(36),i=r(405),s=r(269),u=r(112),p=r(265);function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}function f(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function m(e){var t=e.split("");return t.length<=9?e:{value:e,start:t.slice(0,4).join(""),end:t.slice(t.length-4).join("")}}var b=function(e){var t=e.value,r=e.title,a=e.style,l=f(e,["value","title","style"]);a=Object.assign({},{textDecoration:"none"},a);var o=m(t),c=o.start,i=o.end;return n.a.createElement("abbr",d({title:r||t,style:a},l),n.a.createElement("span",null,c),n.a.createElement("span",{className:"o-20"},"\u2026"),n.a.createElement("span",null,i))},h=r(232);function y(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function v(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function E(e,t,r,a){var n=r.slice(0,a).map((function(e){return e.path})).join("/"),l=e+"/"+t;return n?l+"/"+n:l}var g=function(e){var t=e.cid,r=e.children,a=Object(h.a)(t),l=Object(u.a)(a);return n.a.createElement("div",{className:"dib overflow-hidden"},n.a.createElement("div",{className:"bb bw1 pb1",style:{borderColor:l}},r))},O=function(e){var t=e.path,r=e.hrefBase,a=e.sourceCid,l=t.split("/").filter((function(e){return!!e}));return n.a.createElement("div",{className:"dib"},l.map((function(e,t){var o=l.slice(0,t+1).join("/"),c="".concat(r,"/").concat(o);return n.a.createElement("div",{className:"dib",key:c},0!==t&&n.a.createElement(j,null),n.a.createElement("a",{className:"dib link dark-gray o-50 glow",title:a+"/"+o,href:c},e))})))},j=function(){return n.a.createElement("div",{className:"dib ph2 gray v-top"},"/")},w=function(e){var t=e.cid,r=e.pathBoundaries,a=e.localPath,l=e.hrefBase,o=void 0===l?"#/explore":l,c=e.className,i=void 0===c?"":c,s=v(e,["cid","pathBoundaries","localPath","hrefBase","className"]),u=y(r),p=u[0],d=u.slice(1),f=r[r.length-1],m=E(o,t,r,0);return n.a.createElement("div",s,n.a.createElement("div",{className:"sans-serif ".concat(i)},n.a.createElement(g,{cid:t},n.a.createElement("a",{href:m,className:"monospace link dark-gray o-50 glow"},n.a.createElement(b,{value:t})),p?n.a.createElement("div",{className:"dib"},n.a.createElement(j,null),n.a.createElement(O,{path:p.path,hrefBase:m,sourceCid:t})):null,a&&0===r.length?n.a.createElement("div",{className:"dib"},n.a.createElement(j,null),n.a.createElement(O,{path:a,sourceCid:t,hrefBase:m})):null),d.map((function(e,a){var l=E(o,t,r,a+1);return n.a.createElement("div",{className:"dib",key:a},n.a.createElement(j,null),n.a.createElement(g,{cid:e.source},n.a.createElement(O,{path:e.path,sourceCid:e.source,hrefBase:l})))})),a&&r.length>0?n.a.createElement("div",{className:"dib"},n.a.createElement(j,null),n.a.createElement(g,{cid:f.target},n.a.createElement(O,{path:a,sourceCid:f.target,hrefBase:E(o,t,r,r.length)}))):null))},x=r(166),N=r(142),k=r(242);function P(e){return(P="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function S(e,t){return!t||"object"!==P(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}r.d(t,"ExplorePage",(function(){return _}));var _=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),S(this,C(t).apply(this,arguments))}var r,a,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,e),r=t,(a=[{key:"render",value:function(){var e=this.props,t=e.t,r=e.explore,a=e.exploreIsLoading,o=e.explorePathFromHash,c=e.doExploreLink,d=e.runTour,f=void 0!==d&&d,m=e.joyrideCallback,b=e.gatewayUrl,h=void 0===b?"https://ipfs.io":b;if(!o)return console.log("[IPLD Explorer] ExplorePage loaded without a path to explore"),null;r=r||{};var y=r=a?{}:r,v=y.error,E=y.targetNode,g=y.localPath,O=y.nodes,j=y.pathBoundaries,P=O&&O[0]||null;return n.a.createElement("div",{className:"nt4-l"},n.a.createElement(l.Helmet,null,n.a.createElement("title",null,t("ExplorePage.title"))),j&&E?n.a.createElement(w,{className:"joyride-explorer-crumbs",style:{padding:"15px 0 10px"},cid:P.cid,pathBoundaries:j,localPath:g}):n.a.createElement("div",{style:{height:54}}),n.a.createElement("div",{className:"dt-l dt--fixed"},n.a.createElement("div",{className:"dtc-l w-100 w-two-thirds-l pr3-l v-top"},v?n.a.createElement("div",{className:"bg-red white pa3 lh-copy"},v):null,E?n.a.createElement(u.b,{className:"joyride-explorer-node",style:{background:"#FBFBFB"},cid:E.cid,localPath:g,size:E.size,links:E.links,data:E.data,type:E.type,format:E.format,onLinkClick:c,gatewayUrl:h}):null,v||E?null:n.a.createElement(x.a,{pastDelay:!0})),n.a.createElement("div",{className:"dtc-l w-third-l v-top pt3 pt0-l"},E?n.a.createElement(s.a,{className:"joyride-explorer-cid",style:{background:"#FBFBFB",overflow:"hidden"},cid:E.cid}):null,E?n.a.createElement(i.a,null,n.a.createElement(p.a,{className:"joyride-explorer-graph",style:{width:"100%",height:300},path:E.cid,links:E.links,onNodeClick:c})):null)),n.a.createElement(N.b,{run:f,steps:k.a.getSteps({t:t}),styles:k.a.styles,callback:m,continuous:!0,scrollToFirstStep:!0,showProgress:!0}))}}])&&B(r.prototype,a),o&&B(r,o),t}(n.a.Component);t.default=Object(c.b)("selectExplore","selectExploreIsLoading","selectExplorePathFromHash","doExploreLink",Object(o.c)("explore")(_))}}]);
//# sourceMappingURL=20.03cf5a05.chunk.js.map