const gulp = require('gulp'),
  conf = require('./conf.js'),
  eslint = require('gulp-eslint'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify-es').default;

gulp.task('build-js', function() {
  return gulp.src(conf.path.src + '/index.js')
    .pipe(eslint({
      configFile: './.eslintrc.js'
    }))
    .pipe(eslint.format())  // 打印lint错误
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(conf.path.dist))
});
