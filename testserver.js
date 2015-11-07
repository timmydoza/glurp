var glurp = require(__dirname + '/index');

glurp.set('GET', '/', function(req, res) {
  res.sendFile('/index.html')
});

glurp.set('GET', '/time', function(req, res) {
  res.send("The current time is " + Date.now().toString());
});

glurp.set('POST', '/testpost', function(req, res) {
  res.send("POST request received");
});

glurp.start(3000, __dirname + '/public');