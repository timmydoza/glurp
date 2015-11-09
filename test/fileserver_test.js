var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var fileServer = require(__dirname + '/../lib/fileserver');


describe('File Serving', function() {

  it('should serve a txt file', function(done) {
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
    fileServer.serve('/test.txt',req, res, './public');
  });

  it('should serve an html file', function(done) {
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
    fileServer.serve('/index.html',req, res, './public');
  });

  it('should serve a css file', function(done) {
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
    fileServer.serve('/css/base.css',req, res, './public');
  });

  it('should serve a javascript file', function(done) {
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
    fileServer.serve('/test.js',req, res, './public');
  });

  it('should serve a jpeg file', function(done) {
    var cbCalled = {
      writeHead: false,
      write: false,
      end: false
    };
    var req = {
      url: 'http://localhost.com/test.jpg',
      method: 'GET'
    };
    var res = {
      writeHead: function(status, headers) {
        cbCalled.writeHead = true;
        expect(status).to.eql(200);
        expect(headers).to.eql({'Content-Type': 'image/jpeg'});
      },
      write: function(text) {
        cbCalled.write = true;
        // expect(text).to.eql(fs.readFileSync(__dirname + '/../public/test.js'));
      },
      end: function() {
        cbCalled.end = true;
        done();
      }
    };
    fileServer.serve('/test.jpg',req, res, './public');
  });

});
