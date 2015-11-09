var expect = require('chai').expect;
var server = require(__dirname + '/../lib/server');
var serverCallback = server.callback;
var router = server.router;
var EE = require('events');




describe('the server callback function', function() {
  beforeEach(function() {
    this.req = new EE;
    this.res = new EE;
  });

  it('should add a .send method to the response object', function() {
    router.route = function(req, res, publicDir) {
      expect(res).to.have.property('send');
    };
    serverCallback(this.req, this.res, '/');
    this.req.emit('end');      
  });
  it('should add a .sendHtml method to the response object', function() {
    router.route = function(req, res, publicDir) {
      expect(res).to.have.property('sendHtml');
    };
    serverCallback(this.req, this.res, '/');
    this.req.emit('end');      
  });
  it('should add a .sendFile method to the response object', function() {
    router.route = function(req, res, publicDir) {
      expect(res).to.have.property('sendFile');
    };
    serverCallback(this.req, this.res, '/');
    this.req.emit('end');    
  });
  it('should add a .data property to the request object', function() {
    router.route = function(req, res, publicDir) {
      expect(req.data).to.eql('teststring');
    };
    serverCallback(this.req, this.res, '/');
    this.req.emit('data', 'teststring');
    this.req.emit('end');    
  });
});