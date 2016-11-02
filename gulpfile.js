(function () {

	'use strict';

	var gulp = require('gulp');
	var browserSync = require('browser-sync').create();

	gulp.task('default', function() {
		gulp.run('serve');
	});
	gulp.task('serve', function() {
		gulp.watch('./app/**').on("change", browserSync.reload);

	    browserSync.init({
	        server: {
	            baseDir: "./app"
	        }
	    });
	});

})();
