# INSTRUCTIONS

<p align="center">
    <img src ="https://media.istockphoto.com/vectors/books-swap-exchange-or-crossing-vector-illustration-with-hand-gives-vector-id1328717786?b=1&k=20&m=1328717786&s=612x612&w=0&h=dX-gTpYmeTHV-jYLuKkn_oAtBtYh9JOdc_GKVMZYW68=" />
</p>

Here you can find the Azion interview technical test! If you have any question please send a e-mail for your recruiter!


## TEST GOAL

The object of test is:

- Auto Learning process
- Logic thinking
- HTML, CSS em JavaScript habilities
- Hability to work on existing production project

You will server the following URL:
- main page: `http://localhost:4000/[lang]/careers/jobs/`
- filters page:
    - `http://localhost:4000/[lang]/careers/jobs/?area=Engineering`
    - `http://localhost:4000/[lang]/careers/jobs/?area=Products`
    - `http://localhost:4000/[lang]/careers/jobs/?area=Operations`
    - `http://localhost:4000/[lang]/careers/jobs/?area=Revenue`
    - `http://localhost:4000/[lang]/careers/jobs/?area=Security`

You will need just to code 1 page and reuse after you use the filter search!


## CHALLENGE

The challenge is code only 1 page, it is the careers jobs page, https://www.azion.com/en/careers/jobs .
This page contains:

- Filter
- Categories
- List of jobs

> **NOTE:** The view should be responsive


## FILES TO WORK

You will have specifics empty files to write code to avoid unnecessary complex!
The files are:

- src/scss/pages/careers-job.scss
    - in this file you will write the page stylesheet
- src/js/ui/careers/jobs.js
    - in this file you will write all the behavior necessary to interactive page

> **TIP**: The HTML files you will write are into _i18n folders, you will need to understand how Jekyll works.


## HOW TO CONSTRUCT THE HTML PAGE

The home page and the careers home page are enable and working, you will use then to understand how the site are working!

The API communication to build a page you will not write, you can read the file `src/js/mod/data/api.js`, in this file we have the API communicatin with the backend to GET the necessary data! To engine templates we are using liquid, you will use to render the page! We have written into `src/js/app/azliquidjs/azliquidjs.js`

The API methods are:

- window.azcareers.pull.categories
    - to GET the sidebar categories
- window.azcareers.pull.jobs
    - call the specific jobs by categorie

To build a responsive page we are using the scss functions `@include media-breakpoint-up() or  @include media-breakpoint-down()`, the ranges are:

```
$grid-breakpoints: (
    sm: 0, // 4 collumns
    md: 640px, // 10 collumns
    sd: 960px, // 10 collumns
    lg: 1280px, // 20 collumns
    xlg: 1440px, // 20 collumns
    slg: 1600px, // 20 collumns
    max: 1920px, // 20 collumns
) !default;
```

> Into https://www.azion.com/en?azg=1 you can use to understand how the grid it is working

Use use:
- 4 collumns to mobile viewport
- 10 collumns to middle/tablet viewport
- 20 collumns to desktop

## HELPERS

You can use this URL: https://52082s.ha.azioncdn.net/en/careers/jobs
to use to reverse engineering to look the API requests commented above!

> TIP: In this enviroment the JS are not minified!



Below we have an example of the usage of methods you will use! This example it is a part of production code, I suggest just use to study to start your own code!

``` javascript
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
```

## AVAILABLE PAGES

Localhost you will be able to study the available pages, they are!

- http://localhost:4000/en
    - The home of website
- http://localhost:4000/en/careers
    - The careers portal home

Use this page to understand:
- Jekyll Front-Matters
- Jekyll includes files
- Jekyll page generation
- CSS and JS files includes
