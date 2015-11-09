[![Build Status](https://travis-ci.org/timmydoza/glurp.svg)](https://travis-ci.org/timmydoza/glurp)

# Title 
Glurp - An easy to use framework for creating quick and simple HTTP servers in node.js.

# Introduction

Welcome to Glurp - A RESTful API framework for Node using the HTTP module, with libraries that automate creating a server and router that can handle multiple route requests and easily respond with multiple file types, icluding HTML, CSS, JPEG and JS.

See included code examples.

# Getting Started with Glurp
```javascript
var glurp = require(__dirname + '/index');

glurp.start(3000, __dirname + '/public'); 
```
That's it! Your server should be running!

# GLURP METHODS

# glurp.set(method, route, callback) 
Binds a callback function to a route for a get request at '/', responds with a file from the desgnated directory.

# glurp.start(port, publicDirectory)
Automates starting a server with a specified port and reference directory. (See example above "Getting Started with Glurp")

# Request Object
Uses same methods and properties as described in Node Docs.<br>
<a href="https://nodejs.org/api/http.html#http_http_incomingmessage">Class: http.ClientRequest</a><br>
Also includes:
# req.data + string
Responds with data received from a POST request.

# Response Object
Uses same methods and properties as described in Node Docs.<br>
<a href="https://nodejs.org/api/http.html#http_class_http_serverresponse">Class: http.ServerResponse</a><br>
Also includes:
# res.send(string) 
Takes a string and responds with text.
This function automates writeHead, write and end for the user.

# res.sendHTML(string)
Takes a string and responds with one HTML file per callback.

# res.sendFile(string) 
```javascript
glurp.set('GET', '/', function(req, res) {
  res.sendFile('/index.html'); 
});
```





