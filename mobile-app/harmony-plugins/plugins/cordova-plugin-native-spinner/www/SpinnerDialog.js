var exec = require('cordova/exec');

module.exports = {
  show: function (title, message, cancelCallback, iosOptions) {
    if (cancelCallback == true && typeof cancelCallback !== "function") {
      cancelCallback = function () { };
    }
    var isPlatformIos = (navigator.userAgent.match(/iPad/i)) == "iPad" || (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? true : false;
    var params = [title, message, !!cancelCallback];
    if (isPlatformIos) {
      if (typeof iosOptions != "object") {
        iosOptions = { overlayOpacity: 0.35, textColorRed: 1, textColorGreen: 1, textColorBlue: 1 }
      }
      params = params.concat([(iosOptions.overlayOpacity || 0.35), (iosOptions.textColorRed || 1), (iosOptions.textColorGreen || 1), (iosOptions.textColorBlue || 1)])
    }
    cordova.exec(cancelCallback, null, 'SpinnerDialog', 'show', params);
  },
  hide: function (wpStatusbar, success, fail) {
    cordova.exec(success, fail, 'SpinnerDialog', 'hide', [wpStatusbar]);
  }
};
