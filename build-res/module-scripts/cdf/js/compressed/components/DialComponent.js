define(["../Logger","./JFreeChartComponent"],function(r,e){var t=e.extend({update:function(){var e=this.chartDefinition;
if(void 0==e)return r.log("Fatal - No chartDefinition passed","error"),void 0;e.chartType="DialChart";
var t=e.intervals,o=e.colors;return void 0!=o&&t.length!=o.length?(r.log("Fatal - Number of intervals differs from number of colors","error"),void 0):(this.callPentahoAction("cda"==e.queryType?"jfreechartdial-cda.xaction":"jfreechartdial.xaction"),void 0)
}});return t});