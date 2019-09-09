// server.js
var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Hello world\n");
});

server.listen(3500, function() {
    console.log('Server is running at 3500')
});