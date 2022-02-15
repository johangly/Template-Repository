const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
// var preprocess = require("gulp-preprocess");
const cleanCSS = require('gulp-clean-css');
var ts = require('gulp-typescript');

// typescript compiler

gulp.task('typescript', function () {
  return gulp.src('src/ts/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'index.js'
    }))
    .pipe(gulp.dest('build/js'));
});

//compress

gulp.task('minify-css', () => {
  return gulp.src('build/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('build/css'));
});

//sass compiler

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sass({
      noImplicitAny: true,
      outFile: 'index.scs'
    }))
    .pipe(gulp.dest('build/css'));
});

//html preprocesor

gulp.task("html", function () {
  gulp
    .src("src/html/*.html")
    .pipe(preprocess({ context: { NODE_ENV: "production", DEBUG: true } }))
    .pipe(gulp.dest("build"));
});

// babel compiler

gulp.task('babel', () =>
  gulp.src('build/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))
);

//watch tasks

gulp.task('default', function () {
  gulp.watch('src/ts/*.ts', gulp.series('typescript', 'babel'));
  gulp.watch('src/sass/**', gulp.series('sass', 'minify-css'));
});