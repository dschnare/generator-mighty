"use strict";


var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);

		this.option("sass");
	},
	createFolders: function () {
		// emails
		// styles
		// images
		// build/html
		// build/styles
		// build/scripts
		// build/zips
	},
	copyFiles: function () {

	},
	installDeps: function () {
		var deps = [
			"react",
			"async",
			"superagent",
			"easy-zip",
			"mighty-mail",
			"classnames",
			"glob",
			"gulp",
			"gulp-eslint",
			"gulp-react",
			"gulp-sass",
			"gulp-less",
			"html"
		];

		this.npmInstall(deps, { saveDev: true });
	}
});
