"use strict";


// When using glob() the path must only use UNIX path separators.
// We also remove any trailing slashes.
function globifyPath(path) {
	return path.replace(/\/|\\$/, "").replace(/\\/g, "/");
}

module.exports = globifyPath;
