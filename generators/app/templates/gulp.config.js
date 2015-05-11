"use strict";


var glob = require("glob");


function config() {
	var cfg = {};

	cfg.template = "template.html";
	cfg.imageBaseUrl = "";

	// NOTE: For CSS embedding and inling to work, all your styles must compile to the file cfg.styles + "/styles.css".
	cfg.styles = "styles";
	cfg.images = "images";
	cfg.dest = "build";

	cfg.srcFiles = glob.sync("emails/**/*.js?(x)");
	cfg.srcFilesBase = "emails";

	return cfg;
}

module.exports = config();
