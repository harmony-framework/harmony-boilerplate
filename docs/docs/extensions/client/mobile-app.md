#Mobile App

## Installations

#### Pre-Required

- install cordova on your machine: `npm i cordova -g` ( latest cordova version tested 10.0.0 )
##### Android
- Install Android Studio
- Install Gradle ( can be installed automatic if your run cordova build android in android studio )
- Add new Path in Environment Variable for Gradle - example: <br />
`C:\Users\<username>\.gradle\wrapper\dists\gradle-7.0.2-bin\857tjihv64xamwrf0h14cai3r\gradle-7.0.2\bin`

##### iOS
- Install Xcode (Applied only for MAC users)


#### Add Platforms
Make sure you have `www` folder in `mobile-app` folder. <br />
Inside `mobile-app` folder, run the following commands:

- `npm install`

##### Android
- `cordova platform add cordova-android@^9.0.0`

##### iOS
- `cordova platform add cordova-ios@^6.1.1`

#### Run First Build

##### Android
- `cordova build android`

##### iOS
- `cordova build ios`

Once you added the platforms, it will add the plugins from harmony-plugins directory

## Development

Inside `mobile-app` folder, run the following command:

!!! info
    Make sure your Emulator is up. <br />

##### Android
- `npm start --platform=android`

##### iOS
- `npm start --platform=ios`

## Production
Inside `mobile-app` folder, run the following command:

##### Android
- `npm start --platform=android`

##### iOS
- `npm start --platform=ios`

## Useful Information

#### Assets

!!! warning
    Make sure you replace the existing assets with yours (follow the same resulution for each image, located in res folder)

#### Only Build Cordova manually

- `cordova build android`
- `cordova build ios`

#### Only Run Cordova manually

- `cordova run android`
- `cordova run ios`

#### Applying changes in the source project

- `cordova prepare android`
- `cordova prepare ios`

#### Removing Platforms
- `cordova platform remove ios`
- `cordova platform remove android`

#### Plugins - Manual (Optional)

- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-ionic-webview`
- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-inappbrowser`
- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-native-spinner`
- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-splashscreen`
- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-statusbar`
- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-whitelist`
- `cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/phonegap-plugin-contentsync`
