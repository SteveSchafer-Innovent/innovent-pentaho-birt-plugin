var prefix = (typeof CONTEXT_PATH != "undefined") ? CONTEXT_PATH+'content/reporting/reportviewer' : 'reportviewer'; 
if(typeof document == "undefined" || document.location.href.indexOf("debug=true") > 0){
  requireCfg['paths']['reportviewer'] = prefix;
  requireCfg['paths']['pentaho/reportviewer'] = prefix+'/dojo/pentaho/reportviewer';
} else {
  requireCfg['paths']['reportviewer'] = prefix /* +'/compressed' */;
  requireCfg['paths']['pentaho/reportviewer'] = prefix+'/dojo/pentaho/reportviewer';
}