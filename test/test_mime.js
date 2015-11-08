var expect = require('chai').expect;
var mime = require(__dirname + '/../lib/mimetypes');

describe('the mimetypes module', function() {
  it('should return the mime-types for given filenames based on extention', function() {
    expect(mime('/index.html')).to.eql('text/html');
    expect(mime('/unicorns.jpg')).to.eql('image/jpeg');
    expect(mime('/base.css')).to.eql('text/css');
    expect(mime('/logs.txt')).to.eql('text/plain');
    expect(mime('/app.js')).to.eql('application/javascript');
  });
});