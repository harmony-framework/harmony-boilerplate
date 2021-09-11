const isProduction = process.env.NODE_ENV === "production";
const isMobileApp = process.env.BUILD_TYPE === "mobile";

const mobileConfig = {
	output: {
		publicPath: (isProduction) ? "/" : "http://10.0.2.2:8082/",
	},
	devServer: {
		host: '0.0.0.0'
	}
};

module.exports = (isMobileApp) ? mobileConfig : {};
