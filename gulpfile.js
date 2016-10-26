// alert('this is gulpfile.js file');
const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('default', () => {
	return gulp.src('./js/src/script.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./js'));
});

gulp.task('watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
