describe('playfestController', function(){
  beforeEach(module('playfestApp'));

  var testCtrl, scope, deferred;

  var service = jasmine.createSpyObj('TalkToBackendService', ['makePlaylist']);

  var festivalNames = ["Glastonbury", "Glastonburyed"]

  beforeEach(inject(function($controller, $rootScope, $q){
    scope = $rootScope.$new;
    deferred = $q.defer();
    service.makePlaylist.and.returnValue($q.when(festivalNames));
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

  // describe('changeFestivalLocation', function(){
  //   beforeEach(function(){
  //     scope.changeFestivalLocation('London');
  //   })
  //   it('changes festivalLocation string', function(){
  //     expect(scope.festivalLocation).toEqual('London');
  //   });
  //
  //   it('calls on the service to get a confirmation', function(){
  //     expect(service.getFestivalMatches).toHaveBeenCalledWith('London');
  //   });
  // });

})
