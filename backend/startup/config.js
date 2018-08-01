module.exports = function() {
	if(!process.env.jwtPrivateKey) {
		throw new Error('ERROR: jwtPrivateKey is not defined');
	}
	console.log(process.env.jwtPrivateKey);
};
