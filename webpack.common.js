const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: '[name].[hash].js',
		publicPath: '/',
		path: path.resolve('./dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: ['node_modules'],
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /\.s(a|c)ss$/,
				// use: ExtractTextPlugin.extract({
				// 	fallback: 'style-loader',
				// 	use: ['css-loader', 'sass-loader']
				// })
				use: [
					'css-hot-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebPackPlugin(['dist']),
		// new ExtractTextPlugin('styles.css'),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebPackPlugin({
			template: 'index.html',
			alwaysWriteToDisk: true
		}),
		new HtmlWebpackHarddiskPlugin()
	]
};
