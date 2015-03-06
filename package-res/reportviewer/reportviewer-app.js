define(
	[
		"reportviewer/reportviewer-main-module",
		'dojo/parser',
		"reportviewer/reportviewer-prompt",
		'reportviewer/reportviewer',
		'reportviewer/reportviewer-logging',
		'dojo/cookie'
	],
	function(_module, parser, Prompt, Viewer, logging, cookie) {
		"use strict";
		parser.parse();

		window._isReportViewer = true;
		window._isTopReportViewer = true;
		try {
			_window.isTopReportViewer = ((window.parent === window) || !window.parent._isReportViewer);
		}
		catch(ex) {
			/*XSS*/
		}

		var inMobile = false;
		try {
			inMobile = !!window.top.PentahoMobile;
		}
		catch(ex) {
			/*XSS*/
		}

		Dashboards.blockUIwithDrag = function() {
			// blockUI has concurrency issues (see BISERVER-8124)
			// forcing no-op with override
		}
		var options;
		if(_isTopReportViewer) {
			var qs;
			try {
				qs = window.top.location.search;
			}
			catch(ex) {
				/*XSS*/
				qs = window.location.search;
			}

			options = {
				enabled: !!qs && ("&" + qs.substr(1)).indexOf("&debug=true") >= 0
			};
		}
		else {
			options = {
				parent: window.parent.logger
			};
		}

		window.logged = logging.create(/*logger id*/window.name, options);
		window.logger = window.logged.logger; // may be null

		window.prompt = new Prompt();
		window.viewer = new Viewer(prompt);
		window.prompt.load();

		$(window).resize(logged('window.resize', function() {
			viewer.view.onViewportResize();
		}));

		$(document).ready(function () {
			cookie('scrollValue', "", { expires: -1 });
			$("iframe#reportContent").load(function() {
				var scrollVal = 0;
				scrollVal = cookie('scrollValue');
				if(scrollVal) {
					$("#promptPanel").contents().find("div.parameter-wrapper").animate({scrollLeft: scrollVal},'slow');
				}

				$("#promptPanel").contents().find("button").click(function() {
					cookie('scrollValue', "", { expires: -1 });
					cookie('scrollValue', $('#promptPanel').contents().find("div.parameter-wrapper").scrollLeft(), { expires: 5 });
				});
			});	
		});
	}
);