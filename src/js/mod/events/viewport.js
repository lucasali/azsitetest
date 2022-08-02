(function(global) {
    'use strict';

    function ViewportEvent() {
		var PUBLIC = this;
		var PRIVATE = {};
		var detail = {
            getViewport: PRIVATE.getViewport,
            getDocWidth: PRIVATE.getDocWidth,
            calculeViewport: PRIVATE.calculeViewport
        };
        var VIEWPORT;
        var EVENTS = {
            small: new CustomEvent('small', { detail: detail }),
            medium: new CustomEvent('medium', { detail: detail }),
            large: new CustomEvent('large', { detail: detail }),
            xlarge: new CustomEvent('xlarge', { detail: detail }),
            xxlarge: new CustomEvent('xxlarge', { detail: detail }),
            xxxlarge: new CustomEvent('xxxlarge', { detail: detail })
        };

		PRIVATE.getDocWidth = function() {
            var body = document.body;
            var html = document.documentElement;

			return Math.max(
			    body.scrollWidth, html.scrollWidth,
				body.offsetWidth, html.offsetWidth,
				body.clientWidth, html.clientWidth
			);
		};

		PRIVATE.getViewport = function() {
			return VIEWPORT;
		};

		PRIVATE.setViewport = function(viewport) {
			VIEWPORT = viewport;
            global.dispatchEvent(EVENTS[viewport]);
		};

		PRIVATE.calculeViewport = function() {
			var lastViewport = PRIVATE.getViewport();
            var width = PRIVATE.getDocWidth();

			switch(true) {
				case width >= 1600 && (lastViewport !== 'xxxlarge'):
					PRIVATE.setViewport('xxxlarge');
					break;
				case width >= 1440 && width < 1600 && (lastViewport !== 'xxlarge'):
					PRIVATE.setViewport('xxlarge');
					break;
				case width >= 1280 && width < 1440 && (lastViewport !== 'xlarge'):
					PRIVATE.setViewport('xlarge');
					break;
				case width >= 1024 && width < 1280 && (lastViewport !== 'large'):
					PRIVATE.setViewport('large');
					break;
				case width >= 640 && width < 1024 && (lastViewport !== 'medium'):
					PRIVATE.setViewport('medium');
					break;
				case width >= 320 && width < 640 && (lastViewport !== 'small'):
					PRIVATE.setViewport('small');
					break;
			}
		};

        (function() {
            PRIVATE.calculeViewport();
            global.addEventListener('resize', PRIVATE.calculeViewport);
        })();

        return PUBLIC;
    }

    try {
        var viewport = new ViewportEvent();
    } catch(error) {
        console.error(error);
    }
})(window);
