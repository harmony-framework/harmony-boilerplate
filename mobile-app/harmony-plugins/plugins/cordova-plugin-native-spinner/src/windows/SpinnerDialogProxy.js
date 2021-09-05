//  cordova-plugin-spinnerdialog
//  Copyright © 2015 filfat Studios AB
//  Repo: https://github.com/filfat-Studios-AB/cordova-plugin-spinnerdialog
/* global Windows, cordova */
var progressIndicator;

cordova.commandProxy.add("SpinnerDialog", {
  show: function (successCallback, errorCallback, data) {
    if (typeof Windows !== 'undefined' &&
      typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */ &&
      typeof Windows.UI.ViewManagement.StatusBar !== 'undefined' /* Check that we have the StatusBar to work with*/) {

      
      progressIndicator = Windows.UI.ViewManagement.StatusBar.ProgressIndicator
        || Windows.UI.ViewManagement.StatusBar.getForCurrentView().progressIndicator;

      if (typeof(data[0]) !== 'undefined' && data[0] !== null) {
        progressIndicator.text = data[0];
	    }
      progressIndicator.showAsync();
      Windows.UI.ViewManagement.StatusBar.getForCurrentView().showAsync();
    } else if (typeof Windows !== 'undefined' &&
      typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */) {

      //TODO: Support Desktop, Xbox, etc
    }
  },
  hide: function (successCallback, errorCallback, data) {
    if (typeof Windows !== 'undefined' &&
      typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */ &&
      typeof Windows.UI.ViewManagement.StatusBar !== 'undefined' /* Check that we have the StatusBar to work with*/) {

      try {
        progressIndicator.hideAsync();
      } catch(e) {
        console.warn(e.message);
      }
      /* Hide status bar if data is undefined or false exclusively */
      if(typeof(data[0]) === 'undefined' || data[0] === false) {
        Windows.UI.ViewManagement.StatusBar.getForCurrentView().hideAsync();
      }
    } else if (typeof Windows !== 'undefined' &&
      typeof Windows.UI !== 'undefined' /* Check that we have a UI to work with */) {

      //TODO: Support Desktop, Xbox, etc
    }
  }
});
