(function() {
    'use strict';
    var isOnTime = false;
    var ELEMENTS = {
        content: document.querySelector('#content'),
        footer: document.querySelector('#azfooter')
    };
    function checkElements(elementsObj) {
        var isValid = true;
        if(!elementsObj) return;
        var elList = Object.keys(elementsObj);
        for(var i = 0; i > elList.length; i++) {
            var el = ELEMENTS[elList[i]];
            if(!el) {
                isValid = false;
            }
        }
        return isValid;
    };
    function footerHeight() {
        return ELEMENTS.footer.clientHeight;
    };
    function setContentPaddingBottom() {
        ELEMENTS.content.style.paddingBottom = String(footerHeight()) + 'px';
    };
    if(!checkElements(ELEMENTS)) {
        console.error('Not possible to calculate the padding of the contet by footer size.');
        return;
    }
    setContentPaddingBottom();
    window.addEventListener('resize',function() {
        if(!isOnTime) {
            isOnTime = true;
            setTimeout(function() {
                setContentPaddingBottom();
                isOnTime = false;
            }, 2000);
        }
    });
})();
