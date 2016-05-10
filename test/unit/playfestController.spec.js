describe('playfestController', function(){
  beforeEach(module('playfestApp'));

  var testCtrl, scope, deferred;

  var service = jasmine.createSpyObj('TalkToBackendService', ['makePlaylist']);

  var confirmationString = "Your playlist has been created!"

  beforeEach(inject(function($controller, $rootScope, $q){
    scope = $rootScope.$new;
    deferred = $q.defer();
    service.makePlaylist.and.returnValue($q.when(confirmationString));
    testCtrl = $controller('playfestController', {
      TalkToBackendService: service,
      $scope: scope
    });
  }));

  describe('initialize', function(){
    it('with an empty string variable confirmationData', function(){
      expect(scope.confirmationData).toEqual('');
    });
  });

  describe('changeFestivalLocation', function(){
    it('calls on the service to get a confirmation', function(){
      scope.createPlaylist("fakeName");
      deferred.resolve('Remote call result');
      return deferred.promise;
      expect(service.makePlaylist).toHaveBeenCalledWith({ "playlistName" : "fakeName", "arrayOfArtists" : ["beyonce"] });
      expect(scope.confirmationData).toEqual(confirmationString);
    });
  });

})
