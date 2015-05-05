"use strict";

var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
	copyEmail: function () {
		this.fs.copy(this.templatePath("email.js"), this.destinationPath("emails", this.name) + ".js");
	}
});
