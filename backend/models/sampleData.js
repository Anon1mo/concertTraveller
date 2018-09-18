const mongoose = require('mongoose');
const { Event } = require('./event');
const { Offer } = require('./offer');
const { User } = require('./user');

const arrayOfEvents = [
	{
		name: 'Radiohead',
		city: 'Berlin',
		venue: 'Tempodrom',
		genre: 'alternative',
		date: new Date('2019-07-07'),
		description: 'Radiohead na jedynym koncercie'
	},
	{
		name: 'Beach House',
		city: 'Berlin',
		venue: 'Huxleys Neue Welt',
		genre: 'dreampop',
		date: new Date('2019-11-10'),
		description: 'Beach House z nowa plyta'
	},
	{
		name: 'Mac DeMarco',
		city: 'Warsaw',
		venue: 'Progresja',
		genre: 'indie',
		date: new Date('2019-10-22'),
		description: 'Pierwszy klubowy koncert w Polsce'
	},
	{
		name: 'David Byrne',
		city: 'Berlin',
		venue: 'Tempodrom',
		genre: 'alternative',
		date: new Date('2019-08-11'),
		description: 'David Byrne pierwszy raz od 15 lat'
	},
	{
		name: 'Grizzly Bear',
		city: 'Katowice',
		venue: 'Off Festival',
		genre: 'alternative',
		date: new Date('2019-08-11'),
		description: 'Pierwszy raz w Polsce'
	},
	{
		name: 'Phoebe Bridgers',
		city: 'Berlin',
		venue: 'Kantine am Berghain',
		genre: 'dreampop',
		date: new Date('2019-08-11'),
		description: 'Koncert z nowa plyta'
	},
	{
		name: 'Jon Hopkins',
		city: 'Katowice',
		venue: 'Off Festival',
		genre: 'alternative',
		date: new Date('2019-08-11'),
		description: 'Nowa plyta'
	}
];

module.exports = function() {
	// insert jednego elementu

	// const event = new Event(oneEvent);
	// event.save()
	// 	.then(event => console.log(event))
	// 	.catch(err => console.log(err));

	// metoda insertMany - insert danych za jednym zamachem

	// Event.insertMany(arrayOfEvents, function(err, docs) {
	// 	if(err) {
	// 		console.log(err);
	// 	}
	// 	console.log(docs);
	// });
	arrayOfEvents.map(event => {
		Event.findOneAndUpdate(event, event, { upsert: true })
			.then(doc => console.log(doc))
			.catch(err => console.log(err));
	});

	const addEvent = false;

	if (addEvent) {
		Event.findOne({ name: 'Beach House' })
			.then(event => {
				const eventId = event._id;
				const offerId = mongoose.Types.ObjectId();
				const ownerId = '5b4e0c42c05fa607fe855261';

				let newOffer = new Offer({
					_id: offerId,
					ownerId: ownerId,
					eventId: eventId,
					type: 'Ride',
					description: 'Fajny wyjazd',
					maxNumUsers: 4
				});
				newOffer.save().catch(err => console.log(err));

				event.offers.push(offerId);
				event.save().catch(err => console.log(err));

				User.findById(ownerId).then(user => {
					user.offers.push(offerId);
					user.save().catch(err => console.log(err));
				});
			})
			.catch(err => console.log(err));
	}
};
