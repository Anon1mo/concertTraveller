const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
});

const Message = mongoose.model('Message', messageSchema);

function validateMessage(message) {
	const schema = {
		username: Joi.string().required(),
		message: Joi.string()
			.min(1)
			.max(1024)
			.required()
	};

	return Joi.validate(message, schema);
}

exports.messageSchema = messageSchema;
exports.Message = Message;
exports.validateMessage = validateMessage;
