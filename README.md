[![Build Status](https://travis-ci.org/timmydoza/glurp.svg)](https://travis-ci.org/timmydoza/glurp)

# GLURP
 An easy to use framework for creating quick and simple HTTP servers in node.js.

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
```javascript
Router.prototype.set = function(method, route, cb) {
  if (!this.routes[method]) throw method + ' is not a valid HTTP method.';
  this.routes[method][route] = cb;
};
```
# glurp.start(port, publicDirectory)
Automates starting a server with a specified port and reference directory. (See example above "Getting Started with Glurp")

# Request Object
Uses same methods and properties as described in Node Docs.<br>
<a href="https://nodejs.org/api/http.html#http_http_incomingmessage">Class: http.ClientRequest</a><br>
Also includes:
# req.data + string
Responds with data received from a POST request.

```javascript
    if (req.method === 'POST') {
      req.on('data', function(data) {
        req.data = data.toString();
        router.route(req, res);
      });
      return;
    };

    ```
    
# Response Object
Uses same methods and properties as described in Node Docs.<br>
<a href="https://nodejs.org/api/http.html#http_class_http_serverresponse">Class: http.ServerResponse</a><br>
Also includes:
# res.send(string) 
Takes a string and responds with text.
res.send automates writeHead, write and end for the user.

```javascript
glurp.set('POST', '/testpost', function(req, res) { 
  res.send("POST request received.  Data is " + req.data);
});

```
# res.sendHTML(string)
Takes a string and responds with one HTML file per callback.

```javascript
    res.sendHtml = function(content) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
    };

    ```
# res.sendFile(string)

```javascript
glurp.set('GET', '/', function(req, res) {
  res.sendFile('/index.html'); 
});

```





