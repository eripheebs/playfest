var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/server.js');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Server', function(){
  it('should be up and running', function(done){
    chai.request(server)
      .get('/')
      .end(function(err, res){
        expect(res).to.have.status(200);
        done();
      });
  });
});
