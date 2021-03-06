/**
 * webpack.polyfill.config.js
 * 
 * webpack configuration for build in production
 * with polyfill plugin so old javascript engine (i.e. < es6)
 * can run the build app
 * 
 * Copyright 2019 Nicolas Mora <mail@babelouest.org>
 * 
 */

var path = require('path');
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		admin: ["babel-polyfill", './src/admin.js'],
		login: ["babel-polyfill", './src/login.js'],
		profile: ["babel-polyfill", './src/profile.js']
	},
	output: {
		path: path.resolve(__dirname, 'output'),
		filename: '[name].js',
		libraryTarget: 'umd'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|build)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015','env']
					}
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},

	 plugins: [
		new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify("production") 
			}
		}),
		new UglifyJsPlugin({
			test: /\.js($|\?)/i,
			sourceMap: true,
			uglifyOptions: {
			mangle: {
				keep_fnames: true
			},
			warnings: false,
			output: {
				beautify: false
			}
			}
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	}
}
