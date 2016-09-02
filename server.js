var http = require('http');
var open = require('open');
var static = require('node-static');
var file = new static.Server('.');

open('http://www.google.com');
http.createServer(function(req, res) {

    file.serve(req, res);
}).listen(8080);