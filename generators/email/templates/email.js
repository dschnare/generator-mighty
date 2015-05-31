"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var m = require("mighty-mail");

// The base path to load local images from.
// This is relative to the project's root.
// When referencing your images just use "images/myimage.jpg" as usual.
// This is so that the Image component can read the dimensions of your images.

m.Image.imageBasePath = ".";

// Convenient alias' for using components from mighty-mail.
// Without these you'll need to reference components like this:
// <m.Frame>
// <m.ParaBlock>
// <m.ListItem>
// ... etc.

var Table = m.Table;
var Frame = m.Frame;
var Container = m.Container;
var Row = m.Row;
var FullWidthRow = m.FullWidthRow;
var Col = m.Col;

var Ul = m.List;
var Ol = m.OrderedList;
var Li = m.ListItem;
var Img = m.Image;
var P = m.Para;
var Block = m.ParaBlock;
var Hr = m.Divider;
var MeidaObject = m.MediaObject;
var Hero = m.Hero;
var Raw = m.RawHtml;
var Button = m.Button;


// The actual email module.

exports.subject = "The email subject";

exports.body = (
	<Frame borderColor="#d7d7d7">
		<Row>
			<Col>Hello World!</Col>
		</Row>
	</Frame>
);
