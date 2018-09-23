import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Joi from 'joi-browser';
import Form from '../common/form';
import { getEvent, saveEvent } from '../../services/eventService';
import { formatDateToString } from '../../utils/formatDate';
import { Toast as toast } from 'react-toastify';

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
		_id: Joi.string(),
		name: Joi.string()
			.min(1)
			.max(50)
			.required(),
		city: Joi.string()
			.min(1)
			.max(50)
			.required(),
		venue: Joi.string()
			.min(1)
			.max(50)
			.required(),
		genre: Joi.string()
			.max(20)
			.required(),
		date: Joi.date().required(),
		description: Joi.string().max(255)
	};

	async populateEvent() {
		try {
			const eventId = this.props.match.params.id;
			if (eventId === 'new') {
				this.setState({ eventId });
				return;
			}

			let { data: event } = await getEvent(eventId);
			event = formatDateToString(event);
			this.setState({ data: this.mapToViewModel(event), eventId });
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
		try {
			await saveEvent(this.state.data);
		} catch (ex) {
			toast.error(ex.response.data);
		}

		this.props.history.goBack();
		//this.props.history.push('/events');
	}
	render() {
		const headerText =
			this.state.eventId === 'new' ? 'Add Event' : 'Edit Event';
		return (
			<div className="w-50 mx-auto bg-light text-dark">
				<h1 className="text-center py-2">{headerText}</h1>
				<form onSubmit={this.handleSubmit} className="p-3">
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
