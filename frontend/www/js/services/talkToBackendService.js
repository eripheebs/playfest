playfestApp.service('TalkToBackendService', ['$http', function($http){
  var self = this;

  function _handleResponseFromApi(response){
    return response.data;
  };

  self.makePlaylist = function(data){
    return $http.post('http://localhost:5000/spotifyPlaylist/new', data)
      .then(_handleResponseFromApi);
  };

  self.login = function(){
    return $http.redirect('http://localhost:5000/auth/new');
  }

}])
