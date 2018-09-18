const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	entry: [
		'webpack-hot-middleware/client?reload=true&timeout=2000',
		'./src/index.js'
	],
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
	// devServer: {
	// 	host: 'localhost',
	// 	port: 3000,
	// 	open: true,
	// 	historyApiFallback: true
	// }
});
