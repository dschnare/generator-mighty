"use strict";


var path = require("path");
var gulp = require("gulp");
var react = require("gulp-react");
var cfg = require("../../../gulp.config");


function compileEmails(deps) {
	gulp.task("compile:emails", deps || [], function () {
		return gulp.src(cfg.src.emails.files, { base: cfg.src.emails.base })
			.pipe(react({ harmony: true }))
			.pipe(gulp.dest(path.join(cfg.dest, "scripts")));
	});
}

module.exports = compileEmails;
