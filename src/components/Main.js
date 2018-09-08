import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Events from './events/Events';
import MyConcerts from './MyConcerts';
import Profile from './Profile';

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/events" component={Events} />
			<Route path="/my_concerts" component={MyConcerts} />
			<Route path="/profile" component={Profile} />
		</Switch>
	</main>
);

export default Main;
