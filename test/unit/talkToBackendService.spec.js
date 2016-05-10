describe('TalkToBackendService', function(){
  beforeEach(module('playfestApp'));

  var TalkToBackendService, httpBackend;

  var festivalData = ["Glastonbury", "Glastonburyed"];
  var confirmationData = "Your playlist has been created!"

  beforeEach(inject(function(_TalkToBackendService_, $httpBackend){
    TalkToBackendService = _TalkToBackendService_;
    httpBackend = $httpBackend;
  }));

  describe('#makePlaylist', function(){
    it('gets back confirmation if playlist is made', function(){
      httpBackend.expectPOST("http://localhost:5000/spotifyPlaylist/new").respond(confirmationData);

      TalkToBackendService.makePlaylist("Glastonbury").then(function(confirmation){
        expect(confirmation).toEqual(confirmationData)
      });
      httpBackend.flush();
    });
  });

});
