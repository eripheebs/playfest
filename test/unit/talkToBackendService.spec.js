describe('TalkToBackendService', function(){
  beforeEach(module('playfestApp'));

  var TalkToBackendService, httpBackend;

  var festivalData = ["Glastonbury", "Glastonburyed"];
  var confirmationData = "Your playlist has been created!"

  beforeEach(inject(function(_TalkToBackendService_, $httpBackend){
    TalkToBackendService = _TalkToBackendService_;
    httpBackend = $httpBackend;
  }));

  describe('#getFestivalMatches', function(){
    it('gets back potential festival matches', function(){
      httpBackend.expectGET("https://localhost/5000/festivalMatches/Sommerset").respond(festivalData);

      TalkToBackendService.getFestivalMatches("Sommerset").then(function(festivals){
        expect(festivals).toEqual(["Glastonbury", "Glastonburyed"]);
      });
      httpBackend.flush();
    });

  });

  describe('#makePlaylist', function(){
    it('gets back confirmation if playlist is made', function(){
      httpBackend.expectGET("https://localhost/5000/confirmFestival/Glastonbury").respond(confirmationData);

      TalkToBackendService.makePlaylist("Glastonbury").then(function(confirmation){
        expect(confirmation).toEqual("Your playlist has been created!")
      });
      httpBackend.flush();
    });
  });
  
});
