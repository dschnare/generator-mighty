"use strict";


var fs = require("fs");
var path = require("path");
var zip = require("just-zip");
var cfg = require("../gulp.config");


function bundleEmail(emailHtmlFile, callback) {
	var basename = path.basename(emailHtmlFile, ".html");
	var zipFileName = path.join(cfg.dest, "zips", basename + ".zip");

	// Create an empty ZIP file so just-zip won't throw an error.
	// The root of the problem is just-zip checks errno when
	// attempting to get file stats on the zip file. The err.errno
	// changed from 34 to -2 for ENOENT. The code should be checking
	// err.code === "ENOENT" instead.
	fs.writeFile(zipFileName, "", { encoding: "utf8" }, function (error) {
		if (error) {
			callback(error);
		} else {
			zip([cfg.images, emailHtmlFile], zipFileName, callback);
		}
	});
}

module.exports = bundleEmail;
