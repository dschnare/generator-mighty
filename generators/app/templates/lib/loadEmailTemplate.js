"use strict";


var fs = require("fs");
var path = require("path");
var async = require("async");
var cfg = require("../gulp.config");


function loadEmailTemplate(subject, body, callback) {
	var opts = { encoding: "utf8" };

	async.parallel({
		styles: async.apply(fs.readFile, path.join(cfg.compiledStyles), opts),
		html: async.apply(fs.readFile, cfg.template, opts)
	}, function (error, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, results.html
				.replace("%subject%", subject)
				.replace("%styles%", results.styles)
				.replace("%body%", body));
		}
	});
}

module.exports = loadEmailTemplate;
