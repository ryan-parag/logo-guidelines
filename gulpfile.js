'use strict';

var gulp = require('gulp'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps  = require('gulp-sourcemaps'),
	rename  = require('gulp-rename'),
 pug = require('gulp-pug'),
	browserSync = require('browser-sync').create();

var paths = {
  dist: './dist/',
  sass: './src/scss/',
  css: './dist/css/',
		pug: './src/views/*.pug'
	};

/* SCSS
==============================================*/
gulp.task('sass', function () {
	return gulp.src(paths.sass + 'styles.scss')
		.pipe(sass())
		.pipe(sourcemaps.init())
		.pipe(minifyCSS())
		.pipe(prefix())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({
      stream: true
    }));
});

/* PUG
==============================================*/
gulp.task('pug', function () {
  return gulp.src(paths.pug)
  .pipe(pug({}))
.pipe(gulp.dest(paths.dist));
});

/* Watch
==============================================*/
gulp.task('watch',['browserSync'], function(){
  gulp.watch('./src/scss/**/*.scss', ['sass']);
		gulp.watch('./src/views/**/*.pug', ['pug']);
})

/* BrowserSync
==============================================*/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})



/* Build
==============================================*/
gulp.task('build', ['sass', 'pug']);

/* Compile
==============================================*/
gulp.task('default', ['build', 'watch']);