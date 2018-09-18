import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Events from './events/Events';
import OneEvent from './events/OneEvent';
import MyConcerts from './MyConcerts';
import Profile from './Profile';
import OneOffer from './events/oneOffer';
import Login from './Login';
import Register from './Register';

const Main = () => (
	<main className="container">
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/events/:eventId/offers/:offerId" component={OneOffer} />
			<Route path="/events/:id" component={OneEvent} />
			<Route path="/events" component={Events} />
			<Route path="/my_concerts" component={MyConcerts} />
			<Route path="/profile" component={Profile} />
			<Redirect to="/not-found" />
		</Switch>
	</main>
);

export default Main;
