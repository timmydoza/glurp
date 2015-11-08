var fileServer = require(__dirname + '/fileserver');
var url = require('url');

var Router = module.exports = exports = function() {
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'PATCH': {},
    'DELETE': {}
  };
};

Router.prototype.set = function(method, route, cb) {
  if (!this.routes[method]) throw method + ' is not a valid HTTP method.';
  this.routes[method][route] = cb;
};

Router.prototype.serveFile = fileServer.serve;

Router.prototype.fourOhFour = function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('not found');
  res.end();
};

Router.prototype.route = function(req, res, publicDir, cb) {
  var urlObj = url.parse(req.url);
  // console.log(req.method, req.url);

  if (this.routes[req.method][req.url]) {
    this.routes[req.method][req.url](req, res);
  } else if (urlObj.pathname.split('.').length > 1) {
    fileServer.serve(urlObj.pathname, req, res, publicDir, cb);
  } else {
    this.fourOhFour(req, res);
  }
};
