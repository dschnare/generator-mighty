"use strict";


var glob = require("glob");
var path = require("path");


function config() {
	var cfg = {};

	// Determines if HTML will be pretty printed when building emails.
	cfg.prettyPrintHtml = true;

	// The path to the HTML template file to embed the rendered React components into.
	cfg.template = "template.html";
	// The base URL to prefix all images with when producing the test version of each email.
	cfg.imageBaseUrl = "";

	// The path to the styles folder.
	cfg.styles = "styles";
	// The path to the images folder.
	cfg.images = "images";
	// The path to the destination (i.e. build) folder.
	cfg.dest = "build";
	// The library directory where all custom React components
	// are to be compiled to.
	cfg.lib = "lib";

	// The name of the compiled stylesheet from your LESS or SASS styles.
	cfg.compiledStyles = path.join(cfg.dest, "styles", "styles.css");

	// Source path related configuration settings.
	cfg.src = {
		emails: {
			// The base path to your email source files.
			// This is used to preserve the path after this base
			// when writing emails to the cfg.dest folder and to a zip file when bundling
			base: "emails",
			// All your email source files.
			files: glob.sync("emails/**/*.js")
		},
		components: {
			// The base path to your component source files.
			// This is used to preserve the path after this base
			// when writing components to the cfg.lib folder.
			base: "src",
			// All your component source files.
			files: glob.sync("src/components/**/*.js")
		}
	}

	// Suffixes for the built development, testing and production emails.
	cfg.devSuffix = ".dev.html";
	cfg.testSuffix = ".preview.html";
	cfg.prodSuffix = ".html";

	return cfg;
}

module.exports = config();
