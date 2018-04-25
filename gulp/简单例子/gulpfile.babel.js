import gulp from 'gulp'
import sass from 'gulp-sass'

gulp.task('copy-index', () => {
  return gulp
  .src('index.html')
  .pipe(gulp.dest('dist'))
})

gulp.task('css', () => {
  return gulp
  .src('*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/styles'))
})

// gulp.task('build', ['copy-index', 'hello'])

// gulp.task('watch', () => {
//   gulp.watch('index.html', ['hello']);
// });