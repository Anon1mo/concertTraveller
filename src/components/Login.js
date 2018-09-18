import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {
	state = {
		data: { email: '', password: '' },
		errors: {}
	};

	schema = {
		email: Joi.string()
			.required()
			.label('Email'),
		password: Joi.string()
			.required()
			.label('Password')
	};

	doSubmit = async () => {
		try {
			const { data } = this.state;
			console.log(data);
			await auth.login(data.email, data.password);

			const { state } = this.props.location;
			window.location = state ? state.from.pathname : '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div className="mx-auto w-50">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit2}>
					{this.renderInput('email', 'Email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

LoginForm.propTypes = {
	history: ReactRouterPropTypes.history,
	location: ReactRouterPropTypes.location,
	match: ReactRouterPropTypes.match
};

export default LoginForm;
