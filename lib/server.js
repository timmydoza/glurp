var http = require('http');
var Router = require(__dirname + '/router');
var router = new Router();

function start (port) {
  http.createServer(function(req, res) {
    res.send = function(content) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(content);
      res.end();
    }

    res.sendHtml = function(content) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
    }

    res.sendFile = function(path) {
      router.serveFile(path, req, res);
    }

    router.route(req, res);

  }).listen(port, function() {
    console.log('Glurp server running on port ' + port + '.');
  });
}

exports.start = start;
exports.router = router;
