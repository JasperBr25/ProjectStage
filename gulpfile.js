'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minify = require('gulp-minify');
var csscomb =require('gulp-csscomb');
var del = require('del');
var sequence = require('run-sequence');
var plumber = require('gulp-plumber');

var globalConfig = {
  scripts_src_dir: 'src/js',
  scripts_dest_dir: 'build/js',
  img_src_dir: 'src/img',
  img_dest_dir: 'build/img',
  sass_src_dir: 'src/sass',
  css_dest_dir: 'build/css',
  build_dir: 'build',
  fonts_src_dir: 'src/fonts',
  fonts_dir: 'build/fonts'
};

/*
 *
 * Styles build task.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Compresssed output style
 *  CSScomb validation
 *  Autoprefixer
 *
 */
gulp.task('styles:build', function() {
  gulp.src(globalConfig.sass_src_dir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sassLint({
      configFile: './.sass-lint.yml',
      formatter: 'stylish',
      'merge-default-rules': false
    }))
    .pipe(sassLint.format())
    .pipe(csscomb())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/breakpoint-sass/stylesheets']
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest(globalConfig.css_dest_dir))
});

/*
 *
 * Styles dist task.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Nested output style
 *  CSScomb validation
 *  Sourcemaps (dev only!)
 *  Autoprefixer
 *
 */
gulp.task('styles:dist', function() {
  gulp.src(globalConfig.sass_src_dir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sassLint({
      configFile: './.sass-lint.yml',
      formatter: 'stylish',
      'merge-default-rules': false
    }))
    .pipe(sassLint.format())
    .pipe(sourcemaps.init())
    .pipe(csscomb())
    .pipe(sass({
      outputStyle: 'nested',
      includePaths: ['node_modules/breakpoint-sass/stylesheets']
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.css_dest_dir))
});

/*
 *
 * Validate SCSS files.
 *
 */
gulp.task('styles:validate', function() {
  return gulp.src(globalConfig.sass_src_dir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
});

/*
 *
 * Watch SCSS files For Changes.
 *
 */
gulp.task('styles:watch', function() {
  gulp.watch(globalConfig.sass_src_dir + '/**/*.scss', ['styles:dist', 'styles:validate']);
});

/*
 *
 * JS files build task.
 *
 * Copies and minifies your JS files to build/js/
 *
 */
gulp.task('js:build', function() {
  gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest(globalConfig.scripts_dest_dir));
});

/*
 *
 * JS files dist task.
 *
 * Copies your JS files to build/js/
 * No minification is done here!
 *
 */
gulp.task('js:dist', function() {
  gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(rename({
      dirname: '',
      suffix: "-min"
    }))
    .pipe(gulp.dest(globalConfig.scripts_dest_dir));
});

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', function() {
  return gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
});

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', function() {
  gulp.watch(globalConfig.scripts_src_dir + '/**/*.js', ['js:dist', 'js:validate']);
});

/*
 *
 * Minify images.
 *
 */
gulp.task('images:minify', ['styles:build'], function(cb) {
  gulp.src([globalConfig.img_src_dir + '/**/*.png', globalConfig.img_src_dir + '/**/*.jpg', globalConfig.img_src_dir + '/**/*.gif', globalConfig.img_src_dir + '/**/*.jpeg', globalConfig.img_src_dir + '/**/*.svg'])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(globalConfig.img_dest_dir)).on('end', cb).on('error', cb);
});

/*
 * Clean build directory.
 *
 * This deletes the build directory before recompiling.
 */
gulp.task('build:clean', function(cb) {
  return del(globalConfig.build_dir + '/**', {force:true});
});

/*
 *
 * Default tasks:
 * Usage:
 *  gulp
 *  gulp watch
 *
 * Used for local development to compile and validate after every change.
 *
 */
gulp.task('default', ['styles:watch', 'js:watch']);
gulp.task('watch', ['default']);

/*
 *
 * Validate task:
 * Usage:
 *  gulp validate
 *
 *  Used to only validate the SCSS and JS code.
 *
 */
gulp.task('validate', ['styles:validate', 'js:validate']);

/*
 * Compile the theme.
 * Usage:
 *  gulp compile
 *
 *  Used build the SCSS and JS code. This also minifies images.
 */
gulp.task('compile', function (done) {
  sequence('build:clean', ['styles:build', 'js:build', 'images:minify', 'fonts:dist'], done);
});

gulp.task('compile:dev', function (done) {
  sequence('build:clean', ['styles:dist', 'js:dist', 'images:minify', 'fonts:dist'], done);
});

/*
 *
 * Build task:
 * Usage:
 *  gulp build
 *
 *  Used to validate and build production ready code.
 *
 */
gulp.task('build', function (done) {
  sequence('build:clean', ['validate', 'compile'], done);
});

/*
 *
 * Font files dist task.
 *
 * Copies your font files to build/fonts/
 *
 */
gulp.task('fonts:dist', function (cb) {
  gulp.src(globalConfig.fonts_src_dir + '/**/*.{eot,svg,ttf,woff,woff2}')
      .pipe(gulp.dest(globalConfig.fonts_dir));
});