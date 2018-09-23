import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';
import Menu from './Menu';
import Main from './Main';
import auth from '../services/authService';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		return (
			<div>
				<ToastContainer />
				<Menu user={this.state.user} />
				<Main />
				<Footer />
			</div>
		);
	}
}

export default hot(module)(App);
