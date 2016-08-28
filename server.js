var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('build'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. ", port)
  }
});
