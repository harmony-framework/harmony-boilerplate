const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WarningsToErrorsPlugin = require('warnings-to-errors-webpack-plugin');
const { merge } = require('webpack-merge');
const mobileConfig = require('./mobile-app/webpack.config');

const deps = require("./package.json").dependencies;

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const lintConfigProduction = {
	context: './src',
	extensions: ['ts', 'tsx'],
	emitWarning: true,
	emitError: true
};

const lintConfigDevelopment = {
	context: './src',
	extensions: ['ts', 'tsx'],
	exclude: ['public', 'node_modules', 'base/extends'],
	failOnError: false,
	failOnWarning: false,
	emitWarning: true
};

const pluginsPatternsDevelopment = [
	{ from: './src/public/assets', to: 'assets' },
	{ from: './src/public/config', to: 'config' },
	{ from: './src/public/mockServiceWorker.js', to: 'mockServiceWorker.js' }
]

const pluginsPatternsProduction = [
	{ from: './src/public/assets', to: 'assets' },
	{ from: './src/public/config', to: 'config' },
]

let plugins = [
	new ESLintPlugin(isProduction ? lintConfigProduction : lintConfigDevelopment),
	new CopyWebpackPlugin({
		patterns: isProduction ? pluginsPatternsProduction : pluginsPatternsDevelopment
	}),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, "src/public", "index.ejs"),
		process
	}),
	new ForkTsCheckerWebpackPlugin()
];

if (isProduction) {
	plugins = plugins.concat([
		new WarningsToErrorsPlugin()
	]);
}

module.exports = merge({
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	entry: { index: path.resolve(__dirname, "src", "index.tsx") },
	devtool: isProduction ? undefined : "cheap-module-source-map",
	output: {
		publicPath: process.env.NODE_ENV === "production" ? "/" : "http://localhost:8082/",
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly: true
				}
			},
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: ["style-loader", "css-loader?url=false", "postcss-loader", "sass-loader"]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: "asset"
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
		plugins: [
			new TsconfigPathsPlugin({})
		],
	},
	plugins,
	optimization: isProduction ? {
		splitChunks: {
			minSize: 700000,
			maxSize: 1000000
		}
	} : undefined,
	performance: {
		hints: 'error',
		maxAssetSize: Infinity,
		maxEntrypointSize: Infinity
	},
	devServer: {
		port: 8082,
		historyApiFallback: true,
		hot: true,
		onListening: (context) => {
			context.listeningApp.keepAliveTimeout = 600000;
			context.listeningApp.headersTimeout = 600000;
		},
		stats: {
			colors: true,
			hash: false,
			version: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			publicPath: false
		}
	},
}, mobileConfig);
