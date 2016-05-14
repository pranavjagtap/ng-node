var express = require('express'),
    path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

//to accept cross origin requests.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.get('/', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(3000, function () {
	console.log('Listning on localhost:3000');
});
