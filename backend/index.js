require('dotenv').config();
const path = require('path');
const open = require('open');
const morgan = require('morgan');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.dev');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../dist')));
app.use(morgan('tiny'));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);
require('./models/sampleData')();

//webpack
if (process.env.NODE_ENV !== 'production') {
	const compiler = webpack(config);

	app.use(
		require('webpack-dev-middleware')(compiler, {
			hot: true,
			noInfo: true,
			publicPath: config.output.publicPath
		})
	);
	app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/api/fibonnaci/:num', (req, res) => {
	const num = req.params.num;

	function fibonacci(num) {
		if (num <= 1) return 1;

		return fibonacci(num - 1) + fibonacci(num - 2);
	}

	const fibo = fibonacci(num);

	console.log(fibo);
	res.send({ fibo });
});

app.get('/*', (req, res) =>
	res.sendFile(path.join(__dirname, '../dist/index.html'))
);
app.listen(port, error => {
	if (error) {
		console.log(error);
	} else {
		open(`http://localhost:${port}`);
		console.log(`Listening on port ${port}`);
	}
});
