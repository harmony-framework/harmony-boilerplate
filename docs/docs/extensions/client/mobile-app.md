#Mobile App

## Quick Start
<b>Quick Start</b><br/><br/>
Inside `mobile-app` folder, run the following command:

##### Android
- Install Android Studio
- `npm run installations --platform=android` (run in android studio)
- `npm run start --platform=android`

##### iOS
- Install Xcode (Applied only for MAC users)
- `npm run installations --platform=ios`
- `npm run start --platform=ios`

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
- `npm run build --platform=android`

##### iOS
- `npm run build --platform=ios`

## Useful Information

#### Assets

!!! warning
    Make sure you replace the existing assets with yours (follow the same resulution for each image, located in res folder)

#### Installations Manually

##### Pre-Required

#### Harmony
- make sure Harmony already installed - `npm install` ( from root project )

- install cordova on your machine: `npm i cordova -g` ( latest cordova version tested 10.0.0 )
###### Android
- Install Android Studio

###### iOS
- Install Xcode (Applied only for MAC users)


##### Add Platforms
Make sure you have `www` folder in `mobile-app` folder. <br />
Inside `mobile-app` folder, run the following commands:

- `npm install`

###### Android
- `cordova platform add cordova-android@^9.0.0`

###### iOS
- `cordova platform add cordova-ios@^6.1.1`

##### Run First Build

###### Android ( from android studio )
- `cordova build android`

###### iOS
- `cordova build ios`

Once you added the platforms, it will add the plugins from harmony-plugins directory


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
