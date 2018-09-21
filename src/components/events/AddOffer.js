import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import Form from '../common/form';
import { getOffer, saveOffer } from '../../services/offerService';
import auth from '../../services/authService';

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

	async populateOffer() {
		try {
			const offerId = this.props.match.params.offerId;
			if (offerId === 'new') {
				return;
			}

			const { data: offer } = await getOffer(offerId);
			this.setState({ data: this.mapToViewModel(offer) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}

	async componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState(prevState => ({
			user,
			data: {
				...prevState.data,
				ownerId: user._id,
				eventId: this.props.match.params.eventId
			}
		}));
		await this.populateOffer();
	}

	mapToViewModel(offer) {
		return {
			_id: offer._id,
			ownerId: offer.ownerId,
			eventId: offer.eventId,
			type: offer.type,
			description: offer.description,
			maxNumUsers: offer.maxNumUsers
		};
	}

	async doSubmit() {
		await saveOffer(this.state.data);

		this.props.history.push(`/events/${this.props.match.params.eventId}`);
	}

	render() {
		return (
			<div>
				<h1>Add Offer</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderSelect('type', 'Type', this.state.types)}
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
