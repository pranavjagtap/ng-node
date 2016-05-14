var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(path.join(__dirname, 'public')));

// // view engine setup
// app.set('views', path.join(__dirname, 'public'));

//to accept cross origin requests.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// app.get('/', function (req, res, next) {
// 	res.send('Welcome');
// 	res.render('home');
// });


//get request for finding specific record from database
app.get('/api/restaurants/:id', function (req, res, next) {
	var id = req.params.id;
	db.findRestaurant(id, function (err, data) {
		if (err) { return cb(err, null)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//get request for finding all records from database
app.get('/api/restaurants', function (req, res, next) {
	db.findAllRestaurants(function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//post request for inserting data to database
app.post('/api/restaurants' , function (req, res, next) {
//	console.dir('Response body');
//	console.dir(req.body);
	var resaturantData = req.body;
	db.addRestaurant(resaturantData, function (err, data) {
		// if (err) { return cb(err, null)};
		if (err) { res.send(err)}
		//Error: Can't set headers after they are sent. Send headers only for once. So use if else blocks.
		else if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//post request for inserting multiple data to database
app.post('/api/restaurants' , function (req, res, next) {
	//get post data from the body inorder to insert the record.
	var restaurant = ''; //data from body;
	db.addRestaurants(function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//put request for updating records in database
app.put('/api/restaurants' , function (req, res, next) {
	//get put data from the body inorder to update the record 
	var restaurant = ''; //data from body;
	db.update(function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//delete request for deleteing a record from database
app.delete('/api/restaurants/:id' , function (req, res, next) {
	//delete the record with specified id.
	var id = req.params.id;
	db.deleteRestaurant(id, function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});


app.listen(3000, function () {
	console.log('Listning on localhost:3000');
});
