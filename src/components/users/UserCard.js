import React from 'react';
import PropTypes from 'prop-types';

const UserCard = ({ user, imgLink }) => {
	return (
		<div className="card w-25 mx-auto">
			<img className="card-img-top" src={imgLink} alt="Card image cap" />
			<div className="card-body text-white bg-info">
				<h5 className="card-title text-center">{user.username}</h5>
			</div>
			<ul className="list-group list-group-flush">
				<li className="list-group-item text-center">{user.age} years old</li>
			</ul>
		</div>
	);
};

UserCard.propTypes = {
	user: PropTypes.object,
	imgLink: PropTypes.string
};
UserCard.defaultProps = {
	imgLink: 'http://via.placeholder.com/200x200'
};

export default UserCard;
