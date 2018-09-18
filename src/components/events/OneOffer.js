import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { getOffer } from '../../services/offerService';

class OneOffer extends Component {
	state = {
		data: {
			ownerId: '',
			eventId: '',
			type: '',
			description: '',
			maxNumUsers: ''
		}
	};

	async componentDidMount() {
		const { data: offer } = await getOffer(this.props.match.params.offerId);
		this.setState({ data: offer });
		console.log(offer);
	}
	render() {
		const {
			type,
			ownerId: { username },
			eventId: { name },
			eventId: { city },
			users,
			maxNumUsers,
			description
		} = this.state.data;
		const usedPlaces =
			users &&
			users.reduce(acc => {
				acc = acc + 1;
				return acc;
			}, 0);
		return (
			<div className="row my-3">
				<div className="col-md-7">
					<ul className="list-group">
						<li className="list-group-item active text-center">
							<strong>{type}</strong>
						</li>
						<li className="list-group-item list-group-item-light d-flex justify-content-between">
							<div>Event</div>
							<div className="mx-auto text-dark">
								{name} in {city}{' '}
							</div>
						</li>
						<li className="list-group-item list-group-item-light d-flex justify-content-between">
							<div>Reserved places</div>
							<div className="text-dark">
								{usedPlaces} / {maxNumUsers}
							</div>
						</li>
						<li className="list-group-item list-group-item-light d-flex justify-content-between">
							<div>Created by</div>
							<div className="text-dark">{username}</div>
						</li>
						<li className="list-group-item list-group-item-dark d-flex">
							<div className="text-white">Description</div>
							<div className="ml-3">{description}</div>
						</li>
						<li className="list-group-item">
							<button className="btn btn-success btn-lg btn-block">Join</button>{' '}
						</li>
					</ul>
				</div>
				<div className="col-md-5">
					<ul className="list-group">
						<li className="list-group-item list-group-item-dark">Chat</li>
						<li className="list-group-item h-50">
							<div className="row mb-2">
								<div className="col-md-2">Janusz</div>
								<div className="col-md-5 bg-secondary text-white rounded">
									Jakas wiadomosc
								</div>
							</div>
							<div className="row">
								<div className="col-md-2 ml-auto">Topek</div>
								<div className="col-md-5 bg-info text-white">
									jakas wiadomosc dluzsza
								</div>
							</div>
						</li>
						<li className="list-group-item p-0">
							<div className="input-group rounded-0">
								<input
									type="text"
									className="form-control"
									placeholder="Recipient's username"
								/>
								<div className="input-group-append">
									<button type="button" className="btn btn-success">
										Send
									</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default OneOffer;

OneOffer.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	match: ReactRouterPropTypes.match.isRequired
};
