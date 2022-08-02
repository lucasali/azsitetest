(function() {
    'use strict';

    if(!window.azliquidjs) {
        console.error('[!] window.azliquidjs not loaded. It is a dependencie');
        return;
    }

    var DOM = {};
    var jobslenbytype = {
        'all': `htwww.azion.com/api/careers/get/jobslen`,
        'Revenue': `https://www.azion.com/api/careers/get/jobslen/department/Revenue`,
        'Operations': `https://www.azion.com/api/careers/get/jobslen/department/Operations`,
        'Engineering': `https://www.azion.com/api/careers/get/jobslen/department/Engineering`,
        'Security': `https://www.azion.com/api/careers/get/jobslen/department/Security`,
        'Products': `https://www.azion.com/api/careers/get/jobslen/department/Products`
    };

    // content list
    DOM.jobCategoryContent = document.querySelector('#contentList');
    if(!DOM.jobCategoryContent) {
        console.warn('[!] Invalid DOM element - document.querySelector("#contentList") :: ', DOM.jobCategoryContent);
        return;
    }

    // form using select to search
    DOM.filterJobsForm = document.querySelector('#careersSearch');
    if(!DOM.filterJobsForm) {
        console.warn('[!] Invalid DOM element - document.querySelector("#careersSearch") :: ', DOM.filterJobsForm);
        return;
    }

    // sidebar
    DOM.listCategory = document.querySelector('#listCategory');
    if(!DOM.listCategory) {
        console.warn('[!] Invalid DOM element - document.querySelector("#listCategory") :: ', DOM.listCategory);
        return;
    }

    DOM.selectArea = DOM.filterJobsForm.querySelector('select[name="area"]');
    DOM.locations = DOM.filterJobsForm.querySelector('select[name="location"]');

    //////////////////////
    // FUNCTION HELPERS //
    //////////////////////

    function getActiveHref() {
        // return the string containing the #[URL]
        // used like department to search jobs

        var tag;
        var href = '';
        var activeElementList = getActiveListSidebar();

        if(activeElementList.length) {
            tag = activeElementList[0].querySelectorAll('a')[0];
            href = tag.getAttribute('href').replace('#', '');
        }

        return href;
    };

    function getActiveListSidebar() {
        // return the active item list,
        // the class is configured in the LI tag element
        return DOM.listCategory.querySelectorAll('.active');
    };

    function activeElement(element) {
        // active the element of department
        // the element param should be a tag a
        // the class active is used on parentElement: LI
        element.parentElement.classList.add('active');
    };

    function cleanActiveListSidebar() {
        // clean the active class in the LI item
        var activeItem = getActiveListSidebar();

        if(activeItem.length) {
            activeItem[0].classList.remove('active');
        }
    };

    function filterSearchParams() {
        var searchParams = {};
        var urlSearchParams = new URLSearchParams(window.location.search);

        searchParams.area = urlSearchParams.get('area') || null;
        searchParams.location = urlSearchParams.get('location') || null;

        return searchParams;
    };

    function setSidebarFilterBySearchParams() {
        var itemCategory;
        var searchParams = filterSearchParams();

        if(searchParams.area) {
            itemCategory = DOM.listCategory.querySelectorAll(`a[href="#${searchParams.area}"]`);
        } else {
            itemCategory = DOM.listCategory.querySelectorAll('a[href="#all"]');
        }

        cleanActiveListSidebar();

        if(itemCategory && itemCategory.length) {
            activeElement(itemCategory[0]);
        }
    };

    function setFilterBySearchParams() {
        var searchParams = filterSearchParams();

        if(searchParams.area) {
            var selected = DOM.selectArea.querySelector('option[selected=""]');
            var optValued = DOM.selectArea.querySelector('option[value="' + searchParams.area + '"]');

            if(selected) selected.removeAttribute('selected')
            if(optValued) optValued.setAttribute('selected', '');
        }

        if(searchParams.location) {
            var lSelected = DOM.locations.querySelector('option[selected=""]');
            var lOptValued = DOM.locations.querySelector('option[value="' + searchParams.location + '"]');

            if(lSelected) lSelected.removeAttribute('selected');
            if(lOptValued) lOptValued.setAttribute('selected', '');
        }
    };

    function setAreaFilterBySidebarCllick(element) {
        var selected = DOM.selectArea.querySelector('option[selected=""]');
        var optValued = DOM.selectArea.querySelector('option[value="' + getActiveHref() + '"]');

        if(selected) selected.removeAttribute('selected');
        if(optValued) optValued.setAttribute('selected', '');
    };

    function whichFilterValue() {
        // return a javascript object containing the
        // value selected from select fileters
        return {
            area: DOM.selectArea.value !== 'all' ? DOM.selectArea.value : '',
            location: DOM.locations.value !== 'all' ? DOM.locations.value : ''
        }
    };


    ////////////////
    // NAVIGATION //
    ///////////////


    function pushstate(dataobj) {
        if(!dataobj) {
            dataobj = {}
        }

        var url = new URL(window.location);
        var dataObjAttrList = Object.keys(dataobj);

        dataObjAttrList.forEach(function(attr) {
            url.searchParams.set(attr, dataobj[attr]);
        });

        window.history.pushState({}, '', url);
    };


    /////////////////////////
    // RENDERING FUNCTIONS //
    /////////////////////////


    function clearContent() {
        DOM.jobCategoryContent.innerHTML = '';
    }

    function renderSidebarCounter(datacategory) {
        if(!datacategory) {
            datacategory = jobslenbytype;
        }

        var keys = Object.keys(datacategory);
        keys.forEach(function(key) {
            var url = datacategory[key];

            fetch(url).then(function(response) {
                response.json().then(function(json) {
                    var itemCategory = DOM.listCategory.querySelectorAll(`a[href="#${key}"]`)[0];
                    var span = itemCategory.querySelectorAll('span')[0];

                    span.innerHTML = `(${json.length})`;
                });
            }).catch(function(error) {
                console.error(error);
            });
        });
    };


    function render(tplName, department, querie) {
        var q = 'department/'+department;

        if(querie) {
            q += ('/'+querie);
        }

        //'department/'+department
        return window.azcareers.pull.jobs(q).then(function(jobs) {
            clearContent();

            return window.azliquidjs.render(
                DOM.jobCategoryContent,
                tplName,
                {
                    lang: window.azsitelang,
                    categorie: department,
                    jobList: jobs
                }
            ).catch(function(error) {
                console.error('[!] careers/filter-jobs error rendered: ', error);
            });
        }).catch(function(error) {
            console.error('[!] window.azcareers.pull.jobs exec/request error: ', error);

            return window.azliquidjs.renderAppend(
                DOM.jobCategoryContent,
                tplName,
                {
                    lang: window.azsitelang,
                    categorie: department,
                    error: window.azsitelang != 'pt-br' ? 'Sorry, something wrong. Please try again.' : 'Desculpe, algo errado. Por favor, tente novamente.'
                }
            ).catch(function(error) {
                console.error('[!] careers/filter-jobs error rendered: ', error);
            });
        });
    }


    function renderAppend(tplName, department, querie) {
        var q = 'department/'+department;

        if(querie) {
            q += ('/'+querie);
        }

        //'department/'+department
        return window.azcareers.pull.jobs(q).then(function(jobs) {
            return window.azliquidjs.renderAppend(
                DOM.jobCategoryContent,
                tplName,
                {
                    lang: window.azsitelang,
                    categorie: department,
                    jobList: jobs
                }
            ).catch(function(error) {
                console.error('[!] careers/filter-jobs error rendered: ', error);
            });
        }).catch(function(error) {
            console.error('[!] window.azcareers.pull.jobs exec/request error: ', error);

            return window.azliquidjs.renderAppend(
                DOM.jobCategoryContent,
                tplName,
                {
                    lang: window.azsitelang,
                    categorie: department,
                    error: window.azsitelang != 'pt-br' ? 'Sorry, something wrong. Please try again.' : 'Desculpe, algo errado. Por favor, tente novamente.'
                }
            ).catch(function(error) {
                console.error('[!] careers/filter-jobs error rendered: ', error);
            });
        });
    }


    function renderMultipleAppend(list) {
        var promiseList = [];
        if(!list) list = [];

        for(var i = 0; i < list.length; i++) {
            var item = list[i];
            var q = 'department/' + item.department;

            if(item.querie) q += ('/'+ item.querie);

            promiseList.push( window.azcareers.pull.jobs(q) );
        }

        Promise.all(promiseList).then(function(res) {
            var listToRender = [];

            for(var j = 0; j < res.length; j++) {
                if(!res[j].length) continue;

                listToRender.push({
                    department: list[j].department,
                    tplname: list[j].tpl,
                    jobList: res[j]
                });
            }

            clearContent();

            if(!listToRender.length) {
                window.azliquidjs.renderAppend(
                    DOM.jobCategoryContent,
                    'careers/no-criteria-filter-all',
                    {
                        message: window.azsitelang != 'pt-br' ? "We currently don't have jobs matching your criteria :(" : "No momento, não temos vagas que correspondentes aos critérios de busca:("
                    }
                ).catch(function(error) {
                    console.error('[!] careers/filter-jobs error rendered: ', error);
                });

                return;
            }

            for(var k = 0; k < listToRender.length; k++) {
                window.azliquidjs.renderAppend(
                    DOM.jobCategoryContent,
                    listToRender[k].tplname,
                    {
                        lang: window.azsitelang,
                        categorie: listToRender[k].department,
                        jobList: listToRender[k].jobList
                    }
                ).catch(function(error) {
                    console.error('[!] careers/filter-jobs error rendered: ', error);
                });
            }
        }).catch(function(error) {
            console.error('[!] ERRR: Promise.all request serealize: ', error);
        });
    }


    function getQuerieSearchParams() {
        var qs = '';
        var whichFilterVal = whichFilterValue();
        var lctSplVal = whichFilterVal.location.split('-');

        if(lctSplVal.length === 3) {
            qs += 'city/'+ lctSplVal[0] + '/state/' + lctSplVal[1];
        } else if (lctSplVal.length >= 2) {
            var finalQS = '';

            if(lctSplVal[0] === 'Remote') {
                if(lctSplVal[1] === 'Brazil') {
                    finalQS = '/state/RS';
                } else if(lctSplVal[1] === 'USA') {
                    finalQS = '/state/CA';
                }
            }

            qs += 'city/'+ lctSplVal[0] + finalQS;
        }

        return qs;
    };


    function execRender() {
        var querie = getQuerieSearchParams();
        var whichFilterVal = whichFilterValue();

        if(whichFilterVal.area.length) {
            render('careers/jobs', whichFilterVal.area, querie);
            renderSidebarCounter()
        } else {
            renderMultipleAppend ([
                {lang: window.azsitelang, tpl: 'careers/jobs-by-category', department: 'Engineering', querie: querie},
                {lang: window.azsitelang, tpl: 'careers/jobs-by-category', department: 'Operations',  querie: querie},
                {lang: window.azsitelang, tpl: 'careers/jobs-by-category', department: 'Products',    querie: querie},
                {lang: window.azsitelang, tpl: 'careers/jobs-by-category', department: 'Revenue',     querie: querie},
                {lang: window.azsitelang, tpl: 'careers/jobs-by-category', department: 'Security',    querie: querie}
            ]);
            renderSidebarCounter();
        }
    }


    //////////////////////
    // EVENTS LISTENNER //
    //////////////////////


    DOM.selectArea.addEventListener('change', function(e) {
        pushstate({area: whichFilterValue().area.length ? whichFilterValue().area : 'all'});
        execRender();
        setSidebarFilterBySearchParams();
    });

    DOM.locations.addEventListener('change', function(e) {
        pushstate({location: whichFilterValue().location.length ? whichFilterValue().location : 'all'});
        execRender();
    });

    DOM.listCategory.addEventListener('click', function(e) {
        e.preventDefault();

        var targetHref;
        var target = e.target;

        while(true) {
            if(target.tagName === 'UL') break;

            if(!target.href) {
                target = target.parentElement;
                continue;
            } else {
                break;
            }
        }

        cleanActiveListSidebar();
        activeElement(target);
        setAreaFilterBySidebarCllick(target);
        pushstate({area: whichFilterValue().area.length ? whichFilterValue().area : 'all'});
        execRender();
    });


    ////////////////
    //   INIT    //
    ///////////////


    setFilterBySearchParams();
    setSidebarFilterBySearchParams();
    execRender();
})();
