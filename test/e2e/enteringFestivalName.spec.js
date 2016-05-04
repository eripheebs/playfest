describe('playfestApp', function(){

  var baseUrl = 'http://localhost:8100/'

  beforeEach(function(){
    browser.get(baseUrl);
  });

  describe('index page', function(){
    it('has a title', function(){
      expect(browser.getTitle()).toEqual('Playfest App');
    });

    it('enter festival name and festivalName variable stored', function(){
      $('#new-festival-input').sendKeys('Glastonbury');
      $('#new-festival-search').click();
      var searchedValue = $('#searched-value');
      expect(searchedValue.getText()).toContain('Glastonbury');
    })
  })

})
