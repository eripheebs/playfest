playfestApp.controller('playfestController', ['TalkToBackendService', '$scope', function(TalkToBackendService, $scope){

  $scope.playlistName = '';
  $scope.confirmationData = '';

  $scope.changePlaylistName = function(newName){
    $scope.playlistName = newName;
  };

  $scope.createPlaylist = function(data){
    data.arrayOfArtists = ["beyonce"];
    TalkToBackendService.makePlaylist(data)
      .then(_confirmation);
  }

  $scope.goToAuth = function(){
    TalkToBackendService.login()
      .then(_confirmation);
  }

  function _confirmation(data) {
    $scope.confirmationData = data;
  }

}])
