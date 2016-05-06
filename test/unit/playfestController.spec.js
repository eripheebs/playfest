describe('playfestController', function(){
  beforeEach(module('playfestApp'));

  var testCtrl;
  var scope;

  beforeEach(inject(function($controller, $rootScope){
    var service = jasmine.createSpy('TalkToBackendService', ['getFestivalMatches']);
    scope = $rootScope.$new;
    testCtrl = $controller('playfestController', {
      getFestivalMatches: service,
      $scope: scope
    });
  }));

  describe('initialize', function(){
    it('with an empty string variable festivalLocation', function(){
      expect(scope.festivalLocation).toEqual('');
    });
  });

  describe('changeFestivalLocation', function(){
    it('changes festivalLocation string', function(){
      scope.changeFestivalLocation('London');
      expect(scope.festivalLocation).toEqual('London');
    });

    it('calls on the service to get a confirmation', function(){
      scope.changeFestivalLocation('London');
      spyOn(service, 'getFestivalMatches').andCallThrough();
      expect(service.getFestivalMatches).toHaveBeenCalled();
    });
  });

})
