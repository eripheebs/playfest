var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Spotify Authentication', function(){

  describe('when authentication request is made', function(){

    it('user is redirected to the Spotify auth', function(done){
      chai.request(server)
        .get('/auth/new')
        .end(function(err, res){
          console.log("res.status = "+res.status);
          expect(res.status).to.equal(300);
          done();
        });
    });
  });
});
