"use strict";

var juice = require("juice");


function inlineCss(html, callback) {
	var newHtml = juice(html, {
		removeStyleTags: false,
		preserveImportant: true,
		xmlMode: true,
		preserveMediaQueries: true
	});
	callback(null, newHtml);
}

module.exports = inlineCss;
