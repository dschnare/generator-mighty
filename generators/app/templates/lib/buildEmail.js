"use strict";

var fs = require("fs");
var path = require("path");
var React = require("react");
var async = require("async");
var html = require("html");
var loadEmailTemplate = require("./loadEmailTemplate");
var prefixImageReferencesInHtml = require("./prefixImageReferencesInHtml");
var inlineCss = require("./inlineCss");
var cfg = require("../gulp.config");


function buildEmail(emailJsFile, callback) {
	var basename = path.basename(emailJsFile, ".js");
	var dirname = path.relative(
		path.dirname(emailJsFile),
		path.join(cfg.dest, "scripts"));

	var developmentFilename = path.join(
		cfg.dest, "html", dirname, basename + cfg.devSuffix);
	var testingFilename = path.join(
		cfg.dest, "html", dirname, basename + cfg.testSuffix)
	var productionFilename = path.join(
		cfg.dest, "html", dirname, basename + cfg.prodSuffix);

	var theEmail = require("../" + emailJsFile);
	var subject = theEmail.subject;
	var body = React.renderToStaticMarkup(theEmail.body);

	if (cfg.prettyPrintHtml) {
		body = html.prettyPrint(body, { indent_size: 2 });
	}

	// Make sure there is no extra whitespace
	// introduced in Outlook conditional if blocks.
	body = body.replace(/<!--\[if\s+/g, "<!--[if ");
	// Make sure there are no spaces added before superscript and subscripts.
	body = body.replace(/(\S)(\n|\s)+\<(sup|sub)/g, "$1<$3");

	loadEmailTemplate(subject, body, function (error, emailHtml) {
		if (error) {
			callback(error);
		} else {
			async.parallel({
				development: async.apply(developmentTransform, emailHtml, dirname),
				testing: async.apply(testingTransform, emailHtml),
				production: async.apply(productionTransform, emailHtml)
			}, function (error, results) {
				if (error) {
					callback(error);
				} else {
					async.parallel([
						async.apply(fs.writeFile, developmentFilename, results.development),
						async.apply(fs.writeFile, testingFilename, results.testing),
						async.apply(fs.writeFile, productionFilename, results.production)
					], callback);
				}
			});
		}
	});
}

function developmentTransform(html, dirname, callback) {
	var dir = path.join(cfg.dest, "html", dirname);
	var baseUrl = path.relative(dir, path.dirname(cfg.images));
	callback(null, html.replace(
		/(<body[^>]*>)/, "$1\n  <base href=\"" + baseUrl + "\" />"));
}

function testingTransform(html, callback) {
	html = prefixImageReferencesInHtml(html);
	inlineCss(html, callback);
}

function productionTransform(html, callback) {
	inlineCss(html, callback);
}

module.exports = buildEmail;
