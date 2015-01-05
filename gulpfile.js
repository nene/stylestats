var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var gutil = require('gulp-util');

var IS_WATCH = false;

var reactifyES6 = function(file) {
    return reactify(file, {es6: true});
};

gulp.task('browserify', function() {
    var bundler = watchify(browserify({
        entries:['./index.js'],
        transform: [reactifyES6],
        extensions: ['.jsx']
    }));

    if (IS_WATCH) {
        bundler.on("update", rebundle);
    }

    function rebundle() {
        console.log("Rebundling...");
        bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('stylestats.js'))
            .pipe(gulp.dest('./build/'));
    }

    return rebundle();
});

gulp.task('watch', function() {
    IS_WATCH = true;
    gulp.start('browserify');
});

gulp.task('default', ['browserify']);
