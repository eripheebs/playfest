describe('playfestController', function(){
  beforeEach(module('playfestApp'));

  var testCtrl;

  beforeEach(inject(function($controller){
    testCtrl = $controller('playfestController');
  }));

  describe('initialize', function(){
    it('with an empty string variable festivalName', function(){
      expect(testCtrl.festivalName).toEqual('');
    });
  });

  describe('changeFestivalName', function(){
    it('changes festivalName string', function(){
      testCtrl.changeFestivalName('Glastonbury');
      expect(testCtrl.festivalName).toEqual('Glastonbury');
    });
  });

})
