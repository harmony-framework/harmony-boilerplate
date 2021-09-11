## Installations

#### Pre-Required

- install cordova on your machine: `npm i cordova -g` ( latest cordova version tested 10.0.0 )
- Working with <b>Android</b> - Make sure you have Android Studio
- Working with <b>iOS</b> - Make sure you have Xcode (Applied only for MAC users)


#### Add Platforms
Inside `mobile-app` folder, run the following commands:

- `npm install`
- <b>Android</b> - `cordova platform add cordova-ios@^6.1.1`
- <b>iOS</b> - `cordova platform add cordova-android@^9.0.0`

Once you added the platforms, it will add the plugins from harmony-plugins directory

## Development

Inside `mobile-app` folder, run the following commands:

!!! info
    Make sure your Emulator is up. <br />

- `npm start`
- <b>Android</b> - `cordova run android`
- <b>iOS</b> - `cordova run ios`

## Production
Inside `mobile-app` folder, run the following commands:

- `npm run build`
- <b>Android</b> - `cordova build android`
- <b>iOS</b> - `cordova build ios`

## Useful Information

#### Assets

!! warning
    Make sure you replace the existing assets with yours (follow the same resulution for each image, located in res folder)


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
