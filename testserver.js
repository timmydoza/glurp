var glurp = require(__dirname + '/index');

glurp.set('GET', '/', function(req, res) { //adds a route for a get request at '/'
  res.sendFile('/index.html') //there is also a .sendHtml method, if you want to do res.sendHtml("<h1>Hello</h1>")
});

glurp.set('GET', '/time', function(req, res) { //adds a route for a get request at '/time'
  res.send("The current time is " + Date.now().toString());
});

glurp.set('POST', '/testpost', function(req, res) { //adds a route for a post request at '/testpost'
  res.send("POST request received");
});

glurp.start(3000, __dirname + '/public'); //first arg is port, second sets the directory for static files.  Currently neither arg is optional.
