const validateObjectId = require('../middleware/validateObjectId');
const { Event, validate } = require('../models/event');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

//@TODO
// check :id if it's valid

router.get('/', async (req, res) => {
	const events = await Event.find().sort('name');

	res.send(events);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let event = new Event({
		name: req.body.name,
		city: req.body.city,
		venue: req.body.venue,
		genre: req.body.genre,
		date: req.body.date,
		description: req.body.description
	});

	event = await event.save();

	res.send(event);
});

router.put('/:id', validateObjectId, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const event = await Event.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			city: req.body.city,
			venue: req.body.venue,
			genre: req.body.genre,
			date: req.body.date,
			description: req.body.description
		},
		{ new: true }
	);

	if (!event)
		return res.status(404).send('The event with given ID was not found');

	res.send(event);
});

router.delete('/:id', validateObjectId, async (req, res) => {
	const event = await Event.findByIdAndRemove(req.params.id);

	if (!event)
		return res.status(404).send('The event with the given ID was not found.');

	res.send(event);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const event = await Event.findById(req.params.id).populate('offers');

	let promises = event.offers.map(
		async offer => await User.findOne({ _id: offer.ownerId })
	);

	console.log(promises);
	let offers = await Promise.all(promises);

	console.log(offers);
	event.offers.map((offer, i) => {
		offer.ownerId = offers[i];
		return offer;
	});

	if (!event)
		return res.status(404).send('The event with the given ID was not found');

	res.send(event);
});

module.exports = router;
