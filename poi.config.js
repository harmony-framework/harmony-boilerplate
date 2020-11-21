const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.tsx',
	output: {
		html: {
			template: './src/public/index.ejs'
		},
		fileNames: {
			js: isProduction
				? 'js/[name].[chunkhash:8].js'
				: 'js/[name].js',
			css: isProduction
				? 'css/[name].[chunkhash:8].css'
				: 'css/[name].css',
			font: isProduction
				? 'assets/fonts/[path][name].[hash:8].[ext]'
				: 'assets/fonts/[path][name].[ext]',
			image: isProduction
				? 'assets/images/[path][name].[hash:8].[ext]'
				: 'assets/images/[path][name].[ext]'
		}
	},
	plugins: [
		{
			resolve: '@poi/plugin-typescript',
			options: {}
		}
	],
	configureWebpack: {
		resolve: {
			plugins: [
				new TsconfigPathsPlugin({})
			]
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [
					{ from: './src/public/assets', to: 'assets' },
				]
			})
		]
	},
};
