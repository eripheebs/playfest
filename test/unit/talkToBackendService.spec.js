describe('TalkToBackendService', function(){
  beforeEach(module('gitHired'));

  var TalkToBackendService, httpBackend;

  var festivalData = ["Glastonbury", "Glastonburyed"];

  beforeEach(inject(function(_TalkToBackendService_, $httpBackend){
    TalkToBackendService = _TalkToBackendService_;
    httpBackend = $httpBackend;
  }));

  it('sends location of festival', function(){
    httpBackend.expectPOST()
  });

  it('gets back potential festival matches', function(){
    httpBackend.expectGET("https://localhost/5000/festivalMatches").respond(festivalData);

    TalkToBackendService.getFestivalMatches("Glastonbury").then(function(festivals){
      expect(festivals).toEqual(["Glastonbury", "Glastonburyed"]);
    });
  });

});
