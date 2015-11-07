var server = require(__dirname + '/server');

exports.start = server.start;
exports.set = server.router.set.bind(server.router);
