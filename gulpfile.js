var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    return browserify('./index.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('stylestats.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['browserify']);
