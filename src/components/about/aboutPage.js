"use strict";

var React = require('react');

var About = React.createClass({
	statics: {
		willTransitionTo: function(transition, params, query, callback){
			if (!confirm('yes?')){
				transition.abort();
			} else {
				callback();
			}
		},
		willTransitionFrom: function(transition, component){
			if (!confirm('yes leave?')){
				transition.abort();
			}
		} 
	},
	render: function(){
		return (
			<div>
				<h1>About</h1>
				<p>
					This app has some technologies
					<ul>
						<li>
							React
						</li>
						<li>
							Flux
						</li>

					</ul>
				</p>
			</div>
		);
	}
});

module.exports = About;