import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '../common/table';
import _ from 'lodash';
import { getUsers } from '../../services/userService';

class UsersTable extends Component {
	columns = [
		{
			path: 'username',
			label: 'Username',
			content: user => <Link to={`/users/${user._id}`}>{user.username}</Link>
		},
		{
			path: 'email',
			label: 'Email'
		},
		{
			path: 'age',
			label: 'Age'
		}
	];

	constructor() {
		super();
		this.state = {
			users: null,
			sortColumn: { path: 'username', order: 'asc' }
		};
	}

	async componentDidMount() {
		let { data: users } = await getUsers();
		this.setState({ users });
	}

	handleSort = sortColumn => {
		const { users } = this.state;
		const sorted = _.orderBy(users, [sortColumn.path], [sortColumn.order]);
		this.setState({ sortColumn, users: sorted });
	};

	render() {
		const { sortColumn, users } = this.state;
		return (
			<Table
				columns={this.columns}
				data={users}
				sortColumn={sortColumn}
				onSort={this.handleSort}
			/>
		);
	}
}

UsersTable.propTypes = {};

export default UsersTable;
