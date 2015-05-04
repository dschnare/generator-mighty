"use strict";


var fs = require("fs");
var path = require("path");
var mkdir = require("mkdir-p");
var html = require("html");
var EasyZip = require("easy-zip").EasyZip;
var request = require("superagent");

var gulp = require("gulp");
var cfg = require("./gulp.config");
var eslint = require("gulp-eslint");
var sass = require("gulp-sass");
var less = require("gulp-less");
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

gulp.task("less:build", function () {
	return gulp.src(globifyPath(cfg.styles) + "/styles.less")
		.pipe(less())
		.pipe(gulp.dest(path.join(config.dest, "styles")));
});

gulp.task("sass:build", function () {
	return gulp.src(globifyPath(config.styles) + "/styles.scss")
		.pipe(sass())
		.pipe(gulp.dest(path.join(config.dest, "styles")));
});

gulp.task("build", ["compile", "less:build", "sass:build"], function (done) {
	var globDest = globifyPath(cfg.dest);

	glob(globDest + "/scripts/**/*.js", function (emails) {
		async.parallel(emails.map(function (email) {
			return async.apply(buildEmail, email);
		}), done);
	});
});

gulp.task("bundle", ["build"], function (done) {
	getAllProductionEmails(function (error, emails) {
		if (error) {
			done(error);
		} else {
			async.series([
				async.apply(bundleAllEmails, emails),
				function (callback) {
					async.parallel(emails.map(function (email) {
						return async.apply(bundleEmail, email);
					}), callback);
				}
			], done);
		}
	})
});

// Helpers

// When using glob() the path must only use UNIX path separators.
// We also remove any trailing slashes.
function globifyPath(path) {
	return path.replace(/\/|\\$/, "").replace(/\\/g, "/");
}

function buildEmail(email, callback) {
	var body = require("./" + email).render();
	var globDest = globifyPath(cfg.dest);
	var basename = path.basename(email, ".js");
	var dirname = path.dirname(email).replace(globDest + "/scripts/");
	var developmentFilename = path.join(cfg.dest, "html", dirname, basename + ".dev.html");
	var testingFilename = path.join(cfg.dest, "html", dirname, basename + ".test.html")
	var productionFilename = path.join(cfg.dest, "html", dirname, basename + ".html");

	body = html.prettyPrint(body, { indent_size: 2 });

	loadTemplate(body, function (error, emailHtml) {
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

function loadTemplate(body, callback) {
	var opts = { encoding: "utf8" };

	async.parallel({
		styles: async.apply(fs.readFile, path.join(cfg.dest, "styles", "style.css"), opts),
		html: async.apply(fs.readFile, cfg.template, opts)
	}, function (error, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, results.html
				.replace("%styles%", results.styles)
				.replace("%body%", body));
		}
	});
}

function developmentTransform(html, dirname, callback) {
	var baseUrl = path.relative(path.join(cfg.dest, "html", dirname), path.dirname(cfg.images));
	callback(null, html.replace("<body[^>]*>", "$1\n<base href=\"" + baseUrl + "\" />"));
}

function testingTransform(html, callback) {
	html = prefixImageReferencesInHtml(html);
	inlineCss(html, callback);
}

function productionTransform(html) {
	inlineCss(html, callback);
}

function prefixImageReferencesInHtml(html) {
	// TODO: Implement
	return html;
}

function getAllProductionEmails(callback) {
	var globDest = globifyPath(cfg.dest);

	glob(globDest + "/html/**/*.html", function (error, emails) {
		if (error) {
			callback(error);
		} else {
			var prodEmails = emails.filter(function (email) {
				return email.indexOf(".test.html") < 0
					&& email.indexOf(".dev.html") < 0;
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
	var filename = path.basename(email);

	zip.zipFolder(cfg.images, function (error) {
		if (error) {
			callback(error);
		} else {
			async.eachSeries(emails, function (email, cb) {
				zip.addFile(filename, email, cb);
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

function inlineCss(emailFile, callback) {
	fs.readFile(emailFile, {
		encoding: "utf8"
	}, function (error, html) {
		if (error) {
			callback(error);
		} else {
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
	});
}