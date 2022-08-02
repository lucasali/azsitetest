(function () {
    var lang = window.azsitelang;
    if (!lang) {
        console.error('window.azsitelang not configured.', lang);
        return;
    }
    var wordListData = {
        'en': ['deliver', 'observe', 'build', 'secure'],
        'pt-br': ['criar', 'proteger', 'entregar', 'observar'],
        'es': ['construir', 'proteger', 'suministrar', 'observar']
    };
    var typed = new Typed('#typing', {
        strings: wordListData[lang],
        typeSpeed: 150,
        cursorChar: '_',
        loop: true,
    });
})();
