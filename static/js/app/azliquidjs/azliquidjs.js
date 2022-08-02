(function() {
    'use strict';


    /////////////////////////
    // LIQUID AZION HELPER //
    ////////////////////////


    if(window.azliquidjs) {
        console.warn('[!] azliquidjs it is altready loadeded!');
        return;
    }


    window.azliquidjs = {};


    window.azliquidjs.render = function(domElement, filePath, data) {
        return new Promise(function(resolve, reject) {
            try {
                var Liquid = window.liquidjs.Liquid;
                var engine = new Liquid({extname: '.html', cache: false});

                if(!domElement) {
                    console.warn('[!] Not found DOM Element. ', domElement);
                    return;
                }

                engine.parseAndRender(
                    "{% include '/static/templates/" + filePath + ".html' %}",
                    data || {}
                ).then(function(html) {
                    domElement.innerHTML = html;
                    resolve(domElement);
                });
            } catch(error) {
                console.error(error);
                reject(error);
            }
        });
    };

    window.azliquidjs.renderAppend = function(domElement, filePath, data) {
        return new Promise(function(resolve, reject) {
            try {
                var Liquid = window.liquidjs.Liquid;
                var engine = new Liquid({extname: '.html', cache: false});

                if(!domElement) {
                    console.warn('[!] Not found DOM Element. ', domElement);
                    return;
                }

                engine.parseAndRender(
                    "{% include '/static/templates/" + filePath + ".html' %}",
                    data || {}
                ).then(function(html) {
                    var newelement = document.createElement('div');
                    newelement.innerHTML = html;

                    domElement.appendChild(newelement);
                    resolve(domElement);
                });
            } catch(error) {
                console.error(error);
                reject(error);
            }
        });
    };
})();
