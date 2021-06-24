const path = require('path');
const custom = require('../webpack.config.js');

module.exports = {
	'stories': [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	'addons': [
		'@storybook/addon-links',
		'@storybook/addon-essentials'
	],
	webpackFinal: async (config) => {
		return {
			...config,
			module: {
				rules: [
					...config.module.rules,
					{
						test: /\.s[ac]ss$/i,
						use: ["style-loader", "css-loader", "sass-loader"]
					}
				],
			},
			resolve: {
				...config.resolve,
				...custom.resolve,
			}
		};
	},
};
