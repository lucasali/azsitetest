(function() {
    'use strict';
    // analytics.track("signup_mkt")
    if(window.azsegment) {
        console.warn('[*] azsegment already loaded!');
        return;
    }
    var PRIVATE = {};
    PRIVATE.click = function(eventname) {
        if(!eventname) {
            console.warn('[!] eventname param :: ', eventname);
        }
        var dataTriggerEvent = document.querySelectorAll('[data-trigger-event="' + eventname + '"]');
        dataTriggerEvent.forEach(function(item) {
            item.addEventListener('click', function(e){
                var segment = window.analytics || undefined;
                if(!segment) {
                    console.warn('[!] window.analytics :: ', segment);
                    return;
                }
                segment.track(eventname);
            })
        });
        return dataTriggerEvent;
    };
    window.azsegment = {
        event: {
            click: PRIVATE.click
        }
    };
})();
