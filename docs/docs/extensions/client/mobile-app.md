## Pre-req

1. You need to install cordova on your machine.
	- Working with Android - Make sure you have Android Studio
	- Working with iOS - Make sure you have Xcode (Applied only for MAC users)

## Add Platforms

- Run npm install in the mobile-app folder
- cordova platform add cordova-ios@^6.1.1
- cordova platform add cordova-android@^9.0.0

Once you added the platforms, it will add the plugins from harmony-plugins directory

## Plugins - Manual (Optional)

- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-ionic-webview
- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-inappbrowser
- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-native-spinner
- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-splashscreen
- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-statusbar
- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/cordova-plugin-whitelist
- cordova plugin add harmony-boilerplate/mobile-app/harmony-plugins/plugins/phonegap-plugin-contentsync

## Build

1. cordova build android
2. cordova build ios (Only for MAC users)

## Applying changes in the source project

1. cordova prepare android
2. cordova prepare ios

## Assets

Make sure you replace the existing assets with yours (follow the same resulution for each image, located in res folder)

## Removing Platforms
1. cordova platform remove ios
2. cordova platform remove android

## First time init

1. Execute the following commands after installing cordova:
	- cordova platform add cordova-ios@^6.1.1
	- cordova platform add cordova-android@^9.0.0