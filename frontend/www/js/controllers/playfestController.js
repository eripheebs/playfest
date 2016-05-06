playfestApp.controller('playfestController', ['$scope', function($scope){

  $scope.festivalLocation = '';

  $scope.changeFestivalLocation = function(newName){
    $scope.festivalLocation = newName;
  };

}])
