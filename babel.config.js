module.exports = {
	presets: [
		["@babel/preset-env", {targets : {node: "14"}}],
		["@babel/preset-react", {runtime: "automatic"}],
		"@babel/preset-typescript"
	],
	plugins: [
		"react-require",
		"react-hot-loader/babel",
		["@babel/plugin-proposal-decorators" ,{legacy: true }],
		["@babel/plugin-proposal-class-properties", { loose : true}]
	]
};
