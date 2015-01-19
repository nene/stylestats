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

gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    IS_WATCH = true;
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.start('browserify');
});

gulp.task('default', ['browserify']);
