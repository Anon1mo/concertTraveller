const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
	const db = process.env.db;
	mongoose.connect(db)
		.then(() => winston.info(`connected to ${db}...`));
};
