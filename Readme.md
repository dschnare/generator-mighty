# Mighty

A Yeoman generator that uses [Mighty Mail](https://github.com/dschnare/mighty-mail) to build responsive HTML emails.

# Installation

	npm install yo gulp generator-mighty -g

# Usage

	mkdir emailproj
	cd emailproj
	yo mighty
	yo mighty:email my-email


# Updating

To update a Mighty project to use the latest generator scaffolding run the following.

	npm update generator-mighty -g
	yo mighty

Follow the promps and choose to overwrite each file when asked.

**NOTE: gulpfile.js, gulp.config.js and package.json will be replaced. Make the appropriate backups if you wish to migrate any of your changes into the new files.**


# The Generators

## Mighty

	yo mighty [--sass]

If the command line option `--sass` is specified then the SASS styles from Mighty Mail will be copied
to the root of the email project. Otherwise the LESS styles from Mighty Mail will be copied to the root of the email project. All styles will be copied to the `styles` directory.

The following structure will be generated for your Mighty project:

	emails/
	images/
	styles/
	build/
	lib/
	node_modules/
	package.json
	gulpfile.js
	gulpfile.config.js
	template.html
	.eslintrc
	.gitignore

The Mighty project generator scaffolds a new Mighty email project. Mighty projects
use [gulp](http://gulpjs.com/) as a build system and comes with a custom gulpfile that takes care of the following tasks:

- Linting and compiling all JSX files
- Inlining Reactjs components into the HTML document.
- Compiling LESS or SASS stylesheets.
- Embedding CSS into the HTML document.
- Inlining CSS via Campaigin Montior's CSS inliner tool (must have internet).
- Bundling email(s) in ZIP archives for distribution.
- Producing a local development verison of each email for rapid testing.
- Producing a testing verison of each email for testing with Eamil on Acid or Litmus.
- Producing a production verison of each email for distribution.
- [BrowserSync](http://www.browsersync.io/) integration for even faster development.

In addition to a `gulpfile` that performs the above tasks there is a `gulp.config.js` file that
exposes configuration variables for easy configuration of these tasks.

**Note: You must have gulp installed globally in order to run the gulpfile.**

	npm install gulp -g


### Tasks

The following tasks are available to you out of the box.

	gulp
	gulp build

Builds all emails in the `emails` directory.

	gulp bundle

Builds and bundles all emails in the `emails` directory.

	gulp build:watch

Builds all emails each time any source file changes (i.e styles, components or emails).
Usefule if you are not using BrowserSync.

	gulp serve

Serves the mighty project at http://localhost:3000 and reloads web page each time any source file is modified. **This task requires you to install BrowserSync: `npm install browser-sync --save-dev`**

For Windows users see this article: http://www.browsersync.io/docs/#windows-users

	gulp compile:styles

Compiles the LESS or SASS styles defined by `gulp.config.styles` to CSS. Saves to `gulp.config.compiledStyles`.

	gulp compile:components

Compiles all custom components defined by `gulp.config.src.components.files` to `gulp.lib`.

	gulp compile:emails

Compiles all emails defined by `gulp.config.src.emails.files` to `gulp.dest + '/html'`.

	gulp lint

Runs ESLint on all JavaScript files (emails, components and lib modules).

	gulp update

A convenient way to update a mighty project to the latest and greatest. This task
will also update the global NPM module `generator-mighty`. This task will prompt you
to replace your `gulpfile.js`, `gulp.config.js` and `package.json`. **Make backups you wish
to preserve and migrate any changes you may have made prior to running this task.**



## Email

	yo mighty:email {email name}

This generator will create a new Reactjs email defintion in the `emails` directory of a mighty project.



## Component

	yo mighty:component {ComponentName}

This generator will create a new React component in `src/components`. The component
will be stubbed out to render a `<table>` with a single `<td>` rendering the component's children.
Emails can then use these components by requiring them from `lib/components`.

	var MyButton = require('../lib/components/MyButton');





# Mighty Mail

The React components used by all emails is provided by the open source [Mighty Mail](https://github.com/dschnare/mighty-mail) project. For more details on each component please read the docs for this project.
