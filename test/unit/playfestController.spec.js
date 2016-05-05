describe('playfestController', function(){
  beforeEach(module('playfestApp'));

  var testCtrl;
  var scope;
  var httpBackend;

  beforeEach(inject(function($controller, $rootScope, $httpBackend){
    scope = $rootScope.$new;
    httpBackend = $httpBackend;
    testCtrl = $controller('playfestController', {
      $scope: scope
    });
  }));

  describe('initialize', function(){
    it('with an empty string variable festivalName', function(){
      expect(scope.festivalName).toEqual('');
    });
  });

  describe('changeFestivalName', function(){
    it('changes festivalName string', function(){
      scope.changeFestivalName('Glastonbury');
      expect(scope.festivalName).toEqual('Glastonbury');
    });
  });

  describe('sendSearchData', function(){
    it('sends a festival name to server', function(){
      httpBackend.expectPOST("/http://localhost:5000/request").respond(200);
      testCtrl.sendSearchData();
      httpBackend.flush();
    });
  });

});
