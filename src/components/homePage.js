"use strict";

var React = require('react');

var Home = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
				<h1>First React Component</h1>
				<p>React, React Router, and Flux for responsive webapp
				</p>
			</div>

		);
	}

});

module.exports = Home;