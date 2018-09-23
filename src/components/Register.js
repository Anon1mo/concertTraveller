import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class Register extends Form {
	constructor() {
		super();
		this.state = {
			data: { username: '', password: '', email: '', age: '' },
			errors: {}
		};
	}

	schema = {
		username: Joi.string()
			.required()
			.label('Username'),
		password: Joi.string()
			.required()
			.min(5)
			.label('Password'),
		email: Joi.string()
			.required()
			.email()
			.label('Email'),
		age: Joi.number()
			.required()
			.min(15)
			.label('Age')
	};

	async doSubmit() {
		try {
			const response = await userService.register(this.state.data);
			auth.loginWithJwt(response.headers['x-auth-token']);

			const { state } = this.props.location;
			window.location = state ? state.from.pathname : '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	}

	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div className="mx-auto w-50">
				<h1 className="text-center py-2">Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('email', 'Email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('age', 'Age', 'number')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default Register;
