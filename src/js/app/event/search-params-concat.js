(function() {
    'use strict';

    var url = new URL(window.location);
    var urlSearch = url.search;
    var linkList = document.querySelectorAll('a[href*="manager.azion.com"]');

    linkList.forEach(link => {
        var newHref = `${link.href}${urlSearch}`;
        link.href = newHref;
    });
})();
