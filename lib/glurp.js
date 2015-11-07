var server = require(__dirname + '/server');

var set = function(method, route, cb) {
  server.router.get(method, route, cb);
};

exports.start = server.start;
exports.set = server.router.set.bind(server.router);
