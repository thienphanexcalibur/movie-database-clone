var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/assets/styles/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./assets/styles/'));
});
gulp.task('sass:watch', function() {
  gulp.watch('./src/assets/styles/*.scss', gulp.series('sass'));
});
gulp.task('dev', gulp.series(gulp.parallel('sass', 'sass:watch'), function () {

}));