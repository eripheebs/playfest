describe('playfestApp', function(){

  var baseUrl = 'http://localhost:8100/'

  beforeEach(function(){
    browser.get(baseUrl);
  });

  describe('Button can redirect you to spotify', function(){
    it('redirects you to spotify app', function(){
      $('#spotify-button').click();
      expect(current_path).toContain('spotify');
    });

});
