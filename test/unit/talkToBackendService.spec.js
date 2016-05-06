describe('TalkToBackendService', function(){
  beforeEach(module('playfestApp'));

  var TalkToBackendService, httpBackend;

  var festivalData = ["Glastonbury", "Glastonburyed"];

  beforeEach(inject(function(_TalkToBackendService_, $httpBackend){
    TalkToBackendService = _TalkToBackendService_;
    httpBackend = $httpBackend;
  }));

  it('gets back potential festival matches', function(){
    httpBackend.expectGET("https://localhost/5000/festivalMatches/Sommerset").respond(festivalData);

    TalkToBackendService.getFestivalMatches("Sommerset").then(function(festivals){
      expect(festivals).toEqual(["Glastonbury", "Glastonburyed"]);
    });
    httpBackend.flush();
  });

});
