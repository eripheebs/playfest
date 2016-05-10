playfestApp.controller('playfestController', ['TalkToBackendService', '$scope', function(TalkToBackendService, $scope){

  $scope.confirmationData = '';

  $scope.createPlaylist = function(playlistName){
    arrayOfArtists = ["beyonce"];
    var data = _makeHash(playlistName, arrayOfArtists)
    _checkIfNamed(playlistName, data);
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

  function _checkIfNamed(playlistName, data){
    if (playlistName == null){
      $scope.confirmationData = "You must enter a playlist name";
    } else {
      $scope.confirmationData = null;
      TalkToBackendService.makePlaylist(data)
        .then(_confirmation);
    }
  }

}])
