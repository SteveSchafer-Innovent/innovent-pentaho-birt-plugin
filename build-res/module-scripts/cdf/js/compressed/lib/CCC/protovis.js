define([],function(){function t(t,i,o,a){var s,l=o-i;if(l&&isFinite(l)){var u=m.parseNumNonNeg(m.get(a,"precision",0)),h=m.parseNumNonNeg(m.get(a,"precisionMin",0)),c=m.parseNumNonNeg(m.get(a,"precisionMax",1/0)),p=m.get(a,"roundInside",!0);
isFinite(u)||(u=0),isFinite(h)||(h=0),c||(c=1/0);var f=m.get(a,"numberExponentMin"),d=m.get(a,"numberExponentMax");
null!=f&&isFinite(f)&&(h=Math.max(h,Math.pow(10,Math.floor(f)))),null!=d&&isFinite(d)&&(c=Math.min(c,5*Math.pow(10,Math.floor(d)))),p&&(h>l&&(h=l),c>l&&(c=l)),h>c&&(c=h),u?u=Math.max(Math.min(u,c),h):h===c&&(u=h);
var y,g,v,x,b=0,k=!!u;if(k)y={base:Math.abs(u),mult:1,value:1},y.value=y.base;else{var S=m.parseNumNonNeg(m.get(a,"tickCountMax",1/0));
if(1>S&&(S=1),null==t?t=Math.min(10,S):isFinite(t)?t>S&&(t=S):t=isFinite(S)?S:10,y={base:isFinite(t)?m.logFloor(l/t,10):0,mult:1,value:1},y.value=y.base,h>0&&(g=n(h,!0),y.value<g.value&&(e(y,g),b=-1)),isFinite(c)&&(v=n(c,!1),g&&v.value<=g.value?v=null:v.value<y.value&&(e(y,v),b=1)),1!==b&&isFinite(t)&&y.mult<10&&(x=l/y.base,x>t)){var M=t/x;
.15>=M?y.mult=10:y.mult<5&&(.35>=M?y.mult=5:y.mult<2&&.75>=M&&(y.mult=2)),y.mult>1&&(y.value=y.base*y.mult,g&&y.value<g.value?(e(y,g),b=-1):v&&v.value<y.value?(e(y,v),b=1):10===y.mult&&(y.base*=10,y.mult=1))
}}for(var w;;){var C=y.value,L=C*Math[p?"ceil":"floor"](i/C),N=C*Math[p?"floor":"ceil"](o/C);
if(w&&(L>N||v&&N-L>v.value)){y=w;break}var A=Math.floor(m.log(C,10)+1e-10);if(y.decPlaces=Math.max(0,-A),y.ticks=m.range(L,N+C,C),k||b>0||y.ticks.length<=S)break;
if(w&&w.ticks.length<=y.ticks.length){y=w;break}y=r(w=y)}s=y.ticks,s.step=y.value,s.base=y.base,s.mult=y.mult,s.decPlaces=y.decPlaces,s.format=m.Format.number().fractionDigits(y.decPlaces)
}else s=[+i],s.step=s.base=s.mult=1,s.decPlaces=0,s.format=m.Format.number().fractionDigits(0);
return s}function e(t,e){return t.base=e.base,t.mult=e.mult,t.value=e.value,t}function r(t){var r=e({},t);
switch(r.mult){case 5:r.mult=1,r.base*=10;break;case 2:r.mult=5;break;case 1:r.mult=2
}return r.value=r.base*r.mult,r}function n(t,e){0>t&&(t=-t);var r=m.logFloor(t,10),n=t/r;
return e?n>5?(n=1,r*=10):n=n>2?5:n>1?2:1:n=n>=5?5:n>=2?2:1,{base:r,mult:n,value:r*n,source:t}
}function i(t){return new Date(t)}function o(t,e,r,n,o,s,l){var h,p=r-e;if(p&&isFinite(p)){n=c(m.get(l,"precision"),n);
var f=c(m.get(l,"precisionMin"),0),d=c(m.get(l,"precisionMax"),1/0);f>d&&(d=f),n?n=Math.max(Math.min(n,d),f):f===d&&(n=f);
var y=m.parseNumNonNeg(m.get(l,"tickCountMax",1/0));2>y&&(y=2),t=Math.min(null==t?5:t,y);
for(var g,v={weekStart:s,roundInside:m.get(l,"roundInside",1)},x=a(t,p,n,f,d,v),b=x.fixed,k=x.overflow;;){if(x.ticks=h=x.comp.ticks(e,r,x.mult,v),g&&x.precMax&&h[h.length-1]-h[0]>x.precMax.value){x=g;
break}if(b||k>0||x.ticks.length<=y)break;if(g&&g.ticks.length<=x.ticks.length){x=g;
break}g=x,x=x.comp.resultAbove(x.mult)}h=x.ticks,h.step=x.value,h.base=x.comp.value,h.mult=x.mult,h.format=u(o)||x.comp.format
}else h=[i(e)],h.step=h.base=h.mult=1,h.format=m.Format.date("%x");return h}function a(t,e,r,n,i,o){var a,l,u,h,c=0,p=1,f=!!r;
return r?(l=s(r,!1),l.value!==r?a=l.comp.withPrecision(r):(a=l.comp,p=l.mult)):(isFinite(t)?(a=g(e,t),p=a.multiple(e/a.value,o)):(a=d(),p=1),r=a.value*p,n>r&&(u=s(n,!0)),r>i&&(h=s(i,!1)),u&&r<u.value?(a=u.comp,p=u.mult,c=-1):h&&n<h.value&&h.value<r&&(a=h.comp,p=h.mult,c=1)),{comp:a,mult:p,value:a.value*p,source:r,overflow:c,fixed:f,precMin:u,precMax:h}
}function s(t,e){return null==t||0>=t||!isFinite(t)?null:(e?d:y)().castValue(t,e)
}function l(t,e,r){this.value=t,this.mult=r.mult||1,this.base=1===this.mult?this.value:Math.floor(this.value/this.mult),v.forEach(function(t){null!=r[t]&&(this[t]=r[t])
},this),r.floor&&(this.floorLocal=r.floor),this.format=u(r.format),this.first=m.functor(r.first||0),this.prev=e,this.next=null,e&&(e.next=this)
}function u(t){return null==t?null:"function"==typeof t?t:m.Format.date(t)}function h(t,e){var r=new Date(t.getFullYear(),t.getMonth(),1),n=e-r.getDay();
return n&&(0>n&&(n+=7),r.setDate(r.getDate()+n)),r}function c(t,e){if("string"==typeof t){var r=+t;
if(isNaN(r)){if(t){var n=/^(\d*)([a-zA-Z]+)$/.exec(t);n&&(t=p(n[2]),t&&(t*=+n[1]||1))
}}else t=r}return("number"!=typeof t||0>t)&&(t=null!=e?e:0),t}function p(t){switch(t){case"y":return 31536e6;
case"m":return 2592e6;case"w":return 6048e5;case"d":return 864e5;case"h":return 36e5;
case"M":return 6e4;case"s":return 1e3;case"ms":return 1}}function f(t,e){var r=y();
x.push(new l(t,r,e))}function d(){return x[0]}function y(){return x.length?x[x.length-1]:null
}function g(t,e){null==e&&(e=1);var r,n=y();do r=n;while(t<e*r.value&&(n=r.prev));
return r}Array.prototype.map||(Array.prototype.map=function(t,e){for(var r=this.length,n=new Array(r),i=0;r>i;i++)i in this&&(n[i]=t.call(e,this[i],i,this));
return n}),Array.prototype.filter||(Array.prototype.filter=function(t,e){for(var r=this.length,n=new Array,i=0;r>i;i++)if(i in this){var o=this[i];
t.call(e,o,i,this)&&n.push(o)}return n}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){for(var r=this.length>>>0,n=0;r>n;n++)n in this&&t.call(e,this[n],n,this)
}),Array.prototype.reduce||(Array.prototype.reduce=function(t,e){var r=this.length;
if(!r&&1==arguments.length)throw new Error("reduce: empty array, no initial value");
var n=0;if(arguments.length<2)for(;;){if(n in this){e=this[n++];break}if(++n>=r)throw new Error("reduce: no values, no initial value")
}for(;r>n;n++)n in this&&(e=t(e,this[n],n,this));return e}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){for(var r=this.length>>>0,n=!isFinite(e)||0>e?0:e>this.length?this.length:e;r>n;n++)if(this[n]===t)return n;
return-1}),Date.now||(Date.now=function(){return+new Date}),Object.create||(Object.create=function(t){function e(){}return e.prototype=t,new e
});var m={};m.version={major:3,minor:3},m.identity=function(t){return t},m.index=function(){return this.index
},m.child=function(){return this.childIndex},m.parent=function(){return this.parent.index
},!function(){m.extend=function(t){return Object.create(t.prototype||t)},m.extendType=function(t,e){var r=t.prototype=m.extend(e);
return r.constructor=t,t},m.parse=function(t){for(var e,r,n=new RegExp("function\\s*(\\b\\w+)?\\s*\\([^)]*\\)\\s*","mg"),i=0,o="";e=n.exec(t);){var a=e.index+e[0].length;
if("{"!=t.charAt(a)){o+=t.substring(i,a)+"{return ",i=a;for(var s=0;s>=0&&a<t.length;a++){var l=t.charAt(a);
switch(l){case'"':case"'":for(;++a<t.length&&(r=t.charAt(a))!=l;)"\\"==r&&a++;break;
case"[":case"(":s++;break;case"]":case")":s--;break;case";":case",":0==s&&s--}}o+=m.parse(t.substring(i,--a))+";}",i=a
}n.lastIndex=a}return o+=t.substring(i)},m.error=function(t){"undefined"!=typeof console&&console.error?console.error(t):alert(t)
},m.listen=function(t,e,r){return r=m.listener(r),"load"===e||"onload"===e?m.listenForPageLoad(r):(t.addEventListener?t.addEventListener(e,r,!1):(t===window&&(t=document.documentElement),t.attachEvent("on"+e,r)),r)
},m.unlisten=function(t,e,r){r.$listener&&(r=r.$listener),t.removeEventListener?t.removeEventListener(e,r,!1):t.detachEvent("on"+e,r)
},m.listenForPageLoad=function(t){"complete"!==document.readyState?document.addEventListener?window.addEventListener("load",t,!1):document.attachEvent&&window.attachEvent("onload",t):t(null)
},m.listener=function(t){return t.$listener||(t.$listener=function(e){try{return m.event=e=e&&m.fixEvent(e),t.call(this,e)
}catch(r){m.error(r)}finally{delete m.event}})},m.fixEvent=function(t){if(null==t.pageX&&null!=t.clientX){var e=t.target&&t.target.ownerDocument||document,r=e.documentElement,n=e.body;
t.pageX=1*t.clientX+(r&&r.scrollLeft||n&&n.scrollLeft||0)-(r&&r.clientLeft||n&&n.clientLeft||0),t.pageY=1*t.clientY+(r&&r.scrollTop||n&&n.scrollTop||0)-(r&&r.clientTop||n&&n.clientTop||0)
}return t},m.ancestor=function(t,e){for(;e;){if(e===t)return!0;e=e.parentNode}return!1
},m.removeChildren=function(t){for(;t.lastChild;)t.removeChild(t.lastChild)},m.getWindow=function(t){return null!=t&&t==t.window?t:9===t.nodeType?t.defaultView||t.parentWindow:!1
};var t=/\-([a-z])/g;m.hiphen2camel=function(e){return t.test(e)?e.replace(t,function(t,e){return e.toUpperCase()
}):e};var e=window.getComputedStyle;m.css=function(t,r){return e?e.call(window,t,null).getPropertyValue(r):t.currentStyle["float"===r?"styleFloat":m.hiphen2camel(r)]
},m.cssStyle=function(t){var r;return e?(r=e.call(window,t,null),function(t){return r.getPropertyValue(t)
}):(r=t.currentStyle,function(t){return r["float"===t?"styleFloat":m.hiphen2camel(t)]
})},m._getElementsByClass=function(t,e){null==e&&(e=document);for(var r=[],n=e.getElementsByTagName("*"),i=n.length,o=new RegExp("(^|\\s)"+t+"(\\s|$)"),a=0,s=0;i>a;a++)o.test(n[a].className)&&(r[s]=n[a],s++);
return r},m.getElementsByClassName=function(t,e){return t.getElementsByClassName?t.getElementsByClassName(e):m._getElementsByClass(e,t)
},m.elementOffset=function(t){var e=t&&t.ownerDocument;if(e){var r=e.body;if(r!==t){var n;
n="undefined"!=typeof t.getBoundingClientRect?t.getBoundingClientRect():{top:0,left:0};
var i=m.getWindow(e),o=e.documentElement,a=o.clientTop||r.clientTop||0,s=o.clientLeft||r.clientLeft||0,l=i.pageYOffset||o.scrollTop,u=i.pageXOffset||o.scrollLeft;
return{top:n.top+l-a,left:n.left+u-s}}}},m.renderer=function(){var t=document.svgImplementation||"nativesvg";
return m.renderer=function(){return t},t};var r=1;m.id=function(){return r++},m.functor=function(t){return"function"==typeof t?t:function(){return t
}},m.stringLowerCase=function(t){return String(t).toLowerCase()},m.get=function(t,e,r){var n;
return t&&null!=(n=t[e])?n:r};var n=Object.prototype.hasOwnProperty;m.lazyArrayOwn=function(t,e){var r;
return t&&n.call(t,e)&&(r=t[e])?r:t[e]=[]},m.parseNumNonNeg=function(t,e){return null!=t&&("string"==typeof t?t=+t:"number"!=typeof t&&(t=null)),null==t||isNaN(t)||0>t?null==e?0:e:t
};var i=m.epsilon=1e-6;m.floatLess=function(t,e){return!m.floatEqual(t,e)&&e>t},m.floatLessOrEqual=function(t,e){return e>t||m.floatEqual(t,e)
},m.floatGreater=function(t,e){return!m.floatEqual(t,e)&&t>e},m.floatEqual=function(t,e){return Math.abs(e-t)<i
},m.floatZero=function(t){return Math.abs(t)<i},m.floatBelongsOpen=function(t,e,r){return m.floatLess(t,e)&&m.floatLess(e,r)
},m.floatBelongsClosed=function(t,e,r){return m.floatLessOrEqual(t,e)&&m.floatLessOrEqual(e,r)
}}(),m.listen(window,"load",function(){for(m.$={i:0,x:document.getElementsByTagName("script")},m.$.xlen=m.$.x.length;m.$.i<m.$.xlen;m.$.i++)if(m.$.s=m.$.x[m.$.i],"text/javascript+protovis"==m.$.s.type)try{window.eval(m.parse(m.$.s.text))
}catch(t){m.error(t)}delete m.$}),m.Format={},m.Format.re=function(t){return t.replace(/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g,"\\$&")
},m.Format.pad=function(t,e,r){var n=e-String(r).length;return 1>n?r:new Array(n+1).join(t)+r
},m.Format.date=function(t){function e(e){return t.replace(/%[a-zA-Z0-9]/g,function(t){switch(t){case"%a":return["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][e.getDay()];
case"%A":return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()];
case"%h":case"%b":return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()];
case"%B":return["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()];
case"%c":return e.toLocaleString();case"%C":return r("0",2,Math.floor(e.getFullYear()/100)%100);
case"%d":return r("0",2,e.getDate());case"%x":case"%D":return r("0",2,e.getMonth()+1)+"/"+r("0",2,e.getDate())+"/"+r("0",2,e.getFullYear()%100);
case"%e":return r(" ",2,e.getDate());case"%H":return r("0",2,e.getHours());case"%I":var n=e.getHours()%12;
return n?r("0",2,n):12;case"%m":return r("0",2,e.getMonth()+1);case"%M":return r("0",2,e.getMinutes());
case"%n":return"\n";case"%p":return e.getHours()<12?"AM":"PM";case"%T":case"%X":case"%r":var n=e.getHours()%12;
return(n?r("0",2,n):12)+":"+r("0",2,e.getMinutes())+":"+r("0",2,e.getSeconds())+" "+(e.getHours()<12?"AM":"PM");
case"%R":return r("0",2,e.getHours())+":"+r("0",2,e.getMinutes());case"%S":return r("0",2,e.getSeconds());
case"%Q":return r("0",3,e.getMilliseconds());case"%t":return"	";case"%u":var i=e.getDay();
return i?i:1;case"%w":return e.getDay();case"%y":return r("0",2,e.getFullYear()%100);
case"%Y":return e.getFullYear();case"%%":return"%"}return t})}var r=m.Format.pad;
return e.format=e,e.parse=function(e){var r=1970,n=0,i=1,o=0,a=0,s=0,l=[function(){}],u=m.Format.re(t).replace(/%[a-zA-Z0-9]/g,function(t){switch(t){case"%b":return l.push(function(t){n={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[t]
}),"([A-Za-z]+)";case"%h":case"%B":return l.push(function(t){n={January:0,February:1,March:2,April:3,May:4,June:5,July:6,August:7,September:8,October:9,November:10,December:11}[t]
}),"([A-Za-z]+)";case"%e":case"%d":return l.push(function(t){i=t}),"([0-9]+)";case"%I":case"%H":return l.push(function(t){o=t
}),"([0-9]+)";case"%m":return l.push(function(t){n=t-1}),"([0-9]+)";case"%M":return l.push(function(t){a=t
}),"([0-9]+)";case"%p":return l.push(function(t){12==o?"am"==t&&(o=0):"pm"==t&&(o=Number(o)+12)
}),"(am|pm)";case"%S":return l.push(function(t){s=t}),"([0-9]+)";case"%y":return l.push(function(t){t=Number(t),r=t+(t>=0&&69>t?2e3:t>=69&&100>t?1900:0)
}),"([0-9]+)";case"%Y":return l.push(function(t){r=t}),"([0-9]+)";case"%%":return l.push(function(){}),"%"
}return t}),h=e.match(u);return h&&h.forEach(function(t,e){l[e](t)}),new Date(r,n,i,o,a,s)
},e},m.Format.time=function(t){function e(e){switch(e=Number(e),t){case"short":return e>=31536e6?(e/31536e6).toFixed(1)+" years":e>=6048e5?(e/6048e5).toFixed(1)+" weeks":e>=864e5?(e/864e5).toFixed(1)+" days":e>=36e5?(e/36e5).toFixed(1)+" hours":e>=6e4?(e/6e4).toFixed(1)+" minutes":(e/1e3).toFixed(1)+" seconds";
case"long":var n=[],i=e%6e4/1e3>>0,o=e%36e5/6e4>>0;if(n.push(r("0",2,i)),e>=36e5){var a=e%864e5/36e5>>0;
n.push(r("0",2,o)),e>=864e5?(n.push(r("0",2,a)),n.push(Math.floor(e/864e5).toFixed())):n.push(a.toFixed())
}else n.push(o.toFixed());return n.reverse().join(":")}}var r=m.Format.pad;return e.format=e,e.parse=function(e){switch(t){case"short":for(var r,n=/([0-9,.]+)\s*([a-z]+)/g,i=0;r=n.exec(e);){var o=parseFloat(r[0].replace(",","")),a=0;
switch(r[2].toLowerCase()){case"year":case"years":a=31536e6;break;case"week":case"weeks":a=6048e5;
break;case"day":case"days":a=864e5;break;case"hour":case"hours":a=36e5;break;case"minute":case"minutes":a=6e4;
break;case"second":case"seconds":a=1e3}i+=o*a}return i;case"long":var r=e.replace(",","").split(":").reverse(),i=0;
return r.length&&(i+=1e3*parseFloat(r[0])),r.length>1&&(i+=6e4*parseFloat(r[1])),r.length>2&&(i+=36e5*parseFloat(r[2])),r.length>3&&(i+=864e5*parseFloat(r[3])),i
}},e},m.Format.number=function(){function t(t){1/0>o&&(t=Math.round(t*a)/a);var d=String(Math.abs(t)).split("."),y=d[0];
y.length>r&&(y=y.substring(y.length-r)),u&&y.length<e&&(y=new Array(e-y.length+1).join(s)+y),y.length>3&&(y=y.replace(/\B(?=(?:\d{3})+(?!\d))/g,c)),!u&&y.length<n&&(y=new Array(n-y.length+1).join(s)+y),d[0]=0>t?p+y+f:y;
var g=d[1]||"";return g.length>o&&(g=d[1]=g.substr(0,o)),g.length<i&&(d[1]=g+new Array(i-g.length+1).join(l)),d.join(h)
}var e=0,r=1/0,n=0,i=0,o=0,a=1,s="0",l="0",u=!0,h=".",c=",",p="−",f="";return t.format=t,t.parse=function(t){var e=m.Format.re,n=String(t).split(h);
1==n.length&&(n[1]=""),n[0].replace(new RegExp("^("+e(s)+")*"),""),n[1].replace(new RegExp("("+e(l)+")*$"),"");
var i=n[0].replace(new RegExp(e(c),"g"),"");i.length>r&&(i=i.substring(i.length-r));
var u=n[1]?Number("0."+n[1]):0;return 1/0>o&&(u=Math.round(u*a)/a),Math.round(i)+u
},t.integerDigits=function(t,i){return arguments.length?(e=Number(t),r=arguments.length>1?Number(i):e,n=e+Math.floor(e/3)*c.length,this):[e,r]
},t.fractionDigits=function(t,e){return arguments.length?(i=Number(t),o=arguments.length>1?Number(e):i,a=Math.pow(10,o),this):[i,o]
},t.integerPad=function(t){return arguments.length?(s=String(t),u=/\d/.test(s),this):s
},t.fractionPad=function(t){return arguments.length?(l=String(t),this):l},t.decimal=function(t){return arguments.length?(h=String(t),this):h
},t.group=function(t){return arguments.length?(c=t?String(t):"",n=e+Math.floor(e/3)*c.length,this):c
},t.negativeAffix=function(t,e){return arguments.length?(p=String(t||""),f=String(e||""),this):[p,f]
},t},!function(){var t;m.Text={},m.Text.createCache=function(){return new e},m.Text.usingCache=function(r,n,i){if(!(r instanceof e))throw new Error("Not a valid cache.");
var o=t;t=r;try{return n.call(i)}finally{t=o}},m.Text.measure=function(e,r){e=null==e?"":String(e);
var n=t&&t.get(r,e);return n||(n=e?this.measureCore(e,r):{width:0,height:0},t&&t.put(r,e,n)),n
},m.Text.measureWidth=function(t,e){return m.Text.measure(t,e).width},m.Text.fontHeight=function(t){return m.Text.measure("M",t).height
},m.Text.measureCore=function(){function t(){return r||(r=e())}function e(){var t=document.createElement("div");
t.id="pvSVGText_"+(new Date).getTime();var e=t.style;e.position="absolute",e.visibility="hidden",e.width=0,e.height=0,e.left=0,e.top=0,e.lineHeight=1,e.textTransform="none",e.letterSpacing="normal",e.whiteSpace="nowrap";
var r=m.SvgScene.create("svg");r.setAttribute("font-size","10px"),r.setAttribute("font-family","sans-serif"),t.appendChild(r);
var n=m.SvgScene.create("text");return r.appendChild(n),n.appendChild(document.createTextNode("")),document.body.appendChild(t),n
}var r,n="10px sans-serif";return function(e,r){r||(r=null);var i=t();n!==r&&(n=r,m.SvgScene.setStyle(i,{font:r})),i.firstChild.nodeValue=String(e);
var o;try{o=i.getBBox()}catch(a){throw"function"==typeof console.error&&console.error("GetBBox failed: ",a),a
}return{width:o.width,height:o.height}}}();var e=function(){this._fontsCache={}},r=Object.prototype.hasOwnProperty;
e.prototype._getFont=function(t){return t=t||"",r.call(this._fontsCache,t)?this._fontsCache[t]:this._fontsCache[t]={}
},e.prototype.get=function(t,e){e=e||"";var n=this._getFont(t);return r.call(n,e)?n[e]:null
},e.prototype.put=function(t,e,r){return this._getFont(t)[e||""]=r}}(),m.map=function(t,e){var r={};
return e?t.map(function(t,n){return r.index=n,e.call(r,t)}):t.slice()},m.repeat=function(t,e){return 1==arguments.length&&(e=2),m.blend(m.range(e).map(function(){return t
}))},m.array=function(t,e){var r=t>=0?new Array(t):[];if(void 0!==e)for(var n=0;t>n;n++)r[n]=e;
return r},m.cross=function(t,e){for(var r=[],n=0,i=t.length,o=e.length;i>n;n++)for(var a=0,s=t[n];o>a;a++)r.push([s,e[a]]);
return r},m.blend=function(t){return Array.prototype.concat.apply([],t)},m.transpose=function(t){var e=t.length,r=m.max(t,function(t){return t.length
});if(r>e){t.length=r;for(var n=e;r>n;n++)t[n]=new Array(e);for(var n=0;e>n;n++)for(var i=n+1;r>i;i++){var o=t[n][i];
t[n][i]=t[i][n],t[i][n]=o}}else{for(var n=0;r>n;n++)t[n].length=e;for(var n=0;e>n;n++)for(var i=0;n>i;i++){var o=t[n][i];
t[n][i]=t[i][n],t[i][n]=o}}t.length=r;for(var n=0;r>n;n++)t[n].length=e;return t},m.normalize=function(t,e){for(var r=m.map(t,e),n=m.sum(r),i=0;i<r.length;i++)r[i]/=n;
return r},m.permute=function(t,e,r){r||(r=m.identity);var n=new Array(e.length),i={};
return e.forEach(function(e,o){i.index=e,n[o]=r.call(i,t[e])}),n},m.numerate=function(t,e){e||(e=m.identity);
var r={},n={};return t.forEach(function(t,i){n.index=i,r[e.call(n,t)]=i}),r},m.uniq=function(t,e){e||(e=m.identity);
var r,n={},i=[],o={};return t.forEach(function(t,a){o.index=a,r=e.call(o,t),r in n||(n[r]=i.push(r))
}),i},m.naturalOrder=function(t,e){return e>t?-1:t>e?1:0},m.reverseOrder=function(t,e){return t>e?-1:e>t?1:0
},m.search=function(t,e,r){r||(r=m.identity);for(var n=0,i=t.length-1;i>=n;){var o=n+i>>1,a=r(t[o]);
if(e>a)n=o+1;else{if(!(a>e))return o;i=o-1}}return-n-1},m.search.index=function(t,e,r){var n=m.search(t,e,r);
return 0>n?-n-1:n},m.range=function(t,e,r){if(1==arguments.length&&(e=t,t=0),void 0==r&&(r=1),(e-t)/r==1/0)throw new Error("range must be finite");
var n,i=[],o=0;if(e-=1e-10*(e-t),0>r)for(;(n=t+r*o++)>e;)i.push(n);else for(;(n=t+r*o++)<e;)i.push(n);
return i},m.random=function(t,e,r){return 1==arguments.length&&(e=t,t=0),void 0==r&&(r=1),r?Math.floor(Math.random()*(e-t)/r)*r+t:Math.random()*(e-t)+t
},m.sum=function(t,e){var r={};return t.reduce(e?function(t,n,i){return r.index=i,t+e.call(r,n)
}:function(t,e){return t+e},0)},m.max=function(t,e){return e==m.index?t.length-1:Math.max.apply(null,e?m.map(t,e):t)
},m.max.index=function(t,e){if(!t.length)return-1;if(e==m.index)return t.length-1;
e||(e=m.identity);for(var r=0,n=-1/0,i={},o=0;o<t.length;o++){i.index=o;var a=e.call(i,t[o]);
a>n&&(n=a,r=o)}return r},m.min=function(t,e){return e==m.index?0:Math.min.apply(null,e?m.map(t,e):t)
},m.min.index=function(t,e){if(!t.length)return-1;if(e==m.index)return 0;e||(e=m.identity);
for(var r=0,n=1/0,i={},o=0;o<t.length;o++){i.index=o;var a=e.call(i,t[o]);n>a&&(n=a,r=o)
}return r},m.mean=function(t,e){return m.sum(t,e)/t.length},m.median=function(t,e){if(e==m.index)return(t.length-1)/2;
if(t=m.map(t,e).sort(m.naturalOrder),t.length%2)return t[Math.floor(t.length/2)];
var r=t.length/2;return(t[r-1]+t[r])/2},m.variance=function(t,e){if(t.length<1)return 0/0;
if(1==t.length)return 0;var r=m.mean(t,e),n=0,i={};e||(e=m.identity);for(var o=0;o<t.length;o++){i.index=o;
var a=e.call(i,t[o])-r;n+=a*a}return n},m.deviation=function(t,e){return Math.sqrt(m.variance(t,e)/(t.length-1))
},m.log=function(t,e){return Math.log(t)/Math.log(e)},m.logSymmetric=function(t,e){return 0==t?0:0>t?-m.log(-t,e):m.log(t,e)
},m.logAdjusted=function(t,e){if(!isFinite(t))return t;var r=0>t;return e>t&&(t+=(e-t)/e),r?-m.log(t,e):m.log(t,e)
},m.logFloor=function(t,e){return t>0?Math.pow(e,Math.floor(m.log(t,e))):-Math.pow(e,-Math.floor(-m.log(-t,e)))
},m.logCeil=function(t,e){return t>0?Math.pow(e,Math.ceil(m.log(t,e))):-Math.pow(e,-Math.ceil(-m.log(-t,e)))
},!function(){var t=Math.PI/180,e=180/Math.PI;m.radians=function(e){return t*e},m.degrees=function(t){return e*t
}}(),m.keys=function(t){var e=[];for(var r in t)e.push(r);return e},m.entries=function(t){var e=[];
for(var r in t)e.push({key:r,value:t[r]});return e},m.values=function(t){var e=[];
for(var r in t)e.push(t[r]);return e},m.dict=function(t,e){for(var r={},n={},i=0;i<t.length;i++)if(i in t){var o=t[i];
n.index=i,r[o]=e.call(n,o)}return r},m.hasOwnProp=Object.prototype.hasOwnProperty,m.copyOwn=function(t,e){if(e){var r=m.hasOwnProp;
for(var n in e)r.call(e,n)&&(t[n]=e[n])}return t},m.dom=function(t){return new m.Dom(t)
},m.Dom=function(t){this.$map=t},m.Dom.prototype.$leaf=function(t){return"object"!=typeof t
},m.Dom.prototype.leaf=function(t){return arguments.length?(this.$leaf=t,this):this.$leaf
},m.Dom.prototype.root=function(t){function e(t){var n=new m.Dom.Node;for(var i in t){var o=t[i];
n.appendChild(r(o)?new m.Dom.Node(o):e(o)).nodeName=i}return n}var r=this.$leaf,n=e(this.$map);
return n.nodeName=t,n},m.Dom.prototype.nodes=function(){return this.root().nodes()
},m.Dom.Node=function(t){void 0!==t&&(this.nodeValue=t)},m.Dom.Node.prototype.nodeValue=void 0,m.Dom.Node.prototype.childNodes=[],m.Dom.Node.prototype.parentNode=null,m.Dom.Node.prototype.firstChild=null,m.Dom.Node.prototype.lastChild=null,m.Dom.Node.prototype.previousSibling=null,m.Dom.Node.prototype.nextSibling=null,m.Dom.Node.prototype._firstDirtyChildIndex=1/0,m.Dom.Node.prototype._childIndex=-1,m.Dom.Node.prototype.findChildIndex=function(t){if(!t)throw new Error("Argument 'n' required");
if(t.parentNode===this){var e=t.childIndex(!0);if(e>-1)return e}throw new Error("child not found")
},m.Dom.Node.prototype._childRemoved=function(){},m.Dom.Node.prototype._childAdded=function(){},m.Dom.Node.prototype.removeChild=function(t){var e=this.findChildIndex(t);
return this.removeAt(e)},m.Dom.Node.prototype.appendChild=function(t){var e=t.parentNode;
e&&e.removeChild(t);var r=this.lastChild;t.parentNode=this,t.previousSibling=r,r?(r.nextSibling=t,t._childIndex=r._childIndex+1):(this.firstChild=t,t._childIndex=0),this.lastChild=t;
var n=m.lazyArrayOwn(this,"childNodes").push(t);return this._childAdded(t,n-1),t},m.Dom.Node.prototype.insertBefore=function(t,e){if(!e)return this.appendChild(t);
var r=this.findChildIndex(e);return this.insertAt(t,r)},m.Dom.Node.prototype.insertAt=function(t,e){if(null==e)return this.appendChild(t);
var r=this.childNodes,n=r.length;if(e===n)return this.appendChild(t);if(0>e||e>n)throw new Error("Index out of range.");
var i=t.parentNode;i&&i.removeChild(t);var o=e+1;o<this._firstDirtyChildIndex&&(this._firstDirtyChildIndex=o);
var a=r[e];t.parentNode=this,t.nextSibling=a,t._childIndex=e;var s=t.previousSibling=a.previousSibling;
return a.previousSibling=t,s?s.nextSibling=t:(a===this.lastChild&&(this.lastChild=t),this.firstChild=t),r.splice(e,0,t),this._childAdded(t,e),t
},m.Dom.Node.prototype.removeAt=function(t){var e=this.childNodes,r=e.length;if(!(0>t||t>=r)){var n=e[t];
e.splice(t,1),r-1>t&&t<this._firstDirtyChildIndex&&(this._firstDirtyChildIndex=t);
var i=n.previousSibling,o=n.nextSibling;return i?i.nextSibling=o:this.firstChild=o,o?o.previousSibling=i:this.lastChild=i,n.nextSibling=n.previousSibling=n.parentNode=null,this._childRemoved(n,t),n
}},m.Dom.Node.prototype.replaceChild=function(t,e){var r=this.findChildIndex(e),n=t.parentNode;
n&&n.removeChild(t),t.parentNode=this,t.nextSibling=e.nextSibling,t._childIndex=e._childIndex;
var i=t.previousSibling=e.previousSibling;i?i.nextSibling=t:this.firstChild=t;var o=e.nextSibling;
return o?o.previousSibling=t:this.lastChild=t,this.childNodes[r]=t,this._childRemoved(e,r),this._childAdded(t,r),e
},m.Dom.Node.prototype.childIndex=function(t){var e=this.parentNode;if(e){var r=e._firstDirtyChildIndex;
if(1/0>r){var n=e.childNodes;if(!t)return n.indexOf(this);for(var i=n.length;i>r;)n[r]._childIndex=r,r++;
e._firstDirtyChildIndex=1/0}return this._childIndex}return-1},m.Dom.Node.prototype.visitBefore=function(t){function e(r,n){t(r,n);
for(var i=r.firstChild;i;i=i.nextSibling)e(i,n+1)}e(this,0)},m.Dom.Node.prototype.visitAfter=function(t){function e(r,n){for(var i=r.firstChild;i;i=i.nextSibling)e(i,n+1);
t(r,n)}e(this,0)},m.Dom.Node.prototype.sort=function(t){if(this.firstChild){this._firstDirtyChildIndex=1/0;
var e=this.childNodes;e.sort(t);var r,n=this.firstChild=e[0];delete n.previousSibling,n._childIndex=0;
for(var i=1,o=e.length;o>i;i++)n.sort(t),r=e[i],r._childIndex=i,r.previousSibling=n,n=n.nextSibling=r;
this.lastChild=n,delete n.nextSibling,n.sort(t)}return this},m.Dom.Node.prototype.reverse=function(){var t=[];
return this.visitAfter(function(e){this._firstDirtyChildIndex=1/0;for(var r;r=e.lastChild;)t.push(e.removeChild(r));
if(t.length)for(;r=t.pop();)e.insertBefore(r,e.firstChild)}),this},m.Dom.Node.prototype.nodes=function(){var t=[];
return this.visitBefore(function(e){t.push(e)}),t},m.Dom.Node.prototype.toggle=function(t){if(t)return this.toggled?this.visitBefore(function(t){t.toggled&&t.toggle()
}):this.visitAfter(function(t){t.toggled||t.toggle()});var e,r=this;if(r.toggled){for(;e=r.toggled.pop();)r.appendChild(e);
delete r.toggled}else if(e=r.lastChild){r.toggled=[];do r.toggled.push(r.removeChild(e));
while(e=r.lastChild)}},m.nodes=function(t){for(var e=new m.Dom.Node,r=0,n=t.length;n>r;r++)e.appendChild(new m.Dom.Node(t[r]));
return e.nodes()},m.tree=function(t){return new m.Tree(t)},m.Tree=function(t){this.array=t
},m.Tree.prototype.keys=function(t){return this.k=t,this},m.Tree.prototype.value=function(t){return this.v=t,this
},m.Tree.prototype.map=function(){for(var t={},e={},r=0;r<this.array.length;r++){e.index=r;
for(var n=this.array[r],i=this.k.call(e,n),o=t,a=0;a<i.length-1;a++)o=o[i[a]]||(o[i[a]]={});
o[i[a]]=this.v?this.v.call(e,n):n}return t},m.nest=function(t){return new m.Nest(t)
},m.Nest=function(t){this.array=t,this.keys=[]},m.Nest.prototype.key=function(t){return this.keys.push(t),this
},m.Nest.prototype.sortKeys=function(t){return this.keys[this.keys.length-1].order=t||m.naturalOrder,this
},m.Nest.prototype.sortValues=function(t){return this.order=t||m.naturalOrder,this
},m.Nest.prototype.map=function(){for(var t,e={},r=[],n=0;n<this.array.length;n++){var i=this.array[n],o=e;
for(t=0;t<this.keys.length-1;t++){var a=this.keys[t](i);o[a]||(o[a]={}),o=o[a]}if(a=this.keys[t](i),!o[a]){var s=[];
r.push(s),o[a]=s}o[a].push(i)}if(this.order)for(var t=0;t<r.length;t++)r[t].sort(this.order);
return e},m.Nest.prototype.entries=function(){function t(e){var r=[];for(var n in e){var i=e[n];
r.push({key:n,values:i instanceof Array?i:t(i)})}return r}function e(t,r){var n=this.keys[r].order;
if(n&&t.sort(function(t,e){return n(t.key,e.key)}),++r<this.keys.length)for(var i=0;i<t.length;i++)e.call(this,t[i].values,r);
return t}return e.call(this,t(this.map()),0)},m.Nest.prototype.rollup=function(t){function e(r){for(var n in r){var i=r[n];
i instanceof Array?r[n]=t(i):e(i)}return r}return e(this.map())},m.flatten=function(t){return new m.Flatten(t)
},m.Flatten=function(t){this.map=t,this.keys=[]},m.Flatten.prototype.key=function(t,e){return this.keys.push({name:t,value:e}),delete this.$leaf,this
},m.Flatten.prototype.leaf=function(t){return this.keys.length=0,this.$leaf=t,this
},m.Flatten.prototype.array=function(){function t(e,i){if(o(e))r.push({keys:n.slice(),value:e});
else for(var a in e)n.push(a),t(e[a],i+1),n.pop()}function e(t,o){if(o<i.length-1)for(var a in t)n.push(a),e(t[a],o+1),n.pop();
else r.push(n.concat(t))}var r=[],n=[],i=this.keys,o=this.$leaf;return o?(t(this.map,0),r):(e(this.map,0),r.map(function(t){for(var e={},r=0;r<i.length;r++){var n=i[r],o=t[r];
e[n.name]=n.value?n.value.call(null,o):o}return e}))},m.Transform=function(){},m.Transform.prototype={k:1,x:0,y:0},m.Transform.identity=new m.Transform,m.Transform.prototype.translate=function(t,e){var r=new m.Transform;
return r.k=this.k,r.x=this.k*t+this.x,r.y=this.k*e+this.y,r},m.Transform.prototype.scale=function(t){var e=new m.Transform;
return e.k=this.k*t,e.x=this.x,e.y=this.y,e},m.Transform.prototype.invert=function(){var t=new m.Transform,e=1/this.k;
return t.k=e,t.x=-this.x*e,t.y=-this.y*e,t},m.Transform.prototype.times=function(t){var e=new m.Transform;
return e.k=this.k*t.k,e.x=this.k*t.x+this.x,e.y=this.k*t.y+this.y,e},m.Scale=function(){},m.Scale.interpolator=function(t,e){if("number"==typeof t)return function(r){return r*(e-t)+t
};var r=t.type&&"solid"!==t.type,n=e.type&&"solid"!==e.type;return r||n?(t=r?t:m.color(t).rgb(),e=n?e:m.color(e).rgb(),function(r){return.5>r?t:e
}):(t=m.color(t).rgb(),e=m.color(e).rgb(),function(r){var n=t.a*(1-r)+e.a*r;return 1e-5>n&&(n=0),0==t.a?m.rgb(e.r,e.g,e.b,n):0==e.a?m.rgb(t.r,t.g,t.b,n):m.rgb(Math.round(t.r*(1-r)+e.r*r),Math.round(t.g*(1-r)+e.g*r),Math.round(t.b*(1-r)+e.b*r),n)
})},m.Scale.common={by:function(t){function e(){return r(t.apply(this,arguments))
}var r=this;for(var n in r)e[n]=r[n];return e},by1:function(t){function e(e){return r(t.call(this,e))
}var r=this;for(var n in r)e[n]=r[n];return e},transform:function(t){function e(){return t.call(this,r.apply(r,arguments))
}var r=this;for(var n in r)e[n]=r[n];return e}},m.Scale.quantitative=function(){function e(t){var e=m.search(s,t);
return 0>e&&(e=-e-2),e=Math.max(0,Math.min(h.length-1,e)),h[e]((d(t)-l[e])/(l[e+1]-l[e]))
}var r,n,a,s=[0,1],l=[0,1],u=[0,1],h=[m.identity],p=Number,f=!1,d=m.identity,y=m.identity,g=null,v=0;
return e.transform=function(t,e){return d=function(e){return f?-t(-e):t(e)},y=function(t){return f?-e(-t):e(t)
},l=s.map(d),this},e.domain=function(t,e,r){if(arguments.length){var n;return t instanceof Array?(arguments.length<2&&(e=m.identity),arguments.length<3&&(r=e),n=t.length&&e(t[0]),s=t.length?[m.min(t,e),m.max(t,r)]:[]):(n=t,s=Array.prototype.slice.call(arguments).map(Number)),s.length?1==s.length&&(s=[s[0],s[0]]):s=[-1/0,1/0],f=(s[0]||s[s.length-1])<0,l=s.map(d),p=n instanceof Date?i:Number,this
}return s.map(p)},e.range=function(){if(arguments.length){u=Array.prototype.slice.call(arguments),u.length?1==u.length&&(u=[u[0],u[0]]):u=[-1/0,1/0],h=[];
for(var t=0;t<u.length-1;t++)h.push(m.Scale.interpolator(u[t],u[t+1]));return this
}return u},e.invert=function(t){var e=m.search(u,t);return 0>e&&(e=-e-2),e=Math.max(0,Math.min(h.length-1,e)),p(y(l[e]+(t-u[e])/(u[e+1]-u[e])*(l[e+1]-l[e])))
},e.ticks=function(e,l){var u=s[0],h=s[s.length-1],c=u>h,f=c?h:u,d=c?u:h;return a=p===i?o(e,f,d,n,r,v,l):t(e,f,d,l),c?a.reverse():a
},e.dateTickFormat=function(){return arguments.length?(r=arguments[0],this):r},e.dateTickPrecision=function(){return arguments.length?(n=c(arguments[0],0),this):n
},e.dateTickWeekStart=function(t){if(arguments.length){switch((""+t).toLowerCase()){case"0":case"sunday":v=0;
break;case"1":case"monday":v=1;break;case"2":case"tuesday":v=2;break;case"3":case"wednesday":v=3;
break;case"4":case"thursday":v=4;break;case"5":case"friday":v=5;break;case"6":case"saturday":v=6;
break;default:v=0}return this}return v},e.tickFormatter=function(t){return arguments.length?(g=t,this):g
},e.tickFormat=function(t,e){var r;if(g){a||(a=[],a.step=a.base=a.mult=1,a.decPlaces=0,a.format=String);
var n=p!==Number?a.step:a.decPlaces;r=g.call(a,t,n,null!=e?e:-1)}else r=a?a.format(t):String(t);
return r},e.nice=function(){if(2!=s.length)return this;var t=s[0],e=s[s.length-1],r=t>e,n=r?e:t,i=r?t:e,o=i-n;
if(!o||!isFinite(o))return this;var a=Math.pow(10,Math.round(Math.log(o)/Math.log(10))-1);
return s=[Math.floor(n/a)*a,Math.ceil(i/a)*a],r&&s.reverse(),l=s.map(d),this},m.copyOwn(e,m.Scale.common),e.domain.apply(e,arguments),e
};var v=["get","set","multiple","multiples","thresholds","closeds","castValue"];l.prototype.increment=function(t,e){null==e&&(e=1),1!==this.mult&&(e*=this.mult),this.set(t,this.get(t)+e)
},l.prototype.get=function(t){return t.getMilliseconds()},l.prototype.set=function(t,e){t.setMilliseconds(e)
},l.prototype.floorLocal=function(){},l.prototype.floor=function(t,e){var r=0;1!==this.mult&&(this.floorLocal(t,e),r=this.base);
for(var n=this.prev;n;)1===n.mult&&n.value!==r&&n.clear(t,e),n=n.prev},l.prototype.floorMultiple=function(t,e,r){var n=this.first(t,r),i=this.get(t)-n;
if(i){var o=e*this.mult,a=Math.floor(i/o)*o;this.set(t,n+a)}},l.prototype.clear=function(t,e){this.set(t,this.first(t,e))
},l.prototype.multiple=function(t){for(var e=this.multiples,r=this.thresholds,n=this.closeds,i=e.length,o=-1;++o<i;)if(n[o]?t<=r[o]:t<r[o])return e[o];
throw new Error("Invalid configuration.")},l.prototype.resultAbove=function(t){return this.castValue(this.value*t+.1,!0)
},l.prototype.castValue=function(t,e){var r=this.multiples;if(!r)return this._castValueResult(1,t,1);
var n,i=t/this.value,o=r.length;if(e){for(n=-1;++n<o;)if(i<=r[n])return this._castValueResult(r[n],t,0);
return this.next?this.next.castValue(t,e):this._castValueResult(r[o-1],t,1)}for(n=o;n--;)if(r[n]<=i)return this._castValueResult(r[n],t,0);
return this.prev?this.prev.castValue(t,e):this._castValueResult(r[0],t,-1)},l.prototype._castValueResult=function(t,e,r){return{comp:this,mult:t,value:this.value*t,source:e,overflow:r}
},l.prototype.withPrecision=function(t){var e=this;return this.value!==t&&(e=new l(t,null,{mult:t,format:this.format})),e
},l.prototype.ticks=function(t,e,r,n){var i=[],o=new Date(t);if(this.floor(o,n),r>1&&this.floorMultiple(o,r,n),m.get(n,"roundInside",1)){t!==+o&&this.increment(o,r);
do i.push(new Date(o)),this.increment(o,r);while(e>=o)}else{i.push(new Date(o));do this.increment(o,r),i.push(new Date(o));
while(e>o)}return i};var x=[];return f(1,{format:"%S.%Qs",multiples:[1,5,25,50,100,250],thresholds:[10,50,100,200,1e3,1/0],closeds:[1,1,1,1,1,1]}),f(1e3,{get:function(t){return t.getSeconds()
},set:function(t,e){t.setSeconds(e)},format:"%I:%M:%S",multiples:[1,5,10,15],thresholds:[10,60,90,1/0],closeds:[1,1,1,1]}),f(6e4,{get:function(t){return t.getMinutes()
},set:function(t,e){t.setMinutes(e)},format:"%I:%M %p",multiples:[1,5,10,15],thresholds:[10,15,30,1/0],closeds:[1,1,1,1]}),f(36e5,{get:function(t){return t.getHours()
},set:function(t,e){t.setHours(e)},format:"%I:%M %p",multiples:[1,3,6],thresholds:[10,20,1/0],closeds:[1,1,1]}),f(864e5,{get:function(t){return t.getDate()
},set:function(t,e){t.setDate(e)},format:"%m/%d",first:1,multiples:[1,2,3,5],thresholds:[10,15,30,1/0],closeds:[1,0,0,1]}),f(6048e5,{get:function(t){return t.getDate()
},set:function(t,e){t.setDate(e)},mult:7,floor:function(t,e){var r=t.getDay()-m.get(e,"weekStart",0);
0!==r&&(0>r&&(r+=7),this.set(t,this.get(t)-r))},first:function(t,e){return this.get(h(t,m.get(e,"weekStart",0)))
},format:"%m/%d",multiples:[1,2,3],thresholds:[10,15,1/0],closeds:[1,1,1]}),f(2592e6,{get:function(t){return t.getMonth()
},set:function(t,e){t.setMonth(e)},format:"%m/%Y",multiples:[1,2,3],thresholds:[12,24,1/0],closeds:[1,1,1]}),f(31536e6,{get:function(t){return t.getFullYear()
},set:function(t,e){t.setFullYear(e)},format:"%Y",multiple:function(t){if(10>=t)return 1;
var e=m.logCeil(t/15,10);return 2>t/e?e/=5:5>t/e&&(e/=2),e},castValue:function(t,e){var r,n,i=t/this.value;
if(1>i){if(!e)return this.prev?this.prev.castValue(t,e):this._castValueResult(1,t,-1);
r=1}else r=m.logFloor(i,10);if(n=i/r,e)n>5?(r*=10,n=1):n=n>2?5:n>1?2:1;else if(n>5)n=5;
else if(n>2)n=2;else if(n>1)n=1;else if(1>n)return this.prev?this.prev.castValue(t,e):this._castValueResult(r,t,-1);
return this._castValueResult(r*n,t,0)}}),m.Scale.linear=function(){var t=m.Scale.quantitative();
return t.domain.apply(t,arguments),t},m.Scale.log=function(){var t,e,r=m.Scale.quantitative(1,10),n=function(t){return Math.log(t)/e
},i=function(e){return Math.pow(t,e)};return r.ticks=function(){var e=r.domain(),o=e[0]<0,a=Math.floor(o?-n(-e[0]):n(e[0])),s=Math.ceil(o?-n(-e[1]):n(e[1])),l=[];
if(o)for(l.push(-i(-a));a++<s;)for(var u=t-1;u>0;u--)l.push(-i(-a)*u);else{for(;s>a;a++)for(var u=1;t>u;u++)l.push(i(a)*u);
l.push(i(a))}for(a=0;l[a]<e[0];a++);for(s=l.length;l[s-1]>e[1];s--);return l.slice(a,s)
},r.tickFormat=function(t){return t.toPrecision(1)},r.nice=function(){var e=r.domain();
return r.domain(m.logFloor(e[0],t),m.logCeil(e[1],t))},r.base=function(o){return arguments.length?(t=Number(o),e=Math.log(t),r.transform(n,i),this):t
},r.domain.apply(r,arguments),r.base(10)},m.Scale.root=function(){var t=m.Scale.quantitative();
return t.power=function(e){if(arguments.length){var r=Number(e),n=1/r;return t.transform(function(t){return Math.pow(t,n)
},function(t){return Math.pow(t,r)}),this}return r},t.domain.apply(t,arguments),t.power(2)
},m.Scale.ordinal=function(){function t(t){return t in r||(r[t]=e.push(t)-1),n[r[t]%n.length]
}var e=[],r={},n=[];return t.domain=function(t,n){if(arguments.length){t=t instanceof Array?arguments.length>1?m.map(t,n):t:Array.prototype.slice.call(arguments),e=[];
for(var i={},o=0;o<t.length;o++){var a=t[o];a in i||(i[a]=!0,e.push(a))}return r=m.numerate(e),this
}return e},t.range=function(t,e){return arguments.length?(n=t instanceof Array?arguments.length>1?m.map(t,e):t:Array.prototype.slice.call(arguments),"string"==typeof n[0]&&(n=n.map(m.fillStyle)),n.min=n[0],n.max=n[n.length-1],this):n
},t.split=function(t,e){var r=e-t,i=this.domain().length,o=0;return 0===r?n=m.array(i,t):i&&(o=(e-t)/i,n=m.range(t+o/2,e,o)),n.min=t,n.max=e,n.step=o,this
},t.splitBandedCenter=function(t,e,r){return null==r&&(r=1),this._splitBandedCore(t,e,function(t){var e=t.range/t.count;
t.step=e,t.band=e*r,t.offset=e/2})},t.splitBandedCenterAbs=function(t,e,r,n){return this._splitBandedCore(t,e,function(t){var e;
null==r||null==n?(e=t.range/t.count,null==r?null==n?(r=e,n=0):(n=Math.min(n,e),r=e-n):(r=Math.min(r,e),n=e-r)):e=r+n,t.step=e,t.band=r,t.offset=e/2
})},t._splitBandedCore=function(t,e,r){var i,o={min:t,max:e,range:e-t,count:this.domain().length,offset:0,step:0,band:0};
return 0===o.range?(n=m.array(o.count,t),i=0):o.count&&(r(o),i=o.step-o.band,n=m.range(t+o.offset,e,o.step)),n.offset=o.offset,n.step=o.step,n.band=o.band,n.margin=i,n.min=t,n.max=e,this
},t.splitBandedFlushCenter=function(t,e,r){return null==r&&(r=1),this._splitBandedCore(t,e,function(t){var e=t.range,n=t.count,i=e*r/n,o=n>1?(e-n*i)/(n-1):0;
t.band=i,t.step=o+i,t.offset=i/2})},t.splitFlush=function(t,e){var r=this.domain().length,i=(e-t)/(r-1);
return n=1==r?[(t+e)/2]:m.range(t,e+i/2,i),n.min=t,n.max=e,this},t.splitBanded=function(t,e,r){if(arguments.length<3&&(r=1),0>r){var i=this.domain().length,o=-r*i,a=e-t-o,s=a/(i+1);
n=m.range(t+s,e,s-r),n.band=-r}else{var l=(e-t)/(this.domain().length+(1-r));n=m.range(t+l*(1-r),e,l),n.band=l*r,n.step=l,n.margin=l-n.band
}return n.min=t,n.max=e,this},t.invertIndex=function(t,e){var r=this.domain().length;
if(0===r)return-1;var n=this.range(),i=n.max-n.min;if(0===i)return 0;var o=i/r;if(t>=n.max)return r;
if(t<n.min)return 0;var a=(t-n.min)/o;return e?a:Math.round(a)},m.copyOwn(t,m.Scale.common),t.domain.apply(t,arguments),t
},m.Scale.quantile=function(){function t(t){return o(Math.max(0,Math.min(r,m.search.index(n,t)-1))/r)
}var e=-1,r=-1,n=[],i=[],o=m.Scale.linear();return t.quantiles=function(t){if(arguments.length){if(e=Number(t),0>e)n=[i[0]].concat(i),r=i.length-1;
else{n=[],n[0]=i[0];for(var o=1;e>=o;o++)n[o]=i[~~(o*(i.length-1)/e)];r=e-1}return this
}return n},t.domain=function(r,n){return arguments.length?(i=r instanceof Array?m.map(r,n):Array.prototype.slice.call(arguments),i.sort(m.naturalOrder),t.quantiles(e),this):i
},t.range=function(){return arguments.length?(o.range.apply(o,arguments),this):o.range()
},m.copyOwn(t,m.Scale.common),t.domain.apply(t,arguments),t},m.histogram=function(t,e){var r=!0;
return{bins:function(n){var i=m.map(t,e),o=[];arguments.length||(n=m.Scale.linear(i).ticks());
for(var a=0;a<n.length-1;a++){var s=o[a]=[];s.x=n[a],s.dx=n[a+1]-n[a],s.y=0}for(var a=0;a<i.length;a++){var l=m.search.index(n,i[a])-1,s=o[Math.max(0,Math.min(o.length-1,l))];
s.y++,s.push(t[a])}if(!r)for(var a=0;a<o.length;a++)o[a].y/=i.length;return o},frequency:function(t){return arguments.length?(r=Boolean(t),this):r
}}},!function(){m.Shape=function(){};var t={x:1,y:1};m.Shape.dist2=function(e,r,n){n=n||t;
var i=e.x-r.x,o=e.y-r.y,a=i*i,s=o*o;return{cost:a+s,dist2:n.x*a+n.y*s}};var e=Math.PI,r=2*e,n=Math.atan2;
m.Shape.normalizeAngle=function(t){return t%=r,m.floatLess(t,0)&&(t+=r),t},m.Shape.atan2Norm=function(t,e){var i=n(t,e);
return m.floatLess(i,0)&&(i+=r),i},m.Shape.prototype.hasArea=function(){return!0},m.Shape.prototype.bbox=function(){return this._bbox||(this._bbox=this._calcBBox())
},m.Shape.prototype._calcBBox=function(){var t,e,r,n;return this.points().forEach(function(i){var o=i.x,a=i.y;
null==t?(t=r=o,e=n=a):(t>o?t=o:o>r&&(r=o),e>a?e=a:a>n&&(n=a))}),null!=t?new m.Shape.Rect(t,e,r-t,n-e):void 0
},m.Shape.prototype.containsPoint=function(t,e){if(e){var r;if(!e.y)return r=this.bbox(),m.floatBelongsClosed(r.x,t.x,r.x2);
if(!e.x)return r=this.bbox(),m.floatBelongsClosed(r.y,t.y,r.y2)}return this._containsPointCore(t)
},m.Shape.prototype._containsPointCore=function(){return!1}}(),!function(){var t=m.Shape.dist2,e=Math.cos,r=Math.sin,n=Math.sqrt;
m.vector=function(t,e){return new i(t,e)},m.Vector=function(t,e){this.x=t,this.y=e
};var i=m.Shape.Point=m.Vector;m.Vector.prototype=m.extend(m.Shape),m.Vector.prototype.perp=function(){return new i(-this.y,this.x)
},m.Vector.prototype.rotate=function(t){var n=e(t),o=r(t);return new i(n*this.x-o*this.y,o*this.x+n*this.y)
},m.Vector.prototype.norm=function(){var t=this.length();return this.times(t?1/t:1)
},m.Vector.prototype.length=function(){return n(this.x*this.x+this.y*this.y)},m.Vector.prototype.times=function(t){return new i(this.x*t,this.y*t)
},m.Vector.prototype.plus=function(t,e){return 1===arguments.length?new i(this.x+t.x,this.y+t.y):new i(this.x+t,this.y+e)
},m.Vector.prototype.minus=function(t,e){return 1===arguments.length?new i(this.x-t.x,this.y-t.y):new i(this.x-t,this.y-e)
},m.Vector.prototype.dot=function(t,e){return 1==arguments.length?this.x*t.x+this.y*t.y:this.x*t+this.y*e
},m.Vector.prototype.hasArea=function(){return!1},m.Vector.prototype.clone=function(){return new i(this.x,this.y)
},m.Vector.prototype.apply=function(t){return new i(t.x+t.k*this.x,t.y+t.k*this.y)
},m.Vector.prototype.intersectsRect=function(t){return m.floatBelongsClosed(t.x,this.x,t.x2)&&m.floatBelongsClosed(t.y,this.y,t.y2)
},m.Vector.prototype._containsPointCore=function(t){return this.x===t.x&&this.y===t.y
},m.Vector.prototype.points=function(){return[this]},m.Vector.prototype.edges=function(){return[]
},m.Vector.prototype.center=function(){return this},m.Vector.prototype.distance2=function(e,r){return t(this,e,r)
}}(),!function(){var t=m.Shape.Point,e=m.Shape.dist2;m.Shape.Line=function(t,e,r,n){this.x=t||0,this.y=e||0,this.x2=r||0,this.y2=n||0
};var r=m.Shape.Line;r.prototype=m.extend(m.Shape),r.prototype.hasArea=function(){return!1
},r.prototype.clone=function(){return new r(this.x,this.y,this.x2,this.x2)},r.prototype.apply=function(t){var e=t.x+t.k*this.x,n=t.y+t.k*this.y,i=t.x+t.k*this.x2,o=t.y+t.k*this.y2;
return new r(e,n,i,o)},r.prototype.points=function(){return[new t(this.x,this.y),new t(this.x2,this.y2)]
},r.prototype.edges=function(){return[this]},r.prototype.center=function(){return new t((this.x+this.x2)/2,(this.y+this.y2)/2)
},r.prototype.normal=function(t,e){var r=this.points(),n=r[1].minus(r[0]).perp().norm();
if(e){var i=r[0].minus(e);i.dot(n)<0&&(n=n.times(-1))}return n},r.prototype.intersectsRect=function(t){var e,r,n=this.points();
for(r=n.length,e=0;r>e;e++)if(n[e].intersectsRect(t))return!0;var i=t.edges();for(r=i.length,e=0;r>e;e++)if(this.intersectsLine(i[e]))return!0;
return!1},r.prototype._containsPointCore=function(t){var e=this.x,r=this.x2,n=this.y,i=this.y2;
return m.floatBelongsClosed(e,t.x,r)&&(m.floatEqual(e,r)?m.floatBelongsClosed(Math.min(n,i),t.y,Math.max(n,i)):m.floatZero((i-n)/(r-e)*(t.x-e)+n-t.y))
},r.prototype.intersectsLine=function(t){var e=this,r=e.x2-e.x,n=e.y2-e.y,i=t.x2-t.x,o=t.y2-t.y,a=o*r-i*n;
if(m.floatZero(a))return!1;var s=e.y-t.y,l=e.x-t.x,u=i*s-o*l,h=r*s-n*l;if(m.floatZero(a))return m.floatZero(u)&&m.floatZero(h);
var c=u/a;if(!m.floatBelongsClosed(0,c,1))return!1;var p=h/a;return m.floatBelongsClosed(0,p,1)?!0:!1
},r.prototype.distance2=function(t,r){var n=this,i={x:this.x2,y:this.y2},o=e(n,i).cost;
if(m.floatZero(o))return e(t,n,r);var a=i.x-n.x,s=i.y-n.y,l=((t.x-n.x)*a+(t.y-n.y)*s)/o;
if(m.floatLess(l,0))return e(t,n,r);if(m.floatGreater(l,1))return e(t,i,r);var u={x:n.x+l*a,y:n.y+l*s};
return e(t,u,r)}}(),!function(){var t=m.Shape.Point,e=m.Shape.Line;m.Shape.Polygon=function(t){this._points=t||[]
};var r=m.Shape.Polygon;r.prototype=m.extend(m.Shape),r.prototype.points=function(){return this._points
},r.prototype.clone=function(){return new r(this.points().slice())},r.prototype.apply=function(t){for(var e=this.points(),n=e.length,i=new Array(n),o=0;n>o;o++)i[o]=e[o].apply(t);
return new r(i)},r.prototype.intersectsRect=function(t){var e,r,n=this.points();for(r=n.length,e=0;r>e;e++)if(n[e].intersectsRect(t))return!0;
var i=this.edges();for(r=i.length,e=0;r>e;e++)if(i[e].intersectsRect(t))return!0;
return!1},r.prototype.edges=function(){var t=this._edges;if(!t){t=this._edges=[];
var r=this.points(),n=r.length;if(n){for(var i,o=r[0],a=o,s=1;n>s;s++)i=r[s],t.push(new e(o.x,o.y,i.x,i.y)),o=i;
n>2&&t.push(new e(i.x,i.y,a.x,a.y))}}return t},r.prototype.distance2=function(t,e){var r={cost:1/0,dist2:1/0};
return this.edges().forEach(function(n){var i=n.distance2(t,e);m.floatLess(i.cost,r.cost)&&(r=i)
},this),r},r.prototype.center=function(){for(var e=this.points(),r=0,n=0,i=0,o=e.length;o>i;i++){var a=e[i];
r+=a.x,n+=a.y}return new t(r/o,n/o)},r.prototype._containsPointCore=function(t){var r=this.bbox();
if(!r._containsPointCore(t))return!1;var n=.01*r.dx,i=new e(r.x-n,t.y,t.x,t.y),o=0,a=this.edges();
return a.forEach(function(t){t.intersectsLine(i)&&o++}),1===(1&o)}}(),!function(){var t=m.Shape.Point,e=m.Shape.Line;
m.Shape.Rect=function(t,e,r,n){this.x=t||0,this.y=e||0,this.dx=r||0,this.dy=n||0,this.dx<0&&(this.dx=Math.max(0,-this.dx),this.x=this.x-this.dx),this.dy<0&&(this.dy=Math.max(0,-this.dy),this.y=this.y-this.dy),this.x2=this.x+this.dx,this.y2=this.y+this.dy
};var r=m.Shape.Rect;r.prototype=m.extend(m.Shape.Polygon),r.prototype.clone=function(){var t=Object.create(r.prototype);
return t.x=this.x,t.y=this.y,t.dx=this.dx,t.dy=this.dy,t.x2=this.x2,t.y2=this.y2,t
},r.prototype.apply=function(t){var e=t.x+t.k*this.x,n=t.y+t.k*this.y,i=t.k*this.dx,o=t.k*this.dy;
return new r(e,n,i,o)},r.prototype._containsPointCore=function(t){return m.floatBelongsClosed(this.x,t.x,this.x2)&&m.floatBelongsClosed(this.y,t.y,this.y2)
},r.prototype.intersectsRect=function(t){return m.floatGreater(this.x2,t.x)&&m.floatLess(this.x,t.x2)&&m.floatGreater(this.y2,t.y)&&m.floatLess(this.y,t.y2)
},r.prototype.edges=function(){if(!this._edges){var t=this.x,r=this.y,n=this.x2,i=this.y2;
this._edges=[new e(t,r,n,r),new e(n,r,n,i),new e(n,i,t,i),new e(t,i,t,r)]}return this._edges
},r.prototype.center=function(){return new t(this.x+this.dx/2,this.y+this.dy/2)},r.prototype.points=function(){var e=this._points;
if(!e){var r=this.x,n=this.y,i=this.x2,o=this.y2;e=this._points=[new t(r,n),new t(i,n),new t(i,o),new t(r,o)]
}return e},r.prototype._calcBBox=function(){return this}}(),!function(){var t=m.Shape.Point,e=m.Shape.dist2,r=Math.sqrt,n=Math.abs,i=Math.pow;
m.Shape.Circle=function(t,e,r){this.x=t||0,this.y=e||0,this.radius=r||0};var o=m.Shape.Circle;
o.prototype=m.extend(m.Shape),o.prototype.clone=function(){return new o(this.x,this.y,this.radius)
},o.prototype.apply=function(t){var e=t.x+t.k*this.x,r=t.y+t.k*this.y,n=t.k*this.radius;
return new o(e,r,n)},o.prototype.intersectsRect=function(t){var e=t.dx/2,r=t.dy/2,o=this.radius,a=n(this.x-t.x-e),s=n(this.y-t.y-r);
if(a>e+o||s>r+o)return!1;if(e>=a||r>=s)return!0;var l=i(a-e,2)+i(s-r,2);return o*o>=l
},o.prototype.intersectLine=function(e,n){var i=e.x2-e.x,o=e.y2-e.y,a=this.x-e.x,s=this.y-e.y,l=i*i+o*o,u=i*a+o*s,h=this.radius,c=a*a+s*s-h*h,p=u/l,f=p*p-c/l;
if(!(0>f)){var d=r(f),y=p-d,g=p+d,m=[];return(n||y>=0&&1>=y)&&m.push(new t(e.x+i*y,e.y+o*y)),0!==f&&(n||g>=0&&1>=g)&&m.push(new t(e.x+i*g,e.y+o*g)),m
}},o.prototype.points=function(){return[this.center()]},o.prototype.center=function(){return new t(this.x,this.y)
},o.prototype.normal=function(t){return t.minus(this.x,this.y).norm()},o.prototype._containsPointCore=function(t){var e=t.x-this.x,r=t.y-this.y,n=this.radius;
return n*n>=e*e+r*r},o.prototype.distance2=function(t,r){var n=this.radius,i=t.minus(this).norm().times(n).plus(this),o=e(t,i,r);
return o},o.prototype._calcBBox=function(){var t=this.radius,e=2*t;return new m.Shape.Rect(this.x-t,this.y-t,e,e)
}}(),!function(){var t=m.Shape.Point,e=m.Shape.dist2,r=m.Shape.normalizeAngle,n=m.Shape.atan2Norm,i=Math.cos,o=Math.sin,a=Math.sqrt,s=Math.PI,l=2*s,u=s/2,h=3*s/2;
m.Shape.Arc=function(t,e,n,i,o){this.x=t,this.y=e,this.radius=n,m.floatBelongsClosed(0,o,l)||(o=r(o)),this.startAngle=r(i),this.angleSpan=o,this.endAngle=this.startAngle+this.angleSpan
};var c=m.Shape.Arc;c.prototype=m.extend(m.Shape),c.prototype.hasArea=function(){return!1
},c.prototype.clone=function(){var t=Object.create(c.prototype),e=this;return t.x=e.x,t.y=e.y,t.radius=e.radius,t.startAngle=e.startAngle,t.angleSpan=e.angleSpan,t.endAngle=e.endAngle,t
},c.prototype.apply=function(t){var e=t.x+t.k*this.x,r=t.y+t.k*this.y,n=t.k*this.radius;
return new c(e,r,n,this.startAngle,this.angleSpan)},c.prototype.containsAngle=function(t,e){m.floatBelongsClosed(0,t,l)||(t=r(t));
var n=this.startAngle,i=this.endAngle;return(e?m.floatBelongsOpen(n,t,i):m.floatBelongsClosed(n,t,i))?!0:m.floatLessOrEqual(i,l)?!1:(t+=l,e?m.floatBelongsOpen(n,t,i):m.floatBelongsClosed(n,t,i))
},c.prototype._containsPointCore=function(t){var e=t.x-this.x,r=t.y-this.y,i=a(e*e+r*r);
return m.floatEqual(i,this.radius)&&this.containsAngle(n(r,e))},c.prototype.intersectsRect=function(t){var e,r=this.points(),n=r.length;
for(e=0;n>e;e++)if(r[e].intersectsRect(t))return!0;var i=t.edges();for(n=i.length,e=0;n>e;e++)if(this.intersectLine(i[e]))return!0;
return!1};var p=m.Shape.Circle.prototype.intersectLine;c.prototype.intersectLine=function(t,e){var r=p.call(this,t,e);
return r&&(r=r.filter(function(t){return this._containsPointCore(t)},this),r.length)?r:void 0
},c.prototype.points=function(){function e(e){r.containsAngle(e,!0)&&f.push(new t(n+l*i(e),a+l*o(e)))
}var r=this,n=r.x,a=r.y,l=r.radius,c=r.startAngle,p=r.endAngle,f=[new t(n+l*i(c),a+l*o(c)),new t(n+l*i(p),a+l*o(p))];
return e(0),e(u),e(s),e(h),f},c.prototype.center=function(){var e=this.x,r=this.y,n=this.radius,a=(this.startAngle+this.endAngle)/2;
return new t(e+n*i(a),r+n*o(a))},c.prototype.normal=function(t,e){var r=t.minus(this.x,this.y).norm();
if(e){var n=this.center().minus(e);n.dot(r)<0&&(r=r.times(-1))}return r},c.prototype.distance2=function(r,a){var s=r.x-this.x,l=r.y-this.y,u=n(l,s);
if(this.containsAngle(u)){var h=new t(this.x+this.radius*i(u),this.y+this.radius*o(u));
return e(r,h,a)}var c=this.points(),p=e(r,c[0],a),f=e(r,c[1],a);return m.floatLess(p.cost,f.cost)?p:f
}}(),!function(){var t=m.Shape.Arc,e=m.Shape.Line,r=m.Shape.Point,n=Math.cos,i=Math.sin,o=Math.sqrt,a=Math.PI,s=2*a,l=a/2,u=3*a/2,h=m.Shape.atan2Norm,c=m.Shape.normalizeAngle;
m.Shape.Wedge=function(t,e,r,n,i,o){this.x=t,this.y=e,this.innerRadius=r,this.outerRadius=n,m.floatBelongsClosed(0,o,s)||(o=c(o)),this.startAngle=c(i),this.angleSpan=o,this.endAngle=this.startAngle+o
};var p=m.Shape.Wedge;p.prototype=m.extend(m.Shape),p.prototype.clone=function(){return new p(this.x,this.y,this.innerRadius,this.outerRadius,this.startAngle,this.angleSpan)
},p.prototype.apply=function(t){var e=t.x+t.k*this.x,r=t.y+t.k*this.y,n=t.k*this.innerRadius,i=t.k*this.outerRadius;
return new p(e,r,n,i,this.startAngle,this.angleSpan)},p.prototype.containsAngle=t.prototype.containsAngle,p.prototype._containsPointCore=function(t){var e=t.x-this.x,r=t.y-this.y,n=o(e*e+r*r);
return m.floatBelongsClosed(this.innerRadius,n,this.outerRadius)&&this.containsAngle(h(r,e))
},p.prototype.intersectsRect=function(t){var e,r,n,i;for(n=this.points(),r=n.length,e=0;r>e;e++)if(n[e].intersectsRect(t))return!0;
for(n=t.points(),r=n.length,e=0;r>e;e++)if(this._containsPointCore(n[e]))return!0;
for(i=this.edges(),r=i.length,e=0;r>e;e++)if(i[e].intersectsRect(t))return!0;return!1
},p.prototype.points=function(){return this._points||this.edges(),this._points},p.prototype.edges=function(){function o(t){s.containsAngle(t,!0)&&A.push(new r(f+v*n(t),d+v*i(t)))
}var s=this,h=s._edges;if(!h){var c,p,f=s.x,d=s.y,y=s.innerRadius,g=m.floatGreater(y,0),v=s.outerRadius,x=s.startAngle,b=s.endAngle,k=s.angleSpan,S=n(x),M=i(x),w=n(b),C=i(b);
g?(c=new r(f+y*S,d+y*M),p=new r(f+y*w,d+y*C)):c=p=new r(f,d);var L=new r(f+v*S,d+v*M),N=new r(f+v*w,d+v*C);
h=s._edges=[],g&&h.push(new t(f,d,y,x,k)),h.push(new e(c.x,c.y,L.x,L.y),new t(f,d,v,x,k),new e(p.x,p.y,N.x,N.y));
var A=s._points=[c,L,N];g&&A.push(p),o(0),o(l),o(a),o(u)}return h},p.prototype.distance2=function(t,e){var r={cost:1/0,dist2:1/0};
return this.edges().forEach(function(n){var i=n.distance2(t,e);m.floatLess(i.cost,r.cost)&&(r=i)
}),r},p.prototype.center=function(){var t=(this.startAngle+this.endAngle)/2,e=(this.innerRadius+this.outerRadius)/2;
return new r(this.x+e*n(t),this.y+e*i(t))}}(),!function(){var t=Math.round,e=function(e){var r=parseFloat(e);
return"%"==e[e.length-1]?t(2.55*r):r},r=/([a-z]+)\((.*)\)/i,n=function(t){if("#"===t.charAt(0)){var n,i,o;
return 4===t.length?(n=t.charAt(1),n+=n,i=t.charAt(2),i+=i,o=t.charAt(3),o+=o):7===t.length&&(n=t.substring(1,3),i=t.substring(3,5),o=t.substring(5,7)),m.rgb(parseInt(n,16),parseInt(i,16),parseInt(o,16),1)
}var a=r.exec(t);if(a){var s=a[2].split(","),l=1;switch(a[1]){case"hsla":case"rgba":if(l=parseFloat(s[3]),!l)return m.Color.transparent
}switch(a[1]){case"hsla":case"hsl":var u=parseFloat(s[0]),h=parseFloat(s[1])/100,c=parseFloat(s[2])/100;
return new m.Color.Hsl(u,h,c,l).rgb();case"rgba":case"rgb":var n=e(s[0]),i=e(s[1]),o=e(s[2]);
return m.rgb(n,i,o,l)}}return new m.Color(t,1)},i={};m.color=function(t){if(t.rgb)return t.rgb();
var e=m.Color.names[t];return e||(e=i[t]||(i[t]=n(t))),e}}(),m.Color=function(t,e){this.color=t,this.opacity=e,this.key="solid "+t+" alpha("+e+")"
},m.Color.prototype.hsl=function(){return this.rgb().hsl()},m.Color.prototype.brighter=function(t){return this.rgb().brighter(t)
},m.Color.prototype.darker=function(t){return this.rgb().darker(t)},m.Color.prototype.alphaBlend=function(t){var e=this.rgb(),r=e.a;
if(1===r)return this;t=t?m.color(t):m.Color.names.white,t=t.rgb();var n=1-r;return m.rgb(n*e.r+r*t.r,n*e.g+r*t.g,n*e.b+r*t.b,1)
},m.Color.prototype.rgbDecimal=function(t){var e=this.alphaBlend(t);return e.r<<16|e.g<<8|e.b
},m.Color.prototype.isDark=function(){return this.rgbDecimal()<8388607.5},m.rgb=function(t,e,r,n){return new m.Color.Rgb(t,e,r,4==arguments.length?n:1)
},m.Color.Rgb=function(t,e,r,n){m.Color.call(this,n?"rgb("+t+","+e+","+r+")":"none",n),this.r=t,this.g=e,this.b=r,this.a=n
},m.Color.Rgb.prototype=m.extend(m.Color),m.Color.Rgb.prototype.red=function(t){return m.rgb(t,this.g,this.b,this.a)
},m.Color.Rgb.prototype.green=function(t){return m.rgb(this.r,t,this.b,this.a)},m.Color.Rgb.prototype.blue=function(t){return m.rgb(this.r,this.g,t,this.a)
},m.Color.Rgb.prototype.alpha=function(t){return m.rgb(this.r,this.g,this.b,t)},m.Color.Rgb.prototype.rgb=function(){return this
},m.Color.Rgb.prototype.brighter=function(t){t=Math.pow(.7,null!=t?t:1);var e=this.r,r=this.g,n=this.b,i=30;
return e||r||n?(e&&i>e&&(e=i),r&&i>r&&(r=i),n&&i>n&&(n=i),m.rgb(Math.min(255,Math.floor(e/t)),Math.min(255,Math.floor(r/t)),Math.min(255,Math.floor(n/t)),this.a)):m.rgb(i,i,i,this.a)
},m.Color.Rgb.prototype.darker=function(t){return t=Math.pow(.7,null!=t?t:1),m.rgb(Math.max(0,Math.floor(t*this.r)),Math.max(0,Math.floor(t*this.g)),Math.max(0,Math.floor(t*this.b)),this.a)
},m.Color.Rgb.prototype.hsl=function(){var t,e,r=this.r/255,n=this.g/255,i=this.b/255,o=Math.max(r,n,i),a=Math.min(r,n,i),s=(o+a)/2;
if(o===a)t=e=0;else{var l=o-a;switch(e=s>.5?l/(2-o-a):l/(o+a),o){case r:t=(n-i)/l+(i>n?6:0);
break;case n:t=(i-r)/l+2;break;case i:t=(r-n)/l+4}t/=6}return m.hsl(360*t,e,s,this.a)
},m.Color.Rgb.prototype.complementary=function(){return this.hsl().complementary().rgb()
},m.hsl=function(t,e,r,n){return new m.Color.Hsl(t,e,r,4==arguments.length?n:1)},m.Color.Hsl=function(t,e,r,n){m.Color.call(this,"hsl("+t+","+100*e+"%,"+100*r+"%)",n),this.h=t,this.s=e,this.l=r,this.a=n
},m.Color.Hsl.prototype=m.extend(m.Color),m.Color.Hsl.prototype.hsl=function(){return this
},m.Color.Hsl.prototype.hue=function(t){return m.hsl(t,this.s,this.l,this.a)},m.Color.Hsl.prototype.saturation=function(t){return m.hsl(this.h,t,this.l,this.a)
},m.Color.Hsl.prototype.lightness=function(t){return m.hsl(this.h,this.s,t,this.a)
},m.Color.Hsl.prototype.alpha=function(t){return m.hsl(this.h,this.s,this.l,t)},m.Color.Hsl.prototype.complementary=function(){return m.hsl((this.h+180)%360,1-this.s,1-this.l,this.a)
},m.Color.Hsl.prototype.rgb=function(){function t(t){return t>360?t-=360:0>t&&(t+=360),60>t?a+(o-a)*t/60:180>t?o:240>t?a+(o-a)*(240-t)/60:a
}function e(e){return Math.round(255*t(e))}var r=this.h,n=this.s,i=this.l;r%=360,0>r&&(r+=360),n=Math.max(0,Math.min(n,1)),i=Math.max(0,Math.min(i,1));
var o=.5>=i?i*(1+n):i+n-i*n,a=2*i-o;return m.rgb(e(r+120),e(r),e(r-120),this.a)},m.Color.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32",transparent:m.Color.transparent=m.rgb(0,0,0,0)},!function(){var t=m.Color.names;
t.none=t.transparent;for(var e in t)t[e]=m.color(t[e])}(),m.colors=function(){var t=m.Scale.ordinal();
return t.range.apply(t,arguments),t},m.Colors={},m.Colors.category10=function(){var t=m.colors("#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf");
return t.domain.apply(t,arguments),t},m.Colors.category20=function(){var t=m.colors("#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5");
return t.domain.apply(t,arguments),t},m.Colors.category19=function(){var t=m.colors("#9c9ede","#7375b5","#4a5584","#cedb9c","#b5cf6b","#8ca252","#637939","#e7cb94","#e7ba52","#bd9e39","#8c6d31","#e7969c","#d6616b","#ad494a","#843c39","#de9ed6","#ce6dbd","#a55194","#7b4173");
return t.domain.apply(t,arguments),t},!function(){function t(t){var e=r(t);if(!e.length)return null;
var i,o,s,l=Math.PI,u=e[0];0===u.indexOf("to ")?(o=/^to\s+(?:((top|bottom)(?:\s+(left|right))?)|((left|right)(?:\\s+(top|bottom))?))$/.exec(u),o&&(o[1]?(i=o[2],o[3]&&(i+=" "+o[3])):(i=o[5],o[6]&&(i=o[6]+" "+i)),l=m.radians(a[i]),e.shift())):(s=parseFloat(u),isNaN(s)||(l=s,/^.*?deg$/.test(u)&&(l=m.radians(l)),e.shift()));
var h=n(e);switch(h.length){case 0:return null;case 1:return new m.FillStyle.Solid(h[0].color,1)
}return new m.FillStyle.LinearGradient(l,h,t)}function e(t){var e=r(t);if(!e.length)return null;
var i=n(e);switch(i.length){case 0:return null;case 1:return new m.FillStyle.Solid(i[0].color,1)
}return new m.FillStyle.RadialGradient(50,50,i,t)}function r(t){var e={},r=0;t=t.replace(/\b\w+?\(.*?\)/g,function(t){var n="__color"+r++;
return e[n]=t,n});var n=t.split(/\s*,\s*/);return n.length?(r&&n.forEach(function(t,r){e.hasOwnProperty(t)&&(n[r]=e[t])
}),n):null}function n(t){function e(t){var e=o.length;if(e){for(var r=i,n=(t-r)/(e+1),a=0;e>a;a++)r+=n,o[a].offset=r;
o.length=0}}for(var r=[],n=1/0,i=-1/0,o=[],a=0,s=t.length;s>a;){var l=t[a++],u=/^(.+?)\s*([+\-]?[e\.\d]+%)?$/i.exec(l);
if(u){var h={color:m.color(u[1])},c=parseFloat(u[2]);isNaN(c)&&(r.length?a===s&&(c=Math.max(i,100)):c=0),r.push(h),isNaN(c)?o.push(h):(h.offset=c,e(c),c>i?i=c:i>c&&(c=i),n>c&&(n=c))
}}if(r.length>=2&&(0>n||i>100)){var p=[],f=[];r.forEach(function(t){p.push(t.offset),f.push(t.color)
});var d=m.scale.linear().domain(p).range(f);if(0>n){for(;r.length&&r[0].offset<=0;)r.shift();
r.unshift({offset:0,color:d(0)})}if(i>100){for(;r.length&&r[r.length-1].offset>=100;)r.pop();
r.push({offset:100,color:d(100)})}}return r}m.fillStyle=function(t){if(t.type)return t;
var e=t.key||t,r=i[e];return r=r?r.clone():i[e]=o(t)};var i={},o=function(r){if(r.rgb)return new m.FillStyle.Solid(r.color,r.opacity);
var n=/^\s*([a-z\-]+)\(\s*(.*?)\s*\)\s*$/.exec(r);if(n)switch(n[1]){case"linear-gradient":return t(n[2]);
case"radial-gradient":return e(n[2])}return new m.FillStyle.Solid(m.color(r))},a={top:0,"top right":45,right:90,"bottom right":135,bottom:180,"bottom left":225,left:270,"top left":315},s=m.FillStyle=function(t){this.type=t,this.key=t
};m.extendType(s,new m.Color("none",1)),s.prototype.rgb=function(){var t=m.color(this.color);
return this.opacity!==t.opacity&&(t=t.alpha(this.opacity)),t},s.prototype.alphaBlend=function(t){return this.rgb().alphaBlend(t)
},s.prototype.rgbDecimal=function(t){return this.rgb().rgbDecimal(t)},s.prototype.isDark=function(){return this.rgb().isDark()
};var l=m.FillStyle.Solid=function(t,e){s.call(this,"solid"),t.rgb?(this.color=t.color,this.opacity=t.opacity):(this.color=t,this.opacity=e),this.key+=" "+this.color+" alpha("+this.opacity+")"
};m.extendType(l,s),l.prototype.alpha=function(t){return new l(this.color,t)},l.prototype.brighter=function(t){return new l(this.rgb().brighter(t))
},l.prototype.darker=function(t){return new l(this.rgb().darker(t))},l.prototype.complementary=function(){return new l(this.rgb().complementary())
},l.prototype.clone=function(){var t=m.extend(l);return t.type=this.type,t.key=this.key,t.color=this.color,t.opacity=this.opacity,t
},m.FillStyle.transparent=new l(m.Color.transparent);var u=0,h=m.FillStyle.Gradient=function(t,e){s.call(this,t),this.id=++u,this.stops=e,e.length&&(this.color=e[0].color.color),this.key+=" stops("+e.map(function(t){var e=t.color;
return e.color+" alpha("+e.opacity+") at("+t.offset+")"}).join(", ")+")"};m.extendType(h,s),h.prototype.rgb=function(){return this.stops.length?this.stops[0].color:void 0
},h.prototype.alpha=function(t){return this._cloneWithStops(this.stops.map(function(e){return{offset:e.offset,color:e.color.alpha(t)}
}))},h.prototype.darker=function(t){return this._cloneWithStops(this.stops.map(function(e){return{offset:e.offset,color:e.color.darker(t)}
}))},h.prototype.brighter=function(t){return this._cloneWithStops(this.stops.map(function(e){return{offset:e.offset,color:e.color.brighter(t)}
}))},h.prototype.complementary=function(){return this._cloneWithStops(this.stops.map(function(t){return{offset:t.offset,color:t.color.complementary()}
}))},h.prototype.alphaBlend=function(t){return this._cloneWithStops(this.stops.map(function(e){return{offset:e.offset,color:e.color.alphaBlend(t)}
}))},h.prototype.clone=function(){var t=this.constructor,e=m.extend(t);e.constructor=t,e.id=++u,e.type=this.type,e.key=this.key;
var r=this.stops;return e.stops=r,r.length&&(e.color=r[0].color.color),this._initClone(e),e
};var c=m.FillStyle.LinearGradient=function(t,e){h.call(this,"lineargradient",e),this.angle=t,this.key+=" angle("+t+")"
};m.extendType(c,h),c.prototype._cloneWithStops=function(t){return new c(this.angle,t)
},c.prototype._initClone=function(t){t.angle=this.angle};var p=m.FillStyle.RadialGradient=function(t,e,r){h.call(this,"radialgradient",r),this.cx=t,this.cy=e,this.key+=" center("+t+","+e+")"
};m.extendType(p,h),p.prototype._cloneWithStops=function(t){return new p(this.cx,this.cy,t)
},p.prototype._initClone=function(t){t.cx=this.cx,t.cy=this.cy}}(),m.ramp=function(){var t=m.Scale.linear();
return t.range.apply(t,arguments),t},m.Scene=m.SvgScene={svg:"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/xmlns",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",scale:1,events:["DOMMouseScroll","mousewheel","mousedown","mouseup","mouseover","mouseout","mousemove","click","dblclick","contextmenu"],mousePositionEventSet:{mousedown:1,mouseup:1,mouseover:1,mouseout:1,mousemove:1,click:1,dblclick:1,contextmenu:1},implicit:{svg:{"shape-rendering":"auto","pointer-events":"painted",x:0,y:0,dy:0,"text-anchor":"start",transform:"translate(0,0)",fill:"none","fill-opacity":1,stroke:"none","stroke-opacity":1,"stroke-width":1.5,"stroke-linejoin":"miter","stroke-linecap":"butt","stroke-miterlimit":8,"stroke-dasharray":"none"},css:{font:"10px sans-serif"}}},m.SvgScene.updateAll=function(t){if(t.length&&t[0].reverse&&"line"!==t.type&&"area"!==t.type){for(var e=Object.create(t),r=0,n=t.length-1;n>=0;r++,n--)e[r]=t[n];
t=e}this.removeSiblings(this[t.type](t))},m.SvgScene.create=function(t){return document.createElementNS(this.svg,t)
},m.SvgScene.expect=function(t,e,r,n,i,o){var a;if(t&&(a=t.tagName,"defs"===a?(t=t.nextSibling,t&&(a=t.tagName)):"a"===a&&(t=t.firstChild)),t){if(a!==e){var s=this.create(e);
t.parentNode.replaceChild(s,t),t=s}}else t=this.create(e);return i&&this.setAttributes(t,i),o&&this.setStyle(t,o),t
},m.SvgScene.setAttributes=function(t,e){var r=this.implicit.svg,n=t.__attributes__;
n===e&&(n=null);for(var i in e){var o=e[i];n&&o===n[i]||(null==o||o==r[i]?t.removeAttribute(i):t.setAttribute(i,o))
}t.__attributes__=e},m.SvgScene.setStyle=function(t,e){var r=this.implicit.css,n=t.__style__;
n===e&&(n=null);for(var i in e){var o=e[i];n&&o===n[i]||(null==o||o==r[i]?t.style.removeProperty(i):t.style[i]=o)
}t.__style__=e},m.SvgScene.append=function(t,e,r){return t.$scene={scenes:e,index:r},t=this.title(t,e[r]),t.parentNode||e.$g.appendChild(t),t.nextSibling
},m.SvgScene.title=function(t,e){var r=t.parentNode;if(r&&"a"!=r.tagName&&(r=null),e.title){r||(r=this.create("a"),r.setAttributeNS(this.xlink,"xlink:href",""),t.parentNode&&t.parentNode.replaceChild(r,t),r.appendChild(t)),r.setAttributeNS(this.xlink,"xlink:title",e.title);
for(var n=null,i=t.firstChild;null!=i;i=i.nextSibling)if("title"==i.nodeName){n=i;
break}return n?n.removeChild(n.firstChild):(n=this.create("title"),t.appendChild(n)),n.appendChild(document.createTextNode(e.title)),r
}return r&&r.parentNode.replaceChild(t,r),t},m.SvgScene.dispatch=m.listener(function(t){var e=t.target.$scene;
if(e){var r=t.type;switch(r){case"DOMMouseScroll":r="mousewheel",t.wheel=-480*t.detail;
break;case"mousewheel":t.wheel=(window.opera?12:1)*t.wheelDelta}m.Mark.dispatch(r,e.scenes,e.index,t)&&(t.preventDefault(),t.stopPropagation())
}}),m.SvgScene.removeSiblings=function(t){for(;t;){var e=t.nextSibling;"defs"!==t.nodeName&&t.parentNode.removeChild(t),t=e
}},m.SvgScene.undefined=function(){},!function(){var t={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"},e={shortdash:[3,1],shortdot:[1,1],shortdashdot:[3,1,1,1],shortdashdotdot:[3,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
m.SvgScene.isStandardDashStyle=function(t){return e.hasOwnProperty(t)},m.SvgScene.translateDashStyleAlias=function(e){return t.hasOwnProperty(e)?t[e]:e
},m.SvgScene.parseDasharray=function(t){var r=t.strokeDasharray;if(r&&"none"!==r){r=this.translateDashStyleAlias(r);
var n=e[r];r=n?n:r.split(/[\s,]+/);var i=t.lineWidth,o=t.lineCap||"butt",a="butt"===o;
r=r.map(function(t,e){return t=+t,a||(e%2?t++:t-=1),0>=t&&(t=.001),t*i/this.scale
},this).join(" ")}else r=null;return r}}(),!function(){var t=/^url\(#/,e=1,r=Math.PI/2,n=r/2,i=Math.SQRT2/2,o=Math.abs,a=Math.sin,s=Math.cos,l=function(t){return o(t)<=1e-12?0:t
};m.SvgScene.addFillStyleDefinition=function(r,n){if(n.type&&"solid"!==n.type&&!t.test(n.color)){var i=r.mark.root,o=i.__fillStyleMap__||(i.__fillStyleMap__={}),a=n.key,s=o[a];
if(!s){s=o[a]="__pvGradient"+e++;var l=u.call(this,r,n,s);i.scene.$defs.appendChild(l)
}n.color="url(#"+s+")"}};var u=function(t,e,u){var h="lineargradient"===e.type,c=this.create(h?"linearGradient":"radialGradient");
if(c.setAttribute("id",u),h){var p=e.angle-r,f=o(p%r)-n,d=o(i*s(f)),y=d*s(p),g=d*a(p);
c.setAttribute("x1",l(.5-y)),c.setAttribute("y1",l(.5-g)),c.setAttribute("x2",l(.5+y)),c.setAttribute("y2",l(.5+g))
}for(var m=e.stops,v=m.length,x=0;v>x;x++){var b=m[x],k=c.appendChild(this.create("stop")),S=b.color;
k.setAttribute("offset",b.offset+"%"),k.setAttribute("stop-color",S.color),k.setAttribute("stop-opacity",S.opacity+"")
}return c}}(),m.SvgScene.pathBasis=function(){function t(t,e,r,n,i){return{x:t[0]*e.left+t[1]*r.left+t[2]*n.left+t[3]*i.left,y:t[0]*e.top+t[1]*r.top+t[2]*n.top+t[3]*i.top}
}var e=[[1/6,2/3,1/6,0],[0,2/3,1/3,0],[0,1/3,2/3,0],[0,1/6,2/3,1/6]],r=function(r,n,i,o){var a=t(e[1],r,n,i,o),s=t(e[2],r,n,i,o),l=t(e[3],r,n,i,o);
return"C"+a.x+","+a.y+","+s.x+","+s.y+","+l.x+","+l.y};return r.segment=function(r,n,i,o){var a=t(e[0],r,n,i,o),s=t(e[1],r,n,i,o),l=t(e[2],r,n,i,o),u=t(e[3],r,n,i,o);
return["M"+a.x+","+a.y,"C"+s.x+","+s.y+","+l.x+","+l.y+","+u.x+","+u.y]},r}(),m.SvgScene.curveBasis=function(t,e,r){var n;
if(null==e?(n=t.length,e=0,r=n-1):n=r-e+1,2>=n)return"";var i="",o=t[e],a=o,s=o,l=t[e+1];
i+=this.pathBasis(o,a,s,l);for(var u=e+2;r>=u;u++)o=a,a=s,s=l,l=t[u],i+=this.pathBasis(o,a,s,l);
return i+=this.pathBasis(a,s,l,l),i+=this.pathBasis(s,l,l,l)},m.SvgScene.curveBasisSegments=function(t,e,r){var n;
if(null==e?(n=t.length,e=0,r=n-1):n=r-e+1,2>=n)return"";var i=[],o=t[e],a=o,s=o,l=t[e+1],u=this.pathBasis.segment(o,a,s,l);
o=a,a=s,s=l,l=t[e+2],u[1]+=this.pathBasis(o,a,s,l),i.push(u);for(var h=e+3;r>=h;h++)o=a,a=s,s=l,l=t[h],i.push(this.pathBasis.segment(o,a,s,l));
var c=this.pathBasis.segment(a,s,l,l);return c[1]+=this.pathBasis(s,l,l,l),i.push(c),i
},m.SvgScene.curveHermite=function(t,e,r,n){var i;null==r?(i=t.length,r=0,n=i-1):i=n-r+1;
var o=e.length;if(1>o||i!==o&&i!==o+2)return"";var a=i!==o,s="",l=t[r],u=t[r+1],h=e[0],c=h,p=r+1;
if(a&&(s+="Q"+(u.left-2*h.x/3)+","+(u.top-2*h.y/3)+","+u.left+","+u.top,l=t[r+1],p=r+2),o>1){c=e[1],u=t[p],p++,s+="C"+(l.left+h.x)+","+(l.top+h.y)+","+(u.left-c.x)+","+(u.top-c.y)+","+u.left+","+u.top;
for(var f=2;o>f;f++,p++)u=t[p],c=e[f],s+="S"+(u.left-c.x)+","+(u.top-c.y)+","+u.left+","+u.top
}if(a){var d=t[p];s+="Q"+(u.left+2*c.x/3)+","+(u.top+2*c.y/3)+","+d.left+","+d.top
}return s},m.SvgScene.curveHermiteSegments=function(t,e,r,n){var i;null==r?(i=t.length,r=0,n=i-1):i=n-r+1;
var o=e.length;if(1>o||i!==o&&i!==o+2)return[];var a=i!==o,s=[],l=t[r],u=l,h=e[0],c=h,p=r+1;
a&&(u=t[r+1],s.push(["M"+l.left+","+l.top,"Q"+(u.left-2*c.x/3)+","+(u.top-2*c.y/3)+","+u.left+","+u.top]),p=r+2);
for(var f=1;o>f;f++,p++)l=u,h=c,u=t[p],c=e[f],s.push(["M"+l.left+","+l.top,"C"+(l.left+h.x)+","+(l.top+h.y)+","+(u.left-c.x)+","+(u.top-c.y)+","+u.left+","+u.top]);
if(a){var d=t[p];s.push(["M"+u.left+","+u.top,"Q"+(u.left+2*c.x/3)+","+(u.top+2*c.y/3)+","+d.left+","+d.top])
}return s},m.SvgScene.cardinalTangents=function(t,e,r,n){var i;null==r?(i=t.length,r=0,n=i-1):i=n-r+1;
for(var o=[],a=(1-e)/2,s=t[r],l=t[r+1],u=t[r+2],h=r+3;n>=h;h++)o.push({x:a*(u.left-s.left),y:a*(u.top-s.top)}),s=l,l=u,u=t[h];
return o.push({x:a*(u.left-s.left),y:a*(u.top-s.top)}),o},m.SvgScene.curveCardinal=function(t,e,r,n){var i;
return null==r?(i=t.length,r=0,n=i-1):i=n-r+1,2>=i?"":this.curveHermite(t,this.cardinalTangents(t,e,r,n),r,n)
},m.SvgScene.curveCardinalSegments=function(t,e,r,n){var i;return null==r?(i=t.length,r=0,n=i-1):i=n-r+1,2>=i?"":this.curveHermiteSegments(t,this.cardinalTangents(t,e,r,n),r,n)
},m.SvgScene.monotoneTangents=function(t,e,r){var n;null==e?(n=t.length,e=0,r=n-1):n=r-e+1;
var i,o=[],a=[],s=[],l=[],u=0;for(u=0;n-1>u;u++){i=e+u;var h=t[i+1].left-t[i].left;
a[u]=Math.abs(h)<=1e-12?0:(t[i+1].top-t[i].top)/h}for(s[0]=a[0],l[0]=t[e+1].left-t[e].left,u=1,i=e+u;n-1>u;u++,i++)s[u]=(a[u-1]+a[u])/2,l[u]=(t[i+1].left-t[i-1].left)/2;
for(s[u]=a[u-1],l[u]=t[i].left-t[i-1].left,u=0;n-1>u;u++)0==a[u]&&(s[u]=0,s[u+1]=0);
for(u=0;n-1>u;u++)if(!(Math.abs(s[u])<1e-5||Math.abs(s[u+1])<1e-5)){var c=s[u]/a[u],p=s[u+1]/a[u],f=c*c+p*p;
if(f>9){var d=3/Math.sqrt(f);s[u]=d*c*a[u],s[u+1]=d*p*a[u]}}for(var y,g=0;n>g;g++)y=1+s[g]*s[g],o.push({x:l[g]/3/y,y:s[g]*l[g]/3/y});
return o},m.SvgScene.curveMonotone=function(t,e,r){var n;return null==e?(n=t.length,e=0,r=n-1):n=r-e+1,2>=n?"":this.curveHermite(t,this.monotoneTangents(t,e,r),e,r)
},m.SvgScene.curveMonotoneSegments=function(t,e,r){var n;return null==e?(n=t.length,e=0,r=n-1):n=r-e+1,2>=n?"":this.curveHermiteSegments(t,this.monotoneTangents(t,e,r),e,r)
},m.SvgScene.area=function(t){var e=t.$g.firstChild,r=t.length;if(!r)return e;var n=t[0];
return"smart"===n.segmented?this.areaSegmentedSmart(e,t):n.segmented?this.areaSegmentedFull(e,t):this.areaFixed(e,t,0,r-1,!0)
},m.SvgScene.areaFixed=function(t,e,r,n,i){var o=n-r+1;if(1===o)return this.lineAreaDotAlone(t,e,r);
var a=e[r];if(!a.visible)return t;var s=a.fillStyle,l=a.strokeStyle;if(!s.opacity&&!l.opacity)return t;
this.addFillStyleDefinition(e,s),this.addFillStyleDefinition(e,l);var u=!1,h=!1,c=!1,p=!1,f=!1;
switch(a.interpolate){case"basis":u=!0;break;case"cardinal":h=!0;break;case"monotone":c=!0;
break;case"step-after":p=!0;break;case"step-before":f=!0}for(var d,y,g=u||h||c,m=[],v=r;n>=v;v++)if(d=e[v],d.width||d.height){for(var x=v+1;n>=x&&(y=e[x],y.width||y.height);x++);v>r&&!p&&v--,n>=x&&!f&&x++;
var b=g&&x-v>2?this.areaPathCurve:this.areaPathStraight;m.push(b.call(this,e,v,x-1,a)),v=x-1
}if(!m.length)return t;var k=l.opacity;return t=this.expect(t,"path",e,r,{"shape-rendering":a.antialias?null:"crispEdges","pointer-events":i?a.events:"none",cursor:a.cursor,d:"M"+m.join("ZM")+"Z",fill:s.color,"fill-opacity":s.opacity||null,stroke:l.color,"stroke-opacity":k||null,"stroke-width":k?a.lineWidth/this.scale:null,"stroke-linecap":a.lineCap,"stroke-linejoin":a.lineJoin,"stroke-miterlimit":a.strokeMiterLimit,"stroke-dasharray":k?this.parseDasharray(a):null}),a.svg&&this.setAttributes(t,a.svg),a.css&&this.setStyle(t,a.css),this.append(t,e,r)
},m.SvgScene.areaSegmentedSmart=function(t,e){return this.eachLineAreaSegment(t,e,function(t,e,r,n){var i=this.areaSegmentPaths(e,r,n),o=i.top,a=i.bottom,s=r,l={breakOnKeyChange:!0,from:r,to:n};
return this.eachLineAreaSegment(t,e,l,function(t,e,r,n,i,l){var u=e[r],h=u.fillStyle,c=u.strokeStyle;
if(this.addFillStyleDefinition(e,h),this.addFillStyleDefinition(e,c),r===n)return this.lineAreaDotAlone(t,e,r);
var p=this.areaJoinPaths(o,a,r-s,n-s-1),f=c.opacity,d={"shape-rendering":u.antialias?null:"crispEdges","pointer-events":l,cursor:u.cursor,d:p,fill:h.color,"fill-opacity":h.opacity||null,stroke:c.color,"stroke-opacity":f||null,"stroke-width":f?u.lineWidth/this.scale:null,"stroke-linecap":u.lineCap,"stroke-linejoin":u.lineJoin,"stroke-miterlimit":u.strokeMiterLimit,"stroke-dasharray":f?this.parseDasharray(u):null};
return t=this.expect(t,"path",e,r,d,u.css),this.append(t,e,r)})})},m.SvgScene.areaSegmentPaths=function(t,e,r){return this.areaSegmentCurvePaths(t,e,r)||this.areaSegmentStraightPaths(t,e,r)
},m.SvgScene.areaSegmentCurvePaths=function(t,e,r){var n=r-e+1,i=t[e],o="basis"===i.interpolate,a=!o&&"cardinal"===i.interpolate;
if(o||a||"monotone"==i.interpolate){for(var s=[],l=[],u=0;n>u;u++){var h=t[e+u],c=t[r-u];
s.push(h),l.push({left:c.left+c.width,top:c.top+c.height})}var p,f;if(o?(p=this.curveBasisSegments(s),f=this.curveBasisSegments(l)):a?(p=this.curveCardinalSegments(s,i.tension),f=this.curveCardinalSegments(l,i.tension)):(p=this.curveMonotoneSegments(s),f=this.curveMonotoneSegments(l)),p||p.length)return{from:e,top:p,bottom:f}
}},m.SvgScene.areaSegmentStraightPaths=function(t,e,r){for(var n=[],i=[],o=r,a=e;o>e;e++,r--){var s=t[e],l=t[r],u=["M"+s.left+","+s.top],h=["M"+(l.left+l.width)+","+(l.top+l.height)],c=t[e+1],p=t[r-1];
switch(s.interpolate){case"step-before":u.push("V"+c.top+"H"+c.left);break;case"step-after":u.push("H"+c.left+"V"+c.top);
break;default:u.push("L"+c.left+","+c.top)}h.push("L"+(p.left+p.width)+","+(p.top+p.height)),n.push(u),i.push(h)
}return{from:a,top:n,bottom:i}},m.SvgScene.areaJoinPaths=function(t,e,r,n){for(var i="",o="",a=t.length,s=r,l=a-1-n;n>=s;s++,l++){var u,h,c=t[s],p=e[l];
s===r?(u=c.join(""),h="L"+p[0].substr(1)+p[1]):(u=c[1],h=p[1]),i+=u,o+=h}return i+o+"Z"
},m.SvgScene.areaSegmentedFull=function(t,e){var r,n,i=e.length,o=this.areaSegmentCurvePaths(e,0,i-1);
o&&(r=o.top,n=o.bottom);for(var a=(e[0],0);i-1>a;a++){var s=e[a],l=e[a+1];if(s.visible&&l.visible){var u=s.fillStyle,h=s.strokeStyle;
if(u.opacity||h.opacity){var c;if(r){var p=r[a].join(""),f="L"+n[i-a-2].join("").substr(1);
c=p+f+"Z"}else{var d=s,y=l;switch(s.interpolate){case"step-before":d=l;break;case"step-after":y=s
}c="M"+s.left+","+d.top+"L"+l.left+","+y.top+"L"+(l.left+l.width)+","+(y.top+y.height)+"L"+(s.left+s.width)+","+(d.top+d.height)+"Z"
}var g={"shape-rendering":s.antialias?null:"crispEdges","pointer-events":s.events,cursor:s.cursor,d:c,fill:u.color,"fill-opacity":u.opacity||null,stroke:h.color,"stroke-opacity":h.opacity||null,"stroke-width":h.opacity?s.lineWidth/this.scale:null};
t=this.expect(t,"path",e,a,g),s.svg&&this.setAttributes(t,s.svg),s.css&&this.setStyle(t,s.css),t=this.append(t,e,a)
}}}return t},m.SvgScene.areaPathStraight=function(t,e,r,n){for(var i=[],o=[],a=r;a>=e;e++,r--){var s=t[e],l=t[r],u=s.left+","+s.top,h=l.left+l.width+","+(l.top+l.height);
if(a>e){var c=t[e+1],p=t[r-1];switch(n.interpolate){case"step-before":u+="V"+c.top,h+="H"+(p.left+p.width);
break;case"step-after":u+="H"+c.left,h+="V"+(p.top+p.height)}}i.push(u),o.push(h)
}return i.concat(o).join("L")},m.SvgScene.areaPathCurve=function(t,e,r,n){for(var i,o,a=[],s=[],l=r;l>=e;e++,r--){var u=t[r];
a.push(t[e]),s.push({left:u.left+u.width,top:u.top+u.height})}switch(n.interpolate){case"basis":i=this.curveBasis(a),o=this.curveBasis(s);
break;case"cardinal":i=this.curveCardinal(a,n.tension),o=this.curveCardinal(s,n.tension);
break;default:i=this.curveMonotone(a),o=this.curveMonotone(s)}return a[0].left+","+a[0].top+i+"L"+s[0].left+","+s[0].top+o
},m.SvgScene.minBarWidth=1,m.SvgScene.minBarHeight=1,m.SvgScene.minBarLineWidth=.2,m.SvgScene.bar=function(t){for(var e=t.$g.firstChild,r=0;r<t.length;r++){var n=t[r];
if(!(!n.visible||Math.abs(n.width)<=1e-10||Math.abs(n.height)<=1e-10)){n.width<this.minBarWidth&&(n.width=this.minBarWidth),n.height<this.minBarHeight&&(n.height=this.minBarHeight);
var i=n.fillStyle,o=n.strokeStyle;if(i.opacity||o.opacity){this.addFillStyleDefinition(t,i),this.addFillStyleDefinition(t,o);
var a;o.opacity?(a=n.lineWidth,a=1e-10>a?0:Math.max(this.minBarLineWidth,a/this.scale)):a=null,e=this.expect(e,"rect",t,r,{"shape-rendering":n.antialias?null:"crispEdges","pointer-events":n.events,cursor:n.cursor,x:n.left,y:n.top,width:Math.max(1e-10,n.width),height:Math.max(1e-10,n.height),fill:i.color,"fill-opacity":i.opacity||null,stroke:o.color,"stroke-opacity":o.opacity||null,"stroke-width":a,"stroke-linecap":n.lineCap,"stroke-dasharray":o.opacity?this.parseDasharray(n):null}),n.svg&&this.setAttributes(e,n.svg),n.css&&this.setStyle(e,n.css),e=this.append(e,t,r)
}}}return e},m.SvgScene.dot=function(t){for(var e=t.$g.firstChild,r=0,n=t.length;n>r;r++){var i=t[r];
if(i.visible){var o=i.fillStyle,a=o.opacity,s=i.strokeStyle,l=s.opacity;if(a||l){this.addFillStyleDefinition(t,o),this.addFillStyleDefinition(t,s);
var u={"shape-rendering":i.antialias?null:"crispEdges","pointer-events":i.events,cursor:i.cursor,fill:o.color,"fill-opacity":a||null,stroke:s.color,"stroke-opacity":l||null,"stroke-width":l?i.lineWidth/this.scale:null,"stroke-linecap":i.lineCap,"stroke-dasharray":l?this.parseDasharray(i):null},h=i.shape||"circle",c=i.aspectRatio,p=i.shapeAngle,f=null;
if("circle"!==h&&this.hasSymbol(h)){var d=i.shapeRadius,y=d,g=d;if(c>0&&1!==c){var v=1/Math.sqrt(c),x=c*v;
y*=x,g*=v}u.d=this.renderSymbol(h,i,y,g),h="path",f="translate("+i.left+","+i.top+") ",p&&(f+="rotate("+m.degrees(p)+") ")
}else 1===c?(h="circle",u.cx=i.left,u.cy=i.top,u.r=i.shapeRadius):(h="ellipse",u.cx=u.cy=0,f="translate("+i.left+","+i.top+") ",p&&(f+="rotate("+m.degrees(p)+") "),u.rx=i._width/2,u.ry=i._height/2);
f&&(u.transform=f),e=this.expect(e,h,t,r,u),i.svg&&this.setAttributes(e,i.svg),i.css&&this.setStyle(e,i.css),e=this.append(e,t,r)
}}}return e},!function(t){var e={};t.registerSymbol=function(r,n){return e[r.toLowerCase()]=n,t
},t.renderSymbol=function(r,n,i,o){return e[r].call(t,n,r,i,o)},t.hasSymbol=function(t){return e.hasOwnProperty(t)
},t.symbols=function(){return m.keys(e)};var r=2/Math.sqrt(3);t.registerSymbol("circle",function(){throw new Error("Not implemented as a symbol")
}).registerSymbol("cross",function(t,e,r,n){var i=(t.shapeRadius,-r),o=-n;return"M"+i+","+o+"L"+r+","+n+"M"+r+","+o+"L"+i+","+n
}).registerSymbol("triangle",function(t,e,n,i){var o=i,a=n*r,s=-i,l=-a;return"M0,"+o+"L"+a+","+s+" "+l+","+s+"Z"
}).registerSymbol("diamond",function(t,e,r,n){var i=r*Math.SQRT2,o=n*Math.SQRT2,a=-i,s=-o;
return"M0,"+s+"L"+i+",0 0,"+o+" "+a+",0Z"}).registerSymbol("square",function(t,e,r,n){var i=-r,o=-n;
return"M"+i+","+o+"L"+r+","+o+" "+r+","+n+" "+i+","+n+"Z"}).registerSymbol("tick",function(t,e,r,n){var i=-n*n;
return"M0,0L0,"+i}).registerSymbol("bar",function(t,e,r,n){var i=n*n/2;return"M0,"+i+"L0,"+-i
})}(m.SvgScene),m.SvgScene.image=function(t){for(var e=t.$g.firstChild,r=0;r<t.length;r++){var n=t[r];
if(n.visible){if(e=this.fill(e,t,r),n.image){e=this.expect(e,"foreignObject",t,r,{cursor:n.cursor,x:n.left,y:n.top,width:n.width,height:n.height}),n.svg&&this.setAttributes(e,n.svg),n.css&&this.setStyle(e,n.css);
var i=e.firstChild||e.appendChild(document.createElementNS(this.xhtml,"canvas"));
i.$scene={scenes:t,index:r},i.style.width=n.width,i.style.height=n.height,i.width=n.imageWidth,i.height=n.imageHeight,i.getContext("2d").putImageData(n.image,0,0)
}else e=this.expect(e,"image",t,r,{preserveAspectRatio:"none",cursor:n.cursor,x:n.left,y:n.top,width:n.width,height:n.height}),n.svg&&this.setAttributes(e,n.svg),n.css&&this.setStyle(e,n.css),e.setAttributeNS(this.xlink,"xlink:href",n.url);
e=this.append(e,t,r),e=this.stroke(e,t,r)}}return e},m.SvgScene.label=function(t){for(var e=t.$g.firstChild,r=0;r<t.length;r++){var n=t[r];
if(n.visible){var i=n.textStyle;if(i.opacity&&n.text){var o=0,a=0,s=0,l="start";switch(n.textBaseline){case"middle":s=".35em";
break;case"top":s=".71em",a=n.textMargin;break;case"bottom":a="-"+n.textMargin}switch(n.textAlign){case"right":l="end",o="-"+n.textMargin;
break;case"center":l="middle";break;case"left":o=n.textMargin}e=this.expect(e,"text",t,r,{"pointer-events":n.events,cursor:n.cursor,x:o,y:a,dy:s,transform:"translate("+n.left+","+n.top+")"+(n.textAngle?" rotate("+180*n.textAngle/Math.PI+")":"")+(1!=this.scale?" scale("+1/this.scale+")":""),fill:i.color,"fill-opacity":i.opacity||null,"text-anchor":l},{font:n.font,"text-shadow":n.textShadow,"text-decoration":n.textDecoration}),n.svg&&this.setAttributes(e,n.svg),n.css&&this.setStyle(e,n.css),e.firstChild?e.firstChild.nodeValue=n.text:e.appendChild(document.createTextNode(n.text)),e=this.append(e,t,r)
}}}return e},m.SvgScene.line=function(t){var e=t.$g.firstChild,r=t.length;if(!r)return e;
var n=t[0];return"smart"===n.segmented?this.lineSegmentedSmart(e,t):2>r?e:n.segmented?this.lineSegmentedFull(e,t):this.lineFixed(e,t)
},m.SvgScene.lineFixed=function(t,e){var r=e.length;if(1===r)return this.lineAreaDotAlone(t,e,0);
var n=e[0];if(!n.visible)return t;var i=n.fillStyle,o=n.strokeStyle;if(!i.opacity&&!o.opacity)return t;
this.addFillStyleDefinition(e,i),this.addFillStyleDefinition(e,o);var a="M"+n.left+","+n.top,s=r>2;
if(s)switch(n.interpolate){case"basis":a+=this.curveBasis(e);break;case"cardinal":a+=this.curveCardinal(e,n.tension);
break;case"monotone":a+=this.curveMonotone(e);break;default:s=!1}if(!s)for(var l=1;r>l;l++)a+=this.lineSegmentPath(e[l-1],e[l]);
var u=o.opacity,h={"shape-rendering":n.antialias?null:"crispEdges","pointer-events":n.events,cursor:n.cursor,d:a,fill:i.color,"fill-opacity":i.opacity||null,stroke:o.color,"stroke-opacity":u||null,"stroke-width":u?n.lineWidth/this.scale:null,"stroke-linecap":n.lineCap,"stroke-linejoin":n.lineJoin,"stroke-miterlimit":n.strokeMiterLimit,"stroke-dasharray":u?this.parseDasharray(n):null};
return t=this.expect(t,"path",e,0,h,n.css),n.svg&&this.setAttributes(t,n.svg),this.append(t,e,0)
},m.SvgScene.lineSegmentedSmart=function(t,e){return this.eachLineAreaSegment(t,e,function(t,e,r,n){var i=this.lineSegmentPaths(e,r,n),o=r,a={breakOnKeyChange:!0,from:r,to:n};
return this.eachLineAreaSegment(t,e,a,function(t,e,r,n,a,s){var l=e[r],u=l.fillStyle;
this.addFillStyleDefinition(e,u);var h=l.strokeStyle;if(this.addFillStyleDefinition(e,h),r===n)return this.lineAreaDotAlone(t,e,r);
var c=this.lineJoinPaths(i,r-o,n-o-1),p=h.opacity,f={"shape-rendering":l.antialias?null:"crispEdges","pointer-events":s,cursor:l.cursor,d:c,fill:u.color,"fill-opacity":u.opacity||null,stroke:h.color,"stroke-opacity":p||null,"stroke-width":p?l.lineWidth/this.scale:null,"stroke-linecap":l.lineCap,"stroke-linejoin":l.lineJoin,"stroke-miterlimit":l.strokeMiterLimit,"stroke-dasharray":p?this.parseDasharray(l):null};
return t=this.expect(t,"path",e,r,f,l.css),this.append(t,e,r)})})},m.SvgScene.lineSegmentedFull=function(t,e){var r,n=e[0];
switch(n.interpolate){case"basis":r=this.curveBasisSegments(e);break;case"cardinal":r=this.curveCardinalSegments(e,n.tension);
break;case"monotone":r=this.curveMonotoneSegments(e)}for(var i=0,o=e.length-1;o>i;i++){var a=e[i],s=e[i+1];
if(a.visible&&s.visible){var l=a.strokeStyle,u=m.FillStyle.transparent;if(l.opacity){var h;
"linear"==a.interpolate&&"miter"==a.lineJoin?(u=l,l=m.FillStyle.transparent,h=this.pathJoin(e[i-1],a,s,e[i+2])):h=r?r[i].join(""):"M"+a.left+","+a.top+this.lineSegmentPath(a,s),t=this.expect(t,"path",e,i,{"shape-rendering":a.antialias?null:"crispEdges","pointer-events":a.events,cursor:a.cursor,d:h,fill:u.color,"fill-opacity":u.opacity||null,stroke:l.color,"stroke-opacity":l.opacity||null,"stroke-width":l.opacity?a.lineWidth/this.scale:null,"stroke-linejoin":a.lineJoin}),a.svg&&this.setAttributes(t,a.svg),a.css&&this.setStyle(t,a.css),t=this.append(t,e,i)
}}}return t},m.SvgScene.lineSegmentPath=function(t,e){var r=1;switch(t.interpolate){case"polar-reverse":r=0;
case"polar":var n=e.left-t.left,i=e.top-t.top,o=1-t.eccentricity,a=Math.sqrt(n*n+i*i)/(2*o);
if(0>=o||o>1)break;return"A"+a+","+a+" 0 0,"+r+" "+e.left+","+e.top;case"step-before":return"V"+e.top+"H"+e.left;
case"step-after":return"H"+e.left+"V"+e.top}return"L"+e.left+","+e.top},m.SvgScene.lineSegmentPaths=function(t,e,r){var n,i=t[e];
switch(i.interpolate){case"basis":n=this.curveBasisSegments(t,e,r);break;case"cardinal":n=this.curveCardinalSegments(t,i.tension,e,r);
break;case"monotone":n=this.curveMonotoneSegments(t,e,r)}if(!n||!n.length){n=[];for(var o=e+1;r>=o;o++){var a=t[o-1],s=t[o];
n.push(["M"+a.left+","+a.top,this.lineSegmentPath(a,s)])}}return n},m.strokeMiterLimit=4,m.SvgScene.pathJoin=function(t,e,r,n){var i,o,a,s=[],l=e.lineWidth/this.scale,u=m.vector(e.left,e.top),h=m.vector(r.left,r.top),c=h.minus(u),p=c.perp().norm(),f=p.times(l/2),d=u.plus(f),y=u.minus(f),g=h.plus(f),v=h.minus(f);
if(t&&t.visible){var x=m.vector(t.left,t.top),b=u.minus(x),k=b.perp().norm(),S=k.plus(p).norm(),M=this.lineIntersect(u,S,d,c),w=this.lineIntersect(u,S,y,c);
a=M.minus(w).length();var C=t.lineWidth/this.scale,L=(l+C)/2;if(o=a/L,i=e.strokeMiterLimit||m.strokeMiterLimit,i>=o)s.push(w,M);
else{var N=c.times(-1),A=b.norm().plus(N.norm()).norm(),I=u.plus(A.times(L/2));A.dot(p)>=0?s.push(w,I,d):s.push(y,I,M)
}}else s.push(y,d);if(n&&n.visible){var P=m.vector(n.left,n.top),B=P.minus(h),_=B.perp().norm(),$=_.plus(p).norm(),D=this.lineIntersect(h,$,g,c),R=this.lineIntersect(h,$,v,c);
a=D.minus(R).length();var F=n.lineWidth/this.scale,T=(F+l)/2;if(o=a/T,i=r.strokeMiterLimit||m.strokeMiterLimit,i>=o)s.push(D,R);
else{var E=B.times(-1),O=c.norm().plus(E.norm()).norm(),z=h.plus(O.times(T/2));O.dot(p)>=0?s.push(g,z,R):s.push(D,z,v)
}}else s.push(g,v);var H=s.shift();return"M"+H.x+","+H.y+"L"+s.map(function(t){return t.x+","+t.y
}).join(" ")},m.SvgScene.lineIntersect=function(t,e,r,n){return t.plus(e.times(r.minus(t).dot(n.perp())/e.dot(n.perp())))
},m.SvgScene.lineJoinPaths=function(t,e,r){for(var n=t[e].join(""),i=e+1;r>=i;i++)n+=t[i][1];
return n},m.SvgScene.lineAreaDotAlone=function(t){return t},m.Scene.eventsToNumber={"":0,none:0,painted:1,all:2},m.Scene.numberToEvents=["none","painted","all"],m.SvgScene.eachLineAreaSegment=function(t,e,r,n){"function"==typeof r&&(n=r,r=null);
var i,o,a,s=m.get(r,"breakOnKeyChange",!1),l=m.get(r,"from")||0,u=m.get(r,"to",e.length-1);
s&&(o=[],a=[]);for(var h=l;u>=h;){var c=e[h];if(this.isSceneVisible(c)){i=this.eventsToNumber[c.events]||0,s&&this.lineAreaSceneKey(c,o);
for(var p,f=h;;){var d=f+1;if(d>u){p=d;break}var y=e[d];if(!this.isSceneVisible(y)){p=d+1;
break}if(i=Math.max(i,this.eventsToNumber[y.events]||0),f=d,s&&(this.lineAreaSceneKey(y,a),!this.equalSceneKeys(o,a))){p=f;
break}}t=n.call(this,t,e,h,f,r,this.numberToEvents[i]),h=p}else h++}return t},m.SvgScene.lineAreaSceneKey=function(t,e){return e[0]=t.fillStyle.key,e[1]=t.strokeStyle.key,e[2]=t.lineWidth,e[3]=t.strokeDasharray||"none",e[4]=t.interpolate,e
},m.SvgScene.isSceneVisible=function(t){return t.visible&&(t.fillStyle.opacity>0||t.strokeStyle.opacity>0)
},m.SvgScene.equalSceneKeys=function(t,e){for(var r=0,n=t.length;n>r;r++)if(t[r]!==e[r])return!1;
return!0},m.SvgScene.panel=function(t){for(var e=t.$g,r=e&&e.firstChild,n=0,i=t.length;i>n;n++){var o=t[n];
if(o.visible){if(!t.parent){var a=o.canvas;this.applyCanvasStyle(a),e&&e.parentNode!==a&&(e=a.firstChild,r=e&&e.firstChild),e?r&&"defs"===r.tagName&&(r=r.nextSibling):(e=this.createRootPanelElement(),r=null,this.initRootPanelElement(e,t.mark),a.appendChild(e),t.$defs=e.appendChild(this.create("defs")),t.$g=e),e.setAttribute("width",o.width+o.left+o.right),e.setAttribute("height",o.height+o.top+o.bottom)
}var s=null;if("hidden"===o.overflow){var l=this.addPanelClipPath(e,r,t,n,o);s=l.g,t.$g=e=s,r=l.next
}r=this.fill(r,t,n);var u=this.scale,h=o.transform,c=o.left+h.x,p=o.top+h.y;if(this.scale*=h.k,o.children.length)for(var f={transform:"translate("+c+","+p+")"+(1!=h.k?" scale("+h.k+")":"")},d=this.getSortedChildScenes(t,n),y=0,g=d.length;g>y;y++){var m=d[y];
m.$g=r=this.expect(r,"g",t,n,f),this.updateAll(m),r.parentNode||e.appendChild(r),r=r.nextSibling
}this.scale=u,r=this.stroke(r,t,n),s&&(t.$g=e=s.parentNode,r=s.nextSibling)}}return r
},m.SvgScene.applyCanvasStyle=function(t){t.style.display="inline-block"},m.SvgScene.createRootPanelElement=function(){return this.create("svg")
},m.SvgScene.initRootPanelElement=function(t,e){t.setAttribute("font-size","10px"),t.setAttribute("font-family","sans-serif"),t.setAttribute("fill","none"),t.setAttribute("stroke","none"),t.setAttribute("stroke-width",1.5),this.disableElementSelection(t),this.listenRootPanelElement(t,e)
},m.SvgScene.listenRootPanelElement=function(t,e){for(var r=0,n=this.events,i=n.length;i>r;r++)t.addEventListener(n[r],this.dispatch,!1),e._registerBoundEvent(t,n[r],this.dispatch,!1)
},m.SvgScene.disableElementSelection=function(t){t.setAttribute("style","-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;"),"undefined"!=typeof t.onselectstart&&(t.setAttribute("unselectable","on"),t.onselectstart=function(){return!1
})},m.SvgScene.addPanelClipPath=function(t,e,r,n,i){var o=m.id().toString(36),a=this.expect(e,"g",r,n,{"clip-path":"url(#"+o+")"}),s=this.expect(a.firstChild,"clipPath",r,n,{id:o}),l=s.firstChild||s.appendChild(this.create("rect"));
return l.setAttribute("x",i.left),l.setAttribute("y",i.top),l.setAttribute("width",i.width),l.setAttribute("height",i.height),s.parentNode||a.appendChild(s),a.parentNode||t.appendChild(a),{g:a,next:s.nextSibling}
},m.SvgScene.getSortedChildScenes=function(t,e){var r=t[e].children;return t.mark._zOrderChildCount&&(r=r.slice(0),r.sort(function(t,e){var r=t.mark._zOrder-e.mark._zOrder;
return 0===r&&(r=t.childIndex-e.childIndex),r})),r},m.SvgScene.fill=function(t,e,r){var n=e[r],i=n.fillStyle;
return(i.opacity||"all"==n.events)&&(this.addFillStyleDefinition(e,i),t=this.expect(t,"rect",e,r,{"shape-rendering":n.antialias?null:"crispEdges","pointer-events":n.events,cursor:n.cursor,x:n.left,y:n.top,width:n.width,height:n.height,fill:i.color,"fill-opacity":i.opacity,stroke:null}),t=this.append(t,e,r)),t
},m.SvgScene.stroke=function(t,e,r){var n=e[r],i=n.strokeStyle;return(i.opacity||"all"==n.events)&&(t=this.expect(t,"rect",e,r,{"shape-rendering":n.antialias?null:"crispEdges","pointer-events":"all"==n.events?"stroke":n.events,cursor:n.cursor,x:n.left,y:n.top,width:Math.max(1e-10,n.width),height:Math.max(1e-10,n.height),fill:null,stroke:i.color,"stroke-opacity":i.opacity,"stroke-width":n.lineWidth/this.scale,"stroke-linecap":n.lineCap,"stroke-dasharray":i.opacity?this.parseDasharray(n):null}),t=this.append(t,e,r)),t
},m.SvgScene.minRuleLineWidth=1,m.SvgScene.rule=function(t){for(var e=t.$g.firstChild,r=0;r<t.length;r++){var n=t[r];
if(n.visible){var i=n.strokeStyle;if(i.opacity){var o=n.lineWidth;o=1e-10>o?0:Math.max(this.minRuleLineWidth,o/this.scale),e=this.expect(e,"line",t,r,{"shape-rendering":n.antialias?null:"crispEdges","pointer-events":n.events,cursor:n.cursor,x1:n.left,y1:n.top,x2:n.left+n.width,y2:n.top+n.height,stroke:i.color,"stroke-opacity":i.opacity,"stroke-width":o,"stroke-linecap":n.lineCap,"stroke-dasharray":i.opacity?this.parseDasharray(n):null}),n.svg&&this.setAttributes(e,n.svg),n.css&&this.setStyle(e,n.css),e=this.append(e,t,r)
}}}return e},m.SvgScene.wedge=function(t){for(var e=t.$g.firstChild,r=0;r<t.length;r++){var n=t[r];
if(n.visible){var i=n.fillStyle,o=n.strokeStyle;if(i.opacity||o.opacity){var a,s=n.innerRadius,l=n.outerRadius,u=Math.abs(n.angle);
if(u>=2*Math.PI)a=s?"M0,"+l+"A"+l+","+l+" 0 1,1 0,"+-l+"A"+l+","+l+" 0 1,1 0,"+l+"M0,"+s+"A"+s+","+s+" 0 1,1 0,"+-s+"A"+s+","+s+" 0 1,1 0,"+s+"Z":"M0,"+l+"A"+l+","+l+" 0 1,1 0,"+-l+"A"+l+","+l+" 0 1,1 0,"+l+"Z";
else{var h=Math.min(n.startAngle,n.endAngle),c=Math.max(n.startAngle,n.endAngle),p=Math.cos(h),f=Math.cos(c),d=Math.sin(h),y=Math.sin(c);
a=s?"M"+l*p+","+l*d+"A"+l+","+l+" 0 "+(u<Math.PI?"0":"1")+",1 "+l*f+","+l*y+"L"+s*f+","+s*y+"A"+s+","+s+" 0 "+(u<Math.PI?"0":"1")+",0 "+s*p+","+s*d+"Z":"M"+l*p+","+l*d+"A"+l+","+l+" 0 "+(u<Math.PI?"0":"1")+",1 "+l*f+","+l*y+"L0,0Z"
}this.addFillStyleDefinition(t,i),this.addFillStyleDefinition(t,o),e=this.expect(e,"path",t,r,{"shape-rendering":n.antialias?null:"crispEdges","pointer-events":n.events,cursor:n.cursor,transform:"translate("+n.left+","+n.top+")",d:a,fill:i.color,"fill-rule":"evenodd","fill-opacity":i.opacity||null,stroke:o.color,"stroke-opacity":o.opacity||null,"stroke-width":o.opacity?n.lineWidth/this.scale:null,"stroke-linejoin":n.lineJoin,"stroke-miterlimit":n.strokeMiterLimit,"stroke-linecap":n.lineCap,"stroke-dasharray":o.opacity?this.parseDasharray(n):null}),n.svg&&this.setAttributes(e,n.svg),n.css&&this.setStyle(e,n.css),e=this.append(e,t,r)
}}}return e},m.Mark=function(){this.$properties=[],this.$propertiesMap={},this.$handlers={}
},m.Mark.prototype.properties={},m.Mark.cast={},m.Mark.prototype.property=function(t,e){return this.hasOwnProperty("properties")||(this.properties=m.extend(this.properties)),this.properties[t]=!0,m.Mark.prototype.propertyMethod(t,!1,m.Mark.cast[t]=e),this
},m.Mark.prototype.localProperty=function(t,e){this.hasOwnProperty("properties")||(this.properties=m.extend(this.properties)),this.properties[t]=!0;
var r=m.Mark.cast[t];return e&&(m.Mark.cast[t]=r=e),this.propertyMethod(t,!1,r),this
},m.Mark.prototype.def=function(t,e){return this.propertyMethod(t,!0),this[t](arguments.length>1?e:null)
},m.Mark.prototype.propertyMethod=function(t,e,r){r||(r=m.Mark.cast[t]),this[t]=function(n,i){if(e&&this.scene){var o=this.scene.defs;
if(arguments.length)return o[t]={id:null==n?0:m.id(),value:null!=n&&r?r(n):n},this;
var a=o[t];return a?a.value:null}if(arguments.length)return this.setPropertyValue(t,n,e,r,!1,i),this;
var s=this.instance();return m.propBuildMark===this&&1!==m.propBuilt[t]?(m.propBuilt[t]=1,s[t]=this.evalProperty(this.binds.properties[t])):s[t]
}},m.Mark.funPropertyCaller=function(t,e){function r(){var r=t.apply(this,n);return null!=r?e(r):r
}var n=m.Mark.stack;return r},m.Mark.prototype.setPropertyValue=function(t,e,r,n,i,o){var a=!r<<1|"function"==typeof e;
1&a&&n?e=m.Mark.funPropertyCaller(e,n):null!=e&&n&&(e=n(e));var s=this.$propertiesMap,l=this.$properties,u={name:t,id:m.id(),value:e,type:a,tag:o,proto:null,root:null,_proto:null};
u.root=u;var h=s[t];if(s[t]=u,h)for(var c=0,p=l.length;p>c;c++)if(l[c]===h){l.splice(c,1);
break}return l.push(u),i&&h&&3===a&&(u.proto=h,u.root=h.root),u},m.Mark.prototype.intercept=function(t,e,r){return this.setPropertyValue(t,e,!1,m.get(r,"noCast")?null:m.Mark.cast[t],!0,m.get(r,"tag")),this
},m.Mark.prototype.propertyValue=function(t,e){var r=this.$propertiesMap[t];if(r)return r.value;
if(e){if(this.proto){var n=this.proto._propertyValueRecursive(t);if(void 0!==n)return n
}return this.defaults._propertyValueRecursive(t)}},m.Mark.prototype._propertyValueRecursive=function(t){var e=this.$propertiesMap[t];
return e?e.value:this.proto?this.proto._propertyValueRecursive(t):void 0},m.Mark.stack=[],m.Mark.prototype.property("data").property("visible",Boolean).property("css",Object).property("svg",Object).property("left",Number).property("right",Number).property("top",Number).property("bottom",Number).property("cursor",String).property("title",String).property("reverse",Boolean).property("antialias",Boolean).property("events",m.stringLowerCase).property("id",String),m.Mark.prototype.childIndex=-1,m.Mark.prototype.index=-1,m.Mark.prototype.scale=1,m.Mark.prototype._zOrder=0,m.Mark.prototype.defaults=(new m.Mark).data(function(t){return[t]
}).visible(!0).antialias(!0).events("painted"),m.Mark.prototype.extend=function(t){return this.proto=t,this.target=t.target,this
},m.Mark.prototype.add=function(t){return this.parent.add(t).extend(this)},m.Mark.prototype.zOrder=function(t){if(!arguments.length)return this._zOrder;
if(t=+t||0,this._zOrder!==t){var e=this.parent;e&&0!==this._zOrder&&e._zOrderChildCount--,this._zOrder=t,e&&0!==this._zOrder&&e._zOrderChildCount++
}return this},m.Mark.prototype.anchor=function(t){return new m.Anchor(this).name(t||"center").data(function(){return this.scene.target.map(function(t){return t.data
})}).visible(function(){return this.scene.target[this.index].visible}).id(function(){return this.scene.target[this.index].id
}).left(function(){var t=this.scene.target[this.index],e=t.width||0;switch(this.name()){case"bottom":case"top":case"center":return t.left+e/2;
case"left":return null}return t.left+e}).top(function(){var t=this.scene.target[this.index],e=t.height||0;
switch(this.name()){case"left":case"right":case"center":return t.top+e/2;case"top":return null
}return t.top+e}).right(function(){var t=this.scene.target[this.index];return"left"==this.name()?t.right+(t.width||0):null
}).bottom(function(){var t=this.scene.target[this.index];return"top"==this.name()?t.bottom+(t.height||0):null
}).textAlign(function(){switch(this.name()){case"bottom":case"top":case"center":return"center";
case"right":return"right"}return"left"}).textBaseline(function(){switch(this.name()){case"right":case"left":case"center":return"middle";
case"top":return"top"}return"bottom"})},m.Mark.prototype.anchorTarget=function(){return this.target
},m.Mark.prototype.margin=function(t){return this.left(t).right(t).top(t).bottom(t)
},m.Mark.prototype.instance=function(t){var e=this.scene||this.parent.instance(-1).children[this.childIndex],r=null==t||this.hasOwnProperty("index")?this.index:t;
return e[0>r?e.length-1:r]},m.Mark.prototype.instances=function(t){for(var e,r=this,n=[];!(e=r.scene);)n.push({index:t.parentIndex,childIndex:r.childIndex}),t=t.parent,r=r.parent;
for(var i=n.length;i--;){var o=n[i];e=e[o.index].children[o.childIndex]}if(this.hasOwnProperty("index")){var a=m.extend(e[this.index]);
return a.right=a.top=a.left=a.bottom=0,[a]}return e},m.Mark.prototype.first=function(){return this.scene[0]
},m.Mark.prototype.last=function(){return this.scene[this.scene.length-1]},m.Mark.prototype.sibling=function(){return 0==this.index?null:this.scene[this.index-1]
},m.Mark.prototype.cousin=function(){var t=this.parent,e=t&&t.sibling();return e&&e.children?e.children[this.childIndex][this.index]:null
},m.Mark.prototype._renderId=0,m.Mark.prototype.renderId=function(){return this.root._renderId
},m.Mark.prototype.render=function(){var t=this.root;!this.parent||t.scene?(t._renderId++,this.renderCore()):t.render()
},m.Mark.prototype.renderCore=function(){function t(t,r,i){if(t.scale=i,s>r){var o=r>=n.length;
if(o&&n.unshift(null),t.hasOwnProperty("index"))e(t,r,i,o);else{for(var a=0,l=t.scene.length;l>a;a++)t.index=a,e(t,r,i,o);
delete t.index}o&&n.shift()}else t.build(),m.Scene.scale=i,m.Scene.updateAll(t.scene);
delete t.scale}function e(e,r,i,a){var s,l=e.scene[e.index];if(l.visible){var u=e.children,h=l.children,c=o[r],p=u[c];
for(p.scene||c++,s=0;c>s;s++)u[s].scene=h[s];for(a&&(n[0]=l.data),t(p,r+1,i*l.transform.k),s=0;c>s;s++)u[s].scene=void 0
}}for(var r=this.parent,n=m.Mark.stack,i=n.length,o=[],a=this;a.parent;a=a.parent)o.unshift(a.childIndex);
var s=o.length;for(this.bind();r&&!r.hasOwnProperty("index");)r=r.parent;try{this.context(r?r.scene:void 0,r?r.index:-1,function(){t(this.root,0,1)
})}catch(l){throw n.length>i&&(n.length=i),l}},m.Mark.prototype.bind=function(){function t(t){do for(var a=t.$properties,s=a.length;s--;){var l=a[s],u=l.name,h=r[u];
if(h){var c=n[u];3===c.type&&(c._proto=l,c=n[u]=l.root,c._proto=null)}else switch(r[u]=l,n[u]=l.root,l.root._proto=null,u){case"data":e=l;
break;case"visible":case"id":i.push(l);break;default:o[l.type].push(l)}}while(t=t.proto)
}var e,r={},n={},i=[],o=[[],[],[],[]];t(this),t(this.defaults);var a=o[0],s=o[1].reverse(),l=o[2];
o[3].reverse();var u=this;do for(var h in u.properties)h in r||l.push(r[h]={name:h,type:2,value:null});
while(u=u.proto);var c;if(a.length||s.length){c=a.concat(s);for(var p=0,f=c.length;f>p;p++)this.propertyMethod(c[p].name,!0)
}else c=[];this.binds={properties:r,data:e,defs:c,required:i,optional:m.blend(o)}
},m.Mark.prototype.build=function(){var t=m.Mark.stack,e=this.scene;if(!e){e=this.scene=[],e.mark=this,e.type=this.type,e.childIndex=this.childIndex;
var r=this.parent;r&&(e.parent=r.scene,e.parentIndex=r.index)}this.target&&(e.target=this.target.instances(e));
var n=this.binds.defs;if(n.length)for(var i=e.defs||(e.defs={}),o=0,a=n.length;a>o;o++){var s=n[o],l=i[s.name];
(!l||s.id>l.id)&&(i[s.name]={id:0,value:1&s.type?s.value.apply(this,t):s.value})}var u=this.evalProperty(this.binds.data),h=u.length;
if(e.length=h,h){var c=m.Mark.prototype;t.unshift(null);var p=m.propBuildMark,f=m.propBuilt;
m.propBuildMark=this;try{for(var o=0;h>o;o++){c.index=this.index=o,m.propBuilt={};
var d=e[o];d?d._state&&delete d._state:d=e[o]={},d.data=t[0]=u[o],this.preBuildInstance(d),this.buildInstance(d)
}}finally{c.index=-1,delete this.index,t.shift(),m.propBuildMark=p,m.propBuilt=f}}return this
},m.Mark.prototype.instanceState=function(t){return t||(t=this.instance()),t?t._state||(t._state={}):null
},m.Mark.prototype.preBuildInstance=function(){},m.Mark.prototype.buildInstance=function(t){this.buildProperties(t,this.binds.required),t.visible&&(this.buildProperties(t,this.binds.optional),this.buildImplied(t))
},!function(){var t,e=m.Mark.stack,r=[function(t){return this.scene.defs[t.name].value
},null,function(t){return t.value},function(r){return t=r.proto||r._proto,r.value.apply(this,e)
}];r[1]=r[0],m.Mark.prototype.buildProperties=function(e,n){var i=m.propBuilt,o=!i;
o&&(m.propBuildMark=this,m.propBuilt=i={});for(var a=t,s=0,l=n.length;l>s;s++){var u=n[s],h=u.name;
h in i||(i[h]=1,e[h]=r[u.type].call(this,u))}t=a,o&&(m.propBuildMark=m.propBuilt=null)
},m.Mark.prototype.evalProperty=function(e){var n=t,i=r[e.type].call(this,e);return t=n,i
},m.Mark.prototype.evalInPropertyContext=function(r,n){var i=t;t=n;var o=r.apply(this,e);
return t=i,o},m.Mark.prototype.delegate=function(e,r){if(t&&(!r||t.tag===r)){var n=this.evalProperty(t);
if(void 0!==n)return n}return e},m.Mark.prototype.delegateExcept=function(e,r){if(t&&(!r||t.tag!==r)){var n=this.evalProperty(t);
if(void 0!==n)return n}return e},m.Mark.prototype.hasDelegate=function(e){return!(!t||e&&t.tag!==e)
}}(),m.Mark.prototype.buildImplied=function(t){var e,r,n=t.left,i=t.right,o=t.top,a=t.bottom,s=this.properties,l=s.width?t.width:0,u=s.height?t.height:0;
if(null==l||null==i||null==n){e=this.parent&&this.parent.instance(),r=!0;var h=e?e.width:l+n+i;
null==l?l=h-(i=i||0)-(n=n||0):null==i?null==n?n=i=(h-l)/2:i=h-l-n:n=h-l-i}if(null==u||null==a||null==o){r||(e=this.parent&&this.parent.instance());
var c=e?e.height:u+o+a;null==u?u=c-(o=o||0)-(a=a||0):null==a?a=null==o?o=(c-u)/2:c-u-o:o=c-u-a
}t.left=n,t.right=i,t.top=o,t.bottom=a,s.width&&(t.width=l),s.height&&(t.height=u),s.textStyle&&!t.textStyle&&(t.textStyle=m.FillStyle.transparent),s.fillStyle&&!t.fillStyle&&(t.fillStyle=m.FillStyle.transparent),s.strokeStyle&&!t.strokeStyle&&(t.strokeStyle=m.FillStyle.transparent)
},m.Mark.prototype.mouse=function(){var t=this.root.canvas(),e=m.event,r=e&&e.pageX||0,n=e&&e.pageY||0,i=m.elementOffset(t);
if(i){var o=m.cssStyle(t);r-=i.left+parseFloat(o("paddingLeft")||0),n-=i.top+parseFloat(o("paddingTop")||0)
}var a=m.Transform.identity,s=this.properties.transform?this:this.parent,l=[];do l.push(s);
while(s=s.parent);for(;s=l.pop();){var u=s.instance();a=a.translate(u.left,u.top).times(u.transform)
}return a=a.invert(),m.vector(r*a.k+a.x,n*a.k+a.y)},m.Mark.prototype.event=function(t,e){e=m.functor(e);
var r=this.$handlers[t];return r?r instanceof Array?r.push(e):r=[r,e]:r=e,this.$hasHandlers=!0,this.$handlers[t]=r,this
},m.Mark.prototype.context=function(t,e,r){function n(t,e){if(m.Mark.scene=t,o.index=e,t){var r,n=t.mark,i=n,s=[];
do s.push(i),a.push(t[e].data),i.index=e,i.scene=t,(i=i.parent)&&(e=t.parentIndex,t=t.parent);
while(i);var l=1;if(r=s.length-1,r>0)do i=s[r--],i.scale=l,l*=i.scene[i.index].transform.k;
while(r);n.scale=l;var u,h=n.children;if(h&&(u=h.length)>0){var c=n.scene[n.index];
l*=c.transform.k;var p=c.children;for(r=u;r--;)i=h[r],i.scene=p[r],i.scale=l}}}function i(t){if(t){var e,r=t.mark,n=r.children;
if(n)for(var i=n.length;i--;)e=n[i],e.scene=void 0,e.scale=1;e=r;var o,s=0;do s++,delete e.index,(o=e.parent)&&(e.scene=void 0,e.scale=1);
while(e=o);s&&(a.length-=s)}}var o=m.Mark.prototype,a=m.Mark.stack,s=m.Mark.scene,l=o.index;
if(t&&t===s&&e===l)try{r.apply(this,a)}catch(u){throw m.error(u),u}finally{m.Mark.scene=s,o.index=l
}else{i(s,l),n(t,e);try{r.apply(this,a)}catch(u){throw m.error(u),u}finally{i(t,e),n(s,l)
}}},m.Mark.prototype.getEventHandler=function(t,e,r,n){var i=this.$handlers[t];return i?[i,e,r,n]:this.getParentEventHandler(t,e,r,n)
},m.Mark.prototype.getParentEventHandler=function(t,e,r,n){var i=e.parent;return i?i.mark.getEventHandler(t,i,e.parentIndex,n):void 0
},m.Mark.dispatch=function(t,e,r,n){var i=e.mark.root;if(i.$transition)return!0;var o,a=i.$interceptors&&i.$interceptors[t];
if(a)for(var s=0,l=a.length;l>s&&!(o=a[s](t,n));s++)if(o===!1)return!0;return o||(o=e.mark.getEventHandler(t,e,r,n))?this.handle.apply(this,o):!1
},m.Mark.handle=function(t,e,r,n){var i=e.mark;return i.context(e,r,function(){var e,r,o,a=m.Mark.stack.concat(n);
if(t instanceof Array){var s;for(e=0,r=t.length;r>e;e++)o=t[e].apply(i,a),o&&o.render&&(s||(s=[])).push(o);
if(s)for(e=0,r=s.length;r>e;e++)s[e].render()}else o=t.apply(i,a),o&&o.render&&o.render()
}),!0},m.Mark.prototype.addEventInterceptor=function(t,e,r){var n=this.root;if(n){var i=n.$interceptors||(n.$interceptors={}),o=i[t]||(i[t]=[]);
r?o.unshift(e):o.push(e)}},m.Mark.prototype.eachInstance=function(t,e){function r(n,o,s){var l=n.length;
if(l>0){var u,h=o===a;h||(u=i[o]);for(var c=0;l>c;c++){var p=n[c];if(p.visible)if(o===a)t.call(e,n,c,s);
else{var f=p.children[u];if(f){var d=s.times(p.transform).translate(p.left,p.top);
r(f,o+1,d)}}}}}for(var n=this,i=[];n.parent;)i.unshift(n.childIndex),n=n.parent;var o=n.scene;
if(o){var a=i.length;r(o,0,m.Transform.identity)}},m.Mark.prototype.toScreenTransform=function(){var t=m.Transform.identity;
this instanceof m.Panel&&(t=t.translate(this.left(),this.top()).times(this.transform()));
var e=this.parent;if(e)do t=t.translate(e.left(),e.top()).times(e.transform());while(e=e.parent);
return t},m.Mark.prototype.transition=function(){return new m.Transition(this)},m.Mark.prototype.on=function(t){return this["$"+t]=new m.Transient(this)
},m.Mark.prototype.getShape=function(t,e,r){var n=t[e];if(!n.visible)return null;
null==r&&(r=0);var i="_shape_inset_"+r;return n[i]||(n[i]=this.getShapeCore(t,e,r))
},m.Mark.prototype.getShapeCore=function(t,e,r){var n=t[e],i=n.left,o=n.top,a=n.width,s=n.height;
if(r>0&&1>=r){var l=r*a,u=r*s;i+=l,o+=u,a-=2*l,s-=2*u}return new m.Shape.Rect(i,o,a,s)
},m.Mark.prototype.pointingRadiusMax=function(t){return arguments.length?(t=+t,this._pointingRadiusMax=isNaN(t)||0>t?0:t,this):this._pointingRadiusMax
},m.Mark.prototype._pointingRadiusMax=1/0,m.Anchor=function(t){m.Mark.call(this),this.target=t,this.parent=t.parent
},m.Anchor.prototype=m.extend(m.Mark).property("name",String),m.Anchor.prototype.extend=function(t){return this.proto=t,this
},m.Area=function(){m.Mark.call(this)},m.Area.castSegmented=function(t){if(!t)return"";
switch(t=String(t).toLowerCase()){case"smart":case"full":break;default:t="full"}return t
},m.Area.prototype=m.extend(m.Mark).property("width",Number).property("height",Number).property("lineWidth",Number).property("lineJoin",m.stringLowerCase).property("strokeMiterLimit",Number).property("lineCap",m.stringLowerCase).property("strokeDasharray",m.stringLowerCase).property("strokeStyle",m.fillStyle).property("fillStyle",m.fillStyle).property("segmented",m.Area.castSegmented).property("interpolate",m.stringLowerCase).property("tension",Number),m.Area.prototype.type="area",m.Area.prototype.defaults=(new m.Area).extend(m.Mark.prototype.defaults).lineWidth(1.5).fillStyle(m.Colors.category20().by(m.parent)).interpolate("linear").tension(.7).lineJoin("miter").strokeMiterLimit(8).lineCap("butt").strokeDasharray("none"),m.Area.prototype.buildImplied=function(t){null==t.height&&(t.height=0),null==t.width&&(t.width=0),m.Mark.prototype.buildImplied.call(this,t)
},m.Area.fixed={lineWidth:1,lineJoin:1,strokeMiterLimit:1,lineCap:1,strokeStyle:1,strokeDasharray:1,fillStyle:1,segmented:1,interpolate:1,tension:1},m.Area.prototype.bind=function(){m.Mark.prototype.bind.call(this);
for(var t=this.binds,e=t.required,r=t.optional,n=0,i=r.length;i>n;n++){var o=r[n];
o.fixed=o.name in m.Area.fixed,"segmented"==o.name&&(e.push(o),r.splice(n,1),n--,i--)
}this.binds.$required=e,this.binds.$optional=r},m.Area.prototype.buildInstance=function(t){function e(t){return!t.fixed||(n.push(t),!1)
}var r=this.binds;if(this.index){var n=r.fixed;n||(n=r.fixed=[],r.required=r.required.filter(e),this.scene[0].segmented||(r.optional=r.optional.filter(e)));
var i=n.length;if(i)for(var o=this.scene[0],a=0;i>a;a++){var s=n[a].name;t[s]=o[s]
}}else r.required=r.$required,r.optional=r.$optional,r.fixed=null;m.Mark.prototype.buildInstance.call(this,t)
},m.Area.prototype.anchor=function(t){return m.Mark.prototype.anchor.call(this,t).interpolate(function(){return this.scene.target[this.index].interpolate
}).eccentricity(function(){return this.scene.target[this.index].eccentricity}).tension(function(){return this.scene.target[this.index].tension
})},m.Area.prototype.getEventHandler=function(t,e,r,n){var i=e[r],o=1===m.Scene.mousePositionEventSet[t]&&(!i.segmented||"smart"===i.segmented);
if(!o)return m.Mark.prototype.getEventHandler.call(this,t,e,r,n);var a,s="mousemove"===t?this.$handlers.mouseover:null,l=this.$handlers[t],u=l||s;
return u&&(a=this.getNearestInstanceToMouse(e,r),s&&!this.filterMouseMove(e,a)&&(s=null,u=l)),u?(l&&s&&(u=[].concat(l,s)),[u,e,a,n]):this.getParentEventHandler(t,e,r,n)
},m.Area.prototype.filterMouseMove=function(t,e){var r=this._mouseOverScene;return r&&r===t&&this._mouseOverIndex===e?void 0:(this._mouseOverScene=t,this._mouseOverIndex=e,!0)
},m.Area.prototype.getNearestInstanceToMouse=function(t,e){for(var r=this.mouse(),n=1/0,i=null,o=e,a=t.length;a>o;o++){var s=this.getShape(t,o);
if(s){if(s.containsPoint(r))return o;var l=s.distance2(r).dist2;n>l&&(n=l,i=o)}}return null!=i?i:e
},m.Area.prototype.getShapeCore=function(t,e){var r=t[e],n=r.width||0,i=r.height||0,o=r.left,a=r.top,s=e+1<t.length?t[e+1]:null;
if(!s||!s.visible)return new m.Shape.Line(o,a,o+n,a+i);var l=s.left,u=s.top,h=s.height||0,c=s.width||0;
return new m.Shape.Polygon([new m.Vector(o,a),new m.Vector(l,u),new m.Vector(l+c,u+h),new m.Vector(o+n,a+i)])
},m.Bar=function(){m.Mark.call(this)},m.Bar.prototype=m.extend(m.Mark).property("width",Number).property("height",Number).property("lineWidth",Number).property("strokeStyle",m.fillStyle).property("fillStyle",m.fillStyle).property("lineCap",m.stringLowerCase).property("strokeDasharray",m.stringLowerCase),m.Bar.prototype.type="bar",m.Bar.prototype.defaults=(new m.Bar).extend(m.Mark.prototype.defaults).lineWidth(1.5).fillStyle(m.Colors.category20().by(m.parent)).lineCap("butt").strokeDasharray("none"),m.Dot=function(){m.Mark.call(this)
},m.Dot.prototype=m.extend(m.Mark).property("shape",m.stringLowerCase).property("shapeAngle",Number).property("shapeRadius",Number).property("shapeSize",Number).property("aspectRatio",Number).property("lineWidth",Number).property("strokeStyle",m.fillStyle).property("lineCap",m.stringLowerCase).property("strokeDasharray",m.stringLowerCase).property("fillStyle",m.fillStyle),m.Dot.prototype.type="dot",m.Dot.prototype.defaults=(new m.Dot).extend(m.Mark.prototype.defaults).shape("circle").aspectRatio(1).lineWidth(1.5).strokeStyle(m.Colors.category10().by(m.parent)).lineCap("butt").strokeDasharray("none"),m.Dot.prototype.anchor=function(t){return m.Mark.prototype.anchor.call(this,t).left(function(){var t=this.scene.target[this.index];
switch(this.name()){case"bottom":case"top":case"center":return t.left;case"left":return null
}return t.left+t._width/2}).right(function(){var t=this.scene.target[this.index];
return"left"==this.name()?t.right+t._width/2:null}).top(function(){var t=this.scene.target[this.index];
switch(this.name()){case"left":case"right":case"center":return t.top;case"top":return null
}return t.top+t._height/2}).bottom(function(){var t=this.scene.target[this.index];
return"top"==this.name()?t.bottom+t._height/2:null}).textAlign(function(){switch(this.name()){case"left":return"right";
case"bottom":case"top":case"center":return"center"}return"left"}).textBaseline(function(){switch(this.name()){case"right":case"left":case"center":return"middle";
case"bottom":return"top"}return"bottom"})},m.Dot.prototype.buildImplied=function(t){var e=t.shapeRadius,r=t.shapeSize,n=t.aspectRatio||1;
null==e?null==r?(r=t.shapeSize=20.25,e=t.shapeRadius=4.5):e=t.shapeRadius=Math.sqrt(r):null==r&&(r=t.shapeSize=e*e);
var i,o;1===n||0>n?i=o=2*e:(i=2*e/Math.sqrt(n),o=n*i),t._height=i,t._width=o,m.Mark.prototype.buildImplied.call(this,t)
},m.Dot.prototype.width=function(){return this.instance()._width},m.Dot.prototype.height=function(){return this.instance()._height
},m.Dot.prototype.getShapeCore=function(t,e){var r=t[e],n=r._width,i=r._height,o=r.left,a=r.top;
switch(r.shape){case"diamond":n*=Math.SQRT2,i*=Math.SQRT2;case"square":case"cross":return new m.Shape.Rect(o-i/2,a-n/2,i,n)
}return new m.Shape.Circle(o,a,r.shapeRadius)},m.Label=function(){m.Mark.call(this)
},m.Label.prototype=m.extend(m.Mark).property("text",String).property("font",String).property("textAngle",Number).property("textStyle",m.color).property("textAlign",m.stringLowerCase).property("textBaseline",m.stringLowerCase).property("textMargin",Number).property("textDecoration",String).property("textShadow",String),m.Label.prototype.type="label",m.Label.prototype.defaults=(new m.Label).extend(m.Mark.prototype.defaults).events("none").text(m.identity).font("10px sans-serif").textAngle(0).textStyle("black").textAlign("left").textBaseline("bottom").textMargin(3),m.Label.prototype.getShapeCore=function(t,e,r){var n=t[e],i=m.Text.measure(n.text,n.font),o=n.left,a=n.top,s=i.width,l=i.height;
if(r>0&&1>=r){var u=r*s,h=r*l;o+=u,a+=h,s-=2*u,l-=2*h}return m.Label.getPolygon(s,l,n.textAlign,n.textBaseline,n.textAngle,n.textMargin).apply(m.Transform.identity.translate(o,a))
},m.Label.getPolygon=function(t,e,r,n,i,o){var a,s;switch(n){case"middle":s=e/2;break;
case"top":s=o+e;break;case"bottom":s=-o}switch(r){case"right":a=-o-t;break;case"center":a=-t/2;
break;case"left":a=o}var l=new m.Vector(a,s),u=l.plus(t,0),h=u.plus(0,-e),c=l.plus(0,-e);
return 0!==i&&(l=l.rotate(i),u=u.rotate(i),c=c.rotate(i),h=h.rotate(i)),new m.Shape.Polygon([l,u,h,c])
},m.Line=function(){m.Mark.call(this)},m.Line.prototype=m.extend(m.Mark).property("lineWidth",Number).property("lineJoin",m.stringLowerCase).property("strokeMiterLimit",Number).property("lineCap",m.stringLowerCase).property("strokeStyle",m.fillStyle).property("strokeDasharray",m.stringLowerCase).property("fillStyle",m.fillStyle).property("segmented",m.Area.castSegmented).property("interpolate",m.stringLowerCase).property("eccentricity",Number).property("tension",Number),m.Line.prototype.type="line",m.Line.prototype.defaults=(new m.Line).extend(m.Mark.prototype.defaults).lineWidth(1.5).strokeStyle(m.Colors.category10().by(m.parent)).interpolate("linear").eccentricity(0).tension(.7).lineJoin("miter").strokeMiterLimit(8).lineCap("butt").strokeDasharray("none"),m.Line.prototype.bind=m.Area.prototype.bind,m.Line.prototype.buildInstance=m.Area.prototype.buildInstance,m.Line.prototype.getEventHandler=m.Area.prototype.getEventHandler,m.Line.prototype.getNearestInstanceToMouse=m.Area.prototype.getNearestInstanceToMouse,m.Line.prototype.filterMouseMove=m.Area.prototype.filterMouseMove,m.Line.prototype.anchor=function(t){return m.Area.prototype.anchor.call(this,t).textAlign(function(){switch(this.name()){case"left":return"right";
case"bottom":case"top":case"center":return"center";case"right":return"left"}}).textBaseline(function(){switch(this.name()){case"right":case"left":case"center":return"middle";
case"top":return"bottom";case"bottom":return"top"}})},m.Line.prototype.getShapeCore=function(t,e){var r=t[e],n=e+1<t.length?t[e+1]:null;
return null!=n&&n.visible?new m.Shape.Line(r.left,r.top,n.left,n.top):new m.Shape.Point(r.left,r.top)
},m.Rule=function(){m.Mark.call(this)},m.Rule.prototype=m.extend(m.Mark).property("width",Number).property("height",Number).property("lineWidth",Number).property("strokeStyle",m.fillStyle).property("lineCap",m.stringLowerCase).property("strokeDasharray",m.stringLowerCase),m.Rule.prototype.type="rule",m.Rule.prototype.defaults=(new m.Rule).extend(m.Mark.prototype.defaults).lineWidth(1).strokeStyle("black").antialias(!1).lineCap("butt").strokeDasharray("none"),m.Rule.prototype.anchor=m.Line.prototype.anchor,m.Rule.prototype.buildImplied=function(t){var e=t.left,r=t.right;
t.top,t.bottom,null!=t.width||null==e&&null==r||null!=r&&null!=e?t.height=0:t.width=0,m.Mark.prototype.buildImplied.call(this,t)
},m.Rule.prototype.getShapeCore=function(t,e){var r=t[e];return new m.Shape.Line(r.left,r.top,r.left+r.width,r.top+r.height)
},m.Panel=function(){m.Bar.call(this),this.children=[],this.root=this,this.$dom=m.$&&m.$.s
},m.Panel.prototype=m.extend(m.Bar).property("transform").property("overflow",m.stringLowerCase).property("canvas",function(t){return"string"==typeof t?document.getElementById(t):t
}),m.Panel.prototype.type="panel",m.Panel.prototype.isPointingBarrier=!1,m.Panel.prototype._zOrderChildCount=0,m.Panel.prototype.defaults=(new m.Panel).extend(m.Bar.prototype.defaults).fillStyle(null).overflow("visible"),m.Panel.prototype.anchor=function(t){var e=m.Bar.prototype.anchor.call(this,t);
return e.parent=this,e},m.Panel.prototype.add=function(t){var e=new t;e.parent=this,e.root=this.root,e.childIndex=this.children.length,this.children.push(e);
var r=+e._zOrder||0;return 0!==r&&this._zOrderChildCount++,e},m.Panel.prototype.bind=function(){m.Mark.prototype.bind.call(this);
for(var t=this.children,e=0,r=t.length;r>e;e++)t[e].bind()},m.Panel.prototype.buildInstance=function(t){if(m.Bar.prototype.buildInstance.call(this,t),t.visible){var e=this.scale*t.transform.k;
m.Mark.prototype.index=-1;for(var r,n=this.children,i=t.children||(t.children=[]),o=0,a=n.length;a>o;o++)r=n[o],r.scene=i[o],r.scale=e,r.build();
for(o=a;o--;)r=n[o],i[o]=r.scene,delete r.scene,delete r.scale;i.length=a}},m.Panel.prototype.buildImplied=function(t){this.parent||this._buildRootInstanceImplied(t)?(t.transform||(t.transform=m.Transform.identity),m.Mark.prototype.buildImplied.call(this,t)):t.visible=!1
},m.Panel.prototype._buildRootInstanceImplied=function(t){var e=t.canvas;if(e){if(!this._rootInstanceStealCanvas(t,e))return!1;
this._rootInstanceInitCanvas(t,e)}else t.canvas=this._rootInstanceGetInlineCanvas(t);
return!0},m.Panel.prototype._rootInstanceStealCanvas=function(t,e){var r=e.$panel;
if(r!==this){if(r){if(this.$lastCreateId)return!1;r._disposeRootPanel(),this._updateCreateId(e)
}e.$panel=this,m.removeChildren(e)}else this._updateCreateId(e);return!0},m.Panel.prototype._registerBoundEvent=function(t,e,r,n){if(t.removeEventListener){var i=this._boundEvents||(this._boundEvents=[]);
i.push([t,e,r,n])}},m.Panel.prototype.dispose=function(){var t=this.root;t._disposeRootPanel();
var e=t.canvas();t.canvas(null),e.$panel=null,t.binds=null;var r=t.scene;r&&(r.$defs=null,r.$g=null,t.scene=null)
},m.Panel.prototype._disposeRootPanel=function(){var t=this.$transition;t&&t.stop();
var e=this._boundEvents;if(e){this._boundEvents=null;for(var r=0,n=e.length;n>r;r++){var i=e[r];
i[0].removeEventListener(i[1],i[2],i[3])}}},m.Panel.prototype._rootInstanceInitCanvas=function(t,e){var r,n,i;
null==t.width&&(i=m.cssStyle(e),r=parseFloat(i("width")||0),t.width=r-t.left-t.right),null==t.height&&(i||(i=m.cssStyle(e)),n=parseFloat(i("height")||0),t.height=n-t.top-t.bottom),i=null
},m.Panel.prototype._rootInstanceGetInlineCanvas=function(){var t,e=this.$canvas||(this.$canvas=[]);
if(!(t=e[this.index]))if(t=e[this.index]=document.createElement("span"),this.$dom)this.$dom.parentNode.insertBefore(t,this.$dom);
else{for(var r=document.body;r.lastChild&&r.lastChild.tagName;)r=r.lastChild;r!=document.body&&(r=r.parentNode),r.appendChild(t)
}return t},m.Panel.prototype._updateCreateId=function(t){this.$lastCreateId=t.$pvCreateId=(t.$pvCreateId||0)+1
},m.Image=function(){m.Bar.call(this)},m.Image.prototype=m.extend(m.Bar).property("url",String).property("imageWidth",Number).property("imageHeight",Number),m.Image.prototype.type="image",m.Image.prototype.defaults=(new m.Image).extend(m.Bar.prototype.defaults).fillStyle(null),m.Image.prototype.image=function(t){return this.$image=function(){var e=t.apply(this,arguments);
return null==e?m.Color.transparent:"string"==typeof e?m.color(e):e},this},m.Image.prototype.bind=function(){m.Bar.prototype.bind.call(this);
var t=this.binds,e=this;do t.image=e.$image;while(!t.image&&(e=e.proto))},m.Image.prototype.buildImplied=function(t){if(m.Bar.prototype.buildImplied.call(this,t),t.visible&&(null==t.imageWidth&&(t.imageWidth=t.width),null==t.imageHeight&&(t.imageHeight=t.height),null==t.url&&this.binds.image)){var e,r=this.$canvas||(this.$canvas=document.createElement("canvas")),n=r.getContext("2d"),i=t.imageWidth,o=t.imageHeight,a=m.Mark.stack;
r.width=i,r.height=o,e=(t.image=n.createImageData(i,o)).data,a.unshift(null,null);
for(var s=0,l=0;o>s;s++){a[1]=s;for(var u=0;i>u;u++){a[0]=u;var h=this.binds.image.apply(this,a);
e[l++]=h.r,e[l++]=h.g,e[l++]=h.b,e[l++]=255*h.a}}a.splice(0,2)}},m.Wedge=function(){m.Mark.call(this)
},m.Wedge.prototype=m.extend(m.Mark).property("startAngle",Number).property("endAngle",Number).property("angle",Number).property("innerRadius",Number).property("outerRadius",Number).property("lineWidth",Number).property("strokeStyle",m.fillStyle).property("lineJoin",m.stringLowerCase).property("strokeMiterLimit",Number).property("lineCap",m.stringLowerCase).property("strokeDasharray",m.stringLowerCase).property("fillStyle",m.fillStyle),m.Wedge.prototype.type="wedge",m.Wedge.prototype.defaults=(new m.Wedge).extend(m.Mark.prototype.defaults).startAngle(function(){var t=this.sibling();
return t?t.endAngle:-Math.PI/2}).innerRadius(0).lineWidth(1.5).strokeStyle(null).fillStyle(m.Colors.category20().by(m.index)).lineJoin("miter").strokeMiterLimit(8).lineCap("butt").strokeDasharray("none"),m.Wedge.prototype.midRadius=function(){return(this.innerRadius()+this.outerRadius())/2
},m.Wedge.prototype.midAngle=function(){return(this.startAngle()+this.endAngle())/2
},m.Wedge.prototype.anchor=function(t){function e(t){return t.innerRadius||t.angle<2*Math.PI
}function r(t){return(t.innerRadius+t.outerRadius)/2}function n(t){return(t.startAngle+t.endAngle)/2
}return m.Mark.prototype.anchor.call(this,t).left(function(){var t=this.scene.target[this.index];
if(e(t))switch(this.name()){case"outer":return t.left+t.outerRadius*Math.cos(n(t));
case"inner":return t.left+t.innerRadius*Math.cos(n(t));case"start":return t.left+r(t)*Math.cos(t.startAngle);
case"center":return t.left+r(t)*Math.cos(n(t));case"end":return t.left+r(t)*Math.cos(t.endAngle)
}return t.left}).top(function(){var t=this.scene.target[this.index];if(e(t))switch(this.name()){case"outer":return t.top+t.outerRadius*Math.sin(n(t));
case"inner":return t.top+t.innerRadius*Math.sin(n(t));case"start":return t.top+r(t)*Math.sin(t.startAngle);
case"center":return t.top+r(t)*Math.sin(n(t));case"end":return t.top+r(t)*Math.sin(t.endAngle)
}return t.top}).textAlign(function(){var t=this.scene.target[this.index];if(e(t))switch(this.name()){case"outer":return m.Wedge.upright(n(t))?"right":"left";
case"inner":return m.Wedge.upright(n(t))?"left":"right"}return"center"}).textBaseline(function(){var t=this.scene.target[this.index];
if(e(t))switch(this.name()){case"start":return m.Wedge.upright(t.startAngle)?"top":"bottom";
case"end":return m.Wedge.upright(t.endAngle)?"bottom":"top"}return"middle"}).textAngle(function(){var t=this.scene.target[this.index],r=0;
if(e(t))switch(this.name()){case"center":case"inner":case"outer":r=n(t);break;case"start":r=t.startAngle;
break;case"end":r=t.endAngle}return m.Wedge.upright(r)?r:r+Math.PI})},m.Wedge.upright=function(t){return t%=2*Math.PI,t=0>t?2*Math.PI+t:t,t<Math.PI/2||t>=3*Math.PI/2
},m.Wedge.prototype.buildImplied=function(t){null==t.angle?t.angle=t.endAngle-t.startAngle:null==t.endAngle&&(t.endAngle=t.startAngle+t.angle),m.Mark.prototype.buildImplied.call(this,t)
},m.Wedge.prototype.getShapeCore=function(t,e){var r=t[e];return new m.Shape.Wedge(r.left,r.top,r.innerRadius,r.outerRadius,r.startAngle,r.angle)
},m.Ease=function(){function t(t){return function(e){return 1-t(1-e)}}function e(t){return function(e){return.5*(.5>e?t(2*e):2-t(2-2*e))
}}function r(t){return function(e){return 0>e?0:e>1?1:Math.pow(e,t)}}function n(t){return 1-Math.cos(t*Math.PI/2)
}function i(t){return t?Math.pow(2,10*(t-1))-.001:0}function o(t){return-(Math.sqrt(1-t*t)-1)
}function a(t,e){var r;return e||(e=.45),!t||1>t?(t=1,r=e/4):r=e/(2*Math.PI)*Math.asin(1/t),function(n){return 0>=n||n>=1?n:-(t*Math.pow(2,10*--n)*Math.sin(2*(n-r)*Math.PI/e))
}}function s(t){return t||(t=1.70158),function(e){return e*e*((t+1)*e-t)}}function l(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375
}var u=r(2),h=r(3),c=a(),p=s(),f={linear:m.identity,"quad-in":u,"quad-out":t(u),"quad-in-out":e(u),"quad-out-in":e(t(u)),"cubic-in":h,"cubic-out":t(h),"cubic-in-out":e(h),"cubic-out-in":e(t(h)),"sin-in":n,"sin-out":t(n),"sin-in-out":e(n),"sin-out-in":e(t(n)),"exp-in":i,"exp-out":t(i),"exp-in-out":e(i),"exp-out-in":e(t(i)),"circle-in":o,"circle-out":t(o),"circle-in-out":e(o),"circle-out-in":e(t(o)),"elastic-in":c,"elastic-out":t(c),"elastic-in-out":e(c),"elastic-out-in":e(t(c)),"back-in":p,"back-out":t(p),"back-in-out":e(p),"back-out-in":e(t(p)),"bounce-in":l,"bounce-out":t(l),"bounce-in-out":e(l),"bounce-out-in":e(t(l))};
return m.ease=function(t){return f[t]},{reverse:t,reflect:e,linear:function(){return m.identity
},sin:function(){return n},exp:function(){return i},circle:function(){return o},elastic:a,back:s,bounce:l,poly:r}
}(),m.Transient=function(t){m.Mark.call(this),this.fillStyle(null).strokeStyle(null).textStyle(null),this.on=function(e){return t.on(e)
}},m.Transient.prototype=m.extend(m.Mark),!function(){function t(t){for(var e={},r=t.length;r--;){var n=t[r],i=n.id;
i&&(e[i]=n)}return e}function e(t,e,r,n){var i;if(e in a){var o=m.Scale.interpolator(r[e],n[e]);
i=function(t){r[e]=o(t)}}else i=function(t){t>.5&&(r[e]=n[e])};i.next=t.head,t.head=i
}function r(t,r,n){for(var o in r)"children"!==o&&r[o]!=n[o]&&e(t,o,r,n);var a=r.children;
if(a)for(var s=n.children,l=0,u=a.length;u>l;l++)i(t,a[l],s[l])}function n(t,e,r,n){var i,o=Object.create(t[e]),a=t.mark,l=a.root.scene;
n.target&&(i=n.target[n.length])&&(t=Object.create(t),t.target=Object.create(n.target),t.target[e]=i),r||(r=s);
var u=r.$properties,h=r.$propertiesMap;return u=a.binds.optional.filter(function(t){return!(t.name in h)
}).concat(u),a.context(t,e,function(){this.buildProperties(o,u),this.buildImplied(o)
}),a.root.scene=l,o}function i(e,i,o){for(var a,s,l=i.mark,u=t(i),h=t(o),c=0,p=i.length;p>c;c++)if(a=i[c],s=a.id?h[a.id]:o[c],a.index=c,a.visible){if(!s||!s.visible){var f=n(i,c,l.$exit,o);
a.transition=s?2:(o.push(f),1),s=f}r(e,a,s)}for(c=0,p=o.length;p>c;c++)if(s=o[c],a=s.id?u[s.id]:i[c],(!a||!a.visible)&&s.visible){var d=n(o,c,l.$enter,i);
a?i[a.index]=d:i.push(d),r(e,d,s)}}function o(t){for(var e=0,r=0;e<t.length;e++){var n=t[e];
1!=n.transition&&(t[r++]=n,2==n.transition&&(n.visible=!1),n.children&&n.children.forEach(o))
}t.length=r}var a={top:1,left:1,right:1,bottom:1,width:1,height:1,innerRadius:1,outerRadius:1,radius:1,shapeRadius:1,shapeSize:1,startAngle:1,endAngle:1,angle:1,fillStyle:1,strokeStyle:1,lineWidth:1,eccentricity:1,tension:1,textAngle:1,textStyle:1,textMargin:1},s=new m.Transient;
m.Transition=function(t){function e(e){var i=t.root.$transition===s;if(i&&(t.root.$transition=null),null!=r&&(clearInterval(r),r=null),i&&h(t.scene),n){var o=n;
n=null,o(e)}return e}var r,n,a,s=this,l=m.ease("cubic-in-out"),u=250,h=function(t){a||(a=!0,o(t))
};s.ease=function(t){return arguments.length?(l="function"==typeof t?t:m.ease(t),s):l
},s.duration=function(t){return arguments.length?(u=Number(t),s):u},s.start=function(o){if(t.parent)throw new Error("Animated partial rendering is not supported.");
n=o;var a=t.root;if(a.$transition)try{a.$transition.stop()}catch(c){return e(!1)}var p,f;
a.$transition=s,a._renderId++;var d=t.scene;t.scene=null;var y=m.Mark.prototype.index;
try{t.bind(),t.build();var g=t.scene;t.scene=d,m.Mark.prototype.index=y,f=Date.now(),p={},i(p,d,g)
}catch(c){return m.Mark.prototype.index=y,e(!1)}if(!p.head)return e(!0);var v=function(){var r=Math.max(0,Math.min(1,(Date.now()-f)/u)),n=l(r),i=p.head;
do i(n);while(i=i.next);1===r?(h(t.scene),m.Scene.updateAll(d),e(!0)):m.Scene.updateAll(d)
};r=setInterval(function(){try{v()}catch(t){e(!1)}},24)},s.stop=function(){e(!0)}
}}(),m.simulation=function(t){return new m.Simulation(t)},m.Simulation=function(t){for(var e=0;e<t.length;e++)this.particle(t[e])
},m.Simulation.prototype.particle=function(t){return t.next=this.particles,isNaN(t.px)&&(t.px=t.x),isNaN(t.py)&&(t.py=t.y),isNaN(t.fx)&&(t.fx=0),isNaN(t.fy)&&(t.fy=0),this.particles=t,this
},m.Simulation.prototype.force=function(t){return t.next=this.forces,this.forces=t,this
},m.Simulation.prototype.constraint=function(t){return t.next=this.constraints,this.constraints=t,this
},m.Simulation.prototype.stabilize=function(t){var e;arguments.length||(t=3);for(var r=0;t>r;r++){var n=new m.Quadtree(this.particles);
for(e=this.constraints;e;e=e.next)e.apply(this.particles,n)}for(var i=this.particles;i;i=i.next)i.px=i.x,i.py=i.y;
return this},m.Simulation.prototype.step=function(){var t,e,r;for(t=this.particles;t;t=t.next){var n=t.px,i=t.py;
t.px=t.x,t.py=t.y,t.x+=t.vx=t.x-n+t.fx,t.y+=t.vy=t.y-i+t.fy}var o=new m.Quadtree(this.particles);
for(r=this.constraints;r;r=r.next)r.apply(this.particles,o);for(t=this.particles;t;t=t.next)t.fx=t.fy=0;
for(e=this.forces;e;e=e.next)e.apply(this.particles,o)},m.Quadtree=function(t){function e(t,e,n,i,o,a){if(!isNaN(e.x)&&!isNaN(e.y))if(t.leaf)if(t.p)if(Math.abs(t.p.x-e.x)+Math.abs(t.p.y-e.y)<.01)r(t,e,n,i,o,a);
else{var s=t.p;t.p=null,r(t,s,n,i,o,a),r(t,e,n,i,o,a)}else t.p=e;else r(t,e,n,i,o,a)
}function r(t,r,n,i,o,a){var s=.5*(n+o),l=.5*(i+a),u=r.x>=s,h=r.y>=l;switch(t.leaf=!1,(h<<1)+u){case 0:t=t.c1||(t.c1=new m.Quadtree.Node);
break;case 1:t=t.c2||(t.c2=new m.Quadtree.Node);break;case 2:t=t.c3||(t.c3=new m.Quadtree.Node);
break;case 3:t=t.c4||(t.c4=new m.Quadtree.Node)}u?n=s:o=s,h?i=l:a=l,e(t,r,n,i,o,a)
}var n,i=Number.POSITIVE_INFINITY,o=i,a=Number.NEGATIVE_INFINITY,s=a;for(n=t;n;n=n.next)n.x<i&&(i=n.x),n.y<o&&(o=n.y),n.x>a&&(a=n.x),n.y>s&&(s=n.y);
var l=a-i,u=s-o;for(l>u?s=o+l:a=i+u,this.xMin=i,this.yMin=o,this.xMax=a,this.yMax=s,this.root=new m.Quadtree.Node,n=t;n;n=n.next)e(this.root,n,i,o,a,s)
},m.Quadtree.Node=function(){this.leaf=!0,this.c1=null,this.c2=null,this.c3=null,this.c4=null,this.p=null
},m.Force={},m.Force.charge=function(t){function e(r){function n(t){e(t),r.cn+=t.cn,i+=t.cn*t.cx,o+=t.cn*t.cy
}var i=0,o=0;r.cn=0,r.leaf||(r.c1&&n(r.c1),r.c2&&n(r.c2),r.c3&&n(r.c3),r.c4&&n(r.c4)),r.p&&(r.cn+=t,i+=t*r.p.x,o+=t*r.p.y),r.cx=i/r.cn,r.cy=o/r.cn
}function r(e,n,o,l,u,h){var c=e.cx-n.x,p=e.cy-n.y,f=1/Math.sqrt(c*c+p*p);if(e.leaf&&e.p!=n||s>(u-o)*f){if(a>f)return;
f>i&&(f=i);var d=e.cn*f*f*f,y=c*d,g=p*d;n.fx+=y,n.fy+=g}else if(!e.leaf){var m=.5*(o+u),v=.5*(l+h);
if(e.c1&&r(e.c1,n,o,l,m,v),e.c2&&r(e.c2,n,m,l,u,v),e.c3&&r(e.c3,n,o,v,m,h),e.c4&&r(e.c4,n,m,v,u,h),a>f)return;
if(f>i&&(f=i),e.p&&e.p!=n){var d=t*f*f*f,y=c*d,g=p*d;n.fx+=y,n.fy+=g}}}var n=2,i=1/n,o=500,a=1/o,s=.9,l={};
return arguments.length||(t=-40),l.constant=function(e){return arguments.length?(t=Number(e),l):t
},l.domain=function(t,e){return arguments.length?(n=Number(t),i=1/n,o=Number(e),a=1/o,l):[n,o]
},l.theta=function(t){return arguments.length?(s=Number(t),l):s},l.apply=function(t,n){e(n.root);
for(var i=t;i;i=i.next)r(n.root,i,n.xMin,n.yMin,n.xMax,n.yMax)},l},m.Force.drag=function(t){var e={};
return arguments.length||(t=.1),e.constant=function(r){return arguments.length?(t=r,e):t
},e.apply=function(e){if(t)for(var r=e;r;r=r.next)r.fx-=t*r.vx,r.fy-=t*r.vy},e},m.Force.spring=function(t){var e,r,n=.1,i=20,o={};
return arguments.length||(t=.1),o.links=function(t){return arguments.length?(e=t,r=t.map(function(t){return 1/Math.sqrt(Math.max(t.sourceNode.linkDegree,t.targetNode.linkDegree))
}),o):e},o.constant=function(e){return arguments.length?(t=Number(e),o):t},o.damping=function(t){return arguments.length?(n=Number(t),o):n
},o.length=function(t){return arguments.length?(i=Number(t),o):i},o.apply=function(){for(var o=0;o<e.length;o++){var a=e[o].sourceNode,s=e[o].targetNode,l=a.x-s.x,u=a.y-s.y,h=Math.sqrt(l*l+u*u),c=h?1/h:1,p=t*r[o],f=n*r[o],d=(p*(h-i)+f*(l*(a.vx-s.vx)+u*(a.vy-s.vy))*c)*c,y=-d*(h?l:.01*(.5-Math.random())),g=-d*(h?u:.01*(.5-Math.random()));
a.fx+=y,a.fy+=g,s.fx-=y,s.fy-=g}},o},m.Constraint={},m.Constraint.collision=function(t){function e(s,l,u,h,c,p){if(!s.leaf){var f=.5*(u+c),d=.5*(h+p),y=d>i,g=a>d,m=f>n,v=o>f;
y&&(s.c1&&m&&e(s.c1,l,u,h,f,d),s.c2&&v&&e(s.c2,l,f,h,c,d)),g&&(s.c3&&m&&e(s.c3,l,u,d,f,p),s.c4&&v&&e(s.c4,l,f,d,c,p))
}if(s.p&&s.p!=l){var x=l.x-s.p.x,b=l.y-s.p.y,k=Math.sqrt(x*x+b*b),S=r+t(s.p);if(S>k){var M=(k-S)/k*.5;
x*=M,b*=M,l.x-=x,l.y-=b,s.p.x+=x,s.p.y+=b}}}var r,n,i,o,a,s=1,l={};return arguments.length||(r=10),l.repeat=function(t){return arguments.length?(s=Number(t),l):s
},l.apply=function(l,u){var h,c,p=-1/0;for(h=l;h;h=h.next)c=t(h),c>p&&(p=c);for(var f=0;s>f;f++)for(h=l;h;h=h.next)c=(r=t(h))+p,n=h.x-c,o=h.x+c,i=h.y-c,a=h.y+c,e(u.root,h,u.xMin,u.yMin,u.xMax,u.yMax)
},l},m.Constraint.position=function(t){var e=1,r={};return arguments.length||(t=function(t){return t.fix
}),r.alpha=function(t){return arguments.length?(e=Number(t),r):e},r.apply=function(r){for(var n=r;n;n=n.next){var i=t(n);
i&&(n.x+=(i.x-n.x)*e,n.y+=(i.y-n.y)*e,n.fx=n.fy=n.vx=n.vy=0)}},r},m.Constraint.bound=function(){var t,e,r={};
return r.x=function(e,r){return arguments.length?(t={min:Math.min(e,r),max:Math.max(e,r)},this):t
},r.y=function(t,r){return arguments.length?(e={min:Math.min(t,r),max:Math.max(t,r)},this):e
},r.apply=function(r){if(t)for(var n=r;n;n=n.next)n.x=n.x<t.min?t.min:n.x>t.max?t.max:n.x;
if(e)for(var n=r;n;n=n.next)n.y=n.y<e.min?e.min:n.y>e.max?e.max:n.y},r},m.Layout=function(){m.Panel.call(this)
},m.Layout.prototype=m.extend(m.Panel),m.Layout.prototype.property=m.Mark.prototype.localProperty,m.Layout.Network=function(){m.Layout.call(this);
var t=this;this.$id=m.id(),(this.node=(new m.Mark).data(function(){return t.nodes()
}).strokeStyle("#1f77b4").fillStyle("#fff").left(function(t){return t.x}).top(function(t){return t.y
})).parent=this,this.link=(new m.Mark).extend(this.node).data(function(t){return[t.sourceNode,t.targetNode]
}).fillStyle(null).lineWidth(function(t,e){return 1.5*e.linkValue}).strokeStyle("rgba(0,0,0,.2)"),this.link.add=function(e){return t.add(m.Panel).data(function(){return t.links()
}).add(e).extend(this)},(this.label=(new m.Mark).extend(this.node).textMargin(7).textBaseline("middle").text(function(t){return t.nodeName||t.nodeValue
}).textAngle(function(t){var e=t.midAngle;return m.Wedge.upright(e)?e:e+Math.PI}).textAlign(function(t){return m.Wedge.upright(t.midAngle)?"left":"right"
})).parent=this},m.Layout.Network.prototype=m.extend(m.Layout).property("nodes",function(t){return t.map(function(t,e){return"object"!=typeof t&&(t={nodeValue:t}),t.index=e,t
})}).property("links",function(t){return t.map(function(t){return isNaN(t.linkValue)&&(t.linkValue=isNaN(t.value)?1:t.value),t
})}),m.Layout.Network.prototype.reset=function(){return this.$id=m.id(),this},m.Layout.Network.prototype.buildProperties=function(t,e){(t.$id||0)<this.$id&&m.Layout.prototype.buildProperties.call(this,t,e)
},m.Layout.Network.prototype.buildImplied=function(t){return m.Layout.prototype.buildImplied.call(this,t),t.$id>=this.$id?!0:(t.$id=this.$id,t.nodes.forEach(function(t){t.linkDegree=0
}),t.links.forEach(function(e){var r=e.linkValue;(e.sourceNode||(e.sourceNode=t.nodes[e.source])).linkDegree+=r,(e.targetNode||(e.targetNode=t.nodes[e.target])).linkDegree+=r
}),void 0)},m.Layout.Hierarchy=function(){m.Layout.Network.call(this),this.link.strokeStyle("#ccc")
},m.Layout.Hierarchy.prototype=m.extend(m.Layout.Network),m.Layout.Hierarchy.prototype.buildImplied=function(t){t.links||(t.links=m.Layout.Hierarchy.links.call(this)),m.Layout.Network.prototype.buildImplied.call(this,t)
},m.Layout.Hierarchy.links=function(){return this.nodes().filter(function(t){return t.parentNode
}).map(function(t){return{sourceNode:t,targetNode:t.parentNode,linkValue:1}})},m.Layout.Hierarchy.NodeLink={buildImplied:function(t){function e(t){return t.parentNode?t.depth*(c-h)+h:0
}function r(t){return t.parentNode?2*(t.breadth-.25)*Math.PI:0}function n(t){switch(a){case"left":return t.depth*l;
case"right":return l-t.depth*l;case"top":return t.breadth*l;case"bottom":return l-t.breadth*l;
case"radial":return l/2+e(t)*Math.cos(t.midAngle)}}function i(t){switch(a){case"left":return t.breadth*u;
case"right":return u-t.breadth*u;case"top":return t.depth*u;case"bottom":return u-t.depth*u;
case"radial":return u/2+e(t)*Math.sin(t.midAngle)}}var o=t.nodes,a=t.orient,s=/^(top|bottom)$/.test(a),l=t.width,u=t.height;
if("radial"==a){var h=t.innerRadius,c=t.outerRadius;null==h&&(h=0),null==c&&(c=Math.min(l,u)/2)
}for(var p=0;p<o.length;p++){var f=o[p];f.midAngle="radial"==a?r(f):s?Math.PI/2:0,f.x=n(f),f.y=i(f),f.firstChild&&(f.midAngle+=Math.PI)
}}},m.Layout.Hierarchy.Fill={constructor:function(){this.node.strokeStyle("#fff").fillStyle("#ccc").width(function(t){return t.dx
}).height(function(t){return t.dy}).innerRadius(function(t){return t.innerRadius}).outerRadius(function(t){return t.outerRadius
}).startAngle(function(t){return t.startAngle}).angle(function(t){return t.angle}),this.label.textAlign("center").left(function(t){return t.x+t.dx/2
}).top(function(t){return t.y+t.dy/2}),delete this.link},buildImplied:function(t){function e(t,e){return(t+e)/(1+e)
}function r(t){switch(c){case"left":return e(t.minDepth,y)*f;case"right":return(1-e(t.maxDepth,y))*f;
case"top":return t.minBreadth*f;case"bottom":return(1-t.maxBreadth)*f;case"radial":return f/2
}}function n(t){switch(c){case"left":return t.minBreadth*d;case"right":return(1-t.maxBreadth)*d;
case"top":return e(t.minDepth,y)*d;case"bottom":return(1-e(t.maxDepth,y))*d;case"radial":return d/2
}}function i(t){switch(c){case"left":case"right":return(t.maxDepth-t.minDepth)/(1+y)*f;
case"top":case"bottom":return(t.maxBreadth-t.minBreadth)*f;case"radial":return t.parentNode?(t.innerRadius+t.outerRadius)*Math.cos(t.midAngle):0
}}function o(t){switch(c){case"left":case"right":return(t.maxBreadth-t.minBreadth)*d;
case"top":case"bottom":return(t.maxDepth-t.minDepth)/(1+y)*d;case"radial":return t.parentNode?(t.innerRadius+t.outerRadius)*Math.sin(t.midAngle):0
}}function a(t){return Math.max(0,e(t.minDepth,y/2))*(m-g)+g}function s(t){return e(t.maxDepth,y/2)*(m-g)+g
}function l(t){return 2*(t.parentNode?t.minBreadth-.25:0)*Math.PI}function u(t){return 2*(t.parentNode?t.maxBreadth-t.minBreadth:1)*Math.PI
}var h=t.nodes,c=t.orient,p=/^(top|bottom)$/.test(c),f=t.width,d=t.height,y=-h[0].minDepth;
if("radial"==c){var g=t.innerRadius,m=t.outerRadius;null==g&&(g=0),g&&(y*=2),null==m&&(m=Math.min(f,d)/2)
}for(var v=0;v<h.length;v++){var x=h[v];x.x=r(x),x.y=n(x),"radial"==c?(x.innerRadius=a(x),x.outerRadius=s(x),x.startAngle=l(x),x.angle=u(x),x.midAngle=x.startAngle+x.angle/2):x.midAngle=p?-Math.PI/2:0,x.dx=i(x),x.dy=o(x)
}}},m.Layout.Grid=function(){m.Layout.call(this);var t=this;(this.cell=(new m.Mark).data(function(){return t.scene[t.index].$grid
}).width(function(){return t.width()/t.cols()}).height(function(){return t.height()/t.rows()
}).left(function(){return this.width()*(this.index%t.cols())}).top(function(){return this.height()*Math.floor(this.index/t.cols())
})).parent=this},m.Layout.Grid.prototype=m.extend(m.Layout).property("rows").property("cols"),m.Layout.Grid.prototype.defaults=(new m.Layout.Grid).extend(m.Layout.prototype.defaults).rows(1).cols(1),m.Layout.Grid.prototype.buildImplied=function(t){m.Layout.prototype.buildImplied.call(this,t);
var e=t.rows,r=t.cols;"object"==typeof r&&(e=m.transpose(r)),"object"==typeof e?(t.$grid=m.blend(e),t.rows=e.length,t.cols=e[0]?e[0].length:0):t.$grid=m.repeat([t.data],e*r)
},m.Layout.Stack=function(){function t(t){return function(){return i[t](this.parent.index,this.index)
}}m.Layout.call(this);var e,r=this,n=function(){return null},i={t:n,l:n,r:n,b:n,w:n,h:n},o=r.buildImplied;
this.buildImplied=function(t){o.call(this,t);var r,a=t.layers,s=a.length,l=t.orient,u=/^(top|bottom)\b/.test(l),h=this.parent[u?"height":"width"](),c=[],p=[],f=[],d=m.Mark.stack,y={parent:{parent:this}};
d.unshift(null),e=[];for(var g=0;s>g;g++){f[g]=[],p[g]=[],y.parent.index=g,d[0]=a[g],e[g]=this.$values.apply(y.parent,d),g||(r=e[g].length),d.unshift(null);
for(var v=0;r>v;v++)d[0]=e[g][v],y.index=v,g||(c[v]=this.$x.apply(y,d)),f[g][v]=this.$y.apply(y,d);
d.shift()}d.shift();var x;switch(t.order){case"inside-out":for(var b=f.map(function(t){return m.max.index(t)
}),k=m.range(s).sort(function(t,e){return b[t]-b[e]}),S=f.map(function(t){return m.sum(t)
}),M=0,w=0,C=[],L=[],g=0;s>g;g++){var v=k[g];w>M?(M+=S[v],C.push(v)):(w+=S[v],L.push(v))
}x=L.reverse().concat(C);break;case"reverse":x=m.range(s-1,-1,-1);break;default:x=m.range(s)
}switch(t.offset){case"silohouette":for(var v=0;r>v;v++){for(var y=0,g=0;s>g;g++)y+=f[g][v];
p[x[0]][v]=(h-y)/2}break;case"wiggle":for(var y=0,g=0;s>g;g++)y+=f[g][0];p[x[0]][0]=y=(h-y)/2;
for(var v=1;r>v;v++){for(var N=0,A=0,I=c[v]-c[v-1],g=0;s>g;g++)N+=f[g][v];for(var g=0;s>g;g++){for(var P=(f[x[g]][v]-f[x[g]][v-1])/(2*I),B=0;g>B;B++)P+=(f[x[B]][v]-f[x[B]][v-1])/I;
A+=P*f[x[g]][v]}p[x[0]][v]=y-=N?A/N*I:0}break;case"expand":for(var v=0;r>v;v++){p[x[0]][v]=0;
for(var B=0,g=0;s>g;g++)B+=f[g][v];if(B){B=h/B;for(var g=0;s>g;g++)f[g][v]*=B}else{B=h/s;
for(var g=0;s>g;g++)f[g][v]=B}}break;default:for(var v=0;r>v;v++)p[x[0]][v]=0}for(var v=0;r>v;v++)for(var y=p[x[0]][v],g=1;s>g;g++)y+=f[x[g-1]][v],p[x[g]][v]=y;
var g=l.indexOf("-"),_=u?"h":"w",$=0>g?u?"l":"b":l.charAt(g+1),D=l.charAt(0);for(var R in i)i[R]=n;
i[$]=function(t,e){return c[e]},i[D]=function(t,e){return p[t][e]},i[_]=function(t,e){return f[t][e]
}},this.layer=(new m.Mark).data(function(){return e[this.parent.index]}).top(t("t")).left(t("l")).right(t("r")).bottom(t("b")).width(t("w")).height(t("h")),this.layer.add=function(t){return r.add(m.Panel).data(function(){return r.layers()
}).add(t).extend(this)}},m.Layout.Stack.prototype=m.extend(m.Layout).property("orient",String).property("offset",String).property("order",String).property("layers"),m.Layout.Stack.prototype.defaults=(new m.Layout.Stack).extend(m.Layout.prototype.defaults).orient("bottom-left").offset("zero").layers([[]]),m.Layout.Stack.prototype.$x=m.Layout.Stack.prototype.$y=function(){return 0
},m.Layout.Stack.prototype.x=function(t){return this.$x=m.functor(t),this},m.Layout.Stack.prototype.y=function(t){return this.$y=m.functor(t),this
},m.Layout.Stack.prototype.$values=m.identity,m.Layout.Stack.prototype.values=function(t){return this.$values=m.functor(t),this
},m.Layout.Band=function(){function t(t){return function(){return e[t](this.index,this.parent.index)
}}m.Layout.call(this);var e,r,n=this,i=n.buildImplied,o=(new m.Mark).data(function(){return r[this.parent.index]
}).top(t("t")).left(t("l")).right(t("r")).bottom(t("b")).width(t("w")).height(t("h")).antialias(t("antialias"));
this.buildImplied=function(t){i.call(this,t),e=Object.create(m.Layout.Band.$baseItemProps),r=[];
var n=t.layers,o=n.length;if(o>0){var a=t.orient,s=/^(top|bottom)\b/.test(a),l=this.parent[s?"height":"width"](),u=this._readData(n,r,t),h=u.length;
if("reverse"===t.bandOrder&&u.reverse(),"reverse"===t.order){r.reverse();for(var c=0;h>c;c++)u[c].items.reverse()
}switch(t.layout){case"grouped":this._calcGrouped(u,o,l,t);break;case"stacked":this._calcStacked(u,o,l,t)
}for(var p=t.hZero||0,f="stacked"===t.layout,d=0;h>d;d++)for(var y=u[d],g=f?Math.max(0,y.vertiMargin)/2:0,v=0;o>v;v++){var x=y.items[v];
x.zero&&(x.h=p,x.y-=g+p/2)}this._bindItemProps(u,e,a,s)}};var a=this.item={end:this,add:function(t){return n.add(m.Panel).data(function(){return n.layers()
}).add(t).extend(o)},order:function(t){return n.order(t),this},w:function(t){return n.$iw=m.functor(t),this
},h:function(t){return n.$ih=m.functor(t),this},horizontalRatio:function(t){return n.$ihorizRatio=m.functor(t),this
},verticalMargin:function(t){return n.$ivertiMargin=m.functor(t),this}},s=this.band={end:this,w:function(t){return n.$bw=m.functor(t),this
},x:function(t){return n.$bx=m.functor(t),this},order:function(t){return n.bandOrder(t),this
},differentialControl:function(t){return n.$bDiffControl=m.functor(t),this}};this.band.item=a,this.item.band=s
},m.Layout.Band.$baseItemProps=function(){var t=function(){return null};return{t:t,l:t,r:t,b:t,w:t,h:t}
}(),m.Layout.Band.prototype=m.extend(m.Layout).property("orient",String).property("layout",String).property("layers").property("yZero",Number).property("hZero",Number).property("verticalMode",String).property("horizontalMode",String).property("order",String).property("bandOrder",String),m.Layout.Band.prototype.defaults=(new m.Layout.Band).extend(m.Layout.prototype.defaults).orient("bottom-left").layout("grouped").yZero(0).hZero(1.5).layers([[]]),m.Layout.Band.prototype.$bx=m.Layout.Band.prototype.$bw=m.Layout.Band.prototype.$bDiffControl=m.Layout.Band.prototype.$iw=m.Layout.Band.prototype.$ih=m.Layout.Band.prototype.$ivertiMargin=m.functor(0),m.Layout.Band.prototype.$ihorizRatio=m.functor(.9),m.Layout.Band.prototype.$values=m.identity,m.Layout.Band.prototype.values=function(t){return this.$values=m.functor(t),this
},m.Layout.prototype._readData=function(t,e,r){var n,i=t.length,o=[],a=m.Mark.stack,s=r.hZero,l={parent:{parent:this}};
a.unshift(null);for(var u=0;i>u;u++){l.parent.index=u,a[0]=t[u];var h=e[u]=this.$values.apply(l.parent,a);
u||(n=h.length),a.unshift(null);for(var c=0;n>c;c++){a[0]=h[c],l.index=c;var p=o[c];
p||(p=o[c]={horizRatio:this.$ihorizRatio.apply(l,a),vertiMargin:this.$ivertiMargin.apply(l,a),w:this.$bw.apply(l,a),x:this.$bx.apply(l,a),diffControl:this.$bDiffControl?this.$bDiffControl.apply(l,a):0,items:[]});
var f=this.$ih.apply(l,a),d=null!=f?Math.abs(f):f;p.items[u]={y:r.yZero||0,x:0,w:this.$iw.apply(l,a),h:d,zero:null!=d&&s>=d,dir:0>f?-1:1}
}a.shift()}return a.shift(),o},m.Layout.Band.prototype._normalizeBands=function(t,e,r,n){var i,o=t.length;
if("expand"===n.verticalMode)for(var a=0;o>a;a++){i=t[a].items;for(var s=null,l=0,u=0;e>u;u++){var h=i[u];
h.dir=1;var c=h.h;null!=c&&(l++,s+=c)}if(l)if(s)for(var p=r/s,u=0;e>u;u++){var c=i[u].h;
null!=c&&(i[u].h=c*p)}else if(0==s)for(var u=0;e>u;u++)i[u].h=0;else for(var f=r/l,u=0;e>u;u++){var c=i[u].h;
null!=c&&(i[u].h=f)}}return i},m.Layout.Band.prototype._calcGrouped=function(t,e,r,n){for(var i=this._normalizeBands(t,e,r,n),o=0,a=t.length;a>o;o++){for(var s=t[o],i=s.items,l=s.w,u=s.horizRatio,h=0,c=0;e>c;c++)h+=i[c].w;
if(1===e?u=1:u>0&&1>=u||(u=1),null==l)l=s.w=h/u;else if("expand"===n.horizontalMode){var p=u*l;
if(h)for(var f=p/h,c=0;e>c;c++)i[c].w*=f;else for(var d=p/e,c=0;e>c;c++)i[c].w=d;
h=p}for(var y=h/u,g=s.x-y/2,m=e>1?(y-h)/(e-1):0,c=0;e>c;c++){var v=i[c];v.x=g,g+=v.w+m,v.dir<0&&(v.y-=v.h)
}}},m.Layout.Band.prototype._calcStacked=function(t,e,r,n){for(var i=this._normalizeBands(t,e,r,n),o=n.yZero,a=o,s=0,l=t.length;l>s;s++){var u=t[s],h=u.x,c=u.diffControl,p=0>c,f=Math.max(0,u.vertiMargin);
i=u.items;var d=this._layoutItemsOfDir(1,p,i,f,h,a),y=null;if(d.existsOtherDir&&(y=this._layoutItemsOfDir(-1,p,i,f,h,a)),c){if(1===Math.abs(c)){var g=a;
a=d.yOffset,y&&(a-=g-y.yOffset)}}else a=o}},m.Layout.Band.prototype._layoutItemsOfDir=function(t,e,r,n,i,o){for(var a=!1,s=n/2,l=e?-t:t,u=e,h=0,c=r.length;c>h;h+=1){var p=r[u?c-h-1:h];
if(p.dir===t){var f=p.h||0;l>0?(p.y=o+s,o+=f):(p.y=o-(f-s),o-=f);var d=f-n;p.h=d>0?d:0,p.x=i-p.w/2
}else a=!0}return{existsOtherDir:a,yOffset:o}},m.Layout.Band.prototype._bindItemProps=function(t,e,r,n){var i=r.indexOf("-"),o=n?"h":"w",a=n?"w":"h",s=0>i?n?"l":"b":r.charAt(i+1),l=r.charAt(0);
e[s]=function(e,r){return t[e].items[r].x},e[l]=function(e,r){return t[e].items[r].y
},e[a]=function(e,r){return t[e].items[r].w},e[o]=function(e,r){return t[e].items[r].h||0
},e.antialias=function(e,r){return t[e].items[r].zero}},m.Layout.Treemap=function(){m.Layout.Hierarchy.call(this),this.node.strokeStyle("#fff").fillStyle("rgba(31, 119, 180, .25)").width(function(t){return t.dx
}).height(function(t){return t.dy}),this.label.visible(function(t){return!t.firstChild
}).left(function(t){return t.x+t.dx/2}).top(function(t){return t.y+t.dy/2}).textAlign("center").textAngle(function(t){return t.dx>t.dy?0:-Math.PI/2
}),(this.leaf=(new m.Mark).extend(this.node).fillStyle(null).strokeStyle(null).visible(function(t){return!t.firstChild
})).parent=this,delete this.link},m.Layout.Treemap.prototype=m.extend(m.Layout.Hierarchy).property("round",Boolean).property("mode",String).property("order",String),m.Layout.Treemap.prototype.defaults=(new m.Layout.Treemap).extend(m.Layout.Hierarchy.prototype.defaults).mode("squarify").order("ascending"),m.Layout.Treemap.prototype.$size=function(t){return Number(t.nodeValue)
},m.Layout.Treemap.prototype.$padLeft=m.Layout.Treemap.prototype.$padRight=m.Layout.Treemap.prototype.$padBottom=m.Layout.Treemap.prototype.$padTop=function(){return 0
},m.Layout.Treemap.prototype.size=function(t){return this.$size=m.functor(t),this
},m.Layout.Treemap.prototype.padding=function(t){return t=m.functor(t),this.paddingLeft(t).paddingRight(t).paddingTop(t).paddingBottom(t)
},m.Layout.Treemap.prototype.paddingLeft=function(t){return arguments.length?(this.$padLeft=m.functor(t),this):this.$padLeft
},m.Layout.Treemap.prototype.paddingRight=function(t){return arguments.length?(this.$padRight=m.functor(t),this):this.$padRight
},m.Layout.Treemap.prototype.paddingBottom=function(t){return arguments.length?(this.$padBottom=m.functor(t),this):this.$padBottom
},m.Layout.Treemap.prototype.paddingTop=function(t){return arguments.length?(this.$padTop=m.functor(t),this):this.$padTop
},m.Layout.Treemap.prototype.buildImplied=function(t){function e(t,e,r,n,i,o,a){for(var s=0,l=0;s<t.length;s++){var h=t[s];
r?(h.x=n+l,h.y=i,l+=h.dx=u(o*h.size/e),h.dy=a):(h.x=n,h.y=i+l,h.dx=o,l+=h.dy=u(a*h.size/e))
}h&&(r?h.dx+=o-l:h.dy+=a-l)}function r(t,e){for(var r=-1/0,n=1/0,i=0,o=0;o<t.length;o++){var a=t[o].size;
n>a&&(n=a),a>r&&(r=a),i+=a}return i*=i,e*=e,Math.max(e*r/i,i/(e*n))}function n(t,n){function i(t){var r=c==y,n=m.sum(t,l),i=y?u(n/y):0;
return e(t,n,r,a,s,r?c:i,r?i:p),r?(s+=i,p-=i):(a+=i,c-=i),y=Math.min(c,p),r}var o=t.parentNode,a=t.x,s=t.y,c=t.dx,p=t.dy;
if(o&&(a+=o.paddingLeft,s+=o.paddingTop,c+=-o.paddingLeft-o.paddingRight,p+=-o.paddingTop-o.paddingBottom),"squarify"==h){var f=[],d=1/0,y=Math.min(c,p),g=c*p/t.size;
if(!(t.size<=0)){t.visitBefore(function(t){t.size*=g});for(var v=t.childNodes.slice();v.length;){var x=v[v.length-1];
if(x.size){f.push(x);var g=r(f,y);d>=g?(v.pop(),d=g):(f.pop(),i(f),f.length=0,d=1/0)
}else v.pop()}if(i(f))for(var n=0;n<f.length;n++)f[n].dy+=p;else for(var n=0;n<f.length;n++)f[n].dx+=c
}}else e(t.childNodes,t.size,"slice"==h?!0:"dice"==h?!1:1&n,a,s,c,p)}if(!m.Layout.Hierarchy.prototype.buildImplied.call(this,t)){var i=this,o=t.nodes,a=o[0],s=m.Mark.stack,l=function(t){return t.size
},u=t.round?Math.round:Number,h=t.mode;s.unshift(null);try{a.visitAfter(function(t,e){t.depth=e,t.x=t.y=t.dx=t.dy=0,s[0]=t,t.firstChild?(t.size=m.sum(t.childNodes,l),t.paddingRight=+i.$padRight.apply(i,s)||0,t.paddingLeft=+i.$padLeft.apply(i,s)||0,t.paddingBottom=+i.$padBottom.apply(i,s)||0,t.paddingTop=+i.$padTop.apply(i,s)||0):t.size=i.$size.apply(i,s)
})}finally{s.shift()}switch(t.order){case"ascending":a.sort(function(t,e){return t.size-e.size
});break;case"descending":a.sort(function(t,e){return e.size-t.size});break;case"reverse":a.reverse()
}a.x=0,a.y=0,a.dx=t.width,a.dy=t.height,a.visitBefore(n)}},m.Layout.Tree=function(){m.Layout.Hierarchy.call(this)
},m.Layout.Tree.prototype=m.extend(m.Layout.Hierarchy).property("group",Number).property("breadth",Number).property("depth",Number).property("orient",String),m.Layout.Tree.prototype.defaults=(new m.Layout.Tree).extend(m.Layout.Hierarchy.prototype.defaults).group(1).breadth(15).depth(60).orient("top"),m.Layout.Tree.prototype.buildImplied=function(t){function e(t){var r,i,o;
if(t.firstChild){r=t.firstChild,i=t.lastChild,o=r;for(var a=r;a;a=a.nextSibling)e(a),o=n(a,o);
s(t);var l=.5*(r.prelim+i.prelim);(r=t.previousSibling)?(t.prelim=r.prelim+u(t.depth,!0),t.mod=t.prelim-l):t.prelim=l
}else(r=t.previousSibling)&&(t.prelim=r.prelim+u(t.depth,!0))}function r(t,e,n){t.breadth=t.prelim+e,e+=t.mod;
for(var i=t.firstChild;i;i=i.nextSibling)r(i,e,n)}function n(t,e){var r=t.previousSibling;
if(r){for(var n=t,s=t,h=r,c=t.parentNode.firstChild,p=n.mod,f=s.mod,d=h.mod,y=c.mod,g=o(h),m=i(n);g&&m;){h=g,n=m,c=i(c),s=o(s),s.ancestor=t;
var v=h.prelim+d-(n.prelim+p)+u(h.depth,!1);v>0&&(a(l(h,t,e),t,v),p+=v,f+=v),d+=h.mod,p+=n.mod,y+=c.mod,f+=s.mod,g=o(h),m=i(n)
}g&&!o(s)&&(s.thread=g,s.mod+=d-f),m&&!i(c)&&(c.thread=m,c.mod+=p-y,e=t)}return e
}function i(t){return t.firstChild||t.thread}function o(t){return t.lastChild||t.thread
}function a(t,e,r){var n=e.number-t.number;e.change-=r/n,e.shift+=r,t.change+=r/n,e.prelim+=r,e.mod+=r
}function s(t){for(var e=0,r=0,n=t.lastChild;n;n=n.previousSibling)n.prelim+=e,n.mod+=e,r+=n.change,e+=n.shift+r
}function l(t,e,r){return t.ancestor.parentNode==e.parentNode?t.ancestor:r}function u(t,e){return(e?1:v+1)/("radial"==d?t:1)
}function h(t){return"radial"==d?t.breadth/y:0}function c(t){switch(d){case"left":return t.depth;
case"right":return x-t.depth;case"top":case"bottom":return t.breadth+x/2;case"radial":return x/2+t.depth*Math.cos(h(t))
}}function p(t){switch(d){case"left":case"right":return t.breadth+b/2;case"top":return t.depth;
case"bottom":return b-t.depth;case"radial":return b/2+t.depth*Math.sin(h(t))}}if(!m.Layout.Hierarchy.prototype.buildImplied.call(this,t)){var f=t.nodes,d=t.orient,y=t.depth,g=t.breadth,v=t.group,x=t.width,b=t.height,k=f[0];
k.visitAfter(function(t,e){t.ancestor=t,t.prelim=0,t.mod=0,t.change=0,t.shift=0,t.number=t.previousSibling?t.previousSibling.number+1:0,t.depth=e
}),e(k),r(k,-k.prelim,0),k.visitAfter(function(t){t.breadth*=g,t.depth*=y,t.midAngle=h(t),t.x=c(t),t.y=p(t),t.firstChild&&(t.midAngle+=Math.PI),delete t.breadth,delete t.depth,delete t.ancestor,delete t.prelim,delete t.mod,delete t.change,delete t.shift,delete t.number,delete t.thread
})}},m.Layout.Indent=function(){m.Layout.Hierarchy.call(this),this.link.interpolate("step-after")
},m.Layout.Indent.prototype=m.extend(m.Layout.Hierarchy).property("depth",Number).property("breadth",Number),m.Layout.Indent.prototype.defaults=(new m.Layout.Indent).extend(m.Layout.Hierarchy.prototype.defaults).depth(15).breadth(15),m.Layout.Indent.prototype.buildImplied=function(t){function e(t,r,s){t.x=o+s++*i,t.y=a+r++*n,t.midAngle=0;
for(var l=t.firstChild;l;l=l.nextSibling)r=e(l,r,s);return r}if(!m.Layout.Hierarchy.prototype.buildImplied.call(this,t)){var r=t.nodes,n=t.breadth,i=t.depth,o=0,a=0;
e(r[0],1,1)}},m.Layout.Pack=function(){m.Layout.Hierarchy.call(this),this.node.shapeRadius(function(t){return t.radius
}).strokeStyle("rgb(31, 119, 180)").fillStyle("rgba(31, 119, 180, .25)"),this.label.textAlign("center"),delete this.link
},m.Layout.Pack.prototype=m.extend(m.Layout.Hierarchy).property("spacing",Number).property("order",String),m.Layout.Pack.prototype.defaults=(new m.Layout.Pack).extend(m.Layout.Hierarchy.prototype.defaults).spacing(1).order("ascending"),m.Layout.Pack.prototype.$radius=function(){return 1
},m.Layout.Pack.prototype.size=function(t){return this.$radius="function"==typeof t?function(){return Math.sqrt(t.apply(this,arguments))
}:(t=Math.sqrt(t),function(){return t}),this},m.Layout.Pack.prototype.buildImplied=function(t){function e(t){var e=m.Mark.stack;
e.unshift(null);for(var r=0,n=t.length;n>r;r++){var i=t[r];i.firstChild||(i.radius=a.$radius.apply(a,(e[0]=i,e)))
}e.shift()}function r(e){for(var i=[],o=e.firstChild;o;o=o.nextSibling)o.firstChild&&(o.radius=r(o)),o.n=o.p=o,i.push(o);
switch(t.order){case"ascending":i.sort(function(t,e){return t.radius-e.radius});break;
case"descending":i.sort(function(t,e){return e.radius-t.radius});break;case"reverse":i.reverse()
}return n(i)}function n(e){function r(t){p=Math.min(t.x-t.radius,p),f=Math.max(t.x+t.radius,f),d=Math.min(t.y-t.radius,d),y=Math.max(t.y+t.radius,y)
}function n(t,e){var r=t.n;t.n=e,e.p=t,e.n=r,r.p=e}function o(t,e){t.n=e,e.p=t}function a(t,e){var r=e.x-t.x,n=e.y-t.y,i=t.radius+e.radius;
return i*i-r*r-n*n>.001}var s,l,u,h,c,p=1/0,f=-1/0,d=1/0,y=-1/0;if(s=e[0],s.x=-s.radius,s.y=0,r(s),e.length>1&&(l=e[1],l.x=l.radius,l.y=0,r(l),e.length>2)){u=e[2],i(s,l,u),r(u),n(s,u),s.p=u,n(u,l),l=s.n;
for(var g=3;g<e.length;g++){i(s,l,u=e[g]);var m=0,v=1,x=1;for(h=l.n;h!=l;h=h.n,v++)if(a(h,u)){m=1;
break}if(1==m)for(c=s.p;c!=h.p;c=c.p,x++)if(a(c,u)){v>x&&(m=-1,h=c);break}0==m?(n(s,u),l=u,r(u)):m>0?(o(s,h),l=h,g--):0>m&&(o(h,l),s=h,g--)
}}for(var b=(p+f)/2,k=(d+y)/2,S=0,g=0;g<e.length;g++){var M=e[g];M.x-=b,M.y-=k,S=Math.max(S,M.radius+Math.sqrt(M.x*M.x+M.y*M.y))
}return S+t.spacing}function i(t,e,r){var n=e.radius+r.radius,i=t.radius+r.radius,o=e.x-t.x,a=e.y-t.y,s=Math.sqrt(o*o+a*a),l=(i*i+s*s-n*n)/(2*i*s),u=Math.acos(l),h=l*i,c=Math.sin(u)*i;
o/=s,a/=s,r.x=t.x+h*o+c*a,r.y=t.y+h*a-c*o}function o(t,e,r,n){for(var i=t.firstChild;i;i=i.nextSibling)i.x+=t.x,i.y+=t.y,o(i,e,r,n);
t.x=e+n*t.x,t.y=r+n*t.y,t.radius*=n}if(!m.Layout.Hierarchy.prototype.buildImplied.call(this,t)){var a=this,s=t.nodes,l=s[0];
e(s),l.x=0,l.y=0,l.radius=r(l);var u=this.width(),h=this.height(),c=1/Math.max(2*l.radius/u,2*l.radius/h);
o(l,u/2,h/2,c)}},m.Layout.Force=function(){m.Layout.Network.call(this),this.link.lineWidth(function(t,e){return 1.5*Math.sqrt(e.linkValue)
}),this.label.textAlign("center")},m.Layout.Force.prototype=m.extend(m.Layout.Network).property("bound",Boolean).property("iterations",Number).property("dragConstant",Number).property("chargeConstant",Number).property("chargeMinDistance",Number).property("chargeMaxDistance",Number).property("chargeTheta",Number).property("springConstant",Number).property("springDamping",Number).property("springLength",Number),m.Layout.Force.prototype.defaults=(new m.Layout.Force).extend(m.Layout.Network.prototype.defaults).dragConstant(.1).chargeConstant(-40).chargeMinDistance(2).chargeMaxDistance(500).chargeTheta(.9).springConstant(.1).springDamping(.3).springLength(20),m.Layout.Force.prototype.buildImplied=function(t){function e(t){return t.fix?1:t.vx*t.vx+t.vy*t.vy
}if(m.Layout.Network.prototype.buildImplied.call(this,t)){var r=t.$force;r&&(r.next=this.binds.$force,this.binds.$force=r)
}else{for(var n,i=this,o=t.nodes,a=t.links,s=t.iterations,l=t.width,u=t.height,h=0;h<o.length;h++)n=o[h],isNaN(n.x)&&(n.x=l/2+40*Math.random()-20),isNaN(n.y)&&(n.y=u/2+40*Math.random()-20);
var c=m.simulation(o);if(c.force(m.Force.drag(t.dragConstant)),c.force(m.Force.charge(t.chargeConstant).domain(t.chargeMinDistance,t.chargeMaxDistance).theta(t.chargeTheta)),c.force(m.Force.spring(t.springConstant).damping(t.springDamping).length(t.springLength).links(a)),c.constraint(m.Constraint.position()),t.bound&&c.constraint(m.Constraint.bound().x(6,l-6).y(6,u-6)),null==s)c.step(),c.step(),t.$force=this.binds.$force={next:this.binds.$force,nodes:o,min:1e-4*(a.length+1),sim:c},this.$timer||(this.$timer=setInterval(function(){for(var t=!1,r=i.binds.$force;r;r=r.next)m.max(r.nodes,e)>r.min&&(r.sim.step(),t=!0);
t&&i.render()},42));else for(var h=0;s>h;h++)c.step()}},m.Layout.Cluster=function(){m.Layout.Hierarchy.call(this);
var t,e=this.buildImplied;this.buildImplied=function(r){e.call(this,r),t=/^(top|bottom)$/.test(r.orient)?"step-before":/^(left|right)$/.test(r.orient)?"step-after":"linear"
},this.link.interpolate(function(){return t})},m.Layout.Cluster.prototype=m.extend(m.Layout.Hierarchy).property("group",Number).property("orient",String).property("innerRadius",Number).property("outerRadius",Number),m.Layout.Cluster.prototype.defaults=(new m.Layout.Cluster).extend(m.Layout.Hierarchy.prototype.defaults).group(0).orient("top"),m.Layout.Cluster.prototype.buildImplied=function(t){if(!m.Layout.Hierarchy.prototype.buildImplied.call(this,t)){var e,r,n=t.nodes[0],i=t.group,o=0,a=.5-i/2,s=void 0;
n.visitAfter(function(t){t.firstChild?t.depth=1+m.max(t.childNodes,function(t){return t.depth
}):(i&&s!=t.parentNode&&(s=t.parentNode,o+=i),o++,t.depth=0)}),e=1/o,r=1/n.depth;
var s=void 0;n.visitAfter(function(t){t.firstChild?t.breadth=m.mean(t.childNodes,function(t){return t.breadth
}):(i&&s!=t.parentNode&&(s=t.parentNode,a+=i),t.breadth=e*a++),t.depth=1-t.depth*r
}),n.visitAfter(function(t){t.minBreadth=t.firstChild?t.firstChild.minBreadth:t.breadth-e/2,t.maxBreadth=t.firstChild?t.lastChild.maxBreadth:t.breadth+e/2
}),n.visitBefore(function(t){t.minDepth=t.parentNode?t.parentNode.maxDepth:0,t.maxDepth=t.parentNode?t.depth+n.depth:t.minDepth+2*n.depth
}),n.minDepth=-r,m.Layout.Hierarchy.NodeLink.buildImplied.call(this,t)}},m.Layout.Cluster.Fill=function(){m.Layout.Cluster.call(this),m.Layout.Hierarchy.Fill.constructor.call(this)
},m.Layout.Cluster.Fill.prototype=m.extend(m.Layout.Cluster),m.Layout.Cluster.Fill.prototype.buildImplied=function(t){m.Layout.Cluster.prototype.buildImplied.call(this,t)||m.Layout.Hierarchy.Fill.buildImplied.call(this,t)
},m.Layout.Partition=function(){m.Layout.Hierarchy.call(this)},m.Layout.Partition.prototype=m.extend(m.Layout.Hierarchy).property("order",String).property("orient",String).property("innerRadius",Number).property("outerRadius",Number),m.Layout.Partition.prototype.defaults=(new m.Layout.Partition).extend(m.Layout.Hierarchy.prototype.defaults).orient("top"),m.Layout.Partition.prototype.$size=function(){return 1
},m.Layout.Partition.prototype.size=function(t){return this.$size=t,this},m.Layout.Partition.prototype.buildImplied=function(t){if(!m.Layout.Hierarchy.prototype.buildImplied.call(this,t)){var e=this,r=t.nodes[0],n=m.Mark.stack,i=0;
switch(n.unshift(null),r.visitAfter(function(t,r){r>i&&(i=r),t.size=t.firstChild?m.sum(t.childNodes,function(t){return t.size
}):e.$size.apply(e,(n[0]=t,n))}),n.shift(),t.order){case"ascending":r.sort(function(t,e){return t.size-e.size
});break;case"descending":r.sort(function(t,e){return e.size-t.size})}r.minBreadth=0,r.breadth=.5,r.maxBreadth=1,r.visitBefore(function(t){for(var e=t.minBreadth,r=t.maxBreadth-e,n=t.firstChild;n;n=n.nextSibling)n.minBreadth=e,e+=n.size/t.size*r,n.maxBreadth=e,n.breadth=(e+n.minBreadth)/2
}),r.visitAfter(function(t,e){t.minDepth=(e-1)/i,t.maxDepth=t.depth=e/i}),m.Layout.Hierarchy.NodeLink.buildImplied.call(this,t)
}},m.Layout.Partition.Fill=function(){m.Layout.Partition.call(this),m.Layout.Hierarchy.Fill.constructor.call(this)
},m.Layout.Partition.Fill.prototype=m.extend(m.Layout.Partition),m.Layout.Partition.Fill.prototype.buildImplied=function(t){m.Layout.Partition.prototype.buildImplied.call(this,t)||m.Layout.Hierarchy.Fill.buildImplied.call(this,t)
},m.Layout.Arc=function(){m.Layout.Network.call(this);var t,e,r,n=this.buildImplied;
this.buildImplied=function(i){n.call(this,i),e=i.directed,t="radial"==i.orient?"linear":"polar",r="right"==i.orient||"top"==i.orient
},this.link.data(function(t){var n=t.sourceNode,i=t.targetNode;return r!=(e||n.breadth<i.breadth)?[n,i]:[i,n]
}).interpolate(function(){return t})},m.Layout.Arc.prototype=m.extend(m.Layout.Network).property("orient",String).property("directed",Boolean),m.Layout.Arc.prototype.defaults=(new m.Layout.Arc).extend(m.Layout.Network.prototype.defaults).orient("bottom"),m.Layout.Arc.prototype.sort=function(t){return this.$sort=t,this
},m.Layout.Arc.prototype.buildImplied=function(t){function e(t){switch(o){case"top":return-Math.PI/2;
case"bottom":return Math.PI/2;case"left":return Math.PI;case"right":return 0;case"radial":return 2*(t-.25)*Math.PI
}}function r(t){switch(o){case"top":case"bottom":return t*l;case"left":return 0;case"right":return l;
case"radial":return l/2+h*Math.cos(e(t))}}function n(t){switch(o){case"top":return 0;
case"bottom":return u;case"left":case"right":return t*u;case"radial":return u/2+h*Math.sin(e(t))
}}if(!m.Layout.Network.prototype.buildImplied.call(this,t)){var i=t.nodes,o=t.orient,a=this.$sort,s=m.range(i.length),l=t.width,u=t.height,h=Math.min(l,u)/2;
a&&s.sort(function(t,e){return a(i[t],i[e])});for(var c=0;c<i.length;c++){var p=i[s[c]],f=p.breadth=(c+.5)/i.length;
p.x=r(f),p.y=n(f),p.midAngle=e(f)}}},m.Layout.Horizon=function(){m.Layout.call(this);
var t,e,r,n,i,o,a=this,s=this.buildImplied;this.buildImplied=function(a){s.call(this,a),t=a.bands,e=a.mode,r=Math.round(("color"==e?.5:1)*a.height),n=a.backgroundStyle,i=m.ramp(n,a.negativeStyle).domain(0,t),o=m.ramp(n,a.positiveStyle).domain(0,t)
};var t=(new m.Panel).data(function(){return m.range(2*t)}).overflow("hidden").height(function(){return r
}).top(function(t){return"color"==e?(1&t)*r:0}).fillStyle(function(t){return t?null:n
});this.band=(new m.Mark).top(function(t,n){return"mirror"==e&&1&n?(n+1>>1)*r:null
}).bottom(function(t,n){return"mirror"==e?1&n?null:(n+1>>1)*-r:(1&n||-1)*(n+1>>1)*r
}).fillStyle(function(t,e){return(1&e?i:o)((e>>1)+1)}),this.band.add=function(e){return a.add(m.Panel).extend(t).add(e).extend(this)
}},m.Layout.Horizon.prototype=m.extend(m.Layout).property("bands",Number).property("mode",String).property("backgroundStyle",m.fillStyle).property("positiveStyle",m.fillStyle).property("negativeStyle",m.fillStyle),m.Layout.Horizon.prototype.defaults=(new m.Layout.Horizon).extend(m.Layout.prototype.defaults).bands(2).mode("offset").backgroundStyle("white").positiveStyle("#1f77b4").negativeStyle("#d62728"),m.Layout.Rollup=function(){m.Layout.Network.call(this);
var t,e,r=this,n=r.buildImplied;this.buildImplied=function(r){n.call(this,r),t=r.$rollup.nodes,e=r.$rollup.links
},this.node.data(function(){return t}).shapeSize(function(t){return 20*t.nodes.length
}),this.link.interpolate("polar").eccentricity(.8),this.link.add=function(t){return r.add(m.Panel).data(function(){return e
}).add(t).extend(this)}},m.Layout.Rollup.prototype=m.extend(m.Layout.Network).property("directed",Boolean),m.Layout.Rollup.prototype.x=function(t){return this.$x=m.functor(t),this
},m.Layout.Rollup.prototype.y=function(t){return this.$y=m.functor(t),this},m.Layout.Rollup.prototype.buildImplied=function(t){function e(t){return a[t]+","+s[t]
}if(!m.Layout.Network.prototype.buildImplied.call(this,t)){var r=t.nodes,n=t.links,i=t.directed,o=r.length,a=[],s=[],l=0,u={},h={},c=m.Mark.stack,p={parent:this};
c.unshift(null);for(var f=0;o>f;f++)p.index=f,c[0]=r[f],a[f]=this.$x.apply(p,c),s[f]=this.$y.apply(p,c);
c.shift();for(var f=0;f<r.length;f++){var d=e(f),y=u[d];y||(y=u[d]=Object.create(r[f]),y.index=l++,y.x=a[f],y.y=s[f],y.nodes=[]),y.nodes.push(r[f])
}for(var f=0;f<n.length;f++){var g=n[f].sourceNode,v=n[f].targetNode,x=u[e(g.index)],b=u[e(v.index)],k=!i&&x.index>b.index,S=k?b.index+","+x.index:x.index+","+b.index,M=h[S];
M||(M=h[S]={sourceNode:x,targetNode:b,linkValue:0,links:[]}),M.links.push(n[f]),M.linkValue+=n[f].linkValue
}t.$rollup={nodes:m.values(u),links:m.values(h)}}},m.Layout.Matrix=function(){m.Layout.Network.call(this);
var t,e,r,n,i,o=this,a=o.buildImplied;this.buildImplied=function(o){a.call(this,o),t=o.nodes.length,e=o.width/t,r=o.height/t,n=o.$matrix.labels,i=o.$matrix.pairs
},this.link.data(function(){return i}).left(function(){return e*(this.index%t)}).top(function(){return r*Math.floor(this.index/t)
}).width(function(){return e}).height(function(){return r}).lineWidth(1.5).strokeStyle("#fff").fillStyle(function(t){return t.linkValue?"#555":"#eee"
}).parent=this,delete this.link.add,this.label.data(function(){return n}).left(function(){return 1&this.index?e*((this.index>>1)+.5):0
}).top(function(){return 1&this.index?0:r*((this.index>>1)+.5)}).textMargin(4).textAlign(function(){return 1&this.index?"left":"right"
}).textAngle(function(){return 1&this.index?-Math.PI/2:0}),delete this.node},m.Layout.Matrix.prototype=m.extend(m.Layout.Network).property("directed",Boolean),m.Layout.Matrix.prototype.sort=function(t){return this.$sort=t,this
},m.Layout.Matrix.prototype.buildImplied=function(t){if(!m.Layout.Network.prototype.buildImplied.call(this,t)){var e=t.nodes,r=t.links,n=this.$sort,i=e.length,o=m.range(i),a=[],s=[],l={};
t.$matrix={labels:a,pairs:s},n&&o.sort(function(t,r){return n(e[t],e[r])});for(var u=0;i>u;u++)for(var h=0;i>h;h++){var c=o[u],p=o[h],f={row:u,col:h,sourceNode:e[c],targetNode:e[p],linkValue:0};
s.push(l[c+"."+p]=f)}for(var u=0;i>u;u++){var c=o[u];a.push(e[c],e[c])}for(var u=0;u<r.length;u++){var d=r[u],y=d.sourceNode.index,g=d.targetNode.index,v=d.linkValue;
l[y+"."+g].linkValue+=v,t.directed||(l[g+"."+y].linkValue+=v)}}},m.Layout.Bullet=function(){m.Layout.call(this);
var t,e,r,n,i,o=this,a=o.buildImplied,s=o.x=m.Scale.linear();this.buildImplied=function(o){a.call(this,i=o),t=o.orient,e=/^left|right$/.test(t),r=m.ramp("#bbb","#eee").domain(0,Math.max(1,i.ranges.length-1)),n=m.ramp("steelblue","lightsteelblue").domain(0,Math.max(1,i.measures.length-1))
},(this.range=new m.Mark).data(function(){return i.ranges}).reverse(!0).left(function(){return"left"==t?0:null
}).top(function(){return"top"==t?0:null}).right(function(){return"right"==t?0:null
}).bottom(function(){return"bottom"==t?0:null}).width(function(t){return e?s(t):null
}).height(function(t){return e?null:s(t)}).fillStyle(function(){return r(this.index)
}).antialias(!1).parent=o,(this.measure=new m.Mark).extend(this.range).data(function(){return i.measures
}).left(function(){return"left"==t?0:e?null:this.parent.width()/3.25}).top(function(){return"top"==t?0:e?this.parent.height()/3.25:null
}).right(function(){return"right"==t?0:e?null:this.parent.width()/3.25}).bottom(function(){return"bottom"==t?0:e?this.parent.height()/3.25:null
}).fillStyle(function(){return n(this.index)}).parent=o,(this.marker=new m.Mark).data(function(){return i.markers
}).left(function(r){return"left"==t?s(r):e?null:this.parent.width()/2}).top(function(r){return"top"==t?s(r):e?this.parent.height()/2:null
}).right(function(e){return"right"==t?s(e):null}).bottom(function(e){return"bottom"==t?s(e):null
}).strokeStyle("black").shape("bar").shapeAngle(function(){return e?0:Math.PI/2}).parent=o,(this.tick=new m.Mark).data(function(){return s.ticks(7)
}).left(function(e){return"left"==t?s(e):null}).top(function(e){return"top"==t?s(e):null
}).right(function(r){return"right"==t?s(r):e?null:-6}).bottom(function(r){return"bottom"==t?s(r):e?-8:null
}).height(function(){return e?6:null}).width(function(){return e?null:6}).parent=o
},m.Layout.Bullet.prototype=m.extend(m.Layout).property("orient",String).property("ranges").property("markers").property("measures").property("minimum").property("maximum"),m.Layout.Bullet.prototype.defaults=(new m.Layout.Bullet).extend(m.Layout.prototype.defaults).orient("left").ranges([]).markers([]).measures([]),m.Layout.Bullet.prototype._originIsZero=!0,m.Layout.Bullet.prototype.originIsZero=function(t){return arguments.length?this._originIsZero=!!t:this._originIsZero
},m.Layout.Bullet.prototype.buildImplied=function(t){m.Layout.prototype.buildImplied.call(this,t);
var e,r=this.parent[/^left|right$/.test(t.orient)?"width":"height"](),n=t.maximum,i=t.minimum,o=1e-10;
null==n?(e=[].concat(t.ranges,t.markers,t.measures),n=m.max(e)):n=+n,null==i?(e||(e=[].concat(t.ranges,t.markers,t.measures)),i=m.min(e),i=.95*i):i=+i,(i>n||o>n-i)&&(i=Math.abs(n)<o?-.1:.99*n),this._originIsZero&&i*n>0&&(i>0?i=0:n=0),t.minimum=i,t.maximum=n,this.x.domain(i,n).range(0,r)
},m.Behavior={},m.Behavior.dragBase=function(t){function e(e){if(h||(h=!0,this.addEventInterceptor("click",a,!0)),!s){var o=this.root.scene.$g;
s=[[o,"mousemove",m.listen(o,"mousemove",r)],[o,"mouseup",m.listen(o,"mouseup",n)],[document,"mousemove",m.listen(document,"mousemove",r)],[document,"mouseup",m.listen(document,"mouseup",n)]]
}var p=arguments[arguments.length-1];l=p.target,u=!1,p.stopPropagation();var f=this.mouse(),d=this.scene,y=this.index;
c=d[y].drag={phase:"start",m:f,m1:f,m2:null,d:e,scene:d,index:y},p=i(p,c),t.dragstart.call(this,p);
var g=c.m;g!==f&&(f.x=g.x,f.y=g.y)}function r(e){if(c){c.phase="move",e.stopPropagation(),e=i(e,c);
var r=c.scene;r.mark.context(r,c.index,function(){var r=c.m2||c.m1,n=this.mouse();
if(!(r&&n.distance2(r).dist2<=2)){c.m=c.m2=n,t.drag.call(this,e);var i=c.m;i!==n&&(n.x=i.x,n.y=i.y)
}})}}function n(e){if(c){c.phase="end";var r=c.m2,n=r&&c.m1.distance2(r).dist2>.1;
c.canceled=!n,u=n&&l===e.target,u||(l=null),e.stopPropagation(),e=i(e,c),s&&(s.forEach(function(t){m.unlisten.apply(m,t)
}),s=null);var o=c.scene,a=c.index;try{o.mark.context(o,a,function(){t.dragend.call(this,e)
})}finally{c=null,delete o[a].drag}}}function i(t,e){try{return t.drag=e,t}catch(r){}var n={};
for(var i in t){var a=t[i];n[i]="function"!=typeof a?a:o(a,t)}return n._sourceEvent=t,n
}function o(t,e){return function(){return t.apply(e,arguments)}}function a(t,e){return u&&l===e.target?(u=!1,l=null,!1):void 0
}var s,l,u,h,c;return t.autoRender=!0,t.positionConstraint=null,t.bound=function(t,e){return Math.max(c.min[e],Math.min(c.max[e],t))
},e.autoRender=function(r){return arguments.length?(t.autoRender=!!r,e):t.autoRender
},e.positionConstraint=function(r){return arguments.length?(t.positionConstraint=r,e):t.positionConstraint
},e},m.Behavior.drag=function(){var t,e=null,r=1,n=1,i={dragstart:function(e){var r=e.drag;
r.type="drag";var n=r.d,o=m.vector(n.x,n.y);n.fix=o,n.drag=r,t=o.minus(r.m1);var a=this.parent;
r.max={x:a.width()-(n.dx||0),y:a.height()-(n.dy||0)},r.min={x:0,y:0},i.autoRender&&this.render(),m.Mark.dispatch("dragstart",r.scene,r.index,e)
},drag:function(e){var o=e.drag,a=o.m2,s=o.d;o.m=t.plus(a);var l=i.positionConstraint;
l&&l(o);var u=o.m;r&&(s.x=s.fix.x=i.bound(u.x,"x")),n&&(s.y=s.fix.y=i.bound(u.y,"y")),i.autoRender&&this.render(),m.Mark.dispatch("drag",o.scene,o.index,e)
},dragend:function(e){var r=e.drag,n=r.d;n.fix=null,t=null,i.autoRender&&this.render();
try{m.Mark.dispatch("dragend",r.scene,r.index,e)}finally{delete n.drag}}},o=m.Behavior.dragBase(i);
return o.collapse=function(t){if(arguments.length){switch(e=String(t)){case"y":r=1,n=0;
break;case"x":r=0,n=1;break;default:r=1,n=1}return o}return e},o},m.Behavior.point=function(t){function e(t,e){if(t.visible)for(var n=t.children.length-1;n>=0;n--)if(r(t.children[n],e))return!0
}function r(t,r){var o,a,s,l=t.mark,u="panel"===l.type;if(l.$handlers.point){var h,c=(u&&l.parent||l).mouse(),p=l._pointingRadiusMax,f=p*p;
for(a=t.length;a--;)if((h=n(t,a))&&i(t,a,c,r,h,f)){o=!0;break}}if(u){l.scene=t,s=!(!l.isPointingBarrier||!l.parent);
try{for(a=t.length;a--;)if(l.index=a,(!s||l.getShape(t,a).containsPoint(l.parent.mouse()))&&e(t[a],r))return!0
}finally{delete l.scene,delete l.index}}return o}function n(t,e){var r=t[e];if(!r.visible)return 0;
if(!c)return 1;var n=t.mark.properties;if(!n.fillStyle&&!n.strokeStyle)return 1;var i=r.fillStyle?r.fillStyle.opacity:0,o=r.strokeStyle?r.strokeStyle.opacity:0,a=Math.max(i,o);
return.02>a?0:a>.98?1:.5}function i(t,e,r,n,i,o){function a(){if(d&&0>=o)return-1;
if(s=l.distance2(r,f),d&&m.floatLess(o,s.cost))return-2;if(g&&!p&&m.floatLess(y,s.dist2))return-3;
if(c===n.hasArea){if(p<n.inside)return-4;if(p>n.inside)return 1}else{if(h){if(!p&&n.inside)return-5;
if(p&&!n.inside)return 2}if(c||2!==n.inside){if(c&&2===p){if(2===n.inside)return-7;
if(0===n.inside&&m.floatLess(3,n.cost))return 4}}else{if(2===p)return 3;if(0===p&&m.floatLess(3,s.cost))return-6
}}if(!h||!p){if(m.floatLess(n.dist2,s.dist2))return-8;if(m.floatLess(s.dist2,n.dist2))return 5
}return h&&m.floatLess(s.cost,n.cost)?6:-9}var s,l=t.mark.getShape(t,e),c=l.hasArea(),p=l.containsPoint(r,f)?!h||l.containsPoint(r)?2:1:0,d=isFinite(o)&&2>p,v=a();
return u&&function(){if(-3>v||v>0){var r=t&&t.mark;console.log("POINT "+(v>0?"choose":"skip")+" ("+v+") "+(r?r.type+" "+e:"none")+" in="+p+" d2="+(s&&s.dist2)+" cost="+(s&&s.cost)+" opaq="+(1===i))
}}(),v>0&&(n.hasArea=c,n.inside=p,n.dist2=s.dist2,n.cost=s.cost,n.scenes=t,n.index=e,n.shape=l,c&&2===p&&1===i)?!0:void 0
}function o(){var t=m.event;u&&console.log("POINT MOUSE MOVE BEG");try{var r={cost:1/0,dist2:1/0,inside:0,hasArea:!1,x:t.pageX||0,y:t.pageY||0};
if(l&&v&&m.Shape.dist2(r,l).cost<v)return;if(e(this.scene[this.index],r),r.inside||isFinite(r.cost)||(r=null),l){if(r&&l.scenes==r.scenes&&l.index==r.index)return;
t.isPointSwitch=!!r,m.Mark.dispatch("unpoint",l.scenes,l.index,t)}l=r,r&&(m.Mark.dispatch("point",r.scenes,r.index,t),d||("panel"===this.type?(d=this,this.event("mouseout",function(){a.call(this.scene.$g)
}),p&&d.addEventInterceptor("click",s)):m.listen(this.root.canvas(),"mouseout",a)))
}finally{u&&console.log("POINT MOUSE MOVE END")}}function a(){var t=m.event;l&&!m.ancestor(this,t.relatedTarget)&&(m.Mark.dispatch("unpoint",l.scenes,l.index,t),l=null)
}function s(t,e){if(l){var r=l.scenes,n=r.mark.$handlers[t];if(n)return[n,r,l.index,e]
}}"object"!=typeof t&&(t={radius:t});var l,u=0,h=null,c=!!m.get(t,"painted",!1),p=!!m.get(t,"stealClick",!1),f={x:1,y:1},d=null,y=function(){var e=m.parseNumNonNeg(m.get(t,"radius"),30);
return e*e}(),g=isFinite(y),v=function(){var e=m.parseNumNonNeg(m.get(t,"radiusHyst"),0);
return isFinite(e)||(e=4),e*e}();return o.collapse=function(t){if(arguments.length){switch(h=String(t)){case"y":f.x=1,f.y=0;
break;case"x":f.x=0,f.y=1;break;default:f.x=1,f.y=1,h=null}return o}return h},t&&null!=t.collapse&&o.collapse(t.collapse),t=null,o
},m.Behavior.select=function(){var t=null,e=1,r=1,n=!1,i={dragstart:function(t){var o=t.drag;
o.type="select",o.dxmin=0,o.dymin=0;var a=o.d;a.drag=o,o.max={x:this.width(),y:this.height()},o.min={x:0,y:0};
var s=i.positionConstraint;s&&(o.m=o.m.clone(),s(o));var l=o.m;e&&(a.x=i.bound(l.x,"x"),n||(a.dx=Math.max(0,o.dxmin))),r&&(a.y=i.bound(l.y,"y"),n||(a.dy=Math.max(0,o.dymin))),m.Mark.dispatch("selectstart",o.scene,o.index,t)
},drag:function(t){var o=t.drag,a=o.m1,s=o.d;o.max.x=this.width(),o.max.y=this.height();
var l=i.positionConstraint;l&&(o.m=o.m.clone(),l(o));var u=o.m;if(e){var h=Math.min(a.x,u.x);
if(h=i.bound(h,"x"),s.x=h,!n){var c=Math.max(u.x,a.x);c=i.bound(c,"x"),s.dx=Math.max(0,o.dxmin,c-h)
}}if(r){var p=Math.min(a.y,u.y);if(p=i.bound(p,"y"),s.y=p,!n){var f=Math.max(u.y,a.y);
f=i.bound(f,"y"),s.dy=Math.max(0,o.dymin,f-p)}}i.autoRender&&this.render(),m.Mark.dispatch("select",o.scene,o.index,t)
},dragend:function(t){var e=t.drag;try{m.Mark.dispatch("selectend",e.scene,e.index,t)
}finally{var r=e.d;delete r.drag}}},o=m.Behavior.dragBase(i);return o.collapse=function(n){if(arguments.length){switch(t=String(n)){case"y":e=1,r=0;
break;case"x":e=0,r=1;break;default:e=1,r=1}return o}return t},o.preserveLength=function(t){return arguments.length?(n=!!t,o):n
},o},m.Behavior.resize=function(t){var e=!1,r="left"===t||"right"===t,n={dragstart:function(e){var r=e.drag;
r.type="resize";var n=r.m1,i=r.d;switch(i.drag=r,t){case"left":n.x=i.x+i.dx;break;
case"right":n.x=i.x;break;case"top":n.y=i.y+i.dy;break;case"bottom":n.y=i.y}var o=this.parent;
r.max={x:o.width(),y:o.height()},r.min={x:0,y:0},m.Mark.dispatch("resizestart",r.scene,r.index,e)
},drag:function(t){var i=t.drag,o=i.m1,a=n.positionConstraint;a&&(i.m=i.m.clone(),a(i));
var s=i.m,l=i.d;if(!e||r){var u=Math.min(o.x,s.x),h=Math.max(s.x,o.x);u=n.bound(u,"x"),h=n.bound(h,"x"),l.x=u,l.dx=h-u
}if(!e||!r){var c=Math.min(o.y,s.y),p=Math.max(s.y,o.y);c=n.bound(c,"y"),p=n.bound(p,"y"),l.y=c,l.dy=p-c
}n.autoRender&&this.render(),m.Mark.dispatch("resize",i.scene,i.index,t)},dragend:function(t){var e=t.drag;
e.max=null;try{m.Mark.dispatch("resizeend",e.scene,e.index,t)}finally{var r=e.d;delete r.drag
}}},i=m.Behavior.dragBase(n);return i.preserveOrtho=function(t){return arguments.length?(e=!!t,i):e
},i},m.Behavior.pan=function(){function t(){i=this.index,n=this.scene,a=m.vector(m.event.pageX,m.event.pageY),o=this.transform(),s=1/(o.k*this.scale),l&&(l={x:(1-o.k)*this.width(),y:(1-o.k)*this.height()})
}function e(t){n&&(n.mark.context(n,i,function(){var t=(m.event.pageX-a.x)*s,e=(m.event.pageY-a.y)*s,r=o.translate(t,e);
l&&(r.x=Math.max(l.x,Math.min(0,r.x)),r.y=Math.max(l.y,Math.min(0,r.y))),this.transform(r).render()
}),m.Mark.dispatch("pan",n,i,t))}function r(){n=null}var n,i,o,a,s,l;return t.bound=function(t){return arguments.length?(l=Boolean(t),this):Boolean(l)
},m.listen(window,"mousemove",e),m.listen(window,"mouseup",r),t},m.Behavior.zoom=function(t){function e(e){var n=this.mouse(),i=m.event.wheel*t,o=this.transform().translate(n.x,n.y).scale(0>i?1e3/(1e3-i):(1e3+i)/1e3).translate(-n.x,-n.y);
r&&(o.k=Math.max(1,o.k),o.x=Math.max((1-o.k)*this.width(),Math.min(0,o.x)),o.y=Math.max((1-o.k)*this.height(),Math.min(0,o.y))),this.transform(o).render(),m.Mark.dispatch("zoom",this.scene,this.index,e)
}var r;return arguments.length||(t=1/48),e.bound=function(t){return arguments.length?(r=Boolean(t),this):Boolean(r)
},e},m.Geo=function(){},m.Geo.projections={mercator:{project:function(t){return{x:t.lng/180,y:t.lat>85?1:t.lat<-85?-1:Math.log(Math.tan(Math.PI/4+m.radians(t.lat)/2))/Math.PI}
},invert:function(t){return{lng:180*t.x,lat:m.degrees(2*Math.atan(Math.exp(t.y*Math.PI))-Math.PI/2)}
}},"gall-peters":{project:function(t){return{x:t.lng/180,y:Math.sin(m.radians(t.lat))}
},invert:function(t){return{lng:180*t.x,lat:m.degrees(Math.asin(t.y))}}},sinusoidal:{project:function(t){return{x:m.radians(t.lng)*Math.cos(m.radians(t.lat))/Math.PI,y:t.lat/90}
},invert:function(t){return{lng:m.degrees(t.x*Math.PI/Math.cos(t.y*Math.PI/2)),lat:90*t.y}
}},aitoff:{project:function(t){var e=m.radians(t.lng),r=m.radians(t.lat),n=Math.acos(Math.cos(r)*Math.cos(e/2));
return{x:2*(n?Math.cos(r)*Math.sin(e/2)*n/Math.sin(n):0)/Math.PI,y:2*(n?Math.sin(r)*n/Math.sin(n):0)/Math.PI}
},invert:function(t){var e=t.x*Math.PI/2,r=t.y*Math.PI/2;return{lng:m.degrees(e/Math.cos(r)),lat:m.degrees(r)}
}},hammer:{project:function(t){var e=m.radians(t.lng),r=m.radians(t.lat),n=Math.sqrt(1+Math.cos(r)*Math.cos(e/2));
return{x:2*Math.SQRT2*Math.cos(r)*Math.sin(e/2)/n/3,y:Math.SQRT2*Math.sin(r)/n/1.5}
},invert:function(t){var e=3*t.x,r=1.5*t.y,n=Math.sqrt(1-e*e/16-r*r/4);return{lng:m.degrees(2*Math.atan2(n*e,2*(2*n*n-1))),lat:m.degrees(Math.asin(n*r))}
}},identity:{project:function(t){return{x:t.lng/180,y:t.lat/90}},invert:function(t){return{lng:180*t.x,lat:90*t.y}
}}},m.Geo.scale=function(t){function e(t){if(!i||t.lng!=i.lng||t.lat!=i.lat){i=t;
var e=r(t);o={x:h(e.x),y:c(e.y)}}return o}function r(t){var e={lng:t.lng-p.lng,lat:t.lat};
return u.project(e)}function n(t){var e=u.invert(t);return e.lng+=p.lng,e}var i,o,a={x:0,y:0},s={x:1,y:1},l=[],u=m.Geo.projections.identity,h=m.Scale.linear(-1,1).range(0,1),c=m.Scale.linear(-1,1).range(1,0),p={lng:0,lat:0};
return e.x=function(t){return e(t).x},e.y=function(t){return e(t).y},e.ticks={lng:function(t){var e,r;
if(l.length>1){var n=m.Scale.linear();void 0==t&&(t=10),e=n.domain(l,function(t){return t.lat
}).ticks(t),r=n.domain(l,function(t){return t.lng}).ticks(t)}else e=m.range(-80,81,10),r=m.range(-180,181,10);
return r.map(function(t){return e.map(function(e){return{lat:e,lng:t}})})},lat:function(t){return m.transpose(e.ticks.lng(t))
}},e.invert=function(t){return n({x:h.invert(t.x),y:c.invert(t.y)})},e.domain=function(t,e){if(arguments.length){if(l=t instanceof Array?arguments.length>1?m.map(t,e):t:Array.prototype.slice.call(arguments),l.length>1){var n=l.map(function(t){return t.lng
}),o=l.map(function(t){return t.lat});p={lng:(m.max(n)+m.min(n))/2,lat:(m.max(o)+m.min(o))/2};
var a=l.map(r);h.domain(a,function(t){return t.x}),c.domain(a,function(t){return t.y
})}else p={lng:0,lat:0},h.domain(-1,1),c.domain(-1,1);return i=null,this}return l
},e.range=function(t,e){return arguments.length?("object"==typeof t?(a={x:Number(t.x),y:Number(t.y)},s={x:Number(e.x),y:Number(e.y)}):(a={x:0,y:0},s={x:Number(t),y:Number(e)}),h.range(a.x,s.x),c.range(s.y,a.y),i=null,this):[a,s]
},e.projection=function(t){return arguments.length?(u="string"==typeof t?m.Geo.projections[t]||m.Geo.projections.identity:t,this.domain(l)):t
},m.copyOwn(e,m.Scale.common),arguments.length&&e.projection(t),e},m});