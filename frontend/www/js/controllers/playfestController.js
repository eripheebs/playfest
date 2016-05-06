playfestApp.controller('playfestController', ['TalkToBackendService', '$scope', function(TalkToBackendService, $scope){

  $scope.festivalLocation = '';
  $scope.festivalMatches = [];

  $scope.changeFestivalLocation = function(newName){
    $scope.festivalLocation = newName;
    TalkToBackendService.getFestivalMatches(newName)
      .then(_saveFestivalMatches);
  };

  function _saveFestivalMatches(response){
    $scope.festivalMatches.push(response);
  }

}])
