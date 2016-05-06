playfestApp.service('TalkToBackendService', ['$http', function($http){
  var self = this;

  self.getFestivalMatches = function(location){
    return $http.get('https://localhost/5000/festivalMatches/'+location)
    .then(_handleResponseFromApi);
  };

  function _handleResponseFromApi(response){
    return response.data;
  };

  self.makePlaylist = function(festivalName){
    return $http.get('https://localhost/5000/confirmFestival/'+festivalName)
    .then(_handleResponseFromApi);
  };
}])
