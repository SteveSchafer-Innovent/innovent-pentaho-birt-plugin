define(["../dashboard/Utils","./UnmanagedComponent","./ChartComponent.ext","./CggComponent.ext","../lib/jquery","amd!../lib/underscore"],function(r,e,t,a,n,i){var o=e.extend({exportChart:function(e,i){var o=this,s=function(e){e=e||{};
var a={},i=o.parameters;if(i&&i.length){var s=n.extend({},r.propertiesArrayToObject(i),e);
for(var d in s)if(s.hasOwnProperty(d)){var h=this.dashboard.getParameterValue(s[d]);
n.isArray(h)&&1==h.length&&(""+h[0]).indexOf(";")>=0&&(h=r.doCsvQuoting(h[0],";")),"function"==typeof h&&(h=h()),a["param"+d]=h
}}var c=o.dashboard.debug;c>1&&(a.paramdebug=!0,a.paramdebugLevel=c);var p=o.name.replace(/render_/,"");
return a.script=t.getCccScriptPath(p),a.attachmentName=p,a},d=s(i);d.outputType=e||"png";
var h=a.getCggDrawUrl()+"?"+n.param(d),c=n("#cccExportIFrame");c.length?c[0].src=h:(c=n('<iframe id="cccExportIFrame" style="display:none">'),c[0].src=h,c.appendTo(n("body")))
},renderChart:function(){var r=this.chartDefinition;r.dataAccessId||r.query||r.endpoint?this.triggerQuery(this.chartDefinition,i.bind(this.render,this)):void 0!=this.valuesArray?this.synchronous(i.bind(function(){this.render(this.valuesArray)
},this)):this.synchronous(i.bind(this.render,this))}});return o});