const winston = require('winston');
require('express-async-errors'); // for handling async errors, throw them to error.js

module.exports = function() {
	// instead of subscribing to uncaughtException event
	winston.handleExceptions(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'uncaughtExceptions.log' })
	);

	// for promises thrown outside of express. not for exceptions (for this: uncaughtException)
	process.on('unhandledRejection', (ex) => {
		throw ex; // throw exception and winston.handleExceptions will catch it
	});

	winston.add(winston.transports.File, { filename: 'logfile.log' });
};
