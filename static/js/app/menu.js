(function() {
    'use strict';
    var ELEMENT = {};
    ELEMENT.id = '#BurgerBTN';
    ELEMENT.classActive = 'mobile-menu-opened';
    ELEMENT.content = document.body;
    ELEMENT.btn = document.querySelector(ELEMENT.id);
    if(!ELEMENT.btn) {
        console.warn(`Element using id ${ELEMENT.id} not found.`);
        return;
    }
    function disable() {
        if(!isActive()) return;
        document.body.style.overflow = 'auto';
        ELEMENT.content.classList.remove(ELEMENT.classActive);
        ELEMENT.btn.classList.remove(ELEMENT.classActive);
    };
    function disableByEsc(e) {
        if(e.key === 'Escape') disable();
    };
    function openMenuKeyBind(e) {
        if (keyDownCode(e) == 79) {
            // https://odesenvolvedor.com.br/tabela-de-key-codes-para-javascript_1464.html
            // 79 - keycode of letter "o"
            e.preventDefault();
            enable();
        }
    };
    function enable() {
        if(isActive()) return;
        document.body.style.overflow = 'hidden';
        ELEMENT.content.classList.add(ELEMENT.classActive);
        ELEMENT.btn.classList.add(ELEMENT.classActive);
        focusContent();
    };
    function isActive() {
        return ELEMENT.content.classList.contains(ELEMENT.classActive);
    };
    function focusContent() {
        ELEMENT.content.focus();
    };
    function keyDownCode(e) {
        return (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode;
    };
    try {
        ELEMENT.btn.addEventListener('click', function() {
            !isActive() ? enable() : disable();
        }, false);

        document.addEventListener('keydown', function(e) {
            if(document.body.clientWidth >= 1280) return;
            disableByEsc(e);
            openMenuKeyBind(e);
        }, false);
    } catch(error) {
        console.log(error);
    }

    //dropdown for menu
    try {
        new DropdownToggle({
            dropdownLinks: '.menu-link',
            dropdownAreas: '.dropdown-area',
        });
    } catch(err) {
        console.error(err);
    }
})();
