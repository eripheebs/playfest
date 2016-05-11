var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../backend/server.js');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Spotify Authentication', function(){

  describe('when authentication request is made', function(){

    it('user is redirected to the Spotify auth', function(done){
      chai.request(server)
        .get('/auth/new')
        .end(function(err, res){
          expect(res.status).to.equal(200);
          expect(res.header['set-cookie'][0]).to.include('spotify')
          done();
        });
    });
  });
});
