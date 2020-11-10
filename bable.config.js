module.exports = {
	presets: [
		"react-app",
		"poi/babel",
		"@babel/preset-env",
		"@babel/preset-react"
	],
	plugins: [
		"react-require",
		"react-hot-loader/babel",
		[
			"@babel/plugin-proposal-decorators",
			{
				"decoratorsBeforeExport": true
			}
		],
		"@babel/plugin-proposal-class-properties"
	]
};