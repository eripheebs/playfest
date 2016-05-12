playfestApp.service('TalkToBackendService', ['$http', function($http){
  var self = this;

  function _handleResponseFromApi(response){
    return response.data;
  }

  self.makePlaylist = function(data){
    console.log("backend, sending", data);
    return $http.post('https://agile-refuge-70787.herokuapp.com/spotifyPlaylist/new', data)
      .then(_handleResponseFromApi);
  };


}]);
