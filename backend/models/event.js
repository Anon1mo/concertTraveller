const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	},
	city: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	},
	venue: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	},
	genre: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 20
	},
	date: {
		type: Date,
		required: true,
		validate: {
			validator: function(v) {
				return new Date() < v
			},
			message: 'Event should take place in the future'
		}
	},
	description: {
		type: String,
		maxlength: 255
	},
	photo: {
		type: String,
		maxlength: 255
	},
	offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer'}]
}));

function validateEvent(event) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		city: Joi.string().min(5).max(50).required(),
		venue: Joi.string().min(5).max(50).required(),
		genre: Joi.string().min(5).max(20).required(),
		date: Joi.date().format('YYYY-MM-DD').required(),
		description: Joi.string().max(255),
		photo: Joi.string().max(255),
	};

	return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;
