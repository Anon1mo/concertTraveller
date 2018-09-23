import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../../services/eventService';
import Table from '../common/table';
import _ from 'lodash';
import moment from 'moment';

class EventsTable extends Component {
	columns = [
		{
			path: 'name',
			label: 'Name',
			content: event => <Link to={`/events/${event._id}`}>{event.name}</Link>
		},
		{
			path: 'date',
			label: 'Date'
		},
		{
			path: 'genre',
			label: 'Genre'
		},
		{
			path: 'city',
			label: 'City'
		},
		{
			path: 'venue',
			label: 'Venue'
		},
		{
			key: 'edit',
			content: event => (
				<Link to={`/events/addEvent/${event._id}`}>
					<button className="btn btn-primary">Edit</button>
				</Link>
			)
		},
		{
			key: 'delete',
			content: event => (
				<button
					onClick={() => this.handleDelete(event)}
					className="btn btn-danger"
				>
					Delete
				</button>
			)
		}
	];

	constructor() {
		super();
		this.state = {
			events: null,
			sortColumn: { path: 'name', order: 'asc' }
		};
	}

	async componentDidMount() {
		let { data: events } = await getEvents();
		events = this.mapDateToMoment(events);
		this.setState({ events });
	}

	handleSort = sortColumn => {
		const { events } = this.state;
		const sorted = _.orderBy(events, [sortColumn.path], [sortColumn.order]);
		this.setState({ sortColumn, events: sorted });
	};

	async handleDelete(event) {
		const originalEvents = this.state.events;
		const events = originalEvents.filter(e => e._id !== event._id);
		this.setState({ events });
		try {
			await deleteEvent(event._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				toast.error('This event has already been deleted.');

			this.setState({ events: originalEvents });
		}
	}

	mapDateToMoment(data) {
		return data.map(el => {
			el.date = moment(el.date).format('YYYY-MM-DD');
			return el;
		});
	}

	render() {
		const { sortColumn, events } = this.state;
		return (
			<Table
				columns={this.columns}
				data={events}
				sortColumn={sortColumn}
				onSort={this.handleSort}
			/>
		);
	}
}

EventsTable.propTypes = {};

export default EventsTable;
