"use strict";


var glob = require("glob");


function config() {
	var cfg = {};

	cfg.template = "template.html";
	cfg.imageBaseUrl = "";

	cfg.styles = "styles";
	cfg.images = "images";
	cfg.dest = "build";

	cfg.srcFiles = glob.sync("emails/**/*.js?(x)");
	cfg.srcFilesBase = "emails";

	return cfg;
}

module.exports = config();
