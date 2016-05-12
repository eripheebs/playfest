playfestApp.controller('goToSpotifyController', function($scope, $cordovaInAppBrowser) {

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    console.log(device.cordova);
  }

  spotifyLogin = function() {
    $location.path('https://google.com');
  };

  $scope.launchSpotify = function(){
    var scheme = 'com.spotify.music';
    console.log("checking for ", scheme);
    appAvailability.check(
    scheme,
    function() {  // Success callback
        console.log(scheme + ' is available :)');
        window.open('spotify://', '_system', 'location=no');

    },
    function() {  // Error callback
        console.log(scheme + ' is not available :(');
    });

  };

});
