playfestApp.controller('spotifyController', function($scope, $cordovaInAppBrowser) {

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    console.log(device.cordova);
  }

  $scope.pleaseQuack = function() {
    console.log('logging to spotify');
    var authProcess = cordova.InAppBrowser.open("https://agile-refuge-70787.herokuapp.com/auth/new", "_self");
    authProcess.addEventListener('loadstop', function(event) {
      if(event.url === 'http://localhost:8100/')
        {
          console.log('login completed!');
          authProcess.close();
        }
    });
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
