define(["./JFreeChartComponent.ext","../dashboard/Dashboard.ext","../Logger","../lib/jquery","./BaseComponent","amd!../lib/captify","css!./JFreeChartComponent","../dashboard/Utils"],function(t,i,e,a,n,r){var s=n.extend({update:function(){var t="cda"==this.chartDefinition.queryType?"jfreechart-cda.xaction":"jfreechart.xaction";
this.callPentahoAction(t)},getParameters:function(){var t=this.chartDefinition;if(void 0==t)return e.log("Fatal - No chartDefinition passed","error"),void 0;
"undefined"!=typeof t.titleKey&&"undefined"!=typeof this.dashboard.i18nSupport&&null!=this.dashboard.i18nSupport&&(t.title=this.dashboard.i18nSupport.prop(t.titleKey));
var i=null;if("cda"==t.queryType&&a.isArray(this.parameters))for(var o,n=0;n<this.parameters.length;n++)if(o=this.parameters[n],a.isArray(o)&&o.length>=2){var s=o[0],c=o[1];
c&&(c=r.doCsvQuoting(c,"=")),0==n?i="":i+=";",i+=r.doCsvQuoting(s+"="+c,";")}var d=void 0!=t.chartOptions?a.extend({},this.dashboard.ev(t.chartOptions),t):t,h=[];
for(p in d){var l=p,c="function"==typeof d[p]?d[p]():d[p];h.push([l,c])}return null!=i&&h.push(["cdaParameterString",i]),h
},callPentahoAction:function(t){var i=this;i.dashboard.incrementRunningCalls(),i.dashboard.callPentahoAction(i,"system","pentaho-cdf/actions",t,i.getParameters(),function(e){null!=e&&(void 0!=i.chartDefinition.caption?i.buildCaptionWrapper(a(e.find("ExecuteActivityResponse:first-child").text()),t):a("#"+i.htmlObject).html(e.find("ExecuteActivityResponse:first-child").text())),i.dashboard.decrementRunningCalls()
})},buildCaptionWrapper:function(e,n){var r=this,s=function(t,e){var o="cda"==e.queryType?"jtable-cda.xaction":"jtable.xaction",n=a.extend({solution:"system",path:"pentaho-cdf/actions",action:o,exportType:t},e);
r.dashboard.post(i.getExport(),n)},c=r.chartDefinition,d=a.extend(t.getCaption(c,r,s,n),c.caption),p=r.htmlObject+"caption",h=a('<div id="'+p+'" ></div>');
e.attr("id",r.htmlObject+"image"),e.attr("rel",r.htmlObject+"caption"),e.attr("class","captify");
for(o in d){var l=void 0==d[o].show||("function"==typeof d[o].show?d[o].show():d[o].show)?!0:!1;
if("mdx"!=r.chartDefinition.queryType&&"Details"==d[o].title&&(l=!1),l){var f=void 0!=d[o].icon?"function"==typeof d[o].icon?d[o].icon():d[o].icon:void 0,u=void 0!=f?a('<div id ="'+p+o+'" class=" img '+f+'"></div>'):a('<span id ="'+p+o+'">'+d[o].title+"</span>");
void 0!=d[o].oclass&&u.addClass(d[o].oclass),u.attr("title",d[o].title),h.append(u)
}}a("#"+r.htmlObject).empty();var v=a('<div class="caption-details">Details</div>');
a("#"+r.htmlObject).append(v),a("#"+r.htmlObject).append(e),a("#"+r.htmlObject).append(h),a("img.captify").captify(a.extend({bDetails:v,spanWidth:"95%",hideDelay:3e3,hasButton:!1,opacity:"0.5"},c.caption)),v.one("capityFinished",function(){e.offset(),v.offset();
e.length>1&&(v.bind("mouseenter",function(){a("#"+r.htmlObject+"image").trigger("detailsClick",[this])
}),v.css("left",v.position().left+a(e[1]).width()-v.width()-5),v.css("top",v.position().top+a(e[1]).height()-v.height()),e[0].id=e[0].id+"Map");
for(o in d)void 0!=d[o].callback&&a("#"+p+o).bind("click",d[o].callback)})}});return s
});