var http = require('http');
var Router = require(__dirname + '/router');
var router = new Router();

function start (port, publicDir) {
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
      router.serveFile(path, req, res, publicDir);
    }

    if (req.method === 'POST') {
      req.on('data', function(data){
        req.data = data.toString();
        router.route(req, res);        
      });
      return;
    }

    router.route(req, res, publicDir);

  }).listen(port, function() {
    console.log('Glurp server running on port ' + port + '.');
  });
}

exports.start = start;
exports.router = router;
