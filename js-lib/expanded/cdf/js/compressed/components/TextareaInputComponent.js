define(["../lib/jquery","./BaseComponent"],function(e,a){var n=a.extend({update:function(){var a=this,n=a.name,r="<textarea id='"+n+"' name='"+n+(a.numRows?"' rows='"+a.numRows:"")+(a.numColumns?"' cols='"+a.numColumns:"")+"'>"+a.dashboard.getParameterValue(a.parameter)+"</textarea>";
a.placeholder().html(r);var t=e("#"+n);t.change(function(){a.dashboard.getParameterValue(a.parameter)!==t.val()&&a.dashboard.processChange(n)
})},getValue:function(){return e("#"+this.name).val()}});return n});