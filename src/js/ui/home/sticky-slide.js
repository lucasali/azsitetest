(function() {
    'use strict';

    function homeMenuCaseSticky() {
        var lastId;
        var currentIndex = 0;
        var panelList =  [
            'proofContent',
            'zeroTrustContent',
            'ultimateUxContent',
            'devicesRealtimeContent',
            '5gContent'
        ];
        var menucase = document.querySelector('#menuCase');
        var arrowLeft = document.querySelectorAll('.box-arrow-left')[0];
        var arrowRight = document.querySelectorAll('.box-arrow-right')[0];
        var listOffsetTop;

        if(!menucase) {
            return;
        }

        function calcMenuCaseScrollSize() {
            return menucase.scrollWidth - menucase.offsetWidth;
        }

    	function elementListOffsetTop(list) {
    		if(!Array.isArray(list) || !list.length) {
    			list = panelList;
    		}

    		var currentScrollTop = getDocumentElementScrollTop();
            var offsetTop = {};

    		window.scrollTo(0, 0);

            for(var i = 0; i < list.length; i++) {
                var id = list[i];
                offsetTop[id] = recursiveOffsetTop(id);
            }

    		window.scrollTo(0, currentScrollTop);

            return offsetTop;
    	}

    	function getDocumentElementScrollTop() {
    		return window.scrollY;
    	}

    	function recursiveOffsetTop(id) {
    		// with sticky element will only work
    		// from top 0px
    		// the scroll should be before the sticky scroll

    	    var sContent = document.getElementById(id);
     		var sTop = 0;

            if(!sContent) {
                return;
            }

            while(true) {
                if(sContent.tagName === 'BODY') {
                    break;
                }

                sTop += sContent.offsetTop;
                sContent = sContent.parentElement;
            }

    		return sTop;
    	}

        function scrollto(id) {
            if(!id || typeof id !== 'string') {
                return;
            }

            window.scrollTo(0, 0);
            window.scrollTo(0, recursiveOffsetTop(id));
        }

        function enablePanelByOffsetY() {
            var sc = getDocumentElementScrollTop();

            for(var i = 0; i < panelList.length; i++) {
                var panelId = panelList[i];
                var nextPanelId = panelList[ (i + 1 < panelList.length) ? i + 1 : null];

                if(
                    (nextPanelId && sc >= listOffsetTop[panelId] && sc < listOffsetTop[nextPanelId]) ||
                    (!nextPanelId && sc >= listOffsetTop[panelId])
                ) {
                    if(panelId === lastId) {
                        break;
                    }

                    currentIndex = i;
                    lastId = panelId;

                    clearActive();
                    active(  document.querySelectorAll('a[data-content-id="' + panelId + '"]')[0].parentElement );

                    break;
                }
            }
        }

        function active(el) {
            el.classList.add('active');
        }

        function clearActive() {
            var activeList = menucase.querySelectorAll('.active');

            for(var i = 0; i < activeList.length; i++) {
                activeList[i].classList.remove('active');
            }
        }

        function previousPanel() {
            if(currentIndex - 1 < 0) {
                return;
            }

            --currentIndex;
            scrollto(panelList[currentIndex]);
        }

        function nextPanel() {
            if(currentIndex + 1 >= panelList.length) {
                return;
            }

            ++currentIndex;
            scrollto(panelList[currentIndex]);
        }

        function menucaseScrollCalculing() {
            var mcsz = calcMenuCaseScrollSize();

            var scrollsize = mcsz / panelList.length;
            var scroll = scrollsize * currentIndex;

            if(currentIndex < 1) {
                scroll = 0;
            } else if(currentIndex === panelList.length - 1) {
                scroll = mcsz;
            }

            menucase.style.left = '-' + scroll + 'px';
        }

        function resetArrowEnabled() {
            arrowLeft.classList.remove('disable');
            arrowRight.classList.remove('disable');
        }

        function arrowPrevDisable() {
            arrowLeft.classList.add('disable');
        }

        function arrowNextDisable() {
            arrowRight.classList.add('disable');
        }

        function controllVisibilityNavigation() {
            resetArrowEnabled();

            if(currentIndex - 1 < 0) {
                arrowPrevDisable();
            } else if (currentIndex + 1 >= panelList.length) {
                arrowNextDisable();
            }
        };

    	(function() {
            var arrowLeft = document.querySelectorAll('.box-arrow-left')[0];
            var arrowRight = document.querySelectorAll('.box-arrow-right')[0];

            arrowLeft.addEventListener('click', function() {
                previousPanel();
                menucaseScrollCalculing();
                controllVisibilityNavigation();
            });

            arrowRight.addEventListener('click', function() {
                nextPanel();
                menucaseScrollCalculing();
                controllVisibilityNavigation();
            });

    		menucase.addEventListener('click', function(e) {
                var el = e.target;
                var elParentElement = el.parentElement;
                var contentId = el.getAttribute('data-content-id');

        		if(elParentElement.tagName !== 'LI') {
                    return;
                }

    			clearActive();
                active(elParentElement);
                scrollto(contentId);
                controllVisibilityNavigation();
            });

            window.addEventListener('scroll', function() {
                enablePanelByOffsetY();
                menucaseScrollCalculing();
                controllVisibilityNavigation();
            });

            window.addEventListener('resize', function() {
                listOffsetTop = elementListOffsetTop();
                menucaseScrollCalculing();
            });
    	})();

        listOffsetTop = elementListOffsetTop();
        enablePanelByOffsetY();
        controllVisibilityNavigation();
    };

    function renderAppend(tplName) {
        try {
            return new Promise(function(resolve, reject) {
                var Liquid = window.liquidjs.Liquid;
                var engine = new Liquid({extname: '.html', cache: false});
                var content = document.querySelector('#cases');

                if(!content) {
                    console.log('[!] Not found #cases element.');
                    return;
                }

                engine.parseAndRender(
                    "{% include '/static/templates/home/" + tplName + ".html' %}",
                    window.liquidjstpl.home || {}
                ).then(function(html) {
                    content.innerHTML = html;
                    resolve();
                });
            });
        } catch(e) {
            console.error(error);
        }
    };

    window.addEventListener('small', function() {
        renderAppend('banner').then(function() {
            var swiper = new Swiper('.swiper', {
                pagination: {
                    el: '.swiper-pagination'
                },
            });
        });
    });

    window.addEventListener('medium', function() {
        renderAppend('banner').then(function() {
            var swiper = new Swiper('.swiper', {
                pagination: {
                    el: '.swiper-pagination'
                },
            });
        });
    });

    window.addEventListener('large', function() {
        renderAppend('sticky').then(function() {
            homeMenuCaseSticky();
        });
    });

    window.addEventListener('xlarge', function() {
        renderAppend('sticky').then(function() {
            homeMenuCaseSticky();
        });
    });

    window.addEventListener('xxlarge', function() {
        renderAppend('sticky').then(function() {
            homeMenuCaseSticky();
        });
    });

    window.addEventListener('xxxlarge', function() {
        renderAppend('sticky').then(function() {
            homeMenuCaseSticky();
        });
    });
})();
