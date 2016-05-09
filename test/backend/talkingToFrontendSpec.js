var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Routes that talk to frontend', function(){

  describe('Getting festival name', function(){
    it('should return a festival name', function(done){
      chai.request(server)
        .get('/festivalMatches/London')
        .end(function(err, res){
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property(data);
          expect(res.body.data).to.be.a(array);
          done();
        });
    });
  })
});
