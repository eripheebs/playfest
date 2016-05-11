var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var server = require('../../backend/server.js');
var spotifyModel = require('../../backend/models/spotifyPlaylist.js');
var getTracksAndCreatePlaylist = require('../../backend/models/spotifyPlaylist.js').getTracksAndCreatePlaylist;
var expect = chai.expect;
var SpotifyWebApi = require('spotify-web-api-node');

chai.use(chaiHttp);
chai.use(sinonChai);

var error = "Cannot read property 'method' of undefined";
var confirmationString = "Your playlist has been created!";

describe('Spotify Playlist', function(){

  describe('when request to the API is made', function(){

    it('the page needs userID in order to make request', function(done){
      chai.request(server)
        .post('/spotifyPlaylist/new')
        .end(function(err, res){
          expect(res.status).to.equal(200);
          expect(server).to.throw(error)
          done();
        });
    });
  });

    // return spotifyApi.searchTracks('artist:'+artistName,{limit: 10})
    // eturn spotifyApi.createPlaylist(username, playlistTitle, {'public' : false})
    // spotifyApi.addTracksToPlaylist(username, playlistID, trackIDsArray)

  // describe('#getTracksAndCreatePlaylist', function(){
  //   beforeEach(function(){
  //     sinon.stub(SpotifyWebApi, "setAccessToken").yieldsTo("success", true);
  //     sinon.stub(SpotifyWebApi, "createPlaylist").yieldsTo("success", 3214831);
  //     sinon.stub(SpotifyWebApi, "addTracksToPlaylist").yieldsTo("success", confirmationString);
  //   });
  //
  //   it('Returns a confirmation string', function(){
  //     expect(getTracksAndCreatePlaylist()).to.be(confirmationString);
  //   });
  //
  //   after(function () { SpotifyWebApi.setAccessToken.restore(); });
  // });
  describe('#getTracksAndCreatePlaylist', function(){

    beforeEach(function(){
      var SpotifyWebApi = { setAccessToken: function () {} };
      spotifyApiMock = sinon.mock(SpotifyWebApi);
      spotifyApiMock.expects("setAccessToken").once().withArgs("123u213");
    });

    it('Returns a confirmation string', function(){
      expect(getTracksAndCreatePlaylist(["beyonce"], "12afdafsd", "123u213", "Playlist")).to.equal(confirmationString);
      spotifyApiMock.verify();
      spotifyApiMock.restore();
    });

  });

});
