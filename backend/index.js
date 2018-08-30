require('dotenv').config();
const path = require('path');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.dev');


const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../dist')));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

require('./models/sampleData')();

const compiler = webpack(config);
//webpack
app.use(require('webpack-dev-middleware')(compiler, {
	hot: true,
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.listen(port, error => {
	if(error) {
		console.log(error);
	} else {
		open(`http://localhost:${port}`);
		console.log(`Listening on port ${port}`);
	}
});
