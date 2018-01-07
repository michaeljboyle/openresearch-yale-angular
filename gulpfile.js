var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', defaultTask);
gulp.task('styles', convertSass);

function defaultTask(done) {
  gulp.watch('assets/sass/**/*.scss', convertSass);
  done();
}

function convertSass(done) {
    gulp.src('assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('assets/css/'));
    done();
}