require.config({"paths":{"cdf":"cdf/js","cdf/components/BaseCccComponent":"cdf/js/components/ccc/BaseCccComponent","cdf/components/CccAreaChartComponent":"cdf/js/components/ccc/CccAreaChartComponent","cdf/components/CccBarChartComponent":"cdf/js/components/ccc/CccBarChartComponent","cdf/components/CccBoxplotChartComponent":"cdf/js/components/ccc/CccBoxplotChartComponent","cdf/components/CccBulletChartComponent":"cdf/js/components/ccc/CccBulletChartComponent","cdf/components/CccDotChartComponent":"cdf/js/components/ccc/CccDotChartComponent","cdf/components/CccHeatGridChartComponent":"cdf/js/components/ccc/CccHeatGridChartComponent","cdf/components/CccLineChartComponent":"cdf/js/components/ccc/CccLineChartComponent","cdf/components/CccMetricDotChartComponent":"cdf/js/components/ccc/CccMetricDotChartComponent","cdf/components/CccMetricLineChartComponent":"cdf/js/components/ccc/CccMetricLineChartComponent","cdf/components/CccNormalizedBarChartComponent":"cdf/js/components/ccc/CccNormalizedBarChartComponent","cdf/components/CccParCoordComponent":"cdf/js/components/ccc/CccParCoordComponent","cdf/components/CccPieChartComponent":"cdf/js/components/ccc/CccPieChartComponent","cdf/components/CccStackedAreaChartComponent":"cdf/js/components/ccc/CccStackedAreaChartComponent","cdf/components/CccStackedDotChartComponent":"cdf/js/components/ccc/CccStackedDotChartComponent","cdf/components/CccStackedLineChartComponent":"cdf/js/components/ccc/CccStackedLineChartComponent","cdf/components/CccTreemapChartComponent":"cdf/js/components/ccc/CccTreemapChartComponent","cdf/components/CccWaterfallChartComponent":"cdf/js/components/ccc/CccWaterfallChartComponent","cdf/components/CccSunburstChartComponent":"cdf/js/components/ccc/CccSunburstChartComponent","cdf/components/FilterComponent":"cdf/js/components/filter/FilterComponent","cdf/lib":"cdf/js/lib","amd":"cdf/js/lib/require-amd/nonamd","dash":"cdf/js/lib/require-dashboard/dashboard","cdf/lib/modernizr":"cdf/js/lib/modernizr/modernizr-2.8.3","cdf/lib/jquery":"cdf/js/lib/jquery-migrate-1.2.1","cdf/lib/jquery.ui":"cdf/js/lib/jQuery/jquery.ui","cdf/lib/jquery.blockUI":"cdf/js/lib/blockUI/jquery.blockUI","cdf/lib/jquery.impromptu":"cdf/js/lib/impromptu/jquery-impromptu","cdf/lib/jquery.fancybox":"cdf/js/lib/fancybox/jquery.fancybox","cdf/lib/daterangepicker.jQuery":"cdf/js/lib/daterangepicker/daterangepicker.jQuery","cdf/lib/underscore":"cdf/js/lib/underscore/underscore","cdf/lib/backbone":"cdf/js/lib/backbone/backbone","cdf/lib/mustache":"cdf/js/lib/mustache/mustache","cdf/lib/mustache-wax":"cdf/js/lib/mustacheWax/mustache-wax","cdf/lib/Base":"cdf/js/lib/base/Base","cdf/lib/datatables":"cdf/js/lib/dataTables/js/jquery.dataTables","cdf/lib/captify":"cdf/js/lib/captify/captify","cdf/lib/jquery.bgiframe":"cdf/js/lib/bgiframe/jquery.bgiframe","cdf/lib/jquery.positionBy":"cdf/js/lib/positionBy/jquery.positionBy","cdf/lib/jquery.jdMenu":"cdf/js/lib/jdMenu/jquery.jdMenu","cdf/lib/cdf.jquery.i18n":"cdf/js/lib/i18n/cdf.jquery.i18n","cdf/lib/jquery.i18n":"cdf/js/lib/i18n/jquery.i18n.properties","cdf/lib/OpenLayers":"cdf/js/lib/OpenMap/OpenLayers/OpenLayers","cdf/lib/OpenStreetMap":"cdf/js/lib/OpenStreetMap","cdf/lib/queryParser":"cdf/js/lib/uriQueryParser/jquery-queryParser","cdf/lib/jquery.sparkline":"cdf/js/lib/sparkline/jquery.sparkline","cdf/lib/jquery.corner":"cdf/js/lib/corner/jquery.corner","cdf/lib/jquery.select2":"cdf/js/lib/select2/select2","cdf/lib/jquery.chosen":"cdf/js/lib/chosen/chosen.jquery","cdf/lib/jquery.multiselect":"cdf/js/lib/hynds/jquery.multiselect","cdf/lib/shims":"cdf/js/lib/shims","cdf/lib/html5shiv":"cdf/js/lib/html5shiv/html5shiv","cdf/lib/respond":"cdf/js/lib/respond/respond","cdf/lib/bootstrap":"cdf/js/lib/Bootstrap/js/bootstrap","cdf/lib/raphael":"cdf/js/lib/Raphael/raphael","cdf/lib/base64":"cdf/js/lib/base64","cdf/lib/moment":"cdf/js/lib/moment/moment","cdf/lib/xmla":"cdf/js/lib/xmla/Xmla","cdf/lib/backbone.treemodel":"cdf/js/lib/backboneTreemodel/backbone.treemodel","cdf/lib/jquery.mCustomScrollbar":"cdf/js/lib/mCustomScrollbar/jquery.mCustomScrollbar.concat.min","cdf-legacy":"cdf/js-legacy","common-ui":"common-ui","dojo":"common-ui/dojo/dojo","dojox":"common-ui/dojo/dojox","dijit":"common-ui/dojo/dijit","pentaho/common":"common-ui/dojo/pentaho/common","local":"common-ui/util/local","common-repo":"common-ui/repo","common-data":"common-ui/dataapi","dojo/on":"common-ui/dojo/pentaho/common/overrides/dojo/on","dojo/dom-geometry":"common-ui/dojo/pentaho/common/overrides/dojo/dom-geometry","dojo/dom-prop":"common-ui/dojo/pentaho/common/overrides/dojo/dom-prop","dojox/layout/ResizeHandle":"common-ui/dojo/pentaho/common/overrides/dojox/layout/ResizeHandle","dojox/grid/_View":"common-ui/dojo/pentaho/common/overrides/dojox/grid/_View","dojox/xml/parser":"common-ui/dojo/pentaho/common/overrides/dojox/xml/parser","dojox/grid/Selection":"common-ui/dojo/pentaho/common/overrides/dojox/grid/Selection","dojox/grid/_FocusManager":"common-ui/dojo/pentaho/common/overrides/dojox/grid/_FocusManager","dojox/grid/_Scroller":"common-ui/dojo/pentaho/common/overrides/dojox/grid/_Scroller","dojox/storage":"common-ui/dojo/pentaho/common/overrides/dojox/storage","dojox/json":"common-ui/dojo/pentaho/common/overrides/dojox/json","dojox/rpc":"common-ui/dojo/pentaho/common/overrides/dojox/rpc","dojo/_base/kernel":"common-ui/dojo/pentaho/common/overrides/dojo/_base/kernel","dojo/store/Memory":"common-ui/dojo/pentaho/common/overrides/dojo/store/Memory","common-ui/PluginHandler":"common-ui/plugin-handler/pluginHandler","common-ui/Plugin":"common-ui/plugin-handler/plugin","common-ui/AngularPluginHandler":"common-ui/plugin-handler/angularPluginHandler","common-ui/AngularPlugin":"common-ui/plugin-handler/angularPlugin","common-ui/AnimatedAngularPluginHandler":"common-ui/plugin-handler/animatedAngularPluginHandler","common-ui/AnimatedAngularPlugin":"common-ui/plugin-handler/animatedAngularPlugin","common-ui/jquery":"common-ui/jquery/jquery-1.9.1.min","common-ui/handlebars":"common-ui/handlebars/handlebars","common-ui/jquery-i18n":"common-ui/jquery/jquery.i18n.properties-min","common-ui/jquery-pentaho-i18n":"common-ui/jquery/jquery.i18n.properties.supported.languages","common-ui/bootstrap":"common-ui/bootstrap/bootstrap.min","common-ui/ring":"common-ui/ring/ring","common-ui/underscore":"common-ui/underscore/underscore","underscore":"common-ui/underscore/underscore","common-ui/angular":"common-ui/angular/angular","common-ui/angular-i18n":"common-ui/angular/i18n","common-ui/angular-resource":"common-ui/angular/angular-resource","common-ui/angular-route":"common-ui/angular/angular-route","common-ui/angular-animate":"common-ui/angular/angular-animate","common-ui/angular-sanitize":"common-ui/angular/angular-sanitize","common-ui/angular-ui-bootstrap":"common-ui/bootstrap/ui-bootstrap-tpls-0.6.0.min","common-ui/angular-directives":"common-ui/angular-directives","reportviewer":"reportviewer","pentaho/reportviewer":"reportviewer/dojo/pentaho/reportviewer"},"shim":{"cdf/lib/jquery":{"deps":["cdf/lib/jQuery/jquery"],"exports":"$"},"cdf/lib/OpenLayers":{"exports":"OpenLayers","deps":["css!cdf/lib/OpenMap/OpenLayers/theme/default/style"]},"cdf/lib/OpenStreetMap":["cdf/lib/OpenLayers"],"cdf/lib/respond":["amd!cdf/lib/bootstrap"],"cdf/lib/base64":{"exports":"Base64"},"cdf-legacy/cdf-module":["cdf-legacy/lib/jQuery/jquery.ui","cdf-legacy/lib/impromptu/jquery-impromptu","cdf-legacy/lib/jquery-ui-datepicker-i18n","cdf-legacy/lib/bgiframe/jquery.bgiframe","cdf-legacy/lib/blockUI/jquery.blockUI","cdf-legacy/lib/corner/jquery.corner","cdf-legacy/lib/eventstack/jquery.eventstack","cdf-legacy/lib/i18n/jquery.i18n.properties","cdf-legacy/lib/jdMenu/jquery.jdMenu","cdf-legacy/lib/positionBy/jquery.positionBy","cdf-legacy/lib/simile/ajax/scripts/json","cdf-legacy/lib/json","cdf-legacy/CoreComponents"],"cdf-legacy/CoreComponents":["cdf-legacy/components/core","cdf-legacy/components/ccc","cdf-legacy/components/input","cdf-legacy/components/jfreechart","cdf-legacy/components/maps","cdf-legacy/components/navigation","cdf-legacy/components/pentaho","cdf-legacy/components/simpleautocomplete","cdf-legacy/components/table"],"cdf-legacy/Dashboards":["cdf-legacy/Dashboards.Main","cdf-legacy/Dashboards.Query","cdf-legacy/Dashboards.AddIns","cdf-legacy/Dashboards.Bookmarks","cdf-legacy/Dashboards.Legacy","cdf-legacy/Dashboards.Notifications","cdf-legacy/Dashboards.RefreshEngine","cdf-legacy/Dashboards.Utils"],"cdf-legacy/Dashboards.Main":["cdf-legacy/lib/base/Base","cdf-legacy/lib/underscore/underscore","cdf-legacy/lib/backbone/backbone","cdf-legacy/lib/mustache/mustache","cdf-legacy/lib/shims","cdf-legacy/lib/blockUI/jquery.blockUI","cdf-legacy/lib/uriQueryParser/jquery-queryParser","cdf-legacy/Dashboards.Startup","cdf-legacy/cdf-base"],"cdf-legacy/cdf-base":["cdf-legacy/wd"],"cdf-legacy/lib/backbone/backbone":["cdf-legacy/lib/underscore/underscore"],"cdf-legacy/Dashboards.Startup":["cdf-legacy/lib/shims"],"cdf-legacy/Dashboards.AddIns":["cdf-legacy/Dashboards.Main","cdf-legacy/Dashboards.Query"],"cdf-legacy/Dashboards.Bookmarks":["cdf-legacy/Dashboards.Main"],"cdf-legacy/Dashboards.Legacy":["cdf-legacy/Dashboards.Main"],"cdf-legacy/Dashboards.Notifications":["cdf-legacy/Dashboards.Main"],"cdf-legacy/Dashboards.Query":["cdf-legacy/Dashboards.Main"],"cdf-legacy/Dashboards.RefreshEngine":["cdf-legacy/Dashboards.Main"],"cdf-legacy/Dashboards.Utils":["cdf-legacy/Dashboards.Main"],"cdf-legacy/components/core":["cdf-legacy/Dashboards"],"cdf-legacy/components/input":["cdf-legacy/components/core","cdf-legacy/inputHelper"],"cdf-legacy/components/jfreechart":["cdf-legacy/components/core"],"cdf-legacy/components/maps":["cdf-legacy/components/core"],"cdf-legacy/components/navigation":["cdf-legacy/components/core"],"cdf-legacy/components/pentaho":["cdf-legacy/components/core","cdf-legacy/components/Pentaho.Analyzer","cdf-legacy/components/Pentaho.JPivot","cdf-legacy/components/Pentaho.Reporting","cdf-legacy/components/Pentaho.XAction"],"cdf-legacy/components/simpleautocomplete":["cdf-legacy/components/core"],"cdf-legacy/components/table":["cdf-legacy/components/core"],"cdf-legacy/components/Pentaho.Analyzer":["cdf-legacy/components/core"],"cdf-legacy/components/Pentaho.JPivot":["cdf-legacy/components/core"],"cdf-legacy/components/Pentaho.Reporting":["cdf-legacy/components/core"],"cdf-legacy/components/Pentaho.XAction":["cdf-legacy/components/core"],"cdf-legacy/lib/jQuery/jquery":{"exports":"$"},"cdf-legacy/lib/jQuery/jquery.ui":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/impromptu/jquery-impromptu":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/jquery-ui-datepicker-i18n":["cdf-legacy/lib/jQuery/jquery.ui"],"cdf-legacy/lib/corner/jquery.corner":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/eventstack/jquery.eventstack":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/i18n/jquery.i18n.properties":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/jdMenu/jquery.jdMenu":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/positionBy/jquery.positionBy":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/uriQueryParser/jquery-queryParser":["cdf-legacy/lib/jQuery/jquery"],"cdf-legacy/lib/simile/ajax/scripts/json":["cdf-legacy/lib/simile/ajax/simile-ajax-api"],"cdf-legacy/lib/json":["cdf-legacy/lib/simile/ajax/simile-ajax-api"],"cdf-legacy/components/FilterComponent":["cdf-legacy/lib/backboneTreemodel/backbone.treemodel","cdf-legacy/lib/mCustomScrollbar/jquery.mCustomScrollbar.concat.min","cdf-legacy/lib/mCustomScrollbar/jquery.mCustomScrollbar.min","cdf-legacy/components/filter/lib/baseevents","cdf-legacy/components/filter/js/TreeFilter/TreeFilter","cdf-legacy/components/filter/js/TreeFilter/defaults","cdf-legacy/components/filter/js/TreeFilter/Logger","cdf-legacy/components/filter/js/TreeFilter/models/Tree","cdf-legacy/components/filter/js/TreeFilter/models/SelectionTree","cdf-legacy/components/filter/js/TreeFilter/templates","cdf-legacy/components/filter/js/TreeFilter/views/Abstract","cdf-legacy/components/filter/js/TreeFilter/views/Root","cdf-legacy/components/filter/js/TreeFilter/views/Group","cdf-legacy/components/filter/js/TreeFilter/views/Item","cdf-legacy/components/filter/js/TreeFilter/controllers/Manager","cdf-legacy/components/filter/js/TreeFilter/controllers/RootCtrl","cdf-legacy/components/filter/js/TreeFilter/strategies/AbstractSelect","cdf-legacy/components/filter/js/TreeFilter/strategies/MultiSelect","cdf-legacy/components/filter/js/TreeFilter/strategies/SingleSelect","cdf-legacy/components/filter/js/TreeFilter/extensions/renderers","cdf-legacy/components/filter/js/TreeFilter/extensions/sorters","cdf-legacy/components/filter/js/TreeFilter/data-handlers/InputDataHandler","cdf-legacy/components/filter/js/TreeFilter/data-handlers/OutputDataHandler","cdf-legacy/components/filter/js/TreeFilter/addIns/addIns","cdf-legacy/components/filter/styles/filter","cdf-legacy/components/filter/js/filter"],"common-ui/jquery":{"exports":"$"},"common-ui/bootstrap":["common-ui/jquery"],"common-ui/jquery-i18n":["common-ui/jquery"],"common-ui/handlebars":["common-ui/jquery"],"common-ui/ring":{"deps":["common-ui/underscore"],"exports":"ring"},"common-ui/angular":{"deps":["common-ui/jquery"],"exports":"angular"},"common-ui/angular-resource":["common-ui/angular"],"common-ui/angular-route":["common-ui/angular"],"common-ui/angular-animate":["common-ui/angular"],"common-ui/angular-sanitize":["common-ui/angular"],"common-ui/angular-ui-bootstrap":["common-ui/angular"],"common-ui/PluginHandler":["common-ui/jquery"],"common-ui/angular-directives":["common-ui/angular-ui-bootstrap"]},"map":{"*":{"css":"cdf/lib/require-css/css","text":"cdf/lib/require-text/text","cdf/cdf-module":"cdf-legacy/cdf-module","cdf-legacy/jquery":"cdf-legacy/lib/jQuery/jquery"},"cdf":{"jquery":"cdf/lib/jquery"},"cdf-legacy":{"jquery":"cdf-legacy/lib/jQuery/jquery"}},"config":{"amd":{"shim":{"cdf/lib/jquery.ui":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/theme/cupertino/jquery-ui-1.10.4.custom":""}},"cdf/lib/jquery.blockUI":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","amd!cdf/lib/jquery.ui":""}},"cdf/lib/jquery.impromptu":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/impromptu/jquery-impromptu":""}},"cdf/lib/jquery.fancybox":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/fancybox/jquery.fancybox":""}},"cdf/lib/daterangepicker.jQuery":{"exports":"jQuery","deps":{"amd!cdf/lib/jquery.ui":"jQuery","css!cdf/lib/daterangepicker/ui.daterangepicker":""},"prescript":"define = function(arr, setup) { setup(jQuery) };"},"cdf/lib/underscore":{"postscript":"return _.noConflict();"},"cdf/lib/backbone":{"deps":{"cdf/lib/jquery":"jQuery","amd!cdf/lib/underscore":"_"},"prescript":"var root = {jQuery: jQuery, _: _};\n(function() {\n","postscript":"}.call(root));\nreturn root.Backbone;"},"cdf/lib/mustache-wax":{"exports":"Mustache","deps":{"cdf/lib/mustache":"Mustache"},"prescript":"var root = {Mustache: Mustache};\n(function() {\n","postscript":"}.call(root));\nreturn root.Mustache;"},"cdf/lib/datatables":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/dataTables/css/jquery.dataTables_themeroller":"","css!cdf/lib/dataTables/css/jquery.dataTables":""}},"cdf/lib/captify":{"exports":"$","deps":{"cdf/lib/jquery":"$","css!cdf/lib/captify":""}},"cdf/lib/jquery.bgiframe":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery"}},"cdf/lib/jquery.positionBy":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery"}},"cdf/lib/jquery.jdMenu":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","amd!cdf/lib/jquery.positionBy":"","amd!cdf/lib/jquery.bgiframe":"","css!cdf/lib/jquery.jdMenu":"","css!cdf/lib/jdMenu/jquery.jdMenu.slate":""},"prescript":"var $ = jQuery;"},"cdf/lib/jquery.i18n":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery"}},"cdf/lib/queryParser":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery"}},"cdf/lib/jquery.sparkline":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery"}},"cdf/lib/jquery.corner":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery"}},"cdf/lib/jquery.select2":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/select2/select2":"","css!cdf/lib/select2/select2-bootstrap":""}},"cdf/lib/jquery.chosen":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/chosen/chosen":""}},"cdf/lib/jquery.multiselect":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","amd!cdf/lib/jquery.ui":"","css!cdf/lib/hynds/jquery.multiselect":""}},"cdf/lib/bootstrap":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/Bootstrap/css/bootstrap.css":""}},"cdf/lib/xmla":{"exports":"Xmla"},"cdf/lib/backbone.treemodel":{"exports":"Backbone","deps":{"amd!cdf/lib/underscore":"_","amd!cdf/lib/backbone":"Backbone"},"prescript":"var root = { Backbone: Backbone, _: _ };\n(function() {\n","postscript":"}.call(root));\nreturn root.Backbone;"},"cdf/lib/jquery.mCustomScrollbar":{"exports":"jQuery","deps":{"cdf/lib/jquery":"jQuery","css!cdf/lib/mCustomScrollbar/jquery.mCustomScrollbar.min":""}}}},"cdf/lib/require-text/text":{},"cdf/lib/moment":{"noGlobal":true}}});require(requireCfg);