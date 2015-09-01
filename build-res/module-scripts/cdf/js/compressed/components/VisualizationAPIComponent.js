define(["amd!../lib/underscore","../lib/jquery","./UnmanagedComponent","common-ui/vizapi/DataTable","common-ui/vizapi/VizController","common-ui/vizapi/Events"],function(e,t,i){var n=i.extend({update:function(){var t=e.bind(this.render,this);
this.triggerQuery(this.queryDefinition,t)},render:function(e){var t=this.placeholder()[0],i=this.getVisualization(),n=this.getVizOptions(),a=this.createGoogleDataTable(e),o=new pentaho.VizController(0);
o.setDomNode(t),o.setDataTable(a),o.setVisualization(i,n)},getVizOptions:function(){var e=this,i={};
return t.each(this.vizOptions,function(t,n){var a=n[0],o=e.dashboard.getParameterValue(n[1]);
i[a]=o}),i},getVisualization:function(){return pentaho.visualizations.getById(this.vizId)
},createGoogleDataTable:function(e){return new pentaho.DataTable(e)}});return n});
