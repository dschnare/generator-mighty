"use strict";

var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
	copyComponent: function () {
		this.fs.copyTpl(this.templatePath("component.js"),
			this.destinationPath("src/components", this.name) + ".js", {
			componentName: this.name
		});
	}
});
