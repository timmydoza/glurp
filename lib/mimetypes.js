var mimetypes = {
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpg: 'image/jpeg'
};

var mime = function(path) {
  var extension = path.split('.')[1];
  return mimetypes[extension];
};

exports = module.exports = mime;
