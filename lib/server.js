var http = require('http');
var Router = require(__dirname + '/router');
var router = new Router();
var publicDirectory;

function start(port, publicDir) {
  http.createServer(callback).listen(port, function() {
    console.log('Glurp server running on port ' + port + '.');
  });
  publicDirectory = publicDir;
}

var callback = function(req, res) {
  req.data = '';
  res.send = function(content) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(content);
    res.end();
  };

  res.sendHtml = function(content) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(content);
    res.end();
  };

  res.sendFile = function(path) {
    router.serveFile(path, req, res, publicDirectory);
  };

  req.on('data', function(data) {
    req.data += data.toString();
  });
  req.on('end', function() {
    router.route(req, res, publicDirectory);
  });
};

exports.callback = callback;
exports.start = start;
exports.router = router;
