import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={props => {
				if (!auth.getCurrentUser())
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: { from: props.location }
							}}
						/>
					);
				return Component ? <Component {...props} /> : render(props);
			}}
		/>
	);
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
	path: PropTypes.string,
	component: PropTypes.func,
	render: PropTypes.func,
	rest: PropTypes.object,
	location: ReactRouterPropTypes.location
};
