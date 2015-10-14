"use strict";

var React = require('react');

var AuthorList = React.createClass({
	propTypes: {
		authors: React.PropTypes.array.isRequired
	},
	render: function(){
		var createAuthorsRow = function(author){
			return (
				<tr key={author.id}>
					<td><a href={"/#authors/" + author.id}>{author.id}</a> </td>
					<td>{author.firstName} {author.lastName}</td> 
				</tr>
			);
		};
		return (
			<div>
				<table className="table">
					<thread>
						<th>
							ID
						</th>
						<th>
							Name
						</th>
					</thread>
					<tbody>
						{this.props.authors.map(createAuthorsRow, this)}
					</tbody>
				</table>

			</div>
		);
	}
});

module.exports = AuthorList;


