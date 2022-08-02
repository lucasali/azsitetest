(function() {
    let search;
    let indexLang = window.azsitelang === 'pt-br' ? 'ptbr' : window.azsitelang;
    let searchClient = algoliasearch('PYJUZH6VNQ', '7c1795c333053265edd2aeb199745797');

    search = instantsearch({
        indexName: `azion-site-${indexLang}`,
        searchClient,
        searchFunction(helper) {
            // console.log('[*] helper.state.query', helper.state.query);

            let params = new URLSearchParams(window.location.search);
            helper.setQuery(params.get('q')).search();
        }
    });

    search.addWidgets([
        instantsearch.widgets.configure({
            hitsPerPage: 4
        }),

        // FORM INPUT CONTENT
        instantsearch.widgets.searchBox({
            container: '#searchpagebox',
            searchAsYouType: false
        }),

        // SEARCH
        instantsearch.widgets.hits({
            escapeHTML: true,
            showLoadingIndicator: true,
            container: '#hits-page-search-site',
            templates: {
              item:
                `<a href="{{url}}" title="{{title}}">
                    <h6>
                        {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
                        <small>{{#helpers.highlight}}{ "attribute": "url" }{{/helpers.highlight}}</small>
                    </h6>
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
                container: '#hits-page-search-doc',
                templates: {
                  item:
                    `<a href="{{url}}" title="{{title}}">
                        <h6>
                            {{#helpers.highlight}}{"attribute": "title"}{{/helpers.highlight}}
                            <small>{{#helpers.highlight}}{"attribute": "url"}{{/helpers.highlight}}</small>
                        </h6>
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
                container: '#hits-page-search-blog',
                templates: {
                  item:
                    `<a href="{{url}}" title="{{title}}">
                        <h6>
                            {{#helpers.highlight}}{"attribute": "title"}{{/helpers.highlight}}
                            <small>{{#helpers.highlight}}{"attribute": "url"}{{/helpers.highlight}}</small>
                        </h6>
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
                container: '#hits-page-search-success-stories',
                templates: {
                  item:
                    `<a href="{{url}}" title="{{title}}">
                        <h6>
                            {{#helpers.highlight}}{"attribute": "title"}{{/helpers.highlight}}
                            <small>{{#helpers.highlight}}{"attribute": "url"}{{/helpers.highlight}}</small>
                        </h6>
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
