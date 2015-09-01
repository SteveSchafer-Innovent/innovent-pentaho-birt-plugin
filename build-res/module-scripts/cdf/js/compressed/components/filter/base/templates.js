define(["cdf/lib/jquery","./BaseFilter"],function(e,l){return e.extend(!0,l.templates,{"Group-skeleton":['<div class="filter-group-container {{className}}">',"",'<div class="filter-group-header"/>',"",'<div class="filter-group-body">','<div class="filter-group-items-container">','<div class="filter-group-items"></div>',"</div>","</div>","",'<div class="filter-group-footer">',"{{#showPagination}}",'<button class="filter-btn-more-data">More...</button>',"{{/showPagination}}","{{{footer}}}","</div>","","</div>",""].join(""),"Group-template":['<div class="filter-group-header',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}",'">',"","{{#showButtonCollapse}}",'<div class="filter-collapse-icon',"{{#isCollapsed}} collapsed{{/isCollapsed}}","{{^isCollapsed}} expanded{{/isCollapsed}}",'" />',"{{/showButtonCollapse}}","",'<div class="filter-group-title">',"{{{label}}}","</div>","",'<div class="filter-controls">',"{{#showFilter}}",'<div class="filter-filter">','<input type="text" class="filter-filter-input" />','<div class="filter-filter-icon" />','<div class="filter-filter-clear" />',"</div>","{{/showFilter}}","{{#showCommitButtons}}",'<div class="filter-controls-buttons">','<div class="filter-controls-button">','<button class="filter-btn-cancel">{{strings.btnCancel}}</button>',"</div>",'<div class="filter-controls-button">','<button class="filter-btn-apply">{{strings.btnApply}}</button>',"</div>","</div>","{{/showCommitButtons}}","</div>","","","{{#allowGroupSelection}}",'<div class="filter-group-selection">',"",'<div class="filter-group-selection-icon',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}",'" />',"",'<div class="filter-group-label">',"{{strings.groupSelection}}","</div>","","","</div>","{{/allowGroupSelection}}","{{#showValue}}",'<div class="filter-group-selection-value">',"{{{value}}}","</div>","{{/showValue}}","","","</div>",""].join(""),"Item-template":['<div class="filter-item-container',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}",'">',"","{{#header}}",'<div class="filter-item-header"> {{{header}}} </div>',"{{/header}}","",'<div class="filter-item-body">','<!-- <label class="filter-item-label"> -->','<!-- <input type="checkbox" {{#isSelected}}checked="true"{{/isSelected}} /> -->',"<!-- {{{label}}} -->","<!-- </label> -->","{{{item}}}","",'<div class="filter-item-selection-icon">',"<div />","</div>","","{{#showButtonOnlyThis}}",'<span class="filter-item-only-this">',"{{{strings.btnOnlyThis}}}","</span>","{{/showButtonOnlyThis}}","",'<div class="filter-item-label"','title="{{{label}}}"',">","{{{label}}}","</div>","","{{#showValue}}",'<div class="filter-item-value">',"{{{value}}}","</div>","{{/showValue}}","</div>","","{{#footer}}",'<div class="filter-item-footer"> {{{footer}}} </div>',"{{/footer}}","","</div>",""].join(""),"Root-footer":['<div class="filter-root-footer">',"","{{#isBusy}}",'<div class="filter-busy clearfix">','<div class="floatingBarsG">','<div class="blockG rotateG_01"></div>','<div class="blockG rotateG_02"></div>','<div class="blockG rotateG_03"></div>','<div class="blockG rotateG_04"></div>','<div class="blockG rotateG_05"></div>','<div class="blockG rotateG_06"></div>','<div class="blockG rotateG_07"></div>','<div class="blockG rotateG_08"></div>',"</div>",'<div class="filter-busy-info">Fetching data...</div>',"</div>","{{/isBusy}}","{{#reachedSelectionLimit}}",'<div class="filter-root-notification">',"The selection limit (",'<span class="filter-notification-highlight">{{selectionStrategy.limit}}</span>',") for specific items has been reached.","</div>","{{/reachedSelectionLimit}}","</div>",""].join(""),"Root-header":['<div class="filter-root-header',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}",'">','<div class="filter-root-header-label"',"{{#showTooltip}}",'title="{{#header}}{{{header}}}{{/header}}{{^header}}{{#selectedItems}}{{{.}}}{{/selectedItems}}{{/header}}"',"{{/showTooltip}}",">","","{{#isDisabled}}","{{{strings.isDisabled}}}","{{/isDisabled}}","","{{^isDisabled}}","{{#showSelectedItems}}",'<span class="filter-root-info-selected-items">',"{{^noItemsSelected}}",'<span class="filter-root-info-selected-item"','title="{{#selectedItems}}{{{.}}} {{/selectedItems}}"',">","{{#selectedItems}}","{{{.}}}","{{/selectedItems}}","</span>","{{/noItemsSelected}}","{{#noItemsSelected}}",'<span class="filter-root-info-selected-item">',"{{{strings.noItems}}}","</span>","{{/noItemsSelected}}","</span>","{{/showSelectedItems}}","","","{{#showNumberOfSelectedItems}}","{{#allItemsSelected}}",'<span class="filter-root-info-selected-items">',"{{{strings.allItems}}}","</span>","{{/allItemsSelected}}","","{{#noItemsSelected}}",'<span class="filter-root-info-selected-items">',"{{{strings.noItems}}}","</span>","{{/noItemsSelected}}","","{{^allItemsSelected}}","{{^noItemsSelected}}",'<span class="filter-root-info-selected-items">','<span class="filter-root-info-number-selected-items">',"{{numberOfSelectedItems}}","</span>",'<span class="filter-root-info-number-items">',"&nbsp;/&nbsp;{{numberOfItems}}","</span>","</span>","{{/noItemsSelected}}","{{/allItemsSelected}}","{{/showNumberOfSelectedItems}}","{{/isDisabled}}","</div>",'<div class="filter-collapse-icon',"{{^isDisabled}}","{{^alwaysExpanded}}","{{#isCollapsed}} collapsed{{/isCollapsed}}","{{^isCollapsed}} expanded {{/isCollapsed}}","{{/alwaysExpanded}}","{{#alwaysExpanded}} always-expanded{{/alwaysExpanded}}","{{/isDisabled}}","","{{#isDisabled}} disabled{{/isDisabled}}","",'" />',"</div>",""].join(""),"Root-overlay":["{{#useOverlay}}",'<div class="filter-overlay',"{{^alwaysExpanded}}","{{#isCollapsed}} collapsed{{/isCollapsed}}","{{^isCollapsed}} expanded {{/isCollapsed}}","{{/alwaysExpanded}}","{{#alwaysExpanded}} always-expanded{{/alwaysExpanded}}",'" />',"{{/useOverlay}}",""].join(""),"Root-skeleton":['<div class="filter-title">{{{strings.title}}}</div>','<div class="filter-root-container',"{{#className}} {{className}}{{/className}}","{{#styles}} {{.}} {{/styles}}","{{#isDisabled}} disabled{{/isDisabled}}",'">',"{{#useOverlay}}",'<div class="filter-overlay',"{{^alwaysExpanded}}","{{#isCollapsed}} collapsed{{/isCollapsed}}","{{^isCollapsed}} expanded {{/isCollapsed}}","{{/alwaysExpanded}}","{{#alwaysExpanded}} always-expanded{{/alwaysExpanded}}",'" />',"{{/useOverlay}}",'<div class="filter-root-header',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}","","{{^alwaysExpanded}}","{{#isCollapsed}} collapsed{{/isCollapsed}}","{{^isCollapsed}} expanded {{/isCollapsed}}","{{/alwaysExpanded}}","{{#alwaysExpanded}} always-expanded{{/alwaysExpanded}}",'">','<div class="filter-root-header-label">',"{{{header}}}","</div>",'<div class="filter-root-collapse-icon" />',"</div>","",'<div class="filter-root-body" >','<div class="filter-root-control" />','<div class="filter-root-items-container">','<div class="filter-root-items" />',"</div>",'<div class="filter-root-footer"> {{{footer}}} </div>',"</div>","","</div>",""].join(""),"Root-template":['<div class="filter-root-control',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}","","{{^alwaysExpanded}}","{{#isCollapsed}} collapsed{{/isCollapsed}}","{{^isCollapsed}} expanded {{/isCollapsed}}","{{/alwaysExpanded}}","{{#alwaysExpanded}} always-expanded{{/alwaysExpanded}}",'">','<div class="filter-controls">',"","{{#showCommitButtons}}",'<div class="filter-control-buttons">','<div class="filter-control-button">','<button class="filter-btn-cancel',"{{#hasChanged}} dirty{{/hasChanged}}","{{^hasChanged}} pristine{{/hasChanged}}",'"',">","{{{strings.btnCancel}}}","</button>","</div>",'<div class="filter-control-button">','<button class="filter-btn-apply',"{{#hasChanged}} dirty{{/hasChanged}}","{{^hasChanged}} pristine{{/hasChanged}}",'"','{{^hasChanged}} disabled="disabled"{{/hasChanged}}',">","{{{strings.btnApply}}}","</button>","</div>","</div>","{{/showCommitButtons}}","","{{#showFilter}}",'<div class="filter-filter">','<input type="text" class="filter-filter-input" />','<div class="filter-filter-icon" />','<div class="filter-filter-clear" />',"</div>","{{/showFilter}}","","</div>","","","",'<div class="filter-root-selection">',"","{{#showGroupSelection}}",'<div class="filter-root-selection-icon',"{{#isPartiallySelected}} some-selected{{/isPartiallySelected}}","{{^isPartiallySelected}}","{{#isSelected}} all-selected{{/isSelected}}","{{^isSelected}} none-selected{{/isSelected}}","{{/isPartiallySelected}}",'" />','<div class="filter-root-selection-label">',"{{{label}}}","</div>","","{{#showValue}}",'<div class="filter-root-selection-value">',"{{{value}}}","</div>","{{/showValue}}","","{{/showGroupSelection}}","","{{#showSelectedItems0}}",'<div class="filter-selected-items">',"{{#selectedItems}}",'<span class="filter-selected-item">{{.}}</span>',"{{/selectedItems}}","</div>","{{/showSelectedItems0}}","","</div>","","","</div>",""].join(""),undefined:"No template"}),l
});