import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { getEvent } from '../../services/eventService';
import { saveOffer } from '../../services/offerService';
import OfferCard from './OfferCard';
import moment from 'moment';
import { toast } from 'react-toastify';
import auth from '../../services/authService';

class OneEvent extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				_id: '',
				name: '',
				city: '',
				venue: '',
				genre: '',
				date: '',
				description: '',
				photo: ''
			}
		};
	}

	async populateEvent() {
		try {
			const eventId = this.props.match.params.id;
			const { data: event } = await getEvent(eventId);
			this.setState({ data: event });
			console.log(event);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}

	async componentDidMount() {
		await this.populateEvent();
		const user = auth.getCurrentUser();
		this.setState({ user });
		console.log(this.props.location);
	}
	render() {
		const {
			_id,
			name,
			city,
			venue,
			genre,
			date,
			description,
			offers
		} = this.state.data;
		return (
			<div className="bg-light text-dark">
				<h1 className="text-center py-3">{this.state.data.name}</h1>
				<div className="row">
					<div className="col-md-3">
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<img
									src="http://via.placeholder.com/200x200"
									alt="Concert card image"
								/>
							</li>
							<li className="list-group-item list-group-item-primary">
								{name}
							</li>
							<li className="list-group-item">
								{moment(date).format('DD/MM/YYYY')}
							</li>
							<li className="list-group-item">{city}</li>
							<li className="list-group-item">{venue}</li>
							<li className="list-group-item list-group-item-light">
								{description}
							</li>
						</ul>
					</div>
					<div className="col-md-9">
						<Link to={`${this.props.location.pathname}/addOffer/new`}>
							<button
								type="button"
								className="btn btn-outline-primary btn-lg btn-block"
							>
								Add Offer
							</button>
						</Link>
						<div className="row">
							{offers &&
								offers.map((offer, i) => (
									<div className="col-md-6" key={i}>
										<OfferCard key={i} owner={offer.ownerId} {...offer} />
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

OneEvent.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	match: ReactRouterPropTypes.match.isRequired
};

export default OneEvent;
