var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../backend/server.js');
var expect = chai.expect;

chai.use(chaiHttp);

var error = "Cannot read property 'method' of undefined";

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
});
