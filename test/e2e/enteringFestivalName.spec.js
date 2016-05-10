describe('playfestApp', function(){

  var baseUrl = 'http://localhost:8100/'

  beforeEach(function(){
    browser.get(baseUrl);
  });

  describe('index page', function(){
    it('has a title', function(){
      expect(browser.getTitle()).toEqual('Playfest App');
    });

    context('not logged in', function(){
      it('Tells you to log in if you have not', function(){
        $('#new-playlist-input').sendKeys('Glastonbury');
        $('#new-playlist-button').click();
        var searchedValue = $('#confirmation');
        expect(searchedValue.getText()).toContain('You must be logged in');
      });
    });
  });

});
