package com.ionicframework.cordova.webview;

import android.app.Activity;
import android.content.SharedPreferences;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class IonicWebView extends CordovaPlugin  {

  public static final String WEBVIEW_PREFS_NAME = "WebViewSettings";
  public static final String CDV_SERVER_PATH = "serverBasePath";

  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
  
    if (action.equals("setServerBasePath")) {
      final String path = args.getString(0);
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          ((IonicWebViewEngine)webView.getEngine()).setServerBasePath(path);
        }
      });
      return true;
    } else if (action.equals("getServerBasePath")) {
      callbackContext.success(((IonicWebViewEngine)webView.getEngine()).getServerBasePath());
      return true;
    } else if (action.equals("getUserConfiguration")) {
      String contentUpdateURL = preferences.getString("ContentUpdateURL", null);
      String contentUpdateEnabled = preferences.getString("ContentUpdateEnabled", null);
      String applicationId = preferences.getString("ApplicationID", null);
      JSONObject item = new JSONObject();
      item.put("contentUpdateURL", contentUpdateURL);
      item.put("contentUpdateEnabled",contentUpdateEnabled);
      item.put("appId",applicationId);

      callbackContext.success(item.toString());
      return true;
    } else if (action.equals("persistServerBasePath")) {
      String path = ((IonicWebViewEngine)webView.getEngine()).getServerBasePath();
      SharedPreferences prefs = cordova.getActivity().getApplicationContext().getSharedPreferences(WEBVIEW_PREFS_NAME, Activity.MODE_PRIVATE);
      SharedPreferences.Editor editor = prefs.edit();
      editor.putString(CDV_SERVER_PATH, path);
      editor.apply();
      return true;
    }
    return false;
  }

}

