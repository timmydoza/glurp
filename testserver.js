var glurp = require(__dirname + '/index');

glurp.set('GET', '/', function(req, res) { //adds a route for a get request at '/'
  res.sendFile('/index.html') //sendFile uses the 'public' path
});

glurp.set('GET', '/time', function(req, res) { //adds a route for a get request at '/time'
  res.send("The current time is " + Date.now().toString());
});

glurp.set('GET', '/html', function(req, res) { 
  res.sendHtml("<h1>This is <i> HTML </i></h1>"); //sends response as HTML
});

glurp.set('POST', '/testpost', function(req, res) { //adds a route for a post request at '/testpost'
  res.send("POST request received.  Data is " + req.data);
});

glurp.start(3000, __dirname + '/public'); //first arg is port, second sets the directory for static files.  Currently neither arg is optional.

/*
glurp methods

glurp.set(method, route, callback)

glurp.start(post, publicDirectory)


request object - same methods and properties as node
   plus req.data - string

response object - same as node
   plus res.send(string)
        res.sendHtml(string)
        res.sendFile(string)
*/