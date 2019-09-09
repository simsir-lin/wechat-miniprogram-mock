const gulp = require('gulp');
require('./build/build.js');

gulp.task('build', gulp.series('build-js'));
