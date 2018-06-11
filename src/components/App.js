import React, {Component} from 'react';
//import { hot } from 'react-hot-loader';
import Menu from './Menu';
import Main from './Main';

class App extends Component {
	render() {
		return (
			<div>
				<Menu />
				<Main />
			</div>
		);
	}
}

export default App;
