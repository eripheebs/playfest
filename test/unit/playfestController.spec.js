describe('playfestController', function(){
  beforeEach(module('playfestApp'));

  var testCtrl;
  var scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new;
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

})
