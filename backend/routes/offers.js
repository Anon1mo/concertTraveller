const validateObjectId = require('../middleware/validateObjectId');
const { Offer, validate } = require('../models/offer');
const { Event } = require('../models/event');
const { User } = require('../models/user');
const { Message, validateMessage } = require('../models/message');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
// TODO get all the offers when the user is an owner
async function getOffers(target, id) {
	target = target === 'event' ? 'eventId' : 'users';
	const offers = await Offer.find({ [target]: id })
		.populate('ownerId')
		.populate('eventId')
		.populate('users');

	return offers;
}

// getting all the offers
router.get('/', async (req, res) => {
	let offers;
	if (req.query.userId) {
		offers = await Offer.find({ users: req.params.userId })
			.populate('ownerId')
			.populate('eventId')
			.populate('users');
	} else if (req.query.eventId) {
		offers = await Offer.find({ eventId: req.params.eventId })
			.populate('ownerId')
			.populate('eventId')
			.populate('users');
	} else {
		offers = await Offer.find()
			.populate('ownerId')
			.populate('eventId')
			.populate('users');
	}

	res.send(offers);
});

// adding new offer
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let newOffer = new Offer({
		ownerId: req.body.ownerId,
		eventId: req.body.eventId,
		type: req.body.type,
		description: req.body.description,
		maxNumUsers: Number(req.body.maxNumUsers)
	});

	newOffer = await newOffer.save();

	let relatedEvent = await Event.findById(newOffer.eventId);
	relatedEvent.offers.push(newOffer._id);
	await relatedEvent.save();

	let relatedUser = await User.findById(newOffer.ownerId);
	relatedUser.offers.push(newOffer._id);
	await relatedUser.save();

	res.send(newOffer);
});

// updating offer with given id
router.put('/:id', validateObjectId, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const offer = await Offer.findByIdAndUpdate(
		req.params.id,
		{
			description: req.body.description,
			maxNumUsers: Number(req.body.maxNumUsers)
		},
		{ new: true }
	);

	if (!offer)
		return res.status(404).send('The offer with the given ID was not found');

	res.send(offer);
});

// getting the offer with given id
router.get('/:id', validateObjectId, async (req, res) => {
	const offer = await Offer.findById(req.params.id)
		.populate('ownerId')
		.populate('eventId')
		.populate('users');

	if (!offer)
		return res.status(404).send('The offer with the given ID was not found');

	res.send(offer);
});

// deleting the offer with given id
router.delete('/:id', validateObjectId, async (req, res) => {
	const offer = await Offer.findByIdAndRemove(req.params.id);

	if (!offer)
		return res.status(404).send('The offer with the given ID was not found');
	await offer.remove();

	res.send(offer);
});

// joining the offer with given id
router.put('/:id/join', [auth, validateObjectId], async (req, res) => {
	const offer = await Offer.findById(req.params.id);

	if (!offer)
		return res.status(404).send('The offer with the given ID was not found');
	if (req.user._id === offer.ownerId)
		return res
			.status(403)
			.send('You cannot join, because you created this event');
	if (offer.users.some(user => user.equals(req.user._id))) {
		res.status(403).send('You are already registered to the event');
	} else {
		offer.users.push(req.user._id);
		await offer.save();

		await User.update({ _id: req.user._id }, { $push: { offers: offer._id } });

		res.send('You have successfully joined the offer');
	}
});

// leaving the offer with given id
router.put('/:id/leave', [auth], async (req, res) => {
	const offer = await Offer.findById(req.params.id);

	if (!offer)
		return res.status(404).send('The offer with the given ID was not found');

	if (offer.users.some(user => user.equals(req.user._id))) {
		offer.users = offer.users.filter(user => !user.equals(req.user._id));
		await offer.save();

		await User.update({ _id: req.user._id }, { $pull: { offers: offer._id } });

		res.send('You have successfully left the offer');
	} else {
		res.status(403).send('You are not registered to this event');
	}
});

// get all the offers for the given user
router.get('/user/:userId', async (req, res) => {
	const offers = await Offer.find({ users: req.params.userId })
		.populate('ownerId')
		.populate('eventId')
		.populate('users');

	if (offers.length === 0)
		return res.status(404).send('The offers for the given user were not found');

	res.send(offers);
});

// get all the offers for the given event
router.get('/event/:eventId', async (req, res) => {
	const offers = await Offer.find({ eventId: req.params.eventId })
		.populate('ownerId')
		.populate('eventId')
		.populate('users');

	if (offers.length === 0)
		return res
			.status(404)
			.send('The offers for the given event were not found');

	res.send(offers);
});

// send message
router.post('/:id/message', [validateObjectId, auth], async (req, res) => {
	const { error } = validateMessage(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const message = {
		username: req.body.username,
		message: req.body.message
	};

	console.log(message);

	const offer = await Offer.findById(req.params.id);
	if (!offer)
		return res.status(404).send('The offer with the given ID was not found');

	offer.chat.push(message);
	await offer.save();

	res.send(message);
});

module.exports = router;
