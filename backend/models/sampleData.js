const {Event} = require('./event');

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
	},
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
		Event.findOneAndUpdate(event, event, {upsert: true})
			.then(doc => console.log(doc))
			.catch(err => console.log(err));
	});
};
