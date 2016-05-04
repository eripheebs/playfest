playfestApp.controller('playfestController', ['$scope', function($scope){

  $scope.festivalName = '';

  $scope.changeFestivalName = function(newName){
    $scope.festivalName = newName;
  };

}])
