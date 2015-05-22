# Mighty

A Yeoman generator that uses [Mighty Mail](https://github.com/dschnare/mighty-mail) to build responsive HTML emails.

# Installation

	npm install yo gulp generator-mighty -g

# Usage

	mkdir emailproj
	cd emailproj
	yo mighty
	yo mighty:email my-email

# The Generators

## Mighty

	yo mighty [--sass]

If the command line option `--sass` is specified then the SASS styles from Mighty Mail will be copied
to the root of the email project. Otherwise the LESS styles from Mighty Mail will be copied to the root of the email project.

The following structure will be generated for your Mighty project:

	emails/
	images/
	styles/
	build/
	node_modules/
	package.json
	gulpfile.js
	gulpfile.config.js
	.gitignore

The Mighty project generator scaffolds a new Mighty Mail email project. Mighty projects
use [gulp](http://gulpjs.com/) as a build system and comes with a custom gulpfile that takes care of the following tasks:

- Linting and compiling all JSX files
- Inlining Reactjs components into the HTML document.
- Compiling LESS or SASS stylesheets.
- Embedding CSS into the HTML document.
- Inlining CSS via Campaigin Montior's CSS inliner tool (must have internet).
- Bundling email(s) in ZIP archives for distribution.
- Produce a local development verison of each email for rapid testing.
- Produce a testing verison of each email for testing with Eamil on Acid or Litmus.
- Produce a production verison of each email for distribution.

In addition to a `gulpfile` that performs the above tasks there is a `gulp.config.js` file that
exposes configuration variables for easy configuration of these tasks.


## Email

	yo mighty:email {email name}

This generator will create a new Reactjs email defintion in the `emails` directory of a mighty project.

# Mighty Mail

The React components used by all emails is provided by the open source [Mighty Mail](https://github.com/dschnare/mighty-mail) project. For more details on each component please read the docs for this project.