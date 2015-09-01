define(["../lib/Base","../lib/jquery","amd!../lib/underscore","amd!../lib/backbone","../Logger","../dashboard/Utils"],function(t,e,r,i,s,n){var a=t.extend(i.Events).extend({visible:!0,isManaged:!0,timerStart:0,timerSplit:0,elapsedSinceSplit:-1,elapsedSinceStart:-1,logColor:void 0,constructor:function(t){this.extend(t)
},placeholder:function(t){var r=this.htmlObject;return r?e("#"+r+(t?" "+t:"")):e()
},focus:function(){try{this.placeholder("*:first").focus()}catch(t){}},_doAutoFocus:function(){this.autoFocus&&(delete this.autoFocus,this.focus())
},clear:function(){this.placeholder().empty()},copyEvents:function(t,e){r.each(e,function(e,r){for(var i=e,s=e.tail;(i=i.next)!==s;)t.on(r,i.callback,i.context)
})},clone:function(t,r,i){var s,n,a;return n=this.dashboard,a=this._events,delete this.dashboard,delete this._events,s=e.extend(!0,{},this),s.dashboard=this.dashboard=n,this._events=a,this.copyEvents(s,a),s.parameters&&(s.parameters=s.parameters.map(function(e){return e[1]in t?[e[0],t[e[1]]]:e
})),s.components&&(s.components=s.components.map(function(t){return t in r?r[t]:t
})),s.htmlObject=s.htmlObject?i[s.htmlObject]:void 0,s.listeners&&(s.listeners=s.listeners.map(function(e){return e in t?t[e]:e
})),s.parameter&&s.parameter in t&&(s.parameter=t[s.parameter]),s},getAddIn:function(t,e){if(!this.dashboard)return s.warn("dashboard not yet defined, can't call getAddIn"),!1;
var r="function"==typeof this.type?this.type():this.type;return this.dashboard.getAddIn(r,t,e)
},hasAddIn:function(t,e){if(!this.dashboard)return s.warn("dashboard not yet defined, can't call hasAddIn"),!1;
var r="function"==typeof this.type?this.type():this.type;return this.dashboard.hasAddIn(r,t,e)
},getValuesArray:function(){var t;if("undefined"==typeof this.valuesArray||0==this.valuesArray.length){if("undefined"!=typeof this.queryDefinition){var r="sql"==this.queryDefinition.queryType?"sql":"none";
"mdx"!=this.queryDefinition.queryType||this.valueAsId?void 0===this.queryDefinition.dataAccessId||this.valueAsId||(r="cda"):r="mdx",QueryComponent.makeQuery(this);
var i=new Array;for(n in this.result)if(this.result.hasOwnProperty(n))switch(r){case"sql":i.push([this.result[n][0],this.result[n][1]]);
break;case"mdx":i.push([this.result[n][1],this.result[n][0]]);break;case"cda":i.push([this.result[n][0],this.result[n][1]]);
break;default:i.push([this.result[n][0],this.result[n][0]])}return i}if(!this.dashboard)return s.warn("dashboard not yet defined, return empty array"),[];
for(var n=new Array(this.parameters?this.parameters.length:0),a=0,h=n.length;h>a;a++){var o=this.parameters[a][0],d=""==this.parameters[a][1]||"NIL"==this.parameters[a][1]?this.parameters[a][2]:this.dashboard.getParameterValue(this.parameters[a][1]);
n[a]=[o,d]}var u=this;if(this.url){var l={};e.each(n,function(t,e){l[e[0]]=e[1]}),t=this.dashboard.parseXActionResult(u,this.dashboard.urlAction(this.url,l))
}else t=this.dashboard.callPentahoAction(u,this.solution,this.path,this.action,n,null);
var i=this.parseArray(t,!1);return i}return this.valuesArray},parseArray:function(t,r){if(null===t)return[];
if(e(t).find("CdaExport").size()>0)return this.parseArrayCda(t,r);var i=new Array,s=e(t).find("COLUMN-HDR-ITEM");
if(r&&s.size()>0){var n=new Array;s.each(function(){n.push(e(this).text())}),i.push(n)
}var a=e(t).find("DATA-ROW");return a.each(function(){var t=new Array;e(this).children("DATA-ITEM").each(function(){t.push(e(this).text())
}),i.push(t)}),i},parseArrayCda:function(t,r){var i=new Array,s=e(t).find("ColumnMetaData");
if(s.size()>0&&r){var n=new Array;s.each(function(){n.push(e(this).attr("name"))}),i.push(n)
}var a=e(t).find("Row");return a.each(function(){var t=new Array;e(this).children("Col").each(function(){t.push(e(this).text())
}),i.push(t)}),i},setAddInDefaults:function(){s.log("BaseComponent.setAddInDefaults was removed. You should call setAddInOptions or dashboard.setAddInDefaults")
},setAddInOptions:function(t,e,r){this.addInOptions||(this.addInOptions={}),this.addInOptions[t]||(this.addInOptions[t]={}),this.addInOptions[t][e]=r
},getAddInOptions:function(t,e){var r=null;try{r=this.addInOptions[t][e]}catch(i){}return r||{}
},startTimer:function(){this.timerStart=new Date,this.timerSplit=new Date},splitTimer:function(){(-1===this.elapsedSinceStart||-1===this.elapsedSinceSplit)&&this.startTimer();
var t=new Date;return this.elapsedSinceStart=t.getTime()-this.timerStart.getTime(),this.elapsedSinceSplit=t.getTime()-this.timerSplit.getTime(),this.timerSplit=t,this.getTimerInfo()
},formatTimeDisplay:function(t){return Math.log(t)/Math.log(10)>=3?Math.round(t/100)/10+"s":t+"ms"
},getTimerInfo:function(){return{timerStart:this.timerStart,timerSplit:this.timerSplit,elapsedSinceStart:this.elapsedSinceStart,elapsedSinceStartDesc:this.formatTimeDisplay(this.elapsedSinceStart),elapsedSinceSplit:this.elapsedSinceSplit,elapsedSinceSplitDesc:this.formatTimeDisplay(this.elapsedSinceSplit)}
},getLogColor:function(){if(this.logColor)return this.logColor;var t=function(t){var e=0;
if(0==t.length)return e;for(var r=0;r<t.length;r++){var i=t.charCodeAt(r);e=(e<<5)-e+i,e&=e
}return e},e=t(this.name).toString(),r=e.substr(e.length-6,2)||0,i=e.substr(e.length-2,2)||0,s=e.substr(e.length-4,2)||0;
return this.logColor=n.hsvToRgb(3.6*r,.75*i,45+.35*s),this.logColor}});return a});
