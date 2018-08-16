const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const config = require('./webpack.config')

gulp.task('build-css', () => {
  return gulp.src('dist/*.css')
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions', 'ie 11']})]))
    .pipe(cleanCSS())
    .pipe(postcss([require('css-mqpacker')()]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
})

gulp.task('build-js', () => {
  return buildJS()
})

gulp.task('move-css', () => {
  return gulp.src('src/css/**.css')
    .pipe(gulp.dest('dist'))
})

gulp.task('css', gulp.series('move-css', 'build-css'))
gulp.task('build', gulp.series('build-js', 'css'))


function buildJS() {
  return new Promise(resolve => {
    return webpack(config, (err, stats) => {
      if (err) {
        console.log('Webpack', err)
      }
      resolve()
    })
  })
}