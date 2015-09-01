define(["./InputBaseComponent","../Logger","../lib/jquery","amd!../lib/underscore","../dashboard/Utils","amd!../lib/jquery.chosen","amd!../lib/jquery.multiselect","amd!../lib/jquery.select2"],function(e,t,a,s,i){var n=e.extend({visible:!1,draw:function(e){var t=this.placeholder(),s=this.name,n="<select",l=this._allowMultipleValues();
l&&(n+=" multiple");var r=this._getPlaceholderText();r&&(n+=" data-placeholder='"+r+"'");
var o=this._getListSize(e);null!=o&&(n+=" size='"+o+"'",e.length>o&&(n+=" style='overflow-y: scroll;' "));
var u=this.externalPlugin;switch(u){case"chosen":n+=" class='chzn-select'";break;
case"hynds":n+=" class='hynds-select'";break;case"select2":n+=" class='select2-container'"
}n+=">";var c,h=this._getParameterValue(),d=i.parseMultipleValues(h),g={};i.eachValuesArray(e,{valueAsId:this.valueAsId},function(e,t,a,s){n+="<option value = '"+i.escapeHtml(e)+"' >"+i.escapeHtml(t)+"</option>",s||(c=e),g[e]=!0
},this),n+="</select>",t.html(n);var p=!0;if(null!=d){for(var f=d.length;f--;)g[d[f]]!==!0&&(p=!1,d.splice(f,1));
d.length||(d=null)}var m=null==d,v=!p;switch(m&&this.defaultIfEmpty&&null!=c&&(d=[c],v=!0),a("select",t).val(null==d?[]:d),l&&(null!=this.autoTopValue?(this.topValue(this.autoTopValue),delete this.autoTopValue):null!=this.autoTopIndex&&(this.topIndex(this.autoTopIndex),delete this.autoTopIndex)),this._doAutoFocus(),v&&(this.dashboard.setParameter(this.parameter,d),this.dashboard.processChange(s)),u){case"chosen":var b=a.browser;
a.browser="",t.find("select.chzn-select").chosen(this._readExtraOptions()),a.browser=b;
break;case"hynds":t.find("select.hynds-select").multiselect({multiple:l});break;case"select2":var x=this._readExtraOptions()||{};
"undefined"==typeof x.dropdownAutoWidth&&(x.dropdownAutoWidth=!0),x.width||(x.width="off"),t.find("select.select2-container").select2(x)
}this._listenElement(t)},_allowMultipleValues:function(){return!1},_getPlaceholderText:function(){var e=this.placeholderText;
return s.isString(e)&&!s.isEmpty(e)&&e||!1},_getListSize:function(){return this.size
},_readExtraOptions:function(){return this.externalPlugin&&this.extraOptions?i.propertiesArrayToObject(this.extraOptions):void 0
},_listenElement:function(e){var t,s=this,n=s.getValue(),l=function(){t&&t();var e=s.dashboard;
if(e){var a=s.getValue();i.equalValues(n,a)||(n=a,e.processChange(s.name))}},r=a("select",e);
r.keypress(function(e){13===e.which&&l()});var o=this._getChangeMode();if("timeout-focus"!==o)r.on(s._changeTrigger(),l);
else{var u=s.changeTimeoutScrollFraction;u=Math.max(0,null!=u?u:1);var c=s.changeTimeoutChangeFraction;
c=Math.max(0,null!=c?c:5/8);var h,d=Math.max(100,s.changeTimeout||2e3),g=u*d,p=c*d;
t=function(){null!=h&&(clearTimeout(h),h=null)};var f=function(e){t(),s.dashboard&&(h=setTimeout(l,e||d))
};r.change(function(){f(p)}).scroll(function(){f(g)}).focusout(l)}},_getChangeMode:function(){var e=this.changeMode;
if(e)switch(e=e.toLowerCase()){case"immediate":case"focus":return e;case"timeout-focus":return/android|ipad|iphone/i.test(navigator.userAgent)?"focus":e;
default:t.log("Invalid 'changeMode' value: '"+e+"'.","warn")}return"immediate"},_changeTrigger:function(){return"immediate"===this._getChangeMode()?"change":/android/i.test(navigator.userAgent)?"change":"focusout"
}});return n});