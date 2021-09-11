const gulp = require('gulp');

gulp.task('createApp', () => {
	return gulp.src(['../dist/**/*']).pipe(gulp.dest('www'));
});
