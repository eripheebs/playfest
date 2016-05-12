playfestApp.controller('playfestController', ['TalkToBackendService', '$scope', function(TalkToBackendService, $scope){

  $scope.confirmationData = '';

  $scope.createPlaylist = function(playlistName){
    var arrayOfArtists = $scope.arrayVar;
    var data = { playlistName: playlistName, arrayOfArtists: arrayOfArtists };
    _checkIfReady(data);
  };

  function _confirmation(data) {
    $scope.confirmationData = data;
  }


  function _checkIfReady(data){
    if (data.playlistName === null){
      $scope.confirmationData = "You must enter a playlist name";
    } else if (data.arrayOfArtists === null){
      $scope.confirmationData = "You must take a photo of a poster with words!";
    } else {
      $scope.confirmationData = "Making your playlist, please wait...";
      TalkToBackendService.makePlaylist(data)
        .then(_confirmation);
    }
  }

  addArrayVar = function(response){
    $scope.arrayVar = response.data;
  };

}]);
