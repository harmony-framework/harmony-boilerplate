const isProduction = process.env.NODE_ENV === "production";
const isMobileApp = process.env.BUILD_TYPE === "mobile";
const platform = process.env.npm_config_platform;

const devPublicPath = (platform === "android") ? "http://10.0.2.2:8082/" : "http://localhost:8082/";
let isDone = false;

const mobileConfig = {
	output: {
		publicPath: (isProduction) ? "/" : devPublicPath,
	},
	devServer: {
		host: '0.0.0.0'
	},
	plugins: [
		{
			// add a custom webpack plugin. For more info: https://webpack.js.org/concepts/plugins/
			apply: compiler => {
				compiler.hooks.done.tap('test', compilation => {
					if (!isDone) {
						isDone = true;
						console.log('testtttt !!!');
					}
				})
			}
		},
	]
};

module.exports = (isMobileApp) ? mobileConfig : {};
