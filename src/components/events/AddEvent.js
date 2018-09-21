import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import AddOffer from './AddOffer';
import Joi from 'joi-browser';
import Form from '../common/form';
import { getEvent, saveEvent } from '../../services/eventService';

class AddEvent extends Form {
	constructor() {
		super();
		this.state = {
			data: {
				name: '',
				city: '',
				venue: '',
				genre: '',
				date: '',
				description: ''
			},
			errors: {}
		};
	}

	schema = {
		name: Joi.string()
			.min(5)
			.max(50)
			.required(),
		city: Joi.string()
			.min(5)
			.max(50)
			.required(),
		venue: Joi.string()
			.min(5)
			.max(50)
			.required(),
		genre: Joi.string()
			.min(5)
			.max(20)
			.required(),
		date: Joi.date()
			.format('YYYY-MM-DD')
			.required(),
		description: Joi.string().max(255)
	};

	async populateEvent() {
		try {
			const eventId = this.props.match.params.id;
			if (eventId === 'new') return;

			const { data: event } = await getEvent(eventId);
			this.setState({ data: this.mapToViewModel(event) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace('/not-found');
		}
	}

	async componentDidMount() {
		await this.populateEvent();
	}

	mapToViewModel(event) {
		return {
			_id: event._id,
			name: event.name,
			city: event.city,
			venue: event.venue,
			genre: event.genre,
			date: event.date,
			description: event.description
		};
	}

	async doSubmit() {
		await saveEvent(this.state.data);

		this.props.history.push('/events');
	}
	render() {
		return (
			<div>
				<h1>Event Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('name', 'Name')}
					{this.renderInput('genre', 'Genre')}
					{this.renderInput('venue', 'Venue')}
					{this.renderInput('city', 'City')}
					{this.renderInput('date', 'Date', 'date')}
					{this.renderInput('description', 'Description')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

AddEvent.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	location: ReactRouterPropTypes.location.isRequired,
	match: ReactRouterPropTypes.match.isRequired
};

export default AddEvent;
