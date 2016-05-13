playfestApp.controller('playfestController', ['TalkToBackendService', '$scope', '$timeout', function(TalkToBackendService, $scope, $timeout){

  $scope.confirmationData = '';

  $scope.createPlaylist = function(playlistName){
    var arrayOfArtists = $scope.arrayVar;
    _checkIfReady(playlistName,arrayOfArtists);
  };

  function _confirmation(data) {
    $scope.confirmationData = data;
  }


  function _checkIfReady(playlistName,arrayOfArtists){
    if (!playlistName){
      $scope.confirmationData = "You must enter a playlist name";
    } else if (arrayOfArtists === ''){
      $scope.confirmationData = "You must take a photo of a poster with words!";
    } else {
      var confirm = $scope;
      confirm.confirmationData = "Making your playlist, please wait...";
      $timeout(function(){
        confirm.confirmationData = "Playlist created as " + playlistName;
      },2000);

    }
  }

  addArrayVar = function(response){
    $scope.arrayVar = response.data;
  };

}]);
