'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({browsers: ["last 20 versions"]});

var path = {
    dest: {
        css:        'css/',
        js:         'js/'
    },
    src: {
        less:       'less/style.less',
        js:         'js/script.js'
    },
    watch: {
        less:       'less/style.less',
        js:         'js/*.js'
    }
};

gulp.task('js', function() {
    return gulp.src(path.src.js)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest.js))
});

gulp.task('less', function () {
    return gulp.src(path.src.less)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(uglifycss({
            "maxLineLen": 500,
            "uglyComments": true
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(path.dest.css))
});

gulp.task('watch', function() {
    gulp.watch(path.watch.less);
    gulp.watch(path.watch.js);
    gulp.watch(path.watch.svg);
});

gulp.task('default', ['watch']);