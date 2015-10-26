"use strict";

//This file is mocking a web API by hitting hard coded data.
var authors = require('./authorData').authors;
var _ = require('lodash');
$ = jQuery = require('jquery');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(author) {
	return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var AuthorApi = {
	getAllAuthors: function(callback, component) {
        return $.get("http://localhost:3000/api/authors/", function(data, textStatus, jqXHR) { 
                console.dir('Data received from Api');
                callback(data, component);
            });
	},

	getAuthorById: function(id, callback, component) {
        return $.get("http://localhost:3000/api/authors/" + id, function(data, textStatus, jqXHR) { 
                console.dir('Author received from Api');
                callback(data, component);
            });
	},
	
	saveAuthor: function(author) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the author to the DB via AJAX call...');
		
		if (author.id) {
			var existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id})); 
			authors.splice(existingAuthorIndex, 1, author);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new authors in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			author.id = _generateId(author);
			authors.push(_clone(author));
		}

		return author;
	},

	deleteAuthor: function(id) {
		console.log('Pretend this just deleted the author from the DB via an AJAX call...');
		_.remove(authors, { id: id});
	}
};

module.exports = AuthorApi;