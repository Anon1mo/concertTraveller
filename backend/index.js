require('dotenv').config();
const path = require('path');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.dev');

const app = express();
const compiler = webpack(config);

const port = process.env.PORT || 3000;

//webpack
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.listen(port, error => {
	if(error) {
		console.log(error);
	} else {
		open(`http://localhost:${port}`);
	}
});
