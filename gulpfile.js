var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var IS_WATCH = false;

var reactifyES6 = function(file) {
    return reactify(file, {es6: true});
};

var browserifyArgs = {
    cache: {},
    packageCache: {},
    fullPaths: true,
    entries:['./index.js'],
    transform: [reactifyES6],
    extensions: ['.jsx']
};

gulp.task('browserify', function() {
    browserify(browserifyArgs)
        .bundle()
        .pipe(source('stylestats.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch-browserify', function() {
    var bundler = watchify(browserify(browserifyArgs));

    function rebundle() {
        bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('stylestats.js'))
            .pipe(gulp.dest('./build/'));
    }

    bundler.on("update", rebundle);
    bundler.on("log", console.log);

    return rebundle();
});

gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    IS_WATCH = true;
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.start('watch-browserify');
});

gulp.task('default', ['browserify', 'sass']);
