define(["../Logger","amd!../lib/underscore","./UnmanagedComponent","../lib/jquery","css!./TrafficComponent"],function(t,i,a,e){var n=a.extend({trafficLight:function(t,i){var a,n=this.trafficDefinition;
a=i?e(t).find("VALUE").text():t[0][0];var r="img trafficGreen",o="img trafficYellow",f="img trafficRed",l=e("<div>").attr("class",a<=n.intervals[0]?f:a>=n.intervals[1]?r:o),s=e("#"+this.htmlObject);
if(s.html(l),void 0!=n.showValue&&1==n.showValue){var c="Value: "+a+" <br /><div align='middle' class='"+f+"'/> &le; "+n.intervals[0]+" &lt; <div align='middle' class='"+o+"'/> &lt; "+n.intervals[1]+" &le; <div align='middle' class='"+r+"'/>"+(void 0!=c?"<br/>"+c:"");
s.tooltip.Constructor?s.tooltip({delay:0,html:!0,title:c,placement:"auto top"}):(s.tooltip({delay:0,track:!0,fade:250,content:c}),s.attr("title",c))
}},doQuery:function(){var t=this,a=t.trafficDefinition;if(a.path&&a.dataAccessId){var e=i.bind(function(i){var a;
a=t.valueAsId?i.resultset.map(function(t){return[t[0],t[0]]}):i.resultset,t.trafficLight(a)
},t);t.triggerQuery(a,e)}else{var n=[];for(p in a){var r=p,o="function"==typeof a[p]?a[p]():a[p];
n.push([r,o])}var e=i.bind(function(){t.dashboard.callPentahoAction(t,"system","pentaho-cdf/actions","traffic.xaction",n,function(i){t.trafficLight(i,!0)
})},t);t.synchronous(e)}},update:function(){var i=this.trafficDefinition;if(void 0==i)return t.error("Fatal - No trafficDefinition passed"),void 0;
var a=i.intervals;void 0==a&&(i.intervals=[-1,1]),this.doQuery()}});return n});