define(["./QueryComponent","./BaseComponent","amd!../lib/underscore","../lib/jquery","css!./AutocompleteBoxComponent"],function(e,t,a,n){var i=t.extend({result:[],selectedValues:[],_queryServer:function(){this.parameters||(this.parameters=[]),this.searchParam?this.parameters=[[this.searchParam,this._getInnerParameterName()]]:this.parameters.length>0&&(this.parameters[0][1]=this._getInnerParameterName()),this.maxResults&&(this.queryDefinition.pageSize=this.maxResults),this.dashboard.setParameter(this._getInnerParameterName(),this._getTextBoxValue()),e.makeQuery(this)
},_getTextBoxValue:function(){return this.textbox.val()},_getInnerParameterName:function(){return this.parameter+"_textboxValue"
},_setInitialValue:function(){var e=this.parameter,t=null;if(e&&(t=this.dashboard.getParameterValue(e)),null!=t&&a.isArray(t))for(var n=0,i=t.length;i>n;n++)this._selectValue(t[n])
},update:function(){this.placeholder().empty();var e=this,t=this.selectMulti||!1,a=this._getOptions();
this.dashboard.getParameterValue(this._getInnerParameterName())||this.dashboard.setParameter(this._getInnerParameterName(),""),this.textbox=n('<input class="autocomplete-input">');
var i=n('<div class="autocomplete-container">');if(t){var s=this.tooltipMessage||"Click it to Apply",o=n('<input type="button" class="autocomplete-input-apply" style="display: none" title="'+s+'" value="S"/>').click(function(){e._endSearch()
});i.append(o)}i.append(this.textbox).append('<ul class="list-data-selection">').appendTo(this.placeholder()),this.textbox.autocomplete(a),n(".autocomplete-container .ui-autocomplete").off("menuselect"),this.textbox.data("ui-autocomplete")._renderItem=function(a,i){var s=n('<li class="list-item">'),o=n("<a>"+(t?'<input type="checkbox"/>':"")+i.label+"</a>").click(function(a){var s=n(this).find("input");
n(a.srcElement).is("a")&&s.prop("checked",!s.is(":checked")),t?s.is(":checked")?e._selectValue(i.label):e._removeValue(i.label):(e._selectValue(i.label),e._endSearch())
});return o.appendTo(s),s.appendTo(a)},n("#"+this.externalApplyButtonId).click(function(){e._endSearch()
}),this._setInitialValue()},getValue:function(){return this.value},_getOptions:function(){var e=this,t=null==this.processChange?function(){var t=a.extend({},e);
t.value=e.selectedValues,e.dashboard.processChange(t.name)}:function(){e.processChange()
},i={appendTo:".autocomplete-container",minLength:this.minTextLength||0,source:function(t,a){e._search(t,a)
},focus:function(e){e.preventDefault()},open:function(){var t=e.scrollHeight||0;t>0&&n(".autocomplete-container .ui-autocomplete").css({"max-height":t+"px","overflow-y":"auto"}),e._filterData()
},close:function(){t()}};return i},_selectValue:function(e){var t=this,a=null!=this.addTextElements?this.addTextElements:!0,i=null!=this.showApplyButton?this.showApplyButton:!0,s=n(".autocomplete-container .list-data-selection"),o=n('<li id="'+e+'"><input type="button" class="close-button" value="x"/>'+e+"</li>");
this.selectMulti?i&&(n(".autocomplete-container").addClass("show-apply-button"),n(".autocomplete-input-apply").show()):(s.empty(),this.selectedValues=[]),o.find("input").click(function(){t._removeValue(e)
}),a&&o.appendTo(s),this.selectedValues.push(e)},_removeValue:function(e){this.selectedValues=a.without(this.selectedValues,e),n('.autocomplete-container .list-data-selection li[id="'+e+'"]').remove()
},_filterData:function(){var e=n(".autocomplete-container .ui-autocomplete"),t=this.selectedValues||[],a=null!=this.addTextElements?this.addTextElements:!0;
t.length>0&&(e.find("li").each(function(){var e=n(this),i=e.text();t.indexOf(i)>-1&&(a?e.remove():e.find("input").prop("checked",!0))
}),0==e.find("li").length&&e.hide())},_search:function(e,t){var a=this.matchType||"fromStart",n=e.term.toLowerCase();
this._queryServer(n);var i=this.result,s=[];for(var o in i)if(i.hasOwnProperty(o)){var l=i[o][0];
(null!=l&&"fromStart"===a&&0==l.toLowerCase().indexOf(n)||"all"===a&&l.toLowerCase().indexOf(n)>-1)&&s.push(l)
}t(s)},_endSearch:function(){var e=n(".autocomplete-container");e.removeClass("show-apply-button"),e.find(".autocomplete-input-apply").hide(),this.textbox.val(""),this.textbox.autocomplete("close")
},_processAutoBoxChange:function(){this.textbox.autocomplete("change")}});return i
});