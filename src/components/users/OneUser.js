import React, { Component } from 'react';
import { getUser } from '../../services/userService';
import UserCard from './UserCard';
import ReactRouterPropTypes from 'react-router-prop-types';

class OneUser extends Component {
	state = {
		user: {}
	};
	async componentDidMount() {
		const userId = this.props.match.params.id;
		const { data: user } = await getUser(userId);
		this.setState({ user });
	}
	render() {
		const { user } = this.state;
		return (
			<div>
				<h1 className="text-center py-3">User profile</h1>
				{user && <UserCard user={this.state.user} />}
			</div>
		);
	}
}

OneUser.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	match: ReactRouterPropTypes.match.isRequired
};

export default OneUser;
