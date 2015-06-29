"use strict";


var path = require("path");
var gulp = require("gulp");
var async = require("async");
var mkdir = require("mkdirp");
var listProductionEmails = require("../../listProductionEmails");
var bundleEmails = require("../../bundleEmails");
var bundleEmail = require("../../bundleEmail");
var cfg = require("../../../gulp.config");


function bundle(deps) {
	gulp.task("bundle", deps || [], function (done) {
		listProductionEmails(function (error, emails) {
			if (error) {
				done(error);
			} else {
				async.series([
					// Create the destination zips folder
					async.apply(mkdir, path.join(cfg.dest, "zips")),
					// Bundle all emails as a single zip
					async.apply(bundleEmails, emails),
					function (callback) {
						// Bundle each email individually
						async.parallel(emails.map(function (email) {
							return async.apply(bundleEmail, email);
						}), callback);
					}
				], done);
			}
		});
	});
}

module.exports = bundle;
