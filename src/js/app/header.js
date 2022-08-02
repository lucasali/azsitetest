(function() {
    'use strict';
    var ELEMENT = {};
    var timeout = false;
    var scrollPosition = 0;
    var scrollDirection;
    ELEMENT.position;
    ELEMENT.id = '#azheader';
    ELEMENT.header = document.querySelector(ELEMENT.id);
    ELEMENT.topBar = document.getElementById('topBar');
    if(!ELEMENT.header) {
        console.warn(`Element using id ${ELEMENT.id} not found.`);
        return;
    }
    window.addEventListener('scroll', function(e) {
        if(timeout) return;
        timeout = true;
        setTimeout(function() {
            scrollDirection = (document.body.getBoundingClientRect()).top > scrollPosition ? 'up' : 'down';
            scrollPosition = (document.body.getBoundingClientRect()).top;
            if(scrollDirection === 'down' && ELEMENT.position !== 'down') {
                ELEMENT.position = 'down';
                ELEMENT.header.style.top = '-100px';
            } else if(scrollDirection === 'up' && ELEMENT.position !== 'up') {
                ELEMENT.position = 'up';
                if(ELEMENT.topBar) {
                    ELEMENT.header.style.top = `${ELEMENT.topBar.offsetHeight}px`;
                } else{
                    ELEMENT.header.style.top = '0px';
                }
            }
            timeout = false;
        }, 200)
    });
})();
