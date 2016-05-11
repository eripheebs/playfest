var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var server = require('../../backend/server.js');
var spotifyModel = require('../../backend/models/spotifyPlaylist.js');
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(sinonChai);

var error = "Cannot read property 'method' of undefined";
var confirmationString = "Your playlist has been created!";
var fakeID = "123413234";
var fakeUri = "12341324";

describe('Spotify Playlist', function(){

  describe('#getTracksAndCreatePlaylist', function(){

    beforeEach(function(){
      var searchTracks = sinon.stub(spotifyModel.spotifyApi, "searchTracks");
      searchTracks.returns(Promise.resolve({ tracks: { items: [ {uri: fakeUri} ] } }));
      var setAccessToken = sinon.stub(spotifyModel.spotifyApi, "setAccessToken");
      var createPlaylist = sinon.stub(spotifyModel.spotifyApi, "createPlaylist");
      createPlaylist.returns(Promise.resolve(fakeID));
      var addTracksToPlaylist = sinon.stub(spotifyModel.spotifyApi, "addTracksToPlaylist")
      addTracksToPlaylist.returns(Promise.resolve(confirmationString));
    });

    it('Returns a confirmation string', function(){
      spotifyModel.getTracksAndCreatePlaylist(["beyonce"], "12afdafsd", "123u213", "Playlist")
        .then(function(methodResult){
        expect(methodResult).to.equal(confirmationString)
      });
    });

  });

});
