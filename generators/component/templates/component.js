"use strict";


/*eslint no-unused-vars: 0*/


var React = require("react");
var classNames = require("classnames");
var defineTableProps = require("mighty-mail/lib/util/defineTableProps");
var defineTdProps = require("mighty-mail/lib/util/defineTdProps");
var pluckTableProps = require("mighty-mail/lib/util/pluckTableProps");
var pluckTdProps = require("mighty-mail/lib/util/pluckTdProps");


var <%= componentName %> = React.createClass({
	// Component API
	propTypes: {
		wrapper: React.PropTypes.shape(defineTdProps())
	},
	render: function () {
		var tableProps = this.getTableProps(this.props);
		var wrapperProps = this.getTdProps(this.props.wrapper || {});

		return (
			<table {...tableProps}>
				<tbody>
					<tr>
						<td {...wrapperProps}>
							{this.props.children}
						</td>
					</tr>
				</tbody>
			</table>
		);
	},
	// Private API
	getTableProps: function (props) {
		return pluckTableProps();
	},
	getTdProps: function (props) {
		return pluckTdProps(props);
	}
	// Public API
	// TODO: Add public methods
});

module.exports = <%= componentName %>;
