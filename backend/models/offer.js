const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { User } = require('./user');
const { Event } = require('./event');

const Schema = mongoose.Schema;

const Message = new Schema({
	username: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
});

const enumTypes = ['Ride', 'Meeting'];

const offerSchema = new Schema({
	ownerId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	eventId: {
		type: Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	},
	type: {
		type: String,
		enum: enumTypes,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	maxNumUsers: {
		type: Number,
		min: 1,
		max: 64,
		required: true
	},
	users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	chat: [{ type: Message }]
});

offerSchema.pre('remove', async function (next) {
	let users = await User.find({offers: this._id});
	users = users.map(user => {
		user.offers = user.offers.filter(offer => !offer.equals(this._id));
		return user;
	});

	Promise.all(users.map(user => user.save()))
		.catch(err => console.log(err));


	await Event.update(
		{offers: this._id},
		{$pull: {offers: this._id}}
	);

	next();
});

const Offer = mongoose.model('Offer', offerSchema);

function validateOffer(offer) {
	const schema = {
		ownerId: Joi.objectId().required(),
		eventId: Joi.objectId().required(),
		type: Joi.string().valid(enumTypes).required(),
		description: Joi.string().required(),
		maxNumUsers: Joi.number().integer().min(1).max(64).required()
	};

	return Joi.validate(offer, schema);
}

exports.Offer = Offer;
exports.validate = validateOffer;


