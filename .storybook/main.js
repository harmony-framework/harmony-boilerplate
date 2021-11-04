const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const custom = require('../webpack.config.js');

module.exports = {
	core: {
		builder: "webpack5"
	},
	'stories': [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	'addons': [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-postcss'
	],
	webpackFinal: async (config) => {
		return {
			...config,
			module: {
				rules: [
					...config.module.rules,
					{
						test: /\.(tsx|ts)?$/,
						loader: 'ts-loader',
						exclude: /node_modules/,
						options: {
							transpileOnly: true
						}
					},
					{
						test: /\.s[ac]ss$/i,
						use: ["style-loader", "css-loader?url=false", "sass-loader"]
					}
				],
			},
			resolve: {
				...config.resolve,
				...custom.resolve,
			}
		};
	}
};
