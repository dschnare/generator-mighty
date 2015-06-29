"use strict";


var glob = require("glob");
var globifyPath = require("./globifyPath");
var cfg = require("../gulp.config");


function listProductionEmails(callback) {
	var dest = globifyPath(cfg.dest);

	glob(dest + "/html/**/*.html", function (error, emails) {
		if (error) {
			callback(error);
		} else {
			var prodEmails = emails.filter(function (email) {
				return email.indexOf(cfg.testSuffix) < 0
					&& email.indexOf(cfg.devSuffix) < 0;
			});
			callback(null, prodEmails);
		}
	});
}

module.exports = listProductionEmails;
