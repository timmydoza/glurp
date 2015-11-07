var chai = require('chai');
var expect = chai.expect;
var Router = require(__dirname + '/../lib/router');

describe('our router', function() {
  beforeEach(function() {
    this.router = new Router();
  });

  it('should respond to all REST methods', function() {
    expect(this.router.routes).to.have.property('GET');
    expect(this.router.routes).to.have.property('POST');
    expect(this.router.routes).to.have.property('PUT');
    expect(this.router.routes).to.have.property('PATCH');
    expect(this.router.routes).to.have.property('DELETE');
  });

  it('should 404', function() {
    var cbCalled = {
      writeHead: false,
      write: false,
      end: false
    };
    var req = {
      url: 'doesnotexist',
      method: 'GET'
    };
    var res = {
      writeHead: function(status, headers) {
        cbCalled.writeHead = true;
        expect(status).to.eql(404);
        expect(headers).to.eql({'Content-Type': 'text/plain'});
      },
      write: function(text) {
        cbCalled.write = true;
        expect(text).to.eql('not found');
      },
      end: function() {
        cbCalled.end = true;
      }
    };
    this.router.route(req, res);
    expect(cbCalled.writeHead).to.eql(true);
    expect(cbCalled.write).to.eql(true);
    expect(cbCalled.end).to.eql(true);
  });

});
