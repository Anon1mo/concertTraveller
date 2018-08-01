require('dotenv').config();
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	fbLink: {
		type: String,
		minlength: 1,
		maxlength: 255
	},
	age: {
		type: Number,
		min: 1,
		max: 150
	},
	offers: [{type: Schema.Types.ObjectId, ref: 'Offer'}],
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivateKey);
	return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = {
		username: Joi.string().min(1).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
		fbLink: Joi.string().min(1).max(255),
		age: Joi.number().min(1).max(150)
	};

	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
