import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Events from './events/Events';
import OneEvent from './events/OneEvent';
import MyConcerts from './MyConcerts';
import OneOffer from './events/oneOffer';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import AddOffer from './events/AddOffer';
import AddEvent from './events/AddEvent';
import AdminPanel from './admin/AdminPanel';
import OneUser from './users/OneUser';
import AdminRoute from './common/adminRoute';
import ProtectedRoute from './common/protectedRoute';

const Main = () => (
	<main className="container pb-5">
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/logout" component={Logout} />
			<Route path="/register" component={Register} />
			<AdminRoute path="/admin_panel" component={AdminPanel} />
			<Route path="/events/:eventId/offers/:offerId" component={OneOffer} />
			<ProtectedRoute
				path="/events/:eventId/addOffer/:offerId"
				component={AddOffer}
			/>
			<AdminRoute path="/events/addEvent/:id" component={AddEvent} />
			<Route path="/events/:id" component={OneEvent} />
			<Route path="/events" component={Events} />
			<Route path="/users/:id" component={OneUser} />
			<ProtectedRoute path="/my_concerts" component={MyConcerts} />
			<Redirect to="/not-found" />
		</Switch>
	</main>
);

export default Main;
