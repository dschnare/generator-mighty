"use strict";


var fs = require("fs");
var path = require("path");
var mkdir = require("mkdirp");
var html = require("html");
var EasyZip = require("easy-zip").EasyZip;
var request = require("superagent");
var glob = require("glob");
var async = require("async");
var React = require("react");

var gulp = require("gulp");
var cfg = require("./gulp.config");
var eslint = require("gulp-eslint");
<% if (sass) { %>
var sass = require("gulp-sass");
<% } else { %>
var less = require("gulp-less");
<% } %>
var react = require("gulp-react");


gulp.task('lint', function () {
	return gulp.src(cfg.srcFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task("compile", ["lint"], function () {
	return gulp.src(cfg.srcFiles, { base: cfg.srcFilesBase })
		.pipe(react({ harmony: true }))
		.pipe(gulp.dest(path.join(cfg.dest, "scripts")));
});

<% if (sass) { %>
gulp.task("styles:build", function () {
	return gulp.src(globifyPath(cfg.styles) + "/styles.scss")
		.pipe(sass())
		.pipe(gulp.dest(path.join(cfg.dest, "styles")));
});
<% } else { %>
gulp.task("styles:build", function () {
	return gulp.src(globifyPath(cfg.styles) + "/styles.less")
		.pipe(less())
		.pipe(gulp.dest(path.join(cfg.dest, "styles")));
});
<% } %>

gulp.task("build", ["compile", "styles:build"], function (done) {
	var globDest = globifyPath(cfg.dest);

	glob(globDest + "/scripts/**/*.js", function (error, emails) {
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

gulp.task("bundle", ["build"], function (done) {
	getAllProductionEmails(function (error, emails) {
		if (error) {
			done(error);
		} else {
			async.series([
				async.apply(mkdir, path.join(cfg.dest, "zips")),
				async.apply(bundleAllEmails, emails),
				function (callback) {
					async.parallel(emails.map(function (email) {
						return async.apply(bundleEmail, email);
					}), callback);
				}
			], done);
		}
	});
});

gulp.task("default", ["build"]);

// Helpers

// When using glob() the path must only use UNIX path separators.
// We also remove any trailing slashes.
function globifyPath(path) {
	return path.replace(/\/|\\$/, "").replace(/\\/g, "/");
}

function buildEmail(email, callback) {
	var theEmail = require("./" + email);
	var subject = theEmail.subject;
	var body = React.renderToStaticMarkup(theEmail.body);
	var globDest = globifyPath(cfg.dest);
	var basename = path.basename(email, ".js");
	var dirname = path.dirname(email).replace(globDest + "/scripts", "");
	var developmentFilename = path.join(cfg.dest, "html", dirname, basename + cfg.devSuffix);
	var testingFilename = path.join(cfg.dest, "html", dirname, basename + cfg.testSuffix)
	var productionFilename = path.join(cfg.dest, "html", dirname, basename + cfg.prodSuffix);

	body = html.prettyPrint(body, { indent_size: 2 });
	// Make sure there is no extra whitespace introduced in Outlook conditional if blocks.
	body = body.replace(/<!--\[if\s+/g, "<!--[if ");

	loadTemplate(subject, body, function (error, emailHtml) {
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

function loadTemplate(subject, body, callback) {
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

function developmentTransform(html, dirname, callback) {
	var baseUrl = path.relative(path.join(cfg.dest, "html", dirname), path.dirname(cfg.images));
	callback(null, html.replace(/(<body[^>]*>)/, "$1\n  <base href=\"" + baseUrl + "\" />"));
}

function testingTransform(html, callback) {
	html = prefixImageReferencesInHtml(html);
	inlineCss(html, callback);
}

function productionTransform(html, callback) {
	inlineCss(html, callback);
}

function prefixImageReferencesInHtml(html) {
	function replace($0, $1, $2) {
		if ($2.indexOf("http") === 0) {
			return $0;
		}

		return $1 + path.join(cfg.imageBaseUrl, $2).replace(/\\/g, "/").replace(/http(s)?:\//, "http$1://");
	}

	return html
		.replace(/((?:background|src)=")([^"]+)/g, replace)
		.replace(/(url\(['"]?)([^'"\)]+)/g, replace);
}

function getAllProductionEmails(callback) {
	var globDest = globifyPath(cfg.dest);

	glob(globDest + "/html/**/*.html", function (error, emails) {
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

function bundleEmail(email, callback) {
	var zip = new EasyZip();
	var basename = path.basename(email, ".html");

	zip.zipFolder(cfg.images, function (error) {
		if (error) {
			callback(error);
		} else {
			zip.addFile("index.html", email, function (err) {
				if (err) {
					callback(err);
				} else {
					zip.writeToFile(path.join(cfg.dest, "zips", basename + ".zip"), callback);
				}
			});
		}
	});
}

function bundleAllEmails(emails, callback) {
	var zip = new EasyZip();

	zip.zipFolder(cfg.images, function (error) {
		if (error) {
			callback(error);
		} else {
			async.eachSeries(emails, function (email, cb) {
				zip.addFile(path.basename(email), email, cb);
			}, function (error) {
				if (error) {
					callback(error);
				} else {
					zip.writeToFile(path.join(cfg.dest, "zips", "all.zip"), callback);
				}
			});
		}
	});
}

function inlineCss(html, callback) {
	request.post("http://inliner.cm/inline.php")
		.type("form")
		.send({ code: html })
		.end(function (err, response) {
			if (err) {
				callback(err);
			} else {
				callback(null, response.body.HTML);
			}
		});
}