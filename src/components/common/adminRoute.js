import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const AdminRoute = ({ path, component: Component, render, ...rest }) => {
	const user = auth.getCurrentUser();
	const isAdmin = user && user.isAdmin;
	return (
		<Route
			path={path}
			{...rest}
			render={props => {
				if (!isAdmin) return <Redirect to="/not-found" />;
				return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
};

export default AdminRoute;

AdminRoute.propTypes = {
	path: PropTypes.string,
	component: PropTypes.func,
	render: PropTypes.func,
	rest: PropTypes.object
};
