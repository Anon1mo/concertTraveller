import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDateToString } from '../../utils/formatDate';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { deleteOffer } from '../../services/offerService';
import Table from '../common/table';

class OffersTable extends Component {
	columns = [
		{
			path: 'name',
			label: 'Name',
			content: offer => (
				<Link to={`/events/${offer.eventId}/offers/${offer._id}`}>
					{offer.name}
				</Link>
			)
		},
		{ path: 'date', label: 'Date' },
		{ path: 'city', label: 'City' },
		{ path: 'type', label: 'Type' }
	];

	createdByColumn = {
		path: 'createdBy',
		label: 'Created by',
		content: offer => (
			<Link to={`/users/${offer.userId}`}>{offer.username}</Link>
		)
	};

	editDeleteColumns = [
		{
			key: 'edit',
			content: offer => (
				<Link to={`/events/${offer.eventId}/addOffer/${offer._id}`}>
					<button className="btn btn-primary btn-sm">Edit</button>
				</Link>
			)
		},
		{
			key: 'delete',
			content: offer => (
				<button
					onClick={() => this.handleDelete(offer)}
					className="btn btn-danger btn-sm"
				>
					Delete
				</button>
			)
		}
	];

	constructor() {
		super();
		this.state = {
			offers: null,
			sortColumn: { path: 'name', order: 'asc' }
		};
	}

	async componentDidMount() {
		if (this.props.isOwnerTable) {
			this.columns = this.columns.concat(this.editDeleteColumns);
		} else {
			this.columns.push(this.createdByColumn);
		}

		let { data: offers } = await this.props.getOffers();
		offers = this.mapToViewModel(offers);
		offers = formatDateToString(offers);
		this.setState({ offers });
	}

	mapToViewModel(offers) {
		return offers.map(offer => ({
			_id: offer._id,
			name: offer.eventId.name,
			date: offer.eventId.date,
			city: offer.eventId.city,
			type: offer.type,
			createdBy: offer.ownerId.username,
			eventId: offer.eventId._id,
			userId: offer.ownerId._id,
			username: offer.ownerId.username
		}));
	}

	handleSort = sortColumn => {
		const { offers } = this.state;
		const sorted = _.orderBy(offers, [sortColumn.path], [sortColumn.order]);
		this.setState({ sortColumn, offers: sorted });
	};

	async handleDelete(offer) {
		const originalOffers = this.state.offers;
		const offers = originalOffers.filter(o => o._id !== offer._id);
		this.setState({ offers });
		try {
			await deleteOffer(offer._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				toast.error('This offer has already been deleted.');

			this.setState({ offers: originalOffers });
		}
	}

	render() {
		const { sortColumn, offers } = this.state;
		if (offers && offers.length === 0) {
			return (
				<h2 className="text-muted">
					You have not created nor joined any offers
				</h2>
			);
		}
		return (
			<Table
				columns={this.columns}
				data={offers}
				sortColumn={sortColumn}
				onSort={this.handleSort}
			/>
		);
	}
}

OffersTable.propTypes = {
	getOffers: PropTypes.func,
	isOwnerTable: PropTypes.bool
};

export default OffersTable;
