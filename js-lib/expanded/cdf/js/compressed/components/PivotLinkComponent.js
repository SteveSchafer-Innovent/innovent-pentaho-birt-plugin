define(["./PivotLinkComponent.ext","./BaseComponent","../lib/jquery","amd!../lib/jquery.fancybox"],function(t,i,o){var n=i.extend({update:function(){var t=void 0==this.tooltip?"View details in a Pivot table":this.tooltip,i=o('<a class="pivotLink"> </a>').html(this.content).attr("href","javascript:require(['cdf/components/PivotLinkComponent'],function(PivotLinkComponent){PivotLinkComponent.openPivotLink(this.dashboard.getComponent('"+this.name+"'));});void(0);").attr("title",t);
o("#"+this.htmlObject).empty(),o("#"+this.htmlObject).html(i),o("a.pivotLink").tooltip({showURL:!1,track:!0,delay:1e3,opacity:.5,content:t})
}},{openPivotLink:function(i){var n=t.getPivot("system","pentaho-cdf/actions","jpivot.xaction")+"&",e=i.pivotDefinition,a=[];
for(p in e){var h=p,c="function"==typeof e[p]?e[p]():e[p];a.push(h+"="+encodeURIComponent(c))
}n+=a.join("&"),n=n.replace(/'/g,"&#39;"),o.fancybox({type:"iframe",href:n,width:o(window).width(),height:o(window).height()})
}});return n});