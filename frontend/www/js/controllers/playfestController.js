playfestApp.controller('playfestController', ['TalkToBackendService', '$scope', function(TalkToBackendService, $scope){

  $scope.confirmationData = '';
  $scope.arrayVar = [];

  $scope.createPlaylist = function(playlistName){
    var arrayOfArtists = $scope.arrayVar;
    var data = _makeHash(playlistName, arrayOfArtists)
    _checkIfReady(playlistName, data);
  }

  $scope.goToAuth = function(){
    TalkToBackendService.login()
      .then(_confirmation);
  }

  function _confirmation(data) {
    $scope.confirmationData = data;
  }

  function _makeHash(playlistName, arrayOfArtists){
    return { "playlistName" : playlistName, "arrayOfArtists" : arrayOfArtists };
  }

  function _checkIfReady(playlistName, data){
    if (playlistName == null){
      $scope.confirmationData = "You must enter a playlist name";
    } else if ($scope.arrayVar[0] == null){
      $scope.confirmationData = "You must take a photo of a poster with words!";
    } else {
      $scope.confirmationData = "Making your playlist, please wait...";
      TalkToBackendService.makePlaylist(data)
        .then(_confirmation);
    }
  }

  $scope.addArrayVar = function(response){
    var arrayVar = response.data;
  }

}])
