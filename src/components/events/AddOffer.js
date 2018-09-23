import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Joi from 'joi-browser';
import Form from '../common/form';
import { getOffer, saveOffer } from '../../services/offerService';
import auth from '../../services/authService';
import { Toast as toast } from 'react-toastify';

class AddOffer extends Form {
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
			types: ['Ride', 'Meeting'],
			errors: {}
		};
	}

	schema = {
		_id: Joi.string(),
		ownerId: Joi.string()
			.required()
			.label('Owner Id'),
		eventId: Joi.string()
			.required()
			.label('Event Id'),
		type: Joi.string()
			.required()
			.label('Type'),
		description: Joi.string()
			.required()
			.label('Description'),
		maxNumUsers: Joi.number()
			.required()
			.min(1)
			.max(64)
			.label('Maximum number of users')
	};

	async populateOffer(user) {
		try {
			const offerId = this.props.match.params.offerId;
			if (offerId === 'new') {
				this.setState(prevState => ({
					user,
					data: {
						...prevState.data,
						ownerId: user._id,
						eventId: this.props.match.params.eventId
					}
				}));

				return;
			}

			const { data: offer } = await getOffer(offerId);
			this.setState({ data: this.mapToViewModel(offer), user });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}

	async componentDidMount() {
		const user = auth.getCurrentUser();
		await this.populateOffer(user);
	}

	mapToViewModel(offer) {
		return {
			_id: offer._id,
			ownerId: offer.ownerId._id,
			eventId: offer.eventId._id,
			type: offer.type,
			description: offer.description,
			maxNumUsers: offer.maxNumUsers
		};
	}

	async doSubmit() {
		try {
			await saveOffer(this.state.data);
		} catch (ex) {
			toast.error(ex.response.data);
		}

		this.props.history.push(`/events/${this.props.match.params.eventId}`);
	}

	render() {
		const {
			data: { ownerId },
			user
		} = this.state;
		const headerText =
			this.state.eventId === 'new' ? 'Add Offer' : 'Edit Offer';
		const newOffer = this.props.match.params.offerId === 'new';
		if (!newOffer && user && ownerId !== user._id) {
			this.props.history.push('/events');
		}
		return (
			<div className="w-50 mx-auto bg-light text-dark">
				<h1 className="text-center py-2">{headerText}</h1>
				<form onSubmit={this.handleSubmit} className="p-3">
					{newOffer && this.renderSelect('type', 'Type', this.state.types)}
					{this.renderInput('maxNumUsers', 'Maximum number of users', 'number')}
					{this.renderInput('description', 'Description')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

AddOffer.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	match: ReactRouterPropTypes.match.isRequired
};

export default AddOffer;
