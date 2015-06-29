"use strict";


var path = require("path");
var cfg = require("../gulp.config");


function prefixImageReferencesInHtml(html) {
	function prefix($0, $1, $2) {
		// If url begins with http then leave as is
		if ($2.indexOf("http") === 0) {
			return $0;
		}

		return $1 + path.join(cfg.imageBaseUrl, $2)
			// Replace Windows path separators with Unix path separators
			.replace(/\\/g, "/")
			// Ensure http:/ or https:/ has two slashes
			.replace(/http(s)?:\//, "http$1://");
	}

	return html
		// Prefix CSS Outlook background and image src attributes
		.replace(/((?:background|src)=")([^"]+)/g, prefix)
		// Prefix CSS url() rules
		.replace(/(url\(['"]?)([^'"\)]+)/g, prefix);
}

module.exports = prefixImageReferencesInHtml;
