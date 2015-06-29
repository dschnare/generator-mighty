"use strict";


var path = require("path");
var mkdir = require("mkdirp");
var glob = require("glob");
var gulp = require("gulp");
var async = require("async");
var cfg = require("../../../gulp.config");
var globifyPath = require("../../globifyPath");
var buildEmail = require("../../buildEmail");


function build(deps) {
	gulp.task("build", deps || [], function (done) {
		var dest = globifyPath(cfg.dest);

		glob(dest + "/scripts/**/*.js", function (error, emails) {
			mkdir(path.join(cfg.dest, "html"), function (err) {
				if (err) {
					done(err);
				} else {
					async.parallel(emails.map(function (email) {
						return async.apply(buildEmail, email);
					}), done);
				}
			});
		});
	});
}

module.exports = build;
