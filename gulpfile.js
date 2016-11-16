const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src([
      './scss/normalize.scss',
      './scss/style.scss'
    ])
    .pipe(concat('style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(autoprefixer({
       browsers: ['last 2 versions']
    }))
    .pipe(notify('Sass compiled.'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
