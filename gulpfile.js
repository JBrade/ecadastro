(function () {

	'use strict';

	// Aqui nós carregamos o gulp e os plugins através da função `require` do nodejs
	var gulp = require('gulp');
	var jshint = require('gulp-jshint');
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var rename = require('gulp-rename');
	var browserSync = require('browser-sync').create();

	// Definimos o diretorio dos arquivos para evitar repetição futuramente
	var arquivosJs = "./app/*.js";
	var arquivosHtml = "./app/*.html"

	gulp.task('lint', function() {
		gulp.src(arquivosJs)
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
	});

	gulp.task('build', function() {
		gulp.src(arquivosJs)
			.pipe(concat('./dist'))
			.pipe(rename('dist.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./dist'));
	});

	gulp.task('default', function() {
		gulp.run('serve');
	});

	gulp.task('serve', function() {
		gulp.watch(arquivosJs, ['lint']).on("change", browserSync.reload);
		gulp.watch(arquivosHtml).on("change", browserSync.reload);

	    browserSync.init({
	        server: {
	            baseDir: "./app"
	        }
	    });
	});

})();
