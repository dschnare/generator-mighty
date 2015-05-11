"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var m = require("mighty-mail");

m.Image.imageBasePath = ".";

exports.subject = "The email subject"
exports.body = (
	<m.Frame border={0}>
		<m.Row>
			<m.Col>Hello World!</m.Col>
		</m.Row>
	</m.Frame>
);
