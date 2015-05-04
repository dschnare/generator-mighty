"use strict";


var glob = require("glob");


function config() {
	var cfg = {};

	cfg.imageBaseUrl = "";

	cfg.images = "images";
	cfg.dest = "build";

	cfg.srcFiles = glob.sync("emails/**/*.js?(x)");
	cfg.srcFilesBase = "emails";

	return cfg;
}

module.exports = config();
