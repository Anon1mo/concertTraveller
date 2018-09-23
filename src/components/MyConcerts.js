import React from 'react';
import OffersTable from './events/OffersTable';
import { getOwnerOffers, getUserOffers } from '../services/offerService';
import auth from '../services/authService';

const MyConcerts = () => {
	const user = auth.getCurrentUser();
	return (
		<div>
			<h1 className="text-center py-2">My Concerts</h1>
			<div className="row">
				<div className="col-md-6 border-right">
					<h3>Created offers</h3>
					<OffersTable
						isOwnerTable={true}
						getOffers={() => getOwnerOffers(user._id)}
					/>
				</div>
				<div className="col-md-6">
					<h3>Joined offers</h3>
					<OffersTable
						isOwnerTable={false}
						getOffers={() => getUserOffers(user._id)}
					/>
				</div>
			</div>
		</div>
	);
};

export default MyConcerts;
