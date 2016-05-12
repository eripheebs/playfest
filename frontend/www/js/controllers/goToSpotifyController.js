playfestApp.controller('goToSpotifyController', function($scope, $cordovaInAppBrowser) {

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    console.log(device.cordova);
  };

  $scope.launchSpotify = function(){
    var scheme;

    if(device.platform === 'iOS') {
        scheme = 'spotify://';
    } else if(device.platform === 'Android') {
        scheme = 'com.spotify.android';
    };

    appAvailability.check(
      scheme,
      function() {
          window.open('spotify://', '_system', 'location=no');
          console.log('Twitter is available');
      },
      function() {
          window.open('https://spotify.com/', '_system', 'location=no');
          console.log('Twitter is not available');
      });
  };
});
