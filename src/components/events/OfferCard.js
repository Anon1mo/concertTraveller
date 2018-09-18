import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OfferCard = ({ owner, type, users, maxNumUsers, eventId, _id }) => {
	const usedPlaces = users.reduce(acc => {
		acc = acc + 1;
		return acc;
	}, 0);
	return (
		<ul className="list-group my-3">
			<li className="list-group-item list-group-item-info text-center">
				<strong>{type}</strong>
			</li>
			<li className="list-group-item d-flex">
				<i className="fa fa-user fa-2x pr-2" />
				<div className="list-group__div--profile">
					<p>{owner.username}</p>
					<p>{owner.age} lat</p>
				</div>
				<span className="ml-auto align-self-center">
					{usedPlaces} / {maxNumUsers} used places
				</span>
			</li>
			<li className="list-group-item p-0">
				<Link to={`/events/${eventId}/offers/${_id}`}>
					<button type="button" className="btn btn-primary btn-lg btn-block">
						Go to offer
					</button>
				</Link>
			</li>
		</ul>
	);
};

export default OfferCard;

OfferCard.propTypes = {
	_id: PropTypes.string,
	eventId: PropTypes.string,
	owner: PropTypes.object,
	users: PropTypes.array,
	type: PropTypes.string,
	maxNumUsers: PropTypes.number
};
