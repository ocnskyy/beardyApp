var gulp = require('gulp'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	path = ['./js/app.js', './js/controllers/*.js', './js/config.js'];

gulp.task('default', function() {
	 return gulp.src(path)
    	.pipe(concat('bundle.js'))
    	.pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
	gulp.watch('./js/*/*.js', ['default'])
});
