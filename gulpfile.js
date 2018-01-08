/* eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var jasmine = require('gulp-jasmine-phantom');
var eslint = require('gulp-eslint');

gulp.task('default', serve);
gulp.task('styles', convertSass);
gulp.task('tests', tests);
gulp.task('lint', lint);

function serve(done) {
  browserSync.init({
    server: './src/client',
  });
  gulp.watch('src/client/assets/sass/**/*.scss', convertSass);
  // gulp.watch('src/client/**/*.js', lint);
  gulp.watch(['src/client/**/*.html', 'src/client/**/*.js'])
    .on('change', browserSync.reload);
}

function convertSass(done) {
  gulp.src('src/client/assets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
  }))
  .pipe(gulp.dest('src/client/assets/css/'))
  .pipe(browserSync.stream());
  done();
}

function tests(done) {
  gulp.src('tests/*.js')
  .pipe(jasmine({
    integration: true,
    vendor: 'src/client/**/*.js',
  }));
  done();
}

function lint(done) {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  gulp.src(['**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
  done();
}
