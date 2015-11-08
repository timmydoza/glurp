var fs = require('fs');
var mime = require(__dirname + '/mimetypes');

function serve(path, req, res, publicDir, cb) {
  // console.log(publicDir + path, mime(path));
  fs.readFile(publicDir + path, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('404 - ' + publicDir + path + ' not found');
      res.end();
      return;
    }
    cb(err);
    res.writeHead(200, {'Content-Type': mime(path)});
    res.write(data);
    res.end();
  });
}

exports.serve = serve;
