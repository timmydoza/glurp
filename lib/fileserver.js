var fs = require('fs');
var mime = require(__dirname + '/mimetypes');

function serve(path, req, res) {
  fs.readFile(path.slice(1, path.length), 'utf8', function(err, data) {
    debugger;
    if (err) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 - file not found");
      res.end();
      return;
    } 

    res.writeHead(200, {'Content-Type': mime(path)});
    res.write(data.toString());
    res.end();
  })
}

exports.serve = serve;

