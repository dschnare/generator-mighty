"use strict";


var gulp = require("gulp");
var cfg = require("../../../gulp.config");


function serve() {
	try {
		var browserSync = require("browser-sync").create();
		gulp.task("build:sync", ["build"], browserSync.reload);
		gulp.task("serve", function (done) {
			browserSync.init({
				server: "./"
			});

			var opts = {
				interval: 100,
				debounceDelay: 500,
				mode: 'auto',
				cwd: process.cwd()
			};

			// When emails, styles or components are compiled we reload the browser
			gulp.watch([
				cfg.src.emails.base + "/**/*.js",
				cfg.styles + "/**/*.*",
				cfg.src.components.base + "/**/*.js"], opts, ["build:sync"]);
		});
	} catch (error) {
		console.warn([
			"WARN: browser-sync not insalled.",
			"Run 'npm install browser-sync --save-dev' to activate the 'serve' gulp task.",
			"Windows see http://www.browsersync.io/docs/#windows-users"].join("\n"));
	}
}

module.exports = serve;
