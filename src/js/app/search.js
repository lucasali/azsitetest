(function() {
    // INTERACTION SEARCH
    'use strict';
    var ELEMENT = {};
    ELEMENT.id = '#SearchBTN';
    ELEMENT.idClose = '#CloseSearchBTN';
    ELEMENT.idContent = '#azalgoliasearch';
    ELEMENT.classActive = 'enabled-search';
    ELEMENT.btn = document.querySelector(ELEMENT.id);
    ELEMENT.content = document.querySelector(ELEMENT.idContent);
    ELEMENT.close = document.querySelector(ELEMENT.idClose);
    ELEMENT.input = function() {
        return document.querySelector('input[type="search"]');
    };
    if(!ELEMENT.btn) {
        console.warn(`Element using id ${ELEMENT.id} not found.`);
        return;
    }
    if(!ELEMENT.content) {
        console.warn(`Element using id ${ELEMENT.idContent} not found.`);
        return;
    }
    if(!ELEMENT.close) {
        console.warn(`Element using id ${ELEMENT.idClose} not found.`);
        return;
    }
    function disable() {
        if(!isActive()) return;
        ELEMENT.content.classList.remove(ELEMENT.classActive);
        clearInput();
    };
    function disableByEsc(e) {
        if(e.key === 'Escape') disable();
    };
    function toogleByKeyBind(e) {
        if (keyDownCode(e) == 83) {
            e.preventDefault();
            isActive() ? disable() : enable();
        }
    };
    function enable() {
        if(isActive()) return;
        ELEMENT.content.classList.add(ELEMENT.classActive);
        focusInput();
    };
    function isActive() {
        return ELEMENT.content.classList.contains(ELEMENT.classActive);
    };
    function fullfiledInput() {
        return ELEMENT.input().value.length;
    };
    function focusInput() {
        ELEMENT.input().focus();
    };
    function clearInput() {
        ELEMENT.input().value = '';
    };

    function keyDownCode(e) {
        return (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode;
    };

    try {
        var docSearchForm = document.querySelector('#docSearchForm');
        if(docSearchForm) {
            // search documentation element from:
            // https://www.azion.com/en/documentation/
            docSearchForm.addEventListener('click', function() {
                enable();
            }, false);
        }
        ELEMENT.btn.addEventListener('click', function() {
            enable();
        }, false);
        ELEMENT.close.addEventListener('click', function(e) {
            if(fullfiledInput()) {
                clearInput();
                focusInput();
            } else {
                disable();
            }
        }, false);
        document.addEventListener('keydown', function(e) {
            disableByEsc(e);
            toogleByKeyBind(e);
        }, false);
    } catch(error) {
        console.log(error);
    }
})();
(function() {
    let indexLang = window.azsitelang === 'pt-br' ? 'ptbr' : window.azsitelang;
    const searchClient = algoliasearch('PYJUZH6VNQ', '7c1795c333053265edd2aeb199745797');
    const search = instantsearch({
        indexName: `azion-site-${indexLang}`,
        searchClient,
        searchFunction(helper) {
            const searchContentParent = document.querySelector('#azalgoliasearch');
            const searchContent = document.querySelectorAll('.search-content')[0];
            const hasQuery = helper.state.query !== '';
            const container = document.querySelector('#hits-instant-search');
            const containerBlog = document.querySelector('#hits-instant-search-blog');
            const containerDoc = document.querySelector('#hits-instant-search-doc');
            const containerCase = document.querySelector('#hits-instant-search-success-stories');
            container.style.display = hasQuery ? 'block' : 'none';
            containerBlog.style.display = hasQuery ? 'block' : 'none';
            containerDoc.style.display = hasQuery ? 'block' : 'none';
            containerCase.style.display = hasQuery ? 'block' : 'none';
            if(hasQuery) {
                searchContentParent.classList.remove('no-query');
                searchContent.classList.remove('no-db-label');
            } else {
                searchContentParent.classList.add('no-query');
                searchContent.classList.add('no-db-label');
            }
            helper.search();
        }
    });
    search.addWidgets([
            instantsearch.widgets.configure({
                hitsPerPage: 4
            }),
            // FORM INPUT CONTENT
            instantsearch.widgets.searchBox({
                container: '#searchbox'
            }),
            // SEARCH
            instantsearch.widgets.hits({
                escapeHTML: true,
                showLoadingIndicator: true,
                container: '#hits-instant-search',
                templates: {
                  item:
                    `<a href="{{url}}" title="{{title}}">
                        <p>
                            <strong>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</strong>
                            <br>
                            <small>{{#helpers.highlight}}{ "attribute": "url" }{{/helpers.highlight}}</small>
                        </p>
                        <p>
                            <small>{{#helpers.highlight}}{ "attribute": "text" }{{/helpers.highlight}}</small>
                        </p>
                    </a>`
                }
            }),
            instantsearch.widgets
            .index({ indexName: `azion-doc-${indexLang}`})
            .addWidgets([
                instantsearch.widgets.configure({
                    hitsPerPage: 6
                }),
                instantsearch.widgets.hits({
                    escapeHTML: true,
                    showLoadingIndicator: true,
                    container: '#hits-instant-search-doc',
                    templates: {
                      item:
                        `<a href="{{url}}" title="{{title}}">
                            <p>
                                <strong>{{#helpers.highlight}}{"attribute": "title"}{{/helpers.highlight}}</strong>
                                <br>
                                <small>{{#helpers.highlight}}{"attribute": "url"}{{/helpers.highlight}}</small>
                            </p>
                            <p>
                                <small>{{#helpers.highlight}}{"attribute": "text"}{{/helpers.highlight}}</small>
                            </p>
                        </a>`
                    }
                })
            ]),
            instantsearch.widgets
            .index({ indexName: `azion-blog-${indexLang}`})
            .addWidgets([
                instantsearch.widgets.configure({
                    hitsPerPage: 4
                }),
                instantsearch.widgets.hits({
                    escapeHTML: true,
                    showLoadingIndicator: true,
                    container: '#hits-instant-search-blog',
                    templates: {
                      item:
                        `<a href="{{url}}" title="{{title}}">
                            <p>
                                <strong>{{#helpers.highlight}}{"attribute": "title"}{{/helpers.highlight}}<strong>
                                <br>
                                <small>{{#helpers.highlight}}{"attribute": "url"}{{/helpers.highlight}}</small>
                            </p>
                            <p>
                                <small>{{#helpers.highlight}}{"attribute": "text"}{{/helpers.highlight}}</small>
                            </p>
                        </a>`
                    }
                })
            ]),
            instantsearch.widgets
            .index({ indexName: `azion-cases-${indexLang}` })
            .addWidgets([
                instantsearch.widgets.configure({
                    hitsPerPage: 2
                }),
                instantsearch.widgets.hits({
                    escapeHTML: true,
                    showLoadingIndicator: true,
                    container: '#hits-instant-search-success-stories',
                    templates: {
                      item:
                        `<a href="{{url}}" title="{{title}}">
                            <p>
                                <strong>{{#helpers.highlight}}{"attribute": "title"}{{/helpers.highlight}}</strong>
                                <br>
                                <small>{{#helpers.highlight}}{"attribute": "url"}{{/helpers.highlight}}</small>
                            </p>
                            <p>
                                <small>{{#helpers.highlight}}{"attribute": "text"}{{/helpers.highlight}}</small>
                            </p>
                        </a>`
                    }
                })
            ])
        ]);
    search.start();
})();
