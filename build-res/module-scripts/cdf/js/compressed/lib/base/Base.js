!function(t,e,n){"undefined"!=typeof module?module.exports=n():"undefined"!=typeof define&&"object"==typeof define.amd?define(n):e[t]=n()
}("Base",this,function(){var t=function(){};return t.extend=function(e,n){var o=t.prototype.extend;
t._prototyping=!0;var r=new this;o.call(r,e),r.base=function(){},delete t._prototyping;
var i=r.constructor,s=r.constructor=function(){if(!t._prototyping)if(this._constructing||this.constructor===s)this._constructing=!0,i.apply(this,arguments),delete this._constructing;
else if(null!==arguments[0])return(arguments[0].extend||o).call(arguments[0],r)};
return s.ancestor=this,s.extend=this.extend,s.forEach=this.forEach,s.implement=this.implement,s.prototype=r,s.toString=this.toString,s.valueOf=function(t){return"object"===t?s:i.valueOf()
},o.call(s,n),"function"==typeof s.init&&s.init(),s},t.prototype={extend:function(e,n){if(arguments.length>1){var o=this[e];
if(o&&"function"==typeof n&&(!o.valueOf||o.valueOf()!==n.valueOf())&&/\bbase\b/.test(n)){var r=n.valueOf();
n=function(){var e=this.base||t.prototype.base;this.base=o;var n=r.apply(this,arguments);
return this.base=e,n},n.valueOf=function(t){return"object"===t?n:r},n.toString=t.toString
}this[e]=n}else if(e){var i=t.prototype.extend;t._prototyping||"function"==typeof this||(i=this.extend||i);
for(var s={toSource:null},u=["constructor","toString","valueOf"],a=t._prototyping?0:1;a<u.length;a++){var f=u[a];
e[f]!==s[f]&&i.call(this,f,e[f])}for(var c in e)s[c]||i.call(this,c,e[c])}return this
}},t=t.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(t,e,n){for(var o in t)void 0===this.prototype[o]&&e.call(n,t[o],o,t)
},implement:function(){for(var t=0;t<arguments.length;t++)"function"==typeof arguments[t]?arguments[t](this.prototype):this.prototype.extend(arguments[t]);
return this},toString:function(){return String(this.valueOf())}})});