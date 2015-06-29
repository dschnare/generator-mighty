"use strict";


var gulp = require("gulp");
var react = require("gulp-react");
var cfg = require("../../../gulp.config");


function compileComponents(deps) {
	gulp.task("compile:components", deps || [], function () {
		return gulp.src(cfg.src.components.files, { base: cfg.src.components.base })
			.pipe(react({ harmony: true }))
			.pipe(gulp.dest(cfg.lib));
	});
}

module.exports = compileComponents;
