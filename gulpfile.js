const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

gulp.task('build-css', () => {
  return gulp.src('dist/*.css')
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions', 'ie 11']})]))
    .pipe(cleanCSS())
    .pipe(postcss([require('css-mqpacker')()]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
})

gulp.task('move-css', () => {
  return gulp.src('src/css/**.css')
    .pipe(gulp.dest('dist'))
})

gulp.task('css', gulp.series('move-css', 'build-css'))
