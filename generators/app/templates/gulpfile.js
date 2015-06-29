"use strict";


var gulp = require("gulp");
var taskUpdate = require("./lib/tasks/update");
var taskLint = require("./lib/tasks/lint");
var taskCompileStyles = require("./lib/tasks/compileStyles");
var taskCompileEmails = require("./lib/tasks/compileEmails");
var taskCompileComponents = require("./lib/tasks/compileComponents");
var taskBuild = require("./lib/tasks/build");
var taskBuildWatch = require("./lib/tasks/buildWatch");
var taskBundle = require("./lib/tasks/bundle");
var taskServe = require("./lib/tasks/serve");


taskUpdate();
taskLint();
taskCompileEmails(["lint", "compile:components"]);
taskCompileComponents(["lint"]);
taskCompileStyles();
taskBuild(["compile:emails", "compile:styles"]);
taskBundle(["build"]);

// Depends on build task.
taskBuildWatch();
taskServe();

gulp.task("default", ["build"]);
