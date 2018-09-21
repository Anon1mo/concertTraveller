import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Chat from './Chat';
import { toast } from 'react-toastify';
import { getOffer, joinOffer, leaveOffer } from '../../services/offerService';
import auth from '../../services/authService';

class OneOffer extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				ownerId: '',
				eventId: '',
				type: '',
				description: '',
				maxNumUsers: ''
			},
			user: null
		};
		this.onJoin = this.onJoin.bind(this);
		this.onLeave = this.onLeave.bind(this);
	}
	async componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });

		const { data: offer } = await getOffer(this.props.match.params.offerId);
		this.setState({ data: offer });
		console.log(offer);
	}

	async onJoin() {
		const { data } = this.state;
		try {
			await joinOffer(this.state.data._id);
			data.users.push(this.state.user);
			this.setState({ data });
			toast.success('You successfully joined the offer');
		} catch (ex) {
			console.log(ex);
		}
	}

	async onLeave() {
		const { data } = this.state;
		try {
			await leaveOffer(this.state.data._id);
			data.users = data.users.filter(user => user._id !== this.state.user._id);
			this.setState(data);
			toast.success('You successfully left the offer');
		} catch (ex) {
			console.log(ex);
		}
	}

	render() {
		const {
			_id: offerId,
			type,
			ownerId: { username },
			eventId: { name },
			eventId: { city },
			users,
			maxNumUsers,
			description,
			chat
		} = this.state.data;
		const { user } = this.state;
		const isUserJoined =
			user && users && users.some(oneUser => oneUser._id === user._id);
		console.log(isUserJoined);
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
						<li className="list-group-item list-group-item-light d-flex flex-column">
							<span className="border-bottom border-primary">Participants</span>
							{users &&
								users.map((user, i) => (
									<div key={i}>
										<img
											className="mt-2 mr-2"
											src="http://via.placeholder.com/50x50"
											alt="Concert card image"
											width="50"
											height="50"
										/>
										<p className="d-inline-block align-bottom">
											{user.username}, {user.age} years old
										</p>
									</div>
								))}
						</li>
						<li className="list-group-item">
							{!isUserJoined && (
								<button
									onClick={this.onJoin}
									className="btn btn-success btn-lg btn-block"
								>
									Join
								</button>
							)}
							{isUserJoined && (
								<button
									onClick={this.onLeave}
									className="btn btn-danger btn-lg btn-block"
								>
									Leave
								</button>
							)}
						</li>
					</ul>
				</div>
				<div className="col-md-5">
					{offerId &&
						isUserJoined && <Chat messages={chat} offerId={offerId} />}
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
