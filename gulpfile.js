var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('browserify', function() {
    return browserify({
            entries:['./index.js'],
            transform: [reactify],
            extensions: ['.jsx']
        })
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('stylestats.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['browserify'], function() {
    gulp.watch(['index.js', 'lib/**/*.js', 'lib/**/*.jsx'], ['browserify']);
});

gulp.task('default', ['browserify']);
