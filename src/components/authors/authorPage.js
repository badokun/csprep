"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var apiCallback = function(data, component){
            console.log('Set state using api data');
            component.setState({ authors: data });
        };

var AuthorPage = React.createClass({
	getInitialState: function() {
		return {
			authors: []
		};
	},

	componentDidMount: function() {
		if (this.isMounted()) {      
            AuthorApi.getAllAuthors(apiCallback, this);
		}
	},

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;