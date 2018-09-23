import React, { Component } from 'react';
import DatePick from './DatePick';
import ConcertSearchbar from './ConcertSearchbar';
import ConcertGenreSelect from './ConcertGenreSelect';
import ConcertCard from './ConcertCard';
import Pagination from './Pagination';
import { getEvents } from '../../services/eventService';
import { paginate } from '../../utils/paginate';
import moment from 'moment';

// let events = [
// 	{
// 		name: 'Radiohead',
// 		location: 'Berlin',
// 		venue: 'Tempodrom',
// 		date: moment('2018-07-07'),
// 		description: 'najlepszy band',
// 		genre: 'alternative'
// 	},
// 	{
// 		name: 'Beach House',
// 		location: 'Berlin',
// 		venue: 'Huxleys Neue Welt',
// 		date: moment('2018-10-14'),
// 		description: 'Bicz Haus',
// 		genre: 'dreampop'
// 	},
// 	{
// 		name: 'Mac DeMarco',
// 		location: 'Warsaw',
// 		venue: 'Proxima',
// 		date: moment('2018-11-22'),
// 		description: 'Mak i jego chlopaki',
// 		genre: 'indie'
// 	},
// 	{
// 		name: 'Tame Impala',
// 		location: 'Berlin',
// 		venue: 'Tempodrom',
// 		date: moment('2018-07-07'),
// 		description: 'najlepszy band',
// 		genre: 'alternative'
// 	},
// 	{
// 		name: 'Snail Mail',
// 		location: 'Berlin',
// 		venue: 'Huxleys Neue Welt',
// 		date: moment('2018-10-14'),
// 		description: 'Bicz Haus',
// 		genre: 'dreampop'
// 	},
// 	{
// 		name: 'LCD Soundsystem',
// 		location: 'Warsaw',
// 		venue: 'Proxima',
// 		date: moment('2018-11-22'),
// 		description: 'Mak i jego chlopaki',
// 		genre: 'indie'
// 	}
// ];

class Events extends Component {
	state = {
		events: [],
		genres: [],
		filterSearch: '',
		filterGenre: '',
		filterDate: '',
		currentPage: 1,
		eventsPerPage: 4
	};

	async componentDidMount() {
		let { data: events } = await getEvents();
		const genres = this.getGenres(events);
		events = this.mapDateToMoment(events);
		this.setState({ events, genres });
	}

	getGenres = events =>
		events.reduce((prev, next) => {
			if (prev.includes(next.genre)) {
				return prev;
			} else {
				return [...prev, next.genre];
			}
		}, []);

	mapDateToMoment(data) {
		return data.map(el => {
			el.date = moment(el.date);
			return el;
		});
	}

	onFilterSearchChange = event => {
		this.setState({
			filterSearch: event.target.value.trim(),
			currentPage: 1
		});
	};

	onFilterGenreChange = event => {
		this.setState({
			filterGenre: event.target.value.trim(),
			currentPage: 1
		});
	};

	onDateChange = date => {
		console.log(date);
		this.setState({
			filterDate: date,
			currentPage: 1
		});
	};

	handlePaginationClick = event => {
		event.currentTarget.parentNode
			.getElementsByClassName('active')[0]
			.classList.remove('active');
		event.currentTarget.classList.add('active');
		this.setState({
			currentPage: Number(event.currentTarget.dataset.value)
		});
	};

	handlePaginationPrev = () => {
		if (this.state.currentPage === 1) {
			return;
		}
		this.setState(prevState => ({
			currentPage: prevState.currentPage - 1
		}));
		console.log(this.state.currentPage);
	};

	handlePaginationNext = lastPage => {
		if (this.state.currentPage === lastPage) {
			return;
		}
		this.setState(prevState => ({
			currentPage: prevState.currentPage + 1
		}));
		console.log(this.state.currentPage);
	};

	getPagedEvents = () => {
		let filteredEvents = this.state.events
			? this.state.events
					.filter(event =>
						event.genre
							.toLowerCase()
							.includes(this.state.filterGenre.toLowerCase())
					)
					.filter(event =>
						event.date.format('YYYY-MM-DD').includes(this.state.filterDate)
					)
					.filter(event =>
						event.name
							.toLowerCase()
							.includes(this.state.filterSearch.toLowerCase())
					)
			: [];

		if (filteredEvents.length !== 0) {
			const paginatedEvents = paginate(
				filteredEvents,
				this.state.currentPage,
				this.state.eventsPerPage
			);
			return {
				events: paginatedEvents,
				eventsCount: filteredEvents.length
			};
		} else {
			return {
				events: filteredEvents,
				eventsCount: filteredEvents.length
			};
		}
	};

	render() {
		let { eventsCount, events: eventsToRender } = this.getPagedEvents();
		return (
			<main className="container">
				<h1 className="text-center">Events</h1>
				<div className="form-group row">
					<div className="col-md-6">
						<ConcertSearchbar onChange={this.onFilterSearchChange} />
					</div>
					<div className="col-md-3 ml-auto">
						<ConcertGenreSelect
							genres={this.state.genres}
							onChange={this.onFilterGenreChange}
						/>
					</div>
					<DatePick onChangeParent={this.onDateChange} />
				</div>
				<div className="row">
					{eventsToRender.length === 0 && (
						<h2 className="text-muted">No events with these specifications</h2>
					)}
					{eventsToRender.map((event, i) => (
						<div className="col-md-3" key={i}>
							<ConcertCard key={i} {...event} />
						</div>
					))}
				</div>
				<Pagination
					onClick={this.handlePaginationClick}
					onPrev={this.handlePaginationPrev}
					onNext={this.handlePaginationNext}
					currentPage={this.state.currentPage}
					eventsPerPage={this.state.eventsPerPage}
					eventsCount={eventsCount}
				/>
			</main>
		);
	}
}

export default Events;
