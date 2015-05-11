# Mighty

A Yeoman generator that uses mighty-mail to build responsive HTML emails.

# Usage

	npm install yo gulp generator-mighty -g

	mkdir myemailproj
	cd myemailproj
	yo mighty
	yo mighty:email my-email

# Generators

## Mighty

	yo mighty [--sass]

If the command line option `--sass` is specified then the SASS styles from the mighty-mail module will be copied
to the root of the email project. Otherwise the LESS styles from mighty-mail will be copied to the root of the email project.

The mighty project generator scaffolds a new mighty-mail email project. Mighty projects
use gulp as a build system and comes with a custom gulpfile that takes care of the following tasks:

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
exposes configuration variables for easy modifications to these tasks.

NOTE: For CSS embedding and inling to work, all your styles must compile to the file `config.styles + "/styles.css"`.


## Email

	yo mighty:email {email name}

This generator will create a new Reactjs email defintion in the `emails` directory of a mighty project.