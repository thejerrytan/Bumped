App.accessRule("*")
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '446286968895184',
    APP_NAME: 'Bump-Into'
});

App.info({
  name: 'Bump',
  description: 'A Hack&Roll Project',
  version: '0.0.1'
});

App.icons({
  'android_ldpi': 'resources/icons/ldpiIcon.png',
  'android_mdpi': 'resources/icons/mdpiIcon.png',
  'android_hdpi': 'resources/icons/hdpiIcon.png',
  'android_xhdpi': 'resources/icons/xhdpiIcon.png'
});