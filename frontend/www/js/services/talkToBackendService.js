playfestApp.service('TalkToBackendService', ['$http', function($http){
  var self = this;

  function _handleResponseFromApi(response){
    return response.data;
  }

  self.makePlaylist = function(data){
    return $http.post('https://agile-refuge-70787.herokuapp.com/poster/upload', data)
      .then(_handleResponseFromApi);
  };


}]);
