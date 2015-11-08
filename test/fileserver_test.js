// Does fileserver need to be tested if router (which depends on
// fileserver) is fully tested?


var chai = require('chai');
var expect = chai.expect;
var fs = require('fs');
var fileserver = require(__dirname + '/../lib/fileserver');

describe('the fileserver', function() {
  it('should do stuff', function() {
    var urlObj = {
      href: 'http://somehost.com/index.html',
      host: 'somehost.com:3000',
      hostname: 'somehost.com',
      port: '3000',
      pathname: '/index.html',
      query: ''
    };
    var req = {
      url: 'testurl',
      method: 'GET'
    };
    var res = {
      data: null
    };

    fileserver.serve(urlObj.pathname, req, res, '/public');
    console.log(res);
    expect(res.data).to.eql(fs.readFileSync(__dirname + '/../public/index.html'));
  });

});
