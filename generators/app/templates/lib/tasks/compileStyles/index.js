"use strict";


var path = require("path");
var gulp = require("gulp");
var globifyPath = require("../../globifyPath");
var cfg = require("../../../gulp.config");
<% if (sass) { %>
var sass = require("gulp-sass");
<% } else { %>
var less = require("gulp-less");
<% } %>


<% if (sass) { %>
function action() {
	return gulp.src(globifyPath(cfg.styles) + "/styles.scss")
		.pipe(sass())
		.pipe(gulp.dest(path.join(cfg.dest, "styles")));
}
<% } else { %>
function action() {
	return gulp.src(globifyPath(cfg.styles) + "/styles.less")
		.pipe(less())
		.pipe(gulp.dest(path.join(cfg.dest, "styles")));
}
<% } %>

function compileStyles(deps) {
	gulp.task("compile:styles", deps || [], action);
}

module.exports = compileStyles;
