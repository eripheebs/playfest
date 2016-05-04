describe('playfestApp', function(){

  var baseUrl = 'http://localhost:8100/'

  beforeEach(function(){
    browser.get(baseUrl);
  });

  describe('index page', function(){
    it('has a title', function(){
      expect(browser.getTitle()).toEqual('Playfest App');
    });

  //   it('displays form to write festival name')
  })

})
