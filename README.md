# AZSITETEST

<p align="center">
    <img src ="https://assets.azion.com/static/images/v3/open-graph/og-about-us.png" />
</p>


## REQUIREMENTS

- [Ruby 2.7.1](https://www.ruby-lang.org/en/news/2020/03/31/ruby-2-7-1-released/)
	- It is recommended [RVM](https://github.com/rvm/rvm) to manage Ruby version.
- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
	- It is recommended [NVM](https://github.com/nvm-sh/nvm) to manage Nodejs version.
- [Jekyll](https://jekyllrb.com/)



## EASY TO RUN/BUILD

```bash
npm install && bundle install # to install
npm run rebuild
```

> NOTE :: use `npm run rebuild` to no force rebuild and up the website



## DEVELOPMENT

We have some commands to be simple and fast to start work.

|                  COMMAND                 |                                      DESCRIPTION                                       |
|------------------------------------------|----------------------------------------------------------------------------------------|
| npm run rebuild                          | Clean _site folder, Build FE resource and build website delivering on http://localhost:4000                                           |
| npm run build                            | Build Front-End Resources and rebuild Jekyll completely                                |
| npm run dev                              | Build Front-End Resources and inject their into _site folder (compiled website folder) |
| npm run watch                            | Build Front-End Resources and inject into _site folder, watching updates files         |


> NOTE :: use `npm run watch` just watch the src/scss/pages files


``` json
"scripts": {
    "build": "gulp",
    "dev": "gulp dev",
    "sass-dev": "gulp sass-dev",
    "minjs-dev": "gulp minjs-dev",
    "rebuild": "npm run clean; npm run build; npm run jekyll-server",
    "watch": "gulp watch",
    "clean-site": "rm -rf _site",
    "clean-static": "rm -rf static/css static/font static/js static/templates stastic/trd3",
    "clean": "npm run clean-site && npm run clean-static",
    "jekyll-server": "npm run clean-site; bundle exec jekyll serve --watch --trace",
    "jekyll-server-future": "npm run clean-site; bundle exec jekyll serve --watch --trace --future",
    "jekyll-build": "npm run clean-site; bundle exec jekyll build --watch --trace",
}
```


## INTERESTING LINKS

- https://jekyllrb.com/
- https://shopify.github.io/liquid/
- https://rvm.io/
- https://github.com/nvm-sh/nvm
