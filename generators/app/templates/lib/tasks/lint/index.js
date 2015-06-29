"use strict";


var gulp = require("gulp");
var eslint = require("gulp-eslint");
var cfg = require("../../../gulp.config");


function lint(deps) {
	gulp.task('lint', deps || [], function () {
		return gulp.src(cfg.src.emails.files.concat(cfg.src.components.files))
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failOnError());
	});
}

module.exports = lint;
