(function() {
    'use strict';


    var ourValuesContent = document.getElementById('stickyContent');
    window.azliquidjs.render(
        ourValuesContent,
        'careers/sticky-slide',
        (window.liquidjstpl && window.liquidjstpl.careers) || {}
    ).then(function() {
        var azstickyslide = new window.azstickyslide({
            content: '#stickyContent',
            counter: {
                current: '.current-number',
                total: '.total-number',
            },
            navigation: {
                prevEl: '.btn-prev',
                nextEl: '.btn-next'
            },
            progressbar: '.bar'
        });

        azstickyslide.reloadElementListOffsetTop();

        window.addEventListener('small', function() {
            azstickyslide.reloadElementListOffsetTop();
        });

        window.addEventListener('medium', function() {
            azstickyslide.reloadElementListOffsetTop();
        });

        window.addEventListener('large', function() {
            azstickyslide.reloadElementListOffsetTop();
        });

        window.addEventListener('xlarge', function() {
            azstickyslide.reloadElementListOffsetTop();
        });

        window.addEventListener('xxlarge', function() {
            azstickyslide.reloadElementListOffsetTop();
        });

        window.addEventListener('xxxlarge', function() {
            azstickyslide.reloadElementListOffsetTop();
        });
    });



    // CANDIDATE JOURNEY
    var swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 40,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    var swiper = new Swiper('.swiper-container-careers', {
        slidesPerView: 4,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next-careers',
            prevEl: '.swiper-button-prev-careers',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 34
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 34
            },
            1280: {
                slidesPerView: 4,
                 spaceBetween: 34
            }
        }
    });
})();
