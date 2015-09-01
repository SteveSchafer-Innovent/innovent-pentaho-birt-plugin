define(["../dashboard/Dashboard.ext","common-ui/util/URLEncoder"],function(e,t){var n={getCdfXaction:function(n,a,i,o){if(o){var r={};
for(var u in o)r[u]="function"==typeof o[u]?o[u]():o[u];return t.encode(e.getCdfBase()+"/viewAction",null,$.extend({path:e.getFullPath(n,a),ts:(new Date).getTime()},r))
}return t.encode(e.getCdfBase()+"/viewAction",null,{path:e.getFullPath(n,a),ts:(new Date).getTime()})
}};return n});