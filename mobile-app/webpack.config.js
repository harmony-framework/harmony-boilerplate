const execSh = require("exec-sh");
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";
const isMobileApp = process.env.BUILD_TYPE === "mobile";
const platform = process.env.npm_config_platform;

const devPublicPath = (platform === "android") ? "http://10.0.2.2:8082/" : "http://localhost:8082/";
const cordovaPath = (platform === "android") ? "/mobile-app/platforms/android/app/src/main/assets/www/cordova.js" : "/mobile-app/platforms/ios/platform_www/cordova.js";
let isDone = false;

if (isMobileApp && !platform) {
	throw Error('Did you miss --platform ? platform are mandatory. Example: npm run build --platform=android');
}

const mobileConfig = {
	output: {
		publicPath: (isProduction) ? "/" : devPublicPath,
	},
	devServer: {
		host: '0.0.0.0'
	},
	plugins: [
		new HtmlReplaceWebpackPlugin([{
			pattern: '${cordovaPath}',
			replacement: (isProduction) ? '/cordova.js' : cordovaPath,
		}]),
		{
			apply: compiler => {
				compiler.hooks.done.tap('run-cordova', compilation => {
					if (!isDone) {
						isDone = true;
						if (process.env.NODE_ENV === 'development') {
							execSh(`cd ./mobile-app && cordova run ${platform}`);
						} else {
							execSh(`cd ./mobile-app && cordova build ${platform}`);
						}
					}
				})
			}
		},
	]
};

module.exports = (isMobileApp) ? mobileConfig : {};
