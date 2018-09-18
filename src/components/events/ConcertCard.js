import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

const ConcertCard = props => {
	const { _id, name, city, venue, date } = props;

	return (
		<div className="card">
			<div className="container__card--img">
				<img
					className="card-img-top"
					src="http://via.placeholder.com/50x50"
					alt="Concert card image"
				/>
				<div className="container_card--div">
					{moment(date).format('DD/MM/YYYY')}
				</div>
			</div>
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
				<p className="card-text">
					<b>{venue}</b>, {city}
				</p>
				<Link
					to={`events/${_id}`}
					className="btn btn-block btn-primary text-center"
				>
					Show event
				</Link>
			</div>
		</div>
	);
};

ConcertCard.propTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	city: PropTypes.string,
	venue: PropTypes.string,
	date: PropTypes.object
};

export default ConcertCard;
