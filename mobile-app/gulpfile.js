const gulp = require('gulp');
const execShPromise  = require("exec-sh").promise;
const fs   = require('fs');

const platform = process.env.npm_config_platform;

console.log('platform ', platform);

gulp.task('createApp', () => {
	return gulp.src(['../dist/**/*']).pipe(gulp.dest('www'));
});

gulp.task('install', () => {
	return new Promise(async (resolve, reject) => {
		if (!platform) reject('Platform Argument is Missing - Did you miss to send --platform=(android/ios) ?');

		const addPlatform = (platform === 'android') ? 'cordova platform add cordova-android@^9.0.0' : 'cordova platform add cordova-ios@^6.1.1';

		try {
			if(!fs.existsSync('www')) {
				fs.mkdirSync('www');
			}

			console.log('npm i cordova@~10.0.0 -g');
			await execShPromise('npm i cordova@~10.0.0 -g');

			console.log('npm install');
			await execShPromise('npm install');

			try {
				console.log(addPlatform);
				await execShPromise(addPlatform);
			} catch (e) {
				console.log(e);
			}

			console.log(`cordova build ${platform}`);
			await execShPromise(`cordova build ${platform}`);

			resolve();
		} catch (e) {
			reject(e);
		}
	});
});
