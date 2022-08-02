'use strict';
const cwd = process.cwd();
const gulp = require('gulp');
const gcopy = require('gulp-copy');
const sass = require('gulp-sass')(require('sass'));
const cache = require('gulp-cached');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
////////////////////////////
/* FUNCTION TASKS RUNNERSq0 */
////////////////////////////
function sassCompilePages() {
    return gulp.src('./src/scss/pages/**/*.scss')
    .pipe(cache('sass'))
    .pipe(sourcemaps.init())
    .pipe(
        sass(
            {
                includePaths: [
                    './src/trd3/bower_components/foundation-sites/scss',
                    // './src/trd3/bower_components/motion-ui/src'
                ],
                outputStyle: 'compressed'
            }
        ).on('error', sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('_site/static/css/pages'))
    .pipe(browserSync.stream());
};
function copyCSSFromSite() {
    return gulp
        .src([`${cwd}/_site/static/css/**/*`])
        .pipe(gcopy(`${cwd}/`, {
            prefix: 1
        }))

};
function fontface() {
    return gulp
        .src([`${cwd}/src/font/**/*`])
        .pipe(gcopy(`${cwd}/static/`, {
            prefix: 1
        }))
};
function imagesHackAzionLogo() {
    return gulp
        .src([`${cwd}/src/images/logo/**/*`])
        .pipe(gcopy(`${cwd}/`, {
            prefix: 1
        }))
};
function templates() {
    return gulp
        .src([`${cwd}/src/templates/**/*`])
        .pipe(
            gcopy(`${cwd}/static`, {prefix: 1})
        )
        .pipe(browserSync.stream());
};
function trd3() {
    return gulp.src([`${cwd}/src/trd3/**/*`]).pipe(
        gcopy(`${cwd}/static/`, {prefix: 1})
    )
};
function files() {
    return gulp.src([`${cwd}/src/files/**/*`]).pipe(
        gcopy(`${cwd}/static/`, {prefix: 1})
    )
};
function minifyJavascript(enviroment) {
    return gulp.src(`${cwd}/src/js/**/*.js`)
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: false
        }))
        .pipe(gulp.dest(enviroment === 'dev' ? '_site/static/js' : 'static/js'));
};
/////////////////////////////
/* REGISTERING TASK RUNNER */
/////////////////////////////
module.exports.default = gulp.series(
    gulp.parallel(sassCompilePages, templates),
    gulp.parallel(copyCSSFromSite, minifyJavascript),
    gulp.parallel(fontface, imagesHackAzionLogo),
    gulp.parallel(trd3, files)
);
gulp.task('browsersync-reload', function(done) {
    browserSync.reload();
    done();
});
gulp.task('sass-dev', function(done) {
    sassCompilePages();
    done();
});
gulp.task('minjs-dev', function(done) {
    minifyJavascript('dev');
    done();
});
gulp.task('watch', function() {
    browserSync.init({
        proxy: 'http://localhost:4000'
    });
    gulp.watch(
        [
            `${cwd}/src/scss/pages/**/*.scss`
        ],
        gulp.series('sass-dev', 'browsersync-reload')
    );
    gulp.watch(
        [
            `${cwd}/src/js/**/*.js`,
            `${cwd}/src/templates/**/*.html`
        ],
        gulp.series('minjs-dev', 'browsersync-reload')
    );
});
