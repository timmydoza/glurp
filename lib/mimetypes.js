var mimetypes = {
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  jpg: "image/jpeg"
};

var mime = function(path) {
  var extention = path.split('.')[1];
  return mimetypes[extention];  
}

exports = module.exports = mime;