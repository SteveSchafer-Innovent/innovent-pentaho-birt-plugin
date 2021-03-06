define(["./UnmanagedComponent","../dashboard/Utils","../Logger","../lib/jquery","amd!../lib/underscore","amd!../lib/mustache-wax","../addIns/templateTypes","css!./TemplateComponent"],function(e,t,s,i,n,a){var r=e.extend({defaults:{templateType:"mustache",template:"<div>{{items}}</div>",rootElement:"items",formatters:{},events:[],postProcess:function(){}},messages:{error:{noData:"No data available.",invalidTemplate:"Invalid template.",invalidTemplateType:"Invalid template type.",generic:"Invalid options defined. Please check the template component properties."},success:{},warning:{},info:{},config:{style:{success:{icon:"comment",type:"success"},error:{icon:"remove-sign",type:"danger"},info:{icon:"info-sign",type:"info"},warning:{icon:"exclamation-sign",style:"warning"}},template:"<div class='alert alert-<%=type%>' role='alert'>   <span class='glyphicon glyphicon-<%=icon%>' aria-hidden='true'></span>    <span> <%=msg%> </span></div>"}},init:function(){i.extend(!0,this,n.isFunction(this.extendableOptions)?this.extendableOptions():this.extendableOptions),i.extend(!0,this.defaults,n.isFunction(this.options)?this.options():this.options)
},update:function(){n.bindAll(this,"redraw","init","processData","renderTemplate","attachEvents","processMessage","template","applyFormatter","applyAddin","processAddins"),this.init(),this.triggerQuery(this.chartDefinition,this.redraw)
},redraw:function(e){this.model=this.processData(e);var t=this.renderTemplate(this.template,this.templateType,this.model),s=this.placeholder();
s.empty().append(t),this.processAddins(s),n.isEmpty(this.events)||this.attachEvents(this.eventSelector,this.eventType,this.eventHandler)
},getUID:function(){return"xxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,s="x"===e?t:3&t|8;
return s.toString(16)})},applyFormatter:function(e,s){var i=t.propertiesArrayToObject(this.formatters)[s];
return n.isFunction(i)?i(e):e},applyAddin:function(e,t){var s=this.name+"_"+t+this.getUID();
return this.addins=this.addins||[],this.addins.push({uid:s,model:e,addin:t}),'<div id="'+s+'" class="'+t+'"/>'
},processAddins:function(e){var t=this;n.each(this.addins,function(s){t.handleAddin(n.first(e.find("#"+s.uid)),s.model,s.addin)
})},handleAddin:function(e,t,s){var i=this.getAddIn("templateType",s),n={value:t};
i.call(e,n,this.getAddInOptions("templateType",i.getName()))},processData:function(e){if(n.isFunction(this.modelHandler))return this.modelHandler(e);
var t=null!=e.queryInfo?e.queryInfo.totalRows>0:e.resultset.length>0;if(t){var s=[];
n.each(e.resultset,function(e){s.push(n.extend({},e))});var i={};return i[this.rootElement]=s,i
}return""},renderTemplate:function(e,i,r){var o="",d=this;if(n.isEmpty(r))o=this.processMessage(this.messages.error.noData,"error"),s.log(this.messages.error.noData,"error");
else{var l={formatter:function(e,t){return d.applyFormatter(e,t)},addin:function(e,t){return d.applyAddin(e,t)
}};try{switch(i.toUpperCase()){case"UNDERSCORE":r=n.defaults({},r,t.propertiesArrayToObject(l)),o=n.template(n.isFunction(e)?e():e,r);
break;case"MUSTACHE":a.Formatters=l,o=a.render(n.isFunction(e)?e():e,r);break;default:o=this.processMessage(this.messages.error.invalidTemplateType,"error")
}}catch(p){o=this.processMessage(this.messages.error.invalidTemplate,"error"),s.log(this.messages.error.invalidTemplate,"error")
}}return o},attachEvents:function(){var e=this;n.each(this.events,function(t){var s=" ",i=n.first(t).split(s),a=n.last(t),r=n.first(i),o=n.last(i);
n.isFunction(a)&&e.placeholder(o).on(r,n.bind(a,e))})},processMessage:function(e,t){var s={msg:e||"",type:this.messages.config.style[t].type||"info",icon:this.messages.config.style[t].icon||"comment"};
return n.template(this.messages.config.template,s)}});return r});