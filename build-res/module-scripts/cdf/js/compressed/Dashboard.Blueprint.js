define("cdf/dashboard/RefreshEngine",[],function(){return function(t){var e=0,n=new Array,i=null,r=e,a=null,o=function(){return{nextRefresh:0,component:null}
},s=function(n){null!=a&&(clearInterval(a),a=null),r=n>0?n:e,r!=e&&(a=setInterval(t.refreshEngine.fireGlobalRefresh,1e3*r))
},u=function(t){for(var e=0;e<n.length;e++)n[e].component==t&&(n.splice(e,1),e--)
},c=function(){n.length>0&&n.splice(0,n.length)},l=function(t,e){for(var n,i=t.length-1,r=0;i>=r;)if(n=parseInt((r+i)/2),t[n].nextRefresh>e.nextRefresh)i=n-1;
else{if(!(t[n].nextRefresh<e.nextRefresh))return n;r=n+1}return r},d=function(t,e){var n=l(t,e);
t.splice(n,0,e)},h=function(){null!=i&&(clearTimeout(i),i=null)},f=function(){h(),t.refreshEngine.fireRefresh()
},p=function(){return(new Date).getTime()},g=function(t){return n.length>0&&n[0].component==t
},m=function(e){t.update(e)},y=function(t){var i=p();if(t.refreshPeriod>0||(t.refreshPeriod=e),t.refreshPeriod!=e){var r=new o;
r.nextRefresh=i+1e3*t.refreshPeriod,r.component=t,d(n,r)}};return{registerComponent:function(t,n){if(!t)return!1;
t.refreshPeriod=n>0?n:e;var i=g(t);return u(t),i&&f(),!0},getRefreshPeriod:function(t){return t&&t.refreshPeriod>0?t.refreshPeriod:e
},processComponent:function(t){return u(t),y(t),g(t)&&f(),!0},processComponents:function(){c();
for(var e=0;e<t.components.length;e++)y(t.components[e]);return f(),!0},fireRefresh:function(){i=null;
for(var t=p();n.length>0&&n[0].nextRefresh<=t;){var e=n.shift();m(e.component)}n.length>0&&(i=setTimeout(this.fireRefresh,n[0].nextRefresh-t))
},fireGlobalRefresh:function(){for(var e=0;e<t.components.length;e++){var n=t.components[e];
n.refreshPeriod>0||"select"==n.type||m(n)}},setGlobalRefresh:function(t){s(t)},getQueue:function(){return n
}}}}),define("cdf/dashboard/Dashboard",["../lib/Base","../Logger","./RefreshEngine","amd!../lib/underscore","amd!../lib/backbone","../lib/jquery","module","amd!../lib/jquery.impromptu","../lib/shims","css!../lib/cdf.css"],function(t,e,n,i,r,a,o){var s=t.extend({constructor:function(t){function o(t,n){"function"==typeof t?(e.info("Calling init method of module: "+n),t.apply(u)):e.warn("Not calling init method of module: "+n)
}function s(){var t=this;"function"==typeof a?(a.ajaxSetup({async:!1,traditional:!0,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=UTF-8",dataFilter:function(e){return t.lastServerResponse=Date.now(),e
}}),a.prompt&&"function"==typeof a.prompt.setDefaults?a.prompt.setDefaults({prefix:"jqi",show:"slideDown"}):e.log("$.prompt plugin not loaded!!"),"function"==typeof a.blockUI?(a.blockUI.defaults.fadeIn=0,a.blockUI.defaults.message='<div class="blockUIDefaultImg"></div>',a.blockUI.defaults.css.left="50%",a.blockUI.defaults.css.top="40%",a.blockUI.defaults.css.marginLeft="-16px",a.blockUI.defaults.css.width="32px",a.blockUI.defaults.css.background="none",a.blockUI.defaults.overlayCSS={backgroundColor:"#FFFFFF",opacity:.8,cursor:"wait"},a.blockUI.defaults.css.border="none"):e.log("$.blockUI plugin not loaded!!")):e.log("jQuery plugin not loaded!!")
}var u=this;t&&(t.context&&(this.context=t.context),t.storage&&(this.context&&"anonymousUser"===this.context.user||(this.storage=t.storage)),t.view&&(this.view=t.view)),i.extend(this,r.Events),s(),"undefined"!=typeof CONTEXT_PATH&&(this.webAppPath=CONTEXT_PATH),void 0===this.webAppPath&&(this.webAppPath="/"+window.location.pathname.split("/")[1]),this.webAppPath.endsWith("/")&&(this.webAppPath=this.webAppPath.substr(0,this.webAppPath.length-1)),o(this._initContext,"Context"),o(this._initStorage,"Storage"),o(this._initViews,"Views"),o(this._initParameters,"Parameters"),o(this._initBookmarkables,"Bookmarkables"),o(this._initI18n,"I18n"),o(this._initComponents,"Components"),o(this._initLifecycle,"Lifecycle"),o(this._initNotifications,"Notifications"),o(this._initQuery,"Query"),o(this._initAddIns,"AddIns"),this.refreshEngine=new n(this)
},globalContext:!1,contextObj:o.config().context||{},storageObj:o.config().storage||{},viewObj:o.config().view,legacyPriority:-1e3,logLifecycle:!0,args:[],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],registerEvent:function(t,e){"undefined"==typeof this.events&&(this.events={}),this.events[t]=e
},debug:1,syncDebugLevel:function(){var t=1;try{var e=function(t){return t&&/\bdebug=true\b/.test(t)?t:null
},n=e(window.location.href)||e(window.top.location.href);if(n){var i=/\bdebugLevel=(\d+)/.exec(n);
t=i?+i[1]:3}}catch(r){}return this.debug=t},setGlobalContext:function(t){this.globalContext=t
},getWebAppPath:function(){return this.webAppPath},getWcdfSettings:function(){return e.info("getWcdfSettings was not overriden, returning empty object"),{}
}});return s}),define("cdf/dashboard/Dashboard.context",["../lib/jquery","./Dashboard","./Dashboard.ext","./Dashboard.context.ext"],function(t,e){e.implement({_initContext:function(){this.context||(this.context={},t.extend(this.context,this.contextObj))
}})}),define("cdf/dashboard/Container",[],function(){function t(t,e,i){var r;i||(i="instance"),this.build=function(n,a){if(r&&!a)return r;
var o=e(t,n);return a||"singleton"!==i||(r=o),o},this.dispose=function(){r&&(n(r),r=null)
}}function e(t,e,i){i||(i="external"),this.build=function(){return e},this.dispose=function(){e&&("singleton"===i&&n(e),e=null)
}}function n(t){"function"==typeof t.dispose&&t.dispose()}function i(t){for(var e in t)if(r.call(t,e))return!1;
return!0}var r=Object.prototype.hasOwnProperty;return function(){function n(t,e){if(!t)throw new Error("Argument 'type' is required.");
if("string"!=typeof t)throw new Error("Argument 'type' must be a string.");var n=s[t];
if(!e&&(!n||i(n)))throw new Error("There are no registrations for type '"+t+"'.");
return n}function r(t,e,i){var r,a=n(t,i);if(a&&(r=a[e||""],!r&&!i))throw new Error("There is no registration for type '"+t+"'"+(e?" and name '"+e+"'":"")+".");
return r}function a(t,e,n,i,a){"string"!=typeof e&&(n=e,e="");var o=r(t,e,a);return n?i=!0:i||(n={}),o?o.build(n,i):null
}function o(t,e){var i=n(t,e),r=[];for(var a in i)r.push(i[a].build({},!1));return r
}this.register=function(n,i,r,a){if(!n)throw new Error("Argument 'type' is required.");
if("string"!=typeof n)throw new Error("Argument 'type' must be a string.");if(null!=i&&("string"!=typeof i?(a=r,r=i,i=null):i||(i=null)),!r)throw new Error("Argument 'what' is required.");
var o;switch(typeof r){case"function":o=new t(this,r,a);break;case"object":o=new e(this,r,a);
break;default:throw new Error("Argument 'what' is of an invalid type.")}i||(i="");
var u=s[n]||(s[n]={}),c=u[i];c&&c.dispose(),u[i]=o},this.has=function(t,e){return!!r(t,e,!0)
},this.canNew=function(e,n){return r(e,n,!1)instanceof t},this.get=function(t,e){return a(t,e,null,!1,!1)
},this.tryGet=function(t,e){return a(t,e,null,!1,!0)},this.getNew=function(t,e,n){return a(t,e,n,!0,!1)
},this.tryGetNew=function(t,e,n){return a(t,e,n,!0,!0)},this.getAll=function(t){return o(t,!1)
},this.tryGetAll=function(t){return o(t,!0)},this.listType=function(t){return n(t,!1)
},this.tryListType=function(t){return n(t,!0)},this.dispose=function(){if(s){for(var t in s){var e=s[t];
for(var n in e)e[n].dispose()}s=null}};var s={}}}),define("cdf/dashboard/Dashboard.addIns",["./Dashboard","./Container","./Utils"],function(t,e,n){function i(t,e){return-1!==t.indexOf("Component",t.length-"Component".length)&&(t=t.substring(0,t.length-"Component".length)),t=t.charAt(0).toUpperCase()+t.substring(1),e&&(t+="."+e),t
}var r=new e;t.registerGlobalAddIn=function(t,e,n){var t=i(t,e),a=n.getName?n.getName():null;
r.register(t,a,n)},t.implement({_initAddIns:function(){this.addIns=n.clone(r)},registerGlobalAddIn:function(e,n,i){t.registerGlobalAddIn(e,n,i)
},registerAddIn:function(t,e,n){var t=i(t,e),r=n.getName?n.getName():null;this.addIns.register(t,r,n)
},hasAddIn:function(t,e,n){var t=i(t,e);return Boolean(this.addIns&&this.addIns.has(t,n))
},getAddIn:function(t,e,n){var t=i(t,e);try{var r=this.addIns.get(t,n);return r}catch(a){return null
}},setAddInDefaults:function(t,e,n,i){var r=this.getAddIn(t,e,n);r&&r.setDefaults(i)
},listAddIns:function(t,e){var t=i(t,e);try{return this.addIns.listType(t)}catch(n){return[]
}}})}),define("cdf/dashboard/Dashboard.bookmarkable",["./Dashboard","../Logger","./Utils"],function(t,e,n){t.implement({_initBookmarkables:function(){this.bookmarkables={}
},getHashValue:function(t){var e,n=window.location.hash;try{e=JSON.parse(n.slice(1))
}catch(i){e={}}return 0===arguments.length?e:e[t]},setHashValue:function(t,e){var n,i=this.getHashValue();
1==arguments.length?i=t:i[t]=e,n=JSON.stringify(i),"{}"!=n?window.location.hash=n:window.location.hash&&(window.location.hash="")
},deleteHashValue:function(t){var e=this.getHashValue();0===arguments.length?window.location.hash="":(delete e[t],this.setHashValue(e))
},setBookmarkable:function(t,e){1===arguments.length&&(e=!0),this.bookmarkables[t]=e
},isBookmarkable:function(t){return Boolean(this.bookmarkables[t])},generateBookmarkState:function(){var t={},e=this.bookmarkables;
for(var n in e)e.hasOwnProperty(n)&&e[n]&&(t[n]=this.getParameterValue(n));return t
},persistBookmarkables:function(t){var e=this.bookmarkables,n={};e[t]&&this.finishedInit&&(n=this.generateBookmarkState(),this.setBookmarkState({impl:"client",params:n}))
},setBookmarkState:function(t){if(window.history&&window.history.replaceState){var e,i=window.location.pathname.split("/").pop(),r=window.location.search.slice(1).split("&").map(function(t){var e=t.split("=");
return e[1]=decodeURIComponent(e[1]),e});r=n.propertiesArrayToObject(r),r.bookmarkState=JSON.stringify(t),e=i+"?"+$.param(r),window.history.replaceState({},"",e),this.deleteHashValue("bookmark")
}else this.setHashValue("bookmark",t)},getBookmarkState:function(){if(window.location.hash.length>1)try{return this.getHashValue("bookmark")||{}
}catch(t){}var e=window.location.search.slice(1).split("&").map(function(t){var e=t.split("=");
return e[1]=decodeURIComponent(e[1]),e}),i=n.propertiesArrayToObject(e);return i.bookmarkState?JSON.parse(decodeURIComponent(i.bookmarkState.replace(/\+/g," ")))||{}:{}
},restoreBookmarkables:function(){var t;try{t=this.getBookmarkState().params;for(var n in t)t.hasOwnProperty(n)&&this.setParameter(n,t[n])
}catch(i){e.log(i,"error")}}})}),define("cdf/dashboard/Dashboard.components",["./Dashboard","amd!../lib/backbone","../lib/mustache","../Logger","../lib/jquery"],function(t,e,n,i,r){t.implement({_initComponents:function(){this.components=[]
},getComponent:function(t){if(t)for(var e in this.components)if(this.components[e].name==t)return this.components[e]
},getComp:function(t){return this.getComponent(t)},getComponentByName:function(t){return this.getComponent(t)
},addComponents:function(t){return r.isArray(t)?(t.forEach(function(t){this.addComponent(t)
},this),void 0):(i.warn("addComponents: components in a structure other than an array will not be added!"),void 0)
},addComponent:function(t,e){this.removeComponent(t),this._bindControl(t);var n=e&&e.index,i=this.components.length;
(null==n||0>n||n>i)&&(n=i),this.components[n]=t},getComponentIndex:function(t){if(null!=t)switch(typeof t){case"string":for(var e=0,n=this.components,i=n.length;i>e;e++)if(n[e].name===t)return e;
break;case"number":if(t>=0&&t<this.components.length)return t;break;default:return this.components.indexOf(t)
}return-1},removeComponent:function(t){var e=this.getComponentIndex(t),n=null;if(e>=0){var i=this.components;
n=i[e],i.splice(e,1),n.dashboard=null,n.off("cdf:postExecution"),n.off("cdf:preExecution"),n.off("cdf:error"),n.off("all")
}return n},_bindControl:function(t){return t.dashboard||(t.dashboard=this,this._addLogLifecycleToControl(t)),t
},_bindExistingControl:function(t){return t.dashboard||(t.dashboard=this,delete t.initInstance,"function"==typeof t.off&&t.off("all"),t.on||r.extend(t,e.Events),this._addLogLifecycleToControl(t),(null==t.priority||""===t.priority)&&(t.priority=this.legacyPriority++)),t
},_castControlToClass:function(t,e){if(!(t instanceof e)){var n=this._makeInstance(e);
r.extend(t,n)}},_getControlClass:function(t){var e=t.type;"function"==typeof e&&(e=e.call(t));
for(var n=e.substring(0,1).toUpperCase()+e.substring(1),i=[n+"Component",e,n],r=0,a=i.length;a>r;r++){var o=window[i[r]];
if(o&&"function"==typeof o)return o}},_makeInstance:function(t,e){var n=Object.create(t.prototype);
return e?t.apply(n,e):t.apply(n),n},_castControlToComponent:function(t,e){if(!(t instanceof BaseComponent||e&&e.prototype instanceof BaseComponent)){var n=BaseComponent.prototype;
for(var i in n)if(n.hasOwnProperty(i)&&void 0===t[i]&&"function"==typeof n[i])switch(i){case"base":break;
default:t[i]=n[i]}}},_addLogLifecycleToControl:function(t){t.on("all",function(t){var e=this.dashboard;
if(e&&e.logLifecycle&&"cdf"!==t&&"PostInitMarker"!==this.name&&"undefined"!=typeof console){var r,a=t.substr(4);
switch(a){case"preExecution":r=">Start";break;case"postExecution":r="<End  ";break;
case"error":r="!Error";break;default:r="      "}var o=n.render("Timing: {{elapsedSinceStartDesc}} since start, {{elapsedSinceStartDesc}} since last event",this.splitTimer());
i.log("          [Lifecycle "+r+"] "+this.name+" ["+this.type+"] (P: "+this.priority+" ): "+a+" "+o+" (Running: "+this.dashboard.runningCalls+")","log","color: "+this.getLogColor())
}})}})}),define("cdf/dashboard/Dashboard.i18n",["../Logger","./Dashboard","./Dashboard.ext","../lib/moment","../lib/CCC/cdo","../lib/cdf.jquery.i18n"],function(t,e,n,i,r,a){e.implement({_initI18n:function(){var e=this;
e.i18nCurrentLanguageCode=void 0,e.i18nSupport={prop:function(e){return t.warn("i18n support wasn't properly initiated. Is the file messages_supported_languages.properties present?"),e
}};var o=function(t){if(t){var e=t.split("-");return e.length>1?e.join("_"):t}},s=o(SESSION_LOCALE);
a.i18n.properties({name:"messages",path:n.getStaticResource("resources/languages/"),mode:"map",language:s,callback:function(){a.i18n.properties({name:"messages",mode:"map",type:"GET",language:s,callback:function(){e.setI18nSupport(s,a.i18n)
}})}});var u=r.format.language(s);r.format.language(u),i.locale(s)},setI18nSupport:function(t,e){this.i18nCurrentLanguageCode=t,a.extend(this.i18nSupport,e)
}})}),define("cdf/dashboard/Dashboard.legacy",["../queries/CdaQuery.ext","../components/XactionComponent.ext","./Dashboard.ext","./Dashboard","../Logger","../lib/jquery"],function(t,e,n,i,r,a){i.implement({callPentahoAction:function(t,e,n,i,r,a){var o=this;
return"function"==typeof a?o.pentahoAction(e,n,i,r,function(e){a(o.parseXActionResult(t,e))
}):o.parseXActionResult(t,o.pentahoAction(e,n,i,r,a))},urlAction:function(t,e,n){return this.executeAjax("xml",t,e,n)
},executeAjax:function(t,e,n,i){if("function"==typeof i)return a.ajax({url:e,type:"POST",traditional:!0,dataType:t,async:!0,data:n,complete:function(t){"undefined"==typeof t.responseXML?i(a.parseXML(t.responseText)):i(t.responseXML)
},error:function(t,e,n){r.error("Found error: "+t+" - "+e+", Error: "+n)}});var o=a.ajax({url:e,type:"POST",dataType:t,async:!1,data:n,error:function(t,e,n){r.error("Found error: "+t+" - "+e+", Error: "+n)
}});return"xml"==t?"undefined"==typeof o.responseXML?a.parseXML(o.responseText):o.responseXML:o.responseText
},pentahoAction:function(t,e,n,i,r){return this.pentahoServiceAction("ServiceAction","xml",t,e,n,i,r)
},pentahoServiceAction:function(t,e,i,r,o,s,u){var c=n.getServiceAction(t,i,r,o),l=c.url;
return delete c.url,a.each(s,function(t,e){c[e[0]]=e[1]}),this.executeAjax(e,l,c,u)
},CDF_ERROR_DIV:"cdfErrorDiv",createAndCleanErrorDiv:function(){0==a("#"+this.CDF_ERROR_DIV).length&&a("body").append("<div id='"+this.CDF_ERROR_DIV+"'></div>"),a("#"+this.CDF_ERROR_DIV).empty()
},showErrorTooltip:function(){a(function(){a.tooltip&&a(".cdf_error").tooltip({delay:0,track:!0,fade:250,showBody:" -- "})
})},parseXActionResult:function(t,e){var n=a(e),i=n.find("SOAP-ENV\\:Fault");if(0==i.length)return n;
var r="Error executing component "+t.name,o=new Array;o[0]=" Error details for component execution "+t.name+" -- ",o[1]=i.find("SOAP-ENV\\:faultstring").find("SOAP-ENV\\:Text:eq(0)").text(),i.find("SOAP-ENV\\:Detail").find("message").each(function(){o.push(a(this).text())
}),o.length>8&&(o=o.slice(0,7),o.push("..."));var s="<table class='errorMessageTable' border='0'><tr><td class='errorIcon'></td><td><span class='cdf_error' title=\""+o.join("<br/>").replace(/"/g,"'")+'" >'+r+" </span></td></tr></table/>";
return 0==t.visible?a("#"+this.CDF_ERROR_DIV).append("<br />"+s):a("#"+t.htmlObject).html(s),null
},setSettingsValue:function(t,e){var i={method:"set",key:t,value:JSON.stringify(e)};
a.post(n.getSettings("set",null),i,function(){})},getSettingsValue:function(t,e){a.ajax({type:"GET",dataType:"json",url:n.getSettings("get",t),data:args,async:!0,xhrFields:{withCredentials:!0}}).done("function"==typeof e?e:function(t){e=t
})},fetchData:function(n,i,o){if(r.warn("Dashboards.fetchData() is deprecated. Use Query objects instead"),void 0!=n&&void 0!=n.dataAccessId){for(var s in i)n["param"+i[s][0]]=this.getParameterValue(i[s][1]);
a.post(t.getDoQuery(),n,function(t){o(t)},"json").error(this.handleServerError)}else if(void 0!=n){var u="cda"==n.queryType?"jtable-cda.xaction":"jtable.xaction";
a.post(e.getCdfXaction("pentaho-cdf/actions",u),n,function(t){o(t.values)},"json")
}else o([])}})}),define("cdf/dashboard/Dashboard.lifecycle",["./Dashboard","../Logger","amd!../lib/underscore","../components/UnmanagedComponent","../lib/jquery"],function(t,e,n,i,r){t.implement({_initLifecycle:function(){this.initCounter=0,this.runningCalls=0,this.lastServerResponse=Date.now?Date.now():(new Date).valueOf(),this.serverCheckResponseTimeout=18e5
},resetRunningCalls:function(){this.runningCalls=0,setTimeout(n.bind(function(){this.hideProgressIndicator()
},this),10)},getRunningCalls:function(){return this.runningCalls},incrementRunningCalls:function(){this.runningCalls++,this.showProgressIndicator(),e.log("+Running calls incremented to: "+this.getRunningCalls())
},decrementRunningCalls:function(){this.runningCalls--,e.log("-Running calls decremented to: "+this.getRunningCalls()),setTimeout(n.bind(function(){this.runningCalls<=0&&(this.hideProgressIndicator(),this.runningCalls=0)
},this),10)},init:function(t){var i=this,a=i.initCounter++;e.log("InitInstance "+a),0==a&&(i.syncDebugLevel(),i.initialStorage?n.extend(i.storage,i.initialStorage):i.loadStorage(),null!=i.context&&null!=i.context.sessionTimeout&&(i.serverCheckResponseTimeout=900*i.context.sessionTimeout),i.restoreBookmarkables(),i.restoreView(),i.syncParametersInit()),n.isArray(t)&&i.addComponents(t),n.chain(i.components).where({initInstance:void 0}).each(function(t){t.initInstance=a
}),r(function(){i._initEngine(a)})},_initEngine:function(t){var a=this;a.waitingForInit&&a.waitingForInit.length&&e.log("Overlapping initEngine!","warn");
var o=null!=t?n.where(a.components,{initInstance:t}):a.components;a.waitingForInit&&0!==a.waitingForInit.length||a.finishedInit||a.incrementRunningCalls(),e.log("          [Lifecycle >Start] Init["+t+"] (Running: "+a.getRunningCalls()+")","log","color: #ddd"),a.createAndCleanErrorDiv(),"function"==typeof a.preInit&&a.preInit(),a.trigger("cdf cdf:preInit",a),r(window).trigger("cdfAboutToLoad");
var s,a=a,u=[];for(s=0;s<o.length;s++)o[s].executeAtStart&&u.push(o[s]);if(!u.length)return a._handlePostInit(),void 0;
var c=new i({name:"PostInitMarker",type:"unmanaged",lifecycle:{silent:!0},executeAtStart:!0,priority:999999999});
a.addComponent(c),u.push(c),a.waitingForInit=u.slice();for(var l=function(e,i){2==arguments.length&&i||(a.waitingForInit=n(a.waitingForInit).without(e),e.off("cdf:postExecution",l),e.off("cdf:preExecution",l),e.off("cdf:error",l),a._handlePostInit(t))
},s=0,d=u.length;d>s;s++){var h=u[s];h.on("cdf:postExecution cdf:preExecution cdf:error",l,a)
}a.updateAll(u),o.length>0&&a._handlePostInit(t)},_handlePostInit:function(t){var i=this,a=function(){var t=n.filter(i.components,function(t){return"duplicate"==t.type
}),e={},a=i.getBookmarkState().params||{};n.map(n.filter(Object.keys(a),function(t){return/(_[0-9]+)+$/.test(t)
}),function(t){var n=t.match(/(.*?)((_[0-9]+)+)$/),i=n[1],r=n[2];return e[r]||(e[r]={}),e[r][i]=a[t],t
});for(var o in e)if(e.hasOwnProperty(o)){var a=e[o];r.each(t,function(t,e){var n;
for(n=0;n<e.parameters.length;n++)if(!a.hasOwnProperty(e.parameters[n])&&i.isBookmarkable(e.parameters[n]))return;
e.duplicate(a)})}};i.waitingForInit&&0!==i.waitingForInit.length||i.finishedInit||(i.trigger("cdf cdf:postInit",i),r(window).trigger("cdfLoaded"),"function"==typeof i.postInit&&i.postInit(),a(),i.finishedInit=!0,i.decrementRunningCalls(),e.log("          [Lifecycle <End  ] Init["+t+"] (Running: "+i.getRunningCalls()+")","log","color: #ddd"))
},updateLifecycle:function(t){var i=t.lifecycle?!!t.lifecycle.silent:!1;if(!t.disabled){i||this.incrementRunningCalls();
var a=n.bind(function(){try{var n;if("undefined"!=typeof t.preExecution&&(n=t.preExecution.apply(t)),n="undefined"!=typeof n?!!n:!0,t.trigger("cdf cdf:preExecution",t,n),!n)return;
void 0!=t.tooltip&&(t._tooltip="function"==typeof t.tooltip?t.tooltip():t.tooltip),void 0!=t.update&&"function"==typeof t.update&&(t.update(),this.refreshEngine.processComponent(t)),"undefined"!=typeof t.postExecution&&t.postExecution.apply(t),void 0!=t._tooltip&&r("#"+t.htmlObject).attr("title",t._tooltip).tooltip({delay:0,track:!0,fade:250})
}catch(a){var o=t.htmlObject?r("#"+t.htmlObject):void 0,s=this.getErrorObj("COMPONENT_ERROR").msg+" ("+t.name.replace("render_","")+")";
this.errorNotification({msg:s},o),e.error("Error updating "+t.name+":"),e.exception(a)
}finally{i||this.decrementRunningCalls()}t.trigger("cdf cdf:postExecution",t)},this);
setTimeout(a,1)}},updateAll:function(t){var e=function(t,e){if(e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=n.isArray(t[i])?n.union(t[i],e[i]):e[i])
};if(this.updating||(this.updating={tiers:{},current:null}),t&&n.isArray(t)&&!n.isArray(t[0])){var i={};
n.each(t,function(t){if(t){var e=t.priority||0;i[e]||(i[e]=[]),i[e].push(t)}}),t=i
}e(this.updating.tiers,t);var r=this.updating.current,a=!1;if(null===r||0==r.components.length||(a=this.othersAwaitExecution(n.clone(this.updating.tiers),this.updating.current))){var o=this.getFirstTier(this.updating.tiers);
if(!o)return;if(a){var s=this.updating.tiers;s[r.priority]=n.difference(s[r.priority],r.components),o.components=n.union(s[r.priority],this.getFirstTier(s).components)
}this.updating.current=o;for(var u=function(t,e){if(2!=arguments.length||"boolean"!=typeof e||!e){t.off("cdf:postExecution",u),t.off("cdf:preExecution",u),t.off("cdf:error",u);
var i=this.updating.current;i.components=n.without(i.components,t);var r=this.updating.tiers;
r[i.priority]=n.without(r[i.priority],t),this.updateAll()}},i=this.updating.current.components.slice(),c=0;c<i.length;c++){var l=i[c];
l.startTimer(),l.on("cdf:postExecution cdf:preExecution cdf:error",u,this),this.updateComponent(l)
}}},update:function(t){this.updateQueue||(this.updateQueue=[]),this.updateQueue.push(t),this.updateTimeout&&clearTimeout(this.updateTimeout);
var e=n.bind(function(){this.updateAll(this.updateQueue),delete this.updateQueue},this);
this.updateTimeout=setTimeout(e,5)},updateComponent:function(t){if(Date.now()-this.lastServerResponse>this.serverCheckResponseTimeout&&!this.checkServer())throw this.hideProgressIndicator(),this.loginAlert(),"not logged in";
t.isManaged===!1&&t.update?(t.update(),this.refreshEngine.processComponent(t)):this.updateLifecycle(t)
},getFirstTier:function(t){for(var e,i=n.keys(t).sort(function(t,e){return parseInt(t,10)-parseInt(e,10)
}),r=0;r<i.length;r++)if(e=t[i[r]],e.length>0)return{priority:i[r],components:e.slice()};
return null},resetAll:function(){this.createAndCleanErrorDiv();for(var t=(this.components.length,0),e=this.components.length;e>t;t++)this.components[t].clear();
for(var t=(this.components.length,0),e=this.components.length;e>t;t++)this.components[t].executeAtStart&&this.update(this.components[t])
},processChange:function(t){var e,n=this.getComponentByName(t),i=n.parameter;if("function"==typeof n.getValue&&(e=n.getValue()),null!=e){if("undefined"!=typeof n.preChange){var r=n.preChange(e);
e=void 0!=r?r:e}i&&this.fireChange(i,e),"undefined"!=typeof n.postChange&&n.postChange(e)
}},fireChange:function(t,e){var i=this;i.createAndCleanErrorDiv(),i.setParameter(t,e,!0),i.trigger("cdf "+t+":fireChange",{parameter:t,value:e});
for(var r=[],a=0,o=i.components.length;o>a;a++)if(n.isArray(i.components[a].listeners))for(var s=0;s<i.components[a].listeners.length;s++){var u=i.components[a];
if(u.listeners[s]==t&&!u.disabled){r.push(u);break}}i.updateAll(r)},othersAwaitExecution:function(t,e){if(!t||!e||!e.components)return!1;
t[e.priority]=n.difference(t[e.priority],e.components);var i=this.getFirstTier(t);
return i&&i.components&&0!=i.components.length?parseInt(i.priority)>parseInt(e.priority)?!1:!0:!1
}})}),define("cdf/dashboard/Popups",["../lib/mustache","amd!../lib/underscore","../lib/jquery","amd!../lib/jquery.blockUI"],function(t,e,n){var i={};
return i.okPopup={template:"<div class='cdfPopup'>  <div class='cdfPopupHeader'>{{{header}}}</div>  <div class='cdfPopupBody'>    <div class='cdfPopupDesc'>{{{desc}}}</div>    <div class='cdfPopupButton'>{{{button}}}</div>  </div></div>",defaults:{header:"Title",desc:"Description Text",button:"Button Text",callback:function(){return!0
}},$el:void 0,show:function(t){(t||this.firstRender)&&this.render(t),this.$el.show()
},hide:function(){this.$el.hide()},render:function(i){var r=e.extend({},this.defaults,i),a=this;
this.firstRender&&(this.$el=n("<div/>").addClass("cdfPopupContainer").hide().appendTo("body"),this.firstRender=!1),this.$el.empty().html(t.render(this.template,r)),this.$el.find(".cdfPopupButton").click(function(){r.callback(),a.hide()
})},firstRender:!0},i.notificationsComponent={template:"<div class='cdfNotification component {{#isSmallComponent}}small{{/isSmallComponent}}'>  <div class='cdfNotificationBody'>    <div class='cdfNotificationImg'>&nbsp;</div>    <div class='cdfNotificationTitle' title='{{title}}'>{{{title}}}</div>    <div class='cdfNotificationDesc' title='{{desc}}'>{{{desc}}}</div>  </div></div>",defaults:{title:"Component Error",desc:"Error processing component."},render:function(i,r){var a=e.extend({},this.defaults,r);
a.isSmallComponent=n(i).width()<300,n(i).empty().html(t.render(this.template,a));
var o=n(i).find(".cdfNotification");o.css({"line-height":o.height()+"px"})}},i.notificationsGrowl={template:"<div class='cdfNotification growl'>  <div class='cdfNotificationBody'>    <h1 class='cdfNotificationTitle' title='{{title}}'>{{{title}}}</h1>    <h2 class='cdfNotificationDesc' title='{{desc}}'>{{{desc}}}</h2>  </div></div>",defaults:{title:"Title",desc:"Default CDF notification.",timeout:4e3,onUnblock:function(){return!0
},css:n.extend({},n.blockUI.defaults.growlCSS,{position:"absolute",width:"100%",top:"10px"}),showOverlay:!1,fadeIn:700,fadeOut:1e3,centerY:!1},render:function(i){var r=e.extend({},this.defaults,i),a=n(t.render(this.template,r)),o=this;
r.message=a;var s=r.onUnblock;r.onUnblock=function(){o.$el.hide(),s.call(this)},this.firstRender&&(this.$el=n("<div/>").addClass("cdfNotificationContainer").hide().appendTo("body"),this.firstRender=!1),this.$el.show().block(r)
},firstRender:!0},i}),define("cdf/dashboard/Dashboard.notifications",["./Dashboard","./Dashboard.notifications.ext","./Popups","../Logger","amd!../lib/underscore","../lib/jquery","amd!../lib/jquery.blockUI"],function(t,e,n,i,r,a){t.implement({_initNotifications:function(){this.ERROR_CODES={QUERY_TIMEOUT:{msg:"Query timeout reached"},COMPONENT_ERROR:{msg:"Error processing component"}}
},blockUIwithDrag:function(){"undefined"!=typeof this.i18nSupport&&null!=this.i18nSupport&&(a.blockUI.defaults.message='<div class="img blockUIDefaultImg" style="padding: 0px;"></div>'),a.blockUI();
var t=a('<div id="blockUIDragHandle"></div>');a("div.blockUI.blockMsg").prepend(t),a("div.blockUI.blockMsg").draggable({handle:"#blockUIDragHandle"})
},showProgressIndicator:function(){a.blockUI&&this.blockUIwithDrag()},hideProgressIndicator:function(t){t&&this.resetRunningCalls(),a.unblockUI&&a.unblockUI(),this.showErrorTooltip()
},getErrorObj:function(t){return this.ERROR_CODES[t]||{}},parseServerError:function(t,e,n){var i=[{match:/Query timeout/,msg:this.getErrorObj("QUERY_TIMEOUT").msg}],o={msg:this.getErrorObj("COMPONENT_ERROR").msg,error:n,errorStatus:e},s=a("<div/>").html(t.responseText).find("h1").text();
return r.find(i,function(t){return s.match(t.match)?(o.msg=t.msg,!0):!1}),o},handleServerError:function(){this.errorNotification(this.parseServerError.apply(this,arguments)),this.trigger("cdf cdf:serverError",this),this.resetRunningCalls()
},errorNotification:function(t,e){e?n.notificationsComponent.render(a(e),{title:t.msg,desc:""}):n.notificationsGrowl.render({title:t.msg,desc:""})
},loginAlert:function(t){var e={header:"Warning",desc:"You are no longer logged in or the connection to the server timed out",button:"Click to reload this page",callback:function(){window.location.reload(!0)
}};e=r.extend({},e,t),n.okPopup.show(e),this.trigger("cdf cdf:loginError",this)},checkServer:function(){a.ajax({type:"POST",async:!1,dataType:"json",url:e.getPing(),success:function(t){return t&&"ok"==t.ping
},error:function(){return!1}})}})}),define("cdf/dashboard/Dashboard.parameters",["./Dashboard","../Logger","amd!../lib/backbone","./Utf8Encoder"],function(t,e,n,i){t.implement({LEGACY_STORAGE:"Dashboards.storage.",STORAGE:"storage.",_initParameters:function(){this.parameters=[],this.parameterModel=new n.Model,this.chains=[],this.syncedParameters={},this.escapeParameterValues=!1
},_isParameterInModel:function(t,e){return void 0!==this._getValueFromContext(t,e)
},_getValueFromContext:function(t,e){if(t){if(null!=e){var n,i;if(e instanceof Array)n=e;
else{if(e.indexOf(".")<0)return t[e];n=e.split(".")}i=n.length;for(var r=0;i>r;r++){if(!t)return;
var a=n[r],o=t[a];if(void 0===o)return;t=o}}return t}},_setValueInContext:function(t,e,n){if(t&&null!=e&&void 0!==n){var i,r;
if(e instanceof Array)i=e,r=i.pop();else{if(e.indexOf(".")<0)return t[e]=n,t;i=e.split("."),r=i.pop()
}return t=this._getValueFromContext(t,i),t&&(t[r]=n),t}},_getParameterStore:function(t){var n;
return 0==t.indexOf(this.LEGACY_STORAGE)?(e.warn("Legacy storage access for "+t+". Please use storage instead"),t=t.substr(this.LEGACY_STORAGE.length),n=this.storage):0==t.indexOf(this.STORAGE)?(t=t.substr(this.STORAGE.length),n=this.storage):n=this.parameters,{store:n,name:t}
},addParameter:function(t,n){if(void 0==t||"undefined"==t)return e.warn("Dashboard addParameter: trying to add undefined!!"),void 0;
var i=this._getParameterStore(t);return this._isParameterInModel(i.store,i.name)&&(n=this.getParameterValue(i.name)),this.setParameter(t,n),n
},getParameterValue:function(t){if(void 0==t||"undefined"==t)return e.warn("Dashboard.getParameterValue: trying to get undefined!!"),void 0;
var n=this._getParameterStore(t);return this._getValueFromContext(n.store,n.name)
},getParam:function(t){return this.getParameterValue(t)},setParameter:function(t,n,r){if(void 0==t||"undefined"==t)return e.warn("Dashboard.setParameter: trying to set undefined!!"),void 0;
var a=this._getParameterStore(t);this.escapeParameterValues?this._setValueInContext(a.store,a.name,i.encode_prepare_arr(n)):this._setValueInContext(a.store,a.name,n),void 0!==this._setValueInContext(a.store,a.name,n)&&(this.parameterModel.set(a.name,n,{notify:r}),this.persistBookmarkables(a.name))
},setParam:function(t,e,n){this.setParameter(t,e,n)},syncParameters:function(t,e){this.setParameter(e,this.getParameterValue(t)),this.parameterModel.on("change:"+t,function(t,n,i){this[i.notify?"fireChange":"setParameter"](e,n)
},this),this.parameterModel.on("change:"+e,function(e,n,i){this[i.notify?"fireChange":"setParameter"](t,n)
},this)},syncParametersOnInit:function(t,e){var n,i,r,a,o=this.syncedParameters;o[t]||(o[t]=[]),o[t].push(e);
for(var s=0;s<this.chains.length;s++)n=this.chains[s],n.indexOf(t)>-1&&(i=n),n.indexOf(e)>-1&&(r=n,a=s);
if(r&&i){if(i!=r){var u=r.slice();u.unshift(0),u.unshift(i.length),[].splice.apply(i,u),this.chains.splice(a,1)
}}else r?r.unshift(t):i?i.push(e):this.chains.push([t,e])},syncParametersInit:function(){var t,e,n,i,r,a=this.syncedParameters;
for(n=0;n<this.chains.length;n++)for(i=0;i<this.chains[n].length;i++)if(t=this.chains[n][i],a[t])for(r=0;r<a[t].length;r++)e=a[t][r],this.syncParameters(t,e)
}})}),define("cdf/dashboard/Dashboard.storage",["./Dashboard","../Logger","../lib/jquery","./Dashboard.storage.ext"],function(t,e,n,i){t.implement({_initStorage:function(){this.storage||(this.storage={},n.extend(this.storage,this.storageObj)),this.initialStorage=this.storage
},loadStorage:function(){var t=this;if(!this.context||"anonymousUser"!==this.context.user){var e={user:this.context.user,action:"read",ts:(new Date).getTime()};
n.ajax({type:"GET",dataType:"json",url:i.getStorage(e.action),data:e,async:!0,xhrFields:{withCredentials:!0},success:function(e){n.extend(t.storage,e)
}})}},saveStorage:function(){if(!this.context||"anonymousUser"!==this.context.user){var t={user:this.context.user,action:"store",storageValue:JSON.stringify(this.storage),ts:(new Date).getTime()};
n.ajax({type:"GET",dataType:"json",url:i.getStorage(t.action),data:t,async:!0,xhrFields:{withCredentials:!0}}).done(function(t){1!=t.result&&e.log("Error saving storage","error")
})}},cleanStorage:function(){if(this.storage={},!this.context||"anonymousUser"!==this.context.user){var t={user:this.context.user,action:"delete"};
n.ajax({type:"GET",dataType:"json",url:i.getStorage(t.action),data:t,async:!0,xhrFields:{withCredentials:!0}}).done(function(t){1!=t.result&&e.log("Error deleting storage","error")
})}}})}),define("cdf/dashboard/Dashboard.query",["../lib/Base","./Dashboard","./Container","amd!../lib/underscore","./Utils"],function(t,e,n,i,r){var a=t,o=new n;
return e.implement({_initQuery:function(){this.queryFactories=r.clone(o)},getBaseQuery:function(){return a
},registerQuery:function(t,e){var n=this.getBaseQuery();if(!i.isFunction(e)&&i.isObject(e)){var r={};
i.each(n.prototype.deepProperties,function(t){r[t]=i.extend({},n.prototype[t],e[t])
})}var a=i.isFunction(e)&&e||i.isObject(e)&&n.extend(i.extend({},e,r));this.queryFactories.register("Query",t,function(t,e){return new a(e)
})},hasQuery:function(t){return Boolean(this.queryFactories&&this.queryFactories.has("Query",t))
},detectQueryType:function(t){if(t){var e=t.queryType?t.queryType:t.query?"legacy":t.path&&t.dataAccessId?"cda":void 0;
return t.queryType=e,this.hasQuery(e)?e:void 0}},getQuery:function(t,e){i.isUndefined(t)?t="cda":i.isObject(t)&&(e=t,t=e.queryType||"cda");
var n=this.queryFactories.getNew("Query",t,e);return n.dashboard=this,n},listQueries:function(){return i.keys(this.queryFactories.listType("Query"))
}}),{setBaseQuery:function(t){i.isFunction(t)&&t.extend&&(a=t)},registerGlobalQuery:function(t,e){var n=a;
if(!i.isFunction(e)&&i.isObject(e)){var r={};i.each(n.prototype.deepProperties,function(t){r[t]=i.extend({},n.prototype[t],e[t])
})}var s=i.isFunction(e)&&e||i.isObject(e)&&n.extend(i.extend({},e,r));o.register("Query",t,function(t,e){return new s(e)
})}}}),define("cdf/dashboard/Dashboard.views",["./Dashboard","../lib/base64","./Dashboard.views.ext","../lib/jquery"],function(t,e,n,i){t.implement({viewFlags:{UNUSED:"unused",UNBOUND:"unbound",VIEW:"view"},_initViews:function(){this.viewParameters={},!this.view&&this.viewObj&&(this.view={},i.extend(this.view,this.viewObj))
},restoreView:function(){var t,n;if(this.view&&this.view.params&&(n=JSON.parse(e.decode(this.view.params))))if(i.isEmptyObject(n))this.view.params=n;
else for(t in n)n.hasOwnProperty(t)&&this.setParameter(t,n[t])},setParameterViewMode:function(t,e){1===arguments.length&&(e=this.viewFlags.VIEW),this.viewParameters[t]=e
},isViewParameter:function(t){return this.viewParameters[t]},getViewParameters:function(){var t=this.viewParameters,e={};
for(var n in t)t.hasOwnProperty(n)&&(t[n]==this.viewFlags.VIEW||t[n]==this.viewFlags.UNBOUND)&&(e[n]=this.getParameterValue(n));
return e},getUnboundParameters:function(){var t=this.viewParameters,e=[];for(var n in t)if(t.hasOwnProperty(n))return t[n]==this.viewFlags.UNBOUND&&e.push(n),e
}})}),define("cdf/dashboard/OptionsManager",["./Utils","amd!../lib/underscore","../lib/jquery"],function(t,e,n){function i(t,e,n,i){var r=i||void 0;
return t&&t[e]&&t[e].hasOwnProperty(n)&&(r=t[e][n]),r}function r(t,e,n,i){t&&e&&n&&(t[e]=t[e]||{},t[e][n]=i)
}return function(a){function o(t,e){e=e||{},d(t,e.reader),h(t,e.writer),f(t,e.validator)
}function s(t){return i(g._interfaces,t,"reader",g._libraries.mappers.identity)}function u(t){return i(g._interfaces,t,"writer",g._libraries.mappers.identity)
}function c(t){return i(g._interfaces,t,"validator",g._libraries.predicates.tautology)
}function l(t){return i(g._options,t,"value")}function d(t,n){var i=g._libraries.mappers;
return n=e.isFunction(n)&&n||e.isString(n)&&i[n]||s(t)||i.identity,r(g._interfaces,t,"reader",n)
}function h(t,n){var i=g._libraries.mappers;return n=e.isFunction(n)&&n||e.isString(n)&&i[n]||u(t)||i.identity,r(g._interfaces,t,"writer",n)
}function f(t,n){var i=g._libraries.predicates;return n=e.isFunction(n)&&n||e.isString(n)&&i[n]||c(t)||i.tautology,r(g._interfaces,t,"validator",n)
}function p(t,e){return r(g._options,t,"value",e)}var g=this;this._options={},this._interfaces={},this._libraries={predicates:{tautology:function(){return!0
},isFunction:e.isFunction,isPositive:function(t){return e.isNumber(t)&&t>0},isObjectOrPropertiesArray:function(t){return e.isArray(t)||e.isObject(t)
},isObject:e.isObject,isArray:e.isArray},mappers:{identity:e.identity,propertiesObject:function(n){return e.isArray(n)?t.propertiesArrayToObject(n):n
}}},this.mixin=function(t){t.getOption=this.getOption,t.setOption=this.setOption},this.init=function(t,i,r){t=n.extend(!0,{},t),i=n.extend(!0,{},i),this._libraries=n.extend(!0,{},this._libraries,r),e.each(i,function(t,e){o(e,t)
}),e.each(t,function(t,e){var n=i&&i[e]||{};o(e,n),p(e,t)})},this.setOption=function(t,e,n){o(t,n);
var i=s(t),r=c(t);if(r(e))return e=i(e),p(t,e),!0;throw new Error("Invalid Option "+t.charAt(0).toUpperCase()+t.slice(1))
},this.getOption=function(t){var e=u(t),n=l(t);return e(n)},this.init(a.defaults,a.interfaces,a.libraries)
}}),define("cdf/queries/BaseQuery",["../lib/jquery","../lib/Base","amd!../lib/underscore","../Logger","../dashboard/OptionsManager","../dashboard/Dashboard.query"],function(t,e,n,i,r,a){var o=e.extend({name:"baseQuery",label:"Base Query",deepProperties:["defaults","interfaces"],dashboard:void 0,defaults:{successCallback:function(){i.log("Query callback not defined. Override.")
},errorCallback:function(){void 0!=dashboard&&void 0!=dashboard.handleServerError&&dashboard.handleServerError()
},lastResultSet:null,page:0,pageSize:0,params:{},ajaxOptions:{async:!1,type:"POST"},url:""},interfaces:{params:{reader:"propertiesObject",validator:"isObjectOrPropertiesArray"},successCallback:{validator:"isFunction"},errorCallback:{validator:"isFunction"},pageSize:{validator:"isPositive"}},constructor:function(t){this._optionsManager=new r(this),this._optionsManager.mixin(this),this.init(t)
},getOption:function(t){return this.defaults[t]},setOption:function(t,e){this.defaults[t]=e
},init:function(){},getSuccessHandler:function(e){var n=this;return function(i){n.setOption("lastResultSet",i);
var r=t.extend(!0,{},n.getOption("lastResultSet"));e(r)}},getErrorHandler:function(t){return function(e,n,i){t&&t(e,n,i)
}},doQuery:function(e,r){if("function"!=typeof this.getOption("successCallback"))throw"QueryNotInitialized";
var a=this.getOption("url"),o=e?e:this.getOption("successCallback"),s=this.buildQueryDefinition(),u=n.extend({},this.getOption("ajaxOptions"),{data:s,url:a,success:this.getSuccessHandler(o),error:this.getErrorHandler(r)}),c=null==u.async?t.ajaxSettings.async:u.async;
!c&&u.xhrFields&&u.xhrFields.withCredentials&&(i.log("Cross-domain requests are deprecated for synchronous operations."),delete u.xhrFields.withCredentials),t.ajax(u)
},exportData:function(){},setAjaxOptions:function(t){this.setOption("ajaxOptions",n.extend({},this.getOption("ajaxOptions"),t))
},setSortBy:function(){},sortBy:function(){},fetchData:function(t,e,i){switch(arguments.length){case 0:if(this.getOption("params")&&this.getOption("successCallback"))return this.doQuery();
break;case 1:if("function"==typeof arguments[0])return this.doQuery(arguments[0]);
if(!n.isEmpty(arguments[0])&&(n.isObject(arguments[0])||n.isArray(arguments[0])))return this.setOption("params",arguments[0]||{}),this.doQuery();
break;case 2:return"function"==typeof arguments[0]?(this.setOption("successCallback",arguments[0]),this.setOption("errorCallback",arguments[1]),this.doQuery()):(this.setOption("params",arguments[0]||{}),this.setOption("successCallback",arguments[1]),this.doQuery());
default:return t&&this.setOption("params",t),this.setOption("successCallback",e),this.setOption("errorCallback",i),this.doQuery()
}throw"InvalidInput"},lastResults:function(){if(null!==this.getOption("lastResultSet"))return t.extend(!0,{},this.getOption("lastResultSet"));
throw"NoCachedResults"},reprocessLastResults:function(e){if(null!==this.getOption("lastResultSet")){var n=t.extend(!0,{},this.getOption("lastResultSet")),i=e||this.getOption("successCallback");
return i(n)}throw"NoCachedResults"},reprocessResults:function(t){return this.reprocessLastResults(t)
},setParameters:function(t){this.setOption("params",t)},setCallback:function(t){this.setOption("successCallback",t)
},setErrorCallback:function(t){this.setOption("errorCallback",t)},setSearchPattern:function(t){this.setOption("searchPattern",t)
},nextPage:function(t){var e=this.getOption("page"),n=this.getOption("pageSize");
if(n>0)return e+=n,this.setOption("page",e),this.doQuery(t);throw"InvalidPageSize"
},previousPage:function(t){var e=this.getOption("page"),n=this.getOption("pageSize");
if(e>n)return e-=n,this.setOption("page",e),this.doQuery(t);if(_pageSize>0)return this.setOption("page",0),this.doQuery(t);
throw"AtBeginning"},getPage:function(t,e){var n=this.getOption("page"),i=this.getOption("pageSize");
if(t*i==n)return!1;if("number"==typeof t&&t>=0)return this.setOption("page",t*i),this.doQuery(e);
throw"InvalidPage"},setPageStartingAt:function(t){if(t==this.getOption("page"))return!1;
if(!("number"==typeof t&&t>=0))throw"InvalidPage";this.setOption("page",t)},pageStartingAt:function(t,e){return this.setPageStartingAt(t)!==!1?this.doQuery(e):!1
},setPageSize:function(t){this.setOption("pageSize",t)},initPage:function(t,e){if(t==this.getOption("pageSize")&&0==this.getOption("page"))return!1;
if("number"==typeof t&&t>0)return this.setOption("page",0),this.setOption("pageSize",t),this.doQuery(e);
throw"InvalidPageSize"}});return a.setBaseQuery(o),o}),define("cdf/queries/CpkQuery",["../dashboard/Dashboard.ext","./BaseQuery","../dashboard/Dashboard.query","amd!../lib/underscore","../dashboard/Utils","../Logger","../lib/jquery"],function(t,e,n,i,r,a,o){var s={name:"cpk",label:"CPK Query",defaults:{url:"",pluginId:"",endpoint:"",systemParams:{},ajaxOptions:{dataType:"json",type:"POST",async:!0,xhrFields:{withCredentials:!0}}},init:function(e){i.isString(e.pluginId)&&i.isString(e.endpoint)&&(this.setOption("pluginId",e.pluginId),this.setOption("endpoint",e.endpoint),this.setOption("url",t.getPluginEndpoint(e.pluginId,e.endpoint))),this.setOption("kettleOutput",e.kettleOutput),this.setOption("stepName",e.stepName),this.setOption("systemParams",e.systemParams||{}),this.setOption("ajaxOptions",o.extend({},this.getOption("ajaxOptions"),e.ajaxOptions));
var n=this.getOption("ajaxOptions");"json"==n.dataType&&(n.mimeType="application/json; charset utf-8",this.setOption("ajaxOptions",n))
},buildQueryDefinition:function(t){var e=this;t=t instanceof Array?r.propertiesArrayToObject(t):t||{};
var n={kettleOutput:this.getOption("kettleOutput"),stepName:this.getOption("stepName")};
n=o.extend(!0,{},n,this.getOption("systemParams"));var s=this.getOption("params"),u=o.extend({},s,t);
return i.each(u,function(t,r){var o,s;try{o=e.dashboard.getParameterValue(t)}catch(u){s=!i.isObject(t)||i.isFunction(t)?t:JSON.stringify(t),a.log("BuildQueryDefinition detected static parameter "+r+"="+s+". The parameter will be used as value instead its value obtained from getParameterValue"),o=t
}void 0===o&&(o=t),i.isFunction(o)?o=o():i.isObject(o)&&(o=JSON.stringify(o)),n["param"+r]=o
}),n},getSuccessHandler:function(t){var e=this;return function(n){e.setOption("lastResultSet",n);
var i=o.extend(!0,{},e.getOption("lastResultSet"));if(n&&0==n.result){var r=e.getErrorHandler(e.getOption("errorCallback"));
r(i)}else t(i)}}};n.registerGlobalQuery("cpk",s)}),define("cdf/queries/CdaQuery",["./CdaQuery.ext","./BaseQuery","../dashboard/Dashboard.query","amd!../lib/underscore","../dashboard/Utils","../Logger","../lib/jquery"],function(t,e,n,i,r,a,o){var s={name:"cda",label:"CDA Query",defaults:{url:t.getDoQuery(),file:"",id:"",outputIdx:"1",sortBy:"",ajaxOptions:{async:!0,xhrFields:{withCredentials:!0}},searchPattern:""},init:function(t){if("undefined"==typeof t.path||"undefined"==typeof t.dataAccessId)throw"InvalidQuery";
this.setOption("file",t.path),this.setOption("id",t.dataAccessId),"string"==typeof t.sortBy&&t.sortBy.match("^(?:[0-9]+[adAD]?,?)*$")&&this.setOption("sortBy",t.sortBy),null!=t.pageSize&&this.setOption("pageSize",t.pageSize),null!=t.outputIndexId&&this.setOption("outputIdx",t.outputIndexId)
},buildQueryDefinition:function(t){var e=this;t=t instanceof Array?r.propertiesArrayToObject(t):t||{};
var n={},s=this.getOption("params"),u=o.extend({},s,t);return i.each(u,function(t,s){var u;
try{u=e.dashboard.getParameterValue(t)}catch(c){var l="";l=!i.isObject(t)||i.isFunction(t)?t:JSON.stringify(t),a.log("BuildQueryDefinition detected static parameter "+s+"="+l+". The parameter will be used instead the parameter value"),u=t
}void 0===u&&(u=t),o.isArray(u)&&1==u.length&&(""+u[0]).indexOf(";")>=0&&(u=r.doCsvQuoting(u[0],";")),"function"==typeof u&&(u=u()),n["param"+s]=u
}),n.path=this.getOption("file"),n.dataAccessId=this.getOption("id"),n.outputIndexId=this.getOption("outputIdx"),n.pageSize=this.getOption("pageSize"),n.pageStart=this.getOption("page"),n.sortBy=this.getOption("sortBy"),n.paramsearchBox=this.getOption("searchPattern"),n
},exportData:function(e,n,i){i||(i={});var r=this.buildQueryDefinition(n);r.outputType=e,"csv"==e&&i.separator&&(r.settingcsvSeparator=i.separator),i.filename&&(r.settingattachmentName=i.filename),"xls"==e&&i.template&&(r.settingtemplateName=i.template),i.columnHeaders&&(r.settingcolumnHeaders=i.columnHeaders),null!=i.dtFilter&&(r.settingdtFilter=i.dtFilter,null!=i.dtSearchableColumns&&(r.settingdtSearchableColumns=i.dtSearchableColumns)),r.wrapItUp="true",o.ajax({type:"POST",dataType:"text",async:!0,data:r,url:this.getOption("url"),xhrFields:{withCredentials:!0}}).done(function(e){var n=o('<iframe style="display:none">');
n.detach(),n[0].src=t.getUnwrapQuery({path:r.path,uuid:e}),n.appendTo(o("body"))}).fail(function(t,e,n){a.log("Request failed: "+t.responseText+" :: "+e+" ::: "+n)
})},setSortBy:function(t){var e,n=this;if(null===t||void 0===t||""===t)e="";else if("string"==typeof t){if(!t.match("^(?:[0-9]+[adAD]?,?)*$"))throw"InvalidSortExpression";
e=t.toUpperCase().split(",").filter(function(t){return""!==t})}else if(t instanceof Array){e=t.map(function(t){return t.toUpperCase()
});var i=e.filter(function(t){return!t.match("^[0-9]+[adAD]?,?$")});if(i.length>0)throw"InvalidSortExpression"
}var r;return e instanceof Array?(r=e.length!=n.getOption("sortBy").length,o.each(e,function(t,e){return r=r&&e==n.getOption("sortBy")[t],r?void 0:!1
})):r=e===this.getOption("sortBy"),this.setOption("sortBy",e),!r},sortBy:function(t,e){var n=this.setSortBy(t);
return n?null!==this.getOption("successCallback")?this.doQuery(e):void 0:!1}};n.registerGlobalQuery("cda",s)
}),define("cdf/queries/XmlaQuery",["amd!../lib/xmla","./XmlaQuery.ext","../lib/Base","./BaseQuery","../dashboard/Dashboard.query","../Logger","../lib/jquery"],function(t,e,n,i,r,a,o){var s=n.extend({xmla:null,datasource:null,catalogs:null,getDataSources:function(){var e=[],n=this.xmla.discoverDataSources();
if(!n)return a.warn("XML/A DISCOVER_DATASOURCES request failed"),void 0;if(n.hasMoreRows()){e=n.fetchAllAsObject(),this.datasource=e[0];
var i=this.datasource[t.PROP_DATASOURCENAME];i&&i.length>0&&(this.datasource[t.PROP_DATASOURCEINFO]=i),n.close()
}},getCatalogs:function(){var e={},n={};if(!this.datasource||!this.datasource[t.PROP_DATASOURCEINFO])return a.warn("XML/A DBSCHEMA_CATALOGS request failed, missing "+t.PROP_DATASOURCEINFO),void 0;
e[t.PROP_DATASOURCEINFO]=this.datasource[t.PROP_DATASOURCEINFO];var i=this.xmla.discoverDBCatalogs({properties:e});
if(!i)return a.warn("XML/A DISCOVER_DATASOURCES request failed"),void 0;if(i.hasMoreRows()){for(this.catalogs=[];n=i.fetchAsObject();)this.catalogs[this.catalogs.length]=n;
i.close()}},discover:function(e){var n={},i=e.query();n[t.PROP_DATASOURCEINFO]=this.datasource[t.PROP_DATASOURCEINFO],e.catalog&&(n[t.PROP_CATALOG]=e.catalog);
var r=this.xmla.discover({properties:n,requestType:i});return r},execute:function(e){for(var n=0,i=u.catalogs.length;i>n;n++)if(u.catalogs[n].CATALOG_NAME==e.catalog){var r={};
r[t.PROP_DATASOURCEINFO]=u.datasource[t.PROP_DATASOURCEINFO],r[t.PROP_CATALOG]=e.catalog,r[t.PROP_FORMAT]=u.PROP_FORMAT||t.PROP_FORMAT_TABULAR;
var a=this.xmla.execute({statement:e.query(),properties:r});return a}throw new Error("Catalog: "+e.catalog+" was not found on Pentaho server.")
}}),u=new s,c={name:"xmla",label:"XML/A Query",queryDefinition:{},defaults:{url:e.getXmla()},init:function(e){this.queryDefinition=o.extend({},this.getOption("params"),e),null==u.xmla&&(u.xmla=new t({async:!1,url:this.getOption("url")})),null==u.datasource&&u.getDataSources(),null==u.catalogs&&u.getCatalogs()
},transformXMLAresults:function(e){var n,i,r,a={resultset:[],metadata:[]};e instanceof t.Rowset?(n=e.fetchAllAsArray(),i=e.getFields()):e instanceof t.Dataset;
for(var o=0,s=i.length;s>o;o++)switch(r=i[o],a.metadata[o]={colIndex:r.index,colName:r.label},r.jsType){case"string":a.metadata[o].colType="string";
break;case"number":a.metadata[o].colType="numeric";break;default:a.metadata[o].colType="string"
}return a.resultset=n,e.close(),a},doQuery:function(t){{var e=(this.getOption("url"),t?t:this.getOption("successCallback"));
this.getOption("errorCallback")}try{var n=u.execute(this.queryDefinition)}catch(i){a.error("unable to execute the XML/A query: "+i+" :")
}e(this.transformXMLAresults(n))}};r.registerGlobalQuery("xmla",c);var l={name:"xmlaDiscover",label:"XML/A Discover Query",queryDefinition:{},defaults:{url:e.getXmla()},init:function(e){this.queryDefinition=o.extend({},this.getOption("params"),e),null==u.xmla&&(u.xmla=new t({async:!1,url:this.getOption("url")})),null==u.datasource&&u.getDataSources()
},transformDiscoverresults:function(t){for(var e,n=t.getFields(),i={resultset:[],metadata:[]},r=0,a=n.length;a>r;r++)switch(e=n[r],i.metadata[r]={colIndex:e.index,colName:e.label},e.jsType){case"string":i.metadata[r].colType="string";
break;case"number":i.metadata[r].colType="numeric";break;default:i.metadata[r].colType="string"
}return i.resultset=t.fetchAllAsArray(),t.close(),i},doQuery:function(t){{var e=(this.getOption("url"),t?t:this.getOption("successCallback"));
this.getOption("errorCallback")}try{var n=u.discover(this.queryDefinition)}catch(i){a.error("unable to execute the XML/A Discover query: "+i+" :")
}e(this.transformDiscoverresults(n))}};r.registerGlobalQuery("xmlaDiscover",l)}),define("cdf/queries/LegacyQuery",["../Logger","../components/XactionComponent.ext","./BaseQuery","../dashboard/Dashboard.query","amd!../lib/underscore","../lib/jquery","../dashboard/Utils"],function(Logger,XactionComponentExt,BaseQuery,Dashboard,_,$,Utils){function makeMetadataElement(t,e,n){return{colIndex:t||0,colType:n||"String",colName:e||"Name"}
}var legacyOpts={name:"legacy",label:"Legacy Query",defaults:{url:XactionComponentExt.getCdfXaction("pentaho-cdf/actions","jtable.xaction"),queryDef:{}},interfaces:{lastResultSet:{reader:function(json){json=eval("("+json+")");
var result={metadata:[makeMetadataElement(0)],resultset:json.values||[]};return _.each(json.metadata,function(t,e){return result.metadata.push(makeMetadataElement(e+1,t))
}),result}}},init:function(t){this.setOption("queryDef",t)},getSuccessHandler:function(t){var e=this;
return function(n){try{e.setOption("lastResultSet",n)}catch(i){if(!this.async)throw i;
var r=e.dashboard.getErrorObj("COMPONENT_ERROR").msg+":"+i.message;Logger.error(r),n={metadata:[r],values:[]}
}var a=$.extend(!0,{},e.getOption("lastResultSet"));t(a)}},buildQueryDefinition:function(t){return _.extend({},this.getOption("queryDef"),t)
}};Dashboard.registerGlobalQuery("legacy",legacyOpts),Dashboard.registerGlobalQuery("mdx",legacyOpts),Dashboard.registerGlobalQuery("sql",legacyOpts)
}),define("cdf/Dashboard",["./dashboard/Dashboard","./dashboard/Dashboard.context","./dashboard/Dashboard.addIns","./dashboard/Dashboard.bookmarkable","./dashboard/Dashboard.components","./dashboard/Dashboard.i18n","./dashboard/Dashboard.legacy","./dashboard/Dashboard.lifecycle","./dashboard/Dashboard.notifications","./dashboard/Dashboard.parameters","./dashboard/Dashboard.storage","./dashboard/Dashboard.query","./dashboard/Dashboard.views","./queries/BaseQuery","./queries/CpkQuery","./queries/CdaQuery","./queries/XmlaQuery","./queries/LegacyQuery","./components/BaseComponent","./components/UnmanagedComponent","css!./Dashboard"],function(t){return t
}),define("cdf/Dashboard.Blueprint",["./Dashboard","css!./lib/blueprint/screen"],function(t){return t
}),define("cdf/dashboard/Query",["amd!../lib/underscore","../lib/jquery"],function(t,e){return function(n,i,r){var a,o;
if(t.isObject(n)?(a=e.extend(!0,{},n),o=t.isString(n.queryType)&&n.queryType||!t.isUndefined(n.query)&&"legacy"||!t.isUndefined(n.path)&&!t.isUndefined(n.dataAccessId)&&"cda"||void 0):t.isString(n)&&t.isString(i)&&(o="cda",a={path:n,dataAccessId:i}),!o)throw"InvalidQuery";
return r.getQuery(o,a)}});