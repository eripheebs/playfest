var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
var server = require('../../server/server.js');

chai.use(sinonChai);
chai.use(chaiHttp);

describe('OCR recognition via external API', function(){

  //routes:post

  describe('/ POST route', function(){

    before(function(done){
      sinon
        .stub(request, 'post')
        .returns('hello there');
      done();
    });

    after(function(done){
      request.get.restore();
    });

    it('pass the request to the api', function(){

    });

  });

  it('reply with the answer to the function');

  //module:callOCR
  it('calls the API with the key');
  it('calls the API with the url'); //bodyparser?  it('')
  it('returs the value in body');

  //module:extractText
  it('extract the right value');

  //module:parseText
  it('returns an array of possible words');

  //module:create plausible(hard)
  it('create an array of decremental arrays');

  //module:checkspotify
  it('returns true if the artist exists');

  //module:spliceArray
  it('remove found artist from string, rebuild match array');

});
