define(["./Abstract"],function(e){return e.Views.Group=e.Views.AbstractView.extend({type:"Group",ID:"BaseFilter.Views.Group",template:{skeleton:e.templates["Group-skeleton"],selection:e.templates["Group-template"]},events:{"change    .filter-filter:eq(0)":"onFilterChange","keyup     .filter-filter:eq(0)":"onFilterChange","click     .filter-filter-clear:eq(0)":"onFilterClear","click     .filter-group-selection":"onSelection","click     .filter-collapse-icon:eq(0)":"onToggleCollapse","mouseover .filter-group-container":"onMouseOver","mouseout  .filter-group-container":"onMouseOut"},bindToModel:function(e){return this.base(e),this.onChange(e,"isSelected numberOfSelectedItems numberOfItems",this.updateSelection),this.onChange(e,"isCollapsed",this.updateCollapse)
},updateCollapse:function(){var e;return e=this.getViewModel(),this.renderCollapse(e)
},renderCollapse:function(e){var t;return this.renderSelection(e),t=[".filter-group-body",".filter-group-footer"].join(", "),e.isCollapsed?this.$(t).hide():this.$(t).show()
}}),e});