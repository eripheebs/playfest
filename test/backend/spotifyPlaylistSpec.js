var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../backend/server.js');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Spotify Playlist', function(){

  describe('when request to the API is made', function(){

    it('the page needs userID in order to make request', function(done){
      chai.request(server)
        .get('/spotifyPlaylist/new')
        .end(function(err, res){
          expect(err.status).to.equal(500);
          done();
        });
    });
  });
});
