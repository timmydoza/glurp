var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
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

  describe('REST handling', function() {
    beforeEach(function() {
      this.router = new Router();
      this.req = {
        method: '',
        url: 'testurl'
      };
      this.res = {
        test: 'some test'
      };
    });

    it('should be able to setup a GET route', function() {
      this.req.method = 'GET';

      var cbCalled = false;

      this.router.set('GET', 'testurl', function(testReq, testRes) {
        cbCalled = true;
        expect(testReq).to.eql(this.req);
        expect(testRes).to.eql(this.res);
      }.bind(this));

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });

    it('should be able to setup a POST route', function() {
      this.req.method = 'POST';

      var cbCalled = false;

      this.router.set('POST', 'testurl', function(testReq, testRes) {
        cbCalled = true;
        expect(testReq).to.eql(this.req);
        expect(testRes).to.eql(this.res);
      }.bind(this));

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });

    it('should be able to setup a PUT route', function() {
      this.req.method = 'PUT';

      var cbCalled = false;

      this.router.set('PUT', 'testurl', function(testReq, testRes) {
        cbCalled = true;
        expect(testReq).to.eql(this.req);
        expect(testRes).to.eql(this.res);
      }.bind(this));

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });

    it('should be able to setup a PATCH route', function() {
      this.req.method = 'PATCH';

      var cbCalled = false;

      this.router.set('PATCH', 'testurl', function(testReq, testRes) {
        cbCalled = true;
        expect(testReq).to.eql(this.req);
        expect(testRes).to.eql(this.res);
      }.bind(this));

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });

    it('should be able to setup a DELETE route', function() {
      this.req.method = 'DELETE';

      var cbCalled = false;

      this.router.set('DELETE', 'testurl', function(testReq, testRes) {
        cbCalled = true;
        expect(testReq).to.eql(this.req);
        expect(testRes).to.eql(this.res);
      }.bind(this));

      this.router.route(this.req, this.res);
      expect(cbCalled).to.eql(true);
    });


  });

  describe('File Serving', function() {
    beforeEach(function() {
      this.router = new Router();
    });

    it('should serve a test.txt file', function(done) {
      var cbCalled = {
        writeHead: false,
        write: false,
        end: false
      };
      var req = {
        url: 'http://localhost.com/test.txt',
        method: 'GET'
      };
      var res = {
        writeHead: function(status, headers) {
          cbCalled.writeHead = true;
          expect(status).to.eql(200);
          expect(headers).to.eql({'Content-Type': 'text/plain'});
        },
        write: function(text) {
          cbCalled.write = true;
          expect(text.toString()).to.eql('test text\n');
        },
        end: function() {
          cbCalled.end = true;
          done();
        }
      };
      this.router.route(req, res, './public');
    });

    it('should serve a test.html file', function(done) {
      var cbCalled = {
        writeHead: false,
        write: false,
        end: false
      };
      var req = {
        url: 'http://localhost.com/index.html',
        method: 'GET'
      };
      var res = {
        writeHead: function(status, headers) {
          cbCalled.writeHead = true;
          expect(status).to.eql(200);
          expect(headers).to.eql({'Content-Type': 'text/html'});
        },
        write: function(text) {
          cbCalled.write = true;
          expect(text).to.eql(fs.readFileSync(__dirname + '/../public/index.html'));
        },
        end: function() {
          cbCalled.end = true;
          done();
        }
      };
      this.router.route(req, res, './public');
    });

    it('should serve a .css file', function(done) {
      var cbCalled = {
        writeHead: false,
        write: false,
        end: false
      };
      var req = {
        url: 'http://localhost.com/css/base.css',
        method: 'GET'
      };
      var res = {
        writeHead: function(status, headers) {
          cbCalled.writeHead = true;
          expect(status).to.eql(200);
          expect(headers).to.eql({'Content-Type': 'text/css'});
        },
        write: function(text) {
          cbCalled.write = true;
          expect(text).to.eql(fs.readFileSync(__dirname + '/../public/css/base.css'));
        },
        end: function() {
          cbCalled.end = true;
          done();
        }
      };
      this.router.route(req, res, './public');
    });

    it('should serve a test.js file', function(done) {
      var cbCalled = {
        writeHead: false,
        write: false,
        end: false
      };
      var req = {
        url: 'http://localhost.com/test.js',
        method: 'GET'
      };
      var res = {
        writeHead: function(status, headers) {
          cbCalled.writeHead = true;
          expect(status).to.eql(200);
          expect(headers).to.eql({'Content-Type': 'application/javascript'});
        },
        write: function(text) {
          cbCalled.write = true;
          expect(text).to.eql(fs.readFileSync(__dirname + '/../public/test.js'));
        },
        end: function() {
          cbCalled.end = true;
          done();
        }
      };
      this.router.route(req, res, './public');
    });

  });

});
