playfestApp.controller('playfestController', ['$scope', '$http', function($scope, $http){

  $scope.festivalName = '';

  $scope.changeFestivalName = function(newName){
    $scope.festivalName = newName;
  };

  this.sendSearchData = function(){
    $http.post('/http://localhost:5000/request', "hello as a string");
  };

  console.log("playfestController has loaded. $http = ", $http);

}]);
