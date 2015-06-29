"use strict";


var gulp = require("gulp");
var cfg = require("../../../gulp.config");


function buildWatch() {
	gulp.task("build:watch", function () {
		var opts = {
			interval: 100,
			debounceDelay: 500,
			mode: 'auto',
			cwd: process.cwd()
		};

		// When emails, styles or components are compiled we re-build
		gulp.watch([
			cfg.src.emails.base + "/**/*.js",
			cfg.styles + "/**/*.*",
			cfg.src.components.base + "/**/*.js"], opts, ["build"]);
	});
}

module.exports = buildWatch;
