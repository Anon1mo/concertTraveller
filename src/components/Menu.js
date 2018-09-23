import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ user }) => (
	<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
		<div className="container">
			<a className="navbar-brand" href="#">
				Concert Traveller
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarsExampleDefault"
				aria-controls="navbarsExampleDefault"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse" id="navbarsExampleDefault">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink className="nav-link" to="/events">
							Events
						</NavLink>
					</li>
					{user && (
						<li className="nav-item">
							<NavLink className="nav-link" to="/my_concerts">
								My Events
							</NavLink>
						</li>
					)}
					{user &&
						user.isAdmin && (
							<li className="nav-item">
								<NavLink className="nav-link" to="/admin_panel">
									Admin Panel
								</NavLink>
							</li>
						)}
				</ul>
				<ul className="navbar-nav ml-auto">
					{!user && (
						<React.Fragment>
							<li className="nav-item">
								<NavLink className="nav-link" to="/login">
									Login
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/register">
									Register
								</NavLink>
							</li>
						</React.Fragment>
					)}
					{user && (
						<React.Fragment>
							<li className="nav-item">
								<NavLink className="nav-link" to={`/users/${user._id}`}>
									{user.username}
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/logout">
									Logout
								</NavLink>
							</li>
						</React.Fragment>
					)}
				</ul>
			</div>
		</div>
	</nav>
);

Menu.propTypes = {
	user: PropTypes.object
};
export default Menu;
