(this["webpackJsonpipfs-webui"]=this["webpackJsonpipfs-webui"]||[]).push([[14],{1018:function(e,a,n){"use strict";var t=n(52),c=n(53),s=n(71),l=n(70),r=n(72),i=n(0),o=n.n(i),d=n(36),m=n(142);a.a=function(e){var a=function(a){function n(){var e,a;Object(t.a)(this,n);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(l.a)(n)).call.apply(e,[this].concat(r)))).handleJoyrideCallback=function(e){var n=a.props.doDisableTours,t=e.action,c=e.status;("close"===t||[m.a.FINISHED].includes(c))&&n()},a}return Object(r.a)(n,a),Object(c.a)(n,[{key:"render",value:function(){return o.a.createElement(e,Object.assign({handleJoyrideCallback:this.handleJoyrideCallback},this.props))}}]),n}(o.a.Component);return Object(d.b)("doDisableTours",a)}},1043:function(e,a,n){"use strict";n.d(a,"b",(function(){return r})),n.d(a,"c",(function(){return i})),n.d(a,"a",(function(){return o}));var t=n(37),c=n(0),s=n.n(c),l=n(254),r=function(e){var a=e.justify,n=e.className,c=e.children,l=Object(t.a)(e,["justify","className","children"]);return s.a.createElement("div",Object.assign({className:"flex justify-".concat(a," pa2 ").concat(n),style:{backgroundColor:"#f4f6f8"}},l),c)};r.defaultProps={justify:"between",className:""};var i=function(e){var a=e.className,n=e.icon,c=e.title,l=e.children,r=Object(t.a)(e,["className","icon","title","children"]);return n=s.a.createElement(n,{className:"fill-gray w3"}),s.a.createElement("div",Object.assign({className:"ph2 pv3 tc ".concat(a)},r),s.a.createElement("div",{className:"center bg-snow br-100 flex justify-center items-center",style:{width:"80px",height:"80px"}},n),s.a.createElement("p",{className:"charcoal-muted fw5"},c),l)};i.defaultProps={className:""};var o=function(e){var a=e.onCancel,n=e.children,c=e.className,r=Object(t.a)(e,["onCancel","children","className"]);return s.a.createElement("div",Object.assign({className:"".concat(c," bg-white w-80 shadow-4 sans-serif relative"),style:{maxWidth:"30em"}},r),a&&s.a.createElement(l.a,{className:"absolute pointer w2 h2 top-0 right-0 fill-gray",onClick:a}),n)};o.defaultProps={onCancel:null,className:""}},1073:function(e,a,n){"use strict";var t=n(37),c=n(0),s=n.n(c),l=n(1165);function r(e){var a=e.children,n=e.show,c=e.onLeave,r=e.className,i=Object(t.a)(e,["children","show","onLeave","className"]);return s.a.createElement(l.a,Object.assign({},i,{show:n,className:"".concat(r," fixed top-0 left-0 right-0 bottom-0 z-max flex items-center justify-around"),renderBackdrop:function(e){return s.a.createElement("div",Object.assign({className:"fixed top-0 left-0 right-0 bottom-0 bg-black o-50"},e))},onKeyDown:function(e){e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),"Escape"===e.key&&c()},onBackdropClick:c}),a)}r.defaultProps={className:""},a.a=r},1779:function(e){e.exports=JSON.parse('{"cs":{"locale":"cs","nativeName":"\u010ce\u0161tina","englishName":"Czech"},"da":{"locale":"da","nativeName":"Dansk","englishName":"Danish"},"de":{"locale":"de","nativeName":"Deutsch","englishName":"German"},"en":{"locale":"en","nativeName":"English","englishName":"English"},"es":{"locale":"es","nativeName":"Espa\xf1ol","englishName":"Spanish"},"fr":{"locale":"fr","nativeName":"Fran\xe7ais","englishName":"French"},"it":{"locale":"it","nativeName":"Italiano","englishName":"Italian"},"ja-JP":{"locale":"ja-JP","nativeName":"\u65e5\u672c\u8a9e","englishName":"Japanese"},"ko-KR":{"locale":"ko-KR","nativeName":"\ud55c\uad6d\uc5b4 (\u97e9\u56fd)","englishName":"Korean (Korea)"},"nl":{"locale":"nl","nativeName":"Nederlands","englishName":"Dutch"},"no":{"locale":"no","nativeName":"Norsk","englishName":"Norwegian"},"pl":{"locale":"pl","nativeName":"Polski","englishName":"Polish"},"pt":{"locale":"pt","nativeName":"Portugu\xeas","englishName":"Portuguese"},"ru":{"locale":"ru","nativeName":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439","englishName":"Russian"},"sk":{"locale":"sk","nativeName":"Sloven\u010dina","englishName":"Slovak"},"sv":{"locale":"sv","nativeName":"Svenska","englishName":"Swedish"},"zh-CN":{"locale":"zh-CN","nativeName":"\u4e2d\u6587\uff08\u4e2d\u56fd\uff09","englishName":"Chinese Simplified (China)"},"zh-HK":{"locale":"zh-HK","nativeName":"\u4e2d\u6587\uff08\u9999\u6e2f\uff09","englishName":"Chinese Traditional (Hong Kong)"},"zh-TW":{"locale":"zh-TW","nativeName":"\u4e2d\u6587\uff08\u53f0\u7063\uff09","englishName":"Chinese Traditional (Taiwan)"}}')},1788:function(e,a){ace.define("ace/theme/ipfs_dark",["require","exports","module","ace/lib/dom"],(function(e,a,n){a.isDark=!0,a.cssClass="ace-ipfs-dark",a.cssText="\n  .ace-ipfs-dark .ace_gutter {\n  background: #0b3a53;\n  color: #9ad4db;\n  }\n  .ace-ipfs-dark .ace_print-margin {\n  width: 1px;\n  background: #69c4cd;\n  }\n  .ace-ipfs-dark {\n  background-color: #0b3a53;\n  color: #9ad4db;\n  }\n  .ace-ipfs-dark .ace_entity.ace_other.ace_attribute-name,\n  .ace-ipfs-dark .ace_storage {\n  color: #f7f8fa;\n  }\n  .ace-ipfs-dark .ace_rparen,\n  .ace-ipfs-dark .ace_lparen {\n    color: #9ad4db;\n  }\n  .ace-ipfs-dark .ace_cursor,\n  .ace-ipfs-dark .ace_string.ace_regexp {\n  color: #ea5037\n  }\n  .ace-ipfs-dark .ace_marker-layer .ace_active-line,\n  .ace-ipfs-dark .ace_marker-layer .ace_selection {\n  background: rgba(255, 255, 255, 0.1)\n  }\n  .ace-ipfs-dark.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px #244e66;\n  }\n  .ace-ipfs-dark .ace_marker-layer .ace_step {\n  background: rgb(102, 82, 0)\n  }\n  .ace-ipfs-dark .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgba(147, 161, 161, 0.50)\n  }\n  .ace-ipfs-dark .ace_gutter-active-line {\n  background-color: #244e66\n  }\n  .ace-ipfs-dark .ace_marker-layer .ace_selected-word {\n  border: 1px solid #244e66\n  }\n  .ace-ipfs-dark .ace_invisible {\n  color: rgba(147, 161, 161, 0.50)\n  }\n  .ace-ipfs-dark .ace_keyword,\n  .ace-ipfs-dark .ace_meta,\n  .ace-ipfs-dark .ace_support.ace_class,\n  .ace-ipfs-dark .ace_support.ace_type {\n  color: #0aca9f\n  }\n  .ace-ipfs-dark .ace_constant.ace_character,\n  .ace-ipfs-dark .ace_constant.ace_other {\n  color: #f36149\n  }\n  .ace-ipfs-dark .ace_constant.ace_language {\n  color: #f9a13e\n  }\n  .ace-ipfs-dark .ace_constant.ace_numeric {\n  color: #f39021\n  }\n  .ace-ipfs-dark .ace_fold {\n  background-color: #69c4cd;\n  border-color: #93A1A1\n  }\n  .ace-ipfs-dark .ace_entity.ace_name.ace_function,\n  .ace-ipfs-dark .ace_entity.ace_name.ace_tag,\n  .ace-ipfs-dark .ace_support.ace_function,\n  .ace-ipfs-dark .ace_variable,\n  .ace-ipfs-dark .ace_variable.ace_language {\n  color: #edf0f4\n  }\n  .ace-ipfs-dark .ace_string {\n  color: #0aca9f\n  }\n  .ace-ipfs-dark .ace_comment {\n  font-style: italic;\n  color: #657B83\n  }\n  .ace-ipfs-dark .ace_indent-guide {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNg0Db1ZVCxc/sPAAd4AlUHlLenAAAAAElFTkSuQmCC) right repeat-y\n  }",e("../lib/dom").importCssString(a.cssText,a.cssClass)}))},1802:function(e,a,n){"use strict";n.r(a);var t=n(52),c=n(53),s=n(71),l=n(70),r=n(72),i=n(0),o=n.n(i),d=n(144),m=n(36),g=n(15),h=n(142),f=n(179),u=n(1018),p=n(253),b=n(398),v=n(143),E=n(173),k=n(267),N=n(1779),y=function(e){if(!e)return"Unknown";var a=N[e];if(!a){var n=N[e.split("-")[0]];return n&&n.nativeName||N.en.englishName}return a.nativeName},C=n(1073),S=n(37),w=n(1043),_=function(e){return o.a.createElement("svg",Object.assign({viewBox:"0 0 100 100"},e),o.a.createElement("path",{d:"M76.1 16.42c-.81 0-23.86 4.63-43.07 8.52a13.27 13.27 0 0 1-1.48.16c-4.6.39-15.38 1.3-15.38 16.56 0 9.6 4.68 14.68 9.42 16.42l.06 17.67a7.78 7.78 0 0 0 7.5 7.83c2.93 0 9.79 0 9.79-5.08v-.14L40.93 58h5.2c.65.15 3.4.84 6.55 1.62 20.32 5.05 22.75 5.6 23.26 5.6 7.37 0 12.72-10.19 12.72-24.28 0-14.22-5.28-24.52-12.56-24.52zM46 55a30.82 30.82 0 0 1-3.85-14.81 30.46 30.46 0 0 1 3.75-14.67l-.16-.08c8.34-1.68 16.93-3.4 22.86-4.57-3.17 3.82-5.32 10.3-5.65 17.91 0 .68-.05 1.37-.05 2.07v2c.31 7.34 2.31 13.63 5.29 17.51-4.8-1.18-10.77-2.66-14.84-3.68C46.53 55 46.53 55 46.3 55zm30.17-35.58c5.33.09 9.49 9.49 9.49 21.48v.1c0 11.85-4.22 21.15-9.64 21.24-.5-.08-2.5-.55-5.2-1.21-2.48-2.29-4.46-6.39-5.54-11.46 3.08-.09 5.48-3.92 5.48-8.8s-2.38-8.68-5.44-8.77c1.14-5.22 3.25-9.4 5.86-11.6 2.73-.57 4.55-.92 4.99-.98zm-11.12 14h.12c2.22 0 4.09 3.34 4.09 7.3s-1.87 7.31-4.09 7.31H65a41.13 41.13 0 0 1-.58-5.34v-3.77a43.13 43.13 0 0 1 .63-5.46zm-31.9 47.16a4.8 4.8 0 0 1-4.5-4.83l-.06-17.84 9.29-.37 2.06 21c-.08 1.81-3.66 2.04-6.79 2.04zM39.28 55a1.51 1.51 0 0 0-1.11.49v.05l-10 .4a1.4 1.4 0 0 0-.67-.41c-1.39-.36-8.29-2.7-8.29-13.86 0-12.5 8.22-13.19 12.63-13.57a15.6 15.6 0 0 0 1.83-.21l10.43-2.12a31.71 31.71 0 0 0-3.46 14.41A32.29 32.29 0 0 0 44.28 55z"}))},x=function(e){var a=e.t,n=(e.tReady,e.onLeave),t=(e.link,e.className),c=Object(S.a)(e,["t","tReady","onLeave","link","className"]);return o.a.createElement(w.a,Object.assign({},c,{className:t,onCancel:n,style:{maxWidth:"40em"}}),o.a.createElement(w.c,{icon:_},o.a.createElement("p",{className:"charcoal w-80 center"},a("languageModal.description")),o.a.createElement("div",{className:"pa2 flex flex-wrap"},k.b.map((function(e){return o.a.createElement("button",{key:"lang-".concat(e),className:"pa2 w-33 flex nowrap bg-transparent bn outline-0 teal pointer",onClick:function(){return function(e){k.a.changeLanguage(e),n()}(e)}},y(e))})))),o.a.createElement(w.b,null,o.a.createElement(E.a,{className:"ma2",bg:"bg-gray",onClick:n},a("actions.close"))))};x.defaultProps={className:""};var O=x,j=function(e){function a(){var e,n;Object(t.a)(this,a);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(n=Object(s.a)(this,(e=Object(l.a)(a)).call.apply(e,[this].concat(r)))).state={isLanguageModalOpen:!1},n.onLanguageEditOpen=function(){return n.setState({isLanguageModalOpen:!0})},n.onLanguageEditClose=function(){return n.setState({isLanguageModalOpen:!1})},n}return Object(r.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this.props.t;return o.a.createElement(i.Fragment,null,o.a.createElement("div",{className:"flex"},o.a.createElement("div",{className:"ph4 flex items-center bg-white lh-copy charcoal f6 fw5",style:{height:40}},y(k.a.language)),o.a.createElement(E.a,{minWidth:100,onClick:this.onLanguageEditOpen},e("actions.edit"))),o.a.createElement(C.a,{show:this.state.isLanguageModalOpen,onLeave:this.onLanguageEditClose},o.a.createElement(O,{className:"outline-0",onLeave:this.onLanguageEditClose,t:e})))}}]),a}(i.Component),A=n(397),L=n(1780),T=n.n(L),P=(n(1786),n(1788),function(e){function a(){return Object(t.a)(this,a),Object(s.a)(this,Object(l.a)(a).apply(this,arguments))}return Object(r.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){var e=this.props,a=e.value,n=e.readOnly,t=e.onChange,c=Math.max(500,16*a.split("\n").length);return o.a.createElement("div",{className:"pv3 bg-navy br2"},o.a.createElement(T.a,{value:a,readOnly:n,onChange:t,mode:"json",theme:"ipfs_dark",width:"100%",height:c+"px",fontSize:12,showPrintMargin:!1,showGutter:!0,editorProps:{$blockScrolling:1/0},setOptions:{showLineNumbers:!0,tabSize:2}}))}}]),a}(o.a.Component)),I=n(181),R=n(266),D=Object(m.b)("selectExperiments","doExpToggleAction",(function(e){var a=e.doExpToggleAction,n=e.experiments,t=e.t;if(n&&n.length>0){var c=function(e,a){return t("Experiments.".concat(a?"".concat(a,".").concat(e):"".concat(e)))};return o.a.createElement(v.a,{className:"mb3 pa4 lh-copy"},o.a.createElement(R.a,null,t("experiments")),o.a.createElement("p",{className:"db mv4 f6 charcoal mw7"},c("description")),o.a.createElement("div",{className:"flex flex-wrap pb3"},n.map((function(e){var n=e.key,t=e.actionUrls,s=e.enabled,l=e.blocked;return o.a.createElement("div",{key:n,className:"pa3 mr3 mb3 mw6 br3 bg-white dib f6 ba b1 b--light-gray"},o.a.createElement("h3",null,c("title",n)),o.a.createElement("p",{className:"charcoal"},c("description",n)),o.a.createElement(I.a,{className:"dib",disabled:l,onChange:function(){return a(n,s)},checked:s,label:o.a.createElement("span",{className:"fw5 f6"},c("label",n))}),t&&o.a.createElement("div",{className:"mv3"},t.map((function(e,a){return o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",key:e.key,className:"link blue pr2 ".concat(a>0&&"bl b1 pl2 b--light-gray"),href:e.url},c(e.key))}))))}))))}return null}));n.d(a,"SettingsPage",(function(){return z})),n.d(a,"SettingsPageContainer",(function(){return F})),n.d(a,"TranslatedSettingsPage",(function(){return B}));var z=function(e){var a=e.t,n=e.tReady,t=e.isIpfsConnected,c=e.isConfigBlocked,s=e.isLoading,l=e.isSaving,r=e.hasSaveFailed,i=e.hasSaveSucceded,m=e.hasErrors,u=e.hasLocalChanges,b=e.hasExternalChanges,k=e.config,N=e.onChange,y=e.onReset,C=e.onSave,S=e.editorKey,w=e.analyticsEnabled,_=e.doToggleAnalytics,x=e.toursEnabled,O=e.handleJoyrideCallback;return o.a.createElement("div",{"data-id":"SettingsPage",className:"mw9 center"},o.a.createElement(d.Helmet,null,o.a.createElement("title",null,a("title")," - IPFS")),o.a.createElement(v.a,{className:"mb3 pa4"},o.a.createElement("div",{className:"mb4 joyride-settings-language"},o.a.createElement(R.a,null,a("language")),o.a.createElement(j,{t:a})),o.a.createElement("div",{className:"joyride-settings-analytics"},o.a.createElement(R.a,null,a("analytics")),o.a.createElement(A.a,{t:a,doToggleAnalytics:_,analyticsEnabled:w}))),o.a.createElement(D,{t:a}),o.a.createElement(v.a,{className:"mb3 pa4 joyride-settings-config"},o.a.createElement(R.a,null,a("config")),o.a.createElement("div",{className:"flex pb3"},o.a.createElement("div",{className:"flex-auto"},o.a.createElement("div",{className:"mw7"},o.a.createElement(K,{t:a,tReady:n,config:k,isIpfsConnected:t,isConfigBlocked:c,isLoading:s,hasExternalChanges:b,hasSaveFailed:r,hasSaveSucceded:i}))),k?o.a.createElement("div",{className:"flex flex-column justify-center flex-row-l items-center-l"},o.a.createElement(E.a,{minWidth:100,height:40,bg:"bg-charcoal",disabled:l||!u&&!b,onClick:y},a("reset")),o.a.createElement(J,{t:a,tReady:n,hasErrors:m,hasSaveFailed:r,hasSaveSucceded:i,hasLocalChanges:u,hasExternalChanges:b,isSaving:l,onClick:C})):null),k?o.a.createElement(P,{value:k,onChange:N,readOnly:l,key:S}):null),o.a.createElement(h.b,{run:x,steps:f.d.getSteps({t:a,Trans:g.b}),styles:f.d.styles,callback:O,continuous:!0,scrollToFirstStep:!0,locale:Object(p.a)(a),showProgress:!0}))},J=function(e){var a=e.t,n=e.hasErrors,t=e.hasSaveFailed,c=e.hasSaveSucceded,s=e.isSaving,l=e.hasLocalChanges,r=e.hasExternalChanges,i=e.onClick,d=c?"bg-green":"bg-teal";return o.a.createElement(E.a,{minWidth:100,height:40,className:"mt2 mt0-l ml2-l",bg:d,disabled:!l||n,danger:t||r,onClick:i},c&&!t?o.a.createElement(b.a,{height:16,className:"fill-snow",style:{transform:"scale(3)"}}):a(s?"saving":"save"))},K=function(e){var a=e.t,n=e.isIpfsConnected,t=e.isConfigBlocked,c=e.hasExternalChanges,s=e.hasSaveFailed,l=e.hasSaveSucceded,r=e.isLoading,i=e.config;return t?o.a.createElement("p",{className:"ma0 lh-copy charcoal f5 mw7"},a("configApiNotAvailable")):n?i?c?o.a.createElement("p",{className:"ma0 lh-copy red f5 mw7"},o.a.createElement(g.b,{i18nKey:"settingsHaveChanged"},"The settings have changed, please click ",o.a.createElement("strong",null,"Reset")," to update the editor contents")):s?o.a.createElement("p",{className:"ma0 lh-copy red fw6 f5 mw7"},a("errorOccured"),o.a.createElement("span",{className:"db fw4 f6 charcoal-muted"},a("checkConsole"))):l?o.a.createElement("p",{className:"ma0 lh-copy green fw6 f5 mw7"},a("changesSaved"),o.a.createElement("span",{className:"db fw4 f6 charcoal-muted"},a("settingsWillBeUsedNextTime"))):o.a.createElement("p",{className:"ma0 mr2 lh-copy charcoal f6"},a("ipfsConfigDescription")," ",o.a.createElement("a",{href:"https://github.com/ipfs/go-ipfs/blob/master/docs/config.md",rel:"noopener noreferrer",target:"_blank",className:"link blue"},a("ipfsConfigHelp"))):o.a.createElement("p",{className:"ma0 lh-copy charcoal f5 mw7"},a(r?"fetchingSettings":"settingsUnavailable")):o.a.createElement("p",{className:"ma0 lh-copy charcoal f5 mw7"},a("ipfsDaemonOffline"))},F=function(e){function a(){var e,n;Object(t.a)(this,a);for(var c=arguments.length,r=new Array(c),i=0;i<c;i++)r[i]=arguments[i];return(n=Object(s.a)(this,(e=Object(l.a)(a)).call.apply(e,[this].concat(r)))).state={hasErrors:!1,hasLocalChanges:!1,hasExternalChanges:!1,editableConfig:n.props.config,editorKey:Date.now()},n.onChange=function(e){n.setState({hasErrors:!n.isValidJson(e),hasLocalChanges:n.props.config!==e,editableConfig:e})},n.onReset=function(){n.setState({hasErrors:!1,hasLocalChanges:!1,hasExternalChanges:!1,editableConfig:n.props.config,editorKey:Date.now()})},n.onSave=function(){n.props.doSaveConfig(n.state.editableConfig)},n}return Object(r.a)(a,e),Object(c.a)(a,[{key:"isValidJson",value:function(e){try{return JSON.parse(e),!0}catch(a){return!1}}},{key:"isRecent",value:function(e){return e>Date.now()-3e3}},{key:"componentDidUpdate",value:function(e){var a=this;if(this.props.configSaveLastSuccess!==e.configSaveLastSuccess&&setTimeout((function(){return a.onReset()}),3e3),e.config!==this.props.config){if(!e.config||this.isRecent(this.props.configSaveLastSuccess))return this.setState({editableConfig:this.props.config});if(this.props.config!==this.state.editableConfig)return this.setState({hasExternalChanges:!0})}}},{key:"render",value:function(){var e=this.props,a=e.t,n=e.tReady,t=e.isConfigBlocked,c=e.ipfsConnected,s=e.configIsLoading,l=e.configLastError,r=e.configIsSaving,i=e.configSaveLastSuccess,d=e.configSaveLastError,m=e.isIpfsDesktop,g=e.analyticsEnabled,h=e.doToggleAnalytics,f=e.toursEnabled,u=e.handleJoyrideCallback,p=this.state,b=p.hasErrors,v=p.hasLocalChanges,E=p.hasExternalChanges,k=p.editableConfig,N=p.editorKey,y=this.isRecent(i),C=this.isRecent(d),S=s||!k&&!l;return o.a.createElement(z,{t:a,tReady:n,isIpfsConnected:c,isConfigBlocked:t,isLoading:S,isSaving:r,hasSaveFailed:C,hasSaveSucceded:y,hasErrors:b,hasLocalChanges:v,hasExternalChanges:E,config:k,editorKey:N,onChange:this.onChange,onReset:this.onReset,onSave:this.onSave,isIpfsDesktop:m,analyticsEnabled:g,doToggleAnalytics:h,toursEnabled:f,handleJoyrideCallback:u})}}]),a}(o.a.Component),B=Object(g.c)("settings")(F);a.default=Object(m.b)("selectConfig","selectIpfsConnected","selectIsConfigBlocked","selectConfigLastError","selectConfigIsLoading","selectConfigIsSaving","selectConfigSaveLastSuccess","selectConfigSaveLastError","selectIsIpfsDesktop","selectToursEnabled","selectAnalyticsEnabled","doToggleAnalytics","doSaveConfig",Object(u.a)(B))}}]);
//# sourceMappingURL=14.eccaec0d.chunk.js.map