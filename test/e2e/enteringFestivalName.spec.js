describe('playfestApp', function(){

  var baseUrl = 'http://localhost:8100/'

  beforeEach(function(){
    browser.get(baseUrl);
  });

  describe('index page', function(){
    it('has a title', function(){
      expect(browser.getTitle()).toEqual('Playfest App');
    });

    it('confirms when a playlist has been created', function(){
      $('#new-playlist-input').sendKeys('Glastonbury');
      $('#new-playlist-button').click();
      var searchedValue = $('#confirmation');
      expect(searchedValue.getText()).toContain('Your playlist Glastonbury has been made!');
    })
  })

})
