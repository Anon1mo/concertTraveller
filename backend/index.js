require('dotenv').config();
const path = require('path');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.dev');
const mongoose = require('mongoose');
require('express-async-errors'); // for handling async errors, throw them to error.js

require('./startup/config')();

const events = require('./routes/events');
const users = require('./routes/users');
const offers = require('./routes/offers');
const auth = require('./routes/auth');
const error = require('./middleware/error');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')));

mongoose.connect('mongodb://localhost/concertTraveller')
	.then(() => console.log('Connected to mongoDB'))
	.catch(() => console.error('Could not connect to mongoDB'))

require('./models/sampleData')();

app.use(express.json());
app.use('/api/events', events);
app.use('/api/users', users);
app.use('/api/offers', offers);
app.use('/api/auth', auth);

app.use(error);
// const compiler = webpack(config);
// //webpack
// app.use(require('webpack-dev-middleware')(compiler, {
// 	hot: true,
// 	noInfo: true,
// 	publicPath: config.output.publicPath
// }));
// app.use(require('webpack-hot-middleware')(compiler));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.listen(port, error => {
	if(error) {
		console.log(error);
	} else {
		//open(`http://localhost:${port}`);
		console.log(`Listening on port ${port}`);
	}
});
