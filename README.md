[![Build Status](https://travis-ci.org/timmydoza/glurp.svg)](https://travis-ci.org/timmydoza/glurp)

# glurp
 An easy to use framework for creating quick and simple HTTP servers in node.js.

## Introduction

Welcome to Glurp - A RESTful API framework for Node using the HTTP module.  Glurp is a library that automates creating a node HTTP server and router that can handle multiple route requests and easily respond with multiple file types, including HTML, CSS, JPEG and JS.


## Getting Started with glurp
First, install glurp by running `npm install glurp --save` in your project directory.  Then, open a new JavaScript file and add these two lines of code:
```javascript
var glurp = require('glurp');

glurp.start(3000, './'); 
```
Run your JavaScript file with node.js and that's it!! You now have an HTTP server running on port 3000 that's hosting all files in the current directory. 

## glurp METHODS

### glurp.set(method, route, callback) 
Binds a callback function to an HTTP request method and route.  `glurp.set` accepts strings for the first two arguments.

### glurp.start(port, publicDirectory)
Starts an HTTP server with a specified port and directory for hosting static files. 

## Request Object
The glurp request object has the same methods and properties as the node.js <a href="https://nodejs.org/api/http.html#http_http_incomingmessage">http.IncomingMessage</a> class, in addition to the following:

### req.data
This property stores the data received from an HTTP request as a string.

## Response Object
The glurp response object has the same methods and properties as the node.js <a href="https://nodejs.org/api/http.html#http_class_http_serverresponse">http.ServerResponse</a> class, in addition to the following:
### res.send(string) 
Accepts a string and sends it to the client as plain text.  

### res.sendHTML(string)
Accepts a string and sends it to the client to be rendered as HTML. 

### res.sendFile(string)
Accepts a file name as a string and sends it to the server with the appropriate headers.  Glurp looks for the specified file in the location stated in glurp.start().

##Sample glurp server

```javascript
var glurp = require('glurp');

glurp.set('GET', '/', function(req, res) {
	res.sendFile('/index.html'); //glurp will look in ./static for index.html
});

glurp.set('POST', '/testpost', function(req, res) {
	res.send('Received data: ' + req.data);
});

glurp.set('GET', '/renderhtml', function(req, res) {
	res.sendHtml('<h1>Look! This is <i>HTML</i></h1>');
});

glurp.start(3000, __dirname + '/static');

```






