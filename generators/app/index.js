/// <reference path="../../typings/node/node.d.ts"/>
"use strict";


var generators = require("yeoman-generator");
var path = require("path");
var mkdir = require("mkdirp");


module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);
		this.option("sass");
	},	
	createFolders: function () {
		mkdir.sync(this.destinationPath("images"));
		mkdir.sync(this.destinationPath("emails"));
		mkdir.sync(this.destinationPath("build"));
	},
	copyFiles: function () {
		this.fs.copy(this.templatePath("gulp.config.js"), this.destinationPath("gulp.config.js"));
		this.fs.copyTpl(this.templatePath("gulpfile.js"), this.destinationPath("gulpfile.js"), {
			sass: this.options.sass
		});
	},
	createGitignore: function () {
		this.fs.write(this.destinationPath(".gitignore"), [
			"node_modules",
			"build/scripts",
			"build/styles"].join("\n")
		);
	},
	createEslintRc: function () {
		this.fs.write(this.destinationPath(".eslintrc"), JSON.stringify({
			"ecmaFeatures": {
				"jsx": true,
				"destructuring": true
			},
			"env": {
				"browser": true,
				"node": true
			}
		}));
	},
	copyStyles: function () {
		var styleType = this.options.sass ? "sass" : "less";
		var srcStylesGlob = path.join(this.templatePath(), "..", "..", "..", "node_modules", "mighty-mail", styleType, "**", "*.*");
		this.fs.copy(srcStylesGlob, this.destinationPath("styles"));
	},
	copyEmailTemplate: function () {
		var tplFile = path.join(this.templatePath(), "..", "..", "..", "node_modules", "mighty-mail", "template.html");
		this.fs.copy(tplFile, this.destinationPath("template.html"));
	},
	createPackageJson: function () {
		this.fs.write(this.destinationPath("package.json"), JSON.stringify({
			name: path.basename(this.destinationPath()),
			"private": true,
			version: "0.1.0"
		}));
	},
	installDeps: function () {
		var styleDeps = this.options.sass ? "gulp-sass" : "gulp-less";
		var deps = [
			"react",
			"async",
			"mkdirp",
			"superagent",
			"easy-zip",
			"mighty-mail",
			"classnames",
			"glob",
			"gulp",
			"gulp-eslint",
			"gulp-react",
			styleDeps,
			"html"
		];

		this.npmInstall(deps, { saveDev: true });
	}
});
