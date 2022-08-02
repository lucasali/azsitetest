(function() {
    'use strict';


    if(window.azstickyslide) {
        console.warn('[!] azstickyslide it is already loaded! ', window.azstickyslide);
        return;
    }

    window.azstickyslide = function(data) {
        if(!data) {
            data = {};
        };

        if(!data.content) {
            console.error('[!] Invalid data.content argument. ', data,content);
            return;
        }


        var lastIndex;
        var currentIndex = 0;
        var content = document.querySelector(data.content);
        var panelList = [];
        var arrowLeft = content.querySelectorAll(data.navigation.prevEl)[0];
        var arrowRight = content.querySelectorAll(data.navigation.nextEl)[0];
        var listOffsetTop;


        // removing from list the transparent item
        // the last element goal is to fix the offsettop of the last index
        var qsPanelList = content.querySelectorAll('.sticky-item');
        for(var i = 0; i < qsPanelList.length - 1; i++) {
            panelList.push(qsPanelList[i])
        }


        function elementListOffsetTop(list) {
            if(!Array.isArray(list) || !list.length) {
                list = panelList;
            }

            var currentScrollTop = getDocumentElementScrollTop();
            var offsetTop = [];

            window.scrollTo(0, 0);

            for(var i = 0; i < list.length; i++) {
                offsetTop.push( recursiveOffsetTop(list[i]) );
            }

            window.scrollTo(0, currentScrollTop);

            return offsetTop;
        }

        function getDocumentElementScrollTop() {
            // getting current position of Document Element Scroll top
            return window.scrollY;
        }

        function recursiveOffsetTop(element) {
            // with sticky element will only work
            // from top 0px
            // the scroll should be before the sticky scroll

            //var sContent = document.getElementById(id);
            var sTop = 0;

            if(!element) {
                return;
            }

            while(true) {
                if(element.tagName === 'BODY') {
                    break;
                }

                sTop += element.offsetTop;
                element = element.parentElement;
            }

            return sTop;
        }

        function scrollto(domelement) {
            if(!domelement) {
                console.warn('[!] domelement param it is not valid. ', domelement)
                return;
            }

            window.scrollTo(0, 0);
            window.scrollTo(0, recursiveOffsetTop(domelement));
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

        function getCurrentIndex() {
            return currentIndex;
        };

        function dinamycIndex() {
            var sc = getDocumentElementScrollTop();

            for(var i = 0; i < panelList.length; i++) {
                var nextIndex = (i + 1 < panelList.length) ? i + 1 : null;
                var nextPanelId = panelList[nextIndex];

                if(
                    (nextPanelId && sc >= listOffsetTop[i] && sc < listOffsetTop[nextIndex]) ||
                    (!nextPanelId && sc >= listOffsetTop[i])
                ) {
                    if(i === lastIndex) {
                        break;
                    }

                    currentIndex = i;
                    lastIndex = i;

                    break;
                }
            }
        }

        function reloadElementListOffsetTop() {
            listOffsetTop = elementListOffsetTop();
        };

        function reloadCounter() {
            if(!data.counter) {
                return;
            }

            var currentElement = content.querySelectorAll(data.counter.current)[0];
            var totalElement = content.querySelectorAll(data.counter.total)[0];
            var index = getCurrentIndex() + 1;

            currentElement.innerHTML = index < 10 ? '0' + String(index) :  index;
            totalElement.innerHTML = panelList.length < 10 ? '0' + String(panelList.length) :  panelList.length;

            progressBar();
        };

        function progressBar() {
            if(!data.progressbar) {
                return;
            }

            var c = 100 / panelList.length;
            var progressbar = content.querySelectorAll(data.progressbar)[0];
            var calc = c * (getCurrentIndex() + 1);
            var w = `calc(${calc}% - 2rem)`;

            progressbar.style.width = w;
        };


        ////////////////////
        // MAIN EXECUTION //
        ////////////////////


        reloadElementListOffsetTop();
        dinamycIndex();
        reloadCounter();


        ////////////
        // EVENTS //
        ///////////


        if(data.navigation && (arrowLeft && arrowRight)) {
            arrowLeft.addEventListener('click', function() {
                previousPanel();
            });

            arrowRight.addEventListener('click', function() {
                nextPanel();
            });
        }


        window.addEventListener('scroll', function() {
           dinamycIndex();
           reloadCounter();
        });

        window.addEventListener('resize', function() {
            reloadElementListOffsetTop();
        });


        ///////////////////////
        // EXPORTING METHODS //
        ///////////////////////


        this.getCurrentIndex = getCurrentIndex;
        this.previousPanel = previousPanel;
        this.nextPanel = nextPanel;
        this.getDocumentElementScrollTop = getDocumentElementScrollTop;
        this.elementListOffsetTop = elementListOffsetTop;
        this.reloadElementListOffsetTop = reloadElementListOffsetTop;


        ////////////////////////
        // RETURNING INSTANCE //
        ////////////////////////


        return this;
    };
})();
