"use strict";


var spawn = require("child_process").spawn;
var exec = require("child_process").exec;
var gulp = require("gulp");


function update(deps) {
	gulp.task("update", deps || [], function (done) {
		// Reference: http://stackoverflow.com/questions/19417652/spawning-a-child-process-to-call-npm-installed-command-in-nodejs-causes-enoent-i
		console.info("Updating generator-mighty.");
		spawn(process.env.comspec, ['/c' ,'npm', 'update', 'generator-mighty', '-g'], { stdio: 'inherit' })
			.on('close', function (code) {
				if (code !== 0) {
					done(new Error("Failed to update generator-mighty."));
				} else {
					console.info("Completed updating generator-mighty.");
					console.info("Invoking yo mighty.");
					spawn(process.env.comspec, ['/c', 'yo', 'mighty'], { stdio: 'inherit' })
						.on('close', function (code) {
							if (code !== 0) {
								done(new Error("Failed to invoke yo mighty."));
							} else {
								done();
							}
						});
				}
			});
	});
}

module.exports = update;
