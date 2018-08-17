const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')
const sassError = require('gulp-sass-error')
const mqpacker = require('css-mqpacker')

const config = {
  dist: 'dist/',
  src: 'src/',
  cssin: 'src/css/**/*.css',
  jsin: 'src/js/**/*.js',
  imgin: 'src/img/**/*.{jpg,jpeg,png,gif}',
  htmlin: 'index.html',
  scssin: 'src/scss/style.scss',
  out: 'dist/',
  htmlout: '/',
  cssoutname: 'style.css',
  jsoutname: 'app.js',
}

let sasscfg = {
  precision: 6,
  unixNewlines: true,
  cacheLocation: '.cache',
  outputStyle: 'expanded',
}

gulp.task('build-sass', () => {
  return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass(sasscfg)).on('error', sassError.gulpSassError(true))
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions', 'ie 11']})]))
    .pipe(gulp.dest(config.out))
    .pipe(postcss([mqpacker]))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.out))
})

gulp.task('build-js', () => {
  return buildJS()
})

gulp.task('watch-sass', () => {
  return gulp.watch('./src/scss/*.scss', gulp.series('build-sass'))
})

gulp.task('watch-js', () => {
  return gulp.watch('./src/js/*.js', gulp.series('build-js'))
})

gulp.task('watch', () => {
  return gulp.watch(['./src/scss/*.scss', './src/js/*.js'], gulp.series(['build']))
})

gulp.task('minify-html', () => {
  return gulp.src(config.htmlin)
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true, sortClassName: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./'))
})

gulp.task('build', gulp.series('build-js', 'build-sass', 'minify-html'))

function buildJS () {
  return new Promise((resolve, reject) => {
    return webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.log('Webpack', err)
        reject()
      }
      resolve()
    })
  })
}