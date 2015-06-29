"use strict";

var request = require("superagent");


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

module.exports = inlineCss;
